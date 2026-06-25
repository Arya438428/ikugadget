import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.png";
import {
  Smartphone, Headphones, Shield, Zap, Star, MapPin,
  MessageCircle, ChevronRight, CheckCircle2, Package,
  Clock, Truck, Award, Menu, X, Instagram, Phone,
} from "lucide-react";

const CATEGORIES = [
  { icon: Smartphone, label: "Smartphone", desc: "iPhone, Samsung, Xiaomi & lebih", color: "from-blue-500/20 to-blue-600/10", iconColor: "text-blue-600", badge: "Terlaris" },
  { icon: Headphones,  label: "Audio",      desc: "TWS, Headphone, Speaker",         color: "from-purple-500/20 to-purple-600/10", iconColor: "text-purple-600", badge: null },
  { icon: Zap,         label: "Aksesoris",  desc: "Charger, Kabel, Powerbank",        color: "from-amber-500/20 to-amber-600/10",  iconColor: "text-amber-600",  badge: "Promo" },
  { icon: Shield,      label: "Proteksi",   desc: "Case, Tempered Glass, Cover",      color: "from-green-500/20 to-green-600/10",  iconColor: "text-green-600",  badge: null },
];

const PRODUCTS = [
  { name: "iPhone 15 128GB", brand: "Apple",   price: "Rp 11.500.000", original: "Rp 13.000.000", img: "📱", badge: "Terlaris", color: "from-slate-700 to-slate-900" },
  { name: "Samsung S24 256GB", brand: "Samsung", price: "Rp 10.999.000", original: null,            img: "📱", badge: "Baru",     color: "from-blue-700 to-blue-900" },
  { name: "TWS AirPods Pro", brand: "Apple",   price: "Rp 2.850.000",  original: "Rp 3.200.000",  img: "🎧", badge: "Promo",    color: "from-gray-600 to-gray-800" },
  { name: "Xiaomi 14T 256GB", brand: "Xiaomi",  price: "Rp 7.499.000",  original: null,            img: "📱", badge: "Ready",    color: "from-orange-600 to-orange-800" },
];

const TESTIMONIALS = [
  { name: "Budi S.",    rating: 5, text: "Barang original, pelayanan cepat. Beli iPhone disini dan langsung diproses, puas banget!", avatar: "B" },
  { name: "Siti R.",    rating: 5, text: "Harga bersaing, garansi resmi. Sudah 3x beli aksesoris di sini dan selalu memuaskan.", avatar: "S" },
  { name: "Ahmad F.",   rating: 5, text: "Staf ramah dan helpful, bantu pilihkan hp yang sesuai budget. Recommended!", avatar: "A" },
  { name: "Dewi K.",    rating: 4, text: "Produk lengkap, casing pilihan banyak. Tempatnya juga nyaman buat ngobrol.", avatar: "D" },
];

const WHATSAPP = "6285123456789"; // Ganti dengan nomor asli

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < count ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
      ))}
    </div>
  );
}

export default function StoreFront() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waLink = `https://wa.me/${WHATSAPP}?text=Halo%20Iku%20Gadget%2C%20saya%20mau%20tanya%20produk`;

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── NAVBAR ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Logo" className="h-9 w-9 rounded-xl" />
            <span className={`font-bold text-lg tracking-tight ${scrolled ? "text-foreground" : "text-white"}`}>
              Iku Gadget <span className="text-primary">& Stuff</span>
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {["Beranda", "Produk", "Tentang", "Kontak"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium transition-colors hover:text-primary ${scrolled ? "text-foreground/70" : "text-white/80 hover:text-white"}`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className={scrolled ? "" : "text-white hover:bg-white/10"}>
                Login
              </Button>
            </Link>
            <a href={waLink} target="_blank" rel="noreferrer">
              <Button size="sm" className="gap-1.5 shadow-md shadow-primary/30">
                <MessageCircle className="h-4 w-4" /> Hubungi Kami
              </Button>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-lg ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-b px-4 py-4 space-y-3">
            {["Beranda", "Produk", "Tentang", "Kontak"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm font-medium py-2 text-foreground/70 hover:text-primary" onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            ))}
            <a href={waLink} target="_blank" rel="noreferrer" className="block">
              <Button className="w-full gap-2 mt-2"><MessageCircle className="h-4 w-4" /> Hubungi Kami</Button>
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="beranda" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-[hsl(160,25%,12%)]">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div className="space-y-6 iku-fade-up">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/20 text-xs px-3 py-1">
                ✦ Toko Gadget Terpercaya
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Gadget Terbaik,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                Harga Terjangkau
              </span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Temukan smartphone, aksesoris, dan audio terbaik dengan jaminan produk original dan garansi resmi. Langsung dari tangan kami ke tanganmu.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#produk">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all duration-200">
                  Lihat Produk <ChevronRight className="h-4 w-4" />
                </Button>
              </a>
              <a href={waLink} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="gap-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 bg-transparent">
                  <MessageCircle className="h-4 w-4" /> Chat WhatsApp
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-white/10">
              {[
                { value: "500+", label: "Produk Tersedia" },
                { value: "1.000+", label: "Pelanggan Puas" },
                { value: "2 Thn", label: "Berpengalaman" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: floating cards */}
          <div className="hidden lg:flex justify-center items-center relative h-[420px]">
            {/* Main card */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-slate-700/80 to-slate-900/80 backdrop-blur border border-white/10 flex items-center justify-center shadow-2xl shadow-black/40">
                <img src={logo} alt="Logo" className="h-32 w-32 rounded-2xl shadow-xl shadow-black/40" />
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute top-8 right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 iku-float">
              <div className="h-9 w-9 rounded-xl bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Original 100%</p>
                <p className="text-[10px] text-slate-500">Bergaransi Resmi</p>
              </div>
            </div>
            <div className="absolute bottom-16 left-0 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 iku-float" style={{ animationDelay: "0.5s" }}>
              <div className="h-9 w-9 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Rating 4.9/5</p>
                <p className="text-[10px] text-slate-500">1.000+ ulasan</p>
              </div>
            </div>
            <div className="absolute top-1/2 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 iku-float" style={{ animationDelay: "1s" }}>
              <div className="h-9 w-9 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Pengiriman Cepat</p>
                <p className="text-[10px] text-slate-500">Same day available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* ── KEUNGGULAN ── */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Shield,   label: "100% Original",     desc: "Garansi resmi semua produk",    color: "text-green-600 bg-green-500/10" },
            { icon: Award,    label: "Harga Terbaik",      desc: "Kompetitif & transparan",        color: "text-amber-600 bg-amber-500/10" },
            { icon: Clock,    label: "Pelayanan Cepat",    desc: "Respon dalam hitungan menit",   color: "text-blue-600 bg-blue-500/10" },
            { icon: Package,  label: "Stok Selalu Ada",    desc: "500+ produk siap kirim",         color: "text-violet-600 bg-violet-500/10" },
          ].map(({ icon: Icon, label, desc, color }) => (
            <div key={label} className="flex flex-col items-center text-center p-5 rounded-2xl border bg-card hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-3 ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-semibold text-sm">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── KATEGORI ── */}
      <section id="produk" className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 space-y-2">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest">Kategori</p>
            <h2 className="text-3xl font-bold tracking-tight">Pilih Kategorimu</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">Dari smartphone flagship hingga aksesoris harian — semuanya ada di sini</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map(({ icon: Icon, label, desc, color, iconColor, badge }) => (
              <a key={label} href={waLink} target="_blank" rel="noreferrer"
                className="group relative p-6 rounded-2xl border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
                {badge && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-primary text-white rounded-full px-2 py-0.5">{badge}</span>
                )}
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
                <p className="font-bold text-base">{label}</p>
                <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                <div className="flex items-center gap-1 mt-3 text-primary text-xs font-medium">
                  Lihat Semua <ChevronRight className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUK UNGGULAN ── */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 space-y-2">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest">Produk</p>
          <h2 className="text-3xl font-bold tracking-tight">Produk Unggulan</h2>
          <p className="text-muted-foreground text-sm">Pilihan terbaik untuk kamu</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRODUCTS.map(({ name, brand, price, original, img, badge, color }) => (
            <a key={name} href={waLink} target="_blank" rel="noreferrer"
              className="group rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              {/* Product image area */}
              <div className={`relative h-44 bg-gradient-to-br ${color} flex items-center justify-center`}>
                <span className="text-6xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{img}</span>
                {badge && (
                  <span className="absolute top-3 left-3 text-[10px] font-bold bg-white/90 text-slate-800 rounded-full px-2.5 py-1">{badge}</span>
                )}
              </div>
              {/* Info */}
              <div className="p-4 space-y-2">
                <p className="text-[10px] text-muted-foreground font-medium uppercase">{brand}</p>
                <p className="font-bold text-sm leading-tight">{name}</p>
                <div>
                  <p className="text-primary font-bold">{price}</p>
                  {original && <p className="text-xs text-muted-foreground line-through">{original}</p>}
                </div>
                <div className="pt-1">
                  <Button size="sm" className="w-full text-xs gap-1.5 h-8">
                    <MessageCircle className="h-3 w-3" /> Tanya Harga
                  </Button>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href={waLink} target="_blank" rel="noreferrer">
            <Button variant="outline" className="gap-2">
              Lihat Semua Produk <ChevronRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 space-y-2">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest">Ulasan</p>
            <h2 className="text-3xl font-bold tracking-tight">Kata Pelanggan Kami</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIALS.map(({ name, rating, text, avatar }) => (
              <div key={name} className="bg-card rounded-2xl border p-5 space-y-3 hover:shadow-md transition-all duration-300">
                <StarRating count={rating} />
                <p className="text-sm text-muted-foreground leading-relaxed">"{text}"</p>
                <div className="flex items-center gap-2 pt-1">
                  <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm">
                    {avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-[10px] text-muted-foreground">Pelanggan Verified</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section id="kontak" className="py-16 max-w-6xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-[hsl(160,25%,15%)] p-10 text-center">
          <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="relative z-10 space-y-5 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-white">Ada yang mau kamu tanyakan?</h2>
            <p className="text-slate-400">Tim kami siap membantu kamu menemukan gadget yang tepat sesuai budget dan kebutuhan.</p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a href={waLink} target="_blank" rel="noreferrer">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/40 hover:-translate-y-0.5 transition-all">
                  <MessageCircle className="h-5 w-5" /> Chat di WhatsApp
                </Button>
              </a>
              <a href="https://instagram.com/ikugadget" target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="gap-2 border-white/20 text-white hover:bg-white/10 bg-transparent">
                  <Instagram className="h-5 w-5" /> Follow Instagram
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TENTANG ── */}
      <section id="tentang" className="py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest">Tentang Kami</p>
              <h2 className="text-3xl font-bold tracking-tight">Toko Gadget Lokal yang Bisa Dipercaya</h2>
              <p className="text-muted-foreground leading-relaxed">
                Iku Gadget & Stuff hadir untuk memenuhi kebutuhan gadget kamu dengan produk original, harga kompetitif, dan pelayanan yang hangat. Kami percaya bahwa teknologi seharusnya bisa diakses semua kalangan.
              </p>
              <div className="space-y-2.5 pt-2">
                {[
                  "Semua produk bergaransi resmi",
                  "Tim berpengalaman & jujur",
                  "Harga transparan, tidak ada biaya tersembunyi",
                  "Melayani pembelian online & offline",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "500+", label: "Produk",        icon: Package,  color: "from-blue-500/10 to-blue-600/5",   iconColor: "text-blue-600" },
                { value: "1K+",  label: "Pelanggan",     icon: Star,     color: "from-amber-500/10 to-amber-600/5", iconColor: "text-amber-500" },
                { value: "4.9",  label: "Rating",        icon: Award,    color: "from-green-500/10 to-green-600/5", iconColor: "text-green-600" },
                { value: "2 Thn", label: "Pengalaman",   icon: Clock,    color: "from-violet-500/10 to-violet-600/5", iconColor: "text-violet-600" },
              ].map(({ value, label, icon: Icon, color, iconColor }) => (
                <div key={label} className={`rounded-2xl border bg-gradient-to-br ${color} p-5 text-center`}>
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${iconColor}`} />
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <img src={logo} alt="Logo" className="h-8 w-8 rounded-lg" />
                <span className="font-bold text-white">Iku Gadget & Stuff</span>
              </div>
              <p className="text-sm leading-relaxed">Toko gadget terpercaya dengan produk original dan pelayanan terbaik.</p>
              <div className="flex gap-3 pt-1">
                <a href={waLink} target="_blank" rel="noreferrer" className="h-8 w-8 rounded-lg bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <Phone className="h-4 w-4" />
                </a>
                <a href="https://instagram.com/ikugadget" target="_blank" rel="noreferrer" className="h-8 w-8 rounded-lg bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href={waLink} target="_blank" rel="noreferrer" className="h-8 w-8 rounded-lg bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <p className="text-white font-semibold text-sm">Menu</p>
              {["Beranda", "Produk", "Tentang Kami", "Kontak"].map((item) => (
                <a key={item} href={`#${item.split(" ")[0].toLowerCase()}`} className="block text-sm hover:text-primary transition-colors">{item}</a>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <p className="text-white font-semibold text-sm">Kontak</p>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                <span>Jl. Contoh No. 123, Kota Anda</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageCircle className="h-4 w-4 shrink-0 text-primary" />
                <a href={waLink} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">+62 851-2345-6789</a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                <span>Senin–Sabtu, 09.00–20.00</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span>© 2025 Iku Gadget & Stuff. All rights reserved.</span>
            <Link to="/login" className="hover:text-primary transition-colors">Staff Login</Link>
          </div>
        </div>
      </footer>

      {/* Floating WA button */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#25D366] shadow-lg shadow-green-500/40 flex items-center justify-center hover:scale-110 transition-transform duration-200"
        title="Chat WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-white fill-white" />
      </a>
    </div>
  );
}
