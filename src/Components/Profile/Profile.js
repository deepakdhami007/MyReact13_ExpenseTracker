import React, { Fragment, useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AuthContext from "../../store/auth-context";
import ExpenseForm from "../ExpenseTracker/ExpenseForm";

import classes from "./Profile.module.css";
import UpdateProfileForm from "./UpdateProfileForm";

const Profile = (props) => {
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isLocation = location.pathname === "/profile";

  const updateVisibleHandler = async () => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDH0fL1swdhEjD-qHDswBtnpxxzfef3CTI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: authCtx.token,
          }),
        }
      );
      const data = await res.json();
      setUserData(data.users[0]);
    } catch (error) {
      alert(error);
    }
    
  };

  useEffect(() =>{
    updateVisibleHandler()
  }, [])

  const clickLogoutHandler = () => {
    authCtx.logout();
    navigate("/", { replace: true });
  };

  const clickExpenseHandler = () => {
    navigate("/profile/expense-tracker", { replace: true });
  };

  return (
    <Fragment>
      <section className={classes.proCon}>
        <div className={classes.header}>
          <div className={classes.headerDetail}>
            <h6>Welcome to Expense tracker</h6>
            <Button
              variant="success"
              onClick={clickExpenseHandler}
              className={classes.expenseBtn}
            >
              Expense Tracker
            </Button>
          </div>
          <span className={classes.incomplete}>
              {!isLocation ? (
                "Your Profile is incomplete. "
              ) : (
                <React.Fragment>
                  Your profile <strong>x%</strong> completed.
                </React.Fragment>
              )}
              <button onClick={() => navigate("/profile", { replace: true }) }>Complete now</button>
            </span>
          <div>
            
          </div>
          <div>
            <Button variant="danger" onClick={clickLogoutHandler}>
              Log out
            </Button>
          </div>
        </div>
      </section>
      {isLocation && <UpdateProfileForm user={userData} update={updateVisibleHandler}/>}
    </Fragment>
  );
};

export default Profile;
