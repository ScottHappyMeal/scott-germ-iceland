# Scott & Jerm's Iceland

A static day-by-day trip page for a late-December visit to Iceland, Dec 28, 2026 to Jan 4, 2027.

Headline lodging, flight, and car prices are verified cash totals for two adults as of Nov 20, 2026, except the Retreat suite and the Defender 110, which are estimates. The Retreat estimate uses 124.785 ISK per USD. This is not a booking confirmation. Nothing is booked yet.

The page is a full-screen winter guide you page through like a book, one scene per page. Swipe on a phone, or use the arrow keys, and the Contents button jumps to any day. Pages alternate between warm low-sun light scenes and night scenes, with big photos of every stop. It reads in trip order. It opens with a cover with a departure countdown and live Reykjavik weather, the week at a glance, an interactive route map that flies to each day, a winter daylight chart, and packing notes. Then come the eight days, each with an opening page with times, drives and a "Drive in Apple Maps" button, a page for every stop with its own photo gallery, and field guide tips on the day they matter. It closes with a calm summary of the $15,379 cash total for two, a day-by-day food budget, and the official booking pages. No photo appears twice anywhere in the book. It is designed phone-first, and on a wide or unfolded screen each page becomes a two-page spread.

It is a static site with no build step. GitHub Pages serves it straight from `main`.

## Libraries and fonts (self-hosted)

- Motion 12.23.24 (motion.dev), MIT, in `vendor/motion-12.23.24.min.js`. Drives the page turns, the words arriving on each page, the progress line, the contents menu and the photo viewer. Everything animates `transform` and `opacity` only, and nothing moves when `prefers-reduced-motion` is set.
- Leaflet 1.9.4, BSD-2-Clause, in `vendor/leaflet/`. Map tiles from OpenStreetMap.
- Jost and Inter variable fonts, SIL Open Font License, in `fonts/` (from Fontsource).
- Live weather from Open-Meteo.

Small preview copies of every photo live in `images/thumbs/` (640 px wide). The full photos in `images/` are used for heroes and the photo viewer.

## Photo credits

Stay photos are self-hosted official images from the hotels' and lodges' own sites, except the Hotel Hofn exterior (Tommy Bee, Wikimedia Commons, CC BY-SA 3.0), which is credited but not shown on the page. Hero and social images use "Flames in the sky," AstroAnthony, Wikimedia Commons, CC BY 4.0. Heathland Lodge photos are official, from heathlandlodge.is. Glass Cottages photos are official, from glasscottages.com.

Day cards and activity photos are self-hosted JPEGs of the actual places. Sources:

- Icelandair day photo: Sandro Koechli, Wikimedia Commons, File:Icelandair Boeing 737-8 MAX TF-ICS ZRH 2025 01.jpg, CC0.
- Dec 29 EDITION entrance: official, editionhotels.com (courtyard entrance, not the same frame as the stay-card exterior).
- Ice cave day photo: Eric Kilby, Wikimedia Commons, File:Ice Cave Explorer - Iceland.jpg, CC BY-SA 2.0.
- New Year fireworks day photo: Borkur Sigurbjornsson, Wikimedia Commons, File:NewYearFireworks-Reykjavik.jpg, CC BY 2.0.
- Icelandic horses day photo: Guislin, Wikimedia Commons, File:Islandais hiver.jpg, CC BY 4.0.
- Seljalandsfoss day photo: Jakub Halun, Wikimedia Commons, File:Seljalandsfoss Waterfall, Iceland, 20240720 1500 3096.jpg, CC BY 4.0.
- Jan 3 Retreat lagoon: official aerial of the Retreat lagoon, bluelagoon.com (upgraded from a 720 x 960 still).
- Harpa: Manuelarosi, Wikimedia Commons, File:Harpa (concert hall).jpg, CC BY-SA 4.0.
- Ishestar horse ride: official, ishestar.is, riders through a lava field (upgraded from a smaller official still).
- Grotta lighthouse: Olga Ernst, Wikimedia Commons, File:Lighthouse on Grótta Island.jpg, CC BY-SA 4.0.
- Tides dining room: official, editionhotels.com.
- Dill: City Foodsters, Wikimedia Commons, File:DILL IMG 2911 (30924863540).jpg, CC BY 2.0, a meal at Dill in Reykjavik.
- Moss: official, bluelagoon.com. The photo remains in the repo but is not used on the book pages.
- Spa Restaurant at the Retreat Spa: official, bluelagoon.com, dining room, a set table, a stracciatella plate, and a sushi plate.
- Grillmarkadurinn: official, grillmarkadurinn.is.
- Baejarins Beztu: Jóhann Heiðar Árnason, Wikimedia Commons, File:Bæjarins bestu.jpg, CC BY-SA 3.0 (upgraded from a 640 px still).
- Fridheimar: Eric Kilby, Wikimedia Commons, File:Fridheimar Tomatoes.jpg, CC BY-SA 2.0.
- Sky Lagoon cold plunge: Laurenmcl, Wikimedia Commons, File:Sky Lagoon Cold Plunge.jpg, CC BY-SA 4.0.
- Blue Lagoon: Jakub Halun, Wikimedia Commons, File:Blue Lagoon with Þorbjörn, Iceland, 20230430 1626 3692.jpg, CC BY-SA 4.0.
- Retreat in-water massage: official, bluelagoon.com. The lagoon-view suite still was also upgraded from a higher-resolution official Blue Lagoon photo.
- Fontana: Reykholt, Wikimedia Commons, File:Fontana spa.jpg, CC BY-SA 4.0.
- Hvammsvik: official, hvammsvik.com, aerial of the beach pools.
- EDITION Spa: official, editionhotels.com, treatment room.
- Laugavegur: Marek Slusarczyk (Tupungato), Wikimedia Commons, File:Laugavegur, Reykjavik.jpg, CC BY 3.0.
- 66 North: official 66 North campaign photo (logo in an Iceland landscape), not a storefront.
- Kolaportid: Karl Gunnarsson, Wikimedia Commons, File:Kolaportid.jpg, CC BY-SA 2.0.
- Gullfoss (Golden Circle): Diego Delso, Wikimedia Commons, File:Gullfoss, Suðurland, Islandia, 2014-08-16, DD 119.JPG, CC BY-SA 4.0.
- Skogafoss (South Coast): Alexander Grebenkov, Wikimedia Commons, File:Skógafoss from below.jpg, CC BY 3.0.
- Jokulsarlon: Giles Laurent, Wikimedia Commons, File:033 Freshly rotated iceberg at Jökulsárlón (Iceland) Photo by Giles Laurent.jpg, CC BY-SA 4.0.
- Katla ice cave: Moyan Brenn, Wikimedia Commons, a frozen cave in the Myrdalsjokull / Kotlujokull system, CC BY 2.0. A Flickr footer was cropped out of the frame.
- Silfra: Diego Delso, Wikimedia Commons, Cañón Silfra, CC BY-SA 4.0.
- New Year's Eve bonfire: Mark Potocnjak, Wikimedia Commons, File:New Years Eve bonfire.jpg, CC BY-SA 4.0, 31 December 2018.
- Fireworks at Hallgrimskirkja: Fancy-cats-are-happy-cats, Wikimedia Commons, File:ReykjavikNewYr.jpg, public domain.
- EDITION rooftop (NYE dinner): official, editionhotels.com.
- RUV headquarters (Aramotaskaup): Haukurth, Wikimedia Commons, File:Ruv headquarters.jpg, CC BY-SA 3.0, the broadcaster of Aramotaskaup.
- Guided northern lights, Hofn: Giuseppe Milo, Wikimedia Commons, CC BY 3.0.
- Self-guided aurora: Nico Carver, Wikimedia Commons, File:Aurora Borealis- Iceland (Nico Carver).jpg, CC BY-SA 2.0.

## Photos added or upgraded, Nov 19, 2026

New and upgraded stills are real photographs or official venue images, saved under `images/` with 640 px previews in `images/thumbs/`. No stock libraries and no generated images.

Heathland Lodge (official, heathlandlodge.is):

- `images/stays/heathland-lodge.jpg` and `images/stays/heathland-lodge-int.jpg`: official photos of the mirror-glass cabin and the bedroom.
- `images/stays/heathland-lodge-tub.jpg`, `images/stays/heathland-lodge-sauna.jpg`, `images/stays/heathland-lodge-kitchen.jpg`, and `images/stays/heathland-lodge-moor.jpg`: official photos of the private hot tub and sauna, the kitchenette, and the cabin in the field at Minni-Borg.

Glass Cottages (official, glasscottages.com):

- `images/stays/glass-cottages.jpg` and `images/stays/glass-cottages-int.jpg`: already on the site.
- `images/stays/glass-cottages-bedroom.jpg`, `images/stays/glass-cottages-living.jpg`, and `images/stays/glass-cottages-stars.jpg`: official property photos from glasscottages.com.

Reykjabod Hot Springs (official, reykjabod.is):

- `images/places/reykjabod.jpg`: official bathhouse still, upgraded to a higher-resolution copy of the same official frame.
- `images/places/reykjabod-lagoon.jpg`, `images/places/reykjabod-evening.jpg`, and `images/places/reykjabod-corridor.jpg`: official site images of the lagoon, the boardwalk at dusk, and a bathhouse corridor.

Sky Lagoon:

- `images/places/sky-lagoon.jpg`: Laurenmcl, Wikimedia Commons, File:Sky Lagoon Cold Plunge.jpg, CC BY-SA 4.0 (already on the site).
- `images/places/sky-lagoon-infinity.jpg`, `images/places/sky-lagoon-sunset.jpg`, and `images/places/sky-lagoon-sauna.jpg`: official, skylagoon.com.

Froken Selfoss (official, frokenselfoss.is):

- `images/places/froken.jpg`: official dining room, upgraded to a higher-resolution official frame.
- `images/places/froken-booth.jpg`, `images/places/froken-seafood.jpg`, and `images/places/froken-platters.jpg`: official restaurant photos.

Midgard Restaurant (official, midgardbasecamp.is):

- `images/places/midgard.jpg`: already on the site.
- `images/places/midgard-pasta.jpg`, `images/places/midgard-view.jpg`, and `images/places/midgard-bar.jpg`: official Midgard Base Camp restaurant photos.

Mjolkurbuid / the Old Dairy, Selfoss (official, mjolkurbuid.is, Mikael Lundblad):

- `images/places/mjolkurbuid.jpg`: already on the site (exterior).
- `images/places/mjolkurbuid-bar.jpg`, `images/places/mjolkurbuid-hall.jpg`, `images/places/mjolkurbuid-counter.jpg`, and `images/places/mjolkurbuid-coffee.jpg`: official interior photos.

Kerid crater (Wikimedia Commons):

- `images/places/kerid.jpg`: Diego Delso, File:Crater volcánico Kerið, Suðurland, Islandia, 2014-08-16, DD 151.jpg, CC BY-SA 4.0 (already on the site).
- `images/places/kerid-rim.jpg`: Netha Hussain, File:Kerid Crater 02.jpg, CC0.
- `images/places/kerid-water.jpg`: Netha Hussain, File:Kerid Crater 09.jpg, CC0.
- `images/places/kerid-parking.jpg`: Alexander Grebenkov, File:Kerið crater lake, Iceland. View from parking lot.jpg, CC BY 3.0.

Seljalandsfoss (Wikimedia Commons, Jakub Hałun, CC BY 4.0):

- `images/places/seljalandsfoss.jpg`: File:Seljalandsfoss Waterfall, Iceland, 20240720 1500 3096.jpg (already on the site).
- `images/places/seljalandsfoss-wide.jpg`: File:Seljalandsfoss Waterfall, Iceland, 20240720 1522 3138.jpg.
- `images/places/seljalandsfoss-behind.jpg`: File:Seljalandsfoss Waterfall, Iceland, 20240720 1457 3084.jpg.

Skogafoss (Wikimedia Commons):

- `images/places/skogafoss.jpg`: Alexander Grebenkov, File:Skógafoss from below.jpg, CC BY 3.0 (already on the site).
- `images/places/skogafoss-wide.jpg`: Jakub Hałun, File:Skógafoss Waterfall, Iceland, 20240720 1330 2993.jpg, CC BY 4.0.
- `images/places/skogafoss-below.jpg`: Jakub Hałun, File:Skógafoss, Iceland, 20230501 1445 3970.jpg, CC BY-SA 4.0.

The Retreat at Blue Lagoon (official, bluelagoon.com):

- `images/stays/retreat-lagoon.jpg`: official aerial of the Retreat lagoon (upgraded).
- `images/stays/retreat-suite.jpg`: official lagoon-view suite, higher-resolution official frame (upgraded).
- `images/stays/retreat-evening.jpg`: official evening view of the building and lagoon.
- `images/stays/retreat-room-view.jpg`: official bedroom looking out to the lagoon.

Baejarins Beztu (Wikimedia Commons):

- `images/places/baejarins.jpg`: Jóhann Heiðar Árnason, File:Bæjarins bestu.jpg, CC BY-SA 3.0 (upgraded).
- `images/places/baejarins-street.jpg`: Vincent van Zeijst, File:Iceland, Reykjavík, Tryggvagata (01), Bæjarins Beztu Pylsur.jpg, CC BY-SA 3.0.
- `images/places/baejarins-dog.jpg`: Jschildk, File:Hot dog from Bæjarins Beztu Pylsur.jpg, CC BY-SA 3.0.

Ishestar (official, ishestar.is):

- `images/places/ishestar.jpg`: official riders in a lava field (upgraded).
- `images/places/ishestar-winter.jpg`: official winter ride from the saddle.

The Reykjavik EDITION Deluxe Suite living area (`images/stays/edition-deluxe-suite.jpg`) is an official Marriott / EDITION photo already in the repo, and is shown on the EDITION page. `images/stays/edition-harbor-king.jpg` is an official Marriott / EDITION photo of a Deluxe King bedroom with a Scenic harbor view.

## Photos added Nov 20, 2026 (book16, no repeated photos)

- `images/places/reykjavik-aerial.jpg` (Dec 29 arrival cover): Eric Kilby, Wikimedia Commons, File:Approaching Reykjavik - aerial 2021-10-05.jpg, CC BY-SA 2.0.
- `images/places/denver-airport.jpg` (Dec 28 cover): Peterquinn925, Wikimedia Commons, File:Denver International Airport Main Terminal at dusk.jpg, CC BY-SA 4.0.
- `images/places/keflavik-terminal.jpg` (Jan 4 flight home): APK, Wikimedia Commons, File:Keflavík International Airport terminal viewed from tarmac.jpg, CC BY 4.0.
- `images/places/reykjavik-old-harbour.jpg` (Jan 2 cover): Ypsilon from Finland, Wikimedia Commons, File:Boats in Reykjavik's Old Harbour.JPG, CC0.
- `images/places/reykjavik-from-hallgrimskirkja.jpg` (booking pages): Andrew Smales, Wikimedia Commons, File:Reykjavik, Iceland aerial cityscape (Unsplash).jpg, CC0.

## Car photos, Nov 20, 2026 (book19)

Official Dacia press photos of the current-generation Duster, All-new Dacia Duster TCe 130 Extreme 4x4, from the "More Duster still Duster" press kit (Apr 25, 2024), media.dacia.com, Dacia media use:

- `images/cars/duster-4x4-dust.jpg` (Dec 29 car pickup, lead photo): front view on a dirt track.
- `images/cars/duster-4x4-gravel.jpg` (Dec 29 car pickup, second photo): side view on a gravel road.
- `images/cars/duster-4x4-offroad.jpg` (Jan 4 car drop-off): off-road over tree roots.

## Icons

UI icons are Lucide, vendored in `icons/` under the ISC License.

- Kerid crater: Diego Delso, Wikimedia Commons, File:Crater volcánico Kerið, Suðurland, Islandia, 2014-08-16, DD 151.jpg, CC BY-SA 4.0.
- Raufarholshellir lava tunnel: Winniepix, Wikimedia Commons, File:Icicles and stalagmites of ice inside the lava tunnel at Raufarholshellir, Iceland (25390824267).jpg, CC BY 2.0.
- Mjolkurbuid / The Old Dairy, Selfoss: official, mjolkurbuid.is (Mikael Lundblad).
- Reykjabod Hot Springs: official, reykjabod.is, a higher-resolution still of the bathhouse.
- Sandholt: official bakery photo, sandholt.is.
- Froken Selfoss: official dining-room photo, frokenselfoss.is (higher-resolution official frame).
- Midgard Restaurant: dining-room photo via Visit South Iceland / Midgard Base Camp.

## Share preview, Nov 20, 2026 (book20)

- `images/og-share.jpg`: 1200x630 link preview still (og:image, twitter:image). Built from `images/places/aurora-self.jpg` with the site fonts (Jost, Inter) and night colors.
- `images/og-share.mp4`: 7.8 second, 1200x630 H.264 loop (og:video). Slow pans across `aurora-self.jpg`, `reykjavik-aerial.jpg`, `stays/glass-cottages.jpg` and `nye-fireworks.jpg`, with the same title. Photo credits as listed above.
- `apple-touch-icon.png` and `images/icon-32.png`: crops of `aurora-self.jpg`.
