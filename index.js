// Wait for the DOM to be fully loaded before executing the JavaScript code
document.addEventListener('DOMContentLoaded', function () {
let selectedDate = localStorage.getItem("userpickdate");
let numberofadults = parseInt(localStorage.getItem("numberofsladults")) || 0;
let numberofchild = parseInt(localStorage.getItem("numberofslchild")) || 0;
let numberoffadults = parseInt(localStorage.getItem("numberoffadult")) || 0;
let numberoffchild = parseInt(localStorage.getItem("numberoffchild")) || 0;
let numberofinfant = parseInt(localStorage.getItem("numberofinfant")) || 0;



const sladultCell = document.getElementById("sladultcell");
sladultCell.textContent = "[" + numberofadults + "]" + "$" + localStorage.getItem("sladultprice");

const slchildCell = document.getElementById("slchildcell");
slchildCell.textContent = "[" + numberofchild + "]" + "$" + localStorage.getItem("slchildprice");

const fadultCell = document.getElementById("fadultcell");
fadultCell.textContent = "[" + numberoffadults + "]" + "$" + localStorage.getItem("fadultprice");

const fchildCell = document.getElementById("fchildcell");
fchildCell.textContent = "[" + numberoffchild + "]" + "$" + localStorage.getItem("fchildprice");

const infantCell = document.getElementById("infantcell");
infantCell.textContent = "[" + numberofinfant + "]" + "FREE";

const totalBillCell = document.getElementById("totalbill");
totalBillCell.innerText = "$"+localStorage.getItem("finalbill") || "0";

const userdateCell = document.getElementById("userdate");
userdateCell.textContent = localStorage.getItem("userpickdate");

const timecell = document.getElementById("timeslotcell");
timecell.textContent = localStorage.getItem("selectedOption");


//details page

const currentPage = window.location.pathname.split('/').pop();
if(currentPage==='detailspage.html'){
  
document.getElementById("nameinput").addEventListener("input", function () {
  localStorage.setItem("inputname", document.getElementById("nameinput").value);
 });
 document.getElementById("telinput").addEventListener("input", function () {
   localStorage.setItem("inputtel", document.getElementById("telinput").value);
 });
 document.getElementById("emailinput").addEventListener("input", function () {
   localStorage.setItem("inputemail", document.getElementById("emailinput").value);
 });
 document.getElementById("cemailinput").addEventListener("input", function () {
   localStorage.setItem("inputcemail", document.getElementById("cemailinput").value);
 });
 document.getElementById("genderinput").addEventListener("change", function () {
   localStorage.setItem("inputgender", document.getElementById("genderinput").value || "Male");
 });

 

  const inputFields = document.querySelectorAll('.custominput, #genderinput');
  const emailInput = document.getElementById('emailinput');
  const confirmEmailInput = document.getElementById('cemailinput');
  const continueButton2 = document.getElementById('continuebutton2');
  const emailError = document.getElementById('emailError');

  inputFields.forEach(input => {
    input.addEventListener('input', () => {
      const allInputsFilled = Array.from(inputFields).every(input => input.value.trim() !== '');
      const emailsMatch = emailInput.value === confirmEmailInput.value;
      continueButton2.disabled = !allInputsFilled|| !emailsMatch;

      if (!emailsMatch) {
        emailError.textContent = "Emails don't match";
      } else {
        emailError.textContent = '';
      }
    });
  });
  confirmEmailInput.addEventListener('input', () => {
    const emailsMatch = emailInput.value === confirmEmailInput.value;
    continueButton.disabled = !emailsMatch;

    if (!emailsMatch) {
      emailError.textContent = "Emails don't match";
    } else {
      emailError.textContent = '';
    }
  });


}
else if(currentPage==='paymentpage.html'){

  const cardNumberInput = document.querySelector(".card-number");
        const cvvInput = document.querySelector(".cvv-input input");
        const continueButton = document.querySelector("#continuebutton3");

        continueButton.addEventListener("click", () => {
            if (!validateCardNumber(cardNumberInput.value)) {
                alert("Please enter a valid card number");
                return;
            }

            if (!validateCVV(cvvInput.value)) {
                alert("Please enter a valid CVV");
                return;
            }
            window.location.href = "confirmpage.html";
          });
  
          function validateCardNumber(cardNumber) {
            // Remove any spaces or dashes from the card number
            cardNumber = cardNumber.replace(/[\s-]/g, '');
        
            // Check if the card number is a 16-digit number
            return /^\d{16}$/.test(cardNumber);
        }
  
          function validateCVV(cvv) {
              // You can implement your CVV validation logic here
              // For now, let's assume it's valid if it's a 3 or 4 digit number
              return /^\d{3,4}$/.test(cvv);
          }

          continueButton.textContent= "Pay $"+localStorage.getItem("finalbill");
}

else if(currentPage==='confirmpage.html'){
  document.getElementById("namecell").textContent=localStorage.getItem("inputname");
  document.getElementById("telcell").textContent=localStorage.getItem("inputtel");
  document.getElementById("mailcell").textContent=localStorage.getItem("inputemail");
  document.getElementById("gendercell").textContent=localStorage.getItem("inputgender");
}



if (selectedDate) {
  selectedDate = new Date(selectedDate);
} else {
  selectedDate = new Date();
}
//calendar
const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  if (selectedDate) {
    const selectedCell = document.querySelector(`[data-date="${selectedDate.toISOString().slice(0, 10)}"]`);
    if (selectedCell) {
      selectedCell.classList.add('selected-date');
    }
  }


  daysTag.addEventListener("click", (event) => {
    const selectedCell = event.target;
    const selectedDateStr = `${currYear}-${currMonth + 1}-${selectedCell.textContent}`;
    selectedDate = new Date(selectedDateStr);
    localStorage.setItem("userpickdate", selectedDate.toISOString()); // Store the selected date in local storage
    renderCalendar(selectedDate); // Re-render the calendar with the selected date
  });

  if (selectedDate.getMonth() === currMonth && selectedDate.getFullYear() === currYear) {
    const selectedCell = document.querySelector(`[data-date="${selectedDate.toISOString().slice(0, 10)}"]`);
    if (selectedCell) {
      selectedCell.classList.add("selected-date");
    }
  }


  const userDateCell = document.getElementById("userdate");
  userDateCell.textContent = selectedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


renderCalendar(selectedDate);

prevNextIcon.forEach(icon => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date(currYear, currMonth, new Date().getDate());
    }
    renderCalendar(); // No need to pass date here, as it's now a global variable
  });
});



//page changers
// Function to update the "Continue" button state
function updateButtonState() {
  const elementsToCheck = [
    "userdate", "timeslotcell", "sladultcell", "slchildcell",
    "fadultcell", "fchildcell"
  ];

  const guestCellIds = ["adultguest", "childguest", "fadultguest", "fchildguest", "infantguest"];

  const button = document.getElementById("continuebutton");
  let allGuestCellsEmpty = true;

  for (const elementId of elementsToCheck) {
    const element = document.getElementById(elementId);
    if (!element.textContent.trim()) {
      button.disabled = true;
      return; // Disable the button and exit the loop if any element is empty
    }
  }

  // If all elements have content, enable the button
  button.disabled = false;

  // Check if all guest cells are 0
  for (const cellId of guestCellIds) {
    const cell = document.getElementById(cellId);
    if (parseInt(cell.textContent) !== 0) {
      allGuestCellsEmpty = false;
      break; // No need to continue checking if a non-zero guest count is found
    }
  }

  // If all elements have content and no guest cells have non-zero counts, enable the button
  button.disabled = allGuestCellsEmpty;
}










function calculateTotalBill() {
  
 

  const sladultPrice = parseInt(localStorage.getItem("sladultprice")) || 0;
  const slchildPrice = parseInt(localStorage.getItem("slchildprice")) || 0;
  const fadultPrice = parseInt(localStorage.getItem("fadultprice")) || 0;
  const fchildPrice = parseInt(localStorage.getItem("fchildprice")) || 0;


  const totalBill = sladultPrice + slchildPrice + fadultPrice + fchildPrice;


  localStorage.setItem("finalbill", totalBill);

  
  document.getElementById("totalbill").innerText ="$"+ totalBill;
}


  
  
  
  
  
  
  
  
  
  
   
 

  


 //timeslotselection

  

const durationinput = document.getElementById("durationinput");
durationinput.addEventListener('change', updateSummaryTabletimeslot);
 // Function to update the 'timeslot' cell in the summary table

 function updateSummaryTabletimeslot() {

  localStorage.setItem("peaknormal", durationinput.options[durationinput.selectedIndex].value);
   // Get the selected option's text from 'durationinput'

  
   localStorage.setItem("selectedOption",durationinput.options[durationinput.selectedIndex].text) ;

   // Get the 'timeslot' cell from the summary table
   const timeslotCell = document.getElementById('timeslotcell');

   // Update the content of the 'timeslot' cell with the selected option
   timeslotCell.textContent = localStorage.getItem("selectedOption");
 }

 // Add an event listener to 'durationinput' to trigger the updateSummaryTable function
 durationinput.addEventListener('change', updateSummaryTabletimeslot);
 const storedSelectedOption = localStorage.getItem("selectedOption");
 if (storedSelectedOption) {
   const timeslotCell = document.getElementById('timeslotcell');
   timeslotCell.textContent = storedSelectedOption;
 }

 
  //guestcounter
  
  updateButtonState();
  
 
  
  document.getElementById("minusadult").onclick=function(){
    numberofadults-=1;
    if(numberofadults<=0){
       numberofadults=0;
    }
   document.getElementById("adultguest").innerHTML=numberofadults;
   localStorage.setItem("numberofsladults",numberofadults);
   let slaprice;
   if (localStorage.getItem("peaknormal")==="normal"){
    slaprice = numberofadults*4;
    }
    else {
    slaprice = numberofadults*6;
    }
  localStorage.setItem("sladultprice", slaprice);
   document.getElementById("sladultcell").textContent="["+localStorage.getItem("numberofsladults")+"]"+"$"+localStorage.getItem("sladultprice");
  calculateTotalBill();
  updateButtonState();
  }   
  
  document.getElementById("plusadult").onclick=function(){
      numberofadults+=1;
      if(numberofadults<=0){
         numberofadults=0;
      }
     document.getElementById("adultguest").innerHTML=numberofadults;
     localStorage.setItem("numberofsladults",numberofadults);
     let slaprice;
     if (localStorage.getItem("peaknormal")==="normal"){
      slaprice = numberofadults*4;
      }
      else {
      slaprice = numberofadults*6;
      }
  localStorage.setItem("sladultprice", slaprice);
     document.getElementById("sladultcell").textContent="["+localStorage.getItem("numberofsladults")+"]"+"$"+localStorage.getItem("sladultprice");
    calculateTotalBill();
    updateButtonState();
  }   
  
  
  document.getElementById("minuschild").onclick=function(){
   numberofchild-=1;
   if(numberofchild<=0){
      numberofchild=0;
   }
  document.getElementById("childguest").innerHTML=numberofchild;
  localStorage.setItem("numberofslchild",numberofchild);
  let slcprice;
  if (localStorage.getItem("peaknormal")==="normal"){
   slcprice = numberofchild*2;
   }
   else {
   slcprice = numberofchild*3;
   }
  localStorage.setItem("slchildprice", slcprice);
  document.getElementById("slchildcell").textContent="["+localStorage.getItem("numberofslchild")+"]"+"$"+localStorage.getItem("slchildprice");
  calculateTotalBill();
  updateButtonState();
  }
  
  document.getElementById("pluschild").onclick=function(){
      numberofchild+=1;
      if(numberofchild<=0){
         numberofchild=0;
      }
     document.getElementById("childguest").innerHTML=numberofchild;
     localStorage.setItem("numberofslchild",numberofchild);
     let slcprice;
  if (localStorage.getItem("peaknormal")==="normal"){
   slcprice = numberofchild*2;
   }
   else {
   slcprice = numberofchild*3;
   }
  localStorage.setItem("slchildprice", slcprice);
  document.getElementById("slchildcell").textContent="["+localStorage.getItem("numberofslchild")+"]"+"$"+localStorage.getItem("slchildprice");
  calculateTotalBill();
  updateButtonState();
  }   
  
  
  
  document.getElementById("minusfadult").onclick=function(){
   numberoffadults-=1;
   if(numberoffadults<=0){
      numberoffadults=0;
   }
  document.getElementById("fadultguest").innerHTML=numberoffadults;
  localStorage.setItem("numberoffadult",numberoffadults);
  let faprice;
  if (localStorage.getItem("peaknormal")==="normal"){
   faprice = numberoffadults*10;
   }
   else {
   faprice = numberoffadults*13;
   }
   localStorage.setItem("fadultprice", faprice);
  document.getElementById("fadultcell").textContent="["+localStorage.getItem("numberoffadult")+"]"+"$"+localStorage.getItem("fadultprice");
  calculateTotalBill();
  updateButtonState();
  }
  document.getElementById("plusfadult").onclick=function(){
      numberoffadults+=1;
      if(numberoffadults<=0){
         numberoffadults=0;
      }
     document.getElementById("fadultguest").innerHTML=numberoffadults;
     localStorage.setItem("numberoffadult",numberoffadults);
     let faprice;
     if (localStorage.getItem("peaknormal")==="normal"){
      faprice = numberoffadults*10;
      }
      else {
      faprice = numberoffadults*13;
      }
      localStorage.setItem("fadultprice", faprice);
     document.getElementById("fadultcell").textContent="["+localStorage.getItem("numberoffadult")+"]"+"$"+localStorage.getItem("fadultprice");
     calculateTotalBill();
     updateButtonState();
  }   
  
  
  document.getElementById("minusfchild").onclick=function(){
   numberoffchild-=1;
   if(numberoffchild<=0){
      numberoffchild=0;
   }
  document.getElementById("fchildguest").innerHTML=numberoffchild;
  localStorage.setItem("numberoffchild",numberoffchild);
  let fcprice;
  if (localStorage.getItem("peaknormal")==="normal"){
   fcprice = numberoffchild*5;
   }
   else {
    fcprice= numberoffchild*8;
   }
   localStorage.setItem("fchildprice", fcprice);
  document.getElementById("fchildcell").textContent="["+localStorage.getItem("numberoffchild")+"]"+"$"+localStorage.getItem("fchildprice");
  calculateTotalBill();
  updateButtonState();
  }
  document.getElementById("plusfchild").onclick=function(){
      numberoffchild+=1;
      if(numberoffchild<=0){
         numberoffchild=0;
      }
     document.getElementById("fchildguest").innerHTML=numberoffchild;
     localStorage.setItem("numberoffchild",numberoffchild);
     let fcprice;
  if (localStorage.getItem("peaknormal")==="normal"){
   fcprice = numberoffchild*5;
   }
   else {
    fcprice= numberoffchild*8;
   }
   localStorage.setItem("fchildprice", fcprice);
  document.getElementById("fchildcell").textContent="["+localStorage.getItem("numberoffchild")+"]"+"$"+localStorage.getItem("fchildprice");
  calculateTotalBill();
  updateButtonState();
  }   
  
  
  document.getElementById("minusinfant").onclick=function(){
   numberofinfant-=1;
   if(numberofinfant<=0){
      numberofinfant=0;
   }
  document.getElementById("infantguest").innerHTML=numberofinfant;
  localStorage.setItem("numberofinfant",numberofinfant);
  document.getElementById("infantcell").textContent="["+localStorage.getItem("numberofinfant")+"]"+"FREE";
  }
  document.getElementById("plusinfant").onclick=function(){
      numberofinfant+=1;
      if(numberofinfant<=0){
         numberofinfant=0;
      }
     document.getElementById("infantguest").innerHTML=numberofinfant;
     localStorage.setItem("numberofinfant",numberofinfant);
     document.getElementById("infantcell").textContent="["+localStorage.getItem("numberofinfant")+"]"+"FREE";
  }   




});







