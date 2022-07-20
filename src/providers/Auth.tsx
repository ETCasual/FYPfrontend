import React from 'react'
import {
	useFirebaseApp,
	useSigninCheck,
	AuthProvider as FirebaseAuthProvider
} from 'reactfire'
import {
	Auth as FirebaseAuth,
	getAuth,
	GoogleAuthProvider,
	signInWithPopup
} from 'firebase/auth'

import { toast } from 'react-toastify'
import Home from '../components/home'
import Loader from 'react-loaders'

const LoadingSpinner = () => {
	return (
		<div className="flex flex-row w-full h-full">
			<Loader type="ball-scale-ripple-multiple" active />
		</div>
	)
}

export const signOut = (auth: FirebaseAuth) => {
	auth.signOut().then(() => console.log('signed out'))
}

export const signIn = async (auth: FirebaseAuth) => {
	const provider = new GoogleAuthProvider()

	const user = (await signInWithPopup(auth, provider)).user

	return user
}

export const AuthProvider: React.FunctionComponent<{
	children: React.ReactNode
}> = ({ children }) => {
	const app = useFirebaseApp()
	const auth = getAuth(app)

	return (
		<FirebaseAuthProvider sdk={auth}>
			<AuthWrapper fallback={<Home />}>{children}</AuthWrapper>
		</FirebaseAuthProvider>
	)
}

export const AuthWrapper = ({
	children,
	fallback
}: React.PropsWithChildren<{ fallback: JSX.Element }>): JSX.Element => {
	const { status, data: signInCheckResult } = useSigninCheck()

	if (!children) {
		throw new Error('Children must be provided')
	}
	if (status === 'loading') {
		return <LoadingSpinner />
	} else {
		return children as JSX.Element
	}
}

export const Auth = () => {
	const { status, data: signinResult } = useSigninCheck()

	if (status === 'loading') {
		return <LoadingSpinner />
	}

	const { signedIn, user } = signinResult

	if (signedIn === true) {
		toast(`${user.displayName} logged in!`, {
			hideProgressBar: true,
			pauseOnHover: false
		})
	}
}
