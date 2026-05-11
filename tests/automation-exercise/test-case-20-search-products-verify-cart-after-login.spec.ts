import { test, expect } from '@playwright/test';
import {
  acessarPaginaInicial,
  abrirTelaLoginCadastro,
  fazerLogin,
} from '../utils/fluxos-autenticacao';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { cadastrarUsuario } from '../utils/cadastrar-usuario';
import { deletarUsuario } from '../utils/deletar-usuario';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';
import { abrirCarrinho, abrirProdutos } from '../utils/fluxos-carrinho';

test.describe('Automation Exercise - Busca e Carrinho Apos Login', () => {
  test('deve manter produto pesquisado no carrinho apos login', async ({ page }) => {
    const usuario = gerarUsuarioTeste();
    await bloquearAnuncios(page);

    await cadastrarUsuario(page, usuario, { fazerLogout: true });

    await acessarPaginaInicial(page);
    await abrirProdutos(page);
    await page.locator('#search_product').fill('top');
    await page.locator('#submit_search').click();
    await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();

    await page.locator('.features_items .product-image-wrapper').first().hover();
    await page.locator('.features_items .product-image-wrapper').first().locator('.product-overlay a.add-to-cart').click();
    await page.locator('#cartModal').getByRole('link', { name: 'View Cart' }).click();
    await expect(page.locator('#cart_info')).toContainText('Top');

    await abrirTelaLoginCadastro(page);
    await fazerLogin(page, usuario.email, usuario.senha);
    await abrirCarrinho(page);
    await expect(page.locator('#cart_info')).toContainText('Top');

    await deletarUsuario(page);
  });
});
