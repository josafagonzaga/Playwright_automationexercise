import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Inscricao na Home', () => {
  test('deve validar subscription na pagina inicial', async ({ page }) => {
    const usuario = gerarUsuarioTeste();
    await bloquearAnuncios(page);

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await acessarPaginaInicial(page);

    // 4. Rolar até o rodapé
    await page.locator('footer').scrollIntoViewIfNeeded();

    // 5. Validar o texto "SUBSCRIPTION"
    await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();

    // 6. Informar email e clicar no botão de seta
    await page.locator('#susbscribe_email').fill(usuario.email);
    await page.locator('#subscribe').click();

    // 7. Validar a mensagem de sucesso
    await expect(
      page.getByText('You have been successfully subscribed!')
    ).toBeVisible();
  });
});
