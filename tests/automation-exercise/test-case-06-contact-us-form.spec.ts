import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Formulario de Contato', () => {
  test('deve enviar o formulario de contato com sucesso', async ({ page }) => {
    const usuario = gerarUsuarioTeste();
    await bloquearAnuncios(page);

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await acessarPaginaInicial(page);

    // 4. Clicar no botão "Contact Us"
    await page.getByRole('link', { name: 'Contact us' }).click();

    // 5. Validar que "GET IN TOUCH" está visível
    await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();

    // 6. Informar nome, email, assunto e mensagem
    await page.getByTestId('name').fill(usuario.nome);
    await page.getByTestId('email').fill(usuario.email);
    await page.getByTestId('subject').fill('Contato de teste');
    await page.getByTestId('message').fill('Mensagem enviada por teste automatizado.');

    // 7. Fazer upload de arquivo
    await page.locator('input[name="upload_file"]').setInputFiles('README.md');

    await page.waitForFunction(
      "window.jQuery && jQuery._data(document.querySelector('#contact-us-form'), 'events')?.submit?.length"
    );

    // 8. Clicar no botão "Submit"
    // 9. Clicar no botão OK
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await page.getByTestId('submit-button').click();

    // 10. Validar que a mensagem de sucesso está visível
    await expect(
      page.locator('.status.alert-success')
    ).toBeVisible();
    await expect(page.locator('.status.alert-success')).toHaveText(
      'Success! Your details have been submitted successfully.'
    );

    // 11. Clicar no botão "Home" e validar que voltou para a página inicial
    await page.locator('#form-section').getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();
  });
});
