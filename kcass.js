// const readline = require("readline");
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// const fs = require("fs");

// const cart = {
//     cartArray:[],
//     addToCart(product){
//         this.cartArray.push(product);
//         this.saveCartToFile(); // Writing the code to create a file and save the added products to it
//         console.log(`${product} added to cart.`);
//     },
//     removeFromCart(product){
//         const index = this.cartArray.indexOf(product);
//         if(index !== -1) {
//             this.cartArray.splice(index, 1);
//             this.saveCartToFile();
//             console.log(`${product} removed from cart.`);

//         } else {
//             console.log(`${product} not found in cart`);
//         }
//     },
//     showItems(){
//         if (this.cartArray.length === 0) {
//             console.log("Cart is empty");
//         } else{
//             const items = this.cartArray.join("\n");
//             console.log(`Item in cart: ${items}`);
//         }
//     },
//     length(){
//         console.log(`Number of products in cart: ${this.cartArray.length}`);
//     },
//     saveCartToFile() {
//         const cartData = this.cartArray.join("\n");
//         fs.writeFile("cart.txt", cartData, function(err) {
//             if(err){
//                 console.log(err);
//                 return;
//             }
//             console.log("cartdata saved to cart.txt");
//         });
//     },
//     standBy() {
//         rl.question(`Enter a command(add/remove/show-items/length/exit):`, (command) => {
//             switch (command) {
//                 case "add":
//                     rl.question(`Enter the product to add: `, (product) => {
//                         this.addToCart(product);
//                         this.standBy();

//                     });
//                     break;
//                     case "remove":
//                         rl.question(`Enter the product to remove: `, (product) => {
//                             this.removeFromCart(product);
//                             this.standBy();
//                     });
//                     break;
//                     case "show-items":
//                         this.showItems();
//                         this.standBy();
//                         break;
//                     case "length":
//                         this.length();
//                         this.standBy();
//                         break;
//                     case "exit":
//                         console.log("Exiting program.");
//                         rl.close();
//                         break;
//                     default:
//                         console.log("Invalid command. Please enter a valid command.");
//                         this.standBy();
//                         break;

//             }
//         });
//     }
// }
// //Start cart
// cart.standBy();


const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 4000;
const mongoDBURL = process.env.mongoDBURL;
console.log("MongoDB URL:", mongoDBURL);


mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to successfully to my database!");
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const {taskCollection} = require("./taskSchema");

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const tasks = await taskCollection.find();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/", async (req, res) => {
  try {
    const newTask = await taskCollection.create({
      taskTitle: req.body.taskTitle,
      taskBody: req.body.taskBody
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get("/by-id/:id", async (req, res) => {
  const task = await taskCollection.findById(req.params.id);
  res.send(task);
  
});
app.get("/by-task-title/:title", async (req, res) => {
  const task = await taskCollection.findOne({taskTitle: req.params.title})
  res.send(task);
  if(!task) {
    return res.status(404).send("not-found");
  }
})

app.patch("/:id", async (req, res) => {
  await taskCollection.findByIdAndUpdate(res.params.id, {
    taskBody: req.params.taskBody
  });
    res.send("Task Upadted Succesfully!")
});
app.delete("/:", async (req, res) => {
  const updatedTask = await taskCollection.findByIdAndDelete(req.params.id, {
    taskBody: req.body.taskBody
  }, {new: true})
  res.json({
    message: "Task deleted successfully!",
  updatedTask});
});
app.listen(port, () => {
  console.log("Listening on port", port);
});
