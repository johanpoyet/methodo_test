const Brewer = require('./brewer');
const Stock = require('./stock');
const Products = require('./products');

class MachineCafe {
  constructor(brewer, stock) {
    this.brewer = brewer;
    this.stock = stock;
    this.returnedMoney = 0;
    this.isDefective = false;
    this.insertedMoney = 0;
    this.selectedProduct = null;
    this.products = new Products();
  }

  insertCoin(amount) {
    if (this.isDefective) {
      this.returnedMoney += amount;
      return;
    }
    this.insertedMoney += amount;
  }

  selectProduct(productType, sugarDose = 0) {
    if (this.isDefective) {
      this.returnedMoney += this.insertedMoney;
      this.insertedMoney = 0;
      throw new Error('Machine défectueuse');
    }

    let price;
    try {
      price = this.products.getPrice(productType);
    } catch (e) {
      this.returnedMoney += this.insertedMoney;
      this.insertedMoney = 0;
      throw new Error('Produit inconnu');
    }

    this.products.validateSugarLevel(sugarDose);

    if (this.insertedMoney < price) {
      throw new Error('Fonds insuffisants');
    }

    const ingredients = this.products.getIngredients(productType);
    try {
      for (const [ingredient, amount] of Object.entries(ingredients)) {
        if (!this.stock.checkAvailability(ingredient, amount)) {
          throw new Error();
        }
      }
      if (sugarDose > 0 && !this.stock.checkAvailability('sugar', sugarDose)) {
        throw new Error();
      }
    } catch {
      this.returnedMoney += this.insertedMoney;
      this.insertedMoney = 0;
      throw new Error('Produit indisponible');
    }

    for (const [ingredient, amount] of Object.entries(ingredients)) {
      this.stock.useIngredient(ingredient, amount);
    }
    if (sugarDose > 0) {
      this.stock.useIngredient('sugar', sugarDose);
    }

    if (this.insertedMoney > price) {
      this.returnedMoney += this.insertedMoney - price;
    }
    this.insertedMoney = 0;

    this.brewer.receiveCoffeeOrder();
    return `Voici votre ${productType} avec ${sugarDose} sucre(s) !`;
  }

  getReturnedMoney() {
    return this.returnedMoney;
  }

  setDefective(defective) {
    this.isDefective = defective;
  }

  reset() {
    this.returnedMoney = 0;
    this.brewer.reset();
    this.insertedMoney = 0;
    this.selectedProduct = null;
  }
}

const brewer = new Brewer();
const stock = new Stock();
const machine = new MachineCafe(brewer, stock);

stock.addIngredient('coffee', 5);
stock.addIngredient('milk', 5);
stock.addIngredient('chocolate', 2);
stock.addIngredient('sugar', 10);

machine.insertCoin(250);
try {
  const result = machine.selectProduct('chocolate', 2);
  console.log(result); // "Voici votre chocolate avec 2 sucre(s) !"
} catch (e) {
  console.log(e.message);
}
console.log('Monnaie rendue :', machine.getReturnedMoney());

module.exports = MachineCafe;