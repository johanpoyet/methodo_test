class Products {
  constructor() {
    this.products = {
      espresso: { price: 150, sugarLevel: 0 },
      latte: { price: 200, sugarLevel: 0 },
      chocolate: { price: 250, sugarLevel: 0 },
    };
  }

  getPrice(productType) {
    if (this.products[productType]) {
      return this.products[productType].price;
    }
    throw new Error('Product not found');
  }

  validateSugarLevel(sugarLevel) {
    if (sugarLevel < 0 || sugarLevel > 5) {
      throw new Error('Sugar level must be between 0 and 5');
    }
    return true;
  }

  setSugarLevel(productType, sugarLevel) {
    this.validateSugarLevel(sugarLevel);
    if (this.products[productType]) {
      this.products[productType].sugarLevel = sugarLevel;
    } else {
      throw new Error('Product not found');
    }
  }

  getSugarLevel(productType) {
    if (this.products[productType]) {
      return this.products[productType].sugarLevel;
    }
    throw new Error('Product not found');
  }
}

module.exports = Products;