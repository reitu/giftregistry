import { addItem, getCurrentProfile, dltItem, uuid} from './api.js'
import {stringToHTML} from './helpersfile.js'

window.onload = begin()

function begin() {
    const registryURL = "registry.html?uuid=" + uuid
    const queryString = window.location.search  
    const userID = new URLSearchParams(queryString).get('uuid')
    var currentProfile = getCurrentProfile(userID)

    var infoProfile = document.getElementById("profile-info")
    infoProfile.appendChild(stringToHTML(`
        <div class="yourdetails"> 
            <h2> Your Gift Registry Details
            </h2>
            <p> Your name: ${currentProfile.name}
            </p>
            <p> Your email: ${currentProfile.email}
            </p>
            <p>  ${currentProfile.grtitle} 
            </p>
            <p> ${currentProfile.grdscrptn}
            </p>
            <p> ${currentProfile.grdate}
            </p>
            <p style="padding-top: 40px"> Share your registry link below with friends and family after you've added your items. You can come back to this page to see who your gifts have been allocated to. </p>
            <div><a href="${registryURL}" target="_blank">${registryURL}</a></div>
            
        </div>
        `))
    renderGifts()
}


const giftForm = document.getElementById("listform") 
giftForm.onsubmit = newGift


function newGift (e) {
    const queryString = window.location.search 
    const userID = new URLSearchParams(queryString).get('uuid')


    e.preventDefault()

    var giftname = document.getElementById("itemName")
    var giftdes = document.getElementById("itemDes")

        var result = addItem(giftname.value, giftdes.value, userID)  
        if (result) {
            renderGifts() 
        
        } else {
            window.alert("Gift field empty or You've already entered that item.")
        }
    giftname.value = ''
    giftdes.value = ''
}


function renderGifts () {
    
    const queryString = window.location.search  
    const userID = new URLSearchParams(queryString).get('uuid')
    var currentProfile = getCurrentProfile(userID)

    var currentRegArr = currentProfile.giftreg
    var showReg = document.getElementById("showreg")
    showReg.innerHTML = " "
    currentRegArr.forEach(element => { 
        
        if (element.assigned) {
            var responder = element.assigned
            var el = stringToHTML(`
                <div class="item-listed"> 
                    <div>
                        <p>${element.giftname}</p>
                        <p style="color: grey;">${element.giftdescription}</p>
                    </div>
                    <button class="giftRemove" disabled = "">
                        ✅ Allocated to ${responder.name} 
                    </button>
                </div>
            `)
        } else {
            var el = stringToHTML(`
                <div class="item-listed"> 
                    <div>
                        <p>${element.giftname}</p>
                        <p style="color: grey;">${element.giftdescription}</p>
                    </div>
                    <button class="giftRemove">
                        ❌ Remove
                    </button>
                </div>
            `)
        }
        
        showReg.appendChild(el)
        var btnRemove = el.querySelector(".giftRemove")

        btnRemove.onclick = function () {
            dltItem (userID, element.giftname) 
            renderGifts()
        }   
    });   
}

