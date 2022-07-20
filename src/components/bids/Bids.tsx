import { useRouter } from 'next/router'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

type BidProps = {
	title: string
}

const Bids: React.FunctionComponent<BidProps> = ({ title }) => {
	const router = useRouter()

	return (
		<div className="bids section__padding">
			<div className="bids-container">
				<div className="bids-container-text">
					<h1>{title}</h1>
				</div>
				<div className="bids-container-card">
					<div className="card-column">
						<div className="bids-card">
							<div className="bids-card-top">
								<img src={'/assets/bids1.png'} alt="" />
								<p
									className="bids-title"
									onClick={() => router.push('/post/123')}
								>
									Abstact Smoke Red
								</p>
							</div>
							<div className="bids-card-bottom">
								<p>
									1.25 <span>ETH</span>
								</p>
								<p>
									<AiFillHeart /> 92
								</p>
							</div>
						</div>
					</div>
					<div className="card-column">
						<div className="bids-card">
							<div className="bids-card-top">
								<img src={'/assets/bids2.png'} alt="" />

								<p
									className="bids-title"
									onClick={() => router.push('/post/123')}
								>
									Mountain Landscape
								</p>
							</div>
							<div className="bids-card-bottom">
								<p>
									0.20 <span>ETH</span>
								</p>
								<p>
									<AiFillHeart /> 25
								</p>
							</div>
						</div>
					</div>
					<div className="card-column">
						<div className="bids-card">
							<div className="bids-card-top">
								<img src={'/assets/bids3.png'} alt="" />

								<p
									className="bids-title"
									onClick={() => router.push('/post/123')}
								>
									Paint Color on Wall
								</p>
							</div>
							<div className="bids-card-bottom">
								<p>
									0.55 <span>ETH</span>
								</p>
								<p>
									<AiFillHeart /> 55
								</p>
							</div>
						</div>
					</div>
					<div className="card-column">
						<div className="bids-card">
							<div className="bids-card-top">
								<img src={'/assets/bids4.png'} alt="" />

								<p
									className="bids-title"
									onClick={() => router.push('/post/123')}
								>
									Abstract Patern
								</p>
							</div>
							<div className="bids-card-bottom">
								<p>
									0.87 <span>ETH</span>
								</p>
								<p>
									<AiFillHeart /> 82
								</p>
							</div>
						</div>
					</div>
					<div className="card-column">
						<div className="bids-card">
							<div className="bids-card-top">
								<img src={'/assets/bids5.png'} alt="" />

								<p
									className="bids-title"
									onClick={() => router.push('/post/123')}
								>
									White Line Grafiti
								</p>
							</div>
							<div className="bids-card-bottom">
								<p>
									0.09 <span>ETH</span>
								</p>
								<p>
									<AiFillHeart /> 22
								</p>
							</div>
						</div>
					</div>
					<div className="card-column">
						<div className="bids-card">
							<div className="bids-card-top">
								<img src={'/assets/bids6.png'} alt="" />

								<p
									className="bids-title"
									onClick={() => router.push('/post/123')}
								>
									Abstract Triangle
								</p>
							</div>
							<div className="bids-card-bottom">
								<p>
									0.90 <span>ETH</span>
								</p>
								<p>
									<AiFillHeart /> 71
								</p>
							</div>
						</div>
					</div>
					<div className="card-column">
						<div className="bids-card">
							<div className="bids-card-top">
								<img src={'/assets/bids7.png'} alt="" />

								<p
									className="bids-title"
									onClick={() => router.push('/post/123')}
								>
									Lake Landscape
								</p>
							</div>
							<div className="bids-card-bottom">
								<p>
									0.52 <span>ETH</span>
								</p>
								<p>
									<AiFillHeart /> 63
								</p>
							</div>
						</div>
					</div>
					<div className="card-column">
						<div className="bids-card">
							<div className="bids-card-top">
								<img src={'/assets/bids8.png'} alt="" />

								<p
									className="bids-title"
									onClick={() => router.push('/post/123')}
								>
									Blue Red Art
								</p>
							</div>
							<div className="bids-card-bottom">
								<p>
									0.85 <span>ETH</span>
								</p>
								<p>
									<AiFillHeart /> 66
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="load-more">
				<button>Load More</button>
			</div>
		</div>
	)
}

export default Bids
