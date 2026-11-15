/* Trip extras: durations, daylight, roads, packing, booking, map places. */
window.ICELAND_TRIP = (function () {
  var PLACES = {
    kef: { lat: 63.9850, lon: -22.6056, name: "Keflavik Airport", photo: "icelandair", url: "https://www.icelandair.com/flights/from-denver-to-reykjavik/", urlLabel: "Book it", maps: "Keflavik Airport" },
    edition: { lat: 64.1504, lon: -21.9384, name: "The Reykjavik EDITION", photo: "edition_ext", url: "https://www.editionhotels.com/reykjavik/", urlLabel: "Book it", maps: "The Reykjavik EDITION" },
    harpa: { lat: 64.1502, lon: -21.9325, name: "Harpa Concert Hall", photo: "harpa", url: "https://www.harpa.is/", urlLabel: "Website", maps: "Harpa Concert Hall Reykjavik" },
    blue_lagoon: { lat: 63.8804, lon: -22.4495, name: "Blue Lagoon", photo: "blue_lagoon", url: "https://www.bluelagoon.com/", urlLabel: "Book it", maps: "Blue Lagoon Iceland" },
    retreat: { lat: 63.8815, lon: -22.4530, name: "The Retreat at Blue Lagoon", photo: "retreat_hero", url: "https://www.bluelagoon.com/retreat", urlLabel: "Book it", maps: "The Retreat at Blue Lagoon" },
    sky_lagoon: { lat: 64.1220, lon: -21.9316, name: "Sky Lagoon", photo: "sky_lagoon", url: "https://www.skylagoon.com/", urlLabel: "Book it", maps: "Sky Lagoon Kopavogur" },
    grotta: { lat: 64.1642, lon: -22.0117, name: "Grotta lighthouse", photo: "grotta", url: "https://visitreykjavik.is/city-areas/seltjarnarnes-grotta", urlLabel: "Website", maps: "Grotta lighthouse Reykjavik" },
    hvammsvik: { lat: 64.3697, lon: -21.6042, name: "Hvammsvik Hot Springs", photo: "hvammsvik", url: "https://www.hvammsvik.com/", urlLabel: "Book it", maps: "Hvammsvik Hot Springs" },
    ishestar: { lat: 64.0440, lon: -21.9720, name: "Ishestar, Hafnarfjordur", photo: "ishestar", url: "https://www.ishestar.is/en/portfolio/horses-and-waffles/", urlLabel: "Book it", maps: "Ishestar Hafnarfjordur" },
    thingvellir: { lat: 64.2550, lon: -21.1292, name: "Thingvellir", photo: "silfra", url: "https://www.thingvellir.is/en", urlLabel: "Website", maps: "Thingvellir National Park" },
    geysir: { lat: 64.3140, lon: -20.3010, name: "Geysir", photo: "gullfoss", url: "https://guidetoiceland.is/travel-iceland/drive/geysir", urlLabel: "Website", maps: "Geysir Iceland" },
    gullfoss: { lat: 64.3271, lon: -20.1199, name: "Gullfoss", photo: "gullfoss", url: "https://www.south.is/en/place/gullfoss-waterfall", urlLabel: "Website", maps: "Gullfoss" },
    fridheimar: { lat: 64.1417, lon: -20.4728, name: "Fridheimar", photo: "fridheimar", url: "https://fridheimar.is/en", urlLabel: "Book it", maps: "Fridheimar" },
    fontana: { lat: 64.2160, lon: -20.7300, name: "Laugarvatn Fontana", photo: "fontana", url: "https://www.fontana.is/", urlLabel: "Book it", maps: "Laugarvatn Fontana" },
    silfra: { lat: 64.2525, lon: -21.1167, name: "Silfra, Thingvellir", photo: "silfra", url: "https://www.dive.is/diving-snorkeling-tours/snorkeling-tours/silfra-snorkeling-day-tour", urlLabel: "Book it", maps: "Silfra at Thingvellir" },
    seljalandsfoss: { lat: 63.6156, lon: -19.9886, name: "Seljalandsfoss", photo: "seljalandsfoss", url: "https://www.south.is/en/place/seljalandsfoss-waterfall", urlLabel: "Website", maps: "Seljalandsfoss" },
    skogafoss: { lat: 63.5321, lon: -19.5112, name: "Skogafoss", photo: "skogafoss", url: "https://www.south.is/en/place/skogafoss-waterfall", urlLabel: "Website", maps: "Skogafoss" },
    vik: { lat: 63.4186, lon: -19.0060, name: "Vik", photo: "skogafoss", url: "https://www.visitvik.is/", urlLabel: "Website", maps: "Vik Iceland" },
    reynisfjara: { lat: 63.4045, lon: -19.0434, name: "Reynisfjara black beach", photo: "skogafoss", url: "https://www.south.is/en/place/reynisfjara-black-sand-beach", urlLabel: "Website", maps: "Reynisfjara" },
    katla: { lat: 63.4900, lon: -19.0700, name: "Katla ice cave", photo: "katla", url: "https://katlatrack.is/all-tours/ice-cave-tours/katla-fast-track-ice-cave-tour/", urlLabel: "Book it", maps: "Katla ice cave Iceland" },
    jokulsarlon: { lat: 64.0483, lon: -16.1810, name: "Jokulsarlon glacier lagoon", photo: "jokulsarlon", url: "https://glacieradventure.is/tour/crystal-ice-cave-adventure/", urlLabel: "Book it", maps: "Jokulsarlon" },
    diamond: { lat: 64.0414, lon: -16.1776, name: "Diamond Beach", photo: "jokulsarlon", url: "https://www.visitvatnajokull.is/diamond-beach", urlLabel: "Website", maps: "Diamond Beach Iceland" },
    hofn: { lat: 64.2536, lon: -15.2082, name: "Hotel Hofn", photo: "hofn", url: "https://www.hotelhofn.is/", urlLabel: "Book it", maps: "Hotel Hofn Iceland" },
    panorama: { lat: 63.8506, lon: -20.3839, name: "Panorama Glass Lodge", photo: "panorama", url: "https://www.panoramaglasslodge.com/", urlLabel: "Book it", maps: "Panorama Glass Lodge Iceland" },
    buubble: { lat: 63.7510, lon: -20.1330, name: "Buubble", photo: "buubble", url: "https://buubble.com/", urlLabel: "Book it", maps: "Buubble Iceland" },
    aurora_igloo: { lat: 63.7800, lon: -20.2300, name: "Aurora Igloo", photo: "aurora_igloo", url: "https://auroraigloo.is/", urlLabel: "Book it", maps: "Aurora Igloo Iceland" },
    dill: { lat: 64.1456, lon: -21.9274, name: "Dill", photo: "dill", url: "https://dillrestaurant.is/", urlLabel: "Book it", maps: "Dill Reykjavik" },
    grillmarkadurinn: { lat: 64.1468, lon: -21.9358, name: "Grillmarkadurinn", photo: "grillmarkadurinn", url: "https://www.grillmarkadurinn.is/", urlLabel: "Book it", maps: "Grillmarkadurinn Reykjavik" },
    kolaportid: { lat: 64.1487, lon: -21.9378, name: "Kolaportid", photo: "kolaportid", url: "https://www.kolaportid.is/", urlLabel: "Website", maps: "Kolaportid Reykjavik" },
    hallgrimskirkja: { lat: 64.1418, lon: -21.9266, name: "Hallgrimskirkja", photo: "nye_hallgrimskirkja", url: "https://hallgrimskirkja.is/", urlLabel: "Website", maps: "Hallgrimskirkja" },
    laugavegur: { lat: 64.1462, lon: -21.9278, name: "Laugavegur", photo: "laugavegur", url: "https://visitreykjavik.is/", urlLabel: "Website", maps: "Laugavegur Reykjavik" },
    baejarins: { lat: 64.1503, lon: -21.9398, name: "Baejarins Beztu", photo: "baejarins", url: "https://bbp.is/", urlLabel: "Website", maps: "Baejarins Beztu Reykjavik" }
  };

  var DURATIONS = {
    flight: { mins: 420, official: true, text: "about 7 hrs in the air, official block time" },
    harpa_walk: { mins: 45, official: false, text: "about 45 min, approx, and you can see the hotel from the doors" },
    shopping_downtown: { mins: 60, official: false, text: "about 1 hr of wandering, approx" },
    grotta: { mins: 60, official: false, text: "about 1 hr incl. the short drive, approx" },
    sky_lagoon: { mins: 135, official: false, text: "about 2 hrs 15 min incl. the 15 min drive, approx" },
    tides: { mins: 90, official: false, text: "about 1 hr 30 min, approx" },
    wool_shops: { mins: 45, official: false, text: "about 45 min, approx" },
    baejarins: { mins: 20, official: false, text: "about 20 min, approx" },
    nl_guided: { mins: 210, official: true, text: "max 3.5 hrs official, incl. pickup, from Reykjavik Excursions" },
    nl_self: { mins: 120, official: false, text: "about 2 hrs, approx" },
    "ice-plan:jokulsarlon": { mins: 180, official: true, text: "3 hrs official for the Crystal Ice Cave, plus the lagoon and a night in Hofn" },
    "ice-plan:katla": { mins: 165, official: true, text: "2.5 to 3 hrs official for the Katla Fast Track" },
    "ice-plan:skip": { mins: 0, official: false, text: "" },
    nye_dinner: { mins: 120, official: false, text: "about 2 hrs, approx" },
    nye_bonfire: { mins: 60, official: false, text: "about 1 hr after dark, approx" },
    aramotaskaup: { mins: 60, official: false, text: "about 1 hr, approx, starting at 10:30 PM" },
    nye_fireworks: { mins: 60, official: false, text: "about 1 hr around midnight, approx" },
    dill: { mins: 150, official: false, text: "about 2 hrs 30 min, approx" },
    grillmarkadurinn: { mins: 90, official: false, text: "about 1 hr 30 min, approx" },
    horses: { mins: 150, official: true, text: "50 min official ride. Plan about 2 hrs at the stables plus the short drive, approx. Meet there, no pickup included." },
    golden_circle: { mins: 480, official: false, text: "about 8 hrs for the loop, incl. driving, approx" },
    fridheimar: { mins: 60, official: false, text: "about 1 hr for lunch, approx" },
    fontana: { mins: 60, official: false, text: "about 1 hr in the baths, approx, if you are already on the Circle" },
    silfra: { mins: 120, official: true, text: "30 to 40 min official in the water, plus about an hour of driving and the usual suit-up, approx" },
    hvammsvik: { mins: 180, official: false, text: "about 3 hrs incl. the drive, approx" },
    south_coast: { mins: 540, official: false, text: "about 9 hrs incl. driving, approx" },
    kolaportid: { mins: 60, official: false, text: "about 1 hr, approx, Saturday only" },
    blue_lagoon: { mins: 150, official: false, text: "about 2 hrs 30 min incl. the Keflavik-area drive, approx" },
    edition_spa: { mins: 90, official: false, text: "about 1 hr 30 min, approx" },
    retreat_massage: { mins: 60, official: false, text: "about 1 hr, approx" },
    moss: { mins: 150, official: false, text: "about 2 hrs 30 min, approx" }
  };

  var EVENING = {
    grotta: true, nl_guided: true, nl_self: true,
    nye_bonfire: true, nye_fireworks: true, aramotaskaup: true, nye_dinner: true
  };

  var DRIVE_INCLUDED = {
    golden_circle: true, south_coast: true, hvammsvik: true, horses: true,
    silfra: true, sky_lagoon: true, blue_lagoon: true, grotta: true
  };

  /* Typical Reykjavik daylight, computed for these dates, not a live forecast.
     rise/set use the usual solar altitude of -0.833 deg. Civil twilight uses -6 deg. Minutes are from local midnight (GMT, no DST). */
  var DAYLIGHT = {
    dec28: { rise: "11:23 AM", set: "3:36 PM", mins: 253, riseMin: 683, setMin: 936, noonMin: 809, civilDawn: 604, civilDusk: 1014, civilDawnLabel: "10:04 AM", civilDuskLabel: "4:54 PM" },
    dec29: { rise: "11:22 AM", set: "3:38 PM", mins: 256, riseMin: 682, setMin: 938, noonMin: 810, civilDawn: 604, civilDusk: 1015, civilDawnLabel: "10:04 AM", civilDuskLabel: "4:55 PM" },
    dec30: { rise: "11:21 AM", set: "3:39 PM", mins: 258, riseMin: 681, setMin: 939, noonMin: 810, civilDawn: 604, civilDusk: 1017, civilDawnLabel: "10:04 AM", civilDuskLabel: "4:57 PM" },
    dec31: { rise: "11:21 AM", set: "3:41 PM", mins: 260, riseMin: 681, setMin: 941, noonMin: 811, civilDawn: 604, civilDusk: 1018, civilDawnLabel: "10:04 AM", civilDuskLabel: "4:58 PM" },
    jan1:  { rise: "11:20 AM", set: "3:43 PM", mins: 263, riseMin: 680, setMin: 943, noonMin: 811, civilDawn: 603, civilDusk: 1019, civilDawnLabel: "10:03 AM", civilDuskLabel: "4:59 PM" },
    jan2:  { rise: "11:19 AM", set: "3:45 PM", mins: 266, riseMin: 679, setMin: 945, noonMin: 812, civilDawn: 603, civilDusk: 1021, civilDawnLabel: "10:03 AM", civilDuskLabel: "5:01 PM" },
    jan3:  { rise: "11:17 AM", set: "3:47 PM", mins: 270, riseMin: 677, setMin: 947, noonMin: 812, civilDawn: 602, civilDusk: 1022, civilDawnLabel: "10:02 AM", civilDuskLabel: "5:02 PM" }
  };

  var DAY_DATES = {
    dec28: "2026-12-28",
    dec29: "2026-12-29",
    dec30: "2026-12-30",
    dec31: "2026-12-31",
    jan1: "2027-01-01",
    jan2: "2027-01-02",
    jan3: "2027-01-03"
  };

  /* Approximate start times, minutes from Reykjavik midnight. */
  var SCHEDULE = {
    "flight:dec28": 22 * 60 + 40,
    "flight:dec29": 0,
    "flight:jan3": 16 * 60 + 55,
    harpa_walk: 8 * 60 + 30,
    shopping_downtown: 10 * 60,
    wool_shops: 11 * 60,
    baejarins: 12 * 60,
    tides: 18 * 60 + 30,
    grotta: 21 * 60,
    sky_lagoon: 17 * 60 + 30,
    nl_guided: 20 * 60,
    nl_self: 21 * 60,
    horses: 10 * 60,
    golden_circle: 11 * 60,
    silfra: 11 * 60 + 30,
    fridheimar: 13 * 60,
    fontana: 14 * 60 + 30,
    hvammsvik: 16 * 60,
    south_coast: 9 * 60,
    kolaportid: 11 * 60,
    "ice-plan:jokulsarlon": 13 * 60 + 30,
    "ice-plan:katla": 11 * 60,
    nye_dinner: 18 * 60,
    dill: 19 * 60,
    grillmarkadurinn: 19 * 60,
    aramotaskaup: 22 * 60 + 30,
    nye_bonfire: 20 * 60 + 30,
    nye_fireworks: 23 * 60 + 50,
    blue_lagoon: 10 * 60 + 30,
    edition_spa: 9 * 60,
    retreat_massage: 11 * 60,
    moss: 18 * 60 + 30
  };

  var BAR_LABELS = {
    flight: "Flight",
    "flight:dec29": "Landing",
    harpa_walk: "Harpa",
    shopping_downtown: "Downtown",
    wool_shops: "Wool shops",
    baejarins: "Hot dog",
    tides: "Tides",
    grotta: "Grotta",
    sky_lagoon: "Sky Lagoon",
    nl_guided: "Lights tour",
    nl_self: "Aurora watch",
    horses: "Horses",
    golden_circle: "Golden Circle",
    silfra: "Silfra",
    fridheimar: "Fridheimar",
    fontana: "Fontana",
    hvammsvik: "Hvammsvik",
    south_coast: "South Coast",
    kolaportid: "Kolaportid",
    "ice-plan:jokulsarlon": "Ice cave",
    "ice-plan:katla": "Katla cave",
    nye_dinner: "NYE dinner",
    dill: "Dill",
    grillmarkadurinn: "Grillmarkadurinn",
    aramotaskaup: "Aramotaskaup",
    nye_bonfire: "Bonfire",
    nye_fireworks: "Fireworks",
    blue_lagoon: "Blue Lagoon",
    edition_spa: "EDITION Spa",
    retreat_massage: "Retreat spa",
    moss: "Moss",
    drive: "Drive"
  };

  var BAR_SKIP = {
    "stay-edition": true, "stay-retreat": true, "hold-dec28": true,
    "sky-cabin": true, car: true, "food-budget": true
  };

  var BAR_PRIMARY = {
    flight: true, horses: true, golden_circle: true, south_coast: true,
    "ice-plan": true, blue_lagoon: true, hvammsvik: true, sky_lagoon: true
  };

  var TOUR_PLACES = {
    golden_circle: ["thingvellir", "geysir", "gullfoss"],
    south_coast: ["seljalandsfoss", "skogafoss", "vik", "reynisfjara"],
    "ice-plan:jokulsarlon": ["jokulsarlon", "diamond", "hofn"]
  };

  var PLACE_FOR = {
    flight: "kef",
    "hold-dec28": "edition",
    "stay-edition": "edition",
    "stay-retreat": "retreat",
    "sky-cabin:pano-standard": "panorama",
    "sky-cabin:pano-premium": "panorama",
    "sky-cabin:buubble": "buubble",
    "sky-cabin:aurora": "aurora_igloo",
    "sky-cabin:town": "edition",
    harpa_walk: "harpa",
    shopping_downtown: "laugavegur",
    grotta: "grotta",
    sky_lagoon: "sky_lagoon",
    tides: "edition",
    wool_shops: "laugavegur",
    "ice-plan:jokulsarlon": "hofn",
    "ice-plan:katla": "katla",
    nye_dinner: "edition",
    nye_bonfire: "hallgrimskirkja",
    aramotaskaup: "edition",
    nye_fireworks: "hallgrimskirkja",
    dill: "dill",
    grillmarkadurinn: "grillmarkadurinn",
    horses: "ishestar",
    golden_circle: "gullfoss",
    fridheimar: "fridheimar",
    fontana: "fontana",
    silfra: "silfra",
    hvammsvik: "hvammsvik",
    south_coast: "vik",
    kolaportid: "kolaportid",
    blue_lagoon: "blue_lagoon",
    edition_spa: "edition",
    retreat_massage: "retreat",
    moss: "retreat",
    baejarins: "baejarins",
    nl_self: "grotta"
  };

  var DAY_STOP_ORDER = {
    dec28: ["hold-dec28"],
    dec29: ["flight", "stay-edition", "stay-retreat", "harpa_walk", "shopping_downtown", "wool_shops", "baejarins", "tides", "grotta", "sky_lagoon"],
    dec30: ["stay-edition", "stay-retreat", "ice-plan", "nl_guided", "nl_self"],
    dec31: ["stay-edition", "nye_dinner", "dill", "grillmarkadurinn", "aramotaskaup", "nye_bonfire", "nye_fireworks"],
    jan1: ["stay-edition", "stay-retreat", "horses", "golden_circle", "silfra", "fridheimar", "fontana", "hvammsvik", "tides"],
    jan2: ["stay-edition", "stay-retreat", "sky-cabin", "south_coast", "ice-plan", "kolaportid", "wool_shops"],
    jan3: ["stay-edition", "edition_spa", "stay-retreat", "retreat_massage", "moss", "blue_lagoon", "flight"]
  };

  var DAY_ROADS = {
    dec28: { drive: "", risk: "No driving in Iceland today. The departure is from Denver." },
    dec29: { drive: "KEF to the harbor is about 51 km and 52 min, approx, if you skip the lagoon on the way.", risk: "Reykjanesbraut can glaze over. Take it slow after an overnight flight." },
    dec30: { drive: "A Hofn overnight is a long eastbound day, about 381 km and 5 hrs 33 min to the lagoon, approx, unless you take the short flight.", risk: "Wind between Vik and Jokulsarlon can be strong. Check the forecast twice." },
    dec31: { drive: "This is a town day. Walking is the plan.", risk: "Downtown will be busy on New Year's Eve. Leave the car parked." },
    jan1: { drive: "The Golden Circle loop is about 282 km and 4 hrs 41 min of driving, approx, before you add a horse ride or a hot spring.", risk: "Watch Mosfellsheidi and Lyngdalsheidi if the wind picks up." },
    jan2: { drive: "The South Coast out and back is about 394 km and 6 hrs 7 min of driving, approx.", risk: "Hellisheidi and Threngsli ice over first. If you keep going east, watch the wind between Vik and Jokulsarlon." },
    jan3: { drive: "The harbor to the Blue Lagoon is about 51 km and 52 min, approx, then 23 km and 25 min on to KEF.", risk: "Reykjanes can throw spray and wind at the last minute. Leave a cushion for the 4:55 PM flight." }
  };

  var ROAD_LINKS = [
    { href: "https://umferdin.is/en", label: "Roads" },
    { href: "https://www.safetravel.is/", label: "Safety" }
  ];

  var BOOKING = {
    "stay-edition": { text: "Stay Longer rate: free cancellation until Nov 28, 2026.", urgency: "deadline" },
    "hold-dec28": { text: "Same EDITION Stay Longer window: free cancellation until Nov 28, 2026.", urgency: "deadline" },
    "ice-plan": { text: "Ice caves sell out around the holidays. Book early.", urgency: "early" },
    horses: { text: "Holiday rides book up. Book ASAP.", urgency: "asap" },
    silfra: { text: "Holiday tours book up. Book ASAP.", urgency: "asap" },
    golden_circle: { text: "If you take a guided winter tour, book ASAP.", urgency: "asap" },
    south_coast: { text: "If you take a guided winter tour, book ASAP.", urgency: "asap" },
    nl_guided: { text: "Northern lights tours book up over the holidays. Book ASAP.", urgency: "asap" },
    sky_lagoon: { text: "Holiday lagoon slots book up. Book ASAP.", urgency: "asap" },
    blue_lagoon: { text: "Holiday lagoon slots book up. Book ASAP.", urgency: "asap" },
    hvammsvik: { text: "Holiday soak slots book up. Book ASAP.", urgency: "asap" },
    nye_dinner: { text: "NYE dinners book up. Book ASAP.", urgency: "asap" },
    dill: { text: "Holiday tables book up. Book ASAP.", urgency: "asap" },
    grillmarkadurinn: { text: "Holiday tables book up. Book ASAP.", urgency: "asap" },
    moss: { text: "Holiday tables book up. Book ASAP.", urgency: "asap" },
    "sky-cabin": { text: "Holiday cabins book up. Book early.", urgency: "early" },
    "stay-retreat": { text: "Holiday suite nights book up. Book early.", urgency: "early" },
    flight: { text: "Holiday seats go first, especially Saga. Book early.", urgency: "early" },
    car: { text: "Holiday 4x4s go early. Book early.", urgency: "early" }
  };

  var SPA_IDS = ["sky_lagoon", "blue_lagoon", "fontana", "hvammsvik", "edition_spa", "retreat_massage", "stay-retreat"];
  var HORSE_IDS = ["horses"];
  var ICE_CARD = "ice-plan";
  var NYE_IDS = ["nye_dinner", "nye_bonfire", "nye_fireworks"];

  var PACK_BASE = [
    { id: "layers", label: "Base layers." },
    { id: "boots", label: "Waterproof boots with grip." },
    { id: "hat", label: "A warm hat." },
    { id: "gloves", label: "Insulated gloves." },
    { id: "shell", label: "A waterproof shell." },
    { id: "socks", label: "Warm socks, extra pairs." }
  ];

  var DEPART = "2026-12-28T15:40:00-07:00";
  var WEATHER_URL = "https://api.open-meteo.com/v1/forecast?latitude=64.1466&longitude=-21.9426&current=temperature_2m,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset,daylight_duration&timezone=Atlantic%2FReykjavik&wind_speed_unit=kmh";
  var ROUTES_URL = "maps/routes.geojson?v=20261114-plus";
  var PREVIEW_PLACES = ["kef", "edition", "thingvellir", "geysir", "gullfoss", "seljalandsfoss", "skogafoss", "vik", "jokulsarlon", "hofn", "blue_lagoon"];
  var PREVIEW_ROUTES = ["kef_edition", "golden_circle", "south_coast", "edition_jokulsarlon", "edition_hofn", "edition_blue_lagoon", "blue_lagoon_kef"];
  /* Carto dark_all and Voyager now return an "API KEY REQUIRED" watermark
     without a key, so this uses OSM tiles (no key) plus a CSS filter for a dark look. */
  var TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  var TILE_ATTR = "&copy; OpenStreetMap";

  return {
    PLACES: PLACES,
    DURATIONS: DURATIONS,
    EVENING: EVENING,
    DRIVE_INCLUDED: DRIVE_INCLUDED,
    DAYLIGHT: DAYLIGHT,
    DAY_DATES: DAY_DATES,
    SCHEDULE: SCHEDULE,
    BAR_LABELS: BAR_LABELS,
    BAR_SKIP: BAR_SKIP,
    BAR_PRIMARY: BAR_PRIMARY,
    TOUR_PLACES: TOUR_PLACES,
    PLACE_FOR: PLACE_FOR,
    DAY_STOP_ORDER: DAY_STOP_ORDER,
    DAY_ROADS: DAY_ROADS,
    ROAD_LINKS: ROAD_LINKS,
    BOOKING: BOOKING,
    SPA_IDS: SPA_IDS,
    HORSE_IDS: HORSE_IDS,
    ICE_CARD: ICE_CARD,
    NYE_IDS: NYE_IDS,
    PACK_BASE: PACK_BASE,
    DEPART: DEPART,
    WEATHER_URL: WEATHER_URL,
    ROUTES_URL: ROUTES_URL,
    PREVIEW_PLACES: PREVIEW_PLACES,
    PREVIEW_ROUTES: PREVIEW_ROUTES,
    TILE_URL: TILE_URL,
    TILE_ATTR: TILE_ATTR
  };
})();
