// src/App.js

// Importa a biblioteca React, o arquivo de estilos CSS e o componente FormularioEmail
import React from 'react';
import './App.css'; // Estilos globais da aplicação
import FormularioEmail from './FormularioEmail'; // Componente de formulário para capturar o e-mail

// Componente principal da aplicação
function App() {
  return (
    <div className="App">
      {/* Título principal da página */}
      <h1>Formulário de E-mail</h1>
      
      {/* Renderiza o componente FormularioEmail que inclui o formulário de e-mail */}
      <FormularioEmail />
    </div>
  );
}

// Exporta o componente App para uso em outras partes do aplicativo, como ponto de entrada
export default App;
