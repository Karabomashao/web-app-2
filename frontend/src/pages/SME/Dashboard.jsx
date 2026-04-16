import { useState } from "react";

export default function Dashboard(){

    const user = JSON.parse(localStorage.getItem('user'))

    return(
        <h1>This is the dashboard page</h1>
    )
}