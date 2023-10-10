import { Item } from "./Item";
import { useTypedSelector } from "../../hooks";
import { shuffle } from "../../helpers/shuffle";

export const Batch = () => {
	const { currentItems } = useTypedSelector((state) => state.items);

	const keys = Object.keys(currentItems);

	shuffle(keys);

	return (
		<div className="batch">
			{keys.map((key) => (
				<Item key={key} {...currentItems[key]} />
			))}
		</div>
	);
};
