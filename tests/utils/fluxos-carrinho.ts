import { expect, type Page } from '@playwright/test';

export async function abrirProdutos(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'Products' }).click();
  await expect(page).toHaveURL(/\/products$/);
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
}

export async function adicionarProdutoAoCarrinho(
  page: Page,
  produtoId: number
): Promise<void> {
  const produto = page.locator('.product-image-wrapper').filter({
    has: page.locator(`a[data-product-id="${produtoId}"]`),
  });

  await produto.first().hover();
  await produto
    .first()
    .locator('.product-overlay a.add-to-cart')
    .click();
  await expect(page.locator('#cartModal')).toBeVisible();
}

export async function continuarComprando(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await expect(page.locator('#cartModal')).toBeHidden();
}

export async function verCarrinhoPeloModal(page: Page): Promise<void> {
  await page.locator('#cartModal').getByRole('link', { name: 'View Cart' }).click();
  await validarPaginaCarrinho(page);
}

export async function abrirCarrinho(page: Page): Promise<void> {
  await page.locator('header a[href="/view_cart"]').click();
  await validarPaginaCarrinho(page);
}

export async function validarPaginaCarrinho(page: Page): Promise<void> {
  await expect(page).toHaveURL(/\/view_cart$/);
  await expect(page.locator('#cart_info')).toBeVisible();
}

export async function adicionarPrimeiroProdutoAoCarrinho(page: Page): Promise<void> {
  await adicionarProdutoAoCarrinho(page, 1);
  await continuarComprando(page);
}

export async function adicionarDoisProdutosAoCarrinho(page: Page): Promise<void> {
  await adicionarProdutoAoCarrinho(page, 1);
  await continuarComprando(page);
  await adicionarProdutoAoCarrinho(page, 2);
}

export function linhaProduto(page: Page, produtoId: number) {
  return page.locator(`#product-${produtoId}`);
}
