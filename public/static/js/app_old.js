document.addEventListener("DOMContentLoaded", () => {
  // Navbar
  const navbar = document.querySelector(".navbar");
  const navbarBurger = document.querySelector(".navbar-burger");
  const navbarMenu = document.querySelector(".navbar-menu");

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
  });

  // Back to top button
  const backToTopBtn = document.getElementById("back-to-top-btn");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove("is-hidden");
      } else {
        backToTopBtn.classList.add("is-hidden");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Language menu and content
  const languageMenu = document.getElementById("language-menu");
  const referenceContent = document.getElementById("reference-content");
  const breadcrumbNav = document.getElementById("breadcrumb-nav");
  const searchInput = document.getElementById("search-input");

  const references = {
    go: {
      title: "Go",
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

  let currentLang = null;
  let currentTopicIndex = -1;
  let currentCategoryIndex = -1;

  // Helper function to get all topics from a language (flattened)
  function getAllTopics(lang) {
    const langRefs = references[lang];
    if (!langRefs || !langRefs.categories) return [];

    const allTopics = [];
    langRefs.categories.forEach((category, catIndex) => {
      category.topics.forEach((topic, topicIndex) => {
        allTopics.push({
          ...topic,
          categoryIndex: catIndex,
          topicIndex: topicIndex,
          categoryName: category.name,
        });
      });
    });
    return allTopics;
  }

  // Helper function to get a specific topic
  function getTopic(lang, categoryIndex, topicIndex) {
    const langRefs = references[lang];
    if (!langRefs || !langRefs.categories[categoryIndex]) return null;
    return langRefs.categories[categoryIndex].topics[topicIndex];
  }

  function displayTopics(lang, filter = "") {
    currentLang = lang;
    currentTopicIndex = -1;
    currentCategoryIndex = -1;
    const langRefs = references[lang];

    console.log("displayTopics called with lang:", lang);
    console.log("langRefs:", langRefs);

    if (!langRefs) {
      console.error("Language not found:", lang);
      referenceContent.innerHTML = `<div class="notification is-danger">Language "${lang}" not found.</div>`;
      return;
    }

    breadcrumbNav.innerHTML = "";
    let contentHtml = "<ul>";
    contentHtml += `<li><a href="#">${langRefs.title}</a></li>`;
    contentHtml += "</ul>";
    breadcrumbNav.innerHTML = contentHtml;

    let panelHtml = "";

    langRefs.categories.forEach((category, categoryIndex) => {
      // Filter topics in this category
      const filteredTopics = category.topics.filter((topic) =>
        topic.title.toLowerCase().includes(filter.toLowerCase())
      );

      if (filteredTopics.length > 0 || !filter) {
        panelHtml += `<div class="category-section mb-4">`;
        panelHtml += `<div class="category-header" data-category="${categoryIndex}">`;
        panelHtml += `<span class="category-icon"><i class="fas ${category.icon}"></i></span>`;
        panelHtml += `<span class="category-name">${category.name}</span>`;
        panelHtml += `<span class="category-toggle"><i class="fas fa-chevron-down"></i></span>`;
        panelHtml += `</div>`;
        panelHtml += `<div class="category-content" data-category="${categoryIndex}">`;
        panelHtml += '<div class="panel">';

        const topicsToShow = filter ? filteredTopics : category.topics;
        topicsToShow.forEach((topic) => {
          const topicIndex = category.topics.indexOf(topic);
          panelHtml += `<a class="panel-block" href="#" data-category-index="${categoryIndex}" data-topic-index="${topicIndex}">`;
          panelHtml += `<span class="panel-icon"><i class="fas ${topic.icon}"></i></span>`;
          panelHtml += `${topic.title}`;
          panelHtml += `</a>`;
        });

        panelHtml += "</div></div></div>";
      }
    });

    referenceContent.innerHTML = panelHtml;

    // Add click handlers for category headers
    document.querySelectorAll(".category-header").forEach((header) => {
      header.addEventListener("click", function () {
        const categoryIndex = this.dataset.category;
        const content = document.querySelector(
          `.category-content[data-category="${categoryIndex}"]`
        );
        const toggle = this.querySelector(".category-toggle i");

        content.classList.toggle("collapsed");
        toggle.classList.toggle("fa-chevron-down");
        toggle.classList.toggle("fa-chevron-right");
      });
    });
  }

  function displayTopicContent(lang, categoryIndex, topicIndex) {
    currentLang = lang;
    currentCategoryIndex = categoryIndex;
    currentTopicIndex = topicIndex;
    const langRefs = references[lang];
    const category = langRefs.categories[categoryIndex];
    const topic = category.topics[topicIndex];

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Breadcrumbs
    let breadcrumbHtml = "<ul>";
    breadcrumbHtml += `<li><a href="#" id="breadcrumb-lang">${langRefs.title}</a></li>`;
    breadcrumbHtml += `<li><a href="#" id="breadcrumb-category" data-category="${categoryIndex}">${category.name}</a></li>`;
    breadcrumbHtml += `<li class="is-active"><a href="#" aria-current="page">${topic.title}</a></li>`;
    breadcrumbHtml += "</ul>";
    breadcrumbNav.innerHTML = breadcrumbHtml;

    fetch(topic.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        let contentHtml = html;
        contentHtml += '<div class="navigation-buttons">';
        contentHtml += `<button class="button" id="back-to-list-btn"><i class="fas fa-arrow-left"></i> Back to ${langRefs.title}</button>`;
        contentHtml += "<div>";

        // Find prev/next topics across all categories
        const allTopics = getAllTopics(lang);
        const currentFlatIndex = allTopics.findIndex(
          (t) =>
            t.categoryIndex === categoryIndex && t.topicIndex === topicIndex
        );

        if (currentFlatIndex > 0) {
          const prevTopic = allTopics[currentFlatIndex - 1];
          contentHtml += `<button class="button" id="prev-topic-btn" data-category="${prevTopic.categoryIndex}" data-topic="${prevTopic.topicIndex}"><i class="fas fa-chevron-left"></i> Previous</button>`;
        }
        if (currentFlatIndex < allTopics.length - 1) {
          const nextTopic = allTopics[currentFlatIndex + 1];
          contentHtml += `<button class="button ml-2" id="next-topic-btn" data-category="${nextTopic.categoryIndex}" data-topic="${nextTopic.topicIndex}">Next <i class="fas fa-chevron-right"></i></button>`;
        }
        contentHtml += "</div>";
        contentHtml += "</div>";
        referenceContent.innerHTML = contentHtml;
      })
      .catch((error) => {
        console.error("Error fetching topic:", error);
        referenceContent.innerHTML = `<div class="notification is-danger">
            <p><strong>Error loading content:</strong> ${error.message}</p>
            <p>Topic: ${topic.title}</p>
            <p>URL: ${topic.url}</p>
            <button class="button" id="back-to-list-btn"><i class="fas fa-arrow-left"></i> Back to list</button>
          </div>`;
      });
  }

  if (languageMenu) {
    languageMenu.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.target.closest("a");
      if (target) {
        const lang = target.dataset.lang;
        if (lang) {
          if (searchInput) {
            searchInput.value = ""; // Clear search input
          }
          // Update active state in language menu
          const currentActive = languageMenu.querySelector(".is-active");
          if (currentActive) {
            currentActive.classList.remove("is-active");
          }
          target.classList.add("is-active");

          // Update content
          displayTopics(lang);
        }
      }
    });
  }

  referenceContent.addEventListener("click", (event) => {
    // Check for search result links with both data-lang and data-topic-index
    const target = event.target.closest("a");
    if (
      target &&
      target.dataset.lang &&
      target.dataset.categoryIndex !== undefined &&
      target.dataset.topicIndex !== undefined
    ) {
      event.preventDefault();
      const lang = target.dataset.lang;
      const categoryIndex = parseInt(target.dataset.categoryIndex, 10);
      const topicIndex = parseInt(target.dataset.topicIndex, 10);

      // Update active language in menu
      const langLink = languageMenu.querySelector(`a[data-lang="${lang}"]`);
      if (langLink) {
        const currentActive = languageMenu.querySelector(".is-active");
        if (currentActive) {
          currentActive.classList.remove("is-active");
        }
        langLink.classList.add("is-active");
      }

      // Clear search
      if (searchInput) {
        searchInput.value = "";
      }

      displayTopicContent(lang, categoryIndex, topicIndex);
      return;
    }

    // Check for topic links (existing functionality)
    if (
      target &&
      target.dataset.categoryIndex !== undefined &&
      target.dataset.topicIndex !== undefined
    ) {
      event.preventDefault();
      const categoryIndex = parseInt(target.dataset.categoryIndex, 10);
      const topicIndex = parseInt(target.dataset.topicIndex, 10);
      displayTopicContent(currentLang, categoryIndex, topicIndex);
      return;
    }

    // Check for buttons
    const button = event.target.closest("button");
    if (button) {
      if (button.id === "back-to-list-btn") {
        displayTopics(currentLang);
      } else if (button.id === "prev-topic-btn") {
        const catIndex = parseInt(button.dataset.category, 10);
        const topIndex = parseInt(button.dataset.topic, 10);
        displayTopicContent(currentLang, catIndex, topIndex);
      } else if (button.id === "next-topic-btn") {
        const catIndex = parseInt(button.dataset.category, 10);
        const topIndex = parseInt(button.dataset.topic, 10);
        displayTopicContent(currentLang, catIndex, topIndex);
      }
    }
  });

  function performGlobalSearch(query) {
    let resultsHtml = '<div class="content">';
    resultsHtml += `<h2 class="title">Search Results for "${query}"</h2>`;

    let found = false;
    let resultCount = 0;

    // Search through all languages and categories
    for (const [langKey, langData] of Object.entries(references)) {
      const allTopics = getAllTopics(langKey);
      const matchingTopics = allTopics.filter((topic) =>
        topic.title.toLowerCase().includes(query)
      );

      if (matchingTopics.length > 0) {
        found = true;
        resultsHtml += `<div class="box mb-4">`;
        resultsHtml += `<h3 class="subtitle has-text-primary">${langData.title}</h3>`;
        resultsHtml += `<div class="panel">`;

        matchingTopics.forEach((topic) => {
          resultsHtml += `<a class="panel-block" href="#" data-lang="${langKey}" data-category-index="${topic.categoryIndex}" data-topic-index="${topic.topicIndex}">`;
          resultsHtml += `<span class="panel-icon"><i class="fas ${topic.icon}"></i></span>`;
          resultsHtml += `${topic.title}`;
          resultsHtml += `<span class="has-text-grey-light ml-2">(${topic.categoryName})</span>`;
          resultsHtml += `</a>`;
          resultCount++;
        });

        resultsHtml += `</div></div>`;
      }
    }

    if (!found) {
      resultsHtml += `<div class="notification is-warning">No topics found matching "${query}". Try a different search term.</div>`;
    } else {
      resultsHtml += `<p class="has-text-grey mt-4">Found ${resultCount} topic${
        resultCount !== 1 ? "s" : ""
      }</p>`;
    }

    resultsHtml += "</div>";
    referenceContent.innerHTML = resultsHtml;
    breadcrumbNav.innerHTML = `<ul><li class="is-active"><a href="#">Search Results</a></li></ul>`;
  }

  breadcrumbNav.addEventListener("click", (event) => {
    if (event.target.id === "breadcrumb-lang") {
      event.preventDefault();
      displayTopics(currentLang);
    }
  });

  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      const query = searchInput.value.toLowerCase().trim();

      if (!query) {
        // If search is empty, show current language topics
        if (currentLang) {
          displayTopics(currentLang);
        }
        return;
      }

      if (currentLang) {
        // Search within current language
        displayTopics(currentLang, query);
      } else {
        // Global search across all languages
        performGlobalSearch(query);
      }
    });
  }

  // Initial state
  if (languageMenu) {
    const initialLang = languageMenu.querySelector("a").dataset.lang;
    displayTopics(initialLang);
    languageMenu.querySelector("a").classList.add("is-active");
  }
});
