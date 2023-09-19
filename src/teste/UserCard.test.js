import { findByText, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import UserCard from "../components/UserCard";

jest.mock("axios");

const axiosResponseMock = {
  data: {
    firstName: "John",
    lastName: "Smith",
    bank: {
      cardNumber: "123",
      cardExpire: "xxx",
    },
  },
};

describe(" Deve renderizar o card", () => {
  test("Deve renderizar e remover o Loading de Card", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock);

    render(<UserCard />);

    const loading = screen.getByText(/loading\.\.\./i);
    expect(loading).toBeInTheDocument();

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
      screen.logTestingPlaygroundURL();
    });
  });
   test("deve renderizar nome, sobrenome, numero do cartão e data de validade", async ()=>{
        axios.get.mockResolvedValueOnce(axiosResponseMock);

        render(<UserCard/>);
        await waitFor(() => {
            screen.logTestingPlaygroundURL();
            const name = screen.getByText(/john smith/i)
              const nCard = screen.getByText(/labebank/i)
    
              const validade = screen.getByText(/xxx/i)
    
              
    
              expect(name).toBeInTheDocument()
              // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
              expect(nCard).toBeInTheDocument()
              expect(validade).toBeInTheDocument()
              
    
            });
      })
});

/* {user.firstName} ${user.lastName}

(user.bank.cardNumber)

{user.bank.cardExpire} */
