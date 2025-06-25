const Products = require('../src/products');

describe('Products', () => {
  let products;

  beforeEach(() => {
    products = new Products();
  });

  test('should return the correct price for coffee', () => {
    const price = products.getPrice('espresso');
    expect(price).toBeGreaterThan(0);
  });

  test('should return the correct price for chocolate', () => {
    const price = products.getPrice('chocolate');
    expect(price).toBeGreaterThan(0);
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
});