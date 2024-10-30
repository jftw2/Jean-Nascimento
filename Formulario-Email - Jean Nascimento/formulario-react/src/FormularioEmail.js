// src/FormularioEmail.js

// Importando as bibliotecas React, useFormik e Yup
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Componente principal do formulário de e-mail
const FormularioEmail = () => {
  // Configuração do formik para gerenciar o formulário e sua validação
  const formik = useFormik({
    // Valores iniciais dos campos do formulário
    initialValues: {
      email: '', // Campo de e-mail inicializado como vazio
    },
    // Schema de validação usando Yup para garantir que o e-mail seja válido e obrigatório
    validationSchema: Yup.object({
      email: Yup.string()
        .email('E-mail inválido') // Validação de formato de e-mail
        .required('O e-mail é obrigatório'), // Validação de campo obrigatório
    }),
    // Função que será executada quando o formulário for enviado com sucesso
    onSubmit: values => {
      alert(`E-mail enviado: ${values.email}`); // Exibe uma mensagem com o e-mail enviado
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}> {/* Atribui o envio do formulário ao handleSubmit do formik */}
      <div>
        <label htmlFor="email">Email:</label> {/* Rótulo para o campo de e-mail */}
        <input
          id="email"
          name="email"
          type="email" // Define o tipo do campo como e-mail
          onChange={formik.handleChange} // Atualiza o valor do campo conforme o usuário digita
          onBlur={formik.handleBlur} // Marca o campo como "tocado" quando o usuário sai do campo
          value={formik.values.email} // Define o valor atual do campo com base no estado do formik
        />
        {/* Exibe uma mensagem de erro se o campo de e-mail tiver sido tocado e contiver erros */}
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div> // Exibe o erro de validação do e-mail
        ) : null}
      </div>
      <button type="submit">Enviar</button> {/* Botão para enviar o formulário */}
    </form>
  );
};

export default FormularioEmail; // Exporta o componente para ser usado em outras partes da aplicação
