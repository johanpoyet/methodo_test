const Stock = require('../src/stock');

describe('Stock', () => {
  let stock;

  beforeEach(() => {
    stock = new Stock();
  });

  test('should add and use coffee', () => {
    stock.addIngredient('coffee', 2);
    expect(stock.checkAvailability('coffee')).toBe(true);
    stock.useIngredient('coffee', 1);
    expect(stock.ingredients.coffee).toBe(1);
  });

  test('should add and use milk', () => {
    stock.addIngredient('milk', 3);
    expect(stock.checkAvailability('milk', 2)).toBe(true);
    stock.useIngredient('milk', 2);
    expect(stock.ingredients.milk).toBe(1);
  });

  test('should add and use chocolate', () => {
    stock.addIngredient('chocolate', 1);
    expect(stock.checkAvailability('chocolate')).toBe(true);
    stock.useIngredient('chocolate', 1);
    expect(stock.ingredients.chocolate).toBe(0);
  });

  test('should add and use cacao', () => {
    stock.addIngredient('cacao', 2);
    expect(stock.checkAvailability('cacao', 2)).toBe(true);
    stock.useIngredient('cacao', 2);
    expect(stock.ingredients.cacao).toBe(0);
  });

  test('should add and use sugar', () => {
    stock.addIngredient('sugar', 5);
    expect(stock.checkAvailability('sugar', 3)).toBe(true);
    stock.useIngredient('sugar', 3);
    expect(stock.ingredients.sugar).toBe(2);
  });

  test('should always have water available', () => {
    expect(stock.checkAvailability('water', 1000)).toBe(true);
    // useIngredient sur l'eau ne doit rien faire ni planter
    expect(() => stock.useIngredient('water', 1000)).not.toThrow();
  });

  test('should throw error for unknown ingredient', () => {
    expect(() => stock.addIngredient('unknown', 1)).toThrow();
    expect(() => stock.checkAvailability('unknown')).toThrow();
    expect(() => stock.useIngredient('unknown', 1)).toThrow();
  });

  test('should throw error if not enough in stock', () => {
    stock.addIngredient('coffee', 1);
    expect(() => stock.useIngredient('coffee', 2)).toThrow();
  });
});