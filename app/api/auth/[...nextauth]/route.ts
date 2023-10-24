//setting up user authentication and session management
import NextAuth, { AuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prismadb";

export const authOptions: AuthOptions = {

  adapter: PrismaAdapter(prisma),

  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    })
  ],
  pages: {
    signIn: '/sign-in'
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST, }

/*
GitHub:
Settings -> Developer Settings -> OAuth Apps -> Register a new application

NextAuth.js -> Providers -> Google -> Configuration 

when we work with Next-auth, we have to add NEXTAUTH_URL and NEXTAUTH_SECRET 
NextAuth.js -> Configuration -> Options

*/


/*

Import NextAuth from the "next-auth" package. This function will create the authentication handler.

Import AuthOptions to define the configuration options for authentication.

Import authentication providers from "next-auth/providers" (GitHub and Google) that you want to use for authentication.

Define authOptions:

Create an object named authOptions with the type AuthOptions. This object contains the configuration options for your authentication.


Configure Authentication Providers:

Inside the providers array, you configure one or more authentication providers. In your example, you're using both GitHub and Google providers.
For GitHubProvider and GoogleProvider, you specify the clientId and clientSecret. These values should be obtained from the respective OAuth applications you've set up on GitHub and Google. You're retrieving these values from environment variables using process.env.
Set the Secret:

The secret property is set to process.env.NEXTAUTH_SECRET. This is the secret used for session signing and encryption. It should also be stored securely in your environment variables.
Create the Authentication Handler:

Create a handler function named handler by calling NextAuth with the authOptions.
Export the Handler:

Export the handler function as GET and POST. This is necessary for Next.js API route handling. It allows the handler to respond to both GET and POST requests.
Regarding the behavior you're observing when you access http://localhost:3000/api/auth/signin:

When you set up NextAuth.js and create an API route for authentication, visiting /api/auth/signin triggers the authentication flow.
NextAuth.js automatically provides the authentication pages for you, including the sign-in page, sign-up page, and others. These pages are part of the NextAuth.js package.
The URL you visited is one of the built-in authentication pages that NextAuth.js handles. It presents the sign-in page to the user.
Users can use this page to sign in or authenticate using the configured providers (e.g., GitHub or Google). The actual sign-in process is handled by NextAuth.js and the specified authentication providers.
In summary, your code sets up authentication providers, and when you access the /api/auth/signin route, NextAuth.js takes over to handle user authentication and present the authentication pages. Users can sign in using the configured providers.

*/