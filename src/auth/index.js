import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_BETTER_AUTH_URL,
    basePath: '/api/auth',
    plugins: [
        adminClient()
    ]
})

export const {
    useSession,
    signIn,
    signUp,
    signOut,
    forgetPassword,
    resetPassword,
  } = authClient;