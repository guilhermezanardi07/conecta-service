import { z } from 'zod';

// Confere os dígitos verificadores do CPF (11 números, sem pontuação).
function cpfValido(cpf: string): boolean {
  // Rejeita sequências repetidas, como 111.111.111-11.
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcula um dígito verificador a partir dos números anteriores.
  const calcularDigito = (base: string): number => {
    const pesoInicial = base.length + 1;

    const soma = [...base].reduce(
      (total, numero, indice) =>
        total + Number(numero) * (pesoInicial - indice),
      0,
    );

    const resto = (soma * 10) % 11;

    return resto === 10 ? 0 : resto;
  };

  return (
    calcularDigito(cpf.slice(0, 9)) === Number(cpf[9]) &&
    calcularDigito(cpf.slice(0, 10)) === Number(cpf[10])
  );
}

export const registerSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(1, 'Informe o nome.')
      .max(150, 'O nome deve ter no máximo 150 caracteres.'),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, 'Informe o email.')
      .max(150, 'O email deve ter no máximo 150 caracteres.')
      .email('Informe um email válido.'),

    // Aceita "52998224725" ou "529.982.247-25". Depois de validar,
    // salva sempre com pontuação, que cabe nos 14 caracteres da coluna.
    cpf: z
      .string()
      .trim()
      .regex(
        /^(\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/,
        'Informe um CPF válido.',
      )
      .transform((valor) => valor.replace(/\D/g, ''))
      .refine(cpfValido, 'Informe um CPF válido.')
      .transform(
        (n) =>
          `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6, 9)}-${n.slice(9)}`,
      ),

    senha: z
      .string()
      .min(15, 'A senha deve ter pelo menos 15 caracteres.')
      .max(128, 'A senha deve ter no máximo 128 caracteres.'),

    confirmacaoSenha: z
      .string()
      .min(1, 'Confirme a senha.')
      .max(128, 'A confirmação deve ter no máximo 128 caracteres.'),

    papel: z.enum(['CONTRATANTE', 'PRESTADOR']),
  })
  .strict()
  .refine((dados) => dados.senha === dados.confirmacaoSenha, {
    message: 'As senhas não coincidem.',
    path: ['confirmacaoSenha'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;