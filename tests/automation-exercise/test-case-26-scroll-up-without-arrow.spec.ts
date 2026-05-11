import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Scroll sem Botao de Seta', () => {
  test('deve rolar para baixo e voltar ao topo sem usar a seta', async ({ page }) => {
    await bloquearAnuncios(page);

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await acessarPaginaInicial(page);

    // 4. Rolar a página até o final
    await page.locator('footer').scrollIntoViewIfNeeded();

    // 5. Validar que "SUBSCRIPTION" está visível
    await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();

    // 6. Rolar a página para o topo sem usar o botão de seta
    await page.evaluate(() => window.scrollTo(0, 0));

    // 7. Validar que a página voltou ao topo e o texto principal está visível
    await expect(
      page.getByRole('heading', {
        name: 'Full-Fledged practice website for Automation Engineers',
      })
    ).toBeInViewport();
  });
});
