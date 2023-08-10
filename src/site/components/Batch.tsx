import { Item } from "./Item";

export const Batch = () => {
	interface Item {
		imgURL: string;
		id: string;
		title: string;
		link: string;
	}

	const items: Item[] = [
		{
			imgURL: "...",
			id: "123",
			title: "Image",
			link: "",
		},
	];

	return (
		<div>
			{items.map((item) => (
				<Item key={item.id}>{JSON.stringify(item)}</Item>
			))}
		</div>
	);
};
