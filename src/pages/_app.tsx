import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import '../styles/index.css'
import '../styles/App.css'
import 'react-toastify/dist/ReactToastify.css'
import Blobity from 'blobity'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../providers/Auth'
import { firebaseConfig } from '../constants/firebase'
import { FirebaseAppProvider } from 'reactfire'

import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

const client = createClient({
	autoConnect: true,
	provider: getDefaultProvider()
})

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		new Blobity({
			mode: 'bouncy',
			size: 20,
			opacity: 0.5,
			radius: 10,
			focusableElementsOffsetX: 5,
			focusableElementsOffsetY: 3
		})
	})

	return (
		<WagmiConfig client={client}>
			<FirebaseAppProvider firebaseConfig={firebaseConfig}>
				<AuthProvider>
					<Component {...pageProps} />
					<ToastContainer />
				</AuthProvider>
			</FirebaseAppProvider>
		</WagmiConfig>
	)
}

export default MyApp
