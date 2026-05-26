"use client";
import { signIn, signOut, useSession } from "next-auth/react"

export default function AppBar(){

    const session = useSession()
    console.log(session.data);
    
    return (
        <div className="flex justify-between">
            MusiX
            <div>
                {!session.data?.user && <button className="bg-blue-300 m-2 p-2" onClick={() => signIn()} >Login</button>}
                {session.data?.user && <button onClick={() => signOut()} >Logout</button>}  
            </div>
            
        </div>
    )
}