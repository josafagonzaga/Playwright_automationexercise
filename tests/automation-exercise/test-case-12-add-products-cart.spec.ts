import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';
import {
  adicionarDoisProdutosAoCarrinho,
  abrirProdutos,
  linhaProduto,
  verCarrinhoPeloModal,
} from '../utils/fluxos-carrinho';

test.describe('Automation Exercise - Produtos no Carrinho', () => {
  test('deve adicionar dois produtos ao carrinho e validar valores', async ({ page }) => {
    await bloquearAnuncios(page);

    await acessarPaginaInicial(page);
    await abrirProdutos(page);
    await adicionarDoisProdutosAoCarrinho(page);
    await verCarrinhoPeloModal(page);

    await expect(linhaProduto(page, 1)).toContainText('Blue Top');
    await expect(linhaProduto(page, 1).locator('.cart_price')).toHaveText('Rs. 500');
    await expect(linhaProduto(page, 1).locator('.cart_quantity')).toHaveText('1');
    await expect(linhaProduto(page, 1).locator('.cart_total')).toHaveText('Rs. 500');

    await expect(linhaProduto(page, 2)).toContainText('Men Tshirt');
    await expect(linhaProduto(page, 2).locator('.cart_price')).toHaveText('Rs. 400');
    await expect(linhaProduto(page, 2).locator('.cart_quantity')).toHaveText('1');
    await expect(linhaProduto(page, 2).locator('.cart_total')).toHaveText('Rs. 400');
  });
});
