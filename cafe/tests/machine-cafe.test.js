const MachineCafe = require('../src/machine-cafe');
const Brewer = require('../src/brewer');
const Stock = require('../src/stock');
const Products = require('../src/products');

describe('MachineCafe', () => {
  let brewer;
  let machine;
  let stock;

  beforeEach(() => {
    brewer = new Brewer();
    stock = new Stock();
    machine = new MachineCafe(brewer, stock);
    stock.addIngredient('coffee', 5);
    stock.addIngredient('milk', 5);
    stock.addIngredient('chocolate', 2);
    stock.addIngredient('sugar', 10);
  });

  describe('Commande boisson', () => {
    test('prépare un latte si tous les ingrédients sont disponibles', () => {
      machine.insertCoin(200);
      const res = machine.selectProduct('latte', 2);
      expect(res).toBe('Voici votre latte avec 2 sucre(s) !');
      expect(stock.ingredients.coffee).toBe(4);
      expect(stock.ingredients.milk).toBe(4);
      expect(stock.ingredients.sugar).toBe(8);
      expect(brewer.getOrdersCount()).toBe(1);
      expect(machine.getReturnedMoney()).toBe(0);
    });

    test('rend la monnaie si trop inséré', () => {
      machine.insertCoin(250);
      machine.selectProduct('latte', 1);
      expect(machine.getReturnedMoney()).toBe(50);
    });

    test('retourne une erreur et rend la monnaie si stock insuffisant', () => {
      stock.ingredients.milk = 0;
      machine.insertCoin(200);
      expect(() => machine.selectProduct('latte', 1)).toThrow('Produit indisponible');
      expect(machine.getReturnedMoney()).toBe(200);
      expect(brewer.getOrdersCount()).toBe(0);
    });

    test('retourne une erreur si fonds insuffisants', () => {
      machine.insertCoin(100);
      expect(() => machine.selectProduct('latte', 1)).toThrow('Fonds insuffisants');
      expect(machine.getReturnedMoney()).toBe(0);
      expect(brewer.getOrdersCount()).toBe(0);
    });

    test('retourne une erreur si dose de sucre invalide', () => {
      machine.insertCoin(200);
      expect(() => machine.selectProduct('latte', 6)).toThrow('Sugar level must be between 0 and 5');
      expect(machine.getReturnedMoney()).toBe(0);
      expect(brewer.getOrdersCount()).toBe(0);
    });

    test('retourne une erreur si produit inconnu', () => {
      machine.insertCoin(200);
      expect(() => machine.selectProduct('unknown', 1)).toThrow('Produit inconnu');
      expect(machine.getReturnedMoney()).toBe(200);
      expect(brewer.getOrdersCount()).toBe(0);
    });
  });
});