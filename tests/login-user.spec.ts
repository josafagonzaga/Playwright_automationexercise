import { test, expect } from '@playwright/test';
import { gerarUsuarioTeste } from './utils/gerar-usuario-teste';

test.describe('Automation Exercise - Login de Usuario', () => {
  test('deve cadastrar usuario e validar login sem excluir a conta', async ({ page }) => {
    const usuario = gerarUsuarioTeste();

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    await page.goto('https://automationexercise.com/');

    // 3. Validar que a página inicial foi carregada com sucesso
    await expect(page).toHaveTitle(/Automation Exercise/);

    await expect(
      page.getByRole('link', { name: 'Signup / Login' })
    ).toBeVisible();

    // 4. Clicar em "Signup / Login"
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // 5. Validar que "New User Signup!" está visível
    await expect(page.getByText('New User Signup!')).toBeVisible();

    // 6. Informar nome e endereço de email
    await page.getByPlaceholder('Name').fill(usuario.nome);

    await page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(usuario.email);

    // 7. Clicar no botão "Signup"
    await page.getByRole('button', { name: 'Signup' }).click();

    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.getByText('Enter Account Information')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();

    //9. Preencher os detalhes: título, nome, email, senha e data de nascimento
    await page.getByRole('radio', { name: 'Mr.' }).check();
    //await page.getByRole('radio', {name: 'Mrs.'}).check()

    await page.getByLabel('Password').fill(usuario.senha);

    await page.getByTestId('days').selectOption('28');
    await page.getByTestId('months').selectOption('5');
    await page.getByTestId('years').selectOption('1979');

    //10. Marcar o checkbox "Sign up for our newsletter!"
    await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();

    //11. Marcar o checkbox "Receive special offers from our partners!"
    await page.getByRole('checkbox', { name: 'Receive special offers from our partners!' }).check();

    //12. Preencher os dados: primeiro nome, sobrenome, empresa, endereço, complemento, país, estado, cidade, CEP e telefone.
    await page.getByTestId('first_name').fill(usuario.primeiroNome);
    await page.getByTestId('last_name').fill(usuario.sobrenome);
    await page.getByTestId('company').fill(usuario.empresa);
    await page.getByTestId('address').fill(usuario.endereco);
    await page.getByTestId('address2').fill(usuario.complemento);

    await page.getByTestId('country').selectOption(usuario.pais);

    await page.getByTestId('state').fill(usuario.estado);
    await page.getByTestId('city').fill(usuario.cidade);
    await page.getByTestId('zipcode').fill(usuario.cep);
    await page.getByTestId('mobile_number').fill(usuario.telefone);

    //13. Clicar no botão "Create Account"
    await page.getByTestId('create-account').click();

    //14. Validar que "Account Created!" está visível
    await expect(page.getByTestId('account-created')).toBeVisible();

    //15. Clicar no botão "Continue"
    await page.getByTestId('continue-button').click();

    //16. Validar que "Logged in as username" está visível
    await expect(page.getByText(`Logged in as ${usuario.nome}`)).toBeVisible();

    //17. Clicar em "Logout" e validar que voltou para a tela de login/cadastro
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByText('Login to your account')).toBeVisible();
    await expect(page.getByText('New User Signup!')).toBeVisible();


    // Início real do Test Case 2

    // 1. Iniciar navegador
    // O Playwright já inicia o navegador automaticamente.

    // 2. Acessar a URL do site
    await page.goto('https://automationexercise.com/');

    // 3. Validar que a página inicial está visível com sucesso
    await expect(page).toHaveTitle(/Automation Exercise/);

    await expect(
      page.getByRole('link', { name: 'Signup / Login' })
    ).toBeVisible();

    // 4. Clicar em "Signup / Login"
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // 5. Validar que "Login to your account" está visível
    await expect(page.getByText('Login to your account')).toBeVisible();

    // 6. Informar email e senha corretos
    await page
      .locator('form')
      .filter({ hasText: 'Login' })
      .getByPlaceholder('Email Address')
      .fill(usuario.email);

    await page.getByPlaceholder('Password').fill(usuario.senha);

    // 7. Clicar no botão "Login"
    await page
      .locator('form')
      .filter({ hasText: 'Login' })
      .getByRole('button', { name: 'Login' })
      .click();

    // 8. Validar que "Logged in as username" está visível
    await expect(page.getByText(`Logged in as ${usuario.nome}`)).toBeVisible();

    // 9. Clicar em "Delete Account"
    await page.getByRole('link', { name: 'Delete Account' }).click();

    // 10. Validar que "Account Deleted!" está visível
    await expect(page.getByText('Account Deleted!')).toBeVisible();
  });


});
