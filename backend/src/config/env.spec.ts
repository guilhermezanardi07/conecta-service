import { describe, expect, it } from 'vitest';
import { validateEnv } from './env';

const base = { DATABASE_URL: 'postgresql://u:p@127.0.0.1:5433/db' };

describe('Configuração de ambiente', () => {
  it('converte a porta e interpreta false corretamente', () => {
    const config = validateEnv({
      ...base,
      NODE_ENV: 'development',
      PORT: '3001',
      SWAGGER_ENABLED: 'false',
    });

    expect(config.PORT).toBe(3001);
    expect(config.SWAGGER_ENABLED).toBe(false);
  });

  it('utiliza os valores padrão quando não há configuração', () => {
    expect(validateEnv(base)).toEqual({
      NODE_ENV: 'development',
      PORT: 3000,
      SWAGGER_ENABLED: false,
      DATABASE_URL: base.DATABASE_URL,
    });
  });

  it('rejeita quando DATABASE_URL não é informada', () => {
    expect(() => validateEnv({})).toThrow('DATABASE_URL');
  });

  it.each([
    { PORT: 'abc' },
    { PORT: '0' },
    { PORT: '65536' },
    { NODE_ENV: 'invalido' },
    { SWAGGER_ENABLED: 'sim' },
    { DATABASE_URL: '' },
  ])('rejeita uma configuração inválida: %o', (input) => {
    expect(() => validateEnv({ ...base, ...input })).toThrow(
      'Configuração inválida',
    );
  });
});