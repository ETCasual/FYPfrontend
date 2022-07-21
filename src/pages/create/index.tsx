import { Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { Wrapper } from '../../components'
import { useAuth } from '../../store/useAuth'
import { toBase64 } from '../../utils/convert'
import { BiErrorCircle, BiCheckCircle } from 'react-icons/bi'
import { useState } from 'react'

const Create = () => {
	const { user } = useAuth()
	const [file, setFile] = useState<File | null>()
	const [isDisabled, setIsDisabled] = useState<boolean>(false)

	return (
		<Wrapper>
			<div className="create section__padding">
				<div className="create-container">
					<h1>Create new Product</h1>
					<Formik
						initialValues={{
							productName: '',
							price: 0,
							file: undefined,
							stock: 0
						}}
						onSubmit={async (values, actions) => {
							setIsDisabled(true)
							actions.setSubmitting(true)
							const b64img = file ? await toBase64(file) : null

							const res =
								user && file
									? await fetch('/api/createListing', {
											method: 'POST',
											headers: {
												'Content-Type':
													'application/json'
											},
											credentials: 'same-origin',
											body: JSON.stringify({
												productName: values.productName,
												price: values.price,
												base64Img: b64img,
												user: user,
												stock: values.stock
											})
									  })
									: toast(`Failed to upload`, {
											icon: <BiErrorCircle color="red" />,
											theme: 'dark'
									  })
							if ((res as Response).ok) {
								toast('Upload Successful!', {
									icon: <BiCheckCircle color="green" />,
									theme: 'dark'
								})
								actions.resetForm()
								setFile(null)
							}
							actions.setSubmitting(false)
							setIsDisabled(false)
						}}
					>
						<Form className="writeForm" autoComplete="off">
							<div className="formGroup">
								<label>Product Image</label>
								<Field
									disabled={isDisabled}
									type="file"
									name="file"
									id="file"
									className="custom-file-Field disabled={isDisabled}"
									accept="image/jpg, image/png, image/jpeg"
									onChange={(event: any) =>
										setFile(event.currentTarget.files![0])
									}
								/>
							</div>
							<div className="formGroup">
								<label>Name</label>
								<Field
									disabled={isDisabled}
									type="text"
									placeholder="Item Name"
									autoFocus={true}
									name="productName"
								/>
							</div>
							<div className="formGroup">
								<label>Price</label>
								<Field
									disabled={isDisabled}
									type="number"
									placeholder="Price"
									name="price"
									id="price"
									step=".001"
								/>
							</div>
							<div className="formGroup">
								<label>Available Stock</label>
								<Field
									disabled={isDisabled}
									type="number"
									placeholder="No of Items"
									name="stock"
									id="stock"
								/>
							</div>
							<button
								className="writeButton"
								type="submit"
								disabled={isDisabled}
							>
								Create Item
							</button>
						</Form>
					</Formik>
				</div>
			</div>
		</Wrapper>
	)
}

export default Create
