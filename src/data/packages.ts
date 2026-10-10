import type { TourPackage } from "@/types";

export const packages: TourPackage[] = [
  {
    id: "1",
    slug: "goa-beach-bliss",
    name: "Goa Beach Bliss",
    destination: "Goa",
    destinationSlug: "goa",
    duration: "4N / 5D",
    nights: 4,
    days: 5,
    startingPrice: 12999,
    originalPrice: 15999,
    emiFrom: 2167,
    category: "domestic",
    tripType: "leisure",
    rating: 4.6,
    reviewCount: 128,
    badge: "Best Seller",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
      "https://images.unsplash.com/photo-1587922546307-776227941871?w=1200&q=80",
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200&q=80",
    ],
    highlights: [
      "North & South beach tour",
      "Sunset river cruise",
      "Water sports at Calangute",
      "Old Goa sightseeing",
    ],
    overview:
      "Unwind on Goa's finest beaches with a balanced itinerary of leisure, light sightseeing and evening experiences. Ideal for couples and small families seeking a relaxed coastal holiday with curated stays and local flavours.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Goa",
        description:
          "Airport/railway transfer to hotel. Evening free to explore nearby beach shacks and relax by the shore.",
      },
      {
        day: 2,
        title: "North Goa Sightseeing",
        description:
          "Visit Calangute, Baga, Anjuna and Fort Aguada. Optional water sports in the afternoon.",
      },
      {
        day: 3,
        title: "South Goa & Cruise",
        description:
          "Explore Colva, Miramar and Dona Paula. Evening Mandovi sunset cruise with cultural performances.",
      },
      {
        day: 4,
        title: "Leisure Day",
        description:
          "Free day for spa, shopping at local markets, or a spice plantation visit on request.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Breakfast and checkout. Transfer to airport/railway station with warm memories of Goa.",
      },
    ],
    inclusions: [
      "4 nights hotel accommodation",
      "Daily breakfast",
      "Airport/railway transfers",
      "North & South Goa sightseeing",
      "Sunset cruise tickets",
    ],
    exclusions: [
      "Flights / train tickets",
      "Lunch & dinner",
      "Water sports charges",
      "Personal expenses",
      "Travel insurance",
    ],
    hotels: [
      "3★ / 4★ beach-side hotels (category as per package)",
      "Clean rooms with AC & Wi-Fi",
      "Options upgradeable on request",
    ],
    transportation: [
      "Private AC vehicle for transfers & sightseeing",
      "Experienced local driver-guide support",
    ],
    importantInfo: [
      "Valid government ID required for all travellers",
      "Hotel check-in typically 14:00; early check-in subject to availability",
      "Itinerary may change due to weather or local conditions",
    ],
    faqs: [
      {
        question: "Is this package suitable for families?",
        answer:
          "Yes. The pace is relaxed and activities can be customised for children and elders.",
      },
      {
        question: "Can we customise hotels?",
        answer:
          "Absolutely. Share your preferred category and budget — we will revise the quote.",
      },
    ],
  },
  {
    id: "2",
    slug: "manali-snow-escape",
    name: "Manali Snow Escape",
    destination: "Manali",
    destinationSlug: "manali",
    duration: "5N / 6D",
    nights: 5,
    days: 6,
    startingPrice: 14999,
    originalPrice: 18999,
    emiFrom: 2500,
    category: "domestic",
    tripType: "adventure",
    rating: 4.7,
    reviewCount: 96,
    badge: "Adventure Special",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
      "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    ],
    highlights: [
      "Solang Valley adventure",
      "Hadimba Temple visit",
      "Local market evening",
      "Mountain cafe experiences",
    ],
    overview:
      "A classic Himachal getaway covering scenic Manali with comfortable stays, sightseeing and optional adventure activities. Perfect for friends, couples and first-time mountain travellers.",
    itinerary: [
      {
        day: 1,
        title: "Delhi to Manali",
        description:
          "Overnight journey by Volvo / private vehicle. Rest and enjoy mountain views en route.",
      },
      {
        day: 2,
        title: "Arrival & Local Sightseeing",
        description:
          "Check-in and visit Hadimba Temple, Manu Temple and Mall Road in the evening.",
      },
      {
        day: 3,
        title: "Solang Valley",
        description:
          "Full day at Solang for views and optional adventure sports like paragliding (seasonal).",
      },
      {
        day: 4,
        title: "Leisure / Atal Tunnel View",
        description:
          "Optional excursion towards Atal Tunnel / nearby viewpoints depending on permits and weather.",
      },
      {
        day: 5,
        title: "Free Day",
        description:
          "Relax at the hotel, explore cafés, or shop for Himachali souvenirs.",
      },
      {
        day: 6,
        title: "Return Journey",
        description: "Checkout and depart for Delhi with scenic memories.",
      },
    ],
    inclusions: [
      "5 nights stay in Manali",
      "Daily breakfast & dinner",
      "Sightseeing by private vehicle",
      "Driver allowances & tolls as applicable",
    ],
    exclusions: [
      "Adventure activity fees",
      "Lunch",
      "Personal expenses",
      "Anything not mentioned in inclusions",
    ],
    hotels: [
      "Well-reviewed 3★ hotels in Manali",
      "Heating arrangements as per season",
    ],
    transportation: [
      "Private tempo traveller / innova / sedan as per group size",
      "Volvo option available on request",
    ],
    importantInfo: [
      "Snowfall and road conditions can affect sightseeing",
      "Carry warm clothing especially in winter months",
    ],
    faqs: [
      {
        question: "Is Rohtang included?",
        answer:
          "Rohtang access depends on permits and weather. We include Solang and can add Rohtang where feasible.",
      },
    ],
  },
  {
    id: "3",
    slug: "kashmir-paradise-tour",
    name: "Kashmir Paradise Tour",
    destination: "Kashmir",
    destinationSlug: "kashmir",
    duration: "5N / 6D",
    nights: 5,
    days: 6,
    startingPrice: 18999,
    originalPrice: 23999,
    emiFrom: 3167,
    category: "domestic",
    tripType: "honeymoon",
    rating: 4.8,
    reviewCount: 142,
    badge: "Honeymoon Special",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1566837497312-7be7830ae9b1?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566837497312-7be7830ae9b1?w=1200&q=80",
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    ],
    highlights: [
      "Shikara ride on Dal Lake",
      "Gulmarg day trip",
      "Pahalgam valleys",
      "Mughal gardens",
    ],
    overview:
      "Experience the best of Kashmir across Srinagar, Gulmarg and Pahalgam with scenic stays, local cuisine suggestions and carefully paced sightseeing.",
    itinerary: [
      {
        day: 1,
        title: "Arrive Srinagar",
        description:
          "Transfer to hotel/houseboat. Evening shikara ride on Dal Lake.",
      },
      {
        day: 2,
        title: "Srinagar Local",
        description:
          "Visit Mughal Gardens, local markets and optional traditional lunch experience.",
      },
      {
        day: 3,
        title: "Gulmarg Excursion",
        description:
          "Day trip to Gulmarg for meadows, views and optional gondola ride.",
      },
      {
        day: 4,
        title: "Pahalgam",
        description:
          "Drive to Pahalgam. Explore Betaab / Aru valleys as per local permissions.",
      },
      {
        day: 5,
        title: "Return to Srinagar",
        description: "Leisure morning and transfer back to Srinagar.",
      },
      {
        day: 6,
        title: "Departure",
        description: "Airport transfer and farewell.",
      },
    ],
    inclusions: [
      "5 nights accommodation",
      "Daily breakfast",
      "Private transfers & sightseeing",
      "Shikara ride (shared/private as per plan)",
    ],
    exclusions: [
      "Gondola tickets",
      "Pony rides",
      "Meals not mentioned",
      "Airfare",
    ],
    hotels: [
      "Premium 3★ / 4★ hotels or deluxe houseboat options",
    ],
    transportation: [
      "Private AC vehicle throughout the tour",
    ],
    importantInfo: [
      "Some valley roads may require local taxis",
      "Carry valid ID for all travellers",
    ],
    faqs: [
      {
        question: "Is houseboat stay included?",
        answer:
          "Houseboat can be included for 1 night on request at an adjusted price.",
      },
    ],
  },
  {
    id: "4",
    slug: "rajasthan-royal-circuit",
    name: "Rajasthan Royal Circuit",
    destination: "Rajasthan",
    destinationSlug: "rajasthan",
    duration: "6N / 7D",
    nights: 6,
    days: 7,
    startingPrice: 21999,
    originalPrice: 26999,
    emiFrom: 3667,
    category: "domestic",
    tripType: "family",
    rating: 4.5,
    reviewCount: 88,
    badge: "Family Favourite",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80",
    ],
    highlights: [
      "Jaipur – Udaipur – Jodhpur circuit",
      "Amber Fort visit",
      "Lake Pichola evening",
      "Heritage photo stops",
    ],
    overview:
      "A cultural circuit through Rajasthan's iconic cities with heritage sightseeing, market walks and comfortable hotel stays. Great for families and first-time visitors to royal India.",
    itinerary: [
      {
        day: 1,
        title: "Arrive Jaipur",
        description: "Check-in and evening visit to local bazaars.",
      },
      {
        day: 2,
        title: "Jaipur Sightseeing",
        description: "Amber Fort, City Palace, Jantar Mantar and Hawa Mahal photo stop.",
      },
      {
        day: 3,
        title: "Jaipur to Jodhpur",
        description: "Drive to the Blue City and evening leisure.",
      },
      {
        day: 4,
        title: "Jodhpur Local",
        description: "Mehrangarh Fort and Jaswant Thada with market time.",
      },
      {
        day: 5,
        title: "Jodhpur to Udaipur",
        description: "Scenic drive to the City of Lakes.",
      },
      {
        day: 6,
        title: "Udaipur Sightseeing",
        description: "City Palace, Fateh Sagar and optional boat ride on Lake Pichola.",
      },
      {
        day: 7,
        title: "Departure",
        description: "Checkout and onward transfer.",
      },
    ],
    inclusions: [
      "6 nights hotel stay",
      "Daily breakfast",
      "Private vehicle for the circuit",
      "Monument parking & driver charges as applicable",
    ],
    exclusions: [
      "Monument entry tickets",
      "Boat ride charges",
      "Lunch & dinner",
      "Guide fees",
    ],
    hotels: ["Handpicked 3★ / 4★ hotels in each city"],
    transportation: ["Private AC sedan / SUV / tempo as per group size"],
    importantInfo: [
      "Summer temperatures can be high — prefer Oct–Mar travel",
      "Wear comfortable footwear for fort visits",
    ],
    faqs: [
      {
        question: "Can Jaisalmer be added?",
        answer: "Yes, we can extend the circuit with a desert safari overnight.",
      },
    ],
  },
  {
    id: "5",
    slug: "kerala-backwater-retreat",
    name: "Kerala Backwater Retreat",
    destination: "Kerala",
    destinationSlug: "kerala",
    duration: "5N / 6D",
    nights: 5,
    days: 6,
    startingPrice: 16999,
    originalPrice: 20999,
    emiFrom: 2833,
    category: "domestic",
    tripType: "honeymoon",
    rating: 4.7,
    reviewCount: 74,
    badge: "Monsoon Escape",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=1200&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&q=80",
    ],
    highlights: [
      "Munnar tea gardens",
      "Alleppey houseboat night",
      "Backwater village views",
      "Kerala cuisine experiences",
    ],
    overview:
      "A soothing South India escape combining Munnar's misty hills with a classic Alleppey houseboat stay — ideal for honeymoons and peaceful family holidays.",
    itinerary: [
      {
        day: 1,
        title: "Arrive Cochin – Munnar",
        description: "Drive to Munnar with tea estate views en route.",
      },
      {
        day: 2,
        title: "Munnar Sightseeing",
        description: "Tea Museum, viewpoints and local markets.",
      },
      {
        day: 3,
        title: "Munnar to Alleppey",
        description: "Transfer to houseboat. Cruise through canals with onboard meals.",
      },
      {
        day: 4,
        title: "Alleppey Leisure",
        description: "Checkout from boat and relax at a resort / hotel.",
      },
      {
        day: 5,
        title: "Optional Beach / Spa",
        description: "Free day for Ayurveda session or nearby beach visit.",
      },
      {
        day: 6,
        title: "Departure",
        description: "Transfer to Cochin airport/railway station.",
      },
    ],
    inclusions: [
      "Hotel + 1 night deluxe houseboat",
      "Breakfast daily; all meals on houseboat",
      "Private transfers",
    ],
    exclusions: [
      "Airfare",
      "Ayurveda treatments",
      "Personal expenses",
    ],
    hotels: ["Resort-style stays in Munnar & Alleppey"],
    transportation: ["Private AC vehicle"],
    importantInfo: [
      "Houseboat AC usually operates 21:00–06:00",
      "Monsoon travel is lush but some outdoor plans may change",
    ],
    faqs: [
      {
        question: "Is this good for honeymoon?",
        answer: "Yes — we can add flower bed decoration, cake and candlelight dinner options.",
      },
    ],
  },
  {
    id: "6",
    slug: "dubai-delight",
    name: "Dubai Delight",
    destination: "Dubai",
    destinationSlug: "dubai",
    duration: "4N / 5D",
    nights: 4,
    days: 5,
    startingPrice: 34999,
    originalPrice: 42999,
    emiFrom: 5833,
    category: "international",
    tripType: "family",
    rating: 4.6,
    reviewCount: 110,
    badge: "International Deal",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80",
    ],
    highlights: [
      "City tour with Burj photo stop",
      "Desert safari with BBQ dinner",
      "Dubai Marina evening",
      "Shopping time at major malls",
    ],
    overview:
      "A compact yet memorable Dubai holiday covering iconic city sights, desert adventure and leisure shopping — designed for Indian families and first-time international travellers.",
    itinerary: [
      {
        day: 1,
        title: "Arrive Dubai",
        description: "Airport transfer and hotel check-in. Evening at leisure.",
      },
      {
        day: 2,
        title: "Dubai City Tour",
        description:
          "Visit Dubai Frame (photo stop), Jumeirah area, Burj Khalifa viewpoint area and Dubai Mall.",
      },
      {
        day: 3,
        title: "Desert Safari",
        description:
          "Afternoon dune bashing, camel photo stop, cultural shows and BBQ dinner in the desert camp.",
      },
      {
        day: 4,
        title: "Marina & Leisure",
        description: "Free day for Marina walk, optional theme parks or shopping.",
      },
      {
        day: 5,
        title: "Departure",
        description: "Checkout and airport transfer.",
      },
    ],
    inclusions: [
      "4 nights hotel stay with breakfast",
      "Airport transfers",
      "Half-day city tour",
      "Desert safari with dinner",
    ],
    exclusions: [
      "International airfare",
      "UAE visa fees",
      "Burj Khalifa tickets",
      "Personal expenses & lunches",
    ],
    hotels: ["4★ hotels in convenient Dubai locations"],
    transportation: ["Private/SIC transfers as per selected plan"],
    importantInfo: [
      "Passport validity of at least 6 months recommended",
      "Visa processing timelines vary — apply early",
    ],
    faqs: [
      {
        question: "Do you help with visa?",
        answer:
          "We guide you through tourist visa documentation and preferred processing channels.",
      },
    ],
  },
  {
    id: "7",
    slug: "bali-bliss",
    name: "Bali Bliss",
    destination: "Bali",
    destinationSlug: "bali",
    duration: "5N / 6D",
    nights: 5,
    days: 6,
    startingPrice: 42999,
    originalPrice: 51999,
    emiFrom: 7167,
    category: "international",
    tripType: "honeymoon",
    rating: 4.7,
    reviewCount: 86,
    badge: "Honeymoon Hit",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80",
    ],
    highlights: [
      "Ubud cultural day",
      "Uluwatu temple sunset",
      "Beach leisure time",
      "Balinese spa experience",
    ],
    overview:
      "A romantic Bali holiday mixing Ubud's temples and rice terraces with coastal sunsets — crafted for couples and honeymooners seeking a soft international escape.",
    itinerary: [
      {
        day: 1,
        title: "Arrive Bali",
        description: "Airport transfer and hotel check-in. Evening at leisure.",
      },
      {
        day: 2,
        title: "Ubud Highlights",
        description:
          "Visit rice terraces, a local temple circuit and artisan villages.",
      },
      {
        day: 3,
        title: "Uluwatu & Beaches",
        description: "Cliffside temple visit and coastal leisure time.",
      },
      {
        day: 4,
        title: "Leisure & Spa",
        description: "Free day for beach clubs, shopping or spa.",
      },
      {
        day: 5,
        title: "Island Leisure",
        description: "Optional day trip or resort downtime.",
      },
      {
        day: 6,
        title: "Departure",
        description: "Checkout and airport transfer.",
      },
    ],
    inclusions: [
      "5 nights hotel with breakfast",
      "Airport transfers",
      "Ubud sightseeing",
      "Uluwatu visit",
    ],
    exclusions: [
      "International airfare",
      "Visa on arrival fees",
      "Lunches & dinners",
      "Personal expenses",
    ],
    hotels: ["4★ hotels in Ubud / Seminyak areas as per plan"],
    transportation: ["Private transfers for included sightseeing"],
    importantInfo: [
      "Passport validity of at least 6 months recommended",
      "Dress modestly for temple visits",
    ],
    faqs: [
      {
        question: "Is this good for honeymoon?",
        answer:
          "Yes — we can add flower décor, cake and private dinner options on request.",
      },
    ],
  },
  {
    id: "8",
    slug: "thailand-escape",
    name: "Thailand Escape",
    destination: "Thailand",
    destinationSlug: "thailand",
    duration: "5N / 6D",
    nights: 5,
    days: 6,
    startingPrice: 29999,
    originalPrice: 36999,
    emiFrom: 5000,
    category: "international",
    tripType: "family",
    rating: 4.5,
    reviewCount: 142,
    badge: "Value Pick",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=80",
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200&q=80",
      "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=1200&q=80",
    ],
    highlights: [
      "Bangkok city & temples",
      "Phuket beach stay",
      "Optional island hop",
      "Shopping & street food",
    ],
    overview:
      "A balanced Thailand holiday covering Bangkok highlights and Phuket beaches — ideal for families and first-time international travellers looking for great value.",
    itinerary: [
      {
        day: 1,
        title: "Arrive Bangkok",
        description: "Airport transfer and hotel check-in.",
      },
      {
        day: 2,
        title: "Bangkok Sightseeing",
        description: "Temples, city views and local markets.",
      },
      {
        day: 3,
        title: "Fly to Phuket",
        description: "Transfer to Phuket hotel. Beach evening.",
      },
      {
        day: 4,
        title: "Phuket Leisure",
        description: "Beach day with optional island tour.",
      },
      {
        day: 5,
        title: "Free Day",
        description: "Shopping, spa or water activities.",
      },
      {
        day: 6,
        title: "Departure",
        description: "Checkout and airport transfer.",
      },
    ],
    inclusions: [
      "5 nights hotel with breakfast",
      "Airport transfers",
      "Bangkok city tour",
      "Internal flight guidance support",
    ],
    exclusions: [
      "International airfare",
      "Visa fees if applicable",
      "Internal flights (quoted separately)",
      "Personal expenses",
    ],
    hotels: ["3★ / 4★ hotels in Bangkok & Phuket"],
    transportation: ["Private/SIC transfers as per plan"],
    importantInfo: [
      "Passport validity of at least 6 months recommended",
      "Internal flights timed to your preferred dates",
    ],
    faqs: [
      {
        question: "Can you do only Phuket or only Bangkok?",
        answer: "Yes — share your preference and we will customise the plan.",
      },
    ],
  },
  {
    id: "9",
    slug: "singapore-sparkle",
    name: "Singapore Sparkle",
    destination: "Singapore",
    destinationSlug: "singapore",
    duration: "3N / 4D",
    nights: 3,
    days: 4,
    startingPrice: 38999,
    originalPrice: 45999,
    emiFrom: 6500,
    category: "international",
    tripType: "family",
    rating: 4.6,
    reviewCount: 98,
    badge: "Family Favourite",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200&q=80",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&q=80",
    ],
    highlights: [
      "City tour highlights",
      "Gardens by the Bay",
      "Sentosa day",
      "Marina Bay evening",
    ],
    overview:
      "A short, polished Singapore city break for families and couples — iconic sights, Sentosa fun and easy planning from India.",
    itinerary: [
      {
        day: 1,
        title: "Arrive Singapore",
        description: "Airport transfer and evening Marina Bay stroll.",
      },
      {
        day: 2,
        title: "City & Gardens",
        description: "City tour with Gardens by the Bay photo stops.",
      },
      {
        day: 3,
        title: "Sentosa Day",
        description: "Sentosa attractions and beach time.",
      },
      {
        day: 4,
        title: "Departure",
        description: "Checkout and airport transfer.",
      },
    ],
    inclusions: [
      "3 nights hotel with breakfast",
      "Airport transfers",
      "Half-day city tour",
      "Sentosa entry guidance",
    ],
    exclusions: [
      "International airfare",
      "Attraction tickets unless specified",
      "Lunches & dinners",
      "Personal expenses",
    ],
    hotels: ["4★ hotels near city / harbour area"],
    transportation: ["Private/SIC transfers as per plan"],
    importantInfo: [
      "Passport validity of at least 6 months recommended",
      "Universal Studios tickets available as add-on",
    ],
    faqs: [
      {
        question: "Is Singapore good for kids?",
        answer:
          "Yes — Sentosa, gardens and compact city travel make it very family-friendly.",
      },
    ],
  },
  {
    id: "10",
    slug: "maldives-serenity",
    name: "Maldives Serenity",
    destination: "Maldives",
    destinationSlug: "maldives",
    duration: "4N / 5D",
    nights: 4,
    days: 5,
    startingPrice: 59999,
    originalPrice: 74999,
    emiFrom: 10000,
    category: "international",
    tripType: "honeymoon",
    rating: 4.8,
    reviewCount: 74,
    badge: "Luxury Escape",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1200&q=80",
    ],
    highlights: [
      "Resort island stay",
      "Lagoon views",
      "Snorkelling time",
      "Couples dinner option",
    ],
    overview:
      "A serene Maldives island holiday for couples — turquoise lagoons, resort downtime and celebration-ready stays tailored to your budget.",
    itinerary: [
      {
        day: 1,
        title: "Arrive Maldives",
        description: "Speedboat/seaplane transfer to resort and check-in.",
      },
      {
        day: 2,
        title: "Island Leisure",
        description: "Beach time, pool and optional snorkelling.",
      },
      {
        day: 3,
        title: "Lagoon Day",
        description: "Free day for spa, water sports or sunset cruise.",
      },
      {
        day: 4,
        title: "Romance & Relax",
        description: "Optional couples dinner and resort experiences.",
      },
      {
        day: 5,
        title: "Departure",
        description: "Checkout and transfer to airport.",
      },
    ],
    inclusions: [
      "4 nights resort stay with meal plan as quoted",
      "Speedboat / seaplane transfers as per resort",
      "Resort leisure access",
    ],
    exclusions: [
      "International airfare",
      "Premium water villa upgrades",
      "Paid water sports",
      "Personal expenses",
    ],
    hotels: ["Selected 4★ / 5★ resort islands as per budget"],
    transportation: ["Resort transfer by speedboat or seaplane"],
    importantInfo: [
      "Passport validity of at least 6 months recommended",
      "Transfer type depends on resort location",
    ],
    faqs: [
      {
        question: "Can we upgrade to a water villa?",
        answer:
          "Yes — share your dates and we will quote beach vs water villa options.",
      },
    ],
  },
];

export function getPackageBySlug(slug: string): TourPackage | undefined {
  return packages.find((p) => p.slug === slug);
}

export function getFeaturedPackages(): TourPackage[] {
  return packages.filter((p) => p.featured);
}

export function getPackagesByDestination(destinationSlug: string): TourPackage[] {
  return packages.filter((p) => p.destinationSlug === destinationSlug);
}

export function getPackagesByCategory(
  category: TourPackage["category"],
): TourPackage[] {
  return packages.filter((p) => p.category === category);
}

export function getDiscountPercent(tour: TourPackage): number | null {
  if (!tour.originalPrice || tour.originalPrice <= tour.startingPrice) {
    return null;
  }
  return Math.round(
    ((tour.originalPrice - tour.startingPrice) / tour.originalPrice) * 100,
  );
}
