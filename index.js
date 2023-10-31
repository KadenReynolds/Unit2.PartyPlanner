
const COHORT = "2309-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/`+ COHORT;


const partyDiv = document.getElementById("partyDiv")
const addPartyBtn = document.querySelector("button")
const eventForm = document.querySelector("#eventForm")

let parties = {
  events: []
}

async function getEvents(){
  try{
    let response = await fetch(API_URL + '/events')
    let data = await response.json()
    
    parties.events = data.data
  }
  catch(err){
    console.error(err)
  }
}

function renderEvents() {
  if(!parties.events.length){
    parties.innerHTML = `<h2>No Parties</h2>`
    return
  }
  let eventCards = parties.events.map((events) => {
    const eventDivs = document.createElement("div")
    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "X"
    deleteBtn.style.marginTop = "10px"
    deleteBtn.addEventListener("click", async() => {
      try{
        const response = await fetch(API_URL + `/events/${events.id}`, {
          method: "DELETE"
        });
        getEvents()
      } catch(error){
        console.error(error)
      }
    })
    eventDivs.innerHTML = `<h2>${events.name}</h2>
                           <h3>${events.description}</h3>
                           <h4>${events.date}</h4>
                           <address>${events.location}</address>`
    eventDivs.style.margin = "10px"
    eventDivs.style.padding = "10px"
    eventDivs.style.borderRadius = "5px"
    eventDivs.style.backgroundColor = "lightgrey"
    eventDivs.appendChild(deleteBtn)
    return eventDivs
  })
  partyDiv.replaceChildren(...eventCards)
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
    console.log(typeof(date))
    try{
      const response = await fetch(API_URL + "/events", {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          name: name,
          description: description,
          date: `${date}:00.000Z`,
          location: location,
        }),
      })
      console.log(response)
      render()
    } catch(error){
      console.error(error)
    }
  render()
}

eventForm.addEventListener("submit", addEvent)

render()
