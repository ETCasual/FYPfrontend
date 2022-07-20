import React from 'react'
import { Wrapper } from '../../components'
import Bids from '../../components/bids/Bids'

const Profile = () => {
	return (
		<Wrapper>
			<div className="profile section__padding">
				<div className="profile-top">
					<div className="profile-banner">
						<img src={'/assets/profile_banner.png'} alt="banner" />
					</div>
					<div className="profile-pic">
						<img src={'/assets/profile.jpg'} alt="profile" />
						<h3>James Bond</h3>
					</div>
				</div>
				<div className="profile-bottom">
					<div className="profile-bottom-input">
						<input type="text" placeholder="Search Item here" />
						<select>
							<option>Recently Listed</option>
							<option>Popular</option>
							<option>Low to High</option>
							<option>High to Low</option>
						</select>
					</div>
					<Bids title="Item" />
				</div>
			</div>
		</Wrapper>
	)
}

export default Profile
