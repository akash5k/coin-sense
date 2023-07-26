import { useState } from "react";

import { currencyFormatter } from "../lib/utils";
import ViewExpenseModal from "./modals/ViewExpenseModal";

function ExpenceCategoryItem({ expense }) {

const [viewExpenseModal, setViewExpenseModal] = useState(false)

  return (
    <>
    <ViewExpenseModal 
      show={viewExpenseModal}
      onClose={setViewExpenseModal}
      expense = {expense}
    />

    <button 
    className="expence-card"
    onClick={()=>setViewExpenseModal(true)}
    >

    <div className="flex items-center justify-between px-4 py-4 bg-red-300 rounded-3xl">
      <div className="flex items-center gap-2">
        <div
          className="w-[25px] h-[25px] rounded-full"
          style={{ backgroundColor: expense.color }}
        />
        <h4 className="capitalize">{expense.title}</h4>
      </div>
      <p>{currencyFormatter(expense.total)}</p>
    </div>
    </button>
    </>
  );  
}

export default ExpenceCategoryItem;
