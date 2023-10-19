"use client"

import { SessionProvider } from "next-auth/react"

export const NextAuthProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

/*
Instances of useSession will then have access to the session data and status. The <SessionProvider /> also takes care of keeping the session updated and synced between browser tabs and windows.
*/


/*

http://localhost:3000/api/auth/signin

here we can see that we have this sign
in page by next auth and let's go ahead
and open the inspector and let's go over
here to application
and right now we can see that we have
these two cookies over here so here we
have the next auth callback and this
token now let's go ahead and log in so
let's click on sign in with GitHub
and now we need to authorize our app
with the GitHub account so let's click
on authorize
and now we can see that we are logged in
because here we have this session
right now we need to check whether we
are actually logged in so let's go ahead
and write some code for that now we need
to access the session and we need to
check whether we are logged in in our
other pages of the application so for
that we need to create a provider and we
need to add it to the layout dot TSX
file because it wraps our whole
application so let's go ahead and add a
provider so here inside the components
folder I'll just create a new file
called providers
dot TSX
*/