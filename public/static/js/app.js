document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const navbar = document.querySelector(".navbar");
  const navbarBurger = document.querySelector(".navbar-burger");
  const navbarMenu = document.querySelector(".navbar-menu");
  const languageMenu = document.getElementById("language-menu");
  const referenceContent = document.getElementById("reference-content");
  const breadcrumbNav = document.getElementById("breadcrumb-nav");
  const searchInput = document.getElementById("search-input");
  const backToTopBtn = document.getElementById("back-to-top-btn");

  // State
  let currentLang = null;
  let currentCategoryIndex = -1;
  let currentTopicIndex = -1;

  // Navbar functionality
  if (navbarBurger) {
    navbarBurger.addEventListener("click", () => {
      navbarBurger.classList.toggle("is-active");
      navbarMenu.classList.toggle("is-active");
    });
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }

    if (backToTopBtn) {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove("is-hidden");
      } else {
        backToTopBtn.classList.add("is-hidden");
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Data structure
  const references = {
    go: {
      title: "Go",
      icon: "devicon-go-original-wordmark",
      categories: [
        {
          name: "Basics",
          icon: "fa-book",
          topics: [
            {
              title: "Variables",
              url: "references/go/variables.html",
              icon: "fa-cube",
            },
            {
              title: "Functions",
              url: "references/go/functions.html",
              icon: "fa-cogs",
            },
            {
              title: "Error Handling",
              url: "references/go/errors.html",
              icon: "fa-exclamation-circle",
            },
            {
              title: "Idioms",
              url: "references/go/idioms.html",
              icon: "fa-lightbulb",
            },
          ],
        },
        {
          name: "Data Structures",
          icon: "fa-database",
          topics: [
            {
              title: "Structs",
              url: "references/go/structs.html",
              icon: "fa-archive",
            },
            {
              title: "Interfaces",
              url: "references/go/interfaces.html",
              icon: "fa-plug",
            },
          ],
        },
        {
          name: "Concurrency",
          icon: "fa-sync-alt",
          topics: [
            {
              title: "Goroutines & Channels",
              url: "references/go/concurrency.html",
              icon: "fa-sync-alt",
            },
          ],
        },
      ],
    },
    python: {
      title: "Python",
      icon: "devicon-python-plain",
      categories: [
        {
          name: "Basics",
          icon: "fa-book",
          topics: [
            {
              title: "Data Types",
              url: "references/python/data_types.html",
              icon: "fa-atom",
            },
            {
              title: "Functions",
              url: "references/python/functions.html",
              icon: "fa-cogs",
            },
            {
              title: "Exceptions",
              url: "references/python/exceptions.html",
              icon: "fa-exclamation-triangle",
            },
          ],
        },
        {
          name: "Object-Oriented",
          icon: "fa-object-group",
          topics: [
            {
              title: "Classes",
              url: "references/python/classes.html",
              icon: "fa-layer-group",
            },
          ],
        },
        {
          name: "Advanced",
          icon: "fa-rocket",
          topics: [
            {
              title: "Modules",
              url: "references/python/modules.html",
              icon: "fa-box-open",
            },
            {
              title: "Context Managers",
              url: "references/python/context.html",
              icon: "fa-lock",
            },
          ],
        },
      ],
    },
    javascript: {
      title: "JavaScript",
      icon: "devicon-javascript-plain",
      categories: [
        {
          name: "Basics",
          icon: "fa-book",
          topics: [
            {
              title: "Variables",
              url: "references/javascript/variables.html",
              icon: "fa-cube",
            },
            {
              title: "Functions",
              url: "references/javascript/functions.html",
              icon: "fa-cogs",
            },
          ],
        },
        {
          name: "Data Structures",
          icon: "fa-database",
          topics: [
            {
              title: "Objects",
              url: "references/javascript/objects.html",
              icon: "fa-archive",
            },
            {
              title: "Arrays",
              url: "references/javascript/arrays.html",
              icon: "fa-list-ol",
            },
          ],
        },
        {
          name: "Async Programming",
          icon: "fa-clock",
          topics: [
            {
              title: "Promises",
              url: "references/javascript/promises.html",
              icon: "fa-hourglass-half",
            },
            {
              title: "Async/Await",
              url: "references/javascript/async.html",
              icon: "fa-clock",
            },
          ],
        },
      ],
    },
    typescript: {
      title: "TypeScript",
      icon: "devicon-typescript-plain",
      categories: [
        {
          name: "Type System",
          icon: "fa-tag",
          topics: [
            {
              title: "Types",
              url: "references/typescript/types.html",
              icon: "fa-tag",
            },
            {
              title: "Interfaces",
              url: "references/typescript/interfaces.html",
              icon: "fa-plug",
            },
            {
              title: "Generics",
              url: "references/typescript/generics.html",
              icon: "fa-layer-group",
            },
          ],
        },
      ],
    },
    rust: {
      title: "Rust",
      icon: "devicon-rust-original",
      categories: [
        {
          name: "Memory Management",
          icon: "fa-memory",
          topics: [
            {
              title: "Ownership",
              url: "references/rust/ownership.html",
              icon: "fa-key",
            },
            {
              title: "Borrowing",
              url: "references/rust/borrowing.html",
              icon: "fa-hands-helping",
            },
          ],
        },
        {
          name: "Data Structures",
          icon: "fa-database",
          topics: [
            {
              title: "Structs",
              url: "references/rust/structs.html",
              icon: "fa-archive",
            },
          ],
        },
      ],
    },
    ruby: {
      title: "Ruby",
      icon: "devicon-ruby-plain",
      categories: [
        {
          name: "Basics",
          icon: "fa-book",
          topics: [
            {
              title: "Blocks & Procs",
              url: "references/ruby/blocks.html",
              icon: "fa-cube",
            },
          ],
        },
        {
          name: "Object-Oriented",
          icon: "fa-object-group",
          topics: [
            {
              title: "Classes",
              url: "references/ruby/classes.html",
              icon: "fa-layer-group",
            },
            {
              title: "Symbols",
              url: "references/ruby/symbols.html",
              icon: "fa-gem",
            },
          ],
        },
      ],
    },
  };

  // Build sidebar navigation
  function buildSidebar() {
    languageMenu.innerHTML = "";

    Object.keys(references).forEach((langKey) => {
      const langData = references[langKey];
      const li = document.createElement("li");

      // Language link
      const langLink = document.createElement("a");
      langLink.href = "#";
      langLink.dataset.lang = langKey;
      langLink.innerHTML = `<i class="${langData.icon}"></i> ${langData.title}`;
      li.appendChild(langLink);

      // Submenu for categories and topics
      const submenu = document.createElement("ul");
      submenu.className = "submenu";

      const basicLi = document.createElement("li");
      const basicLink = document.createElement("a");
      basicLink.href = "#";
      basicLink.dataset.lang = langKey;
      basicLink.dataset.isBasic = "true";
      basicLink.innerHTML = `<i class="fas fa-book"></i> Basic`;
      basicLi.appendChild(basicLink);
      submenu.appendChild(basicLi);

      langData.categories.forEach((category, catIndex) => {
        category.topics.forEach((topic, topicIndex) => {
          const topicLi = document.createElement("li");
          const topicLink = document.createElement("a");
          topicLink.href = "#";
          topicLink.dataset.lang = langKey;
          topicLink.dataset.categoryIndex = catIndex;
          topicLink.dataset.topicIndex = topicIndex;
          topicLink.innerHTML = `<i class="fas ${topic.icon}"></i> ${topic.title}`;
          topicLi.appendChild(topicLink);
          submenu.appendChild(topicLi);
        });
      });

      li.appendChild(submenu);
      languageMenu.appendChild(li);
    });
  }

  // Show welcome screen
  function showWelcome() {
    breadcrumbNav.innerHTML = "";
    let html = '<div class="content">';
    html += '<h2 class="title">Get Started</h2>';
    html +=
      '<p class="subtitle">Select a language from the menu to explore code examples and references</p>';
    html += '<div class="columns is-multiline">';

    Object.keys(references).forEach((langKey) => {
      const langData = references[langKey];
      html += '<div class="column is-6">';
      html += `<div class="box language-preview-box" data-lang="${langKey}">`;
      html += `<strong>${langData.title}</strong> - `;
      
      const topics = [];
      langData.categories.forEach((category, catIndex) => {
        category.topics.forEach((topic, topicIndex) => {
          topics.push(
            `<a href="#" class="topic-link" data-lang="${langKey}" data-category-index="${catIndex}" data-topic-index="${topicIndex}">${topic.title}</a>`
          );
        });
      });

      html += topics.join(", ");
      html += "</div></div>";
    });

    html += "</div></div>";
    referenceContent.innerHTML = html;
  }

  function displayCategory(lang) {
    currentLang = lang;
    currentCategoryIndex = -1;
    currentTopicIndex = -1;

    const langData = references[lang];
    window.scrollTo({ top: 0, behavior: "smooth" });

    breadcrumbNav.innerHTML = `
      <ul>
        <li><a href="#" class="breadcrumb-home">${langData.title}</a></li>
        <li class="is-active"><a href="#">Basic</a></li>
      </ul>
    `;

    let html = `<div class="content">`;
    html += `<h2 class="title">${langData.title} Basic</h2>`;
    html += `<div class="columns is-multiline">`;

    langData.categories.forEach((category, catIndex) => {
      category.topics.forEach((topic, topicIndex) => {
        html += `<div class="column is-6">`;
        html += `<a href="#" class="box topic-link" data-lang="${lang}" data-category-index="${catIndex}" data-topic-index="${topicIndex}">`;
        html += `<i class="fas ${topic.icon}"></i> ${topic.title}`;
        html += `</a></div>`;
      });
    });

    html += `</div></div>`;
    referenceContent.innerHTML = html;
  }

  // Display topic content
  function displayTopic(lang, categoryIndex, topicIndex) {
    currentLang = lang;
    currentCategoryIndex = categoryIndex;
    currentTopicIndex = topicIndex;

    const langData = references[lang];
    const category = langData.categories[categoryIndex];
    const topic = category.topics[topicIndex];

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Breadcrumb
    breadcrumbNav.innerHTML = `
      <ul>
        <li><a href="#" class="breadcrumb-home">${langData.title}</a></li>
        <li><a href="#" class="breadcrumb-category" data-lang="${lang}">${category.name}</a></li>
        <li class="is-active"><a href="#">${topic.title}</a></li>
      </ul>
    `;

    // Fetch content
    fetch(topic.url)
      .then((res) =>
        res.ok ? res.text() : Promise.reject(`HTTP ${res.status}`)
      )
      .then((html) => {
        referenceContent.innerHTML =
          html +
          '<div class="navigation-buttons"><button class="button" id="back-btn"><i class="fas fa-arrow-left"></i> Back</button></div>';
        Prism.highlightAll();
      })
      .catch((err) => {
        referenceContent.innerHTML = `<div class="notification is-danger">Error: ${err}</div>`;
      });
  }

  // Event: Language menu clicks
  languageMenu.addEventListener("click", (e) => {
    e.preventDefault();
    const link = e.target.closest("a");
    if (!link) return;

    const lang = link.dataset.lang;
    const catIndex = link.dataset.categoryIndex;
    const topicIndex = link.dataset.topicIndex;
    const isBasic = link.dataset.isBasic;

    if (isBasic) {
      displayCategory(lang);
      languageMenu
        .querySelectorAll("a")
        .forEach((a) => a.classList.remove("is-active"));
      link.classList.add("is-active");
    } else if (catIndex !== undefined && topicIndex !== undefined) {
      // Topic clicked
      displayTopic(lang, parseInt(catIndex), parseInt(topicIndex));

      // Update active states
      languageMenu
        .querySelectorAll("a")
        .forEach((a) => a.classList.remove("is-active"));
      link.classList.add("is-active");
    } else if (lang) {
      // Language clicked - toggle submenu
      const parentLi = link.parentElement;
      const submenu = parentLi.querySelector(".submenu");

      // Close other submenus
      languageMenu.querySelectorAll(".submenu").forEach((sm) => {
        if (sm !== submenu) sm.style.display = "none";
      });

      // Toggle this submenu
      submenu.style.display =
        submenu.style.display === "none" ? "block" : "none";

      // Update active language
      languageMenu
        .querySelectorAll(".menu-list > li > a")
        .forEach((a) => a.classList.remove("is-active"));
      link.classList.add("is-active");
      currentLang = lang;
    }
  });

  // Event: Content area clicks
  referenceContent.addEventListener("click", (e) => {
    if (e.target.closest("#back-btn")) {
      showWelcome();
    }

    const langPreview = e.target.closest(".language-preview-box");
    const langIconLink = e.target.closest(".language-icon-link");
    const topicLink = e.target.closest(".topic-link");

    if (topicLink) {
      e.preventDefault();
      e.stopPropagation();
      const lang = topicLink.dataset.lang;
      const catIndex = topicLink.dataset.categoryIndex;
      const topicIndex = topicLink.dataset.topicIndex;
      displayTopic(lang, parseInt(catIndex), parseInt(topicIndex));
    } else if (langPreview) {
      e.preventDefault();
      const lang = langPreview.dataset.lang;
      const langLink = languageMenu.querySelector(`a[data-lang="${lang}"]`);
      if (langLink) {
        langLink.click();
      }
    } else if (langIconLink) {
      e.preventDefault();
      const lang = langIconLink.dataset.lang;
      const langLink = languageMenu.querySelector(`a[data-lang="${lang}"]`);
      if (langLink) {
        langLink.click();
      }
    }
  });

  // Event: Breadcrumb clicks
  breadcrumbNav.addEventListener("click", (e) => {
    if (e.target.classList.contains("breadcrumb-home")) {
      e.preventDefault();
      showWelcome();
    } else if (e.target.classList.contains("breadcrumb-category")) {
      e.preventDefault();
      const lang = e.target.dataset.lang;
      displayCategory(lang);
    }
  });

  // Event: Search
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();
      if (!query) return;

      // Simple search through all topics
      let results = [];
      Object.keys(references).forEach((langKey) => {
        const langData = references[langKey];
        langData.categories.forEach((cat, catIdx) => {
          cat.topics.forEach((topic, topicIdx) => {
            if (topic.title.toLowerCase().includes(query)) {
              results.push({
                lang: langKey,
                langData,
                cat,
                catIdx,
                topic,
                topicIdx,
              });
            }
          });
        });
      });

      if (results.length > 0) {
        let html = `<div class="content"><h2 class="title">Search: "${query}"</h2>`;
        results.forEach((r) => {
          html += `<a href="#" class="box search-result" data-lang="${r.lang}" data-cat="${r.catIdx}" data-topic="${r.topicIdx}">`;
          html += `<strong>${r.langData.title}</strong> › ${r.cat.name} › ${r.topic.title}`;
          html += `</a>`;
        });
        html += "</div>";
        referenceContent.innerHTML = html;
      }
    });
  }

  // Init
  buildSidebar();
  showWelcome();
});
