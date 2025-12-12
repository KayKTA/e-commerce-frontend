# Alten Shop — Frontend

Frontend de test technique (application e-commerce).

Stack utilisée : **React**, **TypeScript**, **MUI (Material UI)**.

---

## Prérequis

* Node.js **18+**
* npm ou yarn
* Le backend doit être lancé (voir dépôt backend)

---

## Installation

```bash
npm install
```

---

## Configuration

Créer un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:3001
```

> `VITE_API_URL` doit pointer vers l’API backend.

---

## Lancer le projet en développement

```bash
npm run dev
```

L’application est accessible sur l’URL affichée dans le terminal (généralement `http://localhost:5173`).

---

## Fonctionnalités implémentées

### Shop

* Affichage de la liste des produits avec les informations principales
* Recherche de produits
* Pagination
* Ajout d’un produit au panier depuis la liste
* Suppression et ajustement des quantités depuis le panier
* Badge indiquant le nombre de produits dans le panier

### Wishlist

* Ajout / suppression de produits dans une wishlist
* Badge indiquant le nombre de produits dans la wishlist

### Contact

* Point de menu "Contact"
* Page Contact avec formulaire
* Champs requis : email et message
* Message limité à 300 caractères
* Message de confirmation après envoi

---

## Authentification

L’API est protégée par un token JWT.

Le frontend inclut une page de login minimale permettant :

* de se connecter via l’endpoint `/token`
* de stocker le token
* d’appeler les routes protégées du backend

> Les comptes de test peuvent être créés via l’endpoint `/account` du backend.

---

## Scripts disponibles

```bash
npm run dev     # Lancement en développement
npm run build   # Build de production
npm run preview # Aperçu du build
```
