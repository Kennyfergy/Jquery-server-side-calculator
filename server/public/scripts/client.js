let selectedOperator; // moved outside

$(document).ready(handleReady);
function handleReady() {
  console.log("JQ is loaded! yay");
  $("#clearButton").on("click", function () {
    clearData();
    clearInputs();
  }); //click listener for clear inputs
  $("#submitButton").on("click", postData);
  getData();

  const clear = () => {
    $("#firstNumber").val("");
    $("#secondNumber").val("");
    $("#plusButton").val("");
    $("#subtractButton").val("");
    $("#multiplyButton").val("");
    $("#divideButton").val("");
  }; // end Clear function to clear the inputs and operator selection

  $("#cBtn").on("click", clear);

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

  //this function deprecated, replaced with new clear function
  function clearInputs() {
    $("#firstNumber").val(""); // emptying fields
    $("#secondNumber").val("");
  }

  function getData() {
    $.ajax({
      method: "GET",
      url: "/calculations",
    })
      .then((response) => {
        console.log(response);
        appendDom(response);
      })
      .catch((err) => {
        console.log(err);
      });

    function appendDom(data) {
      $("#historyContainer").empty(); ///**** Just added

      for (const input of data) {
        console.log("looking for input of firstNumber", input.firstNumber);
        console.log("looking for input of secondNumber", input.secondNumber);
        console.log("looking for input of operator", input.operator);
        $("#mathResult").empty();
        $("#mathResult").append(input.result);
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
      data: { firstNumber, secondNumber, operator, result },
    })
      .then(() => {
        getData();
        clearInputs(); // clearing mathTracker on server //need app.get /clear
      })
      .catch((err) => {
        console.log(err);
      });
  } //end postData
} //end onReady
function clearData() {
  $.ajax({
    method: "POST",
    url: "/clear",
  })
    .then((response) => {
      $("#historyContainer").empty();
      $("#mathResult").empty();
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
