const timer = document.getElementById("timer");
const quotes = document.getElementById("quotes");
const input = document.getElementById("input");
const button = document.querySelector(".button");

let apiText = [];
let x = 1;

input.addEventListener("input", () => {
    const spanElement = document.querySelectorAll("span");
    const inputElement = input.value;
    spanElement.forEach((element, index) => {
        let char = inputElement[index];
        if (char == null) {
            element.classList.remove("correct");
            element.classList.remove("incorrect")

        } else if (char === element.innerHTML) {
            element.classList.add("correct");
            element.classList.remove("incorrect")
        } else {
            element.classList.remove("correct");
            element.classList.add("incorrect")
        }
        const correctElement = document.querySelectorAll(".correct");

        if (correctElement.length == spanElement.length) {
            button.disabled = false;
            input.disabled = true;
            clearInterval(timeSet);
            timer.innerText = `${timer.innerText}  Seconds`
            window.addEventListener("keydown",(e)=>{
                if(e.keyCode===13){
                    e.preventDefault();
                    button.click();
                }
            })
          
        }

    })
})

button.addEventListener("click", () => {
    const spanElement = document.querySelectorAll("span");
    timer.innerText = 0;
    input.value = "";
    input.disabled = false;
    button.disabled = true;
    spanElement.forEach(element => {
        element.remove();
    })
    x = 1;
    timeSet = setInterval(writeText, 1000);
    getText();

})

var timeSet = setInterval(writeText, 1000)
function writeText() {
    timer.innerText = x++;
}


async function getText() {
    const apiUrl = "https://type.fit/api/quotes"
    try {
        const response = await fetch(apiUrl);
        apiText = await response.json(response);
        getQuetes();
    } catch (error) {
        console.log(error)
    }
}

function getQuetes() {
    var text = apiText[Math.floor(Math.random() * apiText.length)].text
    if (text.length>=150) {
        getText();
        x=0;
    } else {
        text.split("").forEach(element => {
            const span = document.createElement("span");
            span.innerText = element;
            quotes.appendChild(span);
            

        });
    }
}

getText();