/* Scott & Jerm's Iceland */
(function () {
  "use strict";
  var D = window.ICELAND_DATA;
  var PEOPLE = D.PEOPLE;
  var TRIP_NIGHTS = D.TRIP_NIGHTS;
  var BL = D.BL;
  var FLIGHT = D.FLIGHT;
  /* Official Icelandair fare families: Economy Light, Economy Standard, Economy Flex,
     Saga Premium, and Saga Premium Flex.
     Source: https://www.icelandair.com/en-us/support/on-board/classes-of-service/
     No live family quote was obtained for DEN-KEF Dec 28, 2026 to Jan 3, 2027.
     Dollar figures are planning estimates only. Light and Saga Premium Flex use
     rounded figures so the trip total is not blank; they are not quotes. */
  var FLIGHT_FARES = {
    light: { each: 1290, two: 2580, est: true, label: "Economy Light" },
    standard: { each: FLIGHT.economy, two: FLIGHT.economy * 2, est: true, label: "Economy Standard" },
    flex: { each: 1890, two: 3780, est: true, label: "Economy Flex" },
    saga: { each: FLIGHT.business, two: FLIGHT.business * 2, est: true, label: "Saga Premium" },
    "saga-flex": { each: 3590, two: 7180, est: true, label: "Saga Premium Flex" }
  };
  var PANO = D.PANO;
  var BUUBBLE_RATE = D.BUUBBLE_RATE;
  var SUPERIOR_RATE = D.SUPERIOR_RATE;
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
    el.hidden = false;
    el.textContent = msg;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { el.hidden = true; }, 2800);
  }

  window.__imgFail = function (img) { img.classList.add("is-fail"); };

  var GROUP_LABEL = {
    "flight-cabin": "the flight",
    "edition-room": "the Reykjavik hotel",
    "sky-cabin": "the Jan 2 glass or bubble night",
    "car": "the rental car",
    "ice-plan": "the ice cave plan"
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
  var DEFAULT_TIERS = { flight: "standard", "stay-edition": "suite", "sky-cabin": "pano-standard", car: "premium", "ice-plan": "jokulsarlon" };

  function coreCards() {
    var KATLA = (D.KATLA_EACH || 194) * PEOPLE;
    return [
      { id: "flight", kind: "flight", day: "Dec 28", title: "Icelandair, DEN to KEF",
        defaultTier: "standard",
        desc: "Icelandair FI670, a Boeing 737 MAX 8, leaves Denver at 3:40 PM on Dec 28 and lands at Keflavik at 6:05 AM on Dec 29. The outbound flight is 7 hours 25 minutes. The return is FI671 on Jan 3, leaving Keflavik at 4:55 PM and landing in Denver at 6:00 PM, 8 hours 5 minutes. Icelandair sells five fare families on this route. Light only books with Light. Standard can mix with Saga Premium. Flex can mix with Saga Premium Flex.",
        winter: "Delta's JFK, MSP, and DTW flights to KEF are summer-only. In late December, Icelandair is the only nonstop from Denver.",
        url: "https://www.icelandair.com/flights/from-denver-to-reykjavik/", urlLabel: "Book it",
        maps: "Denver International Airport",
        tiers: [
          { id: "light", label: "Economy Light", title: "Icelandair, Economy Light", photoKey: "economy_row",
            credit: "Photo: Simply Aviation, Wikimedia Commons.",
            pitch: "Economy Light on the overnight flight. Depart Denver at 3:40 PM, land at Keflavik at 6:05 AM.",
            sub: "Planning estimate, not a live quote. No checked bag. Changes are not allowed. Official Icelandair fare family.",
            two: FLIGHT_FARES.light.two, each: FLIGHT_FARES.light.each, est: true },
          { id: "standard", label: "Economy Standard", title: "Icelandair, Economy Standard", rec: true, photoKey: "economy_aisle",
            credit: "Photo: Simply Aviation, Wikimedia Commons.",
            pitch: "Economy Standard on the overnight flight. Depart Denver at 3:40 PM, land at Keflavik at 6:05 AM.",
            sub: "Planning estimate, not a live quote. One checked bag, 23 kg / 50 lb. Changes cost a fee (USD 250 on this route). Not refundable, except taxes. Official Icelandair fare family.",
            two: FLIGHT_FARES.standard.two, each: FLIGHT_FARES.standard.each, est: true },
          { id: "flex", label: "Economy Flex", title: "Icelandair, Economy Flex", photoKey: "economy_row",
            credit: "Photo: Simply Aviation, Wikimedia Commons.",
            pitch: "Same overnight flight, Economy Flex. Changes have no fare fee, though a fare difference may apply. The fare is refundable.",
            sub: "Planning estimate, not a live quote. One checked bag, 23 kg / 50 lb. No change fee. Refundable. Official Icelandair fare family.",
            two: FLIGHT_FARES.flex.two, each: FLIGHT_FARES.flex.each, est: true },
          { id: "saga", label: "Saga Premium", title: "Icelandair, Saga Premium", photoKey: "saga_seat",
            credit: "Photo: Simply Aviation, Wikimedia Commons.",
            pitch: "Saga Premium in the front cabin. A wider seat, meals, and priority, on the same 6:05 AM arrival.",
            sub: "Planning estimate, not a live quote. One checked bag, 32 kg / 70 lb. Meals and priority. Changes cost a fee (USD 300 on this route). Not refundable, except taxes. Official Icelandair fare family.",
            two: FLIGHT_FARES.saga.two, each: FLIGHT_FARES.saga.each, est: true },
          { id: "saga-flex", label: "Saga Premium Flex", title: "Icelandair, Saga Premium Flex", photoKey: "saga_seat",
            credit: "Photo: Simply Aviation, Wikimedia Commons.",
            pitch: "Saga Premium Flex in the front cabin, on the same 6:05 AM arrival. Seat selection is included, and the fare is refundable.",
            sub: "Planning estimate, not a live quote. Two checked bags, 32 kg / 70 lb each. No change fee. Refundable. Official Icelandair fare family.",
            two: FLIGHT_FARES["saga-flex"].two, each: FLIGHT_FARES["saga-flex"].each, est: true }
        ] },
      { id: "hold-dec28", kind: "stay", day: "Dec 28", title: "Arrive a day early, Dec 28",
        pitch: "An optional EDITION room on Dec 28, so there is a bed after the 6:05 AM landing.",
        desc: "The published plan lands at dawn on Dec 29. This is the optional extra night, priced at whatever EDITION room you lock.",
        winter: "If you hold the room, you still take FI670 a day earlier, or you arrive some other way. Check the same winter-daylight rules.",
        photoKey: "edition_entrance", rec: false,
        url: "https://www.editionhotels.com/reykjavik/", urlLabel: "Book it",
        maps: "The Reykjavik EDITION",
        priceFn: function (ctx) {
          var rate = ctx.suiteOn ? ctx.suiteRate : (ctx.superiorOn ? SUPERIOR_RATE : ctx.suiteRate);
          return { two: rate, each: rate / PEOPLE, est: true, sub: "Per room for the night, at the " + (ctx.superiorOn && !ctx.suiteOn ? "Superior King" : "Deluxe Suite") + " rate. Planning estimate, not a live quote this week." };
        } },
      { id: "stay-edition", kind: "stay", day: "Dec 29 to Jan 3", title: "The Reykjavik EDITION, five nights",
        defaultTier: "suite",
        desc: "Check in Dec 29, check out Jan 3. Harbor-side, next to Harpa. A night away trims this automatically so you do not pay twice.",
        winter: "Sidewalks can be icy. The free-cancel window still matters.",
        url: "https://www.editionhotels.com/reykjavik/", urlLabel: "Book it",
        maps: "The Reykjavik EDITION",
        tiers: [
          { id: "superior", label: "Superior King", title: "EDITION Superior King, five nights", photoKey: "edition_superior",
            credit: "Official photo, The Reykjavik EDITION.",
            pitch: "A Superior King at the EDITION for five nights. The hotel is on the harbor.",
            priceFn: function () { return { two: 5 * SUPERIOR_RATE, each: (5 * SUPERIOR_RATE) / PEOPLE, est: true, sub: money(SUPERIOR_RATE) + " a night for the room, a planning estimate. Away nights trim the total." }; } },
          { id: "suite", label: "Deluxe Suite", title: "EDITION Deluxe Suite, five nights", rec: true, photoKey: "edition_suite",
            credit: "Official photo, The Reykjavik EDITION.",
            pitch: "A Deluxe Suite at the EDITION, with a scenic view, for five nights. Confirm the current free-cancel date when you book.",
            priceFn: function (ctx) { return { two: 5 * ctx.suiteRate, each: (5 * ctx.suiteRate) / PEOPLE, est: true, sub: money(ctx.suiteRate) + " a night for the room, not per person. Planning estimate, not a live quote this week. Away nights trim the total." }; } }
        ] },
      { id: "stay-retreat", kind: "stay", day: "Jan 1 and Jan 2", title: "The Retreat at Blue Lagoon, two nights",
        pitch: "Two nights at The Retreat. Lagoon access is included. An in-water massage is not.",
        desc: "A lagoon-view suite at the default $2,840 a night, a planning estimate, not a live quote this week. A 2-night minimum may apply. These two nights replace two EDITION nights near the end of the week.",
        winter: "The lagoon stays about 98 to 104 F. Outdoor temperatures will be much lower.",
        photoKey: "retreat_suite", rec: false,
        url: "https://www.bluelagoon.com/accommodation/retreat-hotel", urlLabel: "Book it",
        maps: "The Retreat at Blue Lagoon",
        priceFn: function (ctx) { return { two: 2 * ctx.retreatRate, each: (2 * ctx.retreatRate) / PEOPLE, est: true, sub: money(ctx.retreatRate) + " a night for the suite, a planning estimate. The lagoon is included." }; } },
      { id: "sky-cabin", kind: "stay", day: "Jan 2", title: "A glass cabin, or stay in town",
        defaultTier: "pano-standard",
        desc: "A one-night swap for Jan 2. Stay in town leaves you at the EDITION, already in that total.",
        winter: "It will be dark, and it may be windy. The stay-in-town option keeps you at the EDITION.",
        tiers: [
          { id: "pano-standard", label: "Panorama Standard", title: "Panorama Glass Lodge, Standard", rec: true, photoKey: "panorama",
            pitch: "A standard glass cabin for one night.",
            url: "https://panoramaglasslodge.com/", urlLabel: "Book it", maps: "Panorama Glass Lodge Iceland",
            two: PANO.standard, each: PANO.standard / PEOPLE, est: true, sub: "Per cabin for the night, not per person. Planning estimate, not a live quote this week." },
          { id: "pano-premium", label: "Panorama Premium", title: "Panorama Glass Lodge, Premium", photoKey: "panorama_premium",
            pitch: "A Premium glass cabin for one night.",
            url: "https://panoramaglasslodge.com/", urlLabel: "Book it", maps: "Panorama Glass Lodge Iceland",
            two: PANO.premium, each: PANO.premium / PEOPLE, est: true, sub: "Per cabin for the night, not per person. Planning estimate, not a live quote this week." },
          { id: "buubble", label: "Buubble", title: "Buubble, one night", photoKey: "buubble",
            pitch: "A clear plastic dome for one night.",
            url: "https://buubble.com/", urlLabel: "Book it", maps: "Buubble Iceland",
            two: BUUBBLE_RATE, each: BUUBBLE_RATE / PEOPLE, est: true, sub: "Per cabin for the night. Planning estimate, not a live quote this week." },
          { id: "aurora", label: "Aurora Igloo", title: "Aurora Igloo, one night", photoKey: "aurora_igloo",
            pitch: "An aurora igloo for one night. The price is an estimate, not a researched holiday quote.",
            url: "https://auroraigloo.is/", urlLabel: "Book it", maps: "Aurora Igloo Iceland",
            priceFn: function (ctx) { return { two: ctx.auroraRate, each: ctx.auroraRate / PEOPLE, est: true, sub: "Estimated, per cabin. Edit the rate in Compare." }; } },
          { id: "town", label: "Stay in town", title: "Stay in town on Jan 2", photoKey: "edition_ext",
            pitch: "Keep Jan 2 at the EDITION.",
            url: "https://www.editionhotels.com/reykjavik/", urlLabel: "Website", maps: "The Reykjavik EDITION",
            two: 0, each: 0, est: false, sub: "No extra night away. The EDITION total already covers this." }
        ] },
      { id: "car", kind: "car", day: "The whole week", title: "The rental car",
        defaultTier: "premium",
        winter: "Winter tires are standard on these desks from Nov 1 to April 15. Studded tires help on ice, and often need a request. Blue Car Rental still lists the Yaris, the Duster 4x4, and the Defender 110. The Yaris is front-wheel drive, a weaker winter choice outside the city.",
        tiers: [
          { id: "none", label: "No car", title: "No rental car", photoKey: "car_none",
            pitch: "No rental car. Use tours, walking, and taxis.",
            maps: "Reykjavik city center",
            two: 0, each: 0, est: false, sub: "Zero on the car line, on purpose." },
          { id: "budget", label: "Yaris", title: "Toyota Yaris", photoKey: "car_yaris",
            pitch: "An automatic front-wheel-drive car.",
            url: "https://www.bluecarrental.is/our-cars/toyota-yaris/", urlLabel: "Book it", maps: "Blue Car Rental Keflavik Airport",
            credit: "Photo: Kevauto, Wikimedia Commons.",
            two: CARS.budget.trip, each: CARS.budget.trip / PEOPLE, est: false, sub: money(CARS.budget.daily) + " a day, plus Full Cover, for 6 days." },
          { id: "mid", label: "Duster 4x4", title: "Dacia Duster 4x4", photoKey: "car_duster",
            pitch: "A manual 4x4 compact SUV, a common Iceland winter rental.",
            url: "https://www.bluecarrental.is/our-cars/dacia-duster/", urlLabel: "Book it", maps: "Blue Car Rental Keflavik Airport",
            credit: "Photo: (G)jabz, Wikimedia Commons.",
            two: CARS.mid.trip, each: CARS.mid.trip / PEOPLE, est: false, sub: money(CARS.mid.daily) + " a day, plus Full Cover, for 6 days." },
          { id: "premium", label: "Defender 110", title: "Land Rover Defender 110", rec: true, photoKey: "car_defender",
            pitch: "A Land Rover Defender 110, a 5-door automatic 4x4. The Defender 90 was not listed in Iceland.",
            url: "https://www.bluecarrental.is/our-cars/land-rover-defender/", urlLabel: "Book it",
            url2: "https://www.hertz.is/vehicle_guide/pfan/", url2Label: "Hertz Defender 110",
            maps: "Blue Car Rental Keflavik Airport",
            credit: "Photo: DestinationFearFan, Wikimedia Commons.",
            two: CARS.premium.trip, each: CARS.premium.trip / PEOPLE, est: true, sub: "est. " + money(CARS.premium.daily) + " a day, plus Full Cover, for 6 days." }
        ] },
      { id: "food-budget", kind: "food", day: "Most days", title: "A daily food budget",
        pitch: "A daily food budget for meals that are not already booked.",
        desc: "Default is $150 a person a day, for 6 days. The restaurant cards are priced separately. Edit the daily rate in Compare.",
        winter: "Some cafes may be closed on January 1. A greenhouse, a hot-dog stand, or a hotel restaurant may still be open.",
        photoKey: "tides", rec: false,
        url: "", urlLabel: "", maps: "",
        priceFn: function (ctx) {
          var two = ctx.foodRate * ctx.foodDays * PEOPLE;
          return { two: two, each: two / PEOPLE, est: true, sub: money(ctx.foodRate) + " a person a day, times " + ctx.foodDays + " days." };
        } },
      { id: "ice-plan", kind: "sidetrips", day: "Dec 30 or Jan 2", title: "The ice cave plan",
        defaultTier: "jokulsarlon",
        winter: "Caves and lagoon ice depend on the weather. A guided trip is the simpler option.",
        tiers: [
          { id: "jokulsarlon", label: "Hofn overnight", title: "Hotel Hofn, for the glacier overnight", rec: true, photoKey: "jokulsarlon",
            pitch: "Fly east for one night. This includes the Crystal Ice Cave Adventure and Diamond Beach.",
            url: "https://glacieradventure.is/tour/crystal-ice-cave-adventure/", urlLabel: "Book it",
            maps: "Hotel Hofn Iceland",
            priceFn: function (ctx) {
              var two = 115 * 2 * PEOPLE + ((ctx.iceCave === "long" ? 290 : (ctx.iceCaveRate || 175)) * PEOPLE) + (ctx.hofnRate || 250);
              return { two: two, each: two / PEOPLE, est: true, sub: "Planning estimate. Includes the Hofn hotel night, domestic flights, and Glacier Adventure's Crystal Ice Cave Adventure (3 hours, meet at Hali, no pickup from Hofn)." };
            } },
          { id: "katla", label: "Katla day cave", title: "Katla Fast Track ice cave on January 2", photoKey: "katla",
            pitch: "Katla Track's Fast Track Katla Ice Cave tour on January 2, if you do not take the glacier overnight. The official tour is 2.5 to 3 hours. You meet in Vik. Pickup from Reykjavik is not included. Helmets, crampons, and headlamps are included.",
            url: "https://katlatrack.is/all-tours/ice-cave-tours/katla-fast-track-ice-cave-tour/", urlLabel: "Book it",
            maps: "Katla ice cave Iceland",
            two: KATLA, each: KATLA / PEOPLE, est: true, sub: "From about 23,990 ISK per person, a planning figure. Confirm the current price on Katla Track." },
          { id: "skip", label: "Skip the caves", title: "Skip the ice caves", photoKey: "edition_ext",
            pitch: "Skip the ice caves and stay closer to town.",
            two: 0, each: 0, est: false, sub: "Nothing added for a cave or a Hofn night." }
        ] }
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
    { id: "dec28", date: "Dec 28, Monday", title: "Departure from Denver at 3:40 PM",
      slots: [
        { key: "flight", label: "the flight", ids: ["flight"] },
        { key: "hold", label: "Dec 28 hotel", ids: ["hold-dec28"], optional: true }
      ], items: [] },
    { id: "dec29", date: "Dec 29, Tuesday", title: "Land at 6:05 AM, then Reykjavik",
      slots: [{ key: "hotel", label: "Dec 29 hotel", ids: ["stay-edition", "stay-retreat"] }],
      items: ["harpa_walk", "shopping_downtown", "grotta", "sky_lagoon", "tides", "wool_shops"] },
    { id: "dec30", date: "Dec 30, Wednesday", title: "Glacier overnight or a day in town",
      slots: [
        { key: "hotel", label: "Dec 30 hotel", ids: ["ice-plan", "stay-edition", "stay-retreat"] },
        { key: "ice", label: "the ice cave plan", ids: ["ice-plan"] }
      ], items: ["nl_guided", "nl_self"] },
    { id: "dec31", date: "Dec 31, Thursday", title: "New Year's Eve in Reykjavik",
      slots: [{ key: "hotel", label: "Dec 31 hotel", ids: ["stay-edition"] }],
      items: ["nye_dinner", "nye_bonfire", "aramotaskaup", "nye_fireworks", "dill", "grillmarkadurinn"] },
    { id: "jan1", date: "Jan 1, Friday", title: "Horse ride and the Golden Circle",
      slots: [{ key: "hotel", label: "Jan 1 hotel", ids: ["stay-edition", "stay-retreat"] }],
      items: ["horses", "golden_circle", "fridheimar", "fontana", "silfra", "tides", "hvammsvik"] },
    { id: "jan2", date: "Jan 2, Saturday", title: "South Coast or a glass cabin",
      slots: [
        { key: "hotel", label: "Jan 2 hotel", ids: ["sky-cabin", "stay-retreat", "stay-edition"] }
      ], items: ["south_coast", "kolaportid", "wool_shops"] },
    { id: "jan3", date: "Jan 3, Sunday", title: "Blue Lagoon, then a 4:55 PM flight home",
      slots: [], items: ["blue_lagoon", "edition_spa", "retreat_massage", "moss"] }
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
    var flightT = has("flight") ? tierOf("flight", "standard") : "";
    sim.flightClass = (flightT && FLIGHT_FARES[flightT]) ? flightT : (flightT ? "standard" : "");
    sim.holdDec28 = has("hold-dec28");
    var roomT = has("stay-edition") ? tierOf("stay-edition", "suite") : "";
    sim.suiteNights = roomT === "suite" ? 5 : 0;
    sim.superiorNights = roomT === "superior" ? 5 : 0;
    sim.retreatNights = has("stay-retreat") ? 2 : 0;
    var skyT = has("sky-cabin") ? tierOf("sky-cabin", "pano-standard") : "";
    sim.panoNights = (skyT === "pano-standard" || skyT === "pano-premium") ? 1 : 0;
    sim.panorama = skyT === "pano-premium" ? "premium" : "standard";
    sim.buubbleNights = skyT === "buubble" ? 1 : 0;
    sim.auroraNights = skyT === "aurora" ? 1 : 0;
    var iceT = has("ice-plan") ? tierOf("ice-plan", "jokulsarlon") : "";
    sim.hofnNights = iceT === "jokulsarlon" ? 1 : 0;
    sim.hofnFlights = iceT === "jokulsarlon";
    sim.iceCave = iceT === "jokulsarlon" ? (r.iceCave || "standard") : "none";
    sim.blVisits = has("blue_lagoon") ? Math.max(1, r.blVisits || 1) : 0;
    sim.blTier = r.blTier || "lava";
    sim.nlTour = has("nl_guided");
    sim.carId = has("car") ? (tierOf("car", "premium") || "") : "";
    sim.foodOn = has("food-budget");
    sim.picks = {};
    CATALOG.forEach(function (c) { sim.picks[c.id] = has(c.id); });
    if (iceT === "jokulsarlon") sim.picks.jokulsarlon = true;
    if (iceT === "katla") sim.picks.katla = true;
    var away = sim.retreatNights + sim.panoNights + sim.buubbleNights + sim.auroraNights + sim.hofnNights;
    if (sim.suiteNights) sim.suiteNights = Math.max(0, sim.suiteNights - away);
    if (sim.superiorNights) sim.superiorNights = Math.max(0, sim.superiorNights - away);
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
    else if (sim.flightClass) flightsIntl = FLIGHT_FARES.standard.two;
    var flightsHofn = sim.hofnFlights ? 115 * 2 * PEOPLE : 0;
    var holdCost = sim.holdDec28 ? ((sim.superiorNights && !sim.suiteNights) ? SUPERIOR_RATE : (sim.suiteRate || 2340)) : 0;
    /* Hofn hotel and domestic flights are already in the jokulsarlon package price. */
    var lodgingEdition = sim.superiorNights * SUPERIOR_RATE + (sim.suiteNights ? sim.suiteNights * sim.suiteRate : 0) + holdCost;
    var lodgingRetreat = sim.retreatNights * sim.retreatRate;
    var lodgingPano = sim.panoNights * (sim.panorama === "premium" ? PANO.premium : PANO.standard);
    var lodgingBuubble = sim.buubbleNights * BUUBBLE_RATE;
    var lodgingAurora = sim.auroraNights * sim.auroraRate;
    var lodging = lodgingEdition + lodgingRetreat + lodgingPano + lodgingBuubble + lodgingAurora;
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
      lodgingEdition: lodgingEdition, lodgingRetreat: lodgingRetreat,
      lodgingPano: lodgingPano, lodgingBuubble: lodgingBuubble, lodgingAurora: lodgingAurora,
      lodging: lodging, extra: extra, food: food, car: car,
      total: total, each: total / PEOPLE, sim: sim
    };
  }

  function cardPrice(c, idsForCtx) {
    var ctx = ratesCtx();
    c = viewCard(c);
    if (c.priceFn) return c.priceFn(ctx);
    var sim = applyChoices(idsForCtx || (lockedIds().concat(yesIdsFrom(state.picks))));
    if (c.source) {
      var two = itemPriceOn(c.source, sim);
      return { two: two, each: two / PEOPLE, est: !!c.source.est, sub: c.priceNote || "" };
    }
    return { two: 0, each: 0, est: false, sub: "" };
  }

  function priceLabel(c) {
    var p = cardPrice(c);
    var big = (p.est ? "est. " : "") + money(p.two) + " for two";
    var sub = money(p.each) + " per person" + (p.sub ? ". " + p.sub : "");
    return { big: big, sub: sub, two: p.two, each: p.each, est: p.est };
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

  var BUILD = "20261114-duo4";

  function keptSearch() {
    try {
      var params = new URLSearchParams(location.search);
      if (params.has("debug")) {
        return "?debug=" + encodeURIComponent(params.get("debug") || "1");
      }
    } catch (e) {}
    return "";
  }

  function hasDebugFlag() {
    try {
      if (new URLSearchParams(location.search).get("debug") === "1") return true;
    } catch (e) {}
    try {
      var hash = location.hash || "";
      if (/(?:^|[?&#])debug=1(?:&|$)/.test(hash)) return true;
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
    if (el) el.hidden = false;
    document.body.classList.add("confirm-open");
    var ok = document.getElementById("resetOk");
    if (ok) ok.focus();
  }
  function closeResetConfirm() {
    var el = document.getElementById("resetConfirm");
    if (el) el.hidden = true;
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
    var h = (location.hash || "#pick").replace(/^#/, "");
    if (h === "us") h = "compare";
    if (h === "pick" || h === "compare" || h === "plan") return h;
    return "pick";
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
    if (tab === "plan" && overviewMap) {
      setTimeout(function () { if (overviewMap) overviewMap.invalidateSize(); }, 60);
    }
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
    var t = computeFrom(lockedIds());
    var el = document.getElementById("chipTotal");
    if (el) el.textContent = money(t.total);
    var chip = document.getElementById("lockedChip");
    if (chip && lastChip !== null && lastChip !== t.total) {
      chip.classList.remove("is-bump");
      void chip.offsetWidth;
      chip.classList.add("is-bump");
    }
    lastChip = t.total;
  }

  function hotelForNight(night, locked) {
    var has = function (id) { return locked.indexOf(id) !== -1; };
    if (night === "dec30" && has("ice-plan") && cardTierId(DECK_MAP["ice-plan"]) === "jokulsarlon") return "ice-plan";
    if ((night === "jan1" || night === "jan2") && has("stay-retreat")) return "stay-retreat";
    if (night === "jan2" && has("sky-cabin")) {
      var sky = cardTierId(DECK_MAP["sky-cabin"]);
      if (sky && sky !== "town") return "sky-cabin";
    }
    if (has("stay-edition")) return "stay-edition";
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
      if (locked.indexOf(id) === -1 && id !== "flight") return;
      if (id === "flight" && dayId === "jan3") { keys.push("kef"); return; }
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
    if (has("car") && cardTierId(DECK_MAP["car"]) !== "none") {
      items.push({ id: "scraper", label: "An ice scraper for the car." });
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
    var keys = ["kef", "edition"];
    locked.forEach(function (id) {
      expandPlaces(id).forEach(function (k) { keys.push(k); });
    });
    keys = uniqueKeys(keys);
    if (keys.length <= 3) return uniqueKeys(keys.concat(T.PREVIEW_PLACES || []));
    return keys;
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

  function drawOverview() {
    var el = document.getElementById("overviewMap");
    if (!el || typeof L === "undefined") return;
    if (overviewMap) {
      overviewMap.remove();
      overviewMap = null;
    }
    el.innerHTML = "";
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
    var keys = overviewKeys(lockedIds());
    var bounds = addPins(overviewMap, keys);
    addLegs(overviewMap, overviewLegs(keys));
    fitOrCenter(overviewMap, bounds);
    setOverviewInteractive(false);
    setTimeout(function () { if (overviewMap) overviewMap.invalidateSize(); }, 80);
  }

  function initOverviewMap() {
    loadRoutes().then(function () { drawOverview(); });
  }

  function destroyDayMaps() {
    Object.keys(dayMaps).forEach(function (k) {
      try { dayMaps[k].remove(); } catch (e) {}
    });
    dayMaps = {};
  }

  function drawDayMap(dayId, el) {
    if (!el || typeof L === "undefined") return;
    if (dayMaps[dayId]) {
      try { dayMaps[dayId].remove(); } catch (e) {}
      dayMaps[dayId] = null;
    }
    el.innerHTML = "";
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
    var keys = placesForDay(dayId, lockedIds());
    if (!keys.length) keys = ["edition"];
    var bounds = addPins(map, keys);
    addLegs(map, legsForDay(dayId, lockedIds()));
    fitOrCenter(map, bounds);
    dayMaps[dayId] = map;
    setTimeout(function () { map.invalidateSize(); }, 80);
  }

  function initDayMaps() {
    destroyDayMaps();
    var nodes = document.querySelectorAll("[data-day-map]");
    if (!nodes.length) return;
    loadRoutes().then(function () {
      nodes.forEach(function (el) {
        drawDayMap(el.getAttribute("data-day-map"), el);
      });
    });
  }

  function dayMapHtml(dayId) {
    if (!placesForDay(dayId, lockedIds()).length) return "";
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
      try { fullMap.remove(); } catch (e) {}
      fullMap = null;
    }
    host.innerHTML = "";
    loadRoutes().then(function () {
      fullMap = L.map(host, {
        zoomControl: true,
        attributionControl: true,
        dragging: true,
        scrollWheelZoom: true,
        touchZoom: true,
        doubleClickZoom: true
      });
      cartoLayer().addTo(fullMap);
      var keys = placesForDay(dayId, lockedIds());
      var bounds = addPins(fullMap, keys);
      addLegs(fullMap, legsForDay(dayId, lockedIds()));
      fitOrCenter(fullMap, bounds);
      setTimeout(function () { if (fullMap) fullMap.invalidateSize(); }, 80);
    });
  }

  function closeMapLayer() {
    var layer = document.getElementById("mapLayer");
    if (layer) layer.hidden = true;
    document.body.classList.remove("map-open");
    if (fullMap) {
      try { fullMap.remove(); } catch (e) {}
      fullMap = null;
    }
  }


  function renderPlanItem(id) {
    var raw = DECK_MAP[id];
    if (!raw) return "";
    var c = viewCard(raw);
    var pl = priceLabel(raw);
    var imgKey = c.photoKey;
    var thumb = PHOTO_URLS[imgKey] ? '<a class="card-photo" href="' + esc(c.url || "#") + '" ' + (c.url ? 'target="_blank" rel="noopener"' : "") + "><img src=\"" + PHOTO_URLS[imgKey] + "\" alt=\"" + esc(c.title) + "\"></a>" : '<div class="ph"></div>';
    if (!c.url) thumb = PHOTO_URLS[imgKey] ? '<img src="' + PHOTO_URLS[imgKey] + '" alt="' + esc(c.title) + '">' : '<div class="ph"></div>';
    var change = raw.tiers ? ' <button type="button" class="change-link" data-jump="' + esc(id) + '">Change</button>' : "";
    return '<div class="plan-item" data-locked="' + esc(id) + '">' + thumb + "<div>" +
      '<p class="lock">' + icon("lock") + " Locked" + (c.tierLabel ? " · " + esc(c.tierLabel) : "") + change + "</p>" +
      "<h3>" + (c.url ? '<a class="card-title" href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(c.title) + "</a>" : esc(c.title)) + "</h3>" +
      '<p class="price">' + pl.big + "</p>" +
      durationLine(id) +
      (c.winter ? '<p class="tip"><strong>Winter:</strong> ' + esc(c.winter) + "</p>" : "") +
      placeLinks(c) +
      '<button type="button" class="ghost unlock-btn" data-unlock="' + esc(id) + '">Unlock</button>' +
      "</div></div>";
  }

  function renderPlan() {
    var locked = lockedIds();
    var empty = document.getElementById("planEmpty");
    var daysEl = document.getElementById("planDays");
    if (empty) empty.hidden = locked.length > 0;
    if (!daysEl) return;
    var html = "";
    /* trip-level slots */
    var carLocked = locked.indexOf("car") !== -1;
    var foodLocked = locked.indexOf("food-budget") !== -1;
    html += '<div class="day-block"><p class="when">Getting around and meals</p><h2>For the whole week</h2>';
    if (carLocked) html += renderPlanItem("car");
    else html += '<button type="button" class="undecided" data-jump="car">Still deciding: the rental car</button>';
    if (foodLocked) html += renderPlanItem("food-budget");
    else html += '<button type="button" class="undecided" data-jump="food-budget">Still deciding: a daily food budget</button>';
    html += "</div>";

    var lastHotel = "";
    DAYS.forEach(function (day) {
      html += '<article class="day-block" id="day-' + day.id + '"><p class="when">' + esc(day.date) + "</p><h2>" + esc(day.title) + "</h2>";
      html += dayScheduleHtml(day, locked);
      day.slots.forEach(function (slot) {
        var chosen = null;
        if (slot.key === "hotel") chosen = hotelForNight(day.id, locked);
        else {
          for (var i = 0; i < slot.ids.length; i++) {
            if (locked.indexOf(slot.ids[i]) !== -1) { chosen = slot.ids[i]; break; }
          }
        }
        if (chosen && (slot.key !== "ice" || chosen === "ice-plan")) {
          if (slot.key === "ice" && chosen === "ice-plan" && hotelForNight(day.id, locked) === "ice-plan") return;
          if (slot.key === "hotel" && chosen === lastHotel && (chosen === "stay-edition" || chosen === "stay-retreat")) {
            html += '<div class="plan-item compact"><div></div><div><p class="lock">' + icon("lock") + ' Locked</p><h3>' + esc(displayName(chosen)) + "</h3><p class='pitch-meta'>Your hotel for this night. Already counted in the total.</p></div></div>";
          } else {
            html += renderPlanItem(chosen);
          }
          if (slot.key === "hotel") lastHotel = chosen;
        } else if (!slot.optional || slot.key === "hold") {
          if (slot.optional && !chosen) {
            html += '<button type="button" class="undecided" data-jump="' + esc(slot.ids[0]) + '">Still deciding: ' + esc(slot.label) + " (optional)</button>";
          } else if (!chosen) {
            html += '<button type="button" class="undecided" data-jump="' + esc(slot.ids[0]) + '">Still deciding: ' + esc(slot.label) + "</button>";
          }
          if (slot.key === "hotel") lastHotel = "";
        }
      });
      day.items.forEach(function (id) {
        if (locked.indexOf(id) !== -1) html += renderPlanItem(id);
      });
      html += '<div class="day-meta">' + dayMapHtml(day.id) + "</div>";
      html += "</article>";
    });
    destroyDayMaps();
    daysEl.innerHTML = html;
    initDayMaps();
    initOverviewMap();

    renderVideos(locked);
    var ready = document.getElementById("readyList");
    if (ready) {
      if (!locked.length) ready.innerHTML = "<p class='sub'>Nothing is locked yet, so there is nothing to book.</p>";
      else ready.innerHTML = locked.map(function (id) {
        var raw = DECK_MAP[id];
        var c = viewCard(raw);
        var book = bookingFor(id);
        var link = c.url ? siteLinkHtml(c.url) : "<span>No official booking page for this one.</span>";
        var due = book ? '<br><em class="deadline">' + esc(book.text) + "</em>" : "";
        var cls = "ready-item" + (book ? " due-" + book.urgency : "") + (state.booked && state.booked[id] ? " is-done" : "");
        var chk = (state.booked && state.booked[id]) ? " checked" : "";
        return '<label class="' + cls + '"><input type="checkbox" data-booked="' + esc(id) + '"' + chk + "> <span><strong>" + esc(c.title) + "</strong><br>" + link + due + "</span></label>";
      }).join("");
    }
  }

  var VIDEO_FOR = {
    "stay-edition": "edition", "hold-dec28": "edition",
    sky_lagoon: "sky", "ice-plan": "jokulsarlon",
    nye_fireworks: "nye", nye_bonfire: "nye", horses: "horses",
    golden_circle: "golden", south_coast: "south",
    "sky-cabin": "panorama"
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
    var voted = DECK.filter(function (c) { return myYes(c.id) || myPass(c.id); }).length;
    if (prog) prog.textContent = Math.min(voted + (currentCard() ? 1 : 0), DECK.length) + " of " + DECK.length;
    var card = currentCard();
    if (!card) {
      if (deck) deck.innerHTML = "";
      if (actions) actions.hidden = true;
      if (view) view.classList.remove("has-actions");
      if (end) { end.hidden = false; end.innerHTML = endHtml(); }
      if (lastPickShown !== "") { lastPickShown = ""; scrollPickTop(); }
      return;
    }
    if (actions) actions.hidden = false;
    if (view) view.classList.add("has-actions");
    if (end) end.hidden = true;
    var next = remainingCards().filter(function (c) { return c.id !== card.id; })[0];
    var html = "";
    if (next) html += swipeCardHtml(next, false);
    html += swipeCardHtml(card, true);
    if (deck) deck.innerHTML = html;
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
      "<b>" + money(t.total) + "</b><small class='sub'>locked for two, " + money(t.each) + " per person.</small>" +
      (waiting.length && state.player !== "both" ? "<p class='sub'>If all of your picks were locked, the total would be " + money(tYes.total) + " for two, waiting on " + esc(other) + " for " + waiting.length + " of them.</p>" : "") +
      "<h3>Locked</h3>" + (locked.length ? "<ul>" + locked.map(function (id) { return "<li>" + esc(displayName(id)) + "</li>"; }).join("") + "</ul>" : "<p>Nothing locked yet.</p>") +
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
      '<div class="match-card match-totals"><h3>Locked total for two</h3><b>' + money(tLock.total) + "</b><small>" + money(tLock.each) + " per person</small>" +
      "<h3 style='margin-top:16px'>If all of your picks were locked</h3><b>" + money(tYes.total) + "</b><small>" + money(tYes.each) + " per person, including things still waiting on a match.</small></div>" +
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
      ["comfort","premium","lava"].map(function (t) { return '<option value="' + t + '"' + (r.blTier === t ? " selected" : "") + ">" + t + " · " + money(BL[t]) + " pp</option>"; }).join("") +
      "</select>";
    body.innerHTML =
      row("suiteRate", "EDITION Deluxe Suite, per night (USD)", "number", r.suiteRate, "10") +
      row("retreatRate", "Retreat suite, per night (USD)", "number", r.retreatRate, "10") +
      row("hofnRate", "Hotel Hofn, per night (USD)", "number", r.hofnRate, "10") +
      row("auroraRate", "Aurora Igloo estimate, per night (USD)", "number", r.auroraRate, "10") +
      row("foodRate", "Food budget per person per day (USD)", "number", r.foodRate, "5") +
      row("foodDays", "Food budget days", "number", r.foodDays, "1") +
      '<div class="cost-row"><label for="blTier">Blue Lagoon tier, used when that card is locked</label>' + sel + "</div>" +
      row("blVisits", "Blue Lagoon visits (Retreat stays credit one)", "number", r.blVisits, "1") +
      row("iceCaveRate", "Standard ice cave, per person (USD)", "number", r.iceCaveRate, "5") +
      row("nlRate", "Guided lights tour, per person (USD)", "number", r.nlRate, "5") +
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
        title: "Use the chips on a card to choose a flight class, room, cabin, car, or ice-cave plan."
      });
      slides.push({
        photo: "images/welcome/locked.png",
        alt: "A locked item with a lock icon",
        title: "An item locks when you both say yes to the same option."
      });
      slides.push({
        photo: "images/welcome/plan.png",
        alt: "The Plan tab with locked days filling in",
        title: "Locked items appear on the Plan tab."
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
    renderWelcome();
    var el = document.getElementById("welcome");
    if (el) el.hidden = false;
    document.body.classList.add("welcome-open");
  }
  function closeWelcome() {
    welcomeOpen = false;
    state.welcomeSeen = true;
    var el = document.getElementById("welcome");
    if (el) el.hidden = true;
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
        if (whoAt >= 0) { welcomeIndex = whoAt; renderWelcome(); return; }
      }
      closeWelcome();
      return;
    }
    welcomeIndex++;
    renderWelcome();
  }
  function welcomePrev() {
    if (welcomeIndex <= 0) return;
    welcomeIndex--;
    renderWelcome();
  }
  function welcomeSkip() {
    var slides = welcomeSlides();
    if (!state.player) {
      var whoAt = -1;
      slides.forEach(function (s, i) { if (s.who) whoAt = i; });
      if (whoAt >= 0 && welcomeIndex !== whoAt) { welcomeIndex = whoAt; renderWelcome(); return; }
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
    if (el) el.hidden = true;
    document.body.classList.remove("welcome-open");
    welcomeOpen = false;
  }

  function openCosts() {
    renderCosts();
    var el = document.getElementById("costs");
    if (el) el.hidden = false;
    document.body.classList.add("costs-open");
  }
  function closeCosts() {
    var el = document.getElementById("costs");
    if (el) el.hidden = true;
    document.body.classList.remove("costs-open");
  }

  /* ---------- swipe ---------- */
  function applyDrag(dx, card) {
    if (!card) return;
    var rot = dx / 18;
    card.style.transform = "translateX(" + dx + "px) rotate(" + rot + "deg)";
    var inn = card.querySelector(".stamp.in");
    var out = card.querySelector(".stamp.out");
    if (inn) inn.style.opacity = dx > 0 ? Math.min(1, dx / 100) : 0;
    if (out) out.style.opacity = dx < 0 ? Math.min(1, -dx / 100) : 0;
  }
  function clearDrag(card) {
    if (!card) return;
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
        if (dx > 80) { voted = true; vote(id, true); }
        else if (dx < -80) { voted = true; vote(id, false); }
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
      if (wdot) { welcomeIndex = Number(wdot.getAttribute("data-welcome-dot")) || 0; renderWelcome(); return; }
      if (e.target.closest("#btnIn")) {
        var c = currentCard();
        if (c) vote(c.id, true);
        return;
      }
      if (e.target.closest("#btnPass")) {
        var c2 = currentCard();
        if (c2) vote(c2.id, false);
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
      if (field in state.rates) state.rates[field] = val;
      afterChange();
    });
    bindSwipe();
    bindWelcomeSwipe();
    window.addEventListener("hashchange", function () { route(); render(); });
    window.addEventListener("resize", syncFoldShell);
    window.addEventListener("orientationchange", syncFoldShell);
    try {
      var segsMq = window.matchMedia("(horizontal-viewport-segments: 2)");
      if (segsMq.addEventListener) segsMq.addEventListener("change", syncFoldShell);
      else if (segsMq.addListener) segsMq.addListener(syncFoldShell);
    } catch (e) {}
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
    /* Class decision uses innerWidth vs innerHeight only. Chrome iOS on the
       Duo can report orientation: landscape, a wide clientWidth, or a
       small screen.width while the visible window is upright. */
    var landscape = (innerW > innerH) && (innerW >= 800);
    var portraitOpen = !landscape && innerW >= 520;
    var wide = widestOffender();
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
      hSegs: mqMatches("(horizontal-viewport-segments: 2)"),
      vSegs: mqMatches("(vertical-viewport-segments: 2)"),
      width: innerW, height: innerH,
      landscape: landscape, portraitOpen: portraitOpen,
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
    var classes = [];
    if (document.body.classList.contains("fold-landscape")) classes.push("fold-landscape");
    if (document.body.classList.contains("fold-portrait")) classes.push("fold-portrait");
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
      "mq (horizontal-viewport-segments: 2) " + snap.hSegs,
      "mq (vertical-viewport-segments: 2) " + snap.vSegs,
      "body " + (classes.length ? classes.join(" ") : "(none)"),
      wideLine,
      "build " + snap.build
    ].join("\n");
  }

  function syncFoldShell() {
    var snap = foldSnapshot();
    document.body.classList.toggle("fold-landscape", snap.landscape);
    document.body.classList.toggle("fold-portrait", snap.portraitOpen);
    updateFoldDebug(snap);
  }

  function boot() {
    buildDeck();
    load();
    cleanQs();
    if (location.hash === "#us") {
      try { history.replaceState({}, "", pageUrl("#compare")); } catch (e) {}
    } else if (!location.hash || location.hash === "#") {
      try { history.replaceState({}, "", pageUrl("#pick")); } catch (e) {}
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
