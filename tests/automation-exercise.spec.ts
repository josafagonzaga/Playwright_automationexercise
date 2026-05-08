import { test, expect } from '@playwright/test';
import { text } from 'node:stream/consumers';

test.describe('Automation Exercise - Cadastro de Usuário', () => {
  test('deve preencher nome e email no início do cadastro', async ({ page }) => {
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
    await page.getByPlaceholder('Name').fill('Usuario Teste Playwright');

    await page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(`usuario.teste.${Date.now()}@email.com`);

    // 7. Clicar no botão "Signup"
    await page.getByRole('button', { name: 'Signup' }).click()

    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.getByText('Enter Account Information')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible()

    //9. Preencher os detalhes: título, nome, email, senha e data de nascimento
    await page.getByRole('radio', { name: 'Mr.' }).check()
    //await page.getByRole('radio', {name: 'Mrs.'}).check()

    await page.getByLabel('Password').fill('SenhaTeste@123');

    await page.getByTestId('days').selectOption('28');
    await page.getByTestId('months').selectOption('5');
    await page.getByTestId('years').selectOption('1979');
    




  });
});