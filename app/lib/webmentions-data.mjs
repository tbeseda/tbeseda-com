import arc from '@architect/functions'

const { webmentions } = await arc.tables()

export default webmentions

export async function mentionsByPath(path) {
  const mentions = await webmentions.query({
    IndexName: 'mentionsByPath',
    KeyConditionExpression: 'targetPath = :targetPath',
    ExpressionAttributeValues: { ':targetPath': path },
  })

  return mentions.Items.filter((mention) => mention.approved)
}
