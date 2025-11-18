import { Calendar, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { EquipmentCardProps } from "@/types";

const EquipmentCard = ({ equipment }: EquipmentCardProps) => {
  const isAvailable = equipment.status === "Disponible";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={equipment.image}
          alt={equipment.name}
          className="w-full h-48 object-cover"
        />
        <Badge 
          className={`absolute top-2 right-2 ${
            isAvailable 
              ? "bg-green-500 hover:bg-green-600" 
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {equipment.status}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
            {equipment.name}
          </h3>
          <div className="flex items-center ml-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{equipment.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {equipment.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="text-xs">
            {equipment.category}
          </Badge>
          <div className="flex items-center text-gray-500 text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            Campus Principal
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            className={`flex-1 ${
              isAvailable 
                ? "bg-[#00796B] hover:bg-[#00695C]" 
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isAvailable}
          >
            <a href={`/equipment/${equipment.id}/reserve`} className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {isAvailable ? "Réserver" : "Indisponible"}
            </a>
          </Button>
          <Button variant="outline" size="sm">
            <a href={`/equipment/${equipment.id}`} className="flex items-center">
            Détails
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;
