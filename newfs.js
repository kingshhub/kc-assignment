// const fs = require("fs");
// const readline = require("readline");
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });


// function register (username, password) {
//     const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
//     if(!passwordRegex.test(password)) {
//         console.log("Your password must contain atleast one number, on capital letter and one symbol and be atleast 8 characters long.");
//         return;
//     }

//     if(username < 10){
//         console.log("Username is too short");
//         return;
//     }
//     fs.writeFile("user.txt", `${username}, ${password}`, function(err){
//         if(err){
//             console.log(err);
//             return;
//         }; 
            
//         console.log("Account created succesfully!");
        
//     });
// };
// rl.question("Enter your username: ", (username) => {
//     rl.question("Enter your password: ", (password) => {
//         register(username, password);
//         rl.close();
//     });
// });




// fs.writeFile("user.txt", "Kingsley",  function(err){
//     if(err) return
//     console.log(err);
//     console.log("File created successfully");

//     fs.appendFile("DAcat", "DAcat\n", function(err){
//         if(err) return console.log(err);
    
//         console.log("append successful!");
//     });
// });
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function checkBeforeAdding() {
    rl.question("What name do you want to add? ", function (userName) {
        fs.readFile("user.txt", "utf8", function (err, data) {
            if (err) {
                console.error(err);
                rl.close();
                
            }

            const stringData = data.toString();

            if (stringData.includes(userName)) {
                console.log(userName + " already exists");
                rl.close();
                
            }

            fs.appendFile("user.txt", "\n" + userName, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("Update successful");
                }
                rl.close();
            });
        });
    });
}

checkBeforeAdding();
