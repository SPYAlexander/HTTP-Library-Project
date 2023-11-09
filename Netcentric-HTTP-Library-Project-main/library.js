class Library {

    // Constructor for the Library class
    constructor(){
    }

    // Perform a GET request to the specified URL
    async Get(targetURL){ 
        let response;

        // Define the options for the GET request
        const requestOptions = {
            method: "GET",
            headers: {"content-type": "application/json"}
        };
        
        // Execute the GET request using the private method #processFetch
        response = await this.#processFetch(targetURL, requestOptions);
        return await response;
    }

    // Perform a POST request to the specified URL with data
    async Post(targetURL, data){
        let response;

        // Define the options for the POST request, including the data to send
        const requestOptions = {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data),
        };
        
        // Execute the POST request using the private method #processFetch
        response = await this.#processFetch(targetURL, requestOptions);
        return await response;
    }

    // Perform a PUT request to the specified URL with data
    async Put(targetURL, data){ 
        let response;
    
        // Define the options for the PUT request, including the data to send
        const requestOptions = {
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data),
        };
        
        // Execute the PUT request using the private method #processFetch
        response = await this.#processFetch(targetURL, requestOptions);
        return await response;
    }

    // Perform a DELETE request to the specified URL
    async Delete(targetURL) {
        let response;

        // First, execute a GET request to the same URL to capture the response before deletion
        const tmp = await this.Get(targetURL);

        // Define the options for the DELETE request
        const requestOptions = {
            method: "DELETE",
            headers: {"content-type": "application/json"}
        };

        try {
            // Execute the DELETE request using the private method #processFetch
            response = await this.#processFetch(targetURL, requestOptions);
            return await tmp; // Return the response captured by the GET request
        }
        catch (error) {
            // In case of an exception, return the response from the DELETE request
            return await response;
        }
    }

    // Private method to process a fetch request
    async #processFetch(targetURL, requestOptions) { 

        try{ 
            // Use the Fetch API to perform the HTTP request
            let data = await fetch(targetURL, requestOptions);
            return data.json(); // Parse and return the JSON response
        }
        catch (exception){ 
            // Handle exceptions and throw an error with the details
            throw new Error(exception);
        }
    }        
}
