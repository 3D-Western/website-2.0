export type Event = {
	id: number;
	title: string;
	date: string;
	time: string;
	image: string;
	alt: string;
	location: string;
	category: string;
	description: string;
	url?: string;
}

export const highlightEvents: Event[] = [
	{
		id: 1,
		title: "Mystery Bucket Challenge",
		date: "January 14th, 2026",
		time: "2:00 PM - 4:00 PM",
		image: "/images/lucky-block.webp",
		alt: "Canvas Background Image",
		location: "Sabourin Makerspace",
		category: "Workshop",
		description: "Participants engage in the full cycle of product ideation, prototyping and learning how to pitch an innovative idea.",
		url: "https://www.bouncelife.com/events/6942f5d21d54a5775305dcb4",
	},
	{
		id: 2,
		title: "Prototype and Design Thinking",
		date: "January 14th, 2026",
		time: "4:00 PM - 6:00 PM",
		image: "/images/workshop3.webp",
		alt: "Canvas Background Image",
		location: "Digital Makerspace",
		category: "Workshop",
		description: "Fun challenge to build the tallest and most stable structure to hold a golf ball using CAD basics to design and prepare a project for printing. Any students interested in product development, prototyping and learning how to design an innovative idea are welcome, but will need to bring their own laptop.",
		url: "https://www.bouncelife.com/events/6942f785c42f2067dc31b05e",
	},
	{
		id: 3,
		title: "Spaghetti Marshmallow Challenge",
		date: "January 21st, 2026",
		time: "2:00 PM - 4:00 PM",
		image: "/images/workshop2.webp",
		alt: "Canvas Background Image",
		location: "Sabourin Makerspace",
		category: "Activity",
		description: "A fun, hands-on workshop to introduce principles of prototyping, collaboration and design thinking, using simple materials like spaghetti, marshmallows, string and tape to build the tallest structure possible.",
		url: "https://www.bouncelife.com/events/6942f676bfdf6dc764c83089",
	},

	{
		id: 4,
		title: "Advanced 3D Printing Workshop: From Model to Reality",
		date: "January 21st, 2026",
		time: "4:00 PM - 6:00 PM",
		image: "/images/workshop1.webp",
		alt: "Canvas Background Image",
		location: "Digital Makerspace",
		category: "Workshop",
		description: "Design your own desk organizer or name tag like a pen holder or phone stand! Create something functional, take it home, and make it yours. Don't miss this fun and practical hands-on competition!",
		url: "https://www.bouncelife.com/events/6942f7f43d78d96d38414993",
	},
	{
		id: 5,
		title: "Bob Ross Style and Brand - 'Happy Little Trees': Honoring Art and Generosity",
		date: "January 28th, 2026",
		time: "2:00 PM - 4:00 PM",
		image: "/images/workshop4.webp",
		alt: "Canvas Background Image",
		location: "Sabourin Makerspace",
		category: "Workshop",
		description: "Using techniques learned during the workshop, students will use oil on canvas to create and showcase their own masterpieces in an exhibition, inspired by the Thames River in London in honor of the spirit of Bob Ross and his creative approach. This workshop is made possible through the generosity of the Sabourin Family Foundation.",
		url: "https://www.bouncelife.com/events/6942f6fa7ffe1cc83a76c004",
	},
	{
		id: 6,
		title: "Sewing for Entrepeneurs: Prototyping with Fabric",
		date: "January 28th, 2026",
		time: "4:00 PM - 6:00 PM",
		image: "/images/sewing.jpg",
		alt: "Canvas Background Image",
		location: "Digital Makerspace",
		category: "Workshop",
		description: "An introductory workshop to the basics of sewing and its applications in prototyping, including foundational stitching skills for both hand and machine. Explore fabric as a medium for creating functional and aesthetic prototypes.",
		url: "https://www.bouncelife.com/events/6942f84dda486964077145ca",
	},
];

export const pastEvents: Event[] = [
	{
		id: 1,
		title: "Mystery Bucket Challenge",
		date: "January 14th, 2026",
		time: "2:00 PM - 4:00 PM",
		image: "/images/lucky-block.webp",
		alt: "Canvas Background Image",
		location: "Sabourin Makerspace",
		category: "Workshop",
		description: "Participants engage in the full cycle of product ideation, prototyping and learning how to pitch an innovative idea.",
		url: "https://www.bouncelife.com/events/6942f5d21d54a5775305dcb4",
	},
	{
		id: 2,
		title: "Prototype and Design Thinking",
		date: "January 14th, 2026",
		time: "4:00 PM - 6:00 PM",
		image: "/images/workshop3.webp",
		alt: "Canvas Background Image",
		location: "Digital Makerspace",
		category: "Workshop",
		description: "Fun challenge to build the tallest and most stable structure to hold a golf ball using CAD basics to design and prepare a project for printing. Any students interested in product development, prototyping and learning how to design an innovative idea are welcome, but will need to bring their own laptop.",
		url: "https://www.bouncelife.com/events/6942f785c42f2067dc31b05e",
	},
	{
		id: 3,
		title: "Spaghetti Marshmallow Challenge",
		date: "January 21st, 2026",
		time: "2:00 PM - 4:00 PM",
		image: "/images/workshop2.webp",
		alt: "Canvas Background Image",
		location: "Sabourin Makerspace",
		category: "Activity",
		description: "A fun, hands-on workshop to introduce principles of prototyping, collaboration and design thinking, using simple materials like spaghetti, marshmallows, string and tape to build the tallest structure possible.",
		url: "https://www.bouncelife.com/events/6942f676bfdf6dc764c83089",
	},

	{
		id: 4,
		title: "Advanced 3D Printing Workshop: From Model to Reality",
		date: "January 21st, 2026",
		time: "4:00 PM - 6:00 PM",
		image: "/images/workshop1.webp",
		alt: "Canvas Background Image",
		location: "Digital Makerspace",
		category: "Workshop",
		description: "Design your own desk organizer or name tag like a pen holder or phone stand! Create something functional, take it home, and make it yours. Don't miss this fun and practical hands-on competition!",
		url: "https://www.bouncelife.com/events/6942f7f43d78d96d38414993",
	},
	{
		id: 5,
		title: "Bob Ross Style and Brand - 'Happy Little Trees': Honoring Art and Generosity",
		date: "January 28th, 2026",
		time: "2:00 PM - 4:00 PM",
		image: "/images/workshop4.webp",
		alt: "Canvas Background Image",
		location: "Sabourin Makerspace",
		category: "Workshop",
		description: "Using techniques learned during the workshop, students will use oil on canvas to create and showcase their own masterpieces in an exhibition, inspired by the Thames River in London in honor of the spirit of Bob Ross and his creative approach. This workshop is made possible through the generosity of the Sabourin Family Foundation.",
		url: "https://www.bouncelife.com/events/6942f6fa7ffe1cc83a76c004",
	},
	{
		id: 6,
		title: "Sewing for Entrepeneurs: Prototyping with Fabric",
		date: "January 28th, 2026",
		time: "4:00 PM - 6:00 PM",
		image: "/images/sewing.jpg",
		alt: "Canvas Background Image",
		location: "Digital Makerspace",
		category: "Workshop",
		description: "An introductory workshop to the basics of sewing and its applications in prototyping, including foundational stitching skills for both hand and machine. Explore fabric as a medium for creating functional and aesthetic prototypes.",
		url: "https://www.bouncelife.com/events/6942f84dda486964077145ca",
	},];
