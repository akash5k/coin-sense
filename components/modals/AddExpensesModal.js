import { useState, useContext, useRef } from "react";
import { financeContext } from "/lib/store/finance-context";

import { v4 as uuidv4 } from "uuid";

import Modal from "../Modal";

function AddExpensesModal({ show, onClose }) {
  const [expenceAmount, setExpenceAmount] = useState("");
  const  [expenceDescription, setExpenceDescription] = useState("");
  const [selectedCategory, setselectedCategory] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const { expenses, addExpenseItem, addCategory } = useContext(financeContext);

  const titleRef = useRef();
  const colorRef = useRef();

  const addExpenseItemHandler = async () => {
    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenceAmount, //convert string type(expenseAmount by adding +)
      items: [
        ...expense.items,
        {
          amount: +expenceAmount,
          desc: expenceDescription,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    try {
      await addExpenseItem(selectedCategory, newExpense);

      console.log(newExpense);
      setExpenceAmount("");
      setExpenceDescription("")
      setselectedCategory("");
      onClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  const addCategoryHandler = async () =>{
    const title = titleRef.current.value;
    const color = colorRef.current.value;

    try {
      await addCategory({title,color,total:0})
    } catch (error) {
      console.log(error.message)
    }

  }
  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label>Enter an amount</label>
        <input
          type="number"
          placeholder="Enter expense amount"
          value={expenceAmount}
          onChange={(e) => {
            setExpenceAmount(e.target.value);
          }}
        />        
        <label>Enter expence description</label>
        <input
          type="text"
          placeholder="Enter desc"
          value={expenceDescription}
          onChange={(e) => {
            setExpenceDescription(e.target.value);
          }}
        />
        
      </div>

      {/* Expence Categories */}
      {expenceAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl capitalize">Select expense category</h3>
            <button
              onClick={() => setShowAddExpense(true)}
              className="text text-lime-400"
            >
              + New Category
            </button>
          </div>

          {showAddExpense && (
            <div className="flex items-center justify-between">
              <input type="text" placeholder="Enter Title" ref={titleRef} />

              <label>Pick Color</label>
              <input type="color" className="w-24 h-10" ref={colorRef} />

              <button 
              onClick={addCategoryHandler}
              className="green_btn">
              Create
              </button>

              <button
                onClick={() => setShowAddExpense(false)}
                className="red_btn"
              >
                Cancel
              </button>
            </div>
          )}

          {expenses.map((expense) => {
            return (
              <button
                key={expense.id}
                className="hover"
                onClick={() => {
                  setselectedCategory(expense.id);
                }}
              >
                <div
                  style={{
                    boxShadow:
                      expense.id === selectedCategory ? "1px 1px 4px" : "none",
                  }}
                  className="flex items-center justify-between px-4 py-4 bg-slate-400 rounded-3xl"
                >
                  <div className="flex items-center gap-2">
                    {/* colored circle */}
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{
                        backgroundColor: expense.color,
                      }}
                    />
                    <h4>{expense.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {expenceAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button onClick={addExpenseItemHandler} className="red_btn hover">
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
}

export default AddExpensesModal;
