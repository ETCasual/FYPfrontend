import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import useEffectOnce from '../../hooks/useEffectOnce'
import { supabase } from '../../lib/supabase'
import { definitions } from '../../types/supabase'
import { BidCards } from './bidCards'

type BidProps = {
	title: string
}

const Bids: React.FunctionComponent<BidProps> = ({ title }) => {
	const router = useRouter()

	const [items, setItems] = useState<definitions['products'][]>()

	const fetchItems = async () => {
		const { data, error } = await supabase
			.from<definitions['products']>('products')
			.select('*')

		console.log(data)
		return { data, error }
	}

	useEffectOnce(() => {
		fetchItems().then((s) => setItems(s.data!))
	})

	return (
		<div className="bids section__padding">
			<div className="bids-container">
				<div className="bids-container-text">
					<h1>{title}</h1>
				</div>
				<div className="bids-container-card">
					{items
						? items.map((item) =>
								item.stock! > 0 ? (
									<BidCards
										key={item.productId}
										id={item.productId}
										name={item.productName}
										image={item.image}
										price={item.price}
									/>
								) : null
						  )
						: null}
				</div>
			</div>
		</div>
	)
}

export default Bids
