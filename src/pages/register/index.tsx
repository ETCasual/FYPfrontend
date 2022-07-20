import { useRouter } from 'next/router'
import React from 'react'
import { Wrapper } from '../../components'
const Register = () => {
	const router = useRouter()
	return (
		<Wrapper>
			<div className="register section__padding">
				<div className="register-container">
					<h1>register</h1>
					<p className="upload-file">Upload Profile pic</p>
					<div className="upload-img-show">
						<img src={'/assets/Image.png'} alt="banner" />
						<p>browse media on your device</p>
					</div>
					<form className="register-writeForm" autoComplete="off">
						<div className="register-formGroup">
							<label>Upload</label>
							<input type="file" className="custom-file-input" />
						</div>
						<div className="register-formGroup">
							<label>Full Name</label>
							<input type="text" placeholder="Name" />
						</div>
						<div className="register-formGroup">
							<label>Username</label>
							<input type="text" placeholder="Username" />
						</div>
						<div className="register-formGroup">
							<label>Email</label>
							<input type="email" placeholder="Email" />
						</div>
						<div className="register-formGroup">
							<label>Password</label>
							<input type="text" placeholder="Password" />
						</div>
						<div className="register-button">
							<button className="register-writeButton">
								register
							</button>

							<button
								className="reg-login-writeButton"
								onClick={() => router.push('/login')}
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</Wrapper>
	)
}

export default Register
