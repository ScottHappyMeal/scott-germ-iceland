/* Scott & Jerm Versus Iceland */
(function () {
  "use strict";
  window.__imgFail = function (img) { img.classList.add("is-fail"); };
  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }
  function photoBlock(key, extraClass, name, load) {
    load = load || "lazy";
    var url = PHOTO_URLS[key] || "";
    var img = url
      ? '<img src="' + url + '" alt="' + esc(name) + '" loading="' + load + '" onload="this.classList.add(&quot;is-ok&quot;)" onerror="window.__imgFail(this)">'
      : "";
    return '<div class="' + (extraClass || "") + ' ph" role="group" aria-label="' + esc(name) + '">' +
      img + '<div class="ph-fallback">' + esc(name) + "</div></div>";
  }

  var PHOTO_URLS = {
  "perlan": "https://upload.wikimedia.org/wikipedia/commons/0/07/View_From_Perlan_Viewing_Deck.jpg",
  "geysir": "https://upload.wikimedia.org/wikipedia/commons/0/06/Strokkur%2C_Iceland.jpg",
  "baejarins": "https://upload.wikimedia.org/wikipedia/commons/3/3a/B%C3%A6jarins_Beztu_Pylsur.jpg",
  "laugavegur": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Laugavegur%2C_Reykjavik.jpg/960px-Laugavegur%2C_Reykjavik.jpg",
  "nye_fireworks": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/NewYearFireworks-Reykjavik.jpg/960px-NewYearFireworks-Reykjavik.jpg",
  "hallgrimskirkja": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Hallgrimskirkja_Reykjavik.jpg/960px-Hallgrimskirkja_Reykjavik.jpg",
  "old_harbour": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Reykjav%C3%ADk_Old_Harbor.jpg/960px-Reykjav%C3%ADk_Old_Harbor.jpg",
  "gullfoss": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Gullfoss%2C_Su%C3%B0urland%2C_Islandia%2C_2014-08-16%2C_DD_119.JPG/960px-Gullfoss%2C_Su%C3%B0urland%2C_Islandia%2C_2014-08-16%2C_DD_119.JPG",
  "silfra": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Ca%C3%B1%C3%B3n_Silfra%2C_Parque_Nacional_de_%C3%9Eingvellir%2C_Su%C3%B0urland%2C_Islandia%2C_2014-08-16%2C_DD_055.JPG/960px-Ca%C3%B1%C3%B3n_Silfra%2C_Parque_Nacional_de_%C3%9Eingvellir%2C_Su%C3%B0urland%2C_Islandia%2C_2014-08-16%2C_DD_055.JPG",
  "reynisfjara": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Reynisfjara%2C_Su%C3%B0urland%2C_Islandia%2C_2014-08-17%2C_DD_164.JPG/960px-Reynisfjara%2C_Su%C3%B0urland%2C_Islandia%2C_2014-08-17%2C_DD_164.JPG",
  "aurora_hofn": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Enjoining_The_Northern_Lights_Hofn_Iceland_Travel_Photography_%28247807533%29.jpeg/960px-Enjoining_The_Northern_Lights_Hofn_Iceland_Travel_Photography_%28247807533%29.jpeg",
  "diamond_beach": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Diamond_beach_iceland_.jpg/960px-Diamond_beach_iceland_.jpg",
  "skogafoss": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Sk%C3%B3gafoss_from_below.jpg/960px-Sk%C3%B3gafoss_from_below.jpg",
  "hero_aurora": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Flames_in_the_sky.jpg/960px-Flames_in_the_sky.jpg",
  "bonfire": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/New_Years_Eve_bonfire.jpg/960px-New_Years_Eve_bonfire.jpg",
  "thingvellir": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/%C3%9Eingvellir_National_Park.jpg/960px-%C3%9Eingvellir_National_Park.jpg",
  "grotta": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Lighthouse_on_Gr%C3%B3tta_Island.jpg/960px-Lighthouse_on_Gr%C3%B3tta_Island.jpg",
  "blue_lagoon": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Blue_Lagoon_with_%C3%9Eorbj%C3%B6rn%2C_Iceland%2C_20230430_1626_3692.jpg/960px-Blue_Lagoon_with_%C3%9Eorbj%C3%B6rn%2C_Iceland%2C_20230430_1626_3692.jpg",
  "jokulsarlon": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/033_Freshly_rotated_iceberg_at_J%C3%B6kuls%C3%A1rl%C3%B3n_%28Iceland%29_Photo_by_Giles_Laurent.jpg/960px-033_Freshly_rotated_iceberg_at_J%C3%B6kuls%C3%A1rl%C3%B3n_%28Iceland%29_Photo_by_Giles_Laurent.jpg",
  "horses": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/Islandais_hiver.jpg/960px-Islandais_hiver.jpg",
  "seljalandsfoss": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Seljalandsfoss_Waterfall%2C_Iceland%2C_20240720_1500_3096.jpg/960px-Seljalandsfoss_Waterfall%2C_Iceland%2C_20240720_1500_3096.jpg",
  "icelandair": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Icelandair_Boeing_737-8_MAX_TF-ICS_ZRH_2025_01.jpg/960px-Icelandair_Boeing_737-8_MAX_TF-ICS_ZRH_2025_01.jpg",
  "ice_cave": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Ice_Cave_Explorer_-_Iceland.jpg/960px-Ice_Cave_Explorer_-_Iceland.jpg",
  "fridheimar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Fridheimar_Tomatoes.jpg/960px-Fridheimar_Tomatoes.jpg",
  "harpa": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Harpa_%28concert_hall%29.jpg/960px-Harpa_%28concert_hall%29.jpg",
  "wool": "https://upload.wikimedia.org/wikipedia/commons/6/69/Lopapeysa.jpg",
  "myvatn": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Myvatn_Nature_Baths_by_Bruce_McAdam.jpg/960px-Myvatn_Nature_Baths_by_Bruce_McAdam.jpg",
  "glass_cabin": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Kakslauttanen_Igloo_village.jpg/960px-Kakslauttanen_Igloo_village.jpg",
  "tjornin": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/The_afternoon_sun_%2812391320454%29.jpg/960px-The_afternoon_sun_%2812391320454%29.jpg",
  "fontana": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/Fontana_spa.jpg/960px-Fontana_spa.jpg",
  "krossnes": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Krossnes_swimming_pool.jpg/960px-Krossnes_swimming_pool.jpg",
  "downtown": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Austurv%C3%B6llur_2023.jpg/960px-Austurv%C3%B6llur_2023.jpg",
  "icelandic_food": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Plokkfiskur.jpg/960px-Plokkfiskur.jpg",
    "edition_ext": "images/stays/edition-ext.jpg",
    "edition_room": "images/stays/edition-room.jpg",
    "edition_int": "images/stays/edition-int.jpg",
    "retreat_hero": "images/stays/retreat-hero.jpg",
    "retreat_lagoon": "images/stays/retreat-lagoon.jpg"
  };
  var PHOTO_LABELS = {
  "hero_aurora": "Northern lights over snow in Iceland",
  "aurora_hofn": "Northern lights near Hofn",
  "ice_cave": "A guided ice cave in Iceland",
  "jokulsarlon": "Jokulsarlon glacier lagoon",
  "diamond_beach": "Diamond Beach",
  "blue_lagoon": "The Blue Lagoon",
  "harpa": "Harpa Concert Hall, next to The Reykjavik EDITION",
  "old_harbour": "Reykjavik Old Harbour",
  "laugavegur": "Laugavegur, Reykjavik",
  "hallgrimskirkja": "Hallgrimskirkja",
  "grotta": "Grotta lighthouse",
  "gullfoss": "Gullfoss",
  "geysir": "Strokkur at Geysir",
  "skogafoss": "Skogafoss",
  "seljalandsfoss": "Seljalandsfoss",
  "icelandair": "An Icelandair Boeing 737 MAX",
  "thingvellir": "Thingvellir National Park",
  "silfra": "Silfra at Thingvellir",
  "horses": "An Icelandic horse in winter",
  "reynisfjara": "Reynisfjara black beach",
  "perlan": "View from Perlan",
  "nye_fireworks": "Fireworks over Reykjavik on New Year's Eve",
  "bonfire": "A New Year's Eve bonfire in Iceland",
  "baejarins": "Baejarins Beztu hot-dog stand",
  "fridheimar": "Tomatoes at Fridheimar",
  "wool": "A traditional Icelandic lopapeysa",
  "downtown": "Austurvollur, downtown Reykjavik",
  "fontana": "Laugarvatn Fontana",
  "glass_cabin": "Glass igloos (representative photo, Finland)",
  "myvatn": "A geothermal lagoon (M\u00fdvatn Nature Baths, stand-in)",
  "krossnes": "A seaside geothermal pool (Krossneslaug, stand-in)",
  "tjornin": "Tjornin, downtown Reykjavik",
  "icelandic_food": "Plokkfiskur, an Icelandic fish stew"
};

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, function (ch) {
      return ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[ch];
    });
  }
  function photoBlock(key, extraClass, label, lazy) {
    var url = PHOTO_URLS[key] || "";
    var name = label || PHOTO_LABELS[key] || key;
    var load = (lazy === false) ? "eager" : "lazy";
    var img = url
      ? '<img src="' + url + '" alt="' + esc(name) + '" loading="' + load + '" onload="this.classList.add(&quot;is-ok&quot;)" onerror="window.__imgFail(this)">'
      : "";
    return '<div class="' + extraClass + ' ph" role="group" aria-label="' + esc(name) + '">' +
      img + '<div class="ph-fallback">' + esc(name) + "</div></div>";
  }

  var STORAGE_KEY = "scott-germ-versus-iceland-v1";
  var PEOPLE = 2;
  var TRIP_NIGHTS = 5;
  var BL = { none: 0, comfort: 105, premium: 130, lava: 186 };
  var FLIGHT = { economy: 1490, business: 3190 };
  var PANO = { standard: 817, premium: 1104 };
  var BUUBBLE_RATE = 253;
  var SUPERIOR_RATE = 1160;
  var HORSE_EACH = 137; /* Ishestar Horses and Waffles, 16,900 ISK */
  var SKY_EACH = 121; /* Sky Lagoon Saman from 14,990 ISK */
  var FONTANA_EACH = 61; /* official 7,490 ISK */
  var EDITION_SPA_EACH = 234; /* signature 60 min, 28,900 ISK */
  var RETREAT_MASSAGE_EACH = 234; /* in-water 60 min, 28,900 ISK */
  var HVAMMSVIK_EACH = 80; /* Classic mid of 7,900-11,900 ISK, est. */
  var KATLA_EACH = 194;

  var DEFAULTS = {
    flightClass: "economy",
    superiorNights: 0,
    suiteNights: 5,
    suiteRate: 2340,
    hofnNights: 0,
    hofnRate: 250,
    retreatNights: 0,
    retreatRate: 2840,
    blTier: "lava",
    blVisits: 1,
    iceCave: "none",
    iceCaveRate: 175,
    hofnFlights: false,
    nlTour: false,
    nlCount: 1,
    nlRate: 95,
    car: false,
    carRate: 120,
    carDays: 0,
    carId: "none",
    foodRate: 150,
    foodDays: 6,
    holdDec28: false,
    panorama: "standard",
    panoNights: 0,
    buubbleNights: 0,
    auroraNights: 0,
    auroraRate: 350,
    picks: null
  };


  var CARS = {
    none: { id: "none", title: "No rental car", rec: false, daily: 0, vehicle: 0, coverDaily: 0, cover: 0, trip: 0 },
    budget: {
      id: "budget",
      title: "Toyota Yaris, the honest little car",
      blurb: "Automatic, front-wheel drive, and perfectly fine until the wind starts auditioning. Not our pick for the South Coast in late December, but it is the cheapest honest option.",
      model: "Toyota Yaris or similar, automatic 2WD",
      source: "Live Blue Car Rental quote, KEF, Dec 29, 2026 at 7:00 AM to Jan 3, 2027 at 3:00 PM.",
      daily: 57, vehicle: 342, iskVehicle: 42193, coverDaily: 44, cover: 264, trip: 606, rec: false,
      age: "Age 20+"
    },
    mid: {
      id: "mid",
      title: "Dacia Duster 4x4, the mid-size workhorse",
      blurb: "A manual 4x4 compact SUV, the classic Iceland winter rental. The Kia Sportage automatic 4x4 is the comfier sibling on the same quote, at $85 a day and $511 for the 6 days, before Full Cover.",
      model: "Dacia Duster or similar, manual 4x4 (Sportage auto listed too)",
      source: "Live Blue Car Rental quote for the same KEF window.",
      daily: 66, vehicle: 395, iskVehicle: 48693, coverDaily: 54, cover: 324, trip: 719, rec: false,
      age: "Age 20+ on the Duster, 23+ on the Sportage at Hertz"
    },
    premium: {
      id: "premium",
      title: "Land Rover Defender 110, the recommended 4x4",
      blurb: "The 5-door automatic 4x4, F-road approved in summer (those roads are closed this week anyway). The Defender 90, the 3-door, is a no-show in Iceland. The 110 has five doors and, more importantly, room for Jerm's luggage.",
      model: "Land Rover Defender 110, 5-door automatic 4x4 (not a 90)",
      source: "From-rates, not a locked holiday quote. Holiday week can price above these. Blue Car Rental, KEF: from 37,523 ISK a day for 2026, about $304, guaranteed model or an upgrade, F-road approved. Zero Car Rental: from 42,423 ISK a day, about $344, with zero excess included (the car is supplied by Blue). Cars Iceland: from about $205 a day, with studded winter tires, CDW, and theft protection included. Saga and Lava also offer it, with a KEF shuttle. Hertz Iceland lists the Defender 110, or similar, on hertz.is (age 23+, two cards, 5 doors). Confirm a live quote when you book.",
      daily: 304, vehicle: 1824, iskVehicle: 225138, coverDaily: 54, cover: 324, trip: 2148, rec: true, est: true,
      age: "Age 23+ at Hertz, two credit cards at pickup"
    }
  };

  function carPackageTotal() {
    var c = CARS[state.carId] || CARS.none;
    return c.trip || 0;
  }

  var VIDEOS = {
    edition: [
      { id: "c0JtGsxr3nw", kind: "visitor review", ch: "Luxury Travel Expert", title: "The Reykjavik EDITION, full 4K tour" },
      { id: "D6UHt2z53gU", kind: "visitor review", ch: "World Playground", title: "Edition Hotel, Reykjavik" }
    ],
    sky: [
      { id: "gYsuMAURTw0", kind: "visitor review", ch: "EF Go Ahead Tours", title: "The Sky Lagoon 7-Step Ritual" },
      { id: "lgiDk9U4yNY", kind: "visitor review", ch: "Never stop exploring", title: "4K Sky Lagoon Iceland" }
    ],
    jokulsarlon: [
      { id: "OPOsO02hJf4", kind: "visitor review", ch: "Matt Whiting's Europe", title: "Jokulsarlon lagoon and Diamond Beach" }
    ],
    ice: [
      { id: "3bAwjAkHo64", kind: "visitor review", ch: "Travel With Wes", title: "Vatnajokull glacier ice caves" }
    ],
    nye: [
      { id: "l4XJluBN5i8", kind: "visitor review", ch: "Egill Adalsteinsson", title: "New Year's Eve fireworks, Reykjavik, 4K" },
      { id: "YHE2b_foL4o", kind: "visitor review", ch: "THAT ICELANDIC GUY.", title: "Reykjavik New Year's Eve fireworks, drone" }
    ],
    horses: [
      { id: "uU8HbbEqjEg", kind: "official", ch: "Ishestar Riding Tours", title: "Icelandic horse ride on the black sand trail" },
      { id: "sSGV0Wv-jgM", kind: "visitor review", ch: "Cheap Thrills Blog", title: "Horsing around at Ishestar" }
    ],
    golden: [
      { id: "ZHwBy7EX5Bk", kind: "destination film", ch: "Guide to Iceland", title: "Golden Circle tour from Reykjavik" },
      { id: "55bejS_f5nA", kind: "visitor review", ch: "Adventures of Matt and Nat", title: "Driving the Golden Circle" }
    ],
    south: [
      { id: "rVjpJOqVK4s", kind: "visitor review", ch: "Hay and Kyle", title: "South Coast in winter, Seljalandsfoss and the lights" }
    ],
    panorama: [
      { id: "zsej-UkZjco", kind: "visitor review", ch: "Beau Monde Traveler", title: "Panorama Glass Lodge review" }
    ],
    buubble: [
      { id: "-XCWHk90BfU", kind: "visitor review", ch: "Park Pass", title: "A night in a bubble hotel under the lights" }
    ],
    blue: [
      { id: "fEeKl__QvLg", kind: "visitor review", ch: "Adventures For Two", title: "Blue Lagoon Iceland in 4K" }
    ],
    retreat: [
      { id: "nVUQqYKeDTw", kind: "visitor review", ch: "Don's Swank Guide", title: "Inside The Retreat Hotel" },
      { id: "MrMcG80u_Sk", kind: "visitor review", ch: "Wander Onwards", title: "Blue Lagoon Retreat room tour" }
    ],
    lights: [
      { id: "9OCDDNFvOzM", kind: "destination film", ch: "Guide to Iceland", title: "Iceland in winter, northern lights and polar night" },
      { id: "0TCnIkWZWJs", kind: "visitor review", ch: "IcelandCover", title: "Northern lights in Iceland in January" }
    ]
  };


  var CATALOG = [
    { id: "harpa_walk", cat: "daytime", title: "Harpa and the Old Harbour walk", photo: "harpa", day: "Dec 29",
      desc: "Start slow after the overnight flight. The EDITION sits on the harbor next to Harpa, so you can walk the waterfront, duck into the glass concert hall, and let the cold air wake you up.",
      winter: "Paths can be icy. Wear shoes with grip, and keep the first morning easy.",
      priceEach: 0, free: true, est: false, rec: false, defYes: true,
      maps: "Harpa Concert Hall Reykjavik" },
    { id: "horses", cat: "daytime", title: "Icelandic horse ride at Ishestar", photo: "horses", day: "Jan 1",
      desc: "Horses and Waffles is a relaxed 50-minute ride through lava fields at Ishestar in Hafnarfjordur, about 15 to 20 minutes from Reykjavik. Afterward you get a waffle and a hot drink in their cozy horse center. Ideal for beginners.",
      winter: "They run this all year. Horses wear studded winter shoes, and Ishestar gives you warm overalls and rain gear. Max 12 riders.",
      priceEach: HORSE_EACH, free: false, est: false, rec: true, defYes: true,
      maps: "Ishestar Hafnarfjordur",
      priceNote: "16,900 ISK per person, from Ishestar." },
    { id: "grotta", cat: "evening", title: "Grotta lighthouse after dark", photo: "grotta", day: "Dec 29",
      desc: "Ten minutes from downtown, this little lighthouse on a causeway is the easiest northern-lights try of the trip. Even if the sky stays cloudy, the walk and the air are worth it.",
      winter: "The causeway can flood or ice over at high tide. Check the tide and wear spikes or careful boots. Do not climb the rocks in a storm.",
      priceEach: 0, free: true, est: false, rec: false, defYes: true,
      maps: "Grotta lighthouse Reykjavik" },
    { id: "tides", cat: "food", title: "Dinner at Tides, The EDITION", photo: "icelandic_food_alias", day: "Dec 29 or Jan 1",
      desc: "The hotel's restaurant, Tides, is the easy first or last nice dinner: seafood and Nordic plates without leaving the harbor. A calm contrast to the bigger Michelin rooms.",
      winter: "Book ahead for New Year's week. Holiday menus can run higher than the usual a-la-carte.",
      priceEach: 120, free: false, est: true, rec: false, defYes: false,
      maps: "Tides restaurant The Reykjavik EDITION",
      photoKey: "icelandic_food", photoStandin: "Icelandic plokkfiskur, a classic fish stew, used here as a mood photo. It is not a dish from Tides." },
    { id: "dill", cat: "food", title: "Dill (Michelin-star Nordic)", photo: "icelandic_food_alias", day: "Flexible",
      desc: "Reykjavik's celebrated New Nordic room. A tasting-menu night if you want one serious dinner in town, built on local ingredients and a quiet, precise room.",
      winter: "Holiday week books up. Confirm the current menu and cancellation window before you pay a deposit.",
      priceEach: 250, free: false, est: true, rec: false, defYes: false,
      maps: "Dill restaurant Reykjavik",
      photoKey: "icelandic_food", photoStandin: "A plate of Icelandic plokkfiskur, used as a food mood photo, not a plate from Dill." },
    { id: "moss", cat: "food", title: "Moss at The Retreat (Michelin star)", photo: "blue_lagoon", day: "Only with a Retreat stay",
      desc: "The Michelin-starred restaurant at The Retreat at Blue Lagoon. This only makes sense if you add a Retreat night, since dinner is not in the room rate.",
      winter: "Book the table with the room. A 2-night minimum may apply to the hotel.",
      priceEach: 280, free: false, est: true, rec: false, defYes: false,
      maps: "Moss Restaurant Blue Lagoon" },
    { id: "grillmarkadurinn", cat: "food", title: "Grillmarkadurinn", photo: "downtown", day: "Flexible",
      desc: "The Grill Market is a lively, reliable Reykjavik dinner: grilled lamb, fish, and a slightly more casual room than the tasting-menu spots.",
      winter: "Still worth booking for NYE week. Est. dinner price, not a live quote.",
      priceEach: 100, free: false, est: true, rec: false, defYes: false,
      maps: "Grillmarkadurinn Reykjavik" },
    { id: "baejarins", cat: "food", title: "Baejarins Beztu hot dog", photo: "baejarins", day: "Anytime",
      desc: "The famous downtown hot-dog stand. Go with everything (ein med ollu): remoulade, mustard, onion, crunchy fried onion. A cheap, cheerful pause between bigger meals.",
      winter: "The stand stays open in the cold. You will eat it standing outside, so keep gloves handy.",
      priceEach: 8, free: false, est: true, rec: false, defYes: false,
      maps: "Baejarins Beztu Pylsur Reykjavik" },
    { id: "fridheimar", cat: "food", title: "Fridheimar tomato greenhouse lunch", photo: "fridheimar", day: "Jan 1, on a Golden Circle day",
      desc: "A greenhouse lunch of tomato soup, bread, and fresh-picked tomatoes, eaten among the vines. It sits on the Golden Circle route and is one of the most charming sit-down stops of the trip.",
      winter: "The greenhouse is warm, which feels wonderful in January. Book a table. Horse shows at the farm are separate if they are running.",
      priceEach: 35, free: false, est: true, rec: false, defYes: false,
      maps: "Fridheimar tomato farm" },
    { id: "sky_lagoon", cat: "spas", title: "Sky Lagoon, Saman pass with the 7-step ritual", photo: "myvatn", day: "Dec 29 evening or Jan 1",
      desc: "An oceanside lagoon in Kopavogur, about 15 minutes from the EDITION. The Saman pass includes the lagoon, a towel, and the Skjol ritual: a sauna with a sea window, a cold plunge, a steam, a body scrub, and a warm drink. A strong in-city spa night.",
      winter: "Winter hours are shorter (often 11 AM to 10 PM on weekdays). Book a late-afternoon slot so you watch dusk from the water. Minimum age 12.",
      priceEach: SKY_EACH, free: false, est: false, rec: true, defYes: true,
      maps: "Sky Lagoon Kopavogur",
      priceNote: "From 14,990 ISK per person for Saman. Time slots can cost more. Ser (private changing room) starts at 17,990 ISK.",
      photoStandin: "This photo is Mývatn Nature Baths in North Iceland, used as a stand-in for a geothermal lagoon. It is not Sky Lagoon, which sits on the Atlantic in Kopavogur." },
    { id: "blue_lagoon", cat: "spas", title: "Blue Lagoon, departure-day soak", photo: "blue_lagoon", day: "Jan 3 late morning",
      desc: "The milky, steamy lagoon is 20 minutes from the airport, which is why it works so well on the way home. The default in this plan is the Lagoon and Lava package: Premium entry (robe, a drink of your choice, extra masks) plus a two-course lunch at Lava. You can switch tiers in the cost sliders.",
      winter: "Water stays about 98 to 104 F year-round. Put conditioner in and keep hair dry. Book a late-morning slot; the flight is 4:55 PM. Check eruption status the day before.",
      priceEach: 186, free: false, est: false, rec: true, defYes: true, sync: "blue_lagoon",
      maps: "Blue Lagoon Iceland" },
    { id: "retreat_massage", cat: "spas", title: "Retreat Spa in-water massage", photo: "blue_lagoon", day: "Only with a Retreat booking",
      desc: "An hour-long massage in the warm lagoon water at The Retreat Spa. It is not in the room rate, and they typically book it only if you are staying or have a spa reservation.",
      winter: "A 2-night minimum may apply to Retreat rooms over the holidays.",
      priceEach: RETREAT_MASSAGE_EACH, free: false, est: false, rec: false, defYes: false,
      maps: "The Retreat at Blue Lagoon Spa",
      priceNote: "About 28,900 ISK for 60 minutes." },
    { id: "fontana", cat: "spas", title: "Laugarvatn Fontana geothermal baths", photo: "fontana", day: "Jan 1, with the Golden Circle",
      desc: "Lakeside steam baths and warm pools on the Golden Circle, with a cold dip in the lake if you are brave. A quieter, more local-feeling stop than the big lagoons. The geothermal rye-bread tour is a separate ticket (about 3,350 ISK).",
      winter: "Open 11 AM to 9 PM from October to May. New Year's Eve hours are often shorter (last year they closed at 6 PM). Book the baths, and the bread tour if you want it.",
      priceEach: FONTANA_EACH, free: false, est: false, rec: false, defYes: false,
      maps: "Laugarvatn Fontana",
      priceNote: "Adult bath ticket 7,490 ISK, from Fontana's 2026 price list." },
    { id: "hvammsvik", cat: "spas", title: "Hvammsvik Hot Springs", photo: "krossnes", day: "A rest morning near Reykjavik",
      desc: "Eight seaside pools on Hvalfjordur, about a 45-minute drive north of Reykjavik. Quieter and more natural-feeling than the city lagoons, with a sauna, a cold plunge, and a swim-up bar. Classic is the middle tier, with private showers and lockers.",
      winter: "Winter hours often run 10:30 AM to 8:30 PM, last entry 7 PM. Book a timed slot. Age 10 and up.",
      priceEach: HVAMMSVIK_EACH, free: false, est: true, rec: false, defYes: false,
      maps: "Hvammsvik Hot Springs",
      priceNote: "Classic is 7,900 to 11,900 ISK depending on the time slot. This plan uses a mid estimate of about $80 per person.",
      photoStandin: "This photo is Krossneslaug, a seaside geothermal pool in the Westfjords, used as a stand-in. It is not Hvammsvik, whose eight pools sit on Hvalfjordur, about 45 minutes from Reykjavik." },
    { id: "edition_spa", cat: "spas", title: "EDITION Spa signature massage", photo: "edition_int", day: "A quiet afternoon in town",
      desc: "The hotel has a full spa (sauna, steam, hammam, hot tub), not an in-room treatment we could verify. The 60-minute signature massage uses Swedish techniques and the hotel's Black Tea oil. Hotel guests pay 4,350 ISK (about $35) a day for spa access if they are not booking a treatment.",
      winter: "Book ahead for holiday week. Ages 18 and up for the spa.",
      priceEach: EDITION_SPA_EACH, free: false, est: false, rec: false, defYes: false,
      maps: "The Reykjavik EDITION Spa",
      priceNote: "60-minute signature massage 28,900 ISK, from the hotel's spa menu." },
    { id: "shopping_downtown", cat: "shopping", title: "Hafnartorg and Laugavegur boutiques", photo: "laugavegur", day: "Dec 29",
      desc: "The EDITION opens onto Hafnartorg, a new harbor-side cluster of shops and cafes, and Laugavegur (the main shopping street) is a short walk uphill. A gentle first-day wander, even if you buy nothing.",
      winter: "Sidewalks can be slushy. Many shops shut early on New Year's Eve and New Year's Day.",
      priceEach: 0, free: true, est: false, rec: false, defYes: true,
      maps: "Laugavegur Reykjavik" },
    { id: "wool_shops", cat: "shopping", title: "66 North and Rammagerdin", photo: "wool", day: "Dec 29 or Jan 2",
      desc: "66 North is the modern Icelandic outerwear house (good for a serious shell or a knit). Rammagerdin is the classic design-and-wool shop for a lopapeysa or a small gift. Walk in freely; this card does not add a shopping budget.",
      winter: "Useful if you discover a gap in your cold-weather kit. Try pieces on over a midlayer.",
      priceEach: 0, free: true, est: false, rec: false, defYes: false,
      maps: "66 North Laugavegur Reykjavik",
      photoStandin: "A traditional Icelandic lopapeysa, not a 66 North store display." },
    { id: "kolaportid", cat: "shopping", title: "Kolaportid flea market", photo: "downtown", day: "Sat Jan 2",
      desc: "Reykjavik's weekend flea market by the harbor: vintage wool, vinyl, candy, and fermented shark if you are brave. Entry is free. It usually runs Saturday and Sunday, so Saturday Jan 2 is your realistic window before the flight.",
      winter: "Confirm holiday hours. It may be closed or shortened around New Year's. Sunday Jan 3 is tight with the lagoon and a 4:55 PM flight.",
      priceEach: 0, free: true, est: false, rec: false, defYes: false,
      maps: "Kolaportid Reykjavik" },
    { id: "golden_circle", cat: "sidetrips", title: "Golden Circle day", photo: "gullfoss", day: "Jan 1",
      desc: "Thingvellir, Geysir, and Gullfoss, the easiest classic day from town (Thingvellir is about 45 minutes out). Add Fridheimar and Fontana if you want lunch and a soak on the same loop.",
      winter: "Roads are usually open but can be icy. A guided tour is the low-stress version. If you self-drive, turn this card off and use the rental-car slider instead, so you do not pay twice.",
      priceEach: 120, free: false, est: true, rec: false, defYes: false,
      maps: "Gullfoss Iceland" },
    { id: "south_coast", cat: "sidetrips", title: "South Coast waterfalls and black beach", photo: "skogafoss", day: "Jan 2",
      desc: "Seljalandsfoss (you can walk behind it if ice allows), Skogafoss, and Reynisfjara black beach near Vik. About 2 hours to the first falls, 2 hours 20 minutes to Skogafoss. A full, dramatic day.",
      winter: "Reynisfjara has sneaker waves. Stay well up the beach. Parking lots and spray can be icy. Same note as the Golden Circle: turn this off if you are self-driving with the car slider.",
      priceEach: 140, free: false, est: true, rec: false, defYes: false,
      maps: "Skogafoss Iceland" },
    { id: "jokulsarlon", cat: "sidetrips", title: "Jokulsarlon overnight: ice cave, Diamond Beach, aurora", photo: "ice_cave", day: "Dec 30 to Dec 31 morning",
      desc: "The signature winter add-on. Fly from Reykjavik domestic (not Keflavik) to Hofn in about 55 minutes, drive an hour, walk into a blue ice cave, watch ice on black sand around the late 11 AM sunrise, look for seals at the lagoon mouth, and hope for lights over the icebergs that night. Fly back on the 31st for New Year's Eve in town.",
      winter: "Domestic winter cancellations are common, so this is a tighter plan than going Dec 29 to 30. Book a morning cave with free cancellation. Boat tours are done for the season. This card adds the Hofn flights, a standard ice-cave tour, and one Hofn-area hotel night (and trims an EDITION night).",
      priceEach: 0, free: false, est: false, rec: true, defYes: false, sync: "jokulsarlon",
      maps: "Jokulsarlon glacier lagoon",
      dynamic: "jokulsarlon" },
    { id: "katla", cat: "sidetrips", title: "Katla ice cave", photo: "ice_cave", day: "Jan 2, if you skip the overnight",
      desc: "A year-round ice cave under Myrdalsjokull, near Vik, with ash-striped black ice. A strong backup if you do not fly to Hofn, since it sits on the South Coast day.",
      winter: "Still a guided trip with helmets and a super jeep. Weather can close the road.",
      priceEach: KATLA_EACH, free: false, est: false, rec: false, defYes: false,
      maps: "Katla ice cave",
      priceNote: "From about 23,990 ISK per person." },
    { id: "silfra", cat: "sidetrips", title: "Silfra snorkel, Thingvellir", photo: "silfra", day: "Jan 1, with the Golden Circle",
      desc: "You float in a dry suit through the crack between the North American and Eurasian plates, in water so clear it looks like air. It is cold, strange, and unforgettable, and it sits right at Thingvellir.",
      winter: "The water is about 35 to 39 F year-round. Operators still run in winter with dry suits. You need to be comfortable in cold water. Price is an estimate.",
      priceEach: 180, free: false, est: true, rec: false, defYes: false,
      maps: "Silfra Thingvellir" },
    { id: "nye_bonfire", cat: "nye", title: "Neighborhood New Year's Eve bonfire", photo: "bonfire", day: "Dec 31",
      desc: "Reykjavik neighborhoods light huge bonfires in the evening, before the midnight fireworks. It is communal, smoky, and one of the most local feelings you can have here in winter.",
      winter: "Dress for standing still in the wind. The city publishes bonfire sites each year; pick one you can walk or taxi to from the EDITION.",
      priceEach: 0, free: true, est: false, rec: false, defYes: true,
      maps: "Reykjavik New Year bonfire" },
    { id: "nye_fireworks", cat: "nye", title: "Midnight fireworks from a viewpoint", photo: "nye_fireworks", day: "Dec 31",
      desc: "At midnight the whole city sets off fireworks. Hallgrimskirkja's steps and the area around Perlan are classic viewpoints. The EDITION's harbor side is also close to the action if you want to stay nearby.",
      winter: "It is a late, cold, crowded hour. Perlan's paid deck may be ticketed or closed; the public hillside and the church grounds are the simple plan.",
      priceEach: 0, free: true, est: false, rec: true, defYes: true,
      maps: "Hallgrimskirkja Reykjavik" },
    { id: "nye_dinner", cat: "nye", title: "New Year's Eve dinner in Reykjavik", photo: "downtown", day: "Dec 31",
      desc: "A sit-down dinner before the bonfires and fireworks. Many kitchens run a set holiday menu. Tides at the hotel is the lowest-friction option; Dill or Grillmarkadurinn if you want to go out (those cards are priced separately, so leave this one off if you pick a specific restaurant).",
      winter: "Book now. Holiday menus are prix fixe and fill up.",
      priceEach: 180, free: false, est: true, rec: false, defYes: false,
      maps: "Reykjavik city center restaurants" },
    { id: "aramotaskaup", cat: "nye", title: "Aramotaskaup, the New Year's TV comedy", photo: "downtown", day: "Dec 31",
      desc: "Iceland's annual satirical New Year's Eve TV revue. Locals watch it before midnight, then head out for the fireworks. You can stream or catch it in a bar or at the hotel if it is on. A small, very Icelandic tradition.",
      winter: "It usually airs in the evening on Dec 31. English is not guaranteed; the room's reaction is half the fun.",
      priceEach: 0, free: true, est: false, rec: false, defYes: true,
      maps: "Reykjavik" },
    { id: "nl_guided", cat: "lights", title: "Guided northern lights tour", photo: "aurora_hofn", day: "Early in the trip",
      desc: "A guide drives you to wherever the clouds are breaking. Most operators offer a free retry if you see nothing, which is why it helps to book this early in the week. Use the slider in costs to set the per-person price ($70 to $120).",
      winter: "Late December is the darkest window of the year. Clouds are the real limit. Watch vedur.is for the cloud map, not just the KP number.",
      priceEach: 95, free: false, est: false, rec: true, defYes: false, sync: "nl_tour",
      maps: "Reykjavik northern lights tour" },
    { id: "nl_self", cat: "lights", title: "Self-guided aurora watch", photo: "hero_aurora", day: "Any clear night",
      desc: "If the forecast looks good, you do not need a tour. Grotta is ten minutes away. Thingvellir is darker. Jokulsarlon, if you take the overnight, is one of the best backdrops in the country. The My Aurora Forecast app is handy for alerts.",
      winter: "You need a dark, clear sky and activity around KP 2 or higher. Give it more than one night.",
      priceEach: 0, free: true, est: false, rec: false, defYes: true,
      maps: "Grotta lighthouse Reykjavik" }
  ];

  var CAT_LABEL = {
    daytime: "Daytime activities",
    evening: "Evening options",
    food: "Food and drink",
    spas: "Spas and lagoons",
    shopping: "Shopping",
    sidetrips: "Side trips",
    nye: "New Year's Eve",
    lights: "Northern lights"
  };

  var defaultPicks = {};
  CATALOG.forEach(function (c) { defaultPicks[c.id] = !!c.defYes; });

  var state = {};
  var flipIndex = 0;
  var flipOn = false;
  var catalogFilter = "all";

  function money(n) {
    n = Math.round(Number(n) || 0);
    return "$" + n.toLocaleString("en-US");
  }

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  state = clone(DEFAULTS);
  state.picks = clone(defaultPicks);
  if (!state.carId) state.carId = "none";

  function load() {
    state = clone(DEFAULTS);
    state.picks = clone(defaultPicks);
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        Object.keys(DEFAULTS).forEach(function (k) {
          if (k === "picks") return;
          if (saved[k] !== undefined) state[k] = saved[k];
        });
        if (saved.picks) {
          CATALOG.forEach(function (c) {
            if (saved.picks[c.id] !== undefined) state.picks[c.id] = saved.picks[c.id];
          });
        }
      }
    } catch (e) {}
    syncFromPicks(false);
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function clampInt(v, min, max) {
    v = parseInt(v, 10);
    if (isNaN(v)) v = min;
    if (v < min) v = min;
    if (v > max) v = max;
    return v;
  }

  function trimEdition(overflow) {
    var cut = Math.min(state.suiteNights, overflow);
    state.suiteNights -= cut;
    overflow -= cut;
    if (overflow > 0) state.superiorNights = Math.max(0, state.superiorNights - overflow);
  }
  function editionNights() { return state.superiorNights + state.suiteNights; }
  function panoRate() { return PANO[state.panorama] || PANO.standard; }
  function cabinNights() { return state.panoNights + state.buubbleNights + state.auroraNights; }
  function stayNights() { return editionNights() + state.hofnNights + state.retreatNights + cabinNights(); }
  function lodgingNights() { return stayNights() + (state.holdDec28 ? 1 : 0); }
  function expectedNights() { return TRIP_NIGHTS + (state.holdDec28 ? 1 : 0); }
  function editionCompare() {
    if (state.suiteNights > 0) return { rate: state.suiteRate, label: "Deluxe Suite" };
    if (state.superiorNights > 0) return { rate: SUPERIOR_RATE, label: "Superior King" };
    return { rate: state.suiteRate, label: "Deluxe Suite" };
  }
  function editionRateForHold() {
    if (state.suiteNights > 0) return state.suiteRate;
    if (state.superiorNights > 0) return SUPERIOR_RATE;
    return state.suiteRate;
  }
  function deltaText(name, nights, rate) {
    if (!nights) return "";
    var cmp = editionCompare();
    var cabinTotal = nights * rate;
    var editionTotal = nights * cmp.rate;
    var d = cabinTotal - editionTotal;
    var vs = d < 0 ? money(-d) + " less than EDITION" : (d > 0 ? money(d) + " more than EDITION" : "the same as EDITION");
    return nights + " night" + (nights === 1 ? "" : "s") + " at " + name + " is " + money(cabinTotal) + " per cabin, vs " + money(editionTotal) + " for the same nights in a " + cmp.label + " (" + vs + ").";
  }
  function allDeltaLines() {
    var lines = [];
    if (state.panoNights > 0) lines.push(deltaText("Panorama Glass Lodge " + (state.panorama === "premium" ? "Premium" : "Standard"), state.panoNights, panoRate()));
    if (state.buubbleNights > 0) lines.push(deltaText("Buubble", state.buubbleNights, BUUBBLE_RATE));
    if (state.auroraNights > 0) lines.push(deltaText("Aurora Igloo", state.auroraNights, state.auroraRate));
    return lines;
  }
  function afterAltLodging() {
    var overflow = stayNights() - TRIP_NIGHTS;
    if (overflow > 0) trimEdition(overflow);
  }
  function paidBlVisits() {
    if (state.blTier === "none") return 0;
    var visits = state.blVisits;
    if (state.retreatNights > 0 && visits > 0) visits = Math.max(0, visits - 1);
    return visits;
  }
  function icePriceEach() {
    if (state.iceCave === "standard") return state.iceCaveRate;
    if (state.iceCave === "long") return 290;
    return 0;
  }

  function jokulsarlonCost() {
    var flights = 115 * 2 * PEOPLE;
    var cave = icePriceEach() * PEOPLE;
    if (state.iceCave === "none") cave = 175 * PEOPLE;
    var hotel = (state.hofnNights || 1) * state.hofnRate;
    return flights + cave + hotel;
  }

  function itemPrice(c) {
    if (c.sync === "blue_lagoon") {
      var tier = state.blTier === "none" ? "lava" : state.blTier;
      var visits = Math.max(1, state.blVisits || 1);
      if (state.retreatNights > 0) visits = Math.max(0, visits - 1);
      return BL[tier] * visits * PEOPLE;
    }
    if (c.sync === "jokulsarlon") return jokulsarlonCost();
    if (c.sync === "nl_tour") return (state.nlRate || 95) * (state.nlCount || 1) * PEOPLE;
    if (c.free) return 0;
    return c.priceEach * PEOPLE;
  }

  function itemPriceEach(c) {
    return itemPrice(c) / PEOPLE;
  }

  function pickCostBreakdown() {
    var extra = 0;
    var rows = [];
    CATALOG.forEach(function (c) {
      if (!state.picks[c.id]) return;
      if (c.sync === "blue_lagoon" || c.sync === "jokulsarlon" || c.sync === "nl_tour") return;
      var p = itemPrice(c);
      if (p > 0) {
        extra += p;
        rows.push({ id: c.id, title: c.title, amount: p });
      }
    });
    return { extra: extra, rows: rows };
  }

  function compute() {
    var flightsIntl = FLIGHT[state.flightClass] * PEOPLE;
    var flightsHofn = state.hofnFlights ? 115 * 2 * PEOPLE : 0;
    var flights = flightsIntl + flightsHofn;

    var holdCost = state.holdDec28 ? editionRateForHold() : 0;
    var lodgingEdition = state.superiorNights * SUPERIOR_RATE + state.suiteNights * state.suiteRate + holdCost;
    var lodgingHofn = state.hofnNights * state.hofnRate;
    var lodgingRetreat = state.retreatNights * state.retreatRate;
    var lodgingPano = state.panoNights * panoRate();
    var lodgingBuubble = state.buubbleNights * BUUBBLE_RATE;
    var lodgingAurora = state.auroraNights * state.auroraRate;
    var lodgingCabins = lodgingPano + lodgingBuubble + lodgingAurora;
    var lodging = lodgingEdition + lodgingHofn + lodgingRetreat + lodgingCabins;

    var bl = paidBlVisits() * BL[state.blTier] * PEOPLE;
    var ice = icePriceEach() * PEOPLE;
    var lights = state.nlTour ? state.nlRate * state.nlCount * PEOPLE : 0;
    var pick = pickCostBreakdown();
    var experiences = bl + ice + lights + pick.extra;

    var food = state.foodRate * state.foodDays * PEOPLE;
    var car = carPackageTotal();
    var total = flights + lodging + experiences + food + car;
    return {
      flightsIntl: flightsIntl, flightsHofn: flightsHofn, flights: flights,
      lodgingEdition: lodgingEdition, lodgingHofn: lodgingHofn, lodgingRetreat: lodgingRetreat,
      lodgingPano: lodgingPano, lodgingBuubble: lodgingBuubble, lodgingAurora: lodgingAurora,
      lodgingCabins: lodgingCabins, holdCost: holdCost, lodging: lodging,
      bl: bl, ice: ice, lights: lights, pickExtra: pick.extra, pickRows: pick.rows,
      experiences: experiences, food: food, car: car, total: total, each: total / PEOPLE
    };
  }

  function syncFromPicks(trim) {
    var onBL = !!state.picks.blue_lagoon;
    if (onBL) {
      if (state.blTier === "none") state.blTier = "lava";
      if (state.blVisits < 1) state.blVisits = 1;
    } else {
      state.blVisits = 0;
    }
    var onJ = !!state.picks.jokulsarlon;
    if (onJ) {
      state.hofnFlights = true;
      if (state.iceCave === "none") state.iceCave = "standard";
      if (state.hofnNights < 1) state.hofnNights = 1;
      if (trim !== false) afterAltLodging();
    } else {
      state.hofnFlights = false;
      state.iceCave = "none";
      state.hofnNights = 0;
    }
    state.nlTour = !!state.picks.nl_guided;
  }

  function syncPicksFromSliders() {
    state.picks.blue_lagoon = state.blVisits > 0 && state.blTier !== "none";
    state.picks.jokulsarlon = !!(state.hofnFlights || state.hofnNights > 0 || state.iceCave !== "none");
    state.picks.nl_guided = !!state.nlTour;
  }

  function setPick(id, on) {
    state.picks[id] = !!on;
    var c = CATALOG.filter(function (x) { return x.id === id; })[0];
    if (c && c.sync) syncFromPicks(true);
    afterChange();
  }


  var CAT_ORDER = ["daytime", "evening", "food", "spas", "shopping", "sidetrips", "nye", "lights"];

  function ytButton(v) {
    return '<button type="button" class="yt" data-yt="' + v.id + '" aria-label="Play ' + esc(v.title) + '">' +
      '<img src="https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg" alt="' + esc(v.title) + '" loading="lazy">' +
      '<span class="play" aria-hidden="true"></span>' +
      '<span class="cap">' + esc(v.kind) + " · " + esc(v.ch) + "</span>" +
      "</button>";
  }

  function renderVideos() {
    document.querySelectorAll("[data-videos]").forEach(function (el) {
      if (el.getAttribute("data-ready") === "1") return;
      var keys = (el.getAttribute("data-videos") || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
      var html = "";
      keys.forEach(function (k) {
        (VIDEOS[k] || []).forEach(function (v) { html += ytButton(v); });
      });
      el.innerHTML = html;
      el.setAttribute("data-ready", "1");
    });
  }

  function playVideo(btn) {
    var id = btn.getAttribute("data-yt");
    if (!id) return;
    var src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
    btn.outerHTML = '<iframe src="' + src + '" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  }

  function catalogItems() {
    if (catalogFilter === "all") return CATALOG.slice();
    return CATALOG.filter(function (c) { return c.cat === catalogFilter; });
  }

  function priceLabel(c) {
    if (c.free) return { big: "Free", sub: "" };
    var tot = itemPrice(c);
    var each = itemPriceEach(c);
    var est = c.est ? "est. " : "";
    if (c.sync === "jokulsarlon") return { big: money(tot), sub: est + "for two, overnight bundle" };
    return { big: est + money(each) + " pp", sub: money(tot) + " for two" };
  }

  function renderSliders() {
    var root = document.getElementById("cats");
    if (!root) return;
    root.innerHTML = CAT_ORDER.map(function (cat) {
      var items = CATALOG.filter(function (c) { return c.cat === cat; });
      var cards = items.map(function (c) {
        var on = !!state.picks[c.id];
        var pl = priceLabel(c);
        var rec = c.rec ? '<span class="rec">Our recommendation</span>' : "";
        var winter = c.winter ? '<p class="tip"><strong>Winter:</strong> ' + c.winter + "</p>" : "";
        var standin = c.photoStandin ? '<p class="standin">' + c.photoStandin + "</p>" : "";
        var note = c.priceNote ? '<p class="credit">' + c.priceNote + "</p>" : "";
        var photoKey = c.photoKey || c.photo;
        return "<article class='idea" + (on ? " is-yes" : "") + "' data-id='" + c.id + "'>" +
          photoBlock(photoKey, "idea-photo", c.title) +
          "<div class='idea-body'>" +
          "<p class='idea-cat'>" + CAT_LABEL[c.cat] + " · " + c.day + "</p>" +
          rec +
          "<h3>" + c.title + "</h3>" +
          "<p>" + c.desc + "</p>" + winter + standin +
          "<div class='idea-foot'>" +
          "<div class='idea-price'><strong>" + pl.big + "</strong>" + (pl.sub ? "<small>" + pl.sub + "</small>" : "") + "</div>" +
          "<button type='button' class='yn " + (on ? "yes" : "no") + "' data-toggle='" + c.id + "' aria-pressed='" + (on ? "true" : "false") + "'>" + (on ? "Yes" : "No") + "</button>" +
          "</div>" + note +
          "<p class='maplink'><a href='https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(c.maps) + "' target='_blank' rel='noopener'>Open in Google Maps</a></p>" +
          "</div></article>";
      }).join("");
      return '<div class="cat-block" id="cat-' + cat + '">' +
        '<div class="slider-head"><h3>' + CAT_LABEL[cat] + '</h3>' +
        '<div class="arrows"><button type="button" class="slide-prev" data-slider="cat-' + cat + '" aria-label="Previous">‹</button>' +
        '<button type="button" class="slide-next" data-slider="cat-' + cat + '" aria-label="Next">›</button></div></div>' +
        '<div class="slider" id="slider-' + cat + '">' + cards + "</div></div>";
    }).join("");
  }

  function renderCars() {
    var root = document.getElementById("carSlider");
    if (!root) return;
    root.innerHTML = ["budget", "mid", "premium"].map(function (id) {
      var c = CARS[id];
      var on = state.carId === id;
      var rec = c.rec ? '<span class="rec">Our recommendation</span>' : "";
      return '<article class="car-card' + (on ? " is-on" : "") + (c.rec ? " is-rec" : "") + '">' +
        rec +
        "<h3>" + c.title + "</h3>" +
        "<p class='price-line'>" + (c.est ? "est. " : "") + money(c.daily) + " a day · " + (c.est ? "est. " : "") + money(c.vehicle) + " for 6 days</p>" +
        "<p class='trip'>With recommended Full Cover: " + (c.est ? "est. " : "") + money(c.trip) + " for the trip</p>" +
        "<p>" + c.blurb + "</p>" +
        "<p class='credit'>" + c.model + ". " + c.age + ". Vehicle " + c.iskVehicle.toLocaleString("en-US") + " ISK, plus Full Cover at " + money(c.coverDaily) + " a day (" + money(c.cover) + "). " + c.source + " Full Cover is Blue's zero-excess package, $44 to $54 a day depending on the car (verified Nov 14, 2026). If you book Hertz, MAX Cover is $48 a day on a 4x4 or $40 on a small car, plus a $45 airport charge.</p>" +
        '<button type="button" class="choose-car" data-car="' + id + '">' + (on ? "Added to the total" : "Add this car") + "</button>" +
        "</article>";
    }).join("");
    var hint = document.getElementById("carTotalHint");
    var t = compute();
    if (hint) {
      if (state.carId === "none") {
        hint.textContent = "No car is in the total yet. Add the recommended Defender 110, with Full Cover, and the trip total goes from " + money(t.total) + " to " + money(t.total + CARS.premium.trip) + ", est. Holiday week can price above the published from-rates.";
      } else {
        var c = CARS[state.carId];
        hint.textContent = "The " + c.title + " with Full Cover adds " + (c.est ? "est. " : "") + money(c.trip) + ". The trip total is now " + (c.est ? "est. " : "") + money(t.total) + ".";
      }
    }
  }

  function renderPicksSummary(t) {
    var el = document.getElementById("picksSummary");
    if (!el) return;
    var names = CATALOG.filter(function (c) { return state.picks[c.id]; }).map(function (c) { return c.title; });
    el.innerHTML = names.length
      ? "<span>Your picks: " + names.join(", ") + ".</span>"
      : "<span>No extras selected. A brave, empty calendar.</span>";
  }

  function renderCosts(t) {
    var two = document.getElementById("totalTwo");
    var each = document.getElementById("totalEach");
    var preview = document.getElementById("costsPreview");
    if (two) two.textContent = money(t.total);
    if (each) each.textContent = money(t.each);
    if (preview) preview.textContent = money(t.total) + " for two";
    var br = document.getElementById("breakdown");
    if (br) {
      br.innerHTML =
        "<span>Flights <b>" + money(t.flights) + "</b></span>" +
        "<span>Lodging <b>" + money(t.lodging) + "</b></span>" +
        "<span>Experiences <b>" + money(t.experiences) + "</b></span>" +
        "<span>Food <b>" + money(t.food) + "</b></span>" +
        "<span>Car <b>" + money(t.car) + "</b></span>";
    }
    var note = document.getElementById("nightsNote");
    if (note) {
      if (stayNights() === TRIP_NIGHTS) {
        note.className = "note";
        note.textContent = state.holdDec28
          ? "Stay nights add up to 5, plus the Dec 28 hold (6 nights charged)."
          : "Stay nights add up to 5 (Dec 29 to Jan 3), which matches the default hotel stay.";
      } else if (stayNights() > TRIP_NIGHTS) {
        note.className = "warn";
        note.textContent = "You have " + stayNights() + " stay nights for a 5-night hotel stay" + (state.holdDec28 ? " (the Dec 28 hold is extra)." : ".") + " Trim an EDITION, Hofn, Retreat, or glass-lodge night, or leave the overlap if a room will sit empty.";
      } else {
        note.className = "warn";
        note.textContent = "You have " + stayNights() + " stay night" + (stayNights() === 1 ? "" : "s") + " for a 5-night hotel stay.";
      }
    }
    var deltaBox = document.getElementById("deltaBox");
    if (deltaBox) {
      var deltas = allDeltaLines();
      if (deltas.length) {
        var anyMore = (state.panoNights > 0 && panoRate() > editionCompare().rate) || (state.buubbleNights > 0 && BUUBBLE_RATE > editionCompare().rate) || (state.auroraNights > 0 && state.auroraRate > editionCompare().rate);
        deltaBox.hidden = false;
        deltaBox.className = "delta" + (anyMore ? " more" : "");
        deltaBox.innerHTML = deltas.map(function (d) { return "<p>" + d + "</p>"; }).join("");
      } else {
        deltaBox.hidden = true;
        deltaBox.innerHTML = "";
      }
    }
    var ev = function (id, fn) { var el = document.getElementById(id); if (el) fn(el); };
    ev("suiteRateVal", function (el) { el.textContent = money(state.suiteRate); });
    ev("retreatRateVal", function (el) { el.textContent = money(state.retreatRate); });
    ev("iceCaveRateVal", function (el) { el.textContent = money(state.iceCaveRate); });
    ev("nlRateVal", function (el) { el.textContent = money(state.nlRate); });
    ev("foodRateVal", function (el) { el.textContent = money(state.foodRate); });
    ev("iceRateWrap", function (el) { el.style.display = state.iceCave === "standard" ? "" : "none"; });
    ev("auroraRateVal", function (el) { el.textContent = money(state.auroraRate); });
  }

  function fieldRange(id, label, min, max, suffix) {
    return '<div class="field"><label for="' + id + '">' + label + ' <strong id="' + id + 'Val"></strong></label>' +
      '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '"></div>';
  }
  function fieldNum(id, label, min, max) {
    return '<div class="field"><label for="' + id + '">' + label + '</label>' +
      '<input type="number" id="' + id + '" min="' + min + '" max="' + max + '"></div>';
  }
  function segs(bind, opts) {
    return '<div class="seg" role="group">' + opts.map(function (o) {
      return '<button type="button" data-bind="' + bind + '" data-value="' + o.v + '">' + o.l + "</button>";
    }).join("") + "</div>";
  }

  function renderCostFieldsOnce() {
    var root = document.getElementById("costFields");
    if (!root || root.getAttribute("data-ready") === "1") return;
    root.innerHTML =
      '<div class="field"><label>Flights</label>' + segs("flightClass", [{ v: "economy", l: "Economy, $1,490 pp" }, { v: "business", l: "Saga Premium, $3,190 pp" }]) + "</div>" +
      '<div class="field"><label>EDITION room mix</label>' + fieldNum("superiorNights", "Superior King nights ($1,160)", 0, 6) + fieldNum("suiteNights", "Deluxe Suite nights", 0, 6) + "</div>" +
      fieldRange("suiteRate", "Deluxe Suite rate", 2210, 2670) +
      '<div class="field"><label>Optional Dec 28 hold</label><button type="button" class="tog" id="holdDec28Btn">Dec 28 hold</button></div>' +
      fieldNum("retreatNights", "Retreat nights", 0, 2) +
      fieldRange("retreatRate", "Retreat rate", 2350, 2840) +
      fieldNum("hofnNights", "Hofn nights", 0, 3) +
      fieldNum("hofnRate", "Hofn rate (placeholder, editable)", 80, 800) +
      '<div class="field"><label>Hofn flights, $115 pp each way</label><button type="button" class="tog" id="hofnFlightsBtn">RKV to Hofn flights</button></div>' +
      '<div class="field"><label>Panorama cabin</label>' + segs("panorama", [{ v: "standard", l: "Standard $817" }, { v: "premium", l: "Premium $1,104" }]) + fieldNum("panoNights", "Panorama nights", 0, 2) + "</div>" +
      fieldNum("buubbleNights", "Buubble nights ($253)", 0, 2) +
      fieldNum("auroraNights", "Aurora Igloo nights", 0, 2) +
      fieldRange("auroraRate", "Aurora Igloo estimate", 150, 800) +
      '<div class="field"><label>Blue Lagoon tier</label>' + segs("blTier", [{ v: "none", l: "None" }, { v: "comfort", l: "Comfort $105" }, { v: "premium", l: "Premium $130" }, { v: "lava", l: "Lagoon and Lava $186" }]) + fieldNum("blVisits", "Blue Lagoon visits", 0, 2) + "</div>" +
      '<div class="field"><label>Ice cave</label>' + segs("iceCave", [{ v: "none", l: "None" }, { v: "standard", l: "Standard" }, { v: "long", l: "Long, $290" }]) + '<div id="iceRateWrap">' + fieldRange("iceCaveRate", "Standard ice-cave rate", 162, 194) + "</div></div>" +
      '<div class="field"><label>Guided northern lights tour</label><button type="button" class="tog" id="nlTourBtn">Add the tour</button>' + fieldNum("nlCount", "Tour nights", 1, 3) + fieldRange("nlRate", "Tour rate pp", 70, 120) + "</div>" +
      fieldRange("foodRate", "Food per person per day", 60, 300) +
      fieldNum("foodDays", "Food days", 1, 8) +
      '<div class="field"><label>Car in the total</label><p class="credit">Pick a car in the car chapter. The recommended Defender 110 is shown there, not preselected. The number includes Full Cover for 6 days and is est. for the holiday week.</p></div>';
    root.setAttribute("data-ready", "1");
  }

  function syncForm() {
    var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
    set("superiorNights", state.superiorNights);
    set("suiteNights", state.suiteNights);
    set("suiteRate", state.suiteRate);
    set("hofnNights", state.hofnNights);
    set("hofnRate", state.hofnRate);
    set("retreatNights", state.retreatNights);
    set("retreatRate", state.retreatRate);
    set("blVisits", state.blVisits);
    set("iceCaveRate", state.iceCaveRate);
    set("nlCount", state.nlCount);
    set("nlRate", state.nlRate);
    set("foodRate", state.foodRate);
    set("foodDays", state.foodDays);
    set("panoNights", state.panoNights);
    set("buubbleNights", state.buubbleNights);
    set("auroraNights", state.auroraNights);
    set("auroraRate", state.auroraRate);
    setSeg("flightClass", state.flightClass);
    setSeg("blTier", state.blTier);
    setSeg("iceCave", state.iceCave);
    setSeg("panorama", state.panorama);
    setToggle("hofnFlightsBtn", state.hofnFlights);
    setToggle("nlTourBtn", state.nlTour);
    setToggle("holdDec28Btn", state.holdDec28);
  }

  function setSeg(bind, value) {
    document.querySelectorAll('[data-bind="' + bind + '"]').forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-value") === value ? "true" : "false");
    });
  }
  function setToggle(id, on) {
    var el = document.getElementById(id);
    if (el) el.setAttribute("aria-pressed", on ? "true" : "false");
  }

  function renderFlip() {
    var items = CATALOG;
    if (flipIndex >= items.length) flipIndex = items.length - 1;
    if (flipIndex < 0) flipIndex = 0;
    var c = items[flipIndex];
    var on = !!state.picks[c.id];
    var pl = priceLabel(c);
    var fp = document.getElementById("flipPhoto");
    if (!fp) return;
    fp.className = "flip-photo ph";
    fp.setAttribute("aria-label", c.title);
    var url = PHOTO_URLS[c.photoKey || c.photo] || "";
    fp.innerHTML = (url ? '<img src="' + url + '" alt="' + esc(c.title) + '" loading="lazy" onload="this.classList.add(&quot;is-ok&quot;)" onerror="window.__imgFail(this)">' : "") +
      '<div class="ph-fallback">' + esc(c.title) + "</div>";
    document.getElementById("flipKicker").textContent = CAT_LABEL[c.cat] + " · " + c.day;
    document.getElementById("flipTitle").textContent = c.title;
    document.getElementById("flipDesc").textContent = c.desc;
    document.getElementById("flipWinter").innerHTML = "<strong>Winter:</strong> " + c.winter;
    document.getElementById("flipStandin").textContent = c.photoStandin || "";
    document.getElementById("flipStandin").hidden = !c.photoStandin;
    document.getElementById("flipPrice").innerHTML = "<strong>" + pl.big + "</strong>" + (pl.sub ? "<small>" + pl.sub + "</small>" : "");
    document.getElementById("flipProgress").textContent = (flipIndex + 1) + " of " + items.length;
    document.getElementById("flipBar").style.width = ((flipIndex + 1) / items.length * 100) + "%";
    var y = document.getElementById("flipYes");
    var n = document.getElementById("flipNo");
    y.className = "yn yes" + (on ? "" : "");
    n.className = "yn no";
    if (on) { y.setAttribute("aria-pressed", "true"); n.setAttribute("aria-pressed", "false"); }
    else { y.setAttribute("aria-pressed", "false"); n.setAttribute("aria-pressed", "true"); }
    document.getElementById("flipRec").hidden = !c.rec;
  }

  function render() {
    var t = compute();
    renderCostFieldsOnce();
    renderCosts(t);
    renderSliders();
    renderCars();
    renderPicksSummary(t);
    renderVideos();
    if (flipOn) renderFlip();
  }

  function afterChange() {
    syncForm();
    render();
    save();
  }

  function setCar(id) {
    if (state.carId === id) state.carId = "none";
    else state.carId = id;
    state.car = state.carId !== "none";
    afterChange();
  }

  var SHARE_KEYS = ["flightClass","superiorNights","suiteNights","suiteRate","hofnNights","hofnRate","retreatNights","retreatRate","blTier","blVisits","iceCave","iceCaveRate","hofnFlights","nlTour","nlCount","nlRate","foodRate","foodDays","holdDec28","panorama","panoNights","buubbleNights","auroraNights","auroraRate","carId"];

  function compactState() {
    var o = { v: 1, carId: state.carId || "none", picks: [] };
    CATALOG.forEach(function (c) { if (state.picks[c.id]) o.picks.push(c.id); });
    SHARE_KEYS.forEach(function (k) {
      if (k === "carId") return;
      if (JSON.stringify(state[k]) !== JSON.stringify(DEFAULTS[k])) o[k] = state[k];
    });
    return o;
  }

  function applyShare(obj) {
    if (!obj || typeof obj !== "object") return;
    SHARE_KEYS.forEach(function (k) {
      if (obj[k] !== undefined) state[k] = obj[k];
    });
    if (Array.isArray(obj.picks)) {
      var set = {};
      obj.picks.forEach(function (id) { set[id] = true; });
      CATALOG.forEach(function (c) { state.picks[c.id] = !!set[c.id]; });
    }
    if (!state.carId) state.carId = "none";
    state.car = state.carId !== "none";
    syncFromPicks(false);
  }

  function readShare() {
    try {
      var q = new URLSearchParams(location.search);
      var raw = q.get("s") || (location.hash && location.hash.indexOf("s=") >= 0 ? new URLSearchParams(location.hash.replace(/^#/, "")).get("s") : null);
      if (!raw) return;
      var json = decodeURIComponent(escape(atob(raw.replace(/-/g, "+").replace(/_/g, "/"))));
      applyShare(JSON.parse(json));
    } catch (e) {}
  }

  function shareUrl() {
    var json = JSON.stringify(compactState());
    var b64 = btoa(unescape(encodeURIComponent(json))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    var path = location.pathname || "/";
    return location.origin + path + "?s=" + b64;
  }

  function copyShare() {
    var url = shareUrl();
    var done = function () {
      var t = document.getElementById("toast");
      if (!t) return;
      t.hidden = false;
      setTimeout(function () { t.hidden = true; }, 2400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(function () {
        window.prompt("Copy this link", url);
        done();
      });
    } else {
      window.prompt("Copy this link", url);
      done();
    }
  }

  function slide(id, dir) {
    var el = document.getElementById(id === "cars" ? "carSlider" : "slider-" + id.replace(/^cat-/, ""));
    if (!el && id.indexOf("cat-") === 0) el = document.getElementById("slider-" + id.slice(4));
    if (id === "cars") el = document.getElementById("carSlider");
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  }

  function relayout() {
    document.querySelectorAll(".slider, #carSlider, svg.imap").forEach(function (el) {
      el.classList.add("is-relayout");
      void el.offsetWidth;
      el.classList.remove("is-relayout");
    });
  }

  var relayoutTimer = 0;
  function scheduleRelayout() {
    clearTimeout(relayoutTimer);
    relayoutTimer = setTimeout(relayout, 120);
  }

  function bind() {
    document.body.addEventListener("click", function (e) {
      var yt = e.target.closest("[data-yt]");
      if (yt) { playVideo(yt); return; }
      var carBtn = e.target.closest("[data-car]");
      if (carBtn) { setCar(carBtn.getAttribute("data-car")); return; }
      var tog = e.target.closest("[data-toggle]");
      if (tog) { setPick(tog.getAttribute("data-toggle"), !state.picks[tog.getAttribute("data-toggle")]); return; }
      var prev = e.target.closest(".slide-prev");
      if (prev) { slide(prev.getAttribute("data-slider"), -1); return; }
      var next = e.target.closest(".slide-next");
      if (next) { slide(next.getAttribute("data-slider"), 1); return; }
    });

    var flipOpen = document.getElementById("openFlip");
    var flipClose = document.getElementById("closeFlip");
    var flip = document.getElementById("flip");
    function showFlip() {
      flipOn = true;
      flip.hidden = false;
      document.body.classList.add("flip-open");
      renderFlip();
    }
    function hideFlip() {
      flipOn = false;
      flip.hidden = true;
      document.body.classList.remove("flip-open");
    }
    if (flipOpen) flipOpen.addEventListener("click", showFlip);
    if (flipClose) flipClose.addEventListener("click", hideFlip);
    var fp = document.getElementById("flipPrev");
    var fn = document.getElementById("flipNext");
    if (fp) fp.addEventListener("click", function () { flipIndex--; renderFlip(); });
    if (fn) fn.addEventListener("click", function () { flipIndex++; renderFlip(); });
    var fy = document.getElementById("flipYes");
    var fno = document.getElementById("flipNo");
    if (fy) fy.addEventListener("click", function () {
      var c = CATALOG[flipIndex];
      setPick(c.id, true);
      if (flipIndex < CATALOG.length - 1) flipIndex++;
      renderFlip();
    });
    if (fno) fno.addEventListener("click", function () {
      var c = CATALOG[flipIndex];
      setPick(c.id, false);
      if (flipIndex < CATALOG.length - 1) flipIndex++;
      renderFlip();
    });
    document.addEventListener("keydown", function (e) {
      if (!flipOn) return;
      if (e.key === "ArrowRight") { flipIndex++; renderFlip(); e.preventDefault(); }
      else if (e.key === "ArrowLeft") { flipIndex--; renderFlip(); e.preventDefault(); }
      else if (e.key === "Escape") hideFlip();
    });

    document.body.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-bind]");
      if (!btn) return;
      state[btn.getAttribute("data-bind")] = btn.getAttribute("data-value");
      syncPicksFromSliders();
      afterChange();
    });

    function togBtn(id, key, extra) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("click", function () {
        state[key] = !state[key];
        if (extra) extra();
        syncPicksFromSliders();
        afterChange();
      });
    }
    togBtn("hofnFlightsBtn", "hofnFlights");
    togBtn("nlTourBtn", "nlTour");
    togBtn("holdDec28Btn", "holdDec28");

    function num(id, key, min, max, onChange) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", function (e) {
        state[key] = clampInt(e.target.value, min, max);
        if (onChange) onChange();
        syncPicksFromSliders();
        afterChange();
      });
    }
    num("superiorNights", "superiorNights", 0, 6);
    num("suiteNights", "suiteNights", 0, 6);
    num("suiteRate", "suiteRate", 2210, 2670);
    num("hofnNights", "hofnNights", 0, 3, afterAltLodging);
    num("hofnRate", "hofnRate", 80, 800);
    num("retreatNights", "retreatNights", 0, 2, afterAltLodging);
    num("retreatRate", "retreatRate", 2350, 2840);
    num("panoNights", "panoNights", 0, 2, afterAltLodging);
    num("buubbleNights", "buubbleNights", 0, 2, afterAltLodging);
    num("auroraNights", "auroraNights", 0, 2, afterAltLodging);
    num("auroraRate", "auroraRate", 150, 800);
    num("blVisits", "blVisits", 0, 2);
    num("iceCaveRate", "iceCaveRate", 162, 194);
    num("nlCount", "nlCount", 1, 3);
    num("nlRate", "nlRate", 70, 120);
    num("foodRate", "foodRate", 60, 300);
    num("foodDays", "foodDays", 1, 8);

    var reset = document.getElementById("resetBtn");
    if (reset) reset.addEventListener("click", function () {
      state = clone(DEFAULTS);
      state.picks = clone(defaultPicks);
      state.carId = "none";
      try { localStorage.removeItem(STORAGE_KEY); } catch (err) {}
      syncFromPicks(false);
      afterChange();
    });

    var costs = document.getElementById("costs");
    var costsBtn = document.getElementById("toggleCosts");
    if (costsBtn && costs) {
      costsBtn.addEventListener("click", function () {
        var open = costs.getAttribute("data-open") === "true";
        costs.setAttribute("data-open", open ? "false" : "true");
        costsBtn.setAttribute("aria-expanded", open ? "false" : "true");
      });
    }
    var shareBtn = document.getElementById("shareBtn");
    if (shareBtn) shareBtn.addEventListener("click", copyShare);
  }

  function boot() {
    load();
    readShare();
    if (!state.carId) state.carId = "none";
    state.car = state.carId !== "none";
    bind();
    syncForm();
    render();
    window.addEventListener("resize", scheduleRelayout, { passive: true });
    window.addEventListener("orientationchange", scheduleRelayout, { passive: true });
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
  }

  window.__icelandCompute = compute;
  window.__icelandDefaults = DEFAULTS;
  window.__icelandState = function () { return state; };
  window.__icelandCatalog = CATALOG;
  window.__icelandCars = CARS;
})();
