'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronDown,
  Play,
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  // Search Filter State (Per Blueprint: Height & Age must default to "Any")
  const [premiumOnly, setPremiumOnly] = useState<'any' | 'premium_only'>('any');
  const [maritalStatus, setMaritalStatus] = useState<'any' | 'single' | 'divorced' | 'widowed'>('single');

  // Height Filter state: defaults to 'Any' per blueprint
  const [heightMode, setHeightMode] = useState<'any' | 'range'>('any');
  const [heightMin, setHeightMin] = useState<number>(60); // 5'0" (60 inches)
  const [heightMax, setHeightMax] = useState<number>(72); // 6'0" (72 inches)

  // Age Filter state: defaults to 'Any' per blueprint
  const [ageMode, setAgeMode] = useState<'any' | 'range'>('any');
  const [ageMin, setAgeMin] = useState<number>(25);
  const [ageMax, setAgeMax] = useState<number>(38);

  // Dropdown states
  const [religion, setReligion] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  const [residingIn, setResidingIn] = useState<string>('');

  // Mobile navigation drawer open/close
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Video play state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Helper to format inches to ft'in"
  const formatHeight = (inches: number) => {
    const feet = Math.floor(inches / 12);
    const remainder = inches % 12;
    return `${feet}'${remainder}"`;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (premiumOnly !== 'any') queryParams.set('tier', 'premium');
    if (maritalStatus !== 'any') queryParams.set('maritalStatus', maritalStatus);
    if (heightMode === 'range') {
      queryParams.set('heightMin', heightMin.toString());
      queryParams.set('heightMax', heightMax.toString());
    }
    if (ageMode === 'range') {
      queryParams.set('ageMin', ageMin.toString());
      queryParams.set('ageMax', ageMax.toString());
    }
    if (religion) queryParams.set('religion', religion);
    if (nationality) queryParams.set('nationality', nationality);
    if (residingIn) queryParams.set('residingIn', residingIn);

    router.push(`/search?${queryParams.toString()}`);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubmitted(true);
  };

  return (
    <div className="w-full bg-[#0D0D0E] text-[#E8E8EC] overflow-x-hidden font-sans">

      {/* ============================================================ */}
      {/* 1. NAVBAR & HERO BANNER SECTION (Using exact Figma assets: Rectangle_14345 & Black Leather Monogram) */}
      {/* ============================================================ */}
      <section className="relative w-full hero-leather-texture border-b border-[#222226] overflow-hidden">

        {/* --- Navbar --- */}
        <header className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 h-24 flex items-center justify-between">
          {/* Logo with golden foil texture */}
          <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
            <Image
              src="/assets/ptm/ptm-logo.png"
              alt="Path To Marriage"
              width={162}
              height={54}
              className="h-11 sm:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-9 lg:gap-11 text-[13px] tracking-wide text-[#CCCCCC]">
            <Link href="/help" className="hover:text-[#E8B855] transition-colors">
              About Us
            </Link>
            <Link href="/pricing" className="hover:text-[#E8B855] transition-colors">
              Pricing
            </Link>
            <span className="text-[#888888] cursor-not-allowed">
              Shop
            </span>
            <Link href="/help" className="hover:text-[#E8B855] transition-colors">
              Help
            </Link>
            <Link
              href="/signup/step-1"
              className="px-7 py-2 rounded-full border border-[#D5A74E]/80 text-[#E8B855] hover:bg-[#D5A74E]/10 font-medium text-[13px] tracking-wider transition-all"
            >
              Login
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#E8B855] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden relative z-30 bg-[#161618]/98 border-b border-[#2A2A2E] px-6 py-6 space-y-4 backdrop-blur-md">
            <Link
              href="/help"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-[#CCCCCC] hover:text-[#E8B855] py-2"
            >
              About Us
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-[#CCCCCC] hover:text-[#E8B855] py-2"
            >
              Pricing
            </Link>
            <span className="block text-sm text-[#777777] py-2">
              Shop (Coming Soon)
            </span>
            <Link
              href="/help"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-[#CCCCCC] hover:text-[#E8B855] py-2"
            >
              Help
            </Link>
            <Link
              href="/signup/step-1"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block px-7 py-2.5 rounded-full border border-[#D5A74E] text-[#E8B855] font-medium text-xs tracking-wider"
            >
              Login
            </Link>
          </div>
        )}

        {/* --- Hero Banner Content --- */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 pt-4 pb-20 lg:pt-8 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left: Monogram Area with the Original Black-Leather Monogram Watermark Background and Gold Foil Crest */}
            <div className="lg:col-span-6 flex justify-center items-center py-4 lg:py-6">
              <div className="relative w-[300px] h-[340px] sm:w-[380px] sm:h-[420px] lg:w-[460px] lg:h-[480px] flex items-center justify-center">

                {/* 1. Underlying Black-Leather Monogram Asset (Logo 2 - PTM Logomark Golden Foil Texture@4x 2 (1).png) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Image
                    src="/assets/ptm/black-leather-monogram-bg.png"
                    alt=""
                    width={646}
                    height={489}
                    className="w-full h-full object-contain opacity-80"
                    priority
                    aria-hidden="true"
                  />
                </div>

                {/* 2. Foreground Gold Foil Crest (Logo 2 - PTM Logomark Golden Foil Texture@4x 1.png) */}
                <div className="relative z-10 w-[240px] sm:w-[300px] lg:w-[340px]">
                  <Image
                    src="/assets/ptm/ptm-monogram.png"
                    alt="PTM Crest"
                    width={307}
                    height={342}
                    className="w-full h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
                    priority
                  />
                </div>

              </div>
            </div>

            {/* Right: Search Filters Card with Distinct Glassmorphic Panel & Shadow matching Frame 1321314625 */}
            <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
              <form
                onSubmit={handleSearchSubmit}
                className="w-full max-w-[490px] rounded-[24px] bg-[#161618]/90 border border-[#2B2B32] p-6 sm:p-7 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
              >
                {/* Title */}
                <h2 className="text-center font-serif text-[22px] sm:text-[24px] text-white tracking-wide mb-5">
                  Search filters
                </h2>

                {/* Filter 1: Premium Only Toggle */}
                <div className="mb-4">
                  <div className="text-[12px] text-[#A0A0A8] text-center mb-1.5 font-medium">
                    Premium only
                  </div>
                  <div className="flex rounded-full bg-[#1D1D20] p-1 border border-[#2B2B30] text-xs">
                    <button
                      type="button"
                      onClick={() => setPremiumOnly('any')}
                      className={`flex-1 py-2 text-center rounded-full font-medium transition-all cursor-pointer ${
                        premiumOnly === 'any'
                          ? 'bg-gradient-to-r from-[#DFAD48] to-[#B68429] text-black shadow-xs font-semibold'
                          : 'text-[#AAAAAA] hover:text-white'
                      }`}
                    >
                      Any
                    </button>
                    <button
                      type="button"
                      onClick={() => setPremiumOnly('premium_only')}
                      className={`flex-1 py-2 text-center rounded-full font-medium transition-all cursor-pointer ${
                        premiumOnly === 'premium_only'
                          ? 'bg-gradient-to-r from-[#DFAD48] to-[#B68429] text-black shadow-xs font-semibold'
                          : 'text-[#AAAAAA] hover:text-white'
                      }`}
                    >
                      Premium Only
                    </button>
                  </div>
                </div>

                {/* Filter 2: Marital Status 4-Button Toggle */}
                <div className="mb-5">
                  <div className="text-[12px] text-[#A0A0A8] text-center mb-1.5 font-medium">
                    Marital status
                  </div>
                  <div className="grid grid-cols-4 rounded-full bg-[#1D1D20] p-1 border border-[#2B2B30] text-xs text-center">
                    {(['any', 'single', 'divorced', 'widowed'] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setMaritalStatus(status)}
                        className={`py-2 rounded-full capitalize font-medium transition-all cursor-pointer ${
                          maritalStatus === status
                            ? 'bg-gradient-to-r from-[#DFAD48] to-[#B68429] text-black shadow-xs font-semibold'
                            : 'text-[#AAAAAA] hover:text-white'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dual Sliders: Height & Age (Blueprint Default: Any) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
                  {/* Height Slider Container */}
                  <div className="bg-[#1C1C1F] rounded-2xl p-3.5 border border-[#2B2B30]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#E0E0E6]">
                        Height <span className="text-[11px] text-[#888888] font-normal">(ft&apos;in&quot;)</span>
                      </span>
                      {/* Blueprint default is "Any" */}
                      <button
                        type="button"
                        onClick={() => setHeightMode(heightMode === 'any' ? 'range' : 'any')}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[#26262A] text-[#D5A74E] hover:bg-[#323238] font-mono cursor-pointer"
                      >
                        {heightMode === 'any' ? 'Mode: Any' : 'Mode: Custom'}
                      </button>
                    </div>

                    {heightMode === 'any' ? (
                      <div className="py-4 text-center">
                        <span className="text-xs font-medium text-[#DFAD48] bg-[#DFAD48]/10 px-3 py-1 rounded-full border border-[#DFAD48]/30">
                          Any Height (Default)
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-xs px-1">
                          <span className="px-2.5 py-0.5 rounded-lg bg-[#252528] text-[#DFAD48] font-semibold border border-[#3A3A40]">
                            {formatHeight(heightMin)}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-lg bg-[#252528] text-[#DFAD48] font-semibold border border-[#3A3A40]">
                            {formatHeight(heightMax)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min={48}
                            max={84}
                            value={heightMin}
                            onChange={(e) => {
                              const val = Math.min(Number(e.target.value), heightMax - 1);
                              setHeightMin(val);
                            }}
                            className="w-full h-1 bg-[#2D2D32] rounded-lg appearance-none cursor-pointer"
                          />
                          <input
                            type="range"
                            min={48}
                            max={84}
                            value={heightMax}
                            onChange={(e) => {
                              const val = Math.max(Number(e.target.value), heightMin + 1);
                              setHeightMax(val);
                            }}
                            className="w-full h-1 bg-[#2D2D32] rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-[#666666]">
                          <span>4&apos;0&quot;</span>
                          <span>7&apos;0&quot;</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Age Slider Container */}
                  <div className="bg-[#1C1C1F] rounded-2xl p-3.5 border border-[#2B2B30]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#E0E0E6]">
                        Age <span className="text-[11px] text-[#888888] font-normal">(years)</span>
                      </span>
                      {/* Blueprint default is "Any" */}
                      <button
                        type="button"
                        onClick={() => setAgeMode(ageMode === 'any' ? 'range' : 'any')}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[#26262A] text-[#D5A74E] hover:bg-[#323238] font-mono cursor-pointer"
                      >
                        {ageMode === 'any' ? 'Mode: Any' : 'Mode: Custom'}
                      </button>
                    </div>

                    {ageMode === 'any' ? (
                      <div className="py-4 text-center">
                        <span className="text-xs font-medium text-[#DFAD48] bg-[#DFAD48]/10 px-3 py-1 rounded-full border border-[#DFAD48]/30">
                          Any Age (Default)
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-xs px-1">
                          <span className="px-2.5 py-0.5 rounded-lg bg-[#252528] text-[#DFAD48] font-semibold border border-[#3A3A40]">
                            {ageMin}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-lg bg-[#252528] text-[#DFAD48] font-semibold border border-[#3A3A40]">
                            {ageMax}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min={18}
                            max={100}
                            value={ageMin}
                            onChange={(e) => {
                              const val = Math.min(Number(e.target.value), ageMax - 1);
                              setAgeMin(val);
                            }}
                            className="w-full h-1 bg-[#2D2D32] rounded-lg appearance-none cursor-pointer"
                          />
                          <input
                            type="range"
                            min={18}
                            max={100}
                            value={ageMax}
                            onChange={(e) => {
                              const val = Math.max(Number(e.target.value), ageMin + 1);
                              setAgeMax(val);
                            }}
                            className="w-full h-1 bg-[#2D2D32] rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-[#666666]">
                          <span>18</span>
                          <span>100</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dropdowns Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {/* Religion Select */}
                  <div className="relative">
                    <select
                      value={religion}
                      onChange={(e) => setReligion(e.target.value)}
                      className="w-full appearance-none rounded-xl bg-[#1C1C1F] border border-[#2B2B30] text-[#CCCCCC] text-xs px-3.5 py-2.5 pr-8 focus:outline-none focus:border-[#D5A74E]"
                    >
                      <option value="">Religion</option>
                      <option value="Muslim">Muslim</option>
                      <option value="Christian">Christian</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#888888] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Nationality Select */}
                  <div className="relative">
                    <select
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full appearance-none rounded-xl bg-[#1C1C1F] border border-[#2B2B30] text-[#CCCCCC] text-xs px-3.5 py-2.5 pr-8 focus:outline-none focus:border-[#D5A74E]"
                    >
                      <option value="">Nationality</option>
                      <option value="Bangladeshi">Bangladeshi</option>
                      <option value="British">British</option>
                      <option value="American">American</option>
                      <option value="Canadian">Canadian</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#888888] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Residing in Select */}
                  <div className="relative">
                    <select
                      value={residingIn}
                      onChange={(e) => setResidingIn(e.target.value)}
                      className="w-full appearance-none rounded-xl bg-[#1C1C1F] border border-[#2B2B30] text-[#CCCCCC] text-xs px-3.5 py-2.5 pr-8 focus:outline-none focus:border-[#D5A74E]"
                    >
                      <option value="">Residing in</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#888888] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-44 py-2.5 rounded-xl bg-gradient-to-r from-[#DFAD48] via-[#CA973B] to-[#B38127] text-black font-semibold text-xs tracking-wider shadow-md hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. HOW IT WORKS (Separate stone textured background & gold glow) */}
      {/* ============================================================ */}
      <section className="relative w-full section-how-it-works-bg border-b border-[#202024] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[40px] text-white tracking-wide mb-3">
              How it works
            </h2>
            <p className="text-xs sm:text-sm text-[#A8A8B0] leading-relaxed max-w-2xl mx-auto font-light">
              Create your profile, discover compatible matches, and unlock advanced features for a more personalized and meaningful matchmaking experience.
            </p>
          </div>

          {/* Desktop & Tablet: 3 Side-by-Side Cards with exact Figma styling */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
            {/* Standard Account Card */}
            <div className="rounded-[22px] bg-[#161619] border border-[#2B2B32] overflow-hidden flex flex-col shadow-[0_16px_40px_rgba(0,0,0,0.7)]">
              <div className="bg-[#26262B] py-4 text-center border-b border-[#2B2B32]">
                <h3 className="font-serif text-base text-white font-semibold">Standard account</h3>
              </div>
              <div className="divide-y divide-[#222226] text-center flex-1 text-xs text-[#CCCCCC]">
                <div className="py-4 px-4">Create Account</div>
                <div className="py-4 px-4">Refine Search Using Filters</div>
                <div className="py-4 px-4">Explore Profiles</div>
                <div className="py-4 px-4">Discover Matches</div>
                <div className="py-4 px-4">Initiate Connection</div>
              </div>
            </div>

            {/* Premium Account Card (Prominent Gold Outline & Radiant Header) */}
            <div className="rounded-[22px] bg-[#171616] gold-highlight-glow overflow-hidden flex flex-col relative scale-[1.02] z-10">
              <div className="bg-gradient-to-r from-[#DFAD48] via-[#C5933A] to-[#A87622] py-4 text-center">
                <h3 className="font-serif text-base text-black font-bold">Premium account</h3>
              </div>
              <div className="divide-y divide-[#2B2720] text-center flex-1 text-xs text-[#EAEAEA]">
                <div className="py-4 px-4">Verify Your Account (KYC)</div>
                <div className="py-4 px-4">Access Complete Biodata</div>
                <div className="py-4 px-4">Assess Compatibility</div>
                <div className="py-4 px-4">Chat Privately</div>
                <div className="py-4 px-4">Download Biodata for Sharing</div>
                <div className="py-4 px-4">Send Gifts</div>
              </div>
            </div>

            {/* VIP Card (Fine Golden Border Frame) */}
            <div className="rounded-[22px] bg-[#161619] border border-[#D5A74E]/60 overflow-hidden flex flex-col shadow-[0_16px_40px_rgba(0,0,0,0.7)]">
              <div className="bg-[#1C1B18] py-4 text-center border-b border-[#302B20]">
                <h3 className="font-serif text-base text-[#E5B552] font-semibold">VIP</h3>
              </div>
              <div className="divide-y divide-[#222226] text-center flex-1 text-xs text-[#CCCCCC]">
                <div className="py-4 px-4">Everything in Premium</div>
                <div className="py-4 px-4">Hide Your Profile</div>
                <div className="py-4 px-4">Chat Without Adding</div>
                <div className="py-4 px-4 text-transparent select-none">-</div>
                <div className="py-4 px-4 text-transparent select-none">-</div>
                <div className="py-4 px-4 text-transparent select-none">-</div>
              </div>
            </div>
          </div>

          {/* Mobile View: Exactly matching the mobile screenshot with partial side peeking cards */}
          <div className="md:hidden flex items-center justify-center relative overflow-hidden py-2 px-4">
            {/* Left peek card */}
            <div className="w-14 h-80 rounded-l-[18px] bg-[#161618] border-r-0 border border-[#2B2B30] opacity-40 shrink-0 select-none pointer-events-none" />

            {/* Center: Premium Account Card */}
            <div className="w-full max-w-[280px] rounded-[22px] bg-[#171616] gold-highlight-glow overflow-hidden flex flex-col mx-2 z-10 shrink-0">
              <div className="bg-gradient-to-r from-[#DFAD48] via-[#C5933A] to-[#A87622] py-4 text-center">
                <h3 className="font-serif text-sm text-black font-bold">Premium account</h3>
              </div>
              <div className="divide-y divide-[#2B2720] text-center text-xs text-[#EAEAEA]">
                <div className="py-3 px-3">Verify Your Account (KYC)</div>
                <div className="py-3 px-3">Access Complete Biodata</div>
                <div className="py-3 px-3">Assess Compatibility</div>
                <div className="py-3 px-3">Chat Privately</div>
                <div className="py-3 px-3">Download Biodata for Sharing</div>
                <div className="py-3 px-3">Send Gifts</div>
              </div>
            </div>

            {/* Right peek card */}
            <div className="w-14 h-80 rounded-r-[18px] bg-[#161618] border-l-0 border border-[#D5A74E]/40 opacity-40 shrink-0 select-none pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. ASSISTED REGISTRATION (Distinct section with gold-trimmed video frame) */}
      {/* ============================================================ */}
      <section className="relative w-full section-assisted-bg border-b border-[#202024] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">

            {/* Text Description */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <h2 className="font-serif text-[28px] sm:text-[34px] text-white tracking-wide mb-4 leading-tight">
                Assisted Registration
              </h2>
              <p className="text-xs sm:text-sm text-[#A8A8B0] leading-relaxed">
                Need help signing up? Apply for our Assisted Registration service where we will complete the registration process over phone on your behalf.{' '}
                <Link href="/help" className="text-[#D5A74E] hover:underline font-medium">
                  Click here to learn more...
                </Link>
              </p>
            </div>

            {/* Video Player Container with fine golden border & play icon */}
            <div className="lg:col-span-7 flex justify-center">
              <div
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="relative w-full aspect-[16/10] rounded-[24px] bg-[#141416] border border-[#D5A74E]/40 flex items-center justify-center cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden hover:border-[#D5A74E] transition-all"
              >
                {/* Dark Inner Depth Vignette */}
                <div className="absolute inset-0 bg-radial from-transparent to-black/80 pointer-events-none" />

                {/* Golden Center Play Button */}
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#DFAD48] flex items-center justify-center text-black shadow-lg group-hover:scale-105 transition-transform">
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. BRAND STORY & VALUES (Checkerboard Desktop, Sequential Mobile) */}
      {/* ============================================================ */}
      <section className="relative w-full section-brand-story-bg border-b border-[#202024]">
        <div className="max-w-[1440px] mx-auto">

          {/* Desktop & Tablet: 3x2 Checkerboard Grid with borders */}
          <div className="hidden md:grid md:grid-cols-3 max-w-5xl mx-auto items-stretch border-x border-[#1F1F24]">
            {/* Row 1, Col 1: Who are we */}
            <div className="p-10 lg:p-12 flex flex-col justify-center text-center bg-[#111113] border-b border-r border-[#1F1F24]">
              <h3 className="font-serif text-2xl text-white mb-3">Who are we</h3>
              <p className="text-xs text-[#A8A8B0] leading-relaxed">
                Path to Marriage is a subscription-based matrimonial community platform designed to transform the way people find life partners. We aim to set new industry standards by combining technology with strong community-driven approach. Our mission is to create the largest and most trusted social networking based matrimonial service, where meaningful connections lead to lifelong commitment.
              </p>
            </div>

            {/* Row 1, Col 2: Wedding Rings Image */}
            <div className="relative aspect-square overflow-hidden border-b border-r border-[#1F1F24]">
              <Image
                src="/assets/ptm/wedding-rings.png"
                alt="Path to Marriage Rings"
                fill
                sizes="(max-width: 1024px) 33vw, 340px"
                className="object-cover"
              />
            </div>

            {/* Row 1, Col 3: Our Commitment */}
            <div className="p-10 lg:p-12 flex flex-col justify-center text-center bg-[#111113] border-b border-[#1F1F24]">
              <h3 className="font-serif text-2xl text-white mb-3">Our Commitment</h3>
              <p className="text-xs text-[#A8A8B0] leading-relaxed">
                Our goal is to provide high-quality matchmaking services at the most affordable rates. By bringing people together on a single platform, we ensure that candidates and their families can find the right match, no matter where they are in the world. Whether you&apos;re searching for yourself or a loved one, Path to Marriage is dedicated to making the process smooth, transparent and fulfilling.
              </p>
            </div>

            {/* Row 2, Col 1: Wax Seal Envelope Image */}
            <div className="relative aspect-square overflow-hidden border-r border-[#1F1F24]">
              <Image
                src="/assets/ptm/wax-seal-envelope.png"
                alt="Wax Seal Envelope"
                fill
                sizes="(max-width: 1024px) 33vw, 340px"
                className="object-cover"
              />
            </div>

            {/* Row 2, Col 2: Our Vision */}
            <div className="p-10 lg:p-12 flex flex-col justify-center text-center bg-[#111113] border-r border-[#1F1F24]">
              <h3 className="font-serif text-2xl text-white mb-3">Our Vision</h3>
              <p className="text-xs text-[#A8A8B0] leading-relaxed">
                We believe that finding a life partner should be a seamless, secure and enjoyable experience. By revolutionizing electronic matrimonial services, we strive to make matchmaking more accessible and efficient for people worldwide. Our platform is designed to build genuine relationships, helping individuals and families navigate the journey of marriage with confidence and trust.
              </p>
            </div>

            {/* Row 2, Col 3: Glowing Candles Image */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/assets/ptm/candles-ambiance.png"
                alt="Candles Ambiance"
                fill
                sizes="(max-width: 1024px) 33vw, 340px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Mobile: Interleaved Sequential Vertical Stack */}
          <div className="md:hidden flex flex-col max-w-[340px] mx-auto py-12 space-y-6">
            {/* 1. Wax Seal Envelope Photo */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/assets/ptm/wax-seal-envelope.png"
                alt="Wax Seal Envelope"
                fill
                sizes="340px"
                className="object-cover"
              />
            </div>

            {/* 2. Who are we Text */}
            <div className="text-center py-4 px-2">
              <h3 className="font-serif text-2xl text-white mb-3">Who are we</h3>
              <p className="text-xs text-[#A8A8B0] leading-relaxed">
                Path to Marriage is a subscription-based matrimonial community platform designed to transform the way people find life partners. We aim to set new industry standards by combining technology with strong community-driven approach. Our mission is to create the largest and most trusted social networking based matrimonial service, where meaningful connections lead to lifelong commitment.
              </p>
            </div>

            {/* 3. Two Wedding Rings Photo */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/assets/ptm/wedding-rings.png"
                alt="Path to Marriage Rings"
                fill
                sizes="340px"
                className="object-cover"
              />
            </div>

            {/* 4. Our Vision Text */}
            <div className="text-center py-4 px-2">
              <h3 className="font-serif text-2xl text-white mb-3">Our Vision</h3>
              <p className="text-xs text-[#A8A8B0] leading-relaxed">
                We believe that finding a life partner should be a seamless, secure and enjoyable experience. By revolutionizing electronic matrimonial services, we strive to make matchmaking more accessible and efficient for people worldwide. Our platform is designed to build genuine relationships, helping individuals and families navigate the journey of marriage with confidence and trust.
              </p>
            </div>

            {/* 5. Glowing Candles Photo */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/assets/ptm/candles-ambiance.png"
                alt="Candles Ambiance"
                fill
                sizes="340px"
                className="object-cover"
              />
            </div>

            {/* 6. Our Commitment Text */}
            <div className="text-center py-4 px-2">
              <h3 className="font-serif text-2xl text-white mb-3">Our Commitment</h3>
              <p className="text-xs text-[#A8A8B0] leading-relaxed">
                Our goal is to provide high-quality matchmaking services at the most affordable rates. By bringing people together on a single platform, we ensure that candidates and their families can find the right match, no matter where they are in the world. Whether you&apos;re searching for yourself or a loved one, Path to Marriage is dedicated to making the process smooth, transparent and fulfilling.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. FOOTER & COPYRIGHT (Distinct dark footer background) */}
      {/* ============================================================ */}
      <footer className="relative w-full footer-leather-texture">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 pb-12">

            {/* Col 1: Logo & Social Icons */}
            <div className="md:col-span-4 lg:col-span-3 space-y-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/assets/ptm/ptm-logo.png"
                  alt="Path To Marriage"
                  width={150}
                  height={42}
                  className="h-9 w-auto object-contain"
                />
              </Link>
              {/* Circular Social Icons */}
              <div className="flex items-center gap-2.5 pt-1">
                {/* YouTube */}
                <div className="w-6 h-6 rounded-full bg-[#DFAD48] flex items-center justify-center text-black cursor-pointer hover:opacity-90 transition-opacity">
                  <Play className="w-3 h-3 fill-current translate-x-0.2" />
                </div>
                {/* Instagram */}
                <div className="w-6 h-6 rounded-full bg-[#DFAD48] flex items-center justify-center p-1 cursor-pointer hover:opacity-90 transition-opacity">
                  <Image
                    src="/assets/ptm/instagram.png"
                    alt="Instagram"
                    width={18}
                    height={18}
                    className="w-full h-full object-contain filter invert"
                  />
                </div>
                {/* TikTok */}
                <div className="w-6 h-6 rounded-full bg-[#DFAD48] flex items-center justify-center text-black font-bold text-[9px] cursor-pointer hover:opacity-90 transition-opacity">
                  d
                </div>
                {/* Facebook */}
                <div className="w-6 h-6 rounded-full bg-[#DFAD48] flex items-center justify-center p-0.5 cursor-pointer hover:opacity-90 transition-opacity">
                  <Image
                    src="/assets/ptm/fb-logo.png"
                    alt="Facebook"
                    width={18}
                    height={18}
                    className="w-full h-full object-contain filter invert"
                  />
                </div>
              </div>
            </div>

            {/* Col 2: Help Links */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-semibold text-white tracking-wider">Help</h4>
              <ul className="space-y-2 text-xs text-[#8E8E96]">
                <li>
                  <Link href="/signup/step-1" className="hover:text-[#D5A74E] transition-colors">
                    Member Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup/step-1" className="hover:text-[#D5A74E] transition-colors">
                    Signup
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-[#D5A74E] transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-[#D5A74E] transition-colors">
                    Customer support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Company Links */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-semibold text-white tracking-wider">Company</h4>
              <ul className="space-y-2 text-xs text-[#8E8E96]">
                <li>
                  <Link href="/help" className="hover:text-[#D5A74E] transition-colors">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-[#D5A74E] transition-colors">
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Privacy Links */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-semibold text-white tracking-wider">Privacy</h4>
              <ul className="space-y-2 text-xs text-[#8E8E96]">
                <li>
                  <Link href="/help" className="hover:text-[#D5A74E] transition-colors">
                    Terms of use
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-[#D5A74E] transition-colors">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-[#D5A74E] transition-colors">
                    Web security
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 5: Stay up to date (Newsletter) */}
            <div className="md:col-span-4 lg:col-span-3 space-y-3">
              <h4 className="text-xs font-semibold text-white tracking-wider">Stay up to date</h4>
              <p className="text-xs text-[#8E8E96] leading-relaxed">
                Sign up for our newsletter to receive exclusive promotions, news, & tips.
              </p>

              {newsletterSubmitted ? (
                <div className="p-2.5 rounded-xl bg-[#DFAD48]/10 border border-[#DFAD48]/30 text-xs text-[#DFAD48]">
                  Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#1A1A1D] border border-[#2B2B30] text-[#E0E0E0] placeholder-[#666666] focus:outline-none focus:border-[#D5A74E]"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#DFAD48] to-[#B38127] text-black font-semibold text-xs tracking-wide hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer"
                  >
                    Submit <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Copyright Bottom Bar with distinct top divider */}
          <div className="pt-6 border-t border-[#1C1C20] text-center text-xs text-[#666668]">
            Copyright © 2026 Path To Marriage. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
