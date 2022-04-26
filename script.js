var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';


var tableBody = document.getElementById("tableBody")
var infoWrapper = document.getElementById("info-wrapper")
var userEntered = document.getElementById("search-box")

var userData = []
function userClicked(id) {
    var previousUserId = document.getElementsByClassName("active")[0];
    previousUserId.classList.remove("active");
    var activeUserId = document.getElementById("tr" + id);
    activeUserId.classList.add("active")
    var activeUserDetails = userData.find((user, i) => {
        if (user.id == id) {
            return true
        }
    })

    infoWrapper.innerHTML = `<h1>Details</h1>
    <p>Click on a table item to get detailed information</p>
    <div id= "content${activeUserDetails.id}" class="info-content">
        <div><b>User selected:</b> ${activeUserDetails.firstName} ${activeUserDetails.lastName}</div>
        <div>
            <b>Description: </b>
            <textarea cols="50" rows="5" readonly>
                ${activeUserDetails.description}
            </textarea>
        </div>
        <div><b>Address:</b> ${activeUserDetails.address.streetAddress}</div>
        <div><b>City:</b> ${activeUserDetails.address.city} </div>
        <div><b>State:</b> ${activeUserDetails.address.state}</div>
        <div><b>Zip:</b> ${activeUserDetails.address.zip}</div>`


}
$.get(url, function (response) {
    userData = response
    response.map((index, i) => {
        tableBody.innerHTML += `<tr id ="tr${index.id}" onclick="userClicked('${index.id}')" class="data-row ${i == 2 ? "active" : ""}">
    <td class="column1">${index.id}</td>
    <td class="column2">${index.firstName}</td>
    <td class="column3">${index.lastName}</td>
    <td class="column4">${index.email}</td>
    <td class="column5">${index.phone}</td>
</tr>`


        if (i == 2) {
            infoWrapper.innerHTML = `<h1>Details</h1>
<p>Click on a table item to get detailed information</p>
<div id= "${index.id}" class="info-content">
    <div><b>User selected:</b> ${index.firstName} ${index.lastName}</div>
    <div>
        <b>Description: </b>
        <textarea cols="50" rows="5" readonly>
            ${index.description}
        </textarea>
    </div>
    <div><b>Address:</b> ${index.address.streetAddress}</div>
    <div><b>City:</b> ${index.address.city} </div>
    <div><b>State:</b> ${index.address.state}</div>
    <div><b>Zip:</b> ${index.address.zip}</div>`
        }
    })


})

function userInputs() {
    var inputELement = userEntered.value;
    var userInput = userData.filter((user, i) => {
        if (user.firstName.toLowerCase().includes(inputELement.toLowerCase()) || (user.email.toLowerCase().includes(inputELement.toLowerCase()))) {
            return true
        }

    })
   

    let infoContent = document.getElementsByClassName("info-content")[0]
  


    tableBody.innerHTML = ``
    userInput.map((user, i) => {
        tableBody.innerHTML += `<tr id ="tr${user.id}" onclick="userClicked('${user.id}')" class="data-row ${user.id == infoContent.id ? 'active' : ''}" >
        <td class="column1">${user.id}</td>
        <td class="column2">${user.firstName}</td>
        <td class="column3">${user.lastName}</td>
        <td class="column4">${user.email}</td>
        <td class="column5">${user.phone}</td>
    </tr>`

    })

}
