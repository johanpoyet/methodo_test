// class Brewer {
//   constructor() {
//     this.ordersReceived = 0;
//   }

//   receiveCoffeeOrder() {
//     this.ordersReceived++;
//   }

//   getOrdersCount() {
//     return this.ordersReceived;
//   }

//   reset() {
//     this.ordersReceived = 0;
//   }
// }

// class MachineCafe {
//   constructor(brewer, isDefective = false) {
//     this.brewer = brewer;
//     this.isDefective = isDefective;
//     this.returnedMoney = 0;
//   }

//   insertCoin(amount) {
//     if (this.isDefective) {
//       this.returnedMoney += amount;
//       return;
//     }

//     if (amount >= 50) {
//       this.brewer.receiveCoffeeOrder();
//     } else {
//       this.returnedMoney += amount;
//     }
//   }

//   getReturnedMoney() {
//     return this.returnedMoney;
//   }

//   reset() {
//     this.returnedMoney = 0;
//     this.brewer.reset();
//   }
// }

// module.exports = { MachineCafe, Brewer };