import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Calendar, MapPin, UtensilsCrossed, BookOpen, FileText, Users, Clock } from "lucide-react";
import { ChatInterface } from "@/components/ChatInterface";
import { CampusInfoCard } from "@/components/CampusInfoCard";
import campusHero from "@/assets/campus-hero.jpg";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const campusCategories = [
    {
      icon: Calendar,
      title: "Schedules",
      description: "Class schedules, exam dates, academic calendar",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: MapPin,
      title: "Facilities",
      description: "Campus map, building hours, room locations",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: UtensilsCrossed,
      title: "Dining",
      description: "Cafeteria menus, hours, nutrition info",
      color: "text-primary-light",
      bgColor: "bg-primary-light/10"
    },
    {
      icon: BookOpen,
      title: "Library",
      description: "Library hours, resources, study rooms",
      color: "text-accent-light",
      bgColor: "bg-accent-light/10"
    },
    {
      icon: FileText,
      title: "Administration",
      description: "Forms, procedures, contacts, policies",
      color: "text-primary-dark",
      bgColor: "bg-primary-dark/10"
    },
    {
      icon: Users,
      title: "Student Services",
      description: "Counseling, health, career services",
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ];

  const quickActions = [
    "What's the library schedule today?",
    "Show me the dining hall menu",
    "Where is the computer science building?",
    "When is registration deadline?",
    "How do I book a study room?",
    "Campus shuttle schedule"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${campusHero})` }}
        ></div>
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Smart Campus Assistant
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Your AI-powered guide to campus life. Get instant answers about schedules, facilities, dining, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-4 shadow-medium transition-bounce hover:scale-105"
                onClick={() => setIsChatOpen(true)}
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                Start Chatting
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-bounce hover:scale-105"
              >
                <Clock className="w-6 h-6 mr-2" />
                Quick Info
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Categories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What can I help you with?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore different areas of campus information or ask me anything directly
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {campusCategories.map((category, index) => (
              <CampusInfoCard
                key={category.title}
                {...category}
                onClick={() => setIsChatOpen(true)}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Popular Questions
            </h3>
            <p className="text-lg text-muted-foreground">
              Click on any question to get started
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {quickActions.map((action, index) => (
              <Card 
                key={action}
                className="cursor-pointer transition-all duration-300 hover:shadow-medium hover:scale-105 border-border/50 hover:border-primary/30"
                onClick={() => setIsChatOpen(true)}
              >
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    {action}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      <ChatInterface 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default Index;