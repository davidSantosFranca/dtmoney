import { useState } from "react";
import Modal from "react-modal";

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement('#root');

export function App() {
  const [isModalNewTransactionOpen, setIsModalNewTransactionOpen] = useState(false);

  function handleCloseModalNewTransaction() {
    setIsModalNewTransactionOpen(false);
  }

  function handleOpenModalNewTransaction() {
    setIsModalNewTransactionOpen(true);
  }

  return (
    <TransactionsProvider>
      <Header
        onCloseModalNewTransaction={handleCloseModalNewTransaction}
        onOpenModalNewTransaction={handleOpenModalNewTransaction}
      />
      <Dashboard />

      <NewTransactionModal
        onClose={handleCloseModalNewTransaction}
        onOpen={handleOpenModalNewTransaction}
        isOpen={isModalNewTransactionOpen}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}

export default App;
