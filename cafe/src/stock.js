class Stock {
  constructor() {
    this.ingredients = {
      sugar: 0,
      coffee: 0,
      chocolate: 0,
      cacao: 0,
      milk: 0,
      // eau illimitée, donc pas de stock
    };
  }

  addIngredient(ingredient, amount) {
    if (ingredient === 'water') return; // eau illimitée
    if (this.ingredients[ingredient] !== undefined) {
      this.ingredients[ingredient] += amount;
    } else {
      throw new Error(`Ingredient ${ingredient} does not exist in stock.`);
    }
  }

  checkAvailability(ingredient, amount = 1) {
    if (ingredient === 'water') return true; // eau illimitée
    if (this.ingredients[ingredient] !== undefined) {
      return this.ingredients[ingredient] >= amount;
    } else {
      throw new Error(`Ingredient ${ingredient} does not exist in stock.`);
    }
  }

  useIngredient(ingredient, amount) {
    if (ingredient === 'water') return; // eau illimitée
    if (this.ingredients[ingredient] !== undefined) {
      if (this.ingredients[ingredient] >= amount) {
        this.ingredients[ingredient] -= amount;
      } else {
        throw new Error(`Not enough ${ingredient} in stock.`);
      }
    } else {
      throw new Error(`Ingredient ${ingredient} does not exist in stock.`);
    }
  }
}

module.exports = Stock;