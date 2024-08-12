// Ici nous aurons toutes les methodes pour gerer l'authentification.

import { hash } from "bcryptjs";

// fonction pour crypter le mot de passe
export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);  // 12: longueur du mot de passe crypté
  return hashedPassword;
}
