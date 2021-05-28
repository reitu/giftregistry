import {addUser, getIDofRecent } from './api.js'

const profileForm = document.getElementById("profileform")
profileForm.onsubmit = createProfile


function createProfile (e) {
    e.preventDefault()
    var name = document.getElementById("userName")
    var email = document.getElementById("userEmail")
    var title =  document.getElementById("userDetails")
    var details = document.getElementById("userDate")
    var date = document.getElementById("userDate")
    

        var result = addUser(name.value, email.value, title.value, details.value, date.value)
        if (result) {
      
          location.href = "buildreg.html?uuid=" + getIDofRecent() //recentlyAdded.uuid
       } else {
          window.alert("Email not filled in OR email already used!")
       }
}