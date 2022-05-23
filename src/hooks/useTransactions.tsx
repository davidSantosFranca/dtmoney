import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";


interface Transaction {
  id: number;
  type: string;
  amount: number;
  title: string;
  category: string;
  createdAt: string;
}
type TransactionInput = Omit<Transaction, 'id'|'createdAt'>;

interface TransactionsProviderProps{
  children: ReactNode;
}

interface TransactionsContextData{
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
  );

export function TransactionsProvider({children}:TransactionsProviderProps){
  const [transactions,setTransactions] = useState<Transaction[]>([])
  
  useEffect(() => {
     api.get('transactions')
     .then(res=> setTransactions(res.data.transactions))
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const res = await api.post("/transactions", {...transactionInput, createdAt: new Date()});
    const {transaction} = res.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions(){
  const contex = useContext(TransactionsContext);
  return contex;
}