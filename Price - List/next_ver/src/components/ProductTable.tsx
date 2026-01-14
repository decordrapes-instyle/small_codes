import { Product } from '../types';
import { formatFieldName, formatFieldValue } from '../utils/formatters';

interface ProductTableProps {
  products: Product[];
  columnNames: string[];
}

export default function ProductTable({ products, columnNames }: ProductTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
            <th className="text-left px-5 py-4 font-bold text-gray-800 text-sm">#</th>
            {columnNames.map((column) => (
              <th
                key={column}
                className="text-left px-5 py-4 font-bold text-gray-800 text-sm whitespace-nowrap"
              >
                {formatFieldName(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.serial}
              className={`transition-all border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-sky-50`}
            >
              <td className="px-5 py-4 text-sm font-semibold text-gray-700">{product.serial}</td>
              {columnNames.map((column) => {
                const isPriceField = column.toLowerCase().includes('price');
                return (
                  <td
                    key={column}
                    className={`px-5 py-4 text-sm font-medium ${isPriceField ? 'text-sky-600 font-bold' : 'text-gray-700'}`}
                  >
                    {formatFieldValue(column, product[column])}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
