import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useEffectOnce from '../../hooks/useEffectOnce'
import { supabase } from '../../lib/supabase'
import { definitions } from '../../types/supabase'
import { BidCards } from './bidCards'

type PurchasedBidProps = {
	title: string
	profile?: definitions['user']
}

const PurchasedBidProps: React.FunctionComponent<PurchasedBidProps> = ({
	title,
	profile
}) => {
	const router = useRouter()
	const [error, setError] = useState<string>('')
	const [items, setItems] = useState<definitions['products'][]>()

	const fetchPurchased = async () => {
		const { data, error } = await supabase
			.from<definitions['products']>('products')
			.select('*')
			.eq('purchasedBy', profile!.id)

		if (error) setError(error.message)
		if (data![0]) setItems(data!)
	}

	useEffectOnce(() => {
		fetchPurchased()
	})

	return (
		<div className="bids section__padding">
			<div className="bids-container">
				<div className="bids-container-text">
					<h1>
						{items
							? title
							: 'This user have not made any purchases!'}
					</h1>
				</div>
				<div className="bids-container-card" style={{ width: '100%' }}>
					{items
						? items.map((item) => (
								<BidCards
									key={item.productId}
									id={item.productId}
									name={item.productName}
									image={item.image}
									price={item.price}
								/>
						  ))
						: null}
				</div>
			</div>
		</div>
	)
}

export default PurchasedBidProps
