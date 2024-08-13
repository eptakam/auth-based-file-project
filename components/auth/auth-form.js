/*
    nous avons installer next-auth (npm install next-auth) pour gérer l'authentification. next-auth est une bibliothèque open source qui fournit une solution d'authentification simple et facile à utiliser pour les applications Next.js. Il prend en charge plusieurs fournisseurs d'authentification, tels que Google, Facebook, GitHub, etc.

    il possede a la fois des capacites cote client et cote serveur. Il gere les sessions utilisateur, les jetons d'acces (tokens) et de rafraichissement, les redirections, etc.
*/

import { useState, useRef } from "react";
// import { signIn } from 'next-auth/client';  // ne marche pas
import { signIn } from "next-auth/react";

import classes from "./auth-form.module.css";

async function createUser(email, password) {
  try {
    // send a request to API route
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    return data;
  } catch (error) {
    console.error("Error during user creation:");
    throw error;
  }
}

export default function AuthForm() {
  // creer les references des donnees du formulaire
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState); // recevoir l'etat precedent et retourner l'inverse de cet etat
  }

  async function submitHandler(event) {
    event.preventDefault();

    // recuperer les donnees du formulaire
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // valider les donnees (optionnel)

    if (isLogin) {
      // log user in
      // appeler la fonctione signIn de next-auth pour envoyer une requete de connexion a la route /api/auth/signin
      // le premier arg de cette fct est le type de connexion (credentials) et le deuxieme arg est un objet qui contient les donnees du formulaire (configuration de connexion)
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        // set some auth state
      }
    } else {
      // create new user
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        setError(error.message);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}
