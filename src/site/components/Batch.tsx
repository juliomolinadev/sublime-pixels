import { Item } from "./Item";

export const Batch = () => {
	interface Item {
		// imgURL: string;
		id: string;
		// title: string;
		// link: string;
	}

	// const items: Item[] = [
	// 	{
	// 		imgURL: "...",
	// 		id: "123",
	// 		title: "Image",
	// 		link: "",
	// 	},
	// ];

	const items: Item[] = [
		{ id: "01" },
		{ id: "02" },
		{ id: "03" },
		{ id: "04" },
		{ id: "05" },
		{ id: "06" },
		{ id: "07" },
		{ id: "08" },
		{ id: "09" },
		{ id: "10" },
	];

	return (
		<div className="batch">
			{items.map((item) => (
				<Item key={item.id} />
			))}
		</div>
	);
};
