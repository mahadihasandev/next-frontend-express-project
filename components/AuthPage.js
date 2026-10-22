"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";
import { LogIn, LogOut } from "lucide-react";

const AuthPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div className="flex items-center gap-2">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={`Profile picture of ${session.user.name}`}
              width={34}
              height={34}
              className="rounded-full border-2 border-emerald-500 shadow-xs"
            />
          )}
          <Button
            className="text-white text-xs font-bold bg-slate-900 hover:bg-slate-800 rounded-xl h-9 px-3.5 shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            onClick={() => signOut()}
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      ) : (
        <Button
          className="text-white text-xs font-bold bg-emerald-600 hover:bg-emerald-700 rounded-xl h-9 px-4 shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          onClick={() => signIn()}
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Sign In</span>
        </Button>
      )}
    </div>
  );
};

export default AuthPage;