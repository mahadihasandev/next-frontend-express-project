"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button"
import Image from "next/image"

const AuthPage = () => {
    const { data: session } = useSession()
   
    
  return (
    <div>
        {session ? (
          <div className="flex gap-2">
          
           {session.user.image && (
          <Image
            src={session.user.image}
            alt={`Profile picture of ${session.user.name}`}
            width={35}
            height={35}
            className="rounded-full"
          />
        )}
            <Button className="text-white font-sans bg-shop_dark_orange/90 hover:bg-shop_dark_orange hover:underline hoverEffect" onClick={() => signOut()}>Sign Out</Button>
            </div>
        ) : (
            <Button className="text-white font-sans bg-shop_dark_orange/90 hover:bg-shop_dark_orange hover:underline hoverEffect" onClick={() => signIn()}>Sign In</Button>
        )}
    </div>
  )
}

export default AuthPage