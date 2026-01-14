import { useEffect } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { CategoryData, Product } from '../types';
import { formatFullDate, formatRelativeTime } from '../utils/formatters';
import ProductTable from './ProductTable';
import ProductCard from './ProductCard';

interface CategoryDetailsViewProps {
  categoryName: string;
  categoryData: CategoryData;
  terms: string[];
  onBack: () => void;
}

export default function CategoryDetailsView({
  categoryName,
  categoryData,
  terms,
  onBack
}: CategoryDetailsViewProps) {
  const products = categoryData.products ? Object.values(categoryData.products).sort((a, b) => a.serial - b.serial) : [];

  const columnNames = extractColumnNames(products);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleExportPDF = () => {
    generatePDF(categoryName, categoryData, columnNames, terms);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-gray-700 font-semibold hover:text-sky-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Categories
            </button>
            <button
              onClick={handleExportPDF}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-colors shadow-lg"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {categoryName}
            </h1>
            <p className="text-gray-600">Complete price list and product details</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 flex-wrap gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Last Updated</p>
                <p className="text-sm font-semibold text-gray-800">
                  {formatFullDate(categoryData.lastUpdated)}
                </p>
                <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(categoryData.lastUpdated)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Total Products</p>
                <p className="text-sm font-bold text-sky-600">{products.length} Items</p>
              </div>
            </div>

            {products.length > 0 ? (
              <>
                <div className="hidden md:block mb-8">
                  <ProductTable
                    products={products}
                    columnNames={columnNames}
                  />
                </div>

                <div className="md:hidden space-y-4 mb-8">
                  {products.map((product) => (
                    <ProductCard
                      key={product.serial}
                      product={product}
                      columnNames={columnNames}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No products found in this category.</p>
              </div>
            )}

            {terms.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Terms & Conditions</h3>
                <ul className="space-y-3">
                  {terms.map((term, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-sky-600 font-bold flex-shrink-0">✓</span>
                      <span className="text-gray-700 text-sm">{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function extractColumnNames(products: Product[]): string[] {
  const allKeys = new Set<string>();

  products.forEach(product => {
    Object.keys(product).forEach(key => {
      if (key !== 'id' && key !== 'serial') {
        allKeys.add(key);
      }
    });
  });

  const priorityFields = ['product name', 'media', 'price', 'simple price', 'premium price', 'preimum price', 'gst'];
  const sortedKeys = Array.from(allKeys).sort((a, b) => {
    const aIndex = priorityFields.indexOf(a);
    const bIndex = priorityFields.indexOf(b);

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    return a.localeCompare(b);
  });

  return sortedKeys;
}

function generatePDF(categoryName: string, categoryData: CategoryData, columnNames: string[], terms: string[]) {
  const products = Object.values(categoryData.products).sort((a, b) => a.serial - b.serial);

  const printContent = document.createElement('div');
  printContent.style.display = 'none';
  printContent.innerHTML = `
    <div style="padding: 20px; font-family: system-ui;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px;">
        <div>
          <img src="https://res.cloudinary.com/dmiwq3l2s/image/upload/v1764322049/zrsn9atwtn42z5ivn4d8.svg" style="height: 60px;" />
        </div>
        <div style="text-align: right; font-size: 12px; color: #64748b;">
          <div style="font-size: 18px; font-weight: bold; color: #1e293b; margin-bottom: 5px;">${categoryName} Price List</div>
          <div>Last updated: ${formatFullDate(categoryData.lastUpdated)}</div>
          <div style="margin-top: 8px;">
            Basement Floor, 76, Canera Bank, Mission Road<br>
            Bangalore, Karnataka - 560027<br>
            +91 9738101408 • contact@decordrapesinstyle.com
          </div>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #e2e8f0;">Serial</th>
            ${columnNames.map(col => `<th style="text-align: left; padding: 10px; border-bottom: 1px solid #e2e8f0;">${formatFieldName(col)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${products.map(product => `
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px;">${product.serial}</td>
              ${columnNames.map(col => `<td style="padding: 10px;">${formatFieldValue(col, product[col])}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>

      ${terms.length > 0 ? `
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
          <h3 style="font-size: 14px; font-weight: bold; margin-bottom: 10px;">Terms & Conditions</h3>
          <ul style="font-size: 10px; padding-left: 20px;">
            ${terms.map(term => `<li style="margin-bottom: 5px;">${term}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;

  document.body.appendChild(printContent);
  printContent.style.display = 'block';

  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContent.innerHTML;

  window.print();

  document.body.innerHTML = originalContents;
  window.location.reload();
}

function formatFieldName(fieldName: string): string {
  if (fieldName === 'product name') return 'Product';
  if (fieldName === 'simple price') return 'Price';
  if (fieldName === 'preimum price') return 'Premium';
  return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
}

function formatFieldValue(fieldName: string, value: string | number | undefined): string {
  if (value === undefined || value === null) return '-';
  if (fieldName.toLowerCase().includes('price')) {
    return `₹${value}`;
  }
  if (fieldName.toLowerCase() === 'gst') {
    return `${(Number(value) * 100).toFixed(0)}%`;
  }
  if (value === 0) {
    return '-';
  }
  return String(value);
}
