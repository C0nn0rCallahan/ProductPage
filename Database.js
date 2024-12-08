import { customerDatabase, productDataBase, shippingDatabase } from "./script.js";
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const dbName = "data";

MongoClient.connect(uri, function (err, client) {
    if (err) throw err;
    console.log("Connected to the database.");

    const database = client.db(dbName);

    // 'customer' collection
    const customerCollection = database.collection("customer");
    customerCollection.insertMany(customerDatabase, function (err, res) {
        if (err) throw err;
        console.log("Customer data added.");

        // READ
        customerCollection.find({}).toArray(function (err, docs) {
            if (err) throw err;
            console.log("Customer documents:", docs);

            // UPDATE
            customerCollection.updateMany({}, { $set: { verified: true } }, function (err, res) {
                if (err) throw err;
                console.log(`Updated ${res.modifiedCount} documents in 'customer'.`);

                // DELETE
                customerCollection.deleteMany({}, function (err, res) {
                    if (err) throw err;
                    console.log(`Deleted ${res.deletedCount} documents from 'customer'.`);
                });
            });
        });
    });

    // 'products' collection
    const productCollection = database.collection("products");
    productCollection.insertMany(productDataBase, function (err, res) {
        if (err) throw err;
        console.log("Product data added.");

        // READ
        productCollection.find({}).toArray(function (err, docs) {
            if (err) throw err;
            console.log("Product documents:", docs);

            // UPDATE
            productCollection.updateMany({}, { $set: { discount: "15%" } }, function (err, res) {
                if (err) throw err;
                console.log(`Updated ${res.modifiedCount} documents in 'products'.`);

                // DELETE
                productCollection.deleteMany({}, function (err, res) {
                    if (err) throw err;
                    console.log(`Deleted ${res.deletedCount} documents from 'products'.`);
                });
            });
        });
    });

    // 'shipping' collection
    const shippingCollection = database.collection("shipping");
    shippingCollection.insertMany(shippingDatabase, function (err, res) {
        if (err) throw err;
        console.log("Shipping data added.");

        // READ
        shippingCollection.find({}).toArray(function (err, docs) {
            if (err) throw err;
            console.log("Shipping documents:", docs);

            // UPDATE
            shippingCollection.updateMany({}, { $set: { shipped: true } }, function (err, res) {
                if (err) throw err;
                console.log(`Updated ${res.modifiedCount} documents in 'shipping'.`);

                // DELETE
                shippingCollection.deleteMany({}, function (err, res) {
                    if (err) throw err;
                    console.log(`Deleted ${res.deletedCount} documents from 'shipping'.`);
                });
            });
        });
    });

    // 'shoppingCart' collection
    const shoppingCartCollection = database.collection("shoppingCart");
    shoppingCartCollection.insertMany([], function (err, res) {
        if (err) throw err;
        console.log("ShoppingCart data added.");

        // READ
        shoppingCartCollection.find({}).toArray(function (err, docs) {
            if (err) throw err;
            console.log("ShoppingCart documents:", docs);

            // UPDATE
            shoppingCartCollection.updateMany({}, { $set: { status: "checked out" } }, function (err, res) {
                if (err) throw err;
                console.log(`Updated ${res.modifiedCount} documents in 'shoppingCart'.`);

                // DELETE
                shoppingCartCollection.deleteMany({}, function (err, res) {
                    if (err) throw err;
                    console.log(`Deleted ${res.deletedCount} documents from 'shoppingCart'.`);
                });
            });
        });
    });

    client.close();
    console.log("Database connection closed.");
});
