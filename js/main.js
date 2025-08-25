// SessionStorage --> keep Cat Count as long as Tab is opened
const STORAGE_KEY = "foundCats";   // speichert ein Array wie ["hedgehog","raccoon"]
const TOTAL_CATS = 7;

// for local and session Storage: https://www.geeksforgeeks.org/javascript/how-to-save-data-in-session-and-local-storage/
//great for dark and light-mode switching using sessionStorage: https://www.javascripttutorial.net/web-apis/javascript-sessionstorage/


//-----------------------SAVING-FUNCTIONS--------------------------

// load fund cats from sessionStorage
function loadFoundSet() {
  const raw = sessionStorage.getItem(STORAGE_KEY);          //read text from browser storage
  const arr = raw ? JSON.parse(raw) : [];                   //text to array
  return new Set(arr);                                      //new set (so that every cat counts individually)
}

// save found cats in sessionStorage 
function saveFoundSet(set) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));            //stringify --> Set back to Text (JSON-Array)  
                                                                            //sessionStorage.setItem(...) --> save Text
}


//-----------------------UPDATE KITTY-COUNTER--------------------------

function updateCounter(foundSet) {
  document.getElementById("count").textContent = foundSet.size;
}


//-----------------------PAGE INITIALIZATION--------------------------

document.addEventListener("DOMContentLoaded", () => {       //wait until HTML finished loading
  const found = loadFoundSet();                             //get found kitties

  document.querySelectorAll(".hidden-cat").forEach(img => {         //go through every <img class="hidden-cat">
    const id = img.getAttribute("data-cat-id");                     //does it have the needed ID?
    if (!id) return;

    if (found.has(id)) {                                            //hide, if already found
      img.style.display = "none";
    } else {
      
      img.addEventListener("click", () => {                         //if not found, add Click-Event-Listener
        img.style.display = "none";  // hide
        found.add(id);               // save ID
        saveFoundSet(found);         // save in sessionStorage
        updateCounter(found);

        //all found
        if (found.size >= TOTAL_CATS) {
          alert("Congratulations! You found them all!");
        }
      }, { once: true });
    }
  });

  updateCounter(found);
});

