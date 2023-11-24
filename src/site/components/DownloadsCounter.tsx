import { useTypedSelector } from "../../hooks";
import { FiGift } from "react-icons/fi";

export const DownloadsCounter = () => {
	const { freeDownloads } = useTypedSelector((state) => state.user);

	return (
		<div className="downloadsCounter">
			<div className="downloadsCounter__icon">
				<FiGift />
			</div>

			<div className="downloadsCounter__label">Free downloads:</div>

			<div
				className={`downloadsCounter__counter ${
					freeDownloads > 0 &&
					"downloadsCounter__counter--available downloadsCounter__counter--flashes"
				}`}
			>
				{freeDownloads}
			</div>
		</div>
	);
};
