import { FiHeart, FiThumbsDown, FiDownload, FiArrowRight } from "react-icons/fi";
import { ItemProps } from "../../store";

// TODO: hasDownloadables should be in the state

export const Item = ({
	img,
	title,
	isDownloaded,
	hasDownloadables,
	link,
	isLoved,
	isDisliked,
}: ItemProps) => {
	return (
		<div className="item">
			<img className="item__img" src={img} alt="post item" />

			<p className="item__title">{title} </p>

			<div className="item__footer">
				{hasDownloadables && !isDownloaded ? (
					// TODO:  define onItemDownload
					<button className="item__downloadButton">
						Download <FiDownload className="item__icon" />
					</button>
				) : (
					<>
						<div className={isLoved ? "item__loveButton--active" : "item__loveButton"}>
							<FiHeart />
						</div>

						<a className="item__downloadButton" href={link} target="_blank">
							Buy on Etsy <FiArrowRight className="item__icon" />
						</a>

						<div className={isDisliked ? "item__dislikeButton--active" : "item__dislikeButton"}>
							<FiThumbsDown />
						</div>
					</>
				)}
			</div>
		</div>
	);
};
