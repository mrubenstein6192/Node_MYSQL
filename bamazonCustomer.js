var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  
  start();
});

function start() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) {
      throw err;
    }
      for (var i = 0; i < results.length; i++) {
        console.log("\nProduct ID: "  + results[i].item_id + "\nProduct: " + results[i].product_name + "\nDepartment: " + results[i].department_name + "\nPrice: $" + results[i].price + "\nQuantity in Stock: " + results[i].stock_quantity + "\n -------------------");
      };
      firstChoice();
      });
  }

function firstChoice() {
  inquirer
    .prompt({
      name: "stayGo",
      type: "list",
      message: "What would you like to do?",
      choices: ["Purchase", "Exit"]
    })
      .then(function(answer) {
        if (answer.stayGo === "Purchase"){
          userDecision();
        }
        else if (answer.stayGo === "Exit"){
          connection.end();
        }
      });
}
  
function userDecision() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Please enter the ID Number of the product you wish to buy: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "amount",
        type: "input",
        message: "How many would you like to purchase?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(response) {
      let id = response.id;
      let quantity = response.amount;
      // console.log(response);
      

      connection.query("SELECT * FROM products", function (err, results) {
        if (err) {
          throw err;
        }
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === parseInt(response.id)) {
            chosenItem = results[i];
            // console.log(chosenItem);
          }
        }
          if (chosenItem.stock_quantity > quantity) {
            var newQuantity = chosenItem.stock_quantity - parseInt(quantity);
            connection.query("UPDATE products SET ? WHERE ?", [
              {
                stock_quantity: newQuantity
              },
              {
                item_id: chosenItem.id
              }
            ]), 
            console.log("\nUpdated quantity for product: " + newQuantity);
            console.log("\nYour total cost is: $" + chosenItem.price * parseInt(quantity) + "\n")
            
            firstChoice();
          }
          else {
            console.log("\nInsuffient Quantity! \nThere are only " + chosenItem.stock_quantity + " of these in stock. \nPlease modify your order.\n");
            firstChoice();
          }
      })
      
    })
    
} 
