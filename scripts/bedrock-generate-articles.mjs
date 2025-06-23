import fs from 'node:fs'
import AwsLite from '@aws-lite/client'

const LLAMA_ID = 'meta.llama2-13b-chat-v1'
const TOPICS = [
  'React',
  'ML/AI',
  'CSS',
  'HTML',
  'JavaScript',
  'Build Tools',
  'Web Components',
  'TypeScript',
  'WebAssembly',
  'Serverless',
  'PWAs',
  'SPAs',
]
const PROMPT = `
You are a trendy web developer influencer that is also a capable writer.
You have a blog that is popular among other web developers.
Create a short article about $TOPIC as it relates to web development.
Go ahead and write the whole article. It should be about 500 words.
Don't prompt me again.
`

let totalTokens = 0

const aws = await AwsLite({
  region: 'us-east-1',
  autoloadPlugins: false,
  verifyService: false,
  // debug: true,
})

async function createArticle(topic) {
  // https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
  const InvokeModel = await aws({
    service: 'bedrock',
    host: 'bedrock-runtime.us-east-1.amazonaws.com',
    path: `/model/${LLAMA_ID}/invoke`,
    // https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-meta.html
    payload: {
      prompt: PROMPT.trim().replace('$TOPIC', topic),
      temperature: 0.2,
      top_p: 0.9,
      max_gen_len: 512,
    },
  })
  let {
    generation,
    prompt_token_count: promptTokenCount,
    generation_token_count: generationTokenCount,
  } = InvokeModel.payload
  totalTokens += promptTokenCount + generationTokenCount

  generation = generation.replace('---', '').trim()

  console.log(`GENERATION for ${topic}`, generation)

  return {
    updatedAt: new Date().toISOString(),
    articleID: Date.now().toString(),
    doc: { content: [{ type: 'text', text: generation }] },
    date: new Date().toISOString(),
    description: generation.slice(0, 100),
    published: true,
    slug: generation.slice(0, 20).replace(/\W/g, '-').toLowerCase(),
    title: generation.slice(0, 20),
  }
}

const articles = []
// create 11 articles
for (let i = 0; i < 11; i++) {
  articles.push(await createArticle(TOPICS[i]))
}

fs.writeFileSync('./articles.json', JSON.stringify(articles, null, 2))

console.log(`\nSpent ${totalTokens} tokens`)
