$(document).ready(handleReady);
function handleReady() {
  console.log("JQ is loaded! yay");
  $("#clearButton").on("click", clearInputs); //click listener for clear inputs
  $("#submitButton").on("click", postData); //function i haven't made yet)
  getData(); //*** not complete yet */ Get initial history when the page loads,
  //make a function to store data, idk if its here or on server. ok its definitely going to be on the server. probably.
  let selectedOperator;
  $("#plusButton").on("click", function plusFunction() {
    selectedOperator = "+";
  });
  $("#subtractButton").on("click", function subtractFunction() {
    selectedOperator = "-";
  });
  $("#multiplyButton").on("click", function multiplyFunction() {
    selectedOperator = "*";
  });
  $("#divideButton").on("click", function divideFunction() {
    selectedOperator = "/";
  });

  //   function appendDom(data) {
  //     console.log("In appendDOM");
  //   }

  function clearInputs() {
    $("#firstNumber").val(""); // emptying fields
    $("#secondNumber").val("");
  }
} //end onReady

//need a post results function with an ajax in

////need to make on clicks for each operator button
function getData() {
  $.ajax({
    method: "GET",
    url: "/calculations",
  })
    .then((response) => {
      //appendDom(response)
      console.log(response);
      displayHistory(response); /// maybe??
    })
    .catch((err) => {
      console.log(err);
    });
  //either mathTracker or mathHistory
  function appendDom(response) {
    $("#historyContainer").append(`
 <p>
 ${mathTracker.firstNumber} ${mathTracker.operator}
 ${mathTracker.secondNumber} ${mathTracker.result}
 </p>
 `);
  }
  //make a getCalculations on the server to pull back here??
} //end getData
function postData(historyData) {
  let firstNumber = $("#firstNumber").val();
  let secondNumber = $("#secondNumber").val();
  let operator = selectedOperator;
  let result = "";

  $.ajax({
    method: "POST",
    url: "/calculations",
    data: { firstNumber, secondNumber, operator, result }, // need to add which operator was selected
  })
    .then(() => {
      getCalculations(); // need to make this function on the server i believe
    })
    .catch((err) => {
      console.log(err);
    });
} //end postData
