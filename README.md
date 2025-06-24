## Installation

1. Clonez le repository :
```bash
git clone https://github.com/johanpoyet/methodo_test.git
cd methodo_test/cafe
```

2. Installez les dépendances :
```bash
npm install
```

## Utilisation

### Lancer les tests
```bash
npm test
```

### Exemple d'utilisation de la classe MachineACafe
```javascript
const MachineACafe = require('./machine-cafe');

const machine = new MachineACafe();
machine.ajouterEau(1000);
machine.ajouterGrains(500);

const cafe = machine.preparerCafe('expresso');
console.log(cafe); // "Voici votre expresso !"
```

## Fonctionnalités Testées

- ✅ Préparation des différents types de café
- ✅ Gestion des niveaux d'eau et de grains
- ✅ Gestion des erreurs (manque d'eau, grains insuffisants)
- ✅ Système de nettoyage automatique
- ✅ Validation des types de café supportés

## Technologies Utilisées

- **Node.js** - Runtime JavaScript
- **Jest** - Framework de test
- **JavaScript ES6+** - Langage de programmation

## Auteur

Johan Poyet