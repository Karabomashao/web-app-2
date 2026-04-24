import { useState } from "react";
import { Plus, ArrowRight, Calendar, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { KPICard } from "@/components/ui/KPICard";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function Dashboard(){

    const kpis = [
        {
            label: "Revenue (Month)",
            value: "R 2.4M",
            change: 12.5,
            trend: "up",
            sparklineData: [100, 120, 115, 140, 135, 150, 160],
        },
        {
            label: "Jobs Created (YTD)",
            value: 5,
            change: 15,
            trend: "up",
        },
        {
            label: "Funds Accessed",
            value: "R 500K",
            change: 0,
            trend: "neutral",
        },
        {
            label: "Learning Progress",
            value: "68%",
            change: 8,
            trend: "up",
        },
    ];

    const roadmapThemes = [
        { name: "Financial Management", progress: 75, tasks: 12, completed: 9 },
        { name: "Sales & Marketing", progress: 50, tasks: 10, completed: 5 },
        { name: "Operations", progress: 40, tasks: 8, completed: 3 },
        { name: "Governance & Compliance", progress: 90, tasks: 6, completed: 5 },
    ];

    const upcomingCoaching = [
        { coach: "Sarah Johnson", topic: "Financial Planning", date: "2025-10-25", time: "14:00" },
        { coach: "Michael Chen", topic: "Marketing Strategy", date: "2025-10-28", time: "10:00" },
    ];

    const notifications = [
        { type: "warning", message: "B-BBEE certificate expires in 30 days", date: "2 hours ago" },
        { type: "info", message: "New learning module available: Cash Flow Management", date: "1 day ago" },
        { type: "success", message: "Roadmap task completed: Quarterly financial review", date: "2 days ago" },
    ];


    const user = JSON.parse(localStorage.getItem('user'))
    const username = user.firstName + " " + user.lastName




    return(
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Hero Strip */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl p-6">
                <h1 className="text-3xl mb-2">Hello, {username}!</h1>
                <p className="opacity-90 mb-4">
                    Last action: Completed "Understanding Financial Statements" • 2 hours ago
                </p>
                <div className="flex items-center gap-2">
                    <span>Next milestone:</span>
                    {/* <StatusBadge status="pending" className="bg-white/20 text-white" /> */}
                    <span>Submit Q3 financial reports</span>
                </div>
            </div>

{/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          className="h-auto py-4 flex-col gap-2" 
          variant="outline"
          onClick={() => onNavigate?.("diagnostic")}
        >
          <FileText className="h-6 w-6" />
          <span>Start Diagnostic</span>
        </Button>
        <Button 
          className="h-auto py-4 flex-col gap-2" 
          variant="outline"
          onClick={() => onNavigate?.("funding")}
        >
          <Plus className="h-6 w-6" />
          <span>Request Funding</span>
        </Button>
        <Button 
          className="h-auto py-4 flex-col gap-2" 
          variant="outline"
          onClick={() => onNavigate?.("coaching")}
        >
          <Calendar className="h-6 w-6" />
          <span>Book Coach</span>
        </Button>
        <Button 
          className="h-auto py-4 flex-col gap-2"
          onClick={() => onNavigate?.("ai-coach")}
        >
          <TrendingUp className="h-6 w-6" />
          <span>Open AI Coach Lebo</span>
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Roadmap Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Roadmap Progress by Theme</CardTitle>
            <CardDescription>Your personalized development plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {roadmapThemes.map((theme, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span>{theme.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {theme.completed}/{theme.tasks} tasks
                  </span>
                </div>
                <Progress value={theme.progress} className="h-2" />
              </div>
            ))}
            <Button 
              className="w-full mt-4" 
              variant="outline"
              onClick={() => onNavigate?.("diagnostic")}
            >
              View Full Roadmap <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Funding Status */}
        <Card>
          <CardHeader>
            <CardTitle>Funding Status</CardTitle>
            <CardDescription>Track your funding applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span>Working Capital Loan</span>
                  <StatusBadge status="approved" />
                </div>
                <p className="text-sm text-muted-foreground">R 500,000 • Approved with conditions</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span>Equipment Grant</span>
                  <StatusBadge status="under-review" />
                </div>
                <p className="text-sm text-muted-foreground">R 250,000 • Submitted 5 days ago</p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span>Expansion Funding</span>
                  <StatusBadge status="draft" />
                </div>
                <p className="text-sm text-muted-foreground">R 1,000,000 • Draft in progress</p>
              </div>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => onNavigate?.("funding")}
            >
              New Funding Request <Plus className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Coaching */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Coaching Sessions</CardTitle>
            <CardDescription>Your scheduled mentorship</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingCoaching.map((session, i) => (
              <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p>{session.topic}</p>
                  <p className="text-sm text-muted-foreground">with {session.coach}</p>
                  <p className="text-sm text-muted-foreground">
                    {session.date} at {session.time}
                  </p>
                </div>
                <Button size="sm" variant="outline">Join</Button>
              </div>
            ))}
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => onNavigate?.("coaching")}
            >
              Book New Session <Calendar className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Stay up to date with important updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((notification, i) => (
              <div key={i} className="flex gap-3 p-3 border rounded-lg">
                <div
                  className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${
                    notification.type === "warning"
                      ? "bg-warning-color"
                      : notification.type === "success"
                      ? "bg-success-color"
                      : "bg-info-color"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              View All Notifications
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>

    )
}