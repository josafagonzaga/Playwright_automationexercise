import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Produtos', () => {
  test('deve validar a lista de produtos e a pagina de detalhe do produto', async ({ page }) => {
    await bloquearAnuncios(page);

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await acessarPaginaInicial(page);

    // 4. Clicar no botão "Products"
    await page.getByRole('link', { name: 'Products' }).click();

    // 5. Validar que o usuário foi navegado para a página ALL PRODUCTS
    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();

    // 6. Validar que a lista de produtos está visível
    await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible();

    // 7. Clicar em "View Product" do primeiro produto
    await page.locator('a[href="/product_details/1"]').click();

    // 8. Validar que o usuário chegou na página de detalhe do produto
    await expect(page).toHaveURL(/\/product_details\/1$/);

    // 9. Validar detalhes do produto: nome, categoria, preço, disponibilidade, condição e marca
    const informacoesProduto = page.locator('.product-information');

    await expect(informacoesProduto.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
    await expect(informacoesProduto.getByText(/Category:/)).toBeVisible();
    await expect(informacoesProduto.getByText(/Rs\. 500/)).toBeVisible();
    await expect(informacoesProduto.getByText(/Availability:/)).toBeVisible();
    await expect(informacoesProduto.getByText(/Condition:/)).toBeVisible();
    await expect(informacoesProduto.getByText(/Brand:/)).toBeVisible();
  });
});
