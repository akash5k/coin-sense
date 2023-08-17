import { useContext } from "react";

import Modal from "../Modal";
import { financeContext } from "/lib/store/finance-context";

import { currencyFormatter, formatDate } from "../../lib/utils";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function ViewExpenseModal({ show, onClose, expense }) {
  const { deleteExpenseItem, deleteExpenseCategory } =
    useContext(financeContext);
  // destructure the props object

  const deleteExpenseHandler = async () => {
    try {
      await deleteExpenseCategory(expense.id);
      toast.success("Expense category deleted successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteExpenceItemHandler = async (item) => {
    try {
      //remove the itm from the list
      const updatedItems = expense.items.filter((i) => i.id !== item.id);

      //upddated the expenses balance
      const updateExpenses = {
        items: [...updatedItems],
        total: expense.total - item.amount,
      };
      await deleteExpenseItem(updateExpenses, expense.id);
      toast.success("Expense deleted sucessfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl capitalize">{expense.title}</h2>
        {/* <button
        className="red_btn"
        onClick={deleteExpenseHandler}>
        Delete
        </button> */}
        <button class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
         onClick={deleteExpenseHandler}
         >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
      <div>
        <h3 className="mb-3 text-xs font-light text-gray-400">
          Expense History
        </h3>

        {expense.items.map((item) => {
          const formattedDate = item.createdAt.toMillis
            ? formatDate(new Date(item.createdAt.toMillis()))
            : formatDate(new Date(item.createdAt));

          return (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex flex-col p-2">
                <h3 className="capitalize">{item.desc}</h3>
                <small className="text-xs text-gray-500">{formattedDate}</small>
              </div>
              <p className="flex gap-2">
                {currencyFormatter(item.amount)}
                <button
                  onClick={() => {
                    deleteExpenceItemHandler(item);
                  }}
                >
                  <FaRegTrashAlt />
                </button>
                
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default ViewExpenseModal;
