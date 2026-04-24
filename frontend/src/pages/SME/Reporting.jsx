import { useState } from "react";
import { Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { KPICard } from "@/components/ui/KPICard";

const revenueDataYTD = [
  { month: "Jan", revenue: 1200000, jobs: 0 },
  { month: "Feb", revenue: 1350000, jobs: 1 },
  { month: "Mar", revenue: 1450000, jobs: 2 },
  { month: "Apr", revenue: 1600000, jobs: 3 },
  { month: "May", revenue: 1800000, jobs: 4 },
  { month: "Jun", revenue: 2400000, jobs: 5 },
];

// Quarter to Date (Apr-Jun)
const revenueDataQTD = [
  { month: "Apr", revenue: 1600000, jobs: 3 },
  { month: "May", revenue: 1800000, jobs: 4 },
  { month: "Jun", revenue: 2400000, jobs: 5 },
];

// Month to Date (Jun only)
const revenueDataMTD = [{ month: "Jun", revenue: 2400000, jobs: 5 }];

const fundingSpendDataYTD = [
  { category: "Working Capital", amount: 180000 },
  { category: "Training", amount: 150000 },
  { category: "Marketing", amount: 75000 },
  { category: "Equipment", amount: 45000 },
  { category: "Other", amount: 50000 },
];

const fundingSpendDataQTD = [
  { category: "Working Capital", amount: 120000 },
  { category: "Training", amount: 90000 },
  { category: "Marketing", amount: 50000 },
  { category: "Equipment", amount: 30000 },
  { category: "Other", amount: 35000 },
];

const fundingSpendDataMTD = [
  { category: "Working Capital", amount: 60000 },
  { category: "Training", amount: 45000 },
  { category: "Marketing", amount: 25000 },
  { category: "Equipment", amount: 15000 },
  { category: "Other", amount: 20000 },
];

const COLORS = ["#10E090", "#F5A524", "#E0E0E0"];

export default function Reporting() {
  const [selectedDuration, setSelectedDuration] = useState("ytd");

  const getRevenueData = () => {
    switch (selectedDuration) {
      case "mtd":
        return revenueDataMTD;
      case "qtd":
        return revenueDataQTD;
      case "ytd":
      case "custom":
      default:
        return revenueDataYTD;
    }
  };

  const getFundingSpendData = () => {
    switch (selectedDuration) {
      case "mtd":
        return fundingSpendDataMTD;
      case "qtd":
        return fundingSpendDataQTD;
      case "ytd":
      case "custom":
      default:
        return fundingSpendDataYTD;
    }
  };

  const getKPIData = () => {
    const revenueData = getRevenueData();
    const fundingData = getFundingSpendData();

    const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
    const totalJobs = Math.max(...revenueData.map((item) => item.jobs));
    const totalFunding = fundingData.reduce((sum, item) => sum + item.amount, 0);

    switch (selectedDuration) {
      case "mtd":
        return {
          revenue: {
            value: `R ${(totalRevenue / 1000000).toFixed(1)}M`,
            change: 33.3,
            label: "Revenue (MTD)",
          },
          jobs: {
            value: totalJobs,
            change: 25.0,
            label: "Jobs Created",
          },
          funding: {
            value: `R ${(totalFunding / 1000).toFixed(0)}K`,
            change: 100,
            label: "Funding Utilized",
          },
          roadmap: {
            value: "62%",
            change: 8.0,
            label: "Roadmap Completion",
          },
          roadmapData: [
            { name: "Complete", value: 62 },
            { name: "In Progress", value: 28 },
            { name: "Pending", value: 10 },
          ],
        };

      case "qtd":
        return {
          revenue: {
            value: `R ${(totalRevenue / 1000000).toFixed(1)}M`,
            change: 28.0,
            label: "Revenue (QTD)",
          },
          jobs: {
            value: totalJobs,
            change: 20.0,
            label: "Jobs Created",
          },
          funding: {
            value: `R ${(totalFunding / 1000).toFixed(0)}K`,
            change: 100,
            label: "Funding Utilized",
          },
          roadmap: {
            value: "65%",
            change: 10.0,
            label: "Roadmap Completion",
          },
          roadmapData: [
            { name: "Complete", value: 65 },
            { name: "In Progress", value: 25 },
            { name: "Pending", value: 10 },
          ],
        };

      case "ytd":
      case "custom":
      default:
        return {
          revenue: {
            value: `R ${(totalRevenue / 1000000).toFixed(1)}M`,
            change: 24.5,
            label: "Revenue (YTD)",
          },
          jobs: {
            value: totalJobs,
            change: 15.0,
            label: "Jobs Created",
          },
          funding: {
            value: `R ${(totalFunding / 1000).toFixed(0)}K`,
            change: 100,
            label: "Funding Utilized",
          },
          roadmap: {
            value: "68%",
            change: 12.0,
            label: "Roadmap Completion",
          },
          roadmapData: [
            { name: "Complete", value: 68 },
            { name: "In Progress", value: 22 },
            { name: "Pending", value: 10 },
          ],
        };
    }
  };

  const revenueData = getRevenueData();
  const fundingSpendData = getFundingSpendData();
  const kpiData = getKPIData();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl mb-2">Reporting & Analytics</h1>
          <p className="text-muted-foreground">
            Track your progress and export reports for stakeholders
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <Select
              value={selectedDuration}
              onValueChange={(value) => setSelectedDuration(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mtd">Month to Date</SelectItem>
                <SelectItem value="qtd">Quarter to Date</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label={kpiData.revenue.label}
          value={kpiData.revenue.value}
          change={kpiData.revenue.change}
          trend="up"
          sparklineData={revenueData.map((d) => d.revenue / 100000)}
        />
        <KPICard
          label={kpiData.jobs.label}
          value={kpiData.jobs.value}
          change={kpiData.jobs.change}
          trend="up"
        />
        <KPICard
          label={kpiData.funding.label}
          value={kpiData.funding.value}
          change={kpiData.funding.change}
          trend="neutral"
        />
        <KPICard
          label={kpiData.roadmap.label}
          value={kpiData.roadmap.value}
          change={kpiData.roadmap.change}
          trend="up"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Job Creation Trend</CardTitle>
            <CardDescription>Monthly performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis
                  yAxisId="left"
                  tickFormatter={(value) => `R${(value / 1000000).toFixed(1)}M`}
                />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "revenue") {
                      return [`R${(value / 1000000).toFixed(2)}M`, "Revenue"];
                    }
                    return [value, "Jobs"];
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3E3C90"
                  strokeWidth={2}
                  name="Revenue"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="jobs"
                  stroke="#F05A83"
                  strokeWidth={2}
                  name="Jobs Created"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funding Spend by Category</CardTitle>
            <CardDescription>How funds have been allocated</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fundingSpendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `R${(value / 1000).toFixed(0)}K`} />
                <Tooltip
                  formatter={(value) => `R${(value / 1000).toFixed(0)}K`}
                />
                <Bar dataKey="amount" fill="#3E3C90" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roadmap Completion Status</CardTitle>
            <CardDescription>Overall task completion breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={kpiData.roadmapData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {kpiData.roadmapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics Summary</CardTitle>
            <CardDescription>Important business indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm text-muted-foreground">Profit Margin</span>
                <span className="tabular-nums">18.5%</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm text-muted-foreground">Cash Flow Status</span>
                <span className="text-success-color">Positive</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm text-muted-foreground">On-time Delivery Rate</span>
                <span className="tabular-nums">94%</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm text-muted-foreground">Customer Retention</span>
                <span className="tabular-nums">87%</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm text-muted-foreground">B-BBEE Level</span>
                <span>Level 2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Compliance Score</span>
                <span className="text-success-color tabular-nums">95%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
          <CardDescription>Generate reports for different stakeholders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Download className="h-6 w-6" />
              <div className="text-center">
                <div>Export to PDF</div>
                <div className="text-xs text-muted-foreground">Executive summary</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Download className="h-6 w-6" />
              <div className="text-center">
                <div>Export to Excel</div>
                <div className="text-xs text-muted-foreground">Detailed data</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Download className="h-6 w-6" />
              <div className="text-center">
                <div>B-BBEE Report</div>
                <div className="text-xs text-muted-foreground">ESD scorecard</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}