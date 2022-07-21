import { useRouter } from 'next/router'
import React from 'react'

type BidCardProps = {
	image: string
	id: string
	name: string
	price: number
}

export const BidCards: React.FunctionComponent<BidCardProps> = ({
	image,
	id,
	name,
	price
}) => {
	const router = useRouter()

	return (
		<button
			className="card-column"
			onClick={() => router.push(`/item/${id}`)}
		>
			<div className="bids-card">
				<div className="bids-card-top">
					<img
						src={image}
						style={{
							height: '224px',
							width: '200px',
							objectFit: 'contain'
						}}
						alt=""
					/>
					<p className="bids-title" style={{ marginBottom: '10px' }}>
						{name}
					</p>
				</div>
				<div className="bids-card-bottom">
					<p>
						{price.toFixed(3)} <span>ETH</span>
					</p>
				</div>
			</div>
		</button>
	)
}
