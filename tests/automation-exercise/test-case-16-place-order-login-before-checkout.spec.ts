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
import {
  adicionarPrimeiroProdutoAoCarrinho,
  abrirCarrinho,
  abrirProdutos,
} from '../utils/fluxos-carrinho';
import { finalizarPedido, irParaCheckout, validarEnderecosCheckout } from '../utils/fluxos-pedido';

test.describe('Automation Exercise - Pedido com Login Antes do Checkout', () => {
  test('deve fazer login antes do checkout e finalizar pedido', async ({ page }) => {
    test.setTimeout(60000);
    const usuario = gerarUsuarioTeste();
    await bloquearAnuncios(page);

    await cadastrarUsuario(page, usuario, { fazerLogout: true });

    await acessarPaginaInicial(page);
    await abrirTelaLoginCadastro(page);
    await fazerLogin(page, usuario.email, usuario.senha);
    await expect(page.getByText(`Logged in as ${usuario.nome}`)).toBeVisible();

    await abrirProdutos(page);
    await adicionarPrimeiroProdutoAoCarrinho(page);
    await abrirCarrinho(page);
    await irParaCheckout(page);
    await validarEnderecosCheckout(page, usuario);
    await finalizarPedido(page);

    await expect(page.getByText('Order Placed!')).toBeVisible();
    await deletarUsuario(page);
  });
});
