const http = new Library();

function ShowResponse(responseData, isDeletion) { // straight from GitHub, works and doesn't need to be edited
    let html = "<ul style='list-style:none'>";
    if (Array.isArray(responseData)) {
        responseData.forEach(user => {
        html += `<li>User ${user.id} - ${user.name}</li>`;
        })
    } else {
        html += `<li>User ${responseData.id} - ${responseData.name}</li>`;
    }
    if (isDeletion === true){
      html += `<li>Successfully Deleted</li>`;
    }
    document.querySelector("#response").innerHTML = html;
}

function ShowError(err) { // straight from GitHub, works and doesn't need to be edited
    html = `<p>${err}</p>`;
    document.querySelector("#response").innerHTML = html;
}



async function sendRequest(reqType, targetURL, userData) {
    let data;
    switch (reqType){ // uses the reqType to decipher which type of request is going to be made
        case "get":
            // code for the fetch request, sends over to the Library Class
            try { // this is for when everything is handled normally
                let response = await http.Get(targetURL);
                ShowResponse(await response, false);
            }
            catch (exception){ // automatically called when an exception (error) is found / caught
                ShowError(exception);
            }
            break;
        case "post":
            data = {
              name: userData[0].value,
              username: userData[1].value,
              email: userData [2].value,
            }
            try {
                let response = await http.Post(targetURL, data);
                ShowResponse(await response, false);
            }
            catch (exception){
                ShowError(exception);
            }
            break;
        case "put":
            data = {
              id: userData[3].value,
              name: userData[0].value,
            }
            try {
                let response = await http.Put(targetURL, data);
                ShowResponse(await response, false);
            }
            catch (exception){
                ShowError(exception);
            }
            break;
        case "delete":
            try {
                let response = await http.Delete(targetURL);
                ShowResponse(await response, true);
            }
            catch (exception){
                ShowError(exception);
            }
            break;
    }
}

// Add the listener to the SEND button
document.querySelector("#SendReq").addEventListener("click", (e) => {
    const radioButtons = document.querySelectorAll('input[name="HTTPtype"'); // collects data from radio buttons selections
    const userData = document.querySelectorAll('input[class="UserData"'); // collects the user entered data for post and put fields
    const route = document.querySelector("#route").value; // collects the url or path that will be used to make the request
    let reqType;
    for (const radioButton of radioButtons) { // searches through the array of radioButtons in order to find the type that is pressed, so that we know what request to make
        if (radioButton.checked) {
        reqType = radioButton.value;
        break;
        }
    }
    sendRequest(reqType,route, userData); // calls function to send request with data that has been parsed

    e.preventDefault();
});
