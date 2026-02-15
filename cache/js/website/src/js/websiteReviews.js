import { $, $d, $w, d, notOnceOnly, onceOnly, isInOutOfView, lazyCSS } from "./utils.js";
function checkHash() {
  if ($d.is(".page-type-SITE")) {
    if (location.hash == "#reviews") {
      $("#tile-text-xEZ4QK")[0]?.scrollIntoView(smooth);
    }
    if (location.hash == "#contact") {
      $("#tile-location-BBYesn")[0]?.scrollIntoView(smooth);
    }
  }
}
export function injectReviews(page) {
  const toTranslate = {}, lang = D.lang.toLowerCase();
  if (page.type == "SITE") {
    $d.arrive(
      `.ins-header__menu-link-title[href="#contact"], .ins-header__menu-link-title[href="#reviews"]`,
      {
        existing: true,
        onceOnly: false
      },
      (elem) => {
        elem.addEventListener(
          "click",
          (e) => {
            setTimeout(checkHash, 10);
          }
        );
      }
    );
    $d.arrive(
      ".es-review-content-text, .bwqEnm, .gqjyBj, .dnAvMj, .dqiKFy, .bwqEnm",
      notOnceOnly,
      (elem) => {
        const e = $(elem), key = e.text(), translation = w.reviews?.[key] || key;
        toTranslate[key] = {};
        if (key != translation) {
          e.text(translation);
        }
      }
    );
    if (!location.patched) {
      location.pathed = true;
      $w.on("popstate", checkHash);
    }
    $d.arrive(
      "#tile-location-BBYesn",
      notOnceOnly,
      (elem) => {
        $(elem).attr("name", "contact");
      }
    );
    $d.arrive(
      "#tile-text-xEZ4QK",
      notOnceOnly,
      (elem) => {
        const $elem = $(elem);
        if (!$elem.is(".five-star-revews")) {
          $elem.attr("name", "reviews");
          elem.arrive(
            "#tile-text-xEZ4QK .ins-tile__title",
            notOnceOnly,
            (elem2) => {
              const title = $(elem2);
              title.text(title.text()?.replace(/5/gi, "")?.replace(/\*\*\*\*\*/gi, ""));
              if (location.hash == "#tile-text-xEZ4QK" || location.hash == "#reviews") {
                elem2.scrollIntoView(smooth);
              }
            }
          );
        }
        elem.arrive(
          ".ins-tile__description",
          notOnceOnly,
          (elem2) => {
            isInOutOfView(
              elem2,
              (e, state) => {
                $d.toggleClass("show-reviews", state.isInView);
                if (state.isInView && !window.reviewsLoaded) {
                  var s = $("<script/>");
                  s[0].addEventListener(
                    "load",
                    (e2) => {
                      window.reviewsLoaded = true;
                      $(elem2).wrap(`<div class="loading"/>`).html(`<div class="website-reviews"><div lang="${$d.attr("lang")}" class="elfsight-app-bd1067c4-c177-4330-8b54-5ec616880eb4" data-elfsight-app-lazy></div></div>`);
                      d.arrive(
                        /*".eapps-all-in-one-reviews-bd1067c4-c177-4330-8b54-5ec616880eb4"*/
                        ".es-embed-root",
                        onceOnly,
                        (elem3) => {
                          setTimeout((t) => $(".website-reviews").toggleClass("loaded", true), 1);
                        }
                      );
                    }
                  );
                  s.attr({
                    id: "js-reviews",
                    lang: $d.attr("lang"),
                    src: "https://static.elfsight.com/platform/platform.js",
                    defer: "defer",
                    "data-use-service-core": "data-use-service-core"
                  });
                  lazyCSS().appendChild(s[0]);
                }
              }
            );
          }
        );
      }
    );
  }
}
export default { injectReviews };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmlsZTovLy9EOi93b3JrL0RBVEV4Mi5iaWtlL3d3My93ZWJzaXRlL3NyYy9qcy93ZWJzaXRlUmV2aWV3cy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgJCwgJGQsICR3LCBkLCBub3RPbmNlT25seSwgb25jZU9ubHksIGlzSW5PdXRPZlZpZXcsIGxhenlDU1MgfSBmcm9tIFwiLi91dGlscy5qc1wiO1xyXG5mdW5jdGlvbiBjaGVja0hhc2goKSB7XHJcblx0aWYgKCRkLmlzKFwiLnBhZ2UtdHlwZS1TSVRFXCIpKSB7XHJcblx0XHRpZiAobG9jYXRpb24uaGFzaCA9PSBcIiNyZXZpZXdzXCIpIHtcclxuXHRcdFx0JChcIiN0aWxlLXRleHQteEVaNFFLXCIpWzBdPy5zY3JvbGxJbnRvVmlldyhzbW9vdGgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGxvY2F0aW9uLmhhc2ggPT0gXCIjY29udGFjdFwiKSB7XHJcblx0XHRcdCQoXCIjdGlsZS1sb2NhdGlvbi1CQlllc25cIilbMF0/LnNjcm9sbEludG9WaWV3KHNtb290aCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RSZXZpZXdzKHBhZ2UpIHtcclxuXHRjb25zdCB0b1RyYW5zbGF0ZSA9IHt9XHJcblx0XHQsIGxhbmcgPSBELmxhbmcudG9Mb3dlckNhc2UoKTtcclxuXHRpZiAocGFnZS50eXBlID09IFwiU0lURVwiKSB7XHJcblx0XHQkZC5hcnJpdmUoYC5pbnMtaGVhZGVyX19tZW51LWxpbmstdGl0bGVbaHJlZj1cIiNjb250YWN0XCJdLCAuaW5zLWhlYWRlcl9fbWVudS1saW5rLXRpdGxlW2hyZWY9XCIjcmV2aWV3c1wiXWAsIHtcclxuXHRcdFx0ZXhpc3Rpbmc6IHRydWUsXHJcblx0XHRcdG9uY2VPbmx5OiBmYWxzZVxyXG5cdFx0fSwgZWxlbSA9PiB7XHJcblx0XHRcdGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoY2hlY2tIYXNoLCAxMCk7XHJcblx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdCk7XHJcblx0XHQkZC5hcnJpdmUoXCIuZXMtcmV2aWV3LWNvbnRlbnQtdGV4dCwgLmJ3cUVubSwgLmdxanlCaiwgLmRuQXZNaiwgLmRxaUtGeSwgLmJ3cUVubVwiLCBub3RPbmNlT25seSwgZWxlbSA9PiB7XHJcblx0XHRcdGNvbnN0IGUgPSAkKGVsZW0pXHJcblx0XHRcdFx0LCBrZXkgPSBlLnRleHQoKVxyXG5cdFx0XHRcdCwgdHJhbnNsYXRpb24gPSB3LnJldmlld3M/LltrZXldIHx8IGtleTtcclxuXHRcdFx0dG9UcmFuc2xhdGVba2V5XSA9IHt9O1xyXG5cdFx0XHRpZiAoa2V5ICE9IHRyYW5zbGF0aW9uKSB7XHJcblx0XHRcdFx0ZS50ZXh0KHRyYW5zbGF0aW9uKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0KTtcclxuXHRcdC8vIGRvY3VtZW50LmhlYWQuYWRkRXZlbnRMaXN0ZW5lcihcclxuXHRcdC8vICAgXCJjbGlja1wiLFxyXG5cdFx0Ly8gICBlID0+IHtcclxuXHRcdC8vICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChKU09OLnN0cmluZ2lmeSh0b1RyYW5zbGF0ZSwgbnVsbCwgXCIgIFwiKSk7XHJcblx0XHQvLyAgICAgYWxlcnQoXCJDb3BpZWRcIik7XHJcblx0XHQvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdFx0Ly8gICB9LFxyXG5cdFx0Ly8gICB0cnVlXHJcblx0XHQvLyApO1xyXG5cdFx0aWYgKCFsb2NhdGlvbi5wYXRjaGVkKSB7XHJcblx0XHRcdGxvY2F0aW9uLnBhdGhlZCA9IHRydWU7XHJcblx0XHRcdCR3Lm9uKFwicG9wc3RhdGVcIiwgY2hlY2tIYXNoKTtcclxuXHRcdH1cclxuXHRcdCRkLmFycml2ZShcIiN0aWxlLWxvY2F0aW9uLUJCWWVzblwiLCBub3RPbmNlT25seSwgZWxlbSA9PiB7XHJcblx0XHRcdCQoZWxlbSkuYXR0cihcIm5hbWVcIiwgXCJjb250YWN0XCIpO1xyXG5cdFx0fVxyXG5cdFx0KTtcclxuXHRcdCRkLmFycml2ZShcIiN0aWxlLXRleHQteEVaNFFLXCIsIG5vdE9uY2VPbmx5LCBlbGVtID0+IHtcclxuXHRcdFx0Y29uc3QgJGVsZW0gPSAkKGVsZW0pO1xyXG5cdFx0XHRpZiAoISRlbGVtLmlzKFwiLmZpdmUtc3Rhci1yZXZld3NcIikpIHtcclxuXHRcdFx0XHQkZWxlbS5hdHRyKFwibmFtZVwiLCBcInJldmlld3NcIik7XHJcblx0XHRcdFx0ZWxlbS5hcnJpdmUoXCIjdGlsZS10ZXh0LXhFWjRRSyAuaW5zLXRpbGVfX3RpdGxlXCIsIG5vdE9uY2VPbmx5LCBlbGVtID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IHRpdGxlID0gJChlbGVtKTtcclxuXHRcdFx0XHRcdHRpdGxlLnRleHQodGl0bGUudGV4dCgpPy5yZXBsYWNlKC81L2dpLCBcIlwiKT8ucmVwbGFjZSgvXFwqXFwqXFwqXFwqXFwqL2dpLCBcIlwiKSk7XHJcblx0XHRcdFx0XHRpZiAobG9jYXRpb24uaGFzaCA9PSBcIiN0aWxlLXRleHQteEVaNFFLXCIgfHwgbG9jYXRpb24uaGFzaCA9PSBcIiNyZXZpZXdzXCIpIHtcclxuXHRcdFx0XHRcdFx0ZWxlbS5zY3JvbGxJbnRvVmlldyhzbW9vdGgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9IFxyXG5cclxuXHRcdFx0ZWxlbS5hcnJpdmUoXCIuaW5zLXRpbGVfX2Rlc2NyaXB0aW9uXCIsIG5vdE9uY2VPbmx5LCBlbGVtID0+IHtcclxuXHRcdFx0XHQvL2VsZW0gPSAkKGVsZW0pO1xyXG5cdFx0XHRcdGlzSW5PdXRPZlZpZXcoZWxlbSwgKGUsIHN0YXRlKSA9PiB7XHJcblx0XHRcdFx0XHQvL2VsZW0ub25lKFwiaW52aWV3XCIsIChlLCBpbnZpZXcpID0+IHtcclxuXHRcdFx0XHRcdCRkLnRvZ2dsZUNsYXNzKFwic2hvdy1yZXZpZXdzXCIsIHN0YXRlLmlzSW5WaWV3KTtcclxuXHRcdFx0XHRcdGlmIChzdGF0ZS5pc0luVmlldyAmJiAhd2luZG93LnJldmlld3NMb2FkZWQpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHMgPSAkKFwiPHNjcmlwdC8+XCIpO1xyXG5cdFx0XHRcdFx0XHRzWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGUgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5yZXZpZXdzTG9hZGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHQkKGVsZW0pLndyYXAoYDxkaXYgY2xhc3M9XCJsb2FkaW5nXCIvPmApLmh0bWwoYDxkaXYgY2xhc3M9XCJ3ZWJzaXRlLXJldmlld3NcIj48ZGl2IGxhbmc9XCIkeyRkLmF0dHIoXCJsYW5nXCIpfVwiIGNsYXNzPVwiZWxmc2lnaHQtYXBwLWJkMTA2N2M0LWMxNzctNDMzMC04YjU0LTVlYzYxNjg4MGViNFwiIGRhdGEtZWxmc2lnaHQtYXBwLWxhenk+PC9kaXY+PC9kaXY+YCk7XHJcblx0XHRcdFx0XHRcdFx0ZC5hcnJpdmUoLypcIi5lYXBwcy1hbGwtaW4tb25lLXJldmlld3MtYmQxMDY3YzQtYzE3Ny00MzMwLThiNTQtNWVjNjE2ODgwZWI0XCIqL1wiLmVzLWVtYmVkLXJvb3RcIiwgb25jZU9ubHksIGVsZW0gPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCh0ID0+ICQoXCIud2Vic2l0ZS1yZXZpZXdzXCIpLnRvZ2dsZUNsYXNzKFwibG9hZGVkXCIsIHRydWUpLCAxKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHQvLyB2YXIgZiA9IHNldEludGVydmFsKHAgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdC8vICAgcCA9ICQoXCIuZXMtbWFpbi1jb250ZW50IH4gYVwiKTtcclxuXHRcdFx0XHRcdFx0XHQvLyAgIGlmIChwLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdC8vICAgICBwLmF0dHIoXCJzdHlsZVwiLCBcImRpc3BsYXk6IG5vbmUgIWltcG9ydGFudFwiKTtcclxuXHRcdFx0XHRcdFx0XHQvLyAgIH1cclxuXHRcdFx0XHRcdFx0XHQvLyB9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQpOyBcclxuXHRcdFx0XHRcdFx0cy5hdHRyKHtcclxuXHRcdFx0XHRcdFx0XHRpZDogXCJqcy1yZXZpZXdzXCIsXHJcblx0XHRcdFx0XHRcdFx0bGFuZzogJGQuYXR0cihcImxhbmdcIiksXHJcblx0XHRcdFx0XHRcdFx0c3JjOiBcImh0dHBzOi8vc3RhdGljLmVsZnNpZ2h0LmNvbS9wbGF0Zm9ybS9wbGF0Zm9ybS5qc1wiLFxyXG5cdFx0XHRcdFx0XHRcdGRlZmVyOiBcImRlZmVyXCIsXHJcblx0XHRcdFx0XHRcdFx0XCJkYXRhLXVzZS1zZXJ2aWNlLWNvcmVcIjogXCJkYXRhLXVzZS1zZXJ2aWNlLWNvcmVcIixcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdGxhenlDU1MoKS5hcHBlbmRDaGlsZChzWzBdKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdFx0KTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgaW5qZWN0UmV2aWV3cyB9O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiQUFBQSxTQUFTLEdBQUcsSUFBSSxJQUFJLEdBQUcsYUFBYSxVQUFVLGVBQWUsZUFBZTtBQUM1RSxTQUFTLFlBQVk7QUFDcEIsTUFBSSxHQUFHLEdBQUcsaUJBQWlCLEdBQUc7QUFDN0IsUUFBSSxTQUFTLFFBQVEsWUFBWTtBQUNoQyxRQUFFLG1CQUFtQixFQUFFLENBQUMsR0FBRyxlQUFlLE1BQU07QUFBQSxJQUNqRDtBQUNBLFFBQUksU0FBUyxRQUFRLFlBQVk7QUFDaEMsUUFBRSx1QkFBdUIsRUFBRSxDQUFDLEdBQUcsZUFBZSxNQUFNO0FBQUEsSUFDckQ7QUFBQSxFQUNEO0FB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
