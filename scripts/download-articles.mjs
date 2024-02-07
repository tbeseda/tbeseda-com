import fs from 'node:fs'
import CreateAwsLite from '@aws-lite/client'
import DynamoDB from '@aws-lite/dynamodb'

const TABLE = 'TbesedaComProduction-ArticlesTable-1Q8FXHHSB7A8G'

const aws = await CreateAwsLite({ region: 'us-east-1', plugins: [DynamoDB] })

const articles = await aws.DynamoDB.Scan({
  TableName: TABLE,
})

fs.writeFileSync('./seed-data/production-articles.json', JSON.stringify(articles.Items, null, 2))
