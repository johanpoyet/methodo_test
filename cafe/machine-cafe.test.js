// const { MachineCafe, Brewer } = require('./machine-cafe');

// Builder Pattern pour construire les objets de test
class MachineBuilder {
  constructor() {
    this.brewer = new Brewer();
    this.isDefective = false;
  }

  withDefectiveState(defective = true) {
    this.isDefective = defective;
    return this;
  }

  withBrewer(brewer) {
    this.brewer = brewer;
    return this;
  }

  build() {
    return new MachineCafe(this.brewer, this.isDefective);
  }
}

class BrewerBuilder {
  constructor() {
    this.ordersReceived = 0;
  }

  withOrders(count) {
    const brewer = new Brewer();
    for (let i = 0; i < count; i++) {
      brewer.receiveCoffeeOrder();
    }
    return brewer;
  }

  build() {
    return new Brewer();
  }
}

// Matcher Pattern pour les assertions personnalisées
class MachineMatchers {
  static expectBrewer(brewer) {
    return {
      toHaveReceivedOrders(expectedCount) {
        expect(brewer.getOrdersCount()).toBe(expectedCount);
      },
      toHaveNoOrders() {
        expect(brewer.getOrdersCount()).toBe(0);
      }
    };
  }

  static expectMachine(machine) {
    return {
      toHaveReturnedMoney(expectedAmount) {
        expect(machine.getReturnedMoney()).toBe(expectedAmount);
      },
      toHaveReturnedNoMoney() {
        expect(machine.getReturnedMoney()).toBe(0);
      }
    };
  }
}

// Test Data Builder
class CoinTestData {
  static validCoins() {
    return [50, 100, 200];
  }

  static invalidCoins() {
    return [1, 2, 5, 10, 20];
  }

  static coinWithName(amount) {
    const coinNames = {
      1: '1ct', 2: '2cts', 5: '5cts', 10: '10cts', 20: '20cts',
      50: '50cts', 100: '1€', 200: '2€'
    };
    return { amount, name: coinNames[amount] };
  }
}

describe('Machine à café avec Builders et Matchers', () => {
  let machineBuilder;
  let brewerBuilder;

  beforeEach(() => {
    machineBuilder = new MachineBuilder();
    brewerBuilder = new BrewerBuilder();
  });

  describe('ETANT DONNE une machine a café QUAND on insère une pièce de 50cts ou plus', () => {
    test.each(CoinTestData.validCoins().map(CoinTestData.coinWithName))(
      'ALORS le Brewer reçoit l\'ordre de faire un café - CAS $name',
      ({ amount }) => {
        // Given
        const machine = machineBuilder.build();
        
        // When
        machine.insertCoin(amount);
        
        // Then
        MachineMatchers.expectBrewer(machine.brewer).toHaveReceivedOrders(1);
      }
    );
  });

  describe('ETANT DONNE une machine a café QUAND on insère une pièce de moins de 50cts', () => {
    test.each(CoinTestData.invalidCoins().map(CoinTestData.coinWithName))(
      'ALORS le Brewer ne reçoit pas d\'ordre ET l\'argent est restitué - CAS $name',
      ({ amount }) => {
        // Given
        const machine = machineBuilder.build();
        
        // When
        machine.insertCoin(amount);
        
        // Then
        MachineMatchers.expectBrewer(machine.brewer).toHaveNoOrders();
        MachineMatchers.expectMachine(machine).toHaveReturnedMoney(amount);
      }
    );
  });

  describe('ETANT DONNE une machine a café défaillante', () => {
    test('QUAND on insère une pièce de 50cts ALORS l\'argent est restitué', () => {
      // Given
      const machine = machineBuilder
        .withDefectiveState(true)
        .build();
      
      // When
      machine.insertCoin(50);
      
      // Then
      MachineMatchers.expectBrewer(machine.brewer).toHaveNoOrders();
      MachineMatchers.expectMachine(machine).toHaveReturnedMoney(50);
    });
  });

  describe('ETANT DONNE une machine a café', () => {
    test('ALORS le Brewer ne reçoit pas d\'ordre (état initial)', () => {
      // Given
      const machine = machineBuilder.build();
      
      // Then
      MachineMatchers.expectBrewer(machine.brewer).toHaveNoOrders();
    });
  });

  describe('ETANT DONNE une machine a café QUAND on insère une pièce de 50cts deux fois', () => {
    test('ALORS le Brewer reçoit deux fois l\'ordre de faire un café', () => {
      // Given
      const machine = machineBuilder.build();
      
      // When
      machine.insertCoin(50);
      machine.insertCoin(50);
      
      // Then
      MachineMatchers.expectBrewer(machine.brewer).toHaveReceivedOrders(2);
    });
  });

  // Tests additionnels avec builders plus complexes
  describe('Scénarios complexes avec builders', () => {
    test('Machine avec brewer pré-configuré', () => {
      // Given
      const preConfiguredBrewer = brewerBuilder.withOrders(3);
      const machine = machineBuilder
        .withBrewer(preConfiguredBrewer)
        .build();
      
      // When
      machine.insertCoin(100);
      
      // Then
      MachineMatchers.expectBrewer(machine.brewer).toHaveReceivedOrders(4);
    });

    test('Test de multiple insertions avec différentes pièces', () => {
      // Given
      const machine = machineBuilder.build();
      
      // When
      machine.insertCoin(10); // restitué
      machine.insertCoin(50); // commande
      machine.insertCoin(5);  // restitué
      machine.insertCoin(100); // commande
      
      // Then
      MachineMatchers.expectBrewer(machine.brewer).toHaveReceivedOrders(2);
      MachineMatchers.expectMachine(machine).toHaveReturnedMoney(15);
    });
  });
});
