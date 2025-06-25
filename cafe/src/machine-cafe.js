class MachineCafe {
  constructor(brewer, stock) {
    this.brewer = brewer;
    this.stock = stock;
    this.returnedMoney = 0;
    this.isDefective = false;
  }

  insertCoin(amount) {
    if (this.isDefective) {
      this.returnedMoney += amount;
      return;
    }

    if (amount >= 50) {
      this.brewer.receiveCoffeeOrder();
    } else {
      this.returnedMoney += amount;
    }
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
  }

  prepareDrink(productType, sugarDose = 0) {
    const recipes = {
      espresso: { coffee: 1, sugar: sugarDose },
      latte: { coffee: 1, sugar: sugarDose },
      chocolate: { chocolate: 1, sugar: sugarDose },
    };

    const recipe = recipes[productType];
    if (!recipe) throw new Error('Ingrédient non disponible');

    // Vérification du stock pour chaque ingrédient (hors eau)
    for (const [ingredient, amount] of Object.entries(recipe)) {
      if (ingredient === 'sugar' && amount === 0) continue;
      if (!this.stock.checkAvailability(ingredient, amount)) {
        throw new Error('Ingrédient non disponible');
      }
    }

    // Décrémentation du stock
    for (const [ingredient, amount] of Object.entries(recipe)) {
      if (ingredient === 'sugar' && amount === 0) continue;
      this.stock.useIngredient(ingredient, amount);
    }

    this.brewer.receiveCoffeeOrder();
  }
}

module.exports = MachineCafe;