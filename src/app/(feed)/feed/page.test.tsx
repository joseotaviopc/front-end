import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Feed from "./page";

describe("Home", () => {
  it("should renders a userName and search input", () => {
    render(<Feed />);

    // Verificar um teste mais útil para essa pág

    const user = screen.getByText("Usuário", { selector: "span" });
    const inputPlaceholder = screen.getByPlaceholderText("Pesquisar");
    const input = screen.getByRole("textbox");

    expect(user).toBeInTheDocument();
    expect(inputPlaceholder).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});
