import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button  } from "@/components/ui/button"
import { Users, TrendingUp, AlertTriangle, DollarSign, Download, Filter, LayoutDashboard, Building2, PieChart, Bell, FileText, Settings as SettingsIcon, Search, ChevronRight, UserPlus } from "lucide-react";
import { KPICard } from "@/components/ui/KPICard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { useEffect, useState } from "react";

export default function AdminDashboard(){

    const devURL_ = "http://localhost:3000"
    const devURL = "https://web-app-backend-bqf8bhgvdmg4edbc.southafricanorth-01.azurewebsites.net"
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState('true')

    useEffect(() => {
        async function loadCompanies(){
            try{
        
                const token = localStorage.getItem('token')
                const res = await fetch(`${devURL}/api/users/companies`,{
                    headers : {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token}`
                    }
                })
      
                if (!res.ok) {
                throw new Response("Failed to load companies", { status: res.status });
                }        
                const data = await res.json()
                setCompanies(data.companies)
            }catch(error){
                console.log(error)
                setCompanies(error.message)
            } finally{
                setLoading(false)
            }
        }
        loadCompanies();
    }, [])

      const kpis = [
    {
      label: "Total SMEs",
      value: companies.length,
      change: 8.2,
      trend: "up",
    },
    {
      label: "Active SMEs",
      value: companies.filter((sme) => sme.isActive).length,
      change: 5.1,
      trend: "up",
    },
    {
      label: "Total Funds Disbursed",
      value: "R 42.5M",
      change: 12.8,
      trend: "up",
    },
    {
      label: "Avg. Roadmap Completion",
      value: "62%",
      change: 3.5,
      trend: "up",
    },
  ];

    const alerts = [
    { sme: "TechStart Solutions", issue: "B-BBEE certificate expires in 15 days", severity: "warning" },
    { sme: "BuildRight Construction", issue: "Overdue monthly report", severity: "danger" },
    { sme: "Fresh Foods Co.", issue: "Funding milestone pending verification", severity: "info" },
    { sme: "Green Energy Ltd.", issue: "Tax clearance expired", severity: "danger" },
  ];

  const revenueGrowthData = [
    { month: "Jan", revenue: 3200000 },
    { month: "Feb", revenue: 3450000 },
    { month: "Mar", revenue: 3600000 },
    { month: "Apr", revenue: 3800000 },
    { month: "May", revenue: 4100000 },
    { month: "Jun", revenue: 4250000 },
  ];

    const fundingByStageData = [
    { stage: "Application", count: 45 },
    { stage: "Review", count: 28 },
    { stage: "Approved", count: 67 },
    { stage: "Disbursed", count: 105 },
  ];

    return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl mb-1">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Cohort overview and portfolio management</p>
                    </div>
                    <div className="flex gap-2">
                        <Select defaultValue="all">
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Filter by sector" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Sectors</SelectItem>
                                <SelectItem value="tech">Technology</SelectItem>
                                <SelectItem value="construction">Construction</SelectItem>
                                <SelectItem value="agriculture">Agriculture</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            <Filter className="h-4 w-4 mr-2" />
                            More Filters
                        </Button>
                        <Button>
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {loading
                    ? [...Array(4)].map((_, i) => (
                        <div key={i} className="p-4 rounded-xl border space-y-3">
                        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                        <div className="h-8 w-20 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                        </div>
                    ))
                    : kpis.map((kpi, i) => (
                        <KPICard key={i} {...kpi} />
                    ))}
                </div>

                {/* Alerts */}
                <Card>
                    <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                        <CardTitle>Active Alerts</CardTitle>
                        <CardDescription>Compliance expiries and funding bottlenecks</CardDescription>
                        </div>
                        <Badge variant="destructive">{alerts.length}</Badge>
                    </div>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-3">
                        {alerts.map((alert, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
                            <AlertTriangle
                            className={`h-5 w-5 mt-0.5 ${
                                alert.severity === "danger"
                                ? "text-danger-color"
                                : alert.severity === "warning"
                                ? "text-warning-color"
                                : "text-info-color"
                            }`}
                            />
                            <div className="flex-1">
                            <p>{alert.sme}</p>
                            <p className="text-sm text-muted-foreground">{alert.issue}</p>
                            </div>
                            <Button size="sm" variant="outline">
                            Review
                            </Button>
                        </div>
                        ))}
                    </div>
                    </CardContent>
                </Card>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aggregate Revenue Growth</CardTitle>
            <CardDescription>Combined revenue across all SMEs</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) =>
                    `R ${(value / 1000000).toFixed(1)}M`
                  }
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--brand-primary)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funding Pipeline by Stage</CardTitle>
            <CardDescription>Applications across funding stages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={fundingByStageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="var(--accent-magenta)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
    )
}