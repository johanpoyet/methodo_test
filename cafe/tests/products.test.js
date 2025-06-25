const Products = require('../src/products');

describe('Products', () => {
  let products;

  beforeEach(() => {
    products = new Products();
  });

  test('should return the correct price for espresso', () => {
    expect(products.getPrice('espresso')).toBe(150);
  });

  test('should return the correct price for latte', () => {
    expect(products.getPrice('latte')).toBe(200);
  });

  test('should return the correct price for cappuccino', () => {
    expect(products.getPrice('cappuccino')).toBe(220);
  });

  test('should return the correct price for chocolate', () => {
    expect(products.getPrice('chocolate')).toBe(250);
  });

  test('should validate sugar level within range', () => {
    expect(() => products.validateSugarLevel(0)).not.toThrow();
    expect(() => products.validateSugarLevel(5)).not.toThrow();
    expect(() => products.validateSugarLevel(6)).toThrow('Sugar level must be between 0 and 5');
    expect(() => products.validateSugarLevel(-1)).toThrow('Sugar level must be between 0 and 5');
  });

  test('should throw an error for invalid product type', () => {
    expect(() => products.getPrice('invalidProduct')).toThrow('Product not found');
  });

  test('should return correct ingredients for each product', () => {
    expect(products.getIngredients('espresso')).toEqual({ coffee: 1 });
    expect(products.getIngredients('latte')).toEqual({ coffee: 1, milk: 1 });
    expect(products.getIngredients('cappuccino')).toEqual({ coffee: 1, milk: 2 });
    expect(products.getIngredients('chocolate')).toEqual({ chocolate: 1, milk: 1 });
    expect(() => products.getIngredients('invalidProduct')).toThrow('Product not found');
  });
});