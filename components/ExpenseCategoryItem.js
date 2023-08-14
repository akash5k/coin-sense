import { useState } from "react";
import { currencyFormatter } from "../lib/utils";
import ViewExpenseModal from "./modals/ViewExpenseModal";

function ExpenceCategoryItem({ expense }) {
  const [viewExpenseModal, setViewExpenseModal] = useState(false);

  return (
    <>
      <ViewExpenseModal
        show={viewExpenseModal}
        onClose={() => setViewExpenseModal(false)}
        expense={expense}
      />

      <button
        className="relative focus:outline-none"
        onClick={() => setViewExpenseModal(true)}
      >
        <div className="group p-4 rounded-3xl text-gray-400 hover font-bold backdrop-blur ">
          <div className="absolute inset-0 bg-gray-800 rounded-3xl"></div>
          <div className="relative z-10 flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: expense.color }}
              />
              <h4 className="capitalize">{expense.title}</h4>
            </div>
            <p>{currencyFormatter(expense.total)}</p>
          </div>
        </div>
      </button>
    </>
  );
}

export default ExpenceCategoryItem;
