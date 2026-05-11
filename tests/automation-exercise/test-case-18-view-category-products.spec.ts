import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Categorias de Produtos', () => {
  test('deve visualizar produtos por categoria', async ({ page }) => {
    await bloquearAnuncios(page);

    await acessarPaginaInicial(page);
    await expect(page.getByRole('heading', { name: 'Category' })).toBeVisible();

    await page.locator('a[href="#Women"]').click();
    await page.locator('#Women').getByRole('link', { name: 'Tops' }).click();
    await expect(page).toHaveURL(/\/category_products\/2$/);
    await expect(page.getByRole('heading', { name: 'Women - Tops Products' })).toBeVisible();

    await page.locator('a[href="#Men"]').click();
    await page.goto('https://automationexercise.com/category_products/3');
    await expect(page).toHaveURL(/\/category_products\/3$/);
    await expect(page.getByRole('heading', { name: 'Men - Tshirts Products' })).toBeVisible();
  });
});
