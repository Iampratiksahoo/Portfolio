// Open and close project modals
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".proj-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      document.getElementById(`modal-${id}`).style.display = "flex";
    });
  });
  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      document.getElementById(`modal-${id}`).style.display = "none";
    });
  });
});
