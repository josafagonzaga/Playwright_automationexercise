import { test, expect } from '@playwright/test';
import {
  acessarPaginaInicial,
  abrirTelaLoginCadastro,
  fazerLogin,
} from '../utils/fluxos-autenticacao';

test.describe('Automation Exercise - Login de Usuário', () => {
  test('deve exibir erro ao tentar login com email e senha incorretos', async ({ page }) => {
    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await acessarPaginaInicial(page);

    // 4. Clicar no botão "Signup / Login"
    await abrirTelaLoginCadastro(page);

    // 5. Validar que "Login to your account" está visível
    await expect(page.getByText('Login to your account')).toBeVisible();

    // 6. Informar email e senha incorretos
    // 7. Clicar no botão "Login"
    await fazerLogin(page, 'usuario.incorreto@email.com', 'senha_incorreta');

    // 8. Validar que a mensagem de erro está visível
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });
});
