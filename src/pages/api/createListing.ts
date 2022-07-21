import React from 'react'
import FormData from 'form-data'
import { NextApiResponse, NextApiRequest } from 'next'
import { uuidv4 } from '@firebase/util'
import { supabase } from '../../lib/supabase'
import { definitions } from '../../types/supabase'

const createListing = async (
	req: NextApiRequest,
	apiResult: NextApiResponse
): Promise<void> => {
	const uid = uuidv4()
	const img = req.body.base64Img

	const form = new FormData()
	form.append('image', img)

	try {
		const imgbbRes = await fetch(
			`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_APIKEY}`,
			{
				method: 'POST',
				body: form as unknown as BodyInit
			}
		)

		const imgbbRes2 = await imgbbRes.json()
		if (!(imgbbRes.status === 200)) {
			apiResult
				.status(404)
				.json(new Error('Unable to upload image to ImgBB'))
			return
		}

		const url = imgbbRes2.data.url

		const supabaseRes = await supabase
			.from<definitions['products']>('products')
			.insert([
				{
					productId: uid,
					image: url,
					productName: req.body.productName,
					price: req.body.price,
					soldBy: req.body.user,
					stock: req.body.stock
				}
			])

		apiResult.status(200).json(supabaseRes)
	} catch (err) {
		console.error(err)
		apiResult
			.status(500)
			.json({ message: 'Internal Server Error, check listing.ts' })
	}
}

export default createListing
