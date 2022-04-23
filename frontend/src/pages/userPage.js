import {useContext} from "react";
import AuthContext from "../context/AuthContext";

const UserPage = () => {
    let {name} = useContext(AuthContext);
    return <div>
        <p>
            User page, hello {name}
        </p>
    </div>
}

export default UserPage;