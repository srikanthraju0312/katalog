"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import data from '../../../utils/data.json';
import { design } from '../../../style/design';
import { colors } from '../../../style/theme';
import { Box } from '../../../components/Box';

interface ItemDetailPageProps {
  params: React.Usable<{
    itemname: string;
  }>;
}

export default function ItemDetail({ params }: ItemDetailPageProps) {
  const { itemname } = React.use(params);
  const [showComparison, setShowComparison] = useState(false);
  const comparisonRef = useRef<HTMLDivElement>(null);

  const decodedItemName = decodeURIComponent(itemname);
  const item = data.find((i) => i.itemname === decodedItemName);

  useEffect(() => {
    if (showComparison && comparisonRef.current) {
      comparisonRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showComparison]);

  if (!item) {
    notFound();
  }

  // Get other products in the same category for comparison
  const competitors = data.filter(
    (i) => i.category === item.category && i.itemname !== item.itemname
  ).slice(0, 3); 

  // Get all unique property labels across current item and competitors
  const allLabels = Array.from(new Set([
    ...item.itemprops.map(p => p.label),
    ...competitors.flatMap(c => c.itemprops.map(p => p.label))
  ]));

  return (
    <div className={`${design.maxWidth.detail} mx-auto ${design.padding.section}`}>
      <div className="mb-6">
        <Link href="/Categories" className={`${colors.accent.text} hover:${colors.accent.darkText} flex items-center font-medium transition-colors`}>
          ← Back to Categories
        </Link>
      </div>

      <Box
        bgColor="white"
        borderRadius="xl"
        className={`${design.shadow.md} overflow-hidden border ${colors.surface.border} flex flex-col md:flex-row mb-12`}
      >
        <div className={`md:w-1/2 relative ${colors.surface.bg} ${design.size.imageBanner} md:h-auto`}>
          <img
            src={item.image}
            alt={item.itemname}
            className="w-full h-full object-cover"
          />
        </div>

        <div className={`md:w-1/2 ${design.padding.xl} flex flex-col justify-center`}>
          <div className="mb-8">
            <span className={`inline-block ${design.padding.badge} mb-4 ${design.typography.caption} font-semibold ${colors.secondary.text} ${colors.accent.lightBg} ${design.borderRadius.full} uppercase tracking-wider`}>
              {item.category}
            </span>
            <h1 className={`${design.typography.h1} ${colors.primary.text} mb-2`}>
              {item.itemname}
            </h1>
            <div className={`${design.size.dividerW} ${design.size.dividerH} ${colors.accent.bg} ${design.borderRadius.full} mb-6`}></div>
            <p className={`${colors.muted.text} leading-relaxed ${design.typography.bodyLg}`}>
              Experience the pinnacle of engineering and design with the {item.itemname}.
              This premium {item.category.toLowerCase()} offers unmatched performance and style.
            </p>
          </div>

          <div className="mb-10">
            <h3 className={`${design.typography.h3} ${colors.dark.text} mb-6 flex items-center`}>
              <svg className={`${design.size.iconMd} mr-2 ${colors.accent.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Technical Specifications
            </h3>

            <div className={`grid grid-cols-1 sm:grid-cols-2 ${design.gap.sm}`}>
              {item.itemprops.map((prop, index) => (
                <div key={index} className={`${colors.surface.bg} ${design.padding.sm} ${design.borderRadius.lg} border ${colors.surface.border} hover:${colors.accent.border}/20 transition-colors`}>
                  <div className={`${design.typography.caption} font-medium ${colors.subtle.text} mb-1`}>{prop.label}</div>
                  <div className={`font-semibold ${colors.dark.text} ${design.typography.bodyLg}`}>{prop.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className={`${colors.primary.bg} ${colors.white.text} ${design.padding.button} ${design.borderRadius.lg} font-bold ${design.typography.bodyLg} hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 flex-grow`}>
              Inquire Now
            </button>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`${design.padding.button} ${design.borderRadius.lg} font-bold ${design.typography.bodyLg} border-2 transition-all flex items-center justify-center gap-2 flex-grow ${
                showComparison
                ? `${colors.accent.lightBg} ${colors.accent.border} ${colors.accent.text} shadow-inner`
                : `${colors.white.bg} ${colors.divider.border} ${colors.dark.text} hover:${colors.accent.border} hover:${colors.accent.text}`
              }`}
            >
              <svg className={design.size.iconSm} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {showComparison ? "Hide Comparison" : "Compare Specs"}
            </button>
          </div>
        </div>
      </Box>

      {/* Comparison Table Section */}
      <div ref={comparisonRef} className="scroll-mt-24">
        {showComparison && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col mb-8">
              <h2 className={`${design.typography.h2} ${colors.dark.text} mb-2`}>Comparison Analysis</h2>
              <p className={colors.subtle.text}>See how {item.itemname} stacks up against other premium {item.category.toLowerCase()}.</p>
            </div>

            <div className={`overflow-x-auto ${design.borderRadius.xl} border ${colors.divider.border} ${design.shadow.sm} ${colors.white.bg}`}>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`${colors.surface.bg} border-b ${colors.divider.border}`}>
                    <th className={`${design.padding.cell} ${design.typography.label} ${colors.subtle.text}`}>Features</th>
                    <th className={`${design.padding.cell} ${design.typography.label} ${colors.accent.text} ${colors.accent.lightBg}/50`}>{item.itemname}</th>
                    {competitors.map(c => (
                      <th key={c.itemname} className={`${design.padding.cell} ${design.typography.label} ${colors.muted.text}`}>{c.itemname}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allLabels.map((label, idx) => (
                    <tr key={label} className={idx % 2 === 0 ? colors.white.bg : `${colors.surface.bg}/30`}>
                      <td className={`${design.padding.cell} font-medium ${colors.subtle.text} border-b ${colors.surface.border}`}>{label}</td>
                      <td className={`${design.padding.cell} font-bold ${colors.dark.text} border-b ${colors.surface.border} ${colors.accent.lightBg}/20`}>
                        {item.itemprops.find(p => p.label === label)?.value || "—"}
                      </td>
                      {competitors.map(c => (
                        <td key={c.itemname} className={`${design.padding.cell} ${colors.muted.text} border-b ${colors.surface.border}`}>
                          {c.itemprops.find(p => p.label === label)?.value || "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
