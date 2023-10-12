import { FiHeart, FiThumbsDown, FiDownload, FiArrowRight } from "react-icons/fi";
import { ItemProps } from "../../store";

// TODO: hasDownloadables should be in the state

const downloads = ["1"];
const likes = ["3", "7", "15"];
const dislikes = ["17", "6", "8"];

interface Props extends ItemProps {
	hasDownloadables: boolean;
}
export const Item = ({ id, img, title, buyLink, hasDownloadables }: Props) => {
	const isDownloaded = downloads.includes(id);
	const isLoved = likes.includes(id);
	const isDisliked = dislikes.includes(id);

	return (
		<div className={`item ${isDownloaded && "item__downloaded"}`}>
			<img className="item__img" src={img} alt="post item" />

			<p className="item__title">{title} </p>

			<div className="item__footer">
				<div className={isLoved ? "item__loveButton--active" : "item__loveButton"}>
					<FiHeart />
				</div>

				{hasDownloadables || isDownloaded ? (
					<button className="item__downloadButton">
						Download <FiDownload className="item__icon" />
					</button>
				) : (
					<a className="item__buyButton" href={buyLink} target="_blank">
						Buy on Etsy <FiArrowRight className="item__icon" />
					</a>
				)}

				<div className={isDisliked ? "item__dislikeButton--active" : "item__dislikeButton"}>
					<FiThumbsDown />
				</div>
			</div>
		</div>
	);
};
