/*
    ce fichier est généré automatiquement par next-auth pour l'authentification d'un utilisateur. il contient les configurations de base pour l'authentification, telles que les fournisseurs d'authentification, les callbacks, les redirections, etc.

    il a un nom special '...nextauth' en un mot. il est dynamique d'ou le nom dans les parentheses carrees et egalement il c'est un 'dynamic catch all api route' d'ou les ... qui signifie qu'il peut gérer plusieurs routes d'authentification qui commence par /api/auth/...

    toutes les requetes qui seront envoyees a cette route /api/auth seront automatiquement gerees pat next-auth. il n'est pas necessaire de creer des routes pour chaque fournisseur d'authentification.

    pour plus d'informations sur les routes qui peuvent etre implementees dans ce fichier, consulter la documentation officielle de next-auth: https://next-auth.js.org/getting-started/rest-api
*/

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../lib/auth';

// configuration de base pour l'authentification
export default NextAuth({
  // configurer comment la session pour l'authentification d'un utilisateur sera geree
  session: {
    jwt: true // activer la gestion des sessions JWT (JSON Web Token)
  },
  providers: [
    Providers.Credentials({
      // on utilise credentials lorsqu'on veut laisser NextAuth creer notre formulaire d'authentification
      // credentials: {
      //   email: { label: "Email", type: "email" },
      //   password: { label: "Password", type: "password" }
      // },

      // authorize est une methode qui sera appelee par NextAuth chaque fois qu'il y aura une requete entrante de login. lorsqu'on retourne un objet a l'interieur de la methode authorize, NextAuth considere que l'utilisateur est authentifie avec succes.
      async authorize(credentials) {
        // se connecter a la base de donnees
        const client = await connectToDatabase();

        // verifier si l'utilisateur existe
        const usersCollection = client.db().collection('users');
        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        // verifier si le mot de passe est correct
        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in!');
        }

        // fermer la connexion a la base de donnees
        client.close();

        // authentification reussie
        return { email: user.email }; // objet encode en JWT (JSON Web Token) pour l'authentification
      }

    })
  ]
});  