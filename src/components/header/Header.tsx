import React, { useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { useRouter } from 'next/router'
import { definitions } from '../../types/supabase'
import { supabase } from '../../lib/supabase'
import { SellerCard } from '../sellerCard'
import useEffectOnce from '../../hooks/useEffectOnce'
import { sliderSettings } from '../../constants/slider'

const Header = () => {
	const router = useRouter()
	const [sellers, setSellers] = useState<any[]>()

	const fetchSeller = async () => {
		const { data, error } = await supabase
			.from<definitions['seller']>('seller')
			.select('*')
			.order('earned', { ascending: false })

		console.log(data)
		return { data, error }
	}

	useEffectOnce(() => {
		fetchSeller().then((s) => setSellers(s.data!))
	})

	return (
		<div className="header section__padding">
			<div className="header-content">
				<div>
					<h1>Discover, collect, and sell extraordinary products!</h1>
					<img
						className="shake-vertical"
						src={'/assets/coin.png'}
						alt=""
					/>
				</div>
			</div>
			<div className="header-slider">
				<h1>Top Sellers</h1>

				<Slider {...sliderSettings} className="slider">
					{sellers
						? sellers.map((seller, i) => (
								<SellerCard
									key={seller.id}
									uid={seller.user.id}
									amt={seller.earned}
									photoURL={seller.user.profilePic}
									displayName={seller.user.displayname}
									rank={i + 1}
								/>
						  ))
						: null}
				</Slider>
			</div>
		</div>
	)
}

export default Header
