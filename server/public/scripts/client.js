let selectedOperator; // moved outside

$(document).ready(handleReady);
function handleReady() {
  console.log("JQ is loaded! yay");
  $("#clearButton").on("click", clearInputs); //click listener for clear inputs
  $("#submitButton").on("click", postData); //function i haven't made yet)
  getData(); //*** not complete yet */ Get initial history when the page loads,
  //make a function to store data, idk if its here or on server. ok its definitely going to be on the server. probably.

  // i think this is the way to do this using this and data
  //   $(".operator-button").on("click", function () {
  //     selectedOperator = $(this).data("operator");
  //   });

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

  //need a post results function with an ajax in

  function getData() {
    $.ajax({
      method: "GET",
      url: "/calculations",
    })
      .then((response) => {
        //appendDom(response)
        console.log(response); //** added response to appendDom
        appendDom(response); //// commented out and changed to appenddom? displayHistory(response); /// maybe??
      })
      .catch((err) => {
        console.log(err);
      });
    //either mathTracker or mathHistory, changed to input of data
    function appendDom(data) {
      $("#historyContainer").empty(); ///**** Just added
      for (const input of data) {
        console.log("looking for input of firstNumber", input.firstNumber);
        console.log("looking for input of seconddNumber", input.secondNumber);
        console.log("looking for input of operator", input.operator);
        $("#historyContainer").append(`
 <p>
 ${input.firstNumber} ${input.operator}
 ${input.secondNumber} = ${input.result}
 </p>
 `);
      }
    } //end appendDom
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
        getData(); // might not be getData, shoot
        clearInputs(); // clearing mathTracker on server //need app.get /clear
      })
      .catch((err) => {
        console.log(err);
      });
  } //end postData
} //end onReady
function clearData() {
  $.ajax({
    method: "GET",
    url: "/clear",
  })
    .then((response) => {
      $("#historyContainer").empty();
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
