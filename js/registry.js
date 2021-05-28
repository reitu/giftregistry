import {getCurrentProfile, finalizeGift} from './api.js' 
import {stringToHTML} from './helpersfile.js'

window.onload = start() 

function start() { 
    
    const queryString = window.location.search 
    const userID = new URLSearchParams(queryString).get('uuid')
    var userProfile = getCurrentProfile(userID)  

    var regList = document.getElementById("reg-list")
    regList.appendChild(stringToHTML(`
        <div class="yourdetails"> 
            <h2> Gift Registry Details
            </h2>
            <p> Sent by: ${userProfile.name}
            </p>
            <p> Contact: ${userProfile.email}
            </p>
            <p>${userProfile.grtitle}</p>
            <p>${userProfile.grdscrptn}</p>
            <p>
                ${userProfile.grdate}
            </p>
        </div>
        `))
   showGifts()
}


var giftArr = []
function showGifts () {

    const queryString = window.location.search 
    const userID = new URLSearchParams(queryString).get('uuid')
    var userProfile = getCurrentProfile(userID) 

    var currentRegArr = userProfile.giftreg
    var regList = document.getElementById("view-list")
    regList.innerHTML = " "
    currentRegArr.forEach(element => {
        
        if (element.assigned) return

        var el = stringToHTML(`
            <div> 
                <div> 
                <label for="gift"> ${element.giftname} </label>
                <input type="checkbox" class="gifts">
                </div>
                
            </div>
        `)
        regList.appendChild(el)

        var checkGift = el.querySelector(".gifts")

        checkGift.onchange = function () {

            if (checkGift.checked) {
                giftArr.push(element)   
            } 
            if(!checkGift.checked) {
                var iPlace = giftArr.indexOf(element)
                giftArr.splice(iPlace, 1)
            }
        }
    });   
    
}



var btnFinish = document.getElementById("btnFinish")

btnFinish.onclick = function() {
    
    const queryString = window.location.search 
    const userID = new URLSearchParams(queryString).get('uuid')
    
    var thename = document.getElementById("res-name")
    var theemail = document.getElementById("res-email")
    
    var result = finalizeGift(userID, giftArr, thename.value, theemail.value)
    console.log('result', result) 

    if (result) {
        window.alert('✅ Awesome, you have selected your items!')
    }   else { 
        window.alert("you have to pick a gift and enter your details")
    }
}







