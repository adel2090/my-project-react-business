import { Fragment } from "react";
import { Link } from "react-router-dom";
import businessCard from "./BusinessCard.components.css"
const BusinessCard = ({
  title,
  subTitle,
  description,
  address,
  phone,
  image,
  alt,
  id,
  onDelete,
}) => {
  const handleCardDelete = () => {
    onDelete(id);
  };
  return (
    <Fragment>
      <div className="card mb-3" style={{width:540}}>
        <div className="row g-0">
          {/* img */}
          <div className="col-md-4">
            <img src={image} className="img-fluid rounded-start" alt={alt} />
          </div>
          {/* body */}
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <h3 className="card-title">{subTitle}</h3>
              <p className="card-text">{description}</p>
              <p className="card-text">
                <small className="text-muted">{address}</small>
              </p>

              <p className="card-text">
                <small className="text-muted">{phone}</small>
              </p>

              {/* btn delete */}
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCardDelete}
              >
                Delete
              </button>

              <Link to={`/deletecard/${id}`} className="btn btn-danger">
                Delete
              </Link>

              {/* btn edit */}
              <Link to={`/editcard/${id}`} className="btn btn-warning">
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default BusinessCard;

//style="max-width: 540px;"
