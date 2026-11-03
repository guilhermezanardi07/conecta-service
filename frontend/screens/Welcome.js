import React from 'react';
import { Tela, Caixa, Titulo, Botao } from '../components/Tela';

export default function Welcome({ onStart }) {
  return (
    <Tela>
      <Caixa top={374} altura={195} largura={227} />
      <Titulo top={415} largura={169}>
        CONECTE SEU TALENTO A QUEM PRECISA DELE
      </Titulo>
      <Botao top={625} onPress={onStart}>
        Começar
      </Botao>
    </Tela>
  );
}