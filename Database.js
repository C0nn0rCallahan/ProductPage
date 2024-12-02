
//product database
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017/data";
MongoClient.connect(url, function(err, client) {
    if (err) throw err;  
    const database = client.db('data');
    const customers = database.createCollection('customer');
    database.Collection("customer").insertMany(customerDatabase, function(err, res) {
        if (err) throw err;
        console.log("data added");
        db.close();
    });
    const products = database.createCollection('products');
    database.Collection("products").insertMany(productDataBase, function(err, res) {
        if (err) throw err;
        console.log("data added");
        db.close();
    });
    const shoppingCart = database.createCollection('ShoppingCart');
    database.Collection("ShoppingCart").insertMany(shoppingCart, function(err, res) {
        if (err) throw err;
        console.log("data added");
        db.close();
    });
    const Shipping = database.createCollection('shipping');
    database.Collection("shipping").insertMany(shippingDatabase, function(err, res) {
        if (err) throw err;
        console.log("data added");
        db.close();
    });
});


