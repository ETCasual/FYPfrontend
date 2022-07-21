import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Wrapper } from '../../components'
import PurchasedBids from '../../components/bids/PurchasedBids'
import useEffectOnce from '../../hooks/useEffectOnce'
import { supabase } from '../../lib/supabase'
import { definitions } from '../../types/supabase'

type ProfileProps = {
	id: string | null
	error: string | null
}

const Profile: React.FunctionComponent<ProfileProps> = ({ id }) => {
	const router = useRouter()
	const [profile, setProfile] = useState<definitions['user'] | null>()

	useEffectOnce(() => {
		if (!id) return

		fetchProfile().then((prof) =>
			setProfile(prof.data ? prof.data![0] : null)
		)
	})
	const fetchProfile = async () => {
		const { data, error } = await supabase
			.from<definitions['user']>('user')
			.select('*')
			.eq('id', id as string)

		return { data, error }
	}

	return (
		<Wrapper>
			{profile ? (
				<div className="profile section__padding">
					<div className="profile-top">
						<div className="profile-banner">
							<img
								src={'/assets/profile_banner.png'}
								alt="banner"
							/>
						</div>
						<div className="profile-pic">
							<img
								src={profile.photoURL}
								alt={profile.displayName}
							/>
							<h3>{profile.displayName}</h3>
						</div>
					</div>
					<div className="profile-bottom">
						<PurchasedBids title="Purchased" profile={profile} />
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

export default Profile

export const getServerSideProps: GetServerSideProps<ProfileProps> = async ({
	query
}) => {
	return {
		props: {
			id: (query.id as string) ?? null,
			error: !query.id ? 'No Profile Id Given' : null
		}
	}
}
