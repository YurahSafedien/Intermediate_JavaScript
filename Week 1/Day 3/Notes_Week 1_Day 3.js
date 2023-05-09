/*
========================================================
Clickjacking
========================================================
*/

/*
Clickjacking - an attack that allows an evil page to click on a "victim site" without visitor consent.

Clickjacking is triggered on clicks, not keyboard presses, which is more difficult to redirect.

An example representation of the Facebook clickjacking attack is in the HTML notes.
*/

/*
========================================================
Weak Old School Defenses
========================================================
*/

/*
Oldest defense is in JavaScript that prevents the window from the frame to open, called 'framebusting'.

An example representation is:
*/

function frameBusting() {
  if (top != window) {

    top.location = window.location;

  }
}

/*
In the code above:

if the window finds out that it's not on the top, then it automatically makes itself the top.

However, there are many ways to get around this defense method.
*/

/*
Blocking top-navigation

- Block transition by changing 'top.location' in the 'beforunload' event handler.

- The top page (enclosing one, belonging to the hacker) sets a preventing handler to it, like this:
*/

window.onbeforeunload = function() {

  return false;

};

/*
- Meaning, when the <iframe> attempts to change 'top.location' the user recieves a confirmation alert.

In HTML, there is an example representation of using sandbox for this.
*/

/*
========================================================
X-Frame-Options
========================================================
*/

/*
X-Frame-Options - the server side header, used for permitting or forbidding inside frame page display.

Must be sent with the header, anywhwere else will be null.
*/

/*
3 values of the header:

DENY - will never show the page inside the frame.

SAMEORIGIIN - allows inside frame if parent document is of the same origin.

ALLOW-FROM Domain - allows inside frame if parent document is from a given origin.

Example of Twitter SAMEORIGIN is in HTML notes.
*/

/*
Disabled Functionality

The disadvantage of X-Frame-Options is that our page won't be viewable in a frame on other sites.

Alterntaive solutions are to "cover" the page with a <div> (style: "height: 100%; width: 100%") to intercept all clicks, the <div> will be removed 'if (window == top)' or if protection is decidedly not needed.
*/

/*
========================================================
Samesite Cookie Attribute
========================================================
*/

/*
Samesite cookie attribute cookies are only sent to a website if it's opened directly instead of  through <iframe> or pop-up windows.

Example of Facebook samesite attribute authentication:

Set-Cookie: authorization=secret; samesite
*/

