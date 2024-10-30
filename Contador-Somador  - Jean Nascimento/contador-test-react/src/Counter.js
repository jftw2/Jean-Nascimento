// Importa React e useState, que é um hook para gerenciar o estado no componente funcional
import React, { useState } from 'react';

// Componente Counter para exibir e manipular um contador simples
const Counter = () => {
  // Declara o estado 'count' inicializado com 0, e a função 'setCount' para atualizar o valor de 'count'
  const [count, setCount] = useState(0);

  // Função para incrementar o valor de 'count' em 1
  const increment = () => setCount(count + 1);

  // Função para decrementar o valor de 'count' em 1
  const decrement = () => setCount(count - 1);

  return (
    <div>
      {/* Exibe o valor atual do contador */}
      <h1>Contador: {count}</h1>
      
      {/* Botão para incrementar o contador ao ser clicado */}
      <button onClick={increment}>Incrementar</button>

      {/* Botão para decrementar o contador ao ser clicado */}
      <button onClick={decrement}>Decrementar</button>
    </div>
  );
};

// Exporta o componente Counter para ser utilizado em outras partes do aplicativo
export default Counter;
