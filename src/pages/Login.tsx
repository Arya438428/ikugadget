import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth";
import { toast } from "sonner";
import { Smartphone, ShieldCheck, TrendingUp, BarChart3, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Gagal masuk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-[hsl(160,25%,12%)]">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-12 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-xl shadow-lg shadow-primary/30" />
          <span className="text-xl font-bold text-white tracking-tight">Iku Gadget & Stuff</span>
        </div>

        {/* Hero text */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-white leading-tight">
              Kelola Bisnis<br />
              <span className="text-primary">Lebih Mudah</span> &<br />
              Lebih Cerdas
            </h1>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              Dashboard penjualan real-time, jurnal transaksi otomatis, dan laporan profit yang akurat — semua dalam satu platform.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: BarChart3, text: "Grafik penjualan mingguan otomatis" },
              { icon: TrendingUp, text: "Pantau profit & biaya operasional" },
              { icon: ShieldCheck, text: "Data aman & terenkripsi" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-slate-300 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-slate-600 text-xs">© 2025 Iku Gadget & Stuff</p>
      </div>

      {/* Right form panel */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center bg-background px-6 py-12">
        {/* Mobile logo */}
        <div className="mb-8 flex flex-col items-center gap-2 lg:hidden">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Smartphone className="h-7 w-7 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight">Iku Gadget & Stuff</span>
        </div>

        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Selamat datang kembali</h2>
            <p className="text-sm text-muted-foreground">Masuk untuk melanjutkan ke dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@contoh.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-sm font-semibold shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Memproses...
                </span>
              ) : "Masuk"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
