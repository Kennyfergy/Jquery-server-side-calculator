const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

app.use(express.static("server/public"));

app.use(bodyParser.urlencoded({ extended: true }));

let mathTracker = [];

app.get("/calculations", (req, res) => {
  console.log("GET request for /calculations");
  res.send(mathTracker);
});

app.post("/calculations", (req, res) => {
  console.log("POST request for /calculations");
  let calculation = req.body;
  let mathHistory = {
    firstNumber: Number(calculation.firstNumber),
    operator: calculation.operator,
    secondNumber: Number(calculation.secondNumber),
    result: Number(calculation.result),
  };

  switch (mathHistory.operator) {
    case "+":
      mathHistory.result = mathHistory.firstNumber + mathHistory.secondNumber;
      break;
    case "-":
      mathHistory.result = mathHistory.firstNumber - mathHistory.secondNumber;
      break;
    case "*":
      mathHistory.result = mathHistory.firstNumber * mathHistory.secondNumber;
      break;
    case "/":
      mathHistory.result = mathHistory.firstNumber / mathHistory.secondNumber;
      break;
  }

  // going to need mathTracker in the app.post. edit, done
  mathTracker.push(mathHistory);
  res.sendStatus(201);

  //need function to handle on click of submit, run mathHistory.operator and store data
  //function displayHistory() {}
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
