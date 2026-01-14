import { Package } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  productCount: number;
  onClick: () => void;
}

export default function CategoryCard({ name, productCount, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-gray-800 min-h-[110px] flex flex-col items-center justify-center text-center relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 to-gray-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />

      <Package className="w-8 h-8 mb-3 text-gray-800 opacity-0 hidden" />

      <div className="text-sm font-semibold mb-2 text-sky-500 leading-tight">
        {name}
      </div>

      <div className="inline-block bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-[0.6rem] font-normal">
        {productCount} {productCount === 1 ? 'item' : 'items'}
      </div>
    </div>
  );
}
