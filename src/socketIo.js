// import express from 'express'
const express = require('express')
const { Server } = require('socket.io')
const cors = require('cors')
const { createServer } = require('http')
// import { Server } from 'socket.io'
// import cors from 'cors'
// import { createServer } from 'http'

const app = express()

app.use(cors())

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

// Store online users and their socket IDs
// const onlineUser = {}

const currentChat = {}

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id)

  socket.on('join-chat', (chatId) => {
    socket.join(chatId);
    console.log(`Socket ${socket.id} joined chat ${chatId}`);
  })

  socket.on('private-message', ({ content, sender, chatId }) => {

    const message = {
      content,
      sender,
      chatId,
      createdAt: new Date().toISOString()

    }

    if (!currentChat[chatId]) {
      currentChat[chatId] = []
    }
    currentChat[chatId].push(message)

    // this is use to send message who is having chatId 
    io.to(chatId).emit('private-message', message)

    // const receiverSocketId = onlineUser[userId]
    // currentChat[chatId] = { content, sender, chatId }
    // if (currentChat[chatId]) {
    //   io.to(currentChat[chatId]).emit('private-message', { content, sender, chatId })
    // }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  // socket.on('disconnect', () => {
  //   console.log('User disconnected:', socket.id)
  //   for (const userId in onlineUser) {
  //     if (onlineUser[userId] === socket.id) {
  //       delete onlineUser[userId]
  //       break
  //     }
  //   }
  // })
})

server.listen(4000, () =>
  console.log('Socket.IO server running at http://localhost:4000')
)
