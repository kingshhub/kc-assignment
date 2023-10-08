const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require("fs");

const cart = {
  cartArray: [],
  addToCart(product) {
    this.cartArray.push(product);
    this.saveCartToFile(); // Save cart to "cart.txt" after adding an item
    console.log(`${product} added to cart.`);
  },
  removeFromCart(product) {
    const index = this.cartArray.indexOf(product);
    if (index !== -1) {
      this.cartArray.splice(index, 1);
      this.saveCartToFile(); // Save cart to "cart.txt" after removing an item
      console.log(`${product} removed from cart.`);
    } else {
      console.log(`${product} not found in cart.`);
    }
  },
  showItems() {
    if (this.cartArray.length === 0) {
      console.log("Cart is empty.");
    } else {
      const items = this.cartArray.join(', ');
      console.log(`Items in cart: ${items}`);
    }
  },
  length() {
    console.log(`Number of products in cart: ${this.cartArray.length}`);
  },
  saveCartToFile() {
    const cartData = this.cartArray.join("\n");
    fs.writeFile("cart.txt", cartData, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Cart data saved to cart.txt");
    });
  },
  standBy() {
    rl.question('Enter a command (add/remove/show-items/length/exit): ', (command) => {
      switch (command) {
        case 'add':
          rl.question('Enter the product to add: ', (product) => {
            this.addToCart(product);
            this.standBy();
          });
          break;
        case 'remove':
          rl.question('Enter the product to remove: ', (product) => {
            this.removeFromCart(product);
            this.standBy();
          });
          break;
        case 'show-items':
          this.showItems();
          this.standBy();
          break;
        case 'length':
          this.length();
          this.standBy();
          break;
        case 'exit':
          console.log('Exiting program.');
          rl.close();
          break;
        default:
          console.log('Invalid command. Please enter a valid command.');
          this.standBy();
          break;
      }
    });
  }
};

// Start cart and enter commands:
cart.standBy();
