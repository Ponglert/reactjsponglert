import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, collection, getDocs, deleteDoc, doc } from "./firebaseConfig";

const MemberSearch = () => {
  const navigate = useNavigate(); 
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const querySnapshot = await getDocs(collection(db, "members"));
    setResults(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const filteredMembers = results.filter((member) =>
    member.name_mem.toLowerCase().includes(name.toLowerCase())
  );

  useEffect(() => {
    handleSearch(); 
  }, []);

  const handleEdit = (id_mem) => {
    navigate("/edit", {
      state: { id: id_mem },
    });
  };
  const handleAdd = () => {
    navigate("/insert");
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      <button onClick={() => handleAdd()}>Add</button>
      <table border="1">
        <thead>
          <tr>
            <th>ID ผู้ใช้</th>
            <th>ชื่อ-นามสกุล</th>
            <th>E-mail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.id_mem}>
              <td>{member.id_mem}</td>
              <td>{member.name_mem}</td>
              <td>{member.email_mem}</td>
              <td>
                <button onClick={() => handleEdit(member.id_mem)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberSearch;
