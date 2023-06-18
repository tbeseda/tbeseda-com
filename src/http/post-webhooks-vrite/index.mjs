import process from 'node:process'
import arc from '@architect/functions'
import { createClient } from '@vrite/sdk/api'

const { VRITE_KEY } = process.env
if (!VRITE_KEY) throw new Error('Missing Vrite key')

const { things } = await arc.tables()
const vrite = createClient({ token: VRITE_KEY })

async function deleteContent(groupName, id) {
	try {
		await things.delete({ key: `content:${groupName}:${id}` })
		return true
	} catch (error) {
		console.log('Error deleting content', JSON.stringify(error, null, 2))
		return false
	}
}

async function http({ body }) {
	const { contentGroupId, id, title } = body

	console.log(`Incoming content <${id}>: "${title}"`)

	let contentGroups
	let contentGroupNames
	let contentGroupsById
	try {
		contentGroups = await vrite.contentGroups.list()
		contentGroupNames = contentGroups.map((group) => group.name)
		contentGroupsById = contentGroups.reduce((acc, group) => {
			acc[group.id] = group
			return acc
		}, {})
	} catch (error) {
		console.log('Error fetching content groups', JSON.stringify(error, null, 2))
		return {
			statusCode: 200, // return success to webhook
			body: 'Error fetching content groups',
		}
	}

	const contentGroupName = contentGroupsById[contentGroupId].name

	console.log(`Content in group ${contentGroupName}`)

	let contentPiece
	try {
		contentPiece = await vrite.contentPieces.get({
			id,
			content: true,
			description: 'text',
		})
	} catch (error) {
		console.log('Error fetching content piece', JSON.stringify(error, null, 2))
	}

	if (contentPiece) {
		const currentContentGroupName =
			contentGroupsById[contentPiece.contentGroupId].name

		if (currentContentGroupName) {
			const newContent = Object.keys(contentPiece).reduce((acc, key) => {
				const value = contentPiece[key]
				if (value) acc[key] = value
				return acc
			}, {})

			try {
				const saved = await things.put({
					key: `content:${currentContentGroupName}:${id}`,
					type: 'vrite:content',
					updatedAt: new Date().toISOString(),
					...newContent,
				})

				console.log(`Saved "${saved.key}"`)
			} catch (err) {
				console.log(
					'Error saving content to db',
					JSON.stringify(newContent, null, 2),
					JSON.stringify(err, null, 2),
				)
			}

			for (const groupName of contentGroupNames) {
				if (groupName !== currentContentGroupName) {
					const isDeleted = await deleteContent(groupName, id)
					console.log(`Deleted content from ${groupName}: ${isDeleted}`)
				}
			}
		} else {
			console.log(
				'No content group found!',
				JSON.stringify(contentPiece, null, 2),
			)
		}
	} else {
		console.log('No content piece found', JSON.stringify(contentPiece, null, 2))
	}

	return { statusCode: 200, body: 'tyvm' }
}

export const handler = arc.http.async(http)
