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
import { LogOut, TrendingUp, ShoppingBag, DollarSign, Wallet } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 iku-fade-down">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Iku Gadget & Stuff"
              width={48}
              height={48}
              className="rounded-xl shadow-md transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-primary/20"
            />
            <div>
              <h1 className="text-lg font-bold tracking-tight">Iku Gadget & Stuff</h1>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">{user?.email}</p>
                {role && (
                  <Badge
                    variant={role === "admin" ? "default" : "secondary"}
                    className="text-[10px] px-1.5 py-0"
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
              className="transition-all duration-200 hover:translate-x-0.5"
            >
              <LogOut className="mr-2 h-4 w-4" /> Keluar
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
          <div className="iku-fade-up delay-200">
            <Card className="overflow-hidden iku-shimmer-card transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 cursor-default">
              <CardContent className="flex items-center gap-3 p-4 relative">
                <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-primary/5" />
                <div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-2.5 iku-float">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Transaksi</p>
                  <p className="text-2xl font-bold tabular-nums">{animTx}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="iku-fade-up delay-300">
            <Card className="overflow-hidden iku-shimmer-card transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 cursor-default">
              <CardContent className="flex items-center gap-3 p-4 relative">
                <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-primary/5" />
                <div
                  className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-2.5 iku-float"
                  style={{ animationDelay: "0.4s" }}
                >
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Penjualan</p>
                  <p className="text-lg font-bold tabular-nums">Rp {animJual.toLocaleString("id-ID")}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="iku-fade-up delay-400">
            <Card className="overflow-hidden iku-shimmer-card transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 cursor-default">
              <CardContent className="flex items-center gap-3 p-4 relative">
                <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-destructive/5" />
                <div
                  className="rounded-xl bg-gradient-to-br from-destructive/20 to-destructive/10 p-2.5 iku-float"
                  style={{ animationDelay: "0.8s" }}
                >
                  <Wallet className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Biaya Op.</p>
                  <p className="text-lg font-bold tabular-nums">Rp {animOp.toLocaleString("id-ID")}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="iku-fade-up delay-500">
            <Card className="overflow-hidden iku-shimmer-card transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 cursor-default">
              <CardContent className="flex items-center gap-3 p-4 relative">
                <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-primary/5" />
                <div
                  className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-2.5 iku-float"
                  style={{ animationDelay: "1.2s" }}
                >
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Profit</p>
                  <p className={`text-lg font-bold tabular-nums ${totalProfit >= 0 ? "text-primary" : "text-destructive"}`}>
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
            <h2 className="text-xl font-bold">Jurnal Penjualan</h2>
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
