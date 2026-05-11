import type { Page } from '@playwright/test';

export async function bloquearAnuncios(page: Page): Promise<void> {
  await page.route(
    /.*(doubleclick|googlesyndication|googleadservices|fundingchoicesmessages|adtrafficquality).*/,
    (route) => route.abort()
  );
}
