import React from 'react'
import { Navigate } from 'react-router-dom';

interface Props {
    to: string
}

export default function Redirect(props: Props) {
    return (
        <Navigate to='/welcome' />
    )
}
