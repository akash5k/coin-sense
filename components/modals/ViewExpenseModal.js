import { useContext } from "react";

import Modal from "../Modal";
import { financeContext } from "/lib/store/finance-context";

import { currencyFormatter, formatDate } from "../../lib/utils";
import { FaRegTrashAlt } from "react-icons/fa";

function ViewExpenseModal({ show, onClose, expense }) {

    const {deleteExpenseItem, deleteExpenseCategory} = useContext(financeContext);
  // destructure the props object

    const deleteExpenseHandler = async () =>{
        try {
            await deleteExpenseCategory(expense.id)
        } catch (error) {
            console.log(error.message)
        }
    }

  const deleteExpenceItemHandler = async (item) =>{
    try {
        //remove the itm from the list
        const updatedItems = expense.items.filter((i) => i.id !== item.id)

        //upddated the expenses balance
        const updateExpenses = {
            items:[...updatedItems],
            total: expense.total - item.amount
        }
        await deleteExpenseItem(updateExpenses,expense.id)
    } catch (error) {
        console.log(error.message)
    }
  }
  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">{expense.title}</h2>
        <button
        className="red_btn"
        onClick={deleteExpenseHandler}>
        Delete
        </button>
      </div>
      <div>
        <h3 className="my-4 text-2xl">Expense History</h3>

        {expense.items.map((item) => {
          const formattedDate =
            item.createdAt.toMillis
              ? formatDate(new Date(item.createdAt.toMillis()))
              : formatDate(new Date(item.createdAt));

          return (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex flex-col">
              <h3>{item.desc}</h3>
              <small>{formattedDate}</small>
              </div>
              <p className="">
                {currencyFormatter(item.amount)}
                <button
                onClick={() => {
                    deleteExpenceItemHandler(item)
                }}>
                <FaRegTrashAlt/>
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
