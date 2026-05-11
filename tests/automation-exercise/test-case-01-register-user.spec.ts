import { test, expect } from '@playwright/test';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { deletarUsuario } from '../utils/deletar-usuario';
import { preencherFormularioCadastro } from '../utils/cadastrar-usuario';
import {
  acessarPaginaInicial,
  abrirTelaLoginCadastro,
} from '../utils/fluxos-autenticacao';

test.describe('Automation Exercise - Cadastro de Usuário', () => {
  test('deve preencher nome e email no início do cadastro', async ({ page }) => {
    const usuario = gerarUsuarioTeste();

    // 1. Iniciar navegador
    // O Playwright já abre o navegador automaticamente ao iniciar o teste.

    // 2. Acessar a URL do site
    // 3. Validar que a página inicial foi carregada com sucesso
    await acessarPaginaInicial(page);

    // 4. Clicar em "Signup / Login"
    await abrirTelaLoginCadastro(page);

    // 5. Validar que "New User Signup!" está visível
    await expect(page.getByText('New User Signup!')).toBeVisible();

    // 6. Informar nome e endereço de email
    await page.getByPlaceholder('Name').fill(usuario.nome);

    await page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(usuario.email);

    // 7. Clicar no botão "Signup"
    await page.getByRole('button', { name: 'Signup' }).click();

    // 8. Validar que "Enter Account Information" está visível
    await expect(page.getByText('Enter Account Information')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();

    // 9. Preencher os detalhes da conta e dados de endereço
    await preencherFormularioCadastro(page, usuario);

    // 10. Clicar no botão "Create Account"
    await page.getByTestId('create-account').click();

    // 11. Validar que "Account Created!" está visível
    await expect(page.getByTestId('account-created')).toBeVisible();

    // 12. Clicar no botão "Continue"
    await page.getByTestId('continue-button').click();

    // 13. Validar que "Logged in as username" está visível
    await expect(page.getByText(`Logged in as ${usuario.nome}`)).toBeVisible();

    // 14. Deletar usuário criado
    await deletarUsuario(page);
  });
});
