import process from 'node:process'
import arc from '@architect/functions'
import { createClient } from '@vrite/sdk/api'

const { VRITE_KEY } = process.env
if (!VRITE_KEY) throw new Error('Missing Vrite key')
const syncedGroupNames = ['Ideas', 'Drafts', 'Published']
const typeString = 'vrite:content'

const { things } = await arc.tables()
const vrite = createClient({ token: VRITE_KEY })

async function http({ body }) {
  // ? create event in order to respond faster

  const { contentGroupId, id, title } = body

  console.log(`Incoming content <${id}>: "${title}"`)

  let contentGroups
  // let contentGroupNames
  let contentGroupsById
  try {
    contentGroups = await vrite.contentGroups.list()
    // contentGroupNames = contentGroups.map((group) => group.name)
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

  console.log(`Content previously in group "${contentGroupName}"`)

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
    const currentContentGroupName = contentGroupsById[contentPiece.contentGroupId].name

    if (currentContentGroupName) {
      console.log(`Content currently in group "${currentContentGroupName}"`)
      const keepContent = syncedGroupNames.includes(currentContentGroupName)

      if (keepContent) {
        const newContent = Object.keys(contentPiece).reduce((acc, key) => {
          const value = contentPiece[key]
          if (value) acc[key] = value
          return acc
        }, {})

        try {
          const saved = await things.put({
            key: `${typeString}:${currentContentGroupName}:${id}`,
            type: typeString,
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
      } else {
        console.log(`Content in "${currentContentGroupName}", not keeping`)
      }

      // clean up other content groups
      for (const groupName of syncedGroupNames) {
        console.log(`Deleting content from ${groupName}`)

        if (groupName !== currentContentGroupName) {
          try {
            await things.delete({ key: `${typeString}:${groupName}:${id}` })
          } catch (error) {
            console.log('Error deleting content', JSON.stringify(error, null, 2))
          }
        }
      }
    } else {
      console.log('Unkonwn content group name', JSON.stringify(contentPiece, null, 2))
    }
  } else {
    console.log('No content piece found', JSON.stringify(contentPiece, null, 2))
  }

  return { statusCode: 200, body: 'tyvm' }
}

export const handler = arc.http(http)
