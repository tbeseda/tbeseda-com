import arc from '@architect/functions'

const { things } = await arc.tables()

async function http ({ body }) {
  // search body for one of three keys: "label", "page", or "HIGHLIGHT"
  const entity = body.label || body.page || body.HIGHLIGHT || body.highlight
  //                        in case the schema changes to lowercase ↑

  if (!entity || !entity.type) return { status: 200 }

  const entityType = entity.type.toLowerCase()
  let type = `omnivore:${entityType}`
  let key = `${type}:${entity.id}`

  if (entityType === 'label') {
    const labelName = entity.name.toLowerCase()
    if (labelName !== 'favorite') return { status: 200 }

    // create a new type for favorites
    // entity.id is the label id, not unique to this page
    type = 'omnivore:favorite'
    key = `${type}:${entity.pageId}`
  }

  if (entityType === 'page') {
    delete entity.originalHtml // could be huge
    delete entity.content // also huge
  }

  if (entityType !== 'page') {
    const pageId = entity.pageId || entity.articleId
    //                        label            HIGHLIGHT!
    entity.pageId = pageId // normalize

    const pageKey = `omnivore:page:${pageId}`
    const page = await things.get({ key: pageKey })
    if (!page) {
      console.log('page not found', pageKey)
      return { status: 200 }
    }
    entity.page = page.entity
  }

  console.log({ fullType: type, key, entity })

  await things.put({
    key,
    type,
    entity,
    updatedAt: new Date().toISOString()
  })

  return {
    status: 200,
    text: 'tyvm'
  }
}

export const handler = arc.http(http)
