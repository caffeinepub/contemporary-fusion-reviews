import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  Headphones,
  Heart,
  Mail,
  MapPin,
  Menu,
  Music,
  Music2,
  Play,
  Search,
  Send,
  Star,
  Users,
  X,
  Youtube,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useActor } from "./hooks/useActor";

// ────────────────────────────────────────────────────────────
// Data
// ────────────────────────────────────────────────────────────
const reviews = [
  {
    id: 1,
    img: "/assets/generated/album-cover-1.dim_400x400.jpg",
    tag: "New Release",
    tagColor: "purple",
    title: "Kamasi Washington – Fearless Movement",
    author: "Marcus Rivera",
    date: "March 10, 2026",
    rating: 4.9,
    readTime: "7 min read",
    genre: "New Release",
    excerpt:
      "A transcendent double album that pushes the boundaries of jazz into cinematic, spiritual territory with sweeping orchestration and raw emotional depth. Washington draws on gospel, hip-hop, and classical music, weaving them into an expansive sonic tapestry that demands repeated listens.",
  },
  {
    id: 2,
    img: "/assets/generated/album-cover-2.dim_400x400.jpg",
    tag: "World Fusion",
    tagColor: "blue",
    title: "Fatoumata Diawara – London Ko",
    author: "Aisha Thompson",
    date: "March 5, 2026",
    rating: 4.7,
    readTime: "5 min read",
    genre: "World Fusion",
    excerpt:
      "The Malian singer-guitarist weaves together West African rhythms with contemporary jazz in this stunning live collaboration recorded at the Barbican. Diawara's voice carries the weight of tradition while her arrangements feel thrillingly modern.",
  },
  {
    id: 3,
    img: "/assets/generated/album-cover-3.dim_400x400.jpg",
    tag: "New Release",
    tagColor: "purple",
    title: "Cécile McLorin Salvant – Mélusine",
    author: "James Chen",
    date: "Feb 28, 2026",
    rating: 4.8,
    readTime: "6 min read",
    genre: "New Release",
    excerpt:
      "A hauntingly beautiful concept album inspired by French folk myths, showcasing Salvant's unparalleled vocal artistry and her gift for dramatic storytelling. Each song unfolds like a short film, layered with character and nuance.",
  },
  {
    id: 4,
    img: "/assets/generated/album-cover-4.dim_400x400.jpg",
    tag: "Live Review",
    tagColor: "green",
    title: "Brad Mehldau Trio – Village Vanguard",
    author: "Sofia Reyes",
    date: "Feb 20, 2026",
    rating: 4.6,
    readTime: "4 min read",
    genre: "Live Review",
    excerpt:
      "An intimate evening of modal explorations and reimagined standards at New York's legendary jazz club. Mehldau and his trio locked into a rare telepathic groove, navigating complex harmonic territory with effortless ease.",
  },
  {
    id: 5,
    img: "/assets/generated/album-cover-5.dim_400x400.jpg",
    tag: "World Fusion",
    tagColor: "blue",
    title: "Anouar Brahem – Souvenance",
    author: "David Kim",
    date: "Feb 15, 2026",
    rating: 4.5,
    readTime: "5 min read",
    genre: "World Fusion",
    excerpt:
      "The Tunisian oud master returns with a meditative suite that blurs the line between Arabic maqam and European classical minimalism. Recorded with a chamber string ensemble in Paris, Souvenance rewards silence and undivided attention.",
  },
  {
    id: 6,
    img: "/assets/generated/album-cover-6.dim_400x400.jpg",
    tag: "New Release",
    tagColor: "purple",
    title: "Esperanza Spalding – Songwrights Apothecary Lab",
    author: "Nina Patel",
    date: "Feb 8, 2026",
    rating: 4.4,
    readTime: "4 min read",
    genre: "New Release",
    excerpt:
      "An adventurous exploration of healing and composition, blending jazz, R&B, and experimental textures into something genuinely singular. Whether or not the science holds, the music is undeniably captivating — bold, tender, and unlike anything else this year.",
  },
];

const videos = [
  {
    id: 1,
    img: "/assets/generated/video-thumb-1.dim_400x300.jpg",
    title: "In Studio: Kamasi Washington's Creative Process",
    duration: "18:42",
    desc: "A rare behind-the-scenes look at how the LA saxophonist crafts his signature sound",
  },
  {
    id: 2,
    img: "/assets/generated/video-thumb-2.dim_400x300.jpg",
    title: "World Fusion Summit: Live Highlights",
    duration: "24:15",
    desc: "Highlights from the annual gathering of global jazz and world music innovators",
  },
  {
    id: 3,
    img: "/assets/generated/video-thumb-1.dim_400x300.jpg",
    title: "Interview: Esperanza Spalding on Music & Healing",
    duration: "32:07",
    desc: "A deep conversation about her latest project and the therapeutic power of composition",
  },
  {
    id: 4,
    img: "/assets/generated/video-thumb-2.dim_400x300.jpg",
    title: "Masterclass: Brad Mehldau on Harmony",
    duration: "45:30",
    desc: "The piano virtuoso shares insights into his approach to harmonic improvisation",
  },
];

const events = [
  {
    id: 1,
    img: "/assets/generated/event-poster-1.dim_400x300.jpg",
    title: "Montreal International Jazz Festival",
    date: "June 26 – July 6, 2026",
    location: "Montreal, Canada",
    desc: "The world's largest jazz festival returns with 3,000+ artists from 30 countries across 10 stages. This year's edition celebrates 45 years with a special retrospective series alongside breakthrough global acts.",
  },
  {
    id: 2,
    img: "/assets/generated/event-poster-2.dim_400x300.jpg",
    title: "Blue Note Tokyo – Special Night",
    date: "April 15, 2026",
    location: "Tokyo, Japan",
    desc: "An exclusive intimate performance at one of Asia's most storied jazz venues, featuring leading voices in contemporary fusion for a limited audience of 300.",
  },
  {
    id: 3,
    img: "/assets/generated/event-poster-1.dim_400x300.jpg",
    title: "North Sea Jazz Festival",
    date: "July 11–13, 2026",
    location: "Rotterdam, Netherlands",
    desc: "Europe's premier jazz festival returns to Ahoy Rotterdam with world-class lineups across 15 stages over three packed days. Expect boundary-pushing fusion acts and legendary late-night jam sessions.",
  },
  {
    id: 4,
    img: "/assets/generated/event-poster-2.dim_400x300.jpg",
    title: "Newport Jazz Festival",
    date: "August 1–3, 2026",
    location: "Newport, Rhode Island",
    desc: "The historic American festival celebrates its 70th anniversary on the Fort Adams waterfront, with a lineup spanning jazz royalty and the next generation of innovators.",
  },
];

// ────────────────────────────────────────────────────────────
// Intersection Observer hook
// ────────────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ────────────────────────────────────────────────────────────
// Tag color helper
// ────────────────────────────────────────────────────────────
function tagStyle(color: string) {
  if (color === "blue")
    return "bg-sky-200 text-black border border-sky-300 font-semibold";
  if (color === "green")
    return "bg-emerald-200 text-black border border-emerald-300 font-semibold";
  return "bg-violet-200 text-black border border-violet-300 font-semibold";
}

// ────────────────────────────────────────────────────────────
// Star Rating component
// ────────────────────────────────────────────────────────────
function StarRating({
  rating,
  size = "sm",
}: { rating: number; size?: "sm" | "md" }) {
  const stars = [1, 2, 3, 4, 5];
  const iconSize = size === "md" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex items-center gap-0.5">
      {stars.map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <span key={star} className="relative inline-flex">
            {/* empty star */}
            <Star className={`${iconSize} text-white/20`} />
            {/* filled overlay */}
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : "50%" }}
              >
                <Star className={`${iconSize} text-amber-400 fill-amber-400`} />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Animated stat number
// ────────────────────────────────────────────────────────────
function AnimatedStat({
  value,
  label,
  icon: Icon,
}: { value: string; label: string; icon: React.ElementType }) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/10 backdrop-blur-md"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(56,189,248,0.2))",
        }}
      >
        <Icon className="w-4 h-4 text-purple-300" />
      </div>
      <div>
        <div className="text-white font-bold text-lg leading-none">{value}</div>
        <div className="text-white/50 text-xs mt-0.5">{label}</div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Navbar
// ────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["home", "reviews", "curated", "footer"];
      for (const id of sections.slice().reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", ocid: "nav.home.link", section: "home" },
    {
      label: "Reviews",
      href: "#reviews",
      ocid: "nav.reviews.link",
      section: "reviews",
    },
    {
      label: "Events",
      href: "#curated",
      ocid: "nav.events.link",
      section: "curated",
    },
    {
      label: "Contact",
      href: "#footer",
      ocid: "nav.contact.link",
      section: "footer",
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl border-b ${
        scrolled
          ? "bg-black/55 border-white/12 shadow-[0_1px_0_0_rgba(124,58,237,0.25),0_10px_40px_rgba(0,0,0,0.5)]"
          : "bg-white/4 border-white/8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2.5 group"
          aria-label="Contemporary Fusion Reviews"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
            style={{ background: "linear-gradient(135deg, #7c3aed, #38bdf8)" }}
          >
            <Music className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-base tracking-tight leading-none">
            Contemporary{" "}
            <span className="gradient-text font-extrabold">Fusion</span>
            <span className="text-white/70 font-normal"> Reviews</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.section;
            return (
              <a
                key={link.ocid}
                href={link.href}
                data-ocid={link.ocid}
                className={`relative text-sm font-medium transition-all duration-200 pb-0.5 group ${
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-sky-400 opacity-100 scale-x-100"
                      : "bg-gradient-to-r from-purple-500 to-sky-400 opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </div>

        <button
          type="button"
          className="md:hidden text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.menu.toggle"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/85 backdrop-blur-xl border-t border-white/8">
          <div className="px-6 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.ocid}
                href={link.href}
                data-ocid={link.ocid}
                className={`px-3 py-2.5 rounded-lg text-base font-medium transition-all duration-200 ${
                  activeSection === link.section
                    ? "text-white bg-purple-900/40"
                    : "text-white/65 hover:text-white hover:bg-white/8"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// ────────────────────────────────────────────────────────────
// Hero Section
// ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden"
      style={{
        backgroundImage: `url('/assets/generated/hero-jazz-banner.dim_1600x900.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,12,0.7) 0%, rgba(60,0,110,0.35) 45%, rgba(5,5,12,0.92) 100%)",
        }}
      />

      <div
        className="absolute top-1/4 left-[15%] w-[28rem] h-[28rem] rounded-full opacity-20 blur-3xl animate-float-orb pointer-events-none"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-[12%] w-72 h-72 rounded-full opacity-[0.18] blur-3xl animate-float-orb-alt pointer-events-none"
        style={{
          background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[15%] right-[30%] w-40 h-40 rounded-full opacity-10 blur-2xl animate-float-orb pointer-events-none"
        style={{
          background: "radial-gradient(circle, #c084fc 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-32 fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-400/50 bg-violet-100/90 text-black text-xs font-bold uppercase tracking-widest mb-8 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          Featured Review
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
          Discover the Latest in{" "}
          <em className="not-italic gradient-text">Contemporary Jazz</em>
          {" & "}
          <br className="hidden sm:block" />
          World Fusion
        </h1>

        <p className="text-white/65 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Your premier destination for in-depth reviews, artist features, and
          live coverage of the world's most compelling music.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#reviews">
            <Button
              data-ocid="hero.primary_button"
              size="lg"
              className="btn-shimmer min-h-[52px] px-9 text-base font-semibold text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_48px_rgba(124,58,237,0.65)] purple-glow"
              style={{
                background:
                  "linear-gradient(135deg, #7c3aed 0%, #4B0082 55%, #0ea5e9 100%)",
              }}
            >
              Read Featured Review
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
          <a href="#curated">
            <Button
              data-ocid="hero.secondary_button"
              size="lg"
              className="btn-shimmer min-h-[52px] px-9 text-base font-semibold rounded-full bg-transparent text-white border-2 border-white/60 hover:bg-white hover:text-black hover:border-white transition-all duration-300 hover:scale-105"
            >
              Explore Events
            </Button>
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/45 text-[10px] uppercase tracking-[0.2em] font-medium">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-white/40 animate-scroll-bounce" />
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Reviews Section
// ────────────────────────────────────────────────────────────
function ReviewsSection() {
  const { ref, visible } = useScrollReveal();
  const [activeGenre, setActiveGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterKey, setFilterKey] = useState(0);
  const [activeMood, setActiveMood] = useState("All Vibes");

  const genres = ["All", "New Release", "World Fusion", "Live Review"];
  const moods = [
    "All Vibes",
    "Introspective",
    "Energetic",
    "Meditative",
    "Experimental",
    "Celebratory",
  ];

  // Featured = highest rated
  const featuredReview = reviews.reduce(
    (best, r) => (r.rating > best.rating ? r : best),
    reviews[0],
  );

  // Trending = second highest rated (not featured)
  const trendingReview = [...reviews]
    .filter((r) => r.id !== featuredReview.id)
    .reduce(
      (best, r) => (r.rating > best.rating ? r : best),
      reviews.find((r) => r.id !== featuredReview.id)!,
    );

  // Filter + search + sort
  const filtered = reviews
    .filter((r) => {
      const matchGenre = activeGenre === "All" || r.genre === activeGenre;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q);
      return matchGenre && matchSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") return b.id - a.id;
      if (sortOrder === "oldest") return a.id - b.id;
      return b.rating - a.rating;
    });

  const displayed = filtered;

  const handleFilterChange = (genre: string) => {
    setActiveGenre(genre);
    setFilterKey((k) => k + 1);
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setFilterKey((k) => k + 1);
  };

  const handleSort = (val: string) => {
    setSortOrder(val);
    setFilterKey((k) => k + 1);
  };

  return (
    <section
      id="reviews"
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative overflow-hidden transition-all duration-700 noise-overlay ${
        visible ? "section-visible" : "section-hidden"
      }`}
      style={{
        background:
          "linear-gradient(180deg, #050508 0%, #0d0418 35%, #100520 60%, #080310 85%, #050508 100%)",
      }}
    >
      {/* Concert background image */}
      <img
        src="/assets/generated/reviews-concert-bg.dim_1600x900.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ opacity: 0.12 }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-0 left-[10%] w-[40rem] h-[40rem] rounded-full opacity-[0.12] blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 right-[8%] w-[32rem] h-[32rem] rounded-full opacity-[0.10] blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #38bdf8 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[20rem] rounded-full opacity-[0.06] blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #9d4edd 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(180,120,255,0.9) 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 30%, rgba(56,189,248,0.3) 70%, transparent)",
        }}
      />

      <div className="relative z-10 py-28 px-6 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-300 text-black text-xs font-bold uppercase tracking-widest mb-5 shadow-sm">
            <Music2 className="w-3 h-3 text-violet-600" />
            Reviews
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Latest Reviews
          </h2>
          <div
            className="w-16 h-1 rounded-full mt-3 mb-5"
            style={{ background: "linear-gradient(90deg, #7c3aed, #0ea5e9)" }}
          />
          <p className="text-white/55 mt-2 text-base max-w-lg leading-relaxed">
            Fresh perspectives on the albums and performances shaping
            contemporary jazz and world fusion.
          </p>
        </div>

        {/* Stats strip */}
        <div
          data-ocid="reviews.stats.panel"
          className="flex flex-wrap gap-3 mb-10"
        >
          <AnimatedStat value="12" label="Reviews Published" icon={Music2} />
          <AnimatedStat value="6" label="Artists Featured" icon={Users} />
          <AnimatedStat value="3" label="Genres Covered" icon={Star} />
          <AnimatedStat value="4.7" label="Avg Rating" icon={Star} />
        </div>

        {/* Featured spotlight card */}
        <div
          data-ocid="reviews.featured.card"
          className="mb-14 rounded-3xl overflow-hidden border border-purple-500/30 relative group"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 0 60px rgba(124,58,237,0.25), 0 4px 40px rgba(0,0,0,0.5)",
          }}
        >
          {/* Glowing border pulse */}
          <div className="absolute inset-0 rounded-3xl border border-purple-500/0 group-hover:border-purple-500/50 transition-all duration-500 pointer-events-none" />

          <div className="flex flex-col lg:flex-row">
            {/* Image — left ~45% */}
            <div className="relative lg:w-[45%] h-72 lg:h-auto overflow-hidden flex-shrink-0">
              <img
                src={featuredReview.img}
                alt={featuredReview.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
              {/* Rating badge over image */}
              <div
                className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border border-amber-400/40"
                style={{ background: "rgba(0,0,0,0.65)" }}
              >
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-amber-300 font-bold text-sm">
                  {featuredReview.rating}
                </span>
              </div>
              {/* Featured label */}
              <div className="absolute top-4 left-4">
                <span
                  className="text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider text-white"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #4B0082)",
                  }}
                >
                  ★ Editor's Pick
                </span>
              </div>
            </div>

            {/* Content — right */}
            <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
              <span
                className={`inline-block w-fit text-xs px-2.5 py-1 rounded-full mb-4 ${tagStyle(featuredReview.tagColor)}`}
              >
                {featuredReview.tag}
              </span>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">
                {featuredReview.title}
              </h3>

              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={featuredReview.rating} size="md" />
                <span className="text-amber-300 font-bold text-sm">
                  {featuredReview.rating} / 5
                </span>
              </div>

              <div className="flex items-center gap-2 text-white/50 text-xs mb-5">
                <span className="author-avatar">
                  <Music2 className="w-2.5 h-2.5 text-purple-400" />
                </span>
                <span className="font-medium text-white/70">
                  {featuredReview.author}
                </span>
                <span className="text-white/30">·</span>
                <span>{featuredReview.date}</span>
              </div>

              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-7 line-clamp-3">
                {featuredReview.excerpt}
              </p>

              <Button
                data-ocid="reviews.featured.primary_button"
                className="btn-shimmer w-fit min-h-[48px] px-8 text-sm font-semibold text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_rgba(124,58,237,0.55)]"
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #4B0082 55%, #0ea5e9 100%)",
                }}
              >
                Read Full Review
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      data-ocid="reviews.featured.secondary_button"
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-white/20 transition-all duration-200 hover:border-purple-400/50 hover:shadow-[0_0_16px_rgba(124,58,237,0.4)]"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-[#1a0a2e] border-purple-500/30 text-white text-xs"
                  >
                    Preview coming soon
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Filter + Search + Sort toolbar */}
        <div className="flex flex-col gap-4 mb-10">
          {/* Genre filter tabs */}
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                type="button"
                data-ocid="reviews.filter.tab"
                onClick={() => handleFilterChange(genre)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-250 ${
                  activeGenre === genre
                    ? "text-white border-transparent shadow-[0_0_16px_rgba(124,58,237,0.4)]"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/8 hover:border-white/20"
                }`}
                style={
                  activeGenre === genre
                    ? {
                        background:
                          "linear-gradient(135deg, #7c3aed, #4B0082 60%, #0ea5e9)",
                      }
                    : {}
                }
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Search + Sort row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none" />
              <Input
                data-ocid="reviews.search.search_input"
                type="text"
                placeholder="Search by title or artist…"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm focus:border-purple-500/50 focus:bg-white/8 rounded-xl transition-all duration-200 min-h-[44px]"
              />
            </div>
            {/* Sort */}
            <Select value={sortOrder} onValueChange={handleSort}>
              <SelectTrigger
                data-ocid="reviews.sort.select"
                className="w-full sm:w-[170px] bg-white/5 border-white/10 text-white/70 text-sm rounded-xl min-h-[44px] focus:border-purple-500/50"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-[#130a25] border-white/10 text-white">
                <SelectItem
                  value="newest"
                  className="text-white/80 focus:bg-purple-900/40 focus:text-white"
                >
                  Newest First
                </SelectItem>
                <SelectItem
                  value="oldest"
                  className="text-white/80 focus:bg-purple-900/40 focus:text-white"
                >
                  Oldest First
                </SelectItem>
                <SelectItem
                  value="rating"
                  className="text-white/80 focus:bg-purple-900/40 focus:text-white"
                >
                  Highest Rated
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mood / Vibe filter row */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
            {moods.map((mood) => (
              <button
                key={mood}
                type="button"
                data-ocid="reviews.mood.tab"
                onClick={() => setActiveMood(mood)}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${
                  activeMood === mood
                    ? "text-white border-purple-400/60 shadow-[0_0_10px_rgba(124,58,237,0.3)]"
                    : "bg-white/3 border-white/8 text-white/40 hover:text-white/70 hover:border-white/20"
                }`}
                style={
                  activeMood === mood
                    ? { background: "rgba(124,58,237,0.25)" }
                    : {}
                }
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-white/40 text-sm">
            {filtered.length === 0
              ? "No reviews found"
              : `Showing ${displayed.length} of ${filtered.length} reviews`}
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearch("")}
              className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors px-2 py-0.5 rounded-full border border-purple-500/30 hover:border-purple-400/50"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div data-ocid="reviews.empty_state" className="text-center py-20">
            <Music2 className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 text-base">
              No reviews match your search.
            </p>
          </div>
        ) : (
          <div
            key={filterKey}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 reviews-grid-animate"
          >
            {displayed.map((review, i) => (
              <article
                key={review.id}
                data-ocid={`reviews.item.${i + 1}`}
                className="group rounded-2xl overflow-hidden border border-white/8 card-glow card-border-accent cursor-pointer transition-all duration-300 hover:border-purple-500/30 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  animationDelay: `${i * 80}ms`,
                  boxShadow:
                    "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={review.img}
                    alt={review.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                  {/* Hover overlay with rating + genre */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "rgba(13,4,24,0.72)",
                      backdropFilter: "blur(2px)",
                    }}
                  >
                    <StarRating rating={review.rating} size="md" />
                    <span className="text-amber-300 font-bold text-lg">
                      {review.rating}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full ${tagStyle(review.tagColor)}`}
                    >
                      {review.genre}
                    </span>
                  </div>

                  <span
                    className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full backdrop-blur-sm ${tagStyle(review.tagColor)}`}
                  >
                    {review.tag}
                  </span>

                  {/* Trending badge */}
                  {review.id === trendingReview.id && (
                    <div className="absolute top-3 left-3 mt-7">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-bold text-black"
                        style={{
                          background:
                            "linear-gradient(135deg, #f59e0b, #ea580c)",
                        }}
                      >
                        🔥 Trending
                      </span>
                    </div>
                  )}

                  {/* Rating chip always visible */}
                  <div
                    className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-md border border-amber-400/30"
                    style={{ background: "rgba(0,0,0,0.60)" }}
                  >
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-amber-300 text-xs font-bold">
                      {review.rating}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="font-display text-white font-semibold text-[1.05rem] leading-snug mb-3 line-clamp-2 group-hover:text-purple-200 transition-colors duration-300">
                    {review.title}
                  </h3>

                  {/* Stars */}
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={review.rating} />
                    <span className="text-amber-300/80 text-xs font-semibold">
                      {review.rating}
                    </span>
                  </div>

                  {/* Author row */}
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-3 flex-wrap">
                    <span className="author-avatar">
                      <Music2 className="w-2.5 h-2.5 text-purple-400" />
                    </span>
                    <span className="font-medium text-white/65">
                      {review.author}
                    </span>
                    <span className="text-white/30">·</span>
                    <span>{review.date}</span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/50 ml-auto">
                      <Clock className="w-3 h-3" />
                      {
                        (review as typeof review & { readTime: string })
                          .readTime
                      }
                    </span>
                  </div>

                  <p className="text-white/55 text-sm leading-relaxed line-clamp-3 mb-5">
                    {review.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      data-ocid={`reviews.read_more.button.${i + 1}`}
                      className="editorial-link text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200"
                    >
                      Read More
                      <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            data-ocid={`reviews.play.button.${i + 1}`}
                            className="w-8 h-8 rounded-full flex items-center justify-center border border-white/15 transition-all duration-200 hover:border-purple-400/50 hover:shadow-[0_0_12px_rgba(124,58,237,0.35)]"
                            style={{
                              background: "rgba(255,255,255,0.07)",
                              backdropFilter: "blur(8px)",
                            }}
                          >
                            <Play className="w-3.5 h-3.5 text-white/70 fill-white/70 ml-0.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-[#1a0a2e] border-purple-500/30 text-white text-xs"
                        >
                          Preview coming soon
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Curated Content Section
// ────────────────────────────────────────────────────────────
function CuratedSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="curated"
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative py-28 px-6 overflow-hidden transition-all duration-700 noise-overlay ${
        visible ? "section-visible" : "section-hidden"
      }`}
      style={{
        background:
          "linear-gradient(180deg, #0A0A0F 0%, #0e0920 50%, #0A0A0F 100%)",
      }}
    >
      {/* Neon depth orbs */}
      <div className="absolute top-0 left-0 w-[35rem] h-[35rem] bg-purple-700 opacity-[0.12] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-violet-600 opacity-[0.10] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-sky-500 opacity-[0.08] blur-[80px] rounded-full pointer-events-none" />
      {/* Radial glow behind heading */}
      <div
        className="absolute top-20 left-1/4 w-[20rem] h-[10rem] opacity-[0.07] blur-[60px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #a855f7, transparent)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-black text-xs font-bold uppercase tracking-widest mb-5 shadow-sm">
            <Calendar className="w-3 h-3 text-sky-600" />
            Curated
          </div>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold section-underline"
            style={{
              background: "linear-gradient(135deg, #c084fc, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Events & Video Picks
          </h2>
          <p className="text-white/55 mt-8 text-base max-w-lg leading-relaxed">
            Discover upcoming jazz and world fusion events — from intimate club
            nights to global festivals.
          </p>
        </div>

        <Tabs defaultValue="events">
          <TabsList className="mb-10 bg-white/5 border border-white/10 rounded-full p-1 w-auto inline-flex shadow-inner">
            <TabsTrigger
              data-ocid="curated.video_tab.tab"
              value="videos"
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-white/55 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-sky-500 transition-all duration-300"
            >
              <Play className="mr-2 w-3.5 h-3.5" />
              Video Picks
            </TabsTrigger>
            <TabsTrigger
              data-ocid="curated.events_tab.tab"
              value="events"
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-white/55 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-sky-500 transition-all duration-300"
            >
              <Calendar className="mr-2 w-3.5 h-3.5" />
              Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {videos.map((video, i) => (
                <div
                  key={video.id}
                  data-ocid={`curated.video.item.${i + 1}`}
                  className="group bg-card rounded-2xl overflow-hidden border border-white/6 card-glow cursor-pointer"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={video.img}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/45 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-white/80 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 shadow-xl"
                        style={{ background: "rgba(124,58,237,0.75)" }}
                      >
                        <Play className="w-5 h-5 text-white fill-white" />
                      </div>
                    </div>
                    <Badge className="absolute bottom-3 right-3 bg-black/75 text-white border-none text-xs font-medium">
                      <Clock className="w-3 h-3 mr-1" />
                      {video.duration}
                    </Badge>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-white font-semibold text-base leading-snug mb-2">
                      {video.title}
                    </h3>
                    <p className="text-white/52 text-sm leading-relaxed">
                      {video.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {events.map((event, i) => (
                <div
                  key={event.id}
                  data-ocid={`curated.event.item.${i + 1}`}
                  className="group bg-card rounded-2xl overflow-hidden border border-white/6 card-glow cursor-pointer flex flex-col"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={event.img}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-100/90 text-black border border-sky-300 backdrop-blur-sm">
                        <Calendar className="inline w-3 h-3 mr-1 text-sky-600" />
                        {event.date}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-white font-semibold text-base leading-snug mb-1">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/45 text-xs mb-3">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-white/52 text-sm mb-5 leading-relaxed line-clamp-3 flex-1">
                      {event.desc}
                    </p>
                    <Button
                      data-ocid={`curated.event.button.${i + 1}`}
                      size="sm"
                      className="w-full rounded-xl py-2.5 text-white text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg min-h-[44px]"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #0ea5e9)",
                      }}
                    >
                      View Event
                      <ArrowRight className="ml-2 w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Footer / Contact
// ────────────────────────────────────────────────────────────
function Footer() {
  const { actor } = useActor();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const categories = [
    "New Releases",
    "Live Reviews",
    "Artist Profiles",
    "World Fusion",
    "Jazz History",
    "Events",
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      if (!actor) throw new Error("Not connected");
      await actor.subscribe(email.trim());
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const socialLinks = [
    { Icon: Music, label: "Facebook" },
    { Icon: Headphones, label: "Twitter" },
    { Icon: Youtube, label: "YouTube" },
    { Icon: Play, label: "Instagram" },
  ];

  return (
    <footer
      id="footer"
      className="relative overflow-hidden"
      style={{ background: "#05050a" }}
    >
      {/* Subtle depth orbs */}
      <div className="absolute top-0 right-1/4 w-[30rem] h-[30rem] bg-purple-800 opacity-[0.12] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[24rem] h-[24rem] bg-violet-700 opacity-[0.10] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[30rem] bg-purple-700 opacity-[0.08] blur-[160px] rounded-full pointer-events-none" />

      {/* Neon divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #7c3aed 30%, #38bdf8 70%, transparent)",
          boxShadow: "0 0 12px rgba(124,58,237,0.4)",
        }}
      />

      {/* Contact Hero Area */}
      <div
        className="max-w-7xl mx-auto px-6 pt-24 pb-16"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
      >
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-black text-xs font-bold uppercase tracking-widest mb-5"
            style={{
              background: "rgba(255,255,255,0.95)",
              boxShadow:
                "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(200,180,255,0.4), 0 0 60px rgba(124,58,237,0.25)",
            }}
          >
            <Mail className="w-3 h-3 text-black" />
            Contact
          </div>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, #e879f9, #a855f7, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Stay Connected
          </h2>
          <p className="text-white/50 text-base max-w-md mx-auto leading-relaxed">
            Join our community of jazz and world fusion enthusiasts. Get the
            latest reviews, events, and artist features delivered to you.
          </p>
        </div>

        {/* Contact cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-16">
          {/* Email card */}
          <a
            href="mailto:submissions@contemporaryfusionreviews.com"
            data-ocid="footer.email.link"
            className="group flex items-center gap-4 p-5 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-md transition-all duration-300 hover:border-purple-400/50 hover:bg-purple-900/15 hover:shadow-[0_0_24px_rgba(124,58,237,0.2)]"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(124,58,237,0.45)]"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              }}
            >
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-0.5">
                Submit / Press
              </p>
              <p className="text-white/75 text-sm font-medium group-hover:text-purple-300 transition-colors duration-200 break-all leading-relaxed">
                submissions@
                <br />
                contemporaryfusionreviews.com
              </p>
            </div>
          </a>

          {/* Social connect card */}
          <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-md">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
              }}
            >
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
                Follow Us
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="/#"
                    aria-label={label}
                    className="w-11 h-11 rounded-full border border-white/12 flex items-center justify-center text-white/45 transition-all duration-300 hover:text-white hover:bg-gradient-to-br hover:from-purple-600/30 hover:to-sky-500/20 hover:border-purple-400/60 hover:shadow-[0_0_18px_rgba(124,58,237,0.35)] hover:scale-110"
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter CTA - frosted glass featured card */}
        <div
          className="relative max-w-2xl mx-auto rounded-2xl p-8 border border-white/10 backdrop-blur-md mb-20"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
            style={{
              background:
                "linear-gradient(90deg, transparent, #a855f7 30%, #7c3aed 70%, transparent)",
              boxShadow: "0 0 8px rgba(124,58,237,0.5)",
            }}
          />
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.15em]">
              Stay in the Loop
            </h4>
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(90deg, #a855f7, transparent)",
              }}
            />
          </div>
          <p className="text-white text-xs mb-5 leading-relaxed">
            Latest reviews and events, delivered to your inbox. No spam, ever.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Input
                data-ocid="footer.newsletter.input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="flex-1 min-w-0 bg-white/6 border-white/12 text-white placeholder:text-white/28 text-sm focus:border-purple-500/60 focus:bg-white/8 rounded-lg transition-all duration-200 min-h-[44px]"
              />
              <Button
                data-ocid="footer.newsletter.submit_button"
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="rounded-lg text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.04] disabled:opacity-50 px-4 min-h-[44px] flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #0ea5e9)",
                }}
              >
                {status === "loading" ? (
                  "..."
                ) : status === "success" ? (
                  "✓"
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            {status === "success" && (
              <p
                data-ocid="footer.newsletter.success_state"
                className="text-emerald-400 text-xs"
              >
                ✓ You're subscribed! Welcome to the community.
              </p>
            )}
            {status === "error" && (
              <p
                data-ocid="footer.newsletter.error_state"
                className="text-red-400 text-xs"
              >
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>

        {/* Bottom bar with categories and copyright */}
        <div className="border-t border-white/6 pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #38bdf8)",
                  }}
                >
                  <Music className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-sm">
                  Contemporary{" "}
                  <span className="gradient-text font-extrabold">Fusion</span>
                </span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed max-w-xs">
                Your guide to contemporary jazz and world fusion music —
                in-depth reviews, artist features, and live coverage from across
                the globe.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-[0.15em]">
                Categories
              </h4>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                {categories.map((cat) => (
                  <li key={cat}>
                    <a
                      href="/#"
                      className="text-white/40 hover:text-purple-300 text-xs transition-all duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-purple-500/0 group-hover:bg-purple-400 transition-all duration-200 flex-shrink-0" />
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-[0.15em]">
                Explore
              </h4>
              <ul className="flex flex-col gap-2">
                {["Home", "Reviews", "Events", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-white/40 hover:text-purple-300 text-xs transition-all duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-purple-500/0 group-hover:bg-purple-400 transition-all duration-200 flex-shrink-0" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-white/25 text-xs">
            <p>
              © {new Date().getFullYear()} Contemporary Fusion Reviews. All
              rights reserved.
            </p>
            <p className="flex items-center gap-1.5">
              Built with <Heart className="w-3 h-3 text-purple-400" /> using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────
// App
// ────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <ReviewsSection />
        <CuratedSection />
      </main>
      <Footer />
    </div>
  );
}
