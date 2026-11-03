import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

const FONTE = 'BebasNeue_400Regular';
const AZUL = '#0088c7';
const LARGURA_TELA = 393;
const ALTURA_TELA = 852;

// converte uma largura do Figma (px) em porcentagem da tela
const pct = (px) => `${(px / LARGURA_TELA) * 100}%`;

export function Fila({ top, children }) {
  return <View style={[styles.fila, { top }]}>{children}</View>;
}

export function Tela({ children }) {
  return (
    <View style={styles.pagina}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tela}>
          <Image source={require('../img/fundoApp.png')} style={styles.fundo} />
          <Fila top={144}>
            <Image source={require('../img/logoIcone.png')} style={styles.icone} />
          </Fila>
          <Fila top={257}>
            <Image source={require('../img/logoTexto.png')} style={styles.texto} />
          </Fila>
          {children}
        </View>
      </ScrollView>
    </View>
  );
}

export function Caixa({ top, altura, largura = 321 }) {
  return (
    <Fila top={top}>
      <View
        style={[
          styles.caixa,
          { width: pct(largura), maxWidth: largura, height: altura },
        ]}
      />
    </Fila>
  );
}

export function Titulo({ top, largura = 198, children }) {
  return (
    <Fila top={top}>
      <Text style={[styles.titulo, { width: largura }]}>{children}</Text>
    </Fila>
  );
}

export function Campo({ top, ...resto }) {
  return (
    <Fila top={top}>
      <TextInput
        style={styles.campo}
        placeholderTextColor="rgba(0,0,0,0.3)"
        {...resto}
      />
    </Fila>
  );
}

export function LinkTexto({ top, onPress, children }) {
  return (
    <Fila top={top}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.link}>{children}</Text>
      </TouchableOpacity>
    </Fila>
  );
}

export function Botao({ top, onPress, tamanhoFonte = 24, children }) {
  return (
    <Fila top={top}>
      <TouchableOpacity style={styles.botao} onPress={onPress}>
        <Text style={[styles.botaoTexto, { fontSize: tamanhoFonte }]}>
          {children}
        </Text>
      </TouchableOpacity>
    </Fila>
  );
}

const styles = StyleSheet.create({
  pagina: {
    flex: 1,
    backgroundColor: '#cdf3ff',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
    width: '100%',
    maxWidth: LARGURA_TELA,
  },
  conteudo: {
    flexGrow: 1,
  },
  tela: {
    flex: 1,
    minHeight: ALTURA_TELA,
    backgroundColor: '#cdf3ff',
  },
  fundo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fila: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  icone: {
    width: 113,
    height: 113,
    resizeMode: 'contain',
  },
  texto: {
    width: 187,
    height: 70,
    resizeMode: 'contain',
  },
  caixa: {
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: AZUL,
    borderRadius: 14,
  },
  titulo: {
    fontFamily: FONTE,
    fontSize: 32,
    color: '#000000',
    textAlign: 'center',
  },
  campo: {
    width: pct(287),
    maxWidth: 287,
    height: 48,
    backgroundColor: '#d9d9d9',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontFamily: FONTE,
    fontSize: 24,
    color: '#000000',
    ...Platform.select({ web: { outlineStyle: 'none' } }),
  },
  link: {
    fontFamily: FONTE,
    fontSize: 13,
    color: '#352aff',
    textAlign: 'center',
  },
  botao: {
    width: 151,
    height: 52,
    backgroundColor: AZUL,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  botaoTexto: {
    fontFamily: FONTE,
    color: '#ffffff',
    textAlign: 'center',
  },
});