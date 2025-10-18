function signupHandler(event) {
    event.preventDefault();


    var userName = document.getElementById("userName").value;
    var email = document.getElementById("userEmail").value;
    var password = document.getElementById("userPassword").value;
    var cnfPassword = document.getElementById("userCnfPassword").value;
    var profilePicture = document.getElementById("userImage").files[0];

    var userValue = JSON.parse(localStorage.getItem("userData")) || []

    var existEmail = userValue.find(user => user.email === email)
    if (existEmail) {
        
        Swal.fire({
            title: "Oops...",
            icon: "error",
            text: "This Email id already exist try Different!",
            draggable: true
        });
        return
    }



    if (!userName.trim() || !email.trim() || !password.trim()) {

        Swal.fire({
            title: "Oops...",
            icon: "error",
            text: "Please fill all the input field!",
            draggable: true
        });
        return
    }

    if (password.length < 8) {
      
        Swal.fire({
            title: "Oops...",
            icon: "error",
            text: "Please make a strong Password",
            draggable: true
        });
        return
    }

    if (password !== cnfPassword) {
        
        Swal.fire({
            title: "Oops...",
            icon: "error",
            text: "password is not matching",
            draggable: true
        });
        return
    }

    if (!profilePicture) {
        
        Swal.fire({
            title: "Oops...",
            icon: "error",
            text: "Please upload your profile picture",
            draggable: true
        });
        
        return
    }

    if (userName.includes("@")) {
        
        Swal.fire({
            title: "Oops...",
            icon: "error",
            text: "Name can not contains @",
            draggable: true
        });
        return
    }

    if (!email.includes("@")) {
        
        Swal.fire({
            title: "Oops...",
            icon: "error",
            text: "@ is mandatory to write in email address",
            draggable: true
        });
        return
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const imageUrl = e.target.result;


        var userBio = {
            userName: userName,
            email: email,
            password: password,
            profilePicture: imageUrl,
            posts: []
        }

        userValue.push(userBio)

        localStorage.setItem("userData", JSON.stringify(userValue))
        
        Swal.fire({
            title: "account created successfully",
            icon: "success",
            draggable: true
        });

        setTimeout(() => {
            window.location.href = "login.html"
        }, 2000);

    };

    reader.readAsDataURL(profilePicture);
}