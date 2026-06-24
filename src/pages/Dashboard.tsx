import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import { useSellerVisitLogger } from "@/hooks/useSellerVisitLogger";
import { signOut } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import JournalFilters from "@/components/JournalFilters";
import JournalForm from "@/components/JournalForm";
import JournalTable from "@/components/JournalTable";
import WeeklySalesChart from "@/components/WeeklySalesChart";
import NotificationBell from "@/components/NotificationBell";
import MotivationalQuote from "@/components/MotivationalQuote";
import IncentivePanel from "@/components/IncentivePanel";
import { LogOut, TrendingUp, ShoppingBag, DollarSign, Wallet, Menu } from "lucide-react";
import logo from "@/assets/logo.png";

function useCountUp(end: number, duration = 1200, delay = 300) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(0);
    let startTime: number | null = null;
    let rafId: number;
    const tid = setTimeout(() => {
      const step = (ts: number) => {
        if (startTime === null) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(ease * end));
        if (progress < 1) rafId = requestAnimationFrame(step);
        else setValue(end);
      };
      rafId = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(tid); cancelAnimationFrame(rafId); };
  }, [end, duration, delay]);
  return value;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { isAdmin, role } = useRole();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  useSellerVisitLogger();

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data: rows } = await supabase
      .from("journal")
      .select("*")
      .order("tanggal", { ascending: false });
    setData(rows || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const totalJual   = data.reduce((s, r) => s + Number(r.harga_jual), 0);
  const totalBeli   = data.reduce((s, r) => s + Number(r.harga_beli), 0);
  const totalOp     = data.reduce((s, r) => s + Number(r.biaya_operasional), 0);
  const totalProfit = totalJual - totalBeli - totalOp;

  const animTx     = useCountUp(data.length,  800,  400);
  const animJual   = useCountUp(totalJual,    1200, 450);
  const animOp     = useCountUp(totalOp,      1200, 500);
  const animProfit = useCountUp(totalProfit,  1200, 550);

  const handleEdit = (entry: any) => {
    setEditData(entry);
    setEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/30" />

      {/* Header */}
      <header className="border-b bg-card/90 backdrop-blur-sm sticky top-0 z-50 iku-fade-down shadow-sm">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={logo}
                alt="Iku Gadget & Stuff"
                width={44}
                height={44}
                className="rounded-xl shadow-md shadow-primary/20 transition-all duration-300 hover:scale-110 hover:rotate-3"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight leading-none">Iku Gadget & Stuff</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-muted-foreground truncate max-w-[160px]">{user?.email}</p>
                {role && (
                  <Badge
                    variant={role === "admin" ? "default" : "secondary"}
                    className="text-[10px] px-1.5 py-0 capitalize"
                  >
                    {role}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {isAdmin && <NotificationBell />}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <LogOut className="mr-1.5 h-4 w-4" /> Keluar
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* Motivational Quote */}
        <div className="iku-fade-up delay-100">
          <MotivationalQuote />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Transaksi — blue */}
          <div className="iku-fade-up delay-200">
            <Card className="overflow-hidden iku-shimmer-card border-blue-200/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 cursor-default">
              <CardContent className="flex items-center gap-3 p-4 relative">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-blue-500/8" />
                <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 p-2.5 iku-float shadow-sm">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Transaksi</p>
                  <p className="text-2xl font-bold tabular-nums text-blue-700">{animTx}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Penjualan — green (primary) */}
          <div className="iku-fade-up delay-300">
            <Card className="overflow-hidden iku-shimmer-card border-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 cursor-default">
              <CardContent className="flex items-center gap-3 p-4 relative">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-primary/8" />
                <div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-2.5 iku-float shadow-sm" style={{ animationDelay: "0.4s" }}>
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Penjualan</p>
                  <p className="text-base font-bold tabular-nums text-primary leading-tight">Rp {animJual.toLocaleString("id-ID")}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Biaya Op — orange */}
          <div className="iku-fade-up delay-400">
            <Card className="overflow-hidden iku-shimmer-card border-orange-200/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1 cursor-default">
              <CardContent className="flex items-center gap-3 p-4 relative">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-orange-500/8" />
                <div className="rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/10 p-2.5 iku-float shadow-sm" style={{ animationDelay: "0.8s" }}>
                  <Wallet className="h-5 w-5 text-orange-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Biaya Op.</p>
                  <p className="text-base font-bold tabular-nums text-orange-600 leading-tight">Rp {animOp.toLocaleString("id-ID")}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profit — violet (merah jika rugi) */}
          <div className="iku-fade-up delay-500">
            <Card className={`overflow-hidden iku-shimmer-card transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 cursor-default ${totalProfit >= 0 ? "border-violet-200/60 hover:shadow-violet-500/10" : "border-destructive/20 hover:shadow-destructive/10"}`}>
              <CardContent className="flex items-center gap-3 p-4 relative">
                <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full ${totalProfit >= 0 ? "bg-violet-500/8" : "bg-destructive/8"}`} />
                <div className={`rounded-xl p-2.5 iku-float shadow-sm ${totalProfit >= 0 ? "bg-gradient-to-br from-violet-500/20 to-violet-500/10" : "bg-gradient-to-br from-destructive/20 to-destructive/10"}`} style={{ animationDelay: "1.2s" }}>
                  <TrendingUp className={`h-5 w-5 ${totalProfit >= 0 ? "text-violet-600" : "text-destructive"}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Profit</p>
                  <p className={`text-base font-bold tabular-nums leading-tight ${totalProfit >= 0 ? "text-violet-700" : "text-destructive"}`}>
                    Rp {animProfit.toLocaleString("id-ID")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts & Incentive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 iku-fade-up delay-600">
          <div className="lg:col-span-2">
            <WeeklySalesChart data={data} />
          </div>
          <div>
            <IncentivePanel data={data} isAdmin={isAdmin} />
          </div>
        </div>

        {/* Journal Section */}
        <div className="iku-fade-up delay-700 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Jurnal Penjualan</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{data.length} transaksi tercatat</p>
            </div>
            {isAdmin && <JournalForm onSuccess={fetchData} />}
          </div>

          <JournalFilters data={data} onFiltered={setFilteredData} />

          {loading ? (
            <div className="text-center py-8 text-muted-foreground animate-pulse">Memuat data...</div>
          ) : (
            <JournalTable data={filteredData} onRefresh={fetchData} onEdit={handleEdit} isAdmin={isAdmin} />
          )}
        </div>

        {isAdmin && (
          <JournalForm
            onSuccess={fetchData}
            editData={editData}
            open={editOpen}
            onOpenChange={(o) => { setEditOpen(o); if (!o) setEditData(null); }}
          />
        )}
      </main>
    </div>
  );
}
