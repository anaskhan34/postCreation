function loginHandler(event){
    event.preventDefault();

    console.log("test");
    

    var email = document.getElementById("userEmail").value;
    var password = document.getElementById("userPassword").value;

    if(!email || !password){
        
        Swal.fire({
            title: "Oops...",
            icon: "error",
            text: "Please complete the input field",
            draggable: true
        });
        return
    }

    var storeUserData = JSON.parse(localStorage.getItem("userData"))

    var findUserData = storeUserData.find((value) => {
        return value.email === email && value.password === password
    })

    if(findUserData){
        localStorage.setItem("isLoggedInUser", JSON.stringify(findUserData))
        
        Swal.fire({
            title: "login successfully",
            icon: "success",
            draggable: true
        });

        setTimeout(() => {
            window.location.href = "index.html"
        }, 3000);
    }

    else{
        
        Swal.fire({
            title: "Oops...",
            icon: "error",
            text: "Invalid Email and Password",
            draggable: true
        });
    }
}