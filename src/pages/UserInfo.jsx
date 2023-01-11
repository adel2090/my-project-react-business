import axios from "axios";

const UserInfo = () => {
  return (
    //GET /api/users/userInfo
    axios.get("/users/userInfo")
  );
};
export default UserInfo;
