import { useState } from 'react';
import { IndianRupee, Ruler } from 'lucide-react';
import SendMeasurementModal from './MeasurementModal';

interface Product {
  serial: string;
  'product name'?: string;
  media?: string;
  gst?: string;
  [key: string]: any;
}

interface ProductCardProps {
  product: Product;
  columnNames: string[];
  logoUrl?: string;
}

function formatFieldName(field: string): string {
  return field
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatFieldValue(field: string, value: any): string {
  if (typeof value === 'number') {
    if (field.toLowerCase().includes('price')) {
      return `₹${value.toLocaleString('en-IN')}`;
    }
    return value.toLocaleString('en-IN');
  }
  return String(value);
}

export default function ProductCard({ product, columnNames, logoUrl }: ProductCardProps) {
  const [showMeasurementModal, setShowMeasurementModal] = useState(false);
  const productName = product['product name'] || product['media'] || `Product ${product.serial}`;

  // Filter and organize fields for better display
  const priceFields: Array<[string, any]> = [];
  const otherFields: Array<[string, any]> = [];

  columnNames.forEach((column) => {
    if (
      column !== 'product name' &&
      column !== 'media' &&
      column !== 'gst' &&
      column !== 'serial' &&
      product[column] !== undefined
    ) {
      const isPriceField = column.toLowerCase().includes('price');
      if (isPriceField) {
        priceFields.push([column, product[column]]);
      } else {
        otherFields.push([column, product[column]]);
      }
    }
  });

  return (
    <>
      <div 
        className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 transition-all hover:shadow-lg hover:border-sky-300 cursor-pointer group relative overflow-hidden"
        onClick={() => setShowMeasurementModal(true)}
      >
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/0 to-blue-50/0 group-hover:from-sky-50/50 group-hover:to-blue-50/30 transition-all duration-300 pointer-events-none" />
        
        {/* Measurement icon indicator */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-sky-500 text-white p-2 rounded-lg shadow-lg">
            <Ruler className="w-4 h-4" />
          </div>
        </div>

        <div className="relative">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0 pr-12">
              <div className="text-[0.65rem] sm:text-xs font-bold text-sky-600 uppercase tracking-wide mb-1">
                #{product.serial}
              </div>
              <h3 className="font-bold text-sm sm:text-base text-gray-900 truncate">
                {productName}
              </h3>
            </div>
          </div>

          {/* GST Badge */}
          {product.gst && (
            <div className="inline-block bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full text-[0.65rem] font-bold mb-3">
              GST {formatFieldValue('gst', product.gst)}
            </div>
          )}

          {/* Price Fields - Prominent Display */}
          {priceFields.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {priceFields.map(([column, value]) => (
                <div key={column} className="bg-gradient-to-br from-sky-50 to-blue-50 p-3 rounded-lg border border-sky-200">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-700 mb-1">
                    <IndianRupee className="w-3.5 h-3.5" />
                    {formatFieldName(column)}
                  </div>
                  <div className="font-bold text-base sm:text-lg text-sky-600">
                    {formatFieldValue(column, value)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Other Fields - Compact Grid */}
          {otherFields.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {otherFields.slice(0, 4).map(([column, value]) => (
                <div key={column} className="flex flex-col">
                  <div className="text-[0.65rem] sm:text-xs font-medium text-gray-500 mb-0.5 truncate">
                    {formatFieldName(column)}
                  </div>
                  <div className="font-semibold text-xs sm:text-sm text-gray-800 truncate">
                    {formatFieldValue(column, value)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show more indicator if there are hidden fields */}
          {otherFields.length > 4 && (
            <div className="mt-2 text-center">
              <span className="text-xs text-sky-600 font-medium">
                +{otherFields.length - 4} more fields
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Use the existing SendMeasurementModal component */}
      {showMeasurementModal && (
        <SendMeasurementModal
          onClose={() => setShowMeasurementModal(false)}
          initialProductCode={product.serial}
          initialProductName={productName}
          logoUrl={logoUrl}
        />
      )}
    </>
  );
}