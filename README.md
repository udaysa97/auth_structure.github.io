ABOUT:

this is a authentication backend code which can be used by anyone to build up on.
This can act as a starting code for any web app that needs authentication. 

SET-UP?
Download all files in a folder

Using any preferred editor (VS Code preffered) on console simply run npm install tp get all dependencies installed

once installed go to config/passport-google-oauth2-strategy.js  and in clientID and clientSecret enter your own values that can be generated from 
https://console.developers.google.com/.  Do watch how to create these credentials if you dont know.

Once you replace just run and explore 

What is implemented?

*local user sign up / sign in and authentication 

*User sign / sign up  using gmail ID.

*password reset and necessary checks ( Only if user is already logged in)

*Notification display using noty js and flash (missing at certain places)

TODO/ Future scope:

*When user logs in using Gmail send a mail to user with his randomly generatd password
* if user forgets password then send a mail to user using parallel mailing job to reset password
* include more signin/up options

minor changes needed:
*flash messages at more places
* UI changes






