![Groupomania Icon](/assets/groupomania-red-icon.png)

## Créez un réseau social d’entreprise - Groupomania

### P7 - OpenClassrooms "Développeur Web"

#### Objectifs

- Création d'une API REST avec le framework Express sous Node.js
- Création d'une base de données relationnelle SQL sous MySQL
- Opérations de l'API sur la base de données grâce à la librairie [mysql](https://www.npmjs.com/package/mysql)
- Respect des opérations CRUD
- Mot de passe hashé avec Bcrypt
- Models de données pour formatter et valider les données entrantes
- Architecture des dossiers et fichiers respectée
- Mise en place de middlewares afin
  - d'authentifier les utilisateurs
  - formatter les images enregistrées sur le serveur
- Architecture des dossiers et fichiers respectée (middlewares, controllers, models, routes)
- Standards OWASP appliqués

---

### Prerequisites
  
- You will need to have Node and `npm` installed locally on your machine.
- You will need to have a MySQL database environment like Wamp to connect the app.
  - Create a database named `groupomania`
  - Import data into the database using the file [groupomania.sql](../database/groupomania.sql)
  - Don't forget to rename the [.env.dist](../back/.env.dist) file to `.env` and check the connection information inside
 
| Node Version | Supported          |
| ------------ | ------------------ |
| 15.x & >     | :x:                |
| 14.x         | :white_check_mark: |
| 13.x         | :white_check_mark: |
| 12.x         | :white_check_mark: |

---

### Accounts / Login

| Email                      | Password         | Is Admin |
| -------------------------- | ---------------- | -------- |
| alain.terieur@fakemail.com | Alainterieur1993 | Yes      |
| alex.terieur@fakemail.com  | Alexterieur1985  | No       |

---

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm start
```
