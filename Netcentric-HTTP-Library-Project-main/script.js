const http = new Library();
let enumerator = {
    get: 1,
    post: 2,
    put: 3,
    delete: 4,
    patch: 5,
};
function ShowResponse(responseData, isDeletion) {
    let html = "<ul style='list-style:none'>";

    if (Array.isArray(responseData)) {
        responseData.forEach(data => {
            html += processArrayData(data);
        });
    } else {
        html += processSingleData(responseData);
    }

    if (isDeletion === 4) {
        html += `<li>User: ${responseData.id} was Successfully Deleted</li>`;
    }
    if(isDeletion === 2){
        html += `<li>Successfully Created User with ID:${responseData.id} - Name: ${responseData.name}</li>`;
    }
    if(isDeletion == 3){
        if(data.name){
            html += `<li>Successfully Updated User with ID:${responseData.id} - Name: ${responseData.name}</li>`;
        }else{
            html += `<li>Successfully Updated User with ID:${responseData.id} - Title: ${responseData.title}</li>`;
        }
        
    }
    if(isDeletion === 5){
        if(data.name && data.username){
            html += `<li>Successfully Patched User with ID:${responseData.id} - Name: ${responseData.name}</li>`;
        }else{
           html += `<li>Successfully Patched Title with ID:${responseData.id} - Title: ${responseData.Title}</li>`; }
        }

    document.querySelector("#response").innerHTML = html;
}

function processArrayData(data) {
    let html = "";

    if (data.title) {
        html += `<li style=' text-align:left'> |(^_^)|>>${data.id} Title: <strong>${data.title}</strong> - <br> <italic>Body:</italic> ${data.body}</li>`;
    } else if (data.name && data.username) {
        html += `<li style= 'text-align: left'>User ${data.id} - Name: ${data.name} - UserName: ${data.username} - Email: ${data.email}</li>`;
    } else {
        html += `<li>User ${data.title} - ${data.body}</li>`;
    }

    return html;
}

function processSingleData(data) {
    let html = "";

    if (data.title) {
        html += `<li style=' text-align:left'> |(^_^)|>>${data.id} Title: <strong>${data.title}</strong> - <br> <italic>Body: </italic> ${data.body}</li>`;
    } else if (data.name && data.username) {
        html += `<li style= 'text-align: left'>User ${data.id} - Name: ${data.name} - Username: ${data.username} - Email: ${data.email}</li>`;
    } else {
        html += `<li>User ${data} - ${data.body}</li>`;
    }

    return html;
}

function ShowError(err) {
    // Log the error for debugging
    console.error("Error:", err);
    html = `<p>${err}</p>`;
    document.querySelector("#response").innerHTML = html;
}
    async function sendRequest(reqType, targetURL) {
        let data = {
            name: document.querySelector("#name").value,
            username: document.querySelector("#userName").value,
            email: document.querySelector("#email").value,
            id: document.querySelector("#id").value,
        };
        if(data.id === ""){
            data.id = NaN;
        }
        if(data.username === ""){
            delete data.username;
        }
        if(data.email === ""){
            delete data.email;
        }
        if(reqType === 5){
            data["title"] = data["name"];
            data["body"] = data["username"];
        }

    try {
        let response;
        switch (reqType) {
            case 1:
                if(!isNaN(data.id)){
                    response = await http.Get(`${targetURL}/${data.id}`);
                }else{
                    response = await http.Get(targetURL);
                }
                break;
            case 2:
                if(!isNaN(data.id)){
                    response = await http.Post(`${targetURL}/${data.id}`);
                }else{
                    response = await http.Post(targetURL, data);
                }
                break;
            case 3:
                if(!isNaN(data.id)){
                    response = await http.Put(`${targetURL}/${data.id}`);
                }else{
                    response = await http.Put(targetURL, data);
                }
                break;
            case 4:
                if(!isNaN(data.id)){
                    response = await http.Delete(`${targetURL}/${data.id}`);
                }else{
                    response = await http.Delete(targetURL);
                }
                break;
            case 5:
                if(!isNaN(data.id)){
                    response = await http.patch(`${targetURL}/${data.id}`, data);
                }else{
                    response = await http.patch(targetURL, data);
                }
                
                break;
            }
        ShowResponse(response, reqType);
    } catch (exception) {
        ShowError(exception);
    }
}

document.querySelector("#SendReq").addEventListener("click", (e) => {
    const radioButtons = document.querySelectorAll('input[name="HTTPtype"'); 
    const userData = document.querySelectorAll('input[class="UserData"'); 
    const route = document.querySelector("#route").value; 
    let reqType;
    let method;
    for (const radioButton of radioButtons) { 
        if (radioButton.checked) {
            reqType = radioButton.value;
            break;
        }    
    }
    if(reqType === "get"){
        method = enumerator.get;
    }else if(reqType === "post"){
        method = enumerator.post;
    }
    else if(reqType === "put"){
        method = enumerator.put;
    }
    else if(reqType === "delete"){
        method = enumerator.delete;
    }else{
        method = enumerator.patch;
    }
    sendRequest(method,route, userData); 
    
    e.preventDefault();
});