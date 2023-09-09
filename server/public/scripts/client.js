$(document).ready(handleReady);
function handleReady() {
  console.log("JQ is loaded! yay");
  $("#clearButton").on("click", clearInputs); //click listener for clear inputs
  $("#submitButton").on("click", displayHistory); //function i haven't made yet)
  getData(); //*** not complete yet */ Get initial history when the page loads,
  //make a function to store data, idk if its here or on server. ok its definitely going to be on the server. probably.

  function appendDom(data) {
    console.log("In appendDOM");
  }

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
}
function postData() {
  $.ajax({
    method: "POST",
    url: "/calculations",
    data: {},
  })
    .then(() => {
      //run a function?
    })
    .catch((err) => {
      console.log(err);
    });
}
////below code questionable
function displayHistory(historyData) {
  const container = $("#historyContainer");

  // Clear previous history
  container.empty();

  // Loop through the historyData and append each calculation to the container
  historyData.forEach((calculation) => {
    const calculationText = `${calculation.firstNumber} ${calculation.operator} ${calculation.secondNumber} = ${calculation.result}`;
    const listItem = $("<li>").text(calculationText);
    container.append(listItem);
  });
}
