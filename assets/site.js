(function () {
  var page = location.pathname.split("/").pop() || "index.html";
  if (page === "article.html") page = "blog.html";

  // Highlight active nav link
  document.querySelectorAll('nav[aria-label="Primary navigation"] a').forEach(function (a) {
    if (a.getAttribute("href") === page) {
      a.classList.remove("text-slate-600");
      a.classList.add("text-primary", "after:scale-x-100");
    }
  });

  // Mobile menu
  var btn = document.querySelector('button[aria-label="Toggle navigation"]');
  var header = document.querySelector("header");
  if (btn && header) {
    var menu = document.createElement("nav");
    menu.setAttribute("aria-label", "Mobile navigation");
    menu.className = "border-t border-slate-100 bg-white px-5 py-5 lg:hidden";
    menu.hidden = true;
    var links = [["about.html","About us"],["services.html","Services"],["use-cases.html","Use Cases"],["blog.html","Blog"],["careers.html","Work with us"]];
    var h = '<div class="flex flex-col gap-1">';
    links.forEach(function (l) { h += '<a class="rounded-xl px-4 py-3 font-medium hover:bg-slate-50" href="' + l[0] + '">' + l[1] + "</a>"; });
    h += '<a class="btn-primary mt-3 justify-center" href="contact.html">Contact us</a></div>';
    menu.innerHTML = h;
    header.appendChild(menu);
    btn.addEventListener("click", function () {
      menu.hidden = !menu.hidden;
      btn.setAttribute("aria-expanded", String(!menu.hidden));
    });
  }

  // Blog filter + search
  var chips = Array.prototype.filter.call(document.querySelectorAll("button"), function (b) {
    return ["All","AI","Technology","Leadership","Team Oreo"].indexOf(b.textContent.trim()) > -1 && b.className.indexOf("rounded-full") > -1;
  });
  var search = document.querySelector('input[placeholder="Search insights"]');
  var cards = document.querySelectorAll("main article");
  if (chips.length && cards.length) {
    var cat = "All";
    var on = "bg-navy text-white", off = "bg-slate-100 text-slate-600 hover:bg-slate-200";
    var apply = function () {
      var q = search ? search.value.toLowerCase() : "";
      cards.forEach(function (c) {
        var okCat = cat === "All" || c.textContent.indexOf(cat) > -1;
        var okQ = !q || c.textContent.toLowerCase().indexOf(q) > -1;
        c.style.display = okCat && okQ ? "" : "none";
      });
    };
    chips.forEach(function (b) {
      b.addEventListener("click", function () {
        cat = b.textContent.trim();
        chips.forEach(function (x) {
          x.className = x.className.replace(on, "").replace(off, "").trim() + " " + (x === b ? on : off);
        });
        apply();
      });
    });
    if (search) search.addEventListener("input", apply);
  }

  // Contact form (demo: shows a thank-you message; connect to Formspree/Netlify Forms to receive real enquiries)
  var form = document.querySelector("main form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.innerHTML = '<div class="grid min-h-[32rem] place-items-center text-center"><div><h2 class="text-2xl font-semibold">Thanks for getting in touch.</h2><p class="mt-3 text-slate-600">Your enquiry has been captured in this demo. Our team would follow up shortly.</p><a href="contact.html" class="btn-secondary mt-7">Send another message</a></div></div>';
    });
  }
})();
