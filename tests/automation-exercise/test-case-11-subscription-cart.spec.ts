import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';
import { abrirCarrinho } from '../utils/fluxos-carrinho';

test.describe('Automation Exercise - Inscricao no Carrinho', () => {
  test('deve validar subscription na pagina de carrinho', async ({ page }) => {
    const usuario = gerarUsuarioTeste();
    await bloquearAnuncios(page);

    await acessarPaginaInicial(page);
    await abrirCarrinho(page);

    await page.locator('footer').scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();

    await page.locator('#susbscribe_email').fill(usuario.email);
    await page.locator('#subscribe').click();

    await expect(page.getByText('You have been successfully subscribed!')).toBeVisible();
  });
});
