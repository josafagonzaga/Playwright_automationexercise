import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';
import {
  adicionarPrimeiroProdutoAoCarrinho,
  abrirCarrinho,
  abrirProdutos,
  linhaProduto,
} from '../utils/fluxos-carrinho';

test.describe('Automation Exercise - Remover Produtos do Carrinho', () => {
  test('deve remover produto do carrinho', async ({ page }) => {
    await bloquearAnuncios(page);

    await acessarPaginaInicial(page);
    await abrirProdutos(page);
    await adicionarPrimeiroProdutoAoCarrinho(page);
    await abrirCarrinho(page);

    await expect(linhaProduto(page, 1)).toBeVisible();
    await linhaProduto(page, 1).locator('.cart_quantity_delete').click();

    await expect(linhaProduto(page, 1)).toBeHidden();
    await expect(page.getByText('Cart is empty!')).toBeVisible();
  });
});
