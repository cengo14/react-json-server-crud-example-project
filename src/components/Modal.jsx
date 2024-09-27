import { toast } from "react-toastify";
import api from "../utils/api";

const Modal = ({ close, todo, setTodos }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTitle = e.target[0].value;
    const newStatus = e.target[1].value;
    if (!newTitle.trim()) {
      toast.warn("Bir içeriği doldurunuz");
      return;
    }
    api
      .patch(`/todos/${todo.id}`, {
        title: newTitle,
        status: newStatus,
      })
      .then((res) => {
        setTodos((prev) =>
          prev.map((item) => (item.id == res.data.id ? res.data : item))
        );
        toast.success("İçerik güncellendi");
      })
      .catch((error) => toast.error("Bir sorun oluştu"));
    close();
  };
  return (
    <div className="modal d-block bg-black bg-opacity-75">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Listeyi Düzenle</h5>
            <button onClick={close} className="btn-close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="d-flex gap-2 mb-3">
                <input
                  type="text"
                  className="form-control shadow w-75"
                  defaultValue={todo.title}
                />
                <select
                  defaultValue={todo.status}
                  className="form-select shadow w-25"
                >
                  <option value="personal">Kişisel</option>
                  <option value="job">İş</option>
                  <option value="important">Önemli</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  onClick={close}
                  type="button"
                  className="btn btn-secondary"
                >
                  İptal Et
                </button>
                <button type="submit" className="btn btn-primary">
                  Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
