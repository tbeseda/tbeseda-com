// ty, Ryan: https://begin.com/blog/posts/2023-02-08-upload-files-in-forms-part-1

import multipart from 'lambda-multipart-parser'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { createID } from '../../lib/create-id.mjs'

const { ARC_ENV, ARC_STATIC_BUCKET, AWS_REGION } = process.env
const isTesting = ARC_ENV === 'testing'
const imageFolder = '.uploaded-images'

export async function post(req) {
	// the body property needs to be swapped out for rawBody
	const parsedForm = await multipart.parse({ ...req, body: req.rawBody })
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
		} catch (e) {}

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
