/* Scott & Jerm's Iceland: a day-by-day trip plan. No pick or vote UI. */
(function () {
  "use strict";

  var D = window.ICELAND_DATA || {};
  var T = window.ICELAND_TRIP || {};
  var PHOTO_URLS = D.PHOTO_URLS || {};
  var CATALOG = D.CATALOG || [];
  var CATALOG_MAP = {};
  CATALOG.forEach(function (c) { CATALOG_MAP[c.id] = c; });

  var PLAN_TOTAL = 15218;
  var LODGING = 8437;
  var ITEMS = {
    flight: {
      id: "flight", title: "Icelandair, Saga Premium", photo: "saga_seat", status: "Not booked",
      price: "$6,062",
      sub: "Verified Google Flights cash total for two adults, FI670 and FI671, Dec 28 to Jan 4. One checked bag, 32 kg / 70 lb, meals, and priority.",
      desc: "FI670 leaves Denver at 3:40 PM MT on Dec 28 and lands at Keflavik at 6:05 AM on Dec 29, 7 hours 25 minutes, nonstop. The return is FI671 on Jan 4, leaving Keflavik at 4:55 PM and landing in Denver at 6:00 PM MT, 8 hours 5 minutes.",
      url: "https://www.icelandair.com/flights/from-denver-to-reykjavik/", urlLabel: "Icelandair",
      maps: "Keflavik Airport", place: "kef"
    },
    car: {
      id: "car", title: "Dacia Duster 4x4, six days", photo: "car_duster", status: "Not booked",
      price: "$719",
      sub: "Blue Car Rental, Dec 29 to Jan 4, cash total for the car.",
      desc: "Pick up at Keflavik after the 6:05 AM landing, and drop off before the 4:55 PM flight home on Jan 4. A 4WD SUV is the working plan for winter roads.",
      url: "https://www.bluecarrental.is/", urlLabel: "Blue Car Rental"
    },
    "stay-domes": {
      id: "stay-domes", title: "Golden Circle Domes, one night", photo: "domes", status: "Not booked",
      price: "$1,371",
      sub: "Live cash rate for Dec 29, 1,250 euros, total for the dome.",
      desc: "Contactless self check-in from 3:00 PM. There is no front desk, so there is nowhere to leave bags early. Breakfast is not included, but each dome has a full kitchenette, and Thrastalundur restaurant and minimarket is on site. Double bed, private bathroom, and a wood fireplace.",
      winter: "This is peak holiday pricing.",
      url: "https://property.godo.is/booking2.php?propid=175431&cur=USD", urlLabel: "Golden Circle Domes",
      maps: "Golden Circle Domes Thrastalundur Selfoss", place: "domes"
    },
    "stay-glass": {
      id: "stay-glass", title: "Glass Cottages, Cottage Blar, one night", photo: "glass_cottages", status: "Book soon",
      price: "$559",
      sub: "Live cash rate for Dec 30, last cottage left when checked. Free cancellation ends Nov 30, 2026, once you book.",
      desc: "One double bed, a glass wall, and a private hot tub, near Hella. There is no on-site restaurant or breakfast. The private kitchen is stocked with coffee, tea, and oil. Hella is about 5 minutes away.",
      winter: "The cottage sits in lava fields. Dress for wind and ice if you use the hot tub.",
      url: "https://glasscottages.com/", urlLabel: "Glass Cottages",
      maps: "Glass Cottages Klettamork Hella", place: "glass_cottages"
    },
    "stay-edition": {
      id: "stay-edition", title: "The Reykjavik EDITION, King Room, three nights", photo: "edition_room", status: "Not booked",
      price: "$4,023",
      sub: "Stay Longer on Us Flexible Member rate for Dec 31 to Jan 3, all taxes and fees included.",
      desc: "A King Room with one king bed, check in Dec 31 and check out Jan 3. Harbor-area hotel next to Harpa.",
      url: "https://www.marriott.com/en-us/hotels/reyek-the-reykjavik-edition/", urlLabel: "The Reykjavik EDITION",
      maps: "The Reykjavik EDITION", place: "edition"
    },
    "stay-retreat": {
      id: "stay-retreat", title: "The Retreat at Blue Lagoon, Lava View Junior Suite", photo: "retreat_hero", status: "Not booked",
      price: "est. $2,484",
      sub: "About 310,000 ISK for Jan 3, estimated. 8 suites were left when checked.",
      desc: "One night in a Lava View Junior Suite, with lagoon access. The next morning you drive about 25 minutes to Keflavik for the 4:55 PM flight.",
      url: "https://www.bluelagoon.com/retreat", urlLabel: "The Retreat",
      maps: "The Retreat at Blue Lagoon", place: "retreat"
    }
  };

  var DAYS = [
    {
      id: "dec28", date: "Dec 28, Monday", title: "Overnight flight from Denver at 3:40 PM MT",
      note: "No driving in Iceland today. FI670 leaves Denver at 3:40 PM MT and you sleep on the plane.",
      times: [
        { when: "3:40 PM MT", what: "FI670 departs Denver, 7 hours 25 minutes, nonstop." }
      ],
      items: ["flight"]
    },
    {
      id: "dec29", date: "Dec 29, Tuesday", title: "Light arrival day: Reykjabod, then the domes",
      note: "Winter daylight is about 11:20 AM to 3:30 PM. Pick up the 4WD after the 6:05 AM landing and grab breakfast on the way. Reykjabod opens at 10:00 AM. Check-in at the domes is 3:00 PM, with no front desk for an early bag drop. Breakfast is not included at the domes, but each dome has a full kitchenette, and Thrastalundur restaurant and minimarket is on site.",
      times: [
        { when: "6:05 AM", what: "Land at Keflavik and pick up the 4WD SUV." },
        { when: "Morning", what: "Breakfast on the way south." },
        { when: "After 10:00 AM", what: "Soak at Reykjabod Hot Springs in Hveragerdi." },
        { when: "Afternoon", what: "Grocery pickup in Selfoss for the dome kitchen." },
        { when: "3:00 PM", what: "Check in at Golden Circle Domes." },
        { when: "Evening", what: "Dinner at Froken Selfoss, about 10 to 15 minutes from the domes." }
      ],
      items: ["reykjabod", "mjolkurbuid", "stay-domes", "froken"]
    },
    {
      id: "dec30", date: "Dec 30, Wednesday", title: "Kerid crater, then Glass Cottages Blar",
      note: "Breakfast in the dome or at Thrastalundur, then check out and stop at Kerid crater on the way south to Hella. Glass Cottages has no on-site food, but the kitchen is stocked with coffee, tea, and oil. Hella is about 5 minutes away.",
      times: [
        { when: "Morning", what: "Breakfast in the dome or at Thrastalundur, then check out." },
        { when: "Late morning", what: "Stop at Kerid crater, about 5 minutes from the domes." },
        { when: "Afternoon", what: "Check in at Glass Cottages, Cottage Blar, near Hella." },
        { when: "Evening", what: "Dinner at Midgard Restaurant in Hvolsvollur, about 13 minutes away." }
      ],
      items: ["kerid", "stay-glass", "midgard"]
    },
    {
      id: "dec31", date: "Dec 31, Thursday", title: "Drive to Reykjavik, New Year's Eve",
      note: "Glass Cottages to The Reykjavik EDITION is about 96 km and 1 hr 30 min, approx. Downtown will be busy. Leave the car parked after you check in. Neighborhood bonfires are earlier in the evening, and fireworks go at midnight.",
      times: [
        { when: "Daytime", what: "Drive to Reykjavik and check in at The Reykjavik EDITION." },
        { when: "Evening", what: "New Year's Eve in town: dinner, a neighborhood bonfire, then midnight fireworks." }
      ],
      items: ["stay-edition"]
    },
    {
      id: "jan1", date: "Jan 1, Friday", title: "A day in Reykjavik",
      note: "A quiet day in town around the harbor and Laugavegur, or a Golden Circle drive if you want one. Winter daylight is short, about 11:20 AM to 3:30 PM.",
      times: [
        { when: "Day", what: "Stay at The Reykjavik EDITION. Keep the day loose in town, or drive the Golden Circle if the roads look good." }
      ],
      items: ["stay-edition"]
    },
    {
      id: "jan2", date: "Jan 2, Saturday", title: "A day in town, or the South Coast",
      note: "Another flexible day from the EDITION. The South Coast out and back is a long winter drive, about 6 hours of driving, so only go if the forecast is friendly.",
      times: [
        { when: "Day", what: "Shops, a harbor walk, or the South Coast if you want the longer drive." }
      ],
      items: ["stay-edition"]
    },
    {
      id: "jan3", date: "Jan 3, Sunday", title: "The Retreat at Blue Lagoon",
      note: "The EDITION to The Retreat is about 51 km and 51 min, approx. Check out of the hotel and spend the night in a Lava View Junior Suite.",
      times: [
        { when: "Day", what: "Drive to The Retreat at Blue Lagoon and check in for one night." }
      ],
      items: ["stay-retreat"]
    },
    {
      id: "jan4", date: "Jan 4, Monday", title: "Drop off the car, then a 4:55 PM flight home",
      note: "The Retreat to Keflavik is about 23 km and 25 min, approx. FI671 leaves at 4:55 PM and lands in Denver at 6:00 PM MT, 8 hours 5 minutes, nonstop.",
      times: [
        { when: "Afternoon", what: "Drive to Keflavik, drop off the car, and fly home on FI671 at 4:55 PM." }
      ],
      items: ["flight"]
    }
  ];

  var PLAN_IDS = ["flight", "car", "stay-domes", "stay-glass", "stay-edition", "stay-retreat"];

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function icon(name, extraClass) {
    return '<svg class="icon' + (extraClass ? " " + extraClass : "") + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#icon-' + name + '"></use></svg>';
  }
  function money(n) {
    return "$" + Math.round(Number(n) || 0).toLocaleString("en-US");
  }

  function applePoint(key) {
    var road = T.APPLE_COORDS && T.APPLE_COORDS[key];
    var place = T.PLACES && T.PLACES[key];
    if (road) return { lat: road.lat, lon: road.lon, name: (place && place.name) || key };
    if (place && place.lat != null) return { lat: place.lat, lon: place.lon, name: place.name || key };
    return null;
  }
  function findApplePoint(query, place) {
    var places = T.PLACES || {}, k;
    if (place) {
      for (k in places) {
        if (places[k] === place || (place.name && places[k].name === place.name) || (place.maps && places[k].maps === place.maps)) {
          return applePoint(k);
        }
      }
      if (place.lat != null) return { lat: place.lat, lon: place.lon, name: query || place.name };
    }
    if (query) {
      for (k in places) {
        if (places[k].maps === query || places[k].name === query) return applePoint(k);
      }
    }
    return null;
  }
  function appleDirectionsUrl(keys) {
    var pts = [];
    (keys || []).forEach(function (key) {
      var pt = applePoint(key);
      if (pt) pts.push(pt);
    });
    if (pts.length < 2) return "";
    var href = "https://maps.apple.com/directions?source=" + pts[0].lat + "," + pts[0].lon;
    var i;
    for (i = 1; i < pts.length - 1; i++) href += "&waypoint=" + pts[i].lat + "," + pts[i].lon;
    href += "&destination=" + pts[pts.length - 1].lat + "," + pts[pts.length - 1].lon + "&mode=driving";
    return href;
  }
  function appleRouteLinkHtml(routeId) {
    var route = T.APPLE_ROUTES && T.APPLE_ROUTES[routeId];
    if (!route) return "";
    var href = appleDirectionsUrl(route.keys);
    if (!href) return "";
    return '<a class="link-out map-route-link" href="' + href + '" target="_blank" rel="noopener">' +
      icon("navigation", "icon-inline") + " " + esc(route.label) + "</a>";
  }
  function mapLinkHtml(query, place) {
    var pt = findApplePoint(query, place);
    var name = (pt && pt.name) || query;
    if (!name && !pt) return "";
    var href;
    if (pt && pt.lat != null) href = "https://maps.apple.com/?ll=" + pt.lat + "," + pt.lon + "&q=" + encodeURIComponent(name || "Map");
    else if (query) href = "https://maps.apple.com/?q=" + encodeURIComponent(query);
    else return "";
    return '<a class="link-out" href="' + href + '" target="_blank" rel="noopener">' +
      icon("map-pin", "icon-inline") + " Apple Maps</a>";
  }
  function siteLinkHtml(url, label) {
    if (!url) return "";
    return '<a class="link-out" href="' + esc(url) + '" target="_blank" rel="noopener">' +
      icon("external-link", "icon-inline") + " " + esc(label || "Website") + "</a>";
  }

  function catalogItem(id) {
    var c = CATALOG_MAP[id];
    if (!c) return null;
    var placeKey = (T.PLACE_FOR && T.PLACE_FOR[id]) || id;
    var place = T.PLACES && T.PLACES[placeKey];
    return {
      id: id,
      title: c.title,
      photo: c.photo,
      status: "Planned",
      price: c.priceNote && (c.priceNote.indexOf("$") !== -1 || c.priceNote.indexOf("ISK") !== -1) ? "" : "",
      sub: c.priceNote || "",
      desc: c.desc,
      winter: c.winter,
      url: c.url,
      urlLabel: c.urlLabel || "Website",
      maps: c.maps,
      place: place
    };
  }
  function itemModel(id) {
    if (ITEMS[id]) {
      var it = ITEMS[id];
      var place = (it.place && T.PLACES && T.PLACES[it.place]) || null;
      return {
        id: it.id, title: it.title, photo: it.photo, status: it.status,
        price: it.price, sub: it.sub, desc: it.desc, winter: it.winter,
        url: it.url, urlLabel: it.urlLabel, maps: it.maps, place: place
      };
    }
    return catalogItem(id);
  }

  function cardHtml(model, opts) {
    opts = opts || {};
    if (!model) return "";
    var compact = opts.compact;
    var statusCls = model.status === "Book soon" ? "is-soon" : (model.status === "Planned" ? "is-planned" : "is-planned");
    var img = PHOTO_URLS[model.photo]
      ? '<img src="' + PHOTO_URLS[model.photo] + '" alt="' + esc(model.title) + '">'
      : '<div class="ph"></div>';
    var links = [];
    if (model.url) links.push(siteLinkHtml(model.url, model.urlLabel));
    if (model.maps || model.place) links.push(mapLinkHtml(model.maps, model.place));
    if (compact) {
      return '<div class="plan-item compact"><div></div><div>' +
        '<p class="lock ' + statusCls + '">' + esc(model.status) + "</p>" +
        "<h3>" + esc(model.title) + "</h3>" +
        "<p class='pitch-meta'>Your stay for this night. Already counted in the total.</p></div></div>";
    }
    return '<div class="plan-item">' + img + "<div>" +
      '<p class="lock ' + statusCls + '">' + esc(model.status) + "</p>" +
      "<h3>" + (model.url ? '<a class="card-title" href="' + esc(model.url) + '" target="_blank" rel="noopener">' + esc(model.title) + "</a>" : esc(model.title)) + "</h3>" +
      (model.price ? '<p class="price">' + model.price + "</p>" : "") +
      (model.sub ? '<p class="pitch-meta">' + esc(model.sub) + "</p>" : "") +
      (model.desc ? "<p>" + esc(model.desc) + "</p>" : "") +
      (model.winter ? '<p class="tip"><strong>Winter:</strong> ' + esc(model.winter) + "</p>" : "") +
      (links.length ? '<div class="links card-links">' + links.join("") + "</div>" : "") +
      "</div></div>";
  }

  function timesHtml(day) {
    if (!day.times || !day.times.length) return "";
    var rows = day.times.map(function (t) {
      return "<li><strong>" + esc(t.when) + "</strong> " + esc(t.what) + "</li>";
    }).join("");
    return '<ol class="day-times">' + rows + "</ol>";
  }
  function roadsHtml(day) {
    var meta = (T.DAY_ROADS || {})[day.id] || {};
    var links = (T.ROAD_LINKS || []).map(function (l) {
      return '<a class="road-chip" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
    }).join("");
    var bits = "";
    if (meta.drive) bits += "<p>" + esc(meta.drive) + "</p>";
    if (meta.risk) bits += "<p>" + esc(meta.risk) + "</p>";
    if (links) bits += '<div class="road-chips">' + links + "</div>";
    return bits ? '<div class="day-roads">' + bits + "</div>" : "";
  }

  function renderOverview() {
    var el = document.getElementById("overviewCards");
    if (!el) return;
    el.innerHTML = PLAN_IDS.map(function (id) { return cardHtml(itemModel(id)); }).join("");
  }

  function renderDays() {
    var root = document.getElementById("planDays");
    if (!root) return;
    var lastStay = "";
    var html = "";
    DAYS.forEach(function (day) {
      html += '<article class="day-block" id="day-' + day.id + '">';
      html += '<p class="when">' + esc(day.date) + "</p><h2>" + esc(day.title) + "</h2>";
      if (day.note) html += '<p class="daylight-note">' + esc(day.note) + "</p>";
      html += timesHtml(day);
      html += roadsHtml(day);
      day.items.forEach(function (id) {
        var model = itemModel(id);
        if (id.indexOf("stay-") === 0 && id === lastStay) html += cardHtml(model, { compact: true });
        else html += cardHtml(model);
        if (id.indexOf("stay-") === 0) lastStay = id;
        if (id === "flight" && day.id === "dec28") lastStay = "";
      });
      html += '<div class="day-meta">';
      var drive = appleRouteLinkHtml(day.id);
      if (drive) html += '<div class="map-route-links">' + drive + "</div>";
      html += dayMapHtml(day.id);
      html += "</div></article>";
    });
    root.innerHTML = html;
    var full = document.getElementById("fullRouteLinks");
    if (full) full.innerHTML = appleRouteLinkHtml("full");
  }

  function renderLogistics() {
    var el = document.getElementById("logisticsBody");
    if (!el) return;
    el.innerHTML =
      "<h3>The working plan</h3>" +
      "<ul class=\"logistics-list\">" +
      "<li><strong>Flights:</strong> Icelandair Saga Premium, $6,062 for two, FI670 and FI671, Dec 28 to Jan 4.</li>" +
      "<li><strong>Car:</strong> Blue Car Rental Dacia Duster 4x4, $719 for six days, Dec 29 to Jan 4.</li>" +
      "<li><strong>Dec 29 stay:</strong> Golden Circle Domes, $1,371. Breakfast is not included. Full kitchenette, plus Thrastalundur on site.</li>" +
      "<li><strong>Dec 30 stay:</strong> Glass Cottages, Cottage Blar, $559. Book soon. Free cancellation ends Nov 30, 2026, once you book. No on-site food. Kitchen stocked with coffee, tea, and oil.</li>" +
      "<li><strong>Dec 31 to Jan 3:</strong> The Reykjavik EDITION King Room, $4,023 Stay Longer Flexible Member.</li>" +
      "<li><strong>Jan 3:</strong> The Retreat at Blue Lagoon, Lava View Junior Suite, about $2,484.</li>" +
      "<li><strong>Lodging subtotal:</strong> $8,437. <strong>Trip total:</strong> $15,218 for Saga Premium and the Duster.</li>" +
      "</ul>" +
      "<h3>Other cash options</h3>" +
      "<ul class=\"logistics-list\">" +
      "<li>Icelandair Economy on the same flights is $4,138 for two, which brings the Duster package to $13,294.</li>" +
      "<li>A Land Rover Defender 110 is about $2,148 estimated for six days. With Saga that is about $16,647, and with Economy about $14,723.</li>" +
      "<li>Other EDITION King cash rates for the three nights: Superior King $4,283, standard Flexible Member $4,583, or Prepay Non-refundable $3,933 (lodging subtotal $8,347).</li>" +
      "</ul>" +
      "<p class=\"sub\">Hot springs and dinners are not in the trip total. Reykjabod and Sky Lagoon prices for two are in the hot springs section. Froken Selfoss is about $160 to $225 for two with drinks. Midgard Restaurant is 26,000 ISK (about $208) for two on the Glass Cottages 3-course partner offer, before drinks.</p>";

    var pack = document.getElementById("packBlock");
    if (pack) {
      var items = (T.PACK_BASE || []).concat([
        { id: "swimsuit", label: "A swimsuit." },
        { id: "flipflops", label: "Flip-flops for wet decks." },
        { id: "scraper", label: "An ice scraper for the car." },
        { id: "nye-outfit", label: "A warm outfit for New Year's Eve." }
      ]);
      pack.innerHTML = "<h2>What to pack</h2><ul class=\"pack-list\">" +
        items.map(function (it) { return "<li>" + esc(it.label) + "</li>"; }).join("") +
        "</ul>";
    }

    var ready = document.getElementById("readyList");
    if (ready) {
      ready.innerHTML = PLAN_IDS.map(function (id) {
        var m = itemModel(id);
        if (!m) return "";
        var book = (T.BOOKING || {})[id];
        var due = book ? '<br><em class="deadline">' + esc(book.text) + "</em>" : "";
        var mark = m.status === "Book soon" ? "Book soon. " : "Not booked. ";
        var link = m.url ? siteLinkHtml(m.url, m.urlLabel) : "<span>No official booking page for this one.</span>";
        return '<div class="ready-item"><span><strong>' + esc(m.title) + "</strong><br>" + mark + link + due + "</span></div>";
      }).join("");
    }
  }

  /* ---------- maps ---------- */
  var routesData = null, routesPromise = null;
  var overviewMap = null, overviewActive = false, dayMaps = {}, fullMap = null, mapEpoch = 0;

  function uniqueKeys(arr) {
    var out = [], seen = {};
    arr.forEach(function (k) { if (k && !seen[k]) { seen[k] = true; out.push(k); } });
    return out;
  }
  function placeKeyFor(id) {
    var map = T.PLACE_FOR || {};
    if (map[id]) return map[id];
    if (ITEMS[id] && ITEMS[id].place) return ITEMS[id].place;
    return "";
  }
  function expandPlaces(id) {
    var pk = placeKeyFor(id);
    return pk ? [pk] : [];
  }
  function planPlaceIds() {
    return ["flight", "stay-domes", "stay-glass", "stay-edition", "stay-retreat", "reykjabod", "mjolkurbuid", "froken", "kerid", "midgard"];
  }
  function placesForDay(dayId) {
    var map = {
      dec29: ["kef", "reykjabod", "selfoss", "domes", "froken"],
      dec30: ["domes", "kerid", "glass_cottages", "midgard"],
      dec31: ["glass_cottages", "edition"],
      jan3: ["edition", "retreat"],
      jan4: ["retreat", "kef"]
    };
    return map[dayId] || [];
  }
    function loadRoutes() {
    if (routesData) return Promise.resolve(routesData);
    if (routesPromise) return routesPromise;
    routesPromise = fetch(T.ROUTES_URL).then(function (r) {
      if (!r.ok) throw new Error("routes " + r.status);
      return r.json();
    }).then(function (data) { routesData = data; return data; }).catch(function () {
      routesPromise = null;
      return { type: "FeatureCollection", features: [] };
    });
    return routesPromise;
  }
  function findSegment(a, b) {
    if (!routesData || !routesData.features) return null;
    var i, f, w, id;
    for (i = 0; i < routesData.features.length; i++) {
      f = routesData.features[i];
      w = (f.properties && f.properties.waypoints) || [];
      id = f.properties && f.properties.id;
      if (id === a + "_" + b) return f;
      if (w.length >= 2 && w[0] === a && w[w.length - 1] === b) return f;
    }
    return null;
  }
  function stitchLegs(keys) {
    var legs = [], i, seg;
    for (i = 0; i < keys.length - 1; i++) {
      if (keys[i] === keys[i + 1]) continue;
      seg = findSegment(keys[i], keys[i + 1]);
      if (seg) legs.push(seg);
    }
    return legs;
  }
  function overviewKeys() { return uniqueKeys((T.PREVIEW_PLACES || []).slice()); }
  function overviewLegs() {
    var byId = {};
    if (routesData && routesData.features) {
      routesData.features.forEach(function (f) {
        if (f.properties && f.properties.id) byId[f.properties.id] = f;
      });
    }
    return (T.PREVIEW_ROUTES || []).map(function (id) { return byId[id]; }).filter(Boolean);
  }
    function cartoLayer() {
    return L.tileLayer(T.TILE_URL, { attribution: T.TILE_ATTR, subdomains: "abc", maxZoom: 19 });
  }
  function markerIcon() {
    return L.divIcon({ className: "trip-pin", html: "<span></span>", iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [0, -10] });
  }
  function popupHtml(place) {
    if (!place) return "";
    var photo = PHOTO_URLS[place.photo] || "";
    var img = photo ? '<img src="' + photo + '" alt="' + esc(place.name) + '">' : "";
    var links = [];
    if (place.url) links.push(siteLinkHtml(place.url, place.urlLabel || "Website"));
    if (place.maps || place.lat != null) links.push(mapLinkHtml(place.maps || place.name, place));
    return '<div class="map-pop">' + img + "<strong>" + esc(place.name) + "</strong>" +
      (links.length ? '<div class="map-pop-links">' + links.join(" ") + "</div>" : "") + "</div>";
  }
  function addPins(map, keys) {
    var bounds = [];
    uniqueKeys(keys).forEach(function (k) {
      var p = T.PLACES[k];
      if (!p) return;
      var m = L.marker([p.lat, p.lon], { icon: markerIcon() }).addTo(map);
      m.bindPopup(popupHtml(p), { maxWidth: 240, className: "trip-popup" });
      bounds.push([p.lat, p.lon]);
    });
    return bounds;
  }
  function addLegs(map, legs) {
    legs.forEach(function (f) {
      if (!f.geometry || !f.geometry.coordinates) return;
      var latlngs = f.geometry.coordinates.map(function (c) { return [c[1], c[0]]; });
      L.polyline(latlngs, { color: "#7dffa8", weight: 3, opacity: 0.85 }).addTo(map);
    });
  }
  function fitOrCenter(map, bounds) {
    if (bounds && bounds.length > 1) map.fitBounds(bounds, { padding: [24, 24] });
    else if (bounds && bounds.length === 1) map.setView(bounds[0], 11);
    else map.setView([64.14, -21.9], 7);
  }
  function mapAlive(map, epoch) {
    try { return !!(map && (epoch === undefined || epoch === mapEpoch) && map._mapPane && map.getContainer && map.getContainer().isConnected); }
    catch (e) { return false; }
  }
  function laterInvalidate(map, epoch) {
    setTimeout(function () { try { if (mapAlive(map, epoch)) map.invalidateSize(); } catch (e) {} }, 80);
  }
  function destroyMap(map) {
    if (!map) return;
    try { if (map.stop) map.stop(); } catch (e) {}
    try { if (map.off) map.off(); } catch (e) {}
    var el = null;
    try { el = map.getContainer(); } catch (e) {}
    try { map.remove(); } catch (e) {}
    if (el) {
      try { delete el._leaflet_id; } catch (err) { el._leaflet_id = undefined; }
      try { el.innerHTML = ""; } catch (e) {}
    }
  }
  function destroyDayMaps() {
    Object.keys(dayMaps).forEach(function (k) { destroyMap(dayMaps[k]); });
    dayMaps = {};
  }
  function setOverviewInteractive(on) {
    overviewActive = !!on;
    if (!overviewMap) return;
    if (on) {
      overviewMap.dragging.enable();
      overviewMap.scrollWheelZoom.enable();
      overviewMap.touchZoom.enable();
      overviewMap.doubleClickZoom.enable();
    } else {
      overviewMap.dragging.disable();
      overviewMap.scrollWheelZoom.disable();
      overviewMap.touchZoom.disable();
      overviewMap.doubleClickZoom.disable();
    }
    var btn = document.getElementById("overviewActivate");
    if (btn) btn.hidden = !!on;
    var wrap = document.getElementById("overviewMapWrap");
    if (wrap) wrap.classList.toggle("is-active", !!on);
  }
  function drawOverview(epoch) {
    var el = document.getElementById("overviewMap");
    if (!el || typeof L === "undefined" || !el.isConnected) return;
    if (epoch !== undefined && epoch !== mapEpoch) return;
    if (overviewMap) { destroyMap(overviewMap); overviewMap = null; }
    overviewMap = L.map(el, {
      zoomControl: true, attributionControl: true, dragging: false,
      scrollWheelZoom: false, touchZoom: false, doubleClickZoom: false, boxZoom: false, keyboard: false
    });
    cartoLayer().addTo(overviewMap);
    var keys = overviewKeys();
    var bounds = addPins(overviewMap, keys);
    addLegs(overviewMap, overviewLegs());
    fitOrCenter(overviewMap, bounds);
    setOverviewInteractive(false);
    laterInvalidate(overviewMap, epoch);
  }
  function drawDayMap(dayId, el, epoch) {
    if (!el || typeof L === "undefined" || !el.isConnected) return;
    if (epoch !== undefined && epoch !== mapEpoch) return;
    if (dayMaps[dayId]) { destroyMap(dayMaps[dayId]); dayMaps[dayId] = null; }
    var map = L.map(el, {
      zoomControl: false, attributionControl: false, dragging: false,
      scrollWheelZoom: false, touchZoom: false, doubleClickZoom: false, boxZoom: false, keyboard: false, tap: false
    });
    cartoLayer().addTo(map);
    var keys = placesForDay(dayId);
    if (!keys.length) keys = ["edition"];
    var bounds = addPins(map, keys);
    addLegs(map, stitchLegs(keys));
    fitOrCenter(map, bounds);
    dayMaps[dayId] = map;
    laterInvalidate(map, epoch);
  }
  function initDayMaps() {
    destroyDayMaps();
    var epoch = mapEpoch;
    if (!document.querySelector("[data-day-map]")) return;
    loadRoutes().then(function () {
      if (epoch !== mapEpoch) return;
      document.querySelectorAll("[data-day-map]").forEach(function (el) {
        if (epoch !== mapEpoch || !el.isConnected) return;
        drawDayMap(el.getAttribute("data-day-map"), el, epoch);
      });
    });
  }
  function initOverviewMap() {
    var epoch = mapEpoch;
    loadRoutes().then(function () { if (epoch !== mapEpoch) return; drawOverview(epoch); });
  }
  function dayMapHtml(dayId) {
    if (!placesForDay(dayId).length) return "";
    return '<button type="button" class="day-map-btn" data-open-day-map="' + esc(dayId) + '" aria-label="Open the day map">' +
      '<div class="day-map" id="day-map-' + esc(dayId) + '" data-day-map="' + esc(dayId) + '"></div>' +
      '<span class="day-map-hint">Tap for a bigger map</span></button>';
  }
  function openDayMap(dayId) {
    var layer = document.getElementById("mapLayer");
    var host = document.getElementById("mapLayerMap");
    var title = document.getElementById("mapLayerTitle");
    if (!layer || !host || typeof L === "undefined") return;
    var day = DAYS.filter(function (d) { return d.id === dayId; })[0];
    if (title) title.textContent = day ? ("Map for " + day.date) : "Map";
    layer.hidden = false;
    document.body.classList.add("map-open");
    if (fullMap) { destroyMap(fullMap); fullMap = null; }
    var epoch = mapEpoch;
    loadRoutes().then(function () {
      if (epoch !== mapEpoch || !host.isConnected) return;
      if (fullMap) { destroyMap(fullMap); fullMap = null; }
      fullMap = L.map(host, {
        zoomControl: true, attributionControl: true, dragging: true,
        scrollWheelZoom: true, touchZoom: true, doubleClickZoom: true
      });
      cartoLayer().addTo(fullMap);
      var keys = placesForDay(dayId);
      var bounds = addPins(fullMap, keys);
      addLegs(fullMap, stitchLegs(keys));
      fitOrCenter(fullMap, bounds);
      laterInvalidate(fullMap, epoch);
    });
  }
  function closeMapLayer() {
    var layer = document.getElementById("mapLayer");
    if (layer) layer.hidden = true;
    document.body.classList.remove("map-open");
    if (fullMap) { destroyMap(fullMap); fullMap = null; }
  }

  /* ---------- weather / countdown ---------- */
  var weatherCache = null;
  function formatSpan(mins) {
    mins = Math.round(mins || 0);
    if (mins <= 0) return "";
    var h = Math.floor(mins / 60), m = mins % 60;
    if (h && m) return h + " hr" + (h === 1 ? "" : "s") + " " + m + " min";
    if (h) return h + " hr" + (h === 1 ? "" : "s");
    return m + " min";
  }
  function windLabel(deg) {
    var dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    var i = Math.round(((deg % 360) + 360) % 360 / 45) % 8;
    return dirs[i];
  }
  function formatClock(iso) {
    if (!iso) return "";
    var m = /T(\d{2}):(\d{2})/.exec(iso);
    if (!m) return "";
    var h = Number(m[1]), min = m[2];
    var ampm = h < 12 ? "AM" : "PM";
    var h12 = h % 12;
    if (h12 === 0) h12 = 12;
    return h12 + ":" + min + " " + ampm;
  }
  function formatDaylightSec(sec) { return formatSpan(Math.round((sec || 0) / 60)); }
  function renderCountdown() {
    var el = document.getElementById("countdown");
    if (!el) return;
    var target = new Date(T.DEPART).getTime();
    var diff = target - Date.now();
    var mins = Math.floor(Math.max(0, diff) / 60000);
    var days = Math.floor(mins / (60 * 24));
    var hours = Math.floor((mins - days * 60 * 24) / 60);
    var minutes = mins - days * 60 * 24 - hours * 60;
    if (diff <= 0) { el.textContent = "The Dec 28 departure time has passed."; return; }
    var parts = [];
    if (days) parts.push(days + " day" + (days === 1 ? "" : "s"));
    parts.push(hours + " hr" + (hours === 1 ? "" : "s"));
    parts.push(minutes + " min");
    el.textContent = parts.join(", ") + " until departure at 3:40 PM MT, Dec 28.";
  }
  function renderWeather() {
    var el = document.getElementById("weather");
    if (!el) return;
    if (!weatherCache) { el.textContent = "Reykjavik weather is unavailable right now."; return; }
    var w = weatherCache;
    var c = Math.round(w.temp);
    var f = Math.round(w.temp * 9 / 5 + 32);
    var line = "Now in Reykjavik: " + c + " C / " + f + " F, wind " + Math.round(w.wind) + " km/h " + w.dir + ".";
    if (w.rise && w.set) {
      line += " Sunrise " + w.rise + ", sunset " + w.set;
      if (w.daylight) line += ", " + w.daylight + " of daylight";
      line += ".";
    }
    el.textContent = line;
  }
  function loadWeather() {
    var el = document.getElementById("weather");
    if (el && !weatherCache) el.textContent = "Loading Reykjavik weather.";
    fetch(T.WEATHER_URL).then(function (r) {
      if (!r.ok) throw new Error("wx");
      return r.json();
    }).then(function (data) {
      var cur = data.current || {};
      var daily = data.daily || {};
      weatherCache = {
        temp: cur.temperature_2m,
        wind: cur.wind_speed_10m,
        dir: windLabel(cur.wind_direction_10m || 0),
        rise: formatClock(daily.sunrise && daily.sunrise[0]),
        set: formatClock(daily.sunset && daily.sunset[0]),
        daylight: formatDaylightSec(daily.daylight_duration && daily.daylight_duration[0])
      };
      renderWeather();
    }).catch(function () {
      if (el && !weatherCache) el.textContent = "Reykjavik weather is unavailable right now.";
    });
  }

  function bind() {
    document.addEventListener("click", function (e) {
      if (e.target.closest("#closeMapLayer")) { closeMapLayer(); return; }
      var dayMapBtn = e.target.closest("[data-open-day-map]");
      if (dayMapBtn) { openDayMap(dayMapBtn.getAttribute("data-open-day-map")); return; }
      if (e.target.closest("#overviewActivate") || e.target.closest("#overviewMapWrap:not(.is-active)")) {
        setOverviewInteractive(true);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMapLayer();
    });
  }

  function init() {
    var chip = document.getElementById("chipTotal");
    if (chip) chip.textContent = money(PLAN_TOTAL);
    renderOverview();
    renderDays();
    renderLogistics();
    bind();
    renderCountdown();
    loadWeather();
    setInterval(renderCountdown, 30000);
    mapEpoch += 1;
    initOverviewMap();
    initDayMaps();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
