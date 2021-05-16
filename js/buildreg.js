import {init, addUser, users, addItem, getCurrentProfile, dltItem} from './api.js'
import {stringToHTML} from './helpersfile.js'

window.onload = begin()


function begin() {
    init()        

    console.log('all users right now: ', users)

    var infoProfile = document.getElementById("profile-info")
    infoProfile.appendChild(stringToHTML(`
        <div class="yourdetails"> 
            <h2> Your Gift Registry Details
            </h2>
            <p> Your name: ${getCurrentProfile().name}
            </p>
            <p> Your email: ${getCurrentProfile().email}
            </p>
            <p>  ${getCurrentProfile().grtitle}
            </p>
            <p> ${getCurrentProfile().grdscrptn}
            </p>
            <p> ${getCurrentProfile().grdate}
            </p>

            <button> Edit Profile </button>
        </div>
        `))
    renderGifts()
}


const giftForm = document.getElementById("listform") //FORM SECTION FOR GIFT
giftForm.onsubmit = newGift


function newGift (e) {
    e.preventDefault()

    var giftname = document.getElementById("itemName")
    var giftdes = document.getElementById("itemDes")
    
    if (giftname.value) {
        var hasGift = false

        getCurrentProfile().giftreg.forEach(function (el) {
          if (el.giftname === giftname.value) {
            hasGift = true
          }
        });

        if (!hasGift) {

            addItem(giftname.value, giftdes.value)
            renderGifts()
        } else {
            window.alert("You've already entered that item.")
        }
    }
    giftname.value = ''
    giftdes.value = ''
}


function renderGifts () {
    var currentRegArr = getCurrentProfile().giftreg
    var showReg = document.getElementById("showreg")
    showReg.innerHTML = " "
    currentRegArr.forEach(element => {
        console.log('im an element here: ')
        
        var el = stringToHTML(`
            <div> 
                <div> ${element.giftname} 
                <button class="giftRemove">
                    ❌
                </button>
                </div>
            </div>
        `)
        
        showReg.appendChild(el)
        var btnRemove = el.querySelector(".giftRemove")

        btnRemove.onclick = function () {
            dltItem (element.giftname)
            console.log("i am pressing a button") 
            renderGifts()
        }   
    });   
}

