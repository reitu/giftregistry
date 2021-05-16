import {init, addUser, users, fetchUserDetails } from './api.js'
//import {stringToHTML} from './helpers.js'

console.log("all", users)

window.onload = begin()

function begin() {
    init()    //does it make the u available? yes!
}

const profileForm = document.getElementById("profileform")
profileForm.onsubmit = createProfile


function createProfile (e) {
    e.preventDefault()
    var thename = document.getElementById("userName")
    var theemail = document.getElementById("userEmail")
    var thetitle =  document.getElementById("userDetails")
    var thedetails = document.getElementById("userDate")
    console.log('all em',users)
    if (thename.value) {
       
        var hasEmail = false;

        users.forEach(function (el) {
          if (el.email === theemail.value) {
            hasEmail = true;
          }
        });

        if  (theemail.value && !hasEmail) {
               
            addUser(thename.value, theemail.value, thetitle.value, thedetails.value)
                
            var iPos = users.length
            //console.log(iPos)
            var recentlyAdded = users[iPos-1]
            console.log("Im recently added: ", recentlyAdded)
            location.href = "buildreg.html?uuid=" + recentlyAdded.uuid
        }   else {
                window.alert("Email not filled in OR email already used!")
            }
           
    }
}