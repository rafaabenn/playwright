import { test, expect } from '@playwright/test';
/*
test pour definir un test 
test('nom du test', async (...) => {...})

expect pour verifier qu une condition est vraie 
*/
import { LoginPage } from '../pages/LoginPage';

/*{ page } est une fixture : 
Playwright nous donne automatiquement un objet page 
(un onglet de navigateur tout neuf) pour chaque test, 
sans qu'on ait à le créer nous-même.
*/
test('connexion réussie avec standard_user', async ({ page }) => {
   /*
   on cree instance de notre classe LoginPage, 
   en lui donnant la page du test actuel 
   ici s execute le constructor de loginPage 
   */ 
   const loginPage = new LoginPage(page);
    await loginPage.goto(); //aller vers la page
    await loginPage.login('standard_user', 'secret_sauce'); //se connecter avec les id stand

    /*
    l assertion : on verifie que l url contient bien inventory (ce qui prouve que le login a reussi et qu on a ete redirige)
    /inventory/ est une expression reguliere simple qui dit contient ce mot
    */
    await expect(page).toHaveURL(/inventory/);
});


test('connexion refusée avec locked_out_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');

  await expect(loginPage.errorMessage).toContainText('locked out');
});