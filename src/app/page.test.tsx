import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./page";
import { useRouter } from "next/navigation";

//Mock para a função useRouter, simular o redirecionamento de rotas
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("Home Component <Home />", () => {
  it("should render component", () => {
    render(<Home />);
  });

  it("should show error message when submitting blank form", async () => {
    render(<Home />);

    // Simular o envio do formulário em branco
    const submitButtonElement = screen.getByText("Acessar conta", {
      selector: "button",
    });

    fireEvent.click(submitButtonElement);

    await screen.findAllByText("Campo obrigatório");
  });

  // it('should navigate to the "/feed" route when submitting correct credentials', async () => {
  //   render(<Home />);

  //   // Simular o preenchimento do formulário com credenciais corretas
  //   const emailInput = screen.getByPlaceholderText("Insira seu nome de usuário ou e-mail");
  //   const passwordInput = screen.getByPlaceholderText("Insira sua senha");
  //   const submitButton = screen.getByText("Acessar conta", { selector: "button" });

  //   fireEvent.change(emailInput, { target: { value: "fulano@teste.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "senhateste123" } });

  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(useRouter().push).toHaveBeenCalledWith("/feed");
  //   });
  // });
});
