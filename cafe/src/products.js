class Products {
  constructor() {
    this.products = {
      espresso: { price: 150, ingredients: { coffee: 1 }, sugarLevel: 0 },
      latte: { price: 200, ingredients: { coffee: 1, milk: 1 }, sugarLevel: 0 },
      cappuccino: { price: 220, ingredients: { coffee: 1, milk: 2 }, sugarLevel: 0 },
      chocolate: { price: 250, ingredients: { chocolate: 1, milk: 1 }, sugarLevel: 0 },
    };
  }

  getPrice(productType) {
    if (this.products[productType]) {
      return this.products[productType].price;
    }
    throw new Error('Product not found');
  }

  getIngredients(productType) {
    if (this.products[productType]) {
      return this.products[productType].ingredients;
    }
    throw new Error('Product not found');
  }

  validateSugarLevel(sugarLevel) {
    if (sugarLevel < 0 || sugarLevel > 5) {
      throw new Error('Sugar level must be between 0 and 5');
    }
    return true;
  }
}

module.exports = Products;