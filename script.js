//product database
var productDataBase = [
    product1 = {
        "ID": 1,
        "Description": "central processing untit of a pc",
        "Category": "cpu",
        "UnitOfMeasure": "none",
        "Price": 399.00,
        "Weight": "none"
    },
    product2 = {
        "ID": 2,
        "Description": "Motherboard of PC",
        "Category": "motherBoard",
        "UnitOfMeasure": "none",
        "Price": 299.00,
        "Weight": "none"
    },
    product3 = {
        "ID": 3,
        "Description": "lower quality Motherboard of PC",
        "Category": "motherBoard",
        "UnitOfMeasure": "none",
        "Price": 199.00,
        "Weight": "none"
    },
  ];
  var customerDatabase = [
    user1 = {
        "email": "john1234@psu.edu",
        "name": "john",
        "phoneNumber": 4123890654,
        "age": 30,
        "address": "123 North Street"
    },
    user2 = {
        "email": "sarah4321@psu.edu",
        "name": "sarah",
        "phoneNumber": 4123211234,
        "age": 45,
        "address": "321 South Street"
    },
    user3 = {
        "email": "adam6789@psu.edu",
        "name": "adam",
        "phoneNumber": 4127891234,
        "age": 25,
        "address": "789 East Ave"
    }
  ];
//user validation
function validate() {
    var shopperInfo = {
      "email": document.getElementById("email").value,
      "name": document.getElementById("name").value,
      "phoneNumber": document.getElementById("phoneNumber").value,
      "age": document.getElementById("age").value,
      "address": document.getElementById("address").value
    };
    if (shopperInfo.email == "" || !shopperInfo.email.includes("@") || !shopperInfo.email.includes("psu.edu")) {
        $("#Email_alert").removeClass("alert");
        return false;
    }
    if (shopperInfo.name == "") {
        $("Name_alert").removeClass("alert");
        return false;
    }
    if (shopperInfo.age == "" || shopperInfo.age < 1) {
        $("#Age_alert").removeClass("alert");
        return false;
    }
    if (shopperInfo.address == "") {
        $("#Addr_alert").removeClass("alert");
        return false;
    }
    var existingUser = customerDatabase.find(customer => customer.email == shopperInfo.email);
    if (existingUser) {
        $("#userExists_alert").removeClass("alert");
        return false;
    }
    
    customerDatabase.push(shopperInfo);
    $("#userExists_alert").addClass("alert");
    $("#form")[0].reset();
    $("#userUpload_alert").removeClass("alert");
    event.preventDefault();
    return true;

  }
  //User error messages
$("#email").on('input', function() {
    if (document.getElementById("email").value != "") {
        $("#Email_alert").addClass("alert");
    }
});
$("#name").on('input', function() {
    if (document.getElementById("name").value != "") {
        $("#Name_alert").addClass("alert");
    }
});
$("#age").on('input', function() {
    if (document.getElementById("age").value != "") {
        $("#Age_alert").addClass("alert");
    }
});
$("#address").on('input', function() {
    if (document.getElementById("address").value != "") {
        $("#Addr_alert").addClass("alert");
    }
});
  //product validation  
  function ProductValidate() {
    var productInfo = {
        "ID": document.getElementById("ID").value,
        "Description": document.getElementById("Description").value,
        "Category": document.getElementById("Category").value,
        "UnitOfMeasure": document.getElementById("Measure").value,
        "Price": document.getElementById("price").value,
        "Weight": document.getElementById("Weight").value
    };

    if (productInfo.ID == "") {
        $("#ID_alert").removeClass("alert");
        return false;
    }
    if (productInfo.Description == "") {
        $("#Desc_alert").removeClass("alert");
        return false;
    }
    if (productInfo.Category == "") {
        $("#Cat_alert").removeClass("alert");
        return false;
    }
    if (productInfo.UnitOfMeasure == "") {
        $("#M_alert").removeClass("alert");
        return false;
    }
    if (productInfo.Price == "") {
        $("#Price_alert").removeClass("alert");
        return false;
    }
    
    var existingProduct = productDataBase.find(product => product.ID == productInfo.ID);
    if (existingProduct) {
        $("#exists_alert").removeClass("alert");
        return false;
    }
    
    productDataBase.push(productInfo);
    $("#exists_alert").addClass("alert");
    $("#form")[0].reset();
    $("#upload_alert").removeClass("alert");

    event.preventDefault();
    return true;
}
//Product error messages
$("#ID").on('input', function() {
    if (document.getElementById("ID").value != "") {
        $("#ID_alert").addClass("alert");
    }
});
$("#Description").on('input', function() {
    if (document.getElementById("Description").value != "") {
        $("#Desc_alert").addClass("alert");
    }
});
$("#Category").on('input', function() {
    if (document.getElementById("Category").value != "") {
        $("#Cat_alert").addClass("alert");
    }
});
$("#Measure").on('input', function() {
    if (document.getElementById("Measure").value != "") {
        $("#M_alert").addClass("alert");
    }
});
$("#price").on('input', function() {
    if (document.getElementById("price").value != "") {
        $("#Price_alert").addClass("alert");
    }
});
//shopping cart
var shoppingCart = [];
var totalPrice = 0;

    
    function addToCart(productID) {
        var product = productDataBase.find(p => p.ID == productID);
        if (product) {
            shoppingCart.push(product);
            updateCart();
        }
    }

    
    function removeFromCart(productID) {
        shoppingCart = shoppingCart.filter(p => p.ID != productID);
        updateCart();
    }


    function updateCart() {
        var cartHTML = '';
        totalPrice = 0;

        shoppingCart.forEach(product => {
            cartHTML += `<div class="border p-2 mb-2">
                <strong>ID:</strong> ${product.ID} <br>
                <strong>Description:</strong> ${product.Description} <br>
                <strong>Price:</strong> $${product.Price} <br>
                <button class="btn btn-danger btn-sm mt-2" onclick="removeFromCart(${product.ID})">Remove from Cart</button>
            </div>`;
            totalPrice += parseFloat(product.Price);
            localStorage.setItem("price", JSON.stringify(totalPrice));
        });

        $("#cartContents").html(cartHTML);
        $("#totalPrice").text(totalPrice.toFixed(2));
    }

//update function
    $(document).ready(function() {
        $("#findProductBtn").click(function() {
            var searchID = $("#findID").val();
            var product = productDataBase.find(product => product.ID == searchID);

            if (product) {
                $("#updateID").val(product.ID);
                $("#updateDescription").val(product.Description);
                $("#updateCategory").val(product.Category);
                $("#updateMeasure").val(product.UnitOfMeasure);
                $("#updatePrice").val(product.Price);
                $("#updateWeight").val(product.Weight);

                $("#updateSection").show();
            } else {
                $("#display").html('<div class="alert alert-danger">Product not found!</div>');
                $("#updateSection").hide();
            }
        });
        
        $("#updateProductBtn").click(function() {
            var updateID = $("#updateID").val();
            var updatedProduct = {
                "ID": updateID,
                "Description": $("#updateDescription").val(),
                "Category": $("#updateCategory").val(),
                "UnitOfMeasure": $("#updateMeasure").val(),
                "Price": $("#updatePrice").val(),
                "Weight": $("#updateWeight").val()
            };

            var productIndex = productDataBase.findIndex(product => product.ID == updateID);
            if (productIndex >= 0) {
                productDataBase[productIndex] = updatedProduct;
                $("#display").html('<div class="alert alert-success">Product updated successfully!</div>');
            } else {
                $("#display").html('<div class="alert alert-danger">Error: Could not update the product!</div>');
            }
        });
        
        $("#searchBtn").click(function() {
            var searchTerm = $("#searchTerm").val().toLowerCase();
            var searchResults = productDataBase.filter(product => 
                product.ID.toString().includes(searchTerm) ||
                product.Category.toLowerCase().includes(searchTerm)
            );
            
            if (searchResults.length > 0) {
                var resultHTML = '<h4>Search Results:</h4>';
                searchResults.forEach(product => {
                    resultHTML += `<div>
                        <strong>ID:</strong> ${product.ID} <br>
                        <strong>Description:</strong> ${product.Description} <br>
                        <strong>Category:</strong> ${product.Category} <br>
                        <strong>Unit of Measure:</strong> ${product.UnitOfMeasure} <br>
                        <strong>Price:</strong> ${product.Price} <br>
                        <strong>Weight:</strong> ${product.Weight} <br><br>
                    </div>`;
                });
                $("#searchResults").html(resultHTML);
            } else {
                $("#searchResults").html('<div class="alert alert-danger">No products found matching your search.</div>');
            }
        });
    });
    //search products button
    $(document).ready(function() {
        
        $("#searchBtn").click(function() {
            var searchTerm = $("#searchTerm").val().toLowerCase();
            var searchResults = productDataBase.filter(product => 
                product.ID.toString().includes(searchTerm) ||
                product.Description.toLowerCase().includes(searchTerm)
            );

            if (searchResults.length > 0) {
                var resultHTML = '<h4>Search Results:</h4>';
                searchResults.forEach(product => {
                    resultHTML += `<div class="border p-2 mb-2">
                        <strong>ID:</strong> ${product.ID} <br>
                        <strong>Description:</strong> ${product.Description} <br>
                        <strong>Price:</strong> $${product.Price} <br>
                        <button class="btn btn-primary btn-sm mt-2" onclick="addToCart(${product.ID})">Add to Cart</button>
                    </div>`;
                });
                $("#searchResults").html(resultHTML);
            } else {
                $("#searchResults").html('<div class="alert alert-danger">No products found matching your search.</div>');
            }
        });
    });
    //Shipping functionality
    function validateShipping() {
        var ShippingInfo = {
            "shipAddress": document.getElementById("shippingDestination").value,
            "carrier": document.getElementById("shippingCarrier").value,
            "shippingMethod": document.getElementById("shippingMethod").value
        }
    
        if (ShippingInfo.shipAddress == "") {
            $("#dest_alert").removeClass("alert");
            return false;
        }
        if (ShippingInfo.carrier == "") {
            $("#carrier_alert").removeClass("alert");
            return false;
        }
        if (ShippingInfo.shippingMethod == "") {
            $("#method_alert").removeClass("alert");
            return false;
        }
    }
    //Shipping error messages
$("#shippingDestination").on('input', function() {
    if (document.getElementById("shippingDestination").value != "") {
        $("#dest_alert").addClass("alert");
    }
});
$("#shippingCarrier").on('input', function() {
    if (document.getElementById("shippingCarrier").value != "") {
        $("#carrier_alert").addClass("alert");
    }
});
$("#shippingMethod").on('input', function() {
    if (document.getElementById("shippingMethod").value != "") {
        $("#method_alert").addClass("alert");
    }
});
    
//billing
document.getElementById('billingForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const fullName = document.getElementById('fullName').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    alert(`Billing Details Submitted!\n\nName: ${fullName}\nAddress: ${address}\nEmail: ${email}\nPhone: ${phone}`);
});

function searchProduct() {
    const searchValue = document.getElementById('searchProduct').value.trim();

    if (searchValue) {
        const products = [
            { id: 1, name: "Product 1" },
            { id: 2, name: "Product 2" },
            { id: 3, name: "Product 3" }
        ];
        
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()));

        let productList = document.getElementById('productList');
        productList.innerHTML = "";

        if (matchedProducts.length > 0) {
            matchedProducts.forEach(product => {
                let productItem = document.createElement('div');
                productItem.innerHTML = `<p>${product.name} (ID: ${product.id})</p><button onclick="addProductToReturn(${product.id})">Add for Return</button>`;
                productList.appendChild(productItem);
            });
        } else {
            productList.innerHTML = "<p>No matching products found.</p>";
        }
    }
}
