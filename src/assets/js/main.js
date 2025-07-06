// Open and close project modals
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".proj-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      console.log("Opening modal for:", id);
      document.getElementById(`modal-${id}`).style.display = "flex";
    });
  });
  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      console.log("Closing modal for:", id);
      document.getElementById(`modal-${id}`).style.display = "none";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".projects-carousel").forEach(carousel => {
    const track = carousel.querySelector(".projects-track");
    const btnLeft = carousel.querySelector(".arrow-left");
    const btnRight = carousel.querySelector(".arrow-right");
    const group = track.querySelector(".projects-group");

    console.log("Carousel initialized:", { track, btnLeft, btnRight, group });

    function updateArrows() {
      console.log("Updating arrows...");
      btnLeft.disabled = track.scrollLeft <= 0;
      btnRight.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
      console.log("Arrows state:", {
        leftDisabled: btnLeft.disabled,
        rightDisabled: btnRight.disabled,
        scrollLeft: track.scrollLeft,
        clientWidth: track.clientWidth,
        scrollWidth: track.scrollWidth
      });
    }

    function scrollLeft() {
      const scrollAmount = group.offsetWidth + parseInt(getComputedStyle(track).gap || 0, 10);
      console.log("Scrolling left by:", scrollAmount);
      track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }

    function scrollRight() {
      const scrollAmount = group.offsetWidth + parseInt(getComputedStyle(track).gap || 0, 10);
      console.log("Scrolling right by:", scrollAmount);
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    btnLeft?.addEventListener("click", () => {
      console.log("Left arrow clicked");
      scrollLeft();
    });
    btnRight?.addEventListener("click", () => {
      console.log("Right arrow clicked");
      scrollRight();
    });
    track?.addEventListener("scroll", () => {
      console.log("Track scrolled");
      updateArrows();
    });

    updateArrows();
  });
});
