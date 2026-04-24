import { BookOpen, Clock, Award, Play, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



const modules = [
  {
    id: "m1",
    title: "Financial Statements 101",
    theme: "Finance",
    difficulty: "Beginner",
    duration: 45,
    status: "complete",
    progress: 100,
    lessons: 6,
    completedLessons: 6,
    hasQuiz: true,
    quizScore: 95,
  },
  {
    id: "m2",
    title: "Budgeting Essentials",
    theme: "Finance",
    difficulty: "Beginner",
    duration: 60,
    status: "active",
    progress: 66,
    lessons: 8,
    completedLessons: 5,
    hasQuiz: true,
  },
  {
    id: "m3",
    title: "Cash Flow Management",
    theme: "Finance",
    difficulty: "Intermediate",
    duration: 90,
    status: "locked",
    progress: 0,
    lessons: 10,
    completedLessons: 0,
    prerequisite: "Complete Budgeting Essentials",
    hasQuiz: true,
  },
  {
    id: "m4",
    title: "Marketing Strategy Framework",
    theme: "Marketing",
    difficulty: "Intermediate",
    duration: 75,
    status: "pending",
    progress: 0,
    lessons: 9,
    completedLessons: 0,
    hasQuiz: true,
  },
  {
    id: "m5",
    title: "Digital Marketing Fundamentals",
    theme: "Marketing",
    difficulty: "Beginner",
    duration: 60,
    status: "pending",
    progress: 0,
    lessons: 7,
    completedLessons: 0,
    hasQuiz: false
  }
]

const badges = [
  { name: "Finance Fundamentals", earned: true, icon: "💰" },
  { name: "Quick Learner", earned: true, icon: "⚡" },
  { name: "7 Day Streak", earned: true, icon: "🔥" },
  { name: "Marketing Master", earned: false, icon: "📊" },
  { name: "All-Rounder", earned: false, icon: "🌟" },
]

const totalLessons = modules.reduce((sum, m) => sum + m.lessons, 0);
const completedLessons = modules.reduce((sum, m) => sum + m.completedLessons, 0);
const overallProgress = Math.round((completedLessons / totalLessons) * 100);
const completedModules = modules.filter((m) => m.status === "complete").length;

const getDifficultyColor = (difficulty) => {
    if (difficulty === "Beginner") return "bg-green-100 text-green-800";
    if (difficulty === "Intermediate") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
}

export default function LearningHub(){
    return(
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl mb-2">Learning Hub</h1>
                <p className="text-muted-foreground">
                    Personalized learning paths to grow your business skills
                </p>
            </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl tabular-nums mb-1">{overallProgress}%</div>
            <p className="text-sm text-muted-foreground">Overall Progress</p>
            <Progress value={overallProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl tabular-nums mb-1">{completedModules}</div>
            <p className="text-sm text-muted-foreground">Modules Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl tabular-nums mb-1">7</div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl tabular-nums mb-1">{badges.filter(b => b.earned).length}</div>
            <p className="text-sm text-muted-foreground">Badges Earned</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules">
        <TabsList>
          <TabsTrigger value="modules">Learning Modules</TabsTrigger>
          <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
          <TabsTrigger value="evidence">Evidence Library</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          {modules.map((module) => (
            <Card key={module.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{module.title}</CardTitle>
                      {module.status === "complete" && (
                        <CheckCircle2 className="h-5 w-5 text-success-color" />
                      )}
                      {module.status === "locked" && (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <CardDescription className="flex flex-wrap gap-2 items-center">
                      <Badge variant="secondary">{module.theme}</Badge>
                      <Badge className={getDifficultyColor(module.difficulty)} variant="secondary">
                        {module.difficulty}
                      </Badge>
                      <span className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        {module.duration} mins
                      </span>
                      <span className="text-sm">
                        {module.lessons} lessons
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {module.prerequisite && module.status === "locked" && (
                  <div className="p-3 bg-muted rounded-lg flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{module.prerequisite}</p>
                  </div>
                )}

                {module.status !== "locked" && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm tabular-nums">
                        {module.completedLessons}/{module.lessons} lessons
                      </span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>
                )}

                {module.quizScore && (
                  <div className="flex items-center gap-2 p-3 bg-success-color/10 rounded-lg border border-success-color/20">
                    <Award className="h-5 w-5 text-success-color" />
                    <span className="text-sm">Quiz Score: {module.quizScore}%</span>
                  </div>
                )}

                <div className="flex gap-2">
                  {module.status === "complete" && (
                    <>
                      <Button variant="outline">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Review Module
                      </Button>
                      <Button variant="outline">View Certificate</Button>
                    </>
                  )}
                  {module.status === "active" && (
                    <Button>
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  )}
                  {module.status === "pending" && (
                    <Button>
                      <Play className="h-4 w-4 mr-2" />
                      Start Module
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="badges">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Earn badges as you progress through your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {badges.map((badge, i) => (
                  <div
                    key={i}
                    className={`p-6 border rounded-lg text-center ${
                      badge.earned ? "bg-card" : "bg-muted/50 opacity-60"
                    }`}
                  >
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <p className={badge.earned ? "" : "text-muted-foreground"}>
                      {badge.name}
                    </p>
                    {badge.earned && (
                      <Badge variant="secondary" className="mt-2">
                        Earned
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidence">
          <Card>
            <CardHeader>
              <CardTitle>Evidence Library</CardTitle>
              <CardDescription>
                Upload and manage evidence of completed learning and task implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p>Monthly Financial Report - October 2025</p>
                      <p className="text-sm text-muted-foreground">
                        Linked to: Financial Statements 101
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p>Budget Template - Q4 2025</p>
                      <p className="text-sm text-muted-foreground">
                        Linked to: Budgeting Essentials
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>

                <Button className="w-full" variant="outline">
                  Upload New Evidence
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    )
}