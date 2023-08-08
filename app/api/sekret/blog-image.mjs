// ty, Ryan: https://begin.com/blog/posts/2023-02-08-upload-files-in-forms-part-1

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import Busboy from 'busboy'
import { createID } from '../../lib/create-id.mjs'

const { ARC_ENV, ARC_STATIC_BUCKET, AWS_REGION } = process.env
const isTesting = ARC_ENV === 'testing'
const imageFolder = '.uploaded-images'

// updated version of https://github.com/francismeynard/lambda-multipart-parser
const parse = (event) =>
	new Promise((resolve, reject) => {
		const busboy = Busboy({
			headers: {
				'content-type':
					event.headers['content-type'] || event.headers['Content-Type'],
			},
		})
		/** @type {{files: Array<Record<string, any>>}} */
		const result = { files: [] }

		busboy.on('file', (fieldname, file, info) => {
			const { filename, encoding, mimeType } = info
			const uploadFile = {}

			file.on('data', (data) => {
				uploadFile.content = data
			})

			file.on('end', () => {
				if (uploadFile.content) {
					uploadFile.filename = filename
					uploadFile.contentType = mimeType
					uploadFile.encoding = encoding
					uploadFile.fieldname = fieldname
					result.files.push(uploadFile)
				}
			})
		})

		busboy.on('field', (fieldname, value) => {
			result[fieldname] = value
		})

		busboy.on('error', (error) => {
			reject(error)
		})

		busboy.on('close', () => {
			resolve(result)
		})

		const encoding =
			event.encoding || (event.isBase64Encoded ? 'base64' : 'binary')

		busboy.write(event.body, encoding)
		busboy.end()
	})

export async function post(req) {
	// the body property needs to be swapped out for rawBody
	const parsedForm = await parse({
		headers: req.headers,
		encoding: req.encoding,
		isBase64Encoded: req.isBase64Encoded,
		body: req.rawBody,
	})
	const { content, filename } = parsedForm.files[0]

	// Save the image to S3 bucket (or temp folder for local dev)
	const newFileName = `${createID()}_${filename}`
	if (isTesting) {
		const { writeFileSync, mkdirSync } = await import('node:fs')
		const { join } = await import('node:path')
		const { fileURLToPath } = await import('node:url')
		const __dirname = fileURLToPath(new URL('.', import.meta.url))
		const imageDir = join(__dirname, '..', '..', '..', 'public', imageFolder)

		try {
			mkdirSync(imageDir)
		} catch (e) { }

		writeFileSync(join(imageDir, newFileName), content)
	} else {
		const client = new S3Client({ region: AWS_REGION })
		const command = new PutObjectCommand({
			Bucket: ARC_STATIC_BUCKET,
			Key: `${imageFolder}/${newFileName}`,
			Body: content,
		})

		await client.send(command)
	}

	return {
		json: { newFileName },
	}
}
