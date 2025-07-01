
import { Heart, MessageCircle, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
  tags: string[];
  likes: number;
  date: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {formatDate(project.date)}
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">
          {project.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <User className="h-4 w-4 mr-2" />
          <span className="text-sm">{project.author}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-500">
              <Heart className="h-4 w-4 mr-1" />
              {project.likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <MessageCircle className="h-4 w-4 mr-1" />
              Commenter
            </Button>
          </div>
          <Button variant="outline" size="sm">
            Lire plus
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
