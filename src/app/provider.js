"use client"
import Store from '@/redux/store'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Provider } from 'react-redux'

export function Providers({ children }) {
    return (
        // <SessionProvider>
        <Provider store={Store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Provider>

    )
}