<!--To start the project in development mode-->
npm run dev 


<!--To run the project in production mode:-->
npm start
<!-- This will start the Next.js production server, assuming you’ve already built the project using: "npm run build" -->



<!-- Since the Socket.IO server runs separately from the Next.js app, you need to start it in another terminal tab:-->

nodemon src/socketIo.js 
or
node src/socketIo.js

<!-- This command starts the Socket.IO server, which enables real-time messaging between users. -->



<!-- note: -->
src/socketIo.js 
<!-- The socketIo.js server is not part of the Next.js build output.
npm run build & npm start it only starts the Next.js production server, not the Socket.IO server thats why it will run only in development mode until you deploy socketIo server on any service ex render.-->