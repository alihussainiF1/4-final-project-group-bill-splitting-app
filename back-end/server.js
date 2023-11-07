const express = require("express"); // You need to require express to use its features
const app = express(); // Create an Express app instance

const backupData = {
  id: 1,
  name: "LA Road Trip",
  expenses: [
    { id: 1, name: "Dinner", amount: 358, creator: "Jane", date: "06/16/2023" },
    {
      id: 2,
      name: "Flights to LA",
      amount: 261,
      creator: "Tom",
      date: "01/21/2023",
    },
    {
      id: 3,
      name: "Hotels",
      amount: 170,
      creator: "David",
      date: "08/02/2023",
    },
  ],
  description: "Road trip with friends",
};

app.get("/api", (req, res) => {
  // res.json({ users: ["userone", "usertwo"] });
  res.json(backupData);
});

app.listen(3001, () => {
  console.log("server started on 3001");
});
