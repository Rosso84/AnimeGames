# About
In this project I am creating a SPA(Single-Page-Application) webapplication with different games. You can register and sign in with the service provided by the webapp or login through steam. 

For the moment I have created an offline quiz game using
NodeJS as runtime as well as Express framework, WebPack, Babel, React, React-Router for routing between pages, Jest for testing, and Passport session authentication. The webapp does not use a real db but rather just using a map to stimulate one as I wanted to focus on the frontend side first so. passwords and userID are stored using Map and passwords are not hashed, meaning they are not safely stored. If you login through steam the webapp does not directly deal with any passwords related to steam so it is safe to use.  


## Login
There are 2 ways to log in, either by registering through the website or through steam.


### Steam
To use steam login system you need to have a steam account and request for an API Key. To get one visit:

        https://steamcommunity.com/dev/

Ones you have the key navigate to src/server/steam/, open steamConfig.js file and paste it in:
        
        apiKey: 'paste your Steam API here'   (between the ' ')

Now run the app and click on 'login' and then click on 'sigup with steam'. 
Ones you have done that you can view all the data that has been fetched from a steam user on the terminal such as 

-Steamid

-personaname

-avatar etc..

that can be used for different things depending on your purposes for using Steam. 

#### API Considerations
Currently, the "Steam Web API" isn't very forgiving to web developers. There is a lack of support for the JSONP protocol and the API's acceptable usage policy requires that the API key is not to be shared. As described, using this API key inside of a Javascript file (which is downloaded in full source by the client) would be against the policy that Valve has provided. This requires that anyone wanting to create a web site that makes use of this data would be required to run a proxy (which I have personally done) in order to properly hide the API key. This could be remedied by changing the usage policy to allow "sharing" of the key, or to simply provide a mechanism that provides public keys that work along-side the private ones.
Read for more information at:  

https://developer.valvesoftware.com/wiki/Steam_Web_API/Feedback#API_Considerations_for_Web_Developers 





#### Steam errors
If you get the error message when trying to login:

        'Something Went Wrong, We were unable to service your request. Please try again later.
         with error code: E502 L3'


this is caused by overload of requests from steam.
visit: https://steamcommunity.com/groups/steam_tools/discussions/0/1488861734101489349/


#### Code 
The backend code for steam is written inside /server/app.js  and is labeled with a comment  //Steam.



# How to run the web application
First you need to install a few things:

-a text editor or IDE, such as VScode. download free here: https://code.visualstudio.com/ 

-a git bash terminal if on windows: https://gitforwindows.org/. If you have a OSX just search for  terminal and use that.

-download and install NodeJs runtime (I use version 14.5.0). visit : https://nodejs.org/en/download/     

-and Yarn/Npm Cli (I use yarn version 1.17.3)  https://classic.yarnpkg.com/en/docs/install/#windows-stable .

 
Now just open up a gitbash terminal or just terminal on mac and navigate to root of application folder Anime-games/

Now type type 

     $yarn install
 

and wait for it to install all node module dependencies provided inside package.json file. This will create a node_module folder containing all libraries.

From there you can type: 

        $ yarn run dev


The webapp will now be available locally at https://localhost:8080 on your broswer.

There is also som tests just to illustrate. To run tests just type: 


        $ yarn run test


The results should now be available from the terminal. 


## DockerFile
There is also a Dockerfile prepared to run it as an image on e.g Docker container either locally or on Kubernetes ,webapp in cloud or infrastructures like Concourse pipelines or Jenkins.


## future goals
For the moment I am finishing the backend side which is to create the missing real DB using mySql. I will start by creating it locally using mysql Workbench (see: https://www.mysql.com/products/workbench) and eventually transfer data to a file which later can e.g be deployed to a File storage in Cloud.
I used this tutorial to install it on my mac osx: https://www.youtube.com/watch?v=zbK8cNS_cg0&t=661s

My next assignment will be to implement Online version of quizgame for multiplayers using Socket.io.
