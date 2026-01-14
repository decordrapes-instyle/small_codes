import { useState } from 'react';
import CategoryCard from './CategoryCard';
import SendMeasurementModal from './MeasurementModal';
import { CategoryData } from '../types';
import { Package, Send } from 'lucide-react';

interface CategoriesViewProps {
  categories: Record<string, CategoryData>;
  onCategoryClick: (categoryName: string) => void;
}

export default function CategoriesView({ categories, onCategoryClick }: CategoriesViewProps) {
  const [showMeasurementModal, setShowMeasurementModal] = useState(false);

  const totalProducts = Object.values(categories).reduce((sum, cat) => {
    return sum + (cat.products ? Object.keys(cat.products).length : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Our Collections</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse our complete catalog of premium window treatments and decorative solutions
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            <div className="bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-sky-600">{Object.keys(categories).length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-green-600">{totalProducts}</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
          </div>
          <button
            onClick={() => setShowMeasurementModal(true)}
            className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Send className="w-5 h-5" />
            Send Measurements
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
          {Object.entries(categories).map(([categoryName, categoryData]) => {
            const productCount = categoryData.products ? Object.keys(categoryData.products).length : 0;
            return (
              <CategoryCard
                key={categoryName}
                name={categoryName}
                productCount={productCount}
                onClick={() => onCategoryClick(categoryName)}
              />
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-8 border border-sky-200">
          <div className="flex items-start gap-4">
            <Package className="w-8 h-8 text-sky-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">How to Send Measurements</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>1. Click the "Send Measurements" button above</li>
                <li>2. Search and select a product from our catalog</li>
                <li>3. Enter your dimensions in cm, mm, inches, feet, or meters</li>
                <li>4. Add more products or measurements as needed</li>
                <li>5. Share the measurement request as an image via WhatsApp, Email, or any app</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showMeasurementModal && (
        <SendMeasurementModal onClose={() => setShowMeasurementModal(false)} />
      )}
    </div>
  );
}
