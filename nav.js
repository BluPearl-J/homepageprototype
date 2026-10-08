/* Footer "Services" -> scroll up and open the Services dropdown in the header */
(function () {
  function panel() {
    var a = document.querySelector('header a[href$="it-consultancy.html"]');
    return a ? a.parentElement : null;
  }
  var timer;
  function show(p) {
    p.style.visibility = 'visible'; p.style.opacity = '1'; p.style.transform = 'translateY(0)';
    clearTimeout(timer);
    timer = setTimeout(hide, 6000);
    function off(e) { if (!p.contains(e.target)) { hide(); document.removeEventListener('mousemove', off); } }
    setTimeout(function () { document.addEventListener('mousemove', off, { once: false }); }, 300);
  }
  function hide() { var p = panel(); if (!p) return; p.style.visibility = p.style.opacity = p.style.transform = ''; }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('[data-open-services]') : null;
    if (!a) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.innerWidth < 1024) {
      var b = document.querySelector('header button[aria-controls]');
      if (b && b.getAttribute('aria-expanded') !== 'true') b.click();
      var d = document.querySelector('header details'); if (d) d.open = true;
      return;
    }
    var p = panel(); if (p) setTimeout(function () { show(p); }, 350);
  });
})();
