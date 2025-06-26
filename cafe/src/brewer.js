class Brewer {
  constructor() {
    this.ordersReceived = 0;
  }

  receiveCoffeeOrder() {
    this.ordersReceived++;
  }

  getOrdersCount() {
    return this.ordersReceived;
  }

  reset() {
    this.ordersReceived = 0;
  }
}

module.exports = Brewer;