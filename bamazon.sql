DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR (100) NOT NULL,
  department_name VARCHAR (30) NOT NULL,
  price DECIMAL (10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES 
  ("PS4", "Electronics", 300, 25),
  ("Blutooh Speaker", "Electronics", 75, 50),
  ("Crockpot", "Kitchen", 30, 100),
  ("Keurig Coffee Maker", "Kitcheb", 60, 100),
  ("Beach Towel", "Leisure", 10, 500),
  ("Sunscreen SPF 30", "Leisure", 15, 100),
  ("Running Sneakers", "Athletics", 60, 25),
  ("Football", "Athletics", 30, 50),
  ("Muggsy Bogues Jersey", "Apparel", 75, 5),
  ("Dragonball Z Season 5 DVD", "Entertainment", 30, 10);

  SELECT * FROM prodcuts;