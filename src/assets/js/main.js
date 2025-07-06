document.addEventListener("DOMContentLoaded", () => {
  const ids = window.projectIds; // e.g. ["time-telescope","gold-mine","rift-battle"]

  // Open modal
  document.querySelectorAll(".proj-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      const modal = document.getElementById(`modal-${id}`);
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
      updateNavButtons(id);
    });
  });

  // Close modal
  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const id = btn.dataset.id;
      document.getElementById(`modal-${id}`).style.display = "none";
      document.body.style.overflow = "";
    });
  });

  // Prev nav
  document.querySelectorAll(".modal-prev").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const currentId = btn.dataset.id;
      const idx = ids.indexOf(currentId);
      if (idx > 0) {
        const prevId = ids[idx - 1];
        switchModal(currentId, prevId);
      }
    });
  });

  // Next nav
  document.querySelectorAll(".modal-next").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const currentId = btn.dataset.id;
      const idx = ids.indexOf(currentId);
      if (idx < ids.length - 1) {
        const nextId = ids[idx + 1];
        switchModal(currentId, nextId);
      }
    });
  });

  function switchModal(currentId, targetId) {
    const currentModal = document.getElementById(`modal-${currentId}`);
    const targetModal  = document.getElementById(`modal-${targetId}`);

    if (!targetModal) {
      console.error("Target modal not found for ID:", targetId);
      return;
    }

    currentModal.style.display = "none";
    targetModal.style.display = "flex";
    updateNavButtons(targetId);
  }


  // Update nav button state
  function updateNavButtons(activeId) {
    const idx = ids.indexOf(activeId);
    const modal = document.getElementById(`modal-${activeId}`);
    const prevBtn = modal.querySelector(".modal-prev");
    const nextBtn = modal.querySelector(".modal-next");

    prevBtn.dataset.id = activeId;
    nextBtn.dataset.id = activeId;

    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === ids.length - 1;
  }
});
