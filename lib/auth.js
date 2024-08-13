// Ici nous aurons toutes les methodes pour gerer l'authentification.

import { hash, compare } from "bcryptjs";

// fonction pour crypter le mot de passe
export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);  // 12: longueur du mot de passe crypté
  return hashedPassword;
}

/*
    la methode 'compare' de bcryptjs compare le mot de passe en clair (celui entre par l'utilisateur) avec le mot de passe crypté (celui stocke dans la base de donnees). elle retourne un booleen qui indique si les deux mots de passe correspondent ou non.
*/
export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
