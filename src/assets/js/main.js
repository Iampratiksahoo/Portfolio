document.addEventListener("DOMContentLoaded", () => {
  initModals();
  initExperienceDrawer();
  initProjectGrid();
  initEmailCopy();
  initFullscreen();
});

/**
 * MODAL SYSTEM
 */
function initModals() {
  const modalTriggers = document.querySelectorAll(".proj-card");
  const closeButtons = document.querySelectorAll(".modal-close");

  modalTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const id = trigger.dataset.id;
      const modal = document.getElementById(`modal-${id}`);
      if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
        trapFocus(modal);
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const modal = document.getElementById(`modal-${id}`);
      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  });

  // Thumbnail switching
  document.querySelectorAll(".thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      const src = thumb.dataset.src;
      const type = thumb.dataset.type;
      const modal = thumb.closest(".project-modal");
      const viewer = modal.querySelector(".main-viewer");
      
      viewer.classList.add("loading");
      
      setTimeout(() => {
        const existingLoader = viewer.querySelector(".loader");
        viewer.innerHTML = "";
        
        let mediaEl;
        if (type === "video") {
          mediaEl = document.createElement("video");
          mediaEl.src = src;
          mediaEl.controls = true;
          mediaEl.play();
        } else {
          mediaEl = document.createElement("img");
          mediaEl.src = src;
          mediaEl.classList.add("clickable-media");
        }
        
        viewer.appendChild(mediaEl);
        if (existingLoader) viewer.appendChild(mediaEl.parentElement.querySelector(".loader") ? "" : existingLoader); 
        // Better re-append:
        viewer.appendChild(existingLoader);

        viewer.classList.remove("loading");
      }, 300);
    });
  });
}

/**
 * FULLSCREEN OVERLAY
 */
function initFullscreen() {
  const overlay = document.getElementById("fullscreen-overlay");
  const fullImg = document.getElementById("fullscreen-img");
  
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("clickable-media") && e.target.tagName === "IMG") {
      fullImg.src = e.target.src;
      overlay.classList.add("active");
    }
  });
  
  overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
  });
}

/**
 * EMAIL COPY
 */
function initEmailCopy() {
  const copyBtn = document.getElementById("copy-email");
  const emailLink = document.getElementById("email-text");

  if (copyBtn && emailLink) {
    copyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const emailText = emailLink.textContent;
      navigator.clipboard.writeText(emailText).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "COPIED!";
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      });
    });
  }
}

/**
 * EXPERIENCE DRAWER
 */
function initExperienceDrawer() {
  const trigger = document.getElementById("exp-trigger");
  const drawer = document.getElementById("exp-drawer");
  const closeBtn = document.getElementById("exp-close");

  if (trigger && drawer) {
    trigger.addEventListener("click", () => {
      drawer.classList.add("is-open");
    });
    
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      drawer.classList.remove("is-open");
    });
  }
}

/**
 * PROJECT GRID
 */
function initProjectGrid() {
  const cards = document.querySelectorAll(".proj-card");
  cards.forEach(card => {
    const video = card.querySelector("video");
    if (video) {
      card.addEventListener("mouseenter", () => video.play().catch(() => {}));
      card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });
}

/**
 * UTILITY: FOCUS TRAPPING
 */
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (!focusableElements.length) return;
  
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  modal.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' || e.keyCode === 9) {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
    if (e.key === 'Escape') {
      const close = modal.querySelector(".modal-close");
      if(close) close.click();
    }
  });
  
  firstFocusableElement.focus();
}
