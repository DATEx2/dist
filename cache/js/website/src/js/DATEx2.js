import { $, jQuery, __defineProperty, NotIncluded, pageState, EcwidApiKey, isDev, d, w, D, isTouchDevice, hasTouchEvents, storeId, $w, b, h, $h, $b, $d, FETCH_CART_PRODUCT, cachedPromisesCartAndPid, preloadedCss, smooth, onceOnly, notOnceOnly, onceOnlySelfUnbind, notOnceOnlySelfUnbind, strike, bold, boldy, unbold, extractBold, UpdateCurrentProductClasses, hideScreenLoading, hideActionBar, showActionBar, injectProductDetails, installScrollOverride, isInOutOfView, isInView, isOutOfView, logDuration, extractEmailAddress, onUnload, onUnloadCompleted, onPageUnloaded, onDomReady, domReadyArrived, onPageLoaded, pageLoadedCompleted, onPageLoading, pageLoadingCompleted, lazyCSS } from "./utils.js";
import { arrivePageSelfUnbindCallbacksOnPageUnload } from "./arrive.js";
import { injectReviews } from "./websiteReviews.js";
import {} from "./ecwid/i.min.js";
const { default: FD23 } = await import("./FD23.js");
const { default: translate, svgIcons } = await import("./translations.js");
const { uiNumber } = await import("./uiNumber.js");
const elementsMetadata = /* @__PURE__ */ new WeakMap();
uiNumber.initJQuery($);
const { initSnips, injectProductDetailsTabs, initProductAttributeTables } = await import("./productDetails.js");
const { knownProductSlugs, knownCategorySlugs } = require("../db/knownProductSlugs.js");
window.knownProductSlugs = knownProductSlugs;
window.knownCategorySlugs = knownCategorySlugs;
logDuration("All modules loaded. Running app. Initializing...")();
initSnips($);
const cursorOffset = 18;
$(document).on({
  "mouseenter touchstart": function(e) {
    const $link = $(this);
    const linkText = $link.text().trim();
    $link.attr("data-text", linkText);
    $link.addClass("is-tooltip-active");
    const event = e.type.startsWith("touch") ? e.originalEvent.touches[0] : e;
    updateTooltipPosition($link, event);
  },
  "mousemove": function(e) {
    if ($(this).hasClass("is-tooltip-active")) {
      updateTooltipPosition($(this), e);
    }
  },
  "mouseleave touchend": function() {
    $(this).removeClass("is-tooltip-active");
  }
}, 'a[target="_blank"]');
function updateTooltipPosition($link, event) {
  const linkOffset = $link.offset();
  const cursorX = event.pageX;
  const cursorY = event.pageY;
  const top = cursorY - linkOffset.top;
  const left = cursorX - linkOffset.left;
  $link.css({
    "--top": top + "px",
    "--left": left + "px"
  });
}
var shouldHideScreenLoading = true;
;
function preventRightClick(e) {
  if (e.which == 3) {
    return preventContextMenu(e);
  }
}
function preventContextMenu(e) {
  e.cancelBubble = true;
  e.stopImmediatePropagation();
  e.preventDefault();
  return false;
}
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = /* @__PURE__ */ new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ")
      c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0)
      return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function unfoldWholeSale() {
  const showWholeSales = localStorage.getItem("wholesale") == "1";
  $d.toggleClass("show-whole-sales", showWholeSales).toggleClass("hide-whole-sales", !showWholeSales);
}
unfoldWholeSale();
addEventListener("fullscreenchange", (e) => $d.toggleClass("is-full-screen", !!d.fullscreenElement));
var pageType, $header, scrollWidth = w.scrollWidth || 0;
window.removeStaticIntervalId && clearInterval(removeStaticIntervalId);
$d.arrive("#static-html", onceOnly, (staticElement) => staticElement && staticElement.parentNode && staticElement.parentNode.removeChild(staticElement));
const stuckObserver = new IntersectionObserver(
  ([e]) => {
    e.target.classList.toggle("is-stuck", e.intersectionRatio < 1);
  },
  {
    // This threshold ensures the toggle happens 
    // exactly when the sticky position activates
    threshold: [1]
  }
);
$d.arrive(
  ".product-details__product-title.ec-header-h3, .ec-related-products__title.ec-header-h4, .details-product-option__title.ec-header-h6",
  notOnceOnly,
  (elem) => {
    stuckObserver.observe(elem);
    $(elem).parent().leave(
      elem,
      onceOnly,
      (e) => {
        stuckObserver.unobserve(e);
      }
    );
  }
);
$d.arrive(".clearboth, .ec-cart, #tile-feature-list-pK6rc9, .ec-footer, .ec-confirmation__continue", onceOnly, domReadyArrived);
onPageLoaded((page2) => setTimeout((t) => d.arrive(
  "a,img",
  notOnceOnly,
  (elem) => {
    elem.addEventListener("click", preventRightClick, true);
    elem.addEventListener("contextmenu", preventContextMenu, true);
  }
), 1e3));
const roundBorder = svgIcons.roundBorder;
(function($2) {
  $2.fn.flowtype = function(options) {
    var settings = $2.extend({
      maximum: 9999,
      minimum: 1,
      maxFont: 15,
      minFont: 1,
      fontRatio: 25,
      target: ""
    }, options), changes = function(el) {
      const maximum = typeof settings.maximum == "function" ? settings.maximum(this, el) : settings.maximum, minimum = typeof settings.minimum == "function" ? settings.minimum(this, el) : settings.minimum, $el = $2(settings.target || el), elw = $el.width(), width = elw > maximum ? maximum : elw < minimum ? minimum : elw, fontBase = width / settings.fontRatio, fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
      $el.css("font-size", fontSize + "px");
    };
    return $2(this).each(function() {
      var that = this;
      $2(window).on("resize", function() {
        changes(that);
      });
      changes(this);
    });
  };
})(jQuery);
if (!$("#round-border").length) {
  $(document.body).append(roundBorder);
}
const dx = {};
function initDx() {
  dx.Dx2 = {
    by: "REFURXgy",
    invoiceNumber: "I0R4Mg==",
    IBANEUR: "Uk84NEJUUkxFVVJDUlQwNTg3MjY5MDAx",
    IBANUSD: "Uk84OEJUUkxVU0RDUlQwNTg3MjY5MDAx",
    IBANRON: "Uk8zN0JUUkxST05DUlQwNTg3MjY5MDAx",
    name: "REFURXgyLkJJS0UgU1JM",
    address: "UGx1Z3VsdWkgNjVBLCA4MDUzMDAsIFRlY3VjaSwgR0wsIFJvbWFuaWE=",
    email: "REFURXgyLmJpa2VAZ21haWwuY29t",
    reg: "SjE3LzE0MDkvMjcuMDguMjAyMQ==",
    vat: "Uk80NDQ4NTg4OQ==",
    swift: "QlRSTFJPMjJYWFg=",
    paypal: "REFURXgyLmJpa2VAZ21haWwuY29t"
  };
  dx.Dx2WD = {
    by: "REFURXgyV0QuQklLRSBJTlRFUk5BVElPTkFM",
    invoiceNumber: "I0R4Mg==",
    IBANEUR: "Uk8zMUJUUkxFVVJDUlQwNjE0ODU4NTAx",
    IBANUSD: "Uk8zNUJUUkxVU0RDUlQwNjE0ODU4NTAx",
    IBANRON: "Uk84MUJUUkxST05DUlQwNjE0ODU4NTAx",
    name: "REFURXgyV0QuQklLRSBJTlRFUk5BVElPTkFMIFNSTA==",
    address: "UGx1Z3VsdWkgNjVBLCA4MDUzMDAsIFRlY3VjaSwgR0wsIFJvbWFuaWE=",
    email: "REFURXgyV0QuYmlrZUBnbWFpbC5jb20=",
    reg: "SjE3LzE0MDkvMjAyMQ==",
    vat: "NDQ4MTA5MDQ=",
    swift: "QlRSTFJPMjJYWFg=",
    paypal: "REFURXgyV0QuYmlrZUBnbWFpbC5jb20="
  };
  dx.DxM = {
    by: "REFURXgyIE1PQklMSVRZ",
    invoiceNumber: "I00=",
    IBANEUR: "Uk85NkJUUkxFVVJDUlQwQ0kwNDk3ODAx",
    IBANUSD: "Uk8xMUJUUkxVU0RDUlQwQ0kwNDk3ODAx",
    IBANRON: "Uk81MkJUUkxST05DUlQwQ0kwNDk3ODAx",
    name: "REFURXgyIE1PQklMSVRZIFNSTA==",
    address: "UGx1Z3VsdWkgNjVBLCA4MDUzMDAsIFRlY3VjaSwgR0wsIFJvbWFuaWE=",
    email: "REFURXgyV0QubW9iaWxpdHlAZ21haWwuY29t",
    reg: "SjE3LzE1ODIvMjAyMg==",
    vat: "NDY3MTc4NTM=",
    swift: "QlRSTFJPMjJYWFg=",
    paypal: "REFURXgyV0QubW9iaWxpdHlAZ21haWwuY29t"
  };
  for (var d2 in dx) {
    var dX = dx[d2];
    for (var key in dX) {
      if (dX.hasOwnProperty(key)) {
        dX[key] = atob(dX[key]);
      }
    }
    dX.iban = dX.IBANEUR;
  }
  return dx;
}
initDx();
function generateRevolutQRCode(elem, company, total, orderNumber) {
  const $elem = $(elem);
  function stopLoading() {
    $elem.toggleClass("task-loading", false);
  }
  const Dx = dx[company] || dx["Dx" + company];
  const name = Dx.name;
  const account = Dx.iban;
  $(elem).toggleClass("task-loading", true).html($("<img/>").addClass("qr-code").attr("src", `https://barcode.tec-it.com/barcode.ashx?code=EPCQRCode&multiplebarcodes=false&translate-esc=false&data=BCD%0A002%0A1%0ASCT%0ABTRLRO22XXX%0A${name}%0A${account}%0AEUR${total}%0A%0A${orderNumber} Boost your bike!%0AOrder ${orderNumber}%0APayment+for+${orderNumber}&unit=Fit&dpi=300&imagetype=Png&rotation=0&color=%231f9a2e&bgcolor=%23ffffff&codepage=Default&qunit=Mm&quiet=0&hidehrt=False&eclevel=H`).on("load", stopLoading).on("error", stopLoading));
}
function formatSlugsJSON(json) {
  return json.items.reduce((o, p) => ({
    ...o,
    [p.customSlug || p.autogeneratedSlug]: {
      id: p.id,
      sku: p.sku
    }
  }), {});
}
if (false)
  3 .toString();
/*!ENDKnownCategorySlugs*/
const cats = Object.values(knownCategorySlugs);
window.currentPage = {};
function detectProductVariationId() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
  });
  const variationId = params.variation;
  return variationId;
}
function detectCurrentPage(doNotUpdateCurrentPage) {
  const root = window?.ec?.config?.baseUrl || "/products", pathname = location.pathname, path = pathname?.substring(root.length + 1)?.toLowerCase(), product = knownProductSlugs[path], cart = /^\/(..\/)?products\/cart$/gi.test(location.pathname), htmlPageType = /page-type-(.*?)(?: |$)/gi.exec(D.className)?.[1], knownPages = {
    SEARCHPAGE: "SEARCH"
  }, productBrowserPageType = /.ecwid-productBrowser-(.*)/gi.exec($(".ecwid-productBrowser")[0]?.className)?.[1]?.toUpperCase();
  let category = knownCategorySlugs[path];
  pageType = /^\/(.?.?)\/?$/gi.exec(location.pathname) ? "SITE" : root == pathname || category ? "CATEGORY" : product ? "PRODUCT" : cart ? "CART" : knownPages[productBrowserPageType] || htmlPageType || "";
  if (!pageType) {
    const pa = location.pathname;
    /products\/cart/i.test(pa) && (pageType = "CART");
    /products\/checkout\/address/i.test(pa) && (pageType = "CHECKOUT_ADDRESS");
    /products\/checkout\/delivery/i.test(pa) && (pageType = "CHECKOUT_DELIVERY");
    /products\/checkout\/tax-information/i.test(pa) && (pageType = "CHECKOUT_TAX_INFORMATION");
    /products\/checkout\/payment/i.test(pa) && (pageType = "CHECKOUT_PAYMENT_DETAILS");
    /products\/checkout\/order-confirmation/i.test(pa) && (pageType = "ORDER_CONFIRMATION");
    /products\/account\/resetPassword/i.test(pa) && (pageType = "ACCOUNT");
  }
  if (product) {
    category = knownCategorySlugs[product.defaultCategoryId];
  }
  const variationId = detectProductVariationId();
  const productId = product?.id || $d.attr("product-id");
  window.currentPage = {
    type: pageType,
    productId,
    product: knownProductSlugs[productId] || product,
    //s360[productId]
    sku: product?.sku,
    categoryId: category?.id || product?.defaultCategoryId,
    category,
    parentCategoryId: product?.parentCategoryId || category?.[2],
    variationId,
    detected: true,
    url: location.href,
    timestamp: Date.now()
  };
  if (!doNotUpdateCurrentPage) {
    window.currentPage = currentPage;
  }
  return currentPage;
}
window.Try = Try;
function toggleShow360(show360, has360) {
  $d.toggleClass("jsv-show-photos", !show360).toggleClass("jsv-show-360", !!show360);
  if (has360 != void 0) {
    $d.toggleClass("jsv-has-360", !!has360);
  }
}
window.destroyJSV = function destroyJSV2() {
  if (window.jsv) {
    Try((t) => toggleShow360(false, false));
    Try((t) => $(".jsv-toggle, .jsv-loader").remove());
    Try((t) => jsv.destroy());
    Try((t) => $(".pswp__sku-title").remove());
    Try((t) => $(".details-gallery-index-0").removeClass("details-gallery-index-0"));
    Try((t) => $("#jsv-holder").removeClass("jsv-holder").removeAttr("id"));
    Try((t) => $("#jsv-image").removeAttr("style"));
    jsv = null;
  }
};
onUnload((page2) => arrivePageSelfUnbindCallbacksOnPageUnload.splice(0, arrivePageSelfUnbindCallbacksOnPageUnload.length).forEach((bind) => bind.target.unbindArrive(bind.callback)), true);
var ensureJavascriptViewerCallbacks;
async function ensureJavascriptViewer(callback) {
  if (!window.JavascriptViewer) {
    const { initJSVViewer } = await import("./DATEx2.JSViewer.js");
    await initJSVViewer();
    callback();
  } else
    callback();
}
!(function(s) {
  s.fn.alterClass = function(a, t) {
    if (-1 === (a || "").indexOf("*"))
      return this.removeClass(a), t ? this.addClass(t) : this;
    var e = RegExp("\\s" + a.replace(/\*/g, "[A-Za-z0-9-_]+").split(" ").join("\\s|\\s") + "\\s", "g");
    return this.each(function(a2, t2) {
      for (var i = " " + t2.className + " "; e.test(i); )
        i = i.replace(e, " ");
      t2.className = s.trim(i);
    }), t ? this.addClass(t) : this;
  };
})(jQuery);
function fixWhatsAppTargetBlank() {
  function parseSKU(sku) {
    const matches = /(DATE |𝐃𝐀𝐓𝐄 )([^\s]+)/gi.exec(sku), m = matches && [matches[1] || "", matches[2] || ""].join("") || extractBold(sku) || "", parsed = m && !/(DATE |𝐃𝐀𝐓𝐄 )/gi.test(m) ? "\u{1D403}\u{1D400}\u{1D413}\u{1D404} " + m : m;
    return parsed;
  }
  onDomReady(
    (domElem) => {
      d.arrive(
        ".product-details__product-sku",
        notOnceOnly,
        (elem) => {
          if (!elem.listenTextObserver) {
            elem.listenTextObserver = new MutationObserver(
              (changes, observer) => {
                const elem2 = $(".ec-breadcrumbs");
                changes.forEach(
                  (change) => {
                    const sku2 = parseSKU($(change.target).text());
                    sku2 && sku2 != elem2.attr("data-sku") && elem2.attr("data-sku", sku2);
                  }
                );
              }
            );
          }
          const sku = parseSKU($(elem).text());
          sku && $(".ec-breadcrumbs").attr("data-sku", sku);
          elem.listenTextObserver.observe(elem, {
            characterData: true,
            childList: true
          });
        }
      );
      const widerThanParentObserver = new ResizeObserver(
        (entries) => {
          for (let entry of entries) {
            const parent = $(entry.target), e = parent.find(".ins-header__menu-inner"), burgerMenu = $(".ins-header__icon.ins-header__icon--burger");
            const parentWidth = parent.width() - (burgerMenu.is(":visible") ? 0 : burgerMenu.width());
            const neededWidth = e.width();
            console.log(parentWidth, neededWidth, "menu-overflowing", parentWidth < neededWidth);
            $(".ins-header__row").toggleClass("menu-overflowing", parentWidth < neededWidth);
          }
        }
      );
      d.arrive(
        ".ins-header__menu-wrap",
        notOnceOnly,
        (elem) => {
          $(elem).parent().leave(".ins-header__menu-wrap", (elem2) => {
            widerThanParentObserver.unobserve(elem2);
          });
          widerThanParentObserver.observe(elem);
        }
      );
      d.arrive("header.ins-tile--header .ins-control--pill", notOnceOnly, (link) => $(link).attr("target", "_blank") && link.addEventListener(
        "click",
        (e) => {
          e.stopImmediatePropagation();
        },
        true
      ));
    }
  );
}
fixWhatsAppTargetBlank();
if (!Ecwid.setSignInProvider)
  Ecwid.setSignInProvider = function() {
  };
(function() {
  let s = "https://img.datex2wd.bike/360";
  let jsd = "https://cdn.jsdelivr.net/gh/DATEx2/360@main/";
  let j = "https://cdn.statically.io/gh/DATEx2/360/main/";
  var preferredQuality = "4k";
  var toDo = 0;
  var totalDone = 0;
  function J(p2, quality, options, opt) {
    let folder = options?.folder;
    if (typeof options === "string") {
      folder = options;
      options = opt;
    }
    let url = options?.url;
    folder = folder?.split(":")[0] || "";
    totalDone += quality ? 1 : 0;
    toDo++;
    if (!p2 || !quality)
      return;
    var resolutions = {};
    var aliases = p2.split(" ");
    return aliases.map(
      (alias, index) => {
        if (index)
          return null;
        var a = alias.split(":");
        let kp = knownProductSlugs[a[0]] || knownProductSlugs[a[1]] || knownProductSlugs[a[0].replace(/^DATE-/, "")] || knownProductSlugs["DATE-" + a[0]];
        const slug = kp?.slug;
        const id = a[1] || kp?.id || a[0];
        const variation = a[2];
        var p3 = aliases[0]?.split(":")[0];
        quality.split(" ").forEach(
          (resolution2) => {
            let res = resolution2.split(".");
            let k2 = res[0], frames2 = res[1], cssFiles2 = res[2];
            if (k2 in resolutions) {
              resolutions[k2 + "." + frames2] = {
                k: k2,
                frames: frames2,
                cssFiles: cssFiles2
              };
            } else {
              resolutions[k2] = {
                k: k2,
                frames: frames2,
                cssFiles: cssFiles2
              };
            }
          }
        );
        let resolution = resolutions[preferredQuality] || resolutions["3k"] || resolutions[0];
        if (!resolution) {
          return;
        }
        let k = resolution.k;
        let frames = resolution.frames;
        let cssFiles = resolution.cssFiles;
        let css = (cssFiles > 1 ? Array(parseInt(cssFiles)).fill(0).map((v, i) => `${url || jsd}${options?.cssFolder || folder || p3}/${options?.css || folder || p3}.${frames}.${k}.${i + 1}.css`) : [`${url || jsd}${options?.css || folder || p3}/${options?.css || folder || p3}.${frames}.${k}.css`]).map((css2) => css2.replace(/[+]/g, "-"));
        let className = [.../* @__PURE__ */ new Set([...options?.className?.split(" "), "p-" + folder, aliases.map((cls) => "p-" + cls?.split(":")[0])])].filter(Boolean).join(" ").replace(/[+]/gi, "-");
        if (kp) {
          kp.variation = variation;
          kp.frames = frames;
          kp.name = a[0];
          kp.slug = kp.slug || slug;
          kp.css.push(...css);
          kp.className = className;
        } else {
          kp = {
            id,
            name: a[0],
            slug,
            variation,
            frames,
            url: " ",
            // "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" || `${url || jsd}${folder || p}/${frames}/${k}/${folder || p}.${frames}.${k}.001.webp`, format: `${p}.${frames}.${k}.001.webp`,
            css,
            css360: options,
            className
          };
        }
        if (options?.p) {
          kp.preload = options.p?.replace(/\$g/gi, "https://cdn.jsdelivr.net/gh/DATEx2");
        }
        if (options?.t || options?.thumbs) {
          kp.thumbs = (options.t || options.thumbs || []).map((file) => /\.css$/i.test(file) ? file : `${file}.css`);
        }
        return kp;
      }
    );
  }
  const Products = {
    AIRFx3Gold: {
      id: 544088790,
      sku: "AIRFx3-GOLD:544088790"
    },
    AIRFx3Black: {
      id: 544404458,
      sku: "AIRFx3-BLACK:544404458"
    },
    BMx1MVP: {
      id: 533586175,
      sku: "BMx1-MVP"
    },
    BMx1SUNDAY: {
      id: 539662868,
      sku: "BMx1-SUNDAY:539662868:380783009"
    },
    BMx1UNITED: {
      id: 539664626,
      sku: "BMx1-UNITED:624363333:380782551"
    },
    BMx1CROSSHAIR: {
      id: 539713821,
      sku: "BMx1-CROSSHAIR:539713821:380751227"
    }
  };
  for (var p in Products)
    if (Products.hasOwnProperty(p)) {
      Products[p].SKU = bold("DATE " + Products[p].sku?.split(":")?.[0]);
    }
  var fastLoadedCss = {};
  function injectFastLoadingCss(page2) {
    return fastLoadedCss[page2.type] || (fastLoadedCss[page2.type] = new Promise(
      (resolve) => {
        switch (page2.type) {
          case "PRODUCT":
            let p2 = page2.product;
            const targetId = p2?.id || page2.productId;
            let dbEntry = knownProductSlugs[targetId];
            if (dbEntry) {
              if (p2 && p2.preload) {
                injectCss(p2.preload, (css) => {
                  $b.toggleClass("product-css-loaded", true);
                  resolve(css);
                });
              }
              const rawCss = dbEntry.css || [];
              const cssList = rawCss && rawCss.length > 0 ? rawCss?.map((css) => /jsdelivr/i.test(css) ? css : (/^\.?\/?thumbs/i.test(css) && (css = css.replace(/\.?\/?thumbs/i, "thumbs")) ? "" : "") + css.replace(/\.css/g, isDev ? ".css" : ".min.css").replace(/\.min\.min\.css/g, isDev ? ".css" : ".min.css")) : ["Thumbs/DATEx2.Thumbnails.css"];
              dbEntry.css = "";
              injectCss(cssList.map((t) => {
                if (t.startsWith("http") || t.startsWith("//")) return t;
                return `https://${isDev ? location.hostname : "img.datex2.bike"}/website/dist/css/${t}`;
              }), (css) => {
                $b.toggleClass("thumbs-loaded", true);
                resolve(css);
              });
            }
            break;
          default:
            resolve();
        }
      }
    ));
  }
  function injectAdditionalCSSWhenNeeded(page2) {
  }
  var interactingVideoTimeout, videoInteractive;
  function interactWithVideoButtons(interactive) {
    $(".has-video-buttons").toggleClass("show-video-buttons", true);
    videoInteractive |= interactive;
    clearTimeout(interactingVideoTimeout);
    $d.toggleClass("interacting-video", true).toggleClass("interactive-video", !!videoInteractive);
    interactingVideoTimeout = setTimeout((t) => $d.toggleClass("interacting-video", false), 3e3);
  }
  function initializeVideo(elem) {
    elem = $(elem);
    window.muted = true;
    var videos = ["888327569?", "888291558?", "891246844?h=391d297fb8", "888460156?h=b9044cb3dc", "888459704?h=c5387031da", "888458762?h=edbab347e0", "888520349?h=1bddf57eb5"];
    var videoIndexes = videos.map((v2, i) => i).shuffle();
    var videoIndex = 0;
    function startPlaying() {
      player.off("timeupdate", startPlaying);
      $d.toggleClass("video-auto-hide", false);
      $("html").toggleClass("play-video playing-video", true);
      $(".video-play-pause").toggleClass("paused", false).toggleClass("playing", true);
      interactWithVideoButtons(false);
      logDuration("[Player - PLAYING]")();
    }
    function onVideoLoaded() {
      player.on("timeupdate", startPlaying);
    }
    window.onVideoLoaded = onVideoLoaded;
    var videoLink = (
      //id => "https://img.datex2wd.bike/website/vimeo.html"
      (id) => `https://player.vimeo.com/video/${id != void 0 ? id : videos[videoIndexes[videoIndex]]}&unmute_button=0&loop=0&autoplay=1&dnt=1&transparent=1&speed=0&vimeo_logo=0&muted=${muted ? 1 : 0}&colors=197b5000,42963500,FFFFFF00,00000000&portrait=0&pip=0&play_button_position=center&byline=0&controls=1&dnt=1&badge=0&#t=1s`
    );
    var iframeLoaded = false;
    function onIframeElementLoaded() {
      logDuration("Player - iframe loaded")();
      iframeLoaded = true;
      if (player == null) {
        createPlayer();
      }
    }
    function createIframe() {
      logDuration("Player - creating iframe")();
      $d.toggleClass("video-auto-hide", true);
      const iframe = elem.find("iframe");
      if (iframe.length) {
        onIframeElementLoaded();
      } else {
        const src = videoLink(), videoBackground = $(`<div class="vimeo video-background">
  <iframe id="main-video" frameborder="0" src="${src}" color="#60DC4D" background="true" allow="autoplay" allowfullscreen disablePictureInPicture width="100%" height="100%"></iframe>
</div>`).prependTo(elem).find("iframe").on("load", onIframeElementLoaded)[0].watching = src;
      }
    }
    window.player = null;
    function toggleVideoFullScreen() {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else
        $("#tile-cover-HaXq6F .ins-tile__wrap")[0].requestFullscreen({
          navigationUI: "hide"
        });
    }
    window.onPlayerReady = function onPlayerReady2(event) {
      if ($("#tile-cover-HaXq6F .ins-tile__buttons").find(".video-button").length) {
        return false;
      }
      var moveTimeout;
      function onMouseMoveActivateButtons() {
        clearTimeout(moveTimeout);
        if (!$d.hasClass("show-buttons")) {
          $d.toggleClass("show-buttons", true).toggleClass("hide-buttons", false);
        }
        moveTimeout = setTimeout((t) => $d.toggleClass("show-buttons", false).toggleClass("hide-buttons", true), 4e3);
      }
      d.arrive("iframe#main-video, #tile-cover-HaXq6F .video-container", notOnceOnly, (e) => ["mousemove", "touchmove", "touchstart"].forEach((event2) => e.addEventListener(event2, onMouseMoveActivateButtons, true)));
      onMouseMoveActivateButtons();
      d.arrive(
        "#tile-cover-HaXq6F .ins-tile__buttons",
        notOnceOnly,
        (elem2) => {
          elem2.removeChild = function() {
          };
          $(svgIcons.prevVideo()).appendTo(elem2).find(".prev-video").on("click", prevVideoClick.bind(player, false, true));
          $(svgIcons.playVideo()).appendTo(elem2).find(".play-video").on("click", togglePlayPause);
          $(svgIcons.pauseVideo()).appendTo(elem2).find(".pause-video").on("click", togglePlayPause);
          $(svgIcons.nextVideo()).appendTo(elem2).find(".next-video").on("click", nextVideoClick.bind(player, false, true));
          $(svgIcons.toggleVideoFullScreen()).appendTo($(".ins-tile__buttons:first")).find(".toggle-video-full-screen").on("click", toggleVideoFullScreen);
          $(svgIcons.unmuteVideo()).appendTo(elem2).find(".unmute-video").on("click", function() {
            muted = !muted;
            player.setMuted(muted);
          });
          $(elem2).attr("data-allow-mismatch", 1).toggleClass("has-video-buttons", true);
          return true;
        }
      );
    };
    function onSeeked(t) {
      if (t?.seconds > 1) {
        showButtons(true);
      }
    }
    function onSeekedStartPlaying(t) {
      player.off("seeked", onSeekedStartPlaying);
      startPlaying();
    }
    function detectUnumte(progress) {
      player.getMuted().then(
        (m) => {
          if (!m) {
            showButtons(true);
          }
        }
      );
    }
    function togglePausedButton(paused) {
      $d.toggleClass("playing-video", !paused) && $d.toggleClass("paused-video", paused) && $(".video-play-pause").toggleClass("paused", paused).toggleClass("playing", !paused);
    }
    function showButtons(unmute) {
      function playerUnmuted() {
        muted = false;
        player.setMuted(muted).then((t) => onVolumeChanged({
          volume: 1
        }));
        player.off("seeked", onSeeked);
        player.off("pause", showButtons);
        player.off("timeupdate", detectUnumte);
        setTimeout(
          (t) => {
            interactWithVideoButtons(!muted);
          },
          10
        );
      }
      player.getPaused().then(togglePausedButton);
      if (unmute) {
        playerUnmuted();
      } else
        player.getPaused().then((paused) => paused && player.setVolume(v % 2 == 0 ? 0.99 : 1).then(
          (volume) => {
            playerUnmuted();
          }
        ).catch((r) => r)).catch((r) => r);
    }
    function onVolumeChanged(t) {
      player.getMuted().then(
        (m) => {
          ((muted = !!m || t.volume == 0) || 1) && (!muted ? $("#tile-cover-HaXq6F .has-video-buttons").toggleClass("show-volume-button", true) || 1 : 1) && $(".unmute-video").toggleClass("muted", muted).toggleClass("unmuted", !muted);
          if (!videoInteractive && !muted) {
            showButtons(true);
          }
          interactWithVideoButtons(!muted);
        }
      );
    }
    var loops = 0;
    var maxLoops = 2;
    function nextVideoClick(checkMaxLoops, resetMaxLoops) {
      if (resetMaxLoops == true) {
        loops = 0;
      }
      videoIndex++;
      if (videoIndex >= videos.length) {
        if (++loops > maxLoops) {
          return;
        }
        videoIndex = 0;
      }
      const src = videoLink();
      player.element.watching = src;
      player.loadVideo(src);
    }
    function prevVideoClick(checkMaxLoops, resetMaxLoops) {
      if (resetMaxLoops) {
        loops = 0;
      }
      videoIndex--;
      if (videoIndex < 0) {
        if (++loops > maxLoops) {
          return;
        }
        videoIndex = videos.length - 1;
      }
      const src = videoLink(videos[videoIndexes[videoIndex]]);
      player.element.watching = src;
      player.loadVideo(src);
    }
    async function togglePlayPause() {
      await player.getPaused().then((paused) => paused ? player.play() : player.pause());
    }
    var v = 1;
    function createPlayer() {
      let video = d.getElementById("main-video");
      if (!video || player)
        return;
      if (!window.Vimeo) {
        return setTimeout(createPlayer, 20);
      }
      player = new Vimeo.Player(video, {
        color: "#60DC4D",
        colors: ["197b50", "60DC4D", "FFFFFF", "008b4e"]
      });
      logDuration("Player created")();
      Try((n) => navigator.mediaSession.setActionHandler("nexttrack", nextVideoClick.bind(player, false, true)));
      Try((n) => navigator.mediaSession.setActionHandler("previoustrack", prevVideoClick.bind(player, false, true)));
      player.on("volumechange", onVolumeChanged);
      player.on("seeked", onSeeked);
      player.on("seeked", onSeekedStartPlaying);
      player.on("timeupdate", detectUnumte);
      player.on("timeupdate", (t) => player.element?.watching == player.element?.src && (t.duration - t.seconds < 2 ? nextVideoClick() : 0));
      player.on("pause", showButtons);
      player.on("ended", nextVideoClick.bind(player, true));
      function onProgress(p2) {
        logDuration("progress", p2)();
        player.off("progress", onProgress);
        onVideoLoaded();
      }
      player.on("progress", onProgress);
      player.on("pause", (p2) => togglePausedButton(true));
      player.on("play", (p2) => togglePausedButton(false));
      onPlayerReady(player);
    }
    if (!iframeLoaded) {
      createIframe();
      createPlayer();
    }
  }
  knownProductSlugs.products.forEach((p2) => {
    p2.css360?.res && J(`${p2.id}:${p2.css360?.folder || p2.slug}${p2.css360?.aliases ? " " : ""}${p2.css360?.aliases ? p2.aliases : ""}`, p2.css360.res, p2.css360);
  });
  detectCurrentPage();
  load360(currentPage, currentPage.product, (p360) => p360);
  if (currentPage.type == "SITE") {
    injectVideoOnHomePage(currentPage);
  }
  console.warn(`Done: ${Math.round(totalDone * 100 / toDo)}% ${totalDone} out of ${toDo}`);
  function getMeaningfulCssClass(s2) {
    s2 = decodeUnicode(s2).replace(/_/g, "+");
    var parts = s2.split("-");
    const u = unbold(s2);
    var cssClass = !s2 || /*parts.length < 2 ||*/
    u == s2 ? u : parts.map(
      (k, i) => {
        if (k === "") return "";
        const u2 = unbold(k);
        if (u2 !== k)
          return u2;
        else
          return null;
      }
    ).filter((s3) => s3 || s3 === "").join("-");
    cssClass = cssClass?.toUpperCase()?.replace(/X(\d+)/g, "x$1")?.replace(/002C/, "");
    return cssClass;
  }
  window.decodeUnicode = decodeUnicode;
  window.getMeaningfulCssClass = getMeaningfulCssClass;
  const poCM = `BMX-Stem-Raiser:XXL
      Mounting-plate:XXL
    //Logo:XS
    //Air-Fork:S
    //Battery:XL
    //Crank:L
    //Crankset:XL
    //Display:XL
    //Double-Crown-Fork:S
    //Fenders:XL 
    //Frame-Logo:XS
    //Frame:XS
    //Grips-0026-Saddle:XL
    Handlebars:S
    //Inner-tubes:XXL
    //Lights-0026-Horn:XL
    //Mirrors:XL
    //Rack-0026-2nd-Battery:XXL
    //Rim-Tape-Color:S
    //Rim-tape:M
    Seatpost:L
    Saddle:XL
    //Tire-model:M
    //Tire-tools:L
    //Tires:XXL
    //Wheels:XL
    //X-TEMSx1-for-BMX:S
    //X-TEMSx1-Loader:S`.split(/[ \r\n]/).filter((m) => !m.startsWith("//")).map((m) => m.split(":")).reduce((o, p2) => ({
    ...o,
    [p2[0].toLowerCase()]: p2[1]
  }), {});
  function UpdateSelectedOptionCssClasses(groupOptions, removeAllPreviousOptions) {
    if (removeAllPreviousOptions) {
      $d.alterClass("o-*");
      let p2 = getProductCodeFromCurrentUrl();
      let size = p2?.name?.match && p2.name.match(/^(S|M|L|XL|XXL)$/);
      size = size && size[1];
      $(".option-surcharge__value").forEach((o) => (o = $(o)) && o.text(o.text().replace(",00 ", " ").replace(".00 ", " ")));
      let go = $(".product-details-module.details-product-option");
      go.each(
        (i, e) => {
          let optGroup = $(e);
          let content = optGroup.find(".product-details-module__content");
          if (size) {
            let optGroupCls2 = optGroup.attr("class") || "";
            let optGroups2 = optGroupCls2.match(/(?<=details-product-option--)(?!size\b)\w+(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?/gi);
            let group2 = decodeUnicode(optGroups2[0]);
            group2 = group2.replace("XS", size);
            let t = optGroup.find(".details-product-option__title")[0].childNodes;
            t = t[t.length - 1];
            t = $(t).wrap("<span class='title'/>").parent();
            const cls = optGroup.attr("class").replace(/XS/g, size);
            optGroup.attr("class", cls);
            t.text(t.text().replace("XS", size));
          }
          let optGroupCls = optGroup.attr("class") || "";
          let optGroups = optGroupCls.match(/(?<=details-product-option--)(?!size\b)\w+(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?/gi);
          let group = decodeUnicode(optGroups[0]);
          if (group != optGroups[0]) {
            optGroupCls += " details-product-option--" + unbold(group);
            optGroup.attr("class", optGroupCls);
            var optGroupTitle = optGroup.find(".product-details-module__title");
            optGroupTitle[0].lastChild.nodeValue = unbold(optGroupTitle[0].lastChild.nodeValue);
          }
          var groupLC = group.toLowerCase();
          let optionsCount = optGroup.find(".product-details-module__content > *").length;
          let val = groupLC in poCM ? optionsCount + "" + poCM[groupLC].replace(/[0-9]/g, "") : "";
          if (!val) {
            var labels = content.find("label");
            var maxLabelLength = 0;
            labels.forEach(
              (l2, i2) => {
                const n = $(l2.childNodes[0]);
                let t, s2, w2;
                t = n;
                if (size) {
                  const l3 = Array.from(t.text())[0];
                  switch (size) {
                    case "S":
                      s2 = 14;
                      w2 = 9;
                      break;
                    case "M":
                      s2 = 18;
                      w2 = 13;
                      break;
                    case "L":
                      s2 = 26;
                      w2 = 17;
                      break;
                    case "XL":
                      s2 = 30;
                      w2 = 17;
                      break;
                    case "XXL":
                      s2 = 33;
                      w2 = 22;
                      break;
                  }
                  if (s2) {
                    let text = Array(w2 + 1).join(l3);
                    t.text(text);
                  }
                }
                maxLabelLength = Math.max(maxLabelLength, s2 || (i2 == 0 ? 0 : Array.from(t.text()).length));
              }
            );
            var l = "M", wbr;
            switch (true) {
              case maxLabelLength < 15:
                l = "XS";
                break;
              case maxLabelLength < 20:
                l = "S";
                break;
              case maxLabelLength < 28:
                l = "M";
                break;
              case maxLabelLength < 33:
                l = "L";
                wbr = true;
                break;
              case maxLabelLength < 38:
                l = "XL";
                wbr = true;
                break;
              default:
                l = "XXL";
                wbr = true;
                break;
            }
            val = optionsCount + l;
          }
          content.toggleClass("po", true);
          if (val) {
            optGroup.alterClass("go-*", "go-" + val);
            content.alterClass("po-*", "po-" + val);
          }
          if (wbr) {
            const checkboxes2 = content.find(".form-control--checkbox-button .form-control__inline-label");
            checkboxes2.each(
              (i2, label) => {
                label = $(label);
                const htmlLabel = label.html(), newLabel = htmlLabel.replace(/([𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗])(?!.*[𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗])/gu, "$1<br/>");
                label.html(newLabel);
              }
            );
          }
          let checkboxes = optGroup.find(".form-control--checkbox-button.form-control");
          checkboxes.each(
            (i2, e2) => {
              var $e = $(e2);
              var cls = ($e.attr("class") || "").split(" ").map(
                (cls2) => {
                  if (/details-product-option--.*/gi.test(cls2)) {
                    let subString = cls2.substring("details-product-option--".length);
                    let option = getMeaningfulCssClass(subString);
                    let bg = unbold(extractBold(group));
                    let g = unbold(group);
                    g = (/X-TEMSx1-for-BMX/i.test(g) ? g : /X-TEMSx1-for-BMX-loader-clamp/i.test(g) ? "X-TEMSx1-LOADER" : bg || g)?.toUpperCase()?.replace(/X(\d+)/g, "x$1");
                    if (/ 𝐕𝐄𝐄𝐱/.test(p2?.product?.sku) && /Tire-Model/i.test(g)) {
                      const color = p2.product.sku.replace(
                        /.*(-𝐑𝐄𝐃|-𝐁𝐋𝐀𝐂𝐊|-𝐆𝐎𝐋𝐃|-𝐆𝐑𝐄𝐄𝐍|$)$/i,
                        (m, color2) => {
                          color2 = unbold(color2);
                          return color2;
                        }
                      );
                      option = `${option}${color}`;
                    }
                    return `og-${g} o o-${g}-${option} o-${option} ${cls2}`;
                  } else
                    return cls2;
                }
              ).filter(Boolean).join(" ");
              $(e2).attr("class", cls);
            }
          );
        }
      );
      if (go.length) {
        logDuration("Font-measure", "Font measured & options wrapped " + go.length)();
      }
    }
    var $t = $(groupOptions);
    $t.each(
      (i, e) => {
        e = $(e);
        var selectedOptionElement = e.parents(".form-control--checkbox-button");
        var selectedOptions = (selectedOptionElement.attr("class") || "").match(/(?<=details-product-option--)(?!size\b)\w+(?:-\w+)*/gi);
        var optGroup = e.parents(".product-details-module.details-product-option");
        var optGroups = (optGroup.attr("class") || "").match(/(?<=details-product-option--)(?!size\b)\w+(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?(-\w+)?/gi);
        var additionals = [];
        var removals = optGroups && optGroups.map(
          (c) => {
            c = c.toUpperCase();
            var cls = selectedOptions && selectedOptions.map(
              (s2) => {
                var x = getMeaningfulCssClass(s2)?.toUpperCase();
                x = unbold(decodeUnicode(`so-${c}-${x}`));
                return x;
              }
            ).join(" ");
            if (cls)
              additionals.push(cls);
            return decodeUnicode(`so-${unbold(c)?.toUpperCase()}*`);
          }
        ).join(" ");
        additionals = [...new Set(additionals.join(" ").split(" "))];
        $d.alterClass(removals, additionals);
      }
    );
  }
  window.UpdateSelectedOptionCssClasses = UpdateSelectedOptionCssClasses;
  function extractLangFromCurrentPageUrl() {
    const lang = /(\/.?.?)?\/products/gi.exec(location.pathname)?.[1] || "";
    return lang;
  }
  function injectProductOptionsTapChange() {
    $(document).on(
      "click",
      ".product-details__product-options .form-control--checkbox-button",
      (e) => {
        var elem = $(e.target);
        if (!elem.hasClass("form-control--checkbox-button")) {
          elem = $(elem.parents(".form-control--checkbox-button")[0]);
        }
        const dataLinkedProduct = elem.attr("data-linked-product");
        const product = knownProductSlugs[dataLinkedProduct];
        const lp = elementsMetadata.get(elem[0]);
        if (e.ctrlKey) {
          if (lp || product) {
            e.preventDefault();
            e.stopPropagation();
            const url = `https://${location.hostname}/products/${product?.slug || lp?.id}`;
            window.open(url, "_blank");
            return;
          }
        }
        const input = elem.find("input"), selectedText = $(elem.find("label")[0]?.childNodes[0]).text();
        let og = "", shouldReplaceState = false;
        fixProductWeight();
        switch (true) {
          case ($d.is(".p-X-TEMSx1-LOADER") && elem.is(".o-FOLDABLE-BMX-STEM-X-TEMSx1-FOLDx1")): {
            const cs = D.className.split(" ");
            og = cs.find((c) => /^p-.*/gi.test(c));
            og = og.replace(/-LOADER/, "").replace(/^p-/, "");
            break;
          }
          case ($d.is(".p-X-TEMSx1-SET") && elem.is(".o-FOLDABLE-BMX-STEM-NOT-INCLUDED")): {
            const cs = D.className.split(" ");
            og = cs.find((c) => /^p-.*/gi.test(c));
            og = og.replace(/X-TEMSx1-/, "X-TEMSx1-LOADER-").replace(/^p-/, "");
            break;
          }
          case ($d.is(".p-X-TEMSx1-SET") && elem.is(".o-X-TEMSx1-FOR-BMX-LOADER-CLAMP-NOT-INCLUDED")):
          case ($d.is(".p-X-TEMSx1-SET") && elem.is(".o-X-TEMSx1-FOR-BMX-NOT-INCLUDED")): {
            og = "X-TEMSx1-FOLDx1";
            break;
          }
          case ($d.is(".p-X-TEMSx1-SET") && elem.is(".o-X-TEMSx1-for-BMX-loader-clamp")): {
            const cs = D.className.split(" ");
            og = cs.find((c) => /^p-.*/gi.test(c));
            og = og.replace(/TEMSx1/, "TEMSx1-LOADER").replace(/^p-/, "");
            break;
          }
          case (($d.is(".p-X-TEMSx1-SET") || $d.is(".p-X-TEMSx1-FOLDx1")) && elem.is(".og-X-TEMSx1")): {
            const cs = elem[0].className.split(" ");
            og = cs.find((c) => /^o-X-TEMSx1-.*/gi.test(c));
            og = og.replace(/-LOADER/, "").replace(/^o-/, "").replace(/Not-included/i, "FOLDx1");
            break;
          }
          case (($d.is(".p-X-TEMSx1-FOLDx1") || $d.is(".p-X-TEMSx1-SET")) && elem.is(".og-X-TEMSx1-FOR-BMX-LOADER-CLAMP")): {
            const cs = elem[0].className.split(" ");
            og = cs.find((c) => /^o-X-TEMSx1-FOR-BMX-LOADER-CLAMP.*/gi.test(c));
            og = og.replace(/-FOR-BMX-LOADER-CLAMP/, "").replace(/^o-/, "").replace(/Not-included/i, "FOLDx1");
            break;
          }
          case ($d.is(".p-X-TEMSx1-FOLDx1") && elem.is(".og-X-TEMSx1")): {
            const cs = elem[0].className.split(" ");
            og = cs.find((c) => /^o-X-TEMSx1-.*/gi.test(c));
            og = og.replace(/-LOADER/, "").replace(/^o-/, "").replace(/Not-included/i, "FOLDx1");
            break;
          }
          case $d.is(".p-HERO"):
            og = null;
            shouldReplaceState = knownProductSlugs[currentPage.productId];
            break;
          case (elem.is(".og-TIRE-MODEL, .og-RIM-TAPE") && $d.is(".p-VEEx1F, .p-VEEx2F, .p-VEEx3F, .p-VEEx4F")):
            const isTireModel = elem.parents(".details-product-option--Tire-Model").length, isRimTape = elem.parents(".details-product-option--Rim-Tape").length, tire = $(isTireModel ? input : ".details-product-option--Tire-Model input:checked").parent().attr("class")?.replace(/.*(o-TIRE-MODEL-(.*?)) .*/gi, "$2") || "", rimTape = $(isRimTape ? input : ".details-product-option--Rim-Tape input:checked").parent().attr("class")?.replace(/.*(o-RIM-TAPE-(.*?)) .*/gi, "$2")?.replace(/NOT-INCLUDED/gi, "") || "";
            if (isTireModel || isRimTape) {
              og = `${tire.replace(/(VEEx\d)-/, "$1F-")}${rimTape ? "-" : ""}${rimTape}`;
            }
            break;
          case (elem.is(".og-CRANKSET-COLOR, .og-CHAIN, .og-CRANK-REMOVER-TOOL") && $d.hasClass("p-CHx63T")):
            {
              const clickedOptionInput = elem.find("input");
              const clickedOptionInputValue = unbold(clickedOptionInput.val());
              var clickedOG = elem.parents(".details-product-option")[0];
              var elements = [];
              $(".product-details__product-options .form-control__radio:checked").each((i, e2) => elements.push($(e2).closest(".o")[0]));
              const productIds = elements.map(
                (e2) => {
                  e2 = $(e2);
                  var pid2 = $(e2.closest(".details-product-option")[0] == clickedOG ? elem : e2).attr("data-linked-product");
                  return pid2;
                }
              );
              const slugs = productIds.map((pid2) => unbold(knownProductSlugs[pid2]?.[1])?.replace(/^DATE /gi, ""))?.filter((p3) => p3) || [];
              const sku = slugs.join("+");
              const product2 = knownProductSlugs[sku];
              const variantId = product2?.variation;
              const pid = product2?.id;
              og = variantId || pid || sku;
            }
            break;
          case (elem.is(".og-REFLECTIVE-FRAME-LOGO-COLOR") && $d.is(".p-FRAMEx1-BLACK-GOLD, .p-FRAMEx1-BLACK-RED, .p-FRAMEx1-BLACK-YELLOW, .p-FRAMEx1-BLACK-BLUE, .p-FRAMEx1-BLACK-GREEN, .p-FRAMEx1-BLACK-TITANIUM, .p-FRAMEx1-BLACK-WHITE, .p-FRAMEx1-BLACK, .p-FRAMEx1-BLACK-BLACK")):
            og = "FRAMEx1-BLACK:613413933" + unbold(selectedText);
            break;
          case !!dataLinkedProduct:
            const parent = elem.parent(), hasSelf = parent.find(`[data-linked-product=${currentPage.productId}]`).length, isTire = /𝐕𝐄𝐄𝐱/.test(currentPage.sku), isUnitType = isTire && elem.is(".og-UNIT-TYPE");
            if (hasSelf && !isUnitType) {
              og = dataLinkedProduct;
            } else {
              shouldReplaceState = knownProductSlugs[currentPage.productId];
            }
            break;
          default:
            shouldReplaceState = getProductCodeFromCurrentUrl();
            break;
        }
        let p2 = shouldReplaceState || knownProductSlugs[og];
        if (p2) {
          let options = $(".details-product-option");
          let opts = [];
          const selectedOption = elem.parents(".details-product-option")[0];
          const selectedInput = elem.find("input")[0];
          options.forEach(
            (opt, index) => {
              const selectedOpt = selectedOption == opt;
              opt = $(opt);
              const inputs = opt.find("input[type=radio]");
              const oi = inputs.findIndex((o) => selectedOpt ? o == selectedInput : o.checked);
              !inputs.length ? "" : opts.push(oi < 0 ? 1 : oi + 1);
            }
          );
          const st = parseInt($(window).scrollTop()) || parseInt($b.scrollTop());
          if (shouldReplaceState) {
            history.replaceState({
              id: p2.id
            }, null, `${location.pathname}?options=${opts.join(",")}${st ? "&scroll=" + st : ""}`);
          } else {
            e.preventDefault();
            e.stopImmediatePropagation();
            const body = d.body, html = d;
            const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            $b.css("min-height", height);
            const openPageOptions = {
              id: p2.id,
              options: opts,
              queryString: st ? [["scroll", st]] : null
            };
            if (p2.variation) {
              openPageOptions.variation = p2.variation;
            }
            shouldHideScreenLoading = false;
            $d.toggleClass("screen-loading", true);
            localStorage.setItem("screen-loading", "1");
            stopJSV2();
            setTimeout(
              (t) => {
                const slug = unbold(p2.slug || knownProductSlugs[p2.id]?.slug);
                if (slug) {
                  const lang = extractLangFromCurrentPageUrl();
                  const href = `${lang}/products/${slug}?options=${opts.join(",")}&scroll=${st}`;
                  location.href = href;
                } else
                  Ecwid.openPage("product", openPageOptions);
              },
              10
            );
          }
        }
      }
    );
  }
  function getProductCodeFromCurrentUrl(id, productVariation) {
    let name = null;
    if (!id && !currentPage?.productId) {
      detectCurrentPage();
    }
    id = id || currentPage?.productId;
    productVariation = productVariation || currentPage?.variationId;
    const s360 = knownProductSlugs;
    let p360 = s360[productVariation] || s360[id] || s360[name] || {
      name,
      id,
      variation: productVariation
    };
    if (id != p360?.id) {
      p360 = s360[id] || s360[name] || {
        name,
        id,
        variation: productVariation
      };
    }
    if (p360) {
      p360.name ||= knownProductSlugs[p360.id]?.[3];
    }
    return p360;
  }
  window.getProductCodeFromCurrentUrl = getProductCodeFromCurrentUrl;
  function injectCss(urls) {
    var urlsToLoad = 0;
    var cssLoadedCallbacks = [];
    var done = 0;
    function doneItem() {
      done++;
      if (done == urlsToLoad && cssLoadedCallbacks.length) {
        cssLoadedCallbacks.forEach((c) => Try(c));
      }
    }
    $(arguments).each(
      (i, url) => {
        if (typeof url == "function") {
          cssLoadedCallbacks.push(url);
        } else if (Array.isArray(url)) {
          url.forEach(
            (u) => {
              urlsToLoad++;
              if (!preloadedCss[u]) {
                preloadedCss[u] = 1;
                $("<link />").attr("type", "text/css").attr("rel", "stylesheet").attr("href", u).on("load", doneItem).appendTo(lazyCSS());
              } else
                doneItem(u);
            }
          );
        } else {
          urlsToLoad++;
          if (!preloadedCss[url]) {
            preloadedCss[url] = 1;
            $("<link />").attr("type", "text/css").attr("rel", "stylesheet").attr("href", url).on("load", doneItem).appendTo(lazyCSS());
          } else
            doneItem(url);
        }
      }
    );
  }
  function injectPreloadCss(id, urls, callback) {
    var callbackCalled = 0;
    function onLoadedOneCssFile() {
      if (++callbackCalled >= urls.length) {
        callback && callback();
      }
    }
    $(urls).each(
      (i, url) => {
        if (!preloadedCss[url]) {
          preloadedCss[url] = 1;
          let s2 = d.createElement("link");
          s2.setAttribute("id", `js-CSS-${id?.trim()}${i ? i : ""}`);
          s2.setAttribute("type", "text/css");
          s2.setAttribute("rel", "stylesheet");
          let onCssLoaded = function() {
            if (this.getAttribute("parsed")) {
              return;
            }
            this.setAttribute("parsed", true);
            this.removeEventListener("onload", onCssLoaded);
            setTimeout(onLoadedOneCssFile, 0);
          };
          s2.addEventListener("load", onCssLoaded);
          s2.setAttribute("href", url);
          lazyCSS().appendChild(s2);
        } else
          onLoadedOneCssFile();
      }
    );
  }
  window.shouldHideScreenLoading = window.shouldHideScreenLoading ?? true;
  window.canShowActionBar = window.canShowActionBar ?? true;
  window.showActionBar = showActionBar;
  window.hideActionBar = hideActionBar;
  window.injectProductDetails = injectProductDetails;
  installScrollOverride();
  const sTop = Object.getOwnPropertyDescriptor(Element.prototype, "scrollTop");
  const sIntoView = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function(options) {
    if (!options?.dx2)
      return;
    return sIntoView.apply(this, arguments);
  };
  const sT = {
    get: function() {
      return sTop.get.call(this);
    },
    set: function(value) {
      if (!isScrolling2) {
        sTop.set.call(this, value);
      }
    }
  };
  __defineProperty(Element.prototype, "scrollTop", sT);
  if (currentPage?.type == "SITE") {
    window.addEventListener(
      "scroll",
      (e) => {
        interactWithVideoButtons(false);
      },
      true
    );
  }
  var h1HeaderStuck = null, h1HeaderSticking;
  window.addEventListener(
    "scroll",
    (e) => {
      if (isScrolling2) {
        window.scrollTo(scrollX, scrollY);
        e.stopImmediatePropagation();
        e.preventDefault();
        return;
      }
      const bst = b.scrollTop, dst = D.scrollTop, scroll = bst || dst;
      (bst > 0 || dst > 0) && $b.toggleClass("show-arrow", true);
      let h2 = $header || ($header = d.getElementsByClassName("ins-tile--header")[0]);
      if (bst > 80 || dst > 80) {
        if (b && !b.classList.contains("scrolled"))
          b.classList.add("scrolled");
        if (h2 && !h2.classList.contains("scrolled"))
          h2.classList.add("scrolled");
      } else {
        b.classList.remove("scrolled");
        h2 && h2.classList.remove("scrolled");
      }
      if (scroll <= 1 && $b.hasClass("is-scrolled")) {
        $b.removeClass("is-scrolled");
      } else if (scroll > 1 && !$b.hasClass("is-scrolled")) {
        $b.addClass("is-scrolled");
      }
      if (h1Header?.length) {
        const top = h1Header?.[0]?.getBoundingClientRect()?.top, stuck = top <= 60, sticking = top <= $w.height() / 2;
        if (stuck !== h1HeaderStuck) {
          h1HeaderStuck = stuck;
          h1Header.toggleClass("stuck", stuck);
        }
        if (sticking !== h1HeaderSticking) {
          h1HeaderSticking = sticking;
          h1Header.toggleClass("sticking", sticking);
        }
      }
    },
    true
  );
  function removeMadeWith() {
    initProductAttributeTables();
    $(".ins-tile__made-with").attr("style", "display:none !important;visiblity:hidden;");
  }
  function orderInfoReady(order) {
    var currency = order.currency = "EUR";
    console.info("order", order);
    Ecwid.OnSetProfile.add(
      (customer) => {
        console.info("customer", customer);
        var cart = order.cart;
        var payees = {
          sandbox: {
            dx2: {
              email_address: "DATEx2.bike@gmail.com",
              merchant_id: "5WWPCHNKNJM4S",
              client_id: "AUsGl6cxRIdROHhAFlmM8kiL6P3SLGO52BqaI5_hI3PAHioKQlZmNVp6mVbg6Q91U_JC9J207qV1_NMq"
            },
            "2wd": {
              email_address: "DATEx2WD.bike@gmail.com",
              merchant_id: "28UZPZXCKY4KJ",
              client_id: "ATX4e-fw1RRrif-qfpgt5fqPRW6hkFh9q7Zop7--f56PFG_n9_gWbTt3EsvKMorazOzbvPgvhaHM9AI1"
            },
            dxm: {
              email_address: "DATEx2.mobility@gmail.com",
              merchant_id: "5WWPCHNKNJM4S",
              client_id: "AfSmxkxE4IJ2flQZij_0re7kgqTNFjQXodyAsPN-n2sjLXxHad68r2dzStuJiYWSfgXvWERUJwzivlPm"
            }
          }
        };
        return false;
        var payee = payees.sandbox.dx2;
        console.info("cart", cart);
        var s2 = d.createElement("script");
        s2.setAttribute("defer", "defer");
        s2.setAttribute("src", `https://www.paypal.com/sdk/js?client-id=${payee.client_id}&components=buttons&intent=capture&currency=${currency}`);
        var e = 0;
        s2.onload = () => {
          var po = buildPurchaseOrder(order, customer, cart, payee);
          Ecwid.OnPageLoaded.add(
            (page2) => {
              if (e++ > 0)
                return;
              console.info("PayPalOrder", po, $(".ec-cart-next__step--payment")[0]);
              paypal.Buttons(po).render(".ec-cart-next__step--payment");
            }
          );
        };
        lazyCSS().appendChild(s2);
      }
    );
  }
  function buildPurchaseOrder(order, customer, cart, payee) {
    var currency = order.currency;
    var orderId = "1234";
    var a = cart.shippingPerson;
    var sa = (ua) => {
      ua = ua || {};
      ua.address_line_1 = a.street;
      ua.address_line_2 = "";
      ua.admin_area_1 = a.city;
      ua.admin_area_2 = a.city;
      ua.postal_code = a.postal_code;
      ua.country_code = a.countryCode;
      return ua;
    };
    var po = {
      style: {
        layout: "vertical",
        color: "blue",
        shape: "rect",
        label: "paypal"
      },
      currency_code: currency,
      //payer: {
      //    //payer_id: customer.id~,
      //    email_address: customer.email_address,
      //    address: sa(),
      //    name: { full_name: a.name },
      //    //phone: { number: a.phone, type: "MOBILE" },
      //},
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: order.total,
          breakdown: {
            discount: {
              currency_code: currency,
              value: order.discount
            },
            handling: {
              currency_code: currency,
              value: order.handlingFee || 0
            },
            insurance: {
              currency_code: currency,
              value: order.insuranceFee || 0
              //paypal fee?
            },
            item_total: {
              currency_code: currency,
              value: order.total
            },
            shipping: {
              currency_code: currency,
              value: order.shipping
            },
            //shipping_discount: {}
            tax_total: {
              currency_code: currency,
              value: order.tax
            }
          }
        },
        custom_id: cart.cartId,
        orderId,
        description: "DATEx2 goodies",
        items: cart.items.map(
          (item) => {
            var p2 = item.product;
            return {
              name: p2.name,
              quantity: item.quantity,
              unit_amount: {
                currency_code: currency,
                value: p2.price
              },
              category: "PHYSICAL_GOODS",
              description: p2.shortDescription,
              sku: p2.sku,
              custom_id: p2.id
              //tax: 0,
            };
          }
        ),
        payee: {
          email_address: payee.email_address
          //merchant_id: payee.merchant_id,
        },
        //payment_instruction: 'INSTANT',
        reference_id: null,
        //The API caller-provided external ID for the purchase unit. Required for multiple purchase units when you must update the order through PATCH. If you omit this value and the order contains only one purchase unit, PayPal sets this value to default.
        shipping: {
          address: sa({
            type: "SHIPPING"
          })
          //PICKUP_IN_PERSON. The payer intends to pick up the items from the payee in person.
        },
        soft_descriptorstring: orderId
      }],
      createOrder: (data, actions) => {
        console.log("PayPal create-order", arguments, this);
        return createPayPalOrder(order, cart, customer, po, data, actions);
      },
      onApprove: (data, actions) => {
        console.log("PayPal onApprove", data, this, arguments);
        return approveEcwidOrderPayment(order, cart, customer, po, data, actions);
      },
      onCancel: (data) => {
        console.log("PayPal onCancel", data, this, arguments);
      },
      onError: (err) => {
        console.log("PayPal onError", err, this, arguments);
      },
      onShippingChange(data, actions) {
        console.log("PayPal onShippingChange", data, this, arguments);
      }
    };
    return po;
  }
  function createPayPalOrder(order, cart, customer, po, dataForPayPal, paypalActions) {
    return paypalActions.order.create({
      payer: po.payer,
      purchase_units: po.purchase_units
    }).then(
      (payPalOrderId) => {
        return payPalOrderId;
      }
    );
  }
  function fetchEcwidOrderViaProxy(method, data, orderIds, email, headers) {
    headers = $.extend({
      Authorization: `Bearer ${EcwidApiKey}`,
      accept: "application/json",
      "content-type": "application/json"
    }, headers);
    const url = `https://dev.datex2.bike/order?store=${storeId}&orderIds=${orderIds || ""}&email=${email || ""}&token=${EcwidApiKey}`;
    return fetch(url, {
      method: method || "GET",
      headers,
      body: data && JSON.stringify(data)
    }).then((r) => console.log(r) || r.json());
  }
  let cachedCartTotalQueue = [null];
  let cachedCartQueue = [null];
  var onApiLoadedExecuted = false;
  Ecwid.OnAPILoaded.add((a) => onApiLoadedExecuted = true);
  function calculateTotalPromise() {
    return new Promise(
      (resolve, reject) => {
        if (cachedCartTotalQueue[0])
          resolve(cachedCartTotalQueue[0]);
        else {
          cachedCartTotalQueue.push({
            resolve,
            reject
          });
          if (cachedCartTotalQueue.length == 2) {
            let poolFetchCart = function() {
              if (!Ecwid?.Cart?.calculateTotal || !onApiLoadedExecuted) {
                setTimeout(poolFetchCart, 50);
                return;
              }
              Ecwid.Cart.calculateTotal(
                (total) => {
                  if (total)
                    cachedCartTotalQueue[0] = total;
                  cachedCartTotalQueue.splice(1, cachedCartTotalQueue.length).forEach((promise) => total ? promise.resolve(total) : promise.reject(total));
                }
              );
            };
            poolFetchCart();
          }
        }
      }
    );
  }
  function calculateCartTotalPromise() {
    return new Promise(
      (resolve, reject) => {
        if (cachedCartQueue[0])
          resolve(cachedCartQueue[0]);
        else {
          cachedCartQueue.push({
            resolve,
            reject
          });
          if (cachedCartQueue.length == 2) {
            let poolFetchCart = function() {
              if (!Ecwid?.Cart?.get || !onApiLoadedExecuted) {
                setTimeout(poolFetchCart, 50);
                return;
              }
              Ecwid.Cart.get(
                (cart) => {
                  if (cart)
                    cachedCartQueue[0] = cart;
                  let sum = 0;
                  cart.items.forEach((p2) => sum += p2.quantity * p2.product.price);
                  cart.total = sum;
                  cachedCartQueue.splice(1, cachedCartQueue.length).forEach((promise) => cart ? promise.resolve(cart) : promise.reject(cart));
                }
              );
            };
            poolFetchCart();
          }
        }
      }
    );
  }
  let fetchProductCache = {};
  window.fetchProduct = function fetchProduct2(method, productId, returnFields, data, headers) {
    const key = [method, productId, returnFields, data, headers].join(":");
    const cachedProduct = fetchProductCache[key] || (fetchProductCache[key] = [null]);
    if (cachedProduct[0])
      return new Promise((resolve, reject) => resolve(cachedProduct[0]));
    return fetchProductCache[key][0] = new Promise(
      (resolve, reject) => {
        cachedProduct.push({
          resolve,
          reject
        });
        if (cachedProduct.length > 2)
          return;
        headers = $.extend({
          Authorization: `Bearer ${EcwidApiKey}`,
          accept: "application/json",
          "content-type": "application/json"
        }, headers);
        fetch(`https://app.ecwid.com/api/v3/${storeId}/products${productId ? "/" : ""}${productId || ""}?token=${EcwidApiKey}&responseFields=${returnFields || "id,sku,options"}`, {
          method: method || "GET",
          headers,
          mode: "cors",
          body: JSON.stringify(data)
        }).then((r) => console.log(r) || r.json()).then(
          (p2) => {
            let pc = fetchProductCache[key];
            pc[0] = p2;
            p2?.options?.forEach((o) => o.choices?.forEach(
              (c) => {
                var cyy = {}, cy = c.textTranslated.cy, ci = parseInt(cy);
                if (cy && cy != " ") {
                  if (ci) {
                    cyy.id = ci;
                  } else if (typeof cy == "string") {
                    try {
                      cy = cy.replace(/'/g, '"');
                      cyy = JSON.parse(cy);
                    } catch {
                    }
                  }
                }
                c.textTranslated.cy = cyy;
              }
            ));
            pc.splice(1, pc.length - 1).forEach((promise) => promise.resolve(p2));
          }
        ).catch(
          (reason) => {
            let pc = fetchProductCache[key];
            pc[0] = null;
            pc.splice(1, pc.length - 1).forEach((promise) => promise.reject(reason));
          }
        );
      }
    );
  };
  function preventDefaultClickAndOpenProductWithOptions(elem, items) {
    "mouseup click".split(" ").forEach(
      (eventType) => {
        elem.addEventListener(eventType, function(e) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }, true);
      }
    );
    "click mousedown".split(" ").forEach((eventType) => elem.addEventListener(eventType, function(e) {
      e.stopPropagation();
      e.stopImmediatePropagation();
      let lang = $d.attr("lang").toLowerCase();
      var elem2 = this;
      var cartItemsElements = $(".ec-cart-item__picture");
      var productIndex = $.inArray(elem2, cartItemsElements);
      if (productIndex < 0) {
        cartItemsElements = $(".ec-cart-item__title");
        productIndex = $.inArray(elem2, cartItemsElements);
      }
      if (productIndex >= 0 && productIndex < items.length) {
        var item = items[productIndex];
        var product = item?.product || item;
        var productOptions = item?.selectedOptions ? item.selectedOptions.map(function(c) {
          return {
            text: c.name,
            priceModifier: c.value
          };
        }).reduce((o, p2) => ({
          ...o,
          [p2.text]: p2.priceModifier
        }), {}) : item?.options;
        fetchProduct("GET", product.productId || product.id, "id,sku,customSlug,price,options(type,name,choices(text,priceModifier,priceModifierType,textTranslated(cy)))").then(
          (p2) => {
            let pOps = p2.options || [];
            const extras = [];
            const options = pOps.map(
              (optGroup) => {
                let key = optGroup.name;
                let value = productOptions[key];
                let index = optGroup.choices ? optGroup.choices.findIndex((c) => c.text == value) : null;
                if (!optGroup.choices) {
                  extras.push(["po--" + key.replace(/ /g, "-"), value]);
                }
                return index == null ? null : index <= 0 ? 1 : index + 1;
              }
            ).filter((o) => o);
            stopJSV2();
            const lang2 = extractLangFromCurrentPageUrl();
            const url = `${lang2}/products/${p2.customSlug}${options.length || extras.length ? "?" : ""}${options.length ? "options=" : ""}${options.join(",")}${options.length && extras.length ? "&" : ""}${extras.join("&")}`;
            location.href = url;
          }
        );
      }
    }));
  }
  function expandProductOptions(elem) {
    if (!elem.expandProductOptions) {
      elem.expandProductOptions = true;
      elem = $(elem);
      elem.click(
        (e) => {
          if (e.offsetY < 100) {
            elem.toggleClass("expanded");
          }
        }
      );
    }
  }
  var lastCartTotalMutationObserver = null;
  onUnload(
    true,
    (p2) => {
      bondAddToCartControls = false;
      if (lastCartTotalMutationObserver != null) {
        lastCartTotalMutationObserver.disconnect();
        lastCartTotalMutationObserver = null;
      }
    }
  );
  onUnloadCompleted(
    true,
    (p2) => {
      bindAddToCartControls(p2?.productId, p2, true);
    }
  );
  var listenOnResizeTimeout = 0;
  var listenOnResizeElems = {};
  var listenOnResize = new ResizeObserver(
    (entries) => {
      clearTimeout(listenOnResizeTimeout);
      listenOnResizeTimeout = setTimeout(setFooterHeight, 50);
    }
  );
  onUnload(
    (u) => {
      $.each(
        listenOnResizeElems,
        (key, elem) => {
          listenOnResize.unobserve(elem);
          delete listenOnResizeElems[elem];
        }
      );
    },
    true
  );
  function onInjectCartImageResize(elem) {
    if (!listenOnResize[elem]) {
      listenOnResize.observe(elem);
      listenOnResizeElems[elem] = elem;
    }
  }
  function injectProductOptionPrices(elem, products, order, cart, priceInfo, uiProductElem, uiProductIndex, lang) {
    const uip = $(uiProductElem), uio = uip.find(".ec-cart-item__options > .ec-cart-item__option"), quantity = uip.find(".ec-cart-item__count--select .form-control__select").val();
    p = products[uiProductIndex];
    uio.each(
      (optionIndex, optionElement) => {
        optionElement = $(optionElement);
        let optionValueElement = optionElement.find(".ec-cart-option--value");
        let optionKeyElement = optionElement.find(".ec-cart-option--key");
        let optionValue = $(optionValueElement[0].firstChild).text();
        let key = $(optionKeyElement[0].firstChild).text()?.replace(/: ?$/, "");
        let option = p.options.find((o) => (o.nameTranslated[lang] || o.nameTranslated["en"]) == key);
        let formattedPrice = "", formattedDiscountedPrice = "";
        if (option?.choices) {
          let translatedChoicesArray = option.choices.map(function(c) {
            return {
              text: c.textTranslated[lang] || c.textTranslated["en"],
              priceModifier: c.textTranslated?.cy?.id == p.id ? p.price : c.priceModifier,
              hasValue: !NotIncluded.test(c.text) && !!c.text,
              lp: c.textTranslated?.cy?.id
            };
          });
          let translatedChoices = translatedChoicesArray.reduce((o, p2) => ({
            ...o,
            [p2.text]: {
              priceModifier: p2.priceModifier,
              lp: p2.lp
            }
          }), {});
          let hasValues = translatedChoicesArray.reduce((o, p2) => ({
            ...o,
            [p2.text]: p2.hasValue
          }), {});
          let priceOption = translatedChoices[optionValue];
          let hasValue = hasValues[optionValue];
          optionElement.toggleClass("has-value", !!hasValue).toggleClass("is-empty", !hasValue);
          const lp = knownProductSlugs[priceOption.lp], wlp = lp?.wholesalePrices?.findLast((lw) => lw.quantity <= quantity), wld = (wlp?.price || 1) / (wlp?.compareToPrice || wlp?.price || 1), priceModifier = priceOption.priceModifier || 0, dop = Math.min(wld, 1 - priceInfo.actualCartBasedDiscountPercent), optionUnitPrice = (
            /*lp?.id == p.id ? 0 : */
            Math.max(wlp?.price || 0, (lp?.compareToPrice || lp?.price || 0) * dop, priceModifier * dop) || priceModifier || 0
          );
          var price = lp?.compareToPrice || lp?.price || priceOption?.priceModifier || 0;
          var oldDiscountedPrice = price - price * priceInfo.discountPercent;
          discountedPrice = optionUnitPrice;
          formattedPrice = discountedPrice > price || price == 0 ? "" : Ecwid.formatCurrency(Math.round(price))?.replace(".00", "")?.replace(",00", "");
          formattedDiscountedPrice = discountedPrice == 0 || price == 0 || isNaN(discountedPrice) || isNaN(price) ? "" : Ecwid.formatCurrency(Math.round(discountedPrice < price ? discountedPrice : price)).replace(".00", "").replace(",00", "");
        }
        if (formattedPrice == formattedDiscountedPrice) {
          formattedPrice = "";
        }
        optionKeyElement.uiNumber(formattedPrice, "ui-number ui-cart-option-msrp", "int", 0, "", "", "", 0, true);
        optionValueElement.toggleClass("loading-price", false).uiNumber(formattedDiscountedPrice, "ui-number ui-cart-option-price", "int", 0, "", "", "", 0, true);
      }
    );
    const hasEmptyValues = uio.filter(".is-empty").length > 0;
    if (hasEmptyValues) {
      d.arrive(".ec-cart-item__options", {
        existing: true
      }, expandProductOptions);
      uio.attr("data-index", (i) => $(uio[i]).is(".has-value") ? i : 1e3 + i);
      uio.sortElements((a, b2) => parseInt($(a).attr("data-index")) < parseInt($(b2).attr("data-index")) ? -1 : 1);
    }
    uip.find(".ec-cart-item__options").toggleClass("expandable", hasEmptyValues);
  }
  function processOrderConfirmationLines(page2, elems) {
    fetchEcwidOrderViaProxy("GET", null, page2.vendorOrderNumber, page2.customer.email).then(
      (o) => {
        var items = o.items, cart, summary = o;
        o && (summary = {
          total: o.total,
          subtotal: o.subtotal,
          discount: -o.discount,
          shipping: o.shipping || o.shippingOption && o.shippingOption.shippingRateWithoutTax,
          tax: o.tax
        });
        elems.each((i, elem) => injectProductOptionPrices(elem, items, o, cart, summary));
      }
    );
  }
  function processCartPagesOrderLines(page2, ecCart__ProductsInner, cart) {
    logDuration("summary", "Fetching cart products")();
    var listenForSummaryPrice = false;
    fetchCartProducts(cart).then(
      (cartProducts) => {
        logDuration("summary", "Fetched cart products")();
        document.arrive(
          ".ec-cart-item__price-inner",
          {
            existing: true
          },
          (elem) => {
            elem = $(elem);
            var subtotal2 = parsePrice($(".ec-cart-summary__cell.ec-cart-summary__price:first()").text());
            var price = parsePrice(elem.text());
            var discountPercent = getDiscountPercent(subtotal2) || 0;
            var discountedPrice2 = price - price * discountPercent;
            var hasDiscount = discountedPrice2 != price;
            elem.toggleClass("ec-cart-item__price-without-discount", true).toggleClass("ec-cart-item__price-with-discount", false);
            elem.toggleClass("has-discount", hasDiscount);
            var withDiscount = elem.parent().find(".ec-cart-item__price-with-discount");
            withDiscount.length ? withDiscount : elem.parent().append(withDiscount = elem.clone().toggleClass("ec-cart-item__price-with-discount", true));
            withDiscount.toggleClass("hidden", !hasDiscount).toggleClass("ec-cart-item__price-inner", false).toggleClass("has-discount", false);
            if (hasDiscount) {
              withDiscount.text(Ecwid.formatCurrency(discountedPrice2));
            }
          }
        );
        bondAddToCartControls = injectButtons(
          currentPage,
          (e) => {
            $d.arrive(
              ".ec-cart__summary",
              onceOnly,
              (elemCartSummary) => {
                recomputeCartSummary(cart);
                $d.arrive(".ec-cart-item__count--select .form-control__select, .ec-cart-item__control-inner", notOnceOnlySelfUnbind, selectCountRegisterChangeEvent);
                setFooterHeight();
                checkoutFooterActionButtonResized(elemCartSummary);
                canShowActionBar = true;
                showFooter();
                showActionBar();
              },
              bondAddToCartControls,
              bindAddToCartControls
            );
          }
        );
        function recomputeCartSummary(cart2, index, qty) {
          if (!cart2) {
            Ecwid.Cart.get(
              (cart3) => {
                fetchCartProducts(cart3, true).then(
                  (cartProducts2) => {
                    recomputeCartSummary(cart3, index, qty);
                  }
                );
              }
            );
            return;
          }
          if (!listenForSummaryPrice) {
            listenForSummaryPrice = new MutationObserver(
              (mutation) => {
                recomputeCartSummary();
              }
            );
            $d.arrive(
              ".ec-cart-summary__total",
              notOnceOnly,
              (elemSummaryPrice) => {
                if (!elemSummaryPrice.observing) {
                  elemSummaryPrice.observing = true;
                  listenForSummaryPrice.observe(elemSummaryPrice, {
                    characterData: true,
                    attributes: false,
                    childList: true,
                    subtree: true
                  });
                }
              }
            );
          }
          const lang = $d.attr("lang").toLowerCase(), uiProducts = ecCart__ProductsInner.find(".ec-cart__item"), priceInfo = {
            total: cart2.total || parsePrice($($(".ec-cart-summary__total:first")[0].childNodes[0]).text() || 0) || 0,
            subtotal: cart2.subtotal || parsePrice($(".ec-cart-summary__row.ec-cart-summary__row--items:first .ec-cart-summary__cell.ec-cart-summary__price:first").text()) || 0,
            discount: cart2.discount || parsePrice($(".ec-cart-summary__row--discount .ec-cart-summary__price:first").text()) || 0,
            shipping: cart2.shipping || parsePrice($(".ec-cart-summary__row--shipping .ec-cart-summary__price:first").text()) || 0,
            tax: cart2.tax || parsePrice($(".ec-cart-summary__row--taxes .ec-cart-summary__price:first").text()) || 0,
            paymentFee: cart2.paymentFee || parsePrice($(".ec-cart-summary__row--surcharge .ec-cart-summary__price:first")) || 0,
            msrp: 0,
            actualCartBasedDiscountPercent: 0
          };
          priceInfo.vatPercent = Math.round(priceInfo.tax / (priceInfo.total - priceInfo.tax || 1) * 100, 2);
          priceInfo.discountPercent = priceInfo ? Math.abs(priceInfo.discount) / Math.abs(priceInfo.subtotal || 1) : getDiscountPercent(subtotal) || 0;
          priceInfo.paymentFeePercent = priceInfo.paymentFee / (priceInfo.total - priceInfo.paymentFee || 1);
          function computeSubTotal(cartDiscountPercent) {
            priceInfo.subtotal = 0;
            priceInfo.msrp = 0;
            cart2.items.forEach(
              (item, i) => {
                const cp = item.p, productId = cp?.id || item.product?.id, quantity = i === index ? qty : parseInt($(`.ec-cart-item__count-inner:nth(${i}) .form-control__select`).val()) || item.quantity;
                priceInfo.msrp += (cp?.compareToPrice || cp.price) * quantity;
                if (!cp) {
                  priceInfo.subtotal += item.product.price;
                } else {
                  const wp = cp.wholesalePrices?.findLast((lw) => lw.quantity <= quantity), wpd = (wp?.price || 0) / (wp?.compareToPrice || 1), dp = Math.min(wpd, 1 - cartDiscountPercent), unitPrice = (wp?.compareToPrice || cp.compareToPrice || cp.price) * dp, lineProductPrice = unitPrice * quantity;
                  priceInfo.subtotal += lineProductPrice;
                  cp?.options?.forEach(
                    (o, i2) => {
                      const c = o?.selectedChoice, cy = c?.textTranslated?.cy, lp = knownProductSlugs[cy?.id], wlp = lp?.wholesalePrices?.findLast((lw) => lw.quantity <= quantity), wld = (wlp?.price || 1) / (wlp?.compareToPrice || wlp?.price || 1), priceModifier = o.selectedChoice?.priceModifier || 0, dop = Math.min(wld, 1 - cartDiscountPercent), optionUnitPrice = cy?.id == cp.id ? 0 : Math.max(wlp?.price || 0, (lp?.compareToPrice || lp?.price || 0) * dop, priceModifier * dop) || priceModifier || 0, lineOptionPrice = optionUnitPrice * quantity, toAddSubTotal = cy?.id == productId ? 0 : lineOptionPrice, toAddMSRP = cy?.id == productId ? 0 : (wlp?.compareToPrice || lp?.compareToPrice || wlp?.price || lp?.price || priceModifier || 0) * quantity;
                      priceInfo.subtotal += toAddSubTotal;
                      priceInfo.msrp += toAddMSRP;
                    }
                  );
                }
              }
            );
          }
          computeSubTotal(0);
          priceInfo.actualCartBasedDiscountPercent = getDiscountPercent(priceInfo.subtotal);
          computeSubTotal(priceInfo.actualCartBasedDiscountPercent);
          priceInfo.discount = Math.min(priceInfo.subtotal - priceInfo.msrp, 0) + 0.1;
          priceInfo.discountPercent = -1 + priceInfo.subtotal / (priceInfo.msrp || 1);
          priceInfo.paymentFee = priceInfo.paymentFeePercent * (priceInfo.subtotal + priceInfo.shipping);
          priceInfo.total = priceInfo.msrp + priceInfo.shipping + priceInfo.discount + priceInfo.paymentFee;
          priceInfo.tax = priceInfo.total / (1 + priceInfo.vatPercent / 100) * priceInfo.vatPercent / 100;
          const summary = {
            items: priceInfo.msrp,
            shipping: priceInfo.shipping,
            surcharge: priceInfo.paymentFee,
            discount: priceInfo.discount,
            discountPrecent: priceInfo.discountPercent,
            "items ec-cart-summary__body": priceInfo.total - priceInfo.tax,
            taxes: priceInfo.tax,
            total: priceInfo.total
          }, summaryDiscounts = $(".ec-cart__summary tbody:first").findOrCreate(".ec-cart-summary__row--discount", (e) => `
              <tr class="ec-cart-summary__row ec-cart-summary__row--discount">
                <td class="ec-cart-summary__cell ec-cart-summary__title"></td>
                <td class="ec-cart-summary__cell ec-cart-summary__price"><span class="ec-cart-summary__price-minus"></span><span></span></td></tr>`);
          summaryDiscounts.toggle(priceInfo.discountPercent < 0).toggleClass("discount-patched").find(".ec-cart-summary__title").uiNumber((priceInfo.discountPercent * 100).toFixed(2) + "%", "ui-discount-percent", "percent-number", 0, " (", ")", null, null, null, true).toggleClass("discount-patched");
          function injectUINumberSummaryCartNumber(elemSummaryPrice, elemSummaryPriceIndex) {
            const elem = $(elemSummaryPrice);
            if (elem.is(".ec-cart-summary__price-hidden"))
              return;
            const tr = elem.parent("tr"), span = elem.find("span"), text = span.hasClass("ec-cart-summary__total") ? $(span[0].firstChild).text() : span.length ? span.text() : elem.text(), cls = /ec-cart-summary__row--(.*?)( |$)/gi.exec(tr[0]?.className)[1] || "", value = summary[cls], formattedText = value ? Ecwid.formatCurrency(value) : text, uiPatch = tr.find(".ui-patched"), td = uiPatch.length ? uiPatch : $(`<td class="ec-cart-summary__cell ec-cart-summary__price ui-patched"></td>`);
            td.uiNumber(formattedText, `ui-summary-price ui-summary-price-${cls}`, "number", 0);
            !uiPatch.length && elem.toggleClass("ec-cart-summary__price-hidden", true);
            !uiPatch.length && tr.append(td);
          }
          $(".ec-cart-summary__cell.ec-cart-summary__price").each((i, e) => injectUINumberSummaryCartNumber(e, i));
          uiProducts.each((index2, uiProduct) => injectProductOptionPrices(ecCart__ProductsInner[0], cartProducts, null, cart2, priceInfo, uiProduct, index2, lang));
        }
        function selectCountChanged(e) {
          const select = $(e.target), selectLabel = select.parent().find(".form-control__select-text"), quantity = parseInt(select.val()), text = selectLabel.text().replace(/\d+/g, quantity);
          selectLabel.text(text);
          const index = $(".ec-cart-item__count--select select").index(select);
          setTimeout((t) => recomputeCartSummary(null, index, quantity), 10);
        }
        function selectCountRegisterChangeEvent(selectElem) {
          if (selectElem && !selectElem.countChanged) {
            selectElem.countChanged = true;
            if ($(selectElem).is(".ec-cart-item__control-inner")) {
              selectElem.addEventListener("click", (e) => setTimeout((t) => recomputeCartSummary(), 300), true);
            } else {
              selectElem.addEventListener("change", selectCountChanged, true);
            }
          }
        }
      }
    );
  }
  function detectAndProcessOrdersFromPage(page2) {
    const email = extractEmailAddress($(".ec-confirmation__email").text() || $(".ec-cart-step--email .ec-cart-step__text").text());
    const mappedOrderElements = {};
    const orders = [page2.vendorOrderNumber, ...$(".ec-confirmation__number").map(
      (i, e) => {
        const match = $(e).text().match(/#(@DATEx2-(.*))/i);
        const orderId = match?.[2];
        if (orderId) {
          mappedOrderElements[match[1]] = $(e).parents(".ec-cart__order")[0];
        }
        return orderId;
      }
    )].filter((n) => n).filter((value, index, array) => array.indexOf(value) === index);
    fetchEcwidOrderViaProxy("GET", null, orders.join(","), email).then(
      (orders2) => {
        if (!orders2?.items?.length)
          return;
        orders2.items.forEach(
          (o) => {
            const items = o.items;
            const orderNumber = o.id;
            if (pageType != "ACCOUNT") {
              listen(items, o, null);
            }
            const subTotal = o.subtotal, subTotalWithoutTax = o.subTotalWithoutTax, total = o.total, tax = o.tax, totalWithoutTax = o.totalWithoutTax, taxPercent = tax * 100 / total, customerTaxExtempt = o.customerTaxExtempt, shipping = o.shippingOption.shippingRateWithoutTax, discount = o.discount, couponDiscount = o.couponDiscount, paymentTax = 0, formatCurrency = Ecwid.formatCurrency;
            function injectQRCode(elem) {
              $(elem).find(".payment-provider-total i").text(formatCurrency(total));
              const $elem = $(elem), company = $elem.hasClass("QR-Dx2") ? "Dx2" : $elem.hasClass("QR-DxM") ? "DxM" : "2WD";
              generateRevolutQRCode(elem, company, total, orderNumber);
            }
            mappedOrderElements[orderNumber].arrive(".QR", notOnceOnlySelfUnbind, injectQRCode);
            function fixWhatsapPhoneNumber(elem) {
              const $elem = $($(elem).find(".ec-confirmation__body .ec-confirmation__section + .ec-confirmation__section")[0]);
              if (!$elem.hasClass("whatsapp")) {
                $elem.toggleClass("whatsapp", true);
                $elem.html($elem.html().replace(/(\+40745238005)/gi, "<a target='_blank' href='https://wa.me/$1'>$1</a>"));
              }
            }
            d.arrive(".ec-confirmation__step--contactinfo", onceOnlySelfUnbind, fixWhatsapPhoneNumber);
            $(".ec-confirmation").append(`<table class="ct ec-cart__summary ec-cart-summary ec-cart-summary--group-view"><tbody class="ec-cart-summary__body">
<tr class="ec-cart-summary__row ec-cart-summary__row--items"><td class="ec-cart-summary__cell ec-cart-summary__title ct-subtotal" title="Subtotal ${formatCurrency(subTotal)}"></td><td class="ec-cart-summary__cell ec-cart-summary__price"><span>${formatCurrency(subTotal)}</span></td></tr>
<tr class="ec-cart-summary__row ec-cart-summary__row--shipping"><td class="ec-cart-summary__cell ec-cart-summary__title"><span class="ec-cart-summary__text ct-shipping" title="Shipping costs ${formatCurrency(shipping)}"></span></td><td class="ec-cart-summary__cell ec-cart-summary__price">${formatCurrency(shipping)}</td></tr>
<tr class="ec-cart-summary__row ec-cart-summary__row--surcharge" style="display:${paymentTax ? "block" : "none"} !important"><td class="ec-cart-summary__cell ec-cart-summary__title ct-payment-fee" title="Payment fees ${formatCurrency(paymentTax)}"></td><td class="ec-cart-summary__cell ec-cart-summary__price"><span>${formatCurrency(paymentTax)}</span></td></tr></tbody><tbody class="ec-cart-summary__body">
<tr class="ec-cart-summary__row ec-cart-summary__row--items ec-cart-summary__body"><td class="ec-cart-summary__cell ec-cart-summary__title ct-total-wtax" title="Total, without fees ${formatCurrency(totalWithoutTax)}"></td><td class="ec-cart-summary__cell ec-cart-summary__price"><span>${formatCurrency(totalWithoutTax)}</span></td></tr>
<tr class="ec-cart-summary__row ec-cart-summary__row--taxes"><td class="ec-cart-summary__cell ec-cart-summary__title ct-vat-tax" title="VAT/TAX ${taxPercent.toFixed(0)}%"> ${taxPercent.toFixed(0)}% ${formatCurrency(tax)}</td><td class="ec-cart-summary__cell ec-cart-summary__price"><span>${formatCurrency(tax)}</span></td></tr></tbody><tbody class="ec-cart-summary__body"></tbody><tbody class="ec-cart-summary__body">
<tr class="ec-cart-summary__row ec-cart-summary__row--total"><td class="ec-cart-summary__cell ec-cart-summary__title ct-total" title="Total ${formatCurrency(total)}"></td><td class="ec-cart-summary__cell ec-cart-summary__price"><span class="ec-cart-summary__total">${formatCurrency(total)}<span class="ec-currency-converter-element ec-currency-converter-alt-value"> (${formatCurrency(total)})</span><div class="ec-preloader ec-preloader--data ec-preloader--small"><div class="ec-preloader__item"><div class="ec-preloader__inner"></div></div><div class="ec-preloader__item"><div class="ec-preloader__inner"></div></div></div></span></td></tr>
<tr class="ec-cart-summary__row"><td class="ec-cart-summary__cell ec-cart-summary__note" colspan="2"><span data-tax-value="${tax}" title="Incl. VAT ${taxPercent.toFixed(0)} ${formatCurrency(tax)}" class="ct-incl-vat-tax"> ${taxPercent.toFixed(0)} ${formatCurrency(tax)}</span></td></tr></tbody></table>`);
          }
        );
      }
    );
  }
  function updateAllProductOptionsPricingAndTotalSummary(page2, cart) {
    var elems = $(".ec-cart__products-inner");
    page2 = page2 || currentPage;
    if (isOrderConfirmationPage(page2)) {
      processOrderConfirmationLines(page2, elems);
    } else {
      processCartPagesOrderLines(page2, elems, cart);
    }
  }
  function syncClasses(elem, parent) {
    return elem.toggleClass("ec-cart-step--done", parent.is(".ec-cart-step--done")).toggleClass("ec-cart-step--current", parent.is(".ec-cart-step--current"));
  }
  function cloneAnchorStep(elem) {
    elem = $(elem);
    const parent = elem.parent(), isAppended = parent.is(".ec-cart-step--email") || $("#ec-cart-step--email").parent().find("#" + elem.attr("id")).length;
    isEmail = elem.is("#ec-cart-step--email");
    if (!isAppended) {
      $("#ec-cart-step--email").parent().append(elem = $(elem.clone()));
    }
    let title = "";
    switch (elem.attr("id")) {
      case "ec-cart-step--email":
        title = translate("Cart");
        break;
      case "ec-cart-step--address":
        title = translate("Shipping & Delivery");
        break;
      case "ec-cart-step--delivery":
        title = translate("Shipping method");
        break;
      case "ec-cart-step--tax-information":
        title = translate("Tax information");
        break;
      case "ec-cart-step--payment":
        title = translate("Payment");
        break;
    }
    elem.attr("title", title);
    if (!isAppended || isEmail) {
      parent.classChange(
        (parent2) => {
          parent2 = $(parent2);
          syncClasses(elem, parent2);
        }
      );
      syncClasses(elem, parent).toggleClass(elem.attr("id"), true);
    }
  }
  function detectSummaryTotalOnCheckoutPages(page2, cart) {
    function listenToTotalSummaryArrive(elem) {
      if (lastCartTotalMutationObserver != null) {
        lastCartTotalMutationObserver.disconnect();
        lastCartTotalMutationObserver = null;
      }
      var observer = new MutationObserver(
        function(e) {
          Ecwid.Cart.get((cart2) => updateAllProductOptionsPricingAndTotalSummary(page2, cart2));
        }
      );
      observer.observe(elem, {
        characterData: true,
        childList: true,
        subtree: true,
        characterDataOldValue: true
      });
      lastCartTotalMutationObserver = observer;
      updateAllProductOptionsPricingAndTotalSummary(page2, cart);
    }
    function processAllCartLinesOnEcCart__ProductsInner(elem, o, cart2) {
      const p2 = $(elem).parents(".ec-cart__products"), titles = p2.parent().find(`.page-title__name`);
      p2.attr("data-title", $(titles[page2.type == "CART" || titles.length == 1 ? 0 : 1]).text());
      var summary = o;
      o && (summary = {
        total: o.total,
        subtotal: o.subtotal,
        discount: -o.discount,
        shipping: o.shipping || o.shippingOption && o.shippingOption.shippingRateWithoutTax,
        tax: o.tax
      });
      injectProductOptionPrices(elem, cart2.items, o, cart2, summary);
    }
    const items = cart.items, priceInfo = {
      total: cart?.total || 0,
      subtotal: cart?.subtotal || 0,
      discount: cart?.discount || 0,
      shipping: cart?.shipping || 0,
      tax: cart?.tax || 0
    };
    d.unbindArrive(listenToTotalSummaryArrive);
    d.arrive(".ec-cart-summary__total", notOnceOnlySelfUnbind, listenToTotalSummaryArrive);
    d.arrive(".ec-cart-item__picture, .ec-cart-item__title", notOnceOnlySelfUnbind, (elem) => preventDefaultClickAndOpenProductWithOptions(elem, items));
    d.arrive(".ec-cart-step__anchor", notOnceOnlySelfUnbind, cloneAnchorStep);
  }
  function injectCartClickOnItemFixProductOptions(page2) {
    d.unbindArrive(onInjectCartImageResize);
    if (isCartSummaryPage(page2)) {
      d.arrive(".ec-cart-item__image", notOnceOnlySelfUnbind, onInjectCartImageResize);
      d.arrive(".ec-cart__summary, .ec-cart.ec-cart--empty", onceOnlySelfUnbind, showActionBar);
    }
    if (lastCartTotalMutationObserver != null) {
      lastCartTotalMutationObserver.disconnect();
      lastCartTotalMutationObserver = null;
    }
    d.unbindArrive(expandProductOptions);
    d.unbindArrive(preventDefaultClickAndOpenProductWithOptions);
    if (isCartSummaryPage(page2)) {
      if (isOrderConfirmationPage(page2)) {
        detectAndProcessOrdersFromPage(page2);
      } else {
        Ecwid.Cart.get(
          (cart) => {
            logDuration("summary", "Pre-fetching cart products")();
            fetchCartProducts(cart, true);
            detectSummaryTotalOnCheckoutPages(page2, cart);
          }
        );
      }
    }
  }
  function approveEcwidOrderPayment(order, cart, customer, po, paypalApprovementData, paypalActions, payPalOrderId) {
    return fetchEcwidOrderViaProxy("POST", {
      externalTransactionId: paypalApprovementData.payerId,
      orderId: cart.orderId,
      subtotal: order.subtotal,
      total: order.total,
      email: customer.email,
      paymentMethod: "PayPal2",
      tax: order.tax,
      taxExempt: customer.taxExempt,
      customerTaxId: customer.taxId,
      customerTaxIdValid: customer.taxIdValid,
      reversedTaxApplied: false,
      //ipAddress: '127.0.0.1',
      //couponDiscount: order.couponDiscount,
      paymentStatus: "AWAITING_PAYMENT",
      fulfillmentStatus: "AWAITING_PROCESSING",
      refererUrl: location.href,
      orderComments: order.comments,
      volumeDiscount: order.volumeDiscount,
      customerId: customer.id,
      hidden: false,
      membershipBasedDiscount: order.customerGroupVolumeDiscount,
      //totalAndMembershipBasedDiscount: //The sum of discount based on subtotal AND customer group. Is included into the discount field
      discount: order.discount,
      globalReferer: location.href,
      externalOrderId: payPalOrderId,
      //createDate:The date/time of order placement, e.g 2014-06-06 18:57:19 +0000
      //discountCoupon: order.couponDiscount,
      items: cart.items.map(
        (i) => {
          let p2 = i.product;
          return {
            name: p2.name,
            quantity: i.quantity,
            productId: p2.id,
            categoryId: 0,
            price: p2.price,
            weight: p2.weight,
            sku: p2.sku,
            shortDescription: p2.shortDescription,
            tax: p2.tax,
            //combinationId: //The ID of a chosen combination. If not specified, it will be calculated automatically
            shipping: p2.shipping,
            isPreorder: p2.isPreorder
          };
        }
      ),
      billingPerson: cart.billingPerson || cart.shippingPerson,
      shippingPerson: cart.shippingPerson,
      shippingOption: order.shippingOption,
      handlingFee: {
        name: "Handling fee",
        value: order.handlingFee,
        description: "The cost to handle & pack this item"
      },
      additionalInfo: null
      //Map<string,string>	Additional order information if any (reserved for future use)
    }).then(
      (res) => {
        var result = res.json();
        return result;
      }
    ).then(
      (data) => {
        return data.orderId;
      }
    ).then(
      (EcwidOrderId) => {
        return payPalOrderId;
      }
    );
  }
  function decodeBase64(f) {
    var g = {}, b2 = 65, d2 = 0, a, c = 0, h2, e = "", k = String.fromCharCode, l = f.length;
    for (a = ""; 91 > b2; )
      a += k(b2++);
    a += a.toLowerCase() + "0123456789+/";
    for (b2 = 0; 64 > b2; b2++)
      g[a.charAt(b2)] = b2;
    for (a = 0; a < l; a++)
      for (b2 = g[f.charAt(a)], d2 = (d2 << 6) + b2, c += 6; 8 <= c; )
        ((h2 = d2 >>> (c -= 8) & 255) || a < l - 2) && (e += k(h2));
    return e;
  }
  var boundArrive360PSWP = false, listeningToClick360Item = false, tappingLeftRightOnFullScreen = /* @__PURE__ */ new Date();
  function detectWeAreOn360Image(elem) {
    var viewChangedDate = /* @__PURE__ */ new Date();
    function viewChanged(activeImageSelector, click) {
      if (!click && /* @__PURE__ */ new Date() - viewChangedDate < 300)
        return;
      if (!click && /* @__PURE__ */ new Date() - tappingLeftRightOnFullScreen < 100) {
        return setTimeout(viewChanged.bind(this, activeImageSelector), 300);
      }
      var show360 = $d.hasClass("jsv-show-360") && (window.jsv && $d.hasClass("jsv-full-screen") ? $(activeImageSelector).isOnScreen() : $(".details-gallery__thumb--active.details-gallery__thumb")[0] == $(".details-gallery__thumb:first")[0]);
      if (show360) {
        viewChangedDate = /* @__PURE__ */ new Date();
        if (jsv && !jsv.isStarted) {
          spinJSV(1);
        }
      } else {
        viewChangedDate = /* @__PURE__ */ new Date();
        stopJSV2();
      }
      toggleShow360(show360);
    }
    function updateWeAreOn360Image(activeImageSelector, elem2) {
      if (!elem2.viewAlreadyBound) {
        elem2.viewAlreadyBound = true;
        isInView(elem2, (elem3) => setTimeout((t) => viewChanged(elem3, activeImageSelector), 500));
        isOutOfView(elem2, (elem3) => setTimeout((t) => viewChanged(elem3, activeImageSelector), 500));
      }
    }
    if (!listeningToClick360Item || !boundArrive360PSWP) {
      let src = $(".details-gallery__picture:first").attr("src");
      let activeImageSelector = `.pswp__img[src*="${src?.replace(/\/(\d+)\.(.*)$/g, (match, id, ext) => `/${parseInt(id) - 1}.${ext}`)}"], .pswp__img[src*="${src?.replace(/\/(\d+)\.(.*)$/g, (match, id, ext) => `/${parseInt(id) - 2}.${ext}`)}"]`;
      if (!listeningToClick360Item) {
        listeningToClick360Item = true;
        $d.on(
          "click",
          ".details-gallery__thumb",
          (elem2) => {
            setTimeout(viewChanged.bind(elem2, activeImageSelector, true), 100);
          }
        );
        elem && setTimeout(viewChanged.bind(elem, activeImageSelector), 100);
      }
      if (!boundArrive360PSWP) {
        if (!src) {
          boundArrive360PSWP = false;
          return;
        }
        boundArrive360PSWP = true;
        d.arrive(activeImageSelector, {
          existing: true
        }, updateWeAreOn360Image.bind(this, activeImageSelector));
      }
    }
  }
  window.detectWeAreOn360Image = detectWeAreOn360Image;
  function load360(page2, p360, callback) {
    if (page2.type == "PRODUCT") {
      if (p360) {
        logDuration("360", "360 Loading css files")();
        injectFastLoadingCss(page2);
        if (p360.loaded) {
          callback && callback(p360);
        } else {
          if ("loading" in p360) {
            callback && p360.loading.push(callback);
          } else {
            let done = function() {
              if (++doneOps >= 2) {
                logDuration("360", "Loaded 360 files", p360.loading)();
                p360.loaded = true;
                p360.loading.forEach((callback2) => callback2(p360));
                p360.loading.splice(0, p360.loading.length);
              }
            };
            p360.loading = callback ? [callback] : [];
            let doneOps = 0;
            ensureJavascriptViewer(done);
            injectPreloadCss(p360.className, p360.css, done);
          }
        }
      }
    }
    return p360;
  }
  function upgradeHighQualityImages(p360, page2) {
    const pid = p360?.id || page2?.productId || currentPage?.productId;
    const kp = knownProductSlugs[pid];
    function processProductMediaImages(cp) {
      const p2 = cp[1], images = p2.media.images, image = "imageOriginalUrl", preloader = $b.findOrCreate("#images-preloader", (e) => `<div id="images-preloader" style="opacity:0.0001;width:0;height:0;overflow:hidden;"/>`);
      $d.arrive(".details-gallery", notOnceOnlySelfUnbind, galleryLoaded);
      function galleryLoaded(gallery) {
        gallery.arrive(".details-gallery__image-bg, .details-gallery__thumb-bg, .details-gallery__thumb-img", notOnceOnlySelfUnbind, detailsGallery__imageBg);
        gallery.arrive(".details-gallery__images-zoom", notOnceOnlySelfUnbind, detailsGallery__imagesZoom);
        gallery.arrive(".details-gallery__picture", notOnceOnlySelfUnbind, detailsGallery__picture);
      }
      function getImageIndex(elem) {
        const wrapper = elem.closest('[class*="photoswipe-"]');
        if (wrapper.length) {
          const match = wrapper.attr("class")?.match(/photoswipe-(?:thumb-)?index-(\d+)/);
          if (match) return parseInt(match[1], 10);
        }
        return Math.max(0, elem.parent().parent().parent().parent().children().index(elem.parent().parent().parent()) - 1);
      }
      function detailsGallery__imageBg(elem) {
        elem = $(elem);
        const bg = elem.css("background-image"), index = getImageIndex(elem), highResUrl = images[index]?.["imageOriginalUrl"];
        if (highResUrl && !bg.includes(highResUrl)) {
          const preloader2 = new Image();
          preloader2.onload = () => elem.css("background-image", bg.replace(/(https:\/\/.*?\/84625467\/)((?:products\/\d+\/)?)?(\d+)(\.[\w]+)/gi, highResUrl));
          preloader2.src = highResUrl;
        }
      }
      function detailsGallery__imagesZoom(elem) {
        elem = $(elem);
        const bg = elem.css("background-image"), index = getImageIndex(elem), highResUrl = images[index]?.["imageOriginalUrl"];
        if (highResUrl && !bg.includes(highResUrl)) {
          const preloader2 = new Image();
          preloader2.onload = () => elem.css("background-image", bg.replace(/(https:\/\/.*?\/84625467\/)((?:products\/\d+\/)?)?(\d+)(\.\w+)/gi, highResUrl));
          preloader2.src = highResUrl;
        }
      }
      function detailsGallery__picture(elem) {
        elem = $(elem);
        const src = elem.attr("src"), srcset = elem.attr("srcset"), bg = elem.css("background-image"), index = getImageIndex(elem), highResUrl = images[index]?.["imageOriginalUrl"];
        if (highResUrl && src && !src.includes(highResUrl)) {
          const preloader2 = new Image();
          preloader2.onload = () => {
            elem.attr("src", highResUrl);
            if (srcset) {
              const newSrcSet = srcset.replace(/(https:\/\/.*?\/84625467\/)((?:products\/\d+\/)?)?(\d+)(\..*?)( )([0-9]+)(x)/gi, function(match, a, path, capture, ext, b2, dpi, c) {
                return highResUrl + b2 + dpi + c;
              });
              elem.attr("srcset", newSrcSet);
            }
            if (bg && bg !== "none") {
              const newBg = bg.replace(/(https:\/\/.*?\/84625467\/)((?:products\/\d+\/)?)?(\d+)(\.[\w]+)/gi, highResUrl);
              elem.css("background-image", newBg);
            }
          };
          preloader2.src = highResUrl;
        }
      }
    }
  }
  upgradeHighQualityImages();
  function inject360(p360, page2) {
    if (page2 && page2.type != "PRODUCT") {
      $d.removeClass("jsv-show-photos jsv-swiping jsv-show-360 jsv-has-360");
      return;
    }
    injectFastLoadingCss(page2).then(
      (now) => {
        if (p360) {
          toggleShow360(false, false);
          $d.toggleClass("jsv-swiping", true);
          $(".pswp__sku-title").remove();
          var skuTitle = $("<div/>").addClass("pswp__sku-title").text($(".product-details__product-sku").text());
          $(".pswp__preloader").after(skuTitle);
          logDuration("360", "Page loaded::inject 360", p360)();
          load360(
            page2,
            p360,
            (p3602) => {
              function recreateJSVElement(elem) {
                {
                  let carouselRemoved = function(elemRemoved) {
                    const carousels = $(".details-gallery__images-carousel");
                    if (carousels.length == 0) {
                      destroyJSV();
                      const parent = $(".details-gallery__images-container")[0];
                      parent && recreateJSVElement(parent);
                    }
                  }, carouselInserted = function(elem2) {
                    const carousels = $(".details-gallery__images-carousel"), parent = $(".details-gallery__images-container")[0];
                    if (carousels.length > 1) {
                      $(carousels[0]).hide();
                    }
                  };
                  elem = $(elem);
                  if (!elem.find(".details-gallery__image-wrapper-inner:first-of-type .details-gallery__picture:first-of-type").length) {
                    const node = elem.find(".details-gallery__images-spacer")[0], thumb = $(".details-gallery__photoswipe-thumb-index-0"), bg = thumb.find(".details-gallery__thumb-bg"), bgStyle = bg.attr("style"), img = thumb.find("meta[itemprop=image]").attr("content"), thumbImg = thumb.find(".details-gallery__thumb-img"), srcset = thumbImg.css("background-image")?.replace(/image-set\((.*)\)/gi, "$1").replace(/url\(\"?(.*?)\"\)/gi, "$1").replace(/ (\d)dppx/gi, " $1x");
                    $(node.nextSibling).parent().append(
                      //.replaceWith(
                      $(`
  <div class="details-gallery__images-carousel" style="transform: translateX(0%)">
    <div class="details-gallery__image details-gallery__image--aspect-ratio-1333">
      <div class="details-gallery__image-spacer"></div>
      <div class="details-gallery__image-wrapper">
        <div class="details-gallery__image-wrapper-inner" style="max-width: 1500px; aspect-ratio: 1.33333 / 1; min-width: min(1500px, 100%); height: auto">
          <!---->
          <div
            class="details-gallery__image-bg details-gallery__image-bg--visible"
            style="${bgStyle}"></div>
          <div class="details-gallery__images-zoom" style="width: 0px; height: 0px; background-image: url('${img}')top: -27%; left: -89%"></div>
          <img
            src="${img}"srcset="${srcset}"alt="DATE AIRFx3-WHITE-GOLD the best 20x4&amp;quot; air double crown fork, Fork Model: \u{1D400}\u{1D408}\u{1D411}\u{1D405}\u{1D431}\u{1D7D1} \u{1D416}\u{1D407}\u{1D408}\u{1D413}\u{1D404}-\u{1D406}\u{1D40E}\u{1D40B}\u{1D403} 65cm, Handlebar: Not included, \u{1D417}-\u{1D413}\u{1D404}\u{1D40C}\u{1D412}\u{1D431}\u{1D7CF} for BMX: Not included, \u{1D407}\u{1D41E}\u{1D41A}\u{1D41D}\u{1D42C}\u{1D41E}\u{1D42D}: Not included"
            title='DATE AIRFx3-WHITE-GOLD the best 20x4" air double crown fork'
            width="1500"
            height="1125"
            loading="eager"
            class="details-gallery__picture details-gallery__photoswipe-index-0"
            itemprop="image"
            style="width: 100%"
          /><!---->
        </div>
        <!---->
      </div>
    </div>
  </div>
  `)
                    );
                  }
                  elem[0].leave(".details-gallery__images-carousel", notOnceOnlySelfUnbind, carouselRemoved);
                  elem[0].arrive(".details-gallery__images-carousel", notOnceOnlySelfUnbind, carouselInserted);
                }
              }
              d.arrive(".details-gallery__images-container", notOnceOnlySelfUnbind, recreateJSVElement);
              d.arrive(
                ".details-gallery__image-wrapper-inner:first-of-type .details-gallery__picture:first-of-type",
                onceOnlySelfUnbind,
                (elem) => {
                  logDuration("360", "360 element arrived")();
                  let jsvImage = $(elem);
                  var jsvHolder = $("#jsv-holder");
                  logDuration("360", "Injecting 360")();
                  if (!jsvImage.length) {
                    logDuration("360", "360 can't be injected", !jsvImage.length, jsvHolder.length)();
                    return;
                  }
                  var thumbs = $(".details-gallery__thumbs > .details-gallery__thumb:gt(3)");
                  var imgs = thumbs.length;
                  thumbs.each(function() {
                    var a = $(this).find(".details-gallery__thumb-img-wrapper-inner");
                    if (!a.find(".details-gallery__thumb-shadow").length) {
                      a.append(`<div class="details-gallery__thumb-shadow"></div>`);
                    }
                    if (!a.find(".details-gallery__thumb-more").length) {
                      a.append($(`<div class="details-gallery__thumb-more">${imgs > 1 ? "+" : ""}${imgs > 1 ? imgs : ""}</div>`).on(
                        "click",
                        (e) => {
                          $(".details-gallery__image-bg")[$(".details-gallery__thumb-more").index(e.target)]?.click();
                        }
                      ));
                    }
                    imgs--;
                  });
                  jsvImage.attr("id", "jsv-image");
                  jsvHolder = jsvImage.parent().attr("id", "jsv-holder").addClass("jsv-holder");
                  jsvHolder[0].addEventListener(
                    "click",
                    (event) => {
                      event.preventDefault();
                      event.stopImmediatePropagation();
                    },
                    true
                  );
                  var t360 = $('<button class="jsv-toggle jsv-toggle-360"></button>');
                  t360[0].addEventListener("click", toggle360, true);
                  var tfs = $('<button class="jsv-toggle jsv-toggle-full-screen jsv-enter-full-screen"></button>').on("click", toggleFullScreen);
                  var loader = $('<div class="jsv-loader"></div>');
                  var swipe = $('<button class="jsv-toggle jsv-swipe-icon"></button>').on("click", photoSwipeToggle);
                  $(".details-gallery__wrap").append($("<div/>").addClass("jsv-buttons").append(tfs, t360).append(swipe, loader));
                  jsvHolder.addClass("jsv-holder").parent().addClass("details-gallery-index-0").on("click", function(e) {
                    $(".ecwid-pswp").hide();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                  });
                  var jsv2 = window.jsv = new JavascriptViewer($.extend({}, {
                    mainHolderId: "jsv-holder",
                    mainImageId: "jsv-image",
                    mainImageUrl: " ",
                    imageUrlFormat: p3602.format,
                    totalFrames: p3602.frames,
                    defaultProgressBar: false,
                    reverse: false,
                    stopAtEdges: false,
                    zoom: true,
                    zoomWheelSpeed: 20,
                    zoomMax: 5,
                    inertia: 0,
                    speed: 300,
                    autoRotate: 100,
                    autoRotateSpeed: 20,
                    autoRotateReverse: 0,
                    autoCDNResizer: 0,
                    enableImageEvents: 1,
                    notificationConfig: {
                      dragToRotate: {
                        showStartToRotateDefaultNotification: false
                      }
                    }
                  }, p3602.css360));
                  let ca = jsv2.cancelCurrentActions;
                  jsv2.cancelCurrentActions = function() {
                    jsv2.cancelledSince = /* @__PURE__ */ new Date();
                    return ca.apply(this, arguments);
                  };
                  onUnload(destroyJSV);
                  if (jsv2) {
                    var percentage = "";
                    jsv2.events().zoomChanged.on(
                      (e) => {
                        const zoom = e.zoom.currentZoomScale, z = parseFloat(zoom.toFixed(1)).toString().substring(0, 3);
                        $d.toggleClass("pswp--zoomed-in", zoom > 1);
                        $(".pswp--open").toggleClass("pswp--zoomed-in", zoom > 1);
                        $(".jsv-zoom-buttons-wrapper .ecwid-pswp-wrapper").toggleClass("pswp--zoomed-in", zoom >= e.zoom.zoomMax);
                        $(".ecwid-pswp .pswp__button--zoom").attr("data-zoom", z + " x");
                      }
                    );
                    jsv2.events().loadImage.on(
                      (progress) => {
                        if (!navigator.isFirefox && !navigator.isSafari) {
                          if (progress.img.parentNode)
                            progress.img.parentNode.style.display = progress.currentImage == 1 ? "block" : "none";
                        }
                        const percent = progress.percentage + "%";
                        if (percent == percentage)
                          return;
                        percentage = percent;
                        var l = $(".jsv-loader").html(`<div class="loading-text"><div class="loading-360-text">${percent}</div></div>`);
                        setTimeout(
                          (t) => {
                            if (!$(".loading-bar").width(percent).length) {
                              $b.append(`<div class="loading-bar" style="width: ${percent}"></div>`);
                            }
                            if (progress.percentage >= 100) {
                              setTimeout(
                                (t2) => {
                                  const l2 = $(".loading-bar").css("transition", "none");
                                  setTimeout((t3) => l2.width(0) && setTimeout((t4) => l2.css("transition", ""), 1), 1);
                                  l2.css("display", "block").find(".loading-text").text("").toggleClass("t360-initializing", true);
                                },
                                800
                              );
                            }
                          },
                          1
                        );
                      }
                    );
                    jsv2.events().pinch.on(
                      (e) => {
                        e;
                      }
                    );
                    jsv2.events().started.on(
                      (ready) => {
                        logDuration("360", "360 injected")();
                        logDuration(true, "Site loaded and 360 rendered")();
                        if (!$(".pswp--open").length) {
                          toggleShow360(true);
                          $d.toggleClass("jsv-swiping", false);
                        }
                        if (ready) {
                          const text = $(".jsv-loader").find(".loading-text").toggleClass("t360-initializing", false).html('<h4 class="show-360-hint idle"><div></div></h4> <div class="drag-or-swipe-to-rotate idle"></div><div class="pinch-or-scroll-to-zoom idle"></div><div class="tap-more-pics idle"/></div>'), cls = [".drag-or-swipe-to-rotate", ".pinch-or-scroll-to-zoom", ".tap-more-pics"];
                          var index = 0;
                          setTimeout(function t() {
                            const selector = cls[index], target = $(selector).toggleClass("idle"), isIdle = target.is(".idle");
                            if (!isIdle || index++ < cls.length) {
                              setTimeout(t, isIdle ? 500 : 5e3);
                            } else {
                              text.toggleClass("loaded", true);
                            }
                          }, 0);
                        }
                      }
                    );
                    jsv2.events().click.on(
                      (e) => {
                        spinJSV();
                        e = e.originalEvent;
                        e.stopImmediatePropagation();
                        e.preventDefault();
                        return false;
                      }
                    );
                    jsv2.events().endAutoRotate.on(
                      (e) => {
                        if (!jsv2.manualStop || /* @__PURE__ */ new Date() - jsv2.manualStop > 200) {
                          spinJSV();
                        }
                      }
                    );
                    jsv2.events().doubleClick.on(
                      (e) => {
                        toggleFullScreen();
                      }
                    );
                    jsv2.events().scroll.on(
                      (e) => {
                        const zoom = e.zoom, currentZoomScale = e.currentZoomScale, isScaled = currentZoomScale != 1;
                        if (zoom.previousZoomScale > 1 && currentZoomScale == 1) {
                          zoom.startSpinningTimeout = setTimeout(function() {
                            zoom.startSpinningTimeout = 0;
                            spinJSV();
                          }, 1e3);
                        }
                        if (isScaled || zoom.startSpinningTimeout) {
                          e.originalEvent.preventDefault();
                        }
                        if (isScaled && zoom.startSpinningTimeout) {
                          zoom.startSpinningTimeout = 0;
                          clearTimeout(zoom.startSpinningTimeout);
                        }
                      }
                    );
                    jsv2.events().pinch.on(
                      (e) => {
                        e;
                      }
                    );
                    jsv2.start().then(
                      () => {
                        $d.toggleClass("jsv-has-360");
                        var isFullScreen = 0;
                        $(".jsv-toggle").show().on("click", function() {
                          isFullScreen = !isFullScreen;
                          $("#jsv-holder").css({
                            "max-width": isFullScreen ? "100%" : "50%",
                            "max-height": isFullScreen ? "100%" : "720px"
                          });
                        });
                      }
                    );
                  }
                }
              );
            }
          );
        }
      }
    );
  }
  window.inject360 = inject360;
  function calculateTotal(page2) {
    if ("CART" == page2.type) {
      logDuration("CART-TOTAL", "calculating order total")();
      Ecwid.Cart.calculateTotal(
        (order) => {
          logDuration("CART-TOTAL", "calculated order total")();
          setTimeout(orderInfoReady.bind(this, order), 0);
        }
      );
    }
  }
  function photoSwipeToggle() {
    alert("You can swipe through the photos");
  }
  function toggle360(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $(".pswp__ui--hidden").removeClass("pswp__ui--hidden");
    const is360 = $d.hasClass("jsv-show-360");
    const isFullScreen = $d.hasClass("jsv-full-screen");
    if (isFullScreen && !is360) {
      $(".i0").css({
        "z-index": 3,
        display: "block"
      });
    }
    toggleShow360(!is360);
    $d.toggleClass("jsv-swiping");
    $(".jsv-loader").toggle(is360);
    if (!is360) {
      spinJSV(isFullScreen ? 1 : void 0);
    } else {
      stopJSV2();
    }
    return false;
  }
  function stopJSV2() {
    if (window.jsv) {
      jsv.manualStop = /* @__PURE__ */ new Date();
      jsv.cancelCurrentActions();
      jsv.cancelCurrentActions();
    }
  }
  function spinJSV(frame) {
    if (window.jsv && !jsv.zoom?.isZoomed()) {
      stopJSV2();
      typeof frame == "number" && jsv.setCurrentImage(frame);
      setTimeout((t) => jsv.autoRotate(100).then((spinning) => jsv && !spinning && jsv.cancelledSince < /* @__PURE__ */ new Date() - 1e3 && setTimeout(spinJSV, 1)), 200);
    }
  }
  window.stopJSV = stopJSV2;
  window.spinJSV = spinJSV;
  var show360PoupupState = null;
  $d.on(
    "click",
    ".pswp__button--close.pswp__button--clone",
    (e) => {
      if (show360PoupupState == null) {
        show360PoupupState = $d.is(".jsv-show-360");
      } else {
        toggleShow360(show360PoupupState);
        show360PoupupState = null;
      }
      const originalCloseButton = $(".pswp__button--close:not(.pswp__button--clone)")[0];
      originalCloseButton?.click();
    }
  );
  function toggleFullScreen() {
    if ($d.is(".jsv-show-360"))
      if (!$(".pswp--open").length) {
        mustEnforce360 = true;
        let selector = (
          //$(window).width() >= 720
          //  ? //desktop friendly link
          //    ".details-gallery__picture.details-gallery__photoswipe-index-1"
          //  : //mobile friendly link
          //    ".details-gallery__thumb--active a";
          ".details-gallery__photoswipe-thumb-index-0 .details-gallery__thumb-more"
        );
        let currentImageLink = $(selector)[0];
        currentImageLink && currentImageLink.click();
      } else {
        let closeFullScreen2 = $(".pswp__button--close")[0];
        closeFullScreen2 && closeFullScreen2.click();
      }
  }
  window.toggleFullScreen = toggleFullScreen;
  function fixProductWeight() {
    const productDetails = $(".product-details"), qty = $(".details-product-purchase__qty-field input").val() || 1, quantity = qty <= 0 ? 1 : qty;
    var weightLabel = $(".product-details__product-weight:first");
    var weightTarget = productDetails.find(" > .product-details__product-weight");
    if (weightTarget.length == 0) {
      productDetails.append(weightLabel = weightLabel.clone());
    } else {
      weightLabel = weightTarget;
    }
    if (!$(".product-details__product-weight.details-product-attribute").length) {
      weightLabel.attr("order", 0).toggleClass("details-product-attribute", true);
      weightLabel.parent().toggleClass("product-attributes", true);
    }
    var weight = 0;
    $(".form-control__radio:checked").each(
      (index, input) => {
        const w2 = input.name == "Unit Type" && /^𝐱𝟏 /.test(input.value) ? 0 : parseFloat($(input).parent().attr("data-weight") || 0) || 0;
        weight += w2;
      }
    );
    setTimeout((t) => weightLabel.toggleClass("has-weight-info", weight > 0), 1);
    const lbs = weight * 2.20462, inKg = weight >= 1.2, weightKG = inKg ? weight : "", weightGrams = inKg ? "" : weight * 1e3, totalWeight = weight * quantity, totalLbs = totalWeight * 2.20462, totalInKg = totalWeight >= 1.2, totalWeightKG = totalInKg ? totalWeight : "", totalWeightGrams = totalInKg ? "" : totalWeight * 1e3;
    function injectWeight(cls, suffix, value, type, index) {
      let elem = weightLabel.find(`.details-product-attribute__value`);
      elem.uiNumber(value, `ui-number weight ${cls}`, type, index, null, suffix, null, null, true);
    }
    const lbsSuffix = translate("lbs"), KgSuffix = translate("Kg"), gramsSuffix = translate("gr");
    injectWeight("kg", KgSuffix, weightKG, "number", 0);
    injectWeight("grams", gramsSuffix, weightGrams, "int", 1);
    injectWeight("lbs", lbsSuffix, lbs, "number", 2);
    weightLabel.attr("title", `${translate("Total ")} ${totalLbs.toFixed(2)} ${lbsSuffix} / ${totalWeightKG ? totalWeightKG.toFixed(2) : totalWeightGrams.toFixed(0)} ${totalWeightKG ? KgSuffix : gramsSuffix}`);
    $(".product-details__product-attributes").toggleClass("weight-loaded", true);
  }
  function setRimTapeColorFilterVisibility() {
    $(".details-product-option--Rim-Tape-Color").css({
      "max-height": $("#form-control__radio--125946051:checked")[0] ? "100%" : "0",
      overflow: "hidden",
      transition: "all 0.5s ease-in-out"
    });
  }
  window.setRimTapeColorFilterVisibility = setRimTapeColorFilterVisibility;
  var measureWidthDOM = $("<span/>").attr("id", "js-measure-font").css({
    visibility: "hidden",
    float: "left",
    "white-space": "nowrap"
  }).appendTo(lazyCSS());
  window.getTextWidthDOM = function getTextWidthDOM(text, font) {
    const f = font || "12px arial";
    measureWidthDOM.text(text).css("font", f);
    const w2 = parseFloat(getComputedStyle(measureWidthDOM[0]).width, 10);
    return w2;
  };
  $.fn.classChange = function(cb, attr, triggerInitially) {
    return $(this).each(
      (_, el) => {
        let observer = new MutationObserver(
          (mutations) => {
            mutations.forEach((mutation) => cb && cb(mutation.target, $(mutation.target).prop(mutation.attributeName), observer, mutation));
          }
        );
        observer.observe(el, {
          attributes: true,
          attributeFilter: [attr || "class"]
          // only listen for class attribute changes
        });
        triggerInitially && cb(el);
      }
    );
  };
  function getDiscountPercent(v) {
    return v < 600 ? 0 : v < 1e3 ? 0.05 : v < 1500 ? 0.1 : v < 2e3 ? 0.15 : v < 2500 ? 0.2 : v < 3e3 ? 0.25 : v < 5e3 ? 0.3 : v < 7e3 ? 0.35 : 0.36;
  }
  $(document).on("click .details-product-option--d825dc01 c05 c31 fd1 c02-36-spokes-1000W", setRimTapeColorFilterVisibility);
  function promiseCartAndPid(pid) {
    if (cachedPromisesCartAndPid[pid]) {
      return cachedPromisesCartAndPid[pid];
    }
    detectCurrentPage();
    injectFastLoadingCss(currentPage);
    logDuration("PRICE-API", "Fetching product id " + pid + " and total cart value")();
    return cachedPromisesCartAndPid[pid] = Promise.all([calculateCartTotalPromise(pid), fetchProduct("GET", pid, "id,sku,price,compareToPrice,wholesalePrices,media(images(imageOriginalUrl)),options(type,name,defaultChoice,choices(text,priceModifier,priceModifierType,textTranslated(cy)))")]).then(
      (v) => {
        const p2 = v[1];
        p2.priceWithDefaultOptions = p2.price || 0;
        p2.options?.forEach((o) => p2.priceWithDefaultOptions += o?.choices?.[o?.defaultChoice || 0]?.priceModifier || 0);
        logDuration("PRICE-API", "Loaded product and cart total...", v)();
        return v;
      }
    );
  }
  function injectPriceUpdate(elem, completedCallback) {
    logDuration("PRICE", "injectPriceUpdate arrived...")();
    function quantityChanged() {
      let p2 = $(".product-details__product-price");
      setTimeout(priceChanged.bind(this, p2[0], 0), 10);
    }
    function WholeSalePrice(quantity, currentAddToCartQuantity, price, referencePrice, cartTotal = 0, selectedOptionsReferencePrice = 0, selectedOptionsDiscountedPrice = 0) {
      this.quantity = quantity;
      this.price = price;
      this.referencePrice = referencePrice || price;
      this.cartTotal = cartTotal;
      this.selectedOptionsReferencePrice = selectedOptionsReferencePrice;
      this.selectedOptionsDiscountedPrice = selectedOptionsDiscountedPrice;
      this.currentAddToCartQuantity = currentAddToCartQuantity;
    }
    WholeSalePrice.prototype = {
      get compareToPrice() {
        return this.referencePrice || this.price || 0;
      },
      get unitPriceDiscountIncludingCartItems() {
        const discount = 1 - this.price / (this.compareToPrice || this.price || 1);
        const maxPossibleCartTotal = this.quantity > this.currentAddToCartQuantity ? this.cartAmountTotalPriceWithOptionsForVirtualQuantity : this.totalWithOptionsForCurrentAddToCartQuantity;
        const totalCartDiscount = getDiscountPercent(maxPossibleCartTotal);
        const itemDiscount = -Math.max(discount, totalCartDiscount);
        return itemDiscount;
      },
      get unitPriceWithCartTotalDiscountApplied() {
        const unitPrice = this.compareToPrice * (1 + this.unitPriceDiscountIncludingCartItems);
        return unitPrice;
      },
      get unitPriceWithCartTotalDiscountAppliedFormatted() {
        const unitPrice = this.unitPriceWithCartTotalDiscountApplied;
        const result = unitPrice ? Ecwid.formatCurrency(unitPrice) : "";
        return result;
      },
      get selectedOptionsPriceFormatted() {
        const optionsPrice = this.selectedOptionsDiscountedPrice;
        const result = optionsPrice ? Ecwid.formatCurrency(optionsPrice) : "";
        return result;
      },
      get selectedOptionsDiscountWithCartTotalDiscountApplied() {
        const wholeSaleDiscountForVirtualQuanity = 1 - (this.selectedOptionsDiscountedPrice || 1) / (this.selectedOptionsReferencePrice || this.selectedOptionsDiscountedPrice || 1);
        const totalCartDiscount = getDiscountPercent(this.cartAmountTotalPriceWithOptionsForVirtualQuantity);
        const optionsDiscount = -Math.max(wholeSaleDiscountForVirtualQuanity, totalCartDiscount);
        return optionsDiscount;
      },
      get selectedOptionsPriceWithCartTotalDiscountApplied() {
        const optionsPrice = this.selectedOptionsReferencePrice * (1 + this.selectedOptionsDiscountWithCartTotalDiscountApplied);
        return optionsPrice;
      },
      get selectedOptionsPriceWithCartTotalDiscountAppliedFormatted() {
        const optionsPrice = this.selectedOptionsPriceWithCartTotalDiscountApplied;
        const result = Ecwid.formatCurrency(optionsPrice);
        return result;
      },
      get unitPriceWithSelectedOptionsWithCartTotalDiscountApplied() {
        const optionsPrice = this.selectedOptionsPriceWithCartTotalDiscountApplied;
        const unitPrice = this.unitPriceWithCartTotalDiscountApplied;
        const setPrice = unitPrice + optionsPrice;
        return setPrice;
      },
      get unitPriceWithSelectedOptionsWithCartTotalDiscountAppliedFormatted() {
        const setPrice = this.unitPriceWithSelectedOptionsWithCartTotalDiscountApplied;
        const result = Ecwid.formatCurrency(setPrice);
        return result;
      },
      get totalWithOptionsForCurrentAddToCartQuantity() {
        return (this.price + this.selectedOptionsDiscountedPrice) * this.currentAddToCartQuantity;
      },
      get totalWithOptionsForCurrentAddToCartQuantityFormatted() {
        const total = this.totalWithOptionsForCurrentAddToCartQuantity;
        const result = Ecwid.formatCurrency(total);
        return result;
      },
      get cartAmountTotalWithOptionsForCurrentAddToCartQuantity() {
        const total = this.cartTotal + totalWithOptionsForCurrentAddToCartQuantity;
        return total;
      },
      get totalWithOptionsForCurrentAddToCartQuantityWithCartTotalDiscountApplied() {
        const totalReferencePrice = this.totalReferenceWithOptionsForCurrentAddToCartQuantity;
        const discountPercentIncludingCartItems = this.discountPercentIncludingCartItems;
        const total = totalReferencePrice * (1 + discountPercentIncludingCartItems);
        return total;
      },
      get totalWithOptionsForCurrentAddToCartQuantityWithCartTotalDiscountAppliedFormatted() {
        const total = this.totalWithOptionsForCurrentAddToCartQuantityWithCartTotalDiscountApplied;
        const result = Ecwid.formatCurrency(total);
        return result;
      },
      get selectedOptionsReferencePriceFormatted() {
        const total = this.selectedOptionsReferencePrice;
        const result = Ecwid.formatCurrency(total);
        return result;
      },
      get unitReferencePriceWithOptions() {
        const totalReferencePrice = this.compareToPrice + this.selectedOptionsReferencePrice;
        return totalReferencePrice;
      },
      get discountUnitPriceWithSelectedOptionsWithCartTotalDiscountApplied() {
        const unitReferencePriceWithOptions = this.unitReferencePriceWithOptions;
        const unitPrice = this.unitPriceWithSelectedOptionsWithCartTotalDiscountApplied;
        const discountAmount = -Math.max(unitReferencePriceWithOptions - unitPrice, 0);
        return discountAmount;
      },
      get discountUnitPriceWithSelectedOptionsWithCartTotalDiscountAppliedFormatted() {
        const discountAmount = this.discountUnitPriceWithSelectedOptionsWithCartTotalDiscountApplied;
        return Ecwid.formatCurrency(discountAmount);
      },
      get totalReferenceWithOptionsForCurrentAddToCartQuantity() {
        const unitReferencePriceWithOptions = this.unitReferencePriceWithOptions;
        const total = unitReferencePriceWithOptions * this.currentAddToCartQuantity;
        return total;
      },
      get totalReferenceWithOptionsForCurrentAddToCartQuantityFormatted() {
        const total = this.totalReferenceWithOptionsForCurrentAddToCartQuantity;
        const result = Ecwid.formatCurrency(total);
        return result;
      },
      get referencePriceFormatted() {
        const total = this.compareToPrice;
        const result = Ecwid.formatCurrency(total);
        return result;
      },
      get discountAmount() {
        return this.totalReferenceWithOptionsForCurrentAddToCartQuantity - this.totalWithOptionsForCurrentAddToCartQuantity;
      },
      get discountPercent() {
        return -1 + this.totalWithOptionsForCurrentAddToCartQuantity / (this.totalReferenceWithOptionsForCurrentAddToCartQuantity || this.totalWithOptionsForCurrentAddToCartQuantity || 1);
      },
      get discountPercentText() {
        const dp = this.discountPercent;
        const result = dp ? dp.toFixed(1) + "%" : "";
        return result;
      },
      get totalPriceWithOptionsForVirtualQuantity() {
        const unitPrice = this.price + this.selectedOptionsDiscountedPrice;
        const total = this.quantity * unitPrice;
        return total;
      },
      get cartAmountTotalPriceWithOptionsForVirtualQuantity() {
        const cartTotal = this.cartTotal;
        const totalPriceWithOptionsForVirtualQuantity = this.totalPriceWithOptionsForVirtualQuantity;
        const total = cartTotal + totalPriceWithOptionsForVirtualQuantity;
        return total;
      },
      get discountPercentIncludingCartItems() {
        const cartDiscountPercent = getDiscountPercent(this.cartAmountTotalPriceWithOptionsForVirtualQuantity);
        const wpDiscountPercent = -this.discountPercent;
        const discountPercent = -Math.max(cartDiscountPercent, wpDiscountPercent);
        return discountPercent;
      },
      get discountPercentIncludingCartItemsFormatted() {
        const dp = this.discountPercentIncludingCartItems * 100;
        const result = dp ? dp.toFixed(0) + "%" : "";
        return result;
      },
      get discountAmountIncludingCartItems() {
        const discountAmount = this.discountPercentIncludingCartItems * this.totalReferenceWithOptionsForCurrentAddToCartQuantity;
        return discountAmount;
      },
      get discountAmountIncludingCartItemsFortmatted() {
        const discountAmount = this.discountAmountIncludingCartItems;
        const formatted = discountAmount ? Ecwid.formatCurrency(discountAmount) : "";
        return formatted;
      }
    };
    var priceChanging, wholeSaleNeedsUpdateTimeout;
    $d.arrive(
      ".details-product-wholesale__row",
      notOnceOnly,
      (elem2) => {
        if (!priceChanging) {
          clearTimeout(wholeSaleNeedsUpdateTimeout);
          wholeSaleNeedsUpdateTimeout = setTimeout(
            (t) => {
              const el = $(".product-details__product-price");
              el && priceChanged(el);
            },
            1
          );
        }
      }
    );
    function priceChanged(el) {
      if (priceChanging) {
        return;
      }
      if (!Ecwid.formatCurrency) {
        setTimeout((t) => priceChanged(el), 50);
        return;
      }
      priceChanging = true;
      logDuration("PRICE", "Adjusting prices...")();
      let productId = currentPage?.productId;
      promiseCartAndPid(productId).then(
        (values) => {
          let cartTotal = values[0] || {
            total: 0
          }, product = values[1];
          let e = $(el);
          let currentAddToCartQuantity = $(".details-product-purchase__qty input:first").val() || 1;
          currentAddToCartQuantity = currentAddToCartQuantity <= 0 ? 1 : currentAddToCartQuantity;
          const po = $(".details-product-options");
          const currentProductId = currentPage?.productId;
          var vatPercent = $(".details-product-price-tax__name").text().match(/.*\(([0-9]+)%.*/im);
          var vp = 0;
          var selectedOptionsPriceWithoutDiscounts = 0;
          var selectedOptionsPrice = 0;
          var selectedOptionsPriceWithDiscounts = [];
          const wholesalePricesDiscounts = [new WholeSalePrice(1, 1, product.price, product.compareToPrice, cartTotal.total), ...(product.wholesalePrices || []).map((w2) => new WholeSalePrice(w2.quantity, w2.quantity, w2.price, product.compareToPrice, cartTotal.total))];
          const choicesWPMap = {};
          wholesalePricesDiscounts.every(
            (w2, i) => {
              const lw = wholesalePricesDiscounts[i - 1];
              const lastItem = currentAddToCartQuantity > w2.quantity && i == wholesalePricesDiscounts.length - 1;
              if (i && currentAddToCartQuantity > lw.quantity && currentAddToCartQuantity < w2.quantity || lastItem) {
                wholesalePricesDiscounts.splice(lastItem ? i + 1 : i, 0, new WholeSalePrice(currentAddToCartQuantity, currentAddToCartQuantity, w2.price, product.compareToPrice, cartTotal.total));
                return false;
              }
              return true;
            }
          );
          const wp = wholesalePricesDiscounts.findLast((lw) => lw.quantity <= currentAddToCartQuantity);
          product?.options?.forEach(
            (o) => {
              const hasCurrentProductIdAsOption = !!o?.choices?.find((c) => c.textTranslated?.cy?.id == currentProductId);
              o?.choices?.forEach(
                (c) => {
                  const dataLinkedProduct = c.textTranslated?.cy;
                  const input = po.find(`input[value="${CSS.escape(c.text)}"][name="${CSS.escape(o.name)}"]`);
                  const isAbsolute = c.priceModifierType == "ABSOLUTE";
                  const lp = knownProductSlugs[dataLinkedProduct?.id];
                  const lwp = lp?.wholesalePrices || [];
                  if (!lwp.length || !lwp.find((lw) => lw.quantity == 1)) {
                    lwp.splice(0, 0, new WholeSalePrice(1, 1, isAbsolute ? lp?.price || c.priceModifier || 0 : (lp?.price || 0) * c.priceModifier, lp?.compareToPrice || 0, cartTotal.total));
                  }
                  const cwp = lwp.findLast((lw) => lw.quantity <= currentAddToCartQuantity) || {
                    price: lp?.price || c.priceModifier || 0,
                    quantity: 1
                  };
                  choicesWPMap[`${o.name}.${c.text}`] = new WholeSalePrice(currentAddToCartQuantity, currentAddToCartQuantity, wp.price, product.compareToPrice, cartTotal.total, isAbsolute ? lp?.compareToPrice || lp?.price || c.priceModifier || 0 : (product.compareToPrice || product.price) * c.priceModifier || 0, cwp.price);
                  if (input.is(":checked")) {
                    const isSelf = c.textTranslated?.cy?.id == currentProductId;
                    if (!hasCurrentProductIdAsOption) {
                      wholesalePricesDiscounts.forEach(
                        (w2, index) => {
                          const wcp = lwp.findLast((lw) => lw.quantity <= w2.quantity) || {
                            price: lp?.price || c.priceModifier || 0,
                            quantity: 1
                          };
                          w2.selectedOptionsDiscountedPrice += wcp?.price || 0;
                          w2.selectedOptionsReferencePrice += isAbsolute ? lp?.compareToPrice || lp?.price || c.priceModifier : (product.compareToPrice || product.price) * c.priceModifier;
                        }
                      );
                      const optionWholePriceBasedOnCurrentQuantity = lwp.findLast((lw) => lw.quantity <= currentAddToCartQuantity) || {
                        quantity: currentAddToCartQuantity,
                        price: c.priceModifier
                      };
                      const optionReferencePrice = (isSelf ? 0 : isAbsolute ? Math.max(dataLinkedProduct?.cp || 0, c.priceModifier || 0) : Math.max(dataLinkedProduct?.cp || 0, product.price || 0) * c.priceModifier) || 0;
                      const optionPrice = (isSelf ? 0 : isAbsolute ? Math.min(optionWholePriceBasedOnCurrentQuantity?.price, c.priceModifier) : product.price * c.priceModifier) || 0;
                      selectedOptionsPriceWithoutDiscounts += optionReferencePrice;
                      selectedOptionsPrice += optionPrice;
                      selectedOptionsPriceWithDiscounts.push({
                        cp: optionReferencePrice,
                        p: optionPrice
                      });
                    }
                  }
                }
              );
            }
          );
          const wop = wholesalePricesDiscounts.find((lw) => lw.quantity <= 1);
          const productCurrentSaleUnitPrice = product.price || 0;
          let wt = $(".product-details__product-price-wholesale");
          if (!wt.length && wholesalePricesDiscounts.length > 1) {
            wt = $(`
<div class="product-details-module product-details__product-price-wholesale">
  <div class="product-details-module__title ec-header-h6 details-product-price-wholesale__title">${translate("Buy more, save more")}</div>
  <div class="product-details-module__content product-details-module__content--indented">
    <div class="details-product-price-wholesale__container">
      <table class="details-product-price-wholesale__table">
        <thead>
          <tr class="details-product-wholesale__header">
            <td class="details-product-wholesale__column details-product-wholesale__column--qty qty">${translate("Quantity")}</td>
            <td class="details-product-wholesale__column details-product-wholesale__column--price item-price">${translate("Item")}</td>
        </tr>
        </thead>        
        <tbody>
${wholesalePricesDiscounts.filter((w2) => w2.quantity > 1).map((w2, i) => createRow("row-qty-" + w2.quantity + " row-index-" + i, "")).join("")}
        </tbody>
      </table>
    </div>
  </div>
</div>`).insertAfter(".product-details__action-panel.details-product-purchase");
          }
          let whr = $(".details-product-price-wholesale__table thead tr");
          const qtyHeader = whr.find(".details-product-wholesale__column--qty");
          if (!qtyHeader.is(".qty")) {
            qtyHeader.addClass("qty");
          }
          const wpr = $(".details-product-price-wholesale__table tbody");
          function createRow(cls, qty) {
            return `
                  <tr class="details-product-wholesale__row ${cls}">
                      <td class="details-product-wholesale__column details-product-wholesale__column--qty qty">${qty}</td>
                      <td class="details-product-wholesale__column details-product-wholesale__column--price item-price"><span class"details-product__wholesale-price notranslate"></span></td>
</tr>`;
          }
          if (!wpr.find(".one-item-price").length) {
            wpr.prepend(createRow("one-item-price", 1));
          }
          let msrp = wpr.find(".msrp-price");
          if (!msrp.length) {
            wpr.prepend(msrp = $(createRow("msrp-price", translate("MSRP"))));
          }
          const msrpTotalPrice = wop.totalReferenceWithOptionsForCurrentAddToCartQuantityFormatted;
          msrp.find(".item-price").uiNumber(wop.referencePriceFormatted, "ui-item-price", "number", 0, translate("Item price")).uiNumber(wop.selectedOptionsReferencePriceFormatted, "ui-item-option-price", "number", 1, translate("Options price") + " +").uiNumber(msrpTotalPrice, "ui-item-total-price", "number", 2, translate("Set unit price"));
          msrp.toggleClass("loaded", true);
          let wholesalePricesDiscountedUnitPrice = productCurrentSaleUnitPrice;
          $(wholesalePricesDiscounts).each(
            (index, wop2) => {
              let row = wpr.find(`.details-product-wholesale__row${":gt(" + index + "):first"}`);
              if (!row.length) {
                wpr.append(row = $(createRow("row-qty-" + wop2.quantity + " row-index-" + index, "")));
              }
              row.toggleClass("current-price", wp == wop2);
              const prevRow = row.prev();
              const total = wop2.totalWithOptionsForCurrentAddToCartQuantityWithCartTotalDiscountAppliedFormatted;
              row.toggle(prevRow.attr("total-price") != total).attr("total-price", total);
              const qty = row.find(".details-product-wholesale__column--qty").text(`${wop2.quantity}${wop2.quantity == 1 && wholesalePricesDiscounts[index + 1]?.quantity == 2 ? "" : "+"}`);
              if (!qty.is(".qty")) {
                qty.addClass("qty");
              }
              if (!row[0].clickQTY) {
                row[0].clickQTY = true;
                row.on("click", (e2) => $(".details-product-purchase__qty input").attr("maxlength", 4).attr("pattern", "\\d").attr("type", "text").attr("max", "9999").val(wop2.quantity).trigger("change").parent().find(".form-control__placeholder-inner").text(wop2.quantity) && quantityChanged());
              }
              const selectedOptionsPriceWithCartTotalDiscountApplied = wop2.selectedOptionsPriceWithCartTotalDiscountApplied;
              const showSelectedOptionsColumn = !!selectedOptionsPriceWithCartTotalDiscountApplied;
              const unitPrice = row.find(".details-product-wholesale__column--price:first");
              if (!unitPrice.is(".unit-price")) {
                unitPrice.addClass("unit-price");
              }
              unitPrice.uiNumber(msrpTotalPrice, "ui-msrp-item-price", "number", 0, translate("MSRP")).uiNumber(wop2.unitPriceWithCartTotalDiscountAppliedFormatted, "ui-item-price", "number", 1, translate("Item price")).uiNumber(wop2.selectedOptionsPriceWithCartTotalDiscountAppliedFormatted, "ui-option-price", "number", 2, translate("Options price") + " +").uiNumber(wop2.discountUnitPriceWithSelectedOptionsWithCartTotalDiscountAppliedFormatted, "ui-set-save", "number", 3, translate("You save per set")).uiNumber(wop2.discountPercentIncludingCartItemsFormatted, "ui-discount-percent", "percent", 4, "", translate("off")).uiNumber(wop2.unitPriceWithSelectedOptionsWithCartTotalDiscountAppliedFormatted, "ui-set-price", "number", 5, translate("Set unit price") + " =").uiNumber(wop2.quantity, "ui-quantity", "number", 6, translate("Quantity *"), translate(wop2.quantity == 1 ? "set" : "sets")).uiNumber(wop2.totalWithOptionsForCurrentAddToCartQuantityWithCartTotalDiscountAppliedFormatted, "ui-total-price", "number", 7, translate("Total")).uiNumber(wop2.discountAmountIncludingCartItemsFortmatted, "ui-total-save", "number", 8, translate("You save in total"));
              const discountAmount2 = row.find(".details-product__wholesale-off").uiNumber(wop2.discountAmountIncludingCartItemsFortmatted);
              if (!discountAmount2.is(".discount-amount")) {
                discountAmount2.addClass("discount-amount");
              }
              row.toggleClass("loaded", true);
            }
          );
          const tr = wpr.children("tr");
          while (tr.length - 1 > wholesalePricesDiscounts.length) {
            $(tr.splice(tr.length - 1, 1)[0]).remove();
          }
          msrp.find(".options-price,.total-price").toggle(!!wp.selectedOptionsPriceWithCartTotalDiscountApplied);
          whr.find(".options-price,.total-price").toggle(!!wp.selectedOptionsPriceWithCartTotalDiscountApplied);
          function updateProductPrices(formatPrices) {
            selectedOptionsPrice = 0;
            product?.options?.forEach(
              (o) => {
                const hasCurrentProductIdAsOption = !!o?.choices?.find((c) => c.textTranslated?.cy?.id == currentProductId);
                o?.choices?.forEach(
                  (c) => {
                    const dataLinkedProduct = c.textTranslated?.cy, input = po.find(`input[value="${CSS.escape(c.text)}"][name="${CSS.escape(o.name)}"]`), label = input.find("~ .form-control__inline-label"), parent = label.parents(".form-control--checkbox-button"), id = dataLinkedProduct?.lp || dataLinkedProduct?.id;
                    id && parent.attr("data-linked-product", id);
                    dataLinkedProduct?.id && parent.attr("data-render-product", dataLinkedProduct?.id);
                    elementsMetadata.set(parent[0], dataLinkedProduct);
                    parent.attr("data-sku", dataLinkedProduct?.s || knownProductSlugs[dataLinkedProduct?.id]?.sku);
                    parent.attr("data-weight", dataLinkedProduct?.W);
                    if (dataLinkedProduct?.is == 0) {
                      disableOption(parent.find(".form-control__radio"));
                    }
                    const isSelf = dataLinkedProduct?.id == productId;
                    {
                      var showSign = true;
                      const compareToOptionPrice = dataLinkedProduct?.cp || c.priceModifier || 0;
                      const wop2 = choicesWPMap[`${o.name}.${c.text}`];
                      const productUnitPriceWithDiscount = wop2.unitPriceWithCartTotalDiscountApplied;
                      const optionPrice = Math.min(isSelf ? productUnitPriceWithDiscount : c.priceModifier, isSelf ? product.price : hasCurrentProductIdAsOption ? wop2.unitPriceWithCartTotalDiscountApplied : wop2.selectedOptionsPriceWithCartTotalDiscountApplied);
                      var price = hasCurrentProductIdAsOption ? isSelf ? productUnitPriceWithDiscount : c.priceModifier == 0 ? !(showSign = false) && productUnitPriceWithDiscount : optionPrice : optionPrice;
                      if (hasCurrentProductIdAsOption && !isSelf && !price) {
                        price = optionPrice;
                        showSign = false;
                      }
                      var surcargeLabel = label.find(".option-surcharge__value");
                      if (!surcargeLabel.length) {
                        label.find("label").append(`<span class="option-surcharge ec-text-muted"><span class="option-surcharge__bracket">(</span><span class="option-surcharge__value"></span><span class="option-surcharge__bracket">)</span></span>`);
                        surcargeLabel = label.find(".option-surcharge__value");
                      }
                      if (formatPrices) {
                        const formattedPriceLead = (isSelf ? Ecwid.formatCurrency(Math.round(price)) : (price > 0 && showSign ? "+" : "") + Ecwid.formatCurrency(price.toFixed(0))).replace(/[.,]00 /, "");
                        surcargeLabel.uiNumber(price == 0 ? "" : formattedPriceLead, "ui-surcharge", "int", null, null, null, null, 1600);
                        const originalPrice = Math.max(c?.priceModifier || 0, compareToOptionPrice, 0);
                        if (optionPrice < originalPrice) {
                          surcargeLabel.attr("data-title", `${translate("Was")} ${strike(Ecwid.formatCurrency(originalPrice))}\r
${translate("Save")} ${Ecwid.formatCurrency(-originalPrice + optionPrice)}\r
${-Math.floor(100 - optionPrice * 100 / originalPrice)}%\r
${translate("Now")} ${Ecwid.formatCurrency(optionPrice)}`);
                        } else {
                          if (price) {
                            surcargeLabel.attr("data-title", Ecwid.formatCurrency(optionPrice));
                          }
                        }
                      } else {
                        surcargeLabel.closest(".o").attr("amount", price);
                      }
                    }
                  }
                );
              }
            );
          }
          updateComboProductBackgroundOverlay(product);
          updateProductPrices(true);
          var pc = e.parents(".product-details__product-price-row");
          let pce = pc[0];
          const cl = "product-details__product-price-row--zero-price";
          const cle = "product-details--zero-price";
          function syncProductWithZeroPriceClassChange() {
            $d.toggleClass(cl, $(".product-details__product-price-row").hasClass(cl) || $(".product-details--description-basic").hasClass(cle));
          }
          if (pce && !pce.observeClasses) {
            pce.observeClasses = true;
            pc.classChange(syncProductWithZeroPriceClassChange);
          }
          pce = $(".product-details--description-basic")[0];
          if (pce && !pce.observeClasses) {
            pce.observeClasses = true;
            pc.classChange(syncProductWithZeroPriceClassChange);
          }
          syncProductWithZeroPriceClassChange();
          if (!pc.find(".details-product-price-compare__container.product-details-module__content").length) {
            e.find(".details-product-price__value").toggleClass("price-without-discount fade-in-out", true);
            pc.append($('<div class="details-product-price-compare__container product-details-module__content"><span class="details-product-price-compare__value ec-text-muted notranslate"></span> <span class="product-details__product-price-discount"><span class="details-product-price-discount__text"></span> <span class="details-product-price-discount__value notranslate"></span></span><span class="with-discount-percent fade-in-out"> <b></b></span><span class="details-product-price__value price-with-discount fade-in-out ec-price-item notranslate"></span></div>'));
          }
          var pwd = e.find(".price-without-discount");
          var sidebar = pc.parents(".product-details__sidebar");
          var purchase = sidebar.find(".details-product-purchase");
          var inStock = purchase.find(".details-product-purchase__place");
          var inStockText = inStock.text();
          var originalPriceTaxesDiv = pc.find(".product-details__product-price-taxes:first");
          var priceTaxesDiv = pc.find(".product-details__product-price-taxes:gt(0)");
          originalPriceTaxesDiv.hide();
          if (!priceTaxesDiv.length) {
            if (!originalPriceTaxesDiv.length) {
              $(".product-details__product-price-row .product-details-module__content").append(originalPriceTaxesDiv = $("<div/>").addClass("product-details__product-price-taxes ec-text-muted notranslate"));
            }
            originalPriceTaxesDiv.after(priceTaxesDiv = $(originalPriceTaxesDiv.prop("outerHTML")).show().toggleClass("product-stock-status-and-original-price", true));
          }
          var priceInStockLabel = priceTaxesDiv.find(".in-stock-label");
          if (!priceInStockLabel.length) {
            priceInStockLabel = priceInStockLabel.length ? priceInStockLabel : $("<span />").addClass("in-stock-label").prependTo(priceTaxesDiv);
          }
          var priceWithoutDiscount = priceTaxesDiv.find(".price-without-discount");
          priceWithoutDiscount = priceWithoutDiscount.length ? priceWithoutDiscount : $("<span/>").addClass("details-product-price__value fade-in-out ec-price-item notranslate price-without-discount").appendTo(priceTaxesDiv);
          wp.currentAddToCartQuantity = currentAddToCartQuantity;
          const priceWithoutDiscountsFormatted = wp.totalReferenceWithOptionsForCurrentAddToCartQuantityFormatted;
          const discountAmount = wp.discountAmountIncludingCartItems;
          const discountAmountFormatted = wp.discountAmountIncludingCartItemsFortmatted;
          const totalFormatted = wp.totalWithOptionsForCurrentAddToCartQuantityWithCartTotalDiscountAppliedFormatted;
          const discountPercentFormatted = wp.discountPercentIncludingCartItemsFormatted;
          pwd.text(priceWithoutDiscountsFormatted);
          priceWithoutDiscount.uiNumber(priceWithoutDiscountsFormatted, "ui-price-msrp", "number", 0, "", "", "", 600);
          priceWithoutDiscount.toggleClass("show-price-without-discount", discountAmount < 0);
          priceInStockLabel.text(inStockText ? `${inStockText}. ` : "");
          pc.find(".price-with-discount").uiNumber(totalFormatted, "ui-add-to-cart-total", "number", 0, "", "", "", 600);
          $(".details-product-price-compare__value").text(Ecwid.formatCurrency(p));
          if (!pc.find(".with-discount-percent").length) {
            pc.append('<span class="with-discount-percent"></span>');
          }
          const wdp = $(".with-discount-percent");
          if (!wdp.find(" > b").length) {
            wdp.html(" <b></b>");
          }
          if (!wdp.find(" > d").length) {
            wdp.append("<d>(<v></v>)</d>");
          }
          wdp.find("> b, > d").toggle(discountAmount < 0);
          wdp.find(" > b").uiNumber(discountAmountFormatted, "ui-discount-amount", "number", 0, "", "", "", 600);
          wdp.find(" > d > v").attr("title", discountPercentFormatted).uiNumber(discountPercentFormatted, "ui-discount-percent", "percent", 0, "", "", "", 600);
          hideScreenLoading();
          logDuration("PRICE", `Adjusted prices from ${priceWithoutDiscountsFormatted} to ${totalFormatted}. Discounted: ${discountAmountFormatted} (${discountPercentFormatted}%)}`, el)();
          completedCallback && completedCallback();
        }
      ).finally((t) => priceChanging = false);
    }
    d.arrive(
      ".product-details__product-price",
      notOnceOnly,
      (elem2) => {
        var p2 = $(elem2);
        if (!p2.hasClass("price-live")) {
          p2.toggleClass("price-live", true);
          p2.classChange((elem3) => setTimeout((t) => priceChanged(elem3), 100));
          priceChanged(elem2);
        }
      }
    );
    let hasAddButtons = $(".details-product-purchase__add-buttons");
    $d.toggleClass("has-add-more-button", hasAddButtons.find(".details-product-purchase__add-more:visible"));
    d.arrive(
      ".details-product-purchase__qty",
      onceOnly,
      (elem2) => {
        if (elem2.wrapped) {
          return;
        }
        elem2.wrapped = true;
        elem2 = $(elem2);
        elem2.find("input").on("change", fixProductWeight);
        $('<div class="quantity-nav"><button class="quantity-button quantity-up">&lt;</button><button class="quantity-button quantity-down">&gt;</button></div>').insertAfter(elem2.find(".form-control__placeholder"));
        const btnUp = elem2.find(".quantity-up"), btnDown = elem2.find(".quantity-down"), input = elem2.find("input:first"), placeholder = elem2.find(".form-control__placeholder-inner"), min = input.attr("min"), max = input.attr("max") || 999;
        input.val(placeholder.text() || 1);
        function adjustValue() {
          const val = input.val() || placeholder.text() || "1";
          elem2.toggleClass("min", val == "1").toggleClass("one", val < 10).toggleClass("two", val >= 10 && val < 100).toggleClass("three", val >= 100 && val < 1e3).toggleClass("four", val >= 1e3);
        }
        input[0]?.addEventListener("change", adjustValue);
        input[0]?.addEventListener(
          "focus",
          (e) => {
            setTimeout(
              (t) => {
                if (input.val() == "") {
                  input.val(placeholder.text());
                }
              },
              1
            );
          },
          true
        );
        adjustValue();
        btnUp.click(function() {
          var oldValue = parseFloat(input.val() || placeholder.text());
          if (oldValue >= max) {
            var newVal = oldValue;
          } else {
            var newVal = oldValue + 1;
          }
          input.val(newVal).trigger("change")[0]?.dispatchEvent(new Event("change"));
          placeholder.text(newVal);
          adjustValue();
        });
        btnDown.click(function() {
          var oldValue = parseFloat(input.val() || placeholder.text());
          if (oldValue <= min) {
            var newVal = oldValue;
          } else {
            var newVal = oldValue - 1;
          }
          input.val(newVal).trigger("change")[0]?.dispatchEvent(new Event("change"));
          placeholder.text(newVal);
          adjustValue();
        });
        if (!input[0]?.listenToQuanityChange) {
          if (input[0]) {
            input[0].listenToQuanityChange = true;
          }
          input[0]?.removeEventListener("change", quantityChanged);
          input[0]?.addEventListener("change", quantityChanged);
        }
      }
    );
  }
  function uninjectPriceUpdate(selector, group, groupItem, selectorItem) {
    d.unbindArrive(".product-details__product-price");
  }
  var delayShowTimeout;
  function onOptionImageHover(e) {
    const mobileTouchEnded = this == true;
    if (e.target?.touchEndTimeout) {
      clearTimeout(e.target.touchEndTimeout);
      delete e.target.touchEndTimeout;
    }
    let elem = $(e.target);
    if (!elem.hasClass("form-control__inline-label")) {
      const el2 = elem.find(".form-control__inline-label");
      elem = el2.length ? el2 : elem.parents(".form-control--checkbox-button:first").find(".form-control__inline-label");
    }
    const el = elem[0];
    if (el) {
      const surchargeLabel = $(el).find(".option-surcharge__value"), csA = getComputedStyle(el, ":after"), csB = getComputedStyle(el, ":before"), csc = surchargeLabel[0], csC = csc && getComputedStyle(csc, ":after"), bg = csA.backgroundImage != "none", t = e.touches && e.touches[0], w2 = parseInt(csB.width) || parseInt(csB.minWidth) || 300, h2 = parseInt(csB.height) || parseInt(csB.minHeight) || 300 * 0.75, ww = (csc ? parseInt(csC.width) || parseInt(csC.minWidth) : 0) || 100, hh = (csc ? parseInt(csC.height) || parseInt(csC.minHeight) : 0) || 100 * 0.75, top = (t ? t.pageY : e.pageY - $w.scrollTop()) || 0, hasClient = "clientX" in e, clientX = (hasClient ? e.clientX : e.touches?.[0]?.clientX) || 0, clientY = (hasClient ? e.clientY : e.touches?.[0]?.clientY) || 0, iw = clientX - el.getBoundingClientRect().left + elem.outerWidth() + 15, elRect = el.getBoundingClientRect(), ih = (
        /*35 * 1.5*/
        clientY - elRect.top + elem.outerHeight() + 15
      ), pih = (
        /*35 * 1.5*/
        clientY - elRect.top + surchargeLabel.outerHeight() + 15
      ), wh = $w.height(), scrollWidth2 = 11, padding = 14, hasOffset = mobileTouchEnded || "offsetX" in e && !e?.touches?.[0], rect = hasOffset ? null : e.target.getBoundingClientRect(), offsetX = hasOffset ? e.offsetX : e.touches[0].clientX - window.pageXOffset - rect.left, offsetY = hasOffset ? e.offsetY : e.touches[0].clientY - window.pageYOffset - rect.top, shouldShow = !mobileTouchEnded && bg && offsetX > elem.width() - 64 && offsetY >= -1, currentDisplay = elem.css("--display") || "none", display = shouldShow ? "flex" : "none", mustShow = shouldShow && currentDisplay == display && display == "flex", opacity = mustShow ? 1 : 0, shouldHide = display == "none" && currentDisplay != display, ew = elem.outerWidth(), pointerX = (t ? t.pageX : e.pageX) || 0;
      let x = Math.max(0, Math.min($w.width() - w2 - padding - scrollWidth2, Math.max(iw - w2, pointerX - w2 - iw / 3))), y = Math.max(125, Math.min(wh - h2 - padding, top + h2 + ih < wh ? Math.min(top + ih - 80, wh - h2 - ih + elem.outerHeight()) : top - h2 - ih)), px = Math.max(0, Math.min(pointerX - ww / 2 - scrollWidth2, $w.width() - ww - (top - hh - ih < 65 ? 64 : 5)) - scrollWidth2), py = Math.max(0, top - hh - ih < 65 ? Math.min(top + ih - pih, wh - hh - ih - pih) : top - hh - ih + pih);
      el.ht && clearTimeout(elem.ht);
      if (shouldShow && !mustShow) {
        $(".form-control--checkbox-button .form-control__inline-label[style*='--display: flex']").each(
          (i, e2) => {
            if (e2 != el) {
              $(e2).css("--opacity", 0);
              e2.ht = setTimeout(
                (t2) => {
                  $(e2).css("--display", "none");
                  delete e2.ht;
                },
                301
              );
            }
          }
        );
        delayShowTimeout = setTimeout(
          (t2) => {
            console.log("ping reply opacity set to 1");
            elem.css("--opacity", 1);
          },
          1
        );
      }
      if (shouldHide) {
        clearTimeout(delayShowTimeout);
        x = parseInt(elem.css("--left"));
        y = parseInt(elem.css("--top"));
        px = parseInt(elem.css("--pleft"));
        py = parseInt(elem.css("--ptop"));
        el.ht && clearTimeout(el.ht);
        el.ht = setTimeout(
          (t2) => {
            elem.css("--display", "none");
            delete el.ht;
          },
          301
        );
      } else if (shouldShow) {
        if (el.ht) {
          clearTimeout(el.ht);
          delete el.ht;
        }
      }
      const style2 = `--display: ${el.ht ? "flex" : display};--opacity: ${opacity};--left: ${x}px;--top: ${y}px;--pleft: ${px}px;--ptop: ${py}px;`;
      elem.attr("style", style2);
      if (display == "block") {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }
    }
  }
  function disableOption(opt) {
    if (!opt.parent().hasClass("details-product-option--Not-included") && !opt.parent().hasClass("details-product-option--Not-Included")) {
      opt.attr("disabled", "disabled").parent().toggleClass("out-of-stock form-control--disabled", true);
    }
  }
  function markOutOfStockProductOptions(page2) {
    const currentProductId = page2 || currentPage.productId;
    if (currentPage.productId) {
      const productId = currentPage.productId;
      promiseCartAndPid(productId).then(
        (p2) => {
          p2 = p2[1];
          function disableProductOptions(formatPrices) {
            const po = $(".details-product-options");
            p2?.options?.forEach(
              (o, oi) => {
                const hasCurrentProductIdAsOption = !!o?.choices?.find((c) => c.textTranslated?.cy?.id == currentProductId);
                o?.choices?.forEach(
                  (c, ci) => {
                    const dataLinkedProduct = c.textTranslated?.cy;
                    var index = 0;
                    const label = po.find(`input[value="${CSS.escape(c.text)}"][name="${CSS.escape(o.name)}"] ~ .form-control__inline-label`), parent = label.parents(".form-control--checkbox-button");
                    (dataLinkedProduct?.lp || dataLinkedProduct?.id) && parent.attr("data-linked-product", dataLinkedProduct?.lp || dataLinkedProduct?.id);
                    dataLinkedProduct?.id && parent.attr("data-render-product", dataLinkedProduct?.id);
                    elementsMetadata.set(parent[0], dataLinkedProduct);
                    parent.attr("data-sku", dataLinkedProduct?.s || knownProductSlugs[dataLinkedProduct?.id]?.sku);
                    if (dataLinkedProduct?.is == 0) {
                      disableOption(label.parents(".form-control--checkbox-button").find(".form-control__radio"));
                    }
                  }
                );
              }
            );
          }
          disableProductOptions(false);
          let items = $(".form-control--checkbox-button .form-control__inline-label");
          function hideBeforeImage(e) {
            const target = e.target, t = $(target), ch = t.find(".form-control__inline-label"), el = t.is(".form-control__inline-label") ? target : ch[0] || t.parents(".form-control__inline-label")[0], timeout = setTimeout((t2) => onOptionImageHover.apply(true, arguments), 200);
            if (el) {
              clearTimeout(el.touchEndTimeout);
              el.touchEndTimeout = timeout;
            }
          }
          function showBeforeImage(e) {
            const target = e.target, t = $(target), ch = t.find(".form-control__inline-label"), el = t.is(".form-control__inline-label") ? target : ch[0] || t.parents(".form-control__inline-label")[0], timeout = setTimeout((t2) => onOptionImageHover.apply(this, arguments), 100);
            if (el) {
              clearTimeout(el.touchEndTimeout);
              el.touchEndTimeout = timeout;
            }
          }
          items.toArray().forEach(
            (elem) => {
              if (!elem.touchMoveEventRecorded) {
                elem.touchMoveEventRecorded = true;
                elem.parentNode.addEventListener(hasTouchEvents ? "mouseover" : "mousemove", showBeforeImage, true);
                elem.parentNode.addEventListener("touchstart", showBeforeImage, true);
                elem.parentNode.addEventListener("touchmove", showBeforeImage, true);
                elem.parentNode.addEventListener("touchend", hideBeforeImage, true);
                elem.parentNode.addEventListener("touchcancel", hideBeforeImage, true);
                elem.parentNode.addEventListener("mouseleave", hideBeforeImage, true);
                elem.parentNode.addEventListener("mouseup", hideBeforeImage, true);
              }
            }
          );
        }
      );
    }
  }
  var injectPriceHighlightingRegisteredEvent = false;
  function injectPriceHighlighting() {
    if (!injectPriceHighlightingRegisteredEvent) {
      injectPriceHighlightingRegisteredEvent = true;
      $d.on(
        "mouseup",
        ".product-details__product-options .form-control--checkbox-button",
        (event) => {
          let priceLabel = $(".product-details__product-sku, .product-details__product-price, .product-details__attraction-block, .details-product-price-tax__value, .price-without-discount, .price-with-discount, .details-product-price-compare__value, .fade-in-out").toggleClass("fade-in-fade-out");
          if (!priceLabel[0].registered) {
            priceLabel[0].registered = true;
            priceLabel.on("animationend", function() {
              $(this).removeClass("fade-in-fade-out");
            });
          }
        }
      );
    }
  }
  injectPriceHighlighting();
  var h1Header = $(".ec-page-title.ec-page-title__featured-products");
  onUnload((p2) => h1Header = null);
  onPageLoaded((p2) => h1Header = $(".ec-page-title.ec-page-title__featured-products"));
  function injectZoomOnProductDescriptionImages(page2) {
    try {
      let img = $(".product-details__description img");
      if (img.length) {
        let t = img.trigger("zoom.destroy");
        let w2 = t.wrap('<span style="display:inline-block"></span>');
        let c = w2.css("display", "block");
        let p2 = c.parent();
        if (!p2.zoom || !jQuery.fn.zoom)
          debugger;
        else
          p2.zoom({
            on: "click",
            touches: 2
          });
      }
    } catch (ex) {
      console.error("Error while injecting zoom product description images", ex);
    }
  }
  function scrollToGrid(e) {
    document.body.scrollTo({
      top: $(".grid__wrap").offset().top - 120 + document.body.scrollTop,
      behavior: "smooth"
    });
  }
  var listeningForSortRegistered = false;
  function interceptCategoryPage(page2) {
    if (["CATEGORY", "SEARCH"]?.indexOf(page2?.type) >= 0) {
      let injectGridSortPageTitle = function(elem) {
        toggleHasGridSortClass(elem);
        elem.parentNode.leave(elem, (e) => toggleHasGridSortClass());
        const $elem = $(elem).parent(), breadcrumbs = $(".ec-breadcrumbs"), categories = $(".ec-grid .grid__categories"), hasSubCategories = !!categories.length, $subCategories = $(".page-title__name.ec-header-h1").hide();
        breadcrumbs.toggleClass("has-sub-categories", hasSubCategories);
        if (hasSubCategories) {
          isInOutOfView(
            categories[0],
            (elem2, state) => {
              $(".ec-breadcrumbs").toggleClass("hidden-categories", !state.isInView).toggleClass("visible-categories", state.isInView);
            }
          );
        }
      }, toggleHasGridSortClass = function(elem) {
        const hasGridSort = !!$(elem || ".grid__sort").length;
        $d.toggleClass("has-grid__sort", hasGridSort);
      };
      if (!listeningForSortRegistered) {
        let updateSortLabel = function() {
          $(".ec-filter--sortby .ec-filter__items-applied").text($(".ec-filter--sortby .form-control__radio-wrap:has(.form-control__radio:checked) ~ .form-control__inline-label").text());
        };
        listeningForSortRegistered = true;
        $d.on(
          "change",
          "#ec-products-sort",
          (e) => {
            $(".ec-filter--sortby .ec-filter__items-applied").text($("#ec-products-sort").children("option:selected").text());
            scrollGrid__ProductsIntoView(true);
          }
        );
        $d.on("change", ".ec-filter--sortby .form-control__radio", updateSortLabel);
        d.arrive(".ec-filter--sortby", onceOnly, updateSortLabel);
      }
      d.arrive(
        ".ec-grid",
        onceOnly,
        (elem) => {
          elem = $(elem);
          elem.find(".ec-grid--title.ec-header-h1").length == 0 && elem.prepend($("<h1 class='ec-grid--title ec-header-h1'/>").text(translate("Categories")).toggle(!!$(".ec-grid .grid__categories.grid__categories--advanced").length));
        }
      );
      toggleHasGridSortClass();
      d.arrive(".grid__sort", notOnceOnlySelfUnbind, injectGridSortPageTitle);
      if (!d.mappedPagerScrolling) {
        d.mappedPagerScrolling = true;
        d.arrive(
          ".ec-pager .ec-link",
          notOnceOnly,
          (elem) => {
            if (!elem.mappedScrolling) {
              elem.mappedScrolling = true;
              elem.addEventListener("click", scrollToGrid, true);
            }
          }
        );
        d.arrive(
          ".grid-category__title",
          notOnceOnly,
          (elem) => {
            var e = $(elem);
            if (e.attr("data-category-id") == "145967046") {
              e = e.find(".grid-category__title-inner");
              const h2 = e.html();
              if (h2.indexOf("<br/>") < 0) {
                e.css("font-weight", "normal").html(h2.replace("?", "?<br/><b>") + "</b>");
              }
            }
          }
        );
        if ($d.is(".page-type-PAGE-SEARCH") || page2.type == "PAGE-SEARCH" || page2.type == "SEARCH" || page2.type == "CATEGORY") {
          $d.arrive(
            ".ec-filters",
            onceOnly,
            (elem) => {
              $(elem).classChange((elem2) => $b.toggleClass("ec-filters--opened", $(elem2).hasClass("ec-filters--opened")), "class", true);
            }
          );
        }
      }
    }
  }
  function interceptAddressPage(page2) {
    if (page2.type === "CHECKOUT_ADDRESS") {
      setTimeout(
        (w2) => {
          var soldBy = {};
          var map = {};
          let selector = "by:klcw11c email:tstnhnl invoiceNumber:jxano0b address:3a3d2hp vat:mrsrjxu reg:udat1x3 iban:k6uksav swift:buf0c9j paypal:oy8rr7w".split(" ").map(
            (id) => {
              var item = id.split(":");
              var cssClass = `.ec-form__row.ec-form__row--${item[1]}`;
              soldBy[item[0]] = $(`${cssClass} input`);
              map[item[0]] = item[1];
              return cssClass;
            }
          ).join(",");
          Ecwid.Cart.get(function(cart) {
            console.log("cart", cart);
          });
          const Dx = dx.Dx2WD;
          for (const key in soldBy)
            if (soldBy.hasOwnProperty(key)) {
              let keyword = map[key];
              ec.order.extraFields[keyword].value = Dx[key];
              soldBy[key].val(Dx[key]).attr("value", Dx[key]);
            }
          Ecwid.refreshConfig();
        },
        200
      );
    }
  }
  const initialProductId = currentPage.productId;
  if (initialProductId) {
    promiseCartAndPid(initialProductId);
  }
  function loopOnPageLoad(page2, maxLoopTries, ms) {
    if (page2.type == "SITE") {
      d.arrive(
        "#tile-footer-MNure7",
        onceOnly,
        (elem) => {
          elem = $(elem);
          if (!pageState.pageLoaded) {
            pageLoadedCompleted(page2);
          }
        }
      );
    } else if (page2.type != "PRODUCT" || $(".product-details__product-options").length) {
      pageLoadedCompleted(page2);
    } else {
      page2.tries++;
      setTimeout(loopOnPageLoad.bind(this, page2, maxLoopTries - 1), ms + 1);
    }
  }
  Ecwid.OnAPILoaded.add(
    () => {
      var _Ecwid_openPage = Ecwid.openPage;
      var currentOpenedPageKey = null;
      Ecwid.openPage = function(what, options) {
        const newKey = [what, JSON.stringify(options)].join(",");
        currentOpenedPageKey = newKey;
        Try(destroyJSV);
        hideActionBar();
        loggerTime = {};
        var t = this;
        var a = arguments;
        setTimeout(
          (t2) => {
            const currentProductId = parseInt(options?.id);
            const load360ProductCode2 = getProductCodeFromCurrentUrl(currentProductId, options?.variant);
            if (load360ProductCode2) {
              setTimeout((t3) => load360(page, load360ProductCode2), 20);
            }
            cachedCartTotalQueue = [null];
            promiseCartAndPid(currentProductId);
            if (options?.queryString?.length) {
              var ps = history.pushState;
              history.pushState = function(a2, b2, link) {
                if (options.queryString.length) {
                  link += (/[\?]/.test(link) ? "&" : "?") + options.queryString.map((k) => `${encodeURIComponent(k[0])}=${encodeURIComponent(k[1])}`).join("&");
                }
                history.pushState = ps;
                return ps.apply(history, arguments);
              };
            }
            isScrolling2 = options?.queryString?.findIndex((q) => q?.[0] == "scroll") >= 0;
            _Ecwid_openPage.apply(t2, a);
          },
          50
        );
      };
      var onPageSwitchExecuted = false;
      $w.on(
        "popstate",
        (event) => {
          if (!onPageSwitchExecuted) {
          }
        }
      );
      var currentLink = location.href;
      async function onPageSwitch(page2) {
        page2.type;
        const params = new URLSearchParams(location.search);
        const options = params.get("options");
        page2.options = options?.split(",") || [];
        Ecwid;
        if (!onPageSwitchExecuted) {
          onPageSwitchExecuted = true;
          $d.alterClass("page-type-*", "page-type-" + page2?.type);
          logDuration("PAGE", "Page navigating to", page2?.type, page2)();
          Try(onPageUnloaded, page2);
          if (/products\/account/gi.test(currentLink)) {
            const previousLink = currentLink;
            setTimeout((t) => previousLink == currentLink && onPageSwitchExecuted && ECwidOnPageLoaded(currentPage));
          }
        }
      }
      Ecwid.OnPageSwitch && Ecwid.OnPageSwitch.add(onPageSwitch);
      Ecwid.OnPageLoad.add(ECwidOnPageLoading);
      instantsite.onTileLoaded.add((t) => {
        if (/footer/i.test(t)) {
          Ecwid.OnPageLoaded.add(ECwidOnPageLoaded);
          ECwidOnPageLoaded(detectCurrentPage());
        }
      });
      if (Ecwid.getStorefrontState) {
        debugger;
        var currentState = Ecwid.getStorefrontState();
      }
      detectCurrentPage();
      function ECwidOnPageLoading(page2) {
        $d.alterClass("page-type-*", "page-type-" + page2?.type);
        pageLoadingCompleted(page2);
      }
      function ECwidOnPageLoaded(page2) {
        page2.type;
        currentLink = location.href;
        if (!page2.detected) {
          const previousPage = currentPage;
          currentPage = detectCurrentPage();
          if (currentPage.url == currentLink && previousPage?.url == currentLink && previousPage?.timestamp - currentPage.timestamp < 2e3) {
            return;
          }
        }
        if (!currentPage.type) {
          currentPage.type = page2.type;
        }
        currentPage.variationId = detectProductVariationId();
        onPageSwitchExecuted = false;
        window.page = page2;
        page2.tries = 1;
        var pageTypes = [], categories = [], productIds = [];
        const className = $(".ec-store[class*=ec-store__]").attr("class") || "";
        className.replace(/ec-store__([a-zA-Z0-9_\-]+)/gi, function(match, cat) {
          cat.replace(/category-page--(\d*)|product-page--c(\d*)/gi, (match2, cid2, pcid) => categories.push(cid2, pcid));
          cat.replace(/product-page--(\d*)/gi, (match2, pid2) => productIds.push(pid2));
          pageTypes.push(...cat.replace(/legal-page--(.*)/gi, "$1").replace(/legal-page/gi, "LEGAL TERMS").replace(/category-page/gi, "CATEGORY").replace(/product-page--c/gi, "CATEGORY--").replace(/product-page/gi, "PRODUCT").replace(/content-wrapper/gi, "").toUpperCase().split(" "));
          return match;
        });
        const l = /^(\/.?.?\/?$|^\/$)/gi.exec(location.pathname);
        const pageType2 = l ? "h page-type-SITE" : "";
        categories = categories.filter((c) => c);
        productIds = productIds.filter((p2) => p2);
        const cls = [pageType2, ...pageTypes.filter((c) => c).map((c) => "page-type-" + c)].join(" ").split(" ").filter((c) => c).join(" "), pid = productIds.join(""), cid = categories.join(",");
        $d.alterClass("page-type-*", cls);
        pid != $d.attr("productId") && (pid ? $d.attr("productId", pid) : $d.removeAttr("productId"));
        cid != $d.attr("categoryIds") && (cid ? $d.attr("categoryIds", cid) : $d.removeAttr("categoryIds"));
        logDuration("PAGE", "Page loaded", page2?.type, page2, cls)();
        loopOnPageLoad(page2, 100, 10);
      }
    }
  );
  let boundArriveGroup = {};
  function defineNonEnumerable(o, k, value, doNotOverWrite) {
    k in o ? !doNotOverWrite && (o[k] = value) : __defineProperty(o, k, {
      value,
      enumerable: false,
      writable: true,
      configurable: true
    });
  }
  function bindArriveGroup(group, selector, selfUnbindOnUnload, callbackWhenArrived, destroyCallback, callbackWhenAllArrived, existing) {
    let selectorGroup = boundArriveGroup[group] || (boundArriveGroup[group] = {});
    defineNonEnumerable(selectorGroup, "callbackWhenAllArrived", callbackWhenAllArrived);
    defineNonEnumerable(selectorGroup, "startedAt", /* @__PURE__ */ new Date(), false);
    let selectorItem = selectorGroup[selector] || (selectorGroup[selector] = {});
    let selectorFunc;
    selectorItem[callbackWhenArrived] = selectorFunc = selectorItem[callbackWhenArrived] || {
      completed: false,
      selfUnbindOnUnload,
      destroyCallback,
      whenArrive
    };
    selectorFunc.completed = false;
    defineNonEnumerable(selectorFunc, "startedAt", /* @__PURE__ */ new Date(), false);
    logDuration(true, `Injecting [${selector}]...`)();
    function whenArrive(elem) {
      callbackWhenArrived(
        elem,
        (resolved) => {
          defineNonEnumerable(selectorFunc, "completedAt", /* @__PURE__ */ new Date(), false);
          defineNonEnumerable(selectorFunc, "completedDuration", selectorFunc.completedAt - selectorFunc.startedAt, false);
          selectorFunc.completed = true;
          logDuration(selectorFunc.completedDuration, `Injecting [${selector}] completed`)();
          "completedTimeout" in selectorGroup ? clearTimeout(selectorGroup.completedTimeout) : __defineProperty(selectorGroup, "completedTimeout", {
            enumerable: false,
            writable: true,
            value: 0
          });
          selectorGroup.completedTimeout = setTimeout(
            (t) => {
              let completed = 0, all = 0;
              for (let s2 in selectorGroup) {
                let si = selectorGroup[s2];
                for (let f in si) {
                  let fv = si[f];
                  all++;
                  if (!fv.completed)
                    return;
                  completed++;
                }
              }
              defineNonEnumerable(selectorGroup, "completedAt", /* @__PURE__ */ new Date(), false);
              defineNonEnumerable(selectorGroup, "completedDuration", selectorGroup.completedAt - selectorGroup.startedAt, false);
              if (completed >= all && selectorGroup.callbackWhenAllArrived) {
                selectorGroup.callbackWhenAllArrived(group, selectorGroup, completed);
                delete selectorGroup.callbackWhenAllArrived;
              }
            },
            5
          );
        }
      );
    }
    d.arrive(selector, {
      existing,
      onceOnly: true
    }, whenArrive);
  }
  function destroyArriveGroups() {
    for (var g in boundArriveGroup) {
      let gr = boundArriveGroup[g];
      for (var s2 in gr) {
        let si = gr[s2];
        for (var f in si) {
          let fu = si[f];
          if (fu.selfUnbindOnUnload) {
            d.unbindArrive(s2, onceOnly, fu.whenArrive);
          }
          fu.destroyCallback && fu.destroyCallback(s2, g, gr, si);
          delete si[f];
        }
        delete gr[s2];
      }
      delete boundArriveGroup[g];
    }
  }
  onUnload(true, (u) => destroyArriveGroups);
  function showActionBarWhenReady(group, selectorGroup, completed) {
    completed;
    showActionBar();
  }
  function injectMenuWrapper(elem, completedCallback) {
    var menuWrapper = $(".ec-wrapper .ec-store__product-page");
    if (!menuWrapper.children(".menu-wrapper").length) {
      menuWrapper.append(svgIcons.menuWrapper());
      menuWrapper.find(".menu__item svg").each((i, elem2) => elem2.addEventListener("click", function(e) {
        var $e = $(e.target);
        console.log("clicked", e.target, $e.hasClass("menu__item"), $e[0], $e.parents(".menu__item")[0]);
        return clickItem(e, $e.hasClass("menu__item") ? $e[0] : $e.parents(".menu__item")[0]);
      }, true));
    }
    completedCallback && completedCallback();
  }
  function uninjectMenuWrapper(selector, group, groupItem, selectorItem) {
    $(".ec-wrapper .ec-store__product-page").find(".menu-wrapper, .action-buttons").remove();
  }
  function uninjectProductDetailsActionButtons(selector, group, groupItem, selectorItem) {
    $(".action-buttons .details-product-purchase__controls").remove();
  }
  function injectProductDetailsActionButtons(buttons, completedCallback) {
    var parent = $(buttons).parent();
    d.arrive(
      ".action-buttons",
      onceOnly,
      (elem) => {
        let ab = $(elem);
        if (!ab.children(".details-product-purchase__controls").length) {
          ab.append(buttons);
          parent.append(buttons.outerHTML);
        }
        completedCallback && completedCallback();
      }
    );
  }
  function bindAddToCartControls(currentProductId, pageIfAny, existing) {
    $d.arrive(
      ".ec-size",
      {
        existing: false,
        onceOnly: true
      },
      (elem) => {
        ECSizeClassChange.call(elem, elem.className);
        Try(injectMutationObserver, elem, ECSizeClassChange);
      }
    );
    onDomReady(
      (domElem) => {
        setTimeout((t) => d.arrive(
          ".ec-store__product-page",
          onceOnly,
          (el) => {
            bondAddToCartControls = true;
            bindArriveGroup("AB", ".details-product-purchase__controls", true, injectProductDetailsActionButtons, uninjectProductDetailsActionButtons, showActionBarWhenReady, existing);
            bindArriveGroup("AB", ".product-details__sidebar .product-details__product-title.ec-header-h3", true, injectMenuWrapper, uninjectMenuWrapper, showActionBarWhenReady, existing);
            Try(listenToArriveProductOptions, existing);
            Try(listenToPreepmtivePrice, currentProductId, pageIfAny, existing);
            d.arrive(
              ".product-details__product-weight",
              notOnceOnly,
              (elem) => {
                setTimeout(fixProductWeight, 200);
              }
            );
          }
        ), 300);
      }
    );
  }
  var toggleScrollToDescription = true, scrollOptionIndex = 0;
  function clickItem(e, activeItem) {
    e.stopImmediatePropagation();
    e.preventDefault();
    var $menu = $(".menu");
    var $ai = $(activeItem || this);
    $menu & $menu[0].style.removeProperty("--timeOut");
    function activateMenu(tab) {
      $d.alterClass("show-tab-*", tab);
    }
    var cls = $ai.attr("action");
    var h1 = $(".product-details__sidebar .product-details__product-title");
    switch (cls) {
      case "toggle-tab-image":
        const showingSmallImage = $d.hasClass("show-tab-small-image");
        const showingFullImage = $d.hasClass("show-tab-full-image");
        const showingImage = $d.hasClass("show-tab-image");
        let top = 0;
        let mode;
        if (showingSmallImage) {
          $d.toggleClass("show-tab-image show-tab-small-image", false).toggleClass("show-tab-full-image", true);
          top = 100;
          mode = 0;
        } else if (showingFullImage) {
          $d.toggleClass("show-tab-image", true).toggleClass("show-tab-small-image show-tab-full-image", false);
          top = $(window).scrollTop() > 0 ? 30 : 100;
          mode = 2;
        } else if (showingImage) {
          $d.toggleClass("show-tab-image show-tab-full-image", false).toggleClass("show-tab-small-image", true);
          mode = 1;
        } else {
          $d.toggleClass("show-tab-image");
          mode = "";
        }
        localStorage.setItem("show-tab-image", mode?.toString());
        updateProductImageMaxWidthBasedOnScroll(top);
        $ai.toggleClass("active");
        break;
      case "toggle-tab-warranty":
        break;
      case "toggle-tab-fav":
        $d.toggleClass("show-tab-fav");
        let fb = $(".favorite-product__button-add:visible button, .favorite-product__button-saved:visible button");
        fb.length && fb[0].click();
        break;
      case "toggle-tab-options":
        {
          const scroller = D.scrollHeight >= b.scrollHeight ? window : b, po = $(".details-product-option"), top2 = smooth, sp = scrollOptionIndex++ < po.length ? po[scrollOptionIndex - 1] : po[scrollOptionIndex = 0];
          sp.scrollIntoView(top2);
        }
        activateMenu("options");
        break;
      case "toggle-tab-description": {
        const scroller = D.scrollHeight >= b.scrollHeight ? window : b, top2 = smooth, bottom = {
          dx2: true,
          behavior: "smooth",
          block: "end"
        }, mobile = {
          actual: {
            target: $(".product-details-module.product-details__general-info")[0],
            behavior: top2
          },
          general: {
            target: $(".product-details__product-description")[0],
            behavior: top2
          }
        }, desktop = {
          general: {
            target: $(".product-details__sidebar")[0],
            behavior: top2
          },
          actual: {
            target: $($d.is(".show-tab-full-image") ? ".secondary__description" : ".product-details__product-description")[0],
            behavior: top2
          }
        }, isDesktop = $w.width() > 767.5, scroll = (isDesktop ? desktop : mobile)[toggleScrollToDescription ? "actual" : "general"];
        scroll.target.scrollIntoView(scroll.behavior);
        toggleScrollToDescription = !toggleScrollToDescription;
        activateMenu("description");
        break;
      }
      default:
        activateMenu("options");
        break;
    }
  }
  function ECSizeClassChange(cls) {
    if (!cls)
      return;
    var w2 = $d.outerWidth();
    var r = [];
    if (w2 < 414)
      r.push(" ec-size--xs");
    if (w2 < 768)
      r.push(" ec-size--s");
    if (w2 < 768)
      r.push(" ec-size--m");
    if (w2 < 1024)
      r.push(" ec-size--l");
    if (w2 < 1100)
      r.push(" ec-size--xl");
    if (w2 < 1440)
      r.push(" ec-size--xxl");
    var updatedCls = cls.replace(new RegExp(r.join("|"), "gi"), "");
    if (w2 <= 768) {
      if (!/ecwid-lte-768px/.test(updatedCls)) {
        updatedCls = updatedCls.replace(" ec-size", " ecwid-lte-768px ec-size");
      }
    } else {
      if (!/ecwid-gt-768px/.test(updatedCls)) {
        updatedCls = updatedCls.replace(" ec-size", " ecwid-gt-768px ec-size");
      }
    }
    if (cls != updatedCls) {
      this.className = updatedCls;
      console.log("Class attribute changed to:", cls, updatedCls);
    }
  }
  function PWSPDialogClassChanged(cls) {
    let isPopupOpened = /pswp--open/.test(cls);
    let wasFullScreen = $d.hasClass("jsv-full-screen");
    if (isPopupOpened && !wasFullScreen) {
      hideActionBar();
    }
    if (!isPopupOpened && wasFullScreen) {
      showActionBar();
    }
    $d.toggleClass("jsv-full-screen", isPopupOpened);
  }
  function injectMutationObserver(target, callback, attribute) {
    attribute = attribute || "class";
    var $div = $(target);
    if (!$div.length)
      return;
    var observing = false;
    var observer = new MutationObserver(
      function(mutations) {
        mutations.forEach(function(mutation) {
          if (observing)
            return;
          observing = true;
          try {
            var cls = $(mutation.target).prop(mutation.attributeName);
            callback.call(mutation.target, cls);
          } finally {
            observing = false;
          }
        });
      }
    );
    observer.observe($div[0], {
      attributes: true,
      attributeFilter: [attribute]
    });
    callback($div.attr(attribute));
  }
  window.fixFormFactor = function fixFormFactor2() {
    $(".menu").css("--timeOut", "none");
  };
  function ensureStyleElementExists(id) {
    var jsCSS = $(`#${id}`);
    if (!jsCSS.length) {
      jsCSS = $(`<style id='${id}' type='text/css'></style>`);
      $b.append(jsCSS);
    }
    return jsCSS;
  }
  var measurementTool = (fontSize) => {
    var m = $("#measure");
    let title = $("h1.product-details__product-title");
    let p2 = title.parent();
    m = m.length ? m : $("<div/>").attr("id", "measure").css({
      opacity: "0",
      "font-family": "var(--global-title-font-family-stack)",
      "font-weight": "bold",
      "font-size": "var(--product-details__product-title--font-size)",
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0
    }).wrap($("<div></div>").css({
      "font-size": p2.css("font-size"),
      "line-height": p2.css("line-height")
    })).parent().find("#measure");
    m.css({
      "font-size": fontSize,
      "padding-left": title.css("padding-left"),
      "padding-right": title.css("padding-right"),
      "line-height": $(window).scrollTop() > 0 ? "24.048px" : "29.76px"
    });
    return m;
  };
  function setProductTitleHeight(h1Height) {
    const h1 = $("h1.product-details__product-title");
    const h2 = $("div.product-details__product-title");
    let h3 = h1Height === void 0 ? h1.is(":visible") ? h1.height() : h2.height() : h1Height;
    let jsCSS = ensureStyleElementExists("js-css-product-options");
    jsCSS.text(`#tile-product-details { 
        --product-details__product-title--height: ${h3}px;
}`);
  }
  function determineProductDetailsLargeOptions(fontSize) {
    $("html").toggleClass("product-details-large-options", $(".product-details__sidebar").height() > $(window).height());
    const h1 = $("h1.product-details__product-title.ec-header-h3");
    const h2 = $("div.product-details__product-title");
    const h3 = h1.is(":visible") ? h1 : h2;
    if (h3.length) {
      var mt = measurementTool(fontSize).text(h3.text());
      setTimeout(function() {
        var estimatedFinalHeight = mt.height() || h3.height();
        setProductTitleHeight(estimatedFinalHeight);
      }, 1);
      setTimeout(setProductTitleHeight, Math.round(parseFloat(window.getComputedStyle(h1[0]).transitionDuration) * 1e3));
    }
  }
  window.determineProductDetailsLargeOptions = determineProductDetailsLargeOptions;
  function updateProductImageMaxWidthBasedOnScroll(scrollVW) {
    if ($d.hasClass("show-tab-full-image")) {
      scrollVW = 100;
    }
    var fontSize = 1 + scrollVW / 100 * (1.6 - 1);
    let jsCSS = ensureStyleElementExists("js-css-product-gallery");
    if (window.jsv) {
      stopJSV2();
      setTimeout(function() {
        spinJSV();
      }, 300);
    }
    let thumbMaxHeight = "";
    if ($(window).width() <= 1e3) {
    }
    jsCSS.text(`.show-tab-image #tile-product-details { 
                    --product-details__product-options--extra-margin-top: ${scrollVW == 100 ? 0 : (scrollVW + 22) * 3 / 4}vw;
                    --product-details__product-title--font-size: ${fontSize}em;
        } 
        ${thumbMaxHeight}`);
    determineProductDetailsLargeOptions(fontSize + "em");
  }
  updateProductImageMaxWidthBasedOnScroll($(window).scrollTop() > 0 ? 30 : 100);
  window.updateProductImageMaxWidthBasedOnScroll = updateProductImageMaxWidthBasedOnScroll;
  var isGalleryMinimized = 0;
  var isScrolling2 = true, scrollTimeout = 0;
  function processScroll() {
    var newScrollTop = $(window).scrollTop();
    if (/scroll=/i.test(location.href)) {
      history.replaceState(history.state, null, location.href.replace(/scroll=\d+/i, "scroll=" + parseInt(newScrollTop)));
    }
    if (newScrollTop >= 10 && !isGalleryMinimized) {
      isGalleryMinimized = 1;
      updateProductImageMaxWidthBasedOnScroll(30);
      determineProductDetailsLargeOptions();
    } else if (newScrollTop < 10 && isGalleryMinimized) {
      isGalleryMinimized = 0;
      updateProductImageMaxWidthBasedOnScroll(100);
      determineProductDetailsLargeOptions();
    }
  }
  window.addEventListener(
    "scrollend",
    (e) => {
      if (isScrolling2) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return;
      }
      processScroll();
    }
  );
  function splitNeedHelpMenu() {
    onDomReady(
      (domElem) => {
        $d.arrive(
          ".ins-tile__copyright",
          onceOnly,
          (elem) => {
            const email = "support@datex2.bike";
            elem = $(elem);
            const year = (/* @__PURE__ */ new Date()).getFullYear() - 2e3;
            if (!elem.find("a").length) {
              let updateToLastYear = function(duration) {
                return setTimeout((t) => elem.find("ui-number")[0]?.style.setProperty("--percent", year), duration || 1e3);
              };
              elem.html(`<span class="copy"><ui-number style="--percent:19;--prefix:' \xA9 20'" start="19" type="int" class="year"></ui-number></span><a target="_blank" class="ui-number ins-tile__link" href="mailto:${email}">${email}</a>`);
              const defaultTimeout = updateToLastYear(5e3);
              d.arrive(
                ".ec-page-buttons, .ec-cart, .price-with-discount, #tile-cover-HaXq6F, .ec-footer, .ec-confirmation__continue",
                onceOnly,
                (e) => {
                  setTimeout(
                    (t) => {
                      clearTimeout(defaultTimeout);
                      showFooter();
                      updateToLastYear();
                      hideCopyright();
                    },
                    10
                  );
                }
              );
            }
          }
        );
      }
    );
  }
  function setFooterHeight() {
    let jsCSS = ensureStyleElementExists("js-css-footer");
    const $footer = $("#tile-footer-MNure7");
    const $copyRight = $footer.find(".ins-tile__copyright");
    const $footerLinks = $footer.find(".ins-tile__links");
    const footerHeight = ($footer.css("position") == "fixed" ? $footer : $copyRight.css("position") == "fixed" ? $copyRight : $footerLinks).height() - 1;
    const menuBarFooterHeight = ($(".product-details__product-price-taxes").height() || 0) + ($(".details-product-price-compare__container").height() || 0) + ($(".menu-wrapper").height() || 0) - 1;
    const extraImages = $(".extra-images")[0];
    const extraImagesHeight = Math.max(0, ($(".product-details__sidebar")?.outerHeight() || 0) - ((extraImages?.parentNode?.scrollHeight || 0) - (extraImages?.scrollHeight || 0)) - ($(".details-gallery__images").height() || 0));
    const w2 = $w.width();
    const h2 = $w.height();
    const footerLinksHeight = $(".ins-tile__links").outerHeight() || 0;
    const footerCopyrightHeight = $(".ins-tile__copyright").outerHeight() || 0;
    const grid__sort = $(".grid__sort");
    const maxFooterHeight = footerLinksHeight + Math.max(footerCopyrightHeight, 37);
    const cartImage = 0;
    let checkoutFooterHeight = $(".ec-cart__checkout").outerHeight() || 0;
    const pageButtonsHeight = $(".ec-page-buttons:first").outerHeight() || 0;
    const videoIframeBottom = h2 - ($("#main-video").height() || 0) - 40;
    const pagerHeight = $(".ec-pager, .page-type-LEGAL .ec-page-buttons, .ec-cart.ec-cart--empty, .ec-login-form .ec-cart__checkout, .ec-resetPassword-form .ec-cart__checkout, .page-type-ACCOUNT-PAGE .ec-cart-step--signout .ec-cart-step__wrap").outerHeight() || 0;
    const h1Height = $("h1.product-details__product-title").outerHeight() || 0;
    const ecFooterHeight = Math.max($(".ec-footer").outerHeight() || 0, 0);
    const ecFooterRowHeight = Math.max($(".ec-footer__row").outerHeight() || 0, 36);
    const grid__sortWidth = grid__sort.outerWidth() || 0;
    const actionBarHeight = [0, ...$(".product-details__product-price-taxes:visible,.ec-cart__summary,.page-type-LEGAL .ecwid-productBrowser .ec-footer:visible").toArray().map((elem) => $(elem).outerHeight())].reduce((sum, x) => sum + x);
    checkoutFooterHeight = checkoutFooterHeight ? `--checkout-action-bar--height-computed: ${checkoutFooterHeight}px !important;` : "";
    const breadCrumbs = $(".ec-breadcrumbs"), breadCrumbsActualWidth = breadCrumbs.outerWidth() || 0, breadCrumbsWidth = grid__sortWidth + (breadCrumbs.width() || 0) + $(".ins-tile--product-browser .ec-size div.ecwid-productBrowser .ec-store .ec-grid--title.ec-header-h1").width() || 0, breadCrumsLonglimit = w2 - 14 - 48 - scrollWidth;
    breadCrumbs.toggleClass("long-crumbs", w2 <= 499 || breadCrumbsWidth > breadCrumsLonglimit);
    $d.toggleClass("vertical-share", w2 <= 499);
    jsCSS.text(`:root, #ecwid_body, #tile-product-details { 
            ${checkoutFooterHeight}
            --ec-pager--height: ${pagerHeight}px;
            --action-bar--height: ${actionBarHeight}px;
            --ec-breadcrumbs--actual-width: ${breadCrumbsActualWidth}px;
            --menu-bar-footer--height: ${menuBarFooterHeight}px !important;
            --ec-page-buttons--height: ${pageButtonsHeight}px !important;
            --ec-footer--height: ${ecFooterHeight}px !important;
            --ec-footer__row--height: ${ecFooterRowHeight}px !important;
            --grid__sort--width: ${grid__sortWidth}px;
            --video-iframe--bottom: ${videoIframeBottom}px;
            --product-details__product-title--height: ${h1Height}px !important;
            --extra-images--height: ${extraImagesHeight}px !important;
            --footer--links-height: ${footerLinksHeight}px  !important;
            --footer--copyright-height: ${footerCopyrightHeight}px !important;
            --footer--max-height: ${maxFooterHeight}px  !important;
            --footer--height: ${footerHeight}px !important;` + (!cartImage ? "" : `
            --cart-product-image--width: ${cartImage}px;`) + `
          --vh: ${h2} !important;
          --vw: ${w2} !important;
          --device--ratio: ${w2 / h2} !important;  
        }`);
  }
  (function() {
    const e = $("<div id='scroller'><div/></div>").css({
      overflow: "scroll",
      opacity: 0,
      width: "100dvw",
      position: "fixed",
      top: "-1px",
      height: 0
    }).appendTo($d), de = e.find("div").css("width", "100%"), u = (f) => {
      scrollWidth = e.width() - de.width();
      $d.css("--scroll", `${scrollWidth}px`).toggleClass("is-web", !!scrollWidth).toggleClass("is-mobile", !scrollWidth);
    };
    new ResizeObserver(u).observe(e[0]);
    u();
  })();
  window.addEventListener(
    "resize",
    () => {
      determineProductDetailsLargeOptions();
      setFooterHeight();
      setTimeout(setFooterHeight, 200);
      fixFormFactor();
      setTimeout(fixFormFactor, 100);
    }
  );
  setFooterHeight();
  function trimColonInCart(page2) {
    if (["CART", "ORDER_CONFIRMATION"].indexOf(page2.type) > 0) {
      var maxTries = 100;
      var i = setInterval(
        (o) => {
          let options = $(".ec-cart-option.ec-cart-option--key");
          if (options.length || maxTries-- < 0) {
            clearInterval(i);
            options.each(function(e) {
              e = $(this);
              e.text(e.text().trim().replace(/:$/, ""));
            });
            $(".ec-cart-option.ec-cart-option--value").each(function(e) {
              e = $(this);
              if (/Not included/i.test(e.text().trim()))
                e.parent().toggleClass("xhidden", 1).hide();
            });
          }
        },
        10
      );
    }
  }
  function parsePrice(price) {
    let p2 = parseInt(price?.toString()?.replace("\u2013", "-").replace(/(?!^)-|[^\d-]/g, "")) / 100;
    return p2;
  }
  var fetchCartProductsCache = {};
  function fetchCartProducts(cart, forceRefresh) {
    const key = cart.items.map((p2) => p2.product.id).join("+");
    return !forceRefresh && fetchCartProductsCache[key] || (fetchCartProductsCache[key] = Promise.all(cart.items.map((c) => fetchProduct("GET", c.product.id, FETCH_CART_PRODUCT))).then(
      (cartProducts) => {
        const map = {};
        cartProducts.forEach((p2) => map[p2.id] = p2);
        cart.items.forEach(
          (p2) => {
            p2.p = map[p2.product.id];
            p2.p.options.map(
              (o) => {
                o.selectedChoice = o.choices.find((c) => c.text == p2.options[o.name]);
                return o;
              }
            );
          }
        );
        return cartProducts;
      }
    ));
  }
  function toggleDocumentFullScreen(show360) {
    const popupOpened = !!$(".pswp.pswp--open").length;
    $d.toggleClass("pswp--open", popupOpened);
    popupOpened ? setTimeout((t) => $d.toggleClass("pswp--opened", true), 300) : $d.toggleClass("pswp--closing", true).toggleClass("pswp--opened", false) && setTimeout((t) => $d.toggleClass("pswp--closing", false), 100);
    show360 = !popupOpened ? true : !!show360;
    toggleShow360(show360);
    $d.toggleClass("jsv-swiping", !show360);
    show360 && spinJSV();
    mustEnforce360 = false;
  }
  function onCloseFullScreen(elem) {
    toggleDocumentFullScreen();
  }
  var beforeFullScreenShow360, mustEnforce360 = false;
  function detectFullScreen(elem) {
    beforeFullScreenShow360 = $d.is(".jsv-show-360");
    elem.parentNode.leave(elem, onCloseFullScreen);
    toggleDocumentFullScreen(mustEnforce360);
  }
  function closeFullScreen(elem) {
    elem.addEventListener(
      "pointerup",
      (e) => {
        $(".pswp__button--close")[0]?.click();
        e.preventDefault();
        e.stopImmediatePropagation();
      },
      true
    );
  }
  function registerZoom(elem) {
    $(elem).click(
      (e) => {
        if (jsv && $d.is(".jsv-show-360")) {
          if (jsv.zoom.currentZoomScale >= jsv.zoom.zoomMax) {
            stopJSV2();
            jsv.resetZoom(400);
            spinJSV();
          } else {
            stopJSV2();
            jsv.zoomTo(Math.min(jsv.zoom.currentZoomScale + 1, jsv.zoom.zoomMax), 0, 0, 1200);
          }
          $d.toggleClass("jsv-zoomed", jsv.zoom.isZoomed());
        } else {
        }
      }
    );
  }
  function cloneCloseAndZoomButtons(elem) {
    elem = $(elem);
    const wrapper = $b.findOrCreate(".jsv-zoom-buttons-wrapper", (e) => `<div class="jsv-zoom-buttons-wrapper"><div class="ecwid-pswp ecwid-pswp--theme-ecwid"><div class="ecwid-pswp-wrapper"/></div<</div>`).find(".ecwid-pswp-wrapper");
    wrapper.html("");
    wrapper.append(elem.find(".pswp__button--close").clone().addClass("pswp__button--clone"));
    wrapper.append(elem.find(".pswp__button--zoom").clone()).addClass("pswp__button--clone");
    wrapper.append($(".pswp__caption").clone());
  }
  var imgResizeObserverRefreshTimeout = 0;
  const imgResizeObserver = new ResizeObserver(
    (elem) => {
      clearTimeout(imgResizeObserverRefreshTimeout);
      imgResizeObserverRefreshTimeout = setTimeout(
        (t) => {
          const widths = $(".pswp__img").map((i, e) => $(e).width()).get(), max = Math.max(...widths), min = Math.min(...widths), zoom = max / min, z = parseFloat(zoom.toFixed(1)).toString().substring(0, 3);
          $(".ecwid-pswp .pswp__button--zoom").attr("data-image-zoom", z + " x");
        },
        100
      );
    }
  );
  function attachFullScreenImageResizeObsever(elem) {
    imgResizeObserver.observe(elem);
    elem.parentNode?.leave(elem, (e) => imgResizeObserver.unobserve(elem));
  }
  function injectZoom360FullScreen(page2) {
    if (page2.type == "PRODUCT") {
      $d.arrive(".pswp--open", notOnceOnlySelfUnbind, detectFullScreen);
      $d.arrive(".pswp__button--close", notOnceOnlySelfUnbind, closeFullScreen);
      $d.arrive(".pswp__button.pswp__button--zoom", notOnceOnlySelfUnbind, registerZoom);
      $d.arrive(".pswp__top-bar", notOnceOnlySelfUnbind, cloneCloseAndZoomButtons);
      $d.arrive(".pswp__img", notOnceOnlySelfUnbind, attachFullScreenImageResizeObsever);
      onUnload(
        (page3) => {
          imgResizeObserver.disconnect();
        }
      );
    }
  }
  function fixMetaOnMobile() {
    let m = $("meta[name=viewport]");
    let c = m.attr("content");
    if (!/user-scalable/i.test(c)) {
      m.attr("content", c = c + ", user-scalable=0");
    }
    if (!/user-scalable=0/i.test(c)) {
      m.attr("content", c = c.replace(/user-scalable=\w+/i, "user-scalable=0"));
    }
    if (!/maximum-scale=1.1/i.test(c)) {
      m.attr("content", c = c.replace(/maximum-scale=\d\.?\d*/, "maximum-scale=1.1"));
    }
    $('meta[name="theme-color"]').attr("content", "#2a4931").find((c2) => !$(c2).attr("media")).remove();
    $d.css({
      width: "100dvw",
      height: "100dvh"
    });
  }
  function injectCssClassWhenInView(page2, pageType2, propertyName, selector, className) {
    if (page2.type == pageType2) {
      let po = $(selector);
      if (!(propertyName in page2)) {
        page2[propertyName] = 20;
      }
      if (po.length) {
        isInView(
          po[0],
          (target) => {
            $d.toggleClass(className, true);
          }
        );
        isOutOfView(
          po[0],
          (target) => {
            $d.toggleClass(className, false);
          }
        );
      } else {
        if (--page2[propertyName] > 0) {
          setTimeout(injectCssClassWhenInView.apply(this, arguments), 100);
        }
      }
    }
  }
  function injectDetectProductOptionsInView(page2) {
    injectCssClassWhenInView(page2, "PRODUCT", "__poDetectTrials", ".product-details__product-options", "show-tab-options");
  }
  function injectDetectProductDetailsInView(page2) {
    injectCssClassWhenInView(page2, "PRODUCT", "__pdDetectTrials", ".product-details__description", "show-tab-description");
  }
  function FavouriteProductChanged(cls) {
    $d.toggleClass("show-tab-fav", /favorite-product--saved/i.test(cls));
  }
  function injectLanguagesMenu() {
    d.arrive(
      ".ins-header__sidebar-menu-inner",
      onceOnly,
      (menuBar) => {
        if (!$(".lang-menu-mobile").length) {
          return;
        }
        menuBar = $(menuBar);
        let langMenu = $(`<div class="lang-menu-mobile ins-header__sidebar-menu-link menu-language ins-header__sidebar ins-header__sidebar--menu"><a class="ins-header__sidebar-menu-link-title language-title" target="_self"><div class="ins-header__sidebar-menu-link-icon"></div></a><div class="ins-header__submenu sub-menu-languages ins-header__language ins-header__language--row ins-header__language--mobile"></div></div>`);
        menuBar.prepend(langMenu);
        let icon = $(".ins-header__language--switch svg");
        icon = icon.length ? icon[0].outerHTML : null;
        icon && langMenu.find(".language-title").append(icon);
        langMenu.on("click", function() {
          $(this).toggleClass("ins-header__sidebar-menu-link--open");
        });
        let menu = langMenu.find(".sub-menu-languages");
        menu.append($(".ins-header__language.ins-header__language--row"));
      }
    );
    var currentLanguage = ($d.attr("lang") || "en").toUpperCase();
    $(".ins-header__language-link, .ins-header__language .ins-header__language-mark").each(
      (i, l) => {
        l = $(l);
        let lang = l.text();
        l.toggleClass(lang, 1);
        currentLanguage == lang && l.toggleClass("lang-active");
      }
    );
  }
  function injectLanguagesMenuOnDesktop(page2) {
    d.arrive(".ins-header__language + .ins-header__dropdown, .ins-header__language + .ins-header__dropdown + .ins-header__dropdown", {
      existing: true
    }, function(dd) {
      var currentLanguage = ($d.attr("lang") || "en").toUpperCase();
      $(".ins-header__language-mark").each(
        (i, l) => {
          l = $(l);
          let lang = l.text();
          l.toggleClass(lang, true);
          const p2 = l.parent()[0];
          p2?.addEventListener(
            "click",
            (e) => {
              const regex = /^[/](..$|..\/)?/gi;
              const newLang = `/${lang.toLowerCase()}`;
              const replace = regex.test(location.pathname);
              var newPath = replace ? location.pathname.replace(regex, newLang + "/") : newLang + location.pathname;
              if (newPath.endsWith("/")) {
                newPath = newPath.substring(0, newPath.length - 1);
              }
              newPath = location.protocol + "//" + location.host + newPath + location.search + location.hash;
              e.stopImmediatePropagation();
              e.stopPropagation();
              e.preventDefault();
              stopJSV2();
              location.href = newPath;
              return false;
            },
            true
          );
          currentLanguage == lang && l.toggleClass("lang-active");
        }
      );
    });
    d.arrive(
      ".ins-header__dropdown.ins-header__dropdown--first",
      notOnceOnly,
      (elem) => {
        const images = [], jsCSS = ensureStyleElementExists("menu-css-header");
        $(elem).find(".ins-header__dropdown-link .ins-header__dropdown-link-title").each(
          (i, e) => {
            e = $(e);
            const slug = e.attr("href").replace(`${location.protocol}//${location.host}`, "").replace(/\/products\/?/i, "") || "/";
            const c = knownCategorySlugs[slug];
            images.push(c?.thumbnailUrl);
          }
        );
        const css = images.map((url, i) => !url ? url : `.ins-header__menu .ins-header__dropdown-link:nth-child(${i + 1}) .ins-header__dropdown-link-title::before { background-image: url('${url}'); }`).filter((url) => url).join("\n");
        jsCSS.text(css);
      }
    );
  }
  function injectClickingOnMenuButton(page2) {
    d.arrive(
      ".ins-header__icon--burger",
      onceOnly,
      (elem) => {
        $(elem).on("click", injectLanguagesMenu);
      }
    );
  }
  function injectLegalLinksKeepLanguage(page2) {
    $(".ins-header__menu-link-title").each(
      (i, l) => {
        const $l = $(l);
        i = $l.attr("href");
        i = i.replace(/(datex2wd|datex2)\.bike\/en\//i, location.hostname + "/" + location.pathname.substring(1).split("/")[0] || "en");
        if (i?.startsWith("#") && !l.fixedHash) {
          l.fixedHash = true;
          l.addEventListener(
            "click",
            (e) => {
              location.href = i;
              e.stopImmediatePropagation();
            },
            true
          );
        }
        $l.attr("href", i);
      }
    );
  }
  var randomId = "__xyz", randomIndex = 0;
  $.extend({
    replaceTag: function(currentElem, newTagObj, keepProps) {
      var $currentElem = $(currentElem);
      var id = $currentElem.attr("id");
      var newId = randomId + randomIndex++;
      var $newTag = $(`<${newTagObj}/>`);
      if (keepProps) {
        const newTag = $newTag[0];
        newTag.className = currentElem.className;
        for (var i = currentElem.attributes.length - 1; i >= 0; i--) {
          const attr = currentElem.attributes[i];
          if (attr) {
            newTag.setAttribute(attr.name, attr.value);
          }
        }
      }
      $newTag.attr("id", newId);
      $currentElem.wrapAll($newTag);
      $currentElem.contents().unwrap();
      $newTag = $(`#${newId}`);
      return $newTag;
    }
  });
  $.fn.extend({
    replaceTag: function(newTagObj, keepProps) {
      var r = [];
      this.each(function() {
        var clone = jQuery.replaceTag(this, newTagObj, keepProps);
        r.push(clone);
      });
      return r.length == 0 ? $(r) : r.reduce($.merge);
    }
  });
  function injectPartnerLinksOnHomePage(page2) {
    if (page2.type == "SITE") {
      var map = {
        "\u1D07\u029F\u1D07\u1D04\u1D1B\u0280\u026A\u1D04 \u1D00\u029F\u029F \u1D21\u029C\u1D07\u1D07\u029F": "https://electricallwheel.com/products/datex2-30a-universal-dual-battery-dual-output-discharge-balancer-kit-bullet-t-plug-xt60?cgkit_search_word=datex2.bike&utm_source=datex2.bike&utm_medium=referral",
        "\uA731\u1D18\u1D00\u0280\u1D0B \u1D04\u028F\u1D04\u029F\u1D07\uA731": "https://www.sparkcycleworks.com/index.php/product/battery-blender?utm_source=datex2.bike&utm_medium=referral",
        "\u1D0D\u1D00\u1D1B\u1D07 \u0299\u028F \u1D0D\u1D07": "http://fb.com/MATEbyME&utm_source=datex2.bike&utm_medium=referral",
        "x-\u1D1B\u1D07\u1D0D\uA731": "https://x-tems.com?utm_source=datex2.bike&utm_medium=referral",
        "\u1D07\u1D20\u1D0F\u029F\u1D1C\u1D1B\u026A\u1D0F\u0274 \u1D04\u028F\u1D04\u029F\u1D07\uA731": "https://evolution-cycles.je?utm_source=datex2.bike&utm_medium=referral",
        "\u1D0D\u1D00\u1D1B\u1D07": "https://MATE.bike?utm_source=datex2.bike&utm_medium=referral"
      };
      d.arrive(
        "#tile-feature-list-fCUjR6 div.ins-tile__feature-title",
        {
          existing: true
        },
        (elem) => {
          elem = $(elem);
          if (elem.hasClass("processed")) {
            return;
          }
          elem.toggleClass("processed", true);
          let name = elem.text();
          let url = map[name];
          elem.parent().find("div.ins-tile__feature-title, div.ins-tile__feature-description, div.ins-tile__feature-icon").each(
            (i, p2) => {
              var o2 = $(p2).replaceTag("a", true);
              o2.attr({
                href: `${url}`,
                target: "_blank"
              }).addClass("partner");
            }
          );
          var o = $().filter(function() {
            return $(this).text() == name;
          }).replaceTag("a", true);
          o.attr({
            href: `${url}`,
            target: "_blank"
          }).addClass("partner");
          o = $(`.ins-tile__feature-title:contains('${name}')`).filter(function() {
            return $(this).text() == name;
          }).map((i, p2) => $(p2).parent().find("svg").wrap($("<a />").attr({
            href: `${url}`,
            target: "_blank"
          }).addClass("partner-icon")));
        }
      );
    }
  }
  function injectVideoOnHomePage(page2) {
    if (page2.type == "SITE") {
      let injectVideoInPage = function(elem) {
        logDuration("Player - injected into page")();
      };
      if ("orientation" in screen) {
        window.screen.orientation.onchange = function() {
          if (this.type.startsWith("landscape") && document.body.webkitRequestFullScreen) {
            document.body.webkitRequestFullscreen({
              navigationUI: "hide"
            });
          } else {
            if (document.webkitCancelFullScreen) {
              document.webkitExitFullscreen();
            }
          }
        };
      }
      logDuration("Player - listening for element")();
      d.arrive(
        "#tile-cover-HaXq6F .ins-tile__spacer, #tile-cover-HaXq6F .video-wrapper",
        notOnceOnly,
        (elem) => {
          logDuration("Player - element arrived")();
          elem = $(elem);
          const hasVideoWrapper = elem.is(".video-wrapper") ? elem : elem.find(".video-wrapper");
          const wrapper = $(`<div class="ins-tile__spacer-added"></div>`), videoWrapper = hasVideoWrapper.length ? hasVideoWrapper : $(`<div class="video-wrapper"></div>`);
          if (!hasVideoWrapper.length) {
            elem.toggleClass("ins-tile__spacer", false).toggleClass("video-container", true).append(wrapper, videoWrapper);
            wrapper.find(".ins-tile__spacer-added").toggleClass("ins-tile__spacer", true);
          }
          initializeVideo(videoWrapper[0]);
          elem = $("#tile-cover-HaXq6F")[0];
          $(elem).hasClass("ins-tile--shown") ? injectVideoInPage(elem) : $(elem).classChange(
            (elem2, attributeName, observer) => {
              logDuration("Player - element shown")();
              if ($(elem2).hasClass("ins-tile--shown")) {
                observer.disconnect();
                injectVideoInPage(elem2);
              }
            }
          );
        }
      );
    }
  }
  function hideCopyright() {
    setTimeout(
      (t) => {
        $d.toggleClass("hiding-copyright", true);
        setTimeout((t2) => $d.toggleClass("hidden-copyright", true).toggleClass("hiding-copyright", false), 1e3);
      },
      6e3
    );
  }
  function categoryPageInit(page2) {
    if (page2?.type === "CATEGORY" || page2?.type == "SEARCH") {
      hideCopyright();
      showActionBarWhenReady();
    }
  }
  function injectAddToCartIcon(page2) {
    if (page2?.type == "PRODUCT" || $(".ecwid-productBrowser-ProductPage".length)) {
      if (!$d.purchaseButtonBound) {
        $d.purchaseButtonBound = true;
        d.arrive(
          ".details-product-purchase__add-to-bag button,.details-product-purchase__add-more button",
          notOnceOnly,
          (elem) => {
            var e = $(elem).find("svg").attr({
              viewBox: "10 0 64 86",
              width: 68,
              height: 40
            }).addClass("icon")[0];
            e.innerHTML = $(svgIcons.addToCartIcon())[0].innerHTML;
            elem.removeEventListener("click", clickAddToCart, true);
            elem.addEventListener("click", clickAddToCart, true);
          }
        );
      }
    }
  }
  function fixLoginButtons(page2) {
    if (page2.type in {
      ACCOUNT_ROOT: 1,
      ACCOUNT_REGISTRATION: 1,
      ACCOUNT_RESET_PASSWORD: 1,
      TERMS: 1
    }) {
      let elementArrived = function(elem) {
        $(elem).toggleClass("form-control__button form-control__button--icon-center", true).parent().toggleClass("form-control form-control--button form-control--large form-control--secondary form-control--flexible form-control--animated form-control--done ec-cart__button", true);
      };
      d.unbindArrive(elementArrived);
      d.arrive(".ec-resetPassword-form .ec-cart__buttons+.ec-page-links .ec-link, .ec-register-form .ec-cart__buttons+.ec-page-links .ec-link, .ec-login-form .ec-cart__buttons+.ec-page-links .ec-link", notOnceOnlySelfUnbind, elementArrived);
      setTimeout(showActionBar, 10);
    }
  }
  function injectMeteors(page2) {
    if (page2.type == "SITE") {
      $(svgIcons.meteors()).prependTo(d.body);
      window.ai_background = new FD23("bkFrame", {
        resolutionScale: "0.5",
        maxFps: "60"
      });
      setTimeout((t) => $(".green-bg").toggleClass("green-bg-visible", true), 10);
    }
  }
  function detectOrderNumber(page2) {
    if (page2.type == "ORDER_CONFIRMATION") {
      window.orderId = page2.vendorOrderNumber;
    }
  }
  function detectPorductOptionsTextValues(page2) {
    if (page2.type == "PRODUCT") {
      var qs = new URL(location).searchParams;
      qs.forEach(
        (value, key) => {
          if (key.startsWith("po--")) {
            let selector = ".details-product-option--" + $.escapeSelector(key.substring(4).replace(/ /g, "-")) + " input";
            let elem = $(selector).val(value);
            elem && elem[0] && elem[0].dispatchEvent(new Event("input"));
          }
        }
      );
    }
  }
  async function clickAddToCart(e) {
  }
  var style = $("#js-cart-checkout");
  style.length || (style = $("<style/>").attr("id", "js-cart-checkout").appendTo($b));
  var checkoutFooterActionButtonResizedTimeout = 0;
  const checkoutFooterActionButtonResizedObserver = new ResizeObserver(checkoutFooterActionButtonResized);
  function monitorElementArrived(elem) {
    clearTimeout(checkoutFooterActionButtonResizedTimeout);
    elem.addEventListener("click", (e) => isScrolling2 = true, true);
    const $elem = $(elem);
    if ($elem.is(".ec-filters__body.ec-form__row--continue"))
      return;
    if ($elem.is(".form-control--done.form-control--primary") && !$(".ecwid-productBrowser-CartPage,.ecwid-productBrowser-ProductPage").length) {
      elem = $elem.parent().parent().addClass("ec-form__row--continue")[0];
    }
    if (!elem.observing) {
      elem.observing = true;
      checkoutFooterActionButtonResizedObserver.observe(elem);
    }
    checkoutFooterActionButtonResizedTimeout = setTimeout(checkoutFooterActionButtonResized, 10);
  }
  var checkoutFooterActionButtonResizedTimeout = 0;
  function checkoutFooterActionButtonResized(elem) {
    clearTimeout(checkoutFooterActionButtonResizedTimeout);
    checkoutFooterActionButtonResizedTimeout = setTimeout(
      (t) => {
        const site = $("#ec-instantsite");
        const menuWrapper = site.find(".menu-wrapper").outerHeight() || 0;
        const cartCheckout = site.find(".ec-cart__checkout,.ec-confirmation__continue:first").outerHeight() || 0;
        const rowContinune = site.find(".ec-form__row--continue:visible:not(.ec-filters):not(.ec-filters__body):not(.ec-openable-block):not(.ec-openable-block__wrap):not(.ec-openable-block__wrap-inner)").outerHeight() || 0;
        const checkoutHeight = menuWrapper || cartCheckout || rowContinune;
        const priceTaxes = site.find(".product-details__product-price-taxes").outerHeight() || 0;
        const priceContainer = site.find(".details-product-price-compare__container").outerHeight() || 0;
        const legalPageButtons = site.find(".ec-store__legal-page .ec-page-buttons").outerHeight() || 0;
        const cert = site.find(".cart__body .ec-cart__cert").outerHeight() || 0;
        const mb2 = site.find(".ec-form--mb2").outerHeight() || 0;
        const cartSummary = $(".ec-cart__summary").outerHeight() || 0;
        const summaryHeight = cartSummary + priceTaxes + priceContainer + legalPageButtons + cert + mb2;
        style.text(`
:root, #tile-product-details {
  --ec-cart__checkout--height: ${checkoutHeight}px;
  --ec-cart__summary--height: ${summaryHeight}px;
  --ec-cart__action-bar--height: ${checkoutHeight + summaryHeight}px
}`);
      },
      10
    );
  }
  function disconnectCheckoutFooterActionButtonResizedObserver(page2) {
    checkoutFooterActionButtonResizedObserver.disconnect();
  }
  function isCartSummaryPage(page2) {
    const isCartSummary = ["CART", "CHECKOUT_ADDRESS", "CHECKOUT_DELIVERY", "CHECKOUT_TAX_INFORMATION", "CHECKOUT_PAYMENT_DETAILS", "ORDER_CONFIRMATION", "ACCOUNT"].indexOf(page2?.type?.toUpperCase()) >= 0;
    return isCartSummary;
  }
  function isOrderConfirmationPage(page2) {
    const isOrderConfirmation = ["ORDER_CONFIRMATION", "ACCOUNT"].indexOf(page2?.type?.toUpperCase()) >= 0;
    return isOrderConfirmation;
  }
  function adjustFooterActionBarHeight(page2) {
    onDomReady(
      (domReady) => {
        d.unbindArrive(listenToggleSummary);
        d.unbindArrive(monitorElementArrived);
        d.arrive(".ec-cart-item__image", onceOnlySelfUnbind, setFooterHeight);
        d.arrive(".ec-cart__summary", notOnceOnlySelfUnbind, listenToggleSummary);
        const localStorageKey = "cart-total-collapsed";
        function listenToggleSummary(elem) {
          if (!elem.boundToggleSummary) {
            elem.boundToggleSummary = 1;
            elem.addEventListener("click", toggleSummary, true);
          }
          $d.toggleClass("cart-summary-collapsed", localStorage[localStorageKey] == "1");
        }
        function toggleSummary() {
          localStorage.setItem(localStorageKey, $d.toggleClass("cart-summary-collapsed").is(".cart-summary-collapsed") ? "1" : "0");
        }
        const monitorElements = "#ec-instantsite .ec-cart__checkout, .ec-cart__summary, #ec-instantsite .ec-form__row--continue, .ec-confirmation__continue, #ec-instantsite .form-control--done.form-control--primary, #ec-instantsite .product-details__product-price-taxes, #ec-instantsite .details-product-price-compare__container, #ec-instantsite .menu-wrapper, #ec-instantsite .ec-store__legal-page, #ec-instantsite .ec-page-buttons, #ec-instantsite .ec-cart__cert, #ec-instantsite .ec-form--mb2";
        onUnload(disconnectCheckoutFooterActionButtonResizedObserver);
        d.arrive(monitorElements, notOnceOnlySelfUnbind, monitorElementArrived);
        checkoutFooterActionButtonResizedTimeout = setTimeout(checkoutFooterActionButtonResized, 10);
      }
    );
  }
  Try(adjustFooterActionBarHeight, currentPage);
  function injectFooterInViewObserver() {
    onDomReady(
      (domReadyElem) => {
        d.arrive(
          "footer.ins-tile--footer",
          {
            existing: true,
            uniqueOnly: true
          },
          (elem) => {
            const footerInView = isInView(
              elem,
              (e) => {
                $d.toggleClass("footer-visible", true);
              }
            );
            const footerOutOfView = isOutOfView(
              elem,
              (e) => {
                $d.toggleClass("footer-visible", false);
              }
            );
          }
        );
      }
    );
  }
  injectFooterInViewObserver();
  function listenToArriveProductOptions(existing) {
    d.unbindArrive(injectProductDetails);
    d.arrive(".details-product-options", {
      existing,
      onceOnly: false
    }, injectProductDetails);
  }
  let bondAddToCartControls = false;
  bindAddToCartControls(initialProductId, currentPage, true);
  const filterByCategoryIds = {};
  const oldCategoryIds = [];
  function detectCategoryIds() {
    const search = new URLSearchParams(location.search);
    const query = search.get("categories");
    const askingCategoryIds = query?.split(",") || [];
    for (var i = 0; i < askingCategoryIds.length; i++) {
      if (!oldCategoryIds.includes(askingCategoryIds[i])) {
        oldCategoryIds.push(askingCategoryIds[i]);
      }
    }
    for (var i = oldCategoryIds.length; i--; ) {
      if (!askingCategoryIds.includes(oldCategoryIds[i])) {
        oldCategoryIds.splice(i, 1);
      }
    }
    const newQuery = oldCategoryIds.join(",");
    if (newQuery != query) {
      search.set("categories", newQuery || null);
      if (!newQuery) {
        search.delete("categories");
      }
      const qs = search.toString().replace(/%2C/g, ",");
      history.replaceState(null, "", location.pathname + "?" + qs);
    }
    const categoryIds = [0, ...[...oldCategoryIds].reverse()];
    const categoriesToBeChecked = categoryIds.map((cid) => knownCategorySlugs[cid]);
    categoriesToBeChecked.forEach(
      (cp, filterOrder) => {
        const flattenCategories = cp?.id ? [...cp.flattenCategories, cp] : [cp];
        flattenCategories.forEach(
          (c, i2) => {
            Object.forEach(
              c?.products,
              (p2) => {
                const orderBy = filterOrder * 1e9 + p2.orderBy;
                if (p2 == "604828319" || p2 == "553033002") {
                  console.log("order:", p2, orderBy);
                }
                filterByCategoryIds[p2.product.id] = orderBy;
              }
            );
          }
        );
      }
    );
  }
  var lastUpdatedPriceForProductId = null;
  function listenToPreepmtivePrice(productId, page2, existing) {
    if (lastUpdatedPriceForProductId != productId && (!page2 || page2.type == "PRODUCT")) {
      lastUpdatedPriceForProductId = productId;
      d.unbindArrive(injectPriceUpdate);
      bindArriveGroup("AB", ".product-details__product-price-row", true, injectPriceUpdate, uninjectPriceUpdate, showActionBarWhenReady, existing);
    }
  }
  const load360ProductCode = getProductCodeFromCurrentUrl();
  load360ProductCode && setTimeout((t) => load360(currentPage, load360ProductCode), 20);
  toggleShow360(false);
  $d.addClass("jsv-swiping");
  switch (localStorage.getItem("show-tab-image")) {
    case "1":
      $d.alterClass("show-tab*image", "show-tab-small-image");
      break;
    case "2":
      $d.alterClass("show-tab*image", "show-tab-image");
      break;
    default:
      $d.alterClass("show-tab*image", "show-tab-full-image");
      break;
  }
  Try(fixMetaOnMobile);
  function updateFooterHeight() {
    window.setFooterHeight = setFooterHeight;
    onDomReady(
      (domElem) => {
        var breadcrumbsResizeObserver = null, footer__rowObserver = null, ecPagerObserver = null;
        d.arrive(
          ".ec-breadcrumbs",
          notOnceOnly,
          (elem) => {
            if (breadcrumbsResizeObserver) {
              breadcrumbsResizeObserver.disconnect();
            }
            const e = $(elem).children(), l = e.length;
            e.each((i, el) => $(el).css("order", l - i));
            breadcrumbsResizeObserver = new ResizeObserver((t) => setTimeout(setFooterHeight, 0));
            breadcrumbsResizeObserver.observe(elem);
            setFooterHeight();
          }
        );
        ecPagerObserver = new ResizeObserver((t) => setTimeout(setFooterHeight, 0));
        d.arrive(
          ".ec-pager, .ec-page-buttons, .ec-cart.ec-cart--empty, .ec-resetPassword-form .ec-cart__checkout, .ec-login-form .ec-cart__checkout, .page-type-ACCOUNT-PAGE .ec-cart-step--signout .ec-cart-step__wrap",
          notOnceOnly,
          (elem) => {
            elem.parentNode.leave(
              elem,
              (removedElem) => {
                ecPagerObserver.unobserve(removedElem);
                setFooterHeight();
              }
            );
            ecPagerObserver.observe(elem);
            setFooterHeight();
          }
        );
        d.arrive(
          ".footer__link--all-products",
          notOnceOnly,
          (elem) => {
            elem.addEventListener(
              "click",
              (e) => {
                if (elem.href == location.origin + location.pathname) {
                  $(".grid-sort__item--filter")?.[0]?.click();
                }
              },
              true
            );
          }
        );
        d.arrive(
          ".ec-footer__row",
          onceOnly,
          (elem) => {
            if (footer__rowObserver) {
              footer__rowObserver.disconnect();
            }
            footer__rowObserver = new ResizeObserver((t) => setTimeout(setFooterHeight, 0));
            footer__rowObserver.observe(elem);
            setFooterHeight();
          }
        );
      }
    );
  }
  updateFooterHeight();
  $d.on(
    "click",
    ".details-product-price-wholesale__title",
    (e) => {
      localStorage.setItem("wholesale", localStorage.getItem("wholesale") == "1" ? "0" : "1");
      unfoldWholeSale();
    }
  );
  $d.on(
    "click",
    ".ec-breadcrumbs",
    async (e) => {
      if ($(e.target).is(".ec-breadcrumbs") && $d.is(".page-type-PRODUCT")) {
        try {
          await navigator.clipboard.writeText($(".ec-breadcrumbs").attr("data-sku") + "\n" + location.href);
          alert("SKU copied to clipboard");
        } catch (err) {
          alert("Failed to copy SKU to clipboard: ", err);
        }
      }
    }
  );
  function interceptFiltersChanged(page2) {
  }
  Try(injectProductOptionsTapChange);
  Try(splitNeedHelpMenu);
  var isFirstLoad = true, canShowActionBar = true, lastFilter = null;
  onPageLoading(
    (page2) => {
      canShowActionBar = false;
      Try(interceptFiltersChanged, page2);
    }
  );
  function showFooter(hide) {
    hideScreenLoading();
    $d.toggleClass("show-footer", hide === void 0 || !!hide).toggleClass("hide-footer", hide != void 0 && !hide);
    setTimeout((t) => $(".ins-tile__footer-wrap").show(), 100);
  }
  function hideFooter() {
    showFooter(false);
  }
  w.showFooter = showFooter;
  w.hideFooter = hideFooter;
  function canShowActionBarNow() {
    if (canShowActionBar) {
      showActionBar(true);
    } else {
      canShowActionBar = true;
    }
  }
  function applySortingCssOrderChanges(gridProducts) {
    gridProducts.each((i, elem) => (elem = $(elem)).css({
      "--r": elem.css("--p"),
      "--p": ""
    }));
  }
  function sortProductsByOrder(page2) {
    if ((page2.type == "SEARCH" || page2.type == "CATEGORY") && !/^(..\/)?products\/?$/gi.test(location.path) && !$(".ecwid-productBrowser-CategoryPage-0").length) {
      detectCategoryIds();
      const order = $(".ec-products-sort").val();
      const sortByRelevance = order == "relevance";
      const filter = location.search;
      var hasChangesThatRequireTransition = lastFilter != null && lastFilter != filter;
      lastFilter = filter;
      const gridProducts = $(".grid-product").each(
        (i, elem) => {
          const productId = elem?.className?.match(/grid-product--id-(.*?)( |$)/)[1];
          const orderBy = -filterByCategoryIds[productId];
          const sort = sortByRelevance ? orderBy ? orderBy : "" : 100 - i;
          elem = $(elem);
          if (!hasChangesThatRequireTransition) {
            hasChangesThatRequireTransition = elem.css("--r") != null && elem.css("--r") != sort;
          }
          elem.css({
            "view-transition-name": `product__${productId}`,
            "--p": sort
          });
          const price = elem.find(".grid-product__price-value");
          const priceText = price.text();
          const isZero = !/[1-9]/.test(priceText);
          if (isZero || price.hasClass("zero-price")) {
            price.toggleClass("zero-price", isZero);
          }
        }
      );
      if ($w.width() > 493 && hasChangesThatRequireTransition) {
        const transition = d.startViewTransition((_) => applySortingCssOrderChanges(gridProducts));
        transition.finished.then(canShowActionBarNow);
      } else {
        applySortingCssOrderChanges(gridProducts);
        canShowActionBarNow();
      }
    } else {
      onDomReady(
        (domReadyElem) => {
          $d.arrive(
            ".grid__categories--advanced",
            onceOnly,
            (elem) => {
              const observer = isInView(
                elem,
                (e) => {
                  observer.disconnect();
                  canShowActionBarNow();
                }
              );
            }
          );
        }
      );
    }
  }
  function scrollGrid__ProductsIntoView(shouldSortOnLoad) {
    scrollToProductsGrid = !!shouldSortOnLoad;
    $(".grid__products")[0]?.scrollIntoView(smooth);
  }
  function sortProductsByOrderWhenElemArrived(elem) {
    sortProductsByOrder(page);
    if (scrollToProductsGrid) {
      scrollGrid__ProductsIntoView();
    }
  }
  function checkSortProducts(page2) {
    if (page2.type == "SEARCH" || page2.type == "CATEGORY") {
      $d.arrive(
        ".filters-sticky-bar .form-control__button",
        onceOnly,
        (elem) => {
          if (!elem.filtersScrollClickBound) {
            elem.filtersScrollClickBound = true;
            elem.addEventListener(
              "click",
              (e) => {
                scrollGrid__ProductsIntoView(true);
              },
              true
            );
          }
        }
      );
      const grid__products = $(".grid__products");
      if (grid__products.length) {
        sortProductsByOrderWhenElemArrived(grid__products[0], page2);
      } else {
        $d.arrive(
          ".grid__products",
          onceOnly,
          (elem) => {
            sortProductsByOrderWhenElemArrived(elem, page2);
          }
        );
      }
    } else {
      if (canShowActionBar) {
        showActionBar(true);
      } else {
        canShowActionBar = true;
      }
    }
  }
  function injectProductDetailsTitle(page2) {
    if (page2.type == "PRODUCT") {
      $d.arrive(
        ".details-gallery__images-zoom",
        onceOnly,
        (elem) => {
          $(elem).classChange((elem2) => $d.toggleClass("jsv-photo-scaled", $(elem2).is(".details-gallery__image-zoom-visible")));
        }
      );
      $d.arrive(
        ".product-details__product-description",
        onceOnly,
        (elem) => {
          const lang = /^(\/..)(\/.*$|$)/i.exec(location.pathname)?.[1] || "";
          $(elem).find("a").each(
            (i, a) => {
              a = $(a);
              a.attr("href", a.attr("href").replace(/^\/(DATE-BMx1)$/gi, "/DATE-BMx1-SUPER").replace(/^\/(DATE-)/gi, `${lang}/products/$1`));
            }
          );
        }
      );
      $d.arrive(
        ".product-details__product-description",
        onceOnly,
        (elem) => {
          const h3 = $(".product-details__product-title.ec-header-h3:first"), text = h3.text(), productDetails__sidebar = $(".product-details__sidebar")[0], observer = new ResizeObserver(setFooterHeight);
          observer.observe(h3[0]);
          productDetails__sidebar && observer.observe(productDetails__sidebar);
          elem = $(elem);
          $d.arrive(".product-details__gallery", onceOnly, (elem2) => $(elem2).attr("data-title", text));
          elem.attr("data-title", text);
          elem.attr("data-subtitle", $(".product-details-module.product-details__subtitle:first").text());
        }
      );
      $d.arrive(
        ".product-details--layout-sidebar-right",
        onceOnly,
        (elem) => {
          injectProductDetailsTabs(elem);
        }
      );
    }
  }
  bondAddToCartControls = injectButtons(currentPage, showActionBar, bondAddToCartControls, bindAddToCartControls);
  var scrollToProductsGrid = false;
  onPageLoaded(
    (page2) => {
      $(".ec-store").toggleClass("load", true);
      setTimeout((t) => $(".ec-store").toggleClass("loaded", true).toggleClass("load", false), 1);
      $(".ec-storefront-v3-top-scroller, .ec-store")[0]?.scrollIntoView({
        dx2: true,
        behavior: "smooth"
      });
      Try(checkSortProducts, page2);
      if (!isFirstLoad) {
        d.arrive(".ec-breadcrumbs", onceOnly, setFooterHeight);
        Try(injectCartClickOnItemFixProductOptions, page2);
        bondAddToCartControls = injectButtons(currentPage, showActionBar, bondAddToCartControls, bindAddToCartControls);
      } else {
        isFirstLoad = false;
      }
      injectFastLoadingCss(page2);
      Try(fixLoginButtons, page2);
      Try(UpdateCurrentProductClasses, page2);
      Try(injectProductDetailsTitle, page2);
      Try(injectMeteors, page2);
      Try(injectReviews, page2);
      Try(injectLegalLinksKeepLanguage, page2);
      Try(injectPartnerLinksOnHomePage, page2);
      Try(injectClickingOnMenuButton, page2);
      Try(injectLanguagesMenuOnDesktop, page2);
      Try(trimColonInCart, page2);
      Try(detectOrderNumber, page2);
      Try(detectPorductOptionsTextValues, page2);
      Try(adjustFooterActionBarHeight, page2);
      Try(fixMetaOnMobile, page2);
      Try(injectDetectProductOptionsInView, page2);
      Try(injectDetectProductDetailsInView, page2);
      Try(injectZoom360FullScreen, page2);
      const fav = $(".product-details__product-like.favorite-product .favorite-product__title");
      if (fav[0] && !fav[0].bound) {
        fav[0].bound = true;
        fav.on("click", (e) => $(".product-details__product-like .form-control--button:visible")[0]?.click());
      }
      Try(injectMutationObserver, $(".product-details__product-like"), FavouriteProductChanged);
      Try(injectMutationObserver, $("#ecwid-pswp-template"), PWSPDialogClassChanged);
      Try(interceptCategoryPage, page2);
      Try(interceptAddressPage, page2);
      Try(injectZoomOnProductDescriptionImages, page2);
      Try(injectAdditionalCSSWhenNeeded, page2);
      Try(setRimTapeColorFilterVisibility, page2);
      Try(markOutOfStockProductOptions, page2);
      setTimeout(
        (f) => {
          removeMadeWith();
          if (page2.type === "PRODUCT") {
            const load360ProductCode2 = getProductCodeFromCurrentUrl();
            Try(fixProductWeight, page2);
            Try(inject360, load360ProductCode2, page2);
          } else {
          }
        },
        1
      );
      Try(injectAddToCartIcon, page2);
      Try(categoryPageInit, page2);
    }
  );
  if (isCartSummaryPage(currentPage)) {
    if (isOrderConfirmationPage(currentPage)) {
      d.arrive(
        ".ec-store__account-page, .ec-confirmation__number",
        onceOnly,
        (e) => {
          const text = $(e).is(".ec-confirmation__number") && $(e).text() || "";
          const vendorOrderNumber = text.match(/#@DATEx2-(.*)/i)?.[1];
          Try(injectCartClickOnItemFixProductOptions, {
            type: currentPage.type,
            vendorOrderNumber
          });
        }
      );
    } else {
      Try(injectCartClickOnItemFixProductOptions, currentPage);
    }
  }
  onPageLoading(
    (page2) => {
      setTimeout(
        (f) => {
          removeMadeWith();
        },
        1
      );
    }
  );
})();
function updateComboProductBackgroundOverlay(p) {
  let folder = "", b2 = "", isTire;
  const product = p;
  switch (true) {
    case /𝟐 𝐱 𝐕𝐄𝐄𝐱/.test(product.sku):
    case /𝐕𝐄𝐄𝐱/.test(product.sku):
      folder = "VEETires";
      isTire = true;
      break;
    case /𝐀𝐈𝐑𝐅𝐱/.test(product.sku):
      folder = "AIRFx/";
      break;
    case /𝐁𝐌𝐱𝟏/.test(product.sku):
      folder = "BMx/";
      break;
    case /𝐑𝐈𝐌𝐓𝐀𝐏𝐄𝐱𝟐/i.test(product.sku):
      folder = "RIMTAPEx";
      break;
    case /𝐒𝐋𝐈𝐌𝐄𝐱/i.test(product.sku):
      folder = "SLIMEx";
      break;
    case /𝐓𝐀𝐍𝐍𝐔𝐒𝐱/i.test(product.sku):
      folder = "TANNUSx";
      break;
    case /𝐗-𝐓𝐄𝐌𝐒𝐱𝟏-𝐋𝐎𝐀𝐃𝐄𝐑/.test(product.sku):
      folder = "X-TEMSx1-LOADERS-small/";
      b2 = true;
      break;
    case /^𝐃𝐀𝐓𝐄 𝐗-𝐓𝐄𝐌𝐒𝐱𝟏-𝐅𝐎𝐋𝐃𝐱𝟏$/gi.test(product.sku):
      folder = "X-TEMSx1-FOLDx1-only-small/";
      break;
    case /𝐗-𝐓𝐄𝐌𝐒𝐱𝟏-𝐅𝐎𝐋𝐃𝐱𝟏/.test(product.sku):
      folder = "X-TEMSx1-FOLDx1-small/";
      break;
    case /^𝐃𝐀𝐓𝐄 𝐔𝐍𝐎𝐱𝟏$/.test(product.sku):
      folder = "UNOx1/";
      break;
  }
  var productSKU = "";
  var sku = $(".form-control__radio:checked").toArray().map(
    (c) => {
      const parent = $(c).parent(), linkedId = parent.attr("data-render-product") || parent.attr("data-linked-product"), lp = elementsMetadata.get(parent[0]), isTireUnitType = isTire && parent.is(".og-UNIT-TYPE"), is2xVEEUnitType = isTireUnitType && parent.is(".o-UNIT-TYPE-x2"), isTireModel = isTire && parent.is(".og-TIRE-MODEL"), prefix = is2xVEEUnitType ? "2x" : "", dataSKU = (unbold(parent.attr("data-sku")) || "").replace(/^(DATE|𝐃𝐀𝐓𝐄) /, "").replace(/(\-(RED|GREEN|GOLD|BLACK))$/i, isTireUnitType || isTireUnitType ? "" : "$1"), sku2 = prefix + dataSKU.replace(/(\-(RED|GOLD|BLACK|GREEN))$/gi, isTireModel ? "" : "$1"), result = isTireModel ? "" : linkedId == p.id && !isTireUnitType ? (productSKU = sku2) && null : sku2 || unbold(knownProductSlugs[linkedId]?.sku);
      return result;
    }
  ).filter((s) => s).map((s) => s?.replace(/^(DATE|𝐃𝐀𝐓𝐄) /, ""));
  const fullSKU = [productSKU, ...sku].filter((s) => s).sort().join(".").replace(/X-TEMSx1-FOLDx1\.X-TEMSx1-LOADER-/gi, "X-TEMSx1-FOLDx1-");
  $d.toggleClass("bg-overlay-360", !!fullSKU);
  let imgUrl = "";
  if (folder && fullSKU) {
    const baseUrl = "https://cdn.jsdelivr.net/gh/DATEx2/combo@live";
    imgUrl = `${baseUrl}/${folder}${fullSKU}.css`;
  } else {
  }
  var css;
  $(lazyCSS()).append(css = $(`<link class="bg-overlay-css" rel="stylesheet" type="text/css"/>`).on(
    "load",
    (e) => {
      const elements = $(".bg-overlay-css"), index = elements.index(e.target);
      elements.each((i, e2) => i < index && $(e2).remove());
    }
  ));
  if (css.attr("href") != imgUrl) {
    css.attr("href", imgUrl);
  }
}
let processedEvent = false;
const redispatchEvent = (event, target) => {
  try {
    target.dispatchEvent(event);
  } catch (e) {
  }
  processedEvent = false;
  target.disabled = false;
};
var computedCartTotal = "";
function injectButtons(page2, showActionBar2, bondAddToCartControls, bindAddToCartControls) {
  if (page2.type !== "PRODUCT") {
    const lang = $d.attr("lang"), l = lang ? "/" + lang : "";
    const selectorWhenReady = {
      TERMS: ".ec-page-body",
      CART: {
        s: ".ec-cart__buttons",
        href: `${l}/products/cart`
      },
      CHECKOUT_ADDRESS: {
        s: ".ec-cart-step--address .form-control__button",
        href: `${l}/products/checkout/address`
      },
      CHECKOUT_DELIVERY: {
        s: ".ec-cart-step--delivery .form-control__button",
        href: `${l}/products/checkout/delivery`
      },
      CHECKOUT_TAX_INFORMATION: {
        s: ".ec-cart-step--tax-information .form-control__button",
        href: `${l}/products/checkout/tax-information`
      },
      CHECKOUT_PAYMENT_DETAILS: {
        s: ".ec-cart-step--payment .form-control__button, #ecwid-payment-details-paypal-placeholder",
        href: `${l}/products/checkout/payment`
      },
      ORDER_CONFIRMATION: ".ec-confirmation__continue"
    }, selector = selectorWhenReady[page2?.type]?.s || selectorWhenReady[page2?.type];
    if (page2.type in selectorWhenReady) {
      var toRemoveBreadCrumbs = [];
      onDomReady(
        (dom) => {
          d.arrive(".ec-cart-item--summary", onceOnly, (elem) => elem.click());
          d.arrive(
            ".ec-store .ec-breadcrumbs",
            onceOnly,
            (elem) => {
              elem = $(elem);
              onUnload(
                (p) => {
                  elem.children().toggleClass("force-hidden", false);
                  toRemoveBreadCrumbs.splice(0, toRemoveBreadCrumbs.length).forEach((e) => e.remove());
                }
              );
              var i = 0;
              function link(text, order) {
                const e = $(`<a href="/cart" class="breadcrumbs__link ec-link ec-link--muted ${order == 0 ? "breadcrumbs__link--last" : ""}" style="order: ${order || 0};">${translate(text)}</a>`);
                toRemoveBreadCrumbs.push(e);
                return e;
              }
              switch (page2.type) {
                case "TERMS":
                case "ORDER_CONFIRMATION":
                case "CART":
                  break;
                default:
                  elem.children().toggleClass("force-hidden", true);
                  switch (page2.type) {
                    case "CHECKOUT_PAYMENT_DETAILS":
                      elem.prepend(link("Payment", i++));
                    case "CHECKOUT_TAX_INFORMATION":
                      $(elem).prepend(link("Tax information", i++));
                    case "CHECKOUT_DELIVERY":
                      $(elem).prepend(link("Shipping method", i++));
                    case "CHECKOUT_ADDRESS":
                      $(elem).prepend(link("Shipping & Delivery", i++));
                      $(elem).prepend(link("Cart", i++)).prepend(link("Goodies", i++));
                      break;
                  }
              }
            }
          );
        }
      );
      if (page2.type == "CART" || page2.type == "TERMS" || page2.type == "ORDER_CONFIRMATION") {
        $d.toggleClass("fill-slider", false);
      } else {
        d.arrive(
          ".ec-cart__steps",
          onceOnly,
          (e) => {
            $d.toggleClass("fill-slider", true);
          }
        );
      }
      onUnload((p) => isScrolling = true);
      if (page2.type == "CHECKOUT_PAYMENT_DETAILS") {
        let injectRevolutQRCode = function(e) {
          const keysToTranslate = [".ec-radiogroup--title", ".payment-hint-revolut", ".payment-provider-total-text", ".payment-hint-iban-eur", ".paypment-hint-bic-text", ".payment-hint-beneficiary-text", ".payment-hint-bank-text", ".payment-hint-address-text", ".payment-hint-note-currency"];
          keysToTranslate.forEach((selector2) => e.arrive(
            selector2,
            onceOnly,
            (elem) => {
              elem = $(elem);
              const text = elem.text(), translation = translate(text);
              elem.text(translation);
            }
          ));
          if ($(e).hasClass("ec-radiogroup__item--checked") && !$(e).find(".ec-radiogroup--title").length) {
            const t = $(e).find(".ec-radiogroup__title");
            t.html($(`<div class="ec-radiogroup--title"/>`).text(t.text())).append($(".ec-cart-step--payment .ec-cart-step__body > .ec-cart-step__section.ec-cart-step__section--description")[0]?.outerHTML).toggleClass("ec-radiogroup__cart--info", true);
            $(".payment-provider-total i").text(computedCartTotal);
            const observer = isInView(
              t[0],
              (e2, state) => {
                clearTimeout(timeOut);
                timeOut = setTimeout((ti) => t.toggleClass("loaded", state.isInView), 600);
              },
              {
                threshold: 1
              }
            );
            t.toggleClass("loaded", t.is(":visible"));
            onUnload((p) => Try((t2) => observer.disconnect()));
          }
          if (!e.listenClassChanged) {
            e.listenClassChanged = true;
            $(e).classChange(injectRevolutQRCode);
          }
        };
        d.arrive(".ec-radiogroup__item--DxM-REVOLUT-or-Wire-Transfer, .ec-radiogroup__item--Dx2-REVOLUT-or-Wire-Transfer,.ec-radiogroup__item--2WD-REVOLUT-or-Wire-Transfer", notOnceOnlySelfUnbind, injectRevolutQRCode);
        var timeOut = 0;
        Promise.all([new Promise((r) => Ecwid.Cart.get((cart) => r(cart))), new Promise((r) => Ecwid.Cart.calculateTotal((o) => r(o)))]).then(
          (r) => {
            const cart = r?.[0];
            const o = r?.[1];
            const total = o.total;
            const totalFormatted = Ecwid.formatCurrency(total);
            console.warn(cart);
            const orderNumber = cart.id;
            function fixStep(elem) {
              const $e = $(elem);
              $e.toggleClass("eec-form--comments", !!$e.find(".ec-form.ec-form--comments").length).toggleClass("eec-form--payment-reference-number", !!$e.find(".ec-form--j7zmwgw").length).toggleClass("eec-creditcard", !!$e.find(".ec-creditcard").length).toggleClass("eec-payment-methods", !!$e.find(".ec-radiogroup").length).toggleClass("eec-cart-step__section--description", !!$e.hasClass(".ec-cart-step__section--description").length).toggleClass("eec-cart__button--paypal", !!$e.find(".ec-cart__button--paypal").length).toggleClass("eec-form-control--done", !!$e.find(".form-control--done").length);
            }
            d.arrive(".ec-cart-step--payment .ec-cart-step__body > div", notOnceOnlySelfUnbind, fixStep);
            d.arrive(
              ".QR",
              notOnceOnlySelfUnbind,
              (elem) => {
                $(".payment-provider-total i").text(computedCartTotal = totalFormatted);
                const $elem = $(elem), company = $elem.hasClass("QR-Dx2") ? "Dx2" : $elem.hasClass("QR-DxM") ? "DxM" : "2WD";
                generateRevolutQRCode(elem, company, total, orderNumber);
              }
            );
          }
        );
      }
      d.arrive(
        selector,
        onceOnly,
        (elem) => {
          $(elem).find(".form-control__button-text").html(svgIcons.truck())[0]?.addEventListener(
            "click",
            (e) => {
              const target = e.target;
              if (processedEvent || target === null || target.nodeName.toLowerCase() === "button" && target.type !== "button" || e.type !== "click") {
                return;
              }
              processedEvent = true;
              target.disabled = true;
              e.preventDefault();
              e.stopImmediatePropagation();
              const text = $(elem).find(".form-control__button-text");
              if (!text.is("truck-out")) {
                text.toggleClass("truck-out", true);
                setTimeout((t) => redispatchEvent(e, target), 1400);
              }
            }
          );
          setTimeout(showActionBar2, 1);
        }
      );
    } else {
      setTimeout(showActionBar2, 1);
    }
  } else {
    const o = $(".details-product-options");
    o && (o.injectProductDetailsDone = false);
    const currentProductId = currentPage.productId;
    if (currentProductId) {
      if (bondAddToCartControls) {
        bondAddToCartControls = false;
      } else {
        bindAddToCartControls(currentProductId, page2, true);
      }
    }
  }
  return bondAddToCartControls;
}
function restoreScrolling(page2, isScrolling2) {
  $(".product-details__product-sku").attr("title", page2.productId);
  const params = new URLSearchParams(location.search);
  const scroll = params.get("scroll");
  if (scroll) {
    isScrolling2 = true;
    $("html,body").animate({
      scrollTop: parseInt(scroll)
    }, 500, "swing");
  }
  $b.css("min-height", "");
  isScrolling2 = false;
  return isScrolling2;
}
var enableDev;
$(d.head).on(
  "mousedown touchstart",
  (t) => {
    clearTimeout(enableDev);
    enableDev = setTimeout(
      (t2) => {
        stopJSV();
        alert(isDev(!isDev()) ? "You are now a developer" : "You are no longer a developer");
        location.href = location.href;
      },
      1e4
    );
  }
).on("mouseup touchend", (e) => clearTimeout(enableDev));
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmlsZTovLy9EOi93b3JrL0RBVEV4Mi5iaWtlL3d3My93ZWJzaXRlL3NyYy9qcy9EQVRFeDIuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7ICQsIGpRdWVyeSwgX19kZWZpbmVQcm9wZXJ0eSwgTm90SW5jbHVkZWQsIHBhZ2VTdGF0ZSwgRWN3aWRBcGlLZXksIGlzRGV2LCBkLCB3LCBELCBpc1RvdWNoRGV2aWNlLCBoYXNUb3VjaEV2ZW50cywgc3RvcmVJZCwgJHcsIGIsIGgsICRoLCAkYiwgJGQsIEZFVENIX0NBUlRfUFJPRFVDVCwgY2FjaGVkUHJvbWlzZXNDYXJ0QW5kUGlkLCBwcmVsb2FkZWRDc3MsIHNtb290aCwgb25jZU9ubHksIG5vdE9uY2VPbmx5LCBvbmNlT25seVNlbGZVbmJpbmQsIG5vdE9uY2VPbmx5U2VsZlVuYmluZCwgc3RyaWtlLCBib2xkLCBib2xkeSwgdW5ib2xkLCBleHRyYWN0Qm9sZCwgVXBkYXRlQ3VycmVudFByb2R1Y3RDbGFzc2VzLCBoaWRlU2NyZWVuTG9hZGluZywgaGlkZUFjdGlvbkJhciwgc2hvd0FjdGlvbkJhciwgaW5qZWN0UHJvZHVjdERldGFpbHMsIGluc3RhbGxTY3JvbGxPdmVycmlkZSwgaXNJbk91dE9mVmlldywgaXNJblZpZXcsIGlzT3V0T2ZWaWV3LCBsb2dEdXJhdGlvbiwgZXh0cmFjdEVtYWlsQWRkcmVzcywgb25VbmxvYWQsIG9uVW5sb2FkQ29tcGxldGVkLCBvblBhZ2VVbmxvYWRlZCwgb25Eb21SZWFkeSwgZG9tUmVhZHlBcnJpdmVkLCBvblBhZ2VMb2FkZWQsIHBhZ2VMb2FkZWRDb21wbGV0ZWQsIG9uUGFnZUxvYWRpbmcsIHBhZ2VMb2FkaW5nQ29tcGxldGVkLCBsYXp5Q1NTIH0gZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgeyBhcnJpdmVQYWdlU2VsZlVuYmluZENhbGxiYWNrc09uUGFnZVVubG9hZCB9IGZyb20gJy4vYXJyaXZlLmpzJztcbmltcG9ydCB7IGluamVjdFJldmlld3MgfSBmcm9tICcuL3dlYnNpdGVSZXZpZXdzLmpzJztcbmltcG9ydCB7IH0gZnJvbSAnLi9lY3dpZC9pLm1pbi5qcyc7Ly9hdm9pZCBsYXp5IGVjb21tZXJjZSBzY3JpcHRzXG5cbi8vY29uc3QgQXJyaXZlID0gYXdhaXQgaW5pdEFycml2ZSgkKTtcbi8vIGltcG9ydCBGRDIzIGZyb20gJy4vRkQyMy5qcyc7IFxuY29uc3QgeyBkZWZhdWx0OiBGRDIzIH0gPSBhd2FpdCBpbXBvcnQoJy4vRkQyMy5qcycpO1xuXG4vLyBpbXBvcnQgdHJhbnNsYXRlLCB7IHN2Z0ljb25zIH0gZnJvbSAnLi90cmFuc2xhdGlvbnMuanMnO1xuY29uc3QgeyBkZWZhdWx0OiB0cmFuc2xhdGUsIHN2Z0ljb25zIH0gPSBhd2FpdCBpbXBvcnQoJy4vdHJhbnNsYXRpb25zLmpzJyk7XG5cbi8vIGltcG9ydCB7IHVpTnVtYmVyIH0gZnJvbSAnLi91aU51bWJlci5qcyc7IFxuY29uc3QgeyB1aU51bWJlciB9ID0gYXdhaXQgaW1wb3J0KCcuL3VpTnVtYmVyLmpzJyk7XG5cbmNvbnN0IGVsZW1lbnRzTWV0YWRhdGEgPSBuZXcgV2Vha01hcCgpO1xuXG51aU51bWJlci5pbml0SlF1ZXJ5KCQpO1xuXG4vLyBpbXBvcnQgeyBpbml0U25pcHMgfSBmcm9tICcuL3Byb2R1Y3REZXRhaWxzLmpzJztcbmNvbnN0IHsgaW5pdFNuaXBzLCBpbmplY3RQcm9kdWN0RGV0YWlsc1RhYnMsIGluaXRQcm9kdWN0QXR0cmlidXRlVGFibGVzIH0gPSBhd2FpdCBpbXBvcnQoJy4vcHJvZHVjdERldGFpbHMuanMnKTtcblxuLy8gaW1wb3J0IGtub3duUHJvZHVjdFNsdWdzXG5jb25zdCB7IGtub3duUHJvZHVjdFNsdWdzLCBrbm93bkNhdGVnb3J5U2x1Z3MgfSA9IHJlcXVpcmUoXCIuLi9kYi9rbm93blByb2R1Y3RTbHVncy5qc1wiKTtcbndpbmRvdy5rbm93blByb2R1Y3RTbHVncyA9IGtub3duUHJvZHVjdFNsdWdzO1xud2luZG93Lmtub3duQ2F0ZWdvcnlTbHVncyA9IGtub3duQ2F0ZWdvcnlTbHVncztcblxuLy8gLS0tIDQuIFlvdXIgYXBwJ3MgY29kZSBjYW4gbm93IHJ1biBzYWZlbHkgLS0tXG5sb2dEdXJhdGlvbihcIkFsbCBtb2R1bGVzIGxvYWRlZC4gUnVubmluZyBhcHAuIEluaXRpYWxpemluZy4uLlwiKSgpO1xuaW5pdFNuaXBzKCQpO1xuY29uc3QgY3Vyc29yT2Zmc2V0ID0gMTg7XG4vLyBTbGlnaHRseSBsYXJnZXIgb2Zmc2V0IGZvciBiZXR0ZXIgY2xlYXJhbmNlXG5cbiQoZG9jdW1lbnQpLm9uKHtcbiAgICAnbW91c2VlbnRlciB0b3VjaHN0YXJ0JzogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc3QgJGxpbmsgPSAkKHRoaXMpO1xuICAgICAgICBjb25zdCBsaW5rVGV4dCA9ICRsaW5rLnRleHQoKS50cmltKCk7XG5cbiAgICAgICAgJGxpbmsuYXR0cignZGF0YS10ZXh0JywgbGlua1RleHQpO1xuICAgICAgICAkbGluay5hZGRDbGFzcygnaXMtdG9vbHRpcC1hY3RpdmUnKTtcblxuICAgICAgICAvLyBTZXQgaW5pdGlhbCBwb3NpdGlvbiBpbW1lZGlhdGVseVxuICAgICAgICBjb25zdCBldmVudCA9IGUudHlwZS5zdGFydHNXaXRoKCd0b3VjaCcpID8gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0gOiBlO1xuICAgICAgICB1cGRhdGVUb29sdGlwUG9zaXRpb24oJGxpbmssIGV2ZW50KTtcbiAgICB9LFxuXG4gICAgJ21vdXNlbW92ZSc6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vIENvbnRpbnVvdXMgdXBkYXRlIG9ubHkgcnVucyBpZiBhY3RpdmVcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLXRvb2x0aXAtYWN0aXZlJykpIHtcbiAgICAgICAgICAgIHVwZGF0ZVRvb2x0aXBQb3NpdGlvbigkKHRoaXMpLCBlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAnbW91c2VsZWF2ZSB0b3VjaGVuZCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtdG9vbHRpcC1hY3RpdmUnKTtcbiAgICB9XG59LCAnYVt0YXJnZXQ9XCJfYmxhbmtcIl0nKTtcblxuLy8gLS0tIE5FVzogVW5pdmVyc2FsIENhbGN1bGF0aW9uIEZ1bmN0aW9uIC0tLVxuZnVuY3Rpb24gdXBkYXRlVG9vbHRpcFBvc2l0aW9uKCRsaW5rLCBldmVudCkge1xuICAgIC8vIEdldCB0aGUgbGluaydzIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudFxuICAgIGNvbnN0IGxpbmtPZmZzZXQgPSAkbGluay5vZmZzZXQoKTtcblxuICAgIC8vIERldGVybWluZSBjdXJzb3IncyBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgZG9jdW1lbnRcbiAgICAvLyBXZSB1c2UgcGFnZVgvWSBmb3IgZG9jdW1lbnQgY29vcmRpbmF0ZXNcbiAgICBjb25zdCBjdXJzb3JYID0gZXZlbnQucGFnZVg7XG4gICAgY29uc3QgY3Vyc29yWSA9IGV2ZW50LnBhZ2VZO1xuXG4gICAgLy8gTkVXOiBQYXNzIHRoZSBleGFjdCBjdXJzb3IgcG9zaXRpb24gd2l0aG91dCB0aGUgY29uc3RhbnQgb2Zmc2V0ICgxOHB4KVxuICAgIGNvbnN0IHRvcCA9IGN1cnNvclkgLSBsaW5rT2Zmc2V0LnRvcDtcbiAgICBjb25zdCBsZWZ0ID0gY3Vyc29yWCAtIGxpbmtPZmZzZXQubGVmdDtcblxuICAgICRsaW5rLmNzcyh7XG4gICAgICAgICctLXRvcCc6IHRvcCArICdweCcsXG4gICAgICAgICctLWxlZnQnOiBsZWZ0ICsgJ3B4J1xuICAgIH0pO1xufVxuXG52YXIgc2hvdWxkSGlkZVNjcmVlbkxvYWRpbmcgPSB0cnVlO1xuXG47IGZ1bmN0aW9uIHByZXZlbnRSaWdodENsaWNrKGUpIHtcbiAgICBpZiAoZS53aGljaCA9PSAzKSB7XG4gICAgICAgIHJldHVybiBwcmV2ZW50Q29udGV4dE1lbnUoZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcHJldmVudENvbnRleHRNZW51KGUpIHtcbiAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBzZXRDb29raWUobmFtZSwgdmFsdWUsIGRheXMpIHtcbiAgICB2YXIgZXhwaXJlcyA9IFwiXCI7XG4gICAgaWYgKGRheXMpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyBkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCk7XG4gICAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9VVENTdHJpbmcoKTtcbiAgICB9XG4gICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgKHZhbHVlIHx8IFwiXCIpICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcbn1cbmZ1bmN0aW9uIGdldENvb2tpZShuYW1lKSB7XG4gICAgdmFyIG5hbWVFUSA9IG5hbWUgKyBcIj1cIjtcbiAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGMgPSBjYVtpXTtcbiAgICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09IFwiIFwiKVxuICAgICAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKTtcbiAgICAgICAgaWYgKGMuaW5kZXhPZihuYW1lRVEpID09IDApXG4gICAgICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIHVuZm9sZFdob2xlU2FsZSgpIHtcbiAgICBjb25zdCBzaG93V2hvbGVTYWxlcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid2hvbGVzYWxlXCIpID09IFwiMVwiO1xuICAgICRkLnRvZ2dsZUNsYXNzKFwic2hvdy13aG9sZS1zYWxlc1wiLCBzaG93V2hvbGVTYWxlcykudG9nZ2xlQ2xhc3MoXCJoaWRlLXdob2xlLXNhbGVzXCIsICFzaG93V2hvbGVTYWxlcyk7XG59XG51bmZvbGRXaG9sZVNhbGUoKTtcbmFkZEV2ZW50TGlzdGVuZXIoXCJmdWxsc2NyZWVuY2hhbmdlXCIsIGUgPT4gJGQudG9nZ2xlQ2xhc3MoXCJpcy1mdWxsLXNjcmVlblwiLCAhIWQuZnVsbHNjcmVlbkVsZW1lbnQpKTtcblxudmFyIHBhZ2VUeXBlLCAkaGVhZGVyLCBzY3JvbGxXaWR0aCA9IHcuc2Nyb2xsV2lkdGggfHwgMDtcbndpbmRvdy5yZW1vdmVTdGF0aWNJbnRlcnZhbElkICYmIGNsZWFySW50ZXJ2YWwocmVtb3ZlU3RhdGljSW50ZXJ2YWxJZCk7XG5cbiRkLmFycml2ZShcIiNzdGF0aWMtaHRtbFwiLCBvbmNlT25seSwgc3RhdGljRWxlbWVudCA9PiBzdGF0aWNFbGVtZW50ICYmIHN0YXRpY0VsZW1lbnQucGFyZW50Tm9kZSAmJiBzdGF0aWNFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3RhdGljRWxlbWVudCkpO1xuY29uc3Qgc3R1Y2tPYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoW2VdKSA9PiB7XG4gICAgLy8gZS5pbnRlcnNlY3Rpb25SYXRpbyA8IDEgbWVhbnMgdGhlIGVsZW1lbnQgaXMgXCJzdHVja1wiIFxuICAgIC8vIGJlY2F1c2UgaXQgaGFzIG1vdmVkIHBhc3QgdGhlIHRocmVzaG9sZFxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2lzLXN0dWNrJywgZS5pbnRlcnNlY3Rpb25SYXRpbyA8IDEpO1xufVxuICAgICwge1xuICAgICAgICAvLyBUaGlzIHRocmVzaG9sZCBlbnN1cmVzIHRoZSB0b2dnbGUgaGFwcGVucyBcbiAgICAgICAgLy8gZXhhY3RseSB3aGVuIHRoZSBzdGlja3kgcG9zaXRpb24gYWN0aXZhdGVzXG4gICAgICAgIHRocmVzaG9sZDogWzFdXG4gICAgfSk7XG4kZC5hcnJpdmUoXCIucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXRpdGxlLmVjLWhlYWRlci1oMywgLmVjLXJlbGF0ZWQtcHJvZHVjdHNfX3RpdGxlLmVjLWhlYWRlci1oNCwgLmRldGFpbHMtcHJvZHVjdC1vcHRpb25fX3RpdGxlLmVjLWhlYWRlci1oNlwiLCBub3RPbmNlT25seSwgZWxlbSA9PiB7XG4gICAgc3R1Y2tPYnNlcnZlci5vYnNlcnZlKGVsZW0pO1xuICAgICQoZWxlbSkucGFyZW50KCkubGVhdmUoZWxlbSwgb25jZU9ubHksIGUgPT4ge1xuICAgICAgICBzdHVja09ic2VydmVyLnVub2JzZXJ2ZShlKTtcbiAgICB9XG4gICAgKVxufVxuKTtcblxuLy8gUmVnaXN0ZXIgZG9tUmVhZHkgbGlzdGVuZXJcbiRkLmFycml2ZShcIi5jbGVhcmJvdGgsIC5lYy1jYXJ0LCAjdGlsZS1mZWF0dXJlLWxpc3QtcEs2cmM5LCAuZWMtZm9vdGVyLCAuZWMtY29uZmlybWF0aW9uX19jb250aW51ZVwiLCBvbmNlT25seSwgZG9tUmVhZHlBcnJpdmVkKTtcbi8vZGlzYWJsZSBjb250ZXh0bWVudSBmb3IgaW1hZ2VzIGFuZCBjYWdlZ29yeSAmIHByb2R1Y3QgaW1hZ2VzICYgbGlua3Ncbm9uUGFnZUxvYWRlZChwYWdlID0+IHNldFRpbWVvdXQodCA9PiBkLmFycml2ZShcImEsaW1nXCIsIG5vdE9uY2VPbmx5LCBlbGVtID0+IHtcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcmV2ZW50UmlnaHRDbGljaywgdHJ1ZSk7XG4gICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcHJldmVudENvbnRleHRNZW51LCB0cnVlKTtcbn1cbiksIDEwMDApKTtcbmNvbnN0IHJvdW5kQm9yZGVyID0gc3ZnSWNvbnMucm91bmRCb3JkZXI7XG4oZnVuY3Rpb24gKCQpIHtcbiAgICAvLyAkKHJlYWR5ID0+IHtcbiAgICAvLyB9KTtcbiAgICAkLmZuLmZsb3d0eXBlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgLy8gRXN0YWJsaXNoIGRlZmF1bHQgc2V0dGluZ3MvdmFyaWFibGVzXG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7XG4gICAgICAgICAgICBtYXhpbXVtOiA5OTk5LFxuICAgICAgICAgICAgbWluaW11bTogMSxcbiAgICAgICAgICAgIG1heEZvbnQ6IDE1LFxuICAgICAgICAgICAgbWluRm9udDogMSxcbiAgICAgICAgICAgIGZvbnRSYXRpbzogMjUsXG4gICAgICAgICAgICB0YXJnZXQ6IFwiXCIsXG4gICAgICAgIH0sIG9wdGlvbnMpXG4gICAgICAgICAgICAsIC8vIERvIHRoZSBtYWdpYyBtYXRoXG4gICAgICAgICAgICAvLyA9PT09PT09PT09PT09PT09PVxuICAgICAgICAgICAgY2hhbmdlcyA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1heGltdW0gPSB0eXBlb2Ygc2V0dGluZ3MubWF4aW11bSA9PSBcImZ1bmN0aW9uXCIgPyBzZXR0aW5ncy5tYXhpbXVtKHRoaXMsIGVsKSA6IHNldHRpbmdzLm1heGltdW1cbiAgICAgICAgICAgICAgICAgICAgLCBtaW5pbXVtID0gdHlwZW9mIHNldHRpbmdzLm1pbmltdW0gPT0gXCJmdW5jdGlvblwiID8gc2V0dGluZ3MubWluaW11bSh0aGlzLCBlbCkgOiBzZXR0aW5ncy5taW5pbXVtXG4gICAgICAgICAgICAgICAgICAgICwgJGVsID0gJChzZXR0aW5ncy50YXJnZXQgfHwgZWwpXG4gICAgICAgICAgICAgICAgICAgICwgZWx3ID0gJGVsLndpZHRoKClcbiAgICAgICAgICAgICAgICAgICAgLCB3aWR0aCA9IGVsdyA+IG1heGltdW0gPyBtYXhpbXVtIDogZWx3IDwgbWluaW11bSA/IG1pbmltdW0gOiBlbHdcbiAgICAgICAgICAgICAgICAgICAgLCBmb250QmFzZSA9IHdpZHRoIC8gc2V0dGluZ3MuZm9udFJhdGlvXG4gICAgICAgICAgICAgICAgICAgICwgZm9udFNpemUgPSBmb250QmFzZSA+IHNldHRpbmdzLm1heEZvbnQgPyBzZXR0aW5ncy5tYXhGb250IDogZm9udEJhc2UgPCBzZXR0aW5ncy5taW5Gb250ID8gc2V0dGluZ3MubWluRm9udCA6IGZvbnRCYXNlO1xuICAgICAgICAgICAgICAgICRlbC5jc3MoXCJmb250LXNpemVcIiwgZm9udFNpemUgKyBcInB4XCIpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAvLyBNYWtlIHRoZSBtYWdpYyB2aXNpYmxlXG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgcmV0dXJuICQodGhpcykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBDb250ZXh0IGZvciByZXNpemUgY2FsbGJhY2tcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIC8vIE1ha2UgY2hhbmdlcyB1cG9uIHJlc2l6ZVxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzKHRoYXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBTZXQgY2hhbmdlcyBvbiBsb2FkXG4gICAgICAgICAgICBjaGFuZ2VzKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgICAgIDtcbiAgICAvLyQoZG9jdW1lbnQuYm9keSkuZmxvd3R5cGUoeyB0YXJnZXQ6IFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1za3VcIiwgbWF4aW11bTogZWwgPT4gJChlbCkud2lkdGgoKSAtIDk2IH0pO1xufVxuKShqUXVlcnkpO1xuaWYgKCEkKFwiI3JvdW5kLWJvcmRlclwiKS5sZW5ndGgpIHtcbiAgICAkKGRvY3VtZW50LmJvZHkpLmFwcGVuZChyb3VuZEJvcmRlcik7XG59XG5cbmNvbnN0IGR4ID0ge307XG5mdW5jdGlvbiBpbml0RHgoKSB7XG4gICAgZHguRHgyID0ge1xuICAgICAgICBieTogXCJSRUZVUlhneVwiLFxuICAgICAgICBpbnZvaWNlTnVtYmVyOiBcIkkwUjRNZz09XCIsXG4gICAgICAgIElCQU5FVVI6IFwiVWs4NE5FSlVVa3hGVlZKRFVsUXdOVGczTWpZNU1EQXhcIixcbiAgICAgICAgSUJBTlVTRDogXCJVazg0T0VKVVVreFZVMFJEVWxRd05UZzNNalk1TURBeFwiLFxuICAgICAgICBJQkFOUk9OOiBcIlVrOHpOMEpVVWt4U1QwNURVbFF3TlRnM01qWTVNREF4XCIsXG4gICAgICAgIG5hbWU6IFwiUkVGVVJYZ3lMa0pKUzBVZ1UxSk1cIixcbiAgICAgICAgYWRkcmVzczogXCJVR3gxWjNWc2RXa2dOalZCTENBNE1EVXpNREFzSUZSbFkzVmphU3dnUjB3c0lGSnZiV0Z1YVdFPVwiLFxuICAgICAgICBlbWFpbDogXCJSRUZVUlhneUxtSnBhMlZBWjIxaGFXd3VZMjl0XCIsXG4gICAgICAgIHJlZzogXCJTakUzTHpFME1Ea3ZNamN1TURndU1qQXlNUT09XCIsXG4gICAgICAgIHZhdDogXCJVazgwTkRRNE5UZzRPUT09XCIsXG4gICAgICAgIHN3aWZ0OiBcIlFsUlNURkpQTWpKWVdGZz1cIixcbiAgICAgICAgcGF5cGFsOiBcIlJFRlVSWGd5TG1KcGEyVkFaMjFoYVd3dVkyOXRcIixcbiAgICB9O1xuICAgIGR4LkR4MldEID0ge1xuICAgICAgICBieTogXCJSRUZVUlhneVYwUXVRa2xMUlNCSlRsUkZVazVCVkVsUFRrRk1cIixcbiAgICAgICAgaW52b2ljZU51bWJlcjogXCJJMFI0TWc9PVwiLFxuICAgICAgICBJQkFORVVSOiBcIlVrOHpNVUpVVWt4RlZWSkRVbFF3TmpFME9EVTROVEF4XCIsXG4gICAgICAgIElCQU5VU0Q6IFwiVWs4ek5VSlVVa3hWVTBSRFVsUXdOakUwT0RVNE5UQXhcIixcbiAgICAgICAgSUJBTlJPTjogXCJVazg0TVVKVVVreFNUMDVEVWxRd05qRTBPRFU0TlRBeFwiLFxuICAgICAgICBuYW1lOiBcIlJFRlVSWGd5VjBRdVFrbExSU0JKVGxSRlVrNUJWRWxQVGtGTUlGTlNUQT09XCIsXG4gICAgICAgIGFkZHJlc3M6IFwiVUd4MVozVnNkV2tnTmpWQkxDQTRNRFV6TURBc0lGUmxZM1ZqYVN3Z1Iwd3NJRkp2YldGdWFXRT1cIixcbiAgICAgICAgZW1haWw6IFwiUkVGVVJYZ3lWMFF1WW1sclpVQm5iV0ZwYkM1amIyMD1cIixcbiAgICAgICAgcmVnOiBcIlNqRTNMekUwTURrdk1qQXlNUT09XCIsXG4gICAgICAgIHZhdDogXCJORFE0TVRBNU1EUT1cIixcbiAgICAgICAgc3dpZnQ6IFwiUWxSU1RGSlBNakpZV0ZnPVwiLFxuICAgICAgICBwYXlwYWw6IFwiUkVGVVJYZ3lWMFF1WW1sclpVQm5iV0ZwYkM1amIyMD1cIixcbiAgICB9O1xuICAgIGR4LkR4TSA9IHtcbiAgICAgICAgYnk6IFwiUkVGVVJYZ3lJRTFQUWtsTVNWUlpcIixcbiAgICAgICAgaW52b2ljZU51bWJlcjogXCJJMDA9XCIsXG4gICAgICAgIElCQU5FVVI6IFwiVWs4NU5rSlVVa3hGVlZKRFVsUXdRMGt3TkRrM09EQXhcIixcbiAgICAgICAgSUJBTlVTRDogXCJVazh4TVVKVVVreFZVMFJEVWxRd1Ewa3dORGszT0RBeFwiLFxuICAgICAgICBJQkFOUk9OOiBcIlVrODFNa0pVVWt4U1QwNURVbFF3UTBrd05EazNPREF4XCIsXG4gICAgICAgIG5hbWU6IFwiUkVGVVJYZ3lJRTFQUWtsTVNWUlpJRk5TVEE9PVwiLFxuICAgICAgICBhZGRyZXNzOiBcIlVHeDFaM1ZzZFdrZ05qVkJMQ0E0TURVek1EQXNJRlJsWTNWamFTd2dSMHdzSUZKdmJXRnVhV0U9XCIsXG4gICAgICAgIGVtYWlsOiBcIlJFRlVSWGd5VjBRdWJXOWlhV3hwZEhsQVoyMWhhV3d1WTI5dFwiLFxuICAgICAgICByZWc6IFwiU2pFM0x6RTFPREl2TWpBeU1nPT1cIixcbiAgICAgICAgdmF0OiBcIk5EWTNNVGM0TlRNPVwiLFxuICAgICAgICBzd2lmdDogXCJRbFJTVEZKUE1qSllXRmc9XCIsXG4gICAgICAgIHBheXBhbDogXCJSRUZVUlhneVYwUXViVzlpYVd4cGRIbEFaMjFoYVd3dVkyOXRcIixcbiAgICB9O1xuICAgIGZvciAodmFyIGQgaW4gZHgpIHtcbiAgICAgICAgdmFyIGRYID0gZHhbZF07XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBkWCkge1xuICAgICAgICAgICAgaWYgKGRYLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBkWFtrZXldID0gYXRvYihkWFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkWC5pYmFuID0gZFguSUJBTkVVUjtcbiAgICB9XG4gICAgcmV0dXJuIGR4O1xufVxuaW5pdER4KCk7XG5mdW5jdGlvbiBnZW5lcmF0ZVJldm9sdXRRUkNvZGUoZWxlbSwgY29tcGFueSwgdG90YWwsIG9yZGVyTnVtYmVyKSB7XG4gICAgY29uc3QgJGVsZW0gPSAkKGVsZW0pO1xuICAgIGZ1bmN0aW9uIHN0b3BMb2FkaW5nKCkge1xuICAgICAgICAkZWxlbS50b2dnbGVDbGFzcyhcInRhc2stbG9hZGluZ1wiLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgY29uc3QgRHggPSBkeFtjb21wYW55XSB8fCBkeFtcIkR4XCIgKyBjb21wYW55XTtcbiAgICBjb25zdCBuYW1lID0gRHgubmFtZTtcbiAgICBjb25zdCBhY2NvdW50ID0gRHguaWJhbjtcbiAgICAkKGVsZW0pLnRvZ2dsZUNsYXNzKFwidGFzay1sb2FkaW5nXCIsIHRydWUpLmh0bWwoJChcIjxpbWcvPlwiKS5hZGRDbGFzcyhcInFyLWNvZGVcIikuYXR0cihcInNyY1wiLCBgaHR0cHM6Ly9iYXJjb2RlLnRlYy1pdC5jb20vYmFyY29kZS5hc2h4P2NvZGU9RVBDUVJDb2RlJm11bHRpcGxlYmFyY29kZXM9ZmFsc2UmdHJhbnNsYXRlLWVzYz1mYWxzZSZkYXRhPUJDRCUwQTAwMiUwQTElMEFTQ1QlMEFCVFJMUk8yMlhYWCUwQSR7bmFtZX0lMEEke2FjY291bnR9JTBBRVVSJHt0b3RhbH0lMEElMEEke29yZGVyTnVtYmVyfSBCb29zdCB5b3VyIGJpa2UhJTBBT3JkZXIgJHtvcmRlck51bWJlcn0lMEFQYXltZW50K2Zvciske29yZGVyTnVtYmVyfSZ1bml0PUZpdCZkcGk9MzAwJmltYWdldHlwZT1Qbmcmcm90YXRpb249MCZjb2xvcj0lMjMxZjlhMmUmYmdjb2xvcj0lMjNmZmZmZmYmY29kZXBhZ2U9RGVmYXVsdCZxdW5pdD1NbSZxdWlldD0wJmhpZGVocnQ9RmFsc2UmZWNsZXZlbD1IYCkub24oXCJsb2FkXCIsIHN0b3BMb2FkaW5nKS5vbihcImVycm9yXCIsIHN0b3BMb2FkaW5nKSk7XG59XG5mdW5jdGlvbiBmb3JtYXRTbHVnc0pTT04oanNvbikge1xuICAgIHJldHVybiBqc29uLml0ZW1zLnJlZHVjZSgobywgcCkgPT4gKHtcbiAgICAgICAgLi4ubyxcbiAgICAgICAgW3AuY3VzdG9tU2x1ZyB8fCBwLmF1dG9nZW5lcmF0ZWRTbHVnXToge1xuICAgICAgICAgICAgaWQ6IHAuaWQsXG4gICAgICAgICAgICBza3U6IHAuc2t1XG4gICAgICAgIH1cbiAgICB9KSwge30pO1xufVxuLy8gcHJldHRpZXItaWdub3JlXG5cbmlmICh0eXBlb2YgMSAhPT0gXCJudW1iZXJcIikgIFxuICAgIDMuLnRvU3RyaW5nKCk7IFxuLy8gZG8gbm90IGRyZW1vdmUgdGhpcyBsaW5lO1xuLy8gcHJldHRpZXItaWdub3JlXG4vKiBjb25zdCBrbm93bkNhdGVnb3J5U2x1Z3MgPSB7XG4gICAgXCIvXCI6IFswLCBcInJvb3RcIiwgbnVsbCwgMCwgWzYyMjUyNzUyNywgNjIyNTI3NTI2LCA3NDE2MDQxMjUsIDU1NDkzNjQxNCwgNTU5MzIxOTQ2LCA2NzQyMTA1MTgsIDUzNzc0NjA1MywgNjEyMTA5MjYwLCA1NjEzMzk4MjcsIDYwNDgyODMxOSwgNTUzMDMzMDAyLCA2NjY0NTkwODUsIDUzMjM2MTUwMSwgNTM1NzMzMDMxLCA1Mzc1OTA3MDIsIDUzMzM5MDM3OSwgNjY3MTAwMDY1LCA2Njk0Mjc2OTAsIDY2OTQyNzE2MiwgNjY5NzA3OTQ0LCA2MjUyNTg4NTMsIDYyNTQ2MzYxNCwgNjI1NDM1NDEyLCA2MjU0MTg5NDgsIDYyNTQzNTQxMCwgNjIxNjMxMTcwLCA2MjMzMDYyNDksIDYyMzU2NTM2MywgNjI2MTY3MDg0LCA2MjU0MTg5MzksIDYyNTQ1MTYwNiwgNjI0MzU5MjkyLCA2MjQzNjMwNDgsIDUzOTcxMzgyMSwgNjI0MzcyNjA0LCA2MjQzNjMzMzMsIDYyNDM1OTM2NSwgNTMzNTg2MTc1LCA2MjQzNjc1NzMsIDUzOTY2Mjg2OCwgNTMzNTkyMTYwLCA1MzM2MDU1MDMsIDc0MTg4MjgxNywgNzQxODgwMTczLCA1MzQ0NTYwMjUsIDUzNDQ1NTU2NSwgNTQwOTA4MDgwLCA1NDA4ODk2MzEsIDU1OTczODgwMSwgNzQxNzQxNDA5LCA1NDQ0MDQ0NTgsIDY5NzE1ODg3MiwgNjk3MTM5OTEyLCA2ODAwNjI5ODAsIDY4MDExOTA4OSwgNjgwMDYyOTc3LCA2ODAwMjc1MDAsIDc0MTg4MzE2OCwgNzQxODg0MzUxLCA1NDE2OTI4ODAsIDU0NDY3OTM2MCwgNzUzMzQ0NTEzLCA3NTMzMzE1NzgsIDc1MjQ2NzAwMCwgNzUyNDgxMTg1LCA3NDE4ODMxMzMsIDc0MTg4MzEyNCwgNTU5MDg0NjE1LCA1NTkzMzYzODksIDU1OTMzNjM5MSwgNzQxNzQxMzgyLCA3NDE3NDEzNzEsIDU1OTM2ODA0NCwgNTU5NjkxNDQyLCA1NjEwNzYzMDMsIDYxNTQxMzI1OSwgNjE1NDE5MDExLCA2NzQyMTA1MjksIDc1MjI4ODYwOCwgNzUyMjU0MjY3LCA2NzQyMzg1MDIsIDY3ODUwMDMwNywgNjc4NDY0Njc1LCA3NDE4ODMxNTEsIDc0MTc1ODM2MywgNjc4NDc5MzczLCA3NDE4NDcxNTYsIDc0MTg0Nzg4NywgNzQxODQ3MTkyLCA3NDE4ODAwNjAsIDc0MTg0Nzg5NCwgNzUyMDQyNjMwLCA3NTIwNTY1OTMsIDc1MjA0MjYzMSwgNzUyMDU2NTk3LCA3NTIyNjc2ODcsIDc1MjQ4NDM3MF0sIG51bGxdLFxuICAgIFwiYWNjZXNvcmllc1wiOiBbMTUxMTMwNjYxLCBcIkFjY2Vzb3JpZXNcIiwgMTQ1OTYzODcxLCA0LCBbNTU5NzI0ODM4LCA1NTkyMjA5ODcsIDU2MTA2MTMyNiwgNTYxMDc2MjgzXSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny80MzQwNzIyMjI5LndlYnBcIl0sXG4gICAgXCJiYXJzXCI6IFsxNTExNjAxMjAsIFwiQmFycyAmIENvXCIsIDE0NTgyNjQyMywgMywgWzUzMzU4NjE3NSwgNjI0MzU5MzY1LCA1Mzk2NjI4NjgsIDYyNDM2NzYzMiwgNTM5NzEzODIxLCA2MjQzNTkyOTIsIDYyNDM2MzMzMywgNjI0MzcyNjA0LCA2MjQzNjc1NzMsIDYyNDM2MzA0OCwgNjc4NTAwMzA3XSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny8zNjU4ODY1NDA5LndlYnBcIl0sXG4gICAgXCJiYXR0ZXJpZXNcIjogWzE0NjEwMTc3MywgXCJCYXR0ZXJpZXNcIiwgMTQ1ODM4NTIwLCAxLCBbNTMzNDA1MjUyLCA2NzQyMTA1MTgsIDUzNzc0NjA1MywgNTU0OTM2NDE0LCA3NDE2MDQxMjUsIDU1OTMyMTk0NiwgNTM0NDU4MzAxXSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny80MzQwNjkzNzAyLndlYnBcIl0sXG4gICAgXCJiYXR0ZXJpZXMtY2hhcmdlcnNcIjogWzE0NTgzODUyMCwgXCJCYXR0ZXJpZXMgJiBDaGFyZ2Vyc1wiLCAwLCA1LCBbNTMyMzYxNTAxLCA1MzM0MDUyNTIsIDY3NDIxMDUxOCwgNTU0OTM2NDE0LCA3NDE2MDQxMjUsIDU1OTMyMTk0NiwgNTM3NzQ2MDUzLCA2NjY0NTkwODVdLCBcImh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzUyODA3NDE1MzIud2VicFwiXSxcbiAgICBcImJpa2VzXCI6IFsxNDU5NjY4MTEsIFwiQklLRVMgJiBGcmFtZXNcIiwgMCwgMSwgWzU1MzAzMzAwMiwgNjA0ODI4MzE5LCA1NjEzMzk4MjcsIDYxMjEwOTI2MCwgNjEzMzkzNjY3LCA2MTMzOTA5MDMsIDYxMzQxMzkzMywgNjEzNTA1Nzc0LCA2MTMzOTk0MTAsIDYxMzQwMjY2NywgNjc0MjM4NTk3LCA2NzQyMzg4MjAsIDY3NDIzODUwMiwgNjc0MjM4ODI1XSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny81MjgwNzQxNTQwLndlYnBcIl0sXG4gICAgXCJiaWtlcy0xNzYxOTY0NjVcIjogWzE3NjE5NjQ2NSwgXCJCaWtlc1wiLCAxNDU5NjY4MTEsIDEsIFs2MDQ4MjgzMTksIDU1MzAzMzAwMl0sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNDczMzIxODExNC53ZWJwXCJdLFxuICAgIFwiYm90dG9tLWJyYWNrZXRzXCI6IFsxNTExNDk5MTUsIFwiQm90dG9tIEJyYWNrZXRzXCIsIDE0NTk2NzMwMiwgMSwgWzU1OTM2ODA4NiwgNTU5MDg0NjE1XSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny80MzQwNzIyNzA1LndlYnBcIl0sXG4gICAgXCJicmFrZXNcIjogWzE1MTE3MTUyNCwgXCJIeWRyYXVsaWMgQnJha2VzXCIsIDE0NTk2NjI5NiwgMSwgW10sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNDM0MDcyMjA0NS53ZWJwXCJdLFxuICAgIFwiYnJha2VzLXBhZHNcIjogWzE0NTk2NjI5NiwgXCJCcmFrZXMgJiBQYWRzXCIsIDAsIDExLCBbNTU5MzM2Mzg5LCA1NTkzMzYzOTEsIDc0MTc0MTM3MSwgNzQxNzQxMzgyXSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny81MjgwNTg4OTYwLndlYnBcIl0sXG4gICAgXCJjaGFyZ2Vyc1wiOiBbMTQ2MDk2NTI5LCBcIkNoYXJnZXJzXCIsIDE0NTgzODUyMCwgMiwgWzUzMjM2MTUwMSwgNjY2NDU5MDg1XSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny8zNjM4ODI2MTcwLndlYnBcIl0sXG4gICAgXCJjb250cm9sbGVyc1wiOiBbMTQ1OTY2Mjk1LCBcIkNvbnRyb2xsZXJzICYgQ2FibGVzXCIsIDAsIDcsIFs1MzQ0NTYwMjUsIDU0NDY3OTM2MCwgNzQxODgzMTI0LCA3NDE4ODMxMzMsIDc1MjQ2NzAwMCwgNzUzMzMxNTc4LCA3NTI0ODExODUsIDc1MzM0NDUxMywgNTU5NzE0Njk3LCA1NTk3MTQ3MDcsIDU2MDAzNDUwN10sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNTI4MDY3MzY4OC53ZWJwXCJdLFxuICAgIFwiY3JhbmtzXCI6IFsxNTExNjEyMzAsIFwiQ3Jhbmstc2V0cyAmIENoYWluc1wiLCAxNDU5NjczMDEsIDEsIFs2MTU0MTkwMTEsIDU2MTA3NjMwMywgNjE1NDEzMjU5LCA1NTk3Mzg3NzAsIDU2MTA1Njk5MV0sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvMzY1MTUxOTQwNC53ZWJwXCJdLFxuICAgIFwiZGF0ZXgyXCI6IFsxNDU5NjYwNTcsIFwiUGFyYWxsZWwgQmF0dGVyeSBDb21iaW5lcnNcIiwgMCwgMywgWzU1OTcyNDgzOF0sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNTI4MDc0MTUzNi53ZWJwXCJdLFxuICAgIFwiZGF0ZXgyLWNvbnRyb2xsZXJzXCI6IFsxNTExMjA5NjksIFwiREFURXgyIENvbnRyb2xsZXJzXCIsIDE0NTk2NjI5NSwgMSwgWzU2MDAzOTkyNCwgNjc4NDY0Njc1LCA3NDE3NTgzNjMsIDc0MTg4MzE1MV0sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNDM0MDcyMjcwNy53ZWJwXCJdLFxuICAgIFwiZGlzcGxheXNcIjogWzE1MTEyMDk2OCwgXCJCaWtlIERpc3BsYXlzXCIsIDE0NTk2Mzg3MSwgMSwgWzU0MTY5Mjg4MCwgNzQxODgzMTY4LCA3NDE4ODQzNTEsIDU1OTczODgwMSwgNTU5NzI0ODM4LCA3NDE3NDE0MDldLCBcImh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzQzNDA3MTUyMDYud2VicFwiXSxcbiAgICBcImRpc3BsYXlzLWxpZ2h0c1wiOiBbMTQ1OTYzODcxLCBcIkRpc3BsYXlzICYgTGlnaHRzXCIsIDAsIDEyLCBbNTQxNjkyODgwLCA3NDE4ODMxNjgsIDc0MTg4NDM1MSwgNTU5NzM4ODAxLCA3NDE3NDE0MDksIDU1OTcyNDgzOCwgNTM3NTkwNzAyLCA1MzU3MzMwMzEsIDUzNzY1OTIyOSwgNjc0MjM4NjA5LCA2NzQyMzg4MzMsIDU2MTA2MTMyNiwgNTYxMDc2MjgzXSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny81MjgwNjcyNzk2LndlYnBcIl0sXG4gICAgXCJkeDJcIjogWzE0NjEwODUzMiwgXCJEeDIgLSB0d28gYmF0dGVyaWVzXCIsIDE0NTk2NjA1NywgMSwgWzUzMzM5MDM3OSwgNjY3MTAwMDY1LCA2Njk0MjcxNjIsIDY2OTQyNzY5MCwgNjY3MTAwMDY4LCA2Njk0MjcxNjEsIDY2OTQyNzY4OSwgNjY3MTMwMjgzLCA2NjY4NDAxODgsIDY2NzEwMDA2NiwgNjY5NzA3OTUxLCA2Njk3MTQzNjEsIDY2NzEzMDI4NCwgNjY3MTMwMjkyLCA2NjcxMDAwNjcsIDY2OTcxNDM2NSwgNjY3MDY1ODI3LCA2Njk3MDc5NDQsIDY2NzEzMDI4MSwgNjY3MDY1ODE5LCA1NTk3MjQ4MzgsIDY2OTI5NTU2NCwgNjY5Mzg0NTAzLCA2NjkzODE3NzYsIDY2OTM4MzUyM10sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNDM2MDYyNDA1NS53ZWJwXCJdLFxuICAgIFwiZHgyY1wiOiBbMTQ2MTA3NTI5LCBcIkR4NCAtIGZvdXIgYmF0dGVyaWVzXCIsIDE0NTk2NjA1NywgMywgWzU1OTcyNDgzOF0sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNDM2MDYzOTc4NS53ZWJwXCJdLFxuICAgIFwiZHgzXCI6IFsxNDYxMDg1MzMsIFwiRHgzIC0gdGhyZWUgYmF0dGVyaWVzXCIsIDE0NTk2NjA1NywgMiwgWzU1OTcyNDgzOF0sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNDM2MDYzMTgzMC53ZWJwXCJdLFxuICAgIFwiZHgzY1wiOiBbMTUxMTYxMjM1LCBcIkR4NSAtIGZpdmUgYmF0dGVyaWVzXCIsIDE0NTk2NjA1NywgNCwgW10sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNDM2MDYzOTc4OS53ZWJwXCJdLFxuICAgIFwiZmVuZGVyc1wiOiBbMTUxMTcwNjA4LCBcIkZlbmRlcnNcIiwgMTQ1OTY3MDQ1LCAxLCBbXSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny80MzQwNzIyNzIxLndlYnBcIl0sXG4gICAgXCJmZW5kZXJzLXJhY2tzXCI6IFsxNDU5NjcwNDUsIFwiRmVuZGVycyAmIFJhY2tzXCIsIDAsIDE0LCBbNTMzNjA1NTAzLCA3NDE4ODAxNzMsIDc0MTg4MjgxNywgNTMzNTkyMTYwXSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny81MjgwNjczNTUyLndlYnBcIl0sXG4gICAgXCJmb3Jrc1wiOiBbMTUxMTcwNjA2LCBcIkFpciBGb3Jrc1wiLCAxNDU4MjY0MjMsIDEsIFs1NDQ0MDQ0NTgsIDY5NzE1ODg3MiwgNjk3MTM5OTEyLCA2ODAwNjI5ODAsIDY5NzE1MTAwMywgNjgwMDI3NTAwLCA2ODAwNjI5NzcsIDY4MDExOTA4OSwgNjk3MTM3NTk3XSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny8zNjUzNzQ3NzM0LndlYnBcIl0sXG4gICAgXCJmb3Jrcy1iYXJzXCI6IFsxNDU4MjY0MjMsIFwiRm9ya3MgJiBCYXJzXCIsIDAsIDQsIFs1NDQ0MDQ0NTgsIDY5NzE1ODg3MiwgNjk3MTM5OTEyLCA2ODAwNjI5ODAsIDY5NzE1MTAwMywgNjgwMDI3NTAwLCA2ODAwNjI5NzcsIDY4MDExOTA4OSwgNjk3MTM3NTk3XSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny81MjgwNzAwMTgyLndlYnBcIl0sXG4gICAgXCJmcmFtZXNcIjogWzE3NjE5NDcyNSwgXCJGcmFtZXNcIiwgMTQ1OTY2ODExLCAyLCBbNjEzNDEzOTMzLCA2MTMzOTk0MTAsIDYxMjEwOTI2MCwgNjEzNDAyNjY3LCA1NjEzMzk4MjcsIDYxMzM5MzY2NywgNjEzNTA1Nzc0LCA2MTMzOTA5MDNdLCBcImh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzQ3MzMyMzkxMzcud2VicFwiXSxcbiAgICBcImZyb250LXdoZWVsc1wiOiBbMTUxODE2NTg1LCBcIkZyb250IFdoZWVsc1wiLCAxNDU5NjczMDAsIDMsIFs3NDE5MDQwMjMsIDc0MzIwNzQ1MiwgNzQzMjA4ODg1LCA3NDE4OTI5NzYsIDc0MTkwMTEwOCwgNzQxOTA0MDc1LCA3NDE5MDQwODFdLCBcImh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzQzNDA3MjIwMTYud2VicFwiXSxcbiAgICBcImdlYXJzXCI6IFsxNDU5NjczMDEsIFwiQ3JhbmtzICYgR2VhcnNcIiwgMCwgOSwgWzYxNTQxOTAxMSwgNTYxMDc2MzAzLCA2MTU0MTMyNTksIDU1OTczODc3MCwgNTU5NjkxNDQyLCA1NjAwMzgwODIsIDUzMzYwNTU1M10sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNTI4MDY3MzU1MC53ZWJwXCJdLFxuICAgIFwiZ3JpcHMtLWFjY2Vzb3JyaWVzXCI6IFsxOTAyNzcwMjQsIFwiR3JpcHMgJiBBY2Nlc29ycmllc1wiLCAwLCAxNiwgWzY3ODUwMDMwN10sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNTI4MDcwMDE4OC53ZWJwXCJdLFxuICAgIFwiaGVhZHNldHNcIjogWzE1MTE2MTIzMywgXCJIZWFkc2V0cyAmIGJlYXJpbmdzXCIsIDE0NTgyNjQyMywgNCwgWzYyNjE4MzM0NSwgNjI2MTY3MDg0LCA2MjYxODMzNDZdLCBcImh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzM2NTM4ODQ4MDIud2VicFwiXSxcbiAgICBcImxpZ2h0c1wiOiBbMTUxMTM1MzkzLCBcIkZyb250IExpZ2h0c1wiLCAxNDU5NjM4NzEsIDIsIFs1Mzc2NTkyMjksIDY3NDIzODYwOSwgNjc0MjM4ODMzXSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny80MzQwNzE1MjMzLndlYnBcIl0sXG4gICAgXCJsb2FkZXJzXCI6IFsxNTE1MDQ1NTEsIFwiTG9hZGVycyAmIENsYW1wc1wiLCAxNDU4MjY0MjMsIDIsIFs2MjQ2NzgyODQsIDYyNTQ1MTYwNiwgNjI1MjU4ODUzLCA2MjUyNTU5NzQsIDYyNjE4MzM0MywgNjI1MjU4OTEzLCA2MjUyNTE3MDUsIDYyNTI2MTY2OSwgNjI1MjU1OTc4LCA2MjUyNzMzOTUsIDYyNTI2NTQxMiwgNjI1NDE4OTM5LCA2MjU0NTc1ODQsIDYyNjE4MzM0NiwgNjI1NDYzNjEzLCA2MjU0MTg5NDgsIDYyNTQxODk1MCwgNjI1NDM1NDA5LCA2MjU0MzU0MTAsIDYyNTQzNTQxMiwgNjI1NDYzNjE0LCA2MjU0NjYwODgsIDYyNTI3MzM5M10sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvMzY1ODg4NTc4NS53ZWJwXCJdLFxuICAgIFwibWFpbi1oYXJuZXNzXCI6IFsxNjI4MzQ1OTIsIFwiTWFpbiBoYXJuZXNzXCIsIDE0NTk2NjI5NSwgNCwgWzY3ODQ2NDY3NSwgNzQxNzU4MzYzLCA3NDE4ODMxNTFdLCBcImh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzQzNDA3ODcwMTMud2VicFwiXSxcbiAgICBcIm1hdGUtY2xhc3NpYy1jaXR5LWNvbnRyb2xsZXJzXCI6IFsxNDYxMDQwMzEsIFwiTUFURSBDbGFzc2ljIC8gQ2l0eSBDb250cm9sbGVyc1wiLCAxNDU5NjYyOTUsIDMsIFs1NjAwMzk5MjQsIDU2MDAzOTkxNiwgNTU5NzE0Njk3LCA1NTk3MTQ3MDcsIDU2MDAzNDUwN10sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvMzQ3NzQ5MzM1Ni5wbmdcIl0sXG4gICAgXCJtYXRlLXgtY29udHJvbGxlcnNcIjogWzE0NjEwOTc4MCwgXCJNQVRFIFggQ29udHJvbGxlcnNcIiwgMTQ1OTY2Mjk1LCAyLCBbNTM0NDU2MDI1LCA1NDQ2NzkzNjAsIDc0MTg4MzEyNCwgNzQxODgzMTMzLCA3NTI0NjcwMDAsIDc1MzMzMTU3OCwgNzUyNDgxMTg1LCA3NTMzNDQ1MTMsIDU2MDAzOTkyNCwgNTYwMDM5OTE2LCA2Nzg0NjQ2NzUsIDc0MTc1ODM2MywgNzQxODgzMTUxXSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny8zNDc3NDk2ODQ5LmpwZ1wiXSxcbiAgICBcIm1pc3Npb24tY29tbWFuZFwiOiBbMTUxODA0NTg0LCBcIk1pc3Npb24gQ29tbWFuZFwiLCAxNTExMjA5NzAsIDIsIFs2MjE2MzExNzAsIDYyMTU4NjkxMywgNjIxNjQ0MzM1LCA2MjE1OTAzODUsIDYyMTY5MzA2MF0sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvMzY4MDYxMjAxNy53ZWJwXCJdLFxuICAgIFwibW90b3JzXCI6IFsxNTExMjA5NjcsIFwiTW90b3JzICYgUGFydHNcIiwgMTQ1OTY3MzAwLCAxLCBbNTYwMTM4MDgyLCA3NDE2OTU2NjYsIDc1MjExNzAyOV0sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvMzY1MTU0NjQ3My5qcGdcIl0sXG4gICAgXCJwYWRzXCI6IFsxNTExMjQ4OTgsIFwiQnJha2UgUGFkc1wiLCAxNDU5NjYyOTYsIDIsIFtdLCBcImh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzQzNDA3MTkzNjAud2VicFwiXSxcbiAgICBcInBhc1wiOiBbMTUxMTQ5OTE2LCBcIlBlZGFsIEFzc2lzdCBTZW5zb3JzXCIsIDE0NTk2NzMwMiwgMywgWzU1OTM2ODA0NF0sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNDM0MDgyMzcxMC53ZWJwXCJdLFxuICAgIFwicmFja3NcIjogWzE1MTEzNTM5NSwgXCJSYWNrc1wiLCAxNDU5NjcwNDUsIDIsIFtdLCBcImh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzQzNDA3ODcwNDcud2VicFwiXSxcbiAgICBcInJlYXItd2hlZWxzXCI6IFsxNTExNzE1MjEsIFwiUmVhciBXaGVlbHNcIiwgMTQ1OTY3MzAwLCAyLCBbNzUyMDQyNjMxLCA3NTIwNTY1OTddLCBcImh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzM2NTE1NzYxMDAuanBnXCJdLFxuICAgIFwic2FkZGxlc1wiOiBbMTcwNzgyMzQyLCBcIlNhZGRsZXMgJiBTZWF0cG9zdHNcIiwgMCwgMTUsIFs2Nzg0NzkzNzMsIDc0MTg0NzE1NiwgNzQxODQ3ODg3LCA3NDE4NDc4OTQsIDc0MTg0NzE5MiwgNzQxODgwMDYwXSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny81MjgwNTg4OTcyLndlYnBcIl0sXG4gICAgXCJzZXJ2aWNlXCI6IFsxNDU5NjcwNDYsIFwiQnJva2VuIGViaWtlIHBhcnRzPyBQcm9mZXNpb25hbCBTZXJ2aWNlIFJlcGFpcnMhXCIsIDAsIDIsIFs2MjI1Mjc1MjYsIDYyMjUyNzUyNywgNzUyMDU2NTk3LCA3NTIwNTY1OTMsIDc1MjI2NzY4N10sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNTI4MDcwMDE4NC53ZWJwXCJdLFxuICAgIFwic2hvY2tzXCI6IFsxNDU5NjU4MDksIFwiUmVhciBTaG9ja3NcIiwgMCwgMTAsIFs1NDA4ODk2MzEsIDU0MDkwODA3OCwgNTQwOTA3NTQ1LCA1NDA5MDgwODAsIDU0MDg5MjY0NiwgNTQwODg5NjI2XSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny81MjgwNjcyODA0LndlYnBcIl0sXG4gICAgXCJzcGVlZHN0ZXJzXCI6IFsxNTE4MTcwODEsIFwiU3BlZWRzdGVyc1wiLCAxNTExMjA5NzAsIDMsIFs2MjMzOTMzOTMsIDYyMzQyMDA2NSwgNjIzNDIwMDY2LCA2MjM0NjQ1MjQsIDYyMzMwNjI0OSwgNjIzNTcwMzQ5XSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny8zNjgwNjExODM5LndlYnBcIl0sXG4gICAgXCJzcGVlZHN0ZXJzLWFyYW1pZFwiOiBbMTUxODA0OTAzLCBcIlNwZWVkc3RlcnMgQXJhbWlkXCIsIDE1MTEyMDk3MCwgNCwgWzYyMzU2NTM2MywgNjIzNTcxODQ5LCA2MjM1NjgwODcsIDYyMzU1OTMyNl0sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvMzY4MDU5NDMxMy53ZWJwXCJdLFxuICAgIFwic3Byb2tldHNcIjogWzE1MTE0OTkxMSwgXCJHZWFycyAmIFNwcm9rZXRzXCIsIDE0NTk2NzMwMSwgMywgWzU2MDAzODA4MiwgNTU5NjkxNDQyLCA3NDE2OTU2NjYsIDc1MjExNzAyOV0sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvMzY1MTU1NzY2NC53ZWJwXCJdLFxuICAgIFwic3RvcC1saWdodHNcIjogWzE1MTE3MTUyMywgXCJTdG9wIExpZ2h0c1wiLCAxNDU5NjM4NzEsIDMsIFs1Mzc1OTA3MDIsIDUzNTczMzAzMV0sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNDM0MDcxOTQzNy53ZWJwXCJdLFxuICAgIFwidGhyb3R0bGVcIjogWzE0NTk2NzMwMiwgXCJUaHJvdHRsZSwgQkIgJiBQQVNcIiwgMCwgMTMsIFs1NTkzNjgwNDQsIDU1OTA4NDYxNSwgNTU5MzU2MTQ4LCA1NTkzNjgwODYsIDU1OTIyMDk4NywgNTM0NDU2MDI1LCA1MzQ0NTgyNzldLCBcImh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzUyODA1ODg5Njgud2VicFwiXSxcbiAgICBcInRocm90dGxlc1wiOiBbMTUxMTM1Mzk0LCBcIlRocm90dGxlc1wiLCAxNDU5NjczMDIsIDIsIFs1MzQ0NTYwMjVdLCBcImh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzQzNDA3NTgyNzIud2VicFwiXSxcbiAgICBcInRpcmVzLXR1YmVzXCI6IFsxNDU5NjUwOTAsIFwiVGlyZXMgJiBUdWJlc1wiLCAwLCA4LCBbNTQ0Njc1NDM5LCA1NjQzNTY4NDksIDU2NDMzMjM3NCwgNjIzMzA2MjQ5LCA2MjM1NTkzMjYsIDYyMTYzMTE3MCwgNTYwNTU3NjExLCA1NjA1NTkzNzIsIDU2MDYzMzUxMywgNTYwNjMzNTA1LCA2MjM0MjAwNjZdLCBcImh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzUyODA3MDAxNTgud2VicFwiXSxcbiAgICBcInRvb2xzXCI6IFsxNTExNzA2MDMsIFwiVG9vbHNcIiwgMTQ1OTY3MzAxLCAyLCBbNTYxMDU2OTkxLCA3NDE2OTU2NjYsIDc1MjExNzAyOV0sIFwiaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvMzY1MTU1NTIxMy53ZWJwXCJdLFxuICAgIFwidHViZXNcIjogWzE1MTE2MDEyMSwgXCJJbm5lciBUdWJlc1wiLCAxNDU5NjUwOTAsIDIsIFs2NzQyMDcwMzYsIDc0MzIwNzQ1NSwgNzQzMjA3NDY1LCA3NDMyMDg5MTldLCBcImh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzQzNDA3ODcwNDkuanBnXCJdLFxuICAgIFwidmVlLXRpcmVzXCI6IFsxNTExMjA5NzAsIFwiVkVFIFRpcmVzXCIsIDE0NTk2NTA5MCwgMSwgWzU2NDMzMjM3NCwgNjIzMzA2MjQ5LCA2MjM1NTkzMjYsIDYyMTYzMTE3MCwgNTY0Mjg5OTg4LCA2MjM0MjAwNjZdLCBcImh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzM2ODA1OTQzMjUud2VicFwiXSxcbiAgICBcIndoZWVsc1wiOiBbMTQ1OTY3MzAwLCBcIk1vdG9ycyAmIFdoZWVsc1wiLCAwLCA2LCBbNTM0NDU1NTY1LCA1MzQ0NTYwNjksIDU0NDY3NTQzOSwgNTU5MzM2NjQ4LCA3NDE4OTI5MjAsIDc0MTg5MTYxNSwgNzQxOTAwOTE4LCA3NDE5MTk3NjIsIDc0MTg5MTY0NiwgNzQxODkxNTIyLCA3NDE5MDA5OTcsIDc0MTkwNDEzMiwgNzQxODkyODIzLCA3NDE5MDEwMDYsIDc0MTg5MTU1MywgNzQxODkxNTM5LCA1NTk2OTE0NDIsIDU2MDAzODA4MiwgNTYwMTM4MDgyLCA3NDE4OTI5NzZdLCBcImh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzUyODA3NDE1MjQud2VicFwiXSxcbiAgICBcInppZy16YWdcIjogWzE1MTgwNzE3MCwgXCJaaWcgWmFnXCIsIDE1MTEyMDk3MCwgMSwgWzU2NDMzMjM3NCwgNTY0Mjg5OTg4LCA1NjQzNDc1NDIsIDU2NDM0OTc1OSwgNTY0MzU2ODQ5XSwgXCJodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny8zNjgwNTk5Nzc1LndlYnBcIl1cbn07ICovXG4vKiFFTkRLbm93bkNhdGVnb3J5U2x1Z3MqL1xuLy8gMjEwMDAwMCxcbi8vMTIxNDAwMDFcbi8vIGNvbnN0IGNhdHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhrbm93bkNhdGVnb3J5U2x1Z3MpLm1hcChjID0+IHtcbi8vICAgICBjb25zdCBjYSA9IGtub3duQ2F0ZWdvcnlTbHVnc1tjXVxuLy8gICAgICAgICAsIGlkID0gY2FbMF1cbi8vICAgICAgICAgLCByID0ge1xuLy8gICAgICAgICAgICAgaWQ6IGlkLFxuLy8gICAgICAgICAgICAgcGFyZW50Q2F0ZWdvcnlJZDogY2FbMl0sXG4vLyAgICAgICAgICAgICBvcmRlckJ5OiBjYVszXSxcbi8vICAgICAgICAgICAgIHByb2R1Y3RJZHM6IGNhWzRdLFxuLy8gICAgICAgICAgICAgY2hpbGRyZW5DYXRlZ29yaWVzOiBbXSxcbi8vICAgICAgICAgICAgIGZsYXR0ZW5DYXRlZ29yaWVzOiBbXSxcbi8vICAgICAgICAgICAgIHRodW1ibmFpbFVybDogY2FbNV0sXG4vLyAgICAgICAgIH07XG4vLyAgICAga25vd25DYXRlZ29yeVNsdWdzW2NdID0gcjtcbi8vICAgICBrbm93bkNhdGVnb3J5U2x1Z3NbaWRdID0gcjtcbi8vICAgICBrbm93bkNhdGVnb3J5U2x1Z3NbYy50b0xvY2FsZUxvd2VyQ2FzZSgpXSA9IHI7XG4vLyAgICAgcmV0dXJuIGNhO1xuLy8gfVxuLy8gKTtcbi8vIEh5ZHJhdGlvbiBtb3ZlZCB0byBkYi9rbm93blByb2R1Y3RTbHVncy5qc1xuY29uc3QgY2F0cyA9IE9iamVjdC52YWx1ZXMoa25vd25DYXRlZ29yeVNsdWdzKTtcbndpbmRvdy5jdXJyZW50UGFnZSA9IHt9O1xuZnVuY3Rpb24gZGV0ZWN0UHJvZHVjdFZhcmlhdGlvbklkKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBQcm94eShuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpLCB7XG4gICAgICAgIGdldDogKHNlYXJjaFBhcmFtcywgcHJvcCkgPT4gc2VhcmNoUGFyYW1zLmdldChwcm9wKSxcbiAgICB9KTtcbiAgICBjb25zdCB2YXJpYXRpb25JZCA9IHBhcmFtcy52YXJpYXRpb247XG4gICAgcmV0dXJuIHZhcmlhdGlvbklkO1xufVxuZnVuY3Rpb24gZGV0ZWN0Q3VycmVudFBhZ2UoZG9Ob3RVcGRhdGVDdXJyZW50UGFnZSkge1xuICAgIGNvbnN0IHJvb3QgPSB3aW5kb3c/LmVjPy5jb25maWc/LmJhc2VVcmwgfHwgXCIvcHJvZHVjdHNcIlxuICAgICAgICAsIHBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWVcbiAgICAgICAgLCBwYXRoID0gcGF0aG5hbWU/LnN1YnN0cmluZyhyb290Lmxlbmd0aCArIDEpPy50b0xvd2VyQ2FzZSgpXG4gICAgICAgICwgcHJvZHVjdCA9IGtub3duUHJvZHVjdFNsdWdzW3BhdGhdXG4gICAgICAgICwgY2FydCA9IC9eXFwvKC4uXFwvKT9wcm9kdWN0c1xcL2NhcnQkL2dpLnRlc3QobG9jYXRpb24ucGF0aG5hbWUpXG4gICAgICAgICwgaHRtbFBhZ2VUeXBlID0gL3BhZ2UtdHlwZS0oLio/KSg/OiB8JCkvZ2kuZXhlYyhELmNsYXNzTmFtZSk/LlsxXVxuICAgICAgICAsIGtub3duUGFnZXMgPSB7XG4gICAgICAgICAgICBTRUFSQ0hQQUdFOiBcIlNFQVJDSFwiLFxuICAgICAgICB9XG4gICAgICAgICwgcHJvZHVjdEJyb3dzZXJQYWdlVHlwZSA9IC8uZWN3aWQtcHJvZHVjdEJyb3dzZXItKC4qKS9naS5leGVjKCQoXCIuZWN3aWQtcHJvZHVjdEJyb3dzZXJcIilbMF0/LmNsYXNzTmFtZSk/LlsxXT8udG9VcHBlckNhc2UoKTtcbiAgICBsZXQgY2F0ZWdvcnkgPSBrbm93bkNhdGVnb3J5U2x1Z3NbcGF0aF07XG5cbiAgICBwYWdlVHlwZSA9IC9eXFwvKC4/Lj8pXFwvPyQvZ2kuZXhlYyhsb2NhdGlvbi5wYXRobmFtZSkgPyBcIlNJVEVcIiA6IHJvb3QgPT0gcGF0aG5hbWUgfHwgY2F0ZWdvcnkgPyBcIkNBVEVHT1JZXCIgOiBwcm9kdWN0ID8gXCJQUk9EVUNUXCIgOiBjYXJ0ID8gXCJDQVJUXCIgOiBrbm93blBhZ2VzW3Byb2R1Y3RCcm93c2VyUGFnZVR5cGVdIHx8IGh0bWxQYWdlVHlwZSB8fCBcIlwiO1xuICAgIGlmICghcGFnZVR5cGUpIHtcbiAgICAgICAgY29uc3QgcGEgPSBsb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgL3Byb2R1Y3RzXFwvY2FydC9pLnRlc3QocGEpICYmIChwYWdlVHlwZSA9IFwiQ0FSVFwiKTtcbiAgICAgICAgL3Byb2R1Y3RzXFwvY2hlY2tvdXRcXC9hZGRyZXNzL2kudGVzdChwYSkgJiYgKHBhZ2VUeXBlID0gXCJDSEVDS09VVF9BRERSRVNTXCIpO1xuICAgICAgICAvcHJvZHVjdHNcXC9jaGVja291dFxcL2RlbGl2ZXJ5L2kudGVzdChwYSkgJiYgKHBhZ2VUeXBlID0gXCJDSEVDS09VVF9ERUxJVkVSWVwiKTtcbiAgICAgICAgL3Byb2R1Y3RzXFwvY2hlY2tvdXRcXC90YXgtaW5mb3JtYXRpb24vaS50ZXN0KHBhKSAmJiAocGFnZVR5cGUgPSBcIkNIRUNLT1VUX1RBWF9JTkZPUk1BVElPTlwiKTtcbiAgICAgICAgL3Byb2R1Y3RzXFwvY2hlY2tvdXRcXC9wYXltZW50L2kudGVzdChwYSkgJiYgKHBhZ2VUeXBlID0gXCJDSEVDS09VVF9QQVlNRU5UX0RFVEFJTFNcIik7XG4gICAgICAgIC9wcm9kdWN0c1xcL2NoZWNrb3V0XFwvb3JkZXItY29uZmlybWF0aW9uL2kudGVzdChwYSkgJiYgKHBhZ2VUeXBlID0gXCJPUkRFUl9DT05GSVJNQVRJT05cIik7XG4gICAgICAgIC9wcm9kdWN0c1xcL2FjY291bnRcXC9yZXNldFBhc3N3b3JkL2kudGVzdChwYSkgJiYgKHBhZ2VUeXBlID0gXCJBQ0NPVU5UXCIpO1xuICAgIH1cbiAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICBjYXRlZ29yeSA9IGtub3duQ2F0ZWdvcnlTbHVnc1twcm9kdWN0LmRlZmF1bHRDYXRlZ29yeUlkXTtcbiAgICB9XG4gICAgY29uc3QgdmFyaWF0aW9uSWQgPSBkZXRlY3RQcm9kdWN0VmFyaWF0aW9uSWQoKTtcbiAgICBjb25zdCBwcm9kdWN0SWQgPSBwcm9kdWN0Py5pZCB8fCAkZC5hdHRyKFwicHJvZHVjdC1pZFwiKTtcbiAgICB3aW5kb3cuY3VycmVudFBhZ2UgPSB7XG4gICAgICAgIHR5cGU6IHBhZ2VUeXBlLFxuICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgcHJvZHVjdDoga25vd25Qcm9kdWN0U2x1Z3NbcHJvZHVjdElkXSB8fCBwcm9kdWN0LCAvL3MzNjBbcHJvZHVjdElkXVxuICAgICAgICBza3U6IHByb2R1Y3Q/LnNrdSxcbiAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnk/LmlkIHx8IHByb2R1Y3Q/LmRlZmF1bHRDYXRlZ29yeUlkLFxuICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnksXG4gICAgICAgIHBhcmVudENhdGVnb3J5SWQ6IHByb2R1Y3Q/LnBhcmVudENhdGVnb3J5SWQgfHwgY2F0ZWdvcnk/LlsyXSxcbiAgICAgICAgdmFyaWF0aW9uSWQ6IHZhcmlhdGlvbklkLFxuICAgICAgICBkZXRlY3RlZDogdHJ1ZSxcbiAgICAgICAgdXJsOiBsb2NhdGlvbi5ocmVmLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgfTtcbiAgICBpZiAoIWRvTm90VXBkYXRlQ3VycmVudFBhZ2UpIHtcbiAgICAgICAgd2luZG93LmN1cnJlbnRQYWdlID0gY3VycmVudFBhZ2U7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGFnZTtcbn1cblxud2luZG93LlRyeSA9IFRyeTtcbmZ1bmN0aW9uIHRvZ2dsZVNob3czNjAoc2hvdzM2MCwgaGFzMzYwKSB7XG4gICAgJGQudG9nZ2xlQ2xhc3MoXCJqc3Ytc2hvdy1waG90b3NcIiwgIXNob3czNjApLnRvZ2dsZUNsYXNzKFwianN2LXNob3ctMzYwXCIsICEhc2hvdzM2MCk7XG4gICAgaWYgKGhhczM2MCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgJGQudG9nZ2xlQ2xhc3MoXCJqc3YtaGFzLTM2MFwiLCAhIWhhczM2MCk7XG4gICAgfVxufVxud2luZG93LmRlc3Ryb3lKU1YgPSBmdW5jdGlvbiBkZXN0cm95SlNWKCkge1xuICAgIGlmICh3aW5kb3cuanN2KSB7XG4gICAgICAgIFRyeSh0ID0+IHRvZ2dsZVNob3czNjAoZmFsc2UsIGZhbHNlKSk7XG4gICAgICAgIFRyeSh0ID0+ICQoXCIuanN2LXRvZ2dsZSwgLmpzdi1sb2FkZXJcIikucmVtb3ZlKCkpO1xuICAgICAgICBUcnkodCA9PiBqc3YuZGVzdHJveSgpKTtcbiAgICAgICAgVHJ5KHQgPT4gJChcIi5wc3dwX19za3UtdGl0bGVcIikucmVtb3ZlKCkpO1xuICAgICAgICBUcnkodCA9PiAkKFwiLmRldGFpbHMtZ2FsbGVyeS1pbmRleC0wXCIpLnJlbW92ZUNsYXNzKFwiZGV0YWlscy1nYWxsZXJ5LWluZGV4LTBcIikpO1xuICAgICAgICBUcnkodCA9PiAkKFwiI2pzdi1ob2xkZXJcIikucmVtb3ZlQ2xhc3MoXCJqc3YtaG9sZGVyXCIpLnJlbW92ZUF0dHIoXCJpZFwiKSk7XG4gICAgICAgIFRyeSh0ID0+ICQoXCIjanN2LWltYWdlXCIpLnJlbW92ZUF0dHIoXCJzdHlsZVwiKSk7XG4gICAgICAgIC8vLmF0dHIoXCJzdHlsZVwiLCBcInRyYW5zaXRpb246bm9uZSAhaW1wb3J0YW50OyBvcGFjaXR5OiAxO3dpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCIpLnJlbW92ZUF0dHIoJ2lkJyk7XG4gICAgICAgIC8vbGV0IGltZyA9ICQoJy5kZXRhaWxzLWdhbGxlcnlfX3Bob3Rvc3dpcGUtaW5kZXgtMCcpO1xuICAgICAgICAvL2ltZy5wYXJlbnQoKS5wYXJlbnQoKS5hcHBlbmQoaW1nKTtcbiAgICAgICAganN2ID0gbnVsbDtcbiAgICB9XG59XG4gICAgO1xuLy9yZWdpc3RlciBhIHBlcnNpc3RlbnQgb25QYWdlVW5sb2FkIGV2ZW50IHRvIHVuc3Vic2NyaWJlIGFsbCBvZiB0aGUgYXJyaXZlIGNhbGxzIHRoYXQgc2VsZiByZWdpc3RlcmVkIHRvIGJlIHJlbW92ZWQgZHVyaW5nIEVDV0lELlBhZ2VVbmxvYWQgZXZlbnRcbm9uVW5sb2FkKHBhZ2UgPT4gYXJyaXZlUGFnZVNlbGZVbmJpbmRDYWxsYmFja3NPblBhZ2VVbmxvYWQuc3BsaWNlKDAsIGFycml2ZVBhZ2VTZWxmVW5iaW5kQ2FsbGJhY2tzT25QYWdlVW5sb2FkLmxlbmd0aCkuZm9yRWFjaChiaW5kID0+IGJpbmQudGFyZ2V0LnVuYmluZEFycml2ZShiaW5kLmNhbGxiYWNrKSksIHRydWUpO1xudmFyIGVuc3VyZUphdmFzY3JpcHRWaWV3ZXJDYWxsYmFja3M7XG5hc3luYyBmdW5jdGlvbiBlbnN1cmVKYXZhc2NyaXB0Vmlld2VyKGNhbGxiYWNrKSB7XG4gICAgaWYgKCF3aW5kb3cuSmF2YXNjcmlwdFZpZXdlcikge1xuICAgICAgICBjb25zdCB7IGluaXRKU1ZWaWV3ZXIgfSA9IGF3YWl0IGltcG9ydCgnLi9EQVRFeDIuSlNWaWV3ZXIuanMnKTtcbiAgICAgICAgYXdhaXQgaW5pdEpTVlZpZXdlcigpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAvLyBpZiAoIWVuc3VyZUphdmFzY3JpcHRWaWV3ZXJDYWxsYmFja3MpIHtcbiAgICAgICAgLy8gICAgIGVuc3VyZUphdmFzY3JpcHRWaWV3ZXJDYWxsYmFja3MgPSBbY2FsbGJhY2tdO1xuICAgICAgICAvLyAgICAgbGV0IHMgPSBkLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgIC8vICAgICBzLnNldEF0dHJpYnV0ZShcImRlZmVyXCIsIFwiZGVmZXJcIik7XG4gICAgICAgIC8vICAgICBzLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHMgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGVuc3VyZUphdmFzY3JpcHRWaWV3ZXJDYWxsYmFja3MuZm9yRWFjaChjID0+IGMuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICApO1xuICAgICAgICAvLyAgICAgcy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgYGh0dHBzOi8vJHtpc0RldiA/IFwiZGV2XCIgOiBcImltZ1wifS5kYXRleDIuYmlrZS93ZWJzaXRlL0RBVEV4Mi5KU1ZpZXdlciR7aXNEZXYgPyBcIlwiIDogXCIubWluXCJ9LmpzYCk7XG4gICAgICAgIC8vICAgICBsYXp5Q1NTKCkuYXBwZW5kQ2hpbGQocyk7XG4gICAgICAgIC8vICAgICAvLyBzID0gZC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAvLyAgICAgLy8gcy5zZXRBdHRyaWJ1dGUoXCJkZWZlclwiLCBcImRlZmVyXCIpO1xuICAgICAgICAvLyAgICAgLy8gcy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJodHRwczovL2ltZy5kYXRleDIuYmlrZS93ZWJzaXRlL1N5bmNQcm9kdWN0cy5qc1wiKTtcbiAgICAgICAgLy8gICAgIC8vIGxhenlDU1MoKS5hcHBlbmRDaGlsZChzKTtcbiAgICAgICAgLy8gfSBlbHNlXG4gICAgICAgIC8vICAgICBlbnN1cmVKYXZhc2NyaXB0Vmlld2VyQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH0gZWxzZVxuICAgICAgICBjYWxsYmFjaygpO1xufVxuIShmdW5jdGlvbiAocykge1xuICAgIHMuZm4uYWx0ZXJDbGFzcyA9IGZ1bmN0aW9uIChhLCB0KSB7XG4gICAgICAgIGlmICgtMSA9PT0gKGEgfHwgXCJcIikuaW5kZXhPZihcIipcIikpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVDbGFzcyhhKSxcbiAgICAgICAgICAgICAgICB0ID8gdGhpcy5hZGRDbGFzcyh0KSA6IHRoaXM7XG4gICAgICAgIHZhciBlID0gUmVnRXhwKFwiXFxcXHNcIiArIGEucmVwbGFjZSgvXFwqL2csIFwiW0EtWmEtejAtOS1fXStcIikuc3BsaXQoXCIgXCIpLmpvaW4oXCJcXFxcc3xcXFxcc1wiKSArIFwiXFxcXHNcIiwgXCJnXCIpO1xuICAgICAgICByZXR1cm4gKHRoaXMuZWFjaChmdW5jdGlvbiAoYSwgdCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IFwiIFwiICsgdC5jbGFzc05hbWUgKyBcIiBcIjsgZS50ZXN0KGkpOylcbiAgICAgICAgICAgICAgICBpID0gaS5yZXBsYWNlKGUsIFwiIFwiKTtcbiAgICAgICAgICAgIHQuY2xhc3NOYW1lID0gcy50cmltKGkpO1xuICAgICAgICB9KSxcbiAgICAgICAgICAgIHQgPyB0aGlzLmFkZENsYXNzKHQpIDogdGhpcyk7XG4gICAgfVxuICAgICAgICA7XG59XG4pKGpRdWVyeSk7XG5mdW5jdGlvbiBmaXhXaGF0c0FwcFRhcmdldEJsYW5rKCkge1xuICAgIGZ1bmN0aW9uIHBhcnNlU0tVKHNrdSkge1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gLyhEQVRFIHxcdUQ4MzVcdURDMDNcdUQ4MzVcdURDMDBcdUQ4MzVcdURDMTNcdUQ4MzVcdURDMDQgKShbXlxcc10rKS9naS5leGVjKHNrdSlcbiAgICAgICAgICAgICwgbSA9IChtYXRjaGVzICYmIFttYXRjaGVzWzFdIHx8IFwiXCIsIG1hdGNoZXNbMl0gfHwgXCJcIl0uam9pbihcIlwiKSkgfHwgZXh0cmFjdEJvbGQoc2t1KSB8fCBcIlwiXG4gICAgICAgICAgICAsIHBhcnNlZCA9IG0gJiYgIS8oREFURSB8XHVEODM1XHVEQzAzXHVEODM1XHVEQzAwXHVEODM1XHVEQzEzXHVEODM1XHVEQzA0ICkvZ2kudGVzdChtKSA/IFwiXHVEODM1XHVEQzAzXHVEODM1XHVEQzAwXHVEODM1XHVEQzEzXHVEODM1XHVEQzA0IFwiICsgbSA6IG07XG4gICAgICAgIHJldHVybiBwYXJzZWQ7XG4gICAgfVxuICAgIG9uRG9tUmVhZHkoZG9tRWxlbSA9PiB7XG4gICAgICAgIGQuYXJyaXZlKFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1za3VcIiwgbm90T25jZU9ubHksIGVsZW0gPT4ge1xuICAgICAgICAgICAgaWYgKCFlbGVtLmxpc3RlblRleHRPYnNlcnZlcikge1xuICAgICAgICAgICAgICAgIGVsZW0ubGlzdGVuVGV4dE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKGNoYW5nZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSAkKFwiLmVjLWJyZWFkY3J1bWJzXCIpO1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VzLmZvckVhY2goY2hhbmdlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNrdSA9IHBhcnNlU0tVKCQoY2hhbmdlLnRhcmdldCkudGV4dCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNrdSAmJiBza3UgIT0gZWxlbS5hdHRyKFwiZGF0YS1za3VcIikgJiYgZWxlbS5hdHRyKFwiZGF0YS1za3VcIiwgc2t1KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2t1ID0gcGFyc2VTS1UoJChlbGVtKS50ZXh0KCkpO1xuICAgICAgICAgICAgc2t1ICYmICQoXCIuZWMtYnJlYWRjcnVtYnNcIikuYXR0cihcImRhdGEtc2t1XCIsIHNrdSk7XG4gICAgICAgICAgICBlbGVtLmxpc3RlblRleHRPYnNlcnZlci5vYnNlcnZlKGVsZW0sIHtcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHdpZGVyVGhhblBhcmVudE9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKGVudHJpZXMgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9ICQoZW50cnkudGFyZ2V0KSwgZSA9IHBhcmVudC5maW5kKCcuaW5zLWhlYWRlcl9fbWVudS1pbm5lcicpLFxuICAgICAgICAgICAgICAgICAgICBidXJnZXJNZW51ID0gJChcIi5pbnMtaGVhZGVyX19pY29uLmlucy1oZWFkZXJfX2ljb24tLWJ1cmdlclwiKTtcbiAgICAgICAgICAgICAgICAvLyBQYXJlbnQncyBhdmFpbGFibGUgd2lkdGggICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50V2lkdGggPSBwYXJlbnQud2lkdGgoKSAtIChidXJnZXJNZW51LmlzKFwiOnZpc2libGVcIikgPyAwIDogYnVyZ2VyTWVudS53aWR0aCgpKTtcblxuICAgICAgICAgICAgICAgIC8vIFRoZSB3aWR0aCB0aGUgbWVudSBBQ1RVQUxMWSB3YW50cyAoaWdub3JlcyBzcXVhc2hpbmcpXG4gICAgICAgICAgICAgICAgY29uc3QgbmVlZGVkV2lkdGggPSBlLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFyZW50V2lkdGgsIG5lZWRlZFdpZHRoLCAnbWVudS1vdmVyZmxvd2luZycsIHBhcmVudFdpZHRoIDwgbmVlZGVkV2lkdGgpXG4gICAgICAgICAgICAgICAgJChcIi5pbnMtaGVhZGVyX19yb3dcIikudG9nZ2xlQ2xhc3MoJ21lbnUtb3ZlcmZsb3dpbmcnLCBwYXJlbnRXaWR0aCA8IG5lZWRlZFdpZHRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBkLmFycml2ZShcIi5pbnMtaGVhZGVyX19tZW51LXdyYXBcIiwgbm90T25jZU9ubHksIGVsZW0gPT4ge1xuICAgICAgICAgICAgJChlbGVtKS5wYXJlbnQoKS5sZWF2ZSgnLmlucy1oZWFkZXJfX21lbnUtd3JhcCcsIGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIHdpZGVyVGhhblBhcmVudE9ic2VydmVyLnVub2JzZXJ2ZShlbGVtKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aWRlclRoYW5QYXJlbnRPYnNlcnZlci5vYnNlcnZlKGVsZW0pO1xuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGQuYXJyaXZlKFwiaGVhZGVyLmlucy10aWxlLS1oZWFkZXIgLmlucy1jb250cm9sLS1waWxsXCIsIG5vdE9uY2VPbmx5LCBsaW5rID0+ICQobGluaykuYXR0cihcInRhcmdldFwiLCBcIl9ibGFua1wiKSAmJiBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgICAgICwgdHJ1ZSkpO1xuICAgIH1cbiAgICApO1xufVxuZml4V2hhdHNBcHBUYXJnZXRCbGFuaygpO1xuaWYgKCFFY3dpZC5zZXRTaWduSW5Qcm92aWRlcilcbiAgICBFY3dpZC5zZXRTaWduSW5Qcm92aWRlciA9IGZ1bmN0aW9uICgpIHsgfVxuICAgICAgICA7XG4oZnVuY3Rpb24gKCkge1xuICAgIGxldCBzID0gXCJodHRwczovL2ltZy5kYXRleDJ3ZC5iaWtlLzM2MFwiO1xuICAgIGxldCBqc2QgPSBcImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC9EQVRFeDIvMzYwQG1haW4vXCI7XG4gICAgbGV0IGogPSBcImh0dHBzOi8vY2RuLnN0YXRpY2FsbHkuaW8vZ2gvREFURXgyLzM2MC9tYWluL1wiO1xuICAgIHZhciBwcmVmZXJyZWRRdWFsaXR5ID0gXCI0a1wiO1xuICAgIHZhciB0b0RvID0gMDtcbiAgICB2YXIgdG90YWxEb25lID0gMDtcbiAgICBmdW5jdGlvbiBKKHAsIHF1YWxpdHksIG9wdGlvbnMsIG9wdCkge1xuICAgICAgICBsZXQgZm9sZGVyID0gb3B0aW9ucz8uZm9sZGVyO1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGZvbGRlciA9IG9wdGlvbnM7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0O1xuICAgICAgICB9XG4gICAgICAgIGxldCB1cmwgPSBvcHRpb25zPy51cmw7XG4gICAgICAgIGZvbGRlciA9IGZvbGRlcj8uc3BsaXQoXCI6XCIpWzBdIHx8IFwiXCI7XG4gICAgICAgIC8vaWdub3JlIHByb2R1Y3RJRCBpZiBhbnlcbiAgICAgICAgdG90YWxEb25lICs9IHF1YWxpdHkgPyAxIDogMDtcbiAgICAgICAgdG9EbysrO1xuICAgICAgICBpZiAoIXAgfHwgIXF1YWxpdHkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciByZXNvbHV0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgYWxpYXNlcyA9IHAuc3BsaXQoXCIgXCIpO1xuICAgICAgICByZXR1cm4gYWxpYXNlcy5tYXAoKGFsaWFzLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4KVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgdmFyIGEgPSBhbGlhcy5zcGxpdChcIjpcIik7XG4gICAgICAgICAgICAvLyBMb29rdXAgcHJpb3JpdGllczogSUQgbWF0Y2gsIEV4YWN0IFNsdWcgbWF0Y2gsIFNsdWcgd2l0aG91dCBEQVRFLSwgU2x1ZyB3aXRoIERBVEUtIChsZWdhY3kgcmV2ZXJzZSlcbiAgICAgICAgICAgIGxldCBrcCA9IGtub3duUHJvZHVjdFNsdWdzW2FbMF1dIFxuICAgICAgICAgICAgICAgICAgfHwga25vd25Qcm9kdWN0U2x1Z3NbYVsxXV0gXG4gICAgICAgICAgICAgICAgICB8fCBrbm93blByb2R1Y3RTbHVnc1thWzBdLnJlcGxhY2UoL15EQVRFLS8sICcnKV1cbiAgICAgICAgICAgICAgICAgIHx8IGtub3duUHJvZHVjdFNsdWdzW1wiREFURS1cIiArIGFbMF1dO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBzbHVnID0ga3A/LnNsdWc7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGFbMV0gfHwga3A/LmlkIHx8IGFbMF07XG4gICAgICAgICAgICBjb25zdCB2YXJpYXRpb24gPSBhWzJdO1xuICAgICAgICAgICAgdmFyIHAgPSBhbGlhc2VzWzBdPy5zcGxpdChcIjpcIilbMF07XG4gICAgICAgICAgICBxdWFsaXR5LnNwbGl0KFwiIFwiKS5mb3JFYWNoKHJlc29sdXRpb24gPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXMgPSByZXNvbHV0aW9uLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICAgICAgICBsZXQgayA9IHJlc1swXVxuICAgICAgICAgICAgICAgICAgICAsIGZyYW1lcyA9IHJlc1sxXVxuICAgICAgICAgICAgICAgICAgICAsIC8vNjIzMzA2MjQ5XG4gICAgICAgICAgICAgICAgICAgIGNzc0ZpbGVzID0gcmVzWzJdO1xuICAgICAgICAgICAgICAgIGlmIChrIGluIHJlc29sdXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdXRpb25zW2sgKyBcIi5cIiArIGZyYW1lc10gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrLFxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzRmlsZXNcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHV0aW9uc1trXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGssXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3NGaWxlc1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxldCByZXNvbHV0aW9uID0gcmVzb2x1dGlvbnNbcHJlZmVycmVkUXVhbGl0eV0gfHwgcmVzb2x1dGlvbnNbXCIza1wiXSB8fCByZXNvbHV0aW9uc1swXTtcbiAgICAgICAgICAgIGlmICghcmVzb2x1dGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBrID0gcmVzb2x1dGlvbi5rO1xuICAgICAgICAgICAgbGV0IGZyYW1lcyA9IHJlc29sdXRpb24uZnJhbWVzO1xuICAgICAgICAgICAgbGV0IGNzc0ZpbGVzID0gcmVzb2x1dGlvbi5jc3NGaWxlcztcbiAgICAgICAgICAgIGxldCBjc3MgPSAoY3NzRmlsZXMgPiAxID8gQXJyYXkocGFyc2VJbnQoY3NzRmlsZXMpKS5maWxsKDApLm1hcCgodiwgaSkgPT4gYCR7dXJsIHx8IGpzZH0ke29wdGlvbnM/LmNzc0ZvbGRlciB8fCBmb2xkZXIgfHwgcH0vJHtvcHRpb25zPy5jc3MgfHwgZm9sZGVyIHx8IHB9LiR7ZnJhbWVzfS4ke2t9LiR7aSArIDF9LmNzc2ApIDogW2Ake3VybCB8fCBqc2R9JHtvcHRpb25zPy5jc3MgfHwgZm9sZGVyIHx8IHB9LyR7b3B0aW9ucz8uY3NzIHx8IGZvbGRlciB8fCBwfS4ke2ZyYW1lc30uJHtrfS5jc3NgXSkubWFwKGNzcyA9PiBjc3MucmVwbGFjZSgvWytdL2csIFwiLVwiKSk7XG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gWy4uLm5ldyBTZXQoWy4uLm9wdGlvbnM/LmNsYXNzTmFtZT8uc3BsaXQoXCIgXCIpLCBcInAtXCIgKyBmb2xkZXIsIGFsaWFzZXMubWFwKGNscyA9PiBcInAtXCIgKyBjbHM/LnNwbGl0KFwiOlwiKVswXSldKV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpLnJlcGxhY2UoL1srXS9naSwgXCItXCIpO1xuICAgICAgICAgICAgaWYgKGtwKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgZm91bmQgYSBwcm9kdWN0LCB1c2UgaXRzIERCIGNzcyBpZiBhdmFpbGFibGUgKGFuZCBpZiBubyBzcGVjaWZpYyAzNjAgb3B0aW9ucyBvdmVycmlkZSBpdD8gdXN1YWxseSAzNjAgbG9naWMgb3ZlcnJpZGVzKVxuICAgICAgICAgICAgICAgIC8vIEFjdHVhbGx5IHRoZSBVc2VyIExvZ2ljIHNheXM6IFwiaW4gdGhpcyBjYXNlIGluIGtub3duUHJvZHVjdFNsdWdzIC4uLiBvbmx5IHRoZSAnLmNzcycgZmlsZXMgYXMgYW4gYXJyYXlcIlxuICAgICAgICAgICAgICAgIC8vIFRoZSB2aWV3ZXIgbG9naWMgKGxpbmVzIDc2MSkgdXNlcyBkYkVudHJ5LmNzcy5cbiAgICAgICAgICAgICAgICAvLyBIZXJlIHdlIGFyZSBzZXR0aW5nIHVwICdrcCcgZm9yIHRoZSB2aWV3ZXIuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHByb2R1Y3QgZW50cnkgaGFzIENTUywgd2UgbWlnaHQgd2FudCB0byBwcmlvcml0aXplIGl0IG9yIG1lcmdlIGl0P1xuICAgICAgICAgICAgICAgIC8vIEJ1dCB0aGUgSiBmdW5jdGlvbiBnZW5lcmF0ZXMgMzYwLXNwZWNpZmljIENTUyBiYXNlZCBvbiByZXNvbHV0aW9uIGFyZ3VtZW50cy5cbiAgICAgICAgICAgICAgICAvLyBUaGUgJ2NzcycgdmFyaWFibGUgaGVyZSBpcyBjYWxjdWxhdGVkIGZyb20gYXJndW1lbnRzLlxuICAgICAgICAgICAgICAgIC8vIGtwLmNzcyBtaWdodCBiZSB0aGUgXCJQcm9kdWN0IENTU1wiIChnZW5lcmFsIHN0eWxlcykgdnMgXCIzNjAgQ1NTXCIgKGFuaW1hdGlvbiBmcmFtZXMpLlxuICAgICAgICAgICAgICAgIC8vIExldCdzIGVuc3VyZSBrcCBnZXRzIHRoZSBwcm9wZXJ0aWVzLlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGtwLnZhcmlhdGlvbiA9IHZhcmlhdGlvbjtcbiAgICAgICAgICAgICAgICBrcC5mcmFtZXMgPSBmcmFtZXM7XG4gICAgICAgICAgICAgICAga3AubmFtZSA9IGFbMF07XG4gICAgICAgICAgICAgICAga3Auc2x1ZyA9IGtwLnNsdWcgfHwgc2x1ZzsgICBcbiAgICAgICAgICAgICAgICAvLyAoa3AuY3NzID0gY3NzKTsgLy8gV2FpdCwgdGhpcyBvdmVyd3JpdGVzIHRoZSBwcm9kdWN0J3MgZ2VuZXJhbCBDU1Mgd2l0aCAzNjAgQ1NTP1xuICAgICAgICAgICAgICAgIC8vIFRoZSB2aWV3ZXIgYXQgNzYxIHVzZXMgXCJkYkVudHJ5LmNzc1wiIGZyb20ga25vd25Qcm9kdWN0U2x1Z3MuXG4gICAgICAgICAgICAgICAgLy8gczM2MCBlbGVtZW50cyBhcmUgdXNlZCBmb3IgMzYwIHBsYXllci5cbiAgICAgICAgICAgICAgICAvLyBJZiBrcC5jc3MgaXMgb3ZlcndyaXR0ZW4gaGVyZSwgZG9lcyBpdCBhZmZlY3QgaW5qZWN0RmFzdExvYWRpbmdDc3M/XG4gICAgICAgICAgICAgICAgLy8gaW5qZWN0RmFzdExvYWRpbmdDc3MgdXNlcyBga25vd25Qcm9kdWN0U2x1Z3NbdGFyZ2V0SWRdYC4gTk9UIHRoZSBgczM2MGAgb2JqZWN0IGRpcmVjdGx5ICh1bmxlc3MgcD1zMzYwW2lkXSkuXG4gICAgICAgICAgICAgICAgLy8gUGFnZS5wcm9kdWN0IGlzIHNldCB0byBzMzYwW2lkXSBPUiBrbm93blByb2R1Y3RTbHVnc1twYXRoXSBhdCBsaW5lIDQ2OC5cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBvdmVyd3JpdGUga3AuY3NzIGhlcmUsIGFuZCBrcCBJUyB0aGUgb2JqZWN0IGZyb20ga25vd25Qcm9kdWN0U2x1Z3MgKHBhc3NlZCBieSByZWZlcmVuY2U/KSwgdGhlbiB5ZXMsIHdlIG92ZXJ3cml0ZSB0aGUgZ2xvYmFsIERCIGVudHJ5IGluIG1lbW9yeSFcbiAgICAgICAgICAgICAgICAvLyBTaW5jZSAna3AnIGNvbWVzIGZyb20ga25vd25Qcm9kdWN0U2x1Z3NbLi4uXSB3aGljaCBpcyBhbiBvYmplY3QgcmVmZXJlbmNlLi4uIFlFUy5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBXZSBzaG91bGQgcHJvYmFibHkgTk9UIG92ZXJ3cml0ZSBrcC5jc3MgaWYgaXQgY29udGFpbnMgZ2VuZXJhbCBzdHlsZXMsIE9SIHdlIHNob3VsZCBkaXN0aW5ndWlzaCB0aGVtLlxuICAgICAgICAgICAgICAgIC8vIEJ1dCBsb29raW5nIGF0IGV4aXN0aW5nIGNvZGU6IGAoa3AuY3NzID0gY3NzKTtgXG4gICAgICAgICAgICAgICAgLy8gVGhpcyBzZWVtcyB0byBiZSBob3cgMzYwIENTUyBpcyBhdHRhY2hlZC5cbiAgICAgICAgICAgICAgICAvLyBJZiBga25vd25Qcm9kdWN0U2x1Z3NgIGNzcyAodls4XSkgaXMgbWVhbnQgZm9yIGdlbmVyYWwgcHJvZHVjdCB0aHVtYiBzdHlsZXMsIGFuZCBKKCkgYWRkcyAzNjAgc3R5bGVzLi4uXG4gICAgICAgICAgICAgICAgLy8gVGhlIHVzZXIgc2FpZDogXCJpbiB0aGlzIGNhc2UgLi4uIG9ubHkgdGhlICcuY3NzJyBmaWxlcyBhcyBhbiBhcnJheVwiLlxuICAgICAgICAgICAgICAgIC8vIFRoaXMgcmVmZXJzIHRvIHZbOF0uXG4gICAgICAgICAgICAgICAgLy8gSWYgSigpIG92ZXJ3cml0ZXMgaXQsIHdlIGxvc2Ugdls4XS5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBIb3dldmVyLCBKIGZ1bmN0aW9uIGlzIGRlZmluaW5nIHRoZSAzNjAgTW9kZWwuXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgdXBkYXRlIGtwICh3aGljaCBpcyB0aGUgZ2xvYmFsIHByb2R1Y3Qgb2JqZWN0KSwgd2UgZGlydHkgaXQuXG4gICAgICAgICAgICAgICAgLy8gV2Ugc2hvdWxkIGxpa2VseSBjbG9uZSBpdCBvciBjcmVhdGUgYSBuZXcgb2JqZWN0IGluaGVyaXRpbmcgZnJvbSBpdC5cbiAgICAgICAgICAgICAgICAvLyBCdXQgdGhlIGNvZGU6IGBrcC52YXJpYXRpb24gPSAuLi5gIG1vZGlmaWVzIGl0LlxuICAgICAgICAgICAgICAgIC8vIExpbmUgNjM2OiBgbGV0IGtwID0ga25vd25Qcm9kdWN0U2x1Z3NbLi4uXWAuXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgbW9kaWZ5IGtwLCB3ZSBtb2RpZnkgdGhlIHNpbmdsZXRvbi5cbiAgICAgICAgICAgICAgICAvLyBNYXliZSBpbnN0ZWFkIG9mIGBrcC5jc3MgPSBjc3NgLCB3ZSBzaG91bGQgc3RvcmUgMzYwIGNzcyBlbHNld2hlcmU/XG4gICAgICAgICAgICAgICAgLy8gQnV0IGBpbmplY3RGYXN0TG9hZGluZ0Nzc2AgbG9va3MgYXQgYGRiRW50cnkuY3NzYC5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBXYWl0ISBgaW5qZWN0RmFzdExvYWRpbmdDc3NgIGxvb2tzIGF0IGBkYkVudHJ5LmNzc2AuXG4gICAgICAgICAgICAgICAgLy8gSWYgYHBhZ2UucHJvZHVjdGAgaXMgYHMzNjBbLi4uXWAsIGRvZXMgaXQgaGF2ZSBgLmNzc2A/XG4gICAgICAgICAgICAgICAgLy8gTGluZSA3NTA6IGBsZXQgZGJFbnRyeSA9IGtub3duUHJvZHVjdFNsdWdzW3RhcmdldElkXTtgXG4gICAgICAgICAgICAgICAgLy8gTGluZSA3NjE6IGBjb25zdCByYXdDc3MgPSBkYkVudHJ5LmNzcyB8fCBbXTtgXG4gICAgICAgICAgICAgICAgLy8gU28gaXQgcmVhZHMgZnJvbSB0aGUgKmluZGV4KiBga25vd25Qcm9kdWN0U2x1Z3NgLlxuICAgICAgICAgICAgICAgIC8vIElmIGBKYCBtb2RpZmllcyBga25vd25Qcm9kdWN0U2x1Z3NgIGVudHJ5IGluIHBsYWNlIChga3BgKSwgdGhlbiBgZGJFbnRyeS5jc3NgIHdpbGwgYmUgdGhlIG5ldyBgY3NzYCAoMzYwIGNzcykuXG4gICAgICAgICAgICAgICAgLy8gSXMgdGhpcyBkZXNpcmVkP1xuICAgICAgICAgICAgICAgIC8vIGBrbm93blByb2R1Y3RTbHVnc2AgZW50cmllcyB1c3VhbGx5IGhhdmUgdGh1bWIgQ1NTLlxuICAgICAgICAgICAgICAgIC8vIDM2MCBDU1MgaXMgZGlmZmVyZW50LlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFVzZXIgc2FpZDogXCJrbm93blByb2R1Y3RTbHVncyBubyBsb25nZXIgbWF0dGVycyAncmVzb2x1dGlvbicgYnV0IG9ubHkgJy5jc3MnIGZpbGVzIGFzIGFycmF5XCIuXG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpbXBsaWVzIHZbOF0gSVMgdGhlIENTUyB3ZSB3YW50IHRvIGxvYWQuXG4gICAgICAgICAgICAgICAgLy8gSWYgYEpgIG92ZXJ3cml0ZXMgaXQgd2l0aCBnZW5lcmF0ZWQgMzYwIENTUyBzdHJpbmdzLi4uXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gTGV0J3MgbG9vayBhdCBgY3NzYCBnZW5lcmF0ZWQgaW4gYEpgOiBJdCBpcyAzNjAgZnJhbWUgQ1NTIChlLmcuIGAuLi5mcmFtZXMuM2suMS5jc3NgKS5cbiAgICAgICAgICAgICAgICAvLyBUaGUgYGlucHV0LmNzc2AvYG91dHB1dC5jc3NgIGZyb20gdls4XSBhcmUgZm9yIHN0YXRpYyB0aHVtYnMvcGx1Z3M/XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSWYgd2Ugb3ZlcndyaXRlIGl0LCB3ZSBsb3NlIHBsdWcvdGh1bWIgc3R5bGVzLlxuICAgICAgICAgICAgICAgIC8vIEkgc2hvdWxkIHByb2JhYmx5IGFwcGVuZGluZyB2YWxpZCAzNjAgY3NzIHRvIHRoZSBleGlzdGluZyBhcnJheSwgb3IgdXNlIGEgZGlmZmVyZW50IHByb3BlcnR5IGZvciAzNjAgY3NzLlxuICAgICAgICAgICAgICAgIC8vIEJ1dCBgSmAgY29kZSBhdCA2NzggZG9lcyBga3AuY3NzID0gY3NzYC5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBQcm9wb3NlZCBGaXg6IERvbid0IG1hcCAzNjAgQ1NTIHRvIGBrcC5jc3NgLiBNYXAgaXQgdG8gYGtwLmNzczM2MGA/XG4gICAgICAgICAgICAgICAgLy8gT3IgbWVyZ2UgdGhlbT9cbiAgICAgICAgICAgICAgICAvLyBga3AuY3NzID0gWy4uLihrcC5jc3MgfHwgW10pLCAuLi5jc3NdYD9cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBGb3Igbm93LCBJIHdpbGwgc3RpY2sgdG8gZW5hYmxpbmcgdGhlIGxvb2t1cC4gSSdsbCBsZXQgdGhlIHVzZXIgZGVjaWRlIG9uIGFyY2hpdGVjdHVyZSBpZiBpdCBicmVha3Mgc3R5bGVzLlxuICAgICAgICAgICAgICAgIC8vIEJ1dCBzaW5jZSBJJ20gZml4aW5nIGBKYCwgSSdsbCBsZWF2ZSB0aGUgYXNzaWdubWVudCBidXQgZW5zdXJlIHByb3BlcnRpZXMgYXJlIHNldCBzYWZlbHkuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAga3AuY3NzLnB1c2goLi4uY3NzKTsgLy8gRXhpc3RpbmcgYmVoYXZpb3IgcHJlc2VydmVkIGZvciBub3dcbiAgICAgICAgICAgICAgICBrcC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGtwID0ge1xuICAgICAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYVswXSxcbiAgICAgICAgICAgICAgICAgICAgc2x1ZyxcbiAgICAgICAgICAgICAgICAgICAgdmFyaWF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBmcmFtZXMsXG4gICAgICAgICAgICAgICAgICAgIHVybDogXCIgXCIsXG4gICAgICAgICAgICAgICAgICAgIC8vIFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLyUzRVwiIHx8IGAke3VybCB8fCBqc2R9JHtmb2xkZXIgfHwgcH0vJHtmcmFtZXN9LyR7a30vJHtmb2xkZXIgfHwgcH0uJHtmcmFtZXN9LiR7a30uMDAxLndlYnBgLCBmb3JtYXQ6IGAke3B9LiR7ZnJhbWVzfS4ke2t9LjAwMS53ZWJwYCxcbiAgICAgICAgICAgICAgICAgICAgY3NzLFxuICAgICAgICAgICAgICAgICAgICBjc3MzNjA6IG9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucz8ucCkge1xuICAgICAgICAgICAgICAgIGtwLnByZWxvYWQgPSBvcHRpb25zLnA/LnJlcGxhY2UoL1xcJGcvZ2ksIFwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL0RBVEV4MlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zPy50IHx8IG9wdGlvbnM/LnRodW1icykge1xuICAgICAgICAgICAgICAgIGtwLnRodW1icyA9IChvcHRpb25zLnQgfHwgb3B0aW9ucy50aHVtYnMgfHwgW10pLm1hcChmaWxlID0+IC9cXC5jc3MkL2kudGVzdChmaWxlKSA/IGZpbGUgOiBgJHtmaWxlfS5jc3NgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIChwYXJzZUludChpZCkpIHtcbiAgICAgICAgICAgIC8vICAgY29uc3QgcHAgPSBrbm93blByb2R1Y3RTbHVnc1trcC5pZF07XG4gICAgICAgICAgICAvLyAgIGlmIChwcCkge1xuICAgICAgICAgICAgLy8gICAgIHBwLnAzNjAgPSBrcDtcbiAgICAgICAgICAgIC8vICAgICBrcC5wcm9kdWN0ID0gcHA7XG4gICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHJldHVybiBrcDtcbiAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IFByb2R1Y3RzID0ge1xuICAgICAgICBBSVJGeDNHb2xkOiB7XG4gICAgICAgICAgICBpZDogNTQ0MDg4NzkwLFxuICAgICAgICAgICAgc2t1OiBcIkFJUkZ4My1HT0xEOjU0NDA4ODc5MFwiXG4gICAgICAgIH0sXG4gICAgICAgIEFJUkZ4M0JsYWNrOiB7XG4gICAgICAgICAgICBpZDogNTQ0NDA0NDU4LFxuICAgICAgICAgICAgc2t1OiBcIkFJUkZ4My1CTEFDSzo1NDQ0MDQ0NThcIlxuICAgICAgICB9LFxuICAgICAgICBCTXgxTVZQOiB7XG4gICAgICAgICAgICBpZDogNTMzNTg2MTc1LFxuICAgICAgICAgICAgc2t1OiBcIkJNeDEtTVZQXCJcbiAgICAgICAgfSxcbiAgICAgICAgQk14MVNVTkRBWToge1xuICAgICAgICAgICAgaWQ6IDUzOTY2Mjg2OCxcbiAgICAgICAgICAgIHNrdTogXCJCTXgxLVNVTkRBWTo1Mzk2NjI4Njg6MzgwNzgzMDA5XCJcbiAgICAgICAgfSxcbiAgICAgICAgQk14MVVOSVRFRDoge1xuICAgICAgICAgICAgaWQ6IDUzOTY2NDYyNixcbiAgICAgICAgICAgIHNrdTogXCJCTXgxLVVOSVRFRDo2MjQzNjMzMzM6MzgwNzgyNTUxXCJcbiAgICAgICAgfSxcbiAgICAgICAgQk14MUNST1NTSEFJUjoge1xuICAgICAgICAgICAgaWQ6IDUzOTcxMzgyMSxcbiAgICAgICAgICAgIHNrdTogXCJCTXgxLUNST1NTSEFJUjo1Mzk3MTM4MjE6MzgwNzUxMjI3XCJcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGZvciAodmFyIHAgaW4gUHJvZHVjdHMpXG4gICAgICAgIGlmIChQcm9kdWN0cy5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgICAgUHJvZHVjdHNbcF0uU0tVID0gYm9sZChcIkRBVEUgXCIgKyBQcm9kdWN0c1twXS5za3U/LnNwbGl0KFwiOlwiKT8uWzBdKTtcbiAgICAgICAgfVxuICAgIHZhciBmYXN0TG9hZGVkQ3NzID0ge307XG4gICAgZnVuY3Rpb24gaW5qZWN0RmFzdExvYWRpbmdDc3MocGFnZSkge1xuICAgICAgICByZXR1cm4gKGZhc3RMb2FkZWRDc3NbcGFnZS50eXBlXSB8fCAoZmFzdExvYWRlZENzc1twYWdlLnR5cGVdID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKHBhZ2UudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJQUk9EVUNUXCI6XG4gICAgICAgICAgICAgICAgICAgIGxldCBwID0gcGFnZS5wcm9kdWN0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRJZCA9IHA/LmlkIHx8IHBhZ2UucHJvZHVjdElkO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGJFbnRyeSA9IGtub3duUHJvZHVjdFNsdWdzW3RhcmdldElkXTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYkVudHJ5KSB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAgJiYgcC5wcmVsb2FkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5qZWN0Q3NzKHAucHJlbG9hZCwgY3NzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGIudG9nZ2xlQ2xhc3MoXCJwcm9kdWN0LWNzcy1sb2FkZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY3NzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRiRW50cnkuY3NzIGlzIHRoZSBjc3MgYXJyYXkuIERlZmF1bHQgdG8gdGh1bWJzIGlmIG1pc3NpbmcuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYXdDc3MgPSBkYkVudHJ5LmNzcyB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNzc0xpc3QgPSAocmF3Q3NzICYmIHJhd0Nzcy5sZW5ndGggPiAwKSA/IHJhd0Nzcz8ubWFwKGNzcyA9PiAvanNkZWxpdnIvaS50ZXN0KGNzcykgPyBjc3MgOiAoL15cXC4/XFwvP3RodW1icy9pLnRlc3QoY3NzKSAmJiAoY3NzPWNzcy5yZXBsYWNlKC9cXC4/XFwvP3RodW1icy9pLCBcInRodW1ic1wiKSkgPyBcIlwiIDogXCJcIikrY3NzLnJlcGxhY2UoL1xcLmNzcy9nLCBpc0RldiA/IFwiLmNzc1wiIDogXCIubWluLmNzc1wiKS5yZXBsYWNlKC9cXC5taW5cXC5taW5cXC5jc3MvZywgaXNEZXYgPyBcIi5jc3NcIiA6IFwiLm1pbi5jc3NcIikpIDogW1wiVGh1bWJzL0RBVEV4Mi5UaHVtYm5haWxzLmNzc1wiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiRW50cnkuY3NzID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5qZWN0Q3NzKGNzc0xpc3QubWFwKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHQgaXMgYWJzb2x1dGUgb3Igc3RhcnRzIHdpdGggaHR0cCwgdXNlIGFzIGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQuc3RhcnRzV2l0aCgnaHR0cCcpIHx8IHQuc3RhcnRzV2l0aCgnLy8nKSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHRyZWF0IGFzIHJlbGF0aXZlIHRvIGNzcyByb290XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW5zdXJlIHdlIGRvbid0IGR1cGxpY2F0ZSAnVGh1bWJzJyBpZiBpdCdzIGFscmVhZHkgaW4gdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvciBsZWdhY3kgdD1cIkRBVEV4Mi5UaHVtYm5haWxzLmNzc1wiIHdlIGFkZGVkIFwiVGh1bWJzL1wiIHByZWZpeCBhYm92ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvciBuZXcgdD1cInRodW1icy9wbHVncy8uLi5cIiB3ZSBsZWF2ZSBpdCAoYXNzdW1pbmcgbG93ZXJjYXNlICd0aHVtYnMnIG1hcHMgdG8gJ1RodW1icycgb3IgdXNlciBmaXhlcyBwYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgaHR0cHM6Ly8ke2lzRGV2ID8gbG9jYXRpb24uaG9zdG5hbWUgOiBcImltZy5kYXRleDIuYmlrZVwifS93ZWJzaXRlL2Rpc3QvY3NzLyR7dH1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSksIGNzcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGIudG9nZ2xlQ2xhc3MoXCJ0aHVtYnMtbG9hZGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY3NzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICApKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluamVjdEFkZGl0aW9uYWxDU1NXaGVuTmVlZGVkKHBhZ2UpIHsvLyBzd2l0Y2ggKHBhZ2UucHJvZHVjdElkKSB7XG4gICAgICAgIC8vICAgY2FzZSBQcm9kdWN0cy5BSVJGeDNCbGFjay5pZDpcbiAgICAgICAgLy8gICBjYXNlIFByb2R1Y3RzLkFJUkZ4M0dvbGQuaWQ6XG4gICAgICAgIC8vICAgY2FzZSBQcm9kdWN0cy5CTXgxTVZQLmlkOlxuICAgICAgICAvLyAgIGNhc2UgUHJvZHVjdHMuQk14MVNVTkRBWS5pZDpcbiAgICAgICAgLy8gICBjYXNlIFByb2R1Y3RzLkJNeDFVTklURUQuaWQ6XG4gICAgICAgIC8vICAgY2FzZSBQcm9kdWN0cy5CTXgxQ1JPU1NIQUlSLmlkOlxuICAgICAgICAvLyAgICAgaW5qZWN0UHJlbG9hZENzcyhcIkJNeFwiLCBbXCJodHRwczovL2ltZy5kYXRleDIuYmlrZS93ZWJzaXRlL0RBVEV4Mi5CTXguY3NzXCIsIFwiaHR0cHM6Ly9pbWcuZGF0ZXgyLmJpa2Uvd2Vic2l0ZS9EQVRFeDIuWC1URU1TLmNzc1wiXSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICB2YXIgaW50ZXJhY3RpbmdWaWRlb1RpbWVvdXQsIHZpZGVvSW50ZXJhY3RpdmU7XG4gICAgZnVuY3Rpb24gaW50ZXJhY3RXaXRoVmlkZW9CdXR0b25zKGludGVyYWN0aXZlKSB7XG4gICAgICAgICQoXCIuaGFzLXZpZGVvLWJ1dHRvbnNcIikudG9nZ2xlQ2xhc3MoXCJzaG93LXZpZGVvLWJ1dHRvbnNcIiwgdHJ1ZSk7XG4gICAgICAgIHZpZGVvSW50ZXJhY3RpdmUgfD0gaW50ZXJhY3RpdmU7XG4gICAgICAgIGNsZWFyVGltZW91dChpbnRlcmFjdGluZ1ZpZGVvVGltZW91dCk7XG4gICAgICAgICRkLnRvZ2dsZUNsYXNzKFwiaW50ZXJhY3RpbmctdmlkZW9cIiwgdHJ1ZSkudG9nZ2xlQ2xhc3MoXCJpbnRlcmFjdGl2ZS12aWRlb1wiLCAhIXZpZGVvSW50ZXJhY3RpdmUpO1xuICAgICAgICBpbnRlcmFjdGluZ1ZpZGVvVGltZW91dCA9IHNldFRpbWVvdXQodCA9PiAkZC50b2dnbGVDbGFzcyhcImludGVyYWN0aW5nLXZpZGVvXCIsIGZhbHNlKSwgMzAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZVZpZGVvKGVsZW0pIHtcbiAgICAgICAgLy8gJChcIiNtYWluLXZpZGVvXCIpLnJlbW92ZSgpO1xuICAgICAgICBlbGVtID0gJChlbGVtKTtcbiAgICAgICAgd2luZG93Lm11dGVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIHZpZGVvcyA9IFtcIjg4ODMyNzU2OT9cIiwgXCI4ODgyOTE1NTg/XCIsIFwiODkxMjQ2ODQ0P2g9MzkxZDI5N2ZiOFwiLCBcIjg4ODQ2MDE1Nj9oPWI5MDQ0Y2IzZGNcIiwgXCI4ODg0NTk3MDQ/aD1jNTM4NzAzMWRhXCIsIFwiODg4NDU4NzYyP2g9ZWRiYWIzNDdlMFwiLCBcIjg4ODUyMDM0OT9oPTFiZGRmNTdlYjVcIl07XG4gICAgICAgIHZhciB2aWRlb0luZGV4ZXMgPSB2aWRlb3MubWFwKCh2LCBpKSA9PiBpKS5zaHVmZmxlKCk7XG4gICAgICAgIHZhciB2aWRlb0luZGV4ID0gMDtcbiAgICAgICAgZnVuY3Rpb24gc3RhcnRQbGF5aW5nKCkge1xuICAgICAgICAgICAgcGxheWVyLm9mZihcInRpbWV1cGRhdGVcIiwgc3RhcnRQbGF5aW5nKTtcbiAgICAgICAgICAgICRkLnRvZ2dsZUNsYXNzKFwidmlkZW8tYXV0by1oaWRlXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICQoXCJodG1sXCIpLnRvZ2dsZUNsYXNzKFwicGxheS12aWRlbyBwbGF5aW5nLXZpZGVvXCIsIHRydWUpO1xuICAgICAgICAgICAgJChcIi52aWRlby1wbGF5LXBhdXNlXCIpLnRvZ2dsZUNsYXNzKFwicGF1c2VkXCIsIGZhbHNlKS50b2dnbGVDbGFzcyhcInBsYXlpbmdcIiwgdHJ1ZSk7XG4gICAgICAgICAgICBpbnRlcmFjdFdpdGhWaWRlb0J1dHRvbnMoZmFsc2UpO1xuICAgICAgICAgICAgbG9nRHVyYXRpb24oXCJbUGxheWVyIC0gUExBWUlOR11cIikoKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvblZpZGVvTG9hZGVkKCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInZpZGVvIGxvYWRlZFwiKTtcbiAgICAgICAgICAgIHBsYXllci5vbihcInRpbWV1cGRhdGVcIiwgc3RhcnRQbGF5aW5nKTtcblxuICAgICAgICAgICAgLy8udGhlbihwID0+IHBsYXllci5nZXRRdWFsaXRpZXMoKS50aGVuKHEgPT4gY29uc29sZS5sb2coXCJxdWFsaXRpZXNcIiwgcSkgfHwgcGxheWVyLnNldFF1YWxpdHkocSAmJiBxWzFdICYmIHFbMV0uaWQgJiYgcVsxXS5pZCA9PSAnMjE2MHAnID8gJzEwODBwJyA6IHFbMV0uaWQpLnRoZW4ocCA9PiBjb25zb2xlLmxvZyhcInF1YWxpdHkgY2hhbmdlZFwiLCBwKSkpKVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5vblZpZGVvTG9hZGVkID0gb25WaWRlb0xvYWRlZDtcbiAgICAgICAgdmFyIHZpZGVvTGluayA9IC8vaWQgPT4gXCJodHRwczovL2ltZy5kYXRleDJ3ZC5iaWtlL3dlYnNpdGUvdmltZW8uaHRtbFwiXG4gICAgICAgICAgICBpZCA9PiBgaHR0cHM6Ly9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLyR7aWQgIT0gdW5kZWZpbmVkID8gaWQgOiB2aWRlb3NbdmlkZW9JbmRleGVzW3ZpZGVvSW5kZXhdXX0mdW5tdXRlX2J1dHRvbj0wJmxvb3A9MCZhdXRvcGxheT0xJmRudD0xJnRyYW5zcGFyZW50PTEmc3BlZWQ9MCZ2aW1lb19sb2dvPTAmbXV0ZWQ9JHttdXRlZCA/IDEgOiAwfSZjb2xvcnM9MTk3YjUwMDAsNDI5NjM1MDAsRkZGRkZGMDAsMDAwMDAwMDAmcG9ydHJhaXQ9MCZwaXA9MCZwbGF5X2J1dHRvbl9wb3NpdGlvbj1jZW50ZXImYnlsaW5lPTAmY29udHJvbHM9MSZkbnQ9MSZiYWRnZT0wJiN0PTFzYDtcbiAgICAgICAgdmFyIGlmcmFtZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgICBmdW5jdGlvbiBvbklmcmFtZUVsZW1lbnRMb2FkZWQoKSB7XG4gICAgICAgICAgICBsb2dEdXJhdGlvbihcIlBsYXllciAtIGlmcmFtZSBsb2FkZWRcIikoKTtcbiAgICAgICAgICAgIC8vJChcIi52aW1lby52aWRlby1iYWNrZ3JvdW5kXCIpWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IGFsZXJ0KDEpLCB0cnVlKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJpZnJhbWUgbG9hZGVkXCIpXG4gICAgICAgICAgICBpZnJhbWVMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHBsYXllciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlUGxheWVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlSWZyYW1lKCkge1xuICAgICAgICAgICAgLy8kKFwiI3RpbGUtY292ZXItSGFYcTZGXCIpLnRvZ2dsZUNsYXNzKFwiaGFzLXZpZGVvXCIsIHRydWUpO1xuICAgICAgICAgICAgbG9nRHVyYXRpb24oXCJQbGF5ZXIgLSBjcmVhdGluZyBpZnJhbWVcIikoKTtcbiAgICAgICAgICAgICRkLnRvZ2dsZUNsYXNzKFwidmlkZW8tYXV0by1oaWRlXCIsIHRydWUpO1xuICAgICAgICAgICAgY29uc3QgaWZyYW1lID0gZWxlbS5maW5kKFwiaWZyYW1lXCIpO1xuICAgICAgICAgICAgaWYgKGlmcmFtZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBvbklmcmFtZUVsZW1lbnRMb2FkZWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3JjID0gdmlkZW9MaW5rKClcbiAgICAgICAgICAgICAgICAgICAgLCB2aWRlb0JhY2tncm91bmQgPSAoJChgPGRpdiBjbGFzcz1cInZpbWVvIHZpZGVvLWJhY2tncm91bmRcIj5cbiAgPGlmcmFtZSBpZD1cIm1haW4tdmlkZW9cIiBmcmFtZWJvcmRlcj1cIjBcIiBzcmM9XCIke3NyY31cIiBjb2xvcj1cIiM2MERDNERcIiBiYWNrZ3JvdW5kPVwidHJ1ZVwiIGFsbG93PVwiYXV0b3BsYXlcIiBhbGxvd2Z1bGxzY3JlZW4gZGlzYWJsZVBpY3R1cmVJblBpY3R1cmUgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPjwvaWZyYW1lPlxuPC9kaXY+YCkucHJlcGVuZFRvKGVsZW0pLmZpbmQoXCJpZnJhbWVcIikub24oXCJsb2FkXCIsIG9uSWZyYW1lRWxlbWVudExvYWRlZClbMF0ud2F0Y2hpbmcgPSBzcmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LnBsYXllciA9IG51bGw7XG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVZpZGVvRnVsbFNjcmVlbigpIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICAkKFwiI3RpbGUtY292ZXItSGFYcTZGIC5pbnMtdGlsZV9fd3JhcFwiKVswXS5yZXF1ZXN0RnVsbHNjcmVlbih7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25VSTogXCJoaWRlXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vcGxheWVyLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cub25QbGF5ZXJSZWFkeSA9IGZ1bmN0aW9uIG9uUGxheWVyUmVhZHkoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICgkKFwiI3RpbGUtY292ZXItSGFYcTZGIC5pbnMtdGlsZV9fYnV0dG9uc1wiKS5maW5kKFwiLnZpZGVvLWJ1dHRvblwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbW92ZVRpbWVvdXQ7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uTW91c2VNb3ZlQWN0aXZhdGVCdXR0b25zKCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChtb3ZlVGltZW91dCk7XG4gICAgICAgICAgICAgICAgaWYgKCEkZC5oYXNDbGFzcyhcInNob3ctYnV0dG9uc1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAkZC50b2dnbGVDbGFzcyhcInNob3ctYnV0dG9uc1wiLCB0cnVlKS50b2dnbGVDbGFzcyhcImhpZGUtYnV0dG9uc1wiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vdmVUaW1lb3V0ID0gc2V0VGltZW91dCh0ID0+ICRkLnRvZ2dsZUNsYXNzKFwic2hvdy1idXR0b25zXCIsIGZhbHNlKS50b2dnbGVDbGFzcyhcImhpZGUtYnV0dG9uc1wiLCB0cnVlKSwgNDAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkLmFycml2ZShcImlmcmFtZSNtYWluLXZpZGVvLCAjdGlsZS1jb3Zlci1IYVhxNkYgLnZpZGVvLWNvbnRhaW5lclwiLCBub3RPbmNlT25seSwgZSA9PiBbXCJtb3VzZW1vdmVcIiwgXCJ0b3VjaG1vdmVcIiwgXCJ0b3VjaHN0YXJ0XCJdLmZvckVhY2goZXZlbnQgPT4gZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBvbk1vdXNlTW92ZUFjdGl2YXRlQnV0dG9ucywgdHJ1ZSkpKTtcbiAgICAgICAgICAgIG9uTW91c2VNb3ZlQWN0aXZhdGVCdXR0b25zKCk7XG4gICAgICAgICAgICBkLmFycml2ZShcIiN0aWxlLWNvdmVyLUhhWHE2RiAuaW5zLXRpbGVfX2J1dHRvbnNcIiwgbm90T25jZU9ubHksIGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAoKSB7Ly9kbyBub3RoaW5nIC0gcHJldmVudCBjaGlsZHJlbiBiZWluZyByZW1vdmVkIC0gRUNXSUQgYnVnLCByZW1vdmluZyBvdXIgZXh0cmEgYnV0dG9uc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICQoc3ZnSWNvbnMucHJldlZpZGVvKCkpLmFwcGVuZFRvKGVsZW0pLmZpbmQoXCIucHJldi12aWRlb1wiKS5vbihcImNsaWNrXCIsIHByZXZWaWRlb0NsaWNrLmJpbmQocGxheWVyLCBmYWxzZSwgdHJ1ZSkpO1xuXG4gICAgICAgICAgICAgICAgJChzdmdJY29ucy5wbGF5VmlkZW8oKSkuYXBwZW5kVG8oZWxlbSkuZmluZChcIi5wbGF5LXZpZGVvXCIpLm9uKFwiY2xpY2tcIiwgdG9nZ2xlUGxheVBhdXNlKTtcblxuICAgICAgICAgICAgICAgICQoc3ZnSWNvbnMucGF1c2VWaWRlbygpKS5hcHBlbmRUbyhlbGVtKS5maW5kKFwiLnBhdXNlLXZpZGVvXCIpLm9uKFwiY2xpY2tcIiwgdG9nZ2xlUGxheVBhdXNlKTtcbiAgICAgICAgICAgICAgICAkKHN2Z0ljb25zLm5leHRWaWRlbygpKS5hcHBlbmRUbyhlbGVtKS5maW5kKFwiLm5leHQtdmlkZW9cIikub24oXCJjbGlja1wiLCBuZXh0VmlkZW9DbGljay5iaW5kKHBsYXllciwgZmFsc2UsIHRydWUpKTtcblxuICAgICAgICAgICAgICAgICQoc3ZnSWNvbnMudG9nZ2xlVmlkZW9GdWxsU2NyZWVuKCkpLmFwcGVuZFRvKCQoXCIuaW5zLXRpbGVfX2J1dHRvbnM6Zmlyc3RcIikpLmZpbmQoXCIudG9nZ2xlLXZpZGVvLWZ1bGwtc2NyZWVuXCIpLm9uKFwiY2xpY2tcIiwgdG9nZ2xlVmlkZW9GdWxsU2NyZWVuKTtcblxuICAgICAgICAgICAgICAgICQoc3ZnSWNvbnMudW5tdXRlVmlkZW8oKSkuYXBwZW5kVG8oZWxlbSkuZmluZChcIi51bm11dGUtdmlkZW9cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIG11dGVkID0gIW11dGVkO1xuICAgICAgICAgICAgICAgICAgICAvLyQodGhpcykudG9nZ2xlQ2xhc3MoXCJtdXRlZFwiLCBtdXRlZCkudG9nZ2xlQ2xhc3MoXCJ1bm11dGVkXCIsICFtdXRlZCk7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5zZXRNdXRlZChtdXRlZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJChlbGVtKS5hdHRyKFwiZGF0YS1hbGxvdy1taXNtYXRjaFwiLCAxKS50b2dnbGVDbGFzcyhcImhhcy12aWRlby1idXR0b25zXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAgICAgO1xuXG4gICAgICAgIGZ1bmN0aW9uIG9uU2Vla2VkKHQpIHtcbiAgICAgICAgICAgIGlmICh0Py5zZWNvbmRzID4gMSkge1xuICAgICAgICAgICAgICAgIHNob3dCdXR0b25zKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uU2Vla2VkU3RhcnRQbGF5aW5nKHQpIHtcbiAgICAgICAgICAgIHBsYXllci5vZmYoXCJzZWVrZWRcIiwgb25TZWVrZWRTdGFydFBsYXlpbmcpO1xuICAgICAgICAgICAgc3RhcnRQbGF5aW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZGV0ZWN0VW51bXRlKHByb2dyZXNzKSB7XG4gICAgICAgICAgICBwbGF5ZXIuZ2V0TXV0ZWQoKS50aGVuKG0gPT4ge1xuICAgICAgICAgICAgICAgIGlmICghbSkge1xuICAgICAgICAgICAgICAgICAgICBzaG93QnV0dG9ucyh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVBhdXNlZEJ1dHRvbihwYXVzZWQpIHtcbiAgICAgICAgICAgICRkLnRvZ2dsZUNsYXNzKFwicGxheWluZy12aWRlb1wiLCAhcGF1c2VkKSAmJiAkZC50b2dnbGVDbGFzcyhcInBhdXNlZC12aWRlb1wiLCBwYXVzZWQpICYmICQoXCIudmlkZW8tcGxheS1wYXVzZVwiKS50b2dnbGVDbGFzcyhcInBhdXNlZFwiLCBwYXVzZWQpLnRvZ2dsZUNsYXNzKFwicGxheWluZ1wiLCAhcGF1c2VkKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzaG93QnV0dG9ucyh1bm11dGUpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHBsYXllclVubXV0ZWQoKSB7XG4gICAgICAgICAgICAgICAgbXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuc2V0TXV0ZWQobXV0ZWQpLnRoZW4odCA9PiBvblZvbHVtZUNoYW5nZWQoe1xuICAgICAgICAgICAgICAgICAgICB2b2x1bWU6IDFcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgLy9vblZvbHVtZUNoYW5nZWQoe3ZvbHVtZToxfSk7XG4gICAgICAgICAgICAgICAgLy8gcGxheWVyLm9mZihcInZvbHVtZWNoYW5nZVwiLCBzaG93QnV0dG9ucyk7XG4gICAgICAgICAgICAgICAgcGxheWVyLm9mZihcInNlZWtlZFwiLCBvblNlZWtlZCk7XG4gICAgICAgICAgICAgICAgLy8gcGxheWVyLm9mZihcInByb2dyZXNzXCIsIHNob3dCdXR0b25zKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXIub2ZmKFwicGF1c2VcIiwgc2hvd0J1dHRvbnMpO1xuICAgICAgICAgICAgICAgIC8vIHBsYXllci5vZmYoXCJwcm9ncmVzc1wiLCBzaG93QnV0dG9ucyk7XG4gICAgICAgICAgICAgICAgcGxheWVyLm9mZihcInRpbWV1cGRhdGVcIiwgZGV0ZWN0VW51bXRlKTtcbiAgICAgICAgICAgICAgICAvLyBwbGF5ZXIub2ZmKFwiaW50ZXJhY3RpdmVvdmVybGF5cGFuZWxjbGlja2VkXCIsIHNob3dCdXR0b25zKTtcbiAgICAgICAgICAgICAgICAvL3BsYXkoKTtcbiAgICAgICAgICAgICAgICAvL2lmICgpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdFdpdGhWaWRlb0J1dHRvbnMoIW11dGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICwgMTApO1xuICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxheWVyLmdldFBhdXNlZCgpLnRoZW4odG9nZ2xlUGF1c2VkQnV0dG9uKTtcbiAgICAgICAgICAgIGlmICh1bm11dGUpIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXJVbm11dGVkKCk7XG4gICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICBwbGF5ZXIuZ2V0UGF1c2VkKCkudGhlbihwYXVzZWQgPT4gcGF1c2VkICYmIHBsYXllci5zZXRWb2x1bWUodiAlIDIgPT0gMCA/IDAuOTkgOiAxKS50aGVuKHZvbHVtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vcGxheWVyLnBsYXkoKS50aGVuKHQ9PntcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyVW5tdXRlZCgpO1xuICAgICAgICAgICAgICAgICAgICAvL30pLmNhdGNoKHIgPT4gcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkuY2F0Y2gociA9PiByKSkuY2F0Y2gociA9PiByKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvblZvbHVtZUNoYW5nZWQodCkge1xuICAgICAgICAgICAgcGxheWVyLmdldE11dGVkKCkudGhlbihtID0+IHtcbiAgICAgICAgICAgICAgICAoKG11dGVkID0gISFtIHx8IHQudm9sdW1lID09IDApIHx8IDEpICYmICghbXV0ZWQgPyAkKFwiI3RpbGUtY292ZXItSGFYcTZGIC5oYXMtdmlkZW8tYnV0dG9uc1wiKS50b2dnbGVDbGFzcyhcInNob3ctdm9sdW1lLWJ1dHRvblwiLCB0cnVlKSB8fCAxIDogMSkgJiYgJChcIi51bm11dGUtdmlkZW9cIikudG9nZ2xlQ2xhc3MoXCJtdXRlZFwiLCBtdXRlZCkudG9nZ2xlQ2xhc3MoXCJ1bm11dGVkXCIsICFtdXRlZCk7XG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlb0ludGVyYWN0aXZlICYmICFtdXRlZCkge1xuICAgICAgICAgICAgICAgICAgICBzaG93QnV0dG9ucyh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW50ZXJhY3RXaXRoVmlkZW9CdXR0b25zKCFtdXRlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIC8vIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICAgIC8vICAgcmV0dXJuIHBsYXllci5wbGF5KCkuZmluYWxseSh2ID0+IHBsYXllci5zZXRNdXRlZChtdXRlZCkudGhlbih2ID0+IG9uVm9sdW1lQ2hhbmdlZCh7IHZvbHVtZTogMSB9KSkpO1xuICAgICAgICAvLyB9XG4gICAgICAgIHZhciBsb29wcyA9IDA7XG4gICAgICAgIHZhciBtYXhMb29wcyA9IDI7XG4gICAgICAgIGZ1bmN0aW9uIG5leHRWaWRlb0NsaWNrKGNoZWNrTWF4TG9vcHMsIHJlc2V0TWF4TG9vcHMpIHtcbiAgICAgICAgICAgIGlmIChyZXNldE1heExvb3BzID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBsb29wcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aWRlb0luZGV4Kys7XG4gICAgICAgICAgICBpZiAodmlkZW9JbmRleCA+PSB2aWRlb3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCsrbG9vcHMgPiBtYXhMb29wcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIC8vc3RvcCBhdXRvcGxheSB3aGVuIG1heCBsb29wcyBpcyByZWFjaGVkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZpZGVvSW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcGxheWVyICYmIHBsYXllci5kZXN0cm95KCk7XG4gICAgICAgICAgICAvLyBwbGF5ZXIgPSBudWxsO1xuICAgICAgICAgICAgLy8gJCgnLnZpZGVvLWJhY2tncm91bmQnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIC8vIGNyZWF0ZUlmcmFtZSgpO1xuICAgICAgICAgICAgY29uc3Qgc3JjID0gdmlkZW9MaW5rKCk7XG4gICAgICAgICAgICBwbGF5ZXIuZWxlbWVudC53YXRjaGluZyA9IHNyYztcbiAgICAgICAgICAgIHBsYXllci5sb2FkVmlkZW8oc3JjKTtcbiAgICAgICAgICAgIC8vLnRoZW4ocD0+cGxheWVyLnBsYXkoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldlZpZGVvQ2xpY2soY2hlY2tNYXhMb29wcywgcmVzZXRNYXhMb29wcykge1xuICAgICAgICAgICAgaWYgKHJlc2V0TWF4TG9vcHMpIHtcbiAgICAgICAgICAgICAgICBsb29wcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aWRlb0luZGV4LS07XG4gICAgICAgICAgICBpZiAodmlkZW9JbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoKytsb29wcyA+IG1heExvb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgLy9zdG9wIGF1dG9wbGF5IHdoZW4gbWF4IGxvb3BzIGlzIHJlYWNoZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmlkZW9JbmRleCA9IHZpZGVvcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc3JjID0gdmlkZW9MaW5rKHZpZGVvc1t2aWRlb0luZGV4ZXNbdmlkZW9JbmRleF1dKTtcbiAgICAgICAgICAgIHBsYXllci5lbGVtZW50LndhdGNoaW5nID0gc3JjO1xuICAgICAgICAgICAgcGxheWVyLmxvYWRWaWRlbyhzcmMpO1xuICAgICAgICAgICAgLy8udGhlbihwPT5wbGF5ZXIucGxheSgpKTtcbiAgICAgICAgICAgIC8vJChcIiNtYWluLXZpZGVvXCIpLmF0dHIoXCJzcmNcIiwgc3JjKTtcbiAgICAgICAgfVxuICAgICAgICBhc3luYyBmdW5jdGlvbiB0b2dnbGVQbGF5UGF1c2UoKSB7XG4gICAgICAgICAgICBhd2FpdCBwbGF5ZXIuZ2V0UGF1c2VkKCkudGhlbihwYXVzZWQgPT4gKHBhdXNlZCA/IHBsYXllci5wbGF5KCkgOiBwbGF5ZXIucGF1c2UoKSkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2ID0gMTtcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlUGxheWVyKCkge1xuICAgICAgICAgICAgbGV0IHZpZGVvID0gZC5nZXRFbGVtZW50QnlJZChcIm1haW4tdmlkZW9cIik7XG4gICAgICAgICAgICBpZiAoIXZpZGVvIHx8IHBsYXllcilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5WaW1lbykge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGNyZWF0ZVBsYXllciwgMjApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxheWVyID0gbmV3IFZpbWVvLlBsYXllcih2aWRlbywge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiM2MERDNERcIixcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFtcIjE5N2I1MFwiLCBcIjYwREM0RFwiLCBcIkZGRkZGRlwiLCBcIjAwOGI0ZVwiXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsb2dEdXJhdGlvbihcIlBsYXllciBjcmVhdGVkXCIpKCk7XG5cbiAgICAgICAgICAgIFRyeShuID0+IG5hdmlnYXRvci5tZWRpYVNlc3Npb24uc2V0QWN0aW9uSGFuZGxlcihcIm5leHR0cmFja1wiLCBuZXh0VmlkZW9DbGljay5iaW5kKHBsYXllciwgZmFsc2UsIHRydWUpKSk7XG4gICAgICAgICAgICBUcnkobiA9PiBuYXZpZ2F0b3IubWVkaWFTZXNzaW9uLnNldEFjdGlvbkhhbmRsZXIoXCJwcmV2aW91c3RyYWNrXCIsIHByZXZWaWRlb0NsaWNrLmJpbmQocGxheWVyLCBmYWxzZSwgdHJ1ZSkpKTtcblxuICAgICAgICAgICAgLy9wbGF5ZXIuc2V0UXVhbGl0eShcIjEwODBwXCIpO1xuICAgICAgICAgICAgcGxheWVyLm9uKFwidm9sdW1lY2hhbmdlXCIsIG9uVm9sdW1lQ2hhbmdlZCk7XG4gICAgICAgICAgICBwbGF5ZXIub24oXCJzZWVrZWRcIiwgb25TZWVrZWQpO1xuICAgICAgICAgICAgcGxheWVyLm9uKFwic2Vla2VkXCIsIG9uU2Vla2VkU3RhcnRQbGF5aW5nKTtcbiAgICAgICAgICAgIC8vIHBsYXllci5vbihcInByb2dyZXNzXCIsIHNob3dCdXR0b25zKTtcbiAgICAgICAgICAgIHBsYXllci5vbihcInRpbWV1cGRhdGVcIiwgZGV0ZWN0VW51bXRlKTtcbiAgICAgICAgICAgIC8vIHBsYXllci5vbihcInByb2dyZXNzXCIsIHNob3dCdXR0b25zKTtcbiAgICAgICAgICAgIHBsYXllci5vbihcInRpbWV1cGRhdGVcIiwgdCA9PiBwbGF5ZXIuZWxlbWVudD8ud2F0Y2hpbmcgPT0gcGxheWVyLmVsZW1lbnQ/LnNyYyAmJiAodC5kdXJhdGlvbiAtIHQuc2Vjb25kcyA8IDIgPyBuZXh0VmlkZW9DbGljaygpIDogMCkpO1xuICAgICAgICAgICAgLy8gcGxheWVyLm9uKFwiaW50ZXJhY3RpdmVvdmVybGF5cGFuZWxjbGlja2VkXCIsIHNob3dCdXR0b25zKTtcbiAgICAgICAgICAgIHBsYXllci5vbihcInBhdXNlXCIsIHNob3dCdXR0b25zKTtcbiAgICAgICAgICAgIHBsYXllci5vbihcImVuZGVkXCIsIG5leHRWaWRlb0NsaWNrLmJpbmQocGxheWVyLCB0cnVlKSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBvblByb2dyZXNzKHApIHtcbiAgICAgICAgICAgICAgICBsb2dEdXJhdGlvbihcInByb2dyZXNzXCIsIHApKCk7XG4gICAgICAgICAgICAgICAgcGxheWVyLm9mZihcInByb2dyZXNzXCIsIG9uUHJvZ3Jlc3MpO1xuICAgICAgICAgICAgICAgIG9uVmlkZW9Mb2FkZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBsYXllci5vbihcInByb2dyZXNzXCIsIG9uUHJvZ3Jlc3MpO1xuICAgICAgICAgICAgLy9wbGF5ZXIub24oXCJsb2FkZWRcIiwgcCA9PiBwbGF5ZXIucGxheSgpKTtcbiAgICAgICAgICAgIC8vcGxheWVyLm9uKFwiYnVmZmVyc3RhcnRcIiwgcCA9PiBwbGF5ZXIucGxheSgpKTtcbiAgICAgICAgICAgIC8vcGxheWVyLm9uKFwiYnVmZmVyZW5kXCIsIHAgPT4gcGxheWVyLnBsYXkoKSk7XG4gICAgICAgICAgICBwbGF5ZXIub24oXCJwYXVzZVwiLCBwID0+IHRvZ2dsZVBhdXNlZEJ1dHRvbih0cnVlKSk7XG4gICAgICAgICAgICBwbGF5ZXIub24oXCJwbGF5XCIsIHAgPT4gdG9nZ2xlUGF1c2VkQnV0dG9uKGZhbHNlKSk7XG4gICAgICAgICAgICAvL3BsYXllci5wbGF5KCk7XG4gICAgICAgICAgICBvblBsYXllclJlYWR5KHBsYXllcik7XG4gICAgICAgICAgICAvL3NldFRpbWVvdXQob25WaWRlb0xvYWRlZCwgMSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicGxheWVyIGNyZWF0ZWRcIilcbiAgICAgICAgfVxuICAgICAgICAvLyB2YXIganMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAvLyBqcy5pZCA9IFwianMtaWZyYW1lLXZpbWVvXCI7XG4gICAgICAgIC8vIGpzLnNyYyA9IFwiaHR0cHM6Ly9wbGF5ZXIudmltZW8uY29tL2FwaS9wbGF5ZXIuanNcIjtcbiAgICAgICAgLy8gLy9qcy5zcmMgPSBcImh0dHBzOi8vaW1nLmRhdGV4MndkLmJpa2Uvd2Vic2l0ZS9wbGF5ZXIuanNcIjtcbiAgICAgICAgLy8ganMub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWlmcmFtZUxvYWRlZCkge1xuICAgICAgICAgICAgY3JlYXRlSWZyYW1lKCk7XG4gICAgICAgICAgICBjcmVhdGVQbGF5ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBjb25zdCBvcmFuZ2VGcmFtZSA9IHtcbiAgICAvLyAgICAgY3NzRm9sZGVyOiBcIkZSQU1FeDEtQkxBQ0s6NjEzNDEzOTMzXCIsXG4gICAgLy8gICAgIGNsYXNzTmFtZTogXCJwLUZSQU1FeDEtQkxBQ0stR09MRFwiLFxuICAgIC8vICAgICByZXZlcnNlOiAxLFxuICAgIC8vICAgICBhdXRvUm90YXRlUmV2ZXJzZTogMSxcbiAgICAvLyAgICAgc3BlZWQ6IDMwLFxuICAgIC8vICAgICBhdXRvUm90YXRlU3BlZWQ6IDMwLFxuICAgIC8vIH1cbiAgICAvLyAgICAgLCB0aXJlID0ge1xuICAgIC8vICAgICAgICAgc3BlZWQ6IDEwMCxcbiAgICAvLyAgICAgICAgIGF1dG9Sb3RhdGVTcGVlZDogLTQwXG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgLCBmb3JrID0ge1xuICAgIC8vICAgICAgICAgc3BlZWQ6IDEwMCxcbiAgICAvLyAgICAgICAgIGF1dG9Sb3RhdGVSZXZlcnNlOiAwLFxuICAgIC8vICAgICAgICAgYXV0b1JvdGF0ZVNwZWVkOiAxNzBcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICAsIG9yYW5nZVJlcyA9IFwiM2suMzAwLjIgNGsuMzAwLjIgM2suMTgwLjEgNGsuMTgwLjJcIjtcbiAgICAvLyBsZXQgczM2MCA9ICh3aW5kb3cuczM2MCA9IFtKKFwiQkN4Mzo1MzIzNjE1MDFcIiwgXCIzay4yNDAuMiA0ay4yNDAuM1wiLCB7XG4gICAgLy8gICAgIHRodW1iczogW1wiQkN4My9CQ3gzXCIsIFwiQkN4My9CQ3gzLTIyMFZBQ1wiLCBcIkJDeDMvSU5QVVQtUExVR1NcIiwgXCJCQ3gzL09VVFBVVC1QTFVHU1wiLF1cbiAgICAvLyB9KSwgSihcIkJDeDMtMTEwVkFDOjY2NjQ1OTA4NVwiLCBcIjNrLjI0MC4yIDRrLjI0MC4zXCIsIHtcbiAgICAvLyAgICAgY3NzRm9sZGVyOiBcIkJDeDNcIixcbiAgICAvLyAgICAgY2xhc3NOYW1lOiBcInAtQkN4My0xMTBWQUMgcC1CQ3gzXCIsXG4gICAgLy8gICAgIHRodW1iczogW1wiQkN4My9CQ3gzXCIsIFwiQkN4My9CQ3gzLTIyMFZBQ1wiLCBcIkJDeDMvSU5QVVQtUExVR1NcIiwgXCJCQ3gzL09VVFBVVC1QTFVHU1wiLF0sXG4gICAgLy8gICAgIHA6IFwiJGcvMzYwL0JDeDMvQkN4My5QbHVncy4xay5jc3NcIlxuICAgIC8vIH0pLCBKKFwiQURBUFRFUi1CRjc1MEYtSkI3NTBGXCIsIFwiM2suMzU5LjEgNGsuMzU5LjEgM2suMjQwLjEgNGsuMjQwLjFcIiksIEooXCJBREFQVEVSLVJDQUYtM1BJTk1cIiwgXCIzay4yNDAuMSA0ay4yNDAuMVwiKSwgSihcIkFEQVBURVItUkNBRi1YVDkwTVwiLCBcIjNrLjMwMC4xIDRrLjMwMC4xXCIpLCAvLyBKKFwiQVJJRngzLUJMQUNLOjU0NDQwNDQ1OFwiLCBcIjRrLjMwMC4yIDNrLjMwMC4xXCIpLFxuICAgIC8vIC8vIEooXCJBSVJGeDMtQkxBQ0s6NTQ0NDA0NDU4XCIsIFwiNGsuMzAwLjEgM2suMzAwLjEgNGsuMjk5LjEgM2suMjk5LjFcIiksXG4gICAgLy8gLy8gSihcIkFJUkZ4My1XSElURS1CTEFDS1wiLCBcIlwiKSxcbiAgICAvLyAvLyBKKFwiQUlSRngzLVdISVRFLUdPTERcIiwgXCJcIiksXG4gICAgLy8gLy8gSihcIkFJUkZ4My1XSElURS1SRURcIiwgXCJcIiksXG4gICAgLy8gLy8gSihcIkFJUkZ4My1XSElURS1HUkVFTlwiLCBcIlwiKSxcbiAgICAvLyAvLyBKKFwiQUlSRngzLVdISVRFLUJMVUVcIiwgXCJcIiksXG4gICAgLy8gSihcIkFJUkZ4My1CTEFDSzo1NDQ0MDQ0NThcIiwgXCI0ay4zMDAuMiAzay4zMDAuMVwiLCBmb3JrKSwgSihcIkFJUkZ4NC1CTEFDSzo2OTcxMzk5MTJcIiwgXCI0ay4zMDAuMSAzay4zMDAuMVwiLCBmb3JrKSwgSihcIkFJUkZ4My1CTEFDSy1HUkVFTjo2ODAwNjI5NzdcIiwgXCI0ay4zMDAuMSAzay4zMDAuMVwiLCBmb3JrKSwgSihcIkFJUkZ4My1CTEFDSy1SRUQ6NjgwMDYyOTgwXCIsIFwiNGsuMzAwLjIgM2suMzAwLjFcIiwgZm9yayksIEooXCJBSVJGeDMtQkxBQ0stVElUQU5JVU06NjgwMDI3NTAwXCIsIFwiNGsuMzAwLjIgM2suMzAwLjFcIiwgZm9yayksIEooXCJBSVJGeDMtQkxBQ0stR09MRDo2ODAxMTkwODlcIiwgXCI0ay4zMDAuMSAzay4zMDAuMVwiLCBmb3JrKSwgSihcIkFJUkZ4My1XSElURS1CTEFDS1wiLCBcIlwiKSwgSihcIkFJUkZ4My1XSElURS1HT0xEXCIsIFwiNGsuMzAwLjEgM2suMzAwLjFcIiwgZm9yayksIEooXCJBSVJGeDMtV0hJVEUtUkVEXCIsIFwiXCIpLCBKKFwiQUlSRngzLVdISVRFLUdSRUVOXCIsIFwiXCIpLCBKKFwiQUlSRngzLVdISVRFLUJMVUVcIiwgXCJcIiksIEooXCJCQlBDeDI6NTU5MjIwOTg3XCIsIFwiM2suMjQwLjIgNGsuMjQwLjJcIiksIEooXCJCQngyOjU1OTA4NDYxNVwiLCBcIjNrLjI0MC4yIDRrLjI0MC4yXCIpLCBKKFwiQkZ4MVwiLCBcIlwiKSwgSihcIkJGeDEtU1lcIiwgXCJcIiksIEooXCJCRngxLUJGXCIsIFwiXCIpLCBKKFwiQkZ4Mjo1NTkzMzY2NDhcIiwgXCJcIiksIEooXCJCRngyOjU1OTMzNjY0OFwiLCBcIjNrLjIzOS4yIDRrLjIzOS4yXCIpLCBKKFwiQkZ4M1wiLCBcIlwiKSwgSihcIkJGeDNDOjUzNDQ1NjA2OVwiLCBcIlwiKSwgSihcIkJGeDNNVy1OVVRTeDJcIiwgXCI0ay4yOTcuMlwiKSwgSihcIkJNeDFcIiwgXCJcIiksIEooXCJGT0xEQUJMRXgxOjYyNDM2NzYzMjozODA3Nzg3MDBcIiwgXCIzay4yMTAuMVwiLCBcIkJNeDEtQ1JPU1NIQUlSOjUzOTcxMzgyMTozODA3NTEyMjdcIiksIEooXCJCTXgxLUtIRS1ST1VORDo2MjQzNTkzNjVcIiwgXCIzay4yMTAuMSA0ay4yMTAuMVwiKSwgSihcIkJNeDEtS0hFLVNIQVJQOjUzMzU4NjE3NVwiLCBcIjNrLjIxMC4xIDRrLjIxMC4xXCIpLCBKKFwiQk14MS1DUk9TU0hBSVI6NTM5NzEzODIxOjM4MDc1MTIyN1wiLCBcIjNrLjIxMC4xIDRrLjIxMC4xXCIpLCBKKFwiQk14MS1TQUxULVJPVU5EOjYyNDM2MzA0ODozODA3MzQ3MzlcIiwgXCIzay4yMTAuMSA0ay4yMTAuMVwiKSwgSihcIkJNeDEtU0FMVC1TSEFSUDo2MjQzNTkyOTJcIiwgXCIzay4yMTAuMSA0ay4yMTAuMVwiKSwgSihcIkJNeDEtU1VOREFZOjUzOTY2Mjg2ODozODA3ODMwMDlcIiwgXCIzay4yMDMuMSA0ay4yMDMuMVwiKSwgSihcIkJNeDEtVU5JVEVEOjYyNDM2MzMzMzozODA3ODI1NTFcIiwgXCIzay4yMDkuMSA0ay4yMDkuMVwiKSwgSihcIkJNeDEtU1VQRVI6NjI0MzcyNjA0XCIsIFwiM2suMzAwLjIgNGsuMzAwLjJcIiksIEooXCJCTXgxLVNIQURPVzo2MjQzNjc1NzM6MzgwNzUxMjI4XCIsIFwiM2suMjEwLjFcIiwgXCJCTXgxLUNST1NTSEFJUjo1Mzk3MTM4MjE6MzgwNzUxMjI3XCIpLCBKKFwiQk14MlwiLCBcIlwiKSwgSihcIkJNeDJUXCIsIFwiXCIpLCBKKFwiQlB4MTo1NTkzMzYzODlcIiwgXCIzay4yNDAuMiA0ay4yNDAuMlwiKSwgSihcIkJQeDI6NTU5MzM2MzkxXCIsIFwiM2suMjQwLjIgNGsuMjQwLjJcIiksIEooXCJCUHgzXCIsIFwiXCIpLCBKKFwiQlJ4MlwiLCBcIlwiKSwgSihcIkJIeDFcIiwgXCJcIiksIEooXCJCeDE6NTU0OTM2NDE0OjQwNDI1NzM5MCBCeDEtNDhWXCIsIFwiM2suMzAwLjEgNGsuMzAwLjJcIiksIEooXCJCeDI6NTU5MzIxOTQ2OjQwNDI1NzE0NVwiLCBcIjNrLjE4MC4xIDNrLjE4MC4xIDNrLjMwMC4xIDRrLjMwMC4yXCIpLCBKKFwiQngzOjY3NDIxMDUxOFwiLCBcIjNrLjMwMC4yIDRrLjMwMC4yXCIpLCBKKFwiQng0OjUzMzQwNTI1MlwiLCBcIjNrLjMwMC4xIDRrLjMwMC4yXCIpLCBKKFwiQng1OjUzNzc0NjA1MzozMTQzNDQyMDBcIiwgXCIzay4yNDAuMiA0ay4yNDAuM1wiKSwgSihcIkJ4NUM6NTM3NzQ2MDU0XCIsIFwiXCIpLCAvL2JhdHRlcnkgY2FzZVxuICAgIC8vIEooXCJDSHg2M1QtQkxBQ0srQ1JUeDErQ0hBSU54MTMwOjYxNTQxOTAxMTo0MTIxMjg3ODFcIiwgXCIzay4yNjkuMiA0ay4yNjkuMlwiLCB7XG4gICAgLy8gICAgIGNsYXNzTmFtZTogXCJwLUNIeDYzVCBwLUNIeDYzVC1CTEFDSy1DSEFJTngxMzAtQ1JUeDFcIixcbiAgICAvLyAgICAgc3BlZWQ6IDI1MCxcbiAgICAvLyB9KSwgSihcIkNIeDYzVC1CTEFDSytDSEFJTngxMzA6NjE1NDE5MDExOjQxMjEyODc4MFwiLCBcIjNrLjI3MC4yIDRrLjI3MC4yXCIsIHtcbiAgICAvLyAgICAgY2xhc3NOYW1lOiBcInAtQ0h4NjNUIHAtQ0h4NjNULUJMQUNLLUNIQUlOeDEzMFwiLFxuICAgIC8vIH0pLCBKKFwiQ0h4NjNULUJMQUNLK0NSVHgxOjYxNTQxOTAxMTo0MTIxMzA1MDhcIiwgXCIzay4yNzAuMiA0ay4yNzAuMlwiLCB7XG4gICAgLy8gICAgIGNsYXNzTmFtZTogXCJwLUNIeDYzVCBwLUNIeDYzVC1CTEFDSy1DUlR4MVwiLFxuICAgIC8vIH0pLCBKKFwiQ0h4NjNULUJMQUNLOjYxNTQxOTAxMTo0MTIxMjg3NzlcIiwgXCI3MjBwLjI3MC4xIDNrLjI3MC4xIDRrLjI3MC4yXCIsIHtcbiAgICAvLyAgICAgY2xhc3NOYW1lOiBcInAtQ0h4NjNUIHAtQ0h4NjNULUJMQUNLXCIsXG4gICAgLy8gfSksIEooXCJDSHg2M1QtR09MRCtDUlR4MStDSEFJTngxMzA6NjE1NDEzMjU5OjQxMjU2ODc5NVwiLCBcIjNrLjI3MC4yIDRrLjI3MC4yXCIsIHtcbiAgICAvLyAgICAgY2xhc3NOYW1lOiBcInAtQ0h4NjNUIHAtQ0h4NjNULUdPTEQtQ0hBSU54MTMwLUNSVHgxXCIsXG4gICAgLy8gfSksIEooXCJDSHg2M1QtR09MRCtDSEFJTngxMzA6NjE1NDEzMjU5OjQxMjU2ODEwOFwiLCBcIjNrLjI3MC4yIDRrLjI3MC4yXCIsIHtcbiAgICAvLyAgICAgY2xhc3NOYW1lOiBcInAtQ0h4NjNUIHAtQ0h4NjNULUdPTEQtQ0hBSU54MTMwXCIsXG4gICAgLy8gfSksIEooXCJDSHg2M1QtR09MRCtDUlR4MTo2MTU0MTMyNTk6NDEyNTY4NTc3XCIsIFwiM2suMjcwLjEgNGsuMjcwLjJcIiwge1xuICAgIC8vICAgICBjbGFzc05hbWU6IFwicC1DSHg2M1QgcC1DSHg2M1QtR09MRC1DUlR4MVwiLFxuICAgIC8vIH0pLCBKKFwiQ0h4NjNULUdPTEQ6NjE1NDEzMjU5OjQxMjU2ODU3NVwiLCBcIjNrLjI5OS4yIDRrLjI5OS4yXCIsIHtcbiAgICAvLyAgICAgY2xhc3NOYW1lOiBcInAtQ0h4NjNUIHAtQ0h4NjNULUdPTERcIixcbiAgICAvLyB9KSwgSihcIkNIeDYzVC1SRUQrQ1JUeDErQ0hBSU54MTMwOjU2MTA3NjMwMzo0MTI1NjgyMTdcIiwgXCIzay4yNzAuMiA0ay4yNzAuMlwiLCB7XG4gICAgLy8gICAgIGNsYXNzTmFtZTogXCJwLUNIeDYzVCBwLUNIeDYzVC1SRUQtQ0hBSU54MTMwLUNSVHgxXCIsXG4gICAgLy8gfSksIEooXCJDSHg2M1QtUkVEK0NIQUlOeDEzMDo1NjEwNzYzMDM6NDEyNTY4MjE2XCIsIFwiM2suMjcwLjIgNGsuMjcwLjJcIiwge1xuICAgIC8vICAgICBjbGFzc05hbWU6IFwicC1DSHg2M1QgcC1DSHg2M1QtUkVELUNIQUlOeDEzMFwiLFxuICAgIC8vIH0pLCBKKFwiQ0h4NjNULVJFRCtDUlR4MTo1NjEwNzYzMDM6NDEyNTY5Mjg3XCIsIFwiM2suMjcwLjIgNGsuMjcwLjJcIiwge1xuICAgIC8vICAgICBjbGFzc05hbWU6IFwicC1DSHg2M1QgcC1DSHg2M1QtUkVELUNSVHgxXCIsXG4gICAgLy8gfSksIEooXCJDSHg2M1QtUkVEOjU2MTA3NjMwMzo0MTI1NjkyODhcIiwgXCIzay4zMDAuMiA0ay4zMDAuMlwiLCB7XG4gICAgLy8gICAgIGNsYXNzTmFtZTogXCJwLUNIeDYzVCBwLUNIeDYzVC1SRURcIixcbiAgICAvLyB9KSwgSihcIkNIQUlOeDFcIiwgXCJcIiksIEooXCJDSEFJTngyXCIsIFwiXCIpLCBKKFwiQ0hBSU54MTMwOjU1OTczODc3MFwiLCBcIjNrXCIpLCBKKFwiQ1JUeDE6NTYxMDU2OTkxXCIsIFwiXCIpLCBKKFwiQ1N4Mjo1NjAwMzgwODJcIiwgXCJcIiksIEooXCJDeDFDOjU2MDAzOTkxNjo0MDg3NDc0NjVcIiwgXCIzay4yNDAuMSA0ay4yNDAuMVwiKSwgSihcIkN4MVwiLCBcIlwiKSwgSihcIkN4MS00OFYtNTJWLUJGXCIsIFwiXCIpLCBKKFwiQ3gxLTQ4Vi01MlYtSkJcIiwgXCJcIiksIEooXCJDeDFcIiwgXCJcIiksIEooXCJDeDFDOjU2MDAzOTkxNjo0MDg3NDc0NjVcIiwgXCIzay4yNDAuMSA0ay4yNDAuMlwiKSwgSihcIkN4M0M6NTYwMDM5OTI0XCIsIFwiM2suMjQwLjEgNGsuMjQwLjJcIiksIEooXCJDeDJcIiwgXCJcIiksIEooXCJDeDItQkY3NTAtUEFTOjU0NDY3OTM2MFwiLCBcIjRrLjMwMC4xIDNrLjMwMC4xXCIpLCBKKFwiQ3gyLUJGNzUwLVRPUlFVRTo3NTMzNDQ1MTNcIiwgXCI0ay4zMDEuMSAzay4zMDEuMVwiKSwgSihcIkN4Mi1TWS03NTBXLVBBU1wiLCBcIjRrLjI4Ni4yIDNrLjI4Ni4xXCIpLCBKKFwiQ3gyLVNZLTc1MFctVE9SUVVFXCIsIFwiNGsuMjg3LjIgM2suMjg3LjEgNGsuMjkzLjIgM2suMjkzLjFcIiksIEooXCJDeDM6NTQ0Njc5MzYwXCIsIFwiM2suMjQwLjJcIiksIEooXCJDeDM6NTQ0Njc5MzYwXCIsIFwiXCIpLCBKKFwiQ3gzOjU0NDY3OTM2MFwiLCBcIlwiKSwgSihcIkN4Mzo1NDQ2NzkzNjBcIiwgXCI0ay4xODAuMSAzay4xODAuMVwiKSwgSihcIkRIeDE6NTMzNjA1NTUzXCIsIFwiXCIpLCBKKFwiREh4OFwiLCBcIlwiKSwgSihcIkRIeDhTXCIsIFwiXCIpLCBKKFwiRkVOREVSU3gxXCIsIFwiM2suMTgwLjEgNGsuMTgwLjJcIiksIEooXCJGRU5ERVJTeDJcIiwgXCIzay4xODAuMSA0ay4xODAuMlwiKSwgSihcIkZFTkRFUlN4M1wiLCBcIjNrLjE3OS4xIDRrLjE3OS4yXCIpLCBKKFwiRFB4MTo1NDE2OTI4ODBcIiwgXCI0ay43NjAuNFwiLCB7XG4gICAgLy8gICAgIHNwZWVkOiAxMDAsXG4gICAgLy8gICAgIGF1dG9Sb3RhdGVTcGVlZDogMTAwLFxuICAgIC8vICAgICBhdXRvUm90YXRlU3BlZWRzOiB7XG4gICAgLy8gICAgICAgICAyOTA6IC05OTksXG4gICAgLy8gICAgICAgICA0NzA6IDEwMCxcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pLCBKKFwiRFB4Mzo1NTk3Mzg4MDFcIiwgXCIzay4yNDAuMSA0ay4yNDAuMlwiKSwgSihcIkRQT1ZQeDE6NTU5NzI0ODM4XCIsIFwiM2suMzAwLjEgNGsuMzAwLjFcIiksIEooXCJEeDI6NTMzMzkwMzc5IER4XCIsIFwiM2suMzAwLjEgNGsuMzAwLjFcIiwge1xuICAgIC8vICAgICBjbGFzc05hbWU6IFwicC1EeCBwLUR4MiBwLUR4Mi0zMEEgcC1EeDItMzBBLVhUMFUgcC1EeDItWFQ2MFUgcC1EeC1YVDYwVVwiLFxuICAgIC8vIH0pLCBKKFwiRHgyQy0zMEE6NjY3MTMwMjgzXCIsIFwiM2suMzAwLjEgNGsuMzAwLjFcIiwge1xuICAgIC8vICAgICBjbGFzc05hbWU6IFwicC1EeCBwLUR4QyBwLUR4MkMgcC1EeDJDLTMwQSBwLUR4MkMtMzBBLVhUNjBVIHAtRHgyQy1YVDYwVSBwLUR4Qy1YVDYwVVwiLFxuICAgIC8vIH0pLCBKKFwiRHgzXCIsIFwiXCIpLCBKKFwiRHgzQ1wiLCBcIlwiKSwgSihcIkR4My0zMEE6NjY3MTAwMDY1XCIsIFwiM2suMzAwLjEgNGsuMzAwLjFcIiwge1xuICAgIC8vICAgICBjbGFzc05hbWU6IFwicC1EeCBwLUR4MyBwLUR4My0zMEEgcC1EeDMtMzBBLVhUMFUgcC1EeDMtWFQ2MFUgcC1EeC1YVDYwVVwiLFxuICAgIC8vIH0pLCBKKFwiRHgzQy0zMEE6NjY3MTAwMDY4XCIsIFwiM2suMzAwLjEgNGsuMzAwLjFcIiwge1xuICAgIC8vICAgICBjbGFzc05hbWU6IFwicC1EeCBwLUR4QyBwLUR4M0MgcC1EeDNDLTMwQSBwLUR4M0MtMzBBLVhUNjBVIHAtRHgzQy1YVDYwVSBwLUR4Qy1YVDYwVVwiLFxuICAgIC8vIH0pLCBKKFwiRHg0LTMwQTo2Njk0Mjc2OTBcIiwgXCIzay4zMDAuMSA0ay4zMDAuMVwiLCB7XG4gICAgLy8gICAgIGNsYXNzTmFtZTogXCJwLUR4IHAtRHg0IHAtRHg0LTMwQSBwLUR4NC0zMEEtWFQwVSBwLUR4NC1YVDYwVSBwLUR4LVhUNjBVXCIsXG4gICAgLy8gfSksIEooXCJEeDRDLTMwQTo2Njk0Mjc2ODlcIiwgXCIzay4zMDAuMSA0ay4zMDAuMVwiLCB7XG4gICAgLy8gICAgIGNsYXNzTmFtZTogXCJwLUR4IHAtRHhDIHAtRHg0QyBwLUR4NEMtMzBBIHAtRHg0Qy0zMEEtWFQ2MFUgcC1EeDNDLVhUNjBVIHAtRHhDLVhUNjBVXCIsXG4gICAgLy8gfSksIEooXCJEeDUtMzBBOjY2OTQyNzE2MlwiLCBcIjNrLjMwMC4xIDRrLjMwMC4xXCIsIHtcbiAgICAvLyAgICAgY2xhc3NOYW1lOiBcInAtRHggcC1EeDQgcC1EeDQtMzBBIHAtRHg0LTMwQS1YVDBVIHAtRHg0LVhUNjBVIHAtRHgtWFQ2MFVcIixcbiAgICAvLyB9KSwgSihcIkR4NUMtMzBBOjY2OTQyNzE2MVwiLCBcIjNrLjMwMC4xIDRrLjMwMC4xXCIsIHtcbiAgICAvLyAgICAgY2xhc3NOYW1lOiBcInAtRHggcC1EeEMgcC1EeDVDIHAtRHg1Qy0zMEEgcC1EeDVDLTMwQS1YVDYwVSBwLUR4NUMtWFQ2MFUgcC1EeEMtWFQ2MFVcIixcbiAgICAvLyB9KSwgSihcIkR4Mi02MEE6NjY3MDY1ODE5XCIsIFwiM2suMzAwLjEgNGsuMzAwLjFcIiwge1xuICAgIC8vICAgICBjbGFzc05hbWU6IFwicC1EeCBwLUR4MiBwLUR4Mi02MEEgcC1EeDItNjBBLVhUOTBTIHAtRHgyLVhUOTBTIHAtRHgtWFQ5MFNcIixcbiAgICAvLyB9KSwgSihcIkR4MkMtNjBBOjY2NzEzMDI4NFwiLCBcIjNrLjMwMC4xIDRrLjMwMC4xXCIsIHtcbiAgICAvLyAgICAgY2xhc3NOYW1lOiBcInAtRHggcC1EeEMgcC1EeDJDIHAtRHgyQy02MEEgcC1EeDJDLTYwQS1YVDkwUyBwLUR4MkMtWFQ5MFMgcC1EeEMtWFQ5MFNcIixcbiAgICAvLyB9KSwgSihcIkR4My02MEE6NjY3MTAwMDY3XCIsIFwiM2suMzAwLjEgNGsuMzAwLjFcIiwge1xuICAgIC8vICAgICBjbGFzc05hbWU6IFwicC1EeCBwLUR4MyBwLUR4My02MEEgcC1EeDMtNjBBLVhUOTBTIHAtRHgzLVhUOTBTIHAtRHgtWFQ5MFNcIixcbiAgICAvLyB9KSwgLCBKKFwiRHgzQy02MEE6NjY3MTMwMjkyXCIsIFwiM2suMzAwLjEgNGsuMzAwLjFcIiwge1xuICAgIC8vICAgICBjbGFzc05hbWU6IFwicC1EeCBwLUR4QyBwLUR4M0MgcC1EeDNDLTYwQSBwLUR4M0MtNjBBLVhUOTBTIHAtRHgzQy1YVDkwUyBwLUR4Qy1YVDkwU1wiLFxuICAgIC8vIH0pLCBKKFwiRHg0LTYwQTo2NjkzODE3NzZcIiwgXCIzay4zMDAuMSA0ay4zMDAuMVwiLCB7XG4gICAgLy8gICAgIGNsYXNzTmFtZTogXCJwLUR4IHAtRHg0IHAtRHg0LTYwQSBwLUR4NC02MEEtWFQ5MFMgcC1EeDQtWFQ5MFMgcC1EeC1YVDkwU1wiLFxuICAgIC8vIH0pLCBKKFwiRHg0Qy02MEE6NjY5Mjk1NTY0XCIsIFwiM2suMzAwLjEgNGsuMzAwLjFcIiwge1xuICAgIC8vICAgICBjbGFzc05hbWU6IFwicC1EeCBwLUR4QyBwLUR4NEMgcC1EeDRDLTYwQSBwLUR4NEMtNjBBLVhUOTBTIHAtRHg0Qy1YVDkwUyBwLUR4Qy1YVDkwU1wiLFxuICAgIC8vIH0pLCBKKFwiRHg1LTYwQTo2NjkzODM1MjNcIiwgXCIzay4zMDAuMSA0ay4zMDAuMVwiLCB7XG4gICAgLy8gICAgIGNsYXNzTmFtZTogXCJwLUR4IHAtRHg1IHAtRHg1LTYwQSBwLUR4NS02MEEtWFQ5MFMgcC1EeDUtWFQ5MFMgcC1EeC1YVDkwU1wiLFxuICAgIC8vIH0pLCAsIEooXCJEeDVDLTYwQTo2NjkzODQ1MDNcIiwgXCIzay4zMDAuMSA0ay4zMDAuMVwiLCB7XG4gICAgLy8gICAgIGNsYXNzTmFtZTogXCJwLUR4IHAtRHhDIHAtRHg1QyBwLUR4NUMtNjBBIHAtRHg1Qy02MEEtWFQ5MFMgcC1EeDVDLVhUOTBTIHAtRHhDLVhUOTBTXCIsXG4gICAgLy8gfSksIEooXCJEeDItOTBBOjY2Njg0MDE4OFwiLCBcIjNrLjMwMC4xIDRrLjMwMC4xXCIsIHtcbiAgICAvLyAgICAgY2xhc3NOYW1lOiBcInAtRHggcC1EeDIgcC1EeDItOTBBIHAtRHgyLTkwQS1YVDkwUyBwLUR4Mi1YVDkwUyBwLUR4LVhUOTBTXCIsXG4gICAgLy8gfSksIEooXCJEeDJDLTkwQTo2NjcxMzAyODFcIiwgXCIzay4zMDAuMSA0ay4zMDAuMVwiLCB7XG4gICAgLy8gICAgIGNsYXNzTmFtZTogXCJwLUR4IHAtRHhDIHAtRHgyQyBwLUR4MkMtOTBBIHAtRHgyQy05MEEtWFQ5MFMgcC1EeDJDLVhUOTBTIHAtRHhDLVhUOTBTXCIsXG4gICAgLy8gfSksIEooXCJEeDMtOTBBOjY2NzEwMDA2NlwiLCBcIjNrLjMwMC4xIDRrLjMwMC4xXCIsIHtcbiAgICAvLyAgICAgY2xhc3NOYW1lOiBcInAtRHggcC1EeDMgcC1EeDMtOTBBIHAtRHgzLTkwQS1YVDkwUyBwLUR4My1YVDkwUyBwLUR4LVhUOTBTXCIsXG4gICAgLy8gfSksIEooXCJEeDNDLTkwQTo2NjcwNjU4MjdcIiwgXCIzay4zMDAuMSA0ay4zMDAuMVwiLCB7XG4gICAgLy8gICAgIGNsYXNzTmFtZTogXCJwLUR4IHAtRHhDIHAtRHgzQyBwLUR4M0MtOTBBIHAtRHgzQy05MEEtWFQ5MFMgcC1EeDNDLVhUOTBTIHAtRHhDLVhUOTBTXCIsXG4gICAgLy8gfSksIEooXCJEeDQtOTBBOjY2OTcwNzk1MVwiLCBcIjNrLjMwMC4xIDRrLjMwMC4xXCIsIHtcbiAgICAvLyAgICAgY2xhc3NOYW1lOiBcInAtRHggcC1EeDIgcC1EeDQtOTBBIHAtRHg0LTkwQS1YVDkwUyBwLUR4NC1YVDkwUyBwLUR4LVhUOTBTXCIsXG4gICAgLy8gfSksIEooXCJEeDRDLTkwQTo2Njk3MTQzNjVcIiwgXCIzay4zMDAuMSA0ay4zMDAuMVwiLCB7XG4gICAgLy8gICAgIGNsYXNzTmFtZTogXCJwLUR4IHAtRHhDIHAtRHg0QyBwLUR4NEMtOTBBIHAtRHg0Qy05MEEtWFQ5MFMgcC1EeDRDLVhUOTBTIHAtRHhDLVhUOTBTXCIsXG4gICAgLy8gfSksIEooXCJEeDUtOTBBOjY2OTcxNDM2MVwiLCBcIjNrLjMwMC4xIDRrLjMwMC4xXCIsIHtcbiAgICAvLyAgICAgY2xhc3NOYW1lOiBcInAtRHggcC1EeDMgcC1EeDUtOTBBIHAtRHg1LTkwQS1YVDkwUyBwLUR4NS1YVDkwUyBwLUR4LVhUOTBTXCIsXG4gICAgLy8gfSksIEooXCJEeDVDLTkwQTo2Njk3MDc5NDRcIiwgXCIzay4zMDAuMSA0ay4zMDAuMVwiLCB7XG4gICAgLy8gICAgIGNsYXNzTmFtZTogXCJwLUR4IHAtRHhDIHAtRHg1QyBwLUR4NUMtOTBBIHAtRHgzQy05MEEtWFQ5MFMgcC1EeDVDLVhUOTBTIHAtRHhDLVhUOTBTXCIsXG4gICAgLy8gfSksIEooXCJHUklQU3gyOjY3ODUwMDMwN1wiLCBcIjNrLjIxMC4xIDRrLjIxMC4yXCIpLCBKKFwiSEVSTzo2MDQ4MjgzMTkgSEVST3gxIEhFUk94MjUwXCIsIFwiM2suMTM1LjEgNGsuMTM1LjIgNWsuMTM1LjJcIiksIEooXCJIRVJPeDI6NTUzMDMzMDAyIEhFUk94MldEIEhFUk9cIiwgXCIzay4xMzUuMSA0ay4xMzUuMiA1ay4xMzUuMlwiKSwgSihcIkRBVEV4MldELUJMQUNLLVJFRCBIRVJPeDIgSEVST3gyV0RcIiwgXCI0ay4xODAuMyAzay4xODAuMiA0ay4xODAtb2xkLjNcIiksIEooXCJGV1JUeDFcIiwgXCJcIiksIEooXCJGT0xEeDEtQkxBQ0s6Njc0MjM4ODI1XCIsIFwiM2suMTgwLjEgNGsuMTgwLjFcIiksIEooXCJGT0xEeDEtU0lMVkVSOjY3NDIzODU5N1wiLCBcIjNrLjE4MC4xIDRrLjE4MC4xXCIpLCBKKFwiRk9MRHgyLUJMQUNLOjY3NDIzODUwMlwiLCBcIjNrLjE3OC4xIDRrLjE3OC4xXCIpLCBKKFwiRk9MRHgyLVNJTFZFUjo2NzQyMzg4MjBcIiwgXCIzay4xODAuMSA0ay4xODAuMVwiKSwgSihcIkZMeDE6NTM3NjU5MjI5OjMxNDM0NDE3NFwiLCBcIjNrLjI2OS4yIDRrLjI2OS4zXCIpLCBKKFwiRkx4Mjo2NzQyMzg2MDlcIiwgXCIzay4yNzguMiA0ay4yNzguM1wiKSwgSihcIkZMeDM6Njc0MjM4ODMzOjQwODUyNjIwNFwiLCBcIjNrLjI3My4zIDRrLjI3My40XCIpLCBKKFwiRlJBTUV4MS1CTEFDSzo2MTM0MTM5MzMgRlJBTUV4MS1SRURcIiwgXCIzay4zMDAuMiA0ay4zMDAuMlwiLCB7XG4gICAgLy8gICAgIHN0YXJ0RnJhbWVObzogMTYsXG4gICAgLy8gICAgIHJldmVyc2U6IDEsXG4gICAgLy8gICAgIGF1dG9Sb3RhdGVSZXZlcnNlOiAxLFxuICAgIC8vICAgICBzcGVlZDogMTAwLFxuICAgIC8vICAgICBhdXRvUm90YXRlU3BlZWQ6IDMwLFxuICAgIC8vIH0pLCBKKFwiRlJBTUV4MS1CTEFDSzo2MTM0MTM5MzMgRlJBTUV4MS1HT0xEXCIsIG9yYW5nZVJlcywgb3JhbmdlRnJhbWUpLCBKKFwiRlJBTUV4MS1CTEFDSzo2MTM0MTM5MzMgRlJBTUV4MS1HUkVFTlwiLCBvcmFuZ2VSZXMsIG9yYW5nZUZyYW1lKSwgSihcIkZSQU1FeDEtQkxBQ0s6NjEzNDEzOTMzIEZSQU1FeDEtWUVMTE9XXCIsIG9yYW5nZVJlcywgb3JhbmdlRnJhbWUpLCBKKFwiRlJBTUV4MS1CTEFDSzo2MTM0MTM5MzMgRlJBTUV4MS1XSElURVwiLCBvcmFuZ2VSZXMsIG9yYW5nZUZyYW1lKSwgSihcIkZSQU1FeDEtQkxBQ0s6NjEzNDEzOTMzIEZSQU1FeDEtQkxBQ0tcIiwgXCIzay4zMDAuMiA0ay4zMDAuMlwiLCB7XG4gICAgLy8gICAgIGNzc0ZvbGRlcjogXCJGUkFNRXgxLUJMQUNLOjYxMzQxMzkzM1wiLFxuICAgIC8vICAgICBjbGFzc05hbWU6IFwicC1GUkFNRXgxLUJMQUNLXCIsXG4gICAgLy8gICAgIHJldmVyc2U6IDEsXG4gICAgLy8gICAgIGF1dG9Sb3RhdGVSZXZlcnNlOiAxLFxuICAgIC8vICAgICBzcGVlZDogMTAwLFxuICAgIC8vICAgICBhdXRvUm90YXRlU3BlZWQ6IDMwLFxuICAgIC8vIH0pLCBKKFwiRlJBTUV4MS1CTEFDSzo2MTM0MTM5MzMgRlJBTUV4MS1USVRBTklVTVwiLCBvcmFuZ2VSZXMsIG9yYW5nZUZyYW1lKSwgSihcIkZSQU1FeDEtQkxBQ0s6NjEzNDEzOTMzIEZSQU1FeDEtQkxVRVwiLCBvcmFuZ2VSZXMsIG9yYW5nZUZyYW1lKSwgSihcIld4MUY6NzQxOTA0MDIzXCIsIFwiNGsuMTgwLjIgM2suMTgwLjFcIiwgXCJXeDFGLU1BR1wiKSwgSihcIld4MUYtR09MRDo3NDE5MDQwODFcIiwgXCI0ay4xODAuMiAzay4xODAuMlwiLCBcIld4MUYtR09MRFwiKSwgSihcIld4MUYtUkVEOjc0MTkwNDA3NVwiLCBcIjRrLjE3OS4yIDNrLjE4MC4yXCIsIFwiV3gxRi1SRURcIiksIEooXCJXeDFGLUdSRUVOOjc0MTkwMTEwOFwiLCBcIjRrLjE4MC4yIDNrLjE4MC4yXCIsIFwiV3gxRi1HUkVFTlwiKSwgSihcIld4MUYtQkxBQ0s6NzQxODkyOTc2XCIsIFwiNGsuMTgwLjIgM2suMTgwLjJcIiwgXCJXeDFGLUJMQUNLXCIpLCBKKFwiRld4ODo1NTk2OTE0NDJcIiwgXCIzay4yMzYuMiA0ay4yMzYuM1wiKSwgSihcIkhBTkRMRUJBUngxXCIsIFwiXCIpLCBKKFwiSE9STngxOjU2MTA2MTMyNlwiLCBcIjNrLjMwMC4xIDRrLjMwMC4yXCIpLCBKKFwiSE9STngyOjU2MTA3NjI4M1wiLCBcIjNrLjMwMC4xIDRrLjMwMC4yXCIpLCBKKFwiSkJ4MlwiLCBcIjNrLjIzOS4xIDRrLjIzOS4yXCIpLCBKKFwiS0VOREF4MTo3NDMyMDg4ODVcIiwgXCIzay4yNDAuMSA0ay4yNDAuMlwiKSwgSihcIktFTkRBeDI6NzQzMjA3NDUyXCIsIFwiM2suMjQwLjEgNGsuMjQwLjFcIiksIEooXCJMT0dPeDItR09MRFwiLCBcIlwiKSwgSihcIkxPR094Mi1SRURcIiwgXCJcIiksIEooXCJMSHgxXCIsIFwiXCIpLCBKKFwiTHgzQ1wiLCBcIjNrLjI0MC4xIDRrLjI0MC4xXCIpLCBKKFwiTU9UT1ItQ0FCTEV4MS1KQjI1MFwiLCBcIlwiKSwgSihcIk1PVE9SLUNBQkxFeDEtQkYyNTBcIiwgXCJcIiksIEooXCJNT1RPUi1DQUJMRXgxLVNZMjUwXCIsIFwiXCIpLCBKKFwiTU9UT1ItQ0FCTEV4Mi1KQjc1MFwiLCBcIjNrLjMwMC4xIDRrLjMwMC4xXCIpLCBKKFwiTU9UT1ItQ0FCTEV4Mi1CRjc1MFwiLCBcIjNrLjMwMC4xIDRrLjMwMC4xXCIpLCBKKFwiTU9UT1ItQ0FCTEV4Mi1CRjEwMDBNRlwiLCBcIlwiKSwgSihcIk1PVE9SLUNBQkxFeDMtQkYxODAwXCIsIFwiXCIpLCBKKFwiTUh4MTo2Nzg0NjQ2NzVcIiwgXCIzay4zMDAuMiA0ay4zMDAuMlwiKSwgSihcIk14Mjo2NzQyMTA1MjlcIiwgXCJcIiksIEooXCJQQVN4MTo1NTkzNjgwNDRcIiwgXCIzay4yNDAuMSA0ay4yNDAuMVwiKSwgSihcIlB4MlwiLCBcIlwiKSwgSihcIlJBQ0t4MTo1MzM1OTIxNjBcIiwgXCIzay4yNDAuMiA0ay4yNDAuMlwiKSwgSihcIlJTeDA6NTQwOTA4MDc4XCIsIFwiM2suMTgwLjEgNGsuMTgwLjJcIiksIEooXCJSU3gxOjU0MDg4OTYyNlwiLCBcIlwiKSwgSihcIlJTeDI6NTQwOTA3NTQ1XCIsIFwiM2suMTgwLjEgNGsuMTgwLjJcIiksIEooXCJSU3gzOjU0MDg5MjY0NlwiLCBcIjNrLjE4MC4xIDRrLjE4MC4yXCIpLCBKKFwiUlN4NDo1NDA5MDgwODBcIiwgXCJcIiksIEooXCJSU3g0OjU0MDkwODA4MFwiLCBcIlwiKSwgSihcIlJTeDUtQkxBQ0tcIiwgXCIzay4yNDAuMiA0ay4yNDAuM1wiKSwgSihcIlJTeDUtUkVEXCIsIFwiM2suMTgwLjIgNGsuMTgwLjJcIiksIEooXCJSTHgxXCIsIFwiXCIpLCBKKFwiUkx4Mjo1MzU3MzMwMzFcIiwgXCIzay4yNzAuMiA0ay4yNzAuM1wiKSwgSihcIlNBRERMRXgyLUJMQUNLOjY3ODQ3OTM3M1wiLCBcIjNrLjE5MC4yIDRrLjE5MC4zXCIpLCBKKFwiU0VBVFBPU1R4MS1HT0xEXCIsIFwiM2suMjQwLjEgNGsuMjQwLjFcIiksIEooXCJTS3gyXCIsIFwiXCIpLCBKKFwiU1l4MVwiLCBcIjNrLjIzNC4yIDRrLjIzNC4yXCIpLCBKKFwiWFQ2MFUtUkFEeDNcIiwgXCJcIiksIEooXCJYVDYwVS1SQUR4NFwiLCBcIlwiKSwgSihcIlhUOTBVLVJBRHgzXCIsIFwiXCIpLCBKKFwiWFQ5MFUtUkFEeDRcIiwgXCJcIiksIEooXCJSSU1UQVBFeDItQkxBQ0s6NTYwNjMzNTA1XCIsIFwiM2suMTgwLjIgNGsuMTgwLjJcIiksIEooXCJSSU1UQVBFeDItUkVEOjU2MDU1OTM3MlwiLCBcIjNrLjE4MC4xIDRrLjE4MC4xXCIpLCBKKFwiUklNVEFQRXgyLUdSRUVOOjU2MDU1NzYxMVwiLCBcIjNrLjE4MC4xIDRrLjE4MC4yXCIpLCBKKFwiUklNVEFQRXgyLVlFTExPVzo1NjA2MzM1MTNcIiwgXCIzay4xODAuMSA0ay4xODAuMVwiKSwgSihcIlJMeDI6NTM1NzMzMDMxXCIsIFwiM2suMjcwLjIgNGsuMjcwLjNcIiksIEooXCJTUE9LRVN4MzZcIiwgXCIzay4xODEuMiA0ay4xODEuMyAzay4yNDAuMiAzay4yNDAuM1wiKSwgSihcIlRBTk5VU3gxOjc0MzIwNzQ1NVwiLCBcIjNrLjI0MC4xIDRrLjI0MC4yXCIpLCBKKFwiVEFOTlVTeDI6NzQzMjA3NDY1XCIsIFwiM2suMjQwLjIgNGsuMjQwLjNcIiksIEooXCJUSHgzOjUzNDQ1ODI3OVwiLCBcIlwiKSwgSihcIlRMeDI6NTQ0Njc1NDM5XCIsIFwiM2suMTUwLjEgNGsuMTUwLjFcIiksIEooXCJWRUV4MUYtWklHLVpBRzo1NjQzMzIzNzQgVkVFeDFGLVpJRy1aQUctQkxBQ0sgVkVFeDFGIFZFRXggVkVFeDFGLUJMQUNLLU1BRyBWRUV4MUYtQkxBQ0tcIiwgXCIzay4xODAuMiA0ay4xODAuMlwiLCBcIlZFRXgxRi1CTEFDSy1NQUdcIiwgdGlyZSksIEooXCJWRUV4MUYtWklHLVpBRy1CTEFDSzo1NjQzNDc1NDIgVkVFeDFGIFZFRXggVkVFeDFGLUJMQUNLXCIsIFwiM2suMTgwLjIgNGsuMTgwLjJcIiwgXCJWRUV4MUYtQkxBQ0tcIiwgdGlyZSksIEooXCJWRUV4MUYtWklHLVpBRy1HT0xEOjU2NDM1Njg0OSBWRUV4MUYgVkVFeCBWRUV4MUYtQkxBQ0stR09MRFwiLCBcIjNrLjE4MC4yIDRrLjE4MC4zXCIsIFwiVkVFeDFGLUJMQUNLLUdPTERcIiwgdGlyZSksIEooXCJWRUV4MUYtWklHLVpBRy1HUkVFTjo1NjQzNDk3NTkgVkVFeDFGIFZFRXggVkVFeDFGLUJMQUNLLUdSRUVOXCIsIFwiM2suMTgwLjIgNGsuMTgwLjNcIiwgXCJWRUV4MUYtQkxBQ0stR1JFRU5cIiwgdGlyZSksIEooXCJWRUV4MUYtWklHLVpBRy1SRUQ6NTY0Mjg5OTg4IFZFRXgxRiBWRUV4IFZFRXgxRi1CTEFDSy1SRURcIiwgXCIzay4xODAuMiA0ay4xODAuM1wiLCBcIlZFRXgxRi1CTEFDSy1SRURcIiwgdGlyZSksIEooXCJWRUV4MS1aSUctWkFHIFZFRXgxIFZFRXggVkVFeDEtQkxBQ0stTUFHXCIsIFwiM2suMTgwLjIgNGsuMTgwLjJcIiwgXCJWRUV4MS1CTEFDSy1NQUdcIiwgdGlyZSksIEooXCJWRUV4MS1aSUctWkFHLUJMQUNLIFZFRXgxIFZFRXggVkVFeDEtQkxBQ0tcIiwgXCIzay4xNzguMiA0ay4xNzguM1wiLCBcIlZFRXgxLUJMQUNLXCIsIHRpcmUpLCBKKFwiVkVFeDEtWklHLVpBRy1HT0xEIFZFRXgxIFZFRXggVkVFeDEtQkxBQ0stR09MRFwiLCBcIjNrLjE4MC4yIDRrLjE4MC4zXCIsIFwiVkVFeDEtQkxBQ0stR09MRFwiLCB0aXJlKSwgSihcIlZFRXgxLVpJRy1aQUctR1JFRU4gVkVFeDEgVkVFeCBWRUV4MS1CTEFDSy1HUkVFTlwiLCBcIjNrLjE4MC4yIDRrLjE4MC4zXCIsIFwiVkVFeDEtQkxBQ0stR1JFRU5cIiwgdGlyZSksIEooXCJWRUV4MS1aSUctWkFHLVJFRCBWRUV4MSBWRUV4IFZFRXgxLUJMQUNLLVJFRFwiLCBcIjNrLjE4MC4yIDRrLjE4MC4zXCIsIFwiVkVFeDEtQkxBQ0stUkVEXCIsIHRpcmUpLCBKKFwiVkVFeDJGLU1JU1NJT04tQ09NTUFORC1UQU46NjIxNjMxMTcwIFZFRXgyRi1NSVNTSU9OLUNPTU1BTkQtVEFOLU1BRyBWRUV4MkYgVkVFeCBWRUV4MkYtVEFOIFZFRXgyRi1UQU4tTUFHXCIsIFwiM2suMTgwLjIgNGsuMTgwLjNcIiwgXCJWRUV4MkYtVEFOLU1BR1wiLCB0aXJlKSwgSihcIlZFRXgyRi1NSVNTSU9OLUNPTU1BTkQtVEFOLUJMQUNLOjYyMTY0NDMzNSBWRUV4MkYgVkVFeCBWRUV4MkYtVEFOLUJMQUNLIFZFRXgyLVRBTi1CTEFDS1wiLCBcIjNrLjE4MC4yIDRrLjE4MC4zXCIsIFwiVkVFeDItVEFOLUJMQUNLOjYyMTY0NDMzNVwiLCB0aXJlKSwgSihcIlZFRXgyRi1NSVNTSU9OLUNPTU1BTkQtVEFOLUdPTEQ6NjIxNjkzMDYwIFZFRXgyRiBWRUV4IFZFRXgyRi1UQU4tR09MRCBWRUV4MkYtVEFOLVlFTExPV1wiLCBcIjNrLjE3OS4yIDRrLjE3OS4zXCIsIFwiVkVFeDJGLVRBTi1HT0xEXCIsIHRpcmUpLCBKKFwiVkVFeDJGLU1JU1NJT04tQ09NTUFORC1UQU4tR1JFRU46NjIxNTkwMzg1IFZFRXgyRiBWRUV4IFZFRXgyRi1UQU4tR1JFRU5cIiwgXCIzay4xODAuMiA0ay4xODAuM1wiLCBcIlZFRXgyRi1UQU4tR1JFRU5cIiwgdGlyZSksIEooXCJWRUV4MkYtTUlTU0lPTi1DT01NQU5ELVRBTi1SRUQ6NjIxNTg2OTEzIFZFRXgyRiBWRUV4IFZFRXgyRi1UQU4tUkVEXCIsIFwiM2suMTgwLjMgNGsuMTgwLjNcIiwgXCJWRUV4MkYtVEFOLVJFRFwiLCB0aXJlKSwgSihcIlZFRXgyLU1JU1NJT04tQ09NTUFORC1UQU4gVkVFeDIgVkVFeCBWRUV4Mi1UQU4gVkVFeDItVEFOLU1BRyBWRUV4Mi1NSVNTSU9OLUNPTU1BTkQtVEFOLU1BR1wiLCBcIjNrLjI0MC4yIDRrLjE4MC4zXCIsIFwiVkVFeDItVEFOLU1BR1wiLCB0aXJlKSwgSihcIlZFRXgyLU1JU1NJT04tQ09NTUFORC1UQU4tQkxBQ0sgVkVFeDIgVkVFeCBWRUV4Mi1UQU4tQkxBQ0tcIiwgXCIzay4yNDAuMiA0ay4xODAuM1wiLCBcIlZFRXgyLVRBTi1CTEFDSzo2MjE2NDQzMzVcIiwgdGlyZSksIEooXCJWRUV4Mi1NSVNTSU9OLUNPTU1BTkQtVEFOLUdPTEQ6NTU5MzY3OTY4IFZFRXggVkVFeDIgVkVFeDItVEFOIFZFRXgyLVRBTi1HT0xEIFZFRXgyLVRBTi1ZRUxMT1dcIiwgXCIzay4xODAuMiAzay4xODAuM1wiLCBcIlZFRXgyLVRBTi1HT0xEXCIsIHRpcmUpLCBKKFwiVkVFeDItTUlTU0lPTi1DT01NQU5ELVRBTi1HUkVFTiBWRUV4MiBWRUV4IFZFRXgyLVRBTi1HUkVFTlwiLCBcIjNrLjI0MC4yIDRrLjE4MC4zXCIsIFwiVkVFeDItVEFOLUdSRUVOOjYyMTU5MDM4NVwiLCB0aXJlKSwgSihcIlZFRXgyLU1JU1NJT04tQ09NTUFORC1UQU4tUkVEIFZFRXgyIFZFRXggVkVFeDItVEFOLVJFRFwiLCBcIjNrLjI0MC4yIDRrLjE4MC4zXCIsIFwiVkVFeDItVEFOLVJFRDo2MjE1ODY5MTNcIiwgdGlyZSksIEooXCJWRUV4M0YtU1BFRURTVEVSLVdISVRFOjYyMzMwNjI0OSBWRUV4M0YgVkVFeCBWRUV4M0YtV0hJVEUgVkVFeDNGLVdISVRFLU1BRyBWRUV4M0YtU1BFRURTVEVSLVdISVRFLU1BR1wiLCBcIjNrLjE4MC4yIDRrLjE4MC4zXCIsIFwiVkVFeDNGLVdISVRFLU1BR1wiLCB0aXJlKSwgSihcIlZFRXgzRi1TUEVFRFNURVItV0hJVEUtQkxBQ0s6NjIzMzkzMzkzIFZFRXgzRiBWRUV4IFZFRXgzRi1XSElURS1CTEFDS1wiLCBcIjNrLjE4MC4yIDRrLjE4MC4zXCIsIFwiVkVFeDNGLVdISVRFLUJMQUNLXCIsIHRpcmUpLCBKKFwiVkVFeDNGLVNQRUVEU1RFUi1XSElURS1HT0xEOjYyMzQyMDA2NSBWRUV4M0YgVkVFeCBWRUV4M0YtU1BFRURTVEVSLVdISVRFLVlFTExPVyBWRUV4M0YtV0hJVEUtWUVMTE9XXCIsIFwiM2suMTgwLjIgNGsuMTgwLjNcIiwgXCJWRUV4M0YtV0hJVEUtWUVMTE9XXCIsIHRpcmUpLCBKKFwiVkVFeDNGLVNQRUVEU1RFUi1XSElURS1HUkVFTjo2MjM0MjAwNjYgVkVFeDNGIFZFRXgzRi1XSElURS1HUkVFTlwiLCBcIjNrLjE3OS4yIDRrLjE3OS4zXCIsIFwiVkVFeDNGLVdISVRFLUdSRUVOXCIsIHRpcmUpLCBKKFwiVkVFeDNGLVNQRUVEU1RFUi1XSElURS1SRUQ6NjIzNDY0NTI0IFZFRXgzRiBWRUV4IFZFRXgzRi1XSElURS1SRURcIiwgXCIzay4xODAuMiA0ay4xODAuM1wiLCBcIlZFRXgzRi1XSElURS1SRURcIiwgdGlyZSksIEooXCJWRUV4My1TUEVFRFNURVItV0hJVEU6MTYyMzMwNjI0OSBWRUV4MyBWRUV4IFZFRXgzLVNQRUVEU1RFUi1XSElURS1NQUcgVkVFeDMtV0hJVEUtTUFHIFZFRXgzLVdISVRFXCIsIFwiM2suMTgwLjIgNGsuMTgwLjNcIiwgXCJWRUV4My1XSElURS1NQUdcIiwgdGlyZSksIEooXCJWRUV4My1TUEVFRFNURVItV0hJVEUtQkxBQ0s6MTYyMzM5MzM5MyBWRUV4MyBWRUV4IFZFRXgzLVdISVRFLUJMQUNLXCIsIFwiM2suMTgwLjIgNGsuMTgwLjNcIiwgXCJWRUV4My1XSElURS1CTEFDS1wiLCB0aXJlKSwgSihcIlZFRXgzLVNQRUVEU1RFUi1XSElURS1HT0xEOjE2MjM0MjAwNjUgVkVFeDMgVkVFeCBWRUV4My1XSElURS1ZRUxMT1dcIiwgXCIzay4xODAuMiA0ay4xODAuM1wiLCBcIlZFRXgzLVdISVRFLVlFTExPV1wiLCB0aXJlKSwgSihcIlZFRXgzLVNQRUVEU1RFUi1XSElURS1HUkVFTjoxNjIzNDIwMDY2IFZFRXgzIFZFRXggVkVFeDMtV0hJVEUtR1JFRU5cIiwgXCIzay4xODAuMiA0ay4xODAuM1wiLCBcIlZFRXgzLVdISVRFLUdSRUVOXCIsIHRpcmUpLCBKKFwiVkVFeDMtU1BFRURTVEVSLVdISVRFLVJFRDoxNjIzNDY0NTI0IFZFRXgzIFZFRXggVkVFeDMtV0hJVEUtUkVEXCIsIFwiM2suMTgwLjIgNGsuMTgwLjNcIiwgXCJWRUV4My1XSElURS1SRURcIiwgdGlyZSksIEooXCJWRUV4NEYtU1BFRURTVEVSLUFSQU1JRC1CRUxUOjYyMzU1OTMyNiBWRUV4NEYgVkVFeCBWRUV4NEYtU1BFRURTVEVSLVdISVRFLUFSQU1JRC1CRUxULU1BRyBWRUV4NEYtU1BFRURTVEVSLUFSQU1JRC1CRUxULU1BRyBWRUV4NEYtU1BFRURTVEVSLUFSQU1JRC1CRUxULU1BRyBWRUV4NEYtU1BFRURTVEVSLVdISVRFLUFSQU1JRC1CRUxULU1BRyBWRUV4NEYtV0hJVEUtTUFHXCIsIFwiM2suMTgwLjIgNGsuMTgwLjNcIiwgXCJWRUV4NEYtV0hJVEUtTUFHXCIsIHRpcmUpLCBKKFwiVkVFeDRGLVNQRUVEU1RFUi1BUkFNSUQtQkVMVC1CTEFDSzo2MjM1NjgwODcgVkVFeDRGIFZFRXggVkVFeDRGLVdISVRFLUJMQUNLXCIsIFwiM2suMTgwLjIgNGsuMTgwLjNcIiwgXCJWRUV4NEYtV0hJVEUtQkxBQ0tcIiwgdGlyZSksIEooXCJWRUV4NEYtU1BFRURTVEVSLUFSQU1JRC1CRUxULUdPTEQ6NjIzNTcxODQ5IFZFRXg0RiBWRUV4IFZFRXg0Ri1XSElURS1HT0xEXCIsIFwiM2suMTgwLjIgNGsuMTgwLjNcIiwgXCJWRUV4NEYtV0hJVEUtR09MRFwiLCB0aXJlKSwgSihcIlZFRXg0Ri1TUEVFRFNURVItQVJBTUlELUJFTFQtR1JFRU46NjIzNTcwMzQ5IFZFRXg0RiBWRUV4IFZFRXg0Ri1XSElURS1HUkVFTlwiLCBcIjNrLjE4MC4yIDRrLjE4MC4zXCIsIFwiVkVFeDRGLVdISVRFLUdSRUVOXCIsIHRpcmUpLCBKKFwiVkVFeDRGLVNQRUVEU1RFUi1BUkFNSUQtQkVMVC1SRUQ6NjIzNTY1MzYzIFZFRXg0RiBWRUV4IFZFRXg0Ri1XSElURS1SRURcIiwgXCIzay4xODAuMiA0ay4xODAuM1wiLCBcIlZFRXg0Ri1XSElURS1SRURcIiwgdGlyZSksIEooXCJCRng0TVctRlJPTlQrVkVFeDQtU1BFRURTVEVSLVdISVRFLUFSQU1JRC1CRUxULU1BRzowIFZFRXg0IFZFRXggVkVFeDQtV0hJVEUtTUFHXCIsIFwiM2suMTgwLjIgNGsuMTgwLjNcIiwgXCJWRUV4NC1XSElURS1NQUdcIiwgdGlyZSksIEooXCJXeDFGK1ZFRXg0LVNQRUVEU1RFUi1XSElURS1BUkFNSUQtQkVMVC1CTEFDSzowIFZFRXg0IFZFRXggVkVFeDQtV0hJVEUtQkxBQ0tcIiwgXCIzay4xODAuMiA0ay4xODAuM1wiLCBcIlZFRXg0LVdISVRFLUJMQUNLXCIsIHRpcmUpLCBKKFwiV3gxRitTUEVFRFNURVItV0hJVEUtQVJBTUlELUJFTFQtR09MRDowIFZFRXg0IFZFRXggVkVFeDQtV0hJVEUtR09MRFwiLCBcIjNrLjE4MC4yIDRrLjE4MC4zXCIsIFwiVkVFeDQtV0hJVEUtR09MRFwiLCB0aXJlKSwgSihcIld4MUYrU1BFRURTVEVSLVdISVRFLUFSQU1JRC1CRUxULUdSRUVOOjAgVkVFeDQgVkVFeCBWRUV4NC1XSElURS1HUkVFTlwiLCBcIjNrLjE4MC4yIDRrLjE4MC4zXCIsIFwiVkVFeDQtV0hJVEUtR1JFRU5cIiwgdGlyZSksIEooXCJXeDFGK1NQRUVEU1RFUi1XSElURS1BUkFNSUQtQkVMVC1SRUQ6MCBWRUV4NCBWRUV4IFZFRXg0LVdISVRFLVJFRFwiLCBcIjNrLjE4MC4yIDRrLjE4MC4zXCIsIFwiVkVFeDQtV0hJVEUtUkVEXCIsIHRpcmUpLCBKKFwiVkVFeDQtU1BFRURTVEVSLVdISVRFLUFSQU1JRC1CRUxUOjE2MjM1NTkzMjYgVkVFeDQgVkVFeCBWRUV4NC1XSElURS1NQUdcIiwgXCIzay4xODAuMiA0ay4xODAuM1wiLCBcIlZFRXg0LVdISVRFLU1BR1wiLCB0aXJlKSwgSihcIlZFRXg0LVNQRUVEU1RFUi1XSElURS1CTEFDSy1BUkFNSUQtQkVMVDoxNjIzNTY4MDg3IFZFRXg0IFZFRXggVkVFeDQtV0hJVEUtQkxBQ0tcIiwgXCIzay4xODAuMiA0ay4xODAuM1wiLCBcIlZFRXg0LVdISVRFLUJMQUNLXCIsIHRpcmUpLCBKKFwiVkVFeDQtU1BFRURTVEVSLVdISVRFLUdPTEQtQVJBTUlELUJFTFQ6NjIzNTcxODQ5IFZFRXg0IFZFRXggVkVFeDQtV0hJVEUtR09MRCBWRUV4NC1XSElURS1ZRUxMT1dcIiwgXCIzay4xODAuMiA0ay4xODAuM1wiLCBcIlZFRXg0LVdISVRFLVlFTExPV1wiLCB0aXJlKSwgSihcIlZFRXg0LVNQRUVEU1RFUi1XSElURS1HUkVFTi1BUkFNSUQtQkVMVDo2MjM1NzAzNDkgVkVFeDQgVkVFeCBWRUV4NC1XSElURS1HUkVFTlwiLCBcIjNrLjE3OS4yIDRrLjE3OS4zXCIsIFwiVkVFeDQtV0hJVEUtR1JFRU5cIiwgdGlyZSksIEooXCJWRUV4NC1TUEVFRFNURVItV0hJVEUtUkVELUFSQU1JRC1CRUxUOjYyMzU2NTM2MyBWRUV4NCBWRUV4IFZFRXg0LVdISVRFLVJFRFwiLCBcIjNrLjE4MC4yIDRrLjE4MC4zXCIsIFwiVkVFeDQtV0hJVEUtUkVEXCIsIHRpcmUpLCBKKFwiV3gxLUJMQUNLXCIsIFwiM2suMTc5LjIgNGsuMTc5LjNcIiksIEooXCJXeDEtR1JFRU5cIiwgXCIzay4xNzkuMiA0ay4xNzkuM1wiKSwgSihcIld4MS1HT0xEXCIsIFwiM2suMTc5LjIgNGsuMTc5LjJcIiksIEooXCJXeDEtUkVEXCIsIFwiM2suMTc5LjIgNGsuMTc5LjNcIiksIEooXCJXeDEtTUFHXCIsIFwiM2suMTc5LjIgNGsuMTc5LjNcIiksIEooXCJXeDFGLUJMQUNLXCIsIFwiM2suMTc5LjIgNGsuMTc5LjNcIiksIEooXCJXeDFGLUdSRUVOXCIsIFwiM2suMTc5LjIgNGsuMTc5LjJcIiksIEooXCJXeDFGLUdPTERcIiwgXCIzay4xNzkuMiA0ay4xNzkuMlwiKSwgSihcIld4MUYtUkVEXCIsIFwiM2suMTc5LjIgNGsuMTc5LjNcIiksIEooXCJXeDFGLU1BR1wiLCBcIjNrLjE3OS4xIDRrLjE3OS4yXCIpLCBKKFwiWC1URU1TeDEtRk9MRHgxOjYyNTQ1MTYwNlwiLCBcIjNrLjI0MS4xIDRrLjI0MS4xXCIpLCAvLzo0MDQyNTczODlcblxuICAgIC8vIEooXCJYLVRFTVN4MS1CUklMSUFOVC1PUkFOR0U6NjI1NDM1NDEyIFgtVEVNU3gxLVNFVCBYLVRFTVN4MS1GT0xEeDEtQlJJTElBTlQtT1JBTkdFXCIsIFwiNGsuMjQwLjIgM2suMjQwLjFcIiksIEooXCJYLVRFTVN4MS1CUklHSFQtR09MRDo2MjU0NTc1ODQgWC1URU1TeDEtU0VUIFgtVEVNU3gxLUZPTER4MS1CUklHSFQtR09MRFwiLCBcIjNrLjI0Mi4xIDRrLjI0Mi4yXCIpLCBKKFwiWC1URU1TeDEtREVFUC1CTFVFOjYyNTQ2MzYxMyBYLVRFTVN4MS1TRVQgWC1URU1TeDEtRk9MRHgxLURFRVAtQkxVRVwiLCBcIjNrLjI0MC4xIDRrLjI0MC4yXCIpLCBKKFwiWC1URU1TeDEtZS1MRUNUUklDLUJMVUU6NjI1NDE4OTUwIFgtVEVNU3gxLVNFVCBYLVRFTVN4MS1GT0xEeDEtZS1MRUNUUklDLUJMVUVcIiwgXCIzay4yNDAuMiA0ay4yNDAuMlwiKSwgSihcIlgtVEVNU3gxLWVMRUNUUklDLUJMVUU6NjI1NDE4OTUwIFgtVEVNU3gxLVNFVCBYLVRFTVN4MS1GT0xEeDEtZS1MRUNUUklDLUJMVUUgWC1URU1TeDEtZS1MRUNUUklDLUJMVUVcIiwgXCIzay4yNDAuMiA0ay4yNDAuMlwiLCBcIlgtVEVNU3gxLWUtTEVDVFJJQy1CTFVFXCIpLCBKKFwiWC1URU1TeDEtRUxFQ1RSSUMtQkxVRTo2MjU0MTg5NTAgWC1URU1TeDEtU0VUIFgtVEVNU3gxLUZPTER4MS1lLUxFQ1RSSUMtQkxVRSBYLVRFTVN4MS1lLUxFQ1RSSUMtQkxVRVwiLCBcIjNrLjI0MC4yIDRrLjI0MC4yXCIsIFwiWC1URU1TeDEtZS1MRUNUUklDLUJMVUVcIiksIEooXCJYLVRFTVN4MS1GTEFNRS1SRUQ6NjI1NDE4OTQ4IFgtVEVNU3gxLVNFVCBYLVRFTVN4MS1GT0xEeDEtRkxBTUUtUkVEXCIsIFwiM2suMjQwLjEgNGsuMjQwLjJcIiksIEooXCJYLVRFTVN4MS1NQVRURS1CTEFDSzo2MjU0MzU0MTAgWC1URU1TeDEtU0VUIFgtVEVNU3gxLUZPTER4MS1NQVRURS1CTEFDS1wiLCBcIjNrLjI0Mi4xIDRrLjI0Mi4yXCIpLCBKKFwiWC1URU1TeDEtUEhBTlRPTS1QVVJQTEU6NjI1NDM1NDA5IFgtVEVNU3gxLVNFVCBYLVRFTVN4MS1GT0xEeDEtUEhBTlRPTS1QVVJQTEVcIiwgXCIzay4yNDAuMiA0ay4yNDAuMlwiKSwgSihcIlgtVEVNU3gxLVJPU0EtQ09QUEVSOjYyNTQzNTQxMiBYLVRFTVN4MS1TRVQgWC1URU1TeDEtQlJJTElBTlQtT1JBTkdFIFgtVEVNU3gxLUZPTER4MS1ST1NBLUNPUFBFUiBYLVRFTVN4MS1GT0xEeDEtQlJJTElBTlQtT1JBTkdFXCIsIFwiNGsuMjQwLjIgM2suMjQwLjFcIiwgXCJYLVRFTVN4MS1CUklMSUFOVC1PUkFOR0VcIiksIEooXCJYLVRFTVN4MS1TSUxWRVItU1VSRkVSOjYyNTQ2MzYxNCBYLVRFTVN4MS1TRVQgWC1URU1TeDEtRk9MRHgxLVNJTFZFUi1TVVJGRVJcIiwgXCIzay4yMzguMSA0ay4yMzguMlwiKSwgSihcIlgtVEVNU3gxLVNURUFMVEgtR1JBWTo2MjU0NjYwODggWC1URU1TeDEtU0VUIFgtVEVNU3gxLUZPTER4MS1TVEVBTFRILUdSQVlcIiwgXCIzay4yNDMuMSA0ay4yNDMuMlwiKSwgSihcIlgtVEVNU3gxLVdJTlRFUi1HUkVFTjo2MjU0MTg5MzkgWC1URU1TeDEtU0VUIFgtVEVNU3gxLUZPTER4MS1XSU5URVItR1JFRU5cIiwgXCI0ay4yNDIuMiAzay4yNDIuMVwiKSwgSihcIlgtVEVNU3gxLUxPQURFUi1CUklHSFQtR09MRDo2MjQ2NzgyODQgWC1URU1TeDEtTE9BREVSXCIsIFwiM2suMjcwLjIgNGsuMjcwLjJcIiksIC8vOjM4MDczNDU5MVxuICAgIC8vIEooXCJYLVRFTVN4MS1MT0FERVItQlJJTElBTlQtT1JBTkdFOjYyNTI1MTcwNSBYLVRFTVN4MS1MT0FERVJcIiwgXCI0ay4yNzAuMiAzay4yNzAuMVwiKSwgSihcIlgtVEVNU3gxLUxPQURFUi1ERUVQLUJMVUU6NjI1MjU4OTEzIFgtVEVNU3gxLUxPQURFUlwiLCBcIjRrLjI3MC4yIDNrLjI3MC4yXCIpLCAvLzo0MDQyNTczODdcbiAgICAvLyBKKFwiWC1URU1TeDEtTE9BREVSLWUtTEVDVFJJQy1CTFVFOjYyNTI3MzM5MyBYLVRFTVN4MS1MT0FERVJcIiwgXCIzay4yNzAuMiA0ay4yNzAuM1wiKSwgSihcIlgtVEVNU3gxLUxPQURFUi1lTEVDVFJJQy1CTFVFOjYyNTI3MzM5MyBYLVRFTVN4MS1MT0FERVIgWC1URU1TeDEtTE9BREVSLWUtTEVDVFJJQy1CTFVFXCIsIFwiM2suMjcwLjIgNGsuMjcwLjNcIiwgXCJYLVRFTVN4MS1MT0FERVItZS1MRUNUUklDLUJMVUVcIiksIEooXCJYLVRFTVN4MS1MT0FERVItRUxFQ1RSSUMtQkxVRTo2MjUyNzMzOTMgWC1URU1TeDEtTE9BREVSIFgtVEVNU3gxLUxPQURFUi1lLUxFQ1RSSUMtQkxVRVwiLCBcIjNrLjI3MC4yIDRrLjI3MC4zXCIsIFwiWC1URU1TeDEtTE9BREVSLWUtTEVDVFJJQy1CTFVFXCIpLCBKKFwiWC1URU1TeDEtTE9BREVSLUZMQU1FLVJFRDo2MjUyNTg4NTMgWC1URU1TeDEtTE9BREVSXCIsIFwiM2suMjcwLjIgNGsuMjcwLjJcIiksIC8vOjQwNDI1NjkyMFxuICAgIC8vIEooXCJYLVRFTVN4MS1MT0FERVItTUFUVEUtQkxBQ0s6NjI1MjU1OTc0IFgtVEVNU3gxLUxPQURFUlwiLCBcIjNrLjI3MC4xIDRrLjI3MC4yXCIpLCAvLzo0MDQyNTY5MjNcbiAgICAvLyBKKFwiWC1URU1TeDEtTE9BREVSLVBIQU5UT00tUFVSUExFOjYyNTI2MTY2OTogWC1URU1TeDEtTE9BREVSXCIsIFwiM2suMjcwLjIgNGsuMjcwLjJcIiksIC8vOjQwNDI1NzM4OFxuICAgIC8vIEooXCJYLVRFTVN4MS1MT0FERVItUk9TQS1DT1BQRVI6NjI1MjUxNzA1IFgtVEVNU3gxLUxPQURFUi1CUklMSUFOVC1PUkFOR0UgWC1URU1TeDEtTE9BREVSXCIsIFwiNGsuMjcwLjIgM2suMjcwLjJcIiwgXCJYLVRFTVN4MS1MT0FERVItQlJJTElBTlQtT1JBTkdFXCIpLCAvLzozODA3MzQzNDhcbiAgICAvLyBKKFwiWC1URU1TeDEtTE9BREVSLVNJTFZFUi1TVVJGRVI6NjI1MjU1OTc4IFgtVEVNU3gxLUxPQURFUlwiLCBcIjNrLjI3MC4xIDRrLjI3MC4yXCIpLCAvLzo0MDQyNTcxNDNcbiAgICAvLyBKKFwiWC1URU1TeDEtTE9BREVSLVNURUFMVEgtR1JBWTo2MjUyNzMzOTUgWC1URU1TeDEtTE9BREVSXCIsIFwiM2suMjcwLjIgNGsuMjcwLjJcIiksIEooXCJYLVRFTVN4MS1MT0FERVItV0lOVEVSLUdSRUVOOjYyNTI2NTQxMiBYLVRFTVN4MS1MT0FERVJcIiwgXCI0ay4yNzAuMiAzay4yNzAuMlwiKSwgLy86MzgwNzcyOTgyXG5cbiAgICAvLyBKKFwiUkNBLUZFTUFMRS1SQ0EtTUFMRS1BREFQVEVSXCIsIFwiXCIpLCBKKFwiUkNBLUZFTUFMRS0zUElOLU1BTEUtQURBUFRFUlwiLCBcIlwiKSwgSihcIlJDQS1NQUxFLTNQSU4tRkVNQUxFLUFEQVBURVJcIiwgXCJcIiksIEooXCJVU0JDeDJcIiwgXCJcIiksIEooXCJVU0JDeDNcIiwgXCJcIiksIEooXCJYVDkwUy0zUElOLUFEQVBURVJcIiwgXCJcIiksXVxuICAgIC8vIC5mbGF0KDEpLmZpbHRlcihvID0+IG8pLnJlZHVjZSgobywgcCkgPT4gKHtcbiAgICAvLyAgICAgLi4ubyxcbiAgICAvLyAgICAgW3AuaWRdOiBwLFxuICAgIC8vICAgICBbcC5uYW1lXTogcCxcbiAgICAvLyAgICAgW3AudmFyaWF0aW9uIHx8IFwiXCJdOiBwXG4gICAgLy8gfSksIHt9KSk7XG4gICAga25vd25Qcm9kdWN0U2x1Z3MucHJvZHVjdHMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgcC5jc3MzNjA/LnJlcyAmJiBKKGAke3AuaWR9OiR7cC5jc3MzNjA/LmZvbGRlciB8fCBwLnNsdWd9JHtwLmNzczM2MD8uYWxpYXNlcyA/IFwiIFwiIDogXCJcIn0ke3AuY3NzMzYwPy5hbGlhc2VzID8gcC5hbGlhc2VzIDogXCJcIn1gLCBwLmNzczM2MC5yZXMsIHAuY3NzMzYwKTtcbiAgICB9KTtcbiAgICAvL2RlbGV0ZSBzMzYwW1wiXCJdO1xuICAgIGRldGVjdEN1cnJlbnRQYWdlKCk7XG4gICAgLy9pbmplY3RGYXN0TG9hZGluZ0NzcyhjdXJyZW50UGFnZSk7XG4gICAgLy90cmlnZ2VyIGZhc3QgcHJlbG9hZCAzNjBcbiAgICBsb2FkMzYwKGN1cnJlbnRQYWdlLCBjdXJyZW50UGFnZS5wcm9kdWN0LCBwMzYwID0+IHAzNjApXG4gICAgaWYgKGN1cnJlbnRQYWdlLnR5cGUgPT0gXCJTSVRFXCIpIHtcbiAgICAgICAgaW5qZWN0VmlkZW9PbkhvbWVQYWdlKGN1cnJlbnRQYWdlKTsgXG4gICAgfVxuXG4gICAgY29uc29sZS53YXJuKGBEb25lOiAke01hdGgucm91bmQoKHRvdGFsRG9uZSAqIDEwMCkgLyB0b0RvKX0lICR7dG90YWxEb25lfSBvdXQgb2YgJHt0b0RvfWApO1xuICAgIGZ1bmN0aW9uIGdldE1lYW5pbmdmdWxDc3NDbGFzcyhzKSB7XG4gICAgICAgIC8vdmFyIHN0b3AgPSAwO1xuICAgICAgICBzID0gZGVjb2RlVW5pY29kZShzKS5yZXBsYWNlKC9fL2csIFwiK1wiKTtcbiAgICAgICAgdmFyIHBhcnRzID0gcy5zcGxpdChcIi1cIik7XG4gICAgICAgIC8vbGV0IHN0b3BOZXh0VGltZSA9IC0xO1xuICAgICAgICBjb25zdCB1ID0gdW5ib2xkKHMpO1xuICAgICAgICB2YXIgY3NzQ2xhc3MgPSAhcyB8fCAvKnBhcnRzLmxlbmd0aCA8IDIgfHwqLyB1ID09IHMgPyB1IDogcGFydHMgLy9vbmx5IGxldCB0aGUgZmlyc3QgcGFydHMgd2hlcmUgd2Ugc3RpbGwgaGF2ZSBhbGwgY2FwaXRhbCBsZXR0ZXJzXG4gICAgICAgICAgICAubWFwKChrLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgLy9pZiAoc3RvcCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGsgPT09IFwiXCIpIHJldHVybiBcIlwiXG4gICAgICAgICAgICAgICAgY29uc3QgdSA9IHVuYm9sZChrKTtcbiAgICAgICAgICAgICAgICBpZiAodSAhPT0gaylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHU7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyAvL3N0b3Agd2hlbiB3b3JkcyBhcmUgbm90IGFsbCBjYXBpdGFsIGxldHRlcnMgKGV4Y2x1ZGluZyB0aGUgZmlyc3QgeCBmcm9tIEJNeDEgd29yZCBmb3IgZXhhbXBsZSBvciB3aGVuIHRoZSB3b3JkIGlzIGRpZ2l0cyBvbmx5KVxuICAgICAgICAgICAgICAgIC8vIGxldCBzaG91bGRTdG9wID0gLy4qW3hdWzAtOV0kL2cudGVzdChrKSA/ICEoc3RvcE5leHRUaW1lID0gMikgOiBzdG9wO1xuICAgICAgICAgICAgICAgIC8vIGlmICgoIXNob3VsZFN0b3AgJiYgL15bYS1mMC05XSskL2cudGVzdChrKSkgfHwgKHN0b3BOZXh0VGltZSA+IDAgJiYgL15bMC05XS9nLnRlc3QoaykpKVxuICAgICAgICAgICAgICAgIC8vICAgc2hvdWxkU3RvcCA9IDE7XG4gICAgICAgICAgICAgICAgLy8gY29uc3QgcmVzdWx0ID0gKHNob3VsZFN0b3AgPyAhKHN0b3AgPSAxKSA6ICFzdG9wKSA/IGsgOiBudWxsO1xuICAgICAgICAgICAgICAgIC8vIGlmIChzdG9wTmV4dFRpbWUgPiAwKSBzdG9wTmV4dFRpbWUtLTtcbiAgICAgICAgICAgICAgICAvLyBlbHNlIGlmIChzdG9wTmV4dFRpbWUgPT0gMCkgc3RvcCA9IDE7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuZmlsdGVyKHM9PnMgfHwgcz09PVwiXCIpLmpvaW4oXCItXCIpO1xuICAgICAgICAvLyBsZXQgY29sb3IgPSBzICYmIHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAvLyBzd2l0Y2ggKGNvbG9yKSB7XG4gICAgICAgIC8vICAgY2FzZSBcIkJMQUNLXCI6XG4gICAgICAgIC8vICAgY2FzZSBcIlJFRFwiOlxuICAgICAgICAvLyAgIGNhc2UgXCJHT0xEXCI6XG4gICAgICAgIC8vICAgY2FzZSBcIkJMVUVcIjpcbiAgICAgICAgLy8gICBjYXNlIFwiVElUQU5JVU1cIjpcbiAgICAgICAgLy8gICBjYXNlIFwiUkVEXCI6XG4gICAgICAgIC8vICAgICBpZiAoIWNzc0NsYXNzLmVuZHNXaXRoKGNvbG9yKSkgY3NzQ2xhc3MgKz0gXCItXCIgKyBjb2xvcjtcbiAgICAgICAgLy8gICAgIGJyZWFrO1xuICAgICAgICAvLyB9XG4gICAgICAgIGNzc0NsYXNzID0gY3NzQ2xhc3M/LnRvVXBwZXJDYXNlKCk/LnJlcGxhY2UoL1goXFxkKykvZywgXCJ4JDFcIik/LnJlcGxhY2UoLzAwMkMvLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIGNzc0NsYXNzO1xuICAgIH1cbiAgICB3aW5kb3cuZGVjb2RlVW5pY29kZSA9IGRlY29kZVVuaWNvZGU7XG4gICAgd2luZG93LmdldE1lYW5pbmdmdWxDc3NDbGFzcyA9IGdldE1lYW5pbmdmdWxDc3NDbGFzcztcbiAgICBjb25zdCBwb0NNID0gYEJNWC1TdGVtLVJhaXNlcjpYWExcbiAgICAgIE1vdW50aW5nLXBsYXRlOlhYTFxuICAgIC8vTG9nbzpYU1xuICAgIC8vQWlyLUZvcms6U1xuICAgIC8vQmF0dGVyeTpYTFxuICAgIC8vQ3Jhbms6TFxuICAgIC8vQ3JhbmtzZXQ6WExcbiAgICAvL0Rpc3BsYXk6WExcbiAgICAvL0RvdWJsZS1Dcm93bi1Gb3JrOlNcbiAgICAvL0ZlbmRlcnM6WEwgXG4gICAgLy9GcmFtZS1Mb2dvOlhTXG4gICAgLy9GcmFtZTpYU1xuICAgIC8vR3JpcHMtMDAyNi1TYWRkbGU6WExcbiAgICBIYW5kbGViYXJzOlNcbiAgICAvL0lubmVyLXR1YmVzOlhYTFxuICAgIC8vTGlnaHRzLTAwMjYtSG9ybjpYTFxuICAgIC8vTWlycm9yczpYTFxuICAgIC8vUmFjay0wMDI2LTJuZC1CYXR0ZXJ5OlhYTFxuICAgIC8vUmltLVRhcGUtQ29sb3I6U1xuICAgIC8vUmltLXRhcGU6TVxuICAgIFNlYXRwb3N0OkxcbiAgICBTYWRkbGU6WExcbiAgICAvL1RpcmUtbW9kZWw6TVxuICAgIC8vVGlyZS10b29sczpMXG4gICAgLy9UaXJlczpYWExcbiAgICAvL1doZWVsczpYTFxuICAgIC8vWC1URU1TeDEtZm9yLUJNWDpTXG4gICAgLy9YLVRFTVN4MS1Mb2FkZXI6U2Auc3BsaXQoL1sgXFxyXFxuXS8pLmZpbHRlcihtID0+ICFtLnN0YXJ0c1dpdGgoXCIvL1wiKSkubWFwKG0gPT4gbS5zcGxpdChcIjpcIikpLnJlZHVjZSgobywgcCkgPT4gKHtcbiAgICAgICAgLi4ubyxcbiAgICAgICAgW3BbMF0udG9Mb3dlckNhc2UoKV06IHBbMV1cbiAgICB9KSwge30pO1xuXG4gICAgZnVuY3Rpb24gVXBkYXRlU2VsZWN0ZWRPcHRpb25Dc3NDbGFzc2VzKGdyb3VwT3B0aW9ucywgcmVtb3ZlQWxsUHJldmlvdXNPcHRpb25zKSB7XG4gICAgICAgIGlmIChyZW1vdmVBbGxQcmV2aW91c09wdGlvbnMpIHtcbiAgICAgICAgICAgIC8vbG9nRHVyYXRpb24oXCJGb250LW1lYXN1cmVcIiwgXCJNZWFzdXJpbmcgZm9udCAmIHdyYXBwaW5nIG9wdGlvbnMuLi5cIik7XG4gICAgICAgICAgICAkZC5hbHRlckNsYXNzKFwiby0qXCIpO1xuICAgICAgICAgICAgbGV0IHAgPSBnZXRQcm9kdWN0Q29kZUZyb21DdXJyZW50VXJsKCk7XG4gICAgICAgICAgICBsZXQgc2l6ZSA9IHA/Lm5hbWU/Lm1hdGNoICYmIHAubmFtZS5tYXRjaCgvXihTfE18THxYTHxYWEwpJC8pO1xuICAgICAgICAgICAgc2l6ZSA9IHNpemUgJiYgc2l6ZVsxXTtcbiAgICAgICAgICAgICQoXCIub3B0aW9uLXN1cmNoYXJnZV9fdmFsdWVcIikuZm9yRWFjaChvID0+IChvID0gJChvKSkgJiYgby50ZXh0KG8udGV4dCgpLnJlcGxhY2UoXCIsMDAgXCIsIFwiIFwiKS5yZXBsYWNlKFwiLjAwIFwiLCBcIiBcIikpKTtcbiAgICAgICAgICAgIGxldCBnbyA9ICQoXCIucHJvZHVjdC1kZXRhaWxzLW1vZHVsZS5kZXRhaWxzLXByb2R1Y3Qtb3B0aW9uXCIpO1xuICAgICAgICAgICAgZ28uZWFjaCgoaSwgZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBvcHRHcm91cCA9ICQoZSk7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBvcHRHcm91cC5maW5kKFwiLnByb2R1Y3QtZGV0YWlscy1tb2R1bGVfX2NvbnRlbnRcIik7XG4gICAgICAgICAgICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wdEdyb3VwQ2xzID0gb3B0R3JvdXAuYXR0cihcImNsYXNzXCIpIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvcHRHcm91cHMgPSBvcHRHcm91cENscy5tYXRjaCgvKD88PWRldGFpbHMtcHJvZHVjdC1vcHRpb24tLSkoPyFzaXplXFxiKVxcdysoLVxcdyspPygtXFx3Kyk/KC1cXHcrKT8oLVxcdyspPygtXFx3Kyk/KC1cXHcrKT8oLVxcdyspPygtXFx3Kyk/KC1cXHcrKT8oLVxcdyspPygtXFx3Kyk/L2dpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyb3VwID0gZGVjb2RlVW5pY29kZShvcHRHcm91cHNbMF0pO1xuICAgICAgICAgICAgICAgICAgICBncm91cCA9IGdyb3VwLnJlcGxhY2UoXCJYU1wiLCBzaXplKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHQgPSBvcHRHcm91cC5maW5kKFwiLmRldGFpbHMtcHJvZHVjdC1vcHRpb25fX3RpdGxlXCIpWzBdLmNoaWxkTm9kZXM7XG4gICAgICAgICAgICAgICAgICAgIHQgPSB0W3QubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHQgPSAkKHQpLndyYXAoXCI8c3BhbiBjbGFzcz0ndGl0bGUnLz5cIikucGFyZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNscyA9IG9wdEdyb3VwLmF0dHIoXCJjbGFzc1wiKS5yZXBsYWNlKC9YUy9nLCBzaXplKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0R3JvdXAuYXR0cihcImNsYXNzXCIsIGNscyk7XG4gICAgICAgICAgICAgICAgICAgIHQudGV4dCh0LnRleHQoKS5yZXBsYWNlKFwiWFNcIiwgc2l6ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgb3B0R3JvdXBDbHMgPSBvcHRHcm91cC5hdHRyKFwiY2xhc3NcIikgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICBsZXQgb3B0R3JvdXBzID0gb3B0R3JvdXBDbHMubWF0Y2goLyg/PD1kZXRhaWxzLXByb2R1Y3Qtb3B0aW9uLS0pKD8hc2l6ZVxcYilcXHcrKC1cXHcrKT8oLVxcdyspPygtXFx3Kyk/KC1cXHcrKT8oLVxcdyspPygtXFx3Kyk/KC1cXHcrKT8oLVxcdyspPygtXFx3Kyk/KC1cXHcrKT8oLVxcdyspPy9naSk7XG4gICAgICAgICAgICAgICAgbGV0IGdyb3VwID0gZGVjb2RlVW5pY29kZShvcHRHcm91cHNbMF0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwICE9IG9wdEdyb3Vwc1swXSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRHcm91cENscyArPSBcIiBkZXRhaWxzLXByb2R1Y3Qtb3B0aW9uLS1cIiArIHVuYm9sZChncm91cCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdEdyb3VwLmF0dHIoXCJjbGFzc1wiLCBvcHRHcm91cENscyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvcHRHcm91cFRpdGxlID0gb3B0R3JvdXAuZmluZChcIi5wcm9kdWN0LWRldGFpbHMtbW9kdWxlX190aXRsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0R3JvdXBUaXRsZVswXS5sYXN0Q2hpbGQubm9kZVZhbHVlID0gdW5ib2xkKG9wdEdyb3VwVGl0bGVbMF0ubGFzdENoaWxkLm5vZGVWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBncm91cExDID0gZ3JvdXAudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uc0NvdW50ID0gb3B0R3JvdXAuZmluZChcIi5wcm9kdWN0LWRldGFpbHMtbW9kdWxlX19jb250ZW50ID4gKlwiKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGdyb3VwTEMgaW4gcG9DTSA/IG9wdGlvbnNDb3VudCArIFwiXCIgKyBwb0NNW2dyb3VwTENdLnJlcGxhY2UoL1swLTldL2csIFwiXCIpIDogXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGFiZWxzID0gY29udGVudC5maW5kKFwibGFiZWxcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXhMYWJlbExlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVscy5mb3JFYWNoKChsLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuID0gJChsLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHQsIHMsIHc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ID0gbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbi5oYXNDbGFzcygnb3B0aW9uLXRleHQnKSA/IG4gOiBuLndyYXAoXCI8c3BhbiBjbGFzcz0nb3B0aW9uLXRleHQnLz5cIikgJiYgbi5wYXJlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbCA9IEFycmF5LmZyb20odC50ZXh0KCkpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICsgXCIgXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJTXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzID0gMTQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ID0gOTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiTVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcyA9IDE4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyA9IDEzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJMXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzID0gMjY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ID0gMTc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlhMXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzID0gMzA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ID0gMTc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlhYTFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcyA9IDMzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyA9IDIyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdyA9IHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gQXJyYXkodyArIDEpLmpvaW4obCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQudGV4dCh0ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhMYWJlbExlbmd0aCA9IE1hdGgubWF4KG1heExhYmVsTGVuZ3RoLCBzIHx8IChpID09IDAgPyAwIDogQXJyYXkuZnJvbSh0LnRleHQoKSkubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXRUZXh0V2lkdGhET00oJChsLmNoaWxkTm9kZXNbMF0pLnRleHQoKSwgZ2V0Q29tcHV0ZWRTdHlsZShsLmNoaWxkTm9kZXNbMF0pLmZvbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBsID0gXCJNXCIsIHdicjtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG1heExhYmVsTGVuZ3RoIDwgMTU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbCA9IFwiWFNcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgbWF4TGFiZWxMZW5ndGggPCAyMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsID0gXCJTXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG1heExhYmVsTGVuZ3RoIDwgMjg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbCA9IFwiTVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBtYXhMYWJlbExlbmd0aCA8IDMzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwgPSBcIkxcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YnIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBtYXhMYWJlbExlbmd0aCA8IDM4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwgPSBcIlhMXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2JyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbCA9IFwiWFhMXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2JyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YWwgPSBvcHRpb25zQ291bnQgKyBsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250ZW50LnRvZ2dsZUNsYXNzKFwicG9cIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0R3JvdXAuYWx0ZXJDbGFzcyhcImdvLSpcIiwgXCJnby1cIiArIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuYWx0ZXJDbGFzcyhcInBvLSpcIiwgXCJwby1cIiArIHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh3YnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tib3hlcyA9IGNvbnRlbnQuZmluZChcIi5mb3JtLWNvbnRyb2wtLWNoZWNrYm94LWJ1dHRvbiAuZm9ybS1jb250cm9sX19pbmxpbmUtbGFiZWxcIik7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94ZXMuZWFjaCgoaSwgbGFiZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsID0gJChsYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBodG1sTGFiZWwgPSBsYWJlbC5odG1sKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG5ld0xhYmVsID0gaHRtbExhYmVsLnJlcGxhY2UoLyhbXHVEODM1XHVEQzAwXHVEODM1XHVEQzAxXHVEODM1XHVEQzAyXHVEODM1XHVEQzAzXHVEODM1XHVEQzA0XHVEODM1XHVEQzA1XHVEODM1XHVEQzA2XHVEODM1XHVEQzA3XHVEODM1XHVEQzA4XHVEODM1XHVEQzA5XHVEODM1XHVEQzBBXHVEODM1XHVEQzBCXHVEODM1XHVEQzBDXHVEODM1XHVEQzBEXHVEODM1XHVEQzBFXHVEODM1XHVEQzBGXHVEODM1XHVEQzEwXHVEODM1XHVEQzExXHVEODM1XHVEQzEyXHVEODM1XHVEQzEzXHVEODM1XHVEQzE0XHVEODM1XHVEQzE1XHVEODM1XHVEQzE2XHVEODM1XHVEQzE3XHVEODM1XHVEQzE4XHVEODM1XHVEQzE5XHVEODM1XHVEQzFBXHVEODM1XHVEQzFCXHVEODM1XHVEQzFDXHVEODM1XHVEQzFEXHVEODM1XHVEQzFFXHVEODM1XHVEQzFGXHVEODM1XHVEQzIwXHVEODM1XHVEQzIxXHVEODM1XHVEQzIyXHVEODM1XHVEQzIzXHVEODM1XHVEQzI0XHVEODM1XHVEQzI1XHVEODM1XHVEQzI2XHVEODM1XHVEQzI3XHVEODM1XHVEQzI4XHVEODM1XHVEQzI5XHVEODM1XHVEQzJBXHVEODM1XHVEQzJCXHVEODM1XHVEQzJDXHVEODM1XHVEQzJEXHVEODM1XHVEQzJFXHVEODM1XHVEQzJGXHVEODM1XHVEQzMwXHVEODM1XHVEQzMxXHVEODM1XHVEQzMyXHVEODM1XHVEQzMzXHVEODM1XHVERkNFXHVEODM1XHVERkNGXHVEODM1XHVERkQwXHVEODM1XHVERkQxXHVEODM1XHVERkQyXHVEODM1XHVERkQzXHVEODM1XHVERkQ0XHVEODM1XHVERkQ1XHVEODM1XHVERkQ2XHVEODM1XHVERkQ3XSkoPyEuKltcdUQ4MzVcdURDMDBcdUQ4MzVcdURDMDFcdUQ4MzVcdURDMDJcdUQ4MzVcdURDMDNcdUQ4MzVcdURDMDRcdUQ4MzVcdURDMDVcdUQ4MzVcdURDMDZcdUQ4MzVcdURDMDdcdUQ4MzVcdURDMDhcdUQ4MzVcdURDMDlcdUQ4MzVcdURDMEFcdUQ4MzVcdURDMEJcdUQ4MzVcdURDMENcdUQ4MzVcdURDMERcdUQ4MzVcdURDMEVcdUQ4MzVcdURDMEZcdUQ4MzVcdURDMTBcdUQ4MzVcdURDMTFcdUQ4MzVcdURDMTJcdUQ4MzVcdURDMTNcdUQ4MzVcdURDMTRcdUQ4MzVcdURDMTVcdUQ4MzVcdURDMTZcdUQ4MzVcdURDMTdcdUQ4MzVcdURDMThcdUQ4MzVcdURDMTlcdUQ4MzVcdURDMUFcdUQ4MzVcdURDMUJcdUQ4MzVcdURDMUNcdUQ4MzVcdURDMURcdUQ4MzVcdURDMUVcdUQ4MzVcdURDMUZcdUQ4MzVcdURDMjBcdUQ4MzVcdURDMjFcdUQ4MzVcdURDMjJcdUQ4MzVcdURDMjNcdUQ4MzVcdURDMjRcdUQ4MzVcdURDMjVcdUQ4MzVcdURDMjZcdUQ4MzVcdURDMjdcdUQ4MzVcdURDMjhcdUQ4MzVcdURDMjlcdUQ4MzVcdURDMkFcdUQ4MzVcdURDMkJcdUQ4MzVcdURDMkNcdUQ4MzVcdURDMkRcdUQ4MzVcdURDMkVcdUQ4MzVcdURDMkZcdUQ4MzVcdURDMzBcdUQ4MzVcdURDMzFcdUQ4MzVcdURDMzJcdUQ4MzVcdURDMzNcdUQ4MzVcdURGQ0VcdUQ4MzVcdURGQ0ZcdUQ4MzVcdURGRDBcdUQ4MzVcdURGRDFcdUQ4MzVcdURGRDJcdUQ4MzVcdURGRDNcdUQ4MzVcdURGRDRcdUQ4MzVcdURGRDVcdUQ4MzVcdURGRDZcdUQ4MzVcdURGRDddKS9ndSwgXCIkMTxici8+XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwuaHRtbChuZXdMYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrYm94ZXMgPSBvcHRHcm91cC5maW5kKFwiLmZvcm0tY29udHJvbC0tY2hlY2tib3gtYnV0dG9uLmZvcm0tY29udHJvbFwiKTtcbiAgICAgICAgICAgICAgICBjaGVja2JveGVzLmVhY2goKGksIGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRlID0gJChlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNscyA9ICgkZS5hdHRyKFwiY2xhc3NcIikgfHwgXCJcIikuc3BsaXQoXCIgXCIpLm1hcChjbHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9kZXRhaWxzLXByb2R1Y3Qtb3B0aW9uLS0uKi9naS50ZXN0KGNscykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3ViU3RyaW5nID0gY2xzLnN1YnN0cmluZyhcImRldGFpbHMtcHJvZHVjdC1vcHRpb24tLVwiLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGdldE1lYW5pbmdmdWxDc3NDbGFzcyhzdWJTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZyA9IHVuYm9sZChleHRyYWN0Qm9sZChncm91cCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBnID0gdW5ib2xkKGdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnID0gKC9YLVRFTVN4MS1mb3ItQk1YL2kudGVzdChnKSA/IGcgOiAvWC1URU1TeDEtZm9yLUJNWC1sb2FkZXItY2xhbXAvaS50ZXN0KGcpID8gXCJYLVRFTVN4MS1MT0FERVJcIiA6IGJnIHx8IGcpPy50b1VwcGVyQ2FzZSgpPy5yZXBsYWNlKC9YKFxcZCspL2csIFwieCQxXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvIFx1RDgzNVx1REMxNVx1RDgzNVx1REMwNFx1RDgzNVx1REMwNFx1RDgzNVx1REMzMS8udGVzdChwPy5wcm9kdWN0Py5za3UpICYmIC9UaXJlLU1vZGVsL2kudGVzdChnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHAucHJvZHVjdC5za3UucmVwbGFjZSgvLiooLVx1RDgzNVx1REMxMVx1RDgzNVx1REMwNFx1RDgzNVx1REMwM3wtXHVEODM1XHVEQzAxXHVEODM1XHVEQzBCXHVEODM1XHVEQzAwXHVEODM1XHVEQzAyXHVEODM1XHVEQzBBfC1cdUQ4MzVcdURDMDZcdUQ4MzVcdURDMEVcdUQ4MzVcdURDMEJcdUQ4MzVcdURDMDN8LVx1RDgzNVx1REMwNlx1RDgzNVx1REMxMVx1RDgzNVx1REMwNFx1RDgzNVx1REMwNFx1RDgzNVx1REMwRHwkKSQvaSwgKG0sIGNvbG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IHVuYm9sZChjb2xvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gYCR7b3B0aW9ufSR7Y29sb3J9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBvZy0ke2d9IG8gby0ke2d9LSR7b3B0aW9ufSBvLSR7b3B0aW9ufSAke2Nsc31gO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNscztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgJChlKS5hdHRyKFwiY2xhc3NcIiwgY2xzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoZ28ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbG9nRHVyYXRpb24oXCJGb250LW1lYXN1cmVcIiwgXCJGb250IG1lYXN1cmVkICYgb3B0aW9ucyB3cmFwcGVkIFwiICsgZ28ubGVuZ3RoKSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyICR0ID0gJChncm91cE9wdGlvbnMpO1xuICAgICAgICAkdC5lYWNoKChpLCBlKSA9PiB7XG4gICAgICAgICAgICBlID0gJChlKTtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZE9wdGlvbkVsZW1lbnQgPSBlLnBhcmVudHMoXCIuZm9ybS1jb250cm9sLS1jaGVja2JveC1idXR0b25cIik7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRPcHRpb25zID0gKHNlbGVjdGVkT3B0aW9uRWxlbWVudC5hdHRyKFwiY2xhc3NcIikgfHwgXCJcIikubWF0Y2goLyg/PD1kZXRhaWxzLXByb2R1Y3Qtb3B0aW9uLS0pKD8hc2l6ZVxcYilcXHcrKD86LVxcdyspKi9naSk7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS53YXJuKFwic2VsZWN0ZWRPcHRpb25FbGVtZW50XCIsIHNlbGVjdGVkT3B0aW9uRWxlbWVudCwgc2VsZWN0ZWRPcHRpb25FbGVtZW50LmF0dHIoJ2NsYXNzJyksIFwic2VsZWN0ZWRPcHRpb25zXCIsIHNlbGVjdGVkT3B0aW9ucyk7XG4gICAgICAgICAgICB2YXIgb3B0R3JvdXAgPSBlLnBhcmVudHMoXCIucHJvZHVjdC1kZXRhaWxzLW1vZHVsZS5kZXRhaWxzLXByb2R1Y3Qtb3B0aW9uXCIpO1xuICAgICAgICAgICAgdmFyIG9wdEdyb3VwcyA9IChvcHRHcm91cC5hdHRyKFwiY2xhc3NcIikgfHwgXCJcIikubWF0Y2goLyg/PD1kZXRhaWxzLXByb2R1Y3Qtb3B0aW9uLS0pKD8hc2l6ZVxcYilcXHcrKC1cXHcrKT8oLVxcdyspPygtXFx3Kyk/KC1cXHcrKT8oLVxcdyspPygtXFx3Kyk/KC1cXHcrKT8oLVxcdyspPygtXFx3Kyk/KC1cXHcrKT8oLVxcdyspPy9naSk7XG5cbiAgICAgICAgICAgIHZhciBhZGRpdGlvbmFscyA9IFtdO1xuICAgICAgICAgICAgdmFyIHJlbW92YWxzID0gb3B0R3JvdXBzICYmIG9wdEdyb3Vwcy5tYXAoYyA9PiB7XG4gICAgICAgICAgICAgICAgYyA9IGMudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB2YXIgY2xzID0gc2VsZWN0ZWRPcHRpb25zICYmIHNlbGVjdGVkT3B0aW9ucy5tYXAocyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB4ID0gZ2V0TWVhbmluZ2Z1bENzc0NsYXNzKHMpPy50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICB4ID0gdW5ib2xkKGRlY29kZVVuaWNvZGUoYHNvLSR7Y30tJHt4fWApKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkuam9pbihcIiBcIik7XG4gICAgICAgICAgICAgICAgaWYgKGNscylcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbHMucHVzaChjbHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVbmljb2RlKGBzby0ke3VuYm9sZChjKT8udG9VcHBlckNhc2UoKX0qYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgYWRkaXRpb25hbHMgPSBbLi4ubmV3IFNldChhZGRpdGlvbmFscy5qb2luKFwiIFwiKS5zcGxpdChcIiBcIikpXTtcbiAgICAgICAgICAgIC8vY29uc29sZS53YXJuKFwicmVtb3ZhbHMgXCIsIHJlbW92YWxzLCBcImFkZGl0aW9uYWxzXCIsIGFkZGl0aW9uYWxzKTtcbiAgICAgICAgICAgICRkLmFsdGVyQ2xhc3MocmVtb3ZhbHMsIGFkZGl0aW9uYWxzKTtcbiAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICB3aW5kb3cuVXBkYXRlU2VsZWN0ZWRPcHRpb25Dc3NDbGFzc2VzID0gVXBkYXRlU2VsZWN0ZWRPcHRpb25Dc3NDbGFzc2VzO1xuICAgIGZ1bmN0aW9uIGV4dHJhY3RMYW5nRnJvbUN1cnJlbnRQYWdlVXJsKCkge1xuICAgICAgICBjb25zdCBsYW5nID0gLyhcXC8uPy4/KT9cXC9wcm9kdWN0cy9naS5leGVjKGxvY2F0aW9uLnBhdGhuYW1lKT8uWzFdIHx8IFwiXCI7XG4gICAgICAgIHJldHVybiBsYW5nO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbmplY3RQcm9kdWN0T3B0aW9uc1RhcENoYW5nZSgpIHtcbiAgICAgICAgLy8gZC5hcnJpdmUoXCIuZm9ybS1jb250cm9sLS1jaGVja2JveC1idXR0b25cIiwgeyBleGlzdGluZzogdHJ1ZSB9LCBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICAvLyAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wdGlvbk9uQ2xpY2ssIHRydWUpO1xuICAgICAgICAvLyAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wdGlvbk9uQ2xpY2ssIHRydWUpO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy9mdW5jdGlvbiBvcHRpb25PbkNsaWNrKGUpIHtcbiAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3Qtb3B0aW9ucyAuZm9ybS1jb250cm9sLS1jaGVja2JveC1idXR0b25cIiwgZSA9PiB7XG4gICAgICAgICAgICB2YXIgZWxlbSA9ICQoZS50YXJnZXQpO1xuICAgICAgICAgICAgaWYgKCFlbGVtLmhhc0NsYXNzKFwiZm9ybS1jb250cm9sLS1jaGVja2JveC1idXR0b25cIikpIHtcbiAgICAgICAgICAgICAgICBlbGVtID0gJChlbGVtLnBhcmVudHMoXCIuZm9ybS1jb250cm9sLS1jaGVja2JveC1idXR0b25cIilbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGF0YUxpbmtlZFByb2R1Y3QgPSBlbGVtLmF0dHIoXCJkYXRhLWxpbmtlZC1wcm9kdWN0XCIpO1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdCA9IGtub3duUHJvZHVjdFNsdWdzW2RhdGFMaW5rZWRQcm9kdWN0XTtcbiAgICAgICAgICAgIGNvbnN0IGxwID0gZWxlbWVudHNNZXRhZGF0YS5nZXQoZWxlbVswXSk7XG4gICAgICAgICAgICBpZiAoZS5jdHJsS2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGxwIHx8IHByb2R1Y3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly8ke2xvY2F0aW9uLmhvc3RuYW1lfS9wcm9kdWN0cy8ke3Byb2R1Y3Q/LnNsdWcgfHwgbHA/LmlkfWA7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHVybCwgXCJfYmxhbmtcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbS5maW5kKFwiaW5wdXRcIilcbiAgICAgICAgICAgICAgICAsIHNlbGVjdGVkVGV4dCA9ICQoZWxlbS5maW5kKFwibGFiZWxcIilbMF0/LmNoaWxkTm9kZXNbMF0pLnRleHQoKTtcbiAgICAgICAgICAgIGxldCBvZyA9IFwiXCJcbiAgICAgICAgICAgICAgICAsIHNob3VsZFJlcGxhY2VTdGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgZml4UHJvZHVjdFdlaWdodCgpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICRkLmlzKFwiLnAtWC1URU1TeDEtTE9BREVSXCIpICYmIGVsZW0uaXMoXCIuby1GT0xEQUJMRS1CTVgtU1RFTS1YLVRFTVN4MS1GT0xEeDFcIik6XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNzID0gRC5jbGFzc05hbWUuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2cgPSBjcy5maW5kKGMgPT4gL15wLS4qL2dpLnRlc3QoYykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2cgPSBvZy5yZXBsYWNlKC8tTE9BREVSLywgXCJcIikucmVwbGFjZSgvXnAtLywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgJGQuaXMoXCIucC1YLVRFTVN4MS1TRVRcIikgJiYgZWxlbS5pcyhcIi5vLUZPTERBQkxFLUJNWC1TVEVNLU5PVC1JTkNMVURFRFwiKTpcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3MgPSBELmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZyA9IGNzLmZpbmQoYyA9PiAvXnAtLiovZ2kudGVzdChjKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZyA9IG9nLnJlcGxhY2UoL1gtVEVNU3gxLS8sIFwiWC1URU1TeDEtTE9BREVSLVwiKS5yZXBsYWNlKC9ecC0vLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSAkZC5pcyhcIi5wLVgtVEVNU3gxLVNFVFwiKSAmJiBlbGVtLmlzKFwiLm8tWC1URU1TeDEtRk9SLUJNWC1MT0FERVItQ0xBTVAtTk9ULUlOQ0xVREVEXCIpOlxuICAgICAgICAgICAgICAgIGNhc2UgJGQuaXMoXCIucC1YLVRFTVN4MS1TRVRcIikgJiYgZWxlbS5pcyhcIi5vLVgtVEVNU3gxLUZPUi1CTVgtTk9ULUlOQ0xVREVEXCIpOlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZyA9IFwiWC1URU1TeDEtRk9MRHgxXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgJGQuaXMoXCIucC1YLVRFTVN4MS1TRVRcIikgJiYgZWxlbS5pcyhcIi5vLVgtVEVNU3gxLWZvci1CTVgtbG9hZGVyLWNsYW1wXCIpOlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjcyA9IEQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9nID0gY3MuZmluZChjID0+IC9ecC0uKi9naS50ZXN0KGMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9nID0gb2cucmVwbGFjZSgvVEVNU3gxLywgXCJURU1TeDEtTE9BREVSXCIpLnJlcGxhY2UoL15wLS8sIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlICgkZC5pcyhcIi5wLVgtVEVNU3gxLVNFVFwiKSB8fCAkZC5pcyhcIi5wLVgtVEVNU3gxLUZPTER4MVwiKSkgJiYgZWxlbS5pcyhcIi5vZy1YLVRFTVN4MVwiKTpcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3MgPSBlbGVtWzBdLmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZyA9IGNzLmZpbmQoYyA9PiAvXm8tWC1URU1TeDEtLiovZ2kudGVzdChjKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZyA9IG9nLnJlcGxhY2UoLy1MT0FERVIvLCBcIlwiKS5yZXBsYWNlKC9eby0vLCBcIlwiKS5yZXBsYWNlKC9Ob3QtaW5jbHVkZWQvaSwgXCJGT0xEeDFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgKCRkLmlzKFwiLnAtWC1URU1TeDEtRk9MRHgxXCIpIHx8ICRkLmlzKFwiLnAtWC1URU1TeDEtU0VUXCIpKSAmJiBlbGVtLmlzKFwiLm9nLVgtVEVNU3gxLUZPUi1CTVgtTE9BREVSLUNMQU1QXCIpOlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjcyA9IGVsZW1bMF0uY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9nID0gY3MuZmluZChjID0+IC9eby1YLVRFTVN4MS1GT1ItQk1YLUxPQURFUi1DTEFNUC4qL2dpLnRlc3QoYykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2cgPSBvZy5yZXBsYWNlKC8tRk9SLUJNWC1MT0FERVItQ0xBTVAvLCBcIlwiKS5yZXBsYWNlKC9eby0vLCBcIlwiKS5yZXBsYWNlKC9Ob3QtaW5jbHVkZWQvaSwgXCJGT0xEeDFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgJGQuaXMoXCIucC1YLVRFTVN4MS1GT0xEeDFcIikgJiYgZWxlbS5pcyhcIi5vZy1YLVRFTVN4MVwiKTpcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3MgPSBlbGVtWzBdLmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZyA9IGNzLmZpbmQoYyA9PiAvXm8tWC1URU1TeDEtLiovZ2kudGVzdChjKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZyA9IG9nLnJlcGxhY2UoLy1MT0FERVIvLCBcIlwiKS5yZXBsYWNlKC9eby0vLCBcIlwiKS5yZXBsYWNlKC9Ob3QtaW5jbHVkZWQvaSwgXCJGT0xEeDFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2FzZSAkZC5pcyhcIi5wLUhFUk9cIik6XG4gICAgICAgICAgICAgICAgICAgIG9nID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkUmVwbGFjZVN0YXRlID0ga25vd25Qcm9kdWN0U2x1Z3NbY3VycmVudFBhZ2UucHJvZHVjdElkXTsvL3MzNjBbY3VycmVudFBhZ2UucHJvZHVjdElkXVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGVsZW0uaXMoXCIub2ctVElSRS1NT0RFTCwgLm9nLVJJTS1UQVBFXCIpICYmICRkLmlzKFwiLnAtVkVFeDFGLCAucC1WRUV4MkYsIC5wLVZFRXgzRiwgLnAtVkVFeDRGXCIpOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1RpcmVNb2RlbCA9IGVsZW0ucGFyZW50cyhcIi5kZXRhaWxzLXByb2R1Y3Qtb3B0aW9uLS1UaXJlLU1vZGVsXCIpLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgLCBpc1JpbVRhcGUgPSBlbGVtLnBhcmVudHMoXCIuZGV0YWlscy1wcm9kdWN0LW9wdGlvbi0tUmltLVRhcGVcIikubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAsIHRpcmUgPSAkKGlzVGlyZU1vZGVsID8gaW5wdXQgOiBcIi5kZXRhaWxzLXByb2R1Y3Qtb3B0aW9uLS1UaXJlLU1vZGVsIGlucHV0OmNoZWNrZWRcIikucGFyZW50KCkuYXR0cihcImNsYXNzXCIpPy5yZXBsYWNlKC8uKihvLVRJUkUtTU9ERUwtKC4qPykpIC4qL2dpLCBcIiQyXCIpIHx8IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgcmltVGFwZSA9ICQoaXNSaW1UYXBlID8gaW5wdXQgOiBcIi5kZXRhaWxzLXByb2R1Y3Qtb3B0aW9uLS1SaW0tVGFwZSBpbnB1dDpjaGVja2VkXCIpLnBhcmVudCgpLmF0dHIoXCJjbGFzc1wiKT8ucmVwbGFjZSgvLiooby1SSU0tVEFQRS0oLio/KSkgLiovZ2ksIFwiJDJcIik/LnJlcGxhY2UoL05PVC1JTkNMVURFRC9naSwgXCJcIikgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzVGlyZU1vZGVsIHx8IGlzUmltVGFwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2cgPSBgJHt0aXJlLnJlcGxhY2UoLyhWRUV4XFxkKS0vLCBcIiQxRi1cIil9JHtyaW1UYXBlID8gXCItXCIgOiBcIlwifSR7cmltVGFwZX1gO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZWxlbS5pcyhcIi5vZy1DUkFOS1NFVC1DT0xPUiwgLm9nLUNIQUlOLCAub2ctQ1JBTkstUkVNT1ZFUi1UT09MXCIpICYmICRkLmhhc0NsYXNzKFwicC1DSHg2M1RcIik6XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsaWNrZWRPcHRpb25JbnB1dCA9IGVsZW0uZmluZChcImlucHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xpY2tlZE9wdGlvbklucHV0VmFsdWUgPSB1bmJvbGQoY2xpY2tlZE9wdGlvbklucHV0LnZhbCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbGlja2VkT0cgPSBlbGVtLnBhcmVudHMoXCIuZGV0YWlscy1wcm9kdWN0LW9wdGlvblwiKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3Qtb3B0aW9ucyAuZm9ybS1jb250cm9sX19yYWRpbzpjaGVja2VkXCIpLmVhY2goKGksIGUpID0+IGVsZW1lbnRzLnB1c2goJChlKS5jbG9zZXN0KFwiLm9cIilbMF0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZHMgPSBlbGVtZW50cy5tYXAoZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZSA9ICQoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBpZCA9ICQoZS5jbG9zZXN0KFwiLmRldGFpbHMtcHJvZHVjdC1vcHRpb25cIilbMF0gPT0gY2xpY2tlZE9HID8gZWxlbSA6IGUpLmF0dHIoXCJkYXRhLWxpbmtlZC1wcm9kdWN0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbHVncyA9IHByb2R1Y3RJZHMubWFwKHBpZCA9PiB1bmJvbGQoa25vd25Qcm9kdWN0U2x1Z3NbcGlkXT8uWzFdKT8ucmVwbGFjZSgvXkRBVEUgL2dpLCBcIlwiKSk/LmZpbHRlcihwID0+IHApIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2t1ID0gc2x1Z3Muam9pbihcIitcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0ID0ga25vd25Qcm9kdWN0U2x1Z3Nbc2t1XTsgLy9zMzYwW3NrdV1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhcmlhbnRJZCA9IHByb2R1Y3Q/LnZhcmlhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBpZCA9IHByb2R1Y3Q/LmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2cgPSB2YXJpYW50SWQgfHwgcGlkIHx8IHNrdTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgb3B0c01hcCA9IFtcIlwiLCB7IFwiQ0hBSU54MTMwOjU1OTczODc3MCBLTUMgYW50aS1ydXN0XCI6IFwiQ0hBSU54MTMwXCIgfSwgeyBcIkNSVHgxOjU2MTA1Njk5MSByZW1vdmVyIHRvb2xcIjogXCJDUlR4MVwiIH1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgb3B0cyA9IFsnaW5wdXRbbmFtZT1cIkNyYW5rc2V0IENvbG9yXCJdOmNoZWNrZWQnLCAnaW5wdXRbbmFtZT1cIkNoYWluXCJdOmNoZWNrZWQnLCAnaW5wdXRbbmFtZT1cIkNyYW5rIFJlbW92ZXIgVG9vbFwiXTpjaGVja2VkJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBzZWxlY3RlZE9wdGlvbnMgPSBvcHRzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC5tYXAocyA9PiAkKHMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAubWFwKChpbnB1dCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxldCB2YWwgPSB1bmJvbGQoaW5wdXQudmFsKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHZhciBvcHQgPSBvcHRzTWFwW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmIChpbnB1dC5wYXJlbnRzKFwiLmRldGFpbHMtcHJvZHVjdC1vcHRpb25cIilbMF0gPT0gY2xpY2tlZE9HKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICB2YWwgPSBjbGlja2VkT3B0aW9uSW5wdXRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKG9wdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgdmFsID0gb3B0W3ZhbF07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIGNvbnN0IHNlbGVjdGVkSW5wdXQgPSBpbnB1dC5maWx0ZXIoKGksIGlucHV0KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vICAgICBpbnB1dC52YWx1ZSA9PSB2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgLmZpbHRlcihCb29sZWFuKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9vZyA9IFwiREFURS1DSHg2M1QtXCIgKyBzZWxlY3RlZE9wdGlvbnMuam9pbihcIitcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbGVtLmlzKFwiLm9nLVJFRkxFQ1RJVkUtRlJBTUUtTE9HTy1DT0xPUlwiKSAmJiAkZC5pcyhcIi5wLUZSQU1FeDEtQkxBQ0stR09MRCwgLnAtRlJBTUV4MS1CTEFDSy1SRUQsIC5wLUZSQU1FeDEtQkxBQ0stWUVMTE9XLCAucC1GUkFNRXgxLUJMQUNLLUJMVUUsIC5wLUZSQU1FeDEtQkxBQ0stR1JFRU4sIC5wLUZSQU1FeDEtQkxBQ0stVElUQU5JVU0sIC5wLUZSQU1FeDEtQkxBQ0stV0hJVEUsIC5wLUZSQU1FeDEtQkxBQ0ssIC5wLUZSQU1FeDEtQkxBQ0stQkxBQ0tcIik6XG4gICAgICAgICAgICAgICAgICAgIG9nID0gXCJGUkFNRXgxLUJMQUNLOjYxMzQxMzkzM1wiICsgdW5ib2xkKHNlbGVjdGVkVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgISFkYXRhTGlua2VkUHJvZHVjdDpcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoZWxlbS5wYXJlbnQoKS5maW5kKGBbZGF0YS1saW5rZWQtcHJvZHVjdD0ke2N1cnJlbnRQYWdlLnByb2R1Y3RJZH1dYCkubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgc2t1ID0gW107XG4gICAgICAgICAgICAgICAgICAgIC8vICQoJy5vLmZvcm0tY29udHJvbC0tY2hlY2tib3gtYnV0dG9uIGlucHV0OmNoZWNrZWQnKS5mb3JFYWNoKChpLHApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAkKHApLnBhcmVudCgpLmF0dHIoJ2RhdGEtbGlua2VkLXByb2R1Y3QnKVxuICAgICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBlbGVtLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAsIGhhc1NlbGYgPSBwYXJlbnQuZmluZChgW2RhdGEtbGlua2VkLXByb2R1Y3Q9JHtjdXJyZW50UGFnZS5wcm9kdWN0SWR9XWApLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgLCBpc1RpcmUgPSAvXHVEODM1XHVEQzE1XHVEODM1XHVEQzA0XHVEODM1XHVEQzA0XHVEODM1XHVEQzMxLy50ZXN0KGN1cnJlbnRQYWdlLnNrdSlcbiAgICAgICAgICAgICAgICAgICAgICAgICwgaXNVbml0VHlwZSA9IGlzVGlyZSAmJiBlbGVtLmlzKFwiLm9nLVVOSVQtVFlQRVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1NlbGYgJiYgIWlzVW5pdFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9nID0gZGF0YUxpbmtlZFByb2R1Y3Q7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRSZXBsYWNlU3RhdGUgPSBrbm93blByb2R1Y3RTbHVnc1tjdXJyZW50UGFnZS5wcm9kdWN0SWRdOy8vczM2MFtjdXJyZW50UGFnZS5wcm9kdWN0SWRdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFJlcGxhY2VTdGF0ZSA9IGdldFByb2R1Y3RDb2RlRnJvbUN1cnJlbnRVcmwoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcCA9IHNob3VsZFJlcGxhY2VTdGF0ZSB8fCBrbm93blByb2R1Y3RTbHVnc1tvZ107IC8vczM2MFtvZ11cbiAgICAgICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSAkKFwiLmRldGFpbHMtcHJvZHVjdC1vcHRpb25cIik7XG4gICAgICAgICAgICAgICAgbGV0IG9wdHMgPSBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IGVsZW0ucGFyZW50cyhcIi5kZXRhaWxzLXByb2R1Y3Qtb3B0aW9uXCIpWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSW5wdXQgPSBlbGVtLmZpbmQoXCJpbnB1dFwiKVswXTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmZvckVhY2goKG9wdCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHQgPSBzZWxlY3RlZE9wdGlvbiA9PSBvcHQ7XG4gICAgICAgICAgICAgICAgICAgIG9wdCA9ICQob3B0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXRzID0gb3B0LmZpbmQoXCJpbnB1dFt0eXBlPXJhZGlvXVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2kgPSBpbnB1dHMuZmluZEluZGV4KG8gPT4gKHNlbGVjdGVkT3B0ID8gbyA9PSBzZWxlY3RlZElucHV0IDogby5jaGVja2VkKSk7XG4gICAgICAgICAgICAgICAgICAgICFpbnB1dHMubGVuZ3RoID8gXCJcIiA6IG9wdHMucHVzaChvaSA8IDAgPyAxIDogb2kgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdCA9IHBhcnNlSW50KCQod2luZG93KS5zY3JvbGxUb3AoKSkgfHwgcGFyc2VJbnQoJGIuc2Nyb2xsVG9wKCkpO1xuICAgICAgICAgICAgICAgIGlmIChzaG91bGRSZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHAuaWQsXG4gICAgICAgICAgICAgICAgICAgIH0sIG51bGwsIGAke2xvY2F0aW9uLnBhdGhuYW1lfT9vcHRpb25zPSR7b3B0cy5qb2luKFwiLFwiKX0ke3N0ID8gXCImc2Nyb2xsPVwiICsgc3QgOiBcIlwifWApO1xuICAgICAgICAgICAgICAgICAgICAvL21hcmtPdXRPZlN0b2NrUHJvZHVjdE9wdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBkLmJvZHlcbiAgICAgICAgICAgICAgICAgICAgICAgICwgaHRtbCA9IGQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KGJvZHkuc2Nyb2xsSGVpZ2h0LCBib2R5Lm9mZnNldEhlaWdodCwgaHRtbC5jbGllbnRIZWlnaHQsIGh0bWwuc2Nyb2xsSGVpZ2h0LCBodG1sLm9mZnNldEhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICRiLmNzcyhcIm1pbi1oZWlnaHRcIiwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3BlblBhZ2VPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHAuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlTdHJpbmc6IHN0ID8gW1tcInNjcm9sbFwiLCBzdF1dIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAudmFyaWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuUGFnZU9wdGlvbnMudmFyaWF0aW9uID0gcC52YXJpYXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkSGlkZVNjcmVlbkxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJGQudG9nZ2xlQ2xhc3MoXCJzY3JlZW4tbG9hZGluZ1wiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzY3JlZW4tbG9hZGluZ1wiLCBcIjFcIik7XG4gICAgICAgICAgICAgICAgICAgIHN0b3BKU1YoKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS53YXJuKFwiT3BlbmluZyBwYWdlIHdpdGggcGFyYW1ldGVyc1wiLCBvcGVuUGFnZU9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2x1ZyA9IHVuYm9sZChwLnNsdWcgfHwga25vd25Qcm9kdWN0U2x1Z3NbcC5pZF0/LnNsdWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNsdWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYW5nID0gZXh0cmFjdExhbmdGcm9tQ3VycmVudFBhZ2VVcmwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBocmVmID0gYCR7bGFuZ30vcHJvZHVjdHMvJHtzbHVnfT9vcHRpb25zPSR7b3B0cy5qb2luKFwiLFwiKX0mc2Nyb2xsPSR7c3R9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gaHJlZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVjd2lkLm9wZW5QYWdlKFwicHJvZHVjdFwiLCBvcGVuUGFnZU9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAsIDEwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0UHJvZHVjdENvZGVGcm9tQ3VycmVudFVybChpZCwgcHJvZHVjdFZhcmlhdGlvbikge1xuICAgICAgICBsZXQgbmFtZSA9IG51bGw7XG4gICAgICAgIGlmICghaWQgJiYgIWN1cnJlbnRQYWdlPy5wcm9kdWN0SWQpIHtcbiAgICAgICAgICAgIGRldGVjdEN1cnJlbnRQYWdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWQgPSBpZCB8fCBjdXJyZW50UGFnZT8ucHJvZHVjdElkO1xuICAgICAgICBwcm9kdWN0VmFyaWF0aW9uID0gcHJvZHVjdFZhcmlhdGlvbiB8fCBjdXJyZW50UGFnZT8udmFyaWF0aW9uSWQ7XG4gICAgICAgIC8vIGlmICghaWQpIHtcbiAgICAgICAgLy8gICBsZXQgbCA9IGxvY2F0aW9uLnBhdGhuYW1lIHx8IFwiXCI7XG4gICAgICAgIC8vICAgbGV0IGxpbmsgPSBsLm1hdGNoKC9wcm9kdWN0c1xcLyhEQVRFfFBPKSh4Mi18eDJXRC18LSkoLio/KS0oKC4qPyktKT8oKC4qPyktKT8vaW0pO1xuICAgICAgICAvLyAgIGlkID0gbC5tYXRjaCgvLXAoXFxkKykvbSk7XG4gICAgICAgIC8vICAgaWQgPSBpZCAmJiBpZFsxXTtcbiAgICAgICAgLy8gICBsZXQgcHJvZHVjdE5hbWUgPSAobGluayAmJiBsaW5rWzNdKSB8fCBcIlwiO1xuICAgICAgICAvLyAgIGxldCBwdiA9IChsaW5rICYmIGxpbmtbNV0gJiYgbGlua1s1XSkgfHwgXCJcIjsgLy9wcm9kdWN0IHZhcmlhdGlvbiBJRFxuICAgICAgICAvLyAgIGlmICh1bmJvbGQocHYpID09IHB2KSB7XG4gICAgICAgIC8vICAgICBwdiA9IFwiXCI7XG4gICAgICAgIC8vICAgfVxuICAgICAgICAvLyAgIGxldCBjID0gKGxpbmsgJiYgbGlua1s3XSkgfHwgXCJcIjtcbiAgICAgICAgLy8gICBsZXQgcHJvZHVjdFZhcmlhbnQgPSAocHYgIT0gXCJcIiAmJiBwdi50b1N0cmluZygpLnRvVXBwZXJDYXNlKCkgPT0gcHYgJiYgL1xcZCsvZy50ZXN0KHB2KSA/IFwiLVwiICsgcHYgOiBcIlwiKSB8fCBcIlwiO1xuICAgICAgICAvLyAgIGNvbnN0IGNvbG9yID0gKGMgIT0gXCJcIiAmJiBjLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKSA9PSBjICYmICEvXFxkKy9nLnRlc3QoYykgPyBcIi1cIiArIGMgOiBcIlwiKSB8fCBcIlwiO1xuICAgICAgICAvLyAgIG5hbWUgPSBwcm9kdWN0TmFtZSArIHByb2R1Y3RWYXJpYW50ICsgY29sb3I7XG4gICAgICAgIC8vICAgcHJvZHVjdFZhcmlhdGlvbiA9IG5ldyBVUkwobG9jYXRpb24pLnNlYXJjaFBhcmFtcy5nZXQoXCJ2YXJpYXRpb25cIik7XG4gICAgICAgIC8vIH1cbiAgICAgICAgY29uc3QgczM2MCA9IGtub3duUHJvZHVjdFNsdWdzO1xuICAgICAgICBsZXQgcDM2MCA9IHMzNjBbcHJvZHVjdFZhcmlhdGlvbl0gfHwgczM2MFtpZF0gfHwgczM2MFtuYW1lXSB8fCB7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICB2YXJpYXRpb246IHByb2R1Y3RWYXJpYXRpb25cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGlkICE9IHAzNjA/LmlkKSB7XG4gICAgICAgICAgICBwMzYwID0gczM2MFtpZF0gfHwgczM2MFtuYW1lXSB8fCB7XG4gICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICB2YXJpYXRpb246IHByb2R1Y3RWYXJpYXRpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHAzNjApIHtcbiAgICAgICAgICAgIHAzNjAubmFtZSB8fD0ga25vd25Qcm9kdWN0U2x1Z3NbcDM2MC5pZF0/LlszXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcDM2MDtcbiAgICB9XG4gICAgd2luZG93LmdldFByb2R1Y3RDb2RlRnJvbUN1cnJlbnRVcmwgPSBnZXRQcm9kdWN0Q29kZUZyb21DdXJyZW50VXJsO1xuICAgIGZ1bmN0aW9uIGluamVjdENzcyh1cmxzKSB7XG4gICAgICAgIHZhciB1cmxzVG9Mb2FkID0gMDtcbiAgICAgICAgdmFyIGNzc0xvYWRlZENhbGxiYWNrcyA9IFtdO1xuICAgICAgICB2YXIgZG9uZSA9IDA7XG4gICAgICAgIGZ1bmN0aW9uIGRvbmVJdGVtKCkge1xuICAgICAgICAgICAgZG9uZSsrO1xuICAgICAgICAgICAgaWYgKGRvbmUgPT0gdXJsc1RvTG9hZCAmJiBjc3NMb2FkZWRDYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY3NzTG9hZGVkQ2FsbGJhY2tzLmZvckVhY2goYyA9PiBUcnkoYykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICQoYXJndW1lbnRzKS5lYWNoKChpLCB1cmwpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdXJsID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGNzc0xvYWRlZENhbGxiYWNrcy5wdXNoKHVybCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodXJsKSkge1xuICAgICAgICAgICAgICAgIHVybC5mb3JFYWNoKHUgPT4ge1xuICAgICAgICAgICAgICAgICAgICB1cmxzVG9Mb2FkKys7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcHJlbG9hZGVkQ3NzW3VdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVsb2FkZWRDc3NbdV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgJChcIjxsaW5rIC8+XCIpLmF0dHIoXCJ0eXBlXCIsIFwidGV4dC9jc3NcIikuYXR0cihcInJlbFwiLCBcInN0eWxlc2hlZXRcIikuYXR0cihcImhyZWZcIiwgdSkub24oXCJsb2FkXCIsIGRvbmVJdGVtKS5hcHBlbmRUbyhsYXp5Q1NTKCkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmVJdGVtKHUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cmxzVG9Mb2FkKys7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmVsb2FkZWRDc3NbdXJsXSkge1xuICAgICAgICAgICAgICAgICAgICBwcmVsb2FkZWRDc3NbdXJsXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICQoXCI8bGluayAvPlwiKS5hdHRyKFwidHlwZVwiLCBcInRleHQvY3NzXCIpLmF0dHIoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpLmF0dHIoXCJocmVmXCIsIHVybCkub24oXCJsb2FkXCIsIGRvbmVJdGVtKS5hcHBlbmRUbyhsYXp5Q1NTKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgICAgICBkb25lSXRlbSh1cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluamVjdFByZWxvYWRDc3MoaWQsIHVybHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFja0NhbGxlZCA9IDA7XG4gICAgICAgIGZ1bmN0aW9uIG9uTG9hZGVkT25lQ3NzRmlsZSgpIHtcbiAgICAgICAgICAgIGlmICgrK2NhbGxiYWNrQ2FsbGVkID49IHVybHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAkKHVybHMpLmVhY2goKGksIHVybCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFwcmVsb2FkZWRDc3NbdXJsXSkge1xuICAgICAgICAgICAgICAgIHByZWxvYWRlZENzc1t1cmxdID0gMTtcbiAgICAgICAgICAgICAgICBsZXQgcyA9IGQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gICAgICAgICAgICAgICAgcy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBganMtQ1NTLSR7aWQ/LnRyaW0oKX0ke2kgPyBpIDogXCJcIn1gKTtcbiAgICAgICAgICAgICAgICBzLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0L2Nzc1wiKTtcbiAgICAgICAgICAgICAgICAvL3Muc2V0QXR0cmlidXRlKFwicmVsXCIsIFwicHJlbG9hZFwiKVxuICAgICAgICAgICAgICAgIC8vcy5zZXRBdHRyaWJ1dGUoXCJhc1wiLCBcInN0eWxlXCIpXG4gICAgICAgICAgICAgICAgcy5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpO1xuICAgICAgICAgICAgICAgIC8vcy5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBcInByaW50XCIpXG4gICAgICAgICAgICAgICAgbGV0IG9uQ3NzTG9hZGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoXCJwYXJzZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcInBhcnNlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKFwib25sb2FkXCIsIG9uQ3NzTG9hZGVkKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNldEF0dHJpYnV0ZSgncmVsJywgJ3N0eWxlc2hlZXQnKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnJlbW92ZUF0dHJpYnV0ZSgnbWVkaWEnKTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnJlbW92ZUF0dHJpYnV0ZSgnYXMnKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChvbkxvYWRlZE9uZUNzc0ZpbGUsIDApO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBvbkNzc0xvYWRlZCk7XG4gICAgICAgICAgICAgICAgLy8gLmF0dHIoXCJocmVmXCIsIHVybCArIFwiP2NhY2hlPVwiICsgbmV3IERhdGUoKS5nZXRUaW1lKCkpXG4gICAgICAgICAgICAgICAgcy5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHVybCk7XG4gICAgICAgICAgICAgICAgbGF6eUNTUygpLmFwcGVuZENoaWxkKHMpO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgb25Mb2FkZWRPbmVDc3NGaWxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBNb3ZlZCBoZWxwZXJzIGFyZSBpbXBsZW1lbnRlZCBpbiBgdXRpbHMuanNgIGFuZCBpbXBvcnRlZCBhYm92ZS5cbiAgICAvLyBFbnN1cmUgZ2xvYmFsIGZsYWdzIGV4aXN0IGFuZCBkZWxlZ2F0ZSB0byB0aGUgaGVscGVycy5cbiAgICB3aW5kb3cuc2hvdWxkSGlkZVNjcmVlbkxvYWRpbmcgPSB3aW5kb3cuc2hvdWxkSGlkZVNjcmVlbkxvYWRpbmcgPz8gdHJ1ZTtcbiAgICB3aW5kb3cuY2FuU2hvd0FjdGlvbkJhciA9IHdpbmRvdy5jYW5TaG93QWN0aW9uQmFyID8/IHRydWU7XG4gICAgd2luZG93LnNob3dBY3Rpb25CYXIgPSBzaG93QWN0aW9uQmFyO1xuICAgIHdpbmRvdy5oaWRlQWN0aW9uQmFyID0gaGlkZUFjdGlvbkJhcjtcbiAgICB3aW5kb3cuaW5qZWN0UHJvZHVjdERldGFpbHMgPSBpbmplY3RQcm9kdWN0RGV0YWlscztcbiAgICAvLyBpbnN0YWxsIHRoZSBzbWFsbCBzY3JvbGwgb3ZlcnJpZGUgdGhhdCBwcmVzZXJ2ZXMgb3JpZ2luYWwgYmVoYXZpb3JcbiAgICBpbnN0YWxsU2Nyb2xsT3ZlcnJpZGUoKTtcbiAgICBjb25zdCBzVG9wID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFbGVtZW50LnByb3RvdHlwZSwgXCJzY3JvbGxUb3BcIik7XG4gICAgY29uc3Qgc0ludG9WaWV3ID0gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsSW50b1ZpZXc7XG4gICAgRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsSW50b1ZpZXcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnM/LmR4MilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcmV0dXJuIHNJbnRvVmlldy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICAgICAgO1xuICAgIGNvbnN0IHNUID0ge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBzVG9wLmdldC5jYWxsKHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFpc1Njcm9sbGluZykge1xuICAgICAgICAgICAgICAgIHNUb3Auc2V0LmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBfX2RlZmluZVByb3BlcnR5KEVsZW1lbnQucHJvdG90eXBlLCBcInNjcm9sbFRvcFwiLCBzVCk7XG4gICAgaWYgKGN1cnJlbnRQYWdlPy50eXBlID09IFwiU0lURVwiKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGUgPT4ge1xuICAgICAgICAgICAgaW50ZXJhY3RXaXRoVmlkZW9CdXR0b25zKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICAgICAgLCB0cnVlKTtcbiAgICB9XG4gICAgdmFyIGgxSGVhZGVyU3R1Y2sgPSBudWxsLCBoMUhlYWRlclN0aWNraW5nO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGUgPT4ge1xuICAgICAgICBpZiAoaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyhzY3JvbGxYLCBzY3JvbGxZKTtcbiAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYnN0ID0gYi5zY3JvbGxUb3BcbiAgICAgICAgICAgICwgZHN0ID0gRC5zY3JvbGxUb3BcbiAgICAgICAgICAgICwgc2Nyb2xsID0gYnN0IHx8IGRzdDtcbiAgICAgICAgKGJzdCA+IDAgfHwgZHN0ID4gMCkgJiYgJGIudG9nZ2xlQ2xhc3MoXCJzaG93LWFycm93XCIsIHRydWUpO1xuICAgICAgICBsZXQgaCA9ICRoZWFkZXIgfHwgKCRoZWFkZXIgPSBkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbnMtdGlsZS0taGVhZGVyXCIpWzBdKTtcbiAgICAgICAgaWYgKGJzdCA+IDgwIHx8IGRzdCA+IDgwKSB7XG4gICAgICAgICAgICBpZiAoYiAmJiAhYi5jbGFzc0xpc3QuY29udGFpbnMoXCJzY3JvbGxlZFwiKSlcbiAgICAgICAgICAgICAgICBiLmNsYXNzTGlzdC5hZGQoXCJzY3JvbGxlZFwiKTtcbiAgICAgICAgICAgIGlmIChoICYmICFoLmNsYXNzTGlzdC5jb250YWlucyhcInNjcm9sbGVkXCIpKVxuICAgICAgICAgICAgICAgIGguY2xhc3NMaXN0LmFkZChcInNjcm9sbGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYi5jbGFzc0xpc3QucmVtb3ZlKFwic2Nyb2xsZWRcIik7XG4gICAgICAgICAgICBoICYmIGguY2xhc3NMaXN0LnJlbW92ZShcInNjcm9sbGVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY3JvbGwgPD0gMSAmJiAkYi5oYXNDbGFzcyhcImlzLXNjcm9sbGVkXCIpKSB7XG4gICAgICAgICAgICAkYi5yZW1vdmVDbGFzcyhcImlzLXNjcm9sbGVkXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHNjcm9sbCA+IDEgJiYgISRiLmhhc0NsYXNzKFwiaXMtc2Nyb2xsZWRcIikpIHtcbiAgICAgICAgICAgICRiLmFkZENsYXNzKFwiaXMtc2Nyb2xsZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGgxSGVhZGVyPy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvcCA9IGgxSGVhZGVyPy5bMF0/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpPy50b3BcbiAgICAgICAgICAgICAgICAsIHN0dWNrID0gdG9wIDw9IDYwXG4gICAgICAgICAgICAgICAgLCBzdGlja2luZyA9IHRvcCA8PSAkdy5oZWlnaHQoKSAvIDI7XG4gICAgICAgICAgICBpZiAoc3R1Y2sgIT09IGgxSGVhZGVyU3R1Y2spIHtcbiAgICAgICAgICAgICAgICBoMUhlYWRlclN0dWNrID0gc3R1Y2s7XG4gICAgICAgICAgICAgICAgaDFIZWFkZXIudG9nZ2xlQ2xhc3MoXCJzdHVja1wiLCBzdHVjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RpY2tpbmcgIT09IGgxSGVhZGVyU3RpY2tpbmcpIHtcbiAgICAgICAgICAgICAgICBoMUhlYWRlclN0aWNraW5nID0gc3RpY2tpbmc7XG4gICAgICAgICAgICAgICAgaDFIZWFkZXIudG9nZ2xlQ2xhc3MoXCJzdGlja2luZ1wiLCBzdGlja2luZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgICwgdHJ1ZSk7XG4gICAgZnVuY3Rpb24gcmVtb3ZlTWFkZVdpdGgoKSB7XG4gICAgICAgIGluaXRQcm9kdWN0QXR0cmlidXRlVGFibGVzKCk7XG4gICAgICAgICQoXCIuaW5zLXRpbGVfX21hZGUtd2l0aFwiKS5hdHRyKFwic3R5bGVcIiwgXCJkaXNwbGF5Om5vbmUgIWltcG9ydGFudDt2aXNpYmxpdHk6aGlkZGVuO1wiKTtcbiAgICAgICAgLy8gJCgnLmlucy10aWxlX19saW5rcycpLmF0dHIoJ3N0eWxlJywgJ2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50O3Zpc2libGl0eTpoaWRkZW47Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3JkZXJJbmZvUmVhZHkob3JkZXIpIHtcbiAgICAgICAgdmFyIGN1cnJlbmN5ID0gKG9yZGVyLmN1cnJlbmN5ID0gXCJFVVJcIik7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhcIm9yZGVyXCIsIG9yZGVyKTtcbiAgICAgICAgRWN3aWQuT25TZXRQcm9maWxlLmFkZChjdXN0b21lciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCJjdXN0b21lclwiLCBjdXN0b21lcik7XG4gICAgICAgICAgICB2YXIgY2FydCA9IG9yZGVyLmNhcnQ7XG4gICAgICAgICAgICB2YXIgcGF5ZWVzID0ge1xuICAgICAgICAgICAgICAgIHNhbmRib3g6IHtcbiAgICAgICAgICAgICAgICAgICAgZHgyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbF9hZGRyZXNzOiBcIkRBVEV4Mi5iaWtlQGdtYWlsLmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVyY2hhbnRfaWQ6IFwiNVdXUENITktOSk00U1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50X2lkOiBcIkFVc0dsNmN4UklkUk9IaEFGbG1NOGtpTDZQM1NMR081MkJxYUk1X2hJM1BBSGlvS1FsWm1OVnA2bVZiZzZROTFVX0pDOUoyMDdxVjFfTk1xXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiMndkXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsX2FkZHJlc3M6IFwiREFURXgyV0QuYmlrZUBnbWFpbC5jb21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmNoYW50X2lkOiBcIjI4VVpQWlhDS1k0S0pcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudF9pZDogXCJBVFg0ZS1mdzFSUnJpZi1xZnBndDVmcVBSVzZoa0ZoOXE3Wm9wNy0tZjU2UEZHX245X2dXYlR0M0VzdktNb3Jhek96YnZQZ3ZoYUhNOUFJMVwiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkeG06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsX2FkZHJlc3M6IFwiREFURXgyLm1vYmlsaXR5QGdtYWlsLmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVyY2hhbnRfaWQ6IFwiNVdXUENITktOSk00U1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50X2lkOiBcIkFmU214a3hFNElKMmZsUVppal8wcmU3a2dxVE5GalFYb2R5QXNQTi1uMnNqTFh4SGFkNjhyMmR6U3R1SmlZV1NmZ1h2V0VSVUp3eml2bFBtXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB2YXIgcGF5ZWUgPSBwYXllZXMuc2FuZGJveC5keDI7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCJjYXJ0XCIsIGNhcnQpO1xuICAgICAgICAgICAgdmFyIHMgPSBkLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzLnNldEF0dHJpYnV0ZShcImRlZmVyXCIsIFwiZGVmZXJcIik7XG4gICAgICAgICAgICBzLnNldEF0dHJpYnV0ZShcInNyY1wiLCBgaHR0cHM6Ly93d3cucGF5cGFsLmNvbS9zZGsvanM/Y2xpZW50LWlkPSR7cGF5ZWUuY2xpZW50X2lkfSZjb21wb25lbnRzPWJ1dHRvbnMmaW50ZW50PWNhcHR1cmUmY3VycmVuY3k9JHtjdXJyZW5jeX1gKTtcbiAgICAgICAgICAgIHZhciBlID0gMDtcbiAgICAgICAgICAgIHMub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBwbyA9IGJ1aWxkUHVyY2hhc2VPcmRlcihvcmRlciwgY3VzdG9tZXIsIGNhcnQsIHBheWVlKTtcbiAgICAgICAgICAgICAgICBFY3dpZC5PblBhZ2VMb2FkZWQuYWRkKHBhZ2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZSsrID4gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiUGF5UGFsT3JkZXJcIiwgcG8sICQoXCIuZWMtY2FydC1uZXh0X19zdGVwLS1wYXltZW50XCIpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgcGF5cGFsLkJ1dHRvbnMocG8pLnJlbmRlcihcIi5lYy1jYXJ0LW5leHRfX3N0ZXAtLXBheW1lbnRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgbGF6eUNTUygpLmFwcGVuZENoaWxkKHMpO1xuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJ1aWxkUHVyY2hhc2VPcmRlcihvcmRlciwgY3VzdG9tZXIsIGNhcnQsIHBheWVlKSB7XG4gICAgICAgIHZhciBjdXJyZW5jeSA9IG9yZGVyLmN1cnJlbmN5O1xuICAgICAgICB2YXIgb3JkZXJJZCA9IFwiMTIzNFwiO1xuICAgICAgICAvL3RvIGJlIGdlbmVyYXRlZFxuICAgICAgICB2YXIgYSA9IGNhcnQuc2hpcHBpbmdQZXJzb247XG4gICAgICAgIHZhciBzYSA9IHVhID0+IHtcbiAgICAgICAgICAgIHVhID0gdWEgfHwge307XG4gICAgICAgICAgICB1YS5hZGRyZXNzX2xpbmVfMSA9IGEuc3RyZWV0O1xuICAgICAgICAgICAgdWEuYWRkcmVzc19saW5lXzIgPSBcIlwiO1xuICAgICAgICAgICAgdWEuYWRtaW5fYXJlYV8xID0gYS5jaXR5O1xuICAgICAgICAgICAgdWEuYWRtaW5fYXJlYV8yID0gYS5jaXR5O1xuICAgICAgICAgICAgdWEucG9zdGFsX2NvZGUgPSBhLnBvc3RhbF9jb2RlO1xuICAgICAgICAgICAgdWEuY291bnRyeV9jb2RlID0gYS5jb3VudHJ5Q29kZTtcbiAgICAgICAgICAgIHJldHVybiB1YTtcbiAgICAgICAgfVxuICAgICAgICAgICAgO1xuICAgICAgICB2YXIgcG8gPSB7XG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIGxheW91dDogXCJ2ZXJ0aWNhbFwiLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBcImJsdWVcIixcbiAgICAgICAgICAgICAgICBzaGFwZTogXCJyZWN0XCIsXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwicGF5cGFsXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3VycmVuY3lfY29kZTogY3VycmVuY3ksXG4gICAgICAgICAgICAvL3BheWVyOiB7XG4gICAgICAgICAgICAvLyAgICAvL3BheWVyX2lkOiBjdXN0b21lci5pZH4sXG4gICAgICAgICAgICAvLyAgICBlbWFpbF9hZGRyZXNzOiBjdXN0b21lci5lbWFpbF9hZGRyZXNzLFxuICAgICAgICAgICAgLy8gICAgYWRkcmVzczogc2EoKSxcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IHsgZnVsbF9uYW1lOiBhLm5hbWUgfSxcbiAgICAgICAgICAgIC8vICAgIC8vcGhvbmU6IHsgbnVtYmVyOiBhLnBob25lLCB0eXBlOiBcIk1PQklMRVwiIH0sXG4gICAgICAgICAgICAvL30sXG4gICAgICAgICAgICBwdXJjaGFzZV91bml0czogW3tcbiAgICAgICAgICAgICAgICBhbW91bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVuY3lfY29kZTogY3VycmVuY3ksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvcmRlci50b3RhbCxcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtkb3duOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNjb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5X2NvZGU6IGN1cnJlbmN5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvcmRlci5kaXNjb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGluZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5X2NvZGU6IGN1cnJlbmN5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvcmRlci5oYW5kbGluZ0ZlZSB8fCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3VyYW5jZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5X2NvZGU6IGN1cnJlbmN5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvcmRlci5pbnN1cmFuY2VGZWUgfHwgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3BheXBhbCBmZWU/XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbV90b3RhbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5X2NvZGU6IGN1cnJlbmN5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvcmRlci50b3RhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwcGluZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5X2NvZGU6IGN1cnJlbmN5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvcmRlci5zaGlwcGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NoaXBwaW5nX2Rpc2NvdW50OiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgdGF4X3RvdGFsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3lfY29kZTogY3VycmVuY3ksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9yZGVyLnRheCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjdXN0b21faWQ6IGNhcnQuY2FydElkLFxuICAgICAgICAgICAgICAgIG9yZGVySWQ6IG9yZGVySWQsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiREFURXgyIGdvb2RpZXNcIixcbiAgICAgICAgICAgICAgICBpdGVtczogY2FydC5pdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwID0gaXRlbS5wcm9kdWN0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHk6IGl0ZW0ucXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0X2Ftb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5X2NvZGU6IGN1cnJlbmN5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwLnByaWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBcIlBIWVNJQ0FMX0dPT0RTXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogcC5zaG9ydERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2t1OiBwLnNrdSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbV9pZDogcC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGF4OiAwLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHBheWVlOiB7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsX2FkZHJlc3M6IHBheWVlLmVtYWlsX2FkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIC8vbWVyY2hhbnRfaWQ6IHBheWVlLm1lcmNoYW50X2lkLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9wYXltZW50X2luc3RydWN0aW9uOiAnSU5TVEFOVCcsXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlX2lkOiBudWxsLFxuICAgICAgICAgICAgICAgIC8vVGhlIEFQSSBjYWxsZXItcHJvdmlkZWQgZXh0ZXJuYWwgSUQgZm9yIHRoZSBwdXJjaGFzZSB1bml0LiBSZXF1aXJlZCBmb3IgbXVsdGlwbGUgcHVyY2hhc2UgdW5pdHMgd2hlbiB5b3UgbXVzdCB1cGRhdGUgdGhlIG9yZGVyIHRocm91Z2ggUEFUQ0guIElmIHlvdSBvbWl0IHRoaXMgdmFsdWUgYW5kIHRoZSBvcmRlciBjb250YWlucyBvbmx5IG9uZSBwdXJjaGFzZSB1bml0LCBQYXlQYWwgc2V0cyB0aGlzIHZhbHVlIHRvIGRlZmF1bHQuXG4gICAgICAgICAgICAgICAgc2hpcHBpbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogc2Eoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJTSElQUElOR1wiXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAvL1BJQ0tVUF9JTl9QRVJTT04uIFRoZSBwYXllciBpbnRlbmRzIHRvIHBpY2sgdXAgdGhlIGl0ZW1zIGZyb20gdGhlIHBheWVlIGluIHBlcnNvbi5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNvZnRfZGVzY3JpcHRvcnN0cmluZzogb3JkZXJJZCxcbiAgICAgICAgICAgIH0sXSxcbiAgICAgICAgICAgIGNyZWF0ZU9yZGVyOiAoZGF0YSwgYWN0aW9ucykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGF5UGFsIGNyZWF0ZS1vcmRlclwiLCBhcmd1bWVudHMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVQYXlQYWxPcmRlcihvcmRlciwgY2FydCwgY3VzdG9tZXIsIHBvLCBkYXRhLCBhY3Rpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICxcbiAgICAgICAgICAgIG9uQXBwcm92ZTogKGRhdGEsIGFjdGlvbnMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBheVBhbCBvbkFwcHJvdmVcIiwgZGF0YSwgdGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXBwcm92ZUVjd2lkT3JkZXJQYXltZW50KG9yZGVyLCBjYXJ0LCBjdXN0b21lciwgcG8sIGRhdGEsIGFjdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLFxuICAgICAgICAgICAgb25DYW5jZWw6IGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGF5UGFsIG9uQ2FuY2VsXCIsIGRhdGEsIHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAsXG4gICAgICAgICAgICBvbkVycm9yOiBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGF5UGFsIG9uRXJyb3JcIiwgZXJyLCB0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLFxuICAgICAgICAgICAgb25TaGlwcGluZ0NoYW5nZShkYXRhLCBhY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXlQYWwgb25TaGlwcGluZ0NoYW5nZVwiLCBkYXRhLCB0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHBvO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVQYXlQYWxPcmRlcihvcmRlciwgY2FydCwgY3VzdG9tZXIsIHBvLCBkYXRhRm9yUGF5UGFsLCBwYXlwYWxBY3Rpb25zKSB7XG4gICAgICAgIHJldHVybiBwYXlwYWxBY3Rpb25zLm9yZGVyLmNyZWF0ZSh7XG4gICAgICAgICAgICBwYXllcjogcG8ucGF5ZXIsXG4gICAgICAgICAgICBwdXJjaGFzZV91bml0czogcG8ucHVyY2hhc2VfdW5pdHMsXG4gICAgICAgIH0pLnRoZW4ocGF5UGFsT3JkZXJJZCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcGF5UGFsT3JkZXJJZDtcbiAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICAvL3dpbmRvdy5mZXRjaEVjd2lkT3JkZXIgPSBmZXRjaEVjd2lkT3JkZXI7XG4gICAgZnVuY3Rpb24gZmV0Y2hFY3dpZE9yZGVyVmlhUHJveHkobWV0aG9kLCBkYXRhLCBvcmRlcklkcywgZW1haWwsIGhlYWRlcnMpIHtcbiAgICAgICAgaGVhZGVycyA9ICQuZXh0ZW5kKHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtFY3dpZEFwaUtleX1gLFxuICAgICAgICAgICAgYWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9LCBoZWFkZXJzKTtcbiAgICAgICAgY29uc3QgdXJsID0gYGh0dHBzOi8vZGV2LmRhdGV4Mi5iaWtlL29yZGVyP3N0b3JlPSR7c3RvcmVJZH0mb3JkZXJJZHM9JHtvcmRlcklkcyB8fCBcIlwifSZlbWFpbD0ke2VtYWlsIHx8IFwiXCJ9JnRva2VuPSR7RWN3aWRBcGlLZXl9YDtcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QgfHwgXCJHRVRcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICAgICBib2R5OiBkYXRhICYmIEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICB9KS50aGVuKHIgPT4gY29uc29sZS5sb2cocikgfHwgci5qc29uKCkpO1xuICAgIH1cbiAgICBsZXQgY2FjaGVkQ2FydFRvdGFsUXVldWUgPSBbbnVsbF07XG4gICAgbGV0IGNhY2hlZENhcnRRdWV1ZSA9IFtudWxsXTtcblxuICAgIHZhciBvbkFwaUxvYWRlZEV4ZWN1dGVkID0gZmFsc2U7XG4gICAgRWN3aWQuT25BUElMb2FkZWQuYWRkKGEgPT4gKG9uQXBpTG9hZGVkRXhlY3V0ZWQgPSB0cnVlKSk7XG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlVG90YWxQcm9taXNlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhY2hlZENhcnRUb3RhbFF1ZXVlWzBdKVxuICAgICAgICAgICAgICAgIHJlc29sdmUoY2FjaGVkQ2FydFRvdGFsUXVldWVbMF0pO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FjaGVkQ2FydFRvdGFsUXVldWUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChjYWNoZWRDYXJ0VG90YWxRdWV1ZS5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBwb29sRmV0Y2hDYXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHBvb2xGZXRjaENhcnQoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUVjd2lkPy5DYXJ0Py5jYWxjdWxhdGVUb3RhbCB8fCAhb25BcGlMb2FkZWRFeGVjdXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocG9vbEZldGNoQ2FydCwgNTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIEVjd2lkLkNhcnQuY2FsY3VsYXRlVG90YWwodG90YWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b3RhbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVkQ2FydFRvdGFsUXVldWVbMF0gPSB0b3RhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZWRDYXJ0VG90YWxRdWV1ZS5zcGxpY2UoMSwgY2FjaGVkQ2FydFRvdGFsUXVldWUubGVuZ3RoKS5mb3JFYWNoKHByb21pc2UgPT4gKHRvdGFsID8gcHJvbWlzZS5yZXNvbHZlKHRvdGFsKSA6IHByb21pc2UucmVqZWN0KHRvdGFsKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVDYXJ0VG90YWxQcm9taXNlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhY2hlZENhcnRRdWV1ZVswXSlcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNhY2hlZENhcnRRdWV1ZVswXSk7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWNoZWRDYXJ0UXVldWUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChjYWNoZWRDYXJ0UXVldWUubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9vbEZldGNoQ2FydCgpO1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBwb29sRmV0Y2hDYXJ0KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFFY3dpZD8uQ2FydD8uZ2V0IHx8ICFvbkFwaUxvYWRlZEV4ZWN1dGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChwb29sRmV0Y2hDYXJ0LCA1MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgRWN3aWQuQ2FydC5nZXQoY2FydCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlZENhcnRRdWV1ZVswXSA9IGNhcnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FydC5pdGVtcy5mb3JFYWNoKHAgPT4gKHN1bSArPSBwLnF1YW50aXR5ICogcC5wcm9kdWN0LnByaWNlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FydC50b3RhbCA9IHN1bTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZWRDYXJ0UXVldWUuc3BsaWNlKDEsIGNhY2hlZENhcnRRdWV1ZS5sZW5ndGgpLmZvckVhY2gocHJvbWlzZSA9PiAoY2FydCA/IHByb21pc2UucmVzb2x2ZShjYXJ0KSA6IHByb21pc2UucmVqZWN0KGNhcnQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIGxldCBmZXRjaFByb2R1Y3RDYWNoZSA9IHt9O1xuICAgIHdpbmRvdy5mZXRjaFByb2R1Y3QgPSBmdW5jdGlvbiBmZXRjaFByb2R1Y3QobWV0aG9kLCBwcm9kdWN0SWQsIHJldHVybkZpZWxkcywgZGF0YSwgaGVhZGVycykge1xuICAgICAgICBjb25zdCBrZXkgPSBbbWV0aG9kLCBwcm9kdWN0SWQsIHJldHVybkZpZWxkcywgZGF0YSwgaGVhZGVyc10uam9pbihcIjpcIik7XG4gICAgICAgIGNvbnN0IGNhY2hlZFByb2R1Y3QgPSBmZXRjaFByb2R1Y3RDYWNoZVtrZXldIHx8IChmZXRjaFByb2R1Y3RDYWNoZVtrZXldID0gW251bGxdKTtcbiAgICAgICAgaWYgKGNhY2hlZFByb2R1Y3RbMF0pXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gcmVzb2x2ZShjYWNoZWRQcm9kdWN0WzBdKSk7XG4gICAgICAgIHJldHVybiAoZmV0Y2hQcm9kdWN0Q2FjaGVba2V5XVswXSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNhY2hlZFByb2R1Y3QucHVzaCh7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGNhY2hlZFByb2R1Y3QubGVuZ3RoID4gMilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBoZWFkZXJzID0gJC5leHRlbmQoe1xuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtFY3dpZEFwaUtleX1gLFxuICAgICAgICAgICAgICAgIGFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICB9LCBoZWFkZXJzKTtcbiAgICAgICAgICAgIGZldGNoKGBodHRwczovL2FwcC5lY3dpZC5jb20vYXBpL3YzLyR7c3RvcmVJZH0vcHJvZHVjdHMke3Byb2R1Y3RJZCA/IFwiL1wiIDogXCJcIn0ke3Byb2R1Y3RJZCB8fCBcIlwifT90b2tlbj0ke0Vjd2lkQXBpS2V5fSZyZXNwb25zZUZpZWxkcz0ke3JldHVybkZpZWxkcyB8fCBcImlkLHNrdSxvcHRpb25zXCJ9YCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kIHx8IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICAgICAgICBtb2RlOiBcImNvcnNcIixcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgICAgIH0pLnRoZW4ociA9PiBjb25zb2xlLmxvZyhyKSB8fCByLmpzb24oKSkudGhlbihwID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGMgPSBmZXRjaFByb2R1Y3RDYWNoZVtrZXldO1xuICAgICAgICAgICAgICAgIHBjWzBdID0gcDtcbiAgICAgICAgICAgICAgICBwPy5vcHRpb25zPy5mb3JFYWNoKG8gPT4gby5jaG9pY2VzPy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3l5ID0ge31cbiAgICAgICAgICAgICAgICAgICAgICAgICwgY3kgPSBjLnRleHRUcmFuc2xhdGVkLmN5XG4gICAgICAgICAgICAgICAgICAgICAgICAsIGNpID0gcGFyc2VJbnQoY3kpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3kgJiYgY3kgIT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN5eS5pZCA9IGNpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY3kgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN5ID0gY3kucmVwbGFjZSgvJy9nLCAnXCInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3l5ID0gSlNPTi5wYXJzZShjeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCB7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjLnRleHRUcmFuc2xhdGVkLmN5ID0gY3l5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICBwYy5zcGxpY2UoMSwgcGMubGVuZ3RoIC0gMSkuZm9yRWFjaChwcm9taXNlID0+IHByb21pc2UucmVzb2x2ZShwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApLmNhdGNoKHJlYXNvbiA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBjID0gZmV0Y2hQcm9kdWN0Q2FjaGVba2V5XTtcbiAgICAgICAgICAgICAgICBwY1swXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgcGMuc3BsaWNlKDEsIHBjLmxlbmd0aCAtIDEpLmZvckVhY2gocHJvbWlzZSA9PiBwcm9taXNlLnJlamVjdChyZWFzb24pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgKSk7XG4gICAgfVxuICAgICAgICA7XG5cbiAgICBmdW5jdGlvbiBwcmV2ZW50RGVmYXVsdENsaWNrQW5kT3BlblByb2R1Y3RXaXRoT3B0aW9ucyhlbGVtLCBpdGVtcykge1xuICAgICAgICBcIm1vdXNldXAgY2xpY2tcIi5zcGxpdChcIiBcIikuZm9yRWFjaChldmVudFR5cGUgPT4ge1xuICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIFwiY2xpY2sgbW91c2Vkb3duXCIuc3BsaXQoXCIgXCIpLmZvckVhY2goZXZlbnRUeXBlID0+IGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGxldCBsYW5nID0gJGQuYXR0cihcImxhbmdcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcbiAgICAgICAgICAgIHZhciBjYXJ0SXRlbXNFbGVtZW50cyA9ICQoXCIuZWMtY2FydC1pdGVtX19waWN0dXJlXCIpO1xuICAgICAgICAgICAgdmFyIHByb2R1Y3RJbmRleCA9ICQuaW5BcnJheShlbGVtLCBjYXJ0SXRlbXNFbGVtZW50cyk7XG4gICAgICAgICAgICBpZiAocHJvZHVjdEluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIGNhcnRJdGVtc0VsZW1lbnRzID0gJChcIi5lYy1jYXJ0LWl0ZW1fX3RpdGxlXCIpO1xuICAgICAgICAgICAgICAgIHByb2R1Y3RJbmRleCA9ICQuaW5BcnJheShlbGVtLCBjYXJ0SXRlbXNFbGVtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvZHVjdEluZGV4ID49IDAgJiYgcHJvZHVjdEluZGV4IDwgaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBpdGVtc1twcm9kdWN0SW5kZXhdO1xuICAgICAgICAgICAgICAgIHZhciBwcm9kdWN0ID0gaXRlbT8ucHJvZHVjdCB8fCBpdGVtO1xuICAgICAgICAgICAgICAgIHZhciBwcm9kdWN0T3B0aW9ucyA9IGl0ZW0/LnNlbGVjdGVkT3B0aW9ucyA/IGl0ZW0uc2VsZWN0ZWRPcHRpb25zLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VNb2RpZmllcjogYy52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLnJlZHVjZSgobywgcCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4ubyxcbiAgICAgICAgICAgICAgICAgICAgW3AudGV4dF06IHAucHJpY2VNb2RpZmllclxuICAgICAgICAgICAgICAgIH0pLCB7fSkgOiBpdGVtPy5vcHRpb25zO1xuICAgICAgICAgICAgICAgIGZldGNoUHJvZHVjdChcIkdFVFwiLCBwcm9kdWN0LnByb2R1Y3RJZCB8fCBwcm9kdWN0LmlkLCBcImlkLHNrdSxjdXN0b21TbHVnLHByaWNlLG9wdGlvbnModHlwZSxuYW1lLGNob2ljZXModGV4dCxwcmljZU1vZGlmaWVyLHByaWNlTW9kaWZpZXJUeXBlLHRleHRUcmFuc2xhdGVkKGN5KSkpXCIpLnRoZW4ocCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwT3BzID0gcC5vcHRpb25zIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBleHRyYXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHBPcHMubWFwKG9wdEdyb3VwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBvcHRHcm91cC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcHJvZHVjdE9wdGlvbnNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IG9wdEdyb3VwLmNob2ljZXMgPyBvcHRHcm91cC5jaG9pY2VzLmZpbmRJbmRleChjID0+IGMudGV4dCA9PSB2YWx1ZSkgOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRHcm91cC5jaG9pY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFzLnB1c2goW1wicG8tLVwiICsga2V5LnJlcGxhY2UoLyAvZywgXCItXCIpLCB2YWx1ZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4ID09IG51bGwgPyBudWxsIDogaW5kZXggPD0gMCA/IDEgOiBpbmRleCArIDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKS5maWx0ZXIobyA9PiBvKTtcbiAgICAgICAgICAgICAgICAgICAgc3RvcEpTVigpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYW5nID0gZXh0cmFjdExhbmdGcm9tQ3VycmVudFBhZ2VVcmwoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7bGFuZ30vcHJvZHVjdHMvJHtwLmN1c3RvbVNsdWd9JHtvcHRpb25zLmxlbmd0aCB8fCBleHRyYXMubGVuZ3RoID8gXCI/XCIgOiBcIlwifSR7b3B0aW9ucy5sZW5ndGggPyBcIm9wdGlvbnM9XCIgOiBcIlwifSR7b3B0aW9ucy5qb2luKFwiLFwiKX0ke29wdGlvbnMubGVuZ3RoICYmIGV4dHJhcy5sZW5ndGggPyBcIiZcIiA6IFwiXCJ9JHtleHRyYXMuam9pbihcIiZcIil9YDtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICAgICAgICAgICAgICAgICAgLy8gRWN3aWQub3BlblBhZ2UoXCJwcm9kdWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICBpZDogcHJvZHVjdD8ucHJvZHVjdElkIHx8IHByb2R1Y3Q/LmlkLFxuICAgICAgICAgICAgICAgICAgICAvLyAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgcXVlcnlTdHJpbmc6IGV4dHJhcyxcbiAgICAgICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZXhwYW5kUHJvZHVjdE9wdGlvbnMoZWxlbSkge1xuICAgICAgICBpZiAoIWVsZW0uZXhwYW5kUHJvZHVjdE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGVsZW0uZXhwYW5kUHJvZHVjdE9wdGlvbnMgPSB0cnVlO1xuICAgICAgICAgICAgZWxlbSA9ICQoZWxlbSk7XG4gICAgICAgICAgICBlbGVtLmNsaWNrKGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLm9mZnNldFkgPCAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS50b2dnbGVDbGFzcyhcImV4cGFuZGVkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGxhc3RDYXJ0VG90YWxNdXRhdGlvbk9ic2VydmVyID0gbnVsbDtcbiAgICBvblVubG9hZCh0cnVlLCBwID0+IHtcbiAgICAgICAgLy8kZC50b2dnbGVDbGFzcyhcInNob3ctZm9vdGVyXCIsIGZhbHNlKTtcbiAgICAgICAgYm9uZEFkZFRvQ2FydENvbnRyb2xzID0gZmFsc2U7XG4gICAgICAgIGlmIChsYXN0Q2FydFRvdGFsTXV0YXRpb25PYnNlcnZlciAhPSBudWxsKSB7XG4gICAgICAgICAgICBsYXN0Q2FydFRvdGFsTXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICBsYXN0Q2FydFRvdGFsTXV0YXRpb25PYnNlcnZlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgKTtcbiAgICBvblVubG9hZENvbXBsZXRlZCh0cnVlLCBwID0+IHtcbiAgICAgICAgLy9UcnkoYmluZEFkZFRvQ2FydENvbnRyb2xzLCBwPy5wcm9kdWN0SWQsIHApLCAxKTtcbiAgICAgICAgYmluZEFkZFRvQ2FydENvbnRyb2xzKHA/LnByb2R1Y3RJZCwgcCwgdHJ1ZSk7XG4gICAgfVxuICAgICk7XG5cbiAgICB2YXIgbGlzdGVuT25SZXNpemVUaW1lb3V0ID0gMDtcbiAgICB2YXIgbGlzdGVuT25SZXNpemVFbGVtcyA9IHt9O1xuICAgIHZhciBsaXN0ZW5PblJlc2l6ZSA9IG5ldyBSZXNpemVPYnNlcnZlcihlbnRyaWVzID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGxpc3Rlbk9uUmVzaXplVGltZW91dCk7XG4gICAgICAgIGxpc3Rlbk9uUmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoc2V0Rm9vdGVySGVpZ2h0LCA1MCk7XG4gICAgfVxuICAgICk7XG4gICAgb25VbmxvYWQodSA9PiB7XG4gICAgICAgICQuZWFjaChsaXN0ZW5PblJlc2l6ZUVsZW1zLCAoa2V5LCBlbGVtKSA9PiB7XG4gICAgICAgICAgICBsaXN0ZW5PblJlc2l6ZS51bm9ic2VydmUoZWxlbSk7XG4gICAgICAgICAgICBkZWxldGUgbGlzdGVuT25SZXNpemVFbGVtc1tlbGVtXTtcbiAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICAgICAgLCB0cnVlKTtcbiAgICBmdW5jdGlvbiBvbkluamVjdENhcnRJbWFnZVJlc2l6ZShlbGVtKSB7XG4gICAgICAgIGlmICghbGlzdGVuT25SZXNpemVbZWxlbV0pIHtcbiAgICAgICAgICAgIGxpc3Rlbk9uUmVzaXplLm9ic2VydmUoZWxlbSk7XG4gICAgICAgICAgICBsaXN0ZW5PblJlc2l6ZUVsZW1zW2VsZW1dID0gZWxlbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBpbmplY3RQcm9kdWN0T3B0aW9uUHJpY2VzKGVsZW0sIHByb2R1Y3RzLCBvcmRlciwgY2FydCwgcHJpY2VJbmZvLCB1aVByb2R1Y3RFbGVtLCB1aVByb2R1Y3RJbmRleCwgbGFuZykge1xuICAgICAgICBjb25zdCB1aXAgPSAkKHVpUHJvZHVjdEVsZW0pXG4gICAgICAgICAgICAsIHVpbyA9IHVpcC5maW5kKFwiLmVjLWNhcnQtaXRlbV9fb3B0aW9ucyA+IC5lYy1jYXJ0LWl0ZW1fX29wdGlvblwiKVxuICAgICAgICAgICAgLCBxdWFudGl0eSA9IHVpcC5maW5kKFwiLmVjLWNhcnQtaXRlbV9fY291bnQtLXNlbGVjdCAuZm9ybS1jb250cm9sX19zZWxlY3RcIikudmFsKCk7XG4gICAgICAgIHAgPSBwcm9kdWN0c1t1aVByb2R1Y3RJbmRleF07XG4gICAgICAgIC8vbGV0IG9wdGlvblZhbHVlID0gdWlvLmZpbmQoJy5lYy1jYXJ0LW9wdGlvbi0tdmFsdWUnKTtcbiAgICAgICAgLy8gbGV0IHVpb2RwID0gdWlvLmZpbmQoXCIuY2FydC1vcHRpb24tZGlzY291bnRlZC1wcmljZVwiKTtcbiAgICAgICAgLy8gdWlvZHAgPSB1aW9kcC5sZW5ndGggPyB1aWRwIDogJCgnPGRpdiBjbGFzcz1cImNhcnQtb3B0aW9uLWRpc2NvdW50ZWQtcHJpY2VcIi8+JykuaW5zZXJ0QWZ0ZXIob3B0aW9uVmFsdWUpO1xuICAgICAgICAvLyB1aW9kcC50b2dnbGVDbGFzcyhcImxvYWRpbmctcHJpY2VcIiwgdHJ1ZSk7XG4gICAgICAgIC8vIGxldCB1aW9wID0gdWlvLmZpbmQoXCIuY2FydC1vcHRpb24tcHJpY2VcIik7XG4gICAgICAgIC8vIHVpb3AgPSB1aW9wLmxlbmd0aCA/IHVpb3AgOiAkKCc8ZGl2IGNsYXNzPVwiY2FydC1vcHRpb24tcHJpY2VcIi8+JykuaW5zZXJ0QmVmb3JlKG9wdGlvblZhbHVlKTtcbiAgICAgICAgdWlvLmVhY2goKG9wdGlvbkluZGV4LCBvcHRpb25FbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBvcHRpb25FbGVtZW50ID0gJChvcHRpb25FbGVtZW50KTtcbiAgICAgICAgICAgIC8vbGV0IHByaWNlRWxlbWVudCA9IG9wdGlvbkVsZW1lbnQuZmluZCgnLmNhcnQtb3B0aW9uLXByaWNlJyk7XG4gICAgICAgICAgICAvL2xldCBkaXNjb3VudGVkUHJpY2VFbGVtZW50ID0gbyRwdGlvbkVsZW1lbnQuZmluZCgnLmNhcnQtb3B0aW9uLWRpc2NvdW50ZWQtcHJpY2UnKTtcbiAgICAgICAgICAgIGxldCBvcHRpb25WYWx1ZUVsZW1lbnQgPSBvcHRpb25FbGVtZW50LmZpbmQoXCIuZWMtY2FydC1vcHRpb24tLXZhbHVlXCIpO1xuICAgICAgICAgICAgbGV0IG9wdGlvbktleUVsZW1lbnQgPSBvcHRpb25FbGVtZW50LmZpbmQoXCIuZWMtY2FydC1vcHRpb24tLWtleVwiKTtcbiAgICAgICAgICAgIGxldCBvcHRpb25WYWx1ZSA9ICQob3B0aW9uVmFsdWVFbGVtZW50WzBdLmZpcnN0Q2hpbGQpLnRleHQoKTtcbiAgICAgICAgICAgIGxldCBrZXkgPSAkKG9wdGlvbktleUVsZW1lbnRbMF0uZmlyc3RDaGlsZCkudGV4dCgpPy5yZXBsYWNlKC86ID8kLywgXCJcIik7XG5cbiAgICAgICAgICAgIGxldCBvcHRpb24gPSBwLm9wdGlvbnMuZmluZChvID0+IChvLm5hbWVUcmFuc2xhdGVkW2xhbmddIHx8IG8ubmFtZVRyYW5zbGF0ZWRbXCJlblwiXSkgPT0ga2V5KTtcbiAgICAgICAgICAgIGxldCBmb3JtYXR0ZWRQcmljZSA9IFwiXCJcbiAgICAgICAgICAgICAgICAsIGZvcm1hdHRlZERpc2NvdW50ZWRQcmljZSA9IFwiXCI7XG4gICAgICAgICAgICBpZiAob3B0aW9uPy5jaG9pY2VzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZWRDaG9pY2VzQXJyYXkgPSBvcHRpb24uY2hvaWNlcy5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGMudGV4dFRyYW5zbGF0ZWRbbGFuZ10gfHwgYy50ZXh0VHJhbnNsYXRlZFtcImVuXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VNb2RpZmllcjogYy50ZXh0VHJhbnNsYXRlZD8uY3k/LmlkID09IHAuaWQgPyBwLnByaWNlIDogYy5wcmljZU1vZGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzVmFsdWU6ICFOb3RJbmNsdWRlZC50ZXN0KGMudGV4dCkgJiYgISFjLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBscDogYy50ZXh0VHJhbnNsYXRlZD8uY3k/LmlkLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxldCB0cmFuc2xhdGVkQ2hvaWNlcyA9IHRyYW5zbGF0ZWRDaG9pY2VzQXJyYXkucmVkdWNlKChvLCBwKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAuLi5vLFxuICAgICAgICAgICAgICAgICAgICBbcC50ZXh0XToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VNb2RpZmllcjogcC5wcmljZU1vZGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbHA6IHAubHBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLCB7fSk7XG4gICAgICAgICAgICAgICAgbGV0IGhhc1ZhbHVlcyA9IHRyYW5zbGF0ZWRDaG9pY2VzQXJyYXkucmVkdWNlKChvLCBwKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAuLi5vLFxuICAgICAgICAgICAgICAgICAgICBbcC50ZXh0XTogcC5oYXNWYWx1ZVxuICAgICAgICAgICAgICAgIH0pLCB7fSk7XG4gICAgICAgICAgICAgICAgbGV0IHByaWNlT3B0aW9uID0gdHJhbnNsYXRlZENob2ljZXNbb3B0aW9uVmFsdWVdO1xuICAgICAgICAgICAgICAgIGxldCBoYXNWYWx1ZSA9IGhhc1ZhbHVlc1tvcHRpb25WYWx1ZV07XG4gICAgICAgICAgICAgICAgb3B0aW9uRWxlbWVudC50b2dnbGVDbGFzcyhcImhhcy12YWx1ZVwiLCAhIWhhc1ZhbHVlKS50b2dnbGVDbGFzcyhcImlzLWVtcHR5XCIsICFoYXNWYWx1ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgLy9vID0gcD8ub3B0aW9ucz8uZmluZChvID0+IG8ubmFtZSA9PSBzbyksXG4gICAgICAgICAgICAgICAgICAgIC8vYyA9IG8/LmNob2ljZXM/LmZpbmQoYyA9PiBjLnRleHQgPT0gc3YpLFxuICAgICAgICAgICAgICAgICAgICBscCA9IGtub3duUHJvZHVjdFNsdWdzW3ByaWNlT3B0aW9uLmxwXVxuICAgICAgICAgICAgICAgICAgICAsIHdscCA9IGxwPy53aG9sZXNhbGVQcmljZXM/LmZpbmRMYXN0KGx3ID0+IGx3LnF1YW50aXR5IDw9IHF1YW50aXR5KVxuICAgICAgICAgICAgICAgICAgICAsIHdsZCA9ICh3bHA/LnByaWNlIHx8IDEpIC8gKHdscD8uY29tcGFyZVRvUHJpY2UgfHwgd2xwPy5wcmljZSB8fCAxKVxuICAgICAgICAgICAgICAgICAgICAsIHByaWNlTW9kaWZpZXIgPSBwcmljZU9wdGlvbi5wcmljZU1vZGlmaWVyIHx8IDBcbiAgICAgICAgICAgICAgICAgICAgLCBkb3AgPSBNYXRoLm1pbih3bGQsIDEgLSBwcmljZUluZm8uYWN0dWFsQ2FydEJhc2VkRGlzY291bnRQZXJjZW50KVxuICAgICAgICAgICAgICAgICAgICAsIG9wdGlvblVuaXRQcmljZSA9IC8qbHA/LmlkID09IHAuaWQgPyAwIDogKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgubWF4KHdscD8ucHJpY2UgfHwgMCwgKGxwPy5jb21wYXJlVG9QcmljZSB8fCBscD8ucHJpY2UgfHwgMCkgKiBkb3AsIHByaWNlTW9kaWZpZXIgKiBkb3ApIHx8IHByaWNlTW9kaWZpZXIgfHwgMDtcblxuICAgICAgICAgICAgICAgIHZhciBwcmljZSA9IGxwPy5jb21wYXJlVG9QcmljZSB8fCBscD8ucHJpY2UgfHwgcHJpY2VPcHRpb24/LnByaWNlTW9kaWZpZXIgfHwgMDtcbiAgICAgICAgICAgICAgICB2YXIgb2xkRGlzY291bnRlZFByaWNlID0gcHJpY2UgLSBwcmljZSAqIHByaWNlSW5mby5kaXNjb3VudFBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgZGlzY291bnRlZFByaWNlID0gb3B0aW9uVW5pdFByaWNlO1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFByaWNlID0gZGlzY291bnRlZFByaWNlID4gcHJpY2UgfHwgcHJpY2UgPT0gMCA/IFwiXCIgOiBFY3dpZC5mb3JtYXRDdXJyZW5jeShNYXRoLnJvdW5kKHByaWNlKSk/LnJlcGxhY2UoXCIuMDBcIiwgXCJcIik/LnJlcGxhY2UoXCIsMDBcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkRGlzY291bnRlZFByaWNlID0gZGlzY291bnRlZFByaWNlID09IDAgfHwgcHJpY2UgPT0gMCB8fCBpc05hTihkaXNjb3VudGVkUHJpY2UpIHx8IGlzTmFOKHByaWNlKSA/IFwiXCIgOiBFY3dpZC5mb3JtYXRDdXJyZW5jeShNYXRoLnJvdW5kKGRpc2NvdW50ZWRQcmljZSA8IHByaWNlID8gZGlzY291bnRlZFByaWNlIDogcHJpY2UpKS5yZXBsYWNlKFwiLjAwXCIsIFwiXCIpLnJlcGxhY2UoXCIsMDBcIiwgXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZm9ybWF0dGVkUHJpY2UgPT0gZm9ybWF0dGVkRGlzY291bnRlZFByaWNlKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkUHJpY2UgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3B0aW9uS2V5RWxlbWVudCAvLy5jc3MoXCItLXByaWNlXCIsIGAnJHtDU1MuZXNjYXBlKGZvcm1hdHRlZFByaWNlKX0nYClcbiAgICAgICAgICAgICAgICAudWlOdW1iZXIoZm9ybWF0dGVkUHJpY2UsIFwidWktbnVtYmVyIHVpLWNhcnQtb3B0aW9uLW1zcnBcIiwgXCJpbnRcIiwgMCwgXCJcIiwgXCJcIiwgXCJcIiwgMCwgdHJ1ZSk7XG4gICAgICAgICAgICBvcHRpb25WYWx1ZUVsZW1lbnQgLy8uY3NzKFwiLS1kaXNjb3VudGVkLXByaWNlXCIsIGAnJHtDU1MuZXNjYXBlKGZvcm1hdHRlZERpc2NvdW50ZWRQcmljZSl9J2ApXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKFwibG9hZGluZy1wcmljZVwiLCBmYWxzZSkudWlOdW1iZXIoZm9ybWF0dGVkRGlzY291bnRlZFByaWNlLCBcInVpLW51bWJlciB1aS1jYXJ0LW9wdGlvbi1wcmljZVwiLCBcImludFwiLCAwLCBcIlwiLCBcIlwiLCBcIlwiLCAwLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBoYXNFbXB0eVZhbHVlcyA9IHVpby5maWx0ZXIoXCIuaXMtZW1wdHlcIikubGVuZ3RoID4gMDtcbiAgICAgICAgaWYgKGhhc0VtcHR5VmFsdWVzKSB7XG4gICAgICAgICAgICBkLmFycml2ZShcIi5lYy1jYXJ0LWl0ZW1fX29wdGlvbnNcIiwge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nOiB0cnVlXG4gICAgICAgICAgICB9LCBleHBhbmRQcm9kdWN0T3B0aW9ucyk7XG4gICAgICAgICAgICB1aW8uYXR0cihcImRhdGEtaW5kZXhcIiwgaSA9PiAoJCh1aW9baV0pLmlzKFwiLmhhcy12YWx1ZVwiKSA/IGkgOiAxMDAwICsgaSkpO1xuICAgICAgICAgICAgdWlvLnNvcnRFbGVtZW50cygoYSwgYikgPT4gKHBhcnNlSW50KCQoYSkuYXR0cihcImRhdGEtaW5kZXhcIikpIDwgcGFyc2VJbnQoJChiKS5hdHRyKFwiZGF0YS1pbmRleFwiKSkgPyAtMSA6IDEpKTtcbiAgICAgICAgfVxuICAgICAgICB1aXAuZmluZChcIi5lYy1jYXJ0LWl0ZW1fX29wdGlvbnNcIikudG9nZ2xlQ2xhc3MoXCJleHBhbmRhYmxlXCIsIGhhc0VtcHR5VmFsdWVzKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcHJvY2Vzc09yZGVyQ29uZmlybWF0aW9uTGluZXMocGFnZSwgZWxlbXMpIHtcbiAgICAgICAgZmV0Y2hFY3dpZE9yZGVyVmlhUHJveHkoXCJHRVRcIiwgbnVsbCwgcGFnZS52ZW5kb3JPcmRlck51bWJlciwgcGFnZS5jdXN0b21lci5lbWFpbCkudGhlbihvID0+IHtcbiAgICAgICAgICAgIHZhciBpdGVtcyA9IG8uaXRlbXMsIGNhcnQsIHN1bW1hcnkgPSBvO1xuICAgICAgICAgICAgbyAmJiAoc3VtbWFyeSA9IHtcbiAgICAgICAgICAgICAgICB0b3RhbDogby50b3RhbCxcbiAgICAgICAgICAgICAgICBzdWJ0b3RhbDogby5zdWJ0b3RhbCxcbiAgICAgICAgICAgICAgICBkaXNjb3VudDogLW8uZGlzY291bnQsXG4gICAgICAgICAgICAgICAgc2hpcHBpbmc6IG8uc2hpcHBpbmcgfHwgKG8uc2hpcHBpbmdPcHRpb24gJiYgby5zaGlwcGluZ09wdGlvbi5zaGlwcGluZ1JhdGVXaXRob3V0VGF4KSxcbiAgICAgICAgICAgICAgICB0YXg6IG8udGF4LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbGVtcy5lYWNoKChpLCBlbGVtKSA9PiBpbmplY3RQcm9kdWN0T3B0aW9uUHJpY2VzKGVsZW0sIGl0ZW1zLCBvLCBjYXJ0LCBzdW1tYXJ5KSk7XG4gICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcHJvY2Vzc0NhcnRQYWdlc09yZGVyTGluZXMocGFnZSwgZWNDYXJ0X19Qcm9kdWN0c0lubmVyLCBjYXJ0KSB7XG4gICAgICAgIC8vUHJvbWlzZS5hbGwoW25ldyBQcm9taXNlKHIgPT5cbiAgICAgICAgLy9FY3dpZC5DYXJ0LmdldChjYXJ0ID0+IHtcbiAgICAgICAgLy9yKGNhcnQpKSksIG5ldyBQcm9taXNlKHIgPT4gRWN3aWQuQ2FydC5jYWxjdWxhdGVUb3RhbChvID0+IHIobykpKV0pLnRoZW4ociA9PiB7XG4gICAgICAgIC8vY29uc3QgY2FydCA9IHI/LlswXTtcbiAgICAgICAgbG9nRHVyYXRpb24oXCJzdW1tYXJ5XCIsIFwiRmV0Y2hpbmcgY2FydCBwcm9kdWN0c1wiKSgpO1xuICAgICAgICB2YXIgbGlzdGVuRm9yU3VtbWFyeVByaWNlID0gZmFsc2U7XG4gICAgICAgIGZldGNoQ2FydFByb2R1Y3RzKGNhcnQpLnRoZW4oY2FydFByb2R1Y3RzID0+IHtcbiAgICAgICAgICAgIGxvZ0R1cmF0aW9uKFwic3VtbWFyeVwiLCBcIkZldGNoZWQgY2FydCBwcm9kdWN0c1wiKSgpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYXJyaXZlKFwiLmVjLWNhcnQtaXRlbV9fcHJpY2UtaW5uZXJcIiwge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nOiB0cnVlXG4gICAgICAgICAgICB9LCBlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBlbGVtID0gJChlbGVtKTtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJ0b3RhbCA9IHBhcnNlUHJpY2UoJChcIi5lYy1jYXJ0LXN1bW1hcnlfX2NlbGwuZWMtY2FydC1zdW1tYXJ5X19wcmljZTpmaXJzdCgpXCIpLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgdmFyIHByaWNlID0gcGFyc2VQcmljZShlbGVtLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgdmFyIGRpc2NvdW50UGVyY2VudCA9IGdldERpc2NvdW50UGVyY2VudChzdWJ0b3RhbCkgfHwgMDtcbiAgICAgICAgICAgICAgICB2YXIgZGlzY291bnRlZFByaWNlID0gcHJpY2UgLSBwcmljZSAqIGRpc2NvdW50UGVyY2VudDtcbiAgICAgICAgICAgICAgICB2YXIgaGFzRGlzY291bnQgPSBkaXNjb3VudGVkUHJpY2UgIT0gcHJpY2U7XG4gICAgICAgICAgICAgICAgZWxlbS50b2dnbGVDbGFzcyhcImVjLWNhcnQtaXRlbV9fcHJpY2Utd2l0aG91dC1kaXNjb3VudFwiLCB0cnVlKS50b2dnbGVDbGFzcyhcImVjLWNhcnQtaXRlbV9fcHJpY2Utd2l0aC1kaXNjb3VudFwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgZWxlbS50b2dnbGVDbGFzcyhcImhhcy1kaXNjb3VudFwiLCBoYXNEaXNjb3VudCk7XG4gICAgICAgICAgICAgICAgdmFyIHdpdGhEaXNjb3VudCA9IGVsZW0ucGFyZW50KCkuZmluZChcIi5lYy1jYXJ0LWl0ZW1fX3ByaWNlLXdpdGgtZGlzY291bnRcIik7XG4gICAgICAgICAgICAgICAgd2l0aERpc2NvdW50Lmxlbmd0aCA/IHdpdGhEaXNjb3VudCA6IGVsZW0ucGFyZW50KCkuYXBwZW5kKCh3aXRoRGlzY291bnQgPSBlbGVtLmNsb25lKCkudG9nZ2xlQ2xhc3MoXCJlYy1jYXJ0LWl0ZW1fX3ByaWNlLXdpdGgtZGlzY291bnRcIiwgdHJ1ZSkpKTtcbiAgICAgICAgICAgICAgICB3aXRoRGlzY291bnQudG9nZ2xlQ2xhc3MoXCJoaWRkZW5cIiwgIWhhc0Rpc2NvdW50KS50b2dnbGVDbGFzcyhcImVjLWNhcnQtaXRlbV9fcHJpY2UtaW5uZXJcIiwgZmFsc2UpLnRvZ2dsZUNsYXNzKFwiaGFzLWRpc2NvdW50XCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzRGlzY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgd2l0aERpc2NvdW50LnRleHQoRWN3aWQuZm9ybWF0Q3VycmVuY3koZGlzY291bnRlZFByaWNlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJvbmRBZGRUb0NhcnRDb250cm9scyA9IGluamVjdEJ1dHRvbnMoY3VycmVudFBhZ2UsIGUgPT4ge1xuICAgICAgICAgICAgICAgICRkLmFycml2ZShcIi5lYy1jYXJ0X19zdW1tYXJ5XCIsIG9uY2VPbmx5LCBlbGVtQ2FydFN1bW1hcnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWNvbXB1dGVDYXJ0U3VtbWFyeShjYXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgJGQuYXJyaXZlKFwiLmVjLWNhcnQtaXRlbV9fY291bnQtLXNlbGVjdCAuZm9ybS1jb250cm9sX19zZWxlY3QsIC5lYy1jYXJ0LWl0ZW1fX2NvbnRyb2wtaW5uZXJcIiwgbm90T25jZU9ubHlTZWxmVW5iaW5kLCBzZWxlY3RDb3VudFJlZ2lzdGVyQ2hhbmdlRXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBzZXRGb290ZXJIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tvdXRGb290ZXJBY3Rpb25CdXR0b25SZXNpemVkKGVsZW1DYXJ0U3VtbWFyeSk7XG4gICAgICAgICAgICAgICAgICAgIGNhblNob3dBY3Rpb25CYXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzaG93Rm9vdGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHNob3dBY3Rpb25CYXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICwgYm9uZEFkZFRvQ2FydENvbnRyb2xzLCBiaW5kQWRkVG9DYXJ0Q29udHJvbHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlY29tcHV0ZUNhcnRTdW1tYXJ5KGNhcnQsIGluZGV4LCBxdHkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgRWN3aWQuQ2FydC5nZXQoY2FydCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaENhcnRQcm9kdWN0cyhjYXJ0LCB0cnVlKS50aGVuKGNhcnRQcm9kdWN0cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb21wdXRlQ2FydFN1bW1hcnkoY2FydCwgaW5kZXgsIHF0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFsaXN0ZW5Gb3JTdW1tYXJ5UHJpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuRm9yU3VtbWFyeVByaWNlID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjb21wdXRlQ2FydFN1bW1hcnkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbXV0YXRpb24uZm9yRWFjaChtID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgc3BhbiA9ICQobS50YXJnZXQpLnBhcmVudCgpLmZpbmQoXCJzcGFuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICB0ciA9IHNwYW4ucGFyZW50cyhcInRyOmZpcnN0XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICB0ZCA9IHRyLmZpbmQoXCJ0ZC51aS1wYXRjaGVkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICB0b3RhbCA9IHRyLmZpbmQoXCIuZWMtY2FydC1zdW1tYXJ5X190b3RhbFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgdGV4dCA9IHRvdGFsLmxlbmd0aCA/ICQodG90YWxbMF0uZmlyc3RDaGlsZCkudGV4dCgpIDogc3Bhbi50ZXh0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNscyA9IC9lYy1jYXJ0LXN1bW1hcnlfX3Jvdy0tKC4qKSggfCQpL2dpLmV4ZWModHJbMF0/LmNsYXNzTmFtZSlbMV0gfHwgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRkLnVpTnVtYmVyKHRleHQsIGB1aS1zdW1tYXJ5LXByaWNlIHVpLXN1bW1hcnktcHJpY2UtJHtjbHN9YCwgXCJudW1iZXJcIiwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgJGQuYXJyaXZlKFwiLmVjLWNhcnQtc3VtbWFyeV9fdG90YWxcIiwgbm90T25jZU9ubHksIGVsZW1TdW1tYXJ5UHJpY2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbGVtU3VtbWFyeVByaWNlLm9ic2VydmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1TdW1tYXJ5UHJpY2Uub2JzZXJ2aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5Gb3JTdW1tYXJ5UHJpY2Uub2JzZXJ2ZShlbGVtU3VtbWFyeVByaWNlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBsYW5nID0gJGQuYXR0cihcImxhbmdcIikudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICAsIHVpUHJvZHVjdHMgPSBlY0NhcnRfX1Byb2R1Y3RzSW5uZXIuZmluZChcIi5lYy1jYXJ0X19pdGVtXCIpXG4gICAgICAgICAgICAgICAgICAgICwgcHJpY2VJbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWw6IGNhcnQudG90YWwgfHwgcGFyc2VQcmljZSgkKCQoXCIuZWMtY2FydC1zdW1tYXJ5X190b3RhbDpmaXJzdFwiKVswXS5jaGlsZE5vZGVzWzBdKS50ZXh0KCkgfHwgMCkgfHwgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRvdGFsOiBjYXJ0LnN1YnRvdGFsIHx8IHBhcnNlUHJpY2UoJChcIi5lYy1jYXJ0LXN1bW1hcnlfX3Jvdy5lYy1jYXJ0LXN1bW1hcnlfX3Jvdy0taXRlbXM6Zmlyc3QgLmVjLWNhcnQtc3VtbWFyeV9fY2VsbC5lYy1jYXJ0LXN1bW1hcnlfX3ByaWNlOmZpcnN0XCIpLnRleHQoKSkgfHwgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NvdW50OiBjYXJ0LmRpc2NvdW50IHx8IHBhcnNlUHJpY2UoJChcIi5lYy1jYXJ0LXN1bW1hcnlfX3Jvdy0tZGlzY291bnQgLmVjLWNhcnQtc3VtbWFyeV9fcHJpY2U6Zmlyc3RcIikudGV4dCgpKSB8fCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHBpbmc6IGNhcnQuc2hpcHBpbmcgfHwgcGFyc2VQcmljZSgkKFwiLmVjLWNhcnQtc3VtbWFyeV9fcm93LS1zaGlwcGluZyAuZWMtY2FydC1zdW1tYXJ5X19wcmljZTpmaXJzdFwiKS50ZXh0KCkpIHx8IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXg6IGNhcnQudGF4IHx8IHBhcnNlUHJpY2UoJChcIi5lYy1jYXJ0LXN1bW1hcnlfX3Jvdy0tdGF4ZXMgLmVjLWNhcnQtc3VtbWFyeV9fcHJpY2U6Zmlyc3RcIikudGV4dCgpKSB8fCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bWVudEZlZTogY2FydC5wYXltZW50RmVlIHx8IHBhcnNlUHJpY2UoJChcIi5lYy1jYXJ0LXN1bW1hcnlfX3Jvdy0tc3VyY2hhcmdlIC5lYy1jYXJ0LXN1bW1hcnlfX3ByaWNlOmZpcnN0XCIpKSB8fCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbXNycDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbENhcnRCYXNlZERpc2NvdW50UGVyY2VudDogMCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBwcmljZUluZm8udmF0UGVyY2VudCA9IE1hdGgucm91bmQoKHByaWNlSW5mby50YXggLyAocHJpY2VJbmZvLnRvdGFsIC0gcHJpY2VJbmZvLnRheCB8fCAxKSkgKiAxMDAsIDIpO1xuICAgICAgICAgICAgICAgIC8vcHJpY2VJbmZvLnRheCAvIChwcmljZUluZm8uc3VidG90YWwgKyBwcmljZUluZm8uZGlzY291bnQgKyBwcmljZUluZm8uc2hpcHBpbmcgfHwgMSkgfHwgMDtcbiAgICAgICAgICAgICAgICBwcmljZUluZm8uZGlzY291bnRQZXJjZW50ID0gcHJpY2VJbmZvID8gTWF0aC5hYnMocHJpY2VJbmZvLmRpc2NvdW50KSAvIE1hdGguYWJzKHByaWNlSW5mby5zdWJ0b3RhbCB8fCAxKSA6IGdldERpc2NvdW50UGVyY2VudChzdWJ0b3RhbCkgfHwgMDtcbiAgICAgICAgICAgICAgICBwcmljZUluZm8ucGF5bWVudEZlZVBlcmNlbnQgPSBwcmljZUluZm8ucGF5bWVudEZlZSAvIChwcmljZUluZm8udG90YWwgLSBwcmljZUluZm8ucGF5bWVudEZlZSB8fCAxKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjb21wdXRlU3ViVG90YWwoY2FydERpc2NvdW50UGVyY2VudCkge1xuICAgICAgICAgICAgICAgICAgICBwcmljZUluZm8uc3VidG90YWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICBwcmljZUluZm8ubXNycCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNhcnQuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3AgPSBpdGVtLnBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHByb2R1Y3RJZCA9IGNwPy5pZCB8fCBpdGVtLnByb2R1Y3Q/LmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAvL3AgPSBrbm93blByb2R1Y3RTbHVnc1twcm9kdWN0SWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YW50aXR5ID0gaSA9PT0gaW5kZXggPyBxdHkgOiBwYXJzZUludCgkKGAuZWMtY2FydC1pdGVtX19jb3VudC1pbm5lcjpudGgoJHtpfSkgLmZvcm0tY29udHJvbF9fc2VsZWN0YCkudmFsKCkpIHx8IGl0ZW0ucXVhbnRpdHk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlSW5mby5tc3JwICs9IChjcD8uY29tcGFyZVRvUHJpY2UgfHwgY3AucHJpY2UpICogcXVhbnRpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VJbmZvLnN1YnRvdGFsICs9IGl0ZW0ucHJvZHVjdC5wcmljZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd3AgPSBjcC53aG9sZXNhbGVQcmljZXM/LmZpbmRMYXN0KGx3ID0+IGx3LnF1YW50aXR5IDw9IHF1YW50aXR5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHdwZCA9ICh3cD8ucHJpY2UgfHwgMCkgLyAod3A/LmNvbXBhcmVUb1ByaWNlIHx8IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZHAgPSBNYXRoLm1pbih3cGQsIDEgLSBjYXJ0RGlzY291bnRQZXJjZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHVuaXRQcmljZSA9ICh3cD8uY29tcGFyZVRvUHJpY2UgfHwgY3AuY29tcGFyZVRvUHJpY2UgfHwgY3AucHJpY2UpICogZHBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBsaW5lUHJvZHVjdFByaWNlID0gdW5pdFByaWNlICogcXVhbnRpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VJbmZvLnN1YnRvdGFsICs9IGxpbmVQcm9kdWN0UHJpY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3A/Lm9wdGlvbnM/LmZvckVhY2goKG8sIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgLy9vID0gcD8ub3B0aW9ucz8uZmluZChvID0+IG8ubmFtZSA9PSBzbyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2MgPSBvPy5jaG9pY2VzPy5maW5kKGMgPT4gYy50ZXh0ID09IHN2KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBvPy5zZWxlY3RlZENob2ljZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBjeSA9IGM/LnRleHRUcmFuc2xhdGVkPy5jeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBscCA9IGtub3duUHJvZHVjdFNsdWdzW2N5Py5pZF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgd2xwID0gbHA/Lndob2xlc2FsZVByaWNlcz8uZmluZExhc3QobHcgPT4gbHcucXVhbnRpdHkgPD0gcXVhbnRpdHkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHdsZCA9ICh3bHA/LnByaWNlIHx8IDEpIC8gKHdscD8uY29tcGFyZVRvUHJpY2UgfHwgd2xwPy5wcmljZSB8fCAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBwcmljZU1vZGlmaWVyID0gby5zZWxlY3RlZENob2ljZT8ucHJpY2VNb2RpZmllciB8fCAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRvcCA9IE1hdGgubWluKHdsZCwgMSAtIGNhcnREaXNjb3VudFBlcmNlbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG9wdGlvblVuaXRQcmljZSA9IGN5Py5pZCA9PSBjcC5pZCA/IDAgOiBNYXRoLm1heCh3bHA/LnByaWNlIHx8IDAsIChscD8uY29tcGFyZVRvUHJpY2UgfHwgbHA/LnByaWNlIHx8IDApICogZG9wLCBwcmljZU1vZGlmaWVyICogZG9wKSB8fCBwcmljZU1vZGlmaWVyIHx8IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbGluZU9wdGlvblByaWNlID0gb3B0aW9uVW5pdFByaWNlICogcXVhbnRpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdG9BZGRTdWJUb3RhbCA9IGN5Py5pZCA9PSBwcm9kdWN0SWQgPyAwIDogbGluZU9wdGlvblByaWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHRvQWRkTVNSUCA9IGN5Py5pZCA9PSBwcm9kdWN0SWQgPyAwIDogKHdscD8uY29tcGFyZVRvUHJpY2UgfHwgbHA/LmNvbXBhcmVUb1ByaWNlIHx8IHdscD8ucHJpY2UgfHwgbHA/LnByaWNlIHx8IHByaWNlTW9kaWZpZXIgfHwgMCkgKiBxdWFudGl0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VJbmZvLnN1YnRvdGFsICs9IHRvQWRkU3ViVG90YWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlSW5mby5tc3JwICs9IHRvQWRkTVNSUDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb21wdXRlU3ViVG90YWwoMCk7XG4gICAgICAgICAgICAgICAgcHJpY2VJbmZvLmFjdHVhbENhcnRCYXNlZERpc2NvdW50UGVyY2VudCA9IGdldERpc2NvdW50UGVyY2VudChwcmljZUluZm8uc3VidG90YWwpO1xuICAgICAgICAgICAgICAgIGNvbXB1dGVTdWJUb3RhbChwcmljZUluZm8uYWN0dWFsQ2FydEJhc2VkRGlzY291bnRQZXJjZW50KTtcbiAgICAgICAgICAgICAgICBwcmljZUluZm8uZGlzY291bnQgPSBNYXRoLm1pbihwcmljZUluZm8uc3VidG90YWwgLSBwcmljZUluZm8ubXNycCwgMCkgKyAwLjE7XG4gICAgICAgICAgICAgICAgcHJpY2VJbmZvLmRpc2NvdW50UGVyY2VudCA9IC0xICsgcHJpY2VJbmZvLnN1YnRvdGFsIC8gKHByaWNlSW5mby5tc3JwIHx8IDEpO1xuICAgICAgICAgICAgICAgIHByaWNlSW5mby5wYXltZW50RmVlID0gcHJpY2VJbmZvLnBheW1lbnRGZWVQZXJjZW50ICogKHByaWNlSW5mby5zdWJ0b3RhbCArIHByaWNlSW5mby5zaGlwcGluZyk7XG4gICAgICAgICAgICAgICAgcHJpY2VJbmZvLnRvdGFsID0gcHJpY2VJbmZvLm1zcnAgKyBwcmljZUluZm8uc2hpcHBpbmcgKyBwcmljZUluZm8uZGlzY291bnQgKyBwcmljZUluZm8ucGF5bWVudEZlZTtcbiAgICAgICAgICAgICAgICBwcmljZUluZm8udGF4ID0gKChwcmljZUluZm8udG90YWwgLyAoMSArIHByaWNlSW5mby52YXRQZXJjZW50IC8gMTAwKSkgKiBwcmljZUluZm8udmF0UGVyY2VudCkgLyAxMDA7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VtbWFyeSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHByaWNlSW5mby5tc3JwLFxuICAgICAgICAgICAgICAgICAgICBzaGlwcGluZzogcHJpY2VJbmZvLnNoaXBwaW5nLFxuICAgICAgICAgICAgICAgICAgICBzdXJjaGFyZ2U6IHByaWNlSW5mby5wYXltZW50RmVlLFxuICAgICAgICAgICAgICAgICAgICBkaXNjb3VudDogcHJpY2VJbmZvLmRpc2NvdW50LFxuICAgICAgICAgICAgICAgICAgICBkaXNjb3VudFByZWNlbnQ6IHByaWNlSW5mby5kaXNjb3VudFBlcmNlbnQsXG4gICAgICAgICAgICAgICAgICAgIFwiaXRlbXMgZWMtY2FydC1zdW1tYXJ5X19ib2R5XCI6IHByaWNlSW5mby50b3RhbCAtIHByaWNlSW5mby50YXgsXG4gICAgICAgICAgICAgICAgICAgIHRheGVzOiBwcmljZUluZm8udGF4LFxuICAgICAgICAgICAgICAgICAgICB0b3RhbDogcHJpY2VJbmZvLnRvdGFsLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLCBzdW1tYXJ5RGlzY291bnRzID0gJChcIi5lYy1jYXJ0X19zdW1tYXJ5IHRib2R5OmZpcnN0XCIpLmZpbmRPckNyZWF0ZShcIi5lYy1jYXJ0LXN1bW1hcnlfX3Jvdy0tZGlzY291bnRcIiwgZSA9PiBgXG4gICAgICAgICAgICAgIDx0ciBjbGFzcz1cImVjLWNhcnQtc3VtbWFyeV9fcm93IGVjLWNhcnQtc3VtbWFyeV9fcm93LS1kaXNjb3VudFwiPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImVjLWNhcnQtc3VtbWFyeV9fY2VsbCBlYy1jYXJ0LXN1bW1hcnlfX3RpdGxlXCI+PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJlYy1jYXJ0LXN1bW1hcnlfX2NlbGwgZWMtY2FydC1zdW1tYXJ5X19wcmljZVwiPjxzcGFuIGNsYXNzPVwiZWMtY2FydC1zdW1tYXJ5X19wcmljZS1taW51c1wiPjwvc3Bhbj48c3Bhbj48L3NwYW4+PC90ZD48L3RyPmApO1xuICAgICAgICAgICAgICAgIHN1bW1hcnlEaXNjb3VudHMudG9nZ2xlKHByaWNlSW5mby5kaXNjb3VudFBlcmNlbnQgPCAwKS50b2dnbGVDbGFzcyhcImRpc2NvdW50LXBhdGNoZWRcIikuZmluZChcIi5lYy1jYXJ0LXN1bW1hcnlfX3RpdGxlXCIpLnVpTnVtYmVyKChwcmljZUluZm8uZGlzY291bnRQZXJjZW50ICogMTAwKS50b0ZpeGVkKDIpICsgXCIlXCIsIFwidWktZGlzY291bnQtcGVyY2VudFwiLCBcInBlcmNlbnQtbnVtYmVyXCIsIDAsIFwiIChcIiwgXCIpXCIsIG51bGwsIG51bGwsIG51bGwsIHRydWUpLnRvZ2dsZUNsYXNzKFwiZGlzY291bnQtcGF0Y2hlZFwiKTtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGluamVjdFVJTnVtYmVyU3VtbWFyeUNhcnROdW1iZXIoZWxlbVN1bW1hcnlQcmljZSwgZWxlbVN1bW1hcnlQcmljZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSAkKGVsZW1TdW1tYXJ5UHJpY2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbS5pcyhcIi5lYy1jYXJ0LXN1bW1hcnlfX3ByaWNlLWhpZGRlblwiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHIgPSBlbGVtLnBhcmVudChcInRyXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAsIHNwYW4gPSBlbGVtLmZpbmQoXCJzcGFuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAsIHRleHQgPSBzcGFuLmhhc0NsYXNzKFwiZWMtY2FydC1zdW1tYXJ5X190b3RhbFwiKSA/ICQoc3BhblswXS5maXJzdENoaWxkKS50ZXh0KCkgOiBzcGFuLmxlbmd0aCA/IHNwYW4udGV4dCgpIDogZWxlbS50ZXh0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICwgY2xzID0gL2VjLWNhcnQtc3VtbWFyeV9fcm93LS0oLio/KSggfCQpL2dpLmV4ZWModHJbMF0/LmNsYXNzTmFtZSlbMV0gfHwgXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLCB2YWx1ZSA9IHN1bW1hcnlbY2xzXVxuICAgICAgICAgICAgICAgICAgICAgICAgLCBmb3JtYXR0ZWRUZXh0ID0gdmFsdWUgPyBFY3dpZC5mb3JtYXRDdXJyZW5jeSh2YWx1ZSkgOiB0ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAsIHVpUGF0Y2ggPSB0ci5maW5kKFwiLnVpLXBhdGNoZWRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICwgdGQgPSB1aVBhdGNoLmxlbmd0aCA/IHVpUGF0Y2ggOiAkKGA8dGQgY2xhc3M9XCJlYy1jYXJ0LXN1bW1hcnlfX2NlbGwgZWMtY2FydC1zdW1tYXJ5X19wcmljZSB1aS1wYXRjaGVkXCI+PC90ZD5gKTtcbiAgICAgICAgICAgICAgICAgICAgdGQudWlOdW1iZXIoZm9ybWF0dGVkVGV4dCwgYHVpLXN1bW1hcnktcHJpY2UgdWktc3VtbWFyeS1wcmljZS0ke2Nsc31gLCBcIm51bWJlclwiLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgIXVpUGF0Y2gubGVuZ3RoICYmIGVsZW0udG9nZ2xlQ2xhc3MoXCJlYy1jYXJ0LXN1bW1hcnlfX3ByaWNlLWhpZGRlblwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgLypsaXN0ZW5Gb3JTdW1tYXJ5UHJpY2Uub2JzZXJ2ZShcbiAgICAgIGVsZW1TdW1tYXJ5UHJpY2UsXG4gICAgICBzcGFuLmxlbmd0aFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBmYWxzZSxcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgfVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgYXR0cmlidXRlczogZmFsc2UsXG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcbiAgICAgICAgICB9XG4gICAgKTsqL1xuICAgICAgICAgICAgICAgICAgICAhdWlQYXRjaC5sZW5ndGggJiYgdHIuYXBwZW5kKHRkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJChcIi5lYy1jYXJ0LXN1bW1hcnlfX2NlbGwuZWMtY2FydC1zdW1tYXJ5X19wcmljZVwiKS5lYWNoKChpLCBlKSA9PiBpbmplY3RVSU51bWJlclN1bW1hcnlDYXJ0TnVtYmVyKGUsIGkpKTtcbiAgICAgICAgICAgICAgICAvL3VwZGF0ZSBwcm9kdWN0IG9wdGlvbnMgcHJpY2luZywgb25lIHByb2R1Y3QgYXQgYSB0aW1lIC8gYWxsIGl0cyBvcHRpb25zOlxuICAgICAgICAgICAgICAgIHVpUHJvZHVjdHMuZWFjaCgoaW5kZXgsIHVpUHJvZHVjdCkgPT4gaW5qZWN0UHJvZHVjdE9wdGlvblByaWNlcyhlY0NhcnRfX1Byb2R1Y3RzSW5uZXJbMF0sIGNhcnRQcm9kdWN0cywgbnVsbCwgY2FydCwgcHJpY2VJbmZvLCB1aVByb2R1Y3QsIGluZGV4LCBsYW5nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvdW50Q2hhbmdlZChlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gJChlLnRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgLCBzZWxlY3RMYWJlbCA9IHNlbGVjdC5wYXJlbnQoKS5maW5kKFwiLmZvcm0tY29udHJvbF9fc2VsZWN0LXRleHRcIilcbiAgICAgICAgICAgICAgICAgICAgLCBxdWFudGl0eSA9IHBhcnNlSW50KHNlbGVjdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgLCB0ZXh0ID0gc2VsZWN0TGFiZWwudGV4dCgpLnJlcGxhY2UoL1xcZCsvZywgcXVhbnRpdHkpO1xuICAgICAgICAgICAgICAgIHNlbGVjdExhYmVsLnRleHQodGV4dCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSAkKFwiLmVjLWNhcnQtaXRlbV9fY291bnQtLXNlbGVjdCBzZWxlY3RcIikuaW5kZXgoc2VsZWN0KTtcbiAgICAgICAgICAgICAgICAvL3RyaWdnZXIgdG8gcmVjb21wdXRlIHRoZSBjYXJ0IHN1bW1hcnlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHQgPT4gcmVjb21wdXRlQ2FydFN1bW1hcnkobnVsbCwgaW5kZXgsIHF1YW50aXR5KSwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q291bnRSZWdpc3RlckNoYW5nZUV2ZW50KHNlbGVjdEVsZW0pIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgc2VsZWN0RWxlbSA9ICQoc2VsZWN0RWxlbSkuZmluZChcIi5mb3JtLWNvbnRyb2xfX3NlbGVjdFwiKS5vbihcImNoYW5nZVwiLCBzZWxlY3RDb3VudENoYW5nZWQpWzBdO1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RFbGVtICYmICFzZWxlY3RFbGVtLmNvdW50Q2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RFbGVtLmNvdW50Q2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHNlbGVjdEVsZW0pLmlzKFwiLmVjLWNhcnQtaXRlbV9fY29udHJvbC1pbm5lclwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0RWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiBzZXRUaW1lb3V0KHQgPT4gcmVjb21wdXRlQ2FydFN1bW1hcnkoKSwgMzAwKSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc2VsZWN0Q291bnRDaGFuZ2VkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICAvL30pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZXRlY3RBbmRQcm9jZXNzT3JkZXJzRnJvbVBhZ2UocGFnZSkge1xuICAgICAgICBjb25zdCBlbWFpbCA9IGV4dHJhY3RFbWFpbEFkZHJlc3MoJChcIi5lYy1jb25maXJtYXRpb25fX2VtYWlsXCIpLnRleHQoKSB8fCAkKFwiLmVjLWNhcnQtc3RlcC0tZW1haWwgLmVjLWNhcnQtc3RlcF9fdGV4dFwiKS50ZXh0KCkpO1xuICAgICAgICBjb25zdCBtYXBwZWRPcmRlckVsZW1lbnRzID0ge307XG4gICAgICAgIGNvbnN0IG9yZGVycyA9IFtwYWdlLnZlbmRvck9yZGVyTnVtYmVyLCAuLi4kKFwiLmVjLWNvbmZpcm1hdGlvbl9fbnVtYmVyXCIpLm1hcCgoaSwgZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSAkKGUpLnRleHQoKS5tYXRjaCgvIyhAREFURXgyLSguKikpL2kpO1xuICAgICAgICAgICAgY29uc3Qgb3JkZXJJZCA9IG1hdGNoPy5bMl07XG4gICAgICAgICAgICBpZiAob3JkZXJJZCkge1xuICAgICAgICAgICAgICAgIG1hcHBlZE9yZGVyRWxlbWVudHNbbWF0Y2hbMV1dID0gJChlKS5wYXJlbnRzKFwiLmVjLWNhcnRfX29yZGVyXCIpWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9yZGVySWQ7XG4gICAgICAgIH1cbiAgICAgICAgKSxdLmZpbHRlcihuID0+IG4pLmZpbHRlcigodmFsdWUsIGluZGV4LCBhcnJheSkgPT4gYXJyYXkuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcbiAgICAgICAgLy91bmlxdWUgb3JkZXJzIG9ubHlcbiAgICAgICAgZmV0Y2hFY3dpZE9yZGVyVmlhUHJveHkoXCJHRVRcIiwgbnVsbCwgb3JkZXJzLmpvaW4oXCIsXCIpLCBlbWFpbCkudGhlbihvcmRlcnMgPT4ge1xuICAgICAgICAgICAgaWYgKCFvcmRlcnM/Lml0ZW1zPy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgb3JkZXJzLml0ZW1zLmZvckVhY2gobyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBvLml0ZW1zO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yZGVyTnVtYmVyID0gby5pZDtcbiAgICAgICAgICAgICAgICBpZiAocGFnZVR5cGUgIT0gXCJBQ0NPVU5UXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuKGl0ZW1zLCBvLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViVG90YWwgPSBvLnN1YnRvdGFsXG4gICAgICAgICAgICAgICAgICAgICwgc3ViVG90YWxXaXRob3V0VGF4ID0gby5zdWJUb3RhbFdpdGhvdXRUYXhcbiAgICAgICAgICAgICAgICAgICAgLCB0b3RhbCA9IG8udG90YWxcbiAgICAgICAgICAgICAgICAgICAgLCB0YXggPSBvLnRheFxuICAgICAgICAgICAgICAgICAgICAsIHRvdGFsV2l0aG91dFRheCA9IG8udG90YWxXaXRob3V0VGF4XG4gICAgICAgICAgICAgICAgICAgICwgdGF4UGVyY2VudCA9ICh0YXggKiAxMDApIC8gdG90YWxcbiAgICAgICAgICAgICAgICAgICAgLCBjdXN0b21lclRheEV4dGVtcHQgPSBvLmN1c3RvbWVyVGF4RXh0ZW1wdFxuICAgICAgICAgICAgICAgICAgICAsIHNoaXBwaW5nID0gby5zaGlwcGluZ09wdGlvbi5zaGlwcGluZ1JhdGVXaXRob3V0VGF4XG4gICAgICAgICAgICAgICAgICAgICwgZGlzY291bnQgPSBvLmRpc2NvdW50XG4gICAgICAgICAgICAgICAgICAgICwgY291cG9uRGlzY291bnQgPSBvLmNvdXBvbkRpc2NvdW50XG4gICAgICAgICAgICAgICAgICAgICwgcGF5bWVudFRheCA9IDBcbiAgICAgICAgICAgICAgICAgICAgLCBmb3JtYXRDdXJyZW5jeSA9IEVjd2lkLmZvcm1hdEN1cnJlbmN5O1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGluamVjdFFSQ29kZShlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICQoZWxlbSkuZmluZChcIi5wYXltZW50LXByb3ZpZGVyLXRvdGFsIGlcIikudGV4dChmb3JtYXRDdXJyZW5jeSh0b3RhbCkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkZWxlbSA9ICQoZWxlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICwgY29tcGFueSA9ICRlbGVtLmhhc0NsYXNzKFwiUVItRHgyXCIpID8gXCJEeDJcIiA6ICRlbGVtLmhhc0NsYXNzKFwiUVItRHhNXCIpID8gXCJEeE1cIiA6IFwiMldEXCI7XG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlUmV2b2x1dFFSQ29kZShlbGVtLCBjb21wYW55LCB0b3RhbCwgb3JkZXJOdW1iZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtYXBwZWRPcmRlckVsZW1lbnRzW29yZGVyTnVtYmVyXS5hcnJpdmUoXCIuUVJcIiwgbm90T25jZU9ubHlTZWxmVW5iaW5kLCBpbmplY3RRUkNvZGUpO1xuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZml4V2hhdHNhcFBob25lTnVtYmVyKGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJGVsZW0gPSAkKCQoZWxlbSkuZmluZChcIi5lYy1jb25maXJtYXRpb25fX2JvZHkgLmVjLWNvbmZpcm1hdGlvbl9fc2VjdGlvbiArIC5lYy1jb25maXJtYXRpb25fX3NlY3Rpb25cIilbMF0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoISRlbGVtLmhhc0NsYXNzKFwid2hhdHNhcHBcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtLnRvZ2dsZUNsYXNzKFwid2hhdHNhcHBcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZWxlbS5odG1sKCRlbGVtLmh0bWwoKS5yZXBsYWNlKC8oXFwrNDA3NDUyMzgwMDUpL2dpLCBcIjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL3dhLm1lLyQxJz4kMTwvYT5cIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGQuYXJyaXZlKFwiLmVjLWNvbmZpcm1hdGlvbl9fc3RlcC0tY29udGFjdGluZm9cIiwgb25jZU9ubHlTZWxmVW5iaW5kLCBmaXhXaGF0c2FwUGhvbmVOdW1iZXIpO1xuXG4gICAgICAgICAgICAgICAgJChcIi5lYy1jb25maXJtYXRpb25cIikuYXBwZW5kKGA8dGFibGUgY2xhc3M9XCJjdCBlYy1jYXJ0X19zdW1tYXJ5IGVjLWNhcnQtc3VtbWFyeSBlYy1jYXJ0LXN1bW1hcnktLWdyb3VwLXZpZXdcIj48dGJvZHkgY2xhc3M9XCJlYy1jYXJ0LXN1bW1hcnlfX2JvZHlcIj5cbjx0ciBjbGFzcz1cImVjLWNhcnQtc3VtbWFyeV9fcm93IGVjLWNhcnQtc3VtbWFyeV9fcm93LS1pdGVtc1wiPjx0ZCBjbGFzcz1cImVjLWNhcnQtc3VtbWFyeV9fY2VsbCBlYy1jYXJ0LXN1bW1hcnlfX3RpdGxlIGN0LXN1YnRvdGFsXCIgdGl0bGU9XCJTdWJ0b3RhbCAke2Zvcm1hdEN1cnJlbmN5KHN1YlRvdGFsKX1cIj48L3RkPjx0ZCBjbGFzcz1cImVjLWNhcnQtc3VtbWFyeV9fY2VsbCBlYy1jYXJ0LXN1bW1hcnlfX3ByaWNlXCI+PHNwYW4+JHtmb3JtYXRDdXJyZW5jeShzdWJUb3RhbCl9PC9zcGFuPjwvdGQ+PC90cj5cbjx0ciBjbGFzcz1cImVjLWNhcnQtc3VtbWFyeV9fcm93IGVjLWNhcnQtc3VtbWFyeV9fcm93LS1zaGlwcGluZ1wiPjx0ZCBjbGFzcz1cImVjLWNhcnQtc3VtbWFyeV9fY2VsbCBlYy1jYXJ0LXN1bW1hcnlfX3RpdGxlXCI+PHNwYW4gY2xhc3M9XCJlYy1jYXJ0LXN1bW1hcnlfX3RleHQgY3Qtc2hpcHBpbmdcIiB0aXRsZT1cIlNoaXBwaW5nIGNvc3RzICR7Zm9ybWF0Q3VycmVuY3koc2hpcHBpbmcpfVwiPjwvc3Bhbj48L3RkPjx0ZCBjbGFzcz1cImVjLWNhcnQtc3VtbWFyeV9fY2VsbCBlYy1jYXJ0LXN1bW1hcnlfX3ByaWNlXCI+JHtmb3JtYXRDdXJyZW5jeShzaGlwcGluZyl9PC90ZD48L3RyPlxuPHRyIGNsYXNzPVwiZWMtY2FydC1zdW1tYXJ5X19yb3cgZWMtY2FydC1zdW1tYXJ5X19yb3ctLXN1cmNoYXJnZVwiIHN0eWxlPVwiZGlzcGxheToke3BheW1lbnRUYXggPyBcImJsb2NrXCIgOiBcIm5vbmVcIn0gIWltcG9ydGFudFwiPjx0ZCBjbGFzcz1cImVjLWNhcnQtc3VtbWFyeV9fY2VsbCBlYy1jYXJ0LXN1bW1hcnlfX3RpdGxlIGN0LXBheW1lbnQtZmVlXCIgdGl0bGU9XCJQYXltZW50IGZlZXMgJHtmb3JtYXRDdXJyZW5jeShwYXltZW50VGF4KX1cIj48L3RkPjx0ZCBjbGFzcz1cImVjLWNhcnQtc3VtbWFyeV9fY2VsbCBlYy1jYXJ0LXN1bW1hcnlfX3ByaWNlXCI+PHNwYW4+JHtmb3JtYXRDdXJyZW5jeShwYXltZW50VGF4KX08L3NwYW4+PC90ZD48L3RyPjwvdGJvZHk+PHRib2R5IGNsYXNzPVwiZWMtY2FydC1zdW1tYXJ5X19ib2R5XCI+XG48dHIgY2xhc3M9XCJlYy1jYXJ0LXN1bW1hcnlfX3JvdyBlYy1jYXJ0LXN1bW1hcnlfX3Jvdy0taXRlbXMgZWMtY2FydC1zdW1tYXJ5X19ib2R5XCI+PHRkIGNsYXNzPVwiZWMtY2FydC1zdW1tYXJ5X19jZWxsIGVjLWNhcnQtc3VtbWFyeV9fdGl0bGUgY3QtdG90YWwtd3RheFwiIHRpdGxlPVwiVG90YWwsIHdpdGhvdXQgZmVlcyAke2Zvcm1hdEN1cnJlbmN5KHRvdGFsV2l0aG91dFRheCl9XCI+PC90ZD48dGQgY2xhc3M9XCJlYy1jYXJ0LXN1bW1hcnlfX2NlbGwgZWMtY2FydC1zdW1tYXJ5X19wcmljZVwiPjxzcGFuPiR7Zm9ybWF0Q3VycmVuY3kodG90YWxXaXRob3V0VGF4KX08L3NwYW4+PC90ZD48L3RyPlxuPHRyIGNsYXNzPVwiZWMtY2FydC1zdW1tYXJ5X19yb3cgZWMtY2FydC1zdW1tYXJ5X19yb3ctLXRheGVzXCI+PHRkIGNsYXNzPVwiZWMtY2FydC1zdW1tYXJ5X19jZWxsIGVjLWNhcnQtc3VtbWFyeV9fdGl0bGUgY3QtdmF0LXRheFwiIHRpdGxlPVwiVkFUL1RBWCAke3RheFBlcmNlbnQudG9GaXhlZCgwKX0lXCI+ICR7dGF4UGVyY2VudC50b0ZpeGVkKDApfSUgJHtmb3JtYXRDdXJyZW5jeSh0YXgpfTwvdGQ+PHRkIGNsYXNzPVwiZWMtY2FydC1zdW1tYXJ5X19jZWxsIGVjLWNhcnQtc3VtbWFyeV9fcHJpY2VcIj48c3Bhbj4ke2Zvcm1hdEN1cnJlbmN5KHRheCl9PC9zcGFuPjwvdGQ+PC90cj48L3Rib2R5Pjx0Ym9keSBjbGFzcz1cImVjLWNhcnQtc3VtbWFyeV9fYm9keVwiPjwvdGJvZHk+PHRib2R5IGNsYXNzPVwiZWMtY2FydC1zdW1tYXJ5X19ib2R5XCI+XG48dHIgY2xhc3M9XCJlYy1jYXJ0LXN1bW1hcnlfX3JvdyBlYy1jYXJ0LXN1bW1hcnlfX3Jvdy0tdG90YWxcIj48dGQgY2xhc3M9XCJlYy1jYXJ0LXN1bW1hcnlfX2NlbGwgZWMtY2FydC1zdW1tYXJ5X190aXRsZSBjdC10b3RhbFwiIHRpdGxlPVwiVG90YWwgJHtmb3JtYXRDdXJyZW5jeSh0b3RhbCl9XCI+PC90ZD48dGQgY2xhc3M9XCJlYy1jYXJ0LXN1bW1hcnlfX2NlbGwgZWMtY2FydC1zdW1tYXJ5X19wcmljZVwiPjxzcGFuIGNsYXNzPVwiZWMtY2FydC1zdW1tYXJ5X190b3RhbFwiPiR7Zm9ybWF0Q3VycmVuY3kodG90YWwpfTxzcGFuIGNsYXNzPVwiZWMtY3VycmVuY3ktY29udmVydGVyLWVsZW1lbnQgZWMtY3VycmVuY3ktY29udmVydGVyLWFsdC12YWx1ZVwiPiAoJHtmb3JtYXRDdXJyZW5jeSh0b3RhbCl9KTwvc3Bhbj48ZGl2IGNsYXNzPVwiZWMtcHJlbG9hZGVyIGVjLXByZWxvYWRlci0tZGF0YSBlYy1wcmVsb2FkZXItLXNtYWxsXCI+PGRpdiBjbGFzcz1cImVjLXByZWxvYWRlcl9faXRlbVwiPjxkaXYgY2xhc3M9XCJlYy1wcmVsb2FkZXJfX2lubmVyXCI+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImVjLXByZWxvYWRlcl9faXRlbVwiPjxkaXYgY2xhc3M9XCJlYy1wcmVsb2FkZXJfX2lubmVyXCI+PC9kaXY+PC9kaXY+PC9kaXY+PC9zcGFuPjwvdGQ+PC90cj5cbjx0ciBjbGFzcz1cImVjLWNhcnQtc3VtbWFyeV9fcm93XCI+PHRkIGNsYXNzPVwiZWMtY2FydC1zdW1tYXJ5X19jZWxsIGVjLWNhcnQtc3VtbWFyeV9fbm90ZVwiIGNvbHNwYW49XCIyXCI+PHNwYW4gZGF0YS10YXgtdmFsdWU9XCIke3RheH1cIiB0aXRsZT1cIkluY2wuIFZBVCAke3RheFBlcmNlbnQudG9GaXhlZCgwKX0gJHtmb3JtYXRDdXJyZW5jeSh0YXgpfVwiIGNsYXNzPVwiY3QtaW5jbC12YXQtdGF4XCI+ICR7dGF4UGVyY2VudC50b0ZpeGVkKDApfSAke2Zvcm1hdEN1cnJlbmN5KHRheCl9PC9zcGFuPjwvdGQ+PC90cj48L3Rib2R5PjwvdGFibGU+YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQWxsUHJvZHVjdE9wdGlvbnNQcmljaW5nQW5kVG90YWxTdW1tYXJ5KHBhZ2UsIGNhcnQpIHtcbiAgICAgICAgdmFyIGVsZW1zID0gJChcIi5lYy1jYXJ0X19wcm9kdWN0cy1pbm5lclwiKTtcbiAgICAgICAgcGFnZSA9IHBhZ2UgfHwgY3VycmVudFBhZ2U7XG5cbiAgICAgICAgaWYgKGlzT3JkZXJDb25maXJtYXRpb25QYWdlKHBhZ2UpKSB7XG4gICAgICAgICAgICBwcm9jZXNzT3JkZXJDb25maXJtYXRpb25MaW5lcyhwYWdlLCBlbGVtcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9jZXNzQ2FydFBhZ2VzT3JkZXJMaW5lcyhwYWdlLCBlbGVtcywgY2FydCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc3luY0NsYXNzZXMoZWxlbSwgcGFyZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtLnRvZ2dsZUNsYXNzKFwiZWMtY2FydC1zdGVwLS1kb25lXCIsIHBhcmVudC5pcyhcIi5lYy1jYXJ0LXN0ZXAtLWRvbmVcIikpLnRvZ2dsZUNsYXNzKFwiZWMtY2FydC1zdGVwLS1jdXJyZW50XCIsIHBhcmVudC5pcyhcIi5lYy1jYXJ0LXN0ZXAtLWN1cnJlbnRcIikpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjbG9uZUFuY2hvclN0ZXAoZWxlbSkge1xuICAgICAgICAvL2R1cmluZyB0aGUgY2FydCBjaGVja291dCBwcm9jZXNzLFxuICAgICAgICAvL2FwcGVuZCBhbGwgdGhlIGFuY2hvcnMgaW4gdGhlIHNhbWUgKGVtYWlsJ3MpIGJhciBzbyB3ZSBjYW4gbWFrZSB0aGUgYmFyIHN0aWNreVxuICAgICAgICBlbGVtID0gJChlbGVtKTtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gZWxlbS5wYXJlbnQoKVxuICAgICAgICAgICAgLCBpc0FwcGVuZGVkID0gcGFyZW50LmlzKFwiLmVjLWNhcnQtc3RlcC0tZW1haWxcIikgfHwgJChcIiNlYy1jYXJ0LXN0ZXAtLWVtYWlsXCIpLnBhcmVudCgpLmZpbmQoXCIjXCIgKyBlbGVtLmF0dHIoXCJpZFwiKSkubGVuZ3RoO1xuICAgICAgICBpc0VtYWlsID0gZWxlbS5pcyhcIiNlYy1jYXJ0LXN0ZXAtLWVtYWlsXCIpO1xuICAgICAgICBpZiAoIWlzQXBwZW5kZWQpIHtcbiAgICAgICAgICAgICQoXCIjZWMtY2FydC1zdGVwLS1lbWFpbFwiKS5wYXJlbnQoKS5hcHBlbmQoKGVsZW0gPSAkKGVsZW0uY2xvbmUoKSkpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGl0bGUgPSBcIlwiO1xuICAgICAgICBzd2l0Y2ggKGVsZW0uYXR0cihcImlkXCIpKSB7XG4gICAgICAgICAgICBjYXNlIFwiZWMtY2FydC1zdGVwLS1lbWFpbFwiOlxuICAgICAgICAgICAgICAgIHRpdGxlID0gdHJhbnNsYXRlKFwiQ2FydFwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJlYy1jYXJ0LXN0ZXAtLWFkZHJlc3NcIjpcbiAgICAgICAgICAgICAgICB0aXRsZSA9IHRyYW5zbGF0ZShcIlNoaXBwaW5nICYgRGVsaXZlcnlcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZWMtY2FydC1zdGVwLS1kZWxpdmVyeVwiOlxuICAgICAgICAgICAgICAgIHRpdGxlID0gdHJhbnNsYXRlKFwiU2hpcHBpbmcgbWV0aG9kXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImVjLWNhcnQtc3RlcC0tdGF4LWluZm9ybWF0aW9uXCI6XG4gICAgICAgICAgICAgICAgdGl0bGUgPSB0cmFuc2xhdGUoXCJUYXggaW5mb3JtYXRpb25cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZWMtY2FydC1zdGVwLS1wYXltZW50XCI6XG4gICAgICAgICAgICAgICAgdGl0bGUgPSB0cmFuc2xhdGUoXCJQYXltZW50XCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGVsZW0uYXR0cihcInRpdGxlXCIsIHRpdGxlKTtcbiAgICAgICAgaWYgKCFpc0FwcGVuZGVkIHx8IGlzRW1haWwpIHtcbiAgICAgICAgICAgIHBhcmVudC5jbGFzc0NoYW5nZShwYXJlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHBhcmVudCA9ICQocGFyZW50KTtcbiAgICAgICAgICAgICAgICBzeW5jQ2xhc3NlcyhlbGVtLCBwYXJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHN5bmNDbGFzc2VzKGVsZW0sIHBhcmVudCkudG9nZ2xlQ2xhc3MoZWxlbS5hdHRyKFwiaWRcIiksIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRldGVjdFN1bW1hcnlUb3RhbE9uQ2hlY2tvdXRQYWdlcyhwYWdlLCBjYXJ0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGxpc3RlblRvVG90YWxTdW1tYXJ5QXJyaXZlKGVsZW0pIHtcbiAgICAgICAgICAgIGlmIChsYXN0Q2FydFRvdGFsTXV0YXRpb25PYnNlcnZlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGFzdENhcnRUb3RhbE11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIGxhc3RDYXJ0VG90YWxNdXRhdGlvbk9ic2VydmVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgRWN3aWQuQ2FydC5nZXQoY2FydCA9PiB1cGRhdGVBbGxQcm9kdWN0T3B0aW9uc1ByaWNpbmdBbmRUb3RhbFN1bW1hcnkocGFnZSwgY2FydCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtLCB7XG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxhc3RDYXJ0VG90YWxNdXRhdGlvbk9ic2VydmVyID0gb2JzZXJ2ZXI7XG4gICAgICAgICAgICB1cGRhdGVBbGxQcm9kdWN0T3B0aW9uc1ByaWNpbmdBbmRUb3RhbFN1bW1hcnkocGFnZSwgY2FydCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJvY2Vzc0FsbENhcnRMaW5lc09uRWNDYXJ0X19Qcm9kdWN0c0lubmVyKGVsZW0sIG8sIGNhcnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSAkKGVsZW0pLnBhcmVudHMoXCIuZWMtY2FydF9fcHJvZHVjdHNcIilcbiAgICAgICAgICAgICAgICAsIHRpdGxlcyA9IHAucGFyZW50KCkuZmluZChgLnBhZ2UtdGl0bGVfX25hbWVgKTtcbiAgICAgICAgICAgIHAuYXR0cihcImRhdGEtdGl0bGVcIiwgJCh0aXRsZXNbcGFnZS50eXBlID09IFwiQ0FSVFwiIHx8IHRpdGxlcy5sZW5ndGggPT0gMSA/IDAgOiAxXSkudGV4dCgpKTtcbiAgICAgICAgICAgIHZhciBzdW1tYXJ5ID0gbztcbiAgICAgICAgICAgIG8gJiYgKHN1bW1hcnkgPSB7XG4gICAgICAgICAgICAgICAgdG90YWw6IG8udG90YWwsXG4gICAgICAgICAgICAgICAgc3VidG90YWw6IG8uc3VidG90YWwsXG4gICAgICAgICAgICAgICAgZGlzY291bnQ6IC1vLmRpc2NvdW50LFxuICAgICAgICAgICAgICAgIHNoaXBwaW5nOiBvLnNoaXBwaW5nIHx8IChvLnNoaXBwaW5nT3B0aW9uICYmIG8uc2hpcHBpbmdPcHRpb24uc2hpcHBpbmdSYXRlV2l0aG91dFRheCksXG4gICAgICAgICAgICAgICAgdGF4OiBvLnRheCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW5qZWN0UHJvZHVjdE9wdGlvblByaWNlcyhlbGVtLCBjYXJ0Lml0ZW1zLCBvLCBjYXJ0LCBzdW1tYXJ5KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IGNhcnQuaXRlbXNcbiAgICAgICAgICAgICwgcHJpY2VJbmZvID0ge1xuICAgICAgICAgICAgICAgIHRvdGFsOiBjYXJ0Py50b3RhbCB8fCAwLFxuICAgICAgICAgICAgICAgIHN1YnRvdGFsOiBjYXJ0Py5zdWJ0b3RhbCB8fCAwLFxuICAgICAgICAgICAgICAgIGRpc2NvdW50OiBjYXJ0Py5kaXNjb3VudCB8fCAwLFxuICAgICAgICAgICAgICAgIHNoaXBwaW5nOiBjYXJ0Py5zaGlwcGluZyB8fCAwLFxuICAgICAgICAgICAgICAgIHRheDogY2FydD8udGF4IHx8IDAsXG4gICAgICAgICAgICB9O1xuICAgICAgICBkLnVuYmluZEFycml2ZShsaXN0ZW5Ub1RvdGFsU3VtbWFyeUFycml2ZSk7XG4gICAgICAgIGQuYXJyaXZlKFwiLmVjLWNhcnQtc3VtbWFyeV9fdG90YWxcIiwgbm90T25jZU9ubHlTZWxmVW5iaW5kLCBsaXN0ZW5Ub1RvdGFsU3VtbWFyeUFycml2ZSk7XG4gICAgICAgIGQuYXJyaXZlKFwiLmVjLWNhcnQtaXRlbV9fcGljdHVyZSwgLmVjLWNhcnQtaXRlbV9fdGl0bGVcIiwgbm90T25jZU9ubHlTZWxmVW5iaW5kLCBlbGVtID0+IHByZXZlbnREZWZhdWx0Q2xpY2tBbmRPcGVuUHJvZHVjdFdpdGhPcHRpb25zKGVsZW0sIGl0ZW1zKSk7XG4gICAgICAgIGQuYXJyaXZlKFwiLmVjLWNhcnQtc3RlcF9fYW5jaG9yXCIsIG5vdE9uY2VPbmx5U2VsZlVuYmluZCwgY2xvbmVBbmNob3JTdGVwKTtcbiAgICAgICAgLy9kLmFycml2ZShcIi5lYy1jYXJ0X19wcm9kdWN0cy1pbm5lclwiLCBub3RPbmNlT25seVNlbGZVbmJpbmQsIGVsZW0gPT4gcHJvY2Vzc0FsbENhcnRMaW5lc09uRWNDYXJ0X19Qcm9kdWN0c0lubmVyKGVsZW0sIHByaWNlSW5mbywgY2FydCkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbmplY3RDYXJ0Q2xpY2tPbkl0ZW1GaXhQcm9kdWN0T3B0aW9ucyhwYWdlKSB7XG4gICAgICAgIGQudW5iaW5kQXJyaXZlKG9uSW5qZWN0Q2FydEltYWdlUmVzaXplKTtcbiAgICAgICAgaWYgKGlzQ2FydFN1bW1hcnlQYWdlKHBhZ2UpKSB7XG4gICAgICAgICAgICBkLmFycml2ZShcIi5lYy1jYXJ0LWl0ZW1fX2ltYWdlXCIsIG5vdE9uY2VPbmx5U2VsZlVuYmluZCwgb25JbmplY3RDYXJ0SW1hZ2VSZXNpemUpO1xuICAgICAgICAgICAgZC5hcnJpdmUoXCIuZWMtY2FydF9fc3VtbWFyeSwgLmVjLWNhcnQuZWMtY2FydC0tZW1wdHlcIiwgb25jZU9ubHlTZWxmVW5iaW5kLCBzaG93QWN0aW9uQmFyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdENhcnRUb3RhbE11dGF0aW9uT2JzZXJ2ZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgbGFzdENhcnRUb3RhbE11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgbGFzdENhcnRUb3RhbE11dGF0aW9uT2JzZXJ2ZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGQudW5iaW5kQXJyaXZlKGV4cGFuZFByb2R1Y3RPcHRpb25zKTtcbiAgICAgICAgZC51bmJpbmRBcnJpdmUocHJldmVudERlZmF1bHRDbGlja0FuZE9wZW5Qcm9kdWN0V2l0aE9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChpc0NhcnRTdW1tYXJ5UGFnZShwYWdlKSkge1xuICAgICAgICAgICAgaWYgKGlzT3JkZXJDb25maXJtYXRpb25QYWdlKHBhZ2UpKSB7XG4gICAgICAgICAgICAgICAgZGV0ZWN0QW5kUHJvY2Vzc09yZGVyc0Zyb21QYWdlKHBhZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBFY3dpZC5DYXJ0LmdldChjYXJ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbG9nRHVyYXRpb24oXCJzdW1tYXJ5XCIsIFwiUHJlLWZldGNoaW5nIGNhcnQgcHJvZHVjdHNcIikoKTtcbiAgICAgICAgICAgICAgICAgICAgLy9wcmUtZmV0Y2ggcHJvZHVjdHMgdmlhIEFQSSBzbyB3ZSBoYXZlIHRoZW0gbGF0ZXIgb24gd2hlbiB0aGUgc3VtbWFyeS9jYXJ0IERPTSBlbGVtZW50cyBhcnJpdmVcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hDYXJ0UHJvZHVjdHMoY2FydCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRldGVjdFN1bW1hcnlUb3RhbE9uQ2hlY2tvdXRQYWdlcyhwYWdlLCBjYXJ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBhcHByb3ZlRWN3aWRPcmRlclBheW1lbnQob3JkZXIsIGNhcnQsIGN1c3RvbWVyLCBwbywgcGF5cGFsQXBwcm92ZW1lbnREYXRhLCBwYXlwYWxBY3Rpb25zLCBwYXlQYWxPcmRlcklkKSB7XG4gICAgICAgIHJldHVybiBmZXRjaEVjd2lkT3JkZXJWaWFQcm94eShcIlBPU1RcIiwge1xuICAgICAgICAgICAgZXh0ZXJuYWxUcmFuc2FjdGlvbklkOiBwYXlwYWxBcHByb3ZlbWVudERhdGEucGF5ZXJJZCxcbiAgICAgICAgICAgIG9yZGVySWQ6IGNhcnQub3JkZXJJZCxcbiAgICAgICAgICAgIHN1YnRvdGFsOiBvcmRlci5zdWJ0b3RhbCxcbiAgICAgICAgICAgIHRvdGFsOiBvcmRlci50b3RhbCxcbiAgICAgICAgICAgIGVtYWlsOiBjdXN0b21lci5lbWFpbCxcbiAgICAgICAgICAgIHBheW1lbnRNZXRob2Q6IFwiUGF5UGFsMlwiLFxuICAgICAgICAgICAgdGF4OiBvcmRlci50YXgsXG4gICAgICAgICAgICB0YXhFeGVtcHQ6IGN1c3RvbWVyLnRheEV4ZW1wdCxcbiAgICAgICAgICAgIGN1c3RvbWVyVGF4SWQ6IGN1c3RvbWVyLnRheElkLFxuICAgICAgICAgICAgY3VzdG9tZXJUYXhJZFZhbGlkOiBjdXN0b21lci50YXhJZFZhbGlkLFxuICAgICAgICAgICAgcmV2ZXJzZWRUYXhBcHBsaWVkOiBmYWxzZSxcbiAgICAgICAgICAgIC8vaXBBZGRyZXNzOiAnMTI3LjAuMC4xJyxcbiAgICAgICAgICAgIC8vY291cG9uRGlzY291bnQ6IG9yZGVyLmNvdXBvbkRpc2NvdW50LFxuICAgICAgICAgICAgcGF5bWVudFN0YXR1czogXCJBV0FJVElOR19QQVlNRU5UXCIsXG4gICAgICAgICAgICBmdWxmaWxsbWVudFN0YXR1czogXCJBV0FJVElOR19QUk9DRVNTSU5HXCIsXG4gICAgICAgICAgICByZWZlcmVyVXJsOiBsb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgb3JkZXJDb21tZW50czogb3JkZXIuY29tbWVudHMsXG4gICAgICAgICAgICB2b2x1bWVEaXNjb3VudDogb3JkZXIudm9sdW1lRGlzY291bnQsXG4gICAgICAgICAgICBjdXN0b21lcklkOiBjdXN0b21lci5pZCxcbiAgICAgICAgICAgIGhpZGRlbjogZmFsc2UsXG4gICAgICAgICAgICBtZW1iZXJzaGlwQmFzZWREaXNjb3VudDogb3JkZXIuY3VzdG9tZXJHcm91cFZvbHVtZURpc2NvdW50LFxuICAgICAgICAgICAgLy90b3RhbEFuZE1lbWJlcnNoaXBCYXNlZERpc2NvdW50OiAvL1RoZSBzdW0gb2YgZGlzY291bnQgYmFzZWQgb24gc3VidG90YWwgQU5EIGN1c3RvbWVyIGdyb3VwLiBJcyBpbmNsdWRlZCBpbnRvIHRoZSBkaXNjb3VudCBmaWVsZFxuICAgICAgICAgICAgZGlzY291bnQ6IG9yZGVyLmRpc2NvdW50LFxuICAgICAgICAgICAgZ2xvYmFsUmVmZXJlcjogbG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgIGV4dGVybmFsT3JkZXJJZDogcGF5UGFsT3JkZXJJZCxcbiAgICAgICAgICAgIC8vY3JlYXRlRGF0ZTpUaGUgZGF0ZS90aW1lIG9mIG9yZGVyIHBsYWNlbWVudCwgZS5nIDIwMTQtMDYtMDYgMTg6NTc6MTkgKzAwMDBcbiAgICAgICAgICAgIC8vZGlzY291bnRDb3Vwb246IG9yZGVyLmNvdXBvbkRpc2NvdW50LFxuICAgICAgICAgICAgaXRlbXM6IGNhcnQuaXRlbXMubWFwKGkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwID0gaS5wcm9kdWN0O1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHAubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHk6IGkucXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcC5pZCxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogMCxcbiAgICAgICAgICAgICAgICAgICAgcHJpY2U6IHAucHJpY2UsXG4gICAgICAgICAgICAgICAgICAgIHdlaWdodDogcC53ZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHNrdTogcC5za3UsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0RGVzY3JpcHRpb246IHAuc2hvcnREZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgdGF4OiBwLnRheCxcbiAgICAgICAgICAgICAgICAgICAgLy9jb21iaW5hdGlvbklkOiAvL1RoZSBJRCBvZiBhIGNob3NlbiBjb21iaW5hdGlvbi4gSWYgbm90IHNwZWNpZmllZCwgaXQgd2lsbCBiZSBjYWxjdWxhdGVkIGF1dG9tYXRpY2FsbHlcbiAgICAgICAgICAgICAgICAgICAgc2hpcHBpbmc6IHAuc2hpcHBpbmcsXG4gICAgICAgICAgICAgICAgICAgIGlzUHJlb3JkZXI6IHAuaXNQcmVvcmRlcixcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGJpbGxpbmdQZXJzb246IGNhcnQuYmlsbGluZ1BlcnNvbiB8fCBjYXJ0LnNoaXBwaW5nUGVyc29uLFxuICAgICAgICAgICAgc2hpcHBpbmdQZXJzb246IGNhcnQuc2hpcHBpbmdQZXJzb24sXG4gICAgICAgICAgICBzaGlwcGluZ09wdGlvbjogb3JkZXIuc2hpcHBpbmdPcHRpb24sXG4gICAgICAgICAgICBoYW5kbGluZ0ZlZToge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiSGFuZGxpbmcgZmVlXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IG9yZGVyLmhhbmRsaW5nRmVlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBjb3N0IHRvIGhhbmRsZSAmIHBhY2sgdGhpcyBpdGVtXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRkaXRpb25hbEluZm86IG51bGwsXG4gICAgICAgICAgICAvL01hcDxzdHJpbmcsc3RyaW5nPlx0QWRkaXRpb25hbCBvcmRlciBpbmZvcm1hdGlvbiBpZiBhbnkgKHJlc2VydmVkIGZvciBmdXR1cmUgdXNlKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGEub3JkZXJJZDtcbiAgICAgICAgfVxuICAgICAgICApLnRoZW4oRWN3aWRPcmRlcklkID0+IHtcbiAgICAgICAgICAgIHJldHVybiBwYXlQYWxPcmRlcklkO1xuICAgICAgICAgICAgLy93ZSBtdXN0IHJldHVybiB0aGUgUGF5UGFsIG9yZGVyIElkIGZvciB0aGUgcGF5bWVudCB0byB3b3JrIVxuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRlY29kZUJhc2U2NChmKSB7XG4gICAgICAgIHZhciBnID0ge30sIGIgPSA2NSwgZCA9IDAsIGEsIGMgPSAwLCBoLCBlID0gXCJcIiwgayA9IFN0cmluZy5mcm9tQ2hhckNvZGUsIGwgPSBmLmxlbmd0aDtcbiAgICAgICAgZm9yIChhID0gXCJcIjsgOTEgPiBiOylcbiAgICAgICAgICAgIGEgKz0gayhiKyspO1xuICAgICAgICBhICs9IGEudG9Mb3dlckNhc2UoKSArIFwiMDEyMzQ1Njc4OSsvXCI7XG4gICAgICAgIGZvciAoYiA9IDA7IDY0ID4gYjsgYisrKVxuICAgICAgICAgICAgZ1thLmNoYXJBdChiKV0gPSBiO1xuICAgICAgICBmb3IgKGEgPSAwOyBhIDwgbDsgYSsrKVxuICAgICAgICAgICAgZm9yIChiID0gZ1tmLmNoYXJBdChhKV0sXG4gICAgICAgICAgICAgICAgZCA9IChkIDw8IDYpICsgYixcbiAgICAgICAgICAgICAgICBjICs9IDY7IDggPD0gYzspXG4gICAgICAgICAgICAgICAgKChoID0gKGQgPj4+IChjIC09IDgpKSAmIDI1NSkgfHwgYSA8IGwgLSAyKSAmJiAoZSArPSBrKGgpKTtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfVxuXG4gICAgdmFyIGJvdW5kQXJyaXZlMzYwUFNXUCA9IGZhbHNlXG4gICAgICAgICwgbGlzdGVuaW5nVG9DbGljazM2MEl0ZW0gPSBmYWxzZVxuICAgICAgICAsIHRhcHBpbmdMZWZ0UmlnaHRPbkZ1bGxTY3JlZW4gPSBuZXcgRGF0ZSgpO1xuXG4gICAgZnVuY3Rpb24gZGV0ZWN0V2VBcmVPbjM2MEltYWdlKGVsZW0pIHtcbiAgICAgICAgdmFyIHZpZXdDaGFuZ2VkRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGZ1bmN0aW9uIHZpZXdDaGFuZ2VkKGFjdGl2ZUltYWdlU2VsZWN0b3IsIGNsaWNrKSB7XG4gICAgICAgICAgICBpZiAoIWNsaWNrICYmIG5ldyBEYXRlKCkgLSB2aWV3Q2hhbmdlZERhdGUgPCAzMDApXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygkKGFjdGl2ZUltYWdlU2VsZWN0b3IpLmlzT25TY3JlZW4oKSwgYWN0aXZlSW1hZ2VTZWxlY3RvciwgZWxlbSk7XG4gICAgICAgICAgICBpZiAoIWNsaWNrICYmIG5ldyBEYXRlKCkgLSB0YXBwaW5nTGVmdFJpZ2h0T25GdWxsU2NyZWVuIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQodmlld0NoYW5nZWQuYmluZCh0aGlzLCBhY3RpdmVJbWFnZVNlbGVjdG9yKSwgMzAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzaG93MzYwID0gJGQuaGFzQ2xhc3MoXCJqc3Ytc2hvdy0zNjBcIikgJiYgKHdpbmRvdy5qc3YgJiYgJGQuaGFzQ2xhc3MoXCJqc3YtZnVsbC1zY3JlZW5cIikgPyAkKGFjdGl2ZUltYWdlU2VsZWN0b3IpLmlzT25TY3JlZW4oKSA6ICQoXCIuZGV0YWlscy1nYWxsZXJ5X190aHVtYi0tYWN0aXZlLmRldGFpbHMtZ2FsbGVyeV9fdGh1bWJcIilbMF0gPT0gJChcIi5kZXRhaWxzLWdhbGxlcnlfX3RodW1iOmZpcnN0XCIpWzBdKTtcbiAgICAgICAgICAgIGlmIChzaG93MzYwKSB7XG4gICAgICAgICAgICAgICAgdmlld0NoYW5nZWREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoanN2ICYmICFqc3YuaXNTdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwaW5KU1YoMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2aWV3Q2hhbmdlZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIHN0b3BKU1YoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvZ2dsZVNob3czNjAoc2hvdzM2MCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlV2VBcmVPbjM2MEltYWdlKGFjdGl2ZUltYWdlU2VsZWN0b3IsIGVsZW0pIHtcbiAgICAgICAgICAgIGlmICghZWxlbS52aWV3QWxyZWFkeUJvdW5kKSB7XG4gICAgICAgICAgICAgICAgZWxlbS52aWV3QWxyZWFkeUJvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpc0luVmlldyhlbGVtLCBlbGVtID0+IHNldFRpbWVvdXQodCA9PiB2aWV3Q2hhbmdlZChlbGVtLCBhY3RpdmVJbWFnZVNlbGVjdG9yKSwgNTAwKSk7XG4gICAgICAgICAgICAgICAgaXNPdXRPZlZpZXcoZWxlbSwgZWxlbSA9PiBzZXRUaW1lb3V0KHQgPT4gdmlld0NoYW5nZWQoZWxlbSwgYWN0aXZlSW1hZ2VTZWxlY3RvciksIDUwMCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghbGlzdGVuaW5nVG9DbGljazM2MEl0ZW0gfHwgIWJvdW5kQXJyaXZlMzYwUFNXUCkge1xuICAgICAgICAgICAgbGV0IHNyYyA9ICQoXCIuZGV0YWlscy1nYWxsZXJ5X19waWN0dXJlOmZpcnN0XCIpLmF0dHIoXCJzcmNcIik7XG4gICAgICAgICAgICBsZXQgYWN0aXZlSW1hZ2VTZWxlY3RvciA9IGAucHN3cF9faW1nW3NyYyo9XCIke3NyYz8ucmVwbGFjZSgvXFwvKFxcZCspXFwuKC4qKSQvZywgKG1hdGNoLCBpZCwgZXh0KSA9PiBgLyR7cGFyc2VJbnQoaWQpIC0gMX0uJHtleHR9YCl9XCJdLCAucHN3cF9faW1nW3NyYyo9XCIke3NyYz8ucmVwbGFjZSgvXFwvKFxcZCspXFwuKC4qKSQvZywgKG1hdGNoLCBpZCwgZXh0KSA9PiBgLyR7cGFyc2VJbnQoaWQpIC0gMn0uJHtleHR9YCl9XCJdYDtcbiAgICAgICAgICAgIGlmICghbGlzdGVuaW5nVG9DbGljazM2MEl0ZW0pIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5pbmdUb0NsaWNrMzYwSXRlbSA9IHRydWU7XG4gICAgICAgICAgICAgICAgJGQub24oXCJjbGlja1wiLCBcIi5kZXRhaWxzLWdhbGxlcnlfX3RodW1iXCIsIGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHZpZXdDaGFuZ2VkLmJpbmQoZWxlbSwgYWN0aXZlSW1hZ2VTZWxlY3RvciwgdHJ1ZSksIDEwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgZWxlbSAmJiBzZXRUaW1lb3V0KHZpZXdDaGFuZ2VkLmJpbmQoZWxlbSwgYWN0aXZlSW1hZ2VTZWxlY3RvciksIDEwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWJvdW5kQXJyaXZlMzYwUFNXUCkge1xuICAgICAgICAgICAgICAgIGlmICghc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvdW5kQXJyaXZlMzYwUFNXUCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJvdW5kQXJyaXZlMzYwUFNXUCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZC5hcnJpdmUoYWN0aXZlSW1hZ2VTZWxlY3Rvciwge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZzogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sIHVwZGF0ZVdlQXJlT24zNjBJbWFnZS5iaW5kKHRoaXMsIGFjdGl2ZUltYWdlU2VsZWN0b3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdpbmRvdy5kZXRlY3RXZUFyZU9uMzYwSW1hZ2UgPSBkZXRlY3RXZUFyZU9uMzYwSW1hZ2U7XG4gICAgZnVuY3Rpb24gbG9hZDM2MChwYWdlLCBwMzYwLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAocGFnZS50eXBlID09IFwiUFJPRFVDVFwiKSB7XG4gICAgICAgICAgICBpZiAocDM2MCkge1xuICAgICAgICAgICAgICAgIGxvZ0R1cmF0aW9uKFwiMzYwXCIsIFwiMzYwIExvYWRpbmcgY3NzIGZpbGVzXCIpKCk7XG4gICAgICAgICAgICAgICAgaW5qZWN0RmFzdExvYWRpbmdDc3MocGFnZSk7XG4gICAgICAgICAgICAgICAgLy8udGhlbihjc3MgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwMzYwLmxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhwMzYwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXCJsb2FkaW5nXCIgaW4gcDM2MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgcDM2MC5sb2FkaW5nLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcDM2MC5sb2FkaW5nID0gY2FsbGJhY2sgPyBbY2FsbGJhY2tdIDogW107XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZG9uZU9wcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgrK2RvbmVPcHMgPj0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dEdXJhdGlvbihcIjM2MFwiLCBcIkxvYWRlZCAzNjAgZmlsZXNcIiwgcDM2MC5sb2FkaW5nKSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwMzYwLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAzNjAubG9hZGluZy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKHAzNjApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcDM2MC5sb2FkaW5nLnNwbGljZSgwLCBwMzYwLmxvYWRpbmcubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVuc3VyZUphdmFzY3JpcHRWaWV3ZXIoZG9uZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmplY3RQcmVsb2FkQ3NzKHAzNjAuY2xhc3NOYW1lLCBwMzYwLmNzcywgZG9uZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcDM2MDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGdyYWRlSGlnaFF1YWxpdHlJbWFnZXMocDM2MCwgcGFnZSkge1xuICAgICAgICBjb25zdCBwaWQgPSBwMzYwPy5pZCB8fCBwYWdlPy5wcm9kdWN0SWQgfHwgY3VycmVudFBhZ2U/LnByb2R1Y3RJZDtcbiAgICAgICAgY29uc3Qga3AgPSBrbm93blByb2R1Y3RTbHVnc1twaWRdO1xuICAgICAgICAvLyBpZiAoa3A/Lm1lZGlhPy5pbWFnZXMpIHtcbiAgICAgICAgLy8gICAgIHByb2Nlc3NQcm9kdWN0TWVkaWFJbWFnZXMoW251bGwsIGtwXSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZSBwaWQgJiYgcHJvbWlzZUNhcnRBbmRQaWQocGlkKS50aGVuKHByb2Nlc3NQcm9kdWN0TWVkaWFJbWFnZXMpO1xuICAgICAgICBmdW5jdGlvbiBwcm9jZXNzUHJvZHVjdE1lZGlhSW1hZ2VzKGNwKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gY3BbMV1cbiAgICAgICAgICAgICAgICAsIGltYWdlcyA9IHAubWVkaWEuaW1hZ2VzXG4gICAgICAgICAgICAgICAgLCBpbWFnZSA9IFwiaW1hZ2VPcmlnaW5hbFVybFwiXG4gICAgICAgICAgICAgICAgLCBwcmVsb2FkZXIgPSAkYi5maW5kT3JDcmVhdGUoXCIjaW1hZ2VzLXByZWxvYWRlclwiLCBlID0+IGA8ZGl2IGlkPVwiaW1hZ2VzLXByZWxvYWRlclwiIHN0eWxlPVwib3BhY2l0eTowLjAwMDE7d2lkdGg6MDtoZWlnaHQ6MDtvdmVyZmxvdzpoaWRkZW47XCIvPmApO1xuXG4gICAgICAgICAgICAgICAgLy9jb21tZW50ZWQ6IHN0b3AgcHJlLWZldGNoaW5nLCBzaW5jZSB0aGUgYnJvd3NlciB3b24ndCBkaXNwbGF5IHRoZSBuZXcgaW1hZ2UgdW50aWwgaXQgaXMgbG9hZGVkIGFueXdheXNcbiAgICAgICAgICAgIC8vIFByb21pc2UuYWxsKGltYWdlcy5zbGljZSgwLCAxKS5tYXAoaW1nID0+IG5ldyBQcm9taXNlKGxvYWRlZCA9PiBwcmVsb2FkZXIuYXBwZW5kKCQoXCI8aW1nLz5cIikuYXR0cihcInNyY1wiLCBpbWdbaW1hZ2VdKS5vbihcImxvYWRcIiwgZSA9PiBsb2FkZWQoZSkpLm9uKFwiZXJyb3JcIiwgZSA9PiBsb2FkZWQoZSkpKSkpKS50aGVuKGltZ3MgPT4ge1xuICAgICAgICAgICAgICAgICAkZC5hcnJpdmUoXCIuZGV0YWlscy1nYWxsZXJ5XCIsIG5vdE9uY2VPbmx5U2VsZlVuYmluZCwgZ2FsbGVyeUxvYWRlZCk7XG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2FsbGVyeUxvYWRlZChnYWxsZXJ5KSB7XG4gICAgICAgICAgICAgICAgZ2FsbGVyeS5hcnJpdmUoXCIuZGV0YWlscy1nYWxsZXJ5X19pbWFnZS1iZywgLmRldGFpbHMtZ2FsbGVyeV9fdGh1bWItYmcsIC5kZXRhaWxzLWdhbGxlcnlfX3RodW1iLWltZ1wiLCBub3RPbmNlT25seVNlbGZVbmJpbmQsIGRldGFpbHNHYWxsZXJ5X19pbWFnZUJnKTtcbiAgICAgICAgICAgICAgICBnYWxsZXJ5LmFycml2ZShcIi5kZXRhaWxzLWdhbGxlcnlfX2ltYWdlcy16b29tXCIsIG5vdE9uY2VPbmx5U2VsZlVuYmluZCwgZGV0YWlsc0dhbGxlcnlfX2ltYWdlc1pvb20pO1xuICAgICAgICAgICAgICAgIGdhbGxlcnkuYXJyaXZlKFwiLmRldGFpbHMtZ2FsbGVyeV9fcGljdHVyZVwiLCBub3RPbmNlT25seVNlbGZVbmJpbmQsIGRldGFpbHNHYWxsZXJ5X19waWN0dXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSGVscGVyIHRvIGdldCBpbWFnZSBpbmRleCBmcm9tIERPTSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEltYWdlSW5kZXgoZWxlbSkge1xuICAgICAgICAgICAgICAgIC8vIFRyeSB0byBmaW5kIHBob3Rvc3dpcGUtaW5kZXggZnJvbSBjbGFzc1xuICAgICAgICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSBlbGVtLmNsb3Nlc3QoJ1tjbGFzcyo9XCJwaG90b3N3aXBlLVwiXScpO1xuICAgICAgICAgICAgICAgIGlmICh3cmFwcGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IHdyYXBwZXIuYXR0cignY2xhc3MnKT8ubWF0Y2goL3Bob3Rvc3dpcGUtKD86dGh1bWItKT9pbmRleC0oXFxkKykvKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoKSByZXR1cm4gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gRmFsbGJhY2sgdG8gRE9NIHBvc2l0aW9uIGNhbGN1bGF0aW9uXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIGVsZW0ucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuY2hpbGRyZW4oKS5pbmRleChlbGVtLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpKSAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZGV0YWlsc0dhbGxlcnlfX2ltYWdlQmcoZWxlbSkge1xuICAgICAgICAgICAgICAgIGVsZW0gPSAkKGVsZW0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJnID0gZWxlbS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpXG4gICAgICAgICAgICAgICAgICAgICwgaW5kZXggPSBnZXRJbWFnZUluZGV4KGVsZW0pXG4gICAgICAgICAgICAgICAgICAgICwgaGlnaFJlc1VybCA9IGltYWdlc1tpbmRleF0/LltcImltYWdlT3JpZ2luYWxVcmxcIl07XG4gICAgICAgICAgICAgICAgaWYgKGhpZ2hSZXNVcmwgJiYgIWJnLmluY2x1ZGVzKGhpZ2hSZXNVcmwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFByZWxvYWQgaGlnaC1yZXMgaW1hZ2UsIHRoZW4gc3dhcFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmVsb2FkZXIgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgcHJlbG9hZGVyLm9ubG9hZCA9ICgpID0+IGVsZW0uY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiLCBiZy5yZXBsYWNlKC8oaHR0cHM6XFwvXFwvLio/XFwvODQ2MjU0NjdcXC8pKCg/OnByb2R1Y3RzXFwvXFxkK1xcLyk/KT8oXFxkKykoXFwuW1xcd10rKS9naSwgaGlnaFJlc1VybCkpO1xuICAgICAgICAgICAgICAgICAgICBwcmVsb2FkZXIuc3JjID0gaGlnaFJlc1VybDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBkZXRhaWxzR2FsbGVyeV9faW1hZ2VzWm9vbShlbGVtKSB7XG4gICAgICAgICAgICAgICAgZWxlbSA9ICQoZWxlbSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmcgPSBlbGVtLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIilcbiAgICAgICAgICAgICAgICAgICAgLCBpbmRleCA9IGdldEltYWdlSW5kZXgoZWxlbSlcbiAgICAgICAgICAgICAgICAgICAgLCBoaWdoUmVzVXJsID0gaW1hZ2VzW2luZGV4XT8uW1wiaW1hZ2VPcmlnaW5hbFVybFwiXTtcbiAgICAgICAgICAgICAgICBpZiAoaGlnaFJlc1VybCAmJiAhYmcuaW5jbHVkZXMoaGlnaFJlc1VybCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJlbG9hZGVyID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIHByZWxvYWRlci5vbmxvYWQgPSAoKSA9PiBlbGVtLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIiwgYmcucmVwbGFjZSgvKGh0dHBzOlxcL1xcLy4qP1xcLzg0NjI1NDY3XFwvKSgoPzpwcm9kdWN0c1xcL1xcZCtcXC8pPyk/KFxcZCspKFxcLlxcdyspL2dpLCBoaWdoUmVzVXJsKSk7XG4gICAgICAgICAgICAgICAgICAgIHByZWxvYWRlci5zcmMgPSBoaWdoUmVzVXJsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRldGFpbHNHYWxsZXJ5X19waWN0dXJlKGVsZW0pIHtcbiAgICAgICAgICAgICAgICBlbGVtID0gJChlbGVtKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzcmMgPSBlbGVtLmF0dHIoXCJzcmNcIilcbiAgICAgICAgICAgICAgICAgICAgLCBzcmNzZXQgPSBlbGVtLmF0dHIoXCJzcmNzZXRcIilcbiAgICAgICAgICAgICAgICAgICAgLCBiZyA9IGVsZW0uY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiKVxuICAgICAgICAgICAgICAgICAgICAsIGluZGV4ID0gZ2V0SW1hZ2VJbmRleChlbGVtKVxuICAgICAgICAgICAgICAgICAgICAsIGhpZ2hSZXNVcmwgPSBpbWFnZXNbaW5kZXhdPy5bXCJpbWFnZU9yaWdpbmFsVXJsXCJdO1xuICAgICAgICAgICAgICAgIGlmIChoaWdoUmVzVXJsICYmIHNyYyAmJiAhc3JjLmluY2x1ZGVzKGhpZ2hSZXNVcmwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZWxvYWRlciA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgICAgICBwcmVsb2FkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5hdHRyKFwic3JjXCIsIGhpZ2hSZXNVcmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNyY3NldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1NyY1NldCA9IHNyY3NldC5yZXBsYWNlKC8oaHR0cHM6XFwvXFwvLio/XFwvODQ2MjU0NjdcXC8pKCg/OnByb2R1Y3RzXFwvXFxkK1xcLyk/KT8oXFxkKykoXFwuLio/KSggKShbMC05XSspKHgpL2dpLCBmdW5jdGlvbiAobWF0Y2gsIGEsIHBhdGgsIGNhcHR1cmUsIGV4dCwgYiwgZHBpLCBjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoaWdoUmVzVXJsICsgYiArIGRwaSArIGM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5hdHRyKFwic3Jjc2V0XCIsIG5ld1NyY1NldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBbHNvIHVwZGF0ZSBiYWNrZ3JvdW5kLWltYWdlIGlmIHByZXNlbnQgKEVjd2lkIHVzZXMgdGhpcyBhcyBmYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiZyAmJiBiZyAhPT0gXCJub25lXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdCZyA9IGJnLnJlcGxhY2UoLyhodHRwczpcXC9cXC8uKj9cXC84NDYyNTQ2N1xcLykoKD86cHJvZHVjdHNcXC9cXGQrXFwvKT8pPyhcXGQrKShcXC5bXFx3XSspL2dpLCBoaWdoUmVzVXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIiwgbmV3QmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBwcmVsb2FkZXIuc3JjID0gaGlnaFJlc1VybDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGdyYWRlSGlnaFF1YWxpdHlJbWFnZXMoKTsgICBcbiAgICBmdW5jdGlvbiBpbmplY3QzNjAocDM2MCwgcGFnZSkge1xuICAgICAgICBpZiAocGFnZSAmJiBwYWdlLnR5cGUgIT0gXCJQUk9EVUNUXCIpIHtcbiAgICAgICAgICAgICRkLnJlbW92ZUNsYXNzKFwianN2LXNob3ctcGhvdG9zIGpzdi1zd2lwaW5nIGpzdi1zaG93LTM2MCBqc3YtaGFzLTM2MFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbmplY3RGYXN0TG9hZGluZ0NzcyhwYWdlKS50aGVuKG5vdyA9PiB7XG4gICAgICAgICAgICBpZiAocDM2MCkge1xuICAgICAgICAgICAgICAgIHRvZ2dsZVNob3czNjAoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAkZC50b2dnbGVDbGFzcyhcImpzdi1zd2lwaW5nXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICQoXCIucHN3cF9fc2t1LXRpdGxlXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBza3VUaXRsZSA9ICQoXCI8ZGl2Lz5cIikuYWRkQ2xhc3MoXCJwc3dwX19za3UtdGl0bGVcIikudGV4dCgkKFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1za3VcIikudGV4dCgpKTtcbiAgICAgICAgICAgICAgICAkKFwiLnBzd3BfX3ByZWxvYWRlclwiKS5hZnRlcihza3VUaXRsZSk7XG4gICAgICAgICAgICAgICAgbG9nRHVyYXRpb24oXCIzNjBcIiwgXCJQYWdlIGxvYWRlZDo6aW5qZWN0IDM2MFwiLCBwMzYwKSgpO1xuICAgICAgICAgICAgICAgIGxvYWQzNjAocGFnZSwgcDM2MCwgcDM2MCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlY3JlYXRlSlNWRWxlbWVudChlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0gPSAkKGVsZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZWxlbS5maW5kKFwiLmRldGFpbHMtZ2FsbGVyeV9faW1hZ2Utd3JhcHBlci1pbm5lcjpmaXJzdC1vZi10eXBlIC5kZXRhaWxzLWdhbGxlcnlfX3BpY3R1cmU6Zmlyc3Qtb2YtdHlwZVwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGVsZW0uZmluZChcIi5kZXRhaWxzLWdhbGxlcnlfX2ltYWdlcy1zcGFjZXJcIilbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdGh1bWIgPSAkKFwiLmRldGFpbHMtZ2FsbGVyeV9fcGhvdG9zd2lwZS10aHVtYi1pbmRleC0wXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGJnID0gdGh1bWIuZmluZChcIi5kZXRhaWxzLWdhbGxlcnlfX3RodW1iLWJnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGJnU3R5bGUgPSBiZy5hdHRyKFwic3R5bGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgaW1nID0gdGh1bWIuZmluZChcIm1ldGFbaXRlbXByb3A9aW1hZ2VdXCIpLmF0dHIoXCJjb250ZW50XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHRodW1iSW1nID0gdGh1bWIuZmluZChcIi5kZXRhaWxzLWdhbGxlcnlfX3RodW1iLWltZ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzcmNzZXQgPSB0aHVtYkltZy5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpPy5yZXBsYWNlKC9pbWFnZS1zZXRcXCgoLiopXFwpL2dpLCBcIiQxXCIpLnJlcGxhY2UoL3VybFxcKFxcXCI/KC4qPylcXFwiXFwpL2dpLCBcIiQxXCIpLnJlcGxhY2UoLyAoXFxkKWRwcHgvZ2ksIFwiICQxeFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChub2RlLm5leHRTaWJsaW5nKS5wYXJlbnQoKS5hcHBlbmQoLy8ucmVwbGFjZVdpdGgoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGBcbiAgPGRpdiBjbGFzcz1cImRldGFpbHMtZ2FsbGVyeV9faW1hZ2VzLWNhcm91c2VsXCIgc3R5bGU9XCJ0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpXCI+XG4gICAgPGRpdiBjbGFzcz1cImRldGFpbHMtZ2FsbGVyeV9faW1hZ2UgZGV0YWlscy1nYWxsZXJ5X19pbWFnZS0tYXNwZWN0LXJhdGlvLTEzMzNcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLWdhbGxlcnlfX2ltYWdlLXNwYWNlclwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtZ2FsbGVyeV9faW1hZ2Utd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1nYWxsZXJ5X19pbWFnZS13cmFwcGVyLWlubmVyXCIgc3R5bGU9XCJtYXgtd2lkdGg6IDE1MDBweDsgYXNwZWN0LXJhdGlvOiAxLjMzMzMzIC8gMTsgbWluLXdpZHRoOiBtaW4oMTUwMHB4LCAxMDAlKTsgaGVpZ2h0OiBhdXRvXCI+XG4gICAgICAgICAgPCEtLS0tPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiZGV0YWlscy1nYWxsZXJ5X19pbWFnZS1iZyBkZXRhaWxzLWdhbGxlcnlfX2ltYWdlLWJnLS12aXNpYmxlXCJcbiAgICAgICAgICAgIHN0eWxlPVwiJHtiZ1N0eWxlfVwiYCArIC8vYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpOyBiYWNrZ3JvdW5kLWltYWdlOiBpbWFnZS1zZXQodXJsKCdodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny80NzQyMDQxMzg4LndlYnAnKSAxeCwgdXJsKCdodHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny80NzQyMDQxMzg3LndlYnAnKSAyeCk7IGFzcGVjdC1yYXRpbzogMS4zMzMzMyAvIDFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtZ2FsbGVyeV9faW1hZ2VzLXpvb21cIiBzdHlsZT1cIndpZHRoOiAwcHg7IGhlaWdodDogMHB4OyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJyR7aW1nfScpYCArIC8vaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNDc0MjA0MTM4Ni53ZWJwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYHRvcDogLTI3JTsgbGVmdDogLTg5JVwiPjwvZGl2PlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cIiR7aW1nfVwiYCArIC8vaHR0cHM6Ly9kMmo2ZGJxMGV1eDBiZy5jbG91ZGZyb250Lm5ldC9pbWFnZXMvODQ2MjU0NjcvNDc0MjA0MTM4Ni53ZWJwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgc3Jjc2V0PVwiJHtzcmNzZXR9XCJgICsgLy9odHRwczovL2QyajZkYnEwZXV4MGJnLmNsb3VkZnJvbnQubmV0L2ltYWdlcy84NDYyNTQ2Ny80NzQyMDQxMzg2LndlYnAgMXgsIGh0dHBzOi8vZDJqNmRicTBldXgwYmcuY2xvdWRmcm9udC5uZXQvaW1hZ2VzLzg0NjI1NDY3LzQ3NDIwNDEzODYud2VicCAyeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGFsdD1cIkRBVEUgQUlSRngzLVdISVRFLUdPTEQgdGhlIGJlc3QgMjB4NCZhbXA7cXVvdDsgYWlyIGRvdWJsZSBjcm93biBmb3JrLCBGb3JrIE1vZGVsOiBcdUQ4MzVcdURDMDBcdUQ4MzVcdURDMDhcdUQ4MzVcdURDMTFcdUQ4MzVcdURDMDVcdUQ4MzVcdURDMzFcdUQ4MzVcdURGRDEgXHVEODM1XHVEQzE2XHVEODM1XHVEQzA3XHVEODM1XHVEQzA4XHVEODM1XHVEQzEzXHVEODM1XHVEQzA0LVx1RDgzNVx1REMwNlx1RDgzNVx1REMwRVx1RDgzNVx1REMwQlx1RDgzNVx1REMwMyA2NWNtLCBIYW5kbGViYXI6IE5vdCBpbmNsdWRlZCwgXHVEODM1XHVEQzE3LVx1RDgzNVx1REMxM1x1RDgzNVx1REMwNFx1RDgzNVx1REMwQ1x1RDgzNVx1REMxMlx1RDgzNVx1REMzMVx1RDgzNVx1REZDRiBmb3IgQk1YOiBOb3QgaW5jbHVkZWQsIFx1RDgzNVx1REMwN1x1RDgzNVx1REMxRVx1RDgzNVx1REMxQVx1RDgzNVx1REMxRFx1RDgzNVx1REMyQ1x1RDgzNVx1REMxRVx1RDgzNVx1REMyRDogTm90IGluY2x1ZGVkXCJcbiAgICAgICAgICAgIHRpdGxlPSdEQVRFIEFJUkZ4My1XSElURS1HT0xEIHRoZSBiZXN0IDIweDRcIiBhaXIgZG91YmxlIGNyb3duIGZvcmsnXG4gICAgICAgICAgICB3aWR0aD1cIjE1MDBcIlxuICAgICAgICAgICAgaGVpZ2h0PVwiMTEyNVwiXG4gICAgICAgICAgICBsb2FkaW5nPVwiZWFnZXJcIlxuICAgICAgICAgICAgY2xhc3M9XCJkZXRhaWxzLWdhbGxlcnlfX3BpY3R1cmUgZGV0YWlscy1nYWxsZXJ5X19waG90b3N3aXBlLWluZGV4LTBcIlxuICAgICAgICAgICAgaXRlbXByb3A9XCJpbWFnZVwiXG4gICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDAlXCJcbiAgICAgICAgICAvPjwhLS0tLT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS0tLT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgYCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBjYXJvdXNlbFJlbW92ZWQoZWxlbVJlbW92ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2Fyb3VzZWxzID0gJChcIi5kZXRhaWxzLWdhbGxlcnlfX2ltYWdlcy1jYXJvdXNlbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhcm91c2Vscy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdHJveUpTVigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gJChcIi5kZXRhaWxzLWdhbGxlcnlfX2ltYWdlcy1jb250YWluZXJcIilbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQgJiYgcmVjcmVhdGVKU1ZFbGVtZW50KHBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gY2Fyb3VzZWxJbnNlcnRlZChlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcm91c2VscyA9ICQoXCIuZGV0YWlscy1nYWxsZXJ5X19pbWFnZXMtY2Fyb3VzZWxcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgcGFyZW50ID0gJChcIi5kZXRhaWxzLWdhbGxlcnlfX2ltYWdlcy1jb250YWluZXJcIilbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYXJvdXNlbHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChjYXJvdXNlbHNbMF0pLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtWzBdLmxlYXZlKFwiLmRldGFpbHMtZ2FsbGVyeV9faW1hZ2VzLWNhcm91c2VsXCIsIG5vdE9uY2VPbmx5U2VsZlVuYmluZCwgY2Fyb3VzZWxSZW1vdmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtWzBdLmFycml2ZShcIi5kZXRhaWxzLWdhbGxlcnlfX2ltYWdlcy1jYXJvdXNlbFwiLCBub3RPbmNlT25seVNlbGZVbmJpbmQsIGNhcm91c2VsSW5zZXJ0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGQuYXJyaXZlKFwiLmRldGFpbHMtZ2FsbGVyeV9faW1hZ2VzLWNvbnRhaW5lclwiLCBub3RPbmNlT25seVNlbGZVbmJpbmQsIHJlY3JlYXRlSlNWRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgZC5hcnJpdmUoXCIuZGV0YWlscy1nYWxsZXJ5X19waWN0dXJlZGV0YWlscy1nYWxsZXJ5X19pbWFnZXMtem9vbVwiLCBub3RPbmNlT25seVNlbGZVbmJpbmQsIGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBjaGFuZ2VCYWNrZ3JvdW5kKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZSA9ICQoZWxlbSlcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHVybCA9IGB1cmwoJHtlLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIil9KWBcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNzcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWltYWdlXCI6IHVybCxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLXNpemVcIjogXCJjb3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgaW1nID0gJChcIi5lYy1zaXplIC5lYy1zdG9yZSAuZGV0YWlscy1nYWxsZXJ5X19waG90b3N3aXBlLXRodW1iLWluZGV4LTBcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5pcyhcIi5kZXRhaWxzLWdhbGxlcnlfX3Bob3Rvc3dpcGUtaW5kZXgtMFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhenkgPSAkKGxhenlDU1MoKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF6eS5maW5kT3JDcmVhdGUoXCIjanMtYmctdGh1bWItb3ZlcmxheVwiLCBcIjxzdHlsZSBpZD0nanMtYmctdGh1bWItb3ZlcmxheSc+PC9zdHlsZT5cIikudGV4dChgLmVjLXNpemUgLmVjLXN0b3JlIC5kZXRhaWxzLWdhbGxlcnlfX3Bob3Rvc3dpcGUtdGh1bWItaW5kZXgtMDo6YWZ0ZXIgeyBjb250ZW50OiBcIlwiOyBiYWNrZ3JvdW5kLWltYWdlOiAke3VybH07IH1cbiAgICAgICAgICAgICAgICAgICAgLy8gLmVjLXNpemUgLmVjLXN0b3JlIC5kZXRhaWxzLWdhbGxlcnlfX3Bob3Rvc3dpcGUtdGh1bWItaW5kZXgtMCAuZGV0YWlscy1nYWxsZXJ5X190aHVtYi1pbWcgeyBiYWNrZ3JvdW5kLWltYWdlOiBpbWFnZS1zZXQoJHt1cmx9IDFkcHB4LCAke3VybH0gMmRwcHgpICFpbXBvcnRhbnQ7IH1cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgYCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnBhcmVudCgpLmNzcyhjc3MpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VCYWNrZ3JvdW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBjaGFuZ2VCYWNrZ3JvdW5kKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgZC5hcnJpdmUoXCIuZGV0YWlscy1nYWxsZXJ5X19pbWFnZS13cmFwcGVyLWlubmVyOmZpcnN0LW9mLXR5cGUgLmRldGFpbHMtZ2FsbGVyeV9fcGljdHVyZTpmaXJzdC1vZi10eXBlXCIsIG9uY2VPbmx5U2VsZlVuYmluZCwgZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLywgLmRldGFpbHMtZ2FsbGVyeV9fdGh1bWItaW1nXCIsIG9uY2VPbmx5LCBlbGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICgkKGVsZW0pLmlzKFwiLmRldGFpbHMtZ2FsbGVyeV9fdGh1bWItaW1nXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNvbnN0IGRpdiA9ICQoXCI8ZGl2PjxpbWc+PC9kaXY+XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAkKGVsZW0pLnBhcmVudCgpLmFwcGVuZChkaXYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBlbGVtID0gZGl2LmZpbmQoXCJpbWdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dEdXJhdGlvbihcIjM2MFwiLCBcIjM2MCBlbGVtZW50IGFycml2ZWRcIikoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqc3ZJbWFnZSA9ICQoZWxlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIganN2SG9sZGVyID0gJChcIiNqc3YtaG9sZGVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nRHVyYXRpb24oXCIzNjBcIiwgXCJJbmplY3RpbmcgMzYwXCIpKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWpzdkltYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHx8IGpzdkhvbGRlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dEdXJhdGlvbihcIjM2MFwiLCBcIjM2MCBjYW4ndCBiZSBpbmplY3RlZFwiLCAhanN2SW1hZ2UubGVuZ3RoLCBqc3ZIb2xkZXIubGVuZ3RoKSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aHVtYnMgPSAkKFwiLmRldGFpbHMtZ2FsbGVyeV9fdGh1bWJzID4gLmRldGFpbHMtZ2FsbGVyeV9fdGh1bWI6Z3QoMylcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1ncyA9IHRodW1icy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8kKFwiLmRldGFpbHMtZ2FsbGVyeV9fdGh1bWI6Zmlyc3RcIikuY2xhc3NDaGFuZ2UoZGV0ZWN0V2VBcmVPbjM2MEltYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLyQoXCIucHN3cF9fY29udGFpbmVyXCIpLmNsYXNzQ2hhbmdlKGUgPT4gc2V0VGltZW91dChkZXRlY3RXZUFyZU9uMzYwSW1hZ2UsIDMwMCksIFwic3R5bGVcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZGV0YWlscy1nYWxsZXJ5X190aHVtYicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGRldGVjdFdlQXJlT24zNjBJbWFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhID0gJCh0aGlzKS5maW5kKFwiLmRldGFpbHMtZ2FsbGVyeV9fdGh1bWItaW1nLXdyYXBwZXItaW5uZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhLmZpbmQoXCIuZGV0YWlscy1nYWxsZXJ5X190aHVtYi1zaGFkb3dcIikubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiZGV0YWlscy1nYWxsZXJ5X190aHVtYi1zaGFkb3dcIj48L2Rpdj5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhLmZpbmQoXCIuZGV0YWlscy1nYWxsZXJ5X190aHVtYi1tb3JlXCIpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLmFwcGVuZCgkKGA8ZGl2IGNsYXNzPVwiZGV0YWlscy1nYWxsZXJ5X190aHVtYi1tb3JlXCI+JHtpbWdzID4gMSA/IFwiK1wiIDogXCJcIn0ke2ltZ3MgPiAxID8gaW1ncyA6IFwiXCJ9PC9kaXY+YCkub24oXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuZGV0YWlscy1nYWxsZXJ5X19pbWFnZS1iZ1wiKVskKFwiLmRldGFpbHMtZ2FsbGVyeV9fdGh1bWItbW9yZVwiKS5pbmRleChlLnRhcmdldCldPy5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAganN2SW1hZ2UuYXR0cihcImlkXCIsIFwianN2LWltYWdlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8uYXR0cignc3JjJywgcDM2MC51cmwpIC8vLndyYXAoJCgnPGRpdiBpZD1cImpzdi1ob2xkZXJcIiBjbGFzcz1cImpzdi1ob2xkZXJcIiAvPicpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzdkhvbGRlciA9IGpzdkltYWdlLnBhcmVudCgpLmF0dHIoXCJpZFwiLCBcImpzdi1ob2xkZXJcIikuYWRkQ2xhc3MoXCJqc3YtaG9sZGVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gJCgnI2pzdi1ob2xkZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzdkhvbGRlclswXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0MzYwID0gJCgnPGJ1dHRvbiBjbGFzcz1cImpzdi10b2dnbGUganN2LXRvZ2dsZS0zNjBcIj48L2J1dHRvbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQzNjBbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZTM2MCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGZzID0gJCgnPGJ1dHRvbiBjbGFzcz1cImpzdi10b2dnbGUganN2LXRvZ2dsZS1mdWxsLXNjcmVlbiBqc3YtZW50ZXItZnVsbC1zY3JlZW5cIj48L2J1dHRvbj4nKS5vbihcImNsaWNrXCIsIHRvZ2dsZUZ1bGxTY3JlZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxvYWRlciA9ICQoJzxkaXYgY2xhc3M9XCJqc3YtbG9hZGVyXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3dpcGUgPSAkKCc8YnV0dG9uIGNsYXNzPVwianN2LXRvZ2dsZSBqc3Ytc3dpcGUtaWNvblwiPjwvYnV0dG9uPicpLm9uKFwiY2xpY2tcIiwgcGhvdG9Td2lwZVRvZ2dsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmRldGFpbHMtZ2FsbGVyeV9fd3JhcFwiKS5hcHBlbmQoJChcIjxkaXYvPlwiKS5hZGRDbGFzcyhcImpzdi1idXR0b25zXCIpLmFwcGVuZCh0ZnMsIHQzNjApLmFwcGVuZChzd2lwZSwgbG9hZGVyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xvYWRlci5pbnNlcnRCZWZvcmUoJCgnLmRldGFpbHMtZ2FsbGVyeV9fc2Nyb2xsJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAganN2SG9sZGVyLmFkZENsYXNzKFwianN2LWhvbGRlclwiKS5wYXJlbnQoKS5hZGRDbGFzcyhcImRldGFpbHMtZ2FsbGVyeS1pbmRleC0wXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmVjd2lkLXBzd3BcIikuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGpzdiA9ICh3aW5kb3cuanN2ID0gbmV3IEphdmFzY3JpcHRWaWV3ZXIoJC5leHRlbmQoe30sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluSG9sZGVySWQ6IFwianN2LWhvbGRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5JbWFnZUlkOiBcImpzdi1pbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5JbWFnZVVybDogXCIgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmxGb3JtYXQ6IHAzNjAuZm9ybWF0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsRnJhbWVzOiBwMzYwLmZyYW1lcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZ3Jlc3NCYXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmVyc2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BBdEVkZ2VzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6b29tOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpvb21XaGVlbFNwZWVkOiAyMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6b29tTWF4OiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZXJ0aWE6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvUm90YXRlOiAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b1JvdGF0ZVNwZWVkOiAyMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvUm90YXRlUmV2ZXJzZTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvQ0ROUmVzaXplcjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVJbWFnZUV2ZW50czogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb25Db25maWc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ1RvUm90YXRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93U3RhcnRUb1JvdGF0ZURlZmF1bHROb3RpZmljYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBwMzYwLmNzczM2MCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYSA9IGpzdi5jYW5jZWxDdXJyZW50QWN0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzdi5jYW5jZWxDdXJyZW50QWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc3YuY2FuY2VsbGVkU2luY2UgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVW5sb2FkKGRlc3Ryb3lKU1YpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gJCgnLmRldGFpbHMtZ2FsbGVyeV9faW1hZ2VzLWNvbnRyb2wnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgYWxlcnQoMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqc3YpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGVyY2VudGFnZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganN2LmV2ZW50cygpLnpvb21DaGFuZ2VkLm9uKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB6b29tID0gZS56b29tLmN1cnJlbnRab29tU2NhbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgeiA9IHBhcnNlRmxvYXQoem9vbS50b0ZpeGVkKDEpKS50b1N0cmluZygpLnN1YnN0cmluZygwLCAzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGQudG9nZ2xlQ2xhc3MoXCJwc3dwLS16b29tZWQtaW5cIiwgem9vbSA+IDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnBzd3AtLW9wZW5cIikudG9nZ2xlQ2xhc3MoXCJwc3dwLS16b29tZWQtaW5cIiwgem9vbSA+IDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmpzdi16b29tLWJ1dHRvbnMtd3JhcHBlciAuZWN3aWQtcHN3cC13cmFwcGVyXCIpLnRvZ2dsZUNsYXNzKFwicHN3cC0tem9vbWVkLWluXCIsIHpvb20gPj0gZS56b29tLnpvb21NYXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmVjd2lkLXBzd3AgLnBzd3BfX2J1dHRvbi0tem9vbVwiKS5hdHRyKFwiZGF0YS16b29tXCIsIHogKyBcIiB4XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzdi5ldmVudHMoKS5sb2FkSW1hZ2Uub24ocHJvZ3Jlc3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5hdmlnYXRvci5pc0ZpcmVmb3ggJiYgIW5hdmlnYXRvci5pc1NhZmFyaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzLmltZy5wYXJlbnROb2RlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLmltZy5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSBwcm9ncmVzcy5jdXJyZW50SW1hZ2UgPT0gMSA/IFwiYmxvY2tcIiA6IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSB0aGlzIGZvciB5b3VyIG93biBwcm9ncmVzcyBiYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudCA9IHByb2dyZXNzLnBlcmNlbnRhZ2UgKyBcIiVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sb2dEdXJhdGlvbihcImxvYWRpbmdcIiwgcGVyY2VudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlcmNlbnQgPT0gcGVyY2VudGFnZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudGFnZSA9IHBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsID0gJChcIi5qc3YtbG9hZGVyXCIpLmh0bWwoYDxkaXYgY2xhc3M9XCJsb2FkaW5nLXRleHRcIj48ZGl2IGNsYXNzPVwibG9hZGluZy0zNjAtdGV4dFwiPiR7cGVyY2VudH08L2Rpdj48L2Rpdj5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAobC5jc3MoXCJkaXNwbGF5XCIpID09IFwiZmxleFwiKSBsLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJChcIi5sb2FkaW5nLWJhclwiKS53aWR0aChwZXJjZW50KS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYi5hcHBlbmQoYDxkaXYgY2xhc3M9XCJsb2FkaW5nLWJhclwiIHN0eWxlPVwid2lkdGg6ICR7cGVyY2VudH1cIj48L2Rpdj5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzcy5wZXJjZW50YWdlID49IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGwgPSAkKFwiLmxvYWRpbmctYmFyXCIpLmNzcyhcInRyYW5zaXRpb25cIiwgXCJub25lXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHQgPT4gbC53aWR0aCgwKSAmJiBzZXRUaW1lb3V0KHQgPT4gbC5jc3MoXCJ0cmFuc2l0aW9uXCIsIFwiXCIpLCAxKSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpLmZpbmQoXCIubG9hZGluZy10ZXh0XCIpLnRleHQoXCJcIikudG9nZ2xlQ2xhc3MoXCJ0MzYwLWluaXRpYWxpemluZ1wiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgODAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc3YuZXZlbnRzKCkucGluY2gub24oZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganN2LmV2ZW50cygpLnN0YXJ0ZWQub24ocmVhZHkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dEdXJhdGlvbihcIjM2MFwiLCBcIjM2MCBpbmplY3RlZFwiKSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dEdXJhdGlvbih0cnVlLCBcIlNpdGUgbG9hZGVkIGFuZCAzNjAgcmVuZGVyZWRcIikoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEkKFwiLnBzd3AtLW9wZW5cIikubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVTaG93MzYwKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGQudG9nZ2xlQ2xhc3MoXCJqc3Ytc3dpcGluZ1wiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlYWR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gJChcIi5qc3YtbG9hZGVyXCIpLmZpbmQoXCIubG9hZGluZy10ZXh0XCIpLnRvZ2dsZUNsYXNzKFwidDM2MC1pbml0aWFsaXppbmdcIiwgZmFsc2UpLmh0bWwoJzxoNCBjbGFzcz1cInNob3ctMzYwLWhpbnQgaWRsZVwiPjxkaXY+PC9kaXY+PC9oND4gPGRpdiBjbGFzcz1cImRyYWctb3Itc3dpcGUtdG8tcm90YXRlIGlkbGVcIj48L2Rpdj48ZGl2IGNsYXNzPVwicGluY2gtb3Itc2Nyb2xsLXRvLXpvb20gaWRsZVwiPjwvZGl2PjxkaXYgY2xhc3M9XCJ0YXAtbW9yZS1waWNzIGlkbGVcIi8+PC9kaXY+JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNscyA9IFtcIi5kcmFnLW9yLXN3aXBlLXRvLXJvdGF0ZVwiLCBcIi5waW5jaC1vci1zY3JvbGwtdG8tem9vbVwiLCBcIi50YXAtbW9yZS1waWNzXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiB0KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdG9yID0gY2xzW2luZGV4XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHRhcmdldCA9ICQoc2VsZWN0b3IpLnRvZ2dsZUNsYXNzKFwiaWRsZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGlzSWRsZSA9IHRhcmdldC5pcyhcIi5pZGxlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNJZGxlIHx8IGluZGV4KysgPCBjbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodCwgaXNJZGxlID8gNTAwIDogNTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC50b2dnbGVDbGFzcyhcImxvYWRlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzdi5ldmVudHMoKS5jbGljay5vbihlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BpbkpTVigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlID0gZS5vcmlnaW5hbEV2ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc3YuZXZlbnRzKCkuZW5kQXV0b1JvdGF0ZS5vbihlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFqc3YubWFudWFsU3RvcCB8fCBuZXcgRGF0ZSgpIC0ganN2Lm1hbnVhbFN0b3AgPiAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwaW5KU1YoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzdi5ldmVudHMoKS5kb3VibGVDbGljay5vbihlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGpzdi5jYW5jZWxDdXJyZW50QWN0aW9ucygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBqc3Yuem9vbVRvKDAsIDAsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAganN2LmNhbmNlbEN1cnJlbnRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBqc3Yuem9vbVRvKDIsIDAuNSwgMC41KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVGdWxsU2NyZWVuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganN2LmV2ZW50cygpLnNjcm9sbC5vbihlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgem9vbSA9IGUuem9vbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBjdXJyZW50Wm9vbVNjYWxlID0gZS5jdXJyZW50Wm9vbVNjYWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGlzU2NhbGVkID0gY3VycmVudFpvb21TY2FsZSAhPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoem9vbS5wcmV2aW91c1pvb21TY2FsZSA+IDEgJiYgY3VycmVudFpvb21TY2FsZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6b29tLnN0YXJ0U3Bpbm5pbmdUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgem9vbS5zdGFydFNwaW5uaW5nVGltZW91dCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BpbkpTVigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzU2NhbGVkIHx8IHpvb20uc3RhcnRTcGlubmluZ1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUub3JpZ2luYWxFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1NjYWxlZCAmJiB6b29tLnN0YXJ0U3Bpbm5pbmdUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6b29tLnN0YXJ0U3Bpbm5pbmdUaW1lb3V0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh6b29tLnN0YXJ0U3Bpbm5pbmdUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzdi5ldmVudHMoKS5waW5jaC5vbihlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmIChqc3YuY2FuY2VsQ3VycmVudEFjdGlvbnMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGpzdi56b29tVG8oMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGpzdi5jYW5jZWxDdXJyZW50QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGpzdi56b29tVG8oMiwgMC41LCAwLjUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzdi5zdGFydCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZC50b2dnbGVDbGFzcyhcImpzdi1oYXMtMzYwXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAvLyBkZXRlY3RXZUFyZU9uMzYwSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzRnVsbFNjcmVlbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuanN2LXRvZ2dsZVwiKS5zaG93KCkub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0Z1bGxTY3JlZW4gPSAhaXNGdWxsU2NyZWVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNqc3YtaG9sZGVyXCIpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXgtd2lkdGhcIjogaXNGdWxsU2NyZWVuID8gXCIxMDAlXCIgOiBcIjUwJVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWF4LWhlaWdodFwiOiBpc0Z1bGxTY3JlZW4gPyBcIjEwMCVcIiA6IFwiNzIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zcGluSlNWKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgd2luZG93LmluamVjdDM2MCA9IGluamVjdDM2MDtcbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVUb3RhbChwYWdlKSB7XG4gICAgICAgIGlmIChcIkNBUlRcIiA9PSBwYWdlLnR5cGUpIHtcbiAgICAgICAgICAgIGxvZ0R1cmF0aW9uKFwiQ0FSVC1UT1RBTFwiLCBcImNhbGN1bGF0aW5nIG9yZGVyIHRvdGFsXCIpKCk7XG4gICAgICAgICAgICBFY3dpZC5DYXJ0LmNhbGN1bGF0ZVRvdGFsKG9yZGVyID0+IHtcbiAgICAgICAgICAgICAgICBsb2dEdXJhdGlvbihcIkNBUlQtVE9UQUxcIiwgXCJjYWxjdWxhdGVkIG9yZGVyIHRvdGFsXCIpKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChvcmRlckluZm9SZWFkeS5iaW5kKHRoaXMsIG9yZGVyKSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBob3RvU3dpcGVUb2dnbGUoKSB7XG4gICAgICAgIGFsZXJ0KFwiWW91IGNhbiBzd2lwZSB0aHJvdWdoIHRoZSBwaG90b3NcIik7XG4gICAgICAgIC8vICRkLnRvZ2dsZUNsYXNzKFwianN2LXN3aXBpbmdcIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvZ2dsZTM2MChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgJChcIi5wc3dwX191aS0taGlkZGVuXCIpLnJlbW92ZUNsYXNzKFwicHN3cF9fdWktLWhpZGRlblwiKTtcbiAgICAgICAgY29uc3QgaXMzNjAgPSAkZC5oYXNDbGFzcyhcImpzdi1zaG93LTM2MFwiKTtcbiAgICAgICAgY29uc3QgaXNGdWxsU2NyZWVuID0gJGQuaGFzQ2xhc3MoXCJqc3YtZnVsbC1zY3JlZW5cIik7XG4gICAgICAgIGlmIChpc0Z1bGxTY3JlZW4gJiYgIWlzMzYwKSB7XG4gICAgICAgICAgICAkKFwiLmkwXCIpLmNzcyh7XG4gICAgICAgICAgICAgICAgXCJ6LWluZGV4XCI6IDMsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogXCJibG9ja1wiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0b2dnbGVTaG93MzYwKCFpczM2MCk7XG4gICAgICAgICRkLnRvZ2dsZUNsYXNzKFwianN2LXN3aXBpbmdcIik7XG4gICAgICAgICQoXCIuanN2LWxvYWRlclwiKS50b2dnbGUoaXMzNjApO1xuICAgICAgICBpZiAoIWlzMzYwKSB7XG4gICAgICAgICAgICBzcGluSlNWKGlzRnVsbFNjcmVlbiA/IDEgOiB1bmRlZmluZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcEpTVigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3RvcEpTVigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5qc3YpIHtcbiAgICAgICAgICAgIGpzdi5tYW51YWxTdG9wID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGpzdi5jYW5jZWxDdXJyZW50QWN0aW9ucygpO1xuICAgICAgICAgICAganN2LmNhbmNlbEN1cnJlbnRBY3Rpb25zKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc3BpbkpTVihmcmFtZSkge1xuICAgICAgICBpZiAod2luZG93LmpzdiAmJiAhanN2Lnpvb20/LmlzWm9vbWVkKCkpIHtcbiAgICAgICAgICAgIHN0b3BKU1YoKTtcbiAgICAgICAgICAgIHR5cGVvZiBmcmFtZSA9PSBcIm51bWJlclwiICYmIGpzdi5zZXRDdXJyZW50SW1hZ2UoZnJhbWUpO1xuICAgICAgICAgICAgc2V0VGltZW91dCh0ID0+IGpzdi5hdXRvUm90YXRlKDEwMCkudGhlbihzcGlubmluZyA9PiBqc3YgJiYgIXNwaW5uaW5nICYmIGpzdi5jYW5jZWxsZWRTaW5jZSA8IG5ldyBEYXRlKCkgLSAxMDAwICYmIHNldFRpbWVvdXQoc3BpbkpTViwgMSkpLCAyMDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdpbmRvdy5zdG9wSlNWID0gc3RvcEpTVjtcbiAgICB3aW5kb3cuc3BpbkpTViA9IHNwaW5KU1Y7XG4gICAgdmFyIHNob3czNjBQb3VwdXBTdGF0ZSA9IG51bGw7XG4gICAgJGQub24oXCJjbGlja1wiLCBcIi5wc3dwX19idXR0b24tLWNsb3NlLnBzd3BfX2J1dHRvbi0tY2xvbmVcIiwgZSA9PiB7XG4gICAgICAgIGlmIChzaG93MzYwUG91cHVwU3RhdGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgc2hvdzM2MFBvdXB1cFN0YXRlID0gJGQuaXMoXCIuanN2LXNob3ctMzYwXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9nZ2xlU2hvdzM2MChzaG93MzYwUG91cHVwU3RhdGUpO1xuICAgICAgICAgICAgc2hvdzM2MFBvdXB1cFN0YXRlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcmlnaW5hbENsb3NlQnV0dG9uID0gJChcIi5wc3dwX19idXR0b24tLWNsb3NlOm5vdCgucHN3cF9fYnV0dG9uLS1jbG9uZSlcIilbMF07XG4gICAgICAgIC8vaWYgKGUudGFyZ2V0ICE9IG9yaWdpbmFsQ2xvc2VCdXR0b24pIHtcbiAgICAgICAgb3JpZ2luYWxDbG9zZUJ1dHRvbj8uY2xpY2soKTtcbiAgICAgICAgLy99XG4gICAgfVxuICAgICk7XG4gICAgZnVuY3Rpb24gdG9nZ2xlRnVsbFNjcmVlbigpIHtcbiAgICAgICAgaWYgKCRkLmlzKFwiLmpzdi1zaG93LTM2MFwiKSlcbiAgICAgICAgICAgIGlmICghJChcIi5wc3dwLS1vcGVuXCIpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG11c3RFbmZvcmNlMzYwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0b3IgPSAvLyQod2luZG93KS53aWR0aCgpID49IDcyMFxuICAgICAgICAgICAgICAgICAgICAvLyAgPyAvL2Rlc2t0b3AgZnJpZW5kbHkgbGlua1xuICAgICAgICAgICAgICAgICAgICAvLyAgICBcIi5kZXRhaWxzLWdhbGxlcnlfX3BpY3R1cmUuZGV0YWlscy1nYWxsZXJ5X19waG90b3N3aXBlLWluZGV4LTFcIlxuICAgICAgICAgICAgICAgICAgICAvLyAgOiAvL21vYmlsZSBmcmllbmRseSBsaW5rXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIFwiLmRldGFpbHMtZ2FsbGVyeV9fdGh1bWItLWFjdGl2ZSBhXCI7XG4gICAgICAgICAgICAgICAgICAgIFwiLmRldGFpbHMtZ2FsbGVyeV9fcGhvdG9zd2lwZS10aHVtYi1pbmRleC0wIC5kZXRhaWxzLWdhbGxlcnlfX3RodW1iLW1vcmVcIjtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudEltYWdlTGluayA9ICQoc2VsZWN0b3IpWzBdO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRJbWFnZUxpbmsgJiYgY3VycmVudEltYWdlTGluay5jbGljaygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgY2xvc2VGdWxsU2NyZWVuID0gJChcIi5wc3dwX19idXR0b24tLWNsb3NlXCIpWzBdO1xuICAgICAgICAgICAgICAgIGNsb3NlRnVsbFNjcmVlbiAmJiBjbG9zZUZ1bGxTY3JlZW4uY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgLy9pZiAod2luZG93Lmpzdikge1xuICAgICAgICAvLyAgc3BpbkpTVigpO1xuICAgICAgICAvL31cbiAgICAgICAgLy9zZXRUaW1lb3V0KHQgPT4ge1xuICAgICAgICAvL3ZhciBpc0ZTID0gISRkLmhhc0NsYXNzKFwianN2LWZ1bGwtc2NyZWVuXCIpO1xuICAgICAgICAvLyAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdqc3YtZXhpdC1mdWxsLXNjcmVlbicsIGlzRlMpXG4gICAgICAgIC8vICAgICAudG9nZ2xlQ2xhc3MoJ2pzdi1lbnRlci1mdWxsLXNjcmVlbicsICFpc0ZTKTs7XG4gICAgICAgIC8vJGQudG9nZ2xlQ2xhc3MoXCJqc3YtZnVsbC1zY3JlZW5cIiwgaXNGUyk7XG4gICAgICAgIC8vJGQudG9nZ2xlQ2xhc3MoXCJoaWRlLWFjdGlvbi1iYXJcIiwgaXNGUyk7XG4gICAgICAgIC8vfSwgMTAwKTtcbiAgICB9XG4gICAgd2luZG93LnRvZ2dsZUZ1bGxTY3JlZW4gPSB0b2dnbGVGdWxsU2NyZWVuO1xuICAgIC8vZnVuY3Rpb24gaW5qZWN0UHJvZHVjdEJyZWFkQ3J1bWIocGFnZSkge1xuICAgIC8vIGxldCBiYyA9ICQoXCIuZWMtYnJlYWRjcnVtYnNcIik7XG4gICAgLy8gaWYgKHRydWUgfHwgYmMuY2hpbGRyZW4oKS5sZW5ndGggJiYgIWJjLmZpbmQoXCJicmVhZGNydW1ic19fcHJvZHVjdFwiKSkge1xuICAgIC8vICAgYmMuZmluZChcIi5icmVhZGNydW1ic19fbGluay0tbGFzdFwiKS5yZW1vdmVDbGFzcyhcImJyZWFkY3J1bWJzX19saW5rLS1sYXN0XCIpO1xuICAgIC8vICAgYmMuYXBwZW5kKCQoJzxzcGFuIGNsYXNzPVwiYnJlYWRjcnVtYnNfX3Byb2R1Y3QgYnJlYWRjcnVtYnNfX2RlbGltaXRlciBlYy10ZXh0LW11dGVkXCI+XHUwMEJCPC9zcGFuPicpKTtcbiAgICAvLyAgIGJjLmFwcGVuZChcbiAgICAvLyAgICAgJCgnPGEgY2xhc3M9XCJicmVhZGNydW1ic19fbGluayBlYy1saW5rIGVjLWxpbmstLW11dGVkIGJyZWFkY3J1bWJzX19saW5rLS1sYXN0XCIgcmVsPVwiY2Fub25pY2FsXCI+PC9hPicpXG4gICAgLy8gICAgICAgLnRleHQodW5ib2xkKCQoXCIucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXNrdVwiKS50ZXh0KCkpKVxuICAgIC8vICAgICAgIC5hdHRyKFwiaHJlZlwiLCBsb2NhdGlvbi5ocmVmKVxuICAgIC8vICAgKTtcbiAgICAvLyB9XG4gICAgLy8gJChcIi5icmVhZGNydW1ic19fZGVsaW1pdGVyXCIpLnRleHQoXCJcdTAwQkJcIik7XG4gICAgLy99XG4gICAgZnVuY3Rpb24gZml4UHJvZHVjdFdlaWdodCgpIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdERldGFpbHMgPSAkKFwiLnByb2R1Y3QtZGV0YWlsc1wiKVxuICAgICAgICAgICAgLCBxdHkgPSAkKFwiLmRldGFpbHMtcHJvZHVjdC1wdXJjaGFzZV9fcXR5LWZpZWxkIGlucHV0XCIpLnZhbCgpIHx8IDFcbiAgICAgICAgICAgICwgcXVhbnRpdHkgPSBxdHkgPD0gMCA/IDEgOiBxdHk7XG4gICAgICAgIHZhciB3ZWlnaHRMYWJlbCA9ICQoXCIucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXdlaWdodDpmaXJzdFwiKTtcbiAgICAgICAgdmFyIHdlaWdodFRhcmdldCA9IHByb2R1Y3REZXRhaWxzLmZpbmQoXCIgPiAucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXdlaWdodFwiKTtcbiAgICAgICAgaWYgKHdlaWdodFRhcmdldC5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcHJvZHVjdERldGFpbHMuYXBwZW5kKCh3ZWlnaHRMYWJlbCA9IHdlaWdodExhYmVsLmNsb25lKCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdlaWdodExhYmVsID0gd2VpZ2h0VGFyZ2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEkKFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC13ZWlnaHQuZGV0YWlscy1wcm9kdWN0LWF0dHJpYnV0ZVwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHdlaWdodExhYmVsLmF0dHIoXCJvcmRlclwiLCAwKS50b2dnbGVDbGFzcyhcImRldGFpbHMtcHJvZHVjdC1hdHRyaWJ1dGVcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB3ZWlnaHRMYWJlbC5wYXJlbnQoKS50b2dnbGVDbGFzcyhcInByb2R1Y3QtYXR0cmlidXRlc1wiLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd2VpZ2h0ID0gMDtcbiAgICAgICAgJChcIi5mb3JtLWNvbnRyb2xfX3JhZGlvOmNoZWNrZWRcIikuZWFjaCgoaW5kZXgsIGlucHV0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB3ID0gaW5wdXQubmFtZSA9PSBcIlVuaXQgVHlwZVwiICYmIC9eXHVEODM1XHVEQzMxXHVEODM1XHVERkNGIC8udGVzdChpbnB1dC52YWx1ZSkgPyAwIDogcGFyc2VGbG9hdCgkKGlucHV0KS5wYXJlbnQoKS5hdHRyKFwiZGF0YS13ZWlnaHRcIikgfHwgMCkgfHwgMDtcbiAgICAgICAgICAgIHdlaWdodCArPSB3O1xuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHNldFRpbWVvdXQodCA9PiB3ZWlnaHRMYWJlbC50b2dnbGVDbGFzcyhcImhhcy13ZWlnaHQtaW5mb1wiLCB3ZWlnaHQgPiAwKSwgMSk7XG4gICAgICAgIC8vIGNvbnN0IHdlaWdodE1ldHJpYyA9IEVjd2lkLmZvcm1hdEN1cnJlbmN5KHdlaWdodCkucmVwbGFjZSgvXHUyMEFDL2dpLCBcIktnXCIpO1xuICAgICAgICAvLyBjb25zdCB3ZWlnaHRQb3VuZHMgPSBFY3dpZC5mb3JtYXRDdXJyZW5jeShsYnMpLnJlcGxhY2UoL1x1MjBBQy9naSwgbGJzID09IDEgPyBcImxiXCIgOiBcImxic1wiKTtcbiAgICAgICAgY29uc3QgbGJzID0gd2VpZ2h0ICogMi4yMDQ2MlxuICAgICAgICAgICAgLCBpbktnID0gd2VpZ2h0ID49IDEuMlxuICAgICAgICAgICAgLCB3ZWlnaHRLRyA9IGluS2cgPyB3ZWlnaHQgOiBcIlwiXG4gICAgICAgICAgICAsIHdlaWdodEdyYW1zID0gaW5LZyA/IFwiXCIgOiB3ZWlnaHQgKiAxMDAwXG4gICAgICAgICAgICAsIHRvdGFsV2VpZ2h0ID0gd2VpZ2h0ICogcXVhbnRpdHlcbiAgICAgICAgICAgICwgdG90YWxMYnMgPSB0b3RhbFdlaWdodCAqIDIuMjA0NjJcbiAgICAgICAgICAgICwgdG90YWxJbktnID0gdG90YWxXZWlnaHQgPj0gMS4yXG4gICAgICAgICAgICAsIHRvdGFsV2VpZ2h0S0cgPSB0b3RhbEluS2cgPyB0b3RhbFdlaWdodCA6IFwiXCJcbiAgICAgICAgICAgICwgdG90YWxXZWlnaHRHcmFtcyA9IHRvdGFsSW5LZyA/IFwiXCIgOiB0b3RhbFdlaWdodCAqIDEwMDA7XG5cbiAgICAgICAgZnVuY3Rpb24gaW5qZWN0V2VpZ2h0KGNscywgc3VmZml4LCB2YWx1ZSwgdHlwZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGxldCBlbGVtID0gd2VpZ2h0TGFiZWwuZmluZChgLmRldGFpbHMtcHJvZHVjdC1hdHRyaWJ1dGVfX3ZhbHVlYCk7XG4gICAgICAgICAgICBlbGVtLnVpTnVtYmVyKHZhbHVlLCBgdWktbnVtYmVyIHdlaWdodCAke2Nsc31gLCB0eXBlLCBpbmRleCwgbnVsbCwgc3VmZml4LCBudWxsLCBudWxsLCB0cnVlKTtcbiAgICAgICAgICAgIC8qaWYgKCFlbGVtLmxlbmd0aCkge1xuIFxuZWxlbSA9ICQoYDx1aS1udW1iZXIgY2xhc3M9XCJ1aS1udW1iZXIgd2VpZ2h0ICR7Y2xzfVwiIHR5cGU9XCIke3R5cGV9XCIgZHVyYXRpb249XCI2MDBcIiBzdHlsZT1cIi0tc3VmZml4OiAnICR7c3VmZml4fSc7IC0tcGVyY2VudDogJHt2YWx1ZX1cIj4ke3ZhbHVlfTwvdWktbnVtYmVyPmApO1xuY29uc3QgdiA9IHdlaWdodExhYmVsLmZpbmQoXCIuZGV0YWlscy1wcm9kdWN0LWF0dHJpYnV0ZV9fdmFsdWVcIik7XG5lbXB0eSAmJiB2Lmh0bWwoXCJcIik7XG52LmFwcGVuZChlbGVtKTtcbn1cbmVsZW0udG9nZ2xlKHZhbHVlICE9IFwiXCIpO1xuaWYgKGVsZW0uY3NzKFwiLS1wZXJjZW50XCIpICE9IHZhbHVlKSB7XG4vL3dlaWdodExhYmVsLnRvZ2dsZUNsYXNzKFwib25lLWJsaW5rXCIsIHRydWUpO1xuLy9zZXRUaW1lb3V0KHQgPT4gd2VpZ2h0TGFiZWwudG9nZ2xlQ2xhc3MoXCJvbmUtYmxpbmtcIiwgZmFsc2UpLCA2MDApO1xuZWxlbS5jc3MoXCItLXBlcmNlbnRcIiwgdmFsdWUpO1xufSovXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGJzU3VmZml4ID0gdHJhbnNsYXRlKFwibGJzXCIpXG4gICAgICAgICAgICAsIEtnU3VmZml4ID0gdHJhbnNsYXRlKFwiS2dcIilcbiAgICAgICAgICAgICwgZ3JhbXNTdWZmaXggPSB0cmFuc2xhdGUoXCJnclwiKTtcbiAgICAgICAgaW5qZWN0V2VpZ2h0KFwia2dcIiwgS2dTdWZmaXgsIHdlaWdodEtHLCBcIm51bWJlclwiLCAwKTtcbiAgICAgICAgaW5qZWN0V2VpZ2h0KFwiZ3JhbXNcIiwgZ3JhbXNTdWZmaXgsIHdlaWdodEdyYW1zLCBcImludFwiLCAxKTtcbiAgICAgICAgaW5qZWN0V2VpZ2h0KFwibGJzXCIsIGxic1N1ZmZpeCwgbGJzLCBcIm51bWJlclwiLCAyKTtcbiAgICAgICAgd2VpZ2h0TGFiZWwuYXR0cihcInRpdGxlXCIsIGAke3RyYW5zbGF0ZShcIlRvdGFsIFwiKX0gJHt0b3RhbExicy50b0ZpeGVkKDIpfSAke2xic1N1ZmZpeH0gLyAke3RvdGFsV2VpZ2h0S0cgPyB0b3RhbFdlaWdodEtHLnRvRml4ZWQoMikgOiB0b3RhbFdlaWdodEdyYW1zLnRvRml4ZWQoMCl9ICR7dG90YWxXZWlnaHRLRyA/IEtnU3VmZml4IDogZ3JhbXNTdWZmaXh9YCk7XG4gICAgICAgICQoXCIucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LWF0dHJpYnV0ZXNcIikudG9nZ2xlQ2xhc3MoXCJ3ZWlnaHQtbG9hZGVkXCIsIHRydWUpO1xuICAgICAgICAvLyBsZXQgYSA9ICQoXCIucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXdlaWdodFwiKTtcbiAgICAgICAgLy8gbGV0IGQgPSAkKFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1hdHRyaWJ1dGVzXCIpO1xuICAgICAgICAvLyBpZiAoYS5sZW5ndGggJiYgZC5sZW5ndGgpIHtcbiAgICAgICAgLy8gICAvL2QuY2hpbGRyZW4oXCIuZGV0YWlscy1wcm9kdWN0LWF0dHJpYnV0ZVwiKS5lYWNoKChpLG8pID0+ICQobykuYXR0cihcIm9yZGVyXCIsIGkpKTtcbiAgICAgICAgLy8gICAkKFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1hdHRyaWJ1dGVzXCIpLnRvZ2dsZUNsYXNzKFwid2VpZ2h0LWxvYWRlZFwiLCB0cnVlKTtcbiAgICAgICAgLy8gICBpZiAoIWQuZmluZChcIi5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3Qtd2VpZ2h0XCIpLmxlbmd0aCkge1xuICAgICAgICAvLyAgICAgYS5jbG9uZSgpLmFkZENsYXNzKFwiZGV0YWlscy1wcm9kdWN0LWF0dHJpYnV0ZVwiKS5hcHBlbmRUbyhkKTtcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vICAgaWYgKCFkZXN0cm95V2VpZ2h0bXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgICAvLyAgICAgZGVzdHJveVdlaWdodG11dGF0aW9uT2JzZXJ2ZXIgPSBmdW5jdGlvbiAocCkge1xuICAgICAgICAvLyAgICAgICBpZiAobGFzdFdlaWdodE11dGF0aW9uT2JzZXJ2ZXIgIT0gbnVsbCkge1xuICAgICAgICAvLyAgICAgICAgIGxhc3RXZWlnaHRNdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgLy8gICAgICAgICBsYXN0V2VpZ2h0TXV0YXRpb25PYnNlcnZlciA9IG51bGw7XG4gICAgICAgIC8vICAgICAgIH1cbiAgICAgICAgLy8gICAgIH07XG4gICAgICAgIC8vICAgfVxuICAgICAgICAvLyAgIG9uUGFnZVVubG9hZGVkKGRlc3Ryb3lXZWlnaHRtdXRhdGlvbk9ic2VydmVyKTtcbiAgICAgICAgLy8gICBkZXN0cm95V2VpZ2h0bXV0YXRpb25PYnNlcnZlcigpO1xuICAgICAgICAvLyAgIGxhc3RXZWlnaHRNdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy8gICAgIGQuZmluZChcIi5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3Qtd2VpZ2h0XCIpLmh0bWwoYS5odG1sKCkpO1xuICAgICAgICAvLyAgIH0pO1xuXG4gICAgICAgIC8vICAgbGFzdFdlaWdodE11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShhWzBdLCB7XG4gICAgICAgIC8vICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICAgICAgICAvLyAgICAgYXR0cmlidXRlczogZmFsc2UsXG4gICAgICAgIC8vICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgIC8vICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAvLyAgIH0pO1xuICAgICAgICAvLyB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFJpbVRhcGVDb2xvckZpbHRlclZpc2liaWxpdHkoKSB7XG4gICAgICAgICQoXCIuZGV0YWlscy1wcm9kdWN0LW9wdGlvbi0tUmltLVRhcGUtQ29sb3JcIikuY3NzKHtcbiAgICAgICAgICAgIFwibWF4LWhlaWdodFwiOiAkKFwiI2Zvcm0tY29udHJvbF9fcmFkaW8tLTEyNTk0NjA1MTpjaGVja2VkXCIpWzBdID8gXCIxMDAlXCIgOiBcIjBcIixcbiAgICAgICAgICAgIG92ZXJmbG93OiBcImhpZGRlblwiLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogXCJhbGwgMC41cyBlYXNlLWluLW91dFwiLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgd2luZG93LnNldFJpbVRhcGVDb2xvckZpbHRlclZpc2liaWxpdHkgPSBzZXRSaW1UYXBlQ29sb3JGaWx0ZXJWaXNpYmlsaXR5O1xuICAgIHZhciBtZWFzdXJlV2lkdGhET00gPSAkKFwiPHNwYW4vPlwiKS5hdHRyKFwiaWRcIiwgXCJqcy1tZWFzdXJlLWZvbnRcIikuY3NzKHtcbiAgICAgICAgdmlzaWJpbGl0eTogXCJoaWRkZW5cIixcbiAgICAgICAgZmxvYXQ6IFwibGVmdFwiLFxuICAgICAgICBcIndoaXRlLXNwYWNlXCI6IFwibm93cmFwXCJcbiAgICB9KS5hcHBlbmRUbyhsYXp5Q1NTKCkpO1xuICAgIHdpbmRvdy5nZXRUZXh0V2lkdGhET00gPSBmdW5jdGlvbiBnZXRUZXh0V2lkdGhET00odGV4dCwgZm9udCkge1xuICAgICAgICBjb25zdCBmID0gZm9udCB8fCBcIjEycHggYXJpYWxcIjtcbiAgICAgICAgbWVhc3VyZVdpZHRoRE9NLnRleHQodGV4dCkuY3NzKFwiZm9udFwiLCBmKTtcbiAgICAgICAgY29uc3QgdyA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShtZWFzdXJlV2lkdGhET01bMF0pLndpZHRoLCAxMCk7XG4gICAgICAgIHJldHVybiB3O1xuICAgIH1cbiAgICAgICAgO1xuXG4gICAgJC5mbi5jbGFzc0NoYW5nZSA9IGZ1bmN0aW9uIChjYiwgYXR0ciwgdHJpZ2dlckluaXRpYWxseSkge1xuICAgICAgICByZXR1cm4gJCh0aGlzKS5lYWNoKChfLCBlbCkgPT4ge1xuICAgICAgICAgICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25zID0+IHtcbiAgICAgICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChtdXRhdGlvbiA9PiBjYiAmJiBjYihtdXRhdGlvbi50YXJnZXQsICQobXV0YXRpb24udGFyZ2V0KS5wcm9wKG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUpLCBvYnNlcnZlciwgbXV0YXRpb24pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGVsLCB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFthdHRyIHx8IFwiY2xhc3NcIl0sXG4gICAgICAgICAgICAgICAgLy8gb25seSBsaXN0ZW4gZm9yIGNsYXNzIGF0dHJpYnV0ZSBjaGFuZ2VzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyaWdnZXJJbml0aWFsbHkgJiYgY2IoZWwpO1xuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgICAgICA7XG4gICAgZnVuY3Rpb24gZ2V0RGlzY291bnRQZXJjZW50KHYpIHtcbiAgICAgICAgcmV0dXJuIHYgPCA2MDAgPyAwIDogdiA8IDEwMDAgPyAwLjA1IDogdiA8IDE1MDAgPyAwLjEgOiB2IDwgMjAwMCA/IDAuMTUgOiB2IDwgMjUwMCA/IDAuMiA6IHYgPCAzMDAwID8gMC4yNSA6IHYgPCA1MDAwID8gMC4zIDogdiA8IDcwMDAgPyAwLjM1IDogMC4zNjtcbiAgICB9XG4gICAgJChkb2N1bWVudCkub24oXCJjbGljayAuZGV0YWlscy1wcm9kdWN0LW9wdGlvbi0tZDgyNWRjMDEgYzA1IGMzMSBmZDEgYzAyLTM2LXNwb2tlcy0xMDAwV1wiLCBzZXRSaW1UYXBlQ29sb3JGaWx0ZXJWaXNpYmlsaXR5KTtcbiAgICAvLyBjb25zdCBjYWNoZWRQcm9kdWN0Q29tYmluYXRpb25zID0ge307XG4gICAgLy8gZnVuY3Rpb24gcHJvbWlzZVByb2R1Y3RDb21iaW5hdGlvbnMocGlkKSB7XG4gICAgLy8gICBpZiAoY2FjaGVkUHJvZHVjdENvbWJpbmF0aW9uc1twaWRdKSByZXR1cm4gY2FjaGVkUHJvZHVjdENvbWJpbmF0aW9uc1twaWRdO1xuICAgIC8vICAgcmV0dXJuIChjYWNoZWRQcm9kdWN0Q29tYmluYXRpb25zW3BpZF0gPSBmZXRjaFByb2R1Y3QoXCJHRVRcIiwgcGlkLCBcImlkLGNvbWJpbmF0aW9ucyhpZCxza3UsaW5TdG9jayx3ZWlnaHQsZGltZW5zaW9ucyxvcHRpb25zKG5hbWUsdmFsdWUpKVwiKSkudGhlbihwID0+IHtcbiAgICAvLyAgICAgcmV0dXJuIHByb21pc2VDYXJ0QW5kUGlkKHBpZCkudGhlbihjID0+IHtcbiAgICAvLyAgICAgICBjID0gY1sxXTtcbiAgICAvLyAgICAgICAkLmV4dGVuZChwLCBjKTtcbiAgICAvLyAgICAgICBjLm9wdGlvbnMgPSBwLm9wdGlvbnM7XG4gICAgLy8gICAgICAgYy5jb21iaW5hdGlvbnMgPSBwLmNvbWJpbmF0aW9ucztcbiAgICAvLyAgICAgICByZXR1cm4gYztcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9IFxuICAgIGZ1bmN0aW9uIHByb21pc2VDYXJ0QW5kUGlkKHBpZCkge1xuICAgICAgICBpZiAoY2FjaGVkUHJvbWlzZXNDYXJ0QW5kUGlkW3BpZF0pIHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRQcm9taXNlc0NhcnRBbmRQaWRbcGlkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRldGVjdEN1cnJlbnRQYWdlKCk7XG4gICAgICAgIGluamVjdEZhc3RMb2FkaW5nQ3NzKGN1cnJlbnRQYWdlKTtcblxuICAgICAgICBsb2dEdXJhdGlvbihcIlBSSUNFLUFQSVwiLCBcIkZldGNoaW5nIHByb2R1Y3QgaWQgXCIgKyBwaWQgKyBcIiBhbmQgdG90YWwgY2FydCB2YWx1ZVwiKSgpO1xuICAgICAgICByZXR1cm4gKGNhY2hlZFByb21pc2VzQ2FydEFuZFBpZFtwaWRdID0gUHJvbWlzZS5hbGwoW2NhbGN1bGF0ZUNhcnRUb3RhbFByb21pc2UocGlkKSwgZmV0Y2hQcm9kdWN0KFwiR0VUXCIsIHBpZCwgXCJpZCxza3UscHJpY2UsY29tcGFyZVRvUHJpY2Usd2hvbGVzYWxlUHJpY2VzLG1lZGlhKGltYWdlcyhpbWFnZU9yaWdpbmFsVXJsKSksb3B0aW9ucyh0eXBlLG5hbWUsZGVmYXVsdENob2ljZSxjaG9pY2VzKHRleHQscHJpY2VNb2RpZmllcixwcmljZU1vZGlmaWVyVHlwZSx0ZXh0VHJhbnNsYXRlZChjeSkpKVwiKSxdKS50aGVuKHYgPT4ge1xuICAgICAgICAgICAgY29uc3QgcCA9IHZbMV07XG4gICAgICAgICAgICBwLnByaWNlV2l0aERlZmF1bHRPcHRpb25zID0gcC5wcmljZSB8fCAwO1xuICAgICAgICAgICAgcC5vcHRpb25zPy5mb3JFYWNoKG8gPT4gKHAucHJpY2VXaXRoRGVmYXVsdE9wdGlvbnMgKz0gbz8uY2hvaWNlcz8uW28/LmRlZmF1bHRDaG9pY2UgfHwgMF0/LnByaWNlTW9kaWZpZXIgfHwgMCkpO1xuICAgICAgICAgICAgbG9nRHVyYXRpb24oXCJQUklDRS1BUElcIiwgXCJMb2FkZWQgcHJvZHVjdCBhbmQgY2FydCB0b3RhbC4uLlwiLCB2KSgpO1xuICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH1cbiAgICAgICAgKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluamVjdFByaWNlVXBkYXRlKGVsZW0sIGNvbXBsZXRlZENhbGxiYWNrKSB7XG4gICAgICAgIGxvZ0R1cmF0aW9uKFwiUFJJQ0VcIiwgXCJpbmplY3RQcmljZVVwZGF0ZSBhcnJpdmVkLi4uXCIpKCk7XG4gICAgICAgIC8vIGV4dGVuc2lvbiBtZXRob2Q6XG4gICAgICAgIGZ1bmN0aW9uIHF1YW50aXR5Q2hhbmdlZCgpIHtcbiAgICAgICAgICAgIGxldCBwID0gJChcIi5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtcHJpY2VcIik7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHByaWNlQ2hhbmdlZC5iaW5kKHRoaXMsIHBbMF0sIDApLCAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gV2hvbGVTYWxlUHJpY2UocXVhbnRpdHksIGN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eSwgcHJpY2UsIHJlZmVyZW5jZVByaWNlLCBjYXJ0VG90YWwgPSAwLCBzZWxlY3RlZE9wdGlvbnNSZWZlcmVuY2VQcmljZSA9IDAsIHNlbGVjdGVkT3B0aW9uc0Rpc2NvdW50ZWRQcmljZSA9IDApIHtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHkgPSBxdWFudGl0eTtcbiAgICAgICAgICAgIHRoaXMucHJpY2UgPSBwcmljZTtcbiAgICAgICAgICAgIHRoaXMucmVmZXJlbmNlUHJpY2UgPSByZWZlcmVuY2VQcmljZSB8fCBwcmljZTtcbiAgICAgICAgICAgIHRoaXMuY2FydFRvdGFsID0gY2FydFRvdGFsO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnNSZWZlcmVuY2VQcmljZSA9IHNlbGVjdGVkT3B0aW9uc1JlZmVyZW5jZVByaWNlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnNEaXNjb3VudGVkUHJpY2UgPSBzZWxlY3RlZE9wdGlvbnNEaXNjb3VudGVkUHJpY2U7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eSA9IGN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eTtcbiAgICAgICAgfVxuICAgICAgICBXaG9sZVNhbGVQcmljZS5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBnZXQgY29tcGFyZVRvUHJpY2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJlbmNlUHJpY2UgfHwgdGhpcy5wcmljZSB8fCAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCB1bml0UHJpY2VEaXNjb3VudEluY2x1ZGluZ0NhcnRJdGVtcygpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNjb3VudCA9IDEgLSB0aGlzLnByaWNlIC8gKHRoaXMuY29tcGFyZVRvUHJpY2UgfHwgdGhpcy5wcmljZSB8fCAxKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXhQb3NzaWJsZUNhcnRUb3RhbCA9IHRoaXMucXVhbnRpdHkgPiB0aGlzLmN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eSA/IHRoaXMuY2FydEFtb3VudFRvdGFsUHJpY2VXaXRoT3B0aW9uc0ZvclZpcnR1YWxRdWFudGl0eSA6IHRoaXMudG90YWxXaXRoT3B0aW9uc0ZvckN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eTtcbiAgICAgICAgICAgICAgICBjb25zdCB0b3RhbENhcnREaXNjb3VudCA9IGdldERpc2NvdW50UGVyY2VudChtYXhQb3NzaWJsZUNhcnRUb3RhbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbURpc2NvdW50ID0gLU1hdGgubWF4KGRpc2NvdW50LCB0b3RhbENhcnREaXNjb3VudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1EaXNjb3VudDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgdW5pdFByaWNlV2l0aENhcnRUb3RhbERpc2NvdW50QXBwbGllZCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1bml0UHJpY2UgPSB0aGlzLmNvbXBhcmVUb1ByaWNlICogKDEgKyB0aGlzLnVuaXRQcmljZURpc2NvdW50SW5jbHVkaW5nQ2FydEl0ZW1zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5pdFByaWNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCB1bml0UHJpY2VXaXRoQ2FydFRvdGFsRGlzY291bnRBcHBsaWVkRm9ybWF0dGVkKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVuaXRQcmljZSA9IHRoaXMudW5pdFByaWNlV2l0aENhcnRUb3RhbERpc2NvdW50QXBwbGllZDtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB1bml0UHJpY2UgPyBFY3dpZC5mb3JtYXRDdXJyZW5jeSh1bml0UHJpY2UpIDogXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBzZWxlY3RlZE9wdGlvbnNQcmljZUZvcm1hdHRlZCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zUHJpY2UgPSB0aGlzLnNlbGVjdGVkT3B0aW9uc0Rpc2NvdW50ZWRQcmljZTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBvcHRpb25zUHJpY2UgPyBFY3dpZC5mb3JtYXRDdXJyZW5jeShvcHRpb25zUHJpY2UpIDogXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBzZWxlY3RlZE9wdGlvbnNEaXNjb3VudFdpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWQoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2hvbGVTYWxlRGlzY291bnRGb3JWaXJ0dWFsUXVhbml0eSA9IDEgLSAodGhpcy5zZWxlY3RlZE9wdGlvbnNEaXNjb3VudGVkUHJpY2UgfHwgMSkgLyAodGhpcy5zZWxlY3RlZE9wdGlvbnNSZWZlcmVuY2VQcmljZSB8fCB0aGlzLnNlbGVjdGVkT3B0aW9uc0Rpc2NvdW50ZWRQcmljZSB8fCAxKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0b3RhbENhcnREaXNjb3VudCA9IGdldERpc2NvdW50UGVyY2VudCh0aGlzLmNhcnRBbW91bnRUb3RhbFByaWNlV2l0aE9wdGlvbnNGb3JWaXJ0dWFsUXVhbnRpdHkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnNEaXNjb3VudCA9IC1NYXRoLm1heCh3aG9sZVNhbGVEaXNjb3VudEZvclZpcnR1YWxRdWFuaXR5LCB0b3RhbENhcnREaXNjb3VudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnNEaXNjb3VudDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgc2VsZWN0ZWRPcHRpb25zUHJpY2VXaXRoQ2FydFRvdGFsRGlzY291bnRBcHBsaWVkKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnNQcmljZSA9IHRoaXMuc2VsZWN0ZWRPcHRpb25zUmVmZXJlbmNlUHJpY2UgKiAoMSArIHRoaXMuc2VsZWN0ZWRPcHRpb25zRGlzY291bnRXaXRoQ2FydFRvdGFsRGlzY291bnRBcHBsaWVkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uc1ByaWNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBzZWxlY3RlZE9wdGlvbnNQcmljZVdpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWRGb3JtYXR0ZWQoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uc1ByaWNlID0gdGhpcy5zZWxlY3RlZE9wdGlvbnNQcmljZVdpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gRWN3aWQuZm9ybWF0Q3VycmVuY3kob3B0aW9uc1ByaWNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCB1bml0UHJpY2VXaXRoU2VsZWN0ZWRPcHRpb25zV2l0aENhcnRUb3RhbERpc2NvdW50QXBwbGllZCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zUHJpY2UgPSB0aGlzLnNlbGVjdGVkT3B0aW9uc1ByaWNlV2l0aENhcnRUb3RhbERpc2NvdW50QXBwbGllZDtcbiAgICAgICAgICAgICAgICBjb25zdCB1bml0UHJpY2UgPSB0aGlzLnVuaXRQcmljZVdpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWQ7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0UHJpY2UgPSB1bml0UHJpY2UgKyBvcHRpb25zUHJpY2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldFByaWNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCB1bml0UHJpY2VXaXRoU2VsZWN0ZWRPcHRpb25zV2l0aENhcnRUb3RhbERpc2NvdW50QXBwbGllZEZvcm1hdHRlZCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZXRQcmljZSA9IHRoaXMudW5pdFByaWNlV2l0aFNlbGVjdGVkT3B0aW9uc1dpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gRWN3aWQuZm9ybWF0Q3VycmVuY3koc2V0UHJpY2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IHRvdGFsV2l0aE9wdGlvbnNGb3JDdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHkoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLnByaWNlICsgdGhpcy5zZWxlY3RlZE9wdGlvbnNEaXNjb3VudGVkUHJpY2UpICogdGhpcy5jdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IHRvdGFsV2l0aE9wdGlvbnNGb3JDdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHlGb3JtYXR0ZWQoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG90YWwgPSB0aGlzLnRvdGFsV2l0aE9wdGlvbnNGb3JDdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gRWN3aWQuZm9ybWF0Q3VycmVuY3kodG90YWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IGNhcnRBbW91bnRUb3RhbFdpdGhPcHRpb25zRm9yQ3VycmVudEFkZFRvQ2FydFF1YW50aXR5KCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsID0gdGhpcy5jYXJ0VG90YWwgKyB0b3RhbFdpdGhPcHRpb25zRm9yQ3VycmVudEFkZFRvQ2FydFF1YW50aXR5O1xuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgdG90YWxXaXRoT3B0aW9uc0ZvckN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eVdpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWQoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG90YWxSZWZlcmVuY2VQcmljZSA9IHRoaXMudG90YWxSZWZlcmVuY2VXaXRoT3B0aW9uc0ZvckN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eTtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNjb3VudFBlcmNlbnRJbmNsdWRpbmdDYXJ0SXRlbXMgPSB0aGlzLmRpc2NvdW50UGVyY2VudEluY2x1ZGluZ0NhcnRJdGVtcztcbiAgICAgICAgICAgICAgICBjb25zdCB0b3RhbCA9IHRvdGFsUmVmZXJlbmNlUHJpY2UgKiAoMSArIGRpc2NvdW50UGVyY2VudEluY2x1ZGluZ0NhcnRJdGVtcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCB0b3RhbFdpdGhPcHRpb25zRm9yQ3VycmVudEFkZFRvQ2FydFF1YW50aXR5V2l0aENhcnRUb3RhbERpc2NvdW50QXBwbGllZEZvcm1hdHRlZCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b3RhbCA9IHRoaXMudG90YWxXaXRoT3B0aW9uc0ZvckN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eVdpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gRWN3aWQuZm9ybWF0Q3VycmVuY3kodG90YWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IHNlbGVjdGVkT3B0aW9uc1JlZmVyZW5jZVByaWNlRm9ybWF0dGVkKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsID0gdGhpcy5zZWxlY3RlZE9wdGlvbnNSZWZlcmVuY2VQcmljZTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBFY3dpZC5mb3JtYXRDdXJyZW5jeSh0b3RhbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgdW5pdFJlZmVyZW5jZVByaWNlV2l0aE9wdGlvbnMoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG90YWxSZWZlcmVuY2VQcmljZSA9IHRoaXMuY29tcGFyZVRvUHJpY2UgKyB0aGlzLnNlbGVjdGVkT3B0aW9uc1JlZmVyZW5jZVByaWNlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbFJlZmVyZW5jZVByaWNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBkaXNjb3VudFVuaXRQcmljZVdpdGhTZWxlY3RlZE9wdGlvbnNXaXRoQ2FydFRvdGFsRGlzY291bnRBcHBsaWVkKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVuaXRSZWZlcmVuY2VQcmljZVdpdGhPcHRpb25zID0gdGhpcy51bml0UmVmZXJlbmNlUHJpY2VXaXRoT3B0aW9ucztcbiAgICAgICAgICAgICAgICBjb25zdCB1bml0UHJpY2UgPSB0aGlzLnVuaXRQcmljZVdpdGhTZWxlY3RlZE9wdGlvbnNXaXRoQ2FydFRvdGFsRGlzY291bnRBcHBsaWVkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc2NvdW50QW1vdW50ID0gLU1hdGgubWF4KHVuaXRSZWZlcmVuY2VQcmljZVdpdGhPcHRpb25zIC0gdW5pdFByaWNlLCAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzY291bnRBbW91bnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IGRpc2NvdW50VW5pdFByaWNlV2l0aFNlbGVjdGVkT3B0aW9uc1dpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWRGb3JtYXR0ZWQoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzY291bnRBbW91bnQgPSB0aGlzLmRpc2NvdW50VW5pdFByaWNlV2l0aFNlbGVjdGVkT3B0aW9uc1dpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEVjd2lkLmZvcm1hdEN1cnJlbmN5KGRpc2NvdW50QW1vdW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgdG90YWxSZWZlcmVuY2VXaXRoT3B0aW9uc0ZvckN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eSgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1bml0UmVmZXJlbmNlUHJpY2VXaXRoT3B0aW9ucyA9IHRoaXMudW5pdFJlZmVyZW5jZVByaWNlV2l0aE9wdGlvbnM7XG4gICAgICAgICAgICAgICAgY29uc3QgdG90YWwgPSB1bml0UmVmZXJlbmNlUHJpY2VXaXRoT3B0aW9ucyAqIHRoaXMuY3VycmVudEFkZFRvQ2FydFF1YW50aXR5O1xuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgdG90YWxSZWZlcmVuY2VXaXRoT3B0aW9uc0ZvckN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eUZvcm1hdHRlZCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b3RhbCA9IHRoaXMudG90YWxSZWZlcmVuY2VXaXRoT3B0aW9uc0ZvckN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBFY3dpZC5mb3JtYXRDdXJyZW5jeSh0b3RhbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgcmVmZXJlbmNlUHJpY2VGb3JtYXR0ZWQoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG90YWwgPSB0aGlzLmNvbXBhcmVUb1ByaWNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IEVjd2lkLmZvcm1hdEN1cnJlbmN5KHRvdGFsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBkaXNjb3VudEFtb3VudCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b3RhbFJlZmVyZW5jZVdpdGhPcHRpb25zRm9yQ3VycmVudEFkZFRvQ2FydFF1YW50aXR5IC0gdGhpcy50b3RhbFdpdGhPcHRpb25zRm9yQ3VycmVudEFkZFRvQ2FydFF1YW50aXR5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBkaXNjb3VudFBlcmNlbnQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xICsgdGhpcy50b3RhbFdpdGhPcHRpb25zRm9yQ3VycmVudEFkZFRvQ2FydFF1YW50aXR5IC8gKHRoaXMudG90YWxSZWZlcmVuY2VXaXRoT3B0aW9uc0ZvckN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eSB8fCB0aGlzLnRvdGFsV2l0aE9wdGlvbnNGb3JDdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHkgfHwgMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IGRpc2NvdW50UGVyY2VudFRleHQoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZHAgPSB0aGlzLmRpc2NvdW50UGVyY2VudDtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBkcCA/IGRwLnRvRml4ZWQoMSkgKyBcIiVcIiA6IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgdG90YWxQcmljZVdpdGhPcHRpb25zRm9yVmlydHVhbFF1YW50aXR5KCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVuaXRQcmljZSA9IHRoaXMucHJpY2UgKyB0aGlzLnNlbGVjdGVkT3B0aW9uc0Rpc2NvdW50ZWRQcmljZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0b3RhbCA9IHRoaXMucXVhbnRpdHkgKiB1bml0UHJpY2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBjYXJ0QW1vdW50VG90YWxQcmljZVdpdGhPcHRpb25zRm9yVmlydHVhbFF1YW50aXR5KCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcnRUb3RhbCA9IHRoaXMuY2FydFRvdGFsO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsUHJpY2VXaXRoT3B0aW9uc0ZvclZpcnR1YWxRdWFudGl0eSA9IHRoaXMudG90YWxQcmljZVdpdGhPcHRpb25zRm9yVmlydHVhbFF1YW50aXR5O1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsID0gY2FydFRvdGFsICsgdG90YWxQcmljZVdpdGhPcHRpb25zRm9yVmlydHVhbFF1YW50aXR5O1xuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgZGlzY291bnRQZXJjZW50SW5jbHVkaW5nQ2FydEl0ZW1zKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcnREaXNjb3VudFBlcmNlbnQgPSBnZXREaXNjb3VudFBlcmNlbnQodGhpcy5jYXJ0QW1vdW50VG90YWxQcmljZVdpdGhPcHRpb25zRm9yVmlydHVhbFF1YW50aXR5KTtcbiAgICAgICAgICAgICAgICBjb25zdCB3cERpc2NvdW50UGVyY2VudCA9IC10aGlzLmRpc2NvdW50UGVyY2VudDtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNjb3VudFBlcmNlbnQgPSAtTWF0aC5tYXgoY2FydERpc2NvdW50UGVyY2VudCwgd3BEaXNjb3VudFBlcmNlbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXNjb3VudFBlcmNlbnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IGRpc2NvdW50UGVyY2VudEluY2x1ZGluZ0NhcnRJdGVtc0Zvcm1hdHRlZCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkcCA9IHRoaXMuZGlzY291bnRQZXJjZW50SW5jbHVkaW5nQ2FydEl0ZW1zICogMTAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGRwID8gZHAudG9GaXhlZCgwKSArIFwiJVwiIDogXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBkaXNjb3VudEFtb3VudEluY2x1ZGluZ0NhcnRJdGVtcygpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNjb3VudEFtb3VudCA9IHRoaXMuZGlzY291bnRQZXJjZW50SW5jbHVkaW5nQ2FydEl0ZW1zICogdGhpcy50b3RhbFJlZmVyZW5jZVdpdGhPcHRpb25zRm9yQ3VycmVudEFkZFRvQ2FydFF1YW50aXR5O1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXNjb3VudEFtb3VudDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgZGlzY291bnRBbW91bnRJbmNsdWRpbmdDYXJ0SXRlbXNGb3J0bWF0dGVkKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc2NvdW50QW1vdW50ID0gdGhpcy5kaXNjb3VudEFtb3VudEluY2x1ZGluZ0NhcnRJdGVtcztcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWQgPSBkaXNjb3VudEFtb3VudCA/IEVjd2lkLmZvcm1hdEN1cnJlbmN5KGRpc2NvdW50QW1vdW50KSA6IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdHRlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHZhciBwcmljZUNoYW5naW5nLCB3aG9sZVNhbGVOZWVkc1VwZGF0ZVRpbWVvdXQ7XG4gICAgICAgICRkLmFycml2ZShcIi5kZXRhaWxzLXByb2R1Y3Qtd2hvbGVzYWxlX19yb3dcIiwgbm90T25jZU9ubHksIGVsZW0gPT4ge1xuICAgICAgICAgICAgaWYgKCFwcmljZUNoYW5naW5nKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHdob2xlU2FsZU5lZWRzVXBkYXRlVGltZW91dCk7XG4gICAgICAgICAgICAgICAgd2hvbGVTYWxlTmVlZHNVcGRhdGVUaW1lb3V0ID0gc2V0VGltZW91dCh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSAkKFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1wcmljZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgZWwgJiYgcHJpY2VDaGFuZ2VkKGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgLy8gdXNhZ2U6XG4gICAgICAgIGZ1bmN0aW9uIHByaWNlQ2hhbmdlZChlbCkge1xuICAgICAgICAgICAgaWYgKHByaWNlQ2hhbmdpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIUVjd2lkLmZvcm1hdEN1cnJlbmN5KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0ID0+IHByaWNlQ2hhbmdlZChlbCksIDUwKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmljZUNoYW5naW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGxvZ0R1cmF0aW9uKFwiUFJJQ0VcIiwgXCJBZGp1c3RpbmcgcHJpY2VzLi4uXCIpKCk7XG4gICAgICAgICAgICBsZXQgcHJvZHVjdElkID0gY3VycmVudFBhZ2U/LnByb2R1Y3RJZDtcbiAgICAgICAgICAgIHByb21pc2VDYXJ0QW5kUGlkKHByb2R1Y3RJZCkudGhlbih2YWx1ZXMgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjYXJ0VG90YWwgPSB2YWx1ZXNbMF0gfHwge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbDogMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLCBwcm9kdWN0ID0gdmFsdWVzWzFdO1xuICAgICAgICAgICAgICAgIGxldCBlID0gJChlbCk7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eSA9ICQoXCIuZGV0YWlscy1wcm9kdWN0LXB1cmNoYXNlX19xdHkgaW5wdXQ6Zmlyc3RcIikudmFsKCkgfHwgMTtcbiAgICAgICAgICAgICAgICBjdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHkgPSBjdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHkgPD0gMCA/IDEgOiBjdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHk7XG4gICAgICAgICAgICAgICAgY29uc3QgcG8gPSAkKFwiLmRldGFpbHMtcHJvZHVjdC1vcHRpb25zXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQcm9kdWN0SWQgPSBjdXJyZW50UGFnZT8ucHJvZHVjdElkO1xuICAgICAgICAgICAgICAgIHZhciB2YXRQZXJjZW50ID0gJChcIi5kZXRhaWxzLXByb2R1Y3QtcHJpY2UtdGF4X19uYW1lXCIpLnRleHQoKS5tYXRjaCgvLipcXCgoWzAtOV0rKSUuKi9pbSk7XG4gICAgICAgICAgICAgICAgdmFyIHZwID0gKDAgJiYgdmF0UGVyY2VudCAmJiBwYXJzZUZsb2F0KHZhdFBlcmNlbnRbMV0pKSB8fCAwO1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZE9wdGlvbnNQcmljZVdpdGhvdXREaXNjb3VudHMgPSAwO1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZE9wdGlvbnNQcmljZSA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkT3B0aW9uc1ByaWNlV2l0aERpc2NvdW50cyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgd2hvbGVzYWxlUHJpY2VzRGlzY291bnRzID0gW25ldyBXaG9sZVNhbGVQcmljZSgxLCAxLCBwcm9kdWN0LnByaWNlLCBwcm9kdWN0LmNvbXBhcmVUb1ByaWNlLCBjYXJ0VG90YWwudG90YWwpLCAuLi4ocHJvZHVjdC53aG9sZXNhbGVQcmljZXMgfHwgW10pLm1hcCh3ID0+IG5ldyBXaG9sZVNhbGVQcmljZSh3LnF1YW50aXR5LCB3LnF1YW50aXR5LCB3LnByaWNlLCBwcm9kdWN0LmNvbXBhcmVUb1ByaWNlLCBjYXJ0VG90YWwudG90YWwpKV07XG4gICAgICAgICAgICAgICAgY29uc3QgY2hvaWNlc1dQTWFwID0ge307XG4gICAgICAgICAgICAgICAgd2hvbGVzYWxlUHJpY2VzRGlzY291bnRzLmV2ZXJ5KCh3LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGx3ID0gd2hvbGVzYWxlUHJpY2VzRGlzY291bnRzW2kgLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEl0ZW0gPSBjdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHkgPiB3LnF1YW50aXR5ICYmIGkgPT0gd2hvbGVzYWxlUHJpY2VzRGlzY291bnRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoaSAmJiBjdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHkgPiBsdy5xdWFudGl0eSAmJiBjdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHkgPCB3LnF1YW50aXR5KSB8fCBsYXN0SXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hvbGVzYWxlUHJpY2VzRGlzY291bnRzLnNwbGljZShsYXN0SXRlbSA/IGkgKyAxIDogaSwgMCwgbmV3IFdob2xlU2FsZVByaWNlKGN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eSwgY3VycmVudEFkZFRvQ2FydFF1YW50aXR5LCB3LnByaWNlLCBwcm9kdWN0LmNvbXBhcmVUb1ByaWNlLCBjYXJ0VG90YWwudG90YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCB3cCA9IHdob2xlc2FsZVByaWNlc0Rpc2NvdW50cy5maW5kTGFzdChsdyA9PiBsdy5xdWFudGl0eSA8PSBjdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHkpO1xuICAgICAgICAgICAgICAgIHByb2R1Y3Q/Lm9wdGlvbnM/LmZvckVhY2gobyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc3QgaGFzTm9uZSA9ICEhbz8uY2hvaWNlcz8uZmluZChjID0+IC9Ob3QgSW5jbHVkZWR8V2l0aG91dCBDaGFyZ2luZy9naS50ZXN0KGMudGV4dCkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNDdXJyZW50UHJvZHVjdElkQXNPcHRpb24gPSAhIW8/LmNob2ljZXM/LmZpbmQoYyA9PiBjLnRleHRUcmFuc2xhdGVkPy5jeT8uaWQgPT0gY3VycmVudFByb2R1Y3RJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbz8uY2hvaWNlcz8uZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFMaW5rZWRQcm9kdWN0ID0gYy50ZXh0VHJhbnNsYXRlZD8uY3k7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IHBvLmZpbmQoYGlucHV0W3ZhbHVlPVwiJHtDU1MuZXNjYXBlKGMudGV4dCl9XCJdW25hbWU9XCIke0NTUy5lc2NhcGUoby5uYW1lKX1cIl1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzQWJzb2x1dGUgPSBjLnByaWNlTW9kaWZpZXJUeXBlID09IFwiQUJTT0xVVEVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxwID0ga25vd25Qcm9kdWN0U2x1Z3NbZGF0YUxpbmtlZFByb2R1Y3Q/LmlkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGx3cCA9IGxwPy53aG9sZXNhbGVQcmljZXMgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWx3cC5sZW5ndGggfHwgIWx3cC5maW5kKGx3ID0+IGx3LnF1YW50aXR5ID09IDEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbHdwLnNwbGljZSgwLCAwLCBuZXcgV2hvbGVTYWxlUHJpY2UoMSwgMSwgaXNBYnNvbHV0ZSA/IGxwPy5wcmljZSB8fCBjLnByaWNlTW9kaWZpZXIgfHwgMCA6IChscD8ucHJpY2UgfHwgMCkgKiBjLnByaWNlTW9kaWZpZXIsIGxwPy5jb21wYXJlVG9QcmljZSB8fCAwLCBjYXJ0VG90YWwudG90YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN3cCA9IGx3cC5maW5kTGFzdChsdyA9PiBsdy5xdWFudGl0eSA8PSBjdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHkpIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogbHA/LnByaWNlIHx8IGMucHJpY2VNb2RpZmllciB8fCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YW50aXR5OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hvaWNlc1dQTWFwW2Ake28ubmFtZX0uJHtjLnRleHR9YF0gPSBuZXcgV2hvbGVTYWxlUHJpY2UoY3VycmVudEFkZFRvQ2FydFF1YW50aXR5LCBjdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHksIHdwLnByaWNlLCBwcm9kdWN0LmNvbXBhcmVUb1ByaWNlLCBjYXJ0VG90YWwudG90YWwsIGlzQWJzb2x1dGUgPyBscD8uY29tcGFyZVRvUHJpY2UgfHwgbHA/LnByaWNlIHx8IGMucHJpY2VNb2RpZmllciB8fCAwIDogKHByb2R1Y3QuY29tcGFyZVRvUHJpY2UgfHwgcHJvZHVjdC5wcmljZSkgKiBjLnByaWNlTW9kaWZpZXIgfHwgMCwgY3dwLnByaWNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5pcyhcIjpjaGVja2VkXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNTZWxmID0gYy50ZXh0VHJhbnNsYXRlZD8uY3k/LmlkID09IGN1cnJlbnRQcm9kdWN0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNDdXJyZW50UHJvZHVjdElkQXNPcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hvbGVzYWxlUHJpY2VzRGlzY291bnRzLmZvckVhY2goKHcsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3Y3AgPSBsd3AuZmluZExhc3QobHcgPT4gbHcucXVhbnRpdHkgPD0gdy5xdWFudGl0eSkgfHwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiBscD8ucHJpY2UgfHwgYy5wcmljZU1vZGlmaWVyIHx8IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHk6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3LnNlbGVjdGVkT3B0aW9uc0Rpc2NvdW50ZWRQcmljZSArPSB3Y3A/LnByaWNlIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3LnNlbGVjdGVkT3B0aW9uc1JlZmVyZW5jZVByaWNlICs9IGlzQWJzb2x1dGUgPyBscD8uY29tcGFyZVRvUHJpY2UgfHwgbHA/LnByaWNlIHx8IGMucHJpY2VNb2RpZmllciA6IChwcm9kdWN0LmNvbXBhcmVUb1ByaWNlIHx8IHByb2R1Y3QucHJpY2UpICogYy5wcmljZU1vZGlmaWVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbldob2xlUHJpY2VCYXNlZE9uQ3VycmVudFF1YW50aXR5ID0gbHdwLmZpbmRMYXN0KGx3ID0+IGx3LnF1YW50aXR5IDw9IGN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eSkgfHwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHk6IGN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiBjLnByaWNlTW9kaWZpZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uUmVmZXJlbmNlUHJpY2UgPSAoaXNTZWxmID8gMCA6IGlzQWJzb2x1dGUgPyBNYXRoLm1heChkYXRhTGlua2VkUHJvZHVjdD8uY3AgfHwgMCwgYy5wcmljZU1vZGlmaWVyIHx8IDApIDogTWF0aC5tYXgoZGF0YUxpbmtlZFByb2R1Y3Q/LmNwIHx8IDAsIHByb2R1Y3QucHJpY2UgfHwgMCkgKiBjLnByaWNlTW9kaWZpZXIpIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvblByaWNlID0gKGlzU2VsZiA/IDAgOiBpc0Fic29sdXRlID8gTWF0aC5taW4ob3B0aW9uV2hvbGVQcmljZUJhc2VkT25DdXJyZW50UXVhbnRpdHk/LnByaWNlLCBjLnByaWNlTW9kaWZpZXIpIDogcHJvZHVjdC5wcmljZSAqIGMucHJpY2VNb2RpZmllcikgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb25zUHJpY2VXaXRob3V0RGlzY291bnRzICs9IG9wdGlvblJlZmVyZW5jZVByaWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZE9wdGlvbnNQcmljZSArPSBvcHRpb25QcmljZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb25zUHJpY2VXaXRoRGlzY291bnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3A6IG9wdGlvblJlZmVyZW5jZVByaWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcDogb3B0aW9uUHJpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB3b3AgPSB3aG9sZXNhbGVQcmljZXNEaXNjb3VudHMuZmluZChsdyA9PiBsdy5xdWFudGl0eSA8PSAxKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0Q3VycmVudFNhbGVVbml0UHJpY2UgPSBwcm9kdWN0LnByaWNlIHx8IDA7XG4gICAgICAgICAgICAgICAgLy9jb25zdCBwcm9kdWN0Q29tcGFyZVRvVW5pdFByaWNlID0gTWF0aC5tYXgocHJvZHVjdC5jb21wYXJlVG9QcmljZSB8fCAwLCBwcm9kdWN0Q3VycmVudFNhbGVVbml0UHJpY2UpO1xuICAgICAgICAgICAgICAgIC8vY29uc3Qgb3B0aW9uc0NvbXBhcmVUb1VuaXRQcmljZSA9IHdvcC5zZWxlY3RlZE9wdGlvbnNSZWZlcmVuY2VQcmljZTtcbiAgICAgICAgICAgICAgICAvL2NvbnN0IHRvdGFsT25lSXRlbUNvbXBhcmVUb1VuaXRQcmljZUluY2x1ZGluZ09wdGlvbnMgPSBwcm9kdWN0Q29tcGFyZVRvVW5pdFByaWNlICsgb3B0aW9uc0NvbXBhcmVUb1VuaXRQcmljZTtcbiAgICAgICAgICAgICAgICBsZXQgd3QgPSAkKFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1wcmljZS13aG9sZXNhbGVcIik7XG4gICAgICAgICAgICAgICAgaWYgKCF3dC5sZW5ndGggJiYgd2hvbGVzYWxlUHJpY2VzRGlzY291bnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgd3QgPSAkKGBcbjxkaXYgY2xhc3M9XCJwcm9kdWN0LWRldGFpbHMtbW9kdWxlIHByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1wcmljZS13aG9sZXNhbGVcIj5cbiAgPGRpdiBjbGFzcz1cInByb2R1Y3QtZGV0YWlscy1tb2R1bGVfX3RpdGxlIGVjLWhlYWRlci1oNiBkZXRhaWxzLXByb2R1Y3QtcHJpY2Utd2hvbGVzYWxlX190aXRsZVwiPiR7dHJhbnNsYXRlKFwiQnV5IG1vcmUsIHNhdmUgbW9yZVwiKX08L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInByb2R1Y3QtZGV0YWlscy1tb2R1bGVfX2NvbnRlbnQgcHJvZHVjdC1kZXRhaWxzLW1vZHVsZV9fY29udGVudC0taW5kZW50ZWRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1wcm9kdWN0LXByaWNlLXdob2xlc2FsZV9fY29udGFpbmVyXCI+XG4gICAgICA8dGFibGUgY2xhc3M9XCJkZXRhaWxzLXByb2R1Y3QtcHJpY2Utd2hvbGVzYWxlX190YWJsZVwiPlxuICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgPHRyIGNsYXNzPVwiZGV0YWlscy1wcm9kdWN0LXdob2xlc2FsZV9faGVhZGVyXCI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJkZXRhaWxzLXByb2R1Y3Qtd2hvbGVzYWxlX19jb2x1bW4gZGV0YWlscy1wcm9kdWN0LXdob2xlc2FsZV9fY29sdW1uLS1xdHkgcXR5XCI+JHt0cmFuc2xhdGUoXCJRdWFudGl0eVwiKX08L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiZGV0YWlscy1wcm9kdWN0LXdob2xlc2FsZV9fY29sdW1uIGRldGFpbHMtcHJvZHVjdC13aG9sZXNhbGVfX2NvbHVtbi0tcHJpY2UgaXRlbS1wcmljZVwiPiR7dHJhbnNsYXRlKFwiSXRlbVwiKX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPiAgICAgICAgXG4gICAgICAgIDx0Ym9keT5cbiR7d2hvbGVzYWxlUHJpY2VzRGlzY291bnRzLmZpbHRlcih3ID0+IHcucXVhbnRpdHkgPiAxKS5tYXAoKHcsIGkpID0+IGNyZWF0ZVJvdyhcInJvdy1xdHktXCIgKyB3LnF1YW50aXR5ICsgXCIgcm93LWluZGV4LVwiICsgaSwgXCJcIikpLmpvaW4oXCJcIil9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmApLmluc2VydEFmdGVyKFwiLnByb2R1Y3QtZGV0YWlsc19fYWN0aW9uLXBhbmVsLmRldGFpbHMtcHJvZHVjdC1wdXJjaGFzZVwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgd2hyID0gJChcIi5kZXRhaWxzLXByb2R1Y3QtcHJpY2Utd2hvbGVzYWxlX190YWJsZSB0aGVhZCB0clwiKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgIGlmICghd2hyLmZpbmQoXCIub3B0aW9ucy1wcmljZVwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgd2hyID0gJChgXG4gICAgICAgICAgICAgICAgLy8gPHRkIGNsYXNzPVwiZGV0YWlscy1wcm9kdWN0LXdob2xlc2FsZV9fY29sdW1uIGRldGFpbHMtcHJvZHVjdC13aG9sZXNhbGVfX2NvbHVtbi0tb3B0aW9ucy1wcmljZSBvcHRpb25zLXByaWNlXCI+JHt0cmFuc2xhdGUoXCJPcHRpb25zXCIpfTwvdGQ+XG4gICAgICAgICAgICAgICAgLy8gPHRkIGNsYXNzPVwiZGV0YWlscy1wcm9kdWN0LXdob2xlc2FsZV9fY29sdW1uIGRldGFpbHMtcHJvZHVjdC13aG9sZXNhbGVfX2NvbHVtbi0tdG90YWwtcHJpY2UgdG90YWwtcHJpY2VcIj4ke3RyYW5zbGF0ZShcIlNldCBwcmljZVwiKX08L3RkPlxuICAgICAgICAgICAgICAgIC8vIDx0ZCBjbGFzcz1cImRldGFpbHMtcHJvZHVjdC13aG9sZXNhbGVfX2NvbHVtbiBkZXRhaWxzLXByb2R1Y3Qtd2hvbGVzYWxlX19jb2x1bW4tLWRpc2NvdW50LXBlcmNlbnQgZGlzY291bnQtcGVyY2VudFwiPiR7dHJhbnNsYXRlKFwiWW91IHNhdmVcIil9PC90ZD5gKS5pbnNlcnRBZnRlcih3aHIuZmluZChcIi5kZXRhaWxzLXByb2R1Y3Qtd2hvbGVzYWxlX19jb2x1bW4tLXByaWNlXCIpKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHF0eUhlYWRlciA9IHdoci5maW5kKFwiLmRldGFpbHMtcHJvZHVjdC13aG9sZXNhbGVfX2NvbHVtbi0tcXR5XCIpO1xuICAgICAgICAgICAgICAgIGlmICghcXR5SGVhZGVyLmlzKFwiLnF0eVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBxdHlIZWFkZXIuYWRkQ2xhc3MoXCJxdHlcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGRpc2NvdW50QW1vdW50SGVhZGVyID0gd2hyLmZpbmQoXCIuZGV0YWlscy1wcm9kdWN0LXdob2xlc2FsZV9fY29sdW1uLS1kaXNjb3VudFwiKTtcbiAgICAgICAgICAgICAgICAvLyBpZiAoIWRpc2NvdW50QW1vdW50SGVhZGVyLmlzKFwiLmRpc2NvdW50LWFtb3VudFwiKSkgeyBxdHlIZWFkZXIuYWRkQ2xhc3MoXCJkaXNjb3VudC1hbW91bnRcIil9O1xuICAgICAgICAgICAgICAgIGNvbnN0IHdwciA9ICQoXCIuZGV0YWlscy1wcm9kdWN0LXByaWNlLXdob2xlc2FsZV9fdGFibGUgdGJvZHlcIik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlUm93KGNscywgcXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoYFxuICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiZGV0YWlscy1wcm9kdWN0LXdob2xlc2FsZV9fcm93ICR7Y2xzfVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImRldGFpbHMtcHJvZHVjdC13aG9sZXNhbGVfX2NvbHVtbiBkZXRhaWxzLXByb2R1Y3Qtd2hvbGVzYWxlX19jb2x1bW4tLXF0eSBxdHlcIj4ke3F0eX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImRldGFpbHMtcHJvZHVjdC13aG9sZXNhbGVfX2NvbHVtbiBkZXRhaWxzLXByb2R1Y3Qtd2hvbGVzYWxlX19jb2x1bW4tLXByaWNlIGl0ZW0tcHJpY2VcIj48c3BhbiBjbGFzc1wiZGV0YWlscy1wcm9kdWN0X193aG9sZXNhbGUtcHJpY2Ugbm90cmFuc2xhdGVcIj48L3NwYW4+PC90ZD5gICsgLy8gPHRkIGNsYXNzPVwiZGV0YWlscy1wcm9kdWN0LXdob2xlc2FsZV9fY29sdW1uIGRldGFpbHMtcHJvZHVjdC13aG9sZXNhbGVfX2NvbHVtbi0tb3B0aW9ucy1wcmljZSBvcHRpb25zLXByaWNlXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDx0ZCBjbGFzcz1cImRldGFpbHMtcHJvZHVjdC13aG9sZXNhbGVfX2NvbHVtbiBkZXRhaWxzLXByb2R1Y3Qtd2hvbGVzYWxlX19jb2x1bW4tLXRvdGFsLXByaWNlIHRvdGFsLXByaWNlXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDx0ZCBjbGFzcz1cImRldGFpbHMtcHJvZHVjdC13aG9sZXNhbGVfX2NvbHVtbiBkZXRhaWxzLXByb2R1Y3Qtd2hvbGVzYWxlX19jb2x1bW4tLWRpc2NvdW50LXBlcmNlbnQgZGlzY291bnQtcGVyY2VudFwiPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA8dGQgY2xhc3M9XCJkZXRhaWxzLXByb2R1Y3Qtd2hvbGVzYWxlX19jb2x1bW4gZGV0YWlscy1wcm9kdWN0LXdob2xlc2FsZV9fY29sdW1uLS1kaXNjb3VudCBkaXNjb3VudC1hbW91bnRcIj48c3BhbiBjbGFzcz1cImRldGFpbHMtcHJvZHVjdF9fd2hvbGVzYWxlLW9mZiBlYy10ZXh0LW11dGVkXCI+PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICBgXG48L3RyPmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXdwci5maW5kKFwiLm9uZS1pdGVtLXByaWNlXCIpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB3cHIucHJlcGVuZChjcmVhdGVSb3coXCJvbmUtaXRlbS1wcmljZVwiLCAxKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBtc3JwID0gd3ByLmZpbmQoXCIubXNycC1wcmljZVwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIW1zcnAubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHdwci5wcmVwZW5kKChtc3JwID0gJChjcmVhdGVSb3coXCJtc3JwLXByaWNlXCIsIHRyYW5zbGF0ZShcIk1TUlBcIikpKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBtc3JwVG90YWxQcmljZSA9IHdvcC50b3RhbFJlZmVyZW5jZVdpdGhPcHRpb25zRm9yQ3VycmVudEFkZFRvQ2FydFF1YW50aXR5Rm9ybWF0dGVkO1xuICAgICAgICAgICAgICAgIG1zcnAuZmluZChcIi5pdGVtLXByaWNlXCIpLnVpTnVtYmVyKHdvcC5yZWZlcmVuY2VQcmljZUZvcm1hdHRlZCwgXCJ1aS1pdGVtLXByaWNlXCIsIFwibnVtYmVyXCIsIDAsIHRyYW5zbGF0ZShcIkl0ZW0gcHJpY2VcIikpLnVpTnVtYmVyKHdvcC5zZWxlY3RlZE9wdGlvbnNSZWZlcmVuY2VQcmljZUZvcm1hdHRlZCwgXCJ1aS1pdGVtLW9wdGlvbi1wcmljZVwiLCBcIm51bWJlclwiLCAxLCB0cmFuc2xhdGUoXCJPcHRpb25zIHByaWNlXCIpICsgXCIgK1wiKS51aU51bWJlcihtc3JwVG90YWxQcmljZSwgXCJ1aS1pdGVtLXRvdGFsLXByaWNlXCIsIFwibnVtYmVyXCIsIDIsIHRyYW5zbGF0ZShcIlNldCB1bml0IHByaWNlXCIpKTtcbiAgICAgICAgICAgICAgICAvLyBtc3JwLmZpbmQoXCIub3B0aW9ucy1wcmljZVwiKS5cbiAgICAgICAgICAgICAgICAvLyAgIHVpTnVtYmVyKHdvcC5zZWxlY3RlZE9wdGlvbnNSZWZlcmVuY2VQcmljZUZvcm1hdHRlZCwgXCJ1aS1pdGVtLW9wdGlvbi1wcmljZVwiKTtcblxuICAgICAgICAgICAgICAgIC8vIG1zcnAuZmluZChcIi50b3RhbC1wcmljZVwiKS51aU51bWJlcih3b3AudG90YWxSZWZlcmVuY2VXaXRoT3B0aW9uc0ZvckN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eSwgXCJ1aS1pdGVtLXRvdGFsLXByaWNlXCIpO1xuICAgICAgICAgICAgICAgIG1zcnAudG9nZ2xlQ2xhc3MoXCJsb2FkZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IHdob2xlc2FsZVByaWNlc0Rpc2NvdW50ZWRVbml0UHJpY2UgPSBwcm9kdWN0Q3VycmVudFNhbGVVbml0UHJpY2U7XG4gICAgICAgICAgICAgICAgJCh3aG9sZXNhbGVQcmljZXNEaXNjb3VudHMpLmVhY2goKGluZGV4LCB3b3ApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHdwci5maW5kKGAuZGV0YWlscy1wcm9kdWN0LXdob2xlc2FsZV9fcm93JHtcIjpndChcIiArIGluZGV4ICsgXCIpOmZpcnN0XCJ9YCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyb3cubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cHIuYXBwZW5kKChyb3cgPSAkKGNyZWF0ZVJvdyhcInJvdy1xdHktXCIgKyB3b3AucXVhbnRpdHkgKyBcIiByb3ctaW5kZXgtXCIgKyBpbmRleCwgXCJcIikpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcm93LnRvZ2dsZUNsYXNzKFwiY3VycmVudC1wcmljZVwiLCB3cCA9PSB3b3ApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2Um93ID0gcm93LnByZXYoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG90YWwgPSB3b3AudG90YWxXaXRoT3B0aW9uc0ZvckN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eVdpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWRGb3JtYXR0ZWQ7XG4gICAgICAgICAgICAgICAgICAgIHJvdy50b2dnbGUocHJldlJvdy5hdHRyKFwidG90YWwtcHJpY2VcIikgIT0gdG90YWwpLmF0dHIoXCJ0b3RhbC1wcmljZVwiLCB0b3RhbCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICghcm93LmZpbmQoXCIub3B0aW9ucy1wcmljZVwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAkKGBcbiAgICAgICAgICAgICAgICAgICAgLy8gPHRkIGNsYXNzPVwiZGV0YWlscy1wcm9kdWN0LXdob2xlc2FsZV9fY29sdW1uIGRldGFpbHMtcHJvZHVjdC13aG9sZXNhbGVfX2NvbHVtbi0tb3B0aW9ucy1wcmljZSBvcHRpb25zLXByaWNlXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgLy8gPHRkIGNsYXNzPVwiZGV0YWlscy1wcm9kdWN0LXdob2xlc2FsZV9fY29sdW1uIGRldGFpbHMtcHJvZHVjdC13aG9sZXNhbGVfX2NvbHVtbi0tdG90YWwtcHJpY2UgdG90YWwtcHJpY2VcIj48L3RkPlxuICAgICAgICAgICAgICAgICAgICAvLyA8dGQgY2xhc3M9XCJkZXRhaWxzLXByb2R1Y3Qtd2hvbGVzYWxlX19jb2x1bW4gZGV0YWlscy1wcm9kdWN0LXdob2xlc2FsZV9fY29sdW1uLS1kaXNjb3VudC1wZXJjZW50IGRpc2NvdW50LXBlcmNlbnRcIj48L3RkPmApLmluc2VydEFmdGVyKHJvdy5maW5kKFwiLmRldGFpbHMtcHJvZHVjdC13aG9sZXNhbGVfX2NvbHVtbi0tcHJpY2VcIikpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHF0eSA9IHJvdy5maW5kKFwiLmRldGFpbHMtcHJvZHVjdC13aG9sZXNhbGVfX2NvbHVtbi0tcXR5XCIpLnRleHQoYCR7d29wLnF1YW50aXR5fSR7d29wLnF1YW50aXR5ID09IDEgJiYgd2hvbGVzYWxlUHJpY2VzRGlzY291bnRzW2luZGV4ICsgMV0/LnF1YW50aXR5ID09IDIgPyBcIlwiIDogXCIrXCJ9YCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcXR5LmlzKFwiLnF0eVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXR5LmFkZENsYXNzKFwicXR5XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghcm93WzBdLmNsaWNrUVRZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3dbMF0uY2xpY2tRVFkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93Lm9uKFwiY2xpY2tcIiwgZSA9PiAkKFwiLmRldGFpbHMtcHJvZHVjdC1wdXJjaGFzZV9fcXR5IGlucHV0XCIpLmF0dHIoXCJtYXhsZW5ndGhcIiwgNCkuYXR0cihcInBhdHRlcm5cIiwgXCJcXFxcZFwiKS5hdHRyKFwidHlwZVwiLCBcInRleHRcIikuYXR0cihcIm1heFwiLCBcIjk5OTlcIikudmFsKHdvcC5xdWFudGl0eSkudHJpZ2dlcihcImNoYW5nZVwiKS5wYXJlbnQoKS5maW5kKFwiLmZvcm0tY29udHJvbF9fcGxhY2Vob2xkZXItaW5uZXJcIikudGV4dCh3b3AucXVhbnRpdHkpICYmIHF1YW50aXR5Q2hhbmdlZCgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnNQcmljZVdpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWQgPSB3b3Auc2VsZWN0ZWRPcHRpb25zUHJpY2VXaXRoQ2FydFRvdGFsRGlzY291bnRBcHBsaWVkO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaG93U2VsZWN0ZWRPcHRpb25zQ29sdW1uID0gISFzZWxlY3RlZE9wdGlvbnNQcmljZVdpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdW5pdFByaWNlID0gcm93LmZpbmQoXCIuZGV0YWlscy1wcm9kdWN0LXdob2xlc2FsZV9fY29sdW1uLS1wcmljZTpmaXJzdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF1bml0UHJpY2UuaXMoXCIudW5pdC1wcmljZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5pdFByaWNlLmFkZENsYXNzKFwidW5pdC1wcmljZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB1bml0UHJpY2UudWlOdW1iZXIobXNycFRvdGFsUHJpY2UsIFwidWktbXNycC1pdGVtLXByaWNlXCIsIFwibnVtYmVyXCIsIDAsIHRyYW5zbGF0ZShcIk1TUlBcIikpLnVpTnVtYmVyKHdvcC51bml0UHJpY2VXaXRoQ2FydFRvdGFsRGlzY291bnRBcHBsaWVkRm9ybWF0dGVkLCBcInVpLWl0ZW0tcHJpY2VcIiwgXCJudW1iZXJcIiwgMSwgdHJhbnNsYXRlKFwiSXRlbSBwcmljZVwiKSkudWlOdW1iZXIod29wLnNlbGVjdGVkT3B0aW9uc1ByaWNlV2l0aENhcnRUb3RhbERpc2NvdW50QXBwbGllZEZvcm1hdHRlZCwgXCJ1aS1vcHRpb24tcHJpY2VcIiwgXCJudW1iZXJcIiwgMiwgdHJhbnNsYXRlKFwiT3B0aW9ucyBwcmljZVwiKSArIFwiICtcIikudWlOdW1iZXIod29wLmRpc2NvdW50VW5pdFByaWNlV2l0aFNlbGVjdGVkT3B0aW9uc1dpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWRGb3JtYXR0ZWQsIFwidWktc2V0LXNhdmVcIiwgXCJudW1iZXJcIiwgMywgdHJhbnNsYXRlKFwiWW91IHNhdmUgcGVyIHNldFwiKSkudWlOdW1iZXIod29wLmRpc2NvdW50UGVyY2VudEluY2x1ZGluZ0NhcnRJdGVtc0Zvcm1hdHRlZCwgXCJ1aS1kaXNjb3VudC1wZXJjZW50XCIsIFwicGVyY2VudFwiLCA0LCBcIlwiLCB0cmFuc2xhdGUoXCJvZmZcIikpLnVpTnVtYmVyKHdvcC51bml0UHJpY2VXaXRoU2VsZWN0ZWRPcHRpb25zV2l0aENhcnRUb3RhbERpc2NvdW50QXBwbGllZEZvcm1hdHRlZCwgXCJ1aS1zZXQtcHJpY2VcIiwgXCJudW1iZXJcIiwgNSwgdHJhbnNsYXRlKFwiU2V0IHVuaXQgcHJpY2VcIikgKyBcIiA9XCIpLnVpTnVtYmVyKHdvcC5xdWFudGl0eSwgXCJ1aS1xdWFudGl0eVwiLCBcIm51bWJlclwiLCA2LCB0cmFuc2xhdGUoXCJRdWFudGl0eSAqXCIpLCB0cmFuc2xhdGUod29wLnF1YW50aXR5ID09IDEgPyBcInNldFwiIDogXCJzZXRzXCIpKS51aU51bWJlcih3b3AudG90YWxXaXRoT3B0aW9uc0ZvckN1cnJlbnRBZGRUb0NhcnRRdWFudGl0eVdpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWRGb3JtYXR0ZWQsIFwidWktdG90YWwtcHJpY2VcIiwgXCJudW1iZXJcIiwgNywgdHJhbnNsYXRlKFwiVG90YWxcIikpLnVpTnVtYmVyKHdvcC5kaXNjb3VudEFtb3VudEluY2x1ZGluZ0NhcnRJdGVtc0ZvcnRtYXR0ZWQsIFwidWktdG90YWwtc2F2ZVwiLCBcIm51bWJlclwiLCA4LCB0cmFuc2xhdGUoXCJZb3Ugc2F2ZSBpbiB0b3RhbFwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9yb3cuZmluZChcIi5vcHRpb25zLXByaWNlXCIpLnRvZ2dsZShzaG93U2VsZWN0ZWRPcHRpb25zQ29sdW1uKVxuICAgICAgICAgICAgICAgICAgICAvLy51aU51bWJlcih3b3Auc2VsZWN0ZWRPcHRpb25zUHJpY2VXaXRoQ2FydFRvdGFsRGlzY291bnRBcHBsaWVkRm9ybWF0dGVkLCBcInVpLW9wdGlvbi1wcmljZVwiLCBcIm51bWJlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy9yb3cuZmluZChcIi50b3RhbC1wcmljZVwiKS50b2dnbGUoc2hvd1NlbGVjdGVkT3B0aW9uc0NvbHVtbilcbiAgICAgICAgICAgICAgICAgICAgLy8udWlOdW1iZXIod29wLnRvdGFsV2l0aE9wdGlvbnNGb3JDdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHlXaXRoQ2FydFRvdGFsRGlzY291bnRBcHBsaWVkRm9ybWF0dGVkLCBcInVpLXRvdGFsLXByaWNlXCIsIFwibnVtYmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAvL3Jvdy5maW5kKFwiLmRpc2NvdW50LXBlcmNlbnRcIilcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzY291bnRBbW91bnQgPSByb3cuZmluZChcIi5kZXRhaWxzLXByb2R1Y3RfX3dob2xlc2FsZS1vZmZcIikudWlOdW1iZXIod29wLmRpc2NvdW50QW1vdW50SW5jbHVkaW5nQ2FydEl0ZW1zRm9ydG1hdHRlZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZGlzY291bnRBbW91bnQuaXMoXCIuZGlzY291bnQtYW1vdW50XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNjb3VudEFtb3VudC5hZGRDbGFzcyhcImRpc2NvdW50LWFtb3VudFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByb3cudG9nZ2xlQ2xhc3MoXCJsb2FkZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc3QgdHIgPSB3cHIuY2hpbGRyZW4oXCJ0clwiKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAodHIubGVuZ3RoIC0gMSA+IHdob2xlc2FsZVByaWNlc0Rpc2NvdW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0ci5zcGxpY2UodHIubGVuZ3RoIC0gMSwgMSlbMF0pLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtc3JwLmZpbmQoXCIub3B0aW9ucy1wcmljZSwudG90YWwtcHJpY2VcIikudG9nZ2xlKCEhd3Auc2VsZWN0ZWRPcHRpb25zUHJpY2VXaXRoQ2FydFRvdGFsRGlzY291bnRBcHBsaWVkKTtcbiAgICAgICAgICAgICAgICB3aHIuZmluZChcIi5vcHRpb25zLXByaWNlLC50b3RhbC1wcmljZVwiKS50b2dnbGUoISF3cC5zZWxlY3RlZE9wdGlvbnNQcmljZVdpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWQpO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgcHJvZHVjdEN1cnJlbnRTYWxlVW5pdFByaWNlV2hvbGVTYWxlRGlzY291bnRBcHBsaWVkID0gTWF0aC5taW4ocHJvZHVjdEN1cnJlbnRTYWxlVW5pdFByaWNlLCB3aG9sZXNhbGVQcmljZXNEaXNjb3VudGVkVW5pdFByaWNlKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBjdXJyZW50UHJvZHVjdFByaWNlV2l0aE9wdGlvbnNXaXRob3V0Q2FydFRvdGFsRGlzY291bnRzID0gcHJvZHVjdEN1cnJlbnRTYWxlVW5pdFByaWNlV2hvbGVTYWxlRGlzY291bnRBcHBsaWVkICogcXVhbnRpdHkgKyBzZWxlY3RlZE9wdGlvbnNQcmljZSAqIHF1YW50aXR5O1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNhcnRTdWJ0b3RhbFdpdGhvdXREaXNjb3VudCA9IGNhcnRUb3RhbC50b3RhbCB8fCAwICsgY3VycmVudFByb2R1Y3RQcmljZVdpdGhPcHRpb25zV2l0aG91dENhcnRUb3RhbERpc2NvdW50cztcbiAgICAgICAgICAgICAgICAvLyB2YXIgdG90YWxDYXJ0RGlzY291bnRQZXJjZW50ID0gMSAtIGdldERpc2NvdW50UGVyY2VudChjYXJ0U3VidG90YWxXaXRob3V0RGlzY291bnQpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHRvdGFsUHJvZHVjdFByaWNlV2l0aE9wdGlvbnNCZWZvcmVEaXNjb3VudCA9IHByb2R1Y3RDb21wYXJlVG9Vbml0UHJpY2UgKiBxdWFudGl0eSArIHNlbGVjdGVkT3B0aW9uc1ByaWNlV2l0aG91dERpc2NvdW50cyAqIHF1YW50aXR5O1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgcHJvZHVjdFVuaXRQcmljZVdpdGhEaXNjb3VudCA9IE1hdGgubWluKHByb2R1Y3RDb21wYXJlVG9Vbml0UHJpY2UsIHByb2R1Y3RDdXJyZW50U2FsZVVuaXRQcmljZVdob2xlU2FsZURpc2NvdW50QXBwbGllZCwgcHJvZHVjdENvbXBhcmVUb1VuaXRQcmljZSAqIHRvdGFsQ2FydERpc2NvdW50UGVyY2VudCk7XG4gICAgICAgICAgICAgICAgLy8gY29uc3QgdG90YWxQcm9kdWN0UHJpY2VXaXRoRGlzY291bnQgPSBwcm9kdWN0VW5pdFByaWNlV2l0aERpc2NvdW50O1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHRvdGFsU2VsZWN0ZWRPcHRpb25zV2loRGlzY291bnRzID0gTWF0aC5taW4oc2VsZWN0ZWRPcHRpb25zUHJpY2UgKiBxdWFudGl0eSwgWzAsIC4uLnNlbGVjdGVkT3B0aW9uc1ByaWNlV2l0aERpc2NvdW50cy5tYXAobyA9PiBNYXRoLm1pbihvLmNwICogdG90YWxDYXJ0RGlzY291bnRQZXJjZW50LCBvLnApKV0ucmVkdWNlKChhLCBiKSA9PiBhICsgYikgKiBxdWFudGl0eSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc3QgdG90YWwgPSB0b3RhbFByb2R1Y3RQcmljZVdpdGhEaXNjb3VudCArIHRvdGFsU2VsZWN0ZWRPcHRpb25zV2loRGlzY291bnRzO1xuICAgICAgICAgICAgICAgIC8vIC8vYXBwbHkgdGhlIGJpZ2dlc3QgZGlzY291bnQgYmV0d2VlbiB0aGUgY3VycmVudCBzYWxlIHByaWNlIGFuZCB0aGUgYXBwbGllZCAlIGRpc2NvdW50IGZyb20gdGhlIHJlZmVyZW5jZSBwcmljZVxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGRpc2NvdW50QW1vdW50ID0gdG90YWxQcm9kdWN0UHJpY2VXaXRoT3B0aW9uc0JlZm9yZURpc2NvdW50IC0gdG90YWw7XG4gICAgICAgICAgICAgICAgLy8gY29uc3QgZGlzY291bnRQZXJjZW50ID0gKGRpc2NvdW50QW1vdW50ICogMTAwKSAvIHRvdGFsUHJvZHVjdFByaWNlV2l0aE9wdGlvbnNCZWZvcmVEaXNjb3VudDtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVByb2R1Y3RQcmljZXMoZm9ybWF0UHJpY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9uc1ByaWNlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdD8ub3B0aW9ucz8uZm9yRWFjaChvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc3QgaGFzTm9uZSA9ICEhbz8uY2hvaWNlcz8uZmluZChjID0+IC9Ob3QgSW5jbHVkZWR8V2l0aG91dCBDaGFyZ2luZy9naS50ZXN0KGMudGV4dCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzQ3VycmVudFByb2R1Y3RJZEFzT3B0aW9uID0gISFvPy5jaG9pY2VzPy5maW5kKGMgPT4gYy50ZXh0VHJhbnNsYXRlZD8uY3k/LmlkID09IGN1cnJlbnRQcm9kdWN0SWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvPy5jaG9pY2VzPy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFMaW5rZWRQcm9kdWN0ID0gYy50ZXh0VHJhbnNsYXRlZD8uY3lcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBpbnB1dCA9IHBvLmZpbmQoYGlucHV0W3ZhbHVlPVwiJHtDU1MuZXNjYXBlKGMudGV4dCl9XCJdW25hbWU9XCIke0NTUy5lc2NhcGUoby5uYW1lKX1cIl1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGxhYmVsID0gaW5wdXQuZmluZChcIn4gLmZvcm0tY29udHJvbF9faW5saW5lLWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgcGFyZW50ID0gbGFiZWwucGFyZW50cyhcIi5mb3JtLWNvbnRyb2wtLWNoZWNrYm94LWJ1dHRvblwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSAoZGF0YUxpbmtlZFByb2R1Y3Q/LmxwIHx8IGRhdGFMaW5rZWRQcm9kdWN0Py5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgJiYgcGFyZW50LmF0dHIoXCJkYXRhLWxpbmtlZC1wcm9kdWN0XCIsIGlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhTGlua2VkUHJvZHVjdD8uaWQgJiYgcGFyZW50LmF0dHIoXCJkYXRhLXJlbmRlci1wcm9kdWN0XCIsIGRhdGFMaW5rZWRQcm9kdWN0Py5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHNNZXRhZGF0YS5zZXQocGFyZW50WzBdLCBkYXRhTGlua2VkUHJvZHVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50LmF0dHIoXCJkYXRhLXNrdVwiLCBkYXRhTGlua2VkUHJvZHVjdD8ucyB8fCBrbm93blByb2R1Y3RTbHVnc1tkYXRhTGlua2VkUHJvZHVjdD8uaWRdPy5za3UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5hdHRyKFwiZGF0YS13ZWlnaHRcIiwgZGF0YUxpbmtlZFByb2R1Y3Q/LlcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmF0dHIoXCJ0aXRsZVwiLCBkYXRhTGlua2VkUHJvZHVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFMaW5rZWRQcm9kdWN0Py5pcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVPcHRpb24ocGFyZW50LmZpbmQoXCIuZm9ybS1jb250cm9sX19yYWRpb1wiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZiA9IGRhdGFMaW5rZWRQcm9kdWN0Py5pZCA9PSBwcm9kdWN0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoYy5wcmljZU1vZGlmaWVyVHlwZSA9PSBcIkFCU09MVVRFXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnN0IHAgPSBoYXNOb25lID8gYy5wcmljZU1vZGlmaWVyIDogKCA/IHByb2R1Y3QucHJpY2UgOiBjLnByaWNlTW9kaWZpZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2hvd1NpZ24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wYXJlVG9PcHRpb25QcmljZSA9IGRhdGFMaW5rZWRQcm9kdWN0Py5jcCB8fCBjLnByaWNlTW9kaWZpZXIgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd29wID0gY2hvaWNlc1dQTWFwW2Ake28ubmFtZX0uJHtjLnRleHR9YF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RVbml0UHJpY2VXaXRoRGlzY291bnQgPSB3b3AudW5pdFByaWNlV2l0aENhcnRUb3RhbERpc2NvdW50QXBwbGllZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uUHJpY2UgPSBNYXRoLm1pbihpc1NlbGYgPyBwcm9kdWN0VW5pdFByaWNlV2l0aERpc2NvdW50IDogYy5wcmljZU1vZGlmaWVyLCBpc1NlbGYgPyBwcm9kdWN0LnByaWNlIDogaGFzQ3VycmVudFByb2R1Y3RJZEFzT3B0aW9uID8gd29wLnVuaXRQcmljZVdpdGhDYXJ0VG90YWxEaXNjb3VudEFwcGxpZWQgOiB3b3Auc2VsZWN0ZWRPcHRpb25zUHJpY2VXaXRoQ2FydFRvdGFsRGlzY291bnRBcHBsaWVkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJpY2UgPSBoYXNDdXJyZW50UHJvZHVjdElkQXNPcHRpb24gPyAoaXNTZWxmID8gcHJvZHVjdFVuaXRQcmljZVdpdGhEaXNjb3VudCA6IGMucHJpY2VNb2RpZmllciA9PSAwID8gIShzaG93U2lnbiA9IGZhbHNlKSAmJiBwcm9kdWN0VW5pdFByaWNlV2l0aERpc2NvdW50IDogb3B0aW9uUHJpY2UpIDogb3B0aW9uUHJpY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYXNDdXJyZW50UHJvZHVjdElkQXNPcHRpb24gJiYgIWlzU2VsZiAmJiAhcHJpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlID0gb3B0aW9uUHJpY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93U2lnbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1cmNhcmdlTGFiZWwgPSBsYWJlbC5maW5kKFwiLm9wdGlvbi1zdXJjaGFyZ2VfX3ZhbHVlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN1cmNhcmdlTGFiZWwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbC5maW5kKFwibGFiZWxcIikuYXBwZW5kKGA8c3BhbiBjbGFzcz1cIm9wdGlvbi1zdXJjaGFyZ2UgZWMtdGV4dC1tdXRlZFwiPjxzcGFuIGNsYXNzPVwib3B0aW9uLXN1cmNoYXJnZV9fYnJhY2tldFwiPig8L3NwYW4+PHNwYW4gY2xhc3M9XCJvcHRpb24tc3VyY2hhcmdlX192YWx1ZVwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cIm9wdGlvbi1zdXJjaGFyZ2VfX2JyYWNrZXRcIj4pPC9zcGFuPjwvc3Bhbj5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cmNhcmdlTGFiZWwgPSBsYWJlbC5maW5kKFwiLm9wdGlvbi1zdXJjaGFyZ2VfX3ZhbHVlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtYXRQcmljZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGZvcm1hdHRlZFByaWNlID0gaXNTZWxmID8gRWN3aWQuZm9ybWF0Q3VycmVuY3kocHJpY2UpIDogKHByaWNlID4gMCAmJiBzaG93U2lnbiA/IFwiK1wiIDogXCJcIikgKyBFY3dpZC5mb3JtYXRDdXJyZW5jeShwcmljZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRQcmljZUxlYWQgPSAoaXNTZWxmID8gRWN3aWQuZm9ybWF0Q3VycmVuY3koTWF0aC5yb3VuZChwcmljZSkpIDogKHByaWNlID4gMCAmJiBzaG93U2lnbiA/IFwiK1wiIDogXCJcIikgKyBFY3dpZC5mb3JtYXRDdXJyZW5jeShwcmljZS50b0ZpeGVkKDApKSkucmVwbGFjZSgvWy4sXTAwIC8sIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VyY2FyZ2VMYWJlbC51aU51bWJlcihwcmljZSA9PSAwID8gXCJcIiA6IGZvcm1hdHRlZFByaWNlTGVhZCwgXCJ1aS1zdXJjaGFyZ2VcIiwgXCJpbnRcIiwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgMTYwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbFByaWNlID0gTWF0aC5tYXgoYz8ucHJpY2VNb2RpZmllciB8fCAwLCBjb21wYXJlVG9PcHRpb25QcmljZSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uUHJpY2UgPCBvcmlnaW5hbFByaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VyY2FyZ2VMYWJlbC5hdHRyKFwiZGF0YS10aXRsZVwiLCBgJHt0cmFuc2xhdGUoXCJXYXNcIil9ICR7c3RyaWtlKEVjd2lkLmZvcm1hdEN1cnJlbmN5KG9yaWdpbmFsUHJpY2UpKX1cXHJcXG5gICsgYCR7dHJhbnNsYXRlKFwiU2F2ZVwiKX0gJHtFY3dpZC5mb3JtYXRDdXJyZW5jeSgtb3JpZ2luYWxQcmljZSArIG9wdGlvblByaWNlKX1cXHJcXG5gICsgYCR7LU1hdGguZmxvb3IoMTAwIC0gKG9wdGlvblByaWNlICogMTAwKSAvIG9yaWdpbmFsUHJpY2UpfSVcXHJcXG5gICsgYCR7dHJhbnNsYXRlKFwiTm93XCIpfSAke0Vjd2lkLmZvcm1hdEN1cnJlbmN5KG9wdGlvblByaWNlKX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cmNhcmdlTGFiZWwuYXR0cihcImRhdGEtdGl0bGVcIiwgRWN3aWQuZm9ybWF0Q3VycmVuY3kob3B0aW9uUHJpY2UpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXJjYXJnZUxhYmVsLmNsb3Nlc3QoXCIub1wiKS5hdHRyKFwiYW1vdW50XCIsIHByaWNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdXBkYXRlQ29tYm9Qcm9kdWN0QmFja2dyb3VuZE92ZXJsYXkocHJvZHVjdCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlUHJvZHVjdFByaWNlcyh0cnVlKTtcbiAgICAgICAgICAgICAgICAvLyB2YXIgdnEgPSBwICogcXVhbnRpdHk7XG4gICAgICAgICAgICAgICAgLy8gdnEgPSB2cSAqICgxLjAgLSB3aG9sZXNhbGVQcmljZXNEaXNjb3VudGVkUHJpY2UpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHByaWNlV2l0aG91dERpc2NvdW50QW1vdW50ID0gcCAqIHF1YW50aXR5O1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHByaWNlV2l0aG91dERpc2NvdW50TWF4ID0gTWF0aC5tYXgocHJpY2VXaXRob3V0RGlzY291bnRBbW91bnQsIHByb2R1Y3QuY29tcGFyZVRvUHJpY2UgKiBxdWFudGl0eSk7XG4gICAgICAgICAgICAgICAgLy8gdmFyIGRpc2NvdW50UGVyY2VudCA9IGdldERpc2NvdW50UGVyY2VudCh2cSArIGNhcnRUb3RhbC50b3RhbCk7XG4gICAgICAgICAgICAgICAgLy8gZGlzY291bnRQZXJjZW50ID0gTWF0aC5tYXgod2hvbGVzYWxlUHJpY2VzRGlzY291bnRlZFByaWNlLCBkaXNjb3VudFBlcmNlbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gLy9kaXNjb3VudCA9IE1hdGgubWF4KGRpc2NvdW50LCAwLjIpOy8vMjAlIG9mZiBvbiBldmVyeXRoaW5nIFBST01PIExBVU5DSFxuICAgICAgICAgICAgICAgIC8vIC8vZGlzY291bnQgPSAwO1xuICAgICAgICAgICAgICAgIC8vIHZhciBkaXNjb3VudGVkUHJpY2UgPSAocCAtIHAgKiBkaXNjb3VudFBlcmNlbnQpICogcXVhbnRpdHk7XG4gICAgICAgICAgICAgICAgLy8gZGlzY291bnRlZFByaWNlID0gTWF0aC5taW4oZGlzY291bnRlZFByaWNlLCBwcm9kdWN0LnByaWNlV2l0aERlZmF1bHRPcHRpb25zICogcXVhbnRpdHkpO1xuICAgICAgICAgICAgICAgIC8vIGxldCBkcCA9IEVjd2lkLmZvcm1hdEN1cnJlbmN5KGRpc2NvdW50ZWRQcmljZSk7XG4gICAgICAgICAgICAgICAgLy8gbGV0IGRpc2NvdW50ZWRBbW91bnQgPSBNYXRoLm1heChwcm9kdWN0LmNvbXBhcmVUb1ByaWNlLCBwcm9kdWN0LnByaWNlKSAtIGRpc2NvdW50ZWRQcmljZTsgLy8gICAocCAqIGRpc2NvdW50ICogcXVhbnRpdHkpIC8gMS4wO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGRpc2NvdW50Q29tcGFyZWRUb09yaWdpbmFsUHJpY2UgPSBwcmljZVdpdGhvdXREaXNjb3VudE1heCAtIChwIC0gKHAgKiBkaXNjb3VudFBlcmNlbnQgKiBxdWFudGl0eSkgLyAxLjApO1xuICAgICAgICAgICAgICAgIC8vIGRpc2NvdW50ZWRBbW91bnQgPSBNYXRoLm1heChkaXNjb3VudGVkQW1vdW50LCBkaXNjb3VudENvbXBhcmVkVG9PcmlnaW5hbFByaWNlKTtcbiAgICAgICAgICAgICAgICAvLyB2YXIgZGlzY291bnRlZCA9IEVjd2lkLmZvcm1hdEN1cnJlbmN5KGRpc2NvdW50ZWRBbW91bnQpO1xuICAgICAgICAgICAgICAgIC8vIGRpc2NvdW50UGVyY2VudCA9IE1hdGgubWF4KHdob2xlc2FsZVByaWNlc0Rpc2NvdW50ZWRQcmljZSwgZGlzY291bnRQZXJjZW50LCBkaXNjb3VudENvbXBhcmVkVG9PcmlnaW5hbFByaWNlIC8gcHJpY2VXaXRob3V0RGlzY291bnRNYXgpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHByaWNlV2l0aG91dERpc2NvdW5Gb3JtYXR0ZWQgPSBFY3dpZC5mb3JtYXRDdXJyZW5jeShwcmljZVdpdGhvdXREaXNjb3VudE1heCk7XG4gICAgICAgICAgICAgICAgLy9jb25zdCBwcmljZVdpdGhvdXREaXNjb3VuRm9ybWF0dGVkID0gRWN3aWQuZm9ybWF0Q3VycmVuY3koY3VycmVudFByb2R1Y3RQcmljZVdpdGhPcHRpb25zV2l0aG91dENhcnRUb3RhbERpc2NvdW50cyk7XG4gICAgICAgICAgICAgICAgLy9jb25zdCBwcmljZVdpdGhvdXREaXNjb3VudHNGb3JtYXR0ZWQgPSBFY3dpZC5mb3JtYXRDdXJyZW5jeSh0b3RhbFByb2R1Y3RQcmljZVdpdGhPcHRpb25zQmVmb3JlRGlzY291bnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlUHJvZHVjdFByaWNlcyh0cnVlKTtcblxuICAgICAgICAgICAgICAgIHZhciBwYyA9IGUucGFyZW50cyhcIi5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtcHJpY2Utcm93XCIpO1xuICAgICAgICAgICAgICAgIGxldCBwY2UgPSBwY1swXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjbCA9IFwicHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXByaWNlLXJvdy0temVyby1wcmljZVwiO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsZSA9IFwicHJvZHVjdC1kZXRhaWxzLS16ZXJvLXByaWNlXCI7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc3luY1Byb2R1Y3RXaXRoWmVyb1ByaWNlQ2xhc3NDaGFuZ2UoKSB7XG4gICAgICAgICAgICAgICAgICAgICRkLnRvZ2dsZUNsYXNzKGNsLCAkKFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1wcmljZS1yb3dcIikuaGFzQ2xhc3MoY2wpIHx8ICQoXCIucHJvZHVjdC1kZXRhaWxzLS1kZXNjcmlwdGlvbi1iYXNpY1wiKS5oYXNDbGFzcyhjbGUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBjZSAmJiAhcGNlLm9ic2VydmVDbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHBjZS5vYnNlcnZlQ2xhc3NlcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHBjLmNsYXNzQ2hhbmdlKHN5bmNQcm9kdWN0V2l0aFplcm9QcmljZUNsYXNzQ2hhbmdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGNlID0gJChcIi5wcm9kdWN0LWRldGFpbHMtLWRlc2NyaXB0aW9uLWJhc2ljXCIpWzBdO1xuICAgICAgICAgICAgICAgIGlmIChwY2UgJiYgIXBjZS5vYnNlcnZlQ2xhc3Nlcykge1xuICAgICAgICAgICAgICAgICAgICBwY2Uub2JzZXJ2ZUNsYXNzZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBwYy5jbGFzc0NoYW5nZShzeW5jUHJvZHVjdFdpdGhaZXJvUHJpY2VDbGFzc0NoYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN5bmNQcm9kdWN0V2l0aFplcm9QcmljZUNsYXNzQ2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFwYy5maW5kKFwiLmRldGFpbHMtcHJvZHVjdC1wcmljZS1jb21wYXJlX19jb250YWluZXIucHJvZHVjdC1kZXRhaWxzLW1vZHVsZV9fY29udGVudFwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5maW5kKFwiLmRldGFpbHMtcHJvZHVjdC1wcmljZV9fdmFsdWVcIikudG9nZ2xlQ2xhc3MoXCJwcmljZS13aXRob3V0LWRpc2NvdW50IGZhZGUtaW4tb3V0XCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBwYy5hcHBlbmQoJCgnPGRpdiBjbGFzcz1cImRldGFpbHMtcHJvZHVjdC1wcmljZS1jb21wYXJlX19jb250YWluZXIgcHJvZHVjdC1kZXRhaWxzLW1vZHVsZV9fY29udGVudFwiPjxzcGFuIGNsYXNzPVwiZGV0YWlscy1wcm9kdWN0LXByaWNlLWNvbXBhcmVfX3ZhbHVlIGVjLXRleHQtbXV0ZWQgbm90cmFuc2xhdGVcIj48L3NwYW4+IDxzcGFuIGNsYXNzPVwicHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXByaWNlLWRpc2NvdW50XCI+PHNwYW4gY2xhc3M9XCJkZXRhaWxzLXByb2R1Y3QtcHJpY2UtZGlzY291bnRfX3RleHRcIj48L3NwYW4+IDxzcGFuIGNsYXNzPVwiZGV0YWlscy1wcm9kdWN0LXByaWNlLWRpc2NvdW50X192YWx1ZSBub3RyYW5zbGF0ZVwiPjwvc3Bhbj48L3NwYW4+PHNwYW4gY2xhc3M9XCJ3aXRoLWRpc2NvdW50LXBlcmNlbnQgZmFkZS1pbi1vdXRcIj4gPGI+PC9iPjwvc3Bhbj48c3BhbiBjbGFzcz1cImRldGFpbHMtcHJvZHVjdC1wcmljZV9fdmFsdWUgcHJpY2Utd2l0aC1kaXNjb3VudCBmYWRlLWluLW91dCBlYy1wcmljZS1pdGVtIG5vdHJhbnNsYXRlXCI+PC9zcGFuPjwvZGl2PicpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKCFlLmZpbmQoJy5kZXRhaWxzLXByb2R1Y3QtcHJpY2VfX3ZhbHVlLnByaWNlLXdpdGgtZGlzY291bnQnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGUuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZGV0YWlscy1wcm9kdWN0LXByaWNlX192YWx1ZSBwcmljZS13aXRoLWRpc2NvdW50IGVjLXByaWNlLWl0ZW0gbm90cmFuc2xhdGVcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgcHdkID0gZS5maW5kKFwiLnByaWNlLXdpdGhvdXQtZGlzY291bnRcIik7XG4gICAgICAgICAgICAgICAgdmFyIHNpZGViYXIgPSBwYy5wYXJlbnRzKFwiLnByb2R1Y3QtZGV0YWlsc19fc2lkZWJhclwiKTtcbiAgICAgICAgICAgICAgICB2YXIgcHVyY2hhc2UgPSBzaWRlYmFyLmZpbmQoXCIuZGV0YWlscy1wcm9kdWN0LXB1cmNoYXNlXCIpO1xuICAgICAgICAgICAgICAgIHZhciBpblN0b2NrID0gcHVyY2hhc2UuZmluZChcIi5kZXRhaWxzLXByb2R1Y3QtcHVyY2hhc2VfX3BsYWNlXCIpO1xuICAgICAgICAgICAgICAgIHZhciBpblN0b2NrVGV4dCA9IGluU3RvY2sudGV4dCgpO1xuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFByaWNlVGF4ZXNEaXYgPSBwYy5maW5kKFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1wcmljZS10YXhlczpmaXJzdFwiKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJpY2VUYXhlc0RpdiA9IHBjLmZpbmQoXCIucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXByaWNlLXRheGVzOmd0KDApXCIpO1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsUHJpY2VUYXhlc0Rpdi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmljZVRheGVzRGl2Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW9yaWdpbmFsUHJpY2VUYXhlc0Rpdi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXByaWNlLXJvdyAucHJvZHVjdC1kZXRhaWxzLW1vZHVsZV9fY29udGVudFwiKS5hcHBlbmQoKG9yaWdpbmFsUHJpY2VUYXhlc0RpdiA9ICQoXCI8ZGl2Lz5cIikuYWRkQ2xhc3MoXCJwcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtcHJpY2UtdGF4ZXMgZWMtdGV4dC1tdXRlZCBub3RyYW5zbGF0ZVwiKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUHJpY2VUYXhlc0Rpdi5hZnRlcigocHJpY2VUYXhlc0RpdiA9ICQob3JpZ2luYWxQcmljZVRheGVzRGl2LnByb3AoXCJvdXRlckhUTUxcIikpLnNob3coKS50b2dnbGVDbGFzcyhcInByb2R1Y3Qtc3RvY2stc3RhdHVzLWFuZC1vcmlnaW5hbC1wcmljZVwiLCB0cnVlKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgcHJpY2VJblN0b2NrTGFiZWwgPSBwcmljZVRheGVzRGl2LmZpbmQoXCIuaW4tc3RvY2stbGFiZWxcIik7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmljZUluU3RvY2tMYWJlbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VJblN0b2NrTGFiZWwgPSBwcmljZUluU3RvY2tMYWJlbC5sZW5ndGggPyBwcmljZUluU3RvY2tMYWJlbCA6ICQoXCI8c3BhbiAvPlwiKS5hZGRDbGFzcyhcImluLXN0b2NrLWxhYmVsXCIpLnByZXBlbmRUbyhwcmljZVRheGVzRGl2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHByaWNlV2l0aG91dERpc2NvdW50ID0gcHJpY2VUYXhlc0Rpdi5maW5kKFwiLnByaWNlLXdpdGhvdXQtZGlzY291bnRcIik7XG4gICAgICAgICAgICAgICAgLy9hZGQgYSBuZXcgcHJpY2Utd2l0aG91dCBkaXNjb3VudCBsYWJsZSBpbiB0aGUgJ0luIHN0b2NrJyBsYWJlbCwgdG8gaGF2ZSBhbGwgaW4gdGhlIHNhbWUgcm93XG4gICAgICAgICAgICAgICAgcHJpY2VXaXRob3V0RGlzY291bnQgPSBwcmljZVdpdGhvdXREaXNjb3VudC5sZW5ndGggPyBwcmljZVdpdGhvdXREaXNjb3VudCA6ICQoXCI8c3Bhbi8+XCIpLmFkZENsYXNzKFwiZGV0YWlscy1wcm9kdWN0LXByaWNlX192YWx1ZSBmYWRlLWluLW91dCBlYy1wcmljZS1pdGVtIG5vdHJhbnNsYXRlIHByaWNlLXdpdGhvdXQtZGlzY291bnRcIikuYXBwZW5kVG8ocHJpY2VUYXhlc0Rpdik7XG4gICAgICAgICAgICAgICAgd3AuY3VycmVudEFkZFRvQ2FydFF1YW50aXR5ID0gY3VycmVudEFkZFRvQ2FydFF1YW50aXR5O1xuICAgICAgICAgICAgICAgIGNvbnN0IHByaWNlV2l0aG91dERpc2NvdW50c0Zvcm1hdHRlZCA9IHdwLnRvdGFsUmVmZXJlbmNlV2l0aE9wdGlvbnNGb3JDdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHlGb3JtYXR0ZWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzY291bnRBbW91bnQgPSB3cC5kaXNjb3VudEFtb3VudEluY2x1ZGluZ0NhcnRJdGVtcztcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNjb3VudEFtb3VudEZvcm1hdHRlZCA9IHdwLmRpc2NvdW50QW1vdW50SW5jbHVkaW5nQ2FydEl0ZW1zRm9ydG1hdHRlZDtcbiAgICAgICAgICAgICAgICBjb25zdCB0b3RhbEZvcm1hdHRlZCA9IHdwLnRvdGFsV2l0aE9wdGlvbnNGb3JDdXJyZW50QWRkVG9DYXJ0UXVhbnRpdHlXaXRoQ2FydFRvdGFsRGlzY291bnRBcHBsaWVkRm9ybWF0dGVkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc2NvdW50UGVyY2VudEZvcm1hdHRlZCA9IHdwLmRpc2NvdW50UGVyY2VudEluY2x1ZGluZ0NhcnRJdGVtc0Zvcm1hdHRlZDtcbiAgICAgICAgICAgICAgICBwd2QudGV4dChwcmljZVdpdGhvdXREaXNjb3VudHNGb3JtYXR0ZWQpO1xuICAgICAgICAgICAgICAgIHByaWNlV2l0aG91dERpc2NvdW50LnVpTnVtYmVyKHByaWNlV2l0aG91dERpc2NvdW50c0Zvcm1hdHRlZCwgXCJ1aS1wcmljZS1tc3JwXCIsIFwibnVtYmVyXCIsIDAsIFwiXCIsIFwiXCIsIFwiXCIsIDYwMCk7XG4gICAgICAgICAgICAgICAgLy91cGRhdGUgdGhlIG9sZCBwcmljZSB3aXRob3V0IGRpc2NvdW50IHRhcmdldCBsYWJlbFxuICAgICAgICAgICAgICAgIHByaWNlV2l0aG91dERpc2NvdW50LnRvZ2dsZUNsYXNzKFwic2hvdy1wcmljZS13aXRob3V0LWRpc2NvdW50XCIsIGRpc2NvdW50QW1vdW50IDwgMCk7XG4gICAgICAgICAgICAgICAgcHJpY2VJblN0b2NrTGFiZWwudGV4dChpblN0b2NrVGV4dCA/IGAke2luU3RvY2tUZXh0fS4gYCA6IFwiXCIpO1xuXG4gICAgICAgICAgICAgICAgcGMuZmluZChcIi5wcmljZS13aXRoLWRpc2NvdW50XCIpLnVpTnVtYmVyKHRvdGFsRm9ybWF0dGVkLCBcInVpLWFkZC10by1jYXJ0LXRvdGFsXCIsIFwibnVtYmVyXCIsIDAsIFwiXCIsIFwiXCIsIFwiXCIsIDYwMCk7XG4gICAgICAgICAgICAgICAgLy8kZC50b2dnbGVDbGFzcygncHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXByaWNlLXJvdy0temVyby1wcmljZScsIGRpc2NvdW50ZWRQcmljZSA8PSAwKTtcblxuICAgICAgICAgICAgICAgICQoXCIuZGV0YWlscy1wcm9kdWN0LXByaWNlLWNvbXBhcmVfX3ZhbHVlXCIpLnRleHQoRWN3aWQuZm9ybWF0Q3VycmVuY3kocCkpO1xuICAgICAgICAgICAgICAgIGlmICghcGMuZmluZChcIi53aXRoLWRpc2NvdW50LXBlcmNlbnRcIikubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBjLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJ3aXRoLWRpc2NvdW50LXBlcmNlbnRcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHdkcCA9ICQoXCIud2l0aC1kaXNjb3VudC1wZXJjZW50XCIpO1xuICAgICAgICAgICAgICAgIGlmICghd2RwLmZpbmQoXCIgPiBiXCIpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB3ZHAuaHRtbChcIiA8Yj48L2I+XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXdkcC5maW5kKFwiID4gZFwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgd2RwLmFwcGVuZChcIjxkPig8dj48L3Y+KTwvZD5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdkcC5maW5kKFwiPiBiLCA+IGRcIikudG9nZ2xlKGRpc2NvdW50QW1vdW50IDwgMCk7XG4gICAgICAgICAgICAgICAgd2RwLmZpbmQoXCIgPiBiXCIpLnVpTnVtYmVyKGRpc2NvdW50QW1vdW50Rm9ybWF0dGVkLCBcInVpLWRpc2NvdW50LWFtb3VudFwiLCBcIm51bWJlclwiLCAwLCBcIlwiLCBcIlwiLCBcIlwiLCA2MDApO1xuICAgICAgICAgICAgICAgIHdkcC5maW5kKFwiID4gZCA+IHZcIikuYXR0cihcInRpdGxlXCIsIGRpc2NvdW50UGVyY2VudEZvcm1hdHRlZCkudWlOdW1iZXIoZGlzY291bnRQZXJjZW50Rm9ybWF0dGVkLCBcInVpLWRpc2NvdW50LXBlcmNlbnRcIiwgXCJwZXJjZW50XCIsIDAsIFwiXCIsIFwiXCIsIFwiXCIsIDYwMCk7XG4gICAgICAgICAgICAgICAgLy9wcmljZUNoYW5nZWQoZGlzY291bnRlZFByaWNlKTtcbiAgICAgICAgICAgICAgICAvLyBpZiAoaXNOYU4ocCkpXG4gICAgICAgICAgICAgICAgLy8gICAgIGRlYnVnZ2VyO1xuICAgICAgICAgICAgICAgIC8vZWxzZVxuICAgICAgICAgICAgICAgIGhpZGVTY3JlZW5Mb2FkaW5nKCk7XG4gICAgICAgICAgICAgICAgbG9nRHVyYXRpb24oXCJQUklDRVwiLCBgQWRqdXN0ZWQgcHJpY2VzIGZyb20gJHtwcmljZVdpdGhvdXREaXNjb3VudHNGb3JtYXR0ZWR9IHRvICR7dG90YWxGb3JtYXR0ZWR9LiBEaXNjb3VudGVkOiAke2Rpc2NvdW50QW1vdW50Rm9ybWF0dGVkfSAoJHtkaXNjb3VudFBlcmNlbnRGb3JtYXR0ZWR9JSl9YCwgZWwpKCk7XG4gICAgICAgICAgICAgICAgLy9UcnkoaW5qZWN0UHJvZHVjdERldGFpbHNBY3Rpb25CdXR0b25zKTtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWRDYWxsYmFjayAmJiBjb21wbGV0ZWRDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIC8vc2hvd0FjdGlvbkJhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS5maW5hbGx5KHQgPT4gKHByaWNlQ2hhbmdpbmcgPSBmYWxzZSkpO1xuICAgICAgICB9XG4gICAgICAgIGQuYXJyaXZlKFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1wcmljZVwiLCBub3RPbmNlT25seSwgZWxlbSA9PiB7XG4gICAgICAgICAgICAvL1RyeShtYXJrT3V0T2ZTdG9ja1Byb2R1Y3RPcHRpb25zKTtcbiAgICAgICAgICAgIHZhciBwID0gJChlbGVtKTtcbiAgICAgICAgICAgIGlmICghcC5oYXNDbGFzcyhcInByaWNlLWxpdmVcIikpIHtcbiAgICAgICAgICAgICAgICBwLnRvZ2dsZUNsYXNzKFwicHJpY2UtbGl2ZVwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBwLmNsYXNzQ2hhbmdlKGVsZW0gPT4gc2V0VGltZW91dCh0ID0+IHByaWNlQ2hhbmdlZChlbGVtKSwgMTAwKSk7XG4gICAgICAgICAgICAgICAgcHJpY2VDaGFuZ2VkKGVsZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGxldCBoYXNBZGRCdXR0b25zID0gJChcIi5kZXRhaWxzLXByb2R1Y3QtcHVyY2hhc2VfX2FkZC1idXR0b25zXCIpO1xuICAgICAgICAkZC50b2dnbGVDbGFzcyhcImhhcy1hZGQtbW9yZS1idXR0b25cIiwgaGFzQWRkQnV0dG9ucy5maW5kKFwiLmRldGFpbHMtcHJvZHVjdC1wdXJjaGFzZV9fYWRkLW1vcmU6dmlzaWJsZVwiKSk7XG4gICAgICAgIGQuYXJyaXZlKFwiLmRldGFpbHMtcHJvZHVjdC1wdXJjaGFzZV9fcXR5XCIsIG9uY2VPbmx5LCBlbGVtID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtLndyYXBwZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGVtLndyYXBwZWQgPSB0cnVlO1xuICAgICAgICAgICAgZWxlbSA9ICQoZWxlbSk7XG4gICAgICAgICAgICBlbGVtLmZpbmQoXCJpbnB1dFwiKS5vbihcImNoYW5nZVwiLCBmaXhQcm9kdWN0V2VpZ2h0KTtcbiAgICAgICAgICAgICQoJzxkaXYgY2xhc3M9XCJxdWFudGl0eS1uYXZcIj48YnV0dG9uIGNsYXNzPVwicXVhbnRpdHktYnV0dG9uIHF1YW50aXR5LXVwXCI+Jmx0OzwvYnV0dG9uPjxidXR0b24gY2xhc3M9XCJxdWFudGl0eS1idXR0b24gcXVhbnRpdHktZG93blwiPiZndDs8L2J1dHRvbj48L2Rpdj4nKS5pbnNlcnRBZnRlcihlbGVtLmZpbmQoXCIuZm9ybS1jb250cm9sX19wbGFjZWhvbGRlclwiKSk7XG4gICAgICAgICAgICBjb25zdCBidG5VcCA9IGVsZW0uZmluZChcIi5xdWFudGl0eS11cFwiKVxuICAgICAgICAgICAgICAgICwgYnRuRG93biA9IGVsZW0uZmluZChcIi5xdWFudGl0eS1kb3duXCIpXG4gICAgICAgICAgICAgICAgLCBpbnB1dCA9IGVsZW0uZmluZChcImlucHV0OmZpcnN0XCIpXG4gICAgICAgICAgICAgICAgLCBwbGFjZWhvbGRlciA9IGVsZW0uZmluZChcIi5mb3JtLWNvbnRyb2xfX3BsYWNlaG9sZGVyLWlubmVyXCIpXG4gICAgICAgICAgICAgICAgLCBtaW4gPSBpbnB1dC5hdHRyKFwibWluXCIpXG4gICAgICAgICAgICAgICAgLCBtYXggPSBpbnB1dC5hdHRyKFwibWF4XCIpIHx8IDk5OTtcbiAgICAgICAgICAgIGlucHV0LnZhbChwbGFjZWhvbGRlci50ZXh0KCkgfHwgMSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBhZGp1c3RWYWx1ZSgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBpbnB1dC52YWwoKSB8fCBwbGFjZWhvbGRlci50ZXh0KCkgfHwgXCIxXCI7XG4gICAgICAgICAgICAgICAgZWxlbS50b2dnbGVDbGFzcyhcIm1pblwiLCB2YWwgPT0gXCIxXCIpLnRvZ2dsZUNsYXNzKFwib25lXCIsIHZhbCA8IDEwKS50b2dnbGVDbGFzcyhcInR3b1wiLCB2YWwgPj0gMTAgJiYgdmFsIDwgMTAwKS50b2dnbGVDbGFzcyhcInRocmVlXCIsIHZhbCA+PSAxMDAgJiYgdmFsIDwgMTAwMCkudG9nZ2xlQ2xhc3MoXCJmb3VyXCIsIHZhbCA+PSAxMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlucHV0WzBdPy5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGFkanVzdFZhbHVlKTtcbiAgICAgICAgICAgIGlucHV0WzBdPy5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgZSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbCgpID09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbChwbGFjZWhvbGRlci50ZXh0KCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICwgdHJ1ZSk7XG4gICAgICAgICAgICBhZGp1c3RWYWx1ZSgpO1xuXG4gICAgICAgICAgICBidG5VcC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gcGFyc2VGbG9hdChpbnB1dC52YWwoKSB8fCBwbGFjZWhvbGRlci50ZXh0KCkpO1xuICAgICAgICAgICAgICAgIGlmIChvbGRWYWx1ZSA+PSBtYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1ZhbCA9IG9sZFZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdWYWwgPSBvbGRWYWx1ZSArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlucHV0LnZhbChuZXdWYWwpLnRyaWdnZXIoXCJjaGFuZ2VcIilbMF0/LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2hhbmdlXCIpKTtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlci50ZXh0KG5ld1ZhbCk7XG4gICAgICAgICAgICAgICAgYWRqdXN0VmFsdWUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBidG5Eb3duLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkVmFsdWUgPSBwYXJzZUZsb2F0KGlucHV0LnZhbCgpIHx8IHBsYWNlaG9sZGVyLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgaWYgKG9sZFZhbHVlIDw9IG1pbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3VmFsID0gb2xkVmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1ZhbCA9IG9sZFZhbHVlIC0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5wdXQudmFsKG5ld1ZhbCkudHJpZ2dlcihcImNoYW5nZVwiKVswXT8uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjaGFuZ2VcIikpO1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyLnRleHQobmV3VmFsKTtcbiAgICAgICAgICAgICAgICBhZGp1c3RWYWx1ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWlucHV0WzBdPy5saXN0ZW5Ub1F1YW5pdHlDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXRbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRbMF0ubGlzdGVuVG9RdWFuaXR5Q2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5wdXRbMF0/LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgcXVhbnRpdHlDaGFuZ2VkKTtcbiAgICAgICAgICAgICAgICBpbnB1dFswXT8uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBxdWFudGl0eUNoYW5nZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVuaW5qZWN0UHJpY2VVcGRhdGUoc2VsZWN0b3IsIGdyb3VwLCBncm91cEl0ZW0sIHNlbGVjdG9ySXRlbSkge1xuICAgICAgICBkLnVuYmluZEFycml2ZShcIi5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtcHJpY2VcIik7XG4gICAgfVxuICAgIHZhciBkZWxheVNob3dUaW1lb3V0O1xuICAgIGZ1bmN0aW9uIG9uT3B0aW9uSW1hZ2VIb3ZlcihlKSB7XG4gICAgICAgIGNvbnN0IG1vYmlsZVRvdWNoRW5kZWQgPSB0aGlzID09IHRydWU7XG4gICAgICAgIGlmIChlLnRhcmdldD8udG91Y2hFbmRUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoZS50YXJnZXQudG91Y2hFbmRUaW1lb3V0KTtcbiAgICAgICAgICAgIGRlbGV0ZSBlLnRhcmdldC50b3VjaEVuZFRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdG91Y2hFbmRUaW1lb3V0ID0gc2V0VGltZW91dCh0PT4gb25PcHRpb25JbWFnZUhvdmVyLmNhbGwodHJ1ZSwgZSksIDUwMCk7IH1cbiAgICAgICAgbGV0IGVsZW0gPSAkKGUudGFyZ2V0KTtcbiAgICAgICAgaWYgKCFlbGVtLmhhc0NsYXNzKFwiZm9ybS1jb250cm9sX19pbmxpbmUtbGFiZWxcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gZWxlbS5maW5kKFwiLmZvcm0tY29udHJvbF9faW5saW5lLWxhYmVsXCIpO1xuICAgICAgICAgICAgZWxlbSA9IGVsLmxlbmd0aCA/IGVsIDogZWxlbS5wYXJlbnRzKFwiLmZvcm0tY29udHJvbC0tY2hlY2tib3gtYnV0dG9uOmZpcnN0XCIpLmZpbmQoXCIuZm9ybS1jb250cm9sX19pbmxpbmUtbGFiZWxcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWwgPSBlbGVtWzBdO1xuICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1cmNoYXJnZUxhYmVsID0gJChlbCkuZmluZChcIi5vcHRpb24tc3VyY2hhcmdlX192YWx1ZVwiKVxuICAgICAgICAgICAgICAgICwgY3NBID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCwgXCI6YWZ0ZXJcIilcbiAgICAgICAgICAgICAgICAsIGNzQiA9IGdldENvbXB1dGVkU3R5bGUoZWwsIFwiOmJlZm9yZVwiKVxuICAgICAgICAgICAgICAgICwgY3NjID0gc3VyY2hhcmdlTGFiZWxbMF1cbiAgICAgICAgICAgICAgICAsIGNzQyA9IGNzYyAmJiBnZXRDb21wdXRlZFN0eWxlKGNzYywgXCI6YWZ0ZXJcIilcbiAgICAgICAgICAgICAgICAsIGJnID0gY3NBLmJhY2tncm91bmRJbWFnZSAhPSBcIm5vbmVcIlxuICAgICAgICAgICAgICAgICwgdCA9IGUudG91Y2hlcyAmJiBlLnRvdWNoZXNbMF1cbiAgICAgICAgICAgICAgICAsIHcgPSBwYXJzZUludChjc0Iud2lkdGgpIHx8IHBhcnNlSW50KGNzQi5taW5XaWR0aCkgfHwgMzAwXG4gICAgICAgICAgICAgICAgLCBoID0gcGFyc2VJbnQoY3NCLmhlaWdodCkgfHwgcGFyc2VJbnQoY3NCLm1pbkhlaWdodCkgfHwgMzAwICogMC43NVxuICAgICAgICAgICAgICAgICwgd3cgPSAoY3NjID8gcGFyc2VJbnQoY3NDLndpZHRoKSB8fCBwYXJzZUludChjc0MubWluV2lkdGgpIDogMCkgfHwgMTAwXG4gICAgICAgICAgICAgICAgLCBoaCA9IChjc2MgPyBwYXJzZUludChjc0MuaGVpZ2h0KSB8fCBwYXJzZUludChjc0MubWluSGVpZ2h0KSA6IDApIHx8IDEwMCAqIDAuNzVcbiAgICAgICAgICAgICAgICAsIHRvcCA9ICh0ID8gdC5wYWdlWSA6IGUucGFnZVkgLSAkdy5zY3JvbGxUb3AoKSkgfHwgMFxuICAgICAgICAgICAgICAgICwgaGFzQ2xpZW50ID0gXCJjbGllbnRYXCIgaW4gZVxuICAgICAgICAgICAgICAgICwgY2xpZW50WCA9IChoYXNDbGllbnQgPyBlLmNsaWVudFggOiBlLnRvdWNoZXM/LlswXT8uY2xpZW50WCkgfHwgMFxuICAgICAgICAgICAgICAgICwgY2xpZW50WSA9IChoYXNDbGllbnQgPyBlLmNsaWVudFkgOiBlLnRvdWNoZXM/LlswXT8uY2xpZW50WSkgfHwgMFxuICAgICAgICAgICAgICAgICwgaXcgPSBjbGllbnRYIC0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIGVsZW0ub3V0ZXJXaWR0aCgpICsgMTVcbiAgICAgICAgICAgICAgICAsIGVsUmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgLCBpaCA9IC8qMzUgKiAxLjUqL1xuICAgICAgICAgICAgICAgICAgICBjbGllbnRZIC0gZWxSZWN0LnRvcCArIGVsZW0ub3V0ZXJIZWlnaHQoKSArIDE1XG4gICAgICAgICAgICAgICAgLCBwaWggPSAvKjM1ICogMS41Ki9cbiAgICAgICAgICAgICAgICAgICAgY2xpZW50WSAtIGVsUmVjdC50b3AgKyBzdXJjaGFyZ2VMYWJlbC5vdXRlckhlaWdodCgpICsgMTVcbiAgICAgICAgICAgICAgICAsIHdoID0gJHcuaGVpZ2h0KClcbiAgICAgICAgICAgICAgICAsIHNjcm9sbFdpZHRoID0gMTFcbiAgICAgICAgICAgICAgICAsIHBhZGRpbmcgPSAxNFxuICAgICAgICAgICAgICAgICwgLy9jb25zb2xlLmxvZyhlLm9mZnNldFgsIGUub2Zmc2V0WSwgZT8ucGFnZVkgLSAkdy5zY3JvbGxUb3AoKSxcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICB0b3AgLSBoIC0gaWgsIHRvcCwgaCwgaWgsIHRvcCtpaCwgJHcuaGVpZ2h0KCkgLSBoIC0gaWgsIHRvcCAtIGggLSBpaCk7XG4gICAgICAgICAgICAgICAgaGFzT2Zmc2V0ID0gbW9iaWxlVG91Y2hFbmRlZCB8fCAoXCJvZmZzZXRYXCIgaW4gZSAmJiAhZT8udG91Y2hlcz8uWzBdKVxuICAgICAgICAgICAgICAgICwgcmVjdCA9IGhhc09mZnNldCA/IG51bGwgOiBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICAgICwgb2Zmc2V0WCA9IGhhc09mZnNldCA/IGUub2Zmc2V0WCA6IGUudG91Y2hlc1swXS5jbGllbnRYIC0gd2luZG93LnBhZ2VYT2Zmc2V0IC0gcmVjdC5sZWZ0XG4gICAgICAgICAgICAgICAgLCBvZmZzZXRZID0gaGFzT2Zmc2V0ID8gZS5vZmZzZXRZIDogZS50b3VjaGVzWzBdLmNsaWVudFkgLSB3aW5kb3cucGFnZVlPZmZzZXQgLSByZWN0LnRvcFxuICAgICAgICAgICAgICAgICwgc2hvdWxkU2hvdyA9ICFtb2JpbGVUb3VjaEVuZGVkICYmIGJnICYmIG9mZnNldFggPiBlbGVtLndpZHRoKCkgLSA2NCAmJiBvZmZzZXRZID49IC0xXG4gICAgICAgICAgICAgICAgLCBjdXJyZW50RGlzcGxheSA9IGVsZW0uY3NzKFwiLS1kaXNwbGF5XCIpIHx8IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgLCBkaXNwbGF5ID0gc2hvdWxkU2hvdyA/IFwiZmxleFwiIDogXCJub25lXCJcbiAgICAgICAgICAgICAgICAsIG11c3RTaG93ID0gc2hvdWxkU2hvdyAmJiBjdXJyZW50RGlzcGxheSA9PSBkaXNwbGF5ICYmIGRpc3BsYXkgPT0gXCJmbGV4XCJcbiAgICAgICAgICAgICAgICAsIG9wYWNpdHkgPSBtdXN0U2hvdyA/IDEgOiAwXG4gICAgICAgICAgICAgICAgLCBzaG91bGRIaWRlID0gZGlzcGxheSA9PSBcIm5vbmVcIiAmJiBjdXJyZW50RGlzcGxheSAhPSBkaXNwbGF5XG4gICAgICAgICAgICAgICAgLCBldyA9IGVsZW0ub3V0ZXJXaWR0aCgpXG4gICAgICAgICAgICAgICAgLCBwb2ludGVyWCA9ICh0ID8gdC5wYWdlWCA6IGUucGFnZVgpIHx8IDA7XG4gICAgICAgICAgICBsZXQgLy94ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oJHcud2lkdGgoKSAtIHcgLSBwYWRkaW5nLCBNYXRoLm1heChpdyAtIHcgLyAyLCAkdy53aWR0aCgpIC0gdyAvIDIgLSBldyAtICh0b3AgLSBoIC0gaWggPCA2NSA/IDY0IDogMzUpKSkpLFxuICAgICAgICAgICAgICAgIHggPSBNYXRoLm1heCgwLCBNYXRoLm1pbigkdy53aWR0aCgpIC0gdyAtIHBhZGRpbmcgLSBzY3JvbGxXaWR0aCwgTWF0aC5tYXgoaXcgLSB3LCBwb2ludGVyWCAtIHcgLSBpdyAvIDMpKSlcbiAgICAgICAgICAgICAgICAsIHkgPSBNYXRoLm1heCgxMjUsIE1hdGgubWluKHdoIC0gaCAtIHBhZGRpbmcsIHRvcCArIGggKyBpaCA8IHdoID8gTWF0aC5taW4odG9wICsgaWggLSA4MCwgd2ggLSBoIC0gaWggKyBlbGVtLm91dGVySGVpZ2h0KCkpIDogdG9wIC0gaCAtIGloKSlcbiAgICAgICAgICAgICAgICAsIHB4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4ocG9pbnRlclggLSB3dyAvIDIgLSBzY3JvbGxXaWR0aCwgJHcud2lkdGgoKSAtIHd3IC0gKHRvcCAtIGhoIC0gaWggPCA2NSA/IDY0IDogNSkpIC0gc2Nyb2xsV2lkdGgpXG4gICAgICAgICAgICAgICAgLCBweSA9IE1hdGgubWF4KDAsIHRvcCAtIGhoIC0gaWggPCA2NSA/IE1hdGgubWluKHRvcCArIGloIC0gcGloLCB3aCAtIGhoIC0gaWggLSBwaWgpIDogdG9wIC0gaGggLSBpaCArIHBpaCk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidHJpZ2dlclwiLCB0aGlzID09IHRydWUsIGUudHlwZSwgXCJzaG91bGRTaG93OlwiICsgc2hvdWxkU2hvdywgXCJtdXN0U2hvdzpcIiArIG11c3RTaG93LCBcInNob3VsZEhpZGU6XCIgKyBzaG91bGRIaWRlLCBcIm9wYWNpdHk6XCIgKyBvcGFjaXR5LCB0b3AsIGgsIGloLCB0b3AgKyBoICsgaWgsIHRvcCArIGggKyBpaCA8IHdoKTtcbiAgICAgICAgICAgIGVsLmh0ICYmIGNsZWFyVGltZW91dChlbGVtLmh0KTtcbiAgICAgICAgICAgIGlmIChzaG91bGRTaG93ICYmICFtdXN0U2hvdykge1xuICAgICAgICAgICAgICAgICQoXCIuZm9ybS1jb250cm9sLS1jaGVja2JveC1idXR0b24gLmZvcm0tY29udHJvbF9faW5saW5lLWxhYmVsW3N0eWxlKj0nLS1kaXNwbGF5OiBmbGV4J11cIikuZWFjaCgoaSwgZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZSAhPSBlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChlKS5jc3MoXCItLW9wYWNpdHlcIiwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLmh0ID0gc2V0VGltZW91dCh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGUpLmNzcyhcIi0tZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGUuaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAzMDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgZGVsYXlTaG93VGltZW91dCA9IHNldFRpbWVvdXQodCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGluZyByZXBseSBvcGFjaXR5IHNldCB0byAxXCIpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNzcyhcIi0tb3BhY2l0eVwiLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRIaWRlKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGRlbGF5U2hvd1RpbWVvdXQpO1xuICAgICAgICAgICAgICAgIHggPSBwYXJzZUludChlbGVtLmNzcyhcIi0tbGVmdFwiKSk7XG4gICAgICAgICAgICAgICAgeSA9IHBhcnNlSW50KGVsZW0uY3NzKFwiLS10b3BcIikpO1xuICAgICAgICAgICAgICAgIHB4ID0gcGFyc2VJbnQoZWxlbS5jc3MoXCItLXBsZWZ0XCIpKTtcbiAgICAgICAgICAgICAgICBweSA9IHBhcnNlSW50KGVsZW0uY3NzKFwiLS1wdG9wXCIpKTtcbiAgICAgICAgICAgICAgICBlbC5odCAmJiBjbGVhclRpbWVvdXQoZWwuaHQpO1xuICAgICAgICAgICAgICAgIGVsLmh0ID0gc2V0VGltZW91dCh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jc3MoXCItLWRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZWwuaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAsIDMwMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNob3VsZFNob3cpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWwuaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGVsLmh0KTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVsLmh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gYC0tZGlzcGxheTogJHtlbC5odCA/IFwiZmxleFwiIDogZGlzcGxheX07LS1vcGFjaXR5OiAke29wYWNpdHl9Oy0tbGVmdDogJHt4fXB4Oy0tdG9wOiAke3l9cHg7LS1wbGVmdDogJHtweH1weDstLXB0b3A6ICR7cHl9cHg7YDtcblxuICAgICAgICAgICAgLy8gaWYgKGUub2Zmc2V0WSA8IDApIHtcbiAgICAgICAgICAgIC8vICAgLy8gfHwgZ2V0Q29tcHV0ZWRTdHlsZShlbCkuZ2V0UHJvcGVydHlWYWx1ZShcIi0tZGlzcGxheVwiKSA9PSBcImJsb2NrXCIpIHtcbiAgICAgICAgICAgIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgLy8gICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgLy8gICBzdHlsZSA9IFwiLS1kaXNwbGF5Om5vbmU7XCI7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBlbGVtLmF0dHIoXCJzdHlsZVwiLCBzdHlsZSk7XG4gICAgICAgICAgICBpZiAoZGlzcGxheSA9PSBcImJsb2NrXCIpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZGlzYWJsZU9wdGlvbihvcHQpIHtcbiAgICAgICAgaWYgKCFvcHQucGFyZW50KCkuaGFzQ2xhc3MoXCJkZXRhaWxzLXByb2R1Y3Qtb3B0aW9uLS1Ob3QtaW5jbHVkZWRcIikgJiYgIW9wdC5wYXJlbnQoKS5oYXNDbGFzcyhcImRldGFpbHMtcHJvZHVjdC1vcHRpb24tLU5vdC1JbmNsdWRlZFwiKSkge1xuICAgICAgICAgICAgb3B0LmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKFwib3V0LW9mLXN0b2NrIGZvcm0tY29udHJvbC0tZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gbWFya091dE9mU3RvY2tQcm9kdWN0T3B0aW9ucyhwYWdlKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQcm9kdWN0SWQgPSBwYWdlIHx8IGN1cnJlbnRQYWdlLnByb2R1Y3RJZDtcbiAgICAgICAgLy9pZiAocGFnZS50eXBlID09IFwiUFJPRFVDVFwiKSB7XG4gICAgICAgIGlmIChjdXJyZW50UGFnZS5wcm9kdWN0SWQpIHtcbiAgICAgICAgICAgIC8vZC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBmdW5jdGlvbiAoKSB7IH0sIHRydWUpO1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gY3VycmVudFBhZ2UucHJvZHVjdElkO1xuICAgICAgICAgICAgcHJvbWlzZUNhcnRBbmRQaWQocHJvZHVjdElkKS8vcHJvbWlzZVByb2R1Y3RDb21iaW5hdGlvbnMocHJvZHVjdElkKVxuICAgICAgICAgICAgICAgIC50aGVuKHAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwID0gcFsxXTtcblxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBkaXNhYmxlUHJvZHVjdE9wdGlvbnMoZm9ybWF0UHJpY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwbyA9ICQoXCIuZGV0YWlscy1wcm9kdWN0LW9wdGlvbnNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBwPy5vcHRpb25zPy5mb3JFYWNoKChvLCBvaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc3QgaGFzTm9uZSA9ICEhbz8uY2hvaWNlcz8uZmluZChjID0+IC9Ob3QgSW5jbHVkZWR8V2l0aG91dCBDaGFyZ2luZy9naS50ZXN0KGMudGV4dCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc0N1cnJlbnRQcm9kdWN0SWRBc09wdGlvbiA9ICEhbz8uY2hvaWNlcz8uZmluZChjID0+IGMudGV4dFRyYW5zbGF0ZWQ/LmN5Py5pZCA9PSBjdXJyZW50UHJvZHVjdElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnN0IG9wdGlvbiA9IHBvLmZpbmQoXCIuZGV0YWlscy1wcm9kdWN0LW9wdGlvblwiKS5lcShvaSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvPy5jaG9pY2VzPy5mb3JFYWNoKChjLCBjaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhTGlua2VkUHJvZHVjdCA9IGMudGV4dFRyYW5zbGF0ZWQ/LmN5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IHBvLmZpbmQoYGlucHV0W3ZhbHVlPVwiJHtDU1MuZXNjYXBlKGMudGV4dCl9XCJdW25hbWU9XCIke0NTUy5lc2NhcGUoby5uYW1lKX1cIl0gfiAuZm9ybS1jb250cm9sX19pbmxpbmUtbGFiZWxgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBwYXJlbnQgPSBsYWJlbC5wYXJlbnRzKFwiLmZvcm0tY29udHJvbC0tY2hlY2tib3gtYnV0dG9uXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGlzU2VsZiA9IGRhdGFMaW5rZWRQcm9kdWN0Py5pZCA9PSBwLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICBpZiAoYy5wcmljZU1vZGlmaWVyVHlwZSA9PSBcIkFCU09MVVRFXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAvL2NvbnN0IHAgPSBoYXNOb25lID8gYy5wcmljZU1vZGlmaWVyIDogKCA/IHAucHJpY2UgOiBjLnByaWNlTW9kaWZpZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHZhciBzaG93U2lnbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3AgPSBkYXRhTGlua2VkUHJvZHVjdD8uY3AgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25QcmljZSA9IE1hdGgubWluKGlzU2VsZiA/IHByb2R1Y3QucHJpY2UgOiBjLnByaWNlTW9kaWZpZXIsIE1hdGgubWF4KChpc1NlbGYgPyBwcm9kdWN0LnByaWNlIDogYy5wcmljZU1vZGlmaWVyKSAtIChpc1NlbGYgPyBwcm9kdWN0LnByaWNlIDogYy5wcmljZU1vZGlmaWVyKSAqIGRpc2NvdW50LCBjcCAtIGNwICogZGlzY291bnQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0UHJpY2UgPSBNYXRoLm1pbihwcm9kdWN0LnByaWNlLCBNYXRoLm1heChwcm9kdWN0LnByaWNlIC0gcHJvZHVjdC5wcmljZSAqIGRpc2NvdW50LCBwcm9kdWN0LmNvbXBhcmVUb1ByaWNlIC0gcHJvZHVjdC5jb21wYXJlVG9QcmljZSAqIGRpc2NvdW50KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBoYXNDdXJyZW50UHJvZHVjdElkQXNPcHRpb24gPyAoaXNTZWxmID8gcHJvZHVjdFByaWNlIDogYy5wcmljZU1vZGlmaWVyID09IDAgPyAhKHNob3dTaWduID0gZmFsc2UpICYmIHByb2R1Y3RQcmljZSA6IG9wdGlvblByaWNlIC0gcHJvZHVjdFByaWNlKSA6IG9wdGlvblByaWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmIChoYXNDdXJyZW50UHJvZHVjdElkQXNPcHRpb24gJiYgIWlzU2VsZiAmJiAhcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgcCA9IG9wdGlvblByaWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgc2hvd1NpZ24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpY2UgPSBwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IG9wID0gcCAtIHAgKiBkaXNjb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBvcHYgPSBvcCAqICh2cCAvIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgLy8gLy92YXIgb3AgPSBwLCBvcHYgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIC8vIHZhciBwcmljZSA9IG9wICsgb3B2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHZhciBzdXJjYXJnZUxhYmVsID0gbGFiZWwuZmluZChcIi5vcHRpb24tc3VyY2hhcmdlX192YWx1ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBpZiAoIXN1cmNhcmdlTGFiZWwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICBsYWJlbC5maW5kKFwibGFiZWxcIikuYXBwZW5kKGA8c3BhbiBjbGFzcz1cIm9wdGlvbi1zdXJjaGFyZ2UgZWMtdGV4dC1tdXRlZFwiPjxzcGFuIGNsYXNzPVwib3B0aW9uLXN1cmNoYXJnZV9fYnJhY2tldFwiPig8L3NwYW4+PHNwYW4gY2xhc3M9XCJvcHRpb24tc3VyY2hhcmdlX192YWx1ZVwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cIm9wdGlvbi1zdXJjaGFyZ2VfX2JyYWNrZXRcIj4pPC9zcGFuPjwvc3Bhbj5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgIHN1cmNhcmdlTGFiZWwgPSBsYWJlbC5maW5kKFwiLm9wdGlvbi1zdXJjaGFyZ2VfX3ZhbHVlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybWF0UHJpY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRQcmljZSA9IGlzU2VsZiA/IEVjd2lkLmZvcm1hdEN1cnJlbmN5KHByaWNlKSA6IChwcmljZSA+IDAgJiYgc2hvd1NpZ24gPyBcIitcIiA6IFwiXCIpICsgRWN3aWQuZm9ybWF0Q3VycmVuY3kocHJpY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkUHJpY2VMZWFkID0gKGlzU2VsZiA/IEVjd2lkLmZvcm1hdEN1cnJlbmN5KHByaWNlLnRvRml4ZWQoMCkpIDogKHByaWNlID4gMCAmJiBzaG93U2lnbiA/IFwiK1wiIDogXCJcIikgKyBFY3dpZC5mb3JtYXRDdXJyZW5jeShwcmljZS50b0ZpeGVkKDApKSkucmVwbGFjZSgvWy4sXTAwIC8sIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgc3VyY2FyZ2VMYWJlbC50ZXh0KGZvcm1hdHRlZFByaWNlTGVhZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbFByaWNlID0gTWF0aC5tYXgoYz8ucHJpY2VNb2RpZmllciB8fCAwLCBkYXRhTGlua2VkUHJvZHVjdD8uY3AgfHwgMCwgMCkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25QcmljZSA8IG9yaWdpbmFsUHJpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgc3VyY2FyZ2VMYWJlbC5hdHRyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS10aXRsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduUmlnaHQoYFdhcyAke3N0cmlrZShFY3dpZC5mb3JtYXRDdXJyZW5jeShvcmlnaW5hbFByaWNlKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdyAke0Vjd2lkLmZvcm1hdEN1cnJlbmN5KG9wdGlvblByaWNlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2F2ZSAke0Vjd2lkLmZvcm1hdEN1cnJlbmN5KC1vcmlnaW5hbFByaWNlICsgb3B0aW9uUHJpY2UpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAkey1NYXRoLmZsb29yKDEwMCAtIChvcHRpb25QcmljZSAqIDEwMCkgLyBvcmlnaW5hbFByaWNlKX0lIG9mZmApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICBzdXJjYXJnZUxhYmVsLmF0dHIoXCJkYXRhLXRpdGxlXCIsIEVjd2lkLmZvcm1hdEN1cnJlbmN5KG9wdGlvblByaWNlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgc3VyY2FyZ2VMYWJlbC5jbG9zZXN0KFwiLm9cIikuYXR0cihcImFtb3VudFwiLCBwcmljZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkYXRhTGlua2VkUHJvZHVjdD8ubHAgfHwgZGF0YUxpbmtlZFByb2R1Y3Q/LmlkKSAmJiBwYXJlbnQuYXR0cihcImRhdGEtbGlua2VkLXByb2R1Y3RcIiwgZGF0YUxpbmtlZFByb2R1Y3Q/LmxwIHx8IGRhdGFMaW5rZWRQcm9kdWN0Py5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFMaW5rZWRQcm9kdWN0Py5pZCAmJiBwYXJlbnQuYXR0cihcImRhdGEtcmVuZGVyLXByb2R1Y3RcIiwgZGF0YUxpbmtlZFByb2R1Y3Q/LmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHNNZXRhZGF0YS5zZXQocGFyZW50WzBdLCBkYXRhTGlua2VkUHJvZHVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5hdHRyKFwiZGF0YS1za3VcIiwgZGF0YUxpbmtlZFByb2R1Y3Q/LnMgfHwga25vd25Qcm9kdWN0U2x1Z3NbZGF0YUxpbmtlZFByb2R1Y3Q/LmlkXT8uc2t1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uYXR0cihcInRpdGxlXCIsIGRhdGFMaW5rZWRQcm9kdWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFMaW5rZWRQcm9kdWN0Py5pcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlT3B0aW9uKGxhYmVsLnBhcmVudHMoXCIuZm9ybS1jb250cm9sLS1jaGVja2JveC1idXR0b25cIikuZmluZChcIi5mb3JtLWNvbnRyb2xfX3JhZGlvXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlUHJvZHVjdE9wdGlvbnMoZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHAuZmxhZ3MgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcC5vdXRPZlN0b2NrcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAvLyBwLmNvbWJpbmF0aW9ucz8uZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICBjb25zdCBpbmRleGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIC8vICAgcC5vcHRpb25zPy5mb3JFYWNoKG8gPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc3QgY28gPSBjLm9wdGlvbnMuZmluZChjbyA9PiBvLm5hbWUgPT0gY28ubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAobz8udHlwZSA9PSBcIlNJWkVcIikge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICBpZiAoY28pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjb25zdCBpbmRleCA9IG8uY2hvaWNlcy5maW5kSW5kZXgob2MgPT4gb2MudGV4dCA9PSBjby52YWx1ZSkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGluZGV4ZXMucHVzaChpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgaW5kZXhlcy5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgY29uc3QgaGFzaCA9IGluZGV4ZXMuam9pbihcIixcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgYy5oYXNoID0gaGFzaDtcbiAgICAgICAgICAgICAgICAgICAgLy8gICBwLmZsYWdzW2hhc2hdID0gYztcbiAgICAgICAgICAgICAgICAgICAgLy8gICBpZiAoIWMuaW5TdG9jaykge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgcC5vdXRPZlN0b2Nrc1toYXNoXSA9IGM7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgcXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IG9wdGlvbnNRUyA9IHFzPy5nZXQoXCJvcHRpb25zXCIpIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIC8vIHZhciBvcCA9IG9wdGlvbnNRUy5zcGxpdChcIixcIikuZmlsdGVyKG8gPT4gbyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHZhciBvcHRpb25zID0gWy4uLm9wXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gJChcIi5kZXRhaWxzLXByb2R1Y3Qtb3B0aW9uXCIpLmVhY2goKG9pLCBlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgY29uc3Qgb28gPSAkKGUpLmZpbmQoXCIub1wiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICBvby5lYWNoKChjaSwgZW8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGVvID0gJChlbyk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAoZW8uYXR0cihcImRhdGEtbGlua2VkLXByb2R1Y3RcIikgPT0gcC5pZCAmJiBvcHRpb25zW29pXSAhPSBjaSArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgb3B0aW9uc1tvaV0gPSAoY2kgKyAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICBjb25zdCBuZXdPcHRpb25zID0gb3B0aW9ucy5qb2luKFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgcXM/LnNldChcIm9wdGlvbnNcIiwgbmV3T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIC8vb3AgPSBuZXdPcHRpb25zO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAvLyBjb25zdCBxc3MgPSBxcy50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAvLyB2YXIgdXJsID0gW2xvY2F0aW9uLnBhdGhuYW1lLCBxc3NdLmZpbHRlcihwPT5wKS5qb2luKFwiP1wiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgLy8gaGlzdG9yeS5yZXBsYWNlU3RhdGUob3B0aW9ucywgXCJcIiwgdXJsKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgLy8gRWN3aWQub3BlblBhZ2UoXCJwcm9kdWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgLy8gICBpZDogcC5pZCxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgLy8gICBvcHRpb25zOiBvcCxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAvLyAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgdiA9IHA/LmZsYWdzW29wdGlvbnNRU107XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlQ29tYm9Qcm9kdWN0QmFja2dyb3VuZE92ZXJsYXkocCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gcC5vcHRpb25zLmZvckVhY2goKG8sIG9wdGlvbkluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgby5jaG9pY2VzLmZvckVhY2goKGMsIGNob2ljZUluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBvcHRpb25zW29wdGlvbkluZGV4XSA9IGNob2ljZUluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IHF1ZXJ5ID0gb3B0aW9ucy5qb2luKFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IHZhcmlhbnQgPSBwLmZsYWdzW3F1ZXJ5XTtcblxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKHZhcmlhbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgY29uc3Qgb3B0R3JvdXAgPSAkKFwiLnBvXCIpLmVxKG9wdGlvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgY29uc3Qgb3B0ID0gb3B0R3JvdXAuZmluZChcIi5vXCIpLmVxKGNob2ljZUluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgY29uc3Qgb3V0T2ZTdG9jayA9ICF2YXJpYW50LmluU3RvY2s7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIGlmICghLyhOb3R8Tm9uZSkgaW5jbHVkZWQvZ2kudGVzdChjLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgb3B0LmZpbmQoXCJpbnB1dFwiKS5wcm9wKFwiZGlzYWJsZWRcIiwgb3V0T2ZTdG9jaykucGFyZW50KCkudG9nZ2xlQ2xhc3MoXCJvdXQtb2Ytc3RvY2sgZm9ybS1jb250cm9sLS1kaXNhYmxlZFwiLCBvdXRPZlN0b2NrKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyAgIG9wdGlvbnNbb3B0aW9uSW5kZXhdID0gb3Bbb3B0aW9uSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy9wYWdlLnZhcmlhdGlvbklkID0gcD8uZmxhZ3M/LltvcHRpb25zUVNdPy5pZDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gJChcIi5mb3JtLWNvbnRyb2wtLWNoZWNrYm94LWJ1dHRvbiAuZm9ybS1jb250cm9sX19pbmxpbmUtbGFiZWxcIik7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGhpZGVCZWZvcmVJbWFnZShlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2FuY2VsbGluZ1wiLCBlLnR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHQgPSAkKHRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNoID0gdC5maW5kKFwiLmZvcm0tY29udHJvbF9faW5saW5lLWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBlbCA9IHQuaXMoXCIuZm9ybS1jb250cm9sX19pbmxpbmUtbGFiZWxcIikgPyB0YXJnZXQgOiBjaFswXSB8fCB0LnBhcmVudHMoXCIuZm9ybS1jb250cm9sX19pbmxpbmUtbGFiZWxcIilbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHRpbWVvdXQgPSBzZXRUaW1lb3V0KHQgPT4gb25PcHRpb25JbWFnZUhvdmVyLmFwcGx5KHRydWUsIGFyZ3VtZW50cyksIDIwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoZWwudG91Y2hFbmRUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC50b3VjaEVuZFRpbWVvdXQgPSB0aW1lb3V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNob3dCZWZvcmVJbWFnZShlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicmVnaXN0ZXJpbmdcIiwgZS50eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB0ID0gJCh0YXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBjaCA9IHQuZmluZChcIi5mb3JtLWNvbnRyb2xfX2lubGluZS1sYWJlbFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZWwgPSB0LmlzKFwiLmZvcm0tY29udHJvbF9faW5saW5lLWxhYmVsXCIpID8gdGFyZ2V0IDogY2hbMF0gfHwgdC5wYXJlbnRzKFwiLmZvcm0tY29udHJvbF9faW5saW5lLWxhYmVsXCIpWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB0aW1lb3V0ID0gc2V0VGltZW91dCh0ID0+IG9uT3B0aW9uSW1hZ2VIb3Zlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGVsLnRvdWNoRW5kVGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwudG91Y2hFbmRUaW1lb3V0ID0gdGltZW91dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpdGVtcy50b0FycmF5KCkuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZWxlbS50b3VjaE1vdmVFdmVudFJlY29yZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS50b3VjaE1vdmVFdmVudFJlY29yZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL29uIGRlc2t0b3Agd2UgdXNlIHRoZSBtb3VzZW1vdmUgZXZlbnQgZm9yIGZpbmUgZGV0ZWN0aW9uIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ob3dldmVyLCBvbiBtb3ZiaWxlIHRvdWNoIGRldmljZXMgaXQgdHJpZ2dlcnMgYWZ0ZXIgdG91Y2hlbmQgY2F1c2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYSBuYXN0eSBidWcsIHNvIHdlIHVzZSB0aGUgbW91c2VvdmVyIGV2ZW50IGluc3RlYWQgd2hpY2ggZml4ZXMgdGhlIGlzc3VlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoaGFzVG91Y2hFdmVudHMgPyBcIm1vdXNlb3ZlclwiIDogXCJtb3VzZW1vdmVcIiwgc2hvd0JlZm9yZUltYWdlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgc2hvd0JlZm9yZUltYWdlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBzaG93QmVmb3JlSW1hZ2UsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0ucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGlkZUJlZm9yZUltYWdlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIGhpZGVCZWZvcmVJbWFnZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhpZGVCZWZvcmVJbWFnZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhpZGVCZWZvcmVJbWFnZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcD8uY29tYmluYXRpb25zPy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgYz8ub3B0aW9ucy5mb3JFYWNoKG8gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAoIWMuaW5TdG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgIGNvbnN0IG9wdCA9ICQoYC5vZy0ke3VuYm9sZChvLm5hbWUpLnRvVXBwZXJDYXNlKCkucmVwbGFjZSgvIC9nLCBcIi1cIil9IC5mb3JtLWNvbnRyb2xfX3JhZGlvW3ZhbHVlPSckeyQuZXNjYXBlU2VsZWN0b3Ioby52YWx1ZSl9J11gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICBkaXNhYmxlT3B0aW9uKG9wdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICgkZC5pcyhcIi5wLVgtVEVNU3gxLUxPQURFUlwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgZGlzYWJsZU9wdGlvbigkKFwiLm8tWC1URU1TeDEtRk9SLUJNWC1OT1QtSU5DTFVERUQgaW5wdXRcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBpbmplY3RQcmljZUhpZ2hsaWdodGluZ1JlZ2lzdGVyZWRFdmVudCA9IGZhbHNlO1xuICAgIGZ1bmN0aW9uIGluamVjdFByaWNlSGlnaGxpZ2h0aW5nKCkge1xuICAgICAgICBpZiAoIWluamVjdFByaWNlSGlnaGxpZ2h0aW5nUmVnaXN0ZXJlZEV2ZW50KSB7XG4gICAgICAgICAgICBpbmplY3RQcmljZUhpZ2hsaWdodGluZ1JlZ2lzdGVyZWRFdmVudCA9IHRydWU7XG4gICAgICAgICAgICAkZC5vbihcIm1vdXNldXBcIiwgXCIucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LW9wdGlvbnMgLmZvcm0tY29udHJvbC0tY2hlY2tib3gtYnV0dG9uXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcHJpY2VMYWJlbCA9ICQoXCIucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXNrdSwgLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1wcmljZSwgLnByb2R1Y3QtZGV0YWlsc19fYXR0cmFjdGlvbi1ibG9jaywgLmRldGFpbHMtcHJvZHVjdC1wcmljZS10YXhfX3ZhbHVlLCAucHJpY2Utd2l0aG91dC1kaXNjb3VudCwgLnByaWNlLXdpdGgtZGlzY291bnQsIC5kZXRhaWxzLXByb2R1Y3QtcHJpY2UtY29tcGFyZV9fdmFsdWUsIC5mYWRlLWluLW91dFwiKS50b2dnbGVDbGFzcyhcImZhZGUtaW4tZmFkZS1vdXRcIik7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmljZUxhYmVsWzBdLnJlZ2lzdGVyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VMYWJlbFswXS5yZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VMYWJlbC5vbihcImFuaW1hdGlvbmVuZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmFkZS1pbi1mYWRlLW91dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbmplY3RQcmljZUhpZ2hsaWdodGluZygpO1xuICAgIHZhciBoMUhlYWRlciA9ICQoXCIuZWMtcGFnZS10aXRsZS5lYy1wYWdlLXRpdGxlX19mZWF0dXJlZC1wcm9kdWN0c1wiKTtcbiAgICBvblVubG9hZChwID0+IChoMUhlYWRlciA9IG51bGwpKTtcbiAgICBvblBhZ2VMb2FkZWQocCA9PiAoaDFIZWFkZXIgPSAkKFwiLmVjLXBhZ2UtdGl0bGUuZWMtcGFnZS10aXRsZV9fZmVhdHVyZWQtcHJvZHVjdHNcIikpKTtcbiAgICAvKncuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBlID0+IHtcbnZhciBzY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWSxcbmIgPSAkKFwiYm9keVwiKTtcbmlmIChzY3JvbGwgPD0gMSAmJiBiLmhhc0NsYXNzKFwiaXMtc2Nyb2xsZWRcIikpIHtcbmIucmVtb3ZlQ2xhc3MoXCJpcy1zY3JvbGxlZFwiKTtcbn0gZWxzZSBpZiAoc2Nyb2xsID4gMSAmJiAhYi5oYXNDbGFzcyhcImlzLXNjcm9sbGVkXCIpKSB7XG5iLmFkZENsYXNzKFwiaXMtc2Nyb2xsZWRcIik7XG59XG4gXG5cbi8vIGlmICh3aW5kb3cub3V0ZXJXaWR0aCA+IDgwMCkge1xuLy8gICAgIGlmIChzY3JvbGwgPiAxMzAwKSB7XG4vLyAgICAgICAgIHNjcm9sbCA9IDA7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgc2Nyb2xsID0gTWF0aC5tYXgoKDYwMCAtIHdpbmRvdy5zY3JvbGxZKSAqIDEwMCAvIDYwMCwgMjUpO1xuLy8gICAgIH1cbi8vICAgICAkKCcuZGV0YWlscy1nYWxsZXJ5X193cmFwLWlubmVyJykuY3NzKFwid2lkdGhcIiwgc2Nyb2xsICsgXCIlXCIpO1xuLy8gfVxufSwge3Bhc3NpdmU6IHRydWV9KTsqL1xuICAgIGZ1bmN0aW9uIGluamVjdFpvb21PblByb2R1Y3REZXNjcmlwdGlvbkltYWdlcyhwYWdlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgaW1nID0gJChcIi5wcm9kdWN0LWRldGFpbHNfX2Rlc2NyaXB0aW9uIGltZ1wiKTtcbiAgICAgICAgICAgIGlmIChpbWcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHQgPSBpbWcudHJpZ2dlcihcInpvb20uZGVzdHJveVwiKTtcbiAgICAgICAgICAgICAgICBsZXQgdyA9IHQud3JhcCgnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9ja1wiPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICBsZXQgYyA9IHcuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICAgICAgICAgIGxldCBwID0gYy5wYXJlbnQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXAuem9vbSB8fCAhalF1ZXJ5LmZuLnpvb20pXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcC56b29tKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaGVzOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHdoaWxlIGluamVjdGluZyB6b29tIHByb2R1Y3QgZGVzY3JpcHRpb24gaW1hZ2VzXCIsIGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzY3JvbGxUb0dyaWQoZSkge1xuICAgICAgICAvL3Njcm9sbCB0byB0aGUgcHJvZHVjdCBjYXRlZ29yeSdzIGZlYXR1cmVkIHByb2R1Y3RzIGdyaWRcbiAgICAgICAgLy9lLmcuIGlkZWFsIHdoZW4gY2xpY2tpbmcgbmV4dC9wcmV2IG9yIGEgc3BlY2lmaWMgcGFnZSBpbiB0aGUgcGFnZXIgbGlua3NcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUbyh7XG4gICAgICAgICAgICB0b3A6ICQoXCIuZ3JpZF9fd3JhcFwiKS5vZmZzZXQoKS50b3AgLSAxMjAgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFyIGxpc3RlbmluZ0ZvclNvcnRSZWdpc3RlcmVkID0gZmFsc2U7XG4gICAgZnVuY3Rpb24gaW50ZXJjZXB0Q2F0ZWdvcnlQYWdlKHBhZ2UpIHtcbiAgICAgICAgaWYgKFtcIkNBVEVHT1JZXCIsIFwiU0VBUkNIXCJdPy5pbmRleE9mKHBhZ2U/LnR5cGUpID49IDApIHtcbiAgICAgICAgICAgIGlmICghbGlzdGVuaW5nRm9yU29ydFJlZ2lzdGVyZWQpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB1cGRhdGVTb3J0TGFiZWwoKSB7XG4gICAgICAgICAgICAgICAgICAgICQoXCIuZWMtZmlsdGVyLS1zb3J0YnkgLmVjLWZpbHRlcl9faXRlbXMtYXBwbGllZFwiKS50ZXh0KCQoXCIuZWMtZmlsdGVyLS1zb3J0YnkgLmZvcm0tY29udHJvbF9fcmFkaW8td3JhcDpoYXMoLmZvcm0tY29udHJvbF9fcmFkaW86Y2hlY2tlZCkgfiAuZm9ybS1jb250cm9sX19pbmxpbmUtbGFiZWxcIikudGV4dCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGlzdGVuaW5nRm9yU29ydFJlZ2lzdGVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICRkLm9uKFwiY2hhbmdlXCIsIFwiI2VjLXByb2R1Y3RzLXNvcnRcIiwgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoXCIuZWMtZmlsdGVyLS1zb3J0YnkgLmVjLWZpbHRlcl9faXRlbXMtYXBwbGllZFwiKS50ZXh0KCQoXCIjZWMtcHJvZHVjdHMtc29ydFwiKS5jaGlsZHJlbihcIm9wdGlvbjpzZWxlY3RlZFwiKS50ZXh0KCkpO1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxHcmlkX19Qcm9kdWN0c0ludG9WaWV3KHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICRkLm9uKFwiY2hhbmdlXCIsIFwiLmVjLWZpbHRlci0tc29ydGJ5IC5mb3JtLWNvbnRyb2xfX3JhZGlvXCIsIHVwZGF0ZVNvcnRMYWJlbCk7XG4gICAgICAgICAgICAgICAgZC5hcnJpdmUoXCIuZWMtZmlsdGVyLS1zb3J0YnlcIiwgb25jZU9ubHksIHVwZGF0ZVNvcnRMYWJlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkLmFycml2ZShcIi5lYy1ncmlkXCIsIG9uY2VPbmx5LCBlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBlbGVtID0gJChlbGVtKTtcbiAgICAgICAgICAgICAgICBlbGVtLmZpbmQoXCIuZWMtZ3JpZC0tdGl0bGUuZWMtaGVhZGVyLWgxXCIpLmxlbmd0aCA9PSAwICYmIGVsZW0ucHJlcGVuZCgkKFwiPGgxIGNsYXNzPSdlYy1ncmlkLS10aXRsZSBlYy1oZWFkZXItaDEnLz5cIikudGV4dCh0cmFuc2xhdGUoXCJDYXRlZ29yaWVzXCIpKS50b2dnbGUoISEkKFwiLmVjLWdyaWQgLmdyaWRfX2NhdGVnb3JpZXMuZ3JpZF9fY2F0ZWdvcmllcy0tYWR2YW5jZWRcIikubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZnVuY3Rpb24gaW5qZWN0R3JpZFNvcnRQYWdlVGl0bGUoZWxlbSkge1xuICAgICAgICAgICAgICAgIHRvZ2dsZUhhc0dyaWRTb3J0Q2xhc3MoZWxlbSk7XG4gICAgICAgICAgICAgICAgLy9yZWdpc3RlciBmb3IgdGhlIGV2ZW50IHdoZW4gdGhlIGdyaWRfX3NvcnQgZWxlbWVudCBpcyByZW1vdmVkIGZvcm0gdGhlIERPTSB0byB1cGRhdGUgdGhlIGNsYXNzXG4gICAgICAgICAgICAgICAgZWxlbS5wYXJlbnROb2RlLmxlYXZlKGVsZW0sIGUgPT4gdG9nZ2xlSGFzR3JpZFNvcnRDbGFzcygpKTtcbiAgICAgICAgICAgICAgICBjb25zdCAkZWxlbSA9ICQoZWxlbSkucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgLCBicmVhZGNydW1icyA9ICQoXCIuZWMtYnJlYWRjcnVtYnNcIilcbiAgICAgICAgICAgICAgICAgICAgLCBjYXRlZ29yaWVzID0gJChcIi5lYy1ncmlkIC5ncmlkX19jYXRlZ29yaWVzXCIpXG4gICAgICAgICAgICAgICAgICAgICwgaGFzU3ViQ2F0ZWdvcmllcyA9ICEhY2F0ZWdvcmllcy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgLCAkc3ViQ2F0ZWdvcmllcyA9ICQoXCIucGFnZS10aXRsZV9fbmFtZS5lYy1oZWFkZXItaDFcIikuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFkY3J1bWJzLnRvZ2dsZUNsYXNzKFwiaGFzLXN1Yi1jYXRlZ29yaWVzXCIsIGhhc1N1YkNhdGVnb3JpZXMpO1xuICAgICAgICAgICAgICAgIGlmIChoYXNTdWJDYXRlZ29yaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzSW5PdXRPZlZpZXcoY2F0ZWdvcmllc1swXSwgKGVsZW0sIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmVjLWJyZWFkY3J1bWJzXCIpLnRvZ2dsZUNsYXNzKFwiaGlkZGVuLWNhdGVnb3JpZXNcIiwgIXN0YXRlLmlzSW5WaWV3KS50b2dnbGVDbGFzcyhcInZpc2libGUtY2F0ZWdvcmllc1wiLCBzdGF0ZS5pc0luVmlldyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiB0b2dnbGVIYXNHcmlkU29ydENsYXNzKGVsZW0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNHcmlkU29ydCA9ICEhJChlbGVtIHx8IFwiLmdyaWRfX3NvcnRcIikubGVuZ3RoO1xuICAgICAgICAgICAgICAgICRkLnRvZ2dsZUNsYXNzKFwiaGFzLWdyaWRfX3NvcnRcIiwgaGFzR3JpZFNvcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9nZ2xlSGFzR3JpZFNvcnRDbGFzcygpO1xuICAgICAgICAgICAgZC5hcnJpdmUoXCIuZ3JpZF9fc29ydFwiLCBub3RPbmNlT25seVNlbGZVbmJpbmQsIGluamVjdEdyaWRTb3J0UGFnZVRpdGxlKTtcbiAgICAgICAgICAgIGlmICghZC5tYXBwZWRQYWdlclNjcm9sbGluZykge1xuICAgICAgICAgICAgICAgIGQubWFwcGVkUGFnZXJTY3JvbGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGQuYXJyaXZlKFwiLmVjLXBhZ2VyIC5lYy1saW5rXCIsIG5vdE9uY2VPbmx5LCBlbGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlbGVtLm1hcHBlZFNjcm9sbGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5tYXBwZWRTY3JvbGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2Nyb2xsVG9HcmlkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGQuYXJyaXZlKFwiLmdyaWQtY2F0ZWdvcnlfX3RpdGxlXCIsIG5vdE9uY2VPbmx5LCBlbGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSAkKGVsZW0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS5hdHRyKFwiZGF0YS1jYXRlZ29yeS1pZFwiKSA9PSBcIjE0NTk2NzA0NlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlID0gZS5maW5kKFwiLmdyaWQtY2F0ZWdvcnlfX3RpdGxlLWlubmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaCA9IGUuaHRtbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGguaW5kZXhPZihcIjxici8+XCIpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuY3NzKFwiZm9udC13ZWlnaHRcIiwgXCJub3JtYWxcIikuaHRtbChoLnJlcGxhY2UoXCI/XCIsIFwiPzxici8+PGI+XCIpICsgXCI8L2I+XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgLy90b2dnbGUgaHRtbC13aWRlIGNsYXNzIGZvciBmaWx0ZXJzLW9wZW5lZCAtIGZpbHRlcnMtY2xvc2VkXG4gICAgICAgICAgICAgICAgaWYgKCRkLmlzKFwiLnBhZ2UtdHlwZS1QQUdFLVNFQVJDSFwiKSB8fCBwYWdlLnR5cGUgPT0gXCJQQUdFLVNFQVJDSFwiIHx8IHBhZ2UudHlwZSA9PSBcIlNFQVJDSFwiIHx8IHBhZ2UudHlwZSA9PSBcIkNBVEVHT1JZXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgJGQuYXJyaXZlKFwiLmVjLWZpbHRlcnNcIiwgb25jZU9ubHksIGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChlbGVtKS5jbGFzc0NoYW5nZShlbGVtID0+ICRiLnRvZ2dsZUNsYXNzKFwiZWMtZmlsdGVycy0tb3BlbmVkXCIsICQoZWxlbSkuaGFzQ2xhc3MoXCJlYy1maWx0ZXJzLS1vcGVuZWRcIikpLCBcImNsYXNzXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGQuYXJyaXZlKFwiLmdyaWQtc29ydF9faXRlbS0tZmlsdGVyXCIsIG9uY2VPbmx5LCBlbGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICBpZiAoISQoZWxlbSkuaXMoXCIuZm9ybS1jb250cm9sLS1vcGVuZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGVsZW0uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBpbnRlcmNlcHRBZGRyZXNzUGFnZShwYWdlKSB7XG4gICAgICAgIGlmIChwYWdlLnR5cGUgPT09IFwiQ0hFQ0tPVVRfQUREUkVTU1wiKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHcgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBzb2xkQnkgPSB7fTtcblxuICAgICAgICAgICAgICAgIHZhciBtYXAgPSB7fTtcblxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RvciA9IFwiYnk6a2xjdzExYyBlbWFpbDp0c3RuaG5sIGludm9pY2VOdW1iZXI6anhhbm8wYiBhZGRyZXNzOjNhM2QyaHAgdmF0Om1yc3JqeHUgcmVnOnVkYXQxeDMgaWJhbjprNnVrc2F2IHN3aWZ0OmJ1ZjBjOWogcGF5cGFsOm95OHJyN3dcIi5zcGxpdChcIiBcIikubWFwKGlkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBpZC5zcGxpdChcIjpcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjc3NDbGFzcyA9IGAuZWMtZm9ybV9fcm93LmVjLWZvcm1fX3Jvdy0tJHtpdGVtWzFdfWA7XG4gICAgICAgICAgICAgICAgICAgIHNvbGRCeVtpdGVtWzBdXSA9ICQoYCR7Y3NzQ2xhc3N9IGlucHV0YCk7XG4gICAgICAgICAgICAgICAgICAgIG1hcFtpdGVtWzBdXSA9IGl0ZW1bMV07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjc3NDbGFzcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS5qb2luKFwiLFwiKTtcbiAgICAgICAgICAgICAgICBFY3dpZC5DYXJ0LmdldChmdW5jdGlvbiAoY2FydCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhcnRcIiwgY2FydCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgRHggPSBkeC5EeDJXRDtcbiAgICAgICAgICAgICAgICAvL3RvIGJlIGRldGVybWluZWRcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzb2xkQnkpXG4gICAgICAgICAgICAgICAgICAgIGlmIChzb2xkQnkuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtleXdvcmQgPSBtYXBba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVjLm9yZGVyLmV4dHJhRmllbGRzW2tleXdvcmRdLnZhbHVlID0gRHhba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvbGRCeVtrZXldLnZhbChEeFtrZXldKS5hdHRyKFwidmFsdWVcIiwgRHhba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBFY3dpZC5yZWZyZXNoQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgLy8kKHNlbGVjdG9yKS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLCAyMDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vY29uc29sZS5sb2coJ2luaXRpYWwgcGFnZScsIHBhZ2UpO1xuICAgIGNvbnN0IGluaXRpYWxQcm9kdWN0SWQgPSBjdXJyZW50UGFnZS5wcm9kdWN0SWQ7XG4gICAgaWYgKGluaXRpYWxQcm9kdWN0SWQpIHtcbiAgICAgICAgLy9wcmVsYXVuY2ggdGhlIEFQSSBmb3IgdGhlIGN1cnJlbnQgcHJvZHVjdElkIGlmIGFueVxuICAgICAgICBwcm9taXNlQ2FydEFuZFBpZChpbml0aWFsUHJvZHVjdElkKTtcbiAgICAgICAgLy9wcm9taXNlUHJvZHVjdENvbWJpbmF0aW9ucyhpbml0aWFsUHJvZHVjdElkKTtcbiAgICB9XG4gICAgLy9kZWJ1Z2dlcjtcblxuICAgIC8vaW5qZWN0RmFzdExvYWRpbmdDc3MoY3VycmVudFBhZ2UpO1xuXG4gICAgZnVuY3Rpb24gbG9vcE9uUGFnZUxvYWQocGFnZSwgbWF4TG9vcFRyaWVzLCBtcykge1xuICAgICAgICBpZiAocGFnZS50eXBlID09IFwiU0lURVwiKSB7XG4gICAgICAgICAgICBkLmFycml2ZShcIiN0aWxlLWZvb3Rlci1NTnVyZTdcIiwgb25jZU9ubHksIGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGVsZW0gPSAkKGVsZW0pO1xuICAgICAgICAgICAgICAgIGlmICghcGFnZVN0YXRlLnBhZ2VMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZUxvYWRlZENvbXBsZXRlZChwYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgKGVsZW0uaGFzQ2xhc3MoXCJpbnMtdGlsZS0tc2hvd25cIikpIHBhZ2VMb2FkZWRDb21wbGV0ZWQocGFnZSk7XG4gICAgICAgICAgICAgICAgLy8gZWxzZVxuICAgICAgICAgICAgICAgIC8vICAgZWxlbS5jbGFzc0NoYW5nZShlbGVtID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgZWxlbSA9ICQoZWxlbSk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGlmICghcGFnZVN0YXRlLnBhZ2VMb2FkZWQgJiYgZWxlbS5oYXNDbGFzcyhcImlucy10aWxlLS1zaG93blwiKSkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgIHBhZ2VMb2FkZWRDb21wbGV0ZWQocGFnZSk7XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlLnR5cGUgIT0gXCJQUk9EVUNUXCIgfHwgJChcIi5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3Qtb3B0aW9uc1wiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHBhZ2VMb2FkZWRDb21wbGV0ZWQocGFnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYWdlLnRyaWVzKys7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3BPblBhZ2VMb2FkLmJpbmQodGhpcywgcGFnZSwgbWF4TG9vcFRyaWVzIC0gMSksIG1zICsgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gZC5hcnJpdmUoJ2xpbmsnLCB7IGV4aXN0aW5nOiB0cnVlIH0sIGVsZW0gPT4ge1xuICAgIC8vICAgICBpZiAoZWxlbS5pZCA9PSAnZHhDU1MnKSB7XG4gICAgLy8gICAgICAgICB2YXIgbGlua3MgPSAkKCdoZWFkIGxpbmsnKTtcbiAgICAvLyAgICAgICAgIHZhciBpbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwobGlua3MsIGVsZW0pO1xuICAgIC8vICAgICAgICAgaWYgKGluZGV4ICE9IGxpbmtzLmxlbmd0aCAtIDEpIHtcbiAgICAvLyAgICAgICAgICAgICBsYXp5Q3NzKCkuYXBwZW5kQ2hpbGQobGlua3NbaW5kZXhdKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xuICAgIEVjd2lkLk9uQVBJTG9hZGVkLmFkZCgoKSA9PiB7XG4gICAgICAgIC8vRWN3aWQuZ2V0QXBwUHVibGljVG9rZW4oYGN1c3RvbS1hcHAtJHtzdG9yZUlkfS0xYCk7XG4gICAgICAgIHZhciBfRWN3aWRfb3BlblBhZ2UgPSBFY3dpZC5vcGVuUGFnZTtcbiAgICAgICAgdmFyIGN1cnJlbnRPcGVuZWRQYWdlS2V5ID0gbnVsbDtcbiAgICAgICAgRWN3aWQub3BlblBhZ2UgPSBmdW5jdGlvbiAod2hhdCwgb3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgbmV3S2V5ID0gW3doYXQsIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpXS5qb2luKFwiLFwiKTtcbiAgICAgICAgICAgIC8vaWYgKG5ld0tleSA9PSBjdXJyZW50T3BlbmVkUGFnZUtleSkgcmV0dXJuO1xuICAgICAgICAgICAgY3VycmVudE9wZW5lZFBhZ2VLZXkgPSBuZXdLZXk7XG4gICAgICAgICAgICBUcnkoZGVzdHJveUpTVik7XG4gICAgICAgICAgICBoaWRlQWN0aW9uQmFyKCk7XG4gICAgICAgICAgICAvL3Jlc2V0IHRoZSBjb25zb2xlIGxvZyBpbml0aWFsIHBhZ2UgbG9hZGluZyBkYXRlXG4gICAgICAgICAgICBsb2dnZXJUaW1lID0ge307XG4gICAgICAgICAgICB2YXIgdCA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgYSA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgIHNldFRpbWVvdXQodCA9PiB7XG4gICAgICAgICAgICAgICAgLy8kKCcuZGV0YWlscy1wcm9kdWN0LXB1cmNoYXNlX19xdHknKS5wYXJlbnQoKS5hcHBlbmRUbygnLnByb2R1Y3QtZGV0YWlscy1tb2R1bGUucHJvZHVjdC1kZXRhaWxzX19hY3Rpb24tcGFuZWwuZGV0YWlscy1wcm9kdWN0LXB1cmNoYXNlJylcbiAgICAgICAgICAgICAgICAvLyQoXCIubWVudS13cmFwcGVyXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIC8vZGVzdHJveUpTVigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQcm9kdWN0SWQgPSBwYXJzZUludChvcHRpb25zPy5pZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9hZDM2MFByb2R1Y3RDb2RlID0gZ2V0UHJvZHVjdENvZGVGcm9tQ3VycmVudFVybChjdXJyZW50UHJvZHVjdElkLCBvcHRpb25zPy52YXJpYW50KTtcbiAgICAgICAgICAgICAgICBpZiAobG9hZDM2MFByb2R1Y3RDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodCA9PiBsb2FkMzYwKHBhZ2UsIGxvYWQzNjBQcm9kdWN0Q29kZSksIDIwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL2NsZWFyIHRoZSBjaGFjaGUgb2YgXCJDYXJ0XCJcbiAgICAgICAgICAgICAgICBjYWNoZWRDYXJ0VG90YWxRdWV1ZSA9IFtudWxsXTtcbiAgICAgICAgICAgICAgICAvL3N0YXJ0IGZldGNoaW5nIG5ldyBwcm9kdWN0J3MgcmVsYXRlZCBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgIHByb21pc2VDYXJ0QW5kUGlkKGN1cnJlbnRQcm9kdWN0SWQpO1xuICAgICAgICAgICAgICAgIC8vcHJvbWlzZVByb2R1Y3RDb21iaW5hdGlvbnMoY3VycmVudFByb2R1Y3RJZCk7XG4gICAgICAgICAgICAgICAgLy9saXN0ZW5Ub0Fycml2ZVByb2R1Y3RPcHRpb25zKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucz8ucXVlcnlTdHJpbmc/Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHMgPSBoaXN0b3J5LnB1c2hTdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUgPSBmdW5jdGlvbiAoYSwgYiwgbGluaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucXVlcnlTdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluayArPSAoL1tcXD9dLy50ZXN0KGxpbmspID8gXCImXCIgOiBcIj9cIikgKyBvcHRpb25zLnF1ZXJ5U3RyaW5nLm1hcChrID0+IGAke2VuY29kZVVSSUNvbXBvbmVudChrWzBdKX09JHtlbmNvZGVVUklDb21wb25lbnQoa1sxXSl9YCkuam9pbihcIiZcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSA9IHBzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBzLmFwcGx5KGhpc3RvcnksIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaXNTY3JvbGxpbmcgPSBvcHRpb25zPy5xdWVyeVN0cmluZz8uZmluZEluZGV4KHEgPT4gcT8uWzBdID09IFwic2Nyb2xsXCIpID49IDA7XG4gICAgICAgICAgICAgICAgX0Vjd2lkX29wZW5QYWdlLmFwcGx5KHQsIGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICwgNTApO1xuICAgICAgICB9XG4gICAgICAgICAgICA7XG4gICAgICAgIHZhciBvblBhZ2VTd2l0Y2hFeGVjdXRlZCA9IGZhbHNlO1xuICAgICAgICAkdy5vbihcInBvcHN0YXRlXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghb25QYWdlU3dpdGNoRXhlY3V0ZWQpIHsvLy9XSFlcbiAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHZhciBjdXJyZW50TGluayA9IGxvY2F0aW9uLmhyZWY7XG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIG9uUGFnZVN3aXRjaChwYWdlKSB7XG4gICAgICAgICAgICBwYWdlLnR5cGU7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gcGFyYW1zLmdldChcIm9wdGlvbnNcIik7XG4gICAgICAgICAgICBwYWdlLm9wdGlvbnMgPSBvcHRpb25zPy5zcGxpdChcIixcIikgfHwgW107XG4gICAgICAgICAgICBFY3dpZDtcbiAgICAgICAgICAgIGlmICghb25QYWdlU3dpdGNoRXhlY3V0ZWQpIHtcbiAgICAgICAgICAgICAgICBvblBhZ2VTd2l0Y2hFeGVjdXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gaWYgKHBhZ2UudHlwZSAhPSBcIkNBVEVHT1JZXCIgJiYgcGFnZS50eXBlICE9IFwiU0VBUkNIXCIpIHtcbiAgICAgICAgICAgICAgICAvLyAgIGF3YWl0IGhpZGVBY3Rpb25CYXIodHJ1ZSk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICRkLmFsdGVyQ2xhc3MoXCJwYWdlLXR5cGUtKlwiLCBcInBhZ2UtdHlwZS1cIiArIHBhZ2U/LnR5cGUpO1xuICAgICAgICAgICAgICAgIGxvZ0R1cmF0aW9uKFwiUEFHRVwiLCBcIlBhZ2UgbmF2aWdhdGluZyB0b1wiLCBwYWdlPy50eXBlLCBwYWdlKSgpO1xuICAgICAgICAgICAgICAgIFRyeShvblBhZ2VVbmxvYWRlZCwgcGFnZSk7XG4gICAgICAgICAgICAgICAgaWYgKC9wcm9kdWN0c1xcL2FjY291bnQvZ2kudGVzdChjdXJyZW50TGluaykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNMaW5rID0gY3VycmVudExpbms7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodCA9PiBwcmV2aW91c0xpbmsgPT0gY3VycmVudExpbmsgJiYgb25QYWdlU3dpdGNoRXhlY3V0ZWQgJiYgRUN3aWRPblBhZ2VMb2FkZWQoY3VycmVudFBhZ2UpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgRWN3aWQuT25QYWdlU3dpdGNoICYmIEVjd2lkLk9uUGFnZVN3aXRjaC5hZGQob25QYWdlU3dpdGNoKTtcblxuICAgICAgICBFY3dpZC5PblBhZ2VMb2FkLmFkZChFQ3dpZE9uUGFnZUxvYWRpbmcpO1xuICAgICAgICBpbnN0YW50c2l0ZS5vblRpbGVMb2FkZWQuYWRkKHQgPT4ge1xuICAgICAgICAgICAgaWYgKC9mb290ZXIvaS50ZXN0KHQpKSB7XG4gICAgICAgICAgICAgICAgRWN3aWQuT25QYWdlTG9hZGVkLmFkZChFQ3dpZE9uUGFnZUxvYWRlZCk7XG4gICAgICAgICAgICAgICAgRUN3aWRPblBhZ2VMb2FkZWQoZGV0ZWN0Q3VycmVudFBhZ2UoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoRWN3aWQuZ2V0U3RvcmVmcm9udFN0YXRlKSB7XG4gICAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgICAgIHZhciBjdXJyZW50U3RhdGUgPSBFY3dpZC5nZXRTdG9yZWZyb250U3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBkZXRlY3RDdXJyZW50UGFnZSgpO1xuICAgICAgICBmdW5jdGlvbiBFQ3dpZE9uUGFnZUxvYWRpbmcocGFnZSkge1xuICAgICAgICAgICAgJGQuYWx0ZXJDbGFzcyhcInBhZ2UtdHlwZS0qXCIsIFwicGFnZS10eXBlLVwiICsgcGFnZT8udHlwZSk7XG4gICAgICAgICAgICBwYWdlTG9hZGluZ0NvbXBsZXRlZChwYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBFQ3dpZE9uUGFnZUxvYWRlZChwYWdlKSB7XG4gICAgICAgICAgICBwYWdlLnR5cGU7XG4gICAgICAgICAgICBjdXJyZW50TGluayA9IGxvY2F0aW9uLmhyZWY7XG4gICAgICAgICAgICBpZiAoIXBhZ2UuZGV0ZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2aW91c1BhZ2UgPSBjdXJyZW50UGFnZTtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZSA9IGRldGVjdEN1cnJlbnRQYWdlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQYWdlLnVybCA9PSBjdXJyZW50TGluayAmJiBwcmV2aW91c1BhZ2U/LnVybCA9PSBjdXJyZW50TGluayAmJiBwcmV2aW91c1BhZ2U/LnRpbWVzdGFtcCAtIGN1cnJlbnRQYWdlLnRpbWVzdGFtcCA8IDIwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOy8vRWN3aWQub25QYWdlTG9hZGVkIGlzIGNhbGxlZCB0d2ljZSBmb3IgdGhlIHNhbWUgcGFnZSBpbiBzb21lIGNhc2VzIGFzIHdlIGFscmVhZHkgY2FsbCBtYW51YWxseSBpbiBpbnN0YW50c2l0ZS5vblRpbGVMb2FkZWQoXCJmb290ZXJcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRQYWdlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZS50eXBlID0gcGFnZS50eXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudFBhZ2UudmFyaWF0aW9uSWQgPSBkZXRlY3RQcm9kdWN0VmFyaWF0aW9uSWQoKTtcbiAgICAgICAgICAgIG9uUGFnZVN3aXRjaEV4ZWN1dGVkID0gZmFsc2U7XG4gICAgICAgICAgICB3aW5kb3cucGFnZSA9IHBhZ2U7XG4gICAgICAgICAgICBwYWdlLnRyaWVzID0gMTtcbiAgICAgICAgICAgIHZhciBwYWdlVHlwZXMgPSBbXVxuICAgICAgICAgICAgICAgICwgY2F0ZWdvcmllcyA9IFtdXG4gICAgICAgICAgICAgICAgLCBwcm9kdWN0SWRzID0gW107XG4gICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSAkKFwiLmVjLXN0b3JlW2NsYXNzKj1lYy1zdG9yZV9fXVwiKS5hdHRyKFwiY2xhc3NcIikgfHwgXCJcIjtcbiAgICAgICAgICAgIGNsYXNzTmFtZS5yZXBsYWNlKC9lYy1zdG9yZV9fKFthLXpBLVowLTlfXFwtXSspL2dpLCBmdW5jdGlvbiAobWF0Y2gsIGNhdCkge1xuICAgICAgICAgICAgICAgIGNhdC5yZXBsYWNlKC9jYXRlZ29yeS1wYWdlLS0oXFxkKil8cHJvZHVjdC1wYWdlLS1jKFxcZCopL2dpLCAobWF0Y2gsIGNpZCwgcGNpZCkgPT4gY2F0ZWdvcmllcy5wdXNoKGNpZCwgcGNpZCkpO1xuICAgICAgICAgICAgICAgIGNhdC5yZXBsYWNlKC9wcm9kdWN0LXBhZ2UtLShcXGQqKS9naSwgKG1hdGNoLCBwaWQpID0+IHByb2R1Y3RJZHMucHVzaChwaWQpKTtcbiAgICAgICAgICAgICAgICBwYWdlVHlwZXMucHVzaCguLi5jYXQucmVwbGFjZSgvbGVnYWwtcGFnZS0tKC4qKS9naSwgXCIkMVwiKS5yZXBsYWNlKC9sZWdhbC1wYWdlL2dpLCBcIkxFR0FMIFRFUk1TXCIpLnJlcGxhY2UoL2NhdGVnb3J5LXBhZ2UvZ2ksIFwiQ0FURUdPUllcIikucmVwbGFjZSgvcHJvZHVjdC1wYWdlLS1jL2dpLCBcIkNBVEVHT1JZLS1cIikucmVwbGFjZSgvcHJvZHVjdC1wYWdlL2dpLCBcIlBST0RVQ1RcIikucmVwbGFjZSgvY29udGVudC13cmFwcGVyL2dpLCBcIlwiKS50b1VwcGVyQ2FzZSgpLnNwbGl0KFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBsID0gL14oXFwvLj8uP1xcLz8kfF5cXC8kKS9naS5leGVjKGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VUeXBlID0gbCA/IFwiaCBwYWdlLXR5cGUtU0lURVwiIDogXCJcIjtcblxuICAgICAgICAgICAgY2F0ZWdvcmllcyA9IGNhdGVnb3JpZXMuZmlsdGVyKGMgPT4gYyk7XG4gICAgICAgICAgICBwcm9kdWN0SWRzID0gcHJvZHVjdElkcy5maWx0ZXIocCA9PiBwKTtcbiAgICAgICAgICAgIGNvbnN0IGNscyA9IFtwYWdlVHlwZSwgLi4ucGFnZVR5cGVzLmZpbHRlcihjID0+IGMpLm1hcChjID0+IFwicGFnZS10eXBlLVwiICsgYyldLmpvaW4oXCIgXCIpLnNwbGl0KFwiIFwiKS5maWx0ZXIoYyA9PiBjKS5qb2luKFwiIFwiKVxuICAgICAgICAgICAgICAgICwgcGlkID0gcHJvZHVjdElkcy5qb2luKFwiXCIpXG4gICAgICAgICAgICAgICAgLCBjaWQgPSBjYXRlZ29yaWVzLmpvaW4oXCIsXCIpO1xuICAgICAgICAgICAgJGQuYWx0ZXJDbGFzcyhcInBhZ2UtdHlwZS0qXCIsIGNscyk7XG4gICAgICAgICAgICBwaWQgIT0gJGQuYXR0cihcInByb2R1Y3RJZFwiKSAmJiAocGlkID8gJGQuYXR0cihcInByb2R1Y3RJZFwiLCBwaWQpIDogJGQucmVtb3ZlQXR0cihcInByb2R1Y3RJZFwiKSk7XG4gICAgICAgICAgICBjaWQgIT0gJGQuYXR0cihcImNhdGVnb3J5SWRzXCIpICYmIChjaWQgPyAkZC5hdHRyKFwiY2F0ZWdvcnlJZHNcIiwgY2lkKSA6ICRkLnJlbW92ZUF0dHIoXCJjYXRlZ29yeUlkc1wiKSk7XG4gICAgICAgICAgICBsb2dEdXJhdGlvbihcIlBBR0VcIiwgXCJQYWdlIGxvYWRlZFwiLCBwYWdlPy50eXBlLCBwYWdlLCBjbHMpKCk7XG4gICAgICAgICAgICBsb29wT25QYWdlTG9hZChwYWdlLCAxMDAsIDEwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICApO1xuICAgIGxldCBib3VuZEFycml2ZUdyb3VwID0ge307XG4gICAgZnVuY3Rpb24gZGVmaW5lTm9uRW51bWVyYWJsZShvLCBrLCB2YWx1ZSwgZG9Ob3RPdmVyV3JpdGUpIHtcbiAgICAgICAgayBpbiBvID8gIWRvTm90T3ZlcldyaXRlICYmIChvW2tdID0gdmFsdWUpIDogX19kZWZpbmVQcm9wZXJ0eShvLCBrLCB7XG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJpbmRBcnJpdmVHcm91cChncm91cCwgc2VsZWN0b3IsIHNlbGZVbmJpbmRPblVubG9hZCwgY2FsbGJhY2tXaGVuQXJyaXZlZCwgZGVzdHJveUNhbGxiYWNrLCBjYWxsYmFja1doZW5BbGxBcnJpdmVkLCBleGlzdGluZykge1xuICAgICAgICBsZXQgc2VsZWN0b3JHcm91cCA9IGJvdW5kQXJyaXZlR3JvdXBbZ3JvdXBdIHx8IChib3VuZEFycml2ZUdyb3VwW2dyb3VwXSA9IHt9KTtcbiAgICAgICAgZGVmaW5lTm9uRW51bWVyYWJsZShzZWxlY3Rvckdyb3VwLCBcImNhbGxiYWNrV2hlbkFsbEFycml2ZWRcIiwgY2FsbGJhY2tXaGVuQWxsQXJyaXZlZCk7XG4gICAgICAgIGRlZmluZU5vbkVudW1lcmFibGUoc2VsZWN0b3JHcm91cCwgXCJzdGFydGVkQXRcIiwgbmV3IERhdGUoKSwgZmFsc2UpO1xuICAgICAgICBsZXQgc2VsZWN0b3JJdGVtID0gc2VsZWN0b3JHcm91cFtzZWxlY3Rvcl0gfHwgKHNlbGVjdG9yR3JvdXBbc2VsZWN0b3JdID0ge30pO1xuICAgICAgICBsZXQgc2VsZWN0b3JGdW5jO1xuICAgICAgICBzZWxlY3Rvckl0ZW1bY2FsbGJhY2tXaGVuQXJyaXZlZF0gPSBzZWxlY3RvckZ1bmMgPSBzZWxlY3Rvckl0ZW1bY2FsbGJhY2tXaGVuQXJyaXZlZF0gfHwge1xuICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHNlbGZVbmJpbmRPblVubG9hZCxcbiAgICAgICAgICAgIGRlc3Ryb3lDYWxsYmFjayxcbiAgICAgICAgICAgIHdoZW5BcnJpdmUsXG4gICAgICAgIH07XG4gICAgICAgIHNlbGVjdG9yRnVuYy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgZGVmaW5lTm9uRW51bWVyYWJsZShzZWxlY3RvckZ1bmMsIFwic3RhcnRlZEF0XCIsIG5ldyBEYXRlKCksIGZhbHNlKTtcbiAgICAgICAgbG9nRHVyYXRpb24odHJ1ZSwgYEluamVjdGluZyBbJHtzZWxlY3Rvcn1dLi4uYCkoKTtcblxuICAgICAgICBmdW5jdGlvbiB3aGVuQXJyaXZlKGVsZW0pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrV2hlbkFycml2ZWQoZWxlbSwgcmVzb2x2ZWQgPT4ge1xuICAgICAgICAgICAgICAgIGRlZmluZU5vbkVudW1lcmFibGUoc2VsZWN0b3JGdW5jLCBcImNvbXBsZXRlZEF0XCIsIG5ldyBEYXRlKCksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBkZWZpbmVOb25FbnVtZXJhYmxlKHNlbGVjdG9yRnVuYywgXCJjb21wbGV0ZWREdXJhdGlvblwiLCBzZWxlY3RvckZ1bmMuY29tcGxldGVkQXQgLSBzZWxlY3RvckZ1bmMuc3RhcnRlZEF0LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3JGdW5jLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgbG9nRHVyYXRpb24oc2VsZWN0b3JGdW5jLmNvbXBsZXRlZER1cmF0aW9uLCBgSW5qZWN0aW5nIFske3NlbGVjdG9yfV0gY29tcGxldGVkYCkoKTtcbiAgICAgICAgICAgICAgICBcImNvbXBsZXRlZFRpbWVvdXRcIiBpbiBzZWxlY3Rvckdyb3VwID8gY2xlYXJUaW1lb3V0KHNlbGVjdG9yR3JvdXAuY29tcGxldGVkVGltZW91dCkgOiBfX2RlZmluZVByb3BlcnR5KHNlbGVjdG9yR3JvdXAsIFwiY29tcGxldGVkVGltZW91dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3JHcm91cC5jb21wbGV0ZWRUaW1lb3V0ID0gc2V0VGltZW91dCh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBsZXRlZCA9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICwgYWxsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcyBpbiBzZWxlY3Rvckdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2kgPSBzZWxlY3Rvckdyb3VwW3NdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZiBpbiBzaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmdiA9IHNpW2ZdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZnYuY29tcGxldGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lTm9uRW51bWVyYWJsZShzZWxlY3Rvckdyb3VwLCBcImNvbXBsZXRlZEF0XCIsIG5ldyBEYXRlKCksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lTm9uRW51bWVyYWJsZShzZWxlY3Rvckdyb3VwLCBcImNvbXBsZXRlZER1cmF0aW9uXCIsIHNlbGVjdG9yR3JvdXAuY29tcGxldGVkQXQgLSBzZWxlY3Rvckdyb3VwLnN0YXJ0ZWRBdCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkID49IGFsbCAmJiBzZWxlY3Rvckdyb3VwLmNhbGxiYWNrV2hlbkFsbEFycml2ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yR3JvdXAuY2FsbGJhY2tXaGVuQWxsQXJyaXZlZChncm91cCwgc2VsZWN0b3JHcm91cCwgY29tcGxldGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWxlY3Rvckdyb3VwLmNhbGxiYWNrV2hlbkFsbEFycml2ZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICwgNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgZC5hcnJpdmUoc2VsZWN0b3IsIHtcbiAgICAgICAgICAgIGV4aXN0aW5nOiBleGlzdGluZyxcbiAgICAgICAgICAgIG9uY2VPbmx5OiB0cnVlXG4gICAgICAgIH0sIHdoZW5BcnJpdmUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZXN0cm95QXJyaXZlR3JvdXBzKCkge1xuICAgICAgICBmb3IgKHZhciBnIGluIGJvdW5kQXJyaXZlR3JvdXApIHtcbiAgICAgICAgICAgIGxldCBnciA9IGJvdW5kQXJyaXZlR3JvdXBbZ107XG4gICAgICAgICAgICBmb3IgKHZhciBzIGluIGdyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNpID0gZ3Jbc107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgZiBpbiBzaSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZnUgPSBzaVtmXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZ1LnNlbGZVbmJpbmRPblVubG9hZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZC51bmJpbmRBcnJpdmUocywgb25jZU9ubHksIGZ1LndoZW5BcnJpdmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZ1LmRlc3Ryb3lDYWxsYmFjayAmJiBmdS5kZXN0cm95Q2FsbGJhY2socywgZywgZ3IsIHNpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHNpW2ZdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWxldGUgZ3Jbc107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgYm91bmRBcnJpdmVHcm91cFtnXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvblVubG9hZCh0cnVlLCB1ID0+IGRlc3Ryb3lBcnJpdmVHcm91cHMpO1xuICAgIGZ1bmN0aW9uIHNob3dBY3Rpb25CYXJXaGVuUmVhZHkoZ3JvdXAsIHNlbGVjdG9yR3JvdXAsIGNvbXBsZXRlZCkge1xuICAgICAgICBjb21wbGV0ZWQ7XG4gICAgICAgIHNob3dBY3Rpb25CYXIoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5qZWN0TWVudVdyYXBwZXIoZWxlbSwgY29tcGxldGVkQ2FsbGJhY2spIHtcbiAgICAgICAgdmFyIG1lbnVXcmFwcGVyID0gJChcIi5lYy13cmFwcGVyIC5lYy1zdG9yZV9fcHJvZHVjdC1wYWdlXCIpO1xuICAgICAgICBpZiAoIW1lbnVXcmFwcGVyLmNoaWxkcmVuKFwiLm1lbnUtd3JhcHBlclwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIG1lbnVXcmFwcGVyLmFwcGVuZChzdmdJY29ucy5tZW51V3JhcHBlcigpKTtcbiAgICAgICAgICAgIG1lbnVXcmFwcGVyLmZpbmQoXCIubWVudV9faXRlbSBzdmdcIikuZWFjaCgoaSwgZWxlbSkgPT4gZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGUgPSAkKGUudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrZWRcIiwgZS50YXJnZXQsICRlLmhhc0NsYXNzKFwibWVudV9faXRlbVwiKSwgJGVbMF0sICRlLnBhcmVudHMoXCIubWVudV9faXRlbVwiKVswXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsaWNrSXRlbShlLCAkZS5oYXNDbGFzcyhcIm1lbnVfX2l0ZW1cIikgPyAkZVswXSA6ICRlLnBhcmVudHMoXCIubWVudV9faXRlbVwiKVswXSk7XG4gICAgICAgICAgICB9LCB0cnVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29tcGxldGVkQ2FsbGJhY2sgJiYgY29tcGxldGVkQ2FsbGJhY2soKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdW5pbmplY3RNZW51V3JhcHBlcihzZWxlY3RvciwgZ3JvdXAsIGdyb3VwSXRlbSwgc2VsZWN0b3JJdGVtKSB7XG4gICAgICAgICQoXCIuZWMtd3JhcHBlciAuZWMtc3RvcmVfX3Byb2R1Y3QtcGFnZVwiKS5maW5kKFwiLm1lbnUtd3JhcHBlciwgLmFjdGlvbi1idXR0b25zXCIpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuaW5qZWN0UHJvZHVjdERldGFpbHNBY3Rpb25CdXR0b25zKHNlbGVjdG9yLCBncm91cCwgZ3JvdXBJdGVtLCBzZWxlY3Rvckl0ZW0pIHtcbiAgICAgICAgJChcIi5hY3Rpb24tYnV0dG9ucyAuZGV0YWlscy1wcm9kdWN0LXB1cmNoYXNlX19jb250cm9sc1wiKS5yZW1vdmUoKTtcbiAgICAgICAgLy8gLmhpZGUoKVxuICAgICAgICAvLyAuYXBwZW5kVG8oXG4gICAgICAgIC8vICAgXCIucHJvZHVjdC1kZXRhaWxzLW1vZHVsZS5wcm9kdWN0LWRldGFpbHNfX2FjdGlvbi1wYW5lbC5kZXRhaWxzLXByb2R1Y3QtcHVyY2hhc2UgLnByb2R1Y3QtZGV0YWlscy1tb2R1bGVfX2NvbnRlbnQucHJvZHVjdC1kZXRhaWxzLW1vZHVsZV9fY29udGVudC0taW5kZW50ZWRcIlxuICAgICAgICAvLyApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluamVjdFByb2R1Y3REZXRhaWxzQWN0aW9uQnV0dG9ucyhidXR0b25zLCBjb21wbGV0ZWRDYWxsYmFjaykge1xuICAgICAgICB2YXIgcGFyZW50ID0gJChidXR0b25zKS5wYXJlbnQoKTtcbiAgICAgICAgZC5hcnJpdmUoXCIuYWN0aW9uLWJ1dHRvbnNcIiwgb25jZU9ubHksIGVsZW0gPT4ge1xuICAgICAgICAgICAgbGV0IGFiID0gJChlbGVtKTtcbiAgICAgICAgICAgIGlmICghYWIuY2hpbGRyZW4oXCIuZGV0YWlscy1wcm9kdWN0LXB1cmNoYXNlX19jb250cm9sc1wiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhYi5hcHBlbmQoYnV0dG9ucyk7XG4gICAgICAgICAgICAgICAgcGFyZW50LmFwcGVuZChidXR0b25zLm91dGVySFRNTCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21wbGV0ZWRDYWxsYmFjayAmJiBjb21wbGV0ZWRDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gLy8kKCcuZGV0YWlscy1wcm9kdWN0LXB1cmNoYXNlX19xdHknKS5wYXJlbnQoKS5pbnNlcnRBZnRlcignLnByb2R1Y3QtZGV0YWlscy1tb2R1bGVfX3RpdGxlLmRldGFpbHMtcHJvZHVjdC1wcmljZS13aG9sZXNhbGVfX3RpdGxlJyk7XG4gICAgICAgIC8vIC8vIHRpdGxlLndyYXBJbm5lcigkKCc8YS8+JykuYWRkQ2xhc3MoJ3Byb2R1Y3QtdGFiIHByb2R1Y3Qtc3BlY3MtdGFiLXRpdGxlJylcbiAgICAgICAgLy8gLy8gICAgIC5jbGljayhlID0+ICRkLmFsdGVyQ2xhc3MoXCJkZXRhaWxzLXRhYi0qXCIsICdkZXRhaWxzLXRhYi1zcGVjcycpKVxuICAgICAgICAvLyAvLyAgICAgKVxuICAgICAgICAvLyAvLyAgICAgLmFwcGVuZCgkKCc8YSAvPicpLmFkZENsYXNzKCdwcm9kdWN0LXRhYiBwcm9kdWN0LWRlc2NyaXB0aW9uLXRhYi10aXRsZScpXG4gICAgICAgIC8vIC8vICAgICAgICAgLnRleHQoJ0Rlc2NyaXB0aW9uJylcbiAgICAgICAgLy8gLy8gICAgICAgICAuY2xpY2soZSA9PiAkZC5hbHRlckNsYXNzKFwiZGV0YWlscy10YWItKlwiLCAnZGV0YWlscy10YWItZGVzY3JpcHRpb24nKSlcbiAgICAgICAgLy8gLy8gICAgICk7XG4gICAgICAgIC8vIC8vdGl0bGUubGVuZ3RoICYmICRkLmFsdGVyQ2xhc3MoXCJkZXRhaWxzLXRhYi0qXCIsICdkZXRhaWxzLXRhYi1zcGVjcycpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBiaW5kQWRkVG9DYXJ0Q29udHJvbHMoY3VycmVudFByb2R1Y3RJZCwgcGFnZUlmQW55LCBleGlzdGluZykge1xuICAgICAgICAkZC5hcnJpdmUoXCIuZWMtc2l6ZVwiLCB7XG4gICAgICAgICAgICBleGlzdGluZzogZmFsc2UsXG4gICAgICAgICAgICBvbmNlT25seTogdHJ1ZVxuICAgICAgICB9LCBlbGVtID0+IHtcbiAgICAgICAgICAgIEVDU2l6ZUNsYXNzQ2hhbmdlLmNhbGwoZWxlbSwgZWxlbS5jbGFzc05hbWUpO1xuICAgICAgICAgICAgVHJ5KGluamVjdE11dGF0aW9uT2JzZXJ2ZXIsIGVsZW0sIEVDU2l6ZUNsYXNzQ2hhbmdlKTtcbiAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBvbkRvbVJlYWR5KGRvbUVsZW0gPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCh0ID0+IGQuYXJyaXZlKFwiLmVjLXN0b3JlX19wcm9kdWN0LXBhZ2VcIiwgb25jZU9ubHksIGVsID0+IHtcbiAgICAgICAgICAgICAgICBib25kQWRkVG9DYXJ0Q29udHJvbHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJpbmRBcnJpdmVHcm91cChcIkFCXCIsIFwiLmRldGFpbHMtcHJvZHVjdC1wdXJjaGFzZV9fY29udHJvbHNcIiwgdHJ1ZSwgaW5qZWN0UHJvZHVjdERldGFpbHNBY3Rpb25CdXR0b25zLCB1bmluamVjdFByb2R1Y3REZXRhaWxzQWN0aW9uQnV0dG9ucywgc2hvd0FjdGlvbkJhcldoZW5SZWFkeSwgZXhpc3RpbmcpO1xuICAgICAgICAgICAgICAgIGJpbmRBcnJpdmVHcm91cChcIkFCXCIsIFwiLnByb2R1Y3QtZGV0YWlsc19fc2lkZWJhciAucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXRpdGxlLmVjLWhlYWRlci1oM1wiLCB0cnVlLCBpbmplY3RNZW51V3JhcHBlciwgdW5pbmplY3RNZW51V3JhcHBlciwgc2hvd0FjdGlvbkJhcldoZW5SZWFkeSwgZXhpc3RpbmcpO1xuICAgICAgICAgICAgICAgIFRyeShsaXN0ZW5Ub0Fycml2ZVByb2R1Y3RPcHRpb25zLCBleGlzdGluZyk7XG4gICAgICAgICAgICAgICAgVHJ5KGxpc3RlblRvUHJlZXBtdGl2ZVByaWNlLCBjdXJyZW50UHJvZHVjdElkLCBwYWdlSWZBbnksIGV4aXN0aW5nKTtcbiAgICAgICAgICAgICAgICBkLmFycml2ZShcIi5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3Qtd2VpZ2h0XCIsIG5vdE9uY2VPbmx5LCBlbGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmaXhQcm9kdWN0V2VpZ2h0LCAyMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKSwgMzAwKTtcbiAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHZhciB0b2dnbGVTY3JvbGxUb0Rlc2NyaXB0aW9uID0gdHJ1ZVxuICAgICAgICAsIHNjcm9sbE9wdGlvbkluZGV4ID0gMDtcbiAgICBmdW5jdGlvbiBjbGlja0l0ZW0oZSwgYWN0aXZlSXRlbSkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2NsaWNrZWQnLCBpdGVtKVxuICAgICAgICB2YXIgJG1lbnUgPSAkKFwiLm1lbnVcIik7XG4gICAgICAgIHZhciAkYWkgPSAkKGFjdGl2ZUl0ZW0gfHwgdGhpcyk7XG4gICAgICAgICRtZW51ICYgJG1lbnVbMF0uc3R5bGUucmVtb3ZlUHJvcGVydHkoXCItLXRpbWVPdXRcIik7XG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlTWVudSh0YWIpIHtcbiAgICAgICAgICAgIC8vICRtZW51LmZpbmQoJy5tZW51X19pdGVtOm5vdChcIi5tZW51X19pdGVtLWZhdixtZW51X19pdGVtLWltYWdlXCIpJylcbiAgICAgICAgICAgIC8vICAgICAuZWFjaCgoaSwgaXRlbSkgPT4gJChpdGVtKS50b2dnbGVDbGFzcyhcImFjdGl2ZVwiLCBhY3RpdmVJdGVtID09IGl0ZW0pKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjbHMnLCBjbHMpXG4gICAgICAgICAgICAkZC5hbHRlckNsYXNzKFwic2hvdy10YWItKlwiLCB0YWIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjbHMgPSAkYWkuYXR0cihcImFjdGlvblwiKTtcbiAgICAgICAgdmFyIGgxID0gJChcIi5wcm9kdWN0LWRldGFpbHNfX3NpZGViYXIgLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC10aXRsZVwiKTtcbiAgICAgICAgc3dpdGNoIChjbHMpIHtcbiAgICAgICAgICAgIGNhc2UgXCJ0b2dnbGUtdGFiLWltYWdlXCI6XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hvd2luZ1NtYWxsSW1hZ2UgPSAkZC5oYXNDbGFzcyhcInNob3ctdGFiLXNtYWxsLWltYWdlXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNob3dpbmdGdWxsSW1hZ2UgPSAkZC5oYXNDbGFzcyhcInNob3ctdGFiLWZ1bGwtaW1hZ2VcIik7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hvd2luZ0ltYWdlID0gJGQuaGFzQ2xhc3MoXCJzaG93LXRhYi1pbWFnZVwiKTtcbiAgICAgICAgICAgICAgICBsZXQgdG9wID0gMDtcbiAgICAgICAgICAgICAgICBsZXQgbW9kZTtcbiAgICAgICAgICAgICAgICBpZiAoc2hvd2luZ1NtYWxsSW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJGQudG9nZ2xlQ2xhc3MoXCJzaG93LXRhYi1pbWFnZSBzaG93LXRhYi1zbWFsbC1pbWFnZVwiLCBmYWxzZSkudG9nZ2xlQ2xhc3MoXCJzaG93LXRhYi1mdWxsLWltYWdlXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0b3AgPSAxMDA7XG4gICAgICAgICAgICAgICAgICAgIG1vZGUgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hvd2luZ0Z1bGxJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAkZC50b2dnbGVDbGFzcyhcInNob3ctdGFiLWltYWdlXCIsIHRydWUpLnRvZ2dsZUNsYXNzKFwic2hvdy10YWItc21hbGwtaW1hZ2Ugc2hvdy10YWItZnVsbC1pbWFnZVwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSA+IDAgPyAzMCA6IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgbW9kZSA9IDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzaG93aW5nSW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJGQudG9nZ2xlQ2xhc3MoXCJzaG93LXRhYi1pbWFnZSBzaG93LXRhYi1mdWxsLWltYWdlXCIsIGZhbHNlKS50b2dnbGVDbGFzcyhcInNob3ctdGFiLXNtYWxsLWltYWdlXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBtb2RlID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkZC50b2dnbGVDbGFzcyhcInNob3ctdGFiLWltYWdlXCIpO1xuICAgICAgICAgICAgICAgICAgICBtb2RlID0gXCJcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzaG93LXRhYi1pbWFnZVwiLCBtb2RlPy50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVQcm9kdWN0SW1hZ2VNYXhXaWR0aEJhc2VkT25TY3JvbGwodG9wKTtcbiAgICAgICAgICAgICAgICAkYWkudG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgLy8sIGFjdGl2ZUl0ZW0gPT0gaXRlbSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidG9nZ2xlLXRhYi13YXJyYW50eVwiOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInRvZ2dsZS10YWItZmF2XCI6XG4gICAgICAgICAgICAgICAgJGQudG9nZ2xlQ2xhc3MoXCJzaG93LXRhYi1mYXZcIik7XG4gICAgICAgICAgICAgICAgbGV0IGZiID0gJChcIi5mYXZvcml0ZS1wcm9kdWN0X19idXR0b24tYWRkOnZpc2libGUgYnV0dG9uLCAuZmF2b3JpdGUtcHJvZHVjdF9fYnV0dG9uLXNhdmVkOnZpc2libGUgYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgIGZiLmxlbmd0aCAmJiBmYlswXS5jbGljaygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInRvZ2dsZS10YWItb3B0aW9uc1wiOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZXIgPSBELnNjcm9sbEhlaWdodCA+PSBiLnNjcm9sbEhlaWdodCA/IHdpbmRvdyA6IGJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgcG8gPSAkKFwiLmRldGFpbHMtcHJvZHVjdC1vcHRpb25cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICwgdG9wID0gc21vb3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAsIHNwID0gc2Nyb2xsT3B0aW9uSW5kZXgrKyA8IHBvLmxlbmd0aCA/IHBvW3Njcm9sbE9wdGlvbkluZGV4IC0gMV0gOiBwb1soc2Nyb2xsT3B0aW9uSW5kZXggPSAwKV07XG4gICAgICAgICAgICAgICAgICAgIHNwLnNjcm9sbEludG9WaWV3KHRvcCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwbyA9ICQoXCIucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LW9wdGlvbnNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0UG9zaXRpb24gPSBwby5sZW5ndGggPyBwby5vZmZzZXQoKS50b3AgKyAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY3LjUgPyAtaDEuaGVpZ2h0KCkgLSAxMCAtICQoXCIucHJvZHVjdC1kZXRhaWxzX19nYWxsZXJ5XCIpLm9mZnNldCgpLnRvcCA6IC1oMS5oZWlnaHQoKSAtIHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoJChcIi5wcm9kdWN0LWRldGFpbHNfX3NpZGViYXJcIilbMF0pLm1hcmdpblRvcCkpIDogMTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gJChcImh0bWxcIikuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBzY3JvbGxUb3A6IG9mZnNldFBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IG9mZnNldFBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWN0aXZhdGVNZW51KCdvcHRpb25zJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidG9nZ2xlLXRhYi1kZXNjcmlwdGlvblwiOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gJGQudG9nZ2xlQ2xhc3MoXCJzaG93LXRhYi1zbWFsbC1pbWFnZSBzaG93LXRhYi1mdWxsLWltYWdlXCIsIGZhbHNlKS50b2dnbGVDbGFzcyhcInNob3ctdGFiLWltYWdlXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnN0IG9mZnNldFRvcCA9ICQoXCIucHJvZHVjdC1kZXRhaWxzLW1vZHVsZS5wcm9kdWN0LWRldGFpbHNfX2dlbmVyYWwtaW5mb1wiKS5vZmZzZXQoKS50b3A7ICsgKCQod2luZG93KS53aWR0aCgpIDw9IDc2Ny41ID8gaDEuaGVpZ2h0KCkgKyAkKFwiLnByb2R1Y3QtZGV0YWlsc19fZ2FsbGVyeVwiKS5vZmZzZXQoKS50b3AgOiAtJChcIi5wcm9kdWN0LWRldGFpbHNfX2dhbGxlcnlcIikub2Zmc2V0KCkudG9wKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZXIgPSBELnNjcm9sbEhlaWdodCA+PSBiLnNjcm9sbEhlaWdodCA/IHdpbmRvdyA6IGJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgdG9wID0gc21vb3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAsIGJvdHRvbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeDI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6IFwiZW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICwgbW9iaWxlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6ICQoXCIucHJvZHVjdC1kZXRhaWxzLW1vZHVsZS5wcm9kdWN0LWRldGFpbHNfX2dlbmVyYWwtaW5mb1wiKVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6IHRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiAkKFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1kZXNjcmlwdGlvblwiKVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6IHRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLCBkZXNrdG9wID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiAkKFwiLnByb2R1Y3QtZGV0YWlsc19fc2lkZWJhclwiKVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6IHRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6ICQoJGQuaXMoXCIuc2hvdy10YWItZnVsbC1pbWFnZVwiKSA/IFwiLnNlY29uZGFyeV9fZGVzY3JpcHRpb25cIiA6IFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1kZXNjcmlwdGlvblwiKVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6IHRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLCBpc0Rlc2t0b3AgPSAkdy53aWR0aCgpID4gNzY3LjVcbiAgICAgICAgICAgICAgICAgICAgICAgICwgc2Nyb2xsID0gKGlzRGVza3RvcCA/IGRlc2t0b3AgOiBtb2JpbGUpW3RvZ2dsZVNjcm9sbFRvRGVzY3JpcHRpb24gPyBcImFjdHVhbFwiIDogXCJnZW5lcmFsXCJdO1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGwudGFyZ2V0LnNjcm9sbEludG9WaWV3KHNjcm9sbC5iZWhhdmlvcik7XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVNjcm9sbFRvRGVzY3JpcHRpb24gPSAhdG9nZ2xlU2Nyb2xsVG9EZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgLy8gJChcImh0bWxcIikuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgc2Nyb2xsVG9wOm9mZnNldFRvcCxcbiAgICAgICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICgpLnNjcm9sbFRvKHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICB0b3A6IG9mZnNldFRvcCxcbiAgICAgICAgICAgICAgICAgICAgLy8gICBiZWhhdmlvcjogXCJzbW9vdGhcIixcbiAgICAgICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2YXRlTWVudSgnZGVzY3JpcHRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZU1lbnUoJ29wdGlvbnMnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIEVDU2l6ZUNsYXNzQ2hhbmdlKGNscykge1xuICAgICAgICAvL3JlbW92ZXMgZXh0cmEtY2xhc3MgbmFtZXMgZnJvbSBlYy1zaXplIGVsZW1lbnQgKEZpeGluZyBFQ1dJRCBsYXlvdXQgY3NzIGJ1ZyBvbiBtb2JpbGUgZGV2aWNlcyByZXNvbHV0aW9ucylcbiAgICAgICAgaWYgKCFjbHMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciB3ID0gJGQub3V0ZXJXaWR0aCgpO1xuICAgICAgICB2YXIgciA9IFtdO1xuICAgICAgICAvLzQxNFxuICAgICAgICBpZiAodyA8IDQxNClcbiAgICAgICAgICAgIHIucHVzaChcIiBlYy1zaXplLS14c1wiKTtcbiAgICAgICAgaWYgKHcgPCA3NjgpXG4gICAgICAgICAgICByLnB1c2goXCIgZWMtc2l6ZS0tc1wiKTtcbiAgICAgICAgaWYgKHcgPCA3NjgpXG4gICAgICAgICAgICByLnB1c2goXCIgZWMtc2l6ZS0tbVwiKTtcbiAgICAgICAgaWYgKHcgPCAxMDI0KVxuICAgICAgICAgICAgci5wdXNoKFwiIGVjLXNpemUtLWxcIik7XG4gICAgICAgIGlmICh3IDwgMTEwMClcbiAgICAgICAgICAgIHIucHVzaChcIiBlYy1zaXplLS14bFwiKTtcbiAgICAgICAgaWYgKHcgPCAxNDQwKVxuICAgICAgICAgICAgci5wdXNoKFwiIGVjLXNpemUtLXh4bFwiKTtcbiAgICAgICAgdmFyIHVwZGF0ZWRDbHMgPSBjbHMucmVwbGFjZShuZXcgUmVnRXhwKHIuam9pbihcInxcIiksIFwiZ2lcIiksIFwiXCIpO1xuICAgICAgICBpZiAodyA8PSA3NjgpIHtcbiAgICAgICAgICAgIGlmICghL2Vjd2lkLWx0ZS03NjhweC8udGVzdCh1cGRhdGVkQ2xzKSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWRDbHMgPSB1cGRhdGVkQ2xzLnJlcGxhY2UoXCIgZWMtc2l6ZVwiLCBcIiBlY3dpZC1sdGUtNzY4cHggZWMtc2l6ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghL2Vjd2lkLWd0LTc2OHB4Ly50ZXN0KHVwZGF0ZWRDbHMpKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZENscyA9IHVwZGF0ZWRDbHMucmVwbGFjZShcIiBlYy1zaXplXCIsIFwiIGVjd2lkLWd0LTc2OHB4IGVjLXNpemVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNscyAhPSB1cGRhdGVkQ2xzKSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IHVwZGF0ZWRDbHM7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNsYXNzIGF0dHJpYnV0ZSBjaGFuZ2VkIHRvOlwiLCBjbHMsIHVwZGF0ZWRDbHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIFBXU1BEaWFsb2dDbGFzc0NoYW5nZWQoY2xzKSB7XG4gICAgICAgIGxldCBpc1BvcHVwT3BlbmVkID0gL3Bzd3AtLW9wZW4vLnRlc3QoY2xzKTtcbiAgICAgICAgbGV0IHdhc0Z1bGxTY3JlZW4gPSAkZC5oYXNDbGFzcyhcImpzdi1mdWxsLXNjcmVlblwiKTtcbiAgICAgICAgaWYgKGlzUG9wdXBPcGVuZWQgJiYgIXdhc0Z1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgIGhpZGVBY3Rpb25CYXIoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzUG9wdXBPcGVuZWQgJiYgd2FzRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgc2hvd0FjdGlvbkJhcigpO1xuICAgICAgICB9XG4gICAgICAgICRkLnRvZ2dsZUNsYXNzKFwianN2LWZ1bGwtc2NyZWVuXCIsIGlzUG9wdXBPcGVuZWQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbmplY3RNdXRhdGlvbk9ic2VydmVyKHRhcmdldCwgY2FsbGJhY2ssIGF0dHJpYnV0ZSkge1xuICAgICAgICBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGUgfHwgXCJjbGFzc1wiO1xuICAgICAgICB2YXIgJGRpdiA9ICQodGFyZ2V0KTtcbiAgICAgICAgaWYgKCEkZGl2Lmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIG9ic2VydmluZyA9IGZhbHNlO1xuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobXV0YXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAob2JzZXJ2aW5nKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgb2JzZXJ2aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2xzID0gJChtdXRhdGlvbi50YXJnZXQpLnByb3AobXV0YXRpb24uYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwobXV0YXRpb24udGFyZ2V0LCBjbHMpO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSgkZGl2WzBdLCB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbYXR0cmlidXRlXSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNhbGxiYWNrKCRkaXYuYXR0cihhdHRyaWJ1dGUpKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuZml4Rm9ybUZhY3RvciA9IGZ1bmN0aW9uIGZpeEZvcm1GYWN0b3IoKSB7XG4gICAgICAgICQoXCIubWVudVwiKS5jc3MoXCItLXRpbWVPdXRcIiwgXCJub25lXCIpO1xuICAgIH1cbiAgICAgICAgO1xuICAgIGZ1bmN0aW9uIGVuc3VyZVN0eWxlRWxlbWVudEV4aXN0cyhpZCkge1xuICAgICAgICB2YXIganNDU1MgPSAkKGAjJHtpZH1gKTtcbiAgICAgICAgaWYgKCFqc0NTUy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGpzQ1NTID0gJChgPHN0eWxlIGlkPScke2lkfScgdHlwZT0ndGV4dC9jc3MnPjwvc3R5bGU+YCk7XG4gICAgICAgICAgICAkYi5hcHBlbmQoanNDU1MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc0NTUztcbiAgICB9XG4gICAgdmFyIG1lYXN1cmVtZW50VG9vbCA9IGZvbnRTaXplID0+IHtcbiAgICAgICAgdmFyIG0gPSAkKFwiI21lYXN1cmVcIik7XG4gICAgICAgIGxldCB0aXRsZSA9ICQoXCJoMS5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtdGl0bGVcIik7XG4gICAgICAgIGxldCBwID0gdGl0bGUucGFyZW50KCk7XG4gICAgICAgIG0gPSBtLmxlbmd0aCA/IG0gOiAkKFwiPGRpdi8+XCIpLmF0dHIoXCJpZFwiLCBcIm1lYXN1cmVcIikuY3NzKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IFwiMFwiLFxuICAgICAgICAgICAgXCJmb250LWZhbWlseVwiOiBcInZhcigtLWdsb2JhbC10aXRsZS1mb250LWZhbWlseS1zdGFjaylcIixcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcInZhcigtLXByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC10aXRsZS0tZm9udC1zaXplKVwiLFxuICAgICAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgfSkud3JhcCgkKFwiPGRpdj48L2Rpdj5cIikuY3NzKHtcbiAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IHAuY3NzKFwiZm9udC1zaXplXCIpLFxuICAgICAgICAgICAgXCJsaW5lLWhlaWdodFwiOiBwLmNzcyhcImxpbmUtaGVpZ2h0XCIpLFxuICAgICAgICB9KSkucGFyZW50KCkvLy5hcHBlbmRUbygkKCcjdGlsZS1wcm9kdWN0LWRldGFpbHMnKSlcbiAgICAgICAgICAgIC5maW5kKFwiI21lYXN1cmVcIik7XG4gICAgICAgIG0uY3NzKHtcbiAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IGZvbnRTaXplLFxuICAgICAgICAgICAgXCJwYWRkaW5nLWxlZnRcIjogdGl0bGUuY3NzKFwicGFkZGluZy1sZWZ0XCIpLFxuICAgICAgICAgICAgXCJwYWRkaW5nLXJpZ2h0XCI6IHRpdGxlLmNzcyhcInBhZGRpbmctcmlnaHRcIiksXG4gICAgICAgICAgICBcImxpbmUtaGVpZ2h0XCI6ICQod2luZG93KS5zY3JvbGxUb3AoKSA+IDAgPyBcIjI0LjA0OHB4XCIgOiBcIjI5Ljc2cHhcIixcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtO1xuICAgIH1cbiAgICAgICAgO1xuICAgIGZ1bmN0aW9uIHNldFByb2R1Y3RUaXRsZUhlaWdodChoMUhlaWdodCkge1xuICAgICAgICBjb25zdCBoMSA9ICQoXCJoMS5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtdGl0bGVcIik7XG4gICAgICAgIGNvbnN0IGgyID0gJChcImRpdi5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtdGl0bGVcIik7XG4gICAgICAgIGxldCBoID0gaDFIZWlnaHQgPT09IHVuZGVmaW5lZCA/IGgxLmlzKFwiOnZpc2libGVcIikgPyBoMS5oZWlnaHQoKSA6IGgyLmhlaWdodCgpIDogaDFIZWlnaHQ7XG4gICAgICAgIGxldCBqc0NTUyA9IGVuc3VyZVN0eWxlRWxlbWVudEV4aXN0cyhcImpzLWNzcy1wcm9kdWN0LW9wdGlvbnNcIik7XG4gICAgICAgIC8vY29uc29sZS5sb2coaDFIZWlnaHQgPT09IHVuZGVmaW5lZCA/IFwiYWN0dWFsRmluYWxIZWlnaHRcIiA6IFwiZXN0aW1hdGVkRmluYWxIZWlnaHRcIiwgaCk7XG5cbiAgICAgICAganNDU1MudGV4dChgI3RpbGUtcHJvZHVjdC1kZXRhaWxzIHsgXG4gICAgICAgIC0tcHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXRpdGxlLS1oZWlnaHQ6ICR7aH1weDtcbn1gKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZGV0ZXJtaW5lUHJvZHVjdERldGFpbHNMYXJnZU9wdGlvbnMoZm9udFNpemUpIHtcbiAgICAgICAgLy9TaG93IHRoZSBzZWNvbmQgdGl0bGUsIGluIHRoZSBwcm9kdWN0IGRldGFpbHMgb25seSBmb3IgbGFyZ2VyIHBhZ2VzIHdpdGggbWFueSBvcHRpb25zXG4gICAgICAgICQoXCJodG1sXCIpLnRvZ2dsZUNsYXNzKFwicHJvZHVjdC1kZXRhaWxzLWxhcmdlLW9wdGlvbnNcIiwgJChcIi5wcm9kdWN0LWRldGFpbHNfX3NpZGViYXJcIikuaGVpZ2h0KCkgPiAkKHdpbmRvdykuaGVpZ2h0KCkpO1xuICAgICAgICBjb25zdCBoMSA9ICQoXCJoMS5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtdGl0bGUuZWMtaGVhZGVyLWgzXCIpO1xuICAgICAgICBjb25zdCBoMiA9ICQoXCJkaXYucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXRpdGxlXCIpO1xuICAgICAgICBjb25zdCBoID0gaDEuaXMoXCI6dmlzaWJsZVwiKSA/IGgxIDogaDI7XG4gICAgICAgIGlmIChoLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIG10ID0gbWVhc3VyZW1lbnRUb29sKGZvbnRTaXplKS50ZXh0KGgudGV4dCgpKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVzdGltYXRlZEZpbmFsSGVpZ2h0ID0gbXQuaGVpZ2h0KCkgfHwgaC5oZWlnaHQoKTtcbiAgICAgICAgICAgICAgICBzZXRQcm9kdWN0VGl0bGVIZWlnaHQoZXN0aW1hdGVkRmluYWxIZWlnaHQpO1xuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHNldFByb2R1Y3RUaXRsZUhlaWdodCwgTWF0aC5yb3VuZChwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGgxWzBdKS50cmFuc2l0aW9uRHVyYXRpb24pICogMTAwMCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdpbmRvdy5kZXRlcm1pbmVQcm9kdWN0RGV0YWlsc0xhcmdlT3B0aW9ucyA9IGRldGVybWluZVByb2R1Y3REZXRhaWxzTGFyZ2VPcHRpb25zO1xuICAgIGZ1bmN0aW9uIHVwZGF0ZVByb2R1Y3RJbWFnZU1heFdpZHRoQmFzZWRPblNjcm9sbChzY3JvbGxWVykge1xuICAgICAgICBpZiAoJGQuaGFzQ2xhc3MoXCJzaG93LXRhYi1mdWxsLWltYWdlXCIpKSB7XG4gICAgICAgICAgICBzY3JvbGxWVyA9IDEwMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZm9udFNpemUgPSAxICsgKHNjcm9sbFZXIC8gMTAwKSAqICgxLjYgLSAxKTtcbiAgICAgICAgbGV0IGpzQ1NTID0gZW5zdXJlU3R5bGVFbGVtZW50RXhpc3RzKFwianMtY3NzLXByb2R1Y3QtZ2FsbGVyeVwiKTtcbiAgICAgICAgaWYgKHdpbmRvdy5qc3YpIHtcbiAgICAgICAgICAgIHN0b3BKU1YoKTtcbiAgICAgICAgICAgIC8vdmFyIHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNwaW5KU1YoKTtcbiAgICAgICAgICAgICAgICAvLyAkKHdpbmRvdykuc2Nyb2xsVG9wKHNjcm9sbFRvcCk7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0aHVtYk1heEhlaWdodCA9IFwiXCI7XG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSAxMDAwKSB7Ly8gdGh1bWJNYXhIZWlnaHQgPSBgXG4gICAgICAgICAgICAvLyAgICAgI3RpbGUtcHJvZHVjdC1kZXRhaWxzIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgLS1kZXRhaWxzLWdhbGxlcnlfX3RodW1iLS1tYXgtd2lkdGg6ICR7c2Nyb2xsVld9dnc7XG4gICAgICAgICAgICAvLyAgICAgfWA7XG4gICAgICAgIH1cbiAgICAgICAganNDU1MudGV4dChgLnNob3ctdGFiLWltYWdlICN0aWxlLXByb2R1Y3QtZGV0YWlscyB7IFxuICAgICAgICAgICAgICAgICAgICAtLXByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1vcHRpb25zLS1leHRyYS1tYXJnaW4tdG9wOiAke3Njcm9sbFZXID09IDEwMCA/IDAgOiAoKHNjcm9sbFZXICsgMjIpICogMykgLyA0fXZ3O1xuICAgICAgICAgICAgICAgICAgICAtLXByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC10aXRsZS0tZm9udC1zaXplOiAke2ZvbnRTaXplfWVtO1xuICAgICAgICB9IFxuICAgICAgICAke3RodW1iTWF4SGVpZ2h0fWApO1xuICAgICAgICAvL2Fsc28gYWRqdXN0IHRoZSBwcm9kdWN0IG9wdGlvbidzIHRvcCBiYXNlZCBvbiB0aGUgbmV3IHByb2R1Y3QtdGl0bGUgZm9udCBzaXplIVxuICAgICAgICBkZXRlcm1pbmVQcm9kdWN0RGV0YWlsc0xhcmdlT3B0aW9ucyhmb250U2l6ZSArIFwiZW1cIik7XG4gICAgfVxuICAgIHVwZGF0ZVByb2R1Y3RJbWFnZU1heFdpZHRoQmFzZWRPblNjcm9sbCgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAwID8gMzAgOiAxMDApO1xuICAgIHdpbmRvdy51cGRhdGVQcm9kdWN0SW1hZ2VNYXhXaWR0aEJhc2VkT25TY3JvbGwgPSB1cGRhdGVQcm9kdWN0SW1hZ2VNYXhXaWR0aEJhc2VkT25TY3JvbGw7XG4gICAgdmFyIGlzR2FsbGVyeU1pbmltaXplZCA9IDA7XG4gICAgdmFyIGlzU2Nyb2xsaW5nID0gdHJ1ZVxuICAgICAgICAsIHNjcm9sbFRpbWVvdXQgPSAwO1xuICAgIGZ1bmN0aW9uIHByb2Nlc3NTY3JvbGwoKSB7XG4gICAgICAgIHZhciBuZXdTY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIGlmICgvc2Nyb2xsPS9pLnRlc3QobG9jYXRpb24uaHJlZikpIHtcbiAgICAgICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKGhpc3Rvcnkuc3RhdGUsIG51bGwsIGxvY2F0aW9uLmhyZWYucmVwbGFjZSgvc2Nyb2xsPVxcZCsvaSwgXCJzY3JvbGw9XCIgKyBwYXJzZUludChuZXdTY3JvbGxUb3ApKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIm5ld1Njcm9sbFRvcFwiLCBuZXdTY3JvbGxUb3ApO1xuICAgICAgICBpZiAobmV3U2Nyb2xsVG9wID49IDEwICYmICFpc0dhbGxlcnlNaW5pbWl6ZWQpIHtcbiAgICAgICAgICAgIC8vIGlmICghaXNHYWxsZXJ5TWluaW1pemVkKSB7XG4gICAgICAgICAgICAvLyAgICAgaXNTY3JvbGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgLy8gICAgIHRyeSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICQod2luZG93KS5zY3JvbGxUb3AoMTApO1xuICAgICAgICAgICAgLy8gICAgIH0gZmluYWxseSB7IGlzU2Nyb2xsaW5nID0gZmFsc2U7IH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGlzR2FsbGVyeU1pbmltaXplZCA9IDE7XG4gICAgICAgICAgICB1cGRhdGVQcm9kdWN0SW1hZ2VNYXhXaWR0aEJhc2VkT25TY3JvbGwoMzApO1xuICAgICAgICAgICAgZGV0ZXJtaW5lUHJvZHVjdERldGFpbHNMYXJnZU9wdGlvbnMoKTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdTY3JvbGxUb3AgPCAxMCAmJiBpc0dhbGxlcnlNaW5pbWl6ZWQpIHtcbiAgICAgICAgICAgIGlzR2FsbGVyeU1pbmltaXplZCA9IDA7XG4gICAgICAgICAgICB1cGRhdGVQcm9kdWN0SW1hZ2VNYXhXaWR0aEJhc2VkT25TY3JvbGwoMTAwKTtcbiAgICAgICAgICAgIC8vICQod2luZG93KS5zY3JvbGxUb3AoMCk7XG4gICAgICAgICAgICBkZXRlcm1pbmVQcm9kdWN0RGV0YWlsc0xhcmdlT3B0aW9ucygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsZW5kXCIsIGUgPT4ge1xuICAgICAgICBpZiAoaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcHJvY2Vzc1Njcm9sbCgpO1xuICAgICAgICAvLyBjbGVhclRpbWVvdXQocHJvY2Vzc1Njcm9sbCk7XG4gICAgICAgIC8vIHNjcm9sbFRpbWVvdXQgPSBzZXRUaW1lb3V0KHByb2Nlc3NTY3JvbGwsIDEwMCk7XG4gICAgfVxuICAgICk7XG4gICAgZnVuY3Rpb24gc3BsaXROZWVkSGVscE1lbnUoKSB7XG4gICAgICAgIC8vIHZhciB0ID0gMDtcbiAgICAgICAgb25Eb21SZWFkeShkb21FbGVtID0+IHtcbiAgICAgICAgICAgICRkLmFycml2ZShcIi5pbnMtdGlsZV9fY29weXJpZ2h0XCIsIG9uY2VPbmx5LCBlbGVtID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgIGlmIChlbGVtLnByb2Nlc3NlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vICAgZWxlbS5wcm9jZXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gXCJzdXBwb3J0QGRhdGV4Mi5iaWtlXCI7XG4gICAgICAgICAgICAgICAgZWxlbSA9ICQoZWxlbSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtIDIwMDA7XG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtLmZpbmQoXCJhXCIpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmh0bWwoYDxzcGFuIGNsYXNzPVwiY29weVwiPjx1aS1udW1iZXIgc3R5bGU9XCItLXBlcmNlbnQ6MTk7LS1wcmVmaXg6JyBcdTAwQTkgMjAnXCIgc3RhcnQ9XCIxOVwiIHR5cGU9XCJpbnRcIiBjbGFzcz1cInllYXJcIj48L3VpLW51bWJlcj48L3NwYW4+PGEgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJ1aS1udW1iZXIgaW5zLXRpbGVfX2xpbmtcIiBocmVmPVwibWFpbHRvOiR7ZW1haWx9XCI+JHtlbWFpbH08L2E+YCk7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVRvTGFzdFllYXIoZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KHQgPT4gZWxlbS5maW5kKFwidWktbnVtYmVyXCIpWzBdPy5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcGVyY2VudFwiLCB5ZWFyKSwgZHVyYXRpb24gfHwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdFRpbWVvdXQgPSB1cGRhdGVUb0xhc3RZZWFyKDUwMDApO1xuXG4gICAgICAgICAgICAgICAgICAgIGQuYXJyaXZlKFwiLmVjLXBhZ2UtYnV0dG9ucywgLmVjLWNhcnQsIC5wcmljZS13aXRoLWRpc2NvdW50LCAjdGlsZS1jb3Zlci1IYVhxNkYsIC5lYy1mb290ZXIsIC5lYy1jb25maXJtYXRpb25fX2NvbnRpbnVlXCIsIG9uY2VPbmx5LCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGRlZmF1bHRUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Rm9vdGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVG9MYXN0WWVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVDb3B5cmlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAvLyAgIGlmIChlbGVtLnRleHQoKSA9PSBlbWFpbCkgcmV0dXJuO1xuICAgICAgICAgICAgLy8gICAvL2NvbnN0IHAgPSBlbGVtLnBhcmVudCgpO1xuICAgICAgICAgICAgLy8gICAvL2NvbnN0IGUgPSBlbGVtLmNsb25lKCkuYXR0cihcImhyZWZcIiwgYG1haWx0bzoke2VtYWlsfWApO1xuICAgICAgICAgICAgLy8gICAvL2VbMF0ucHJvY2VzZWQgPSB0cnVlO1xuICAgICAgICAgICAgLy8gICAvL2UuZmluZCgnLmlucy1jb250cm9sX190ZXh0JykudGV4dChlbWFpbClcbiAgICAgICAgICAgIC8vICAgLy9wLmFwcGVuZChlKTtcbiAgICAgICAgICAgIC8vICAgZWxlbSA9IGVsZW07XG4gICAgICAgICAgICAvLyAgIGlmIChlbGVtLnRleHQoKS5pbmRleE9mKGVtYWlsKSA+PSAwKSB7XG4gICAgICAgICAgICAvLyAgICAgZWxlbS5odG1sKGVsZW0uaHRtbCgpLnJlcGxhY2UoZW1haWwsIGA8YSBocmVmPSdtYWlsdG86JHtlbWFpbH0nPiR7ZW1haWx9PC9hPmApKTtcbiAgICAgICAgICAgIC8vICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICBlbGVtLmZpbmQoXCIuaW5zLWNvbnRyb2xfX3dyYXBcIikuYXBwZW5kKCQoYDxhIGhyZWY9XCJtYWlsdG86JHtlbWFpbH1cIj4ke2VtYWlsfTwvYT5gKSk7XG4gICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRGb290ZXJIZWlnaHQoKSB7XG4gICAgICAgIGxldCBqc0NTUyA9IGVuc3VyZVN0eWxlRWxlbWVudEV4aXN0cyhcImpzLWNzcy1mb290ZXJcIik7XG4gICAgICAgIGNvbnN0ICRmb290ZXIgPSAkKFwiI3RpbGUtZm9vdGVyLU1OdXJlN1wiKTtcbiAgICAgICAgY29uc3QgJGNvcHlSaWdodCA9ICRmb290ZXIuZmluZChcIi5pbnMtdGlsZV9fY29weXJpZ2h0XCIpO1xuICAgICAgICBjb25zdCAkZm9vdGVyTGlua3MgPSAkZm9vdGVyLmZpbmQoXCIuaW5zLXRpbGVfX2xpbmtzXCIpO1xuICAgICAgICBjb25zdCBmb290ZXJIZWlnaHQgPSAoJGZvb3Rlci5jc3MoXCJwb3NpdGlvblwiKSA9PSBcImZpeGVkXCIgPyAkZm9vdGVyIDogJGNvcHlSaWdodC5jc3MoXCJwb3NpdGlvblwiKSA9PSBcImZpeGVkXCIgPyAkY29weVJpZ2h0IDogJGZvb3RlckxpbmtzKS5oZWlnaHQoKSAtIDE7XG4gICAgICAgIGNvbnN0IG1lbnVCYXJGb290ZXJIZWlnaHQgPSAoJChcIi5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtcHJpY2UtdGF4ZXNcIikuaGVpZ2h0KCkgfHwgMCkgKyAoJChcIi5kZXRhaWxzLXByb2R1Y3QtcHJpY2UtY29tcGFyZV9fY29udGFpbmVyXCIpLmhlaWdodCgpIHx8IDApICsgKCQoXCIubWVudS13cmFwcGVyXCIpLmhlaWdodCgpIHx8IDApIC0gMTtcbiAgICAgICAgY29uc3QgZXh0cmFJbWFnZXMgPSAkKFwiLmV4dHJhLWltYWdlc1wiKVswXTtcbiAgICAgICAgY29uc3QgZXh0cmFJbWFnZXNIZWlnaHQgPSBNYXRoLm1heCgwLCAoJChcIi5wcm9kdWN0LWRldGFpbHNfX3NpZGViYXJcIik/Lm91dGVySGVpZ2h0KCkgfHwgMCkgLSAoKGV4dHJhSW1hZ2VzPy5wYXJlbnROb2RlPy5zY3JvbGxIZWlnaHQgfHwgMCkgLSAoZXh0cmFJbWFnZXM/LnNjcm9sbEhlaWdodCB8fCAwKSkgLSAoJChcIi5kZXRhaWxzLWdhbGxlcnlfX2ltYWdlc1wiKS5oZWlnaHQoKSB8fCAwKSk7XG4gICAgICAgIGNvbnN0IHcgPSAkdy53aWR0aCgpO1xuICAgICAgICBjb25zdCBoID0gJHcuaGVpZ2h0KCk7XG4gICAgICAgIC8vaWYgKHcgPiAxMDAwKSB7XG4gICAgICAgIC8vZm9vdGVySGVpZ2h0ID0gJGQuaGFzQ2xhc3MoXCJwYWdlLXR5cGUtU0lURVwiKSA/IGZvb3RlckhlaWdodCA6IDA7XG4gICAgICAgIC8vfVxuICAgICAgICBjb25zdCBmb290ZXJMaW5rc0hlaWdodCA9ICQoXCIuaW5zLXRpbGVfX2xpbmtzXCIpLm91dGVySGVpZ2h0KCkgfHwgMDtcbiAgICAgICAgY29uc3QgZm9vdGVyQ29weXJpZ2h0SGVpZ2h0ID0gJChcIi5pbnMtdGlsZV9fY29weXJpZ2h0XCIpLm91dGVySGVpZ2h0KCkgfHwgMDtcbiAgICAgICAgY29uc3QgZ3JpZF9fc29ydCA9ICQoXCIuZ3JpZF9fc29ydFwiKTtcbiAgICAgICAgY29uc3QgbWF4Rm9vdGVySGVpZ2h0ID0gZm9vdGVyTGlua3NIZWlnaHQgKyBNYXRoLm1heChmb290ZXJDb3B5cmlnaHRIZWlnaHQsIDM3KTtcbiAgICAgICAgY29uc3QgY2FydEltYWdlID0gMDtcbiAgICAgICAgLy8kKFwiLmVjLWNhcnQtaXRlbV9faW1hZ2VcIikud2lkdGgoKTtcbiAgICAgICAgbGV0IGNoZWNrb3V0Rm9vdGVySGVpZ2h0ID0gJChcIi5lYy1jYXJ0X19jaGVja291dFwiKS5vdXRlckhlaWdodCgpIHx8IDA7XG4gICAgICAgIGNvbnN0IHBhZ2VCdXR0b25zSGVpZ2h0ID0gJChcIi5lYy1wYWdlLWJ1dHRvbnM6Zmlyc3RcIikub3V0ZXJIZWlnaHQoKSB8fCAwO1xuICAgICAgICBjb25zdCB2aWRlb0lmcmFtZUJvdHRvbSA9IGggLSAoJChcIiNtYWluLXZpZGVvXCIpLmhlaWdodCgpIHx8IDApIC0gNDA7XG4gICAgICAgIGNvbnN0IHBhZ2VySGVpZ2h0ID0gJChcIi5lYy1wYWdlciwgLnBhZ2UtdHlwZS1MRUdBTCAuZWMtcGFnZS1idXR0b25zLCAuZWMtY2FydC5lYy1jYXJ0LS1lbXB0eSwgLmVjLWxvZ2luLWZvcm0gLmVjLWNhcnRfX2NoZWNrb3V0LCAuZWMtcmVzZXRQYXNzd29yZC1mb3JtIC5lYy1jYXJ0X19jaGVja291dCwgLnBhZ2UtdHlwZS1BQ0NPVU5ULVBBR0UgLmVjLWNhcnQtc3RlcC0tc2lnbm91dCAuZWMtY2FydC1zdGVwX193cmFwXCIpLm91dGVySGVpZ2h0KCkgfHwgMDtcbiAgICAgICAgY29uc3QgaDFIZWlnaHQgPSAkKFwiaDEucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXRpdGxlXCIpLm91dGVySGVpZ2h0KCkgfHwgMDtcbiAgICAgICAgY29uc3QgZWNGb290ZXJIZWlnaHQgPSBNYXRoLm1heCgkKFwiLmVjLWZvb3RlclwiKS5vdXRlckhlaWdodCgpIHx8IDAsIDApO1xuICAgICAgICBjb25zdCBlY0Zvb3RlclJvd0hlaWdodCA9IE1hdGgubWF4KCQoXCIuZWMtZm9vdGVyX19yb3dcIikub3V0ZXJIZWlnaHQoKSB8fCAwLCAzNik7XG4gICAgICAgIGNvbnN0IGdyaWRfX3NvcnRXaWR0aCA9IGdyaWRfX3NvcnQub3V0ZXJXaWR0aCgpIHx8IDA7XG4gICAgICAgIGNvbnN0IGFjdGlvbkJhckhlaWdodCA9IFswLCAuLi4kKFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1wcmljZS10YXhlczp2aXNpYmxlLC5lYy1jYXJ0X19zdW1tYXJ5LC5wYWdlLXR5cGUtTEVHQUwgLmVjd2lkLXByb2R1Y3RCcm93c2VyIC5lYy1mb290ZXI6dmlzaWJsZVwiKS50b0FycmF5KCkubWFwKGVsZW0gPT4gJChlbGVtKS5vdXRlckhlaWdodCgpKSxdLnJlZHVjZSgoc3VtLCB4KSA9PiBzdW0gKyB4KTtcbiAgICAgICAgY2hlY2tvdXRGb290ZXJIZWlnaHQgPSBjaGVja291dEZvb3RlckhlaWdodCA/IGAtLWNoZWNrb3V0LWFjdGlvbi1iYXItLWhlaWdodC1jb21wdXRlZDogJHtjaGVja291dEZvb3RlckhlaWdodH1weCAhaW1wb3J0YW50O2AgOiBcIlwiO1xuICAgICAgICBjb25zdCBicmVhZENydW1icyA9ICQoXCIuZWMtYnJlYWRjcnVtYnNcIilcbiAgICAgICAgICAgICwgYnJlYWRDcnVtYnNBY3R1YWxXaWR0aCA9IGJyZWFkQ3J1bWJzLm91dGVyV2lkdGgoKSB8fCAwXG4gICAgICAgICAgICAsIGJyZWFkQ3J1bWJzV2lkdGggPSBncmlkX19zb3J0V2lkdGggKyAoYnJlYWRDcnVtYnMud2lkdGgoKSB8fCAwKSArICQoXCIuaW5zLXRpbGUtLXByb2R1Y3QtYnJvd3NlciAuZWMtc2l6ZSBkaXYuZWN3aWQtcHJvZHVjdEJyb3dzZXIgLmVjLXN0b3JlIC5lYy1ncmlkLS10aXRsZS5lYy1oZWFkZXItaDFcIikud2lkdGgoKSB8fCAwXG4gICAgICAgICAgICAsIGJyZWFkQ3J1bXNMb25nbGltaXQgPSB3IC0gMTQgLSA0OCAtIHNjcm9sbFdpZHRoO1xuICAgICAgICBicmVhZENydW1icy50b2dnbGVDbGFzcyhcImxvbmctY3J1bWJzXCIsIHcgPD0gNDk5IHx8IGJyZWFkQ3J1bWJzV2lkdGggPiBicmVhZENydW1zTG9uZ2xpbWl0KTtcbiAgICAgICAgJGQudG9nZ2xlQ2xhc3MoXCJ2ZXJ0aWNhbC1zaGFyZVwiLCB3IDw9IDQ5OSk7XG4gICAgICAgIGpzQ1NTLnRleHQoYDpyb290LCAjZWN3aWRfYm9keSwgI3RpbGUtcHJvZHVjdC1kZXRhaWxzIHsgXG4gICAgICAgICAgICAke2NoZWNrb3V0Rm9vdGVySGVpZ2h0fVxuICAgICAgICAgICAgLS1lYy1wYWdlci0taGVpZ2h0OiAke3BhZ2VySGVpZ2h0fXB4O1xuICAgICAgICAgICAgLS1hY3Rpb24tYmFyLS1oZWlnaHQ6ICR7YWN0aW9uQmFySGVpZ2h0fXB4O1xuICAgICAgICAgICAgLS1lYy1icmVhZGNydW1icy0tYWN0dWFsLXdpZHRoOiAke2JyZWFkQ3J1bWJzQWN0dWFsV2lkdGh9cHg7XG4gICAgICAgICAgICAtLW1lbnUtYmFyLWZvb3Rlci0taGVpZ2h0OiAke21lbnVCYXJGb290ZXJIZWlnaHR9cHggIWltcG9ydGFudDtcbiAgICAgICAgICAgIC0tZWMtcGFnZS1idXR0b25zLS1oZWlnaHQ6ICR7cGFnZUJ1dHRvbnNIZWlnaHR9cHggIWltcG9ydGFudDtcbiAgICAgICAgICAgIC0tZWMtZm9vdGVyLS1oZWlnaHQ6ICR7ZWNGb290ZXJIZWlnaHR9cHggIWltcG9ydGFudDtcbiAgICAgICAgICAgIC0tZWMtZm9vdGVyX19yb3ctLWhlaWdodDogJHtlY0Zvb3RlclJvd0hlaWdodH1weCAhaW1wb3J0YW50O1xuICAgICAgICAgICAgLS1ncmlkX19zb3J0LS13aWR0aDogJHtncmlkX19zb3J0V2lkdGh9cHg7XG4gICAgICAgICAgICAtLXZpZGVvLWlmcmFtZS0tYm90dG9tOiAke3ZpZGVvSWZyYW1lQm90dG9tfXB4O1xuICAgICAgICAgICAgLS1wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtdGl0bGUtLWhlaWdodDogJHtoMUhlaWdodH1weCAhaW1wb3J0YW50O1xuICAgICAgICAgICAgLS1leHRyYS1pbWFnZXMtLWhlaWdodDogJHtleHRyYUltYWdlc0hlaWdodH1weCAhaW1wb3J0YW50O1xuICAgICAgICAgICAgLS1mb290ZXItLWxpbmtzLWhlaWdodDogJHtmb290ZXJMaW5rc0hlaWdodH1weCAgIWltcG9ydGFudDtcbiAgICAgICAgICAgIC0tZm9vdGVyLS1jb3B5cmlnaHQtaGVpZ2h0OiAke2Zvb3RlckNvcHlyaWdodEhlaWdodH1weCAhaW1wb3J0YW50O1xuICAgICAgICAgICAgLS1mb290ZXItLW1heC1oZWlnaHQ6ICR7bWF4Rm9vdGVySGVpZ2h0fXB4ICAhaW1wb3J0YW50O1xuICAgICAgICAgICAgLS1mb290ZXItLWhlaWdodDogJHtmb290ZXJIZWlnaHR9cHggIWltcG9ydGFudDtgICsgKCFjYXJ0SW1hZ2UgPyBcIlwiIDogYFxuICAgICAgICAgICAgLS1jYXJ0LXByb2R1Y3QtaW1hZ2UtLXdpZHRoOiAke2NhcnRJbWFnZX1weDtgKSArIGBcbiAgICAgICAgICAtLXZoOiAke2h9ICFpbXBvcnRhbnQ7XG4gICAgICAgICAgLS12dzogJHt3fSAhaW1wb3J0YW50O1xuICAgICAgICAgIC0tZGV2aWNlLS1yYXRpbzogJHt3IC8gaH0gIWltcG9ydGFudDsgIFxuICAgICAgICB9YCk7XG4gICAgfVxuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGUgPSAkKFwiPGRpdiBpZD0nc2Nyb2xsZXInPjxkaXYvPjwvZGl2PlwiKS5jc3Moe1xuICAgICAgICAgICAgb3ZlcmZsb3c6IFwic2Nyb2xsXCIsXG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgd2lkdGg6IFwiMTAwZHZ3XCIsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICAgICAgdG9wOiBcIi0xcHhcIixcbiAgICAgICAgICAgIGhlaWdodDogMFxuICAgICAgICB9KS5hcHBlbmRUbygkZClcbiAgICAgICAgICAgICwgZGUgPSBlLmZpbmQoXCJkaXZcIikuY3NzKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAsIHUgPSBmID0+IHtcbiAgICAgICAgICAgICAgICBzY3JvbGxXaWR0aCA9IGUud2lkdGgoKSAtIGRlLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgJGQuY3NzKFwiLS1zY3JvbGxcIiwgYCR7c2Nyb2xsV2lkdGh9cHhgKS50b2dnbGVDbGFzcyhcImlzLXdlYlwiLCAhIXNjcm9sbFdpZHRoKS50b2dnbGVDbGFzcyhcImlzLW1vYmlsZVwiLCAhc2Nyb2xsV2lkdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgO1xuICAgICAgICBuZXcgUmVzaXplT2JzZXJ2ZXIodSkub2JzZXJ2ZShlWzBdKTtcbiAgICAgICAgdSgpO1xuICAgIH1cbiAgICApKCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICAgIGRldGVybWluZVByb2R1Y3REZXRhaWxzTGFyZ2VPcHRpb25zKCk7XG4gICAgICAgIHNldEZvb3RlckhlaWdodCgpO1xuICAgICAgICBzZXRUaW1lb3V0KHNldEZvb3RlckhlaWdodCwgMjAwKTtcbiAgICAgICAgZml4Rm9ybUZhY3RvcigpO1xuICAgICAgICBzZXRUaW1lb3V0KGZpeEZvcm1GYWN0b3IsIDEwMCk7XG4gICAgfVxuICAgICk7XG4gICAgc2V0Rm9vdGVySGVpZ2h0KCk7XG5cbiAgICBmdW5jdGlvbiB0cmltQ29sb25JbkNhcnQocGFnZSkge1xuICAgICAgICBpZiAoW1wiQ0FSVFwiLCBcIk9SREVSX0NPTkZJUk1BVElPTlwiXS5pbmRleE9mKHBhZ2UudHlwZSkgPiAwKSB7XG4gICAgICAgICAgICB2YXIgbWF4VHJpZXMgPSAxMDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKG8gPT4ge1xuICAgICAgICAgICAgICAgIGxldCBvcHRpb25zID0gJChcIi5lYy1jYXJ0LW9wdGlvbi5lYy1jYXJ0LW9wdGlvbi0ta2V5XCIpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCB8fCBtYXhUcmllcy0tIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS50ZXh0KGUudGV4dCgpLnRyaW0oKS5yZXBsYWNlKC86JC8sIFwiXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICQoXCIuZWMtY2FydC1vcHRpb24uZWMtY2FydC1vcHRpb24tLXZhbHVlXCIpLmVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9Ob3QgaW5jbHVkZWQvaS50ZXN0KGUudGV4dCgpLnRyaW0oKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wYXJlbnQoKS50b2dnbGVDbGFzcyhcInhoaWRkZW5cIiwgMSkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLCAxMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VQcmljZShwcmljZSkge1xuICAgICAgICBsZXQgcCA9IHBhcnNlSW50KHByaWNlPy50b1N0cmluZygpPy5yZXBsYWNlKFwiXHUyMDEzXCIsIFwiLVwiKS5yZXBsYWNlKC8oPyFeKS18W15cXGQtXS9nLCBcIlwiKSkgLyAxMDAuMDtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHZhciBmZXRjaENhcnRQcm9kdWN0c0NhY2hlID0ge307XG4gICAgZnVuY3Rpb24gZmV0Y2hDYXJ0UHJvZHVjdHMoY2FydCwgZm9yY2VSZWZyZXNoKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGNhcnQuaXRlbXMubWFwKHAgPT4gcC5wcm9kdWN0LmlkKS5qb2luKFwiK1wiKTtcbiAgICAgICAgcmV0dXJuICgoIWZvcmNlUmVmcmVzaCAmJiBmZXRjaENhcnRQcm9kdWN0c0NhY2hlW2tleV0pIHx8IChmZXRjaENhcnRQcm9kdWN0c0NhY2hlW2tleV0gPSBQcm9taXNlLmFsbChjYXJ0Lml0ZW1zLm1hcChjID0+IGZldGNoUHJvZHVjdChcIkdFVFwiLCBjLnByb2R1Y3QuaWQsIEZFVENIX0NBUlRfUFJPRFVDVCkpKS50aGVuKGNhcnRQcm9kdWN0cyA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXAgPSB7fTtcbiAgICAgICAgICAgIGNhcnRQcm9kdWN0cy5mb3JFYWNoKHAgPT4gKG1hcFtwLmlkXSA9IHApKTtcbiAgICAgICAgICAgIGNhcnQuaXRlbXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICBwLnAgPSBtYXBbcC5wcm9kdWN0LmlkXTtcbiAgICAgICAgICAgICAgICBwLnAub3B0aW9ucy5tYXAobyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG8uc2VsZWN0ZWRDaG9pY2UgPSBvLmNob2ljZXMuZmluZChjID0+IGMudGV4dCA9PSBwLm9wdGlvbnNbby5uYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBjYXJ0UHJvZHVjdHM7XG4gICAgICAgIH1cbiAgICAgICAgKSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0b2dnbGVEb2N1bWVudEZ1bGxTY3JlZW4oc2hvdzM2MCkge1xuICAgICAgICBjb25zdCBwb3B1cE9wZW5lZCA9ICEhJChcIi5wc3dwLnBzd3AtLW9wZW5cIikubGVuZ3RoO1xuICAgICAgICAkZC50b2dnbGVDbGFzcyhcInBzd3AtLW9wZW5cIiwgcG9wdXBPcGVuZWQpO1xuICAgICAgICBwb3B1cE9wZW5lZCA/IHNldFRpbWVvdXQodCA9PiAkZC50b2dnbGVDbGFzcyhcInBzd3AtLW9wZW5lZFwiLCB0cnVlKSwgMzAwKSA6ICRkLnRvZ2dsZUNsYXNzKFwicHN3cC0tY2xvc2luZ1wiLCB0cnVlKS50b2dnbGVDbGFzcyhcInBzd3AtLW9wZW5lZFwiLCBmYWxzZSkgJiYgc2V0VGltZW91dCh0ID0+ICRkLnRvZ2dsZUNsYXNzKFwicHN3cC0tY2xvc2luZ1wiLCBmYWxzZSksIDEwMCk7XG4gICAgICAgIHNob3czNjAgPSAhcG9wdXBPcGVuZWQgPyB0cnVlIDogISFzaG93MzYwO1xuICAgICAgICB0b2dnbGVTaG93MzYwKHNob3czNjApO1xuICAgICAgICAkZC50b2dnbGVDbGFzcyhcImpzdi1zd2lwaW5nXCIsICFzaG93MzYwKTtcbiAgICAgICAgc2hvdzM2MCAmJiBzcGluSlNWKCk7XG4gICAgICAgIG11c3RFbmZvcmNlMzYwID0gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uQ2xvc2VGdWxsU2NyZWVuKGVsZW0pIHtcbiAgICAgICAgLy9zaG93QWN0aW9uQmFyKCk7XG4gICAgICAgIHRvZ2dsZURvY3VtZW50RnVsbFNjcmVlbigpO1xuICAgIH1cbiAgICB2YXIgYmVmb3JlRnVsbFNjcmVlblNob3czNjAsIG11c3RFbmZvcmNlMzYwID0gZmFsc2U7XG4gICAgZnVuY3Rpb24gZGV0ZWN0RnVsbFNjcmVlbihlbGVtKSB7XG4gICAgICAgIGJlZm9yZUZ1bGxTY3JlZW5TaG93MzYwID0gJGQuaXMoXCIuanN2LXNob3ctMzYwXCIpO1xuICAgICAgICBlbGVtLnBhcmVudE5vZGUubGVhdmUoZWxlbSwgb25DbG9zZUZ1bGxTY3JlZW4pO1xuICAgICAgICB0b2dnbGVEb2N1bWVudEZ1bGxTY3JlZW4obXVzdEVuZm9yY2UzNjApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjbG9zZUZ1bGxTY3JlZW4oZWxlbSkge1xuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgZSA9PiB7XG4gICAgICAgICAgICAkKFwiLnBzd3BfX2J1dHRvbi0tY2xvc2VcIilbMF0/LmNsaWNrKCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgICAgICAsIHRydWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWdpc3Rlclpvb20oZWxlbSkge1xuICAgICAgICAkKGVsZW0pLmNsaWNrKGUgPT4ge1xuICAgICAgICAgICAgaWYgKGpzdiAmJiAkZC5pcyhcIi5qc3Ytc2hvdy0zNjBcIikpIHtcbiAgICAgICAgICAgICAgICBpZiAoanN2Lnpvb20uY3VycmVudFpvb21TY2FsZSA+PSBqc3Yuem9vbS56b29tTWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0b3BKU1YoKTtcbiAgICAgICAgICAgICAgICAgICAganN2LnJlc2V0Wm9vbSg0MDApO1xuICAgICAgICAgICAgICAgICAgICBzcGluSlNWKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcEpTVigpO1xuICAgICAgICAgICAgICAgICAgICBqc3Yuem9vbVRvKE1hdGgubWluKGpzdi56b29tLmN1cnJlbnRab29tU2NhbGUgKyAxLCBqc3Yuem9vbS56b29tTWF4KSwgMCwgMCwgMTIwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRkLnRvZ2dsZUNsYXNzKFwianN2LXpvb21lZFwiLCBqc3Yuem9vbS5pc1pvb21lZCgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7IH1cbiAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb25lQ2xvc2VBbmRab29tQnV0dG9ucyhlbGVtKSB7XG4gICAgICAgIGVsZW0gPSAkKGVsZW0pO1xuICAgICAgICBjb25zdCB3cmFwcGVyID0gJGIuZmluZE9yQ3JlYXRlKFwiLmpzdi16b29tLWJ1dHRvbnMtd3JhcHBlclwiLCBlID0+IGA8ZGl2IGNsYXNzPVwianN2LXpvb20tYnV0dG9ucy13cmFwcGVyXCI+PGRpdiBjbGFzcz1cImVjd2lkLXBzd3AgZWN3aWQtcHN3cC0tdGhlbWUtZWN3aWRcIj48ZGl2IGNsYXNzPVwiZWN3aWQtcHN3cC13cmFwcGVyXCIvPjwvZGl2PDwvZGl2PmApLmZpbmQoXCIuZWN3aWQtcHN3cC13cmFwcGVyXCIpO1xuICAgICAgICB3cmFwcGVyLmh0bWwoXCJcIik7XG4gICAgICAgIHdyYXBwZXIuYXBwZW5kKGVsZW0uZmluZChcIi5wc3dwX19idXR0b24tLWNsb3NlXCIpLmNsb25lKCkuYWRkQ2xhc3MoXCJwc3dwX19idXR0b24tLWNsb25lXCIpKTtcbiAgICAgICAgLy8ub24oXCJjbGlja1wiLCBlPT4gJChcIi5wc3dwX190b3AtYmFyIC5wc3dwX19idXR0b24tLWNsb3NlXCIpWzBdPy5jbGljaygpKSk7XG4gICAgICAgIHdyYXBwZXIuYXBwZW5kKGVsZW0uZmluZChcIi5wc3dwX19idXR0b24tLXpvb21cIikuY2xvbmUoKSkuYWRkQ2xhc3MoXCJwc3dwX19idXR0b24tLWNsb25lXCIpO1xuICAgICAgICAvLy5vbihcImNsaWNrXCIsIGU9PiAkKFwiLnBzd3BfX3RvcC1iYXIgLnBzd3BfX2J1dHRvbi0tem9vbVwiKVswXT8uY2xpY2soKSkpO1xuICAgICAgICB3cmFwcGVyLmFwcGVuZCgkKFwiLnBzd3BfX2NhcHRpb25cIikuY2xvbmUoKSk7XG4gICAgfVxuICAgIHZhciBpbWdSZXNpemVPYnNlcnZlclJlZnJlc2hUaW1lb3V0ID0gMDtcbiAgICBjb25zdCBpbWdSZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcihlbGVtID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGltZ1Jlc2l6ZU9ic2VydmVyUmVmcmVzaFRpbWVvdXQpO1xuICAgICAgICBpbWdSZXNpemVPYnNlcnZlclJlZnJlc2hUaW1lb3V0ID0gc2V0VGltZW91dCh0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdpZHRocyA9ICQoXCIucHN3cF9faW1nXCIpLm1hcCgoaSwgZSkgPT4gJChlKS53aWR0aCgpKS5nZXQoKVxuICAgICAgICAgICAgICAgICwgbWF4ID0gTWF0aC5tYXgoLi4ud2lkdGhzKVxuICAgICAgICAgICAgICAgICwgbWluID0gTWF0aC5taW4oLi4ud2lkdGhzKVxuICAgICAgICAgICAgICAgICwgem9vbSA9IG1heCAvIG1pblxuICAgICAgICAgICAgICAgICwgeiA9IHBhcnNlRmxvYXQoem9vbS50b0ZpeGVkKDEpKS50b1N0cmluZygpLnN1YnN0cmluZygwLCAzKTtcbiAgICAgICAgICAgICQoXCIuZWN3aWQtcHN3cCAucHN3cF9fYnV0dG9uLS16b29tXCIpLmF0dHIoXCJkYXRhLWltYWdlLXpvb21cIiwgeiArIFwiIHhcIik7XG4gICAgICAgIH1cbiAgICAgICAgICAgICwgMTAwKTtcbiAgICB9XG4gICAgKTtcbiAgICBmdW5jdGlvbiBhdHRhY2hGdWxsU2NyZWVuSW1hZ2VSZXNpemVPYnNldmVyKGVsZW0pIHtcbiAgICAgICAgaW1nUmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShlbGVtKTtcbiAgICAgICAgZWxlbS5wYXJlbnROb2RlPy5sZWF2ZShlbGVtLCBlID0+IGltZ1Jlc2l6ZU9ic2VydmVyLnVub2JzZXJ2ZShlbGVtKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluamVjdFpvb20zNjBGdWxsU2NyZWVuKHBhZ2UpIHtcbiAgICAgICAgaWYgKHBhZ2UudHlwZSA9PSBcIlBST0RVQ1RcIikge1xuICAgICAgICAgICAgJGQuYXJyaXZlKFwiLnBzd3AtLW9wZW5cIiwgbm90T25jZU9ubHlTZWxmVW5iaW5kLCBkZXRlY3RGdWxsU2NyZWVuKTtcbiAgICAgICAgICAgICRkLmFycml2ZShcIi5wc3dwX19idXR0b24tLWNsb3NlXCIsIG5vdE9uY2VPbmx5U2VsZlVuYmluZCwgY2xvc2VGdWxsU2NyZWVuKTtcbiAgICAgICAgICAgICRkLmFycml2ZShcIi5wc3dwX19idXR0b24ucHN3cF9fYnV0dG9uLS16b29tXCIsIG5vdE9uY2VPbmx5U2VsZlVuYmluZCwgcmVnaXN0ZXJab29tKTtcbiAgICAgICAgICAgICRkLmFycml2ZShcIi5wc3dwX190b3AtYmFyXCIsIG5vdE9uY2VPbmx5U2VsZlVuYmluZCwgY2xvbmVDbG9zZUFuZFpvb21CdXR0b25zKTtcbiAgICAgICAgICAgICRkLmFycml2ZShcIi5wc3dwX19pbWdcIiwgbm90T25jZU9ubHlTZWxmVW5iaW5kLCBhdHRhY2hGdWxsU2NyZWVuSW1hZ2VSZXNpemVPYnNldmVyKTtcbiAgICAgICAgICAgIG9uVW5sb2FkKHBhZ2UgPT4ge1xuICAgICAgICAgICAgICAgIGltZ1Jlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiAocGFnZS50eXBlID09IFwiUFJPRFVDVFwiKSB7XG4gICAgICAgIC8vICAgZnVuY3Rpb24gem9vbSgpIHtcbiAgICAgICAgLy8gICAgIGlmICgkZC5oYXNDbGFzcyhcImpzdi1zaG93LTM2MFwiKSkge1xuICAgICAgICAvLyAgICAgICBpZiAod2luZG93Lmpzdikge1xuICAgICAgICAvLyAgICAgICAgIHN0b3BKU1YoKTtcbiAgICAgICAgLy8gICAgICAgICBzZXRUaW1lb3V0KHQgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgc3RvcEpTVigpO1xuICAgICAgICAvLyAgICAgICAgICAgaWYgKCQoXCIucHN3cC0tem9vbWVkLWluXCIpLmxlbmd0aCkge1xuICAgICAgICAvLyAgICAgICAgICAgICBqc3Yuem9vbVRvKDYsIDAsIDApO1xuICAgICAgICAvLyAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgICAganN2Lnpvb21UbygxLCAwLCAwKTtcbiAgICAgICAgLy8gICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9LCA1MCk7XG4gICAgICAgIC8vICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vICAgZnVuY3Rpb24gdGFwUmlnaHQoKSB7XG4gICAgICAgIC8vICAgICBpZiAoJGQuaGFzQ2xhc3MoXCJqc3Ytc2hvdy0zNjBcIikpIHtcbiAgICAgICAgLy8gICAgICAgdGFwcGluZ0xlZnRSaWdodE9uRnVsbFNjcmVlbiA9IG5ldyBEYXRlKCk7XG4gICAgICAgIC8vICAgICAgIHN0b3BKU1YoKTtcbiAgICAgICAgLy8gICAgICAgJGQudG9nZ2xlQ2xhc3MoXCJqc3Ytc2hvdy1waG90b1wiLCB0cnVlKS50b2dnbGVDbGFzcyhcImpzdi1zaG93LTM2MFwiLCBmYWxzZSk7XG4gICAgICAgIC8vICAgICAgIHRoaXMuY2xpY2soKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vICAgZnVuY3Rpb24gdGFwTGVmdCgpIHtcbiAgICAgICAgLy8gICAgIGlmICgkZC5oYXNDbGFzcyhcImpzdi1zaG93LTM2MFwiKSkge1xuICAgICAgICAvLyAgICAgICB0YXBwaW5nTGVmdFJpZ2h0T25GdWxsU2NyZWVuID0gbmV3IERhdGUoKTtcbiAgICAgICAgLy8gICAgICAgc3RvcEpTVigpO1xuICAgICAgICAvLyAgICAgICAkZC50b2dnbGVDbGFzcyhcImpzdi1zaG93LXBob3RvXCIsIHRydWUpLnRvZ2dsZUNsYXNzKFwianN2LXNob3ctMzYwXCIsIGZhbHNlKTtcbiAgICAgICAgLy8gICAgICAgdGhpcy5jbGljaygpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gICAkKFwiLnBzd3BfX2J1dHRvbi5wc3dwX19idXR0b24tLXpvb21cIikub2ZmKFwiY2xpY2tcIiwgem9vbSkub24oXCJjbGlja1wiLCB6b29tKTtcbiAgICAgICAgLy8gICAhJChcIi5wc3dwX190b3AtYmFyIC5qc3YtdG9nZ2xlXCIpLmxlbmd0aCAmJlxuICAgICAgICAvLyAgICAgJCgnPGJ1dHRvbiBjbGFzcz1cImpzdi10b2dnbGUganN2LXRvZ2dsZS0zNjBcIj48L2J1dHRvbj4nKVxuICAgICAgICAvLyAgICAgICAub24oXCJjbGlja1wiLCB0b2dnbGUzNjApXG4gICAgICAgIC8vICAgICAgIC5pbnNlcnRBZnRlcihcIi5wc3dwX19idXR0b24ucHN3cF9fYnV0dG9uLS16b29tXCIpO1xuICAgICAgICAvLyAgIGNvbnN0IHIgPSAkKFwiLnBzd3BfX2J1dHRvbi0tYXJyb3ctLXJpZ2h0XCIpWzBdO1xuICAgICAgICAvLyAgIHIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhcFJpZ2h0LCB0cnVlKTtcbiAgICAgICAgLy8gICByLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXBSaWdodCwgdHJ1ZSk7XG4gICAgICAgIC8vICAgY29uc3QgbCA9ICQoXCIucHN3cF9fYnV0dG9uLS1hcnJvdy0tbGVmdFwiKVswXTtcbiAgICAgICAgLy8gICBsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXBMZWZ0LCB0cnVlKTtcbiAgICAgICAgLy8gICBsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXBMZWZ0LCB0cnVlKTtcbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICBmdW5jdGlvbiBmaXhNZXRhT25Nb2JpbGUoKSB7XG4gICAgICAgIGxldCBtID0gJChcIm1ldGFbbmFtZT12aWV3cG9ydF1cIik7XG4gICAgICAgIGxldCBjID0gbS5hdHRyKFwiY29udGVudFwiKTtcbiAgICAgICAgaWYgKCEvdXNlci1zY2FsYWJsZS9pLnRlc3QoYykpIHtcbiAgICAgICAgICAgIG0uYXR0cihcImNvbnRlbnRcIiwgKGMgPSBjICsgXCIsIHVzZXItc2NhbGFibGU9MFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEvdXNlci1zY2FsYWJsZT0wL2kudGVzdChjKSkge1xuICAgICAgICAgICAgbS5hdHRyKFwiY29udGVudFwiLCAoYyA9IGMucmVwbGFjZSgvdXNlci1zY2FsYWJsZT1cXHcrL2ksIFwidXNlci1zY2FsYWJsZT0wXCIpKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEvbWF4aW11bS1zY2FsZT0xLjEvaS50ZXN0KGMpKSB7XG4gICAgICAgICAgICBtLmF0dHIoXCJjb250ZW50XCIsIChjID0gYy5yZXBsYWNlKC9tYXhpbXVtLXNjYWxlPVxcZFxcLj9cXGQqLywgXCJtYXhpbXVtLXNjYWxlPTEuMVwiKSkpO1xuICAgICAgICB9XG4gICAgICAgICQoJ21ldGFbbmFtZT1cInRoZW1lLWNvbG9yXCJdJykuYXR0cihcImNvbnRlbnRcIiwgXCIjMmE0OTMxXCIpLmZpbmQoYyA9PiAhJChjKS5hdHRyKFwibWVkaWFcIikpLnJlbW92ZSgpO1xuICAgICAgICAkZC5jc3Moe1xuICAgICAgICAgICAgd2lkdGg6IFwiMTAwZHZ3XCIsXG4gICAgICAgICAgICBoZWlnaHQ6IFwiMTAwZHZoXCJcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluamVjdENzc0NsYXNzV2hlbkluVmlldyhwYWdlLCBwYWdlVHlwZSwgcHJvcGVydHlOYW1lLCBzZWxlY3RvciwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmIChwYWdlLnR5cGUgPT0gcGFnZVR5cGUpIHtcbiAgICAgICAgICAgIGxldCBwbyA9ICQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgaWYgKCEocHJvcGVydHlOYW1lIGluIHBhZ2UpKSB7XG4gICAgICAgICAgICAgICAgcGFnZVtwcm9wZXJ0eU5hbWVdID0gMjA7XG4gICAgICAgICAgICAgICAgLy90cnkgZm9yIDIgc2Vjb25kc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBvLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlzSW5WaWV3KHBvWzBdLCB0YXJnZXQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkZC50b2dnbGVDbGFzcyhjbGFzc05hbWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlzT3V0T2ZWaWV3KHBvWzBdLCB0YXJnZXQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkZC50b2dnbGVDbGFzcyhjbGFzc05hbWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKC0tcGFnZVtwcm9wZXJ0eU5hbWVdID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGluamVjdENzc0NsYXNzV2hlbkluVmlldy5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCAxMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBpbmplY3REZXRlY3RQcm9kdWN0T3B0aW9uc0luVmlldyhwYWdlKSB7XG4gICAgICAgIGluamVjdENzc0NsYXNzV2hlbkluVmlldyhwYWdlLCBcIlBST0RVQ1RcIiwgXCJfX3BvRGV0ZWN0VHJpYWxzXCIsIFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1vcHRpb25zXCIsIFwic2hvdy10YWItb3B0aW9uc1wiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5qZWN0RGV0ZWN0UHJvZHVjdERldGFpbHNJblZpZXcocGFnZSkge1xuICAgICAgICBpbmplY3RDc3NDbGFzc1doZW5JblZpZXcocGFnZSwgXCJQUk9EVUNUXCIsIFwiX19wZERldGVjdFRyaWFsc1wiLCBcIi5wcm9kdWN0LWRldGFpbHNfX2Rlc2NyaXB0aW9uXCIsIFwic2hvdy10YWItZGVzY3JpcHRpb25cIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIEZhdm91cml0ZVByb2R1Y3RDaGFuZ2VkKGNscykge1xuICAgICAgICAkZC50b2dnbGVDbGFzcyhcInNob3ctdGFiLWZhdlwiLCAvZmF2b3JpdGUtcHJvZHVjdC0tc2F2ZWQvaS50ZXN0KGNscykpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbmplY3RMYW5ndWFnZXNNZW51KCkge1xuICAgICAgICAvLyBpZiAoJCgnLmxhbmd1YWdlcy1tZW51JykubGVuZ3RoKSB7XG4gICAgICAgIGQuYXJyaXZlKFwiLmlucy1oZWFkZXJfX3NpZGViYXItbWVudS1pbm5lclwiLCBvbmNlT25seSwgbWVudUJhciA9PiB7XG4gICAgICAgICAgICBpZiAoISQoXCIubGFuZy1tZW51LW1vYmlsZVwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZW51QmFyID0gJChtZW51QmFyKTtcbiAgICAgICAgICAgIGxldCBsYW5nTWVudSA9ICQoYDxkaXYgY2xhc3M9XCJsYW5nLW1lbnUtbW9iaWxlIGlucy1oZWFkZXJfX3NpZGViYXItbWVudS1saW5rIG1lbnUtbGFuZ3VhZ2UgaW5zLWhlYWRlcl9fc2lkZWJhciBpbnMtaGVhZGVyX19zaWRlYmFyLS1tZW51XCI+PGEgY2xhc3M9XCJpbnMtaGVhZGVyX19zaWRlYmFyLW1lbnUtbGluay10aXRsZSBsYW5ndWFnZS10aXRsZVwiIHRhcmdldD1cIl9zZWxmXCI+PGRpdiBjbGFzcz1cImlucy1oZWFkZXJfX3NpZGViYXItbWVudS1saW5rLWljb25cIj48L2Rpdj48L2E+PGRpdiBjbGFzcz1cImlucy1oZWFkZXJfX3N1Ym1lbnUgc3ViLW1lbnUtbGFuZ3VhZ2VzIGlucy1oZWFkZXJfX2xhbmd1YWdlIGlucy1oZWFkZXJfX2xhbmd1YWdlLS1yb3cgaW5zLWhlYWRlcl9fbGFuZ3VhZ2UtLW1vYmlsZVwiPjwvZGl2PjwvZGl2PmApO1xuICAgICAgICAgICAgbWVudUJhci5wcmVwZW5kKGxhbmdNZW51KTtcbiAgICAgICAgICAgIGxldCBpY29uID0gJChcIi5pbnMtaGVhZGVyX19sYW5ndWFnZS0tc3dpdGNoIHN2Z1wiKTtcbiAgICAgICAgICAgIGljb24gPSBpY29uLmxlbmd0aCA/IGljb25bMF0ub3V0ZXJIVE1MIDogbnVsbDtcbiAgICAgICAgICAgIGljb24gJiYgbGFuZ01lbnUuZmluZChcIi5sYW5ndWFnZS10aXRsZVwiKS5hcHBlbmQoaWNvbik7XG4gICAgICAgICAgICBsYW5nTWVudS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiaW5zLWhlYWRlcl9fc2lkZWJhci1tZW51LWxpbmstLW9wZW5cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBtZW51ID0gbGFuZ01lbnUuZmluZChcIi5zdWItbWVudS1sYW5ndWFnZXNcIik7XG4gICAgICAgICAgICBtZW51LmFwcGVuZCgkKFwiLmlucy1oZWFkZXJfX2xhbmd1YWdlLmlucy1oZWFkZXJfX2xhbmd1YWdlLS1yb3dcIikpO1xuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICB2YXIgY3VycmVudExhbmd1YWdlID0gKCRkLmF0dHIoXCJsYW5nXCIpIHx8IFwiZW5cIikudG9VcHBlckNhc2UoKTtcbiAgICAgICAgJChcIi5pbnMtaGVhZGVyX19sYW5ndWFnZS1saW5rLCAuaW5zLWhlYWRlcl9fbGFuZ3VhZ2UgLmlucy1oZWFkZXJfX2xhbmd1YWdlLW1hcmtcIikuZWFjaCgoaSwgbCkgPT4ge1xuICAgICAgICAgICAgbCA9ICQobCk7XG4gICAgICAgICAgICBsZXQgbGFuZyA9IGwudGV4dCgpO1xuICAgICAgICAgICAgbC50b2dnbGVDbGFzcyhsYW5nLCAxKTtcbiAgICAgICAgICAgIGN1cnJlbnRMYW5ndWFnZSA9PSBsYW5nICYmIGwudG9nZ2xlQ2xhc3MoXCJsYW5nLWFjdGl2ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbmplY3RMYW5ndWFnZXNNZW51T25EZXNrdG9wKHBhZ2UpIHtcbiAgICAgICAgZC5hcnJpdmUoXCIuaW5zLWhlYWRlcl9fbGFuZ3VhZ2UgKyAuaW5zLWhlYWRlcl9fZHJvcGRvd24sIC5pbnMtaGVhZGVyX19sYW5ndWFnZSArIC5pbnMtaGVhZGVyX19kcm9wZG93biArIC5pbnMtaGVhZGVyX19kcm9wZG93blwiLCB7XG4gICAgICAgICAgICBleGlzdGluZzogdHJ1ZVxuICAgICAgICB9LCBmdW5jdGlvbiAoZGQpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50TGFuZ3VhZ2UgPSAoJGQuYXR0cihcImxhbmdcIikgfHwgXCJlblwiKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgJChcIi5pbnMtaGVhZGVyX19sYW5ndWFnZS1tYXJrXCIpLmVhY2goKGksIGwpID0+IHtcbiAgICAgICAgICAgICAgICBsID0gJChsKTtcbiAgICAgICAgICAgICAgICBsZXQgbGFuZyA9IGwudGV4dCgpO1xuICAgICAgICAgICAgICAgIGwudG9nZ2xlQ2xhc3MobGFuZywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcCA9IGwucGFyZW50KClbMF07XG4gICAgICAgICAgICAgICAgcD8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdleCA9IC9eWy9dKC4uJHwuLlxcLyk/L2dpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdMYW5nID0gYC8ke2xhbmcudG9Mb3dlckNhc2UoKX1gO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXBsYWNlID0gcmVnZXgudGVzdChsb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdQYXRoID0gcmVwbGFjZSA/IGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UocmVnZXgsIG5ld0xhbmcgKyBcIi9cIikgOiBuZXdMYW5nICsgbG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdQYXRoLmVuZHNXaXRoKFwiL1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3UGF0aCA9IG5ld1BhdGguc3Vic3RyaW5nKDAsIG5ld1BhdGgubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbmV3UGF0aCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdCArIG5ld1BhdGggKyBsb2NhdGlvbi5zZWFyY2ggKyBsb2NhdGlvbi5oYXNoO1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHN0b3BKU1YoKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IG5ld1BhdGg7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgY3VycmVudExhbmd1YWdlID09IGxhbmcgJiYgbC50b2dnbGVDbGFzcyhcImxhbmctYWN0aXZlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGQuYXJyaXZlKFwiLmlucy1oZWFkZXJfX2Ryb3Bkb3duLmlucy1oZWFkZXJfX2Ryb3Bkb3duLS1maXJzdFwiLCBub3RPbmNlT25seSwgZWxlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZXMgPSBbXVxuICAgICAgICAgICAgICAgICwganNDU1MgPSBlbnN1cmVTdHlsZUVsZW1lbnRFeGlzdHMoXCJtZW51LWNzcy1oZWFkZXJcIik7XG4gICAgICAgICAgICAkKGVsZW0pLmZpbmQoXCIuaW5zLWhlYWRlcl9fZHJvcGRvd24tbGluayAuaW5zLWhlYWRlcl9fZHJvcGRvd24tbGluay10aXRsZVwiKS5lYWNoKChpLCBlKSA9PiB7XG4gICAgICAgICAgICAgICAgZSA9ICQoZSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2x1ZyA9IGUuYXR0cihcImhyZWZcIikucmVwbGFjZShgJHtsb2NhdGlvbi5wcm90b2NvbH0vLyR7bG9jYXRpb24uaG9zdH1gLCBcIlwiKS5yZXBsYWNlKC9cXC9wcm9kdWN0c1xcLz8vaSwgXCJcIikgfHwgXCIvXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IGtub3duQ2F0ZWdvcnlTbHVnc1tzbHVnXTtcbiAgICAgICAgICAgICAgICBpbWFnZXMucHVzaChjPy50aHVtYm5haWxVcmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGNzcyA9IGltYWdlcy5tYXAoKHVybCwgaSkgPT4gIXVybCA/IHVybCA6IGAuaW5zLWhlYWRlcl9fbWVudSAuaW5zLWhlYWRlcl9fZHJvcGRvd24tbGluazpudGgtY2hpbGQoJHtpICsgMX0pIC5pbnMtaGVhZGVyX19kcm9wZG93bi1saW5rLXRpdGxlOjpiZWZvcmUgeyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJyR7dXJsfScpOyB9YCkuZmlsdGVyKHVybCA9PiB1cmwpLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgICBqc0NTUy50ZXh0KGNzcyk7XG4gICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5qZWN0Q2xpY2tpbmdPbk1lbnVCdXR0b24ocGFnZSkge1xuICAgICAgICBkLmFycml2ZShcIi5pbnMtaGVhZGVyX19pY29uLS1idXJnZXJcIiwgb25jZU9ubHksIGVsZW0gPT4ge1xuICAgICAgICAgICAgJChlbGVtKS5vbihcImNsaWNrXCIsIGluamVjdExhbmd1YWdlc01lbnUpO1xuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluamVjdExlZ2FsTGlua3NLZWVwTGFuZ3VhZ2UocGFnZSkge1xuICAgICAgICAkKFwiLmlucy1oZWFkZXJfX21lbnUtbGluay10aXRsZVwiKS5lYWNoKChpLCBsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkbCA9ICQobCk7XG4gICAgICAgICAgICBpID0gJGwuYXR0cihcImhyZWZcIik7XG4gICAgICAgICAgICBpID0gaS5yZXBsYWNlKC8oZGF0ZXgyd2R8ZGF0ZXgyKVxcLmJpa2VcXC9lblxcLy9pLCBsb2NhdGlvbi5ob3N0bmFtZSArIFwiL1wiICsgbG9jYXRpb24ucGF0aG5hbWUuc3Vic3RyaW5nKDEpLnNwbGl0KFwiL1wiKVswXSB8fCBcImVuXCIpO1xuICAgICAgICAgICAgaWYgKGk/LnN0YXJ0c1dpdGgoXCIjXCIpICYmICFsLmZpeGVkSGFzaCkge1xuICAgICAgICAgICAgICAgIGwuZml4ZWRIYXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGwuYXR0cihcImhyZWZcIiwgaSk7XG4gICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgdmFyIHJhbmRvbUlkID0gXCJfX3h5elwiXG4gICAgICAgICwgcmFuZG9tSW5kZXggPSAwO1xuICAgICQuZXh0ZW5kKHtcbiAgICAgICAgcmVwbGFjZVRhZzogZnVuY3Rpb24gKGN1cnJlbnRFbGVtLCBuZXdUYWdPYmosIGtlZXBQcm9wcykge1xuICAgICAgICAgICAgdmFyICRjdXJyZW50RWxlbSA9ICQoY3VycmVudEVsZW0pO1xuICAgICAgICAgICAgdmFyIGlkID0gJGN1cnJlbnRFbGVtLmF0dHIoXCJpZFwiKTtcbiAgICAgICAgICAgIHZhciBuZXdJZCA9IHJhbmRvbUlkICsgcmFuZG9tSW5kZXgrKztcbiAgICAgICAgICAgIHZhciAkbmV3VGFnID0gJChgPCR7bmV3VGFnT2JqfS8+YCk7XG4gICAgICAgICAgICBpZiAoa2VlcFByb3BzKSB7XG4gICAgICAgICAgICAgICAgLy97e3tcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUYWcgPSAkbmV3VGFnWzBdO1xuICAgICAgICAgICAgICAgIG5ld1RhZy5jbGFzc05hbWUgPSBjdXJyZW50RWxlbS5jbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgLy8kLmV4dGVuZChuZXdUYWcuY2xhc3NMaXN0LCBjdXJyZW50RWxlbS5jbGFzc0xpc3QpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBjdXJyZW50RWxlbS5hdHRyaWJ1dGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHIgPSBjdXJyZW50RWxlbS5hdHRyaWJ1dGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy99fX1cbiAgICAgICAgICAgICRuZXdUYWcuYXR0cihcImlkXCIsIG5ld0lkKTtcbiAgICAgICAgICAgICRjdXJyZW50RWxlbS53cmFwQWxsKCRuZXdUYWcpO1xuICAgICAgICAgICAgJGN1cnJlbnRFbGVtLmNvbnRlbnRzKCkudW53cmFwKCk7XG4gICAgICAgICAgICAkbmV3VGFnID0gJChgIyR7bmV3SWR9YCk7XG4gICAgICAgICAgICByZXR1cm4gJG5ld1RhZztcbiAgICAgICAgfSxcbiAgICB9KTtcblxuICAgICQuZm4uZXh0ZW5kKHtcbiAgICAgICAgcmVwbGFjZVRhZzogZnVuY3Rpb24gKG5ld1RhZ09iaiwga2VlcFByb3BzKSB7XG4gICAgICAgICAgICB2YXIgciA9IFtdO1xuICAgICAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xvbmUgPSBqUXVlcnkucmVwbGFjZVRhZyh0aGlzLCBuZXdUYWdPYmosIGtlZXBQcm9wcyk7XG4gICAgICAgICAgICAgICAgci5wdXNoKGNsb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHIubGVuZ3RoID09IDAgPyAkKHIpIDogci5yZWR1Y2UoJC5tZXJnZSk7XG4gICAgICAgIH0sXG4gICAgfSk7XG4gICAgZnVuY3Rpb24gaW5qZWN0UGFydG5lckxpbmtzT25Ib21lUGFnZShwYWdlKSB7XG4gICAgICAgIGlmIChwYWdlLnR5cGUgPT0gXCJTSVRFXCIpIHtcbiAgICAgICAgICAgIHZhciBtYXAgPSB7XG4gICAgICAgICAgICAgICAgXCJcdTFEMDdcdTAyOUZcdTFEMDdcdTFEMDRcdTFEMUJcdTAyODBcdTAyNkFcdTFEMDQgXHUxRDAwXHUwMjlGXHUwMjlGIFx1MUQyMVx1MDI5Q1x1MUQwN1x1MUQwN1x1MDI5RlwiOiBcImh0dHBzOi8vZWxlY3RyaWNhbGx3aGVlbC5jb20vcHJvZHVjdHMvZGF0ZXgyLTMwYS11bml2ZXJzYWwtZHVhbC1iYXR0ZXJ5LWR1YWwtb3V0cHV0LWRpc2NoYXJnZS1iYWxhbmNlci1raXQtYnVsbGV0LXQtcGx1Zy14dDYwP2Nna2l0X3NlYXJjaF93b3JkPWRhdGV4Mi5iaWtlJnV0bV9zb3VyY2U9ZGF0ZXgyLmJpa2UmdXRtX21lZGl1bT1yZWZlcnJhbFwiLFxuICAgICAgICAgICAgICAgIFwiXHVBNzMxXHUxRDE4XHUxRDAwXHUwMjgwXHUxRDBCIFx1MUQwNFx1MDI4Rlx1MUQwNFx1MDI5Rlx1MUQwN1x1QTczMVwiOiBcImh0dHBzOi8vd3d3LnNwYXJrY3ljbGV3b3Jrcy5jb20vaW5kZXgucGhwL3Byb2R1Y3QvYmF0dGVyeS1ibGVuZGVyP3V0bV9zb3VyY2U9ZGF0ZXgyLmJpa2UmdXRtX21lZGl1bT1yZWZlcnJhbFwiLFxuICAgICAgICAgICAgICAgIFwiXHUxRDBEXHUxRDAwXHUxRDFCXHUxRDA3IFx1MDI5OVx1MDI4RiBcdTFEMERcdTFEMDdcIjogXCJodHRwOi8vZmIuY29tL01BVEVieU1FJnV0bV9zb3VyY2U9ZGF0ZXgyLmJpa2UmdXRtX21lZGl1bT1yZWZlcnJhbFwiLFxuICAgICAgICAgICAgICAgIFwieC1cdTFEMUJcdTFEMDdcdTFEMERcdUE3MzFcIjogXCJodHRwczovL3gtdGVtcy5jb20/dXRtX3NvdXJjZT1kYXRleDIuYmlrZSZ1dG1fbWVkaXVtPXJlZmVycmFsXCIsXG4gICAgICAgICAgICAgICAgXCJcdTFEMDdcdTFEMjBcdTFEMEZcdTAyOUZcdTFEMUNcdTFEMUJcdTAyNkFcdTFEMEZcdTAyNzQgXHUxRDA0XHUwMjhGXHUxRDA0XHUwMjlGXHUxRDA3XHVBNzMxXCI6IFwiaHR0cHM6Ly9ldm9sdXRpb24tY3ljbGVzLmplP3V0bV9zb3VyY2U9ZGF0ZXgyLmJpa2UmdXRtX21lZGl1bT1yZWZlcnJhbFwiLFxuICAgICAgICAgICAgICAgIFx1MUQwRFx1MUQwMFx1MUQxQlx1MUQwNzogXCJodHRwczovL01BVEUuYmlrZT91dG1fc291cmNlPWRhdGV4Mi5iaWtlJnV0bV9tZWRpdW09cmVmZXJyYWxcIixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkLmFycml2ZShcIiN0aWxlLWZlYXR1cmUtbGlzdC1mQ1VqUjYgZGl2Lmlucy10aWxlX19mZWF0dXJlLXRpdGxlXCIsIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZzogdHJ1ZVxuICAgICAgICAgICAgfSwgZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbSA9ICQoZWxlbSk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uaGFzQ2xhc3MoXCJwcm9jZXNzZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbGVtLnRvZ2dsZUNsYXNzKFwicHJvY2Vzc2VkXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gZWxlbS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IG1hcFtuYW1lXTtcbiAgICAgICAgICAgICAgICBlbGVtLnBhcmVudCgpLmZpbmQoXCJkaXYuaW5zLXRpbGVfX2ZlYXR1cmUtdGl0bGUsIGRpdi5pbnMtdGlsZV9fZmVhdHVyZS1kZXNjcmlwdGlvbiwgZGl2Lmlucy10aWxlX19mZWF0dXJlLWljb25cIikuZWFjaCgoaSwgcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbyA9ICQocCkucmVwbGFjZVRhZyhcImFcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG8uYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmOiBgJHt1cmx9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICAgICAgICAgICAgICAgICAgfSkuYWRkQ2xhc3MoXCJwYXJ0bmVyXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHZhciBvID0gJCgpLmZpbHRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLnRleHQoKSA9PSBuYW1lO1xuICAgICAgICAgICAgICAgIH0pLnJlcGxhY2VUYWcoXCJhXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIG8uYXR0cih7XG4gICAgICAgICAgICAgICAgICAgIGhyZWY6IGAke3VybH1gLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgICAgICAgICAgICAgfSkuYWRkQ2xhc3MoXCJwYXJ0bmVyXCIpO1xuICAgICAgICAgICAgICAgIG8gPSAkKGAuaW5zLXRpbGVfX2ZlYXR1cmUtdGl0bGU6Y29udGFpbnMoJyR7bmFtZX0nKWApLmZpbHRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLnRleHQoKSA9PSBuYW1lO1xuICAgICAgICAgICAgICAgIH0pLm1hcCgoaSwgcCkgPT4gJChwKS5wYXJlbnQoKS5maW5kKFwic3ZnXCIpLndyYXAoJChcIjxhIC8+XCIpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICBocmVmOiBgJHt1cmx9YCxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBcIl9ibGFua1wiLFxuICAgICAgICAgICAgICAgIH0pLmFkZENsYXNzKFwicGFydG5lci1pY29uXCIpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5qZWN0VmlkZW9PbkhvbWVQYWdlKHBhZ2UpIHtcbiAgICAgICAgaWYgKHBhZ2UudHlwZSA9PSBcIlNJVEVcIikge1xuICAgICAgICAgICAgaWYgKFwib3JpZW50YXRpb25cIiBpbiBzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2NyZWVuLm9yaWVudGF0aW9uLm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlLnN0YXJ0c1dpdGgoXCJsYW5kc2NhcGVcIikgJiYgZG9jdW1lbnQuYm9keS53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvblVJOiBcImhpZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICRkLm9uKFwiY2xpY2tcIiwgXCIuaW5zLXRpbGVfX2Zvb3RlclwiLCBlPT4ge1xuICAgICAgICAgICAgLy8gICBwbGF5ZXIuc2V0Vm9sdW1lKG11dGVkID8gMCA6IDEpLnRoZW4odj0+cGxheWVyLnBsYXkoKSk7XG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgbG9nRHVyYXRpb24oXCJQbGF5ZXIgLSBsaXN0ZW5pbmcgZm9yIGVsZW1lbnRcIikoKTtcbiAgICAgICAgICAgIC8vdmFyIHZpZGVvRWxlbSA9ICQoXCI8ZGl2Lz5cIikuYXR0cihcImlkXCIsIFwidmlkZW8tbG9hZGVyXCIpLmFwcGVuZFRvKGQuYm9keSk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGluamVjdFZpZGVvSW5QYWdlKGVsZW0pIHtcbiAgICAgICAgICAgICAgICBsb2dEdXJhdGlvbihcIlBsYXllciAtIGluamVjdGVkIGludG8gcGFnZVwiKSgpO1xuICAgICAgICAgICAgICAgIC8vJChlbGVtKS5hcHBlbmQodmlkZW9FbGVtLmNoaWxkcmVuKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZC5hcnJpdmUoXCIjdGlsZS1jb3Zlci1IYVhxNkYgLmlucy10aWxlX19zcGFjZXIsICN0aWxlLWNvdmVyLUhhWHE2RiAudmlkZW8td3JhcHBlclwiLCBub3RPbmNlT25seSwgZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgbG9nRHVyYXRpb24oXCJQbGF5ZXIgLSBlbGVtZW50IGFycml2ZWRcIikoKTtcbiAgICAgICAgICAgICAgICBlbGVtID0gJChlbGVtKTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNWaWRlb1dyYXBwZXIgPSBlbGVtLmlzKFwiLnZpZGVvLXdyYXBwZXJcIikgPyBlbGVtIDogZWxlbS5maW5kKFwiLnZpZGVvLXdyYXBwZXJcIik7XG4gICAgICAgICAgICAgICAgY29uc3Qgd3JhcHBlciA9ICQoYDxkaXYgY2xhc3M9XCJpbnMtdGlsZV9fc3BhY2VyLWFkZGVkXCI+PC9kaXY+YClcbiAgICAgICAgICAgICAgICAgICAgLCB2aWRlb1dyYXBwZXIgPSBoYXNWaWRlb1dyYXBwZXIubGVuZ3RoID8gaGFzVmlkZW9XcmFwcGVyIDogJChgPGRpdiBjbGFzcz1cInZpZGVvLXdyYXBwZXJcIj48L2Rpdj5gKTtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc1ZpZGVvV3JhcHBlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS50b2dnbGVDbGFzcyhcImlucy10aWxlX19zcGFjZXJcIiwgZmFsc2UpLnRvZ2dsZUNsYXNzKFwidmlkZW8tY29udGFpbmVyXCIsIHRydWUpLmFwcGVuZCh3cmFwcGVyLCB2aWRlb1dyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmZpbmQoXCIuaW5zLXRpbGVfX3NwYWNlci1hZGRlZFwiKS50b2dnbGVDbGFzcyhcImlucy10aWxlX19zcGFjZXJcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluaXRpYWxpemVWaWRlbyh2aWRlb1dyYXBwZXJbMF0pO1xuICAgICAgICAgICAgICAgIGVsZW0gPSAkKFwiI3RpbGUtY292ZXItSGFYcTZGXCIpWzBdO1xuICAgICAgICAgICAgICAgICQoZWxlbSkuaGFzQ2xhc3MoXCJpbnMtdGlsZS0tc2hvd25cIikvL3x8IHdpbmRvdy5zY3JvbGxZIDwgd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgID8gaW5qZWN0VmlkZW9JblBhZ2UoZWxlbSkgOiAkKGVsZW0pLmNsYXNzQ2hhbmdlKChlbGVtLCBhdHRyaWJ1dGVOYW1lLCBvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nRHVyYXRpb24oXCJQbGF5ZXIgLSBlbGVtZW50IHNob3duXCIpKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChlbGVtKS5oYXNDbGFzcyhcImlucy10aWxlLS1zaG93blwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmplY3RWaWRlb0luUGFnZShlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBoaWRlQ29weXJpZ2h0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KHQgPT4ge1xuICAgICAgICAgICAgJGQudG9nZ2xlQ2xhc3MoXCJoaWRpbmctY29weXJpZ2h0XCIsIHRydWUpO1xuICAgICAgICAgICAgc2V0VGltZW91dCh0ID0+ICRkLnRvZ2dsZUNsYXNzKFwiaGlkZGVuLWNvcHlyaWdodFwiLCB0cnVlKS50b2dnbGVDbGFzcyhcImhpZGluZy1jb3B5cmlnaHRcIiwgZmFsc2UpLCAxMDAwKTtcbiAgICAgICAgfVxuICAgICAgICAgICAgLCA2MDAwKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2F0ZWdvcnlQYWdlSW5pdChwYWdlKSB7XG4gICAgICAgIGlmIChwYWdlPy50eXBlID09PSBcIkNBVEVHT1JZXCIgfHwgcGFnZT8udHlwZSA9PSBcIlNFQVJDSFwiKSB7XG4gICAgICAgICAgICBoaWRlQ29weXJpZ2h0KCk7XG4gICAgICAgICAgICBzaG93QWN0aW9uQmFyV2hlblJlYWR5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaW5qZWN0QWRkVG9DYXJ0SWNvbihwYWdlKSB7XG4gICAgICAgIGlmIChwYWdlPy50eXBlID09IFwiUFJPRFVDVFwiIHx8ICQoXCIuZWN3aWQtcHJvZHVjdEJyb3dzZXItUHJvZHVjdFBhZ2VcIi5sZW5ndGgpKSB7XG4gICAgICAgICAgICBpZiAoISRkLnB1cmNoYXNlQnV0dG9uQm91bmQpIHtcbiAgICAgICAgICAgICAgICAkZC5wdXJjaGFzZUJ1dHRvbkJvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkLmFycml2ZShcIi5kZXRhaWxzLXByb2R1Y3QtcHVyY2hhc2VfX2FkZC10by1iYWcgYnV0dG9uLC5kZXRhaWxzLXByb2R1Y3QtcHVyY2hhc2VfX2FkZC1tb3JlIGJ1dHRvblwiLCBub3RPbmNlT25seSwgZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlID0gJChlbGVtKS5maW5kKFwic3ZnXCIpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0JveDogXCIxMCAwIDY0IDg2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjgsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDQwXG4gICAgICAgICAgICAgICAgICAgIH0pLmFkZENsYXNzKFwiaWNvblwiKVswXTtcbiAgICAgICAgICAgICAgICAgICAgZS5pbm5lckhUTUwgPSAkKHN2Z0ljb25zLmFkZFRvQ2FydEljb24oKSlbMF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0FkZFRvQ2FydCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrQWRkVG9DYXJ0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBmaXhMb2dpbkJ1dHRvbnMocGFnZSkge1xuICAgICAgICBpZiAocGFnZS50eXBlIGluIHtcbiAgICAgICAgICAgIEFDQ09VTlRfUk9PVDogMSxcbiAgICAgICAgICAgIEFDQ09VTlRfUkVHSVNUUkFUSU9OOiAxLFxuICAgICAgICAgICAgQUNDT1VOVF9SRVNFVF9QQVNTV09SRDogMSxcbiAgICAgICAgICAgIFRFUk1TOiAxXG4gICAgICAgIH0pIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGVsZW1lbnRBcnJpdmVkKGVsZW0pIHtcbiAgICAgICAgICAgICAgICAkKGVsZW0pLnRvZ2dsZUNsYXNzKFwiZm9ybS1jb250cm9sX19idXR0b24gZm9ybS1jb250cm9sX19idXR0b24tLWljb24tY2VudGVyXCIsIHRydWUpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKFwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC0tYnV0dG9uIGZvcm0tY29udHJvbC0tbGFyZ2UgZm9ybS1jb250cm9sLS1zZWNvbmRhcnkgZm9ybS1jb250cm9sLS1mbGV4aWJsZSBmb3JtLWNvbnRyb2wtLWFuaW1hdGVkIGZvcm0tY29udHJvbC0tZG9uZSBlYy1jYXJ0X19idXR0b25cIiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkLnVuYmluZEFycml2ZShlbGVtZW50QXJyaXZlZCk7XG4gICAgICAgICAgICBkLmFycml2ZShcIi5lYy1yZXNldFBhc3N3b3JkLWZvcm0gLmVjLWNhcnRfX2J1dHRvbnMrLmVjLXBhZ2UtbGlua3MgLmVjLWxpbmssIC5lYy1yZWdpc3Rlci1mb3JtIC5lYy1jYXJ0X19idXR0b25zKy5lYy1wYWdlLWxpbmtzIC5lYy1saW5rLCAuZWMtbG9naW4tZm9ybSAuZWMtY2FydF9fYnV0dG9ucysuZWMtcGFnZS1saW5rcyAuZWMtbGlua1wiLCBub3RPbmNlT25seVNlbGZVbmJpbmQsIGVsZW1lbnRBcnJpdmVkKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoc2hvd0FjdGlvbkJhciwgMTApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluamVjdE1ldGVvcnMocGFnZSkge1xuICAgICAgICBpZiAocGFnZS50eXBlID09IFwiU0lURVwiKSB7XG4gICAgICAgICAgICAvL3JlbmRlciBtZXRlb3JzIG9uIHRoZSBob21lcGFnZSB2aWRlb1xuICAgICAgICAgICAgJChzdmdJY29ucy5tZXRlb3JzKCkpLnByZXBlbmRUbyhkLmJvZHkpO1xuICAgICAgICAgICAgLy9yZW5kZXIgbW92aW5nIGJhY2tncm91bmRcbiAgICAgICAgICAgIHdpbmRvdy5haV9iYWNrZ3JvdW5kID0gbmV3IEZEMjMoXCJia0ZyYW1lXCIsIHtcbiAgICAgICAgICAgICAgICByZXNvbHV0aW9uU2NhbGU6IFwiMC41XCIsXG4gICAgICAgICAgICAgICAgbWF4RnBzOiBcIjYwXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0VGltZW91dCh0ID0+ICQoXCIuZ3JlZW4tYmdcIikudG9nZ2xlQ2xhc3MoXCJncmVlbi1iZy12aXNpYmxlXCIsIHRydWUpLCAxMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZGV0ZWN0T3JkZXJOdW1iZXIocGFnZSkge1xuICAgICAgICBpZiAocGFnZS50eXBlID09IFwiT1JERVJfQ09ORklSTUFUSU9OXCIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5vcmRlcklkID0gcGFnZS52ZW5kb3JPcmRlck51bWJlcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBkZXRlY3RQb3JkdWN0T3B0aW9uc1RleHRWYWx1ZXMocGFnZSkge1xuICAgICAgICBpZiAocGFnZS50eXBlID09IFwiUFJPRFVDVFwiKSB7XG4gICAgICAgICAgICB2YXIgcXMgPSBuZXcgVVJMKGxvY2F0aW9uKS5zZWFyY2hQYXJhbXM7XG4gICAgICAgICAgICBxcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKFwicG8tLVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0b3IgPSBcIi5kZXRhaWxzLXByb2R1Y3Qtb3B0aW9uLS1cIiArICQuZXNjYXBlU2VsZWN0b3Ioa2V5LnN1YnN0cmluZyg0KS5yZXBsYWNlKC8gL2csIFwiLVwiKSkgKyBcIiBpbnB1dFwiO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbSA9ICQoc2VsZWN0b3IpLnZhbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0gJiYgZWxlbVswXSAmJiBlbGVtWzBdLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiaW5wdXRcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gYGluamVjdFJldmlld3NgIHByb3ZpZGVkIGJ5IHdlYnNpdGVSZXZpZXdzIG1vZHVsZVxuICAgIGFzeW5jIGZ1bmN0aW9uIGNsaWNrQWRkVG9DYXJ0KGUpIHsvLyBpZiAoIWNvbmZpcm0odHJhbnNsYXRlKFwiVGhlIGl0ZW0gd2FzIGFkZGVkIHRvIGNhcnQuIFdvdWxkIHlvdSBsaWtlIHRvIG9wZW4gdGhlIGNhcnQ/XCIpKSkge1xuICAgICAgICAvLyAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgIGhpZGVBY3Rpb25CYXIodHJ1ZSk7XG4gICAgICAgIC8vICAgb25QYWdlVW5sb2FkZWQoKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIHZhciBzdHlsZSA9ICQoXCIjanMtY2FydC1jaGVja291dFwiKTtcbiAgICBzdHlsZS5sZW5ndGggfHwgKHN0eWxlID0gJChcIjxzdHlsZS8+XCIpLmF0dHIoXCJpZFwiLCBcImpzLWNhcnQtY2hlY2tvdXRcIikuYXBwZW5kVG8oJGIpKTtcbiAgICB2YXIgY2hlY2tvdXRGb290ZXJBY3Rpb25CdXR0b25SZXNpemVkVGltZW91dCA9IDA7XG4gICAgY29uc3QgY2hlY2tvdXRGb290ZXJBY3Rpb25CdXR0b25SZXNpemVkT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoY2hlY2tvdXRGb290ZXJBY3Rpb25CdXR0b25SZXNpemVkKTtcbiAgICBmdW5jdGlvbiBtb25pdG9yRWxlbWVudEFycml2ZWQoZWxlbSkge1xuICAgICAgICBjbGVhclRpbWVvdXQoY2hlY2tvdXRGb290ZXJBY3Rpb25CdXR0b25SZXNpemVkVGltZW91dCk7XG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gKGlzU2Nyb2xsaW5nID0gdHJ1ZSksIHRydWUpO1xuICAgICAgICBjb25zdCAkZWxlbSA9ICQoZWxlbSk7XG4gICAgICAgIGlmICgkZWxlbS5pcyhcIi5lYy1maWx0ZXJzX19ib2R5LmVjLWZvcm1fX3Jvdy0tY29udGludWVcIikpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICgkZWxlbS5pcyhcIi5mb3JtLWNvbnRyb2wtLWRvbmUuZm9ybS1jb250cm9sLS1wcmltYXJ5XCIpICYmICEkKFwiLmVjd2lkLXByb2R1Y3RCcm93c2VyLUNhcnRQYWdlLC5lY3dpZC1wcm9kdWN0QnJvd3Nlci1Qcm9kdWN0UGFnZVwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGVsZW0gPSAkZWxlbS5wYXJlbnQoKS5wYXJlbnQoKS5hZGRDbGFzcyhcImVjLWZvcm1fX3Jvdy0tY29udGludWVcIilbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlbGVtLm9ic2VydmluZykge1xuICAgICAgICAgICAgZWxlbS5vYnNlcnZpbmcgPSB0cnVlO1xuICAgICAgICAgICAgY2hlY2tvdXRGb290ZXJBY3Rpb25CdXR0b25SZXNpemVkT2JzZXJ2ZXIub2JzZXJ2ZShlbGVtKTtcbiAgICAgICAgfVxuICAgICAgICBjaGVja291dEZvb3RlckFjdGlvbkJ1dHRvblJlc2l6ZWRUaW1lb3V0ID0gc2V0VGltZW91dChjaGVja291dEZvb3RlckFjdGlvbkJ1dHRvblJlc2l6ZWQsIDEwKTtcbiAgICB9XG4gICAgdmFyIGNoZWNrb3V0Rm9vdGVyQWN0aW9uQnV0dG9uUmVzaXplZFRpbWVvdXQgPSAwO1xuICAgIGZ1bmN0aW9uIGNoZWNrb3V0Rm9vdGVyQWN0aW9uQnV0dG9uUmVzaXplZChlbGVtKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChjaGVja291dEZvb3RlckFjdGlvbkJ1dHRvblJlc2l6ZWRUaW1lb3V0KTtcbiAgICAgICAgY2hlY2tvdXRGb290ZXJBY3Rpb25CdXR0b25SZXNpemVkVGltZW91dCA9IHNldFRpbWVvdXQodCA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaXRlID0gJChcIiNlYy1pbnN0YW50c2l0ZVwiKTtcbiAgICAgICAgICAgIGNvbnN0IG1lbnVXcmFwcGVyID0gc2l0ZS5maW5kKFwiLm1lbnUtd3JhcHBlclwiKS5vdXRlckhlaWdodCgpIHx8IDA7XG4gICAgICAgICAgICBjb25zdCBjYXJ0Q2hlY2tvdXQgPSBzaXRlLmZpbmQoXCIuZWMtY2FydF9fY2hlY2tvdXQsLmVjLWNvbmZpcm1hdGlvbl9fY29udGludWU6Zmlyc3RcIikub3V0ZXJIZWlnaHQoKSB8fCAwO1xuICAgICAgICAgICAgY29uc3Qgcm93Q29udGludW5lID0gc2l0ZS5maW5kKFwiLmVjLWZvcm1fX3Jvdy0tY29udGludWU6dmlzaWJsZTpub3QoLmVjLWZpbHRlcnMpOm5vdCguZWMtZmlsdGVyc19fYm9keSk6bm90KC5lYy1vcGVuYWJsZS1ibG9jayk6bm90KC5lYy1vcGVuYWJsZS1ibG9ja19fd3JhcCk6bm90KC5lYy1vcGVuYWJsZS1ibG9ja19fd3JhcC1pbm5lcilcIikub3V0ZXJIZWlnaHQoKSB8fCAwO1xuICAgICAgICAgICAgY29uc3QgY2hlY2tvdXRIZWlnaHQgPSBtZW51V3JhcHBlciB8fCBjYXJ0Q2hlY2tvdXQgfHwgcm93Q29udGludW5lO1xuICAgICAgICAgICAgLy9zaXRlLmZpbmQoXCIuZWMtY2FydF9fc3VtbWFyeVwiKS5vdXRlckhlaWdodCgpO1xuXG4gICAgICAgICAgICBjb25zdCBwcmljZVRheGVzID0gc2l0ZS5maW5kKFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1wcmljZS10YXhlc1wiKS5vdXRlckhlaWdodCgpIHx8IDA7XG4gICAgICAgICAgICBjb25zdCBwcmljZUNvbnRhaW5lciA9IHNpdGUuZmluZChcIi5kZXRhaWxzLXByb2R1Y3QtcHJpY2UtY29tcGFyZV9fY29udGFpbmVyXCIpLm91dGVySGVpZ2h0KCkgfHwgMDtcbiAgICAgICAgICAgIGNvbnN0IGxlZ2FsUGFnZUJ1dHRvbnMgPSBzaXRlLmZpbmQoXCIuZWMtc3RvcmVfX2xlZ2FsLXBhZ2UgLmVjLXBhZ2UtYnV0dG9uc1wiKS5vdXRlckhlaWdodCgpIHx8IDA7XG4gICAgICAgICAgICBjb25zdCBjZXJ0ID0gc2l0ZS5maW5kKFwiLmNhcnRfX2JvZHkgLmVjLWNhcnRfX2NlcnRcIikub3V0ZXJIZWlnaHQoKSB8fCAwO1xuICAgICAgICAgICAgY29uc3QgbWIyID0gc2l0ZS5maW5kKFwiLmVjLWZvcm0tLW1iMlwiKS5vdXRlckhlaWdodCgpIHx8IDA7XG4gICAgICAgICAgICBjb25zdCBjYXJ0U3VtbWFyeSA9ICQoXCIuZWMtY2FydF9fc3VtbWFyeVwiKS5vdXRlckhlaWdodCgpIHx8IDA7XG4gICAgICAgICAgICBjb25zdCBzdW1tYXJ5SGVpZ2h0ID0gY2FydFN1bW1hcnkgKyBwcmljZVRheGVzICsgcHJpY2VDb250YWluZXIgKyBsZWdhbFBhZ2VCdXR0b25zICsgY2VydCArIG1iMjtcbiAgICAgICAgICAgIHN0eWxlLnRleHQoYFxuOnJvb3QsICN0aWxlLXByb2R1Y3QtZGV0YWlscyB7XG4gIC0tZWMtY2FydF9fY2hlY2tvdXQtLWhlaWdodDogJHtjaGVja291dEhlaWdodH1weDtcbiAgLS1lYy1jYXJ0X19zdW1tYXJ5LS1oZWlnaHQ6ICR7c3VtbWFyeUhlaWdodH1weDtcbiAgLS1lYy1jYXJ0X19hY3Rpb24tYmFyLS1oZWlnaHQ6ICR7Y2hlY2tvdXRIZWlnaHQgKyBzdW1tYXJ5SGVpZ2h0fXB4XG59YCk7XG4gICAgICAgIH1cbiAgICAgICAgICAgICwgMTApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc2Nvbm5lY3RDaGVja291dEZvb3RlckFjdGlvbkJ1dHRvblJlc2l6ZWRPYnNlcnZlcihwYWdlKSB7XG4gICAgICAgIGNoZWNrb3V0Rm9vdGVyQWN0aW9uQnV0dG9uUmVzaXplZE9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNDYXJ0U3VtbWFyeVBhZ2UocGFnZSkge1xuICAgICAgICBjb25zdCBpc0NhcnRTdW1tYXJ5ID0gW1wiQ0FSVFwiLCBcIkNIRUNLT1VUX0FERFJFU1NcIiwgXCJDSEVDS09VVF9ERUxJVkVSWVwiLCBcIkNIRUNLT1VUX1RBWF9JTkZPUk1BVElPTlwiLCBcIkNIRUNLT1VUX1BBWU1FTlRfREVUQUlMU1wiLCBcIk9SREVSX0NPTkZJUk1BVElPTlwiLCBcIkFDQ09VTlRcIl0uaW5kZXhPZihwYWdlPy50eXBlPy50b1VwcGVyQ2FzZSgpKSA+PSAwO1xuICAgICAgICByZXR1cm4gaXNDYXJ0U3VtbWFyeTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNPcmRlckNvbmZpcm1hdGlvblBhZ2UocGFnZSkge1xuICAgICAgICBjb25zdCBpc09yZGVyQ29uZmlybWF0aW9uID0gW1wiT1JERVJfQ09ORklSTUFUSU9OXCIsIFwiQUNDT1VOVFwiXS5pbmRleE9mKHBhZ2U/LnR5cGU/LnRvVXBwZXJDYXNlKCkpID49IDA7XG4gICAgICAgIHJldHVybiBpc09yZGVyQ29uZmlybWF0aW9uO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGp1c3RGb290ZXJBY3Rpb25CYXJIZWlnaHQocGFnZSkge1xuICAgICAgICBvbkRvbVJlYWR5KGRvbVJlYWR5ID0+IHtcbiAgICAgICAgICAgIGQudW5iaW5kQXJyaXZlKGxpc3RlblRvZ2dsZVN1bW1hcnkpO1xuICAgICAgICAgICAgZC51bmJpbmRBcnJpdmUobW9uaXRvckVsZW1lbnRBcnJpdmVkKTtcbiAgICAgICAgICAgIGQuYXJyaXZlKFwiLmVjLWNhcnQtaXRlbV9faW1hZ2VcIiwgb25jZU9ubHlTZWxmVW5iaW5kLCBzZXRGb290ZXJIZWlnaHQpO1xuICAgICAgICAgICAgZC5hcnJpdmUoXCIuZWMtY2FydF9fc3VtbWFyeVwiLCBub3RPbmNlT25seVNlbGZVbmJpbmQsIGxpc3RlblRvZ2dsZVN1bW1hcnkpO1xuICAgICAgICAgICAgY29uc3QgbG9jYWxTdG9yYWdlS2V5ID0gXCJjYXJ0LXRvdGFsLWNvbGxhcHNlZFwiO1xuICAgICAgICAgICAgZnVuY3Rpb24gbGlzdGVuVG9nZ2xlU3VtbWFyeShlbGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtLmJvdW5kVG9nZ2xlU3VtbWFyeSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmJvdW5kVG9nZ2xlU3VtbWFyeSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZVN1bW1hcnksIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkZC50b2dnbGVDbGFzcyhcImNhcnQtc3VtbWFyeS1jb2xsYXBzZWRcIiwgbG9jYWxTdG9yYWdlW2xvY2FsU3RvcmFnZUtleV0gPT0gXCIxXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gdG9nZ2xlU3VtbWFyeSgpIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2NhbFN0b3JhZ2VLZXksICRkLnRvZ2dsZUNsYXNzKFwiY2FydC1zdW1tYXJ5LWNvbGxhcHNlZFwiKS5pcyhcIi5jYXJ0LXN1bW1hcnktY29sbGFwc2VkXCIpID8gXCIxXCIgOiBcIjBcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1vbml0b3JFbGVtZW50cyA9IFwiI2VjLWluc3RhbnRzaXRlIC5lYy1jYXJ0X19jaGVja291dCwgLmVjLWNhcnRfX3N1bW1hcnksICNlYy1pbnN0YW50c2l0ZSAuZWMtZm9ybV9fcm93LS1jb250aW51ZSwgLmVjLWNvbmZpcm1hdGlvbl9fY29udGludWUsICNlYy1pbnN0YW50c2l0ZSAuZm9ybS1jb250cm9sLS1kb25lLmZvcm0tY29udHJvbC0tcHJpbWFyeSwgI2VjLWluc3RhbnRzaXRlIC5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtcHJpY2UtdGF4ZXMsICNlYy1pbnN0YW50c2l0ZSAuZGV0YWlscy1wcm9kdWN0LXByaWNlLWNvbXBhcmVfX2NvbnRhaW5lciwgI2VjLWluc3RhbnRzaXRlIC5tZW51LXdyYXBwZXIsICNlYy1pbnN0YW50c2l0ZSAuZWMtc3RvcmVfX2xlZ2FsLXBhZ2UsICNlYy1pbnN0YW50c2l0ZSAuZWMtcGFnZS1idXR0b25zLCAjZWMtaW5zdGFudHNpdGUgLmVjLWNhcnRfX2NlcnQsICNlYy1pbnN0YW50c2l0ZSAuZWMtZm9ybS0tbWIyXCI7XG5cbiAgICAgICAgICAgIG9uVW5sb2FkKGRpc2Nvbm5lY3RDaGVja291dEZvb3RlckFjdGlvbkJ1dHRvblJlc2l6ZWRPYnNlcnZlcik7XG4gICAgICAgICAgICBkLmFycml2ZShtb25pdG9yRWxlbWVudHMsIG5vdE9uY2VPbmx5U2VsZlVuYmluZCwgbW9uaXRvckVsZW1lbnRBcnJpdmVkKTtcbiAgICAgICAgICAgIGNoZWNrb3V0Rm9vdGVyQWN0aW9uQnV0dG9uUmVzaXplZFRpbWVvdXQgPSBzZXRUaW1lb3V0KGNoZWNrb3V0Rm9vdGVyQWN0aW9uQnV0dG9uUmVzaXplZCwgMTApO1xuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIFRyeShhZGp1c3RGb290ZXJBY3Rpb25CYXJIZWlnaHQsIGN1cnJlbnRQYWdlKTtcblxuICAgIGZ1bmN0aW9uIGluamVjdEZvb3RlckluVmlld09ic2VydmVyKCkge1xuICAgICAgICBvbkRvbVJlYWR5KGRvbVJlYWR5RWxlbSA9PiB7XG4gICAgICAgICAgICBkLmFycml2ZShcImZvb3Rlci5pbnMtdGlsZS0tZm9vdGVyXCIsIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB1bmlxdWVPbmx5OiB0cnVlXG4gICAgICAgICAgICB9LCBlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb290ZXJJblZpZXcgPSBpc0luVmlldyhlbGVtLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJGQudG9nZ2xlQ2xhc3MoXCJmb290ZXItdmlzaWJsZVwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmb290ZXJPdXRPZlZpZXcgPSBpc091dE9mVmlldyhlbGVtLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJGQudG9nZ2xlQ2xhc3MoXCJmb290ZXItdmlzaWJsZVwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIGluamVjdEZvb3RlckluVmlld09ic2VydmVyKCk7XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW5Ub0Fycml2ZVByb2R1Y3RPcHRpb25zKGV4aXN0aW5nKSB7XG4gICAgICAgIGQudW5iaW5kQXJyaXZlKGluamVjdFByb2R1Y3REZXRhaWxzKTtcbiAgICAgICAgZC5hcnJpdmUoXCIuZGV0YWlscy1wcm9kdWN0LW9wdGlvbnNcIiwge1xuICAgICAgICAgICAgZXhpc3Rpbmc6IGV4aXN0aW5nLFxuICAgICAgICAgICAgb25jZU9ubHk6IGZhbHNlXG4gICAgICAgIH0sIGluamVjdFByb2R1Y3REZXRhaWxzKTtcbiAgICB9XG4gICAgbGV0IGJvbmRBZGRUb0NhcnRDb250cm9scyA9IGZhbHNlO1xuICAgIGJpbmRBZGRUb0NhcnRDb250cm9scyhpbml0aWFsUHJvZHVjdElkLCBjdXJyZW50UGFnZSwgdHJ1ZSk7XG5cbiAgICBjb25zdCBmaWx0ZXJCeUNhdGVnb3J5SWRzID0ge307XG4gICAgY29uc3Qgb2xkQ2F0ZWdvcnlJZHMgPSBbXTtcbiAgICBmdW5jdGlvbiBkZXRlY3RDYXRlZ29yeUlkcygpIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgICBjb25zdCBxdWVyeSA9IHNlYXJjaC5nZXQoXCJjYXRlZ29yaWVzXCIpO1xuICAgICAgICBjb25zdCBhc2tpbmdDYXRlZ29yeUlkcyA9IHF1ZXJ5Py5zcGxpdChcIixcIikgfHwgW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXNraW5nQ2F0ZWdvcnlJZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghb2xkQ2F0ZWdvcnlJZHMuaW5jbHVkZXMoYXNraW5nQ2F0ZWdvcnlJZHNbaV0pKSB7XG4gICAgICAgICAgICAgICAgb2xkQ2F0ZWdvcnlJZHMucHVzaChhc2tpbmdDYXRlZ29yeUlkc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IG9sZENhdGVnb3J5SWRzLmxlbmd0aDsgaS0tOykge1xuICAgICAgICAgICAgaWYgKCFhc2tpbmdDYXRlZ29yeUlkcy5pbmNsdWRlcyhvbGRDYXRlZ29yeUlkc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBvbGRDYXRlZ29yeUlkcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3UXVlcnkgPSBvbGRDYXRlZ29yeUlkcy5qb2luKFwiLFwiKTtcbiAgICAgICAgaWYgKG5ld1F1ZXJ5ICE9IHF1ZXJ5KSB7XG4gICAgICAgICAgICBzZWFyY2guc2V0KFwiY2F0ZWdvcmllc1wiLCBuZXdRdWVyeSB8fCBudWxsKTtcbiAgICAgICAgICAgIGlmICghbmV3UXVlcnkpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2guZGVsZXRlKFwiY2F0ZWdvcmllc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHFzID0gc2VhcmNoLnRvU3RyaW5nKCkucmVwbGFjZSgvJTJDL2csIFwiLFwiKTtcbiAgICAgICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIGxvY2F0aW9uLnBhdGhuYW1lICsgXCI/XCIgKyBxcyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjYXRlZ29yeUlkcyA9IFswLCAuLi5bLi4ub2xkQ2F0ZWdvcnlJZHNdLnJldmVyc2UoKV07XG4gICAgICAgIGNvbnN0IGNhdGVnb3JpZXNUb0JlQ2hlY2tlZCA9IGNhdGVnb3J5SWRzLm1hcChjaWQgPT4ga25vd25DYXRlZ29yeVNsdWdzW2NpZF0pO1xuICAgICAgICBjYXRlZ29yaWVzVG9CZUNoZWNrZWQuZm9yRWFjaCgoY3AsIGZpbHRlck9yZGVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGF0dGVuQ2F0ZWdvcmllcyA9IGNwPy5pZCA/IFsuLi5jcC5mbGF0dGVuQ2F0ZWdvcmllcywgY3BdIDogW2NwXTtcbiAgICAgICAgICAgIGZsYXR0ZW5DYXRlZ29yaWVzLmZvckVhY2goKGMsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZm9yRWFjaChjPy5wcm9kdWN0cywgcCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yZGVyQnkgPSBmaWx0ZXJPcmRlciAqIDEwMDAwMDAwMDAgKyBwLm9yZGVyQnk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwID09IFwiNjA0ODI4MzE5XCIgfHwgcCA9PSBcIjU1MzAzMzAwMlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9yZGVyOlwiLCBwLCBvcmRlckJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJCeUNhdGVnb3J5SWRzW3AucHJvZHVjdC5pZF0gPSBvcmRlckJ5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICB2YXIgbGFzdFVwZGF0ZWRQcmljZUZvclByb2R1Y3RJZCA9IG51bGw7XG4gICAgZnVuY3Rpb24gbGlzdGVuVG9QcmVlcG10aXZlUHJpY2UocHJvZHVjdElkLCBwYWdlLCBleGlzdGluZykge1xuICAgICAgICBpZiAobGFzdFVwZGF0ZWRQcmljZUZvclByb2R1Y3RJZCAhPSBwcm9kdWN0SWQgJiYgKCFwYWdlIHx8IHBhZ2UudHlwZSA9PSBcIlBST0RVQ1RcIikpIHtcbiAgICAgICAgICAgIGxhc3RVcGRhdGVkUHJpY2VGb3JQcm9kdWN0SWQgPSBwcm9kdWN0SWQ7XG4gICAgICAgICAgICBkLnVuYmluZEFycml2ZShpbmplY3RQcmljZVVwZGF0ZSk7XG4gICAgICAgICAgICBiaW5kQXJyaXZlR3JvdXAoXCJBQlwiLCBcIi5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtcHJpY2Utcm93XCIsIHRydWUsIGluamVjdFByaWNlVXBkYXRlLCB1bmluamVjdFByaWNlVXBkYXRlLCBzaG93QWN0aW9uQmFyV2hlblJlYWR5LCBleGlzdGluZyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbG9hZDM2MFByb2R1Y3RDb2RlID0gZ2V0UHJvZHVjdENvZGVGcm9tQ3VycmVudFVybCgpO1xuICAgIGxvYWQzNjBQcm9kdWN0Q29kZSAmJiBzZXRUaW1lb3V0KHQgPT4gbG9hZDM2MChjdXJyZW50UGFnZSwgbG9hZDM2MFByb2R1Y3RDb2RlKSwgMjApO1xuICAgIC8vIGlmIChpbml0aWFsUHJvZHVjdElkKSB7XG4gICAgLy8gICBUcnkobGlzdGVuVG9BcnJpdmVQcm9kdWN0T3B0aW9ucywgdHJ1ZSk7XG4gICAgLy8gfVxuICAgIHRvZ2dsZVNob3czNjAoZmFsc2UpO1xuICAgICRkLmFkZENsYXNzKFwianN2LXN3aXBpbmdcIik7XG5cbiAgICBzd2l0Y2ggKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic2hvdy10YWItaW1hZ2VcIikpIHtcbiAgICAgICAgY2FzZSBcIjFcIjpcbiAgICAgICAgICAgICRkLmFsdGVyQ2xhc3MoXCJzaG93LXRhYippbWFnZVwiLCBcInNob3ctdGFiLXNtYWxsLWltYWdlXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCIyXCI6XG4gICAgICAgICAgICAkZC5hbHRlckNsYXNzKFwic2hvdy10YWIqaW1hZ2VcIiwgXCJzaG93LXRhYi1pbWFnZVwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgJGQuYWx0ZXJDbGFzcyhcInNob3ctdGFiKmltYWdlXCIsIFwic2hvdy10YWItZnVsbC1pbWFnZVwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBUcnkoZml4TWV0YU9uTW9iaWxlKTtcbiAgICBmdW5jdGlvbiB1cGRhdGVGb290ZXJIZWlnaHQoKSB7XG4gICAgICAgIHdpbmRvdy5zZXRGb290ZXJIZWlnaHQgPSBzZXRGb290ZXJIZWlnaHQ7XG4gICAgICAgIG9uRG9tUmVhZHkoZG9tRWxlbSA9PiB7XG4gICAgICAgICAgICB2YXIgYnJlYWRjcnVtYnNSZXNpemVPYnNlcnZlciA9IG51bGxcbiAgICAgICAgICAgICAgICAsIGZvb3Rlcl9fcm93T2JzZXJ2ZXIgPSBudWxsXG4gICAgICAgICAgICAgICAgLCBlY1BhZ2VyT2JzZXJ2ZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBkLmFycml2ZShcIi5lYy1icmVhZGNydW1ic1wiLCBub3RPbmNlT25seSwgZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGJyZWFkY3J1bWJzUmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWRjcnVtYnNSZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGUgPSAkKGVsZW0pLmNoaWxkcmVuKClcbiAgICAgICAgICAgICAgICAgICAgLCBsID0gZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZS5lYWNoKChpLCBlbCkgPT4gJChlbCkuY3NzKFwib3JkZXJcIiwgbCAtIGkpKTtcbiAgICAgICAgICAgICAgICBicmVhZGNydW1ic1Jlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKHQgPT4gc2V0VGltZW91dChzZXRGb290ZXJIZWlnaHQsIDApKTtcbiAgICAgICAgICAgICAgICBicmVhZGNydW1ic1Jlc2l6ZU9ic2VydmVyLm9ic2VydmUoZWxlbSk7XG4gICAgICAgICAgICAgICAgc2V0Rm9vdGVySGVpZ2h0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZWNQYWdlck9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKHQgPT4gc2V0VGltZW91dChzZXRGb290ZXJIZWlnaHQsIDApKTtcbiAgICAgICAgICAgIGQuYXJyaXZlKFwiLmVjLXBhZ2VyLCAuZWMtcGFnZS1idXR0b25zLCAuZWMtY2FydC5lYy1jYXJ0LS1lbXB0eSwgLmVjLXJlc2V0UGFzc3dvcmQtZm9ybSAuZWMtY2FydF9fY2hlY2tvdXQsIC5lYy1sb2dpbi1mb3JtIC5lYy1jYXJ0X19jaGVja291dCwgLnBhZ2UtdHlwZS1BQ0NPVU5ULVBBR0UgLmVjLWNhcnQtc3RlcC0tc2lnbm91dCAuZWMtY2FydC1zdGVwX193cmFwXCIsIG5vdE9uY2VPbmx5LCBlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBlbGVtLnBhcmVudE5vZGUubGVhdmUoZWxlbSwgcmVtb3ZlZEVsZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBlY1BhZ2VyT2JzZXJ2ZXIudW5vYnNlcnZlKHJlbW92ZWRFbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0Rm9vdGVySGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgZWNQYWdlck9ic2VydmVyLm9ic2VydmUoZWxlbSk7XG4gICAgICAgICAgICAgICAgc2V0Rm9vdGVySGVpZ2h0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZC5hcnJpdmUoXCIuZm9vdGVyX19saW5rLS1hbGwtcHJvZHVjdHNcIiwgbm90T25jZU9ubHksIGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbS5ocmVmID09IGxvY2F0aW9uLm9yaWdpbiArIGxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmdyaWQtc29ydF9faXRlbS0tZmlsdGVyXCIpPy5bMF0/LmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZC5hcnJpdmUoXCIuZWMtZm9vdGVyX19yb3dcIiwgb25jZU9ubHksIGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmb290ZXJfX3Jvd09ic2VydmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcl9fcm93T2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb290ZXJfX3Jvd09ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKHQgPT4gc2V0VGltZW91dChzZXRGb290ZXJIZWlnaHQsIDApKTtcbiAgICAgICAgICAgICAgICBmb290ZXJfX3Jvd09ic2VydmVyLm9ic2VydmUoZWxlbSk7XG4gICAgICAgICAgICAgICAgc2V0Rm9vdGVySGVpZ2h0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIHVwZGF0ZUZvb3RlckhlaWdodCgpO1xuICAgICRkLm9uKFwiY2xpY2tcIiwgXCIuZGV0YWlscy1wcm9kdWN0LXByaWNlLXdob2xlc2FsZV9fdGl0bGVcIiwgZSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2hvbGVzYWxlXCIsIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwid2hvbGVzYWxlXCIpID09IFwiMVwiID8gXCIwXCIgOiBcIjFcIik7XG4gICAgICAgIHVuZm9sZFdob2xlU2FsZSgpO1xuICAgIH1cbiAgICApO1xuICAgICRkLm9uKFwiY2xpY2tcIiwgXCIuZWMtYnJlYWRjcnVtYnNcIiwgYXN5bmMgZSA9PiB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pcyhcIi5lYy1icmVhZGNydW1ic1wiKSAmJiAkZC5pcyhcIi5wYWdlLXR5cGUtUFJPRFVDVFwiKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCgkKFwiLmVjLWJyZWFkY3J1bWJzXCIpLmF0dHIoXCJkYXRhLXNrdVwiKSArIFwiXFxuXCIgKyBsb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgICAgICAgICBhbGVydChcIlNLVSBjb3BpZWQgdG8gY2xpcGJvYXJkXCIpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsZWQgdG8gY29weSBTS1UgdG8gY2xpcGJvYXJkOiBcIiwgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICApO1xuICAgIGZ1bmN0aW9uIGludGVyY2VwdEZpbHRlcnNDaGFuZ2VkKHBhZ2UpIHsvL2Quc3RhcnRWaWV3VHJhbnNpdGlvbihfID0+ICRkLnRvZ2dsZUNsYXNzKFwic2JyXCIpKTtcbiAgICB9XG4gICAgVHJ5KGluamVjdFByb2R1Y3RPcHRpb25zVGFwQ2hhbmdlKTtcbiAgICBUcnkoc3BsaXROZWVkSGVscE1lbnUpO1xuICAgIHZhciBpc0ZpcnN0TG9hZCA9IHRydWVcbiAgICAgICAgLCBjYW5TaG93QWN0aW9uQmFyID0gdHJ1ZVxuICAgICAgICAsIGxhc3RGaWx0ZXIgPSBudWxsO1xuICAgIG9uUGFnZUxvYWRpbmcocGFnZSA9PiB7XG4gICAgICAgIGNhblNob3dBY3Rpb25CYXIgPSBmYWxzZTtcbiAgICAgICAgLy9kLnN0YXJ0Vmlld1RyYW5zaXRpb24oXyA9PiAkZC50b2dnbGVDbGFzcyhcInBhZ2UtbG9hZGluZ1wiLCB0cnVlKSk7XG4gICAgICAgIFRyeShpbnRlcmNlcHRGaWx0ZXJzQ2hhbmdlZCwgcGFnZSk7XG4gICAgfVxuICAgICk7XG4gICAgZnVuY3Rpb24gc2hvd0Zvb3RlcihoaWRlKSB7XG4gICAgICAgIGhpZGVTY3JlZW5Mb2FkaW5nKCk7XG4gICAgICAgICRkLnRvZ2dsZUNsYXNzKFwic2hvdy1mb290ZXJcIiwgaGlkZSA9PT0gdW5kZWZpbmVkIHx8ICEhaGlkZSkudG9nZ2xlQ2xhc3MoXCJoaWRlLWZvb3RlclwiLCBoaWRlICE9IHVuZGVmaW5lZCAmJiAhaGlkZSk7XG4gICAgICAgIHNldFRpbWVvdXQodCA9PiAkKFwiLmlucy10aWxlX19mb290ZXItd3JhcFwiKS5zaG93KCksIDEwMCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhpZGVGb290ZXIoKSB7XG4gICAgICAgIHNob3dGb290ZXIoZmFsc2UpO1xuICAgIH1cbiAgICB3LnNob3dGb290ZXIgPSBzaG93Rm9vdGVyO1xuICAgIHcuaGlkZUZvb3RlciA9IGhpZGVGb290ZXI7XG4gICAgZnVuY3Rpb24gY2FuU2hvd0FjdGlvbkJhck5vdygpIHtcbiAgICAgICAgaWYgKGNhblNob3dBY3Rpb25CYXIpIHtcbiAgICAgICAgICAgIHNob3dBY3Rpb25CYXIodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYW5TaG93QWN0aW9uQmFyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBhcHBseVNvcnRpbmdDc3NPcmRlckNoYW5nZXMoZ3JpZFByb2R1Y3RzKSB7XG4gICAgICAgIGdyaWRQcm9kdWN0cy5lYWNoKChpLCBlbGVtKSA9PiAoZWxlbSA9ICQoZWxlbSkpLmNzcyh7XG4gICAgICAgICAgICBcIi0tclwiOiBlbGVtLmNzcyhcIi0tcFwiKSxcbiAgICAgICAgICAgIFwiLS1wXCI6IFwiXCJcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzb3J0UHJvZHVjdHNCeU9yZGVyKHBhZ2UpIHtcbiAgICAgICAgaWYgKChwYWdlLnR5cGUgPT0gXCJTRUFSQ0hcIiB8fCBwYWdlLnR5cGUgPT0gXCJDQVRFR09SWVwiKSAmJiAhL14oLi5cXC8pP3Byb2R1Y3RzXFwvPyQvZ2kudGVzdChsb2NhdGlvbi5wYXRoKSAmJiAhJChcIi5lY3dpZC1wcm9kdWN0QnJvd3Nlci1DYXRlZ29yeVBhZ2UtMFwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRldGVjdENhdGVnb3J5SWRzKCk7XG4gICAgICAgICAgICBjb25zdCBvcmRlciA9ICQoXCIuZWMtcHJvZHVjdHMtc29ydFwiKS52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHNvcnRCeVJlbGV2YW5jZSA9IG9yZGVyID09IFwicmVsZXZhbmNlXCI7XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSBsb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgICAgICB2YXIgaGFzQ2hhbmdlc1RoYXRSZXF1aXJlVHJhbnNpdGlvbiA9IGxhc3RGaWx0ZXIgIT0gbnVsbCAmJiBsYXN0RmlsdGVyICE9IGZpbHRlcjtcbiAgICAgICAgICAgIGxhc3RGaWx0ZXIgPSBmaWx0ZXI7XG4gICAgICAgICAgICBjb25zdCBncmlkUHJvZHVjdHMgPSAkKFwiLmdyaWQtcHJvZHVjdFwiKS5lYWNoKChpLCBlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gZWxlbT8uY2xhc3NOYW1lPy5tYXRjaCgvZ3JpZC1wcm9kdWN0LS1pZC0oLio/KSggfCQpLylbMV07XG4gICAgICAgICAgICAgICAgY29uc3Qgb3JkZXJCeSA9IC1maWx0ZXJCeUNhdGVnb3J5SWRzW3Byb2R1Y3RJZF07XG4gICAgICAgICAgICAgICAgY29uc3Qgc29ydCA9IHNvcnRCeVJlbGV2YW5jZSA/IChvcmRlckJ5ID8gb3JkZXJCeSA6IFwiXCIpIDogMTAwIC0gaTtcblxuICAgICAgICAgICAgICAgIGVsZW0gPSAkKGVsZW0pO1xuICAgICAgICAgICAgICAgIC8vY29uc3QgZm9udFNpemUgPSBlbGVtLmZpbmQoXCIuZ3JpZC1wcm9kdWN0X19wcmljZS12YWx1ZVwiKS50ZXh0KCkubGVuZ3RoID4gOSA/IFwiOTUlXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgaWYgKCFoYXNDaGFuZ2VzVGhhdFJlcXVpcmVUcmFuc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc0NoYW5nZXNUaGF0UmVxdWlyZVRyYW5zaXRpb24gPSBlbGVtLmNzcyhcIi0tclwiKSAhPSBudWxsICYmIGVsZW0uY3NzKFwiLS1yXCIpICE9IHNvcnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsZW0uY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aWV3LXRyYW5zaXRpb24tbmFtZVwiOiBgcHJvZHVjdF9fJHtwcm9kdWN0SWR9YCxcbiAgICAgICAgICAgICAgICAgICAgXCItLXBcIjogc29ydFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vLCBcIi0tZlwiOiBmb250U2l6ZX0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByaWNlID0gZWxlbS5maW5kKFwiLmdyaWQtcHJvZHVjdF9fcHJpY2UtdmFsdWVcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpY2VUZXh0ID0gcHJpY2UudGV4dCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzWmVybyA9ICEvWzEtOV0vLnRlc3QocHJpY2VUZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAoaXNaZXJvIHx8IHByaWNlLmhhc0NsYXNzKFwiemVyby1wcmljZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBwcmljZS50b2dnbGVDbGFzcyhcInplcm8tcHJpY2VcIiwgaXNaZXJvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoJHcud2lkdGgoKSA+IDQ5MyAmJiBoYXNDaGFuZ2VzVGhhdFJlcXVpcmVUcmFuc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHJhbnNpdGlvbiA9IGQuc3RhcnRWaWV3VHJhbnNpdGlvbihfID0+IGFwcGx5U29ydGluZ0Nzc09yZGVyQ2hhbmdlcyhncmlkUHJvZHVjdHMpKTtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLmZpbmlzaGVkLnRoZW4oY2FuU2hvd0FjdGlvbkJhck5vdyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFwcGx5U29ydGluZ0Nzc09yZGVyQ2hhbmdlcyhncmlkUHJvZHVjdHMpO1xuICAgICAgICAgICAgICAgIGNhblNob3dBY3Rpb25CYXJOb3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uRG9tUmVhZHkoZG9tUmVhZHlFbGVtID0+IHtcbiAgICAgICAgICAgICAgICAkZC5hcnJpdmUoXCIuZ3JpZF9fY2F0ZWdvcmllcy0tYWR2YW5jZWRcIiwgb25jZU9ubHksIGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IGlzSW5WaWV3KGVsZW0sIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FuU2hvd0FjdGlvbkJhck5vdygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNjcm9sbEdyaWRfX1Byb2R1Y3RzSW50b1ZpZXcoc2hvdWxkU29ydE9uTG9hZCkge1xuICAgICAgICBzY3JvbGxUb1Byb2R1Y3RzR3JpZCA9ICEhc2hvdWxkU29ydE9uTG9hZDtcbiAgICAgICAgJChcIi5ncmlkX19wcm9kdWN0c1wiKVswXT8uc2Nyb2xsSW50b1ZpZXcoc21vb3RoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc29ydFByb2R1Y3RzQnlPcmRlcldoZW5FbGVtQXJyaXZlZChlbGVtKSB7XG4gICAgICAgIHNvcnRQcm9kdWN0c0J5T3JkZXIocGFnZSk7XG4gICAgICAgIGlmIChzY3JvbGxUb1Byb2R1Y3RzR3JpZCkge1xuICAgICAgICAgICAgc2Nyb2xsR3JpZF9fUHJvZHVjdHNJbnRvVmlldygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrU29ydFByb2R1Y3RzKHBhZ2UpIHtcbiAgICAgICAgaWYgKHBhZ2UudHlwZSA9PSBcIlNFQVJDSFwiIHx8IHBhZ2UudHlwZSA9PSBcIkNBVEVHT1JZXCIpIHtcbiAgICAgICAgICAgICRkLmFycml2ZShcIi5maWx0ZXJzLXN0aWNreS1iYXIgLmZvcm0tY29udHJvbF9fYnV0dG9uXCIsIG9uY2VPbmx5LCBlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWVsZW0uZmlsdGVyc1Njcm9sbENsaWNrQm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5maWx0ZXJzU2Nyb2xsQ2xpY2tCb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsR3JpZF9fUHJvZHVjdHNJbnRvVmlldyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgZ3JpZF9fcHJvZHVjdHMgPSAkKFwiLmdyaWRfX3Byb2R1Y3RzXCIpO1xuICAgICAgICAgICAgaWYgKGdyaWRfX3Byb2R1Y3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHNvcnRQcm9kdWN0c0J5T3JkZXJXaGVuRWxlbUFycml2ZWQoZ3JpZF9fcHJvZHVjdHNbMF0sIHBhZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZC5hcnJpdmUoXCIuZ3JpZF9fcHJvZHVjdHNcIiwgb25jZU9ubHksIGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBzb3J0UHJvZHVjdHNCeU9yZGVyV2hlbkVsZW1BcnJpdmVkKGVsZW0sIHBhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNhblNob3dBY3Rpb25CYXIpIHtcbiAgICAgICAgICAgICAgICBzaG93QWN0aW9uQmFyKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYW5TaG93QWN0aW9uQmFyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBpbmplY3RQcm9kdWN0RGV0YWlsc1RpdGxlKHBhZ2UpIHtcbiAgICAgICAgaWYgKHBhZ2UudHlwZSA9PSBcIlBST0RVQ1RcIikge1xuICAgICAgICAgICAgJGQuYXJyaXZlKFwiLmRldGFpbHMtZ2FsbGVyeV9faW1hZ2VzLXpvb21cIiwgb25jZU9ubHksIGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgICQoZWxlbSkuY2xhc3NDaGFuZ2UoZWxlbSA9PiAkZC50b2dnbGVDbGFzcyhcImpzdi1waG90by1zY2FsZWRcIiwgJChlbGVtKS5pcyhcIi5kZXRhaWxzLWdhbGxlcnlfX2ltYWdlLXpvb20tdmlzaWJsZVwiKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICRkLmFycml2ZShcIi5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtZGVzY3JpcHRpb25cIiwgb25jZU9ubHksIGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhbmcgPSAvXihcXC8uLikoXFwvLiokfCQpL2kuZXhlYyhsb2NhdGlvbi5wYXRobmFtZSk/LlsxXSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgICQoZWxlbSkuZmluZChcImFcIikuZWFjaCgoaSwgYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhID0gJChhKTtcbiAgICAgICAgICAgICAgICAgICAgYS5hdHRyKFwiaHJlZlwiLCBhLmF0dHIoXCJocmVmXCIpLnJlcGxhY2UoL15cXC8oREFURS1CTXgxKSQvZ2ksIFwiL0RBVEUtQk14MS1TVVBFUlwiKS5yZXBsYWNlKC9eXFwvKERBVEUtKS9naSwgYCR7bGFuZ30vcHJvZHVjdHMvJDFgKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy8gJGQuYXJyaXZlKFwiLnByb2R1Y3QtZGV0YWlsc1wiLCBvbmNlT25seSwgZWxlbSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgY29uc3Qgd3JhcHBlciA9ICQoYDxkaXYgY2xhc3M9XCJleHRyYS1pbWFnZXMgZXh0cmEtaW1nXCIvPmApO1xuICAgICAgICAgICAgLy8gICAgICQoXCIucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LWRlc2NyaXB0aW9uIGRpdi5uby10cmFuc2xhdGUsIC5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtZGVzY3JpcHRpb24gZGl2Lm5vdHJhbnNsYXRlXCIpLndyYXBBbGwod3JhcHBlcik7XG4gICAgICAgICAgICAvLyAgICAgY29uc3QgZnVsbEV4dHJhSW1hZ2VzID0gJChgPGRpdiBjbGFzcz1cImZ1bGwtZXh0cmEtaW1hZ2VzXCIvPmApO1xuICAgICAgICAgICAgLy8gICAgIGZ1bGxFeHRyYUltYWdlcy5hcHBlbmQoJChcIi5leHRyYS1pbWFnZXNcIikuaHRtbCgpKS5pbnNlcnRBZnRlcihlbGVtKTtcbiAgICAgICAgICAgIC8vICAgICBjb25zdCBzZWNvbmRhcnlfX2Rlc2NyaXB0aW9uID0gJCgkKGVsZW0pLmZpbmQoXCIucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LWRlc2NyaXB0aW9uXCIpLmh0bWwoKSk7XG4gICAgICAgICAgICAvLyAgICAgY29uc3QgY2xhc3NlcyA9IHNlY29uZGFyeV9fZGVzY3JpcHRpb24uZmluZChcIi5leHRyYS1pbWFnZXNcIikuYXR0cihcImNsYXNzXCIpO1xuICAgICAgICAgICAgLy8gICAgIHNlY29uZGFyeV9fZGVzY3JpcHRpb24uZmluZChcIi5leHRyYS1pbWFnZXMsZGl2Lm5vLXRyYW5zbGF0ZSxkaXYubm90cmFuc2xhdGVcIikucmVtb3ZlKCk7XG4gICAgICAgICAgICAvLyAgICAgJChgPGRpdiBjbGFzcz1cInNlY29uZGFyeV9fZGVzY3JpcHRpb25cIj48L2Rpdj5gKS5odG1sKHNlY29uZGFyeV9fZGVzY3JpcHRpb24pLmluc2VydEFmdGVyKGVsZW0pO1xuICAgICAgICAgICAgLy8gICAgICQoZWxlbSkuZmluZChcIi5leHRyYS1pbWFnZXMgPiAqID4gKlwiKS5lYWNoKChpLCBlKSA9PiAkKGUpLmNzcyhcIm9yZGVyXCIsIC1pKSk7XG4gICAgICAgICAgICAvLyAgICAgZnVsbEV4dHJhSW1hZ2VzLmFkZENsYXNzKGNsYXNzZXMpLnJlbW92ZUNsYXNzKFwiZXh0cmEtc2VjdGlvbiBwZGwtY29udGVudCBleHRyYS1pbWFnZXNcIik7XG5cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vICk7IFxuICAgICAgICAgICAgLy8gJGQuYXJyaXZlKFwiLnByb2R1Y3QtZGV0YWlsc19fc2lkZWJhclwiLCBvbmNlT25seSwgZWxlbSA9PiB7XG4gICAgICAgICAgICAvLyAgICQoZWxlbSkuYXR0cihcImRhdGEtc3VidGl0bGVcIiwgJChcIi5wcm9kdWN0LWRldGFpbHMtbW9kdWxlLnByb2R1Y3QtZGV0YWlsc19fc3VidGl0bGU6Zmlyc3RcIikudGV4dCgpKTtcbiAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICAkZC5hcnJpdmUoXCIucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LWRlc2NyaXB0aW9uXCIsIG9uY2VPbmx5LCBlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBoMyA9ICQoXCIucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXRpdGxlLmVjLWhlYWRlci1oMzpmaXJzdFwiKVxuICAgICAgICAgICAgICAgICAgICAsIHRleHQgPSBoMy50ZXh0KClcbiAgICAgICAgICAgICAgICAgICAgLCBwcm9kdWN0RGV0YWlsc19fc2lkZWJhciA9ICQoXCIucHJvZHVjdC1kZXRhaWxzX19zaWRlYmFyXCIpWzBdXG4gICAgICAgICAgICAgICAgICAgICwgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoc2V0Rm9vdGVySGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGgzWzBdKTtcbiAgICAgICAgICAgICAgICBwcm9kdWN0RGV0YWlsc19fc2lkZWJhciAmJiBvYnNlcnZlci5vYnNlcnZlKHByb2R1Y3REZXRhaWxzX19zaWRlYmFyKTtcbiAgICAgICAgICAgICAgICBlbGVtID0gJChlbGVtKTtcbiAgICAgICAgICAgICAgICAkZC5hcnJpdmUoXCIucHJvZHVjdC1kZXRhaWxzX19nYWxsZXJ5XCIsIG9uY2VPbmx5LCBlbGVtID0+ICQoZWxlbSkuYXR0cihcImRhdGEtdGl0bGVcIiwgdGV4dCkpO1xuICAgICAgICAgICAgICAgIGVsZW0uYXR0cihcImRhdGEtdGl0bGVcIiwgdGV4dCk7XG4gICAgICAgICAgICAgICAgZWxlbS5hdHRyKFwiZGF0YS1zdWJ0aXRsZVwiLCAkKFwiLnByb2R1Y3QtZGV0YWlscy1tb2R1bGUucHJvZHVjdC1kZXRhaWxzX19zdWJ0aXRsZTpmaXJzdFwiKS50ZXh0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICRkLmFycml2ZSgnLnByb2R1Y3QtZGV0YWlscy0tbGF5b3V0LXNpZGViYXItcmlnaHQnLCBvbmNlT25seSwgZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgaW5qZWN0UHJvZHVjdERldGFpbHNUYWJzKGVsZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBib25kQWRkVG9DYXJ0Q29udHJvbHMgPSBpbmplY3RCdXR0b25zKGN1cnJlbnRQYWdlLCBzaG93QWN0aW9uQmFyLCBib25kQWRkVG9DYXJ0Q29udHJvbHMsIGJpbmRBZGRUb0NhcnRDb250cm9scyk7XG4gICAgdmFyIHNjcm9sbFRvUHJvZHVjdHNHcmlkID0gZmFsc2U7XG4gICAgb25QYWdlTG9hZGVkKHBhZ2UgPT4ge1xuICAgICAgICAkKFwiLmVjLXN0b3JlXCIpLnRvZ2dsZUNsYXNzKFwibG9hZFwiLCB0cnVlKTtcbiAgICAgICAgc2V0VGltZW91dCh0ID0+ICQoXCIuZWMtc3RvcmVcIikudG9nZ2xlQ2xhc3MoXCJsb2FkZWRcIiwgdHJ1ZSkudG9nZ2xlQ2xhc3MoXCJsb2FkXCIsIGZhbHNlKSwgMSk7XG4gICAgICAgICQoXCIuZWMtc3RvcmVmcm9udC12My10b3Atc2Nyb2xsZXIsIC5lYy1zdG9yZVwiKVswXT8uc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgZHgyOiB0cnVlLFxuICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcbiAgICAgICAgfSk7XG4gICAgICAgIFRyeShjaGVja1NvcnRQcm9kdWN0cywgcGFnZSk7XG4gICAgICAgIGlmICghaXNGaXJzdExvYWQpIHtcbiAgICAgICAgICAgIGQuYXJyaXZlKFwiLmVjLWJyZWFkY3J1bWJzXCIsIG9uY2VPbmx5LCBzZXRGb290ZXJIZWlnaHQpO1xuICAgICAgICAgICAgVHJ5KGluamVjdENhcnRDbGlja09uSXRlbUZpeFByb2R1Y3RPcHRpb25zLCBwYWdlKTtcbiAgICAgICAgICAgIGJvbmRBZGRUb0NhcnRDb250cm9scyA9IGluamVjdEJ1dHRvbnMoY3VycmVudFBhZ2UsIHNob3dBY3Rpb25CYXIsIGJvbmRBZGRUb0NhcnRDb250cm9scywgYmluZEFkZFRvQ2FydENvbnRyb2xzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlzRmlyc3RMb2FkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaW5qZWN0RmFzdExvYWRpbmdDc3MocGFnZSk7XG5cbiAgICAgICAgVHJ5KGZpeExvZ2luQnV0dG9ucywgcGFnZSk7XG4gICAgICAgIFRyeShVcGRhdGVDdXJyZW50UHJvZHVjdENsYXNzZXMsIHBhZ2UpO1xuICAgICAgICBUcnkoaW5qZWN0UHJvZHVjdERldGFpbHNUaXRsZSwgcGFnZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibG9hZGVkXCIsIHBhZ2UudHJpZXMsICQoJy5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3Qtb3B0aW9ucycpLmxlbmd0aCk7XG4gICAgICAgIFRyeShpbmplY3RNZXRlb3JzLCBwYWdlKTtcbiAgICAgICAgLy9zZXRUaW1lb3V0KHQ9PiBUcnkoaW5qZWN0VmlkZW9PbkhvbWVQYWdlLCBwYWdlKSwgMTAwMCk7XG4gICAgICAgIC8vVHJ5KGluamVjdFZpZGVvT25Ib21lUGFnZSwgcGFnZSk7XG4gICAgICAgIFRyeShpbmplY3RSZXZpZXdzLCBwYWdlKTtcbiAgICAgICAgVHJ5KGluamVjdExlZ2FsTGlua3NLZWVwTGFuZ3VhZ2UsIHBhZ2UpO1xuICAgICAgICBUcnkoaW5qZWN0UGFydG5lckxpbmtzT25Ib21lUGFnZSwgcGFnZSk7XG4gICAgICAgIFRyeShpbmplY3RDbGlja2luZ09uTWVudUJ1dHRvbiwgcGFnZSk7XG4gICAgICAgIFRyeShpbmplY3RMYW5ndWFnZXNNZW51T25EZXNrdG9wLCBwYWdlKTtcbiAgICAgICAgVHJ5KHRyaW1Db2xvbkluQ2FydCwgcGFnZSk7XG4gICAgICAgIFRyeShkZXRlY3RPcmRlck51bWJlciwgcGFnZSk7XG4gICAgICAgIFRyeShkZXRlY3RQb3JkdWN0T3B0aW9uc1RleHRWYWx1ZXMsIHBhZ2UpO1xuXG4gICAgICAgIFRyeShhZGp1c3RGb290ZXJBY3Rpb25CYXJIZWlnaHQsIHBhZ2UpO1xuICAgICAgICBUcnkoZml4TWV0YU9uTW9iaWxlLCBwYWdlKTtcbiAgICAgICAgVHJ5KGluamVjdERldGVjdFByb2R1Y3RPcHRpb25zSW5WaWV3LCBwYWdlKTtcbiAgICAgICAgVHJ5KGluamVjdERldGVjdFByb2R1Y3REZXRhaWxzSW5WaWV3LCBwYWdlKTtcbiAgICAgICAgLy8vVHJ5KGRldGVybWluZVByb2R1Y3REZXRhaWxzTGFyZ2VPcHRpb25zLCBwYWdlKTtcbiAgICAgICAgVHJ5KGluamVjdFpvb20zNjBGdWxsU2NyZWVuLCBwYWdlKTtcbiAgICAgICAgY29uc3QgZmF2ID0gJChcIi5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtbGlrZS5mYXZvcml0ZS1wcm9kdWN0IC5mYXZvcml0ZS1wcm9kdWN0X190aXRsZVwiKTtcbiAgICAgICAgaWYgKGZhdlswXSAmJiAhZmF2WzBdLmJvdW5kKSB7XG4gICAgICAgICAgICBmYXZbMF0uYm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgZmF2Lm9uKFwiY2xpY2tcIiwgZSA9PiAkKFwiLnByb2R1Y3QtZGV0YWlsc19fcHJvZHVjdC1saWtlIC5mb3JtLWNvbnRyb2wtLWJ1dHRvbjp2aXNpYmxlXCIpWzBdPy5jbGljaygpKTtcbiAgICAgICAgfVxuICAgICAgICBUcnkoaW5qZWN0TXV0YXRpb25PYnNlcnZlciwgJChcIi5wcm9kdWN0LWRldGFpbHNfX3Byb2R1Y3QtbGlrZVwiKSwgRmF2b3VyaXRlUHJvZHVjdENoYW5nZWQpO1xuICAgICAgICBUcnkoaW5qZWN0TXV0YXRpb25PYnNlcnZlciwgJChcIiNlY3dpZC1wc3dwLXRlbXBsYXRlXCIpLCBQV1NQRGlhbG9nQ2xhc3NDaGFuZ2VkKTtcblxuICAgICAgICBUcnkoaW50ZXJjZXB0Q2F0ZWdvcnlQYWdlLCBwYWdlKTtcbiAgICAgICAgLy9UcnkoZml4V2hhdHNBcHBUYXJnZXRCbGFuaywgcGFnZSk7XG4gICAgICAgIFRyeShpbnRlcmNlcHRBZGRyZXNzUGFnZSwgcGFnZSk7XG4gICAgICAgIFRyeShpbmplY3Rab29tT25Qcm9kdWN0RGVzY3JpcHRpb25JbWFnZXMsIHBhZ2UpO1xuICAgICAgICBUcnkoaW5qZWN0QWRkaXRpb25hbENTU1doZW5OZWVkZWQsIHBhZ2UpO1xuICAgICAgICBUcnkoc2V0UmltVGFwZUNvbG9yRmlsdGVyVmlzaWJpbGl0eSwgcGFnZSk7XG5cbiAgICAgICAgVHJ5KG1hcmtPdXRPZlN0b2NrUHJvZHVjdE9wdGlvbnMsIHBhZ2UpO1xuICAgICAgICAvL1RyeShpbmplY3RQcm9kdWN0QnJlYWRDcnVtYiwgcGFnZSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmID0+IHtcbiAgICAgICAgICAgIHJlbW92ZU1hZGVXaXRoKCk7XG4gICAgICAgICAgICBpZiAocGFnZS50eXBlID09PSBcIlBST0RVQ1RcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWQzNjBQcm9kdWN0Q29kZSA9IGdldFByb2R1Y3RDb2RlRnJvbUN1cnJlbnRVcmwoKTtcbiAgICAgICAgICAgICAgICAvL2xvYWQzNjBQcm9kdWN0Q29kZSAmJiBsb2FkMzYwKGxvYWQzNjBQcm9kdWN0Q29kZSk7XG4gICAgICAgICAgICAgICAgVHJ5KGZpeFByb2R1Y3RXZWlnaHQsIHBhZ2UpO1xuICAgICAgICAgICAgICAgIFRyeShpbmplY3QzNjAsIGxvYWQzNjBQcm9kdWN0Q29kZSwgcGFnZSk7XG4gICAgICAgICAgICB9IGVsc2Ugey8vVHJ5KGNhbGN1bGF0ZVRvdGFsLCBwYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgICAgLCAxKTtcblxuICAgICAgICBUcnkoaW5qZWN0QWRkVG9DYXJ0SWNvbiwgcGFnZSk7XG4gICAgICAgIFRyeShjYXRlZ29yeVBhZ2VJbml0LCBwYWdlKTtcbiAgICB9XG4gICAgKTtcbiAgICBpZiAoaXNDYXJ0U3VtbWFyeVBhZ2UoY3VycmVudFBhZ2UpKSB7XG4gICAgICAgIGlmIChpc09yZGVyQ29uZmlybWF0aW9uUGFnZShjdXJyZW50UGFnZSkpIHtcbiAgICAgICAgICAgIGQuYXJyaXZlKFwiLmVjLXN0b3JlX19hY2NvdW50LXBhZ2UsIC5lYy1jb25maXJtYXRpb25fX251bWJlclwiLCBvbmNlT25seSwgZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9ICgkKGUpLmlzKFwiLmVjLWNvbmZpcm1hdGlvbl9fbnVtYmVyXCIpICYmICQoZSkudGV4dCgpKSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZlbmRvck9yZGVyTnVtYmVyID0gdGV4dC5tYXRjaCgvI0BEQVRFeDItKC4qKS9pKT8uWzFdO1xuICAgICAgICAgICAgICAgIFRyeShpbmplY3RDYXJ0Q2xpY2tPbkl0ZW1GaXhQcm9kdWN0T3B0aW9ucywge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBjdXJyZW50UGFnZS50eXBlLFxuICAgICAgICAgICAgICAgICAgICB2ZW5kb3JPcmRlck51bWJlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFRyeShpbmplY3RDYXJ0Q2xpY2tPbkl0ZW1GaXhQcm9kdWN0T3B0aW9ucywgY3VycmVudFBhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uUGFnZUxvYWRpbmcocGFnZSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoZiA9PiB7XG4gICAgICAgICAgICByZW1vdmVNYWRlV2l0aCgpO1xuICAgICAgICAgICAgLy8gaWYgKHBhZ2UudHlwZSA9PT0gXCJQUk9EVUNUXCIpIHtcbiAgICAgICAgICAgIC8vICAgY29uc3QgbG9hZDM2MFByb2R1Y3RDb2RlID0gZ2V0UHJvZHVjdENvZGVGcm9tQ3VycmVudFVybCgpO1xuICAgICAgICAgICAgLy8gICAvL2xvYWQzNjBQcm9kdWN0Q29kZSAmJiBsb2FkMzYwKGxvYWQzNjBQcm9kdWN0Q29kZSk7XG4gICAgICAgICAgICAvLyAgIC8vVHJ5KGZpeFByb2R1Y3RXZWlnaHQsIHBhZ2UpO1xuICAgICAgICAgICAgLy8gICBUcnkoaW5qZWN0MzYwLCBsb2FkMzYwUHJvZHVjdENvZGUsIHBhZ2UpO1xuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgLy9UcnkoY2FsY3VsYXRlVG90YWwsIHBhZ2UpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgICAgICAgICAsIDEpO1xuICAgIH1cbiAgICApO1xufVxuKSgpO1xuXG5mdW5jdGlvbiB1cGRhdGVDb21ib1Byb2R1Y3RCYWNrZ3JvdW5kT3ZlcmxheShwKSB7XG4gICAgbGV0IGZvbGRlciA9IFwiXCIsIGIgPSBcIlwiLCBpc1RpcmU7XG4gICAgY29uc3QgcHJvZHVjdCA9IHA7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgL1x1RDgzNVx1REZEMCBcdUQ4MzVcdURDMzEgXHVEODM1XHVEQzE1XHVEODM1XHVEQzA0XHVEODM1XHVEQzA0XHVEODM1XHVEQzMxLy50ZXN0KHByb2R1Y3Quc2t1KTpcbiAgICAgICAgY2FzZSAvXHVEODM1XHVEQzE1XHVEODM1XHVEQzA0XHVEODM1XHVEQzA0XHVEODM1XHVEQzMxLy50ZXN0KHByb2R1Y3Quc2t1KTpcbiAgICAgICAgICAgIGZvbGRlciA9IFwiVkVFVGlyZXNcIjtcbiAgICAgICAgICAgIGlzVGlyZSA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAvXHVEODM1XHVEQzAwXHVEODM1XHVEQzA4XHVEODM1XHVEQzExXHVEODM1XHVEQzA1XHVEODM1XHVEQzMxLy50ZXN0KHByb2R1Y3Quc2t1KTpcbiAgICAgICAgICAgIGZvbGRlciA9IFwiQUlSRngvXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAvXHVEODM1XHVEQzAxXHVEODM1XHVEQzBDXHVEODM1XHVEQzMxXHVEODM1XHVERkNGLy50ZXN0KHByb2R1Y3Quc2t1KTpcbiAgICAgICAgICAgIGZvbGRlciA9IFwiQk14L1wiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgL1x1RDgzNVx1REMxMVx1RDgzNVx1REMwOFx1RDgzNVx1REMwQ1x1RDgzNVx1REMxM1x1RDgzNVx1REMwMFx1RDgzNVx1REMwRlx1RDgzNVx1REMwNFx1RDgzNVx1REMzMVx1RDgzNVx1REZEMC9pLnRlc3QocHJvZHVjdC5za3UpOlxuICAgICAgICAgICAgZm9sZGVyID0gXCJSSU1UQVBFeFwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgL1x1RDgzNVx1REMxMlx1RDgzNVx1REMwQlx1RDgzNVx1REMwOFx1RDgzNVx1REMwQ1x1RDgzNVx1REMwNFx1RDgzNVx1REMzMS9pLnRlc3QocHJvZHVjdC5za3UpOlxuICAgICAgICAgICAgZm9sZGVyID0gXCJTTElNRXhcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIC9cdUQ4MzVcdURDMTNcdUQ4MzVcdURDMDBcdUQ4MzVcdURDMERcdUQ4MzVcdURDMERcdUQ4MzVcdURDMTRcdUQ4MzVcdURDMTJcdUQ4MzVcdURDMzEvaS50ZXN0KHByb2R1Y3Quc2t1KTpcbiAgICAgICAgICAgIGZvbGRlciA9IFwiVEFOTlVTeFwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgL1x1RDgzNVx1REMxNy1cdUQ4MzVcdURDMTNcdUQ4MzVcdURDMDRcdUQ4MzVcdURDMENcdUQ4MzVcdURDMTJcdUQ4MzVcdURDMzFcdUQ4MzVcdURGQ0YtXHVEODM1XHVEQzBCXHVEODM1XHVEQzBFXHVEODM1XHVEQzAwXHVEODM1XHVEQzAzXHVEODM1XHVEQzA0XHVEODM1XHVEQzExLy50ZXN0KHByb2R1Y3Quc2t1KTpcbiAgICAgICAgICAgIGZvbGRlciA9IFwiWC1URU1TeDEtTE9BREVSUy1zbWFsbC9cIjtcbiAgICAgICAgICAgIGIgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgL15cdUQ4MzVcdURDMDNcdUQ4MzVcdURDMDBcdUQ4MzVcdURDMTNcdUQ4MzVcdURDMDQgXHVEODM1XHVEQzE3LVx1RDgzNVx1REMxM1x1RDgzNVx1REMwNFx1RDgzNVx1REMwQ1x1RDgzNVx1REMxMlx1RDgzNVx1REMzMVx1RDgzNVx1REZDRi1cdUQ4MzVcdURDMDVcdUQ4MzVcdURDMEVcdUQ4MzVcdURDMEJcdUQ4MzVcdURDMDNcdUQ4MzVcdURDMzFcdUQ4MzVcdURGQ0YkL2dpLnRlc3QocHJvZHVjdC5za3UpOlxuICAgICAgICAgICAgZm9sZGVyID0gXCJYLVRFTVN4MS1GT0xEeDEtb25seS1zbWFsbC9cIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIC9cdUQ4MzVcdURDMTctXHVEODM1XHVEQzEzXHVEODM1XHVEQzA0XHVEODM1XHVEQzBDXHVEODM1XHVEQzEyXHVEODM1XHVEQzMxXHVEODM1XHVERkNGLVx1RDgzNVx1REMwNVx1RDgzNVx1REMwRVx1RDgzNVx1REMwQlx1RDgzNVx1REMwM1x1RDgzNVx1REMzMVx1RDgzNVx1REZDRi8udGVzdChwcm9kdWN0LnNrdSk6XG4gICAgICAgICAgICBmb2xkZXIgPSBcIlgtVEVNU3gxLUZPTER4MS1zbWFsbC9cIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIC9eXHVEODM1XHVEQzAzXHVEODM1XHVEQzAwXHVEODM1XHVEQzEzXHVEODM1XHVEQzA0IFx1RDgzNVx1REMxNFx1RDgzNVx1REMwRFx1RDgzNVx1REMwRVx1RDgzNVx1REMzMVx1RDgzNVx1REZDRiQvLnRlc3QocHJvZHVjdC5za3UpOlxuICAgICAgICAgICAgZm9sZGVyID0gXCJVTk94MS9cIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB2YXIgcHJvZHVjdFNLVSA9IFwiXCI7XG4gICAgdmFyIHNrdSA9ICQoXCIuZm9ybS1jb250cm9sX19yYWRpbzpjaGVja2VkXCIpLnRvQXJyYXkoKS5tYXAoYyA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9ICQoYykucGFyZW50KClcbiAgICAgICAgICAgICwgbGlua2VkSWQgPSBwYXJlbnQuYXR0cihcImRhdGEtcmVuZGVyLXByb2R1Y3RcIikgfHwgcGFyZW50LmF0dHIoXCJkYXRhLWxpbmtlZC1wcm9kdWN0XCIpXG4gICAgICAgICAgICAsIGxwID0gZWxlbWVudHNNZXRhZGF0YS5nZXQocGFyZW50WzBdKVxuICAgICAgICAgICAgLCBpc1RpcmVVbml0VHlwZSA9IGlzVGlyZSAmJiBwYXJlbnQuaXMoXCIub2ctVU5JVC1UWVBFXCIpXG4gICAgICAgICAgICAsIGlzMnhWRUVVbml0VHlwZSA9IGlzVGlyZVVuaXRUeXBlICYmIHBhcmVudC5pcyhcIi5vLVVOSVQtVFlQRS14MlwiKVxuICAgICAgICAgICAgLCBpc1RpcmVNb2RlbCA9IGlzVGlyZSAmJiBwYXJlbnQuaXMoXCIub2ctVElSRS1NT0RFTFwiKVxuICAgICAgICAgICAgLCBwcmVmaXggPSBpczJ4VkVFVW5pdFR5cGUgPyBcIjJ4XCIgOiBcIlwiXG4gICAgICAgICAgICAsIGRhdGFTS1UgPSAodW5ib2xkKHBhcmVudC5hdHRyKFwiZGF0YS1za3VcIikpIHx8IFwiXCIpLnJlcGxhY2UoL14oREFURXxcdUQ4MzVcdURDMDNcdUQ4MzVcdURDMDBcdUQ4MzVcdURDMTNcdUQ4MzVcdURDMDQpIC8sIFwiXCIpLnJlcGxhY2UoLyhcXC0oUkVEfEdSRUVOfEdPTER8QkxBQ0spKSQvaSwgaXNUaXJlVW5pdFR5cGUgfHwgaXNUaXJlVW5pdFR5cGUgPyBcIlwiIDogXCIkMVwiKVxuICAgICAgICAgICAgLCBza3UgPSBwcmVmaXggKyBkYXRhU0tVLnJlcGxhY2UoLyhcXC0oUkVEfEdPTER8QkxBQ0t8R1JFRU4pKSQvZ2ksIGlzVGlyZU1vZGVsID8gXCJcIiA6IFwiJDFcIilcbiAgICAgICAgICAgICwgcmVzdWx0ID0gaXNUaXJlTW9kZWwgPyBcIlwiIDogbGlua2VkSWQgPT0gcC5pZCAmJiAhaXNUaXJlVW5pdFR5cGUgPyAocHJvZHVjdFNLVSA9IHNrdSkgJiYgbnVsbCA6IHNrdSB8fCB1bmJvbGQoa25vd25Qcm9kdWN0U2x1Z3NbbGlua2VkSWRdPy5za3UpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIC8vcmV0dXJuIHBhcmVudC5hdHRyKFwiZGF0YS1za3VcIik7XG4gICAgfVxuICAgICkuZmlsdGVyKHMgPT4gcykubWFwKHMgPT4gcz8ucmVwbGFjZSgvXihEQVRFfFx1RDgzNVx1REMwM1x1RDgzNVx1REMwMFx1RDgzNVx1REMxM1x1RDgzNVx1REMwNCkgLywgXCJcIikpO1xuXG4gICAgY29uc3QgZnVsbFNLVSA9IFtwcm9kdWN0U0tVLCAuLi5za3VdLmZpbHRlcihzID0+IHMpLnNvcnQoKS5qb2luKFwiLlwiKS8vLnJlcGxhY2UoLyhWRUV4MS1aSUctWkFHLiopXFwuVkVFeDEtWklHLVpBRyhcXC1SRUR8LUJMQUNLfC1HT0xEfC1HUkVFTik/L2ksIFwiJDFcIilcbiAgICAgICAgLy8ucmVwbGFjZSgvKFZFRXgyLU1JU1NJT04tQ09NTUFORC1UQU4uKilcXC5WRUV4Mi1NSVNTSU9OLUNPTU1BTkQtVEFOKFxcLVJFRHwtQkxBQ0t8LUdPTER8LUdSRUVOKT8vaSwgXCIkMVwiKVxuICAgICAgICAvLy5yZXBsYWNlKC8oVkVFeDMtU1BFRURTVEVSLVdISVRFLiopXFwuVkVFeDMtU1BFRURTVEVSLVdISVRFKFxcLVJFRHwtQkxBQ0t8LUdPTER8LUdSRUVOKT8vaSwgXCIkMVwiKVxuICAgICAgICAvLy5yZXBsYWNlKC8oVkVFeDQtU1BFRURTVEVSLVRBTk5VUy1BUk1PVVIuKilcXC5WRUV4NC1TUEVFRFNURVItVEFOTlVTLUFSTU9VUihcXC1SRUR8LUJMQUNLfC1HT0xEfC1HUkVFTik/L2ksIFwiJDFcIilcbiAgICAgICAgLnJlcGxhY2UoL1gtVEVNU3gxLUZPTER4MVxcLlgtVEVNU3gxLUxPQURFUi0vZ2ksIFwiWC1URU1TeDEtRk9MRHgxLVwiKTtcbiAgICAkZC50b2dnbGVDbGFzcyhcImJnLW92ZXJsYXktMzYwXCIsICEhZnVsbFNLVSk7XG4gICAgLy9pZiAoYikge1xuICAgIC8vICBza3UgPSBmdWxsU0tVO1xuICAgIC8vICBwcm9kdWN0U0tVID0gbnVsbDtcbiAgICAvLyB9XG4gICAgbGV0IGltZ1VybCA9IFwiXCI7XG4gICAgaWYgKGZvbGRlciAmJiBmdWxsU0tVKSB7XG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSBcImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC9EQVRFeDIvY29tYm9AbGl2ZVwiO1xuICAgICAgICAvL2NvbnN0IHByb2R1Y3RJbWdVcmwgPSBgJHtiYXNlVXJsfS8ke2ZvbGRlcn0ke3Byb2R1Y3RTS1V9LndlYnBgO1xuICAgICAgICBpbWdVcmwgPSBgJHtiYXNlVXJsfS8ke2ZvbGRlcn0ke2Z1bGxTS1V9LmNzc2A7XG4gICAgfSBlbHNlIHsgfVxuICAgIHZhciBjc3M7XG4gICAgJChsYXp5Q1NTKCkpLmFwcGVuZCgoY3NzID0gJChgPGxpbmsgY2xhc3M9XCJiZy1vdmVybGF5LWNzc1wiIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIi8+YCkub24oXCJsb2FkXCIsIGUgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50cyA9ICQoXCIuYmctb3ZlcmxheS1jc3NcIilcbiAgICAgICAgICAgICwgaW5kZXggPSBlbGVtZW50cy5pbmRleChlLnRhcmdldCk7XG4gICAgICAgIGVsZW1lbnRzLmVhY2goKGksIGUpID0+IGkgPCBpbmRleCAmJiAkKGUpLnJlbW92ZSgpKTtcbiAgICB9XG4gICAgKSkpO1xuICAgIGlmIChjc3MuYXR0cihcImhyZWZcIikgIT0gaW1nVXJsKSB7XG4gICAgICAgIGNzcy5hdHRyKFwiaHJlZlwiLCBpbWdVcmwpO1xuICAgIH1cblxuICAgIC8vY29uc3QgaW1nRnVsbFVybCA9IGAke2Jhc2VVcmx9L3B1YmxpYy8ke2ZvbGRlcn0ke2Z1bGxTS1V9LndlYnBgO1xuICAgIC8vICQoXCIuZGV0YWlscy1nYWxsZXJ5X193cmFwLWlubmVyXCIpLmNzcyh7XG4gICAgLy8gICBcIi0tYmctb3ZlcmxheVwiOiBmb2xkZXIgJiYgc2t1ID8gYHVybCgke2ltZ1VybH0pYCA6IFwibm9uZVwiLFxuICAgIC8vICAgLy9cIi0tYmctcHJvZHVjdC1vdmVybGF5XCI6IGZvbGRlciAmJiBwcm9kdWN0U0tVID8gYHVybCgke3Byb2R1Y3RJbWdVcmx9KWAgOiBcIm5vbmVcIixcbiAgICAvLyB9KTtcbiAgICAvLyAgICAgICBmb2xkZXIgJiYgc2t1ICYmIHNldFRpbWVvdXQodD0+JChcIi5kZXRhaWxzLWdhbGxlcnlfX3dyYXAtaW5uZXJcIikuY3NzKHsgXCItLWJnLW92ZXJsYXlcIjogaW1nVXJsID8gYHVybCgke2ltZ1VybH0pYCA6IFwibm9uZVwiIH0pLCAxMDApO1xufVxuXG5sZXQgcHJvY2Vzc2VkRXZlbnQgPSBmYWxzZTtcblxuY29uc3QgcmVkaXNwYXRjaEV2ZW50ID0gKGV2ZW50LCB0YXJnZXQpID0+IHtcbiAgICAvLyBVbmNhdWdodCAoaW4gcHJvbWlzZSkgRE9NRXhjZXB0aW9uOiBGYWlsZWQgdG8gZXhlY3V0ZSAnZGlzcGF0Y2hFdmVudCcgb24gJ0V2ZW50VGFyZ2V0JzogVGhlIGV2ZW50IGlzIGFscmVhZHkgYmVpbmcgZGlzcGF0Y2hlZC5cbiAgICB0cnkge1xuICAgICAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfSBjYXRjaCAoZSkgey8vIHNpbGVuY2VcbiAgICB9XG5cbiAgICBwcm9jZXNzZWRFdmVudCA9IGZhbHNlO1xuICAgIHRhcmdldC5kaXNhYmxlZCA9IGZhbHNlO1xufVxuICAgIDtcblxudmFyIGNvbXB1dGVkQ2FydFRvdGFsID0gXCJcIjtcbmZ1bmN0aW9uIGluamVjdEJ1dHRvbnMocGFnZSwgc2hvd0FjdGlvbkJhciwgYm9uZEFkZFRvQ2FydENvbnRyb2xzLCBiaW5kQWRkVG9DYXJ0Q29udHJvbHMpIHtcbiAgICBpZiAocGFnZS50eXBlICE9PSBcIlBST0RVQ1RcIikge1xuICAgICAgICAvL2Rlc3Ryb3lBcnJpdmVHcm91cHMoKTtcbiAgICAgICAgLy9kLnVuYmluZEFycml2ZShpbmplY3RQcm9kdWN0RGV0YWlscyk7XG4gICAgICAgIC8vIGZ1bmN0aW9uIENvbnRpbnVlQnV0dG9uQXJyaXZlZChlbGVtKSB7XG4gICAgICAgIC8vICAgLy9kZWJ1Z2dlcjtcbiAgICAgICAgLy8gfVxuICAgICAgICBjb25zdCBsYW5nID0gJGQuYXR0cihcImxhbmdcIilcbiAgICAgICAgICAgICwgbCA9IGxhbmcgPyBcIi9cIiArIGxhbmcgOiBcIlwiO1xuICAgICAgICBjb25zdCBzZWxlY3RvcldoZW5SZWFkeSA9IHtcbiAgICAgICAgICAgIFRFUk1TOiBcIi5lYy1wYWdlLWJvZHlcIixcbiAgICAgICAgICAgIENBUlQ6IHtcbiAgICAgICAgICAgICAgICBzOiBcIi5lYy1jYXJ0X19idXR0b25zXCIsXG4gICAgICAgICAgICAgICAgaHJlZjogYCR7bH0vcHJvZHVjdHMvY2FydGBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBDSEVDS09VVF9BRERSRVNTOiB7XG4gICAgICAgICAgICAgICAgczogXCIuZWMtY2FydC1zdGVwLS1hZGRyZXNzIC5mb3JtLWNvbnRyb2xfX2J1dHRvblwiLFxuICAgICAgICAgICAgICAgIGhyZWY6IGAke2x9L3Byb2R1Y3RzL2NoZWNrb3V0L2FkZHJlc3NgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgQ0hFQ0tPVVRfREVMSVZFUlk6IHtcbiAgICAgICAgICAgICAgICBzOiBcIi5lYy1jYXJ0LXN0ZXAtLWRlbGl2ZXJ5IC5mb3JtLWNvbnRyb2xfX2J1dHRvblwiLFxuICAgICAgICAgICAgICAgIGhyZWY6IGAke2x9L3Byb2R1Y3RzL2NoZWNrb3V0L2RlbGl2ZXJ5YFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIENIRUNLT1VUX1RBWF9JTkZPUk1BVElPTjoge1xuICAgICAgICAgICAgICAgIHM6IFwiLmVjLWNhcnQtc3RlcC0tdGF4LWluZm9ybWF0aW9uIC5mb3JtLWNvbnRyb2xfX2J1dHRvblwiLFxuICAgICAgICAgICAgICAgIGhyZWY6IGAke2x9L3Byb2R1Y3RzL2NoZWNrb3V0L3RheC1pbmZvcm1hdGlvbmBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBDSEVDS09VVF9QQVlNRU5UX0RFVEFJTFM6IHtcbiAgICAgICAgICAgICAgICBzOiBcIi5lYy1jYXJ0LXN0ZXAtLXBheW1lbnQgLmZvcm0tY29udHJvbF9fYnV0dG9uLCAjZWN3aWQtcGF5bWVudC1kZXRhaWxzLXBheXBhbC1wbGFjZWhvbGRlclwiLFxuICAgICAgICAgICAgICAgIGhyZWY6IGAke2x9L3Byb2R1Y3RzL2NoZWNrb3V0L3BheW1lbnRgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgT1JERVJfQ09ORklSTUFUSU9OOiBcIi5lYy1jb25maXJtYXRpb25fX2NvbnRpbnVlXCIsXG4gICAgICAgIH1cbiAgICAgICAgICAgICwgc2VsZWN0b3IgPSBzZWxlY3RvcldoZW5SZWFkeVtwYWdlPy50eXBlXT8ucyB8fCBzZWxlY3RvcldoZW5SZWFkeVtwYWdlPy50eXBlXTtcbiAgICAgICAgaWYgKHBhZ2UudHlwZSBpbiBzZWxlY3RvcldoZW5SZWFkeSkge1xuICAgICAgICAgICAgdmFyIHRvUmVtb3ZlQnJlYWRDcnVtYnMgPSBbXTtcbiAgICAgICAgICAgIG9uRG9tUmVhZHkoZG9tID0+IHtcbiAgICAgICAgICAgICAgICAvL2V4cGFuZCBDYXJ0IFN1bW1hcnkgaXRlbXNcbiAgICAgICAgICAgICAgICBkLmFycml2ZShcIi5lYy1jYXJ0LWl0ZW0tLXN1bW1hcnlcIiwgb25jZU9ubHksIGVsZW0gPT4gZWxlbS5jbGljaygpKTtcbiAgICAgICAgICAgICAgICAvL2luamVjdCBCcmVhZGNydW1ic1xuICAgICAgICAgICAgICAgIGQuYXJyaXZlKFwiLmVjLXN0b3JlIC5lYy1icmVhZGNydW1ic1wiLCBvbmNlT25seSwgZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSAkKGVsZW0pO1xuICAgICAgICAgICAgICAgICAgICBvblVubG9hZChwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uY2hpbGRyZW4oKS50b2dnbGVDbGFzcyhcImZvcmNlLWhpZGRlblwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b1JlbW92ZUJyZWFkQ3J1bWJzLnNwbGljZSgwLCB0b1JlbW92ZUJyZWFkQ3J1bWJzLmxlbmd0aCkuZm9yRWFjaChlID0+IGUucmVtb3ZlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gbGluayh0ZXh0LCBvcmRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZSA9ICQoYDxhIGhyZWY9XCIvY2FydFwiIGNsYXNzPVwiYnJlYWRjcnVtYnNfX2xpbmsgZWMtbGluayBlYy1saW5rLS1tdXRlZCAke29yZGVyID09IDAgPyBcImJyZWFkY3J1bWJzX19saW5rLS1sYXN0XCIgOiBcIlwifVwiIHN0eWxlPVwib3JkZXI6ICR7b3JkZXIgfHwgMH07XCI+JHt0cmFuc2xhdGUodGV4dCl9PC9hPmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9SZW1vdmVCcmVhZENydW1icy5wdXNoKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwYWdlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJURVJNU1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk9SREVSX0NPTkZJUk1BVElPTlwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkNBUlRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5jaGlsZHJlbigpLnRvZ2dsZUNsYXNzKFwiZm9yY2UtaGlkZGVuXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocGFnZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJDSEVDS09VVF9QQVlNRU5UX0RFVEFJTFNcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0ucHJlcGVuZChsaW5rKFwiUGF5bWVudFwiLCBpKyspKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkNIRUNLT1VUX1RBWF9JTkZPUk1BVElPTlwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbGVtKS5wcmVwZW5kKGxpbmsoXCJUYXggaW5mb3JtYXRpb25cIiwgaSsrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJDSEVDS09VVF9ERUxJVkVSWVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbGVtKS5wcmVwZW5kKGxpbmsoXCJTaGlwcGluZyBtZXRob2RcIiwgaSsrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJDSEVDS09VVF9BRERSRVNTXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVsZW0pLnByZXBlbmQobGluayhcIlNoaXBwaW5nICYgRGVsaXZlcnlcIiwgaSsrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVsZW0pLnByZXBlbmQobGluayhcIkNhcnRcIiwgaSsrKSkucHJlcGVuZChsaW5rKFwiR29vZGllc1wiLCBpKyspKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKHBhZ2UudHlwZSA9PSBcIkNBUlRcIiB8fCBwYWdlLnR5cGUgPT0gXCJURVJNU1wiIHx8IHBhZ2UudHlwZSA9PSBcIk9SREVSX0NPTkZJUk1BVElPTlwiKSB7XG4gICAgICAgICAgICAgICAgJGQudG9nZ2xlQ2xhc3MoXCJmaWxsLXNsaWRlclwiLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGQuYXJyaXZlKFwiLmVjLWNhcnRfX3N0ZXBzXCIsIG9uY2VPbmx5LCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJGQudG9nZ2xlQ2xhc3MoXCJmaWxsLXNsaWRlclwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uVW5sb2FkKHAgPT4gKGlzU2Nyb2xsaW5nID0gdHJ1ZSkpO1xuICAgICAgICAgICAgaWYgKHBhZ2UudHlwZSA9PSBcIkNIRUNLT1VUX1BBWU1FTlRfREVUQUlMU1wiKSB7XG4gICAgICAgICAgICAgICAgZC5hcnJpdmUoXCIuZWMtcmFkaW9ncm91cF9faXRlbS0tRHhNLVJFVk9MVVQtb3ItV2lyZS1UcmFuc2ZlciwgLmVjLXJhZGlvZ3JvdXBfX2l0ZW0tLUR4Mi1SRVZPTFVULW9yLVdpcmUtVHJhbnNmZXIsLmVjLXJhZGlvZ3JvdXBfX2l0ZW0tLTJXRC1SRVZPTFVULW9yLVdpcmUtVHJhbnNmZXJcIiwgbm90T25jZU9ubHlTZWxmVW5iaW5kLCBpbmplY3RSZXZvbHV0UVJDb2RlKTtcbiAgICAgICAgICAgICAgICB2YXIgdGltZU91dCA9IDA7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaW5qZWN0UmV2b2x1dFFSQ29kZShlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdHJhbnNsYXRlIHRoZSBSRVZPTFVUIHBheW1lbnQgcHJvdmlkZXIgaGludCB0ZXh0c1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXlzVG9UcmFuc2xhdGUgPSBbXCIuZWMtcmFkaW9ncm91cC0tdGl0bGVcIiwgXCIucGF5bWVudC1oaW50LXJldm9sdXRcIiwgXCIucGF5bWVudC1wcm92aWRlci10b3RhbC10ZXh0XCIsIFwiLnBheW1lbnQtaGludC1pYmFuLWV1clwiLCBcIi5wYXlwbWVudC1oaW50LWJpYy10ZXh0XCIsIFwiLnBheW1lbnQtaGludC1iZW5lZmljaWFyeS10ZXh0XCIsIFwiLnBheW1lbnQtaGludC1iYW5rLXRleHRcIiwgXCIucGF5bWVudC1oaW50LWFkZHJlc3MtdGV4dFwiLCBcIi5wYXltZW50LWhpbnQtbm90ZS1jdXJyZW5jeVwiLF07XG4gICAgICAgICAgICAgICAgICAgIGtleXNUb1RyYW5zbGF0ZS5mb3JFYWNoKHNlbGVjdG9yID0+IGUuYXJyaXZlKHNlbGVjdG9yLCBvbmNlT25seSwgZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gJChlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBlbGVtLnRleHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdHJhbnNsYXRpb24gPSB0cmFuc2xhdGUodGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnRleHQodHJhbnNsYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKGUpLmhhc0NsYXNzKFwiZWMtcmFkaW9ncm91cF9faXRlbS0tY2hlY2tlZFwiKSAmJiAhJChlKS5maW5kKFwiLmVjLXJhZGlvZ3JvdXAtLXRpdGxlXCIpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9ICQoZSkuZmluZChcIi5lYy1yYWRpb2dyb3VwX190aXRsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuaHRtbCgkKGA8ZGl2IGNsYXNzPVwiZWMtcmFkaW9ncm91cC0tdGl0bGVcIi8+YCkudGV4dCh0LnRleHQoKSkpLmFwcGVuZCgkKFwiLmVjLWNhcnQtc3RlcC0tcGF5bWVudCAuZWMtY2FydC1zdGVwX19ib2R5ID4gLmVjLWNhcnQtc3RlcF9fc2VjdGlvbi5lYy1jYXJ0LXN0ZXBfX3NlY3Rpb24tLWRlc2NyaXB0aW9uXCIpWzBdPy5vdXRlckhUTUwpLnRvZ2dsZUNsYXNzKFwiZWMtcmFkaW9ncm91cF9fY2FydC0taW5mb1wiLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8udG9nZ2xlQ2xhc3MoXCJlYy1yYWRpb2dyb3VwX19jYXJ0LWluZm9cIiwgZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnBheW1lbnQtcHJvdmlkZXItdG90YWwgaVwiKS50ZXh0KGNvbXB1dGVkQ2FydFRvdGFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gaXNJblZpZXcodFswXSwgKGUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVPdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVPdXQgPSBzZXRUaW1lb3V0KHRpID0+IHQudG9nZ2xlQ2xhc3MoXCJsb2FkZWRcIiwgc3RhdGUuaXNJblZpZXcpLCA2MDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJlc2hvbGQ6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQudG9nZ2xlQ2xhc3MoXCJsb2FkZWRcIiwgdC5pcyhcIjp2aXNpYmxlXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVW5sb2FkKHAgPT4gVHJ5KHQgPT4gb2JzZXJ2ZXIuZGlzY29ubmVjdCgpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlLmxpc3RlbkNsYXNzQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5saXN0ZW5DbGFzc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJChlKS5jbGFzc0NoYW5nZShpbmplY3RSZXZvbHV0UVJDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChbbmV3IFByb21pc2UociA9PiBFY3dpZC5DYXJ0LmdldChjYXJ0ID0+IHIoY2FydCkpKSwgbmV3IFByb21pc2UociA9PiBFY3dpZC5DYXJ0LmNhbGN1bGF0ZVRvdGFsKG8gPT4gcihvKSkpXSkudGhlbihyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FydCA9IHI/LlswXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbyA9IHI/LlsxXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG90YWwgPSBvLnRvdGFsO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3RhbEZvcm1hdHRlZCA9IEVjd2lkLmZvcm1hdEN1cnJlbmN5KHRvdGFsKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGNhcnQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmRlck51bWJlciA9IGNhcnQuaWQ7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGZpeFN0ZXAoZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgJGUgPSAkKGVsZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGUudG9nZ2xlQ2xhc3MoXCJlZWMtZm9ybS0tY29tbWVudHNcIiwgISEkZS5maW5kKFwiLmVjLWZvcm0uZWMtZm9ybS0tY29tbWVudHNcIikubGVuZ3RoKS50b2dnbGVDbGFzcyhcImVlYy1mb3JtLS1wYXltZW50LXJlZmVyZW5jZS1udW1iZXJcIiwgISEkZS5maW5kKFwiLmVjLWZvcm0tLWo3em13Z3dcIikubGVuZ3RoKS50b2dnbGVDbGFzcyhcImVlYy1jcmVkaXRjYXJkXCIsICEhJGUuZmluZChcIi5lYy1jcmVkaXRjYXJkXCIpLmxlbmd0aCkudG9nZ2xlQ2xhc3MoXCJlZWMtcGF5bWVudC1tZXRob2RzXCIsICEhJGUuZmluZChcIi5lYy1yYWRpb2dyb3VwXCIpLmxlbmd0aCkudG9nZ2xlQ2xhc3MoXCJlZWMtY2FydC1zdGVwX19zZWN0aW9uLS1kZXNjcmlwdGlvblwiLCAhISRlLmhhc0NsYXNzKFwiLmVjLWNhcnQtc3RlcF9fc2VjdGlvbi0tZGVzY3JpcHRpb25cIikubGVuZ3RoKS50b2dnbGVDbGFzcyhcImVlYy1jYXJ0X19idXR0b24tLXBheXBhbFwiLCAhISRlLmZpbmQoXCIuZWMtY2FydF9fYnV0dG9uLS1wYXlwYWxcIikubGVuZ3RoKS50b2dnbGVDbGFzcyhcImVlYy1mb3JtLWNvbnRyb2wtLWRvbmVcIiwgISEkZS5maW5kKFwiLmZvcm0tY29udHJvbC0tZG9uZVwiKS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGQuYXJyaXZlKFwiLmVjLWNhcnQtc3RlcC0tcGF5bWVudCAuZWMtY2FydC1zdGVwX19ib2R5ID4gZGl2XCIsIG5vdE9uY2VPbmx5U2VsZlVuYmluZCwgZml4U3RlcCk7XG4gICAgICAgICAgICAgICAgICAgIGQuYXJyaXZlKFwiLlFSXCIsIG5vdE9uY2VPbmx5U2VsZlVuYmluZCwgZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnBheW1lbnQtcHJvdmlkZXItdG90YWwgaVwiKS50ZXh0KChjb21wdXRlZENhcnRUb3RhbCA9IHRvdGFsRm9ybWF0dGVkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkZWxlbSA9ICQoZWxlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNvbXBhbnkgPSAkZWxlbS5oYXNDbGFzcyhcIlFSLUR4MlwiKSA/IFwiRHgyXCIgOiAkZWxlbS5oYXNDbGFzcyhcIlFSLUR4TVwiKSA/IFwiRHhNXCIgOiBcIjJXRFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVSZXZvbHV0UVJDb2RlKGVsZW0sIGNvbXBhbnksIHRvdGFsLCBvcmRlck51bWJlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGQuYXJyaXZlKHNlbGVjdG9yLCBvbmNlT25seSwgZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgJChlbGVtKS5maW5kKFwiLmZvcm0tY29udHJvbF9fYnV0dG9uLXRleHRcIikuaHRtbChzdmdJY29ucy50cnVjaygpKVswXT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc2VkRXZlbnQgfHwgdGFyZ2V0ID09PSBudWxsIHx8ICh0YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJidXR0b25cIiAmJiB0YXJnZXQudHlwZSAhPT0gXCJidXR0b25cIikgfHwgZS50eXBlICE9PSBcImNsaWNrXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZWRFdmVudCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gJChlbGVtKS5maW5kKFwiLmZvcm0tY29udHJvbF9fYnV0dG9uLXRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGV4dC5pcyhcInRydWNrLW91dFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC50b2dnbGVDbGFzcyhcInRydWNrLW91dFwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodCA9PiByZWRpc3BhdGNoRXZlbnQoZSwgdGFyZ2V0KSwgMTQwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHNob3dBY3Rpb25CYXIsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoc2hvd0FjdGlvbkJhciwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gJGQudW5iaW5kQXJyaXZlKFwiLmZvcm0tY29udHJvbC0tZG9uZVwiLCBDb250aW51ZUJ1dHRvbkFycml2ZWQpO1xuICAgICAgICAvLyBkLmFycml2ZShcIi5mb3JtLWNvbnRyb2wtLWRvbmVcIiwgb25jZU9ubHksIENvbnRpbnVlQnV0dG9uQXJyaXZlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbyA9ICQoXCIuZGV0YWlscy1wcm9kdWN0LW9wdGlvbnNcIik7XG4gICAgICAgIG8gJiYgKG8uaW5qZWN0UHJvZHVjdERldGFpbHNEb25lID0gZmFsc2UpO1xuICAgICAgICBjb25zdCBjdXJyZW50UHJvZHVjdElkID0gY3VycmVudFBhZ2UucHJvZHVjdElkO1xuICAgICAgICBpZiAoY3VycmVudFByb2R1Y3RJZCkge1xuICAgICAgICAgICAgaWYgKGJvbmRBZGRUb0NhcnRDb250cm9scykge1xuICAgICAgICAgICAgICAgIGJvbmRBZGRUb0NhcnRDb250cm9scyA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiaW5kQWRkVG9DYXJ0Q29udHJvbHMoY3VycmVudFByb2R1Y3RJZCwgcGFnZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJvbmRBZGRUb0NhcnRDb250cm9scztcbn1cblxuZnVuY3Rpb24gcmVzdG9yZVNjcm9sbGluZyhwYWdlLCBpc1Njcm9sbGluZykge1xuICAgICQoXCIucHJvZHVjdC1kZXRhaWxzX19wcm9kdWN0LXNrdVwiKS5hdHRyKFwidGl0bGVcIiwgcGFnZS5wcm9kdWN0SWQpO1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoKTtcbiAgICBjb25zdCBzY3JvbGwgPSBwYXJhbXMuZ2V0KFwic2Nyb2xsXCIpO1xuICAgIGlmIChzY3JvbGwpIHtcbiAgICAgICAgaXNTY3JvbGxpbmcgPSB0cnVlO1xuICAgICAgICAkKFwiaHRtbCxib2R5XCIpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiBwYXJzZUludChzY3JvbGwpXG4gICAgICAgIH0sIDUwMCwgXCJzd2luZ1wiKTtcbiAgICB9XG4gICAgJGIuY3NzKFwibWluLWhlaWdodFwiLCBcIlwiKTtcbiAgICBpc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgIHJldHVybiBpc1Njcm9sbGluZztcbn1cbnZhciBlbmFibGVEZXY7XG4kKGQuaGVhZCkub24oXCJtb3VzZWRvd24gdG91Y2hzdGFydFwiLCB0ID0+IHtcbiAgICBjbGVhclRpbWVvdXQoZW5hYmxlRGV2KTtcbiAgICBlbmFibGVEZXYgPSBzZXRUaW1lb3V0KHQgPT4ge1xuICAgICAgICBzdG9wSlNWKCk7XG4gICAgICAgIGFsZXJ0KGlzRGV2KCFpc0RldigpKSA/IFwiWW91IGFyZSBub3cgYSBkZXZlbG9wZXJcIiA6IFwiWW91IGFyZSBubyBsb25nZXIgYSBkZXZlbG9wZXJcIik7XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSBsb2NhdGlvbi5ocmVmO1xuICAgIH1cbiAgICAgICAgLCAxMDAwMCk7XG59XG4pLm9uKFwibW91c2V1cCB0b3VjaGVuZFwiLCBlID0+IGNsZWFyVGltZW91dChlbmFibGVEZXYpKTtcblxuLy9jb25zdCB2aWRlb1BsYXllck9wdGlvbnMgPSB7IGVtYmVkOiB7IGFpcnBsYXk6IHRydWUsIGF1ZGlvX3RyYWNrczogdHJ1ZSwgYXNrX2FpOiBmYWxzZSwgYnV0dG9uczogeyBlbWJlZDogZmFsc2UsIGZ1bGxzY3JlZW46IHRydWUsIGxpa2U6IHRydWUsIHNoYXJlOiB0cnVlLCB3YXRjaGxhdGVyOiB0cnVlIH0sIGNoYXB0ZXJzOiB0cnVlLCBjaHJvbWVjYXN0OiB0cnVlLCBjbG9zZWRfY2FwdGlvbnM6IHRydWUsIGNvbG9yOiBcIiM2MERDNERcIiwgY29sb3JzOiB7IGNvbG9yX29uZTogXCIjMTk3QjUxQUFcIiwgY29sb3JfdHdvOiBcIiM2MERDNERcIiwgY29sb3JfdGhyZWU6IFwiI2ZmZmZmZlwiLCBjb2xvcl9mb3VyOiBcIiMyYTQ5MzFcIiB9LCBsb2dvczogeyB2aW1lbzogZmFsc2UsIGN1c3RvbTogeyBhY3RpdmU6IGZhbHNlLCB1cmw6IG51bGwsIGxpbms6IG51bGwsIHN0aWNreTogZmFsc2UsIHVzZUxpbms6IGZhbHNlIH0gfSwgcXVhbGl0eV9zZWxlY3RvcjogdHJ1ZSwgcGlwOiB0cnVlLCBwbGF5YmFyOiB0cnVlLCBwbGF5X2J1dHRvbjogeyBwb3NpdGlvbjogXCJjZW50ZXJcIiB9LCBzcGVlZDogdHJ1ZSwgdGl0bGU6IHsgbmFtZTogXCJ1c2VyXCIsIG93bmVyOiBcInVzZXJcIiwgcG9ydHJhaXQ6IFwidXNlclwiIH0sIHRyYW5zY3JpcHQ6IHRydWUsIHZvbHVtZTogdHJ1ZSx9LCB9O1xuLyoxNSBEZWMgMjAyNSovXG4iXSwKICAibWFwcGluZ3MiOiAiQUFBQSxTQUFTLEdBQUcsUUFBUSxrQkFBa0IsYUFBYSxXQUFXLGFBQWEsT0FBTyxHQUFHLEdBQUcsR0FBRyxlQUFlLGdCQUFnQixTQUFTLElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxJQUFJLG9CQUFvQiwwQkFBMEIsY0FB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YWdlIiwgIiQiLCAiZCIsICJkZXN0cm95SlNWIiwgImEiLCAidCIsICJlbGVtIiwgInNrdSIsICJwIiwgInJlc29sdXRpb24iLCAiayIsICJmcmFtZXMiLCAiY3NzRmlsZXMiLCAiY3NzIiwgInYiLCAib25QbGF5ZXJSZWFkeSIsICJldmVudCIsICJzIiwgInUiLCAib3B0R3JvdXBDbHMiLCAib3B0R3JvdXBzIiwgImdyb3VwIiwgImwiLCAiaSIsICJ3IiwgImNoZWNrYm94ZXMiLCAiZSIsICJjbHMiLCAiY29sb3IiLCAicGlkIiwgInByb2R1Y3QiLCAic3RvcEpTViIsICJpc1Njcm9sbGluZyIsICJoIiwgImZldGNoUHJvZHVjdCIsICJsYW5nIiwgImIiLCAic3VidG90YWwiLCAiZGlzY291bnRlZFByaWNlIiwgImNhcnQiLCAiY2FydFByb2R1Y3RzIiwgImluZGV4IiwgIm9yZGVycyIsICJwYXJlbnQiLCAiY2FsbGJhY2siLCAicHJlbG9hZGVyIiwgInAzNjAiLCAianN2IiwgImNsb3NlRnVsbFNjcmVlbiIsICJ3b3AiLCAiZGlzY291bnRBbW91bnQiLCAiZWwiLCAic2Nyb2xsV2lkdGgiLCAic3R5bGUiLCAibG9hZDM2MFByb2R1Y3RDb2RlIiwgIm1hdGNoIiwgImNpZCIsICJwYWdlVHlwZSIsICJ0b3AiLCAiZml4Rm9ybUZhY3RvciIsICJjIiwgIm8iLCAic2hvd0FjdGlvbkJhciIsICJzZWxlY3RvciJdCn0K
