import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import { signOut } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import JournalForm from "@/components/JournalForm";
import JournalTable from "@/components/JournalTable";
import { LogOut, Smartphone, TrendingUp, ShoppingBag, DollarSign } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const { isAdmin, role } = useRole();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

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

  const totalJual = data.reduce((s, r) => s + Number(r.harga_jual), 0);
  const totalBeli = data.reduce((s, r) => s + Number(r.harga_beli), 0);
  const totalOp = data.reduce((s, r) => s + Number(r.biaya_operasional), 0);
  const totalProfit = totalJual - totalBeli - totalOp;

  const handleEdit = (entry: any) => {
    setEditData(entry);
    setEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Iku Gadget & Stuff</h1>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">{user?.email}</p>
                {role && <Badge variant="secondary" className="text-xs">{role}</Badge>}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Keluar
          </Button>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-3"><ShoppingBag className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Total Transaksi</p>
                <p className="text-xl font-bold">{data.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-3"><DollarSign className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Total Penjualan</p>
                <p className="text-xl font-bold">Rp {totalJual.toLocaleString("id-ID")}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-3"><DollarSign className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Total Biaya Op.</p>
                <p className="text-xl font-bold">Rp {totalOp.toLocaleString("id-ID")}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-3"><TrendingUp className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Total Profit</p>
                <p className={`text-xl font-bold ${totalProfit >= 0 ? "text-primary" : "text-destructive"}`}>
                  Rp {totalProfit.toLocaleString("id-ID")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Jurnal Penjualan</h2>
          {isAdmin && <JournalForm onSuccess={fetchData} />}
        </div>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Memuat data...</div>
        ) : (
          <JournalTable data={data} onRefresh={fetchData} onEdit={handleEdit} isAdmin={isAdmin} />
        )}

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
