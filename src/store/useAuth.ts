import create, { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthUser = {
	displayname: string
	profilePic: string
	id: string
}

type AuthState = {
	user?: AuthUser
	setUser: (user: AuthUser) => void
	clearUser: () => void
}

const createState: StateCreator<AuthState> = (set) => ({
	user: undefined,
	clearUser: () => set({ user: undefined }),
	setUser: (user: AuthUser) => {
		set({ user: user })
	}
})

export const useAuth = create(
	persist(createState, {
		name: 'fyp-auth'
	})
)
