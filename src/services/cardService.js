import axios from "axios";

//info card
const getCard = (cardId) => {
  return axios.get(`/cards/card/${cardId}`);
};

// edit card
const editCard = (card) => {
  const cardId = card._id;
  delete card._id;
  return axios.put(`/cards/${cardId}`, card);
};

//delete card
const deleteCard = (cardId) => {
  return axios.delete(`/cards/${cardId}`);
};

const getMyCard = () => {
  return axios.get("/cards/my-cards");
};

const creatCard = (card) => {
  return axios.post("/cards/", card);
};

export default { creatCard, getMyCard, getCard, editCard ,deleteCard};
