import axios from "axios";
import { useEffect } from "react";
import { Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import cardService from "services/cardService";
//  DELETE /api/cards/:id
const DeleteCard = () => {
  const history=useHistory();

  let { id } = useParams();

  useEffect(() => {
    (async () => {
      await cardService.deleteCard(`${id}`);
      history.push("/mycards");
      // await axios
      //   .delete(`/cards/${id}`)
      //   .then((res) => console.log("deleted card", res))
      //   .catch((err) => console.log("err from delete card", err));
    })();
  }, []);


  return (
    <Fragment>
      <h1>Delete card</h1>
    </Fragment>
  )
 
};
export default DeleteCard;
