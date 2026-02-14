/* eslint-disable @typescript-eslint/no-explicit-any */
import ClientHome from "@/components/ClientHome";
import { Metadata } from "next";

// Define the shape of your data based on your Mongoose models
type DataProps = {
  envelopes: any[];
  coins: any[];
  gaddis: any[];
  resin: any[];
  scrapbooks: any[];
  workshops: any[];
};

// 1. DATA FETCHING (Server-Side)
async function getBackendData(): Promise<DataProps> {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Helper to fetch data safely
  const fetchData = async (endpoint: string) => {
    try {
      // 'no-store' ensures we get fresh data on every request (SSR)
      const res = await fetch(`${backendUrl}/api/${endpoint}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return []; // Return empty array on failure so page doesn't crash
    }
  };

  // Fetch all categories in parallel
  const [envelopes, coins, gaddis, resin, scrapbooks, workshops] =
    await Promise.all([
      fetchData("envelopes"),
      fetchData("coins"),
      fetchData("gaddis"),
      fetchData("resin"),
      fetchData("scrapbooks"),
      fetchData("workshops"),
    ]);

  return { envelopes, coins, gaddis, resin, scrapbooks, workshops };
}

// 2. DYNAMIC METADATA (SEO)
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const view = (searchParams.view as string) || "home";

  // Customize these titles/descriptions for your SEO needs
  const seoMap: Record<string, { title: string; description: string }> = {
    home: {
      title: "Handmade Crafts | Home",
      description: "Discover unique handmade gifts.",
    },
    categories: {
      title: "Our Collections",
      description: "Browse all our handmade categories.",
    },
    envelopes: {
      title: "Handmade Envelopes",
      description: "Beautiful custom envelopes for every occasion.",
    },
    gaddi: {
      title: "Traditional Gaddis",
      description: "Comfortable and artistic seating.",
    },
    coin: {
      title: "Decorative Coins",
      description: "Unique coins for gifting and collection.",
    },
    resin: {
      title: "Resin Art",
      description: "Stunning handcrafted resin pieces.",
    },
    scrapbook: {
      title: "Custom Scrapbooks",
      description: "Preserve your memories with style.",
    },
    workshop: {
      title: "Join our Workshops",
      description: "Learn the art of crafting.",
    },
    contact: {
      title: "Contact Us",
      description: "Get in touch for custom orders.",
    },
  };

  const meta = seoMap[view] || seoMap["home"];

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
    },
  };
}

// 3. MAIN PAGE COMPONENT
export default async function Page({ searchParams }: Props) {
  const data = await getBackendData();
  const currentView = (searchParams.view as string) || "home";

  return <ClientHome initialView={currentView} initialData={data} />;
}
