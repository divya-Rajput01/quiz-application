let name = localStorage.getItem("name");
let email = localStorage.getItem("email");

document.querySelector("#hiddenName").value = name;
document.querySelector("#hiddenEmail").value = email;


let time = 20;
let timer;
let current = 1;
function startTimer() {
  time = 20;
  document.querySelector("#timer").style.color = "white";

  timer = setInterval(() => {
    time--;

    document.querySelector("#timer").innerText = "Time Left: " + time + "s";

    if (time <= 5) {
      document.querySelector("#timer").style.color = "red";
    }

    //  only here question change on time over
    if (time <= 0) {
      clearInterval(timer);

      if (current < 8) {
        document.querySelector('#q' + current).style.display = "none";
        current++;
        document.querySelector('#q' + current).style.display = "block";

        startTimer();
      } else {
        document.querySelector("form").submit();
      }
    }

  }, 1000);
}

startTimer();

function nextQuestion() {
  let selected = document.querySelector('input[name="q' + current + '"]:checked');

  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  clearInterval(timer); //  important

  if (current < 8) {
    document.querySelector('#q' + current).style.display = "none";
    current++;
    document.querySelector('#q' + current).style.display = "block";

    startTimer();
  } else {
    document.querySelector("form").submit();
  }
}

// function validate(){
// let name = document.querySelector('#name').value;
// let email = document.querySelector('#email').value;
// if(!name || !email){
//      document.querySelector("#error").innerText = "Please enter name & email";
//     return;
// }

// localStorage.setItem("name", name);
//     localStorage.setItem("email", email);
//  document.querySelector("#error").innerText = "";
//     document.querySelector('form').submit();
   

// }



