"use client";

import { useState } from "react";

import { currencyFormatter } from "@/lib/utils";
import ExpenceCategoryItem from "@/components/ExpenceCategoryitem";

import AddIncomeModal from "@/components/modals/AddIncomeModal";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

//firebase
import { db } from "@/lib/firebase";
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

const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertainment",
    color: "#000",
    total: 500,
  },
  {
    id: 2,
    title: "Gass",
    color: "#009",
    total: 1000,
  },
  {
    id: 3,
    title: "Movies",
    color: "#000",
    total: 300,
  },
  {
    id: 4,
    title: "Fuel",
    color: "#000",
    total: 1000,
  },
];

export default function Home() {

  
  const [showAddIncomemodal, setShowAddIncomeModal] = useState(false);

  return (
    <>
      <AddIncomeModal
        show={showAddIncomemodal}
        onClose={setShowAddIncomeModal}       
      />
      <main className="container max-w-2xl px-6 mx-auto">
        <section>
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(2000000)}</h2>
        </section>

        <section className="pt-4">
          <button
            onClick={() => {
              // setModalisopen(true);
            }}
            className="red_btn"
          >
            + Expence
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

        {/*Expences*/}
        <section className="py-6">
          <h3 className="text-2xl">My Expences</h3>
          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_DATA.map((expence) => {
              return (
                <ExpenceCategoryItem
                  key={expence.id}
                  color={expence.color}
                  title={expence.title}
                  total={expence.total}
                />
              );
            })}
          </div>
        </section>

        {/**Chart Section */}
        <section>
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: DUMMY_DATA.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: DUMMY_DATA.map((expence) => expence.total),
                    backgroundColor: DUMMY_DATA.map((expence) => expence.color),
                    borderColor: ["#fff"],
                    borderWidth: 5,
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
