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
    icelandair: "images/places/icelandair.jpg",
    ice_cave: "images/places/ice-cave.jpg",
    nye_fireworks: "images/places/nye-fireworks.jpg",
    horses: "images/places/horses-winter.jpg",
    ishestar: "images/places/ishestar.jpg",
    seljalandsfoss: "images/places/seljalandsfoss.jpg",
    harpa: "images/places/harpa.jpg",
    grotta: "images/places/grotta.jpg",
    baejarins: "images/places/baejarins.jpg",
    fridheimar: "images/places/fridheimar.jpg",
    laugavegur: "images/places/laugavegur.jpg",
    fontana: "images/places/fontana.jpg",
    gullfoss: "images/places/gullfoss.jpg",
    skogafoss: "images/places/skogafoss.jpg",
    silfra: "images/places/silfra.jpg",
    blue_lagoon: "images/places/blue-lagoon.jpg",
    aurora_hofn: "images/places/aurora-hofn.jpg",
    aurora_self: "images/places/aurora-self.jpg",
    bonfire: "images/places/bonfire.jpg",
    jokulsarlon: "images/places/jokulsarlon.jpg",
    sky_lagoon: "images/places/sky-lagoon.jpg",
    kolaportid: "images/places/kolaportid.jpg",
    katla: "images/places/katla-ice-cave.jpg",
    nye_hallgrimskirkja: "images/places/nye-hallgrimskirkja.jpg",
    ruv: "images/places/ruv-headquarters.jpg",
    dill: "images/places/dill.jpg",
    hvammsvik: "images/places/hvammsvik.jpg",
    edition_entrance: "images/places/edition-entrance.jpg",
    tides: "images/places/tides.jpg",
    nye_dinner: "images/places/edition-rooftop.jpg",
    edition_spa: "images/places/edition-spa.jpg",
    grillmarkadurinn: "images/places/grillmarkadurinn.jpg",
    moss: "images/places/moss.jpg",
    retreat_massage: "images/places/retreat-massage.jpg",
    wool: "images/places/sixtysix-north.jpg",
    edition_ext: "images/stays/edition-ext.jpg",
    edition_room: "images/stays/edition-room.jpg",
    edition_int: "images/stays/edition-int.jpg",
    retreat_hero: "images/stays/retreat-hero.jpg",
    retreat_lagoon: "images/stays/retreat-lagoon.jpg"
  };
  var PHOTO_LABELS = {
    icelandair: "An Icelandair Boeing 737 MAX",
    ice_cave: "Inside a guided ice cave in Iceland",
    nye_fireworks: "Fireworks over Reykjavik on New Year's Eve",
    horses: "An Icelandic horse in winter",
    ishestar: "Riders on an Ishestar tour through Icelandic countryside",
    seljalandsfoss: "Seljalandsfoss waterfall",
    harpa: "Harpa Concert Hall, next to The Reykjavik EDITION",
    grotta: "Grotta lighthouse",
    baejarins: "Baejarins Beztu hot-dog stand",
    fridheimar: "Tomatoes at Fridheimar",
    laugavegur: "Laugavegur, Reykjavik",
    fontana: "Laugarvatn Fontana geothermal baths",
    gullfoss: "Gullfoss",
    skogafoss: "Skogafoss",
    silfra: "Silfra at Thingvellir",
    blue_lagoon: "The Blue Lagoon",
    aurora_hofn: "Northern lights near Hofn",
    aurora_self: "Northern lights over snow in Iceland",
    bonfire: "A New Year's Eve bonfire in Iceland",
    jokulsarlon: "An iceberg at Jokulsarlon glacier lagoon",
    sky_lagoon: "The cold plunge and lagoon at Sky Lagoon in Kopavogur",
    kolaportid: "Inside Kolaportid flea market in Reykjavik",
    katla: "An ice cave in Myrdalsjokull, the glacier over Katla",
    nye_hallgrimskirkja: "New Year's Eve fireworks at Hallgrimskirkja",
    ruv: "RUV headquarters in Reykjavik, where Aramotaskaup airs",
    dill: "A course served at Dill in Reykjavik",
    hvammsvik: "The beach pools at Hvammsvik Hot Springs on Hvalfjordur",
    edition_entrance: "The entrance courtyard at The Reykjavik EDITION",
    tides: "The dining room at Tides, The Reykjavik EDITION",
    nye_dinner: "The rooftop at The Reykjavik EDITION, looking toward Harpa and the harbor",
    edition_spa: "A treatment room at The Reykjavik EDITION Spa",
    grillmarkadurinn: "The dining room at Grillmarkadurinn in Reykjavik",
    moss: "A course at Moss Restaurant at The Retreat",
    retreat_massage: "An in-water massage at The Retreat at Blue Lagoon",
    wool: "A 66 North jacket in Iceland",
    edition_ext: "The Reykjavik EDITION exterior at dusk",
    edition_room: "An EDITION room with a harbor view",
    edition_int: "The bar at Tides, The Reykjavik EDITION",
    retreat_hero: "The Retreat at Blue Lagoon",
    retreat_lagoon: "The Retreat lagoon at Blue Lagoon"
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
    { id: "horses", cat: "daytime", title: "Icelandic horse ride at Ishestar", photo: "ishestar", day: "Jan 1",
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
    { id: "tides", cat: "food", title: "Dinner at Tides, The EDITION", photo: "tides", day: "Dec 29 or Jan 1",
      desc: "The hotel's restaurant, Tides, is the easy first or last nice dinner: seafood and Nordic plates without leaving the harbor. A calm contrast to the bigger Michelin rooms.",
      winter: "Book ahead for New Year's week. Holiday menus can run higher than the usual a-la-carte.",
      priceEach: 120, free: false, est: true, rec: false, defYes: false,
      maps: "Tides restaurant The Reykjavik EDITION" },
    { id: "dill", cat: "food", title: "Dill (Michelin-star Nordic)", photo: "dill", day: "Flexible",
      desc: "Reykjavik's celebrated New Nordic room. A tasting-menu night if you want one serious dinner in town, built on local ingredients and a quiet, precise room.",
      winter: "Holiday week books up. Confirm the current menu and cancellation window before you pay a deposit.",
      priceEach: 250, free: false, est: true, rec: false, defYes: false,
      maps: "Dill restaurant Reykjavik" },
    { id: "moss", cat: "food", title: "Moss at The Retreat (Michelin star)", photo: "moss", day: "Only with a Retreat stay",
      desc: "The Michelin-starred restaurant at The Retreat at Blue Lagoon. This only makes sense if you add a Retreat night, since dinner is not in the room rate.",
      winter: "Book the table with the room. A 2-night minimum may apply to the hotel.",
      priceEach: 280, free: false, est: true, rec: false, defYes: false,
      maps: "Moss Restaurant Blue Lagoon" },
    { id: "grillmarkadurinn", cat: "food", title: "Grillmarkadurinn", photo: "grillmarkadurinn", day: "Flexible",
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
    { id: "sky_lagoon", cat: "spas", title: "Sky Lagoon, Saman pass with the 7-step ritual", photo: "sky_lagoon", day: "Dec 29 evening or Jan 1",
      desc: "An oceanside lagoon in Kopavogur, about 15 minutes from the EDITION. The Saman pass includes the lagoon, a towel, and the Skjol ritual: a sauna with a sea window, a cold plunge, a steam, a body scrub, and a warm drink. A strong in-city spa night.",
      winter: "Winter hours are shorter (often 11 AM to 10 PM on weekdays). Book a late-afternoon slot so you watch dusk from the water. Minimum age 12.",
      priceEach: SKY_EACH, free: false, est: false, rec: true, defYes: true,
      maps: "Sky Lagoon Kopavogur",
      priceNote: "From 14,990 ISK per person for Saman. Time slots can cost more. Ser (private changing room) starts at 17,990 ISK.", },
    { id: "blue_lagoon", cat: "spas", title: "Blue Lagoon, departure-day soak", photo: "blue_lagoon", day: "Jan 3 late morning",
      desc: "The milky, steamy lagoon is 20 minutes from the airport, which is why it works so well on the way home. The default in this plan is the Lagoon and Lava package: Premium entry (robe, a drink of your choice, extra masks) plus a two-course lunch at Lava. You can switch tiers in the cost sliders.",
      winter: "Water stays about 98 to 104 F year-round. Put conditioner in and keep hair dry. Book a late-morning slot; the flight is 4:55 PM. Check eruption status the day before.",
      priceEach: 186, free: false, est: false, rec: true, defYes: true, sync: "blue_lagoon",
      maps: "Blue Lagoon Iceland" },
    { id: "retreat_massage", cat: "spas", title: "Retreat Spa in-water massage", photo: "retreat_massage", day: "Only with a Retreat booking",
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
    { id: "hvammsvik", cat: "spas", title: "Hvammsvik Hot Springs", photo: "hvammsvik", day: "A rest morning near Reykjavik",
      desc: "Eight seaside pools on Hvalfjordur, about a 45-minute drive north of Reykjavik. Quieter and more natural-feeling than the city lagoons, with a sauna, a cold plunge, and a swim-up bar. Classic is the middle tier, with private showers and lockers.",
      winter: "Winter hours often run 10:30 AM to 8:30 PM, last entry 7 PM. Book a timed slot. Age 10 and up.",
      priceEach: HVAMMSVIK_EACH, free: false, est: true, rec: false, defYes: false,
      maps: "Hvammsvik Hot Springs",
      priceNote: "Classic is 7,900 to 11,900 ISK depending on the time slot. This plan uses a mid estimate of about $80 per person.", },
    { id: "edition_spa", cat: "spas", title: "EDITION Spa signature massage", photo: "edition_spa", day: "A quiet afternoon in town",
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
      maps: "66 North Laugavegur Reykjavik", },
    { id: "kolaportid", cat: "shopping", title: "Kolaportid flea market", photo: "kolaportid", day: "Sat Jan 2",
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
    { id: "jokulsarlon", cat: "sidetrips", title: "Jokulsarlon overnight: ice cave, Diamond Beach, aurora", photo: "jokulsarlon", day: "Dec 30 to Dec 31 morning",
      desc: "The signature winter add-on. Fly from Reykjavik domestic (not Keflavik) to Hofn in about 55 minutes, drive an hour, walk into a blue ice cave, watch ice on black sand around the late 11 AM sunrise, look for seals at the lagoon mouth, and hope for lights over the icebergs that night. Fly back on the 31st for New Year's Eve in town.",
      winter: "Domestic winter cancellations are common, so this is a tighter plan than going Dec 29 to 30. Book a morning cave with free cancellation. Boat tours are done for the season. This card adds the Hofn flights, a standard ice-cave tour, and one Hofn-area hotel night (and trims an EDITION night).",
      priceEach: 0, free: false, est: false, rec: true, defYes: false, sync: "jokulsarlon",
      maps: "Jokulsarlon glacier lagoon",
      dynamic: "jokulsarlon" },
    { id: "katla", cat: "sidetrips", title: "Katla ice cave", photo: "katla", day: "Jan 2, if you skip the overnight",
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
    { id: "nye_fireworks", cat: "nye", title: "Midnight fireworks from a viewpoint", photo: "nye_hallgrimskirkja", day: "Dec 31",
      desc: "At midnight the whole city sets off fireworks. Hallgrimskirkja's steps and the area around Perlan are classic viewpoints. The EDITION's harbor side is also close to the action if you want to stay nearby.",
      winter: "It is a late, cold, crowded hour. Perlan's paid deck may be ticketed or closed; the public hillside and the church grounds are the simple plan.",
      priceEach: 0, free: true, est: false, rec: true, defYes: true,
      maps: "Hallgrimskirkja Reykjavik" },
    { id: "nye_dinner", cat: "nye", title: "New Year's Eve dinner in Reykjavik", photo: "nye_dinner", day: "Dec 31",
      desc: "A sit-down dinner before the bonfires and fireworks. Many kitchens run a set holiday menu. Tides at the hotel is the lowest-friction option; Dill or Grillmarkadurinn if you want to go out (those cards are priced separately, so leave this one off if you pick a specific restaurant).",
      winter: "Book now. Holiday menus are prix fixe and fill up.",
      priceEach: 180, free: false, est: true, rec: false, defYes: false,
      maps: "Reykjavik city center restaurants" },
    { id: "aramotaskaup", cat: "nye", title: "Aramotaskaup, the New Year's TV comedy", photo: "ruv", day: "Dec 31",
      desc: "Iceland's annual satirical New Year's Eve TV revue. Locals watch it before midnight, then head out for the fireworks. You can stream or catch it in a bar or at the hotel if it is on. A small, very Icelandic tradition.",
      winter: "It usually airs in the evening on Dec 31. English is not guaranteed; the room's reaction is half the fun.",
      priceEach: 0, free: true, est: false, rec: false, defYes: true,
      maps: "Reykjavik" },
    { id: "nl_guided", cat: "lights", title: "Guided northern lights tour", photo: "aurora_hofn", day: "Early in the trip",
      desc: "A guide drives you to wherever the clouds are breaking. Most operators offer a free retry if you see nothing, which is why it helps to book this early in the week. Use the slider in costs to set the per-person price ($70 to $120).",
      winter: "Late December is the darkest window of the year. Clouds are the real limit. Watch vedur.is for the cloud map, not just the KP number.",
      priceEach: 95, free: false, est: false, rec: true, defYes: false, sync: "nl_tour",
      maps: "Reykjavik northern lights tour" },
    { id: "nl_self", cat: "lights", title: "Self-guided aurora watch", photo: "aurora_self", day: "Any clear night",
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
  state.passed = {};
  state.player = "";
  state.mate = null;
  if (!state.carId) state.carId = "none";

  function load() {
    state = clone(DEFAULTS);
    state.picks = clone(defaultPicks);
    state.passed = {};
    state.player = "";
    state.mate = null;
    if (!state.carId) state.carId = "none";
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
        if (saved.passed && typeof saved.passed === "object") {
          CATALOG.forEach(function (c) {
            if (saved.passed[c.id]) state.passed[c.id] = true;
          });
        }
        if (saved.player === "scott" || saved.player === "jerm" || saved.player === "both") {
          state.player = saved.player;
        }
        if (saved.mate && (saved.mate.player === "scott" || saved.mate.player === "jerm")) {
          state.mate = { player: saved.mate.player, picks: {}, passed: {} };
          CATALOG.forEach(function (c) {
            state.mate.picks[c.id] = !!(saved.mate.picks && saved.mate.picks[c.id]);
            state.mate.passed[c.id] = !!(saved.mate.passed && saved.mate.passed[c.id]);
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
    if (c.free) return { big: "Free for two", sub: "The best kind of line item." };
    var tot = itemPrice(c);
    var each = itemPriceEach(c);
    var est = c.est ? "est. " : "";
    if (c.sync === "jokulsarlon") return { big: est + money(tot) + " for two", sub: "overnight bundle" };
    return { big: est + money(tot) + " for two", sub: money(each) + " each" };
  }

  var PITCHES = {
    harpa_walk: "Wanna walk the harbor until the overnight flight loosens its grip?",
    horses: "Wanna ride Icelandic horses through lava fields?",
    grotta: "How about a lighthouse walk, ten minutes away, just in case the sky performs?",
    tides: "Dinner downstairs at Tides, so you never have to find your coat?",
    dill: "A Michelin-starred Nordic tasting menu, if one serious dinner is the move?",
    moss: "Moss at The Retreat, but only if you are already sleeping in the lava field?",
    grillmarkadurinn: "Grillmarkadurinn: grilled lamb, a lively room, and zero packing-list debates?",
    baejarins: "A hot dog in the cold, eaten standing up, like a local with better priorities?",
    fridheimar: "Tomato soup in a greenhouse, because January 1 cafes may still be asleep?",
    sky_lagoon: "How about this? Sky Lagoon at dusk, 15 minutes from the hotel, sea-window sauna included.",
    blue_lagoon: "Blue Lagoon on the way to the airport, silica in your hair and a 4:55 PM flight?",
    retreat_massage: "An in-water massage at The Retreat, if you book the room first?",
    fontana: "Lakeside steam at Fontana, plus a rye bread they baked in the ground?",
    hvammsvik: "Eight seaside pools on Hvalfjordur, 45 minutes north, quieter than the city lagoons?",
    edition_spa: "A signature massage in the hotel spa, so the weather can rant without you?",
    shopping_downtown: "A slow wander through Hafnartorg and Laugavegur, even if you buy absolutely nothing?",
    wool_shops: "A 66 North shell, or a lopapeysa from Rammagerdin, before the wind files a complaint?",
    kolaportid: "Kolaportid on Saturday, for vintage wool, candy, and courage?",
    golden_circle: "Thingvellir, Geysir, and Gullfoss, if January 1 still has any gas in the tank?",
    south_coast: "Seljalandsfoss, Skogafoss, and a black beach, if the roads agree?",
    jokulsarlon: "An overnight by the ice: a cave, Diamond Beach, and a shot at the lights?",
    katla: "A Katla ice cave on January 2, if the glacier overnight does not happen?",
    silfra: "Snorkel Silfra, in water so clear it will make your calendar feel unprepared?",
    nye_bonfire: "A neighborhood bonfire on New Year's Eve, the official warm-up act?",
    nye_fireworks: "Midnight fireworks from Hallgrimskirkja, Perlan, or the hotel's harbor door?",
    nye_dinner: "A New Year's Eve dinner in town, before the comedy hour and the explosions?",
    aramotaskaup: "Aramotaskaup on TV, the annual roasting of the entire country, then out into the cold?",
    nl_guided: "A guided lights tour early in the week, with a retry if the clouds win?",
    nl_self: "Or hunt the aurora yourselves, with Grotta ten minutes away and a cloud map on vedur.is?"
  };

  var SHORT_NAMES = {
    harpa_walk: "the harbor walk",
    horses: "the horses",
    grotta: "Grotta after dark",
    tides: "dinner at Tides",
    dill: "Dill",
    moss: "Moss",
    grillmarkadurinn: "Grillmarkadurinn",
    baejarins: "a hot dog",
    fridheimar: "the tomato greenhouse",
    sky_lagoon: "Sky Lagoon",
    blue_lagoon: "Blue Lagoon",
    retreat_massage: "the in-water massage",
    fontana: "Fontana",
    hvammsvik: "Hvammsvik",
    edition_spa: "the hotel spa",
    shopping_downtown: "downtown browsing",
    wool_shops: "a 66 North run",
    kolaportid: "Kolaportid",
    golden_circle: "the Golden Circle",
    south_coast: "the South Coast",
    jokulsarlon: "the glacier overnight",
    katla: "a Katla ice cave",
    silfra: "Silfra",
    nye_bonfire: "the bonfire",
    nye_fireworks: "midnight fireworks",
    nye_dinner: "NYE dinner",
    aramotaskaup: "Aramotaskaup",
    nl_guided: "a guided lights tour",
    nl_self: "a self-guided aurora hunt"
  };

  var pendingShare = null;
  var cartOpen = false;
  var lastShownTotal = null;

  function playerName(id) {
    if (id === "jerm") return "Jerm";
    if (id === "scott") return "Scott";
    if (id === "both") return "both of you";
    return "";
  }
  function otherId(id) {
    if (id === "scott") return "jerm";
    if (id === "jerm") return "scott";
    return "";
  }
  function pitchKind(id) {
    if (state.picks[id]) return "in";
    if (state.passed && state.passed[id]) return "passed";
    return "open";
  }
  function inCount() {
    return CATALOG.filter(function (c) { return state.picks[c.id]; }).length;
  }
  function shareButtonLabel() {
    if (state.player === "jerm") return "Send my picks to Scott";
    if (state.player === "scott") return "Send my picks to Jerm";
    if (state.player === "both") return "Share our picks";
    return "Share my picks";
  }
  function shareText() {
    if (state.player === "jerm") return "My Iceland picks, from Jerm. Open this, Scott, and we'll see if we agree.";
    if (state.player === "scott") return "My Iceland picks, from Scott. Open this, Jerm, and we'll see if we agree.";
    return "Our Iceland picks, from Scott and Jerm Versus Iceland.";
  }
  function showToast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(showToast.tid);
    showToast.tid = setTimeout(function () { t.hidden = true; }, 2600);
  }
  function pickIn(id) {
    if (state.passed) state.passed[id] = false;
    setPick(id, true);
  }
  function pickPass(id) {
    state.passed = state.passed || {};
    state.passed[id] = true;
    setPick(id, false);
  }
  function undoPass(id) {
    if (state.passed) state.passed[id] = false;
    afterChange();
  }

  function computeWithPicks(picksMap) {
    var snap = clone(state);
    state.picks = clone(picksMap);
    syncFromPicks(false);
    var t = compute();
    state = snap;
    return t;
  }
  function picksMapFrom(src) {
    var map = {};
    CATALOG.forEach(function (c) { map[c.id] = !!(src && src[c.id]); });
    return map;
  }

  function mateStatus(id) {
    if (!state.mate || state.player === "both") return null;
    if (state.mate.picks && state.mate.picks[id]) return "in";
    if (state.mate.passed && state.mate.passed[id]) return "pass";
    return null;
  }
  function mateBadge(id) {
    var st = mateStatus(id);
    if (!st) return "";
    var name = playerName(state.mate.player);
    var initial = name.charAt(0);
    var text = st === "in" ? (name + " said I'm in") : (name + " passed");
    return '<span class="mate-badge is-' + st + '"><span class="mate-av" aria-hidden="true">' + initial + "</span>" + esc(text) + "</span>";
  }

  function setPlayer(id) {
    if (id !== "scott" && id !== "jerm" && id !== "both") return;
    if (state.mate && state.mate.player === id && (id === "scott" || id === "jerm")) {
      var old = { player: state.player, picks: clone(state.picks), passed: clone(state.passed || {}) };
      state.picks = clone(state.mate.picks || defaultPicks);
      state.passed = clone(state.mate.passed || {});
      if (old.player === "scott" || old.player === "jerm") state.mate = old;
      else state.mate = null;
    }
    state.player = id;
    hideWho();
    var kind = consumePendingShare();
    syncFromPicks(false);
    afterChange();
    if (kind === "mate") showToast(playerName(state.mate.player) + "'s picks just landed.");
    else if (kind === "plan") showToast("Loaded the shared picks.");
  }

  function showWho() {
    var el = document.getElementById("who");
    if (!el) return;
    el.hidden = false;
    document.body.classList.add("who-open");
  }
  function hideWho() {
    var el = document.getElementById("who");
    if (el) el.hidden = true;
    document.body.classList.remove("who-open");
  }

  function openCart() {
    var el = document.getElementById("cartDrawer");
    if (!el) return;
    cartOpen = true;
    el.hidden = false;
    document.body.classList.add("cart-open");
    var btn = document.getElementById("openCart");
    if (btn) btn.setAttribute("aria-expanded", "true");
    renderCart();
  }
  function closeCart() {
    var el = document.getElementById("cartDrawer");
    if (el) el.hidden = true;
    cartOpen = false;
    document.body.classList.remove("cart-open");
    var btn = document.getElementById("openCart");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function parseShare() {
    try {
      var q = new URLSearchParams(location.search);
      var raw = q.get("s") || (location.hash && location.hash.indexOf("s=") >= 0 ? new URLSearchParams(location.hash.replace(/^#/, "")).get("s") : null);
      if (!raw) return null;
      var json = decodeURIComponent(escape(atob(raw.replace(/-/g, "+").replace(/_/g, "/"))));
      return JSON.parse(json);
    } catch (e) { return null; }
  }
  function consumePendingShare() {
    if (!pendingShare) return "";
    var obj = pendingShare;
    pendingShare = null;
    return applyShare(obj) || "";
  }

  function renderWhoNow() {
    var el = document.getElementById("whoNow");
    if (!el) return;
    var label = shareButtonLabel();
    var as = state.player === "both"
      ? "Picking for both of you, on one phone."
      : (state.player ? ("Picking as " + playerName(state.player) + ".") : "Choose who is holding the phone to get started.");
    el.innerHTML = "<strong>" + esc(as) + "</strong>" +
      (state.player ? ' <button type="button" class="ghost js-share">' + esc(label) + "</button>" : "") +
      ' <button type="button" class="ghost" id="switchPlayer">Switch</button>';
    document.querySelectorAll(".js-share").forEach(function (btn) {
      if (btn.id === "shareBtn" || btn.id === "shareBtnDrawer" || !btn.classList.contains("ghost")) {
        btn.textContent = label;
      }
    });
    var shareBtn = document.getElementById("shareBtn");
    var shareDrawer = document.getElementById("shareBtnDrawer");
    if (shareBtn) shareBtn.textContent = label;
    if (shareDrawer) shareDrawer.textContent = label;
  }

  function pitchBodyHtml(c) {
    var kind = pitchKind(c.id);
    var pl = priceLabel(c);
    var rec = c.rec ? '<span class="rec">Our recommendation</span>' : "";
    var winter = c.winter ? '<p class="tip"><strong>Winter:</strong> ' + c.winter + "</p>" : "";
    var note = c.priceNote ? '<p class="credit">' + c.priceNote + "</p>" : "";
    var inLabel = state.player === "both" ? "We're in" : "I'm in";
    var badge = mateBadge(c.id);
    if (kind === "passed") {
      return '<div class="passed-row">' +
        "<p><strong>" + esc(c.title) + "</strong> · Passed</p>" +
        badge +
        '<button type="button" class="ghost" data-undo="' + c.id + '">Undo</button>' +
        "</div>";
    }
    if (kind === "in") {
      return '<p class="pitch-kicker">' + CAT_LABEL[c.cat] + " · " + c.day + "</p>" +
        rec + badge +
        '<p class="in-flag"><span class="tick" aria-hidden="true">✓</span> In the cart</p>' +
        "<h3>" + esc(c.title) + "</h3>" +
        '<p class="pitch-line">' + esc(PITCHES[c.id] || c.title) + "</p>" +
        '<div class="pitch-cta">' +
        '<div class="pitch-price"><strong>' + pl.big + "</strong>" + (pl.sub ? "<small>" + pl.sub + "</small>" : "") + "</div>" +
        '<div class="pitch-btns">' +
        '<button type="button" class="pitch-btn pass" data-pass="' + c.id + '">Remove</button>' +
        "</div></div>" + note;
    }
    return '<p class="pitch-kicker">' + CAT_LABEL[c.cat] + " · " + c.day + "</p>" +
      rec + badge +
      '<p class="pitch-line">' + esc(PITCHES[c.id] || ("How about " + c.title + "?")) + "</p>" +
      (c.desc ? '<p class="pitch-meta">' + c.desc + "</p>" : "") + winter +
      '<div class="pitch-cta">' +
      '<div class="pitch-price"><strong>' + pl.big + "</strong>" + (pl.sub ? "<small>" + pl.sub + "</small>" : "") + "</div>" +
      '<div class="pitch-btns">' +
      '<button type="button" class="pitch-btn in" data-in="' + c.id + '">' + inLabel + "</button>" +
      '<button type="button" class="pitch-btn pass" data-pass="' + c.id + '">Pass</button>' +
      "</div></div>" + note +
      '<p class="maplink"><a href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(c.maps) + '" target="_blank" rel="noopener">Open in Google Maps</a></p>';
  }

  function renderPitches() {
    var root = document.getElementById("pitchList");
    if (!root) return;
    if (root.getAttribute("data-ready") !== "1") {
      root.innerHTML = CATALOG.map(function (c) {
        var photoKey = c.photoKey || c.photo;
        return '<article class="pitch is-' + pitchKind(c.id) + '" data-pitch="' + c.id + '">' +
          photoBlock(photoKey, "pitch-photo idea-photo", c.title) +
          '<div class="pitch-main"><div class="pitch-body">' + pitchBodyHtml(c) + "</div></div></article>";
      }).join("");
      root.setAttribute("data-ready", "1");
      return;
    }
    CATALOG.forEach(function (c) {
      var el = root.querySelector('[data-pitch="' + c.id + '"]');
      if (!el) return;
      el.className = "pitch is-" + pitchKind(c.id);
      var body = el.querySelector(".pitch-body");
      if (body) body.innerHTML = pitchBodyHtml(c);
    });
  }

  function renderCart() {
    var list = document.getElementById("cartList");
    var count = document.getElementById("cartCount");
    var n = inCount();
    if (count) count.textContent = String(n);
    var t = compute();
    var two = document.getElementById("cartTotalTwo");
    var each = document.getElementById("cartTotalEach");
    if (two) {
      var next = money(t.total);
      var changed = lastShownTotal !== null && lastShownTotal !== next;
      two.textContent = next;
      if (changed) {
        two.classList.remove("is-bump");
        void two.offsetWidth;
        two.classList.add("is-bump");
      }
      lastShownTotal = next;
    }
    if (each) each.textContent = money(t.each);
    var title = document.getElementById("cartTitle");
    if (title) {
      title.textContent = state.player === "both" ? "Your cart, for both of you" : (state.player ? (playerName(state.player) + "'s cart") : "Your cart");
    }
    if (!list) return;
    var items = CATALOG.filter(function (c) { return state.picks[c.id]; });
    if (!items.length) {
      list.innerHTML = '<li class="cart-empty">The cart is empty. Scroll the pitches and tap I\'m in when something lands.</li>';
      return;
    }
    list.innerHTML = items.map(function (c) {
      var pl = priceLabel(c);
      return "<li><div><strong>" + esc(c.title) + "</strong><small>" + pl.big + (pl.sub ? " · " + pl.sub : "") + "</small></div>" +
        '<button type="button" class="ghost" data-remove="' + c.id + '">Remove</button></li>';
    }).join("");
  }

  function renderMatch() {
    var board = document.getElementById("matchBoard");
    var lead = document.getElementById("matchLead");
    if (!board) return;
    var mine = state.picks;
    var mate = state.mate;
    var myName = state.player === "both" ? "Both of you" : (playerName(state.player) || "You");
    var otherName = mate ? playerName(mate.player) : (state.player ? playerName(otherId(state.player)) : "the other person");

    if (state.player === "both" && !mate) {
      if (lead) lead.textContent = "You are picking for both of you on one phone. Here is the joint cart and the running total.";
      var tBoth = compute();
      var rows = CATALOG.filter(function (c) { return mine[c.id]; }).map(function (c) {
        return "<li>" + esc(c.title) + " · " + priceLabel(c).big + "</li>";
      }).join("");
      board.innerHTML = '<div class="match-grid">' +
        '<div class="match-card hits"><h3>The joint cart</h3>' + (rows ? "<ul>" + rows + "</ul>" : "<p>Nothing in the cart yet.</p>") + "</div>" +
        '<div class="match-card match-totals"><h3>Trip total for two</h3><b>' + money(tBoth.total) + "</b><small>" + money(tBoth.each) + " per person</small>" +
        '<p class="match-wait">Want two separate phones later? Switch to I\'m Scott or I\'m Jerm and send a link.</p></div></div>';
      return;
    }

    if (!mate) {
      if (lead) {
        lead.textContent = state.player === "jerm"
          ? "Send your picks to Scott. When his link comes back, this page turns into a scoreboard."
          : "Send your picks to Jerm. When their link comes back, this page turns into a scoreboard.";
      }
      board.innerHTML = '<div class="match-card"><p class="match-wait">No second cart yet. Tap "' + esc(shareButtonLabel()) + '" when you are ready. The link carries your name and your picks. Their phone will keep their own choices and show yours beside them.</p>' +
        '<p class="links"><button type="button" class="btn primary js-share">' + esc(shareButtonLabel()) + "</button></p></div>";
      return;
    }

    if (lead) lead.textContent = "Scott and Jerm have spoken, or at least tapped some buttons. Here is the overlap, the arguments, and the damage.";

    var matches = [];
    var splits = [];
    var pending = [];
    var bothPassed = [];
    CATALOG.forEach(function (c) {
      var meIn = !!mine[c.id];
      var theyIn = !!(mate.picks && mate.picks[c.id]);
      var mePass = !!(!meIn && state.passed && state.passed[c.id]);
      var theyPass = !!(mate.passed && mate.passed[c.id]);
      var short = SHORT_NAMES[c.id] || c.title;
      if (meIn && theyIn) {
        matches.push("You both want " + short + ".");
      } else if (meIn && theyPass) {
        splits.push(myName + ": " + short + ". " + otherName + ": absolutely not.");
      } else if (theyIn && mePass) {
        splits.push(otherName + ": " + short + ". " + myName + ": absolutely not.");
      } else if (meIn && !theyIn) {
        pending.push(myName + " is in on " + short + ". " + otherName + " has not weighed in.");
      } else if (theyIn && !meIn) {
        pending.push(otherName + " is in on " + short + ". " + myName + " has not weighed in.");
      } else if (mePass && theyPass) {
        bothPassed.push("You both passed on " + short + ".");
      }
    });

    function listCard(cls, title, arr, empty) {
      return '<div class="match-card ' + cls + '"><h3>' + title + "</h3>" +
        (arr.length ? "<ul>" + arr.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" : "<p>" + empty + "</p>") +
        "</div>";
    }
    function cartCard(name, map) {
      var items = CATALOG.filter(function (c) { return map[c.id]; });
      var html = items.map(function (c) {
        return "<li>" + esc(c.title) + " · " + priceLabel(c).big + "</li>";
      }).join("");
      var t = computeWithPicks(picksMapFrom(map));
      return '<div class="match-card"><h3>' + esc(name) + "'s cart</h3>" +
        (html ? "<ul>" + html + "</ul>" : "<p>Nothing in this cart.</p>") +
        "<p><strong>" + money(t.total) + "</strong> for two if the trip used only these picks. " + money(t.each) + " each.</p></div>";
    }

    var union = {};
    var both = {};
    CATALOG.forEach(function (c) {
      union[c.id] = !!(mine[c.id] || (mate.picks && mate.picks[c.id]));
      both[c.id] = !!(mine[c.id] && mate.picks && mate.picks[c.id]);
    });
    var tUnion = computeWithPicks(union);
    var tMatch = computeWithPicks(both);

    board.innerHTML = '<div class="match-grid">' +
      '<div class="match-card match-totals"><h3>Combined trip total for two</h3>' +
      "<b>" + money(tUnion.total) + "</b><small>" + money(tUnion.each) + " per person, if you do everything either of you want. Splits are not settled yet.</small>" +
      "<p>If you only keep the matches: <strong>" + money(tMatch.total) + "</strong> for two, or " + money(tMatch.each) + " each.</p>" +
      (bothPassed.length ? "<p class=\"credit\">" + esc(bothPassed.join(" ")) + "</p>" : "") +
      '<p class="links"><button type="button" class="ghost" id="clearMate">Clear ' + esc(otherName) + "'s picks</button></p></div>" +
      listCard("hits", "Matches", matches, "No overlap yet. The negotiation era has begun.") +
      listCard("split", "Negotiate", splits.concat(pending), "No splits. Suspicious, or just very compatible.") +
      cartCard(myName, mine) +
      cartCard(otherName, mate.picks) +
      "</div>";
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
    renderPitches();
    renderCart();
    renderMatch();
    renderWhoNow();
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

  function compactState(named) {
    var o = { v: 1, carId: state.carId || "none", picks: [] };
    CATALOG.forEach(function (c) { if (state.picks[c.id]) o.picks.push(c.id); });
    SHARE_KEYS.forEach(function (k) {
      if (k === "carId") return;
      if (JSON.stringify(state[k]) !== JSON.stringify(DEFAULTS[k])) o[k] = state[k];
    });
    if (named && (state.player === "scott" || state.player === "jerm")) {
      o.v = 2;
      o.player = state.player;
      o.passed = CATALOG.filter(function (c) { return state.passed && state.passed[c.id]; }).map(function (c) { return c.id; });
    }
    return o;
  }

  function applyShare(obj) {
    if (!obj || typeof obj !== "object") return "";
    var sharePlayer = (obj.player === "scott" || obj.player === "jerm") ? obj.player : null;
    var me = state.player;
    if (sharePlayer && me && me !== "both" && sharePlayer !== me) {
      state.mate = { player: sharePlayer, picks: {}, passed: {} };
      var yes = {};
      var no = {};
      if (Array.isArray(obj.picks)) obj.picks.forEach(function (id) { yes[id] = true; });
      if (Array.isArray(obj.passed)) obj.passed.forEach(function (id) { no[id] = true; });
      CATALOG.forEach(function (c) {
        state.mate.picks[c.id] = !!yes[c.id];
        state.mate.passed[c.id] = !!no[c.id];
      });
      return "mate";
    }
    SHARE_KEYS.forEach(function (k) {
      if (obj[k] !== undefined) state[k] = obj[k];
    });
    if (Array.isArray(obj.picks)) {
      var set = {};
      obj.picks.forEach(function (id) { set[id] = true; });
      CATALOG.forEach(function (c) { state.picks[c.id] = !!set[c.id]; });
    }
    if (Array.isArray(obj.passed)) {
      state.passed = {};
      obj.passed.forEach(function (id) { state.passed[id] = true; });
    }
    if (!state.carId) state.carId = "none";
    state.car = state.carId !== "none";
    syncFromPicks(false);
    return "plan";
  }

  function readShare() {
    pendingShare = parseShare();
    if (state.player) return consumePendingShare();
    return "";
  }

  function shareUrl() {
    var named = state.player === "scott" || state.player === "jerm";
    var json = JSON.stringify(compactState(named));
    var b64 = btoa(unescape(encodeURIComponent(json))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    var path = location.pathname || "/";
    return location.origin + path + "?s=" + b64;
  }

  function copyShare(url) {
    url = url || shareUrl();
    var done = function () {
      var who = state.player === "jerm" ? "Scott" : (state.player === "scott" ? "Jerm" : "the other person");
      showToast("Link copied. Send it to " + who + ".");
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

  function sharePicks() {
    var url = shareUrl();
    var payload = { title: "Scott and Jerm Versus Iceland", text: shareText(), url: url };
    if (navigator.share) {
      navigator.share(payload).catch(function (err) {
        if (err && err.name === "AbortError") return;
        copyShare(url);
      });
    } else {
      copyShare(url);
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
      var pin = e.target.closest("[data-in]");
      if (pin) { pickIn(pin.getAttribute("data-in")); return; }
      var ppass = e.target.closest("[data-pass]");
      if (ppass) { pickPass(ppass.getAttribute("data-pass")); return; }
      var pundo = e.target.closest("[data-undo]");
      if (pundo) { undoPass(pundo.getAttribute("data-undo")); return; }
      var prem = e.target.closest("[data-remove]");
      if (prem) { pickPass(prem.getAttribute("data-remove")); return; }
      var whoBtn = e.target.closest("[data-who]");
      if (whoBtn) { setPlayer(whoBtn.getAttribute("data-who")); return; }
      if (e.target.closest("#openCart")) { openCart(); return; }
      if (e.target.closest("#closeCart") || e.target.closest("#closeCartBtn")) { closeCart(); return; }
      if (e.target.closest("#cartMatchLink") || e.target.closest("#cartCostsLink")) { closeCart(); return; }
      if (e.target.closest("#switchPlayer")) { showWho(); return; }
      if (e.target.closest("#clearMate")) { state.mate = null; afterChange(); return; }
      if (e.target.closest(".js-share")) { sharePicks(); return; }
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
      pickIn(c.id);
      if (flipIndex < CATALOG.length - 1) flipIndex++;
      renderFlip();
    });
    if (fno) fno.addEventListener("click", function () {
      var c = CATALOG[flipIndex];
      pickPass(c.id);
      if (flipIndex < CATALOG.length - 1) flipIndex++;
      renderFlip();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && cartOpen) { closeCart(); e.preventDefault(); return; }
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
      var player = state.player;
      var mate = state.mate;
      state = clone(DEFAULTS);
      state.picks = clone(defaultPicks);
      state.passed = {};
      state.carId = "none";
      state.player = player;
      state.mate = mate;
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
  }

  function boot() {
    load();
    pendingShare = parseShare();
    if (!state.carId) state.carId = "none";
    state.car = state.carId !== "none";
    bind();
    if (state.player) {
      var kind = consumePendingShare();
      syncForm();
      render();
      if (kind === "mate") showToast(playerName(state.mate.player) + "'s picks just landed.");
      else if (kind === "plan") showToast("Loaded the shared picks.");
    } else {
      syncForm();
      render();
      showWho();
    }
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
  window.__icelandSetPlayer = setPlayer;
  window.__icelandPickIn = pickIn;
  window.__icelandPickPass = pickPass;
  window.__icelandOpenCart = openCart;
  window.__icelandShareUrl = shareUrl;
  window.__icelandApplyShare = applyShare;
  window.__icelandAfterChange = afterChange;
})();
