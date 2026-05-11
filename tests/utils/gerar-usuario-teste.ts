export type UsuarioTeste = {
  nome: string;
  email: string;
  senha: string;
  primeiroNome: string;
  sobrenome: string;
  empresa: string;
  endereco: string;
  complemento: string;
  pais: string;
  estado: string;
  cidade: string;
  cep: string;
  telefone: string;
};

export function gerarUsuarioTeste(): UsuarioTeste {
  const timestamp = Date.now();

  return {
    nome: `Usuario Teste ${timestamp}`,
    email: `usuario.teste.${timestamp}@email.com`,
    senha: 'SenhaTeste@123',
    primeiroNome: 'Usuario',
    sobrenome: 'Teste',
    empresa: 'WebRota',
    endereco: 'Rua de Teste, 123',
    complemento: 'Complemento QA',
    pais: 'Canada',
    estado: 'Ontario',
    cidade: 'Toronto',
    cep: '12345',
    telefone: '11999999999',
  };
}
