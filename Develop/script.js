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




