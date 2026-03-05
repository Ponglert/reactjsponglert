import React, { useState } from "react";
import { db, collection, addDoc } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

const MemberInsert = () => {
  const [id, setID] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm("ยืนยันการบันทึกข้อมูล");
    if (userConfirmed) {
      await addDoc(collection(db, "members"), {
        id_mem: Number(id),
        name_mem: name,
        email_mem: email,
        password_mem: password
      });
      navigate("/");
    }
  };

  const handlecancel = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Add Member</h2>
      <form onSubmit={handleAdd}>
      <div>
          <label>ID:</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setID(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="ponglert.s@ubru.ac.th"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
      <button onClick={() => handlecancel()}>Cancel</button>
    </div>
  );
};

export default MemberInsert;
