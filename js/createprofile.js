import {addUser, getIDofRecent } from './api.js'

const profileForm = document.getElementById("profileform")
profileForm.onsubmit = createProfile


function createProfile (e) {
    e.preventDefault()
    var name = document.getElementById("userName")
    var email = document.getElementById("userEmail")
    var title =  document.getElementById("userTitle")
    var details = document.getElementById("userDetails")
    var date = document.getElementById("userDate")
    

        var result = addUser(name.value, email.value, title.value, details.value, date.value)
        if (result) {
      
          location.href = "buildreg.html?uuid=" + getIDofRecent() 
       } else {
          window.alert("Email not filled in OR email already used!")
       }
}