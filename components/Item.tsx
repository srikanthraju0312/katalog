import React from 'react';
import Link from 'next/link';
import { Box } from './Box';
import { design } from '../style/design';
import { colors } from '../style/theme';

interface ItemProps {
  itemname: string;
  category: string;
  image: string;
}

export const Item: React.FC<ItemProps> = ({ itemname, category, image }) => {
  return (
    <Link href={`/ItemDetail/${encodeURIComponent(itemname)}`} className="block group">
      <Box
        bgColor="white"
        borderRadius="md"
        className={`${design.shadow.sm} overflow-hidden hover:${design.shadow.md} transition-shadow h-full flex flex-col`}
      >
        <div className={`relative w-full ${design.size.imageCard} overflow-hidden ${colors.surface.bg}`}>
          <img
            src={image}
            alt={itemname}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className={`${design.padding.sm} flex-grow flex flex-col justify-between`}>
          <div>
            <span className={`inline-block ${design.padding.badge} mb-2 ${design.typography.small} font-semibold ${colors.secondary.text} ${colors.accent.lightBg} ${design.borderRadius.full}`}>
              {category}
            </span>
            <h3 className={`${design.typography.h4} ${colors.primary.text} line-clamp-2`}>
              {itemname}
            </h3>
          </div>
          <div className={`mt-4 ${design.typography.caption} font-medium ${colors.subtle.text} group-hover:${colors.accent.text} flex items-center transition-colors`}>
            View Details
            <span className="ml-1">→</span>
          </div>
        </div>
      </Box>
    </Link>
  );
};
