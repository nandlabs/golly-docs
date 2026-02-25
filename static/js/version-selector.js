(function () {
  "use strict";

  var configEl = document.getElementById("version-config");
  if (!configEl) return;

  var config = JSON.parse(configEl.textContent);

  function createVersionSelector() {
    var nav = document.querySelector("nav");
    if (!nav) return;

    // Find the About link in the navbar
    var navLinks = nav.querySelectorAll("a");
    var targetLink = null;
    navLinks.forEach(function (link) {
      if (link.textContent.trim() === "About") {
        targetLink = link;
      }
    });
    // Fallback to first link if About not found
    if (!targetLink) targetLink = nav.querySelector("a");
    if (!targetLink) return;

    // Create the version selector container
    var container = document.createElement("div");
    container.className = "version-selector";

    // Create the button
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "version-selector-btn";
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML =
      "<span>" +
      config.current +
      "</span>" +
      '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';

    // Create the dropdown menu
    var menu = document.createElement("div");
    menu.className = "version-selector-menu";

    config.versions.forEach(function (v) {
      var item = document.createElement("a");
      item.href = v.url;
      item.className =
        "version-selector-item" + (v.current ? " version-current" : "");
      item.innerHTML =
        "<span>" +
        v.label +
        "</span>" +
        (v.current
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
          : "");
      menu.appendChild(item);
    });

    container.appendChild(btn);
    container.appendChild(menu);

    // Insert after the About link
    targetLink.insertAdjacentElement("afterend", container);

    // Toggle dropdown on click
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !expanded);
      menu.classList.toggle("version-selector-open");
    });

    // Close on outside click
    document.addEventListener("click", function () {
      menu.classList.remove("version-selector-open");
      btn.setAttribute("aria-expanded", "false");
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        menu.classList.remove("version-selector-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createVersionSelector);
  } else {
    createVersionSelector();
  }
})();
