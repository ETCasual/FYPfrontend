import React from 'react'
const Footer = () => {
	return (
		<div className="footer section__padding">
			<div className="footer-links">
				<div className="footer-links_logo">
					<div>
						<img src={'/assets/logo.png'} alt="logo" />
						<p>FYP Marketplace</p>
					</div>
					<div>
						<h3>Get the lastes Updates</h3>
					</div>
					<div>
						<input type="text" placeholder="Your Email" />
						<button>Email Me!</button>
					</div>
				</div>
				<div className="footer-links_div">
					<h4>FYP Marketplace</h4>
					<p>Explore</p>
					<p>How it Works</p>
					<p>Counters</p>
					<p>Contact Us</p>
				</div>
				<div className="footer-links_div">
					<h4>Support</h4>
					<p>Help center</p>
					<p>Terms of service</p>
					<p>Legal</p>
					<p>Privacy policy</p>
				</div>
			</div>
		</div>
	)
}

export default Footer
