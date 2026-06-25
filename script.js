const params = new URLSearchParams(window.location.search);

const imageUrl = params.get("img");

document.getElementById("fullImage").src = imageUrl;

document.querySelector(".back-btn")
.addEventListener("click", function(){
    history.back();
});