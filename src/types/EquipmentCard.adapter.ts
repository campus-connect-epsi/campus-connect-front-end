export interface Equipment {
  id: number;
  name: string;
  category: string;
  status: string;
  image: string;
  description: string;
  rating: number;
}

export interface EquipmentCardProps {
  equipment: Equipment;
}
