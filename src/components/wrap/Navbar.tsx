import React, { useEffect, useState } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import { useRouter } from 'next/router'
import { signIn } from '../../providers/Auth'
import { Auth as FirebaseAuth, signOut } from 'firebase/auth'
import { useAuth } from 'reactfire'
import { useAuth as useAuthStore } from '../../store/useAuth'
import { InjectedConnector } from '@wagmi/core'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { toast } from 'react-toastify'

const Navbar = () => {
	const [toggleMenu, setToggleMenu] = useState(false)

	const { user, setUser, clearUser } = useAuthStore()

	const handleLogout = (auth: FirebaseAuth) => {
		signOut(auth)
		clearUser()
	}
	const handleLogin = async (auth: FirebaseAuth) => {
		const data = await signIn(auth)

		setUser({
			displayname: data.displayName!,
			id: data.uid,
			profilePic: data.photoURL!
		})
	}

	const { address } = useAccount()
	const { connect } = useConnect({
		connector: new InjectedConnector()
	})
	const { disconnect } = useDisconnect()

	const handleWalletConnect = () => {
		connect()
	}

	const handleWalletDisconnect = () => {
		disconnect()
	}

	useEffect(() => {
		if (address) {
			toast(`Wallet is connected!`, {
				pauseOnHover: false,
				theme: 'dark',
				position: 'bottom-right',
				progressClassName: 'toastBgGradient',
				icon: '🚀',
				closeButton: false
			})
		} else if (!address) {
			toast(`Wallet disconnected!`, {
				pauseOnHover: false,
				theme: 'dark',
				closeButton: false,
				position: 'bottom-right',
				progressClassName: 'toastBgGradient',
				icon: '🚀'
			})
		}
	}, [address])

	const router = useRouter()
	const auth = useAuth()

	return (
		<div className="navbar">
			<div className="navbar-links">
				<button
					className="navbar-links_logo"
					onClick={() => router.push('/')}
				>
					<img src={'/assets/logo.png'} alt="logo" />
					<h1>FYP Marketplace</h1>
				</button>
				<div className="navbar-links_container">
					{user && (
						<>
							<p
								onClick={() => {
									router.push(`/profile/${user.id}`)
								}}
							>
								My Profile
							</p>
							<p
								onClick={() => {
									handleLogout(auth)
								}}
							>
								Logout
							</p>
						</>
					)}
				</div>
			</div>
			<div className="navbar-sign">
				{user ? (
					<>
						<button
							type="button"
							className="primary-btn"
							onClick={() => router.push('/create')}
						>
							Create
						</button>
						{address ? (
							<button
								type="button"
								className="secondary-btn"
								onClick={handleWalletDisconnect}
								title={`Connected to ${address}`}
							>
								Disconnect
							</button>
						) : (
							<button
								type="button"
								className="secondary-btn"
								onClick={handleWalletConnect}
							>
								Connect your wallet!
							</button>
						)}
					</>
				) : (
					<>
						<button
							type="button"
							className="primary-btn"
							onClick={() => handleLogin(auth)}
						>
							Sign In With Google
						</button>
					</>
				)}
			</div>
			<div className="navbar-menu">
				{toggleMenu ? (
					<RiCloseLine
						color="#fff"
						size={27}
						onClick={() => setToggleMenu(false)}
					/>
				) : (
					<RiMenu3Line
						color="#fff"
						size={27}
						onClick={() => setToggleMenu(true)}
					/>
				)}
				{toggleMenu && (
					<div className="navbar-menu_container scale-up-center">
						<div className="navbar-menu_container-links-sign">
							{user ? (
								<>
									<button
										type="button"
										className="primary-btn"
										onClick={() => router.push('/create')}
									>
										Create
									</button>

									{address ? (
										<button
											type="button"
											className="secondary-btn"
											onClick={handleWalletDisconnect}
											title={`Connected to ${address}`}
										>
											Disconnect
										</button>
									) : (
										<button
											type="button"
											className="secondary-btn"
											onClick={handleWalletConnect}
										>
											Connect your wallet!
										</button>
									)}
								</>
							) : (
								<>
									<button
										type="button"
										className="primary-btn"
										onClick={() => handleLogin(auth)}
									>
										Sign In With Google
									</button>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Navbar
