export interface ProductType {
  name: string;
  price: number;
  sugarLevel: number; // 0 to 5
}

export interface StockType {
  ingredient: string;
  amount: number;
}