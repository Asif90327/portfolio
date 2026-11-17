/**
 * Dudekula Asif Umar Baba — Portfolio Interactive Script
 * Update PROFILE_CONFIG below with your live LinkedIn, GitHub, and project repository links.
 */

const PROFILE_CONFIG = {
  email: "d.asifdudekula@gmail.com",
  phone: "+91 9032737904",
  linkedinUrl: "https://www.linkedin.com/in/asif-d-6b5342287",
  githubUrl: "https://github.com/Asif90327",
  projectRepos: {
    rag: "https://github.com/Asif90327",
    dms: "https://github.com/Asif90327"
  }
};

const PIPELINE_STAGES = {
  mel: {
    title: "Audio Features",
    text: "Turns raw mixed-language audio into time-frequency spectrograms."
  },
  acoustic: {
    title: "Acoustic Model",
    text: "Conformer/Transformer encodes local speech cues and global sentence context."
  },
  ctc: {
    title: "Alignment",
    text: "CTC + Attention aligns variable-length code-switched speech cleanly."
  },
  lm: {
    title: "Multilingual Decoding",
    text: "mBERT/XLM-R + Beam Search rescore outputs for accurate cross-language NLU."
  }
};

const PROJECT_DETAILS = {
  rag: {
    kicker: "GEN AI · RAG PIPELINE",
    title: "RAG Document Q&A System",
    overview: "Semantic search and grounded Q&A over uploaded PDFs using Python, LangChain, and FAISS.",
    architecture: [
      "PDF parsing + smart text chunking",
      "Dense embedding generation for semantic retrieval",
      "FAISS vector index for fast top-k similarity search",
      "LangChain LLM inference for grounded answers & summaries"
    ],
    stack: ["Python", "LangChain", "FAISS", "Embeddings", "LLM"]
  },
  dms: {
    kicker: "FULL-STACK · RELATIONAL DB",
    title: "Donation Management System",
    overview: "Full-stack donor & campaign tracker with RBAC, Flask REST APIs, and MySQL.",
    architecture: [
      "Normalized 6+ table MySQL schema (donors, campaigns, donations, transactions)",
      "Secure REST APIs with role-based access control & input validation",
      "Optimized SQL queries for fast transaction lookups",
      "Responsive dashboards to track donations & manage campaigns"
    ],
    stack: ["Python", "Flask", "MySQL", "REST APIs", "RBAC"]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  applyProfileLinks();
  initThemeToggle();
  initMobileMenu();
  initScrollSpy();
  initRevealAnimations();
  initSpeechPipeline();
  initSkillFilter();
  initProjectModal();
  initCopyButtons();
  initContactForm();
  updateYear();
});

function applyProfileLinks() {
  document.querySelectorAll('[data-social="linkedin"]').forEach((el) => {
    el.setAttribute("href", PROFILE_CONFIG.linkedinUrl);
  });
  document.querySelectorAll('[data-social="github"]').forEach((el) => {
    el.setAttribute("href", PROFILE_CONFIG.githubUrl);
  });
}

function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const updateAria = (theme) => {
    toggleBtn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  };

  updateAria(document.documentElement.getAttribute("data-theme") || "light");

  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
    updateAria(next);
  });
}

function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = !menu.hidden;
    menu.hidden = isOpen;
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      closeMenu();
    }
  });
}

function initScrollSpy() {
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".primary-nav .nav-link"));
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.getAttribute("id"));
          }
        });
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Ensure the last section (#contact) activates when scrolled to the bottom
  window.addEventListener(
    "scroll",
    () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
      if (nearBottom) {
        const last = sections[sections.length - 1];
        if (last) setActive(last.getAttribute("id"));
      }
    },
    { passive: true }
  );
}

function initRevealAnimations() {
  const elements = Array.from(document.querySelectorAll(".reveal"));
  if (!elements.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const revealVisibleNow = () => {
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.98) {
        el.classList.add("is-visible");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: "0px 0px -20px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
  revealVisibleNow();
  window.addEventListener("hashchange", revealVisibleNow);
}

function initSpeechPipeline() {
  const buttons = document.querySelectorAll(".pipeline-step");
  const detailBox = document.getElementById("pipeline-detail");
  if (!buttons.length || !detailBox) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const stageKey = btn.dataset.stage;
      const stage = PIPELINE_STAGES[stageKey];
      if (!stage) return;

      buttons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", String(active));
      });

      detailBox.replaceChildren();
      const strong = document.createElement("strong");
      strong.textContent = `${stage.title}: `;
      detailBox.append(strong, document.createTextNode(stage.text));
    });
  });
}

function initSkillFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("#skills-grid .skill-card");
  if (!filterButtons.length || !cards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = btn.dataset.filter;

      filterButtons.forEach((b) => b.classList.toggle("is-active", b === btn));

      cards.forEach((card) => {
        const match = selected === "all" || card.dataset.category === selected;
        card.classList.toggle("is-hidden", !match);
        if (match) {
          card.classList.add("is-visible");
        }
      });
    });
  });
}

function initProjectModal() {
  const dialog = document.getElementById("project-dialog");
  const titleEl = document.getElementById("dialog-title");
  const kickerEl = document.getElementById("dialog-kicker");
  const bodyEl = document.getElementById("dialog-body");
  const repoLink = document.getElementById("dialog-repo-link");
  const closeIcon = document.getElementById("dialog-close");
  const closeBtn = document.getElementById("dialog-close-btn");

  if (!dialog || !titleEl || !kickerEl || !bodyEl) return;

  const openModal = (key) => {
    const data = PROJECT_DETAILS[key];
    if (!data) return;

    kickerEl.textContent = data.kicker;
    titleEl.textContent = data.title;
    repoLink.setAttribute("href", PROFILE_CONFIG.projectRepos[key] || PROFILE_CONFIG.githubUrl);

    bodyEl.replaceChildren();

    const overviewP = document.createElement("p");
    overviewP.textContent = data.overview;
    bodyEl.appendChild(overviewP);

    const archSection = document.createElement("div");
    archSection.className = "dialog-section";
    const archHeading = document.createElement("h4");
    archHeading.textContent = "Key Highlights";
    const list = document.createElement("ul");
    list.className = "dialog-list";

    data.architecture.forEach((point) => {
      const li = document.createElement("li");
      li.textContent = point;
      list.appendChild(li);
    });

    archSection.append(archHeading, list);
    bodyEl.appendChild(archSection);

    const stackSection = document.createElement("div");
    stackSection.className = "dialog-section";
    const stackHeading = document.createElement("h4");
    stackHeading.textContent = "Technologies Used";
    const tagGroup = document.createElement("div");
    tagGroup.className = "tag-group";

    data.stack.forEach((tech) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tech;
      tagGroup.appendChild(span);
    });

    stackSection.append(stackHeading, tagGroup);
    bodyEl.appendChild(stackSection);

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  };

  const closeModal = () => {
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  };

  document.querySelectorAll("[data-project-modal]").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.projectModal));
  });

  closeIcon?.addEventListener("click", closeModal);
  closeBtn?.addEventListener("click", closeModal);

  // Close when clicking outside .dialog-content (backdrop click only)
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeModal();
    }
  });
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2600);
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const input = document.createElement("textarea");
    input.value = text;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(input);
    return ok;
  }
}

function initCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.dataset.copy;
      if (!value) return;
      await copyTextToClipboard(value);
      showToast(`Copied: ${value}`);
    });
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const resultPanel = document.getElementById("form-result");
  const previewEl = document.getElementById("result-preview");
  const gmailLink = document.getElementById("result-gmail-link");
  const mailtoLink = document.getElementById("result-mailto-link");
  const copyBtn = document.getElementById("result-copy-btn");
  const editBtn = document.getElementById("result-edit-btn");

  if (!form || !resultPanel) return;

  let lastFormattedCopy = "";

  const fields = {
    name: {
      input: form.elements.name,
      errorEl: document.getElementById("error-name"),
      validate: (val) => (val.length >= 2 ? "" : "Please enter your name.")
    },
    email: {
      input: form.elements.email,
      errorEl: document.getElementById("error-email"),
      validate: (val) => {
        if (!val) return "Please enter your email address.";
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
          ? ""
          : "Please enter a valid email address.";
      }
    },
    subject: {
      input: form.elements.subject,
      errorEl: document.getElementById("error-subject"),
      validate: (val) => (val.length >= 2 ? "" : "Please enter a subject.")
    },
    message: {
      input: form.elements.message,
      errorEl: document.getElementById("error-message"),
      validate: (val) => (val.length >= 5 ? "" : "Please enter a short message.")
    }
  };

  const setFieldError = (fieldObj, msg) => {
    fieldObj.input.classList.toggle("is-invalid", Boolean(msg));
    if (fieldObj.errorEl) fieldObj.errorEl.textContent = msg;
  };

  // Clear inline errors live as user types
  Object.values(fields).forEach((fieldObj) => {
    fieldObj.input.addEventListener("input", () => {
      if (fieldObj.input.classList.contains("is-invalid")) {
        const msg = fieldObj.validate(fieldObj.input.value.trim());
        setFieldError(fieldObj, msg);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let firstInvalid = null;
    Object.values(fields).forEach((fieldObj) => {
      const msg = fieldObj.validate(fieldObj.input.value.trim());
      setFieldError(fieldObj, msg);
      if (msg && !firstInvalid) firstInvalid = fieldObj.input;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      showToast("Please fix the highlighted fields.");
      return;
    }

    const name = fields.name.input.value.trim();
    const email = fields.email.input.value.trim();
    const subject = fields.subject.input.value.trim();
    const message = fields.message.input.value.trim();

    const body = `Hi Asif,\n\n${message}\n\nBest regards,\n${name}\n(${email})`;
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      PROFILE_CONFIG.email
    )}&su=${encodedSubject}&body=${encodedBody}`;
    const mailtoUrl = `mailto:${PROFILE_CONFIG.email}?subject=${encodedSubject}&body=${encodedBody}`;

    lastFormattedCopy = `To: ${PROFILE_CONFIG.email}\nSubject: ${subject}\n\n${body}`;

    if (previewEl) previewEl.textContent = lastFormattedCopy;
    if (gmailLink) gmailLink.setAttribute("href", gmailUrl);
    if (mailtoLink) mailtoLink.setAttribute("href", mailtoUrl);

    form.hidden = true;
    resultPanel.hidden = false;

    // Open Gmail Web Compose in a new tab directly on user submit gesture
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    showToast("Draft ready! Opening Gmail Compose...");
  });

  copyBtn?.addEventListener("click", async () => {
    if (!lastFormattedCopy) return;
    await copyTextToClipboard(lastFormattedCopy);
    showToast("Formatted message copied to clipboard!");
  });

  editBtn?.addEventListener("click", () => {
    resultPanel.hidden = true;
    form.hidden = false;
    fields.name.input.focus();
  });
}

function updateYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}
