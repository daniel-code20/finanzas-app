import { createContext, ReactNode, useContext, useState } from "react";

type Transaction = {
  id: string;
  type: "ingreso" | "gasto";
  title: string;
  amount: number;
  date: string;
  bgColor: string;
};

type TransactionsContextType = {
  transactions: Transaction[];
  addTransaction: (
    title: string,
    amount: string,
    type: "ingreso" | "gasto",
    date: Date
  ) => void;
};

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

const bgColors = ["#fff3ee9a", "#faffce98", "#d0ecff94"];

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (
    title: string,
    amount: string,
    type: "ingreso" | "gasto",
    date: Date
  ) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount) * (type === "gasto" ? -1 : 1),
      type,
      date: date.toISOString(),
      bgColor: type === "ingreso" ? "#e5ffe5ff" : "#ffe7e7ff",
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context)
    throw new Error(
      "useTransactions debe usarse dentro de TransactionsProvider"
    );
  return context;
};
