// dotenv (npm install dotenv) nous permet de charger nos variables d'environnement

import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';  // importation de MongoClient pour se connecter a la base de donnees MongoDB

dotenv.config(); // charger les variables d'environnement

// Methode #1: creer une variable globale pour stocker la connexion a la base de donnees

export async function connectToDatabase() {
    // creer une instance de MongoClient et se connecter a la base de donnees
   const client = await MongoClient.connect(process.env.MONGODB_URI, {
      // optionnelles mais utiles pour eviter les avertissements de depreciation
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  return client;
}

// Methode #2: une utiliser un singleton pour stocker la connexion a la base de donnees
//             elle necessite un Ctrl+s chaque fois dans le projet car la connexion a la BD est perdue apres chaque action

// let client;
// let clientPromise;

// if (!clientPromise) {
//   client = new MongoClient(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   clientPromise = client.connect();
// }

// export async function connectToDatabase() {
//   if (!client.isConnected && !clientPromise.isResolved) {
//     await clientPromise;
//   }
//   return client;
// }