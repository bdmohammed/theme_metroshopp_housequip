!(function (e) {
  "use strict";
  (e.ThreeSixty = function (t, r) {
    var a,
      n = this,
      o = [];
    (n.$el = e(t)),
      (n.el = t),
      n.$el.data("ThreeSixty", n),
      (n.init = function () {
        (a = e.extend({}, e.ThreeSixty.defaultOptions, r)).disableSpin &&
          ((a.currentFrame = 1), (a.endFrame = 1)),
          n.initProgress(),
          n.loadImages();
      }),
      (n.resize = function () {}),
      (n.initProgress = function () {
        n.$el.css({
          width: a.width + "px",
          height: a.height + "px",
          "background-image": "none !important",
        }),
          a.styles && n.$el.css(a.styles),
          n.responsive(),
          n.$el.find(a.progress),
          n.$el.find(a.progress).fadeIn("slow"),
          n.$el.find(a.imgList).hide();
      }),
      (n.loadImages = function () {
        var t, r, i, s;
        (t = document.createElement("li")),
          (s = a.zeroBased ? 0 : 1),
          (r = a.imgArray
            ? a.imgArray[a.loadedImages]
            : a.domain +
              a.imagePath +
              a.filePrefix +
              n.zeroPad(a.loadedImages + s) +
              a.ext +
              (n.browser.isIE() ? "?" + new Date().getTime() : "")),
          (i = e("<img>")
            .attr("src", r)
            .addClass("previous-image")
            .appendTo(t)),
          o.push(i),
          n.$el.find(a.imgList).append(t),
          e(i).on("load", function () {
            n.imageLoaded();
          });
      }),
      (n.imageLoaded = function () {
        (a.loadedImages += 1),
          e(a.progress + " span").text(
            Math.floor((a.loadedImages / a.totalFrames) * 100) + "%",
          ),
          a.loadedImages >= a.totalFrames
            ? (a.disableSpin &&
                o[0].removeClass("previous-image").addClass("current-image"),
              e(a.progress).fadeOut("slow", function () {
                e(this).hide(), n.showImages(), n.showNavigation();
              }))
            : n.loadImages();
      }),
      (n.showImages = function () {
        n.$el.find(".txtC").fadeIn(),
          n.$el.find(a.imgList).fadeIn(),
          (n.ready = !0),
          (a.ready = !0),
          a.drag && n.initEvents(),
          n.refresh(),
          n.initPlugins(),
          a.onReady(),
          setTimeout(function () {
            n.responsive();
          }, 50);
      }),
      (n.initPlugins = function () {
        e.each(a.plugins, function (t, r) {
          if ("function" != typeof e[r]) throw new Error(r + " not available.");
          e[r].call(n, n.$el, a);
        });
      }),
      (n.showNavigation = function () {
        var t, r, o, i;
        a.navigation &&
          !a.navigation_init &&
          ((t = e("<div/>").attr("class", "nav_bar")),
          (r = e("<a/>")
            .attr({ href: "#", class: "nav_bar_next" })
            .html(
              '<svg viewBox="0 0 24 24" width="24" height="24" stroke="#222" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-next"><polyline points="9 18 15 12 9 6"></polyline></svg>',
            )),
          (o = e("<a/>")
            .attr({ href: "#", class: "nav_bar_previous" })
            .html(
              '<svg viewBox="0 0 24 24" width="24" height="24" stroke="#222" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-prev"><polyline points="15 18 9 12 15 6"></polyline></svg>',
            )),
          (i = e("<a/>")
            .attr({ href: "#", class: "nav_bar_play" })
            .html(
              '<svg viewBox="0 0 24 24" width="24" height="24" stroke="#222" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><svg viewBox="0 0 24 24" width="24" height="24" stroke="#222" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-stop absolute"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>',
            )),
          t.append(o),
          t.append(i),
          t.append(r),
          n.$el.prepend(t),
          r.bind("mousedown touchstart", n.next),
          o.bind("mousedown touchstart", n.previous),
          i.bind("mousedown touchstart", n.play_stop),
          (a.navigation_init = !0));
      }),
      (n.play_stop = function (t) {
        t.preventDefault(),
          a.autoplay
            ? ((a.autoplay = !1),
              e(t.currentTarget)
                .removeClass("nav_bar_stop")
                .addClass("nav_bar_play"),
              clearInterval(a.play),
              (a.play = null))
            : ((a.autoplay = !0),
              (a.play = setInterval(n.moveToNextFrame, a.playSpeed)),
              e(t.currentTarget)
                .removeClass("nav_bar_play")
                .addClass("nav_bar_stop"));
      }),
      (n.next = function (e) {
        e && e.preventDefault(), (a.endFrame -= 5), n.refresh();
      }),
      (n.previous = function (e) {
        e && e.preventDefault(), (a.endFrame += 5), n.refresh();
      }),
      (n.play = function (e, t) {
        var r = e || a.playSpeed,
          o = t || a.autoplayDirection;
        (a.autoplayDirection = o),
          a.autoplay ||
            ((a.autoplay = !0), (a.play = setInterval(n.moveToNextFrame, r)));
      }),
      (n.stop = function () {
        a.autoplay &&
          ((a.autoplay = !1), clearInterval(a.play), (a.play = null));
      }),
      (n.moveToNextFrame = function () {
        1 === a.autoplayDirection ? (a.endFrame -= 1) : (a.endFrame += 1),
          n.refresh();
      }),
      (n.gotoAndPlay = function (e) {
        if (a.disableWrap) (a.endFrame = e), n.refresh();
        else {
          var t = Math.ceil(a.endFrame / a.totalFrames);
          0 === t && (t = 1);
          var r,
            o = t > 1 ? a.endFrame - (t - 1) * a.totalFrames : a.endFrame,
            i = a.totalFrames - o;
          (r =
            e - o > 0
              ? e - o < o + (a.totalFrames - e)
                ? a.endFrame + (e - o)
                : a.endFrame - (o + (a.totalFrames - e))
              : i + e > o - e
                ? a.endFrame - (o - e)
                : a.endFrame + (i + e)),
            o !== e && ((a.endFrame = r), n.refresh());
        }
      }),
      (n.initEvents = function () {
        n.$el.bind(
          "mousedown touchstart touchmove touchend mousemove click",
          function (e) {
            e.preventDefault(),
              ("mousedown" === e.type && 1 === e.which) ||
              "touchstart" === e.type
                ? ((a.pointerStartPosX = n.getPointerEvent(e).pageX),
                  (a.dragging = !0),
                  a.onDragStart(a.currentFrame))
                : "touchmove" === e.type
                  ? n.trackPointer(e)
                  : "touchend" === e.type &&
                    ((a.dragging = !1), a.onDragStop(a.endFrame));
          },
        ),
          e(document).bind("mouseup", function (t) {
            (a.dragging = !1),
              a.onDragStop(a.endFrame),
              e(this).css("cursor", "none");
          }),
          e(window).bind("resize", function (e) {
            n.responsive();
          }),
          e(document).bind("mousemove", function (e) {
            a.dragging
              ? (e.preventDefault(),
                !n.browser.isIE &&
                  a.showCursor &&
                  n.$el.css(
                    "cursor",
                    "url(assets/images/hand_closed.png), auto",
                  ))
              : !n.browser.isIE &&
                a.showCursor &&
                n.$el.css("cursor", "url(assets/images/hand_open.png), auto"),
              n.trackPointer(e);
          }),
          e(window).resize(function () {
            n.resize();
          });
      }),
      (n.getPointerEvent = function (e) {
        return e.originalEvent.targetTouches
          ? e.originalEvent.targetTouches[0]
          : e;
      }),
      (n.trackPointer = function (e) {
        a.ready &&
          a.dragging &&
          ((a.pointerEndPosX = n.getPointerEvent(e).pageX),
          a.monitorStartTime < new Date().getTime() - a.monitorInt &&
            ((a.pointerDistance = a.pointerEndPosX - a.pointerStartPosX),
            a.pointerDistance > 0
              ? (a.endFrame =
                  a.currentFrame +
                  Math.ceil(
                    (a.totalFrames - 1) *
                      a.speedMultiplier *
                      (a.pointerDistance / n.$el.width()),
                  ))
              : (a.endFrame =
                  a.currentFrame +
                  Math.floor(
                    (a.totalFrames - 1) *
                      a.speedMultiplier *
                      (a.pointerDistance / n.$el.width()),
                  )),
            a.disableWrap &&
              ((a.endFrame = Math.min(
                a.totalFrames - (a.zeroBased ? 1 : 0),
                a.endFrame,
              )),
              (a.endFrame = Math.max(a.zeroBased ? 0 : 1, a.endFrame))),
            n.refresh(),
            (a.monitorStartTime = new Date().getTime()),
            (a.pointerStartPosX = n.getPointerEvent(e).pageX)));
      }),
      (n.refresh = function () {
        0 === a.ticker &&
          (a.ticker = setInterval(n.render, Math.round(1e3 / a.framerate)));
      }),
      (n.render = function () {
        var e;
        a.currentFrame !== a.endFrame
          ? ((e =
              a.endFrame < a.currentFrame
                ? Math.floor(0.1 * (a.endFrame - a.currentFrame))
                : Math.ceil(0.1 * (a.endFrame - a.currentFrame))),
            n.hidePreviousFrame(),
            (a.currentFrame += e),
            n.showCurrentFrame(),
            n.$el.trigger("frameIndexChanged", [
              n.getNormalizedCurrentFrame(),
              a.totalFrames,
            ]))
          : (window.clearInterval(a.ticker), (a.ticker = 0));
      }),
      (n.hidePreviousFrame = function () {
        o[n.getNormalizedCurrentFrame()]
          .removeClass("current-image")
          .addClass("previous-image");
      }),
      (n.showCurrentFrame = function () {
        o[n.getNormalizedCurrentFrame()]
          .removeClass("previous-image")
          .addClass("current-image");
      }),
      (n.getNormalizedCurrentFrame = function () {
        var e, t;
        return (
          a.disableWrap
            ? ((e = Math.min(
                a.currentFrame,
                a.totalFrames - (a.zeroBased ? 1 : 0),
              )),
              (t = Math.min(a.endFrame, a.totalFrames - (a.zeroBased ? 1 : 0))),
              (e = Math.max(e, a.zeroBased ? 0 : 1)),
              (t = Math.max(t, a.zeroBased ? 0 : 1)),
              (a.currentFrame = e),
              (a.endFrame = t))
            : 0 > (e = Math.ceil(a.currentFrame % a.totalFrames)) &&
              (e += a.totalFrames - (a.zeroBased ? 1 : 0)),
          e
        );
      }),
      (n.getCurrentFrame = function () {
        return a.currentFrame;
      }),
      (n.responsive = function () {
        a.responsive &&
          n.$el.css({
            height: n.$el.find(".current-image").first().css("height"),
            width: "100%",
          });
      }),
      (n.zeroPad = function (e) {
        var t = Math.log(a.totalFrames) / Math.LN10,
          r = Math.round(1e3 * t) / 1e3;
        return (function (e, t) {
          var r = e.toString();
          if (a.zeroPadding) for (; r.length < t; ) r = "0" + r;
          return r;
        })(e, Math.floor(r) + 1);
      }),
      (n.browser = {}),
      (n.browser.isIE = function () {
        var e = -1;
        if ("Microsoft Internet Explorer" === navigator.appName) {
          var t = navigator.userAgent;
          null !== new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})").exec(t) &&
            (e = parseFloat(RegExp.$1));
        }
        return -1 !== e;
      }),
      (n.getConfig = function () {
        return a;
      }),
      (e.ThreeSixty.defaultOptions = {
        dragging: !1,
        ready: !1,
        pointerStartPosX: 0,
        pointerEndPosX: 0,
        pointerDistance: 0,
        monitorStartTime: 0,
        monitorInt: 10,
        ticker: 0,
        speedMultiplier: 7,
        totalFrames: 180,
        currentFrame: 0,
        endFrame: 0,
        loadedImages: 0,
        framerate: 60,
        domains: null,
        domain: "",
        parallel: !1,
        queueAmount: 8,
        idle: 0,
        filePrefix: "",
        ext: "png",
        height: 300,
        width: 300,
        styles: {},
        navigation: !1,
        autoplay: !1,
        autoplayDirection: 1,
        disableSpin: !1,
        disableWrap: !1,
        responsive: !1,
        zeroPadding: !1,
        zeroBased: !1,
        plugins: [],
        showCursor: !1,
        drag: !0,
        onReady: function () {},
        onDragStart: function () {},
        onDragStop: function () {},
        imgList: ".threesixty_images",
        imgArray: null,
        playSpeed: 100,
      }),
      n.init();
  }),
    (e.fn.ThreeSixty = function (t) {
      return Object.create(new e.ThreeSixty(this, t));
    });
})(jQuery_T4NT),
  "function" != typeof Object.create &&
    (Object.create = function (e) {
      "use strict";
      function t() {}
      return (t.prototype = e), new t();
    }),
  "function" != typeof Object.create &&
    (Object.create = function (e) {
      "use strict";
      function t() {}
      return (t.prototype = e), new t();
    });
