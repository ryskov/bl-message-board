// Because i am very anti-jquery

export default class HTTPHelper {

    static getUrl() {
        return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + (parseInt(window.location.port, 10) + 1) : '');
        //return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }

    static post(uri, data, baseUrl) {
        return new Promise((resolve, reject) => {
            baseUrl = baseUrl || this.getUrl();
            
            var xmlHttp = new XMLHttpRequest();

            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 201) {
                        try {
                            resolve(JSON.parse(xmlHttp.responseText));
                        }
                        catch (e) {
                            resolve(xmlHttp.responseText);
                        }
                    }
                    else
                        reject(xmlHttp.status);
                } 
            }

            xmlHttp.open("POST", baseUrl + uri, true); // true for asynchronous 
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            xmlHttp.send(JSON.stringify(data));
        });
    }

    static get(uri, baseUrl) {
        return new Promise((resolve, reject) => {
            baseUrl = baseUrl || this.getUrl();

            var xmlHttp = new XMLHttpRequest();

            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 200) {
                        try {
                            resolve(JSON.parse(xmlHttp.responseText));
                        }
                        catch (e) {
                            resolve(xmlHttp.responseText);
                        }
                    }
                    else
                        reject(xmlHttp.status);
                } 
            }

            xmlHttp.open("GET", baseUrl + uri, true); // true for asynchronous 
            xmlHttp.send(null);
        });
    }
}