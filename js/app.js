/* Scott & Jerm's Iceland */
(function () {
  "use strict";
  var D = window.ICELAND_DATA;
  var PEOPLE = D.PEOPLE;
  var TRIP_NIGHTS = D.TRIP_NIGHTS;
  var BL = D.BL;
  var FLIGHT = D.FLIGHT;
  /* Verified Google Flights quotes for 2 adults, Icelandair nonstop FI670/FI671,
     Dec 28, 2026 to Jan 4, 2027. These are cash totals for two, not per-person splits. */
  var FLIGHT_FARES = {
    economy: { two: FLIGHT.economy, est: false, label: "Economy" },
    standard: { two: FLIGHT.economy, est: false, label: "Economy" },
    saga: { two: FLIGHT.saga, est: false, label: "Saga Premium" }
  };
  var PANO = D.PANO;
  var BUUBBLE_RATE = D.BUUBBLE_RATE;
  var SUPERIOR_RATE = D.SUPERIOR_RATE;
  var DOMES_RATE = D.DOMES_RATE;
  var GLASS_RATE = D.GLASS_RATE;
  var EDITION_RATES = D.EDITION_RATES;
  var RETREAT_RATE = D.RETREAT_RATE;
  var STORAGE_KEY = D.STORAGE_KEY;
  var CATALOG = D.CATALOG;
  var CARS = D.CARS;
  var VIDEOS = D.VIDEOS;
  var PITCHES = D.PITCHES;
  var SHORT_NAMES = D.SHORT_NAMES;
  var CAT_LABEL = D.CAT_LABEL;
  var PHOTO_URLS = D.PHOTO_URLS;
  var PHOTO_LABELS = D.PHOTO_LABELS;

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }
  function icon(name, extraClass) {
    return '<svg class="icon' + (extraClass ? " " + extraClass : "") + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#icon-' + name + '"></use></svg>';
  }

  var PROVIDER_NAMES = {
    "icelandair.com": "Icelandair",
    "editionhotels.com": "EDITION",
    "marriott.com": "Marriott",
    "goldencircledomes.is": "Golden Circle Domes",
    "godo.is": "Golden Circle Domes",
    "property.godo.is": "Golden Circle Domes",
    "glasscottages.com": "Glass Cottages",
    "iceland.org": "The Lava Tunnel",
    "thelavatunnel.is": "The Lava Tunnel",
    "reykjabod.is": "Reykjabod",
    "mjolkurbuid.is": "Mjolkurbuid",
    "sandholt.is": "Sandholt",
    "keridcratericeland.is": "Kerid",
    "bluelagoon.com": "Blue Lagoon",
    "ishestar.is": "Ishestar",
    "skylagoon.com": "Sky Lagoon",
    "bluecarrental.is": "Blue Car Rental",
    "hertz.is": "Hertz",
    "panoramaglasslodge.com": "Panorama Glass Lodge",
    "buubble.com": "Buubble",
    "auroraigloo.is": "Aurora Igloo",
    "hotelhofn.is": "Hotel Hofn",
    "glacieradventure.is": "Glacier Adventure",
    "katlatrack.is": "Katla Track",
    "dive.is": "Dive.is",
    "fontana.is": "Fontana",
    "fridheimar.is": "Fridheimar",
    "hvammsvik.com": "Hvammsvik",
    "harpa.is": "Harpa",
    "thingvellir.is": "Thingvellir",
    "south.is": "South Iceland",
    "visitreykjavik.is": "Visit Reykjavik",
    "visiticeland.com": "Visit Iceland",
    "visitvik.is": "Visit Vik",
    "visitvatnajokull.is": "Visit Vatnajokull",
    "vatnajokulsthjodgardur.is": "Vatnajokull National Park",
    "guidetoiceland.is": "Guide to Iceland",
    "hallgrimskirkja.is": "Hallgrimskirkja",
    "bbp.is": "Baejarins Beztu",
    "dillrestaurant.is": "Dill",
    "grillmarkadurinn.is": "Grillmarkadurinn",
    "hafnartorg.is": "Hafnartorg",
    "kolaportid.is": "Kolaportid",
    "rammagerdin.com": "Rammagerdin",
    "re.is": "Reykjavik Excursions",
    "ruv.is": "RUV",
    "safetravel.is": "SafeTravel",
    "umferdin.is": "Umferdin",
    "66north.com": "66 North",
    "vedur.is": "Vedur"
  };

  function hostOf(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
    } catch (e) { return ""; }
  }

  function providerName(url) {
    var host = hostOf(url);
    if (!host) return "";
    if (PROVIDER_NAMES[host]) return PROVIDER_NAMES[host];
    var parts = host.split(".");
    var i;
    for (i = 1; i < parts.length - 1; i++) {
      var suffix = parts.slice(i).join(".");
      if (PROVIDER_NAMES[suffix]) return PROVIDER_NAMES[suffix];
    }
    return "";
  }

  function siteLinkLabel(url) {
    var name = providerName(url);
    return name ? name + " website" : "Website";
  }

  function siteLinkHtml(url) {
    if (!url) return "";
    return '<a class="link-out" href="' + esc(url) + '" target="_blank" rel="noopener">' +
      icon("external-link", "icon-inline") + " " + esc(siteLinkLabel(url)) + "</a>";
  }

  function mapLinkHtml(query) {
    if (!query) return "";
    var href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
    return '<a class="link-out" href="' + href + '" target="_blank" rel="noopener">' +
      icon("map-pin", "icon-inline") + " Map</a>";
  }

  function money(n) {
    n = Math.round(Number(n) || 0);
    return "$" + n.toLocaleString("en-US");
  }
  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
  function showToast(msg) {
    var el = document.getElementById("toast");
    if (!el) return;
    if (!el.hidden) { el.hidden = true; void el.offsetWidth; }
    el.hidden = false;
    el.textContent = msg;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { el.hidden = true; }, 2800);
  }

  window.__imgFail = function (img) { img.classList.add("is-fail"); };

  var GROUP_LABEL = {
    "flight-cabin": "the flight",
    "edition-room": "the Reykjavik hotel",
    "car": "the rental car"
  };
  var CATALOG_GROUP = { jokulsarlon: "ice-plan", katla: "ice-plan" };

  var FOLDED = { jokulsarlon: true, katla: true };
  var LEGACY_TIER = {
    "flight-economy": ["flight", "standard"],
    "flight-business": ["flight", "saga"],
    "stay-edition-suite": ["stay-edition", "suite"],
    "stay-edition-superior": ["stay-edition", "superior"],
    "stay-panorama-standard": ["sky-cabin", "pano-standard"],
    "stay-panorama-premium": ["sky-cabin", "pano-premium"],
    "stay-buubble": ["sky-cabin", "buubble"],
    "stay-aurora": ["sky-cabin", "aurora"],
    "car-none": ["car", "none"],
    "car-budget": ["car", "budget"],
    "car-mid": ["car", "mid"],
    "car-premium": ["car", "premium"],
    jokulsarlon: ["ice-plan", "jokulsarlon"],
    katla: ["ice-plan", "katla"]
  };
  var DEFAULT_TIERS = { flight: "saga", "stay-edition": "flex", car: "mid" };
  var PLANNED_IDS = ["flight", "stay-domes", "stay-glass", "stay-edition", "stay-retreat", "car"];
  var PLANNED_STOPS = ["sandholt", "lava_tunnel", "reykjabod", "mjolkurbuid", "kerid"];

  function coreCards() {
    return [
      { id: "flight", kind: "flight", day: "Dec 28 to Jan 4", title: "Icelandair, DEN to KEF",
        defaultTier: "saga",
        desc: "Icelandair FI670 leaves Denver at 3:40 PM MT on Dec 28 and lands at Keflavik at 6:05 AM on Dec 29. The outbound flight is 7 hours 25 minutes. The return is FI671 on Jan 4, leaving Keflavik at 4:55 PM and landing in Denver at 6:00 PM MT, 8 hours 5 minutes. Both flights are nonstop. Prices below are verified Google Flights cash totals for two adults.",
        winter: "In late December, Icelandair is the only nonstop from Denver to Keflavik. You sleep on the outbound flight and drive south after you land.",
        url: "https://www.icelandair.com/flights/from-denver-to-reykjavik/", urlLabel: "Book it",
        maps: "Denver International Airport",
        tiers: [
          { id: "saga", label: "Saga Premium", title: "Icelandair, Saga Premium", rec: true, photoKey: "saga_seat",
            credit: "Photo: Simply Aviation, Wikimedia Commons.",
            pitch: "Saga Premium in the front cabin on the same overnight flight. A wider seat, meals, and priority. Total for two, verified.",
            sub: "Verified Google Flights cash total for two adults, FI670 and FI671, Dec 28 to Jan 4. One checked bag, 32 kg / 70 lb, meals, and priority.",
            two: FLIGHT_FARES.saga.two, est: false },
          { id: "economy", label: "Economy", title: "Icelandair, Economy", photoKey: "economy_aisle",
            credit: "Photo: Simply Aviation, Wikimedia Commons.",
            pitch: "Economy on the same overnight flight. Depart Denver at 3:40 PM, land at Keflavik at 6:05 AM. Total for two, verified.",
            sub: "Verified Google Flights cash total for two adults, FI670 and FI671, Dec 28 to Jan 4.",
            two: FLIGHT_FARES.economy.two, est: false }
        ] },
      { id: "stay-domes", kind: "stay", day: "Dec 29", title: "Golden Circle Domes, one night",
        pitch: "A deluxe dome at Thrastarskogur, near Selfoss, after the daytime stops. Double bed, private bathroom, wood fireplace, and a kitchen.",
        desc: "Contactless self check-in from 3:00 PM. There is no front desk, so there is nowhere to leave bags early if you land at 6:05 AM. The $1,371 total is the live holiday rate of 1,250 euros for Dec 29. The booking page did not show a separate tax or cancellation breakdown.",
        winter: "This is peak holiday pricing. Off-peak nights later in the week were much lower when checked.",
        photoKey: "domes", rec: true,
        url: "https://property.godo.is/booking2.php?propid=175431&cur=USD", urlLabel: "Book it",
        maps: "Golden Circle Domes Thrastalundur Selfoss",
        credit: "Official photo, Golden Circle Domes.",
        two: DOMES_RATE, est: false, sub: "Live cash rate for Dec 29, total for the dome." },
      { id: "stay-glass", kind: "stay", day: "Dec 30", title: "Glass Cottages, Cottage Blar, one night",
        pitch: "Cottage Blar, near Hella, about 50 min from the domes. One double bed, a glass wall, and a private hot tub.",
        desc: "The live rate was $559, and this was the last cottage left when checked. Once you book, free cancellation ends Nov 30, 2026.",
        winter: "The cottage sits in lava fields. Dress for wind and ice if you use the hot tub.",
        photoKey: "glass_cottages", rec: true, bookSoon: true,
        url: "https://glasscottages.com/", urlLabel: "Book it",
        maps: "Glass Cottages Klettamork Hella",
        credit: "Official photo, Glass Cottages Iceland.",
        two: GLASS_RATE, est: false, sub: "Live cash rate for Dec 30, last cottage left when checked. Free cancellation ends Nov 30, 2026, once you book." },
      { id: "stay-edition", kind: "stay", day: "Dec 31 to Jan 3", title: "The Reykjavik EDITION, three nights",
        defaultTier: "flex",
        desc: "Check in Dec 31, check out Jan 3. A King Room with a courtyard view, one king bed. Harbor-side, next to Harpa. Cash rates only, all taxes and the destination fee included.",
        winter: "This covers New Year's Eve in Reykjavik. Sidewalks can be icy.",
        url: "https://www.marriott.com/en-us/hotels/rekeb-the-reykjavik-edition/overview/", urlLabel: "Book it",
        maps: "The Reykjavik EDITION",
        tiers: [
          { id: "flex", label: "Flexible Member", title: "EDITION King Room, Stay Longer Flexible Member", rec: true, photoKey: "edition_room",
            credit: "Official photo, The Reykjavik EDITION.",
            pitch: "A King Room for three nights at the Stay Longer on Us Flexible Member rate. Total for the room, all taxes included.",
            two: EDITION_RATES.flex, est: false, sub: "Verified Marriott cash total for three nights, all taxes and the destination fee included." },
          { id: "superior", label: "Superior King", title: "EDITION Superior King, three nights", photoKey: "edition_superior",
            credit: "Official photo, The Reykjavik EDITION.",
            pitch: "A Superior King, high floor, for three nights. Total for the room, all taxes included.",
            two: EDITION_RATES.superior, est: false, sub: "Verified Marriott cash total for three nights, all taxes included." },
          { id: "standard", label: "Standard Flexible", title: "EDITION King Room, standard Flexible Member", photoKey: "edition_room",
            credit: "Official photo, The Reykjavik EDITION.",
            pitch: "The standard Flexible Member King rate for three nights, all taxes included.",
            two: EDITION_RATES.standard, est: false, sub: "Verified Marriott cash total for three nights, all taxes included." },
          { id: "nonref", label: "Non-refundable", title: "EDITION King Room, Prepay Non-refundable", photoKey: "edition_room",
            credit: "Official photo, The Reykjavik EDITION.",
            pitch: "The Prepay Non-refundable Member King rate for three nights. Lower cash total, no free cancellation.",
            two: EDITION_RATES.nonref, est: false, sub: "Verified Marriott cash total for three nights, all taxes included. Non-refundable." }
        ] },
      { id: "stay-retreat", kind: "stay", day: "Jan 3", title: "The Retreat at Blue Lagoon, one night",
        pitch: "A Lava View Junior Suite on Jan 3, after the EDITION. Lagoon access is included.",
        desc: "One night in a Lava View Junior Suite. The estimate is $2,484, from 310,000 ISK at 124.785 ISK per USD. Eight suites were left when checked. VAT status was unconfirmed.",
        winter: "The lagoon stays about 98 to 104 F. Outdoor temperatures will be much lower. The drive from the EDITION is about 51 min.",
        photoKey: "retreat_suite", rec: true,
        url: "https://www.bluelagoon.com/accommodation/retreat-hotel", urlLabel: "Book it",
        maps: "The Retreat at Blue Lagoon",
        credit: "Official photo, Blue Lagoon.",
        two: RETREAT_RATE, est: true, sub: "Estimate from 310,000 ISK, total for the suite. Eight suites left when checked." },
      { id: "car", kind: "car", day: "Dec 29 to Jan 4", title: "The rental car",
        defaultTier: "mid",
        winter: "Winter tires are standard on these desks from Nov 1 to April 15. Studded tires help on ice, and often need a request. Pickup is at Keflavik after the 6:05 AM landing. Drop-off is at Keflavik before the 4:55 PM flight on Jan 4.",
        tiers: [
          { id: "mid", label: "Duster 4x4", title: "Dacia Duster 4x4", rec: true, photoKey: "car_duster",
            pitch: "A manual 4x4 compact SUV from Blue Car Rental, a common Iceland winter rental. Six days, Dec 29 to Jan 4.",
            url: "https://www.bluecarrental.is/our-cars/dacia-duster/", urlLabel: "Book it", maps: "Blue Car Rental Keflavik Airport",
            credit: "Photo: (G)jabz, Wikimedia Commons.",
            two: CARS.mid.trip, est: false, sub: money(CARS.mid.trip) + " total for 6 days, including Full Cover. Live Blue Car Rental quote." },
          { id: "premium", label: "Defender 110", title: "Land Rover Defender 110", photoKey: "car_defender",
            pitch: "A Land Rover Defender 110, a 5-door automatic 4x4, for the same 6 days. This is a from-rate, not a locked holiday quote.",
            url: "https://www.bluecarrental.is/our-cars/land-rover-defender/", urlLabel: "Book it",
            maps: "Blue Car Rental Keflavik Airport",
            credit: "Photo: DestinationFearFan, Wikimedia Commons.",
            two: CARS.premium.trip, est: true, sub: "est. " + money(CARS.premium.trip) + " for 6 days, including Full Cover. Holiday week can price above this." },
          { id: "none", label: "No car", title: "No rental car", photoKey: "car_none",
            pitch: "No rental car. This plan needs a car for the south-coast nights and the Dec 29 stops.",
            maps: "Reykjavik city center",
            two: 0, est: false, sub: "Zero on the car line, on purpose. The planned route is built around a rental car." }
        ] },
      { id: "food-budget", kind: "food", day: "Most days", title: "A daily food budget",
        pitch: "A daily food budget for meals that are not already in the lodging, flight, and car totals.",
        desc: "Default is $300 a day for two, for 6 days. Restaurant cards are priced separately. Edit the daily rate in Compare.",
        winter: "Some cafes may be closed on January 1. A greenhouse, a food hall, or a hotel restaurant may still be open.",
        photoKey: "mjolkurbuid", rec: false,
        url: "", urlLabel: "", maps: "",
        priceFn: function (ctx) {
          var two = ctx.foodRate * ctx.foodDays * PEOPLE;
          return { two: two, est: true, sub: money(ctx.foodRate * PEOPLE) + " a day for two, times " + ctx.foodDays + " days. Optional, and not in the headline trip total until you both say yes." };
        } }
    ];
  }

  function catalogToCard(c) {
    return {
      id: c.id,
      kind: c.cat,
      day: c.day,
      title: c.title,
      pitch: PITCHES[c.id] || c.title,
      desc: c.desc,
      winter: c.winter,
      photoKey: c.photoKey || c.photo,
      rec: c.rec,
      url: c.url,
      urlLabel: c.urlLabel,
      url2: c.url2,
      url2Label: c.url2Label,
      maps: c.maps,
      priceNote: c.priceNote,
      bookSoon: c.bookSoon,
      source: c
    };
  }

  var DECK = [];
  var DECK_MAP = {};
  function buildDeck() {
    DECK = coreCards().concat(CATALOG.filter(function (c) { return !FOLDED[c.id]; }).map(catalogToCard));
    DECK_MAP = {};
    DECK.forEach(function (c) { DECK_MAP[c.id] = c; });
  }

  var DAYS = [
    { id: "dec28", date: "Dec 28, Monday", title: "Overnight flight from Denver at 3:40 PM MT",
      slots: [{ key: "flight", label: "the flight", ids: ["flight"] }],
      items: [] },
    { id: "dec29", date: "Dec 29, Tuesday", title: "Land at 6:05 AM, daytime stops, then the domes",
      slots: [{ key: "hotel", label: "Dec 29 stay", ids: ["stay-domes"] }],
      items: ["sandholt", "lava_tunnel", "reykjabod", "sky_lagoon", "mjolkurbuid", "kerid"] },
    { id: "dec30", date: "Dec 30, Wednesday", title: "Glass Cottages Blar, near Hella",
      slots: [{ key: "hotel", label: "Dec 30 stay", ids: ["stay-glass"] }],
      items: ["kerid", "golden_circle", "fridheimar", "south_coast", "nl_guided", "nl_self"] },
    { id: "dec31", date: "Dec 31, Thursday", title: "Drive to Reykjavik, New Year's Eve",
      slots: [{ key: "hotel", label: "Dec 31 stay", ids: ["stay-edition"] }],
      items: ["nye_dinner", "nye_bonfire", "aramotaskaup", "nye_fireworks", "dill", "grillmarkadurinn", "harpa_walk", "grotta"] },
    { id: "jan1", date: "Jan 1, Friday", title: "Reykjavik, or a Golden Circle day",
      slots: [{ key: "hotel", label: "Jan 1 stay", ids: ["stay-edition"] }],
      items: ["horses", "golden_circle", "fridheimar", "fontana", "silfra", "tides", "hvammsvik"] },
    { id: "jan2", date: "Jan 2, Saturday", title: "South Coast or a day in town",
      slots: [{ key: "hotel", label: "Jan 2 stay", ids: ["stay-edition"] }],
      items: ["south_coast", "kolaportid", "wool_shops", "shopping_downtown"] },
    { id: "jan3", date: "Jan 3, Sunday", title: "The Retreat at Blue Lagoon",
      slots: [{ key: "hotel", label: "Jan 3 stay", ids: ["stay-retreat"] }],
      items: ["blue_lagoon", "edition_spa", "retreat_massage", "moss"] },
    { id: "jan4", date: "Jan 4, Monday", title: "Drop off the car, then a 4:55 PM flight home",
      slots: [{ key: "flight", label: "the return flight", ids: ["flight"] }],
      items: [] }
  ];

  var defaultRates = function () {
    var d = clone(D.DEFAULTS);
    return {
      suiteRate: d.suiteRate,
      retreatRate: d.retreatRate,
      hofnRate: d.hofnRate,
      auroraRate: d.auroraRate,
      foodRate: d.foodRate,
      foodDays: d.foodDays,
      blTier: d.blTier,
      blVisits: d.blVisits,
      iceCave: "standard",
      iceCaveRate: d.iceCaveRate,
      nlRate: d.nlRate,
      nlCount: d.nlCount
    };
  };

  var state = {
    v: 5,
    player: "",
    picks: {},
    passed: {},
    unlocked: {},
    tiers: {},
    mate: null,
    rates: defaultRates(),
    welcomeSeen: false,
    mateWelcomeSeen: false,
    packed: {},
    booked: {}
  };
  var welcomeIndex = 0;
  var welcomeMode = "tour";
  var welcomeOpen = false;
  var undoStack = [];
  var reviewId = null;
  var lastChip = null;
  var drag = { on: false };
  var lastPickShown = null;

  /* ---------- motion ----------
     The moving parts live in the Motion section of styles.css. This is only
     the timing glue. Everything here is skipped when the phone asks for
     reduced motion. */
  /* Background loop behind the welcome sheet, from the MotionSites library. */
  var MOTION_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261022_235442_c62146c2-3f2f-46c0-ab51-649a4aa26cf5.mp4";
  var TAB_ORDER = { pick: 0, plan: 1, compare: 2 };
  var lastTab = null;
  var leaving = false;
  var justFlew = false;
  var welcomeDir = 1;

  function reducedMotion() {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  }
  function replay(el, cls) {
    if (!el) return;
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }
  function swapText(el, text) {
    if (!el || el.textContent === text) return;
    var had = el.textContent !== "";
    el.textContent = text;
    if (had) replay(el, "is-swap");
  }
  function showLayer(el) {
    if (!el) return;
    clearTimeout(el._closeT);
    el.classList.remove("is-closing");
    el.hidden = false;
  }
  function hideLayer(el) {
    if (!el || el.hidden) return;
    clearTimeout(el._closeT);
    if (reducedMotion()) { el.classList.remove("is-closing"); el.hidden = true; return; }
    el.classList.add("is-closing");
    el._closeT = setTimeout(function () {
      el.hidden = true;
      el.classList.remove("is-closing");
    }, 160);
  }
  /* A few sparks out of the middle of `target`, drawn inside `host`. */
  function burst(target, host, gold) {
    if (!target || !host || reducedMotion()) return;
    var t = target.getBoundingClientRect();
    var h = host.getBoundingClientRect();
    if (!t.width || !h.width) return;
    var wrap = document.createElement("span");
    wrap.className = "m-burst" + (gold ? " is-gold" : "");
    wrap.setAttribute("aria-hidden", "true");
    wrap.style.left = (t.left - h.left + t.width / 2) + "px";
    wrap.style.top = (t.top - h.top + t.height / 2) + "px";
    var n = 12;
    for (var i = 0; i < n; i++) {
      var dot = document.createElement("i");
      var a = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.5;
      var reach = 12 + Math.random() * 22;
      dot.style.setProperty("--px", (Math.cos(a) * (t.width / 2 + reach)).toFixed(1) + "px");
      dot.style.setProperty("--py", (Math.sin(a) * (t.height / 2 + reach)).toFixed(1) + "px");
      dot.style.setProperty("--pdur", Math.round(520 + Math.random() * 260) + "ms");
      dot.style.setProperty("--pdelay", Math.round(Math.random() * 70) + "ms");
      dot.style.setProperty("--p-end-scale", (0.4 + Math.random() * 0.5).toFixed(2));
      wrap.appendChild(dot);
    }
    host.appendChild(wrap);
    setTimeout(function () { if (wrap.parentNode) wrap.parentNode.removeChild(wrap); }, 1100);
  }
  /* Only the digits that changed roll; up when the number rises, down when it falls. */
  function setRollingNumber(el, text, dir) {
    var prev = el.getAttribute("data-shown");
    if (prev === text) return;
    el.setAttribute("data-shown", text);
    if (prev === null || reducedMotion()) { el.textContent = text; return; }
    var same = prev.length === text.length;
    el.classList.add("t-subtle-number");
    el.classList.remove("is-animating");
    el.style.setProperty("--subtle-dir", dir < 0 ? "-1" : "1");
    el.textContent = "";
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (same && prev.charAt(i) === ch) { el.appendChild(document.createTextNode(ch)); continue; }
      var slot = document.createElement("span");
      slot.className = "t-subtle-slot";
      if (same) {
        var old = document.createElement("span");
        old.className = "t-subtle-old";
        old.setAttribute("aria-hidden", "true");
        old.textContent = prev.charAt(i);
        slot.appendChild(old);
      }
      var fresh = document.createElement("span");
      fresh.className = "t-subtle-new";
      fresh.textContent = ch;
      slot.appendChild(fresh);
      el.appendChild(slot);
    }
    void el.offsetHeight;
    el.classList.add("is-animating");
  }
  /* The pill under the tab you are on. Measured from the tab itself, so it
     follows every layout (phone, Duo upright, Duo two-pane). */
  function moveTabsPill(animate) {
    var pill = document.getElementById("tabsPill");
    var tab = document.querySelector('.tab[aria-current="page"]');
    if (!pill || !tab || !tab.offsetWidth) return;
    var w = Math.min(tab.offsetWidth - 12, 124);
    var h = tab.offsetHeight - 2;
    var x = tab.offsetLeft + (tab.offsetWidth - w) / 2;
    var y = tab.offsetTop + 1;
    var first = !pill.classList.contains("is-set");
    if (!animate || first) pill.style.transition = "none";
    pill.style.width = w + "px";
    pill.style.height = h + "px";
    pill.style.transform = "translate(" + x.toFixed(1) + "px, " + y.toFixed(1) + "px)";
    pill.classList.add("is-set");
    if (!animate || first) { void pill.offsetWidth; pill.style.transition = ""; }
  }
  /* The voted card flies off its side, the next one comes forward, then the
     vote is recorded. Without a card on screen it just records the vote. */
  function flyAndVote(id, yes) {
    if (leaving) return;
    var deck = document.getElementById("deck");
    var card = deck ? deck.querySelector(".swipe-card.is-top") : null;
    if (!card || card.getAttribute("data-id") !== id || reducedMotion()) { vote(id, yes); return; }
    leaving = true;
    if (yes) {
      var inBtn = document.getElementById("btnIn");
      replay(inBtn, "is-pop");
      burst(inBtn, document.getElementById("pickActions"), false);
    }
    var stamp = card.querySelector(yes ? ".stamp.in" : ".stamp.out");
    card.classList.remove("is-dragging");
    void card.offsetWidth;
    card.classList.add("is-leaving");
    if (stamp) stamp.style.opacity = 1;
    card.style.transform = "translateX(" + ((yes ? 1 : -1) * ((card.offsetWidth || 320) + 140)) + "px) rotate(" + (yes ? 14 : -14) + "deg)";
    card.style.opacity = "0.2";
    var under = deck.querySelector(".swipe-card.is-under");
    if (under) under.classList.add("is-promoting");
    setTimeout(function () {
      leaving = false;
      justFlew = true;
      try { vote(id, yes); } finally { justFlew = false; }
    }, 285);
  }
  function startWelcomeVideo() {
    var v = document.getElementById("welcomeVideo");
    if (!v || reducedMotion()) return;
    if (navigator.connection && navigator.connection.saveData) return;
    if (!v.getAttribute("src")) {
      v.muted = true;
      v.addEventListener("playing", function () { v.classList.add("is-on"); });
      v.addEventListener("error", function () { v.classList.remove("is-on"); });
      v.setAttribute("src", MOTION_VIDEO);
    }
    try {
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  }
  function stopWelcomeVideo() {
    var v = document.getElementById("welcomeVideo");
    if (v) { try { v.pause(); } catch (e) {} }
  }

  function playerName(id) {
    if (id === "jerm") return "Jerm";
    if (id === "both") return "Both of you";
    return "Scott";
  }
  function otherId() { return state.player === "jerm" ? "scott" : "jerm"; }
  function shortName(id) {
    var c = DECK_MAP[id];
    return (SHORT_NAMES[id] || (c && c.title) || id);
  }

  function defaultTiers() { return clone(DEFAULT_TIERS); }

  function cardTierId(c, who) {
    if (!c || !c.tiers) return "";
    var map = (who === "mate") ? (state.mate && state.mate.tiers) : state.tiers;
    var id = (map && map[c.id]) || c.defaultTier || (c.tiers[0] && c.tiers[0].id);
    if (c.id === "flight" && id !== "saga" && id !== "economy") id = (id === "saga-flex") ? "saga" : "economy";
    if (c.id === "stay-edition" && !(c.tiers || []).some(function (tier) { return tier.id === id; })) id = "flex";
    return id;
  }
  function findTier(c, id) {
    if (!c || !c.tiers) return null;
    var i;
    for (i = 0; i < c.tiers.length; i++) {
      if (c.tiers[i].id === id) return c.tiers[i];
    }
    return c.tiers[0] || null;
  }
  function activeTier(c, who) { return findTier(c, cardTierId(c, who)); }
  function viewCard(c, who) {
    if (!c) return c;
    var tier = activeTier(c, who);
    if (!tier) return c;
    var out = {};
    Object.keys(c).forEach(function (k) { if (k !== "tiers") out[k] = c[k]; });
    ["title", "pitch", "desc", "photoKey", "url", "urlLabel", "url2", "url2Label", "maps", "rec", "credit", "winter", "sub"].forEach(function (k) {
      if (tier[k] !== undefined) out[k] = tier[k];
    });
    out.tierId = tier.id;
    out.tierLabel = tier.label;
    out.priceFn = tier.priceFn || c.priceFn || function () { return { two: tier.two || 0, each: tier.each || 0, est: !!tier.est, sub: tier.sub || "" }; };
    return out;
  }
  function displayName(id, who) {
    var c = DECK_MAP[id];
    if (!c) return id;
    var v = viewCard(c, who);
    return v.title || c.title;
  }

  function isYes(map, id) { return !!(map && map[id]); }
  function myYes(id) { return isYes(state.picks, id); }
  function myPass(id) { return isYes(state.passed, id); }
  function mateYes(id) { return !!(state.mate && state.mate.picks && state.mate.picks[id]); }
  function matePass(id) { return !!(state.mate && state.mate.passed && state.mate.passed[id]); }

  function isLocked(id) {
    if (state.unlocked[id]) return false;
    if (state.player === "both") return myYes(id);
    if (!(myYes(id) && mateYes(id))) return false;
    var c = DECK_MAP[id];
    if (c && c.tiers) return cardTierId(c) === cardTierId(c, "mate");
    return true;
  }

  function lockedIds() { return DECK.filter(function (c) { return isLocked(c.id); }).map(function (c) { return c.id; }); }
  function yesIdsFrom(map) {
    return DECK.filter(function (c) { return isYes(map, c.id); }).map(function (c) { return c.id; });
  }

  function ratesCtx() {
    var r = state.rates;
    return {
      suiteRate: r.suiteRate,
      retreatRate: r.retreatRate,
      hofnRate: r.hofnRate,
      auroraRate: r.auroraRate,
      iceCave: r.iceCave,
      iceCaveRate: r.iceCaveRate,
      foodRate: r.foodRate,
      foodDays: r.foodDays,
      suiteOn: (myYes("stay-edition") || isLocked("stay-edition")) && cardTierId(DECK_MAP["stay-edition"]) === "suite",
      superiorOn: (myYes("stay-edition") || isLocked("stay-edition")) && cardTierId(DECK_MAP["stay-edition"]) === "superior"
    };
  }

  function applyChoices(ids, tierMap) {
    var has = function (id) { return ids.indexOf(id) !== -1; };
    var tierOf = function (id, fallback) {
      var c = DECK_MAP[id];
      if (tierMap && tierMap[id]) return tierMap[id];
      if (c) return cardTierId(c);
      return fallback || "";
    };
    var r = state.rates;
    var sim = clone(r);
    var flightT = tierOf("flight", "saga");
    if (flightT === "standard") flightT = "economy";
    sim.flightClass = (FLIGHT_FARES[flightT] ? flightT : "saga");
    sim.holdDec28 = false;
    var roomT = tierOf("stay-edition", "flex");
    sim.editionTier = roomT || "flex";
    sim.editionRate = (EDITION_RATES[sim.editionTier] != null) ? EDITION_RATES[sim.editionTier] : EDITION_RATES.flex;
    sim.editionNights = 3;
    sim.suiteNights = 0;
    sim.superiorNights = 0;
    sim.retreatNights = 1;
    sim.retreatRate = RETREAT_RATE;
    sim.domesNights = 1;
    sim.glassNights = 1;
    sim.panoNights = 0;
    sim.panorama = "standard";
    sim.buubbleNights = 0;
    sim.auroraNights = 0;
    sim.hofnNights = 0;
    sim.hofnFlights = false;
    sim.iceCave = "none";
    sim.blVisits = has("blue_lagoon") ? Math.max(1, r.blVisits || 1) : 0;
    sim.blTier = r.blTier || "lava";
    sim.nlTour = has("nl_guided");
    var carT = tierOf("car", "mid");
    sim.carId = carT || "mid";
    sim.foodOn = has("food-budget");
    sim.picks = {};
    CATALOG.forEach(function (c) { sim.picks[c.id] = has(c.id); });
    return sim;
  }

  function jokulsarlonCost(sim) {
    var flights = 115 * 2 * PEOPLE;
    var caveEach = sim.iceCave === "long" ? 290 : (sim.iceCaveRate || 175);
    var cave = caveEach * PEOPLE;
    var hotel = (sim.hofnNights || 1) * (sim.hofnRate || 250);
    return flights + cave + hotel;
  }

  function itemPriceOn(c, sim) {
    if (c.sync === "blue_lagoon") {
      var tier = !sim.blTier || sim.blTier === "none" ? "lava" : sim.blTier;
      var visits = Math.max(1, sim.blVisits || 1);
      if (sim.retreatNights > 0) visits = Math.max(0, visits - 1);
      return BL[tier] * visits * PEOPLE;
    }
    if (c.sync === "jokulsarlon") return jokulsarlonCost(sim);
    if (c.sync === "nl_tour") return (sim.nlRate || 95) * (sim.nlCount || 1) * PEOPLE;
    if (c.free) return 0;
    return (c.priceEach || 0) * PEOPLE;
  }

  function computeFrom(ids) {
    var sim = applyChoices(ids);
    var flightsIntl = 0;
    if (sim.flightClass && FLIGHT_FARES[sim.flightClass]) flightsIntl = FLIGHT_FARES[sim.flightClass].two;
    else flightsIntl = FLIGHT_FARES.saga.two;
    var flightsHofn = 0;
    var holdCost = 0;
    var lodgingDomes = DOMES_RATE;
    var lodgingGlass = GLASS_RATE;
    var lodgingEdition = sim.editionRate || EDITION_RATES.flex;
    var lodgingRetreat = RETREAT_RATE;
    var lodgingPano = 0;
    var lodgingBuubble = 0;
    var lodgingAurora = 0;
    var lodging = lodgingDomes + lodgingGlass + lodgingEdition + lodgingRetreat;
    var extra = 0;
    CATALOG.forEach(function (c) {
      if (!sim.picks[c.id]) return;
      extra += itemPriceOn(c, sim);
    });
    var food = sim.foodOn ? sim.foodRate * sim.foodDays * PEOPLE : 0;
    var car = (sim.carId && CARS[sim.carId]) ? (CARS[sim.carId].trip || 0) : 0;
    var total = flightsIntl + lodging + extra + food + car;
    return {
      flightsIntl: flightsIntl, flightsHofn: flightsHofn, holdCost: holdCost,
      lodgingDomes: lodgingDomes, lodgingGlass: lodgingGlass,
      lodgingEdition: lodgingEdition, lodgingRetreat: lodgingRetreat,
      lodgingPano: lodgingPano, lodgingBuubble: lodgingBuubble, lodgingAurora: lodgingAurora,
      lodging: lodging, extra: extra, food: food, car: car,
      packageTotal: flightsIntl + lodging + car,
      total: total, sim: sim
    };
  }

  function cardPrice(c, idsForCtx) {
    var ctx = ratesCtx();
    var viewed = viewCard(c);
    if (viewed.priceFn) return viewed.priceFn(ctx);
    if (viewed.source) {
      var sim = applyChoices(idsForCtx || planIds());
      var two = itemPriceOn(viewed.source, sim);
      return { two: two, est: !!viewed.source.est, sub: viewed.priceNote || viewed.source.priceNote || "" };
    }
    return {
      two: viewed.two || 0,
      est: !!viewed.est,
      sub: viewed.sub || ""
    };
  }

  function priceLabel(c) {
    var p = cardPrice(c);
    var big = (p.est ? "est. " : "") + money(p.two);
    var sub = p.sub || "Total for two.";
    if (!p.two && !p.est && !p.sub) sub = "";
    return { big: big, sub: sub, two: p.two, est: p.est };
  }

  function isPlanned(id) {
    return PLANNED_IDS.indexOf(id) !== -1;
  }

  function planIds() {
    var ids = PLANNED_IDS.slice();
    lockedIds().forEach(function (id) {
      if (ids.indexOf(id) === -1) ids.push(id);
    });
    return ids;
  }

  function packageTotals() {
    var t = computeFrom(planIds());
    return t;
  }

  function placeLinks(c) {
    var bits = [];
    if (c.url) bits.push(siteLinkHtml(c.url));
    if (c.url2) bits.push(siteLinkHtml(c.url2));
    if (c.maps) bits.push(mapLinkHtml(c.maps));
    return bits.length ? '<div class="links card-links">' + bits.join("") + "</div>" : "";
  }

  function photoHtml(key, name, href, extraClass) {
    var url = PHOTO_URLS[key] || "";
    var img = url
      ? '<img src="' + url + '" alt="' + esc(name) + '" loading="lazy" onload="this.classList.add(&quot;is-ok&quot;)" onerror="window.__imgFail(this)">'
      : "";
    var inner = img + '<div class="ph-fallback">' + esc(name) + "</div>";
    if (href) inner = '<a class="card-photo" href="' + esc(href) + '" target="_blank" rel="noopener">' + inner + "</a>";
    return '<div class="photo ph ' + (extraClass || "") + '">' + inner + "</div>";
  }

  /* ---------- votes / locks / groups ---------- */
  function groupMembers(group) {
    if (!group) return [];
    return DECK.filter(function (c) { return c.group === group; }).map(function (c) { return c.id; });
  }

  function snapshotId(id) {
    return { id: id, pick: !!state.picks[id], pass: !!state.passed[id], unlocked: !!state.unlocked[id], tier: state.tiers[id] || "" };
  }
  function restoreId(s) {
    if (s.pick) state.picks[s.id] = true; else delete state.picks[s.id];
    if (s.pass) state.passed[s.id] = true; else delete state.passed[s.id];
    if (s.unlocked) state.unlocked[s.id] = true; else delete state.unlocked[s.id];
    if (s.tier) state.tiers[s.id] = s.tier;
    else if (s.tier === "") delete state.tiers[s.id];
  }

  function setTier(id, tierId) {
    var card = DECK_MAP[id];
    if (!card || !card.tiers || !findTier(card, tierId)) return;
    if (cardTierId(card) === tierId) return;
    undoStack.push({ snaps: [snapshotId(id)], reviewId: reviewId, stay: id });
    state.tiers[id] = tierId;
    if (state.player === "both") delete state.unlocked[id];
    reviewId = id;
    afterChange();
  }

  function vote(id, yes) {
    var card = DECK_MAP[id];
    if (!card) return;
    var snaps = [snapshotId(id)];
    if (yes) {
      state.picks[id] = true;
      delete state.passed[id];
      delete state.unlocked[id];
      if (card.tiers && !state.tiers[id]) state.tiers[id] = card.defaultTier || card.tiers[0].id;
    } else {
      delete state.picks[id];
      state.passed[id] = true;
      delete state.unlocked[id];
    }
    undoStack.push({ snaps: snaps, reviewId: reviewId });
    if (reviewId === id) reviewId = null;
    afterChange();
  }

  function undo() {
    var step = undoStack.pop();
    if (!step) { showToast("Nothing to undo yet."); return; }
    (step.snaps || []).forEach(restoreId);
    reviewId = step.stay || step.reviewId || null;
    afterChange();
  }

  function unlock(id) {
    if (!isLocked(id) && !myYes(id)) return;
    undoStack.push({ snaps: [snapshotId(id)] });
    delete state.picks[id];
    delete state.unlocked[id];
    afterChange();
    showToast("Unlocked. It is off the plan until you both say yes again.");
  }

  function remainingCards() {
    return DECK.filter(function (c) { return !myYes(c.id) && !myPass(c.id); });
  }
  function currentCard() {
    if (reviewId && DECK_MAP[reviewId]) return DECK_MAP[reviewId];
    var left = remainingCards();
    return left[0] || null;
  }
  function jumpTo(id) {
    if (!DECK_MAP[id]) return;
    reviewId = id;
    location.hash = "#pick";
    route();
    render();
  }

  /* ---------- persist / share ---------- */
  function compactState() {
    var o = {
      v: 5,
      player: state.player || "",
      yes: yesIdsFrom(state.picks),
      pass: DECK.filter(function (c) { return myPass(c.id); }).map(function (c) { return c.id; }),
      unlocked: Object.keys(state.unlocked).filter(function (k) { return state.unlocked[k]; }),
      tiers: state.tiers,
      rates: state.rates,
      welcomeSeen: !!state.welcomeSeen,
      mateWelcomeSeen: !!state.mateWelcomeSeen,
      packed: state.packed || {},
      booked: state.booked || {}
    };
    if (state.mate) {
      o.mate = {
        player: state.mate.player,
        yes: yesIdsFrom(state.mate.picks),
        pass: Object.keys(state.mate.passed || {}).filter(function (id) { return state.mate.passed[id]; }),
        tiers: state.mate.tiers || {}
      };
    }
    return o;
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(compactState())); } catch (e) {}
  }

  function mapLegacyList(ids, tiersOut, preferYes) {
    var out = [];
    (ids || []).forEach(function (id) {
      if (LEGACY_TIER[id]) {
        var pair = LEGACY_TIER[id];
        if (out.indexOf(pair[0]) < 0) out.push(pair[0]);
        if (preferYes) tiersOut[pair[0]] = pair[1];
        else if (!tiersOut[pair[0]]) tiersOut[pair[0]] = pair[1];
      } else if (DECK_MAP[id] && out.indexOf(id) < 0) out.push(id);
    });
    return out;
  }
  function applyYesPass(yes, pass, tiers) {
    var tmap = Object.assign(defaultTiers(), tiers || {});
    var y = mapLegacyList(yes, tmap, true);
    var pa = mapLegacyList(pass, tmap, false);
    state.picks = {};
    state.passed = {};
    y.forEach(function (id) { if (DECK_MAP[id]) state.picks[id] = true; });
    pa.forEach(function (id) { if (DECK_MAP[id] && !state.picks[id]) state.passed[id] = true; });
    state.tiers = tmap;
  }

  function migrateOld(saved) {
    var yes = [];
    var pass = [];
    CATALOG.forEach(function (c) {
      if (saved.picks && saved.picks[c.id]) yes.push(c.id);
      if (saved.passed && saved.passed[c.id]) pass.push(c.id);
    });
    if (saved.flightClass === "business") yes.push("flight-business");
    else if (saved.flightClass === "economy") yes.push("flight-economy");
    if (saved.holdDec28) yes.push("hold-dec28");
    if ((saved.suiteNights || 0) > 0) yes.push("stay-edition-suite");
    else if ((saved.superiorNights || 0) > 0) yes.push("stay-edition-superior");
    if ((saved.retreatNights || 0) > 0) yes.push("stay-retreat");
    if ((saved.panoNights || 0) > 0) yes.push(saved.panorama === "premium" ? "stay-panorama-premium" : "stay-panorama-standard");
    if ((saved.buubbleNights || 0) > 0) yes.push("stay-buubble");
    if ((saved.auroraNights || 0) > 0) yes.push("stay-aurora");
    if (saved.carId && saved.carId !== "none") yes.push("car-" + saved.carId);
    else if (saved.carId === "none" && saved.v) yes.push("car-none");
    if ((saved.foodDays || 0) > 0 && saved.foodRate) yes.push("food-budget");
    applyYesPass(yes, pass, saved.tiers);
    var r = defaultRates();
    ["suiteRate","retreatRate","hofnRate","auroraRate","foodRate","foodDays","blTier","blVisits","iceCave","iceCaveRate","nlRate","nlCount"].forEach(function (k) {
      if (saved[k] !== undefined) r[k] = saved[k];
    });
    state.rates = r;
  }

  function load() {
    state = { v: 5, player: "", picks: {}, passed: {}, unlocked: {}, tiers: defaultTiers(), mate: null, rates: defaultRates(), welcomeSeen: false, mateWelcomeSeen: false, packed: {}, booked: {} };
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var saved = JSON.parse(raw);
      if (saved.v === 5) {
        if (saved.player === "scott" || saved.player === "jerm") state.player = saved.player;
        applyYesPass(saved.yes || [], saved.pass || [], saved.tiers);
        (saved.unlocked || []).forEach(function (id) { if (DECK_MAP[id]) state.unlocked[id] = true; });
        if (saved.rates) Object.keys(state.rates).forEach(function (k) {
          if (saved.rates[k] !== undefined) state.rates[k] = saved.rates[k];
        });
        state.welcomeSeen = !!saved.welcomeSeen;
        state.mateWelcomeSeen = !!saved.mateWelcomeSeen;
        state.packed = (saved.packed && typeof saved.packed === "object") ? saved.packed : {};
        state.booked = (saved.booked && typeof saved.booked === "object") ? saved.booked : {};
        if (saved.mate && (saved.mate.player === "scott" || saved.mate.player === "jerm")) {
          var mt = Object.assign(defaultTiers(), saved.mate.tiers || {});
          var rawYes = saved.mate.yes || Object.keys(saved.mate.picks || {}).filter(function (id) { return saved.mate.picks[id]; });
          var rawPass = saved.mate.pass || Object.keys(saved.mate.passed || {}).filter(function (id) { return saved.mate.passed[id]; });
          var myes = mapLegacyList(rawYes, mt, true);
          var mpass = mapLegacyList(rawPass, mt, false);
          state.mate = { player: saved.mate.player, picks: {}, passed: {}, tiers: mt };
          myes.forEach(function (id) { if (DECK_MAP[id]) state.mate.picks[id] = true; });
          mpass.forEach(function (id) { if (DECK_MAP[id]) state.mate.passed[id] = true; });
        }
      }
    } catch (e) {}
  }

  /* Shared trip save: isolated Supabase table, public anon key + RLS on this trip id. */
  var SYNC = {
    url: "https://zytqyfiftqleosmxyehk.supabase.co",
    anon: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5dHF5ZmlmdHFsZW9zbXh5ZWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MDY1MDMsImV4cCI6MjA5MDM4MjUwM30.JPsmeVSt0a_ZW7htiC0M24xHM0d4dF_5ShJ-f39hQ_8",
    trip: "scott-jerm-iceland-v5",
    table: "scott_jerm_iceland_trip"
  };
  var syncPending = false;
  var skipNextPush = false;
  var localChangedAt = 0;
  var syncTimer = null;

  function showSyncNote(on) {
    var el = document.getElementById("syncNote");
    if (el) el.hidden = !on;
  }

  function syncHeaders(prefer) {
    var h = {
      apikey: SYNC.anon,
      Authorization: "Bearer " + SYNC.anon,
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    if (prefer) h.Prefer = prefer;
    return h;
  }

  var BUILD = "20261115-simple1";

  /* The sizes readout is for fault-finding only. It shows with ?readout=1.
     The old ?debug=1 no longer turns it on and is dropped from the address,
     so a link or home-screen icon saved with it opens the clean page. */
  function keptSearch() {
    try {
      var params = new URLSearchParams(location.search);
      if (params.get("readout") === "1") return "?readout=1";
    } catch (e) {}
    return "";
  }

  function hasDebugFlag() {
    try {
      if (new URLSearchParams(location.search).get("readout") === "1") return true;
    } catch (e) {}
    return false;
  }

  function pageUrl(hash) {
    return location.pathname + keptSearch() + (hash || location.hash || "#pick");
  }

  function cleanQs() {
    try {
      if (!history.replaceState) return;
      var next = keptSearch();
      if (location.search === next) return;
      history.replaceState({}, "", location.pathname + next + (location.hash || "#pick"));
    } catch (e) {}
  }

  function mineBody() {
    return {
      trip_id: SYNC.trip,
      player: state.player,
      yes: yesIdsFrom(state.picks),
      pass: DECK.filter(function (c) { return myPass(c.id); }).map(function (c) { return c.id; }),
      tiers: state.tiers || {},
      updated_at: new Date().toISOString()
    };
  }

  function applyRemoteSlice(row, target) {
    var tmap = Object.assign(defaultTiers(), row.tiers || {});
    var yes = mapLegacyList(row.yes || [], tmap, true);
    var pa = mapLegacyList(row.pass || [], tmap, false);
    if (target === "mine") {
      applyYesPass(yes, pa, tmap);
    } else {
      var picks = {}, passed = {};
      yes.forEach(function (id) { if (DECK_MAP[id]) picks[id] = true; });
      pa.forEach(function (id) { if (DECK_MAP[id] && !picks[id]) passed[id] = true; });
      state.mate = { player: row.player, picks: picks, passed: passed, tiers: tmap };
    }
  }

  function remoteTime(row) {
    var t = Date.parse((row && row.updated_at) || "");
    return isNaN(t) ? 0 : t;
  }

  function pullShared(opts) {
    opts = opts || {};
    var u = SYNC.url + "/rest/v1/" + SYNC.table +
      "?trip_id=eq." + encodeURIComponent(SYNC.trip) +
      "&select=player,yes,pass,tiers,updated_at";
    return fetch(u, { headers: syncHeaders(), cache: "no-store" }).then(function (res) {
      if (!res.ok) throw new Error("pull " + res.status);
      return res.json();
    }).then(function (rows) {
      showSyncNote(false);
      var mine = null, other = null;
      (rows || []).forEach(function (r) {
        if (r.player === state.player) mine = r;
        else if (r.player === "scott" || r.player === "jerm") other = r;
      });
      if (other) applyRemoteSlice(other, "mate");
      else state.mate = null;
      if (state.player === "scott" || state.player === "jerm") {
        if (mine) {
          if (!syncPending && (opts.applyMine || remoteTime(mine) > localChangedAt)) {
            applyRemoteSlice(mine, "mine");
          }
        } else if (opts.seed && !syncPending) {
          pushShared();
        }
      }
      if (opts.render !== false) {
        save();
        render();
      }
    }).catch(function () {
      showSyncNote(true);
    });
  }

  function pushShared() {
    if (state.player !== "scott" && state.player !== "jerm") return Promise.resolve();
    syncPending = true;
    localChangedAt = Date.now();
    return fetch(SYNC.url + "/rest/v1/" + SYNC.table, {
      method: "POST",
      headers: syncHeaders("resolution=merge-duplicates,return=minimal"),
      body: JSON.stringify(mineBody())
    }).then(function (res) {
      if (!res.ok) throw new Error("push " + res.status);
      syncPending = false;
      showSyncNote(false);
    }).catch(function () {
      showSyncNote(true);
    });
  }

  function startSyncClock() {
    if (syncTimer) return;
    syncTimer = setInterval(function () {
      if (syncPending) pushShared();
      else pullShared({ render: true });
    }, 10000);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") {
        if (syncPending) pushShared();
        pullShared({ applyMine: false });
      } else if (syncPending) {
        pushShared();
      }
    });
    window.addEventListener("focus", function () {
      if (syncPending) pushShared();
      pullShared({ applyMine: false });
    });
  }

  function openResetConfirm() {
    var el = document.getElementById("resetConfirm");
    showLayer(el);
    document.body.classList.add("confirm-open");
    var ok = document.getElementById("resetOk");
    if (ok) ok.focus();
  }
  function closeResetConfirm() {
    var el = document.getElementById("resetConfirm");
    hideLayer(el);
    document.body.classList.remove("confirm-open");
  }
  function startOver() {
    state.picks = {};
    state.passed = {};
    state.unlocked = {};
    state.packed = {};
    state.booked = {};
    state.tiers = defaultTiers();
    undoStack = [];
    reviewId = null;
    closeResetConfirm();
    if (location.hash !== "#pick") location.hash = "#pick";
    route();
    afterChange();
  }

  /* ---------- route ---------- */
  function currentTab() {
    var h = (location.hash || "#plan").replace(/^#/, "");
    if (h === "us") h = "compare";
    if (h === "pick" || h === "compare" || h === "plan") return h;
    return "plan";
  }
  function route() {
    var tab = currentTab();
    document.body.setAttribute("data-tab", tab);
    document.body.classList.toggle("pick-tab", tab === "pick");
    ["plan", "pick", "compare"].forEach(function (id) {
      var el = document.getElementById("view-" + id);
      if (el) el.hidden = id !== tab;
    });
    document.querySelectorAll(".tab").forEach(function (a) {
      a.setAttribute("aria-current", a.getAttribute("data-tab") === tab ? "page" : "false");
    });
    if (tab === "plan") {
      setTimeout(function () {
        if (currentTab() !== "plan") return;
        if (!overviewMap) initOverviewMap();
        else laterInvalidate(overviewMap, mapEpoch);
        if (!Object.keys(dayMaps).length) initDayMaps();
        else Object.keys(dayMaps).forEach(function (k) { laterInvalidate(dayMaps[k], mapEpoch); });
      }, 60);
    }
    if (lastTab && lastTab !== tab) {
      var entering = document.getElementById("view-" + tab);
      if (entering) {
        entering.style.setProperty("--m-dir", TAB_ORDER[tab] > TAB_ORDER[lastTab] ? "1" : "-1");
        replay(entering, "is-entering");
        clearTimeout(entering._enterT);
        entering._enterT = setTimeout(function () { entering.classList.remove("is-entering"); }, 900);
      }
    }
    moveTabsPill(lastTab !== null);
    if (lastTab !== tab) {
      var stage = document.querySelector(".stage");
      if (stage) stage.scrollTop = 0;
    }
    lastTab = tab;
    renderCountdown();
    renderWeather();
  }

  /* ---------- render ---------- */
  function mateBadge(id) {
    if (!state.mate) return "";
    var name = playerName(state.mate.player);
    if (mateYes(id)) {
      var c = DECK_MAP[id];
      var tlabel = (c && c.tiers && activeTier(c, "mate")) ? activeTier(c, "mate").label : "";
      if (tlabel) return '<span class="mate-badge">' + esc(name) + ": " + esc(tlabel) + "</span>";
      return '<span class="mate-badge">' + esc(name) + " said I'm in</span>";
    }
    if (matePass(id)) return '<span class="mate-badge">' + esc(name) + " passed</span>";
    return "";
  }

  function renderChip() {
    var t = packageTotals();
    var el = document.getElementById("chipTotal");
    if (el) setRollingNumber(el, money(t.packageTotal), lastChip === null ? 1 : t.packageTotal - lastChip);
    var chip = document.getElementById("lockedChip");
    if (chip) {
      var small = chip.querySelector("small");
      if (small) small.textContent = "planned";
    }
    if (chip && lastChip !== null && lastChip !== t.packageTotal) {
      chip.classList.remove("is-bump");
      void chip.offsetWidth;
      chip.classList.add("is-bump");
      if (t.packageTotal > lastChip) burst(chip, chip.closest(".top"), true);
    }
    lastChip = t.packageTotal;
  }

  function hotelForNight(night, locked) {
    if (night === "dec29") return "stay-domes";
    if (night === "dec30") return "stay-glass";
    if (night === "dec31" || night === "jan1" || night === "jan2") return "stay-edition";
    if (night === "jan3") return "stay-retreat";
    return null;
  }

  var T = window.ICELAND_TRIP || {};
  var routesData = null;
  var routesPromise = null;
  var overviewMap = null;
  var overviewActive = false;
  var dayMaps = {};
  var fullMap = null;
  var weatherCache = null;

  function formatSpan(mins) {
    mins = Math.round(mins || 0);
    if (mins <= 0) return "";
    var h = Math.floor(mins / 60), m = mins % 60;
    if (h && m) return h + " hr" + (h === 1 ? "" : "s") + " " + m + " min";
    if (h) return h + " hr" + (h === 1 ? "" : "s");
    return m + " min";
  }

  function cardKey(id) {
    var raw = DECK_MAP[id];
    if (!raw) return id;
    var v = viewCard(raw);
    if (v && v.tierId) return id + ":" + v.tierId;
    return id;
  }

  function durationFor(id) {
    var map = T.DURATIONS || {};
    var key = cardKey(id);
    if (map[key]) return map[key];
    if (map[id]) return map[id];
    return null;
  }

  function durationLine(id) {
    var d = durationFor(id);
    if (!d || !d.text) return "";
    return '<p class="duration-line">' + esc(d.text) + "</p>";
  }

  function placeKeyFor(id) {
    var map = T.PLACE_FOR || {};
    var key = cardKey(id);
    if (map[key]) return map[key];
    if (map[id]) return map[id];
    return "";
  }

  function expandPlaces(id) {
    var key = cardKey(id);
    var tours = T.TOUR_PLACES || {};
    if (tours[key]) return tours[key].slice();
    if (tours[id]) return tours[id].slice();
    var pk = placeKeyFor(id);
    return pk ? [pk] : [];
  }

  function uniqueKeys(arr) {
    var out = [], seen = {};
    arr.forEach(function (k) {
      if (k && !seen[k]) { seen[k] = true; out.push(k); }
    });
    return out;
  }

  function placesForDay(dayId, locked) {
    var order = (T.DAY_STOP_ORDER && T.DAY_STOP_ORDER[dayId]) || [];
    var keys = [];
    if (dayId === "dec29") keys.push("kef");
    order.forEach(function (id) {
      if (id === "flight" && dayId === "dec29") return;
      if (id === "ice-plan") {
        var ice = DECK_MAP["ice-plan"] && cardTierId(DECK_MAP["ice-plan"]);
        if (ice === "skip") return;
        if (ice === "katla" && dayId !== "jan2") return;
        if (ice === "jokulsarlon" && dayId !== "dec30") return;
      }
      if (locked.indexOf(id) === -1 && !isPlanned(id) && PLANNED_STOPS.indexOf(id) === -1 && id !== "flight") return;
      if (id === "flight" && (dayId === "jan3" || dayId === "jan4")) { keys.push("kef"); return; }
      expandPlaces(id).forEach(function (k) { keys.push(k); });
    });
    return uniqueKeys(keys);
  }

  function loadRoutes() {
    if (routesData) return Promise.resolve(routesData);
    if (routesPromise) return routesPromise;
    routesPromise = fetch(T.ROUTES_URL).then(function (r) {
      if (!r.ok) throw new Error("routes " + r.status);
      return r.json();
    }).then(function (data) {
      routesData = data;
      return data;
    }).catch(function () {
      routesPromise = null;
      return null;
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

  function addNamedLegs(legs, ids) {
    if (!routesData || !routesData.features) return legs;
    var have = {};
    legs.forEach(function (f) { if (f.properties) have[f.properties.id] = true; });
    routesData.features.forEach(function (f) {
      var id = f.properties && f.properties.id;
      if (id && ids[id] && !have[id]) { legs.push(f); have[id] = true; }
    });
    return legs;
  }

  function legsForDay(dayId, locked) {
    var keys = placesForDay(dayId, locked);
    var legs = stitchLegs(keys);
    var want = {};
    if (locked.indexOf("golden_circle") !== -1 && (dayId === "jan1" || dayId === "dec30")) want.golden_circle = true;
    if (locked.indexOf("south_coast") !== -1 && dayId === "jan2") want.south_coast = true;
    if (locked.indexOf("ice-plan") !== -1) {
      var ice = DECK_MAP["ice-plan"] && cardTierId(DECK_MAP["ice-plan"]);
      if (ice === "jokulsarlon" && dayId === "dec30") {
        want.edition_jokulsarlon = true;
        want.edition_hofn = true;
      }
      if (ice === "katla" && dayId === "jan2") want.edition_katla = true;
    }
    if (dayId === "dec29") want.kef_edition = true;
    if (dayId === "jan3") {
      want.edition_blue_lagoon = true;
      want.blue_lagoon_kef = true;
    }
    return addNamedLegs(legs, want);
  }

  function driveForDay(dayId, locked) {
    var keys = placesForDay(dayId, locked);
    var legs = stitchLegs(keys);
    var km = 0, mins = 0, used = {};
    legs.forEach(function (f) {
      var id = f.properties.id;
      if (used[id]) return;
      used[id] = true;
      km += f.properties.km || 0;
      mins += f.properties.mins || 0;
    });
    if (!mins) {
      if (locked.indexOf("golden_circle") !== -1) {
        var gc = findSegment("edition", "edition") || (routesData && routesData.features || []).filter(function (f) { return f.properties.id === "golden_circle"; })[0];
        if (gc) { km = gc.properties.km; mins = gc.properties.mins; }
      }
      if (locked.indexOf("south_coast") !== -1) {
        var sc = (routesData && routesData.features || []).filter(function (f) { return f.properties.id === "south_coast"; })[0];
        if (sc) { km += sc.properties.km; mins += sc.properties.mins; }
      }
    }
    return { km: Math.round(km * 10) / 10, mins: mins, keys: keys, legs: legs };
  }

  function dayActivityMins(day, locked) {
    var total = 0, evening = false;
    function add(id) {
      if (locked.indexOf(id) === -1) return;
      if (id === "flight") return;
      var d = durationFor(id);
      if (d && d.mins) total += d.mins;
      if (T.EVENING && T.EVENING[id]) evening = true;
    }
    day.slots.forEach(function (slot) {
      slot.ids.forEach(add);
    });
    day.items.forEach(add);
    var drive = 0;
    var info = driveForDay(day.id, locked);
    day.items.concat(day.slots.reduce(function (acc, s) { return acc.concat(s.ids); }, [])).forEach(function (id) {
      if (locked.indexOf(id) !== -1 && T.DRIVE_INCLUDED && T.DRIVE_INCLUDED[id]) drive = -1;
    });
    if (drive !== -1) drive = info.mins;
    else drive = 0;
    return { activity: total, drive: drive, planned: total + (drive > 0 ? drive : 0), evening: evening, info: info };
  }

  function clockFromMin(mins) {
    mins = Math.round(mins);
    if (mins < 0) mins = 0;
    var h = Math.floor(mins / 60) % 24, m = ((mins % 60) + 60) % 60;
    var ampm = h < 12 ? "AM" : "PM";
    var h12 = h % 12;
    if (h12 === 0) h12 = 12;
    return h12 + ":" + (m < 10 ? "0" : "") + m + " " + ampm;
  }

  function barPct(mins) {
    return (Math.max(0, Math.min(1440, mins)) / 1440 * 100);
  }

  function dayGradient(light) {
    if (!light) return "#0b1020";
    var night = "#0b1020";
    var twilight = "#3d456e";
    var twilight2 = "#6a5a5a";
    var golden = "#e0b56a";
    var mid = "#efe6c8";
    var rise = light.riseMin, set = light.setMin, noon = light.noonMin;
    var dawn = light.civilDawn, dusk = light.civilDusk;
    var gold = 50;
    if (set - rise < gold * 2 + 40) gold = Math.max(20, Math.floor((set - rise - 30) / 2));
    var goldAm = rise + gold;
    var goldPm = set - gold;
    if (goldAm > goldPm) {
      goldAm = noon - 15;
      goldPm = noon + 15;
    }
    function stop(color, min) {
      return color + " " + (min / 1440 * 100).toFixed(2) + "%";
    }
    return "linear-gradient(to right, " + [
      stop(night, 0),
      stop(night, Math.max(0, dawn - 25)),
      stop(twilight, dawn),
      stop(twilight2, rise - 8),
      stop(golden, rise),
      stop(mid, goldAm),
      stop(mid, goldPm),
      stop(golden, set),
      stop(twilight2, set + 8),
      stop(twilight, dusk),
      stop(night, Math.min(1440, dusk + 25)),
      stop(night, 1440)
    ].join(", ") + ")";
  }

  function schedStart(id, dayId) {
    var map = T.SCHEDULE || {};
    var key = cardKey(id);
    if (map[id + ":" + dayId] !== undefined) return map[id + ":" + dayId];
    if (map[key + ":" + dayId] !== undefined) return map[key + ":" + dayId];
    if (map[key] !== undefined) return map[key];
    if (map[id] !== undefined) return map[id];
    return 10 * 60;
  }

  function barLabel(id, dayId) {
    var map = T.BAR_LABELS || {};
    var key = cardKey(id);
    if (dayId && map[id + ":" + dayId]) return map[id + ":" + dayId];
    if (map[key]) return map[key];
    if (map[id]) return map[id];
    var raw = DECK_MAP[id];
    if (!raw) return id;
    var v = viewCard(raw);
    return (v && (v.tierLabel || v.title)) || raw.title || id;
  }

  function isEveningItem(id) {
    return !!(T.EVENING && T.EVENING[id]);
  }

  function barItemsForDay(day, locked) {
    var skip = T.BAR_SKIP || {};
    var ids = [];
    function consider(id) {
      if (locked.indexOf(id) === -1 || skip[id]) return;
      if (id === "ice-plan") {
        var ice = DECK_MAP["ice-plan"] && cardTierId(DECK_MAP["ice-plan"]);
        if (!ice || ice === "skip") return;
        if (ice === "katla" && day.id !== "jan2") return;
        if (ice === "jokulsarlon" && day.id !== "dec30") return;
      }
      if (ids.indexOf(id) >= 0) return;
      ids.push(id);
    }
    (day.slots || []).forEach(function (slot) { (slot.ids || []).forEach(consider); });
    (day.items || []).forEach(consider);
    if (day.id === "dec29" && locked.indexOf("flight") !== -1 && ids.indexOf("flight") < 0) ids.unshift("flight");
    return ids;
  }

  function blocksForDay(day, locked) {
    var ids = barItemsForDay(day, locked);
    var primary = T.BAR_PRIMARY || {};
    var blocks = [];
    var cursor = 10 * 60;
    var firstPrimary = true;

    if (day.id === "dec29" && locked.indexOf("flight") !== -1) {
      blocks.push({ id: "flight", label: barLabel("flight", "dec29"), start: 0, end: 6 * 60 + 5, kind: "activity", row: 0 });
      blocks.push({ id: "drive-kef", label: "Drive", start: 6 * 60 + 5, end: 6 * 60 + 5 + 52, kind: "drive", row: 0 });
      cursor = 6 * 60 + 5 + 52;
    }
    if (day.id === "dec30" && locked.indexOf("ice-plan") !== -1 && cardTierId(DECK_MAP["ice-plan"]) === "jokulsarlon") {
      var driveStart = 8 * 60;
      var driveMins = 333;
      blocks.push({ id: "drive-east", label: "Drive", start: driveStart, end: driveStart + driveMins, kind: "drive", row: 0 });
      cursor = driveStart + driveMins;
    }
    if (day.id === "jan3" && locked.indexOf("blue_lagoon") !== -1) {
      var toLagoon = 10 * 60 - 52;
      if (toLagoon < 8 * 60) toLagoon = 8 * 60 + 30;
      blocks.push({ id: "drive-lagoon", label: "Drive", start: toLagoon, end: toLagoon + 52, kind: "drive", row: 0 });
      cursor = toLagoon + 52;
    }

    ids.forEach(function (id) {
      if (day.id === "dec29" && id === "flight") return;
      var d = durationFor(id);
      var mins = (d && d.mins) ? d.mins : 60;
      if (day.id === "dec28" && id === "flight") {
        blocks.push({ id: id, label: barLabel(id, day.id), start: 22 * 60 + 40, end: 1440, kind: "activity", row: 0 });
        return;
      }
      if (day.id === "jan3" && id === "flight") {
        blocks.push({ id: id, label: barLabel(id, day.id), start: 16 * 60 + 55, end: 1440, kind: "activity", row: 0 });
        return;
      }
      var start = schedStart(id, day.id);
      var isPri = !!primary[id] || id === "ice-plan";
      if (isPri && !isEveningItem(id) && !firstPrimary && start < cursor) start = cursor;
      if (isPri && !isEveningItem(id)) {
        firstPrimary = false;
        cursor = start + mins;
      }
      var end = start + mins;
      if (end <= start) return;
      blocks.push({ id: id, label: barLabel(id, day.id), start: start, end: end, kind: "activity", row: 0 });
    });

    if (day.id === "jan3" && locked.indexOf("blue_lagoon") !== -1 && locked.indexOf("flight") !== -1) {
      var lagoon = blocks.filter(function (b) { return b.id === "blue_lagoon"; })[0];
      if (lagoon && lagoon.end + 25 < 16 * 60 + 55) {
        blocks.push({ id: "drive-kef-out", label: "Drive", start: lagoon.end, end: Math.min(16 * 60 + 55, lagoon.end + 25), kind: "drive", row: 0 });
      }
    }

    assignBarRows(blocks);
    return blocks;
  }

  function assignBarRows(blocks) {
    var rows = [];
    blocks.sort(function (a, b) { return a.start - b.start || (b.end - b.start) - (a.end - a.start); });
    blocks.forEach(function (b) {
      var r = 0;
      for (; r < rows.length; r++) {
        if (b.start >= rows[r] - 2) break;
      }
      if (r === rows.length) rows.push(0);
      rows[r] = b.end;
      b.row = r;
    });
    return rows.length;
  }

  function nowMarkerMin(dayId) {
    var iso = T.DAY_DATES && T.DAY_DATES[dayId];
    if (!iso) return null;
    try {
      var parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Atlantic/Reykjavik",
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", hourCycle: "h23"
      }).formatToParts(new Date());
      var get = function (t) {
        var i;
        for (i = 0; i < parts.length; i++) if (parts[i].type === t) return parts[i].value;
        return "";
      };
      var today = get("year") + "-" + get("month") + "-" + get("day");
      if (today !== iso) return null;
      return Number(get("hour")) * 60 + Number(get("minute"));
    } catch (e) {
      return null;
    }
  }

  function dayBarHtml(day, locked) {
    var light = (T.DAYLIGHT || {})[day.id];
    if (!light) return "";
    var blocks = blocksForDay(day, locked);
    var rows = 1;
    blocks.forEach(function (b) { if (b.row + 1 > rows) rows = b.row + 1; });
    var trackH = 10 + rows * 24;
    var items = blocks.map(function (b) {
      var left = barPct(b.start);
      var width = Math.max(0.7, barPct(b.end) - left);
      var cls = "day-bar-item" + (b.kind === "drive" ? " is-drive" : "");
      var span = clockFromMin(b.start) + " to " + clockFromMin(b.end);
      var caption = b.label + ", " + span + (b.kind === "drive" ? ", approx drive" : "");
      return '<button type="button" class="' + cls + '" data-bar-item="1" data-caption="' + esc(caption) + '" aria-label="' + esc(caption) + '" style="left:' + left.toFixed(2) + "%;width:" + width.toFixed(2) + "%;top:" + (6 + b.row * 24) + 'px"></button>';
    }).join("");
    var now = nowMarkerMin(day.id);
    var nowHtml = "";
    if (now !== null) {
      nowHtml = '<span class="day-bar-now" style="left:' + barPct(now).toFixed(2) + '%" title="Now in Reykjavik"><i>Now</i></span>';
    }
    var legend = blocks.map(function (b) {
      var span = clockFromMin(b.start) + " to " + clockFromMin(b.end);
      var cls = "day-bar-swatch" + (b.kind === "drive" ? " is-drive" : "");
      return '<li><i class="' + cls + '" aria-hidden="true"></i>' + esc(b.label) + ", " + esc(span) + "</li>";
    }).join("");
    return '<div class="day-bar" data-day-bar="' + esc(day.id) + '">' +
      '<div class="day-bar-track" style="height:' + trackH + "px;background:" + dayGradient(light) + '">' +
      items + nowHtml +
      "</div>" +
      '<div class="day-bar-hours" aria-hidden="true"><span style="left:0">12 AM</span><span style="left:25%">6 AM</span><span style="left:50%">12 PM</span><span style="left:75%">6 PM</span><span style="left:100%">12 AM</span></div>' +
      (legend ? '<ul class="day-bar-legend">' + legend + "</ul>" : "") +
      '<p class="day-bar-caption" hidden></p>' +
      "</div>";
  }

  function dayTotalHtml(day, locked) {
    var light = (T.DAYLIGHT || {})[day.id];
    if (!light) return "";
    var stats = dayActivityMins(day, locked);
    var hasStuff = locked.some(function (id) {
      return (day.items.indexOf(id) !== -1) || day.slots.some(function (s) { return s.ids.indexOf(id) !== -1; });
    });
    if (!hasStuff && stats.planned <= 0) {
      return '<p class="day-total">Sunrise ' + esc(light.rise) + ", sunset " + esc(light.set) + ", " + esc(formatSpan(light.mins)) + " of daylight.</p>";
    }
    var planned = formatSpan(stats.planned) || "0 min";
    var dayLen = formatSpan(light.mins);
    var packed = stats.planned > light.mins;
    var line = "About " + planned + " planned, " + dayLen + " of daylight.";
    return '<p class="day-total' + (packed ? " is-packed" : "") + '">' + esc(line) + "</p>";
  }

  function roadsHtml(day) {
    var meta = (T.DAY_ROADS || {})[day.id] || {};
    var links = (T.ROAD_LINKS || []).map(function (l) {
      return '<a class="road-chip" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
    }).join("");
    var bits = "";
    if (meta.drive) bits += "<p>" + esc(meta.drive) + "</p>";
    if (meta.risk) bits += "<p>" + esc(meta.risk) + "</p>";
    bits += '<div class="road-chips">' + links + "</div>";
    return '<div class="day-roads">' + bits + "</div>";
  }

  function dayScheduleHtml(day, locked) {
    return '<div class="day-schedule">' + dayBarHtml(day, locked) + dayTotalHtml(day, locked) + roadsHtml(day) + "</div>";
  }


  function bookingFor(id) {
    var map = T.BOOKING || {};
    if (id === "ice-plan") {
      var ice = DECK_MAP["ice-plan"] && cardTierId(DECK_MAP["ice-plan"]);
      if (ice === "skip") return null;
    }
    return map[id] || null;
  }

  function packModel(locked) {
    var items = (T.PACK_BASE || []).slice();
    var provided = [];
    var has = function (id) { return locked.indexOf(id) !== -1; };
    if ((T.SPA_IDS || []).some(has)) {
      items.push({ id: "swimsuit", label: "A swimsuit." });
      items.push({ id: "flipflops", label: "Flip-flops for wet decks." });
    }
    if ((T.HORSE_IDS || []).some(has)) {
      items.push({ id: "riding-gloves", label: "Riding gloves." });
      provided.push("Riding helmet. Ishestar provides this.");
    }
    if (has(T.ICE_CARD)) {
      var ice = cardTierId(DECK_MAP["ice-plan"]);
      if (ice && ice !== "skip") {
        provided.push("Crampons and a cave helmet. The ice tour provides these.");
      }
    }
    if ((T.NYE_IDS || []).some(has)) {
      items.push({ id: "nye-outfit", label: "A warm outfit for New Year's Eve." });
    }
    if ((has("car") || isPlanned("car")) && cardTierId(DECK_MAP["car"]) !== "none") {
      items.push({ id: "scraper", label: "An ice scraper for the car." });
    }
    if (isPlanned("stay-retreat") || has("reykjabod") || has("sky_lagoon") || has("blue_lagoon")) {
      if (!items.some(function (it) { return it.id === "swimsuit"; })) {
        items.push({ id: "swimsuit", label: "A swimsuit." });
        items.push({ id: "flipflops", label: "Flip-flops for wet decks." });
      }
    }
    return { items: items, provided: provided };
  }

  function renderPacking() {
    var el = document.getElementById("packBlock");
    if (!el) return;
    var model = packModel(lockedIds());
    var html = "<h2>What to pack</h2><p class='sub'>Checkboxes from locked items, plus winter basics. The list is saved on this phone.</p>";
    html += '<ul class="pack-list">';
    model.items.forEach(function (it) {
      var on = !!(state.packed && state.packed[it.id]);
      html += '<li><label class="pack-item"><input type="checkbox" data-packed="' + esc(it.id) + '"' + (on ? " checked" : "") + "> <span>" + esc(it.label) + "</span></label></li>";
    });
    html += "</ul>";
    if (model.provided.length) {
      html += '<div class="pack-provided"><h3>Provided, so do not pack</h3><ul>';
      model.provided.forEach(function (line) { html += "<li>" + esc(line) + "</li>"; });
      html += "</ul></div>";
    }
    el.innerHTML = html;
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

  function formatDaylightSec(sec) {
    var mins = Math.round((sec || 0) / 60);
    return formatSpan(mins);
  }

  function renderCountdown() {
    var el = document.getElementById("countdown");
    if (!el) return;
    var wx = document.getElementById("weather");
    var compact = currentTab() === "pick";
    var target = new Date(T.DEPART).getTime();
    var now = Date.now();
    var diff = target - now;
    var mins = Math.floor(Math.max(0, diff) / 60000);
    var days = Math.floor(mins / (60 * 24));
    var hours = Math.floor((mins - days * 60 * 24) / 60);
    var minutes = mins - days * 60 * 24 - hours * 60;
    if (compact) {
      var short;
      if (diff <= 0) short = "Departure time has passed";
      else if (days) short = days + " day" + (days === 1 ? "" : "s") + " to Dec 28";
      else short = hours + " hr" + (hours === 1 ? "" : "s") + ", " + minutes + " min to departure";
      if (weatherCache && isFinite(weatherCache.temp)) {
        short += ". Reykjavik " + Math.round(weatherCache.temp) + " C";
      }
      el.textContent = short + ".";
      if (wx) wx.hidden = true;
      return;
    }
    if (wx) wx.hidden = false;
    if (diff <= 0) {
      el.textContent = "The Dec 28 departure time has passed.";
      return;
    }
    var parts = [];
    if (days) parts.push(days + " day" + (days === 1 ? "" : "s"));
    parts.push(hours + " hr" + (hours === 1 ? "" : "s"));
    parts.push(minutes + " min");
    el.textContent = parts.join(", ") + " until departure at 3:40 PM MT, Dec 28.";
  }

  function renderWeather() {
    var el = document.getElementById("weather");
    if (!el) return;
    if (currentTab() === "pick") {
      el.hidden = true;
      renderCountdown();
      return;
    }
    el.hidden = false;
    if (!weatherCache) {
      el.textContent = "Reykjavik weather is unavailable right now.";
      return;
    }
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
      var el2 = document.getElementById("weather");
      if (el2 && !weatherCache) el2.textContent = "Reykjavik weather is unavailable right now.";
    });
  }

  function cartoLayer() {
    return L.tileLayer(T.TILE_URL, {
      attribution: T.TILE_ATTR,
      subdomains: "abc",
      maxZoom: 19
    });
  }

  function markerIcon() {
    return L.divIcon({
      className: "trip-pin",
      html: "<span></span>",
      iconSize: [18, 18],
      iconAnchor: [9, 9],
      popupAnchor: [0, -10]
    });
  }

  function popupHtml(place) {
    if (!place) return "";
    var photo = (window.ICELAND_DATA && ICELAND_DATA.PHOTO_URLS && ICELAND_DATA.PHOTO_URLS[place.photo]) || PHOTO_URLS[place.photo] || "";
    var img = photo ? '<img src="' + photo + '" alt="' + esc(place.name) + '">' : "";
    var links = [];
    if (place.url) links.push(siteLinkHtml(place.url));
    if (place.maps) links.push(mapLinkHtml(place.maps));
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
    if (bounds.length > 1) map.fitBounds(bounds, { padding: [28, 28], maxZoom: 12 });
    else if (bounds.length === 1) map.setView(bounds[0], 12);
    else map.setView([64.8, -18.7], 6);
  }

  function overviewKeys(locked) {
    var keys = (T.PREVIEW_PLACES || []).slice();
    (locked || []).forEach(function (id) {
      expandPlaces(id).forEach(function (k) { keys.push(k); });
    });
    return uniqueKeys(keys);
  }

  function overviewLegs(keys) {
    var legs = stitchLegs(keys);
    var want = {};
    if (keys.length <= 3 || (keys.length && (T.PREVIEW_PLACES || []).every(function (k) { return keys.indexOf(k) !== -1 || k === "kef" || k === "edition"; }) && keys.length >= (T.PREVIEW_PLACES || []).length)) {
      (T.PREVIEW_ROUTES || []).forEach(function (id) { want[id] = true; });
    }
    lockedIds().forEach(function (id) {
      if (id === "golden_circle") want.golden_circle = true;
      if (id === "south_coast") want.south_coast = true;
      if (id === "ice-plan" && cardTierId(DECK_MAP["ice-plan"]) === "jokulsarlon") {
        want.edition_jokulsarlon = true;
        want.edition_hofn = true;
      }
    });
    if (routesData && routesData.features) {
      routesData.features.forEach(function (f) {
        if (want[f.properties.id] && legs.indexOf(f) === -1) legs.push(f);
      });
    }
    if (!legs.length && routesData && routesData.features) {
      (T.PREVIEW_ROUTES || []).forEach(function (id) {
        routesData.features.forEach(function (f) {
          if (f.properties.id === id) legs.push(f);
        });
      });
    }
    return legs;
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

  var mapEpoch = 0;

  function bumpMaps() {
    mapEpoch += 1;
    destroyDayMaps();
    if (overviewMap) {
      destroyMap(overviewMap);
      overviewMap = null;
    }
  }

  function mapAlive(map, epoch) {
    try {
      return !!(map && (epoch === undefined || epoch === mapEpoch) && map._mapPane && map.getContainer && map.getContainer().isConnected);
    } catch (e) {
      return false;
    }
  }

  function laterInvalidate(map, epoch) {
    setTimeout(function () {
      try { if (mapAlive(map, epoch)) map.invalidateSize(); } catch (e) {}
    }, 80);
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

  function drawOverview(epoch) {
    var el = document.getElementById("overviewMap");
    if (!el || typeof L === "undefined" || !el.isConnected) return;
    if (epoch !== undefined && epoch !== mapEpoch) return;
    if (overviewMap) {
      destroyMap(overviewMap);
      overviewMap = null;
    }
    overviewMap = L.map(el, {
      zoomControl: true,
      attributionControl: true,
      dragging: false,
      scrollWheelZoom: false,
      touchZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false
    });
    cartoLayer().addTo(overviewMap);
    var keys = overviewKeys(planIds());
    var bounds = addPins(overviewMap, keys);
    addLegs(overviewMap, overviewLegs(keys));
    fitOrCenter(overviewMap, bounds);
    setOverviewInteractive(false);
    laterInvalidate(overviewMap, epoch);
  }

  function initOverviewMap() {
    var epoch = mapEpoch;
    loadRoutes().then(function () {
      if (epoch !== mapEpoch) return;
      drawOverview(epoch);
    });
  }

  function drawDayMap(dayId, el, epoch) {
    if (!el || typeof L === "undefined" || !el.isConnected) return;
    if (epoch !== undefined && epoch !== mapEpoch) return;
    if (dayMaps[dayId]) {
      destroyMap(dayMaps[dayId]);
      dayMaps[dayId] = null;
    }
    var map = L.map(el, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      touchZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false
    });
    cartoLayer().addTo(map);
    var keys = placesForDay(dayId, planIds());
    if (!keys.length) keys = ["edition"];
    var bounds = addPins(map, keys);
    addLegs(map, legsForDay(dayId, planIds()));
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

  function dayMapHtml(dayId) {
    if (!placesForDay(dayId, planIds()).length) return "";
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
    if (fullMap) {
      destroyMap(fullMap);
      fullMap = null;
    }
    var epoch = mapEpoch;
    loadRoutes().then(function () {
      if (epoch !== mapEpoch || !host.isConnected) return;
      if (fullMap) { destroyMap(fullMap); fullMap = null; }
      fullMap = L.map(host, {
        zoomControl: true,
        attributionControl: true,
        dragging: true,
        scrollWheelZoom: true,
        touchZoom: true,
        doubleClickZoom: true
      });
      cartoLayer().addTo(fullMap);
      var keys = placesForDay(dayId, planIds());
      var bounds = addPins(fullMap, keys);
      addLegs(fullMap, legsForDay(dayId, planIds()));
      fitOrCenter(fullMap, bounds);
      laterInvalidate(fullMap, epoch);
    });
  }

  function closeMapLayer() {
    var layer = document.getElementById("mapLayer");
    if (layer) layer.hidden = true;
    document.body.classList.remove("map-open");
    if (fullMap) {
      destroyMap(fullMap);
      fullMap = null;
    }
  }


  function statusHtml(id, c) {
    var booked = !!(state.booked && state.booked[id]);
    if (booked) return '<p class="lock is-booked">Booked</p>';
    if (c && c.bookSoon) return '<p class="lock is-soon">Book soon</p>';
    if (isPlanned(id)) return '<p class="lock is-planned">Not booked</p>';
    if (PLANNED_STOPS.indexOf(id) !== -1) return '<p class="lock is-planned">Planned</p>';
    if (isLocked(id)) return '<p class="lock">' + icon("lock") + " Locked</p>";
    return '<p class="lock is-planned">Planned</p>';
  }

  function totalsHtml() {
    var t = packageTotals();
    var flightT = cardTierId(DECK_MAP.flight) || "saga";
    if (flightT === "standard") flightT = "economy";
    var carT = cardTierId(DECK_MAP.car) || "mid";
    var roomT = cardTierId(DECK_MAP["stay-edition"]) || "flex";
    var lodgingNote = (roomT === "nonref") ? "$8,347 with the non-refundable EDITION rate" : money(t.lodging) + " with the current EDITION rate";
    var rows = [
      ["Saga Premium and the Duster", 15218, flightT === "saga" && carT === "mid"],
      ["Economy and the Duster", 13294, flightT === "economy" && carT === "mid"],
      ["Saga Premium and the Defender 110, est.", 16647, flightT === "saga" && carT === "premium"],
      ["Economy and the Defender 110, est.", 14723, flightT === "economy" && carT === "premium"]
    ];
    var list = rows.map(function (row) {
      return '<li class="' + (row[2] ? "is-current" : "") + '"><span>' + esc(row[0]) + "</span><b>" + (row[0].indexOf("est.") !== -1 ? "est. " : "") + money(row[1]) + "</b></li>";
    }).join("");
    var extra = (t.extra || 0) + (t.food || 0);
    var extraLine = extra ? '<p class="sub">Locked extras and food add ' + money(extra) + ", for a current grand total of " + money(t.total) + ".</p>" : '<p class="sub">Meals, activities, and fuel are not included in these totals.</p>';
    return '<div class="totals-card" id="planTotals">' +
      '<p class="kicker">Trip totals for two</p>' +
      "<h2>Nothing is booked yet</h2>" +
      '<p class="lede">Cash rates only, full totals for two adults, one king or double bed. Lodging is ' + lodgingNote + ".</p>" +
      '<p class="price-line">' + money(t.packageTotal) + ' <small>current lodging, flights, and car</small></p>' +
      "<ul class=\"totals-list\">" + list + "</ul>" + extraLine +
      "</div>";
  }

  function renderPlanItem(id, opts) {
    opts = opts || {};
    var raw = DECK_MAP[id];
    if (!raw) return "";
    var c = viewCard(raw);
    var pl = priceLabel(raw);
    var imgKey = c.photoKey;
    var thumb = PHOTO_URLS[imgKey] ? '<a class="card-photo" href="' + esc(c.url || "#") + '" ' + (c.url ? 'target="_blank" rel="noopener"' : "") + "><img src=\"" + PHOTO_URLS[imgKey] + "\" alt=\"" + esc(c.title) + "\"></a>" : '<div class="ph"></div>';
    if (!c.url) thumb = PHOTO_URLS[imgKey] ? '<img src="' + PHOTO_URLS[imgKey] + '" alt="' + esc(c.title) + '">' : '<div class="ph"></div>';
    var change = raw.tiers ? ' <button type="button" class="change-link" data-jump="' + esc(id) + '">Change</button>' : "";
    var unlock = (isLocked(id) && !isPlanned(id)) ? '<button type="button" class="ghost unlock-btn" data-unlock="' + esc(id) + '">Unlock</button>' : "";
    var compact = opts.compact;
    if (compact) {
      return '<div class="plan-item compact" data-locked="' + esc(id) + '"><div></div><div>' +
        statusHtml(id, c) + change +
        "<h3>" + esc(displayName(id)) + "</h3>" +
        "<p class='pitch-meta'>Your stay for this night. Already counted in the total.</p></div></div>";
    }
    return '<div class="plan-item" data-locked="' + esc(id) + '">' + thumb + "<div>" +
      statusHtml(id, c) + change +
      "<h3>" + (c.url ? '<a class="card-title" href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(c.title) + "</a>" : esc(c.title)) + "</h3>" +
      (pl.two || pl.est ? '<p class="price">' + pl.big + "</p>" : "") +
      (pl.sub ? '<p class="pitch-meta">' + esc(pl.sub) + "</p>" : "") +
      durationLine(id) +
      (c.winter ? '<p class="tip"><strong>Winter:</strong> ' + esc(c.winter) + "</p>" : "") +
      placeLinks(c) +
      unlock +
      "</div></div>";
  }

  function renderPlan() {
    var locked = lockedIds();
    var ids = planIds();
    var empty = document.getElementById("planEmpty");
    var daysEl = document.getElementById("planDays");
    if (empty) empty.hidden = true;
    if (!daysEl) return;
    var html = totalsHtml();
    html += '<div class="day-block"><p class="when">Getting around</p><h2>The rental car, 6 days</h2>';
    html += renderPlanItem("car");
    html += "</div>";

    var lastHotel = "";
    var lastFlight = false;
    DAYS.forEach(function (day) {
      html += '<article class="day-block" id="day-' + day.id + '"><p class="when">' + esc(day.date) + "</p><h2>" + esc(day.title) + "</h2>";
      if (day.id === "dec29") {
        html += '<p class="daylight-note">Winter daylight is about 11:20 AM to 3:30 PM. Check-in at the domes is 3:00 PM, with no front desk for an early bag drop.</p>';
      }
      html += dayScheduleHtml(day, ids.concat(PLANNED_STOPS));
      day.slots.forEach(function (slot) {
        var chosen = null;
        if (slot.key === "hotel") chosen = hotelForNight(day.id, ids);
        else {
          for (var i = 0; i < slot.ids.length; i++) {
            if (ids.indexOf(slot.ids[i]) !== -1) { chosen = slot.ids[i]; break; }
          }
        }
        if (chosen) {
          if (slot.key === "hotel" && chosen === lastHotel) {
            html += renderPlanItem(chosen, { compact: true });
          } else if (slot.key === "flight" && lastFlight) {
            html += renderPlanItem(chosen, { compact: true });
          } else {
            html += renderPlanItem(chosen);
          }
          if (slot.key === "hotel") lastHotel = chosen;
          if (slot.key === "flight") lastFlight = true;
        }
      });
      day.items.forEach(function (id) {
        if (ids.indexOf(id) !== -1 || PLANNED_STOPS.indexOf(id) !== -1) html += renderPlanItem(id);
      });
      html += '<div class="day-meta">' + dayMapHtml(day.id) + "</div>";
      html += "</article>";
    });
    bumpMaps();
    daysEl.innerHTML = html;
    if (currentTab() === "plan") {
      initDayMaps();
      initOverviewMap();
    }

    renderVideos(ids);
    var ready = document.getElementById("readyList");
    if (ready) {
      var bookIds = PLANNED_IDS.concat(locked.filter(function (id) { return PLANNED_IDS.indexOf(id) === -1; }));
      ready.innerHTML = bookIds.map(function (id) {
        var raw = DECK_MAP[id];
        if (!raw) return "";
        var c = viewCard(raw);
        var book = bookingFor(id);
        var link = c.url ? siteLinkHtml(c.url) : "<span>No official booking page for this one.</span>";
        var due = book ? '<br><em class="deadline">' + esc(book.text) + "</em>" : "";
        var cls = "ready-item" + (book ? " due-" + book.urgency : "") + (state.booked && state.booked[id] ? " is-done" : "");
        var chk = (state.booked && state.booked[id]) ? " checked" : "";
        var mark = (c.bookSoon ? "Book soon. " : "Not booked. ");
        return '<label class="' + cls + '"><input type="checkbox" data-booked="' + esc(id) + '"' + chk + "> <span><strong>" + esc(c.title) + "</strong><br>" + mark + link + due + "</span></label>";
      }).join("");
    }
  }

  var VIDEO_FOR = {
    "stay-edition": "edition",
    "stay-retreat": "retreat",
    sky_lagoon: "sky", reykjabod: "sky",
    nye_fireworks: "nye", nye_bonfire: "nye", horses: "horses",
    golden_circle: "golden", south_coast: "south"
  };
  function ytButton(v) {
    return '<button type="button" class="yt" data-yt="' + v.id + '" aria-label="Play ' + esc(v.title) + '">' +
      '<img src="https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg" alt="">' +
      '<span class="play">Play · ' + esc(v.kind) + ", " + esc(v.ch) + "<br>" + esc(v.title) + "</span></button>";
  }
  function renderVideos(locked) {
    var wrap = document.getElementById("planVideos");
    var row = document.getElementById("videoRow");
    if (!wrap || !row) return;
    var keys = [];
    locked.forEach(function (id) {
      var k = VIDEO_FOR[id];
      if (k && keys.indexOf(k) < 0) keys.push(k);
    });
    if (!keys.length) { wrap.hidden = true; row.innerHTML = ""; return; }
    wrap.hidden = false;
    var html = "";
    keys.forEach(function (k) { (VIDEOS[k] || []).forEach(function (v) { html += ytButton(v); }); });
    row.innerHTML = html;
  }
  function playVideo(btn) {
    var id = btn.getAttribute("data-yt");
    if (!id) return;
    var src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
    btn.outerHTML = '<div class="yt"><iframe src="' + src + '" allow="autoplay; encrypted-media" allowfullscreen title="YouTube video"></iframe></div>';
  }

  function scrollPickTop() {
    var stage = document.querySelector(".stage");
    if (stage) stage.scrollTop = 0;
    try { if (document.scrollingElement) document.scrollingElement.scrollTop = 0; } catch (e) {}
  }

  function renderPick() {
    var prog = document.getElementById("pickProg");
    var deck = document.getElementById("deck");
    var end = document.getElementById("deckEnd");
    var actions = document.getElementById("pickActions");
    var view = document.getElementById("view-pick");
    /* A card is mid-flight. Its vote redraws the deck in a moment; a redraw
       now (a sync landing, say) would snap it away. */
    if (leaving) return;
    var voted = DECK.filter(function (c) { return myYes(c.id) || myPass(c.id); }).length;
    if (prog) swapText(prog, Math.min(voted + (currentCard() ? 1 : 0), DECK.length) + " of " + DECK.length);
    var card = currentCard();
    if (!card) {
      if (deck) deck.innerHTML = "";
      if (actions) actions.hidden = true;
      if (end) { end.hidden = false; end.innerHTML = endHtml(); }
      if (lastPickShown !== "") { lastPickShown = ""; scrollPickTop(); }
      return;
    }
    if (actions) actions.hidden = false;
    if (end) end.hidden = true;
    var next = remainingCards().filter(function (c) { return c.id !== card.id; })[0];
    var html = "";
    if (next) html += swipeCardHtml(next, false);
    html += swipeCardHtml(card, true);
    if (deck) deck.innerHTML = html;
    if (deck && lastPickShown !== card.id) {
      /* A different card is up. After a fly-off the next card is already in
         place, so only a card that arrives another way (first load, Undo,
         a jump from Plan) rises in. */
      var topEl = deck.querySelector(".swipe-card.is-top");
      var underEl = deck.querySelector(".swipe-card.is-under");
      if (topEl && !justFlew) topEl.classList.add("is-entering");
      if (underEl) underEl.classList.add("is-entering");
    }
    var inBtn = document.getElementById("btnIn");
    if (inBtn) inBtn.textContent = state.player === "both" ? "We're in" : "I'm in";
    if (lastPickShown !== card.id) {
      lastPickShown = card.id;
      scrollPickTop();
    }
  }

  function tierChipsHtml(c) {
    if (!c.tiers) return "";
    var current = cardTierId(c);
    var chips = c.tiers.map(function (tier) {
      return '<button type="button" class="tier-chip" data-tier-card="' + esc(c.id) + '" data-tier="' + esc(tier.id) + '" aria-pressed="' + (tier.id === current ? "true" : "false") + '">' + esc(tier.label) + "</button>";
    }).join("");
    return '<div class="tier-chips" role="radiogroup" aria-label="Choose a tier">' + chips + "</div>";
  }

  function swipeCardHtml(c, top) {
    var v = viewCard(c);
    var pl = priceLabel(c);
    var locked = isLocked(c.id);
    var split = myYes(c.id) && mateYes(c.id) && c.tiers && cardTierId(c) !== cardTierId(c, "mate");
    return '<article class="swipe-card' + (top ? " is-top" : " is-under") + '" data-id="' + esc(c.id) + '">' +
      '<div class="stamp in">I\'m in</div><div class="stamp out">Pass</div>' +
      photoHtml(v.photoKey, v.title, v.url) +
      '<div class="body">' +
      '<p class="kicker">' + esc(c.day || "") + (c.kind ? " · " + esc(c.kind) : "") + "</p>" +
      (v.rec ? '<span class="rec">Recommended</span> ' : "") +
      mateBadge(c.id) +
      (locked ? '<p class="lock-flag">' + icon("lock") + ' Locked. It is on the plan.</p>' : "") +
      (split ? '<p class="tier-note">Same yes, different tier. This goes to Negotiate.</p>' : "") +
      '<p class="pitch-line">' + (v.url ? '<a class="card-title" href="' + esc(v.url) + '" target="_blank" rel="noopener">' + esc(v.pitch) + "</a>" : esc(v.pitch)) + "</p>" +
      tierChipsHtml(c) +
      '<p class="price-line">' + pl.big + "<small>" + esc(pl.sub) + "</small></p>" +
      durationLine(c.id) +
      (v.desc ? '<p class="pitch-meta">' + esc(v.desc) + "</p>" : "") +
      (v.winter ? '<p class="tip"><strong>Winter:</strong> ' + esc(v.winter) + "</p>" : "") +
      (v.credit ? '<p class="credit">' + esc(v.credit) + "</p>" : "") +
      placeLinks(v) +
      "</div></article>";
  }

  function endHtml() {
    var locked = lockedIds();
    var waiting = yesIdsFrom(state.picks).filter(function (id) { return !isLocked(id); });
    var passed = DECK.filter(function (c) { return myPass(c.id); });
    var t = computeFrom(locked);
    var tYes = computeFrom(unique(locked.concat(yesIdsFrom(state.picks))));
    var other = playerName(otherId());
    return "<p class='kicker'>The end of the deck</p><h2>End of the cards</h2>" +
      "<b>" + money(packageTotals().packageTotal) + "</b><small class='sub'>planned lodging, flights, and car, total for two.</small>" +
      (waiting.length && state.player !== "both" ? "<p class='sub'>If the rest of your picks were locked, extras would bring the grand total to " + money(tYes.total) + ", waiting on " + esc(other) + " for " + waiting.length + " of them.</p>" : "") +
      "<h3>Locked extras</h3>" + (locked.length ? "<ul>" + locked.map(function (id) { return "<li>" + esc(displayName(id)) + "</li>"; }).join("") + "</ul>" : "<p>No extra cards locked yet. The planned stays, flights, and car are already on the Plan tab.</p>") +
      "<h3>Waiting</h3>" + (waiting.length ? "<ul>" + waiting.map(function (id) { return "<li>" + esc(displayName(id)) + "</li>"; }).join("") + "</ul>" : "<p>None waiting.</p>") +
      "<h3>Passed</h3>" + (passed.length ? "<ul>" + passed.map(function (c) { return "<li>" + esc(displayName(c.id)) + "</li>"; }).join("") + "</ul>" : "<p>No passed cards.</p>") +
      '<div class="card-links"><button type="button" class="btn primary" id="reviewPassed">Review passed cards</button><a class="btn" href="#plan">See the plan</a><a class="btn" href="#compare">Open Compare</a></div>';
  }

  function unique(arr) {
    var o = {};
    arr.forEach(function (x) { o[x] = true; });
    return Object.keys(o);
  }

  function renderUs() {
    var how = document.getElementById("howCard");
    if (how) {
      how.innerHTML = "<h3>How this works</h3><p>Swipe right for I'm in, left for Pass. Use the chips to choose a flight class, room, cabin, car, or ice plan. An item locks when you both pick the same option. Different choices go to Negotiate.</p>" +
        '<button type="button" class="btn ghost" id="replayWelcome">See how this works again</button>';
    }
    var who = document.getElementById("usWho");
    if (who) {
      who.innerHTML = ["scott", "jerm"].map(function (id) {
        var label = "I'm " + playerName(id);
        return '<button type="button" class="btn" data-who="' + id + '" aria-pressed="' + (state.player === id ? "true" : "false") + '">' + label + "</button>";
      }).join("");
    }
    var board = document.getElementById("usBoard");
    if (!board) return;
    var locked = lockedIds();
    var mine = yesIdsFrom(state.picks);
    var theirs = state.mate ? yesIdsFrom(state.mate.picks) : [];
    var splits = [];
    DECK.forEach(function (c) {
      var me = myYes(c.id), mo = mateYes(c.id);
      var mp = myPass(c.id), op = matePass(c.id);
      var myLabel = c.tiers && activeTier(c) ? activeTier(c).label : shortName(c.id);
      var theirLabel = c.tiers && activeTier(c, "mate") ? activeTier(c, "mate").label : shortName(c.id);
      if (me && mo && c.tiers && cardTierId(c) !== cardTierId(c, "mate")) {
        splits.push(playerName(state.player) + ": " + myLabel + ". " + playerName(state.mate.player) + ": " + theirLabel + ".");
      } else if (me && op) splits.push(playerName(state.player) + ": " + myLabel + ". " + playerName(state.mate.player) + ": passed.");
      else if (mo && mp) splits.push(playerName(state.mate.player) + ": " + theirLabel + ". " + playerName(state.player) + ": passed.");
      else if (me && !mo && state.mate && !op && !mp) splits.push(playerName(state.player) + ": " + myLabel + ". " + playerName(state.mate.player) + ": not chosen yet.");
      else if (mo && !me && !mp) splits.push(playerName(state.mate.player) + ": " + theirLabel + ". " + playerName(state.player) + ": not chosen yet.");
    });
    var matches = locked.map(function (id) {
      var c = DECK_MAP[id];
      var label = c && c.tiers && activeTier(c) ? activeTier(c).label : shortName(id);
      return "Both: " + label + ".";
    });
    var tLock = computeFrom(locked);
    var tYes = computeFrom(unique(locked.concat(mine)));
    var otherName = state.mate ? playerName(state.mate.player) : playerName(otherId());
    board.innerHTML = '<div class="us-grid">' +
      '<div class="match-card"><h3>Matches</h3>' + (matches.length ? "<ul>" + matches.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" : "<p>No locked items yet.</p>") + "</div>" +
      '<div class="match-card"><h3>Negotiate</h3>' + (splits.length ? "<ul>" + splits.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" : "<p>No differences right now.</p>") + "</div>" +
      '<div class="match-card"><h3>' + (state.player === "both" ? "Picks on this phone" : (esc(playerName(state.player || "You")) + "'s picks")) + "</h3>" + (mine.length ? "<ul>" + mine.map(function (id) {
        var line = displayName(id);
        return "<li>" + esc(line) + (isLocked(id) ? icon("lock", "icon-inline") : "") + (DECK_MAP[id] && DECK_MAP[id].tiers ? ' <button type="button" class="change-link" data-jump="' + esc(id) + '">Change</button>' : "") + "</li>";
      }).join("") + "</ul>" : "<p>No picks yet.</p>") + "</div>" +
      '<div class="match-card"><h3>' + esc(otherName + "'s picks") + "</h3>" + (theirs.length ? "<ul>" + theirs.map(function (id) { return "<li>" + esc(displayName(id, "mate")) + "</li>"; }).join("") + "</ul>" : "<p>No picks yet.</p>") + "</div>" +
      '<div class="match-card match-totals"><h3>Planned total for two</h3><b>' + money(packageTotals().packageTotal) + "</b><small>lodging, flights, and car. Nothing booked yet.</small>" +
      "<h3 style='margin-top:16px'>If locked extras are included</h3><b>" + money(tYes.total) + "</b><small>Grand total for two, including extras still waiting on a match.</small></div>" +
      "</div>";
  }

  function renderCosts() {
    var r = state.rates;
    var body = document.getElementById("costsBody");
    if (!body) return;
    function row(id, label, type, val, step) {
      return '<div class="cost-row"><label for="' + id + '">' + label + "</label>" +
        (type === "select" ? val : '<input id="' + id + '" data-cost="' + id + '" type="' + type + '" value="' + esc(val) + '"' + (step ? ' step="' + step + '"' : "") + "></div>");
    }
    var sel = '<select id="blTier" data-cost="blTier">' +
      ["comfort","premium","lava"].map(function (t) { return '<option value="' + t + '"' + (r.blTier === t ? " selected" : "") + ">" + t + " · " + money(BL[t] * PEOPLE) + " for two</option>"; }).join("") +
      "</select>";
    body.innerHTML =
      row("foodRate", "Food budget a day for two (USD)", "number", r.foodRate * PEOPLE, "10") +
      row("foodDays", "Food budget days", "number", r.foodDays, "1") +
      '<div class="cost-row"><label for="blTier">Blue Lagoon tier, used when that card is locked. Prices are totals for two.</label>' + sel + "</div>" +
      row("blVisits", "Blue Lagoon visits (the Retreat night already includes lagoon access)", "number", r.blVisits, "1") +
      row("iceCaveRate", "Ice cave tickets, total for two (USD)", "number", r.iceCaveRate * PEOPLE, "10") +
      row("nlRate", "Guided lights tour, total for two (USD)", "number", r.nlRate * PEOPLE, "10") +
      row("nlCount", "Guided lights tour count", "number", r.nlCount, "1") +
      "<p class='credit'>These rates are added to the locked total only after the matching card is locked. FX used: ISK 123.4 per USD, EUR $1.10.</p>";
  }

  function renderWhoNow() { /* identity is chosen on the Compare tab and the welcome screen */ }

  function render() {
    renderChip();
    renderPlan();
    renderPick();
    renderUs();
    renderPacking();
    renderCountdown();
    renderWeather();
  }

  function afterChange() {
    save();
    render();
    if (skipNextPush) {
      skipNextPush = false;
      return;
    }
    pushShared();
  }

  function welcomeSlides() {
    var slides = [];
    slides.push({
      title: "Who is using this phone?",
      who: true
    });
    if (welcomeMode !== "who") {
      slides.push({
        photo: "images/welcome/swipe.png",
        alt: "A trip card with I'm in and Pass buttons",
        title: "Swipe right to say yes, left to pass."
      });
      slides.push({
        photo: "images/welcome/chips.png",
        alt: "Tier chips on a card, used to choose a flight class or room",
        title: "Use the chips on a card to choose Economy or Saga Premium, an EDITION cash rate, or the Duster or Defender."
      });
      slides.push({
        photo: "images/welcome/locked.png",
        alt: "A locked item with a lock icon",
        title: "Optional extras lock when you both say yes to the same option."
      });
      slides.push({
        photo: "images/welcome/plan.png",
        alt: "The Plan tab with the day-by-day itinerary",
        title: "The Plan tab has the full itinerary, with times, maps, and cash totals for two. Nothing is booked yet."
      });
    }
    return slides;
  }

  function renderWelcome() {
    var slides = welcomeSlides();
    if (welcomeIndex < 0) welcomeIndex = 0;
    if (welcomeIndex >= slides.length) welcomeIndex = slides.length - 1;
    var slide = slides[welcomeIndex];
    var track = document.getElementById("welcomeTrack");
    var dots = document.getElementById("welcomeDots");
    var next = document.getElementById("welcomeNext");
    var skip = document.getElementById("welcomeSkip");
    if (!track || !slide) return;
    var whoBtns = "";
    if (slide.who) {
      whoBtns = '<div class="who-btns">' +
        '<button type="button" class="btn primary" data-who="scott" aria-pressed="' + (state.player === "scott" ? "true" : "false") + '">I\'m Scott</button>' +
        '<button type="button" class="btn primary" data-who="jerm" aria-pressed="' + (state.player === "jerm" ? "true" : "false") + '">I\'m Jerm</button>' +
        "</div>";
    }
    var photo = "";
    if (slide.photo) {
      photo = '<div class="welcome-photo is-ui"><img src="' + esc(slide.photo) + '" alt="' + esc(slide.alt || "") + '"></div>';
    }
    track.style.setProperty("--m-dir", String(welcomeDir));
    track.innerHTML = '<div class="welcome-slide">' + photo +
      '<div class="welcome-copy"><h2 id="welcomeTitle">' + esc(slide.title) + "</h2>" + whoBtns + "</div></div>";
    if (dots) {
      dots.innerHTML = slides.map(function (_, i) {
        return '<button type="button" class="welcome-dot' + (i === welcomeIndex ? " is-on" : "") + '" data-welcome-dot="' + i + '" aria-label="Screen ' + (i + 1) + '"></button>';
      }).join("");
    }
    var last = welcomeIndex === slides.length - 1;
    if (next) next.textContent = last ? "Start" : "Next";
    if (skip) skip.hidden = last && !!state.player;
  }

  function openWelcome(mode) {
    welcomeMode = mode || "tour";
    welcomeIndex = 0;
    welcomeOpen = true;
    welcomeDir = 1;
    renderWelcome();
    var el = document.getElementById("welcome");
    showLayer(el);
    document.body.classList.add("welcome-open");
    startWelcomeVideo();
  }
  function closeWelcome() {
    welcomeOpen = false;
    state.welcomeSeen = true;
    var el = document.getElementById("welcome");
    hideLayer(el);
    stopWelcomeVideo();
    document.body.classList.remove("welcome-open");
    skipNextPush = true;
    afterChange();
    pullShared({ applyMine: true, seed: true });
  }
  function welcomeNext() {
    var slides = welcomeSlides();
    if (welcomeIndex >= slides.length - 1) {
      if (!state.player) {
        var whoAt = -1;
        slides.forEach(function (s, i) { if (s.who) whoAt = i; });
        if (whoAt >= 0) { welcomeDir = whoAt < welcomeIndex ? -1 : 1; welcomeIndex = whoAt; renderWelcome(); return; }
      }
      closeWelcome();
      return;
    }
    welcomeDir = 1;
    welcomeIndex++;
    renderWelcome();
  }
  function welcomePrev() {
    if (welcomeIndex <= 0) return;
    welcomeDir = -1;
    welcomeIndex--;
    renderWelcome();
  }
  function welcomeSkip() {
    var slides = welcomeSlides();
    if (!state.player) {
      var whoAt = -1;
      slides.forEach(function (s, i) { if (s.who) whoAt = i; });
      if (whoAt >= 0 && welcomeIndex !== whoAt) { welcomeDir = whoAt < welcomeIndex ? -1 : 1; welcomeIndex = whoAt; renderWelcome(); return; }
      return;
    }
    closeWelcome();
  }

  function setPlayer(id) {
    if (id !== "scott" && id !== "jerm") return;
    var prev = state.player;
    if (prev && prev !== id && (prev === "scott" || prev === "jerm")) pushShared();
    var switched = prev !== id;
    state.player = id;
    if (switched && (prev === "scott" || prev === "jerm")) {
      state.picks = {};
      state.passed = {};
      state.unlocked = {};
      state.tiers = defaultTiers();
      undoStack = [];
    }
    if (welcomeOpen) {
      var slides = welcomeSlides();
      if (welcomeMode === "who" || welcomeIndex >= slides.length - 1) {
        closeWelcome();
        return;
      }
      welcomeDir = 1;
      welcomeIndex++;
      renderWelcome();
      skipNextPush = true;
      afterChange();
      pullShared({ applyMine: true, seed: true });
      return;
    }
    skipNextPush = true;
    afterChange();
    pullShared({ applyMine: true, seed: true });
  }
  function showWho() { openWelcome("who"); }
  function hideWho() {
    var el = document.getElementById("welcome");
    hideLayer(el);
    stopWelcomeVideo();
    document.body.classList.remove("welcome-open");
    welcomeOpen = false;
  }

  function openCosts() {
    renderCosts();
    var el = document.getElementById("costs");
    showLayer(el);
    document.body.classList.add("costs-open");
  }
  function closeCosts() {
    var el = document.getElementById("costs");
    hideLayer(el);
    document.body.classList.remove("costs-open");
  }

  /* ---------- swipe ---------- */
  function applyDrag(dx, card) {
    if (!card) return;
    var rot = dx / 18;
    card.classList.add("is-dragging");
    card.style.transform = "translateX(" + dx + "px) rotate(" + rot + "deg)";
    var inn = card.querySelector(".stamp.in");
    var out = card.querySelector(".stamp.out");
    if (inn) inn.style.opacity = dx > 0 ? Math.min(1, dx / 100) : 0;
    if (out) out.style.opacity = dx < 0 ? Math.min(1, -dx / 100) : 0;
  }
  function clearDrag(card) {
    if (!card) return;
    /* Dropping the class first lets the card spring back instead of snapping. */
    card.classList.remove("is-dragging");
    card.style.transform = "";
    var inn = card.querySelector(".stamp.in");
    var out = card.querySelector(".stamp.out");
    if (inn) inn.style.opacity = 0;
    if (out) out.style.opacity = 0;
  }
  function bindSwipe() {
    var wrap = document.getElementById("deck");
    if (!wrap) return;
    wrap.addEventListener("pointerdown", function (e) {
      if (e.target.closest("button, a.btn, a.card-title, a.link-out, a[href], .card-links, .tier-chip, .tier-chips")) return;
      var card = e.target.closest(".swipe-card.is-top");
      if (!card) return;
      drag = { on: true, x0: e.clientX, y0: e.clientY, dx: 0, axis: null, card: card, id: card.getAttribute("data-id"), swiped: false };
    });
    wrap.addEventListener("pointermove", function (e) {
      if (!drag.on) return;
      var dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
      if (!drag.axis) {
        if (Math.abs(dx) + Math.abs(dy) < 10) return;
        drag.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (drag.axis === "x" && drag.card.setPointerCapture) {
          try { drag.card.setPointerCapture(e.pointerId); } catch (err) {}
        }
      }
      if (drag.axis !== "x") return;
      e.preventDefault();
      drag.dx = dx;
      applyDrag(dx, drag.card);
    }, { passive: false });
    function endDrag(e) {
      if (!drag.on) return;
      var card = drag.card, dx = drag.dx, axis = drag.axis, id = drag.id;
      var voted = false;
      if (axis === "x" && id) {
        if (dx > 80) { voted = true; flyAndVote(id, true); }
        else if (dx < -80) { voted = true; flyAndVote(id, false); }
      }
      if (!voted) clearDrag(card);
      if (voted || (axis === "x" && Math.abs(dx) > 12)) {
        drag.ignoreClick = true;
        if (e && e.preventDefault) e.preventDefault();
      }
      drag = { on: false, ignoreClick: !!(voted || (axis === "x" && Math.abs(dx) > 12)) };
    }
    wrap.addEventListener("click", function (e) {
      if (drag.ignoreClick && e.target.closest("a.card-photo")) {
        e.preventDefault();
        e.stopPropagation();
        drag.ignoreClick = false;
      }
    }, true);
    wrap.addEventListener("pointerup", endDrag);
    wrap.addEventListener("pointercancel", endDrag);
  }

  function bind() {
    document.body.addEventListener("click", function (e) {
      if (e.target.closest('a[href][target="_blank"]')) return;
      var yt = e.target.closest("[data-yt]");
      if (yt) { playVideo(yt); return; }
      var who = e.target.closest("[data-who]");
      if (who) { setPlayer(who.getAttribute("data-who")); return; }
      var un = e.target.closest("[data-unlock]");
      if (un) { unlock(un.getAttribute("data-unlock")); return; }
      var jump = e.target.closest("[data-jump]");
      if (jump) { jumpTo(jump.getAttribute("data-jump")); return; }
      var tierBtn = e.target.closest("[data-tier-card]");
      if (tierBtn) { setTier(tierBtn.getAttribute("data-tier-card"), tierBtn.getAttribute("data-tier")); return; }
      if (e.target.closest("#helpBtn") || e.target.closest("#replayWelcome")) { openWelcome("tour"); return; }
      if (e.target.closest("#welcomeNext")) { welcomeNext(); return; }
      if (e.target.closest("#welcomeSkip")) { welcomeSkip(); return; }
      var wdot = e.target.closest("[data-welcome-dot]");
      if (wdot) {
        var wNext = Number(wdot.getAttribute("data-welcome-dot")) || 0;
        welcomeDir = wNext < welcomeIndex ? -1 : 1;
        welcomeIndex = wNext;
        renderWelcome();
        return;
      }
      if (e.target.closest("#btnIn")) {
        var c = currentCard();
        if (c) flyAndVote(c.id, true);
        return;
      }
      if (e.target.closest("#btnPass")) {
        var c2 = currentCard();
        if (c2) flyAndVote(c2.id, false);
        return;
      }
      if (e.target.closest("#undoBtn")) { undo(); return; }
      if (e.target.closest("#resetBtn")) { openResetConfirm(); return; }
      if (e.target.closest("#resetCancel") || e.target === document.getElementById("resetConfirm")) { closeResetConfirm(); return; }
      if (e.target.closest("#resetOk")) { startOver(); return; }
      if (e.target.closest("#reviewPassed")) {
        DECK.forEach(function (card) {
          if (state.passed[card.id]) delete state.passed[card.id];
        });
        reviewId = null;
        afterChange();
        return;
      }
      if (e.target.closest("#switchPlayer")) { showWho(); return; }
      if (e.target.closest("#editCostsBtn")) { openCosts(); return; }
      if (e.target.closest("#closeCosts") || e.target === document.getElementById("costs")) { closeCosts(); return; }
      if (e.target.closest("#lockedChip")) { location.hash = "#compare"; return; }
      var barItem = e.target.closest("[data-bar-item]");
      if (barItem) {
        var bar = barItem.closest("[data-day-bar]");
        var was = barItem.classList.contains("is-expanded");
        if (bar) bar.querySelectorAll(".is-expanded").forEach(function (el) { el.classList.remove("is-expanded"); });
        var cap = bar && bar.querySelector(".day-bar-caption");
        if (!was) {
          barItem.classList.add("is-expanded");
          if (cap) { cap.hidden = false; cap.textContent = barItem.getAttribute("data-caption") || ""; }
        } else if (cap) {
          cap.hidden = true;
          cap.textContent = "";
        }
        return;
      }
      if (e.target.closest("#closeMapLayer")) { closeMapLayer(); return; }
      var dayMapBtn = e.target.closest("[data-open-day-map]");
      if (dayMapBtn) { openDayMap(dayMapBtn.getAttribute("data-open-day-map")); return; }
      if (e.target.closest("#overviewActivate") || e.target.closest("#overviewMapWrap:not(.is-active)")) {
        setOverviewInteractive(true);
        return;
      }
    });
    document.body.addEventListener("change", function (e) {
      var packed = e.target.getAttribute("data-packed");
      if (packed) {
        if (!state.packed) state.packed = {};
        state.packed[packed] = !!e.target.checked;
        afterChange();
        return;
      }
      var booked = e.target.getAttribute("data-booked");
      if (booked) {
        if (!state.booked) state.booked = {};
        state.booked[booked] = !!e.target.checked;
        afterChange();
        return;
      }
      var field = e.target.getAttribute("data-cost");
      if (!field) return;
      var val = e.target.value;
      if (e.target.type === "number") val = Number(val);
      if ((field === "foodRate" || field === "iceCaveRate" || field === "nlRate") && PEOPLE) val = val / PEOPLE;
      if (field in state.rates) state.rates[field] = val;
      afterChange();
    });
    bindSwipe();
    bindWelcomeSwipe();
    window.addEventListener("hashchange", function () { route(); render(); });
    window.addEventListener("resize", syncFoldShell);
    window.addEventListener("orientationchange", syncFoldShell);
    /* The Duo can report its sizes a beat late after a load, a rotation or a
       return to the tab, without firing resize. Look again shortly after. */
    window.addEventListener("pageshow", syncFoldShell);
    setTimeout(syncFoldShell, 250);
    setTimeout(syncFoldShell, 1200);
    try {
      var portraitMqEv = window.matchMedia("(orientation: portrait)");
      if (portraitMqEv.addEventListener) portraitMqEv.addEventListener("change", syncFoldShell);
      else if (portraitMqEv.addListener) portraitMqEv.addListener(syncFoldShell);
    } catch (e) {}
    try {
      if (window.screen && screen.orientation && screen.orientation.addEventListener) {
        screen.orientation.addEventListener("change", syncFoldShell);
      }
    } catch (e) {}
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", syncFoldShell);
      window.visualViewport.addEventListener("scroll", syncFoldShell);
    }
  }

  function bindWelcomeSwipe() {
    var track = document.getElementById("welcomeTrack");
    if (!track) return;
    var startX = 0, startY = 0, on = false;
    track.addEventListener("pointerdown", function (e) {
      if (e.target.closest("button, a")) return;
      on = true; startX = e.clientX; startY = e.clientY;
    });
    track.addEventListener("pointerup", function (e) {
      if (!on) return;
      on = false;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) welcomeNext();
      else welcomePrev();
    });
    track.addEventListener("pointercancel", function () { on = false; });
  }


  function mqMatches(query) {
    try { return window.matchMedia(query).matches; } catch (e) { return false; }
  }

  function positiveMin(nums) {
    var out = Infinity;
    for (var i = 0; i < nums.length; i++) {
      var n = Number(nums[i]);
      if (n > 0 && n < out) out = n;
    }
    return out === Infinity ? 0 : out;
  }

  function widestOffender() {
    var inner = window.innerWidth || 0;
    var worst = null;
    var nodes = document.querySelectorAll("body *");
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.id === "fold-debug") continue;
      var cs;
      try { cs = window.getComputedStyle(node); } catch (e) { continue; }
      if (!cs || cs.display === "none" || cs.visibility === "hidden") continue;
      var rec = node.getBoundingClientRect();
      var right = rec.right;
      var sw = node.scrollWidth;
      var score = Math.max(right, sw);
      if (!worst || score > worst.score) {
        var tag = node.tagName.toLowerCase();
        var cls = (node.className && typeof node.className === "string")
          ? node.className.trim().split(/\s+/).filter(Boolean).slice(0, 3).join(".")
          : "";
        var name = tag + (node.id ? "#" + node.id : "") + (cls ? "." + cls : "");
        worst = { name: name, right: Math.round(right), sw: sw, score: score, over: right > inner + 1 || sw > inner + 1 };
      }
    }
    return worst;
  }

  function foldSnapshot() {
    var innerW = window.innerWidth || 0;
    var innerH = window.innerHeight || 0;
    var clientW = (document.documentElement && document.documentElement.clientWidth) || 0;
    var clientH = (document.documentElement && document.documentElement.clientHeight) || 0;
    var visW = 0, visH = 0, visScale = 1;
    if (window.visualViewport) {
      visW = window.visualViewport.width || 0;
      visH = window.visualViewport.height || 0;
      visScale = window.visualViewport.scale || 1;
    }
    /* Visible CSS pixels, if the layout viewport is zoomed out to fit. */
    var shownW = visW && visScale ? visW * visScale : 0;
    var shownH = visH && visScale ? visH * visScale : 0;
    var screenW = (window.screen && screen.width) || 0;
    var screenH = (window.screen && screen.height) || 0;
    var angle = 0;
    var orientType = "";
    if (window.screen && screen.orientation) {
      if (typeof screen.orientation.angle === "number") angle = screen.orientation.angle;
      orientType = screen.orientation.type || "";
    } else if (typeof window.orientation === "number") {
      angle = window.orientation;
    }
    /* Chrome iOS on the Duo, open and upright, lays the page out wider than
       the window it shows (clientWidth 871, innerWidth 669, zoom 1). No
       element causes it and the viewport tag cannot undo it, so the page is
       pinned to the visible width instead. Only judged at zoom 1: pinching in
       also makes innerWidth smaller than clientWidth, and that is not this. */
    var atRest = !window.visualViewport || Math.abs(visScale - 1) < 0.01;
    var pinned = atRest ? (innerW > 0 && clientW > innerW + 1) : null;
    var wide = hasDebugFlag() ? widestOffender() : null;
    return {
      innerW: innerW, innerH: innerH,
      visW: visW, visH: visH, visScale: visScale,
      clientW: clientW, clientH: clientH,
      screenW: screenW, screenH: screenH,
      dpr: window.devicePixelRatio || 1,
      orientType: orientType, angle: angle,
      landscapeMq: mqMatches("(orientation: landscape)"),
      portraitMq: mqMatches("(orientation: portrait)"),
      aspectLand: mqMatches("(min-aspect-ratio: 1/1)"),
      aspectPort: mqMatches("(max-aspect-ratio: 1/1)"),
      width: innerW, height: innerH,
      atRest: atRest, pinned: pinned,
      wide: wide,
      build: BUILD
    };
  }

  function updateFoldDebug(snap) {
    if (!hasDebugFlag()) {
      var stale = document.getElementById("fold-debug");
      if (stale && stale.parentNode) stale.parentNode.removeChild(stale);
      return;
    }
    snap = snap || foldSnapshot();
    var el = document.getElementById("fold-debug");
    if (!el) {
      el = document.createElement("pre");
      el.id = "fold-debug";
      el.setAttribute("aria-hidden", "true");
      document.body.appendChild(el);
    }
    var wide = snap.wide;
    var wideLine = "widest (none)";
    if (wide) {
      wideLine = "widest " + wide.name + " right " + wide.right + " sw " + wide.sw + (wide.over ? " OVER" : "");
    }
    el.textContent = [
      "inner " + snap.innerW + " x " + snap.innerH,
      "visual " + snap.visW + " x " + snap.visH + " scale " + snap.visScale,
      "clientWidth " + snap.clientW,
      "screen " + snap.screenW + " x " + snap.screenH,
      "dpr " + snap.dpr,
      "orientation " + (snap.orientType || "(none)") + " / " + snap.angle,
      "mq (orientation: landscape) " + snap.landscapeMq,
      "mq (min-aspect-ratio: 1/1) " + snap.aspectLand,
      "fit to visible size " + (document.documentElement.classList.contains("view-pinned") ? "ON at " + snap.innerW + " x " + snap.innerH : "off"),
      wideLine,
      "build " + snap.build
    ].join("\n");
  }

  /* One layout for every screen, so there is nothing to choose here. The only
     job left is the Duo fault: when the browser lays the page out wider than
     it shows, hand the stylesheet the size you can actually see. */
  function syncViewWidth(snap) {
    var root = document.documentElement;
    if (!root || !snap.atRest) return;
    if (snap.pinned) {
      root.style.setProperty("--view-w", snap.innerW + "px");
      root.style.setProperty("--view-h", snap.innerH + "px");
      root.style.setProperty("--vw1", (snap.innerW / 100) + "px");
      root.style.setProperty("--vh1", (snap.innerH / 100) + "px");
      root.classList.add("view-pinned");
      if (window.scrollX || window.scrollY) window.scrollTo(0, 0);
    } else {
      root.style.removeProperty("--view-w");
      root.style.removeProperty("--view-h");
      root.style.removeProperty("--vw1");
      root.style.removeProperty("--vh1");
      root.classList.remove("view-pinned");
    }
  }

  function syncFoldShell() {
    var snap = foldSnapshot();
    syncViewWidth(snap);
    if (hasDebugFlag()) snap.wide = widestOffender();
    moveTabsPill(false);
    updateFoldDebug(snap);
  }

  function boot() {
    buildDeck();
    load();
    cleanQs();
    if (location.hash === "#us") {
      try { history.replaceState({}, "", pageUrl("#compare")); } catch (e) {}
    } else if (!location.hash || location.hash === "#") {
      try { history.replaceState({}, "", pageUrl("#plan")); } catch (e) {}
    }
    bind();
    syncFoldShell();
    route();
    if (!state.welcomeSeen) openWelcome("tour");
    else if (!state.player) openWelcome("who");
    render();
    startSyncClock();
    if (state.player === "scott" || state.player === "jerm") {
      pullShared({ applyMine: true, seed: true });
    }
    loadWeather();
    renderCountdown();
    setInterval(renderCountdown, 30000);
  }

  window.__icelandBuild = BUILD;
  window.__icelandFoldSnapshot = foldSnapshot;
  window.__icelandSetPlayer = setPlayer;
  window.__icelandSetTier = setTier;
  window.__icelandOpenWelcome = openWelcome;
  window.__icelandCloseWelcome = closeWelcome;
  window.__icelandVote = vote;
  window.__icelandUnlock = unlock;
  window.__icelandJump = jumpTo;
  window.__icelandUndo = undo;
  window.__icelandStartOver = startOver;
  window.__icelandOpenResetConfirm = openResetConfirm;
  window.__icelandState = function () { return state; };
  window.__icelandDeck = function () { return DECK; };
  window.__icelandLocked = lockedIds;
  window.__icelandCompute = computeFrom;
  window.__icelandRemaining = remainingCards;
  window.__icelandCurrent = currentCard;
  window.__icelandRender = render;
  window.__icelandRoute = route;
  window.__icelandPull = function () { return pullShared({ applyMine: true }); };
  window.__icelandPush = function () { return pushShared(); };
  window.__icelandClearReview = function () { reviewId = null; render(); };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
