document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".gallery-card");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let positions = [
    "pos-left-far", 
    "pos-left", 
    "pos-center", 
    "pos-right", 
    "pos-right-far", 
    "pos-hidden"
  ];

  function updateGallery() {
    cards.forEach((card, index) => {
      card.className = "gallery-card";
      card.classList.add(positions[index]);
    });
  }

  nextBtn.addEventListener("click", () => {
    positions.push(positions.shift());
    updateGallery();
  });

  prevBtn.addEventListener("click", () => {
    positions.unshift(positions.pop());
    updateGallery();
  });

  updateGallery();
});