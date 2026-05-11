import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Pagina de Casos de Teste', () => {
  test('deve navegar para a pagina de casos de teste com sucesso', async ({ page }) => {
    await bloquearAnuncios(page);

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await acessarPaginaInicial(page);

    // 4. Clicar no botão "Test Cases"
    await page.locator('header').getByRole('link', { name: 'Test Cases' }).click();

    // 5. Validar que o usuário foi navegado para a página de casos de teste
    await expect(page).toHaveURL(/\/test_cases$/);
    await expect(page.locator('h2.title').getByText('Test Cases')).toBeVisible();
    await expect(page.getByText('Below is the list of test Cases')).toBeVisible();
  });
});
