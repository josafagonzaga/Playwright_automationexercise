import { test, expect } from '@playwright/test';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { deletarUsuario } from '../utils/deletar-usuario';
import { cadastrarUsuario } from '../utils/cadastrar-usuario';
import {
  acessarPaginaInicial,
  abrirTelaLoginCadastro,
  fazerLogin,
} from '../utils/fluxos-autenticacao';

test.describe('Automation Exercise - Login de Usuário', () => {
  test('deve fazer login com email e senha corretos', async ({ page }) => {
    const usuario = gerarUsuarioTeste();

    // Preparação: criar um usuário para usar credenciais válidas no login
    await cadastrarUsuario(page, usuario, { fazerLogout: true });

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await acessarPaginaInicial(page);

    // 4. Clicar no botão "Signup / Login"
    await abrirTelaLoginCadastro(page);

    // 5. Validar que "Login to your account" está visível
    await expect(page.getByText('Login to your account')).toBeVisible();

    // 6. Informar email e senha corretos
    // 7. Clicar no botão "Login"
    await fazerLogin(page, usuario.email, usuario.senha);

    // 8. Validar que "Logged in as username" está visível
    await expect(page.getByText(`Logged in as ${usuario.nome}`)).toBeVisible();

    // 9. Clicar no botão "Delete Account"
    // 10. Validar que "ACCOUNT DELETED!" está visível
    await deletarUsuario(page);
  });
});
