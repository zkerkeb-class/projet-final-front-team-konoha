# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Choix du système d'authentification
La bibliothèque jsonwebtoken est utilisée afin de gérer l'authentification via des JWT (JSON Web Tokens). Le serveur ne stocke ni session ni information sensible liée aux utilisateurs. Lors de la connexion ou de l’inscription, un token est généré et envoyé au client. Ce token contient des informations nécessaires pour la navigation, dont l'identifiant et le rôle de l'utilisateur.

L'application utilise une architecture frontend/backend, ce qui rend l'utilisation des JWT bien adaptée. Les JWT permettent une authentification stateless (sans stockage côté serveur), ce qui améliore la gestion des permissions et la scalabilité. Le token contribue notamment à renforcer la sécurité des routes protégées. Un middleware se charge de vérifier la validité du token pour contrôler l'accès. Ayant une durée de vie d'une heure, le token expire et l'utilisateur est automatiquement déconnecté, réduisant ainsi les risques de compromission.

Pour renforcer la sécurité du site, les mots de passe sont hashés avec bcrypt.

## Video demo
Lien vers la vidéo YouTube : "https://youtu.be/AyzRN4_3SgA"
