import React from "react";
import Image from "next/image";

// --- CONSTANTS ---
const COLORS = {
  ESPRESSO: "#371E10",
  GOLD: "#CD9860",
  WHITE: "#FFFFFF",
  LINEN: "#F9F0EB",
};

// --- HELPER: CONVERT DRIVE LINKS TO IMAGE SRC ---
const getGoogleDriveImage = (url: string) => {
  if (!url) return "/placeholder.jpg";
  if (!url.includes("drive.google.com")) return url;

  const idMatch = url.match(/\/d\/(.*?)\/|id=(.*?)(&|$)/);
  const fileId = idMatch ? idMatch[1] || idMatch[2] : null;

  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  return url;
};

// --- INTERFACES ---
export interface CoinItem {
  _id?: string;
  id?: string | number;
  title: string;
  price: number;
  image: string;
  description?: string;
  tags: string[];
  insta_reel?: string;
  video_link?: string;
}

interface ProductCardProps {
  item: CoinItem;
  onClick: (item: CoinItem) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, onClick }) => {
  return (
    <div
      className="group flex flex-col cursor-pointer p-3 md:p-4 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white"
      style={{ border: `1px solid ${COLORS.ESPRESSO}10` }}
      onClick={() => onClick(item)}
    >
      {/* Image Card */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3 md:mb-4 bg-[#E5DACE] shadow-inner">
        <Image
          src={getGoogleDriveImage(item.image)}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Price Badge Removed from here */}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        {/* Title and Price Row */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg md:text-xl font-serif text-[#371E10] leading-tight group-hover:text-[#CD9860] transition-colors text-left">
            {item.title}
          </h3>
          <span className="text-sm md:text-base font-bold text-[#371E10] whitespace-nowrap shrink-0">
            ₹{item.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
