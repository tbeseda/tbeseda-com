import { stdout } from 'node:process'
import awsLite from '@aws-lite/client'
import Table from 'cli-table3'
import enquirer from 'enquirer'

const { Select } = enquirer
const aws = await awsLite({ region: 'us-east-1' })

const distributionsTable = new Table({
  head: ['Id', 'Status', 'Domain', 'Aliases', 'Origins'],
})

function printAliases (aliases) {
  if (!aliases) return ''
  return aliases.Items?.CNAME
}

function printOrigins (origins) {
  if (!origins) return ''
  return origins.Items?.Origin?.Id
}

const cloudfrontResponse = await aws({
  service: 'cloudfront',
  endpoint: '/2020-05-31/distribution',
})

for (const distribution of cloudfrontResponse.payload.Items.DistributionSummary) {
  const { Id, Status, DomainName, Aliases, Origins } = distribution
  distributionsTable.push([Id, Status, DomainName, printAliases(Aliases), printOrigins(Origins)])
}

stdout.write(distributionsTable.toString())
stdout.write('\n')

const prompt = new Select({
  name: 'distributionId',
  message: 'Select a distribution',
  choices: cloudfrontResponse.payload.Items.DistributionSummary.map(({ Id }) => Id),
})

const distributionId = await prompt.run()

const Period = 3_600 // 1 hour
const end = new Date()
const hourAgo = new Date(end.getTime() - 60 * 60 * 1000)
const dayAgo = new Date(end.getTime() - 24 * 60 * 60 * 1000)
const weekAgo = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000)
const monthAgo = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000)
const EndTime = end.toISOString()
const endString = end.toLocaleString()

const requestsTable = new Table({
  head: ['StartTime', 'EndTime', 'Requests'],
})

for (const start of [hourAgo, dayAgo, weekAgo, monthAgo]) {
  const requestsMetrics = await aws({
    service: 'monitoring',
    query: {
      Action: 'GetMetricStatistics',
      Namespace: 'AWS/CloudFront',
      MeasureName: 'Requests',
      StartTime: start.toISOString(),
      EndTime,
      Period,
      'Statistics.member.1': 'Sum',
      'Dimensions.member.1.Name': 'Region',
      'Dimensions.member.1.Value': 'Global',
      'Dimensions.member.2.Name': 'DistributionId',
      'Dimensions.member.2.Value': distributionId,
    },
  })

  const member = requestsMetrics.payload.GetMetricStatisticsResult.Datapoints.member

  const row = [start.toLocaleString(), endString]
  if (Array.isArray(member)) {
    row.push(member.map(({ Sum }) => Number(Sum)).reduce((a, b) => a + b, 0).toString())
  } else if (member) {
    row.push(Number(member.Sum || 0).toString())
  } else {
    row.push('0')
  }

  requestsTable.push(row)
}

stdout.write(requestsTable.toString())
stdout.write('\n')
