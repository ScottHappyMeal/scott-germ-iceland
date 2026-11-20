/* Scott & Jerm's Iceland: a full-screen winter guide you page through like a book.
   Pages, navigation, map, weather, countdown, photo viewer. Page-turn motion lives in js/motion-fx.js. */
(function () {
  "use strict";

  var D = window.ICELAND_DATA || {};
  var T = window.ICELAND_TRIP || {};
  var PHOTO_URLS = D.PHOTO_URLS || {};
  var PHOTO_LABELS = D.PHOTO_LABELS || {};

  var PLAN_TOTAL = 15379;

  /* ---------- galleries: every photo is a real, self-hosted photo of that exact place ---------- */
  var GALLERIES = {
    flight: ["icelandair", "saga_seat"],
    flight_home: ["keflavik_terminal"],
    car: ["car_duster", "car_duster_gravel"],
    car_return: ["car_duster_return"],
    reykjabod: ["reykjabod", "reykjabod_lagoon", "reykjabod_evening", "reykjabod_corridor"],
    mjolkurbuid: ["mjolkurbuid", "mjolkurbuid_bar", "mjolkurbuid_hall", "mjolkurbuid_counter", "mjolkurbuid_coffee"],
    heathland: ["heathland", "heathland_int", "heathland_tub", "heathland_sauna", "heathland_moor"],
    froken: ["froken", "froken_booth", "froken_seafood", "froken_platters"],
    kerid: ["kerid", "kerid_water", "kerid_parking"],
    glass: ["glass_cottages", "glass_cottages_bedroom", "glass_cottages_living", "glass_cottages_stars"],
    midgard: ["midgard", "midgard_pasta", "midgard_view", "midgard_bar"],
    spa_restaurant: ["spa_restaurant", "spa_restaurant_table", "spa_restaurant_plate", "spa_restaurant_sushi"],
    edition: ["edition_ext", "edition_harbor_king", "edition_room", "edition_suite", "edition_spa"],
    nye: ["nye_fireworks", "ruv"],
    nye_dinner: ["nye_dinner"],
    tides: ["tides", "edition_int"],
    cheap_eats: ["sandholt"],
    casual_jan2: ["baejarins_street"],
    retreat_massage: ["retreat_massage"],
    reykjavik: ["laugavegur", "wool", "kolaportid"],
    golden: ["gullfoss", "silfra", "fridheimar", "ishestar", "ishestar_winter"],
    seljalandsfoss: ["seljalandsfoss", "seljalandsfoss_behind"],
    skogafoss: ["skogafoss", "skogafoss_wide"],
    skogafoss_lunch: ["skogafoss_below"],
    retreat: ["retreat_suite", "retreat_room_view"],
    retreat_checkout: ["retreat_evening"]
  };

  function full(key) { return PHOTO_URLS[key] || ""; }
  function thumb(key) { var u = PHOTO_URLS[key] || ""; return u.replace(/^images\//, "images/thumbs/"); }
  function label(key) { return PHOTO_LABELS[key] || ""; }

  /* ---------- the plan: flights, car, stays (verified cash totals for two) ---------- */
  var ITEMS = {
    flight: {
      title: "Icelandair, Saga Premium", status: "Not booked", gallery: "flight",
      price: "$6,062",
      sub: "Google Flights cash total for 2 adults, FI670 and FI671, Dec 28 to Jan 4. Includes 1 checked bag each (32 kg / 70 lb), meals, priority.",
      desc: "Out: FI670, Dec 28. Denver 3:40 PM MT to Keflavik 6:05 AM Dec 29. 7 hr 25 min, nonstop. Back: FI671, Jan 4. Keflavik 4:55 PM to Denver 6:00 PM MT. 8 hr 5 min.",
      url: "https://www.icelandair.com/flights/from-denver-to-reykjavik/", urlLabel: "Icelandair", place: "kef"
    },
    car: {
      title: "Dacia Duster 4x4, six days", status: "Not booked", gallery: "car",
      price: "$719",
      sub: "Blue Car Rental, Dec 29 to Jan 4, cash total. Return after 8:00 AM Jan 4 bills a 7th day, about $41 more (live quote).",
      desc: "4WD SUV for winter roads. Pickup at Keflavik after the 6:05 AM landing. Drop-off at Keflavik before the 4:55 PM flight on Jan 4.",
      url: "https://www.bluecarrental.is/", urlLabel: "Blue Car Rental"
    },
    "stay-heathland": {
      title: "Heathland Lodge", nights: "Dec 29, one night", status: "Not booked", gallery: "heathland",
      price: "$720",
      sub: "Cash rate, Dec 29, about $720 total for 2. Free cancellation until Nov 29, 2026.",
      desc: "Private mirror-glass cabin, Minni-Borg. Queen bed, private sauna and hot tub, kitchenette. 9.5 on Booking.com. Check-in 3:00 PM to midnight; send arrival time in advance. Check-out by 11:00 AM. Last 1.3 km is a slow track, hard to find in the dark. Arrive in daylight, before dinner.",
      url: "https://www.booking.com/hotel/is/luxurious-mirror-cabin-with-sauna-amp-jacuzzi.html", urlLabel: "Heathland Lodge", place: "heathland"
    },
    "stay-glass": {
      title: "Glass Cottages, Cottage Blar", nights: "Dec 30, one night", status: "Book soon", gallery: "glass",
      price: "$559",
      sub: "Live cash rate, Dec 30. Last cottage left when checked. Free cancellation until Nov 30, 2026, once booked.",
      desc: "Near Hella, about 5 min from town. 1 double bed, glass wall, private hot tub. No restaurant or breakfast on site. Kitchen stocked with coffee, tea, and oil only.",
      winter: "Open lava-field site. Expect wind and ice at the hot tub.",
      url: "https://glasscottages.com/", urlLabel: "Glass Cottages", place: "glass_cottages"
    },
    "stay-edition": {
      title: "The Reykjavik EDITION, Deluxe King, Scenic view", nights: "Dec 31 to Jan 3, three nights", status: "Not booked", gallery: "edition",
      price: "$4,835",
      sub: "Stay Longer on Us Member rate, Dec 31 to Jan 3, taxes and fees included. Free cancellation through Dec 1, 2026.",
      desc: "Deluxe King, 1 king bed, Scenic view. Check-in Dec 31, check-out Jan 3. Harbor hotel next to Harpa. Spa, rooftop bar. 7,000 ISK daily credit at Tides, the hotel restaurant.",
      url: "https://www.marriott.com/en-us/hotels/reyek-the-reykjavik-edition/", urlLabel: "The Reykjavik EDITION", place: "edition"
    },
    "stay-retreat": {
      title: "The Retreat at Blue Lagoon, Lava View Junior Suite", nights: "Jan 3, one night", status: "Not booked", gallery: "retreat",
      price: "est. $2,484",
      sub: "About 310,000 ISK for Jan 3, estimate. 8 suites left when checked.",
      desc: "1 night, Lava View Junior Suite. Includes the private Retreat Lagoon. Jan 4: about 22.5 km, 24 min, approx, to Keflavik for the 4:55 PM flight.",
      winter: "Silica water: use conditioner, keep hair out of the water. Water about 98 to 104 F year-round.",
      url: "https://www.bluelagoon.com/retreat", urlLabel: "The Retreat", place: "retreat"
    },

    /* stops along the way */
    reykjabod: {
      title: "Reykjabod Hot Springs, Hveragerdi", status: "Planned soak", gallery: "reykjabod",
      price: "Classic 17,800 ISK (about $142) for 2",
      sub: "Signature: 33,800 ISK (about $270) for 2. Not in the trip total.",
      desc: "Opened September 2026. Mountain-valley soak on the Dec 29 drive, before Selfoss groceries and Heathland Lodge. Classic: lagoon, outdoor sauna, cold plunge, Kneipp, towel. Signature adds the adults-only indoor Bathhouse Spa (10 sensory rooms), robe, slippers, 1 drink each.",
      winter: "Winter hours: Mon to Thu 10:00 AM to 9:00 PM, Fri to Sun 10:00 AM to 10:00 PM. Out of the water 30 min before close. Dec 29 is a Tuesday: opens 10:00 AM.",
      url: "https://reykjabod.is/", urlLabel: "Reykjabod", place: "reykjabod"
    },
    mjolkurbuid: {
      title: "Groceries in Selfoss", status: "Planned stop", gallery: "mjolkurbuid",
      price: "About $60 to $100 for the week",
      sub: "Cottage breakfasts, road snacks, quiet Jan 1. Not in the $15,379 trip total.",
      desc: "Grocery stop in the new town center by the Old Dairy (Mjolkurbuid), about 30 min from Heathland Lodge. Bonus usually runs a bit lower than Kronan. Buy 2 breakfasts (Heathland and Glass Cottages serve no food) and road snacks.",
      winter: "Shop Dec 29, then Reykjavik Dec 31 before about 4:00 PM (Kronan closes 4:00 PM on New Year's Eve). Most Bonus and Kronan stores closed Jan 1. Hagkaup Skeifan listed as open from 12:00 PM Jan 1.",
      url: "https://mjolkurbuid.is/en", urlLabel: "Mjolkurbuid", place: "selfoss"
    },
    froken: {
      title: "Dinner at Froken Selfoss", status: "Reserve ahead", gallery: "froken",
      price: "About $160 to $225 for 2, with drinks",
      sub: "Not in the trip total.",
      desc: "Downtown Selfoss, about 30 min from Heathland Lodge. Modern Icelandic. Open 12:00 PM to 10:00 PM daily; kitchen closes 9:30 PM. Open Tuesday (Tryggvaskali is closed Mon and Tue).",
      url: "https://www.frokenselfoss.is/en", urlLabel: "Froken Selfoss", place: "froken"
    },
    kerid: {
      title: "Kerid crater", status: "Planned stop", gallery: "kerid",
      price: "Small entry fee, paid on site",
      desc: "Red volcanic crater with a lake at the bottom. About 15 min from Heathland Lodge; first stop on the Dec 30 drive south. Winter hours about 9:00 AM to 5:00 PM.",
      winter: "Rim paths can be icy. Visit late morning as the light comes up, then on to the waterfalls by midday.",
      url: "https://www.keridcratericeland.is/en/visiting-hours", urlLabel: "Kerid", place: "kerid"
    },
    midgard: {
      title: "Dinner at Midgard Restaurant, Hvolsvollur", status: "Reserve ahead", gallery: "midgard",
      price: "26,000 ISK (about $208) for 2",
      sub: "Glass Cottages 3-course partner offer, before drinks. Not in the trip total.",
      desc: "Dec 30, after Skogafoss, about 13 min from Glass Cottages. Open 4:00 PM to 9:00 PM daily. From-scratch Icelandic food, small dining room. Reserve ahead.",
      url: "https://midgardbasecamp.is/midgard-base-camp-restaurant/", urlLabel: "Midgard", place: "midgard"
    },
    spa_restaurant: {
      title: "Dinner at Spa Restaurant, The Retreat", status: "Optional", gallery: "spa_restaurant",
      price: "About $146 to $178 for 2, without drinks",
      sub: "Two mains and two desserts, from the official menu. Not in the trip total.",
      desc: "Inside the Retreat Spa, included with the stay. Light a la carte dishes. Robe or street clothes. No reservation needed. Main menu 12:00 PM to 8:00 PM daily, including Jan 3 (official site).",
      winter: "Conflicting hours: a Blue Lagoon support page (updated Sep 12, 2025) lists a 7:00 PM kitchen close Wed to Sun; current official hours say 8:00 PM daily. Go a little early.",
      url: "https://www.bluelagoon.com/accommodation/in-room/restaurants/spa-restaurant", urlLabel: "Spa Restaurant", place: "retreat"
    },
    retreat_massage: {
      title: "Retreat Spa in-water massage", status: "Chosen extra", gallery: "retreat_massage",
      price: "About $463 for 2",
      sub: "2 x 60-min in-water massage, about 28,900 ISK each. Chosen extra, not in the $15,379 trip total. Not booked.",
      desc: "60-min massage in the lagoon water at The Retreat Spa. Not in the room rate. Typically limited to hotel guests or spa reservations.",
      winter: "Book together with the Retreat stay. Lagoon water about 98 to 104 F year-round.",
      url: "https://www.bluelagoon.com/experiences/in-water-massage", urlLabel: "In-water massage", place: "retreat"
    },
    nye_dinner: {
      title: "New Year's Eve dinner in Reykjavik", status: "Walk-in options", gallery: "nye_dinner",
      price: "About $60 to $150 for 2",
      sub: "Casual a la carte. Not in the $15,379 trip total. Not booked.",
      desc: "Burgers, pizza, or Icelandic comfort food. A la carte only, no set menus.",
      winter: "Bonfires: usually lit around 8:30 PM (8:30 PM in 2025). 2026 sites not posted yet; the city decides on the day if wind is over 10 m/s. Kitchens: most close 9:00 PM to 10:00 PM, so eat early for the bonfires. Aramotaskaup: streets quiet about 10:30 PM to 11:35 PM. Fireworks: from about 11:30 PM, peak at midnight. Viewpoints: Hallgrimskirkja, the hillside around Perlan, or the harbor by the hotel."
    },
    skogafoss_lunch: {
      title: "Lunch at Skogafoss", status: "Planned stop", gallery: "skogafoss_lunch",
      price: "About $15 to $55 for 2",
      sub: "Soup at Hotel Skogafoss or a quick stop nearby. Not in the $15,379 trip total.",
      desc: "Lunch near Skogafoss, then back west to Midgard for dinner. No need to continue to Vik. Hotel Skogafoss Bistro, beside the falls: 12:00 PM to 9:00 PM. Leek and potato soup 2,750 ISK (about $22). Icelandic meat soup 3,250 ISK (about $26).",
      winter: "Holiday hours can change; check the door on the day. Midgard dinner is around 4:00 PM, so keep lunch light.",
      url: "https://www.hotelskogafoss.is/restaurant/", urlLabel: "Hotel Skogafoss", place: "hotel_skogafoss"
    },
    tides: {
      title: "Tides lunch, Jan 2, on the room credit", status: "Included", gallery: "tides",
      price: "7,000 ISK a day, about $56",
      sub: "Included in the EDITION rate for Dec 31, Jan 1, and Jan 2. No rollover. Not valid on checkout day (Jan 3) or for breakfast.",
      desc: "One lunch at Tides, the hotel restaurant, on Jan 2, using the daily credit.",
      winter: "Over 7,000 ISK: pay the difference.",
      url: "https://www.editionhotels.com/reykjavik/restaurants-and-bars/tides/", urlLabel: "Tides", place: "edition"
    },
    cheap_eats: {
      title: "Casual eats in Reykjavik", status: "Planned stop", gallery: "cheap_eats",
      price: "About $15 to $50 for 2",
      sub: "Soup, bakery, or groceries. For Jan 1 and Jan 2 dinners, and breakfasts without the hotel. Not in the $15,379 trip total.",
      desc: "Simple, casual options for the remaining Reykjavik dinners and breakfasts.",
      winter: "Many places close or cut hours on Jan 1. Groceries: shop Dec 31 before about 4:00 PM. Most Bonus and Kronan stores closed Jan 1; Hagkaup Skeifan listed as open from 12:00 PM. Confirm bakery hours before walking over."
    },
    nye: {
      title: "New Year's Eve in Reykjavik", status: "Free", gallery: "nye",
      desc: "Order of the night: dinner, neighborhood bonfire, citywide fireworks at midnight. Viewpoints: Hallgrimskirkja steps, the hillside around Perlan, or the harbor by the hotel (closest).",
      winter: "Bonfires usually lit around 8:30 PM; 2026 sites posted late December. Streets quiet about 10:30 PM to 11:35 PM for Aramotaskaup. Fireworks from about 11:30 PM, peak at midnight. Dress for standing still in wind. Pick a viewpoint within walking or taxi distance of the EDITION.",
      url: "https://visitreykjavik.is/festivals-and-events-reykjavik", urlLabel: "Visit Reykjavik", place: "hallgrimskirkja"
    },
    reykjavik: {
      title: "Reykjavik: harbor, Harpa, Laugavegur", status: "Free", gallery: "reykjavik",
      desc: "Old Harbour and Harpa next door. Laugavegur and the Hafnartorg shops. Grotta lighthouse after dark for northern lights. Kolaportid flea market usually runs weekends.",
      winter: "Many shops and restaurants close or cut hours on New Year's Day. Slushy sidewalks: wear shoes with grip. Dinner: soup, bakery, or groceries.",
      url: "https://visitreykjavik.is/", urlLabel: "Visit Reykjavik", place: "laugavegur"
    },
    golden: {
      title: "Golden Circle drive, roads permitting", status: "Optional", gallery: "golden",
      desc: "Thingvellir, Geysir, Gullfoss. Loop about 282 km, 4 hrs 41 min driving, approx, before stops. On the route: Fridheimar tomato greenhouse lunch, Silfra dry-suit snorkel.",
      winter: "Watch Mosfellsheidi and Lyngdalsheidi in high wind. Confirm Fridheimar New Year's Day hours.",
      url: "https://www.visiticeland.com/article/the-golden-circle/", urlLabel: "Golden Circle", place: "gullfoss"
    },
    seljalandsfoss: {
      title: "Seljalandsfoss", status: "Planned stop", gallery: "seljalandsfoss",
      desc: "Waterfall with a path behind it (when open). Dec 30, south from Kerid. Parking at the falls. Next: Skogafoss, about 29 min.",
      winter: "Path behind the falls often icy or closed in winter. Dec 30: sun 11:21 AM to 3:39 PM, civil twilight until 4:57 PM. Visit midday.",
      url: "https://www.south.is/en/place/seljalandsfoss-waterfall", urlLabel: "Seljalandsfoss", place: "seljalandsfoss"
    },
    skogafoss: {
      title: "Skogafoss", status: "Planned stop", gallery: "skogafoss",
      desc: "Wide, powerful waterfall, about 29 min east of Seljalandsfoss. Parking at Fossbud, beside the falls. Next: Midgard Restaurant, about 44 min west.",
      winter: "Spray freezes on the path and parking lot. Wear shoes with grip.",
      url: "https://www.south.is/en/place/skogafoss-waterfall", urlLabel: "Skogafoss", place: "skogafoss"
    },
  };

  var DAYS = [
    {
      id: "dec28", num: 1, date: "Dec 28", weekday: "Monday", cover: "denver_airport",
      title: "Overnight flight, Denver to Keflavik",
      note: "No driving in Iceland. FI670 departs Denver 3:40 PM MT. Overnight on the plane.",
      times: [{ when: "3:40 PM MT", what: "FI670 departs Denver. 7 hr 25 min, nonstop." }],
      stops: ["flight"]
    },
    {
      id: "dec29", num: 2, date: "Dec 29", weekday: "Tuesday", cover: "reykjavik_aerial",
      title: "Land at Keflavik, pick up the car",
      note: "FI670 lands 6:05 AM. Pick up the 4WD. Breakfast on the road: bakery or gas station. Reykjabod opens 10:00 AM. Heathland Lodge check-in 3:00 PM to midnight; send arrival time in advance. Last 1.3 km is a slow track, hard to find in the dark. Arrive in daylight, before dinner. Daylight about 11:20 AM to 3:30 PM.",
      times: [
        { when: "6:05 AM", what: "Land at Keflavik. Pick up the 4WD SUV." },
        { when: "Morning", what: "Breakfast on the way south: bakery or gas station." },
        { when: "After 10:00 AM", what: "Reykjabod Hot Springs, Hveragerdi." },
        { when: "Afternoon", what: "Groceries in Selfoss for the cabin kitchen." },
        { when: "3:00 PM", what: "Heathland Lodge check-in. Arrival time sent in advance." },
        { when: "Evening", what: "Dinner, Froken Selfoss. About 30 min from the lodge." }
      ],
      stops: ["car", "reykjabod", "mjolkurbuid", "stay-heathland", "tip:kitchens", "froken"]
    },
    {
      id: "dec30", num: 3, date: "Dec 30", weekday: "Wednesday", cover: "seljalandsfoss_wide",
      title: "Kerid, two waterfalls, Glass Cottages Blar",
      note: "Leave at checkout. Seljalandsfoss and Skogafoss in midday light; Midgard at its 4:00 PM opening, in twilight. Sun 11:21 AM to 3:39 PM, civil twilight until 4:57 PM. Drive: 186.5 km, 2 hr 59 min, approx. Midgard before the cottages saves about 12 km of backtracking.",
      times: [
        { when: "Morning", what: "Breakfast in the cabin. Check out by 11:00 AM." },
        { when: "Late morning", what: "Kerid crater, about 15 min from the lodge, on the way south." },
        { when: "Midday", what: "Seljalandsfoss, then Skogafoss. Lunch by the falls." },
        { when: "Around 4:00 PM", what: "Dinner, Midgard Restaurant, Hvolsvollur. Opens 4:00 PM." },
        { when: "Evening", what: "Glass Cottages, Cottage Blar check-in. About 13 min from Midgard." }
      ],
      stops: ["tip:roads", "kerid", "seljalandsfoss", "skogafoss", "skogafoss_lunch", "midgard", "stay-glass"]
    },
    {
      id: "dec31", num: 4, date: "Dec 31", weekday: "Thursday", cover: "nye_hallgrimskirkja",
      title: "Drive to Reykjavik, New Year's Eve",
      note: "Glass Cottages to The Reykjavik EDITION: about 96 km, 1 hr 30 min, approx. Downtown busy; park after check-in and leave the car. Bonfires usually around 8:30 PM. Fireworks at midnight.",
      times: [
        { when: "Daytime", what: "Drive to Reykjavik. Check in at The Reykjavik EDITION." },
        { when: "Midday", what: "Lunch downtown after check-in." },
        { when: "Evening", what: "New Year's Eve dinner, then a neighborhood bonfire." },
        { when: "10:30 PM", what: "Aramotaskaup, national TV comedy special, usually on RUV." },
        { when: "Midnight", what: "Citywide fireworks." }
      ],
      stops: ["stay-edition", "nye_dinner", "nye", "tip:nye"]
    },
    {
      id: "jan1", num: 5, date: "Jan 1", weekday: "Friday", cover: "harpa",
      title: "New Year's Day, Reykjavik, slow day",
      note: "Harbor and Laugavegur on foot, or a Golden Circle drive if roads are clear. Daylight about 11:20 AM to 3:30 PM.",
      times: [
        { when: "Late morning", what: "Sleep in. Breakfast: bakery, groceries, or the hotel." },
        { when: "Midday", what: "Casual lunch downtown. Harbor walk and Harpa." },
        { when: "Evening", what: "Casual dinner. Grotta after dark if the sky is clear." }
      ],
      stops: ["cheap_eats", "reykjavik", "golden"]
    },
    {
      id: "jan2", num: 6, date: "Jan 2", weekday: "Saturday", cover: "old_harbour",
      title: "Reykjavik, slow day",
      note: "Sleep in at the EDITION. Lunch at Tides on the 7,000 ISK daily credit. Walk Harpa, the Old Harbour, and Laugavegur, or take a short drive. Kolaportid flea market usually runs weekends; confirm holiday hours.",
      times: [
        { when: "Late morning", what: "Sleep in." },
        { when: "Midday", what: "Lunch at Tides, 7,000 ISK daily credit." },
        { when: "Afternoon", what: "Walk Harpa, the Old Harbour, and Laugavegur." },
        { when: "Evening", what: "Casual dinner. Quiet night in." }
      ],
      stops: ["tides", "cheap_eats"],
      galleryFor: { cheap_eats: "casual_jan2" }
    },
    {
      id: "jan3", num: 7, date: "Jan 3", weekday: "Sunday", cover: "retreat_hero",
      title: "The Retreat at Blue Lagoon",
      note: "The EDITION to The Retreat: about 51 km, 51 min, approx. Last night: Lava View Junior Suite, steps from the Retreat Lagoon. Chosen extra: in-water massage at the Retreat Spa, about $463 for 2. Not booked.",
      times: [
        { when: "Late morning", what: "Check out of The Reykjavik EDITION." },
        { when: "Afternoon", what: "Drive to The Retreat at Blue Lagoon. Check in, 1 night." },
        { when: "Afternoon or evening", what: "In-water massage at the Retreat Spa, for 2 (chosen extra)." },
        { when: "Evening", what: "Dinner, Spa Restaurant in the Retreat Spa. Soak in the Retreat Lagoon." }
      ],
      stops: ["stay-retreat", "tip:lagoons", "retreat_massage", "spa_restaurant"]
    },
    {
      id: "jan4", num: 8, date: "Jan 4", weekday: "Monday", cover: "retreat_lagoon",
      title: "Check out, return the car, fly home",
      note: "The Retreat to Keflavik: about 22.5 km, 24 min, approx. FI671 departs 4:55 PM, lands Denver 6:00 PM MT. 8 hr 5 min, nonstop. Car return after 8:00 AM bills a 7th rental day.",
      times: [
        { when: "Morning", what: "Last soak. Check out." },
        { when: "Afternoon", what: "Drive to Keflavik. Return the car." },
        { when: "4:55 PM", what: "FI671 to Denver, landing 6:00 PM MT." }
      ],
      stops: ["stay-retreat", "car", "flight"],
      galleryFor: { "stay-retreat": "retreat_checkout", car: "car_return", flight: "flight_home" }
    }
  ];

  var STAY_IDS = ["stay-heathland", "stay-glass", "stay-edition", "stay-retreat"];

  var TIPS = [
    { tag: "New Year's Eve", photo: "bonfire", title: "Neighborhood bonfires", text: "Dec 31, evening, before the fireworks. The city posts sites each year. Pick one within walking or taxi distance of the EDITION. Dress for standing still in wind." },
    { tag: "New Year's Eve", photo: "nye_hallgrimskirkja", title: "Midnight fireworks", text: "Set off by residents across the city; no single official show. Viewpoints: Hallgrimskirkja steps, the hillside around Perlan. Closest to the hotel: the harbor." },
    { tag: "New Year's Eve", photo: "ruv", title: "10:30 PM: Aramotaskaup", text: "National TV comedy special, usually 10:30 PM on RUV. Streets go quiet while it airs. Confirm the 2026 time when RUV posts it. English not guaranteed." },
    { tag: "Wind and ice", photo: "kerid", title: "Roads, before every drive", text: "Typical: -3 to 3 C, wind, snow, ice. Check umferdin.is (roads) and safetravel.is (alerts). Reykjanesbraut and Hellisheidi ice over first. In wind, hold car doors with both hands." },
    { tag: "Wind and ice", photo: "skogafoss", title: "Sneaker waves and ice", text: "Reynisfjara, South Coast: stay well up the beach; never turn away from the water. Parking lots and waterfall spray freeze. Wear shoes with grip." },
    { tag: "Kitchens", photo: "heathland_kitchen", title: "No breakfast at either cottage", text: "Heathland Lodge: kitchenette, private sauna and hot tub. Glass Cottages: coffee, tea, and oil only. One grocery run in Selfoss on Dec 29 covers both mornings." },
    { tag: "Daylight", photo: "aurora_self", title: "Daylight and northern lights", text: "Sunrise about 11:20 AM, sunset about 3:30 PM. Drive in twilight; save outdoor stops for midday. Clear nights: check the vedur.is cloud map for northern lights. Grotta is about 10 min from downtown." },
    { tag: "Lagoons", photo: "retreat_lagoon", title: "Silica and closing times", text: "Blue Lagoon and The Retreat: use conditioner, keep hair out of the water. Out of every lagoon 30 min before close." }
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
    if (s === "Free" || s === "Planned stop" || s === "Planned soak" || s === "Chosen extra" || s === "Included") return "is-free";
    return "is-plan";
  }


  /* ---------- small pieces ---------- */
  function imgTag(key, opts) {
    opts = opts || {};
    var src = opts.thumb ? thumb(key) : full(key);
    if (!src) return "";
    return '<img data-src="' + esc(src) + '" alt="' + esc(opts.alt != null ? opts.alt : label(key)) + '" decoding="async">';
  }
  function fine(text, cls) { return text ? '<p class="fine' + (cls ? " " + cls : "") + '">' + esc(text) + "</p>" : ""; }
  function priceNote(it) {
    if (!it.price && !it.sub) return "";
    return '<p class="price-note rv"><span class="pn-label">Cost</span>' + (it.price ? esc(it.price) + ". " : "") + (it.sub ? esc(it.sub) : "") + "</p>";
  }
  function yearFor(dayId) { return dayId.indexOf("dec") === 0 ? "2026" : "2027"; }

  /* photo panel: one big photo, with small thumbnails for the rest of the gallery */
  function mediaPhotos(gKey, coverKey) {
    var photos = GALLERIES[gKey] || [];
    var lead = coverKey || photos[0];
    var leadIndex = Math.max(0, photos.indexOf(lead));
    var html = '<button type="button" class="media-hit" data-gallery="' + esc(gKey) + '" data-index="' + leadIndex + '" aria-label="Open photos: ' + esc(label(lead)) + '">' + imgTag(lead) + "</button>";
    if (photos.length > 1) {
      html += '<div class="thumbs" aria-label="More photos">' + photos.map(function (k, i) {
        return '<button type="button" class="thumb' + (i === leadIndex ? " is-lead" : "") + '" data-gallery="' + esc(gKey) + '" data-index="' + i + '" aria-label="Photo ' + (i + 1) + ": " + esc(label(k)) + '">' + imgTag(k, { thumb: true, alt: "" }) + "</button>";
      }).join("") + '<span class="thumbs-count">' + photos.length + " photos</span></div>";
    }
    return html;
  }

  function linksHtml(it) {
    var out = [];
    if (it.url) out.push(siteHtml(it.url, it.urlLabel));
    if (it.place) out.push(applePinHtml(it.place));
    return out.length ? '<div class="links rv">' + out.join("") + "</div>" : "";
  }

  /* ---------- page builders ---------- */
  var PAGES = [];
  function addPage(p) { PAGES.push(p); return p; }

  function coverPage() {
    addPage({
      id: "cover", label: "Cover", chapter: "Dec 28 to Jan 4", layout: "full", cls: "page-cover",
      media: '<div class="media-img">' + '<img data-src="images/hero-aurora.jpg" alt="" decoding="async" fetchpriority="high">' + "</div>",
      text:
        '<p class="eyebrow rv">Dec 28, 2026 to Jan 4, 2027</p>' +
        '<h1 class="rv">Scott &amp; Jerm\'s<br>Iceland</h1>' +
        '<p class="lede rv">Hot springs, Golden Circle and South Coast, New Year\'s Eve in Reykjavik, a last night at the Blue Lagoon. About 4 hours of daylight a day.</p>' +
        '<p class="facts rv"><<span class="warn">Nothing booked yet.</span> Cash rates. Full totals for 2 adults. 1 king or double bed everywhere.</p>' +
        '<div class="live rv">' +
          '<div class="live-row"><p class="live-label">Until FI670 leaves Denver, 3:40 PM MT, Dec 28</p>' +
            '<p class="count" id="countdown"><span><b data-k="d">0</b> days</span> <span><b data-k="h">0</b> hrs</span> <span><b data-k="m">0</b> min</span> <span><b data-k="s">0</b> sec</span></p></div>' +
          '<div class="live-row" id="weather"><p class="live-label">Right now in Reykjavik</p>' +
            '<p class="wx"><b id="wxTemp">--</b> <span id="wxWind">Loading the live weather</span></p>' +
            '<p class="wx-sub" id="wxSub">Sunrise and sunset for today, from Open-Meteo.</p></div>' +
        "</div>" +
        '<button type="button" class="begin rv" data-turn="next">Turn the page ' + icon("right") + "</button>" +
        '<p class="hint rv">Swipe or use arrow keys.</p>'
    });
  }

  function weekPage() {
    var rows = DAYS.map(function (d) {
      return '<li><button type="button" data-go="day-' + d.id + '"><span class="wk-num">' + (d.num < 10 ? "0" : "") + d.num + "</span>" +
        '<span class="wk-date">' + esc(d.weekday.slice(0, 3)) + ", " + esc(d.date) + "</span>" +
        '<span class="wk-title">' + esc(d.title) + "</span></button></li>";
    }).join("");
    addPage({
      id: "week", label: "The week", chapter: "The week", layout: "split",
      media: '<div class="media-img">' + imgTag("grotta") + "</div>",
      text:
        '<p class="eyebrow rv">The week</p>' +
        '<h2 class="rv">8 days, Dec 28 to Jan 4.</h2>' +
        '<ol class="week rv">' + rows + "</ol>" +
        '<p class="soon rv"><span class="soon-label">Book soon</span> Glass Cottages, Cottage Blar, Dec 30. Last cottage left when checked. Free cancellation until Nov 30, 2026, once booked.</p>'
    });
  }

  function daylightPage() {
    addPage({
      id: "daylight", label: "Winter daylight", chapter: "Winter daylight", layout: "wide", cls: "page-sky",
      media: '<div class="sky" aria-hidden="true"><i class="sun"></i></div>',
      text:
        '<p class="eyebrow rv">Winter daylight</p>' +
        '<h2 class="rv">Sun up about 11:20 AM to 3:30 PM.</h2>' +
        '<p class="lede rv">Reykjavik daylight by trip day, computed for these dates (not a forecast). Gold: sun. Blue: civil twilight, light enough to drive and walk.</p>' +
        '<div class="daylight rv" id="daylightChart">' + daylightHtml() + "</div>"
    });
  }

  function fmtMin(m) {
    var h = Math.floor(m / 60), mm = m % 60, ap = h < 12 ? "AM" : "PM", h12 = h % 12 || 12;
    return h12 + ":" + (mm < 10 ? "0" : "") + mm + " " + ap;
  }
  function daylightHtml() {
    if (!T.DAYLIGHT) return "";
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
        '<span class="dl-day">' + esc(day.date) + "</span>" +
        '<span class="dl-track">' +
        '<i class="dl-twilight" style="left:' + pct(d.civilDawn) + "%;width:" + (pct(d.civilDusk) - pct(d.civilDawn)) + '%"></i>' +
        '<i class="dl-sun" style="left:' + pct(d.riseMin) + "%;width:" + (pct(d.setMin) - pct(d.riseMin)) + '%"></i>' +
        "</span>" +
        '<span class="dl-times">' + esc(d.rise) + " to " + esc(d.set) + "</span></div>";
    });
    return axis + '<div class="dl-rows">' + rows + "</div>" +
      '<p class="fine">Sunrise and sunset use the usual solar altitude of -0.833 degrees. Twilight is civil twilight, about 10:04 AM to 4:54 PM.</p>';
  }

  var MAP_DAYS = { dec29: true, dec30: true, dec31: true, jan3: true, jan4: true };

  function dayOpener(day) {
    var d = (T.DAYLIGHT || {})[day.id];
    var meta = (T.DAY_ROADS || {})[day.id] || {};
    var times = '<ol class="times rv">' + day.times.map(function (t) {
      return '<li><span class="t-when">' + esc(t.when) + '</span><span class="t-what">' + esc(t.what) + "</span></li>";
    }).join("") + "</ol>";
    var roads = "";
    if (meta.drive || meta.risk) {
      roads = '<div class="roads rv">' +
        (meta.drive ? "<p><span class=\"lbl\">Drive</span>" + esc(meta.drive) + "</p>" : "") +
        (meta.risk ? "<p><span class=\"lbl\">Watch for</span>" + esc(meta.risk) + "</p>" : "") +
        '<p class="road-links">' + (T.ROAD_LINKS || []).map(function (l) {
          return '<a class="link" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + icon("external") + " " + esc(l.label) + "</a>";
        }).join("") + "</p></div>";
    }
    var actions = "";
    var drive = appleRouteHtml(day.id, "btn-primary");
    if (drive) actions += drive;
    if (MAP_DAYS[day.id]) actions += '<button type="button" class="btn-text" data-focus-day="' + day.id + '">' + icon("pin") + " Show on the map</button>";
    addPage({
      id: "day-" + day.id, day: day.id, opener: true, label: "Day " + day.num + ", " + day.date, chapter: "Day " + day.num + " · " + day.date,
      layout: "full",
      media: '<div class="media-img">' + imgTag(day.cover) + "</div>",
      text:
        '<p class="eyebrow rv">Day ' + day.num + " &middot; " + esc(day.weekday) + ", " + esc(day.date) + ", " + yearFor(day.id) + "</p>" +
        '<h2 class="rv">' + esc(day.title) + "</h2>" +
        (d ? '<p class="sunline rv"><i class="sun-dot" aria-hidden="true"></i>Sunrise ' + esc(d.rise) + ", sunset " + esc(d.set) + "</p>" : "") +
        '<p class="lede rv">' + esc(day.note) + "</p>" + times + roads +
        (actions ? '<div class="actions rv">' + actions + "</div>" : "")
    });
  }

  function stopPage(day, id) {
    if (id.indexOf("tip:") === 0) { tipPage(day, id.slice(4)); return; }
    var it = ITEMS[id];
    if (!it) return;
    var todayNote = "";
    if (id === "flight" && day.id === "jan4") todayNote = '<p class="today rv">Today: FI671, Keflavik 4:55 PM to Denver 6:00 PM MT.</p>';
    if (id === "flight" && day.id === "dec28") todayNote = '<p class="today rv">Today: FI670, Denver 3:40 PM MT to Keflavik 6:05 AM Dec 29.</p>';
    if (id === "flight" && day.id === "dec29") todayNote = '<p class="today rv">Today: FI670 lands Keflavik 6:05 AM. Then pick up the 4WD.</p>';
    if (id === "car" && day.id === "jan4") todayNote = '<p class="today rv">Today: return the car at Keflavik before the 4:55 PM flight. Return after 8:00 AM bills a 7th day, about $41 more.</p>';
    if (id === "stay-retreat" && day.id === "jan4") todayNote = '<p class="today rv">Today: check out. Keflavik about 24 min; return the car there.</p>';
    var soon = it.status === "Book soon";
    var status = '<p class="eyebrow rv"><span class="' + (soon ? "warn" : "") + '">' + esc(it.status) + "</span>" + (it.nights ? " &middot; " + esc(it.nights) : "") + "</p>";
    addPage({
      id: "stop-" + day.id + "-" + id, day: day.id, label: it.title, chapter: "Day " + day.num + " · " + day.date,
      layout: "split",
      media: '<div class="media-img">' + mediaPhotos((day.galleryFor && day.galleryFor[id]) || it.gallery) + "</div>",
      text:
        status +
        '<h2 class="rv">' + esc(it.title) + "</h2>" +
        todayNote +
        (it.desc ? '<p class="lede rv">' + esc(it.desc) + "</p>" : "") +
        (it.winter ? '<p class="insider rv"><span class="lbl">Insider</span>' + esc(it.winter) + "</p>" : "") +
        (soon ? '<p class="soon rv"><span class="soon-label">Book soon</span> Last cottage left when checked. Free cancellation until Nov 30, 2026, once booked.</p>' : "") +
        linksHtml(it) +
        priceNote(it) +
        extraStopHtml(id) +
        editionRatesHtml(id)
    });
  }

  function applePinHref(placeKey) {
    var pt = placeKey && applePoint(placeKey);
    if (!pt) return "";
    return "https://maps.apple.com/?ll=" + pt.lat + "," + pt.lon + "&q=" + encodeURIComponent(pt.name);
  }
  function optionLinks(url, urlLabel, placeKey) {
    var out = [];
    if (url) out.push(siteHtml(url, urlLabel));
    if (placeKey) {
      var href = applePinHref(placeKey);
      if (href) out.push('<a class="link" href="' + esc(href) + '" target="_blank" rel="noopener">' + icon("pin") + " Apple Maps</a>");
    }
    return out.length ? '<div class="links">' + out.join("") + "</div>" : "";
  }
  function extraStopHtml(id) {
    if (id === "nye_dinner") return nyeDinnerHtml();
    if (id === "cheap_eats") return cheapEatsHtml();
    return "";
  }
  function cheapEatsHtml() {
    var opts = [
      {
        title: "Baejarins Beztu",
        text: "920 ISK, about $7.",
        url: "https://bbp.is/", urlLabel: "Baejarins Beztu", place: "baejarins"
      },
      {
        title: "101 Reykjavik Street Food",
        text: "Lamb soup 2,890 ISK, about $23 (October 2026 menu). Skolavordustigur, about 10 min walk.",
        url: "https://101reykjavikstreetfood.is/", urlLabel: "101 Reykjavik Street Food", place: "street_food"
      },
      {
        title: "Sandholt",
        text: "Toast 1,390 ISK, about $11. Sandwiches about 2,290 to 2,990 ISK, about $18 to $24. Laugavegur, about 10 min walk.",
        url: "https://sandholt.is/en/", urlLabel: "Sandholt", place: "sandholt"
      },
      {
        title: "Braud and Co",
        text: "Cinnamon bun 870 ISK, about $7. Croissant 810 ISK, about $6. Frakkastigur, about 12 min walk.",
        url: "https://www.braudogco.is/", urlLabel: "Braud and Co", place: "braud"
      }
    ];
    return '<ul class="booklist rv">' + opts.map(function (o) {
      return "<li><h3>" + esc(o.title) + "</h3><p class=\"fine\">" + esc(o.text) + "</p>" + optionLinks(o.url, o.urlLabel, o.place) + "</li>";
    }).join("") + "</ul>";
  }
  function nyeDinnerHtml() {
    return casualNyeHtml();
  }
  function casualNyeHtml() {
    var opts = [
      {
        title: "Kaffi Loki",
        text: "Traditional Icelandic, across from Hallgrimskirkja, about 16 min walk. 2026 hours confirmed: 8:00 AM to 10:00 PM, kitchen closes 9:30 PM. Walk-in only. Meat soup 4,850 ISK (about $39). Gratinated mashed fish 5,250 ISK (about $42). Lamb 6,150 ISK (about $49). 2 mains about $80 to $100; about $100 to $130 with drinks. Eat by 7:00 PM for the 8:30 PM bonfires. Next to the church for midnight fireworks.",
        url: "https://loki.is/", urlLabel: "Kaffi Loki", place: "cafe_loki"
      },
      {
        title: "Islenski Barinn",
        text: "Pub, Icelandic comfort food and burgers. Ingolfsstraeti 1a, about 8 min walk. 2026 hours partly confirmed: Dec 31, 11:00 AM to 9:00 PM, walk-in only, regular menu. Classic burger with waffle fries 3,850 ISK (about $31). Meat soup 3,550 ISK (about $28). Fish and chips 4,250 ISK (about $34). 2 mains about $60 to $80; about $90 to $120 with drinks. Closes 9:00 PM: eat about 5:30 PM to 7:30 PM to make the bonfires.",
        url: "https://islenskibarinn.is/", urlLabel: "Islenski Barinn", place: "islenski_barinn"
      },
      {
        title: "Posthus Food Hall",
        text: "Closest option. Posthusstraeti 3-5, about 5 min walk. Food hall, shared tables: Yuzu burgers, Pizza Popolare, burritos, Korean, sushi. 2026 hours not posted; Dec 31, 2025: 11:30 AM to 10:00 PM. Usual hours 11:30 AM to 10:00 PM; kitchens close 1 hour earlier. Yuzu burger about 2,399 to 3,699 ISK (about $19 to $30). Pizza about 3,190 to 3,790 ISK (about $26 to $30). 2 meals about $50 to $80; about $70 to $110 with drinks. Kitchens may close 9:00 PM; eat early for the bonfires.",
        url: "https://posthusfoodhall.is/en", urlLabel: "Posthus Food Hall", place: "posthus"
      },
      {
        title: "Flatey Pizza, Grandi",
        text: "12-inch pizzas. Grandagardur 11, about 12 min walk along the harbor. 2026 hours not posted; Dec 31, 2025: 11:30 AM to 10:00 PM, regular menu. Margherita 3,090 ISK (about $25). Diavola 3,290 ISK (about $26). Parma 3,990 ISK (about $32). 2 pizzas about $50 to $64; about $75 to $110 with garlic bread and drinks. Early dinner leaves time for the 8:30 PM bonfires.",
        url: "https://flateypizza.is/is", urlLabel: "Flatey Pizza", place: "flatey"
      },
      {
        title: "Lebowski Bar",
        text: "Burgers, diner menu. Laugavegur 20a, about 10 min walk. 2026 hours not posted; Dec 31, 2025: 11:00 AM to 4:30 AM. Usual Thursday: 11:00 AM to 1:00 AM, kitchen 11:00 AM to 10:00 PM. Dude burger meal (fries, soda) 3,550 ISK (about $28). Walter meal 3,700 ISK (about $30). 2 meals about $57 to $72; about $90 to $120 with drinks. Eat by 8:00 PM for the bonfires. Bar open late, after the fireworks.",
        url: "https://www.lebowskibar.is/en", urlLabel: "Lebowski Bar", place: "lebowski"
      },
      {
        title: "Hard Rock Cafe",
        text: "Burgers. Laekjargata 2a, about 8 min walk. 2026 hours confirmed: 5:00 PM to 10:00 PM, kitchen closes 9:00 PM. 15% holiday surcharge on food and drink. Burgers about 4,060 to 4,390 ISK (about $33 to $35) before surcharge, about $37 to $40 after. 2 burgers with drinks about $110 to $150. Eat early.",
        url: "https://cafe.hardrock.com/reykjavik/", urlLabel: "Hard Rock Cafe", place: "hard_rock"
      }
    ];
    return '<h3 class="rv">Casual NYE options</h3>' +
      '<p class="fine rv">Casual a la carte, Dec 31, before the bonfires and fireworks. Closed Dec 31: Hlemmur Matholl, Grandi Matholl (confirmed for 2026). Confirm hours before going, especially where only 2025 hours are listed.</p>' +
      '<ul class="booklist rv">' + opts.map(function (o) {
        return "<li><h3>" + esc(o.title) + "</h3><p class=\"fine\">" + esc(o.text) + "</p>" + optionLinks(o.url, o.urlLabel, o.place) + "</li>";
      }).join("") + "</ul>";
  }
  function editionRatesHtml(id) {
    if (id !== "stay-edition") return "";
    return '<p class="fine rv">Plan: Deluxe King, 1 king, Scenic view, $4,835. All rates below: live Member rates, same dates, 2 adults, taxes and fees included.</p>' +
      '<p class="price-note rv"><span class="pn-label">Cost</span>Deluxe King, Scenic view: $4,835 Member Stay Longer on Us, refundable, free cancellation through Dec 1, 2026. Other Member options: $4,716 prepay non-refundable, $5,006 prepay with breakfast, $5,513 Flexible.</p>' +
      '<p class="price-note rv"><span class="pn-label">Cost</span>Reference: Courtyard King from $4,015, Deluxe Suite from $7,500, both Member Stay Longer, refundable through Dec 1, 2026.</p>';
  }

  function mapPage() {
    addPage({
      id: "route", label: "The route", chapter: "The route", layout: "map",
      media: '<div class="map-frame" id="mapFrame"><div id="tripMap" class="trip-map" role="region" aria-label="Interactive map of the trip"></div>' +
        '<button type="button" class="map-activate" id="mapActivate">Tap to move the map</button></div>',
      text:
        '<p class="eyebrow rv">The route</p>' +
        '<h2 class="rv">Keflavik, Golden Circle, South Coast, Reykjavik, Blue Lagoon.</h2>' +
        '<p class="lede rv">Driving route, Keflavik Airport to The Retreat at Blue Lagoon, via the planned stays and the Dec 29 and Dec 30 stops (incl. Seljalandsfoss and Skogafoss). Jan 4 airport drive is on that day. Tap a day to zoom the map.</p>' +
        '<p class="fine rv">Why this order: shorter first day after the overnight flight, with groceries and dinner on Dec 29. Kerid is about 15 min from Heathland Lodge on the way south. Froken and Midgard fall on their nights. Swapping Dec 29 and Dec 30 saves only about 25 min on the Dec 31 drive into Reykjavik.</p>' +
        '<div class="map-chips rv" id="mapChips" aria-label="Focus the map on a day"></div>' +
        '<div class="rv" id="fullRouteLink"></div>' +
        '<p class="fine rv">Driving buttons open Apple Maps, road-snapped points.</p>'
    });
  }

  /* field guide tips, woven into the day where they matter */
  var GUIDE = {
    kitchens: { title: "Kitchens", photo: "heathland_kitchen", tips: [5] },
    roads: { title: "Wind, ice, and daylight", photo: "kerid_rim", tips: [3, 4, 6] },
    nye: { title: "New Year's Eve", photo: "bonfire", tips: [0, 1, 2] },
    lagoons: { title: "Lagoons", photo: "blue_lagoon", tips: [7] }
  };
  function tipPage(day, key) {
    var g = GUIDE[key];
    if (!g) return;
    addPage({
      id: "tip-" + day.id + "-" + key, day: day.id, label: "Field guide: " + g.title, chapter: "Day " + day.num + " · " + day.date, layout: "split",
      media: '<div class="media-img">' + imgTag(g.photo) + '<p class="media-cap">' + esc(label(g.photo)) + "</p></div>",
      text:
        '<p class="eyebrow rv">Field guide &middot; ' + esc(day.date) + "</p>" +
        '<h2 class="rv">' + esc(g.title) + "</h2>" +
        g.tips.map(function (n) {
          var t = TIPS[n];
          return '<div class="tipblock rv"><h3>' + esc(t.title) + "</h3><p>" + esc(t.text) + "</p></div>";
        }).join("")
    });
  }

  function preparePage() {
    var packItems = (T.PACK_BASE || []).concat([
      { label: "Swimsuit" }, { label: "Flip-flops for wet decks" },
      { label: "Ice scraper for the car" }, { label: "Warm outfit for New Year's Eve" }
    ]);
    addPage({
      id: "prepare", label: "Before the trip", chapter: "Before the trip", layout: "split",
      media: '<div class="media-img">' + imgTag("horses") + '<p class="media-cap">' + esc(label("horses")) + "</p></div>",
      text:
        '<p class="eyebrow rv">Before the trip</p>' +
        '<h2 class="rv">Winter conditions and packing.</h2>' +
        '<p class="lede rv">Sunrise about 11:20 AM, sunset about 3:30 to 3:50 PM: about 4 hours of daylight. Typical: -3 to 3 C, wind, snow, ice. Check umferdin.is and safetravel.is before any drive. Reynisfjara: sneaker waves, stay well up the beach.</p>' +
        '<p class="road-links rv">' + (T.ROAD_LINKS || []).map(function (l) { return '<a class="link" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + icon("external") + " " + esc(l.label) + "</a>"; }).join("") + "</p>" +
        '<h3 class="rv">What to pack</h3>' +
        '<ul class="pack rv">' + packItems.map(function (p) { return "<li>" + esc(p.label) + "</li>"; }).join("") + "</ul>"
    });
  }

  function numbersPage() {
    var lines = [
      ["Icelandair Saga Premium, FI670 and FI671", "$6,062"],
      ["Dacia Duster 4x4, Blue Car Rental, 6 days", "$719"],
      ["Heathland Lodge, Dec 29", "$720"],
      ["Glass Cottages, Cottage Blar, Dec 30", "$559"],
      ["The Reykjavik EDITION, Deluxe King, Scenic view, Dec 31 to Jan 3", "$4,835"],
      ["The Retreat at Blue Lagoon, Lava View Junior Suite, Jan 3", "est. $2,484 (about 310,000 ISK)"],
      ["Lodging, 6 nights", "$8,598"]
    ];
    addPage({
      id: "numbers", label: "The numbers", chapter: "The numbers", layout: "text", cls: "page-numbers",
      media: "",
      text:
        '<p class="eyebrow rv">The numbers</p>' +
        '<h2 class="rv">Trip costs, cash, for 2.</h2>' +
        '<p class="lede rv">Cash rates only. Full totals for 2 adults, checked Nov 20, 2026. Planned total: $15,379. Meals, soaks, and extras below. Nothing booked yet.</p>' +
        '<dl class="ledger rv">' + lines.map(function (l) { return "<div><dt>" + esc(l[0]) + "</dt><dd>" + esc(l[1]) + "</dd></div>"; }).join("") +
        '<div class="ledger-total"><dt>Planned total for 2</dt><dd>$15,379</dd></div></dl>' +
        '<p class="price-note rv"><span class="pn-label">Cost</span>Car: $719 is the 6-day rate. Return after 8:00 AM Jan 4 bills a 7th day, about $41 more (live quote).</p>' +
        '<h3 class="rv">Other cash options</h3>' +
        '<ul class="plain rv">' +
          "<li>Icelandair Economy, same flights: $4,138 for 2. Total becomes $13,455.</li>" +
          "<li>Land Rover Defender 110: about $2,148 for 6 days, estimate. Total about $16,808 with Saga Premium, about $14,884 with Economy.</li>" +
          "<li>Other EDITION Member cash rates, 3 nights: Deluxe King prepay non-refundable $4,716; prepay with breakfast $5,006; Flexible $5,513. Courtyard King from $4,015. Deluxe Suite from $7,500.</li>" +
        "</ul>" +
        '<h3 class="rv">Meals, soaks, and extras</h3>' +
        '<p class="fine rv">Not in the $15,379 planned total. Chosen extra: Retreat in-water massage. Out of the plan: Sky Lagoon, EDITION massage. Day-by-day food budget on the next page. Nothing booked yet.</p>' +
        '<dl class="ledger rv">' + [
          ["Food and drinks for 2", "about $910 to $1,780"],
          ["Reykjabod Classic, Dec 29", "about $142"],
          ["Retreat in-water massage for 2, chosen extra", "about $463"],
          ["Ishestar Horses and Waffles, optional", "about $271"],
          ["Gas, estimate", "about $95"],
          ["EDITION valet, if used", "about $168"]
        ].map(function (l) { return "<div><dt>" + esc(l[0]) + "</dt><dd>" + esc(l[1]) + "</dd></div>"; }).join("") + "</dl>" +
        '<p class="price-note rv"><span class="pn-label">Cost</span>All-in, with the Retreat massage, food budget, and extras above: about $17,440 to $18,330 for 2. The $15,379 ledger is unchanged. Skipping the 3 EDITION breakfasts keeps it near the low end.</p>' +
        '<h3 class="rv">Ways to save</h3>' +
        '<ul class="plain rv">' +
          "<li>Icelandair Economy, same flights: saves $1,924. Planned total $13,455.</li>" +
          "<li>EDITION Deluxe King prepay non-refundable: saves $119.</li>" +
          "<li>EDITION Courtyard King from $4,015: saves $820 vs the Deluxe King.</li>" +
          "<li>Economy plus Courtyard King: all-in about $14,640 to $15,530.</li>" +
        "</ul>"
    });
  }

  function foodBudgetPage() {
    addPage({
      id: "food-budget", label: "Food budget", chapter: "Food budget", layout: "text", cls: "page-numbers",
      media: "",
      text:
        '<p class="eyebrow rv">Food budget</p>' +
        '<h2 class="rv">Meals by day, for 2.</h2>' +
        '<p class="lede rv">Planned dinners: Froken, Midgard, Spa Restaurant. New Year\'s Eve: casual a la carte in Reykjavik, about $60 to $150 for 2. All other meals: casual, groceries, or the one Tides lunch on the room credit. Nothing booked yet.</p>' +
        '<dl class="ledger rv">' + [
          ["Dec 29, road breakfast and Froken", "$180 to $260"],
          ["Dec 30, quick lunch and Midgard", "$225 to $280"],
          ["Dec 31, quick lunch and casual NYE dinner", "$90 to $210"],
          ["Jan 1, casual lunch and dinner", "$45 to $210"],
          ["Jan 2, Tides lunch and casual dinner", "$40 to $150"],
          ["Jan 3, quick lunch and Spa Restaurant", "$160 to $310"],
          ["Jan 4, Retreat breakfast included", "$0 to $20"],
          ["Groceries, Selfoss and Reykjavik", "$60 to $100"],
          ["Drinks, beyond the dinners", "$80 to $180"]
        ].map(function (l) { return "<div><dt>" + esc(l[0]) + "</dt><dd>" + esc(l[1]) + "</dd></div>"; }).join("") +
        '<div class="ledger-total"><dt>Food and drinks for 2</dt><dd>about $910 to $1,780</dd></div></dl>' +
        '<p class="price-note rv"><span class="pn-label">Cost</span>124.82 ISK per USD, checked Nov 20, 2026. Low end: grocery or bakery breakfasts, casual NYE dinner, quick lunches. High end: EDITION breakfasts at $77 to $98 a morning, drinks, fuller meals at Froken, Midgard, and Spa Restaurant. Jan 2 Tides lunch: covered by the room credit, about $56.</p>' 
    });
  }

  function bookingPage() {
    addPage({
      id: "booking", label: "Booking pages", chapter: "Booking pages", layout: "split",
      media: '<div class="media-img">' + imgTag("reykjavik_from_church") + '<p class="media-cap">' + esc(label("reykjavik_from_church")) + "</p></div>",
      text:
        '<p class="eyebrow rv">Booking pages</p>' +
        '<h2 class="rv">Flights, stays, and car. Not booked.</h2>' +
        '<ul class="booklist rv">' + ["flight", "car"].concat(STAY_IDS).map(function (id) {
          var it = ITEMS[id];
          var b = (T.BOOKING || {})[id];
          return "<li><p class=\"bk-status\"><span class=\"" + (it.status === "Book soon" ? "warn" : "") + "\">" + esc(it.status) + "</span></p>" +
            "<h3>" + esc(it.title) + "</h3>" + (b ? fine(b.text) : "") + siteHtml(it.url, it.urlLabel) + "</li>";
        }).join("") + "</ul>"
    });
  }

  function endPage() {
    addPage({
      id: "end", label: "The end", chapter: "The end", layout: "full", cls: "page-end",
      media: '<div class="media-img">' + imgTag("aurora_self") + "</div>",
      text:
        '<p class="eyebrow rv">Dec 28, 2026 to Jan 4, 2027</p>' +
        '<h2 class="rv">Dec 28 to Jan 4. Scott and Jerm.</h2>' +
        '<p class="lede rv">Cash totals for 2 adults. Lodging, flights, and car checked Nov 19, 2026; food budget Nov 20, 2026. Nothing booked yet.</p>' +
        '<p class="fine rv">Photos of the actual places, from hotel and restaurant sites and Wikimedia Commons. Credits in the project README. Live weather: Open-Meteo. Map data &copy; OpenStreetMap contributors.</p>' +
        '<button type="button" class="begin rv" data-go="cover">' + icon("left") + " Back to the cover</button>"
    });
  }

  function buildPages() {
    coverPage();
    weekPage();
    mapPage();
    daylightPage();
    preparePage();
    DAYS.forEach(function (day) {
      dayOpener(day);
      day.stops.forEach(function (id) { stopPage(day, id); });
    });
    numbersPage();
    foodBudgetPage();
    bookingPage();
    endPage();
    PAGES.forEach(function (p, i) { p.index = i; p.theme = i % 2 === 0 ? "dark" : "light"; });
  }

  function renderBook() {
    var book = document.getElementById("book");
    book.innerHTML = PAGES.map(function (p) {
      return '<section class="page layout-' + p.layout + " theme-" + p.theme + (p.cls ? " " + p.cls : "") + (p.index % 4 === 3 ? " side-right" : "") +
        '" id="p-' + p.id + '" data-id="' + p.id + '"' + (p.day ? ' data-day="' + p.day + '"' : "") + (p.opener ? ' data-opener="1"' : "") +
        ' aria-roledescription="page" aria-label="' + esc((p.index + 1) + " of " + PAGES.length + ": " + p.label) + '" hidden>' +
        (p.media ? '<div class="media">' + p.media + "</div>" : "") +
        '<div class="shade" aria-hidden="true"></div>' +
        '<div class="scroller"><div class="spacer" aria-hidden="true"></div><div class="text">' + p.text + "</div></div>" +
        '<div class="dim" aria-hidden="true"></div>' +
        "</section>";
    }).join("");
  }

  function renderContents() {
    var el = document.getElementById("contentsList");
    function item(id, a, b) {
      return '<li><button type="button" data-go="' + id + '"><span class="c-a">' + a + '</span><span class="c-b">' + esc(b) + "</span></button></li>";
    }
    var html = '<div class="c-group"><p class="c-head">Start</p><ul>' +
      item("cover", "Cover", "Countdown, live weather") + item("week", "The week", "All eight days") + item("route", "The route", "Map, Apple Maps driving") +
      item("daylight", "Daylight", "About 4 hours of sun") + item("prepare", "Before the trip", "Roads, packing") + "</ul></div>";
    html += '<div class="c-group c-days"><p class="c-head">Day by day</p><ul>' + DAYS.map(function (d) {
      return item("day-" + d.id, esc(d.weekday.slice(0, 3)) + ", " + esc(d.date), d.title);
    }).join("") + "</ul></div>";
    html += '<div class="c-group"><p class="c-head">At the end</p><ul>' +
      item("numbers", "The numbers", "Cash totals for 2") +
      item("food-budget", "Food budget", "Meals day by day") + item("booking", "Booking pages", "Official sites") + "</ul></div>";
    el.innerHTML = html;
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
  /* ---------- map ---------- */
  var routes = null, map = null, legLayers = {}, mapActive = false;
  var MAP_PLACES = ["kef", "reykjabod", "selfoss", "froken", "heathland", "kerid", "seljalandsfoss", "skogafoss", "midgard", "glass_cottages", "edition", "retreat"];
  var DAY_FOCUS = {
    all: { label: "Whole trip", places: MAP_PLACES, legs: ["kef_reykjabod", "reykjabod_selfoss", "selfoss_heathland", "heathland_kerid", "kerid_seljalandsfoss", "seljalandsfoss_skogafoss", "skogafoss_midgard", "midgard_glass", "glass_edition", "edition_retreat"] },
    dec29: { label: "Dec 29", places: ["kef", "reykjabod", "selfoss", "froken", "heathland"], legs: ["kef_reykjabod", "reykjabod_selfoss", "selfoss_heathland", "heathland_froken"] },
    dec30: { label: "Dec 30", places: ["heathland", "kerid", "seljalandsfoss", "skogafoss", "midgard", "glass_cottages"], legs: ["heathland_kerid", "kerid_seljalandsfoss", "seljalandsfoss_skogafoss", "skogafoss_midgard", "midgard_glass"] },
    dec31: { label: "Dec 31", places: ["glass_cottages", "edition"], legs: ["glass_edition"] },
    jan3: { label: "Jan 3", places: ["edition", "retreat"], legs: ["edition_retreat"] },
    jan4: { label: "Jan 4", places: ["retreat", "kef"], legs: ["retreat_kef"] }
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
      var stay = ["heathland", "glass_cottages", "edition", "retreat"].indexOf(k) !== -1;
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
        legLayers[id] = L.polyline(ll, { color: "#e8873a", weight: 3, opacity: 0.85, className: "leg" }).addTo(map);
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
      if (focus === "all") lyr.setStyle({ opacity: baseOn[id] ? 0.9 : 0, weight: 3, color: "#e8873a" });
      else lyr.setStyle({ opacity: on[id] ? 1 : (baseOn[id] ? 0.22 : 0), weight: on[id] ? 5 : 3, color: on[id] ? "#d9661f" : "#e8873a" });
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
    if (route) route.innerHTML = focus === "all" ? appleRouteHtml("full", "btn-primary") : appleRouteHtml(focus, "btn-primary");
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
        if (map && PAGES[NAV.index].id === "route") focusDay(id);
        else { NAV.pendingFocus = id; go("route"); }
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
    if (diff <= 0) { el.innerHTML = '<span class="gone">Dec 28 departure has passed.</span>'; return false; }
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
    var tries = 0;
    function get() {
      tries++;
      var ctl = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 8000);
      var url = T.WEATHER_URL + "&_=" + Math.floor(Date.now() / 300000);
      return fetch(url, ctl ? { signal: ctl.signal, cache: "no-store" } : { cache: "no-store" }).then(function (r) {
        clearTimeout(timer); if (!r.ok) throw new Error("wx"); return r.json();
      }).catch(function (e) {
        clearTimeout(timer);
        if (tries < 3) return new Promise(function (res) { setTimeout(res, 1500 * tries); }).then(get);
        throw e;
      });
    }
    get().then(function (data) {
      if (!data || !data.current) throw new Error("wx");
      var cur = data.current || {}, day = data.daily || {};
      var c = Math.round(cur.temperature_2m), f = Math.round(cur.temperature_2m * 9 / 5 + 32);
      t.textContent = c + " C";
      w.textContent = f + " F, wind " + Math.round(cur.wind_speed_10m) + " km/h from the " + windDir(cur.wind_direction_10m || 0);
      var sec = day.daylight_duration && day.daylight_duration[0];
      var dl = sec ? Math.floor(sec / 3600) + " hrs " + Math.round(sec % 3600 / 60) + " min of daylight today" : "";
      s.textContent = "Sunrise " + clock(day.sunrise && day.sunrise[0]) + ", sunset " + clock(day.sunset && day.sunset[0]) + (dl ? ", " + dl : "") + ".";
    }).catch(function () {
      t.textContent = "--";
      w.textContent = "Live weather unavailable.";
      s.textContent = "Late December: about -3 to 3 C, windy.";
    });
  }


  /* ---------- the book: one page at a time ---------- */
  var NAV = { index: 0, busy: false, els: [], suppressClick: false };
  function reduceMotion() { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

  function hydrate(i) {
    var el = NAV.els[i];
    if (!el || el._hydrated) return;
    el._hydrated = true;
    el.querySelectorAll("img[data-src]").forEach(function (img) {
      img.src = img.getAttribute("data-src");
      img.removeAttribute("data-src");
    });
  }
  function indexOfId(id) {
    for (var i = 0; i < PAGES.length; i++) if (PAGES[i].id === id) return i;
    return -1;
  }
  function chromeFor(i) {
    var p = PAGES[i];
    document.body.setAttribute("data-theme", p.theme);
    document.getElementById("chapterLabel").textContent = p.chapter;
    document.getElementById("pageCount").textContent = (i + 1) + " / " + PAGES.length;
    document.getElementById("prevBtn").disabled = i === 0;
    document.getElementById("nextBtn").disabled = i === PAGES.length - 1;
    var fill = document.getElementById("progressFill");
    var to = "scaleX(" + ((i + 1) / PAGES.length) + ")";
    if (window.TripFX && window.TripFX.progress) window.TripFX.progress(fill, (i + 1) / PAGES.length); else fill.style.transform = to;
    sides(p);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", p.theme === "dark" ? "#0b1120" : "#f3eadc");
  }

  /* what sits under each corner of the header and footer, so the controls stay readable over photos */
  function sides(p) {
    p = p || PAGES[NAV.index];
    if (!p) return;
    var phone = window.innerWidth < 600;
    var stackFull = phone || (window.innerWidth <= 900 && window.innerHeight > window.innerWidth);
    var el = NAV.els[p.index];
    var right = el && el.classList.contains("side-right");
    var tl = "text", tr = "text", bl = "text", br = "text";
    if (p.layout === "split") {
      if (phone) { tl = tr = "photo"; }
      else if (right) { tr = br = "photo"; }
      else { tl = bl = "photo"; }
    } else if (p.layout === "full") {
      tr = "photo";
      if (stackFull) tl = "photo"; else br = "photo";
      if (p.cls) { tl = tr = "photo"; br = stackFull ? "text" : "photo"; }
    } else if (p.layout === "map") {
      if (phone) { tl = tr = "map"; }
      else { tr = br = "map"; }
    }
    var b = document.body;
    b.setAttribute("data-tl", tl); b.setAttribute("data-tr", tr); b.setAttribute("data-bl", bl); b.setAttribute("data-br", br);
  }

  function show(i, dir, fromPx) {
    i = Math.max(0, Math.min(PAGES.length - 1, i));
    var fx = window.TripFX;
    if (NAV.busy && fx && fx.finish) fx.finish();
    var prev = NAV.els[NAV.index];
    var next = NAV.els[i];
    if (i === NAV.index && !next.hidden) { if (fx && fx.settle) fx.settle(next); return; }
    hydrate(i); hydrate(i + 1); hydrate(i - 1);
    var oldIndex = NAV.index;
    NAV.index = i;
    next.hidden = false;
    next.scrollTop = 0;
    var sc = next.querySelector(".scroller"); if (sc) sc.scrollTop = 0;
    chromeFor(i);
    try { history.replaceState(null, "", "#" + PAGES[i].id); } catch (e) {}
    var finish = function () {
      NAV.busy = false;
      NAV.els.forEach(function (el, k) {
        if (k !== NAV.index) { el.hidden = true; el.classList.remove("is-current"); }
      });
      next.classList.add("is-current");
      afterShow(i);
    };
    if (prev && prev !== next && fx && fx.turn && !reduceMotion()) {
      NAV.busy = true;
      fx.turn(prev, next, dir || (i > oldIndex ? 1 : -1), fromPx || 0, finish);
    } else {
      if (prev && prev !== next) { prev.style.transform = ""; }
      finish();
    }
  }
  function afterShow(i) {
    var p = PAGES[i];
    var el = NAV.els[i];
    if (p.id === "route") {
      if (!map) initMap();
      setTimeout(function () { try { map && map.invalidateSize(); moveChipPill(false); } catch (e) {} }, 60);
      if (NAV.pendingFocus) { var f = NAV.pendingFocus; NAV.pendingFocus = null; setTimeout(function () { focusDay(f); }, 120); }
    } else if (mapActive) setMapActive(false);
    var h = el.querySelector("h1, h2");
    if (NAV.focusHeading && h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    NAV.focusHeading = false;
  }
  function go(id) { var i = indexOfId(id); if (i >= 0) show(i); }
  function step(d, fromPx) { var i = NAV.index + d; if (i < 0 || i >= PAGES.length) { if (window.TripFX && window.TripFX.settle) window.TripFX.settle(NAV.els[NAV.index]); return; } show(i, d, fromPx); }

  function currentScroller() { return NAV.els[NAV.index] && NAV.els[NAV.index].querySelector(".scroller"); }
  function canScroll(dir) {
    var s = currentScroller();
    if (!s) return false;
    if (dir > 0) return s.scrollTop + s.clientHeight < s.scrollHeight - 2;
    return s.scrollTop > 2;
  }
  function overlayOpen() { return LB.open || !document.getElementById("contents").hidden; }

  function bindKeys() {
    document.addEventListener("keydown", function (e) {
      if (overlayOpen() || e.defaultPrevented) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var tag = (e.target && e.target.tagName) || "";
      if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
      if (e.target.closest && e.target.closest(".leaflet-container")) return;
      var k = e.key;
      if (k === "ArrowRight" || k === "PageDown") { e.preventDefault(); step(1); }
      else if (k === "ArrowLeft" || k === "PageUp") { e.preventDefault(); step(-1); }
      else if (k === " " || k === "ArrowDown") { if (!canScroll(1)) { e.preventDefault(); if (k === " " && e.shiftKey) step(-1); else step(1); } }
      else if (k === "ArrowUp") { if (!canScroll(-1)) { e.preventDefault(); step(-1); } }
      else if (k === "Home") { e.preventDefault(); show(0, -1); }
      else if (k === "End") { e.preventDefault(); show(PAGES.length - 1, 1); }
    });
  }

  function bindWheel() {
    var acc = 0, lockUntil = 0, quietTimer = null, locked = false;
    document.getElementById("book").addEventListener("wheel", function (e) {
      if (overlayOpen()) return;
      if (e.target.closest && e.target.closest(".leaflet-container") && mapActive) return;
      var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      var dir = d > 0 ? 1 : -1;
      if (Math.abs(e.deltaY) >= Math.abs(e.deltaX) && canScroll(dir)) { acc = 0; return; }
      e.preventDefault();
      clearTimeout(quietTimer);
      quietTimer = setTimeout(function () { locked = false; acc = 0; }, 220);
      if (locked || Date.now() < lockUntil) return;
      acc += d;
      if (Math.abs(acc) > 40) { locked = true; lockUntil = Date.now() + 650; acc = 0; step(dir); }
    }, { passive: false });
  }

  function bindSwipe() {
    var book = document.getElementById("book");
    var s = null;
    book.addEventListener("pointerdown", function (e) {
      if (overlayOpen() || NAV.busy) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (mapActive && e.target.closest(".map-frame")) return;
      if (e.target.closest(".thumbs")) return;
      s = { x: e.clientX, y: e.clientY, t: Date.now(), id: e.pointerId, dragging: false, dx: 0 };
    });
    book.addEventListener("pointermove", function (e) {
      if (!s || e.pointerId !== s.id) return;
      var dx = e.clientX - s.x, dy = e.clientY - s.y;
      if (!s.dragging) {
        if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.2) s.dragging = true;
        else if (Math.abs(dy) > 12) { s = null; return; }
        else return;
      }
      s.dx = dx;
      var edge = (dx > 0 && NAV.index === 0) || (dx < 0 && NAV.index === PAGES.length - 1);
      var shift = edge ? dx * 0.15 : dx * 0.45;
      NAV.els[NAV.index].style.transform = "translate3d(" + shift + "px,0,0)";
    });
    function end(e) {
      if (!s || (e && e.pointerId !== s.id)) return;
      var st = s; s = null;
      if (!st.dragging) return;
      NAV.suppressClick = true;
      setTimeout(function () { NAV.suppressClick = false; }, 60);
      var v = Math.abs(st.dx) / Math.max(1, Date.now() - st.t);
      var shift = parseFloat((NAV.els[NAV.index].style.transform.match(/-?[\d.]+/) || [0])[0]) || 0;
      if (Math.abs(st.dx) > 70 || (v > 0.45 && Math.abs(st.dx) > 24)) step(st.dx < 0 ? 1 : -1, shift);
      else if (window.TripFX && window.TripFX.settle && !reduceMotion()) window.TripFX.settle(NAV.els[NAV.index]);
      else NAV.els[NAV.index].style.transform = "";
    }
    book.addEventListener("pointerup", end);
    book.addEventListener("pointercancel", function (e) {
      if (!s || e.pointerId !== s.id) return;
      s = null;
      NAV.els[NAV.index].style.transform = "";
    });
    document.addEventListener("click", function (e) {
      if (NAV.suppressClick) { e.preventDefault(); e.stopPropagation(); NAV.suppressClick = false; }
    }, true);
  }

  function bindButtons() {
    document.getElementById("prevBtn").addEventListener("click", function () { step(-1); });
    document.getElementById("nextBtn").addEventListener("click", function () { step(1); });
    document.addEventListener("click", function (e) {
      var g = e.target.closest("[data-go]");
      if (g) { e.preventDefault(); closeContents(true); NAV.focusHeading = true; go(g.getAttribute("data-go")); return; }
      var t = e.target.closest("[data-turn]");
      if (t) { step(t.getAttribute("data-turn") === "prev" ? -1 : 1); }
    });
    /* on a phone the words scroll over the photo; a tap on the photo area still opens the photo it sits on */
    document.getElementById("book").addEventListener("click", function (e) {
      var sp = e.target.closest(".spacer");
      if (!sp) return;
      var page = sp.closest(".page");
      var hit = null;
      var under = document.elementsFromPoint ? document.elementsFromPoint(e.clientX, e.clientY) : [];
      for (var k = 0; k < under.length; k++) {
        var g = under[k].closest && under[k].closest("[data-gallery]");
        if (g && page.contains(g)) { hit = g; break; }
      }
      if (!hit) hit = page.querySelector(".media-hit");
      if (hit) lbOpen(hit.getAttribute("data-gallery"), Number(hit.getAttribute("data-index")) || 0, hit);
    });
    window.addEventListener("hashchange", function () {
      var id = location.hash.replace(/^#/, "");
      var i = indexOfId(id);
      if (i >= 0 && i !== NAV.index) show(i);
    });
  }

  /* ---------- contents ---------- */
  function openContents() {
    var c = document.getElementById("contents"), btn = document.getElementById("contentsBtn");
    c.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    var cur = PAGES[NAV.index];
    c.querySelectorAll("[data-go]").forEach(function (b) {
      var id = b.getAttribute("data-go");
      var on = id === cur.id || (cur.day && id === "day-" + cur.day);
      b.classList.toggle("is-on", !!on);
      if (on) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
    });
    if (window.TripFX && window.TripFX.menuIn) window.TripFX.menuIn(c);
    var first = c.querySelector(".is-on") || c.querySelector("[data-go]");
    if (first) first.focus({ preventScroll: true });
  }
  function closeContents(instant) {
    var c = document.getElementById("contents"), btn = document.getElementById("contentsBtn");
    if (c.hidden) return;
    btn.setAttribute("aria-expanded", "false");
    if (!instant && window.TripFX && window.TripFX.menuOut) window.TripFX.menuOut(c, function () { c.hidden = true; });
    else c.hidden = true;
    if (!instant) btn.focus({ preventScroll: true });
  }
  function bindContents() {
    document.getElementById("contentsBtn").addEventListener("click", function () {
      if (document.getElementById("contents").hidden) openContents(); else closeContents();
    });
    document.getElementById("contentsClose").addEventListener("click", function () { closeContents(); });
    document.getElementById("contents").addEventListener("click", function (e) { if (e.target.id === "contents") closeContents(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !document.getElementById("contents").hidden) closeContents();
    });
  }

  function init() {
    buildPages();
    renderBook();
    renderContents();
    NAV.els = Array.prototype.slice.call(document.querySelectorAll("#book .page"));
    renderMapChips();
    var fr = document.getElementById("fullRouteLink");
    if (fr) fr.innerHTML = appleRouteHtml("full", "btn-primary");
    bindLightbox();
    bindMap();
    bindKeys();
    bindWheel();
    bindSwipe();
    bindButtons();
    bindContents();
    var start = indexOfId(location.hash.replace(/^#/, ""));
    NAV.index = start >= 0 ? start : 0;
    show(NAV.index);
    if (renderCountdown()) setInterval(renderCountdown, 1000);
    loadWeather();
    setInterval(loadWeather, 15 * 60 * 1000);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) loadWeather(); });
    window.addEventListener("resize", function () { sides(); moveChipPill(false); if (map) try { map.invalidateSize(); } catch (e) {} });
    document.documentElement.classList.add("is-ready");
    if (window.TripFX && window.TripFX.intro && !reduceMotion()) window.TripFX.intro(NAV.els[NAV.index]);
  }

  window.TripGuide = { go: go, step: step, focusDay: focusDay, pages: function () { return PAGES.map(function (p) { return p.id; }); }, index: function () { return NAV.index; }, GALLERIES: GALLERIES, appleDirectionsUrl: appleDirectionsUrl };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
