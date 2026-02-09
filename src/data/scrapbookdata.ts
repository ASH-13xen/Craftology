export interface ScrapbookItem {
  id: string;
  title: string;
  price: number;
  image: string;
  insta_reel: string;
  description?: string;
}

export const scrapbookData: ScrapbookItem[] = [
  {
    id: "s1",
    title: "Vintage Travel Journal",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example1",
    description:
      "Leather-bound look with aged paper, pockets for tickets, and world map inserts.",
  },
  {
    id: "s2",
    title: "Baby's First Year",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example2",
    description:
      "Pastel themed record book with monthly milestones, footprint spaces, and photo flaps.",
  },
  {
    id: "s3",
    title: "Explosion Box (3 Layers)",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example3",
    description:
      "A box that explodes into layers of photos and messages when opened.",
  },
  {
    id: "s4",
    title: "Anniversary Love Chronicle",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example4",
    description:
      "Romantic red and black theme with waterfalls, sliders, and secret notes.",
  },
  {
    id: "s5",
    title: "Accordion Mini Album",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1606820875618-2e06c11d0442?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example5",
    description:
      "Compact zigzag album perfect for carrying 10-12 mini polaroids.",
  },
  {
    id: "s6",
    title: "Best Friend Memory Book",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1527652758-c57657904095?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example6",
    description:
      "Fun, pop-art style scrapbook with 'Partner in Crime' quotes and bright colors.",
  },
  {
    id: "s7",
    title: "Wedding Planner Diary",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example7",
    description:
      "Structured planner for brides-to-be with checklists, mood boards, and vendor contacts.",
  },
  {
    id: "s8",
    title: "Retirement Guest Book",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1596277277688-662767980339?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example8",
    description:
      "Elegant hardcover book for colleagues to write farewell messages.",
  },
  {
    id: "s9",
    title: "Recipe Scrapbook",
    price: 1100,
    image:
      "https://images.unsplash.com/photo-1606103920295-972d6725a1e6?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example9",
    description: "Kitchen-themed journal to pass down family recipes.",
  },
  {
    id: "s10",
    title: "Graduation Adventure Book",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=800",
    insta_reel: "https://instagram.com/reel/example10",
    description: "'Up' movie inspired adventure book for new graduates.",
  },
];
