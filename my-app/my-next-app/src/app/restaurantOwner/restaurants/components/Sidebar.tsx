import { Building2, DollarSign, ListOrdered, MenuSquare } from 'lucide-react';

interface SidebarProps {
  selected: string;
  setSelected: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selected, setSelected }) => {
  const menuItems = [
    { name: "Dashboard", icon: Building2 },
    { name: "Restaurants", icon: Building2 },
    { name: "Categories", icon: ListOrdered },
    { name: "Menu Items", icon: MenuSquare },
    { name: "Analytics", icon: DollarSign },
    { name: "Settings", icon: MenuSquare },
  ];

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4 flex items-center gap-2">
        <Building2 className="h-6 w-6 text-red-500" />
        <span className="font-semibold text-lg">RestaurantOS</span>
      </div>
      <nav className="space-y-1 px-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setSelected(item.name)}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg w-full text-left ${
              selected === item.name 
                ? "bg-red-500 text-white" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
};