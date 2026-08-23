export interface Milestone {
  date: string;
  title: string;
  description: string;
  image: string;
  tone?: "tone-mono" | "tone-faded" | "tone-warm" | "tone-full";
  isFinale?: boolean;
}

export interface RegistryItem {
  name: string;
  category: string;
  price?: string;
  image: string;
}

export interface RegistryCategory {
  label: string;
  items: RegistryItem[];
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface WeddingConfig {
  couple: {
    partnerOne: string;
    partnerTwo: string;
    hashtag: string;
    monogramUrl: string;
  };
  eventDate: {
    targetIso: string;
    day: string;
    month: string;
    year: string;
    displayDate: string;
    city: string;
    country: string;
  };
  quote: {
    scripture: string;
    storyIntro: string;
    storyConclusion: string;
    storyFinalWords: string;
  };
  hero: {
    backgroundImage: string;
    tagline: string;
  };
  story: Milestone[];
  schedule: Array<{
    day: string;
    time: string;
    title: string;
    location: string;
    description?: string;
  }>;
  venue: {
    name: string;
    type: string;
    city: string;
    address: string;
    mapsUrl: string;
    image: string;
  };
  registry: {
    intro: string;
    categories: RegistryCategory[];
  };
  paymentMethods: {
    momo: Array<{
      name: string;
      phone: string;
    }>;
    paypal: {
      email: string;
    };
    ecobank: {
      name: string;
      accountNumber: string;
      bankName: string;
    };
    ukBank: {
      name: string;
      iban: string;
      bicSwift: string;
      bankName: string;
      address: string;
    };
  };
  attire: {
    statement: string;
    description: string;
    note: string;
    palette: ColorSwatch[];
    women: {
      title: string;
      guidelines: string[];
    };
    men: {
      title: string;
      guidelines: string[];
    };
  };
  rsvp: {
    deadline: string;
    messagePrompt: string;
  };
  music: {
    src: string;
    label: string;
  };
}

export const weddingData: WeddingConfig = {
  couple: {
    partnerOne: "NYIAWUMUNTU",
    partnerTwo: "Seth",
    hashtag: "#lovetakesnyiawumuntu",
    monogramUrl: "/assets/logo-main.png",
  },
  eventDate: {
    targetIso: "2026-10-24T14:30:00+02:00",
    day: "24",
    month: "OCT",
    year: "2026",
    displayDate: "24 · 10 · 2026",
    city: "Kigali",
    country: "Rwanda",
  },
  quote: {
    scripture: "Every good and perfect Gift comes from the Lord.",
    storyIntro:
      "“A quiet beginning, a thousand small moments, and one slow, inevitable yes. Here is how we found each other.”",
    storyConclusion: "THE END OF THE BEGINNING",
    storyFinalWords: "then, forever.",
  },
  hero: {
    backgroundImage: "/assets/hero-couple-main.png",
    tagline: "Every good and perfect Gift comes from the Lord.",
  },
  story: [
    {
      date: "March · 2024",
      title: "Love in the Air",
      description: "Where everything started",
      image: "/assets/memories/memory-21.jpeg",
      tone: "tone-mono",
    },
      {
      date: "March · 2024",
      title: "Love in the Rain",
      description: "Where everything started",
      image: "/assets/memories/memory-36.jpeg",
      tone: "tone-mono",
    },
      {
      date: "March · 2024",
      title: "Love in the Rain with her",
      description: "Where everything started",
      image: "/assets/memories/memory-44.jpeg",
      tone: "tone-mono",
    },
     {
      date: "March · 2024",
      title: "Love in the Rain with him",
      description: "Where everything started",
      image: "/assets/memories/memory-37.jpeg",
      tone: "tone-mono",
    },
    {
      date: "May · 2024",
      title: "Love in the Rain with my man",
      description: "Came for the sermon but stayed for the fine man",
      image: "/assets/memories/memory-22.jpeg",
      tone: "tone-mono",
    },
    {
      date: "July · 2024",
      title: "Love in the Rain with my man cool",
      description: "Prophetic !!!!",
      image: "/assets/memories/memory-27.jpeg",
      tone: "tone-faded",
    },
    {
      date: "August · 2024",
      title: "Love in the Rain with my man cooling off",
      description: "Couples that feast together stay together",
      image: "/assets/memories/memory-28.jpeg",
      tone: "tone-faded",
    },
    {
      date: "November · 2024",
      title: "Love in the Rain with my man cooling on",
      description: "The Day we KNEW",
      image: "/assets/memories/memory-40.jpeg",
      tone: "tone-faded",
    },
    {
      date: "December · 2025",
      title: "Love in the Rain with my man cooling down",
      description: "Where everything came together",
      image: "/assets/memories/memory-45.jpeg",
      tone: "tone-full",
    },
  ],
  schedule: [
    {
      day: "Monday, 24 October",
      time: "9:00 AM",
      title: "Introduction and dowry presentation",
      location: "Hall of FAWE GISOZI",
    },
     {
      day: "Monday, 24 October",
      time: "02:00 PM",
      title: "Church Ceremony",
      location: "Paroisse Cathorique Sainte Famille",
    },
    {
      day: "Monday, 24 October",
      time: "4:30 PM",
      title: "Reception",
      location: "Hall of FAWE GISOZI",
    },
  ],
  venue: {
    name: "Jalia Hall",
    type: "Ceremony & Reception",
    city: "Kabuga, Kigali, Rwanda",
    address: "KG 107 St, Kabuga, Gasabo District",
    mapsUrl: "https://maps.app.goo.gl/bxf3Zb5aLi1airdKA",
    image: "/assets/venues/venue-1.jpeg",
  },
  registry: {
    intro:
      "Your presence is the truest gift. For those who have asked, we have curated a small registry to help us build our first home together.",
    categories: [
      {
        label: "Kitchen Essentials",
        items: [
          { name: "Stand Mixer", category: "Kitchen", image: "/assets/homemixer-VSdBeTzb.png" },
          { name: "High-Power Blender", category: "Kitchen", image: "/assets/blender-DuWNcTfA.jpg" },
          { name: "Cold Press Juicer", category: "Kitchen", image: "/assets/juicer-BmEGoXoD.jpg" },
          { name: "Air Fryer", category: "Kitchen", image: "/assets/air-fryer-B508lTfP.jpg" },
          { name: "Stainless Toaster", category: "Kitchen", image: "/assets/toaster-YS_xF2QW.jpg" },
          { name: "Microwave Oven", category: "Kitchen", image: "/assets/microwave-DBUJUU3G.jpg" },
          { name: "Non-Stick Cookware Set", category: "Kitchen", image: "/assets/pot-set-CMbkdRE8.jpg" },
          { name: "Chef Knife Set & Block", category: "Kitchen", image: "/assets/knife-set-NhJqIA1G.jpg" },
        ],
      },
      {
        label: "Dining & Entertaining",
        items: [
          { name: "Ceramic Dinner Plates", category: "Dining", image: "/assets/dinner-plates-d4VrNzAi.jpg" },
          { name: "Side & Salad Plates", category: "Dining", image: "/assets/small-plates-BUi9R_pO.jpg" },
          { name: "Artisan Bowls", category: "Dining", image: "/assets/bowls-2vyqKb7c.jpg" },
          { name: "Crystal Wine Glasses", category: "Dining", image: "/assets/wine-glasses-DeGOHQ55.jpg" },
          { name: "Stoneware Coffee Mugs", category: "Dining", image: "/assets/mugs-D7vjfmyF.jpg" },
          { name: "Pantry Glass Jars", category: "Dining", image: "/assets/glass-jars-BdsSFVjJ.jpg" },
          { name: "Serving Platters", category: "Dining", image: "/assets/serving-platters-BLNIqDwt.jpg" },
        ],
      },
      {
        label: "Living & Bedroom",
        items: [
          { name: "Egyptian Cotton Sheet Set", category: "Bedroom", image: "/assets/bed-sheet-set-BzdhFBQk.jpg" },
          { name: "Down Alternative Duvet", category: "Bedroom", image: "/assets/duvet-CMsMI0op.jpg" },
          { name: "Decorative Linen Pillows", category: "Living", image: "/assets/decorative-pillows-CYYPYfd-.jpg" },
          { name: "Warm Ambient Bedside Lamps", category: "Bedroom", image: "/assets/bedside-lamps-5Ja3itH2.jpg" },
          { name: "Arched Full-Length Mirror", category: "Living", image: "/assets/full-length-mirror-DspEZuKY.jpg" },
          { name: "Sunburst Wall Mirror", category: "Living", image: "/assets/decorative-mirror-dcGVNYpI.jpg" },
          { name: "Handwoven Living Room Rug", category: "Living", image: "/assets/living-room-rug-BkqirUv9.jpg" },
          { name: "Jute Dining Area Rug", category: "Dining", image: "/assets/dining-table-rug-CAgfliYu.jpg" },
        ],
      },
    ],
  },
  paymentMethods: {
    momo: [
      { name: "Courage Konmla Zoduah", phone: "+250 79 1635 407" },
      { name: "Umutesi Astride Cindy", phone: "+250 79 3766 257" },
    ],
    paypal: {
      email: "cindyastrideu@gmail.com",
    },
    ecobank: {
      name: "Zoduah Courage Konmla",
      accountNumber: "6852003706",
      bankName: "Ecobank",
    },
    ukBank: {
      name: "Astride Umutesi",
      iban: "GB36REVO00997091261296",
      bicSwift: "REVOGB21",
      bankName: "Revolut Ltd",
      address: "30 South Colonnade, E14 5HX, London, United Kingdom",
    },
  },
  attire: {
    statement: "A celebration wrapped in warmth, earth, and candlelight.",
    description: "We invite you to dress in warm earth tones inspired by candlelight, and quiet romance.",
    note: "Please avoid bright, white, black and Navy grey tones — let warmth carry the room.",
    palette: [
      { name: "Organic", hex: "#6a704c" },
      { name: "Butter", hex: "#ccb89c" },
      { name: "Coconut", hex: "#ede1d1" },
      { name: "Natural", hex: "#805f44" },
      { name: "Palm Oil", hex: "#5d250f" },
      { name: "Cocoa", hex: "#412e27" },
    ],
    women: {
      title: "Soft silhouettes",
      guidelines: [
        "Flowing silhouettes",
        "Satin, silk, chiffon, and linen",
        "Soft warm neutral tones",
      ],
    },
    men: {
      title: "Relaxed tailoring",
      guidelines: [
        "Linen suits and easy structure",
        "Earthy browns and taupes",
        "Soft textured fabrics",
      ],
    },
  },
  rsvp: {
    deadline: "1 October 2026",
    messagePrompt: "Share a note, memory, or warm wish",
  },
  music: {
    src: "/assets/wedding-theme-DH69Hzzj.mp3",
    label: "♪ tap to unmute",
  },
};
