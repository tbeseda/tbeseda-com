class HCardPresenter {
	// raw properties
	#data
	// class consumer interface as proxy
	#interface = new Proxy(this, {
		get(obj, key) {
			return obj[key] || obj.mf[key]
		},
	})
	// properties proxy for #data
	props = new Proxy(this, {
		get(obj, key) {
			return obj.#data[key] && Array.isArray(obj.#data[key])
				? obj.#data[key][0]
				: null
		},
	})
	// microformat proxy
	mf = new Proxy(this, {
		get(obj, key) {
			if (obj.#data[key]) {
				const keyString = String(key)

				let type = ''
				if (pProperties.has(keyString)) {
					type = 'p-'
				} else if (uProperties.has(keyString)) {
					type = 'u-'
				} else if (dtProperties.has(keyString)) {
					type = 'dt-'
				}

				return `<span class="${type}${keyString}">${obj.props[key]}</span>`
			} else {
				return null
			}
		},
	})

	constructor(data) {
		if (data.type[0] === 'h-card') {
			this.#data = data.properties
			// return this.#interface
		} else {
			throw 'Invalid h-card data'
		}
	}

	get card() {
		return this.#interface
	}
	// geo can be p- and/or u-
	get geo() {
		return `<span class="p-geo u-geo">${this.props.geo}</span>`
	}
	get 'p-geo'() {
		return `<span class="p-geo">${this.props.geo}</span>`
	}
	get 'u-geo'() {
		return `<span class="u-geo">${this.props.geo}</span>`
	}

	// helpers
	get emailAddress() {
		return this.props.email.replace('mailto:', '')
	}
	get fullHonors() {
		return [
			this.mf['honorific-prefix'],
			this.mf['given-name'],
			this.mf['additional-name'],
			this.mf['family-name'],
			this.mf['honorific-suffix'],
			this.props.nickname ? `(aka ${this.mf.nickname})` : null,
		].join(' ')
	}
	get photoHtml() {
		return `<img class="u-photo" src="${this.props.photo}" alt="${this.props.name}" />`
	}
	get logoHtml() {
		return `<img class="u-logo" src="${this.props.logo}" alt="logo" />`
	}
	get nameLinkHtml() {
		return `<a class="p-name u-url" href="${this.props.url}">${this.props.name}</a>`
	}
	get emailLinkHtml() {
		return `<a class="u-email" href="${this.props.email}">${this.emailAddress}</a>`
	}
	get telLinkHtml() {
		return `<a class="p-tel" href="tel:${this.props.tel}">${this.props.tel}</a>`
	}
	get addressHtml() {
		return `
<address class="p-adr">
  ${this.mf['street-address']}<br/>
  ${this.mf.locality},
  ${this.mf.region}
  ${this.mf['postal-code']}<br />
  ${this.mf['country-name']}
</address>`.trim()
	}

	// all h-card properties; included here for Intellisense
	'additional-name'
	altitude
	category
	'country-name'
	'extended-address'
	'family-name'
	'gender-identity'
	// "geo"; // see getters below
	'given-name'
	'honorific-prefix'
	'honorific-suffix'
	'job-title'
	latitude
	locality
	longitude
	name
	nickname
	note
	org
	'post-office-box'
	'postal-code'
	region
	role
	sex
	'sort-string'
	'street-address'
	tel

	logo
	uid
	key
	impp
	email
	photo
	url

	anniversary
	bday
}

// ? dynamically set properties on HCardPresenter

export default HCardPresenter

export const pProperties = new Set([
	'additional-name',
	'altitude',
	'category',
	'country-name',
	'extended-address',
	'family-name',
	'gender-identity',
	'geo',
	'given-name',
	'honorific-prefix',
	'honorific-suffix',
	'job-title',
	'latitude',
	'locality',
	'longitude',
	'name',
	'nickname',
	'note',
	'org',
	'post-office-box',
	'postal-code',
	'region',
	'role',
	'sex',
	'sort-string',
	'street-address',
	'tel',
])
export const uProperties = new Set([
	'logo',
	'uid',
	'geo',
	'key',
	'impp',
	'email',
	'photo',
	'url',
])
export const dtProperties = new Set(['anniversary', 'bday'])
export const properties = new Set([
	...dtProperties,
	...pProperties,
	...uProperties,
])
