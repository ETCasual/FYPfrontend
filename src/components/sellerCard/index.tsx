import { useRouter } from 'next/router'
import React from 'react'

type SellerCardProps = {
	displayName: string
	photoURL: string
	amt: number
	rank: number
	uid: string
}

export const SellerCard: React.FunctionComponent<SellerCardProps> = ({
	displayName,
	photoURL,
	amt,
	rank,
	uid
}) => {
	const router = useRouter()

	return (
		<button
			className="slider-card"
			onClick={() => router.push(`/profile/${uid}`)}
		>
			<p className="slider-card-number">{rank}</p>
			<div className="slider-img">
				<img src={photoURL} alt="" />
			</div>

			<p className="slider-card-name truncate">{displayName}</p>

			<p className="slider-card-price">
				{amt.toFixed(3)} <span>ETH</span>
			</p>
		</button>
	)
}
