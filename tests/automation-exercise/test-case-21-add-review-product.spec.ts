import { test, expect } from '@playwright/test';
import { acessarPaginaInicial } from '../utils/fluxos-autenticacao';
import { gerarUsuarioTeste } from '../utils/gerar-usuario-teste';
import { bloquearAnuncios } from '../utils/bloquear-anuncios';
import { abrirProdutos } from '../utils/fluxos-carrinho';

test.describe('Automation Exercise - Review de Produto', () => {
  test('deve adicionar review em produto', async ({ page }) => {
    const usuario = gerarUsuarioTeste();
    await bloquearAnuncios(page);

    await acessarPaginaInicial(page);
    await abrirProdutos(page);
    await page.locator('a[href="/product_details/1"]').click();

    await expect(page.getByText('Write Your Review')).toBeVisible();
    await page.locator('#name').fill(usuario.nome);
    await page.locator('#email').fill(usuario.email);
    await page.locator('#review').fill('Produto avaliado por teste automatizado.');
    await page.locator('#button-review').click();

    await expect(page.getByText('Thank you for your review.')).toBeVisible();
  });
});
