# Katalog

Katalog is a modern, responsive, and dynamic multi-category product catalog built with **Next.js 15**, **Tailwind CSS**, and **TypeScript**. It allows users to explore various categories like Cars, Phones, Bikes, and Computers with a premium user interface and seamless navigation.

## Key Features

-   **Dynamic Multi-Category Layout**: Automatically groups and renders items from different categories (Cars, Phones, Bikes, etc.) based on a JSON data structure.
-   **Intelligent Item Details**: A dedicated detail page for every item that dynamically renders specific technical properties (e.g., "RPM" for Cars vs "Lens Type" for Phones).
-   **Advanced Search**: A real-time, expanding search bar in the header with instant suggestions and thumbnails.
-   **Spec Comparison**: An interactive comparison feature on item pages to see how products stack up against competitors in the same category.
-   **Premium Design System**: A centralized design system using tokens for colors, spacing, typography, and shadows to ensure consistent and maintainable styling.
-   **Fully Responsive**: Optimised for Mobile, Tablet, and Desktop with a mobile-first approach.

## Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Icons/Images**: Custom iconography and high-quality product imagery.

## Design System

Katalog uses a centralized design token system located in the `style/` directory. This ensures that the entire application remains maintainable and visually consistent.

-   **[`style/theme.ts`]**: Contains the color palette (Primary, Secondary, Tertiary, Neutral, Accent, Surface, etc.).
-   **[`style/design.ts`]**: Contains sizing tokens for Padding, Margin, Gap, Border Radius, Shadows, and Typography.

> [!TIP]
> To change the look and feel of the entire app, you only need to modify these two files.

## 📂 Project Structure

```text
katalog/
├── app/                  # Next.js App Router pages
│   ├── Home/             # Homepage with category overview
│   ├── Categories/       # Full catalog listing
│   ├── ItemDetail/       # Dynamic product detail pages
│   └── layout.tsx        # Root layout with Header and global providers
├── components/           # Reusable UI components
│   ├── Box.tsx           # Layout container with design token support
│   ├── Button.tsx        # Styled buttons using theme tokens
│   ├── Header.tsx        # Responsive navigation and search
│   └── Item.tsx          # Product card component
├── style/                # Centralized design system
│   ├── theme.ts          # Color tokens
│   ├── design.ts         # Sizing and typography tokens
│   └── globals.css       # Global CSS and Tailwind directives
├── utils/                # Utility functions and data
│   └── data.json         # Mock database of catalog items
└── public/               # Static assets (images, logos)
```

## Getting Started

### Prerequisites

-   Node.js (Latest LTS version recommended)
-   npm, yarn, pnpm, or bun

### Installation

1.  Clone the repository or download the source code.
2.  Install dependencies:

```bash
npm install
```

3.  Run the development server:

```bash
npm run dev
```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Data Structure

The application is powered by `utils/data.json`. To add or modify items, simply update this file. Each item follows this structure:

```json
{
  "itemname": "Item Name",
  "category": "Category Name",
  "image": "/path/to/image.jpg",
  "itemprops": [
    { "label": "Property Name", "value": "Property Value" }
  ]
}
```

---

Designed and Built by Srikanth Raju N.
