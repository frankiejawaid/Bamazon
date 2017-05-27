var inquirer = require("inquirer");

var mysql = require("mysql");

require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    throw err;}

     connection.query("SELECT * FROM production", function(err, res) {
    if (err) {
      throw err;
    }

console.table(res)

inquirer.prompt([
    
    {name: "id",
    type: "input",
    message: "What product ID would you like to look at?"},

    {name: "quantity",
    type: "input",
    message: "How many would you like to purchase"}

]).then(function(answer) {
    var product = res[answer.id-1]
    if(product.quantity<answer.quantity){
        console.log("sorry you're SOL");
    }
    else {
        connection.query("UPDATE production SET ? WHERE ?", [{
  quantity: product.quantity-answer.quantity
}, {
  id: answer.id
}], function(err, res) {console.log(product.price*answer.quantity)});

    }
    



  });

})
  });

  

