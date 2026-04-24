import { Calendar, Clock, Video, Star, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/StatusBadge";

const coaches = [
  {
    name: "Sarah Johnson",
    specialty: "Financial Management",
    rating: 4.9,
    sessions: 127,
    availability: "Next available: Oct 25, 14:00",
  },
  {
    name: "Michael Chen",
    specialty: "Sales & Marketing",
    rating: 4.8,
    sessions: 98,
    availability: "Next available: Oct 28, 10:00",
  },
  {
    name: "Nomsa Dlamini",
    specialty: "Operations & HR",
    rating: 5.0,
    sessions: 156,
    availability: "Next available: Oct 26, 15:30",
  },
];

const upcomingSessions = [
  {
    id: "s1",
    coach: "Sarah Johnson",
    topic: "Q4 Financial Planning",
    date: "2025-10-25",
    time: "14:00 - 15:00",
    status: "confirmed",
    objectives: ["Review Q3 performance", "Plan Q4 budget", "Discuss cash flow projections"],
  },
  {
    id: "s2",
    coach: "Michael Chen",
    topic: "Digital Marketing Strategy",
    date: "2025-10-28",
    time: "10:00 - 11:00",
    status: "confirmed",
    objectives: ["Social media audit", "Content calendar planning"],
  },
];

const pastSessions = [
  {
    id: "p1",
    coach: "Sarah Johnson",
    topic: "Cash Flow Management",
    date: "2025-10-10",
    duration: "60 mins",
    rating: 5,
    notes: "Discussed weekly cash flow forecasting and implemented rolling 13-week forecast template.",
    tasks: ["Set up weekly cash flow tracker", "Review accounts receivable aging"],
  },
  {
    id: "p2",
    coach: "Michael Chen",
    topic: "Customer Acquisition Strategy",
    date: "2025-09-28",
    duration: "60 mins",
    rating: 4,
    notes: "Reviewed current marketing channels and identified opportunities for improvement.",
    tasks: ["Create customer persona documents", "Audit current marketing spend"],
  },
];
export default function Coaching(){
    return(
         <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl mb-2">Coaching & Mentorship</h1>
          <p className="text-muted-foreground">
            Connect with experienced mentors to accelerate your growth
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Book Session
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl tabular-nums mb-1">12</div>
            <p className="text-sm text-muted-foreground">Total Sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl tabular-nums mb-1">4.8</div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl tabular-nums mb-1">18</div>
            <p className="text-sm text-muted-foreground">Action Items Completed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="coaches">Find a Coach</TabsTrigger>
          <TabsTrigger value="history">Session History</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingSessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{session.topic}</CardTitle>
                      <StatusBadge status={session.status} />
                    </div>
                    <CardDescription>with {session.coach}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{session.time}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm mb-2">Session Objectives:</p>
                  <ul className="space-y-1">
                    {session.objectives.map((objective, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button>
                    <Video className="h-4 w-4 mr-2" />
                    Join Session
                  </Button>
                  <Button variant="outline">Reschedule</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="coaches" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coaches.map((coach, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <Avatar className="h-16 w-16 mx-auto mb-3">
                      <AvatarFallback className="text-lg">
                        {coach.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="mb-1">{coach.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{coach.specialty}</p>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-warning-color text-warning-color" />
                      <span className="tabular-nums">{coach.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({coach.sessions} sessions)
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{coach.availability}</p>
                  </div>
                  <Button className="w-full">Book Session</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {pastSessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle>{session.topic}</CardTitle>
                    <CardDescription>
                      {session.coach} • {session.date} • {session.duration}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < session.rating
                            ? "fill-warning-color text-warning-color"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm mb-2">Session Notes:</p>
                  <p className="text-sm text-muted-foreground">{session.notes}</p>
                </div>

                <div>
                  <p className="text-sm mb-2">Action Items:</p>
                  <ul className="space-y-1">
                    {session.tasks.map((task, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <input type="checkbox" className="mt-1" defaultChecked />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Full Notes
                  </Button>
                  <Button variant="outline" size="sm">
                    Download Recording
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}