import { FiHeart, FiThumbsDown, FiDownload, FiArrowRight } from "react-icons/fi";
import { ItemProps } from "../../store";
import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { startSwitchDislike, startSwitchLike } from "../../store/user/thunks";
import { downloadImage } from "../helpers";
import { switchDownloadingItem } from "../../store/items";

interface Props extends ItemProps {
	hasDownloadables: boolean;
}

export const Item = ({ id, img, title, buyLink, hasDownloadables, isDownloading }: Props) => {
	const { likes, dislikes, downloads } = useTypedSelector((state) => state.user);
	const dispatch = useTypedDispatch();

	const isDownloaded = downloads.includes(id);
	const isLoved = likes.includes(id);
	const isDisliked = dislikes.includes(id);

	const onSwitchLike = (): void => {
		dispatch(startSwitchLike(id));
	};

	const onSwitchDislike = (): void => {
		dispatch(startSwitchDislike(id));
	};

	const onDownloadImage = async () => {
		dispatch(switchDownloadingItem(id));
		await downloadImage({ batch: "B2", file: "3D-Embroidered-Ocean-Sunset-Straight.png" });
		dispatch(switchDownloadingItem(id));
	};

	return (
		<div className={`item ${isDownloaded && "item__downloaded"}`}>
			<img className="item__img" src={img} alt="post item" />

			<p className="item__title">{title}</p>

			<div className="item__footer">
				<button
					aria-label="likeButton"
					className={isLoved ? "item__likeButton--active" : "item__likeButton"}
					onClick={onSwitchLike}
				>
					<FiHeart />
				</button>

				{hasDownloadables || isDownloaded ? (
					<button className="item__downloadButton" onClick={onDownloadImage}>
						Download <FiDownload className="item__icon" />
						{isDownloading && <div className="item__spinner"></div>}
					</button>
				) : (
					<a className="item__buyButton" href={buyLink} target="_blank">
						Buy on Etsy <FiArrowRight className="item__icon" />
					</a>
				)}

				<div
					aria-label="dislikeButton"
					className={isDisliked ? "item__dislikeButton--active" : "item__dislikeButton"}
					onClick={onSwitchDislike}
				>
					<FiThumbsDown />
				</div>
			</div>
		</div>
	);
};
