import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';
import { abrirProdutos } from '../utils/fluxos-carrinho';

test.describe('Automation Exercise - Marcas de Produtos', () => {
  test('deve visualizar produtos por marca', async ({ page }) => {
    await bloquearAnuncios(page);

    await acessarPaginaInicial(page);
    await abrirProdutos(page);
    await expect(page.getByRole('heading', { name: 'Brands' })).toBeVisible();

    await page.getByRole('link', { name: /Polo/ }).click();
    await expect(page).toHaveURL(/\/brand_products\/Polo$/);
    await expect(page.getByRole('heading', { name: 'Brand - Polo Products' })).toBeVisible();
    await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible();

    await page.getByRole('link', { name: /H&M/ }).click();
    await expect(page).toHaveURL(/\/brand_products\/H&M$/);
    await expect(page.getByRole('heading', { name: 'Brand - H&M Products' })).toBeVisible();
    await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible();
  });
});
