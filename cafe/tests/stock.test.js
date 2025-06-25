const Stock = require('../src/stock');

describe('Stock', () => {
  let stock;

  beforeEach(() => {
    stock = new Stock();
  });

  test('should add and use ingredients', () => {
    stock.addIngredient('coffee', 2);
    expect(stock.checkAvailability('coffee')).toBe(true);
    stock.useIngredient('coffee', 1);
    expect(stock.ingredients.coffee).toBe(1);
  });
});