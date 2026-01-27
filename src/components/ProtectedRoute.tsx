import type { RootState } from "@reduxjs/toolkit/query"
import type { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

interface Props {
    children : ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
    const isLoggedIn = useSelector(
        (state: RootState) => state.auth.isLoggedIn
    )

    if(!isLoggedIn) {
        return <Navigate to='/login' replace/>
    }

    return <>{children}</>
}

export default ProtectedRoute