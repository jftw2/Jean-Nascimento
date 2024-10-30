// Importa React, funções de teste da biblioteca Testing Library e o componente Counter a ser testado
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

// Conjunto de testes para o componente Counter
describe('Counter Component', () => {
  
  // Teste que verifica se o contador é inicialmente renderizado com o valor 0
  test('deve renderizar o contador inicial como 0', () => {
    render(<Counter />); // Renderiza o componente Counter
    const counterText = screen.getByText(/contador: 0/i); // Seleciona o texto inicial do contador
    expect(counterText).toBeInTheDocument(); // Verifica se o contador com valor 0 está no documento
  });

  // Teste que verifica se o contador incrementa ao clicar no botão de incrementar
  test('deve incrementar o contador ao clicar no botão', () => {
    render(<Counter />); // Renderiza o componente Counter
    const incrementButton = screen.getByText(/incrementar/i); // Seleciona o botão de incrementar
    fireEvent.click(incrementButton); // Dispara um clique no botão de incrementar
    const counterText = screen.getByText(/contador: 1/i); // Seleciona o texto do contador após o incremento
    expect(counterText).toBeInTheDocument(); // Verifica se o contador exibe o valor atualizado (1)
  });

  // Teste que verifica se o contador decrementa ao clicar no botão de decrementar
  test('deve decrementar o contador ao clicar no botão', () => {
    render(<Counter />); // Renderiza o componente Counter
    const incrementButton = screen.getByText(/incrementar/i); // Seleciona o botão de incrementar
    fireEvent.click(incrementButton); // Incrementa o contador para 1
    fireEvent.click(incrementButton); // Incrementa novamente para 2
    const decrementButton = screen.getByText(/decrementar/i); // Seleciona o botão de decrementar
    fireEvent.click(decrementButton); // Dispara um clique para decrementar o contador
    const counterText = screen.getByText(/contador: 1/i); // Seleciona o texto do contador após o decremento
    expect(counterText).toBeInTheDocument(); // Verifica se o contador exibe o valor atualizado (1)
  });
});
