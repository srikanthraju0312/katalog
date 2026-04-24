import React from 'react';
import { design } from '@/style/design';
import { colors } from '@/style/theme';
import { Box } from '@/components/Box';

export default function AboutPage() {
  return (
    <div className={`max-w-4xl mx-auto ${design.padding.section}`}>
      <div className="text-center mb-16">
        <h1 className={`${design.typography.h1} ${colors.primary.text} mb-6`}>
          About Katalog
        </h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className={`${design.typography.h2} text-gray-900 mb-4`}>Our Vision</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Katalog was born out of a simple necessity: to provide a centralized, high-performance platform for discovering and comparing premium products across diverse industries. Whether you are looking for the latest in automotive engineering, mobile technology, or high-end computing, Katalog offers a curated experience designed for the modern connoisseur.
          </p>
        </section>

        <Box bgColor="white" borderRadius="xl" className="p-8 shadow-md border border-gray-100">
          <h2 className={`${design.typography.h3} ${colors.tertiary.text} mb-4`}>Why Choose Katalog?</h2>
          <ul className="space-y-4">
            {[
              "Unmatched category depth spanning from supercars to ultrabooks.",
              "Deep technical specifications for every single item in our inventory.",
              "Innovative comparison tools that help you make data-driven decisions.",
              "A clean, responsive interface designed for elite user experience."
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </Box>

        <section>
          <h2 className={`${design.typography.h2} text-gray-900 mb-4`}>The Future of Discovery</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            We are constantly expanding our datasets and refining our algorithms to ensure that the information you see is not just accurate, but meaningful. Katalog is more than just a list of items; it is a gateway to the next generation of product intelligence.
          </p>
        </section>

        <div className="pt-12 text-center border-t border-gray-100">
          <p className="text-gray-400 font-medium italic">
            "Everything Everyday, Organized."
          </p>
        </div>
      </div>
    </div>
  );
}
