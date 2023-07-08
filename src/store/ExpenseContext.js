import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./auth-context";
import ExpenseContext from "./expense-context";

const ExpenseProvider = props => {
  const [itemsArr, setItemsArr] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setItemsArr([])
  }, [authCtx.isLoggedIn])

  const restoreItems = async () => {
    const email = localStorage['userEmail'].replace(/[\.@]/g, "");
    console.log(email)
    try {
      const res = await axios.get(`https://myreact-expense-tracker-default-rtdb.firebaseio.com/${email}/expenses.json`)

      const data = res.data;
      
      const realData = Object.values(data).reverse();
      // console.log(realData)
      setItemsArr(realData);
    } catch(error){
      alert(error)
    }
  };
  
  useEffect(() => {
    if(authCtx.userEmail){
      restoreItems();
    }
      
  },[authCtx.userEmail]);
  
  useEffect(() => {
    if(authCtx.isLoggedIn){
      restoreItems();
    }
  },[authCtx.isLoggedIn]);
  

  const addItemHandler = (item) => {
    setItemsArr([item, ...itemsArr]);
  };

  const removeItemHandler = (item) => {
    
  };

  const expenseContext = {
    items: itemsArr,
    addItem: addItemHandler,
    removeItem: removeItemHandler
  };

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
