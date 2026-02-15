import translate, { svgIcons } from "./translations.js";
import Typewriter from "@datex2/typewriterjs/dist/core";
import { $, setStyle, isDev, onUnload } from "./utils.js";
const CDN_BASE = "https://cdn.jsdelivr.net/gh/DATEx2/products";
function getDescriptionUrl(src, commitHash) {
  if (isDev()) {
    return `/db/dist/${src}`;
  }
  return `${CDN_BASE}@${commitHash}/${src}`;
}
let activeTypewriterInstances = [];
const TYPE_SPEED = 1;
const HEADER_TYPE_SPEED = 3;
const TYPED_CLASS = "data-typed";
let elementsTypingContentCleared = /* @__PURE__ */ new Set();
const hrefSyncObservers = [];
let typewriterObserver = null;
let elementsBeingObserved = /* @__PURE__ */ new Set();
function decodeSpecificEntities(encodedString) {
  if (!encodedString) return "";
  return encodedString.replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
}
function restoreAllTypedElementsContent() {
  elementsTypingContentCleared.forEach((el) => {
    if (!el.hasAttribute(TYPED_CLASS)) {
      const originalText = el.dataset.originalText;
      if (originalText) {
        el.innerHTML = decodeSpecificEntities(originalText);
      }
      setStyle(el, "height, min-height, position, overflow", "");
      setStyle(el, "visibility", "visible", true);
    }
  });
  elementsTypingContentCleared.clear();
}
function destroyActiveTypewriters() {
  activeTypewriterInstances.forEach((w) => {
    try {
      w.stop();
    } catch (e) {
    }
  });
  activeTypewriterInstances = [];
  restoreAllTypedElementsContent();
}
window.addEventListener("resize", destroyActiveTypewriters);
function disconnectAllHrefSyncObservers() {
  hrefSyncObservers.forEach((observer) => observer.disconnect());
  hrefSyncObservers.length = 0;
}
onUnload(() => disconnectAllHrefSyncObservers(), true);
function updateClonedHref(originalLink, clonedElement) {
  const newHref = originalLink.getAttribute("href");
  const socialClass = Array.from(originalLink.classList).find((cls) => cls.startsWith("ec-likely__widget--"));
  if (socialClass) {
    const $clonedLink = $(clonedElement).find(`.${socialClass}`);
    if ($clonedLink.length && $clonedLink.attr("href") !== newHref) {
      $clonedLink.attr("href", newHref);
    }
  }
}
function syncHrefAttribute(originalElement, clonedElement) {
  if (!originalElement || !clonedElement) return;
  $(originalElement).find("a").each(function() {
    updateClonedHref(this, clonedElement);
  });
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === "href") {
        updateClonedHref(mutation.target, clonedElement);
      }
    }
  });
  observer.observe(originalElement, { attributes: true, attributeFilter: ["href"], subtree: true });
  hrefSyncObservers.push(observer);
}
let versionCheckDone = false;
async function checkAssetVersions() {
  if (versionCheckDone) return;
  versionCheckDone = true;
  try {
    const resp = await fetch("/api/versions");
    if (!resp.ok) return;
    const latest = await resp.json();
    const root = document.documentElement;
    const currentCss = root.getAttribute("data-css-v");
    const currentJs = root.getAttribute("data-js-v");
    if (currentCss && latest.css && currentCss !== latest.css) {
      console.log(`[Versions] CSS update: ${currentCss} \u2192 ${latest.css}`);
      const oldLink = document.getElementById("dxCSS");
      if (oldLink) {
        const newLink = document.createElement("link");
        newLink.id = "dxCSS";
        newLink.rel = "stylesheet";
        newLink.title = "dx";
        newLink.media = "all";
        newLink.href = isDev() ? `/db/dist/css/DATEx2.bike.css?v=${latest.css}` : oldLink.href.replace(/\?.*$/, "") + `?v=${latest.css}`;
        newLink.onload = () => {
          oldLink.remove();
          root.setAttribute("data-css-v", latest.css);
          console.log("[Versions] CSS hot-swapped successfully");
        };
        oldLink.parentNode.insertBefore(newLink, oldLink.nextSibling);
      }
    }
    if (currentJs && latest.js && currentJs !== latest.js) {
      console.log(`[Versions] JS update available: ${currentJs} \u2192 ${latest.js}`);
      showJsUpdatePopup();
    }
  } catch (e) {
    console.warn("[Versions] Check failed:", e);
  }
}
function showJsUpdatePopup() {
  if (document.getElementById("dx-update-popup")) return;
  const overlay = document.createElement("div");
  overlay.id = "dx-update-popup";
  overlay.innerHTML = `
        <div style="position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.6);backdrop-filter:blur(4px)">
            <div style="background:#1a1a2e;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:32px;max-width:400px;text-align:center;box-shadow:0 25px 50px rgba(0,0,0,.5)">
                <div style="font-size:32px;margin-bottom:12px">\u{1F504}</div>
                <h3 style="color:#fff;font-family:Inter,system-ui,sans-serif;font-size:18px;margin:0 0 8px">New Version Available</h3>
                <p style="color:rgba(255,255,255,.6);font-size:14px;margin:0 0 24px;line-height:1.5">A new version of the app is available. Reload to get the latest features?</p>
                <div style="display:flex;gap:12px;justify-content:center">
                    <button id="dx-update-cancel" style="padding:10px 24px;border-radius:10px;border:1px solid rgba(255,255,255,.15);background:transparent;color:rgba(255,255,255,.7);cursor:pointer;font-size:14px;font-family:Inter,system-ui,sans-serif;transition:all .2s">Not Now</button>
                    <button id="dx-update-ok" style="padding:10px 24px;border-radius:10px;border:none;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;cursor:pointer;font-size:14px;font-weight:600;font-family:Inter,system-ui,sans-serif;transition:all .2s">Reload</button>
                </div>
            </div>
        </div>`;
  document.body.appendChild(overlay);
  document.getElementById("dx-update-ok").onclick = () => {
    const optionsParam = serializeSelectedOptions();
    const url = new URL(location.href);
    if (optionsParam) url.searchParams.set("options", optionsParam);
    location.href = url.toString();
  };
  document.getElementById("dx-update-cancel").onclick = () => overlay.remove();
}
function serializeSelectedOptions() {
  const groups = document.querySelectorAll(".form-control");
  if (!groups.length) return "";
  const indices = [];
  groups.forEach((group) => {
    const inputs = group.querySelectorAll("input");
    const checked = group.querySelector("input:checked");
    if (checked && inputs.length) {
      indices.push(Array.from(inputs).indexOf(checked));
    } else {
      indices.push(0);
    }
  });
  return indices.join(",");
}
function restoreSelectedOptions() {
  const url = new URL(location.href);
  const optionsParam = url.searchParams.get("options");
  if (!optionsParam) return;
  const indices = optionsParam.split(",").map(Number);
  const tryRestore = (attempts = 0) => {
    const groups = document.querySelectorAll(".form-control");
    if (!groups.length && attempts < 20) {
      setTimeout(() => tryRestore(attempts + 1), 300);
      return;
    }
    groups.forEach((group, i) => {
      if (i < indices.length) {
        const inputs = group.querySelectorAll("input");
        const target = inputs[indices[i]];
        if (target && !target.checked) {
          target.click();
        }
      }
    });
    url.searchParams.delete("options");
    history.replaceState(null, "", url.toString());
    console.log(`[Options] Restored selections: ${optionsParam}`);
  };
  tryRestore();
}
restoreSelectedOptions();
function injectProductDetailsTabs(target) {
  const $parent = $(target);
  $parent.arrive(".product-details__product-description", { existing: true, onceOnly: false }, async (elem) => {
    const placeholder = elem.querySelector("#pd") || (elem.id === "pd" ? elem : null);
    if (!placeholder) return;
    const src = placeholder.getAttribute("data-src");
    const commitHash = placeholder.getAttribute("data-version");
    if (!src) return;
    placeholder.innerHTML = '<div class="pd-skeleton" style="min-height:400px;background:linear-gradient(90deg,rgba(255,255,255,.03) 25%,rgba(255,255,255,.06) 50%,rgba(255,255,255,.03) 75%);background-size:200% 100%;animation:pd-shimmer 1.5s infinite;border-radius:12px"></div>';
    if (!document.getElementById("pd-skeleton-style")) {
      const style = document.createElement("style");
      style.id = "pd-skeleton-style";
      style.textContent = "@keyframes pd-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}";
      document.head.appendChild(style);
    }
    const url = getDescriptionUrl(src, commitHash);
    checkAssetVersions();
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        console.warn(`[PD] Failed to load description ${src}: ${resp.status}`);
        placeholder.innerHTML = "";
        return;
      }
      const html = await resp.text();
      placeholder.outerHTML = html;
      console.log(`[PD] Injected ${src} (${html.length} chars)`);
    } catch (err) {
      console.error(`[PD] Fetch error for ${src}:`, err);
      placeholder.innerHTML = "";
    }
  });
  const tabs = {
    features: "Features",
    options: "Options",
    specs: "Specs",
    reviews: "Reviews"
  };
  const $nav = $parent.findOrCreate(".js-tabs-nav", () => {
    const $container = $("<div class=js-tabs-nav></div>");
    for (const [id, name] of Object.entries(tabs)) {
      $container.append(`<button class="js-tab-btn" data-tab="${id}">${translate(name)}</button>`);
    }
    $container.append("<div class=share-tabs></div>");
    return $container;
  }, true);
  $parent.parent().arrive(".product-details__sidebar .product-details__product-share", { existing: true, onceOnly: true }, (elem) => {
    const $shareTabs = $nav.find(".share-tabs");
    if ($shareTabs.children().length === 0) {
      const $cloned = $(elem).clone();
      $shareTabs.append($cloned);
      $shareTabs.find(".ec-likely__wrapper").findOrCreate(
        ".ec-likely__widget--whatsapp",
        () => `<a href="https://api.whatsapp.com/send/?text=Check%20out%20this%20item%20${encodeURI(location.href)}" target="_blank" class="ec-likely__widget ec-likely__widget--whatsapp"><span class="ec-likely__icon ec-likely__icon--whatsapp">${svgIcons.whatsapp()}</span><span class="ec-likely__button">Share</span></a>`
      );
      syncHrefAttribute(elem, $cloned[0]);
    }
    $(elem).hide();
  });
  const scrollHistory = {};
  let currentActiveTab = "";
  function setTab(tabName, updateHistory = false) {
    $parent.attr("data-active-tab", tabName);
    $d.alterClass("view-tab-*", `view-tab-${tabName}`);
    if (updateHistory) {
      const newHash = tabName === "options" ? window.location.pathname + window.location.search : "#" + tabName;
      if (location.hash !== newHash) {
        try {
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          document.body.appendChild(iframe);
          const originalPushState = iframe.contentWindow.history.pushState;
          originalPushState.call(window.history, null, null, newHash);
          document.body.removeChild(iframe);
        } catch (e) {
          history.pushState(null, null, newHash);
        }
      }
    }
    if (currentActiveTab === tabName) return;
    $("body").removeClass((i, className) => (className.match(/(^|\s)active-tab-\S+/g) || []).join(" "));
    $("body").addClass("active-tab-" + tabName);
    scrollHistory[currentActiveTab] = $("body").scrollTop();
    $(".js-tab-btn").removeClass("active");
    $(`.js-tab-btn[data-tab="${tabName}"]`).addClass("active");
    currentActiveTab = tabName;
    const scroll = scrollHistory[tabName] ?? 0;
    $("body").stop().animate({ scrollTop: scroll }, 250);
    destroyActiveTypewriters();
    determineProductDetailsLargeOptions();
    setTimeout(animateActiveSection, 100);
  }
  $(".js-tab-btn").on("click", function() {
    setTab($(this).data("tab"), true);
  });
  function routerFilter(e) {
    const hash = location.hash.replace("#", "");
    const effectiveTab = hash === "" ? "options" : hash;
    if (tabs[effectiveTab]) {
      setTab(effectiveTab, false);
      return true;
    }
    return false;
  }
  if (!window.__datex2RouterFilterAttached) {
    window.__datex2RouterFilterAttached = true;
    window.addEventListener("popstate", routerFilter, true, true);
    window.addEventListener("hashchange", routerFilter, true, true);
  }
  initProductAttributeTables();
  const initialHash = location.hash.replace("#", "");
  const startTab = tabs[initialHash] ? initialHash : "options";
  setTab(startTab, false);
  function animateHeaderSequence(h1El) {
    const $container = $(h1El).closest(".product-details");
    const h1ContentEl = h1El;
    const subContentEl = $container.find(".product-details__subtitle .product-details-module__content")[0];
    const noteContentEl = $container.find(".product-details__subtitle-note")[0];
    const elementsToAnimate = [
      { el: h1ContentEl, speed: HEADER_TYPE_SPEED },
      { el: subContentEl, speed: TYPE_SPEED },
      { el: noteContentEl, speed: TYPE_SPEED }
    ].filter((item) => item.el && !item.el.hasAttribute(TYPED_CLASS));
    elementsToAnimate.forEach((item) => {
      if (!item.el.dataset.originalText) item.el.dataset.originalText = item.el.innerHTML;
      const decodedText = decodeSpecificEntities(item.el.dataset.originalText);
      const $el = $(item.el);
      setStyle(item.el, "height, min-height", $el.outerHeight() + "px", true);
      setStyle(item.el, "overflow", "hidden", true);
      $el.empty();
      elementsTypingContentCleared.add(item.el);
      setStyle(item.el, { "visibility": "visible", "opacity": "1" }, null, true);
      const typewriter = new Typewriter(item.el, { loop: false, delay: 1, speed: item.speed, cursor: "" });
      activeTypewriterInstances.push(typewriter);
      typewriter.typeString(decodedText).callFunction(() => {
        item.el.classList.add("anim-active");
        item.el.setAttribute(TYPED_CLASS, "true");
        setStyle(item.el, "height, min-height, position, overflow", "");
        elementsTypingContentCleared.delete(item.el);
      }).start();
    });
  }
  function startTypewriter(el) {
    if (el.hasAttribute(TYPED_CLASS)) return;
    if ($(el).is("h1") && currentActiveTab === "options") {
      animateHeaderSequence(el);
      return;
    }
    if ($(el).hasClass("details-product-attribute__value")) {
      setStyle(el, { "visibility": "visible", "opacity": "1" }, null, true);
      $(el).find(".s1, .s2, .spec-full").each(function() {
        startTypewriter(this);
      });
      return;
    }
    const text = el.dataset.originalText || el.innerHTML;
    if (!el.dataset.originalText) el.dataset.originalText = text;
    const $el = $(el);
    setStyle(el, "height, min-height", $el.outerHeight() + "px", true);
    setStyle(el, "overflow", "hidden", true);
    $el.empty();
    elementsTypingContentCleared.add(el);
    setStyle(el, { "visibility": "visible", "opacity": "1", "display": "" }, null, true);
    const isSpec = $el.is(".s1, .s2, .spec-full, .details-product-attribute__title");
    const delay = isSpec ? 20 : TYPE_SPEED;
    const typewriter = new Typewriter(el, { loop: false, delay, cursor: "" });
    activeTypewriterInstances.push(typewriter);
    const parserDiv = document.createElement("div");
    parserDiv.innerHTML = text;
    function queueNodes(nodes) {
      Array.from(nodes).forEach((node) => {
        if (node.nodeType === 3) {
          const val = node.textContent;
          if (val.length > 0) {
            typewriter.typeString(val);
          }
        } else if (node.nodeType === 1) {
          const tagName = node.tagName.toLowerCase();
          if (["br", "img", "hr", "input"].includes(tagName)) {
            typewriter.pasteString(node.outerHTML);
            return;
          }
          const attrs = Array.from(node.attributes).map((a) => ` ${a.name}="${a.value}"`).join("");
          typewriter.pasteString(`<${tagName}${attrs}>`);
          queueNodes(node.childNodes);
          typewriter.pasteString(`</${tagName}>`);
        }
      });
    }
    queueNodes(parserDiv.childNodes);
    typewriter.callFunction(() => {
      el.classList.add("anim-active");
      el.setAttribute(TYPED_CLASS, "true");
      setStyle(el, "height, min-height, position, overflow", "");
      elementsTypingContentCleared.delete(el);
    }).start();
  }
  function animateActiveSection() {
    if (typewriterObserver) typewriterObserver.disconnect();
    elementsBeingObserved.clear();
    typewriterObserver = new IntersectionObserver((entries) => {
      window.requestAnimationFrame(() => {
        for (const entry of entries) {
          if (entry.isIntersecting && !entry.target.hasAttribute(TYPED_CLASS)) {
            startTypewriter(entry.target);
          }
        }
      });
    }, { threshold: 0.1 });
    const selectors = [
      "h1",
      "h2",
      "h3",
      "h4",
      "p",
      "li",
      ".product-details-module__title",
      ".review-block__title",
      ".details-product-attribute__title",
      // Target leaf nodes of the new fluid table structure for safer, parallel typing
      ".s1",
      ".s2",
      ".spec-full",
      // Fallback: Watch container to manually trigger children if needed
      ".details-product-attribute__value"
    ].join(", ");
    $parent.arrive(selectors, { existing: true }, function() {
      if (!this.dataset.originalText) this.dataset.originalText = this.innerHTML;
      if (!this.hasAttribute(TYPED_CLASS)) {
        this.style.visibility = "hidden";
        typewriterObserver.observe(this);
        elementsBeingObserved.add(this);
      }
    });
  }
}
function getTooltipSize() {
  const vw = document.documentElement.clientWidth;
  const base = vw * 0.4;
  const max = vw * 0.9;
  const min = Math.min(vw * 0.8, 100);
  const width = Math.max(min, Math.min(base, max));
  return { tooltipWidth: width, tooltipHeight: width * (4 / 3) };
}
function initSnips($2) {
  $2(document).ready(function() {
    const $tooltip = $2('<div id="pdl-tooltip-preview"></div>');
    $2("body").append($tooltip);
    const fadeObserver = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
          obs.unobserve(entry.target);
        }
      }
    }, { threshold: 0.1 });
    $2.arrive(".pdl-wrap", { existing: true, onceOnly: false }, (pdlWrap) => {
      const $pdlWrap = $2(pdlWrap);
      const gap = 20;
      let currentSnip = null;
      $2(document).on("mousemove", function(e) {
        if (!currentSnip) return;
        const size = getTooltipSize();
        const vw = $2(window).width();
        let left = e.clientX - size.tooltipWidth * 0.9;
        let top = e.clientY - size.tooltipHeight / 2;
        left = Math.max(gap, Math.min(left, vw - size.tooltipWidth - gap));
        top = Math.max(gap, Math.min(top, $2(window).height() - size.tooltipHeight - gap));
        $tooltip.css({ left, top });
      });
      $pdlWrap.on("mouseenter", ".snip, .extra", function() {
        const $snip = $2(this);
        currentSnip = this;
        const bg = $snip.css("backgroundImage");
        const rect = this.getBoundingClientRect();
        const size = getTooltipSize();
        $tooltip.css({
          "background-image": bg,
          width: rect.width,
          height: rect.height,
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          opacity: 1,
          transform: "scale(1)",
          transition: "all .2s ease-out"
        });
        $snip.addClass("snip-hovered");
        $pdlWrap.addClass("pdl-wrap-hover");
        const vw = $2(window).width();
        let left = rect.left - size.tooltipWidth - gap;
        let top = rect.top + rect.height / 2 - size.tooltipHeight / 2;
        if (left < gap) {
          const rightOption = rect.right + gap;
          if (rightOption + size.tooltipWidth < vw - gap) left = rightOption;
          else left = (vw - size.tooltipWidth) / 2;
        }
        left = Math.max(gap, Math.min(left, vw - size.tooltipWidth - gap));
        top = Math.max(gap, Math.min(top, $2(window).height() - size.tooltipHeight - gap));
        setTimeout(() => {
          $tooltip.css({
            width: size.tooltipWidth,
            height: size.tooltipHeight,
            top: top + window.scrollY,
            left: left + window.scrollX
          });
        }, 10);
      });
      $pdlWrap.on("mouseleave", ".snip, .extra", function() {
        if (!currentSnip) return;
        const rect = currentSnip.getBoundingClientRect();
        $tooltip.css({
          width: rect.width,
          height: rect.height,
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          opacity: 0
        });
        $2(currentSnip).removeClass("snip-hovered");
        $pdlWrap.removeClass("pdl-wrap-hover");
        currentSnip = null;
      });
      $pdlWrap.arrive(".snip, .extra", { existing: true, onceOnly: false }, (el) => {
        fadeObserver.observe(el);
      }).leave(".snip, .extra", (el) => {
        fadeObserver.unobserve(el);
      });
    });
  });
}
function createFluidSpecRow(col1, col2) {
  const hasVal = !!col1;
  const hasDesc = !!col2;
  return `
            <div class="sr ${hasDesc ? "ds" : ""} ${hasVal ? "has-value" : ""}">
                ${hasVal ? `<div class="s1">${col1 || ""}</div>` : ""}
                ${hasDesc ? `<div class="s2">${col2 || ""}</div>` : ""}
            </div>`;
}
function initProductAttributeTables() {
  $(".details-product-attribute__value").each(function(i, el) {
    const item = $(el);
    if (item.find(".fs").length > 0) return;
    let rawHtml = item.html();
    if (rawHtml.trim().startsWith(":::")) {
      let html = "";
      let closeStack = [];
      let lines2 = rawHtml.replace(/<br\s*\/?>/gi, "\n").replace(/&lt;/g, "<").replace(/&gt;/g, ">").split("\n");
      lines2.forEach((line) => {
        line = line.trim();
        if (!line) return;
        if (line.startsWith(":::")) {
          const parts = line.substring(3).trim().split(/\s+/);
          const tag = parts[0];
          let classes = parts.slice(1).join(" ");
          if (classes.includes(".")) {
            classes = classes.replace(/\./g, " ").trim();
          }
          html += `<${tag}${classes ? ` class='${classes}'` : ""}>`;
          closeStack.push(`</${tag}>`);
        } else if (line.startsWith("- ")) {
          let content = line.substring(2).trim();
          content = content.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\*(.*?)\*/g, "<i>$1</i>").replace(/__(.*?)__/g, "<u>$1</u>");
          html += `<li>${content}</li>`;
        } else {
          html += line;
        }
      });
      while (closeStack.length) {
        html += closeStack.pop();
      }
      item.html(html);
      return;
    }
    console.log("Attribute raw:", rawHtml);
    let fluidHtml = '<div class="fs">';
    rawHtml = rawHtml.replace(/^\s*(_-){3,}\s*$/gm, "<hr>");
    rawHtml = rawHtml.replace(/\\n/g, "<br>").replace(/\s{2,}$/gm, "<br>");
    rawHtml = rawHtml.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\*(.*?)\*/g, "<i>$1</i>").replace(/__(.*?)__/g, "<u>$1</u>");
    let lines = rawHtml.split("\u2666");
    lines.forEach((line) => {
      if (!line || line.trim() === "") return;
      let cleanLine = line.replace(/^\<br\s*\/?\>/i, "").replace(/\<br\s*\/?\>$/i, "").trim();
      let content = cleanLine;
      if (/^\s*<b>.*<\/b>\s*$/.test(content)) {
        fluidHtml += `
                <div class="sr spec-header">
                    <div class="spec-full" style="visibility: hidden;">${content}</div>
                </div>`;
        return;
      }
      let wrapperTag = null;
      if (content.startsWith("<b>") && content.endsWith("</b>")) wrapperTag = "b";
      else if (content.startsWith("<i>") && content.endsWith("</i>")) wrapperTag = "i";
      let innerContent = content;
      if (wrapperTag) {
        innerContent = content.substring(3, content.length - 4);
      }
      if (innerContent.includes("|")) {
        let parts = innerContent.split("|");
        let val = parts[0].trim();
        let desc = parts.slice(1).join("|").trim();
        if (wrapperTag) {
          val = `<${wrapperTag}>${val}</${wrapperTag}>`;
          desc = `<${wrapperTag}>${desc}</${wrapperTag}>`;
        }
        fluidHtml += createFluidSpecRow(val, desc);
        return;
      }
      let match = innerContent.match(/^(\d+(?:\.\d+)?[A-Za-z%]+)\s+(.+)$/);
      if (match) {
        let val = match[1];
        let desc = match[2];
        if (wrapperTag) {
          val = `<${wrapperTag}>${val}</${wrapperTag}>`;
          desc = `<${wrapperTag}>${desc}</${wrapperTag}>`;
        }
        fluidHtml += createFluidSpecRow(val, desc);
        return;
      }
      fluidHtml += createFluidSpecRow("", content);
    });
    fluidHtml += "</div>";
    item.html(fluidHtml);
  });
}
export { initSnips, injectProductDetailsTabs, initProductAttributeTables };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmlsZTovLy9EOi93b3JrL0RBVEV4Mi5iaWtlL3d3My93ZWJzaXRlL3NyYy9qcy9wcm9kdWN0RGV0YWlscy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHRyYW5zbGF0ZSwgeyBzdmdJY29ucyB9IGZyb20gJy4vdHJhbnNsYXRpb25zLmpzJztcclxuaW1wb3J0IFR5cGV3cml0ZXIgZnJvbSAnQGRhdGV4Mi90eXBld3JpdGVyanMvZGlzdC9jb3JlJztcclxuaW1wb3J0IHsgJCwgc2V0U3R5bGUsIGlzRGV2LCBvblVubG9hZCB9IGZyb20gJy4vdXRpbHMuanMnO1xyXG5cclxuLy8gQ0ROIGJhc2UgVVJMIGZvciBwcm9kdWN0aW9uIGRlc2NyaXB0aW9uIGZpbGVzXHJcbmNvbnN0IENETl9CQVNFID0gJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC9EQVRFeDIvcHJvZHVjdHMnO1xyXG5cclxuLyoqXHJcbiAqIFJlc29sdmVzIHRoZSBmZXRjaCBVUkwgZm9yIGEgcHJvZHVjdCBkZXNjcmlwdGlvbi5cclxuICogQHBhcmFtIHtzdHJpbmd9IHNyYyAtIEZ1bGwgcmVsYXRpdmUgcGF0aCBmcm9tIGRhdGEtc3JjIChlLmcuIEJDeDMtMjIwVkFDL2Rlc2NyaXB0aW9uLmVuLmh0bSlcclxuICogQHBhcmFtIHtzdHJpbmd9IGNvbW1pdEhhc2ggLSBHaXQgY29tbWl0IGhhc2ggZm9yIENETiB2ZXJzaW9uaW5nXHJcbiAqIC0gRGV2OiAvZGIvZGlzdC88c3JjPlxyXG4gKiAtIFByb2Q6IGpzRGVsaXZyIENETiBAPGNvbW1pdEhhc2g+LzxzcmM+XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXREZXNjcmlwdGlvblVybChzcmMsIGNvbW1pdEhhc2gpIHtcclxuICAgIGlmIChpc0RldigpKSB7XHJcbiAgICAgICAgcmV0dXJuIGAvZGIvZGlzdC8ke3NyY31gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGAke0NETl9CQVNFfUAke2NvbW1pdEhhc2h9LyR7c3JjfWA7XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBHTE9CQUwgU1RBVEUgJiBDT05GSUdcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmxldCBhY3RpdmVUeXBld3JpdGVySW5zdGFuY2VzID0gW107XHJcbmNvbnN0IFRZUEVfU1BFRUQgPSAxO1xyXG5jb25zdCBIRUFERVJfVFlQRV9TUEVFRCA9IDM7XHJcbmNvbnN0IFRZUEVEX0NMQVNTID0gJ2RhdGEtdHlwZWQnO1xyXG5sZXQgZWxlbWVudHNUeXBpbmdDb250ZW50Q2xlYXJlZCA9IG5ldyBTZXQoKTtcclxuY29uc3QgaHJlZlN5bmNPYnNlcnZlcnMgPSBbXTtcclxubGV0IHR5cGV3cml0ZXJPYnNlcnZlciA9IG51bGw7XHJcbmxldCBlbGVtZW50c0JlaW5nT2JzZXJ2ZWQgPSBuZXcgU2V0KCk7XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXHJcbi8vIFVUSUxJVFkgRlVOQ1RJT05TXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLyoqXHJcbiAqIFJldmVyc2VzIEhUTUwgZW50aXR5IGVuY29kaW5nIHRvIHByZXNlcnZlIHRhZ3MgZHVyaW5nIHR5cGluZy5cclxuICovXHJcbmZ1bmN0aW9uIGRlY29kZVNwZWNpZmljRW50aXRpZXMoZW5jb2RlZFN0cmluZykge1xyXG4gICAgaWYgKCFlbmNvZGVkU3RyaW5nKSByZXR1cm4gJyc7XHJcbiAgICByZXR1cm4gZW5jb2RlZFN0cmluZ1xyXG4gICAgICAgIC5yZXBsYWNlKC8mYW1wOy9naSwgJyYnKVxyXG4gICAgICAgIC5yZXBsYWNlKC8mbHQ7L2dpLCAnPCcpXHJcbiAgICAgICAgLnJlcGxhY2UoLyZndDsvZ2ksICc+Jyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXN0b3JlcyBjb250ZW50IHRvIGVsZW1lbnRzIHRoYXQgd2VyZSBpbnRlcnJ1cHRlZCBtaWQtdHlwZSAoZS5nLiwgcmVzaXplKS5cclxuICovXHJcbmZ1bmN0aW9uIHJlc3RvcmVBbGxUeXBlZEVsZW1lbnRzQ29udGVudCgpIHtcclxuICAgIGVsZW1lbnRzVHlwaW5nQ29udGVudENsZWFyZWQuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgaWYgKCFlbC5oYXNBdHRyaWJ1dGUoVFlQRURfQ0xBU1MpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVGV4dCA9IGVsLmRhdGFzZXQub3JpZ2luYWxUZXh0O1xyXG4gICAgICAgICAgICBpZiAob3JpZ2luYWxUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBkZWNvZGVTcGVjaWZpY0VudGl0aWVzKG9yaWdpbmFsVGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0U3R5bGUoZWwsICdoZWlnaHQsIG1pbi1oZWlnaHQsIHBvc2l0aW9uLCBvdmVyZmxvdycsICcnKTtcclxuICAgICAgICAgICAgc2V0U3R5bGUoZWwsICd2aXNpYmlsaXR5JywgJ3Zpc2libGUnLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGVsZW1lbnRzVHlwaW5nQ29udGVudENsZWFyZWQuY2xlYXIoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFN0b3BzIGFsbCBhY3RpdmUgdHlwZXdyaXRlciBpbnN0YW5jZXMgYW5kIHJlc3RvcmVzIGNvbnRlbnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBkZXN0cm95QWN0aXZlVHlwZXdyaXRlcnMoKSB7XHJcbiAgICBhY3RpdmVUeXBld3JpdGVySW5zdGFuY2VzLmZvckVhY2godyA9PiB7XHJcbiAgICAgICAgdHJ5IHsgdy5zdG9wKCk7IH0gY2F0Y2ggKGUpIHsgfVxyXG4gICAgfSk7XHJcbiAgICBhY3RpdmVUeXBld3JpdGVySW5zdGFuY2VzID0gW107XHJcbiAgICByZXN0b3JlQWxsVHlwZWRFbGVtZW50c0NvbnRlbnQoKTtcclxufVxyXG5cclxuLy8gV2luZG93IFJlc2l6ZSBIYW5kbGVyIHRvIHByZXZlbnQgbGF5b3V0IHNoaWZ0IGVycm9yc1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVzdHJveUFjdGl2ZVR5cGV3cml0ZXJzKTtcclxuXHJcbi8qKlxyXG4gKiBDbGVhbnMgdXAgTXV0YXRpb25PYnNlcnZlcnMgb24gcGFnZSBuYXZpZ2F0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gZGlzY29ubmVjdEFsbEhyZWZTeW5jT2JzZXJ2ZXJzKCkge1xyXG4gICAgaHJlZlN5bmNPYnNlcnZlcnMuZm9yRWFjaChvYnNlcnZlciA9PiBvYnNlcnZlci5kaXNjb25uZWN0KCkpO1xyXG4gICAgaHJlZlN5bmNPYnNlcnZlcnMubGVuZ3RoID0gMDtcclxufVxyXG5vblVubG9hZCgoKSA9PiBkaXNjb25uZWN0QWxsSHJlZlN5bmNPYnNlcnZlcnMoKSwgdHJ1ZSk7XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gU09DSUFMIFNZTkMgTE9HSUNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5mdW5jdGlvbiB1cGRhdGVDbG9uZWRIcmVmKG9yaWdpbmFsTGluaywgY2xvbmVkRWxlbWVudCkge1xyXG4gICAgY29uc3QgbmV3SHJlZiA9IG9yaWdpbmFsTGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuICAgIGNvbnN0IHNvY2lhbENsYXNzID0gQXJyYXkuZnJvbShvcmlnaW5hbExpbmsuY2xhc3NMaXN0KS5maW5kKGNscyA9PiBjbHMuc3RhcnRzV2l0aCgnZWMtbGlrZWx5X193aWRnZXQtLScpKTtcclxuXHJcbiAgICBpZiAoc29jaWFsQ2xhc3MpIHtcclxuICAgICAgICBjb25zdCAkY2xvbmVkTGluayA9ICQoY2xvbmVkRWxlbWVudCkuZmluZChgLiR7c29jaWFsQ2xhc3N9YCk7XHJcbiAgICAgICAgaWYgKCRjbG9uZWRMaW5rLmxlbmd0aCAmJiAkY2xvbmVkTGluay5hdHRyKCdocmVmJykgIT09IG5ld0hyZWYpIHtcclxuICAgICAgICAgICAgJGNsb25lZExpbmsuYXR0cignaHJlZicsIG5ld0hyZWYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3luY0hyZWZBdHRyaWJ1dGUob3JpZ2luYWxFbGVtZW50LCBjbG9uZWRFbGVtZW50KSB7XHJcbiAgICBpZiAoIW9yaWdpbmFsRWxlbWVudCB8fCAhY2xvbmVkRWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgICQob3JpZ2luYWxFbGVtZW50KS5maW5kKCdhJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdXBkYXRlQ2xvbmVkSHJlZih0aGlzLCBjbG9uZWRFbGVtZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSAnYXR0cmlidXRlcycgJiYgbXV0YXRpb24uYXR0cmlidXRlTmFtZSA9PT0gJ2hyZWYnKSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVDbG9uZWRIcmVmKG11dGF0aW9uLnRhcmdldCwgY2xvbmVkRWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKG9yaWdpbmFsRWxlbWVudCwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFsnaHJlZiddLCBzdWJ0cmVlOiB0cnVlIH0pO1xyXG4gICAgaHJlZlN5bmNPYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBQUk9EVUNUIFRBQiBTWVNURU1cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyAtLS0gU3RlcCA2OiBDU1MvSlMgVmVyc2lvbiBDaGVja2luZyAtLS1cclxuLy8gQ2hlY2tzIC9hcGkvdmVyc2lvbnMgYWdhaW5zdCBkYXRhLWNzcy12L2RhdGEtanMtdiBvbiA8aHRtbD4uXHJcbi8vIENTUyBtaXNtYXRjaCBcdTIxOTIgaG90LXN3YXAgc3R5bGVzaGVldC4gSlMgbWlzbWF0Y2ggXHUyMTkyIHBvcHVwIHRvIHJlbG9hZC5cclxubGV0IHZlcnNpb25DaGVja0RvbmUgPSBmYWxzZTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNoZWNrQXNzZXRWZXJzaW9ucygpIHtcclxuICAgIGlmICh2ZXJzaW9uQ2hlY2tEb25lKSByZXR1cm47XHJcbiAgICB2ZXJzaW9uQ2hlY2tEb25lID0gdHJ1ZTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaCgnL2FwaS92ZXJzaW9ucycpO1xyXG4gICAgICAgIGlmICghcmVzcC5vaykgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGxhdGVzdCA9IGF3YWl0IHJlc3AuanNvbigpO1xyXG5cclxuICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRDc3MgPSByb290LmdldEF0dHJpYnV0ZSgnZGF0YS1jc3MtdicpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRKcyA9IHJvb3QuZ2V0QXR0cmlidXRlKCdkYXRhLWpzLXYnKTtcclxuXHJcbiAgICAgICAgLy8gQ1NTIGhvdC1zd2FwOiByZXBsYWNlIDxsaW5rIGlkPVwiZHhDU1NcIj4gd2l0aCB1cGRhdGVkIHZlcnNpb25cclxuICAgICAgICBpZiAoY3VycmVudENzcyAmJiBsYXRlc3QuY3NzICYmIGN1cnJlbnRDc3MgIT09IGxhdGVzdC5jc3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFtWZXJzaW9uc10gQ1NTIHVwZGF0ZTogJHtjdXJyZW50Q3NzfSBcdTIxOTIgJHtsYXRlc3QuY3NzfWApO1xyXG4gICAgICAgICAgICBjb25zdCBvbGRMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R4Q1NTJyk7XHJcbiAgICAgICAgICAgIGlmIChvbGRMaW5rKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gICAgICAgICAgICAgICAgbmV3TGluay5pZCA9ICdkeENTUyc7XHJcbiAgICAgICAgICAgICAgICBuZXdMaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcclxuICAgICAgICAgICAgICAgIG5ld0xpbmsudGl0bGUgPSAnZHgnO1xyXG4gICAgICAgICAgICAgICAgbmV3TGluay5tZWRpYSA9ICdhbGwnO1xyXG4gICAgICAgICAgICAgICAgLy8gSW4gZGV2LCBzZXJ2ZSBmcm9tIGxvY2FsLiBJbiBwcm9kLCBDRE4gd291bGQgaGFuZGxlIHZpYSBjb21taXQgaGFzaC5cclxuICAgICAgICAgICAgICAgIG5ld0xpbmsuaHJlZiA9IGlzRGV2KClcclxuICAgICAgICAgICAgICAgICAgICA/IGAvZGIvZGlzdC9jc3MvREFURXgyLmJpa2UuY3NzP3Y9JHtsYXRlc3QuY3NzfWBcclxuICAgICAgICAgICAgICAgICAgICA6IG9sZExpbmsuaHJlZi5yZXBsYWNlKC9cXD8uKiQvLCAnJykgKyBgP3Y9JHtsYXRlc3QuY3NzfWA7XHJcbiAgICAgICAgICAgICAgICBuZXdMaW5rLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBvbGRMaW5rLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvb3Quc2V0QXR0cmlidXRlKCdkYXRhLWNzcy12JywgbGF0ZXN0LmNzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tWZXJzaW9uc10gQ1NTIGhvdC1zd2FwcGVkIHN1Y2Nlc3NmdWxseScpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG9sZExpbmsucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3TGluaywgb2xkTGluay5uZXh0U2libGluZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEpTIHZlcnNpb24gbWlzbWF0Y2g6IHNob3cgcmVsb2FkIHBvcHVwXHJcbiAgICAgICAgaWYgKGN1cnJlbnRKcyAmJiBsYXRlc3QuanMgJiYgY3VycmVudEpzICE9PSBsYXRlc3QuanMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFtWZXJzaW9uc10gSlMgdXBkYXRlIGF2YWlsYWJsZTogJHtjdXJyZW50SnN9IFx1MjE5MiAke2xhdGVzdC5qc31gKTtcclxuICAgICAgICAgICAgc2hvd0pzVXBkYXRlUG9wdXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdbVmVyc2lvbnNdIENoZWNrIGZhaWxlZDonLCBlKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFNob3dzIGEgc3R5bGVkIHBvcHVwIGFza2luZyB1c2VyIHRvIHJlbG9hZCBmb3IgSlMgdXBkYXRlcy5cclxuICogT0sgXHUyMTkyIHByZXNlcnZlcyBzZWxlY3RlZCBvcHRpb25zIGluIFVSTCBhbmQgcmVsb2Fkcy5cclxuICogQ2FuY2VsIFx1MjE5MiBkaXNtaXNzZXMgKHVzZXIgc3RheXMgb24gY3VycmVudCBKUykuXHJcbiAqL1xyXG5mdW5jdGlvbiBzaG93SnNVcGRhdGVQb3B1cCgpIHtcclxuICAgIC8vIERvbid0IHNob3cgdHdpY2VcclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHgtdXBkYXRlLXBvcHVwJykpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBvdmVybGF5LmlkID0gJ2R4LXVwZGF0ZS1wb3B1cCc7XHJcbiAgICBvdmVybGF5LmlubmVySFRNTCA9IGBcclxuICAgICAgICA8ZGl2IHN0eWxlPVwicG9zaXRpb246Zml4ZWQ7aW5zZXQ6MDt6LWluZGV4Ojk5OTk5OTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC42KTtiYWNrZHJvcC1maWx0ZXI6Ymx1cig0cHgpXCI+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiMxYTFhMmU7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LC4xKTtib3JkZXItcmFkaXVzOjE2cHg7cGFkZGluZzozMnB4O21heC13aWR0aDo0MDBweDt0ZXh0LWFsaWduOmNlbnRlcjtib3gtc2hhZG93OjAgMjVweCA1MHB4IHJnYmEoMCwwLDAsLjUpXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOjMycHg7bWFyZ2luLWJvdHRvbToxMnB4XCI+XHVEODNEXHVERDA0PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aDMgc3R5bGU9XCJjb2xvcjojZmZmO2ZvbnQtZmFtaWx5OkludGVyLHN5c3RlbS11aSxzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxOHB4O21hcmdpbjowIDAgOHB4XCI+TmV3IFZlcnNpb24gQXZhaWxhYmxlPC9oMz5cclxuICAgICAgICAgICAgICAgIDxwIHN0eWxlPVwiY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNik7Zm9udC1zaXplOjE0cHg7bWFyZ2luOjAgMCAyNHB4O2xpbmUtaGVpZ2h0OjEuNVwiPkEgbmV3IHZlcnNpb24gb2YgdGhlIGFwcCBpcyBhdmFpbGFibGUuIFJlbG9hZCB0byBnZXQgdGhlIGxhdGVzdCBmZWF0dXJlcz88L3A+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTpmbGV4O2dhcDoxMnB4O2p1c3RpZnktY29udGVudDpjZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiZHgtdXBkYXRlLWNhbmNlbFwiIHN0eWxlPVwicGFkZGluZzoxMHB4IDI0cHg7Ym9yZGVyLXJhZGl1czoxMHB4O2JvcmRlcjoxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwuMTUpO2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7Y29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNyk7Y3Vyc29yOnBvaW50ZXI7Zm9udC1zaXplOjE0cHg7Zm9udC1mYW1pbHk6SW50ZXIsc3lzdGVtLXVpLHNhbnMtc2VyaWY7dHJhbnNpdGlvbjphbGwgLjJzXCI+Tm90IE5vdzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJkeC11cGRhdGUtb2tcIiBzdHlsZT1cInBhZGRpbmc6MTBweCAyNHB4O2JvcmRlci1yYWRpdXM6MTBweDtib3JkZXI6bm9uZTtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxMzVkZWcsIzIyYzU1ZSwjMTZhMzRhKTtjb2xvcjojZmZmO2N1cnNvcjpwb2ludGVyO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjYwMDtmb250LWZhbWlseTpJbnRlcixzeXN0ZW0tdWksc2Fucy1zZXJpZjt0cmFuc2l0aW9uOmFsbCAuMnNcIj5SZWxvYWQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5gO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHgtdXBkYXRlLW9rJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBvcHRpb25zUGFyYW0gPSBzZXJpYWxpemVTZWxlY3RlZE9wdGlvbnMoKTtcclxuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgIGlmIChvcHRpb25zUGFyYW0pIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdvcHRpb25zJywgb3B0aW9uc1BhcmFtKTtcclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gdXJsLnRvU3RyaW5nKCk7XHJcbiAgICB9O1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R4LXVwZGF0ZS1jYW5jZWwnKS5vbmNsaWNrID0gKCkgPT4gb3ZlcmxheS5yZW1vdmUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNlcmlhbGl6ZXMgY3VycmVudGx5IHNlbGVjdGVkIHByb2R1Y3Qgb3B0aW9ucyBhcyBjb21tYS1zZXBhcmF0ZWQgaW5kaWNlcy5cclxuICogRWFjaCAuZm9ybS1jb250cm9sIGdyb3VwIFx1MjE5MiBpbmRleCBvZiB0aGUgOmNoZWNrZWQgaW5wdXQgKDAtYmFzZWQpLlxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBlLmcuIFwiMSwyLDAsNFwiXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXJpYWxpemVTZWxlY3RlZE9wdGlvbnMoKSB7XHJcbiAgICBjb25zdCBncm91cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybS1jb250cm9sJyk7XHJcbiAgICBpZiAoIWdyb3Vwcy5sZW5ndGgpIHJldHVybiAnJztcclxuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgIGdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+IHtcclxuICAgICAgICBjb25zdCBpbnB1dHMgPSBncm91cC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xyXG4gICAgICAgIGNvbnN0IGNoZWNrZWQgPSBncm91cC5xdWVyeVNlbGVjdG9yKCdpbnB1dDpjaGVja2VkJyk7XHJcbiAgICAgICAgaWYgKGNoZWNrZWQgJiYgaW5wdXRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpbmRpY2VzLnB1c2goQXJyYXkuZnJvbShpbnB1dHMpLmluZGV4T2YoY2hlY2tlZCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGluZGljZXMucHVzaCgwKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbmRpY2VzLmpvaW4oJywnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlc3RvcmVzIHByb2R1Y3Qgb3B0aW9uIHNlbGVjdGlvbnMgZnJvbSA/b3B0aW9ucz0xLDIsMCw0IFVSTCBwYXJhbS5cclxuICogRWFjaCBpbmRleCBtYXBzIHRvIHRoZSBOdGggaW5wdXQgaW4gdGhlIGNvcnJlc3BvbmRpbmcgLmZvcm0tY29udHJvbCBncm91cC5cclxuICogUnVucyBvbmNlIG9uIHBhZ2UgbG9hZCwgdGhlbiByZW1vdmVzIHRoZSBwYXJhbSBmcm9tIFVSTC5cclxuICovXHJcbmZ1bmN0aW9uIHJlc3RvcmVTZWxlY3RlZE9wdGlvbnMoKSB7XHJcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xyXG4gICAgY29uc3Qgb3B0aW9uc1BhcmFtID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ29wdGlvbnMnKTtcclxuICAgIGlmICghb3B0aW9uc1BhcmFtKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaW5kaWNlcyA9IG9wdGlvbnNQYXJhbS5zcGxpdCgnLCcpLm1hcChOdW1iZXIpO1xyXG5cclxuICAgIC8vIFdhaXQgZm9yIEVjd2lkIHRvIHJlbmRlciB0aGUgb3B0aW9ucyAodGhleSBsb2FkIGFzeW5jKVxyXG4gICAgY29uc3QgdHJ5UmVzdG9yZSA9IChhdHRlbXB0cyA9IDApID0+IHtcclxuICAgICAgICBjb25zdCBncm91cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybS1jb250cm9sJyk7XHJcbiAgICAgICAgaWYgKCFncm91cHMubGVuZ3RoICYmIGF0dGVtcHRzIDwgMjApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0cnlSZXN0b3JlKGF0dGVtcHRzICsgMSksIDMwMCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCwgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaSA8IGluZGljZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dHMgPSBncm91cC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gaW5wdXRzW2luZGljZXNbaV1dO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCAmJiAhdGFyZ2V0LmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuY2xpY2soKTsgLy8gVHJpZ2dlciBFY3dpZCdzIGNoYW5nZSBoYW5kbGVyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ2xlYW4gVVJMXHJcbiAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoJ29wdGlvbnMnKTtcclxuICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCAnJywgdXJsLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBbT3B0aW9uc10gUmVzdG9yZWQgc2VsZWN0aW9uczogJHtvcHRpb25zUGFyYW19YCk7XHJcbiAgICB9O1xyXG4gICAgdHJ5UmVzdG9yZSgpO1xyXG59XHJcblxyXG4vLyBBdXRvLXJlc3RvcmUgb3B0aW9ucyBvbiBwYWdlIGxvYWRcclxucmVzdG9yZVNlbGVjdGVkT3B0aW9ucygpO1xyXG5cclxuZnVuY3Rpb24gaW5qZWN0UHJvZHVjdERldGFpbHNUYWJzKHRhcmdldCkge1xyXG4gICAgY29uc3QgJHBhcmVudCA9ICQodGFyZ2V0KTtcclxuXHJcbiAgICAkcGFyZW50LmFycml2ZSgnLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1kZXNjcmlwdGlvbicsIHsgZXhpc3Rpbmc6IHRydWUsIG9uY2VPbmx5OiBmYWxzZSB9LCBhc3luYyAoZWxlbSkgPT4ge1xyXG4gICAgICAgIC8vIC0tLSBEeW5hbWljIFByb2R1Y3QgRGVzY3JpcHRpb24gTG9hZGluZyAtLS1cclxuICAgICAgICAvLyBFY3dpZCByZW5kZXJzIGEgcGxhY2Vob2xkZXI6IDxkaXYgaWQ9cGQgZGF0YS1pZD0uLi4gZGF0YS1zcmM9J3NsdWcvZGVzY3JpcHRpb24ubGFuZy5odG0nIGRhdGEtZGV2PS4uLiBkYXRhLXZlcnNpb249Li4uIC8+XHJcbiAgICAgICAgLy8gV2UgZGV0ZWN0IGl0LCBmZXRjaCB0aGUgcmVhbCBIVE1MLCBhbmQgaW5qZWN0IGl0IGludG8gdGhlIERPTS5cclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IGVsZW0ucXVlcnlTZWxlY3RvcignI3BkJykgfHwgKGVsZW0uaWQgPT09ICdwZCcgPyBlbGVtIDogbnVsbCk7XHJcbiAgICAgICAgaWYgKCFwbGFjZWhvbGRlcikgcmV0dXJuOyAvLyBObyBwbGFjZWhvbGRlciA9IGxlZ2FjeSBmdWxsLUhUTUwgZGVzY3JpcHRpb24sIG5vdGhpbmcgdG8gZG9cclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBzcmMgPSBwbGFjZWhvbGRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XHJcbiAgICAgICAgY29uc3QgY29tbWl0SGFzaCA9IHBsYWNlaG9sZGVyLmdldEF0dHJpYnV0ZSgnZGF0YS12ZXJzaW9uJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFzcmMpIHJldHVybjsgLy8gSW52YWxpZCBwbGFjZWhvbGRlclxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNob3cgc2tlbGV0b24gbG9hZGVyIHdoaWxlIGZldGNoaW5nXHJcbiAgICAgICAgcGxhY2Vob2xkZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJwZC1za2VsZXRvblwiIHN0eWxlPVwibWluLWhlaWdodDo0MDBweDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCg5MGRlZyxyZ2JhKDI1NSwyNTUsMjU1LC4wMykgMjUlLHJnYmEoMjU1LDI1NSwyNTUsLjA2KSA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMDMpIDc1JSk7YmFja2dyb3VuZC1zaXplOjIwMCUgMTAwJTthbmltYXRpb246cGQtc2hpbW1lciAxLjVzIGluZmluaXRlO2JvcmRlci1yYWRpdXM6MTJweFwiPjwvZGl2Pic7XHJcbiAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGQtc2tlbGV0b24tc3R5bGUnKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIHN0eWxlLmlkID0gJ3BkLXNrZWxldG9uLXN0eWxlJztcclxuICAgICAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSAnQGtleWZyYW1lcyBwZC1zaGltbWVyezAle2JhY2tncm91bmQtcG9zaXRpb246MjAwJSAwfTEwMCV7YmFja2dyb3VuZC1wb3NpdGlvbjotMjAwJSAwfX0nO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgdXJsID0gZ2V0RGVzY3JpcHRpb25Vcmwoc3JjLCBjb21taXRIYXNoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTdGVwIDY6IENoZWNrIENTUy9KUyB2ZXJzaW9ucyBpbiBwYXJhbGxlbCB3aXRoIGRlc2NyaXB0aW9uIGZldGNoXHJcbiAgICAgICAgY2hlY2tBc3NldFZlcnNpb25zKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHVybCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIXJlc3Aub2spIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW1BEXSBGYWlsZWQgdG8gbG9hZCBkZXNjcmlwdGlvbiAke3NyY306ICR7cmVzcC5zdGF0dXN9YCk7XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgaHRtbCA9IGF3YWl0IHJlc3AudGV4dCgpO1xyXG4gICAgICAgICAgICBwbGFjZWhvbGRlci5vdXRlckhUTUwgPSBodG1sO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgW1BEXSBJbmplY3RlZCAke3NyY30gKCR7aHRtbC5sZW5ndGh9IGNoYXJzKWApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW1BEXSBGZXRjaCBlcnJvciBmb3IgJHtzcmN9OmAsIGVycik7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgLy8gVGFiIGRlZmluaXRpb25zOiBEaXNjb3VudHMgKHdob2xlc2FsZSkgaXMgbm93IG1lcmdlZCBpbnRvIHRoZSBSZXZpZXdzIHRhYlxyXG4gICAgY29uc3QgdGFicyA9IHtcclxuICAgICAgICBmZWF0dXJlczogJ0ZlYXR1cmVzJyxcclxuICAgICAgICBvcHRpb25zOiAnT3B0aW9ucycsXHJcbiAgICAgICAgc3BlY3M6ICdTcGVjcycsXHJcbiAgICAgICAgcmV2aWV3czogJ1Jldmlld3MnXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0ICRuYXYgPSAkcGFyZW50LmZpbmRPckNyZWF0ZShcIi5qcy10YWJzLW5hdlwiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgJGNvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9anMtdGFicy1uYXY+PC9kaXY+Jyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBbaWQsIG5hbWVdIG9mIE9iamVjdC5lbnRyaWVzKHRhYnMpKSB7XHJcbiAgICAgICAgICAgICRjb250YWluZXIuYXBwZW5kKGA8YnV0dG9uIGNsYXNzPVwianMtdGFiLWJ0blwiIGRhdGEtdGFiPVwiJHtpZH1cIj4ke3RyYW5zbGF0ZShuYW1lKX08L2J1dHRvbj5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoXCI8ZGl2IGNsYXNzPXNoYXJlLXRhYnM+PC9kaXY+XCIpO1xyXG4gICAgICAgIHJldHVybiAkY29udGFpbmVyO1xyXG4gICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgLy8gU29jaWFsIFNoYXJpbmcgQ2xvbmUgTG9naWMgaW5zaWRlIHRoZSBUYWIgTmF2XHJcbiAgICAkcGFyZW50LnBhcmVudCgpLmFycml2ZShcIi5wcm9kdWN0LWRldGFpbHNfX3NpZGViYXIgLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1zaGFyZVwiLCB7IGV4aXN0aW5nOiB0cnVlLCBvbmNlT25seTogdHJ1ZSB9LCBlbGVtID0+IHtcclxuICAgICAgICBjb25zdCAkc2hhcmVUYWJzID0gJG5hdi5maW5kKFwiLnNoYXJlLXRhYnNcIik7XHJcbiAgICAgICAgaWYgKCRzaGFyZVRhYnMuY2hpbGRyZW4oKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgY29uc3QgJGNsb25lZCA9ICQoZWxlbSkuY2xvbmUoKTtcclxuICAgICAgICAgICAgJHNoYXJlVGFicy5hcHBlbmQoJGNsb25lZCk7XHJcblxyXG4gICAgICAgICAgICAkc2hhcmVUYWJzLmZpbmQoXCIuZWMtbGlrZWx5X193cmFwcGVyXCIpLmZpbmRPckNyZWF0ZSgnLmVjLWxpa2VseV9fd2lkZ2V0LS13aGF0c2FwcCcsICgpID0+XHJcbiAgICAgICAgICAgICAgICBgPGEgaHJlZj1cImh0dHBzOi8vYXBpLndoYXRzYXBwLmNvbS9zZW5kLz90ZXh0PUNoZWNrJTIwb3V0JTIwdGhpcyUyMGl0ZW0lMjAke2VuY29kZVVSSShsb2NhdGlvbi5ocmVmKX1cIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImVjLWxpa2VseV9fd2lkZ2V0IGVjLWxpa2VseV9fd2lkZ2V0LS13aGF0c2FwcFwiPjxzcGFuIGNsYXNzPVwiZWMtbGlrZWx5X19pY29uIGVjLWxpa2VseV9faWNvbi0td2hhdHNhcHBcIj4ke3N2Z0ljb25zLndoYXRzYXBwKCl9PC9zcGFuPjxzcGFuIGNsYXNzPVwiZWMtbGlrZWx5X19idXR0b25cIj5TaGFyZTwvc3Bhbj48L2E+YFxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgc3luY0hyZWZBdHRyaWJ1dGUoZWxlbSwgJGNsb25lZFswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoZWxlbSkuaGlkZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgc2Nyb2xsSGlzdG9yeSA9IHt9O1xyXG4gICAgbGV0IGN1cnJlbnRBY3RpdmVUYWIgPSAnJztcclxuXHJcbiAgICBmdW5jdGlvbiBzZXRUYWIodGFiTmFtZSwgdXBkYXRlSGlzdG9yeSA9IGZhbHNlKSB7XHJcbiAgICAgICAgJHBhcmVudC5hdHRyKCdkYXRhLWFjdGl2ZS10YWInLCB0YWJOYW1lKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIG9sZCB2aWV3IGNsYXNzZXMuIFxyXG4gICAgICAgIC8vIE5vdGU6IC52aWV3LXJldmlld3Mgc2hvdWxkIGJlIHN0eWxlZCB0byBzaG93IGJvdGggcmV2aWV3cyBhbmQgd2hvbGVzYWxlIG1vZHVsZXMuXHJcbiAgICAgICAgJGQuYWx0ZXJDbGFzcygndmlldy10YWItKicsIGB2aWV3LXRhYi0ke3RhYk5hbWV9YCk7XHJcblxyXG4gICAgICAgIGlmICh1cGRhdGVIaXN0b3J5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0hhc2ggPSB0YWJOYW1lID09PSAnb3B0aW9ucycgPyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoIDogJyMnICsgdGFiTmFtZTtcclxuICAgICAgICAgICAgaWYgKGxvY2F0aW9uLmhhc2ggIT09IG5ld0hhc2gpIHtcclxuICAgICAgICAgICAgICAgIC8vIEVDV0lEIFdvcmthcm91bmQ6IEJ5cGFzcyBtb25rZXktcGF0Y2hlZCBwdXNoU3RhdGUgdG8gYXZvaWQgdHJpZ2dlcmluZyB0aGVpciByb3V0ZXJcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsUHVzaFN0YXRlID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuaGlzdG9yeS5wdXNoU3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxQdXNoU3RhdGUuY2FsbCh3aW5kb3cuaGlzdG9yeSwgbnVsbCwgbnVsbCwgbmV3SGFzaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChpZnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZhbGxiYWNrIGlmIGlmcmFtZSB0cmljayBmYWlscyAoZS5nLiBzdHJpY3QgQ1NQKVxyXG4gICAgICAgICAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIG5ld0hhc2gpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3VycmVudEFjdGl2ZVRhYiA9PT0gdGFiTmFtZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgYm9keSBjbGFzcyBmb3Igc3R5bGluZyBob29rc1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygoaSwgY2xhc3NOYW1lKSA9PiAoY2xhc3NOYW1lLm1hdGNoKC8oXnxcXHMpYWN0aXZlLXRhYi1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJykpO1xyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcyhcImFjdGl2ZS10YWItXCIgKyB0YWJOYW1lKTtcclxuXHJcbiAgICAgICAgc2Nyb2xsSGlzdG9yeVtjdXJyZW50QWN0aXZlVGFiXSA9ICQoJ2JvZHknKS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgJCgnLmpzLXRhYi1idG4nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJChgLmpzLXRhYi1idG5bZGF0YS10YWI9XCIke3RhYk5hbWV9XCJdYCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHJcbiAgICAgICAgY3VycmVudEFjdGl2ZVRhYiA9IHRhYk5hbWU7XHJcblxyXG4gICAgICAgIGNvbnN0IHNjcm9sbCA9IHNjcm9sbEhpc3RvcnlbdGFiTmFtZV0gPz8gMDtcclxuICAgICAgICAkKCdib2R5Jykuc3RvcCgpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHNjcm9sbCB9LCAyNTApO1xyXG5cclxuICAgICAgICBkZXN0cm95QWN0aXZlVHlwZXdyaXRlcnMoKTtcclxuICAgICAgICBkZXRlcm1pbmVQcm9kdWN0RGV0YWlsc0xhcmdlT3B0aW9ucygpXHJcbiAgICAgICAgc2V0VGltZW91dChhbmltYXRlQWN0aXZlU2VjdGlvbiwgMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUYWIgQ2xpY2sgQmluZGluZ1xyXG4gICAgJCgnLmpzLXRhYi1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2V0VGFiKCQodGhpcykuZGF0YSgndGFiJyksIHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBST1VURVIgRklMVEVSIFJFR0lTVFJBVElPTlxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvLyBXZSB1dGlsaXplIHRoZSBjdXN0b20gUm91dGVyIEZpcmV3YWxsIGluamVjdGVkIGluIGluZGV4LmpzXHJcbiAgICAvLyBXZSByZWdpc3RlciBhIGZpbHRlciB0aGF0IHJldHVybnMgVFJVRSBpZiB3ZSB3YW50IHRvIGJsb2NrIHRoZSBldmVudCAoYmVjYXVzZSB3ZSBoYW5kbGVkIGl0KVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiByb3V0ZXJGaWx0ZXIoZSkge1xyXG4gICAgICAgIGNvbnN0IGhhc2ggPSBsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyk7XHJcbiAgICAgICAgY29uc3QgZWZmZWN0aXZlVGFiID0gaGFzaCA9PT0gJycgPyAnb3B0aW9ucycgOiBoYXNoO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0YWJzW2VmZmVjdGl2ZVRhYl0pIHtcclxuICAgICAgICAgICAgLy8gSXQgaXMgb25lIG9mIG91ciB0YWJzLiBIYW5kbGUgdGhlIFVJIHVwZGF0ZS5cclxuICAgICAgICAgICAgc2V0VGFiKGVmZmVjdGl2ZVRhYiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmV0dXJuIFRSVUUgdG8gdGVsbCB0aGUgZmlyZXdhbGwgdG8gYmxvY2sgcHJvcGFnYXRpb24gdG8gRWN3aWRcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZWdpc3RlciB3aXRoIHRoZSBzZWNyZXQgNHRoIGFyZ3VtZW50IHRvIGJ5cGFzcyBxdWV1ZSBhbmQgZW50ZXIgZmlsdGVyIGxpc3RcclxuICAgIGlmICghd2luZG93Ll9fZGF0ZXgyUm91dGVyRmlsdGVyQXR0YWNoZWQpIHtcclxuICAgICAgICB3aW5kb3cuX19kYXRleDJSb3V0ZXJGaWx0ZXJBdHRhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgcm91dGVyRmlsdGVyLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHJvdXRlckZpbHRlciwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2xlYW51cCBpbnRlbnRpb25hbGx5IG9taXR0ZWQgdG8ga2VlcCB0aGUgZmlsdGVyIGFjdGl2ZSBwZXJtYW5lbnRseVxyXG5cclxuICAgIC8vIERlZmF1bHQgaW5pdGlhbGl6YXRpb25cclxuICAgIGluaXRQcm9kdWN0QXR0cmlidXRlVGFibGVzKCk7XHJcbiAgICBcclxuICAgIC8vIENoZWNrIGluaXRpYWwgaGFzaFxyXG4gICAgY29uc3QgaW5pdGlhbEhhc2ggPSBsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyk7XHJcbiAgICBjb25zdCBzdGFydFRhYiA9IHRhYnNbaW5pdGlhbEhhc2hdID8gaW5pdGlhbEhhc2ggOiAnb3B0aW9ucyc7XHJcbiAgICBzZXRUYWIoc3RhcnRUYWIsIGZhbHNlKTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIFRZUEVXUklURVIgQU5JTUFUSU9OIEZVTkNUSU9OU1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgZnVuY3Rpb24gYW5pbWF0ZUhlYWRlclNlcXVlbmNlKGgxRWwpIHtcclxuICAgICAgICBjb25zdCAkY29udGFpbmVyID0gJChoMUVsKS5jbG9zZXN0KCcucHJvZHVjdC1kZXRhaWxzJyk7XHJcbiAgICAgICAgY29uc3QgaDFDb250ZW50RWwgPSBoMUVsO1xyXG4gICAgICAgIGNvbnN0IHN1YkNvbnRlbnRFbCA9ICRjb250YWluZXIuZmluZCgnLnByb2R1Y3QtZGV0YWlsc19fc3VidGl0bGUgLnByb2R1Y3QtZGV0YWlscy1tb2R1bGVfX2NvbnRlbnQnKVswXTtcclxuICAgICAgICBjb25zdCBub3RlQ29udGVudEVsID0gJGNvbnRhaW5lci5maW5kKCcucHJvZHVjdC1kZXRhaWxzX19zdWJ0aXRsZS1ub3RlJylbMF07XHJcblxyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzVG9BbmltYXRlID0gW1xyXG4gICAgICAgICAgICB7IGVsOiBoMUNvbnRlbnRFbCwgc3BlZWQ6IEhFQURFUl9UWVBFX1NQRUVEIH0sXHJcbiAgICAgICAgICAgIHsgZWw6IHN1YkNvbnRlbnRFbCwgc3BlZWQ6IFRZUEVfU1BFRUQgfSxcclxuICAgICAgICAgICAgeyBlbDogbm90ZUNvbnRlbnRFbCwgc3BlZWQ6IFRZUEVfU1BFRUQgfVxyXG4gICAgICAgIF0uZmlsdGVyKGl0ZW0gPT4gaXRlbS5lbCAmJiAhaXRlbS5lbC5oYXNBdHRyaWJ1dGUoVFlQRURfQ0xBU1MpKTtcclxuXHJcbiAgICAgICAgZWxlbWVudHNUb0FuaW1hdGUuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgaWYgKCFpdGVtLmVsLmRhdGFzZXQub3JpZ2luYWxUZXh0KSBpdGVtLmVsLmRhdGFzZXQub3JpZ2luYWxUZXh0ID0gaXRlbS5lbC5pbm5lckhUTUw7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlY29kZWRUZXh0ID0gZGVjb2RlU3BlY2lmaWNFbnRpdGllcyhpdGVtLmVsLmRhdGFzZXQub3JpZ2luYWxUZXh0KTtcclxuICAgICAgICAgICAgY29uc3QgJGVsID0gJChpdGVtLmVsKTtcclxuXHJcbiAgICAgICAgICAgIHNldFN0eWxlKGl0ZW0uZWwsICdoZWlnaHQsIG1pbi1oZWlnaHQnLCAkZWwub3V0ZXJIZWlnaHQoKSArICdweCcsIHRydWUpO1xyXG4gICAgICAgICAgICBzZXRTdHlsZShpdGVtLmVsLCAnb3ZlcmZsb3cnLCAnaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICRlbC5lbXB0eSgpO1xyXG4gICAgICAgICAgICBlbGVtZW50c1R5cGluZ0NvbnRlbnRDbGVhcmVkLmFkZChpdGVtLmVsKTtcclxuICAgICAgICAgICAgc2V0U3R5bGUoaXRlbS5lbCwgeyAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJywgJ29wYWNpdHknOiAnMScgfSwgbnVsbCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0eXBld3JpdGVyID0gbmV3IFR5cGV3cml0ZXIoaXRlbS5lbCwgeyBsb29wOiBmYWxzZSwgZGVsYXk6IDEsIHNwZWVkOiBpdGVtLnNwZWVkLCBjdXJzb3I6ICcnIH0pO1xyXG4gICAgICAgICAgICBhY3RpdmVUeXBld3JpdGVySW5zdGFuY2VzLnB1c2godHlwZXdyaXRlcik7XHJcblxyXG4gICAgICAgICAgICB0eXBld3JpdGVyLnR5cGVTdHJpbmcoZGVjb2RlZFRleHQpLmNhbGxGdW5jdGlvbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmVsLmNsYXNzTGlzdC5hZGQoJ2FuaW0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmVsLnNldEF0dHJpYnV0ZShUWVBFRF9DTEFTUywgJ3RydWUnKTtcclxuICAgICAgICAgICAgICAgIHNldFN0eWxlKGl0ZW0uZWwsICdoZWlnaHQsIG1pbi1oZWlnaHQsIHBvc2l0aW9uLCBvdmVyZmxvdycsICcnKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzVHlwaW5nQ29udGVudENsZWFyZWQuZGVsZXRlKGl0ZW0uZWwpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0YXJ0VHlwZXdyaXRlcihlbCkge1xyXG4gICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoVFlQRURfQ0xBU1MpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICgkKGVsKS5pcygnaDEnKSAmJiBjdXJyZW50QWN0aXZlVGFiID09PSAnb3B0aW9ucycpIHtcclxuICAgICAgICAgICAgYW5pbWF0ZUhlYWRlclNlcXVlbmNlKGVsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRml4OiBJZiB3ZSBjYXVnaHQgdGhlIGNvbnRhaW5lciwgbWFudWFsbHkgdHJpZ2dlciB0aGUgY2hpbGRyZW4gKGxlYWYgbm9kZXMpXHJcbiAgICAgICAgLy8gVGhpcyBlbnN1cmVzIHRoZXkgZ2V0IHBpY2tlZCB1cCBldmVuIGlmICdhcnJpdmUnIG1pc3NlZCB0aGUgZHluYW1pYyBpbnNlcnRpb25cclxuICAgICAgICBpZiAoJChlbCkuaGFzQ2xhc3MoJ2RldGFpbHMtcHJvZHVjdC1hdHRyaWJ1dGVfX3ZhbHVlJykpIHtcclxuICAgICAgICAgICAgc2V0U3R5bGUoZWwsIHsgJ3Zpc2liaWxpdHknOiAndmlzaWJsZScsICdvcGFjaXR5JzogJzEnIH0sIG51bGwsIHRydWUpO1xyXG4gICAgICAgICAgICAkKGVsKS5maW5kKCcuczEsIC5zMiwgLnNwZWMtZnVsbCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc3RhcnRUeXBld3JpdGVyKHRoaXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGV4dCA9IGVsLmRhdGFzZXQub3JpZ2luYWxUZXh0IHx8IGVsLmlubmVySFRNTDtcclxuICAgICAgICBpZiAoIWVsLmRhdGFzZXQub3JpZ2luYWxUZXh0KSBlbC5kYXRhc2V0Lm9yaWdpbmFsVGV4dCA9IHRleHQ7XHJcblxyXG4gICAgICAgIGNvbnN0ICRlbCA9ICQoZWwpO1xyXG4gICAgICAgIHNldFN0eWxlKGVsLCAnaGVpZ2h0LCBtaW4taGVpZ2h0JywgJGVsLm91dGVySGVpZ2h0KCkgKyAncHgnLCB0cnVlKTtcclxuICAgICAgICBzZXRTdHlsZShlbCwgJ292ZXJmbG93JywgJ2hpZGRlbicsIHRydWUpO1xyXG5cclxuICAgICAgICAkZWwuZW1wdHkoKTtcclxuICAgICAgICBlbGVtZW50c1R5cGluZ0NvbnRlbnRDbGVhcmVkLmFkZChlbCk7XHJcbiAgICAgICAgc2V0U3R5bGUoZWwsIHsgJ3Zpc2liaWxpdHknOiAndmlzaWJsZScsICdvcGFjaXR5JzogJzEnLCAnZGlzcGxheSc6ICcnIH0sIG51bGwsIHRydWUpO1xyXG5cclxuICAgICAgICAvLyBVc2UgMjBtcyBkZWxheSBmb3Igc3BlY3MgKGJhbGFuY2Ugc3BlZWQvZmVlbCBmb3IgcGFyYWxsZWwgdHlwaW5nKVxyXG4gICAgICAgIC8vIFVzZSBzdGFuZGFyZCBUWVBFX1NQRUVEICgxbXMpIGZvciBldmVyeXRoaW5nIGVsc2VcclxuICAgICAgICBjb25zdCBpc1NwZWMgPSAkZWwuaXMoJy5zMSwgLnMyLCAuc3BlYy1mdWxsLCAuZGV0YWlscy1wcm9kdWN0LWF0dHJpYnV0ZV9fdGl0bGUnKTtcclxuICAgICAgICBjb25zdCBkZWxheSA9IGlzU3BlYyA/IDIwIDogVFlQRV9TUEVFRDtcclxuXHJcbiAgICAgICAgY29uc3QgdHlwZXdyaXRlciA9IG5ldyBUeXBld3JpdGVyKGVsLCB7IGxvb3A6IGZhbHNlLCBkZWxheTogZGVsYXksIGN1cnNvcjogJycgfSk7XHJcbiAgICAgICAgYWN0aXZlVHlwZXdyaXRlckluc3RhbmNlcy5wdXNoKHR5cGV3cml0ZXIpO1xyXG5cclxuICAgICAgICAvLyBIZWxwZXIgdG8gYW5pbWF0ZSBIVE1MIHNtYXJ0bHk6IHBhcnNlIERPTSB0byBwcmVzZXJ2ZSBzdHJ1Y3R1cmUgYW5kIGVudGl0aWVzXHJcbiAgICAgICAgLy8gV2UgY3JlYXRlIGEgdGVtcG9yYXJ5IHdyYXBwZXIgdG8gcGFyc2UgdGhlIEhUTUwgc3RyaW5nIGludG8gbm9kZXNcclxuICAgICAgICBjb25zdCBwYXJzZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBwYXJzZXJEaXYuaW5uZXJIVE1MID0gdGV4dDsgLy8gdGV4dCBpcyBhbHJlYWR5IG9yaWdpbmFsVGV4dCAocmF3IEhUTUwpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHF1ZXVlTm9kZXMobm9kZXMpIHtcclxuICAgICAgICAgICAgQXJyYXkuZnJvbShub2RlcykuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7IC8vIFRleHQgTm9kZVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IG5vZGUudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHlwZSB0ZXh0IGNvbnRlbnQuIE5vdGU6IHRleHRDb250ZW50IGhhcyBlbnRpdGllcyBkZWNvZGVkIChlLmcuICZhbXA7IGJlY29tZXMgJilcclxuICAgICAgICAgICAgICAgICAgICAvLyB3aGljaCBpcyBleGFjdGx5IHdoYXQgdHlwZVN0cmluZyBleHBlY3RzLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBld3JpdGVyLnR5cGVTdHJpbmcodmFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHsgLy8gRWxlbWVudCBOb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFnTmFtZSA9IG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBzZWxmLWNsb3NpbmcgdGFncyAoYnIsIGltZywgaHIsIGV0YylcclxuICAgICAgICAgICAgICAgICAgICBpZiAoWydicicsICdpbWcnLCAnaHInLCAnaW5wdXQnXS5pbmNsdWRlcyh0YWdOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHlwZXdyaXRlci5wYXN0ZVN0cmluZyhub2RlLm91dGVySFRNTCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWNvbnN0cnVjdCBvcGVuaW5nIHRhZyB3aXRoIGF0dHJpYnV0ZXNcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhdHRycyA9IEFycmF5LmZyb20obm9kZS5hdHRyaWJ1dGVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKGEgPT4gYCAke2EubmFtZX09XCIke2EudmFsdWV9XCJgKS5qb2luKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0eXBld3JpdGVyLnBhc3RlU3RyaW5nKGA8JHt0YWdOYW1lfSR7YXR0cnN9PmApO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlY3Vyc2UgZm9yIGNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAgICAgcXVldWVOb2Rlcyhub2RlLmNoaWxkTm9kZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENsb3NlIHRhZ1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGV3cml0ZXIucGFzdGVTdHJpbmcoYDwvJHt0YWdOYW1lfT5gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBxdWV1ZU5vZGVzKHBhcnNlckRpdi5jaGlsZE5vZGVzKTtcclxuXHJcbiAgICAgICAgdHlwZXdyaXRlci5jYWxsRnVuY3Rpb24oKCkgPT4ge1xyXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdhbmltLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoVFlQRURfQ0xBU1MsICd0cnVlJyk7XHJcbiAgICAgICAgICAgIHNldFN0eWxlKGVsLCAnaGVpZ2h0LCBtaW4taGVpZ2h0LCBwb3NpdGlvbiwgb3ZlcmZsb3cnLCAnJyk7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzVHlwaW5nQ29udGVudENsZWFyZWQuZGVsZXRlKGVsKTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFuaW1hdGVBY3RpdmVTZWN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0eXBld3JpdGVyT2JzZXJ2ZXIpIHR5cGV3cml0ZXJPYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgZWxlbWVudHNCZWluZ09ic2VydmVkLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIHR5cGV3cml0ZXJPYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xyXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZyAmJiAhZW50cnkudGFyZ2V0Lmhhc0F0dHJpYnV0ZShUWVBFRF9DTEFTUykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUeXBld3JpdGVyKGVudHJ5LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCB7IHRocmVzaG9sZDogMC4xIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RvcnMgPSBbXHJcbiAgICAgICAgICAgICdoMScsICdoMicsICdoMycsICdoNCcsICdwJywgJ2xpJyxcclxuICAgICAgICAgICAgJy5wcm9kdWN0LWRldGFpbHMtbW9kdWxlX190aXRsZScsXHJcbiAgICAgICAgICAgICcucmV2aWV3LWJsb2NrX190aXRsZScsXHJcbiAgICAgICAgICAgICcuZGV0YWlscy1wcm9kdWN0LWF0dHJpYnV0ZV9fdGl0bGUnLFxyXG4gICAgICAgICAgICAvLyBUYXJnZXQgbGVhZiBub2RlcyBvZiB0aGUgbmV3IGZsdWlkIHRhYmxlIHN0cnVjdHVyZSBmb3Igc2FmZXIsIHBhcmFsbGVsIHR5cGluZ1xyXG4gICAgICAgICAgICAnLnMxJyxcclxuICAgICAgICAgICAgJy5zMicsXHJcbiAgICAgICAgICAgICcuc3BlYy1mdWxsJyxcclxuICAgICAgICAgICAgLy8gRmFsbGJhY2s6IFdhdGNoIGNvbnRhaW5lciB0byBtYW51YWxseSB0cmlnZ2VyIGNoaWxkcmVuIGlmIG5lZWRlZFxyXG4gICAgICAgICAgICAnLmRldGFpbHMtcHJvZHVjdC1hdHRyaWJ1dGVfX3ZhbHVlJ1xyXG4gICAgICAgIF0uam9pbignLCAnKTtcclxuXHJcbiAgICAgICAgJHBhcmVudC5hcnJpdmUoc2VsZWN0b3JzLCB7IGV4aXN0aW5nOiB0cnVlIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRhdGFzZXQub3JpZ2luYWxUZXh0KSB0aGlzLmRhdGFzZXQub3JpZ2luYWxUZXh0ID0gdGhpcy5pbm5lckhUTUw7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoVFlQRURfQ0xBU1MpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuICAgICAgICAgICAgICAgIHR5cGV3cml0ZXJPYnNlcnZlci5vYnNlcnZlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHNCZWluZ09ic2VydmVkLmFkZCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gU05JUFMgU1lTVEVNIChUT09MVElQUylcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5mdW5jdGlvbiBnZXRUb29sdGlwU2l6ZSgpIHtcclxuICAgIGNvbnN0IHZ3ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgY29uc3QgYmFzZSA9IHZ3ICogMC40O1xyXG4gICAgY29uc3QgbWF4ID0gdncgKiAwLjk7XHJcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbih2dyAqIDAuOCwgMTAwKTtcclxuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5tYXgobWluLCBNYXRoLm1pbihiYXNlLCBtYXgpKTtcclxuICAgIHJldHVybiB7IHRvb2x0aXBXaWR0aDogd2lkdGgsIHRvb2x0aXBIZWlnaHQ6IHdpZHRoICogKDQgLyAzKSB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0U25pcHMoJCkge1xyXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0ICR0b29sdGlwID0gJCgnPGRpdiBpZD1cInBkbC10b29sdGlwLXByZXZpZXdcIj48L2Rpdj4nKTtcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKCR0b29sdGlwKTtcclxuXHJcbiAgICAgICAgY29uc3QgZmFkZU9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzLCBvYnMpID0+IHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZmFkZS1pbi12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JzLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgeyB0aHJlc2hvbGQ6IDAuMSB9KTtcclxuXHJcbiAgICAgICAgJC5hcnJpdmUoJy5wZGwtd3JhcCcsIHsgZXhpc3Rpbmc6IHRydWUsIG9uY2VPbmx5OiBmYWxzZSB9LCBwZGxXcmFwID0+IHtcclxuICAgICAgICAgICAgY29uc3QgJHBkbFdyYXAgPSAkKHBkbFdyYXApO1xyXG4gICAgICAgICAgICBjb25zdCBnYXAgPSAyMDtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTbmlwID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50U25pcCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IGdldFRvb2x0aXBTaXplKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2dyA9ICQod2luZG93KS53aWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlZnQgPSBlLmNsaWVudFggLSBzaXplLnRvb2x0aXBXaWR0aCAqIDAuOTtcclxuICAgICAgICAgICAgICAgIGxldCB0b3AgPSBlLmNsaWVudFkgLSBzaXplLnRvb2x0aXBIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICAgICAgbGVmdCA9IE1hdGgubWF4KGdhcCwgTWF0aC5taW4obGVmdCwgdncgLSBzaXplLnRvb2x0aXBXaWR0aCAtIGdhcCkpO1xyXG4gICAgICAgICAgICAgICAgdG9wID0gTWF0aC5tYXgoZ2FwLCBNYXRoLm1pbih0b3AsICQod2luZG93KS5oZWlnaHQoKSAtIHNpemUudG9vbHRpcEhlaWdodCAtIGdhcCkpO1xyXG4gICAgICAgICAgICAgICAgJHRvb2x0aXAuY3NzKHsgbGVmdCwgdG9wIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRwZGxXcmFwLm9uKCdtb3VzZWVudGVyJywgXCIuc25pcCwgLmV4dHJhXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0ICRzbmlwID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTbmlwID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJnID0gJHNuaXAuY3NzKCdiYWNrZ3JvdW5kSW1hZ2UnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IGdldFRvb2x0aXBTaXplKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHRvb2x0aXAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6IGJnLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIHdpbmRvdy5zY3JvbGxZLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbmRvdy5zY3JvbGxYLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdhbGwgLjJzIGVhc2Utb3V0J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNuaXAuYWRkQ2xhc3MoJ3NuaXAtaG92ZXJlZCcpO1xyXG4gICAgICAgICAgICAgICAgJHBkbFdyYXAuYWRkQ2xhc3MoJ3BkbC13cmFwLWhvdmVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdncgPSAkKHdpbmRvdykud2lkdGgoKTtcclxuICAgICAgICAgICAgICAgIGxldCBsZWZ0ID0gcmVjdC5sZWZ0IC0gc2l6ZS50b29sdGlwV2lkdGggLSBnYXA7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9wID0gcmVjdC50b3AgKyByZWN0LmhlaWdodCAvIDIgLSBzaXplLnRvb2x0aXBIZWlnaHQgLyAyO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsZWZ0IDwgZ2FwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmlnaHRPcHRpb24gPSByZWN0LnJpZ2h0ICsgZ2FwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyaWdodE9wdGlvbiArIHNpemUudG9vbHRpcFdpZHRoIDwgdncgLSBnYXApIGxlZnQgPSByaWdodE9wdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGxlZnQgPSAodncgLSBzaXplLnRvb2x0aXBXaWR0aCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxlZnQgPSBNYXRoLm1heChnYXAsIE1hdGgubWluKGxlZnQsIHZ3IC0gc2l6ZS50b29sdGlwV2lkdGggLSBnYXApKTtcclxuICAgICAgICAgICAgICAgIHRvcCA9IE1hdGgubWF4KGdhcCwgTWF0aC5taW4odG9wLCAkKHdpbmRvdykuaGVpZ2h0KCkgLSBzaXplLnRvb2x0aXBIZWlnaHQgLSBnYXApKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkdG9vbHRpcC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogc2l6ZS50b29sdGlwV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogc2l6ZS50b29sdGlwSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcCArIHdpbmRvdy5zY3JvbGxZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBsZWZ0ICsgd2luZG93LnNjcm9sbFhcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkcGRsV3JhcC5vbignbW91c2VsZWF2ZScsIFwiLnNuaXAsIC5leHRyYVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRTbmlwKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWN0ID0gY3VycmVudFNuaXAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAkdG9vbHRpcC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIHdpbmRvdy5zY3JvbGxZLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbmRvdy5zY3JvbGxYLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJChjdXJyZW50U25pcCkucmVtb3ZlQ2xhc3MoJ3NuaXAtaG92ZXJlZCcpO1xyXG4gICAgICAgICAgICAgICAgJHBkbFdyYXAucmVtb3ZlQ2xhc3MoJ3BkbC13cmFwLWhvdmVyJyk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50U25pcCA9IG51bGw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHBkbFdyYXAuYXJyaXZlKCcuc25pcCwgLmV4dHJhJywgeyBleGlzdGluZzogdHJ1ZSwgb25jZU9ubHk6IGZhbHNlIH0sIGVsID0+IHtcclxuICAgICAgICAgICAgICAgIGZhZGVPYnNlcnZlci5vYnNlcnZlKGVsKTtcclxuICAgICAgICAgICAgfSkubGVhdmUoJy5zbmlwLCAuZXh0cmEnLCBlbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBmYWRlT2JzZXJ2ZXIudW5vYnNlcnZlKGVsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHByb2R1Y3QgYXR0cmlidXRlIHZhbHVlcyBpbnRvIGZvcm1hdHRlZCBzcGVjIHRhYmxlc1xyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlRmx1aWRTcGVjUm93KGNvbDEsIGNvbDIpIHtcclxuICAgIGNvbnN0IGhhc1ZhbCA9ICEhY29sMTtcclxuICAgIGNvbnN0IGhhc0Rlc2MgPSAhIWNvbDI7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3IgJHtoYXNEZXNjID8gJ2RzJyA6ICcnfSAke2hhc1ZhbCA/ICdoYXMtdmFsdWUnIDogJyd9XCI+XHJcbiAgICAgICAgICAgICAgICAke2hhc1ZhbCA/IGA8ZGl2IGNsYXNzPVwiczFcIj4ke2NvbDEgfHwgJyd9PC9kaXY+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgJHtoYXNEZXNjID8gYDxkaXYgY2xhc3M9XCJzMlwiPiR7Y29sMiB8fCAnJ308L2Rpdj5gIDogJyd9XHJcbiAgICAgICAgICAgIDwvZGl2PmA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRQcm9kdWN0QXR0cmlidXRlVGFibGVzKCkge1xyXG4gICAgJChcIi5kZXRhaWxzLXByb2R1Y3QtYXR0cmlidXRlX192YWx1ZVwiKS5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSAkKGVsKTtcclxuICAgICAgICBpZiAoaXRlbS5maW5kKCcuZnMnKS5sZW5ndGggPiAwKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCByYXdIdG1sID0gaXRlbS5odG1sKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gLS0tIEhBQ0tZIE1BUktET1dOIFBBUlNFUiAtLS1cclxuICAgICAgICAvLyBDb252ZXJ0cyBcIjo6OiB0YWcgLmNsYXNzXCIgc3ludGF4IGJhY2sgdG8gSFRNTCBzdHJ1Y3R1cmVcclxuICAgICAgICBpZiAocmF3SHRtbC50cmltKCkuc3RhcnRzV2l0aCgnOjo6JykpIHtcclxuICAgICAgICAgICAgIGxldCBodG1sID0gJyc7XHJcbiAgICAgICAgICAgICBsZXQgY2xvc2VTdGFjayA9IFtdO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAvLyBOb3JtYWxpemUgbmV3bGluZXMgKEVjd2lkIG1pZ2h0IGNvbnZlcnQgbmV3bGluZXMgdG8gPGJyPiBvciBzcGFjZXMpXHJcbiAgICAgICAgICAgICAvLyBXZSBhc3N1bWUgdGhlIGlucHV0IGZyb20gRWN3aWQga2VlcHMgbmV3bGluZXMgb3Igd2UgdHJlYXQgPGJyPiBhcyBuZXdsaW5lXHJcbiAgICAgICAgICAgICBsZXQgbGluZXMgPSByYXdIdG1sXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvPGJyXFxzKlxcLz8+L2dpLCAnXFxuJylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8mbHQ7L2csICc8JykucmVwbGFjZSgvJmd0Oy9nLCAnPicpIC8vIERlY29kZSBlbnRpdGllcyBpZiB2YWxpZCBjaGFycyB3ZXJlIGVzY2FwZWRcclxuICAgICAgICAgICAgICAgIC5zcGxpdCgnXFxuJyk7XHJcblxyXG4gICAgICAgICAgICAgbGluZXMuZm9yRWFjaChsaW5lID0+IHtcclxuICAgICAgICAgICAgICAgICBsaW5lID0gbGluZS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgaWYgKCFsaW5lKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJzo6OicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIC8vIERlZmluaXRpb246IDo6OiB0YWcgLmNsYXNzMSAuY2xhc3MyXHJcbiAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gbGluZS5zdWJzdHJpbmcoMykudHJpbSgpLnNwbGl0KC9cXHMrLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZyA9IHBhcnRzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICBsZXQgY2xhc3NlcyA9IHBhcnRzLnNsaWNlKDEpLmpvaW4oJyAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgIC8vIENvbnZlcnQgLmNsYXNzIHN5bnRheCB0byBjbGFzcz1cImNsYXNzXCIgKGlmIHVzZXIgdXNlZCAuY2xhc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc2VzLmluY2x1ZGVzKCcuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzLnJlcGxhY2UoL1xcLi9nLCAnICcpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydCBjbG9zaW5nIHByZXZpb3VzIGF1dG8tY2xvc3VyZSB0YWdzIGlmIG5lZWRlZD8gXHJcbiAgICAgICAgICAgICAgICAgICAgIC8vIE5vLCBzaW1wbGUgc3RhY2s6IHN0YW5kYXJkIGFzc3VtZXMgbmVzdGVkIHVubGVzcyB3ZSB1c2UgaW5kZW50YXRpb24gKG5vdCBkb2luZyB0aGF0KVxyXG4gICAgICAgICAgICAgICAgICAgICAvLyBBY3R1YWxseSwgaWYgd2UganVzdCBvcGVuIHRhZ3MsIHdlIG5lZWQgdG8gY2xvc2UgdGhlbSBhdCB0aGUgZW5kLlxyXG4gICAgICAgICAgICAgICAgICAgICAvLyBJTVBPUlRBTlQ6IFRoZSBIVE1MIHN0cnVjdHVyZSA8c2VjdGlvbj48YXJ0aWNsZT48ZGl2Pjx1bD4gaXMgbmVzdGVkLlxyXG4gICAgICAgICAgICAgICAgICAgICAvLyBUaGUgc3ludGF4IDo6OiBzZWN0aW9uIFxcbiA6OjogYXJ0aWNsZSBpbXBsaWVzIG5lc3RpbmcuXHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICBodG1sICs9IGA8JHt0YWd9JHtjbGFzc2VzID8gYCBjbGFzcz0nJHtjbGFzc2VzfSdgIDogJyd9PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgIGNsb3NlU3RhY2sucHVzaChgPC8ke3RhZ30+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKCctICcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIC8vIExpc3QgSXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9IGxpbmUuc3Vic3RyaW5nKDIpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgIC8vIFNpbXBsZSBNYXJrZG93biBmb3IgY29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwqXFwqKC4qPylcXCpcXCovZywgJzxiPiQxPC9iPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCooLio/KVxcKi9nLCAnPGk+JDE8L2k+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL19fKC4qPylfXy9nLCAnPHU+JDE8L3U+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICBodG1sICs9IGA8bGk+JHtjb250ZW50fTwvbGk+YDtcclxuICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAvLyBQbGFpbiB0ZXh0IG9yIHVuaGFuZGxlZCBsaW5lIC0+IGFwcGVuZCBhcyBpcyAocHJlc2VydmluZyB0ZXh0IGZsb3cpXHJcbiAgICAgICAgICAgICAgICAgICAgIC8vIElmIGl0J3MgSFRNTCBsaW5lIGZyb20gRWN3aWQgKGUuZy4gPHA+Li4uKSB3ZSBrZWVwIGl0LlxyXG4gICAgICAgICAgICAgICAgICAgICAvLyBXZSBhZGQgYSBzcGFjZSBpZiBuZWVkZWQ/IE5vLCB1c2VyIHNwbGl0cyBieSBcXG4uXHJcbiAgICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gbGluZTsgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIC8vIENsb3NlIGFsbCBvcGVuZWQgdGFncyBpbiByZXZlcnNlIG9yZGVyXHJcbiAgICAgICAgICAgICB3aGlsZSAoY2xvc2VTdGFjay5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICBodG1sICs9IGNsb3NlU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIGl0ZW0uaHRtbChodG1sKTtcclxuICAgICAgICAgICAgIHJldHVybjsgLy8gU2tpcCBzdGFuZGFyZCBwcm9jZXNzaW5nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkF0dHJpYnV0ZSByYXc6XCIsIHJhd0h0bWwpO1xyXG5cclxuICAgICAgICAvLyBTdGFydCB0aGUgZmx1aWQgc3RydWN0dXJlXHJcbiAgICAgICAgbGV0IGZsdWlkSHRtbCA9ICc8ZGl2IGNsYXNzPVwiZnNcIj4nO1xyXG5cclxuICAgICAgICAvLyBQcmUtcHJvY2VzcyBNYXJrZG93biBpbiB0aGUgZW50aXJlIGJsb2NrIGZpcnN0XHJcbiAgICAgICAgLy8gMS4gRGV0ZWN0IEhSOiAgXCJfX19cIiBvciBcIi0tLVwiIG9uIGEgbGluZSBieSBpdHNlbGZcclxuICAgICAgICByYXdIdG1sID0gcmF3SHRtbC5yZXBsYWNlKC9eXFxzKihfLSl7Myx9XFxzKiQvZ20sICc8aHI+Jyk7ICAgXHJcblxyXG4gICAgICAgIC8vIDIuIERldGVjdCBNYXJrZG93biBMaW5lIEJyZWFrcyAoMisgc3BhY2VzIGF0IGVuZCBvZiBsaW5lKSBPUiBsaXRlcmFsIFwiXFxuXCIgY2hhciAtPiA8YnI+XHJcbiAgICAgICAgLy8gV2UgZG8gdGhpcyBtYXRjaGluZyBiZWZvcmUgc3BsaXR0aW5nIG9yIG90aGVyIGNsZWFudXBzXHJcbiAgICAgICAgcmF3SHRtbCA9IHJhd0h0bWwucmVwbGFjZSgvXFxcXG4vZywgJzxicj4nKS5yZXBsYWNlKC9cXHN7Mix9JC9nbSwgJzxicj4nKTtcclxuXHJcbiAgICAgICAgLy8gMy4gU2ltcGxlIE1hcmtkb3duOiAqKmJvbGQqKiAtPiA8Yj5ib2xkPC9iPiwgKml0YWxpYyogLT4gPGk+aXRhbGljPC9pPlxyXG4gICAgICAgIC8vIE5vdGU6IFdlIHVzZSBhIGxvb3Agb3IgcmVnZXggdGhhdCBoYW5kbGVzIG11bHRpcGxlIGluc3RhbmNlcyBwZXIgbGluZVxyXG4gICAgICAgIC8vIEJlIGNhcmVmdWwgbm90IHRvIGJyZWFrIGV4aXN0aW5nIEhUTUwgaWYgbWl4ZWQuXHJcbiAgICAgICAgcmF3SHRtbCA9IHJhd0h0bWwgLy8gY29udGludWUgY2hhaW5cclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcKlxcKiguKj8pXFwqXFwqL2csICc8Yj4kMTwvYj4nKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwqKC4qPylcXCovZywgJzxpPiQxPC9pPicpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9fXyguKj8pX18vZywgJzx1PiQxPC91PicpO1xyXG5cclxuICAgICAgICAvLyBTcGxpdCBieSBcIlx1MjY2NlwiIFxyXG4gICAgICAgIGxldCBsaW5lcyA9IHJhd0h0bWwuc3BsaXQoJ1x1MjY2NicpO1xyXG5cclxuICAgICAgICBsaW5lcy5mb3JFYWNoKChsaW5lKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghbGluZSB8fCBsaW5lLnRyaW0oKSA9PT0gJycpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIC8vIDEuIENsZWFuIEJSIHRhZ3MgJiB3aGl0ZXNwYWNlXHJcbiAgICAgICAgICAgIGxldCBjbGVhbkxpbmUgPSBsaW5lLnJlcGxhY2UoL15cXDxiclxccypcXC8/XFw+L2ksIFwiXCIpLnJlcGxhY2UoL1xcPGJyXFxzKlxcLz9cXD4kL2ksIFwiXCIpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIC8vIDIuIENvbnRlbnQgaXMgYWxyZWFkeSBNYXJrZG93biBwcm9jZXNzZWQgYWJvdmUsIG1vc3RseVxyXG4gICAgICAgICAgICBsZXQgY29udGVudCA9IGNsZWFuTGluZTtcclxuXHJcbiAgICAgICAgICAgIC8vIENBU0UgQTogSGVhZGVycyAoQm9sZCBUZXh0IGxpa2UgXCIqKkZPUiA0OFYqKlwiKVxyXG4gICAgICAgICAgICBpZiAoL15cXHMqPGI+Lio8XFwvYj5cXHMqJC8udGVzdChjb250ZW50KSkge1xyXG4gICAgICAgICAgICAgICAgZmx1aWRIdG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzciBzcGVjLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGVjLWZ1bGxcIiBzdHlsZT1cInZpc2liaWxpdHk6IGhpZGRlbjtcIj4ke2NvbnRlbnR9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDQVNFIEI6IER1YWwgVmFsdWVzIHZpYSBQaXBlICd8JyAoZS5nLiBcIjU0LjZWIHwgMTAwJVwiKVxyXG4gICAgICAgICAgICBsZXQgd3JhcHBlclRhZyA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChjb250ZW50LnN0YXJ0c1dpdGgoJzxiPicpICYmIGNvbnRlbnQuZW5kc1dpdGgoJzwvYj4nKSkgd3JhcHBlclRhZyA9ICdiJztcclxuICAgICAgICAgICAgZWxzZSBpZiAoY29udGVudC5zdGFydHNXaXRoKCc8aT4nKSAmJiBjb250ZW50LmVuZHNXaXRoKCc8L2k+JykpIHdyYXBwZXJUYWcgPSAnaSc7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5uZXJDb250ZW50ID0gY29udGVudDtcclxuICAgICAgICAgICAgaWYgKHdyYXBwZXJUYWcpIHtcclxuICAgICAgICAgICAgICAgIGlubmVyQ29udGVudCA9IGNvbnRlbnQuc3Vic3RyaW5nKDMsIGNvbnRlbnQubGVuZ3RoIC0gNCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbm5lckNvbnRlbnQuaW5jbHVkZXMoJ3wnKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhcnRzID0gaW5uZXJDb250ZW50LnNwbGl0KCd8Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gcGFydHNbMF0udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlc2MgPSBwYXJ0cy5zbGljZSgxKS5qb2luKCd8JykudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlLXdyYXAgaWYgbmVlZGVkXHJcbiAgICAgICAgICAgICAgICBpZiAod3JhcHBlclRhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IGA8JHt3cmFwcGVyVGFnfT4ke3ZhbH08LyR7d3JhcHBlclRhZ30+YDtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjID0gYDwke3dyYXBwZXJUYWd9PiR7ZGVzY308LyR7d3JhcHBlclRhZ30+YDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmbHVpZEh0bWwgKz0gY3JlYXRlRmx1aWRTcGVjUm93KHZhbCwgZGVzYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENBU0UgQzogQXV0by1EZXRlY3QgbWlzc2luZyBwaXBlIChlLmcuIFwiOEEgZmFzdFwiKVxyXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBpbm5lckNvbnRlbnQubWF0Y2goL14oXFxkKyg/OlxcLlxcZCspP1tBLVphLXolXSspXFxzKyguKykkLyk7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IG1hdGNoWzFdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlc2MgPSBtYXRjaFsyXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZS13cmFwIGlmIG5lZWRlZFxyXG4gICAgICAgICAgICAgICAgaWYgKHdyYXBwZXJUYWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgPSBgPCR7d3JhcHBlclRhZ30+JHt2YWx9PC8ke3dyYXBwZXJUYWd9PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzYyA9IGA8JHt3cmFwcGVyVGFnfT4ke2Rlc2N9PC8ke3dyYXBwZXJUYWd9PmA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZmx1aWRIdG1sICs9IGNyZWF0ZUZsdWlkU3BlY1Jvdyh2YWwsIGRlc2MpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDQVNFIEQ6IEZhbGxiYWNrIChTaW5nbGUgbGluZSB0ZXh0IC0+IDJuZCBDb2x1bW4gYXMgcmVxdWVzdGVkKVxyXG4gICAgICAgICAgICBmbHVpZEh0bWwgKz0gY3JlYXRlRmx1aWRTcGVjUm93KCcnLCBjb250ZW50KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZmx1aWRIdG1sICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAvLyBSZXBsYWNlIHRoZSBjb250ZW50XHJcbiAgICAgICAgaXRlbS5odG1sKGZsdWlkSHRtbCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IHsgaW5pdFNuaXBzLCBpbmplY3RQcm9kdWN0RGV0YWlsc1RhYnMsIGluaXRQcm9kdWN0QXR0cmlidXRlVGFibGVzIH07Il0sCiAgIm1hcHBpbmdzIjogIkFBQUEsT0FBTyxhQUFhLGdCQUFnQjtBQUNwQyxPQUFPLGdCQUFnQjtBQUN2QixTQUFTLEdBQUcsVUFBVSxPQUFPLGdCQUFnQjtBQUc3QyxNQUFNLFdBQVc7QUFTakIsU0FBUyxrQkFBa0IsS0FBSyxZQUFZO0FBQ3hDLE1BQUksTUFBTSxHQUFHO0FBQ1QsV0FBTyxZQUFZLEdBQUc7QUFBQSxFQUMxQjtBQUNBLFNBQU8sR0FBRyxRQUFRLElBQUksVUFBVSxJQUFJLEdBQUc7QUFDM0M7QUFLQSxJQUFJLDRCQUE0QixDQUFDO0FBQ2pDLE1BQU0sYUFBYTtB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
