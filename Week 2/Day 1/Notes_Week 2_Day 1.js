/*
==========================================================
FileReader
==========================================================
*/

/*
FileReader - object with the sole purpose of reading data from Blob objects, delivers data using events as opposed to reading from disks as it's faster.
*/

//Constructor:
let reader = new FileReader(); // no arguments

/*
Main method:

- readAsArrayBufer(blob) : read data in binary format ArrayBuffer.
- readAsText(blob, [encoding]) : read data as text string with the given code (utf-8by default)
- readAsDataURL(blob) : read binary data and encode it as base64 data url.
- abort() : cancel the operation.

As the reading proceeds, there are events:

- loadstart : loading started.
- progress : occurs during reading.
- load : no errors, reading complete.
- abort : abort() called.
- error : error has occurred.
- loadend : reading finished with either success or failure.

Access the result as:

- reader.result is the result (if successful)
- reader.error is the error (if failed).
*/

/*
==========================================================
Fetch
==========================================================
*/

/*
 “AJAX” - abbreviated Asynchronous Javascript And XML (XML isn't needed)

 fetch() - sends network requests to get information from the server.
*/

//fetch() syntax
let promise = fetch(url/*url access*/, [options/*optional parameters: methods, headers, etc.*/]);

/*
Response properties:

- ok : boolean, true if the HTTP status code is 200-299.

- status : HTTP status code.
*/

/*
==========================================================
Post Requests
==========================================================
*/

/*
Before POST request, you need to first use fetch options:

- method : HTTP-method, e.g. POST,
- body : one of >>
        > a string (e.g. JSON),
        > FormData object, to submit the data as form/multipart,
        > Blob/BufferSource to send binary data,
        > URLSearchParams, to submit the data in x-www-form-urlencoded encoding, rarely used.
*/

//Code submits user object as JSON
let user = {
    name: 'John',
surname: 'Smith'
};

let response = await fetch('/article/fetch/post/user', {
method: 'POST',

headers: {
    "Content-Type": "application/json; charset=utf-8"
},
body: JSON.stringify(user)
});

let result = await response.json();
alert(result.message);

/*
==========================================================
Sending an Image
==========================================================
*/

/*
Blob and BufferSource can submit binary data directly.
*/

//typical fetch request consisting of two await calls:

let response7 = await fetch(url, options); // resolves with response headers 
let result8 = await response.json(); // read body as json

//Promise-style
fetch(url, options)
    .then(response => response.json())
    .then(result => result);

/*
Response properties:

- response.status : HTTP code of the response,

- response.ok : true is the status is 200-299.

- response.headers : Map-like object with HTTP headers.
*/

/*
Methods to get response body:

- response.json() : parse the response as JSON object,

- response.text() : return the response as text,

- response.formData() : return the response as FormData object (form/multipart encoding, see the next chapter),

- response.blob() : return the response as Blob(binary data with type),

- response.arrayBuffer() : return the response as ArrayBuffer (pure binary data),
*/

/*
Fetch options so far:

- method : HTTP-method,

- headers : an object with request headers (not any header is allowed),

- body : string, FormData, BufferSource, Blob or UrlSearchParams object to send.*/  