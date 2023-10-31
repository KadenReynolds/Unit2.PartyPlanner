
const COHORT = '2309-FTB-ET-WEB-FT'
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`


const partyDiv = document.getElementById("partyDiv")
const addPartyBtn = document.querySelector("button")
const eventForm = document.getElementById("eventForm")
let parties = []

async function getEvents(){
  try{
    let response = await fetch(API_URL)
    let data = await response.json()
    
    parties = data.data
    console.log(parties)
  }
  catch(err){
    console.error(err)
  }
}

async function renderEvents() {
  let eventCards = parties.map((events) => {
    const eventDivs = document.createElement("div")
    eventDivs.innerHTML = `<h2>${events.name}</h2>
                           <h3>${events.date}</h3>
                           <h4>${events.location}</h4>
                           <p>${events.description}</p>`
    eventDivs.style.margin = "10px"
    eventDivs.style.padding = "10px"
    eventDivs.style.borderRadius = "5px"
    eventDivs.style.backgroundColor = "lightgrey"
    partyDiv.appendChild(eventDivs)
  })
}

async function render(){
  await getEvents()
  renderEvents()
}

async function addEvent(event){
    event.preventDefault()
    let name = eventForm.name.value
    let date = eventForm.datetime.value
    let location = eventForm.location.value
    let description = eventForm.description.value
    console.log(name)
    console.log(date)
    console.log(location)
    console.log(description)
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-type': 'application/json' },
      body: JSON.stringify({
        name,
        date,
        location,
        description,
      }),
    })
    render()
}

eventForm.addEventListener("submit", addEvent)

render()
