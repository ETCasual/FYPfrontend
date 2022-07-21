import React from 'react'
import Navbar from './Navbar'

type WrapperProps = {
	children: React.ReactNode
}

const Wrapper: React.FunctionComponent<WrapperProps> = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	)
}

export default Wrapper
