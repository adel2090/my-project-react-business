import { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import "./BusinessCard.components.css";
const BusinessCard = ({
  title,
  subTitle,
  description,
  address,
  phone,
  image,
  alt,
  id,
  read,
  // onDelete,
}) => {
  // const handleCardDelete = () => {
  //   onDelete(id);
  // };
  return (
    <Fragment>
      <div className="container">
        <div className="front-side">
          {/* <!-- color --> */}
          <div className="color-grid">
            <div className="black"></div>
            <div className="red1"></div>
            <div className="red2"></div>
            <div className="green"></div>
          </div>
          {/* <!-- card --> */}
          <div className="info-grid">
            <div className="name">
              <h2>{title}</h2>
              <h5>{subTitle}</h5>
            </div>

            <div className="desc">
              <p>{description}</p>
            </div>

            {image && (
              <div className="img">
                <img src={image} alt={alt} />
              </div>
            )}

            <div className="addr">
              {/* <p>
              1/2 Street, <strong> City</strong>, State,
              <strong> Country</strong>
            </p> */}
              <p>{address}</p>
            </div>
            <div className="phoneNo">
              {/* <p>
              +000 <strong>1234</strong> 4567 7896
            </p> */}
              {phone}
            </div>

            {read === false && (
              <Fragment>
                <div className="BtnContainer">
                  <div className="btnEdit">
                    <Link to={`/editcard/${id}`} className="btn btn-warning">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                  </div>
                  <div className="btnDelete">
                    {/* btn delete */}
                    <Link to={`/deletecard/${id}`} className="btn btn-danger">
                      <FontAwesomeIcon icon={faTrash} />
                    </Link>
                  </div>
                </div>
              </Fragment>
            )}
            {/* <div className="BtnContainer">
              <div className="btnEdit">
               
                <Link to={`/editcard/${id}`} className="btn btn-warning">
                <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              </div> */}

            {/* <div className="btnDelete">
                
                <Link to={`/deletecard/${id}`} className="btn btn-danger">
                <FontAwesomeIcon icon={faTrash} />
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default BusinessCard;

//style="max-width: 540px;"
