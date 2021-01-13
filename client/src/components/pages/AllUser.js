import React from 'react'
import Header from '../molecules/Header'
import UserTable from '../molecules/UserTable'

export default function AllUser() {
    return (
        <div className="h-screen bg-main-two">
            <Header />
            <div className="py-2 flex flex-col px-2">
                <UserTable />
            </div>
        </div>
    )
}
