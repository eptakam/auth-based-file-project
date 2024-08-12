// Ici nous allons creer un nouvel utilisateur (user) avec les donnees issues du formulaire d'authentification. 
// nous installerons aussi mongodb (npm install mongodb) pour stocker les donnees des utilisateurs. mongodb est une base de donnees NoSQL open source qui stocke les donnees sous forme de documents JSON.

import { connectToDatabase } from '../../../lib/db';


export default async function handler(req, res){
  // extraire les donnees du formulaire
  const { email, password } = req.body;

  // valider les donnees
  if (!email || !email.includes('@') || !password || password.trim().length < 7) {
    res.status(422).json({ message: 'Invalid input - password should also be at least 7 characters long.' });
    return;
  }

  // se connecter a la base de donnees
  const client = await connectToDatabase();
  const db = client.db();

  // il n'est pas securitaire de sauvegarder les mots de passe en clair dans la base de donnees sans les encrypter. pour les encrypter, nous utiliserons le package bcryptjs (npm install bcryptjs)
  const hashedPassword = await hashPassword(password);

  // creer une nouvelle collection (table) pour les utilisateurs
  const result = await db.collection('users').insertOne({
    email,
    password: hashedPassword,
  });
  
  res.status(201).json({ message: 'Created user!' });
}