

document.addEventListener('DOMContentLoaded', () => {
    

    const fullImage = document.getElementById("fullImage");
    if (fullImage) {
        const params = new URLSearchParams(window.location.search);
        const imageUrl = params.get("img");
        if (imageUrl) {
            fullImage.src = imageUrl;
        }
    }

    const backBtn = document.querySelector(".back-btn");
    if (backBtn) {
        backBtn.addEventListener("click", function(){
            history.back();
        });
    }

});