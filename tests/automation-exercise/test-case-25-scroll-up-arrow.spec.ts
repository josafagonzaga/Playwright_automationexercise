import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Scroll com Botao de Seta', () => {
  test('deve rolar para baixo e voltar ao topo usando a seta', async ({ page }) => {
    await bloquearAnuncios(page);

    await acessarPaginaInicial(page);
    await page.locator('footer').scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();

    await page.locator('#scrollUp').click();

    await expect(
      page.getByRole('heading', {
        name: 'Full-Fledged practice website for Automation Engineers',
      })
    ).toBeInViewport();
  });
});
