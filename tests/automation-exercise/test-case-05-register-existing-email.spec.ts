import { test, expect } from '@playwright/test';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { cadastrarUsuario } from '../utils/cadastrar-usuario';
import { deletarUsuario } from '../utils/deletar-usuario';
import {
  acessarPaginaInicial,
  abrirTelaLoginCadastro,
  fazerLogin,
} from '../utils/fluxos-autenticacao';

test.describe('Automation Exercise - Cadastro com Email Existente', () => {
  test('deve exibir erro ao tentar cadastrar email ja existente', async ({ page }) => {
    const usuario = gerarUsuarioTeste();

    // Preparação: criar um usuário para que o email já exista no sistema
    await cadastrarUsuario(page, usuario, { fazerLogout: true });

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await acessarPaginaInicial(page);

    // 4. Clicar no botão "Signup / Login"
    await abrirTelaLoginCadastro(page);

    // 5. Validar que "New User Signup!" está visível
    await expect(page.getByText('New User Signup!')).toBeVisible();

    // 6. Informar nome e endereço de email já registrado
    await page.getByPlaceholder('Name').fill(usuario.nome);

    await page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(usuario.email);

    // 7. Clicar no botão "Signup"
    await page.getByRole('button', { name: 'Signup' }).click();

    // 8. Validar que a mensagem de erro está visível
    await expect(page.getByText('Email Address already exist!')).toBeVisible();

    // Limpeza: fazer login e deletar o usuário criado na preparação
    await fazerLogin(page, usuario.email, usuario.senha);
    await deletarUsuario(page);
  });
});
