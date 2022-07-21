/**
 * Encode a File object to base64 string
 * @param {File} file - JavaScript's File object
 * @returns {string | Error} base64 encoded string of the file or an error
 */
export const toBase64 = (file: File) =>
	new Promise<string | Error>((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () =>
			resolve(
				(reader.result as string)
					.replace('data:', '')
					.replace(/^.+,/, '')
			)
		reader.onerror = (error) => reject(error)
	})
