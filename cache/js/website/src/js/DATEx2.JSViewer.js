export async function initJSVViewer() {
  const { isInView, isOutOfView } = await import("./utils.js");
  const noop = () => {
  };
  let cancel = noop;
  const registerCancel = (fn) => cancel = fn, globalRegisterCancel = registerCancel;
  const requestTimeout = (fn, delay, registerCancel2) => {
    if (!registerCancel2) {
      registerCancel2 = globalRegisterCancel;
    }
    ;
    const start = (/* @__PURE__ */ new Date()).getTime();
    const loop = () => {
      const delta = (/* @__PURE__ */ new Date()).getTime() - start;
      if (delta >= delay) {
        fn();
        registerCancel2(noop);
        return;
      }
      const raf = requestAnimationFrame(loop);
      registerCancel2(() => cancelAnimationFrame(raf));
    };
    if (delay <= 5) {
      const raf = requestAnimationFrame(loop);
      registerCancel2(() => cancelAnimationFrame(raf));
    } else setTimeout(loop, delay - 5);
  };
  !(function(t, e) {
    var n = e();
  })(this, function() {
    return (function(t) {
      var e = {};
      function n(r2) {
        if (e[r2]) return e[r2].exports;
        var i = e[r2] = { i: r2, l: false, exports: {} };
        return t[r2].call(i.exports, i, i.exports, n), i.l = true, i.exports;
      }
      return n.m = t, n.c = e, n.d = function(t2, e2, r2) {
        n.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: r2 });
      }, n.r = function(t2) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
      }, n.t = function(t2, e2) {
        if (1 & e2 && (t2 = n(t2)), 8 & e2) return t2;
        if (4 & e2 && "object" == typeof t2 && t2 && t2.__esModule) return t2;
        var r2 = /* @__PURE__ */ Object.create(null);
        if (n.r(r2), Object.defineProperty(r2, "default", { enumerable: true, value: t2 }), 2 & e2 && "string" != typeof t2)
          for (var i in t2)
            n.d(
              r2,
              i,
              function(e3) {
                return t2[e3];
              }.bind(null, i)
            );
        return r2;
      }, n.n = function(t2) {
        var e2 = t2 && t2.__esModule ? function() {
          return t2.default;
        } : function() {
          return t2;
        };
        return n.d(e2, "a", e2), e2;
      }, n.o = function(t2, e2) {
        return Object.prototype.hasOwnProperty.call(t2, e2);
      }, n.p = "", n(n.s = 5);
    })([
      function(t, e, n) {
        "use strict";
        var r2, i = this && this.__extends || (r2 = function(t2, e2) {
          return (r2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
            t3.__proto__ = e3;
          } || function(t3, e3) {
            for (var n2 in e3) e3.hasOwnProperty(n2) && (t3[n2] = e3[n2]);
          })(t2, e2);
        }, function(t2, e2) {
          function n2() {
            this.constructor = t2;
          }
          r2(t2, e2), t2.prototype = null === e2 ? Object.create(e2) : (n2.prototype = e2.prototype, new n2());
        });
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3) {
            var n2 = this;
            return e3 += " check the documentation", (n2 = t2.call(this, e3) || this).name = "360 JSV InputError", n2;
          }
          return i(e2, t2), e2;
        })(Error);
        e.default = o;
      },
      function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true }), e.mergeDeep = e.hexToRgb = e.now = e.removeEvent = e.addEvent = e.minusClient = e.plueClient = e.getAverageClient = e.getClient = e.getClients = e.getPositions = e.getDist = e.getPosition = e.getPositionEvent = e.isMultiTouch = e.getPinchDragPosition = e.getRotation = e.getRandomId = e.getRad = void 0;
        var r2 = n(12);
        function i(t2, e2) {
          var n2 = e2[0] - t2[0], r3 = e2[1] - t2[1], i2 = Math.atan2(r3, n2);
          return i2 >= 0 ? i2 : i2 + 2 * Math.PI;
        }
        function o(t2, e2, n2) {
          var r3 = t2.clientX, i2 = t2.clientY;
          return {
            clientX: r3,
            clientY: i2,
            deltaX: r3 - e2.clientX,
            deltaY: i2 - e2.clientY,
            distX: r3 - n2.clientX,
            distY: i2 - n2.clientY
          };
        }
        function a(t2) {
          for (var e2 = Math.min(t2.length, 2), n2 = [], r3 = 0; r3 < e2; ++r3) n2.push(s(t2[r3]));
          return n2;
        }
        function s(t2) {
          return { clientX: t2.clientX, clientY: t2.clientY };
        }
        function u(t2) {
          return 1 === t2.length ? t2[0] : {
            clientX: (t2[0].clientX + t2[1].clientX) / 2,
            clientY: (t2[0].clientY + t2[1].clientY) / 2
          };
        }
        function c(t2, e2) {
          return {
            clientX: t2.clientX + e2.clientX,
            clientY: t2.clientY + e2.clientY
          };
        }
        function l(t2, e2) {
          return {
            clientX: t2.clientX - e2.clientX,
            clientY: t2.clientY - e2.clientY
          };
        }
        e.getRad = i, e.getRandomId = function() {
          return "_" + Math.random().toString(36).substr(2, 3);
        }, e.getRotation = function(t2) {
          return i([t2[0].clientX, t2[0].clientY], [t2[1].clientX, t2[1].clientY]) / Math.PI * 180;
        }, e.getPinchDragPosition = function(t2, e2, n2, r3) {
          var i2 = u(t2), a2 = u(e2), s2 = u(r3);
          return o(c(r3[0], l(i2, s2)), c(r3[0], l(a2, s2)), n2[0]);
        }, e.isMultiTouch = function(t2) {
          return t2.touches && t2.touches.length >= 2;
        }, e.getPositionEvent = function(t2) {
          return t2.touches ? a(t2.touches) : [s(t2)];
        }, e.getPosition = o, e.getDist = function(t2) {
          return Math.sqrt(Math.pow(t2[0].clientX - t2[1].clientX, 2) + Math.pow(t2[0].clientY - t2[1].clientY, 2));
        }, e.getPositions = function(t2, e2, n2) {
          return t2.map(function(t3, r3) {
            return o(t3, e2[r3], n2[r3]);
          });
        }, e.getClients = a, e.getClient = s, e.getAverageClient = u, e.plueClient = c, e.minusClient = l, e.addEvent = function(t2, e2, n2, r3) {
          t2.addEventListener(e2, n2, r3);
        }, e.removeEvent = function(t2, e2, n2) {
          t2.removeEventListener(e2, n2);
        }, e.now = function() {
          return Date.now ? Date.now() : (/* @__PURE__ */ new Date()).getTime();
        }, e.hexToRgb = function(t2) {
          var e2 = r2(t2);
          return e2 ? { r: e2.rgba[0], g: e2.rgba[1], b: e2.rgba[2], a: e2.rgba[3] } : null;
        }, e.mergeDeep = function t2(e2) {
          var n2 = e2.objects, r3 = function(t3) {
            return t3 && "object" == typeof t3;
          };
          return n2.reduce(function(e3, n3) {
            return Object.keys(n3).forEach(function(i2) {
              var o2 = e3[i2], a2 = n3[i2];
              Array.isArray(o2) && Array.isArray(a2) ? e3[i2] = o2.concat.apply(o2, a2) : r3(o2) && r3(a2) ? e3[i2] = t2({ objects: [o2, a2] }) : e3[i2] = a2;
            }), e3;
          }, {});
        };
      },
      function(t, e) {
        var n = /^\s+|\s+$/g, r2 = /^[-+]0x[0-9a-f]+$/i, i = /^0b[01]+$/i, o = /^0o[0-7]+$/i, a = parseInt, s = Object.prototype.toString;
        function u(t2, e2) {
          var u2;
          if ("function" != typeof e2) throw new TypeError("Expected a function");
          return t2 = (function(t3) {
            var e3 = (function(t4) {
              if (!t4) return 0 === t4 ? t4 : 0;
              if ((t4 = (function(t5) {
                if ("number" == typeof t5) return t5;
                if ((function(t6) {
                  return "symbol" == typeof t6 || /* @__PURE__ */ (function(t7) {
                    return !!t7 && "object" == typeof t7;
                  })(t6) && "[object Symbol]" == s.call(t6);
                })(t5))
                  return NaN;
                if (c(t5)) {
                  var e4 = "function" == typeof t5.valueOf ? t5.valueOf() : t5;
                  t5 = c(e4) ? e4 + "" : e4;
                }
                if ("string" != typeof t5) return 0 === t5 ? t5 : +t5;
                t5 = t5.replace(n, "");
                var u4 = i.test(t5);
                return u4 || o.test(t5) ? a(t5.slice(2), u4 ? 2 : 8) : r2.test(t5) ? NaN : +t5;
              })(t4)) === 1 / 0 || t4 === -1 / 0) {
                return 17976931348623157e292 * (t4 < 0 ? -1 : 1);
              }
              return t4 == t4 ? t4 : 0;
            })(t3), u3 = e3 % 1;
            return e3 == e3 ? u3 ? e3 - u3 : e3 : 0;
          })(t2), function() {
            return --t2 > 0 && (u2 = e2.apply(this, arguments)), t2 <= 1 && (e2 = void 0), u2;
          };
        }
        function c(t2) {
          var e2 = typeof t2;
          return !!t2 && ("object" == e2 || "function" == e2);
        }
        t.exports = function(t2) {
          return u(2, t2);
        };
      },
      function(t, e, n) {
        "use strict";
        var r2 = this && this.__awaiter || function(t2, e2, n2, r3) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function a2(t3) {
              try {
                u(r3.next(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function s(t3) {
              try {
                u(r3.throw(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function u(t3) {
              var e3;
              t3.done ? i2(t3.value) : (e3 = t3.value, e3 instanceof n2 ? e3 : new n2(function(t4) {
                t4(e3);
              })).then(a2, s);
            }
            u((r3 = r3.apply(t2, e2 || [])).next());
          });
        }, i = this && this.__generator || function(t2, e2) {
          var n2, r3, i2, o2, a2 = {
            label: 0,
            sent: function() {
              if (1 & i2[0]) throw i2[1];
              return i2[1];
            },
            trys: [],
            ops: []
          };
          return o2 = { next: s(0), throw: s(1), return: s(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function s(o3) {
            return function(s2) {
              return (function(o4) {
                if (n2) throw new TypeError("Generator is already executing.");
                for (; a2; )
                  try {
                    if (n2 = 1, r3 && (i2 = 2 & o4[0] ? r3.return : o4[0] ? r3.throw || ((i2 = r3.return) && i2.call(r3), 0) : r3.next) && !(i2 = i2.call(r3, o4[1])).done) return i2;
                    switch (r3 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                      case 0:
                      case 1:
                        i2 = o4;
                        break;
                      case 4:
                        return a2.label++, { value: o4[1], done: false };
                      case 5:
                        a2.label++, r3 = o4[1], o4 = [0];
                        continue;
                      case 7:
                        o4 = a2.ops.pop(), a2.trys.pop();
                        continue;
                      default:
                        if (!(i2 = a2.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                          a2 = 0;
                          continue;
                        }
                        if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                          a2.label = o4[1];
                          break;
                        }
                        if (6 === o4[0] && a2.label < i2[1]) {
                          a2.label = i2[1], i2 = o4;
                          break;
                        }
                        if (i2 && a2.label < i2[2]) {
                          a2.label = i2[2], a2.ops.push(o4);
                          break;
                        }
                        i2[2] && a2.ops.pop(), a2.trys.pop();
                        continue;
                    }
                    o4 = e2.call(t2, a2);
                  } catch (t3) {
                    o4 = [6, t3], r3 = 0;
                  } finally {
                    n2 = i2 = 0;
                  }
                if (5 & o4[0]) throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              })([o3, s2]);
            };
          }
        };
        Object.defineProperty(e, "__esModule", { value: true }), e.DomUtilities = void 0;
        var o = n(0), a = (function() {
          function t2() {
          }
          return t2.addHiddenStyle = function(t3, e2, n2) {
            return void 0 === n2 && (n2 = 100), r2(this, void 0, void 0, function() {
              var n3 = this;
              return i(this, function(o2) {
                return [
                  2,
                  new Promise(function(o3, a2) {
                    return r2(n3, void 0, void 0, function() {
                      var n4;
                      return i(this, function(r3) {
                        return null === (n4 = e2.document.getElementById(t3)) ? a2() : (n4.classList.remove("jsv-show"), n4.classList.add("jsv-hidden"), setTimeout(function() {
                          o3();
                        }, 2e3)), [2];
                      });
                    });
                  })
                ];
              });
            });
          }, t2.hideImageSlow = function(t3, e2, n2) {
            return void 0 === n2 && (n2 = 100), r2(this, void 0, void 0, function() {
              var o2 = this;
              return i(this, function(a2) {
                return [
                  2,
                  new Promise(function(a3, s) {
                    return r2(o2, void 0, void 0, function() {
                      var r3, o3, u;
                      return i(this, function(i2) {
                        return "" === t3 && a3(), null === (r3 = e2.document.getElementById(t3)) ? s() : (o3 = 1, u = setInterval(function() {
                          (o3 -= 50 / n2) <= 0 && (clearInterval(u), o3 = 0, /*r.style.removeProperty("display"),*/
                          r3.id != "i0" ? r3.style.display = "none" : "", //(r.style.visibility = "hidden"),
                          a3()), r3.style.opacity = "" + o3, r3.style.filter = "alpha(opacity=" + 100 * o3 + ")";
                        }, 50)), [2];
                      });
                    });
                  })
                ];
              });
            });
          }, t2.addShowStyle = function(t3, e2, n2) {
            return void 0 === n2 && (n2 = 100), r2(this, void 0, void 0, function() {
              var n3 = this;
              return i(this, function(o2) {
                return [
                  2,
                  new Promise(function(o3, a2) {
                    return r2(n3, void 0, void 0, function() {
                      var n4;
                      return i(this, function(r3) {
                        return null === (n4 = e2.document.getElementById(t3)) ? a2() : (n4.classList.remove("jsv-hidden"), n4.classList.add("jsv-show"), setTimeout(function() {
                          o3();
                        }, 2e3)), [2];
                      });
                    });
                  })
                ];
              });
            });
          }, t2.addStyles = function(t3) {
            if (document.getElementById("jsv-styles")) return;
            var e2 = t3.document.createElement("style");
            e2.id = "jsv-styles";
            e2.innerText = ".jsv-hidden { opacity:0; display: none; transition: opacity .8s ease-in-out } .jsv-show {  opacity:1; display:unset; transition: opacity .8s ease-in-out } .jsv-width-100 { width: 100%; } .jsv-height-100 { height: 100%; } ", document.head.appendChild(e2);
          }, t2.hideImage = function(t3, e2, newVisibleImage, newVisibleImageIndex, jsv) {
            var n2 = e2.document.getElementById(t3.id), i2;
            if (!n2) return;
            n2.style.zIndex = 1, navigator.isSafari ? "" : navigator.isWebkit ? jsv.hideMainElement ? newVisibleImage.img.naturalWidth > 0 && (n2.parentNode.style.display = "none") || (i2 = setInterval((t4) => newVisibleImage.img.naturalWidth > 0 && (n2.parentNode.style.display = "none") && clearInterval(i2), 5)) : i2 = setInterval((t4) => newVisibleImage.img.naturalWidth > 0 && (jsv.hideMainElement = true) && jsv?.mainImage?.img && (jsv.mainImage.img.style.display = "none") && (n2.parentNode.style.display = "none") && clearInterval(i2), 5) : (n2.parentNode.style.display = "none") && (jsv.hideMainElement || (jsv.hideMainElement = true) && (jsv.mainImage.img.style.display = "none"));
          }, t2.b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
            const byteCharacters = atob(b64Data);
            const byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
              const slice = byteCharacters.slice(offset, offset + sliceSize);
              const byteNumbers = new Array(slice.length);
              for (let i2 = 0; i2 < slice.length; i2++) {
                byteNumbers[i2] = slice.charCodeAt(i2);
              }
              const byteArray = new Uint8Array(byteNumbers);
              byteArrays.push(byteArray);
            }
            const blob = new Blob(byteArrays, { type: contentType });
            return blob;
          }, t2.showImage = async function(t3, e2) {
            const n2 = t3.img;
            if (!n2) return;
            if (navigator.isSafari) {
              const i0 = t3.i0?.img;
              if (i0?.style) {
                if (i0.parentNode.style.display != "block") {
                  i0.parentNode.style.display = "block";
                }
                if (!t3.blob) {
                  let parseAsBlob = function(base64Str) {
                    const b64 = base64Str.substr("data:image/webp;base64,".length);
                    if (!b64) return base64Str;
                    const b64toBlob = (b642, contentType = "", sliceSize = 4096) => {
                      const byteCharacters = atob(b642);
                      const byteArrays = [];
                      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                        const slice = byteCharacters.slice(offset, offset + sliceSize);
                        const byteNumbers = new Array(slice.length);
                        for (let i2 = 0; i2 < slice.length; i2++) {
                          byteNumbers[i2] = slice.charCodeAt(i2);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        byteArrays.push(byteArray);
                      }
                      const blob2 = new Blob(byteArrays, { type: contentType });
                      return blob2;
                    };
                    const blob = b64toBlob(b64, "image/webp");
                    const blobObject = URL.createObjectURL(blob);
                    return blobObject;
                  };
                  let src = t3.src || t3.img.style.content || getComputedStyle(t3.img).content;
                  if (src.startsWith(`url("`)) {
                    src = src.substring(5, src.length - 2);
                  }
                  t3.blob = src && parseAsBlob(src);
                }
                if (t3.blob && !i0.classI0) {
                  i0.classI0 = true;
                  i0.classList.remove("i0");
                }
                i0.src = t3.blob;
              }
            } else {
              n2?.parentNode && (n2.parentNode.style.display = "block"), n2 && (n2.style.zIndex = 2), n2?.parentNode && n2.parentNode.style.removeProperty("transform");
            }
          }, t2.getImageHolderElement = function(t3, e2, n2, r3, i2) {
            var o2, a2, s, u, c = t3.document.createElement("div"), l = null !== (o2 = r3[0]) && void 0 !== o2 ? o2 : null;
            if (i2.autoCDNResizer && i2.zoom && null !== l && (null === (a2 = i2.autoCDNResizerConfig) || void 0 === a2 ? void 0 : a2.scaleWithZoomMax)) {
              if (null === (s = i2.autoCDNResizerConfig) || void 0 === s ? void 0 : s.useWidth) {
                var d = l.naturalWidth;
                d /= i2.zoomMax, c.style.maxWidth = d + "px";
              }
              if (null === (u = i2.autoCDNResizerConfig) || void 0 === u ? void 0 : u.useHeight) {
                var h = l.naturalHeight;
                h /= i2.zoomMax, c.style.height = h + "px";
              }
            }
            return c.style.padding = "0", c.style.margin = "0", c.style.position = "relative", c.style.zIndex = 0, //(c.style.overflow = "hidden"),
            //(c.style.maxHeight = "0px"),
            c.style.display = navigator.isWebkit ? "block" : "none", c.className = "jsv-inner", c.id = n2, c;
          }, t2.removeElement = function(t3) {
            if (null !== t3 && t3 && t3.parentNode && t3.hasChildNodes())
              try {
                t3.parentNode.removeChild(t3);
              } catch (t4) {
                return;
              }
          }, t2.getMainHolderElement = function(t3, e2, n2, r3) {
            var i2 = e2.document.getElementById(t3);
            if (i2 instanceof HTMLDivElement) return i2.style.position = "relative", i2;
            throw new o.default('Could not find main holder with id "' + t3 + '". Did you create an element like <div id="' + t3 + '"></div>');
          }, t2.createLink = function(t3, e2) {
            var n2 = t3.document.createElement("a");
            n2.title = atob("MzYwIHByb2R1Y3Qgdmlld2VyLCAzNjAgc3Bpbg=="), n2.style.position = "absolute", n2.style.bottom = "10px", n2.style.right = "10px", n2.style.zIndex = "300", n2.style.color = "#ccc", n2.href = atob("aHR0cHM6Ly93d3cuMzYwLWphdmFzY3JpcHR2aWV3ZXIuY29t"), n2.innerText = atob("MzYwIHByb2R1Y3Qgdmlld2Vy"), e2.appendChild(n2);
          }, t2.getImageElement = function(t3, e2) {
            var n2 = t3.img || e2.document.createElement("img");
            n2.onload = t3.onloaded;
            return n2.src = t3.src, //(n.style.display = navigator.isFirefox ? "block" : 'none'),
            /***"",LAUt.src,*/
            n2.id = t3.id, /***LAUn.style.userSelect = 'none',*/
            /*LAUn.style.zIndex = 0,*/
            n2.style.touchAction = "pan-x", n2.style.touchAction = "pan-y", t3.extraClass.length > 0 && t3.extraClass.split(" ").forEach(function(t4) {
              t4.length > 0 && n2.classList.add(t4.trim());
            }), n2;
          }, t2.setPointer = function(t3, e2) {
            t3.style.cursor = e2;
          }, t2.setTouchAction = function(t3, e2) {
            e2 && (t3.style.touchAction = e2);
          }, t2;
        })();
        e.DomUtilities = a;
      },
      function(t, e) {
        t.exports = (function(t2) {
          var e2 = {};
          function n(r2) {
            if (e2[r2]) return e2[r2].exports;
            var i = e2[r2] = { i: r2, l: false, exports: {} };
            return t2[r2].call(i.exports, i, i.exports, n), i.l = true, i.exports;
          }
          return n.m = t2, n.c = e2, n.d = function(t3, e3, r2) {
            n.o(t3, e3) || Object.defineProperty(t3, e3, { enumerable: true, get: r2 });
          }, n.r = function(t3) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t3, "__esModule", { value: true });
          }, n.t = function(t3, e3) {
            if (1 & e3 && (t3 = n(t3)), 8 & e3) return t3;
            if (4 & e3 && "object" == typeof t3 && t3 && t3.__esModule) return t3;
            var r2 = /* @__PURE__ */ Object.create(null);
            if (n.r(r2), Object.defineProperty(r2, "default", { enumerable: true, value: t3 }), 2 & e3 && "string" != typeof t3)
              for (var i in t3)
                n.d(
                  r2,
                  i,
                  function(e4) {
                    return t3[e4];
                  }.bind(null, i)
                );
            return r2;
          }, n.n = function(t3) {
            var e3 = t3 && t3.__esModule ? function() {
              return t3.default;
            } : function() {
              return t3;
            };
            return n.d(e3, "a", e3), e3;
          }, n.o = function(t3, e3) {
            return Object.prototype.hasOwnProperty.call(t3, e3);
          }, n.p = "", n(n.s = 4);
        })([
          function(t2, e2, n) {
            "use strict";
            function r2(t3, e3, n2) {
              return e3 in t3 ? Object.defineProperty(t3, e3, {
                value: n2,
                enumerable: true,
                configurable: true,
                writable: true
              }) : t3[e3] = n2, t3;
            }
            function i(t3) {
              if (Array.isArray(t3)) {
                for (var e3 = 0, n2 = Array(t3.length); e3 < t3.length; e3++) n2[e3] = t3[e3];
                return n2;
              }
              return Array.from(t3);
            }
            Object.defineProperty(e2, "__esModule", { value: true });
            var o = n(1), a = n(2), s = function() {
              throw new Error("Slot not connected");
            };
            e2.defaultSlotConfig = { noBuffer: false };
            var u = function(t3) {
              return Object.assign(
                function() {
                  return s();
                },
                {
                  config: t3,
                  lazy: function() {
                    return s;
                  },
                  on: function() {
                    return s;
                  },
                  slotName: "Not connected"
                }
              );
            }, c = function(t3, e3) {
              return Object.keys(e3).reduce(function(n2, r3) {
                return n2.concat(e3[r3][t3] || []);
              }, []);
            }, l = function(t3) {
              return Object.keys(t3).reduce(function(e3, n2) {
                var r3 = t3[n2], o2 = Object.keys(r3).filter(function(t4) {
                  return (r3[t4] || []).length > 0;
                }), a2 = [].concat(i(e3), i(o2));
                return [].concat(i(new Set(a2)));
              }, []);
            };
            e2.slot = function() {
              var t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : e2.defaultSlotConfig;
              return u(t3);
            }, e2.connectSlot = function(t3, e3) {
              var n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, s2 = e3.reduce(function(t4, e4, n3) {
                return Object.assign({}, t4, r2({}, n3, {}));
              }, r2({}, "LOCAL_TRANSPORT", {})), u2 = e3.reduce(function(t4, e4, n3) {
                return Object.assign({}, t4, r2({}, n3, {}));
              }, {}), d = function(t4, e4) {
                var n3 = function() {
                }, r3 = new Promise(function(t5) {
                  return n3 = t5;
                });
                u2[t4][e4] = { registered: r3, onRegister: n3 };
              }, h = [], f = [], g2 = function(t4) {
                return h.forEach(function(e4) {
                  return e4(t4);
                });
              }, p = function(t4) {
                return f.forEach(function(e4) {
                  return e4(t4);
                });
              };
              function m(t4, r3) {
                var l2 = 2 === arguments.length, h2 = l2 ? r3 : t4, f2 = l2 ? t4 : a.DEFAULT_PARAM;
                if (n2.noBuffer || 0 === e3.length) {
                  var g3 = c(f2, s2);
                  return o.callHandlers(h2, g3);
                }
                e3.forEach(function(t5, e4) {
                  u2[e4][f2] || d(String(e4), f2);
                });
                var p2 = e3.reduce(function(t5, e4, n3) {
                  return [].concat(i(t5), [u2[n3][f2].registered]);
                }, []);
                return Promise.all(p2).then(function() {
                  var t5 = c(f2, s2);
                  return o.callHandlers(h2, t5);
                });
              }
              function v(t4, e4) {
                return h.push(t4), f.push(e4), l(s2).forEach(t4), function() {
                  l(s2).forEach(e4);
                  var n3 = h.indexOf(t4);
                  n3 > -1 && h.splice(n3, 1);
                  var r3 = f.indexOf(e4);
                  r3 > -1 && f.splice(r3, 1);
                };
              }
              function y(n3, r3) {
                var i2 = "", o2 = function() {
                  return new Promise(function(t4) {
                    return t4();
                  });
                };
                return "string" == typeof n3 ? (i2 = n3, o2 = r3 || o2) : (i2 = a.DEFAULT_PARAM, o2 = n3), e3.forEach(function(e4) {
                  return e4.registerHandler(t3, i2, o2);
                }), s2.LOCAL_TRANSPORT[i2] = (s2.LOCAL_TRANSPORT[i2] || []).concat(o2), 1 === c(i2, s2).length && g2(i2), function() {
                  e3.forEach(function(e4) {
                    return e4.unregisterHandler(t3, i2, o2);
                  });
                  var n4 = (s2.LOCAL_TRANSPORT[i2] || []).indexOf(o2);
                  -1 !== n4 && s2.LOCAL_TRANSPORT[i2].splice(n4, 1), 0 === c(i2, s2).length && p(i2);
                };
              }
              return e3.forEach(function(e4, n3) {
                e4.addRemoteHandlerRegistrationCallback(t3, function() {
                  var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a.DEFAULT_PARAM, e5 = arguments[1], r3 = s2[n3][t4] || [];
                  s2[n3][t4] = r3.concat(e5), 1 === c(t4, s2).length && g2(t4), u2[n3][t4] || d(String(n3), t4), u2[n3][t4].onRegister();
                }), e4.addRemoteHandlerUnregistrationCallback(t3, function() {
                  var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a.DEFAULT_PARAM, e5 = arguments[1], r3 = s2[n3][t4] || [], i2 = r3.indexOf(e5);
                  i2 > -1 && s2[n3][t4].splice(i2, 1), 0 === c(t4, s2).length && p(t4), d(String(n3), t4);
                });
              }), Object.assign(m, { on: y, lazy: v, config: n2, slotName: t3 });
            };
          },
          function(t2, e2, n) {
            "use strict";
            function r2(t3, e3) {
              var n2 = null;
              try {
                n2 = t3(e3);
              } catch (t4) {
                return Promise.reject(t4);
              }
              return n2 && n2.then ? n2 : Promise.resolve(n2);
            }
            Object.defineProperty(e2, "__esModule", { value: true }), e2.callHandlers = function(t3, e3) {
              return e3 && 0 !== e3.length ? 1 === e3.length ? r2(e3[0], t3) : Promise.all(
                e3.map(function(e4) {
                  return r2(e4, t3);
                })
              ) : new Promise(function(t4) {
              });
            };
          },
          function(t2, e2, n) {
            "use strict";
            Object.defineProperty(e2, "__esModule", { value: true }), e2.DEFAULT_PARAM = "$_DEFAULT_$";
          },
          function(t2, e2, n) {
            "use strict";
            var r2 = /* @__PURE__ */ (function() {
              function t3(t4, e3) {
                for (var n2 = 0; n2 < e3.length; n2++) {
                  var r3 = e3[n2];
                  r3.enumerable = r3.enumerable || false, r3.configurable = true, "value" in r3 && (r3.writable = true), Object.defineProperty(t4, r3.key, r3);
                }
              }
              return function(e3, n2, r3) {
                return n2 && t3(e3.prototype, n2), r3 && t3(e3, r3), e3;
              };
            })();
            function i(t3, e3) {
              if (!(t3 instanceof e3)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(e2, "__esModule", { value: true });
            var o = (function() {
              function t3() {
                var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5e3;
                i(this, t3), this._timeout = e3, this._onMessageCallbacks = [], this._onConnectCallbacks = [], this._onDisconnectCallbacks = [], this._onErrorCallbacks = [], this._ready = false;
              }
              return r2(t3, [
                {
                  key: "onData",
                  value: function(t4) {
                    -1 === this._onMessageCallbacks.indexOf(t4) && this._onMessageCallbacks.push(t4);
                  }
                },
                {
                  key: "onConnect",
                  value: function(t4) {
                    this._ready && t4(), this._onConnectCallbacks.push(t4);
                  }
                },
                {
                  key: "onDisconnect",
                  value: function(t4) {
                    this._onDisconnectCallbacks.push(t4);
                  }
                },
                {
                  key: "onError",
                  value: function(t4) {
                    this._onErrorCallbacks.push(t4);
                  }
                },
                {
                  key: "_messageReceived",
                  value: function(t4) {
                    this._onMessageCallbacks.forEach(function(e3) {
                      return e3(t4);
                    });
                  }
                },
                {
                  key: "_error",
                  value: function(t4) {
                    this._onErrorCallbacks.forEach(function(e3) {
                      return e3(t4);
                    });
                  }
                },
                {
                  key: "_connected",
                  value: function() {
                    this._ready = true, this._onConnectCallbacks.forEach(function(t4) {
                      return t4();
                    });
                  }
                },
                {
                  key: "_disconnected",
                  value: function() {
                    this._ready = false, this._onDisconnectCallbacks.forEach(function(t4) {
                      return t4();
                    });
                  }
                },
                {
                  key: "timeout",
                  get: function() {
                    return this._timeout;
                  }
                }
              ]), t3;
            })();
            e2.GenericChannel = o;
          },
          function(t2, e2, n) {
            t2.exports = n(5);
          },
          function(t2, e2, n) {
            "use strict";
            Object.defineProperty(e2, "__esModule", { value: true });
            var r2 = n(0);
            e2.slot = r2.slot;
            var i = n(6);
            e2.combineEvents = i.combineEvents, e2.createEventBus = i.createEventBus;
            var o = n(3);
            e2.GenericChannel = o.GenericChannel;
            var a = n(8);
            e2.ChunkedChannel = a.ChunkedChannel;
            var s = n(2);
            e2.DEFAULT_PARAM = s.DEFAULT_PARAM;
          },
          function(t2, e2, n) {
            "use strict";
            function r2(t3) {
              if (Array.isArray(t3)) {
                for (var e3 = 0, n2 = Array(t3.length); e3 < t3.length; e3++) n2[e3] = t3[e3];
                return n2;
              }
              return Array.from(t3);
            }
            Object.defineProperty(e2, "__esModule", { value: true });
            var i = n(0), o = n(7);
            e2.combineEvents = function(t3, e3, n2, i2, o2, a, s, u, c, l, d, h, f, g2, p, m, v, y, b2, w, x, E, R, I) {
              var _ = Array.from(arguments), k = _.reduce(function(t4, e4) {
                return [].concat(r2(t4), r2(Object.keys(e4)));
              }, []), C = [].concat(r2(new Set(k)));
              if (k.length > C.length) throw new Error("ts-event-bus: duplicate slots encountered in combineEvents.");
              return Object.assign.apply(Object, [{}].concat(r2(_)));
            }, e2.createEventBus = function(t3) {
              var e3 = (t3.channels || []).map(function(t4) {
                return new o.Transport(t4);
              });
              return Object.keys(t3.events).reduce(function(n2, r3) {
                var o2 = t3.events[r3].config;
                return n2[r3] = i.connectSlot(r3, e3, o2), n2;
              }, {});
            };
          },
          function(t2, e2, n) {
            "use strict";
            var r2 = /* @__PURE__ */ (function() {
              function t3(t4, e3) {
                for (var n2 = 0; n2 < e3.length; n2++) {
                  var r3 = e3[n2];
                  r3.enumerable = r3.enumerable || false, r3.configurable = true, "value" in r3 && (r3.writable = true), Object.defineProperty(t4, r3.key, r3);
                }
              }
              return function(e3, n2, r3) {
                return n2 && t3(e3.prototype, n2), r3 && t3(e3, r3), e3;
              };
            })();
            Object.defineProperty(e2, "__esModule", { value: true });
            var i = n(1), o = 0, a = (function() {
              function t3(e3) {
                var n2 = this;
                !(function(t4, e4) {
                  if (!(t4 instanceof e4)) throw new TypeError("Cannot call a class as a function");
                })(this, t3), this._channel = e3, this._localHandlers = {}, this._localHandlerRegistrations = {}, this._remoteHandlers = {}, this._remoteHandlerRegistrationCallbacks = {}, this._remoteHandlerDeletionCallbacks = {}, this._pendingRequests = {}, this._channelReady = false, this._channel.onData(function(t4) {
                  switch (t4.type) {
                    case "request":
                      return n2._requestReceived(t4);
                    case "response":
                      return n2._responseReceived(t4);
                    case "handler_registered":
                      return n2._registerRemoteHandler(t4);
                    case "handler_unregistered":
                      return n2._unregisterRemoteHandler(t4);
                    case "error":
                      return n2._errorReceived(t4);
                    default:
                      !(function(t5) {
                        throw new Error("Should not happen: " + t5);
                      })(t4);
                  }
                }), this._channel.onConnect(function() {
                  n2._channelReady = true, Object.keys(n2._localHandlerRegistrations).forEach(function(t4) {
                    n2._localHandlerRegistrations[t4].forEach(function(t5) {
                      n2._channel.send(t5);
                    });
                  });
                }), this._channel.onDisconnect(function() {
                  n2._channelReady = false, n2._unregisterAllRemoteHandlers(), n2._rejectAllPendingRequests(new Error("REMOTE_CONNECTION_CLOSED"));
                }), this._channel.onError(function(t4) {
                  return n2._rejectAllPendingRequests(t4);
                });
              }
              return r2(t3, [
                {
                  key: "_requestReceived",
                  value: function(t4) {
                    var e3 = this, n2 = t4.slotName, r3 = t4.data, o2 = t4.id, a2 = t4.param, s = this._localHandlers[n2];
                    if (s) {
                      var u = s[a2];
                      u && i.callHandlers(r3, u).then(function(t5) {
                        return e3._channel.send({
                          type: "response",
                          slotName: n2,
                          id: o2,
                          data: t5,
                          param: a2
                        });
                      }).catch(function(t5) {
                        return e3._channel.send({
                          id: o2,
                          message: "" + t5,
                          param: a2,
                          slotName: n2,
                          stack: t5.stack || "",
                          type: "error"
                        });
                      });
                    }
                  }
                },
                {
                  key: "_responseReceived",
                  value: function(t4) {
                    var e3 = t4.slotName, n2 = t4.data, r3 = t4.id, i2 = t4.param, o2 = this._pendingRequests[e3];
                    o2 && o2[i2] && o2[i2][r3] && (o2[i2][r3].resolve(n2), delete o2[i2][r3]);
                  }
                },
                {
                  key: "_errorReceived",
                  value: function(t4) {
                    var e3 = t4.slotName, n2 = t4.id, r3 = t4.message, i2 = t4.stack, o2 = t4.param, a2 = this._pendingRequests[e3];
                    if (a2 && a2[o2] && a2[o2][n2]) {
                      var s = new Error(r3 + " on " + e3 + " with param " + o2);
                      s.stack = i2 || s.stack, this._pendingRequests[e3][o2][n2].reject(s), delete this._pendingRequests[e3][o2][n2];
                    }
                  }
                },
                {
                  key: "_registerRemoteHandler",
                  value: function(t4) {
                    var e3 = this, n2 = t4.slotName, r3 = t4.param, i2 = this._remoteHandlerRegistrationCallbacks[n2];
                    if (i2) {
                      var a2 = this._remoteHandlers[n2];
                      if (!a2 || !a2[r3]) {
                        var s = function(t5) {
                          return new Promise(function(i3, a3) {
                            if (!e3._channelReady) return a3(new Error("CHANNEL_NOT_READY on " + n2));
                            var s2 = "" + o++;
                            e3._pendingRequests[n2] = e3._pendingRequests[n2] || {}, e3._pendingRequests[n2][r3] = e3._pendingRequests[n2][r3] || {}, e3._pendingRequests[n2][r3][s2] = {
                              resolve: i3,
                              reject: a3
                            }, e3._channel.send({
                              type: "request",
                              id: s2,
                              slotName: n2,
                              param: r3,
                              data: t5
                            }), setTimeout(function() {
                              var t6 = ((e3._pendingRequests[n2] || {})[r3] || {})[s2];
                              if (t6) {
                                var i4 = new Error("TIMED_OUT on " + n2 + " with param " + r3);
                                t6.reject(i4), delete e3._pendingRequests[n2][r3][s2];
                              }
                            }, e3._channel.timeout);
                          });
                        };
                        this._remoteHandlers[n2] = this._remoteHandlers[n2] || {}, this._remoteHandlers[n2][r3] = s, i2(r3, s);
                      }
                    }
                  }
                },
                {
                  key: "_unregisterRemoteHandler",
                  value: function(t4) {
                    var e3 = t4.slotName, n2 = t4.param, r3 = this._remoteHandlerDeletionCallbacks[e3], i2 = this._remoteHandlers[e3];
                    if (i2) {
                      var o2 = i2[n2];
                      o2 && r3 && (r3(n2, o2), delete this._remoteHandlers[e3][n2]);
                    }
                  }
                },
                {
                  key: "_unregisterAllRemoteHandlers",
                  value: function() {
                    var t4 = this;
                    Object.keys(this._remoteHandlerDeletionCallbacks).forEach(function(e3) {
                      var n2 = t4._remoteHandlers[e3];
                      n2 && Object.keys(n2).filter(function(t5) {
                        return n2[t5];
                      }).forEach(function(n3) {
                        return t4._unregisterRemoteHandler({
                          slotName: e3,
                          param: n3
                        });
                      });
                    });
                  }
                },
                {
                  key: "_rejectAllPendingRequests",
                  value: function(t4) {
                    var e3 = this;
                    Object.keys(this._pendingRequests).forEach(function(n2) {
                      Object.keys(e3._pendingRequests[n2]).forEach(function(r3) {
                        Object.keys(e3._pendingRequests[n2][r3]).forEach(function(i2) {
                          e3._pendingRequests[n2][r3][i2].reject(t4);
                        });
                      }), e3._pendingRequests[n2] = {};
                    });
                  }
                },
                {
                  key: "addRemoteHandlerRegistrationCallback",
                  value: function(t4, e3) {
                    this._remoteHandlerRegistrationCallbacks[t4] || (this._remoteHandlerRegistrationCallbacks[t4] = e3);
                  }
                },
                {
                  key: "addRemoteHandlerUnregistrationCallback",
                  value: function(t4, e3) {
                    this._remoteHandlerDeletionCallbacks[t4] || (this._remoteHandlerDeletionCallbacks[t4] = e3);
                  }
                },
                {
                  key: "registerHandler",
                  value: function(t4, e3, n2) {
                    if (this._localHandlers[t4] = this._localHandlers[t4] || {}, this._localHandlers[t4][e3] = this._localHandlers[t4][e3] || [], this._localHandlers[t4][e3].push(n2), 1 === this._localHandlers[t4][e3].length) {
                      var r3 = {
                        type: "handler_registered",
                        param: e3,
                        slotName: t4
                      };
                      this._localHandlerRegistrations[e3] = this._localHandlerRegistrations[e3] || [], this._localHandlerRegistrations[e3].push(r3), this._channelReady && this._channel.send(r3);
                    }
                  }
                },
                {
                  key: "unregisterHandler",
                  value: function(t4, e3, n2) {
                    var r3 = this._localHandlers[t4];
                    if (r3 && r3[e3]) {
                      var i2 = r3[e3].indexOf(n2);
                      if (i2 > -1 && (r3[e3].splice(i2, 1), 0 === r3[e3].length)) {
                        var o2 = {
                          type: "handler_unregistered",
                          param: e3,
                          slotName: t4
                        };
                        this._channelReady && this._channel.send(o2);
                      }
                    }
                  }
                }
              ]), t3;
            })();
            e2.Transport = a;
          },
          function(t2, e2, n) {
            "use strict";
            var r2 = /* @__PURE__ */ (function() {
              function t3(t4, e3) {
                for (var n2 = 0; n2 < e3.length; n2++) {
                  var r3 = e3[n2];
                  r3.enumerable = r3.enumerable || false, r3.configurable = true, "value" in r3 && (r3.writable = true), Object.defineProperty(t4, r3.key, r3);
                }
              }
              return function(e3, n2, r3) {
                return n2 && t3(e3.prototype, n2), r3 && t3(e3, r3), e3;
              };
            })(), i = function t3(e3, n2, r3) {
              null === e3 && (e3 = Function.prototype);
              var i2 = Object.getOwnPropertyDescriptor(e3, n2);
              if (void 0 === i2) {
                var o2 = Object.getPrototypeOf(e3);
                return null === o2 ? void 0 : t3(o2, n2, r3);
              }
              if ("value" in i2) return i2.value;
              var a2 = i2.get;
              return void 0 !== a2 ? a2.call(r3) : void 0;
            };
            Object.defineProperty(e2, "__esModule", { value: true });
            var o = n(3), a = n(9), s = function(t3) {
              if (!t3.chunkId) throw new Error("ChunkedMessage did not have a chunkId: " + JSON.stringify(t3));
            }, u = (function(t3) {
              function e3(t4) {
                !(function(t5, e4) {
                  if (!(t5 instanceof e4)) throw new TypeError("Cannot call a class as a function");
                })(this, e3);
                var n2 = (function(t5, e4) {
                  if (!t5) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                  return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t5 : e4;
                })(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t4.timeout));
                return n2._buffer = {}, n2._chunkSize = t4.chunkSize, n2._sender = t4.sender, n2._maxStringAlloc = t4.maxStringAlloc || -1, n2;
              }
              return (function(t4, e4) {
                if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
                t4.prototype = Object.create(e4 && e4.prototype, {
                  constructor: {
                    value: t4,
                    enumerable: false,
                    writable: true,
                    configurable: true
                  }
                }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t4, e4) : t4.__proto__ = e4);
              })(e3, t3), r2(e3, [
                {
                  key: "send",
                  value: function(t4) {
                    var e4 = this, n2 = JSON.stringify(t4);
                    if (n2.length <= this._chunkSize) this._sender(t4);
                    else {
                      var r3 = (function(t5) {
                        for (var e5 = new Uint16Array(t5.length), n3 = 0, r4 = t5.length; n3 < r4; n3++) e5[n3] = t5.charCodeAt(n3);
                        return e5;
                      })(n2), i2 = [].concat(
                        (function(t5) {
                          if (Array.isArray(t5)) {
                            for (var e5 = 0, n3 = Array(t5.length); e5 < t5.length; e5++) n3[e5] = t5[e5];
                            return n3;
                          }
                          return Array.from(t5);
                        })(Array(30))
                      ).map(function() {
                        return Math.random().toString(36)[3];
                      }).join("");
                      this._sender({
                        type: "chunk_start",
                        chunkId: i2,
                        size: n2.length
                      }), !(function t5() {
                        var n3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, o2 = r3.slice(n3, n3 + e4._chunkSize);
                        o2.length && (e4._sender({
                          type: "chunk_data",
                          chunkId: i2,
                          data: Array.from(o2)
                        }), t5(n3 + e4._chunkSize));
                      })(), this._sender({ type: "chunk_end", chunkId: i2 });
                    }
                  }
                },
                {
                  key: "_messageReceived",
                  value: function(t4) {
                    switch (t4.type) {
                      case "chunk_start":
                        this._receiveNewChunk(t4);
                        break;
                      case "chunk_data":
                        this._receiveChunkData(t4);
                        break;
                      case "chunk_end":
                        var n2 = this._mergeChunks(t4);
                        i(e3.prototype.__proto__ || Object.getPrototypeOf(e3.prototype), "_messageReceived", this).call(this, n2);
                        break;
                      default:
                        i(e3.prototype.__proto__ || Object.getPrototypeOf(e3.prototype), "_messageReceived", this).call(this, t4);
                    }
                  }
                },
                {
                  key: "_receiveNewChunk",
                  value: function(t4) {
                    if (s(t4), this._buffer[t4.chunkId]) throw new Error("There was already an entry in the buffer for chunkId " + t4.chunkId);
                    this._buffer[t4.chunkId] = {
                      id: t4.chunkId,
                      chunks: [],
                      size: t4.size
                    };
                  }
                },
                {
                  key: "_receiveChunkData",
                  value: function(t4) {
                    if (s(t4), !this._buffer[t4.chunkId]) throw new Error("ChunkId " + t4.chunkId + " was not found in the buffer");
                    this._buffer[t4.chunkId].chunks.push(t4.data);
                  }
                },
                {
                  key: "_mergeChunks",
                  value: function(t4) {
                    if (s(t4), !this._buffer[t4.chunkId]) throw new Error("ChunkId " + t4.chunkId + " was not found in the buffer");
                    var e4 = this._buffer[t4.chunkId].chunks.reduce(
                      function(t5, e5, n3) {
                        return e5.forEach(function(e6, n4) {
                          return t5.uintArray[t5.currentIx + n4] = e6;
                        }), t5.currentIx += e5.length, t5;
                      },
                      {
                        uintArray: new Uint16Array(this._buffer[t4.chunkId].size),
                        currentIx: 0
                      }
                    ), n2 = void 0, r3 = (function(t5, e5) {
                      if (-1 === e5) return String.fromCharCode.apply(null, t5);
                      for (var n3 = "", r4 = 0; r4 < t5.length; r4 += e5) r4 + e5 > t5.length ? n3 += String.fromCharCode.apply(null, t5.subarray(r4)) : n3 += String.fromCharCode.apply(null, t5.subarray(r4, r4 + e5));
                      return n3;
                    })(e4.uintArray, this._maxStringAlloc);
                    try {
                      n2 = JSON.parse(r3);
                    } catch (t5) {
                      throw new Error("Not a valid JSON string: " + r3);
                    }
                    if (!a.isTransportMessage(n2)) throw new Error("Not a transport message: " + JSON.stringify(n2));
                    return n2;
                  }
                }
              ]), e3;
            })(o.GenericChannel);
            e2.ChunkedChannel = u;
          },
          function(t2, e2, n) {
            "use strict";
            Object.defineProperty(e2, "__esModule", { value: true }), e2.isTransportMessage = function(t3) {
              switch (t3.type) {
                case "request":
                case "response":
                case "error":
                case "handler_unregistered":
                case "handler_registered":
                  return true;
                default:
                  return false;
              }
            };
          }
        ]);
      },
      function(t, e, n) {
        "use strict";
        var r2 = this && this.__awaiter || function(t2, e2, n2, r3) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function a2(t3) {
              try {
                u2(r3.next(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function s2(t3) {
              try {
                u2(r3.throw(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function u2(t3) {
              var e3;
              t3.done ? i2(t3.value) : (e3 = t3.value, e3 instanceof n2 ? e3 : new n2(function(t4) {
                t4(e3);
              })).then(a2, s2);
            }
            u2((r3 = r3.apply(t2, e2 || [])).next());
          });
        }, i = this && this.__generator || function(t2, e2) {
          var n2, r3, i2, o2, a2 = {
            label: 0,
            sent: function() {
              if (1 & i2[0]) throw i2[1];
              return i2[1];
            },
            trys: [],
            ops: []
          };
          return o2 = { next: s2(0), throw: s2(1), return: s2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function s2(o3) {
            return function(s3) {
              return (function(o4) {
                if (n2) throw new TypeError("Generator is already executing.");
                for (; a2; )
                  try {
                    if (n2 = 1, r3 && (i2 = 2 & o4[0] ? r3.return : o4[0] ? r3.throw || ((i2 = r3.return) && i2.call(r3), 0) : r3.next) && !(i2 = i2.call(r3, o4[1])).done) return i2;
                    switch (r3 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                      case 0:
                      case 1:
                        i2 = o4;
                        break;
                      case 4:
                        return a2.label++, { value: o4[1], done: false };
                      case 5:
                        a2.label++, r3 = o4[1], o4 = [0];
                        continue;
                      case 7:
                        o4 = a2.ops.pop(), a2.trys.pop();
                        continue;
                      default:
                        if (!(i2 = a2.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                          a2 = 0;
                          continue;
                        }
                        if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                          a2.label = o4[1];
                          break;
                        }
                        if (6 === o4[0] && a2.label < i2[1]) {
                          a2.label = i2[1], i2 = o4;
                          break;
                        }
                        if (i2 && a2.label < i2[2]) {
                          a2.label = i2[2], a2.ops.push(o4);
                          break;
                        }
                        i2[2] && a2.ops.pop(), a2.trys.pop();
                        continue;
                    }
                    o4 = e2.call(t2, a2);
                  } catch (t3) {
                    o4 = [6, t3], r3 = 0;
                  } finally {
                    n2 = i2 = 0;
                  }
                if (5 & o4[0]) throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              })([o3, s3]);
            };
          }
        };
        Object.defineProperty(e, "__esModule", { value: true }), e.JavascriptViewer = void 0;
        var o = n(6), a = n(3), s = n(1), u = n(15), c = n(4), l = n(16), d = n(17), h = n(0), f = n(18), g2 = n(20), p = {
          license: "",
          mainImageId: "jsv-image",
          mainHolderId: "jsv-holder",
          mainImageUrl: "",
          totalFrames: 72,
          imageUrls: [],
          speed: 80,
          inertia: 20,
          defaultProgressBar: true,
          firstImageNumber: 1,
          imageUrlFormat: "",
          startFrameNo: 1,
          reverse: false,
          autoRotate: 0,
          autoRotateSpeed: 0,
          autoRotateReverse: false,
          enableImageEvents: false,
          zoom: false,
          zoomWheelSpeed: 50,
          zoomMax: 2,
          stopAtEdges: false,
          enableChangeImageEvent: false,
          cursorConfig: {
            default: "grab",
            drag: "grabbing",
            zoomIn: "zoom-in",
            zoomOut: "zoom-out",
            pan: "move"
          },
          touchConfig: {
            default: "pan-y",
            drag: "pan-y",
            zoomIn: "pan-x",
            zoomOut: "pan-x",
            pan: "pan-x"
          },
          autoCDNResizer: false,
          autoCDNResizerConfig: {
            useWidth: true,
            useHeight: false,
            scaleWithZoomMax: false
          },
          notificationConfig: {
            dragToRotate: {
              showStartToRotateDefaultNotification: false,
              imageUrl: "",
              languages: [],
              mainColor: "rgba(0,0,0,0.20)",
              textColor: "rgba(243,237,237,0.80)"
            }
          },
          extraImageClass: "",
          id: ""
        }, m = (function() {
          function t2(e2) {
            this.isStarted = false, this.isDragged = false, this.images = [], this.currentImageNumber = 1, this.previousImageNumber = 1, this.desiredRotationInDegrees = 0, this.mainImage = null, this.mainHolderElement = null, this.uniqueId = "", this.currentDegree = 0, this.currentSpeed = 0, this.inAnimation = false, this.desiredRotationInDegreesStartSlowingDown = null, this.useEasing = true, this.updateInAction = false, this.window = null, this.startDragInvocations = 0, this.firstDrag = false, this.standbyRefreshRate = 60, this.previousTargetDegree = null, this.nAutoRotations = 0, this.dragAllowed = true, this.currentPointer = "default", this.currentTouch = "default", this.zoomPointerTimeout = null, this.watermark = false, this.watermark = true, this.zoom = null, this.eventBus = t2.initEventBus(), this.window = "undefined" != typeof window ? window : null, this.options = e2, this.runningInBrowser();
          }
          u.default.f = f;
          return t2.loadConfig = function(t3, e2, n2) {
            return new Promise(function(r3, i2) {
              if (!t3 || t3.length < 10 || !e2 && n2 && "file:" !== n2) r3({ config: "", watermark: true });
              else {
                var o2 = new XMLHttpRequest(), a2 = "https://config.3dweb.io/" + (t3 = null == t3 ? void 0 : t3.trim());
                o2.onreadystatechange = function() {
                  if (4 === this.readyState && 200 === this.status) {
                    var e3 = JSON.parse(this.responseText);
                    if (null !== e3.config) return r3(e3);
                    i2(new Error("could not find a presentation with id " + t3));
                  } else if (0 !== this.status && 200 !== this.status)
                    switch (this.status) {
                      case 404:
                        i2(new Error("could not find a presentation with id " + t3));
                        break;
                      case 403:
                        i2(new Error("you do not have access to presentation with id " + t3));
                        break;
                      default:
                        i2(new Error("could not load presentation with id " + t3));
                    }
                }, o2.open("GET", a2, true), o2.setRequestHeader("3dweb-host", e2), o2.send();
              }
            });
          }, t2.initEventBus = function() {
            return c.createEventBus({ events: l.default, channels: [] });
          }, t2.prototype.runningInBrowser = function() {
            return "undefined" != typeof window;
          }, t2.prototype.events = function() {
            return this.eventBus;
          }, t2.prototype.setSpeed = function(t3) {
            this.currentSpeed = t3 > 999 || t3 < -999 ? 999 : t3;
          }, t2.prototype.setId = function(t3) {
            var e2 = this;
            return this.options.id = t3, this.options.imageUrls = [], this.destroy().then(function() {
              return e2.start();
            }).catch(function(t4) {
              console.error(t4);
            });
          }, t2.prototype.setInertia = function(t3) {
            this.options.inertia = t3 > 99 ? 99 : t3 < 1 ? 1 : t3;
          }, t2.prototype.initProgressBar = function() {
            if (this.options.defaultProgressBar) {
              this.options.mainImageId && o.Images.blurMainImage(this.options.mainImageId, this.window);
              var t3 = o.Images.createProgressBar(this.uniqueId, this.window, this.mainHolderElement), e2 = new d.default(0, t3.firstChild);
              this.eventBus.loadImage.on(function(t4) {
                e2.update(t4.percentage);
              }), this.eventBus.started.on(function() {
                t3.style.display = "none";
              });
            }
          }, t2.prototype.documentIsReady = function() {
            return "complete" === this.window.document.readyState;
          }, t2.prototype.isB = function() {
            var t3 = new RegExp(
              atob(
                "KGdvb2dsZWJvdC98Ym90fEdvb2dsZWJvdC1Nb2JpbGV8R29vZ2xlYm90LUltYWdlfEdvb2dsZSBmYXZpY29ufE1lZGlhcGFydG5lcnMtR29vZ2xlfGJpbmdib3R8c2x1cnB8amF2YXx3Z2V0fGN1cmx8Q29tbW9ucy1IdHRwQ2xpZW50fFB5dGhvbi11cmxsaWJ8bGlid3d3fGh0dHB1bml0fG51dGNofHBocGNyYXdsfG1zbmJvdHxqeXhvYm90fEZBU1QtV2ViQ3Jhd2xlcnxGQVNUIEVudGVycHJpc2UgQ3Jhd2xlcnxiaWdsb3Ryb258dGVvbWF8Y29udmVyYXxzZWVrYm90fGdpZ2FibGFzdHxleGFib3R8bmdib3R8aWFfYXJjaGl2ZXJ8R2luZ2VyQ3Jhd2xlcnx3ZWJtb24gfGh0dHJhY2t8d2ViY3Jhd2xlcnxncnViLm9yZ3xVc2luZU5vdXZlbGxlQ3Jhd2xlcnxhbnRpYm90fG5ldHJlc2VhcmNoc2VydmVyfHNwZWVkeXxmbHVmZnl8YmlibnVtLmJuZnxmaW5kbGlua3xtc3Jib3R8cGFuc2NpZW50fHlhY3lib3R8QUlTZWFyY2hCb3R8SU9JfGlwcy1hZ2VudHx0YWdvb2JvdHxNSjEyYm90fGRvdGJvdHx3b3Jpb2JvdHx5YW5nYXxidXp6Ym90fG1sYm90fHlhbmRleGJvdHxwdXJlYm90fExpbmd1ZWUgQm90fFZveWFnZXJ8Q3liZXJQYXRyb2x8dm9pbGFib3R8YmFpZHVzcGlkZXJ8Y2l0ZXNlZXJ4Ym90fHNwYm90fHR3ZW5nYWJvdHxwb3N0cmFua3x0dXJuaXRpbmJvdHxzY3JpYmRib3R8cGFnZTJyc3N8c2l0ZWJvdHxsaW5rZGV4fEFkaWR4Ym90fGJsZWtrb2JvdHxlem9vbXN8ZG90Ym90fE1haWwuUlVfQm90fGRpc2NvYm90fGhlcml0cml4fGZpbmR0aGF0ZmlsZXxldXJvcGFyY2hpdmUub3JnfE5lcmRCeU5hdHVyZS5Cb3R8c2lzdHJpeCBjcmF3bGVyfGFocmVmc2JvdHxBYm91bmRleHxkb21haW5jcmF3bGVyfHdic2VhcmNoYm90fHN1bW1pZnl8Y2Nib3R8ZWRpc3RlcmJvdHxzZXpuYW1ib3R8ZWMybGlua2ZpbmRlcnxnc2xmYm90fGFpaGl0Ym90fGludGVsaXVtX2JvdHxmYWNlYm9va2V4dGVybmFsaGl0fHlldGl8UmV0cmV2b1BhZ2VBbmFseXplcnxsYi1zcGlkZXJ8c29nb3V8bHNzYm90fGNhcmVlcmJvdHx3b3Rib3h8d29jYm90fGljaGlyb3xEdWNrRHVja0JvdHxsc3Nyb2NrZXRjcmF3bGVyfGRydXBhY3R8d2ViY29tcGFueWNyYXdsZXJ8YWNvb25ib3R8b3BlbmluZGV4c3BpZGVyfGduYW0gZ25hbSBzcGlkZXJ8d2ViLWFyY2hpdmUtbmV0LmNvbS5ib3R8YmFja2xpbmtjcmF3bGVyfGNvY2NvY3xpbnRlZ3JvbWVkYnxjb250ZW50IGNyYXdsZXIgc3BpZGVyfHRvcGxpc3Rib3R8c2Vva2lja3Mtcm9ib3R8aXQybWVkaWEtZG9tYWluLWNyYXdsZXJ8aXAtd2ViLWNyYXdsZXIuY29tfHNpdGVleHBsb3Jlci5pbmZvfGVsaXNhYm90fHByb3hpbWljfGNoYW5nZWRldGVjdGlvbnxibGV4Ym90fGFyYWJvdHxXZVNFRTpTZWFyY2h8bmlraS1ib3R8Q3J5c3RhbFNlbWFudGljc0JvdHxyb2dlcmJvdHwzNjBTcGlkZXJ8cHNib3R8SW50ZXJmYXhTY2FuQm90fExpcHBlcmhleSBTRU8gU2VydmljZXxDQyBNZXRhZGF0YSBTY2FwZXJ8ZzAwZzFlLm5ldHxHcmFwZXNob3RDcmF3bGVyfHVybGFwcGVuZGJvdHxicmFpbm9ib3R8ZnItY3Jhd2xlcnxiaW5sYXJ8U2ltcGxlQ3Jhd2xlcnxMaXZlbGFwYm90fFR3aXR0ZXJib3R8Y1hlbnNlYm90fHNtdGJvdHxibmYuZnJfYm90fEE2LUluZGV4ZXJ8QURtYW50WHxGYWNlYm90fFR3aXR0ZXJib3R8T3JhbmdlQm90fG1lbW9yeWJvdHxBZHZCb3R8TWVnYUluZGV4fFNlbWFudGljU2Nob2xhckJvdHxsdHg3MXxuZXJkeWJvdHx4b3ZpYm90fEJVYmlOR3xRd2FudGlmeXxhcmNoaXZlLm9yZ19ib3R8QXBwbGVib3R8VHdlZXRtZW1lQm90fGNyYXdsZXI0anxmaW5keGJvdHxTZW1ydXNoQm90fHlvb3pCb3R8bGlwcGVyaGV5fHkhai1hc3J8RG9tYWluIFJlLUFuaW1hdG9yIEJvdHxBZGRUaGlzKQ=="
              ),
              "i"
            ), e2 = this.window.navigator.userAgent;
            return t3.test(e2);
          }, t2.prototype.isLocalhost = function() {
            var t3 = this.window.location.hostname, e2 = this.window.location.port;
            return Boolean(-1 !== t3.indexOf("dev.") || -1 !== t3.indexOf("beta.") || -1 !== t3.indexOf("file") || "" !== e2 || "localhost" === t3 || "[::1]" === t3 || t3.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
          }, t2.prototype.isV = function() {
            if (this.options.id) return !this.watermark;
            var t3 = this.window.location.host;
            return g2.Helper.isValid(this.options.license, t3);
          }, t2.prototype.getFirstImageIndex = function() {
            return this.options.firstImageNumber && this.options.firstImageNumber > 0 && this.options.firstImageNumber - 1 < this.images.length ? this.options.firstImageNumber - 1 : 0;
          }, t2.prototype.destroy = function() {
            if (this.isInViewObserver) {
              this.isInViewObserver.disconnect();
              delete this.isInViewObserver;
            }
            if (this.isOutOfViewObserver) {
              this.isOutOfViewObserver.disconnect();
              delete this.isOutOfViewObserver;
            }
            return r2(this, void 0, void 0, function() {
              var e2 = this;
              return i(this, function(n2) {
                return [
                  2,
                  new Promise(function(n3, r3) {
                    try {
                      if (e2.isStarted) {
                        var i2 = e2.window.document.getElementById(e2.uniqueId);
                        if (i2 && a.DomUtilities.removeElement(i2), e2.options.defaultProgressBar) {
                          var o2 = e2.window.document.getElementById("loader_" + e2.uniqueId);
                          a.DomUtilities.removeElement(o2);
                          var s2 = e2.window.document.getElementById("link_" + e2.uniqueId);
                          a.DomUtilities.removeElement(s2);
                        }
                        if (e2.options.notificationConfig.dragToRotate.showStartToRotateDefaultNotification || e2.options.notificationConfig.dragToRotate.imageUrl.length > 0) {
                          var u2 = e2.window.document.getElementById("notification_" + e2.uniqueId);
                          a.DomUtilities.removeElement(u2);
                        }
                        a.DomUtilities.showImage(e2.mainImage, e2.window), /*e.mainHolderElement.outerHTML = e.mainHolderElement.outerHTML,*/
                        e2.isStarted = false, e2.images = [], e2.mainImage = null, e2.mainHolderElement = null, e2.firstDrag = false, e2.eventBus = t2.initEventBus(), n3(true);
                      } else n3(false);
                    } catch (t3) {
                      var c2 = "error with destroying viewer";
                      t3 instanceof Error && (c2 += t3.toString()), r3(c2);
                    }
                  })
                ];
              });
            });
          }, t2.prototype.start = function() {
            this.inViewPaused = false;
            this.mustExecuteOnViewResumed = null;
            this.onViewResumed = function(resolve) {
              this.mustExecuteOnViewResumed = resolve;
            };
            const imageHolderElement = document.getElementById(this.options.mainHolderId);
            this.isInViewObserver = isInView(imageHolderElement, (target) => {
              const resolve = this.mustExecuteOnViewResumed;
              if (resolve) {
                this.mustExecuteOnViewResumed = null;
                setTimeout(resolve, 1);
              }
              this.inViewPaused = false;
            });
            this.isOutOfViewObserver = isOutOfView(imageHolderElement, (target) => {
              this.inViewPaused = true;
            });
            return r2(this, void 0, void 0, function() {
              var e2 = this;
              return i(this, function(n2) {
                switch (n2.label) {
                  case 0:
                    return this.documentIsReady() ? [3, 2] : [
                      4,
                      new Promise(function(t3) {
                        setTimeout(function() {
                          t3();
                        }, 200);
                      }).then(function() {
                        return e2.start();
                      })
                    ];
                  case 1:
                    return n2.sent(), [3, 3];
                  case 2:
                    return [
                      2,
                      new Promise(function(n3, r3) {
                        var i2 = e2.window.location.host, o2 = e2.window.location.protocol, a2 = JSON.parse(JSON.stringify(e2.options));
                        e2.options = s.mergeDeep({
                          objects: [p, e2.options]
                        }), e2.options.id ? t2.loadConfig(e2.options.id, i2, o2).then(function(t3) {
                          e2.watermark = t3.watermark;
                          var i3 = JSON.parse(t3.config);
                          e2.options = s.mergeDeep({
                            objects: [p, i3, a2]
                          }), e2.currentSpeed = e2.options.speed, e2.options.totalFrames = e2.getTotalFrames(), e2.startPresentation().then(n3).catch(r3);
                        }).catch(function(t3) {
                          e2.handleError(t3, r3);
                        }) : (e2.currentSpeed = e2.options.speed, e2.options.totalFrames = e2.getTotalFrames(), e2.startPresentation().then(n3).catch(r3));
                      })
                    ];
                  case 3:
                    return [2];
                }
              });
            });
          }, t2.prototype.startPresentation = function() {
            return r2(this, void 0, void 0, function() {
              var t3 = this;
              return i(this, function(e2) {
                return [
                  2,
                  new Promise(function(e3, n2) {
                    try {
                      if (t3.isStarted && n2("Viewer " + t3.uniqueId + " already started"), t3.runningInBrowser() || n2("Viewer " + t3.uniqueId + " not started in browser"), a.DomUtilities.addStyles(t3.window), t3.registerStartEvents(), t3.registerInputEvents(), t3.mainImage = t3.options.mainImage = o.Images.getMainImage(t3.options.mainImageId, t3.window), t3.mainImage.img.style.zIndex = 2, t3.mainHolderElement = a.DomUtilities.getMainHolderElement(t3.options.mainHolderId, t3.window, t3.isB(), t3.isLocalhost()), !t3.isB() || t3.isLocalhost() || t3.isV() || a.DomUtilities.createLink(t3.window, t3.mainHolderElement), !t3.isV() && !t3.isLocalhost()) {
                        var u2 = JSON.parse(JSON.stringify(t3.options.notificationConfig));
                        u2.dragToRotate.mainColor = "rgb(255 ,255,255)", u2.dragToRotate.textColor = "rgb(55, 25, 2)", t3.eventBus.startDragging.on(function(e4) {
                          if (e4.invocations >= 2) {
                            clearTimeout(t3.pbto);
                            var n3 = o.Images.createOrGetPoweredBy(u2, t3.uniqueId, t3.window, t3.mainHolderElement, t3.isLocalhost());
                            null !== n3 && (t3.pbto = setTimeout(function() {
                              a.DomUtilities.addHiddenStyle(n3.id, t3.window, 3e3).then(function() {
                                a.DomUtilities.removeElement(n3);
                              });
                            }, 5e3));
                          }
                        });
                      }
                      t3.uniqueId = t3.uniqueId || s.getRandomId(), t3.imageHolderElement = a.DomUtilities.getImageHolderElement(
                        t3.window,
                        t3.mainHolderElement,
                        t3.uniqueId,
                        [],
                        //o,
                        t3.options
                      ), t3.mainHolderElement.appendChild(t3.imageHolderElement), t3.initProgressBar(), t3.getImages().then(function(o2) {
                        o2.forEach((i2) => i2.img.onload = null);
                        return r2(t3, void 0, void 0, function() {
                          var t4, r3 = this;
                          return i(this, function(i2) {
                            return this.images = o2, this.prepareImageHolder(this.imageHolderElement).then(function() {
                              return a.DomUtilities.hideImageSlow(r3.mainImage.id, r3.window), Promise.resolve(
                                (navigator.isWebkit ? "1" : o2.forEach((o3, i3) => o3.img.parentNode.style.display = i3 > 0 ? "none" : "block") || 1) && !(r3.mainImage.img.style.zIndex = 0) && //&& (r.imageHolderElement.style.overflow = "visible")
                                //&& (r.imageHolderElement.style.maxHeight = 'none')
                                (r3.imageHolderElement.style.zIndex = "1") && (r3.imageHolderElement.style.display = "block")
                              ).then(function() {
                                r3.inAnimation || (a.DomUtilities.showImage(r3.images[r3.getFirstImageIndex()], r3.window), r3.currentImageNumber = r3.options.firstImageNumber || 1, r3.previousImageNumber = r3.options.firstImageNumber || 1, r3.setCurrentDegree(r3.currentImageNumber)), r3.isStarted = true, r3.eventBus.started(true), e3();
                              }).catch(function(t5) {
                                r3.handleError(t5, n2);
                              });
                            }).catch(function(t5) {
                              r3.handleError(t5, n2);
                            }), [2];
                          });
                        });
                      }).catch(function(e4) {
                        t3.handleError(e4, n2);
                      });
                    } catch (e4) {
                      t3.handleError(e4, n2);
                    }
                  })
                ];
              });
            });
          }, t2.prototype.handleError = function(t3, e2) {
            var n2 = this, r3 = "unknown error";
            t3 instanceof Error && (r3 = t3.toString(), this.reportError(r3), this.destroy().then(function() {
              e2(t3.toString());
            }).catch(function(t4) {
              n2 && n2.reportError(t4);
            })), e2(r3);
          }, t2.prototype.registerInputEvents = function() {
            var t3 = this;
            this.eventBus.pinch.on(function(e2) {
              return t3.onPinchListener(e2);
            }), this.eventBus.doubleClick.on(function(e2) {
              return t3.onDoubleClickListener(e2);
            }), this.eventBus.zoomChanged.on(function(e2) {
              return t3.onZoomChangedListener(e2);
            }), this.eventBus.scroll.on(function(e2) {
              const result = t3.onScrollListener(e2);
              t3.onZoomChanged(e2);
              return result;
            });
          }, t2.prototype.startDragToRotateNotification = function() {
            o.Images.createReadyNotification(this.options.notificationConfig, this.uniqueId, this.window, this.mainHolderElement);
          }, t2.prototype.hideDragToRotateNotification = function() {
            var t3 = this;
            this.unsubscribe(), this.options.zoom && this.zoomUnsubscribe(), o.Images.hideReadyNotification(this.options.notificationConfig, this.uniqueId, this.window).then(function() {
              var e2 = t3.window.document.getElementById("notification_" + t3.uniqueId);
              a.DomUtilities.removeElement(e2);
            });
          }, t2.prototype.registerStartEvents = function() {
            var t3 = this;
            (this.options.notificationConfig.dragToRotate.showStartToRotateDefaultNotification || this.options.notificationConfig.dragToRotate.imageUrl.length > 0) && (this.eventBus.started.on(function() {
              return t3.startDragToRotateNotification();
            }), this.unsubscribe = this.eventBus.startDragging.on(function() {
              return t3.hideDragToRotateNotification();
            }), this.options.zoom && (this.zoomUnsubscribe = this.eventBus.pinch.on(function() {
              return t3.hideDragToRotateNotification();
            }), this.zoomUnsubscribe = this.eventBus.scroll.on(function() {
              return t3.hideDragToRotateNotification();
            }))), this.options.zoom && this.eventBus.started.on(function(e2) {
              return t3.registerZoom(e2);
            }), this.options.autoRotate > 0 && this.eventBus.started.on(function(e2) {
              return t3.runAutoRotate(e2);
            });
          }, t2.prototype.runAutoRotate = function(t3) {
            var e2 = this;
            t3 ? this.autoRotate(this.options.autoRotate).then(function(t4) {
              e2.eventBus.endAutoRotate({
                currentDegree: e2.currentDegree,
                currentImage: e2.images[e2.currentImageNumber - 1],
                completed: t4
              });
            }).catch(function(t4) {
              e2.reportError(t4);
            }) : this.destroy().then(function() {
              e2.reportWarning("Failed starting autorotate");
            }).catch(function(t4) {
              return e2.reportError(t4);
            });
          }, t2.prototype.registerZoom = function(t3) {
            t3 && (this.zoom = new f.DefaultZoom(this.window, this.images, this.mainHolderElement, this.options.zoomMax));
          }, t2.prototype.onPinchListener = function(t3) {
            var e2, n2 = this;
            this.options.zoom && (this.dragAllowed = false, null === (e2 = this.zoom) || void 0 === e2 || e2.pinch(t3, this.images[this.currentImageNumber - 1]), setTimeout(function() {
              n2.dragAllowed = true;
            }, 1e3));
          }, t2.prototype.onZoomChangedListener = function(t3) {
          }, t2.prototype.onDoubleClickListener = function(t3) {
            var e2, n2;
            this.options.zoom && (null === (e2 = this.zoom) || void 0 === e2 ? void 0 : e2.isZoomed()) && (null === (n2 = this.zoom) || void 0 === n2 || n2.reset(this.images[this.currentImageNumber - 1]), this.setPointer("default"));
          }, t2.prototype.onScrollListener = function(t3) {
            var e2, n2, r3 = this;
            if (this.options.zoom) {
              this.cancelCurrentActions(), this.zoomPointerTimeout && clearTimeout(this.zoomPointerTimeout), null === (e2 = this.zoom) || void 0 === e2 || e2.scroll(t3, this.options.zoomWheelSpeed, this.images[this.currentImageNumber - 1], this);
              var i2 = t3.originalEvent.deltaY;
              (null === (n2 = this.zoom) || void 0 === n2 ? void 0 : n2.isZoomed()) ? (i2 < 0 ? this.setPointer("zoomIn") : this.setPointer("zoomOut"), this.zoomPointerTimeout = this.window.setTimeout(function() {
                r3.setPointer("pan");
              }, 500)) : this.setPointer("default");
            }
          }, t2.prototype.prepareImageHolder = function(t3) {
            return r2(this, void 0, void 0, function() {
              var e2, n2, o2, s2, c2, l2 = this;
              return i(this, function(d2) {
                return e2 = [], n2 = function(t4, e3) {
                  return r2(l2, void 0, void 0, function() {
                    var n3 = this;
                    return i(this, function(r3) {
                      return [
                        2,
                        new Promise(function(r4, i2) {
                          for (var o3 = [], a2 = 0; a2 < t4.length; a2++) o3.push(e3.call(n3, t4[a2], a2));
                          Promise.all(o3).then(function(t5) {
                            return r4(t5);
                          }).catch(function(t5) {
                            return i2(t5);
                          });
                        })
                      ];
                    });
                  });
                }, o2 = function(n3, r3) {
                  (l2.options.zoom || l2.options.enableImageEvents) && //*LAU l.addZoomEvents(n),
                  l2.addZoomEvents(n3);
                  e2.push(n3), l2.images[r3].encoded = "";
                }, s2 = function(t4, e3) {
                  return new Promise(function(n3, r3) {
                    var i2 = a.DomUtilities.getImageElement(t4, l2.window);
                    o2.call(l2, i2, e3), n3(true);
                  });
                }, c2 = function() {
                  var t4, n3;
                  (l2.options.zoom || l2.options.enableImageEvents) && (null === (t4 = l2.mainHolderElement) || void 0 === t4 || t4.addEventListener("wheel", l2.onScroll.bind(l2), {
                    passive: false
                  }), null === (n3 = l2.mainHolderElement) || void 0 === n3 || n3.addEventListener("dblclick", l2.onDoubleClick.bind(l2), { passive: true })), new u.default(e2, {
                    container: l2.mainHolderElement,
                    dragstart: l2.dragStart.bind(l2),
                    dragend: l2.dragEnd.bind(l2),
                    drag: l2.drag.bind(l2),
                    preventDefault: false,
                    events: ["mouse", "touch"]
                  });
                }, [
                  2,
                  new Promise(function(t4, e3) {
                    n2(l2.images, s2).then(function() {
                      c2(), t4();
                    }).catch(function(t5) {
                      e3(t5);
                    });
                  })
                ];
              });
            });
          }, t2.prototype.addZoomEvents = function(t3) {
            var e2 = this;
            t3.addEventListener("click", this.onClick.bind(this)), this.onScale(t3, function(t4, n2, r3) {
              t4 > 0.5 && e2.events().pinch({
                completed: true,
                currentImage: e2.images[e2.currentImageNumber - 1],
                currentDegree: e2.currentDegree,
                originalEvent: r3,
                scale: t4,
                first: n2
              });
            });
          }, t2.prototype.setPointer = function(t3) {
            if (this.currentPointer !== t3) {
              var e2 = this.options.cursorConfig[t3];
              this.currentPointer = t3, a.DomUtilities.setPointer(this.mainHolderElement, e2);
            }
            var n2 = this.options.touchConfig[t3];
            this.currentTouch !== n2 && (this.currentTouch = n2, a.DomUtilities.setTouchAction(this.mainHolderElement, n2));
          }, t2.prototype.onScale = function(t3, e2) {
            var n2, r3 = this, i2 = true, o2 = 0, a2 = false;
            t3.addEventListener(
              "touchmove",
              function(t4) {
                if (2 === t4.targetTouches.length) {
                  var r4 = Math.hypot(t4.targetTouches[0].pageX - t4.targetTouches[1].pageX, t4.targetTouches[0].pageY - t4.targetTouches[1].pageY);
                  a2 = true, e2(r4, i2, t4), void 0 === n2 && (n2 = r4, i2 = false);
                }
              },
              { capture: false, passive: true }
            ), t3.addEventListener(
              "touchend",
              function(t4) {
                var e3, s2;
                if (n2 = void 0, i2 = true, (null === (e3 = r3.zoom) || void 0 === e3 ? void 0 : e3.isZoomed()) && !a2) {
                  var u2 = (/* @__PURE__ */ new Date()).getTime(), c2 = u2 - o2;
                  clearTimeout(void 0), c2 < 500 && c2 > 0 && (null === (s2 = r3.zoom) || void 0 === s2 || s2.reset(r3.images[r3.currentImageNumber - 1])), o2 = u2;
                }
                a2 = false;
              },
              { capture: false, passive: true }
            );
          }, t2.prototype.onClick = function(t3) {
            if (!n.show360()) return;
            this.events().click({
              currentDegree: this.currentDegree,
              currentImage: this.images[this.currentImageNumber - 1],
              completed: true,
              originalEvent: t3
            });
          }, t2.prototype.onScroll = function(t3) {
            const currentZoomScale = this.zoom.currentZoomScale;
            this.events().scroll({
              currentDegree: this.currentDegree,
              currentImage: this.images[this.currentImageNumber - 1],
              completed: true,
              originalEvent: t3,
              zoom: this.zoom,
              currentZoomScale,
              jsv: this
            });
            this.zoom.previousZoomScale = currentZoomScale;
          }, t2.prototype.onDoubleClick = function(t3) {
            this.events().doubleClick({
              currentDegree: this.currentDegree,
              currentImage: this.images[this.currentImageNumber - 1],
              completed: true,
              originalEvent: t3
            });
          }, t2.prototype.onZoomChanged = function(t3) {
            this.events().zoomChanged({
              currentDegree: this.currentDegree,
              currentImage: this.images[this.currentImageNumber - 1],
              completed: true,
              isZoomed: this.zoom.isZoomed(),
              zoom: this.zoom,
              jsv: this,
              originalEvent: t3
            });
          }, t2.prototype.reportError = function(t3) {
            console.error("360 Javascript Viewer: " + t3);
          }, t2.prototype.reportWarning = function(t3) {
            console.warn("360 Javascript Viewer: " + t3);
          }, t2.prototype.updateImage = function() {
            var t3 = this;
            this.updateInAction = true;
            if (0 === this.desiredRotationInDegrees)
              return this.inAnimation = false, this.updateInAction = false, this.desiredRotationInDegreesStartSlowingDown = null, new Promise(function(e3) {
                e3({ currentDegree: t3.currentDegree });
              });
            var e2, n2 = this.getNextImageNumber();
            if (this.options.stopAtEdges && !this.inAnimation) {
              var r3 = this.images.length;
              if (1 === this.previousImageNumber && n2 === r3 || this.previousImageNumber === r3 && 1 === n2)
                return this.updateInAction = false, new Promise(function(e3) {
                  e3({ currentDegree: t3.currentDegree });
                });
            }
            return this.setCurrentImage(n2), (e2 = this.getCurrentRefreshRate(), new Promise((resolve) => {
              if (this.inViewPaused) return this.onViewResumed(resolve);
              return requestTimeout(resolve, e2 + (t3.isDragged ? 0 : 50));
            })).then(function() {
              return t3.updateImage();
            });
          }, t2.prototype.zoomTo = function(t3, e2, n2, duration) {
            var r3 = this;
            return new Promise(function(i2, o2) {
              var a2, s2;
              if (r3.options.zoom) {
                t3 > r3.options.zoomMax && o2("supplied zoom factor " + t3 + " higher then max zoom of " + r3.options.zoomMax);
                var u2 = r3.images[r3.currentImageNumber - 1];
                null === (a2 = r3.zoom) || void 0 === a2 || a2.reset(u2, r3, duration), null === (s2 = r3.zoom) || void 0 === s2 || s2.zoom(t3, e2, n2, u2, r3, duration), r3.setPointer(t3 > 1 ? "zoomIn" : "zoomOut"), i2();
                r3.onZoomChanged();
              } else o2("zoom not activated");
            });
          }, t2.prototype.rotateDegrees = function(t3) {
            return this.inAnimation = true, this.desiredRotationInDegrees = t3, this.updateImage();
          }, t2.prototype.resetZoom = function(duration) {
            var t3 = this;
            return new Promise(function(e2, n2) {
              var r3;
              t3.options.zoom || n2("zoom is not activated"), null === (r3 = t3.zoom) || void 0 === r3 || r3.reset(t3.images[t3.currentImageNumber - 1], t3, duration), t3.setPointer("default"), setTimeout(function() {
                e2();
                t3.onZoomChanged();
              }, 500);
            });
          }, t2.prototype.isZoomedIn = function() {
            var t3;
            return !!this.options.zoom && !!this.zoom && (null === (t3 = this.zoom) || void 0 === t3 ? void 0 : t3.isZoomed());
          }, t2.prototype.rotateToFrame = function(t3, e2, n2) {
            void 0 === e2 && (e2 = true), void 0 === n2 && (n2 = true);
            var r3 = 360 / this.options.totalFrames * (t3 - 1);
            return this.rotateToDegree(r3, e2, n2);
          }, t2.prototype.rotateToDegree = function(t3, e2, n2) {
            var r3 = this;
            if (void 0 === e2 && (e2 = true), void 0 === n2 && (n2 = true), this.inAnimation = true, this.cancelCurrentActions(), this.useEasing = n2, this.desiredRotationInDegrees = 0, t3 = Math.round(t3), this.previousTargetDegree === t3 || t3 === this.currentDegree)
              return this.useEasing = true, new Promise(function(t4) {
                t4({ currentDegree: r3.currentDegree });
              });
            this.inAnimation = true;
            var i2 = t3 > this.currentDegree ? t3 - this.currentDegree : 360 - this.currentDegree + t3, o2 = t3 < this.currentDegree ? -1 * (this.currentDegree - t3) : -1 * (this.currentDegree + (360 - t3));
            return this.desiredRotationInDegrees = e2 && Math.abs(o2) < i2 ? o2 : i2, this.previousTargetDegree = t3, this.updateImage();
          }, t2.prototype.cancelCurrentActions = function() {
            this.desiredRotationInDegrees = 0, this.previousTargetDegree = null, this.nAutoRotations = 0;
          }, t2.prototype.dragEnd = function() {
            var t3;
            this.isDragged = false, this.options.zoom && (null === (t3 = this.zoom) || void 0 === t3 ? void 0 : t3.isZoomed()) ? this.setPointer("pan") : this.setPointer("default");
            var e2 = this.options.inertia / 100;
            this.desiredRotationInDegrees += -1 * e2 * this.desiredRotationInDegrees;
          }, t2.prototype.drag = function(t3) {
            var e2, n2, r3;
            if (this.options.zoom && (null === (e2 = this.zoom) || void 0 === e2 ? void 0 : e2.isZoomed())) {
              if (t3.inputEvent.targetTouches) {
                if (t3.inputEvent.targetTouches && 2 === t3.inputEvent.targetTouches.length) {
                  if (Math.hypot(t3.inputEvent.targetTouches[0].pageX - t3.inputEvent.targetTouches[1].pageX, t3.inputEvent.targetTouches[0].pageY - t3.inputEvent.targetTouches[1].pageY) < 1) return;
                }
              }
              if (Math.hypot(t3.deltaX, t3.deltaY) < 1) return;
              return null === (n2 = this.zoom) || void 0 === n2 || n2.pan(t3.deltaX, t3.deltaY, this.images[this.currentImageNumber - 1]), void this.setPointer("pan");
            }
            if (!(Math.abs(t3.deltaY) > Math.abs(t3.deltaX))) {
              if (!this.dragAllowed) return false;
              if (this.window.TouchEvent && t3 instanceof TouchEvent && 2 === t3.touches.length) return false;
              var i2 = this.getDegreesOneImage(), o2 = t3.deltaX / (null === (r3 = this.mainHolderElement) || void 0 === r3 ? void 0 : r3.clientWidth) * this.getTotalFrames() * i2;
              return o2 = this.options.speed / 100 * o2, this.options.reverse || (o2 *= -1), this.desiredRotationInDegrees += o2, this.updateInAction || this.updateImage(), this.setPointer("drag"), this.firstDrag && (this.startDragInvocations++, this.eventBus.startDragging({
                invocations: this.startDragInvocations
              }), this.firstDrag = false), this.isDragged;
            }
          }, t2.prototype.dragStart = function() {
            var t3;
            this.dragAllowed && (this.options.zoom && (null === (t3 = this.zoom) || void 0 === t3 ? void 0 : t3.isZoomed()) || (this.isDragged = true, this.firstDrag = true, this.setPointer("drag"), this.cancelCurrentActions()));
          }, t2.prototype.getNextImageNumber = function() {
            var e2 = this.images.length, n2 = this.getDegreesOneImage(), r3 = this.currentImageNumber;
            return Math.abs(this.desiredRotationInDegrees) < n2 ? (this.viewerHasNoAction() && (this.desiredRotationInDegrees = 0), r3) : (r3 = this.desiredRotationInDegrees > 0 ? t2.increaseImageNumber(r3, e2) : t2.decreaseImageNumber(r3, e2), this.decreaseDesiredRotation(n2), r3);
          }, t2.prototype.getDegreesOneImage = function() {
            var t3 = this.images.length;
            return Math.round(360 / t3);
          }, t2.prototype.setCurrentDegree = function(t3) {
            var e2 = this.getDegreesOneImage();
            this.currentDegree = 1 === t3 ? 0 : (t3 - 1) * e2;
          }, t2.decreaseImageNumber = function(t3, e2) {
            return --t3 < 1 ? e2 : t3;
          }, t2.increaseImageNumber = function(t3, e2) {
            return ++t3 > e2 ? 1 : t3;
          }, t2.prototype.decreaseDesiredRotation = function(t3) {
            t3 = Math.abs(t3), this.desiredRotationInDegrees < 0 ? this.desiredRotationInDegrees += t3 : this.desiredRotationInDegrees -= Math.abs(t3);
          }, t2.prototype.setCurrentImage = function(t3) {
            requestAnimationFrame((e2) => {
              t3 = t3 || 1;
              t3 !== this.previousImageNumber && this.isStarted && (a.DomUtilities.showImage(this.images[t3 - 1], this.window), this.previousImageNumber >= 0 && a.DomUtilities.hideImage(this.images[this.previousImageNumber - 1], this.window, this.images[t3 - 1], t3 - 1, this), this.previousImageNumber = t3, this.currentImageNumber = t3, this.setCurrentDegree(t3), this.options.enableChangeImageEvent && this.events().changeImage({
                currentImage: this.images[t3 - 1],
                currentDegree: this.currentDegree,
                completed: true
              }));
            });
          }, t2.prototype.viewerHasNoAction = function() {
            return !this.isDragged;
          }, t2.prototype.getImages = function() {
            return r2(this, void 0, void 0, function() {
              return i(this, function(t3) {
                return [2, o.Images.getPossibleImages(this.mainHolderElement, this.mainImage, this.uniqueId, this.eventBus, this.options, this.window, this.imageHolderElement)];
              });
            });
          }, t2.prototype.getTotalFrames = function() {
            if (this.options.imageUrls && this.options.imageUrls.length > 0) return this.options.imageUrls.length;
            var t3 = this.options.totalFrames;
            if (t3 > 0 && t3 <= 360) return t3;
            throw new h.default("totalFrames must be between 1 and 360 now " + t3);
          }, t2.speedToRefreshRate = function(t3) {
            return (100 - t3) / 2;
          }, t2.prototype.getCurrentRefreshRate = function() {
            if (0 === this.desiredRotationInDegrees) return this.standbyRefreshRate;
            if (this.viewerHasNoAction() && this.useEasing) {
              this.desiredRotationInDegreesStartSlowingDown || (this.desiredRotationInDegreesStartSlowingDown = Math.abs(this.desiredRotationInDegrees));
              var e2 = (1 - (1 - Math.abs(this.desiredRotationInDegrees) / this.desiredRotationInDegreesStartSlowingDown)) * this.currentSpeed;
              return e2 = (100 - this.options.inertia) / 100 * e2, t2.speedToRefreshRate(e2);
            }
            return t2.speedToRefreshRate(this.currentSpeed);
          }, t2.prototype.autoRotate = function(t3) {
            return r2(this, void 0, void 0, function() {
              var e2, n2 = this;
              return i(this, function(o2) {
                return this.nAutoRotations = t3, e2 = function(e3) {
                  return r2(n2, void 0, void 0, function() {
                    var n3, r3;
                    return i(this, function(i2) {
                      switch (i2.label) {
                        case 0:
                          n3 = 0, n3 = 0, i2.label = 1;
                        case 1:
                          return n3 < this.nAutoRotations ? this.isDragged || this.nAutoRotations !== t3 ? (e3 && this.setSpeed(this.options.speed), [3, 4]) : (n3 === t3 - 1 && (this.useEasing = true), r3 = this.options.autoRotateReverse ? -360 : 360, [4, this.rotateDegrees(r3)]) : [3, 4];
                        case 2:
                          i2.sent(), i2.label = 3;
                        case 3:
                          return n3++, [3, 1];
                        case 4:
                          return [
                            2,
                            new Promise(function(e4, r4) {
                              e4(n3 === t3 - 1);
                            })
                          ];
                      }
                    });
                  });
                }, [
                  2,
                  new Promise(function(r3, i2) {
                    n2.useEasing = false;
                    var o3 = n2.options.autoRotateSpeed !== n2.options.speed;
                    o3 && n2.setSpeed(n2.options.autoRotateSpeed), e2(o3).then(function() {
                      o3 && n2.setSpeed(n2.options.speed), n2.useEasing = true, n2.nAutoRotations === t3 ? r3(true) : r3(false);
                    }).catch(function(t4) {
                      n2 && n2.reportError(t4), i2();
                    });
                  })
                ];
              });
            });
          }, t2;
        })();
        e.JavascriptViewer = m;
        window.JavascriptViewer = m;
      },
      function(t, e, n) {
        "use strict";
        var r2 = this && this.__awaiter || function(t2, e2, n2, r3) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function a2(t3) {
              try {
                u2(r3.next(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function s2(t3) {
              try {
                u2(r3.throw(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function u2(t3) {
              var e3;
              t3.done ? i2(t3.value) : (e3 = t3.value, e3 instanceof n2 ? e3 : new n2(function(t4) {
                t4(e3);
              })).then(a2, s2);
            }
            u2((r3 = r3.apply(t2, e2 || [])).next());
          });
        }, i = this && this.__generator || function(t2, e2) {
          var n2, r3, i2, o2, a2 = {
            label: 0,
            sent: function() {
              if (1 & i2[0]) throw i2[1];
              return i2[1];
            },
            trys: [],
            ops: []
          };
          return o2 = { next: s2(0), throw: s2(1), return: s2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function s2(o3) {
            return function(s3) {
              return (function(o4) {
                if (n2) throw new TypeError("Generator is already executing.");
                for (; a2; )
                  try {
                    if (n2 = 1, r3 && (i2 = 2 & o4[0] ? r3.return : o4[0] ? r3.throw || ((i2 = r3.return) && i2.call(r3), 0) : r3.next) && !(i2 = i2.call(r3, o4[1])).done) return i2;
                    switch (r3 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                      case 0:
                      case 1:
                        i2 = o4;
                        break;
                      case 4:
                        return a2.label++, { value: o4[1], done: false };
                      case 5:
                        a2.label++, r3 = o4[1], o4 = [0];
                        continue;
                      case 7:
                        o4 = a2.ops.pop(), a2.trys.pop();
                        continue;
                      default:
                        if (!(i2 = a2.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                          a2 = 0;
                          continue;
                        }
                        if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                          a2.label = o4[1];
                          break;
                        }
                        if (6 === o4[0] && a2.label < i2[1]) {
                          a2.label = i2[1], i2 = o4;
                          break;
                        }
                        if (i2 && a2.label < i2[2]) {
                          a2.label = i2[2], a2.ops.push(o4);
                          break;
                        }
                        i2[2] && a2.ops.pop(), a2.trys.pop();
                        continue;
                    }
                    o4 = e2.call(t2, a2);
                  } catch (t3) {
                    o4 = [6, t3], r3 = 0;
                  } finally {
                    n2 = i2 = 0;
                  }
                if (5 & o4[0]) throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              })([o3, s3]);
            };
          }
        };
        Object.defineProperty(e, "__esModule", { value: true }), e.Images = void 0;
        var o = n(0), a = n(7), s = n(8), u = n(3), c = (function() {
          function t2() {
          }
          return t2.getFilename = function(t3, e2, n2) {
            if (n2 && n2.startsWith("data:") || n2 == "" || n2 == " ") return n2 == " " ? "" : n2;
            if (0 === e2.length) {
              var r3 = n2.split(".").pop();
              if (void 0 === r3) throw new o.default("no extension found in url: " + n2 + ", cannot generate other filenames");
              var i2 = (t3 < 10 ? "0" : "") + t3.toString();
              return n2.replace("." + r3, "_" + i2 + "." + r3);
            }
            var a2 = this.getImagesPath(n2), s2 = this.getImagesPath(e2) || a2, u2 = e2.lastIndexOf("/") + 1;
            if (-1 !== (e2 = e2.substr(u2)).toLowerCase().indexOf("????")) {
              if (t3 < 10) {
                i2 = "000" + t3.toString();
                return "" + s2 + e2.replace("????", i2);
              }
              if (t3 > 9 && t3 < 100) {
                i2 = "00" + t3.toString();
                return "" + s2 + e2.replace("????", i2);
              }
              if (t3 > 99) {
                i2 = "0" + t3.toString();
                return "" + s2 + e2.replace("????", i2);
              }
            }
            if (-1 !== e2.toLowerCase().indexOf("???")) {
              if (t3 < 10) {
                i2 = "00" + t3.toString();
                return "" + s2 + e2.replace("???", i2);
              }
              if (t3 > 9 && t3 < 100) {
                i2 = "0" + t3.toString();
                return "" + s2 + e2.replace("???", i2);
              }
              if (t3 > 99) {
                i2 = t3.toString();
                return "" + s2 + e2.replace("???", i2);
              }
            }
            if (-1 !== e2.toLowerCase().indexOf("??")) {
              i2 = (t3 < 10 ? "0" : "") + t3.toString();
              return "" + s2 + e2.replace("??", i2);
            }
            if (-1 !== e2.toLowerCase().indexOf("?")) {
              i2 = t3.toString();
              return "" + s2 + e2.replace("?", i2);
            }
            return $("#jsv-image").attr("src");
            throw new o.default("no placeholder ? or ?? found in format: " + e2);
          }, t2.generateImagesUrlsFromFormat = function(t3, e2) {
            var n2 = [], r3 = e2.startFrameNo, i2 = e2.totalFrames, o2 = e2.imageUrlFormat;
            if (0 === t3.length) return n2;
            for (var a2 = r3; i2 > n2.length; a2++) n2.push(this.getFilename(a2, o2, t3));
            return n2;
          }, t2.getPossibleImages = function(t3, e2, n2, o2, options, u2, imageHolderElement) {
            return r2(this, void 0, void 0, function() {
              const jsv = this;
              var r3 = jsv;
              return i(this, function(i2) {
                return [
                  2,
                  new Promise(function(i3, c2) {
                    var l, d, h = [], f = 0;
                    if (options.imageUrls && options.imageUrls.length > 0) h = options.imageUrls, f = options.imageUrls.length;
                    else {
                      f = options.totalFrames;
                      var g2 = options.imageUrls || [], p = options.mainImageUrl, m = p.length > 0 ? p : e2.src;
                      h = g2.length > 0 ? g2 : r3.generateImagesUrlsFromFormat(m, options);
                    }
                    var v = options.zoom ? options.zoomMax : 1, y = t3.clientWidth, b2 = t3.clientHeight, w = "";
                    options.autoCDNResizer && options.zoom && (null === (l = options.autoCDNResizerConfig) || void 0 === l ? void 0 : l.scaleWithZoomMax) && (y *= v, b2 *= v, w = (null === (d = options.autoCDNResizerConfig) || void 0 === d ? void 0 : d.useWidth) ? "jsv-width-100" : "jsv-height-100");
                    var x = h.map(function(t4, e3) {
                      var r4, i4;
                      if (options.autoCDNResizer) {
                        var o3 = new URL(t4);
                        (null === (r4 = options.autoCDNResizerConfig) || void 0 === r4 ? void 0 : r4.useHeight) && o3.searchParams.set("height", b2.toString()), (null === (i4 = options.autoCDNResizerConfig) || void 0 === i4 ? void 0 : i4.useWidth) && o3.searchParams.set("width", y.toString()), t4 = o3.toString();
                      }
                      const n3 = document.createElement("img");
                      n3.className = "i" + e3;
                      const d2 = document.createElement("div");
                      d2.style.display = e3 == 0 || navigator.isFirefox ? "block" : "none";
                      d2.className = "d360 d" + e3;
                      d2.append(n3);
                      imageHolderElement.append(d2);
                      if (!t4 && navigator.isWebkit) {
                        const contentUrl = getComputedStyle(n3).content;
                        n3.className = "p" + e3;
                        const url = contentUrl.substring(5, contentUrl.length - 2) || options?.mainImage?.img?.src;
                        t4 = url;
                      }
                      const result = {
                        img: n3,
                        div: d2,
                        src: t4,
                        id: "i" + e3.toString(),
                        jsv,
                        options,
                        mainImage: options.mainImage,
                        mainImageId: options.mainImageId,
                        sequence: e3,
                        encoded: "",
                        extraClass: options.extraImageClass + " " + w
                      };
                      result.i0 = options.i0 || (options.i0 = result);
                      options.frames = options.frames || [];
                      options.frames.push(result);
                      return result;
                    }), E = 1;
                    h = x.map(function(t4) {
                      return t4.src;
                    }), a.default(h, u2, {
                      onSingleImageComplete: function(t4) {
                        if (E > x.length) return;
                        let i4 = x[E - 1];
                        if (i4) {
                          i4.encoded = "", i4.naturalWidth = t4?.naturalWidth, i4.naturalHeight = t4?.naturalHeight, i4.onloaded = t4?.onloaded;
                        }
                        o2.loadImage({
                          fake: t4.fake,
                          onloaded: t4.onloaded,
                          currentImage: E,
                          totalImages: f,
                          percentage: Math.round(E / f * 100),
                          img: t4.img,
                          div: t4.div,
                          image: x[E - 1]
                        }), E++;
                      },
                      onSingleImageFail: function(t4) {
                        c2(new Error("Failed loading image, are you using a good imageUrlFormat? =>" + t4));
                      }
                    }).then(function() {
                      if (E > h.length + 1) return;
                      E - 1 === h.length ? i3(x) : c2(new Error("Not all images are loaded " + (E - 1) + " from " + h.length + ". \n                    Check the warning to see the image urls we are trying to fetch"));
                    }).catch(function(t4) {
                      c2(t4);
                    });
                  })
                ];
              });
            });
          }, t2.getMainImage = function(t3, e2) {
            var n2 = e2.document.getElementById(t3);
            if (n2 instanceof HTMLPictureElement) {
              var r3 = n2.querySelector("img");
              if (r3) {
                var i2 = r3.src;
                return r3.hasAttribute("data-src") && (i2 = r3.getAttribute("data-src")), { img: r3, src: i2, id: t3, sequence: 0, extraClass: "" };
              }
            }
            if (n2 instanceof HTMLImageElement) {
              i2 = n2.src;
              return n2.hasAttribute("data-src") && (i2 = n2.getAttribute("data-src")), { img: n2, src: i2, id: t3, sequence: 0, extraClass: "" };
            }
            throw new o.default('Could not find main image with id "' + t3 + '"');
          }, t2.getMainImageFromURl = function(t3) {
            return { src: t3, id: "", sequence: 0, extraClass: "" };
          }, t2.getMainImageElement = function(t3, e2) {
            var n2 = e2.document.getElementById(t3);
            if (n2 instanceof HTMLImageElement || n2 instanceof HTMLPictureElement) return n2;
            throw new o.default('Could not find main image with id "' + t3 + '"');
          }, t2.blurMainImage = function(t3, e2) {
            var n2 = e2.document.getElementById(t3);
            n2 instanceof HTMLImageElement && (n2.style.filter = "blur(5px)");
          }, t2.hideReadyNotification = function(t3, e2, n2) {
            var r3 = "notification_" + e2;
            return u.DomUtilities.addHiddenStyle(r3, n2, 700);
          }, t2.createOrGetPoweredBy = function(t3, e2, n2, r3, i2) {
            return null;
          }, t2.createReadyNotification = function(t3, e2, n2, r3) {
            var i2 = n2.document.createElement("div");
            i2.style.position = "absolute", i2.style.display = "flex", i2.style.alignItems = "center", i2.style.justifyContent = "center", i2.id = "notification_" + e2, i2.style.zIndex = "200", i2.style.top = "50%", i2.style.left = "50%", i2.style.height = "20%", i2.style.width = "20%", i2.style.pointerEvents = "none", i2.style.transform = "translate(-50%, -50%)", t3.dragToRotate.showStartToRotateDefaultNotification && (i2.innerHTML = s.Notifications.getReadyForRotate(t3)), !t3.dragToRotate.showStartToRotateDefaultNotification && t3.dragToRotate.imageUrl.length > 0 && (i2.innerHTML = s.Notifications.getNotificationCustomImage(t3)), r3.appendChild(i2);
          }, t2.createProgressBar = function(t3, e2, n2) {
            var r3 = e2.document.createElement("div");
            r3.style.display = "flex", r3.style.position = "absolute", r3.style.height = "5px", r3.style.width = "30%", r3.style.overflow = "hidden", r3.style.backgroundColor = "#e9ecef", r3.style.borderRadius = "0.25rem", r3.id = "loader_" + t3, r3.style.zIndex = "200", r3.style.top = "50%", r3.style.left = "50%", r3.style.transform = "translate(-50%, -50%)";
            var i2 = e2.document.createElement("div");
            return i2.style.backgroundColor = "#6a6d71", r3.appendChild(i2), n2.appendChild(r3), r3;
          }, t2.getImagesPath = function(t3) {
            var e2 = t3.replace(/^.*[\\/]/, "");
            return t3.substring(0, t3.length - e2.length);
          }, t2;
        })();
        e.Images = c;
      },
      function(t, e, n) {
        "use strict";
        var r2 = this && this.__awaiter || function(t2, e2, n2, r3) {
          return new (n2 || (n2 = Promise))(function(i2, o2) {
            function a(t3) {
              try {
                u(r3.next(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function s(t3) {
              try {
                u(r3.throw(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function u(t3) {
              var e3;
              t3.done ? i2(t3.value) : (e3 = t3.value, e3 instanceof n2 ? e3 : new n2(function(t4) {
                t4(e3);
              })).then(a, s);
            }
            u((r3 = r3.apply(t2, e2 || [])).next());
          });
        }, i = this && this.__generator || function(t2, e2) {
          var n2, r3, i2, o2, a = {
            label: 0,
            sent: function() {
              if (1 & i2[0]) throw i2[1];
              return i2[1];
            },
            trys: [],
            ops: []
          };
          return o2 = { next: s(0), throw: s(1), return: s(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function s(o3) {
            return function(s2) {
              return (function(o4) {
                if (n2) throw new TypeError("Generator is already executing.");
                for (; a; )
                  try {
                    if (n2 = 1, r3 && (i2 = 2 & o4[0] ? r3.return : o4[0] ? r3.throw || ((i2 = r3.return) && i2.call(r3), 0) : r3.next) && !(i2 = i2.call(r3, o4[1])).done) return i2;
                    switch (r3 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                      case 0:
                      case 1:
                        i2 = o4;
                        break;
                      case 4:
                        return a.label++, { value: o4[1], done: false };
                      case 5:
                        a.label++, r3 = o4[1], o4 = [0];
                        continue;
                      case 7:
                        o4 = a.ops.pop(), a.trys.pop();
                        continue;
                      default:
                        if (!(i2 = a.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                          a = 0;
                          continue;
                        }
                        if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                          a.label = o4[1];
                          break;
                        }
                        if (6 === o4[0] && a.label < i2[1]) {
                          a.label = i2[1], i2 = o4;
                          break;
                        }
                        if (i2 && a.label < i2[2]) {
                          a.label = i2[2], a.ops.push(o4);
                          break;
                        }
                        i2[2] && a.ops.pop(), a.trys.pop();
                        continue;
                    }
                    o4 = e2.call(t2, a);
                  } catch (t3) {
                    o4 = [6, t3], r3 = 0;
                  } finally {
                    n2 = i2 = 0;
                  }
                if (5 & o4[0]) throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              })([o3, s2]);
            };
          }
        }, o = this && this.__spreadArrays || function() {
          for (var t2 = 0, e2 = 0, n2 = arguments.length; e2 < n2; e2++) t2 += arguments[e2].length;
          var r3 = Array(t2), i2 = 0;
          for (e2 = 0; e2 < n2; e2++) for (var o2 = arguments[e2], a = 0, s = o2.length; a < s; a++, i2++) r3[i2] = o2[a];
          return r3;
        };
        Object.defineProperty(e, "__esModule", { value: true }), e.default = function(t2, e2, n2) {
          return r2(this, void 0, void 0, function() {
            var e3, a, s, u = this;
            return i(this, function(c) {
              return e3 = function(t3) {
                return r2(u, void 0, void 0, function() {
                  return i(this, function(e4) {
                    return [
                      2,
                      new Promise(function(e5, r3) {
                        var i2 = new Image();
                        function onLoaded(event) {
                          let i3 = event.target;
                          i3.naturalWidth < 1 ? r3(new Error("image (" + t3 + " is smaller then 10 px, probably not exist")) : (n2.onSingleImageComplete({
                            img: i3,
                            result: i3.src,
                            url: t3,
                            status: 200,
                            naturalWidth: i3.naturalWidth,
                            naturalHeight: i3.naturalHeight
                          }), e5());
                        }
                        i2.src = t3, i2.onload = onLoaded, i2.onerror = function(ev) {
                          if (t3 == "") {
                            n2.onSingleImageComplete({
                              onloaded: onLoaded,
                              fake: true,
                              img: i2,
                              result: "",
                              url: t3,
                              status: 200,
                              naturalWidth: 1920,
                              naturalHeight: 1080
                            }), e5();
                          } else n2.onSingleImageFail("failed loading " + t3);
                        };
                      })
                    ];
                  });
                });
              }, a = function(t3, e4) {
                for (var n3 = [], r3 = o(t3), i2 = Math.ceil(r3.length / e4), a2 = 0; a2 < i2; a2++) n3.push(r3.splice(0, e4));
                return n3;
              }, s = function(t3) {
                return r2(u, void 0, void 0, function() {
                  return i(this, function(n3) {
                    return [2, Promise.all(t3.map(e3))];
                  });
                });
              }, [
                2,
                new Promise(function(e4, n3) {
                  var r3 = a(t2, 10), i2 = function(t3) {
                    var o2 = t3.shift();
                    void 0 !== o2 && s(o2).then(function() {
                      0 === r3.length ? e4() : i2(t3);
                    }).catch(function(t4) {
                      n3(t4);
                    });
                  };
                  i2(r3);
                })
              ];
            });
          });
        };
      },
      function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true }), e.Notifications = void 0;
        var r2 = n(9), i = n(1), o = (function() {
          function t2() {
          }
          return t2.getNotificationCustomImage = function(t3) {
            return '<img src="' + t3.dragToRotate.imageUrl + '" class="jsv-notification" />';
          }, t2.getReadyForRotate = function(t3) {
            return '<div style="display: flex; align-items: center; flex-direction: column;">\n' + this.getSvg(t3) + " " + this.getText(t3) + "</div>";
          }, t2.getPoweredBy = function(t3, e2) {
            return null;
          }, t2.getMainColor = function(t3) {
            var e2 = i.hexToRgb(t3.dragToRotate.mainColor);
            return null === e2 && (e2 = { r: 0, g: 0, b: 0, a: 1 }), e2;
          }, t2.getTextColor = function(t3) {
            var e2 = i.hexToRgb(t3.dragToRotate.textColor);
            return null === e2 && (e2 = { r: 0, g: 0, b: 0, a: 1 }), e2;
          }, t2.getText = function(t3) {
            var e2 = r2.Localisation.getDragToRotate(t3), n2 = this.getMainColor(t3), i2 = this.getTextColor(t3);
            return '<div  style="text-align: center; font-size: 12px; padding:0.2em 0.5em; white-space: nowrap; color: rgba(' + i2.r + ", " + i2.g + ", " + i2.b + ");\n background-color: rgba(" + n2.r + ", " + n2.g + ", " + n2.b + ", " + n2.a + ');  border-radius: 0.5em;">\n<span>' + e2 + "</span>\n</div>";
          }, t2.getLogoSvg = function() {
            return '<svg preserveAspectRatio="xMaxYMid meet" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" xmlns:v="https://vecta.io/nano"><path  d="M14.9.2c4.1 0 7.7 1.6 10.4 4.3s4.3 6.3 4.3 10.4-1.6 7.7-4.3 10.4-6.3 4.3-10.4 4.3S7.2 28 4.5 25.3.2 19 .2 14.9 1.9 7.2 4.5 4.5 10.9.2 14.9.2zm9.5 5.3c-2.4-2.5-5.8-4-9.5-4s-7 1.5-9.4 4-3.9 5.8-3.9 9.5 1.5 7 3.9 9.5 5.8 3.9 9.5 3.9 7-1.5 9.5-3.9 3.9-5.8 3.9-9.5-1.6-7.1-4-9.5"/><path d="M25.3 21.8c-.3.9-1.7 2.2-2.6 2.9-5.4 4.3-12.8 3.6-17.3-1.6-1.6-1.8-3.1-5.2-2.9-7.6 1.2 1.3 4 2.2 5.7 2.7 5.5 1.6 14.1 1.7 19.1-2.7 0 .6-.6 1.7-1 2.3-2.9 3.9-8 5-12.5 4.7-2.8-.2-4-.8-4.8-.9 1.1.9 3.4 1.4 4.7 1.6l3 .3c6.1-.2 7.2-1.3 8.6-1.7" fill-rule="evenodd"/><path d="M4.6 12.5c3.6 1.6 5.8 2.1 9.9 1.8 2.5-.2 5.4-.9 7.9-2.3 3.2-2 2.6-3.6 2.8-4.4 3.1 5.8-6.3 10.1-10.9 10-4.9.1-7.5-.6-11.8-2.3-.1-1.7.4-4.3 1.1-5.8C6.8 3 14.7.7 20.5 3.6c1 .5 2.7 1.5 3.2 3 1.2 4.1-6.9 6.4-9.6 6.7-3.9.5-5.9 0-9.5-.8" fill="#c40005"/></svg>';
          }, t2.getSvg = function(t3) {
            var e2 = this.getMainColor(t3), n2 = this.getTextColor(t3), r3 = "rgba(" + e2.r + ", " + e2.g + ", " + e2.b + ", " + e2.a + ")", i2 = "rgba(" + n2.r + ", " + n2.g + ", " + n2.b + ", " + n2.a + ")";
            return '<div style="max-width: 120px; width: 100%; padding: 5% 15%;">\n<svg viewBox="90.63 81.107 335.724 216.946" xmlns="http://www.w3.org/2000/svg">\n  <defs>\n    <clipPath id="clipPath26">\n      <path d="m0 1872h2272v-1872h-2272z" id="path720"/>\n    </clipPath>\n  </defs>\n  <g id="Layer_2">\n    <g>\n      <g transform="matrix(1, 0, 0, 1, 0, 31)">\n        <circle fill-rule="evenodd" clip-rule="evenodd" cx="256" cy="185" r="175" fill="' + r3 + '" transform="matrix(0.959211, 0, 0, 0.619847, 12.934134, 43.908459)"/>\n        <g id="g769" transform="matrix(11.198128, 0, 0, 11.248407, 83.541389, 67.014397)" style="">\n          <g transform="matrix(0.025142, 0, 0, -0.022177, -12.123219, 30.249571)" clip-path="url(#clipPath26)" fill:"url(#linearGradient885)" id="g761" style="fill: url(#linearGradient885);">\n            <g transform="translate(1368.2,787.12)" id="g731" style="fill:url(#linearGradient777)">\n              <path d="m 0,0 -207.95,86.789 c -3.52,1.661 -7.664,1.32 -10.867,-0.892 -3.203,-2.217 -4.981,-5.974 -4.663,-9.859 l 3.925,-47.857 c -15.131,-0.383 -30.426,-0.563 -45.9,-0.484 -254.84,1.307 -467.33,61.883 -519.27,172.51 -1.861,-8.744 -2.841,-29.185 -2.887,-38.174 -0.735,-143.3 235.03,-260.67 526.59,-262.17 17.515,-0.089 34.825,0.254 51.899,0.996 l 4.434,-54.087 c 0.319,-3.883 2.685,-7.3 6.205,-8.967 3.521,-1.662 7.665,-1.322 10.869,0.891 l 189.15,142.47 c 3.203,2.219 4.98,5.975 4.662,9.86 -0.319,3.884 -2.685,7.301 -6.206,8.968" id="path729" style="fill:' + i2 + '; paint-order: stroke;"/>\n            </g>\n            <g transform="translate(1636.5,943.74)" id="g735" style="fill:url(#linearGradient781)">\n              <path d="m 0,0 c 0.071,13.962 -2.169,39.231 -6.421,52.618 -28.864,-83.165 -148.3,-140.31 -310.08,-166.06 l 92.158,-36.446 c 3.622,-1.435 6.206,-4.691 6.778,-8.546 0.57,-3.855 -0.96,-7.72 -4.011,-10.142 l -81.037,-64.28 c 178.42,40.757 302.08,129.41 302.61,232.85" id="path733" style="fill:' + n2 + '; paint-order: stroke;"/>\n            </g>\n            <g transform="translate(749.04,1092.5)" id="g739" style="fill:url(#linearGradient785)">\n              <path d="m 0,0 v 80.728 c -98.906,-34.704 -160.82,-83.963 -161.17,-138.88 -0.09,-14.262 4.092,-28.161 11.877,-41.572 12.635,48.038 67.386,67.816 149.29,99.722" id="path737" style="fill:' + i2 + ' ; paint-order: stroke;"/>\n            </g>\n            <g transform="translate(1468.1,1090.1)" id="g743" style="fill:url(#linearGradient789)">\n              <path d="m 0,0 c 75.974,-30.102 128.61,-46.357 145.87,-90.299 4.221,9.835 6.496,19.92 6.562,30.21 0.339,53.62 -58.025,102.36 -152.43,137.69 z" id="path741" style="fill:' + i2 + '; paint-order: stroke;"/>\n            </g>\n            <g transform="translate(780.58,981.42)" id="g747" style="fill:url(#linearGradient793)">\n              <path d="m 0,0 c -16.619,0 -29.094,3.449 -41.02,7.881 l -16.618,-51.717 c 9.852,-4.933 33.238,-9.866 58.653,-9.866 73.241,0 124.66,45.32 124.66,108.37 0,30.059 -15.563,56.148 -42.584,67.478 l 0.507,0.983 c 31.166,10.849 61.274,40.888 61.274,82.257 0,32.025 -19.197,68.962 -81.53,68.962 -24.908,0 -47.784,-6.397 -58.695,-11.329 L 4.14,211.803 c 8.838,4.431 22.877,8.362 36.367,8.362 23.385,0 36.367,-11.811 36.367,-30.039 0,-33.007 -36.875,-45.32 -60.767,-45.32 H 9.341 L -0.004,96.538 h 9.345 c 26.472,0 50.914,-12.813 50.914,-44.337 C 60.255,21.68 35.813,0.003 -0.004,0.003" id="path745" style="fill:' + i2 + '; paint-order: stroke;"/>\n            </g>\n            <g transform="translate(1022.7,1054.8)" id="g751" style="fill:url(#linearGradient797)">\n              <path d="m 0,0 c 1.057,2.948 2.072,6.397 3.129,9.846 7.781,17.727 23.385,30.541 36.875,30.541 17.126,0 23.892,-14.298 23.892,-32.025 0,-33.488 -11.417,-90.619 -44.148,-90.619 -17.676,0 -23.385,20.193 -23.385,40.868 0,10.848 0.55,23.161 3.637,41.389 m 15.604,-127.1 c 67.491,0 112.7,67.98 112.7,139.89 0,30.541 -14.547,72.411 -60.767,72.913 -18.691,0 -37.382,-8.383 -50.365,-22.66 h -2.114 c 19.241,45.3 51.422,73.875 92.991,82.739 6.215,1.483 11.924,2.466 18.183,2.466 l 9.346,52.699 c -5.202,0 -9.896,0 -18.692,-1.483 C 81.534,195.032 46.224,180.273 16.116,154.163 -21.816,121.156 -64.4,54.661 -64.4,-28.577 c 0,-47.285 18.734,-98.52 80.009,-98.52" id="path749" style="fill:' + i2 + '; paint-order: stroke;"/>\n            </g>\n            <g transform="translate(1309,1203.6)" id="g755" style="fill:url(#linearGradient801)">\n              <path d="m 0,0 c 12.982,0 18.691,-14.779 18.691,-35.474 0,-35.955 -20.255,-188.16 -60.767,-188.16 -15.604,0 -21.313,15.28 -21.313,41.87 0,40.888 21.821,181.76 63.389,181.76 m -50.914,-275.85 c 95.062,0 132.44,137.92 132.44,231.01 0,36.938 -8.839,97.037 -75.314,97.037 -84.66,0 -131.9,-120.68 -131.9,-228.54 0,-44.317 12.983,-99.504 74.765,-99.504" id="path753" style="fill:' + i2 + '; paint-order: stroke;"/>\n            </g>\n            <g transform="translate(1442.6,1286.9)" id="g759" style="fill:url(#linearGradient805)">\n              <path d="m 0,0 c 18.013,0 32.613,-15.92 32.613,-35.559 0,-19.638 -14.6,-35.558 -32.613,-35.558 -18.011,0 -32.612,15.92 -32.612,35.558 C -32.612,-15.92 -18.011,0 0,0 m 0,-91.835 c 28.506,0 51.615,25.196 51.615,56.276 0,31.081 -23.109,56.277 -51.615,56.277 -28.505,0 -51.614,-25.196 -51.614,-56.277 0,-31.08 23.109,-56.276 51.614,-56.276" id="path757" style="fill:' + i2 + '; paint-order: stroke;"/>\n            </g>\n          </g>\n        </g>\n      </g>\n    </g>\n  </g>\n</svg>\n</div>';
          }, t2;
        })();
        e.Notifications = o;
      },
      function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true }), e.Localisation = void 0;
        var r2 = n(10), i = n(11), o = (function() {
          function t2() {
          }
          return t2.getDragToRotate = function(t3) {
            for (var e2 = r2.getUserLocale(), n2 = 0, i2 = t3.dragToRotate.languages; n2 < i2.length; n2++) {
              var o2 = i2[n2];
              if (o2.language === e2) return o2.text;
            }
            var a = this.getTranslation(e2);
            return null === a && (a = this.getTranslation("en")), null == a ? void 0 : a.dragToRotate;
          }, t2.getTranslation = function(t3) {
            for (var e2 = 0, n2 = i.translations; e2 < n2.length; e2++) {
              if ((s = n2[e2]).language === t3) return s;
            }
            for (var r3 = t3.split("-").shift(), o2 = 0, a = i.translations; o2 < a.length; o2++) {
              var s;
              if ((s = a[o2]).language === r3) return s;
            }
            return null;
          }, t2;
        })();
        e.Localisation = o;
      },
      function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "getUserLocales", function() {
          return o;
        }), n.d(e, "getUserLocale", function() {
          return a;
        });
        var r2 = n(2), i = n.n(r2);
        var o = i()(function() {
          var t2 = [];
          return "undefined" != typeof window && (window.navigator.languages && (t2 = t2.concat(window.navigator.languages)), window.navigator.language && t2.push(window.navigator.language), window.navigator.userLanguage && t2.push(window.navigator.userLanguage), window.navigator.browserLanguage && t2.push(window.navigator.browserLanguage), window.navigator.systemLanguage && t2.push(window.navigator.systemLanguage)), t2.push("en-US"), (function(t3) {
            return t3.map(function(t4) {
              if (!t4 || -1 === t4.indexOf("-") || t4.toLowerCase() !== t4) return t4;
              var e2 = t4.split("-");
              return "".concat(e2[0], "-").concat(e2[1].toUpperCase());
            });
          })(
            t2.filter(function(t3, e2, n2) {
              return n2.indexOf(t3) === e2;
            })
          );
        });
        var a = i()(function() {
          return o()[0];
        });
        e.default = a;
      },
      function(t) {
        t.exports = JSON.parse(
          '{"translations":[{"language":"en","dragToRotate":"Drag To Rotate"},{"language":"nl","dragToRotate":"Sleep Voor Roteren"},{"language":"es","dragToRotate":"arrastrar para rotar"},{"language":"ru","dragToRotate":"\u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C"},{"language":"fr","dragToRotate":"faire glisser pour faire pivoter"},{"language":"ch","dragToRotate":"\u62D6\u52A8\u65CB\u8F6C"},{"language":"it","dragToRotate":"trascina per ruotare"},{"language":"de","dragToRotate":"zum Drehen ziehen"},{"language":"ko","dragToRotate":"\uB4DC\uB798\uADF8\uD558\uC5EC \uD68C\uC804"},{"language":"pt","dragToRotate":"arraste para girar"}]}'
        );
      },
      function(t, e, n) {
        var r2 = n(13);
        t.exports = function(t2) {
          var e2, n2, i, o;
          if (e2 = /^((?:rgb|hs[lv]|cmyk|xyz|lab)a?)\s*\(([^\)]*)\)/.exec(t2)) {
            var a = e2[1], s = "cmyk" === (u = a.replace(/a$/, "")) ? 4 : 3;
            n2 = r2[u], i = e2[2].replace(/^\s+|\s+$/g, "").split(/\s*,\s*/).map(function(t3, e3) {
              return /%$/.test(t3) && e3 === s ? parseFloat(t3) / 100 : (/%$/.test(t3), parseFloat(t3));
            }), a === u && i.push(1), o = void 0 === i[s] ? 1 : i[s], i = i.slice(0, s), n2[u] = function() {
              return i;
            };
          } else if (/^#[A-Fa-f0-9]+$/.test(t2)) {
            var u;
            s = (u = t2.replace(/^#/, "")).length;
            n2 = r2.rgb, i = (i = u.split(3 === s ? /(.)/ : /(..)/)).filter(Boolean).map(function(t3) {
              return 3 === s ? parseInt(t3 + t3, 16) : parseInt(t3, 16);
            }), o = 1, n2.rgb = function() {
              return i;
            }, i[0] || (i[0] = 0), i[1] || (i[1] = 0), i[2] || (i[2] = 0);
          } else
            (n2 = r2.keyword).keyword = function() {
              return t2;
            }, i = t2, o = 1;
          var c = {
            rgb: void 0,
            hsl: void 0,
            hsv: void 0,
            cmyk: void 0,
            keyword: void 0,
            hex: void 0
          };
          try {
            c.rgb = n2.rgb(i);
          } catch (t3) {
          }
          try {
            c.hsl = n2.hsl(i);
          } catch (t3) {
          }
          try {
            c.hsv = n2.hsv(i);
          } catch (t3) {
          }
          try {
            c.cmyk = n2.cmyk(i);
          } catch (t3) {
          }
          try {
            c.keyword = n2.keyword(i);
          } catch (t3) {
          }
          return c.rgb && (c.hex = "#" + c.rgb.map(function(t3) {
            var e3 = t3.toString(16);
            return 1 === e3.length ? "0" + e3 : e3;
          }).join("")), c.rgb && (c.rgba = c.rgb.concat(o)), c.hsl && (c.hsla = c.hsl.concat(o)), c.hsv && (c.hsva = c.hsv.concat(o)), c.cmyk && (c.cmyka = c.cmyk.concat(o)), c;
        };
      },
      function(t, e, n) {
        var r2 = n(14), i = function() {
          return new c();
        };
        for (var o in r2) {
          i[o + "Raw"] = /* @__PURE__ */ (function(t2) {
            return function(e2) {
              return "number" == typeof e2 && (e2 = Array.prototype.slice.call(arguments)), r2[t2](e2);
            };
          })(o);
          var a = /(\w+)2(\w+)/.exec(o), s = a[1], u = a[2];
          (i[s] = i[s] || {})[u] = i[o] = /* @__PURE__ */ (function(t2) {
            return function(e2) {
              "number" == typeof e2 && (e2 = Array.prototype.slice.call(arguments));
              var n2 = r2[t2](e2);
              if ("string" == typeof n2 || void 0 === n2) return n2;
              for (var i2 = 0; i2 < n2.length; i2++) n2[i2] = Math.round(n2[i2]);
              return n2;
            };
          })(o);
        }
        var c = function() {
          this.convs = {};
        };
        c.prototype.routeSpace = function(t2, e2) {
          var n2 = e2[0];
          return void 0 === n2 ? this.getValues(t2) : ("number" == typeof n2 && (n2 = Array.prototype.slice.call(e2)), this.setValues(t2, n2));
        }, c.prototype.setValues = function(t2, e2) {
          return this.space = t2, this.convs = {}, this.convs[t2] = e2, this;
        }, c.prototype.getValues = function(t2) {
          var e2 = this.convs[t2];
          if (!e2) {
            var n2 = this.space, r3 = this.convs[n2];
            e2 = i[n2][t2](r3), this.convs[t2] = e2;
          }
          return e2;
        }, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(t2) {
          c.prototype[t2] = function(e2) {
            return this.routeSpace(t2, arguments);
          };
        }), t.exports = i;
      },
      function(t, e) {
        function n(t2) {
          var e2, n2, r2 = t2[0] / 255, i2 = t2[1] / 255, o2 = t2[2] / 255, a2 = Math.min(r2, i2, o2), s2 = Math.max(r2, i2, o2), u2 = s2 - a2;
          return s2 == a2 ? e2 = 0 : r2 == s2 ? e2 = (i2 - o2) / u2 : i2 == s2 ? e2 = 2 + (o2 - r2) / u2 : o2 == s2 && (e2 = 4 + (r2 - i2) / u2), (e2 = Math.min(60 * e2, 360)) < 0 && (e2 += 360), n2 = (a2 + s2) / 2, [e2, 100 * (s2 == a2 ? 0 : n2 <= 0.5 ? u2 / (s2 + a2) : u2 / (2 - s2 - a2)), 100 * n2];
        }
        function i(t2) {
          var e2, n2, r2 = t2[0], i2 = t2[1], o2 = t2[2], a2 = Math.min(r2, i2, o2), s2 = Math.max(r2, i2, o2), u2 = s2 - a2;
          return n2 = 0 == s2 ? 0 : u2 / s2 * 1e3 / 10, s2 == a2 ? e2 = 0 : r2 == s2 ? e2 = (i2 - o2) / u2 : i2 == s2 ? e2 = 2 + (o2 - r2) / u2 : o2 == s2 && (e2 = 4 + (r2 - i2) / u2), (e2 = Math.min(60 * e2, 360)) < 0 && (e2 += 360), [e2, n2, s2 / 255 * 1e3 / 10];
        }
        function o(t2) {
          var e2 = t2[0], r2 = t2[1], i2 = t2[2];
          return [n(t2)[0], 100 * (1 / 255 * Math.min(e2, Math.min(r2, i2))), 100 * (i2 = 1 - 1 / 255 * Math.max(e2, Math.max(r2, i2)))];
        }
        function a(t2) {
          var e2, n2 = t2[0] / 255, r2 = t2[1] / 255, i2 = t2[2] / 255;
          return [100 * ((1 - n2 - (e2 = Math.min(1 - n2, 1 - r2, 1 - i2))) / (1 - e2) || 0), 100 * ((1 - r2 - e2) / (1 - e2) || 0), 100 * ((1 - i2 - e2) / (1 - e2) || 0), 100 * e2];
        }
        function s(t2) {
          return I[JSON.stringify(t2)];
        }
        function u(t2) {
          var e2 = t2[0] / 255, n2 = t2[1] / 255, r2 = t2[2] / 255;
          return [
            100 * (0.4124 * (e2 = e2 > 0.04045 ? Math.pow((e2 + 0.055) / 1.055, 2.4) : e2 / 12.92) + 0.3576 * (n2 = n2 > 0.04045 ? Math.pow((n2 + 0.055) / 1.055, 2.4) : n2 / 12.92) + 0.1805 * (r2 = r2 > 0.04045 ? Math.pow((r2 + 0.055) / 1.055, 2.4) : r2 / 12.92)),
            100 * (0.2126 * e2 + 0.7152 * n2 + 0.0722 * r2),
            100 * (0.0193 * e2 + 0.1192 * n2 + 0.9505 * r2)
          ];
        }
        function c(t2) {
          var e2 = u(t2), n2 = e2[0], r2 = e2[1], i2 = e2[2];
          return r2 /= 100, i2 /= 108.883, n2 = (n2 /= 95.047) > 8856e-6 ? Math.pow(n2, 1 / 3) : 7.787 * n2 + 16 / 116, [116 * (r2 = r2 > 8856e-6 ? Math.pow(r2, 1 / 3) : 7.787 * r2 + 16 / 116) - 16, 500 * (n2 - r2), 200 * (r2 - (i2 = i2 > 8856e-6 ? Math.pow(i2, 1 / 3) : 7.787 * i2 + 16 / 116))];
        }
        function l(t2) {
          var e2, n2, r2, i2, o2, a2 = t2[0] / 360, s2 = t2[1] / 100, u2 = t2[2] / 100;
          if (0 == s2) return [o2 = 255 * u2, o2, o2];
          e2 = 2 * u2 - (n2 = u2 < 0.5 ? u2 * (1 + s2) : u2 + s2 - u2 * s2), i2 = [0, 0, 0];
          for (var c2 = 0; c2 < 3; c2++) (r2 = a2 + 1 / 3 * -(c2 - 1)) < 0 && r2++, r2 > 1 && r2--, o2 = 6 * r2 < 1 ? e2 + 6 * (n2 - e2) * r2 : 2 * r2 < 1 ? n2 : 3 * r2 < 2 ? e2 + (n2 - e2) * (2 / 3 - r2) * 6 : e2, i2[c2] = 255 * o2;
          return i2;
        }
        function d(t2) {
          var e2 = t2[0] / 60, n2 = t2[1] / 100, r2 = t2[2] / 100, i2 = Math.floor(e2) % 6, o2 = e2 - Math.floor(e2), a2 = 255 * r2 * (1 - n2), s2 = 255 * r2 * (1 - n2 * o2), u2 = 255 * r2 * (1 - n2 * (1 - o2));
          r2 *= 255;
          switch (i2) {
            case 0:
              return [r2, u2, a2];
            case 1:
              return [s2, r2, a2];
            case 2:
              return [a2, r2, u2];
            case 3:
              return [a2, s2, r2];
            case 4:
              return [u2, a2, r2];
            case 5:
              return [r2, a2, s2];
          }
        }
        function h(t2) {
          var e2, n2, i2, o2, a2 = t2[0] / 360, s2 = t2[1] / 100, u2 = t2[2] / 100, c2 = s2 + u2;
          switch (c2 > 1 && (s2 /= c2, u2 /= c2), i2 = 6 * a2 - (e2 = Math.floor(6 * a2)), 0 != (1 & e2) && (i2 = 1 - i2), o2 = s2 + i2 * ((n2 = 1 - u2) - s2), e2) {
            default:
            case 6:
            case 0:
              r = n2, g = o2, b = s2;
              break;
            case 1:
              r = o2, g = n2, b = s2;
              break;
            case 2:
              r = s2, g = n2, b = o2;
              break;
            case 3:
              r = s2, g = o2, b = n2;
              break;
            case 4:
              r = o2, g = s2, b = n2;
              break;
            case 5:
              r = n2, g = s2, b = o2;
          }
          return [255 * r, 255 * g, 255 * b];
        }
        function f(t2) {
          var e2 = t2[0] / 100, n2 = t2[1] / 100, r2 = t2[2] / 100, i2 = t2[3] / 100;
          return [255 * (1 - Math.min(1, e2 * (1 - i2) + i2)), 255 * (1 - Math.min(1, n2 * (1 - i2) + i2)), 255 * (1 - Math.min(1, r2 * (1 - i2) + i2))];
        }
        function p(t2) {
          var e2, n2, r2, i2 = t2[0] / 100, o2 = t2[1] / 100, a2 = t2[2] / 100;
          return n2 = -0.9689 * i2 + 1.8758 * o2 + 0.0415 * a2, r2 = 0.0557 * i2 + -0.204 * o2 + 1.057 * a2, e2 = (e2 = 3.2406 * i2 + -1.5372 * o2 + -0.4986 * a2) > 31308e-7 ? 1.055 * Math.pow(e2, 1 / 2.4) - 0.055 : e2 *= 12.92, n2 = n2 > 31308e-7 ? 1.055 * Math.pow(n2, 1 / 2.4) - 0.055 : n2 *= 12.92, r2 = r2 > 31308e-7 ? 1.055 * Math.pow(r2, 1 / 2.4) - 0.055 : r2 *= 12.92, [255 * (e2 = Math.min(Math.max(0, e2), 1)), 255 * (n2 = Math.min(Math.max(0, n2), 1)), 255 * (r2 = Math.min(Math.max(0, r2), 1))];
        }
        function m(t2) {
          var e2 = t2[0], n2 = t2[1], r2 = t2[2];
          return n2 /= 100, r2 /= 108.883, e2 = (e2 /= 95.047) > 8856e-6 ? Math.pow(e2, 1 / 3) : 7.787 * e2 + 16 / 116, [116 * (n2 = n2 > 8856e-6 ? Math.pow(n2, 1 / 3) : 7.787 * n2 + 16 / 116) - 16, 500 * (e2 - n2), 200 * (n2 - (r2 = r2 > 8856e-6 ? Math.pow(r2, 1 / 3) : 7.787 * r2 + 16 / 116))];
        }
        function v(t2) {
          var e2, n2, r2, i2, o2 = t2[0], a2 = t2[1], s2 = t2[2];
          return o2 <= 8 ? i2 = (n2 = 100 * o2 / 903.3) / 100 * 7.787 + 16 / 116 : (n2 = 100 * Math.pow((o2 + 16) / 116, 3), i2 = Math.pow(n2 / 100, 1 / 3)), [e2 = e2 / 95.047 <= 8856e-6 ? e2 = 95.047 * (a2 / 500 + i2 - 16 / 116) / 7.787 : 95.047 * Math.pow(a2 / 500 + i2, 3), n2, r2 = r2 / 108.883 <= 8859e-6 ? r2 = 108.883 * (i2 - s2 / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(i2 - s2 / 200, 3)];
        }
        function y(t2) {
          var e2, n2 = t2[0], r2 = t2[1], i2 = t2[2];
          return (e2 = 360 * Math.atan2(i2, r2) / 2 / Math.PI) < 0 && (e2 += 360), [n2, Math.sqrt(r2 * r2 + i2 * i2), e2];
        }
        function w(t2) {
          return p(v(t2));
        }
        function x(t2) {
          var e2, n2 = t2[0], r2 = t2[1];
          return e2 = t2[2] / 360 * 2 * Math.PI, [n2, r2 * Math.cos(e2), r2 * Math.sin(e2)];
        }
        function E(t2) {
          return R[t2];
        }
        t.exports = {
          rgb2hsl: n,
          rgb2hsv: i,
          rgb2hwb: o,
          rgb2cmyk: a,
          rgb2keyword: s,
          rgb2xyz: u,
          rgb2lab: c,
          rgb2lch: function(t2) {
            return y(c(t2));
          },
          hsl2rgb: l,
          hsl2hsv: function(t2) {
            var e2 = t2[0], n2 = t2[1] / 100, r2 = t2[2] / 100;
            if (0 === r2) return [0, 0, 0];
            return [e2, 100 * (2 * (n2 *= (r2 *= 2) <= 1 ? r2 : 2 - r2) / (r2 + n2)), 100 * ((r2 + n2) / 2)];
          },
          hsl2hwb: function(t2) {
            return o(l(t2));
          },
          hsl2cmyk: function(t2) {
            return a(l(t2));
          },
          hsl2keyword: function(t2) {
            return s(l(t2));
          },
          hsv2rgb: d,
          hsv2hsl: function(t2) {
            var e2, n2, r2 = t2[0], i2 = t2[1] / 100, o2 = t2[2] / 100;
            return e2 = i2 * o2, [r2, 100 * (e2 = (e2 /= (n2 = (2 - i2) * o2) <= 1 ? n2 : 2 - n2) || 0), 100 * (n2 /= 2)];
          },
          hsv2hwb: function(t2) {
            return o(d(t2));
          },
          hsv2cmyk: function(t2) {
            return a(d(t2));
          },
          hsv2keyword: function(t2) {
            return s(d(t2));
          },
          hwb2rgb: h,
          hwb2hsl: function(t2) {
            return n(h(t2));
          },
          hwb2hsv: function(t2) {
            return i(h(t2));
          },
          hwb2cmyk: function(t2) {
            return a(h(t2));
          },
          hwb2keyword: function(t2) {
            return s(h(t2));
          },
          cmyk2rgb: f,
          cmyk2hsl: function(t2) {
            return n(f(t2));
          },
          cmyk2hsv: function(t2) {
            return i(f(t2));
          },
          cmyk2hwb: function(t2) {
            return o(f(t2));
          },
          cmyk2keyword: function(t2) {
            return s(f(t2));
          },
          keyword2rgb: E,
          keyword2hsl: function(t2) {
            return n(E(t2));
          },
          keyword2hsv: function(t2) {
            return i(E(t2));
          },
          keyword2hwb: function(t2) {
            return o(E(t2));
          },
          keyword2cmyk: function(t2) {
            return a(E(t2));
          },
          keyword2lab: function(t2) {
            return c(E(t2));
          },
          keyword2xyz: function(t2) {
            return u(E(t2));
          },
          xyz2rgb: p,
          xyz2lab: m,
          xyz2lch: function(t2) {
            return y(m(t2));
          },
          lab2xyz: v,
          lab2rgb: w,
          lab2lch: y,
          lch2lab: x,
          lch2xyz: function(t2) {
            return v(x(t2));
          },
          lch2rgb: function(t2) {
            return w(x(t2));
          }
        };
        var R = {
          aliceblue: [240, 248, 255],
          antiquewhite: [250, 235, 215],
          aqua: [0, 255, 255],
          aquamarine: [127, 255, 212],
          azure: [240, 255, 255],
          beige: [245, 245, 220],
          bisque: [255, 228, 196],
          black: [0, 0, 0],
          blanchedalmond: [255, 235, 205],
          blue: [0, 0, 255],
          blueviolet: [138, 43, 226],
          brown: [165, 42, 42],
          burlywood: [222, 184, 135],
          cadetblue: [95, 158, 160],
          chartreuse: [127, 255, 0],
          chocolate: [210, 105, 30],
          coral: [255, 127, 80],
          cornflowerblue: [100, 149, 237],
          cornsilk: [255, 248, 220],
          crimson: [220, 20, 60],
          cyan: [0, 255, 255],
          darkblue: [0, 0, 139],
          darkcyan: [0, 139, 139],
          darkgoldenrod: [184, 134, 11],
          darkgray: [169, 169, 169],
          darkgreen: [0, 100, 0],
          darkgrey: [169, 169, 169],
          darkkhaki: [189, 183, 107],
          darkmagenta: [139, 0, 139],
          darkolivegreen: [85, 107, 47],
          darkorange: [255, 140, 0],
          darkorchid: [153, 50, 204],
          darkred: [139, 0, 0],
          darksalmon: [233, 150, 122],
          darkseagreen: [143, 188, 143],
          darkslateblue: [72, 61, 139],
          darkslategray: [47, 79, 79],
          darkslategrey: [47, 79, 79],
          darkturquoise: [0, 206, 209],
          darkviolet: [148, 0, 211],
          deeppink: [255, 20, 147],
          deepskyblue: [0, 191, 255],
          dimgray: [105, 105, 105],
          dimgrey: [105, 105, 105],
          dodgerblue: [30, 144, 255],
          firebrick: [178, 34, 34],
          floralwhite: [255, 250, 240],
          forestgreen: [34, 139, 34],
          fuchsia: [255, 0, 255],
          gainsboro: [220, 220, 220],
          ghostwhite: [248, 248, 255],
          gold: [255, 215, 0],
          goldenrod: [218, 165, 32],
          gray: [128, 128, 128],
          green: [0, 128, 0],
          greenyellow: [173, 255, 47],
          grey: [128, 128, 128],
          honeydew: [240, 255, 240],
          hotpink: [255, 105, 180],
          indianred: [205, 92, 92],
          indigo: [75, 0, 130],
          ivory: [255, 255, 240],
          khaki: [240, 230, 140],
          lavender: [230, 230, 250],
          lavenderblush: [255, 240, 245],
          lawngreen: [124, 252, 0],
          lemonchiffon: [255, 250, 205],
          lightblue: [173, 216, 230],
          lightcoral: [240, 128, 128],
          lightcyan: [224, 255, 255],
          lightgoldenrodyellow: [250, 250, 210],
          lightgray: [211, 211, 211],
          lightgreen: [144, 238, 144],
          lightgrey: [211, 211, 211],
          lightpink: [255, 182, 193],
          lightsalmon: [255, 160, 122],
          lightseagreen: [32, 178, 170],
          lightskyblue: [135, 206, 250],
          lightslategray: [119, 136, 153],
          lightslategrey: [119, 136, 153],
          lightsteelblue: [176, 196, 222],
          lightyellow: [255, 255, 224],
          lime: [0, 255, 0],
          limegreen: [50, 205, 50],
          linen: [250, 240, 230],
          magenta: [255, 0, 255],
          maroon: [128, 0, 0],
          mediumaquamarine: [102, 205, 170],
          mediumblue: [0, 0, 205],
          mediumorchid: [186, 85, 211],
          mediumpurple: [147, 112, 219],
          mediumseagreen: [60, 179, 113],
          mediumslateblue: [123, 104, 238],
          mediumspringgreen: [0, 250, 154],
          mediumturquoise: [72, 209, 204],
          mediumvioletred: [199, 21, 133],
          midnightblue: [25, 25, 112],
          mintcream: [245, 255, 250],
          mistyrose: [255, 228, 225],
          moccasin: [255, 228, 181],
          navajowhite: [255, 222, 173],
          navy: [0, 0, 128],
          oldlace: [253, 245, 230],
          olive: [128, 128, 0],
          olivedrab: [107, 142, 35],
          orange: [255, 165, 0],
          orangered: [255, 69, 0],
          orchid: [218, 112, 214],
          palegoldenrod: [238, 232, 170],
          palegreen: [152, 251, 152],
          paleturquoise: [175, 238, 238],
          palevioletred: [219, 112, 147],
          papayawhip: [255, 239, 213],
          peachpuff: [255, 218, 185],
          peru: [205, 133, 63],
          pink: [255, 192, 203],
          plum: [221, 160, 221],
          powderblue: [176, 224, 230],
          purple: [128, 0, 128],
          rebeccapurple: [102, 51, 153],
          red: [255, 0, 0],
          rosybrown: [188, 143, 143],
          royalblue: [65, 105, 225],
          saddlebrown: [139, 69, 19],
          salmon: [250, 128, 114],
          sandybrown: [244, 164, 96],
          seagreen: [46, 139, 87],
          seashell: [255, 245, 238],
          sienna: [160, 82, 45],
          silver: [192, 192, 192],
          skyblue: [135, 206, 235],
          slateblue: [106, 90, 205],
          slategray: [112, 128, 144],
          slategrey: [112, 128, 144],
          snow: [255, 250, 250],
          springgreen: [0, 255, 127],
          steelblue: [70, 130, 180],
          tan: [210, 180, 140],
          teal: [0, 128, 128],
          thistle: [216, 191, 216],
          tomato: [255, 99, 71],
          turquoise: [64, 224, 208],
          violet: [238, 130, 238],
          wheat: [245, 222, 179],
          white: [255, 255, 255],
          whitesmoke: [245, 245, 245],
          yellow: [255, 255, 0],
          yellowgreen: [154, 205, 50]
        }, I = {};
        for (var _ in R) I[JSON.stringify(R[_])] = _;
      },
      function(t, e, n) {
        "use strict";
        var r2 = this && this.__assign || function() {
          return (r2 = Object.assign || function(t2) {
            for (var e2, n2 = 1, r3 = arguments.length; n2 < r3; n2++) for (var i2 in e2 = arguments[n2]) Object.prototype.hasOwnProperty.call(e2, i2) && (t2[i2] = e2[i2]);
            return t2;
          }).apply(this, arguments);
        }, i = this && this.__spreadArrays || function() {
          for (var t2 = 0, e2 = 0, n2 = arguments.length; e2 < n2; e2++) t2 += arguments[e2].length;
          var r3 = Array(t2), i2 = 0;
          for (e2 = 0; e2 < n2; e2++) for (var o2 = arguments[e2], a2 = 0, s2 = o2.length; a2 < s2; a2++, i2++) r3[i2] = o2[a2];
          return r3;
        };
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(1), a = ["textarea", "input"], s = (function() {
          function t2(t3, e2) {
            var n2 = this;
            this.dragStarted = false, this.pinchFlag = false, this.datas = {}, this.isDrag = false, this.isPinch = false, this.isMouse = false, this.isTouch = false, this.prevClients = [], this.startClients = [], this.movement = 0, this.startPinchClients = [], this.startDistance = 0, this.customDist = [0, 0], this.targets = [], this.prevTime = 0, this.isDouble = false, this.startRotate = 0, (this.show360 = function() {
              return document.documentElement.classList.contains("jsv-show-360");
            })(
              this.onDragCancel = function(t4, e3) {
              }
            );
            this.onDragStart = function(t4, e3) {
              if (!n2.show360()) return;
              try {
                if (void 0 === e3 && (e3 = true), t4.stopPropagation(), n2.dragStarted || t4.cancelable) {
                  var i3 = n2.options, s3 = i3.container, u2 = i3.pinchOutside, c2 = i3.dragstart, l = i3.preventRightClick, d = i3.preventDefault, h = i3.checkInput;
                  t4 instanceof MouseEvent && t4.preventDefault();
                  var f = n2.isTouch;
                  if (!n2.dragStarted) {
                    var g2 = document.activeElement, p = t4.target, m = p.tagName.toLowerCase(), v = a.indexOf(m) > -1, y = p.isContentEditable;
                    if (v || y) {
                      if (h || g2 === p) return false;
                      if (g2 && y && g2.isContentEditable && g2.contains(p)) return false;
                    } else if ((d || "touchstart" === t4.type) && g2) {
                      var b2 = g2.tagName;
                      (g2.isContentEditable || a.indexOf(b2) > -1) && g2.blur();
                    }
                  }
                  var w = 0;
                  if (!n2.dragStarted && f && u2 && (w = setTimeout(function() {
                    o.addEvent(s3, "touchstart", n2.onDragStart, {
                      passive: false,
                      capture: true
                    });
                  })), n2.dragStarted && f && u2 && o.removeEvent(s3, "touchstart", n2.onDragStart), f && o.isMultiTouch(t4)) {
                    if (clearTimeout(w), !n2.dragStarted && t4.touches.length !== t4.changedTouches.length) return;
                    n2.pinchFlag || n2.onPinchStart(t4);
                  }
                  if (!n2.dragStarted) {
                    var x = n2.startClients[0] ? n2.startClients : o.getPositionEvent(t4);
                    n2.customDist = [0, 0], n2.dragStarted = true, n2.isDrag = false, n2.startClients = x, n2.prevClients = x, n2.datas = {}, n2.movement = 0;
                    var E = o.getPosition(x[0], n2.prevClients[0], n2.startClients[0]);
                    if (t4 instanceof MouseEvent && l && (3 === t4.which || 2 === t4.button)) return clearTimeout(w), n2.initDrag(), false;
                    false === (c2 && c2(
                      r2(
                        {
                          type: "dragstart",
                          datas: n2.datas,
                          inputEvent: t4,
                          isTrusted: e3
                        },
                        E
                      )
                    )) && (clearTimeout(w), n2.initDrag()), n2.isDouble = o.now() - n2.prevTime < 200, n2.dragStarted && d && t4.preventDefault();
                  }
                }
              } finally {
              }
            }, this.onPassiveEvent = function(e3) {
              e3.preventDefault = function() {
              };
              e3.stopPropagation = function() {
              };
              e3.stopImmediatePropagation = function() {
              };
            }, this.onDrag = function(t4, e3) {
              if (!n2.show360()) return;
              try {
                if (t4.stopPropagation(), !(t4 instanceof MouseEvent && 0 === t4.buttons) && (!n2.dragStarted && 1 === t4.buttons && t4 instanceof MouseEvent && n2.onDragStart(t4), n2.dragStarted)) {
                  var i3 = o.getPositionEvent(t4);
                  n2.pinchFlag && n2.onPinch(t4, i3);
                  var a2 = n2.move([0, 0], t4, i3);
                  if (a2 && (a2.deltaX || a2.deltaY)) {
                    var s3 = n2.options.drag;
                    s3 && s3(r2(r2({}, a2), { isScroll: !!e3, inputEvent: t4 }));
                  }
                }
              } finally {
              }
            }, this.onDragEnd = function(t4) {
              if (!n2.show360()) return;
              try {
                if (t4.stopPropagation(), n2.dragStarted) {
                  n2.dragStarted = false;
                  var e3 = n2.options, i3 = e3.dragend, a2 = e3.pinchOutside, s3 = e3.container;
                  n2.isTouch && a2 && o.removeEvent(s3, "touchstart", n2.onDragStart), n2.pinchFlag && n2.onPinchEnd(t4);
                  var u2 = n2.prevClients, c2 = n2.startClients, l = n2.pinchFlag ? o.getPinchDragPosition(u2, u2, c2, n2.startPinchClients) : o.getPosition(u2[0], u2[0], c2[0]), d = o.now(), h = !n2.isDrag && n2.isDouble;
                  n2.prevTime = n2.isDrag || h ? 0 : d, n2.startClients = [], n2.prevClients = [], i3 && i3(
                    r2(
                      {
                        type: "dragend",
                        datas: n2.datas,
                        isDouble: h,
                        isDrag: n2.isDrag,
                        inputEvent: t4
                      },
                      l
                    )
                  );
                }
              } finally {
              }
            }, this.options = r2(
              {
                checkInput: false,
                container: t3.length > 1 ? "undefined" != typeof window ? window : new HTMLDivElement() : t3[0],
                preventRightClick: true,
                preventDefault: true,
                pinchThreshold: 0,
                pinch: this.pinch,
                pinchstart: this.pinchstart
              },
              e2
            );
            var i2 = this.options, s2 = i2.container, u = i2.events;
            if (this.isTouch = u.indexOf("touch") > -1, this.isMouse = u.indexOf("mouse") > -1, this.customDist = [0, 0], this.targets = t3, this.isMouse && (o.addEvent(s2, "mousedown", this.onDragStart, { capture: true }), o.addEvent(s2, "mousemove", this.onDrag, { capture: true }), o.addEvent(s2, "mouseleave", this.onDragEnd, { capture: false }), o.addEvent(s2, "mouseup", this.onDragEnd, { capture: false }), o.addEvent(s2, "contextmenu", this.onDragEnd, { capture: false })), this.isTouch) {
              var c = { passive: false, capture: false };
              t3.forEach(function(t4) {
                o.addEvent(t4, "touchstart", n2.onDragStart, c);
              }), o.addEvent(s2, "touchstart", this.onPassiveEvent, c), o.addEvent(s2, "touchstart", n2.onDragStart, c), o.addEvent(s2, "touchmove", this.onDrag, c), //{ passive: !0, capture: true }),
              o.addEvent(s2, "touchend", this.onDragEnd, c), o.addEvent(s2, "touchcancel", this.onDragEnd, c);
            }
          }
          return t2.prototype.move = function(t3, e2, n2) {
            var i2 = t3[0], a2 = t3[1];
            void 0 === n2 && (n2 = this.prevClients), e2.stopPropagation();
            var s2 = this.customDist, u = this.prevClients, c = this.startClients, l = this.pinchFlag ? o.getPinchDragPosition(n2, u, c, this.startPinchClients) : o.getPosition(n2[0], u[0], c[0]);
            s2[0] += i2, s2[1] += a2, l.deltaX += i2, l.deltaY += a2;
            var d = l.deltaX, h = l.deltaY;
            return l.distX += s2[0], l.distY += s2[1], this.movement += Math.sqrt(d * d + h * h), this.prevClients = n2, this.isDrag = true, r2(r2({ type: "drag", datas: this.datas }, l), {
              movement: this.movement,
              isDrag: this.isDrag,
              isPinch: this.isPinch,
              isScroll: false,
              inputEvent: e2
            });
          }, t2.prototype.onPinchStart = function(t3) {
            var e2, n2;
            t3.stopPropagation();
            var a2 = this.options, s2 = a2.pinchstart, u = a2.pinchThreshold;
            if (!(this.isDrag && this.movement > u)) {
              var c = o.getClients(t3.changedTouches);
              if (this.pinchFlag = true, (e2 = this.startClients).push.apply(e2, c), (n2 = this.prevClients).push.apply(n2, c), this.startDistance = o.getDist(this.prevClients), this.startPinchClients = i(this.prevClients), s2) {
                var l = this.prevClients, d = o.getAverageClient(l), h = o.getPosition(d, d, d);
                this.startRotate = o.getRotation(l), s2(
                  r2(
                    r2(
                      {
                        type: "pinchstart",
                        datas: this.datas,
                        angle: this.startRotate,
                        touches: o.getPositions(l, l, l)
                      },
                      h
                    ),
                    { inputEvent: t3 }
                  )
                );
              }
            }
          }, t2.prototype.onPinch = function(t3, e2) {
            if (this.dragStarted && this.pinchFlag && !(e2.length < 2)) {
              this.isPinch = true;
              var n2 = this.options.pinch;
              if (n2) {
                var i2 = this.prevClients, a2 = this.startClients, s2 = o.getPosition(o.getAverageClient(e2), o.getAverageClient(i2), o.getAverageClient(a2)), u = o.getRotation(e2), c = o.getDist(e2);
                n2(
                  r2(
                    r2(
                      {
                        type: "pinch",
                        datas: this.datas,
                        movement: this.movement,
                        angle: u,
                        rotation: u - this.startRotate,
                        touches: o.getPositions(e2, i2, a2),
                        scale: c / this.startDistance,
                        distance: c
                      },
                      s2
                    ),
                    { inputEvent: t3 }
                  )
                );
              }
            }
          }, t2.prototype.onPinchEnd = function(t3) {
            if (this.dragStarted && this.pinchFlag) {
              var e2 = this.isPinch;
              this.isPinch = false, this.pinchFlag = false;
              var n2 = this.options.pinchend;
              if (n2) {
                var i2 = this.prevClients, a2 = this.startClients, s2 = o.getPosition(o.getAverageClient(i2), o.getAverageClient(i2), o.getAverageClient(a2));
                n2(
                  r2(
                    r2(
                      {
                        type: "pinchend",
                        datas: this.datas,
                        isPinch: e2,
                        touches: o.getPositions(i2, i2, a2)
                      },
                      s2
                    ),
                    { inputEvent: t3 }
                  )
                ), this.isPinch = false, this.pinchFlag = false;
              }
            } else {
              this.isPinch = false, this.pinchFlag = false;
            }
          }, t2.prototype.triggerDragStart = function(t3) {
            this.onDragStart(t3, false);
          }, t2.prototype.unset = function() {
            var t3 = this, e2 = this.targets, n2 = this.options.container;
            this.isMouse && (e2.forEach(function(e3) {
              o.removeEvent(e3, "mousedown", t3.onDragStart);
            }), o.removeEvent(n2, "mousemove", this.onDrag), o.removeEvent(n2, "mouseup", this.onDragEnd), o.removeEvent(n2, "contextmenu", this.onDragEnd)), this.isTouch && (e2.forEach(function(e3) {
              o.removeEvent(e3, "touchstart", t3.onDragStart);
            }), o.removeEvent(n2, "touchstart", this.onDragStart), o.removeEvent(n2, "touchmove", this.onDrag), o.removeEvent(n2, "touchend", this.onDragEnd), o.removeEvent(n2, "touchcancel", this.onDragEnd));
          }, t2.prototype.initDrag = function() {
            this.startClients = [], this.prevClients = [], this.dragStarted = false;
          }, t2;
        })();
        e.default = s;
      },
      function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var r2 = n(4), i = {
          loadImage: r2.slot(),
          started: r2.slot(),
          startDragging: r2.slot(),
          changeImage: r2.slot(),
          endAutoRotate: r2.slot(),
          click: r2.slot(),
          pinch: r2.slot(),
          scroll: r2.slot(),
          doubleClick: r2.slot(),
          zoomChanged: r2.slot()
        };
        e.default = i;
      },
      function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var r2 = (function() {
          function t2(t3, e2) {
            this.bar = e2, this.p = t3, this.refresh();
          }
          return t2.prototype.refresh = function() {
            this.bar.style.width = this.p + "%";
          }, t2.prototype.update = function(t3) {
            this.p = t3, this.refresh();
          }, t2;
        })();
        e.default = r2;
      },
      function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true }), e.DefaultZoom = void 0;
        var r2 = n(19), i = (function() {
          function t2(t3, e2, n2, r3) {
            this.panzoomLoaded = false, this.currentZoomScale = 1, this.previousPinchDistance = 0, this.screenX = 0, this.screenY = 0, this.window = t3, this.images = e2, this.mainHolderElement = n2, this.zoomMax = r3, this.initPanZoom();
          }
          return t2.prototype.initPanZoom = function() {
            var t3 = this;
            this.images.forEach(function(e2, n2) {
              var r3, i2 = null === (r3 = t3.window) || void 0 === r3 ? void 0 : r3.document.getElementById("" + e2.id);
              i2 && (t3.images[n2].pz = t3.getMobilePanzoom(i2, t3));
            }), this.panzoomLoaded = true;
          }, t2.prototype.handleZoom = function(t3, e2, n2, r3, i2, jsv, duration) {
            var o = this;
            void 0 === i2 && (i2 = false);
            var a = false;
            if (this.currentZoomScale + t3 > this.zoomMax) {
              t3 = this.zoomMax - this.currentZoomScale;
            }
            this.currentZoomScale < 1 && t3 < 0 || this.currentZoomScale + t3 > this.zoomMax && t3 > 0 || (this.currentZoomScale += t3, this.currentZoomScale < 1.3 && t3 < 0 && (e2 = 0, n2 = 0, a = true, i2 = true, this.previousPinchDistance = 0, this.currentZoomScale = 1), //(i ? this.images : [navigator.isSafari ? r.i0 : r]).forEach(function (t) {
            [navigator.isSafari ? r3.i0 : r3].forEach(function(t4) {
              var r4, i3;
              a ? null === (i3 = t4.pz) || void 0 === i3 || i3.reset({ animate: true }, duration) : null === (r4 = t4.pz) || void 0 === r4 || r4.zoom(o.currentZoomScale, {
                animate: true,
                focal: { x: e2, y: n2 }
              }, duration);
            }));
          }, t2.prototype.handlePan = function(t3, e2) {
            this.images.forEach(function(n2) {
              var r3;
              null === (r3 = n2.pz) || void 0 === r3 || r3.pan(t3, e2, { relative: true, animate: false });
            });
          }, t2.prototype.getMobilePanzoom = function(t3, jsv) {
            return r2.default(t3, {
              cursor: "",
              maxScale: this.zoomMax,
              minScale: 1,
              startX: 0,
              startY: 0,
              animate: false,
              canvas: false,
              noBind: true,
              disablePan: false,
              easing: "ease",
              panOnlyWhenZoomed: true,
              touchAction: "",
              jsv
            });
          }, t2.prototype.getRelativePosition = function(t3, e2, n2) {
            var r3, i2 = 0, o = 0, a = null === (r3 = this.mainHolderElement) || void 0 === r3 ? void 0 : r3.getBoundingClientRect();
            if (a) {
              var s = this.window.pageXOffset + (null == a ? void 0 : a.left), u = this.window.pageYOffset + (null == a ? void 0 : a.top);
              return i2 = Math.round(t3 - s - a.width / 2), o = Math.round(e2 - u - (a.height - a.height / 2)), [i2 * this.currentZoomScale * 2, o * this.currentZoomScale * 2];
            }
            return [i2, o];
          }, t2.prototype.pinch = function(t3, e2) {
            var n2;
            if (this.panzoomLoaded) {
              t3.originalEvent.cancelBubble = true;
              var r3 = null === (n2 = this.mainHolderElement) || void 0 === n2 ? void 0 : n2.getBoundingClientRect(), i2 = Math.sqrt(r3.width * r3.width + r3.height * r3.height), o = t3.scale / i2;
              if (t3.first || 0 === this.previousPinchDistance) this.previousPinchDistance = o;
              else {
                this.screenX = (t3.originalEvent.targetTouches[0].pageX + t3.originalEvent.targetTouches[1].pageX) / 2, this.screenY = (t3.originalEvent.targetTouches[0].pageY + t3.originalEvent.targetTouches[1].pageY) / 2;
                var a = o - this.previousPinchDistance;
                a *= 4;
                var s = this.getRelativePosition(this.screenX, this.screenY, e2), u = s[0], c = s[1];
                this.handleZoom(a, u, c, e2), this.previousPinchDistance = o;
              }
            }
          }, t2.prototype.scroll = function(t3, e2, n2, jsv) {
            var r3 = t3.originalEvent.deltaY > 0 ? -1 : 1;
            r3 *= e2 / 100;
            var i2 = t3.originalEvent, o = this.getRelativePosition(i2.pageX, i2.pageY, n2), a = o[0], s = o[1];
            this.handleZoom(r3, a, s, n2, t3, jsv);
          }, t2.prototype.isZoomed = function() {
            return this.currentZoomScale > 1;
          }, t2.prototype.pan = function(t3, e2) {
            this.handlePan(t3, e2);
          }, t2.prototype.reset = function(t3, jsv, duration) {
            this.handleZoom(-1 * (this.currentZoomScale - 1), 0, 0, t3, true, jsv, duration);
          }, t2.prototype.zoomOnPage = function(t3, e2, n2, r3) {
            if (!(t3 > this.zoomMax)) {
              var i2 = this.getRelativePosition(e2, n2, r3), o = i2[0], a = i2[1];
              this.handleZoom(t3 - this.currentZoomScale, o, a, r3);
            }
          }, t2.prototype.zoom = function(t3, e2, n2, r3, jsv, duration) {
            var i2, o;
            if (!(t3 > this.zoomMax)) {
              var a = this.window.document.getElementById(r3.id);
              if (a) {
                this.currentZoomScale = t3;
                var s = 0 !== e2 ? e2 * a.clientWidth / this.currentZoomScale : 0, u = 0 !== n2 ? n2 * a.clientHeight / this.currentZoomScale : 0;
                null === (i2 = r3.pz) || void 0 === i2 || i2.pan(s, u, { animate: true }), null === (o = r3.pz) || void 0 === o || o.zoom(this.currentZoomScale, { animate: true }, duration);
              }
            }
          }, t2;
        })();
        e.DefaultZoom = i;
      },
      function(t, e, n) {
        "use strict";
        n.r(e);
        var r2 = function() {
          return (r2 = Object.assign || function(t2) {
            for (var e2, n2 = 1, r3 = arguments.length; n2 < r3; n2++) for (var i2 in e2 = arguments[n2]) Object.prototype.hasOwnProperty.call(e2, i2) && (t2[i2] = e2[i2]);
            return t2;
          }).apply(this, arguments);
        };
        function i(t2, e2) {
          for (var n2 = t2.length; n2--; ) if (t2[n2].pointerId === e2.pointerId) return n2;
          return -1;
        }
        function o(t2, e2) {
          var n2;
          if (e2.touches) {
            n2 = 0;
            for (var r3 = 0, a2 = e2.touches; r3 < a2.length; r3++) {
              var s2 = a2[r3];
              s2.pointerId = n2++, o(t2, s2);
            }
          } else (n2 = i(t2, e2)) > -1 && t2.splice(n2, 1), t2.push(e2);
        }
        function a(t2) {
          for (var e2, n2 = (t2 = t2.slice(0)).pop(); e2 = t2.pop(); )
            n2 = {
              clientX: (e2.clientX - n2.clientX) / 2 + n2.clientX,
              clientY: (e2.clientY - n2.clientY) / 2 + n2.clientY
            };
          return n2;
        }
        function s(t2) {
          if (t2.length < 2) return 0;
          var e2 = t2[0], n2 = t2[1];
          return Math.sqrt(Math.pow(Math.abs(n2.clientX - e2.clientX), 2) + Math.pow(Math.abs(n2.clientY - e2.clientY), 2));
        }
        "undefined" != typeof window && (window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach), "function" != typeof window.CustomEvent && (window.CustomEvent = function(t2, e2) {
          e2 = e2 || { bubbles: false, cancelable: false, detail: null };
          var n2 = document.createEvent("CustomEvent");
          return n2.initCustomEvent(t2, e2.bubbles, e2.cancelable, e2.detail), n2;
        }));
        var u = {
          down: "mousedown",
          move: "mousemove",
          up: "mouseup mouseleave"
        };
        function c(t2, e2, n2, r3) {
          u[t2].split(" ").forEach(function(t3) {
            e2.addEventListener(t3, n2, r3);
          });
        }
        function l(t2, e2, n2) {
          u[t2].split(" ").forEach(function(t3) {
            e2.removeEventListener(t3, n2);
          });
        }
        "undefined" != typeof window && ("function" == typeof window.PointerEvent ? u = {
          down: "pointerdown",
          move: "pointermove",
          up: "pointerup pointerleave pointercancel"
        } : "function" == typeof window.TouchEvent && (u = {
          down: "touchstart",
          move: "touchmove",
          up: "touchend touchcancel"
        }));
        var d, h = "undefined" != typeof document && !!document.documentMode;
        function f() {
          return d || (d = document.createElement("div").style);
        }
        var g2 = ["webkit", "moz", "ms"], p = {};
        function m(t2) {
          if (p[t2]) return p[t2];
          var e2 = f();
          if (t2 in e2) return p[t2] = t2;
          for (var n2 = t2[0].toUpperCase() + t2.slice(1), r3 = g2.length; r3--; ) {
            var i2 = "" + g2[r3] + n2;
            if (i2 in e2) return p[t2] = i2;
          }
        }
        function v(t2, e2) {
          return parseFloat(e2[m(t2)]) || 0;
        }
        function y(t2, e2, n2) {
          void 0 === n2 && (n2 = window.getComputedStyle(t2));
          var r3 = "border" === e2 ? "Width" : "";
          return {
            left: v(e2 + "Left" + r3, n2),
            right: v(e2 + "Right" + r3, n2),
            top: v(e2 + "Top" + r3, n2),
            bottom: v(e2 + "Bottom" + r3, n2)
          };
        }
        function b2(t2, e2, n2, important) {
          t2.style.setProperty(m(e2), n2, important);
        }
        function w(t2) {
          var e2 = t2.parentNode, n2 = window.getComputedStyle(t2), r3 = window.getComputedStyle(e2), i2 = t2.getBoundingClientRect(), o2 = e2.getBoundingClientRect();
          return {
            elem: {
              style: n2,
              width: i2.width,
              height: i2.height,
              top: i2.top,
              bottom: i2.bottom,
              left: i2.left,
              right: i2.right,
              margin: y(t2, "margin", n2),
              border: y(t2, "border", n2)
            },
            parent: {
              style: r3,
              width: o2.width,
              height: o2.height,
              top: o2.top,
              bottom: o2.bottom,
              left: o2.left,
              right: o2.right,
              padding: y(e2, "padding", r3),
              border: y(e2, "border", r3)
            }
          };
        }
        function x(t2, e2) {
          return 1 === t2.nodeType && (" " + (function(t3) {
            return (t3.getAttribute("class") || "").trim();
          })(t2) + " ").indexOf(" " + e2 + " ") > -1;
        }
        var E = /^http:[\w\.\/]+svg$/;
        var R = {
          animate: false,
          canvas: false,
          cursor: "move",
          disablePan: false,
          disableZoom: false,
          disableXAxis: false,
          disableYAxis: false,
          duration: 200,
          easing: "ease-in-out",
          exclude: [],
          excludeClass: "panzoom-exclude",
          handleStartEvent: function(t2) {
            t2.preventDefault(), t2.stopPropagation();
          },
          maxScale: 4,
          minScale: 0.125,
          overflow: "hidden",
          panOnlyWhenZoomed: false,
          relative: false,
          setTransform: function(t2, e2, n2) {
            var r3 = e2.x, i2 = e2.y, o2 = e2.scale, a2 = e2.isSVG;
            if (t2.parentNode.style.display != "none") {
              const isScaled = !!(o2 > 1 || r3 != 0 || i2 != 0);
              if (isScaled != R.isScaled) {
                R.isScaled = isScaled;
                setTimeout((t3) => document.documentElement.classList.toggle("jsv-360-scaled", isScaled), isScaled ? 0 : 300);
              }
            }
            if (b2(t2.parentNode, "transform", (o2 == 1 ? "" : "scale(" + o2 + ")") + (r3 == 0 && i2 == 0 ? "" : " translate(" + r3 + "px, " + i2 + "px)")), a2 && h) {
              var s2 = window.getComputedStyle(t2.parentNode).getPropertyValue("transform");
              t2.parentNode.setAttribute("transform", s2);
            }
          },
          startX: 0,
          startY: 0,
          startScale: 1,
          step: 0.3,
          touchAction: "none"
        };
        function I(t2, e2) {
          if (!t2) throw new Error("Panzoom requires an element as an argument");
          if (1 !== t2.nodeType) throw new Error("Panzoom requires an element with a nodeType of 1");
          if (!(function(t3) {
            var e3 = t3.ownerDocument, n3 = t3.parentNode;
            return e3 && n3 && 9 === e3.nodeType && 1 === n3.nodeType && e3.documentElement.contains(n3);
          })(t2))
            throw new Error("Panzoom should be called on elements that have been attached to the DOM");
          e2 = r2(r2({}, R), e2);
          var n2 = (function(t3) {
            return E.test(t3.namespaceURI) && "svg" !== t3.nodeName.toLowerCase();
          })(t2), d2 = t2.parentNode;
          d2.style.overflow = e2.overflow, /***LAUd.style.userSelect = 'none',*/
          d2.style.touchAction = e2.touchAction, (e2.canvas ? d2 : t2).style.cursor = e2.cursor, /***t.style.userSelect = 'none',*/
          t2.style.touchAction = e2.touchAction;
          var h2, f2, g3, p2, v2, y2, I2 = 0, _ = 0, k = (v3) => v3 === void 0 ? e2.jsv.currentZoomScale : e2.jsv.currentZoomScale = v3, C = false;
          function D(e3, n3, r3) {
            if (!r3.silent) {
              var i2 = new CustomEvent(e3, { detail: n3 });
              t2.dispatchEvent(i2);
            }
          }
          function P(e3, r3) {
            var i2 = { x: I2, y: _, scale: k(), isSVG: n2 };
            return requestAnimationFrame(function() {
              "boolean" == typeof r3.animate && (r3.animate ? (function(t3, e4) {
                b2(t3.parentNode.parentNode, "transition", m("all") + " " + e4.duration + "ms " + e4.easing, "important");
              })(t2, r3) : b2(t2.parentNode.parentNode, "transition", "all 200ms " + e3.easing, "important")), r3.setTransform(t2.parentNode, i2, r3);
            }), D(e3, i2, r3), D("panzoomchange", i2, r3), i2;
          }
          function S() {
            if (e2.contain) {
              var n3 = w(t2), r3 = n3.parent.width - n3.parent.border.left - n3.parent.border.right, i2 = n3.parent.height - n3.parent.border.top - n3.parent.border.bottom, o2 = r3 / (n3.elem.width / k()), a2 = i2 / (n3.elem.height / k());
              "inside" === e2.contain ? e2.maxScale = Math.min(o2, a2) : "outside" === e2.contain && (e2.minScale = Math.max(o2, a2));
            }
          }
          function M(n3, i2, o2, a2) {
            var s2 = r2(r2({}, e2), a2), u2 = { x: I2, y: _, opts: s2 };
            if (!s2.force && (s2.disablePan || s2.panOnlyWhenZoomed && k() === s2.startScale)) return u2;
            if (n3 = parseFloat(n3), i2 = parseFloat(i2), s2.disableXAxis || (u2.x = (s2.relative ? I2 : 0) + n3), s2.disableYAxis || (u2.y = (s2.relative ? _ : 0) + i2), "inside" === s2.contain) {
              var c2 = w(t2);
              u2.x = Math.max(-c2.elem.margin.left - c2.parent.padding.left, Math.min(c2.parent.width - c2.elem.width / o2 - c2.parent.padding.left - c2.elem.margin.left - c2.parent.border.left - c2.parent.border.right, u2.x)), u2.y = Math.max(-c2.elem.margin.top - c2.parent.padding.top, Math.min(c2.parent.height - c2.elem.height / o2 - c2.parent.padding.top - c2.elem.margin.top - c2.parent.border.top - c2.parent.border.bottom, u2.y));
            } else if ("outside" === s2.contain) {
              var l2 = (c2 = w(t2)).elem.width / k(), d3 = c2.elem.height / k(), h3 = l2 * o2, f3 = d3 * o2, g4 = (h3 - l2) / 2, p3 = (f3 - d3) / 2, m2 = (-(h3 - c2.parent.width) - c2.parent.padding.left - c2.parent.border.left - c2.parent.border.right + g4) / o2, v3 = (g4 - c2.parent.padding.left) / o2;
              u2.x = Math.max(Math.min(u2.x, v3), m2);
              var y3 = (-(f3 - c2.parent.height) - c2.parent.padding.top - c2.parent.border.top - c2.parent.border.bottom + p3) / o2, b3 = (p3 - c2.parent.padding.top) / o2;
              u2.y = Math.max(Math.min(u2.y, b3), y3);
            }
            return u2;
          }
          function T(t3, n3) {
            var i2 = r2(r2({}, e2), n3), o2 = { scale: k(), opts: i2 };
            return !i2.force && i2.disableZoom || (o2.scale = Math.min(Math.max(t3, i2.minScale), i2.maxScale)), o2;
          }
          function N(t3, e3, n3) {
            var r3 = M(t3, e3, k(), n3), i2 = r3.opts;
            return I2 = r3.x, _ = r3.y, P("panzoompan", i2);
          }
          function H(t3, e3, duration) {
            var n3 = T(t3, e3), r3 = n3.opts;
            duration != void 0 && (r3.duration = duration);
            if (r3.force || !r3.disableZoom) {
              t3 = n3.scale;
              var i2 = I2, o2 = _;
              if (r3.focal) {
                var a2 = r3.focal;
                i2 = (a2.x / t3 - a2.x / k() + I2 * t3) / t3, o2 = (a2.y / t3 - a2.y / k() + _ * t3) / t3;
              }
              var s2 = M(i2, o2, t3, { relative: false, force: true });
              return I2 = s2.x, _ = s2.y, k(t3), P("panzoomzoom", r3);
            }
          }
          function O(t3, n3) {
            var i2 = r2(r2(r2({}, e2), { animate: true }), n3);
            return H(k() * Math.exp((t3 ? 1 : -1) * i2.step), i2);
          }
          function z(e3, i2, o2) {
            var a2 = w(t2), s2 = a2.parent.width - a2.parent.padding.left - a2.parent.padding.right - a2.parent.border.left - a2.parent.border.right, u2 = a2.parent.height - a2.parent.padding.top - a2.parent.padding.bottom - a2.parent.border.top - a2.parent.border.bottom, c2 = i2.clientX - a2.parent.left - a2.parent.padding.left - a2.parent.border.left - a2.elem.margin.left, l2 = i2.clientY - a2.parent.top - a2.parent.padding.top - a2.parent.border.top - a2.elem.margin.top;
            n2 || (c2 -= a2.elem.width / k() / 2, l2 -= a2.elem.height / k() / 2);
            var d3 = { x: c2 / s2 * (s2 * e3), y: l2 / u2 * (u2 * e3) };
            return H(e3, r2(r2({ animate: false }, o2), { focal: d3 }));
          }
          H(e2.startScale, { animate: false }), setTimeout(function() {
            S(), N(e2.startX, e2.startY, { animate: false });
          });
          var Y = [];
          function A(t3) {
            if (!(function(t4, e3) {
              for (var n4 = t4; null != n4; n4 = n4.parentNode) if (x(n4, e3.excludeClass) || e3.exclude.indexOf(n4) > -1) return true;
              return false;
            })(t3.target, e2)) {
              o(Y, t3), C = true, e2.handleStartEvent(t3), h2 = I2, f2 = _, D("panzoomstart", { x: I2, y: _, scale: k() }, e2);
              var n3 = a(Y);
              g3 = n3.clientX, p2 = n3.clientY, v2 = k(), y2 = s(Y);
            }
          }
          function Z(t3) {
            if (C && void 0 !== h2 && void 0 !== f2 && void 0 !== g3 && void 0 !== p2) {
              o(Y, t3);
              var n3 = a(Y);
              if (Y.length > 1) z(T((s(Y) - y2) * e2.step / 80 + v2).scale, n3);
              N(h2 + (n3.clientX - g3) / k(), f2 + (n3.clientY - p2) / k(), {
                animate: false
              });
            }
          }
          function j(t3) {
            1 === Y.length && D("panzoomend", { x: I2, y: _, scale: k() }, e2), (function(t4, e3) {
              if (e3.touches) for (; t4.length; ) t4.pop();
              else {
                var n3 = i(t4, e3);
                n3 > -1 && t4.splice(n3, 1);
              }
            })(Y, t3), C && (C = false, h2 = f2 = g3 = p2 = void 0);
          }
          var X = false;
          function G() {
            X || (X = true, c("down", e2.canvas ? d2 : t2, A), c("move", document, Z, { passive: true }), c("up", document, j, { passive: true }));
          }
          return e2.noBind || G(), {
            bind: G,
            destroy: function() {
              X = false, l("down", e2.canvas ? d2 : t2, A), l("move", document, Z), l("up", document, j);
            },
            eventNames: u,
            getPan: function() {
              return { x: I2, y: _ };
            },
            getScale: function() {
              return k();
            },
            getOptions: function() {
              return (function(t3) {
                var e3 = {};
                for (var n3 in t3) t3.hasOwnProperty(n3) && (e3[n3] = t3[n3]);
                return e3;
              })(e2);
            },
            pan: N,
            reset: function(t3, duration) {
              var n3 = r2(r2(r2({}, e2), { animate: true, force: true }), t3);
              duration != void 0 && (n3.duration = duration);
              k(T(n3.startScale, n3).scale);
              var i2 = M(n3.startX, n3.startY, k(), n3);
              return I2 = i2.x, _ = i2.y, P("panzoomreset", n3);
            },
            setOptions: function(n3) {
              for (var r3 in void 0 === n3 && (n3 = {}), n3) n3.hasOwnProperty(r3) && (e2[r3] = n3[r3]);
              n3.hasOwnProperty("cursor") && (t2.style.cursor = n3.cursor), n3.hasOwnProperty("overflow") && (d2.style.overflow = n3.overflow), n3.hasOwnProperty("touchAction") && (d2.style.touchAction = n3.touchAction, t2.style.touchAction = n3.touchAction), (n3.hasOwnProperty("minScale") || n3.hasOwnProperty("maxScale") || n3.hasOwnProperty("contain")) && S();
            },
            setStyle: function(e3, n3) {
              return b2(t2, e3, n3);
            },
            zoom: H,
            zoomIn: function(t3) {
              return O(true, t3);
            },
            zoomOut: function(t3) {
              return O(false, t3);
            },
            zoomToPoint: z,
            zoomWithWheel: function(t3, n3) {
              t3.preventDefault();
              var i2 = r2(r2({}, e2), n3), o2 = (0 === t3.deltaY && t3.deltaX ? t3.deltaX : t3.deltaY) < 0 ? 1 : -1;
              return z(T(k() * Math.exp(o2 * i2.step / 3), i2).scale, t3, i2);
            }
          };
        }
        I.defaultOptions = R, e.default = I;
      },
      function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true }), e.Helper = void 0;
        var r2 = (function() {
          function t2() {
          }
          return t2.isValid = function(t3, e2) {
            e2 = e2.toLowerCase().split("").reverse().join("");
            var n2 = parseInt(t3.charAt(0), 10), r3 = t3.split("=="), i = parseInt(r3[0].charAt(r3[0].length - 1), 10);
            return r3[0].substr(1, r3[0].length - 2) === this.reverse(e2, 2 * i) && n2 + i === 10;
          }, t2.reverse = function(t3, e2) {
            var n2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase(), r3 = "";
            e2 > 26 && (e2 %= 26);
            for (var i = 0; i < t3.length; ) {
              if (-1 !== n2.indexOf(t3[i])) {
                var o = n2.indexOf(t3[i]);
                n2[o + e2] ? r3 += n2[o + e2] : r3 += n2[o + e2 - 26];
              }
              i++;
            }
            return r3;
          }, t2;
        })();
        e.Helper = r2;
      }
    ]);
  });
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmlsZTovLy9EOi93b3JrL0RBVEV4Mi5iaWtlL3d3My93ZWJzaXRlL3NyYy9qcy9EQVRFeDIuSlNWaWV3ZXIuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0SlNWVmlld2VyKCkge1xyXG4gIGNvbnN0IHsgaXNJblZpZXcsIGlzT3V0T2ZWaWV3IH0gPSBhd2FpdCBpbXBvcnQoJy4vdXRpbHMuanMnKTtcclxuICBjb25zdCBub29wID0gKCkgPT4geyB9O1xyXG4gIGxldCBjYW5jZWwgPSBub29wO1xyXG4gIGNvbnN0IHJlZ2lzdGVyQ2FuY2VsID0gZm4gPT4gY2FuY2VsID0gZm4sXHJcbiAgICBnbG9iYWxSZWdpc3RlckNhbmNlbCA9IHJlZ2lzdGVyQ2FuY2VsO1xyXG5cclxuICBjb25zdCByZXF1ZXN0VGltZW91dCA9IChmbiwgZGVsYXksIHJlZ2lzdGVyQ2FuY2VsKSA9PiB7XHJcbiAgICBpZiAoIXJlZ2lzdGVyQ2FuY2VsKSB7IHJlZ2lzdGVyQ2FuY2VsID0gZ2xvYmFsUmVnaXN0ZXJDYW5jZWwgfTtcclxuICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgY29uc3QgbG9vcCA9ICgpID0+IHtcclxuICAgICAgY29uc3QgZGVsdGEgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXJ0O1xyXG4gICAgICBpZiAoZGVsdGEgPj0gZGVsYXkpIHtcclxuICAgICAgICBmbigpO1xyXG4gICAgICAgIHJlZ2lzdGVyQ2FuY2VsKG5vb3ApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICByZWdpc3RlckNhbmNlbCgoKSA9PiBjYW5jZWxBbmltYXRpb25GcmFtZShyYWYpKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGRlbGF5IDw9IDUpIHtcclxuICAgICAgY29uc3QgcmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICByZWdpc3RlckNhbmNlbCgoKSA9PiBjYW5jZWxBbmltYXRpb25GcmFtZShyYWYpKTtcclxuICAgIH1cclxuICAgIGVsc2Ugc2V0VGltZW91dChsb29wLCBkZWxheSAtIDUpO1xyXG4gIH07XHJcblxyXG5cclxuICAvLyByZXF1ZXN0VGltZW91dCgoKSA9PiBjb25zb2xlLmxvZyhcIkknbSBhIGRlbGF5ZWQgd29ya1wiKSwgMzAwLCByZWdpc3RlckNhbmNlbCk7XHJcblxyXG4gIC8vIC8vIEluIGNhc2UgSSBuZWVkIHRvIGNhbmNlbCB0aGUgY3VycmVudCBzY2hlZHVsZWQgd29yazpcclxuICAvLyBjYW5jZWwoKTtcclxuXHJcbiAgIShmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgLy9pZiAoXCJvYmplY3RcIiA9PSB0eXBlb2YgZXhwb3J0cyAmJiBcIm9iamVjdFwiID09IHR5cGVvZiBtb2R1bGUpIG1vZHVsZS5leHBvcnRzID0gZSgpO1xyXG4gICAgLy9lbHNlIGlmIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGRlZmluZSAmJiBkZWZpbmUuYW1kKSBkZWZpbmUoW10sIGUpO1xyXG4gICAgLy9lbHNlIHtcclxuICAgICAgdmFyIG4gPSBlKCk7XHJcbi8vICAgICAgZm9yICh2YXIgciBpbiBuKSAoXCJvYmplY3RcIiA9PSB0eXBlb2YgZXhwb3J0cyA/IGV4cG9ydHMgOiB0KVtyXSA9IG5bcl07XHJcbiAgICAvL31cclxuICB9KSh0aGlzLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgIHZhciBlID0ge307XHJcbiAgICAgIGZ1bmN0aW9uIG4ocikge1xyXG4gICAgICAgIGlmIChlW3JdKSByZXR1cm4gZVtyXS5leHBvcnRzO1xyXG4gICAgICAgIHZhciBpID0gKGVbcl0gPSB7IGk6IHIsIGw6ICExLCBleHBvcnRzOiB7fSB9KTtcclxuICAgICAgICByZXR1cm4gdFtyXS5jYWxsKGkuZXhwb3J0cywgaSwgaS5leHBvcnRzLCBuKSwgKGkubCA9ICEwKSwgaS5leHBvcnRzO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgKG4ubSA9IHQpLFxyXG4gICAgICAgIChuLmMgPSBlKSxcclxuICAgICAgICAobi5kID0gZnVuY3Rpb24gKHQsIGUsIHIpIHtcclxuICAgICAgICAgIG4ubyh0LCBlKSB8fCBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgZSwgeyBlbnVtZXJhYmxlOiAhMCwgZ2V0OiByIH0pO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIChuLnIgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIFN5bWJvbC50b1N0cmluZ1RhZyAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiBcIk1vZHVsZVwiIH0pLCBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6ICEwIH0pO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIChuLnQgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgaWYgKCgxICYgZSAmJiAodCA9IG4odCkpLCA4ICYgZSkpIHJldHVybiB0O1xyXG4gICAgICAgICAgaWYgKDQgJiBlICYmIFwib2JqZWN0XCIgPT0gdHlwZW9mIHQgJiYgdCAmJiB0Ll9fZXNNb2R1bGUpIHJldHVybiB0O1xyXG4gICAgICAgICAgdmFyIHIgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgICAgICAgaWYgKChuLnIociksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiAhMCwgdmFsdWU6IHQgfSksIDIgJiBlICYmIFwic3RyaW5nXCIgIT0gdHlwZW9mIHQpKVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHQpXHJcbiAgICAgICAgICAgICAgbi5kKFxyXG4gICAgICAgICAgICAgICAgcixcclxuICAgICAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdFtlXTtcclxuICAgICAgICAgICAgICAgIH0uYmluZChudWxsLCBpKVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9KSxcclxuICAgICAgICAobi5uID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgIHZhciBlID1cclxuICAgICAgICAgICAgdCAmJiB0Ll9fZXNNb2R1bGVcclxuICAgICAgICAgICAgICA/IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0LmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgIHJldHVybiBuLmQoZSwgXCJhXCIsIGUpLCBlO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIChuLm8gPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LCBlKTtcclxuICAgICAgICB9KSxcclxuICAgICAgICAobi5wID0gXCJcIiksXHJcbiAgICAgICAgbigobi5zID0gNSkpXHJcbiAgICAgICk7XHJcbiAgICB9KShbXHJcbiAgICAgIGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgdmFyIHIsXHJcbiAgICAgICAgICBpID1cclxuICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8XHJcbiAgICAgICAgICAgICgociA9IGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChyID1cclxuICAgICAgICAgICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiZcclxuICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0Ll9fcHJvdG9fXyA9IGU7XHJcbiAgICAgICAgICAgICAgICAgIH0pIHx8XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgICBmb3IgKHZhciBuIGluIGUpIGUuaGFzT3duUHJvcGVydHkobikgJiYgKHRbbl0gPSBlW25dKTtcclxuICAgICAgICAgICAgICAgIH0pKHQsIGUpO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbigpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RvciA9IHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByKHQsIGUpLCAodC5wcm90b3R5cGUgPSBudWxsID09PSBlID8gT2JqZWN0LmNyZWF0ZShlKSA6ICgobi5wcm90b3R5cGUgPSBlLnByb3RvdHlwZSksIG5ldyBuKCkpKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6ICEwIH0pO1xyXG4gICAgICAgIHZhciBvID0gKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICBmdW5jdGlvbiBlKGUpIHtcclxuICAgICAgICAgICAgdmFyIG4gPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gKGUgKz0gXCIgY2hlY2sgdGhlIGRvY3VtZW50YXRpb25cIiksICgobiA9IHQuY2FsbCh0aGlzLCBlKSB8fCB0aGlzKS5uYW1lID0gXCIzNjAgSlNWIElucHV0RXJyb3JcIiksIG47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gaShlLCB0KSwgZTtcclxuICAgICAgICB9KShFcnJvcik7XHJcbiAgICAgICAgZS5kZWZhdWx0ID0gbztcclxuICAgICAgfSxcclxuICAgICAgZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6ICEwIH0pLFxyXG4gICAgICAgICAgKGUubWVyZ2VEZWVwID1cclxuICAgICAgICAgICAgZS5oZXhUb1JnYiA9XHJcbiAgICAgICAgICAgIGUubm93ID1cclxuICAgICAgICAgICAgZS5yZW1vdmVFdmVudCA9XHJcbiAgICAgICAgICAgIGUuYWRkRXZlbnQgPVxyXG4gICAgICAgICAgICBlLm1pbnVzQ2xpZW50ID1cclxuICAgICAgICAgICAgZS5wbHVlQ2xpZW50ID1cclxuICAgICAgICAgICAgZS5nZXRBdmVyYWdlQ2xpZW50ID1cclxuICAgICAgICAgICAgZS5nZXRDbGllbnQgPVxyXG4gICAgICAgICAgICBlLmdldENsaWVudHMgPVxyXG4gICAgICAgICAgICBlLmdldFBvc2l0aW9ucyA9XHJcbiAgICAgICAgICAgIGUuZ2V0RGlzdCA9XHJcbiAgICAgICAgICAgIGUuZ2V0UG9zaXRpb24gPVxyXG4gICAgICAgICAgICBlLmdldFBvc2l0aW9uRXZlbnQgPVxyXG4gICAgICAgICAgICBlLmlzTXVsdGlUb3VjaCA9XHJcbiAgICAgICAgICAgIGUuZ2V0UGluY2hEcmFnUG9zaXRpb24gPVxyXG4gICAgICAgICAgICBlLmdldFJvdGF0aW9uID1cclxuICAgICAgICAgICAgZS5nZXRSYW5kb21JZCA9XHJcbiAgICAgICAgICAgIGUuZ2V0UmFkID1cclxuICAgICAgICAgICAgdm9pZCAwKTtcclxuICAgICAgICB2YXIgciA9IG4oMTIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIGkodCwgZSkge1xyXG4gICAgICAgICAgdmFyIG4gPSBlWzBdIC0gdFswXSxcclxuICAgICAgICAgICAgciA9IGVbMV0gLSB0WzFdLFxyXG4gICAgICAgICAgICBpID0gTWF0aC5hdGFuMihyLCBuKTtcclxuICAgICAgICAgIHJldHVybiBpID49IDAgPyBpIDogaSArIDIgKiBNYXRoLlBJO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBvKHQsIGUsIG4pIHtcclxuICAgICAgICAgIHZhciByID0gdC5jbGllbnRYLFxyXG4gICAgICAgICAgICBpID0gdC5jbGllbnRZO1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2xpZW50WDogcixcclxuICAgICAgICAgICAgY2xpZW50WTogaSxcclxuICAgICAgICAgICAgZGVsdGFYOiByIC0gZS5jbGllbnRYLFxyXG4gICAgICAgICAgICBkZWx0YVk6IGkgLSBlLmNsaWVudFksXHJcbiAgICAgICAgICAgIGRpc3RYOiByIC0gbi5jbGllbnRYLFxyXG4gICAgICAgICAgICBkaXN0WTogaSAtIG4uY2xpZW50WSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGEodCkge1xyXG4gICAgICAgICAgZm9yICh2YXIgZSA9IE1hdGgubWluKHQubGVuZ3RoLCAyKSwgbiA9IFtdLCByID0gMDsgciA8IGU7ICsrcikgbi5wdXNoKHModFtyXSkpO1xyXG4gICAgICAgICAgcmV0dXJuIG47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHModCkge1xyXG4gICAgICAgICAgcmV0dXJuIHsgY2xpZW50WDogdC5jbGllbnRYLCBjbGllbnRZOiB0LmNsaWVudFkgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gdSh0KSB7XHJcbiAgICAgICAgICByZXR1cm4gMSA9PT0gdC5sZW5ndGhcclxuICAgICAgICAgICAgPyB0WzBdXHJcbiAgICAgICAgICAgIDoge1xyXG4gICAgICAgICAgICAgIGNsaWVudFg6ICh0WzBdLmNsaWVudFggKyB0WzFdLmNsaWVudFgpIC8gMixcclxuICAgICAgICAgICAgICBjbGllbnRZOiAodFswXS5jbGllbnRZICsgdFsxXS5jbGllbnRZKSAvIDIsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGModCwgZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2xpZW50WDogdC5jbGllbnRYICsgZS5jbGllbnRYLFxyXG4gICAgICAgICAgICBjbGllbnRZOiB0LmNsaWVudFkgKyBlLmNsaWVudFksXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBsKHQsIGUpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNsaWVudFg6IHQuY2xpZW50WCAtIGUuY2xpZW50WCxcclxuICAgICAgICAgICAgY2xpZW50WTogdC5jbGllbnRZIC0gZS5jbGllbnRZLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGUuZ2V0UmFkID0gaSksXHJcbiAgICAgICAgICAoZS5nZXRSYW5kb21JZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiX1wiICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDMpO1xyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICAoZS5nZXRSb3RhdGlvbiA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaShbdFswXS5jbGllbnRYLCB0WzBdLmNsaWVudFldLCBbdFsxXS5jbGllbnRYLCB0WzFdLmNsaWVudFldKSAvIE1hdGguUEkpICogMTgwO1xyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICAoZS5nZXRQaW5jaERyYWdQb3NpdGlvbiA9IGZ1bmN0aW9uICh0LCBlLCBuLCByKSB7XHJcbiAgICAgICAgICAgIHZhciBpID0gdSh0KSxcclxuICAgICAgICAgICAgICBhID0gdShlKSxcclxuICAgICAgICAgICAgICBzID0gdShyKTtcclxuICAgICAgICAgICAgcmV0dXJuIG8oYyhyWzBdLCBsKGksIHMpKSwgYyhyWzBdLCBsKGEsIHMpKSwgblswXSk7XHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIChlLmlzTXVsdGlUb3VjaCA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0LnRvdWNoZXMgJiYgdC50b3VjaGVzLmxlbmd0aCA+PSAyO1xyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICAoZS5nZXRQb3NpdGlvbkV2ZW50ID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHQudG91Y2hlcyA/IGEodC50b3VjaGVzKSA6IFtzKHQpXTtcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgKGUuZ2V0UG9zaXRpb24gPSBvKSxcclxuICAgICAgICAgIChlLmdldERpc3QgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRbMF0uY2xpZW50WCAtIHRbMV0uY2xpZW50WCwgMikgKyBNYXRoLnBvdyh0WzBdLmNsaWVudFkgLSB0WzFdLmNsaWVudFksIDIpKTtcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgKGUuZ2V0UG9zaXRpb25zID0gZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHQubWFwKGZ1bmN0aW9uICh0LCByKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG8odCwgZVtyXSwgbltyXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICAoZS5nZXRDbGllbnRzID0gYSksXHJcbiAgICAgICAgICAoZS5nZXRDbGllbnQgPSBzKSxcclxuICAgICAgICAgIChlLmdldEF2ZXJhZ2VDbGllbnQgPSB1KSxcclxuICAgICAgICAgIChlLnBsdWVDbGllbnQgPSBjKSxcclxuICAgICAgICAgIChlLm1pbnVzQ2xpZW50ID0gbCksXHJcbiAgICAgICAgICAoZS5hZGRFdmVudCA9IGZ1bmN0aW9uICh0LCBlLCBuLCByKSB7XHJcbiAgICAgICAgICAgIHQuYWRkRXZlbnRMaXN0ZW5lcihlLCBuLCByKTtcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgKGUucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiAodCwgZSwgbikge1xyXG4gICAgICAgICAgICB0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZSwgbik7XHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIChlLm5vdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERhdGUubm93ID8gRGF0ZS5ub3coKSA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICAoZS5oZXhUb1JnYiA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHZhciBlID0gcih0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGUgPyB7IHI6IGUucmdiYVswXSwgZzogZS5yZ2JhWzFdLCBiOiBlLnJnYmFbMl0sIGE6IGUucmdiYVszXSB9IDogbnVsbDtcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgKGUubWVyZ2VEZWVwID0gZnVuY3Rpb24gdChlKSB7XHJcbiAgICAgICAgICAgIHZhciBuID0gZS5vYmplY3RzLFxyXG4gICAgICAgICAgICAgIHIgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHQgJiYgXCJvYmplY3RcIiA9PSB0eXBlb2YgdDtcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gbi5yZWR1Y2UoZnVuY3Rpb24gKGUsIG4pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMobikuZm9yRWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbyA9IGVbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgYSA9IG5baV07XHJcbiAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkobykgJiYgQXJyYXkuaXNBcnJheShhKSA/IChlW2ldID0gby5jb25jYXQuYXBwbHkobywgYSkpIDogcihvKSAmJiByKGEpID8gKGVbaV0gPSB0KHsgb2JqZWN0czogW28sIGFdIH0pKSA6IChlW2ldID0gYSk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGVcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICB2YXIgbiA9IC9eXFxzK3xcXHMrJC9nLFxyXG4gICAgICAgICAgciA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pLFxyXG4gICAgICAgICAgaSA9IC9eMGJbMDFdKyQvaSxcclxuICAgICAgICAgIG8gPSAvXjBvWzAtN10rJC9pLFxyXG4gICAgICAgICAgYSA9IHBhcnNlSW50LFxyXG4gICAgICAgICAgcyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcbiAgICAgICAgZnVuY3Rpb24gdSh0LCBlKSB7XHJcbiAgICAgICAgICB2YXIgdTtcclxuICAgICAgICAgIGlmIChcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIGUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO1xyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgKHQgPSAoZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICB2YXIgZSA9IChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0KSByZXR1cm4gMCA9PT0gdCA/IHQgOiAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAodCA9IChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcIm51bWJlclwiID09IHR5cGVvZiB0KSByZXR1cm4gdDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInN5bWJvbFwiID09IHR5cGVvZiB0IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhdCAmJiBcIm9iamVjdFwiID09IHR5cGVvZiB0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pKHQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIltvYmplY3QgU3ltYm9sXVwiID09IHMuY2FsbCh0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pKHQpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE5hTjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYyh0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHQudmFsdWVPZiA/IHQudmFsdWVPZigpIDogdDtcclxuICAgICAgICAgICAgICAgICAgICAgIHQgPSBjKGUpID8gZSArIFwiXCIgOiBlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoXCJzdHJpbmdcIiAhPSB0eXBlb2YgdCkgcmV0dXJuIDAgPT09IHQgPyB0IDogK3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgdCA9IHQucmVwbGFjZShuLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdSA9IGkudGVzdCh0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdSB8fCBvLnRlc3QodCkgPyBhKHQuc2xpY2UoMiksIHUgPyAyIDogOCkgOiByLnRlc3QodCkgPyBOYU4gOiArdDtcclxuICAgICAgICAgICAgICAgICAgfSkodCkpID09PVxyXG4gICAgICAgICAgICAgICAgICAxIC8gMCB8fFxyXG4gICAgICAgICAgICAgICAgICB0ID09PSAtMSAvIDBcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gMTc5NzY5MzEzNDg2MjMxNTdlMjkyICogKHQgPCAwID8gLTEgOiAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0ID09IHQgPyB0IDogMDtcclxuICAgICAgICAgICAgICB9KSh0KSxcclxuICAgICAgICAgICAgICAgIHUgPSBlICUgMTtcclxuICAgICAgICAgICAgICByZXR1cm4gZSA9PSBlID8gKHUgPyBlIC0gdSA6IGUpIDogMDtcclxuICAgICAgICAgICAgfSkodCkpLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIC0tdCA+IDAgJiYgKHUgPSBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpLCB0IDw9IDEgJiYgKGUgPSB2b2lkIDApLCB1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjKHQpIHtcclxuICAgICAgICAgIHZhciBlID0gdHlwZW9mIHQ7XHJcbiAgICAgICAgICByZXR1cm4gISF0ICYmIChcIm9iamVjdFwiID09IGUgfHwgXCJmdW5jdGlvblwiID09IGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0LmV4cG9ydHMgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgcmV0dXJuIHUoMiwgdCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgICAgZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICB2YXIgciA9XHJcbiAgICAgICAgICAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHxcclxuICAgICAgICAgIGZ1bmN0aW9uICh0LCBlLCBuLCByKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgKG4gfHwgKG4gPSBQcm9taXNlKSkoZnVuY3Rpb24gKGksIG8pIHtcclxuICAgICAgICAgICAgICBmdW5jdGlvbiBhKHQpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgIHUoci5uZXh0KHQpKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKHQpIHtcclxuICAgICAgICAgICAgICAgICAgbyh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24gcyh0KSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICB1KHIudGhyb3codCkpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAodCkge1xyXG4gICAgICAgICAgICAgICAgICBvKHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBmdW5jdGlvbiB1KHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlO1xyXG4gICAgICAgICAgICAgICAgdC5kb25lXHJcbiAgICAgICAgICAgICAgICAgID8gaSh0LnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICA6ICgoZSA9IHQudmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIGUgaW5zdGFuY2VvZiBuXHJcbiAgICAgICAgICAgICAgICAgICAgICA/IGVcclxuICAgICAgICAgICAgICAgICAgICAgIDogbmV3IG4oZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pKS50aGVuKGEsIHMpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB1KChyID0gci5hcHBseSh0LCBlIHx8IFtdKSkubmV4dCgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaSA9XHJcbiAgICAgICAgICAgICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgdmFyIG4sXHJcbiAgICAgICAgICAgICAgICByLFxyXG4gICAgICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgICAgIG8sXHJcbiAgICAgICAgICAgICAgICBhID0ge1xyXG4gICAgICAgICAgICAgICAgICBsYWJlbDogMCxcclxuICAgICAgICAgICAgICAgICAgc2VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgxICYgaVswXSkgdGhyb3cgaVsxXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaVsxXTtcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgdHJ5czogW10sXHJcbiAgICAgICAgICAgICAgICAgIG9wczogW10sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAobyA9IHsgbmV4dDogcygwKSwgdGhyb3c6IHMoMSksIHJldHVybjogcygyKSB9KSxcclxuICAgICAgICAgICAgICAgIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmXHJcbiAgICAgICAgICAgICAgICAob1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgb1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24gcyhvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiAobykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKDsgYTspXHJcbiAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChuID0gMSksIHIgJiYgKGkgPSAyICYgb1swXSA/IHIucmV0dXJuIDogb1swXSA/IHIudGhyb3cgfHwgKChpID0gci5yZXR1cm4pICYmIGkuY2FsbChyKSwgMCkgOiByLm5leHQpICYmICEoaSA9IGkuY2FsbChyLCBvWzFdKSkuZG9uZSkpIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKCgociA9IDApLCBpICYmIChvID0gWzIgJiBvWzBdLCBpLnZhbHVlXSksIG9bMF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEubGFiZWwrKywgeyB2YWx1ZTogb1sxXSwgZG9uZTogITEgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLmxhYmVsKyssIChyID0gb1sxXSksIChvID0gWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvID0gYS5vcHMucG9wKCkpLCBhLnRyeXMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoKGkgPSBhLnRyeXMpLCAoaSA9IGkubGVuZ3RoID4gMCAmJiBpW2kubGVuZ3RoIC0gMV0pIHx8ICg2ICE9PSBvWzBdICYmIDIgIT09IG9bMF0pKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMyA9PT0gb1swXSAmJiAoIWkgfHwgKG9bMV0gPiBpWzBdICYmIG9bMV0gPCBpWzNdKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYS5sYWJlbCA9IG9bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDYgPT09IG9bMF0gJiYgYS5sYWJlbCA8IGlbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGEubGFiZWwgPSBpWzFdKSwgKGkgPSBvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAmJiBhLmxhYmVsIDwgaVsyXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYS5sYWJlbCA9IGlbMl0pLCBhLm9wcy5wdXNoKG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlbMl0gJiYgYS5vcHMucG9wKCksIGEudHJ5cy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8gPSBlLmNhbGwodCwgYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChvID0gWzYsIHRdKSwgKHIgPSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4gPSBpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoNSAmIG9bMF0pIHRocm93IG9bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG9bMF0gPyBvWzFdIDogdm9pZCAwLCBkb25lOiAhMCB9O1xyXG4gICAgICAgICAgICAgICAgICB9KShbbywgc10pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiAhMCB9KSwgKGUuRG9tVXRpbGl0aWVzID0gdm9pZCAwKTtcclxuICAgICAgICB2YXIgbyA9IG4oMCksXHJcbiAgICAgICAgICBhID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gdCgpIHsgfVxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICh0LmFkZEhpZGRlblN0eWxlID0gZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIHZvaWQgMCA9PT0gbiAmJiAobiA9IDEwMCksXHJcbiAgICAgICAgICAgICAgICAgIHIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkodGhpcywgZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChvLCBhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHIobiwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkodGhpcywgZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsID09PSAobiA9IGUuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAobi5jbGFzc0xpc3QucmVtb3ZlKFwianN2LXNob3dcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4uY2xhc3NMaXN0LmFkZChcImpzdi1oaWRkZW5cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMmUzKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWzJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5oaWRlSW1hZ2VTbG93ID0gZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIHZvaWQgMCA9PT0gbiAmJiAobiA9IDEwMCksXHJcbiAgICAgICAgICAgICAgICAgIHIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkodGhpcywgZnVuY3Rpb24gKGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHIobywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByLCBvLCB1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkodGhpcywgZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiID09PSB0ICYmIGEoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsID09PSAociA9IGUuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHMoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAoKG8gPSAxKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG8gLT0gNTAgLyBuKSA8PSAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xlYXJJbnRlcnZhbCh1KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG8gPSAwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKnIuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJkaXNwbGF5XCIpLCovIHIuaWQgIT0gXCJpMFwiID8gKHIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiKSA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vKHIuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHIuc3R5bGUub3BhY2l0eSA9IFwiXCIgKyBvKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyLnN0eWxlLmZpbHRlciA9IFwiYWxwaGEob3BhY2l0eT1cIiArIDEwMCAqIG8gKyBcIilcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDUwKSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsyXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQuYWRkU2hvd1N0eWxlID0gZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIHZvaWQgMCA9PT0gbiAmJiAobiA9IDEwMCksXHJcbiAgICAgICAgICAgICAgICAgIHIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkodGhpcywgZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChvLCBhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHIobiwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkodGhpcywgZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsID09PSAobiA9IGUuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAobi5jbGFzc0xpc3QucmVtb3ZlKFwianN2LWhpZGRlblwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbi5jbGFzc0xpc3QuYWRkKFwianN2LXNob3dcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMmUzKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWzJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5hZGRTdHlsZXMgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianN2LXN0eWxlc1wiKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgdmFyIGUgPSB0LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICAgICAgICAgICAgICAgIGUuaWQgPSBcImpzdi1zdHlsZXNcIjtcclxuICAgICAgICAgICAgICAgIChlLmlubmVyVGV4dCA9IFwiLmpzdi1oaWRkZW4geyBvcGFjaXR5OjA7IGRpc3BsYXk6IG5vbmU7IHRyYW5zaXRpb246IG9wYWNpdHkgLjhzIGVhc2UtaW4tb3V0IH0gLmpzdi1zaG93IHsgIG9wYWNpdHk6MTsgZGlzcGxheTp1bnNldDsgdHJhbnNpdGlvbjogb3BhY2l0eSAuOHMgZWFzZS1pbi1vdXQgfSAuanN2LXdpZHRoLTEwMCB7IHdpZHRoOiAxMDAlOyB9IC5qc3YtaGVpZ2h0LTEwMCB7IGhlaWdodDogMTAwJTsgfSBcIiksXHJcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZSk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQuaGlkZUltYWdlID0gZnVuY3Rpb24gKHQsIGUsIG5ld1Zpc2libGVJbWFnZSwgbmV3VmlzaWJsZUltYWdlSW5kZXgsIGpzdikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG4gPSBlLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHQuaWQpLFxyXG4gICAgICAgICAgICAgICAgICBpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFuKSByZXR1cm47IC8qdGhyb3cgXCJjb3VsZCBub3QgZmluZCBlbGVtZW50IHdpdGggaWQgXCIgKyB0LmlkKi9cclxuICAgICAgICAgICAgICAgIChuLnN0eWxlLnpJbmRleCA9IDEpLFxyXG4gICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IuaXNTYWZhcmlcclxuICAgICAgICAgICAgICAgICAgICA/IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICA6IG5hdmlnYXRvci5pc1dlYmtpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgPyBqc3YuaGlkZU1haW5FbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKG5ld1Zpc2libGVJbWFnZS5pbWcubmF0dXJhbFdpZHRoID4gMCAmJiAobi5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIikpIHx8IChpID0gc2V0SW50ZXJ2YWwodCA9PiBuZXdWaXNpYmxlSW1hZ2UuaW1nLm5hdHVyYWxXaWR0aCA+IDAgJiYgKG4ucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpICYmIGNsZWFySW50ZXJ2YWwoaSksIDUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChpID0gc2V0SW50ZXJ2YWwodCA9PiBuZXdWaXNpYmxlSW1hZ2UuaW1nLm5hdHVyYWxXaWR0aCA+IDAgJiYgKGpzdi5oaWRlTWFpbkVsZW1lbnQgPSB0cnVlKSAmJiBqc3Y/Lm1haW5JbWFnZT8uaW1nICYmIChqc3YubWFpbkltYWdlLmltZy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpICYmIChuLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiKSAmJiBjbGVhckludGVydmFsKGkpLCA1KSlcclxuICAgICAgICAgICAgICAgICAgICAgIDogKG4ucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpICYmIChqc3YuaGlkZU1haW5FbGVtZW50IHx8ICgoanN2LmhpZGVNYWluRWxlbWVudCA9IHRydWUpICYmIChqc3YubWFpbkltYWdlLmltZy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpKSk7IC8qKipMQVUobi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKSovXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQuYjY0dG9CbG9iID0gKGI2NERhdGEsIGNvbnRlbnRUeXBlID0gXCJcIiwgc2xpY2VTaXplID0gNTEyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBieXRlQ2hhcmFjdGVycyA9IGF0b2IoYjY0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBieXRlQXJyYXlzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgYnl0ZUNoYXJhY3RlcnMubGVuZ3RoOyBvZmZzZXQgKz0gc2xpY2VTaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlID0gYnl0ZUNoYXJhY3RlcnMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBzbGljZVNpemUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgY29uc3QgYnl0ZU51bWJlcnMgPSBuZXcgQXJyYXkoc2xpY2UubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGljZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGVOdW1iZXJzW2ldID0gc2xpY2UuY2hhckNvZGVBdChpKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgY29uc3QgYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZU51bWJlcnMpO1xyXG4gICAgICAgICAgICAgICAgICBieXRlQXJyYXlzLnB1c2goYnl0ZUFycmF5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoYnl0ZUFycmF5cywgeyB0eXBlOiBjb250ZW50VHlwZSB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBibG9iO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnNob3dJbWFnZSA9IGFzeW5jIGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuID0gdC5pbWc7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW4pIHJldHVybiAvKnRocm93IFwiY291bGQgbm90IGZpbmQgZWxlbWVudCB3aXRoIGlkIFwiICsgdC5pZCovO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5hdmlnYXRvci5pc1NhZmFyaSkge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBpMCA9IHQuaTA/LmltZzsgLy8vIHx8ICgoZSA9IGUuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpMFwiKSkgJiYgKGUgJiYgKGUuc3JjaTAgPSBlLnNyYykgfHwgMSkgJiYgZSk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChpMD8uc3R5bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaTAucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ICE9IFwiYmxvY2tcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaTAucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0LmJsb2IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vY29uc3QgdyA9ICR3b3JrZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHBhcnNlQXNCbG9iKGJhc2U2NFN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiNjQgPSBiYXNlNjRTdHIuc3Vic3RyKFwiZGF0YTppbWFnZS93ZWJwO2Jhc2U2NCxcIi5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWI2NCkgcmV0dXJuIGJhc2U2NFN0cjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGI2NHRvQmxvYiA9IChiNjQsIGNvbnRlbnRUeXBlID0gXCJcIiwgc2xpY2VTaXplID0gNDA5NikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ5dGVDaGFyYWN0ZXJzID0gYXRvYihiNjQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ5dGVBcnJheXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgYnl0ZUNoYXJhY3RlcnMubGVuZ3RoOyBvZmZzZXQgKz0gc2xpY2VTaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZSA9IGJ5dGVDaGFyYWN0ZXJzLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgc2xpY2VTaXplKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBieXRlTnVtYmVycyA9IG5ldyBBcnJheShzbGljZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGljZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBieXRlTnVtYmVyc1tpXSA9IHNsaWNlLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZU51bWJlcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZUFycmF5cy5wdXNoKGJ5dGVBcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoYnl0ZUFycmF5cywgeyB0eXBlOiBjb250ZW50VHlwZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmxvYjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgYnl0ZUNoYXJhY3RlcnMgPSBhdG9iKGI2NCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGJ5dGVOdW1iZXJzID0gbmV3IEFycmF5KGJ5dGVDaGFyYWN0ZXJzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvciAobGV0IGkgPSBieXRlQ2hhcmFjdGVycy5sZW5ndGg7IGktLTspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBieXRlTnVtYmVyc1tpXSA9IGJ5dGVDaGFyYWN0ZXJzLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZU51bWJlcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnN0IGJsb2IgPSBuZXcgQmxvYihbYnl0ZUFycmF5XSwgeyB0eXBlOiBcImltYWdlL3dlYnBcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmxvYiA9IGI2NHRvQmxvYihiNjQsIFwiaW1hZ2Uvd2VicFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJsb2JPYmplY3QgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmxvYk9iamVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIHBhcnNlQmxvYldvcmtlcihkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNvbnN0IGI2NCA9IGQuZGF0YS5zdWJzdHIoXCJkYXRhOmltYWdlL3dlYnA7YmFzZTY0LFwiLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgIC8vICAgY29uc3QgYnl0ZUNoYXJhY3RlcnMgPSBhdG9iKGI2NCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNvbnN0IGJ5dGVOdW1iZXJzID0gbmV3IEFycmF5KGJ5dGVDaGFyYWN0ZXJzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIGZvciAobGV0IGkgPSBieXRlQ2hhcmFjdGVycy5sZW5ndGg7IGktLTspIHtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBieXRlTnVtYmVyc1tpXSA9IGJ5dGVDaGFyYWN0ZXJzLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIC8vICAgY29uc3QgYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZU51bWJlcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2J5dGVBcnJheV0sIHsgdHlwZTogXCJpbWFnZS93ZWJwXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIHNlbGYucG9zdE1lc3NhZ2UoYmxvYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCB3b3JrTmV4dEltYWdlcyA9IHQub3B0aW9ucy5mcmFtZXMuc2xpY2UodC5zZXF1ZW5jZSwgTWF0aC5taW4odC5vcHRpb25zLmZyYW1lcy5sZW5ndGgsIHQuc2VxdWVuY2UgKyAxNikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgd29ya2VyUHJvbWlzZXMgPSB3b3JrTmV4dEltYWdlcy5tYXAodCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNvbnN0IHNyYyA9ICh0LnNyYyB8fCB0Py5tYWluSW1hZ2U/LnNyYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIHQud29ya2VyV1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gICByZXR1cm4gdy5jcmVhdGUocGFyc2VCbG9iKS5ydW4oc3JjKTtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyB3LmNyZWF0ZSh0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vICAgc2VsZi5wb3N0TWVzc2FnZSgnSGVsbG8gd29ya2VycycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBhd2FpdCBQcm9taXNlLmFsbCh3b3JrZXJQcm9taXNlcylcclxuICAgICAgICAgICAgICAgICAgICAgIC8vICAgLnRoZW4ocmVzdWx0cyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmVzdWx0cy5mb3JFYWNoKChyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICBjb25zdCBibG9iID0gci5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgY29uc3QgYmxvYk9iamVjdCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICB3b3JrTmV4dEltYWdlc1tpXS5ibG9iID0gYmxvYk9iamVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgc3JjID0gdC5zcmMgfHwgdC5pbWcuc3R5bGUuY29udGVudCB8fCBnZXRDb21wdXRlZFN0eWxlKHQuaW1nKS5jb250ZW50OyAvLyB8fCB0Py5tYWluSW1hZ2U/LnNyYztcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChzcmMuc3RhcnRzV2l0aChgdXJsKFwiYCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyg1LCBzcmMubGVuZ3RoIC0gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB0LmJsb2IgPSBzcmMgJiYgcGFyc2VBc0Jsb2Ioc3JjKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQuYmxvYiAmJiAhaTAuY2xhc3NJMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaTAuY2xhc3NJMCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpMC5jbGFzc0xpc3QucmVtb3ZlKFwiaTBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGkwLnNyYyA9IHQuYmxvYjtcclxuICAgICAgICAgICAgICAgICAgICAvL2kwLmNsYXNzTmFtZSA9IFwiaVwiICsgdC5zZXF1ZW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAvL2kwLnNyYyA9IHQuc3JjIHx8IHQ/Lm1haW5JbWFnZT8uc3JjO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBuPy5wYXJlbnROb2RlICYmIChuLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIiksIG4gJiYgKG4uc3R5bGUuekluZGV4ID0gMiksIG4/LnBhcmVudE5vZGUgJiYgbi5wYXJlbnROb2RlLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNmb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8obi5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZTNkKDAsIDAsIDApXCIpO1xyXG4gICAgICAgICAgICAgICAgLyoqKkxBVSxuLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiei1pbmRleFwiKSwgbi5zdHlsZS56SW5kZXg9MTsgbi5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIndpZHRoXCIpLCBuLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwicG9zaXRpb25cIiksIG4uc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvcGFjaXR5XCIpLCBuLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiZmlsdGVyXCIpLCBuLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidmlzaWJpbGl0eVwiKSovXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQuZ2V0SW1hZ2VIb2xkZXJFbGVtZW50ID0gZnVuY3Rpb24gKHQsIGUsIG4sIHIsIGkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvLFxyXG4gICAgICAgICAgICAgICAgICBhLFxyXG4gICAgICAgICAgICAgICAgICBzLFxyXG4gICAgICAgICAgICAgICAgICB1LFxyXG4gICAgICAgICAgICAgICAgICBjID0gdC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxyXG4gICAgICAgICAgICAgICAgICBsID0gbnVsbCAhPT0gKG8gPSByWzBdKSAmJiB2b2lkIDAgIT09IG8gPyBvIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChpLmF1dG9DRE5SZXNpemVyICYmIGkuem9vbSAmJiBudWxsICE9PSBsICYmIChudWxsID09PSAoYSA9IGkuYXV0b0NETlJlc2l6ZXJDb25maWcpIHx8IHZvaWQgMCA9PT0gYSA/IHZvaWQgMCA6IGEuc2NhbGVXaXRoWm9vbU1heCkpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKG51bGwgPT09IChzID0gaS5hdXRvQ0ROUmVzaXplckNvbmZpZykgfHwgdm9pZCAwID09PSBzID8gdm9pZCAwIDogcy51c2VXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkID0gbC5uYXR1cmFsV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgKGQgLz0gaS56b29tTWF4KSwgKGMuc3R5bGUubWF4V2lkdGggPSBkICsgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBpZiAobnVsbCA9PT0gKHUgPSBpLmF1dG9DRE5SZXNpemVyQ29uZmlnKSB8fCB2b2lkIDAgPT09IHUgPyB2b2lkIDAgOiB1LnVzZUhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBoID0gbC5uYXR1cmFsSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIChoIC89IGkuem9vbU1heCksIChjLnN0eWxlLmhlaWdodCA9IGggKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAoYy5zdHlsZS5wYWRkaW5nID0gXCIwXCIpLFxyXG4gICAgICAgICAgICAgICAgICAoYy5zdHlsZS5tYXJnaW4gPSBcIjBcIiksXHJcbiAgICAgICAgICAgICAgICAgIChjLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiKSxcclxuICAgICAgICAgICAgICAgICAgKGMuc3R5bGUuekluZGV4ID0gMCksXHJcbiAgICAgICAgICAgICAgICAgIC8vKGMuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiKSxcclxuICAgICAgICAgICAgICAgICAgLy8oYy5zdHlsZS5tYXhIZWlnaHQgPSBcIjBweFwiKSxcclxuICAgICAgICAgICAgICAgICAgKGMuc3R5bGUuZGlzcGxheSA9IG5hdmlnYXRvci5pc1dlYmtpdCA/IFwiYmxvY2tcIiA6IFwibm9uZVwiKSxcclxuICAgICAgICAgICAgICAgICAgKGMuY2xhc3NOYW1lID0gXCJqc3YtaW5uZXJcIiksXHJcbiAgICAgICAgICAgICAgICAgIChjLmlkID0gbiksXHJcbiAgICAgICAgICAgICAgICAgIGNcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucmVtb3ZlRWxlbWVudCA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobnVsbCAhPT0gdCAmJiB0ICYmIHQucGFyZW50Tm9kZSAmJiB0Lmhhc0NoaWxkTm9kZXMoKSlcclxuICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodCk7XHJcbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5nZXRNYWluSG9sZGVyRWxlbWVudCA9IGZ1bmN0aW9uICh0LCBlLCBuLCByKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaSA9IGUuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSByZXR1cm4gKGkuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCIpLCBpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IG8uZGVmYXVsdCgnQ291bGQgbm90IGZpbmQgbWFpbiBob2xkZXIgd2l0aCBpZCBcIicgKyB0ICsgJ1wiLiBEaWQgeW91IGNyZWF0ZSBhbiBlbGVtZW50IGxpa2UgPGRpdiBpZD1cIicgKyB0ICsgJ1wiPjwvZGl2PicpO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LmNyZWF0ZUxpbmsgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG4gPSB0LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICAgICAgICAgICAgKG4udGl0bGUgPSBhdG9iKFwiTXpZd0lIQnliMlIxWTNRZ2RtbGxkMlZ5TENBek5qQWdjM0JwYmc9PVwiKSksXHJcbiAgICAgICAgICAgICAgICAgIChuLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiKSxcclxuICAgICAgICAgICAgICAgICAgKG4uc3R5bGUuYm90dG9tID0gXCIxMHB4XCIpLFxyXG4gICAgICAgICAgICAgICAgICAobi5zdHlsZS5yaWdodCA9IFwiMTBweFwiKSxcclxuICAgICAgICAgICAgICAgICAgKG4uc3R5bGUuekluZGV4ID0gXCIzMDBcIiksXHJcbiAgICAgICAgICAgICAgICAgIChuLnN0eWxlLmNvbG9yID0gXCIjY2NjXCIpLFxyXG4gICAgICAgICAgICAgICAgICAobi5ocmVmID0gYXRvYihcImFIUjBjSE02THk5M2QzY3VNell3TFdwaGRtRnpZM0pwY0hSMmFXVjNaWEl1WTI5dFwiKSksXHJcbiAgICAgICAgICAgICAgICAgIChuLmlubmVyVGV4dCA9IGF0b2IoXCJNell3SUhCeWIyUjFZM1FnZG1sbGQyVnlcIikpLFxyXG4gICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKG4pO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LmdldEltYWdlRWxlbWVudCA9IGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbiA9IHQuaW1nIHx8IGUuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgICAgIG4ub25sb2FkID0gdC5vbmxvYWRlZDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAobi5zcmMgPSB0LnNyYyksXHJcbiAgICAgICAgICAgICAgICAvLyhuLnN0eWxlLmRpc3BsYXkgPSBuYXZpZ2F0b3IuaXNGaXJlZm94ID8gXCJibG9ja1wiIDogJ25vbmUnKSxcclxuICAgICAgICAgICAgICAgIC8qKipcIlwiLExBVXQuc3JjLCovIChuLmlkID0gdC5pZCksXHJcbiAgICAgICAgICAgICAgICAvKioqTEFVbi5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnLCovIC8qTEFVbi5zdHlsZS56SW5kZXggPSAwLCovIChuLnN0eWxlLnRvdWNoQWN0aW9uID0gXCJwYW4teFwiKSxcclxuICAgICAgICAgICAgICAgICAgKG4uc3R5bGUudG91Y2hBY3Rpb24gPSBcInBhbi15XCIpLFxyXG4gICAgICAgICAgICAgICAgICB0LmV4dHJhQ2xhc3MubGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgICB0LmV4dHJhQ2xhc3Muc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0Lmxlbmd0aCA+IDAgJiYgbi5jbGFzc0xpc3QuYWRkKHQudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgIG5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQuc2V0UG9pbnRlciA9IGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgICB0LnN0eWxlLmN1cnNvciA9IGU7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQuc2V0VG91Y2hBY3Rpb24gPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgZSAmJiAodC5zdHlsZS50b3VjaEFjdGlvbiA9IGUpO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgIHRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgZS5Eb21VdGlsaXRpZXMgPSBhO1xyXG4gICAgICB9LFxyXG4gICAgICBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgIHQuZXhwb3J0cyA9IChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgdmFyIGUgPSB7fTtcclxuICAgICAgICAgIGZ1bmN0aW9uIG4ocikge1xyXG4gICAgICAgICAgICBpZiAoZVtyXSkgcmV0dXJuIGVbcl0uZXhwb3J0cztcclxuICAgICAgICAgICAgdmFyIGkgPSAoZVtyXSA9IHsgaTogciwgbDogITEsIGV4cG9ydHM6IHt9IH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdFtyXS5jYWxsKGkuZXhwb3J0cywgaSwgaS5leHBvcnRzLCBuKSwgKGkubCA9ICEwKSwgaS5leHBvcnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgKG4ubSA9IHQpLFxyXG4gICAgICAgICAgICAobi5jID0gZSksXHJcbiAgICAgICAgICAgIChuLmQgPSBmdW5jdGlvbiAodCwgZSwgcikge1xyXG4gICAgICAgICAgICAgIG4ubyh0LCBlKSB8fCBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgZSwgeyBlbnVtZXJhYmxlOiAhMCwgZ2V0OiByIH0pO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgKG4uciA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIFN5bWJvbC50b1N0cmluZ1RhZyAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiBcIk1vZHVsZVwiIH0pLCBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6ICEwIH0pO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgKG4udCA9IGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCgxICYgZSAmJiAodCA9IG4odCkpLCA4ICYgZSkpIHJldHVybiB0O1xyXG4gICAgICAgICAgICAgIGlmICg0ICYgZSAmJiBcIm9iamVjdFwiID09IHR5cGVvZiB0ICYmIHQgJiYgdC5fX2VzTW9kdWxlKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgICB2YXIgciA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgICAgICAgICAgICAgaWYgKChuLnIociksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiAhMCwgdmFsdWU6IHQgfSksIDIgJiBlICYmIFwic3RyaW5nXCIgIT0gdHlwZW9mIHQpKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0KVxyXG4gICAgICAgICAgICAgICAgICBuLmQoXHJcbiAgICAgICAgICAgICAgICAgICAgcixcclxuICAgICAgICAgICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdFtlXTtcclxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQobnVsbCwgaSlcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIChuLm4gPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgIHZhciBlID1cclxuICAgICAgICAgICAgICAgIHQgJiYgdC5fX2VzTW9kdWxlXHJcbiAgICAgICAgICAgICAgICAgID8gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0LmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG4uZChlLCBcImFcIiwgZSksIGU7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAobi5vID0gZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsIGUpO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgKG4ucCA9IFwiXCIpLFxyXG4gICAgICAgICAgICBuKChuLnMgPSA0KSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSkoW1xyXG4gICAgICAgICAgZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHIodCwgZSwgbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBlIGluIHRcclxuICAgICAgICAgICAgICAgICAgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBuLFxyXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6ICEwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogITAsXHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGFibGU6ICEwLFxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICA6ICh0W2VdID0gbiksXHJcbiAgICAgICAgICAgICAgICB0XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpKHQpIHtcclxuICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0KSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgZSA9IDAsIG4gPSBBcnJheSh0Lmxlbmd0aCk7IGUgPCB0Lmxlbmd0aDsgZSsrKSBuW2VdID0gdFtlXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6ICEwIH0pO1xyXG4gICAgICAgICAgICB2YXIgbyA9IG4oMSksXHJcbiAgICAgICAgICAgICAgYSA9IG4oMiksXHJcbiAgICAgICAgICAgICAgcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNsb3Qgbm90IGNvbm5lY3RlZFwiKTtcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBlLmRlZmF1bHRTbG90Q29uZmlnID0geyBub0J1ZmZlcjogITEgfTtcclxuICAgICAgICAgICAgdmFyIHUgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gcygpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgY29uZmlnOiB0LFxyXG4gICAgICAgICAgICAgICAgICBsYXp5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIG9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHNsb3ROYW1lOiBcIk5vdCBjb25uZWN0ZWRcIixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGMgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGUpLnJlZHVjZShmdW5jdGlvbiAobiwgcikge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gbi5jb25jYXQoZVtyXVt0XSB8fCBbXSk7XHJcbiAgICAgICAgICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBsID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0KS5yZWR1Y2UoZnVuY3Rpb24gKGUsIG4pIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIHIgPSB0W25dLFxyXG4gICAgICAgICAgICAgICAgICAgIG8gPSBPYmplY3Qua2V5cyhyKS5maWx0ZXIoZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoclt0XSB8fCBbXSkubGVuZ3RoID4gMDtcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhID0gW10uY29uY2F0KGkoZSksIGkobykpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gW10uY29uY2F0KGkobmV3IFNldChhKSkpO1xyXG4gICAgICAgICAgICAgICAgfSwgW10pO1xyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIChlLnNsb3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiB2b2lkIDAgIT09IGFyZ3VtZW50c1swXSA/IGFyZ3VtZW50c1swXSA6IGUuZGVmYXVsdFNsb3RDb25maWc7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHUodCk7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgIChlLmNvbm5lY3RTbG90ID0gZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgdm9pZCAwICE9PSBhcmd1bWVudHNbMl0gPyBhcmd1bWVudHNbMl0gOiB7fSxcclxuICAgICAgICAgICAgICAgICAgcyA9IGUucmVkdWNlKGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHQsIHIoe30sIG4sIHt9KSk7XHJcbiAgICAgICAgICAgICAgICAgIH0sIHIoe30sIFwiTE9DQUxfVFJBTlNQT1JUXCIsIHt9KSksXHJcbiAgICAgICAgICAgICAgICAgIHUgPSBlLnJlZHVjZShmdW5jdGlvbiAodCwgZSwgbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0LCByKHt9LCBuLCB7fSkpO1xyXG4gICAgICAgICAgICAgICAgICB9LCB7fSksXHJcbiAgICAgICAgICAgICAgICAgIGQgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuID0gZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgciA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAobiA9IHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdVt0XVtlXSA9IHsgcmVnaXN0ZXJlZDogciwgb25SZWdpc3RlcjogbiB9O1xyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICBoID0gW10sXHJcbiAgICAgICAgICAgICAgICAgIGYgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgZyA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGguZm9yRWFjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHAgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbSh0LCByKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBsID0gMiA9PT0gYXJndW1lbnRzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICBoID0gbCA/IHIgOiB0LFxyXG4gICAgICAgICAgICAgICAgICAgIGYgPSBsID8gdCA6IGEuREVGQVVMVF9QQVJBTTtcclxuICAgICAgICAgICAgICAgICAgaWYgKG4ubm9CdWZmZXIgfHwgMCA9PT0gZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZyA9IGMoZiwgcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG8uY2FsbEhhbmRsZXJzKGgsIGcpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGUuZm9yRWFjaChmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVbZV1bZl0gfHwgZChTdHJpbmcoZSksIGYpO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgdmFyIHAgPSBlLnJlZHVjZShmdW5jdGlvbiAodCwgZSwgbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXS5jb25jYXQoaSh0KSwgW3Vbbl1bZl0ucmVnaXN0ZXJlZF0pO1xyXG4gICAgICAgICAgICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGMoZiwgcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG8uY2FsbEhhbmRsZXJzKGgsIHQpO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHYodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIGgucHVzaCh0KSxcclxuICAgICAgICAgICAgICAgICAgICBmLnB1c2goZSksXHJcbiAgICAgICAgICAgICAgICAgICAgbChzKS5mb3JFYWNoKHQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGwocykuZm9yRWFjaChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHZhciBuID0gaC5pbmRleE9mKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgbiA+IC0xICYmIGguc3BsaWNlKG4sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBmLmluZGV4T2YoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICByID4gLTEgJiYgZi5zcGxpY2UociwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24geShuLCByKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBpID0gXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3RyaW5nXCIgPT0gdHlwZW9mIG4gPyAoKGkgPSBuKSwgKG8gPSByIHx8IG8pKSA6ICgoaSA9IGEuREVGQVVMVF9QQVJBTSksIChvID0gbikpLFxyXG4gICAgICAgICAgICAgICAgICAgIGUuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUucmVnaXN0ZXJIYW5kbGVyKHQsIGksIG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIChzLkxPQ0FMX1RSQU5TUE9SVFtpXSA9IChzLkxPQ0FMX1RSQU5TUE9SVFtpXSB8fCBbXSkuY29uY2F0KG8pKSxcclxuICAgICAgICAgICAgICAgICAgICAxID09PSBjKGksIHMpLmxlbmd0aCAmJiBnKGkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGUuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS51bnJlZ2lzdGVySGFuZGxlcih0LCBpLCBvKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIG4gPSAocy5MT0NBTF9UUkFOU1BPUlRbaV0gfHwgW10pLmluZGV4T2Yobyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAtMSAhPT0gbiAmJiBzLkxPQ0FMX1RSQU5TUE9SVFtpXS5zcGxpY2UobiwgMSksIDAgPT09IGMoaSwgcykubGVuZ3RoICYmIHAoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgZS5mb3JFYWNoKGZ1bmN0aW9uIChlLCBuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5hZGRSZW1vdGVIYW5kbGVyUmVnaXN0cmF0aW9uQ2FsbGJhY2sodCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiB2b2lkIDAgIT09IGFyZ3VtZW50c1swXSA/IGFyZ3VtZW50c1swXSA6IGEuREVGQVVMVF9QQVJBTSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZSA9IGFyZ3VtZW50c1sxXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHNbbl1bdF0gfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAoc1tuXVt0XSA9IHIuY29uY2F0KGUpKSwgMSA9PT0gYyh0LCBzKS5sZW5ndGggJiYgZyh0KSwgdVtuXVt0XSB8fCBkKFN0cmluZyhuKSwgdCksIHVbbl1bdF0ub25SZWdpc3RlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZS5hZGRSZW1vdGVIYW5kbGVyVW5yZWdpc3RyYXRpb25DYWxsYmFjayh0LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgdm9pZCAwICE9PSBhcmd1bWVudHNbMF0gPyBhcmd1bWVudHNbMF0gOiBhLkRFRkFVTFRfUEFSQU0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZSA9IGFyZ3VtZW50c1sxXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByID0gc1tuXVt0XSB8fCBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gci5pbmRleE9mKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID4gLTEgJiYgc1tuXVt0XS5zcGxpY2UoaSwgMSksIDAgPT09IGModCwgcykubGVuZ3RoICYmIHAodCksIGQoU3RyaW5nKG4pLCB0KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihtLCB7IG9uOiB5LCBsYXp5OiB2LCBjb25maWc6IG4sIHNsb3ROYW1lOiB0IH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiByKHQsIGUpIHtcclxuICAgICAgICAgICAgICB2YXIgbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIG4gPSB0KGUpO1xyXG4gICAgICAgICAgICAgIH0gY2F0Y2ggKHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh0KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG4gJiYgbi50aGVuID8gbiA6IFByb21pc2UucmVzb2x2ZShuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6ICEwIH0pLFxyXG4gICAgICAgICAgICAgIChlLmNhbGxIYW5kbGVycyA9IGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZSAmJiAwICE9PSBlLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICA/IDEgPT09IGUubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgPyByKGVbMF0sIHQpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBQcm9taXNlLmFsbChcclxuICAgICAgICAgICAgICAgICAgICAgIGUubWFwKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByKGUsIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHQpIHsgfSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogITAgfSksIChlLkRFRkFVTFRfUEFSQU0gPSBcIiRfREVGQVVMVF8kXCIpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgICAgICB2YXIgciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24gdCh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGUubGVuZ3RoOyBuKyspIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIHIgPSBlW25dO1xyXG4gICAgICAgICAgICAgICAgICAoci5lbnVtZXJhYmxlID0gci5lbnVtZXJhYmxlIHx8ICExKSwgKHIuY29uZmlndXJhYmxlID0gITApLCBcInZhbHVlXCIgaW4gciAmJiAoci53cml0YWJsZSA9ICEwKSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsIHIua2V5LCByKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlLCBuLCByKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbiAmJiB0KGUucHJvdG90eXBlLCBuKSwgciAmJiB0KGUsIHIpLCBlO1xyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGkodCwgZSkge1xyXG4gICAgICAgICAgICAgIGlmICghKHQgaW5zdGFuY2VvZiBlKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6ICEwIH0pO1xyXG4gICAgICAgICAgICB2YXIgbyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24gdCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgdm9pZCAwICE9PSBhcmd1bWVudHNbMF0gPyBhcmd1bWVudHNbMF0gOiA1ZTM7XHJcbiAgICAgICAgICAgICAgICBpKHRoaXMsIHQpLCAodGhpcy5fdGltZW91dCA9IGUpLCAodGhpcy5fb25NZXNzYWdlQ2FsbGJhY2tzID0gW10pLCAodGhpcy5fb25Db25uZWN0Q2FsbGJhY2tzID0gW10pLCAodGhpcy5fb25EaXNjb25uZWN0Q2FsbGJhY2tzID0gW10pLCAodGhpcy5fb25FcnJvckNhbGxiYWNrcyA9IFtdKSwgKHRoaXMuX3JlYWR5ID0gITEpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgcih0LCBbXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IFwib25EYXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAtMSA9PT0gdGhpcy5fb25NZXNzYWdlQ2FsbGJhY2tzLmluZGV4T2YodCkgJiYgdGhpcy5fb25NZXNzYWdlQ2FsbGJhY2tzLnB1c2godCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJvbkNvbm5lY3RcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlYWR5ICYmIHQoKSwgdGhpcy5fb25Db25uZWN0Q2FsbGJhY2tzLnB1c2godCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJvbkRpc2Nvbm5lY3RcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29uRGlzY29ubmVjdENhbGxiYWNrcy5wdXNoKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IFwib25FcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25FcnJvckNhbGxiYWNrcy5wdXNoKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiX21lc3NhZ2VSZWNlaXZlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25NZXNzYWdlQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIl9lcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25FcnJvckNhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJfY29ubmVjdGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICh0aGlzLl9yZWFkeSA9ICEwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25Db25uZWN0Q2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIl9kaXNjb25uZWN0ZWRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3JlYWR5ID0gITEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbkRpc2Nvbm5lY3RDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IFwidGltZW91dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVvdXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgICAgdFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgIGUuR2VuZXJpY0NoYW5uZWwgPSBvO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgICAgIHQuZXhwb3J0cyA9IG4oNSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogITAgfSk7XHJcbiAgICAgICAgICAgIHZhciByID0gbigwKTtcclxuICAgICAgICAgICAgZS5zbG90ID0gci5zbG90O1xyXG4gICAgICAgICAgICB2YXIgaSA9IG4oNik7XHJcbiAgICAgICAgICAgIChlLmNvbWJpbmVFdmVudHMgPSBpLmNvbWJpbmVFdmVudHMpLCAoZS5jcmVhdGVFdmVudEJ1cyA9IGkuY3JlYXRlRXZlbnRCdXMpO1xyXG4gICAgICAgICAgICB2YXIgbyA9IG4oMyk7XHJcbiAgICAgICAgICAgIGUuR2VuZXJpY0NoYW5uZWwgPSBvLkdlbmVyaWNDaGFubmVsO1xyXG4gICAgICAgICAgICB2YXIgYSA9IG4oOCk7XHJcbiAgICAgICAgICAgIGUuQ2h1bmtlZENoYW5uZWwgPSBhLkNodW5rZWRDaGFubmVsO1xyXG4gICAgICAgICAgICB2YXIgcyA9IG4oMik7XHJcbiAgICAgICAgICAgIGUuREVGQVVMVF9QQVJBTSA9IHMuREVGQVVMVF9QQVJBTTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmdW5jdGlvbiAodCwgZSwgbikge1xyXG4gICAgICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICAgICAgZnVuY3Rpb24gcih0KSB7XHJcbiAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodCkpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGUgPSAwLCBuID0gQXJyYXkodC5sZW5ndGgpOyBlIDwgdC5sZW5ndGg7IGUrKykgbltlXSA9IHRbZV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiAhMCB9KTtcclxuICAgICAgICAgICAgdmFyIGkgPSBuKDApLFxyXG4gICAgICAgICAgICAgIG8gPSBuKDcpO1xyXG4gICAgICAgICAgICAoZS5jb21iaW5lRXZlbnRzID0gZnVuY3Rpb24gKHQsIGUsIG4sIGksIG8sIGEsIHMsIHUsIGMsIGwsIGQsIGgsIGYsIGcsIHAsIG0sIHYsIHksIGIsIHcsIHgsIEUsIFIsIEkpIHtcclxuICAgICAgICAgICAgICB2YXIgXyA9IEFycmF5LmZyb20oYXJndW1lbnRzKSxcclxuICAgICAgICAgICAgICAgIGsgPSBfLnJlZHVjZShmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gW10uY29uY2F0KHIodCksIHIoT2JqZWN0LmtleXMoZSkpKTtcclxuICAgICAgICAgICAgICAgIH0sIFtdKSxcclxuICAgICAgICAgICAgICAgIEMgPSBbXS5jb25jYXQocihuZXcgU2V0KGspKSk7XHJcbiAgICAgICAgICAgICAgaWYgKGsubGVuZ3RoID4gQy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihcInRzLWV2ZW50LWJ1czogZHVwbGljYXRlIHNsb3RzIGVuY291bnRlcmVkIGluIGNvbWJpbmVFdmVudHMuXCIpO1xyXG4gICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduLmFwcGx5KE9iamVjdCwgW3t9XS5jb25jYXQocihfKSkpO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAoZS5jcmVhdGVFdmVudEJ1cyA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSA9ICh0LmNoYW5uZWxzIHx8IFtdKS5tYXAoZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBvLlRyYW5zcG9ydCh0KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHQuZXZlbnRzKS5yZWR1Y2UoZnVuY3Rpb24gKG4sIHIpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIG8gPSB0LmV2ZW50c1tyXS5jb25maWc7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAobltyXSA9IGkuY29ubmVjdFNsb3QociwgZSwgbykpLCBuO1xyXG4gICAgICAgICAgICAgICAgfSwge30pO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgICAgICB2YXIgciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24gdCh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGUubGVuZ3RoOyBuKyspIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIHIgPSBlW25dO1xyXG4gICAgICAgICAgICAgICAgICAoci5lbnVtZXJhYmxlID0gci5lbnVtZXJhYmxlIHx8ICExKSwgKHIuY29uZmlndXJhYmxlID0gITApLCBcInZhbHVlXCIgaW4gciAmJiAoci53cml0YWJsZSA9ICEwKSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsIHIua2V5LCByKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlLCBuLCByKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbiAmJiB0KGUucHJvdG90eXBlLCBuKSwgciAmJiB0KGUsIHIpLCBlO1xyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogITAgfSk7XHJcbiAgICAgICAgICAgIHZhciBpID0gbigxKSxcclxuICAgICAgICAgICAgICBvID0gMCxcclxuICAgICAgICAgICAgICBhID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHQoZSkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICEoZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0IGluc3RhbmNlb2YgZSkpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgIH0pKHRoaXMsIHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLl9jaGFubmVsID0gZSksXHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuX2xvY2FsSGFuZGxlcnMgPSB7fSksXHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuX2xvY2FsSGFuZGxlclJlZ2lzdHJhdGlvbnMgPSB7fSksXHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3JlbW90ZUhhbmRsZXJzID0ge30pLFxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLl9yZW1vdGVIYW5kbGVyUmVnaXN0cmF0aW9uQ2FsbGJhY2tzID0ge30pLFxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLl9yZW1vdGVIYW5kbGVyRGVsZXRpb25DYWxsYmFja3MgPSB7fSksXHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3BlbmRpbmdSZXF1ZXN0cyA9IHt9KSxcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5fY2hhbm5lbFJlYWR5ID0gITEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5uZWwub25EYXRhKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHQudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmVxdWVzdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuLl9yZXF1ZXN0UmVjZWl2ZWQodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZXNwb25zZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuLl9yZXNwb25zZVJlY2VpdmVkKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaGFuZGxlcl9yZWdpc3RlcmVkXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG4uX3JlZ2lzdGVyUmVtb3RlSGFuZGxlcih0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImhhbmRsZXJfdW5yZWdpc3RlcmVkXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG4uX3VucmVnaXN0ZXJSZW1vdGVIYW5kbGVyKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZXJyb3JcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbi5fZXJyb3JSZWNlaXZlZCh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAhKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaG91bGQgbm90IGhhcHBlbjogXCIgKyB0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFubmVsLm9uQ29ubmVjdChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAobi5fY2hhbm5lbFJlYWR5ID0gITApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhuLl9sb2NhbEhhbmRsZXJSZWdpc3RyYXRpb25zKS5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbi5fbG9jYWxIYW5kbGVyUmVnaXN0cmF0aW9uc1t0XS5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuLl9jaGFubmVsLnNlbmQodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5uZWwub25EaXNjb25uZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIChuLl9jaGFubmVsUmVhZHkgPSAhMSksIG4uX3VucmVnaXN0ZXJBbGxSZW1vdGVIYW5kbGVycygpLCBuLl9yZWplY3RBbGxQZW5kaW5nUmVxdWVzdHMobmV3IEVycm9yKFwiUkVNT1RFX0NPTk5FQ1RJT05fQ0xPU0VEXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFubmVsLm9uRXJyb3IoZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuLl9yZWplY3RBbGxQZW5kaW5nUmVxdWVzdHModCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICByKHQsIFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiX3JlcXVlc3RSZWNlaXZlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlID0gdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gdC5zbG90TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByID0gdC5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSB0LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGEgPSB0LnBhcmFtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHMgPSB0aGlzLl9sb2NhbEhhbmRsZXJzW25dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1ID0gc1thXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB1ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsSGFuZGxlcnMociwgdSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5fY2hhbm5lbC5zZW5kKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicmVzcG9uc2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3ROYW1lOiBuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW06IGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlLl9jaGFubmVsLnNlbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlwiICsgdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtOiBhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdE5hbWU6IG4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjazogdC5zdGFjayB8fCBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJfcmVzcG9uc2VSZWNlaXZlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlID0gdC5zbG90TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gdC5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHIgPSB0LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSB0LnBhcmFtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSB0aGlzLl9wZW5kaW5nUmVxdWVzdHNbZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8gJiYgb1tpXSAmJiBvW2ldW3JdICYmIChvW2ldW3JdLnJlc29sdmUobiksIGRlbGV0ZSBvW2ldW3JdKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiX2Vycm9yUmVjZWl2ZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IHQuc2xvdE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9IHQuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgciA9IHQubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gdC5zdGFjayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvID0gdC5wYXJhbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhID0gdGhpcy5fcGVuZGluZ1JlcXVlc3RzW2VdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYSAmJiBhW29dICYmIGFbb11bbl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IG5ldyBFcnJvcihyICsgXCIgb24gXCIgKyBlICsgXCIgd2l0aCBwYXJhbSBcIiArIG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChzLnN0YWNrID0gaSB8fCBzLnN0YWNrKSwgdGhpcy5fcGVuZGluZ1JlcXVlc3RzW2VdW29dW25dLnJlamVjdChzKSwgZGVsZXRlIHRoaXMuX3BlbmRpbmdSZXF1ZXN0c1tlXVtvXVtuXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJfcmVnaXN0ZXJSZW1vdGVIYW5kbGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG4gPSB0LnNsb3ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHIgPSB0LnBhcmFtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSB0aGlzLl9yZW1vdGVIYW5kbGVyUmVnaXN0cmF0aW9uQ2FsbGJhY2tzW25dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhID0gdGhpcy5fcmVtb3RlSGFuZGxlcnNbbl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhIHx8ICFhW3JdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoaSwgYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZS5fY2hhbm5lbFJlYWR5KSByZXR1cm4gYShuZXcgRXJyb3IoXCJDSEFOTkVMX05PVF9SRUFEWSBvbiBcIiArIG4pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IFwiXCIgKyBvKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGUuX3BlbmRpbmdSZXF1ZXN0c1tuXSA9IGUuX3BlbmRpbmdSZXF1ZXN0c1tuXSB8fCB7fSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZS5fcGVuZGluZ1JlcXVlc3RzW25dW3JdID0gZS5fcGVuZGluZ1JlcXVlc3RzW25dW3JdIHx8IHt9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlLl9wZW5kaW5nUmVxdWVzdHNbbl1bcl1bc10gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmU6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdDogYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5fY2hhbm5lbC5zZW5kKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZXF1ZXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90TmFtZTogbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW06IHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9ICgoZS5fcGVuZGluZ1JlcXVlc3RzW25dIHx8IHt9KVtyXSB8fCB7fSlbc107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBuZXcgRXJyb3IoXCJUSU1FRF9PVVQgb24gXCIgKyBuICsgXCIgd2l0aCBwYXJhbSBcIiArIHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQucmVqZWN0KGkpLCBkZWxldGUgZS5fcGVuZGluZ1JlcXVlc3RzW25dW3JdW3NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlLl9jaGFubmVsLnRpbWVvdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5fcmVtb3RlSGFuZGxlcnNbbl0gPSB0aGlzLl9yZW1vdGVIYW5kbGVyc1tuXSB8fCB7fSksICh0aGlzLl9yZW1vdGVIYW5kbGVyc1tuXVtyXSA9IHMpLCBpKHIsIHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJfdW5yZWdpc3RlclJlbW90ZUhhbmRsZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IHQuc2xvdE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9IHQucGFyYW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgciA9IHRoaXMuX3JlbW90ZUhhbmRsZXJEZWxldGlvbkNhbGxiYWNrc1tlXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gdGhpcy5fcmVtb3RlSGFuZGxlcnNbZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG8gPSBpW25dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG8gJiYgciAmJiAocihuLCBvKSwgZGVsZXRlIHRoaXMuX3JlbW90ZUhhbmRsZXJzW2VdW25dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJfdW5yZWdpc3RlckFsbFJlbW90ZUhhbmRsZXJzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuX3JlbW90ZUhhbmRsZXJEZWxldGlvbkNhbGxiYWNrcykuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuID0gdC5fcmVtb3RlSGFuZGxlcnNbZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMobilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuW3RdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAobikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0Ll91bnJlZ2lzdGVyUmVtb3RlSGFuZGxlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90TmFtZTogZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtOiBuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAga2V5OiBcIl9yZWplY3RBbGxQZW5kaW5nUmVxdWVzdHNcIixcclxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuX3BlbmRpbmdSZXF1ZXN0cykuZm9yRWFjaChmdW5jdGlvbiAobikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGUuX3BlbmRpbmdSZXF1ZXN0c1tuXSkuZm9yRWFjaChmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZS5fcGVuZGluZ1JlcXVlc3RzW25dW3JdKS5mb3JFYWNoKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuX3BlbmRpbmdSZXF1ZXN0c1tuXVtyXVtpXS5yZWplY3QodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlLl9wZW5kaW5nUmVxdWVzdHNbbl0gPSB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJhZGRSZW1vdGVIYW5kbGVyUmVnaXN0cmF0aW9uQ2FsbGJhY2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdGVIYW5kbGVyUmVnaXN0cmF0aW9uQ2FsbGJhY2tzW3RdIHx8ICh0aGlzLl9yZW1vdGVIYW5kbGVyUmVnaXN0cmF0aW9uQ2FsbGJhY2tzW3RdID0gZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAga2V5OiBcImFkZFJlbW90ZUhhbmRsZXJVbnJlZ2lzdHJhdGlvbkNhbGxiYWNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3RlSGFuZGxlckRlbGV0aW9uQ2FsbGJhY2tzW3RdIHx8ICh0aGlzLl9yZW1vdGVIYW5kbGVyRGVsZXRpb25DYWxsYmFja3NbdF0gPSBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwicmVnaXN0ZXJIYW5kbGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgodGhpcy5fbG9jYWxIYW5kbGVyc1t0XSA9IHRoaXMuX2xvY2FsSGFuZGxlcnNbdF0gfHwge30pLCAodGhpcy5fbG9jYWxIYW5kbGVyc1t0XVtlXSA9IHRoaXMuX2xvY2FsSGFuZGxlcnNbdF1bZV0gfHwgW10pLCB0aGlzLl9sb2NhbEhhbmRsZXJzW3RdW2VdLnB1c2gobiksIDEgPT09IHRoaXMuX2xvY2FsSGFuZGxlcnNbdF1bZV0ubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJoYW5kbGVyX3JlZ2lzdGVyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtOiBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdE5hbWU6IHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5fbG9jYWxIYW5kbGVyUmVnaXN0cmF0aW9uc1tlXSA9IHRoaXMuX2xvY2FsSGFuZGxlclJlZ2lzdHJhdGlvbnNbZV0gfHwgW10pLCB0aGlzLl9sb2NhbEhhbmRsZXJSZWdpc3RyYXRpb25zW2VdLnB1c2gociksIHRoaXMuX2NoYW5uZWxSZWFkeSAmJiB0aGlzLl9jaGFubmVsLnNlbmQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwidW5yZWdpc3RlckhhbmRsZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAodCwgZSwgbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IHRoaXMuX2xvY2FsSGFuZGxlcnNbdF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyICYmIHJbZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IHJbZV0uaW5kZXhPZihuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IC0xICYmIChyW2VdLnNwbGljZShpLCAxKSwgMCA9PT0gcltlXS5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJoYW5kbGVyX3VucmVnaXN0ZXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbTogZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdE5hbWU6IHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbm5lbFJlYWR5ICYmIHRoaXMuX2NoYW5uZWwuc2VuZChvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgICAgICAgIHRcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgZS5UcmFuc3BvcnQgPSBhO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgICAgICB2YXIgciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24gdCh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGUubGVuZ3RoOyBuKyspIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIHIgPSBlW25dO1xyXG4gICAgICAgICAgICAgICAgICAoci5lbnVtZXJhYmxlID0gci5lbnVtZXJhYmxlIHx8ICExKSwgKHIuY29uZmlndXJhYmxlID0gITApLCBcInZhbHVlXCIgaW4gciAmJiAoci53cml0YWJsZSA9ICEwKSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsIHIua2V5LCByKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlLCBuLCByKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbiAmJiB0KGUucHJvdG90eXBlLCBuKSwgciAmJiB0KGUsIHIpLCBlO1xyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pKCksXHJcbiAgICAgICAgICAgICAgaSA9IGZ1bmN0aW9uIHQoZSwgbiwgcikge1xyXG4gICAgICAgICAgICAgICAgbnVsbCA9PT0gZSAmJiAoZSA9IEZ1bmN0aW9uLnByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgbik7XHJcbiAgICAgICAgICAgICAgICBpZiAodm9pZCAwID09PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGUpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbCA9PT0gbyA/IHZvaWQgMCA6IHQobywgbiwgcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoXCJ2YWx1ZVwiIGluIGkpIHJldHVybiBpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIGEgPSBpLmdldDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIDAgIT09IGEgPyBhLmNhbGwocikgOiB2b2lkIDA7XHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiAhMCB9KTtcclxuICAgICAgICAgICAgdmFyIG8gPSBuKDMpLFxyXG4gICAgICAgICAgICAgIGEgPSBuKDkpLFxyXG4gICAgICAgICAgICAgIHMgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0LmNodW5rSWQpIHRocm93IG5ldyBFcnJvcihcIkNodW5rZWRNZXNzYWdlIGRpZCBub3QgaGF2ZSBhIGNodW5rSWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkodCkpO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgdSA9IChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZSh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICEoZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0IGluc3RhbmNlb2YgZSkpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgIH0pKHRoaXMsIGUpO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbiA9IChmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdCkgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhZSB8fCAoXCJvYmplY3RcIiAhPSB0eXBlb2YgZSAmJiBcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIGUpID8gdCA6IGU7XHJcbiAgICAgICAgICAgICAgICAgIH0pKHRoaXMsIChlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZSkpLmNhbGwodGhpcywgdC50aW1lb3V0KSk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAobi5fYnVmZmVyID0ge30pLCAobi5fY2h1bmtTaXplID0gdC5jaHVua1NpemUpLCAobi5fc2VuZGVyID0gdC5zZW5kZXIpLCAobi5fbWF4U3RyaW5nQWxsb2MgPSB0Lm1heFN0cmluZ0FsbG9jIHx8IC0xKSwgbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIGUgJiYgbnVsbCAhPT0gZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2YgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgKHQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShlICYmIGUucHJvdG90eXBlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdHJ1Y3Rvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogITEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiAhMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiAhMCxcclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZSAmJiAoT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHQsIGUpIDogKHQuX19wcm90b19fID0gZSkpO1xyXG4gICAgICAgICAgICAgICAgICB9KShlLCB0KSxcclxuICAgICAgICAgICAgICAgICAgcihlLCBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAga2V5OiBcInNlbmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9IEpTT04uc3RyaW5naWZ5KHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobi5sZW5ndGggPD0gdGhpcy5fY2h1bmtTaXplKSB0aGlzLl9zZW5kZXIodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBlID0gbmV3IFVpbnQxNkFycmF5KHQubGVuZ3RoKSwgbiA9IDAsIHIgPSB0Lmxlbmd0aDsgbiA8IHI7IG4rKykgZVtuXSA9IHQuY2hhckNvZGVBdChuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pKG4pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb25jYXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBlID0gMCwgbiA9IEFycmF5KHQubGVuZ3RoKTsgZSA8IHQubGVuZ3RoOyBlKyspIG5bZV0gPSB0W2VdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5mcm9tKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKEFycmF5KDMwKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNilbM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbmRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImNodW5rX3N0YXJ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHVua0lkOiBpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogbi5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhKGZ1bmN0aW9uIHQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgdm9pZCAwICE9PSBhcmd1bWVudHNbMF0gPyBhcmd1bWVudHNbMF0gOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSByLnNsaWNlKG4sIG4gKyBlLl9jaHVua1NpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmxlbmd0aCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlLl9zZW5kZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJjaHVua19kYXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHVua0lkOiBpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogQXJyYXkuZnJvbShvKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQobiArIGUuX2NodW5rU2l6ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbmRlcih7IHR5cGU6IFwiY2h1bmtfZW5kXCIsIGNodW5rSWQ6IGkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiX21lc3NhZ2VSZWNlaXZlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNodW5rX3N0YXJ0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWNlaXZlTmV3Q2h1bmsodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY2h1bmtfZGF0YVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjZWl2ZUNodW5rRGF0YSh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjaHVua19lbmRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuID0gdGhpcy5fbWVyZ2VDaHVua3ModCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKGUucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZS5wcm90b3R5cGUpLCBcIl9tZXNzYWdlUmVjZWl2ZWRcIiwgdGhpcykuY2FsbCh0aGlzLCBuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKGUucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZS5wcm90b3R5cGUpLCBcIl9tZXNzYWdlUmVjZWl2ZWRcIiwgdGhpcykuY2FsbCh0aGlzLCB0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJfcmVjZWl2ZU5ld0NodW5rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChzKHQpLCB0aGlzLl9idWZmZXJbdC5jaHVua0lkXSkpIHRocm93IG5ldyBFcnJvcihcIlRoZXJlIHdhcyBhbHJlYWR5IGFuIGVudHJ5IGluIHRoZSBidWZmZXIgZm9yIGNodW5rSWQgXCIgKyB0LmNodW5rSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXJbdC5jaHVua0lkXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdC5jaHVua0lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNodW5rczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogdC5zaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJfcmVjZWl2ZUNodW5rRGF0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocyh0KSwgIXRoaXMuX2J1ZmZlclt0LmNodW5rSWRdKSkgdGhyb3cgbmV3IEVycm9yKFwiQ2h1bmtJZCBcIiArIHQuY2h1bmtJZCArIFwiIHdhcyBub3QgZm91bmQgaW4gdGhlIGJ1ZmZlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyW3QuY2h1bmtJZF0uY2h1bmtzLnB1c2godC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiX21lcmdlQ2h1bmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChzKHQpLCAhdGhpcy5fYnVmZmVyW3QuY2h1bmtJZF0pKSB0aHJvdyBuZXcgRXJyb3IoXCJDaHVua0lkIFwiICsgdC5jaHVua0lkICsgXCIgd2FzIG5vdCBmb3VuZCBpbiB0aGUgYnVmZmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IHRoaXMuX2J1ZmZlclt0LmNodW5rSWRdLmNodW5rcy5yZWR1Y2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuZm9yRWFjaChmdW5jdGlvbiAoZSwgbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodC51aW50QXJyYXlbdC5jdXJyZW50SXggKyBuXSA9IGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHQuY3VycmVudEl4ICs9IGUubGVuZ3RoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpbnRBcnJheTogbmV3IFVpbnQxNkFycmF5KHRoaXMuX2J1ZmZlclt0LmNodW5rSWRdLnNpemUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl4OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHIgPSAoZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtMSA9PT0gZSkgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBuID0gXCJcIiwgciA9IDA7IHIgPCB0Lmxlbmd0aDsgciArPSBlKSByICsgZSA+IHQubGVuZ3RoID8gKG4gKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCB0LnN1YmFycmF5KHIpKSkgOiAobiArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIHQuc3ViYXJyYXkociwgciArIGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KShlLnVpbnRBcnJheSwgdGhpcy5fbWF4U3RyaW5nQWxsb2MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG4gPSBKU09OLnBhcnNlKHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGEgdmFsaWQgSlNPTiBzdHJpbmc6IFwiICsgcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhLmlzVHJhbnNwb3J0TWVzc2FnZShuKSkgdGhyb3cgbmV3IEVycm9yKFwiTm90IGEgdHJhbnNwb3J0IG1lc3NhZ2U6IFwiICsgSlNPTi5zdHJpbmdpZnkobikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbjtcclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgICAgICAgIGVcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSkoby5HZW5lcmljQ2hhbm5lbCk7XHJcbiAgICAgICAgICAgIGUuQ2h1bmtlZENoYW5uZWwgPSB1O1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6ICEwIH0pLFxyXG4gICAgICAgICAgICAgIChlLmlzVHJhbnNwb3J0TWVzc2FnZSA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHQudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwicmVxdWVzdFwiOlxyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwicmVzcG9uc2VcIjpcclxuICAgICAgICAgICAgICAgICAgY2FzZSBcImVycm9yXCI6XHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJoYW5kbGVyX3VucmVnaXN0ZXJlZFwiOlxyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwiaGFuZGxlcl9yZWdpc3RlcmVkXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEwO1xyXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgdmFyIHIgPVxyXG4gICAgICAgICAgKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8XHJcbiAgICAgICAgICBmdW5jdGlvbiAodCwgZSwgbiwgcikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IChuIHx8IChuID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChpLCBvKSB7XHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24gYSh0KSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICB1KHIubmV4dCh0KSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgIG8odCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGZ1bmN0aW9uIHModCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgdShyLnRocm93KHQpKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKHQpIHtcclxuICAgICAgICAgICAgICAgICAgbyh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24gdSh0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZTtcclxuICAgICAgICAgICAgICAgIHQuZG9uZVxyXG4gICAgICAgICAgICAgICAgICA/IGkodC52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgOiAoKGUgPSB0LnZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICBlIGluc3RhbmNlb2YgblxyXG4gICAgICAgICAgICAgICAgICAgICAgPyBlXHJcbiAgICAgICAgICAgICAgICAgICAgICA6IG5ldyBuKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KSkudGhlbihhLCBzKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdSgociA9IHIuYXBwbHkodCwgZSB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGkgPVxyXG4gICAgICAgICAgICAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgIHZhciBuLFxyXG4gICAgICAgICAgICAgICAgcixcclxuICAgICAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgICAgICBvLFxyXG4gICAgICAgICAgICAgICAgYSA9IHtcclxuICAgICAgICAgICAgICAgICAgbGFiZWw6IDAsXHJcbiAgICAgICAgICAgICAgICAgIHNlbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoMSAmIGlbMF0pIHRocm93IGlbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlbMV07XHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHRyeXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICBvcHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgKG8gPSB7IG5leHQ6IHMoMCksIHRocm93OiBzKDEpLCByZXR1cm46IHMoMikgfSksXHJcbiAgICAgICAgICAgICAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJlxyXG4gICAgICAgICAgICAgICAgKG9bU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG9cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIGZ1bmN0aW9uIHMobykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IGE7KVxyXG4gICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgobiA9IDEpLCByICYmIChpID0gMiAmIG9bMF0gPyByLnJldHVybiA6IG9bMF0gPyByLnRocm93IHx8ICgoaSA9IHIucmV0dXJuKSAmJiBpLmNhbGwociksIDApIDogci5uZXh0KSAmJiAhKGkgPSBpLmNhbGwociwgb1sxXSkpLmRvbmUpKSByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICgoKHIgPSAwKSwgaSAmJiAobyA9IFsyICYgb1swXSwgaS52YWx1ZV0pLCBvWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhLmxhYmVsKyssIHsgdmFsdWU6IG9bMV0sIGRvbmU6ICExIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYS5sYWJlbCsrLCAociA9IG9bMV0pLCAobyA9IFswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobyA9IGEub3BzLnBvcCgpKSwgYS50cnlzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKChpID0gYS50cnlzKSwgKGkgPSBpLmxlbmd0aCA+IDAgJiYgaVtpLmxlbmd0aCAtIDFdKSB8fCAoNiAhPT0gb1swXSAmJiAyICE9PSBvWzBdKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDMgPT09IG9bMF0gJiYgKCFpIHx8IChvWzFdID4gaVswXSAmJiBvWzFdIDwgaVszXSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEubGFiZWwgPSBvWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICg2ID09PSBvWzBdICYmIGEubGFiZWwgPCBpWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhLmxhYmVsID0gaVsxXSksIChpID0gbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgJiYgYS5sYWJlbCA8IGlbMl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGEubGFiZWwgPSBpWzJdKSwgYS5vcHMucHVzaChvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpWzJdICYmIGEub3BzLnBvcCgpLCBhLnRyeXMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvID0gZS5jYWxsKHQsIGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAobyA9IFs2LCB0XSksIChyID0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuID0gaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDUgJiBvWzBdKSB0aHJvdyBvWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvWzBdID8gb1sxXSA6IHZvaWQgMCwgZG9uZTogITAgfTtcclxuICAgICAgICAgICAgICAgICAgfSkoW28sIHNdKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogITAgfSksIChlLkphdmFzY3JpcHRWaWV3ZXIgPSB2b2lkIDApO1xyXG4gICAgICAgIHZhciBvID0gbig2KSxcclxuICAgICAgICAgIGEgPSBuKDMpLFxyXG4gICAgICAgICAgcyA9IG4oMSksXHJcbiAgICAgICAgICB1ID0gbigxNSksXHJcbiAgICAgICAgICBjID0gbig0KSxcclxuICAgICAgICAgIGwgPSBuKDE2KSxcclxuICAgICAgICAgIGQgPSBuKDE3KSxcclxuICAgICAgICAgIGggPSBuKDApLFxyXG4gICAgICAgICAgZiA9IG4oMTgpLFxyXG4gICAgICAgICAgZyA9IG4oMjApLFxyXG4gICAgICAgICAgcCA9IHtcclxuICAgICAgICAgICAgbGljZW5zZTogXCJcIixcclxuICAgICAgICAgICAgbWFpbkltYWdlSWQ6IFwianN2LWltYWdlXCIsXHJcbiAgICAgICAgICAgIG1haW5Ib2xkZXJJZDogXCJqc3YtaG9sZGVyXCIsXHJcbiAgICAgICAgICAgIG1haW5JbWFnZVVybDogXCJcIixcclxuICAgICAgICAgICAgdG90YWxGcmFtZXM6IDcyLFxyXG4gICAgICAgICAgICBpbWFnZVVybHM6IFtdLFxyXG4gICAgICAgICAgICBzcGVlZDogODAsXHJcbiAgICAgICAgICAgIGluZXJ0aWE6IDIwLFxyXG4gICAgICAgICAgICBkZWZhdWx0UHJvZ3Jlc3NCYXI6ICEwLFxyXG4gICAgICAgICAgICBmaXJzdEltYWdlTnVtYmVyOiAxLFxyXG4gICAgICAgICAgICBpbWFnZVVybEZvcm1hdDogXCJcIixcclxuICAgICAgICAgICAgc3RhcnRGcmFtZU5vOiAxLFxyXG4gICAgICAgICAgICByZXZlcnNlOiAhMSxcclxuICAgICAgICAgICAgYXV0b1JvdGF0ZTogMCxcclxuICAgICAgICAgICAgYXV0b1JvdGF0ZVNwZWVkOiAwLFxyXG4gICAgICAgICAgICBhdXRvUm90YXRlUmV2ZXJzZTogITEsXHJcbiAgICAgICAgICAgIGVuYWJsZUltYWdlRXZlbnRzOiAhMSxcclxuICAgICAgICAgICAgem9vbTogITEsXHJcbiAgICAgICAgICAgIHpvb21XaGVlbFNwZWVkOiA1MCxcclxuICAgICAgICAgICAgem9vbU1heDogMixcclxuICAgICAgICAgICAgc3RvcEF0RWRnZXM6ICExLFxyXG4gICAgICAgICAgICBlbmFibGVDaGFuZ2VJbWFnZUV2ZW50OiAhMSxcclxuICAgICAgICAgICAgY3Vyc29yQ29uZmlnOiB7XHJcbiAgICAgICAgICAgICAgZGVmYXVsdDogXCJncmFiXCIsXHJcbiAgICAgICAgICAgICAgZHJhZzogXCJncmFiYmluZ1wiLFxyXG4gICAgICAgICAgICAgIHpvb21JbjogXCJ6b29tLWluXCIsXHJcbiAgICAgICAgICAgICAgem9vbU91dDogXCJ6b29tLW91dFwiLFxyXG4gICAgICAgICAgICAgIHBhbjogXCJtb3ZlXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvdWNoQ29uZmlnOiB7XHJcbiAgICAgICAgICAgICAgZGVmYXVsdDogXCJwYW4teVwiLFxyXG4gICAgICAgICAgICAgIGRyYWc6IFwicGFuLXlcIixcclxuICAgICAgICAgICAgICB6b29tSW46IFwicGFuLXhcIixcclxuICAgICAgICAgICAgICB6b29tT3V0OiBcInBhbi14XCIsXHJcbiAgICAgICAgICAgICAgcGFuOiBcInBhbi14XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGF1dG9DRE5SZXNpemVyOiAhMSxcclxuICAgICAgICAgICAgYXV0b0NETlJlc2l6ZXJDb25maWc6IHtcclxuICAgICAgICAgICAgICB1c2VXaWR0aDogITAsXHJcbiAgICAgICAgICAgICAgdXNlSGVpZ2h0OiAhMSxcclxuICAgICAgICAgICAgICBzY2FsZVdpdGhab29tTWF4OiAhMSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbm90aWZpY2F0aW9uQ29uZmlnOiB7XHJcbiAgICAgICAgICAgICAgZHJhZ1RvUm90YXRlOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93U3RhcnRUb1JvdGF0ZURlZmF1bHROb3RpZmljYXRpb246ICExLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgbWFpbkNvbG9yOiBcInJnYmEoMCwwLDAsMC4yMClcIixcclxuICAgICAgICAgICAgICAgIHRleHRDb2xvcjogXCJyZ2JhKDI0MywyMzcsMjM3LDAuODApXCIsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXh0cmFJbWFnZUNsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICBpZDogXCJcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBtID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gdChlKSB7XHJcbiAgICAgICAgICAgICAgKHRoaXMuaXNTdGFydGVkID0gITEpLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuaXNEcmFnZ2VkID0gITEpLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuaW1hZ2VzID0gW10pLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuY3VycmVudEltYWdlTnVtYmVyID0gMSksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5wcmV2aW91c0ltYWdlTnVtYmVyID0gMSksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5kZXNpcmVkUm90YXRpb25JbkRlZ3JlZXMgPSAwKSxcclxuICAgICAgICAgICAgICAgICh0aGlzLm1haW5JbWFnZSA9IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMubWFpbkhvbGRlckVsZW1lbnQgPSBudWxsKSxcclxuICAgICAgICAgICAgICAgICh0aGlzLnVuaXF1ZUlkID0gXCJcIiksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5jdXJyZW50RGVncmVlID0gMCksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5jdXJyZW50U3BlZWQgPSAwKSxcclxuICAgICAgICAgICAgICAgICh0aGlzLmluQW5pbWF0aW9uID0gITEpLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuZGVzaXJlZFJvdGF0aW9uSW5EZWdyZWVzU3RhcnRTbG93aW5nRG93biA9IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMudXNlRWFzaW5nID0gITApLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMudXBkYXRlSW5BY3Rpb24gPSAhMSksXHJcbiAgICAgICAgICAgICAgICAodGhpcy53aW5kb3cgPSBudWxsKSxcclxuICAgICAgICAgICAgICAgICh0aGlzLnN0YXJ0RHJhZ0ludm9jYXRpb25zID0gMCksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5maXJzdERyYWcgPSAhMSksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5zdGFuZGJ5UmVmcmVzaFJhdGUgPSA2MCksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5wcmV2aW91c1RhcmdldERlZ3JlZSA9IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMubkF1dG9Sb3RhdGlvbnMgPSAwKSxcclxuICAgICAgICAgICAgICAgICh0aGlzLmRyYWdBbGxvd2VkID0gITApLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuY3VycmVudFBvaW50ZXIgPSBcImRlZmF1bHRcIiksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5jdXJyZW50VG91Y2ggPSBcImRlZmF1bHRcIiksXHJcbiAgICAgICAgICAgICAgICAodGhpcy56b29tUG9pbnRlclRpbWVvdXQgPSBudWxsKSxcclxuICAgICAgICAgICAgICAgICh0aGlzLndhdGVybWFyayA9ICExKSxcclxuICAgICAgICAgICAgICAgICh0aGlzLndhdGVybWFyayA9ICEwKSxcclxuICAgICAgICAgICAgICAgICh0aGlzLnpvb20gPSBudWxsKSxcclxuICAgICAgICAgICAgICAgICh0aGlzLmV2ZW50QnVzID0gdC5pbml0RXZlbnRCdXMoKSksXHJcbiAgICAgICAgICAgICAgICAodGhpcy53aW5kb3cgPSBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiB3aW5kb3cgPyB3aW5kb3cgOiBudWxsKSxcclxuICAgICAgICAgICAgICAgICh0aGlzLm9wdGlvbnMgPSBlKSxcclxuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZ0luQnJvd3NlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdS5kZWZhdWx0LnByb3RvdHlwZS5waW5jaCA9IGYuRGVmYXVsdFpvb20ucHJvdG90eXBlLnBpbmNoO1xyXG4gICAgICAgICAgICB1LmRlZmF1bHQuZiA9IGY7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgKHQubG9hZENvbmZpZyA9IGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHIsIGkpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKCF0IHx8IHQubGVuZ3RoIDwgMTAgfHwgKCFlICYmIG4gJiYgXCJmaWxlOlwiICE9PSBuKSkgcih7IGNvbmZpZzogXCJcIiwgd2F0ZXJtYXJrOiAhMCB9KTtcclxuICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG8gPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSxcclxuICAgICAgICAgICAgICAgICAgICAgIGEgPSBcImh0dHBzOi8vY29uZmlnLjNkd2ViLmlvL1wiICsgKHQgPSBudWxsID09IHQgPyB2b2lkIDAgOiB0LnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgKG8ub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKDQgPT09IHRoaXMucmVhZHlTdGF0ZSAmJiAyMDAgPT09IHRoaXMuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudWxsICE9PSBlLmNvbmZpZykgcmV0dXJuIHIoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkobmV3IEVycm9yKFwiY291bGQgbm90IGZpbmQgYSBwcmVzZW50YXRpb24gd2l0aCBpZCBcIiArIHQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoMCAhPT0gdGhpcy5zdGF0dXMgJiYgMjAwICE9PSB0aGlzLnN0YXR1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaShuZXcgRXJyb3IoXCJjb3VsZCBub3QgZmluZCBhIHByZXNlbnRhdGlvbiB3aXRoIGlkIFwiICsgdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKG5ldyBFcnJvcihcInlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gcHJlc2VudGF0aW9uIHdpdGggaWQgXCIgKyB0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaShuZXcgRXJyb3IoXCJjb3VsZCBub3QgbG9hZCBwcmVzZW50YXRpb24gd2l0aCBpZCBcIiArIHQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgby5vcGVuKFwiR0VUXCIsIGEsICEwKSxcclxuICAgICAgICAgICAgICAgICAgICAgIG8uc2V0UmVxdWVzdEhlYWRlcihcIjNkd2ViLWhvc3RcIiwgZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICBvLnNlbmQoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQuaW5pdEV2ZW50QnVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGMuY3JlYXRlRXZlbnRCdXMoeyBldmVudHM6IGwuZGVmYXVsdCwgY2hhbm5lbHM6IFtdIH0pO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5ydW5uaW5nSW5Ccm93c2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIHdpbmRvdztcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuZXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRCdXM7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLnNldFNwZWVkID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNwZWVkID0gdCA+IDk5OSB8fCB0IDwgLTk5OSA/IDk5OSA6IHQ7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLnNldElkID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICh0aGlzLm9wdGlvbnMuaWQgPSB0KSxcclxuICAgICAgICAgICAgICAgICAgKHRoaXMub3B0aW9ucy5pbWFnZVVybHMgPSBbXSksXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcih0KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuc2V0SW5lcnRpYSA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW5lcnRpYSA9IHQgPiA5OSA/IDk5IDogdCA8IDEgPyAxIDogdDtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuaW5pdFByb2dyZXNzQmFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWZhdWx0UHJvZ3Jlc3NCYXIpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm1haW5JbWFnZUlkICYmIG8uSW1hZ2VzLmJsdXJNYWluSW1hZ2UodGhpcy5vcHRpb25zLm1haW5JbWFnZUlkLCB0aGlzLndpbmRvdyk7XHJcbiAgICAgICAgICAgICAgICAgIHZhciB0ID0gby5JbWFnZXMuY3JlYXRlUHJvZ3Jlc3NCYXIodGhpcy51bmlxdWVJZCwgdGhpcy53aW5kb3csIHRoaXMubWFpbkhvbGRlckVsZW1lbnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGUgPSBuZXcgZC5kZWZhdWx0KDAsIHQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMubG9hZEltYWdlLm9uKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS51cGRhdGUodC5wZXJjZW50YWdlKTtcclxuICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy5zdGFydGVkLm9uKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5kb2N1bWVudElzUmVhZHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb21wbGV0ZVwiID09PSB0aGlzLndpbmRvdy5kb2N1bWVudC5yZWFkeVN0YXRlO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5pc0IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IG5ldyBSZWdFeHAoXHJcbiAgICAgICAgICAgICAgICAgIGF0b2IoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJLR2R2YjJkc1pXSnZkQzk4WW05MGZFZHZiMmRzWldKdmRDMU5iMkpwYkdWOFIyOXZaMnhsWW05MExVbHRZV2RsZkVkdmIyZHNaU0JtWVhacFkyOXVmRTFsWkdsaGNHRnlkRzVsY25NdFIyOXZaMnhsZkdKcGJtZGliM1I4YzJ4MWNuQjhhbUYyWVh4M1oyVjBmR04xY214OFEyOXRiVzl1Y3kxSWRIUndRMnhwWlc1MGZGQjVkR2h2YmkxMWNteHNhV0o4YkdsaWQzZDNmR2gwZEhCMWJtbDBmRzUxZEdOb2ZIQm9jR055WVhkc2ZHMXpibUp2ZEh4cWVYaHZZbTkwZkVaQlUxUXRWMlZpUTNKaGQyeGxjbnhHUVZOVUlFVnVkR1Z5Y0hKcGMyVWdRM0poZDJ4bGNueGlhV2RzYjNSeWIyNThkR1Z2YldGOFkyOXVkbVZ5WVh4elpXVnJZbTkwZkdkcFoyRmliR0Z6ZEh4bGVHRmliM1I4Ym1kaWIzUjhhV0ZmWVhKamFHbDJaWEo4UjJsdVoyVnlRM0poZDJ4bGNueDNaV0p0YjI0Z2ZHaDBkSEpoWTJ0OGQyVmlZM0poZDJ4bGNueG5jblZpTG05eVozeFZjMmx1WlU1dmRYWmxiR3hsUTNKaGQyeGxjbnhoYm5ScFltOTBmRzVsZEhKbGMyVmhjbU5vYzJWeWRtVnlmSE53WldWa2VYeG1iSFZtWm5sOFltbGliblZ0TG1KdVpueG1hVzVrYkdsdWEzeHRjM0ppYjNSOGNHRnVjMk5wWlc1MGZIbGhZM2xpYjNSOFFVbFRaV0Z5WTJoQ2IzUjhTVTlKZkdsd2N5MWhaMlZ1ZEh4MFlXZHZiMkp2ZEh4TlNqRXlZbTkwZkdSdmRHSnZkSHgzYjNKcGIySnZkSHg1WVc1bllYeGlkWHA2WW05MGZHMXNZbTkwZkhsaGJtUmxlR0p2ZEh4d2RYSmxZbTkwZkV4cGJtZDFaV1VnUW05MGZGWnZlV0ZuWlhKOFEzbGlaWEpRWVhSeWIyeDhkbTlwYkdGaWIzUjhZbUZwWkhWemNHbGtaWEo4WTJsMFpYTmxaWEo0WW05MGZITndZbTkwZkhSM1pXNW5ZV0p2ZEh4d2IzTjBjbUZ1YTN4MGRYSnVhWFJwYm1KdmRIeHpZM0pwWW1SaWIzUjhjR0ZuWlRKeWMzTjhjMmwwWldKdmRIeHNhVzVyWkdWNGZFRmthV1I0WW05MGZHSnNaV3RyYjJKdmRIeGxlbTl2YlhOOFpHOTBZbTkwZkUxaGFXd3VVbFZmUW05MGZHUnBjMk52WW05MGZHaGxjbWwwY21sNGZHWnBibVIwYUdGMFptbHNaWHhsZFhKdmNHRnlZMmhwZG1VdWIzSm5mRTVsY21SQ2VVNWhkSFZ5WlM1Q2IzUjhjMmx6ZEhKcGVDQmpjbUYzYkdWeWZHRm9jbVZtYzJKdmRIeEJZbTkxYm1SbGVIeGtiMjFoYVc1amNtRjNiR1Z5ZkhkaWMyVmhjbU5vWW05MGZITjFiVzFwWm5sOFkyTmliM1I4WldScGMzUmxjbUp2ZEh4elpYcHVZVzFpYjNSOFpXTXliR2x1YTJacGJtUmxjbnhuYzJ4bVltOTBmR0ZwYUdsMFltOTBmR2x1ZEdWc2FYVnRYMkp2ZEh4bVlXTmxZbTl2YTJWNGRHVnlibUZzYUdsMGZIbGxkR2w4VW1WMGNtVjJiMUJoWjJWQmJtRnNlWHBsY254c1lpMXpjR2xrWlhKOGMyOW5iM1Y4YkhOelltOTBmR05oY21WbGNtSnZkSHgzYjNSaWIzaDhkMjlqWW05MGZHbGphR2x5YjN4RWRXTnJSSFZqYTBKdmRIeHNjM055YjJOclpYUmpjbUYzYkdWeWZHUnlkWEJoWTNSOGQyVmlZMjl0Y0dGdWVXTnlZWGRzWlhKOFlXTnZiMjVpYjNSOGIzQmxibWx1WkdWNGMzQnBaR1Z5ZkdkdVlXMGdaMjVoYlNCemNHbGtaWEo4ZDJWaUxXRnlZMmhwZG1VdGJtVjBMbU52YlM1aWIzUjhZbUZqYTJ4cGJtdGpjbUYzYkdWeWZHTnZZMk52WTN4cGJuUmxaM0p2YldWa1lueGpiMjUwWlc1MElHTnlZWGRzWlhJZ2MzQnBaR1Z5ZkhSdmNHeHBjM1JpYjNSOGMyVnZhMmxqYTNNdGNtOWliM1I4YVhReWJXVmthV0V0Wkc5dFlXbHVMV055WVhkc1pYSjhhWEF0ZDJWaUxXTnlZWGRzWlhJdVkyOXRmSE5wZEdWbGVIQnNiM0psY2k1cGJtWnZmR1ZzYVhOaFltOTBmSEJ5YjNocGJXbGpmR05vWVc1blpXUmxkR1ZqZEdsdmJueGliR1Y0WW05MGZHRnlZV0p2ZEh4WFpWTkZSVHBUWldGeVkyaDhibWxyYVMxaWIzUjhRM0o1YzNSaGJGTmxiV0Z1ZEdsamMwSnZkSHh5YjJkbGNtSnZkSHd6TmpCVGNHbGtaWEo4Y0hOaWIzUjhTVzUwWlhKbVlYaFRZMkZ1UW05MGZFeHBjSEJsY21obGVTQlRSVThnVTJWeWRtbGpaWHhEUXlCTlpYUmhaR0YwWVNCVFkyRndaWEo4WnpBd1p6RmxMbTVsZEh4SGNtRndaWE5vYjNSRGNtRjNiR1Z5ZkhWeWJHRndjR1Z1WkdKdmRIeGljbUZwYm05aWIzUjhabkl0WTNKaGQyeGxjbnhpYVc1c1lYSjhVMmx0Y0d4bFEzSmhkMnhsY254TWFYWmxiR0Z3WW05MGZGUjNhWFIwWlhKaWIzUjhZMWhsYm5ObFltOTBmSE50ZEdKdmRIeGlibVl1Wm5KZlltOTBmRUUyTFVsdVpHVjRaWEo4UVVSdFlXNTBXSHhHWVdObFltOTBmRlIzYVhSMFpYSmliM1I4VDNKaGJtZGxRbTkwZkcxbGJXOXllV0p2ZEh4QlpIWkNiM1I4VFdWbllVbHVaR1Y0ZkZObGJXRnVkR2xqVTJOb2IyeGhja0p2ZEh4c2RIZzNNWHh1WlhKa2VXSnZkSHg0YjNacFltOTBmRUpWWW1sT1IzeFJkMkZ1ZEdsbWVYeGhjbU5vYVhabExtOXlaMTlpYjNSOFFYQndiR1ZpYjNSOFZIZGxaWFJ0WlcxbFFtOTBmR055WVhkc1pYSTBhbnhtYVc1a2VHSnZkSHhUWlcxeWRYTm9RbTkwZkhsdmIzcENiM1I4Ykdsd2NHVnlhR1Y1ZkhraGFpMWhjM0o4Ukc5dFlXbHVJRkpsTFVGdWFXMWhkRzl5SUVKdmRIeEJaR1JVYUdsektRPT1cIlxyXG4gICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICBcImlcIlxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgZSA9IHRoaXMud2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdC50ZXN0KGUpO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5pc0xvY2FsaG9zdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy53aW5kb3cubG9jYXRpb24uaG9zdG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgIGUgPSB0aGlzLndpbmRvdy5sb2NhdGlvbi5wb3J0O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW4oLTEgIT09IHQuaW5kZXhPZihcImRldi5cIikgfHwgLTEgIT09IHQuaW5kZXhPZihcImJldGEuXCIpIHx8IC0xICE9PSB0LmluZGV4T2YoXCJmaWxlXCIpIHx8IFwiXCIgIT09IGUgfHwgXCJsb2NhbGhvc3RcIiA9PT0gdCB8fCBcIls6OjFdXCIgPT09IHQgfHwgdC5tYXRjaCgvXjEyNyg/OlxcLig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPykpezN9JC8pKTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuaXNWID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pZCkgcmV0dXJuICF0aGlzLndhdGVybWFyaztcclxuICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy53aW5kb3cubG9jYXRpb24uaG9zdDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnLkhlbHBlci5pc1ZhbGlkKHRoaXMub3B0aW9ucy5saWNlbnNlLCB0KTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuZ2V0Rmlyc3RJbWFnZUluZGV4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maXJzdEltYWdlTnVtYmVyICYmIHRoaXMub3B0aW9ucy5maXJzdEltYWdlTnVtYmVyID4gMCAmJiB0aGlzLm9wdGlvbnMuZmlyc3RJbWFnZU51bWJlciAtIDEgPCB0aGlzLmltYWdlcy5sZW5ndGggPyB0aGlzLm9wdGlvbnMuZmlyc3RJbWFnZU51bWJlciAtIDEgOiAwO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJblZpZXdPYnNlcnZlcikge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmlzSW5WaWV3T2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5pc0luVmlld09ic2VydmVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPdXRPZlZpZXdPYnNlcnZlcikge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmlzT3V0T2ZWaWV3T2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5pc091dE9mVmlld09ic2VydmVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gaSh0aGlzLCBmdW5jdGlvbiAobikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbmV3IFByb21pc2UoZnVuY3Rpb24gKG4sIHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5pc1N0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gZS53aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS51bmlxdWVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGkgJiYgYS5Eb21VdGlsaXRpZXMucmVtb3ZlRWxlbWVudChpKSwgZS5vcHRpb25zLmRlZmF1bHRQcm9ncmVzc0JhcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG8gPSBlLndpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRlcl9cIiArIGUudW5pcXVlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLkRvbVV0aWxpdGllcy5yZW1vdmVFbGVtZW50KG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IGUud2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlua19cIiArIGUudW5pcXVlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLkRvbVV0aWxpdGllcy5yZW1vdmVFbGVtZW50KHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUub3B0aW9ucy5ub3RpZmljYXRpb25Db25maWcuZHJhZ1RvUm90YXRlLnNob3dTdGFydFRvUm90YXRlRGVmYXVsdE5vdGlmaWNhdGlvbiB8fCBlLm9wdGlvbnMubm90aWZpY2F0aW9uQ29uZmlnLmRyYWdUb1JvdGF0ZS5pbWFnZVVybC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1ID0gZS53aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub3RpZmljYXRpb25fXCIgKyBlLnVuaXF1ZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYS5Eb21VdGlsaXRpZXMucmVtb3ZlRWxlbWVudCh1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEuRG9tVXRpbGl0aWVzLnNob3dJbWFnZShlLm1haW5JbWFnZSwgZS53aW5kb3cpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyplLm1haW5Ib2xkZXJFbGVtZW50Lm91dGVySFRNTCA9IGUubWFpbkhvbGRlckVsZW1lbnQub3V0ZXJIVE1MLCovIChlLmlzU3RhcnRlZCA9ICExKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGUuaW1hZ2VzID0gW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZS5tYWluSW1hZ2UgPSBudWxsKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGUubWFpbkhvbGRlckVsZW1lbnQgPSBudWxsKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGUuZmlyc3REcmFnID0gITEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZS5ldmVudEJ1cyA9IHQuaW5pdEV2ZW50QnVzKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuKCEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgbighMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IFwiZXJyb3Igd2l0aCBkZXN0cm95aW5nIHZpZXdlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHQgaW5zdGFuY2VvZiBFcnJvciAmJiAoYyArPSB0LnRvU3RyaW5nKCkpLCByKGMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5WaWV3UGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm11c3RFeGVjdXRlT25WaWV3UmVzdW1lZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uVmlld1Jlc3VtZWQgPSBmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLm11c3RFeGVjdXRlT25WaWV3UmVzdW1lZCA9IHJlc29sdmU7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VIb2xkZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5vcHRpb25zLm1haW5Ib2xkZXJJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzSW5WaWV3T2JzZXJ2ZXIgPSBpc0luVmlldyhpbWFnZUhvbGRlckVsZW1lbnQsIHRhcmdldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmUgPSB0aGlzLm11c3RFeGVjdXRlT25WaWV3UmVzdW1lZDtcclxuICAgICAgICAgICAgICAgICAgaWYgKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm11c3RFeGVjdXRlT25WaWV3UmVzdW1lZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCAxKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB0aGlzLmluVmlld1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3V0T2ZWaWV3T2JzZXJ2ZXIgPSBpc091dE9mVmlldyhpbWFnZUhvbGRlckVsZW1lbnQsIHRhcmdldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW5WaWV3UGF1c2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gaSh0aGlzLCBmdW5jdGlvbiAobikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAobi5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb2N1bWVudElzUmVhZHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gWzMsIDJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFByb21pc2UoZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbi5zZW50KCksIFszLCAzXTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChuLCByKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGUud2luZG93LmxvY2F0aW9uLmhvc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSBlLndpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZS5vcHRpb25zKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZS5vcHRpb25zID0gcy5tZXJnZURlZXAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiBbcCwgZS5vcHRpb25zXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5vcHRpb25zLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubG9hZENvbmZpZyhlLm9wdGlvbnMuaWQsIGksIG8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLndhdGVybWFyayA9IHQud2F0ZXJtYXJrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IEpTT04ucGFyc2UodC5jb25maWcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZS5vcHRpb25zID0gcy5tZXJnZURlZXAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IFtwLCBpLCBhXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlLmN1cnJlbnRTcGVlZCA9IGUub3B0aW9ucy5zcGVlZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGUub3B0aW9ucy50b3RhbEZyYW1lcyA9IGUuZ2V0VG90YWxGcmFtZXMoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdGFydFByZXNlbnRhdGlvbigpLnRoZW4obikuY2F0Y2gocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuaGFuZGxlRXJyb3IodCwgcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKChlLmN1cnJlbnRTcGVlZCA9IGUub3B0aW9ucy5zcGVlZCksIChlLm9wdGlvbnMudG90YWxGcmFtZXMgPSBlLmdldFRvdGFsRnJhbWVzKCkpLCBlLnN0YXJ0UHJlc2VudGF0aW9uKCkudGhlbihuKS5jYXRjaChyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5zdGFydFByZXNlbnRhdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGkodGhpcywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgMixcclxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChlLCBuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHQuaXNTdGFydGVkICYmIG4oXCJWaWV3ZXIgXCIgKyB0LnVuaXF1ZUlkICsgXCIgYWxyZWFkeSBzdGFydGVkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0LnJ1bm5pbmdJbkJyb3dzZXIoKSB8fCBuKFwiVmlld2VyIFwiICsgdC51bmlxdWVJZCArIFwiIG5vdCBzdGFydGVkIGluIGJyb3dzZXJcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEuRG9tVXRpbGl0aWVzLmFkZFN0eWxlcyh0LndpbmRvdyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQucmVnaXN0ZXJTdGFydEV2ZW50cygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0LnJlZ2lzdGVySW5wdXRFdmVudHMoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHQubWFpbkltYWdlID0gdC5vcHRpb25zLm1haW5JbWFnZSA9IG8uSW1hZ2VzLmdldE1haW5JbWFnZSh0Lm9wdGlvbnMubWFpbkltYWdlSWQsIHQud2luZG93KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0Lm1haW5JbWFnZS5pbWcuc3R5bGUuekluZGV4ID0gMiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0Lm1haW5Ib2xkZXJFbGVtZW50ID0gYS5Eb21VdGlsaXRpZXMuZ2V0TWFpbkhvbGRlckVsZW1lbnQodC5vcHRpb25zLm1haW5Ib2xkZXJJZCwgdC53aW5kb3csIHQuaXNCKCksIHQuaXNMb2NhbGhvc3QoKSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhdC5pc0IoKSB8fCB0LmlzTG9jYWxob3N0KCkgfHwgdC5pc1YoKSB8fCBhLkRvbVV0aWxpdGllcy5jcmVhdGVMaW5rKHQud2luZG93LCB0Lm1haW5Ib2xkZXJFbGVtZW50KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIXQuaXNWKCkgJiYgIXQuaXNMb2NhbGhvc3QoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0Lm9wdGlvbnMubm90aWZpY2F0aW9uQ29uZmlnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodS5kcmFnVG9Sb3RhdGUubWFpbkNvbG9yID0gXCJyZ2IoMjU1ICwyNTUsMjU1KVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHUuZHJhZ1RvUm90YXRlLnRleHRDb2xvciA9IFwicmdiKDU1LCAyNSwgMilcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuZXZlbnRCdXMuc3RhcnREcmFnZ2luZy5vbihmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLmludm9jYXRpb25zID49IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0LnBidG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG4gPSBvLkltYWdlcy5jcmVhdGVPckdldFBvd2VyZWRCeSh1LCB0LnVuaXF1ZUlkLCB0LndpbmRvdywgdC5tYWluSG9sZGVyRWxlbWVudCwgdC5pc0xvY2FsaG9zdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgIT09IG4gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHQucGJ0byA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEuRG9tVXRpbGl0aWVzLmFkZEhpZGRlblN0eWxlKG4uaWQsIHQud2luZG93LCAzZTMpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYS5Eb21VdGlsaXRpZXMucmVtb3ZlRWxlbWVudChuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgNWUzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKHQudW5pcXVlSWQgPSB0LnVuaXF1ZUlkIHx8IHMuZ2V0UmFuZG9tSWQoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodC5pbWFnZUhvbGRlckVsZW1lbnQgPSBhLkRvbVV0aWxpdGllcy5nZXRJbWFnZUhvbGRlckVsZW1lbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQud2luZG93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Lm1haW5Ib2xkZXJFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0LnVuaXF1ZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXSwgLy9vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Lm9wdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5tYWluSG9sZGVyRWxlbWVudC5hcHBlbmRDaGlsZCh0LmltYWdlSG9sZGVyRWxlbWVudCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0LmluaXRQcm9ncmVzc0JhcigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0SW1hZ2VzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmZvckVhY2goaSA9PiAoaS5pbWcub25sb2FkID0gbnVsbCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByKHQsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaSh0aGlzLCBmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmltYWdlcyA9IG8pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZUltYWdlSG9sZGVyKHRoaXMuaW1hZ2VIb2xkZXJFbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEuRG9tVXRpbGl0aWVzLmhpZGVJbWFnZVNsb3coci5tYWluSW1hZ2UuaWQsIHIud2luZG93KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobmF2aWdhdG9yLmlzV2Via2l0ID8gXCIxXCIgOiBvLmZvckVhY2goKG8sIGkpID0+IChvLmltZy5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSBpID4gMCA/IFwibm9uZVwiIDogXCJibG9ja1wiKSkgfHwgMSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICEoci5tYWluSW1hZ2UuaW1nLnN0eWxlLnpJbmRleCA9IDApICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyYmIChyLmltYWdlSG9sZGVyRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwidmlzaWJsZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8mJiAoci5pbWFnZUhvbGRlckVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJ25vbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHIuaW1hZ2VIb2xkZXJFbGVtZW50LnN0eWxlLnpJbmRleCA9IFwiMVwiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHIuaW1hZ2VIb2xkZXJFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmluQW5pbWF0aW9uIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGEuRG9tVXRpbGl0aWVzLnNob3dJbWFnZShyLmltYWdlc1tyLmdldEZpcnN0SW1hZ2VJbmRleCgpXSwgci53aW5kb3cpLCAoci5jdXJyZW50SW1hZ2VOdW1iZXIgPSByLm9wdGlvbnMuZmlyc3RJbWFnZU51bWJlciB8fCAxKSwgKHIucHJldmlvdXNJbWFnZU51bWJlciA9IHIub3B0aW9ucy5maXJzdEltYWdlTnVtYmVyIHx8IDEpLCByLnNldEN1cnJlbnREZWdyZWUoci5jdXJyZW50SW1hZ2VOdW1iZXIpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoci5pc1N0YXJ0ZWQgPSAhMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgci5ldmVudEJ1cy5zdGFydGVkKCEwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuaGFuZGxlRXJyb3IodCwgbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmhhbmRsZUVycm9yKHQsIG4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWzJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5oYW5kbGVFcnJvcihlLCBuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0LmhhbmRsZUVycm9yKGUsIG4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5oYW5kbGVFcnJvciA9IGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbiA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgIHIgPSBcInVua25vd24gZXJyb3JcIjtcclxuICAgICAgICAgICAgICAgIHQgaW5zdGFuY2VvZiBFcnJvciAmJlxyXG4gICAgICAgICAgICAgICAgICAoKHIgPSB0LnRvU3RyaW5nKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVwb3J0RXJyb3IociksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZSh0LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuICYmIG4ucmVwb3J0RXJyb3IodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgICAgICAgIGUocik7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLnJlZ2lzdGVySW5wdXRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnBpbmNoLm9uKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0Lm9uUGluY2hMaXN0ZW5lcihlKTtcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLmRvdWJsZUNsaWNrLm9uKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQub25Eb3VibGVDbGlja0xpc3RlbmVyKGUpO1xyXG4gICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy56b29tQ2hhbmdlZC5vbihmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0Lm9uWm9vbUNoYW5nZWRMaXN0ZW5lcihlKTtcclxuICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMuc2Nyb2xsLm9uKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdC5vblNjcm9sbExpc3RlbmVyKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHQub25ab29tQ2hhbmdlZChlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuc3RhcnREcmFnVG9Sb3RhdGVOb3RpZmljYXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBvLkltYWdlcy5jcmVhdGVSZWFkeU5vdGlmaWNhdGlvbih0aGlzLm9wdGlvbnMubm90aWZpY2F0aW9uQ29uZmlnLCB0aGlzLnVuaXF1ZUlkLCB0aGlzLndpbmRvdywgdGhpcy5tYWluSG9sZGVyRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLmhpZGVEcmFnVG9Sb3RhdGVOb3RpZmljYXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCksXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy56b29tICYmIHRoaXMuem9vbVVuc3Vic2NyaWJlKCksXHJcbiAgICAgICAgICAgICAgICAgIG8uSW1hZ2VzLmhpZGVSZWFkeU5vdGlmaWNhdGlvbih0aGlzLm9wdGlvbnMubm90aWZpY2F0aW9uQ29uZmlnLCB0aGlzLnVuaXF1ZUlkLCB0aGlzLndpbmRvdykudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSB0LndpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vdGlmaWNhdGlvbl9cIiArIHQudW5pcXVlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGEuRG9tVXRpbGl0aWVzLnJlbW92ZUVsZW1lbnQoZSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5yZWdpc3RlclN0YXJ0RXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgKHRoaXMub3B0aW9ucy5ub3RpZmljYXRpb25Db25maWcuZHJhZ1RvUm90YXRlLnNob3dTdGFydFRvUm90YXRlRGVmYXVsdE5vdGlmaWNhdGlvbiB8fCB0aGlzLm9wdGlvbnMubm90aWZpY2F0aW9uQ29uZmlnLmRyYWdUb1JvdGF0ZS5pbWFnZVVybC5sZW5ndGggPiAwKSAmJlxyXG4gICAgICAgICAgICAgICAgICAodGhpcy5ldmVudEJ1cy5zdGFydGVkLm9uKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5zdGFydERyYWdUb1JvdGF0ZU5vdGlmaWNhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy51bnN1YnNjcmliZSA9IHRoaXMuZXZlbnRCdXMuc3RhcnREcmFnZ2luZy5vbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5oaWRlRHJhZ1RvUm90YXRlTm90aWZpY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy56b29tICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKCh0aGlzLnpvb21VbnN1YnNjcmliZSA9IHRoaXMuZXZlbnRCdXMucGluY2gub24oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuaGlkZURyYWdUb1JvdGF0ZU5vdGlmaWNhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgICAgICAgICAgICh0aGlzLnpvb21VbnN1YnNjcmliZSA9IHRoaXMuZXZlbnRCdXMuc2Nyb2xsLm9uKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuaGlkZURyYWdUb1JvdGF0ZU5vdGlmaWNhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSkpKSksXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy56b29tICYmXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMuc3RhcnRlZC5vbihmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0LnJlZ2lzdGVyWm9vbShlKTtcclxuICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hdXRvUm90YXRlID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnN0YXJ0ZWQub24oZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5ydW5BdXRvUm90YXRlKGUpO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUucnVuQXV0b1JvdGF0ZSA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB0XHJcbiAgICAgICAgICAgICAgICAgID8gdGhpcy5hdXRvUm90YXRlKHRoaXMub3B0aW9ucy5hdXRvUm90YXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBlLmV2ZW50QnVzLmVuZEF1dG9Sb3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RGVncmVlOiBlLmN1cnJlbnREZWdyZWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbWFnZTogZS5pbWFnZXNbZS5jdXJyZW50SW1hZ2VOdW1iZXIgLSAxXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkOiB0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGUucmVwb3J0RXJyb3IodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgOiB0aGlzLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGUucmVwb3J0V2FybmluZyhcIkZhaWxlZCBzdGFydGluZyBhdXRvcm90YXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5yZXBvcnRFcnJvcih0KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUucmVnaXN0ZXJab29tID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHQgJiYgKHRoaXMuem9vbSA9IG5ldyBmLkRlZmF1bHRab29tKHRoaXMud2luZG93LCB0aGlzLmltYWdlcywgdGhpcy5tYWluSG9sZGVyRWxlbWVudCwgdGhpcy5vcHRpb25zLnpvb21NYXgpKTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUub25QaW5jaExpc3RlbmVyID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlLFxyXG4gICAgICAgICAgICAgICAgICBuID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy56b29tICYmXHJcbiAgICAgICAgICAgICAgICAgICgodGhpcy5kcmFnQWxsb3dlZCA9ICExKSxcclxuICAgICAgICAgICAgICAgICAgICBudWxsID09PSAoZSA9IHRoaXMuem9vbSkgfHwgdm9pZCAwID09PSBlIHx8IGUucGluY2godCwgdGhpcy5pbWFnZXNbdGhpcy5jdXJyZW50SW1hZ2VOdW1iZXIgLSAxXSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuLmRyYWdBbGxvd2VkID0gITA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMWUzKSk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLm9uWm9vbUNoYW5nZWRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBlLCBuO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLm9wdGlvbnMuem9vbSAmJiAobnVsbCA9PT0gKGUgPSB0aGlzLnpvb20pIHx8IHZvaWQgMCA9PT0gZSA/IHZvaWQgMCA6IGUuaXNab29tZWQoKSkgJiYgKG51bGwgPT09IChuID0gdGhpcy56b29tKSB8fCB2b2lkIDAgPT09IG4gfHwgbi5yZXNldCh0aGlzLmltYWdlc1t0aGlzLmN1cnJlbnRJbWFnZU51bWJlciAtIDFdKSwgdGhpcy5zZXRQb2ludGVyKFwiZGVmYXVsdFwiKSk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLm9uRG91YmxlQ2xpY2tMaXN0ZW5lciA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSwgbjtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy56b29tICYmIChudWxsID09PSAoZSA9IHRoaXMuem9vbSkgfHwgdm9pZCAwID09PSBlID8gdm9pZCAwIDogZS5pc1pvb21lZCgpKSAmJiAobnVsbCA9PT0gKG4gPSB0aGlzLnpvb20pIHx8IHZvaWQgMCA9PT0gbiB8fCBuLnJlc2V0KHRoaXMuaW1hZ2VzW3RoaXMuY3VycmVudEltYWdlTnVtYmVyIC0gMV0pLCB0aGlzLnNldFBvaW50ZXIoXCJkZWZhdWx0XCIpKTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUub25TY3JvbGxMaXN0ZW5lciA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSxcclxuICAgICAgICAgICAgICAgICAgbixcclxuICAgICAgICAgICAgICAgICAgciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnpvb20pIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxDdXJyZW50QWN0aW9ucygpLCB0aGlzLnpvb21Qb2ludGVyVGltZW91dCAmJiBjbGVhclRpbWVvdXQodGhpcy56b29tUG9pbnRlclRpbWVvdXQpLCBudWxsID09PSAoZSA9IHRoaXMuem9vbSkgfHwgdm9pZCAwID09PSBlIHx8IGUuc2Nyb2xsKHQsIHRoaXMub3B0aW9ucy56b29tV2hlZWxTcGVlZCwgdGhpcy5pbWFnZXNbdGhpcy5jdXJyZW50SW1hZ2VOdW1iZXIgLSAxXSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBpID0gdC5vcmlnaW5hbEV2ZW50LmRlbHRhWTtcclxuICAgICAgICAgICAgICAgICAgKG51bGwgPT09IChuID0gdGhpcy56b29tKSB8fCB2b2lkIDAgPT09IG4gPyB2b2lkIDAgOiBuLmlzWm9vbWVkKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgPyAoaSA8IDAgPyB0aGlzLnNldFBvaW50ZXIoXCJ6b29tSW5cIikgOiB0aGlzLnNldFBvaW50ZXIoXCJ6b29tT3V0XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgKHRoaXMuem9vbVBvaW50ZXJUaW1lb3V0ID0gdGhpcy53aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIuc2V0UG9pbnRlcihcInBhblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0sIDUwMCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5zZXRQb2ludGVyKFwiZGVmYXVsdFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUucHJlcGFyZUltYWdlSG9sZGVyID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBlLFxyXG4gICAgICAgICAgICAgICAgICAgIG4sXHJcbiAgICAgICAgICAgICAgICAgICAgbyxcclxuICAgICAgICAgICAgICAgICAgICBzLFxyXG4gICAgICAgICAgICAgICAgICAgIGMsXHJcbiAgICAgICAgICAgICAgICAgICAgbCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBpKHRoaXMsIGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgIChlID0gW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgKG4gPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcihsLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaSh0aGlzLCBmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFByb21pc2UoZnVuY3Rpb24gKHIsIGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBvID0gW10sIGEgPSAwOyBhIDwgdC5sZW5ndGg7IGErKykgby5wdXNoKGUuY2FsbChuLCB0W2FdLCBhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwobylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaSh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAobyA9IGZ1bmN0aW9uIChuLCByKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChsLm9wdGlvbnMuem9vbSB8fCBsLm9wdGlvbnMuZW5hYmxlSW1hZ2VFdmVudHMpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8qTEFVIGwuYWRkWm9vbUV2ZW50cyhuKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBsLmFkZFpvb21FdmVudHMobik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHVzaChuKSwgKGwuaW1hZ2VzW3JdLmVuY29kZWQgPSBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8qTEFVdC5hcHBlbmRDaGlsZChuKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgKHMgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKG4sIHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGEuRG9tVXRpbGl0aWVzLmdldEltYWdlRWxlbWVudCh0LCBsLndpbmRvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgby5jYWxsKGwsIGksIGUpLCBuKCEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAvKioqTEFVaSBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQgPyBpLmRlY29kZSgpLnRoZW4oKGZ1bmN0aW9uICgpIHsgby5jYWxsKGwsIGksIGUpLCBuKCEwKSB9KSkuY2F0Y2goKGZ1bmN0aW9uICgpIHsgby5jYWxsKGwsIGksIGUpLCBuKCExKSB9KSkgOiByKFwiY291bGQgbm90IGZpbmQgZWxlbWVudCB3aXRoIGlkIFwiICsgdC5pZCkqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgKGMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0LCBuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAobC5vcHRpb25zLnpvb20gfHwgbC5vcHRpb25zLmVuYWJsZUltYWdlRXZlbnRzKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChudWxsID09PSAodCA9IGwubWFpbkhvbGRlckVsZW1lbnQpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkIDAgPT09IHQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIGwub25TY3JvbGwuYmluZChsKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzaXZlOiAhMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCA9PT0gKG4gPSBsLm1haW5Ib2xkZXJFbGVtZW50KSB8fCB2b2lkIDAgPT09IG4gfHwgbi5hZGRFdmVudExpc3RlbmVyKFwiZGJsY2xpY2tcIiwgbC5vbkRvdWJsZUNsaWNrLmJpbmQobCksIHsgcGFzc2l2ZTogITAgfSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyB1LmRlZmF1bHQoZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyOiBsLm1haW5Ib2xkZXJFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ3N0YXJ0OiBsLmRyYWdTdGFydC5iaW5kKGwpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2VuZDogbC5kcmFnRW5kLmJpbmQobCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnOiBsLmRyYWcuYmluZChsKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiAhMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50czogW1wibW91c2VcIiwgXCJ0b3VjaFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG4obC5pbWFnZXMsIHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMoKSwgdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLmFkZFpvb21FdmVudHMgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrLmJpbmQodGhpcykpLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm9uU2NhbGUodCwgZnVuY3Rpb24gKHQsIG4sIHIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ID4gMC41ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICBlLmV2ZW50cygpLnBpbmNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkOiAhMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEltYWdlOiBlLmltYWdlc1tlLmN1cnJlbnRJbWFnZU51bWJlciAtIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RGVncmVlOiBlLmN1cnJlbnREZWdyZWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiB0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdDogbixcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuc2V0UG9pbnRlciA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UG9pbnRlciAhPT0gdCkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgZSA9IHRoaXMub3B0aW9ucy5jdXJzb3JDb25maWdbdF07XHJcbiAgICAgICAgICAgICAgICAgICh0aGlzLmN1cnJlbnRQb2ludGVyID0gdCksIGEuRG9tVXRpbGl0aWVzLnNldFBvaW50ZXIodGhpcy5tYWluSG9sZGVyRWxlbWVudCwgZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgbiA9IHRoaXMub3B0aW9ucy50b3VjaENvbmZpZ1t0XTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRvdWNoICE9PSBuICYmICgodGhpcy5jdXJyZW50VG91Y2ggPSBuKSwgYS5Eb21VdGlsaXRpZXMuc2V0VG91Y2hBY3Rpb24odGhpcy5tYWluSG9sZGVyRWxlbWVudCwgbikpO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5vblNjYWxlID0gZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuLFxyXG4gICAgICAgICAgICAgICAgICByID0gdGhpcyxcclxuICAgICAgICAgICAgICAgICAgaSA9ICEwLFxyXG4gICAgICAgICAgICAgICAgICBvID0gMCxcclxuICAgICAgICAgICAgICAgICAgYSA9ICExO1xyXG4gICAgICAgICAgICAgICAgdC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAgICAgICBcInRvdWNobW92ZVwiLFxyXG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgyID09PSB0LnRhcmdldFRvdWNoZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IE1hdGguaHlwb3QodC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gdC50YXJnZXRUb3VjaGVzWzFdLnBhZ2VYLCB0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSB0LnRhcmdldFRvdWNoZXNbMV0ucGFnZVkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgKGEgPSAhMCksIGUociwgaSwgdCksIHZvaWQgMCA9PT0gbiAmJiAoKG4gPSByKSwgKGkgPSAhMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgeyBjYXB0dXJlOiAhMSwgcGFzc2l2ZTogITAgfVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgdC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG91Y2hlbmRcIixcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGUsIHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoKChuID0gdm9pZCAwKSwgKGkgPSAhMCksIChudWxsID09PSAoZSA9IHIuem9vbSkgfHwgdm9pZCAwID09PSBlID8gdm9pZCAwIDogZS5pc1pvb21lZCgpKSAmJiAhYSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gdSAtIG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh2b2lkIDApLCBjIDwgNTAwICYmIGMgPiAwICYmIChudWxsID09PSAocyA9IHIuem9vbSkgfHwgdm9pZCAwID09PSBzIHx8IHMucmVzZXQoci5pbWFnZXNbci5jdXJyZW50SW1hZ2VOdW1iZXIgLSAxXSkpLCAobyA9IHUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgYSA9ICExO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBjYXB0dXJlOiAhMSwgcGFzc2l2ZTogITAgfVxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghbi5zaG93MzYwKCkpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzKCkuY2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICBjdXJyZW50RGVncmVlOiB0aGlzLmN1cnJlbnREZWdyZWUsXHJcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbWFnZTogdGhpcy5pbWFnZXNbdGhpcy5jdXJyZW50SW1hZ2VOdW1iZXIgLSAxXSxcclxuICAgICAgICAgICAgICAgICAgY29tcGxldGVkOiAhMCxcclxuICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogdCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5vblNjcm9sbCA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAvL3QucHJldmVudERlZmF1bHQoKSxcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRab29tU2NhbGUgPSB0aGlzLnpvb20uY3VycmVudFpvb21TY2FsZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzKCkuc2Nyb2xsKHtcclxuICAgICAgICAgICAgICAgICAgY3VycmVudERlZ3JlZTogdGhpcy5jdXJyZW50RGVncmVlLFxyXG4gICAgICAgICAgICAgICAgICBjdXJyZW50SW1hZ2U6IHRoaXMuaW1hZ2VzW3RoaXMuY3VycmVudEltYWdlTnVtYmVyIC0gMV0sXHJcbiAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogITAsXHJcbiAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IHQsXHJcbiAgICAgICAgICAgICAgICAgIHpvb206IHRoaXMuem9vbSxcclxuICAgICAgICAgICAgICAgICAgY3VycmVudFpvb21TY2FsZTogY3VycmVudFpvb21TY2FsZSxcclxuICAgICAgICAgICAgICAgICAganN2OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnpvb20ucHJldmlvdXNab29tU2NhbGUgPSBjdXJyZW50Wm9vbVNjYWxlO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5vbkRvdWJsZUNsaWNrID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzKCkuZG91YmxlQ2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICBjdXJyZW50RGVncmVlOiB0aGlzLmN1cnJlbnREZWdyZWUsXHJcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbWFnZTogdGhpcy5pbWFnZXNbdGhpcy5jdXJyZW50SW1hZ2VOdW1iZXIgLSAxXSxcclxuICAgICAgICAgICAgICAgICAgY29tcGxldGVkOiAhMCxcclxuICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogdCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5vblpvb21DaGFuZ2VkID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzKCkuem9vbUNoYW5nZWQoe1xyXG4gICAgICAgICAgICAgICAgICBjdXJyZW50RGVncmVlOiB0aGlzLmN1cnJlbnREZWdyZWUsXHJcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbWFnZTogdGhpcy5pbWFnZXNbdGhpcy5jdXJyZW50SW1hZ2VOdW1iZXIgLSAxXSxcclxuICAgICAgICAgICAgICAgICAgY29tcGxldGVkOiAhMCxcclxuICAgICAgICAgICAgICAgICAgaXNab29tZWQ6IHRoaXMuem9vbS5pc1pvb21lZCgpLFxyXG4gICAgICAgICAgICAgICAgICB6b29tOiB0aGlzLnpvb20sXHJcbiAgICAgICAgICAgICAgICAgIGpzdjogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogdCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5yZXBvcnRFcnJvciA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiMzYwIEphdmFzY3JpcHQgVmlld2VyOiBcIiArIHQpO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5yZXBvcnRXYXJuaW5nID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIjM2MCBKYXZhc2NyaXB0IFZpZXdlcjogXCIgKyB0KTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUudXBkYXRlSW1hZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUluQWN0aW9uID0gITA7XHJcbiAgICAgICAgICAgICAgICBpZiAoMCA9PT0gdGhpcy5kZXNpcmVkUm90YXRpb25JbkRlZ3JlZXMpXHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuaW5BbmltYXRpb24gPSAhMSksXHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMudXBkYXRlSW5BY3Rpb24gPSAhMSksXHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuZGVzaXJlZFJvdGF0aW9uSW5EZWdyZWVzU3RhcnRTbG93aW5nRG93biA9IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBlKHsgY3VycmVudERlZ3JlZTogdC5jdXJyZW50RGVncmVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSxcclxuICAgICAgICAgICAgICAgICAgbiA9IHRoaXMuZ2V0TmV4dEltYWdlTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnN0b3BBdEVkZ2VzICYmICF0aGlzLmluQW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciByID0gdGhpcy5pbWFnZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoKDEgPT09IHRoaXMucHJldmlvdXNJbWFnZU51bWJlciAmJiBuID09PSByKSB8fCAodGhpcy5wcmV2aW91c0ltYWdlTnVtYmVyID09PSByICYmIDEgPT09IG4pKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAodGhpcy51cGRhdGVJbkFjdGlvbiA9ICExKSxcclxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUoeyBjdXJyZW50RGVncmVlOiB0LmN1cnJlbnREZWdyZWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRJbWFnZShuKSxcclxuICAgICAgICAgICAgICAgICAgKChlID0gdGhpcy5nZXRDdXJyZW50UmVmcmVzaFJhdGUoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pblZpZXdQYXVzZWQpIHJldHVybiB0aGlzLm9uVmlld1Jlc3VtZWQocmVzb2x2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLy9yZXR1cm4gc2V0VGltZW91dChyZXNvbHZlLCBlICsgKHQuaXNEcmFnZ2VkID8gMCA6IDUwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvL2Zhc3Qgc2V0VGltZW91dCB2aWEgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdFRpbWVvdXQocmVzb2x2ZSwgZSArICh0LmlzRHJhZ2dlZCA/IDAgOiA1MCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0LnVwZGF0ZUltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLnpvb21UbyA9IGZ1bmN0aW9uICh0LCBlLCBuLCBkdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChpLCBvKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBhLCBzO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoci5vcHRpb25zLnpvb20pIHtcclxuICAgICAgICAgICAgICAgICAgICB0ID4gci5vcHRpb25zLnpvb21NYXggJiYgbyhcInN1cHBsaWVkIHpvb20gZmFjdG9yIFwiICsgdCArIFwiIGhpZ2hlciB0aGVuIG1heCB6b29tIG9mIFwiICsgci5vcHRpb25zLnpvb21NYXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1ID0gci5pbWFnZXNbci5jdXJyZW50SW1hZ2VOdW1iZXIgLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICBudWxsID09PSAoYSA9IHIuem9vbSkgfHwgdm9pZCAwID09PSBhIHx8IGEucmVzZXQodSwgciwgZHVyYXRpb24pLCBudWxsID09PSAocyA9IHIuem9vbSkgfHwgdm9pZCAwID09PSBzIHx8IHMuem9vbSh0LCBlLCBuLCB1LCByLCBkdXJhdGlvbiksIHIuc2V0UG9pbnRlcih0ID4gMSA/IFwiem9vbUluXCIgOiBcInpvb21PdXRcIiksIGkoKTtcclxuICAgICAgICAgICAgICAgICAgICByLm9uWm9vbUNoYW5nZWQoKTtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIG8oXCJ6b29tIG5vdCBhY3RpdmF0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUucm90YXRlRGVncmVlcyA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuaW5BbmltYXRpb24gPSAhMCksICh0aGlzLmRlc2lyZWRSb3RhdGlvbkluRGVncmVlcyA9IHQpLCB0aGlzLnVwZGF0ZUltYWdlKCk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLnJlc2V0Wm9vbSA9IGZ1bmN0aW9uIChkdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChlLCBuKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciByO1xyXG4gICAgICAgICAgICAgICAgICB0Lm9wdGlvbnMuem9vbSB8fCBuKFwiem9vbSBpcyBub3QgYWN0aXZhdGVkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIG51bGwgPT09IChyID0gdC56b29tKSB8fCB2b2lkIDAgPT09IHIgfHwgci5yZXNldCh0LmltYWdlc1t0LmN1cnJlbnRJbWFnZU51bWJlciAtIDFdLCB0LCBkdXJhdGlvbiksXHJcbiAgICAgICAgICAgICAgICAgICAgdC5zZXRQb2ludGVyKFwiZGVmYXVsdFwiKSxcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHQub25ab29tQ2hhbmdlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuaXNab29tZWRJbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5vcHRpb25zLnpvb20gJiYgISF0aGlzLnpvb20gJiYgKG51bGwgPT09ICh0ID0gdGhpcy56b29tKSB8fCB2b2lkIDAgPT09IHQgPyB2b2lkIDAgOiB0LmlzWm9vbWVkKCkpO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5yb3RhdGVUb0ZyYW1lID0gZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICAgICAgICAgIHZvaWQgMCA9PT0gZSAmJiAoZSA9ICEwKSwgdm9pZCAwID09PSBuICYmIChuID0gITApO1xyXG4gICAgICAgICAgICAgICAgdmFyIHIgPSAoMzYwIC8gdGhpcy5vcHRpb25zLnRvdGFsRnJhbWVzKSAqICh0IC0gMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yb3RhdGVUb0RlZ3JlZShyLCBlLCBuKTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUucm90YXRlVG9EZWdyZWUgPSBmdW5jdGlvbiAodCwgZSwgbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCh2b2lkIDAgPT09IGUgJiYgKGUgPSAhMCksIHZvaWQgMCA9PT0gbiAmJiAobiA9ICEwKSwgKHRoaXMuaW5BbmltYXRpb24gPSAhMCksIHRoaXMuY2FuY2VsQ3VycmVudEFjdGlvbnMoKSwgKHRoaXMudXNlRWFzaW5nID0gbiksICh0aGlzLmRlc2lyZWRSb3RhdGlvbkluRGVncmVlcyA9IDApLCAodCA9IE1hdGgucm91bmQodCkpLCB0aGlzLnByZXZpb3VzVGFyZ2V0RGVncmVlID09PSB0IHx8IHQgPT09IHRoaXMuY3VycmVudERlZ3JlZSkpXHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMudXNlRWFzaW5nID0gITApLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0KHsgY3VycmVudERlZ3JlZTogci5jdXJyZW50RGVncmVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluQW5pbWF0aW9uID0gITA7XHJcbiAgICAgICAgICAgICAgICB2YXIgaSA9IHQgPiB0aGlzLmN1cnJlbnREZWdyZWUgPyB0IC0gdGhpcy5jdXJyZW50RGVncmVlIDogMzYwIC0gdGhpcy5jdXJyZW50RGVncmVlICsgdCxcclxuICAgICAgICAgICAgICAgICAgbyA9IHQgPCB0aGlzLmN1cnJlbnREZWdyZWUgPyAtMSAqICh0aGlzLmN1cnJlbnREZWdyZWUgLSB0KSA6IC0xICogKHRoaXMuY3VycmVudERlZ3JlZSArICgzNjAgLSB0KSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuZGVzaXJlZFJvdGF0aW9uSW5EZWdyZWVzID0gZSAmJiBNYXRoLmFicyhvKSA8IGkgPyBvIDogaSksICh0aGlzLnByZXZpb3VzVGFyZ2V0RGVncmVlID0gdCksIHRoaXMudXBkYXRlSW1hZ2UoKTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuY2FuY2VsQ3VycmVudEFjdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAodGhpcy5kZXNpcmVkUm90YXRpb25JbkRlZ3JlZXMgPSAwKSwgKHRoaXMucHJldmlvdXNUYXJnZXREZWdyZWUgPSBudWxsKSwgKHRoaXMubkF1dG9Sb3RhdGlvbnMgPSAwKTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuZHJhZ0VuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0O1xyXG4gICAgICAgICAgICAgICAgKHRoaXMuaXNEcmFnZ2VkID0gITEpLCB0aGlzLm9wdGlvbnMuem9vbSAmJiAobnVsbCA9PT0gKHQgPSB0aGlzLnpvb20pIHx8IHZvaWQgMCA9PT0gdCA/IHZvaWQgMCA6IHQuaXNab29tZWQoKSkgPyB0aGlzLnNldFBvaW50ZXIoXCJwYW5cIikgOiB0aGlzLnNldFBvaW50ZXIoXCJkZWZhdWx0XCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzLm9wdGlvbnMuaW5lcnRpYSAvIDEwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzaXJlZFJvdGF0aW9uSW5EZWdyZWVzICs9IC0xICogZSAqIHRoaXMuZGVzaXJlZFJvdGF0aW9uSW5EZWdyZWVzO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5kcmFnID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlLCBuLCByO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy56b29tICYmIChudWxsID09PSAoZSA9IHRoaXMuem9vbSkgfHwgdm9pZCAwID09PSBlID8gdm9pZCAwIDogZS5pc1pvb21lZCgpKSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAodC5pbnB1dEV2ZW50LnRhcmdldFRvdWNoZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQuaW5wdXRFdmVudC50YXJnZXRUb3VjaGVzICYmIDIgPT09IHQuaW5wdXRFdmVudC50YXJnZXRUb3VjaGVzLmxlbmd0aCkgaWYgKE1hdGguaHlwb3QodC5pbnB1dEV2ZW50LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSB0LmlucHV0RXZlbnQudGFyZ2V0VG91Y2hlc1sxXS5wYWdlWCwgdC5pbnB1dEV2ZW50LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSB0LmlucHV0RXZlbnQudGFyZ2V0VG91Y2hlc1sxXS5wYWdlWSkgPCAxKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmh5cG90KHQuZGVsdGFYLCB0LmRlbHRhWSkgPCAxKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsID09PSAobiA9IHRoaXMuem9vbSkgfHwgdm9pZCAwID09PSBuIHx8IG4ucGFuKHQuZGVsdGFYLCB0LmRlbHRhWSwgdGhpcy5pbWFnZXNbdGhpcy5jdXJyZW50SW1hZ2VOdW1iZXIgLSAxXSksIHZvaWQgdGhpcy5zZXRQb2ludGVyKFwicGFuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCEoTWF0aC5hYnModC5kZWx0YVkpID4gTWF0aC5hYnModC5kZWx0YVgpKSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhZ0FsbG93ZWQpIHJldHVybiAhMTtcclxuICAgICAgICAgICAgICAgICAgaWYgKHRoaXMud2luZG93LlRvdWNoRXZlbnQgJiYgdCBpbnN0YW5jZW9mIFRvdWNoRXZlbnQgJiYgMiA9PT0gdC50b3VjaGVzLmxlbmd0aCkgcmV0dXJuICExO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgaSA9IHRoaXMuZ2V0RGVncmVlc09uZUltYWdlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbyA9ICh0LmRlbHRhWCAvIChudWxsID09PSAociA9IHRoaXMubWFpbkhvbGRlckVsZW1lbnQpIHx8IHZvaWQgMCA9PT0gciA/IHZvaWQgMCA6IHIuY2xpZW50V2lkdGgpKSAqIHRoaXMuZ2V0VG90YWxGcmFtZXMoKSAqIGk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgKG8gPSAodGhpcy5vcHRpb25zLnNwZWVkIC8gMTAwKSAqIG8pLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5yZXZlcnNlIHx8IChvICo9IC0xKSxcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5kZXNpcmVkUm90YXRpb25JbkRlZ3JlZXMgKz0gbyksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVJbkFjdGlvbiB8fCB0aGlzLnVwZGF0ZUltYWdlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQb2ludGVyKFwiZHJhZ1wiKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0RHJhZyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnN0YXJ0RHJhZ0ludm9jYXRpb25zKyssXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnN0YXJ0RHJhZ2dpbmcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZvY2F0aW9uczogdGhpcy5zdGFydERyYWdJbnZvY2F0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgKHRoaXMuZmlyc3REcmFnID0gITEpKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRHJhZ2dlZFxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5kcmFnU3RhcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0FsbG93ZWQgJiYgKCh0aGlzLm9wdGlvbnMuem9vbSAmJiAobnVsbCA9PT0gKHQgPSB0aGlzLnpvb20pIHx8IHZvaWQgMCA9PT0gdCA/IHZvaWQgMCA6IHQuaXNab29tZWQoKSkpIHx8ICgodGhpcy5pc0RyYWdnZWQgPSAhMCksICh0aGlzLmZpcnN0RHJhZyA9ICEwKSwgdGhpcy5zZXRQb2ludGVyKFwiZHJhZ1wiKSwgdGhpcy5jYW5jZWxDdXJyZW50QWN0aW9ucygpKSk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLmdldE5leHRJbWFnZU51bWJlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlID0gdGhpcy5pbWFnZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICBuID0gdGhpcy5nZXREZWdyZWVzT25lSW1hZ2UoKSxcclxuICAgICAgICAgICAgICAgICAgciA9IHRoaXMuY3VycmVudEltYWdlTnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKHRoaXMuZGVzaXJlZFJvdGF0aW9uSW5EZWdyZWVzKSA8IG4gPyAodGhpcy52aWV3ZXJIYXNOb0FjdGlvbigpICYmICh0aGlzLmRlc2lyZWRSb3RhdGlvbkluRGVncmVlcyA9IDApLCByKSA6ICgociA9IHRoaXMuZGVzaXJlZFJvdGF0aW9uSW5EZWdyZWVzID4gMCA/IHQuaW5jcmVhc2VJbWFnZU51bWJlcihyLCBlKSA6IHQuZGVjcmVhc2VJbWFnZU51bWJlcihyLCBlKSksIHRoaXMuZGVjcmVhc2VEZXNpcmVkUm90YXRpb24obiksIHIpO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5nZXREZWdyZWVzT25lSW1hZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXMuaW1hZ2VzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKDM2MCAvIHQpO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5zZXRDdXJyZW50RGVncmVlID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlID0gdGhpcy5nZXREZWdyZWVzT25lSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERlZ3JlZSA9IDEgPT09IHQgPyAwIDogKHQgLSAxKSAqIGU7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQuZGVjcmVhc2VJbWFnZU51bWJlciA9IGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLS10IDwgMSA/IGUgOiB0O1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LmluY3JlYXNlSW1hZ2VOdW1iZXIgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICsrdCA+IGUgPyAxIDogdDtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuZGVjcmVhc2VEZXNpcmVkUm90YXRpb24gPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgKHQgPSBNYXRoLmFicyh0KSksIHRoaXMuZGVzaXJlZFJvdGF0aW9uSW5EZWdyZWVzIDwgMCA/ICh0aGlzLmRlc2lyZWRSb3RhdGlvbkluRGVncmVlcyArPSB0KSA6ICh0aGlzLmRlc2lyZWRSb3RhdGlvbkluRGVncmVlcyAtPSBNYXRoLmFicyh0KSk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLnNldEN1cnJlbnRJbWFnZSA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHQgPSB0IHx8IDE7XHJcbiAgICAgICAgICAgICAgICAgIHQgIT09IHRoaXMucHJldmlvdXNJbWFnZU51bWJlciAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTdGFydGVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKGEuRG9tVXRpbGl0aWVzLnNob3dJbWFnZSh0aGlzLmltYWdlc1t0IC0gMV0sIHRoaXMud2luZG93KSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNJbWFnZU51bWJlciA+PSAwICYmIGEuRG9tVXRpbGl0aWVzLmhpZGVJbWFnZSh0aGlzLmltYWdlc1t0aGlzLnByZXZpb3VzSW1hZ2VOdW1iZXIgLSAxXSwgdGhpcy53aW5kb3csIHRoaXMuaW1hZ2VzW3QgLSAxXSwgdCAtIDEsIHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgKHRoaXMucHJldmlvdXNJbWFnZU51bWJlciA9IHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgKHRoaXMuY3VycmVudEltYWdlTnVtYmVyID0gdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEN1cnJlbnREZWdyZWUodCksXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZW5hYmxlQ2hhbmdlSW1hZ2VFdmVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHMoKS5jaGFuZ2VJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbWFnZTogdGhpcy5pbWFnZXNbdCAtIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RGVncmVlOiB0aGlzLmN1cnJlbnREZWdyZWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogITAsXHJcbiAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUudmlld2VySGFzTm9BY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNEcmFnZ2VkO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5nZXRJbWFnZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gaSh0aGlzLCBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgby5JbWFnZXMuZ2V0UG9zc2libGVJbWFnZXModGhpcy5tYWluSG9sZGVyRWxlbWVudCwgdGhpcy5tYWluSW1hZ2UsIHRoaXMudW5pcXVlSWQsIHRoaXMuZXZlbnRCdXMsIHRoaXMub3B0aW9ucywgdGhpcy53aW5kb3csIHRoaXMuaW1hZ2VIb2xkZXJFbGVtZW50KV07XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLmdldFRvdGFsRnJhbWVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbWFnZVVybHMgJiYgdGhpcy5vcHRpb25zLmltYWdlVXJscy5sZW5ndGggPiAwKSByZXR1cm4gdGhpcy5vcHRpb25zLmltYWdlVXJscy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXMub3B0aW9ucy50b3RhbEZyYW1lcztcclxuICAgICAgICAgICAgICAgIGlmICh0ID4gMCAmJiB0IDw9IDM2MCkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgaC5kZWZhdWx0KFwidG90YWxGcmFtZXMgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kIDM2MCBub3cgXCIgKyB0KTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5zcGVlZFRvUmVmcmVzaFJhdGUgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICgxMDAgLSB0KSAvIDI7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLmdldEN1cnJlbnRSZWZyZXNoUmF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgwID09PSB0aGlzLmRlc2lyZWRSb3RhdGlvbkluRGVncmVlcykgcmV0dXJuIHRoaXMuc3RhbmRieVJlZnJlc2hSYXRlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlld2VySGFzTm9BY3Rpb24oKSAmJiB0aGlzLnVzZUVhc2luZykge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmRlc2lyZWRSb3RhdGlvbkluRGVncmVlc1N0YXJ0U2xvd2luZ0Rvd24gfHwgKHRoaXMuZGVzaXJlZFJvdGF0aW9uSW5EZWdyZWVzU3RhcnRTbG93aW5nRG93biA9IE1hdGguYWJzKHRoaXMuZGVzaXJlZFJvdGF0aW9uSW5EZWdyZWVzKSk7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBlID0gKDEgLSAoMSAtIE1hdGguYWJzKHRoaXMuZGVzaXJlZFJvdGF0aW9uSW5EZWdyZWVzKSAvIHRoaXMuZGVzaXJlZFJvdGF0aW9uSW5EZWdyZWVzU3RhcnRTbG93aW5nRG93bikpICogdGhpcy5jdXJyZW50U3BlZWQ7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoZSA9ICgoMTAwIC0gdGhpcy5vcHRpb25zLmluZXJ0aWEpIC8gMTAwKSAqIGUpLCB0LnNwZWVkVG9SZWZyZXNoUmF0ZShlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0LnNwZWVkVG9SZWZyZXNoUmF0ZSh0aGlzLmN1cnJlbnRTcGVlZCk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLmF1dG9Sb3RhdGUgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBpKHRoaXMsIGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICh0aGlzLm5BdXRvUm90YXRpb25zID0gdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAoZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByKG4sIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG4sIHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkodGhpcywgZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoaS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG4gPSAwKSwgKG4gPSAwKSwgKGkubGFiZWwgPSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuIDwgdGhpcy5uQXV0b1JvdGF0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmlzRHJhZ2dlZCB8fCB0aGlzLm5BdXRvUm90YXRpb25zICE9PSB0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKGUgJiYgdGhpcy5zZXRTcGVlZCh0aGlzLm9wdGlvbnMuc3BlZWQpLCBbMywgNF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKG4gPT09IHQgLSAxICYmICh0aGlzLnVzZUVhc2luZyA9ICEwKSwgKHIgPSB0aGlzLm9wdGlvbnMuYXV0b1JvdGF0ZVJldmVyc2UgPyAtMzYwIDogMzYwKSwgWzQsIHRoaXMucm90YXRlRGVncmVlcyhyKV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFszLCA0XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkuc2VudCgpLCAoaS5sYWJlbCA9IDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG4rKywgWzMsIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAoZSwgcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlKG4gPT09IHQgLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbi51c2VFYXNpbmcgPSAhMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbyA9IG4ub3B0aW9ucy5hdXRvUm90YXRlU3BlZWQgIT09IG4ub3B0aW9ucy5zcGVlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvICYmIG4uc2V0U3BlZWQobi5vcHRpb25zLmF1dG9Sb3RhdGVTcGVlZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlKG8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvICYmIG4uc2V0U3BlZWQobi5vcHRpb25zLnNwZWVkKSwgKG4udXNlRWFzaW5nID0gITApLCBuLm5BdXRvUm90YXRpb25zID09PSB0ID8gcighMCkgOiByKCExKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbiAmJiBuLnJlcG9ydEVycm9yKHQpLCBpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgIHRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgZS5KYXZhc2NyaXB0Vmlld2VyID0gbTtcclxuICAgICAgICB3aW5kb3cuSmF2YXNjcmlwdFZpZXdlciA9IG07XHJcbiAgICAgIH0sXHJcbiAgICAgIGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgdmFyIHIgPVxyXG4gICAgICAgICAgKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8XHJcbiAgICAgICAgICBmdW5jdGlvbiAodCwgZSwgbiwgcikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IChuIHx8IChuID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChpLCBvKSB7XHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24gYSh0KSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICB1KHIubmV4dCh0KSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgIG8odCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGZ1bmN0aW9uIHModCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgdShyLnRocm93KHQpKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKHQpIHtcclxuICAgICAgICAgICAgICAgICAgbyh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24gdSh0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZTtcclxuICAgICAgICAgICAgICAgIHQuZG9uZVxyXG4gICAgICAgICAgICAgICAgICA/IGkodC52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgOiAoKGUgPSB0LnZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICBlIGluc3RhbmNlb2YgblxyXG4gICAgICAgICAgICAgICAgICAgICAgPyBlXHJcbiAgICAgICAgICAgICAgICAgICAgICA6IG5ldyBuKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KSkudGhlbihhLCBzKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdSgociA9IHIuYXBwbHkodCwgZSB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGkgPVxyXG4gICAgICAgICAgICAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgIHZhciBuLFxyXG4gICAgICAgICAgICAgICAgcixcclxuICAgICAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgICAgICBvLFxyXG4gICAgICAgICAgICAgICAgYSA9IHtcclxuICAgICAgICAgICAgICAgICAgbGFiZWw6IDAsXHJcbiAgICAgICAgICAgICAgICAgIHNlbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoMSAmIGlbMF0pIHRocm93IGlbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlbMV07XHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHRyeXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICBvcHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgKG8gPSB7IG5leHQ6IHMoMCksIHRocm93OiBzKDEpLCByZXR1cm46IHMoMikgfSksXHJcbiAgICAgICAgICAgICAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJlxyXG4gICAgICAgICAgICAgICAgKG9bU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG9cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIGZ1bmN0aW9uIHMobykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IGE7KVxyXG4gICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgobiA9IDEpLCByICYmIChpID0gMiAmIG9bMF0gPyByLnJldHVybiA6IG9bMF0gPyByLnRocm93IHx8ICgoaSA9IHIucmV0dXJuKSAmJiBpLmNhbGwociksIDApIDogci5uZXh0KSAmJiAhKGkgPSBpLmNhbGwociwgb1sxXSkpLmRvbmUpKSByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICgoKHIgPSAwKSwgaSAmJiAobyA9IFsyICYgb1swXSwgaS52YWx1ZV0pLCBvWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhLmxhYmVsKyssIHsgdmFsdWU6IG9bMV0sIGRvbmU6ICExIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYS5sYWJlbCsrLCAociA9IG9bMV0pLCAobyA9IFswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobyA9IGEub3BzLnBvcCgpKSwgYS50cnlzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKChpID0gYS50cnlzKSwgKGkgPSBpLmxlbmd0aCA+IDAgJiYgaVtpLmxlbmd0aCAtIDFdKSB8fCAoNiAhPT0gb1swXSAmJiAyICE9PSBvWzBdKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDMgPT09IG9bMF0gJiYgKCFpIHx8IChvWzFdID4gaVswXSAmJiBvWzFdIDwgaVszXSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEubGFiZWwgPSBvWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICg2ID09PSBvWzBdICYmIGEubGFiZWwgPCBpWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhLmxhYmVsID0gaVsxXSksIChpID0gbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgJiYgYS5sYWJlbCA8IGlbMl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGEubGFiZWwgPSBpWzJdKSwgYS5vcHMucHVzaChvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpWzJdICYmIGEub3BzLnBvcCgpLCBhLnRyeXMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvID0gZS5jYWxsKHQsIGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAobyA9IFs2LCB0XSksIChyID0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuID0gaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDUgJiBvWzBdKSB0aHJvdyBvWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvWzBdID8gb1sxXSA6IHZvaWQgMCwgZG9uZTogITAgfTtcclxuICAgICAgICAgICAgICAgICAgfSkoW28sIHNdKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogITAgfSksIChlLkltYWdlcyA9IHZvaWQgMCk7XHJcbiAgICAgICAgdmFyIG8gPSBuKDApLFxyXG4gICAgICAgICAgYSA9IG4oNyksXHJcbiAgICAgICAgICBzID0gbig4KSxcclxuICAgICAgICAgIHUgPSBuKDMpLFxyXG4gICAgICAgICAgYyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHQoKSB7IH1cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAodC5nZXRGaWxlbmFtZSA9IGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKG4gJiYgbi5zdGFydHNXaXRoKFwiZGF0YTpcIikpIHx8IG4gPT0gXCJcIiB8fCBuID09IFwiIFwiKSByZXR1cm4gbiA9PSBcIiBcIiA/IFwiXCIgOiBuO1xyXG4gICAgICAgICAgICAgICAgaWYgKDAgPT09IGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciByID0gbi5zcGxpdChcIi5cIikucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgPT09IHIpIHRocm93IG5ldyBvLmRlZmF1bHQoXCJubyBleHRlbnNpb24gZm91bmQgaW4gdXJsOiBcIiArIG4gKyBcIiwgY2Fubm90IGdlbmVyYXRlIG90aGVyIGZpbGVuYW1lc1wiKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIGkgPSAodCA8IDEwID8gXCIwXCIgOiBcIlwiKSArIHQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG4ucmVwbGFjZShcIi5cIiArIHIsIFwiX1wiICsgaSArIFwiLlwiICsgcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgYSA9IHRoaXMuZ2V0SW1hZ2VzUGF0aChuKSxcclxuICAgICAgICAgICAgICAgICAgcyA9IHRoaXMuZ2V0SW1hZ2VzUGF0aChlKSB8fCBhLFxyXG4gICAgICAgICAgICAgICAgICB1ID0gZS5sYXN0SW5kZXhPZihcIi9cIikgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKC0xICE9PSAoZSA9IGUuc3Vic3RyKHUpKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCI/Pz8/XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmICh0IDwgMTApIHtcclxuICAgICAgICAgICAgICAgICAgICBpID0gXCIwMDBcIiArIHQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIiArIHMgKyBlLnJlcGxhY2UoXCI/Pz8/XCIsIGkpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGlmICh0ID4gOSAmJiB0IDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IFwiMDBcIiArIHQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIiArIHMgKyBlLnJlcGxhY2UoXCI/Pz8/XCIsIGkpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGlmICh0ID4gOTkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpID0gXCIwXCIgKyB0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBzICsgZS5yZXBsYWNlKFwiPz8/P1wiLCBpKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKC0xICE9PSBlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcIj8/P1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAodCA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IFwiMDBcIiArIHQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIiArIHMgKyBlLnJlcGxhY2UoXCI/Pz9cIiwgaSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgaWYgKHQgPiA5ICYmIHQgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpID0gXCIwXCIgKyB0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBzICsgZS5yZXBsYWNlKFwiPz8/XCIsIGkpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGlmICh0ID4gOTkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpID0gdC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiICsgcyArIGUucmVwbGFjZShcIj8/P1wiLCBpKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKC0xICE9PSBlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcIj8/XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGkgPSAodCA8IDEwID8gXCIwXCIgOiBcIlwiKSArIHQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBzICsgZS5yZXBsYWNlKFwiPz9cIiwgaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoLTEgIT09IGUudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICBpID0gdC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIiArIHMgKyBlLnJlcGxhY2UoXCI/XCIsIGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXCIjanN2LWltYWdlXCIpLmF0dHIoXCJzcmNcIik7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgby5kZWZhdWx0KFwibm8gcGxhY2Vob2xkZXIgPyBvciA/PyBmb3VuZCBpbiBmb3JtYXQ6IFwiICsgZSk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQuZ2VuZXJhdGVJbWFnZXNVcmxzRnJvbUZvcm1hdCA9IGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbiA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICByID0gZS5zdGFydEZyYW1lTm8sXHJcbiAgICAgICAgICAgICAgICAgIGkgPSBlLnRvdGFsRnJhbWVzLFxyXG4gICAgICAgICAgICAgICAgICBvID0gZS5pbWFnZVVybEZvcm1hdDtcclxuICAgICAgICAgICAgICAgIGlmICgwID09PSB0Lmxlbmd0aCkgcmV0dXJuIG47XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBhID0gcjsgaSA+IG4ubGVuZ3RoOyBhKyspIG4ucHVzaCh0aGlzLmdldEZpbGVuYW1lKGEsIG8sIHQpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LmdldFBvc3NpYmxlSW1hZ2VzID0gZnVuY3Rpb24gKHQsIGUsIG4sIG8sIG9wdGlvbnMsIHUsIGltYWdlSG9sZGVyRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QganN2ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgdmFyIHIgPSBqc3Y7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBpKHRoaXMsIGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAgIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAoaSwgYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGggPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBmID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuaW1hZ2VVcmxzICYmIG9wdGlvbnMuaW1hZ2VVcmxzLmxlbmd0aCA+IDApIChoID0gb3B0aW9ucy5pbWFnZVVybHMpLCAoZiA9IG9wdGlvbnMuaW1hZ2VVcmxzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGYgPSBvcHRpb25zLnRvdGFsRnJhbWVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnID0gb3B0aW9ucy5pbWFnZVVybHMgfHwgW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwID0gb3B0aW9ucy5tYWluSW1hZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtID0gcC5sZW5ndGggPiAwID8gcCA6IGUuc3JjO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGggPSBnLmxlbmd0aCA+IDAgPyBnIDogci5nZW5lcmF0ZUltYWdlc1VybHNGcm9tRm9ybWF0KG0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2ID0gb3B0aW9ucy56b29tID8gb3B0aW9ucy56b29tTWF4IDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB5ID0gdC5jbGllbnRXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBiID0gdC5jbGllbnRIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuYXV0b0NETlJlc2l6ZXIgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnpvb20gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAobnVsbCA9PT0gKGwgPSBvcHRpb25zLmF1dG9DRE5SZXNpemVyQ29uZmlnKSB8fCB2b2lkIDAgPT09IGwgPyB2b2lkIDAgOiBsLnNjYWxlV2l0aFpvb21NYXgpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKCh5ICo9IHYpLCAoYiAqPSB2KSwgKHcgPSAobnVsbCA9PT0gKGQgPSBvcHRpb25zLmF1dG9DRE5SZXNpemVyQ29uZmlnKSB8fCB2b2lkIDAgPT09IGQgPyB2b2lkIDAgOiBkLnVzZVdpZHRoKSA/IFwianN2LXdpZHRoLTEwMFwiIDogXCJqc3YtaGVpZ2h0LTEwMFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4ID0gaC5tYXAoZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgciwgaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5hdXRvQ0ROUmVzaXplcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG8gPSBuZXcgVVJMKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG51bGwgPT09IChyID0gb3B0aW9ucy5hdXRvQ0ROUmVzaXplckNvbmZpZykgfHwgdm9pZCAwID09PSByID8gdm9pZCAwIDogci51c2VIZWlnaHQpICYmIG8uc2VhcmNoUGFyYW1zLnNldChcImhlaWdodFwiLCBiLnRvU3RyaW5nKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobnVsbCA9PT0gKGkgPSBvcHRpb25zLmF1dG9DRE5SZXNpemVyQ29uZmlnKSB8fCB2b2lkIDAgPT09IGkgPyB2b2lkIDAgOiBpLnVzZVdpZHRoKSAmJiBvLnNlYXJjaFBhcmFtcy5zZXQoXCJ3aWR0aFwiLCB5LnRvU3RyaW5nKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodCA9IG8udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG4uY2xhc3NOYW1lID0gXCJpXCIgKyBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vL24uc3R5bGUuZGlzcGxheSA9IGUgPT0gMCB8fCBuYXZpZ2F0b3IuaXNGaXJlZm94ID8gXCJibG9ja1wiIDogJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG4ub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2cobi5jbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkLnN0eWxlLmRpc3BsYXkgPSBlID09IDAgfHwgbmF2aWdhdG9yLmlzRmlyZWZveCA/IFwiYmxvY2tcIiA6IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGQuY2xhc3NOYW1lID0gXCJkMzYwIGRcIiArIGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZC5hcHBlbmQobik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VIb2xkZXJFbGVtZW50LmFwcGVuZChkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RvY3VtZW50LmJvZHkuYXBwZW5kKG4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdCAmJiBuYXZpZ2F0b3IuaXNXZWJraXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRVcmwgPSBnZXRDb21wdXRlZFN0eWxlKG4pLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuLmNsYXNzTmFtZSA9IFwicFwiICsgZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCFlKSBhbGVydChjb250ZW50VXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGNvbnRlbnRVcmwuc3Vic3RyaW5nKDUsIGNvbnRlbnRVcmwubGVuZ3RoIC0gMikgfHwgb3B0aW9ucz8ubWFpbkltYWdlPy5pbWc/LnNyYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZzogbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdjogZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImlcIiArIGUudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzdjoganN2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5JbWFnZTogb3B0aW9ucy5tYWluSW1hZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluSW1hZ2VJZDogb3B0aW9ucy5tYWluSW1hZ2VJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlOiBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jb2RlZDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhQ2xhc3M6IG9wdGlvbnMuZXh0cmFJbWFnZUNsYXNzICsgXCIgXCIgKyB3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmkwID0gb3B0aW9ucy5pMCB8fCAob3B0aW9ucy5pMCA9IHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5mcmFtZXMgPSBvcHRpb25zLmZyYW1lcyB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmZyYW1lcy5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgRSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChoID0geC5tYXAoZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5zcmM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChoLCB1LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2luZ2xlSW1hZ2VDb21wbGV0ZTogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoRSA+IHgubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSB4W0UgLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGkuZW5jb2RlZCA9IFwiXCIpLCAoaS5uYXR1cmFsV2lkdGggPSB0Py5uYXR1cmFsV2lkdGgpLCAoaS5uYXR1cmFsSGVpZ2h0ID0gdD8ubmF0dXJhbEhlaWdodCksIChpLm9ubG9hZGVkID0gdD8ub25sb2FkZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmxvYWRJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWtlOiB0LmZha2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmxvYWRlZDogdC5vbmxvYWRlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbWFnZTogRSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsSW1hZ2VzOiBmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudGFnZTogTWF0aC5yb3VuZCgoRSAvIGYpICogMTAwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZzogdC5pbWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXY6IHQuZGl2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IHhbRSAtIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNpbmdsZUltYWdlRmFpbDogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjKG5ldyBFcnJvcihcIkZhaWxlZCBsb2FkaW5nIGltYWdlLCBhcmUgeW91IHVzaW5nIGEgZ29vZCBpbWFnZVVybEZvcm1hdD8gPT5cIiArIHQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChFID4gaC5sZW5ndGggKyAxKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEUgLSAxID09PSBoLmxlbmd0aCA/IGkoeCkgOiBjKG5ldyBFcnJvcihcIk5vdCBhbGwgaW1hZ2VzIGFyZSBsb2FkZWQgXCIgKyAoRSAtIDEpICsgXCIgZnJvbSBcIiArIGgubGVuZ3RoICsgXCIuIFxcbiAgICAgICAgICAgICAgICAgICAgQ2hlY2sgdGhlIHdhcm5pbmcgdG8gc2VlIHRoZSBpbWFnZSB1cmxzIHdlIGFyZSB0cnlpbmcgdG8gZmV0Y2hcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LmdldE1haW5JbWFnZSA9IGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbiA9IGUuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobiBpbnN0YW5jZW9mIEhUTUxQaWN0dXJlRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgciA9IG4ucXVlcnlTZWxlY3RvcihcImltZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgaWYgKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IHIuc3JjO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByLmhhc0F0dHJpYnV0ZShcImRhdGEtc3JjXCIpICYmIChpID0gci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKSksIHsgaW1nOiByLCBzcmM6IGksIGlkOiB0LCBzZXF1ZW5jZTogMCwgZXh0cmFDbGFzczogXCJcIiB9O1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobiBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgaSA9IG4uc3JjO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gbi5oYXNBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKSAmJiAoaSA9IG4uZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIikpLCB7IGltZzogbiwgc3JjOiBpLCBpZDogdCwgc2VxdWVuY2U6IDAsIGV4dHJhQ2xhc3M6IFwiXCIgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBvLmRlZmF1bHQoJ0NvdWxkIG5vdCBmaW5kIG1haW4gaW1hZ2Ugd2l0aCBpZCBcIicgKyB0ICsgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQuZ2V0TWFpbkltYWdlRnJvbVVSbCA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzcmM6IHQsIGlkOiBcIlwiLCBzZXF1ZW5jZTogMCwgZXh0cmFDbGFzczogXCJcIiB9O1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LmdldE1haW5JbWFnZUVsZW1lbnQgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG4gPSBlLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG4gaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50IHx8IG4gaW5zdGFuY2VvZiBIVE1MUGljdHVyZUVsZW1lbnQpIHJldHVybiBuO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IG8uZGVmYXVsdCgnQ291bGQgbm90IGZpbmQgbWFpbiBpbWFnZSB3aXRoIGlkIFwiJyArIHQgKyAnXCInKTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5ibHVyTWFpbkltYWdlID0gZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuID0gZS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0KTtcclxuICAgICAgICAgICAgICAgIG4gaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50ICYmIChuLnN0eWxlLmZpbHRlciA9IFwiYmx1cig1cHgpXCIpO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LmhpZGVSZWFkeU5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgciA9IFwibm90aWZpY2F0aW9uX1wiICsgZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1LkRvbVV0aWxpdGllcy5hZGRIaWRkZW5TdHlsZShyLCBuLCA3MDApO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LmNyZWF0ZU9yR2V0UG93ZXJlZEJ5ID0gZnVuY3Rpb24gKHQsIGUsIG4sIHIsIGkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LmNyZWF0ZVJlYWR5Tm90aWZpY2F0aW9uID0gZnVuY3Rpb24gKHQsIGUsIG4sIHIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpID0gbi5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgKGkuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAoaS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCIpLFxyXG4gICAgICAgICAgICAgICAgICAoaS5zdHlsZS5hbGlnbkl0ZW1zID0gXCJjZW50ZXJcIiksXHJcbiAgICAgICAgICAgICAgICAgIChpLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJjZW50ZXJcIiksXHJcbiAgICAgICAgICAgICAgICAgIChpLmlkID0gXCJub3RpZmljYXRpb25fXCIgKyBlKSxcclxuICAgICAgICAgICAgICAgICAgKGkuc3R5bGUuekluZGV4ID0gXCIyMDBcIiksXHJcbiAgICAgICAgICAgICAgICAgIChpLnN0eWxlLnRvcCA9IFwiNTAlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAoaS5zdHlsZS5sZWZ0ID0gXCI1MCVcIiksXHJcbiAgICAgICAgICAgICAgICAgIChpLnN0eWxlLmhlaWdodCA9IFwiMjAlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAoaS5zdHlsZS53aWR0aCA9IFwiMjAlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAoaS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCIpLFxyXG4gICAgICAgICAgICAgICAgICAoaS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZSgtNTAlLCAtNTAlKVwiKSxcclxuICAgICAgICAgICAgICAgICAgdC5kcmFnVG9Sb3RhdGUuc2hvd1N0YXJ0VG9Sb3RhdGVEZWZhdWx0Tm90aWZpY2F0aW9uICYmIChpLmlubmVySFRNTCA9IHMuTm90aWZpY2F0aW9ucy5nZXRSZWFkeUZvclJvdGF0ZSh0KSksXHJcbiAgICAgICAgICAgICAgICAgICF0LmRyYWdUb1JvdGF0ZS5zaG93U3RhcnRUb1JvdGF0ZURlZmF1bHROb3RpZmljYXRpb24gJiYgdC5kcmFnVG9Sb3RhdGUuaW1hZ2VVcmwubGVuZ3RoID4gMCAmJiAoaS5pbm5lckhUTUwgPSBzLk5vdGlmaWNhdGlvbnMuZ2V0Tm90aWZpY2F0aW9uQ3VzdG9tSW1hZ2UodCkpLFxyXG4gICAgICAgICAgICAgICAgICByLmFwcGVuZENoaWxkKGkpO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LmNyZWF0ZVByb2dyZXNzQmFyID0gZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICAgICAgICAgIHZhciByID0gZS5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgKHIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiKSxcclxuICAgICAgICAgICAgICAgICAgKHIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAoci5zdHlsZS5oZWlnaHQgPSBcIjVweFwiKSxcclxuICAgICAgICAgICAgICAgICAgKHIuc3R5bGUud2lkdGggPSBcIjMwJVwiKSxcclxuICAgICAgICAgICAgICAgICAgKHIuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiKSxcclxuICAgICAgICAgICAgICAgICAgKHIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjZTllY2VmXCIpLFxyXG4gICAgICAgICAgICAgICAgICAoci5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjAuMjVyZW1cIiksXHJcbiAgICAgICAgICAgICAgICAgIChyLmlkID0gXCJsb2FkZXJfXCIgKyB0KSxcclxuICAgICAgICAgICAgICAgICAgKHIuc3R5bGUuekluZGV4ID0gXCIyMDBcIiksXHJcbiAgICAgICAgICAgICAgICAgIChyLnN0eWxlLnRvcCA9IFwiNTAlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAoci5zdHlsZS5sZWZ0ID0gXCI1MCVcIiksXHJcbiAgICAgICAgICAgICAgICAgIChyLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKC01MCUsIC01MCUpXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGkgPSBlLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNmE2ZDcxXCIpLCByLmFwcGVuZENoaWxkKGkpLCBuLmFwcGVuZENoaWxkKHIpLCByO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LmdldEltYWdlc1BhdGggPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGUgPSB0LnJlcGxhY2UoL14uKltcXFxcL10vLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0LnN1YnN0cmluZygwLCB0Lmxlbmd0aCAtIGUubGVuZ3RoKTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICB0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KSgpO1xyXG4gICAgICAgIGUuSW1hZ2VzID0gYztcclxuICAgICAgfSxcclxuICAgICAgZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICB2YXIgciA9XHJcbiAgICAgICAgICAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHxcclxuICAgICAgICAgIGZ1bmN0aW9uICh0LCBlLCBuLCByKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgKG4gfHwgKG4gPSBQcm9taXNlKSkoZnVuY3Rpb24gKGksIG8pIHtcclxuICAgICAgICAgICAgICBmdW5jdGlvbiBhKHQpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgIHUoci5uZXh0KHQpKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKHQpIHtcclxuICAgICAgICAgICAgICAgICAgbyh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24gcyh0KSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICB1KHIudGhyb3codCkpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAodCkge1xyXG4gICAgICAgICAgICAgICAgICBvKHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBmdW5jdGlvbiB1KHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlO1xyXG4gICAgICAgICAgICAgICAgdC5kb25lXHJcbiAgICAgICAgICAgICAgICAgID8gaSh0LnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICA6ICgoZSA9IHQudmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIGUgaW5zdGFuY2VvZiBuXHJcbiAgICAgICAgICAgICAgICAgICAgICA/IGVcclxuICAgICAgICAgICAgICAgICAgICAgIDogbmV3IG4oZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pKS50aGVuKGEsIHMpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB1KChyID0gci5hcHBseSh0LCBlIHx8IFtdKSkubmV4dCgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaSA9XHJcbiAgICAgICAgICAgICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgdmFyIG4sXHJcbiAgICAgICAgICAgICAgICByLFxyXG4gICAgICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgICAgIG8sXHJcbiAgICAgICAgICAgICAgICBhID0ge1xyXG4gICAgICAgICAgICAgICAgICBsYWJlbDogMCxcclxuICAgICAgICAgICAgICAgICAgc2VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgxICYgaVswXSkgdGhyb3cgaVsxXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaVsxXTtcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgdHJ5czogW10sXHJcbiAgICAgICAgICAgICAgICAgIG9wczogW10sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAobyA9IHsgbmV4dDogcygwKSwgdGhyb3c6IHMoMSksIHJldHVybjogcygyKSB9KSxcclxuICAgICAgICAgICAgICAgIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmXHJcbiAgICAgICAgICAgICAgICAob1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgb1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24gcyhvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiAobykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKDsgYTspXHJcbiAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChuID0gMSksIHIgJiYgKGkgPSAyICYgb1swXSA/IHIucmV0dXJuIDogb1swXSA/IHIudGhyb3cgfHwgKChpID0gci5yZXR1cm4pICYmIGkuY2FsbChyKSwgMCkgOiByLm5leHQpICYmICEoaSA9IGkuY2FsbChyLCBvWzFdKSkuZG9uZSkpIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKCgociA9IDApLCBpICYmIChvID0gWzIgJiBvWzBdLCBpLnZhbHVlXSksIG9bMF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEubGFiZWwrKywgeyB2YWx1ZTogb1sxXSwgZG9uZTogITEgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLmxhYmVsKyssIChyID0gb1sxXSksIChvID0gWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvID0gYS5vcHMucG9wKCkpLCBhLnRyeXMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoKGkgPSBhLnRyeXMpLCAoaSA9IGkubGVuZ3RoID4gMCAmJiBpW2kubGVuZ3RoIC0gMV0pIHx8ICg2ICE9PSBvWzBdICYmIDIgIT09IG9bMF0pKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMyA9PT0gb1swXSAmJiAoIWkgfHwgKG9bMV0gPiBpWzBdICYmIG9bMV0gPCBpWzNdKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYS5sYWJlbCA9IG9bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDYgPT09IG9bMF0gJiYgYS5sYWJlbCA8IGlbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGEubGFiZWwgPSBpWzFdKSwgKGkgPSBvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAmJiBhLmxhYmVsIDwgaVsyXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYS5sYWJlbCA9IGlbMl0pLCBhLm9wcy5wdXNoKG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlbMl0gJiYgYS5vcHMucG9wKCksIGEudHJ5cy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8gPSBlLmNhbGwodCwgYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChvID0gWzYsIHRdKSwgKHIgPSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4gPSBpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoNSAmIG9bMF0pIHRocm93IG9bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG9bMF0gPyBvWzFdIDogdm9pZCAwLCBkb25lOiAhMCB9O1xyXG4gICAgICAgICAgICAgICAgICB9KShbbywgc10pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBvID1cclxuICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5cykgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIGZvciAodmFyIHQgPSAwLCBlID0gMCwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGUgPCBuOyBlKyspIHQgKz0gYXJndW1lbnRzW2VdLmxlbmd0aDtcclxuICAgICAgICAgICAgICB2YXIgciA9IEFycmF5KHQpLFxyXG4gICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgICAgZm9yIChlID0gMDsgZSA8IG47IGUrKykgZm9yICh2YXIgbyA9IGFyZ3VtZW50c1tlXSwgYSA9IDAsIHMgPSBvLmxlbmd0aDsgYSA8IHM7IGErKywgaSsrKSByW2ldID0gb1thXTtcclxuICAgICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6ICEwIH0pLFxyXG4gICAgICAgICAgKGUuZGVmYXVsdCA9IGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGUsXHJcbiAgICAgICAgICAgICAgICBhLFxyXG4gICAgICAgICAgICAgICAgcyxcclxuICAgICAgICAgICAgICAgIHUgPSB0aGlzO1xyXG4gICAgICAgICAgICAgIHJldHVybiBpKHRoaXMsIGZ1bmN0aW9uIChjKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAoZSA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHIodSwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpKHRoaXMsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAoZSwgcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uTG9hZGVkKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLm5hdHVyYWxXaWR0aCA8IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHIobmV3IEVycm9yKFwiaW1hZ2UgKFwiICsgdCArIFwiIGlzIHNtYWxsZXIgdGhlbiAxMCBweCwgcHJvYmFibHkgbm90IGV4aXN0XCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKG4ub25TaW5nbGVJbWFnZUNvbXBsZXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZzogaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogaS5zcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdHVyYWxXaWR0aDogaS5uYXR1cmFsV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXR1cmFsSGVpZ2h0OiBpLm5hdHVyYWxIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGkuc3JjID0gdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpLm9ubG9hZCA9IG9uTG9hZGVkKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGkub25lcnJvciA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4ub25TaW5nbGVJbWFnZUNvbXBsZXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25sb2FkZWQ6IG9uTG9hZGVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWtlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWc6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0dXJhbFdpZHRoOiAxOTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXR1cmFsSGVpZ2h0OiAxMDgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Ugbi5vblNpbmdsZUltYWdlRmFpbChcImZhaWxlZCBsb2FkaW5nIFwiICsgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAoYSA9IGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbiA9IFtdLCByID0gbyh0KSwgaSA9IE1hdGguY2VpbChyLmxlbmd0aCAvIGUpLCBhID0gMDsgYSA8IGk7IGErKykgbi5wdXNoKHIuc3BsaWNlKDAsIGUpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbjtcclxuICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgIChzID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcih1LCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkodGhpcywgZnVuY3Rpb24gKG4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCBQcm9taXNlLmFsbCh0Lm1hcChlKSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgMixcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAoZSwgbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBhKHQsIDEwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG8gPSB0LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCAwICE9PSBvICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzKG8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwID09PSByLmxlbmd0aCA/IGUoKSA6IGkodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4odCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgaShyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6ICEwIH0pLCAoZS5Ob3RpZmljYXRpb25zID0gdm9pZCAwKTtcclxuICAgICAgICB2YXIgciA9IG4oOSksXHJcbiAgICAgICAgICBpID0gbigxKSxcclxuICAgICAgICAgIG8gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiB0KCkgeyB9XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgKHQuZ2V0Tm90aWZpY2F0aW9uQ3VzdG9tSW1hZ2UgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICc8aW1nIHNyYz1cIicgKyB0LmRyYWdUb1JvdGF0ZS5pbWFnZVVybCArICdcIiBjbGFzcz1cImpzdi1ub3RpZmljYXRpb25cIiAvPic7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQuZ2V0UmVhZHlGb3JSb3RhdGUgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcIj5cXG4nICsgdGhpcy5nZXRTdmcodCkgKyBcIiBcIiArIHRoaXMuZ2V0VGV4dCh0KSArIFwiPC9kaXY+XCI7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQuZ2V0UG93ZXJlZEJ5ID0gZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LmdldE1haW5Db2xvciA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSA9IGkuaGV4VG9SZ2IodC5kcmFnVG9Sb3RhdGUubWFpbkNvbG9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsID09PSBlICYmIChlID0geyByOiAwLCBnOiAwLCBiOiAwLCBhOiAxIH0pLCBlO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LmdldFRleHRDb2xvciA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSA9IGkuaGV4VG9SZ2IodC5kcmFnVG9Sb3RhdGUudGV4dENvbG9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsID09PSBlICYmIChlID0geyByOiAwLCBnOiAwLCBiOiAwLCBhOiAxIH0pLCBlO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LmdldFRleHQgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGUgPSByLkxvY2FsaXNhdGlvbi5nZXREcmFnVG9Sb3RhdGUodCksXHJcbiAgICAgICAgICAgICAgICAgIG4gPSB0aGlzLmdldE1haW5Db2xvcih0KSxcclxuICAgICAgICAgICAgICAgICAgaSA9IHRoaXMuZ2V0VGV4dENvbG9yKHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgJzxkaXYgIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyOyBmb250LXNpemU6IDEycHg7IHBhZGRpbmc6MC4yZW0gMC41ZW07IHdoaXRlLXNwYWNlOiBub3dyYXA7IGNvbG9yOiByZ2JhKCcgK1xyXG4gICAgICAgICAgICAgICAgICBpLnIgK1xyXG4gICAgICAgICAgICAgICAgICBcIiwgXCIgK1xyXG4gICAgICAgICAgICAgICAgICBpLmcgK1xyXG4gICAgICAgICAgICAgICAgICBcIiwgXCIgK1xyXG4gICAgICAgICAgICAgICAgICBpLmIgK1xyXG4gICAgICAgICAgICAgICAgICBcIik7XFxuIGJhY2tncm91bmQtY29sb3I6IHJnYmEoXCIgK1xyXG4gICAgICAgICAgICAgICAgICBuLnIgK1xyXG4gICAgICAgICAgICAgICAgICBcIiwgXCIgK1xyXG4gICAgICAgICAgICAgICAgICBuLmcgK1xyXG4gICAgICAgICAgICAgICAgICBcIiwgXCIgK1xyXG4gICAgICAgICAgICAgICAgICBuLmIgK1xyXG4gICAgICAgICAgICAgICAgICBcIiwgXCIgK1xyXG4gICAgICAgICAgICAgICAgICBuLmEgK1xyXG4gICAgICAgICAgICAgICAgICAnKTsgIGJvcmRlci1yYWRpdXM6IDAuNWVtO1wiPlxcbjxzcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICBlICtcclxuICAgICAgICAgICAgICAgICAgXCI8L3NwYW4+XFxuPC9kaXY+XCJcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQuZ2V0TG9nb1N2ZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnPHN2ZyBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1heFlNaWQgbWVldFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgeG1sbnM6dj1cImh0dHBzOi8vdmVjdGEuaW8vbmFub1wiPjxwYXRoICBkPVwiTTE0LjkuMmM0LjEgMCA3LjcgMS42IDEwLjQgNC4zczQuMyA2LjMgNC4zIDEwLjQtMS42IDcuNy00LjMgMTAuNC02LjMgNC4zLTEwLjQgNC4zUzcuMiAyOCA0LjUgMjUuMy4yIDE5IC4yIDE0LjkgMS45IDcuMiA0LjUgNC41IDEwLjkuMiAxNC45LjJ6bTkuNSA1LjNjLTIuNC0yLjUtNS44LTQtOS41LTRzLTcgMS41LTkuNCA0LTMuOSA1LjgtMy45IDkuNSAxLjUgNyAzLjkgOS41IDUuOCAzLjkgOS41IDMuOSA3LTEuNSA5LjUtMy45IDMuOS01LjggMy45LTkuNS0xLjYtNy4xLTQtOS41XCIvPjxwYXRoIGQ9XCJNMjUuMyAyMS44Yy0uMy45LTEuNyAyLjItMi42IDIuOS01LjQgNC4zLTEyLjggMy42LTE3LjMtMS42LTEuNi0xLjgtMy4xLTUuMi0yLjktNy42IDEuMiAxLjMgNCAyLjIgNS43IDIuNyA1LjUgMS42IDE0LjEgMS43IDE5LjEtMi43IDAgLjYtLjYgMS43LTEgMi4zLTIuOSAzLjktOCA1LTEyLjUgNC43LTIuOC0uMi00LS44LTQuOC0uOSAxLjEuOSAzLjQgMS40IDQuNyAxLjZsMyAuM2M2LjEtLjIgNy4yLTEuMyA4LjYtMS43XCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiLz48cGF0aCBkPVwiTTQuNiAxMi41YzMuNiAxLjYgNS44IDIuMSA5LjkgMS44IDIuNS0uMiA1LjQtLjkgNy45LTIuMyAzLjItMiAyLjYtMy42IDIuOC00LjQgMy4xIDUuOC02LjMgMTAuMS0xMC45IDEwLTQuOS4xLTcuNS0uNi0xMS44LTIuMy0uMS0xLjcuNC00LjMgMS4xLTUuOEM2LjggMyAxNC43LjcgMjAuNSAzLjZjMSAuNSAyLjcgMS41IDMuMiAzIDEuMiA0LjEtNi45IDYuNC05LjYgNi43LTMuOS41LTUuOSAwLTkuNS0uOFwiIGZpbGw9XCIjYzQwMDA1XCIvPjwvc3ZnPic7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQuZ2V0U3ZnID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlID0gdGhpcy5nZXRNYWluQ29sb3IodCksXHJcbiAgICAgICAgICAgICAgICAgIG4gPSB0aGlzLmdldFRleHRDb2xvcih0KSxcclxuICAgICAgICAgICAgICAgICAgciA9IFwicmdiYShcIiArIGUuciArIFwiLCBcIiArIGUuZyArIFwiLCBcIiArIGUuYiArIFwiLCBcIiArIGUuYSArIFwiKVwiLFxyXG4gICAgICAgICAgICAgICAgICBpID0gXCJyZ2JhKFwiICsgbi5yICsgXCIsIFwiICsgbi5nICsgXCIsIFwiICsgbi5iICsgXCIsIFwiICsgbi5hICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cIm1heC13aWR0aDogMTIwcHg7IHdpZHRoOiAxMDAlOyBwYWRkaW5nOiA1JSAxNSU7XCI+XFxuPHN2ZyB2aWV3Qm94PVwiOTAuNjMgODEuMTA3IDMzNS43MjQgMjE2Ljk0NlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cXG4gIDxkZWZzPlxcbiAgICA8Y2xpcFBhdGggaWQ9XCJjbGlwUGF0aDI2XCI+XFxuICAgICAgPHBhdGggZD1cIm0wIDE4NzJoMjI3MnYtMTg3MmgtMjI3MnpcIiBpZD1cInBhdGg3MjBcIi8+XFxuICAgIDwvY2xpcFBhdGg+XFxuICA8L2RlZnM+XFxuICA8ZyBpZD1cIkxheWVyXzJcIj5cXG4gICAgPGc+XFxuICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDEsIDAsIDAsIDEsIDAsIDMxKVwiPlxcbiAgICAgICAgPGNpcmNsZSBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGN4PVwiMjU2XCIgY3k9XCIxODVcIiByPVwiMTc1XCIgZmlsbD1cIicgK1xyXG4gICAgICAgICAgICAgICAgICByICtcclxuICAgICAgICAgICAgICAgICAgJ1wiIHRyYW5zZm9ybT1cIm1hdHJpeCgwLjk1OTIxMSwgMCwgMCwgMC42MTk4NDcsIDEyLjkzNDEzNCwgNDMuOTA4NDU5KVwiLz5cXG4gICAgICAgIDxnIGlkPVwiZzc2OVwiIHRyYW5zZm9ybT1cIm1hdHJpeCgxMS4xOTgxMjgsIDAsIDAsIDExLjI0ODQwNywgODMuNTQxMzg5LCA2Ny4wMTQzOTcpXCIgc3R5bGU9XCJcIj5cXG4gICAgICAgICAgPGcgdHJhbnNmb3JtPVwibWF0cml4KDAuMDI1MTQyLCAwLCAwLCAtMC4wMjIxNzcsIC0xMi4xMjMyMTksIDMwLjI0OTU3MSlcIiBjbGlwLXBhdGg9XCJ1cmwoI2NsaXBQYXRoMjYpXCIgZmlsbDpcInVybCgjbGluZWFyR3JhZGllbnQ4ODUpXCIgaWQ9XCJnNzYxXCIgc3R5bGU9XCJmaWxsOiB1cmwoI2xpbmVhckdyYWRpZW50ODg1KTtcIj5cXG4gICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMTM2OC4yLDc4Ny4xMilcIiBpZD1cImc3MzFcIiBzdHlsZT1cImZpbGw6dXJsKCNsaW5lYXJHcmFkaWVudDc3NylcIj5cXG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJtIDAsMCAtMjA3Ljk1LDg2Ljc4OSBjIC0zLjUyLDEuNjYxIC03LjY2NCwxLjMyIC0xMC44NjcsLTAuODkyIC0zLjIwMywtMi4yMTcgLTQuOTgxLC01Ljk3NCAtNC42NjMsLTkuODU5IGwgMy45MjUsLTQ3Ljg1NyBjIC0xNS4xMzEsLTAuMzgzIC0zMC40MjYsLTAuNTYzIC00NS45LC0wLjQ4NCAtMjU0Ljg0LDEuMzA3IC00NjcuMzMsNjEuODgzIC01MTkuMjcsMTcyLjUxIC0xLjg2MSwtOC43NDQgLTIuODQxLC0yOS4xODUgLTIuODg3LC0zOC4xNzQgLTAuNzM1LC0xNDMuMyAyMzUuMDMsLTI2MC42NyA1MjYuNTksLTI2Mi4xNyAxNy41MTUsLTAuMDg5IDM0LjgyNSwwLjI1NCA1MS44OTksMC45OTYgbCA0LjQzNCwtNTQuMDg3IGMgMC4zMTksLTMuODgzIDIuNjg1LC03LjMgNi4yMDUsLTguOTY3IDMuNTIxLC0xLjY2MiA3LjY2NSwtMS4zMjIgMTAuODY5LDAuODkxIGwgMTg5LjE1LDE0Mi40NyBjIDMuMjAzLDIuMjE5IDQuOTgsNS45NzUgNC42NjIsOS44NiAtMC4zMTksMy44ODQgLTIuNjg1LDcuMzAxIC02LjIwNiw4Ljk2OFwiIGlkPVwicGF0aDcyOVwiIHN0eWxlPVwiZmlsbDonICtcclxuICAgICAgICAgICAgICAgICAgaSArXHJcbiAgICAgICAgICAgICAgICAgICc7IHBhaW50LW9yZGVyOiBzdHJva2U7XCIvPlxcbiAgICAgICAgICAgIDwvZz5cXG4gICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMTYzNi41LDk0My43NClcIiBpZD1cImc3MzVcIiBzdHlsZT1cImZpbGw6dXJsKCNsaW5lYXJHcmFkaWVudDc4MSlcIj5cXG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJtIDAsMCBjIDAuMDcxLDEzLjk2MiAtMi4xNjksMzkuMjMxIC02LjQyMSw1Mi42MTggLTI4Ljg2NCwtODMuMTY1IC0xNDguMywtMTQwLjMxIC0zMTAuMDgsLTE2Ni4wNiBsIDkyLjE1OCwtMzYuNDQ2IGMgMy42MjIsLTEuNDM1IDYuMjA2LC00LjY5MSA2Ljc3OCwtOC41NDYgMC41NywtMy44NTUgLTAuOTYsLTcuNzIgLTQuMDExLC0xMC4xNDIgbCAtODEuMDM3LC02NC4yOCBjIDE3OC40Miw0MC43NTcgMzAyLjA4LDEyOS40MSAzMDIuNjEsMjMyLjg1XCIgaWQ9XCJwYXRoNzMzXCIgc3R5bGU9XCJmaWxsOicgK1xyXG4gICAgICAgICAgICAgICAgICBuICtcclxuICAgICAgICAgICAgICAgICAgJzsgcGFpbnQtb3JkZXI6IHN0cm9rZTtcIi8+XFxuICAgICAgICAgICAgPC9nPlxcbiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSg3NDkuMDQsMTA5Mi41KVwiIGlkPVwiZzczOVwiIHN0eWxlPVwiZmlsbDp1cmwoI2xpbmVhckdyYWRpZW50Nzg1KVwiPlxcbiAgICAgICAgICAgICAgPHBhdGggZD1cIm0gMCwwIHYgODAuNzI4IGMgLTk4LjkwNiwtMzQuNzA0IC0xNjAuODIsLTgzLjk2MyAtMTYxLjE3LC0xMzguODggLTAuMDksLTE0LjI2MiA0LjA5MiwtMjguMTYxIDExLjg3NywtNDEuNTcyIDEyLjYzNSw0OC4wMzggNjcuMzg2LDY3LjgxNiAxNDkuMjksOTkuNzIyXCIgaWQ9XCJwYXRoNzM3XCIgc3R5bGU9XCJmaWxsOicgK1xyXG4gICAgICAgICAgICAgICAgICBpICtcclxuICAgICAgICAgICAgICAgICAgJyA7IHBhaW50LW9yZGVyOiBzdHJva2U7XCIvPlxcbiAgICAgICAgICAgIDwvZz5cXG4gICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMTQ2OC4xLDEwOTAuMSlcIiBpZD1cImc3NDNcIiBzdHlsZT1cImZpbGw6dXJsKCNsaW5lYXJHcmFkaWVudDc4OSlcIj5cXG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJtIDAsMCBjIDc1Ljk3NCwtMzAuMTAyIDEyOC42MSwtNDYuMzU3IDE0NS44NywtOTAuMjk5IDQuMjIxLDkuODM1IDYuNDk2LDE5LjkyIDYuNTYyLDMwLjIxIDAuMzM5LDUzLjYyIC01OC4wMjUsMTAyLjM2IC0xNTIuNDMsMTM3LjY5IHpcIiBpZD1cInBhdGg3NDFcIiBzdHlsZT1cImZpbGw6JyArXHJcbiAgICAgICAgICAgICAgICAgIGkgK1xyXG4gICAgICAgICAgICAgICAgICAnOyBwYWludC1vcmRlcjogc3Ryb2tlO1wiLz5cXG4gICAgICAgICAgICA8L2c+XFxuICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDc4MC41OCw5ODEuNDIpXCIgaWQ9XCJnNzQ3XCIgc3R5bGU9XCJmaWxsOnVybCgjbGluZWFyR3JhZGllbnQ3OTMpXCI+XFxuICAgICAgICAgICAgICA8cGF0aCBkPVwibSAwLDAgYyAtMTYuNjE5LDAgLTI5LjA5NCwzLjQ0OSAtNDEuMDIsNy44ODEgbCAtMTYuNjE4LC01MS43MTcgYyA5Ljg1MiwtNC45MzMgMzMuMjM4LC05Ljg2NiA1OC42NTMsLTkuODY2IDczLjI0MSwwIDEyNC42Niw0NS4zMiAxMjQuNjYsMTA4LjM3IDAsMzAuMDU5IC0xNS41NjMsNTYuMTQ4IC00Mi41ODQsNjcuNDc4IGwgMC41MDcsMC45ODMgYyAzMS4xNjYsMTAuODQ5IDYxLjI3NCw0MC44ODggNjEuMjc0LDgyLjI1NyAwLDMyLjAyNSAtMTkuMTk3LDY4Ljk2MiAtODEuNTMsNjguOTYyIC0yNC45MDgsMCAtNDcuNzg0LC02LjM5NyAtNTguNjk1LC0xMS4zMjkgTCA0LjE0LDIxMS44MDMgYyA4LjgzOCw0LjQzMSAyMi44NzcsOC4zNjIgMzYuMzY3LDguMzYyIDIzLjM4NSwwIDM2LjM2NywtMTEuODExIDM2LjM2NywtMzAuMDM5IDAsLTMzLjAwNyAtMzYuODc1LC00NS4zMiAtNjAuNzY3LC00NS4zMiBIIDkuMzQxIEwgLTAuMDA0LDk2LjUzOCBoIDkuMzQ1IGMgMjYuNDcyLDAgNTAuOTE0LC0xMi44MTMgNTAuOTE0LC00NC4zMzcgQyA2MC4yNTUsMjEuNjggMzUuODEzLDAuMDAzIC0wLjAwNCwwLjAwM1wiIGlkPVwicGF0aDc0NVwiIHN0eWxlPVwiZmlsbDonICtcclxuICAgICAgICAgICAgICAgICAgaSArXHJcbiAgICAgICAgICAgICAgICAgICc7IHBhaW50LW9yZGVyOiBzdHJva2U7XCIvPlxcbiAgICAgICAgICAgIDwvZz5cXG4gICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMTAyMi43LDEwNTQuOClcIiBpZD1cImc3NTFcIiBzdHlsZT1cImZpbGw6dXJsKCNsaW5lYXJHcmFkaWVudDc5NylcIj5cXG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJtIDAsMCBjIDEuMDU3LDIuOTQ4IDIuMDcyLDYuMzk3IDMuMTI5LDkuODQ2IDcuNzgxLDE3LjcyNyAyMy4zODUsMzAuNTQxIDM2Ljg3NSwzMC41NDEgMTcuMTI2LDAgMjMuODkyLC0xNC4yOTggMjMuODkyLC0zMi4wMjUgMCwtMzMuNDg4IC0xMS40MTcsLTkwLjYxOSAtNDQuMTQ4LC05MC42MTkgLTE3LjY3NiwwIC0yMy4zODUsMjAuMTkzIC0yMy4zODUsNDAuODY4IDAsMTAuODQ4IDAuNTUsMjMuMTYxIDMuNjM3LDQxLjM4OSBtIDE1LjYwNCwtMTI3LjEgYyA2Ny40OTEsMCAxMTIuNyw2Ny45OCAxMTIuNywxMzkuODkgMCwzMC41NDEgLTE0LjU0Nyw3Mi40MTEgLTYwLjc2Nyw3Mi45MTMgLTE4LjY5MSwwIC0zNy4zODIsLTguMzgzIC01MC4zNjUsLTIyLjY2IGggLTIuMTE0IGMgMTkuMjQxLDQ1LjMgNTEuNDIyLDczLjg3NSA5Mi45OTEsODIuNzM5IDYuMjE1LDEuNDgzIDExLjkyNCwyLjQ2NiAxOC4xODMsMi40NjYgbCA5LjM0Niw1Mi42OTkgYyAtNS4yMDIsMCAtOS44OTYsMCAtMTguNjkyLC0xLjQ4MyBDIDgxLjUzNCwxOTUuMDMyIDQ2LjIyNCwxODAuMjczIDE2LjExNiwxNTQuMTYzIC0yMS44MTYsMTIxLjE1NiAtNjQuNCw1NC42NjEgLTY0LjQsLTI4LjU3NyBjIDAsLTQ3LjI4NSAxOC43MzQsLTk4LjUyIDgwLjAwOSwtOTguNTJcIiBpZD1cInBhdGg3NDlcIiBzdHlsZT1cImZpbGw6JyArXHJcbiAgICAgICAgICAgICAgICAgIGkgK1xyXG4gICAgICAgICAgICAgICAgICAnOyBwYWludC1vcmRlcjogc3Ryb2tlO1wiLz5cXG4gICAgICAgICAgICA8L2c+XFxuICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDEzMDksMTIwMy42KVwiIGlkPVwiZzc1NVwiIHN0eWxlPVwiZmlsbDp1cmwoI2xpbmVhckdyYWRpZW50ODAxKVwiPlxcbiAgICAgICAgICAgICAgPHBhdGggZD1cIm0gMCwwIGMgMTIuOTgyLDAgMTguNjkxLC0xNC43NzkgMTguNjkxLC0zNS40NzQgMCwtMzUuOTU1IC0yMC4yNTUsLTE4OC4xNiAtNjAuNzY3LC0xODguMTYgLTE1LjYwNCwwIC0yMS4zMTMsMTUuMjggLTIxLjMxMyw0MS44NyAwLDQwLjg4OCAyMS44MjEsMTgxLjc2IDYzLjM4OSwxODEuNzYgbSAtNTAuOTE0LC0yNzUuODUgYyA5NS4wNjIsMCAxMzIuNDQsMTM3LjkyIDEzMi40NCwyMzEuMDEgMCwzNi45MzggLTguODM5LDk3LjAzNyAtNzUuMzE0LDk3LjAzNyAtODQuNjYsMCAtMTMxLjksLTEyMC42OCAtMTMxLjksLTIyOC41NCAwLC00NC4zMTcgMTIuOTgzLC05OS41MDQgNzQuNzY1LC05OS41MDRcIiBpZD1cInBhdGg3NTNcIiBzdHlsZT1cImZpbGw6JyArXHJcbiAgICAgICAgICAgICAgICAgIGkgK1xyXG4gICAgICAgICAgICAgICAgICAnOyBwYWludC1vcmRlcjogc3Ryb2tlO1wiLz5cXG4gICAgICAgICAgICA8L2c+XFxuICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDE0NDIuNiwxMjg2LjkpXCIgaWQ9XCJnNzU5XCIgc3R5bGU9XCJmaWxsOnVybCgjbGluZWFyR3JhZGllbnQ4MDUpXCI+XFxuICAgICAgICAgICAgICA8cGF0aCBkPVwibSAwLDAgYyAxOC4wMTMsMCAzMi42MTMsLTE1LjkyIDMyLjYxMywtMzUuNTU5IDAsLTE5LjYzOCAtMTQuNiwtMzUuNTU4IC0zMi42MTMsLTM1LjU1OCAtMTguMDExLDAgLTMyLjYxMiwxNS45MiAtMzIuNjEyLDM1LjU1OCBDIC0zMi42MTIsLTE1LjkyIC0xOC4wMTEsMCAwLDAgbSAwLC05MS44MzUgYyAyOC41MDYsMCA1MS42MTUsMjUuMTk2IDUxLjYxNSw1Ni4yNzYgMCwzMS4wODEgLTIzLjEwOSw1Ni4yNzcgLTUxLjYxNSw1Ni4yNzcgLTI4LjUwNSwwIC01MS42MTQsLTI1LjE5NiAtNTEuNjE0LC01Ni4yNzcgMCwtMzEuMDggMjMuMTA5LC01Ni4yNzYgNTEuNjE0LC01Ni4yNzZcIiBpZD1cInBhdGg3NTdcIiBzdHlsZT1cImZpbGw6JyArXHJcbiAgICAgICAgICAgICAgICAgIGkgK1xyXG4gICAgICAgICAgICAgICAgICAnOyBwYWludC1vcmRlcjogc3Ryb2tlO1wiLz5cXG4gICAgICAgICAgICA8L2c+XFxuICAgICAgICAgIDwvZz5cXG4gICAgICAgIDwvZz5cXG4gICAgICA8L2c+XFxuICAgIDwvZz5cXG4gIDwvZz5cXG48L3N2Zz5cXG48L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgIHRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgZS5Ob3RpZmljYXRpb25zID0gbztcclxuICAgICAgfSxcclxuICAgICAgZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6ICEwIH0pLCAoZS5Mb2NhbGlzYXRpb24gPSB2b2lkIDApO1xyXG4gICAgICAgIHZhciByID0gbigxMCksXHJcbiAgICAgICAgICBpID0gbigxMSksXHJcbiAgICAgICAgICBvID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gdCgpIHsgfVxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICh0LmdldERyYWdUb1JvdGF0ZSA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBlID0gci5nZXRVc2VyTG9jYWxlKCksIG4gPSAwLCBpID0gdC5kcmFnVG9Sb3RhdGUubGFuZ3VhZ2VzOyBuIDwgaS5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbyA9IGlbbl07XHJcbiAgICAgICAgICAgICAgICAgIGlmIChvLmxhbmd1YWdlID09PSBlKSByZXR1cm4gby50ZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGEgPSB0aGlzLmdldFRyYW5zbGF0aW9uKGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGwgPT09IGEgJiYgKGEgPSB0aGlzLmdldFRyYW5zbGF0aW9uKFwiZW5cIikpLCBudWxsID09IGEgPyB2b2lkIDAgOiBhLmRyYWdUb1JvdGF0ZTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5nZXRUcmFuc2xhdGlvbiA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBlID0gMCwgbiA9IGkudHJhbnNsYXRpb25zOyBlIDwgbi5sZW5ndGg7IGUrKykge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoKHMgPSBuW2VdKS5sYW5ndWFnZSA9PT0gdCkgcmV0dXJuIHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gdC5zcGxpdChcIi1cIikuc2hpZnQoKSwgbyA9IDAsIGEgPSBpLnRyYW5zbGF0aW9uczsgbyA8IGEubGVuZ3RoOyBvKyspIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIHM7XHJcbiAgICAgICAgICAgICAgICAgIGlmICgocyA9IGFbb10pLmxhbmd1YWdlID09PSByKSByZXR1cm4gcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgIHRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgZS5Mb2NhbGlzYXRpb24gPSBvO1xyXG4gICAgICB9LFxyXG4gICAgICBmdW5jdGlvbiAodCwgZSwgbikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIG4ucihlKSxcclxuICAgICAgICAgIG4uZChlLCBcImdldFVzZXJMb2NhbGVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG87XHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIG4uZChlLCBcImdldFVzZXJMb2NhbGVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIHZhciByID0gbigyKSxcclxuICAgICAgICAgIGkgPSBuLm4ocik7XHJcbiAgICAgICAgdmFyIG8gPSBpKCkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyIHQgPSBbXTtcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIHdpbmRvdyAmJlxyXG4gICAgICAgICAgICAod2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZXMgJiYgKHQgPSB0LmNvbmNhdCh3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlcykpLFxyXG4gICAgICAgICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UgJiYgdC5wdXNoKHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UpLFxyXG4gICAgICAgICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IudXNlckxhbmd1YWdlICYmIHQucHVzaCh3aW5kb3cubmF2aWdhdG9yLnVzZXJMYW5ndWFnZSksXHJcbiAgICAgICAgICAgICAgd2luZG93Lm5hdmlnYXRvci5icm93c2VyTGFuZ3VhZ2UgJiYgdC5wdXNoKHdpbmRvdy5uYXZpZ2F0b3IuYnJvd3Nlckxhbmd1YWdlKSxcclxuICAgICAgICAgICAgICB3aW5kb3cubmF2aWdhdG9yLnN5c3RlbUxhbmd1YWdlICYmIHQucHVzaCh3aW5kb3cubmF2aWdhdG9yLnN5c3RlbUxhbmd1YWdlKSksXHJcbiAgICAgICAgICAgIHQucHVzaChcImVuLVVTXCIpLFxyXG4gICAgICAgICAgICAoZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gdC5tYXAoZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdCB8fCAtMSA9PT0gdC5pbmRleE9mKFwiLVwiKSB8fCB0LnRvTG93ZXJDYXNlKCkgIT09IHQpIHJldHVybiB0O1xyXG4gICAgICAgICAgICAgICAgdmFyIGUgPSB0LnNwbGl0KFwiLVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiLmNvbmNhdChlWzBdLCBcIi1cIikuY29uY2F0KGVbMV0udG9VcHBlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pKFxyXG4gICAgICAgICAgICAgIHQuZmlsdGVyKGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbi5pbmRleE9mKHQpID09PSBlO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGEgPSBpKCkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgcmV0dXJuIG8oKVswXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBlLmRlZmF1bHQgPSBhO1xyXG4gICAgICB9LFxyXG4gICAgICBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIHQuZXhwb3J0cyA9IEpTT04ucGFyc2UoXHJcbiAgICAgICAgICAne1widHJhbnNsYXRpb25zXCI6W3tcImxhbmd1YWdlXCI6XCJlblwiLFwiZHJhZ1RvUm90YXRlXCI6XCJEcmFnIFRvIFJvdGF0ZVwifSx7XCJsYW5ndWFnZVwiOlwibmxcIixcImRyYWdUb1JvdGF0ZVwiOlwiU2xlZXAgVm9vciBSb3RlcmVuXCJ9LHtcImxhbmd1YWdlXCI6XCJlc1wiLFwiZHJhZ1RvUm90YXRlXCI6XCJhcnJhc3RyYXIgcGFyYSByb3RhclwifSx7XCJsYW5ndWFnZVwiOlwicnVcIixcImRyYWdUb1JvdGF0ZVwiOlwiXHUwNDNGXHUwNDM1XHUwNDQwXHUwNDM1XHUwNDQyXHUwNDMwXHUwNDQ5XHUwNDM4XHUwNDQyXHUwNDM1LCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDNGXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDNEXHUwNDQzXHUwNDQyXHUwNDRDXCJ9LHtcImxhbmd1YWdlXCI6XCJmclwiLFwiZHJhZ1RvUm90YXRlXCI6XCJmYWlyZSBnbGlzc2VyIHBvdXIgZmFpcmUgcGl2b3RlclwifSx7XCJsYW5ndWFnZVwiOlwiY2hcIixcImRyYWdUb1JvdGF0ZVwiOlwiXHU2MkQ2XHU1MkE4XHU2NUNCXHU4RjZDXCJ9LHtcImxhbmd1YWdlXCI6XCJpdFwiLFwiZHJhZ1RvUm90YXRlXCI6XCJ0cmFzY2luYSBwZXIgcnVvdGFyZVwifSx7XCJsYW5ndWFnZVwiOlwiZGVcIixcImRyYWdUb1JvdGF0ZVwiOlwienVtIERyZWhlbiB6aWVoZW5cIn0se1wibGFuZ3VhZ2VcIjpcImtvXCIsXCJkcmFnVG9Sb3RhdGVcIjpcIlx1QjREQ1x1Qjc5OFx1QURGOFx1RDU1OFx1QzVFQyBcdUQ2OENcdUM4MDRcIn0se1wibGFuZ3VhZ2VcIjpcInB0XCIsXCJkcmFnVG9Sb3RhdGVcIjpcImFycmFzdGUgcGFyYSBnaXJhclwifV19J1xyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgdmFyIHIgPSBuKDEzKTtcclxuICAgICAgICB0LmV4cG9ydHMgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgdmFyIGUsIG4sIGksIG87XHJcbiAgICAgICAgICBpZiAoKGUgPSAvXigoPzpyZ2J8aHNbbHZdfGNteWt8eHl6fGxhYilhPylcXHMqXFwoKFteXFwpXSopXFwpLy5leGVjKHQpKSkge1xyXG4gICAgICAgICAgICB2YXIgYSA9IGVbMV0sXHJcbiAgICAgICAgICAgICAgcyA9IFwiY215a1wiID09PSAodSA9IGEucmVwbGFjZSgvYSQvLCBcIlwiKSkgPyA0IDogMztcclxuICAgICAgICAgICAgKG4gPSByW3VdKSxcclxuICAgICAgICAgICAgICAoaSA9IGVbMl1cclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgLnNwbGl0KC9cXHMqLFxccyovKVxyXG4gICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gLyUkLy50ZXN0KHQpICYmIGUgPT09IHMgPyBwYXJzZUZsb2F0KHQpIC8gMTAwIDogKC8lJC8udGVzdCh0KSwgcGFyc2VGbG9hdCh0KSk7XHJcbiAgICAgICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgICAgYSA9PT0gdSAmJiBpLnB1c2goMSksXHJcbiAgICAgICAgICAgICAgKG8gPSB2b2lkIDAgPT09IGlbc10gPyAxIDogaVtzXSksXHJcbiAgICAgICAgICAgICAgKGkgPSBpLnNsaWNlKDAsIHMpKSxcclxuICAgICAgICAgICAgICAoblt1XSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICgvXiNbQS1GYS1mMC05XSskLy50ZXN0KHQpKSB7XHJcbiAgICAgICAgICAgIHZhciB1O1xyXG4gICAgICAgICAgICBzID0gKHUgPSB0LnJlcGxhY2UoL14jLywgXCJcIikpLmxlbmd0aDtcclxuICAgICAgICAgICAgKG4gPSByLnJnYiksXHJcbiAgICAgICAgICAgICAgKGkgPSAoaSA9IHUuc3BsaXQoMyA9PT0gcyA/IC8oLikvIDogLyguLikvKSkuZmlsdGVyKEJvb2xlYW4pLm1hcChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDMgPT09IHMgPyBwYXJzZUludCh0ICsgdCwgMTYpIDogcGFyc2VJbnQodCwgMTYpO1xyXG4gICAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgICAobyA9IDEpLFxyXG4gICAgICAgICAgICAgIChuLnJnYiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgIGlbMF0gfHwgKGlbMF0gPSAwKSxcclxuICAgICAgICAgICAgICBpWzFdIHx8IChpWzFdID0gMCksXHJcbiAgICAgICAgICAgICAgaVsyXSB8fCAoaVsyXSA9IDApO1xyXG4gICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICgobiA9IHIua2V5d29yZCkua2V5d29yZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKGkgPSB0KSxcclxuICAgICAgICAgICAgICAobyA9IDEpO1xyXG4gICAgICAgICAgdmFyIGMgPSB7XHJcbiAgICAgICAgICAgIHJnYjogdm9pZCAwLFxyXG4gICAgICAgICAgICBoc2w6IHZvaWQgMCxcclxuICAgICAgICAgICAgaHN2OiB2b2lkIDAsXHJcbiAgICAgICAgICAgIGNteWs6IHZvaWQgMCxcclxuICAgICAgICAgICAga2V5d29yZDogdm9pZCAwLFxyXG4gICAgICAgICAgICBoZXg6IHZvaWQgMCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjLnJnYiA9IG4ucmdiKGkpO1xyXG4gICAgICAgICAgfSBjYXRjaCAodCkgeyB9XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjLmhzbCA9IG4uaHNsKGkpO1xyXG4gICAgICAgICAgfSBjYXRjaCAodCkgeyB9XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjLmhzdiA9IG4uaHN2KGkpO1xyXG4gICAgICAgICAgfSBjYXRjaCAodCkgeyB9XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjLmNteWsgPSBuLmNteWsoaSk7XHJcbiAgICAgICAgICB9IGNhdGNoICh0KSB7IH1cclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGMua2V5d29yZCA9IG4ua2V5d29yZChpKTtcclxuICAgICAgICAgIH0gY2F0Y2ggKHQpIHsgfVxyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgYy5yZ2IgJiZcclxuICAgICAgICAgICAgKGMuaGV4ID1cclxuICAgICAgICAgICAgICBcIiNcIiArXHJcbiAgICAgICAgICAgICAgYy5yZ2JcclxuICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGUgPSB0LnRvU3RyaW5nKDE2KTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIDEgPT09IGUubGVuZ3RoID8gXCIwXCIgKyBlIDogZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuam9pbihcIlwiKSksXHJcbiAgICAgICAgICAgIGMucmdiICYmIChjLnJnYmEgPSBjLnJnYi5jb25jYXQobykpLFxyXG4gICAgICAgICAgICBjLmhzbCAmJiAoYy5oc2xhID0gYy5oc2wuY29uY2F0KG8pKSxcclxuICAgICAgICAgICAgYy5oc3YgJiYgKGMuaHN2YSA9IGMuaHN2LmNvbmNhdChvKSksXHJcbiAgICAgICAgICAgIGMuY215ayAmJiAoYy5jbXlrYSA9IGMuY215ay5jb25jYXQobykpLFxyXG4gICAgICAgICAgICBjXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICAgIGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgdmFyIHIgPSBuKDE0KSxcclxuICAgICAgICAgIGkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgYygpO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICBmb3IgKHZhciBvIGluIHIpIHtcclxuICAgICAgICAgIGlbbyArIFwiUmF3XCJdID0gKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBcIm51bWJlclwiID09IHR5cGVvZiBlICYmIChlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSksIHJbdF0oZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9KShvKTtcclxuICAgICAgICAgIHZhciBhID0gLyhcXHcrKTIoXFx3KykvLmV4ZWMobyksXHJcbiAgICAgICAgICAgIHMgPSBhWzFdLFxyXG4gICAgICAgICAgICB1ID0gYVsyXTtcclxuICAgICAgICAgIChpW3NdID0gaVtzXSB8fCB7fSlbdV0gPSBpW29dID0gKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgIFwibnVtYmVyXCIgPT0gdHlwZW9mIGUgJiYgKGUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcclxuICAgICAgICAgICAgICB2YXIgbiA9IHJbdF0oZSk7XHJcbiAgICAgICAgICAgICAgaWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIG4gfHwgdm9pZCAwID09PSBuKSByZXR1cm4gbjtcclxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG4ubGVuZ3RoOyBpKyspIG5baV0gPSBNYXRoLnJvdW5kKG5baV0pO1xyXG4gICAgICAgICAgICAgIHJldHVybiBuO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSkobyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdGhpcy5jb252cyA9IHt9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgKGMucHJvdG90eXBlLnJvdXRlU3BhY2UgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgdmFyIG4gPSBlWzBdO1xyXG4gICAgICAgICAgcmV0dXJuIHZvaWQgMCA9PT0gbiA/IHRoaXMuZ2V0VmFsdWVzKHQpIDogKFwibnVtYmVyXCIgPT0gdHlwZW9mIG4gJiYgKG4gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSksIHRoaXMuc2V0VmFsdWVzKHQsIG4pKTtcclxuICAgICAgICB9KSxcclxuICAgICAgICAgIChjLnByb3RvdHlwZS5zZXRWYWx1ZXMgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuc3BhY2UgPSB0KSwgKHRoaXMuY29udnMgPSB7fSksICh0aGlzLmNvbnZzW3RdID0gZSksIHRoaXM7XHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIChjLnByb3RvdHlwZS5nZXRWYWx1ZXMgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICB2YXIgZSA9IHRoaXMuY29udnNbdF07XHJcbiAgICAgICAgICAgIGlmICghZSkge1xyXG4gICAgICAgICAgICAgIHZhciBuID0gdGhpcy5zcGFjZSxcclxuICAgICAgICAgICAgICAgIHIgPSB0aGlzLmNvbnZzW25dO1xyXG4gICAgICAgICAgICAgIChlID0gaVtuXVt0XShyKSksICh0aGlzLmNvbnZzW3RdID0gZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGU7XHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIFtcInJnYlwiLCBcImhzbFwiLCBcImhzdlwiLCBcImNteWtcIiwgXCJrZXl3b3JkXCJdLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgYy5wcm90b3R5cGVbdF0gPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnJvdXRlU3BhY2UodCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgKHQuZXhwb3J0cyA9IGkpO1xyXG4gICAgICB9LFxyXG4gICAgICBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgIGZ1bmN0aW9uIG4odCkge1xyXG4gICAgICAgICAgdmFyIGUsXHJcbiAgICAgICAgICAgIG4sXHJcbiAgICAgICAgICAgIHIgPSB0WzBdIC8gMjU1LFxyXG4gICAgICAgICAgICBpID0gdFsxXSAvIDI1NSxcclxuICAgICAgICAgICAgbyA9IHRbMl0gLyAyNTUsXHJcbiAgICAgICAgICAgIGEgPSBNYXRoLm1pbihyLCBpLCBvKSxcclxuICAgICAgICAgICAgcyA9IE1hdGgubWF4KHIsIGksIG8pLFxyXG4gICAgICAgICAgICB1ID0gcyAtIGE7XHJcbiAgICAgICAgICByZXR1cm4gcyA9PSBhID8gKGUgPSAwKSA6IHIgPT0gcyA/IChlID0gKGkgLSBvKSAvIHUpIDogaSA9PSBzID8gKGUgPSAyICsgKG8gLSByKSAvIHUpIDogbyA9PSBzICYmIChlID0gNCArIChyIC0gaSkgLyB1KSwgKGUgPSBNYXRoLm1pbig2MCAqIGUsIDM2MCkpIDwgMCAmJiAoZSArPSAzNjApLCAobiA9IChhICsgcykgLyAyKSwgW2UsIDEwMCAqIChzID09IGEgPyAwIDogbiA8PSAwLjUgPyB1IC8gKHMgKyBhKSA6IHUgLyAoMiAtIHMgLSBhKSksIDEwMCAqIG5dO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBpKHQpIHtcclxuICAgICAgICAgIHZhciBlLFxyXG4gICAgICAgICAgICBuLFxyXG4gICAgICAgICAgICByID0gdFswXSxcclxuICAgICAgICAgICAgaSA9IHRbMV0sXHJcbiAgICAgICAgICAgIG8gPSB0WzJdLFxyXG4gICAgICAgICAgICBhID0gTWF0aC5taW4ociwgaSwgbyksXHJcbiAgICAgICAgICAgIHMgPSBNYXRoLm1heChyLCBpLCBvKSxcclxuICAgICAgICAgICAgdSA9IHMgLSBhO1xyXG4gICAgICAgICAgcmV0dXJuIChuID0gMCA9PSBzID8gMCA6ICgodSAvIHMpICogMWUzKSAvIDEwKSwgcyA9PSBhID8gKGUgPSAwKSA6IHIgPT0gcyA/IChlID0gKGkgLSBvKSAvIHUpIDogaSA9PSBzID8gKGUgPSAyICsgKG8gLSByKSAvIHUpIDogbyA9PSBzICYmIChlID0gNCArIChyIC0gaSkgLyB1KSwgKGUgPSBNYXRoLm1pbig2MCAqIGUsIDM2MCkpIDwgMCAmJiAoZSArPSAzNjApLCBbZSwgbiwgKChzIC8gMjU1KSAqIDFlMykgLyAxMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIG8odCkge1xyXG4gICAgICAgICAgdmFyIGUgPSB0WzBdLFxyXG4gICAgICAgICAgICByID0gdFsxXSxcclxuICAgICAgICAgICAgaSA9IHRbMl07XHJcbiAgICAgICAgICByZXR1cm4gW24odClbMF0sIDEwMCAqICgoMSAvIDI1NSkgKiBNYXRoLm1pbihlLCBNYXRoLm1pbihyLCBpKSkpLCAxMDAgKiAoaSA9IDEgLSAoMSAvIDI1NSkgKiBNYXRoLm1heChlLCBNYXRoLm1heChyLCBpKSkpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gYSh0KSB7XHJcbiAgICAgICAgICB2YXIgZSxcclxuICAgICAgICAgICAgbiA9IHRbMF0gLyAyNTUsXHJcbiAgICAgICAgICAgIHIgPSB0WzFdIC8gMjU1LFxyXG4gICAgICAgICAgICBpID0gdFsyXSAvIDI1NTtcclxuICAgICAgICAgIHJldHVybiBbMTAwICogKCgxIC0gbiAtIChlID0gTWF0aC5taW4oMSAtIG4sIDEgLSByLCAxIC0gaSkpKSAvICgxIC0gZSkgfHwgMCksIDEwMCAqICgoMSAtIHIgLSBlKSAvICgxIC0gZSkgfHwgMCksIDEwMCAqICgoMSAtIGkgLSBlKSAvICgxIC0gZSkgfHwgMCksIDEwMCAqIGVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBzKHQpIHtcclxuICAgICAgICAgIHJldHVybiBJW0pTT04uc3RyaW5naWZ5KHQpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gdSh0KSB7XHJcbiAgICAgICAgICB2YXIgZSA9IHRbMF0gLyAyNTUsXHJcbiAgICAgICAgICAgIG4gPSB0WzFdIC8gMjU1LFxyXG4gICAgICAgICAgICByID0gdFsyXSAvIDI1NTtcclxuICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIDEwMCAqICgwLjQxMjQgKiAoZSA9IGUgPiAwLjA0MDQ1ID8gTWF0aC5wb3coKGUgKyAwLjA1NSkgLyAxLjA1NSwgMi40KSA6IGUgLyAxMi45MikgKyAwLjM1NzYgKiAobiA9IG4gPiAwLjA0MDQ1ID8gTWF0aC5wb3coKG4gKyAwLjA1NSkgLyAxLjA1NSwgMi40KSA6IG4gLyAxMi45MikgKyAwLjE4MDUgKiAociA9IHIgPiAwLjA0MDQ1ID8gTWF0aC5wb3coKHIgKyAwLjA1NSkgLyAxLjA1NSwgMi40KSA6IHIgLyAxMi45MikpLFxyXG4gICAgICAgICAgICAxMDAgKiAoMC4yMTI2ICogZSArIDAuNzE1MiAqIG4gKyAwLjA3MjIgKiByKSxcclxuICAgICAgICAgICAgMTAwICogKDAuMDE5MyAqIGUgKyAwLjExOTIgKiBuICsgMC45NTA1ICogciksXHJcbiAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjKHQpIHtcclxuICAgICAgICAgIHZhciBlID0gdSh0KSxcclxuICAgICAgICAgICAgbiA9IGVbMF0sXHJcbiAgICAgICAgICAgIHIgPSBlWzFdLFxyXG4gICAgICAgICAgICBpID0gZVsyXTtcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIChyIC89IDEwMCksIChpIC89IDEwOC44ODMpLCAobiA9IChuIC89IDk1LjA0NykgPiAwLjAwODg1NiA/IE1hdGgucG93KG4sIDEgLyAzKSA6IDcuNzg3ICogbiArIDE2IC8gMTE2KSwgWzExNiAqIChyID0gciA+IDAuMDA4ODU2ID8gTWF0aC5wb3cociwgMSAvIDMpIDogNy43ODcgKiByICsgMTYgLyAxMTYpIC0gMTYsIDUwMCAqIChuIC0gciksIDIwMCAqIChyIC0gKGkgPSBpID4gMC4wMDg4NTYgPyBNYXRoLnBvdyhpLCAxIC8gMykgOiA3Ljc4NyAqIGkgKyAxNiAvIDExNikpXVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gbCh0KSB7XHJcbiAgICAgICAgICB2YXIgZSxcclxuICAgICAgICAgICAgbixcclxuICAgICAgICAgICAgcixcclxuICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgbyxcclxuICAgICAgICAgICAgYSA9IHRbMF0gLyAzNjAsXHJcbiAgICAgICAgICAgIHMgPSB0WzFdIC8gMTAwLFxyXG4gICAgICAgICAgICB1ID0gdFsyXSAvIDEwMDtcclxuICAgICAgICAgIGlmICgwID09IHMpIHJldHVybiBbKG8gPSAyNTUgKiB1KSwgbywgb107XHJcbiAgICAgICAgICAoZSA9IDIgKiB1IC0gKG4gPSB1IDwgMC41ID8gdSAqICgxICsgcykgOiB1ICsgcyAtIHUgKiBzKSksIChpID0gWzAsIDAsIDBdKTtcclxuICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgMzsgYysrKSAociA9IGEgKyAoMSAvIDMpICogLShjIC0gMSkpIDwgMCAmJiByKyssIHIgPiAxICYmIHItLSwgKG8gPSA2ICogciA8IDEgPyBlICsgNiAqIChuIC0gZSkgKiByIDogMiAqIHIgPCAxID8gbiA6IDMgKiByIDwgMiA/IGUgKyAobiAtIGUpICogKDIgLyAzIC0gcikgKiA2IDogZSksIChpW2NdID0gMjU1ICogbyk7XHJcbiAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gZCh0KSB7XHJcbiAgICAgICAgICB2YXIgZSA9IHRbMF0gLyA2MCxcclxuICAgICAgICAgICAgbiA9IHRbMV0gLyAxMDAsXHJcbiAgICAgICAgICAgIHIgPSB0WzJdIC8gMTAwLFxyXG4gICAgICAgICAgICBpID0gTWF0aC5mbG9vcihlKSAlIDYsXHJcbiAgICAgICAgICAgIG8gPSBlIC0gTWF0aC5mbG9vcihlKSxcclxuICAgICAgICAgICAgYSA9IDI1NSAqIHIgKiAoMSAtIG4pLFxyXG4gICAgICAgICAgICBzID0gMjU1ICogciAqICgxIC0gbiAqIG8pLFxyXG4gICAgICAgICAgICB1ID0gMjU1ICogciAqICgxIC0gbiAqICgxIC0gbykpO1xyXG4gICAgICAgICAgciAqPSAyNTU7XHJcbiAgICAgICAgICBzd2l0Y2ggKGkpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgIHJldHVybiBbciwgdSwgYV07XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICByZXR1cm4gW3MsIHIsIGFdO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFthLCByLCB1XTtcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgIHJldHVybiBbYSwgcywgcl07XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICByZXR1cm4gW3UsIGEsIHJdO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtyLCBhLCBzXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gaCh0KSB7XHJcbiAgICAgICAgICB2YXIgZSxcclxuICAgICAgICAgICAgbixcclxuICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgbyxcclxuICAgICAgICAgICAgYSA9IHRbMF0gLyAzNjAsXHJcbiAgICAgICAgICAgIHMgPSB0WzFdIC8gMTAwLFxyXG4gICAgICAgICAgICB1ID0gdFsyXSAvIDEwMCxcclxuICAgICAgICAgICAgYyA9IHMgKyB1O1xyXG4gICAgICAgICAgc3dpdGNoICgoYyA+IDEgJiYgKChzIC89IGMpLCAodSAvPSBjKSksIChpID0gNiAqIGEgLSAoZSA9IE1hdGguZmxvb3IoNiAqIGEpKSksIDAgIT0gKDEgJiBlKSAmJiAoaSA9IDEgLSBpKSwgKG8gPSBzICsgaSAqICgobiA9IDEgLSB1KSAtIHMpKSwgZSkpIHtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgKHIgPSBuKSwgKGcgPSBvKSwgKGIgPSBzKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgIChyID0gbyksIChnID0gbiksIChiID0gcyk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAociA9IHMpLCAoZyA9IG4pLCAoYiA9IG8pO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgKHIgPSBzKSwgKGcgPSBvKSwgKGIgPSBuKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgIChyID0gbyksIChnID0gcyksIChiID0gbik7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAociA9IG4pLCAoZyA9IHMpLCAoYiA9IG8pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIFsyNTUgKiByLCAyNTUgKiBnLCAyNTUgKiBiXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gZih0KSB7XHJcbiAgICAgICAgICB2YXIgZSA9IHRbMF0gLyAxMDAsXHJcbiAgICAgICAgICAgIG4gPSB0WzFdIC8gMTAwLFxyXG4gICAgICAgICAgICByID0gdFsyXSAvIDEwMCxcclxuICAgICAgICAgICAgaSA9IHRbM10gLyAxMDA7XHJcbiAgICAgICAgICByZXR1cm4gWzI1NSAqICgxIC0gTWF0aC5taW4oMSwgZSAqICgxIC0gaSkgKyBpKSksIDI1NSAqICgxIC0gTWF0aC5taW4oMSwgbiAqICgxIC0gaSkgKyBpKSksIDI1NSAqICgxIC0gTWF0aC5taW4oMSwgciAqICgxIC0gaSkgKyBpKSldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBwKHQpIHtcclxuICAgICAgICAgIHZhciBlLFxyXG4gICAgICAgICAgICBuLFxyXG4gICAgICAgICAgICByLFxyXG4gICAgICAgICAgICBpID0gdFswXSAvIDEwMCxcclxuICAgICAgICAgICAgbyA9IHRbMV0gLyAxMDAsXHJcbiAgICAgICAgICAgIGEgPSB0WzJdIC8gMTAwO1xyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgKG4gPSAtMC45Njg5ICogaSArIDEuODc1OCAqIG8gKyAwLjA0MTUgKiBhKSxcclxuICAgICAgICAgICAgKHIgPSAwLjA1NTcgKiBpICsgLTAuMjA0ICogbyArIDEuMDU3ICogYSksXHJcbiAgICAgICAgICAgIChlID0gKGUgPSAzLjI0MDYgKiBpICsgLTEuNTM3MiAqIG8gKyAtMC40OTg2ICogYSkgPiAwLjAwMzEzMDggPyAxLjA1NSAqIE1hdGgucG93KGUsIDEgLyAyLjQpIC0gMC4wNTUgOiAoZSAqPSAxMi45MikpLFxyXG4gICAgICAgICAgICAobiA9IG4gPiAwLjAwMzEzMDggPyAxLjA1NSAqIE1hdGgucG93KG4sIDEgLyAyLjQpIC0gMC4wNTUgOiAobiAqPSAxMi45MikpLFxyXG4gICAgICAgICAgICAociA9IHIgPiAwLjAwMzEzMDggPyAxLjA1NSAqIE1hdGgucG93KHIsIDEgLyAyLjQpIC0gMC4wNTUgOiAociAqPSAxMi45MikpLFxyXG4gICAgICAgICAgICBbMjU1ICogKGUgPSBNYXRoLm1pbihNYXRoLm1heCgwLCBlKSwgMSkpLCAyNTUgKiAobiA9IE1hdGgubWluKE1hdGgubWF4KDAsIG4pLCAxKSksIDI1NSAqIChyID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgciksIDEpKV1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIG0odCkge1xyXG4gICAgICAgICAgdmFyIGUgPSB0WzBdLFxyXG4gICAgICAgICAgICBuID0gdFsxXSxcclxuICAgICAgICAgICAgciA9IHRbMl07XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAobiAvPSAxMDApLCAociAvPSAxMDguODgzKSwgKGUgPSAoZSAvPSA5NS4wNDcpID4gMC4wMDg4NTYgPyBNYXRoLnBvdyhlLCAxIC8gMykgOiA3Ljc4NyAqIGUgKyAxNiAvIDExNiksIFsxMTYgKiAobiA9IG4gPiAwLjAwODg1NiA/IE1hdGgucG93KG4sIDEgLyAzKSA6IDcuNzg3ICogbiArIDE2IC8gMTE2KSAtIDE2LCA1MDAgKiAoZSAtIG4pLCAyMDAgKiAobiAtIChyID0gciA+IDAuMDA4ODU2ID8gTWF0aC5wb3cociwgMSAvIDMpIDogNy43ODcgKiByICsgMTYgLyAxMTYpKV1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHYodCkge1xyXG4gICAgICAgICAgdmFyIGUsXHJcbiAgICAgICAgICAgIG4sXHJcbiAgICAgICAgICAgIHIsXHJcbiAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgIG8gPSB0WzBdLFxyXG4gICAgICAgICAgICBhID0gdFsxXSxcclxuICAgICAgICAgICAgcyA9IHRbMl07XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBvIDw9IDggPyAoaSA9ICgobiA9ICgxMDAgKiBvKSAvIDkwMy4zKSAvIDEwMCkgKiA3Ljc4NyArIDE2IC8gMTE2KSA6ICgobiA9IDEwMCAqIE1hdGgucG93KChvICsgMTYpIC8gMTE2LCAzKSksIChpID0gTWF0aC5wb3cobiAvIDEwMCwgMSAvIDMpKSksXHJcbiAgICAgICAgICAgIFsoZSA9IGUgLyA5NS4wNDcgPD0gMC4wMDg4NTYgPyAoZSA9ICg5NS4wNDcgKiAoYSAvIDUwMCArIGkgLSAxNiAvIDExNikpIC8gNy43ODcpIDogOTUuMDQ3ICogTWF0aC5wb3coYSAvIDUwMCArIGksIDMpKSwgbiwgKHIgPSByIC8gMTA4Ljg4MyA8PSAwLjAwODg1OSA/IChyID0gKDEwOC44ODMgKiAoaSAtIHMgLyAyMDAgLSAxNiAvIDExNikpIC8gNy43ODcpIDogMTA4Ljg4MyAqIE1hdGgucG93KGkgLSBzIC8gMjAwLCAzKSldXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiB5KHQpIHtcclxuICAgICAgICAgIHZhciBlLFxyXG4gICAgICAgICAgICBuID0gdFswXSxcclxuICAgICAgICAgICAgciA9IHRbMV0sXHJcbiAgICAgICAgICAgIGkgPSB0WzJdO1xyXG4gICAgICAgICAgcmV0dXJuIChlID0gKDM2MCAqIE1hdGguYXRhbjIoaSwgcikpIC8gMiAvIE1hdGguUEkpIDwgMCAmJiAoZSArPSAzNjApLCBbbiwgTWF0aC5zcXJ0KHIgKiByICsgaSAqIGkpLCBlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gdyh0KSB7XHJcbiAgICAgICAgICByZXR1cm4gcCh2KHQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24geCh0KSB7XHJcbiAgICAgICAgICB2YXIgZSxcclxuICAgICAgICAgICAgbiA9IHRbMF0sXHJcbiAgICAgICAgICAgIHIgPSB0WzFdO1xyXG4gICAgICAgICAgcmV0dXJuIChlID0gKHRbMl0gLyAzNjApICogMiAqIE1hdGguUEkpLCBbbiwgciAqIE1hdGguY29zKGUpLCByICogTWF0aC5zaW4oZSldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBFKHQpIHtcclxuICAgICAgICAgIHJldHVybiBSW3RdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0LmV4cG9ydHMgPSB7XHJcbiAgICAgICAgICByZ2IyaHNsOiBuLFxyXG4gICAgICAgICAgcmdiMmhzdjogaSxcclxuICAgICAgICAgIHJnYjJod2I6IG8sXHJcbiAgICAgICAgICByZ2IyY215azogYSxcclxuICAgICAgICAgIHJnYjJrZXl3b3JkOiBzLFxyXG4gICAgICAgICAgcmdiMnh5ejogdSxcclxuICAgICAgICAgIHJnYjJsYWI6IGMsXHJcbiAgICAgICAgICByZ2IybGNoOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICByZXR1cm4geShjKHQpKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBoc2wycmdiOiBsLFxyXG4gICAgICAgICAgaHNsMmhzdjogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgdmFyIGUgPSB0WzBdLFxyXG4gICAgICAgICAgICAgIG4gPSB0WzFdIC8gMTAwLFxyXG4gICAgICAgICAgICAgIHIgPSB0WzJdIC8gMTAwO1xyXG4gICAgICAgICAgICBpZiAoMCA9PT0gcikgcmV0dXJuIFswLCAwLCAwXTtcclxuICAgICAgICAgICAgcmV0dXJuIFtlLCAxMDAgKiAoKDIgKiAobiAqPSAociAqPSAyKSA8PSAxID8gciA6IDIgLSByKSkgLyAociArIG4pKSwgMTAwICogKChyICsgbikgLyAyKV07XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaHNsMmh3YjogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG8obCh0KSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaHNsMmNteWs6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhKGwodCkpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGhzbDJrZXl3b3JkOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcyhsKHQpKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBoc3YycmdiOiBkLFxyXG4gICAgICAgICAgaHN2MmhzbDogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgdmFyIGUsXHJcbiAgICAgICAgICAgICAgbixcclxuICAgICAgICAgICAgICByID0gdFswXSxcclxuICAgICAgICAgICAgICBpID0gdFsxXSAvIDEwMCxcclxuICAgICAgICAgICAgICBvID0gdFsyXSAvIDEwMDtcclxuICAgICAgICAgICAgcmV0dXJuIChlID0gaSAqIG8pLCBbciwgMTAwICogKGUgPSAoZSAvPSAobiA9ICgyIC0gaSkgKiBvKSA8PSAxID8gbiA6IDIgLSBuKSB8fCAwKSwgMTAwICogKG4gLz0gMildO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGhzdjJod2I6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvKGQodCkpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGhzdjJjbXlrOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYShkKHQpKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBoc3Yya2V5d29yZDogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHMoZCh0KSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaHdiMnJnYjogaCxcclxuICAgICAgICAgIGh3YjJoc2w6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuKGgodCkpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGh3YjJoc3Y6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpKGgodCkpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGh3YjJjbXlrOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYShoKHQpKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBod2Iya2V5d29yZDogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHMoaCh0KSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY215azJyZ2I6IGYsXHJcbiAgICAgICAgICBjbXlrMmhzbDogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG4oZih0KSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY215azJoc3Y6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpKGYodCkpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNteWsyaHdiOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbyhmKHQpKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjbXlrMmtleXdvcmQ6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzKGYodCkpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGtleXdvcmQycmdiOiBFLFxyXG4gICAgICAgICAga2V5d29yZDJoc2w6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuKEUodCkpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGtleXdvcmQyaHN2OiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaShFKHQpKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBrZXl3b3JkMmh3YjogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG8oRSh0KSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAga2V5d29yZDJjbXlrOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYShFKHQpKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBrZXl3b3JkMmxhYjogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGMoRSh0KSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAga2V5d29yZDJ4eXo6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1KEUodCkpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHh5ejJyZ2I6IHAsXHJcbiAgICAgICAgICB4eXoybGFiOiBtLFxyXG4gICAgICAgICAgeHl6MmxjaDogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHkobSh0KSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbGFiMnh5ejogdixcclxuICAgICAgICAgIGxhYjJyZ2I6IHcsXHJcbiAgICAgICAgICBsYWIybGNoOiB5LFxyXG4gICAgICAgICAgbGNoMmxhYjogeCxcclxuICAgICAgICAgIGxjaDJ4eXo6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2KHgodCkpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGxjaDJyZ2I6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3KHgodCkpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBSID0ge1xyXG4gICAgICAgICAgYWxpY2VibHVlOiBbMjQwLCAyNDgsIDI1NV0sXHJcbiAgICAgICAgICBhbnRpcXVld2hpdGU6IFsyNTAsIDIzNSwgMjE1XSxcclxuICAgICAgICAgIGFxdWE6IFswLCAyNTUsIDI1NV0sXHJcbiAgICAgICAgICBhcXVhbWFyaW5lOiBbMTI3LCAyNTUsIDIxMl0sXHJcbiAgICAgICAgICBhenVyZTogWzI0MCwgMjU1LCAyNTVdLFxyXG4gICAgICAgICAgYmVpZ2U6IFsyNDUsIDI0NSwgMjIwXSxcclxuICAgICAgICAgIGJpc3F1ZTogWzI1NSwgMjI4LCAxOTZdLFxyXG4gICAgICAgICAgYmxhY2s6IFswLCAwLCAwXSxcclxuICAgICAgICAgIGJsYW5jaGVkYWxtb25kOiBbMjU1LCAyMzUsIDIwNV0sXHJcbiAgICAgICAgICBibHVlOiBbMCwgMCwgMjU1XSxcclxuICAgICAgICAgIGJsdWV2aW9sZXQ6IFsxMzgsIDQzLCAyMjZdLFxyXG4gICAgICAgICAgYnJvd246IFsxNjUsIDQyLCA0Ml0sXHJcbiAgICAgICAgICBidXJseXdvb2Q6IFsyMjIsIDE4NCwgMTM1XSxcclxuICAgICAgICAgIGNhZGV0Ymx1ZTogWzk1LCAxNTgsIDE2MF0sXHJcbiAgICAgICAgICBjaGFydHJldXNlOiBbMTI3LCAyNTUsIDBdLFxyXG4gICAgICAgICAgY2hvY29sYXRlOiBbMjEwLCAxMDUsIDMwXSxcclxuICAgICAgICAgIGNvcmFsOiBbMjU1LCAxMjcsIDgwXSxcclxuICAgICAgICAgIGNvcm5mbG93ZXJibHVlOiBbMTAwLCAxNDksIDIzN10sXHJcbiAgICAgICAgICBjb3Juc2lsazogWzI1NSwgMjQ4LCAyMjBdLFxyXG4gICAgICAgICAgY3JpbXNvbjogWzIyMCwgMjAsIDYwXSxcclxuICAgICAgICAgIGN5YW46IFswLCAyNTUsIDI1NV0sXHJcbiAgICAgICAgICBkYXJrYmx1ZTogWzAsIDAsIDEzOV0sXHJcbiAgICAgICAgICBkYXJrY3lhbjogWzAsIDEzOSwgMTM5XSxcclxuICAgICAgICAgIGRhcmtnb2xkZW5yb2Q6IFsxODQsIDEzNCwgMTFdLFxyXG4gICAgICAgICAgZGFya2dyYXk6IFsxNjksIDE2OSwgMTY5XSxcclxuICAgICAgICAgIGRhcmtncmVlbjogWzAsIDEwMCwgMF0sXHJcbiAgICAgICAgICBkYXJrZ3JleTogWzE2OSwgMTY5LCAxNjldLFxyXG4gICAgICAgICAgZGFya2toYWtpOiBbMTg5LCAxODMsIDEwN10sXHJcbiAgICAgICAgICBkYXJrbWFnZW50YTogWzEzOSwgMCwgMTM5XSxcclxuICAgICAgICAgIGRhcmtvbGl2ZWdyZWVuOiBbODUsIDEwNywgNDddLFxyXG4gICAgICAgICAgZGFya29yYW5nZTogWzI1NSwgMTQwLCAwXSxcclxuICAgICAgICAgIGRhcmtvcmNoaWQ6IFsxNTMsIDUwLCAyMDRdLFxyXG4gICAgICAgICAgZGFya3JlZDogWzEzOSwgMCwgMF0sXHJcbiAgICAgICAgICBkYXJrc2FsbW9uOiBbMjMzLCAxNTAsIDEyMl0sXHJcbiAgICAgICAgICBkYXJrc2VhZ3JlZW46IFsxNDMsIDE4OCwgMTQzXSxcclxuICAgICAgICAgIGRhcmtzbGF0ZWJsdWU6IFs3MiwgNjEsIDEzOV0sXHJcbiAgICAgICAgICBkYXJrc2xhdGVncmF5OiBbNDcsIDc5LCA3OV0sXHJcbiAgICAgICAgICBkYXJrc2xhdGVncmV5OiBbNDcsIDc5LCA3OV0sXHJcbiAgICAgICAgICBkYXJrdHVycXVvaXNlOiBbMCwgMjA2LCAyMDldLFxyXG4gICAgICAgICAgZGFya3Zpb2xldDogWzE0OCwgMCwgMjExXSxcclxuICAgICAgICAgIGRlZXBwaW5rOiBbMjU1LCAyMCwgMTQ3XSxcclxuICAgICAgICAgIGRlZXBza3libHVlOiBbMCwgMTkxLCAyNTVdLFxyXG4gICAgICAgICAgZGltZ3JheTogWzEwNSwgMTA1LCAxMDVdLFxyXG4gICAgICAgICAgZGltZ3JleTogWzEwNSwgMTA1LCAxMDVdLFxyXG4gICAgICAgICAgZG9kZ2VyYmx1ZTogWzMwLCAxNDQsIDI1NV0sXHJcbiAgICAgICAgICBmaXJlYnJpY2s6IFsxNzgsIDM0LCAzNF0sXHJcbiAgICAgICAgICBmbG9yYWx3aGl0ZTogWzI1NSwgMjUwLCAyNDBdLFxyXG4gICAgICAgICAgZm9yZXN0Z3JlZW46IFszNCwgMTM5LCAzNF0sXHJcbiAgICAgICAgICBmdWNoc2lhOiBbMjU1LCAwLCAyNTVdLFxyXG4gICAgICAgICAgZ2FpbnNib3JvOiBbMjIwLCAyMjAsIDIyMF0sXHJcbiAgICAgICAgICBnaG9zdHdoaXRlOiBbMjQ4LCAyNDgsIDI1NV0sXHJcbiAgICAgICAgICBnb2xkOiBbMjU1LCAyMTUsIDBdLFxyXG4gICAgICAgICAgZ29sZGVucm9kOiBbMjE4LCAxNjUsIDMyXSxcclxuICAgICAgICAgIGdyYXk6IFsxMjgsIDEyOCwgMTI4XSxcclxuICAgICAgICAgIGdyZWVuOiBbMCwgMTI4LCAwXSxcclxuICAgICAgICAgIGdyZWVueWVsbG93OiBbMTczLCAyNTUsIDQ3XSxcclxuICAgICAgICAgIGdyZXk6IFsxMjgsIDEyOCwgMTI4XSxcclxuICAgICAgICAgIGhvbmV5ZGV3OiBbMjQwLCAyNTUsIDI0MF0sXHJcbiAgICAgICAgICBob3RwaW5rOiBbMjU1LCAxMDUsIDE4MF0sXHJcbiAgICAgICAgICBpbmRpYW5yZWQ6IFsyMDUsIDkyLCA5Ml0sXHJcbiAgICAgICAgICBpbmRpZ286IFs3NSwgMCwgMTMwXSxcclxuICAgICAgICAgIGl2b3J5OiBbMjU1LCAyNTUsIDI0MF0sXHJcbiAgICAgICAgICBraGFraTogWzI0MCwgMjMwLCAxNDBdLFxyXG4gICAgICAgICAgbGF2ZW5kZXI6IFsyMzAsIDIzMCwgMjUwXSxcclxuICAgICAgICAgIGxhdmVuZGVyYmx1c2g6IFsyNTUsIDI0MCwgMjQ1XSxcclxuICAgICAgICAgIGxhd25ncmVlbjogWzEyNCwgMjUyLCAwXSxcclxuICAgICAgICAgIGxlbW9uY2hpZmZvbjogWzI1NSwgMjUwLCAyMDVdLFxyXG4gICAgICAgICAgbGlnaHRibHVlOiBbMTczLCAyMTYsIDIzMF0sXHJcbiAgICAgICAgICBsaWdodGNvcmFsOiBbMjQwLCAxMjgsIDEyOF0sXHJcbiAgICAgICAgICBsaWdodGN5YW46IFsyMjQsIDI1NSwgMjU1XSxcclxuICAgICAgICAgIGxpZ2h0Z29sZGVucm9keWVsbG93OiBbMjUwLCAyNTAsIDIxMF0sXHJcbiAgICAgICAgICBsaWdodGdyYXk6IFsyMTEsIDIxMSwgMjExXSxcclxuICAgICAgICAgIGxpZ2h0Z3JlZW46IFsxNDQsIDIzOCwgMTQ0XSxcclxuICAgICAgICAgIGxpZ2h0Z3JleTogWzIxMSwgMjExLCAyMTFdLFxyXG4gICAgICAgICAgbGlnaHRwaW5rOiBbMjU1LCAxODIsIDE5M10sXHJcbiAgICAgICAgICBsaWdodHNhbG1vbjogWzI1NSwgMTYwLCAxMjJdLFxyXG4gICAgICAgICAgbGlnaHRzZWFncmVlbjogWzMyLCAxNzgsIDE3MF0sXHJcbiAgICAgICAgICBsaWdodHNreWJsdWU6IFsxMzUsIDIwNiwgMjUwXSxcclxuICAgICAgICAgIGxpZ2h0c2xhdGVncmF5OiBbMTE5LCAxMzYsIDE1M10sXHJcbiAgICAgICAgICBsaWdodHNsYXRlZ3JleTogWzExOSwgMTM2LCAxNTNdLFxyXG4gICAgICAgICAgbGlnaHRzdGVlbGJsdWU6IFsxNzYsIDE5NiwgMjIyXSxcclxuICAgICAgICAgIGxpZ2h0eWVsbG93OiBbMjU1LCAyNTUsIDIyNF0sXHJcbiAgICAgICAgICBsaW1lOiBbMCwgMjU1LCAwXSxcclxuICAgICAgICAgIGxpbWVncmVlbjogWzUwLCAyMDUsIDUwXSxcclxuICAgICAgICAgIGxpbmVuOiBbMjUwLCAyNDAsIDIzMF0sXHJcbiAgICAgICAgICBtYWdlbnRhOiBbMjU1LCAwLCAyNTVdLFxyXG4gICAgICAgICAgbWFyb29uOiBbMTI4LCAwLCAwXSxcclxuICAgICAgICAgIG1lZGl1bWFxdWFtYXJpbmU6IFsxMDIsIDIwNSwgMTcwXSxcclxuICAgICAgICAgIG1lZGl1bWJsdWU6IFswLCAwLCAyMDVdLFxyXG4gICAgICAgICAgbWVkaXVtb3JjaGlkOiBbMTg2LCA4NSwgMjExXSxcclxuICAgICAgICAgIG1lZGl1bXB1cnBsZTogWzE0NywgMTEyLCAyMTldLFxyXG4gICAgICAgICAgbWVkaXVtc2VhZ3JlZW46IFs2MCwgMTc5LCAxMTNdLFxyXG4gICAgICAgICAgbWVkaXVtc2xhdGVibHVlOiBbMTIzLCAxMDQsIDIzOF0sXHJcbiAgICAgICAgICBtZWRpdW1zcHJpbmdncmVlbjogWzAsIDI1MCwgMTU0XSxcclxuICAgICAgICAgIG1lZGl1bXR1cnF1b2lzZTogWzcyLCAyMDksIDIwNF0sXHJcbiAgICAgICAgICBtZWRpdW12aW9sZXRyZWQ6IFsxOTksIDIxLCAxMzNdLFxyXG4gICAgICAgICAgbWlkbmlnaHRibHVlOiBbMjUsIDI1LCAxMTJdLFxyXG4gICAgICAgICAgbWludGNyZWFtOiBbMjQ1LCAyNTUsIDI1MF0sXHJcbiAgICAgICAgICBtaXN0eXJvc2U6IFsyNTUsIDIyOCwgMjI1XSxcclxuICAgICAgICAgIG1vY2Nhc2luOiBbMjU1LCAyMjgsIDE4MV0sXHJcbiAgICAgICAgICBuYXZham93aGl0ZTogWzI1NSwgMjIyLCAxNzNdLFxyXG4gICAgICAgICAgbmF2eTogWzAsIDAsIDEyOF0sXHJcbiAgICAgICAgICBvbGRsYWNlOiBbMjUzLCAyNDUsIDIzMF0sXHJcbiAgICAgICAgICBvbGl2ZTogWzEyOCwgMTI4LCAwXSxcclxuICAgICAgICAgIG9saXZlZHJhYjogWzEwNywgMTQyLCAzNV0sXHJcbiAgICAgICAgICBvcmFuZ2U6IFsyNTUsIDE2NSwgMF0sXHJcbiAgICAgICAgICBvcmFuZ2VyZWQ6IFsyNTUsIDY5LCAwXSxcclxuICAgICAgICAgIG9yY2hpZDogWzIxOCwgMTEyLCAyMTRdLFxyXG4gICAgICAgICAgcGFsZWdvbGRlbnJvZDogWzIzOCwgMjMyLCAxNzBdLFxyXG4gICAgICAgICAgcGFsZWdyZWVuOiBbMTUyLCAyNTEsIDE1Ml0sXHJcbiAgICAgICAgICBwYWxldHVycXVvaXNlOiBbMTc1LCAyMzgsIDIzOF0sXHJcbiAgICAgICAgICBwYWxldmlvbGV0cmVkOiBbMjE5LCAxMTIsIDE0N10sXHJcbiAgICAgICAgICBwYXBheWF3aGlwOiBbMjU1LCAyMzksIDIxM10sXHJcbiAgICAgICAgICBwZWFjaHB1ZmY6IFsyNTUsIDIxOCwgMTg1XSxcclxuICAgICAgICAgIHBlcnU6IFsyMDUsIDEzMywgNjNdLFxyXG4gICAgICAgICAgcGluazogWzI1NSwgMTkyLCAyMDNdLFxyXG4gICAgICAgICAgcGx1bTogWzIyMSwgMTYwLCAyMjFdLFxyXG4gICAgICAgICAgcG93ZGVyYmx1ZTogWzE3NiwgMjI0LCAyMzBdLFxyXG4gICAgICAgICAgcHVycGxlOiBbMTI4LCAwLCAxMjhdLFxyXG4gICAgICAgICAgcmViZWNjYXB1cnBsZTogWzEwMiwgNTEsIDE1M10sXHJcbiAgICAgICAgICByZWQ6IFsyNTUsIDAsIDBdLFxyXG4gICAgICAgICAgcm9zeWJyb3duOiBbMTg4LCAxNDMsIDE0M10sXHJcbiAgICAgICAgICByb3lhbGJsdWU6IFs2NSwgMTA1LCAyMjVdLFxyXG4gICAgICAgICAgc2FkZGxlYnJvd246IFsxMzksIDY5LCAxOV0sXHJcbiAgICAgICAgICBzYWxtb246IFsyNTAsIDEyOCwgMTE0XSxcclxuICAgICAgICAgIHNhbmR5YnJvd246IFsyNDQsIDE2NCwgOTZdLFxyXG4gICAgICAgICAgc2VhZ3JlZW46IFs0NiwgMTM5LCA4N10sXHJcbiAgICAgICAgICBzZWFzaGVsbDogWzI1NSwgMjQ1LCAyMzhdLFxyXG4gICAgICAgICAgc2llbm5hOiBbMTYwLCA4MiwgNDVdLFxyXG4gICAgICAgICAgc2lsdmVyOiBbMTkyLCAxOTIsIDE5Ml0sXHJcbiAgICAgICAgICBza3libHVlOiBbMTM1LCAyMDYsIDIzNV0sXHJcbiAgICAgICAgICBzbGF0ZWJsdWU6IFsxMDYsIDkwLCAyMDVdLFxyXG4gICAgICAgICAgc2xhdGVncmF5OiBbMTEyLCAxMjgsIDE0NF0sXHJcbiAgICAgICAgICBzbGF0ZWdyZXk6IFsxMTIsIDEyOCwgMTQ0XSxcclxuICAgICAgICAgIHNub3c6IFsyNTUsIDI1MCwgMjUwXSxcclxuICAgICAgICAgIHNwcmluZ2dyZWVuOiBbMCwgMjU1LCAxMjddLFxyXG4gICAgICAgICAgc3RlZWxibHVlOiBbNzAsIDEzMCwgMTgwXSxcclxuICAgICAgICAgIHRhbjogWzIxMCwgMTgwLCAxNDBdLFxyXG4gICAgICAgICAgdGVhbDogWzAsIDEyOCwgMTI4XSxcclxuICAgICAgICAgIHRoaXN0bGU6IFsyMTYsIDE5MSwgMjE2XSxcclxuICAgICAgICAgIHRvbWF0bzogWzI1NSwgOTksIDcxXSxcclxuICAgICAgICAgIHR1cnF1b2lzZTogWzY0LCAyMjQsIDIwOF0sXHJcbiAgICAgICAgICB2aW9sZXQ6IFsyMzgsIDEzMCwgMjM4XSxcclxuICAgICAgICAgIHdoZWF0OiBbMjQ1LCAyMjIsIDE3OV0sXHJcbiAgICAgICAgICB3aGl0ZTogWzI1NSwgMjU1LCAyNTVdLFxyXG4gICAgICAgICAgd2hpdGVzbW9rZTogWzI0NSwgMjQ1LCAyNDVdLFxyXG4gICAgICAgICAgeWVsbG93OiBbMjU1LCAyNTUsIDBdLFxyXG4gICAgICAgICAgeWVsbG93Z3JlZW46IFsxNTQsIDIwNSwgNTBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgICBJID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgXyBpbiBSKSBJW0pTT04uc3RyaW5naWZ5KFJbX10pXSA9IF87XHJcbiAgICAgIH0sXHJcbiAgICAgIGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgdmFyIHIgPVxyXG4gICAgICAgICAgKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHxcclxuICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChyID1cclxuICAgICAgICAgICAgICBPYmplY3QuYXNzaWduIHx8XHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGUsIG4gPSAxLCByID0gYXJndW1lbnRzLmxlbmd0aDsgbiA8IHI7IG4rKykgZm9yICh2YXIgaSBpbiAoZSA9IGFyZ3VtZW50c1tuXSkpIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLCBpKSAmJiAodFtpXSA9IGVbaV0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgICAgfSkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBpID1cclxuICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5cykgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIGZvciAodmFyIHQgPSAwLCBlID0gMCwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGUgPCBuOyBlKyspIHQgKz0gYXJndW1lbnRzW2VdLmxlbmd0aDtcclxuICAgICAgICAgICAgICB2YXIgciA9IEFycmF5KHQpLFxyXG4gICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgICAgZm9yIChlID0gMDsgZSA8IG47IGUrKykgZm9yICh2YXIgbyA9IGFyZ3VtZW50c1tlXSwgYSA9IDAsIHMgPSBvLmxlbmd0aDsgYSA8IHM7IGErKywgaSsrKSByW2ldID0gb1thXTtcclxuICAgICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6ICEwIH0pO1xyXG4gICAgICAgIHZhciBvID0gbigxKSxcclxuICAgICAgICAgIGEgPSBbXCJ0ZXh0YXJlYVwiLCBcImlucHV0XCJdLFxyXG4gICAgICAgICAgcyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHQodCwgZSkge1xyXG4gICAgICAgICAgICAgIHZhciBuID0gdGhpcztcclxuICAgICAgICAgICAgICAodGhpcy5kcmFnU3RhcnRlZCA9ICExKSxcclxuICAgICAgICAgICAgICAgICh0aGlzLnBpbmNoRmxhZyA9ICExKSxcclxuICAgICAgICAgICAgICAgICh0aGlzLmRhdGFzID0ge30pLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuaXNEcmFnID0gITEpLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuaXNQaW5jaCA9ICExKSxcclxuICAgICAgICAgICAgICAgICh0aGlzLmlzTW91c2UgPSAhMSksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5pc1RvdWNoID0gITEpLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMucHJldkNsaWVudHMgPSBbXSksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5zdGFydENsaWVudHMgPSBbXSksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5tb3ZlbWVudCA9IDApLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuc3RhcnRQaW5jaENsaWVudHMgPSBbXSksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5zdGFydERpc3RhbmNlID0gMCksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5jdXN0b21EaXN0ID0gWzAsIDBdKSxcclxuICAgICAgICAgICAgICAgICh0aGlzLnRhcmdldHMgPSBbXSksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5wcmV2VGltZSA9IDApLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuaXNEb3VibGUgPSAhMSksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5zdGFydFJvdGF0ZSA9IDApLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuc2hvdzM2MCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJqc3Ytc2hvdy0zNjBcIik7XHJcbiAgICAgICAgICAgICAgICB9KShcclxuICAgICAgICAgICAgICAgICAgKHRoaXMub25EcmFnQ2FuY2VsID0gZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgKHRoaXMub25EcmFnU3RhcnQgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFuLnNob3czNjAoKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgaWYgKCh2b2lkIDAgPT09IGUgJiYgKGUgPSAhMCksIHQuc3RvcFByb3BhZ2F0aW9uKCksIG4uZHJhZ1N0YXJ0ZWQgfHwgdC5jYW5jZWxhYmxlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gbi5vcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcyA9IGkuY29udGFpbmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdSA9IGkucGluY2hPdXRzaWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYyA9IGkuZHJhZ3N0YXJ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgbCA9IGkucHJldmVudFJpZ2h0Q2xpY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICBkID0gaS5wcmV2ZW50RGVmYXVsdCxcclxuICAgICAgICAgICAgICAgICAgICAgIGggPSBpLmNoZWNrSW5wdXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgJiYgdC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmID0gbi5pc1RvdWNoO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbi5kcmFnU3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGcgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwID0gdC50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG0gPSBwLnRhZ05hbWUudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdiA9IGEuaW5kZXhPZihtKSA+IC0xLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gcC5pc0NvbnRlbnRFZGl0YWJsZTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmICh2IHx8IHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGggfHwgZyA9PT0gcCkgcmV0dXJuICExO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZyAmJiB5ICYmIGcuaXNDb250ZW50RWRpdGFibGUgJiYgZy5jb250YWlucyhwKSkgcmV0dXJuICExO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgoZCB8fCBcInRvdWNoc3RhcnRcIiA9PT0gdC50eXBlKSAmJiBnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiID0gZy50YWdOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoZy5pc0NvbnRlbnRFZGl0YWJsZSB8fCBhLmluZGV4T2YoYikgPiAtMSkgJiYgZy5ibHVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB3ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAoIW4uZHJhZ1N0YXJ0ZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgZiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh3ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgby5hZGRFdmVudChzLCBcInRvdWNoc3RhcnRcIiwgbi5vbkRyYWdTdGFydCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2l2ZTogITEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4uZHJhZ1N0YXJ0ZWQgJiYgZiAmJiB1ICYmIG8ucmVtb3ZlRXZlbnQocywgXCJ0b3VjaHN0YXJ0XCIsIG4ub25EcmFnU3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmICYmIG8uaXNNdWx0aVRvdWNoKHQpKVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKChjbGVhclRpbWVvdXQodyksICFuLmRyYWdTdGFydGVkICYmIHQudG91Y2hlcy5sZW5ndGggIT09IHQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgbi5waW5jaEZsYWcgfHwgbi5vblBpbmNoU3RhcnQodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbi5kcmFnU3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHggPSBuLnN0YXJ0Q2xpZW50c1swXSA/IG4uc3RhcnRDbGllbnRzIDogby5nZXRQb3NpdGlvbkV2ZW50KHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgKG4uY3VzdG9tRGlzdCA9IFswLCAwXSksIChuLmRyYWdTdGFydGVkID0gITApLCAobi5pc0RyYWcgPSAhMSksIChuLnN0YXJ0Q2xpZW50cyA9IHgpLCAobi5wcmV2Q2xpZW50cyA9IHgpLCAobi5kYXRhcyA9IHt9KSwgKG4ubW92ZW1lbnQgPSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHZhciBFID0gby5nZXRQb3NpdGlvbih4WzBdLCBuLnByZXZDbGllbnRzWzBdLCBuLnN0YXJ0Q2xpZW50c1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgJiYgbCAmJiAoMyA9PT0gdC53aGljaCB8fCAyID09PSB0LmJ1dHRvbikpIHJldHVybiBjbGVhclRpbWVvdXQodyksIG4uaW5pdERyYWcoKSwgITE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAhMSA9PT1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKGMgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZHJhZ3N0YXJ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YXM6IG4uZGF0YXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRFdmVudDogdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1RydXN0ZWQ6IGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICApKSAmJiAoY2xlYXJUaW1lb3V0KHcpLCBuLmluaXREcmFnKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAobi5pc0RvdWJsZSA9IG8ubm93KCkgLSBuLnByZXZUaW1lIDwgMjAwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbi5kcmFnU3RhcnRlZCAmJiBkICYmIHQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIHQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgIC8vIHQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KSwgKHRoaXMub25QYXNzaXZlRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uICgpIHsgfTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAoKSB7IH07XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5vbkRyYWcgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoIW4uc2hvdzM2MCgpKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0LnN0b3BQcm9wYWdhdGlvbigpLCAhKHQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmIDAgPT09IHQuYnV0dG9ucykgJiYgKCFuLmRyYWdTdGFydGVkICYmIDEgPT09IHQuYnV0dG9ucyAmJiB0IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJiBuLm9uRHJhZ1N0YXJ0KHQpLCBuLmRyYWdTdGFydGVkKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gby5nZXRQb3NpdGlvbkV2ZW50KHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgbi5waW5jaEZsYWcgJiYgbi5vblBpbmNoKHQsIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSBuLm1vdmUoWzAsIDBdLCB0LCBpKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChhICYmIChhLmRlbHRhWCB8fCBhLmRlbHRhWSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSBuLm9wdGlvbnMuZHJhZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcyAmJiBzKHIocih7fSwgYSksIHsgaXNTY3JvbGw6ICEhZSwgaW5wdXRFdmVudDogdCB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICh0aGlzLm9uRHJhZ0VuZCA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmICghbi5zaG93MzYwKCkpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHQuc3RvcFByb3BhZ2F0aW9uKCksIG4uZHJhZ1N0YXJ0ZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuLmRyYWdTdGFydGVkID0gITE7XHJcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IG4ub3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGUuZHJhZ2VuZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYSA9IGUucGluY2hPdXRzaWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzID0gZS5jb250YWluZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuLmlzVG91Y2ggJiYgYSAmJiBvLnJlbW92ZUV2ZW50KHMsIFwidG91Y2hzdGFydFwiLCBuLm9uRHJhZ1N0YXJ0KSwgbi5waW5jaEZsYWcgJiYgbi5vblBpbmNoRW5kKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHUgPSBuLnByZXZDbGllbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gbi5zdGFydENsaWVudHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGwgPSBuLnBpbmNoRmxhZyA/IG8uZ2V0UGluY2hEcmFnUG9zaXRpb24odSwgdSwgYywgbi5zdGFydFBpbmNoQ2xpZW50cykgOiBvLmdldFBvc2l0aW9uKHVbMF0sIHVbMF0sIGNbMF0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkID0gby5ub3coKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaCA9ICFuLmlzRHJhZyAmJiBuLmlzRG91YmxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgKG4ucHJldlRpbWUgPSBuLmlzRHJhZyB8fCBoID8gMCA6IGQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAobi5zdGFydENsaWVudHMgPSBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChuLnByZXZDbGllbnRzID0gW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJkcmFnZW5kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFzOiBuLmRhdGFzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0RvdWJsZTogaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNEcmFnOiBuLmlzRHJhZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRFdmVudDogdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5vcHRpb25zID0gcihcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrSW5wdXQ6ICExLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogdC5sZW5ndGggPiAxID8gKFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIHdpbmRvdyA/IHdpbmRvdyA6IG5ldyBIVE1MRGl2RWxlbWVudCgpKSA6IHRbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudFJpZ2h0Q2xpY2s6ICEwLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiAhMCxcclxuICAgICAgICAgICAgICAgICAgICBwaW5jaFRocmVzaG9sZDogMCxcclxuICAgICAgICAgICAgICAgICAgICBwaW5jaDogdGhpcy5waW5jaCxcclxuICAgICAgICAgICAgICAgICAgICBwaW5jaHN0YXJ0OiB0aGlzLnBpbmNoc3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIGVcclxuICAgICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICAgIHZhciBpID0gdGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgcyA9IGkuY29udGFpbmVyLFxyXG4gICAgICAgICAgICAgICAgdSA9IGkuZXZlbnRzO1xyXG4gICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICgodGhpcy5pc1RvdWNoID0gdS5pbmRleE9mKFwidG91Y2hcIikgPiAtMSksXHJcbiAgICAgICAgICAgICAgICAgICh0aGlzLmlzTW91c2UgPSB1LmluZGV4T2YoXCJtb3VzZVwiKSA+IC0xKSxcclxuICAgICAgICAgICAgICAgICAgKHRoaXMuY3VzdG9tRGlzdCA9IFswLCAwXSksXHJcbiAgICAgICAgICAgICAgICAgICh0aGlzLnRhcmdldHMgPSB0KSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5pc01vdXNlICYmXHJcbiAgICAgICAgICAgICAgICAgIChvLmFkZEV2ZW50KHMsIFwibW91c2Vkb3duXCIsIHRoaXMub25EcmFnU3RhcnQsIHsgY2FwdHVyZTogITAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgby5hZGRFdmVudChzLCBcIm1vdXNlbW92ZVwiLCB0aGlzLm9uRHJhZywgeyBjYXB0dXJlOiAhMCB9KSxcclxuICAgICAgICAgICAgICAgICAgICBvLmFkZEV2ZW50KHMsIFwibW91c2VsZWF2ZVwiLCB0aGlzLm9uRHJhZ0VuZCwgeyBjYXB0dXJlOiAhMSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBvLmFkZEV2ZW50KHMsIFwibW91c2V1cFwiLCB0aGlzLm9uRHJhZ0VuZCwgeyBjYXB0dXJlOiAhMSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBvLmFkZEV2ZW50KHMsIFwiY29udGV4dG1lbnVcIiwgdGhpcy5vbkRyYWdFbmQsIHsgY2FwdHVyZTogITEgfSkpLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLmlzVG91Y2gpXHJcbiAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYyA9IHsgcGFzc2l2ZTogITEsIGNhcHR1cmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICB0LmZvckVhY2goZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgby5hZGRFdmVudCh0LCBcInRvdWNoc3RhcnRcIiwgbi5vbkRyYWdTdGFydCwgYyk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgby5hZGRFdmVudChzLCBcInRvdWNoc3RhcnRcIiwgdGhpcy5vblBhc3NpdmVFdmVudCwgYyksXHJcbiAgICAgICAgICAgICAgICAgIG8uYWRkRXZlbnQocywgXCJ0b3VjaHN0YXJ0XCIsIG4ub25EcmFnU3RhcnQsIGMpLFxyXG4gICAgICAgICAgICAgICAgICBvLmFkZEV2ZW50KHMsIFwidG91Y2htb3ZlXCIsIHRoaXMub25EcmFnLCBjKSwgLy97IHBhc3NpdmU6ICEwLCBjYXB0dXJlOiB0cnVlIH0pLFxyXG4gICAgICAgICAgICAgICAgICBvLmFkZEV2ZW50KHMsIFwidG91Y2hlbmRcIiwgdGhpcy5vbkRyYWdFbmQsIGMpLFxyXG4gICAgICAgICAgICAgICAgICBvLmFkZEV2ZW50KHMsIFwidG91Y2hjYW5jZWxcIiwgdGhpcy5vbkRyYWdFbmQsIGMpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICAgICAgICAgIHZhciBpID0gdFswXSxcclxuICAgICAgICAgICAgICAgICAgYSA9IHRbMV07XHJcbiAgICAgICAgICAgICAgICB2b2lkIDAgPT09IG4gJiYgKG4gPSB0aGlzLnByZXZDbGllbnRzKSwgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHZhciBzID0gdGhpcy5jdXN0b21EaXN0LFxyXG4gICAgICAgICAgICAgICAgICB1ID0gdGhpcy5wcmV2Q2xpZW50cyxcclxuICAgICAgICAgICAgICAgICAgYyA9IHRoaXMuc3RhcnRDbGllbnRzLFxyXG4gICAgICAgICAgICAgICAgICBsID0gdGhpcy5waW5jaEZsYWcgPyBvLmdldFBpbmNoRHJhZ1Bvc2l0aW9uKG4sIHUsIGMsIHRoaXMuc3RhcnRQaW5jaENsaWVudHMpIDogby5nZXRQb3NpdGlvbihuWzBdLCB1WzBdLCBjWzBdKTtcclxuICAgICAgICAgICAgICAgIChzWzBdICs9IGkpLCAoc1sxXSArPSBhKSwgKGwuZGVsdGFYICs9IGkpLCAobC5kZWx0YVkgKz0gYSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZCA9IGwuZGVsdGFYLFxyXG4gICAgICAgICAgICAgICAgICBoID0gbC5kZWx0YVk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAobC5kaXN0WCArPSBzWzBdKSxcclxuICAgICAgICAgICAgICAgICAgKGwuZGlzdFkgKz0gc1sxXSksXHJcbiAgICAgICAgICAgICAgICAgICh0aGlzLm1vdmVtZW50ICs9IE1hdGguc3FydChkICogZCArIGggKiBoKSksXHJcbiAgICAgICAgICAgICAgICAgICh0aGlzLnByZXZDbGllbnRzID0gbiksXHJcbiAgICAgICAgICAgICAgICAgICh0aGlzLmlzRHJhZyA9ICEwKSxcclxuICAgICAgICAgICAgICAgICAgcihyKHsgdHlwZTogXCJkcmFnXCIsIGRhdGFzOiB0aGlzLmRhdGFzIH0sIGwpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnQ6IHRoaXMubW92ZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNEcmFnOiB0aGlzLmlzRHJhZyxcclxuICAgICAgICAgICAgICAgICAgICBpc1BpbmNoOiB0aGlzLmlzUGluY2gsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNTY3JvbGw6ICExLFxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0RXZlbnQ6IGUsXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5vblBpbmNoU3RhcnQgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGUsIG47XHJcbiAgICAgICAgICAgICAgICB0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGEgPSB0aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgIHMgPSBhLnBpbmNoc3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgIHUgPSBhLnBpbmNoVGhyZXNob2xkO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEodGhpcy5pc0RyYWcgJiYgdGhpcy5tb3ZlbWVudCA+IHUpKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBjID0gby5nZXRDbGllbnRzKHQuY2hhbmdlZFRvdWNoZXMpO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoKCh0aGlzLnBpbmNoRmxhZyA9ICEwKSwgKGUgPSB0aGlzLnN0YXJ0Q2xpZW50cykucHVzaC5hcHBseShlLCBjKSwgKG4gPSB0aGlzLnByZXZDbGllbnRzKS5wdXNoLmFwcGx5KG4sIGMpLCAodGhpcy5zdGFydERpc3RhbmNlID0gby5nZXREaXN0KHRoaXMucHJldkNsaWVudHMpKSwgKHRoaXMuc3RhcnRQaW5jaENsaWVudHMgPSBpKHRoaXMucHJldkNsaWVudHMpKSwgcykpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbCA9IHRoaXMucHJldkNsaWVudHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICBkID0gby5nZXRBdmVyYWdlQ2xpZW50KGwpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaCA9IG8uZ2V0UG9zaXRpb24oZCwgZCwgZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuc3RhcnRSb3RhdGUgPSBvLmdldFJvdGF0aW9uKGwpKSxcclxuICAgICAgICAgICAgICAgICAgICAgIHMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJwaW5jaHN0YXJ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFzOiB0aGlzLmRhdGFzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmdsZTogdGhpcy5zdGFydFJvdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hlczogby5nZXRQb3NpdGlvbnMobCwgbCwgbCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyBpbnB1dEV2ZW50OiB0IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5vblBpbmNoID0gZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdTdGFydGVkICYmIHRoaXMucGluY2hGbGFnICYmICEoZS5sZW5ndGggPCAyKSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmlzUGluY2ggPSAhMDtcclxuICAgICAgICAgICAgICAgICAgdmFyIG4gPSB0aGlzLm9wdGlvbnMucGluY2g7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSB0aGlzLnByZXZDbGllbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYSA9IHRoaXMuc3RhcnRDbGllbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcyA9IG8uZ2V0UG9zaXRpb24oby5nZXRBdmVyYWdlQ2xpZW50KGUpLCBvLmdldEF2ZXJhZ2VDbGllbnQoaSksIG8uZ2V0QXZlcmFnZUNsaWVudChhKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICB1ID0gby5nZXRSb3RhdGlvbihlKSxcclxuICAgICAgICAgICAgICAgICAgICAgIGMgPSBvLmdldERpc3QoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbihcclxuICAgICAgICAgICAgICAgICAgICAgIHIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJwaW5jaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YXM6IHRoaXMuZGF0YXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlbWVudDogdGhpcy5tb3ZlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZ2xlOiB1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRpb246IHUgLSB0aGlzLnN0YXJ0Um90YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hlczogby5nZXRQb3NpdGlvbnMoZSwgaSwgYSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogYyAvIHRoaXMuc3RhcnREaXN0YW5jZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlOiBjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlucHV0RXZlbnQ6IHQgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUub25QaW5jaEVuZCA9IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmFnU3RhcnRlZCAmJiB0aGlzLnBpbmNoRmxhZykge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgZSA9IHRoaXMuaXNQaW5jaDtcclxuICAgICAgICAgICAgICAgICAgKHRoaXMuaXNQaW5jaCA9ICExKSwgKHRoaXMucGluY2hGbGFnID0gITEpO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbiA9IHRoaXMub3B0aW9ucy5waW5jaGVuZDtcclxuICAgICAgICAgICAgICAgICAgaWYgKG4pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IHRoaXMucHJldkNsaWVudHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICBhID0gdGhpcy5zdGFydENsaWVudHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICBzID0gby5nZXRQb3NpdGlvbihvLmdldEF2ZXJhZ2VDbGllbnQoaSksIG8uZ2V0QXZlcmFnZUNsaWVudChpKSwgby5nZXRBdmVyYWdlQ2xpZW50KGEpKTtcclxuICAgICAgICAgICAgICAgICAgICBuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInBpbmNoZW5kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhczogdGhpcy5kYXRhcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUGluY2g6IGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaGVzOiBvLmdldFBvc2l0aW9ucyhpLCBpLCBhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpbnB1dEV2ZW50OiB0IH1cclxuICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgKHRoaXMuaXNQaW5jaCA9ICExKSxcclxuICAgICAgICAgICAgICAgICAgICAgICh0aGlzLnBpbmNoRmxhZyA9ICExKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgKHRoaXMuaXNQaW5jaCA9ICExKSxcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5waW5jaEZsYWcgPSAhMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLnRyaWdnZXJEcmFnU3RhcnQgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkRyYWdTdGFydCh0LCAhMSk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLnVuc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICBlID0gdGhpcy50YXJnZXRzLFxyXG4gICAgICAgICAgICAgICAgICBuID0gdGhpcy5vcHRpb25zLmNvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNNb3VzZSAmJlxyXG4gICAgICAgICAgICAgICAgICAoZS5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5yZW1vdmVFdmVudChlLCBcIm1vdXNlZG93blwiLCB0Lm9uRHJhZ1N0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgby5yZW1vdmVFdmVudChuLCBcIm1vdXNlbW92ZVwiLCB0aGlzLm9uRHJhZyksXHJcbiAgICAgICAgICAgICAgICAgICAgby5yZW1vdmVFdmVudChuLCBcIm1vdXNldXBcIiwgdGhpcy5vbkRyYWdFbmQpLFxyXG4gICAgICAgICAgICAgICAgICAgIG8ucmVtb3ZlRXZlbnQobiwgXCJjb250ZXh0bWVudVwiLCB0aGlzLm9uRHJhZ0VuZCkpLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLmlzVG91Y2ggJiZcclxuICAgICAgICAgICAgICAgICAgKGUuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG8ucmVtb3ZlRXZlbnQoZSwgXCJ0b3VjaHN0YXJ0XCIsIHQub25EcmFnU3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBvLnJlbW92ZUV2ZW50KG4sIFwidG91Y2hzdGFydFwiLCB0aGlzLm9uRHJhZ1N0YXJ0KSxcclxuICAgICAgICAgICAgICAgICAgICBvLnJlbW92ZUV2ZW50KG4sIFwidG91Y2htb3ZlXCIsIHRoaXMub25EcmFnKSxcclxuICAgICAgICAgICAgICAgICAgICBvLnJlbW92ZUV2ZW50KG4sIFwidG91Y2hlbmRcIiwgdGhpcy5vbkRyYWdFbmQpLFxyXG4gICAgICAgICAgICAgICAgICAgIG8ucmVtb3ZlRXZlbnQobiwgXCJ0b3VjaGNhbmNlbFwiLCB0aGlzLm9uRHJhZ0VuZCkpO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5pbml0RHJhZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICh0aGlzLnN0YXJ0Q2xpZW50cyA9IFtdKSwgKHRoaXMucHJldkNsaWVudHMgPSBbXSksICh0aGlzLmRyYWdTdGFydGVkID0gITEpO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgIHRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgZS5kZWZhdWx0ID0gcztcclxuICAgICAgfSxcclxuICAgICAgZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6ICEwIH0pO1xyXG4gICAgICAgIHZhciByID0gbig0KSxcclxuICAgICAgICAgIGkgPSB7XHJcbiAgICAgICAgICAgIGxvYWRJbWFnZTogci5zbG90KCksXHJcbiAgICAgICAgICAgIHN0YXJ0ZWQ6IHIuc2xvdCgpLFxyXG4gICAgICAgICAgICBzdGFydERyYWdnaW5nOiByLnNsb3QoKSxcclxuICAgICAgICAgICAgY2hhbmdlSW1hZ2U6IHIuc2xvdCgpLFxyXG4gICAgICAgICAgICBlbmRBdXRvUm90YXRlOiByLnNsb3QoKSxcclxuICAgICAgICAgICAgY2xpY2s6IHIuc2xvdCgpLFxyXG4gICAgICAgICAgICBwaW5jaDogci5zbG90KCksXHJcbiAgICAgICAgICAgIHNjcm9sbDogci5zbG90KCksXHJcbiAgICAgICAgICAgIGRvdWJsZUNsaWNrOiByLnNsb3QoKSxcclxuICAgICAgICAgICAgem9vbUNoYW5nZWQ6IHIuc2xvdCgpLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICBlLmRlZmF1bHQgPSBpO1xyXG4gICAgICB9LFxyXG4gICAgICBmdW5jdGlvbiAodCwgZSwgbikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogITAgfSk7XHJcbiAgICAgICAgdmFyIHIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgZnVuY3Rpb24gdCh0LCBlKSB7XHJcbiAgICAgICAgICAgICh0aGlzLmJhciA9IGUpLCAodGhpcy5wID0gdCksIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgKHQucHJvdG90eXBlLnJlZnJlc2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5iYXIuc3R5bGUud2lkdGggPSB0aGlzLnAgKyBcIiVcIjtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICh0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICh0aGlzLnAgPSB0KSwgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgZS5kZWZhdWx0ID0gcjtcclxuICAgICAgfSxcclxuICAgICAgZnVuY3Rpb24gKHQsIGUsIG4pIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6ICEwIH0pLCAoZS5EZWZhdWx0Wm9vbSA9IHZvaWQgMCk7XHJcbiAgICAgICAgdmFyIHIgPSBuKDE5KSxcclxuICAgICAgICAgIGkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiB0KHQsIGUsIG4sIHIpIHtcclxuICAgICAgICAgICAgICAodGhpcy5wYW56b29tTG9hZGVkID0gITEpLCAodGhpcy5jdXJyZW50Wm9vbVNjYWxlID0gMSksICh0aGlzLnByZXZpb3VzUGluY2hEaXN0YW5jZSA9IDApLCAodGhpcy5zY3JlZW5YID0gMCksICh0aGlzLnNjcmVlblkgPSAwKSwgKHRoaXMud2luZG93ID0gdCksICh0aGlzLmltYWdlcyA9IGUpLCAodGhpcy5tYWluSG9sZGVyRWxlbWVudCA9IG4pLCAodGhpcy56b29tTWF4ID0gciksIHRoaXMuaW5pdFBhblpvb20oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5pbml0UGFuWm9vbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24gKGUsIG4pIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIHIsXHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IG51bGwgPT09IChyID0gdC53aW5kb3cpIHx8IHZvaWQgMCA9PT0gciA/IHZvaWQgMCA6IHIuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJcIiArIGUuaWQpO1xyXG4gICAgICAgICAgICAgICAgICBpICYmICh0LmltYWdlc1tuXS5weiA9IHQuZ2V0TW9iaWxlUGFuem9vbShpLCB0KSk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgKHRoaXMucGFuem9vbUxvYWRlZCA9ICEwKTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuaGFuZGxlWm9vbSA9IGZ1bmN0aW9uICh0LCBlLCBuLCByLCBpLCBqc3YsIGR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB2b2lkIDAgPT09IGkgJiYgKGkgPSAhMSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYSA9ICExO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFpvb21TY2FsZSArIHQgPiB0aGlzLnpvb21NYXgpIHtcclxuICAgICAgICAgICAgICAgICAgdCA9IHRoaXMuem9vbU1heCAtIHRoaXMuY3VycmVudFpvb21TY2FsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICh0aGlzLmN1cnJlbnRab29tU2NhbGUgPCAxICYmIHQgPCAwKSB8fFxyXG4gICAgICAgICAgICAgICAgICAodGhpcy5jdXJyZW50Wm9vbVNjYWxlICsgdCA+IHRoaXMuem9vbU1heCAmJiB0ID4gMCkgfHxcclxuICAgICAgICAgICAgICAgICAgKCh0aGlzLmN1cnJlbnRab29tU2NhbGUgKz0gdCksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Wm9vbVNjYWxlIDwgMS4zICYmIHQgPCAwICYmICgoZSA9IDApLCAobiA9IDApLCAoYSA9ICEwKSwgKGkgPSAhMCksICh0aGlzLnByZXZpb3VzUGluY2hEaXN0YW5jZSA9IDApLCAodGhpcy5jdXJyZW50Wm9vbVNjYWxlID0gMSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vKGkgPyB0aGlzLmltYWdlcyA6IFtuYXZpZ2F0b3IuaXNTYWZhcmkgPyByLmkwIDogcl0pLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAoW25hdmlnYXRvci5pc1NhZmFyaSA/IHIuaTAgOiByXSkuZm9yRWFjaChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHIsIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbnVsbCA9PT0gKGkgPSB0LnB6KSB8fCB2b2lkIDAgPT09IGkgfHwgaS5yZXNldCh7IGFuaW1hdGU6ICEwIH0sIGR1cmF0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwgPT09IChyID0gdC5weikgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCAwID09PSByIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIuem9vbShvLmN1cnJlbnRab29tU2NhbGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlOiAhMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBmb2NhbDogeyB4OiBlLCB5OiBuIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAvL2pzdi5vblpvb21DaGFuZ2VkKCk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLmhhbmRsZVBhbiA9IGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciByO1xyXG4gICAgICAgICAgICAgICAgICBudWxsID09PSAociA9IG4ucHopIHx8IHZvaWQgMCA9PT0gciB8fCByLnBhbih0LCBlLCB7IHJlbGF0aXZlOiAhMCwgYW5pbWF0ZTogITEgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuZ2V0TW9iaWxlUGFuem9vbSA9IGZ1bmN0aW9uICh0LCBqc3YpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByLmRlZmF1bHQodCwge1xyXG4gICAgICAgICAgICAgICAgICBjdXJzb3I6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgIG1heFNjYWxlOiB0aGlzLnpvb21NYXgsXHJcbiAgICAgICAgICAgICAgICAgIG1pblNjYWxlOiAxLFxyXG4gICAgICAgICAgICAgICAgICBzdGFydFg6IDAsXHJcbiAgICAgICAgICAgICAgICAgIHN0YXJ0WTogMCxcclxuICAgICAgICAgICAgICAgICAgYW5pbWF0ZTogITEsXHJcbiAgICAgICAgICAgICAgICAgIGNhbnZhczogITEsXHJcbiAgICAgICAgICAgICAgICAgIG5vQmluZDogITAsXHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVQYW46ICExLFxyXG4gICAgICAgICAgICAgICAgICBlYXNpbmc6IFwiZWFzZVwiLFxyXG4gICAgICAgICAgICAgICAgICBwYW5Pbmx5V2hlblpvb21lZDogITAsXHJcbiAgICAgICAgICAgICAgICAgIHRvdWNoQWN0aW9uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICBqc3Y6IGpzdlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLmdldFJlbGF0aXZlUG9zaXRpb24gPSBmdW5jdGlvbiAodCwgZSwgbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHIsXHJcbiAgICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgICBvID0gMCxcclxuICAgICAgICAgICAgICAgICAgYSA9IG51bGwgPT09IChyID0gdGhpcy5tYWluSG9sZGVyRWxlbWVudCkgfHwgdm9pZCAwID09PSByID8gdm9pZCAwIDogci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgIGlmIChhKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBzID0gdGhpcy53aW5kb3cucGFnZVhPZmZzZXQgKyAobnVsbCA9PSBhID8gdm9pZCAwIDogYS5sZWZ0KSxcclxuICAgICAgICAgICAgICAgICAgICB1ID0gdGhpcy53aW5kb3cucGFnZVlPZmZzZXQgKyAobnVsbCA9PSBhID8gdm9pZCAwIDogYS50b3ApO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKGkgPSBNYXRoLnJvdW5kKHQgLSBzIC0gYS53aWR0aCAvIDIpKSwgKG8gPSBNYXRoLnJvdW5kKGUgLSB1IC0gKGEuaGVpZ2h0IC0gYS5oZWlnaHQgLyAyKSkpLCBbaSAqIHRoaXMuY3VycmVudFpvb21TY2FsZSAqIDIsIG8gKiB0aGlzLmN1cnJlbnRab29tU2NhbGUgKiAyXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBbaSwgb107XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgKHQucHJvdG90eXBlLnBpbmNoID0gZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFuem9vbUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICB0Lm9yaWdpbmFsRXZlbnQuY2FuY2VsQnViYmxlID0gITA7XHJcbiAgICAgICAgICAgICAgICAgIHZhciByID0gbnVsbCA9PT0gKG4gPSB0aGlzLm1haW5Ib2xkZXJFbGVtZW50KSB8fCB2b2lkIDAgPT09IG4gPyB2b2lkIDAgOiBuLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGkgPSBNYXRoLnNxcnQoci53aWR0aCAqIHIud2lkdGggKyByLmhlaWdodCAqIHIuaGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICBvID0gdC5zY2FsZSAvIGk7XHJcbiAgICAgICAgICAgICAgICAgIGlmICh0LmZpcnN0IHx8IDAgPT09IHRoaXMucHJldmlvdXNQaW5jaERpc3RhbmNlKSB0aGlzLnByZXZpb3VzUGluY2hEaXN0YW5jZSA9IG87XHJcbiAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnNjcmVlblggPSAodC5vcmlnaW5hbEV2ZW50LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggKyB0Lm9yaWdpbmFsRXZlbnQudGFyZ2V0VG91Y2hlc1sxXS5wYWdlWCkgLyAyKSwgKHRoaXMuc2NyZWVuWSA9ICh0Lm9yaWdpbmFsRXZlbnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSArIHQub3JpZ2luYWxFdmVudC50YXJnZXRUb3VjaGVzWzFdLnBhZ2VZKSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhID0gbyAtIHRoaXMucHJldmlvdXNQaW5jaERpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGEgKj0gNDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IHRoaXMuZ2V0UmVsYXRpdmVQb3NpdGlvbih0aGlzLnNjcmVlblgsIHRoaXMuc2NyZWVuWSwgZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICB1ID0gc1swXSxcclxuICAgICAgICAgICAgICAgICAgICAgIGMgPSBzWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlWm9vbShhLCB1LCBjLCBlKSwgKHRoaXMucHJldmlvdXNQaW5jaERpc3RhbmNlID0gbyk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuc2Nyb2xsID0gZnVuY3Rpb24gKHQsIGUsIG4sIGpzdikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHIgPSB0Lm9yaWdpbmFsRXZlbnQuZGVsdGFZID4gMCA/IC0xIDogMTtcclxuICAgICAgICAgICAgICAgIHIgKj0gZSAvIDEwMDtcclxuICAgICAgICAgICAgICAgIHZhciBpID0gdC5vcmlnaW5hbEV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICBvID0gdGhpcy5nZXRSZWxhdGl2ZVBvc2l0aW9uKGkucGFnZVgsIGkucGFnZVksIG4pLFxyXG4gICAgICAgICAgICAgICAgICBhID0gb1swXSxcclxuICAgICAgICAgICAgICAgICAgcyA9IG9bMV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVpvb20ociwgYSwgcywgbiwgdCwganN2KTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuaXNab29tZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50Wm9vbVNjYWxlID4gMTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUucGFuID0gZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlUGFuKHQsIGUpO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICh0LCBqc3YsIGR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVpvb20oLTEgKiAodGhpcy5jdXJyZW50Wm9vbVNjYWxlIC0gMSksIDAsIDAsIHQsICEwLCBqc3YsIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAodC5wcm90b3R5cGUuem9vbU9uUGFnZSA9IGZ1bmN0aW9uICh0LCBlLCBuLCByKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISh0ID4gdGhpcy56b29tTWF4KSkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgaSA9IHRoaXMuZ2V0UmVsYXRpdmVQb3NpdGlvbihlLCBuLCByKSxcclxuICAgICAgICAgICAgICAgICAgICBvID0gaVswXSxcclxuICAgICAgICAgICAgICAgICAgICBhID0gaVsxXTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVab29tKHQgLSB0aGlzLmN1cnJlbnRab29tU2NhbGUsIG8sIGEsIHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICh0LnByb3RvdHlwZS56b29tID0gZnVuY3Rpb24gKHQsIGUsIG4sIHIsIGpzdiwgZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBpLCBvO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEodCA+IHRoaXMuem9vbU1heCkpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGEgPSB0aGlzLndpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChyLmlkKTtcclxuICAgICAgICAgICAgICAgICAgaWYgKGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRab29tU2NhbGUgPSB0O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzID0gMCAhPT0gZSA/IChlICogYS5jbGllbnRXaWR0aCkgLyB0aGlzLmN1cnJlbnRab29tU2NhbGUgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdSA9IDAgIT09IG4gPyAobiAqIGEuY2xpZW50SGVpZ2h0KSAvIHRoaXMuY3VycmVudFpvb21TY2FsZSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVsbCA9PT0gKGkgPSByLnB6KSB8fCB2b2lkIDAgPT09IGkgfHwgaS5wYW4ocywgdSwgeyBhbmltYXRlOiAhMCB9KSwgbnVsbCA9PT0gKG8gPSByLnB6KSB8fCB2b2lkIDAgPT09IG8gfHwgby56b29tKHRoaXMuY3VycmVudFpvb21TY2FsZSwgeyBhbmltYXRlOiAhMCB9LCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICB0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KSgpO1xyXG4gICAgICAgIGUuRGVmYXVsdFpvb20gPSBpO1xyXG4gICAgICB9LFxyXG4gICAgICBmdW5jdGlvbiAodCwgZSwgbikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIG4ucihlKTtcclxuICAgICAgICB2YXIgciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHJldHVybiAociA9XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24gfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICBmb3IgKHZhciBlLCBuID0gMSwgciA9IGFyZ3VtZW50cy5sZW5ndGg7IG4gPCByOyBuKyspIGZvciAodmFyIGkgaW4gKGUgPSBhcmd1bWVudHNbbl0pKSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSwgaSkgJiYgKHRbaV0gPSBlW2ldKTtcclxuICAgICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICAgICAgfSkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZ1bmN0aW9uIGkodCwgZSkge1xyXG4gICAgICAgICAgZm9yICh2YXIgbiA9IHQubGVuZ3RoOyBuLS07KSBpZiAodFtuXS5wb2ludGVySWQgPT09IGUucG9pbnRlcklkKSByZXR1cm4gbjtcclxuICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gbyh0LCBlKSB7XHJcbiAgICAgICAgICB2YXIgbjtcclxuICAgICAgICAgIGlmIChlLnRvdWNoZXMpIHtcclxuICAgICAgICAgICAgbiA9IDA7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHIgPSAwLCBhID0gZS50b3VjaGVzOyByIDwgYS5sZW5ndGg7IHIrKykge1xyXG4gICAgICAgICAgICAgIHZhciBzID0gYVtyXTtcclxuICAgICAgICAgICAgICAocy5wb2ludGVySWQgPSBuKyspLCBvKHQsIHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgKG4gPSBpKHQsIGUpKSA+IC0xICYmIHQuc3BsaWNlKG4sIDEpLCB0LnB1c2goZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGEodCkge1xyXG4gICAgICAgICAgZm9yICh2YXIgZSwgbiA9ICh0ID0gdC5zbGljZSgwKSkucG9wKCk7IChlID0gdC5wb3AoKSk7KVxyXG4gICAgICAgICAgICBuID0ge1xyXG4gICAgICAgICAgICAgIGNsaWVudFg6IChlLmNsaWVudFggLSBuLmNsaWVudFgpIC8gMiArIG4uY2xpZW50WCxcclxuICAgICAgICAgICAgICBjbGllbnRZOiAoZS5jbGllbnRZIC0gbi5jbGllbnRZKSAvIDIgKyBuLmNsaWVudFksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gcyh0KSB7XHJcbiAgICAgICAgICBpZiAodC5sZW5ndGggPCAyKSByZXR1cm4gMDtcclxuICAgICAgICAgIHZhciBlID0gdFswXSxcclxuICAgICAgICAgICAgbiA9IHRbMV07XHJcbiAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KE1hdGguYWJzKG4uY2xpZW50WCAtIGUuY2xpZW50WCksIDIpICsgTWF0aC5wb3coTWF0aC5hYnMobi5jbGllbnRZIC0gZS5jbGllbnRZKSwgMikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiB3aW5kb3cgJiZcclxuICAgICAgICAgICh3aW5kb3cuTm9kZUxpc3QgJiYgIU5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoICYmIChOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKSxcclxuICAgICAgICAgICAgXCJmdW5jdGlvblwiICE9IHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgJiZcclxuICAgICAgICAgICAgKHdpbmRvdy5DdXN0b21FdmVudCA9IGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgZSA9IGUgfHwgeyBidWJibGVzOiAhMSwgY2FuY2VsYWJsZTogITEsIGRldGFpbDogbnVsbCB9O1xyXG4gICAgICAgICAgICAgIHZhciBuID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcclxuICAgICAgICAgICAgICByZXR1cm4gbi5pbml0Q3VzdG9tRXZlbnQodCwgZS5idWJibGVzLCBlLmNhbmNlbGFibGUsIGUuZGV0YWlsKSwgbjtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIHZhciB1ID0ge1xyXG4gICAgICAgICAgZG93bjogXCJtb3VzZWRvd25cIixcclxuICAgICAgICAgIG1vdmU6IFwibW91c2Vtb3ZlXCIsXHJcbiAgICAgICAgICB1cDogXCJtb3VzZXVwIG1vdXNlbGVhdmVcIixcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZ1bmN0aW9uIGModCwgZSwgbiwgcikge1xyXG4gICAgICAgICAgdVt0XS5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICBlLmFkZEV2ZW50TGlzdGVuZXIodCwgbiwgcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gbCh0LCBlLCBuKSB7XHJcbiAgICAgICAgICB1W3RdLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0LCBuKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiB3aW5kb3cgJiZcclxuICAgICAgICAgIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHdpbmRvdy5Qb2ludGVyRXZlbnRcclxuICAgICAgICAgICAgPyAodSA9IHtcclxuICAgICAgICAgICAgICBkb3duOiBcInBvaW50ZXJkb3duXCIsXHJcbiAgICAgICAgICAgICAgbW92ZTogXCJwb2ludGVybW92ZVwiLFxyXG4gICAgICAgICAgICAgIHVwOiBcInBvaW50ZXJ1cCBwb2ludGVybGVhdmUgcG9pbnRlcmNhbmNlbFwiLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA6IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2Ygd2luZG93LlRvdWNoRXZlbnQgJiZcclxuICAgICAgICAgICAgKHUgPSB7XHJcbiAgICAgICAgICAgICAgZG93bjogXCJ0b3VjaHN0YXJ0XCIsXHJcbiAgICAgICAgICAgICAgbW92ZTogXCJ0b3VjaG1vdmVcIixcclxuICAgICAgICAgICAgICB1cDogXCJ0b3VjaGVuZCB0b3VjaGNhbmNlbFwiLFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgdmFyIGQsXHJcbiAgICAgICAgICBoID0gXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgZG9jdW1lbnQgJiYgISFkb2N1bWVudC5kb2N1bWVudE1vZGU7XHJcbiAgICAgICAgZnVuY3Rpb24gZigpIHtcclxuICAgICAgICAgIHJldHVybiBkIHx8IChkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKS5zdHlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBnID0gW1wid2Via2l0XCIsIFwibW96XCIsIFwibXNcIl0sXHJcbiAgICAgICAgICBwID0ge307XHJcbiAgICAgICAgZnVuY3Rpb24gbSh0KSB7XHJcbiAgICAgICAgICBpZiAocFt0XSkgcmV0dXJuIHBbdF07XHJcbiAgICAgICAgICB2YXIgZSA9IGYoKTtcclxuICAgICAgICAgIGlmICh0IGluIGUpIHJldHVybiAocFt0XSA9IHQpO1xyXG4gICAgICAgICAgZm9yICh2YXIgbiA9IHRbMF0udG9VcHBlckNhc2UoKSArIHQuc2xpY2UoMSksIHIgPSBnLmxlbmd0aDsgci0tOykge1xyXG4gICAgICAgICAgICB2YXIgaSA9IFwiXCIgKyBnW3JdICsgbjtcclxuICAgICAgICAgICAgaWYgKGkgaW4gZSkgcmV0dXJuIChwW3RdID0gaSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHYodCwgZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoZVttKHQpXSkgfHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24geSh0LCBlLCBuKSB7XHJcbiAgICAgICAgICB2b2lkIDAgPT09IG4gJiYgKG4gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0KSk7XHJcbiAgICAgICAgICB2YXIgciA9IFwiYm9yZGVyXCIgPT09IGUgPyBcIldpZHRoXCIgOiBcIlwiO1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGVmdDogdihlICsgXCJMZWZ0XCIgKyByLCBuKSxcclxuICAgICAgICAgICAgcmlnaHQ6IHYoZSArIFwiUmlnaHRcIiArIHIsIG4pLFxyXG4gICAgICAgICAgICB0b3A6IHYoZSArIFwiVG9wXCIgKyByLCBuKSxcclxuICAgICAgICAgICAgYm90dG9tOiB2KGUgKyBcIkJvdHRvbVwiICsgciwgbiksXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBiKHQsIGUsIG4sIGltcG9ydGFudCkge1xyXG4gICAgICAgICAgdC5zdHlsZS5zZXRQcm9wZXJ0eShtKGUpLCBuLCBpbXBvcnRhbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiB3KHQpIHtcclxuICAgICAgICAgIHZhciBlID0gdC5wYXJlbnROb2RlLFxyXG4gICAgICAgICAgICBuID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodCksXHJcbiAgICAgICAgICAgIHIgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlKSxcclxuICAgICAgICAgICAgaSA9IHQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICAgIG8gPSBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZWxlbToge1xyXG4gICAgICAgICAgICAgIHN0eWxlOiBuLFxyXG4gICAgICAgICAgICAgIHdpZHRoOiBpLndpZHRoLFxyXG4gICAgICAgICAgICAgIGhlaWdodDogaS5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgdG9wOiBpLnRvcCxcclxuICAgICAgICAgICAgICBib3R0b206IGkuYm90dG9tLFxyXG4gICAgICAgICAgICAgIGxlZnQ6IGkubGVmdCxcclxuICAgICAgICAgICAgICByaWdodDogaS5yaWdodCxcclxuICAgICAgICAgICAgICBtYXJnaW46IHkodCwgXCJtYXJnaW5cIiwgbiksXHJcbiAgICAgICAgICAgICAgYm9yZGVyOiB5KHQsIFwiYm9yZGVyXCIsIG4pLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwYXJlbnQ6IHtcclxuICAgICAgICAgICAgICBzdHlsZTogcixcclxuICAgICAgICAgICAgICB3aWR0aDogby53aWR0aCxcclxuICAgICAgICAgICAgICBoZWlnaHQ6IG8uaGVpZ2h0LFxyXG4gICAgICAgICAgICAgIHRvcDogby50b3AsXHJcbiAgICAgICAgICAgICAgYm90dG9tOiBvLmJvdHRvbSxcclxuICAgICAgICAgICAgICBsZWZ0OiBvLmxlZnQsXHJcbiAgICAgICAgICAgICAgcmlnaHQ6IG8ucmlnaHQsXHJcbiAgICAgICAgICAgICAgcGFkZGluZzogeShlLCBcInBhZGRpbmdcIiwgciksXHJcbiAgICAgICAgICAgICAgYm9yZGVyOiB5KGUsIFwiYm9yZGVyXCIsIHIpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24geCh0LCBlKSB7XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAxID09PSB0Lm5vZGVUeXBlICYmXHJcbiAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICBcIiBcIiArXHJcbiAgICAgICAgICAgICAgKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICAgICAgICAgIH0pKHQpICtcclxuICAgICAgICAgICAgICBcIiBcIlxyXG4gICAgICAgICAgICApLmluZGV4T2YoXCIgXCIgKyBlICsgXCIgXCIpID4gLTFcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBFID0gL15odHRwOltcXHdcXC5cXC9dK3N2ZyQvO1xyXG4gICAgICAgIHZhciBSID0ge1xyXG4gICAgICAgICAgYW5pbWF0ZTogITEsXHJcbiAgICAgICAgICBjYW52YXM6ICExLFxyXG4gICAgICAgICAgY3Vyc29yOiBcIm1vdmVcIixcclxuICAgICAgICAgIGRpc2FibGVQYW46ICExLFxyXG4gICAgICAgICAgZGlzYWJsZVpvb206ICExLFxyXG4gICAgICAgICAgZGlzYWJsZVhBeGlzOiAhMSxcclxuICAgICAgICAgIGRpc2FibGVZQXhpczogITEsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMjAwLFxyXG4gICAgICAgICAgZWFzaW5nOiBcImVhc2UtaW4tb3V0XCIsXHJcbiAgICAgICAgICBleGNsdWRlOiBbXSxcclxuICAgICAgICAgIGV4Y2x1ZGVDbGFzczogXCJwYW56b29tLWV4Y2x1ZGVcIixcclxuICAgICAgICAgIGhhbmRsZVN0YXJ0RXZlbnQ6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHQucHJldmVudERlZmF1bHQoKSwgdC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBtYXhTY2FsZTogNCxcclxuICAgICAgICAgIG1pblNjYWxlOiAwLjEyNSxcclxuICAgICAgICAgIG92ZXJmbG93OiBcImhpZGRlblwiLFxyXG4gICAgICAgICAgcGFuT25seVdoZW5ab29tZWQ6ICExLFxyXG4gICAgICAgICAgcmVsYXRpdmU6ICExLFxyXG4gICAgICAgICAgc2V0VHJhbnNmb3JtOiBmdW5jdGlvbiAodCwgZSwgbikge1xyXG4gICAgICAgICAgICB2YXIgciA9IGUueCxcclxuICAgICAgICAgICAgICBpID0gZS55LFxyXG4gICAgICAgICAgICAgIG8gPSBlLnNjYWxlLFxyXG4gICAgICAgICAgICAgIGEgPSBlLmlzU1ZHO1xyXG4gICAgICAgICAgICBpZiAodC5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgIT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgICBjb25zdCBpc1NjYWxlZCA9ICEhKG8gPiAxIHx8IHIgIT0gMCB8fCBpICE9IDApO1xyXG4gICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaXNTY2FsZWQsIFwib1wiLCBvLCBcInJcIiwgciwgXCJpXCIsIGkpO1xyXG4gICAgICAgICAgICAgIGlmIChpc1NjYWxlZCAhPSBSLmlzU2NhbGVkKSB7XHJcbiAgICAgICAgICAgICAgICBSLmlzU2NhbGVkID0gaXNTY2FsZWQ7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHQgPT4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJqc3YtMzYwLXNjYWxlZFwiLCBpc1NjYWxlZCksIGlzU2NhbGVkID8gMCA6IDMwMCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgoYih0LnBhcmVudE5vZGUsIFwidHJhbnNmb3JtXCIsIChvID09IDEgPyBcIlwiIDogXCJzY2FsZShcIiArIG8gKyBcIilcIikgKyAociA9PSAwICYmIGkgPT0gMCA/IFwiXCIgOiBcIiB0cmFuc2xhdGUoXCIgKyByICsgXCJweCwgXCIgKyBpICsgXCJweClcIikpLCBhICYmIGgpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0LnBhcmVudE5vZGUpLmdldFByb3BlcnR5VmFsdWUoXCJ0cmFuc2Zvcm1cIik7XHJcbiAgICAgICAgICAgICAgdC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCBzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHN0YXJ0WDogMCxcclxuICAgICAgICAgIHN0YXJ0WTogMCxcclxuICAgICAgICAgIHN0YXJ0U2NhbGU6IDEsXHJcbiAgICAgICAgICBzdGVwOiAwLjMsXHJcbiAgICAgICAgICB0b3VjaEFjdGlvbjogXCJub25lXCIsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmdW5jdGlvbiBJKHQsIGUpIHtcclxuICAgICAgICAgIGlmICghdCkgdGhyb3cgbmV3IEVycm9yKFwiUGFuem9vbSByZXF1aXJlcyBhbiBlbGVtZW50IGFzIGFuIGFyZ3VtZW50XCIpO1xyXG4gICAgICAgICAgaWYgKDEgIT09IHQubm9kZVR5cGUpIHRocm93IG5ldyBFcnJvcihcIlBhbnpvb20gcmVxdWlyZXMgYW4gZWxlbWVudCB3aXRoIGEgbm9kZVR5cGUgb2YgMVwiKTtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgIShmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgIHZhciBlID0gdC5vd25lckRvY3VtZW50LFxyXG4gICAgICAgICAgICAgICAgbiA9IHQucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgICByZXR1cm4gZSAmJiBuICYmIDkgPT09IGUubm9kZVR5cGUgJiYgMSA9PT0gbi5ub2RlVHlwZSAmJiBlLmRvY3VtZW50RWxlbWVudC5jb250YWlucyhuKTtcclxuICAgICAgICAgICAgfSkodClcclxuICAgICAgICAgIClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGFuem9vbSBzaG91bGQgYmUgY2FsbGVkIG9uIGVsZW1lbnRzIHRoYXQgaGF2ZSBiZWVuIGF0dGFjaGVkIHRvIHRoZSBET01cIik7XHJcbiAgICAgICAgICBlID0gcihyKHt9LCBSKSwgZSk7XHJcbiAgICAgICAgICB2YXIgbiA9IChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gRS50ZXN0KHQubmFtZXNwYWNlVVJJKSAmJiBcInN2Z1wiICE9PSB0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICB9KSh0KSxcclxuICAgICAgICAgICAgZCA9IHQucGFyZW50Tm9kZTsgLy8ucGFyZW50Tm9kZTtcclxuICAgICAgICAgIChkLnN0eWxlLm92ZXJmbG93ID0gZS5vdmVyZmxvdyksXHJcbiAgICAgICAgICAvKioqTEFVZC5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnLCovIChkLnN0eWxlLnRvdWNoQWN0aW9uID0gZS50b3VjaEFjdGlvbiksXHJcbiAgICAgICAgICAgICgoZS5jYW52YXMgPyBkIDogdCkuc3R5bGUuY3Vyc29yID0gZS5jdXJzb3IpLFxyXG4gICAgICAgICAgLyoqKnQuc3R5bGUudXNlclNlbGVjdCA9ICdub25lJywqLyAodC5zdHlsZS50b3VjaEFjdGlvbiA9IGUudG91Y2hBY3Rpb24pOyAvKioqTEFVLCBiKHQsIFwidHJhbnNmb3JtT3JpZ2luXCIsIFwic3RyaW5nXCIgPT0gdHlwZW9mIGUub3JpZ2luID8gZS5vcmlnaW4gOiBuID8gXCIwIDBcIiA6IFwiNTAlIFwiKSovXHJcbiAgICAgICAgICB2YXIgaCxcclxuICAgICAgICAgICAgZixcclxuICAgICAgICAgICAgZyxcclxuICAgICAgICAgICAgcCxcclxuICAgICAgICAgICAgdixcclxuICAgICAgICAgICAgeSxcclxuICAgICAgICAgICAgSSA9IDAsXHJcbiAgICAgICAgICAgIF8gPSAwLFxyXG4gICAgICAgICAgICBrID0gdiA9PiB2ID09PSB1bmRlZmluZWQgPyBlLmpzdi5jdXJyZW50Wm9vbVNjYWxlIDogKGUuanN2LmN1cnJlbnRab29tU2NhbGUgPSB2KSxcclxuICAgICAgICAgICAgQyA9ICExO1xyXG4gICAgICAgICAgZnVuY3Rpb24gRChlLCBuLCByKSB7XHJcbiAgICAgICAgICAgIGlmICghci5zaWxlbnQpIHtcclxuICAgICAgICAgICAgICB2YXIgaSA9IG5ldyBDdXN0b21FdmVudChlLCB7IGRldGFpbDogbiB9KTtcclxuICAgICAgICAgICAgICB0LmRpc3BhdGNoRXZlbnQoaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGZ1bmN0aW9uIFAoZSwgcikge1xyXG4gICAgICAgICAgICB2YXIgaSA9IHsgeDogSSwgeTogXywgc2NhbGU6IGsoKSwgaXNTVkc6IG4gfTtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgXCJib29sZWFuXCIgPT0gdHlwZW9mIHIuYW5pbWF0ZSAmJlxyXG4gICAgICAgICAgICAgICAgICAoci5hbmltYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgPyAoZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGIodC5wYXJlbnROb2RlLnBhcmVudE5vZGUsIFwidHJhbnNpdGlvblwiLCBtKFwiYWxsXCIpICsgXCIgXCIgKyBlLmR1cmF0aW9uICsgXCJtcyBcIiArIGUuZWFzaW5nLCBcImltcG9ydGFudFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKHQsIHIpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBiKHQucGFyZW50Tm9kZS5wYXJlbnROb2RlLCBcInRyYW5zaXRpb25cIiwgXCJhbGwgMjAwbXMgXCIgKyBlLmVhc2luZywgXCJpbXBvcnRhbnRcIikpLFxyXG4gICAgICAgICAgICAgICAgICByLnNldFRyYW5zZm9ybSh0LnBhcmVudE5vZGUsIGksIHIpO1xyXG4gICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgIEQoZSwgaSwgciksXHJcbiAgICAgICAgICAgICAgRChcInBhbnpvb21jaGFuZ2VcIiwgaSwgciksXHJcbiAgICAgICAgICAgICAgaVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZnVuY3Rpb24gUygpIHtcclxuICAgICAgICAgICAgaWYgKGUuY29udGFpbikge1xyXG4gICAgICAgICAgICAgIHZhciBuID0gdyh0KSxcclxuICAgICAgICAgICAgICAgIHIgPSBuLnBhcmVudC53aWR0aCAtIG4ucGFyZW50LmJvcmRlci5sZWZ0IC0gbi5wYXJlbnQuYm9yZGVyLnJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgaSA9IG4ucGFyZW50LmhlaWdodCAtIG4ucGFyZW50LmJvcmRlci50b3AgLSBuLnBhcmVudC5ib3JkZXIuYm90dG9tLFxyXG4gICAgICAgICAgICAgICAgbyA9IHIgLyAobi5lbGVtLndpZHRoIC8gaygpKSxcclxuICAgICAgICAgICAgICAgIGEgPSBpIC8gKG4uZWxlbS5oZWlnaHQgLyBrKCkpO1xyXG4gICAgICAgICAgICAgIFwiaW5zaWRlXCIgPT09IGUuY29udGFpbiA/IChlLm1heFNjYWxlID0gTWF0aC5taW4obywgYSkpIDogXCJvdXRzaWRlXCIgPT09IGUuY29udGFpbiAmJiAoZS5taW5TY2FsZSA9IE1hdGgubWF4KG8sIGEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZnVuY3Rpb24gTShuLCBpLCBvLCBhKSB7XHJcbiAgICAgICAgICAgIHZhciBzID0gcihyKHt9LCBlKSwgYSksXHJcbiAgICAgICAgICAgICAgdSA9IHsgeDogSSwgeTogXywgb3B0czogcyB9O1xyXG4gICAgICAgICAgICBpZiAoIXMuZm9yY2UgJiYgKHMuZGlzYWJsZVBhbiB8fCAocy5wYW5Pbmx5V2hlblpvb21lZCAmJiBrKCkgPT09IHMuc3RhcnRTY2FsZSkpKSByZXR1cm4gdTtcclxuICAgICAgICAgICAgaWYgKCgobiA9IHBhcnNlRmxvYXQobikpLCAoaSA9IHBhcnNlRmxvYXQoaSkpLCBzLmRpc2FibGVYQXhpcyB8fCAodS54ID0gKHMucmVsYXRpdmUgPyBJIDogMCkgKyBuKSwgcy5kaXNhYmxlWUF4aXMgfHwgKHUueSA9IChzLnJlbGF0aXZlID8gXyA6IDApICsgaSksIFwiaW5zaWRlXCIgPT09IHMuY29udGFpbikpIHtcclxuICAgICAgICAgICAgICB2YXIgYyA9IHcodCk7XHJcbiAgICAgICAgICAgICAgKHUueCA9IE1hdGgubWF4KC1jLmVsZW0ubWFyZ2luLmxlZnQgLSBjLnBhcmVudC5wYWRkaW5nLmxlZnQsIE1hdGgubWluKGMucGFyZW50LndpZHRoIC0gYy5lbGVtLndpZHRoIC8gbyAtIGMucGFyZW50LnBhZGRpbmcubGVmdCAtIGMuZWxlbS5tYXJnaW4ubGVmdCAtIGMucGFyZW50LmJvcmRlci5sZWZ0IC0gYy5wYXJlbnQuYm9yZGVyLnJpZ2h0LCB1LngpKSksXHJcbiAgICAgICAgICAgICAgICAodS55ID0gTWF0aC5tYXgoLWMuZWxlbS5tYXJnaW4udG9wIC0gYy5wYXJlbnQucGFkZGluZy50b3AsIE1hdGgubWluKGMucGFyZW50LmhlaWdodCAtIGMuZWxlbS5oZWlnaHQgLyBvIC0gYy5wYXJlbnQucGFkZGluZy50b3AgLSBjLmVsZW0ubWFyZ2luLnRvcCAtIGMucGFyZW50LmJvcmRlci50b3AgLSBjLnBhcmVudC5ib3JkZXIuYm90dG9tLCB1LnkpKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXCJvdXRzaWRlXCIgPT09IHMuY29udGFpbikge1xyXG4gICAgICAgICAgICAgIHZhciBsID0gKGMgPSB3KHQpKS5lbGVtLndpZHRoIC8gaygpLFxyXG4gICAgICAgICAgICAgICAgZCA9IGMuZWxlbS5oZWlnaHQgLyBrKCksXHJcbiAgICAgICAgICAgICAgICBoID0gbCAqIG8sXHJcbiAgICAgICAgICAgICAgICBmID0gZCAqIG8sXHJcbiAgICAgICAgICAgICAgICBnID0gKGggLSBsKSAvIDIsXHJcbiAgICAgICAgICAgICAgICBwID0gKGYgLSBkKSAvIDIsXHJcbiAgICAgICAgICAgICAgICBtID0gKC0oaCAtIGMucGFyZW50LndpZHRoKSAtIGMucGFyZW50LnBhZGRpbmcubGVmdCAtIGMucGFyZW50LmJvcmRlci5sZWZ0IC0gYy5wYXJlbnQuYm9yZGVyLnJpZ2h0ICsgZykgLyBvLFxyXG4gICAgICAgICAgICAgICAgdiA9IChnIC0gYy5wYXJlbnQucGFkZGluZy5sZWZ0KSAvIG87XHJcbiAgICAgICAgICAgICAgdS54ID0gTWF0aC5tYXgoTWF0aC5taW4odS54LCB2KSwgbSk7XHJcbiAgICAgICAgICAgICAgdmFyIHkgPSAoLShmIC0gYy5wYXJlbnQuaGVpZ2h0KSAtIGMucGFyZW50LnBhZGRpbmcudG9wIC0gYy5wYXJlbnQuYm9yZGVyLnRvcCAtIGMucGFyZW50LmJvcmRlci5ib3R0b20gKyBwKSAvIG8sXHJcbiAgICAgICAgICAgICAgICBiID0gKHAgLSBjLnBhcmVudC5wYWRkaW5nLnRvcCkgLyBvO1xyXG4gICAgICAgICAgICAgIHUueSA9IE1hdGgubWF4KE1hdGgubWluKHUueSwgYiksIHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB1O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZnVuY3Rpb24gVCh0LCBuKSB7XHJcbiAgICAgICAgICAgIHZhciBpID0gcihyKHt9LCBlKSwgbiksXHJcbiAgICAgICAgICAgICAgbyA9IHsgc2NhbGU6IGsoKSwgb3B0czogaSB9O1xyXG4gICAgICAgICAgICByZXR1cm4gKCFpLmZvcmNlICYmIGkuZGlzYWJsZVpvb20pIHx8IChvLnNjYWxlID0gTWF0aC5taW4oTWF0aC5tYXgodCwgaS5taW5TY2FsZSksIGkubWF4U2NhbGUpKSwgbztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGZ1bmN0aW9uIE4odCwgZSwgbikge1xyXG4gICAgICAgICAgICB2YXIgciA9IE0odCwgZSwgaygpLCBuKSxcclxuICAgICAgICAgICAgICBpID0gci5vcHRzO1xyXG4gICAgICAgICAgICByZXR1cm4gKEkgPSByLngpLCAoXyA9IHIueSksIFAoXCJwYW56b29tcGFuXCIsIGkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZnVuY3Rpb24gSCh0LCBlLCBkdXJhdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgbiA9IFQodCwgZSksXHJcbiAgICAgICAgICAgICAgciA9IG4ub3B0cztcclxuICAgICAgICAgICAgZHVyYXRpb24gIT0gdW5kZWZpbmVkICYmIChyLmR1cmF0aW9uID0gZHVyYXRpb24pO1xyXG4gICAgICAgICAgICBpZiAoci5mb3JjZSB8fCAhci5kaXNhYmxlWm9vbSkge1xyXG4gICAgICAgICAgICAgIHQgPSBuLnNjYWxlO1xyXG4gICAgICAgICAgICAgIHZhciBpID0gSSxcclxuICAgICAgICAgICAgICAgIG8gPSBfO1xyXG4gICAgICAgICAgICAgIGlmIChyLmZvY2FsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYSA9IHIuZm9jYWw7XHJcbiAgICAgICAgICAgICAgICAoaSA9IChhLnggLyB0IC0gYS54IC8gaygpICsgSSAqIHQpIC8gdCksIChvID0gKGEueSAvIHQgLSBhLnkgLyBrKCkgKyBfICogdCkgLyB0KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdmFyIHMgPSBNKGksIG8sIHQsIHsgcmVsYXRpdmU6ICExLCBmb3JjZTogITAgfSk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChJID0gcy54KSwgKF8gPSBzLnkpLCAoayh0KSksIFAoXCJwYW56b29tem9vbVwiLCByKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZnVuY3Rpb24gTyh0LCBuKSB7XHJcbiAgICAgICAgICAgIHZhciBpID0gcihyKHIoe30sIGUpLCB7IGFuaW1hdGU6ICEwIH0pLCBuKTtcclxuICAgICAgICAgICAgcmV0dXJuIEgoaygpICogTWF0aC5leHAoKHQgPyAxIDogLTEpICogaS5zdGVwKSwgaSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBmdW5jdGlvbiB6KGUsIGksIG8pIHtcclxuICAgICAgICAgICAgdmFyIGEgPSB3KHQpLFxyXG4gICAgICAgICAgICAgIHMgPSBhLnBhcmVudC53aWR0aCAtIGEucGFyZW50LnBhZGRpbmcubGVmdCAtIGEucGFyZW50LnBhZGRpbmcucmlnaHQgLSBhLnBhcmVudC5ib3JkZXIubGVmdCAtIGEucGFyZW50LmJvcmRlci5yaWdodCxcclxuICAgICAgICAgICAgICB1ID0gYS5wYXJlbnQuaGVpZ2h0IC0gYS5wYXJlbnQucGFkZGluZy50b3AgLSBhLnBhcmVudC5wYWRkaW5nLmJvdHRvbSAtIGEucGFyZW50LmJvcmRlci50b3AgLSBhLnBhcmVudC5ib3JkZXIuYm90dG9tLFxyXG4gICAgICAgICAgICAgIGMgPSBpLmNsaWVudFggLSBhLnBhcmVudC5sZWZ0IC0gYS5wYXJlbnQucGFkZGluZy5sZWZ0IC0gYS5wYXJlbnQuYm9yZGVyLmxlZnQgLSBhLmVsZW0ubWFyZ2luLmxlZnQsXHJcbiAgICAgICAgICAgICAgbCA9IGkuY2xpZW50WSAtIGEucGFyZW50LnRvcCAtIGEucGFyZW50LnBhZGRpbmcudG9wIC0gYS5wYXJlbnQuYm9yZGVyLnRvcCAtIGEuZWxlbS5tYXJnaW4udG9wO1xyXG4gICAgICAgICAgICBuIHx8ICgoYyAtPSBhLmVsZW0ud2lkdGggLyBrKCkgLyAyKSwgKGwgLT0gYS5lbGVtLmhlaWdodCAvIGsoKSAvIDIpKTtcclxuICAgICAgICAgICAgdmFyIGQgPSB7IHg6IChjIC8gcykgKiAocyAqIGUpLCB5OiAobCAvIHUpICogKHUgKiBlKSB9O1xyXG4gICAgICAgICAgICByZXR1cm4gSChlLCByKHIoeyBhbmltYXRlOiAhMSB9LCBvKSwgeyBmb2NhbDogZCB9KSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBIKGUuc3RhcnRTY2FsZSwgeyBhbmltYXRlOiAhMSB9KSxcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgUygpLCBOKGUuc3RhcnRYLCBlLnN0YXJ0WSwgeyBhbmltYXRlOiAhMSB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YXIgWSA9IFtdO1xyXG4gICAgICAgICAgZnVuY3Rpb24gQSh0KSB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAhKGZ1bmN0aW9uICh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuID0gdDsgbnVsbCAhPSBuOyBuID0gbi5wYXJlbnROb2RlKSBpZiAoeChuLCBlLmV4Y2x1ZGVDbGFzcykgfHwgZS5leGNsdWRlLmluZGV4T2YobikgPiAtMSkgcmV0dXJuICEwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICExO1xyXG4gICAgICAgICAgICAgIH0pKHQudGFyZ2V0LCBlKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICBvKFksIHQpLCAoQyA9ICEwKSwgZS5oYW5kbGVTdGFydEV2ZW50KHQpLCAoaCA9IEkpLCAoZiA9IF8pLCBEKFwicGFuem9vbXN0YXJ0XCIsIHsgeDogSSwgeTogXywgc2NhbGU6IGsoKSB9LCBlKTtcclxuICAgICAgICAgICAgICB2YXIgbiA9IGEoWSk7XHJcbiAgICAgICAgICAgICAgKGcgPSBuLmNsaWVudFgpLCAocCA9IG4uY2xpZW50WSksICh2ID0gaygpKSwgKHkgPSBzKFkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZnVuY3Rpb24gWih0KSB7XHJcbiAgICAgICAgICAgIGlmIChDICYmIHZvaWQgMCAhPT0gaCAmJiB2b2lkIDAgIT09IGYgJiYgdm9pZCAwICE9PSBnICYmIHZvaWQgMCAhPT0gcCkge1xyXG4gICAgICAgICAgICAgIG8oWSwgdCk7XHJcbiAgICAgICAgICAgICAgdmFyIG4gPSBhKFkpO1xyXG4gICAgICAgICAgICAgIGlmIChZLmxlbmd0aCA+IDEpIHooVCgoKHMoWSkgLSB5KSAqIGUuc3RlcCkgLyA4MCArIHYpLnNjYWxlLCBuKTtcclxuICAgICAgICAgICAgICBOKGggKyAobi5jbGllbnRYIC0gZykgLyBrKCksIGYgKyAobi5jbGllbnRZIC0gcCkgLyBrKCksIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGU6ICExLFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBmdW5jdGlvbiBqKHQpIHtcclxuICAgICAgICAgICAgMSA9PT0gWS5sZW5ndGggJiYgRChcInBhbnpvb21lbmRcIiwgeyB4OiBJLCB5OiBfLCBzY2FsZTogaygpIH0sIGUpLFxyXG4gICAgICAgICAgICAgIChmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudG91Y2hlcykgZm9yICg7IHQubGVuZ3RoOykgdC5wb3AoKTtcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbiA9IGkodCwgZSk7XHJcbiAgICAgICAgICAgICAgICAgIG4gPiAtMSAmJiB0LnNwbGljZShuLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KShZLCB0KSxcclxuICAgICAgICAgICAgICBDICYmICgoQyA9ICExKSwgKGggPSBmID0gZyA9IHAgPSB2b2lkIDApKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBYID0gITE7XHJcbiAgICAgICAgICBmdW5jdGlvbiBHKCkge1xyXG4gICAgICAgICAgICBYIHx8ICgoWCA9ICEwKSwgYyhcImRvd25cIiwgZS5jYW52YXMgPyBkIDogdCwgQSksIGMoXCJtb3ZlXCIsIGRvY3VtZW50LCBaLCB7IHBhc3NpdmU6ICEwIH0pLCBjKFwidXBcIiwgZG9jdW1lbnQsIGosIHsgcGFzc2l2ZTogITAgfSkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgZS5ub0JpbmQgfHwgRygpLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgYmluZDogRyxcclxuICAgICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAoWCA9ICExKSwgbChcImRvd25cIiwgZS5jYW52YXMgPyBkIDogdCwgQSksIGwoXCJtb3ZlXCIsIGRvY3VtZW50LCBaKSwgbChcInVwXCIsIGRvY3VtZW50LCBqKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGV2ZW50TmFtZXM6IHUsXHJcbiAgICAgICAgICAgICAgZ2V0UGFuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiBJLCB5OiBfIH07XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBnZXRTY2FsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGsoKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGUgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbiBpbiB0KSB0Lmhhc093blByb3BlcnR5KG4pICYmIChlW25dID0gdFtuXSk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xyXG4gICAgICAgICAgICAgICAgfSkoZSk7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBwYW46IE4sXHJcbiAgICAgICAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICh0LCBkdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG4gPSByKHIocih7fSwgZSksIHsgYW5pbWF0ZTogITAsIGZvcmNlOiAhMCB9KSwgdCk7XHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbiAhPSB1bmRlZmluZWQgJiYgKG4uZHVyYXRpb24gPSBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBrKFQobi5zdGFydFNjYWxlLCBuKS5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaSA9IE0obi5zdGFydFgsIG4uc3RhcnRZLCBrKCksIG4pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChJID0gaS54KSwgKF8gPSBpLnkpLCBQKFwicGFuem9vbXJlc2V0XCIsIG4pO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgc2V0T3B0aW9uczogZnVuY3Rpb24gKG4pIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHIgaW4gKHZvaWQgMCA9PT0gbiAmJiAobiA9IHt9KSwgbikpIG4uaGFzT3duUHJvcGVydHkocikgJiYgKGVbcl0gPSBuW3JdKTtcclxuICAgICAgICAgICAgICAgIG4uaGFzT3duUHJvcGVydHkoXCJjdXJzb3JcIikgJiYgKHQuc3R5bGUuY3Vyc29yID0gbi5jdXJzb3IpLFxyXG4gICAgICAgICAgICAgICAgICBuLmhhc093blByb3BlcnR5KFwib3ZlcmZsb3dcIikgJiYgKGQuc3R5bGUub3ZlcmZsb3cgPSBuLm92ZXJmbG93KSxcclxuICAgICAgICAgICAgICAgICAgbi5oYXNPd25Qcm9wZXJ0eShcInRvdWNoQWN0aW9uXCIpICYmICgoZC5zdHlsZS50b3VjaEFjdGlvbiA9IG4udG91Y2hBY3Rpb24pLCAodC5zdHlsZS50b3VjaEFjdGlvbiA9IG4udG91Y2hBY3Rpb24pKSxcclxuICAgICAgICAgICAgICAgICAgKG4uaGFzT3duUHJvcGVydHkoXCJtaW5TY2FsZVwiKSB8fCBuLmhhc093blByb3BlcnR5KFwibWF4U2NhbGVcIikgfHwgbi5oYXNPd25Qcm9wZXJ0eShcImNvbnRhaW5cIikpICYmIFMoKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHNldFN0eWxlOiBmdW5jdGlvbiAoZSwgbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIodCwgZSwgbik7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB6b29tOiBILFxyXG4gICAgICAgICAgICAgIHpvb21JbjogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBPKCEwLCB0KTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHpvb21PdXQ6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTyghMSwgdCk7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB6b29tVG9Qb2ludDogeixcclxuICAgICAgICAgICAgICB6b29tV2l0aFdoZWVsOiBmdW5jdGlvbiAodCwgbikge1xyXG4gICAgICAgICAgICAgICAgdC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGkgPSByKHIoe30sIGUpLCBuKSxcclxuICAgICAgICAgICAgICAgICAgbyA9ICgwID09PSB0LmRlbHRhWSAmJiB0LmRlbHRhWCA/IHQuZGVsdGFYIDogdC5kZWx0YVkpIDwgMCA/IDEgOiAtMTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB6KFQoaygpICogTWF0aC5leHAoKG8gKiBpLnN0ZXApIC8gMyksIGkpLnNjYWxlLCB0LCBpKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAoSS5kZWZhdWx0T3B0aW9ucyA9IFIpLCAoZS5kZWZhdWx0ID0gSSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZ1bmN0aW9uICh0LCBlLCBuKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiAhMCB9KSwgKGUuSGVscGVyID0gdm9pZCAwKTtcclxuICAgICAgICB2YXIgciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBmdW5jdGlvbiB0KCkgeyB9XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAodC5pc1ZhbGlkID0gZnVuY3Rpb24gKHQsIGUpIHtcclxuICAgICAgICAgICAgICBlID0gZS50b0xvd2VyQ2FzZSgpLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgIHZhciBuID0gcGFyc2VJbnQodC5jaGFyQXQoMCksIDEwKSxcclxuICAgICAgICAgICAgICAgIHIgPSB0LnNwbGl0KFwiPT1cIiksXHJcbiAgICAgICAgICAgICAgICBpID0gcGFyc2VJbnQoclswXS5jaGFyQXQoclswXS5sZW5ndGggLSAxKSwgMTApO1xyXG4gICAgICAgICAgICAgIHJldHVybiByWzBdLnN1YnN0cigxLCByWzBdLmxlbmd0aCAtIDIpID09PSB0aGlzLnJldmVyc2UoZSwgMiAqIGkpICYmIG4gKyBpID09PSAxMDtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICh0LnJldmVyc2UgPSBmdW5jdGlvbiAodCwgZSkge1xyXG4gICAgICAgICAgICAgIHZhciBuID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICAgICAgICByID0gXCJcIjtcclxuICAgICAgICAgICAgICBlID4gMjYgJiYgKGUgJT0gMjYpO1xyXG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdC5sZW5ndGg7KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoLTEgIT09IG4uaW5kZXhPZih0W2ldKSkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbyA9IG4uaW5kZXhPZih0W2ldKTtcclxuICAgICAgICAgICAgICAgICAgbltvICsgZV0gPyAociArPSBuW28gKyBlXSkgOiAociArPSBuW28gKyBlIC0gMjZdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgZS5IZWxwZXIgPSByO1xyXG4gICAgICB9LFxyXG4gICAgXSk7XHJcbiAgfSk7XHJcbiAgXHJcbn0iXSwKICAibWFwcGluZ3MiOiAiQUFBQSxzQkFBc0IsZ0JBQWdCO0FBQ3BDLFFBQU0sRUFBRSxVQUFVLFlBQVksSUFBSSxNQUFNLE9BQU8sWUFBWTtBQUMzRCxRQUFNLE9BQU8sTUFBTTtBQUFBLEVBQUU7QUFDckIsTUFBSSxTQUFTO0FBQ2IsUUFBTSxpQkFBaUIsUUFBTSxTQUFTLElBQ3BDLHVCQUF1QjtBQUV6QixRQUFNLGlCQUFpQixDQUFDLElBQUksT0FBT0Esb0JBQW1CO0FBQ3BELFFBQUksQ0FBQ0EsaUJBQWdCO0FBQUUsTUFBQUEsa0JBQWlCO0FBQUEsSUFBcUI7QUFBQztBQUM5RCxVQUFNLFNBQVEsb0JBQUksS0FBSyxHQUFFLFFBQVE7QUFFakMsVUFBTSxPQUFPLE1BQU07QUFDakIsWUFBTSxTQUFRLG9CQUFJLEtBQUssR0FBRSxRQUFRLElBQUk7QUFDckMsVUFBSSxTQUFTLE9BQU87QUFDbEIsV0FBRztBQUNILFFBQUFBLGdCQUFlLElBQUk7QUFDbkI7QUFBQSxNQUNGO0FBRUEsWUFBTSxNQUFNLHNCQUFzQixJQUFJO0FBQ3RDLE1BQUFBLGdCQUFlLE1BQU0scUJBQXFCLEdBQUcsQ0FBQztBQUFBLElBQ2hEO0FBRUEsUUFBSSxTQUFTLEdBQUc7QUFDZCxZQUFNLE1BQU0sc0JBQXNCLElBQUk7QUFDdEMsTUFBQUEsZ0JBQWUsTUFBTSxxQkFBcUIsR0FBRyxDQUFDO0FBQUEsSUFDaEQsTUFDSyxZQUFXLE1BQU0sUUFBUSxDQUFDO0FBQUEsRUFDakM7QUFRQSxJQUFFLFNBQVUsR0FBRyxHQUFHO0FBSWQsUUFBSSxJ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QUFPLEVBQUUsRUFBRUEsRUFBQyxDQUFDO0FBQUEsVUFDZjtBQUFBLFVBQ0EsVUFBVSxTQUFVQSxJQUFHO0FBQ3JCLG1CQUFPLEVBQUUsRUFBRUEsRUFBQyxDQUFDO0FBQUEsVUFDZjtBQUFBLFVBQ0EsVUFBVSxTQUFVQSxJQUFHO0FBQ3JCLG1CQUFPLEVBQUUsRUFBRUEsRUFBQyxDQUFDO0FBQUEsVUFDZjtBQUFBLFVBQ0EsY0FBYyxTQUFVQSxJQUFHO0FBQ3pCLG1CQUFPLEVBQUUsRUFBRUEsRUFBQyxDQUFDO0FBQUEsVUFDZjtBQUFBLFVBQ0EsYUFBYTtBQUFBLFVBQ2IsYUFBYSxTQUFVQSxJQUFHO0FBQ3hCLG1CQUFPLEVBQUUsRUFBRUEsRUFBQyxDQUFDO0FBQUEsVUFDZjtBQUFBLFVBQ0EsYUFBYSxTQUFVQSxJQUFHO0FBQ3hCLG1CQUFPLEVBQUUsRUFBRUEsRUFBQyxDQUFDO0FBQUEsVUFDZjtBQUFBLFVBQ0EsYUFBYSxTQUFVQSxJQUFHO0FBQ3hCLG1CQUFPLEVBQUUsRUFBRUEsRUFBQyxDQUFDO0FBQUEsVUFDZjtBQUFBLFVBQ0EsY0FBYyxTQUFVQSxJQUFHO0FBQ3pCLG1CQUFPLEVBQUUsRUFBRUEsRUFBQyxDQUFDO0FBQUEsVUFDZjtBQUFBLFVBQ0EsYUFBYSxTQUFVQSxJQUFHO0FBQ3hCLG1CQUFPLEVBQUUsRUFBRUEsRUFBQyxDQUFDO0FBQUEsVUFDZjtBQUFBLFVBQ0EsYUFBYSxTQUFVQSxJQUFHO0FBQ3hCLG1CQUFPLEVBQUUsRUFBRUEsRUFBQyxDQUFDO0FBQUEsVUFDZjtBQUFBLFVBQ0EsU0FBUztBQUFBLFVBQ1QsU0FBUztBQUFBLFVBQ1QsU0FBUyxTQUFVQSxJQUFHO0FBQ3BCLG1CQUFPLEVBQUUsRUFBRUEsRUFBQyxDQUFDO0FBQUEsVUFDZjtBQUFBLFVBQ0EsU0FBUztBQUFBLFVBQ1QsU0FBUztBQUFBLFVBQ1QsU0FBUztBQUFBLFVBQ1QsU0FBUztBQUFBLFVBQ1QsU0FBUyxTQUFVQSxJQUFHO0FBQ3BCLG1CQUFPLEVBQUUsRUFBRUEsRUFBQyxDQUFDO0FBQUEsVUFDZjtBQUFBLFVBQ0EsU0FBUyxTQUFVQSxJQUFHO0FBQ3BCLG1CQUFPLEVBQUUsRUFBRUEsRUFBQyxDQUFDO0FBQUEsVUFDZjtBQUFBLFFBQ0Y7QUFDQSxZQUFJLElBQUk7QUFBQSxVQUNOLFdBQVcsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3pCLGNBQWMsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQzVCLE1BQU0sQ0FBQyxHQUFHLEtBQUssR0FBRztBQUFBLFVBQ2xCLFlBQVksQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQzFCLE9BQU8sQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3JCLE9BQU8sQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3JCLFFBQVEsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3RCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLFVBQ2YsZ0JBQWdCLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUM5QixNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUc7QUFBQSxVQUNoQixZQUFZLENBQUMsS0FBSyxJQUFJLEdBQUc7QUFBQSxVQUN6QixPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUU7QUFBQSxVQUNuQixXQUFXLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUN6QixXQUFXLENBQUMsSUFBSSxLQUFLLEdBQUc7QUFBQSxVQUN4QixZQUFZLENBQUMsS0FBSyxLQUFLLENBQUM7QUFBQSxVQUN4QixXQUFXLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFBQSxVQUN4QixPQUFPLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFBQSxVQUNwQixnQkFBZ0IsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQzlCLFVBQVUsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3hCLFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRTtBQUFBLFVBQ3JCLE1BQU0sQ0FBQyxHQUFHLEtBQUssR0FBRztBQUFBLFVBQ2xCLFVBQVUsQ0FBQyxHQUFHLEdBQUcsR0FBRztBQUFBLFVBQ3BCLFVBQVUsQ0FBQyxHQUFHLEtBQUssR0FBRztBQUFBLFVBQ3RCLGVBQWUsQ0FBQyxLQUFLLEtBQUssRUFBRTtBQUFBLFVBQzVCLFVBQVUsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3hCLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUFBLFVBQ3JCLFVBQVUsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3hCLFdBQVcsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3pCLGFBQWEsQ0FBQyxLQUFLLEdBQUcsR0FBRztBQUFBLFVBQ3pCLGdCQUFnQixDQUFDLElBQUksS0FBSyxFQUFFO0FBQUEsVUFDNUIsWUFBWSxDQUFDLEtBQUssS0FBSyxDQUFDO0FBQUEsVUFDeEIsWUFBWSxDQUFDLEtBQUssSUFBSSxHQUFHO0FBQUEsVUFDekIsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDO0FBQUEsVUFDbkIsWUFBWSxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDMUIsY0FBYyxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDNUIsZUFBZSxDQUFDLElBQUksSUFBSSxHQUFHO0FBQUEsVUFDM0IsZUFBZSxDQUFDLElBQUksSUFBSSxFQUFFO0FBQUEsVUFDMUIsZUFBZSxDQUFDLElBQUksSUFBSSxFQUFFO0FBQUEsVUFDMUIsZUFBZSxDQUFDLEdBQUcsS0FBSyxHQUFHO0FBQUEsVUFDM0IsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHO0FBQUEsVUFDeEIsVUFBVSxDQUFDLEtBQUssSUFBSSxHQUFHO0FBQUEsVUFDdkIsYUFBYSxDQUFDLEdBQUcsS0FBSyxHQUFHO0FBQUEsVUFDekIsU0FBUyxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDdkIsU0FBUyxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDdkIsWUFBWSxDQUFDLElBQUksS0FBSyxHQUFHO0FBQUEsVUFDekIsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFO0FBQUEsVUFDdkIsYUFBYSxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDM0IsYUFBYSxDQUFDLElBQUksS0FBSyxFQUFFO0FBQUEsVUFDekIsU0FBUyxDQUFDLEtBQUssR0FBRyxHQUFHO0FBQUEsVUFDckIsV0FBVyxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDekIsWUFBWSxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDMUIsTUFBTSxDQUFDLEtBQUssS0FBSyxDQUFDO0FBQUEsVUFDbEIsV0FBVyxDQUFDLEtBQUssS0FBSyxFQUFFO0FBQUEsVUFDeEIsTUFBTSxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDcEIsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQUEsVUFDakIsYUFBYSxDQUFDLEtBQUssS0FBSyxFQUFFO0FBQUEsVUFDMUIsTUFBTSxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDcEIsVUFBVSxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDeEIsU0FBUyxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDdkIsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFO0FBQUEsVUFDdkIsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHO0FBQUEsVUFDbkIsT0FBTyxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDckIsT0FBTyxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDckIsVUFBVSxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDeEIsZUFBZSxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDN0IsV0FBVyxDQUFDLEtBQUssS0FBSyxDQUFDO0FBQUEsVUFDdkIsY0FBYyxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDNUIsV0FBVyxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDekIsWUFBWSxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDMUIsV0FBVyxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDekIsc0JBQXNCLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUNwQyxXQUFXLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUN6QixZQUFZLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUMxQixXQUFXLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUN6QixXQUFXLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUN6QixhQUFhLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUMzQixlQUFlLENBQUMsSUFBSSxLQUFLLEdBQUc7QUFBQSxVQUM1QixjQUFjLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUM1QixnQkFBZ0IsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQzlCLGdCQUFnQixDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsVUFDOUIsZ0JBQWdCLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUM5QixhQUFhLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUMzQixNQUFNLENBQUMsR0FBRyxLQUFLLENBQUM7QUFBQSxVQUNoQixXQUFXLENBQUMsSUFBSSxLQUFLLEVBQUU7QUFBQSxVQUN2QixPQUFPLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUNyQixTQUFTLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFBQSxVQUNyQixRQUFRLENBQUMsS0FBSyxHQUFHLENBQUM7QUFBQSxVQUNsQixrQkFBa0IsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ2hDLFlBQVksQ0FBQyxHQUFHLEdBQUcsR0FBRztBQUFBLFVBQ3RCLGNBQWMsQ0FBQyxLQUFLLElBQUksR0FBRztBQUFBLFVBQzNCLGNBQWMsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQzVCLGdCQUFnQixDQUFDLElBQUksS0FBSyxHQUFHO0FBQUEsVUFDN0IsaUJBQWlCLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUMvQixtQkFBbUIsQ0FBQyxHQUFHLEtBQUssR0FBRztBQUFBLFVBQy9CLGlCQUFpQixDQUFDLElBQUksS0FBSyxHQUFHO0FBQUEsVUFDOUIsaUJBQWlCLENBQUMsS0FBSyxJQUFJLEdBQUc7QUFBQSxVQUM5QixjQUFjLENBQUMsSUFBSSxJQUFJLEdBQUc7QUFBQSxVQUMxQixXQUFXLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUN6QixXQUFXLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUN6QixVQUFVLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUN4QixhQUFhLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUMzQixNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUc7QUFBQSxVQUNoQixTQUFTLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUN2QixPQUFPLENBQUMsS0FBSyxLQUFLLENBQUM7QUFBQSxVQUNuQixXQUFXLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFBQSxVQUN4QixRQUFRLENBQUMsS0FBSyxLQUFLLENBQUM7QUFBQSxVQUNwQixXQUFXLENBQUMsS0FBSyxJQUFJLENBQUM7QUFBQSxVQUN0QixRQUFRLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUN0QixlQUFlLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUM3QixXQUFXLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUN6QixlQUFlLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUM3QixlQUFlLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUM3QixZQUFZLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUMxQixXQUFXLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUN6QixNQUFNLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFBQSxVQUNuQixNQUFNLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUNwQixNQUFNLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUNwQixZQUFZLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxVQUMxQixRQUFRLENBQUMsS0FBSyxHQUFHLEdBQUc7QUFBQSxVQUNwQixlQUFlLENBQUMsS0FBSyxJQUFJLEdBQUc7QUFBQSxVQUM1QixLQUFLLENBQUMsS0FBSyxHQUFHLENBQUM7QUFBQSxVQUNmLFdBQVcsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3pCLFdBQVcsQ0FBQyxJQUFJLEtBQUssR0FBRztBQUFBLFVBQ3hCLGFBQWEsQ0FBQyxLQUFLLElBQUksRUFBRTtBQUFBLFVBQ3pCLFFBQVEsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3RCLFlBQVksQ0FBQyxLQUFLLEtBQUssRUFBRTtBQUFBLFVBQ3pCLFVBQVUsQ0FBQyxJQUFJLEtBQUssRUFBRTtBQUFBLFVBQ3RCLFVBQVUsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3hCLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtBQUFBLFVBQ3BCLFFBQVEsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3RCLFNBQVMsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3ZCLFdBQVcsQ0FBQyxLQUFLLElBQUksR0FBRztBQUFBLFVBQ3hCLFdBQVcsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3pCLFdBQVcsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3pCLE1BQU0sQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3BCLGFBQWEsQ0FBQyxHQUFHLEtBQUssR0FBRztBQUFBLFVBQ3pCLFdBQVcsQ0FBQyxJQUFJLEtBQUssR0FBRztBQUFBLFVBQ3hCLEtBQUssQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ25CLE1BQU0sQ0FBQyxHQUFHLEtBQUssR0FBRztBQUFBLFVBQ2xCLFNBQVMsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3ZCLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtBQUFBLFVBQ3BCLFdBQVcsQ0FBQyxJQUFJLEtBQUssR0FBRztBQUFBLFVBQ3hCLFFBQVEsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3RCLE9BQU8sQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3JCLE9BQU8sQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQ3JCLFlBQVksQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFVBQzFCLFFBQVEsQ0FBQyxLQUFLLEtB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QzNCLFlBQUFBLEtBQUlBLEdBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7QUFDL0MsZ0JBQUlDLEtBQUksU0FBU0YsR0FBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQzlCRCxLQUFJQyxHQUFFLE1BQU0sSUFBSSxHQUNoQixJQUFJLFNBQVNELEdBQUUsQ0FBQyxFQUFFLE9BQU9BLEdBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUU7QUFDL0MsbUJBQU9BLEdBQUUsQ0FBQyxFQUFFLE9BQU8sR0FBR0EsR0FBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLE1BQU0sS0FBSyxRQUFRRSxJQUFHLElBQUksQ0FBQyxLQUFLQyxLQUFJLE1BQU07QUFBQSxVQUNqRixHQUNDRixHQUFFLFVBQVUsU0FBVUEsSUFBR0MsSUFBRztBQUMzQixnQkFBSUMsS0FBSSw2QkFBNkIsWUFBWSxHQUMvQ0gsS0FBSTtBQUNOLFlBQUFFLEtBQUksT0FBT0EsTUFBSztBQUNoQixxQkFBUyxJQUFJLEdBQUcsSUFBSUQsR0FBRSxVQUFTO0FBQzdCLGtCQUFJLE9BQU9FLEdBQUUsUUFBUUYsR0FBRSxDQUFDLENBQUMsR0FBRztBQUMxQixvQkFBSSxJQUFJRSxHQUFFLFFBQVFGLEdBQUUsQ0FBQyxDQUFDO0FBQ3RCLGdCQUFBRSxHQUFFLElBQUlELEVBQUMsSUFBS0YsTUFBS0csR0FBRSxJQUFJRCxFQUFDLElBQU1GLE1BQUtHLEdBQUUsSUFBSUQsS0FBSSxFQUFFO0FBQUEsY0FDakQ7QUFDQTtBQUFBLFlBQ0Y7QUFDQSxtQkFBT0Y7QUFBQSxVQUNULEdBQ0FDO0FBQUEsUUFFSixHQUFHO0FBQ0gsVUFBRSxTQUFTRDtBQUFBLE1BQ2I7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILENBQUM7QUFFSDsiLAogICJuYW1lcyI6IFsicmVnaXN0ZXJDYW5jZWwiLCAiciIsICJ0IiwgImUiLCAibiIsICJpIiwgImEiLCAicyIsICJvIiwgInUiLCAiYjY0IiwgImJsb2IiLCAiZyIsICJsIiwgImgiLCAiZiIsICJwIiwgImIiLCAiYyIsICJkIiwgInYiLCAieSIsICJJIiwgIm0iXQp9Cg==
