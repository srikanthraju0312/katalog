import React from 'react';
import data from '@/utils/data.json';
import { Item } from '@/components/Item';
import { design } from '@/style/design';
import { colors } from '@/style/theme';

export default function CategoriesPage() {
  // Group all items by category
  const categorizedData = data.reduce((acc: Record<string, typeof data>, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(categorizedData);

  return (
    <div className={`${design.maxWidth.page} mx-auto ${design.padding.section}`}>
      <div className="mb-12">
        <h1 className={`${design.typography.h1} ${colors.primary.text} mb-4`}>
          Product Categories
        </h1>
        <p className={`${design.typography.body} ${colors.muted.text}`}>
          Browse our complete catalog organized by industry and type.
        </p>
      </div>

      <div className={design.space.sectionLg}>
        {categories.map((category) => (
          <section key={category} id={category.toLowerCase()}>
            <div className={`flex items-center ${design.gap.sm} mb-8`}>
              <h2 className={`${design.typography.h2} ${colors.tertiary.text} capitalize`}>
                {category}
              </h2>
              <div className={`flex-grow h-px ${colors.divider.bg}`}></div>
              <span className={`${design.typography.caption} font-medium ${colors.subtle.text} ${colors.surface.bg} ${design.padding.badge} ${design.borderRadius.full} border`}>
                {categorizedData[category].length} Items
              </span>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${design.gap.lg}`}>
              {categorizedData[category].map((item) => (
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
