function Modal({show, onClose, children}) {
    // useing props show and onClose for isModalOpen
    //  and setModalisOpen passed from ..-..
  return (
    <div
      style={{
        transform: show ? "translateX(0%)" : "translateX(-200%)",
      }}
      className="absolute top-0 left-0 w-full h-full z-10 transition-all duration-500"      
    >
      <div className="container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-slate-600 py-6 px-4">
        <button
          onClick={() => {
            onClose(false)
            
          }}
          className="hover w-10 h-10 mb-4 font-bold rounded-full bg-slate-400"
        >
          X
        </button>
        {/* <div className="scrollable-div max-h-[60vh] overflow-y-auto">
          
        </div> */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
