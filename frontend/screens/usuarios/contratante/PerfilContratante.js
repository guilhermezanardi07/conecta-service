import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '../components/TopBar';
import MenuLateral from '../components/MenuLateral';
import StatusAtivo from '../components/StatusAtivo';
import { iniciais, MENU_CONTRATANTE } from '../tipos';

const FONT = 'BebasNeue_400Regular';

export default function PerfilContratante({ usuario, onBack, onSair }) {
  const [menuAberto, setMenuAberto] = useState(false);

  const nome = (usuario && usuario.nome) || 'USUÁRIO';
  const local = [usuario && usuario.cidade, usuario && usuario.estado].filter(Boolean).join(' - ');

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
          <Text style={styles.tipo}>CONTRATANTE</Text>

          {/* Idade e "Usuário Ouro" vêm do protótipo: só aparecem se a API enviar */}
          <View style={styles.row}>
            {usuario && usuario.idade ? <Text style={styles.text}>IDADE: {usuario.idade}</Text> : <View />}
            {usuario && usuario.nivel === 'ouro' && <Text style={styles.gold}>USUARIO OURO</Text>}
          </View>

          {!!local && <Text style={[styles.text, { marginTop: 10 }]}>CIDADE: {local}</Text>}

          <View style={styles.mapBox}>
            <Text style={styles.mapTitle}>MAPA DE SERVIÇOS CONTRATADOS</Text>
            <View style={styles.mapItem} />
            <View style={styles.mapItem} />
            <View style={styles.mapItem} />
          </View>
        </View>
      </ScrollView>

      <MenuLateral
        visible={menuAberto}
        onClose={() => setMenuAberto(false)}
        itens={MENU_CONTRATANTE}
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
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  text: { fontSize: 19, color: '#555', fontFamily: FONT },
  gold: { fontSize: 18, color: '#e6d800', fontFamily: FONT },

  mapBox: {
    marginTop: 14, borderWidth: 4, borderColor: '#e3e3e3', borderRadius: 12, padding: 14, minHeight: 190,
  },
  mapTitle: { fontSize: 19, color: '#666', fontFamily: FONT, marginBottom: 14 },
  mapItem: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#d8d8d8', marginBottom: 8 },
});