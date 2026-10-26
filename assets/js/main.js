/* أكاديمية لؤلؤة — تفاعلات الصفحة */

(function () {
  "use strict";

  // السنة في التذييل
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ظهور العناصر عند التمرير
  var items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || items.length === 0) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach(function (el, i) {
    // تتابع بسيط لبطاقات الروابط
    el.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
    observer.observe(el);
  });
})();
