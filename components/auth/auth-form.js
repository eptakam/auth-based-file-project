/*
    nous avons installer next-auth (npm install next-auth) pour gérer l'authentification. next-auth est une bibliothèque open source qui fournit une solution d'authentification simple et facile à utiliser pour les applications Next.js. Il prend en charge plusieurs fournisseurs d'authentification, tels que Google, Facebook, GitHub, etc.

    il possede a la fois des capacites cote client et cote serveur. Il gere les sessions utilisateur, les jetons d'acces (tokens) et de rafraichissement, les redirections, etc.
*/


import { useState } from 'react';
import classes from './auth-form.module.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
