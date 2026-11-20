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
    fridheimar: { lat: 64.1417, lon: -20.4728, name: "Fridheimar", photo: "fridheimar", url: "https://fridheimar.is/", urlLabel: "Book it", maps: "Fridheimar" },
    fontana: { lat: 64.2160, lon: -20.7300, name: "Laugarvatn Fontana", photo: "fontana", url: "https://www.fontana.is/", urlLabel: "Book it", maps: "Laugarvatn Fontana" },
    silfra: { lat: 64.2525, lon: -21.1167, name: "Silfra, Thingvellir", photo: "silfra", url: "https://www.dive.is/diving-snorkeling-tours/snorkeling-day-tours/silfra-snorkeling-day-tour", urlLabel: "Book it", maps: "Silfra at Thingvellir" },
    seljalandsfoss: { lat: 63.6156, lon: -19.9886, name: "Seljalandsfoss", photo: "seljalandsfoss", url: "https://www.south.is/en/place/seljalandsfoss-waterfall", urlLabel: "Website", maps: "Seljalandsfoss" },
    skogafoss: { lat: 63.5321, lon: -19.5112, name: "Skogafoss", photo: "skogafoss", url: "https://www.south.is/en/place/skogafoss-waterfall", urlLabel: "Website", maps: "Skogafoss" },
    vik: { lat: 63.4186, lon: -19.0060, name: "Vik", photo: "skogafoss", url: "https://www.visitvik.is/", urlLabel: "Website", maps: "Vik Iceland" },
    reynisfjara: { lat: 63.4045, lon: -19.0434, name: "Reynisfjara black beach", photo: "skogafoss", url: "https://www.south.is/en/place/reynisfjara-reynisfjall-og-reynisdrangar", urlLabel: "Website", maps: "Reynisfjara" },
    katla: { lat: 63.4900, lon: -19.0700, name: "Katla ice cave", photo: "katla", url: "https://katlatrack.is/all-tours/ice-cave-tours/katla-fast-track-ice-cave-tour/", urlLabel: "Book it", maps: "Katla ice cave Iceland" },
    jokulsarlon: { lat: 64.0483, lon: -16.1810, name: "Jokulsarlon glacier lagoon", photo: "jokulsarlon", url: "https://glacieradventure.is/tour/crystal-ice-cave-adventure/", urlLabel: "Book it", maps: "Jokulsarlon" },
    diamond: { lat: 64.0414, lon: -16.1776, name: "Diamond Beach", photo: "jokulsarlon", url: "https://www.vatnajokulsthjodgardur.is/en/areas/jokulsarlon/afangastadur-fellsfjara", urlLabel: "Website", maps: "Diamond Beach Iceland" },
    hofn: { lat: 64.2536, lon: -15.2082, name: "Hotel Hofn", photo: "hofn", url: "https://www.hotelhofn.is/", urlLabel: "Book it", maps: "Hotel Hofn Iceland" },
    panorama: { lat: 63.8506, lon: -20.3839, name: "Panorama Glass Lodge", photo: "panorama", url: "https://www.panoramaglasslodge.com/", urlLabel: "Book it", maps: "Panorama Glass Lodge Iceland" },
    buubble: { lat: 63.7510, lon: -20.1330, name: "Buubble", photo: "buubble", url: "https://buubble.com/", urlLabel: "Book it", maps: "Buubble Iceland" },
    aurora_igloo: { lat: 63.7800, lon: -20.2300, name: "Aurora Igloo", photo: "aurora_igloo", url: "https://auroraigloo.is/", urlLabel: "Book it", maps: "Aurora Igloo Iceland" },
    sandholt: { lat: 64.1459, lon: -21.9288, name: "Sandholt bakery", photo: "sandholt", url: "https://sandholt.is/en/", urlLabel: "Website", maps: "Sandholt Laugavegur Reykjavik" },
    lava_tunnel: { lat: 63.9397, lon: -21.3967, name: "Raufarholshellir Lava Tunnel", photo: "lava_tunnel", url: "https://www.iceland.org/caves/raufarholshellir", urlLabel: "Book it", maps: "Raufarholshellir Lava Tunnel" },
    almar: { lat: 64.0003, lon: -21.1833, name: "Almar Bakari, Hveragerdi", photo: "sandholt", url: "https://sandholt.is/en/", urlLabel: "Website", maps: "Almar Bakari Hveragerdi" },
    reykjabod: { lat: 64.022922, lon: -21.211112, name: "Reykjabod Hot Springs", photo: "reykjabod", url: "https://reykjabod.is/", urlLabel: "Website", maps: "Reykjabod Hot Springs Arholmar Hveragerdi" },
    selfoss: { lat: 63.9371, lon: -21.0041, name: "Mjolkurbuid Food Hall, Selfoss", photo: "mjolkurbuid", url: "https://mjolkurbuid.is/en", urlLabel: "Website", maps: "Mjolkurbuid Food Hall Selfoss" },
    mjolkurbuid: { lat: 63.9371, lon: -21.0041, name: "Mjolkurbuid Food Hall, Selfoss", photo: "mjolkurbuid", url: "https://mjolkurbuid.is/en", urlLabel: "Website", maps: "Mjolkurbuid Food Hall Selfoss" },
    domes: { lat: 64.0279, lon: -20.9285, name: "Golden Circle Domes", photo: "domes", url: "https://property.godo.is/booking2.php?propid=175431&cur=USD", urlLabel: "Book it", maps: "Golden Circle Domes Thrastalundur Selfoss" },
    kerid: { lat: 64.0413, lon: -20.8851, name: "Kerid crater", photo: "kerid", url: "https://www.keridcratericeland.is/en/visiting-hours", urlLabel: "Website", maps: "Kerid crater Iceland" },
    glass_cottages: { lat: 63.8340, lon: -20.3910, name: "Glass Cottages, Cottage Blar", photo: "glass_cottages", url: "https://glasscottages.com/", urlLabel: "Book it", maps: "Glass Cottages Klettamork Hella" },
    froken: { lat: 63.936664, lon: -21.003740, name: "Froken Selfoss", photo: "froken", url: "https://www.frokenselfoss.is/en", urlLabel: "Website", maps: "Froken Selfoss Bruarstraeti" },
    midgard: { lat: 63.745736, lon: -20.227928, name: "Midgard Restaurant, Hvolsvollur", photo: "midgard", url: "https://midgardbasecamp.is/midgard-base-camp-restaurant/", urlLabel: "Website", maps: "Midgard Restaurant Hvolsvollur" },
    dill: { lat: 64.1456, lon: -21.9274, name: "Dill", photo: "dill", url: "https://dillrestaurant.is/", urlLabel: "Book it", maps: "Dill Reykjavik" },
    grillmarkadurinn: { lat: 64.1468, lon: -21.9358, name: "Grillmarkadurinn", photo: "grillmarkadurinn", url: "https://www.grillmarkadurinn.is/", urlLabel: "Book it", maps: "Grillmarkadurinn Reykjavik" },
    kolaportid: { lat: 64.1487, lon: -21.9378, name: "Kolaportid", photo: "kolaportid", url: "https://www.kolaportid.is/", urlLabel: "Website", maps: "Kolaportid Reykjavik" },
    hallgrimskirkja: { lat: 64.1418, lon: -21.9266, name: "Hallgrimskirkja", photo: "nye_hallgrimskirkja", url: "https://hallgrimskirkja.is/", urlLabel: "Website", maps: "Hallgrimskirkja" },
    laugavegur: { lat: 64.1462, lon: -21.9278, name: "Laugavegur", photo: "laugavegur", url: "https://visitreykjavik.is/", urlLabel: "Website", maps: "Laugavegur Reykjavik" },
    baejarins: { lat: 64.1503, lon: -21.9398, name: "Baejarins Beztu", photo: "baejarins", url: "https://bbp.is/", urlLabel: "Website", maps: "Baejarins Beztu Reykjavik" }
  };

  var DURATIONS = {
    flight: { mins: 445, official: true, text: "7 hrs 25 min outbound, 8 hrs 5 min return, official block times" },
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
    moss: { mins: 150, official: false, text: "about 2 hrs 30 min, approx" },
    sandholt: { mins: 45, official: false, text: "about 45 min for breakfast, approx" },
    lava_tunnel: { mins: 60, official: true, text: "1 hr official guided walk, tours from 9:00 AM" },
    reykjabod: { mins: 90, official: false, text: "about 1 hr 30 min, approx" },
    mjolkurbuid: { mins: 60, official: false, text: "about 1 hr for lunch and groceries, approx" },
    kerid: { mins: 45, official: false, text: "about 45 min at the crater, approx, plus a 5 to 10 min drive from the domes" },
    "stay-domes": { mins: 0, official: false, text: "Contactless self check-in from 3:00 PM. No front desk." },
    "stay-glass": { mins: 0, official: false, text: "About 50 min and 51 km from the domes, approx." }
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
    jan3:  { rise: "11:17 AM", set: "3:47 PM", mins: 270, riseMin: 677, setMin: 947, noonMin: 812, civilDawn: 602, civilDusk: 1022, civilDawnLabel: "10:02 AM", civilDuskLabel: "5:02 PM" },
    jan4:  { rise: "11:16 AM", set: "3:49 PM", mins: 273, riseMin: 676, setMin: 949, noonMin: 812, civilDawn: 601, civilDusk: 1024, civilDawnLabel: "10:01 AM", civilDuskLabel: "5:04 PM" }
  };

  var DAY_DATES = {
    dec28: "2026-12-28",
    dec29: "2026-12-29",
    dec30: "2026-12-30",
    dec31: "2026-12-31",
    jan1: "2027-01-01",
    jan2: "2027-01-02",
    jan3: "2027-01-03",
    jan4: "2027-01-04"
  };

  /* Approximate start times, minutes from Reykjavik midnight. */
  var SCHEDULE = {
    "flight:dec28": 22 * 60 + 40,
    "flight:dec29": 0,
    "flight:jan4": 16 * 60 + 55,
    harpa_walk: 8 * 60 + 30,
    shopping_downtown: 10 * 60,
    wool_shops: 11 * 60,
    baejarins: 12 * 60,
    tides: 18 * 60 + 30,
    grotta: 21 * 60,
    sky_lagoon: 11 * 60,
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
    moss: 18 * 60 + 30,
    sandholt: 7 * 60 + 30,
    lava_tunnel: 9 * 60,
    reykjabod: 11 * 60,
    sky_lagoon: 11 * 60,
    mjolkurbuid: 13 * 60 + 30,
    froken: 19 * 60,
    kerid: 11 * 60,
    midgard: 18 * 60 + 30,
    "stay-domes": 15 * 60,
    "stay-glass": 15 * 60
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
    sandholt: "Breakfast",
    lava_tunnel: "Lava tunnel",
    reykjabod: "Reykjabod",
    mjolkurbuid: "Groceries",
    froken: "Froken",
    kerid: "Kerid",
    midgard: "Midgard",
    "stay-domes": "Check-in",
    "stay-glass": "Glass Cottages",
    drive: "Drive"
  };

  var BAR_SKIP = {
    "stay-edition": true, "stay-retreat": true, "hold-dec28": true,
    "sky-cabin": true, "stay-domes": true, "stay-glass": true,
    car: true, "food-budget": true
  };

  var BAR_PRIMARY = {
    flight: true, horses: true, golden_circle: true, south_coast: true,
    "ice-plan": true, blue_lagoon: true, hvammsvik: true, sky_lagoon: true,
    lava_tunnel: true, reykjabod: true, kerid: true
  };

  var TOUR_PLACES = {
    golden_circle: ["thingvellir", "geysir", "gullfoss"],
    south_coast: ["seljalandsfoss", "skogafoss", "vik", "reynisfjara"],
    "ice-plan:jokulsarlon": ["jokulsarlon", "diamond", "hofn"],
    reykjabod: ["reykjabod"],
    sandholt: ["sandholt"]
  };

  var PLACE_FOR = {
    flight: "kef",
    "hold-dec28": "edition",
    "stay-edition": "edition",
    "stay-retreat": "retreat",
    "stay-domes": "domes",
    "stay-glass": "glass_cottages",
    sandholt: "sandholt",
    lava_tunnel: "lava_tunnel",
    reykjabod: "reykjabod",
    mjolkurbuid: "selfoss",
    froken: "froken",
    midgard: "midgard",
    kerid: "kerid",
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
    dec28: ["flight"],
    dec29: ["flight", "reykjabod", "mjolkurbuid", "stay-domes", "froken"],
    dec30: ["stay-domes", "kerid", "stay-glass", "midgard", "golden_circle", "fridheimar", "south_coast", "nl_guided", "nl_self"],
    dec31: ["stay-edition", "nye_dinner", "dill", "grillmarkadurinn", "aramotaskaup", "nye_bonfire", "nye_fireworks", "harpa_walk", "grotta"],
    jan1: ["stay-edition", "horses", "golden_circle", "silfra", "fridheimar", "fontana", "hvammsvik", "tides"],
    jan2: ["stay-edition", "south_coast", "kolaportid", "wool_shops", "shopping_downtown"],
    jan3: ["stay-retreat", "edition_spa", "retreat_massage", "moss", "blue_lagoon"],
    jan4: ["stay-retreat", "flight"]
  };

  var DAY_ROADS = {
    dec28: { drive: "", risk: "No driving in Iceland today. The departure is from Denver at 3:40 PM MT." },
    dec29: { drive: "Keflavik to Reykjabod Hot Springs is about 88 km and 1 hr 24 min, approx. Reykjabod to Selfoss is about 17 km and 18 min, and Selfoss to the domes is about 13 km and 14 min. A straight drive to the domes is about 105 km and 1 hr 38 min.", risk: "Reykjanesbraut and Hellisheidi can glaze over. Take it slow after an overnight flight. Reykjabod opens at 10:00 AM on Tuesday. There is no front desk at the domes, so plan to arrive at or after 3:00 PM." },
    dec30: { drive: "The domes to Kerid crater is about 4 km and 5 min, approx. Kerid to Glass Cottages, near Hella, is about 52 km and 48 min. Midgard Restaurant in Hvolsvollur is about 13 km and 13 min from the cottages.", risk: "South coast roads can ice over. Check umferdin.is before you leave." },
    dec31: { drive: "Glass Cottages to The Reykjavik EDITION is about 96 km and 1 hr 30 min, approx.", risk: "Downtown will be busy on New Year's Eve. Leave the car parked after you check in." },
    jan1: { drive: "A loose day in Reykjavik from the EDITION. If you want a Golden Circle drive, the loop is about 282 km and 4 hrs 41 min of driving, approx, before you add a stop.", risk: "If you do drive, watch Mosfellsheidi and Lyngdalsheidi if the wind picks up." },
    jan2: { drive: "Another flexible day from the EDITION. If you want the South Coast, the out-and-back from Reykjavik is about 394 km and 6 hrs 7 min of driving, approx.", risk: "Hellisheidi and Threngsli ice over first. Only go if the forecast is friendly." },
    jan3: { drive: "The EDITION to The Retreat at Blue Lagoon is about 51 km and 51 min, approx.", risk: "Reykjanes can throw spray and wind. Leave a cushion if you soak before check-in." },
    jan4: { drive: "The Retreat to Keflavik is about 23 km and 25 min, approx, to drop off the car.", risk: "Reykjanes can throw spray and wind at the last minute. Leave a cushion for the 4:55 PM flight." }
  };

  var ROAD_LINKS = [
    { href: "https://umferdin.is/en", label: "Roads" },
    { href: "https://www.safetravel.is/", label: "Safety" }
  ];

  var BOOKING = {
    "stay-edition": { text: "Marriott Stay Longer on Us Flexible Member rate, all taxes included. Confirm the current free-cancellation date when you book.", urgency: "early" },
    "stay-domes": { text: "Dec 29 is a peak holiday night at $1,371. The booking page did not show a tax or cancellation breakdown. Book early.", urgency: "early" },
    "stay-glass": { text: "Last cottage left when checked. Once booked, free cancellation ends Nov 30, 2026.", urgency: "deadline" },
    "stay-retreat": { text: "Lava View Junior Suite, about 8 left when checked. Holiday suite nights book up. Book early.", urgency: "early" },
    "ice-plan": { text: "Ice caves sell out around the holidays. Book early.", urgency: "early" },
    lava_tunnel: { text: "The 9:00 AM tour is a fixed stop on Dec 29. Book the morning slot early.", urgency: "asap" },
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
  var ROUTES_URL = "maps/routes.geojson?v=20261119-site1";
  var PREVIEW_PLACES = ["kef", "reykjabod", "selfoss", "domes", "kerid", "glass_cottages", "edition", "retreat"];
  var PREVIEW_ROUTES = ["kef_reykjabod", "reykjabod_selfoss", "selfoss_domes", "domes_kerid", "kerid_glass", "glass_edition", "edition_retreat"];
  /* Carto dark_all and Voyager now return an "API KEY REQUIRED" watermark
     without a key, so this uses OSM tiles (no key) plus a CSS filter for a dark look. */
  var TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  var TILE_ATTR = "&copy; OpenStreetMap";

  /* Road-snapped coordinates from maps/routes.geojson leg endpoints (OSRM),
     used for Apple Maps driving links so pins sit on the road. */
  var APPLE_COORDS = {
    kef: { lat: 63.99582, lon: -22.608041 },
    sandholt: { lat: 64.145937, lon: -21.92907 },
    lava_tunnel: { lat: 63.939513, lon: -21.396578 },
    reykjabod: { lat: 64.021341, lon: -21.211008 },
    selfoss: { lat: 63.937221, lon: -21.004327 },
    mjolkurbuid: { lat: 63.937221, lon: -21.004327 },
    froken: { lat: 63.936648, lon: -21.003396 },
    kerid: { lat: 64.041693, lon: -20.886757 },
    domes: { lat: 64.027869, lon: -20.930683 },
    glass_cottages: { lat: 63.833974, lon: -20.390923 },
    midgard: { lat: 63.745931, lon: -20.228226 },
    edition: { lat: 64.150176, lon: -21.940045 },
    retreat: { lat: 63.881341, lon: -22.452174 }
  };

  /* The full trip route ends at the Retreat. Jan 4 has its own drive back to KEF.
     Do not loop KEF to KEF; Apple Maps collapses that to a single pin. */
  var APPLE_ROUTES = {
    full: {
      keys: ["kef", "reykjabod", "selfoss", "domes", "kerid", "glass_cottages", "edition", "retreat"],
      label: "Open route in Apple Maps (KEF to Blue Lagoon)"
    },
    dec29: {
      keys: ["kef", "reykjabod", "selfoss", "domes"],
      label: "Drive in Apple Maps"
    },
    dec30: { keys: ["domes", "kerid", "glass_cottages"], label: "Drive in Apple Maps" },
    dec31: { keys: ["glass_cottages", "edition"], label: "Drive in Apple Maps" },
    jan3: { keys: ["edition", "retreat"], label: "Drive in Apple Maps" },
    jan4: { keys: ["retreat", "kef"], label: "Drive in Apple Maps" }
  };

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
    TILE_ATTR: TILE_ATTR,
    APPLE_COORDS: APPLE_COORDS,
    APPLE_ROUTES: APPLE_ROUTES
  };
})();
