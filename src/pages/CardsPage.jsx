import axios from "axios";
import BusinessCard from "components/businessCard/BusinessCard.components";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import PageHeader from "components/common/PageHeader";
import { toast } from "react-toastify";

let arrayCard = [];
const CardsPage = () => {
  const [businessCard, setBusinessCard] = useState(arrayCard);
  const [findInput, setFindInput] = useState("");

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/cards/cards");
        console.log("🚀 ~ file: CardsPage.jsx ~ line 15 ~ data", data);
        arrayCard = data;
        setBusinessCard(arrayCard);
      } catch (error) {
        toast.error("Card is failed", {
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
    let copyBizCardArray = JSON.parse(JSON.stringify(arrayCard));
    copyBizCardArray = copyBizCardArray.filter((item) =>
      regex.test(item.title)
    );
    setBusinessCard(copyBizCardArray);
  }, [findInput]);

  const handleFindInputChange = (ev) => {
    setFindInput(ev.target.value);
  };

  return (
    <div className="container">
      <PageHeader titlePage="cards Page" />
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

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {businessCard.map((item) => (
          <BusinessCard
            key={"cardpage" + item._id}
            title={item.title}
            subTitle={item.subTitle}
            description={item.description}
            address={item.address}
            phone={item.phone}
            image={item.image?.url}
            alt={item.image?.alt}
            id={item._id}
            read={true}
          />
        ))}
      </div>
    </div>
  );
};
export default CardsPage;

