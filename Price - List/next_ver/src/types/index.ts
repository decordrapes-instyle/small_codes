export interface Product {
  serial: number;
  'product name'?: string;
  media?: string;
  price?: number;
  'simple price'?: number;
  'premium price'?: number;
  'preimum price'?: number;
  gst?: number;
  [key: string]: string | number | undefined;
}

export interface CategoryData {
  lastUpdated: string;
  products: Record<string, Product>;
}

export interface ProductCardProps {
  product: Omit<Product, 'serial'> & { serial: number };
  columnNames: string[];
  logoUrl?: string;
}

export interface Measurement {
  id: string;
  width: number;
  height: number;
  area: number;
}
