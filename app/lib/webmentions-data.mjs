import arc from '@architect/functions'

const data = await arc.tables()
const webmentions = data.webmentions

export default webmentions

export async function mentionsByPath(path) {
	const mentions = await webmentions.query({
		IndexName: 'mentionsByPath',
		KeyConditionExpression: 'targetPath = :targetPath',
		ExpressionAttributeValues: { ':targetPath': path },
	})

	return mentions.Items.filter((mention) => mention.approved)
}
