export interface Spotlight {
	id: string;
	name: string;
	program: string;
	quote: string;
	projectTitle: string;
	projectDescription: string;
	category: string;
	image: string;
	alt: string;
}

export const spotlights: Spotlight[] = [
	{
		id: '1',
		name: 'Alex M.',
		program: 'Mechatronics Eng · Year 3',
		quote:
			'I had never touched a soldering iron before joining. Six months later I had a fully working PCB I designed myself.',
		projectTitle: 'Custom LED controller board',
		projectDescription:
			'Designed and assembled a temperature-controlled LED driver using the space\'s PCB tools and reflow oven.',
		category: 'Electronics',
		image: '/images/spotlights/alex-m.jpg',
		alt: 'Alex holding the completed LED controller PCB',
	},
	{
		id: '2',
		name: 'Priya S.',
		program: 'Industrial Design · Year 2',
		quote:
			'The laser cutter let me go from a sketch on paper to a finished object in the same afternoon. That feedback loop is addictive.',
		projectTitle: 'Interlocking desk organiser',
		projectDescription:
			'Modelled and cut a fully press-fit birch plywood organiser — no glue, no screws, just tight tolerances.',
		category: 'Laser cutting',
		image: '/images/spotlights/priya-s.jpg',
		alt: 'Priya assembling the laser-cut plywood organiser',
	},
	{
		id: '3',
		name: 'Jordan T.',
		program: 'Physics · Year 4',
		quote:
			'I failed four times before it worked. The space gave me somewhere to keep coming back and try again without judgment.',
		projectTitle: 'Motorised telescope mount',
		projectDescription:
			'Iterated through 4 printed prototypes to build an alt-az mount that tracks stars with a stepper motor.',
		category: '3D printing',
		image: '/images/spotlights/jordan-t.jpg',
		alt: 'Jordan with the completed motorised telescope mount',
	},
];