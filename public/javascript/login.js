function validate(){
let name = document.querySelector('#name').value;
let email = document.querySelector('#email').value;
if(!name || !email){
     document.querySelector("#error").innerText = "Please enter name & email";
    return;
}

localStorage.setItem("name", name);
    localStorage.setItem("email", email);
 document.querySelector("#error").innerText = "";
    document.querySelector('form').submit();
   

}