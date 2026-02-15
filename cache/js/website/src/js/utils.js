import initArrive from "./arrive";
const loggerTime = {}, w = window;
const splice = Array.prototype.splice;
const initialLoggerTime = /* @__PURE__ */ new Date();
const __defineProperty = Object.defineProperty;
__defineProperty(String.prototype, "map", {
  value: Array.prototype.map,
  enumerable: false
});
if (/shop\.datex2wd\.bike/i.test(location.href)) {
}
export function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = /* @__PURE__ */ new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export function tryExecute(execute, counter = 0) {
  counter = counter || 0;
  if (!w.jQuery && !/products.*/gi.test(location.pathname) && !tryExecute.j) {
    tryExecute.j = 1;
    let s = document.createElement("script");
    s.setAttribute("defer", "defer");
    s.setAttribute("crossorigin", "anonymous");
    s.setAttribute("integrity", "sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=");
    s.setAttribute("src", "https://code.jquery.com/jquery-3.7.1.min.js");
    document.head.appendChild(s);
  }
  if (w.jQuery && w.Ecwid && Ecwid.OnPageLoad && Ecwid.OnPageLoaded && Ecwid.OnAPILoaded) {
    try {
      execute(w.jQuery);
    } catch (e) {
      console.error("execute() failed in tryExecute:", e);
    }
  } else {
    setTimeout(() => tryExecute(execute, counter + 1), 10);
  }
}
await new Promise((resolve) => tryExecute(resolve));
const $ = w.jQuery, jQuery = $, NotIncluded = /\s*((Not|None) included)|None|No logo\s*/gi, isDev = (dev) => {
  if (dev === true || dev === false) {
    setCookie("dev", dev ? "1" : "0", 1e4);
    localStorage.setItem("dev", dev ? "1" : "0");
    return dev;
  } else {
    const devCookie = getCookie("dev");
    return devCookie == null ? /dev\./gi.test(location.host) : devCookie == "1";
  }
}, EcwidApiKey = /dev.(datex2|datex|dx|datex2wd).bike/gi.test(location.host) ? "public_raERu4QZLVehDDFerjbV1gnhjMUYq2Eu" : "public_fwP6LGHPmzxekdX3jfqMXjZfK4rehxhE", d = document, D = w.D = d.documentElement, isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, hasTouchEvents = !!("ontouchstart" in window), storeId = w.storeId = "84625467", $w = w.$w = $(w), b = w.b = d.body, h = w.h = d.head, $h = w.$h = $(h), $b = w.$b = $(b), $d = w.$d = $(D), FETCH_CART_PRODUCT = "id,sku,price,compareToPrice,wholesalePrices,options(type,name,nameTranslated,defaultChoice,choices(text,priceModifier,priceModifierType,textTranslated))", cachedPromisesCartAndPid = {}, preloadedCss = {}, smooth = window.smooth = {
  dx2: true,
  behavior: "smooth"
}, onceOnly = {
  existing: true,
  onceOnly: true
}, notOnceOnly = {
  existing: true,
  onceOnly: false
}, onceOnlySelfUnbind = {
  existing: true,
  onceOnly: true,
  selfUnbind: true
}, notOnceOnlySelfUnbind = {
  existing: true,
  onceOnly: false,
  selfUnbind: true
};
export { $, jQuery, __defineProperty, NotIncluded, EcwidApiKey, isDev, d, w, D, isTouchDevice, hasTouchEvents, storeId, $w, b, h, $h, $b, $d, FETCH_CART_PRODUCT, cachedPromisesCartAndPid, preloadedCss, smooth, onceOnly, notOnceOnly, onceOnlySelfUnbind, notOnceOnlySelfUnbind };
document.addEventListener("touchstart touchend touchcancel", (t) => 0, true);
var reEnableAnimationsTimeout = 0;
function disableAnimations(duration) {
  const d2 = document.documentElement, portrait = innerHeight > innerWidth, dt = (cls, force) => {
    d2.classList.toggle(cls, !!force);
    return dt;
  };
  dt("disable-transitions", 1)("portrait", !!portrait)("landscape", !portrait);
  d2.setAttribute("orientation", portrait ? "portrait" : "landscape");
  clearTimeout(reEnableAnimationsTimeout);
  reEnableAnimationsTimeout = setTimeout((t) => dt("disable-transitions", 0), duration);
}
addEventListener("orientationchange", disableAnimations.bind(void 0, 500), true);
addEventListener("resize", disableAnimations.bind(void 0, 1e3), true);
setTimeout(
  (t) => {
  },
  2100
);
function debug() {
  setTimeout(
    (t) => {
      debugger;
    },
    1e3
  );
}
if (document.body?.childNodes[0]?.textContent == "\xA0    \n") {
  document.body.removeChild(document.body.childNodes[0]);
}
if (!w.chrome) {
  w.chrome = {};
}
!document.startViewTransition && (document.startViewTransition = (callback) => callback());
var title = document.getElementsByTagName("title")[0];
__defineProperty(document, "title", {
  get() {
    return title.innerText;
  },
  set(newValue) {
    if (newValue.startsWith(": ")) {
      newValue = newValue.substring(2);
    }
    if (newValue && !/DATEx2.bike/.test(newValue)) {
      newValue += " \u2014 DATEx2.bike";
    }
    title.innerText = newValue;
  }
});
if (/^\/(.?.?)\/?$/gi.exec(location.pathname)) {
  let timeStamp = function() {
    if (w.performance.now)
      return w.performance.now();
    else
      return Date.now();
  }, isVisible = function(el) {
    var r = el.getBoundingClientRect();
    return r.top + r.height >= 0 && r.left + r.width >= 0 && r.bottom - r.height <= (w.innerHeight || document.documentElement.clientHeight) && r.right - r.width <= (w.innerWidth || document.documentElement.clientWidth);
  };
  w.requestAnimationFrame = w.requestAnimationFrame || function(callback, element) {
    setTimeout(callback, 1e3 / 60);
  };
}
detectBrowser();
Array.prototype.shuffle = function() {
  let array = this, currentIndex = array.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};
export function logDuration(group) {
  var hasProvidedDuration = typeof group === "number";
  const sinceLastTime = hasProvidedDuration ? group : loggerTime[group];
  const now = /* @__PURE__ */ new Date();
  const globalTime = this == true || !sinceLastTime;
  !hasProvidedDuration && (loggerTime[group] = now);
  let fmt = "%c" + (now - initialLoggerTime + "ms").padStart(7);
  const args = ["color: #d6bd45"];
  if (this !== true && sinceLastTime || hasProvidedDuration) {
    fmt += " %c" + ((hasProvidedDuration ? sinceLastTime : now - sinceLastTime) + "ms").padStart(7);
    args.push("color: #2196f3");
  }
  if (!hasProvidedDuration && group !== true) {
    fmt += " %c[" + group + "]";
    args.push("color: #5bbbc9");
  }
  return console[hasProvidedDuration ? "info" : globalTime ? "log" : "log"].bind(console, fmt, ...args, ...Array.from(arguments).slice(1));
}
function initJQuery($2) {
  initArrive($2);
  $2.fn.findOrCreate = function(selector, newElem, prepend) {
    const result = this.find(selector);
    return result.length ? result : $2(typeof newElem == "function" ? newElem() : newElem)[prepend ? "prependTo" : "appendTo"](this);
  };
  jQuery.fn.sortElements = (function() {
    var sort = [].sort;
    return function(comparator, getSortable) {
      getSortable = getSortable || function() {
        return this;
      };
      var placements = this.map(function() {
        var sortElement = getSortable.call(this), parentNode = sortElement.parentNode, nextSibling = parentNode.insertBefore(document.createTextNode(""), sortElement.nextSibling);
        return function() {
          if (parentNode === this) {
            throw new Error("You can't sort elements if any one is a descendant of another.");
          }
          parentNode.insertBefore(this, nextSibling);
          parentNode.removeChild(nextSibling);
        };
      });
      return sort.call(this, comparator).each(function(i) {
        placements[i].call(getSortable.call(this));
      });
    };
  })();
  var defaults = {
    url: false,
    callback: false,
    target: false,
    duration: 120,
    on: "mouseover",
    // other options: grab, click, toggle
    touches: 2,
    touch: true,
    // enables a touch fallback
    onZoomIn: false,
    onZoomOut: false,
    magnify: 1
  };
  $2.zoom = function(target, source, img, magnify) {
    var targetHeight, targetWidth, sourceHeight, sourceWidth, xRatio, yRatio, offset, $target = $2(target), position = $target.css("position"), $source = $2(source);
    target.style.position = /(absolute|fixed)/.test(position) ? position : "relative";
    target.style.overflow = "hidden";
    img.style.width = img.style.height = "";
    $2(img).addClass("zoomImg").css({
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0,
      width: img.width * magnify,
      height: img.height * magnify,
      border: "none",
      maxWidth: "none",
      maxHeight: "none"
    }).appendTo(target);
    return {
      init: function() {
        targetWidth = $target.outerWidth();
        targetHeight = $target.outerHeight();
        if (source === target) {
          sourceWidth = targetWidth;
          sourceHeight = targetHeight;
        } else {
          sourceWidth = $source.outerWidth();
          sourceHeight = $source.outerHeight();
        }
        xRatio = (img.width - targetWidth) / sourceWidth;
        yRatio = (img.height - targetHeight) / sourceHeight;
        offset = $source.offset();
      },
      move: function(e) {
        var left = e.pageX - offset.left, top = e.pageY - offset.top;
        top = Math.max(Math.min(top, sourceHeight), 0);
        left = Math.max(Math.min(left, sourceWidth), 0);
        img.style.left = left * -xRatio + "px";
        img.style.top = top * -yRatio + "px";
      }
    };
  };
  $2.fn.forEach = Array.prototype.forEach;
  $2.fn.findIndex = Array.prototype.findIndex;
  $2.fn.zoom = function(options) {
    return this.each(function() {
      var settings = $2.extend({}, defaults, options || {}), target = settings.target && $2(settings.target)[0] || this, source = this, $source = $2(source), img = document.createElement("img"), $img = $2(img), mousemove = "mousemove.zoom", clicked = false, touched = false;
      if (!settings.url) {
        var srcElement = source.querySelector("img");
        if (srcElement) {
          settings.url = srcElement.getAttribute("data-src") || srcElement.currentSrc || srcElement.src;
        }
        if (!settings.url) {
          return;
        }
      }
      $source.one("zoom.destroy", function(position, overflow) {
        $source.off(".zoom");
        target.style.position = position;
        target.style.overflow = overflow;
        img.onload = null;
        $img.remove();
      }.bind(this, target.style.position, target.style.overflow));
      img.onload = function() {
        var zoom = $2.zoom(target, source, img, settings.magnify);
        function start(e) {
          zoom.init();
          zoom.move(e);
          $img.stop().fadeTo($2.support.opacity ? settings.duration : 0, 1, $2.isFunction(settings.onZoomIn) ? settings.onZoomIn.call(img) : false);
        }
        function stop() {
          $img.stop().fadeTo(settings.duration, 0, $2.isFunction(settings.onZoomOut) ? settings.onZoomOut.call(img) : false);
        }
        if (settings.on === "grab") {
          $source.on("mousedown.zoom", function(e) {
            if (e.which === 1) {
              $2(document).one("mouseup.zoom", function() {
                stop();
                $2(document).off(mousemove, zoom.move);
              });
              start(e);
              $2(document).on(mousemove, zoom.move);
              e.preventDefault();
            }
          });
        } else if (settings.on === "click") {
          $source.on("click.zoom", function(e) {
            if (clicked) {
              return;
            } else {
              clicked = true;
              start(e);
              $2(document).on(mousemove, zoom.move);
              $2(document).one("click.zoom", function() {
                stop();
                clicked = false;
                $2(document).off(mousemove, zoom.move);
              });
              return false;
            }
          });
        } else if (settings.on === "toggle") {
          $source.on("click.zoom", function(e) {
            if (clicked) {
              stop();
            } else {
              start(e);
            }
            clicked = !clicked;
          });
        } else if (settings.on === "mouseover") {
          zoom.init();
          $source.on("mouseenter.zoom", start).on("mouseleave.zoom", stop).on(mousemove, zoom.move);
        }
        if (settings.touch) {
          $source.on("touchstart.zoom", function(e) {
            if (settings.touches != e.touches - 1)
              return;
            e.preventDefault();
            if (touched) {
              touched = false;
              stop();
            } else {
              touched = true;
              start(e.originalEvent.touches[e.touches - 1] || e.originalEvent.changedTouches[e.touches - 1]);
            }
          }).on("touchmove.zoom", function(e) {
            if (settings.touches != e.touches)
              return;
            e.preventDefault();
            zoom.move(e.originalEvent.touches[e.touches - 1] || e.originalEvent.changedTouches[0]);
          }).on("touchend.zoom", function(e) {
            if (settings.touches != e.touches)
              return;
            e.preventDefault();
            if (touched) {
              touched = false;
              stop();
            }
          });
        }
        if ($2.isFunction(settings.callback)) {
          settings.callback.call(img);
        }
      };
      img.setAttribute("role", "presentation");
      img.alt = "";
      img.src = settings.url;
    });
  };
  $2.fn.zoom.defaults = defaults;
  $2.fn.isOnScreen = function(test) {
    var height = this.outerHeight();
    var width = this.outerWidth();
    if (!width || !height) {
      return false;
    }
    var win = $2(window);
    var viewport = {
      top: win.scrollTop(),
      left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    var bounds = this.offset();
    bounds.right = bounds.left + width;
    bounds.bottom = bounds.top + height;
    var showing = {
      top: viewport.bottom - bounds.top,
      left: viewport.right - bounds.left,
      bottom: bounds.bottom - viewport.top,
      right: bounds.right - viewport.left
    };
    if (typeof test == "function") {
      return test(showing);
    }
    return showing.top > 0 && showing.left > 0 && showing.right > 0 && showing.bottom > 0;
  };
}
;
initJQuery(w.jQuery);
export default tryExecute;
function detectBrowser() {
  if (navigator.isFirefox = /firefox|fxios/i.test(navigator.userAgent)) {
    document.documentElement.classList.add("firefox");
    navigator.isWebkit = true;
  } else if (navigator.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    document.documentElement.classList.add("safari");
    navigator.isChrome = true;
  } else if (navigator.isChrome = /chrome|chromium|crios/i.test(navigator.userAgent)) {
    document.documentElement.classList.add("chrome");
    navigator.isWebkit = true;
  }
}
export function generateRandom(length) {
  return Array(length).fill().map((n) => (Math.random() * 36 | 0).toString(36)).join("").toUpperCase();
}
var defaultOptions = {
  once: false,
  threshold: 0
};
Object.map = function(o, f, ctx) {
  ctx = ctx || this;
  var result = o && {};
  Object.keys(o || {}).forEach(function(k) {
    result[k] = f.call(ctx, o[k], k, o);
  });
  return result;
};
Object.forEach = function(o, callback, thisArg) {
  Object.keys(o || {}).forEach((key) => callback.call(thisArg || o, o[key], key, o));
  return o;
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, a = arguments, n = a.length; i < n; i++) {
      s = a[i];
      for (var p in s)
        if (hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function buildOptions(options) {
  return __assign(__assign({}, defaultOptions), options);
}
;
function observe(target, observer) {
  var targets = target instanceof Element ? [target] : target;
  for (var i = 0; i < (targets?.length || 0); i++) {
    observer.observe(targets[i]);
  }
}
;
function createObserver(callback, options, condition) {
  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        var target = entry.target;
        if (entry.rootBounds !== null && condition(entry)) {
          callback(target, {
            isAboveView: entry.boundingClientRect.bottom < entry.rootBounds.height / 2 && entry.boundingClientRect.top < 0,
            isInView: entry.isIntersecting,
            isBelowView: entry.boundingClientRect.top > entry.rootBounds.height / 2 && entry.boundingClientRect.bottom > entry.rootBounds.height
          });
          if (options.once) {
            observer.unobserve(target);
          }
        }
      });
    },
    {
      threshold: options.threshold
    }
  );
  return observer;
}
;
function isSupported() {
  return "IntersectionObserver" in window;
}
export function isInOutOfView(target, callback, options) {
  if (options === void 0) {
    options = {};
  }
  var completeOptions = buildOptions(options);
  var intersecting = false;
  var observer = createObserver(callback, completeOptions, function(entry) {
    const result = entry.isIntersecting != intersecting;
    if (result) {
      intersecting = entry.isIntersecting;
    }
    return result;
  });
  observe(target, observer);
  return observer;
}
;
export function isInView(target, callback, options) {
  if (options === void 0) {
    options = {};
  }
  var completeOptions = buildOptions(options);
  var observer = createObserver(callback, completeOptions, function(entry) {
    return entry.isIntersecting;
  });
  observe(target, observer);
  return observer;
}
;
export function isOutOfView(target, callback, options) {
  if (options === void 0) {
    options = {};
  }
  var completeOptions = buildOptions(options);
  var observer = createObserver(callback, completeOptions, function(entry) {
    return !entry.isIntersecting;
  });
  observe(target, observer);
  return observer;
}
;
export function extractEmailAddress(text) {
  return text.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi);
}
let lastUpdatedProductClassesLink;
export function UpdateCurrentProductClasses(page) {
  let url = location.href;
  if (url != lastUpdatedProductClassesLink) {
    lastUpdatedProductClassesLink = url;
    var p360 = w.getProductCodeFromCurrentUrl && w.getProductCodeFromCurrentUrl();
    if (p360) {
      if (w.$) {
        w.$("html").alterClass("p-*", `${p360?.className || ""}`);
      }
    } else {
      if (w.$) {
        w.$("html").alterClass("p-*");
      }
    }
  }
}
let hideActionBarTimeout = 0;
export function hideScreenLoading() {
  const shouldHide = w.shouldHideScreenLoading !== void 0 ? w.shouldHideScreenLoading : true;
  if (shouldHide && w.$d && w.$d.hasClass && w.$d.hasClass("screen-loading")) {
    w.$d.toggleClass("screen-loading", false);
    localStorage.removeItem("screen-loading");
  }
}
export async function hideActionBar(animate) {
  clearTimeout(hideActionBarTimeout);
  hideScreenLoading();
  if (animate) {
    w.$d.toggleClass("hide-action-bar", true);
    await new Promise((resolve) => setTimeout(
      (t) => {
        w.$d.toggleClass("show-action-bar", false);
        resolve();
      },
      300
    ));
  } else {
    w.$d.toggleClass("hide-action-bar-now hide-action-bar", true).toggleClass("show-action-bar", false);
    hideActionBarTimeout = setTimeout((t) => w.$d.toggleClass("hide-action-bar-now", false), 50);
  }
}
export function showActionBar() {
  if (!w.canShowActionBar) {
    w.canShowActionBar = true;
    return;
  }
  clearTimeout(hideActionBarTimeout);
  if (!w.$d.is(".show-action-bar") || w.$d.is(".hide-action-bar")) {
    w.$d.toggleClass("hide-action-bar-now", false).toggleClass("show-action-bar", true);
    setTimeout((t) => w.$d.toggleClass("hide-action-bar", false, 1));
  }
}
export function injectProductDetails(productOptionsElement) {
  if (productOptionsElement.injectProductDetailsDone)
    return;
  productOptionsElement.injectProductDetailsDone = true;
  if (w.UpdateSelectedOptionCssClasses)
    w.UpdateSelectedOptionCssClasses(w.$ && w.$(".form-control__radio:checked"), true);
  UpdateCurrentProductClasses();
  setTimeout(
    (t) => {
      w.$(productOptionsElement).toggleClass("loaded");
      setTimeout((t2) => w.isScrolling = w.restoreScrolling ? w.restoreScrolling(w.currentPage, w.isScrolling) : w.isScrolling, 500);
    },
    0
  );
}
export function installScrollOverride() {
  const sTo = w.scrollTo;
  w.scrollTo = function(x, y) {
    return sTo.apply(this, arguments);
  };
}
!(function() {
  function n() {
    function n2() {
      var n3 = o.apply(null, arguments);
      return a.push(n3), n3;
    }
    function e(n3) {
      var e2 = a.map(function(e3) {
        return e3.run(n3);
      });
      return Promise.all(e2);
    }
    function t() {
      a.forEach(function(n3) {
        n3._shell.terminate();
      }), a.length = 0;
    }
    function r() {
      return a;
    }
    function o(n3, e2) {
      e2 = e2 || [];
      var t2 = e2.map(function(n4) {
        return "self." + n4.name + "=" + n4.method.toString() + ";";
      });
      t2 = t2.concat(["self.onmessage=", n3.toString(), ";"]);
      var r2 = new Blob(t2, {
        type: "text/javascript"
      }), o2 = URL.createObjectURL(r2);
      return {
        _shell: (function() {
          var n4 = new Worker(o2);
          return URL.revokeObjectURL(o2), n4;
        })(),
        run: function(n4) {
          return u(this._shell, n4);
        },
        terminate: function() {
          return i(this);
        }
      };
    }
    function u(n3, e2) {
      e2 = e2 || {}, n3.postMessage(e2);
      var t2 = new Promise(
        function(e3, t3) {
          n3.onmessage = e3, n3.onerror = t3;
        }
      );
      return t2;
    }
    function i(n3) {
      return a.splice(a.indexOf(n3), 1), n3._shell.terminate();
    }
    var a = [];
    return {
      create: n2,
      runAll: e,
      terminateAll: t,
      list: r
    };
  }
  w.$worker = n;
})();
function getElements(el) {
  if (typeof el === "string") {
    return Array.from(document.querySelectorAll(el));
  } else if (typeof $ !== "undefined" && el instanceof $) {
    return el.get();
  } else if (el instanceof HTMLElement) {
    return [el];
  } else if (Array.isArray(el) && el.every((e) => e instanceof HTMLElement)) {
    return el;
  }
  console.warn("setStyle received an invalid element type:", el);
  return [];
}
function parseProperties(properties, value) {
  let stylesToApply = {};
  if (typeof properties === "string") {
    const propsArray = properties.split(",").map((p) => p.trim()).filter((p) => p.length > 0);
    propsArray.forEach((prop) => {
      stylesToApply[prop] = value;
    });
  } else if (Array.isArray(properties)) {
    properties.forEach((prop) => {
      stylesToApply[prop] = value;
    });
  } else if (typeof properties === "object" && properties !== null) {
    stylesToApply = properties;
  } else {
    console.warn("setStyle received invalid properties format:", properties);
  }
  return stylesToApply;
}
export function setStyle(el, properties, value = "", isImportant = false) {
  const elements = getElements(el);
  const stylesToApply = parseProperties(properties, value);
  const priority = isImportant ? "important" : "";
  elements.forEach((element) => {
    if (element && element.style) {
      for (const prop in stylesToApply) {
        if (Object.prototype.hasOwnProperty.call(stylesToApply, prop)) {
          const finalValue = stylesToApply[prop] !== void 0 ? stylesToApply[prop] : value;
          element.style.setProperty(prop, finalValue, priority);
        }
      }
    }
  });
}
export function setImportantStyle(el, properties, value = "") {
  return setStyle(el, properties, value, true);
}
export function clearStyleProperties(el, properties) {
  return setStyle(el, properties, "");
}
var onPageUnloadCallbacks = [];
var onPageUnloadCompletedCallbacks = [];
export function onUnload(callback, persistent) {
  if (typeof callback == "boolean") {
    const x = callback;
    callback = persistent;
    persistent = x;
  }
  if (!onPageUnloadCallbacks.find((c) => c.callback == callback)) {
    onPageUnloadCallbacks.push({
      callback,
      persistent
    });
  }
}
export function onUnloadCompleted(callback, persistent) {
  if (typeof callback == "boolean") {
    const x = callback;
    callback = persistent;
    persistent = x;
  }
  onPageUnloadCompletedCallbacks.push({
    callback,
    persistent
  });
}
export function onPageUnloaded(p) {
  for (let i = 0; i < onPageUnloadCallbacks.length; i++) {
    const block = onPageUnloadCallbacks[i];
    tryExecute((t) => block.callback.apply(this, arguments));
  }
  for (let i = onPageUnloadCallbacks.length; i--; ) {
    const block = onPageUnloadCallbacks[i];
    if (!block.persistent) {
      onPageUnloadCallbacks.splice(i, 1);
    }
  }
  for (let i = 0; i < onPageUnloadCompletedCallbacks.length; i++) {
    const block = onPageUnloadCompletedCallbacks[i];
    tryExecute((t) => block.callback.apply(this, arguments));
  }
  for (let i = onPageUnloadCompletedCallbacks.length; i--; ) {
    const block = onPageUnloadCompletedCallbacks[i];
    if (!block.persistent) {
      onPageUnloadCompletedCallbacks.splice(i, 1);
    }
  }
}
export const pageState = {
  pageLoadedCallbacks: [],
  pageLoaded: false,
  pageLoadingCallbacks: [],
  pageLoading: false,
  domReadyCallbacks: [],
  domElem: null
};
export function onDomReady(callback) {
  if (pageState.domElem) {
    callback(pageState.domElem);
  } else {
    pageState.domReadyCallbacks.push(callback);
  }
}
export function domReadyArrived(elem) {
  if (!pageState.domElem) {
    pageState.domElem = elem;
    pageState.domReadyCallbacks.splice(0, pageState.domReadyCallbacks.length).forEach((callback) => {
      try {
        callback(elem);
      } catch (e) {
        console.error("Error in domReady callback:", e);
      }
    });
  }
}
export function onPageLoaded(callback) {
  if (pageState.pageLoaded) {
    callback(w.page);
  } else {
    pageState.pageLoadedCallbacks.push(callback);
  }
}
export function pageLoadedCompleted(page) {
  pageState.pageLoaded = true;
  pageState.pageLoadedCallbacks.forEach((c) => {
    try {
      c(page);
    } catch (e) {
      console.error("Error in pageLoaded callback:", e);
    }
  });
}
export function onPageLoading(callback) {
  if (pageState.pageLoading) {
    callback(w.page);
  } else {
    pageState.pageLoadingCallbacks.push(callback);
  }
}
export function pageLoadingCompleted(page) {
  pageState.pageLoading = true;
  pageState.pageLoadingCallbacks.forEach((c) => {
    try {
      c(page);
    } catch (e) {
      console.error("Error in pageLoading callback:", e);
    }
  });
}
export function stringWidth(str) {
  let width = 0;
  for (let char of str) {
    if (char === "-") {
      width += 1;
    } else if (char === "%") {
      width += 2;
    } else if (char.match(/[\u0300-\u036F]/)) {
      continue;
    } else if (char.match(/[^\x00-\x7F]/)) {
      width += 2;
    } else {
      width += 1;
    }
  }
  return width;
}
export function alignRight(t) {
  const lines = t.split("\n");
  const maxLength = Math.max(...lines.map((line) => stringWidth(line)));
  return lines.map(
    (line) => {
      const padding = maxLength - stringWidth(line);
      return " ".repeat(padding) + line;
    }
  ).join("\n");
}
const fromCodePoint = String.fromCodePoint.bind(String);
const decodeUnicodeRegex = /d[8-b][0-9a-f]{2}d[c-f][0-9a-f]{2}/gi;
export function decodeUnicode(inputString) {
  return inputString.replace(decodeUnicodeRegex, (match) => {
    const high = parseInt(match.slice(0, 4), 16);
    const low = parseInt(match.slice(4, 8), 16);
    return String.fromCharCode(high, low);
  });
}
window.decodeUnicode = decodeUnicode;
const strikes = { 0: "0\u0335", 1: "1\u0335", 2: "2\u0335", 3: "3\u0335", 4: "4\u0335", 5: "5\u0335", 6: "6\u0335", 7: "7\u0335", 8: "8\u0335", 9: "9\u0335", ",": ",\u0335", ".": ".\u0335" };
export function strike(w2) {
  return Object.getOwnPropertyNames(strikes).every((s) => w2 = w2.replace(new RegExp(`[${s}]`, "gi"), strikes[s])) && w2;
}
;
window.strike = strike;
const A = [97, 65, 48], B = [119834, 119808, 120782], M = [120458, 120432, 120822], bhm = window.bhm = {}, ehm = window.ehm = {}, chm = window.chm = {};
for (let j = 0; j < 3; j++)
  for (let i = 0; i < (j < 2 ? 26 : 10); i++) {
    const a = fromCodePoint(A[j] + i);
    bhm[fromCodePoint(B[j] + i)] = a;
    ehm[fromCodePoint(M[j] + i)] = a;
    chm[j < 2 ? a : i] = fromCodePoint(M[j] + i);
  }
let dhm;
const unbold = window.unbold = (phrase) => phrase && Array.from(phrase).map((bh) => bhm[bh] || ehm[bh] || bh).join(""), bold = window.bold = (phrase) => phrase && Array.from(phrase).map((ch) => chm[ch] || ch).join(""), boldy = window.boldy = (phrase) => (dhm || (dhm = {}) && Object.keys(bhm).forEach((key) => dhm[bhm[key]] = key) || 1) && phrase && Array.from(phrase).map((ch) => dhm[ch] || ch).join(""), extractBold = window.extractBold = (text) => {
  const s = decodeUnicode(text);
  const parts = s.split(/[-\s]+/g);
  var bold2 = parts.map(
    (k, i) => {
      const u = unbold(k);
      if (u !== k)
        return k;
      else
        return null;
    }
  ).filter(Boolean).join("-");
  return bold2;
};
let lazycss;
export function lazyCSS() {
  return lazycss || (lazycss = $("<lazyCSS/>").appendTo(document.body)[0]);
}
export { unbold, bold, boldy, extractBold };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmlsZTovLy9EOi93b3JrL0RBVEV4Mi5iaWtlL3d3My93ZWJzaXRlL3NyYy9qcy91dGlscy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gVXRpbGl0eSBmdW5jdGlvbnMgZm9yIERBVEV4Mi5iaWtlXHJcbmltcG9ydCBpbml0QXJyaXZlIGZyb20gXCIuL2Fycml2ZVwiO1xyXG5cclxuY29uc3QgbG9nZ2VyVGltZSA9IHt9LCB3ID0gd2luZG93O1xyXG5jb25zdCBzcGxpY2UgPSBBcnJheS5wcm90b3R5cGUuc3BsaWNlO1xyXG5jb25zdCBpbml0aWFsTG9nZ2VyVGltZSA9IG5ldyBEYXRlKCk7XHJcbmNvbnN0IF9fZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XHJcbi8vbWFrZSBzdXJlIHlvdSBjYW4gbWFwIHN0cmluZ3MgdGhlIHNhbWUgd2F5IGFzIGFycmF5c1xyXG5fX2RlZmluZVByb3BlcnR5KFN0cmluZy5wcm90b3R5cGUsIFwibWFwXCIsIHtcclxuICAgIHZhbHVlOiBBcnJheS5wcm90b3R5cGUubWFwLFxyXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbn0pO1xyXG5pZiAoL3Nob3BcXC5kYXRleDJ3ZFxcLmJpa2UvaS50ZXN0KGxvY2F0aW9uLmhyZWYpKSB7Ly8gbG9jYXRpb24uaHJlZiA9IGxvY2F0aW9uLmhyZWYucmVwbGFjZSgvc2hvcFxcLmRhdGV4MndkXFwuYmlrZS9pLCBcImRldi5kYXRleDIuYmlrZVwiKTtcclxuICAgIC8vIHJldHVybjtcclxufVxyXG5cclxuXHJcbi8vIHRyeUV4ZWN1dGUgaXMgZXhwb3J0ZWQgYXMgYW4gRVMgbW9kdWxlIGZ1bmN0aW9uIHNvIGNhbGxlcnMgY2FuIGltcG9ydCBpdC5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldENvb2tpZShuYW1lLCB2YWx1ZSwgZGF5cykge1xyXG4gICAgdmFyIGV4cGlyZXMgPSBcIlwiO1xyXG4gICAgaWYgKGRheXMpIHtcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSk7XHJcbiAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b1VUQ1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgKHZhbHVlIHx8IFwiXCIpICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb2tpZShuYW1lKSB7XHJcbiAgICB2YXIgbmFtZUVRID0gbmFtZSArIFwiPVwiO1xyXG4gICAgdmFyIGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGMgPSBjYVtpXTtcclxuICAgICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT0gJyAnKSBjID0gYy5zdWJzdHJpbmcoMSwgYy5sZW5ndGgpO1xyXG4gICAgICAgIGlmIChjLmluZGV4T2YobmFtZUVRKSA9PSAwKSByZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0cnlFeGVjdXRlKGV4ZWN1dGUsIGNvdW50ZXIgPSAwKSB7XHJcbiAgICBjb3VudGVyID0gY291bnRlciB8fCAwO1xyXG4gICAgaWYgKCF3LmpRdWVyeSAmJiAhL3Byb2R1Y3RzLiovZ2kudGVzdChsb2NhdGlvbi5wYXRobmFtZSkgJiYgIXRyeUV4ZWN1dGUuaikge1xyXG4gICAgICAgIHRyeUV4ZWN1dGUuaiA9IDE7XHJcbiAgICAgICAgbGV0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gICAgICAgIHMuc2V0QXR0cmlidXRlKFwiZGVmZXJcIiwgXCJkZWZlclwiKTtcclxuICAgICAgICBzLnNldEF0dHJpYnV0ZShcImNyb3Nzb3JpZ2luXCIsIFwiYW5vbnltb3VzXCIpO1xyXG4gICAgICAgIHMuc2V0QXR0cmlidXRlKFwiaW50ZWdyaXR5XCIsIFwic2hhMjU2LS9KcVQzU1FmYXdSY3YvQklIUFRoa0J2czBPRXZ0RkZtcVBGL2xZSS9DeG89XCIpO1xyXG4gICAgICAgIHMuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaHR0cHM6Ly9jb2RlLmpxdWVyeS5jb20vanF1ZXJ5LTMuNy4xLm1pbi5qc1wiKTtcclxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpO1xyXG4gICAgfVxyXG4gICAgaWYgKHcualF1ZXJ5ICYmIHcuRWN3aWQgJiYgRWN3aWQuT25QYWdlTG9hZCAmJiBFY3dpZC5PblBhZ2VMb2FkZWQgJiYgRWN3aWQuT25BUElMb2FkZWQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBFY3dpZC5PbkFQSUxvYWRlZC5hZGQodD0+IHtcclxuICAgICAgICAgICAgLy8gICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgZXhlY3V0ZSh3LmpRdWVyeSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdleGVjdXRlKCkgZmFpbGVkIGluIHRyeUV4ZWN1dGU6JywgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyeUV4ZWN1dGUoZXhlY3V0ZSwgY291bnRlciArIDEpLCAxMCk7XHJcbiAgICB9XHJcbn1cclxuLy93YWl0IGZvciBqUXVlcnkgdG8gYmUgcmVhZHlcclxuYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB0cnlFeGVjdXRlKHJlc29sdmUpKTtcclxuY29uc3QgJCA9IHcualF1ZXJ5LCBqUXVlcnkgPSAkLCBOb3RJbmNsdWRlZCA9IC9cXHMqKChOb3R8Tm9uZSkgaW5jbHVkZWQpfE5vbmV8Tm8gbG9nb1xccyovZ2ksXHJcbiAgICBpc0RldiA9IGRldiA9PiB7XHJcbiAgICAgICAgaWYgKGRldiA9PT0gdHJ1ZSB8fCBkZXYgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHNldENvb2tpZShcImRldlwiLCBkZXYgPyBcIjFcIiA6IFwiMFwiLCAxMDAwMCk7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZGV2XCIsIGRldiA/IFwiMVwiIDogXCIwXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGV2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgZGV2Q29va2llID0gZ2V0Q29va2llKFwiZGV2XCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGRldkNvb2tpZSA9PSBudWxsID8gL2RldlxcLi9naS50ZXN0KGxvY2F0aW9uLmhvc3QpIDogZGV2Q29va2llID09IFwiMVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgRWN3aWRBcGlLZXkgPSAvZGV2LihkYXRleDJ8ZGF0ZXh8ZHh8ZGF0ZXgyd2QpLmJpa2UvZ2kudGVzdChsb2NhdGlvbi5ob3N0KSA/IFwicHVibGljX3JhRVJ1NFFaTFZlaERERmVyamJWMWduaGpNVVlxMkV1XCIgOiBcInB1YmxpY19md1A2TEdIUG16eGVrZFgzamZxTVhqWmZLNHJlaHhoRVwiLC8vYXRvYihcImNIVmliR2xqWDFFMGFHc3lPVE5IUVVkcFlUVXlhSE5tTm10TlowVTRjVXRFZEV4YWRVTmlcIilcclxuICAgIGQgPSBkb2N1bWVudCxcclxuICAgIEQgPSAody5EID0gZC5kb2N1bWVudEVsZW1lbnQpLFxyXG4gICAgaXNUb3VjaERldmljZSA9IFwib250b3VjaHN0YXJ0XCIgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDAgfHwgbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAwLFxyXG4gICAgaGFzVG91Y2hFdmVudHMgPSAhIShcIm9udG91Y2hzdGFydFwiIGluIHdpbmRvdyksXHJcbiAgICBzdG9yZUlkID0gKHcuc3RvcmVJZCA9IFwiODQ2MjU0NjdcIiksXHJcbiAgICAkdyA9ICh3LiR3ID0gJCh3KSksXHJcbiAgICBiID0gKHcuYiA9IGQuYm9keSksXHJcbiAgICBoID0gKHcuaCA9IGQuaGVhZCksXHJcbiAgICAkaCA9ICh3LiRoID0gJChoKSksXHJcbiAgICAkYiA9ICh3LiRiID0gJChiKSksXHJcbiAgICAkZCA9ICh3LiRkID0gJChEKSksXHJcbiAgICBGRVRDSF9DQVJUX1BST0RVQ1QgPSBcImlkLHNrdSxwcmljZSxjb21wYXJlVG9QcmljZSx3aG9sZXNhbGVQcmljZXMsb3B0aW9ucyh0eXBlLG5hbWUsbmFtZVRyYW5zbGF0ZWQsZGVmYXVsdENob2ljZSxjaG9pY2VzKHRleHQscHJpY2VNb2RpZmllcixwcmljZU1vZGlmaWVyVHlwZSx0ZXh0VHJhbnNsYXRlZCkpXCIsXHJcbiAgICBjYWNoZWRQcm9taXNlc0NhcnRBbmRQaWQgPSB7fSxcclxuICAgIHByZWxvYWRlZENzcyA9IHt9LFxyXG4gICAgc21vb3RoID0gd2luZG93LnNtb290aCA9IHtcclxuICAgICAgICBkeDI6IHRydWUsXHJcbiAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcclxuICAgIH0sXHJcbiAgICBvbmNlT25seSA9IHtcclxuICAgICAgICBleGlzdGluZzogdHJ1ZSxcclxuICAgICAgICBvbmNlT25seTogdHJ1ZVxyXG4gICAgfSxcclxuICAgIG5vdE9uY2VPbmx5ID0ge1xyXG4gICAgICAgIGV4aXN0aW5nOiB0cnVlLFxyXG4gICAgICAgIG9uY2VPbmx5OiBmYWxzZVxyXG4gICAgfSxcclxuICAgIG9uY2VPbmx5U2VsZlVuYmluZCA9IHtcclxuICAgICAgICBleGlzdGluZzogdHJ1ZSxcclxuICAgICAgICBvbmNlT25seTogdHJ1ZSxcclxuICAgICAgICBzZWxmVW5iaW5kOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgbm90T25jZU9ubHlTZWxmVW5iaW5kID0ge1xyXG4gICAgICAgIGV4aXN0aW5nOiB0cnVlLFxyXG4gICAgICAgIG9uY2VPbmx5OiBmYWxzZSxcclxuICAgICAgICBzZWxmVW5iaW5kOiB0cnVlXHJcbiAgICB9O1xyXG5leHBvcnQgeyAkLCBqUXVlcnksIF9fZGVmaW5lUHJvcGVydHksIE5vdEluY2x1ZGVkLCBFY3dpZEFwaUtleSwgaXNEZXYsIGQsIHcsIEQsIGlzVG91Y2hEZXZpY2UsIGhhc1RvdWNoRXZlbnRzLCBzdG9yZUlkLCAkdywgYiwgaCwgJGgsICRiLCAkZCwgRkVUQ0hfQ0FSVF9QUk9EVUNULCBjYWNoZWRQcm9taXNlc0NhcnRBbmRQaWQsIHByZWxvYWRlZENzcywgc21vb3RoLCBvbmNlT25seSwgbm90T25jZU9ubHksIG9uY2VPbmx5U2VsZlVuYmluZCwgbm90T25jZU9ubHlTZWxmVW5iaW5kIH07XHJcblxyXG4vL2hhY2sgdGhlIGhvdmVyIG9uIHRvdWNoIGRldmljZXNcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnQgdG91Y2hlbmQgdG91Y2hjYW5jZWxcIiwgdCA9PiAwLCB0cnVlKTtcclxudmFyIHJlRW5hYmxlQW5pbWF0aW9uc1RpbWVvdXQgPSAwO1xyXG5mdW5jdGlvbiBkaXNhYmxlQW5pbWF0aW9ucyhkdXJhdGlvbikge1xyXG4gICAgY29uc3QgZCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxyXG4gICAgICAgICwgcG9ydHJhaXQgPSBpbm5lckhlaWdodCA+IGlubmVyV2lkdGhcclxuICAgICAgICAsIGR0ID0gKGNscywgZm9yY2UpID0+IHtcclxuICAgICAgICAgICAgZC5jbGFzc0xpc3QudG9nZ2xlKGNscywgISFmb3JjZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgO1xyXG4gICAgZHQoXCJkaXNhYmxlLXRyYW5zaXRpb25zXCIsIDEpKFwicG9ydHJhaXRcIiwgISFwb3J0cmFpdCkoXCJsYW5kc2NhcGVcIiwgIXBvcnRyYWl0KTtcclxuICAgIGQuc2V0QXR0cmlidXRlKFwib3JpZW50YXRpb25cIiwgcG9ydHJhaXQgPyBcInBvcnRyYWl0XCIgOiBcImxhbmRzY2FwZVwiKTtcclxuICAgIGNsZWFyVGltZW91dChyZUVuYWJsZUFuaW1hdGlvbnNUaW1lb3V0KTtcclxuICAgIHJlRW5hYmxlQW5pbWF0aW9uc1RpbWVvdXQgPSBzZXRUaW1lb3V0KHQgPT4gZHQoXCJkaXNhYmxlLXRyYW5zaXRpb25zXCIsIDApLCBkdXJhdGlvbik7XHJcbn1cclxuYWRkRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIGRpc2FibGVBbmltYXRpb25zLmJpbmQodGhpcywgNTAwKSwgdHJ1ZSk7XHJcbmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZGlzYWJsZUFuaW1hdGlvbnMuYmluZCh0aGlzLCAxMDAwKSwgdHJ1ZSk7XHJcblxyXG5zZXRUaW1lb3V0KHQgPT4gey8vZGVidWdnZXI7XHJcbn1cclxuICAgICwgMjEwMCk7XHJcbmZ1bmN0aW9uIGRlYnVnKCkge1xyXG4gICAgc2V0VGltZW91dCh0ID0+IHtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgIH1cclxuICAgICAgICAsIDEwMDApO1xyXG59XHJcblxyXG5pZiAoZG9jdW1lbnQuYm9keT8uY2hpbGROb2Rlc1swXT8udGV4dENvbnRlbnQgPT0gXCJcdTAwQTAgICAgXFxuXCIpIHtcclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzBdKTtcclxufVxyXG5pZiAoIXcuY2hyb21lKSB7XHJcbiAgICB3LmNocm9tZSA9IHt9O1xyXG59XHJcblxyXG4hZG9jdW1lbnQuc3RhcnRWaWV3VHJhbnNpdGlvbiAmJiAoZG9jdW1lbnQuc3RhcnRWaWV3VHJhbnNpdGlvbiA9IGNhbGxiYWNrID0+IGNhbGxiYWNrKCkpO1xyXG5cclxudmFyIHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0aXRsZVwiKVswXTtcclxuX19kZWZpbmVQcm9wZXJ0eShkb2N1bWVudCwgXCJ0aXRsZVwiLCB7XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRpdGxlLmlubmVyVGV4dDtcclxuICAgIH0sXHJcbiAgICBzZXQobmV3VmFsdWUpIHtcclxuICAgICAgICBpZiAobmV3VmFsdWUuc3RhcnRzV2l0aChcIjogXCIpKSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUuc3Vic3RyaW5nKDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV3VmFsdWUgJiYgIS9EQVRFeDIuYmlrZS8udGVzdChuZXdWYWx1ZSkpIHtcclxuICAgICAgICAgICAgbmV3VmFsdWUgKz0gXCIgXHUyMDE0IERBVEV4Mi5iaWtlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRpdGxlLmlubmVyVGV4dCA9IG5ld1ZhbHVlO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG5cclxuaWYgKC9eXFwvKC4/Lj8pXFwvPyQvZ2kuZXhlYyhsb2NhdGlvbi5wYXRobmFtZSkpIHtcclxuICAgIHcucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgZnVuY3Rpb24gKGNhbGxiYWNrLCBlbGVtZW50KSB7XHJcbiAgICAgICAgc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcclxuICAgIH1cclxuICAgICAgICA7XHJcblxyXG4gICAgZnVuY3Rpb24gdGltZVN0YW1wKCkge1xyXG4gICAgICAgIGlmICh3LnBlcmZvcm1hbmNlLm5vdylcclxuICAgICAgICAgICAgcmV0dXJuIHcucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gRGF0ZS5ub3coKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc1Zpc2libGUoZWwpIHtcclxuICAgICAgICB2YXIgciA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHJldHVybiByLnRvcCArIHIuaGVpZ2h0ID49IDAgJiYgci5sZWZ0ICsgci53aWR0aCA+PSAwICYmIHIuYm90dG9tIC0gci5oZWlnaHQgPD0gKHcuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgJiYgci5yaWdodCAtIHIud2lkdGggPD0gKHcuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy8gdmFyIHBkID0gRXZlbnQucHJvdG90eXBlLnByZXZlbnREZWZhdWx0O1xyXG4vLyBFdmVudC5wcm90b3R5cGUucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XHJcbi8vICAgcmV0dXJuIHBkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbi8vIH07XHJcbi8vIGlmICghdy5FY2l3ZCkge1xyXG4vLyAgIHcuRWN3aWQgPSB7fTtcclxuLy8gfVxyXG4vLyBpZiAoIUVjd2lkLk9uQVBJTG9hZGVkKSB7XHJcbi8vICAgRWN3aWQuT25BUElMb2FkZWQgPSB7XHJcbi8vICAgICBEQVRFeDI6IHRydWUsXHJcbi8vICAgICBhZGQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4vLyAgICAgICBpZiAoRWN3aWQuT25BUElMb2FkZWQuREFURXgyKSB7XHJcbi8vICAgICAgICAgREFURXgyT25BUElMb2FkZWQucHVzaChjYWxsYmFjayk7XHJcbi8vICAgICAgIH0gZWxzZSBFY3dpZC5PbkFQSUxvYWRlZC5hZGQoY2FsbGJhY2spO1xyXG4vLyAgICAgfSxcclxuLy8gICB9O1xyXG4vLyB9XHJcbmRldGVjdEJyb3dzZXIoKTtcclxuXHJcbkFycmF5LnByb3RvdHlwZS5zaHVmZmxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGFycmF5ID0gdGhpcywgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLCByYW5kb21JbmRleDtcclxuXHJcbiAgICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS5cclxuICAgIHdoaWxlIChjdXJyZW50SW5kZXggPiAwKSB7XHJcbiAgICAgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50LlxyXG4gICAgICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcclxuICAgICAgICBjdXJyZW50SW5kZXgtLTtcclxuXHJcbiAgICAgICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxyXG4gICAgICAgIFthcnJheVtjdXJyZW50SW5kZXhdLCBhcnJheVtyYW5kb21JbmRleF1dID0gW2FycmF5W3JhbmRvbUluZGV4XSwgYXJyYXlbY3VycmVudEluZGV4XV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9nRHVyYXRpb24oZ3JvdXApIHtcclxuICAgIHZhciBoYXNQcm92aWRlZER1cmF0aW9uID0gdHlwZW9mIGdyb3VwID09PSBcIm51bWJlclwiO1xyXG4gICAgY29uc3Qgc2luY2VMYXN0VGltZSA9IGhhc1Byb3ZpZGVkRHVyYXRpb24gPyBncm91cCA6IGxvZ2dlclRpbWVbZ3JvdXBdO1xyXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IGdsb2JhbFRpbWUgPSB0aGlzID09IHRydWUgfHwgIXNpbmNlTGFzdFRpbWU7XHJcbiAgICAhaGFzUHJvdmlkZWREdXJhdGlvbiAmJiAobG9nZ2VyVGltZVtncm91cF0gPSBub3cpO1xyXG4gICAgbGV0IGZtdCA9IFwiJWNcIiArICgobm93IC0gaW5pdGlhbExvZ2dlclRpbWUpICsgXCJtc1wiKS5wYWRTdGFydCg3KTtcclxuICAgIGNvbnN0IGFyZ3MgPSBbXCJjb2xvcjogI2Q2YmQ0NVwiXTsgLy8gRGltbWVkIHllbGxvd1xyXG5cclxuXHJcbiAgICBpZiAoKHRoaXMgIT09IHRydWUgJiYgc2luY2VMYXN0VGltZSkgfHwgaGFzUHJvdmlkZWREdXJhdGlvbikge1xyXG4gICAgICAgIGZtdCArPSBcIiAlY1wiICsgKChoYXNQcm92aWRlZER1cmF0aW9uID8gc2luY2VMYXN0VGltZSA6IChub3cgLSBzaW5jZUxhc3RUaW1lKSkgKyBcIm1zXCIpLnBhZFN0YXJ0KDcpO1xyXG4gICAgICAgIGFyZ3MucHVzaChcImNvbG9yOiAjMjE5NmYzXCIpOyAvLyBCbHVlXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFoYXNQcm92aWRlZER1cmF0aW9uICYmIGdyb3VwICE9PSB0cnVlKSB7XHJcbiAgICAgICAgZm10ICs9IFwiICVjW1wiICsgZ3JvdXAgKyBcIl1cIjtcclxuICAgICAgICBhcmdzLnB1c2goXCJjb2xvcjogIzViYmJjOVwiKTsgLy8gRGltbWVkIGN5YW5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29uc29sZVtoYXNQcm92aWRlZER1cmF0aW9uID8gXCJpbmZvXCIgOiBnbG9iYWxUaW1lID8gXCJsb2dcIiA6IFwibG9nXCJdLmJpbmQoY29uc29sZSwgZm10LCAuLi5hcmdzLCAuLi5BcnJheS5mcm9tKGFyZ3VtZW50cykuc2xpY2UoMSkpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaW5pdEpRdWVyeSgkKSB7XHJcbiAgICBpbml0QXJyaXZlKCQpO1xyXG5cclxuICAgICQuZm4uZmluZE9yQ3JlYXRlID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBuZXdFbGVtLCBwcmVwZW5kKSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5maW5kKHNlbGVjdG9yKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdCA6ICQodHlwZW9mIG5ld0VsZW0gPT0gXCJmdW5jdGlvblwiID8gbmV3RWxlbSgpIDogbmV3RWxlbSlbcHJlcGVuZCA/IFwicHJlcGVuZFRvXCIgOiBcImFwcGVuZFRvXCJdKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgalF1ZXJ5LmZuLnNvcnRFbGVtZW50cyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNvcnQgPSBbXS5zb3J0O1xyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNvbXBhcmF0b3IsIGdldFNvcnRhYmxlKSB7XHJcbiAgICAgICAgICAgIGdldFNvcnRhYmxlID0gZ2V0U29ydGFibGUgfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIHZhciBwbGFjZW1lbnRzID0gdGhpcy5tYXAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNvcnRFbGVtZW50ID0gZ2V0U29ydGFibGUuY2FsbCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICwgcGFyZW50Tm9kZSA9IHNvcnRFbGVtZW50LnBhcmVudE5vZGVcclxuICAgICAgICAgICAgICAgICAgICAsIC8vIFNpbmNlIHRoZSBlbGVtZW50IGl0c2VsZiB3aWxsIGNoYW5nZSBwb3NpdGlvbiwgd2UgaGF2ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRvIGhhdmUgc29tZSB3YXkgb2Ygc3RvcmluZyBpdHMgb3JpZ2luYWwgcG9zaXRpb24gaW5cclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgRE9NLiBUaGUgZWFzaWVzdCB3YXkgaXMgdG8gaGF2ZSBhICdmbGFnJyBub2RlOlxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRTaWJsaW5nID0gcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIiksIHNvcnRFbGVtZW50Lm5leHRTaWJsaW5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnROb2RlID09PSB0aGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBjYW4ndCBzb3J0IGVsZW1lbnRzIGlmIGFueSBvbmUgaXMgYSBkZXNjZW5kYW50IG9mIGFub3RoZXIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSW5zZXJ0IGJlZm9yZSBmbGFnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMsIG5leHRTaWJsaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgZmxhZzpcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5leHRTaWJsaW5nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNvcnQuY2FsbCh0aGlzLCBjb21wYXJhdG9yKS5lYWNoKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnRzW2ldLmNhbGwoZ2V0U29ydGFibGUuY2FsbCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgO1xyXG4gICAgfVxyXG4gICAgKSgpO1xyXG4gICAgdmFyIGRlZmF1bHRzID0ge1xyXG4gICAgICAgIHVybDogZmFsc2UsXHJcbiAgICAgICAgY2FsbGJhY2s6IGZhbHNlLFxyXG4gICAgICAgIHRhcmdldDogZmFsc2UsXHJcbiAgICAgICAgZHVyYXRpb246IDEyMCxcclxuICAgICAgICBvbjogXCJtb3VzZW92ZXJcIixcclxuICAgICAgICAvLyBvdGhlciBvcHRpb25zOiBncmFiLCBjbGljaywgdG9nZ2xlXHJcbiAgICAgICAgdG91Y2hlczogMixcclxuICAgICAgICB0b3VjaDogdHJ1ZSxcclxuICAgICAgICAvLyBlbmFibGVzIGEgdG91Y2ggZmFsbGJhY2tcclxuICAgICAgICBvblpvb21JbjogZmFsc2UsXHJcbiAgICAgICAgb25ab29tT3V0OiBmYWxzZSxcclxuICAgICAgICBtYWduaWZ5OiAxLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDb3JlIFpvb20gTG9naWMsIGluZGVwZW5kZW50IG9mIGV2ZW50IGxpc3RlbmVycy5cclxuICAgICQuem9vbSA9IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSwgaW1nLCBtYWduaWZ5KSB7XHJcbiAgICAgICAgdmFyIHRhcmdldEhlaWdodCwgdGFyZ2V0V2lkdGgsIHNvdXJjZUhlaWdodCwgc291cmNlV2lkdGgsIHhSYXRpbywgeVJhdGlvLCBvZmZzZXQsICR0YXJnZXQgPSAkKHRhcmdldCksIHBvc2l0aW9uID0gJHRhcmdldC5jc3MoXCJwb3NpdGlvblwiKSwgJHNvdXJjZSA9ICQoc291cmNlKTtcclxuXHJcbiAgICAgICAgLy8gVGhlIHBhcmVudCBlbGVtZW50IG5lZWRzIHBvc2l0aW9uaW5nIHNvIHRoYXQgdGhlIHpvb21lZCBlbGVtZW50IGNhbiBiZSBjb3JyZWN0bHkgcG9zaXRpb25lZCB3aXRoaW4uXHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLnBvc2l0aW9uID0gLyhhYnNvbHV0ZXxmaXhlZCkvLnRlc3QocG9zaXRpb24pID8gcG9zaXRpb24gOiBcInJlbGF0aXZlXCI7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICBpbWcuc3R5bGUud2lkdGggPSBpbWcuc3R5bGUuaGVpZ2h0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgJChpbWcpLmFkZENsYXNzKFwiem9vbUltZ1wiKS5jc3Moe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxyXG4gICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiBpbWcud2lkdGggKiBtYWduaWZ5LFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGltZy5oZWlnaHQgKiBtYWduaWZ5LFxyXG4gICAgICAgICAgICBib3JkZXI6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBtYXhXaWR0aDogXCJub25lXCIsXHJcbiAgICAgICAgICAgIG1heEhlaWdodDogXCJub25lXCIsXHJcbiAgICAgICAgfSkuYXBwZW5kVG8odGFyZ2V0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0V2lkdGggPSAkdGFyZ2V0Lm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldEhlaWdodCA9ICR0YXJnZXQub3V0ZXJIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlID09PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VXaWR0aCA9IHRhcmdldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUhlaWdodCA9IHRhcmdldEhlaWdodDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlV2lkdGggPSAkc291cmNlLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VIZWlnaHQgPSAkc291cmNlLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgeFJhdGlvID0gKGltZy53aWR0aCAtIHRhcmdldFdpZHRoKSAvIHNvdXJjZVdpZHRoO1xyXG4gICAgICAgICAgICAgICAgeVJhdGlvID0gKGltZy5oZWlnaHQgLSB0YXJnZXRIZWlnaHQpIC8gc291cmNlSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIG9mZnNldCA9ICRzb3VyY2Uub2Zmc2V0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1vdmU6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVmdCA9IGUucGFnZVggLSBvZmZzZXQubGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICwgdG9wID0gZS5wYWdlWSAtIG9mZnNldC50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgdG9wID0gTWF0aC5tYXgoTWF0aC5taW4odG9wLCBzb3VyY2VIZWlnaHQpLCAwKTtcclxuICAgICAgICAgICAgICAgIGxlZnQgPSBNYXRoLm1heChNYXRoLm1pbihsZWZ0LCBzb3VyY2VXaWR0aCksIDApO1xyXG5cclxuICAgICAgICAgICAgICAgIGltZy5zdHlsZS5sZWZ0ID0gbGVmdCAqIC14UmF0aW8gKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICBpbWcuc3R5bGUudG9wID0gdG9wICogLXlSYXRpbyArIFwicHhcIjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgICAgIDtcclxuICAgICQuZm4uZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xyXG4gICAgJC5mbi5maW5kSW5kZXggPSBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4O1xyXG4gICAgJC5mbi56b29tID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KVxyXG4gICAgICAgICAgICAgICAgLCAvL3RhcmdldCB3aWxsIGRpc3BsYXkgdGhlIHpvb21lZCBpbWFnZVxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gKHNldHRpbmdzLnRhcmdldCAmJiAkKHNldHRpbmdzLnRhcmdldClbMF0pIHx8IHRoaXNcclxuICAgICAgICAgICAgICAgICwgLy9zb3VyY2Ugd2lsbCBwcm92aWRlIHpvb20gbG9jYXRpb24gaW5mbyAodGh1bWJuYWlsKVxyXG4gICAgICAgICAgICAgICAgc291cmNlID0gdGhpc1xyXG4gICAgICAgICAgICAgICAgLCAkc291cmNlID0gJChzb3VyY2UpXHJcbiAgICAgICAgICAgICAgICAsIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIilcclxuICAgICAgICAgICAgICAgICwgJGltZyA9ICQoaW1nKVxyXG4gICAgICAgICAgICAgICAgLCBtb3VzZW1vdmUgPSBcIm1vdXNlbW92ZS56b29tXCJcclxuICAgICAgICAgICAgICAgICwgY2xpY2tlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAsIHRvdWNoZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIGEgdXJsIHdhc24ndCBzcGVjaWZpZWQsIGxvb2sgZm9yIGFuIGltYWdlIGVsZW1lbnQuXHJcbiAgICAgICAgICAgIGlmICghc2V0dGluZ3MudXJsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3JjRWxlbWVudCA9IHNvdXJjZS5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNyY0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy51cmwgPSBzcmNFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIpIHx8IHNyY0VsZW1lbnQuY3VycmVudFNyYyB8fCBzcmNFbGVtZW50LnNyYztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghc2V0dGluZ3MudXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkc291cmNlLm9uZShcInpvb20uZGVzdHJveVwiLCBmdW5jdGlvbiAocG9zaXRpb24sIG92ZXJmbG93KSB7XHJcbiAgICAgICAgICAgICAgICAkc291cmNlLm9mZihcIi56b29tXCIpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSBvdmVyZmxvdztcclxuICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgJGltZy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLmJpbmQodGhpcywgdGFyZ2V0LnN0eWxlLnBvc2l0aW9uLCB0YXJnZXQuc3R5bGUub3ZlcmZsb3cpKTtcclxuXHJcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgem9vbSA9ICQuem9vbSh0YXJnZXQsIHNvdXJjZSwgaW1nLCBzZXR0aW5ncy5tYWduaWZ5KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzdGFydChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgem9vbS5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgem9vbS5tb3ZlKGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIHRoZSBmYWRlLWluIGZvciBJRTggYW5kIGxvd2VyIHNpbmNlIGl0IGNob2tlcyBvbiBmYWRpbmctaW5cclxuICAgICAgICAgICAgICAgICAgICAvLyBhbmQgY2hhbmdpbmcgcG9zaXRpb24gYmFzZWQgb24gbW91c2Vtb3ZlbWVudCBhdCB0aGUgc2FtZSB0aW1lLlxyXG4gICAgICAgICAgICAgICAgICAgICRpbWcuc3RvcCgpLmZhZGVUbygkLnN1cHBvcnQub3BhY2l0eSA/IHNldHRpbmdzLmR1cmF0aW9uIDogMCwgMSwgJC5pc0Z1bmN0aW9uKHNldHRpbmdzLm9uWm9vbUluKSA/IHNldHRpbmdzLm9uWm9vbUluLmNhbGwoaW1nKSA6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzdG9wKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRpbWcuc3RvcCgpLmZhZGVUbyhzZXR0aW5ncy5kdXJhdGlvbiwgMCwgJC5pc0Z1bmN0aW9uKHNldHRpbmdzLm9uWm9vbU91dCkgPyBzZXR0aW5ncy5vblpvb21PdXQuY2FsbChpbWcpIDogZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1vdXNlIGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLm9uID09PSBcImdyYWJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICRzb3VyY2Uub24oXCJtb3VzZWRvd24uem9vbVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS53aGljaCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChkb2N1bWVudCkub25lKFwibW91c2V1cC56b29tXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9mZihtb3VzZW1vdmUsIHpvb20ubW92ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydChlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihtb3VzZW1vdmUsIHpvb20ubW92ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmdzLm9uID09PSBcImNsaWNrXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc291cmNlLm9uKFwiY2xpY2suem9vbVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnViYmxlIHRoZSBldmVudCB1cCB0byB0aGUgZG9jdW1lbnQgdG8gdHJpZ2dlciB0aGUgdW5iaW5kLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKG1vdXNlbW92ZSwgem9vbS5tb3ZlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uZShcImNsaWNrLnpvb21cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChkb2N1bWVudCkub2ZmKG1vdXNlbW92ZSwgem9vbS5tb3ZlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmdzLm9uID09PSBcInRvZ2dsZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNvdXJjZS5vbihcImNsaWNrLnpvb21cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0KGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrZWQgPSAhY2xpY2tlZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2V0dGluZ3Mub24gPT09IFwibW91c2VvdmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB6b29tLmluaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBQcmVlbXB0aXZlbHkgY2FsbCBpbml0IGJlY2F1c2UgSUU3IHdpbGwgZmlyZSB0aGUgbW91c2Vtb3ZlIGhhbmRsZXIgYmVmb3JlIHRoZSBob3ZlciBoYW5kbGVyLlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc291cmNlLm9uKFwibW91c2VlbnRlci56b29tXCIsIHN0YXJ0KS5vbihcIm1vdXNlbGVhdmUuem9vbVwiLCBzdG9wKS5vbihtb3VzZW1vdmUsIHpvb20ubW92ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVG91Y2ggZmFsbGJhY2tcclxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy50b3VjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzb3VyY2Uub24oXCJ0b3VjaHN0YXJ0Lnpvb21cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLnRvdWNoZXMgIT0gZS50b3VjaGVzIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG91Y2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydChlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1tlLnRvdWNoZXMgLSAxXSB8fCBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbZS50b3VjaGVzIC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkub24oXCJ0b3VjaG1vdmUuem9vbVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MudG91Y2hlcyAhPSBlLnRvdWNoZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgem9vbS5tb3ZlKGUub3JpZ2luYWxFdmVudC50b3VjaGVzW2UudG91Y2hlcyAtIDFdIHx8IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkub24oXCJ0b3VjaGVuZC56b29tXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy50b3VjaGVzICE9IGUudG91Y2hlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG91Y2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihzZXR0aW5ncy5jYWxsYmFjaykpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5jYWxsYmFjay5jYWxsKGltZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwicHJlc2VudGF0aW9uXCIpO1xyXG4gICAgICAgICAgICBpbWcuYWx0ID0gXCJcIjtcclxuICAgICAgICAgICAgaW1nLnNyYyA9IHNldHRpbmdzLnVybDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICQuZm4uem9vbS5kZWZhdWx0cyA9IGRlZmF1bHRzO1xyXG4gICAgLyoqXHJcbiAgICAgICAgICAgICogVGVzdHMgaWYgYSBub2RlIGlzIHBvc2l0aW9uZWQgd2l0aGluIHRoZSBjdXJyZW50IHZpZXdwb3J0LlxyXG4gICAgICAgICAgICAqIEl0IGRvZXMgbm90IHRlc3QgYW55IG90aGVyIHR5cGUgb2YgXCJ2aXNpYmlsaXR5XCIsIGxpa2UgY3NzIGRpc3BsYXksXHJcbiAgICAgICAgICAgICogb3BhY2l0eSwgcHJlc2VuY2UgaW4gdGhlIGRvbSwgZXRjIC0gaXQgb25seSBjb25zaWRlcnMgcG9zaXRpb24uXHJcbiAgICAgICAgICAgICpcclxuICAgICAgICAgICAgKiBCeSBkZWZhdWx0LCBpdCB0ZXN0cyBpZiBhdCBsZWFzdCAxIHBpeGVsIGlzIHNob3dpbmcsIHJlZ2FyZGxlc3Mgb2ZcclxuICAgICAgICAgICAgKiBvcmllbnRhdGlvbiAtIGhvd2V2ZXIgYW4gb3B0aW9uYWwgYXJndW1lbnQgaXMgYWNjZXB0ZWQsIGEgY2FsbGJhY2tcclxuICAgICAgICAgICAgKiB0aGF0IGlzIHBhc3NlZCB0aGUgbnVtYmVyIG9mIHBpeGVscyB2aXNpYmxlIG9uIGVhY2ggZWRnZSAtIHRoZSByZXR1cm5cclxuICAgICAgICAgICAgKiAodHJ1ZSBvZiBmYWxzZSkgb2YgdGhhdCBjYWxsYmFjayBpcyB1c2VkIGluc3RlYWQuXHJcbiAgICAgICAgICAgICovXHJcbiAgICAkLmZuLmlzT25TY3JlZW4gPSBmdW5jdGlvbiAodGVzdCkge1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSB0aGlzLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5vdXRlcldpZHRoKCk7XHJcblxyXG4gICAgICAgIGlmICghd2lkdGggfHwgIWhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgd2luID0gJCh3aW5kb3cpO1xyXG5cclxuICAgICAgICB2YXIgdmlld3BvcnQgPSB7XHJcbiAgICAgICAgICAgIHRvcDogd2luLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgICBsZWZ0OiB3aW4uc2Nyb2xsTGVmdCgpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmlld3BvcnQucmlnaHQgPSB2aWV3cG9ydC5sZWZ0ICsgd2luLndpZHRoKCk7XHJcbiAgICAgICAgdmlld3BvcnQuYm90dG9tID0gdmlld3BvcnQudG9wICsgd2luLmhlaWdodCgpO1xyXG5cclxuICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5vZmZzZXQoKTtcclxuICAgICAgICBib3VuZHMucmlnaHQgPSBib3VuZHMubGVmdCArIHdpZHRoO1xyXG4gICAgICAgIGJvdW5kcy5ib3R0b20gPSBib3VuZHMudG9wICsgaGVpZ2h0O1xyXG5cclxuICAgICAgICB2YXIgc2hvd2luZyA9IHtcclxuICAgICAgICAgICAgdG9wOiB2aWV3cG9ydC5ib3R0b20gLSBib3VuZHMudG9wLFxyXG4gICAgICAgICAgICBsZWZ0OiB2aWV3cG9ydC5yaWdodCAtIGJvdW5kcy5sZWZ0LFxyXG4gICAgICAgICAgICBib3R0b206IGJvdW5kcy5ib3R0b20gLSB2aWV3cG9ydC50b3AsXHJcbiAgICAgICAgICAgIHJpZ2h0OiBib3VuZHMucmlnaHQgLSB2aWV3cG9ydC5sZWZ0LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdGVzdCA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRlc3Qoc2hvd2luZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2hvd2luZy50b3AgPiAwICYmIHNob3dpbmcubGVmdCA+IDAgJiYgc2hvd2luZy5yaWdodCA+IDAgJiYgc2hvd2luZy5ib3R0b20gPiAwO1xyXG4gICAgfVxyXG59O1xyXG5pbml0SlF1ZXJ5KHcualF1ZXJ5KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyeUV4ZWN1dGU7XHJcblxyXG5mdW5jdGlvbiBkZXRlY3RCcm93c2VyKCkge1xyXG4gICAgaWYgKChuYXZpZ2F0b3IuaXNGaXJlZm94ID0gL2ZpcmVmb3h8Znhpb3MvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSkge1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZmlyZWZveFwiKTtcclxuICAgICAgICBuYXZpZ2F0b3IuaXNXZWJraXQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmICgobmF2aWdhdG9yLmlzU2FmYXJpID0gL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkpIHtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNhZmFyaVwiKTtcclxuICAgICAgICBuYXZpZ2F0b3IuaXNDaHJvbWUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmICgobmF2aWdhdG9yLmlzQ2hyb21lID0gL2Nocm9tZXxjaHJvbWl1bXxjcmlvcy9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjaHJvbWVcIik7XHJcbiAgICAgICAgbmF2aWdhdG9yLmlzV2Via2l0ID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUmFuZG9tKGxlbmd0aCkge1xyXG4gICAgcmV0dXJuIEFycmF5KGxlbmd0aCkuZmlsbCgpLm1hcChuID0+ICgoTWF0aC5yYW5kb20oKSAqIDM2KSB8IDApLnRvU3RyaW5nKDM2KSkuam9pbihcIlwiKS50b1VwcGVyQ2FzZSgpO1xyXG59XHJcbnZhciBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgIG9uY2U6IGZhbHNlLFxyXG4gICAgdGhyZXNob2xkOiAwLFxyXG59O1xyXG5PYmplY3QubWFwID0gZnVuY3Rpb24gKG8sIGYsIGN0eCkge1xyXG4gICAgY3R4ID0gY3R4IHx8IHRoaXM7XHJcbiAgICB2YXIgcmVzdWx0ID0gbyAmJiB7fTtcclxuICAgIE9iamVjdC5rZXlzKG8gfHwge30pLmZvckVhY2goZnVuY3Rpb24gKGspIHtcclxuICAgICAgICByZXN1bHRba10gPSBmLmNhbGwoY3R4LCBvW2tdLCBrLCBvKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG4gICAgO1xyXG5PYmplY3QuZm9yRWFjaCA9IGZ1bmN0aW9uIChvLCBjYWxsYmFjaywgdGhpc0FyZykge1xyXG4gICAgT2JqZWN0LmtleXMobyB8fCB7fSkuZm9yRWFjaChrZXkgPT4gY2FsbGJhY2suY2FsbCh0aGlzQXJnIHx8IG8sIG9ba2V5XSwga2V5LCBvKSk7XHJcbiAgICByZXR1cm4gbztcclxufVxyXG4gICAgO1xyXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIGEgPSBhcmd1bWVudHMsIG4gPSBhLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYVtpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKVxyXG4gICAgICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgICAgIDtcclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xyXG5mdW5jdGlvbiBidWlsZE9wdGlvbnMob3B0aW9ucykge1xyXG4gICAgcmV0dXJuIF9fYXNzaWduKF9fYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucyksIG9wdGlvbnMpO1xyXG59O1xyXG5mdW5jdGlvbiBvYnNlcnZlKHRhcmdldCwgb2JzZXJ2ZXIpIHtcclxuICAgIHZhciB0YXJnZXRzID0gdGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCA/IFt0YXJnZXRdIDogdGFyZ2V0O1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAodGFyZ2V0cz8ubGVuZ3RoIHx8IDApOyBpKyspIHtcclxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldHNbaV0pO1xyXG4gICAgfVxyXG59O1xyXG5mdW5jdGlvbiBjcmVhdGVPYnNlcnZlcihjYWxsYmFjaywgb3B0aW9ucywgY29uZGl0aW9uKSB7XHJcbiAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKGVudHJpZXMpIHtcclxuICAgICAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24gKGVudHJ5KSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlbnRyeS50YXJnZXQ7XHJcbiAgICAgICAgICAgIGlmIChlbnRyeS5yb290Qm91bmRzICE9PSBudWxsICYmIGNvbmRpdGlvbihlbnRyeSkpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRhcmdldCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQWJvdmVWaWV3OiBlbnRyeS5ib3VuZGluZ0NsaWVudFJlY3QuYm90dG9tIDwgZW50cnkucm9vdEJvdW5kcy5oZWlnaHQgLyAyICYmIGVudHJ5LmJvdW5kaW5nQ2xpZW50UmVjdC50b3AgPCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzSW5WaWV3OiBlbnRyeS5pc0ludGVyc2VjdGluZyxcclxuICAgICAgICAgICAgICAgICAgICBpc0JlbG93VmlldzogZW50cnkuYm91bmRpbmdDbGllbnRSZWN0LnRvcCA+IGVudHJ5LnJvb3RCb3VuZHMuaGVpZ2h0IC8gMiAmJiBlbnRyeS5ib3VuZGluZ0NsaWVudFJlY3QuYm90dG9tID4gZW50cnkucm9vdEJvdW5kcy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm9uY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgICAgICwge1xyXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IG9wdGlvbnMudGhyZXNob2xkXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG9ic2VydmVyO1xyXG59O1xyXG5mdW5jdGlvbiBpc1N1cHBvcnRlZCgpIHtcclxuICAgIHJldHVybiBcIkludGVyc2VjdGlvbk9ic2VydmVyXCIgaW4gd2luZG93O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0luT3V0T2ZWaWV3KHRhcmdldCwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcclxuICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICB9XHJcbiAgICB2YXIgY29tcGxldGVPcHRpb25zID0gYnVpbGRPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgdmFyIGludGVyc2VjdGluZyA9IGZhbHNlO1xyXG4gICAgdmFyIG9ic2VydmVyID0gY3JlYXRlT2JzZXJ2ZXIoY2FsbGJhY2ssIGNvbXBsZXRlT3B0aW9ucywgZnVuY3Rpb24gKGVudHJ5KSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZW50cnkuaXNJbnRlcnNlY3RpbmcgIT0gaW50ZXJzZWN0aW5nO1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaW50ZXJzZWN0aW5nID0gZW50cnkuaXNJbnRlcnNlY3Rpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9KTtcclxuICAgIG9ic2VydmUodGFyZ2V0LCBvYnNlcnZlcik7XHJcbiAgICByZXR1cm4gb2JzZXJ2ZXI7XHJcbn07XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0luVmlldyh0YXJnZXQsIGNhbGxiYWNrLCBvcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgfVxyXG4gICAgdmFyIGNvbXBsZXRlT3B0aW9ucyA9IGJ1aWxkT3B0aW9ucyhvcHRpb25zKTtcclxuICAgIHZhciBvYnNlcnZlciA9IGNyZWF0ZU9ic2VydmVyKGNhbGxiYWNrLCBjb21wbGV0ZU9wdGlvbnMsIGZ1bmN0aW9uIChlbnRyeSkge1xyXG4gICAgICAgIHJldHVybiBlbnRyeS5pc0ludGVyc2VjdGluZztcclxuICAgIH0pO1xyXG4gICAgb2JzZXJ2ZSh0YXJnZXQsIG9ic2VydmVyKTtcclxuICAgIHJldHVybiBvYnNlcnZlcjtcclxufTtcclxuZXhwb3J0IGZ1bmN0aW9uIGlzT3V0T2ZWaWV3KHRhcmdldCwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcclxuICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICB9XHJcbiAgICB2YXIgY29tcGxldGVPcHRpb25zID0gYnVpbGRPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgdmFyIG9ic2VydmVyID0gY3JlYXRlT2JzZXJ2ZXIoY2FsbGJhY2ssIGNvbXBsZXRlT3B0aW9ucywgZnVuY3Rpb24gKGVudHJ5KSB7XHJcbiAgICAgICAgcmV0dXJuICFlbnRyeS5pc0ludGVyc2VjdGluZztcclxuICAgIH0pO1xyXG4gICAgb2JzZXJ2ZSh0YXJnZXQsIG9ic2VydmVyKTtcclxuICAgIHJldHVybiBvYnNlcnZlcjtcclxufTtcclxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RFbWFpbEFkZHJlc3ModGV4dCkge1xyXG4gICAgcmV0dXJuIHRleHQubWF0Y2goLyg/OlthLXowLTkrISMkJSYnKisvPT9eX2B7fH1+LV0rKD86XFwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfFwiKD86W1xceDAxLVxceDA4XFx4MGJcXHgwY1xceDBlLVxceDFmXFx4MjFcXHgyMy1cXHg1YlxceDVkLVxceDdmXXxcXFxcW1xceDAxLVxceDA5XFx4MGJcXHgwY1xceDBlLVxceDdmXSkqXCIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cXC4pK1thLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT98XFxbKD86KD86MjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltcXHgwMS1cXHgwOFxceDBiXFx4MGNcXHgwZS1cXHgxZlxceDIxLVxceDVhXFx4NTMtXFx4N2ZdfFxcXFxbXFx4MDEtXFx4MDlcXHgwYlxceDBjXFx4MGUtXFx4N2ZdKSspXFxdKS9naSk7XHJcbn1cclxuXHJcbi8vIEhlbHBlcnMgbW92ZWQgZnJvbSBgREFURXgyLmJpa2UuanNgIHRvIGtlZXAgZmlsZSBzbWFsbGVyIGFuZCBzaGFyZWFibGUuXHJcbi8vIFRoZXNlIGZ1bmN0aW9ucyBzdGlsbCByZWx5IG9uIHJ1bnRpbWUgZ2xvYmFscyAoalF1ZXJ5IGAkYCwgYCRkYCwgYW5kXHJcbi8vIG90aGVyIHdpbmRvdy1zY29wZWQgaGVscGVycykgYmVjYXVzZSB0aGUgb3JpZ2luYWwgY29kZSBleHBlY3RzIHRoZW0uXHJcblxyXG4vLyBUcmFja3MgdGhlIGxhc3QgVVJMIHVzZWQgdG8gdXBkYXRlIHByb2R1Y3QtcmVsYXRlZCBDU1MgY2xhc3NlcyBvbiBgPGh0bWw+YC5cclxubGV0IGxhc3RVcGRhdGVkUHJvZHVjdENsYXNzZXNMaW5rO1xyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZUN1cnJlbnRQcm9kdWN0Q2xhc3NlcyhwYWdlKVxyXG4gKiAtIFJlYWRzIHRoZSBjdXJyZW50IFVSTCBhbmQgdXBkYXRlcyBgPGh0bWw+YCBjbGFzc2VzIGZvciB0aGUgY3VycmVudCBwcm9kdWN0XHJcbiAqICAgKHVzZXMgYGdldFByb2R1Y3RDb2RlRnJvbUN1cnJlbnRVcmwoKWAgd2hpY2ggcmVtYWlucyBvbiBgd2luZG93YCkuXHJcbiAqIC0gVXNlcyBgdy4kKFwiaHRtbFwiKS5hbHRlckNsYXNzKFwicC0qXCIsIC4uLilgIHdoZW4galF1ZXJ5IGlzIGF2YWlsYWJsZS5cclxuICogLSBJbnRlbmRlZCB0byBiZSBzYWZlIHRvIGNhbGwgZnJlcXVlbnRseTsgaXQgc2tpcHMgd29yayBpZiB0aGUgVVJMIGhhc24ndCBjaGFuZ2VkLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIFVwZGF0ZUN1cnJlbnRQcm9kdWN0Q2xhc3NlcyhwYWdlKSB7XHJcbiAgICBsZXQgdXJsID0gbG9jYXRpb24uaHJlZjtcclxuICAgIGlmICh1cmwgIT0gbGFzdFVwZGF0ZWRQcm9kdWN0Q2xhc3Nlc0xpbmspIHtcclxuICAgICAgICBsYXN0VXBkYXRlZFByb2R1Y3RDbGFzc2VzTGluayA9IHVybDtcclxuICAgICAgICB2YXIgcDM2MCA9IHcuZ2V0UHJvZHVjdENvZGVGcm9tQ3VycmVudFVybCAmJiB3LmdldFByb2R1Y3RDb2RlRnJvbUN1cnJlbnRVcmwoKTtcclxuICAgICAgICBpZiAocDM2MCkge1xyXG4gICAgICAgICAgICBpZiAody4kKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBgYWx0ZXJDbGFzc2AgaXMgYSBoZWxwZXIgdXNlZCBlbHNld2hlcmUgaW4gdGhlIGNvZGViYXNlLlxyXG4gICAgICAgICAgICAgICAgdy4kKFwiaHRtbFwiKS5hbHRlckNsYXNzKFwicC0qXCIsIGAke3AzNjA/LmNsYXNzTmFtZSB8fCBcIlwifWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHcuJCkge1xyXG4gICAgICAgICAgICAgICAgdy4kKFwiaHRtbFwiKS5hbHRlckNsYXNzKFwicC0qXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBUaW1lb3V0IGhhbmRsZSB1c2VkIGJ5IHNob3cvaGlkZSBhY3Rpb24tYmFyIGZ1bmN0aW9ucy5cclxubGV0IGhpZGVBY3Rpb25CYXJUaW1lb3V0ID0gMDtcclxuXHJcbi8qKlxyXG4gKiBoaWRlU2NyZWVuTG9hZGluZygpXHJcbiAqIC0gSGlkZXMgdGhlIGdsb2JhbCBcInNjcmVlbi1sb2FkaW5nXCIgb3ZlcmxheSB3aGVuIGNvbmZpZ3VyZWQgdG8gZG8gc28uXHJcbiAqIC0gVXNlcyBgdy5zaG91bGRIaWRlU2NyZWVuTG9hZGluZ2AgdG8gZGV0ZXJtaW5lIGJlaGF2aW9yIChwcmVzZXJ2ZXNcclxuICogICBwcmV2aW91cyBzZW1hbnRpY3Mgd2hlcmUgdGhpcyBmbGFnIHdhcyBhIGxvY2FsIHZhcmlhYmxlIGluIHRoZSBvcmlnaW5hbCBmaWxlKS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoaWRlU2NyZWVuTG9hZGluZygpIHtcclxuICAgIGNvbnN0IHNob3VsZEhpZGUgPSB3LnNob3VsZEhpZGVTY3JlZW5Mb2FkaW5nICE9PSB1bmRlZmluZWQgPyB3LnNob3VsZEhpZGVTY3JlZW5Mb2FkaW5nIDogdHJ1ZTtcclxuICAgIGlmIChzaG91bGRIaWRlICYmIHcuJGQgJiYgdy4kZC5oYXNDbGFzcyAmJiB3LiRkLmhhc0NsYXNzKFwic2NyZWVuLWxvYWRpbmdcIikpIHtcclxuICAgICAgICB3LiRkLnRvZ2dsZUNsYXNzKFwic2NyZWVuLWxvYWRpbmdcIiwgZmFsc2UpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwic2NyZWVuLWxvYWRpbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBoaWRlQWN0aW9uQmFyKGFuaW1hdGUpXHJcbiAqIC0gSGlkZXMgdGhlIHBhZ2UgYWN0aW9uIGJhci4gSWYgYGFuaW1hdGVgIGlzIHRydXRoeSwgdGhlIGhpZGUgaXMgYW5pbWF0ZWQuXHJcbiAqIC0gQ2FsbHMgYGhpZGVTY3JlZW5Mb2FkaW5nKClgIHRvIGVuc3VyZSBhbnkgbG9hZGluZyBvdmVybGF5IGlzIHJlbW92ZWQgd2hlblxyXG4gKiAgIHRoZSBhY3Rpb24gYmFyIGhpZGVzLlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhpZGVBY3Rpb25CYXIoYW5pbWF0ZSkge1xyXG4gICAgY2xlYXJUaW1lb3V0KGhpZGVBY3Rpb25CYXJUaW1lb3V0KTtcclxuICAgIGhpZGVTY3JlZW5Mb2FkaW5nKCk7XHJcbiAgICBpZiAoYW5pbWF0ZSkge1xyXG4gICAgICAgIHcuJGQudG9nZ2xlQ2xhc3MoXCJoaWRlLWFjdGlvbi1iYXJcIiwgdHJ1ZSk7XHJcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHQgPT4ge1xyXG4gICAgICAgICAgICB3LiRkLnRvZ2dsZUNsYXNzKFwic2hvdy1hY3Rpb24tYmFyXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgLCAzMDApKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdy4kZC50b2dnbGVDbGFzcyhcImhpZGUtYWN0aW9uLWJhci1ub3cgaGlkZS1hY3Rpb24tYmFyXCIsIHRydWUpLnRvZ2dsZUNsYXNzKFwic2hvdy1hY3Rpb24tYmFyXCIsIGZhbHNlKTtcclxuICAgICAgICBoaWRlQWN0aW9uQmFyVGltZW91dCA9IHNldFRpbWVvdXQodCA9PiB3LiRkLnRvZ2dsZUNsYXNzKFwiaGlkZS1hY3Rpb24tYmFyLW5vd1wiLCBmYWxzZSksIDUwKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIHNob3dBY3Rpb25CYXIoKVxyXG4gKiAtIFJldmVhbHMgdGhlIGFjdGlvbiBiYXIuIFRoZSBvcmlnaW5hbCBjb2RlIGd1YXJkZWQgc2hvd2luZyB3aXRoIGEgYGNhblNob3dBY3Rpb25CYXJgXHJcbiAqICAgZmxhZzsgd2UgcHJlc2VydmUgdGhhdCBvbiBgd2luZG93YCBzbyBvdGhlciBtb2R1bGVzIGNhbiB0b2dnbGUgYmVoYXZpb3IuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0FjdGlvbkJhcigpIHtcclxuICAgIGlmICghdy5jYW5TaG93QWN0aW9uQmFyKSB7XHJcbiAgICAgICAgdy5jYW5TaG93QWN0aW9uQmFyID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjbGVhclRpbWVvdXQoaGlkZUFjdGlvbkJhclRpbWVvdXQpO1xyXG4gICAgaWYgKCF3LiRkLmlzKFwiLnNob3ctYWN0aW9uLWJhclwiKSB8fCB3LiRkLmlzKFwiLmhpZGUtYWN0aW9uLWJhclwiKSkge1xyXG4gICAgICAgIHcuJGQudG9nZ2xlQ2xhc3MoXCJoaWRlLWFjdGlvbi1iYXItbm93XCIsIGZhbHNlKS50b2dnbGVDbGFzcyhcInNob3ctYWN0aW9uLWJhclwiLCB0cnVlKTtcclxuICAgICAgICBzZXRUaW1lb3V0KHQgPT4gdy4kZC50b2dnbGVDbGFzcyhcImhpZGUtYWN0aW9uLWJhclwiLCBmYWxzZSwgMSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogaW5qZWN0UHJvZHVjdERldGFpbHMocHJvZHVjdE9wdGlvbnNFbGVtZW50KVxyXG4gKiAtIENhbGxlZCB3aGVuIHByb2R1Y3Qgb3B0aW9uIGNvbnRyb2xzIGFyZSBpbmplY3RlZCBpbnRvIHRoZSBwYWdlLlxyXG4gKiAtIE1hcmtzIHRoZSBlbGVtZW50IGFzIHByb2Nlc3NlZCwgdXBkYXRlcyBvcHRpb24tcmVsYXRlZCBDU1MgY2xhc3NlcyxcclxuICogICB0cmlnZ2VycyBgVXBkYXRlQ3VycmVudFByb2R1Y3RDbGFzc2VzKClgIGFuZCByZXN0b3JlcyBzY3JvbGxpbmcgc3RhdGUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0UHJvZHVjdERldGFpbHMocHJvZHVjdE9wdGlvbnNFbGVtZW50KSB7XHJcbiAgICBpZiAocHJvZHVjdE9wdGlvbnNFbGVtZW50LmluamVjdFByb2R1Y3REZXRhaWxzRG9uZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICBwcm9kdWN0T3B0aW9uc0VsZW1lbnQuaW5qZWN0UHJvZHVjdERldGFpbHNEb25lID0gdHJ1ZTtcclxuICAgIGlmICh3LlVwZGF0ZVNlbGVjdGVkT3B0aW9uQ3NzQ2xhc3NlcylcclxuICAgICAgICB3LlVwZGF0ZVNlbGVjdGVkT3B0aW9uQ3NzQ2xhc3Nlcyh3LiQgJiYgdy4kKFwiLmZvcm0tY29udHJvbF9fcmFkaW86Y2hlY2tlZFwiKSwgdHJ1ZSk7XHJcbiAgICBVcGRhdGVDdXJyZW50UHJvZHVjdENsYXNzZXMoKTtcclxuICAgIHNldFRpbWVvdXQodCA9PiB7XHJcbiAgICAgICAgdy4kKHByb2R1Y3RPcHRpb25zRWxlbWVudCkudG9nZ2xlQ2xhc3MoXCJsb2FkZWRcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCh0ID0+ICh3LmlzU2Nyb2xsaW5nID0gdy5yZXN0b3JlU2Nyb2xsaW5nID8gdy5yZXN0b3JlU2Nyb2xsaW5nKHcuY3VycmVudFBhZ2UsIHcuaXNTY3JvbGxpbmcpIDogdy5pc1Njcm9sbGluZyksIDUwMCk7XHJcbiAgICB9XHJcbiAgICAgICAgLCAwKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGluc3RhbGxTY3JvbGxPdmVycmlkZSgpXHJcbiAqIC0gUmVzdG9yZXMgdGhlIG9yaWdpbmFsIGB3LnNjcm9sbFRvYCBiZWhhdmlvciB3cmFwcGVyIHRoYXQgd2FzIHByZXNlbnRcclxuICogICBpbiB0aGUgb3JpZ2luYWwgZmlsZS4gS2VwdCBhcyBhbiBleHBsaWNpdCBpbnN0YWxsZXIgc28gdGhlIGNhbGxlciBjYW5cclxuICogICBjb250cm9sIHdoZW4gdGhlIG92ZXJyaWRlIGhhcHBlbnMgKGFuZCB0byBhdm9pZCBydW5uaW5nIGl0IGF0IG1vZHVsZVxyXG4gKiAgIGV2YWx1YXRpb24gdGltZSBpZiB0aGF0J3MgdW5kZXNpcmVkKS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnN0YWxsU2Nyb2xsT3ZlcnJpZGUoKSB7XHJcbiAgICBjb25zdCBzVG8gPSB3LnNjcm9sbFRvO1xyXG4gICAgdy5zY3JvbGxUbyA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICAgICAgcmV0dXJuIHNUby5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxufVxyXG4vL3dvcmtlcnM6XHJcblxyXG4hKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIG4oKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gbigpIHtcclxuICAgICAgICAgICAgdmFyIG4gPSBvLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIHJldHVybiBhLnB1c2gobiksXHJcbiAgICAgICAgICAgICAgICBuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBlKG4pIHtcclxuICAgICAgICAgICAgdmFyIGUgPSBhLm1hcChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGUucnVuKG4pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiB0KCkge1xyXG4gICAgICAgICAgICBhLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcclxuICAgICAgICAgICAgICAgIG4uX3NoZWxsLnRlcm1pbmF0ZSgpO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIChhLmxlbmd0aCA9IDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiByKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gbyhuLCBlKSB7XHJcbiAgICAgICAgICAgIGUgPSBlIHx8IFtdO1xyXG4gICAgICAgICAgICB2YXIgdCA9IGUubWFwKGZ1bmN0aW9uIChuKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzZWxmLlwiICsgbi5uYW1lICsgXCI9XCIgKyBuLm1ldGhvZC50b1N0cmluZygpICsgXCI7XCI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0ID0gdC5jb25jYXQoW1wic2VsZi5vbm1lc3NhZ2U9XCIsIG4udG9TdHJpbmcoKSwgXCI7XCJdKTtcclxuICAgICAgICAgICAgdmFyIHIgPSBuZXcgQmxvYih0LCB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInRleHQvamF2YXNjcmlwdFwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAsIG8gPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHIpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgX3NoZWxsOiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuID0gbmV3IFdvcmtlcihvKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVVJMLnJldm9rZU9iamVjdFVSTChvKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkoKSxcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKG4pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdSh0aGlzLl9zaGVsbCwgbik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGVybWluYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiB1KG4sIGUpIHtcclxuICAgICAgICAgICAgKGUgPSBlIHx8IHt9KSxcclxuICAgICAgICAgICAgICAgIG4ucG9zdE1lc3NhZ2UoZSk7XHJcbiAgICAgICAgICAgIHZhciB0ID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKGUsIHQpIHtcclxuICAgICAgICAgICAgICAgIChuLm9ubWVzc2FnZSA9IGUpLFxyXG4gICAgICAgICAgICAgICAgICAgIChuLm9uZXJyb3IgPSB0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gaShuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLnNwbGljZShhLmluZGV4T2YobiksIDEpLFxyXG4gICAgICAgICAgICAgICAgbi5fc2hlbGwudGVybWluYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBhID0gW107XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY3JlYXRlOiBuLFxyXG4gICAgICAgICAgICBydW5BbGw6IGUsXHJcbiAgICAgICAgICAgIHRlcm1pbmF0ZUFsbDogdCxcclxuICAgICAgICAgICAgbGlzdDogclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvL1widW5kZWZpbmVkXCIgIT0gdHlwZW9mIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cyA/IChtb2R1bGUuZXhwb3J0cyA9IG4pIDogKHcuJHdvcmtlciA9IG4pO1xyXG4gICAgdy4kd29ya2VyID0gbjtcclxufVxyXG4pKCk7XHJcblxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gTkVXIFVOSUZJRUQgU1RZTEUgVVRJTElUWSBGVU5DVElPTlNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8qKlxyXG4gKiBQYXJzZXMgdGhlIGVsZW1lbnQgYXJndW1lbnQgKHNlbGVjdG9yLCBqUXVlcnksIG9yIEhUTUxFbGVtZW50KSBpbnRvIGEgbGlzdCBvZiBIVE1MRWxlbWVudHMuXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8alF1ZXJ5fHN0cmluZ30gZWwgLSBUaGUgdGFyZ2V0IGVsZW1lbnQocykuXHJcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudFtdfSBBcnJheSBvZiBlbGVtZW50cy5cclxuICovXHJcbmZ1bmN0aW9uIGdldEVsZW1lbnRzKGVsKSB7XHJcbiAgICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWwpKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mICQgIT09ICd1bmRlZmluZWQnICYmIGVsIGluc3RhbmNlb2YgJCkge1xyXG4gICAgICAgIC8vIEFzc3VtaW5nIGpRdWVyeSBpcyBhdmFpbGFibGUgdmlhICckJ1xyXG4gICAgICAgIHJldHVybiBlbC5nZXQoKTtcclxuICAgIH0gZWxzZSBpZiAoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiBbZWxdO1xyXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGVsKSAmJiBlbC5ldmVyeShlID0+IGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcclxuICAgICAgICByZXR1cm4gZWw7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLndhcm4oJ3NldFN0eWxlIHJlY2VpdmVkIGFuIGludmFsaWQgZWxlbWVudCB0eXBlOicsIGVsKTtcclxuICAgIHJldHVybiBbXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlcyB0aGUgcHJvcGVydGllcyBhcmd1bWVudCAoc3RyaW5nLCBhcnJheSwgb3Igb2JqZWN0KSBpbnRvIGEgbWFwIG9mIHtwcm9wZXJ0eTogdmFsdWV9IHBhaXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXXxPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBwcm9wZXJ0aWVzIC0gVGhlIENTUyBwcm9wZXJ0eSBuYW1lKHMpIG9yIG9iamVjdCBvZiB7cHJvcGVydHk6IHZhbHVlfSBwYWlycy5cclxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVGhlIGRlZmF1bHQgdmFsdWUgdG8gYXBwbHkgaWYgcHJvcGVydGllcyBpcyBhIHN0cmluZyBvciBhcnJheS5cclxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIHN0cmluZz59IE1hcCBvZiBzdHlsZXMgdG8gYXBwbHkuXHJcbiAqL1xyXG5mdW5jdGlvbiBwYXJzZVByb3BlcnRpZXMocHJvcGVydGllcywgdmFsdWUpIHtcclxuICAgIGxldCBzdHlsZXNUb0FwcGx5ID0ge307XHJcblxyXG4gICAgaWYgKHR5cGVvZiBwcm9wZXJ0aWVzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIC8vIENvbW1hLXNlcGFyYXRlZCBzdHJpbmcgb2YgcHJvcGVydGllcyBvciBzaW5nbGUgcHJvcGVydHlcclxuICAgICAgICBjb25zdCBwcm9wc0FycmF5ID0gcHJvcGVydGllc1xyXG4gICAgICAgICAgICAuc3BsaXQoJywnKVxyXG4gICAgICAgICAgICAubWFwKHAgPT4gcC50cmltKCkpXHJcbiAgICAgICAgICAgIC5maWx0ZXIocCA9PiBwLmxlbmd0aCA+IDApO1xyXG5cclxuICAgICAgICBwcm9wc0FycmF5LmZvckVhY2gocHJvcCA9PiB7XHJcbiAgICAgICAgICAgIHN0eWxlc1RvQXBwbHlbcHJvcF0gPSB2YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwcm9wZXJ0aWVzKSkge1xyXG4gICAgICAgIC8vIEFycmF5IG9mIHByb3BlcnRpZXNcclxuICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2gocHJvcCA9PiB7XHJcbiAgICAgICAgICAgIHN0eWxlc1RvQXBwbHlbcHJvcF0gPSB2YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHByb3BlcnRpZXMgPT09ICdvYmplY3QnICYmIHByb3BlcnRpZXMgIT09IG51bGwpIHtcclxuICAgICAgICAvLyBPYmplY3Qgb2Yge3Byb3BlcnR5OiB2YWx1ZX0gcGFpcnMuIFxyXG4gICAgICAgIC8vIE5vdGU6IFdoZW4gY2FsbGVkIHZpYSBzZXRTdHlsZShlbCwge3Byb3A6IHZhbH0sIG51bGwsIHRydWUpLCAndmFsdWUnIGlzIGlnbm9yZWQuXHJcbiAgICAgICAgc3R5bGVzVG9BcHBseSA9IHByb3BlcnRpZXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2Fybignc2V0U3R5bGUgcmVjZWl2ZWQgaW52YWxpZCBwcm9wZXJ0aWVzIGZvcm1hdDonLCBwcm9wZXJ0aWVzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHlsZXNUb0FwcGx5O1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIENvcmUgZnVuY3Rpb24gdG8gc2V0IG9uZSBvciBtb3JlIENTUyBwcm9wZXJ0aWVzIG9uIGVsZW1lbnQocyksIG9wdGlvbmFsbHkgd2l0aCAnIWltcG9ydGFudCcuXHJcbiAqIFRoaXMgZnVuY3Rpb24gdW5pZmllcyB0aGUgbG9naWMgZm9yIHNldHRpbmcgc3R5bGVzLCBpbXBvcnRhbnQgc3R5bGVzLCBhbmQgY2xlYXJpbmcgc3R5bGVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fGpRdWVyeXxzdHJpbmd9IGVsIC0gVGhlIHRhcmdldCBlbGVtZW50KHMpLlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXXxPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBwcm9wZXJ0aWVzIC0gVGhlIENTUyBwcm9wZXJ0eSBuYW1lKHMpIChjb21tYS1zZXBhcmF0ZWQgc3RyaW5nLCBhcnJheSkgb3IgYW4gb2JqZWN0IG9mIHtwcm9wZXJ0eTogdmFsdWV9IHBhaXJzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3ZhbHVlPScnXSAtIFRoZSBDU1MgcHJvcGVydHkgdmFsdWUuIFVzZWQgd2hlbiBgcHJvcGVydGllc2AgaXMgYSBzdHJpbmcgb3IgYXJyYXkuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzSW1wb3J0YW50PWZhbHNlXSAtIFdoZXRoZXIgdG8gZW5mb3JjZSB0aGUgJyFpbXBvcnRhbnQnIGZsYWcuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0U3R5bGUoZWwsIHByb3BlcnRpZXMsIHZhbHVlID0gJycsIGlzSW1wb3J0YW50ID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGVsZW1lbnRzID0gZ2V0RWxlbWVudHMoZWwpO1xyXG4gICAgY29uc3Qgc3R5bGVzVG9BcHBseSA9IHBhcnNlUHJvcGVydGllcyhwcm9wZXJ0aWVzLCB2YWx1ZSk7XHJcbiAgICBjb25zdCBwcmlvcml0eSA9IGlzSW1wb3J0YW50ID8gJ2ltcG9ydGFudCcgOiAnJztcclxuXHJcbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuc3R5bGUpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIHN0eWxlc1RvQXBwbHkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3R5bGVzVG9BcHBseSwgcHJvcCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIHZhbHVlIGZyb20gc3R5bGVzVG9BcHBseSBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBmYWxsYmFjayB0byB0aGUgZ2VuZXJpYyBgdmFsdWVgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmluYWxWYWx1ZSA9IHN0eWxlc1RvQXBwbHlbcHJvcF0gIT09IHVuZGVmaW5lZCA/IHN0eWxlc1RvQXBwbHlbcHJvcF0gOiB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0UHJvcGVydHkgdXNlcyBrZWJhYi1jYXNlIHByb3BlcnR5IG5hbWVzXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wLCBmaW5hbFZhbHVlLCBwcmlvcml0eSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFdyYXBwZXIgZm9yIHNldFN0eWxlOiBTZXRzIG9uZSBvciBtb3JlIENTUyBwcm9wZXJ0aWVzIHdpdGggdGhlICchaW1wb3J0YW50JyBmbGFnLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fGpRdWVyeXxzdHJpbmd9IGVsIC0gVGhlIHRhcmdldCBlbGVtZW50KHMpLlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXXxPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBwcm9wZXJ0aWVzIC0gVGhlIENTUyBwcm9wZXJ0eSBuYW1lKHMpIG9yIG9iamVjdCBvZiB7cHJvcGVydHk6IHZhbHVlfSBwYWlycy5cclxuICogQHBhcmFtIHtzdHJpbmd9IFt2YWx1ZT0nJ10gLSBUaGUgQ1NTIHByb3BlcnR5IHZhbHVlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEltcG9ydGFudFN0eWxlKGVsLCBwcm9wZXJ0aWVzLCB2YWx1ZSA9ICcnKSB7XHJcbiAgICAvLyBQYXNzIHRydWUgZm9yIHRoZSBpc0ltcG9ydGFudCBmbGFnXHJcbiAgICByZXR1cm4gc2V0U3R5bGUoZWwsIHByb3BlcnRpZXMsIHZhbHVlLCB0cnVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFdyYXBwZXIgZm9yIHNldFN0eWxlOiBDbGVhcnMgb25lIG9yIG1vcmUgaW5saW5lIENTUyBwcm9wZXJ0aWVzIGJ5IHNldHRpbmcgdGhlaXIgdmFsdWUgdG8gJycuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8alF1ZXJ5fHN0cmluZ30gZWwgLSBUaGUgdGFyZ2V0IGVsZW1lbnQocykuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfE9iamVjdH0gcHJvcGVydGllcyAtIFRoZSBDU1MgcHJvcGVydHkgbmFtZShzKSAoY29tbWEtc2VwYXJhdGVkIHN0cmluZywgYXJyYXksIG9yIG9iamVjdCBrZXlzKS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGVhclN0eWxlUHJvcGVydGllcyhlbCwgcHJvcGVydGllcykge1xyXG4gICAgLy8gUGFzcyAnJyBmb3IgdGhlIHZhbHVlIGFuZCBlbnN1cmUgaXNJbXBvcnRhbnQgaXMgZmFsc2Uvb21pdHRlZC4gXHJcbiAgICAvLyBUaGUgcHJvcGVydGllcyBhcmUgcGFzc2VkIGRpcmVjdGx5IHRvIHNldFN0eWxlLCB3aGVyZSB0aGV5IGFyZSBwYXJzZWQuXHJcbiAgICByZXR1cm4gc2V0U3R5bGUoZWwsIHByb3BlcnRpZXMsICcnKTtcclxufVxyXG5cclxudmFyIG9uUGFnZVVubG9hZENhbGxiYWNrcyA9IFtdO1xyXG52YXIgb25QYWdlVW5sb2FkQ29tcGxldGVkQ2FsbGJhY2tzID0gW107XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25VbmxvYWQoY2FsbGJhY2ssIHBlcnNpc3RlbnQpIHtcclxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICBjb25zdCB4ID0gY2FsbGJhY2s7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBwZXJzaXN0ZW50O1xyXG4gICAgICAgIHBlcnNpc3RlbnQgPSB4O1xyXG4gICAgfVxyXG4gICAgaWYgKCFvblBhZ2VVbmxvYWRDYWxsYmFja3MuZmluZChjID0+IGMuY2FsbGJhY2sgPT0gY2FsbGJhY2spKSB7XHJcbiAgICAgICAgb25QYWdlVW5sb2FkQ2FsbGJhY2tzLnB1c2goe1xyXG4gICAgICAgICAgICBjYWxsYmFjayxcclxuICAgICAgICAgICAgcGVyc2lzdGVudFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25VbmxvYWRDb21wbGV0ZWQoY2FsbGJhY2ssIHBlcnNpc3RlbnQpIHtcclxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICBjb25zdCB4ID0gY2FsbGJhY2s7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBwZXJzaXN0ZW50O1xyXG4gICAgICAgIHBlcnNpc3RlbnQgPSB4O1xyXG4gICAgfVxyXG4gICAgb25QYWdlVW5sb2FkQ29tcGxldGVkQ2FsbGJhY2tzLnB1c2goe1xyXG4gICAgICAgIGNhbGxiYWNrLFxyXG4gICAgICAgIHBlcnNpc3RlbnRcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25QYWdlVW5sb2FkZWQocCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvblBhZ2VVbmxvYWRDYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBibG9jayA9IG9uUGFnZVVubG9hZENhbGxiYWNrc1tpXTtcclxuICAgICAgICB0cnlFeGVjdXRlKHQgPT4gYmxvY2suY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gb25QYWdlVW5sb2FkQ2FsbGJhY2tzLmxlbmd0aDsgaS0tOykge1xyXG4gICAgICAgIGNvbnN0IGJsb2NrID0gb25QYWdlVW5sb2FkQ2FsbGJhY2tzW2ldO1xyXG4gICAgICAgIC8vZGVsZXRlIHRob3NlIG5vbi1wZXJzaXN0ZW50IHVubG9hZCBjYWxsYmFja3MgZnJvbSBvbmUgdW5sb2FkIHBhZ2UgZXZlbnQgdG8gdGhlIG5leHQgb25lXHJcbiAgICAgICAgLy93aGlsZSBrZWVwaW5nIHRob3NlIHBlcnNpc3RlbnQgdW5sb2FkIGNhbGxiYWNrcyBzbyB0aGF0IHRoZXkgd2lsbCBhbHNvIGJlIGV4ZWN1dGVkIG9uIHRoZSBuZXh0IHBhZ2UgdW5sb2FkIGV2ZW50c1xyXG4gICAgICAgIGlmICghYmxvY2sucGVyc2lzdGVudCkge1xyXG4gICAgICAgICAgICBvblBhZ2VVbmxvYWRDYWxsYmFja3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb25QYWdlVW5sb2FkQ29tcGxldGVkQ2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgYmxvY2sgPSBvblBhZ2VVbmxvYWRDb21wbGV0ZWRDYWxsYmFja3NbaV07XHJcbiAgICAgICAgdHJ5RXhlY3V0ZSh0ID0+IGJsb2NrLmNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IG9uUGFnZVVubG9hZENvbXBsZXRlZENhbGxiYWNrcy5sZW5ndGg7IGktLTspIHtcclxuICAgICAgICBjb25zdCBibG9jayA9IG9uUGFnZVVubG9hZENvbXBsZXRlZENhbGxiYWNrc1tpXTtcclxuICAgICAgICAvL2RlbGV0ZSB0aG9zZSBub24tcGVyc2lzdGVudCB1bmxvYWQgY2FsbGJhY2tzIGZyb20gb25lIHVubG9hZCBwYWdlIGV2ZW50IHRvIHRoZSBuZXh0IG9uZVxyXG4gICAgICAgIC8vd2hpbGUga2VlcGluZyB0aG9zZSBwZXJzaXN0ZW50IHVubG9hZCBjYWxsYmFja3Mgc28gdGhhdCB0aGV5IHdpbGwgYWxzbyBiZSBleGVjdXRlZCBvbiB0aGUgbmV4dCBwYWdlIHVubG9hZCBldmVudHNcclxuICAgICAgICBpZiAoIWJsb2NrLnBlcnNpc3RlbnQpIHtcclxuICAgICAgICAgICAgb25QYWdlVW5sb2FkQ29tcGxldGVkQ2FsbGJhY2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIC0tLSBQYWdlIExvYWQgU3RhdGUgTWFuYWdlbWVudCAtLS1cclxuZXhwb3J0IGNvbnN0IHBhZ2VTdGF0ZSA9IHtcclxuICAgIHBhZ2VMb2FkZWRDYWxsYmFja3M6IFtdLFxyXG4gICAgcGFnZUxvYWRlZDogZmFsc2UsXHJcbiAgICBwYWdlTG9hZGluZ0NhbGxiYWNrczogW10sXHJcbiAgICBwYWdlTG9hZGluZzogZmFsc2UsXHJcbiAgICBkb21SZWFkeUNhbGxiYWNrczogW10sXHJcbiAgICBkb21FbGVtOiBudWxsLFxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uRG9tUmVhZHkoY2FsbGJhY2spIHtcclxuICAgIGlmIChwYWdlU3RhdGUuZG9tRWxlbSkge1xyXG4gICAgICAgIGNhbGxiYWNrKHBhZ2VTdGF0ZS5kb21FbGVtKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGFnZVN0YXRlLmRvbVJlYWR5Q2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG9tUmVhZHlBcnJpdmVkKGVsZW0pIHtcclxuICAgIGlmICghcGFnZVN0YXRlLmRvbUVsZW0pIHtcclxuICAgICAgICBwYWdlU3RhdGUuZG9tRWxlbSA9IGVsZW07XHJcbiAgICAgICAgcGFnZVN0YXRlLmRvbVJlYWR5Q2FsbGJhY2tzLnNwbGljZSgwLCBwYWdlU3RhdGUuZG9tUmVhZHlDYWxsYmFja3MubGVuZ3RoKS5mb3JFYWNoKGNhbGxiYWNrID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVsZW0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbiBkb21SZWFkeSBjYWxsYmFjazonLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25QYWdlTG9hZGVkKGNhbGxiYWNrKSB7XHJcbiAgICBpZiAocGFnZVN0YXRlLnBhZ2VMb2FkZWQpIHtcclxuICAgICAgICBjYWxsYmFjayh3LnBhZ2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwYWdlU3RhdGUucGFnZUxvYWRlZENhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhZ2VMb2FkZWRDb21wbGV0ZWQocGFnZSkge1xyXG4gICAgcGFnZVN0YXRlLnBhZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgcGFnZVN0YXRlLnBhZ2VMb2FkZWRDYWxsYmFja3MuZm9yRWFjaChjID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjKHBhZ2UpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gcGFnZUxvYWRlZCBjYWxsYmFjazonLCBlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uUGFnZUxvYWRpbmcoY2FsbGJhY2spIHtcclxuICAgIGlmIChwYWdlU3RhdGUucGFnZUxvYWRpbmcpIHtcclxuICAgICAgICBjYWxsYmFjayh3LnBhZ2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwYWdlU3RhdGUucGFnZUxvYWRpbmdDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYWdlTG9hZGluZ0NvbXBsZXRlZChwYWdlKSB7XHJcbiAgICBwYWdlU3RhdGUucGFnZUxvYWRpbmcgPSB0cnVlO1xyXG4gICAgcGFnZVN0YXRlLnBhZ2VMb2FkaW5nQ2FsbGJhY2tzLmZvckVhY2goYyA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYyhwYWdlKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluIHBhZ2VMb2FkaW5nIGNhbGxiYWNrOicsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nV2lkdGgoc3RyKSB7XHJcbiAgICBsZXQgd2lkdGggPSAwO1xyXG4gICAgZm9yIChsZXQgY2hhciBvZiBzdHIpIHtcclxuICAgICAgICBpZiAoY2hhciA9PT0gXCItXCIpIHtcclxuICAgICAgICAgICAgd2lkdGggKz0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNoYXIgPT09IFwiJVwiKSB7XHJcbiAgICAgICAgICAgIHdpZHRoICs9IDI7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyLm1hdGNoKC9bXFx1MDMwMC1cXHUwMzZGXS8pKSB7XHJcbiAgICAgICAgICAgIC8vIENvbWJpbmluZyBkaWFjcml0aWNhbCBtYXJrcyAoZS5nLiwgc3RyaWtldGhyb3VnaClcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyLm1hdGNoKC9bXlxceDAwLVxceDdGXS8pKSB7XHJcbiAgICAgICAgICAgIHdpZHRoICs9IDI7XHJcbiAgICAgICAgICAgIC8vIEFzc3VtaW5nIHdpZGUgY2hhcmFjdGVycyB0YWtlIHVwIDIgc3BhY2VzXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2lkdGggKz0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gd2lkdGg7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbGlnblJpZ2h0KHQpIHtcclxuICAgIGNvbnN0IGxpbmVzID0gdC5zcGxpdChcIlxcblwiKTtcclxuICAgIGNvbnN0IG1heExlbmd0aCA9IE1hdGgubWF4KC4uLmxpbmVzLm1hcChsaW5lID0+IHN0cmluZ1dpZHRoKGxpbmUpKSk7XHJcblxyXG4gICAgcmV0dXJuIGxpbmVzLm1hcChsaW5lID0+IHtcclxuICAgICAgICBjb25zdCBwYWRkaW5nID0gbWF4TGVuZ3RoIC0gc3RyaW5nV2lkdGgobGluZSk7XHJcbiAgICAgICAgcmV0dXJuIFwiIFwiLnJlcGVhdChwYWRkaW5nKSArIGxpbmU7XHJcbiAgICB9XHJcbiAgICApLmpvaW4oXCJcXG5cIik7XHJcbn1cclxuXHJcbi8qIHByZXR0aWVyLWlnbm9yZSAqL1xyXG5jb25zdCBmcm9tQ29kZVBvaW50ID0gU3RyaW5nLmZyb21Db2RlUG9pbnQuYmluZChTdHJpbmcpO1xyXG5jb25zdCBkZWNvZGVVbmljb2RlUmVnZXggPSAvZFs4LWJdWzAtOWEtZl17Mn1kW2MtZl1bMC05YS1mXXsyfS9naTtcclxuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZVVuaWNvZGUoaW5wdXRTdHJpbmcpIHtcclxuICAgIHJldHVybiBpbnB1dFN0cmluZy5yZXBsYWNlKGRlY29kZVVuaWNvZGVSZWdleCwgbWF0Y2ggPT4ge1xyXG4gICAgICAgIGNvbnN0IGhpZ2ggPSBwYXJzZUludChtYXRjaC5zbGljZSgwLCA0KSwgMTYpO1xyXG4gICAgICAgIGNvbnN0IGxvdyA9IHBhcnNlSW50KG1hdGNoLnNsaWNlKDQsIDgpLCAxNik7XHJcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoaGlnaCwgbG93KTtcclxuICAgIH0pO1xyXG59XHJcbndpbmRvdy5kZWNvZGVVbmljb2RlID0gZGVjb2RlVW5pY29kZTtcclxuY29uc3Qgc3RyaWtlcyA9IHsgMDogXCIwXHUwMzM1XCIsIDE6IFwiMVx1MDMzNVwiLCAyOiBcIjJcdTAzMzVcIiwgMzogXCIzXHUwMzM1XCIsIDQ6IFwiNFx1MDMzNVwiLCA1OiBcIjVcdTAzMzVcIiwgNjogXCI2XHUwMzM1XCIsIDc6IFwiN1x1MDMzNVwiLCA4OiBcIjhcdTAzMzVcIiwgOTogXCI5XHUwMzM1XCIsIFwiLFwiOiBcIixcdTAzMzVcIiwgXCIuXCI6IFwiLlx1MDMzNVwiLCB9O1xyXG5leHBvcnQgZnVuY3Rpb24gc3RyaWtlKHcpIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHN0cmlrZXMpLmV2ZXJ5KHMgPT4gKHcgPSB3LnJlcGxhY2UobmV3IFJlZ0V4cChgWyR7c31dYCwgXCJnaVwiKSwgc3RyaWtlc1tzXSkpKSAmJiB3IH07XHJcbndpbmRvdy5zdHJpa2UgPSBzdHJpa2U7XHJcbmNvbnN0IEEgPSBbMHg2MSwgMHg0MSwgMHgzMF1cclxuICAgICwgQiA9IFsweDFENDFBLCAweDFENDAwLCAweDFEN0NFXVxyXG4gICAgLCBNID0gWzB4MUQ2OEEsIDB4MUQ2NzAsIDB4MUQ3RjZdXHJcbiAgICAsIGJobSA9IHdpbmRvdy5iaG0gPSB7fVxyXG4gICAgLCBlaG0gPSB3aW5kb3cuZWhtID0ge31cclxuICAgICwgY2htID0gd2luZG93LmNobSA9IHt9O1xyXG5mb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKylcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKGogPCAyID8gMjYgOiAxMCk7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGEgPSBmcm9tQ29kZVBvaW50KEFbal0gKyBpKTtcclxuICAgICAgICBiaG1bZnJvbUNvZGVQb2ludChCW2pdICsgaSldID0gYTtcclxuICAgICAgICBlaG1bZnJvbUNvZGVQb2ludChNW2pdICsgaSldID0gYTtcclxuICAgICAgICBjaG1baiA8IDIgPyBhIDogaV0gPSBmcm9tQ29kZVBvaW50KE1bal0gKyBpKVxyXG4gICAgfVxyXG5sZXQgZGhtO1xyXG5jb25zdCB1bmJvbGQgPSB3aW5kb3cudW5ib2xkID0gcGhyYXNlID0+IHBocmFzZSAmJiBBcnJheS5mcm9tKHBocmFzZSkubWFwKGJoID0+IGJobVtiaF0gfHwgZWhtW2JoXSB8fCBiaCkuam9pbihcIlwiKSxcclxuICAgIGJvbGQgPSB3aW5kb3cuYm9sZCA9IHBocmFzZSA9PiBwaHJhc2UgJiYgQXJyYXkuZnJvbShwaHJhc2UpLm1hcChjaCA9PiBjaG1bY2hdIHx8IGNoKS5qb2luKFwiXCIpLFxyXG4gICAgYm9sZHkgPSB3aW5kb3cuYm9sZHkgPSBwaHJhc2UgPT4gKGRobSB8fCAoKGRobSA9IHt9KSAmJiBPYmplY3Qua2V5cyhiaG0pLmZvckVhY2goa2V5ID0+IChkaG1bYmhtW2tleV1dID0ga2V5KSkpIHx8IDEpICYmIHBocmFzZSAmJiBBcnJheS5mcm9tKHBocmFzZSkubWFwKGNoID0+IGRobVtjaF0gfHwgY2gpLmpvaW4oXCJcIiksXHJcbiAgICBleHRyYWN0Qm9sZCA9IHdpbmRvdy5leHRyYWN0Qm9sZCA9IHRleHQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHMgPSBkZWNvZGVVbmljb2RlKHRleHQpO1xyXG4gICAgICAgIGNvbnN0IHBhcnRzID0gcy5zcGxpdCgvWy1cXHNdKy9nKTtcclxuICAgICAgICB2YXIgYm9sZCA9IHBhcnRzLm1hcCgoaywgaSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB1ID0gdW5ib2xkKGspO1xyXG4gICAgICAgICAgICBpZiAodSAhPT0gaylcclxuICAgICAgICAgICAgICAgIHJldHVybiBrO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgKS5maWx0ZXIoQm9vbGVhbikuam9pbihcIi1cIik7XHJcbiAgICAgICAgcmV0dXJuIGJvbGQ7XHJcbiAgICB9XHJcbmxldCBsYXp5Y3NzO1xyXG5leHBvcnQgZnVuY3Rpb24gbGF6eUNTUygpIHsgXHJcbiAgICByZXR1cm4gbGF6eWNzcyB8fCAobGF6eWNzcyA9ICQoXCI8bGF6eUNTUy8+XCIpLmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpWzBdKTtcclxufVxyXG5leHBvcnQgeyB1bmJvbGQsIGJvbGQsIGJvbGR5LCBleHRyYWN0Qm9sZCB9OyJdLAogICJtYXBwaW5ncyI6ICJBQUNBLE9BQU8sZ0JBQWdCO0FBRXZCLE1BQU0sYUFBYSxDQUFDLEdBQUcsSUFBSTtBQUMzQixNQUFNLFNBQVMsTUFBTSxVQUFVO0FBQy9CLE1BQU0sb0JBQW9CLG9CQUFJLEtBQUs7QUFDbkMsTUFBTSxtQkFBbUIsT0FBTztBQUVoQyxpQkFBaUIsT0FBTyxXQUFXLE9BQU87QUFBQSxFQUN0QyxPQUFPLE1BQU0sVUFBVTtBQUFBLEVBQ3ZCLFlBQVk7QUFDaEIsQ0FBQztBQUNELElBQUksd0JBQXdCLEtBQUssU0FBUyxJQUFJLEdBQUc7QUFFakQ7QUFJTyxnQkFBUyxVQUFVLE1BQU0sT0FBTyxNQUFNO0FBQ3pDLE1BQUksVUFBVTtBQUNkLE1BQUksTUFBTTtBQUNOLFFBQUksT0FBTyxvQkFBSSxLQUFLO0FBQ3BCLFNBQUssUUFBUSxLQUFLLFFBQVEsSUFBSyxPQUFPLEtBQUssS0FBSyxLQUFLLEdBQUs7QUFDMUQsY0FBVSxlQUFlLEtBQUssWUFBWTtBQUFBLEVBQzlDO0FBQ0EsV0FBUyxTQUFTLE9BQU8sT0FBTyxTQUFTLE1BQU0sVUFBVTtBQUM3RDtBQUVPLGdCQUFTLFVBQVUsTUFBTTtBQUM1QixNQUFJLFNBQVMsT0FBTztBQUNwQixNQUFJLEtBQUssU0FBUyxPQUFPLE1BQU0sR0FBRztBQUNsQyxXQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsUUFBUSxLQUFLO0FBQ2hDLFFBQUksSUFBSSxHQUFHLENBQUM7QUFDWixXQUFPLEVB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QUFNLEtBQUssTUFBTSxFQUFFLElBQUksUUFBTSxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQzdHLE9BQU8sT0FBTyxPQUFPLFlBQVUsVUFBVSxNQUFNLEtBQUssTUFBTSxFQUFFLElBQUksUUFBTSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQzVGLFFBQVEsT0FBTyxRQUFRLGFBQVcsUUFBUyxNQUFNLENBQUMsTUFBTSxPQUFPLEtBQUssR0FBRyxFQUFFLFFBQVEsU0FBUSxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksR0FBSSxLQUFNLE1BQU0sVUFBVSxNQUFNLEtBQUssTUFBTSxFQUFFLElBQUksUUFBTSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQ3RMLGNBQWMsT0FBTyxjQUFjLFVBQVE7QUFDdkMsUUFBTSxJQUFJLGNBQWMsSUFBSTtBQUM1QixRQUFNLFFBQVEsRUFBRSxNQUFNLFNBQVM7QUFDL0IsTUFBSUMsUUFBTyxNQUFNO0FBQUEsSUFBSSxDQUFDLEdBQUcsTUFBTTtBQUMzQixZQUFNLElBQUksT0FBTyxDQUFDO0FBQ2xCLFVBQUksTUFBTTtBQUNOLGVBQU87QUFBQTtBQUVQLGVBQU87QUFBQSxJQUNmO0FBQUEsRUFDQSxFQUFFLE9BQU8sT0FBTyxFQUFFLEtBQUssR0FBRztBQUMxQixTQUFPQTtBQUNYO0FBQ0osSUFBSTtBQUNHLGdCQUFTLFVBQVU7QUFDdEIsU0FBTyxZQUFZLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxTQUFTLElBQUksRUFBRSxDQUFDO0FBQzFFO0FBQ0EsU0FBUyxRQUFRLE1BQU0sT0FBTzsiLAogICJuYW1lcyI6IFsiZCIsICIkIiwgIl9fYXNzaWduIiwgInQiLCAibiIsICJlIiwgInIiLCAibyIsICJ3IiwgImJvbGQiXQp9Cg==
