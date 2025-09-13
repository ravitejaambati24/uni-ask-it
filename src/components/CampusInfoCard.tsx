import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampusInfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  onClick: () => void;
  delay?: number;
}

export const CampusInfoCard = ({ 
  icon: Icon, 
  title, 
  description, 
  color, 
  bgColor, 
  onClick, 
  delay = 0 
}: CampusInfoCardProps) => {
  return (
    <Card 
      className="cursor-pointer transition-all duration-500 hover:shadow-medium hover:scale-105 border-border/50 hover:border-primary/30 gradient-card group"
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="pb-3">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110",
          bgColor
        )}>
          <Icon className={cn("w-6 h-6", color)} />
        </div>
        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground group-hover:text-foreground transition-colors">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};