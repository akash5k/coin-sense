"use client";

import { useState, useContext, useEffect } from "react";
import { financeContext } from "../lib/store/finance-context";
import { authContext } from "../lib/store/auth-context";
import { DarkModeContext } from "../lib/store/dark-mode-context";
import {CiWallet} from "react-icons/ci"
import {VscGraphLine,VscPieChart} from "react-icons/vsc"

import { currencyFormatter } from "../lib/utils";
import ExpenseCategoryItem from "../components/ExpenseCategoryItem";

import AddIncomeModal from "../components/modals/AddIncomeModal";
import AddExpensesModal from "../components/modals/AddExpensesModal";

import SignIn from "../components/auth-page";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

//firebase
import { db } from "../lib/firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

//icons
import { FaRegTrashAlt } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showAddIncomemodal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  const [balance, setBalance] = useState(0);

  const { expenses, income } = useContext(financeContext);
  const { user } = useContext(authContext);

  useEffect(() => {
    const newbalance =
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.total;
      }, 0);

    setBalance(newbalance);
  }, [expenses, income]);

  if (!user) {
    return <SignIn />;
  }

  return (
    <>
      <AddIncomeModal
        show={showAddIncomemodal}
        onClose={setShowAddIncomeModal}
      />

      <AddExpensesModal
        show={showAddExpenseModal}
        onClose={setShowAddExpenseModal}
      />

      <main className="container max-w-2xl px-6 mx-auto">
        <section>
          <small className="text-gray-500 dark:text-gray-300 text-md">My Balance <CiWallet className="inline "/></small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>

        <section className="pt-4">
          <button
            onClick={() => {
              setShowAddExpenseModal(true);
            }}
            className="red_btn"
          >
            + Expense
          </button>

          <button
            onClick={() => {
              setShowAddIncomeModal(true);
            }}
            className="green_btn mx-4"
          >
            + Income
          </button>
        </section>

        {/*expenses*/}
        <section className="py-6">
          <h3 className="text-2xl font-bold">My Expenses <VscGraphLine className="inline ml-2"/></h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.length === 0 ? (
              <p className="text-gray-500">
                No expenses to display. Add some expenses!
              </p>
            ) : (
              expenses.map((expense) => {
                return (
                  <ExpenseCategoryItem key={expense.id} expense={expense} />
                );
              })
            )}
          </div>
        </section>

        {/**Chart Section */}
        <section className="mb-[50px]">
          <a id="stats" />
          <h3 className="text-2xl font-bold">Stats <VscPieChart className="inline "/></h3>
          <div className="w-full md:w-1/2 mx-auto">
            <Doughnut
              className="mx-auto"
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
                    borderColor: ["#fff"],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
