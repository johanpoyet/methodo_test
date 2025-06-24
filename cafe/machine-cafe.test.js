const { MachineCafe, Brewer } = require('./machine-cafe');

describe('Machine à café', () => {
  let brewer;
  let machine;

  beforeEach(() => {
    brewer = new Brewer();
    machine = new MachineCafe(brewer);
  });

  describe('ETANT DONNE une machine a café QUAND on insère une pièce de 50cts ou plus', () => {
    test('ALORS le Brewer reçoit l\'ordre de faire un café - CAS 50cts', () => {
      machine.insertCoin(50);
      expect(brewer.getOrdersCount()).toBe(1);
    });

    test('ALORS le Brewer reçoit l\'ordre de faire un café - CAS 1€', () => {
      machine.insertCoin(100);
      expect(brewer.getOrdersCount()).toBe(1);
    });

    test('ALORS le Brewer reçoit l\'ordre de faire un café - CAS 2€', () => {
      machine.insertCoin(200);
      expect(brewer.getOrdersCount()).toBe(1);
    });
  });

  describe('ETANT DONNE une machine a café QUAND on insère une pièce de moins de 50cts', () => {
    test('ALORS le Brewer ne reçoit pas d\'ordre ET l\'argent est restitué - CAS 1ct', () => {
      machine.insertCoin(1);
      expect(brewer.getOrdersCount()).toBe(0);
      expect(machine.getReturnedMoney()).toBe(1);
    });

    test('ALORS le Brewer ne reçoit pas d\'ordre ET l\'argent est restitué - CAS 2cts', () => {
      machine.insertCoin(2);
      expect(brewer.getOrdersCount()).toBe(0);
      expect(machine.getReturnedMoney()).toBe(2);
    });

    test('ALORS le Brewer ne reçoit pas d\'ordre ET l\'argent est restitué - CAS 5cts', () => {
      machine.insertCoin(5);
      expect(brewer.getOrdersCount()).toBe(0);
      expect(machine.getReturnedMoney()).toBe(5);
    });

    test('ALORS le Brewer ne reçoit pas d\'ordre ET l\'argent est restitué - CAS 10cts', () => {
      machine.insertCoin(10);
      expect(brewer.getOrdersCount()).toBe(0);
      expect(machine.getReturnedMoney()).toBe(10);
    });

    test('ALORS le Brewer ne reçoit pas d\'ordre ET l\'argent est restitué - CAS 20cts', () => {
      machine.insertCoin(20);
      expect(brewer.getOrdersCount()).toBe(0);
      expect(machine.getReturnedMoney()).toBe(20);
    });
  });

  describe('ETANT DONNE une machine a café défaillante', () => {
    test('QUAND on insère une pièce de 50cts ALORS l\'argent est restitué', () => {
      const defectiveMachine = new MachineCafe(brewer, true);
      defectiveMachine.insertCoin(50);
      
      expect(brewer.getOrdersCount()).toBe(0);
      expect(defectiveMachine.getReturnedMoney()).toBe(50);
    });
  });

  describe('ETANT DONNE une machine a café', () => {
    test('ALORS le Brewer ne reçoit pas d\'ordre (état initial)', () => {
      expect(brewer.getOrdersCount()).toBe(0);
    });
  });

  describe('ETANT DONNE une machine a café QUAND on insère une pièce de 50cts deux fois', () => {
    test('ALORS le Brewer reçoit deux fois l\'ordre de faire un café', () => {
      machine.insertCoin(50);
      machine.insertCoin(50);
      
      expect(brewer.getOrdersCount()).toBe(2);
    });
  });
});