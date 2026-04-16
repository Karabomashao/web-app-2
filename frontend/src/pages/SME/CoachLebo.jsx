import { Sparkles, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components//ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CoachLebo(){

    const [messages, setMessages] = useState([
    {
        id: "1",
        role: "assistant",
        content:
        "Hello! I'm Lebo, your AI Coach. I can help you with your roadmap, funding applications, or any questions about growing your business. How can I assist you today?",
    },
    ]);

    const [input, setInput] = useState(""); 

    const quickActions = [
    "Help me complete my diagnostic",
    "Review my funding application",
    "Suggest next roadmap tasks",
    "Explain B-BBEE requirements",
    ];

    const handleSend = () => {
        if (!input.trim()) return;

    const userMessage = {
        id: Date.now().toString(),
        role: "user",
        content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
        const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
            "I understand you need help with that. Let me provide some guidance based on your current progress and our knowledge base.",
        citations: ["Roadmap Guide", "Funding Handbook"],
        };

        setMessages((prev) => [...prev, aiMessage]);
        }, 1000);
    };

    return (
    <div className="h-full flex flex-col bg-background">
        <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2>AI Coach Lebo</h2>
        </div>
        </div>

        <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
            <div
                key={message.id}
                className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
                <div
                className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
                >
                <p>{message.content}</p>

                {message.citations && (
                    <div className="mt-2 flex flex-wrap gap-1">
                    {message.citations.map((citation, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                        {citation}
                        </Badge>
                    ))}
                    </div>
                )}
                </div>
            </div>
            ))}
        </div>
        </ScrollArea>

        <div className="border-t p-4 max-w-4xl mx-auto w-full">
        <div className="mb-3 flex flex-wrap gap-2">
            {quickActions.map((action, i) => (
            <Button
                key={i}
                variant="outline"
                size="sm"
                onClick={() => setInput(action)}
                className="text-xs"
            >
                {action}
            </Button>
            ))}
        </div>

        <div className="flex gap-2">
            <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="resize-none"
            rows={2}
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
                }
            }}
            />

            <Button onClick={handleSend} className="flex-shrink-0">
            <Send className="h-4 w-4" />
            </Button>
        </div>
        </div>
    </div>
    )
}