/*
==========================================================
Same Origin
==========================================================
*/

/*
Same origin URLs:

- http://site.com 
- http://site.com/ 
- http://site.com/my/page.html  

Cross-origin URLs:

- http://www.site.com (another domain: www.matters)
- http://site.org (another domain: .orgmatters)
- https://site.com (another protocol: https)
- http://site.com:8080 (another port: 8080) 

*/

/*
==========================================================
In Action: IFrame
==========================================================
*/

//Used to put an invisible link to a pop-up window over elements to redirect users to a completely different page.

//Example on HTML

/*
==========================================================
Windows on Subdomains: Document.Domain
==========================================================
*/

/*
- Domains with different domains will have different origins.

- The exception is sub-domains - secondary domains, as it originates from one domain.
*/

/*
==========================================================
IFrame: Wrong Document Pitfall
==========================================================
*/

/*
- Pitfall : an iframe coming from the same origin with an accessible document.

- iframes have a document upon creation which is different from the one loaded into it.

- Doing something with the document immediatly can end up losing it.

- A not-yet-loaded iframe's document should not be worked on as it's the wrong document and any event handlers set will be void.

Q: How to detect the moment when the document is there?

A: The correct document is loaded when iframe.onload triggers and the whole frame with all it's resources are loaded.

  : You can attempt to see the load moment using setInterval()
*/

/*
==========================================================
Collection: window.frames
==========================================================
*/

/*
<iframe> is used to embed a webpage in another webpage, each tag creating a new window object containign content for embedded pages.

<iframe>'s window object can be accessed using the named collection 'window.frames'.

'window.frames' allows you to get an <iframe>'s particular window object in 2 ways:

1. By number - 'window.frames[0]' gives the window object for the first <iframe> in the document, you can specify using the [index].

2. By name - 'window.frames.iframeName' gives the window object for the <iframe> with a 'name' attribute value of 'iframeName'.
           - useful to access specific <iframe> in a document with multiple <iframe>.
*/

//Examples in HTML notes

/*
An <iframe> can contain many <iframe>'s.

The corresponding window object form a hierarchy.

Navigation Links:

- window.frames – the collection of “children” windows (for nested frames).

- window.parent – the reference to the “parent” (outer) window.

- window.top – the reference to the topmost parent window.
*/

//Example in HTML 

/*
==========================================================
"sanbox" iframe Attribute
==========================================================
*/

/*
Sanbox - allows the exclusion of certain action inside an <iframe> to prevent the execution of untrusted code.
       - sanboxes the <iframe> by treating it as if it is coming from a different origin and/or applying other limitations. 

<iframe sandbox src="..."> has a default set of restriction that can be laxed if we provide a space-seperated list of restrictions that shouldn't be applied as a value of the attribute.

E.g.: <iframe sandbox="allow-forms allow-popups">

An empty "sandbox" will automatically have the strictest limitations, but we can edit what we want to lift as shown in the example above.
*/

/*
Restriction Lift Keywords:

- allow-same-origin: 'different origin' policiy is automatically applied unless specified to be removed.

- allow-top-navigation: allows the iframe's parent.location to change.

- allow-forms: allows form submission from iframe.

- allow-scripts: allows scripts to run from the iframe.

- allow-popups: allows 'window.open' pop-ups from the iframe.
*/

//*NB: The 'sandbox' attribute is only to add more restrictions and not remove them and can't relax 'Same Origin' policy if the site does come from a different origin.

/*
==========================================================
Cross Window Messaging
==========================================================
*/

/*
postMessage - a method that gets around the 'Same Origin' policy, allowing sites with different domains to communicate with each other so long as there is permission granted between the 2 sites.

The window wanting to send a message calls the postMessage method of the recieving window.

E.g.: if we want to send a message to window2, we would: window2.postMessage(data, targetOrigin).
*/

/*
Arguments:

data - data being transferred, which can be any object, the data is cloned using 'structured cloning algorithm'.

*NB: IE only supports strings, so we'd need to 'JSON.stringify' complex objects to surpports that browser.

targetOrigin - specifies target window origin and is used as a safety measure to ensure only the the given origin's window recieves the message.

onmessage - handler message event triggered when postMesage is called, so the target window recieves the message, the event object contains special properties.

data - postMessage data.

origin - sender origin (e.g.: https://www.youtube.com).

source - references the sender window, to allow immediate source.postMessage(...) back, if desired.

*NB: No delay between the postMessage and message event as the events trigger synchronously, faster than 'setTimeout(..., 0)'.
*/