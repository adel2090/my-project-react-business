import axios from "axios";
import { useState } from "react";
import { Fragment } from "react";
import validate from "validation/validation";
import cardSchema from "validation/card.validation";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import cardService from "../services/cardService";

const CreateCard = () => {
  const history = useHistory();
  const [userInputCard, setUserInputCard] = useState({
    title: "",
    subTitle: "",
    description: "",
    address: "",
    phone: "",
    url: "",
    alt: "",
  });

  const handleUserInputCardChange = (ev) => {
    let copyUserInputCard = JSON.parse(JSON.stringify(userInputCard));
    copyUserInputCard[ev.target.id] = ev.target.value;
    setUserInputCard(copyUserInputCard);
  };

  const handleCreateCardSubmit = async (ev) => {
    ev.preventDefault();
    if (!userInputCard.url) delete userInputCard.url;
    //validation
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
    try {
      await cardService.creatCard(userInputCard);
      toast.success("A new account is opened!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      history.push("/mycards");
    } catch (error) {
     
      toast.error("Create Card is failed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    // await creatcardfun({userInputCard}).then((res) => console.log("created card", res))
    // .catch((err) => console.log("error creat card", err));
    // axios
    //   .post("/cards/", userInputCard)
    //   .then((res) => {
    //     toast.success("A new account is opened!", {
    //       position: "top-center",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });
    //     history.push("/cardspage");
    //   })
    //   .catch((err) => console.log("error creat card", err));
  };

  return (
    <Fragment>
      <form onSubmit={handleCreateCardSubmit}>
        <h1>Create your card</h1>
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

        <button className="btn btn-info">CreateCard</button>
      </form>
    </Fragment>
  );
};

export default CreateCard;
