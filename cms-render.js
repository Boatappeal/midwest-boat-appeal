/* Renders editable content (boats for sale + contact info) from _data JSON files.
   If a fetch fails, the hardcoded HTML already in the page is left untouched. */
(function () {
  "use strict";

  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const telHref = (phone) => "tel:" + String(phone || "").replace(/[^0-9+]/g, "");

  /* ---------- Boats for sale ---------- */
  function renderListings(data, phone) {
    const grid = document.querySelector(".listings-grid");
    if (!grid || !data || !Array.isArray(data.listings)) return;

    const listings = data.listings.filter((l) => l && l.title);
    if (!listings.length) {
      grid.innerHTML =
        '<p class="listings-empty">No boats listed right now — call or stop in to see what\'s on the lot.</p>';
      return;
    }

    grid.innerHTML = listings.map((l) => cardHTML(l, phone)).join("");
    listings.forEach((l, i) => wireGallery(grid.children[i], (l.photos || []).length));
  }

  function cardHTML(l, phone) {
    const photos = Array.isArray(l.photos) ? l.photos : [];
    const specs = Array.isArray(l.specs) ? l.specs : [];
    const main = photos[0] || "";

    const thumbs = photos
      .map(
        (src, i) =>
          `<button class="thumb${i === 0 ? " is-active" : ""}" role="listitem" data-src="${esc(src)}"><img src="${esc(src)}" alt=""/></button>`
      )
      .join("");

    const specRows = specs
      .filter((s) => s && s.label)
      .map((s) => `<li><span>${esc(s.label)}</span><strong>${esc(s.value)}</strong></li>`)
      .join("");

    const gallery =
      photos.length > 0
        ? `<div class="listing-gallery">
        <div class="listing-main">
          <button class="listing-nav listing-prev" type="button" aria-label="Previous photo">
            <svg width="18" height="32" viewBox="0 0 18 32" fill="none" aria-hidden="true"><path d="M14 4 4 16l10 12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <img class="listing-photo" src="${esc(main)}" alt="${esc(l.title)}" />
          <button class="listing-nav listing-next" type="button" aria-label="Next photo">
            <svg width="18" height="32" viewBox="0 0 18 32" fill="none" aria-hidden="true"><path d="m4 4 10 12-10 12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="listing-counter">1 / ${photos.length}</div>
        </div>
        <div class="listing-thumbs" role="list">${thumbs}</div>
      </div>`
        : "";

    return `<article class="listing-card listing-card-featured">
      ${gallery}
      <div class="listing-body">
        ${l.tag ? `<div class="listing-tag">${esc(l.tag)}</div>` : ""}
        <h3>${esc(l.title)}</h3>
        ${l.price ? `<p class="price">${esc(l.price)}</p>` : ""}
        ${specRows ? `<ul class="spec-list">${specRows}</ul>` : ""}
        <div class="listing-ctas">
          <a href="#contact" class="btn btn-primary">Inquire about this boat</a>
          <a href="${telHref(phone)}" class="btn btn-ghost">Call ${esc(phone)}</a>
        </div>
      </div>
    </article>`;
  }

  function wireGallery(card, count) {
    if (!card || count < 1) return;
    const mainImg = card.querySelector(".listing-photo");
    const thumbs = Array.from(card.querySelectorAll(".listing-thumbs .thumb"));
    const counter = card.querySelector(".listing-counter");
    let idx = 0;

    function setActive(i) {
      if (!thumbs.length || !mainImg) return;
      idx = (i + thumbs.length) % thumbs.length;
      const src = thumbs[idx].getAttribute("data-src");
      mainImg.style.opacity = "0";
      const tmp = new Image();
      tmp.onload = () => {
        mainImg.src = src;
        mainImg.style.opacity = "1";
      };
      tmp.src = src;
      thumbs.forEach((b, i2) => b.classList.toggle("is-active", i2 === idx));
      if (counter) counter.textContent = `${idx + 1} / ${thumbs.length}`;
    }

    thumbs.forEach((btn, i) => btn.addEventListener("click", () => setActive(i)));
    card.querySelector(".listing-prev")?.addEventListener("click", () => setActive(idx - 1));
    card.querySelector(".listing-next")?.addEventListener("click", () => setActive(idx + 1));
  }

  /* ---------- Contact info ---------- */
  function renderContact(data) {
    if (!data) return;
    const list = document.querySelector(".contact .info-list");
    if (!list) return;

    list.querySelectorAll("div").forEach((row) => {
      const dt = row.querySelector("dt");
      const dd = row.querySelector("dd");
      if (!dt || !dd) return;
      const key = dt.textContent.trim().toLowerCase();
      if (key === "phone" && data.phone) {
        dd.innerHTML = `<a href="${telHref(data.phone)}">${esc(data.phone)}</a>`;
      } else if (key === "email" && data.email) {
        dd.innerHTML = `<a href="mailto:${esc(data.email)}">${esc(data.email)}</a>`;
      } else if (key === "address" && data.address) {
        dd.innerHTML = esc(data.address).replace(/\n/g, "<br/>");
      } else if (key === "hours" && data.hours) {
        dd.innerHTML = esc(data.hours).replace(/\n/g, "<br/>");
      }
    });
  }

  /* ---------- Load ---------- */
  function getJSON(url) {
    return fetch(url, { cache: "no-cache" }).then((r) => {
      if (!r.ok) throw new Error(url + " " + r.status);
      return r.json();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    let contact = null;
    getJSON("_data/contact.json")
      .then((c) => {
        contact = c;
        renderContact(c);
      })
      .catch(() => {})
      .finally(() => {
        getJSON("_data/boat-for-sale.json")
          .then((b) => renderListings(b, contact && contact.phone ? contact.phone : "952-446-9611"))
          .catch(() => {});
      });
  });
})();
