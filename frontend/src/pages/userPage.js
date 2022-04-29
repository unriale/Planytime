import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Sidebar from "../components/User/Sidebar/Sidebar";

const UserPage = () => {
  let { logoutUser, authTokens } = useContext(AuthContext);
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/notes/", {
      method: "GET",
      headers: {
        "Content-Type": "applications/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });

    let data = await response.json();

    if (response.status === 200) {
      setNotes(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div>
      <Sidebar />
      <p>User page, hecllo</p>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>
      <p onClick={logoutUser}>Logout</p>
    </div>
  );
};

export default UserPage;
