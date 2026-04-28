"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import data from '../utils/data.json';
import { design } from '../style/design';
import { colors } from '../style/theme';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const searchResults = useMemo(() => {
    if (searchQuery.trim().length <= 1) {
      return [];
    }

    return data.filter(item =>
      item.itemname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/Categories' },
    { name: 'About', href: '/About' },
  ];

  // Handle window width safely for SSR
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
        if (!isDesktop) {
          setIsSearchExpanded(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDesktop]);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      router.push(`/ItemDetail/${encodeURIComponent(searchResults[0].itemname)}`);
      setSearchQuery("");
      setShowSearchSuggestions(false);
      setIsSearchExpanded(false);
    }
  };

  return (
    <header className={`${colors.primary.bg} ${colors.white.text} sticky top-0 z-50 ${design.shadow.md}`}>
      <div className={`${design.maxWidth.page} mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-between items-center h-16 md:h-20 ${design.gap.sm} transition-all duration-300`}>

        {/* Left: Logo and Title */}
        <div className={`flex items-center ${design.gap.sm} transition-all duration-300 overflow-hidden ${isSearchExpanded ? 'w-14 md:w-auto' : 'flex-grow md:flex-grow-0'}`}>
          <Link href="/" className="shrink-0">
            <div className={`w-10 h-10 md:w-12 md:h-12 ${design.borderRadius.xl} flex items-center justify-center ${design.shadow.sm} overflow-hidden`}>
              <img
                src="/image/logo.png"
                alt="Katalog Logo"
                className="w-9 h-9 md:w-9 md:h-9 object-contain"
              />
            </div>
          </Link>
          <span className={`${design.typography.h3} tracking-wider font-bold transition-all duration-300 whitespace-nowrap ${isSearchExpanded ? 'opacity-0 translate-x-[-20px] md:opacity-100 md:translate-x-0' : 'opacity-100 translate-x-0'}`}>
            Katalog
          </span>
        </div>

        {/* Center/Right: Search and Nav */}
        <div className={`flex items-center ${design.gap.xs} md:gap-6 transition-all duration-300 ${isSearchExpanded ? 'flex-grow' : 'md:flex-grow-0'}`}>

          {/* Search Section */}
          <div
            ref={searchRef}
            className={`relative transition-all duration-300 ease-in-out ${
              isSearchExpanded
              ? 'flex-grow md:w-64 lg:w-96'
              : 'w-10 md:w-64 lg:w-96'
            }`}
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className={`${colors.overlay.white10} border ${colors.white.border}/20 ${design.borderRadius.full} py-2 text-white focus:text-gray-900 focus:outline-none focus:bg-white placeholder:text-blue-100/70 focus:placeholder:text-gray-400 transition-all w-full peer ${
                  isSearchExpanded || isDesktop
                  ? 'pl-10 pr-10 md:pr-4 opacity-100 pointer-events-auto'
                  : 'pl-0 pr-0 opacity-0 pointer-events-none'
                }`}
                value={searchQuery}
                onChange={(e) => {
                  const nextQuery = e.target.value;
                  setSearchQuery(nextQuery);
                  setShowSearchSuggestions(nextQuery.trim().length > 1);
                }}
                onBlur={() => {
                  if (!searchQuery && !isDesktop) {
                    setTimeout(() => {
                      if (!showSearchSuggestions) setIsSearchExpanded(false);
                    }, 200);
                  }
                }}
              />

              {/* Search Toggle/Icon */}
              <button
                type="button"
                className={`absolute left-0 top-0 w-10 h-10 flex items-center justify-center text-blue-100/70 hover:text-white peer-focus:text-gray-500 transition-colors ${isSearchExpanded ? 'pointer-events-auto' : 'md:pointer-events-none'}`}
                onClick={() => setIsSearchExpanded(true)}
              >
                <svg className={`${design.size.iconSm} md:${design.size.iconMd}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Mobile Close Search */}
              {isSearchExpanded && (
                <button
                  type="button"
                  className={`absolute right-3 md:hidden ${colors.subtle.text} p-1`}
                  onClick={() => setIsSearchExpanded(false)}
                >
                  <svg className={design.size.iconSm} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </form>

            {/* Suggestions list */}
            {showSearchSuggestions && searchResults.length > 0 && (
              <div className={`absolute mt-2 right-0 w-full md:w-[400px] lg:w-[500px] ${colors.white.bg} ${design.borderRadius.xl} ${design.shadow["2xl"]} overflow-hidden z-[60] ${colors.divider.border} animate-in fade-in zoom-in-95 duration-200`}>
                <div className="max-h-64 overflow-y-auto">
                  {searchResults.map((item) => (
                    <Link
                      key={item.itemname}
                      href={`/ItemDetail/${encodeURIComponent(item.itemname)}`}
                      onClick={() => {
                        setSearchQuery("");
                        setShowSearchSuggestions(false);
                        setIsSearchExpanded(false);
                      }}
                      className={`flex items-center ${design.gap.xs} ${design.padding.xs} hover:${colors.accent.lightBg} transition-colors border-b ${colors.surface.border} last:border-0`}
                    >
                      <img src={item.image} className={`${design.size.thumb} object-cover ${design.borderRadius.md} ${design.shadow.sm}`} alt="" />
                      <div>
                        <div className={`font-bold ${colors.dark.text} ${design.typography.caption}`}>{item.itemname}</div>
                        <div className={`${design.typography.small} ${colors.accent.text} font-medium`}>{item.category}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center gap-6 transition-all duration-300 ${isSearchExpanded ? 'lg:opacity-100 lg:pointer-events-auto opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {navLinks.map((link, i) => (
              <React.Fragment key={link.name}>
                <Link href={link.href} className={`hover:${colors.accent.lightText} transition-colors font-medium whitespace-nowrap`}>
                  {link.name}
                </Link>
                {i < navLinks.length - 1 && <span className={colors.accent.lightText + '/50'}>|</span>}
              </React.Fragment>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden p-2 ${design.borderRadius.lg} hover:${colors.overlay.white10} transition-colors focus:outline-none shrink-0 ${isSearchExpanded ? 'hidden' : 'block'}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className={design.size.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className={design.size.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className={`md:hidden ${colors.primary.darkBg} border-t ${colors.white.border}/10 animate-in slide-in-from-top duration-300`}>
          <nav className={`flex flex-col ${design.padding.sm} space-y-4`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${design.typography.nav} hover:${colors.accent.lightText} transition-colors px-2 py-1`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
