import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import Navbar from "./Navbar";
import axios from "axios";

const Home = () => {
  const [userData, setUserData] = useState([]);

  const [backendData, setBackendData] = useState({});

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  useEffect(() => {
    axios("https://my.api.mockaroo.com/users.json?key=0aec1ff0")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.log(`Sorry, buster. No more requests allowed today!`);
        console.error(err);

        const backupData = {
          id: 1,
          first_name: "Leslie",
          last_name: "Woodman",
          total_spending: "$1250",
        };
        setUserData(backupData);
      });
  }, []);

  function calculateTotalSpending(expenses) {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  return (
    <div className="home-container">
      <div className="box">
        <div>
          <h2 className="text-center">
            {backendData &&
              Array.isArray(backendData.expenses) &&
              backendData.expenses.length > 0 && (
                <p>
                  Total Spending: $
                  {calculateTotalSpending(backendData.expenses)}
                </p>
              )}
          </h2>

          <ul className=" rounded-lg p-4 mt-4">
            {backendData &&
            backendData.expenses &&
            backendData.expenses.length > 0 ? (
              backendData.expenses.map((expense) => (
                <li
                  key={expense.id}
                  className="py-4 border-b border-gray-300 flex justify-between"
                >
                  <div className="mr-64">
                    <p className="text-lg font-semibold">{expense.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Amount: ${expense.amount}</p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No expenses available.</p>
            )}
          </ul>
        </div>
      </div>
      <div className="box">
        <h2>Groups</h2>
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
