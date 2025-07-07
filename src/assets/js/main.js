document.addEventListener("DOMContentLoaded", () => {
  const ids = window.projectIds;

  // Modal open/close logic
  document.querySelectorAll(".proj-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      const modal = document.getElementById(`modal-${id}`);
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
      updateNavButtons(id);
    });
  });

  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const modal = document.getElementById(`modal-${id}`);
      if (!modal) return;
      modal.style.display = "none";
      document.body.style.overflow = "";
    });
  });

  // Modal prev/next
  document.querySelectorAll(".modal-prev").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const currentId = btn.dataset.id;
      const idx = ids.indexOf(currentId);
      if (idx > 0) switchModal(currentId, ids[idx - 1]);
    });
  });

  document.querySelectorAll(".modal-next").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const currentId = btn.dataset.id;
      const idx = ids.indexOf(currentId);
      if (idx < ids.length - 1) switchModal(currentId, ids[idx + 1]);
    });
  });

  function switchModal(currentId, targetId) {
    const currentModal = document.getElementById(`modal-${currentId}`);
    const targetModal = document.getElementById(`modal-${targetId}`);
    if (!currentModal || !targetModal) return;
    currentModal.style.display = "none";
    targetModal.style.display = "flex";
    updateNavButtons(targetId);
  }

  function updateNavButtons(activeId) {
    const idx = ids.indexOf(activeId);
    const modal = document.getElementById(`modal-${activeId}`);
    if (!modal) return;
    modal.querySelector(".modal-prev").disabled = idx === 0;
    modal.querySelector(".modal-next").disabled = idx === ids.length - 1;
  }

  // Projects carousel nav
  document.querySelectorAll(".projects-carousel").forEach(carousel => {
    const track  = carousel.querySelector(".projects-track");
    const btnL   = carousel.querySelector(".arrow-left");
    const btnR   = carousel.querySelector(".arrow-right");
    const groups = track.querySelectorAll(".projects-group");
    let currentIndex = 0;

    function updateArrows() {
      if (currentIndex === 0) {
        btnL.classList.add("disabled");
      } else {
        btnL.classList.remove("disabled");
      }

      if (currentIndex === groups.length - 1) {
        btnR.classList.add("disabled");
      } else {
        btnR.classList.remove("disabled");
      }
    }

    function scrollToCurrent() {
      const target = groups[0].offsetWidth * currentIndex;

      track.style.scrollSnapType = "none";
      track.scrollTo({
        left: target,
        behavior: "smooth"
      });

      function onScrollEnd() {
        if (Math.abs(track.scrollLeft - target) < 1) {
          track.removeEventListener("scroll", onScrollEnd);
          updateArrows();
        }
      }
      track.addEventListener("scroll", onScrollEnd);
    }

    // Optional: re-enable snapping on manual user drag if needed
    track.addEventListener("mousedown", () => {
      track.style.scrollSnapType = "x mandatory";
    });

    btnL.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        scrollToCurrent();
      }
    });

    btnR.addEventListener("click", () => {
      if (currentIndex < groups.length - 1) {
        currentIndex++;
        scrollToCurrent();
      }
    });

    updateArrows();
  });

  // ======= THUMBNAIL CLICK & MEDIA SWITCH =======
  document.querySelectorAll(".media-thumbnails .thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      const url = thumb.dataset.media;
      const type = thumb.dataset.type;
      const modal = thumb.closest(".project-modal");
      const viewer = modal.querySelector(".media-viewer");
      if (!viewer) return;

      viewer.innerHTML = ""; // clear existing media

      if (type === "video") {
        const video = document.createElement("video");
        video.src = url;
        video.controls = true;
        video.autoplay = false;
        video.playsInline = true;
        video.style.maxWidth = "100%";
        video.style.maxHeight = "100%";
        viewer.appendChild(video);
        video.load();
      } else {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Project Media";
        img.classList.add("click-fullscreen");
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        viewer.appendChild(img);
      }
    });
  });

  // ======= THUMBNAIL SCROLL BUTTONS =======
  document.querySelectorAll(".media-thumbnails-container").forEach(container => {
    const thumbs = container.querySelector(".media-thumbnails");
    const left = container.querySelector(".arrow.left");
    const right = container.querySelector(".arrow.right");

    function scrollBy(amount) {
      thumbs.scrollBy({
        left: amount,
        behavior: "smooth"
      });
    }

    if (left) {
      left.addEventListener("click", (e) => {
        e.stopPropagation();
        scrollBy(-thumbs.clientWidth / 2);
      });
    }

    if (right) {
      right.addEventListener("click", (e) => {
        e.stopPropagation();
        scrollBy(thumbs.clientWidth / 2);
      });
    }
  });
});
