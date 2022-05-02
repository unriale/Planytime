
import Sidebar from "../components/User/Sidebar/Sidebar";
import Calendar from "../components/User/Calendar/Calendar";

const UserPage = () => {

  return (
    <div>
      <Sidebar />
      <Calendar/>
      <p>User page</p>
      {/* <p>User page, hecllo</p>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ul> */}
      {/* <p onClick={logoutUser}>Logout</p> */}
    </div>
  );
};

export default UserPage;
