/* Scott & Jerm Versus Iceland */
(function () {
  "use strict";
  var D = window.ICELAND_DATA;
  var PEOPLE = D.PEOPLE;
  var TRIP_NIGHTS = D.TRIP_NIGHTS;
  var BL = D.BL;
  var FLIGHT = D.FLIGHT;
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

  function coreCards() {
    return [
      { id: "flight-economy", kind: "flight", group: "flight-cabin", day: "Dec 28", title: "Icelandair in economy",
        pitch: "The overnight coach seat. Denver at 3:40 PM, Keflavik at dawn. Sleep is optional. Iceland is not.",
        desc: "Icelandair FI670, a 737 MAX, about 7 hours. You land at 6:05 AM on Dec 29. The return is Jan 3 at 4:55 PM, back in Denver at 6:00 PM.",
        winter: "Delta's JFK, MSP, and DTW flights to KEF are summer-only. Late December is Icelandair weather.",
        photoKey: "icelandair", rec: true,
        url: "https://www.icelandair.com/flights/from-denver-to-reykjavik/", urlLabel: "Book it",
        maps: "Denver International Airport",
        priceFn: function () { return { two: FLIGHT.economy * PEOPLE, each: FLIGHT.economy, est: false }; } },
      { id: "flight-business", kind: "flight", group: "flight-cabin", day: "Dec 28", title: "Icelandair in business",
        pitch: "Same FI670, a better seat, and a slightly more civilized 6:05 AM landing.",
        desc: "Same dates and aircraft, just more horizontal. The return is still Jan 3 at 4:55 PM.",
        winter: "Still an overnight flight. Business just makes the dawn less theatrical.",
        photoKey: "icelandair", rec: false,
        url: "https://www.icelandair.com/flights/from-denver-to-reykjavik/", urlLabel: "Book it",
        maps: "Denver International Airport",
        priceFn: function () { return { two: FLIGHT.business * PEOPLE, each: FLIGHT.business, est: false }; } },
      { id: "hold-dec28", kind: "stay", day: "Dec 28", title: "Arrive a day early, Dec 28",
        pitch: "Hold a room on Dec 28, and greet the 6:05 AM version of yourselves with an actual bed?",
        desc: "The published plan lands at dawn on Dec 29. This is the optional extra night, priced at whatever EDITION room you lock.",
        winter: "If you hold the room, you still take FI670 a day earlier, or you arrive some other way. Check the same winter-daylight rules.",
        photoKey: "edition_ext", rec: false,
        url: "https://www.editionhotels.com/reykjavik/", urlLabel: "Book it",
        maps: "The Reykjavik EDITION",
        priceFn: function (ctx) {
          var rate = ctx.suiteOn ? ctx.suiteRate : (ctx.superiorOn ? SUPERIOR_RATE : ctx.suiteRate);
          return { two: rate, each: rate / PEOPLE, est: false, sub: "Per room for the night, at the " + (ctx.superiorOn && !ctx.suiteOn ? "Superior King" : "Deluxe Suite") + " rate." };
        } },
      { id: "stay-edition-suite", kind: "stay", group: "edition-room", day: "Dec 29 to Jan 3", title: "EDITION Deluxe Suite, five nights",
        pitch: "A Deluxe Suite at the EDITION, a harbor window, five nights, and a free-cancel window through Nov 28.",
        desc: "Check in Dec 29, check out Jan 3. Harbor-side, next to Harpa. A night away, like Hofn or a glass cabin, trims this automatically so you do not pay twice.",
        winter: "Yes, the suite number is real. Sidewalks can be ice rinks in nicer clothes.",
        photoKey: "edition_room", rec: true,
        url: "https://www.editionhotels.com/reykjavik/", urlLabel: "Book it",
        maps: "The Reykjavik EDITION",
        priceFn: function (ctx) { return { two: 5 * ctx.suiteRate, each: (5 * ctx.suiteRate) / PEOPLE, est: false, sub: money(ctx.suiteRate) + " a night for the room, not per person. Away nights trim the total." }; } },
      { id: "stay-edition-superior", kind: "stay", group: "edition-room", day: "Dec 29 to Jan 3", title: "EDITION Superior King, five nights",
        pitch: "Same hotel, a Superior King, and about half the nightly bill. The harbor is still right there.",
        desc: "Five nights, Dec 29 to Jan 3, in the smaller room at the same address. Away nights trim this too.",
        winter: "The free-cancel window still matters. So does a shoe with grip.",
        photoKey: "edition_ext", rec: false,
        url: "https://www.editionhotels.com/reykjavik/", urlLabel: "Book it",
        maps: "The Reykjavik EDITION",
        priceFn: function () { return { two: 5 * SUPERIOR_RATE, each: (5 * SUPERIOR_RATE) / PEOPLE, est: false, sub: money(SUPERIOR_RATE) + " a night for the room. Away nights trim the total." }; } },
      { id: "stay-retreat", kind: "stay", day: "Jan 1 and Jan 2", title: "The Retreat at Blue Lagoon, two nights",
        pitch: "Two nights at The Retreat, lagoon included, in-water massage very much not.",
        desc: "A lagoon-view junior suite at the default $2,840 a night. A 2-night minimum may apply. These two nights replace two EDITION nights near the end of the week.",
        winter: "The lagoon stays about 98 to 104 F. The parking lot does not.",
        photoKey: "retreat_suite", rec: false,
        url: "https://www.bluelagoon.com/accommodation/retreat-hotel", urlLabel: "Book it",
        maps: "The Retreat at Blue Lagoon",
        priceFn: function (ctx) { return { two: 2 * ctx.retreatRate, each: (2 * ctx.retreatRate) / PEOPLE, est: false, sub: money(ctx.retreatRate) + " a night for the suite. The lagoon is included." }; } },
      { id: "stay-panorama-standard", kind: "stay", group: "sky-cabin", day: "Jan 2", title: "Panorama Glass Lodge, Standard",
        pitch: "A glass cabin in a field, one night, under a sky that may just send clouds.",
        desc: "Priced per cabin, not per person. This would replace one EDITION night, on Jan 2, the South Coast evening.",
        winter: "It will be dark, and it may be windy. That is rather the point.",
        photoKey: "panorama", rec: true,
        url: "https://panoramaglasslodge.com/", urlLabel: "Book it",
        maps: "Panorama Glass Lodge Iceland",
        priceFn: function () { return { two: PANO.standard, each: PANO.standard / PEOPLE, est: false, sub: "Per cabin for the night, not per person." }; } },
      { id: "stay-panorama-premium", kind: "stay", group: "sky-cabin", day: "Jan 2", title: "Panorama Glass Lodge, Premium",
        pitch: "Same glass box, Premium, because if you are paying to sleep under the sky, you might as well go in.",
        desc: "Still one cabin, one night, still not per person. Also a Jan 2 swap for an EDITION night.",
        winter: "The sky, being Icelandic, may just send clouds. The Premium cabin will not bribe it.",
        photoKey: "panorama_premium", rec: false,
        url: "https://panoramaglasslodge.com/", urlLabel: "Book it",
        maps: "Panorama Glass Lodge Iceland",
        priceFn: function () { return { two: PANO.premium, each: PANO.premium / PEOPLE, est: false, sub: "Per cabin for the night, not per person." }; } },
      { id: "stay-buubble", kind: "stay", group: "sky-cabin", day: "Jan 2", title: "Buubble, one night",
        pitch: "A clear plastic dome in a dark field. Bring humility, and maybe a beanie for the walk to the bathroom.",
        desc: "One cabin for the night, a Jan 2 alternative to the glass lodge or staying in town.",
        winter: "The walk to the bathroom is part of the lore. Dress for it.",
        photoKey: "buubble", rec: false,
        url: "https://buubble.com/", urlLabel: "Book it",
        maps: "Buubble Iceland",
        priceFn: function () { return { two: BUUBBLE_RATE, each: BUUBBLE_RATE / PEOPLE, est: false, sub: "Per cabin for the night." }; } },
      { id: "stay-aurora", kind: "stay", group: "sky-cabin", day: "Jan 2", title: "Aurora Igloo, one night",
        pitch: "An aurora igloo night. We do not have a researched holiday quote, so this is an honest estimate.",
        desc: "One night, editable in Edit costs, another Jan 2 sky-ceiling option.",
        winter: "Treat the estimate as a placeholder until you have a real quote.",
        photoKey: "aurora_igloo", rec: false,
        url: "https://auroraigloo.is/", urlLabel: "Book it",
        maps: "Aurora Igloo Iceland",
        priceFn: function (ctx) { return { two: ctx.auroraRate, each: ctx.auroraRate / PEOPLE, est: true, sub: "Estimated, per cabin. Edit the rate in Us." }; } },
      { id: "car-none", kind: "car", group: "car", day: "The whole week", title: "No rental car",
        pitch: "No rental car. Tours, walking, and the occasional very confident taxi.",
        desc: "Fine for a Reykjavik-heavy week. Tighter if you want the South Coast or the Golden Circle on your own clock.",
        winter: "Sidewalks can be ice. Tours still run, slowly.",
        photoKey: "car_none", rec: false,
        url: "", urlLabel: "", maps: "Reykjavik city center",
        priceFn: function () { return { two: 0, each: 0, est: false, sub: "Zero on the car line, on purpose." }; } },
      { id: "car-budget", kind: "car", group: "car", day: "The whole week", title: "Toyota Yaris, the honest little car",
        pitch: "Automatic, front-wheel drive, and perfectly fine until the wind starts auditioning.",
        desc: "Blue Car Rental, KEF, Dec 29 at 7:00 AM to Jan 3 at 3:00 PM, with recommended Full Cover. Age 20+.",
        winter: "Not our pick for the South Coast in late December. Winter tires are standard on these desks from Nov 1 to April 15.",
        photoKey: "car_yaris", rec: false,
        url: "https://www.bluecarrental.is/our-cars/toyota-yaris/", urlLabel: "Book it",
        maps: "Blue Car Rental Keflavik Airport",
        credit: "Photo: Kevauto, Wikimedia Commons.",
        priceFn: function () { return { two: CARS.budget.trip, each: CARS.budget.trip / PEOPLE, est: false, sub: money(CARS.budget.daily) + " a day, plus Full Cover, for 6 days." }; } },
      { id: "car-mid", kind: "car", group: "car", day: "The whole week", title: "Dacia Duster 4x4, the mid-size workhorse",
        pitch: "A manual 4x4 compact SUV, the classic Iceland winter rental, and used to this weather.",
        desc: "Same KEF window, with Full Cover. The Kia Sportage automatic 4x4 is the comfier sibling on the same quote.",
        winter: "Winter tires are standard. Studded tires help on ice, and often need a request.",
        photoKey: "car_duster", rec: false,
        url: "https://www.bluecarrental.is/our-cars/dacia-duster/", urlLabel: "Book it",
        maps: "Blue Car Rental Keflavik Airport",
        credit: "Photo: (G)jabz, Wikimedia Commons.",
        priceFn: function () { return { two: CARS.mid.trip, each: CARS.mid.trip / PEOPLE, est: false, sub: money(CARS.mid.daily) + " a day, plus Full Cover, for 6 days." }; } },
      { id: "car-premium", kind: "car", group: "car", day: "The whole week", title: "Land Rover Defender 110, the recommended 4x4",
        pitch: "The 5-door automatic 4x4, and room for Jerm's luggage. The Defender 90 did not show up in Iceland.",
        desc: "From-rates, not a locked holiday quote. Holiday week can price above these. Hertz Gold is useful at the KEF desk, and the member number stays off this page. Full Cover is the package that matters: gravel, sand and ash, theft, glass, and zero excess.",
        winter: "Winter tires are standard from Nov 1 to April 15. F-roads are closed anyway. Age 23+ at Hertz, two credit cards at pickup.",
        photoKey: "car_defender", rec: true,
        url: "https://www.bluecarrental.is/our-cars/land-rover-defender/", urlLabel: "Book it",
        url2: "https://www.hertz.is/vehicle_guide/pfan/", url2Label: "Hertz Defender 110",
        maps: "Blue Car Rental Keflavik Airport",
        credit: "Photo: DestinationFearFan, Wikimedia Commons.",
        priceFn: function () { return { two: CARS.premium.trip, each: CARS.premium.trip / PEOPLE, est: true, sub: "est. " + money(CARS.premium.daily) + " a day, plus Full Cover, for 6 days." }; } },
      { id: "food-budget", kind: "food", day: "Most days", title: "A daily food budget",
        pitch: "Set aside a daily food budget for the meals you have not already booked.",
        desc: "Default is $150 a person a day, for 6 days. The restaurant cards are priced separately, so this is the unscripted eating. Edit the rate in Us.",
        winter: "January 1 cafes may still be asleep. A greenhouse, a hot dog, or a hotel restaurant will not be.",
        photoKey: "tides", rec: false,
        url: "", urlLabel: "", maps: "",
        priceFn: function (ctx) {
          var two = ctx.foodRate * ctx.foodDays * PEOPLE;
          return { two: two, each: two / PEOPLE, est: true, sub: money(ctx.foodRate) + " a person a day, times " + ctx.foodDays + " days." };
        } }
    ];
  }

  function catalogToCard(c) {
    return {
      id: c.id,
      kind: c.cat,
      group: CATALOG_GROUP[c.id] || null,
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
    DECK = coreCards().concat(CATALOG.map(catalogToCard));
    DECK_MAP = {};
    DECK.forEach(function (c) { DECK_MAP[c.id] = c; });
  }

  var DAYS = [
    { id: "dec28", date: "Dec 28, Monday", title: "Denver lets you go at 3:40 PM",
      slots: [
        { key: "flight", label: "the flight", ids: ["flight-economy", "flight-business"] },
        { key: "hold", label: "Dec 28 hotel", ids: ["hold-dec28"], optional: true }
      ], items: [] },
    { id: "dec29", date: "Dec 29, Tuesday", title: "A 6:05 AM landing, then the harbor",
      slots: [{ key: "hotel", label: "Dec 29 hotel", ids: ["stay-edition-suite", "stay-edition-superior", "stay-retreat"] }],
      items: ["harpa_walk", "shopping_downtown", "grotta", "sky_lagoon", "tides", "wool_shops"] },
    { id: "dec30", date: "Dec 30, Wednesday", title: "A glacier overnight, or a day in town",
      slots: [
        { key: "hotel", label: "Dec 30 hotel", ids: ["jokulsarlon", "stay-edition-suite", "stay-edition-superior", "stay-retreat"] },
        { key: "ice", label: "the ice cave plan", ids: ["jokulsarlon", "katla"] }
      ], items: ["nl_guided", "nl_self"] },
    { id: "dec31", date: "Dec 31, Thursday", title: "Bonfires, a comedy hour, and fireworks",
      slots: [{ key: "hotel", label: "Dec 31 hotel", ids: ["stay-edition-suite", "stay-edition-superior"] }],
      items: ["nye_dinner", "nye_bonfire", "aramotaskaup", "nye_fireworks", "dill", "grillmarkadurinn"] },
    { id: "jan1", date: "Jan 1, Friday", title: "Horses first, Golden Circle if anything is open",
      slots: [{ key: "hotel", label: "Jan 1 hotel", ids: ["stay-edition-suite", "stay-edition-superior", "stay-retreat"] }],
      items: ["horses", "golden_circle", "fridheimar", "fontana", "silfra", "tides", "hvammsvik"] },
    { id: "jan2", date: "Jan 2, Saturday", title: "South Coast drama, or a glass box in a field",
      slots: [
        { key: "hotel", label: "Jan 2 hotel", ids: ["stay-panorama-standard", "stay-panorama-premium", "stay-buubble", "stay-aurora", "stay-retreat", "stay-edition-suite", "stay-edition-superior"] }
      ], items: ["south_coast", "katla", "kolaportid", "wool_shops"] },
    { id: "jan3", date: "Jan 3, Sunday", title: "One last soak, then a 4:55 PM flight home",
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
    v: 3,
    player: "",
    picks: {},
    passed: {},
    unlocked: {},
    mate: null,
    rates: defaultRates()
  };
  var undoStack = [];
  var reviewId = null;
  var lastChip = null;
  var pendingShare = null;
  var drag = { on: false };

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

  function isYes(map, id) { return !!(map && map[id]); }
  function myYes(id) { return isYes(state.picks, id); }
  function myPass(id) { return isYes(state.passed, id); }
  function mateYes(id) { return !!(state.mate && state.mate.picks && state.mate.picks[id]); }
  function matePass(id) { return !!(state.mate && state.mate.passed && state.mate.passed[id]); }

  function isLocked(id) {
    if (state.unlocked[id]) return false;
    if (state.player === "both") return myYes(id);
    return myYes(id) && mateYes(id);
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
      foodRate: r.foodRate,
      foodDays: r.foodDays,
      suiteOn: isYes(state.picks, "stay-edition-suite") || isLocked("stay-edition-suite"),
      superiorOn: isYes(state.picks, "stay-edition-superior") || isLocked("stay-edition-superior")
    };
  }

  function applyChoices(ids) {
    var has = function (id) { return ids.indexOf(id) !== -1; };
    var r = state.rates;
    var sim = clone(r);
    sim.flightClass = has("flight-business") ? "business" : (has("flight-economy") ? "economy" : "");
    sim.holdDec28 = has("hold-dec28");
    sim.suiteNights = has("stay-edition-suite") ? 5 : 0;
    sim.superiorNights = has("stay-edition-superior") ? 5 : 0;
    sim.retreatNights = has("stay-retreat") ? 2 : 0;
    sim.panoNights = has("stay-panorama-standard") || has("stay-panorama-premium") ? 1 : 0;
    sim.panorama = has("stay-panorama-premium") ? "premium" : "standard";
    sim.buubbleNights = has("stay-buubble") ? 1 : 0;
    sim.auroraNights = has("stay-aurora") ? 1 : 0;
    sim.hofnNights = has("jokulsarlon") ? 1 : 0;
    sim.hofnFlights = has("jokulsarlon");
    sim.iceCave = has("jokulsarlon") ? (r.iceCave || "standard") : "none";
    sim.blVisits = has("blue_lagoon") ? Math.max(1, r.blVisits || 1) : 0;
    sim.blTier = r.blTier || "lava";
    sim.nlTour = has("nl_guided");
    sim.carId = has("car-premium") ? "premium" : has("car-mid") ? "mid" : has("car-budget") ? "budget" : has("car-none") ? "none" : "";
    sim.foodOn = has("food-budget");
    sim.picks = {};
    CATALOG.forEach(function (c) { sim.picks[c.id] = has(c.id); });
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
    var flightsIntl = sim.flightClass ? FLIGHT[sim.flightClass] * PEOPLE : 0;
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
    if (c.url) bits.push('<a class="btn primary" href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(c.urlLabel || "Website") + "</a>");
    if (c.url2) bits.push('<a class="btn" href="' + esc(c.url2) + '" target="_blank" rel="noopener">' + esc(c.url2Label || "Website") + "</a>");
    if (c.maps) bits.push('<a class="btn" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(c.maps) + '" target="_blank" rel="noopener">Map</a>');
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
    return { id: id, pick: !!state.picks[id], pass: !!state.passed[id], unlocked: !!state.unlocked[id] };
  }
  function restoreId(s) {
    if (s.pick) state.picks[s.id] = true; else delete state.picks[s.id];
    if (s.pass) state.passed[s.id] = true; else delete state.passed[s.id];
    if (s.unlocked) state.unlocked[s.id] = true; else delete state.unlocked[s.id];
  }

  function vote(id, yes) {
    var card = DECK_MAP[id];
    if (!card) return;
    var snaps = [snapshotId(id)];
    if (yes && card.group) {
      groupMembers(card.group).forEach(function (other) {
        if (other === id) return;
        snaps.push(snapshotId(other));
        delete state.picks[other];
        state.passed[other] = true;
        delete state.unlocked[other];
      });
    }
    if (yes) {
      state.picks[id] = true;
      delete state.passed[id];
      delete state.unlocked[id];
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
    reviewId = step.reviewId || null;
    afterChange();
  }

  function unlock(id) {
    if (!isLocked(id) && !myYes(id)) return;
    undoStack.push({ snaps: [snapshotId(id)] });
    delete state.picks[id];
    delete state.unlocked[id];
    afterChange();
    showToast("Unlocked. It leaves the plan until you both say yes again.");
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
      v: 3,
      player: state.player || "",
      yes: yesIdsFrom(state.picks),
      pass: DECK.filter(function (c) { return myPass(c.id); }).map(function (c) { return c.id; }),
      unlocked: Object.keys(state.unlocked).filter(function (k) { return state.unlocked[k]; }),
      rates: state.rates
    };
    if (state.mate) {
      o.mate = {
        player: state.mate.player,
        yes: yesIdsFrom(state.mate.picks),
        pass: Object.keys(state.mate.passed || {}).filter(function (id) { return state.mate.passed[id]; })
      };
    }
    return o;
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(compactState())); } catch (e) {}
  }

  function applyYesPass(yes, pass) {
    state.picks = {};
    state.passed = {};
    (yes || []).forEach(function (id) { if (DECK_MAP[id]) state.picks[id] = true; });
    (pass || []).forEach(function (id) { if (DECK_MAP[id] && !state.picks[id]) state.passed[id] = true; });
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
    applyYesPass(yes, pass);
    var r = defaultRates();
    ["suiteRate","retreatRate","hofnRate","auroraRate","foodRate","foodDays","blTier","blVisits","iceCave","iceCaveRate","nlRate","nlCount"].forEach(function (k) {
      if (saved[k] !== undefined) r[k] = saved[k];
    });
    state.rates = r;
  }

  function load() {
    state = { v: 3, player: "", picks: {}, passed: {}, unlocked: {}, mate: null, rates: defaultRates() };
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var saved = JSON.parse(raw);
      if (saved.v === 3) {
        if (saved.player === "scott" || saved.player === "jerm" || saved.player === "both") state.player = saved.player;
        applyYesPass(saved.yes || [], saved.pass || []);
        (saved.unlocked || []).forEach(function (id) { if (DECK_MAP[id]) state.unlocked[id] = true; });
        if (saved.rates) Object.keys(state.rates).forEach(function (k) {
          if (saved.rates[k] !== undefined) state.rates[k] = saved.rates[k];
        });
        if (saved.mate && (saved.mate.player === "scott" || saved.mate.player === "jerm")) {
          state.mate = { player: saved.mate.player, picks: {}, passed: {} };
          (saved.mate.yes || Object.keys(saved.mate.picks || {})).forEach(function (id) {
            if (saved.mate.yes) { if (DECK_MAP[id]) state.mate.picks[id] = true; }
            else if (saved.mate.picks[id] && DECK_MAP[id]) state.mate.picks[id] = true;
          });
          (saved.mate.pass || Object.keys(saved.mate.passed || {})).forEach(function (id) {
            if (saved.mate.pass) { if (DECK_MAP[id]) state.mate.passed[id] = true; }
            else if (saved.mate.passed[id] && DECK_MAP[id]) state.mate.passed[id] = true;
          });
        }
      } else {
        if (saved.player === "scott" || saved.player === "jerm" || saved.player === "both") state.player = saved.player;
        migrateOld(saved);
        if (saved.mate && (saved.mate.player === "scott" || saved.mate.player === "jerm")) {
          state.mate = { player: saved.mate.player, picks: {}, passed: {} };
          CATALOG.forEach(function (c) {
            if (saved.mate.picks && saved.mate.picks[c.id]) state.mate.picks[c.id] = true;
            if (saved.mate.passed && saved.mate.passed[c.id]) state.mate.passed[c.id] = true;
          });
        }
      }
    } catch (e) {}
  }

  function parseShare() {
    var q = new URLSearchParams(location.search);
    var s = q.get("s");
    if (!s) return null;
    try {
      var b64 = s.replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4) b64 += "=";
      return JSON.parse(decodeURIComponent(escape(atob(b64))));
    } catch (e) { return null; }
  }

  function consumePendingShare() {
    var data = pendingShare;
    pendingShare = null;
    if (!data) return;
    var yes = data.yes;
    var pass = data.pass;
    if (!yes && data.picks) {
      yes = [];
      pass = [];
      Object.keys(data.picks || {}).forEach(function (id) { if (data.picks[id]) yes.push(id); });
      Object.keys(data.passed || {}).forEach(function (id) { if (data.passed[id]) pass.push(id); });
      migrateOld(Object.assign({}, data, { picks: data.picks, passed: data.passed }));
      /* migrateOld applied to me; for v1 joint, also copy to mate so they lock */
      if (!data.v || data.v === 1) {
        state.mate = { player: otherId(), picks: clone(state.picks), passed: clone(state.passed) };
        showToast("An older shared plan just arrived. Matching yeses are locked.");
        afterChange();
        return;
      }
      yes = yesIdsFrom(state.picks);
      pass = DECK.filter(function (c) { return myPass(c.id); }).map(function (c) { return c.id; });
    }
    var from = data.player || "";
    if (from && from !== "both" && state.player && from !== state.player) {
      state.mate = { player: from, picks: {}, passed: {} };
      (yes || []).forEach(function (id) { if (DECK_MAP[id]) state.mate.picks[id] = true; });
      (pass || []).forEach(function (id) { if (DECK_MAP[id]) state.mate.passed[id] = true; });
      showToast(playerName(from) + " sent picks. Matches will lock.");
    } else if (from && (from === state.player || from === "both" || !state.player)) {
      applyYesPass(yes || [], pass || []);
      if (from === "both" && state.player === "both") showToast("Shared picks loaded.");
      else if (!state.player) pendingShare = data;
    }
    afterChange();
  }

  function shareUrl() {
    var payload = { v: 3, player: state.player || "both", yes: yesIdsFrom(state.picks), pass: DECK.filter(function (c) { return myPass(c.id); }).map(function (c) { return c.id; }) };
    var raw = btoa(unescape(encodeURIComponent(JSON.stringify(payload)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
    var url = location.origin + location.pathname + "?s=" + raw + "#us";
    return url;
  }
  function shareText() {
    if (state.player === "jerm") return "My Iceland picks, from Jerm. Open this, Scott, and we'll see if we agree.";
    if (state.player === "scott") return "My Iceland picks, from Scott. Open this, Jerm, and we'll see if we agree.";
    return "Our Iceland picks, from Scott and Jerm Versus Iceland.";
  }
  function copyShare(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { showToast("Link copied."); }).catch(function () { prompt("Copy this link", url); });
    } else prompt("Copy this link", url);
  }
  function sharePicks() {
    var url = shareUrl();
    var payload = { title: "Scott and Jerm Versus Iceland", text: shareText(), url: url };
    if (navigator.share) {
      navigator.share(payload).catch(function (err) {
        if (err && err.name === "AbortError") return;
        copyShare(url);
      });
    } else copyShare(url);
  }

  /* ---------- route ---------- */
  function currentTab() {
    var h = (location.hash || "#plan").replace(/^#/, "");
    if (h === "pick" || h === "us" || h === "plan") return h;
    return "plan";
  }
  function route() {
    var tab = currentTab();
    document.body.setAttribute("data-tab", tab);
    document.body.classList.toggle("pick-tab", tab === "pick");
    ["plan", "pick", "us"].forEach(function (id) {
      var el = document.getElementById("view-" + id);
      if (el) el.hidden = id !== tab;
    });
    document.querySelectorAll(".tab").forEach(function (a) {
      a.setAttribute("aria-current", a.getAttribute("data-tab") === tab ? "page" : "false");
    });
  }

  /* ---------- render ---------- */
  function mateBadge(id) {
    if (!state.mate) return "";
    var name = playerName(state.mate.player);
    if (mateYes(id)) return '<span class="mate-badge">' + esc(name) + " said I'm in</span>";
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
    if (night === "dec30" && has("jokulsarlon")) return "jokulsarlon";
    if ((night === "jan1" || night === "jan2") && has("stay-retreat")) return "stay-retreat";
    if (night === "jan2") {
      if (has("stay-panorama-standard")) return "stay-panorama-standard";
      if (has("stay-panorama-premium")) return "stay-panorama-premium";
      if (has("stay-buubble")) return "stay-buubble";
      if (has("stay-aurora")) return "stay-aurora";
    }
    if (has("stay-edition-suite")) return "stay-edition-suite";
    if (has("stay-edition-superior")) return "stay-edition-superior";
    return null;
  }

  function renderPlanItem(id) {
    var c = DECK_MAP[id];
    if (!c) return "";
    var pl = priceLabel(c);
    var imgKey = c.photoKey;
    var thumb = PHOTO_URLS[imgKey] ? '<a class="card-photo" href="' + esc(c.url || "#") + '" ' + (c.url ? 'target="_blank" rel="noopener"' : "") + "><img src=\"" + PHOTO_URLS[imgKey] + "\" alt=\"" + esc(c.title) + "\"></a>" : '<div class="ph"></div>';
    if (!c.url) thumb = PHOTO_URLS[imgKey] ? '<img src="' + PHOTO_URLS[imgKey] + '" alt="' + esc(c.title) + '">' : '<div class="ph"></div>';
    return '<div class="plan-item" data-locked="' + esc(id) + '">' + thumb + "<div>" +
      '<p class="lock">🔒 Locked</p>' +
      "<h3>" + (c.url ? '<a class="card-title" href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(c.title) + "</a>" : esc(c.title)) + "</h3>" +
      '<p class="price">' + pl.big + "</p>" +
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
    var carLocked = ["car-none","car-budget","car-mid","car-premium"].filter(function (id) { return locked.indexOf(id) !== -1; });
    var foodLocked = locked.indexOf("food-budget") !== -1;
    html += '<div class="day-block"><p class="when">Getting around, and eating</p><h2>The week underneath the days.</h2>';
    if (carLocked.length) html += renderPlanItem(carLocked[0]);
    else html += '<button type="button" class="undecided" data-jump="car-premium">Still deciding: the rental car</button>';
    if (foodLocked) html += renderPlanItem("food-budget");
    else html += '<button type="button" class="undecided" data-jump="food-budget">Still deciding: a daily food budget</button>';
    html += "</div>";

    var lastHotel = "";
    DAYS.forEach(function (day) {
      html += '<article class="day-block" id="day-' + day.id + '"><p class="when">' + esc(day.date) + "</p><h2>" + esc(day.title) + "</h2>";
      day.slots.forEach(function (slot) {
        var chosen = null;
        if (slot.key === "hotel") chosen = hotelForNight(day.id, locked);
        else {
          for (var i = 0; i < slot.ids.length; i++) {
            if (locked.indexOf(slot.ids[i]) !== -1) { chosen = slot.ids[i]; break; }
          }
        }
        if (chosen && (slot.key !== "ice" || chosen === "jokulsarlon" || chosen === "katla")) {
          if (slot.key === "ice" && chosen === "jokulsarlon" && hotelForNight(day.id, locked) === "jokulsarlon") return;
          if (slot.key === "hotel" && chosen === lastHotel && (chosen === "stay-edition-suite" || chosen === "stay-edition-superior" || chosen === "stay-retreat")) {
            html += '<div class="plan-item compact"><div></div><div><p class="lock">🔒 Still here</p><h3>' + esc(DECK_MAP[chosen].title) + "</h3><p class='pitch-meta'>Same stay, already in the total.</p></div></div>";
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
      html += "</article>";
    });
    daysEl.innerHTML = html;

    renderVideos(locked);
    var ready = document.getElementById("readyList");
    if (ready) {
      if (!locked.length) ready.innerHTML = "<p class='sub'>Nothing is locked yet, so there is nothing to book. That's honest, at least.</p>";
      else ready.innerHTML = locked.map(function (id) {
        var c = DECK_MAP[id];
        var link = c.url ? '<a href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(c.urlLabel || "Official site") + "</a>" : "<span>No official booking page for this one.</span>";
        return '<label class="ready-item"><input type="checkbox"> <span><strong>' + esc(c.title) + "</strong><br>" + link + "</span></label>";
      }).join("");
    }
  }

  var VIDEO_FOR = {
    "stay-edition-suite": "edition", "stay-edition-superior": "edition", "hold-dec28": "edition",
    sky_lagoon: "sky", jokulsarlon: "jokulsarlon", katla: "ice",
    nye_fireworks: "nye", nye_bonfire: "nye", horses: "horses",
    golden_circle: "golden", south_coast: "south",
    "stay-panorama-standard": "panorama", "stay-panorama-premium": "panorama",
    "stay-buubble": "buubble"
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

  function renderPick() {
    var prog = document.getElementById("pickProg");
    var deck = document.getElementById("deck");
    var end = document.getElementById("deckEnd");
    var actions = document.getElementById("pickActions");
    var voted = DECK.filter(function (c) { return myYes(c.id) || myPass(c.id); }).length;
    if (prog) prog.textContent = Math.min(voted + (currentCard() ? 1 : 0), DECK.length) + " of " + DECK.length;
    var card = currentCard();
    if (!card) {
      if (deck) deck.innerHTML = "";
      if (actions) actions.hidden = true;
      if (end) { end.hidden = false; end.innerHTML = endHtml(); }
      return;
    }
    if (actions) actions.hidden = false;
    if (end) end.hidden = true;
    var next = remainingCards().filter(function (c) { return c.id !== card.id; })[0];
    var html = "";
    if (next) html += swipeCardHtml(next, false);
    html += swipeCardHtml(card, true);
    if (deck) deck.innerHTML = html;
    var inBtn = document.getElementById("btnIn");
    if (inBtn) inBtn.textContent = state.player === "both" ? "We're in" : "I'm in";
  }

  function swipeCardHtml(c, top) {
    var pl = priceLabel(c);
    var locked = isLocked(c.id);
    return '<article class="swipe-card' + (top ? " is-top" : " is-under") + '" data-id="' + esc(c.id) + '">' +
      '<div class="stamp in">I\'m in</div><div class="stamp out">Pass</div>' +
      photoHtml(c.photoKey, c.title, c.url) +
      '<div class="body">' +
      '<p class="kicker">' + esc(c.day || "") + (c.kind ? " · " + esc(c.kind) : "") + "</p>" +
      (c.rec ? '<span class="rec">Our recommendation</span> ' : "") +
      mateBadge(c.id) +
      (locked ? '<p class="lock-flag">🔒 Locked, it is in the plan</p>' : "") +
      '<p class="pitch-line">' + (c.url ? '<a class="card-title" href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(c.pitch) + "</a>" : esc(c.pitch)) + "</p>" +
      '<p class="price-line">' + pl.big + "<small>" + esc(pl.sub) + "</small></p>" +
      (c.desc ? '<p class="pitch-meta">' + esc(c.desc) + "</p>" : "") +
      (c.winter ? '<p class="tip"><strong>Winter:</strong> ' + esc(c.winter) + "</p>" : "") +
      (c.credit ? '<p class="credit">' + esc(c.credit) + "</p>" : "") +
      placeLinks(c) +
      "</div></article>";
  }

  function endHtml() {
    var locked = lockedIds();
    var waiting = yesIdsFrom(state.picks).filter(function (id) { return !isLocked(id); });
    var passed = DECK.filter(function (c) { return myPass(c.id); });
    var t = computeFrom(locked);
    var tYes = computeFrom(unique(locked.concat(yesIdsFrom(state.picks))));
    var other = playerName(otherId());
    return "<p class='kicker'>The end of the deck</p><h2>That's the pile.</h2>" +
      "<b>" + money(t.total) + "</b><small class='sub'>locked for two, " + money(t.each) + " per person.</small>" +
      (waiting.length && state.player !== "both" ? "<p class='sub'>If you add all your yeses, it would be " + money(tYes.total) + " for two, waiting on " + esc(other) + " for " + waiting.length + " of them.</p>" : "") +
      "<h3>Locked</h3>" + (locked.length ? "<ul>" + locked.map(function (id) { return "<li>" + esc(DECK_MAP[id].title) + "</li>"; }).join("") + "</ul>" : "<p>Nothing locked yet.</p>") +
      "<h3>Waiting</h3>" + (waiting.length ? "<ul>" + waiting.map(function (id) { return "<li>" + esc(DECK_MAP[id].title) + "</li>"; }).join("") + "</ul>" : "<p>No hanging yeses.</p>") +
      "<h3>Passed</h3>" + (passed.length ? "<ul>" + passed.map(function (c) { return "<li>" + esc(c.title) + "</li>"; }).join("") + "</ul>" : "<p>You passed on nothing. Bold.</p>") +
      '<div class="card-links"><button type="button" class="btn primary" id="reviewPassed">Review passed cards</button><a class="btn" href="#plan">See the plan</a><a class="btn" href="#us">Open Us</a></div>';
  }

  function unique(arr) {
    var o = {};
    arr.forEach(function (x) { o[x] = true; });
    return Object.keys(o);
  }

  function renderUs() {
    var who = document.getElementById("usWho");
    if (who) {
      who.innerHTML = ["scott", "jerm", "both"].map(function (id) {
        var label = id === "both" ? "Pick for both" : "I'm " + playerName(id);
        return '<button type="button" class="btn" data-who="' + id + '" aria-pressed="' + (state.player === id ? "true" : "false") + '">' + label + "</button>";
      }).join("");
    }
    var share = document.getElementById("shareBtn");
    if (share) share.textContent = state.player === "jerm" ? "Send my picks to Scott" : state.player === "scott" ? "Send my picks to Jerm" : "Send our picks";
    var board = document.getElementById("usBoard");
    if (!board) return;
    var locked = lockedIds();
    var mine = yesIdsFrom(state.picks);
    var theirs = state.mate ? yesIdsFrom(state.mate.picks) : [];
    var splits = [];
    DECK.forEach(function (c) {
      var me = myYes(c.id), mo = mateYes(c.id);
      var mp = myPass(c.id), op = matePass(c.id);
      if (me && op) splits.push(playerName(state.player) + ": " + shortName(c.id) + ". " + playerName(state.mate.player) + ": absolutely not.");
      else if (mo && mp) splits.push(playerName(state.mate.player) + ": " + shortName(c.id) + ". " + playerName(state.player) + ": absolutely not.");
      else if (me && !mo && state.mate && !op && !mp) splits.push(playerName(state.player) + " wants " + shortName(c.id) + ". " + playerName(state.mate.player) + " has not voted.");
      else if (mo && !me && !mp) splits.push(playerName(state.mate.player) + " wants " + shortName(c.id) + ". " + playerName(state.player) + " has not voted.");
    });
    var matches = locked.map(function (id) { return "You both want " + shortName(id) + "."; });
    var tLock = computeFrom(locked);
    var tYes = computeFrom(unique(locked.concat(mine)));
    var otherName = state.mate ? playerName(state.mate.player) : playerName(otherId());
    board.innerHTML = '<div class="us-grid">' +
      '<div class="match-card"><h3>Matches</h3>' + (matches.length ? "<ul>" + matches.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" : "<p>No locks yet. The negotiation era has begun.</p>") + "</div>" +
      '<div class="match-card"><h3>Negotiate</h3>' + (splits.length ? "<ul>" + splits.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" : "<p>No splits. Suspicious, or just very compatible.</p>") + "</div>" +
      '<div class="match-card"><h3>' + (state.player === "both" ? "Yeses, picking for both" : (esc(playerName(state.player || "You")) + "'s yeses")) + "</h3>" + (mine.length ? "<ul>" + mine.map(function (id) { return "<li>" + esc(DECK_MAP[id].title) + (isLocked(id) ? " 🔒" : "") + "</li>"; }).join("") + "</ul>" : "<p>No yeses yet.</p>") + "</div>" +
      '<div class="match-card"><h3>' + esc(state.mate ? otherName + "'s yeses" : otherName + ", when they send a link") + "</h3>" + (theirs.length ? "<ul>" + theirs.map(function (id) { return "<li>" + esc(DECK_MAP[id].title) + "</li>"; }).join("") + "</ul>" : "<p>No one else has checked in on this phone.</p>") + (state.mate ? '<button type="button" class="ghost" id="clearMate">Clear ' + esc(otherName) + "'s picks</button>" : "") + "</div>" +
      '<div class="match-card match-totals"><h3>Locked total for two</h3><b>' + money(tLock.total) + "</b><small>" + money(tLock.each) + " per person</small>" +
      "<h3 style='margin-top:16px'>If you add all your yeses</h3><b>" + money(tYes.total) + "</b><small>" + money(tYes.each) + " per person, including things still waiting on a match.</small></div>" +
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
      "<p class='credit'>These rates land in the locked total only after the matching card is locked. FX was ISK 123.4 per USD, EUR $1.10.</p>";
  }

  function renderWhoNow() { /* top bar already shows identity via share label */ }

  function render() {
    renderChip();
    renderPlan();
    renderPick();
    renderUs();
  }

  function afterChange() {
    save();
    render();
  }

  function setPlayer(id) {
    if (id !== "scott" && id !== "jerm" && id !== "both") return;
    state.player = id;
    hideWho();
    if (pendingShare) consumePendingShare();
    afterChange();
  }
  function showWho() {
    var el = document.getElementById("who");
    if (el) el.hidden = false;
    document.body.classList.add("who-open");
  }
  function hideWho() {
    var el = document.getElementById("who");
    if (el) el.hidden = true;
    document.body.classList.remove("who-open");
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
      if (e.target.closest("button, a.btn, a.card-title, a.card-links")) return;
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
      if (e.target.closest("#reviewPassed")) {
        DECK.forEach(function (card) {
          if (state.passed[card.id]) delete state.passed[card.id];
        });
        reviewId = null;
        afterChange();
        return;
      }
      if (e.target.closest(".js-share")) { sharePicks(); return; }
      if (e.target.closest("#switchPlayer")) { showWho(); return; }
      if (e.target.closest("#editCostsBtn")) { openCosts(); return; }
      if (e.target.closest("#closeCosts") || e.target === document.getElementById("costs")) { closeCosts(); return; }
      if (e.target.closest("#clearMate")) { state.mate = null; afterChange(); return; }
      if (e.target.closest("#lockedChip")) { location.hash = "#us"; return; }
    });
    document.body.addEventListener("change", function (e) {
      var field = e.target.getAttribute("data-cost");
      if (!field) return;
      var val = e.target.value;
      if (e.target.type === "number") val = Number(val);
      if (field in state.rates) state.rates[field] = val;
      afterChange();
    });
    bindSwipe();
    window.addEventListener("hashchange", function () { route(); render(); });
  }

  function boot() {
    buildDeck();
    load();
    pendingShare = parseShare();
    if (pendingShare && history.replaceState) {
      try { history.replaceState({}, "", location.pathname + location.hash); } catch (e) {}
    }
    bind();
    route();
    if (!state.player) showWho();
    else if (pendingShare) consumePendingShare();
    render();
  }

  window.__icelandSetPlayer = setPlayer;
  window.__icelandVote = vote;
  window.__icelandUnlock = unlock;
  window.__icelandJump = jumpTo;
  window.__icelandUndo = undo;
  window.__icelandState = function () { return state; };
  window.__icelandDeck = function () { return DECK; };
  window.__icelandLocked = lockedIds;
  window.__icelandCompute = computeFrom;
  window.__icelandRemaining = remainingCards;
  window.__icelandCurrent = currentCard;
  window.__icelandRender = render;
  window.__icelandRoute = route;
  window.__icelandClearReview = function () { reviewId = null; render(); };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
