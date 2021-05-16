import {init, addUser, users } from './api.js'
import {stringToHTML} from './helpersfile.js'

window.onload = begin()

function begin() {
    init()  
    var showProfile = document.getElementById("showuser-sec")
    showProfile.appendChild(stringToHTML(`
    <div> 
        <button id="btnNewUser" class="profileBtns"> + New User 
        </button>
    </div>
    `))
    console.log(users)
    users.forEach(element => {
        console.log('im an element here: ')
        
        var el = stringToHTML(`
            <div> 
                <button class="profileBtns">
                    ${element.name} 👤
                </button>
            </div>
        `)
        
        showProfile.appendChild(el)
        var btnpro = el.querySelector(".profileBtns")

        btnpro.onclick = function () {
            location.href = "buildreg.html?uuid=" + element.uuid
        
        }
        
    });  

}

var btnNewUser = document.getElementById("btnNewUser")
btnNewUser.onclick = function () {
    location.href = "createprofile.html"
}


