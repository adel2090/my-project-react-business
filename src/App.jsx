import logo from "./logo.svg";
import "./App.css";
import NavBar from "components/NavBar";
import Footer from "components/Footer/Footer";
import HomePage from "pages/HomePage";
import AboutUs from "pages/AboutUs";
import Register from "pages/Register";
import Register2 from "pages/Register2";
import Login from "pages/Login";
import { Route, Switch } from "react-router-dom";
import CreateCard from "pages/CreateCard";
import CardsPage from "pages/CardsPage";
import EditCard from "pages/EditCard";
import DeleteCard from "pages/DeleteCard";
import GuardedRoute from "components/GuardedRoute";
import autoLogin from "services/autoLogin1";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { authActions } from "store/auth";
import { ToastContainer } from "react-toastify";
import LogOut from "pages/LogOut";
import BizRegister from "pages/BizRegister";
import ProtectedRoute from "components/common/ProtectedRoute";
import MyCards from "pages/MyCards";
import useAutoLogin from "./hooks/useAutoLogin";

function App() {
  const autoLoginFunction = useAutoLogin();

  useEffect(() => {
    (async () => {
      try {
        await autoLoginFunction(localStorage.getItem("token"));
      }catch (error) {
        console.log("🚀 ~ file: App.jsx ~ line 34 ~ error", error);
      }
    })();
  }, []);


  return (
    <div className="container">
      <NavBar />
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/aboutus" component={AboutUs}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/bizregister" component={BizRegister}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/logout" component={LogOut}></Route> 
        <ProtectedRoute
          path="/cardspage"
          component={CardsPage}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/mycards"
          component={MyCards}
          biz={true}
        ></ProtectedRoute> 
        <ProtectedRoute path="/createcard" component={CreateCard} biz={true} />
        <ProtectedRoute
          path="/editcard/:id"
          component={EditCard}
          biz={true}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/deletecard/:id"
          component={DeleteCard}
          biz={true}
        ></ProtectedRoute>
      
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
