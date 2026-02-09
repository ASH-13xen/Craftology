// data/envelopedata.ts

export interface EnvelopeItem {
  id: string;
  title: string;
  price: number;
  image: string;
  insta_reel: string; // URL to the reel
  tags: string[];
}

export const TAGS = [
  "All",
  "Diwali",
  "Raksha Bandhan",
  "Wedding",
  "Birthday",
  "Anniversary",
  "Baby Shower",
  "Shagun",
  "House Warming",
];

export const envelopeData: EnvelopeItem[] = [
  // Page 1 Data (Mixed)
  {
    id: "1",
    title: "Royal Crimson Velvet",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1596277277688-662767980339?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example1",
    tags: ["Wedding", "Shagun"],
  },
  {
    id: "2",
    title: "Gold Foil Mandala",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1606103920295-972d6725a1e6?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example2",
    tags: ["Diwali", "House Warming"],
  },
  {
    id: "3",
    title: "Pastel Floral Keep",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example3",
    tags: ["Birthday", "Anniversary"],
  },
  {
    id: "4",
    title: "Ivory & Pearl Shagun",
    price: 550,
    image:
      "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example4",
    tags: ["Wedding", "Shagun"],
  },
  {
    id: "5",
    title: "Teal Peacock Motif",
    price: 320,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example5",
    tags: ["Raksha Bandhan", "Diwali"],
  },
  {
    id: "6",
    title: "Baby Blue Stork",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example6",
    tags: ["Baby Shower"],
  },
  {
    id: "7",
    title: "Rustic Jute Texture",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1606820875618-2e06c11d0442?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example7",
    tags: ["House Warming"],
  },
  {
    id: "8",
    title: "Rose Gold Elegance",
    price: 400,
    image:
      "https://images.unsplash.com/photo-1527652758-c57657904095?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example8",
    tags: ["Anniversary", "Wedding"],
  },

  // Page 2 Data
  {
    id: "9",
    title: "Marigold Yellow",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1507643179173-39db4f92c827?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example9",
    tags: ["Diwali", "Raksha Bandhan"],
  },
  {
    id: "10",
    title: "Lavender Bliss",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example10",
    tags: ["Birthday", "Baby Shower"],
  },
  {
    id: "11",
    title: "Emerald Suede",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1550596334-7bb40a71b6bc?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example11",
    tags: ["Wedding", "Shagun"],
  },
  {
    id: "12",
    title: "Lotus Pink Cutout",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example12",
    tags: ["Raksha Bandhan", "Diwali"],
  },
  {
    id: "13",
    title: "Minimalist White",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example13",
    tags: ["House Warming", "Anniversary"],
  },
  {
    id: "14",
    title: "Confetti Celebration",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example14",
    tags: ["Birthday"],
  },
  {
    id: "15",
    title: "Vintage Paisley",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1542370285-b8eb836e6e99?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example15",
    tags: ["Shagun", "Wedding"],
  },
  {
    id: "16",
    title: "Oh Baby Clouds",
    price: 210,
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example16",
    tags: ["Baby Shower"],
  },

  // Page 3 Data
  {
    id: "17",
    title: "Silver Lining",
    price: 330,
    image:
      "https://images.unsplash.com/photo-1607513549845-635581b75249?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example17",
    tags: ["Anniversary", "House Warming"],
  },
  {
    id: "18",
    title: "Traditional Red & Gold",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example18",
    tags: ["Diwali", "Raksha Bandhan", "Shagun"],
  },
  {
    id: "19",
    title: "Boho Chic Kraft",
    price: 190,
    image:
      "https://images.unsplash.com/photo-1593060201062-8e7c152434f0?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example19",
    tags: ["Birthday"],
  },
  {
    id: "20",
    title: "Luxury Silk Blend",
    price: 700,
    image:
      "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example20",
    tags: ["Wedding"],
  },
  {
    id: "21",
    title: "Ganesh Motif Orange",
    price: 240,
    image:
      "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example21",
    tags: ["Diwali", "House Warming"],
  },
  {
    id: "22",
    title: "Cute Animal Print",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example22",
    tags: ["Baby Shower", "Birthday"],
  },
  {
    id: "23",
    title: "Elegant Rakhi Holder",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1628151016024-bb9a29112f8c?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example23",
    tags: ["Raksha Bandhan"],
  },
  {
    id: "24",
    title: "Golden Hour Shimmer",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example24",
    tags: ["Anniversary", "Wedding"],
  },

  // Page 4 Data
  {
    id: "25",
    title: "Abstract Art",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example25",
    tags: ["Birthday"],
  },
  {
    id: "26",
    title: "Mughal Jaali Pattern",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1601366533287-59b98d0f9890?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example26",
    tags: ["Wedding", "Shagun"],
  },
  {
    id: "27",
    title: "Welcome Home Green",
    price: 260,
    image:
      "https://images.unsplash.com/photo-1596277277688-662767980339?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example27",
    tags: ["House Warming"],
  },
  {
    id: "28",
    title: "Gender Reveal Pop",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example28",
    tags: ["Baby Shower"],
  },
  {
    id: "29",
    title: "Festive Sparkle",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example29",
    tags: ["Diwali", "Raksha Bandhan"],
  },
  {
    id: "30",
    title: "Timeless White & Gold",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example30",
    tags: ["Anniversary", "Wedding", "Shagun"],
  },
];
