/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-wait-for-empty-callback */
import { findByText, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

jest.mock("axios");

const axiosResponseMock = {
  data: {
    title: "Samuca",
    description: "Dev senhor",
    price: 1.99,
    thumbnail: "http://link-URL",
  }
};

describe("testando product card", () => {
  beforeEach(() => {
    axios.mockReset();
    //resetando o mock
  });

  test("Deve renderizar o product", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock);

    render(<ProductCard />);
    screen.logTestingPlaygroundURL();

    await waitFor(() => {});
    screen.logTestingPlaygroundURL();
  });

  test("Deve renderizar o Loading de productCard", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock);

    render(<ProductCard />);
    const loading =  screen.getByText(/loading\.\.\./i)
    expect(loading).toBeInTheDocument()

    const text = screen.queryByLabelText("Samuca")

    expect(text).not.toBeInTheDocument()

    await waitFor(() => {});
    screen.logTestingPlaygroundURL();
  });
  test("Deve renderizar o titulo, imagem, descrição e preço", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock);

    render(<ProductCard />);
 
    await waitFor(() => {
        const title = screen.getByRole('heading', {
            name: /samuca/i
          })
          const img = screen.getByRole('img', {
            name: /thumbnail for samuca/i
          })

          const descricao = screen.getByText(/dev senhor/i)

          const price = screen.getByText(/\$1\.99/i)

          expect(title).toBeInTheDocument()
          // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
          expect(img).toBeInTheDocument()
          expect(descricao).toBeInTheDocument()
          expect(price).toBeInTheDocument()

        });

        const loading =  screen.queryByText(/loading\.\.\./i)
        expect(loading).not.toBeInTheDocument()
        
        const thumbnail = screen.getByRole('img', {
            name: /thumbnail for samuca/i
          })
    
          
    
          /* expect(await screen.findByText(thumbnail)).toBeInTheDocument();
        screen.logTestingPlaygroundURL(); */
      });

});
