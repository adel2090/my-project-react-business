import { Fragment } from "react";
import NavBarPartial from "partial/NavBarPartial";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "store/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAddressCard } from "@fortawesome/free-solid-svg-icons";
// import LogOut from "pages/LogOut";

let links = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About Us",
    url: "/aboutus",
  },
];

const connected = {
  isBiz: [
    {
      label: "cards",
      url: "/cardspage",
    },
    {
      label: "My Cards",
      url: "/mycards",
    },
  ],
  notBiz: [
    {
      label: "cards",
      url: "/cardspage",
    },
  ],
};

const authLink = {
  isLogIn: [
    // {
    //   label: "Welcome",
    //   url: "/welcom",
    // },
    {
      label: "LogOut",
      url: "/logout",
    },
  ],
  isLogOut: [
    {
      label: "Login",
      url: "/login",
    },
    {
      label: "Register",
      url: "/register",
    },
    {
      label: "Business",
      url: "/bizregister",
    },
  ],
};

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLogin = useSelector((state) => state.auth.isConnected);
  const dataUser = useSelector((state) => state.auth.userData);
  //const userInfo = useSelector((state) => state.auth.userInfo);

  const handleClickLogout = () => {
    localStorage.clear();
    console.log("hello logout");
    dispatch(authActions.logout());
    history.push("/");
  };

  return (
    <div className="nav nav-tabs d-flex justify-content-between">
      {/* vav home */}
      <div className="d-flex">
        <li className="nav-item p-2">
        {/* <FontAwesomeIcon icon="fa-regular fa-address-card" /> */}
        <FontAwesomeIcon icon={faAddressCard} />
        adelCards
          {/* <a className="nav-link active"  aria-current="page" href="#">
            A
          </a> */}
        </li>

        {links.map((item, idx) => (
          <NavBarPartial
            key={"links" + idx}
            label={item.label}
            link={item.url}
          />
        ))}

        {isLogin &&
          dataUser.biz &&
          connected.isBiz.map((item, idx) => (
            <NavBarPartial
              key={"biz" + idx}
              label={item.label}
              link={item.url}
            />
          ))}

        {isLogin &&
          !dataUser.biz &&
          connected.notBiz.map((item) => (
            <NavBarPartial
              key={"notBiz" + dataUser._id}
              label={item.label}
              link={item.url}
            />
          ))}
      </div>

      {/* connection */}
      <div className="d-flex justify-content-end ">
        {/* {authLink.map((item) => (
          <NavBarPartial label={item.label} link={item.url} />
        ))} */}
        {/* {isLogin ? "You logged in" : "You need to login"} */}
        {isLogin
          ? authLink.isLogIn.map((item) => (
              <Fragment>
                {/* <NavBarPartial label={item.label} link={item.url} onclick={handleClickLogout}/> */}
                <button
                  key={"login" + dataUser._id}
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClickLogout}
                >
                  {item.label}
                </button>
              </Fragment>
            ))
          : authLink.isLogOut.map((item, idx) => (
              <Fragment>
                <button
                  key={"logout" + idx}
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    history.push(item.url);
                  }}
                >
                  {item.label}
                </button>
              </Fragment>
              // <NavBarPartial label={item.label} link={item.url} />
            ))}
      </div>
    </div>
  );
};
export default NavBar;
