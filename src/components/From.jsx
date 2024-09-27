import React, { useEffect } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

function From({ setTodos }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    const status = e.target[1].value;
    if (!value.trim()) {
      toast.warning("Lütfen içerik giriniz");
      return;
    }
    const newTodo = {
      title: value,
      status: status,
      date: new Date().toLocaleString("en-us"),
    };
    api
      .post("/todos", newTodo)
      .then((res) => {
        setTodos((todos) => [res.data, ...todos]);
        toast.success("Not ekleme başarılı");
      })
      .catch((error) => toast.error("Bir sorun oluştu"));

    e.target.reset();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center gap-3 my-5"
    >
      <input type="text" className="form-control" placeholder="Not ekle" />
      <select className="form-select w-50 shadow">
        <option value="personal">Kişisel</option>
        <option value="job">İş</option>
        <option value="important">Önemli</option>
      </select>
      <button className="btn btn-primary shadow"> Ekle</button>
    </form>
  );
}

export default From;
