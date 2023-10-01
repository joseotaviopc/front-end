import React from "react";
import { useRouter } from 'next/navigation';
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./page";

//Mock para a função useRouter, simular o redirecionamento de rotas
jest.mock('next/navigation', () => ({
  useRouter: {
    push: jest.fn(),
  },
}));

describe("Home Component <Home />", () => {
  it("should render component", () => {
    render(<Home />);
    // Verifique se o componente renderizou com sucesso
    const headerElement = screen.getByText("TechRoom");
    expect(headerElement).toBeInTheDocument();
  });

  it("should show error message when submitting blank form", () => {
    render(<Home />);

    // Simular o envio do formulário em branco
    const submitButtonElement = screen.getByText("Acessar conta", { selector: "button" });
    fireEvent.click(submitButtonElement);

    // Verifique se as mensagens de erro são exibidas
    const emailErrorElement = screen.getByText("Campo obrigatório", { selector: "login-error" });
    const passwordErrorElement = screen.getByText("Campo obrigatório", { selector: "login-error" });
    expect(emailErrorElement).toBeInTheDocument();
    expect(passwordErrorElement).toBeInTheDocument();
  });

  it('should navigate to the "/feed" route when submitting correct credentials', () => {

    render(<Home />);

    // Simular o preenchimento do formulário com credenciais corretas
    const emailInput = screen.getByPlaceholderText("Insira seu nome de usuário ou e-mail");
    const passwordInput = screen.getByPlaceholderText("Insira sua senha");
    const submitButton = screen.getByText("Acessar conta", { selector: "button" });

    fireEvent.change(emailInput, { target: { value: "fulano@teste.com" } });
    fireEvent.change(passwordInput, { target: { value: "senhateste123" } });
    fireEvent.click(submitButton);

    // Verificar se a rota "/feed" foi chamada após o envio do formulário
    expect(useRouter().push).toHaveBeenCalledWith("/feed");
  });
});
