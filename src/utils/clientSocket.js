import { io } from 'socket.io-client'

const socket = io('https://chat-app-myj1.onrender.com',
    {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['websocket']
    }
)

export default socket