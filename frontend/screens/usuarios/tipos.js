// Helpers compartilhados entre as telas de contratante e prestador.

// Descobre o tipo do usuário a partir do que a API devolve no login.
// Aceita: usuario.papel = 'PRESTADOR' | usuario.tipo | usuario.tipos = ['prestador'] | [{ nomeTipo: 'prestador' }] ...
// Ajuste aqui se o campo da sua API tiver outro nome.
export function tipoDoUsuario(usuario) {
  if (!usuario) return 'contratante';
  const bruto =
    usuario.papel ?? usuario.papeis ?? usuario.tipo ?? usuario.tipoUsuario ?? usuario.tipos ??
    usuario.perfil ?? usuario.nomeTipo ?? '';
  const lista = Array.isArray(bruto) ? bruto : [bruto];
  const texto = lista
    .map((t) => (t && typeof t === 'object' ? t.nomeTipo || t.papel || t.tipo || t.nome || '' : String(t)))
    .join(' ')
    .toLowerCase();
  return texto.includes('prestador') ? 'prestador' : 'contratante';
}

export function iniciais(nome) {
  const n = nome ? String(nome).trim() : '';
  if (!n) return 'EU';
  const p = n.split(/\s+/);
  return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
}

export function primeiroNome(nome) {
  return nome ? String(nome).trim().split(/\s+/)[0].toUpperCase() : '';
}

// Itens do menu lateral de cada tipo (ainda sem navegação).
export const MENU_CONTRATANTE = [
  'Meu perfil',
  'Serviços contratados',
  'Avaliações',
  'Histórico de pagamentos',
];

export const MENU_PRESTADOR = [
  'Meu perfil',
  'Agenda',
  'Meus serviços',
  'Clientes',
  'Boost',
  'Histórico de pagamentos',
];