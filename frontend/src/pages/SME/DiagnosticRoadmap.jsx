import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Paperclip, User, CheckCircle2, Circle, Clock, ChevronRight, Save, Info } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge"


const themes = [
  {
    id: "finance",
    name: "Financial Management",
    priority: "High",
    impact: "High",
    effort: "Medium",
    progress: 75,
    tasks: [
      {
        id: "f1",
        title: "Implement monthly financial reporting",
        owner: "Sarah Johnson",
        dueDate: "2025-11-15",
        status: "complete",
        hasEvidence: true,
        linkedModule: "Financial Statements 101",
      },
      {
        id: "f2",
        title: "Set up budgeting process",
        owner: "Sarah Johnson",
        dueDate: "2025-11-30",
        status: "active",
        hasEvidence: false,
        linkedModule: "Budgeting Essentials",
      },
      {
        id: "f3",
        title: "Establish cash flow forecasting",
        owner: "Sarah Johnson",
        dueDate: "2025-12-15",
        status: "pending",
        hasEvidence: false,
      },
    ],
  },
  {
    id: "marketing",
    name: "Sales & Marketing",
    priority: "High",
    impact: "High",
    effort: "High",
    progress: 40,
    tasks: [
      {
        id: "m1",
        title: "Develop marketing strategy",
        owner: "Michael Chen",
        dueDate: "2025-11-20",
        status: "active",
        linkedModule: "Marketing Strategy Framework",
      },
      {
        id: "m2",
        title: "Implement CRM system",
        owner: "Michael Chen",
        dueDate: "2025-12-10",
        status: "pending",
      },
    ],
  },
  {
    id: "operations",
    name: "Operations Excellence",
    priority: "Medium",
    impact: "Medium",
    effort: "Medium",
    progress: 30,
    tasks: [
      {
        id: "o1",
        title: "Document standard operating procedures",
        owner: "Team Lead",
        dueDate: "2025-12-01",
        status: "active",
      },
      {
        id: "o2",
        title: "Implement quality control measures",
        owner: "Team Lead",
        dueDate: "2025-12-20",
        status: "pending",
      },
    ],
  },
];

const sections = [
  {
    id: "finance",
    name: "Finance & Accounting",
    questions: [
      {
        id: "f1",
        question: "Do you maintain accurate monthly financial statements?",
        tooltip: "Financial statements include income statement, balance sheet, and cash flow statement",
      },
      {
        id: "f2",
        question: "Do you have a formal budgeting and forecasting process?",
      },
      {
        id: "f3",
        question: "How do you track your cash flow?",
      },
    ],
  },
  {
    id: "operations",
    name: "Operations",
    questions: [
      {
        id: "o1",
        question: "Do you have documented operational processes?",
      },
      {
        id: "o2",
        question: "How do you measure operational efficiency?",
      },
    ],
  },
  {
    id: "people",
    name: "People & HR",
    questions: [
      {
        id: "p1",
        question: "Do you have formal HR policies and procedures?",
      },
      {
        id: "p2",
        question: "How do you manage employee performance?",
      },
    ],
  },
  {
    id: "marketing",
    name: "Sales & Marketing",
    questions: [
      {
        id: "m1",
        question: "Do you have a documented marketing strategy?",
      },
      {
        id: "m2",
        question: "How do you track customer acquisition and retention?",
      },
    ],
  },
  {
    id: "governance",
    name: "Governance & Compliance",
    questions: [
      {
        id: "g1",
        question: "Are all regulatory licenses and permits up to date?",
      },
      {
        id: "g2",
        question: "Do you have a formal governance structure?",
      },
    ],
  },
  {
    id: "digital",
    name: "Digital Maturity",
    questions: [
      {
        id: "d1",
        question: "What digital tools do you use for business operations?",
      },
      {
        id: "d2",
        question: "How do you leverage data for decision making?",
      },
    ],
  },
];

export default function DiagnosticRoadmap(){

  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState ({});
  const [notes, setNotes] = useState ({});

  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const diagnosticProgress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNote = (questionId, value) => {
    setNotes({ ...notes, [questionId]: value });
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  // Roadmap helpers
  const overallProgress = Math.round(
    themes.reduce((sum, theme) => sum + theme.progress, 0) / themes.length
  );

  const getPriorityColor = (priority) => {
    if (priority === "High") return "text-danger-color";
    if (priority === "Medium") return "text-warning-color";
    return "text-info-color";
  };

  const getStatusIcon = (status) => {
    if (status === "complete") return <CheckCircle2 className="h-5 w-5 text-success-color" />;
    if (status === "active") return <Clock className="h-5 w-5 text-warning-color" />;
    return <Circle className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <Tabs defaultValue="roadmap" className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Diagnostic & Roadmap</h1>
        <p className="text-muted-foreground mb-4">
          Assess your business and follow your personalized development plan
        </p>
        <TabsList>
          <TabsTrigger value="roadmap">My Roadmap</TabsTrigger>
          <TabsTrigger value="diagnostic">Run Diagnostic</TabsTrigger>
        </TabsList>
      </div>

      {/* Roadmap Tab */}
      <TabsContent value="roadmap" className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl mb-2">Development Roadmap</h2>
            <p className="text-muted-foreground">
              Your personalized path to business growth
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl tabular-nums mb-1">{overallProgress}%</div>
            <p className="text-sm text-muted-foreground">Overall Progress</p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl tabular-nums mb-1">12</div>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl tabular-nums mb-1 text-success-color">5</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl tabular-nums mb-1 text-warning-color">4</div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Themes */}
        <Tabs defaultValue={themes[0].id}>
          <TabsList className="w-full justify-start overflow-x-auto">
            {themes.map((theme) => (
              <TabsTrigger key={theme.id} value={theme.id} className="flex-shrink-0">
                {theme.name}
                <Badge variant="secondary" className="ml-2">
                  {theme.progress}%
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {themes.map((theme) => (
            <TabsContent key={theme.id} value={theme.id} className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{theme.name}</CardTitle>
                      <CardDescription>
                        Expected impact on business growth and sustainability
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Assign Tasks
                      </Button>
                      <Button variant="outline" size="sm">
                        Add Comment
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Priority</p>
                      <Badge className={getPriorityColor(theme.priority)}>
                        {theme.priority}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Impact</p>
                      <Badge variant="secondary">{theme.impact}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Effort</p>
                      <Badge variant="outline">{theme.effort}</Badge>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm">Progress</p>
                      <span className="text-sm tabular-nums">{theme.progress}%</span>
                    </div>
                    <Progress value={theme.progress} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    {theme.tasks.map((task) => (
                      <div key={task.id} className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox className="mt-1" checked={task.status === "complete"} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              {getStatusIcon(task.status)}
                              <h4 className="flex-1">{task.title}</h4>
                              <StatusBadge status={task.status} />
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{task.owner}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{task.dueDate}</span>
                              </div>
                              {task.hasEvidence && (
                                <div className="flex items-center gap-1 text-success-color">
                                  <Paperclip className="h-4 w-4" />
                                  <span>Evidence uploaded</span>
                                </div>
                              )}
                            </div>

                            {task.linkedModule && (
                              <div className="flex items-center gap-2 p-2 bg-primary/5 rounded border border-primary/20">
                                <Badge variant="outline" className="border-primary text-primary">
                                  Learning Module
                                </Badge>
                                <span className="text-sm">{task.linkedModule}</span>
                                <Button size="sm" variant="link" className="ml-auto">
                                  Start Module
                                </Button>
                              </div>
                            )}

                            <div className="flex gap-2 mt-3">
                              {task.status !== "complete" && (
                                <>
                                  <Button size="sm" variant="outline">
                                    Upload Evidence
                                  </Button>
                                  <Button size="sm">Mark Complete</Button>
                                </>
                              )}
                              {task.status === "complete" && (
                                <Button size="sm" variant="outline">
                                  View Evidence
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full">
                    Add New Task to {theme.name}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </TabsContent>

      {/* Diagnostic Tab */}
      <TabsContent value="diagnostic" className="space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl mb-2">Business Diagnostic Assessment</h2>
            <p className="text-muted-foreground">
              Complete this assessment to generate your personalized development roadmap
            </p>
          </div>

          {/* Progress Map */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Overall Progress</CardTitle>
                <Badge variant="secondary">
                  {answeredQuestions} of {totalQuestions} completed
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={diagnosticProgress} className="h-2 mb-4" />
              <div className="flex flex-wrap gap-2">
                {sections.map((section, index) => {
                  const sectionAnswered = section.questions.filter(
                    (q) => answers[q.id]
                  ).length;
                  const sectionTotal = section.questions.length;
                  const isComplete = sectionAnswered === sectionTotal;
                  const isCurrent = index === currentSection;

                  return (
                    <Button
                      key={section.id}
                      variant={isCurrent ? "default" : isComplete ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setCurrentSection(index)}
                      className="relative"
                    >
                      {section.name}
                      {isComplete && !isCurrent && (
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-success-color rounded-full" />
                      )}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Current Section */}
          <Card>
            <CardHeader>
              <CardTitle>{sections[currentSection].name}</CardTitle>
              <CardDescription>
                Section {currentSection + 1} of {sections.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {sections[currentSection].questions.map((question) => (
                <div key={question.id} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-start gap-2">
                    <Label className="flex-1">{question.question}</Label>
                    {question.tooltip && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{question.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <RadioGroup
                    value={answers[question.id]}
                    onValueChange={(value) => handleAnswer(question.id, value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="always" id={`${question.id}-always`} />
                      <Label htmlFor={`${question.id}-always`} className="font-normal">
                        Always / Excellent
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="often" id={`${question.id}-often`} />
                      <Label htmlFor={`${question.id}-often`} className="font-normal">
                        Often / Good
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sometimes" id={`${question.id}-sometimes`} />
                      <Label htmlFor={`${question.id}-sometimes`} className="font-normal">
                        Sometimes / Fair
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rarely" id={`${question.id}-rarely`} />
                      <Label htmlFor={`${question.id}-rarely`} className="font-normal">
                        Rarely / Poor
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="never" id={`${question.id}-never`} />
                      <Label htmlFor={`${question.id}-never`} className="font-normal">
                        Never / Not applicable
                      </Label>
                    </div>
                  </RadioGroup>
                  <div className="pt-2">
                    <Label className="text-sm text-muted-foreground">Additional notes (optional)</Label>
                    <Textarea
                      value={notes[question.id] || ""}
                      onChange={(e) => handleNote(question.id, e.target.value)}
                      placeholder="Add any context or details..."
                      rows={2}
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevSection}
              disabled={currentSection === 0}
            >
              Previous Section
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              {currentSection === sections.length - 1 ? (
                <Button>Submit Assessment</Button>
              ) : (
                <Button onClick={nextSection}>
                  Next Section
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Auto-save indicator */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Your progress is automatically saved
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}