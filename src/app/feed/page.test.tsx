import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Feed from "./page"

describe("Home", () => {
  it("renders a heading", () => {
    render(<Feed />)

    // Verificar um teste mais útil para essa pág

    const heading = screen.getByRole("heading", {
      name: "TechRoom BR",
    })

    expect(heading).toBeInTheDocument()
  })
})
