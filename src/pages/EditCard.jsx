import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import validate from "validation/validation";
import cardSchema from "validation/card.validation";
import cardService from "services/cardService";
import { toast } from "react-toastify";
const EditCard = () => {
  const history=useHistory();
    const [userInputCard, setUserInputCard] = useState({
      title: "",
      subTitle: "",
      description: "",
      address: "",
      phone: "",
      url:"",
      alt:"",
    });

  //get id of cards who we want to edit
  let { id } = useParams();

  //get data of card
  useEffect(() => {
    (async () => {
      let{data}=await cardService.getCard(`${id}`);
      setUserInputCard(mapToView(data));
      //let { data } = await axios.get(`/cards/card/${id}`);
      // setUserInputCard({
      //   title:data.title,
      //   subTitle:data.subTitle,
      //   description:data.description,
      //   address:data.address,
      //   phone:data.phone,
      //   url:data.image?.url,
      //   alt:data.image?.alt
      // })
    })();
  }, []);

  const mapToView=(card)=>{
    return {
      _id:card._id,
      title:card.title,
        subTitle:card.subTitle,
        description:card.description,
        address:card.address,
        phone:card.phone,
        url:card.image?.url,
        alt:card.image?.alt
    }

  }

    const handleUserInputCardChange = (ev) => {
      let copyUserInputCard = JSON.parse(JSON.stringify(userInputCard));
      copyUserInputCard[ev.target.id] = ev.target.value;
      setUserInputCard(copyUserInputCard);
    };

    const handleEditCardSubmit = async(ev) => {
      ev.preventDefault();

      const { error } = validate(userInputCard, cardSchema);
      console.log("error validation:", { error });
      if (error) {
        let massageError = "";
        for (let itemError of error.details) {
          switch (itemError.type) {
            case "string.min":
              massageError += `${itemError.context.label} length must be at least ${itemError.context.limit} characters long`;
              break;
            case "string.max":
              massageError += `${itemError.context.label} length must be less than or equal to ${itemError.context.limit} characters long`;
              break;
            default:
              massageError += "massage error dont have type";
              break;
          }
        }
        console.log("massage error type:", massageError);
      }
      console.log("here to update");

      await cardService.editCard(userInputCard);
      toast.success("Card is Update!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      history.push("/mycards")

      // axios
      //   .put(`/cards/${id}`,userInputCard)
      //   .then((res) => console.log("update card", res))
      //   .catch((err) => console.log("error update card", err));
    };

    const handleCancelClick=()=>{
      history.push("/mycards");
    }

    return (
      <Fragment>
        <form onSubmit={handleEditCardSubmit}>
          <h1>Edit your card</h1>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="title"
              value={userInputCard.title}
              onChange={handleUserInputCardChange}
            />
            <label htmlFor="title">title</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="subTitle"
              placeholder="subTitle"
              value={userInputCard.subTitle}
              onChange={handleUserInputCardChange}
            />
            <label htmlFor="subTitle">subTitle</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="description"
              value={userInputCard.description}
              onChange={handleUserInputCardChange}
            />
            <label htmlFor="description">description</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="address"
              value={userInputCard.address}
              onChange={handleUserInputCardChange}
            />
            <label htmlFor="address">address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="phone"
              value={userInputCard.phone}
              onChange={handleUserInputCardChange}
            />
            <label htmlFor="phone">phone</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="url"
              placeholder="url"
              value={userInputCard.url}
              onChange={handleUserInputCardChange}
            />
            <label htmlFor="url">url</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="alt"
              placeholder="alt"
              value={userInputCard.alt}
              onChange={handleUserInputCardChange}
            />
            <label htmlFor="alt">alt</label>
          </div>

          <button className="btn btn-info">Update Card</button>
          <button className="btn btn-info" onClick={handleCancelClick}>Cancle</button>
        </form>
      </Fragment>
    );
};

export default EditCard;
