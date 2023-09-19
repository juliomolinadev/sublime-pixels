import { Item } from "./Item";
import { testItems } from "../../../tests/fixtures/componentsFixtures";

export const Batch = () => {
	return (
		<div className="batch">
			{testItems.map((item) => (
				<Item key={item.id} {...item} />
			))}
		</div>
	);
};
