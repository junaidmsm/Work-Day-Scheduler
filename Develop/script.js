var saveBtn = $(".saveBtn");

// function code
function updateTime() {
  let today = moment();

// updates the time element in the header
  $("#currentDay").text(today.format("dddd, MMMM Do YYYY, h:mm.ss"));

// For coloring the past, present, and future time blocks
  let now = moment().format("kk");
  for (let i = 0; i < scheduleElArray.length; i++) {
      scheduleElArray[i].removeClass("future past present");

      if (now > scheduleElArray[i].data("hour")) {
          scheduleElArray[i].addClass("past");

      } else if (now === scheduleElArray[i].attr("data-hour")) {
          scheduleElArray[i].addClass("present");

      } else {

          scheduleElArray[i].addClass("future");
      }

    }
  }

  function timeBlockColor() {
    var hour = moment().hours();

    $(".time-block").each(function() {
        var currHour = parseInt($(this).attr("id"));

// console.log(this); //each time-block

        if (currHour > hour) {
            $(this).addClass("future");
        } else if (currHour === hour) {
            $(this).addClass("present");
        } else {
            $(this).addClass("past");
        }

    })
  };  

// WHEN I click the save button for that time block
saveBtn.on("click", function() {

// console.log(this); //save button
  var time = $(this).siblings(".hour").text();
  var plan = $(this).siblings(".plan").val();

// THEN the text for that event is saved in local storage
  localStorage.setItem(time, plan);
});

// WHEN I refresh the page
// THEN the saved events persist
function usePlanner() {

  $(".hour").each(function() {
      var currHour = $(this).text();
      var currPlan = localStorage.getItem(currHour);

// console.log(this);
// console.log(currHour);

      if(currPlan !== null) {
          $(this).siblings(".plan").val(currPlan);
      }
  });
}

/**
* CALL FUNCTIONS
*/

timeBlockColor();
usePlanner();



// textarea elements
let saveButton = $(".save-icon");
let containerEl = $(".container");
let schedule9am = $("#9AM");
let schedule10am = $("#10AM");
let schedule11am = $("#11AM");
let schedule12pm = $("#12PM");
let schedule1pm = $("#1PM");
let schedule2pm = $("#2PM");
let schedule3pm = $("#3PM");
let schedule4pm = $("#4PM");
let schedule5pm = $("#5PM");

let scheduleElArray = [
  schedule9am,
  schedule10am,
  schedule11am,
  schedule12pm,
  schedule1pm,
  schedule2pm,
  schedule3pm,
  schedule4pm,
  schedule5pm,
];

renderLastRegistered();
updateTime();
setInterval(updateTime, 1000); 

// render schedule saved in local storage
function renderLastRegistered() {
  for (let el of scheduleElArray) {
      el.val(localStorage.getItem("time block " + el.data("hour")));

      
  }
}


// function for handling clicks
function handleFormSubmit(event) {
    event.preventDefault();


  let btnClicked = $(event.currentTarget);

  let targetText = btnClicked.siblings("textarea");

  let targetTimeBlock = targetText.data("hour");

  localStorage.setItem("time block " +  targetTimeBlock, targetText.val());

  
 
}

saveButton.on("click", handleFormSubmit);
