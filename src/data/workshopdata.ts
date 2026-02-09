export interface WorkshopItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  price: number;
  locationName: string;
  locationAddress: string;
  description: string;
  image: string; // URL for a workshop vibe image
  mapEmbedUrl: string; // The iframe src
  mapLink: string; // Where to go on click
  features: string[];
}

export const nextWorkshop: WorkshopItem = {
  id: "w1",
  title: "The Resin Masterclass",
  subtitle: "Preserve Memories in Crystal Clear Art",
  date: "Sunday, October 24th, 2025",
  time: "11:00 AM – 2:00 PM",
  price: 2500,
  locationName: "Craftology Studio",
  locationAddress: "12, Lake View Road, Hauz Khas Village, New Delhi - 110016",
  description:
    "Join us for an immersive 3-hour session where you will learn the secrets of high-gloss resin art. From mixing ratios to removing bubbles and embedding dried flowers, we cover it all. All materials provided.",
  image:
    "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800",
  // Google Maps Embed URL (Hauz Khas Village generic)
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.660933753796!2d77.19277831508076!3d28.55042098245037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce26da0b6757b%3A0x6717a6c9577742d1!2sHauz%20Khas%20Village%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1626338304953!5m2!1sen!2sin",
  // Direct Link
  mapLink: "https://goo.gl/maps/HauzKhasVillage",
  features: [
    "Beginner Friendly",
    "All Materials Included",
    "Take Home Your Art",
    "Refreshments Served",
  ],
};
