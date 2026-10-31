/* عرض تفاصيل الدورة بناءً على ?id= في الرابط */
(function () {
  "use strict";

  var id = new URLSearchParams(location.search).get("id");
  var course = (window.COURSES || {})[id];

  function show(el) { if (el) el.hidden = false; }

  if (!course) {
    show(document.getElementById("notFound"));
    document.title = "لم نجد الدورة | أكاديمية لؤلؤة";
    return;
  }

  /* الترويسة */
  document.getElementById("cField").textContent = course.field;
  document.getElementById("cTitle").textContent = course.title;
  document.getElementById("cStatus").textContent = course.status;
  document.getElementById("cDesc").textContent = course.desc;
  document.title = course.title + " | أكاديمية لؤلؤة";

  /* بادجة السعر: خضراء للمجانية، بنفسجية للمدفوعة */
  var price = document.getElementById("cPrice");
  price.textContent = course.price;
  price.classList.add(course.priceType === "free" ? "badge-free" : "badge-paid");

  /* ما ستتعلمينه */
  var ul = document.getElementById("cPoints");
  (course.points || []).forEach(function (p) {
    var li = document.createElement("li");
    li.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i><span></span>';
    li.querySelector("span").textContent = p;
    ul.appendChild(li);
  });

  /* معلومات الدورة */
  document.getElementById("cFormat").textContent = course.format;
  document.getElementById("cAudience").textContent = course.audience;
  document.getElementById("cFee").textContent =
    course.priceType === "free" ? "المشاركة مجانية بالكامل 🤍" : "رسوم مدفوعة — تواصلين معنا لمعرفة السعر";

  /* زر التسجيل */
  var cta = document.getElementById("cCta");
  cta.href = course.ctaLink;
  document.getElementById("cCtaText").textContent = course.cta;

  show(document.getElementById("courseBox"));
  show(document.getElementById("pointsPanel"));
  show(document.getElementById("infoPanel"));
  show(document.getElementById("cCtaWrap"));

  /* إظهار العناصر عند التمرير (نفس أسلوب الصفحة الرئيسية) */
  document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
})();
