import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Valores iguais aos que a API recebe em "papel".
export const PAPEL_PRESTADOR = 'PRESTADOR';
export const PAPEL_CONTRATANTE = 'CONTRATANTE';

const OPCOES = [
  {
    valor: PAPEL_PRESTADOR,
    titulo: 'PRESTADOR DE SERVIÇOS',
    explicacao:
      'Para quem oferece serviços. Você cadastra e divulga seus serviços, recebe pedidos de ' +
      'orçamento, acompanha sua agenda e seus pagamentos e pode ativar o Boost para aparecer em destaque.',
  },
  {
    valor: PAPEL_CONTRATANTE,
    titulo: 'CONTRATANTE DE SERVIÇOS',
    explicacao:
      'Para quem precisa de um serviço. Você busca profissionais perto de você, vê as avaliações, ' +
      'pede orçamentos, contrata, paga pelo app e avalia o trabalho depois.',
  },
];

// Seletor de tipo de conta (dois radiobuttons, cada um com uma setinha que abre a explicação).
// Posicionado como os outros componentes da tela de cadastro: <SeletorTipoUsuario top={662} ... />
// A explicação aparece FLUTUANDO acima do seletor, sem empurrar os outros campos.
export default function SeletorTipoUsuario({ top, left = 24, right = 24, valor, onChange }) {
  const [aberto, setAberto] = useState(null);

  const explicacaoAberta = OPCOES.find((o) => o.valor === aberto);

  return (
    <View style={[styles.container, { top, left, right }]}>
      {explicacaoAberta && (
        <View style={styles.popup}>
          <Text style={styles.popupTitulo}>{explicacaoAberta.titulo}</Text>
          <Text style={styles.popupTexto}>{explicacaoAberta.explicacao}</Text>
        </View>
      )}

      {OPCOES.map((op) => {
        const selecionado = valor === op.valor;
        const expandido = aberto === op.valor;

        return (
          <View key={op.valor} style={[styles.linha, selecionado && styles.linhaSelecionada]}>
            <Pressable
              style={styles.radioArea}
              onPress={() => onChange(op.valor)}
              accessibilityRole="radio"
              accessibilityState={{ selected: selecionado }}
            >
              <View style={[styles.radio, selecionado && styles.radioSelecionado]}>
                {selecionado && <View style={styles.radioMiolo} />}
              </View>
              <Text style={styles.titulo}>{op.titulo}</Text>
            </Pressable>

            <Pressable
              onPress={() => setAberto(expandido ? null : op.valor)}
              hitSlop={10}
              accessibilityLabel={`Saiba mais sobre ${op.titulo}`}
            >
              <Ionicons name={expandido ? 'chevron-up' : 'chevron-down'} size={22} color="#1b365d" />
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute', zIndex: 10 },
  linha: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    height: 36, marginBottom: 4, paddingHorizontal: 10,
    borderWidth: 2, borderColor: '#c9d4e6', borderRadius: 10, backgroundColor: '#fff',
  },
  linhaSelecionada: { borderColor: '#1f77c4', backgroundColor: '#eef7ff' },
  radioArea: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 10 },
  radio: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#8a8a8a',
    alignItems: 'center', justifyContent: 'center',
  },
  radioSelecionado: { borderColor: '#1f77c4' },
  radioMiolo: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#1f77c4' },
  titulo: { fontSize: 18, color: '#1b365d', fontFamily: 'BebasNeue_400Regular' },

  popup: {
    position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: 8,
    backgroundColor: '#fff', borderRadius: 10, borderWidth: 2, borderColor: '#1f77c4',
    padding: 12, elevation: 8, zIndex: 20,
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  popupTitulo: { fontSize: 18, color: '#1b365d', fontFamily: 'BebasNeue_400Regular', marginBottom: 4 },
  popupTexto: { fontSize: 14, lineHeight: 20, color: '#555' },
});