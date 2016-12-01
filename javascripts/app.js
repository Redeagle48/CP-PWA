if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function() {
        console.log('service worker is is all cool.');
    }).catch(function(e) {
        console.error('service worker is not so cool.', e);
        throw e;
    });
}


var url = "https://api.ost.pt/stops/?trip=133530&route=1051&agency=11&withroutes=false&key=vNRHJGbrYAUxnYbKGHwwGgdzfuxNbSqNnAUCBrhy";

fetch(url, { method: 'GET' })
    .then(function(fetchResponse) { return fetchResponse.json() })
    .then(function(response) {
        console.log(response);
        return response.Objects.reduce(function(stops, stop) {
            return stops.concat(stop.stop_name);
        }, [])
    })
    .then(function(stops) {
        init(stops);
    });


// bling.js
var $ = window.$ = document.querySelector.bind(document);
var $$ = window.$$ = document.querySelectorAll.bind(document);
Node.prototype.on = window.on = function(name, fn) {
    this.addEventListener(name, fn);
}
NodeList.prototype.__proto__ = Array.prototype;
NodeList.prototype.on = NodeList.prototype.addEventListener = (function(name, fn) {
    this.forEach(function(elem) {
        elem.on(name, fn);
    });
});

function constructSelect(name, opts) {
    return '<select id="' + name + 'select">' + opts.reduce(function(prev, curr) {
        return prev + '<option value="' + curr + '">' + curr + '</option>';
    }, '<option disabled selected>Escolha a estação</option>') + '</select>';
}

function init(stops) {
    $('#from').innerHTML = constructSelect('from', stops);
    $('#to').innerHTML = constructSelect('to', stops);
};