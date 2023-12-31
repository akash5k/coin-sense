import { useState, useContext, useRef } from "react";
import { financeContext } from "/lib/store/finance-context";

import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import Modal from "../Modal";

function AddExpensesModal({ show, onClose }) {
  const [expenceAmount, setExpenceAmount] = useState("");
  const [expenceDescription, setExpenceDescription] = useState("");
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
      setExpenceDescription("");
      setselectedCategory("");
      onClose();
      toast.success("Expense item added!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const addCategoryHandler = async () => {
    const title = titleRef.current.value;
    const color = colorRef.current.value;

    try {
      await addCategory({ title, color, total: 0 });
      setShowAddExpense(false);
      toast.success("Categort created!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <Modal show={show} onClose={onClose}>
      <h1 className="text-2xl font-bold pb-2 text-center">Add Expense</h1>
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
          placeholder="Expense description (optional)"
          value={expenceDescription}
          onChange={(e) => {
            setExpenceDescription(e.target.value);
          }}
        />
      </div>

      {/* Expence Categories */}
      {expenceAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6 ">
          <div className="flex items-center justify-between">
            <h3 className="text-xl capitalize">Select expense category</h3>
            <button
              onClick={() => setShowAddExpense(true)}
              className="text text-green-600"
            >
              + New Category
            </button>
          </div>

          {showAddExpense && (
            <div className="flex flex-col md:flex-row items-center justify-between">
              <input
                className="mb-2 md:mb-0 md:mr-2 w-full md:w-auto px-4 py-2 bg-gray-100 rounded-xl"
                type="text"
                placeholder="Enter Title"
                ref={titleRef}
              />

              <div className="mb-2 md:mb-0 md:mr-2 ">
                <label htmlFor="color" className="pr-2">
                  Pick Color
                </label>
                <input
                  name="color"
                  type="color"
                  className="w-20 h-10 rounded-sm "
                  ref={colorRef}
                />
              </div>

              <div>
                <button
                  onClick={addCategoryHandler}
                  className="green_btn mb-2 md:mb-0 md:mr-2"
                >
                  Create
                </button>

                <button
                  onClick={() => setShowAddExpense(false)}
                  className="red_btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className="custom-scrollbar-x overflow-y-hidden flex gap-3 h-28">
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
                    // boxShadow: expense.id === selectedCategory ? "2px 2px 5px" : "none",
                    backgroundColor:
                      expense.id === selectedCategory
                        ? "#06b6d4"
                        : null,
                  }}
                  className="flex items-center justify-between px-4 py-4 bg-light-secondary dark:bg-dark-secondary rounded-2xl text-white"
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
        </div>
      )}

      {expenceAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button onClick={addExpenseItemHandler} className="red_btn">
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
}

export default AddExpensesModal;
