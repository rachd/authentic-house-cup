export default function get(url) {
    const promise = new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open("GET", url);
        req.onload = function() {
            if (req.status == 200) {
              resolve(req.response);
            }
            else {
              reject(Error(req.statusText));
            }
        };
        req.onerror = function() {
            reject(Error("Network Error"));
        };
        req.send();
    });
    return promise;
}