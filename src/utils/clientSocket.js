import { io } from 'socket.io-client'

const socket = io(`${process.env.NEXT_PUBLIC_SOCKETIO_URL}`,
    {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['websocket']
    }
)

export default socket