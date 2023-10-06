import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Cadastro from "./page";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

describe("Component <Cadastro />", () => {
  it("should render component", () => {
    render(<Cadastro />);
  });

  it("should show error message when submitting blank form", async () => {
    render(<Cadastro />);

    const submitButtonElement = screen.getByText("Criar conta", {
      selector: "button",
    });

    fireEvent.click(submitButtonElement);

    await screen.findAllByText("Campo obrigatório");

  });

  it('should navigate to the "/" route when submitting correct register', async () => {
    render(<Cadastro />);

    const nameInput = screen.getByPlaceholderText(
      "Insira seu nome completo"
    );
    const emailInput = screen.getByPlaceholderText(
      "Ex: meu_email1234@exemplo.com"
    );
    const passwordInput = screen.getByPlaceholderText("Insira sua senha");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirme sua senha");
    const submitButton = screen.getByText("Criar conta", {
      selector: "button",
    });

    fireEvent.change(nameInput, { target: { value: "meu nome" } });
    fireEvent.change(emailInput, { target: { value: "email@teste.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "123456" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it('should toggles password visibility when button is clicked', () => {
    const { asFragment } = render(<Cadastro />);
    const button = screen.getAllByTestId('toogleEye');
  
    expect(asFragment().querySelector('PiEyeSlashLight')).toBeDefined();
  
    fireEvent.click(button[0]);
    expect(asFragment().querySelector('PiEyeLight')).toBeDefined();
  
    fireEvent.click(button[0]);
    expect(asFragment().querySelector('PiEyeSlashLight')).toBeDefined();
    
    fireEvent.click(button[1]);
    expect(asFragment().querySelector('PiEyeLight')).toBeDefined();
  
    fireEvent.click(button[1]);
    expect(asFragment().querySelector('PiEyeSlashLight')).toBeDefined();
  });
});
