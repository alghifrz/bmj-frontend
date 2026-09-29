const source = `
(function () {
  if (window.__bmjWaTracker) return;
  window.__bmjWaTracker = true;

  function visitorId() {
    var hex = "0123456789abcdef";
    var fresh = "";
    for (var i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) fresh += "-";
      else if (i === 14) fresh += "4";
      else if (i === 19) fresh += "a";
      else fresh += hex[Math.floor(Math.random() * 16)];
    }
    try {
      var stored = localStorage.getItem("bmj_visitor") || "";
      if (/^[A-Za-z0-9-]{16,64}$/.test(stored)) return stored;
      localStorage.setItem("bmj_visitor", fresh);
    } catch (error) {}
    return fresh;
  }

  function send(body) {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify(body)
    }).catch(function () {});
  }

  var path = location.pathname || "/";
  send({
    kind: "page_view",
    source: "page",
    visitor_key: visitorId(),
    path: path
  });

  document.addEventListener("click", function (event) {
    var node = event.target && event.target.closest ? event.target.closest("a[data-wa-source]") : null;
    if (!node) return;
    var source = node.getAttribute("data-wa-source");
    var slug = node.getAttribute("data-wa-product");
    if (!source || !slug) return;
    var currentPath = location.pathname || "/";
    var stamp = source + ":" + slug + ":" + currentPath;
    var now = Date.now();
    if (window.__bmjWaStamp === stamp && now - (window.__bmjWaAt || 0) < 2000) return;
    window.__bmjWaStamp = stamp;
    window.__bmjWaAt = now;
    if (window.gtag) window.gtag("event", "whatsapp_click", { source: source, product_slug: slug });
    send({
      kind: "whatsapp_click",
      source: source,
      product_slug: slug,
      visitor_key: visitorId(),
      path: currentPath
    });
  }, true);
})();
`;

export function WhatsAppClickTracker() {
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}
