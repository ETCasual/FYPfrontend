import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAccount, useContract, useSigner } from 'wagmi'
import { Wrapper } from '../../components'
import useEffectOnce from '../../hooks/useEffectOnce'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../store/useAuth'
import { definitions } from '../../types/supabase'
import abi from '../../utils/FYPToken.json'

type ProductProps = {
	id: string | null
	error: string | null
}

const Item: React.FunctionComponent<ProductProps> = ({ id, error }) => {
	const [item, setItem] = useState<definitions['products'] | null>()
	const { user } = useAuth()
	const { address } = useAccount()
	const { data: signer } = useSigner()
	const [isDisabled, setIsDisabled] = useState(false)

	const contract = useContract({
		addressOrName: '0x5551C354aA836661315C183D28f3a1452832C5B0',
		contractInterface: abi.abi,
		signerOrProvider: signer
	})

	const handlePurchase = async () => {
		setIsDisabled(true)
		const txn = await contract.sendBal(
			'0x78Db54efc0B596bC0D5559fF8BAFb43FEfb47De4',
			item!.price * 1000000000000
		)
		console.log('Mining...', txn.hash)
		await txn.wait()
		console.log('Mined -- ', txn.hash)
		await supabase
			.from<definitions['products']>('products')
			.update({ stock: item!.stock - 1, purchasedBy: user!.id })
			.match({ productId: item!.productId })
		fetchItem().then((item) => setItem(item.data ? item.data![0] : null))
		setIsDisabled(false)
	}

	useEffectOnce(() => {
		if (!id) return

		fetchItem().then((item) => setItem(item.data ? item.data![0] : null))
	})
	const fetchItem = async () => {
		const { data, error } = await supabase
			.from<definitions['products']>('products')
			.select('*')
			.eq('productId', id as string)

		return { data, error }
	}
	const router = useRouter()

	return (
		<Wrapper>
			{item ? (
				<div className="item section__padding">
					<div className="item-image">
						<img src={item?.image} alt={item?.productName} />
					</div>
					<div className="item-content">
						<div className="item-content-title">
							<h1>{item?.productName}</h1>
							<p>
								<span>{item?.price.toFixed(3)} ETH</span> ‧{' '}
								{item?.stock} available
							</p>
						</div>
						<div className="item-content-creator">
							<div>
								<p>Creator</p>
							</div>
							<div>
								<img
									src={item?.soldBy.profilePic}
									alt="creator"
								/>
								<p>{item?.soldBy.displayname} </p>
							</div>
						</div>
						<div
							className="item-content-buy"
							style={{ marginTop: '2em' }}
						>
							<button
								className={
									user && address
										? `primary-btn`
										: 'secondary-btn'
								}
								disabled={
									!user ||
									!address ||
									item.stock == 0 ||
									isDisabled
								}
								onClick={() => handlePurchase()}
							>
								{item.stock == 0
									? 'Sold Out'
									: user && address
									? `Buy For ${item.price} ETH`
									: 'Connect Wallet to Buy'}
							</button>
						</div>
					</div>
				</div>
			) : (
				<div
					className="writeForm"
					style={{
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignContent: 'center',
						justifySelf: 'center',
						marginTop: '5rem'
					}}
				>
					<p
						style={{
							fontSize: '2rem',
							color: 'white',
							textAlign: 'center',
							marginBottom: '1rem'
						}}
					>
						{'Invalid or no product ID given'}
					</p>
					<button
						type="button"
						className="primary-btn"
						style={{
							width: '100px',
							fontWeight: '700',
							margin: '0 auto',
							color: 'white',
							backgroundColor: 'var(--primary-btn)'
						}}
						onClick={() => router.push('/')}
					>
						Back
					</button>
				</div>
			)}
		</Wrapper>
	)
}

export default Item

export const getServerSideProps: GetServerSideProps<ProductProps> = async ({
	query
}) => {
	return {
		props: {
			id: (query.id as string) ?? null,
			error: !query.id ? 'No Product Id Given' : null
		}
	}
}
