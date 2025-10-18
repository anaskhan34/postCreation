var currentUser = JSON.parse(localStorage.getItem("isLoggedInUser"));
allProfilePost = JSON.parse(localStorage.getItem("allProfilePost")) || []

if (!currentUser) {
    window.location.href = "login.html";
}




// profile function
var imgSrc = document.getElementById("imgSrc");
var userNameDisplay = document.getElementById("userNameDisplay");

if (currentUser) {
    imgSrc.src = currentUser.profilePicture;
    userNameDisplay.innerText = currentUser.userName;

    //// console.log(imgSrc.src, userNameDisplay.innerText);
}

// display post
var postDiv = document.getElementById("postDiv")

function displayPost() {
    postDiv.innerHTML = ""
    allProfilePost.forEach((post, handler) => {
        postDiv.innerHTML += `<div class="postArea">
                <div class="postImage">
                    <img src=${post.profilePicture} alt="" width="100px" height="100px">
                    <div class="welcome">
                        <h2>Hi! <span>${post.name}</span></h2>
                        <p>${post.postTime}</p>
                    </div>
                </div>
                <div class="userPotsHead">
                    <h3>${post.content}</h3>
                    <img src="${post.imageUrl}" alt="">
                </div>
                <div class="seeInsight">
                    <h4>See Insight</h4>
                    <button>Boost Post</button>
                    <div class="line2"></div>
                </div>
                <div class="facebook-icon">
                    <div class="image-icon">
                        <img src="./image/facbook-icon2.jpg" alt="">
                        <span>15</span>
                    </div>
                    <div class="share">
                        <p>5 Shares</p>
                    </div>
                    <div class="line2"></div>
                </div>
                <div class="like">
                    <div class="love-icon">
                        <i class="fa-regular fa-heart"></i> <span>Like</span>
                    </div>
                    <div class="comment">
                        <i class="fa-regular fa-comment"></i> <span>Comment</span>
                    </div>
                    <div class="share">
                        <i class="fa-regular fa-share-from-square"></i> <span>Share</span>
                    </div>
                    <div class="line2"></div>
                </div>
                <div class="mainBtn">
                    <div class="editBtn">
                        <button onclick="editHandler(${handler})">Edit</button>
                    </div>

                    <div class="editBtn">
                        <button onclick="deleteHandler(${handler})">Delete</button>
                    </div>

                    <div class="line2"></div>

                </div>
            </div>`
    })
}
displayPost();

// postHandler
function postHandler() {
    var Content = document.getElementById("postContent").value;
    var imageUrl = document.getElementById("postImageUrl").value;

    if (!Content.trim() || !imageUrl.trim()) {

        Swal.fire({
            title: "Oops...",
            icon: "error",
            text: "please complete the field",
            draggable: true
        });
        return;
    }

    var post = {
        name: currentUser.userName,
        profilePicture: currentUser.profilePicture,
        content: Content,
        imageUrl: imageUrl,
        postTime: new Date().toLocaleString(),
        ownerEmail: currentUser.email
    };

    allProfilePost.push(post);

    localStorage.setItem("allProfilePost", JSON.stringify(allProfilePost));

    document.getElementById("postContent").value = "";
    document.getElementById("postImageUrl").value = "";

    displayPost();
}

// edit handler
function editHandler(handler) {
    var newContent = prompt("edit your content", allProfilePost[handler].content)
    var newImageUrl = prompt("edit your new url", allProfilePost[handler].imageUrl)

    if (!newContent || !newImageUrl) {

        Swal.fire({
            title: "Oops...",
            icon: "error",
            text: "all field are required",
            draggable: true
        });
        return
    }
    else {
        allProfilePost[handler].content = newContent;
        allProfilePost[handler].imageUrl = newImageUrl
        setTimeout(() => {

            Swal.fire({
                title: "post edit successfully",
                icon: "success",
                draggable: true
            });
            localStorage.setItem("allProfilePost", JSON.stringify(allProfilePost))

        }, 1000);
        displayPost()
    }

}

// delete handler
function deleteHandler(handler) {

    if (confirm("are you sure you want to delete this post?")) {
        allProfilePost.splice(handler, 1)
        localStorage.setItem("allProfilePost", JSON.stringify(allProfilePost))
        displayPost()
    }
    setTimeout(() => {

        Swal.fire({
            title: "post deleted successfully",
            icon: "success",
            draggable: true
        });

    }, 1000);
}




// logout button function
function logOutHandler() {
    localStorage.removeItem("isLoggedInUser")
    
    Swal.fire({
        title: "log Out successfully",
        icon: "success",
        draggable: true
    });

    setTimeout(() => {
        window.location.href = "login.html"
    }, 2000);
}

