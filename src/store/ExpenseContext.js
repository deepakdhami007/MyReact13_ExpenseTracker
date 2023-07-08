import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./auth-context";
import ExpenseContext from "./expense-context";

const ExpenseProvider = props => {
  const [itemsArr, setItemsArr] = useState([]);
  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  useEffect(() => {
    if(localStorage.length == 0){
      setItemsArr([]);
    }
  }, [localStorage.length])

  const restoreItems = async () => {
    const email = localStorage['userEmail'].replace(/[\.@]/g, "");
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
    if(localStorage.length>0){
      restoreItems();
    }
  },[localStorage.length]);

  const addItemHandler = (item) => {
    setItemsArr([item, ...itemsArr]);
  };

  const removeItemHandler = (item) => {
    
  };

  const expenseContext = {
    items: itemsArr,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    onLogin: restoreItems
  };

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
