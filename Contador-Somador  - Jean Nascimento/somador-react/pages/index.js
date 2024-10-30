// Importa o hook useState para gerenciar o estado dos campos de entrada e do resultado
import { useState } from 'react';

// Componente principal da aplicação
export default function Home() {
  // Estado para armazenar o valor do primeiro número (num1)
  const [num1, setNum1] = useState('');
  
  // Estado para armazenar o valor do segundo número (num2)
  const [num2, setNum2] = useState('');
  
  // Estado para armazenar o resultado da soma de num1 e num2
  const [resultado, setResultado] = useState(null);

  // Função para tratar o envio do formulário e realizar a soma
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário, que é recarregar a página
    const soma = parseFloat(num1) + parseFloat(num2); // Converte os valores dos inputs para float e calcula a soma
    setResultado(soma); // Define o estado 'resultado' com o valor da soma
  };

  return (
    <div>
      {/* Título da calculadora */}
      <h1>Calculadora de Soma</h1>
      
      {/* Formulário para inserir números e realizar a soma */}
      <form onSubmit={handleSubmit}>
        
        {/* Campo de entrada para o primeiro número */}
        <div>
          <label>Número 1:</label>
          <input
            type="number" // Define o tipo de entrada como numérico
            value={num1} // Associa o valor ao estado 'num1'
            onChange={(e) => setNum1(e.target.value)} // Atualiza o estado 'num1' ao alterar o valor do input
            required // Torna o campo obrigatório
          />
        </div>
        
        {/* Campo de entrada para o segundo número */}
        <div>
          <label>Número 2:</label>
          <input
            type="number" // Define o tipo de entrada como numérico
            value={num2} // Associa o valor ao estado 'num2'
            onChange={(e) => setNum2(e.target.value)} // Atualiza o estado 'num2' ao alterar o valor do input
            required // Torna o campo obrigatório
          />
        </div>
        
        {/* Botão para enviar o formulário e realizar a soma */}
        <button type="submit">Somar</button>
      </form>
      
      {/* Exibe o resultado da soma, se o estado 'resultado' não for nulo */}
      {resultado !== null && <h2>Resultado: {resultado}</h2>}
    </div>
  );
}
