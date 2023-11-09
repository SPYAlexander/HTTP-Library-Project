// Create a new instance of the Library class
const http = new Library();

// Define an enumerator for HTTP request types
let enumerator = {
    get: 1,     // GET request
    post: 2,    // POST request
    put: 3,     // PUT request
    delete: 4,  // DELETE request
    patch: 5,   // PATCH request
};

// Function to display the response data in an HTML element
function ShowResponse(responseData, isDeletion) {
    let html = "<ul style='list-style:none'>";

    // Check if the response data is an array
    if (Array.isArray(responseData)) {
        // Process each element in the array
        responseData.forEach(data => {
            html += processArrayData(data);
        });
    } else {
        // Process a single data element
        html += processSingleData(responseData);
    }

    // Display a specific message based on the type of request (isDeletion)
    if (isDeletion === 4) {
        html += `<li>User: ${responseData.id} was Successfully Deleted</li>`;
    }
    if (isDeletion === 2) {
        html += `<li>Successfully Created User with ID:${responseData.id} - Name: ${responseData.name}</li>`;
    }
    if (isDeletion == 3) {
        if (data.name) {
            html += `<li>Successfully Updated User with ID:${responseData.id} - Name: ${responseData.name}</li>`;
        } else {
            html += `<li>Successfully Updated User with ID:${responseData.id} - Title: ${responseData.title}</li>`;
        }
    }
    if (isDeletion === 5) {
        if (data.name && data.username) {
            html += `<li>Successfully Patched User with ID:${responseData.id} - Name: ${responseData.name}</li>`;
        } else {
            html += `<li>Successfully Patched Title with ID:${responseData.id} - Title: ${responseData.Title}</li>`;
        }
    }

    // Display the HTML content in the 'response' element
    document.querySelector("#response").innerHTML = html;
}

// Function to process data in an array
function processArrayData(data) {
    let html = "";

    // Check the structure of the data and format accordingly
    if (data.title) {
        html += `<li style='text-align:left'> |(^_^)|>>${data.id} Title: <strong>${data.title}</strong> - <br> <em>Body:</em> ${data.body}</li>`;
    } else if (data.name && data.username) {
        html += `<li style='text-align: left'>User ${data.id} - Name: ${data.name} - UserName: ${data.username} - Email: ${data.email}</li>`;
    } else {
        html += `<li>User ${data.title} - ${data.body}</li>`;
    }

    return html;
}

// Function to process a single data element
function processSingleData(data) {
    let html = "";

    // Check the structure of the data and format accordingly
    if (data.title) {
        html += `<li style='text-align:left'> |(^_^)|>>${data.id} Title: <strong>${data.title}</strong> - <br> <em>Body: </em> ${data.body}</li>`;
    } else if (data.name && data.username) {
        html += `<li style='text-align: left'>User ${data.id} - Name: ${data.name} - Username: ${data.username} - Email: ${data.email}</li>`;
    } else {
        html += `<li>User ${data} - ${data.body}</li>`;
    }

    return html;
}

// Function to display an error message in the console and on the web page
function ShowError(err) {
    console.error("Error:", err);
    html = `<p>${err}</p>`;
    document.querySelector("#response").innerHTML = html;
}

// Function to send an HTTP request based on the request type (reqType) and the target URL (targetURL)
async function sendRequest(reqType, targetURL) {
    // Gather user input data from the HTML form
    let data = {
        name: document.querySelector("#name").value,
        username: document.querySelector("#userName").value,
        email: document.querySelector("#email").value,
        id: document.querySelector("#id").value,
    };

    // Handle edge cases where input fields may be empty or NaN
    if (data.id === "") {
        data.id = NaN;
    }
    if (data.username === "") {
        delete data.username;
    }
    if (data.email === "") {
        delete data.email;
    }

    // For PATCH request, assign 'title' and 'body' based on 'name' and 'username'
    if (reqType === 5) {
        data["title"] = data["name"];
        data["body"] = data["username"];
    }

    try {
        let response;
        switch (reqType) {
            case 1: // GET request
                if (!isNaN(data.id)) {
                    response = await http.Get(`${targetURL}/${data.id}`);
                } else {
                    response = await http.Get(targetURL);
                }
                break;
            case 2: // POST request
                if (!isNaN(data.id)) {
                    response = await http.Post(`${targetURL}/${data.id}`);
                } else {
                    response = await http.Post(targetURL, data);
                }
                break;
            case 3: // PUT request
                if (!isNaN(data.id)) {
                    response = await http.Put(`${targetURL}/${data.id}`);
                } else {
                    response = await http.Put(targetURL, data);
                }
                break;
            case 4: // DELETE request
                if (!isNaN(data.id)) {
                    response = await http.Delete(`${targetURL}/${data.id}`);
                } else {
                    response = await http.Delete(targetURL);
                }
                break;
            case 5: // PATCH request
                if (!isNaN(data.id)) {
                    response = await http.patch(`${targetURL}/${data.id}`, data);
                } else {
                    response = await http.patch(targetURL, data);
                }
                break;
        }
        // Display the response using the ShowResponse function
        ShowResponse(response, reqType);
    } catch (exception) {
        // Handle exceptions by displaying an error message using ShowError function
        ShowError(exception);
    }
}

// Event listener for the "SendReq" button click
document.querySelector("#SendReq").addEventListener("click", (e) => {
    // Gather input elements and route information
    const radioButtons = document.querySelectorAll('input[name="HTTPtype"'); 
    const userData = document.querySelectorAll('input[class="UserData"'); 
    const route = document.querySelector("#route").value; 
    let reqType;
    let method;

    // Determine the selected request type (GET, POST, PUT, DELETE, PATCH)
    for (const radioButton of radioButtons) { 
        if (radioButton.checked) {
            reqType = radioButton.value;
            break;
        }    
    }

    // Map the request type to the corresponding method using the 'enumerator'
    if (reqType === "get") {
        method = enumerator.get;
    } else if (reqType === "post") {
        method = enumerator.post;
    } else if (reqType === "put") {
        method = enumerator.put;
    } else if (reqType === "delete") {
        method = enumerator.delete;
    } else {
        method = enumerator.patch;
    }

    // Call the sendRequest function to send the HTTP request
    sendRequest(method, route, userData);

    e.preventDefault(); // Prevent the default form submission behavior
});
