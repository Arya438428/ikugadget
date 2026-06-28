import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.png";
import IntroSplash from "@/components/IntroSplash";
import Device3D from "@/components/Device3D";
import { PRODUCT_IMG } from "@/data/productImages";
import {
  Star, MessageCircle, ChevronRight, CheckCircle2, Package,
  Clock, Truck, Award, Menu, X, Instagram, Phone,
  CreditCard, Shield, Zap, Search, MapPin,
  Sparkles, Repeat, Plus, ArrowRight,
  ShoppingCart, Heart, Trash2, ArrowUp, Sun, Moon, SlidersHorizontal,
  QrCode,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────── */
type Cat = "ios" | "ipad" | "watch";

interface Spec { label: string; value: string; }

interface Product {
  id: number; name: string; cat: Cat; price: number;
  badge: string | null; desc: string; gradient: string; emoji: string;
  specs: Spec[]; box: string[];
}

/* ─── Data ──────────────────────────────────────────────── */
const PRODUCTS: Product[] = [
  {
    id:1, name:"iPhone 16 Pro Max 256GB", cat:"ios", price:24999000, badge:"Terbaru",
    desc:"A18 Pro · ProCamera 48MP · Titanium", gradient:"from-slate-800 to-zinc-950", emoji:"📱",
    specs:[
      {label:"Chip",        value:"A18 Pro (3nm)"},
      {label:"Layar",       value:"6.9\" Super Retina XDR OLED, 120Hz ProMotion"},
      {label:"Kamera Utama",value:"48MP Fusion + 12MP Ultra Wide + 12MP 5x Telephoto"},
      {label:"Kamera Depan",value:"12MP TrueDepth + LiDAR"},
      {label:"Storage",     value:"256GB"},
      {label:"Baterai",     value:"~33 jam video playback, MagSafe 30W"},
      {label:"OS",          value:"iOS 18"},
      {label:"Konektivitas",value:"5G, Wi-Fi 7, Bluetooth 5.3, NFC"},
      {label:"Material",    value:"Titanium Grade 5 · Ceramic Shield"},
      {label:"Ketahanan",   value:"IP68 — 6m selama 30 menit"},
    ],
    box:["iPhone 16 Pro Max","Kabel USB-C 1m","Dokumentasi & Stiker"],
  },
  {
    id:2, name:"iPhone 15 Pro 128GB", cat:"ios", price:18999000, badge:"Terlaris",
    desc:"A17 Pro · 120Hz ProMotion · USB-C", gradient:"from-neutral-700 to-neutral-900", emoji:"📱",
    specs:[
      {label:"Chip",        value:"A17 Pro (3nm)"},
      {label:"Layar",       value:"6.1\" Super Retina XDR OLED, 120Hz ProMotion"},
      {label:"Kamera Utama",value:"48MP Main + 12MP Ultra Wide + 12MP 3x Telephoto"},
      {label:"Kamera Depan",value:"12MP TrueDepth"},
      {label:"Storage",     value:"128GB"},
      {label:"Baterai",     value:"~23 jam video playback, MagSafe 27W"},
      {label:"OS",          value:"iOS 18"},
      {label:"Konektivitas",value:"5G, Wi-Fi 6E, Bluetooth 5.3, USB-C 3.0"},
      {label:"Material",    value:"Titanium · Ceramic Shield"},
      {label:"Ketahanan",   value:"IP68 — 6m selama 30 menit"},
    ],
    box:["iPhone 15 Pro","Kabel USB-C 1m","Dokumentasi"],
  },
  {
    id:3, name:"iPhone 15 128GB", cat:"ios", price:11500000, badge:null,
    desc:"Dynamic Island · 48MP · iOS 18", gradient:"from-pink-800 to-rose-950", emoji:"📱",
    specs:[
      {label:"Chip",        value:"A16 Bionic"},
      {label:"Layar",       value:"6.1\" Super Retina XDR OLED, 60Hz"},
      {label:"Kamera Utama",value:"48MP Main + 12MP Ultra Wide"},
      {label:"Kamera Depan",value:"12MP TrueDepth"},
      {label:"Storage",     value:"128GB"},
      {label:"Baterai",     value:"~26 jam video playback, MagSafe 23W"},
      {label:"OS",          value:"iOS 18"},
      {label:"Konektivitas",value:"5G, Wi-Fi 6, Bluetooth 5.3, USB-C"},
      {label:"Fitur",       value:"Dynamic Island, Crash Detection"},
      {label:"Ketahanan",   value:"IP68 — 6m selama 30 menit"},
    ],
    box:["iPhone 15","Kabel USB-C 1m","Dokumentasi"],
  },
  {
    id:4, name:"iPhone 14 128GB", cat:"ios", price:9500000, badge:"Best Value",
    desc:"A15 Bionic · Dual Kamera · 5G", gradient:"from-blue-800 to-blue-950", emoji:"📱",
    specs:[
      {label:"Chip",        value:"A15 Bionic"},
      {label:"Layar",       value:"6.1\" Super Retina XDR OLED, 60Hz"},
      {label:"Kamera Utama",value:"12MP Main + 12MP Ultra Wide"},
      {label:"Kamera Depan",value:"12MP TrueDepth"},
      {label:"Storage",     value:"128GB"},
      {label:"Baterai",     value:"~20 jam video playback"},
      {label:"OS",          value:"iOS 18"},
      {label:"Konektivitas",value:"5G, Wi-Fi 6, Bluetooth 5.3, Lightning"},
      {label:"Fitur",       value:"Emergency SOS via Satellite, Crash Detection"},
      {label:"Ketahanan",   value:"IP68 — 6m selama 30 menit"},
    ],
    box:["iPhone 14","Kabel Lightning 1m","Dokumentasi"],
  },
  {
    id:5, name:"iPhone 13 128GB", cat:"ios", price:7000000, badge:null,
    desc:"A15 · Super Retina OLED · MagSafe", gradient:"from-green-800 to-emerald-950", emoji:"📱",
    specs:[
      {label:"Chip",        value:"A15 Bionic"},
      {label:"Layar",       value:"6.1\" Super Retina XDR OLED, 60Hz"},
      {label:"Kamera Utama",value:"12MP Main + 12MP Ultra Wide"},
      {label:"Kamera Depan",value:"12MP TrueDepth"},
      {label:"Storage",     value:"128GB"},
      {label:"Baterai",     value:"~19 jam video playback, MagSafe 15W"},
      {label:"OS",          value:"iOS 18"},
      {label:"Konektivitas",value:"5G, Wi-Fi 6, Bluetooth 5.0, Lightning"},
      {label:"Ketahanan",   value:"IP68 — 6m selama 30 menit"},
    ],
    box:["iPhone 13","Kabel Lightning 1m","Dokumentasi"],
  },
  {
    id:6, name:"iPhone SE 3rd 64GB", cat:"ios", price:4500000, badge:"Entry",
    desc:"A15 Bionic · 5G · Touch ID Compact", gradient:"from-gray-700 to-gray-900", emoji:"📱",
    specs:[
      {label:"Chip",        value:"A15 Bionic"},
      {label:"Layar",       value:"4.7\" Retina HD IPS LCD, 60Hz"},
      {label:"Kamera Utama",value:"12MP Wide"},
      {label:"Kamera Depan",value:"7MP"},
      {label:"Storage",     value:"64GB"},
      {label:"Baterai",     value:"~15 jam video playback"},
      {label:"OS",          value:"iOS 18"},
      {label:"Konektivitas",value:"5G, Wi-Fi 6, Bluetooth 5.0, Lightning"},
      {label:"Autentikasi", value:"Touch ID (tombol home)"},
      {label:"Ketahanan",   value:"IP67 — 1m selama 30 menit"},
    ],
    box:["iPhone SE","Kabel Lightning 1m","Dokumentasi"],
  },
  {
    id:7, name:"iPad Pro M4 11\" 256GB", cat:"ipad", price:17999000, badge:"Ultra Tipis",
    desc:"Chip M4 · OLED 11\" · USB 4.0 · Wi-Fi 6E", gradient:"from-indigo-800 to-indigo-950", emoji:"⬜",
    specs:[
      {label:"Chip",        value:"Apple M4 (3nm)"},
      {label:"Layar",       value:"11\" Ultra Retina XDR OLED Tandem, 120Hz ProMotion"},
      {label:"Storage",     value:"256GB"},
      {label:"RAM",         value:"8GB Unified Memory"},
      {label:"Kamera Belakang",value:"12MP Wide + 12MP Ultra Wide, LiDAR"},
      {label:"Kamera Depan",value:"12MP Ultra Wide (landscape)"},
      {label:"Konektivitas",value:"Wi-Fi 6E, Bluetooth 5.3, USB 4 / Thunderbolt 4"},
      {label:"Ketebalan",   value:"5.1mm (tertipis iPad ever)"},
      {label:"Baterai",     value:"~10 jam web, 28.65Wh"},
      {label:"Ketahanan",   value:"IPX3 — tahan percikan air"},
    ],
    box:["iPad Pro","Kabel USB-C 1m","Dokumentasi"],
  },
  {
    id:8, name:"iPad Air M2 11\" 128GB", cat:"ipad", price:11999000, badge:null,
    desc:"Chip M2 · Liquid Retina · Wi-Fi 6E", gradient:"from-sky-700 to-sky-950", emoji:"⬜",
    specs:[
      {label:"Chip",        value:"Apple M2"},
      {label:"Layar",       value:"11\" Liquid Retina IPS, 60Hz, True Tone"},
      {label:"Storage",     value:"128GB"},
      {label:"RAM",         value:"8GB Unified Memory"},
      {label:"Kamera Belakang",value:"12MP Wide"},
      {label:"Kamera Depan",value:"12MP Ultra Wide (landscape)"},
      {label:"Konektivitas",value:"Wi-Fi 6E, Bluetooth 5.3, USB-C 3.0"},
      {label:"Baterai",     value:"~10 jam web, 28.93Wh"},
      {label:"Kompatibel",  value:"Apple Pencil Pro, Magic Keyboard Folio"},
    ],
    box:["iPad Air","Kabel USB-C 1m","Dokumentasi"],
  },
  {
    id:9, name:"iPad Mini 6th 64GB", cat:"ipad", price:8500000, badge:"Compact",
    desc:"A15 Bionic · 8.3\" · USB-C · 5G optional", gradient:"from-violet-700 to-violet-950", emoji:"⬜",
    specs:[
      {label:"Chip",        value:"A15 Bionic"},
      {label:"Layar",       value:"8.3\" Liquid Retina IPS, 500 nits, True Tone"},
      {label:"Storage",     value:"64GB"},
      {label:"Kamera Belakang",value:"12MP Wide"},
      {label:"Kamera Depan",value:"12MP Ultra Wide"},
      {label:"Konektivitas",value:"Wi-Fi 6, Bluetooth 5.0, USB-C"},
      {label:"Baterai",     value:"~10 jam web, 19.3Wh"},
      {label:"Kompatibel",  value:"Apple Pencil 2nd Gen"},
    ],
    box:["iPad Mini","Kabel USB-C 1m","Dokumentasi"],
  },
  {
    id:10, name:"iPad 10th Gen 64GB", cat:"ipad", price:6000000, badge:null,
    desc:"A14 Bionic · 10.9\" · USB-C · Wi-Fi", gradient:"from-amber-700 to-amber-950", emoji:"⬜",
    specs:[
      {label:"Chip",        value:"A14 Bionic"},
      {label:"Layar",       value:"10.9\" Liquid Retina IPS, 60Hz, True Tone"},
      {label:"Storage",     value:"64GB"},
      {label:"Kamera Belakang",value:"12MP Wide"},
      {label:"Kamera Depan",value:"12MP Ultra Wide (landscape)"},
      {label:"Konektivitas",value:"Wi-Fi 6, Bluetooth 5.2, USB-C"},
      {label:"Baterai",     value:"~10 jam web, 28.65Wh"},
      {label:"Fitur",       value:"Touch ID (tombol samping), USB-C"},
    ],
    box:["iPad 10th Gen","Kabel USB-C 1m","Dokumentasi"],
  },
  {
    id:11, name:"Apple Watch Ultra 2", cat:"watch", price:14500000, badge:"Premium",
    desc:"Titanium Case · 60hr Battery · Trail Loop", gradient:"from-orange-700 to-red-900", emoji:"⌚",
    specs:[
      {label:"Chip",        value:"S9 SiP + W3 Wireless + U2 Ultra Wideband"},
      {label:"Layar",       value:"49mm Always-On LTPO OLED Retina, 3000 nits"},
      {label:"Baterai",     value:"60 jam (normal) / 36 jam (high-performance)"},
      {label:"Material",    value:"Titanium kelas aerospace"},
      {label:"Ketahanan",   value:"100m water resistance, MIL-STD-810H"},
      {label:"Sensor",      value:"ECG, SpO2, Suhu kulit, Kompas, GPS Dual-freq"},
      {label:"OS",          value:"watchOS 11"},
      {label:"Konektivitas",value:"LTE/UMTS, Wi-Fi, Bluetooth 5.3, NFC"},
      {label:"Fitur",       value:"Crash/Fall Detection, Siren 86dB, Emergency SOS"},
    ],
    box:["Apple Watch Ultra 2","Trail Loop Band","Kabel Magnetic Fast Charger","Dokumentasi"],
  },
  {
    id:12, name:"Apple Watch Series 10", cat:"watch", price:7500000, badge:"Terbaru",
    desc:"ECG · Display Terbesar · Ultra-wideband", gradient:"from-teal-700 to-teal-950", emoji:"⌚",
    specs:[
      {label:"Chip",        value:"S10 SiP"},
      {label:"Layar",       value:"46mm / 42mm Always-On LTPO OLED, 2000 nits"},
      {label:"Baterai",     value:"18 jam (standard) / 36 jam (low power)"},
      {label:"Material",    value:"Aluminum atau Titanium"},
      {label:"Ketahanan",   value:"50m water resistance, IP6X"},
      {label:"Sensor",      value:"ECG, SpO2, Suhu kulit, Heart Rate, GPS"},
      {label:"OS",          value:"watchOS 11"},
      {label:"Konektivitas",value:"Wi-Fi, Bluetooth 5.3, NFC, Ultra Wideband"},
      {label:"Ketebalan",   value:"9.7mm (tertipis Apple Watch)"},
    ],
    box:["Apple Watch Series 10","Sport Band","Kabel Magnetic Fast Charger","Dokumentasi"],
  },
  {
    id:13, name:"Apple Watch SE 2nd", cat:"watch", price:3499000, badge:null,
    desc:"Crash Detection · Family Setup · S8 chip", gradient:"from-rose-700 to-rose-950", emoji:"⌚",
    specs:[
      {label:"Chip",        value:"S8 SiP"},
      {label:"Layar",       value:"44mm / 40mm Always-On Retina LTPO OLED"},
      {label:"Baterai",     value:"18 jam (standard)"},
      {label:"Material",    value:"Aluminum"},
      {label:"Ketahanan",   value:"50m water resistance, IP6X"},
      {label:"Sensor",      value:"Heart Rate, SpO2, Kompas, GPS"},
      {label:"OS",          value:"watchOS 11"},
      {label:"Konektivitas",value:"Wi-Fi, Bluetooth 5.0, NFC"},
      {label:"Fitur",       value:"Crash Detection, Fall Detection, Family Setup"},
    ],
    box:["Apple Watch SE 2","Sport Band","Kabel Magnetic Charger","Dokumentasi"],
  },
  {
    id:14, name:"Samsung Galaxy Watch 7", cat:"watch", price:4999000, badge:null,
    desc:"BioActive Sensor · AI Health · Galaxy AI", gradient:"from-blue-700 to-blue-950", emoji:"⌚",
    specs:[
      {label:"Chip",        value:"Exynos W1000 (3nm)"},
      {label:"Layar",       value:"47mm / 44mm AMOLED, 60Hz, 3000 nits"},
      {label:"Baterai",     value:"47mm: 590mAh / 44mm: 425mAh, fast wireless"},
      {label:"Material",    value:"Aluminum"},
      {label:"Ketahanan",   value:"5ATM + IP68, MIL-STD-810H"},
      {label:"Sensor",      value:"BioActive (HR, SpO2, ECG, Galvanic), GPS"},
      {label:"OS",          value:"Wear OS 5 + One UI Watch 6"},
      {label:"Konektivitas",value:"LTE/Wi-Fi, Bluetooth 5.3, NFC"},
      {label:"Fitur",       value:"Galaxy AI Health, Sleep Coach, Energy Score"},
    ],
    box:["Galaxy Watch 7","Sport Band","Wireless Charger Dock","Dokumentasi"],
  },
  {
    id:15, name:"iPhone 16 Pro 128GB", cat:"ios", price:21999000, badge:"Baru",
    desc:"A18 Pro · Camera Control · Titanium", gradient:"from-zinc-700 to-zinc-900", emoji:"📱",
    specs:[
      {label:"Chip",        value:"A18 Pro (3nm)"},
      {label:"Layar",       value:"6.3\" Super Retina XDR OLED, 120Hz ProMotion"},
      {label:"Kamera Utama",value:"48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto"},
      {label:"Kamera Depan",value:"12MP TrueDepth"},
      {label:"Storage",     value:"128GB"},
      {label:"Baterai",     value:"~27 jam video playback"},
      {label:"OS",          value:"iOS 18"},
      {label:"Konektivitas",value:"5G, Wi-Fi 7, Bluetooth 5.3, USB-C 3.0"},
      {label:"Fitur",       value:"Camera Control, Apple Intelligence"},
      {label:"Material",    value:"Titanium · Ceramic Shield"},
    ],
    box:["iPhone 16 Pro","Kabel USB-C 1m","Dokumentasi"],
  },
  {
    id:16, name:"iPhone 16 128GB", cat:"ios", price:14999000, badge:"Baru",
    desc:"A18 · Camera Control · Dynamic Island", gradient:"from-sky-700 to-sky-950", emoji:"📱",
    specs:[
      {label:"Chip",        value:"A18 (3nm)"},
      {label:"Layar",       value:"6.1\" Super Retina XDR OLED, 60Hz"},
      {label:"Kamera Utama",value:"48MP Fusion + 12MP Ultra Wide"},
      {label:"Kamera Depan",value:"12MP TrueDepth"},
      {label:"Storage",     value:"128GB"},
      {label:"Baterai",     value:"~22 jam video playback"},
      {label:"OS",          value:"iOS 18"},
      {label:"Konektivitas",value:"5G, Wi-Fi 7, Bluetooth 5.3, USB-C"},
      {label:"Fitur",       value:"Camera Control, Dynamic Island, Apple Intelligence"},
      {label:"Ketahanan",   value:"IP68 — 6m selama 30 menit"},
    ],
    box:["iPhone 16","Kabel USB-C 1m","Dokumentasi"],
  },
  {
    id:17, name:"iPhone 16 Plus 128GB", cat:"ios", price:16999000, badge:null,
    desc:"A18 · Layar 6.7\" · Baterai Jumbo", gradient:"from-teal-700 to-teal-950", emoji:"📱",
    specs:[
      {label:"Chip",        value:"A18 (3nm)"},
      {label:"Layar",       value:"6.7\" Super Retina XDR OLED, 60Hz"},
      {label:"Kamera Utama",value:"48MP Fusion + 12MP Ultra Wide"},
      {label:"Kamera Depan",value:"12MP TrueDepth"},
      {label:"Storage",     value:"128GB"},
      {label:"Baterai",     value:"~27 jam video playback (terbesar)"},
      {label:"OS",          value:"iOS 18"},
      {label:"Konektivitas",value:"5G, Wi-Fi 7, Bluetooth 5.3, USB-C"},
      {label:"Fitur",       value:"Camera Control, Apple Intelligence"},
      {label:"Ketahanan",   value:"IP68 — 6m selama 30 menit"},
    ],
    box:["iPhone 16 Plus","Kabel USB-C 1m","Dokumentasi"],
  },
  {
    id:18, name:"iPhone 12 128GB", cat:"ios", price:6000000, badge:"Best Value",
    desc:"A14 Bionic · OLED · 5G · MagSafe", gradient:"from-purple-800 to-purple-950", emoji:"📱",
    specs:[
      {label:"Chip",        value:"A14 Bionic"},
      {label:"Layar",       value:"6.1\" Super Retina XDR OLED, 60Hz"},
      {label:"Kamera Utama",value:"12MP Wide + 12MP Ultra Wide"},
      {label:"Kamera Depan",value:"12MP TrueDepth"},
      {label:"Storage",     value:"128GB"},
      {label:"Baterai",     value:"~17 jam video playback, MagSafe"},
      {label:"OS",          value:"iOS 18"},
      {label:"Konektivitas",value:"5G, Wi-Fi 6, Bluetooth 5.0, Lightning"},
      {label:"Ketahanan",   value:"IP68 — 6m selama 30 menit"},
    ],
    box:["iPhone 12","Kabel Lightning 1m","Dokumentasi"],
  },
  {
    id:19, name:'iPad Pro M4 13" 512GB', cat:"ipad", price:23999000, badge:"Pro",
    desc:"M4 · OLED 13\" · 512GB · Thunderbolt", gradient:"from-indigo-700 to-indigo-950", emoji:"⬜",
    specs:[
      {label:"Chip",        value:"Apple M4 (3nm, 10-core)"},
      {label:"Layar",       value:"13\" Ultra Retina XDR OLED Tandem, 120Hz"},
      {label:"Storage",     value:"512GB"},
      {label:"RAM",         value:"16GB Unified Memory"},
      {label:"Kamera Belakang",value:"12MP Wide, LiDAR Scanner"},
      {label:"Kamera Depan",value:"12MP Ultra Wide (landscape)"},
      {label:"Konektivitas",value:"Wi-Fi 6E, Bluetooth 5.3, Thunderbolt 4 / USB 4"},
      {label:"Ketebalan",   value:"5.1mm (tertipis iPad ever)"},
      {label:"Kompatibel",  value:"Apple Pencil Pro, Magic Keyboard"},
    ],
    box:["iPad Pro 13\"","Kabel USB-C 1m","Dokumentasi"],
  },
  {
    id:20, name:'iPad Air M2 13" 128GB', cat:"ipad", price:14499000, badge:null,
    desc:"M2 · Liquid Retina 13\" · Wi-Fi 6E", gradient:"from-blue-700 to-blue-950", emoji:"⬜",
    specs:[
      {label:"Chip",        value:"Apple M2"},
      {label:"Layar",       value:"13\" Liquid Retina IPS, 60Hz, True Tone"},
      {label:"Storage",     value:"128GB"},
      {label:"RAM",         value:"8GB Unified Memory"},
      {label:"Kamera Belakang",value:"12MP Wide"},
      {label:"Kamera Depan",value:"12MP Ultra Wide (landscape)"},
      {label:"Konektivitas",value:"Wi-Fi 6E, Bluetooth 5.3, USB-C"},
      {label:"Baterai",     value:"~10 jam web, 36.59Wh"},
      {label:"Kompatibel",  value:"Apple Pencil Pro, Magic Keyboard"},
    ],
    box:["iPad Air 13\"","Kabel USB-C 1m","Dokumentasi"],
  },
  {
    id:21, name:"Apple Watch Series 9 45mm", cat:"watch", price:6500000, badge:null,
    desc:"S9 · Double Tap · ECG · 2000 nits", gradient:"from-rose-700 to-rose-950", emoji:"⌚",
    specs:[
      {label:"Chip",        value:"S9 SiP"},
      {label:"Layar",       value:"45mm Always-On LTPO OLED, 2000 nits"},
      {label:"Baterai",     value:"18 jam (standar) / 36 jam (low power)"},
      {label:"Material",    value:"Aluminum"},
      {label:"Ketahanan",   value:"50m water resistance, IP6X"},
      {label:"Sensor",      value:"ECG, SpO2, Suhu kulit, Heart Rate, GPS"},
      {label:"OS",          value:"watchOS 11"},
      {label:"Fitur",       value:"Double Tap, Crash & Fall Detection"},
    ],
    box:["Apple Watch Series 9","Sport Band","Kabel Magnetic Charger","Dokumentasi"],
  },
  {
    id:22, name:"Samsung Galaxy Watch Ultra", cat:"watch", price:11999000, badge:"Premium",
    desc:"Titanium · 3000 nits · 100 jam Battery", gradient:"from-amber-700 to-orange-950", emoji:"⌚",
    specs:[
      {label:"Chip",        value:"Exynos W1000 (3nm)"},
      {label:"Layar",       value:"47mm Sapphire AMOLED, 3000 nits"},
      {label:"Baterai",     value:"590mAh — hingga 100 jam (power saving)"},
      {label:"Material",    value:"Titanium Grade 4"},
      {label:"Ketahanan",   value:"10ATM + IP68, MIL-STD-810H"},
      {label:"Sensor",      value:"BioActive (HR, SpO2, ECG), Dual-freq GPS"},
      {label:"OS",          value:"Wear OS 5 + One UI Watch 6"},
      {label:"Fitur",       value:"Quick Button, Galaxy AI, FAI Health"},
    ],
    box:["Galaxy Watch Ultra","Marine/Trail Band","Charger","Dokumentasi"],
  },
];

const HERO_SLIDES = [
  {
    category:"HP iOS", headline:"iPhone 16", sub2:"Series",
    sub:"Chip A18 Pro · Titanium Design · ProCamera Cinematic",
    highlight:"Terbaru 2024", emoji:"📱", glowColor:"rgba(59,130,246,0.22)",
    bgGradient:"linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0a1628 100%)",
    specs:[{label:"Chip A18 Pro",icon:"⚡"},{label:"Kamera 48MP",icon:"📸"},{label:"Garansi Resmi",icon:"✓"}],
  },
  {
    category:"iPad", headline:"iPad Pro", sub2:"M4",
    sub:"Ultra Tipis · Layar OLED · Chip M4 Tercepat",
    highlight:"Tertipis Sedunia", emoji:"📋", glowColor:"rgba(139,92,246,0.22)",
    bgGradient:"linear-gradient(135deg,#1e1b4b 0%,#0f172a 50%,#170d2b 100%)",
    specs:[{label:"Chip M4",icon:"⚡"},{label:"OLED 11\"",icon:"✨"},{label:"USB 4.0",icon:"🔗"}],
  },
  {
    category:"Smartwatch", headline:"Apple Watch", sub2:"Ultra 2",
    sub:"Titanium · 60hr Battery · ECG · Trail Loop",
    highlight:"Gaya & Sehat", emoji:"⌚", glowColor:"rgba(16,185,129,0.22)",
    bgGradient:"linear-gradient(135deg,#0c1a12 0%,#0f2d1a 50%,#071a0e 100%)",
    specs:[{label:"60hr Battery",icon:"🔋"},{label:"ECG & SpO2",icon:"❤️"},{label:"Tahan Air 100m",icon:"💧"}],
  },
];

const HERO_IMG = ["/products/1.png", "/products/7.jpg", "/products/11.jpg"];
const CAT_DEFAULT_IMG: Record<string,string> = { ios:"/products/1.png", ipad:"/products/7.jpg", watch:"/products/11.jpg" };
const imgOf = (p: { id:number; cat:Cat }) => PRODUCT_IMG[p.id] || CAT_DEFAULT_IMG[p.cat];

const GRID_BG = {
  backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
  backgroundSize:"22px 22px",
} as const;

const STATS = [
  { end:1200, suffix:"+",   label:"Unit Terjual",   decimals:0 },
  { end:980,  suffix:"+",   label:"Pelanggan Puas", decimals:0 },
  { end:4.9,  suffix:"",    label:"Rating Toko",    decimals:1 },
  { end:2,    suffix:" Thn",label:"Pengalaman",     decimals:0 },
];

const CATEGORY_SHOWCASE = [
  { id:"ios",   label:"iPhone",     desc:"Dari iPhone SE sampai 16 Pro Max", img:"/products/2.png",  gradient:"from-blue-600 via-blue-700 to-blue-950",         count:10 },
  { id:"ipad",  label:"iPad",       desc:"Air, Pro & Mini buat produktivitas", img:"/products/7.jpg",  gradient:"from-violet-600 via-violet-700 to-violet-950",   count:6 },
  { id:"watch", label:"Smartwatch", desc:"Apple Watch & Galaxy Watch",         img:"/products/11.jpg", gradient:"from-emerald-600 via-emerald-700 to-emerald-950",count:6 },
];

const SPOTLIGHTS = [
  { id:1,  name:"iPhone 16 Pro Max", img:"/products/1.png",  price:24999000, tag:"Flagship · Terbaru",
    desc:"Performa chip A18 Pro, kamera ProCamera 48MP yang sinematik, dan bodi Titanium paling premium dari Apple.",
    gradient:"from-slate-800 via-slate-900 to-zinc-950", glow:"rgba(59,130,246,0.40)",
    highlights:["Chip A18 Pro","Kamera 48MP","Titanium","ProMotion 120Hz"] },
  { id:7,  name:'iPad Pro M4 11"',   img:"/products/7.jpg",  price:17999000, tag:"Produktivitas Maksimal",
    desc:"Chip M4 sekencang laptop, layar Ultra Retina XDR OLED, dan bodi tertipis sepanjang sejarah iPad.",
    gradient:"from-indigo-800 via-indigo-900 to-violet-950", glow:"rgba(139,92,246,0.40)",
    highlights:["Chip M4","OLED Tandem","Bodi 5.1mm","Apple Pencil Pro"] },
  { id:11, name:"Apple Watch Ultra 2", img:"/products/11.jpg", price:14500000, tag:"Petualangan & Kesehatan",
    desc:"Titanium tahan banting, baterai hingga 60 jam, GPS dual-frequency, dan sensor kesehatan terlengkap.",
    gradient:"from-orange-700 via-red-800 to-rose-950", glow:"rgba(249,115,22,0.40)",
    highlights:["Titanium","Baterai 60 Jam","ECG & SpO2","Tahan Air 100m"] },
];

const FAQ = [
  { q:"Apakah semua produk original dan bergaransi?", a:"Ya, 100% original dan bergaransi resmi. Kamu bisa cek keaslian unit lewat nomor seri / IMEI langsung sebelum membayar." },
  { q:"Bisa COD atau kirim ke luar kota?", a:"Bisa. COD tersedia untuk area sekitar, dan pengiriman ke luar kota lewat ekspedisi terpercaya dengan asuransi pengiriman." },
  { q:"Apakah ada opsi cicilan?", a:"Ada beberapa metode cicilan yang bisa dipilih. Chat kami untuk simulasi cicilan sesuai produk yang kamu incar." },
  { q:"Bagaimana cara program tukar tambah?", a:"Info-kan atau bawa gadget lamamu, tim kami cek kondisinya, lalu beri penawaran harga untuk memotong harga unit baru." },
  { q:"Berapa lama garansi dan after-sales-nya?", a:"Mengikuti garansi resmi tiap brand. Kami juga bantu proses klaim garansi & konsultasi after-sales secara gratis." },
];

const CAT_FILTERS = [
  {id:"all",   label:"Semua",     color:"from-slate-600 to-slate-700"},
  {id:"ios",   label:"HP iOS",    color:"from-blue-600 to-blue-700"},
  {id:"ipad",  label:"iPad",      color:"from-violet-600 to-violet-700"},
  {id:"watch", label:"Smartwatch",color:"from-emerald-600 to-emerald-700"},
];

const BUDGET_FILTERS = [
  {id:"all",      label:"Semua Harga",   min:0,       max:Infinity},
  {id:"entry",    label:"Entry < 5jt",   min:0,       max:5000000},
  {id:"midrange", label:"Mid 5–15jt",    min:5000000, max:15000000},
  {id:"flagship", label:"Flagship >15jt",min:15000000,max:Infinity},
];

const TESTIMONIALS = [
  {name:"Budi S.",  rating:5, text:"Beli iPhone 15 Pro langsung berasa bedanya! Original, pelayanan cepat & ramah.", avatar:"B"},
  {name:"Siti R.",  rating:5, text:"iPad Air M2-nya keren banget buat kuliah. Harga kompetitif, garansi resmi.", avatar:"S"},
  {name:"Ahmad F.", rating:5, text:"Apple Watch Series 9 saya dapat di sini. Staff bantu pilihkan sesuai budget.", avatar:"A"},
  {name:"Dewi K.",  rating:4, text:"Rekomendasi buat semua yang cari gadget Apple original dengan harga terjangkau!", avatar:"D"},
];

const WA = "6285123456789";
const WA_DEFAULT = `https://wa.me/${WA}?text=Halo%20Iku%20Gadget%2C%20saya%20mau%20tanya%20produk`;
const waLink = (name: string) =>
  `https://wa.me/${WA}?text=Halo%20Iku%20Gadget%2C%20saya%20tertarik%20dengan%20${encodeURIComponent(name)}%2C%20bisa%20info%20harga%3F`;

function fmt(p: number) {
  return p >= 1_000_000
    ? `Rp ${(p / 1_000_000).toFixed(1).replace(".0","")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}jt`
    : `Rp ${p.toLocaleString("id-ID")}`;
}
const rp = (n: number) => `Rp ${Math.round(n).toLocaleString("id-ID")}`;

function Stars({n}:{n:number}) {
  return (
    <div className="flex gap-0.5">
      {Array.from({length:5}).map((_,i)=>(
        <Star key={i} className={`h-3.5 w-3.5 ${i<n?"fill-amber-400 text-amber-400":"text-slate-300"}`}/>
      ))}
    </div>
  );
}

/* Angka count-up saat masuk layar */
function Counter({ end, dur=1700, suffix="", decimals=0 }: { end:number; dur?:number; suffix?:string; decimals?:number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach(e => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const t0 = performance.now();
          const step = (t: number) => {
            const p = Math.min((t - t0) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(ease * end);
            if (p < 1) requestAnimationFrame(step); else setVal(end);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [end, dur]);
  return <span ref={ref}>{val.toLocaleString("id-ID",{minimumFractionDigits:decimals,maximumFractionDigits:decimals})}{suffix}</span>;
}

/* ─── Product Detail Modal ──────────────────────────────── */
function ProductModal({product, onClose, inCart, inWish, onToggleCart, onToggleWish, onQris}: {
  product: Product; onClose: () => void;
  inCart: boolean; inWish: boolean; onToggleCart: () => void; onToggleWish: () => void; onQris: () => void;
}) {
  const catLabel = product.cat==="ios"?"HP iOS":product.cat==="ipad"?"iPad":"Smartwatch";
  const catColor = product.cat==="ios"
    ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
    : product.cat==="ipad"
    ? "bg-violet-500/20 text-violet-400 border-violet-500/30"
    : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";

  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center"
      onClick={(e)=>{ if(e.target===e.currentTarget) onClose(); }}>
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose}/>

      {/* panel */}
      <div className="relative w-full md:max-w-2xl max-h-[92vh] md:max-h-[88vh] overflow-y-auto
        bg-background rounded-t-3xl md:rounded-3xl z-10 modal-slide-up shadow-2xl">

        {/* Close + Wishlist */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-20 h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur flex items-center justify-center transition-colors">
          <X className="h-4 w-4"/>
        </button>
        <button onClick={onToggleWish}
          className={`absolute top-4 right-14 z-20 h-8 w-8 rounded-full backdrop-blur flex items-center justify-center transition-colors ${inWish?"bg-rose-500/90 text-white":"bg-black/30 hover:bg-black/50 text-white"}`}
          title={inWish?"Hapus dari favorit":"Tambah ke favorit"}>
          <Heart className={`h-4 w-4 ${inWish?"fill-white":""}`}/>
        </button>

        {/* Hero gradient */}
        <div className={`relative bg-gradient-to-br ${product.gradient} h-56 flex flex-col items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 opacity-[0.04]"
            style={{backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",backgroundSize:"20px 20px"}}/>
          <div className="absolute inset-0 z-10">
            <Device3D src={imgOf(product)} className="!w-full !h-full" />
          </div>
          {product.badge && (
            <span className="absolute top-4 left-4 text-xs font-bold bg-white/90 text-slate-800 rounded-full px-3 py-1">
              {product.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Name & price */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-xs font-semibold border rounded-full px-2.5 py-0.5 ${catColor}`}>{catLabel}</span>
              </div>
              <h2 className="text-xl font-bold leading-tight">{product.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{product.desc}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xl font-black text-primary leading-none">{fmt(product.price)}</p>
              <p className="text-xs text-muted-foreground mt-1">Harga normal</p>
            </div>
          </div>

          {/* Specs */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
              <span className="text-base">📋</span> Spesifikasi
            </h3>
            <div className="rounded-xl border overflow-hidden divide-y">
              {product.specs.map((s, i) => (
                <div key={i} className={`flex text-sm ${i%2===0?"bg-muted/30":"bg-background"}`}>
                  <span className="w-[42%] px-4 py-2.5 text-muted-foreground font-medium shrink-0">{s.label}</span>
                  <span className="px-4 py-2.5 font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* In the box */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
              <span className="text-base">📦</span> Isi Kotak
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {product.box.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-muted/40 rounded-xl px-3 py-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0"/>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cicilan */}
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5"><CreditCard className="h-3.5 w-3.5"/> Estimasi cicilan (tanpa bunga, ilustrasi)</p>
            <div className="grid grid-cols-3 gap-2">
              {[6,12,24].map(tenor=>(
                <div key={tenor} className="rounded-lg bg-background border p-2.5 text-center">
                  <p className="text-sm font-bold text-primary leading-none">{rp(product.price/tenor)}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">/bln × {tenor}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Garansi note */}
          <div className="flex items-center gap-3 bg-primary/8 border border-primary/20 rounded-xl px-4 py-3">
            <Shield className="h-5 w-5 text-primary shrink-0"/>
            <p className="text-sm text-primary font-medium">Produk original bergaransi resmi. Bisa dicek keasliannya.</p>
          </div>

          {/* CTA */}
          <div className="flex gap-2">
            <Button size="lg" variant={inCart?"secondary":"outline"} onClick={onToggleCart}
              className="gap-2 shrink-0">
              {inCart ? <><CheckCircle2 className="h-5 w-5"/> Di Keranjang</> : <><ShoppingCart className="h-5 w-5"/> Keranjang</>}
            </Button>
            <a href={waLink(product.name)} target="_blank" rel="noreferrer" className="flex-1">
              <Button size="lg" className="w-full gap-2 shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all">
                <MessageCircle className="h-5 w-5"/> Tanya via WhatsApp
              </Button>
            </a>
          </div>
          <Button size="lg" variant="outline" onClick={onQris}
            className="w-full gap-2 border-rose-500/40 text-rose-600 hover:bg-rose-500/10">
            <QrCode className="h-5 w-5"/> Bayar via QRIS
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function StoreFront() {
  const [intro, setIntro]        = useState(true);
  const [menuOpen, setMenuOpen]  = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const [slide, setSlide]        = useState(0);
  const [lockSlide, setLockSlide]= useState(false);
  const [cat, setCat]            = useState("all");
  const [budget, setBudget]      = useState("all");
  const [search, setSearch]      = useState("");
  const [detail, setDetail]      = useState<Product|null>(null);
  const [faqOpen, setFaqOpen]    = useState(-1);
  const [sort, setSort]          = useState("relevan");
  const [showFav, setShowFav]    = useState(false);
  const [cart, setCart]          = useState<number[]>([]);
  const [wishlist, setWishlist]  = useState<number[]>([]);
  const [cartOpen, setCartOpen]  = useState(false);
  const [dark, setDark]          = useState(false);
  const [showTop, setShowTop]    = useState(false);
  const [qris, setQris]          = useState<{ amount: number; label: string } | null>(null);
  const b1 = useRef<HTMLDivElement>(null);
  const b2 = useRef<HTMLDivElement>(null);

  // Muat preferensi tersimpan
  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("iku_cart") || "[]"));
      setWishlist(JSON.parse(localStorage.getItem("iku_wishlist") || "[]"));
      if (localStorage.getItem("iku_theme") === "dark") {
        setDark(true);
        document.documentElement.classList.add("dark");
      }
    } catch { /* ignore */ }
  }, []);
  useEffect(() => { localStorage.setItem("iku_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("iku_wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const inCart = (id: number) => cart.includes(id);
  const inWish = (id: number) => wishlist.includes(id);
  const toggleCart = (id: number) => setCart(c => c.includes(id) ? c.filter(x=>x!==id) : [...c, id]);
  const toggleWish = (id: number) => setWishlist(w => w.includes(id) ? w.filter(x=>x!==id) : [...w, id]);
  const toggleDark = () => setDark(d => {
    const nd = !d;
    document.documentElement.classList.toggle("dark", nd);
    localStorage.setItem("iku_theme", nd ? "dark" : "light");
    return nd;
  });

  const cartItems = PRODUCTS.filter(p => cart.includes(p.id));
  const cartTotal = cartItems.reduce((s,p)=>s+p.price, 0);
  const orderWA = () => {
    const lines = cartItems.map((p,i)=>`${i+1}. ${p.name} - ${rp(p.price)}`).join("%0A");
    return `https://wa.me/${WA}?text=${encodeURIComponent("Halo Iku Gadget, saya mau pesan:")}%0A${lines}%0A%0A${encodeURIComponent("Total: "+rp(cartTotal))}`;
  };

  const CAT_TO_SLIDE: Record<string, number> = { ios:0, ipad:1, watch:2 };

  // Pilih kategori → sinkronkan filter katalog + tema hero
  const selectCategory = (c: string) => {
    setCat(c);
    if (c === "all") {
      setLockSlide(false);
    } else {
      setSlide(CAT_TO_SLIDE[c]);
      setLockSlide(true);
    }
  };

  // Dari intro orbit: pilih kategori lalu langsung ke pilihan produknya
  const handleEnter = (c: "all" | "ios" | "ipad" | "watch") => {
    selectCategory(c);
    setIntro(false);
    setTimeout(() => {
      if (c === "all") window.scrollTo({ top: 0, behavior: "auto" });
      else document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" });
    }, 160);
  };

  useEffect(() => {
    if (lockSlide) return;
    const id = setInterval(() => setSlide(s => (s+1)%HERO_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [lockSlide]);

  // Parallax di-lerp via rAF biar buttery + progress bar
  useEffect(() => {
    let targetY = window.scrollY, curY = targetY, raf = 0;
    const onScroll = () => {
      targetY = window.scrollY;
      setScrolled(targetY > 20);
      setShowTop(targetY > 700);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const bar = document.getElementById("scroll-progress");
      if (bar) bar.style.width = ((targetY/Math.max(max,1))*100)+"%";
    };
    const loop = () => {
      curY += (targetY - curY) * 0.09;
      if (b1.current) b1.current.style.transform = `translate3d(0,${(curY*0.3).toFixed(1)}px,0)`;
      if (b2.current) b2.current.style.transform = `translate3d(0,${(curY*-0.18).toFixed(1)}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("scroll", onScroll, {passive:true});
    onScroll();
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Scroll reveal via IntersectionObserver — jauh lebih smooth
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".sr,.sr-left,.sr-right,.slide-bg-panel").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [cat, budget, search, showFav, sort, intro]);

  // Tilt 3D elegan mengikuti kursor untuk kartu
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const cleanups = els.map(el => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const fx = (e.clientX - r.left) / r.width;
        const fy = (e.clientY - r.top)  / r.height;
        const px = fx - 0.5, py = fy - 0.5;
        el.style.setProperty("--mx", (fx*100).toFixed(1) + "%");
        el.style.setProperty("--my", (fy*100).toFixed(1) + "%");
        el.style.transition = "transform 0.12s cubic-bezier(0.22,1,0.36,1)";
        el.style.transform  = `perspective(900px) rotateX(${(-py*6).toFixed(2)}deg) rotateY(${(px*6).toFixed(2)}deg) translateY(-6px)`;
      };
      const leave = () => {
        el.style.transition = "transform 0.55s cubic-bezier(0.16,1,0.3,1)";
        el.style.transform  = "";
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
    });
    return () => cleanups.forEach(c => c());
  }, [cat, budget, search, showFav, sort]);

  // lock body scroll saat intro / modal terbuka
  useEffect(() => {
    document.body.style.overflow = (detail || intro || cartOpen || qris) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [detail, intro, cartOpen, qris]);

  const filtered = useMemo(() => {
    const bObj = BUDGET_FILTERS.find(b=>b.id===budget)!;
    let list = PRODUCTS.filter(p => {
      if (cat!=="all" && p.cat!==cat) return false;
      if (budget!=="all" && (p.price<bObj.min || p.price>=bObj.max)) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (showFav && !wishlist.includes(p.id)) return false;
      return true;
    });
    if (sort==="murah")      list = [...list].sort((a,b)=>a.price-b.price);
    else if (sort==="mahal") list = [...list].sort((a,b)=>b.price-a.price);
    else if (sort==="nama")  list = [...list].sort((a,b)=>a.name.localeCompare(b.name));
    return list;
  }, [cat, budget, search, showFav, sort, wishlist]);

  const cur = HERO_SLIDES[slide];

  return (
    <>
      {intro && <IntroSplash onEnter={handleEnter} />}
      {detail && <ProductModal product={detail} onClose={() => setDetail(null)}
        inCart={inCart(detail.id)} inWish={inWish(detail.id)}
        onToggleCart={() => toggleCart(detail.id)} onToggleWish={() => toggleWish(detail.id)}
        onQris={() => { setQris({ amount: detail.price, label: detail.name }); setDetail(null); }} />}

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <div id="scroll-progress"/>

        {/* ── NAVBAR ── */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled?"bg-white/90 backdrop-blur-md shadow-sm border-b":"bg-transparent"}`}>
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="Logo" className="h-9 w-9 rounded-xl"/>
              <span className={`font-bold text-lg tracking-tight ${scrolled?"text-foreground":"text-white"}`}>
                Iku Gadget <span className="text-primary">&amp; Stuff</span>
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {[["Beranda","#beranda"],["Produk","#produk"],["Tentang","#tentang"],["Kontak","#kontak"]].map(([label,href])=>(
                <a key={label} href={href} className={`text-sm font-medium transition-colors hover:text-primary ${scrolled?"text-foreground/70":"text-white/80 hover:text-white"}`}>{label}</a>
              ))}
            </nav>
            <div className="flex items-center gap-1.5">
              {/* Ikon aksi (selalu tampil) */}
              <button onClick={toggleDark} title="Ganti tema"
                className={`h-9 w-9 rounded-full flex items-center justify-center transition-colors ${scrolled?"hover:bg-muted text-foreground":"text-white hover:bg-white/10"}`}>
                {dark ? <Sun className="h-[18px] w-[18px]"/> : <Moon className="h-[18px] w-[18px]"/>}
              </button>
              <button onClick={()=>{ setShowFav(true); document.getElementById("produk")?.scrollIntoView({behavior:"smooth"}); }} title="Favorit"
                className={`relative h-9 w-9 rounded-full flex items-center justify-center transition-colors ${scrolled?"hover:bg-muted text-foreground":"text-white hover:bg-white/10"}`}>
                <Heart className="h-[18px] w-[18px]"/>
                {wishlist.length>0 && <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">{wishlist.length}</span>}
              </button>
              <button onClick={()=>setCartOpen(true)} title="Keranjang"
                className={`relative h-9 w-9 rounded-full flex items-center justify-center transition-colors ${scrolled?"hover:bg-muted text-foreground":"text-white hover:bg-white/10"}`}>
                <ShoppingCart className="h-[18px] w-[18px]"/>
                {cart.length>0 && <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">{cart.length}</span>}
              </button>

              <div className="hidden md:flex items-center gap-2 ml-1">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className={scrolled?"":"text-white hover:bg-white/10"}>Login</Button>
                </Link>
                <a href={WA_DEFAULT} target="_blank" rel="noreferrer">
                  <Button size="sm" className="gap-1.5 shadow-md shadow-primary/30">
                    <MessageCircle className="h-4 w-4"/> Hubungi
                  </Button>
                </a>
              </div>
              <button className={`md:hidden h-9 w-9 rounded-full flex items-center justify-center ${scrolled?"text-foreground":"text-white"}`} onClick={()=>setMenuOpen(!menuOpen)}>
                {menuOpen?<X className="h-5 w-5"/>:<Menu className="h-5 w-5"/>}
              </button>
            </div>
          </div>
          {menuOpen&&(
            <div className="md:hidden bg-white border-b px-4 py-4 space-y-3">
              {[["Beranda","#beranda"],["Produk","#produk"],["Tentang","#tentang"],["Kontak","#kontak"]].map(([label,href])=>(
                <a key={label} href={href} className="block text-sm font-medium py-2 text-foreground/70 hover:text-primary" onClick={()=>setMenuOpen(false)}>{label}</a>
              ))}
              <a href={WA_DEFAULT} target="_blank" rel="noreferrer" className="block">
                <Button className="w-full gap-2 mt-2"><MessageCircle className="h-4 w-4"/> Hubungi Kami</Button>
              </a>
            </div>
          )}
        </header>

        {/* ── HERO ── */}
        <section id="beranda" className="relative min-h-screen flex items-center overflow-hidden">
          {HERO_SLIDES.map((s,i)=>(
            <div key={i} className="absolute inset-0 transition-opacity duration-1000"
              style={{background:s.bgGradient, opacity:i===slide?1:0}}/>
          ))}
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",backgroundSize:"60px 60px"}}/>
          <div ref={b1} className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-3xl pointer-events-none transition-colors duration-1000"
            style={{background:cur.glowColor}}/>
          <div ref={b2} className="absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl pointer-events-none"/>

          <div className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-24 grid lg:grid-cols-2 gap-12 items-center w-full">
            <div className="relative min-h-[420px] md:min-h-[380px]">
              {HERO_SLIDES.map((s,i)=>(
                <div key={i} className="absolute inset-0 transition-all duration-700 space-y-5"
                  style={{opacity:i===slide?1:0, transform:i===slide?"translateY(0)":"translateY(24px)", pointerEvents:i===slide?"auto":"none"}}>
                  <Badge className="bg-white/15 text-white border-white/20 text-xs px-3 py-1 backdrop-blur-sm">✦ {s.highlight}</Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                    {s.headline}<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">{s.sub2}</span>
                  </h1>
                  <p className="text-slate-300 text-lg leading-relaxed max-w-md">{s.sub}</p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a href="#produk">
                      <Button size="lg" className="gap-2 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all">
                        Lihat Produk <ChevronRight className="h-4 w-4"/>
                      </Button>
                    </a>
                    <a href={WA_DEFAULT} target="_blank" rel="noreferrer">
                      <Button size="lg" variant="outline" className="gap-2 border-white/25 text-white hover:bg-white/10 bg-transparent">
                        <MessageCircle className="h-4 w-4"/> Chat WA
                      </Button>
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.specs.map(sp=>(
                      <span key={sp.label} className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1 text-xs text-white/90">
                        <span>{sp.icon}</span>{sp.label}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-8 pt-2 border-t border-white/10">
                    {[{v:"500+",l:"Produk"},{v:"1.000+",l:"Pelanggan"},{v:"2 Thn",l:"Pengalaman"}].map(({v,l})=>(
                      <div key={l}><p className="text-2xl font-bold text-white">{v}</p><p className="text-xs text-slate-400">{l}</p></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden lg:flex justify-center items-center relative h-[420px]">
              <div className="absolute inset-0">
                <Device3D src={HERO_IMG[slide]} className="!w-full !h-full" />
              </div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-white/40 tracking-wide whitespace-nowrap pointer-events-none">⟳ tarik untuk putar 3D</span>
              <div className="absolute top-4 right-0 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 iku-float">
                <div className="h-9 w-9 rounded-xl bg-green-500/20 flex items-center justify-center"><CheckCircle2 className="h-5 w-5 text-green-600"/></div>
                <div><p className="text-xs font-bold text-slate-800">Original 100%</p><p className="text-[10px] text-slate-500">Bergaransi Resmi</p></div>
              </div>
              <div className="absolute bottom-14 left-0 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 iku-float" style={{animationDelay:"0.5s"}}>
                <div className="h-9 w-9 rounded-xl bg-amber-500/20 flex items-center justify-center"><Star className="h-5 w-5 text-amber-500 fill-amber-500"/></div>
                <div><p className="text-xs font-bold text-slate-800">Rating 4.9/5</p><p className="text-[10px] text-slate-500">1.000+ ulasan</p></div>
              </div>
              <div className="absolute top-1/2 -left-6 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 iku-float" style={{animationDelay:"1s"}}>
                <div className="h-9 w-9 rounded-xl bg-blue-500/20 flex items-center justify-center"><Truck className="h-5 w-5 text-blue-600"/></div>
                <div><p className="text-xs font-bold text-slate-800">Kirim Cepat</p><p className="text-[10px] text-slate-500">Same day avail.</p></div>
              </div>
            </div>
          </div>

          {!lockSlide ? (
            <>
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
                {HERO_SLIDES.map((_,i)=>(
                  <button key={i} onClick={()=>setSlide(i)}
                    className={`rounded-full transition-all duration-300 ${i===slide?"w-8 h-2.5 bg-primary":"w-2.5 h-2.5 bg-white/30 hover:bg-white/50"}`}/>
                ))}
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {HERO_SLIDES.map((s,i)=>(
                  <button key={i} onClick={()=>selectCategory(["ios","ipad","watch"][i])}
                    className={`text-xs font-medium px-3 py-1 rounded-full transition-all duration-300 ${i===slide?"text-white bg-white/15 border border-white/25":"text-white/40 hover:text-white/60"}`}>
                    {s.category}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <button onClick={()=>selectCategory("all")}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-full px-4 py-1.5 transition-all duration-200">
              ← Lihat semua kategori
            </button>
          )}

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" className="w-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20Z" fill="hsl(var(--background))"/>
            </svg>
          </div>
        </section>

        {/* ── STATS BAND ── */}
        <section className="relative py-14 overflow-hidden border-b bg-background">
          <div className="aurora absolute inset-0 opacity-[0.12] pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s,i)=>(
              <div key={s.label} className={`sr sr-d${i+1} text-center`}>
                <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-emerald-400 tabular-nums">
                  <Counter end={s.end} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mt-1.5 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SMART FILTER + CATALOG ── */}
        <section id="produk" className="py-10 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            <div className="sr mb-8 text-center space-y-2">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest">
                Katalog{cat!=="all" ? ` · ${CAT_FILTERS.find(c=>c.id===cat)?.label}` : ""}
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                {cat==="all" ? "Temukan Gadget Impianmu" : `Koleksi ${CAT_FILTERS.find(c=>c.id===cat)?.label}`}
              </h2>
              <p className="text-muted-foreground text-sm">Klik produk untuk lihat spesifikasi lengkap</p>
            </div>

            <div className="sr sr-d2 rounded-2xl border bg-card/80 backdrop-blur-sm shadow-lg p-5 space-y-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                <input type="text" placeholder="Cari produk... (misal: iPhone 15, iPad Pro, Apple Watch)"
                  value={search} onChange={e=>setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border bg-background/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"/>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">Kategori Produk</p>
                  <div className="flex flex-wrap gap-2">
                    {CAT_FILTERS.map(c=>(
                      <button key={c.id} onClick={()=>selectCategory(c.id)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${cat===c.id?`bg-gradient-to-r ${c.color} text-white shadow-md scale-[1.02]`:"bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">Rentang Budget</p>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_FILTERS.map(b=>(
                      <button key={b.id} onClick={()=>setBudget(b.id)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${budget===b.id?"bg-primary text-primary-foreground shadow-md scale-[1.02]":"bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5"><SlidersHorizontal className="h-3.5 w-3.5"/> Urutkan:</span>
                <select value={sort} onChange={e=>setSort(e.target.value)}
                  className="text-xs rounded-lg border bg-background px-2.5 py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer">
                  <option value="relevan">Paling Relevan</option>
                  <option value="murah">Harga Termurah</option>
                  <option value="mahal">Harga Termahal</option>
                  <option value="nama">Nama A–Z</option>
                </select>
                <button onClick={()=>setShowFav(f=>!f)}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5 border transition-colors ${showFav?"bg-rose-500/15 text-rose-500 border-rose-500/30":"bg-muted text-muted-foreground border-transparent hover:bg-muted/80"}`}>
                  <Heart className={`h-3.5 w-3.5 ${showFav?"fill-rose-500":""}`}/> Favorit{wishlist.length?` (${wishlist.length})`:""}
                </button>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t">
                <span><span className="font-semibold text-foreground">{filtered.length}</span> produk ditemukan</span>
                {(cat!=="all"||budget!=="all"||search||showFav||sort!=="relevan")&&(
                  <button onClick={()=>{selectCategory("all");setBudget("all");setSearch("");setShowFav(false);setSort("relevan");}} className="text-primary hover:underline font-medium">Reset filter</button>
                )}
              </div>
            </div>

            {filtered.length===0?(
              <div className="text-center py-20 text-muted-foreground">
                <span className="text-5xl mb-4 block">🔍</span>
                <p className="font-semibold text-lg">Tidak ada produk yang cocok</p>
                <p className="text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            ):(
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((p,i)=>(
                  <div key={p.id} data-product-card data-tilt onClick={()=>setDetail(p)}
                    className={`sr sr-d${(i%4)+1} group rounded-2xl border bg-card overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer`}>
                    <div className={`relative h-44 bg-gradient-to-br ${p.gradient} flex items-center justify-center overflow-hidden`}>
                      <div className="absolute inset-0 opacity-[0.04]"
                        style={{backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",backgroundSize:"16px 16px"}}/>
                      <img src={imgOf(p)} alt={p.name} draggable={false}
                        className="h-36 w-auto object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300 select-none relative z-10"/>
                      {p.badge&&(
                        <span className="absolute top-3 left-3 text-[10px] font-bold bg-white/90 text-slate-800 rounded-full px-2.5 py-0.5 z-20">{p.badge}</span>
                      )}
                      <span className={`absolute top-3 right-3 text-[10px] font-bold rounded-full px-2 py-0.5 z-20 border ${
                        p.cat==="ios"?"bg-blue-500/30 text-blue-200 border-blue-500/30":
                        p.cat==="ipad"?"bg-violet-500/30 text-violet-200 border-violet-500/30":
                        "bg-emerald-500/30 text-emerald-200 border-emerald-500/30"}`}>
                        {p.cat==="ios"?"iOS":p.cat==="ipad"?"iPad":"Watch"}
                      </span>
                      {/* Tap hint */}
                      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center pb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="text-white text-[10px] font-medium">Tap untuk detail →</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-1.5">
                      <p className="font-bold text-sm leading-tight line-clamp-2">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{p.desc}</p>
                      <p className="text-primary font-bold text-base pt-1">{fmt(p.price)}</p>
                      <div className="flex items-center gap-2 mt-1.5 relative z-[31]">
                        <button onClick={(e)=>{ e.stopPropagation(); toggleCart(p.id); }}
                          className={`flex-1 h-8 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors ${inCart(p.id)?"bg-primary text-white":"bg-primary/10 text-primary hover:bg-primary hover:text-white"}`}>
                          {inCart(p.id) ? <><CheckCircle2 className="h-3.5 w-3.5"/> Di Keranjang</> : <><ShoppingCart className="h-3.5 w-3.5"/> Keranjang</>}
                        </button>
                        <button onClick={(e)=>{ e.stopPropagation(); toggleWish(p.id); }}
                          title={inWish(p.id)?"Hapus favorit":"Tambah favorit"}
                          className={`h-8 w-8 rounded-md flex items-center justify-center border transition-colors ${inWish(p.id)?"bg-rose-500/15 text-rose-500 border-rose-500/30":"text-muted-foreground hover:text-rose-500 hover:border-rose-500/30"}`}>
                          <Heart className={`h-4 w-4 ${inWish(p.id)?"fill-rose-500":""}`}/>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── KATEGORI SHOWCASE ── */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="sr text-center mb-12 space-y-2">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest">Koleksi Pilihan</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Jelajahi <span className="text-aurora">Kategori</span></h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">Pilih lini produk yang kamu cari — semua original &amp; bergaransi resmi</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {CATEGORY_SHOWCASE.map((c,i)=>(
                <button key={c.id} data-tilt
                  onClick={()=>{ selectCategory(c.id); setTimeout(()=>document.getElementById("produk")?.scrollIntoView({behavior:"smooth"}), 70); }}
                  className={`sr sr-d${i+1} group relative text-left rounded-3xl overflow-hidden border h-72 shadow-lg hover:shadow-2xl transition-shadow duration-300`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient}`} />
                  <div className="absolute inset-0 opacity-[0.05]" style={GRID_BG} />
                  <div className="absolute right-4 bottom-4 h-44 w-32 rounded-2xl overflow-hidden border border-white/20 shadow-2xl rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-transform duration-500">
                    <img src={c.img} alt={c.label} draggable={false} className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10 p-6">
                    <h3 className="text-2xl font-bold text-white">{c.label}</h3>
                    <p className="text-white/70 text-sm mt-1.5 max-w-[58%] leading-relaxed">{c.desc}</p>
                    <span className="inline-flex items-center gap-1.5 mt-5 text-white font-medium text-sm bg-white/15 backdrop-blur px-3.5 py-1.5 rounded-full group-hover:bg-white/25 transition-colors">
                      Lihat {c.count} produk <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOROTAN PRODUK ── */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sr text-center mb-12 space-y-2">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> Sorotan Produk
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Produk <span className="text-aurora">Andalan</span> Kami</h2>
          </div>
          <div className="space-y-8">
            {SPOTLIGHTS.map((sp,i)=>(
              <div key={sp.id} className={`max-w-6xl mx-auto px-4 ${i%2===0?"sr-left":"sr-right"}`}>
                <div className={`relative grid md:grid-cols-2 gap-6 md:gap-10 items-center rounded-3xl overflow-hidden border bg-gradient-to-br ${sp.gradient} p-6 md:p-10`}>
                  <div className="absolute inset-0 opacity-[0.04]" style={GRID_BG} />
                  {/* Gambar */}
                  <div className={`relative flex items-center justify-center h-72 md:h-80 ${i%2===1?"md:order-2":""}`}>
                    <div className="absolute h-52 w-52 rounded-full blur-3xl" style={{ background: sp.glow }} />
                    <Device3D src={sp.img} className="!w-full !h-full" />
                  </div>
                  {/* Teks */}
                  <div className={`relative z-10 space-y-4 ${i%2===1?"md:order-1":""}`}>
                    <span className="inline-block text-xs font-bold bg-white/15 text-white border border-white/20 rounded-full px-3 py-1 backdrop-blur">{sp.tag}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">{sp.name}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{sp.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {sp.highlights.map(h=>(
                        <span key={h} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs text-white/90 backdrop-blur">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {h}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <span className="text-2xl md:text-3xl font-black text-white">{fmt(sp.price)}</span>
                      <a href={waLink(sp.name)} target="_blank" rel="noreferrer">
                        <Button className="gap-2 bg-white text-slate-900 hover:bg-white/90 shadow-xl hover:-translate-y-0.5 transition-all">
                          Tanya Harga <ArrowRight className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── KEUNGGULAN ── */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {icon:Shield, label:"100% Original",  desc:"Garansi resmi semua produk",    color:"text-green-600 bg-green-500/10",  delay:"sr-d1"},
              {icon:Award,  label:"Harga Terbaik",   desc:"Kompetitif & transparan",        color:"text-amber-600 bg-amber-500/10",  delay:"sr-d2"},
              {icon:Clock,  label:"Respon Cepat",    desc:"Balas chat hitungan menit",       color:"text-blue-600 bg-blue-500/10",   delay:"sr-d3"},
              {icon:Package,label:"Stok Lengkap",    desc:"500+ produk siap sedia",          color:"text-violet-600 bg-violet-500/10",delay:"sr-d4"},
            ].map(({icon:Icon,label,desc,color,delay})=>(
              <div key={label} className={`sr ${delay} flex flex-col items-center text-center p-5 rounded-2xl border bg-card hover:shadow-md transition-all duration-300 hover:-translate-y-1`}>
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-3 ${color}`}><Icon className="h-6 w-6"/></div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TUKAR TAMBAH ── */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="sr shine-host aurora-strong relative rounded-3xl overflow-hidden p-8 md:p-12 text-white shadow-xl">
              <div className="absolute inset-0 opacity-[0.06]" style={GRID_BG} />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-3 text-center md:text-left">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/20 rounded-full px-3 py-1">
                    <Repeat className="h-3.5 w-3.5" /> Tukar Tambah
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold">Tukar HP Lamamu, Dapat yang Baru!</h3>
                  <p className="text-white/85 text-sm max-w-md leading-relaxed">Bawa gadget lamamu, kami hargai dengan harga terbaik. Proses cepat, transparan, langsung potong harga unit baru.</p>
                </div>
                <a href={waLink("program tukar tambah")} target="_blank" rel="noreferrer">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 gap-2 shadow-xl hover:-translate-y-0.5 transition-all">
                    Cek Harga Tukar <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── CARA ORDER ── */}
        <section className="slide-bg-wrap py-20">
          <div className="slide-bg-panel bg-gradient-to-br from-primary/10 via-background to-blue-500/5"/>
          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <div className="sr text-center mb-12 space-y-2">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest">Mudah & Cepat</p>
              <h2 className="text-3xl font-bold tracking-tight">Cara Order di Iku Gadget</h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">Tinggal klik produk, lihat spesifikasi, lalu chat langsung</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {icon:Search,       step:"01",title:"Pilih Produk",      desc:"Browse katalog, filter budget, klik produk untuk lihat spesifikasi lengkap."},
                {icon:Zap,          step:"02",title:"Konsultasi Gratis", desc:"Tim kami bantu pilihkan produk terbaik sesuai kebutuhan & budget kamu."},
                {icon:CreditCard,   step:"03",title:"Bayar & Terima",    desc:"Bayar mudah, ambil langsung atau kami kirimkan ke alamatmu."},
              ].map(({icon:Icon,step,title,desc},i)=>(
                <div key={title} className={`sr sr-d${i+1} relative group text-center p-8 rounded-2xl border bg-card/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
                  <span className="absolute top-3 right-4 text-7xl font-black text-primary/5 select-none group-hover:text-primary/10 transition-colors">{step}</span>
                  <div className="relative z-10">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary"/>
                    </div>
                    <p className="font-bold text-lg mb-2">{title}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                  </div>
                  {i<2&&<div className="hidden md:flex absolute top-1/2 -right-3 z-20 h-6 w-6 bg-primary rounded-full items-center justify-center shadow-md shadow-primary/30">
                    <ChevronRight className="h-3.5 w-3.5 text-white"/>
                  </div>}
                </div>
              ))}
            </div>
            <div className="sr sr-d4 text-center mt-10">
              <a href={WA_DEFAULT} target="_blank" rel="noreferrer">
                <Button size="lg" className="gap-2 shadow-md shadow-primary/25 hover:-translate-y-0.5 transition-all">
                  <MessageCircle className="h-5 w-5"/> Mulai Order Sekarang
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* ── BRAND MARQUEE ── */}
        <section className="py-12 border-y bg-muted/20 overflow-hidden">
          <p className="sr text-center text-xs text-muted-foreground uppercase tracking-widest mb-6">Brand yang kami sediakan</p>
          <div className="flex overflow-hidden">
            <div className="marquee-track flex gap-12 items-center whitespace-nowrap">
              {[...["Apple","Samsung","Xiaomi","OPPO","Vivo","realme","OnePlus","Asus"],...["Apple","Samsung","Xiaomi","OPPO","Vivo","realme","OnePlus","Asus"]].map((b,i)=>(
                <span key={i} className="text-xl font-extrabold text-muted-foreground/40 hover:text-primary transition-colors duration-300 shrink-0">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL ── */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="sr text-center mb-10 space-y-2">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest">Ulasan</p>
              <h2 className="text-3xl font-bold tracking-tight">Kata Pelanggan Kami</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TESTIMONIALS.map(({name,rating,text,avatar},i)=>(
                <div key={name} className={`sr sr-d${i+1} bg-card rounded-2xl border p-5 space-y-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1`}>
                  <Stars n={rating}/>
                  <p className="text-sm text-muted-foreground leading-relaxed">"{text}"</p>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm">{avatar}</div>
                    <div><p className="text-sm font-semibold">{name}</p><p className="text-[10px] text-muted-foreground">Pelanggan Verified</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-3xl mx-auto px-4">
            <div className="sr text-center mb-10 space-y-2">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest">FAQ</p>
              <h2 className="text-3xl font-bold tracking-tight">Pertanyaan Umum</h2>
              <p className="text-muted-foreground text-sm">Hal-hal yang sering ditanyakan pelanggan</p>
            </div>
            <div className="space-y-3">
              {FAQ.map((f,i)=>(
                <div key={i} className={`sr sr-d${(i%4)+1} border rounded-2xl bg-card overflow-hidden transition-shadow hover:shadow-md`}>
                  <button onClick={()=>setFaqOpen(faqOpen===i?-1:i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left">
                    <span className="font-semibold text-sm md:text-base">{f.q}</span>
                    <span className={`shrink-0 h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 ${faqOpen===i?"rotate-45":""}`}>
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: faqOpen===i?"1fr":"0fr" }}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="kontak" className="slide-bg-wrap py-16 max-w-6xl mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden p-10 text-center">
            <div className="slide-bg-panel rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-[hsl(160,25%,15%)]"/>
            <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl pointer-events-none z-10"/>
            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl pointer-events-none z-10"/>
            <div className="relative z-20 space-y-5 max-w-xl mx-auto">
              <h2 className="sr text-3xl font-bold text-white">Ada yang mau kamu tanyakan?</h2>
              <p className="sr sr-d2 text-slate-400">Tim kami siap bantu kamu menemukan gadget yang tepat sesuai budget.</p>
              <div className="sr sr-d3 flex flex-wrap justify-center gap-3 pt-2">
                <a href={WA_DEFAULT} target="_blank" rel="noreferrer">
                  <Button size="lg" className="gap-2 shadow-lg shadow-primary/40 hover:-translate-y-0.5 transition-all">
                    <MessageCircle className="h-5 w-5"/> Chat di WhatsApp
                  </Button>
                </a>
                <a href="https://instagram.com/ikugadget" target="_blank" rel="noreferrer">
                  <Button size="lg" variant="outline" className="gap-2 border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <Instagram className="h-5 w-5"/> Follow Instagram
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── TENTANG ── */}
        <section id="tentang" className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="sr-left space-y-5">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest">Tentang Kami</p>
              <h2 className="text-3xl font-bold tracking-tight">Toko Gadget Apple Lokal yang Terpercaya</h2>
              <p className="text-muted-foreground leading-relaxed">
                Iku Gadget &amp; Stuff hadir untuk memenuhi kebutuhan gadget Apple kamu — iPhone, iPad, dan Smartwatch — dengan produk original, harga kompetitif, dan pelayanan yang hangat.
              </p>
              <div className="space-y-2.5">
                {["Semua produk bergaransi resmi Apple","Tim berpengalaman & selalu jujur","Harga transparan, tidak ada biaya tersembunyi","Melayani online & offline, COD area setempat"].map(item=>(
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0"/><span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="sr-right grid grid-cols-2 gap-4">
              {[
                {value:"500+",label:"Produk",    icon:Package,color:"from-blue-500/10 to-blue-600/5",   ic:"text-blue-600"},
                {value:"1K+", label:"Pelanggan", icon:Star,   color:"from-amber-500/10 to-amber-600/5", ic:"text-amber-500"},
                {value:"4.9", label:"Rating",    icon:Award,  color:"from-green-500/10 to-green-600/5", ic:"text-green-600"},
                {value:"2 Thn",label:"Pengalaman",icon:Clock, color:"from-violet-500/10 to-violet-600/5",ic:"text-violet-600"},
              ].map(({value,label,icon:Icon,color,ic})=>(
                <div key={label} className={`rounded-2xl border bg-gradient-to-br ${color} p-5 text-center hover:-translate-y-1 transition-all duration-300`}>
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${ic}`}/>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="bg-slate-900 text-slate-400 py-14">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <img src={logo} alt="Logo" className="h-8 w-8 rounded-lg"/>
                  <span className="font-bold text-white">Iku Gadget &amp; Stuff</span>
                </div>
                <p className="text-sm leading-relaxed">Toko gadget Apple terpercaya. iPhone, iPad, Smartwatch — original, bergaransi, harga bersaing.</p>
                <div className="flex gap-2.5">
                  {[{href:WA_DEFAULT,icon:Phone},{href:"https://instagram.com/ikugadget",icon:Instagram},{href:WA_DEFAULT,icon:MessageCircle}].map(({href,icon:Icon},i)=>(
                    <a key={i} href={href} target="_blank" rel="noreferrer"
                      className="h-9 w-9 rounded-xl bg-white/5 hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5">
                      <Icon className="h-4 w-4"/>
                    </a>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-white font-semibold text-sm">Produk</p>
                {["iPhone","iPad","Apple Watch","Aksesoris Apple"].map(item=>(
                  <a key={item} href="#produk" className="block text-sm hover:text-primary transition-colors">{item}</a>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-white font-semibold text-sm">Kontak</p>
                <div className="flex items-start gap-2 text-sm"><MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary"/><span>Jl. Contoh No. 123, Kota Anda</span></div>
                <div className="flex items-center gap-2 text-sm"><MessageCircle className="h-4 w-4 shrink-0 text-primary"/><a href={WA_DEFAULT} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">+62 851-2345-6789</a></div>
                <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 shrink-0 text-primary"/><span>Senin–Sabtu, 09.00–20.00</span></div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <span>© 2025 Iku Gadget &amp; Stuff. All rights reserved.</span>
              <Link to="/login" className="hover:text-primary transition-colors">Staff Login</Link>
            </div>
          </div>
        </footer>

        <a href={WA_DEFAULT} target="_blank" rel="noreferrer"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#25D366] shadow-lg shadow-green-500/40 flex items-center justify-center hover:scale-110 hover:shadow-green-500/60 transition-all duration-200"
          title="Chat WhatsApp">
          <MessageCircle className="h-7 w-7 text-white fill-white"/>
        </a>

        {/* Back to top */}
        <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
          className={`fixed bottom-24 right-6 z-50 h-11 w-11 rounded-full bg-card border shadow-lg flex items-center justify-center text-foreground hover:bg-muted hover:-translate-y-0.5 transition-all duration-300 ${showTop?"opacity-100 translate-y-0":"opacity-0 translate-y-4 pointer-events-none"}`}
          title="Kembali ke atas">
          <ArrowUp className="h-5 w-5"/>
        </button>
      </div>

      {/* ── KERANJANG DRAWER ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-[400]">
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={()=>setCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl flex flex-col cart-slide">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-primary"/>
                </div>
                <div>
                  <h3 className="font-bold leading-none">Keranjang</h3>
                  <p className="text-xs text-muted-foreground mt-1">{cartItems.length} produk</p>
                </div>
              </div>
              <button onClick={()=>setCartOpen(false)} className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center"><X className="h-4 w-4"/></button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length===0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground py-16">
                  <ShoppingCart className="h-12 w-12 mb-3 opacity-30"/>
                  <p className="font-semibold">Keranjang masih kosong</p>
                  <p className="text-sm mt-1">Tambahkan produk dari katalog</p>
                  <Button variant="outline" className="mt-4" onClick={()=>{ setCartOpen(false); document.getElementById("produk")?.scrollIntoView({behavior:"smooth"}); }}>Mulai Belanja</Button>
                </div>
              ) : cartItems.map(p=>(
                <div key={p.id} className="flex items-center gap-3 rounded-2xl border bg-card p-3">
                  <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shrink-0 overflow-hidden`}>
                    <img src={imgOf(p)} alt={p.name} className="h-14 w-auto object-contain drop-shadow"/>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm leading-tight line-clamp-2">{p.name}</p>
                    <p className="text-primary font-bold text-sm mt-0.5">{rp(p.price)}</p>
                  </div>
                  <button onClick={()=>toggleCart(p.id)} className="h-8 w-8 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive flex items-center justify-center shrink-0 transition-colors">
                    <Trash2 className="h-4 w-4"/>
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            {cartItems.length>0 && (
              <div className="border-t p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="text-xl font-black text-primary">{rp(cartTotal)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="lg" variant="outline" onClick={()=>setQris({ amount: cartTotal, label: `${cartItems.length} produk` })}
                    className="gap-2 border-rose-500/40 text-rose-600 hover:bg-rose-500/10">
                    <QrCode className="h-5 w-5"/> Bayar QRIS
                  </Button>
                  <a href={orderWA()} target="_blank" rel="noreferrer">
                    <Button size="lg" className="w-full gap-2 shadow-lg shadow-primary/25">
                      <MessageCircle className="h-5 w-5"/> Via WhatsApp
                    </Button>
                  </a>
                </div>
                <p className="text-center text-[11px] text-muted-foreground">
                  Metode: <span className="font-medium text-foreground">QRIS</span> · Transfer · COD · Cicilan
                </p>
                <button onClick={()=>setCart([])} className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors">Kosongkan keranjang</button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* ── QRIS PAYMENT ── */}
      {qris && (
        <div className="fixed inset-0 z-[500] flex items-end md:items-center justify-center"
          onClick={(e)=>{ if(e.target===e.currentTarget) setQris(null); }}>
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={()=>setQris(null)} />
          <div className="relative w-full md:max-w-sm bg-background rounded-t-3xl md:rounded-3xl z-10 modal-slide-up shadow-2xl overflow-hidden">
            {/* Header banner QRIS */}
            <div className="relative bg-gradient-to-br from-rose-600 to-red-700 px-5 py-4 text-white">
              <button onClick={()=>setQris(null)} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <X className="h-4 w-4"/>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight italic">QRIS</span>
                <span className="text-[10px] font-bold bg-white/20 rounded px-1.5 py-0.5">GPN</span>
              </div>
              <p className="text-xs text-white/85 mt-0.5">Satu QR untuk semua bank &amp; e-wallet</p>
            </div>

            <div className="p-5 space-y-4">
              {/* Merchant + nominal */}
              <div className="text-center">
                <p className="font-bold leading-tight">Iku Gadget &amp; Stuff</p>
                <p className="text-[11px] text-muted-foreground">NMID: ID1024xxxxxxxxxxx · {qris.label}</p>
                <p className="text-3xl font-black text-primary mt-2">{rp(qris.amount)}</p>
              </div>

              {/* QR */}
              <div className="rounded-2xl border-2 border-dashed border-primary/30 p-4 bg-white flex items-center justify-center">
                <img src="/qris.png" alt="QRIS Iku Gadget" className="w-52 h-52 object-contain" draggable={false}/>
              </div>

              {/* Langkah */}
              <ol className="text-xs text-muted-foreground space-y-1.5">
                <li>1. Buka app m-banking / e-wallet (GoPay, DANA, OVO, BCA, dll)</li>
                <li>2. Pilih <b className="text-foreground">Scan QRIS</b>, arahkan ke kode di atas</li>
                <li>3. Masukkan nominal <b className="text-foreground">{rp(qris.amount)}</b> lalu bayar</li>
                <li>4. Kirim bukti bayar ke WhatsApp kami untuk diproses</li>
              </ol>

              {/* Konfirmasi */}
              <a href={`https://wa.me/${WA}?text=${encodeURIComponent(`Halo Iku Gadget, saya sudah bayar via QRIS sebesar ${rp(qris.amount)} untuk ${qris.label}. Ini bukti bayarnya:`)}`}
                target="_blank" rel="noreferrer">
                <Button className="w-full gap-2 shadow-lg shadow-primary/25">
                  <MessageCircle className="h-4 w-4"/> Sudah Bayar — Kirim Bukti
                </Button>
              </a>
              <p className="text-center text-[10px] text-muted-foreground">Pembayaran diverifikasi manual oleh admin via WhatsApp.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
