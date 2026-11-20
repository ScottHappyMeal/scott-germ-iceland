/* Scott & Jerm's Iceland: a full-screen winter field guide. Rendering, maps, weather, countdown, galleries.
   Animation choreography lives in js/motion-fx.js. No pick or vote UI. */
(function () {
  "use strict";

  var D = window.ICELAND_DATA || {};
  var T = window.ICELAND_TRIP || {};
  var PHOTO_URLS = D.PHOTO_URLS || {};
  var PHOTO_LABELS = D.PHOTO_LABELS || {};

  var PLAN_TOTAL = 15218;

  /* ---------- galleries: every photo is a real, self-hosted photo of that exact place ---------- */
  var GALLERIES = {
    flight: ["icelandair", "saga_seat"],
    car: ["car_duster"],
    reykjabod: ["reykjabod"],
    mjolkurbuid: ["mjolkurbuid"],
    domes: ["domes", "domes_int"],
    froken: ["froken"],
    kerid: ["kerid"],
    glass: ["glass_cottages", "glass_cottages_int"],
    midgard: ["midgard"],
    edition: ["edition_ext", "edition_room", "edition_suite", "edition_int", "tides", "nye_dinner", "edition_spa"],
    nye: ["nye_hallgrimskirkja", "bonfire", "nye_fireworks", "nye_dinner", "ruv"],
    sky_lagoon: ["sky_lagoon"],
    reykjavik: ["harpa", "laugavegur", "grotta", "baejarins", "wool", "kolaportid", "aurora_self"],
    golden: ["gullfoss", "silfra", "fridheimar", "ishestar", "horses"],
    south: ["seljalandsfoss", "skogafoss", "katla"],
    retreat: ["retreat_hero", "retreat_suite", "retreat_lagoon", "retreat_massage", "moss", "blue_lagoon"]
  };

  function full(key) { return PHOTO_URLS[key] || ""; }
  function thumb(key) { var u = PHOTO_URLS[key] || ""; return u.replace(/^images\//, "images/thumbs/"); }
  function label(key) { return PHOTO_LABELS[key] || ""; }

  /* ---------- the plan: flights, car, stays (verified cash totals for two) ---------- */
  var ITEMS = {
    flight: {
      title: "Icelandair, Saga Premium", status: "Not booked", gallery: "flight",
      price: "$6,062",
      sub: "Verified Google Flights cash total for two adults, FI670 and FI671, Dec 28 to Jan 4. One checked bag each, 32 kg / 70 lb, meals, and priority.",
      desc: "FI670 leaves Denver at 3:40 PM MT on Dec 28 and lands at Keflavik at 6:05 AM on Dec 29, 7 hours 25 minutes, nonstop. The return is FI671 on Jan 4, leaving Keflavik at 4:55 PM and landing in Denver at 6:00 PM MT, 8 hours 5 minutes.",
      url: "https://www.icelandair.com/flights/from-denver-to-reykjavik/", urlLabel: "Icelandair", place: "kef"
    },
    car: {
      title: "Dacia Duster 4x4, six days", status: "Not booked", gallery: "car",
      price: "$719",
      sub: "Blue Car Rental, Dec 29 to Jan 4, cash total for the car.",
      desc: "Pick up the 4WD SUV at Keflavik after the 6:05 AM landing, and drop it off before the 4:55 PM flight home on Jan 4. A 4WD SUV is the working plan for winter roads.",
      url: "https://www.bluecarrental.is/", urlLabel: "Blue Car Rental"
    },
    "stay-domes": {
      title: "Golden Circle Domes", nights: "Dec 29, one night", status: "Not booked", gallery: "domes",
      price: "$1,371",
      sub: "Live cash rate for Dec 29, 1,250 euros, total for the dome. Peak holiday pricing.",
      desc: "Contactless self check-in from 3:00 PM, with no front desk, so there is nowhere to leave bags early. Breakfast is not included, but each dome has a full kitchenette, and Thrastalundur restaurant and minimarket is on site. Double bed, private bathroom, and a wood fireplace.",
      url: "https://property.godo.is/booking2.php?propid=175431&cur=USD", urlLabel: "Golden Circle Domes", place: "domes"
    },
    "stay-glass": {
      title: "Glass Cottages, Cottage Blar", nights: "Dec 30, one night", status: "Book soon", gallery: "glass",
      price: "$559",
      sub: "Live cash rate for Dec 30, last cottage left when checked. Free cancellation ends Nov 30, 2026, once you book.",
      desc: "One double bed, a glass wall, and a private hot tub, near Hella. There is no on-site restaurant or breakfast. The private kitchen is stocked with coffee, tea, and oil. Hella is about 5 minutes away.",
      winter: "The cottage sits in lava fields. Dress for wind and ice if you use the hot tub.",
      url: "https://glasscottages.com/", urlLabel: "Glass Cottages", place: "glass_cottages"
    },
    "stay-edition": {
      title: "The Reykjavik EDITION, King Room", nights: "Dec 31 to Jan 3, three nights", status: "Not booked", gallery: "edition",
      price: "$4,023",
      sub: "Stay Longer on Us Flexible Member rate for Dec 31 to Jan 3, all taxes and fees included.",
      desc: "A King Room with one king bed. Check in Dec 31 and check out Jan 3. A harbor hotel next to Harpa, with Tides restaurant, a rooftop bar, and a spa.",
      url: "https://www.marriott.com/en-us/hotels/reyek-the-reykjavik-edition/", urlLabel: "The Reykjavik EDITION", place: "edition"
    },
    "stay-retreat": {
      title: "The Retreat at Blue Lagoon, Lava View Junior Suite", nights: "Jan 3, one night", status: "Not booked", gallery: "retreat",
      price: "est. $2,484",
      sub: "About 310,000 ISK for Jan 3, estimated. 8 suites were left when checked.",
      desc: "One night in a Lava View Junior Suite, with access to the private Retreat Lagoon. The next morning you drive about 25 minutes to Keflavik for the 4:55 PM flight.",
      winter: "Put conditioner in and keep your hair out of the silica water. The water stays about 98 to 104 F all year.",
      url: "https://www.bluelagoon.com/retreat", urlLabel: "The Retreat", place: "retreat"
    },

    /* stops along the way */
    reykjabod: {
      title: "Reykjabod Hot Springs, Hveragerdi", status: "Planned soak", gallery: "reykjabod",
      price: "Classic 17,800 ISK (about $142) for two",
      sub: "Signature is 33,800 ISK (about $270) for two. Not in the trip total.",
      desc: "Opened in September 2026. A quieter mountain-valley soak right on the Dec 29 drive, about 15 minutes from the domes. Classic includes the lagoon, outdoor sauna, cold plunge, Kneipp, and a towel. Signature adds the adults-only indoor Bathhouse Spa with 10 sensory rooms, bathrobes, slippers, and 1 drink each.",
      winter: "Winter hours: Monday to Thursday 10:00 AM to 9:00 PM, Friday to Sunday 10:00 AM to 10:00 PM. Leave the water 30 minutes before close. Dec 29 is a Tuesday, so it opens at 10:00 AM.",
      url: "https://reykjabod.is/", urlLabel: "Reykjabod", place: "reykjabod"
    },
    mjolkurbuid: {
      title: "Quick groceries in Selfoss", status: "Planned stop", gallery: "mjolkurbuid",
      desc: "A quick grocery stop in the new town center around the Old Dairy (Mjolkurbuid), about 14 minutes from the domes. Buy breakfast for the dome, and for the Glass Cottages morning too, since neither place serves food.",
      winter: "A practical indoor stop before the 3:00 PM contactless check-in.",
      url: "https://mjolkurbuid.is/en", urlLabel: "Mjolkurbuid", place: "selfoss"
    },
    froken: {
      title: "Dinner at Froken Selfoss", status: "Reserve ahead", gallery: "froken",
      price: "About $160 to $225 for two, with drinks",
      sub: "Not in the trip total.",
      desc: "Downtown Selfoss, about 10 to 15 minutes from the domes. Open 12:00 PM to 10:00 PM daily, and the kitchen closes at 9:30 PM. Modern Icelandic food. Tryggvaskali is closed Monday and Tuesday, so this is the Tuesday pick.",
      url: "https://www.frokenselfoss.is/en", urlLabel: "Froken Selfoss", place: "froken"
    },
    kerid: {
      title: "Kerid crater", status: "Planned stop", gallery: "kerid",
      price: "Small entry fee, paid on site",
      desc: "A red volcanic crater with a lake at the bottom, about 5 minutes from the domes, then about 48 minutes on to Glass Cottages. Winter hours are about 9:00 AM to 5:00 PM.",
      winter: "Paths around the rim can be icy. Go late morning when the light comes up.",
      url: "https://www.keridcratericeland.is/en/visiting-hours", urlLabel: "Kerid", place: "kerid"
    },
    midgard: {
      title: "Dinner at Midgard Restaurant, Hvolsvollur", status: "Reserve ahead", gallery: "midgard",
      price: "26,000 ISK (about $208) for two",
      sub: "Glass Cottages 3-course partner offer, before drinks. Not in the trip total.",
      desc: "About 13 minutes from Glass Cottages. Open 4:00 PM to 9:00 PM daily. From-scratch Icelandic food in a small dining room, so reserve ahead.",
      url: "https://midgardbasecamp.is/midgard-base-camp-restaurant/", urlLabel: "Midgard", place: "midgard"
    },
    nye: {
      title: "New Year's Eve in Reykjavik", status: "Free", gallery: "nye",
      desc: "Dinner first, then a neighborhood bonfire in the evening, then the whole city sets off fireworks at midnight. Hallgrimskirkja's steps and the hillside around Perlan are the classic viewpoints, and the harbor by the hotel is close to the action.",
      winter: "Dress for standing still in the wind. The city posts the bonfire sites each year, so pick one you can walk or taxi to from the EDITION.",
      url: "https://visitreykjavik.is/festivals-and-events-reykjavik", urlLabel: "Visit Reykjavik", place: "hallgrimskirkja"
    },
    sky_lagoon: {
      title: "Sky Lagoon, Kopavogur", status: "Optional", gallery: "sky_lagoon",
      price: "Saman from 29,980 ISK (about $240) for two",
      sub: "Ser from 35,980 ISK (about $288) for two. Floor prices that vary by time slot. Not in the trip total.",
      desc: "About 15 minutes from the EDITION. A larger, busier 70 m ocean-edge infinity lagoon with the 7-step Skjol ritual. Saman has shared changing, the ritual, and a towel. Ser adds a private changing cabin, lotion, and a bag.",
      winter: "Winter hours, October 21 to April 30: 10:00 AM to 9:00 PM daily. On December 31: 9:00 AM to 8:00 PM. Leave the water 30 minutes before close.",
      url: "https://www.skylagoon.com/", urlLabel: "Sky Lagoon", place: "sky_lagoon"
    },
    reykjavik: {
      title: "A loose day around the harbor", status: "Free", gallery: "reykjavik",
      desc: "Walk the Old Harbour and into Harpa next door, wander Laugavegur and the shops at Hafnartorg, grab a Baejarins Beztu hot dog with everything, and try Grotta lighthouse after dark for the northern lights. Kolaportid flea market usually runs on weekends.",
      winter: "Many shops shut early on New Year's Eve and New Year's Day. Sidewalks get slushy, so wear shoes with grip.",
      url: "https://visitreykjavik.is/", urlLabel: "Visit Reykjavik", place: "laugavegur"
    },
    golden: {
      title: "Golden Circle drive, if the roads look good", status: "Optional", gallery: "golden",
      desc: "Thingvellir, Geysir, and Gullfoss. The loop is about 282 km and 4 hrs 41 min of driving, approx, before you add a stop. Fridheimar's tomato greenhouse lunch and Silfra's dry-suit snorkel are on the same route.",
      winter: "Watch Mosfellsheidi and Lyngdalsheidi if the wind picks up. Fridheimar hours on New Year's Day are worth confirming.",
      url: "https://www.visiticeland.com/article/the-golden-circle/", urlLabel: "Golden Circle", place: "gullfoss"
    },
    south: {
      title: "South Coast waterfalls, if the forecast is friendly", status: "Optional", gallery: "south",
      desc: "Seljalandsfoss, Skogafoss, and Reynisfjara black beach near Vik. The out-and-back from Reykjavik is about 394 km and 6 hrs 7 min of driving, approx, which is a long winter day.",
      winter: "Hellisheidi and Threngsli ice over first. Reynisfjara has sneaker waves, so stay well up the beach.",
      url: "https://www.visiticeland.com/article/the-south-coast/", urlLabel: "South Coast", place: "skogafoss"
    }
  };

  var DAYS = [
    {
      id: "dec28", num: 1, date: "Dec 28", weekday: "Monday", cover: "icelandair",
      title: "Overnight flight from Denver",
      note: "No driving in Iceland today. FI670 leaves Denver at 3:40 PM MT and you sleep on the plane.",
      times: [{ when: "3:40 PM MT", what: "FI670 departs Denver, 7 hours 25 minutes, nonstop." }],
      stops: ["flight"]
    },
    {
      id: "dec29", num: 2, date: "Dec 29", weekday: "Tuesday", cover: "reykjabod",
      title: "Light arrival day: Reykjabod, then the domes",
      note: "Pick up the 4WD after the 6:05 AM landing and grab breakfast on the way. Reykjabod opens at 10:00 AM. Check-in at the domes is 3:00 PM, with no front desk for an early bag drop. Winter daylight is about 11:20 AM to 3:30 PM.",
      times: [
        { when: "6:05 AM", what: "Land at Keflavik and pick up the 4WD SUV." },
        { when: "Morning", what: "Breakfast on the way south." },
        { when: "After 10:00 AM", what: "Soak at Reykjabod Hot Springs in Hveragerdi." },
        { when: "Afternoon", what: "Quick groceries in Selfoss for the dome kitchen." },
        { when: "3:00 PM", what: "Self check-in at Golden Circle Domes." },
        { when: "Evening", what: "Dinner at Froken Selfoss, about 10 to 15 minutes away." }
      ],
      stops: ["car", "reykjabod", "mjolkurbuid", "stay-domes", "froken"]
    },
    {
      id: "dec30", num: 3, date: "Dec 30", weekday: "Wednesday", cover: "kerid",
      title: "Kerid crater, then Glass Cottages Blar",
      note: "Breakfast in the dome or at Thrastalundur, then check out and stop at Kerid crater on the way south to Hella. Glass Cottages has no on-site food, but the kitchen is stocked with coffee, tea, and oil.",
      times: [
        { when: "Morning", what: "Breakfast in the dome or at Thrastalundur, then check out." },
        { when: "Late morning", what: "Kerid crater, about 5 minutes from the domes." },
        { when: "Afternoon", what: "Check in at Glass Cottages, Cottage Blar, near Hella." },
        { when: "Evening", what: "Dinner at Midgard Restaurant in Hvolsvollur, about 13 minutes away." }
      ],
      stops: ["kerid", "stay-glass", "midgard"]
    },
    {
      id: "dec31", num: 4, date: "Dec 31", weekday: "Thursday", cover: "nye_hallgrimskirkja",
      title: "Drive to Reykjavik for New Year's Eve",
      note: "Glass Cottages to The Reykjavik EDITION is about 96 km and 1 hr 30 min, approx. Downtown will be busy, so leave the car parked after you check in. Bonfires are in the evening, and fireworks go at midnight.",
      times: [
        { when: "Daytime", what: "Drive to Reykjavik and check in at The Reykjavik EDITION." },
        { when: "Evening", what: "Dinner, then a neighborhood bonfire." },
        { when: "10:30 PM", what: "Aramotaskaup, the national TV comedy special, usually airs on RUV." },
        { when: "Midnight", what: "Fireworks over the whole city." }
      ],
      stops: ["stay-edition", "nye"]
    },
    {
      id: "jan1", num: 5, date: "Jan 1", weekday: "Friday", cover: "harpa",
      title: "A slow New Year's Day in Reykjavik",
      note: "A quiet day in town around the harbor and Laugavegur, an optional Sky Lagoon soak, or a Golden Circle drive if the roads look good. Daylight is short, about 11:20 AM to 3:30 PM.",
      times: [
        { when: "Late morning", what: "Sleep in. Breakfast near the hotel." },
        { when: "Midday", what: "Harbor walk and Harpa, or Sky Lagoon, about 15 minutes away." },
        { when: "Evening", what: "Dinner in town, then Grotta after dark if the sky is clear." }
      ],
      stops: ["reykjavik", "sky_lagoon", "golden"]
    },
    {
      id: "jan2", num: 6, date: "Jan 2", weekday: "Saturday", cover: "skogafoss",
      title: "A day in town, or the South Coast",
      note: "Another flexible day from the EDITION. The South Coast out and back is a long winter drive, about 6 hours of driving, so only go if the forecast is friendly. Kolaportid flea market usually runs on weekends, so confirm the holiday hours.",
      times: [{ when: "Day", what: "Shops, a harbor walk, Kolaportid, or the South Coast if you want the longer drive." }],
      stops: ["south"]
    },
    {
      id: "jan3", num: 7, date: "Jan 3", weekday: "Sunday", cover: "retreat_hero",
      title: "The Retreat at Blue Lagoon",
      note: "The EDITION to The Retreat is about 51 km and 51 min, approx. Check out of the hotel and spend the last night in a Lava View Junior Suite, with the Retreat Lagoon steps away.",
      times: [
        { when: "Late morning", what: "Check out of The Reykjavik EDITION." },
        { when: "Afternoon", what: "Drive to The Retreat at Blue Lagoon and check in for one night." },
        { when: "Evening", what: "Soak in the Retreat Lagoon after dark." }
      ],
      stops: ["stay-retreat"]
    },
    {
      id: "jan4", num: 8, date: "Jan 4", weekday: "Monday", cover: "retreat_lagoon",
      title: "Drop off the car, then a 4:55 PM flight home",
      note: "The Retreat to Keflavik is about 23 km and 25 min, approx. FI671 leaves at 4:55 PM and lands in Denver at 6:00 PM MT, 8 hours 5 minutes, nonstop.",
      times: [
        { when: "Morning", what: "One more soak, then check out." },
        { when: "Afternoon", what: "Drive to Keflavik and drop off the car." },
        { when: "4:55 PM", what: "FI671 to Denver, landing 6:00 PM MT." }
      ],
      stops: ["flight"]
    }
  ];

  var STAY_IDS = ["stay-domes", "stay-glass", "stay-edition", "stay-retreat"];

  var TIPS = [
    { tag: "New Year's Eve", photo: "bonfire", title: "Neighborhood bonfires come first", text: "Reykjavik lights neighborhood bonfires in the evening on Dec 31, before the fireworks. The city posts the sites each year. Pick one you can walk or taxi to from the EDITION, and dress for standing still in the wind." },
    { tag: "New Year's Eve", photo: "nye_hallgrimskirkja", title: "Midnight belongs to everyone", text: "At midnight the whole city sets off its own fireworks, not one official show. Hallgrimskirkja's steps and the hillside around Perlan are the classic spots. The harbor by the hotel works if you want to stay close." },
    { tag: "New Year's Eve", photo: "ruv", title: "The 10:30 PM lull", text: "Aramotaskaup, the national TV comedy special, usually airs at 10:30 PM on RUV, and the streets go quiet while it is on. Confirm the 2026 time when RUV posts it. English is not guaranteed." },
    { tag: "Wind and ice", photo: "kerid", title: "Check the roads before every drive", text: "Temperatures often sit between -3 and 3 C, with wind, snow, and ice. Check umferdin.is for roads and safetravel.is for alerts before you set off. Reykjanesbraut and Hellisheidi glaze over first. Hold the car door with both hands when it is windy." },
    { tag: "Wind and ice", photo: "skogafoss", title: "Sneaker waves are real", text: "If you go to Reynisfjara on the South Coast, stay well up the beach and never turn your back on the water. Parking lots and waterfall spray freeze, so shoes with grip help everywhere." },
    { tag: "Kitchens", photo: "domes_int", title: "Neither cottage stay serves breakfast", text: "The domes have a full kitchenette and Thrastalundur on site. Glass Cottages has only coffee, tea, and oil in the kitchen. Do one grocery run in Selfoss on Dec 29 for both mornings." },
    { tag: "Daylight", photo: "aurora_self", title: "Use the dark on purpose", text: "Sunrise is around 11:20 AM and sunset around 3:30 PM, so drive in the blue twilight and save the outdoor stops for midday. On clear nights, check the vedur.is cloud map for the northern lights. Grotta is about 10 minutes from downtown." },
    { tag: "Lagoons", photo: "retreat_lagoon", title: "Protect your hair from the silica", text: "At the Blue Lagoon and The Retreat, put conditioner in and keep your hair out of the water. Leave every lagoon 30 minutes before it closes." },
    { tag: "Food", photo: "baejarins", title: "The hot dog order", text: "At Baejarins Beztu, order one with everything (ein med ollu): remoulade, mustard, raw onion, and crunchy fried onion. The stand stays open in winter, and you eat outside." }
  ];

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function icon(name) {
    return '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-' + name + '"></use></svg>';
  }

  /* Apple Maps only. Road-snapped lat,lon from T.APPLE_COORDS. Never source == destination. */
  function applePoint(key) {
    var road = T.APPLE_COORDS && T.APPLE_COORDS[key];
    var place = T.PLACES && T.PLACES[key];
    if (road) return { lat: road.lat, lon: road.lon, name: (place && place.name) || key };
    if (place && place.lat != null) return { lat: place.lat, lon: place.lon, name: place.name || key };
    return null;
  }
  function appleDirectionsUrl(keys) {
    var pts = [];
    (keys || []).forEach(function (key) { var pt = applePoint(key); if (pt) pts.push(pt); });
    if (pts.length < 2) return "";
    var a = pts[0], z = pts[pts.length - 1];
    if (a.lat === z.lat && a.lon === z.lon) return "";
    var href = "https://maps.apple.com/directions?source=" + a.lat + "," + a.lon;
    for (var i = 1; i < pts.length - 1; i++) href += "&waypoint=" + pts[i].lat + "," + pts[i].lon;
    href += "&destination=" + z.lat + "," + z.lon + "&mode=driving";
    return href;
  }
  function appleRouteHtml(routeId, cls) {
    var route = T.APPLE_ROUTES && T.APPLE_ROUTES[routeId];
    if (!route) return "";
    var href = appleDirectionsUrl(route.keys);
    if (!href) return "";
    return '<a class="btn ' + (cls || "btn-aurora") + '" href="' + esc(href) + '" target="_blank" rel="noopener">' + icon("nav") + " " + esc(route.label) + "</a>";
  }
  function applePinHtml(placeKey) {
    var pt = placeKey && applePoint(placeKey);
    if (!pt) return "";
    var href = "https://maps.apple.com/?ll=" + pt.lat + "," + pt.lon + "&q=" + encodeURIComponent(pt.name);
    return '<a class="link" href="' + esc(href) + '" target="_blank" rel="noopener">' + icon("pin") + " Apple Maps</a>";
  }
  function siteHtml(url, text) {
    if (!url) return "";
    return '<a class="link" href="' + esc(url) + '" target="_blank" rel="noopener">' + icon("external") + " " + esc(text || "Website") + "</a>";
  }
  function statusClass(s) {
    if (s === "Book soon") return "is-soon";
    if (s === "Optional") return "is-optional";
    if (s === "Free" || s === "Planned stop" || s === "Planned soak") return "is-free";
    return "is-plan";
  }

  /* ---------- gallery markup ---------- */
  function mosaicHtml(gKey, opts) {
    opts = opts || {};
    var photos = GALLERIES[gKey] || [];
    if (!photos.length) return "";
    var max = opts.max || 5;
    var shown = photos.slice(0, max);
    var extra = photos.length - shown.length;
    var cls = "mosaic n" + Math.min(shown.length, 5) + (opts.cls ? " " + opts.cls : "");
    var html = '<div class="' + cls + '">';
    shown.forEach(function (key, i) {
      var src = i === 0 && opts.leadFull ? full(key) : thumb(key);
      var more = (i === shown.length - 1 && extra > 0) ? '<span class="more">+' + extra + " photos</span>" : "";
      html += '<button type="button" class="tile" data-gallery="' + esc(gKey) + '" data-index="' + i + '" aria-label="Open photo: ' + esc(label(key)) + '">' +
        '<img src="' + esc(src) + '" alt="' + esc(label(key)) + '" loading="lazy" decoding="async">' + more + "</button>";
    });
    html += "</div>";
    if (photos.length > 1 && !opts.noCount) html += '<p class="photo-count">' + photos.length + " photos. Tap to browse.</p>";
    return html;
  }
  function filmstripHtml(keysByGallery) {
    var tiles = "";
    keysByGallery.forEach(function (g) {
      (GALLERIES[g] || []).forEach(function (key, i) {
        tiles += '<button type="button" class="film" data-gallery="' + esc(g) + '" data-index="' + i + '">' +
          '<img src="' + esc(thumb(key)) + '" alt="' + esc(label(key)) + '" loading="lazy" decoding="async">' +
          '<span class="film-cap">' + esc(label(key)) + "</span></button>";
      });
    });
    return '<div class="filmstrip" tabindex="0" aria-label="Photos for this day, scroll sideways">' + tiles + "</div>";
  }

  function stopHtml(id, dayId) {
    var it = ITEMS[id];
    if (!it) return "";
    var links = [];
    if (it.url) links.push(siteHtml(it.url, it.urlLabel));
    if (it.place) links.push(applePinHtml(it.place));
    var isStay = id.indexOf("stay-") === 0;
    var kicker = '<p class="status ' + statusClass(it.status) + '">' + esc(it.status) + (it.nights ? '<span class="nights">' + esc(it.nights) + "</span>" : "") + "</p>";
    var flightNote = "";
    if (id === "flight" && dayId === "jan4") flightNote = '<p class="callout">Today: FI671 leaves Keflavik at 4:55 PM and lands in Denver at 6:00 PM MT.</p>';
    if (id === "flight" && dayId === "dec28") flightNote = '<p class="callout">Today: FI670 leaves Denver at 3:40 PM MT and lands at Keflavik at 6:05 AM on Dec 29.</p>';
    return '<article class="stop reveal' + (isStay ? " is-stay" : "") + '">' +
      '<div class="stop-media">' + mosaicHtml(it.gallery, { max: isStay ? 5 : 3, leadFull: true }) + "</div>" +
      '<div class="stop-text">' + kicker +
      "<h3>" + esc(it.title) + "</h3>" +
      (it.price ? '<p class="price">' + esc(it.price) + "</p>" : "") +
      (it.sub ? '<p class="sub">' + esc(it.sub) + "</p>" : "") +
      flightNote +
      (it.desc ? "<p>" + esc(it.desc) + "</p>" : "") +
      (it.winter ? '<p class="tip"><strong>Insider:</strong> ' + esc(it.winter) + "</p>" : "") +
      (links.length ? '<div class="links">' + links.join("") + "</div>" : "") +
      "</div></article>";
  }

  /* ---------- sections ---------- */
  function renderStays() {
    var el = document.getElementById("stays");
    if (!el) return;
    var html = '<div class="stays-head reveal"><p class="kicker">Where you sleep</p><h3>Four stays, six nights, one bed each night.</h3></div>';
    html += '<div class="stay-grid">';
    STAY_IDS.forEach(function (id) {
      var it = ITEMS[id];
      html += '<article class="stay-card reveal">' +
        mosaicHtml(it.gallery, { max: 4, noCount: true, cls: "stay-mosaic" }) +
        '<div class="stay-body">' +
        '<p class="status ' + statusClass(it.status) + '">' + esc(it.status) + '<span class="nights">' + esc(it.nights) + "</span></p>" +
        "<h4>" + esc(it.title) + "</h4>" +
        '<p class="price">' + esc(it.price) + "</p>" +
        '<p class="sub">' + esc(it.sub) + "</p>" +
        '<div class="links">' + siteHtml(it.url, it.urlLabel) + applePinHtml(it.place) + "</div>" +
        "</div></article>";
    });
    html += "</div>";
    html += '<div class="getting-there">';
    ["flight", "car"].forEach(function (id) {
      var it = ITEMS[id];
      html += '<article class="mini-card reveal">' +
        '<button type="button" class="mini-img" data-gallery="' + it.gallery + '" data-index="0" aria-label="Open photo: ' + esc(label(GALLERIES[it.gallery][0])) + '"><img src="' + esc(thumb(GALLERIES[it.gallery][0])) + '" alt="' + esc(label(GALLERIES[it.gallery][0])) + '" loading="lazy"></button>' +
        '<div><p class="status is-plan">' + esc(it.status) + "</p><h4>" + esc(it.title) + '</h4><p class="price">' + esc(it.price) + '</p><p class="sub">' + esc(it.sub) + "</p>" +
        '<div class="links">' + siteHtml(it.url, it.urlLabel) + "</div></div></article>";
    });
    html += "</div>";
    el.innerHTML = html;
  }

  function fmtMin(m) {
    var h = Math.floor(m / 60), mm = m % 60, ap = h < 12 ? "AM" : "PM", h12 = h % 12 || 12;
    return h12 + ":" + (mm < 10 ? "0" : "") + mm + " " + ap;
  }
  function renderDaylight() {
    var el = document.getElementById("daylightChart");
    if (!el || !T.DAYLIGHT) return;
    var start = 8 * 60, end = 18 * 60, span = end - start;
    function pct(m) { return Math.max(0, Math.min(100, (m - start) / span * 100)); }
    var axis = '<div class="dl-axis" aria-hidden="true">';
    [8, 10, 12, 14, 16, 18].forEach(function (h) {
      axis += '<span style="left:' + pct(h * 60) + '%">' + (h === 12 ? "Noon" : fmtMin(h * 60).replace(":00", "")) + "</span>";
    });
    axis += "</div>";
    var rows = "";
    DAYS.forEach(function (day) {
      var d = T.DAYLIGHT[day.id];
      if (!d) return;
      rows += '<div class="dl-row" role="img" aria-label="' + esc(day.date + ": sunrise " + d.rise + ", sunset " + d.set) + '">' +
        '<span class="dl-day"><b>' + esc(day.date) + "</b><small>" + esc(day.weekday.slice(0, 3)) + "</small></span>" +
        '<span class="dl-track">' +
        '<i class="dl-twilight" style="left:' + pct(d.civilDawn) + "%;width:" + (pct(d.civilDusk) - pct(d.civilDawn)) + '%"></i>' +
        '<i class="dl-sun" style="left:' + pct(d.riseMin) + "%;width:" + (pct(d.setMin) - pct(d.riseMin)) + '%"></i>' +
        '<i class="dl-noon" style="left:' + pct(d.noonMin) + '%"></i>' +
        "</span>" +
        '<span class="dl-times">' + esc(d.rise) + " to " + esc(d.set) + "</span></div>";
    });
    el.innerHTML = axis + '<div class="dl-rows">' + rows + "</div>" +
      '<p class="fine">Sunrise and sunset use the usual solar altitude of -0.833 degrees. Twilight is civil twilight, about 10:04 AM to 4:54 PM.</p>';
  }

  function renderDayRail() {
    var el = document.getElementById("dayrail");
    if (!el) return;
    el.innerHTML = '<div class="rail-inner"><span class="rail-pill" id="railPill" aria-hidden="true"></span>' + DAYS.map(function (d) {
      return '<a href="#day-' + d.id + '" data-rail="' + d.id + '"><b>' + esc(d.date) + "</b><small>Day " + d.num + "</small></a>";
    }).join("") + "</div>";
  }

  function roadsHtml(dayId) {
    var meta = (T.DAY_ROADS || {})[dayId] || {};
    var out = "";
    if (meta.drive) out += '<p><strong>Drive:</strong> ' + esc(meta.drive) + "</p>";
    if (meta.risk) out += '<p><strong>Watch for:</strong> ' + esc(meta.risk) + "</p>";
    if (!out) return "";
    var chips = (T.ROAD_LINKS || []).map(function (l) {
      return '<a class="chip" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
    }).join("");
    return '<div class="roads">' + out + (chips ? '<div class="chips">' + chips + "</div>" : "") + "</div>";
  }

  var MAP_DAYS = { dec29: true, dec30: true, dec31: true, jan3: true, jan4: true };

  function renderDays() {
    var root = document.getElementById("dayChapters");
    if (!root) return;
    var html = "";
    DAYS.forEach(function (day) {
      var d = (T.DAYLIGHT || {})[day.id];
      var galleries = [];
      day.stops.forEach(function (id) { var g = ITEMS[id] && ITEMS[id].gallery; if (g && galleries.indexOf(g) === -1) galleries.push(g); });
      var photoCount = galleries.reduce(function (n, g) { return n + (GALLERIES[g] || []).length; }, 0);
      var times = '<ol class="timeline">' + day.times.map(function (t) {
        return '<li><span class="t-when">' + esc(t.when) + '</span><span class="t-what">' + esc(t.what) + "</span></li>";
      }).join("") + "</ol>";
      var actions = "";
      var drive = appleRouteHtml(day.id);
      if (drive) actions += drive;
      if (MAP_DAYS[day.id]) actions += '<button type="button" class="btn btn-ghost" data-focus-day="' + day.id + '">' + icon("map") + " Show on the map</button>";

      html += '<article class="chapter" id="day-' + day.id + '" data-day="' + day.id + '">' +
        '<header class="chapter-cover">' +
        '<div class="cover-media"><img src="' + esc(full(day.cover)) + '" alt="' + esc(label(day.cover)) + '" loading="lazy" decoding="async"></div>' +
        '<div class="cover-shade"></div>' +
        '<div class="cover-text wrap">' +
        '<p class="cover-num" aria-hidden="true">' + (day.num < 10 ? "0" : "") + day.num + "</p>" +
        '<p class="cover-date">Day ' + day.num + " &middot; " + esc(day.weekday) + ", " + esc(day.date) + (day.id === "dec28" ? ", 2026" : day.id.indexOf("dec") === 0 ? ", 2026" : ", 2027") + "</p>" +
        "<h2>" + esc(day.title) + "</h2>" +
        (d ? '<p class="cover-sun"><span class="sun-dot"></span> Sunrise ' + esc(d.rise) + ", sunset " + esc(d.set) + "</p>" : "") +
        "</div></header>" +
        '<div class="chapter-body wrap">' +
        '<aside class="chapter-side"><div class="side-inner reveal">' +
        '<p class="kicker">The day</p>' + times +
        roadsHtml(day.id) +
        (actions ? '<div class="actions">' + actions + "</div>" : "") +
        "</div></aside>" +
        '<div class="chapter-main">' +
        '<p class="day-note reveal">' + esc(day.note) + "</p>" +
        (photoCount >= 4 ? '<div class="reveal">' + filmstripHtml(galleries) + "</div>" : "") +
        day.stops.map(function (id) { return stopHtml(id, day.id); }).join("") +
        "</div></div></article>";
    });
    root.innerHTML = html;
    var full_ = document.getElementById("fullRouteLink");
    if (full_) full_.innerHTML = appleRouteHtml("full", "btn-aurora");
  }

  function renderTips() {
    var el = document.getElementById("tips");
    if (!el) return;
    el.innerHTML = TIPS.map(function (t, i) {
      return '<article class="tip-card reveal">' +
        '<div class="tip-img"><img src="' + esc(thumb(t.photo)) + '" alt="' + esc(label(t.photo)) + '" loading="lazy"></div>' +
        '<div class="tip-body"><p class="tag">' + esc(t.tag) + "</p><h3>" + esc(t.title) + "</h3><p>" + esc(t.text) + "</p></div></article>";
    }).join("");
  }

  function renderSprings() {
    var el = document.getElementById("springsGrid");
    if (!el) return;
    var cards = [
      { id: "reykjabod", where: "Hveragerdi, on the Dec 29 drive",
        rows: [["Classic", "17,800 ISK", "about $142 for two", "Lagoon, outdoor sauna, cold plunge, Kneipp, and a towel."],
               ["Signature", "33,800 ISK", "about $270 for two", "Adds the adults-only indoor Bathhouse Spa with 10 sensory rooms, bathrobes, slippers, and 1 drink each."]],
        hours: "Winter: Monday to Thursday 10:00 AM to 9:00 PM, Friday to Sunday 10:00 AM to 10:00 PM. Out of the water 30 minutes before close. The restaurant is open 11:30 AM to 8:30 PM." },
      { id: "sky_lagoon", where: "Kopavogur, about 15 minutes from the EDITION",
        rows: [["Saman", "from 29,980 ISK", "about $240 for two", "Shared changing, the 7-step Skjol ritual, and a towel. Floor price, varies by time slot."],
               ["Ser", "from 35,980 ISK", "about $288 for two", "Private changing cabin, plus lotion and a bag. Floor price, varies by time slot."]],
        hours: "Winter, October 21 to April 30: 10:00 AM to 9:00 PM daily. December 31: 9:00 AM to 8:00 PM. Out of the water 30 minutes before close." }
    ];
    el.innerHTML = cards.map(function (c) {
      var it = ITEMS[c.id];
      return '<article class="spring reveal">' +
        mosaicHtml(it.gallery, { max: 1, noCount: true, cls: "spring-img", leadFull: true }) +
        '<div class="spring-body"><p class="kicker">' + esc(c.where) + "</p><h3>" + esc(it.title) + "</h3>" +
        '<div class="tiers">' + c.rows.map(function (r) {
          return '<div class="tier"><p class="tier-name">' + esc(r[0]) + '</p><p class="tier-price">' + esc(r[1]) + "<small>" + esc(r[2]) + "</small></p><p>" + esc(r[3]) + "</p></div>";
        }).join("") + "</div>" +
        '<p class="tip"><strong>Hours:</strong> ' + esc(c.hours) + "</p>" +
        '<div class="links">' + siteHtml(it.url, it.urlLabel + " website") + applePinHtml(it.place) + "</div></div></article>";
    }).join("");
  }

  function renderLogistics() {
    var el = document.getElementById("logisticsBody");
    if (!el) return;
    var plan = '<article class="logi reveal"><h3>The working plan</h3><ul>' +
      "<li><strong>Flights:</strong> Icelandair Saga Premium, $6,062 for two, FI670 and FI671, Dec 28 to Jan 4.</li>" +
      "<li><strong>Car:</strong> Blue Car Rental Dacia Duster 4x4, $719 for six days, Dec 29 to Jan 4.</li>" +
      "<li><strong>Dec 29:</strong> Golden Circle Domes, $1,371. No breakfast, full kitchenette, Thrastalundur on site.</li>" +
      "<li><strong>Dec 30:</strong> Glass Cottages, Cottage Blar, $559. Book soon. Free cancellation ends Nov 30, 2026, once you book.</li>" +
      "<li><strong>Dec 31 to Jan 3:</strong> The Reykjavik EDITION King Room, $4,023, Stay Longer Flexible Member.</li>" +
      "<li><strong>Jan 3:</strong> The Retreat at Blue Lagoon, Lava View Junior Suite, est. $2,484 (about 310,000 ISK).</li>" +
      "<li><strong>Lodging:</strong> $8,437. <strong>Planned total:</strong> $15,218 for two.</li></ul></article>";
    var other = '<article class="logi reveal"><h3>Other cash options</h3><ul>' +
      "<li>Icelandair Economy on the same flights is $4,138 for two, which brings the total to $13,294.</li>" +
      "<li>A Land Rover Defender 110 is about $2,148 estimated for six days. With Saga Premium that is about $16,647, and with Economy about $14,723.</li>" +
      "<li>Other EDITION King cash rates for the three nights: Superior King $4,283, standard Flexible Member $4,583, or Prepay Non-refundable $3,933 (lodging $8,347).</li>" +
      "</ul><p class=\"fine\">Hot springs and dinners are not in the trip total.</p></article>";
    var winter = '<article class="logi reveal"><h3>Winter conditions</h3><p>Sunrise is around 11:20 AM, and sunset is around 3:30 to 3:50 PM, about four hours of daylight. Temperatures often sit between -3 and 3 C, with wind, snow, and ice. Check umferdin.is and safetravel.is before any drive. Reynisfjara has sneaker waves, so stay well up the beach.</p>' +
      '<div class="chips">' + (T.ROAD_LINKS || []).map(function (l) { return '<a class="chip" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>"; }).join("") + "</div></article>";
    var packItems = (T.PACK_BASE || []).concat([
      { label: "A swimsuit." }, { label: "Flip-flops for wet decks." },
      { label: "An ice scraper for the car." }, { label: "A warm outfit for New Year's Eve." }
    ]);
    var pack = '<article class="logi reveal"><h3>What to pack</h3><ul class="pack">' + packItems.map(function (p) { return "<li>" + esc(p.label) + "</li>"; }).join("") + "</ul></article>";
    var book = '<article class="logi logi-wide reveal"><h3>Official booking pages</h3><p class="fine">Every flight, stay, and rental car. All are unbooked.</p><div class="book-list">' +
      ["flight", "car"].concat(STAY_IDS).map(function (id) {
        var it = ITEMS[id];
        var b = (T.BOOKING || {})[id];
        return '<div class="book-row"><div><p class="status ' + statusClass(it.status) + '">' + esc(it.status) + "</p><h4>" + esc(it.title) + "</h4>" +
          (b ? '<p class="fine">' + esc(b.text) + "</p>" : "") + "</div>" + siteHtml(it.url, it.urlLabel) + "</div>";
      }).join("") + "</div></article>";
    el.innerHTML = plan + other + winter + pack + book;
  }

  /* ---------- lightbox ---------- */
  var LB = { gallery: null, index: 0, open: false, lastFocus: null };
  function lbEls() {
    return {
      root: document.getElementById("lightbox"), img: document.getElementById("lbImg"),
      wrap: document.getElementById("lbImgWrap"), cap: document.getElementById("lbCaption"),
      count: document.getElementById("lbCount"), strip: document.getElementById("lbStrip")
    };
  }
  function lbRender(dir) {
    var e = lbEls();
    var photos = GALLERIES[LB.gallery] || [];
    var key = photos[LB.index];
    if (!key) return;
    var fx = window.TripFX;
    var swap = function () {
      e.img.src = full(key);
      e.img.alt = label(key);
      e.cap.textContent = label(key);
      e.count.textContent = photos.length > 1 ? (LB.index + 1) + " of " + photos.length : "";
    };
    if (dir && fx && fx.slide) fx.slide(e.wrap, dir, swap); else swap();
    e.strip.innerHTML = photos.length > 1 ? photos.map(function (k, i) {
      return '<button type="button" class="lb-thumb' + (i === LB.index ? " is-on" : "") + '" data-lb-go="' + i + '" aria-label="Photo ' + (i + 1) + '"><img src="' + esc(thumb(k)) + '" alt=""></button>';
    }).join("") : "";
    document.getElementById("lbPrev").hidden = photos.length < 2;
    document.getElementById("lbNext").hidden = photos.length < 2;
    var next = photos[(LB.index + 1) % photos.length];
    if (next) { var pre = new Image(); pre.src = full(next); }
  }
  function lbOpen(gallery, index, origin) {
    var e = lbEls();
    if (!GALLERIES[gallery]) return;
    LB.gallery = gallery; LB.index = index || 0; LB.open = true; LB.lastFocus = document.activeElement;
    e.root.hidden = false;
    document.documentElement.classList.add("lb-open");
    lbRender(0);
    if (window.TripFX && window.TripFX.lbIn) window.TripFX.lbIn(e.root, e.wrap, origin);
    var close = e.root.querySelector(".lb-close");
    if (close) close.focus({ preventScroll: true });
  }
  function lbClose() {
    var e = lbEls();
    if (!LB.open) return;
    LB.open = false;
    var done = function () {
      e.root.hidden = true;
      document.documentElement.classList.remove("lb-open");
      if (LB.lastFocus && LB.lastFocus.focus) LB.lastFocus.focus({ preventScroll: true });
    };
    if (window.TripFX && window.TripFX.lbOut) window.TripFX.lbOut(e.root, e.wrap, done); else done();
  }
  function lbStep(d) {
    var photos = GALLERIES[LB.gallery] || [];
    if (photos.length < 2) return;
    LB.index = (LB.index + d + photos.length) % photos.length;
    lbRender(d);
  }
  function bindLightbox() {
    document.addEventListener("click", function (ev) {
      var t = ev.target.closest("[data-gallery]");
      if (t && !LB.open) { ev.preventDefault(); lbOpen(t.getAttribute("data-gallery"), Number(t.getAttribute("data-index")) || 0, t); return; }
      if (ev.target.closest("[data-lb-close]")) { lbClose(); return; }
      if (ev.target.closest("#lbPrev")) { lbStep(-1); return; }
      if (ev.target.closest("#lbNext")) { lbStep(1); return; }
      var go = ev.target.closest("[data-lb-go]");
      if (go) { var i = Number(go.getAttribute("data-lb-go")); var d = i > LB.index ? 1 : -1; if (i !== LB.index) { LB.index = i; lbRender(d); } }
    });
    document.addEventListener("keydown", function (ev) {
      if (!LB.open) return;
      if (ev.key === "Escape") lbClose();
      else if (ev.key === "ArrowRight") lbStep(1);
      else if (ev.key === "ArrowLeft") lbStep(-1);
    });
    var stage = document.getElementById("lbStage");
    var sx = null, sy = null;
    stage.addEventListener("pointerdown", function (ev) { sx = ev.clientX; sy = ev.clientY; });
    stage.addEventListener("pointerup", function (ev) {
      if (sx === null) return;
      var dx = ev.clientX - sx, dy = ev.clientY - sy;
      sx = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) lbStep(dx < 0 ? 1 : -1);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) lbClose();
    });
  }

  /* ---------- filmstrip drag to scroll (mouse) ---------- */
  function bindFilmstrips() {
    document.querySelectorAll(".filmstrip").forEach(function (strip) {
      var down = false, startX = 0, startLeft = 0, moved = false;
      strip.addEventListener("pointerdown", function (e) {
        if (e.pointerType !== "mouse") return;
        down = true; moved = false; startX = e.clientX; startLeft = strip.scrollLeft;
      });
      window.addEventListener("pointermove", function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > 4) { moved = true; strip.classList.add("is-dragging"); }
        strip.scrollLeft = startLeft - dx;
      });
      window.addEventListener("pointerup", function () { down = false; setTimeout(function () { strip.classList.remove("is-dragging"); }, 0); });
      strip.addEventListener("click", function (e) { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
    });
  }

  /* ---------- map ---------- */
  var routes = null, map = null, legLayers = {}, mapActive = false;
  var MAP_PLACES = ["kef", "reykjabod", "selfoss", "froken", "domes", "kerid", "glass_cottages", "midgard", "edition", "retreat"];
  var DAY_FOCUS = {
    all: { label: "Whole trip", places: MAP_PLACES, legs: ["kef_reykjabod", "reykjabod_selfoss", "selfoss_domes", "domes_kerid", "kerid_glass", "glass_edition", "edition_retreat"] },
    dec29: { label: "Dec 29", places: ["kef", "reykjabod", "selfoss", "froken", "domes"], legs: ["kef_reykjabod", "reykjabod_selfoss", "selfoss_domes", "domes_froken"] },
    dec30: { label: "Dec 30", places: ["domes", "kerid", "glass_cottages", "midgard"], legs: ["domes_kerid", "kerid_glass", "glass_midgard"] },
    dec31: { label: "Dec 31", places: ["glass_cottages", "edition"], legs: ["glass_edition"] },
    jan3: { label: "Jan 3", places: ["edition", "retreat"], legs: ["edition_retreat"] },
    jan4: { label: "Jan 4", places: ["retreat", "kef"], legs: ["blue_lagoon_kef"] }
  };
  var currentFocus = "all";

  function loadRoutes() {
    return fetch(T.ROUTES_URL).then(function (r) { if (!r.ok) throw new Error("routes"); return r.json(); })
      .then(function (d) { routes = d; return d; })
      .catch(function () { routes = { features: [] }; return routes; });
  }
  function pinIcon(main) {
    return L.divIcon({ className: "pin" + (main ? " pin-main" : ""), html: "<span></span>", iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [0, -12] });
  }
  function popupHtml(key) {
    var p = T.PLACES[key];
    if (!p) return "";
    var img = PHOTO_URLS[p.photo] ? '<img src="' + esc(thumb(p.photo)) + '" alt="' + esc(p.name) + '">' : "";
    return '<div class="pop">' + img + "<strong>" + esc(p.name) + '</strong><div class="pop-links">' + siteHtml(p.url, p.urlLabel || "Website") + applePinHtml(key) + "</div></div>";
  }
  function initMap() {
    var el = document.getElementById("tripMap");
    if (!el || typeof L === "undefined") return;
    map = L.map(el, { zoomControl: true, attributionControl: true, dragging: false, scrollWheelZoom: false, touchZoom: false, doubleClickZoom: false, boxZoom: false, keyboard: false, zoomSnap: 0.25 });
    L.tileLayer(T.TILE_URL, { attribution: T.TILE_ATTR, subdomains: "abc", maxZoom: 18 }).addTo(map);
    var bounds = [];
    MAP_PLACES.forEach(function (k) {
      var p = T.PLACES[k];
      if (!p) return;
      var stay = ["domes", "glass_cottages", "edition", "retreat"].indexOf(k) !== -1;
      L.marker([p.lat, p.lon], { icon: pinIcon(stay), title: p.name }).addTo(map).bindPopup(popupHtml(k), { maxWidth: 240, className: "trip-popup" });
      bounds.push([p.lat, p.lon]);
    });
    map.fitBounds(bounds, { padding: [30, 30] });
    loadRoutes().then(function () {
      var byId = {};
      (routes.features || []).forEach(function (f) { if (f.properties && f.properties.id) byId[f.properties.id] = f; });
      var all = {};
      Object.keys(DAY_FOCUS).forEach(function (k) { DAY_FOCUS[k].legs.forEach(function (id) { all[id] = true; }); });
      Object.keys(all).forEach(function (id) {
        var f = byId[id];
        if (!f || !f.geometry) return;
        var ll = f.geometry.coordinates.map(function (c) { return [c[1], c[0]]; });
        legLayers[id] = L.polyline(ll, { color: "#7dffa8", weight: 3, opacity: 0.85, className: "leg" }).addTo(map);
      });
      styleLegs("all");
    });
    setTimeout(function () { try { map.invalidateSize(); } catch (e) {} }, 120);
  }
  function styleLegs(focus) {
    var on = {};
    (DAY_FOCUS[focus] || DAY_FOCUS.all).legs.forEach(function (id) { on[id] = true; });
    var baseOn = {};
    DAY_FOCUS.all.legs.forEach(function (id) { baseOn[id] = true; });
    Object.keys(legLayers).forEach(function (id) {
      var lyr = legLayers[id];
      if (focus === "all") lyr.setStyle({ opacity: baseOn[id] ? 0.9 : 0, weight: 3, color: "#7dffa8" });
      else lyr.setStyle({ opacity: on[id] ? 1 : (baseOn[id] ? 0.22 : 0), weight: on[id] ? 5 : 3, color: on[id] ? "#a6ffc4" : "#7dffa8" });
      if (on[id] && focus !== "all") lyr.bringToFront();
    });
  }
  function focusDay(focus) {
    if (!map || !DAY_FOCUS[focus]) return;
    currentFocus = focus;
    var b = DAY_FOCUS[focus].places.map(function (k) { return [T.PLACES[k].lat, T.PLACES[k].lon]; });
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) map.fitBounds(b, { padding: [50, 50], maxZoom: 11 });
    else map.flyToBounds(b, { padding: [50, 50], maxZoom: 11, duration: 1.3, easeLinearity: 0.2 });
    styleLegs(focus);
    document.querySelectorAll("[data-map-chip]").forEach(function (c) {
      var onNow = c.getAttribute("data-map-chip") === focus;
      c.classList.toggle("is-on", onNow);
      c.setAttribute("aria-pressed", onNow ? "true" : "false");
    });
    moveChipPill(true);
    var route = document.getElementById("fullRouteLink");
    if (route) route.innerHTML = focus === "all" ? appleRouteHtml("full") : appleRouteHtml(focus);
  }
  function moveChipPill(animated) {
    var pill = document.getElementById("chipPill");
    var chip = document.querySelector('[data-map-chip="' + currentFocus + '"]');
    var wrap = document.getElementById("mapChips");
    if (!pill || !chip || !wrap) return;
    wrap.classList.add("has-pill");
    pill.style.width = chip.offsetWidth + "px";
    pill.style.height = chip.offsetHeight + "px";
    var to = "translate(" + chip.offsetLeft + "px, " + chip.offsetTop + "px)";
    if (animated && window.TripFX && window.TripFX.pillTo) window.TripFX.pillTo(pill, to);
    else pill.style.transform = to;
  }
  function setMapActive(on) {
    mapActive = !!on;
    if (!map) return;
    ["dragging", "touchZoom", "doubleClickZoom", "scrollWheelZoom"].forEach(function (h) { if (map[h]) map[h][on ? "enable" : "disable"](); });
    var btn = document.getElementById("mapActivate");
    if (btn) btn.hidden = on;
    var frame = document.getElementById("mapFrame");
    if (frame) frame.classList.toggle("is-active", on);
  }
  function renderMapChips() {
    var el = document.getElementById("mapChips");
    if (!el) return;
    el.innerHTML = '<span class="chip-pill" id="chipPill" aria-hidden="true"></span>' + Object.keys(DAY_FOCUS).map(function (k) {
      return '<button type="button" class="chip' + (k === "all" ? " is-on" : "") + '" data-map-chip="' + k + '" aria-pressed="' + (k === "all" ? "true" : "false") + '">' + esc(DAY_FOCUS[k].label) + "</button>";
    }).join("");
  }
  function bindMap() {
    document.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-map-chip]");
      if (chip) { focusDay(chip.getAttribute("data-map-chip")); return; }
      var fd = e.target.closest("[data-focus-day]");
      if (fd) {
        var id = fd.getAttribute("data-focus-day");
        var sec = document.getElementById("map");
        if (sec) sec.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
        setTimeout(function () { focusDay(id); }, 650);
        return;
      }
      if (e.target.closest("#mapActivate")) setMapActive(true);
    });
    document.addEventListener("click", function (e) {
      if (mapActive && !e.target.closest("#mapFrame") && !e.target.closest("#mapChips")) setMapActive(false);
    });
  }

  /* ---------- countdown and weather ---------- */
  function renderCountdown() {
    var el = document.getElementById("countdown");
    if (!el) return;
    var diff = new Date(T.DEPART).getTime() - Date.now();
    if (diff <= 0) { el.innerHTML = '<span class="gone">The Dec 28 departure time has passed.</span>'; return false; }
    var s = Math.floor(diff / 1000);
    var vals = { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
    Object.keys(vals).forEach(function (k) {
      var b = el.querySelector('[data-k="' + k + '"]');
      if (!b) return;
      var v = String(k === "d" ? vals[k] : (vals[k] < 10 ? "0" : "") + vals[k]);
      if (b.textContent !== v) {
        b.textContent = v;
        if (k !== "s" && window.TripFX && window.TripFX.tick) window.TripFX.tick(b);
      }
    });
    return true;
  }
  function clock(iso) {
    var m = /T(\d{2}):(\d{2})/.exec(iso || "");
    if (!m) return "";
    var h = Number(m[1]); return ((h % 12) || 12) + ":" + m[2] + " " + (h < 12 ? "AM" : "PM");
  }
  function windDir(deg) { return ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.round(((deg % 360) + 360) % 360 / 45) % 8]; }
  function loadWeather() {
    var t = document.getElementById("wxTemp"), w = document.getElementById("wxWind"), s = document.getElementById("wxSub");
    if (!t) return;
    fetch(T.WEATHER_URL).then(function (r) { if (!r.ok) throw new Error("wx"); return r.json(); }).then(function (data) {
      var cur = data.current || {}, day = data.daily || {};
      var c = Math.round(cur.temperature_2m), f = Math.round(cur.temperature_2m * 9 / 5 + 32);
      t.textContent = c + " C";
      w.textContent = f + " F, wind " + Math.round(cur.wind_speed_10m) + " km/h from the " + windDir(cur.wind_direction_10m || 0);
      var sec = day.daylight_duration && day.daylight_duration[0];
      var dl = sec ? Math.floor(sec / 3600) + " hrs " + Math.round(sec % 3600 / 60) + " min of daylight today" : "";
      s.textContent = "Sunrise " + clock(day.sunrise && day.sunrise[0]) + ", sunset " + clock(day.sunset && day.sunset[0]) + (dl ? ", " + dl : "") + ".";
    }).catch(function () {
      t.textContent = "--";
      w.textContent = "The live weather is not loading right now.";
      s.textContent = "Expect about -3 to 3 C in late December, with wind.";
    });
  }

  /* ---------- active day in the rail ---------- */
  function bindRail() {
    var links = {};
    document.querySelectorAll("[data-rail]").forEach(function (a) { links[a.getAttribute("data-rail")] = a; });
    var chapters = Array.prototype.slice.call(document.querySelectorAll(".chapter"));
    var current = null, ticking = false;
    function update() {
      ticking = false;
      var line = window.innerHeight * 0.42, id = null;
      chapters.forEach(function (c) { if (c.getBoundingClientRect().top <= line) id = c.getAttribute("data-day"); });
      if (!id) id = chapters.length ? chapters[0].getAttribute("data-day") : null;
      if (!id || id === current) return;
      current = id;
      Object.keys(links).forEach(function (k) { links[k].classList.toggle("is-on", k === id); });
      if (window.TripFX && window.TripFX.railTo) window.TripFX.railTo(links[id]);
      else moveRailPill(links[id]);
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", function () { current = null; update(); });
    update();
  }
  function moveRailPill(link) {
    var pill = document.getElementById("railPill");
    if (!pill || !link) return;
    pill.style.width = link.offsetWidth + "px";
    pill.style.transform = "translateX(" + link.offsetLeft + "px)";
    var rail = link.parentElement.parentElement;
    if (rail && rail.scrollTo) rail.scrollTo({ left: link.offsetLeft - rail.clientWidth / 2 + link.offsetWidth / 2, behavior: "smooth" });
  }

  function bindMenu() {
    var btn = document.getElementById("menuBtn"), menu = document.getElementById("menu");
    if (!btn || !menu) return;
    function set(open) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        menu.hidden = false;
        if (window.TripFX && window.TripFX.menuIn) window.TripFX.menuIn(menu);
      } else if (!menu.hidden) {
        if (window.TripFX && window.TripFX.menuOut) window.TripFX.menuOut(menu, function () { menu.hidden = true; });
        else menu.hidden = true;
      }
    }
    btn.addEventListener("click", function () { set(btn.getAttribute("aria-expanded") !== "true"); });
    menu.addEventListener("click", function (e) { if (e.target.closest("[data-menu-close]")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  function init() {
    renderStays();
    renderDaylight();
    renderDayRail();
    renderDays();
    renderTips();
    renderSprings();
    renderLogistics();
    renderMapChips();
    bindLightbox();
    bindFilmstrips();
    bindMap();
    bindRail();
    bindMenu();
    if (renderCountdown()) setInterval(renderCountdown, 1000);
    loadWeather();
    initMap();
    moveChipPill(false);
    window.addEventListener("resize", function () { moveChipPill(false); });
    document.documentElement.classList.add("is-ready");
  }

  window.TripGuide = { focusDay: focusDay, moveRailPill: moveRailPill, GALLERIES: GALLERIES, PLAN_TOTAL: PLAN_TOTAL, appleDirectionsUrl: appleDirectionsUrl };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
