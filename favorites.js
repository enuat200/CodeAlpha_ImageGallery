

// favorites.js

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. LOGIC FOR IMAGE-VIEW.HTML (Toggling)
    // ==========================================
    const favBtn = document.querySelector('.fav-btn');
    const img = document.getElementById('fullImage');

    if (favBtn && img) {
        // Fetch the list of favorites from storage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Function to check if image is liked and update button color
        const updateButtonColor = () => {
            const imgSrc = img.getAttribute('src');
            if (imgSrc && favorites.includes(imgSrc)) {
                favBtn.classList.add('active'); // Turns Red
            } else {
                favBtn.classList.remove('active'); // Turns White
            }
        };

        // Wait a split second for script.js to set the image src from URL, then check color
        setTimeout(updateButtonColor, 50);

        // When the heart button is clicked
        favBtn.addEventListener('click', () => {
            const imgSrc = img.getAttribute('src');
            if (!imgSrc) return;

            // Check if the image is already in the array
            const index = favorites.indexOf(imgSrc);

            if (index === -1) {
                // If not found, it means they are LIKING it
                favorites.push(imgSrc);
                favBtn.classList.add('active'); // Turn Red
            } else {
                // If found, it means they are UNLIKING it
                favorites.splice(index, 1); // Remove it from array
                favBtn.classList.remove('active'); // Turn White
            }

            // Save the updated list back to localStorage
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    }

    // ==========================================
    // 2. LOGIC FOR FAVORITE.HTML (Displaying & Direct Removing)
    // ==========================================
    const gallery = document.getElementById('favGallery');
    
    if (gallery) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Helper function to build the gallery grid
        const renderFavorites = () => {
            gallery.innerHTML = ''; // Clear previous content

            if (favorites.length === 0) {
                gallery.innerHTML = '<h3 style="color: white; text-align: center; width: 100%;">No favorite images saved yet.</h3>';
                return;
            }

            favorites.forEach((src, index) => {
                // Create a container card for the favorite item
                const itemDiv = document.createElement('div');
                itemDiv.className = 'fav-item';
                itemDiv.style.position = 'relative'; // Crucial for positioning the delete button
                
                // Create the image element
                const favImg = document.createElement('img');
                favImg.src = src;
                
                // Create an inline "Unlike" delete button for convenience
                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = '&times;'; // Displays an "X" symbol
                removeBtn.className = 'remove-fav-btn';
                
                // Style the mini remove button directly or in style.css
                removeBtn.style.position = 'absolute';
                removeBtn.style.top = '10px';
                removeBtn.style.right = '10px';
                removeBtn.style.background = 'rgba(255, 71, 87, 0.9)';
                removeBtn.style.color = 'white';
                removeBtn.style.border = 'none';
                removeBtn.style.borderRadius = '50%';
                removeBtn.style.width = '30px';
                removeBtn.style.height = '30px';
                removeBtn.style.cursor = 'pointer';
                removeBtn.style.fontSize = '18px';

                // If they click the X button on the favorite page
                removeBtn.addEventListener('click', () => {
                    favorites.splice(index, 1); // Remove from array
                    localStorage.setItem('favorites', JSON.stringify(favorites)); // Update storage
                    renderFavorites(); // Re-render the page instantly!
                });
                
                // Put everything together
                itemDiv.appendChild(favImg);
                itemDiv.appendChild(removeBtn);
                gallery.appendChild(itemDiv);
            });
        };

        renderFavorites();
    }
});