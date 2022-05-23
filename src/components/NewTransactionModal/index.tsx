import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import { useTransactions } from "../../hooks/useTransactions";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

import {Container, RadioBox, TransactionsTypeContainer} from './styles'

interface NewTransactionModalProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}
export function NewTransactionModal({
  onClose,
  isOpen}
: NewTransactionModalProps) {
  //context
  const { createTransaction } = useTransactions();
  //inputs
  const [title,setTitle] = useState('');
  const [category,setCategory] = useState('');
  const [amount,setAmount] = useState(0);
  const [type, setType] = useState('');
  //
  
  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    await createTransaction({
      amount,
      category,
      title,
      type,
    });
    setTitle('');
    setAmount(0);
    setCategory('');
    setType('');
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={onClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar nova transação</h2>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <TransactionsTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionsTypeContainer>
        <input
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}