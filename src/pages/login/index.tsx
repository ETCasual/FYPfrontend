import { useRouter } from 'next/router'
import React from 'react'
import { Wrapper } from '../../components'
const Login = () => {
	const router = useRouter()

	return (
		<Wrapper>
			<div className="login section__padding">
				<div className="login-container">
					<h1>Login</h1>
					<form className="login-writeForm" autoComplete="off">
						<div className="login-formGroup">
							<label>Username</label>
							<input type="text" placeholder="Username" />
						</div>
						<div className="login-formGroup">
							<label>Password</label>
							<input type="password" placeholder="Password" />
						</div>

						<div className="login-button">
							<button className="login-writeButton" type="submit">
								Login
							</button>

							<button
								className="login-reg-writeButton"
								type="submit"
								onClick={() => router.push('/register')}
							>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</Wrapper>
	)
}

export default Login
