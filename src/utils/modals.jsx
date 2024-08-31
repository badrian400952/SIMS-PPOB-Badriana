import logo from "../assets/Logo.png";
export function Modal({ isOpen, title, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <dialog
      open
      className="modal w-[300px] h-auto fixed left-1/2 top-1/6 transform -translate-x-1/2"
    >
      <div className="modal-box">
        <div className="flex justify-center">
          <img src={logo} alt="avatar" className="rounded-full" />
        </div>
        <p className="py-4 text-center">{title}</p>
        <div className="modal-action flex justify-center">
          <button
            className="btn bg-red-500 hover:bg-red-600 text-white"
            type="button"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            className="btn bg-green-500 hover:bg-green-600 text-white"
            type="button"
            onClick={onSubmit}
          >
            Kirim
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
