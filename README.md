## CHAT APP

##### On the front, these are the technologies used:
- React 
- Redux toolkit for state management
- Material UI and CSS(for styling and themes)

##### On the back, the technologies are:
- Node.js and socket.io(for real-time message sharing)
- firebase auth/firestore/storage(database)


##### create a `.env` file in your client directory. This will contain the firebase credentials as well as the socket server URL. Here is the boilerplate env file:

```
REACT_APP_API_KEY = "******"
REACT_APP_AUTH_DOMAIN = "******"
REACT_APP_PROJECT_ID = "******"
REACT_APP_STORAGE_BUCKET = "******"
REACT_APP_MESSAGE_SENDER_ID = "******"
REACT_APP_APP_ID = "******"
REACT_APP_MEASUREMENT_ID = "******"

REACT_APP_SOCKET_SERVER = "*******"
```

##### Do not forget to add your socket server URL on the client side code as well as the client URL on the socket server code


##### Features
- Features a complete authentication flow(protected routes, reset password included)
- Logged in users ON the main page are considered online and are able to see other online users as well
- Any two online recipients can have a one-on-one(private) chat
- A user that logs out or goes away from that chat page will be removed from the online users list
- Users can change their names, add a profile picture as well as remove their profile picture
- Features a modern, fully responsive UI that accompanies a theme toggle

##### Demo of the Chat App: [DEMO](https://youtu.be/uslJPolJTPg)


##### Future Improvements
- Firebase functions can be rewritten as async thunks to incorporate global state management for message and chat components