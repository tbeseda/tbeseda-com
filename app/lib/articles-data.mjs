import articlesData from '../_data/articles.json' assert { type: 'json' }

const today = new Date()

export default process.env.ARC_SANDBOX
	? articlesData
	: articlesData.filter((a) => a.published && new Date(a.published) < today)

export function articleFromPath(path) {
	return articlesData.find((a) => a.path === path)
}
