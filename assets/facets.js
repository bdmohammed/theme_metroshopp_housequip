!(function (t) {
  "use strict";
  var e = t(window),
    i = t(document),
    a = t("html"),
    r = t("body"),
    s = (window.T4Sstrings, window.T4Sconfigs),
    n = (T4Srequest.page_type, T4Sroutes.search_url, "nots"),
    o = "",
    l = "data-ntajax-options",
    d = 200,
    c = ".btn-filter",
    f = "is--clicked",
    h = "[data-result-count]",
    p = atob("c2hvcGlmeTpzZWN0aW9uOmxvYWQ="),
    u = (function () {
      function u(e) {
        (this.container = e),
          (this.$container = t(e)),
          (this.$container2 = t(e).find("[data-ntajax-container]")),
          this.$container2.length < 1 && (this.$container2 = t(e)),
          (this.$resultCount = t(e).find(h)),
          (this.options = JSON.parse(this.$container.attr(l))),
          (this.main = this.options.id || ""),
          (this.typeAjax = this.options.type || "LmDefault"),
          (this.updateURLPrev = this.options.updateURLPrev || !1),
          (this.isProduct = this.options.isProduct || !1),
          (this.$section = t(`#shopify-section-${this.main}`)),
          (this.filter = this.options.typeFilters),
          (this.filterData = []),
          (this.queryParams = {}),
          (this.disableScroll = this.options.disableScroll || !1),
          (this.scrollOffset = this.options.scrollOffset || 100),
          (this.isReloadFilter = !0),
          (this.nouisliderLoaded = !1),
          (this.isbtnLoadMore = !0),
          (this.sort_by = this.options.sort_by),
          (this.$filterArea = this.$section.find("[data-filter-area]")),
          this.setupEventListeners(),
          this.onFirstLoadFacets(),
          (this.isOpened = function () {
            return this.$filterArea.hasClass(y);
          }),
          (this.openFilters = function () {
            this.$filterArea.addClass(y), this.$filterArea.stop().slideDown(d);
          }),
          (this.closeFilters = function () {
            this.$filterArea.removeClass(y), this.$filterArea.stop().slideUp(d);
          }),
          (this.closeFiltersNoAnimation = function () {
            this.$filterArea.removeClass(y),
              this.$filterArea.hide(0),
              t(c + "." + f).removeClass(f);
          });
      }
      window.History;
      var m,
        g,
        v,
        F,
        b = "click.ntajax",
        $ = "[data-sidebar-links] a:not([data-not-a-filter])",
        S = t("[data-main-filters-links]"),
        y = "is--filters-opened",
        w = !1,
        _ =
          "collection" == T4Srequest.page_type ||
          "search" == T4Srequest.page_type,
        P = {
          loadingWrap: "content--loading",
          loading: "is--loading",
          loaded: "is--loaded",
          listview: "is--listview",
          active: "is--active",
        },
        L = { root: null, rootMargin: "0px", threshold: 0 };
      return (
        (u.prototype = Object.assign({}, u.prototype, {
          destroyEventListeners: function () {
            self.$container.off(b),
              self.$filter.off(b),
              e.off("popstate.ntajax");
          },
          closeDrawer: function (t) {
            t.closest(".drawer")
              .find("[data-drawer-close]")
              .trigger("click.drawer");
          },
          setupEventListenersSidebarFacets: function () {
            var e = this;
            e.$filterSidebar.on(b, $, function (i) {
              i.preventDefault(),
                (e.isReloadFilter = !0),
                e.closeFiltersNoAnimation();
              const a = t(this);
              e.ntAjaxStart(),
                e.closeDrawer(a),
                e.loadPageContent(a.attr("href")),
                e.updateURLHash(a, !0);
            }),
              T4SThemeSP.Tabs.Accordion();
            var i = e.$filterSidebar.find(".price_slider_wrapper");
            0 != i.length &&
              $script(s.script8, function () {
                (e.nouisliderLoaded = !0), e.initPriceRange(i);
              });
          },
          setupEventListenersFacets: function () {
            var i = this;
            (i.$filter = t("#shopify-section-" + i.filter)),
              i.removeDataDelay(),
              i.$filter
                .off(b)
                .on(
                  b,
                  "[data-filter-links] a:not([data-not-a-filter])",
                  function (e) {
                    e.preventDefault(), (i.isReloadFilter = !0);
                    const a = t(this);
                    i.ntAjaxStart(),
                      i.closeDrawer(a),
                      i.loadPageContent(a.attr("href")),
                      i.updateURLHash(a, !0);
                  },
                ),
              i.$filterArea.length > 0 &&
                e.width() > 767 &&
                (i.$filterArea.off(b).on(b, $, function (e) {
                  e.preventDefault(),
                    (i.isReloadFilter = !0),
                    i.closeFiltersNoAnimation();
                  const a = t(this);
                  i.ntAjaxStart(),
                    i.closeDrawer(a),
                    i.loadPageContent(a.attr("href")),
                    i.updateURLHash(a, !0);
                }),
                t(c)
                  .attr("data-drawer-delay", "")
                  .off(b)
                  .on(b, function (a) {
                    e.width() < 768
                      ? i.closeFiltersNoAnimation()
                      : (a.preventDefault(),
                        a.stopPropagation(),
                        t(this).toggleClass(f),
                        i.isOpened() ? i.closeFilters() : i.openFilters());
                  }),
                e.on("resize", function () {
                  e.width() < 768 && t(c).removeAttr("data-drawer-delay");
                })),
              T4SThemeSP.Tabs.Accordion();
            var a = i.$filter.find(".price_slider_wrapper"),
              r = i.$filterArea.find(".price_slider_wrapper");
            (0 == a.length && 0 == r.length) ||
              $script(s.script8, function () {
                (i.nouisliderLoaded = !0),
                  i.initPriceRange(a),
                  i.initPriceRange(r);
              });
          },
          filterActionLink: function (t, e = !1) {
            (this.isReloadFilter = !0),
              this.ntAjaxStart(e),
              this.loadPageContent(t.attr("href")),
              this.updateURLHash(t, !0);
          },
          setupEventListeners: function () {
            var i = this;
            i.$container.on(b, ".active-filters a", function (e) {
              e.preventDefault(), i.filterActionLink(t(this));
            }),
              S.find("[data-main-filters-link]").length > 0 &&
                S.on(b, "[data-main-filters-link]", function (e) {
                  e.preventDefault();
                  let a = t(this);
                  i.filterActionLink(a, !1),
                    a
                      .closest("[data-main-filters-links]")
                      .find(".is--selected")
                      .removeClass("is--selected"),
                    a.addClass("is--selected");
                }),
              i.$section.on(
                "click",
                "[data-filter-sortby] a, [data-sortby-item]",
                function (e) {
                  e.preventDefault(),
                    (i.isReloadFilter = i.sort_by != i.current_sort_by),
                    i.isReloadFilter && (i.sort_by = i.current_sort_by);
                  const a = t(this),
                    r = i.getUrlSortby(a);
                  i.ntAjaxStart(),
                    i.loadPageContent(r),
                    i.updateURLHash(t(this), !1, r);
                },
              ),
              i.$container.on(
                "click",
                "[data-ntjax-wrap] a, [data-ntjax-link]",
                function (e) {
                  e.preventDefault(), (i.isReloadFilter = !1);
                  const a = t(this);
                  i.ntAjaxStart(),
                    i.loadPageContent(a.attr("href")),
                    i.updateURLHash(a, !0);
                },
              ),
              i.$section.on("click", "[data-load-more]", function (e) {
                e.preventDefault(), (i.isReloadFilter = !1);
                const a = t(this);
                a.addClass(P.loading),
                  (g = `${a.attr("href")}&section_id=${i.main}`),
                  (i.isbtnLoadMore = !t(this).is("[data-is-prev]")),
                  i.renderSectionFromFetch(g, i.main, function (t, e) {
                    i[i.typeAjax](t), a.removeClass(P.loading);
                  }),
                  (i.isbtnLoadMore || i.updateURLPrev) &&
                    i.updateURLHash(a, !0);
              }),
              i.clickOnScrollButton(),
              e.on("popstate.ntajax", function (t) {
                try {
                  const e = t.originalEvent.state;
                  if (!e.path) return;
                  t.preventDefault(),
                    t.stopImmediatePropagation(),
                    (i.isReloadFilter = e.updateFilter),
                    i.ntAjaxStart(),
                    i.loadPageContent(e.path);
                } catch (t) {}
              }),
              i.layoutSwitching();
          },
          loadPageContent: function (e) {
            var i = this;
            i.renderSection(e, i.main, function (a, s, n, o, l, d) {
              if (o) {
                var c = new DOMParser().parseFromString(a, "text/html"),
                  f = c.querySelector("[data-ntajax-container]").innerHTML,
                  p = c.querySelector(h),
                  u = p ? p.innerHTML : "";
                i.filterData = [
                  ...i.filterData,
                  { DomHTMl: f, filterUrl: n, resultCount: u },
                ];
              } else
                var f = a,
                  u = d;
              var m = i.$container.find(
                "[data-resizeobserver].flickityenabled .product.observered, [data-resizeobserver].isotopeenabled .product.observered",
              );
              m.length > 0 && m.trigger("destroy.observered"),
                i.$container2.html(f),
                i.$resultCount.html(u),
                (i.$filterArea = i.$section.find("[data-filter-area]")),
                i.updateListing(),
                i.isProduct &&
                  setTimeout(function () {
                    T4SThemeSP.reinitProductGridItem();
                  }, 300),
                T4SThemeSP.PopupMFP(),
                r.trigger("ts:hideTooltip"),
                r.trigger("currency:update"),
                ("AjaxIsotope" != i.typeAjax && "LmIsotope" != i.typeAjax) ||
                  (T4SThemeSP.Isotope.init(i.$container.find(".isotope")),
                  T4SThemeSP.ProductItem.resizeObserver()),
                i.clickOnScrollButton(),
                i.$filter &&
                  i.$filter.length > 0 &&
                  !i.isReloadFilter &&
                  i.removeDataDelay(),
                i.$filter &&
                  i.isReloadFilter &&
                  i.renderSection(e, i.filter, function (e, a, r, s) {
                    if (s) {
                      n = new DOMParser()
                        .parseFromString(e, "text/html")
                        .querySelector("[data-filter-links]").innerHTML;
                      i.filterData = [
                        ...i.filterData,
                        { DomHTMl: n, filterUrl: r },
                      ];
                    } else var n = e;
                    i.$filter.find("[data-filter-links]").html(n);
                    let o = t(n).find("#FacetFiltersForm").parent().html();
                    i.$filterSidebar.html(o),
                      i.$filterArea.html(o),
                      i.nouisliderLoaded &&
                        (i.initPriceRange(
                          i.$filter.find(".price_slider_wrapper"),
                        ),
                        i.initPriceRange(
                          i.$filterSidebar.find(".price_slider_wrapper"),
                        ),
                        i.initPriceRange(
                          i.$filterArea.find(".price_slider_wrapper"),
                        )),
                      i.removeDataDelay();
                  });
            });
          },
          renderSection: function (t, e, i) {
            (m = t.indexOf("?") > -1 ? "&" : "/?"),
              (g = t + m + "section_id=" + e),
              (v = (t) => t.filterUrl === g),
              this.filterData.some(v) && !w
                ? this.renderSectionFromCache(g, v, e, i)
                : this.renderSectionFromFetch(g, e, i);
          },
          renderSectionFromFetch: function (t, e, i) {
            fetch(t, {
              method: "GET",
              headers: { "Cache-Control": "no-cache" },
            })
              .then((t) => t.text())
              .then((a) => {
                i(a, e, t, !0, !0), this.ntAjaxEnd();
              })
              .catch((t) => {
                this.ntAjaxEnd();
              });
          },
          renderSectionFromCache: function (t, e, i, a) {
            a(
              this.filterData.find(e).DomHTMl,
              i,
              t,
              !1,
              !0,
              this.filterData.find(e).resultCount,
            ),
              this.ntAjaxEnd();
          },
          debounce: function (t, e) {
            let i;
            return (...a) => {
              clearTimeout(i), (i = setTimeout(() => t.apply(this, a), e));
            };
          },
          updateURLHash: function (t, e = !0, i) {
            i = i || t.attr("href");
            var a = t.text();
            history.pushState({ path: i, updateFilter: e }, a, i);
          },
          initPriceRange: function (e) {
            var i = this,
              s = e.find(".price_slider_amount"),
              n = s.data("minstr"),
              o = s.data("maxstr"),
              l = s.find(".min_price"),
              d = s.find(".max_price"),
              c = (s.find(".url_price").val(), l.data("min")),
              f = d.data("max"),
              h = s.data("step") || 1,
              p = l.val(),
              u = d.val(),
              m = a.hasClass("rtl_true") ? "rtl" : "ltr";
            s.find("input.url_price, input.min_price, input.max_price").hide(),
              e.find(".price_slider, .price_label ,.price_slider_btn").show();
            var g = e.find(".price_steps_slider:not(.noUi-target)"),
              v = g[0],
              F = ["span.from", "span.to"],
              b = [".min_price", ".max_price"];
            g.length < 1 ||
              (noUiSlider.create(v, {
                start: [p, u],
                connect: !0,
                step: h,
                direction: m,
                range: { min: c, max: f },
              }),
              v.noUiSlider.on("update", function (t, i) {
                var a = parseInt(t[i]);
                e.find(F[i]).html(T4SThemeSP.Currency.formatMoney(a)),
                  s
                    .find(b[i])
                    .val(
                      T4SThemeSP.Currency.formatMoney(
                        a,
                        "{{amount}}",
                      ).replaceAll(",", ""),
                    ),
                  r.trigger("currency:update");
              }),
              e.on("click", ".price_slider_btn", function (e) {
                (p = l.val()), (u = d.val());
                var a = i.getUrlPriceFilter(n, o, p, u);
                i.closeFiltersNoAnimation(),
                  i.ntAjaxStart(),
                  i.loadPageContent(a),
                  i.updateURLHash(t(this), !0, a),
                  i.closeDrawer(t(this));
              }));
          },
          _defineProperty: function (t, e, i) {
            return (
              e in t
                ? Object.defineProperty(t, e, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[e] = i),
              t
            );
          },
          layoutSwitching: function (i, a, r) {
            var s = this,
              n = s.$section.find("[data-layout-switch]"),
              o = n.data("grid-default") || "",
              l = n.find(".is--mobile .is--active").data("col"),
              d = n.find(".is--tablet .is--active").data("col"),
              c = n.find(".is--desktop .is--active").data("col"),
              f = T4Sroutes.cart_update_url;
            0 != n.length &&
              ((F = l + "." + d + "." + c),
              s.$section.on(
                "click",
                "[data-layout-switch] button",
                function (e) {
                  e.preventDefault();
                  var i = t(this),
                    a = i.data("breakpoint"),
                    r = i.data("col"),
                    h = s.$container.find(".products");
                  i
                    .parent()
                    .find("." + P.active)
                    .removeClass(P.active),
                    i.addClass(P.active);
                  var p = n.data("load") || !1;
                  if (
                    ("list_ts" !== r && -1 === F.indexOf("list_ts") && (p = !1),
                    p ||
                      ("list_ts" == r
                        ? h.addClass(P.listview + " on--list-" + a)
                        : h.removeClass(P.listview + " on--list-" + a)),
                    "mobile" == a
                      ? (p ||
                          h
                            .removeClass("row-cols-" + l)
                            .addClass("row-cols-" + r),
                        (l = r))
                      : "tablet" == a
                        ? (p ||
                            h
                              .removeClass("row-cols-md-" + d)
                              .addClass("row-cols-md-" + r),
                          (d = r))
                        : (p ||
                            h
                              .removeClass("row-cols-lg-" + c)
                              .addClass("row-cols-lg-" + r),
                          (c = r)),
                    h.hasClass("isotope") && h.isotope("layout"),
                    lazySizesT4.autoSizer.checkElems(),
                    isStorageSpdLocal &&
                      localStorage.setItem("collection_items_per_row_" + a, c),
                    (F = l + "." + d + "." + c),
                    p)
                  ) {
                    if ("list_ts" === r) F = "list_ts.list_ts.list_ts";
                    else if ("" !== o) {
                      let t = o.split(".");
                      "mobile" == a
                        ? (t[0] = r)
                        : "tablet" == a
                          ? (t[1] = r)
                          : (t[2] = r),
                        (F = t.join("."));
                    }
                    s.closeFiltersNoAnimation(), s.ntAjaxStart();
                  }
                  fetch(f + ".js", {
                    body: JSON.stringify({
                      attributes: s._defineProperty(
                        {},
                        "collection_items_per_row",
                        F,
                      ),
                    }),
                    credentials: "same-origin",
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "X-Requested-With": "XMLHttpRequest",
                    },
                  })
                    .then(function (t) {
                      200 === t.status
                        ? p
                          ? ((w = !0),
                            s.loadPageContent(
                              window.location.pathname + window.location.search,
                            ))
                          : (w = !1)
                        : console.log("Error, Code Error " + t.status);
                    })
                    .catch((t) => {
                      console.log("Error :-S", t);
                    });
                },
              ),
              IsDesignMode &&
                void 0 !== n.data("remove-cart-attr") &&
                fetch(f + ".js", {
                  body: JSON.stringify({
                    attributes: s._defineProperty(
                      {},
                      "collection_items_per_row",
                      "",
                    ),
                  }),
                  credentials: "same-origin",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                  },
                })
                  .then(function (t) {
                    200 === t.status ||
                      console.log("Error, Code Error " + t.status);
                  })
                  .catch((t) => {
                    console.log("Error :-S", t);
                  }),
              e.on("resize", function () {
                var t = n.find(".is--active:visible").data("breakpoint"),
                  e = n.find(".products");
                e.hasClass("on--list-" + t)
                  ? e.addClass(P.listview)
                  : e.removeClass(P.listview);
              }));
          },
          updateListing: function () {
            if (0 != this.$section.find(".icon_viewlist").length) {
              var t = window.innerWidth,
                e = F.split("."),
                i = this.$container.find(".products"),
                a = "is--listview on--list-",
                r = a;
              if (F) {
                const t = [...i[0].classList].filter((t) =>
                  /row-cols-/g.test(t),
                );
                i.removeClass(t.join(" ")).addClass(
                  `row-cols-${e[0]} row-cols-md-${e[1]} row-cols-lg-${e[2]}`,
                );
              }
              t < 768 && "list_ts" == e[0]
                ? (a += "mobile")
                : t < 1025 && "list_ts" == e[1]
                  ? (a += "tablet")
                  : "list_ts" == e[2] && (a += "desktop"),
                a != r && i.addClass(a);
            }
          },
          initParams: function () {
            var t = this;
            if (location.search.length) {
              var e,
                i = location.search.substr(1).split("&");
              t.queryParams = {};
              for (var a = 0; a < i.length; a++)
                (e = i[a].split("=")).length &&
                  (void 0 !== t.queryParams[e[0]]
                    ? (t.queryParams[decodeURIComponent(e[0] + "__ex" + a)] =
                        e[1])
                    : (t.queryParams[decodeURIComponent(e[0])] = e[1]));
            } else t.queryParams = {};
          },
          getQueryParams: function () {
            return decodeURIComponent(
              new URLSearchParams(this.queryParams).toString(),
            ).replace(/__ex\w/g, "");
          },
          getUrlSortby: function (t) {
            var e = t.data("value"),
              i = window.location.pathname;
            return (
              (this.current_sort_by = e),
              this.initParams(),
              this.queryParams.page && delete this.queryParams.page,
              (this.queryParams.sort_by = e),
              "/" == i.substr(i.length - 1) && (i = i.slice(0, -1)),
              `${i}/?${this.getQueryParams()}`
            );
          },
          getUrlPriceFilter: function (t, e, i, a) {
            var r = window.location.pathname;
            return (
              this.initParams(),
              this.queryParams.page && delete this.queryParams.page,
              (this.queryParams[t] = i),
              (this.queryParams[e] = a),
              "/" == r.substr(r.length - 1) && (r = r.slice(0, -1)),
              `${r}/?${this.getQueryParams()}`
            );
          },
          onFirstLoadFacets: function () {
            if (IsDesignMode) {
              var a = this,
                r = atob("c2hvcGlmeTpzZWN0aW9uOnNlbGVjdA=="),
                s = atob("c2hvcGlmeTpzZWN0aW9uOmRlc2VsZWN0"),
                o = t("#filter-hidden.is--filter-native"),
                d = t("#filter-hidden.is-filter-tags");
              (a.filter = "facets"),
                a.setupEventListenersFacets(),
                (a.filter = "facets_tags"),
                a.setupEventListenersFacets(),
                (a.filter = a.options.typeFilters);
              var h = atob("ZmFjZXRz"),
                u = atob("ZmFjZXRzX3RhZ3M=");
              t(".toolbart-filter > a")
                .removeAttr("data-drawer-options")
                .attr(
                  "data-drawer-options",
                  `{ "id":"#shopify-section-${a.filter} #filter-hidden" }`,
                ),
                i.on(p, function (e) {
                  var r = e.detail.sectionId,
                    s = t("#shopify-section-" + r);
                  if (s.hasClass("section-filter"))
                    s.hasClass("section-sidebar") &&
                      ((n = t("#FacetFiltersForm").parent().html()),
                      (a.$filterSidebar = t("[data-replace-filter]")),
                      a.$filterSidebar.html(n),
                      a.setupEventListenersSidebarFacets()),
                      (a.filter = r),
                      a.setupEventListenersFacets(),
                      a.layoutSwitching(),
                      a.updateListing();
                  else if (s.hasClass("section-main")) {
                    (a.$filterArea = s.find("[data-filter-area]")),
                      (a.$section = s),
                      (a.$container = s.find("[" + l + "]")),
                      (a.options = JSON.parse(a.$container.attr(l))),
                      (a.filter = a.options.typeFilters),
                      t(".toolbart-filter > a")
                        .removeAttr("data-drawer-options")
                        .attr(
                          "data-drawer-options",
                          `{ "id":"#shopify-section-${a.filter} #filter-hidden" }`,
                        );
                    let e =
                      a.options.typeFilters == h
                        ? o.find("#FacetFiltersForm").parent().html()
                        : d.find("#FacetFiltersForm").parent().html();
                    a.$filterArea.length > 0
                      ? a.$filterArea.html(e)
                      : t(c).removeAttr("data-drawer-delay").off(b),
                      s.find("[data-replace-filter]").length > 0 &&
                        (i.trigger("sidebar:updated"),
                        s.find("[data-replace-filter]").html(e)),
                      (s.find("[data-replace-filter]").length > 0 ||
                        a.$filterArea.length > 0) &&
                        a.setupEventListenersFacets(),
                      a.layoutSwitching(),
                      a.updateListing();
                  }
                }),
                i.on(r, function (i) {
                  let r = i.detail.sectionId,
                    s = t("#shopify-section-" + r);
                  (o = t("#filter-hidden.is--filter-native")),
                    (d = t("#filter-hidden.is-filter-tags")),
                    r == h || r == u
                      ? a.$filterArea.length > 0 && e.width() > 767
                        ? (a.closeFiltersNoAnimation(),
                          r == a.options.typeFilters && r == h && o.length > 0
                            ? (a.$filterArea.html(
                                o.find("#FacetFiltersForm").parent().html(),
                              ),
                              a.setupEventListenersFacets())
                            : r == a.options.typeFilters &&
                              r == u &&
                              d.length > 0 &&
                              (a.$filterArea.html(
                                d.find("#FacetFiltersForm").parent().html(),
                              ),
                              a.setupEventListenersFacets()))
                        : r == h && o.length > 0
                          ? T4SThemeSP.Drawer.opend(o)
                          : r == u && d.length > 0 && T4SThemeSP.Drawer.opend(d)
                      : a.$filterArea.length > 0 &&
                        e.width() > 767 &&
                        s.hasClass("section-main") &&
                        (a.$filterArea.html(
                          a.options.typeFilters == h
                            ? o.find("#FacetFiltersForm").parent().html()
                            : d.find("#FacetFiltersForm").parent().html(),
                        ),
                        a.setupEventListenersFacets());
                }),
                i.on(s, function (i) {
                  let r = i.detail.sectionId;
                  (r != h && r != u) ||
                    (a.$filterArea.length > 0 && e.width() > 767
                      ? t(c + "." + f).trigger(b)
                      : t(".close-overlay:visible").trigger("click"));
                }),
                a.$filterArea.length > 0 &&
                  e.width() > 767 &&
                  (a.$filterArea.html(
                    a.options.typeFilters == h
                      ? o.find("#FacetFiltersForm").parent().html()
                      : d.find("#FacetFiltersForm").parent().html(),
                  ),
                  t(c).removeAttr("data-drawer-delay").off(b),
                  a.setupEventListenersFacets());
            }
            this.onFirstLoadFilterSidebar(),
              !IsDesignMode &&
                _ &&
                this.$container.is("[data-has-filters]") &&
                this.onFirstFetchFilter();
          },
          onFirstLoadFilterSidebar: function () {
            var e = this;
            if (
              ((e.$filterSidebar = t("[data-replace-filter]")),
              "nots" != n && e.$filterSidebar.length > 0)
            )
              e.$filterSidebar.html(n),
                (n = ""),
                e.setupEventListenersSidebarFacets();
            else {
              var a = function () {
                (e.$filterSidebar = t("[data-replace-filter]")),
                  0 != e.$filterSidebar.length && e.onFirstFetchFilter(!1);
              };
              i.on("sidebar:updated", a),
                i.one("sidebar:facets", a),
                e.$filterSidebar.length > 0 && i.trigger("sidebar:facets");
            }
          },
          onFirstFetchFilter: function (e = !0, a) {
            var r = this,
              s = "",
              l = window.location.pathname;
            r.initParams(), r.queryParams.page && delete r.queryParams.page;
            const d = r.getQueryParams();
            d.length > 0 && (s = "&"),
              "/" == l.substr(l.length - 1) && (l = l.slice(0, -1)),
              "" == o &&
                ((o = "loading"),
                fetch(
                  `${l}/?${d}${s}section_id=${IsDesignMode && a ? a : r.filter}`,
                  { method: "GET", headers: { "Cache-Control": "no-cache" } },
                )
                  .then((t) => t.text())
                  .then((t) => {
                    i.trigger("facets:loaded", [!0, t]),
                      i.trigger("facets:loaded", [!1, t]),
                      i.off("facets:loaded");
                  })
                  .catch((t) => {}),
                i.on("facets:loaded", function (e, a, s) {
                  if (a)
                    T4SThemeSP.$appendComponent.after(s),
                      r.$filterArea.html(
                        t(s).find("#FacetFiltersForm").parent().html(),
                      ),
                      r.setupEventListenersFacets();
                  else {
                    var o = function () {
                      (n = t(s).find("#FacetFiltersForm").parent().html()),
                        r.$filterSidebar.html(n),
                        r.setupEventListenersSidebarFacets();
                    };
                    (r.$filterSidebar = t("[data-replace-filter]")),
                      r.$filterSidebar.length > 0
                        ? o()
                        : i.on("sidebar:updated", function (e) {
                            (r.$filterSidebar = t("[data-replace-filter]")),
                              r.$filterSidebar.length > 0 && o();
                          });
                  }
                })),
              IsDesignMode &&
                (i.on("facets:loaded:adm", function (e, i, a) {
                  (r.$section = a),
                    (r.$filterArea = i),
                    i.html(t("#FacetFiltersForm").parent().html()),
                    r.setupEventListenersFacets();
                }),
                i.on("facets:loaded:admOff", function () {
                  t(c).removeAttr("data-drawer-delay", "").off(b);
                }));
          },
          ntAjaxStart: function (t = !1) {
            t || this.scrollToTop(),
              r.addClass(P.loadingWrap),
              this.$container.addClass(P.loading);
          },
          ntAjaxEnd: function () {
            r.removeClass(P.loadingWrap),
              this.$container.removeClass(P.loading);
          },
          removeDataDelay: function () {
            this.$filterArea.length > 0 && e.width(),
              t('[data-drawer-options*="#filter-hidden"]').removeAttr(
                "data-drawer-delay",
              );
          },
          scrollToTop: function () {
            this.disableScroll ||
              t("html, body")
                .stop()
                .animate(
                  {
                    scrollTop: this.$container.offset().top - this.scrollOffset,
                  },
                  isBehaviorSmooth ? 0 : 400,
                );
          },
          handleIntersect: function (e, i) {
            e.forEach(function (e) {
              let a = e.target;
              e.isIntersecting && !a.classList.contains(P.loading)
                ? t(a).trigger("click")
                : null === a.offsetParent && i.unobserve(a);
            });
          },
          clickOnScrollButton: function () {
            var e = this,
              i = e.$container.find(
                "[data-load-onscroll]:not(.lm-onscroll-init)",
              );
            0 != i.length &&
              window.IntersectionObserver &&
              i.each(function (i) {
                let a;
                (a = new IntersectionObserver(e.handleIntersect, L)).observe(
                  this,
                ),
                  t(this).addClass("lm-onscroll-init");
              });
          },
          LmDefault: function (e) {
            var i = t(e),
              a = i.find("[data-contentlm-replace]").html(),
              r = this.isbtnLoadMore
                ? i.find("[data-wrap-lm]")
                : i.find("[data-wrap-lm-prev]"),
              s = this.$section.find("[data-contentlm-replace]");
            this.isbtnLoadMore ? s.append(a) : s.prepend(a),
              this.initLoamoreUpdate(r);
          },
          LmIsotope: function (e) {
            var i = t(e),
              a = i.find("[data-contentlm-replace]").html(),
              r = this.isbtnLoadMore
                ? i.find("[data-wrap-lm]")
                : i.find("[data-wrap-lm-prev]"),
              s = this.$section.find("[data-contentlm-replace]");
            (a = t(a)),
              this.isbtnLoadMore
                ? s.append(a).isotope("appended", a)
                : s.prepend(a).isotope("prepended", a),
              this.initLoamoreUpdate(r);
          },
          initLoamoreUpdate: function (t) {
            t.length > 0 && this.isbtnLoadMore
              ? this.$section.find("[data-wrap-lm]").html(t.html())
              : this.isbtnLoadMore
                ? this.$section.find("[data-wrap-lm]").hide()
                : t.length > 0 && !this.isbtnLoadMore
                  ? this.$section.find("[data-wrap-lm-prev]").html(t.html())
                  : this.isbtnLoadMore ||
                    this.$section.find("[data-wrap-lm-prev]").hide(),
              this.isProduct && T4SThemeSP.reinitProductGridItem(),
              r.trigger("ts:hideTooltip"),
              r.trigger("currency:update"),
              this.isbtnLoadMore && this.clickOnScrollButton();
          },
        })),
        u
      );
    })(),
    m = !1;
  (T4SThemeSP.initFacets = void t(
    ".section-main [" + l + "]:not(.is--enabled)",
  ).each(function () {
    t(this).addClass("is--enabled"), (m = !0), (this.Facets = new u(this));
  })),
    IsDesignMode &&
      !m &&
      i.on(p, function (e) {
        var i = e.detail.sectionId;
        t("#shopify-section-" + i).hasClass("section-main") &&
          !m &&
          t(".section-main [" + l + "]:not(.is--enabled)").each(function () {
            t(this).addClass("is--enabled"),
              (m = !0),
              (this.Facets = new u(this));
          });
      });
})(window.jQuery);
