!(function (o) {
  "use strict";
  function t(t, a, y, i) {
    o(y || `span.money:not([data-currencyts="${a}"])`).each(function () {
      var t = o(this);
      if (!t.attr(c)) {
        var y = t.html();
        t.attr(c, y), t.attr(u, y), n && t.attr("title", y);
      }
      var h = t.attr(u);
      if (h) {
        if (t.attr("data-currencyts-" + a))
          t.html(t.attr("data-currencyts-" + a));
        else {
          var w = s[a][i || f.format] || "{{amount}}";
          -1 !== _.indexOf("with_comma_separator") &&
            (h = h.replace(/[,.]/g, function (o) {
              return "," === o ? "." : ",";
            }));
          var D = Currency.convert(
            100 * parseFloat(h.replace(/^[^0-9]+|[^0-9.]/g, "", ""), 10),
            e,
            a,
          );
          m && (D = 100 * Math.round(D / 100));
          var R = (function (o, t) {
            function a(o, t) {
              return null == o || o != o ? t : o;
            }
            function m(o, t, r, m) {
              if (
                ((t = a(t, 2)),
                (r = a(r, ",")),
                (m = a(m, ".")),
                isNaN(o) || null == o)
              )
                return 0;
              var n = (o = (o / 100).toFixed(t)).split(".");
              return (
                n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + r) +
                (n[1] ? m + n[1] : "")
              );
            }
            "string" == typeof o && (o = o.replace(".", ""));
            var n = /\{\{\s*(\w+)\s*\}\}/,
              e = t || "${{amount}}",
              _ = "";
            switch (e.match(n)[1]) {
              case "amount":
                _ = m(o, 2);
                break;
              case "amount_no_decimals":
                _ = m(o, 0);
                break;
              case "amount_with_space_separator":
                _ = m(o, 2, " ", ".");
                break;
              case "amount_no_decimals_with_comma_separator":
                _ = m(o, 0, ",", ".");
                break;
              case "amount_no_decimals_with_space_separator":
                _ = m(o, 0, " ");
                break;
              case "amount_with_comma_separator":
                _ = m(o, 2, ".", ",");
            }
            return r
              ? -1 !== e.indexOf("with_comma_separator")
                ? e.replace(n, _).replace(",00", "")
                : e.replace(n, _).replace(".00", "")
              : e.replace(n, _);
          })(D, w);
          t.html(R), t.attr("data-currencyts-" + a, R);
        }
        t.attr("data-currencyts", a),
          n && a !== e
            ? t.attr("data-tooltip", "top")
            : t.removeAttr("data-tooltip");
      }
    }),
      o(".selected-currency").text(a),
      a == e
        ? o("[data-currency-jsnotify]").hide()
        : o("[data-currency-jsnotify]").show(),
      (f.currentCurrency = a),
      isStorageSpdLocal && localStorage.setItem("T4Currency", a),
      n && T4SThemeSP.Tooltip();
  }
  var a = o("body"),
    r = !1,
    m = T4Sconfigs.round_currency,
    n = T4Sconfigs.hover_currency,
    e = T4Sconfigs.cartCurrency,
    _ = T4Sconfigs.moneyFormat,
    c = "data-currencyts-" + e,
    u = "data-basecuts",
    y = o(".close-overlay"),
    i = { selected: "is--selected", enabled: "is--enabled" },
    f = {
      currentCurrency: T4SThemeSP.storageCurrency(),
      format: T4Sconfigs.currencyCodeEnabled
        ? "money_with_currency_format"
        : "money_format",
      cartCurrency: T4Sconfigs.cartCurrency,
      location: null,
    },
    s = {
      USD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} USD",
      },
      EUR: {
        money_format: "&euro;{{amount}}",
        money_with_currency_format: "&euro;{{amount}} EUR",
      },
      GBP: {
        money_format: "&pound;{{amount}}",
        money_with_currency_format: "&pound;{{amount}} GBP",
      },
      CAD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} CAD",
      },
      ALL: {
        money_format: "Lek {{amount}}",
        money_with_currency_format: "Lek {{amount}} ALL",
      },
      DZD: {
        money_format: "DA {{amount}}",
        money_with_currency_format: "DA {{amount}} DZD",
      },
      AOA: {
        money_format: "Kz{{amount}}",
        money_with_currency_format: "Kz{{amount}} AOA",
      },
      ARS: {
        money_format: "${{amount_with_comma_separator}}",
        money_with_currency_format: "${{amount_with_comma_separator}} ARS",
      },
      AMD: {
        money_format: "{{amount}} AMD",
        money_with_currency_format: "{{amount}} AMD",
      },
      AWG: {
        money_format: "Afl{{amount}}",
        money_with_currency_format: "Afl{{amount}} AWG",
      },
      AUD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} AUD",
      },
      BBD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} Bds",
      },
      AZN: {
        money_format: "m.{{amount}}",
        money_with_currency_format: "m.{{amount}} AZN",
      },
      BDT: {
        money_format: "Tk {{amount}}",
        money_with_currency_format: "Tk {{amount}} BDT",
      },
      BSD: {
        money_format: "BS${{amount}}",
        money_with_currency_format: "BS${{amount}} BSD",
      },
      BHD: {
        money_format: "{{amount}} BD",
        money_with_currency_format: "{{amount}} BHD",
      },
      BYR: {
        money_format: "Br {{amount}}",
        money_with_currency_format: "Br {{amount}} BYR",
      },
      BZD: {
        money_format: "BZ${{amount}}",
        money_with_currency_format: "BZ${{amount}} BZD",
      },
      BTN: {
        money_format: "Nu {{amount}}",
        money_with_currency_format: "Nu {{amount}} BTN",
      },
      BAM: {
        money_format: "KM {{amount_with_comma_separator}}",
        money_with_currency_format: "KM {{amount_with_comma_separator}} BAM",
      },
      BRL: {
        money_format: "R$ {{amount_with_comma_separator}}",
        money_with_currency_format: "R$ {{amount_with_comma_separator}} BRL",
      },
      BOB: {
        money_format: "Bs{{amount_with_comma_separator}}",
        money_with_currency_format: "Bs{{amount_with_comma_separator}} BOB",
      },
      BWP: {
        money_format: "P{{amount}}",
        money_with_currency_format: "P{{amount}} BWP",
      },
      BND: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} BND",
      },
      BGN: {
        money_format: "{{amount}} ÃÂ»ÃÂ²",
        money_with_currency_format: "{{amount}} ÃÂ»ÃÂ² BGN",
      },
      MMK: {
        money_format: "K{{amount}}",
        money_with_currency_format: "K{{amount}} MMK",
      },
      KHR: {
        money_format: "KHR{{amount}}",
        money_with_currency_format: "KHR{{amount}}",
      },
      KYD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} KYD",
      },
      XAF: {
        money_format: "FCFA{{amount}}",
        money_with_currency_format: "FCFA{{amount}} XAF",
      },
      CLP: {
        money_format: "${{amount_no_decimals}}",
        money_with_currency_format: "${{amount_no_decimals}} CLP",
      },
      CNY: {
        money_format: "&#165;{{amount}}",
        money_with_currency_format: "&#165;{{amount}} CNY",
      },
      COP: {
        money_format: "${{amount_with_comma_separator}}",
        money_with_currency_format: "${{amount_with_comma_separator}} COP",
      },
      CRC: {
        money_format: "&#8353; {{amount_with_comma_separator}}",
        money_with_currency_format:
          "&#8353; {{amount_with_comma_separator}} CRC",
      },
      HRK: {
        money_format: "{{amount_with_comma_separator}} kn",
        money_with_currency_format: "{{amount_with_comma_separator}} kn HRK",
      },
      CZK: {
        money_format: "{{amount_with_comma_separator}} K&#269;",
        money_with_currency_format: "{{amount_with_comma_separator}} K&#269;",
      },
      DKK: {
        money_format: "{{amount_with_comma_separator}}",
        money_with_currency_format: "kr.{{amount_with_comma_separator}}",
      },
      DOP: {
        money_format: "RD$ {{amount}}",
        money_with_currency_format: "RD$ {{amount}}",
      },
      XCD: {
        money_format: "${{amount}}",
        money_with_currency_format: "EC${{amount}}",
      },
      EGP: {
        money_format: "LE {{amount}}",
        money_with_currency_format: "LE {{amount}} EGP",
      },
      ETB: {
        money_format: "Br{{amount}}",
        money_with_currency_format: "Br{{amount}} ETB",
      },
      XPF: {
        money_format: "{{amount_no_decimals_with_comma_separator}} XPF",
        money_with_currency_format:
          "{{amount_no_decimals_with_comma_separator}} XPF",
      },
      FJD: {
        money_format: "${{amount}}",
        money_with_currency_format: "FJ${{amount}}",
      },
      GMD: {
        money_format: "D {{amount}}",
        money_with_currency_format: "D {{amount}} GMD",
      },
      GHS: {
        money_format: "GH&#8373;{{amount}}",
        money_with_currency_format: "GH&#8373;{{amount}}",
      },
      GTQ: {
        money_format: "Q{{amount}}",
        money_with_currency_format: "{{amount}} GTQ",
      },
      GYD: {
        money_format: "G${{amount}}",
        money_with_currency_format: "${{amount}} GYD",
      },
      GEL: {
        money_format: "{{amount}} GEL",
        money_with_currency_format: "{{amount}} GEL",
      },
      HNL: {
        money_format: "L {{amount}}",
        money_with_currency_format: "L {{amount}} HNL",
      },
      HKD: {
        money_format: "${{amount}}",
        money_with_currency_format: "HK${{amount}}",
      },
      HUF: {
        money_format: "{{amount_no_decimals_with_comma_separator}}",
        money_with_currency_format:
          "{{amount_no_decimals_with_comma_separator}} Ft",
      },
      ISK: {
        money_format: "{{amount_no_decimals}} kr",
        money_with_currency_format: "{{amount_no_decimals}} kr ISK",
      },
      INR: {
        money_format: "Rs. {{amount}}",
        money_with_currency_format: "Rs. {{amount}}",
      },
      IDR: {
        money_format: "{{amount_with_comma_separator}}",
        money_with_currency_format: "Rp {{amount_with_comma_separator}}",
      },
      ILS: {
        money_format: "{{amount}} NIS",
        money_with_currency_format: "{{amount}} NIS",
      },
      JMD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} JMD",
      },
      JPY: {
        money_format: "&#165;{{amount_no_decimals}}",
        money_with_currency_format: "&#165;{{amount_no_decimals}} JPY",
      },
      JEP: {
        money_format: "&pound;{{amount}}",
        money_with_currency_format: "&pound;{{amount}} JEP",
      },
      JOD: {
        money_format: "{{amount}} JD",
        money_with_currency_format: "{{amount}} JOD",
      },
      KZT: {
        money_format: "{{amount}} KZT",
        money_with_currency_format: "{{amount}} KZT",
      },
      KES: {
        money_format: "KSh{{amount}}",
        money_with_currency_format: "KSh{{amount}}",
      },
      KWD: {
        money_format: "{{amount}} KD",
        money_with_currency_format: "{{amount}} KWD",
      },
      KGS: {
        money_format: "ÃÂ»ÃÂ²{{amount}}",
        money_with_currency_format: "ÃÂ»ÃÂ²{{amount}}",
      },
      LVL: {
        money_format: "Ls {{amount}}",
        money_with_currency_format: "Ls {{amount}} LVL",
      },
      LBP: {
        money_format: "L&pound;{{amount}}",
        money_with_currency_format: "L&pound;{{amount}} LBP",
      },
      LTL: {
        money_format: "{{amount}} Lt",
        money_with_currency_format: "{{amount}} Lt",
      },
      MGA: {
        money_format: "Ar {{amount}}",
        money_with_currency_format: "Ar {{amount}} MGA",
      },
      MKD: {
        money_format: "Ð´ÐµÐ½ {{amount}}",
        money_with_currency_format: "Ð´ÐµÐ½ {{amount}} MKD",
      },
      MOP: {
        money_format: "MOP${{amount}}",
        money_with_currency_format: "MOP${{amount}}",
      },
      MVR: {
        money_format: "Rf{{amount}}",
        money_with_currency_format: "Rf{{amount}} MRf",
      },
      MXN: {
        money_format: "$ {{amount}}",
        money_with_currency_format: "$ {{amount}} MXN",
      },
      MYR: {
        money_format: "RM{{amount}} MYR",
        money_with_currency_format: "RM{{amount}} MYR",
      },
      MUR: {
        money_format: "Rs {{amount}}",
        money_with_currency_format: "Rs {{amount}} MUR",
      },
      MDL: {
        money_format: "{{amount}} MDL",
        money_with_currency_format: "{{amount}} MDL",
      },
      MAD: {
        money_format: "{{amount}} dh",
        money_with_currency_format: "Dh {{amount}} MAD",
      },
      MNT: {
        money_format: "{{amount_no_decimals}} &#8366",
        money_with_currency_format: "{{amount_no_decimals}} MNT",
      },
      MZN: {
        money_format: "{{amount}} Mt",
        money_with_currency_format: "Mt {{amount}} MZN",
      },
      NAD: {
        money_format: "N${{amount}}",
        money_with_currency_format: "N${{amount}} NAD",
      },
      NPR: {
        money_format: "Rs{{amount}}",
        money_with_currency_format: "Rs{{amount}} NPR",
      },
      ANG: {
        money_format: "&fnof;{{amount}}",
        money_with_currency_format: "{{amount}} NA&fnof;",
      },
      NZD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} NZD",
      },
      NIO: {
        money_format: "C${{amount}}",
        money_with_currency_format: "C${{amount}} NIO",
      },
      NGN: {
        money_format: "&#8358;{{amount}}",
        money_with_currency_format: "&#8358;{{amount}} NGN",
      },
      NOK: {
        money_format: "kr {{amount_with_comma_separator}}",
        money_with_currency_format: "kr {{amount_with_comma_separator}} NOK",
      },
      OMR: {
        money_format: "{{amount_with_comma_separator}} OMR",
        money_with_currency_format: "{{amount_with_comma_separator}} OMR",
      },
      PKR: {
        money_format: "Rs.{{amount}}",
        money_with_currency_format: "Rs.{{amount}} PKR",
      },
      PGK: {
        money_format: "K {{amount}}",
        money_with_currency_format: "K {{amount}} PGK",
      },
      PYG: {
        money_format: "Gs. {{amount_no_decimals_with_comma_separator}}",
        money_with_currency_format:
          "Gs. {{amount_no_decimals_with_comma_separator}} PYG",
      },
      PEN: {
        money_format: "S/. {{amount}}",
        money_with_currency_format: "S/. {{amount}} PEN",
      },
      PHP: {
        money_format: "&#8369;{{amount}}",
        money_with_currency_format: "&#8369;{{amount}} PHP",
      },
      PLN: {
        money_format: "{{amount_with_comma_separator}} zl",
        money_with_currency_format: "{{amount_with_comma_separator}} zl PLN",
      },
      QAR: {
        money_format: "QAR {{amount_with_comma_separator}}",
        money_with_currency_format: "QAR {{amount_with_comma_separator}}",
      },
      RON: {
        money_format: "{{amount_with_comma_separator}} lei",
        money_with_currency_format: "{{amount_with_comma_separator}} lei RON",
      },
      RUB: {
        money_format: "&#1088;&#1091;&#1073;{{amount_with_comma_separator}}",
        money_with_currency_format:
          "&#1088;&#1091;&#1073;{{amount_with_comma_separator}} RUB",
      },
      RWF: {
        money_format: "{{amount_no_decimals}} RF",
        money_with_currency_format: "{{amount_no_decimals}} RWF",
      },
      WST: {
        money_format: "WS$ {{amount}}",
        money_with_currency_format: "WS$ {{amount}} WST",
      },
      SAR: {
        money_format: "{{amount}} SR",
        money_with_currency_format: "{{amount}} SAR",
      },
      STD: {
        money_format: "Db {{amount}}",
        money_with_currency_format: "Db {{amount}} STD",
      },
      RSD: {
        money_format: "{{amount}} RSD",
        money_with_currency_format: "{{amount}} RSD",
      },
      SCR: {
        money_format: "Rs {{amount}}",
        money_with_currency_format: "Rs {{amount}} SCR",
      },
      SGD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} SGD",
      },
      SYP: {
        money_format: "S&pound;{{amount}}",
        money_with_currency_format: "S&pound;{{amount}} SYP",
      },
      ZAR: {
        money_format: "R {{amount}}",
        money_with_currency_format: "R {{amount}} ZAR",
      },
      KRW: {
        money_format: "&#8361;{{amount_no_decimals}}",
        money_with_currency_format: "&#8361;{{amount_no_decimals}} KRW",
      },
      LKR: {
        money_format: "Rs {{amount}}",
        money_with_currency_format: "Rs {{amount}} LKR",
      },
      SEK: {
        money_format: "{{amount_no_decimals}} kr",
        money_with_currency_format: "{{amount_no_decimals}} kr SEK",
      },
      CHF: {
        money_format: "{{amount}} CHF",
        money_with_currency_format: "{{amount}} CHF",
      },
      TWD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} TWD",
      },
      THB: {
        money_format: "{{amount}} &#xe3f;",
        money_with_currency_format: "{{amount}} &#xe3f; THB",
      },
      TZS: {
        money_format: "{{amount}} TZS",
        money_with_currency_format: "{{amount}} TZS",
      },
      TTD: {
        money_format: "${{amount}}",
        money_with_currency_format: "${{amount}} TTD",
      },
      TND: {
        money_format: "{{amount}}",
        money_with_currency_format: "{{amount}} DT",
      },
      TRY: {
        money_format: "{{amount}}TL",
        money_with_currency_format: "{{amount}}TL",
      },
      UGX: {
        money_format: "Ush {{amount_no_decimals}}",
        money_with_currency_format: "Ush {{amount_no_decimals}} UGX",
      },
      UAH: {
        money_format: "â‚´{{amount}}",
        money_with_currency_format: "{{amount}} UAH",
      },
      AED: {
        money_format: "Dhs. {{amount}}",
        money_with_currency_format: "Dhs. {{amount}} AED",
      },
      UYU: {
        money_format: "${{amount_with_comma_separator}}",
        money_with_currency_format: "${{amount_with_comma_separator}} UYU",
      },
      VUV: {
        money_format: "{{amount}} VT",
        money_with_currency_format: "{{amount}} VT",
      },
      VEF: {
        money_format: "Bs. {{amount_with_comma_separator}}",
        money_with_currency_format: "Bs. {{amount_with_comma_separator}} VEF",
      },
      VND: {
        money_format: "{{amount_no_decimals_with_comma_separator}}&#8363;",
        money_with_currency_format:
          "{{amount_no_decimals_with_comma_separator}} VND",
      },
      XBT: {
        money_format: "{{amount_no_decimals}} BTC",
        money_with_currency_format: "{{amount_no_decimals}} BTC",
      },
      XOF: {
        money_format: "CFA{{amount}}",
        money_with_currency_format: "CFA{{amount}} XOF",
      },
      ZMW: {
        money_format: "K{{amount_no_decimals_with_comma_separator}}",
        money_with_currency_format:
          "ZMW{{amount_no_decimals_with_comma_separator}}",
      },
    };
  T4SThemeSP.CurrencyT4s = (function () {
    function r() {
      o(`[data-currency-wrap]:not(.${i.enabled})`).on(
        "click",
        "[data-currency-item]",
        function (r) {
          r.preventDefault(), r.stopPropagation();
          var m = o(this);
          if (m.hasClass(i.selected)) return;
          (h = m.attr("data-currency")),
            (w = m.closest("[data-currency-wrap]")).addClass(i.enabled),
            (u = w.find("." + i.selected).attr("data-currency") || e);
          let n =
            o("[data-currency-wrap] [data-img-current]")
              .first()
              .attr("src")
              .replace(/\/\w\w.svg/g, "/" + h.slice(0, 2).toLowerCase()) +
            ".svg";
          o("[data-currency-wrap] [data-img-current]").attr("src", n),
            o("[data-currency-wrap] [data-current]")
              .text(m.text())
              .removeClass("flags-" + u)
              .addClass("flags-" + h),
            o(`[data-currency-wrap] .${i.selected}`).removeClass(i.selected),
            o("[data-currency-wrap] [data-currency=" + h + "]").addClass(
              i.selected,
            ),
            t(0, h),
            m.is("[data-drawer-close]") && y.trigger("click"),
            void 0 === r.originalEvent ||
              m.closest("#shopify-section-mb_nav").length > 0 ||
              a.trigger("dropdown:ts:close");
        },
      );
    }
    function m() {
      f.location &&
        (o("[data-currency-wrap]").each(function () {
          if (
            o(this).find("[data-currency-item].flags-" + f.location).length <= 0
          ) {
            let t =
              o(this)
                .find("[data-img-current]")
                .attr("src")
                .replace(
                  /\/\w\w.svg/g,
                  "/" + f.location.slice(0, 2).toLowerCase(),
                ) + ".svg";
            o(this)
              .find("[data-currency-item][data-currency-temp] img")
              .attr("src", t),
              o(this)
                .find("[data-currency-item][data-currency-temp] span")
                .text(f.location),
              o(this)
                .find("[data-currency-item][data-currency-temp]")
                .attr("data-currency", f.location)
                .addClass("flags-" + f.location)
                .removeClass("d-none");
          }
        }),
        o(
          `[data-currency-wrap] [data-currency="${f.currentCurrency || f.location || e}"]`,
        )
          .first()
          .trigger("click"));
    }
    function n(o) {
      var t = D[o.countryCode] || D[o.country] || o.currency || e,
        a = t.handle || t;
      f.location || (f.location = a), s[t] && m();
    }
    function _() {
      if (
        T4Sconfigs.auto_currency &&
        !navigator.userAgent.match(/bot|spider/i)
      ) {
        var t = isStorageSpdLocal ? localStorage.getItem("nt_currency") : null;
        if (t) n(JSON.parse(t));
        else {
          var a = {
            type: "get",
            url: "https://ipinfo.io/json",
            dataType: "json",
            success: function (o) {
              n(o),
                isStorageSpdLocal &&
                  localStorage.setItem("nt_currency", JSON.stringify(o));
            },
          };
          o.ajax({
            type: "get",
            url: "https://extreme-ip-lookup.com/json/?key=demo2",
            dataType: "json",
            success: function (t) {
              "success" == t.status
                ? (n(t),
                  isStorageSpdLocal &&
                    localStorage.setItem("nt_currency", JSON.stringify(t)))
                : o.ajax(a);
            },
            error: function (t, r) {
              o.ajax(a);
            },
          });
        }
      } else
        f.currentCurrency &&
          f.currentCurrency != e &&
          o(`[data-currency-wrap] [data-currency="${f.currentCurrency}"]`)
            .first()
            .trigger("click");
    }
    function c() {
      r(),
        o(
          `#menu-drawer [data-currency-wrap] [data-currency="${f.currentCurrency}"]`,
        )
          .first()
          .trigger("click"),
        o("#menu-drawer").one("lazyincluded", function (t) {
          m(),
            r(),
            o(
              `#menu-drawer [data-currency-wrap] [data-currency="${f.currentCurrency}"]`,
            )
              .first()
              .trigger("click");
        }),
        r(),
        a.on("currency:update", function () {
          "undefined" != f.currentCurrency &&
            null != f.currentCurrency &&
            "null" != f.currentCurrency &&
            t(0, f.currentCurrency);
        }),
        _();
    }
    var u,
      h,
      w,
      D = {
        AF: "AFN",
        AX: "EUR",
        AL: "ALL",
        DZ: "DZD",
        AS: "USD",
        AD: "EUR",
        AO: "AOA",
        AI: "XCD",
        AQ: "",
        AG: "XCD",
        AR: "ARS",
        AM: "AMD",
        AW: "AWG",
        AU: "AUD",
        AT: "EUR",
        AZ: "AZN",
        BS: "BSD",
        BH: "BHD",
        BD: "BDT",
        BB: "BBD",
        BY: "BYN",
        T4: "EUR",
        BZ: "BZD",
        BJ: "XOF",
        BM: "BMD",
        BT: "BTN",
        BO: "BOB",
        BA: "BAM",
        BW: "BWP",
        BV: "NOK",
        BR: "BRL",
        IO: "USD",
        BN: "BND",
        BG: "BGN",
        BF: "XOF",
        BI: "BIF",
        KH: "KHR",
        CM: "XAF",
        CA: "CAD",
        CV: "CVE",
        KY: "KYD",
        CF: "XAF",
        TD: "XAF",
        CL: "CLP",
        CN: "CNY",
        CX: "AUD",
        CC: "AUD",
        CO: "COP",
        KM: "KMF",
        CG: "XAF",
        CD: "CDF",
        CK: "NZD",
        CR: "CRC",
        CI: "XOF",
        HR: "HRK",
        CU: "CUP",
        CY: "EUR",
        CZ: "CZK",
        DK: "DKK",
        DJ: "DJF",
        DM: "XCD",
        DO: "DOP",
        EC: "USD",
        EG: "EGP",
        SV: "USD",
        GQ: "XAF",
        ER: "ERN",
        EE: "EUR",
        ET: "ETB",
        FK: "FKP",
        FO: "DKK",
        FJ: "FJD",
        FI: "EUR",
        FR: "EUR",
        GF: "EUR",
        PF: "XPF",
        TF: "EUR",
        GA: "XAF",
        GM: "GMD",
        GE: "GEL",
        DE: "EUR",
        GH: "GHS",
        GI: "GIP",
        GR: "EUR",
        GL: "DKK",
        GD: "XCD",
        GP: "EUR",
        GU: "USD",
        GT: "GTQ",
        GG: "GBP",
        GN: "GNF",
        GW: "XOF",
        GY: "GYD",
        HT: "HTG",
        HM: "AUD",
        VA: "EUR",
        HN: "HNL",
        HK: "HKD",
        HU: "HUF",
        IS: "ISK",
        IN: "INR",
        ID: "IDR",
        IR: "IRR",
        IQ: "IQD",
        IE: "EUR",
        IM: "GBP",
        IL: "ILS",
        IT: "EUR",
        JM: "JMD",
        JP: "JPY",
        JE: "GBP",
        JO: "JOD",
        KZ: "KZT",
        KE: "KES",
        KI: "AUD",
        KR: "KRW",
        KW: "KWD",
        KG: "KGS",
        LA: "LAK",
        LV: "EUR",
        LB: "LBP",
        LS: "LSL",
        LR: "LRD",
        LY: "LYD",
        LI: "CHF",
        LT: "EUR",
        LU: "EUR",
        MO: "MOP",
        MK: "MKD",
        MG: "MGA",
        MW: "MWK",
        MY: "MYR",
        MV: "MVR",
        ML: "XOF",
        MT: "EUR",
        MH: "USD",
        MQ: "EUR",
        MR: "MRU",
        MU: "MUR",
        YT: "EUR",
        MX: "MXN",
        FM: "USD",
        MD: "MDL",
        MC: "EUR",
        MN: "MNT",
        ME: "EUR",
        MS: "XCD",
        MA: "MAD",
        MZ: "MZN",
        MM: "MMK",
        NA: "NAD",
        NR: "AUD",
        NP: "NPR",
        NL: "EUR",
        AN: "",
        NC: "XPF",
        NZ: "NZD",
        NI: "NIO",
        NE: "XOF",
        NG: "NGN",
        NU: "NZD",
        NF: "AUD",
        MP: "USD",
        NO: "NOK",
        OM: "OMR",
        PK: "PKR",
        PW: "USD",
        PS: "ILS",
        PA: "PAB",
        PG: "PGK",
        PY: "PYG",
        PE: "PEN",
        PH: "PHP",
        PN: "NZD",
        PL: "PLN",
        PT: "EUR",
        PR: "USD",
        QA: "QAR",
        RE: "EUR",
        RO: "RON",
        RU: "RUB",
        RW: "RWF",
        BL: "EUR",
        SH: "SHP",
        KN: "XCD",
        LC: "XCD",
        MF: "EUR",
        PM: "EUR",
        VC: "XCD",
        WS: "WST",
        SM: "EUR",
        ST: "STN",
        SA: "SAR",
        SN: "XOF",
        RS: "RSD",
        SC: "SCR",
        SL: "SLL",
        SG: "SGD",
        SK: "EUR",
        SI: "EUR",
        SB: "SBD",
        SO: "SOS",
        ZA: "ZAR",
        GS: "GBP",
        ES: "EUR",
        LK: "LKR",
        SD: "SDG",
        SR: "SRD",
        SJ: "NOK",
        SZ: "SZL",
        SE: "SEK",
        CH: "CHF",
        SY: "SYP",
        TW: "TWD",
        TJ: "TJS",
        TZ: "TZS",
        TH: "THB",
        TL: "USD",
        TG: "XOF",
        TK: "NZD",
        TO: "TOP",
        TT: "TTD",
        TN: "TND",
        TR: "TRY",
        TM: "TMT",
        TC: "USD",
        TV: "AUD",
        UG: "UGX",
        UA: "UAH",
        AE: "AED",
        GB: "GBP",
        US: "USD",
        UM: "USD",
        UY: "UYU",
        UZ: "UZS",
        VU: "VUV",
        VE: "VEF",
        VN: "VND",
        VG: "USD",
        VI: "USD",
        WF: "XPF",
        EH: "MAD",
        YE: "YER",
        ZM: "ZMW",
        ZW: "ZWD",
      };
    return c;
  })();
})(window.jQuery),
  window.jQuery(document).ready(function (o) {
    $script("https://cdn.shopify.com/s/javascripts/currencies.js", function () {
      T4SThemeSP.CurrencyT4s();
    });
  });
