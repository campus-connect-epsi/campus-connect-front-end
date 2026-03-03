export interface Equipment {
  id: number;
  name: string;
  category: string;
  status: 'Disponible' | 'Réservé' | 'En maintenance';
  image: string;
  description: string;
  rating: number;
  location: string;
  owner: string;
}

export interface EquipmentCardProps {
  equipment: Equipment;
}
