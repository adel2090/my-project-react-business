import BusinessCard from "components/businessCard/BusinessCard.components";
import PageHeader from "components/common/PageHeader";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import cardService from "services/cardService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify";

let cardsArray = [];

const MyCards = () => {
  const history = useHistory();
  const [cards, setCards] = useState(cardsArray);
  const [findInput, setFindInput] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await cardService.getMyCard();
        if (data.length > 0) {
          // setCards(data);
          cardsArray = data;
          setCards(cardsArray);
        }
      } catch (error) {
        toast.error("MyCard is failed", {
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
    })();
  }, []);

  useEffect(() => {
    const regex = new RegExp(findInput, "i");
    let copyBizCardArray = JSON.parse(JSON.stringify(cardsArray));
    copyBizCardArray = copyBizCardArray.filter((item) =>
      regex.test(item.title)
    );
    setCards(copyBizCardArray);
  }, [findInput]);

  const handleFindInputChange = (ev) => {
    setFindInput(ev.target.value);
  };

  const handleAddNewCard = () => {
    history.push("/createcard");
  };

  return (
    <div className="container">
      <PageHeader titlePage="My Cards Page" />
      <br/>
      <div className="form-floating mb-3">
        <input
          type="search"
          className="form-control"
          id="find"
          placeholder="name@example.com"
          value={findInput}
          onChange={handleFindInputChange}
        />
        <label htmlFor="find">Find</label>
      </div>

      <button type="button" className="btn btn-success" onClick={handleAddNewCard}><FontAwesomeIcon icon={faCirclePlus} /></button>
      {/* <button onClick={handleAddNewCard}>add new card</button> */}

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {cards.map((item) => (
          <BusinessCard
            key={"mycards" + item._id}
            title={item.title}
            subTitle={item.subTitle}
            description={item.description}
            address={item.address}
            phone={item.phone}
            image={item.image?.url}
            alt={item.image?.alt}
            id={item._id}
            read={false}
          />
        ))}
      </div>
    </div>
  );
};
export default MyCards;
