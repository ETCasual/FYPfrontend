import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

type WrapperProps = {
	children: React.ReactNode
}

const Wrapper: React.FunctionComponent<WrapperProps> = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	)
}

export default Wrapper
