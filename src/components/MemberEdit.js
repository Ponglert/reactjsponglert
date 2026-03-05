import React, { useState, useEffect } from "react";
import {
  db,
  doc,
  getDocs,
  updateDoc,
  collection,
  deleteDoc,
} from "./firebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";

const MemberEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [id_mem, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [docId, setDocId] = useState("");

  const { id } = location.state || {};

  const fetchMember = async () => {
    const querySnapshot = await getDocs(collection(db, "members"));
    const memberData = querySnapshot.docs.find(doc => doc.data().id_mem === id);
    if (memberData) {
      const data = memberData.data();
      setId(data.id_mem);
      setName(data.name_mem);
      setEmail(data.email_mem);
      setPassword(data.password_mem);
      setDocId(memberData.id); // เก็บ docId ของ Firestore
    }
  };

  useEffect(() => {
    fetchMember();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm("ยืนยันการบันทึกข้อมูล");
    if (userConfirmed) {
      await updateDoc(doc(db, "members", docId), {
        name_mem: name,
        email_mem: email,
        password_mem: password,
      });
      navigate("/");
    }
  };

  const handledel = async () => {
    const userConfirmed = window.confirm("ยืนยันการลบข้อมูล");
    if (userConfirmed) {
      await deleteDoc(doc(db, "members", docId));
      navigate("/");
    }
  };

  const handlecancel = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Member</h2>
      <form onSubmit={handleEdit}>
        <div>
          <input
            type="hidden"
            value={id_mem}
            onChange={(e) => setId(e.target.value)}
          />
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
      <button onClick={() => handledel()}>Delete</button>
      <button onClick={() => handlecancel()}>Cancel</button>
    </div>
  );
};

export default MemberEdit;
