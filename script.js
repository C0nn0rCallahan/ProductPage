function validate() {
    var shopperInfo = {
      "email": document.getElementById("email").value,
      "name": document.getElementById("name").value,
      "phoneNumber": document.getElementById("phoneNumber").value,
      "age": document.getElementById("age").value,
      "address": document.getElementById("address").value
    };
    if (shopperInfo.email == "" || !shopperInfo.email.includes("@") || !shopperInfo.email.includes("psu.edu")) {
      alert("email field must be filled out or @psu.edu is missing");
      return false;
    }
    if (shopperInfo.name == "") {
      alert("name field must be filled out");
      return false;
    }
    if (shopperInfo.age == "" || shopperInfo.age < 1) {
      alert("age field must be filled out or an invalid age was submitted");
      return false;
    }
    if (shopperInfo.address == "") {
      alert("Address field must be filled out");
      return false;
    }

  }

    
