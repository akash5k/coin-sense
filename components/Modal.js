import { AiFillCloseCircle } from "react-icons/ai";
function Modal({ show, onClose, children }) {
  return (
    <div
      style={{
        transform: show ? "scale(1)" : "scale(0)",
        transformOrigin: "center",
      }}
      className="absolute top-0 left-0 w-full h-full z-10 transition-all duration-500"
    >
      {show && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black backdrop-blur-sm bg-opacity-50 py-10">
          <div className="max-h-full w-full max-w-3xl overflow-y-auto sm:rounded-2xl bg-white relative">
            <AiFillCloseCircle
              onClick={() => {
                onClose(false);
              }}
              className="absolute top-2 right-2 w-8 h-8 cursor-pointer	"
            />

            <div className="w-full">
              {/* <div className="px-10 py-5 my-10 mx-auto max-w-[900px]">{children}</div> */}
              <div className="px-10 py-5 my-10 mx-auto max-w-[900px]">{children}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
