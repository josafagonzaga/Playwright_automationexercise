import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { cadastrarUsuarioPelaTelaLogin } from '../utils/cadastrar-usuario';
import { deletarUsuario } from '../utils/deletar-usuario';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';
import {
  adicionarPrimeiroProdutoAoCarrinho,
  abrirCarrinho,
  abrirProdutos,
} from '../utils/fluxos-carrinho';
import {
  finalizarPedido,
  irParaCheckout,
  irParaLoginPeloCheckout,
  validarEnderecosCheckout,
} from '../utils/fluxos-pedido';

test.describe('Automation Exercise - Pedido com Cadastro no Checkout', () => {
  test('deve registrar usuario durante checkout e finalizar pedido', async ({ page }) => {
    test.setTimeout(60000);
    const usuario = gerarUsuarioTeste();
    await bloquearAnuncios(page);

    await acessarPaginaInicial(page);
    await abrirProdutos(page);
    await adicionarPrimeiroProdutoAoCarrinho(page);
    await abrirCarrinho(page);
    await irParaLoginPeloCheckout(page);

    await cadastrarUsuarioPelaTelaLogin(page, usuario);
    await abrirCarrinho(page);
    await irParaCheckout(page);
    await validarEnderecosCheckout(page, usuario);
    await finalizarPedido(page);

    await expect(page.getByText('Order Placed!')).toBeVisible();
    await deletarUsuario(page);
  });
});
