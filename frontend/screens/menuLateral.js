import React from 'react';
import { Modal, Pressable, Text, View, StyleSheet } from 'react-native';

const ITENS = ['Meu perfil', 'Serviços contratados', 'Avaliações', 'Configurações', 'Sair'];

// Menu lateral: abre e fecha, mas os itens ainda não navegam.
export default function MenuLateral({ visible, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Toque fora do menu fecha */}
        <Pressable style={styles.overlay} onPress={onClose} />

        <View style={styles.panel}>
          <View style={styles.header}>
            <Text style={styles.title}>MENU</Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <Text style={styles.close}>×</Text>
            </Pressable>
          </View>

          {ITENS.map((item) => (
            <Pressable
              key={item}
              style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
              onPress={onClose} // por enquanto só fecha
            >
              <Text style={styles.itemText}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
  panel: { width: 260, backgroundColor: '#1b365d', paddingTop: 48 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  title: { color: '#fff', fontSize: 22, fontFamily: 'BebasNeue_400Regular', letterSpacing: 1 },
  close: { color: '#fff', fontSize: 32, lineHeight: 32 },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  itemPressed: { backgroundColor: 'rgba(255,255,255,0.08)' },
  itemText: { color: '#fff', fontSize: 20, fontFamily: 'BebasNeue_400Regular' },
});