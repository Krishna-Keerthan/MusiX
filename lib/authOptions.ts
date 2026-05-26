import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";



export const authOptions: NextAuthOptions = {
    providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),

    // CredentialsProvider({
    //     name: "Credentials",
    //     credentials: {
    //         email: { label: "Email", type: "text", placeholder: "jsmith" },
    //         password: { label: "Password", type: "password" }
    //     },
    //     async authorize(credentials){
    //         if (!credentials?.email || !credentials?.password){
    //             throw new Error("Missing Email or Password")
    //         }
            
    //         try {
    //             await connectDB()
    //             const user = await User.findOne({email: credentials.email})

    //             if (!user){
    //                 throw new Error("No user found with this email.")
    //             }

    //             const isValid = await bcrypt.compare(credentials.password, user.password)

    //             if (!isValid){
    //                 throw new Error("Invalid Password")
    //             }

    //             return {
    //                 id: user._id.toString(),
    //                 email: user.email
    //             }

    //         } catch (error) {
    //             console.error("Auth Error");
                
    //             throw error
    //         }
    //     }
    // })

    ],
    callbacks: {
        // async jwt({ token, user }) {
        //     if (user){
        //         token.id = user.id

        //     }

        //     return token
        // },

        // async session({session, token}){
        //     if (session.user){
        //         session.user.id = token.id as string
        //     }
        //     return session
        // },

        // async redirect({baseUrl}){
        //     return baseUrl
        // }
    },
    session: {
        // strategy: 'jwt',
        // maxAge: 30*24*60*60,
    },
    pages:{
        // signIn: '/login',
        // error: '/error'
    },
    secret: "12345678"

}