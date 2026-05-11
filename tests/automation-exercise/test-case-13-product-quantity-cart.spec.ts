import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';
import { linhaProduto, verCarrinhoPeloModal } from '../utils/fluxos-carrinho';

test.describe('Automation Exercise - Quantidade no Carrinho', () => {
  test('deve validar quantidade do produto no carrinho', async ({ page }) => {
    await bloquearAnuncios(page);

    await acessarPaginaInicial(page);
    await page.locator('a[href="/product_details/1"]').first().click();

    await expect(page).toHaveURL(/\/product_details\/1$/);
    await expect(page.locator('.product-information')).toContainText('Blue Top');

    await page.locator('#quantity').fill('4');
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await verCarrinhoPeloModal(page);

    await expect(linhaProduto(page, 1)).toContainText('Blue Top');
    await expect(linhaProduto(page, 1).locator('.cart_quantity')).toHaveText('4');
  });
});
