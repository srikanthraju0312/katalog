import React from 'react';
import Link from 'next/link';
import data from '@/utils/data.json';
import { Item } from '@/components/Item';
import { design } from '@/style/design';
import { colors } from '@/style/theme';

export default function Home() {
  // Group items by category
  const categorizedData = data.reduce((acc: Record<string, typeof data>, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(categorizedData);
  const promotedItem = data.find((i) => i.itemname === 'MacBook Pro M3') || data[0];

  return (
    <div className={`${design.maxWidth.page} mx-auto ${design.padding.section}`}>

      {/* Hero Banner / Promoted Item */}
      {promotedItem && (
        <Link href={`/ItemDetail/${encodeURIComponent(promotedItem.itemname)}`} className={`block mb-16 relative ${design.borderRadius["3xl"]} overflow-hidden group ${design.shadow.lg} hover:${design.shadow.xl} transition-shadow cursor-pointer`}>
          <div className={`absolute top-4 right-4 z-20 ${colors.overlay.black20} backdrop-blur-sm ${colors.white.text}/70 ${design.typography.small} font-bold ${design.padding.badge} uppercase tracking-widest ${design.borderRadius.full} border ${colors.white.border}/10`}>
            Promoted
          </div>
          <div className={`relative ${design.size.imageBanner} w-full ${colors.dark.bg}`}>
            <img
              src={promotedItem.image}
              alt={promotedItem.itemname}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${colors.overlay.black80} via-black/40 to-transparent`}></div>
            <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full md:w-2/3 lg:w-1/2">
              <span className={`inline-block ${design.padding.badge} mb-4 ${design.typography.caption} font-semibold ${colors.white.text} ${colors.accent.bg}/80 backdrop-blur-md ${design.borderRadius.full} uppercase tracking-wider`}>
                {promotedItem.category}
              </span>
              <h2 className={`text-3xl sm:text-5xl font-bold ${colors.white.text} mb-4 leading-tight`}>
                {promotedItem.itemname}
              </h2>
              <p className={`${colors.neutral.text} ${design.typography.bodyLg} mb-6 line-clamp-2`}>
                Experience cutting-edge technology and unparalleled performance with our featured {promotedItem.category.toLowerCase()}.
              </p>
              <div className={`inline-flex items-center justify-center ${design.padding.buttonSm} ${colors.white.bg} ${colors.dark.text} font-semibold ${design.borderRadius.lg} hover:${colors.surface.bg} transition-colors`}>
                Explore Now
                <svg className={`${design.size.iconSm} ml-2`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </div>
          </div>
        </Link>
      )}

      <div className="text-center mb-16">
        <h1 className={`${design.typography.h1} ${colors.primary.text} mb-4`}>
          Explore Our Categories
        </h1>
        <p className={`${design.typography.body} ${colors.muted.text} ${design.maxWidth.prose} mx-auto`}>
          Discover top-tier items across various categories including cars, bikes, phones, and computers. Find exactly what you&apos;re looking for with our detailed product specifications.
        </p>
      </div>

      <div className={design.space.section}>
        {categories.map((category) => (
          <section key={category} className={`${colors.white.bg} ${design.padding.md} sm:${design.padding.lg} ${design.borderRadius["2xl"]} ${design.shadow.sm} border ${colors.surface.border}`}>
            <div className={`flex justify-between items-end mb-6 border-b ${colors.surface.border} pb-4`}>
              <h2 className={`${design.typography.h2} ${colors.tertiary.text} capitalize`}>
                {category}
              </h2>
              <Link
                href={`/Categories#${category.toLowerCase()}`}
                className={`${design.typography.caption} font-semibold ${colors.accent.text} hover:${colors.accent.darkText} transition-colors`}
              >
                View All {category} →
              </Link>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${design.gap.md}`}>
              {categorizedData[category].slice(0, 4).map((item) => (
                <Item
                  key={item.itemname}
                  itemname={item.itemname}
                  category={item.category}
                  image={item.image}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
