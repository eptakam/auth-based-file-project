// dotenv (npm install dotenv) nous permet de charger nos variables d'environnement

import { MongoClient } from 'mongodb';  // importation de MongoClient pour se connecter a la base de donnees MongoDB

let client;

export async function connectToDatabase() {
  
  if (!client) {
    // creer une instance de MongoClient 
    client = new MongoClient(process.env.MONGODB_URI, {
      // optionnelles mais utiles pour eviter les avertissements de depreciation
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // se connecter a la base de donnees
    await client.connect();
  }
  return client;
}