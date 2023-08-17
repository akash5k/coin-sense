import { AiFillCloseCircle } from "react-icons/ai";
import { useState, useEffect, useContext } from "react";
import { DarkModeContext } from "../lib/store/dark-mode-context";

function Modal({ show, onClose, children }) {
  const [modalVisible, setModalVisible] = useState(show);
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    setModalVisible(show);
  }, [show]);

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      onClose(false);
    }, 300);
  };

  return (
    <div
      style={{
        opacity: modalVisible ? 1 : 0,
        pointerEvents: modalVisible ? "auto" : "none",
        transform: modalVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
        transformOrigin: "center",
        transition: "opacity 0.3s ease-in-out, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="flex items-center justify-center h-screen">
            <div className={`max-w-3xl mx-auto rounded-2xl overflow-hidden w-screen m-6 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
              <div className="flex justify-end">
                <AiFillCloseCircle
                  onClick={closeModal}
                  className="w-12 h-12 p-2 cursor-pointer hover:bg-gray-100 transition-all"
                />
              </div>
              <div className="p-8 pt-2">{children}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
