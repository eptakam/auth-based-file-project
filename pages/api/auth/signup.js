// Ici nous allons creer un nouvel utilisateur (user) avec les donnees issues du formulaire d'authentification.
// nous installerons aussi mongodb (npm install mongodb) pour stocker les donnees des utilisateurs. mongodb est une base de donnees NoSQL open source qui stocke les donnees sous forme de documents JSON.

import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

export default async function handler(req, res) {
  console.log("Request received:", req.method);

  // verifier si la methode est POST
  if (req.method !== "POST") {
    return;
  }

  // extraire les donnees du formulaire
  const data = req.body;
  const { email, password } = data;

  // valider les donnees
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  // se connecter a la base de donnees
  let client;
  try {
    client = await connectToDatabase();
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  const db = client.db();

  // verifier si l'utilisateur existe deja
  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    client.close();
    return;
  }

  // il n'est pas securitaire de sauvegarder les mots de passe en clair dans la base de donnees sans les encrypter. pour les encrypter, nous utiliserons le package bcryptjs (npm install bcryptjs)
  let hashedPassword;
  try {
    hashedPassword = await hashPassword(password);
    console.log("Password hashed");
  } catch (error) {
    console.error("Hashing the password failed:", error);
    res.status(500).json({ message: "Hashing the password failed!" });
    return;
  }

  // creer une nouvelle collection (table) pour les utilisateurs
  try {
    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });
    console.log("User created:", result);
    res.status(201).json({ message: "Created user!" });
    client.close();
  } catch (error) {
    console.error("Creating the user failed:", error);
    res.status(500).json({ message: "Creating the user failed!" });
  } finally {
    client.close();
  }
}
