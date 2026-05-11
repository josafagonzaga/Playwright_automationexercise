import { test, expect } from '@playwright/test';
import { acessarPaginaInicial, abrirTelaLoginCadastro } from '../utils/fluxos-autenticacao';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { cadastrarUsuarioPelaTelaLogin } from '../utils/cadastrar-usuario';
import { deletarUsuario } from '../utils/deletar-usuario';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';
import {
  adicionarPrimeiroProdutoAoCarrinho,
  abrirCarrinho,
  abrirProdutos,
} from '../utils/fluxos-carrinho';
import { irParaCheckout, validarEnderecosCheckout } from '../utils/fluxos-pedido';

test.describe('Automation Exercise - Enderecos no Checkout', () => {
  test('deve validar endereco de entrega e cobranca no checkout', async ({ page }) => {
    test.setTimeout(60000);
    const usuario = gerarUsuarioTeste();
    await bloquearAnuncios(page);

    await acessarPaginaInicial(page);
    await abrirTelaLoginCadastro(page);
    await cadastrarUsuarioPelaTelaLogin(page, usuario);
    await expect(page.getByText(`Logged in as ${usuario.nome}`)).toBeVisible();

    await abrirProdutos(page);
    await adicionarPrimeiroProdutoAoCarrinho(page);
    await abrirCarrinho(page);
    await irParaCheckout(page);
    await validarEnderecosCheckout(page, usuario);

    await deletarUsuario(page);
  });
});
