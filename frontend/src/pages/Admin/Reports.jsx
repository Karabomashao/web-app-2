import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Users, TrendingUp, AlertTriangle, DollarSign, Download, Filter, LayoutDashboard, Building2, PieChart, Bell, FileText, Settings as SettingsIcon, Search, ChevronRight, UserPlus } from "lucide-react";

export default function Reports(){
    return (
            <div className="space-y-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl mb-1">Reports</h1>
                        <p className="text-muted-foreground">Generate and export comprehensive reports</p>
                    </div>
                    <Button>Generate New Report</Button>
                </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "SME Performance Report", date: "Generated on Dec 1, 2025" },
          { title: "Funding Summary Q4 2025", date: "Generated on Nov 28, 2025" },
          { title: "Compliance Status Report", date: "Generated on Nov 25, 2025" },
          { title: "Revenue Growth Analysis", date: "Generated on Nov 20, 2025" },
          { title: "B-BBEE Certification Status", date: "Generated on Nov 15, 2025" },
          { title: "Sector Distribution Report", date: "Generated on Nov 10, 2025" },
        ].map((report, i) => (
          <Card key={i} className="cursor-pointer hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <FileText className="h-5 w-5 text-primary" />
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-lg">{report.title}</CardTitle>
              <CardDescription>{report.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    )
}