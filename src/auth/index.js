import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

export const {useSession, signIn, signUp, signOut, forgetPassword, resetPassword, getSession} = createAuthClient({
    baseURL: import.meta.env.VITE_BETTER_AUTH_URL,
    basePath: '/api/auth',
    redirectTo: '/',
    plugins: [
        adminClient()
    ]
})