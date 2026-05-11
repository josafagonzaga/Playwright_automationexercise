import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Produtos Recomendados', () => {
  test('deve adicionar item recomendado ao carrinho', async ({ page }) => {
    await bloquearAnuncios(page);

    await acessarPaginaInicial(page);
    await page.locator('.recommended_items').scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: 'Recommended Items' })).toBeVisible();

    const produtoRecomendado = page.locator('.recommended_items .item.active .product-image-wrapper').first();
    const nomeProduto = await produtoRecomendado.locator('p').innerText();

    await produtoRecomendado.locator('a.add-to-cart').click();
    await page.locator('#cartModal').getByRole('link', { name: 'View Cart' }).click();

    await expect(page.locator('#cart_info')).toContainText(nomeProduto);
  });
});
