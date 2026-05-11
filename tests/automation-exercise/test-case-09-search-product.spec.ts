import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';

test.describe('Automation Exercise - Busca de Produto', () => {
  test('deve buscar produto e exibir resultados relacionados', async ({ page }) => {
    const nomeProduto = 'top';
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

    // 6. Informar o nome do produto no campo de busca e clicar no botão de pesquisa
    await page.locator('#search_product').fill(nomeProduto);
    await page.locator('#submit_search').click();

    // 7. Validar que "SEARCHED PRODUCTS" está visível
    await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();

    // 8. Validar que os produtos relacionados à busca estão visíveis
    const produtosEncontrados = page.locator('.features_items .product-image-wrapper');

    await expect(produtosEncontrados.first()).toBeVisible();
    await expect(produtosEncontrados.filter({ hasText: /top/i }).first()).toBeVisible();
  });
});
