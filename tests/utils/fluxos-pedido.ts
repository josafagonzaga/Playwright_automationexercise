import { expect, type Page } from '@playwright/test';
import type { UsuarioTeste } from './gerar-usuario-teste';

export async function irParaCheckout(page: Page): Promise<void> {
  await page.getByText('Proceed To Checkout').click();
  await expect(page.getByText('Address Details')).toBeVisible();
  await expect(page.getByText('Review Your Order')).toBeVisible();
}

export async function irParaLoginPeloCheckout(page: Page): Promise<void> {
  await page.getByText('Proceed To Checkout').click();
  await page.getByRole('link', { name: 'Register / Login' }).click();
  await expect(page.getByText('New User Signup!')).toBeVisible();
}

export async function validarEnderecosCheckout(
  page: Page,
  usuario: UsuarioTeste
): Promise<void> {
  const enderecoEntrega = page.locator('#address_delivery');
  const enderecoCobranca = page.locator('#address_invoice');
  const nomeEndereco = `${usuario.primeiroNome} ${usuario.sobrenome}`;

  await expect(enderecoEntrega).toContainText(nomeEndereco);
  await expect(enderecoEntrega).toContainText(usuario.empresa);
  await expect(enderecoEntrega).toContainText(usuario.endereco);
  await expect(enderecoEntrega).toContainText(usuario.complemento);
  await expect(enderecoEntrega).toContainText(usuario.cidade);
  await expect(enderecoEntrega).toContainText(usuario.estado);
  await expect(enderecoEntrega).toContainText(usuario.cep);
  await expect(enderecoEntrega).toContainText(usuario.pais);
  await expect(enderecoEntrega).toContainText(usuario.telefone);

  await expect(enderecoCobranca).toContainText(nomeEndereco);
  await expect(enderecoCobranca).toContainText(usuario.empresa);
  await expect(enderecoCobranca).toContainText(usuario.endereco);
  await expect(enderecoCobranca).toContainText(usuario.complemento);
  await expect(enderecoCobranca).toContainText(usuario.cidade);
  await expect(enderecoCobranca).toContainText(usuario.estado);
  await expect(enderecoCobranca).toContainText(usuario.cep);
  await expect(enderecoCobranca).toContainText(usuario.pais);
  await expect(enderecoCobranca).toContainText(usuario.telefone);
}

export async function finalizarPedido(page: Page): Promise<void> {
  await page.locator('textarea[name="message"]').fill('Pedido criado por teste automatizado.');
  await page.getByRole('link', { name: 'Place Order' }).click();

  await page.getByTestId('name-on-card').fill('Usuario Teste');
  await page.getByTestId('card-number').fill('4111111111111111');
  await page.getByTestId('cvc').fill('123');
  await page.getByTestId('expiry-month').fill('12');
  await page.getByTestId('expiry-year').fill('2030');
  await page.getByTestId('pay-button').click();

  await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();
}
