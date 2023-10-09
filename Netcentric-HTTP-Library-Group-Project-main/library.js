class Library {

    constructor(){
    }

    async Get(targetURL){ // Tested, Works
        let response;

        const requestOptions = {
            method: "GET",
            headers: {"content-type": "application/json"}
        };
        
        response = await this.#processFetch (targetURL, requestOptions);
        return await response;
    }

    async Post(targetURL, data){ // Having issues with response being undefined
        let response;

        const requestOptions = {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data),
        };
        response = await this.#processFetch (targetURL, requestOptions);
        return await response;
    }

    async Put(targetURL, data){ // Having issues with response being undefined
        let response;
    
        const requestOptions = {
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data),
        };
        response = await this.#processFetch (targetURL, requestOptions);
        return await response;
    }

    async Delete(targetURL) { // Somewhat Tested, Believed to Work
        let response;

        const tmp = await this.Get(targetURL);

        const requestOptions = {
            method: "DELETE",
            headers: {"content-type": "application/json"}
        };
        try {
            response = await this.#processFetch (targetURL, requestOptions);
            return await tmp;
        }
        catch{
            return await response;
        }
        return await response;
    }

    async #processFetch (targetURL, requestOptions) { // processes the Fetch Request, used in separate function to clean up code, and add ability to await it

        try{ // tries to handle the fetch
            let data = await fetch(targetURL, requestOptions);
            return data.json();
        }
        catch (exception){ // called if there's an error, passes it back through the chain for output
            throw new Error(exception);
        }
    }

}