/*
==========================================================
Fetxh() Expansion: Cross-Origin Requests
==========================================================
*/

/*
If we make a fetch from an arbitrary web-site, that will probably fail.

The core concept here is origin:

- a domain/port/protocol triplet.

Cross-origin requests:

- those sent to another domain (even a subdomain) or protocol or port.

- require special headers from the remote side. 

- that policy is called “CORS”: Cross-Origin Resource Sharing.
*/

//The below fetch is meant to fail
    try {

        await fetch('http://example.com');
      
      } catch(err) {
      
        alert(err); // Failed to fetch
      
      }

/*
==========================================================
Form Expansion
==========================================================
*/

/*
<form> allows communication with another server, when it's submitted into an <iframe> in order to stay on the current page.
*/

//Example in HTML Notes

/*
- it's possible to make a GET/POST request to another site, even without networking methods.

- but as it’s forbidden to access the content of an <iframe>from another site, it wasn’t possible to read the response.
*/


/*
==========================================================
Simple Requests
==========================================================
*/

/*
2 types of cross-domain requests:

- Simple requests : request that satisfies 2 conditions:
                    - Simple method : GET, POST or HEAD
                    - Simple headers : only allowed custome headers are:
                        - Accept,
                        - Accept-Language,
                        - Content-Language,
                        - Content-Type with the value application/x-www-form-urlencoded, multipart/form-data or text/plain.

- All the others : considered "non-simple", such as requests with PUT method or with an API-Key HTTP-header does not fit limitations.
*/

/*
==========================================================
CORS for Simple Requests
==========================================================
*/

/*
If a request is cross-origin, the browser always adds Origin header to it: https://anywhere.com/request from https://javascript.info/page.

Headers can vary between:

- GET /request
- Host : anywhere.com
- Origin : https://javascript.info

Accepted requests adds special header "Access-Control-Allow-Origin": allowed origin (in our case https://javascript.info), or a star (*), otherwise, error.

Browser - trusted mediator, ensure correct 'Origin' is sent with a cross-domain request.

ACAO Flowchart link - https://d24jp206mxeyfm.cloudfront.net/assets/courseware/v1/a60912c3434a790457266a561933c102/asset-v1:CITI+CAP004+2021+type@asset+block/blockgraph1.PNG 

Example of permissive server response:

200 OK
Content-Type:text/html; charset=UTF-8
Access-Control-Allow-Origin: https://javascript.info
*/

/*
==========================================================
Response Headers
==========================================================
*/

/*
For cross-origin request, by default JavaScript may only access “simple response headers”:

- Cache-Control
- Content-Language
- Content-Type
- Expires
- Last-Modified
- Pragma

Any other response header is forbidden.

*NB: Please note: there’s no Content-Length header in the list.

To grant JavaScript access to any other response header, the server must list it in the Access-Control-Expose-Headers header.

For example:

200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Expose-Headers: Content-Length,API-Key

With such Access-Control-Expose-Headersheader, the script is allowed to access Content-Length and API-Key headers of the response.
*/

/*
==========================================================
Non-Simple Requests
==========================================================
*/

/*
Makes use of all HTTP-methods: GET/POST, PATCH, DELETE, etc.

"Non-simple" requests are not made by the browser immediately, rather is sends a preliminary "preflight" request asking for permission.

Preflight - uses method OPTIONS and has no body:

- Access-Control-Request-Method header has the requested method.

- Access-Control-Request-Headers header provides a comma-separated list of non-simple HTTP-headers.

If the server agrees to serve the requests, then it should respond with status 200, without body:

- The response header Access-Control-Allow-Methods must have the allowed method.

- The response header Access-Control-Allow-Headers must have a list of allowed headers.

- Additionally, the header Access-Control-Max-Age may specify a number of seconds to cache the permissions. So the browser won’t have to send a preflight for subsequent requests that satisfy given permissions.

Flow chart representation: https://d24jp206mxeyfm.cloudfront.net/assets/courseware/v1/67801d028d172f2ec4d8104cd349b6f7/asset-v1:CITI+CAP004+2021+type@asset+block/nonsnimplerequestiteds.PNG 
*/

//Cross-domain PATCH request (this method is often used to update data):


let response = await fetch('https://site.com/service.json', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'API-Key': 'secret'
    }
});

/*
3 reasons why request is "non-simple":

- Method PATCH

- Content-Type is not one of : application/x-www-form-urlencoded, multipart/form-data, text/plain.

- “Non-simple” API-Key header.

Step 1: The browser sends a preflight request to the server before sending the actual request. The preflight request includes the path, host, and cross-origin special headers such as the origin, requested method, and non-simple headers.

Step 2: The server responds with status 200 and headers that allow future communication. The headers include Access-Control-Allow-Methods and Access-Control-Allow-Headers, which specify the allowed methods and headers for future requests.

Step 3: If the preflight is successful, the browser sends the actual request with the Origin header, which identifies it as a cross-origin request.

Step 4: The server responds with the actual response and includes the Access-Control-Allow-Origin header to allow JavaScript to read the full response. It is important to note that the preflight request does not relieve the server from including this header in the actual response.
*/

/*
==========================================================
Credentials
==========================================================
*/

//To send credentials, we need to add the option credentials: "include", like this:

fetch('http://another.com', {

  credentials: "include"

});

/*

Now fetch sends cookies originating from another.com without request to that site.

If the server wishes to accept the request with credentials, it should add a header Access-Control-Allow-Credentials: true to the response, in addition to Access-Control-Allow-Origin.

For example:

200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Credentials: true

*/

/*
Simple requests must satisfy specific conditions:

- Method : GET, POST, or HEAD 
- Headers: 
    - Accept 
    - Accept-Language
    - Content-Type to specific values: application/x-www-form-urlencoded, multipart/form-data or text/plain.

Simple requests are sent right away with the Origin header, while non-simple requests require a preliminary "preflight" request asking for permission.

- The browser sends Origin header with the origin.

- For requests without credentials (not sent default), the server should set:

    - Access-Control-Allow-Origin to * or same value as Origin

- For requests with credentials, the server should set:

    - Access-Control-Allow-Origin to the same value as Origin

    - Access-Control-Allow-Credentials to true

If JavaScript wants to access non-simple response headers:

- Cache-Control
- Content-Language
- Content-Type
- Expires
- Last-Modified
- Pragma

For non-simple requests, a preliminary “preflight” request is issued before the requested one:

- The browser sends OPTIONS request to the same URL, with headers:

    - Access-Control-Request-Method has requested method.

    - Access-Control-Request-Headers lists non-simple requested headers.

- The server should respond with status 200 and headers:

    - Access-Control-Allow-Methods with a list of allowed methods.

    - Access-Control-Allow-Headers with a list of allowed headers.

    - Access-Control-Max-Age with a number of seconds to cache permissions.

- Then the actual request is sent, the previous “simple” scheme is applied.
*/

/*
Why do we need Origin?

- There’s HTTP-header Referer, that usually contains a URL of the page which initiated a network request.

Example:

when fetching http://google.comfrom http://javascript.info/some/url, the headers look like this:

- Accept : * / *
- Accept-Charset : utf-8
- Accept-Encoding : gzip,deflate,sdch
- Connection : keep-alive
- Host : google.com
- Origin : http://javascript.info
- Referer : http://javascript.info/some/url

^ Both Referer and Origin are present.
*/

/*
Solutions:

- We need Origin, because sometimes Referer is absent. For instance, when we fetch HTTP-page from HTTPS (access less secure from more secure), then there’s no Referer.

- The Content Security Policy may forbid sending a Referer.

- fetch() has options that prevent sending the Referer and even allow to change it (within the same site).

- By specification, Referer is an optional HTTP-header.

- Exactly because Referer is unreliable, Origin was invented. The browser guarantees correct Origin for cross-origin requests
*/

/*
==========================================================
Fetch API
==========================================================
*/

//full list of all possible fetch options with their default values (alternatives in comments):

let promise = fetch(url, {
        method: "GET", // POST, PUT, DELETE, etc.
        headers: {
            // the content type header value is usually auto-set depending on the request body 
            "Content-Type": "text/plain; charset=UTF-8"
        },
        
        body: undefined, // string, FormData, Blob, BufferSource, or URLSearchParams
        referrer: "about:client", // or "" to send no Referer header, or an url from the current origin 
        referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
        mode: "cors", // same-origin, no-cors
        credentials: "same-origin", // omit, include
        cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
        redirect: "follow", // manual, error
        integrity: "", // a hash, like "sha256-abcdef1234567890"
        keepalive: false, // true
        signal: undefined, // AbortController to abort request
        window: window // null
    });

//The referrer option allows to set any Refererwithin the current origin) or disable it.

//To send no referer, set an empty string:
fetch('/page', {
    referrer: "" // no Referer header
});

//To set another URL within the current origin:
fetch('/page', {
    // assuming we're on https://javascript.info
    // we can set any Referer header, but only within the current origin
    referrer:
    "https://javascript.info/anotherpage"
});

/*
The referrerPolicy option sets general rules forReferer.

Possible values are described in the Referrer Policy specification:

- "no-referrer-when-downgrade" (default value) : Referer is sent always, unless we send a request from HTTPS to HTTP (to less secure protocol).

- "no-referrer" : never send Referer.

- "origin" : only send the origin in Referer, not the full page URL, e.g. http://site.com instead of http://site.com/path.

- "origin-when-cross-origin" : send full Referer to the same origin, but only the origin part for cross-origin requests.

- "same-origin" : send full Referer to the same origin, but no referer for for cross-origin requests.

- "strict-origin" : send only origin, don’t send Referer for HTTPS→HTTP requests.

- "strict-origin-when-cross-origin" : for same-origin send full Referer, for cross-origin send only origin, unless it’s HTTPS→HTTP request, then send nothing.

- "unsafe-url" : always send full url in Referer.
*/

//If we send a cross-origin fetch, then by default it sends the Referer header with the full URL of our page (except when we request from HTTPS to HTTP, then no Referer).

//E.g. Referer: https://javascript.info/admin/secret/paths, if we’d like to totally hide the referrer:

fetch('https://another.com/page', {

  referrerPolicy: "no-referrer" // no Referer, same effect as referrer: ""

});

//If we’d like the remote side to see only the domain where the request comes from, but not the full URL, we can send only the “origin” part of it:

fetch('https://another.com/page', {

  referrerPolicy: "strict-origin" // Referer: https://javascript.info

});

mode

/*
The mode option serves as a safe-guard that prevents cross-origin requests:

- "cors" : the default, cross-origin requests are allowed, as described in Fetch: Cross-Origin Requests.

- "same-origin" : cross-origin requests are forbidden.

- "no-cors" : only simple cross-origin requests are allowed.
*/

credentials

/*
The credentials option specifies whether fetch should send cookies and HTTP-Authorization headers with the request.

- "same-origin" : the default, don’t send for cross-origin requests,
- "include" : always send, requires Accept-Control-Allow-Credentials from the cross-origin server,
- "omit" : never send, even for same-origin requests.
*/

cache

/*
The cache options allow to ignore HTTP-cache or fine-tune its usage:

- "default" : fetch uses standard HTTP-cache rules and headers.

- "no-store" : totally ignore HTTP-cache, this mode becomes the default if we set a header If-Modified-Since, If-None-Match, If-Unmodified-Since, If-Match, or If-Range.

- "reload" : don’t take the result from HTTP-cache (if any), but populate cache with the response (if response headers allow).

- "no-cache" : create a conditional request if there is a cached response, and a normal request otherwise. Populate HTTP-cache with the response.

- "force-cache" : use a response from HTTP-cache, even if it’s stale. If there’s no response in HTTP-cache, make a regular HTTP-request, behave normally.

- "only-if-cached" : use a response from HTTP-cache, even if it’s stale. If there’s no response in HTTP-cache, then error. Only works when the mode is "same-origin".
*/

redirect

/*
Normally, fetch transparently follows HTTP-redirects, like 301, 302, etc.

The redirect option allows to change that:

- "follow" : the default, follow HTTP-redirects.

- "error" : error in case of HTTP-redirect.

- "manual" : don’t follow HTTP-redirect, but response.url will be the new URL, and response.redirected will be true, so that we can perform the redirect manually to the new URL (if needed).
*/

integrity

/*
The integrity option allows to check if the response matches the known-ahead checksum.

As described in the specification, supported hash-functions are SHA-256, SHA-384, and SHA-512, there might be others depending on a browser.

For example, we’re downloading a file, and we know that it’s SHA-256 checksum is “abc” (a real checksum is longer, of course).
*/

//We can put it in the integrity option, like this:

fetch('http://site.com/file', {

  integrity: 'sha256-abd'

});

//Then fetch will calculate SHA-256 on its own and compare it with our string. In case of a mismatch, an error is triggered.

keepalive

/*
The keepalive option indicates that the request may outlive the page.

For example, we gather statistics about how the current visitor uses our page (mouse clicks, page fragments he views), to improve user experience.

When the visitor leaves our page – we’d like to save it on our server.
*/

//We can use window.onunload for that:

window.onunload = function() {

  fetch('/analytics', {

    method: 'POST',

    body: "statistics",

    keepalive: true

  });

};

/*Normally, when a document is unloaded, all associated network requests are aborted. But the keepalive option tells the browser to perform the request in background, even after it leaves the page. So it’s essential for our request to succeed.

- We can’t send megabytes: the body limit for keepalive requests is 64kb.
    - If we gather more data, we can send it out regularly, then there won’t be a lot for the “onunload” request.
    - The limit is for all currently ongoing requests. So we cheat it by creating 100 requests, each 64kb.
- We don’t get the server response if the request is made onunload, because the document is already unloaded at that time.
    - Usually, the server sends an empty response to such requests, so it’s not a problem
*/