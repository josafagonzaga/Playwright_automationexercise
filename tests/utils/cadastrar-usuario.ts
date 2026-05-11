import { expect, type Page } from '@playwright/test';
import type { UsuarioTeste } from './gerar-usuario-teste';

export async function preencherFormularioCadastro(
  page: Page,
  usuario: UsuarioTeste
): Promise<void> {
  await page.getByRole('radio', { name: 'Mr.' }).check();
  await page.getByLabel('Password').fill(usuario.senha);
  await page.getByTestId('days').selectOption('28');
  await page.getByTestId('months').selectOption('5');
  await page.getByTestId('years').selectOption('1979');
  await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
  await page.getByRole('checkbox', { name: 'Receive special offers from our partners!' }).check();
  await page.getByTestId('first_name').fill(usuario.primeiroNome);
  await page.getByTestId('last_name').fill(usuario.sobrenome);
  await page.getByTestId('company').fill(usuario.empresa);
  await page.getByTestId('address').fill(usuario.endereco);
  await page.getByTestId('address2').fill(usuario.complemento);
  await page.getByTestId('country').selectOption(usuario.pais);
  await page.getByTestId('state').fill(usuario.estado);
  await page.getByTestId('city').fill(usuario.cidade);
  await page.getByTestId('zipcode').fill(usuario.cep);
  await page.getByTestId('mobile_number').fill(usuario.telefone);
}

export async function cadastrarUsuario(
  page: Page,
  usuario: UsuarioTeste,
  opcoes?: { fazerLogout?: boolean }
): Promise<void> {
  await page.goto('http://automationexercise.com');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await cadastrarUsuarioPelaTelaLogin(page, usuario);

  if (opcoes?.fazerLogout) {
    await page.getByRole('link', { name: 'Logout' }).click();
  }
}

export async function cadastrarUsuarioPelaTelaLogin(
  page: Page,
  usuario: UsuarioTeste
): Promise<void> {
  await page.getByPlaceholder('Name').fill(usuario.nome);

  await page
    .locator('form')
    .filter({ hasText: 'Signup' })
    .getByPlaceholder('Email Address')
    .fill(usuario.email);

  await page.getByRole('button', { name: 'Signup' }).click();
  await expect(page.getByText('Enter Account Information')).toBeVisible();

  await preencherFormularioCadastro(page, usuario);
  await page.getByTestId('create-account').click();
  await expect(page.getByTestId('account-created')).toBeVisible();
  await page.getByTestId('continue-button').click();
  await expect(page.getByText(`Logged in as ${usuario.nome}`)).toBeVisible();
}
