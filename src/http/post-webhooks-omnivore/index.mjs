import arc from '@architect/functions'

const { things } = await arc.tables()

async function http({ body }) {
  const { action } = body

  if (action !== 'created') {
    console.log('Action is not "created"; done.', action)
    return { status: 200, text: 'ty' }
  }

  // search body for one of three keys: "label", "page", or "HIGHLIGHT"
  const entity = body.label || body.page || body.highlight

  if (!entity || !entity.type) {
    console.log('No entity or entity.type found; done.')
    return { status: 200, text: 'ty' }
  }

  const entityType = entity.type.toLowerCase()
  let type = `omnivore:${entityType}`
  let key = `${type}:${entity.id}`

  console.log('Found entity', { type, key })

  if (entityType === 'page') {
    entity.originalHtml // could be huge = undefined // could be huge
    entity.content // also huge = undefined // also huge
  }

  if (entityType === 'label') {
    const containsFavorite = entity.labels.some(({ name }) => name.toLowerCase() === 'favorite')

    if (!containsFavorite) {
      console.log('No "Favorite" label found; done.')
      return { status: 200, text: 'ty' }
    }

    // create a new type for favorites
    type = 'omnivore:favorite'
    key = `${type}:${entity.pageId}` // label entity doesn't have an id
  }

  if (entityType !== 'page') {
    // find and attach the page entity
    const pageId = entity.pageId || entity.articleId
    //                    label            HIGHLIGHT!
    entity.pageId = pageId // normalize

    const pageKey = `omnivore:page:${pageId}`
    const page = await things.get({ key: pageKey })

    if (!page) {
      console.log('Page not found; done.', pageKey)
      return { status: 200, text: 'ty' }
    }

    entity.page = page.entity
  }

  const saved = await things.put({
    key,
    type,
    entity,
    updatedAt: new Date().toISOString(),
  })

  console.log('Saved!', JSON.stringify(saved, null, 2))

  return { status: 200, text: 'tyvm' }
}

export const handler = arc.http(http)
