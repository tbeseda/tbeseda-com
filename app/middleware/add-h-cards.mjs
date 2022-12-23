export default async function (req) {
	req.state = req.state || {}
	req.state.hCards = {
		items: [
			{
				type: ['h-card'],
				properties: {
					// 'additional-name': ['J.'],
					'country-name': ['U.S.A'],
					'family-name': ['Beseda'],
					'given-name': ['Taylor'],
					// 'honorific-prefix': ['Dr.'],
					// 'honorific-suffix': ['Ph.D.'],
					// 'postal-code': ['90210'],
					// 'street-address': ['123 Main St.'],
					// bday: ['1951-05-26'],
					email: ['mailto:tbeseda@gmail.com'],
					locality: ['Longmont'],
					name: ['Taylor Beseda'],
					nickname: ['tbeseda'],
					note: ['Web Engineer, DX, & General Technologist'],
					org: ['Begin.com'],
					photo: ['https://github.com/tbeseda.png'],
					region: ['Colorado'],
					role: ['DevEx Engineer'],
					// tel: ['+1.818.555.1212'],
					url: ['https://tbeseda.com'],
				},
			},
		],
	}
}
