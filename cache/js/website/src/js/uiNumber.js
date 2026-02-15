class uiNumber extends HTMLElement {
  constructor() {
    super();
    const start = parseFloat(this.getAttribute("start")) || 0;
    if (!uiNumber.adopted) {
      const adopted = new CSSStyleSheet();
      adopted.replaceSync(`@property --percent { syntax: "<number>"; initial-value: ${start}; inherits: true; }
@property --temp { syntax: "<number>"; initial-value: ${start}; inherits: false; }
@property --duration { syntax: "<integer>"; initial-value: 600; inherits: true; }
@property --v1 { syntax: "<integer>"; initial-value: 0; inherits: false; }
@property --v2 { syntax: "<integer>"; initial-value: 0; inherits: false; }
@property --va { syntax: "<integer>"; initial-value: 0; inherits: true; }
@property --vb { syntax: "<integer>"; initial-value: 0; inherits: true; }
@property --vc { syntax: "<integer>"; initial-value: 0; inherits: true; }
`);
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, adopted];
      uiNumber.adopted = true;
    }
    const end = parseFloat(this.getAttribute("end")) || 10;
    const percent = parseFloat(this.getAttribute("percent")) || 0;
    const iteration = parseFloat(this.getAttribute("iteration")) || 1;
    const suffix = this.getAttribute("suffix") || "";
    const prefix = this.getAttribute("prefix") || "";
    const comma = this.getAttribute("comma") || "";
    const type = this.getAttribute("type") || "number";
    const styles = `transition: --percent 2.6s; --temp: calc(var(--percent, 0));--timing: steps(${/*Math.abs(end - start)*/
    1}); --v1: max(var(--temp) - 0.5, 0); --v2: max((var(--temp) - var(--v1)) * 100, 0);           
          `;
    const stylesheet = new CSSStyleSheet();
    const css = `
          @keyframes N { to { --percent: 1000; } }
          @counter-style pad-3 {
              system: numeric;
              symbols: "0" "1" "2" "3" "4" "5" "6" "7" "8" "9";
              pad: 3 "0";
          }
          :host > .ui-number {
            transition: --percent var(--duration, 1.6s);
            --temp: calc(var(--percent, 0));
            --v1: max(var(--temp) - 0.5, 0);
            --v2: max((var(--temp) - var(--v1)) * 100, 0);
            --vc: mod(var(--v1), 1000);
            --vb: mod(max(0, (var(--v1) / 1000) - 0.5), 1000);
            --va: mod(max(0, (var(--v1) / 1000000) - 0.5), 1000);
            counter-reset: v1 var(--v1) v2 var(--v2) va var(--va) vb var(--vb) vc var(--vc);
            animation: N var(--duration, 3s) var(--timing, linear) forwards var(--iteration, 1) var(--playstate, running);
          }
          
          
           :host .ui-number {
            display: inline-block;
          }
          :host .ui-number[part="number-thousands"]::before {
             content: var(--prefix, '') counter(vb) ' ' counter(vc, pad-3) var(--comma, '') counter(v2, decimal-leading-zero) var(--suffix, '');
          }
          :host .ui-number[part="number-millions"]::before {
             content: var(--prefix, '') counter(va) ' ' counter(vb, pad-3) ' ' counter(vc, pad-3) var(--comma, '') counter(v2, decimal-leading-zero) var(--suffix, '');
          }
          :host .ui-number[part="number"]::before {
             content: var(--prefix, '') counter(v1) var(--comma, '') counter(v2, decimal-leading-zero) var(--suffix, '');
          }
          :host .ui-number[part="int-thousands"]::before {
             content: var(--prefix, '') counter(vb) ' ' counter(vc, pad-3) var(--suffix, '');
          }
          :host .ui-number[part="int-millions"]::before {
             content: var(--prefix, '') counter(va) ' ' counter(vb, pad-3) ' ' counter(vc, pad-3) var(--suffix, '');
          }
          :host .ui-number[part=int]::before {
             content: var(--prefix, '') counter(v1) var(--suffix, '');
          }
          :host .ui-number[part="percent"]::before {
             content: var(--prefix, '') counter(v1) var(--suffix, '');
          }
          :host .ui-number[part="percent-number"]::before {
             content: var(--prefix, '') counter(v1) var(--comma, '') counter(v2, decimal-leading-zero) var(--suffix, '');
          }
         `;
    stylesheet.replaceSync(css);
    this.attachShadow({
      mode: "open"
    }).innerHTML = `
        <span class="ui-number" part="${type}" style="${styles}"></span>`;
    this.shadowRoot.adoptedStyleSheets = [stylesheet];
  }
}
uiNumber.adopted = false;
customElements.define("ui-number", uiNumber);
uiNumber.initJQuery = function($) {
  $.fn.uiNumber = function(value, cls, type, appendIndex, prefix, suffix, comma, duration, hideIfEmpty, doNotAppendSpace) {
    if (!this.length) {
      return this;
    }
    type = type || "number";
    duration = duration || 600;
    const match = /(.*?\-?)([\d\s]+)([,.]?)([\d]*)(.*)/.exec(value), number = parseInt((match?.[2] || "0").replace(/[\s]*/g, "")), decimal = parseInt((match?.[4]?.substring(0, 2) || "0").padEnd(2, "0")), pre = match?.[1], t = $(this), ty = type, pref = prefix, suff = suffix, comm = comma, hasValue = !!(value && (number || decimal)), n = this.find(`ui-number`).eq(appendIndex || 0), clsText = [cls || "", hasValue ? "has-value" : "is-empty"].filter((c) => c).join(" "), prefixText = `'${prefix || ""}${!doNotAppendSpace ? " " : ""}${(pre == "-" ? "\u2013" : pre || "")?.replace(/'/g, "&#39;")} '`, commaText = `'${comma || match?.[3] || ""}'`, suf = (match?.[5] || "").trimEnd(), sufi = (suffix || "")?.replace(/'/g, "&#39;"), suffixText = `'${suf.startsWith(" ") || doNotAppendSpace ? "" : " "}${suf}${sufi?.length && !doNotAppendSpace ? " " : ""}${sufi}'`;
    if (type == "number" || type == "int")
      type += number >= 1e6 || number <= -1e6 ? "-millions" : number >= 1e3 || number <= -1e3 ? "-thousands" : "";
    const style = (number2, decimal2, duration2) => `--comma: ${commaText || ""}; --prefix: ${prefixText};--suffix: ${suffix}; --percent: ${number2 + decimal2 / 100};${duration2 ? "--duration: " + duration2 : ""}`, old = n.css("--percent") || 0;
    if (n.length) {
      let apply = function(number2, decimal2, type2, duration2) {
        const s = style(number2, decimal2, duration2);
        n.attr("prefix", prefixText).attr("comma", commaText).attr("suffix", suffix).attr("type", type2).attr("style", s);
        $(n[0].shadowRoot).find(".ui-number").attr("part", type2).css("transition-duration", duration2 + "ms");
      }, loop = function() {
        const t2 = timings.splice(0, 1)[0];
        apply(t2.number, t2.decimal, t2.type, t2.duration);
        if (timings.length) {
          setTimeout(loop, t2.duration);
        }
      };
      const timings = [{
        number,
        decimal,
        type
      }];
      if (number >= 1e6 & old < 1e6) {
        timings.splice(0, 0, {
          number: 999999,
          decimal: 99,
          type: ty + "-thousands"
        });
      }
      if (number >= 1e3 & old < 1e3) {
        timings.splice(0, 0, {
          number: 999,
          decimal: 99,
          type: ty
        });
      }
      if (number < 1e6 & old >= 1e6) {
        timings.splice(0, 0, {
          number: 1e6,
          decimal: 0,
          type: ty + "-millions"
        });
      }
      if (number < 1e3 & old >= 1e3) {
        timings.splice(0, 0, {
          number: 1e3,
          decimal: 0,
          type: ty + "-thousands"
        });
      }
      timings.forEach((t2) => t2.duration = (duration || 1800) / timings.length);
      loop();
      n[0].className = clsText;
      hideIfEmpty && n.toggle(!!hasValue);
    } else {
      const nn = $(`<ui-number class="ui-number ${cls}" type="${ty || "number"}" duration="600" prefix=${prefixText} comma=${commaText} suffix=${suffix} style="${style(0, 0)}">${value}</ui-number>`);
      t[typeof appendIndex == "number" ? "append" : "html"](nn);
      setTimeout((t2) => this.uiNumber(value, clsText, ty, appendIndex, pref, suff, comm, duration, hideIfEmpty, doNotAppendSpace), 0);
      hideIfEmpty && nn.toggle(!!hasValue);
    }
    return this;
  };
};
export { uiNumber };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmlsZTovLy9EOi93b3JrL0RBVEV4Mi5iaWtlL3d3My93ZWJzaXRlL3NyYy9qcy91aU51bWJlci5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY2xhc3MgdWlOdW1iZXIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0Y29uc3Qgc3RhcnQgPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cmlidXRlKFwic3RhcnRcIikpIHx8IDA7XHJcblx0XHRpZiAoIXVpTnVtYmVyLmFkb3B0ZWQpIHtcclxuXHRcdFx0LyogVGhlc2Ugc3R5bGVzIGFyZSBhZGRlZCBvbmNlICovXHJcblx0XHRcdGNvbnN0IGFkb3B0ZWQgPSBuZXcgQ1NTU3R5bGVTaGVldCgpO1xyXG5cdFx0XHRhZG9wdGVkLnJlcGxhY2VTeW5jKGBAcHJvcGVydHkgLS1wZXJjZW50IHsgc3ludGF4OiBcIjxudW1iZXI+XCI7IGluaXRpYWwtdmFsdWU6ICR7c3RhcnR9OyBpbmhlcml0czogdHJ1ZTsgfVxyXG5AcHJvcGVydHkgLS10ZW1wIHsgc3ludGF4OiBcIjxudW1iZXI+XCI7IGluaXRpYWwtdmFsdWU6ICR7c3RhcnR9OyBpbmhlcml0czogZmFsc2U7IH1cclxuQHByb3BlcnR5IC0tZHVyYXRpb24geyBzeW50YXg6IFwiPGludGVnZXI+XCI7IGluaXRpYWwtdmFsdWU6IDYwMDsgaW5oZXJpdHM6IHRydWU7IH1cclxuQHByb3BlcnR5IC0tdjEgeyBzeW50YXg6IFwiPGludGVnZXI+XCI7IGluaXRpYWwtdmFsdWU6IDA7IGluaGVyaXRzOiBmYWxzZTsgfVxyXG5AcHJvcGVydHkgLS12MiB7IHN5bnRheDogXCI8aW50ZWdlcj5cIjsgaW5pdGlhbC12YWx1ZTogMDsgaW5oZXJpdHM6IGZhbHNlOyB9XHJcbkBwcm9wZXJ0eSAtLXZhIHsgc3ludGF4OiBcIjxpbnRlZ2VyPlwiOyBpbml0aWFsLXZhbHVlOiAwOyBpbmhlcml0czogdHJ1ZTsgfVxyXG5AcHJvcGVydHkgLS12YiB7IHN5bnRheDogXCI8aW50ZWdlcj5cIjsgaW5pdGlhbC12YWx1ZTogMDsgaW5oZXJpdHM6IHRydWU7IH1cclxuQHByb3BlcnR5IC0tdmMgeyBzeW50YXg6IFwiPGludGVnZXI+XCI7IGluaXRpYWwtdmFsdWU6IDA7IGluaGVyaXRzOiB0cnVlOyB9XHJcbmApO1xyXG5cdFx0XHRkb2N1bWVudC5hZG9wdGVkU3R5bGVTaGVldHMgPSBbLi4uZG9jdW1lbnQuYWRvcHRlZFN0eWxlU2hlZXRzLCBhZG9wdGVkXTtcclxuXHRcdFx0dWlOdW1iZXIuYWRvcHRlZCA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgZW5kID0gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHJpYnV0ZShcImVuZFwiKSkgfHwgMTA7XHJcblx0XHRjb25zdCBwZXJjZW50ID0gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHJpYnV0ZShcInBlcmNlbnRcIikpIHx8IDA7XHJcblx0XHRjb25zdCBpdGVyYXRpb24gPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cmlidXRlKFwiaXRlcmF0aW9uXCIpKSB8fCAxO1xyXG5cdFx0Y29uc3Qgc3VmZml4ID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJzdWZmaXhcIikgfHwgXCJcIjtcclxuXHRcdGNvbnN0IHByZWZpeCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwicHJlZml4XCIpIHx8IFwiXCI7XHJcblx0XHRjb25zdCBjb21tYSA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiY29tbWFcIikgfHwgXCJcIjtcclxuXHRcdGNvbnN0IHR5cGUgPSB0aGlzLmdldEF0dHJpYnV0ZShcInR5cGVcIikgfHwgXCJudW1iZXJcIjtcclxuXHRcdGNvbnN0IHN0eWxlcyA9IGB0cmFuc2l0aW9uOiAtLXBlcmNlbnQgMi42czsgLS10ZW1wOiBjYWxjKHZhcigtLXBlcmNlbnQsIDApKTstLXRpbWluZzogc3RlcHMoJHsvKk1hdGguYWJzKGVuZCAtIHN0YXJ0KSovXHJcblx0XHRcdDF9KTsgLS12MTogbWF4KHZhcigtLXRlbXApIC0gMC41LCAwKTsgLS12MjogbWF4KCh2YXIoLS10ZW1wKSAtIHZhcigtLXYxKSkgKiAxMDAsIDApOyAgICAgICAgICAgXHJcbiAgICAgICAgICBgO1xyXG5cdFx0Ly8gW1xyXG5cdFx0Ly8gICBgLS12MTogJHtzdGFydH1gLFxyXG5cdFx0Ly8gICBgLS12MjogJHtlbmR9YCxcclxuXHRcdC8vICAgYC0tZHVyYXRpb246ICR7cGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2R1cmF0aW9uJykpIHx8IDIwMDB9bXNgLFxyXG5cdFx0Ly8gICBgLS10ZW1wOiAke2l0ZXJhdGlvbiA9PT0gLTEgPyAnaW5maW5pdGUnIDogaXRlcmF0aW9ufWAsXHJcblx0XHQvLyAgIGAtLXRpbWluZzogc3RlcHMoJHtNYXRoLmFicyhlbmQgLSBzdGFydCl9KWBcclxuXHRcdC8vIF1cclxuXHJcblx0XHQvKlxyXG4gIFRoZXNlIHN0eWxlcyBhcmUgYWRkZWQgZm9yIGVhY2ggaW5zdGFuY2UuIFxyXG4gIElmIGBhbmltYXRpb25gIGlzIG1vdmVkIHRvIGBhZG9wdGVkYCwgaXQgZG9lc24ndCB3b3JrIGluIFNhZmFyaS4gXHJcbiAgSWYgYC0tbnVtYCBpcyBzZXQgdG8gYHZhcigtLWVuZCwgMTApYCBpbiB0aGUga2V5ZnJhbWVzLCBpdCBkb2Vzbid0IHdvcmsgaW4gRmlyZWZveC5cclxuICAqL1xyXG5cdFx0Y29uc3Qgc3R5bGVzaGVldCA9IG5ldyBDU1NTdHlsZVNoZWV0KCk7XHJcblx0XHRjb25zdCBjc3MgPSBgXHJcbiAgICAgICAgICBAa2V5ZnJhbWVzIE4geyB0byB7IC0tcGVyY2VudDogMTAwMDsgfSB9XHJcbiAgICAgICAgICBAY291bnRlci1zdHlsZSBwYWQtMyB7XHJcbiAgICAgICAgICAgICAgc3lzdGVtOiBudW1lcmljO1xyXG4gICAgICAgICAgICAgIHN5bWJvbHM6IFwiMFwiIFwiMVwiIFwiMlwiIFwiM1wiIFwiNFwiIFwiNVwiIFwiNlwiIFwiN1wiIFwiOFwiIFwiOVwiO1xyXG4gICAgICAgICAgICAgIHBhZDogMyBcIjBcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIDpob3N0ID4gLnVpLW51bWJlciB7XHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246IC0tcGVyY2VudCB2YXIoLS1kdXJhdGlvbiwgMS42cyk7XHJcbiAgICAgICAgICAgIC0tdGVtcDogY2FsYyh2YXIoLS1wZXJjZW50LCAwKSk7XHJcbiAgICAgICAgICAgIC0tdjE6IG1heCh2YXIoLS10ZW1wKSAtIDAuNSwgMCk7XHJcbiAgICAgICAgICAgIC0tdjI6IG1heCgodmFyKC0tdGVtcCkgLSB2YXIoLS12MSkpICogMTAwLCAwKTtcclxuICAgICAgICAgICAgLS12YzogbW9kKHZhcigtLXYxKSwgMTAwMCk7XHJcbiAgICAgICAgICAgIC0tdmI6IG1vZChtYXgoMCwgKHZhcigtLXYxKSAvIDEwMDApIC0gMC41KSwgMTAwMCk7XHJcbiAgICAgICAgICAgIC0tdmE6IG1vZChtYXgoMCwgKHZhcigtLXYxKSAvIDEwMDAwMDApIC0gMC41KSwgMTAwMCk7XHJcbiAgICAgICAgICAgIGNvdW50ZXItcmVzZXQ6IHYxIHZhcigtLXYxKSB2MiB2YXIoLS12MikgdmEgdmFyKC0tdmEpIHZiIHZhcigtLXZiKSB2YyB2YXIoLS12Yyk7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbjogTiB2YXIoLS1kdXJhdGlvbiwgM3MpIHZhcigtLXRpbWluZywgbGluZWFyKSBmb3J3YXJkcyB2YXIoLS1pdGVyYXRpb24sIDEpIHZhcigtLXBsYXlzdGF0ZSwgcnVubmluZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgIDpob3N0IC51aS1udW1iZXIge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICA6aG9zdCAudWktbnVtYmVyW3BhcnQ9XCJudW1iZXItdGhvdXNhbmRzXCJdOjpiZWZvcmUge1xyXG4gICAgICAgICAgICAgY29udGVudDogdmFyKC0tcHJlZml4LCAnJykgY291bnRlcih2YikgJyAnIGNvdW50ZXIodmMsIHBhZC0zKSB2YXIoLS1jb21tYSwgJycpIGNvdW50ZXIodjIsIGRlY2ltYWwtbGVhZGluZy16ZXJvKSB2YXIoLS1zdWZmaXgsICcnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIDpob3N0IC51aS1udW1iZXJbcGFydD1cIm51bWJlci1taWxsaW9uc1wiXTo6YmVmb3JlIHtcclxuICAgICAgICAgICAgIGNvbnRlbnQ6IHZhcigtLXByZWZpeCwgJycpIGNvdW50ZXIodmEpICcgJyBjb3VudGVyKHZiLCBwYWQtMykgJyAnIGNvdW50ZXIodmMsIHBhZC0zKSB2YXIoLS1jb21tYSwgJycpIGNvdW50ZXIodjIsIGRlY2ltYWwtbGVhZGluZy16ZXJvKSB2YXIoLS1zdWZmaXgsICcnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIDpob3N0IC51aS1udW1iZXJbcGFydD1cIm51bWJlclwiXTo6YmVmb3JlIHtcclxuICAgICAgICAgICAgIGNvbnRlbnQ6IHZhcigtLXByZWZpeCwgJycpIGNvdW50ZXIodjEpIHZhcigtLWNvbW1hLCAnJykgY291bnRlcih2MiwgZGVjaW1hbC1sZWFkaW5nLXplcm8pIHZhcigtLXN1ZmZpeCwgJycpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgOmhvc3QgLnVpLW51bWJlcltwYXJ0PVwiaW50LXRob3VzYW5kc1wiXTo6YmVmb3JlIHtcclxuICAgICAgICAgICAgIGNvbnRlbnQ6IHZhcigtLXByZWZpeCwgJycpIGNvdW50ZXIodmIpICcgJyBjb3VudGVyKHZjLCBwYWQtMykgdmFyKC0tc3VmZml4LCAnJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICA6aG9zdCAudWktbnVtYmVyW3BhcnQ9XCJpbnQtbWlsbGlvbnNcIl06OmJlZm9yZSB7XHJcbiAgICAgICAgICAgICBjb250ZW50OiB2YXIoLS1wcmVmaXgsICcnKSBjb3VudGVyKHZhKSAnICcgY291bnRlcih2YiwgcGFkLTMpICcgJyBjb3VudGVyKHZjLCBwYWQtMykgdmFyKC0tc3VmZml4LCAnJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICA6aG9zdCAudWktbnVtYmVyW3BhcnQ9aW50XTo6YmVmb3JlIHtcclxuICAgICAgICAgICAgIGNvbnRlbnQ6IHZhcigtLXByZWZpeCwgJycpIGNvdW50ZXIodjEpIHZhcigtLXN1ZmZpeCwgJycpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgOmhvc3QgLnVpLW51bWJlcltwYXJ0PVwicGVyY2VudFwiXTo6YmVmb3JlIHtcclxuICAgICAgICAgICAgIGNvbnRlbnQ6IHZhcigtLXByZWZpeCwgJycpIGNvdW50ZXIodjEpIHZhcigtLXN1ZmZpeCwgJycpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgOmhvc3QgLnVpLW51bWJlcltwYXJ0PVwicGVyY2VudC1udW1iZXJcIl06OmJlZm9yZSB7XHJcbiAgICAgICAgICAgICBjb250ZW50OiB2YXIoLS1wcmVmaXgsICcnKSBjb3VudGVyKHYxKSB2YXIoLS1jb21tYSwgJycpIGNvdW50ZXIodjIsIGRlY2ltYWwtbGVhZGluZy16ZXJvKSB2YXIoLS1zdWZmaXgsICcnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgYDtcclxuXHRcdHN0eWxlc2hlZXQucmVwbGFjZVN5bmMoY3NzKTtcclxuXHRcdHRoaXMuYXR0YWNoU2hhZG93KHtcclxuXHRcdFx0bW9kZTogXCJvcGVuXCJcclxuXHRcdH0pLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW51bWJlclwiIHBhcnQ9XCIke3R5cGV9XCIgc3R5bGU9XCIke3N0eWxlc31cIj48L3NwYW4+YDtcclxuXHRcdHRoaXMuc2hhZG93Um9vdC5hZG9wdGVkU3R5bGVTaGVldHMgPSBbc3R5bGVzaGVldF07XHJcblx0fVxyXG59XHJcbnVpTnVtYmVyLmFkb3B0ZWQgPSBmYWxzZTtcclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwidWktbnVtYmVyXCIsIHVpTnVtYmVyKTtcclxudWlOdW1iZXIuaW5pdEpRdWVyeSA9IGZ1bmN0aW9uICgkKSB7XHJcblx0JC5mbi51aU51bWJlciA9IGZ1bmN0aW9uICh2YWx1ZSwgY2xzLCB0eXBlLCBhcHBlbmRJbmRleCwgcHJlZml4LCBzdWZmaXgsIGNvbW1hLCBkdXJhdGlvbiwgaGlkZUlmRW1wdHksIGRvTm90QXBwZW5kU3BhY2UpIHtcclxuXHRcdGlmICghdGhpcy5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblx0XHR0eXBlID0gdHlwZSB8fCBcIm51bWJlclwiO1xyXG5cdFx0ZHVyYXRpb24gPSBkdXJhdGlvbiB8fCA2MDA7XHJcblx0XHRjb25zdCBtYXRjaCA9IC8oLio/XFwtPykoW1xcZFxcc10rKShbLC5dPykoW1xcZF0qKSguKikvLmV4ZWModmFsdWUpLFxyXG5cdFx0XHRudW1iZXIgPSBwYXJzZUludCgobWF0Y2g/LlsyXSB8fCBcIjBcIikucmVwbGFjZSgvW1xcc10qL2csIFwiXCIpKSxcclxuXHRcdFx0ZGVjaW1hbCA9IHBhcnNlSW50KChtYXRjaD8uWzRdPy5zdWJzdHJpbmcoMCwgMikgfHwgXCIwXCIpLnBhZEVuZCgyLCBcIjBcIikpLFxyXG5cdFx0XHRwcmUgPSBtYXRjaD8uWzFdLFxyXG5cdFx0XHR0ID0gJCh0aGlzKSxcclxuXHRcdFx0dHkgPSB0eXBlLFxyXG5cdFx0XHRwcmVmID0gcHJlZml4LFxyXG5cdFx0XHRzdWZmID0gc3VmZml4LFxyXG5cdFx0XHRjb21tID0gY29tbWEsXHJcblx0XHRcdGhhc1ZhbHVlID0gISEodmFsdWUgJiYgKG51bWJlciB8fCBkZWNpbWFsKSksXHJcblx0XHRcdG4gPSB0aGlzLmZpbmQoYHVpLW51bWJlcmApLmVxKGFwcGVuZEluZGV4IHx8IDApLFxyXG5cdFx0XHRjbHNUZXh0ID0gW2NscyB8fCBcIlwiLCBoYXNWYWx1ZSA/IFwiaGFzLXZhbHVlXCIgOiBcImlzLWVtcHR5XCJdLmZpbHRlcihjID0+IGMpLmpvaW4oXCIgXCIpLFxyXG5cdFx0XHRwcmVmaXhUZXh0ID0gYCcke3ByZWZpeCB8fCBcIlwifSR7IWRvTm90QXBwZW5kU3BhY2UgPyBcIiBcIiA6IFwiXCJ9JHsocHJlID09IFwiLVwiID8gXCJcdTIwMTNcIiA6IHByZSB8fCBcIlwiKT8ucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpfSAnYCxcclxuXHRcdFx0Y29tbWFUZXh0ID0gYCcke2NvbW1hIHx8IG1hdGNoPy5bM10gfHwgXCJcIn0nYCxcclxuXHRcdFx0c3VmID0gKG1hdGNoPy5bNV0gfHwgXCJcIikudHJpbUVuZCgpLFxyXG5cdFx0XHRzdWZpID0gKHN1ZmZpeCB8fCBcIlwiKT8ucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLFxyXG5cdFx0XHRzdWZmaXhUZXh0ID0gYCcke3N1Zi5zdGFydHNXaXRoKFwiIFwiKSB8fCBkb05vdEFwcGVuZFNwYWNlID8gXCJcIiA6IFwiIFwifSR7c3VmfSR7c3VmaT8ubGVuZ3RoICYmICFkb05vdEFwcGVuZFNwYWNlID8gXCIgXCIgOiBcIlwifSR7c3VmaX0nYDtcclxuXHRcdGlmICh0eXBlID09IFwibnVtYmVyXCIgfHwgdHlwZSA9PSBcImludFwiKVxyXG5cdFx0XHR0eXBlICs9IG51bWJlciA+PSAxMDAwMDAwIHx8IG51bWJlciA8PSAtMTAwMDAwMCA/IFwiLW1pbGxpb25zXCIgOiBudW1iZXIgPj0gMTAwMCB8fCBudW1iZXIgPD0gLTEwMDAgPyBcIi10aG91c2FuZHNcIiA6IFwiXCI7XHJcblx0XHRjb25zdCBzdHlsZSA9IChudW1iZXIsIGRlY2ltYWwsIGR1cmF0aW9uKSA9PiBgLS1jb21tYTogJHtjb21tYVRleHQgfHwgXCJcIn07IC0tcHJlZml4OiAke3ByZWZpeFRleHR9Oy0tc3VmZml4OiAke3N1ZmZpeH07IC0tcGVyY2VudDogJHtudW1iZXIgKyBkZWNpbWFsIC8gMTAwfTske2R1cmF0aW9uID8gXCItLWR1cmF0aW9uOiBcIiArIGR1cmF0aW9uIDogXCJcIn1gXHJcblx0XHRcdCwgb2xkID0gbi5jc3MoXCItLXBlcmNlbnRcIikgfHwgMDtcclxuXHRcdGlmIChuLmxlbmd0aCkge1xyXG5cdFx0XHRmdW5jdGlvbiBhcHBseShudW1iZXIsIGRlY2ltYWwsIHR5cGUsIGR1cmF0aW9uKSB7XHJcblx0XHRcdFx0Y29uc3QgcyA9IHN0eWxlKG51bWJlciwgZGVjaW1hbCwgZHVyYXRpb24pO1xyXG5cdFx0XHRcdG4uYXR0cihcInByZWZpeFwiLCBwcmVmaXhUZXh0KS5hdHRyKFwiY29tbWFcIiwgY29tbWFUZXh0KS5hdHRyKFwic3VmZml4XCIsIHN1ZmZpeCkuYXR0cihcInR5cGVcIiwgdHlwZSkuYXR0cihcInN0eWxlXCIsIHMpO1xyXG5cdFx0XHRcdCQoblswXS5zaGFkb3dSb290KS5maW5kKFwiLnVpLW51bWJlclwiKS5hdHRyKFwicGFydFwiLCB0eXBlKS5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIGR1cmF0aW9uICsgXCJtc1wiKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCB0aW1pbmdzID0gW3tcclxuXHRcdFx0XHRudW1iZXIsXHJcblx0XHRcdFx0ZGVjaW1hbCxcclxuXHRcdFx0XHR0eXBlXHJcblx0XHRcdH1dO1xyXG5cdFx0XHRpZiAoKG51bWJlciA+PSAxMDAwMDAwKSAmIChvbGQgPCAxMDAwMDAwKSkge1xyXG5cdFx0XHRcdHRpbWluZ3Muc3BsaWNlKDAsIDAsIHtcclxuXHRcdFx0XHRcdG51bWJlcjogOTk5OTk5LFxyXG5cdFx0XHRcdFx0ZGVjaW1hbDogOTksXHJcblx0XHRcdFx0XHR0eXBlOiB0eSArIFwiLXRob3VzYW5kc1wiXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKChudW1iZXIgPj0gMTAwMCkgJiAob2xkIDwgMTAwMCkpIHtcclxuXHRcdFx0XHR0aW1pbmdzLnNwbGljZSgwLCAwLCB7XHJcblx0XHRcdFx0XHRudW1iZXI6IDk5OSxcclxuXHRcdFx0XHRcdGRlY2ltYWw6IDk5LFxyXG5cdFx0XHRcdFx0dHlwZTogdHlcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKChudW1iZXIgPCAxMDAwMDAwKSAmIChvbGQgPj0gMTAwMDAwMCkpIHtcclxuXHRcdFx0XHR0aW1pbmdzLnNwbGljZSgwLCAwLCB7XHJcblx0XHRcdFx0XHRudW1iZXI6IDEwMDAwMDAsXHJcblx0XHRcdFx0XHRkZWNpbWFsOiAwLFxyXG5cdFx0XHRcdFx0dHlwZTogdHkgKyBcIi1taWxsaW9uc1wiXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKChudW1iZXIgPCAxMDAwKSAmIChvbGQgPj0gMTAwMCkpIHtcclxuXHRcdFx0XHR0aW1pbmdzLnNwbGljZSgwLCAwLCB7XHJcblx0XHRcdFx0XHRudW1iZXI6IDEwMDAsXHJcblx0XHRcdFx0XHRkZWNpbWFsOiAwLFxyXG5cdFx0XHRcdFx0dHlwZTogdHkgKyBcIi10aG91c2FuZHNcIlxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRpbWluZ3MuZm9yRWFjaCh0ID0+ICh0LmR1cmF0aW9uID0gKGR1cmF0aW9uIHx8IDE4MDApIC8gdGltaW5ncy5sZW5ndGgpKTtcclxuXHRcdFx0ZnVuY3Rpb24gbG9vcCgpIHtcclxuXHRcdFx0XHRjb25zdCB0ID0gdGltaW5ncy5zcGxpY2UoMCwgMSlbMF07XHJcblx0XHRcdFx0YXBwbHkodC5udW1iZXIsIHQuZGVjaW1hbCwgdC50eXBlLCB0LmR1cmF0aW9uKTtcclxuXHRcdFx0XHRpZiAodGltaW5ncy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQobG9vcCwgdC5kdXJhdGlvbik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGxvb3AoKTtcclxuXHRcdFx0blswXS5jbGFzc05hbWUgPSBjbHNUZXh0O1xyXG5cdFx0XHRoaWRlSWZFbXB0eSAmJiBuLnRvZ2dsZSghIWhhc1ZhbHVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnN0IG5uID0gJChgPHVpLW51bWJlciBjbGFzcz1cInVpLW51bWJlciAke2Nsc31cIiB0eXBlPVwiJHt0eSB8fCBcIm51bWJlclwifVwiIGR1cmF0aW9uPVwiNjAwXCIgcHJlZml4PSR7cHJlZml4VGV4dH0gY29tbWE9JHtjb21tYVRleHR9IHN1ZmZpeD0ke3N1ZmZpeH0gc3R5bGU9XCIke3N0eWxlKDAsIDApfVwiPiR7dmFsdWV9PC91aS1udW1iZXI+YCk7XHJcblx0XHRcdHRbdHlwZW9mIGFwcGVuZEluZGV4ID09IFwibnVtYmVyXCIgPyBcImFwcGVuZFwiIDogXCJodG1sXCJdKG5uKTtcclxuXHRcdFx0c2V0VGltZW91dCh0ID0+IHRoaXMudWlOdW1iZXIodmFsdWUsIGNsc1RleHQsIHR5LCBhcHBlbmRJbmRleCwgcHJlZiwgc3VmZiwgY29tbSwgZHVyYXRpb24sIGhpZGVJZkVtcHR5LCBkb05vdEFwcGVuZFNwYWNlKSwgMCk7XHJcblx0XHRcdGhpZGVJZkVtcHR5ICYmIG5uLnRvZ2dsZSghIWhhc1ZhbHVlKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IHsgdWlOdW1iZXIgfTsiXSwKICAibWFwcGluZ3MiOiAiQUFBQSxNQUFNLGlCQUFpQixZQUFZO0FBQUEsRUFDbEMsY0FBYztBQUNiLFVBQU07QUFDTixVQUFNLFFBQVEsV0FBVyxLQUFLLGFBQWEsT0FBTyxDQUFDLEtBQUs7QUFDeEQsUUFBSSxDQUFDLFNBQVMsU0FBUztBQUV0QixZQUFNLFVBQVUsSUFBSSxjQUFjO0FBQ2xDLGNBQVEsWUFBWSw0REFBNEQsS0FBSztBQUFBLHdEQUNoQyxLQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FPNUQ7QUFDRSxlQUFTLHFCQUFxQixDQUFDLEdBQUcsU0FBUyxvQkFBb0IsT0FBTztBQUN0RSxlQUFTLFVBQVU7QUFBQSxJQUNwQjtBQUVBLFVBQU0sTUFBTSxXQUFXLEtBQUssYUFBYSxLQUFLLENBQUMsS0FBSztBQUNwRCxVQUFNLFVBQVUsV0FBVyxLQUFLLGFBQWEsU0FB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
