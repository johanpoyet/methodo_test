const MachineCafe = require('../src/machine-cafe');
const Brewer = require('../src/brewer');
const Stock = require('../src/stock');
const Products = require('../src/products');

describe('MachineCafe', () => {
  let brewer;
  let machine;
  let stock;
  let products;

  beforeEach(() => {
    brewer = new Brewer();
    stock = new Stock();
    products = new Products();
    machine = new MachineCafe(brewer, stock);
  });

  describe('Coin Insertion', () => {
    test('should accept a coin of 50cts and process an order', () => {
      machine.insertCoin(50);
      expect(brewer.getOrdersCount()).toBe(1);
    });

    test('should return money for coins less than 50cts', () => {
      machine.insertCoin(20);
      expect(machine.getReturnedMoney()).toBe(20);
      expect(brewer.getOrdersCount()).toBe(0);
    });

    test('should return money for defective machine', () => {
      const defectiveMachine = new MachineCafe(brewer, stock);
      defectiveMachine.setDefective(true);
      defectiveMachine.insertCoin(50);
      expect(defectiveMachine.getReturnedMoney()).toBe(50);
      expect(brewer.getOrdersCount()).toBe(0);
    });
  });

  describe('Stock Management', () => {
    test('should add ingredients to stock', () => {
      stock.addIngredient('sugar', 10);
      expect(stock.checkAvailability('sugar')).toBe(true);
    });

    test('should check availability of ingredients', () => {
      stock.addIngredient('coffee', 5);
      expect(stock.checkAvailability('coffee')).toBe(true);
    });

    test('should use ingredients from stock', () => {
      stock.addIngredient('sugar', 10);
      stock.useIngredient('sugar', 5);
      expect(stock.checkAvailability('sugar')).toBe(true);
    });
  });

  describe('Product Management', () => {
    test('should get price for a specific product', () => {
      expect(products.getPrice('latte')).toBe(200);
    });

    test('should validate sugar level', () => {
      expect(() => products.validateSugarLevel(3)).not.toThrow();
      expect(() => products.validateSugarLevel(6)).toThrow('Sugar level must be between 0 and 5');
    });
  });

  describe('Préparation de boisson', () => {
    let brewer, stock, machine, products;

    beforeEach(() => {
      brewer = new Brewer();
      stock = new Stock();
      products = new Products();
      machine = new MachineCafe(brewer, stock);
    });

    test('prépare un café si tous les ingrédients sont disponibles', () => {
      stock.addIngredient('coffee', 1);
      stock.addIngredient('sugar', 2);
      expect(() => machine.prepareDrink('espresso', 1)).not.toThrow();
      // Vérifie que le stock a été décrémenté
      expect(stock.ingredients.coffee).toBe(0);
      expect(stock.ingredients.sugar).toBe(1);
      // Vérifie que le Brewer a reçu la commande
      expect(brewer.getOrdersCount()).toBe(1);
    });

    test('ajoute la bonne dose de sucre si disponible', () => {
      stock.addIngredient('coffee', 1);
      stock.addIngredient('sugar', 3);
      machine.prepareDrink('espresso', 2);
      expect(stock.ingredients.sugar).toBe(1);
    });

    test('retourne une erreur si un ingrédient est manquant', () => {
      stock.addIngredient('coffee', 0);
      stock.addIngredient('sugar', 2);
      expect(() => machine.prepareDrink('espresso', 1)).toThrow('Ingrédient non disponible');
    });

    test('retourne une erreur si pas assez de sucre', () => {
      stock.addIngredient('coffee', 1);
      stock.addIngredient('sugar', 0);
      expect(() => machine.prepareDrink('espresso', 1)).toThrow('Ingrédient non disponible');
    });
  });

  test('dummy test', () => {
    expect(1).toBe(1);
  });

  test('should do something', () => {
    expect(true).toBe(true);
  });
});