import { Fragment } from "react";

const PageHeader = ({ titlePage }) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-12 mt-4">
          <h1>{titlePage}</h1>
        </div>
      </div>
    </Fragment>
  );
};
export default PageHeader;
