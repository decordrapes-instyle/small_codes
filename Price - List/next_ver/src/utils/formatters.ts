export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const startOfDayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const startOfDayNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = startOfDayNow.getTime() - startOfDayDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function formatFullDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatFieldName(fieldName: string): string {
  if (fieldName === 'product name') return 'Product';
  if (fieldName === 'simple price') return 'Price';
  if (fieldName === 'preimum price') return 'Premium';
  if (fieldName === 'with pelmet') return 'With Pelmet';
  if (fieldName === 'regular print') return 'Regular Print';
  if (fieldName === 'uv print') return 'UV Print';
  return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
}

export function formatFieldValue(fieldName: string, value: string | number | undefined): string {
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

export function generateProductId(categoryName: string, productName: string): string {
  return `${categoryName.toLowerCase().replace(/\s+/g, '-')}-${productName.toLowerCase().replace(/\s+/g, '-')}`;
}
