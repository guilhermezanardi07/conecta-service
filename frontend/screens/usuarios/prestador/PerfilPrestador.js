import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '../components/TopBar';
import MenuLateral from '../components/MenuLateral';
import StatusAtivo from '../components/StatusAtivo';
import Estrelas from '../components/Estrelas';
import { iniciais, MENU_PRESTADOR } from '../tipos';

const FONT = 'BebasNeue_400Regular';

// Exemplo (depois virá da API: serviços do prestador, RF06 a RF08)
const SERVICOS = [
  { id: 1, titulo: 'LIMPEZA RESIDENCIAL', valor: 'A PARTIR DE R$ 120,00' },
  { id: 2, titulo: 'LIMPEZA PÓS-OBRA', valor: 'A PARTIR DE R$ 250,00' },
];

export default function PerfilPrestador({ usuario, onBack, onSair }) {
  const [menuAberto, setMenuAberto] = useState(false);

  const nome = (usuario && usuario.nome) || 'USUÁRIO';
  const local = [usuario && usuario.cidade, usuario && usuario.estado].filter(Boolean).join(' - ');
  const nota = (usuario && usuario.avaliacaoMedia) || 0;
  const descricao = usuario && usuario.descricaoPerfil;

  return (
    <View style={styles.screen}>
      <TopBar onPressHome={onBack} onOpenMenu={() => setMenuAberto(true)} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              {usuario && usuario.fotoPerfil ? (
                <Image source={{ uri: usuario.fotoPerfil }} style={styles.avatarImg} />
              ) : (
                <Text style={styles.avatarText}>{iniciais(nome)}</Text>
              )}
            </View>
            <Pressable style={styles.edit}>
              <Ionicons name="pencil" size={12} color="#fff" />
            </Pressable>
          </View>

          <StatusAtivo ativo={!usuario || usuario.statusConta !== 'inativa'} style={styles.statusCorner} />

          <Text style={styles.name}>{nome.toUpperCase()}</Text>
          <Text style={styles.tipo}>PRESTADOR DE SERVIÇOS</Text>

          <View style={styles.notaRow}>
            <Estrelas nota={nota} tamanho={22} />
            <Text style={styles.notaNum}>{nota ? Number(nota).toFixed(1) : 'SEM AVALIAÇÕES'}</Text>
          </View>

          {!!local && <Text style={[styles.text, { marginTop: 10 }]}>CIDADE: {local}</Text>}
          <Text style={styles.text}>
            DISPONIBILIDADE: {(usuario && usuario.disponibilidade) || 'NÃO INFORMADA'}
          </Text>

          <View style={styles.box}>
            <Text style={styles.boxTitle}>SOBRE MIM</Text>
            <Text style={styles.descricao}>
              {descricao || 'Adicione uma descrição profissional para os contratantes conhecerem seu trabalho.'}
            </Text>
          </View>

          <View style={styles.box}>
            <View style={styles.boxHead}>
              <Text style={styles.boxTitle}>MEUS SERVIÇOS</Text>
              <Pressable style={styles.addBtn}>
                <Ionicons name="add" size={18} color="#fff" />
              </Pressable>
            </View>

            {SERVICOS.map((s) => (
              <View key={s.id} style={styles.servico}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.servicoTitulo}>{s.titulo}</Text>
                  <Text style={styles.servicoValor}>{s.valor}</Text>
                </View>
                <Pressable hitSlop={8}><Ionicons name="create-outline" size={22} color="#1f77c4" /></Pressable>
                <Pressable hitSlop={8}><Ionicons name="trash-outline" size={22} color="#d9534f" /></Pressable>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <MenuLateral
        visible={menuAberto}
        onClose={() => setMenuAberto(false)}
        itens={MENU_PRESTADOR}
        onSair={onSair}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#cdeeff' },
  content: { paddingTop: 56, paddingHorizontal: 14, paddingBottom: 30 },
  card: {
    backgroundColor: '#fff', borderRadius: 12, paddingTop: 56, paddingHorizontal: 14,
    paddingBottom: 20, minHeight: 520, elevation: 3,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  avatarWrap: { position: 'absolute', top: -46, alignSelf: 'center' },
  avatar: {
    width: 92, height: 92, borderRadius: 46, backgroundColor: '#b0865f', overflow: 'hidden',
    borderWidth: 3, borderColor: '#1f77c4', alignItems: 'center', justifyContent: 'center',
  },
  avatarImg: { width: '100%', height: '100%' },
  avatarText: { color: '#fff', fontSize: 34, fontFamily: FONT },
  edit: {
    position: 'absolute', right: 0, bottom: 2, width: 24, height: 24, borderRadius: 12,
    backgroundColor: '#1f77c4', borderWidth: 2, borderColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  statusCorner: { position: 'absolute', top: 10, left: 10 },

  name: { textAlign: 'center', fontSize: 20, color: '#555', fontFamily: FONT, marginTop: 4 },
  tipo: { textAlign: 'center', fontSize: 14, color: '#1f77c4', fontFamily: FONT, letterSpacing: 1 },
  notaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 10 },
  notaNum: { fontSize: 20, color: '#555', fontFamily: FONT },
  text: { fontSize: 19, color: '#555', fontFamily: FONT },

  box: { marginTop: 14, borderWidth: 4, borderColor: '#e3e3e3', borderRadius: 12, padding: 14 },
  boxHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  boxTitle: { fontSize: 19, color: '#666', fontFamily: FONT },
  descricao: { marginTop: 6, fontSize: 14, lineHeight: 20, color: '#777' },
  addBtn: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: '#1f77c4',
    alignItems: 'center', justifyContent: 'center',
  },
  servico: {
    flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8,
    borderTopWidth: 1, borderTopColor: '#eee',
  },
  servicoTitulo: { fontSize: 18, color: '#222', fontFamily: FONT },
  servicoValor: { fontSize: 14, color: '#888', fontFamily: FONT },
});