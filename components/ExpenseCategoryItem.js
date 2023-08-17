import { useState , useContext} from "react";
import { currencyFormatter } from "../lib/utils";
import ViewExpenseModal from "./modals/ViewExpenseModal";

import { DarkModeContext } from "../lib/store/dark-mode-context";


function ExpenceCategoryItem({ expense }) {
  const [viewExpenseModal, setViewExpenseModal] = useState(false);  
  const { isDarkMode } = useContext(DarkModeContext);

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
        <div className={`group p-4 rounded-3xl  hover font-bold backdrop-blur ${isDarkMode ? 'text-gray-200' : 'text-white'} `}>
        <div className={`absolute inset-0 rounded-3xl ${isDarkMode ?  'bg-[#4A4458]' : 'bg-[#264653]' }`}></div>
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
