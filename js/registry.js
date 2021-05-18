import {init, addUser, users, addItem, getCurrentProfile, dltItem, uuid, getItem, ungetItem} from './api.js'
import {stringToHTML} from './helpersfile.js'

window.onload = start()


function start() {
    init()
    console.log(uuid)

    console.log('all users right now: ', users)

    var regList = document.getElementById("reg-list")
    regList.appendChild(stringToHTML(`
        <div class="yourdetails"> 
            <h2> Gift Registry Details
            </h2>
            <p> Sent by: ${getCurrentProfile().name}
            </p>
            <p> Contact: ${getCurrentProfile().email}
            </p>
            <p>  ${getCurrentProfile().grtitle}
            </p>
            <p> ${getCurrentProfile().grdscrptn}
            </p>
            <p> ${getCurrentProfile().grdate}
            </p>
            
        
        </div>
        `))
    showGifts()
}


function showGifts () {
    var currentRegArr = getCurrentProfile().giftreg
    var regList = document.getElementById("view-list")
    regList.innerHTML = " "
    currentRegArr.forEach(element => {
        console.log('im an element here: ', element.giftname ,  element.assigned)
       if (!element.assigned) {
            var el = stringToHTML(`
                <div> 
                    <div>  ${element.giftname} 
                    <button class="giftGet">
                        Get
                    </button>
                    </div>
                </div>
            `)
        }  else {
            var el = stringToHTML(`
                <div> 
                    <div> <p><s>${element.giftname} </s></p>
                    <button class="giftGet" disabled="">
                        Get
                    </button>
                    <button class="giftUndo">
                    Undo
                    </button>

                    </div>
                </div>
            `)
            
        }  
        
        regList.appendChild(el)
        
        var btnGet = el.querySelector(".giftGet")

        var btnUndo = el.querySelector(".giftUndo")

        btnGet.onclick = function () {
           // dltItem (element.giftname)
           //element.assigned = true
            console.log("i am pressing a button") 
            getItem(element)
            showGifts()
        }   

        // btnUndo.onclick = function () {
        //     // dltItem (element.giftname)
        //     //element.assigned = true
        //      console.log("undid honey") 
        //      ungetItem(element)
        //      showGifts()

        //      //getItem(element)
        //      //showGifts()
        // }   



    });   
}


// function getItem () {

// }

