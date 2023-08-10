import { FiHeart, FiThumbsDown, FiDownload, FiArrowRight } from "react-icons/fi";

export const Item = () => {
	const hasDownloadables = true;

	return (
		<div className="item">
			<img
				className="item__img"
				src="https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg"
				alt="post item"
			/>

			<p className="item__title">Product title </p>

			<div className="item__footer">
				{hasDownloadables ? (
					<>
						<div className="item__loveButton">
							<FiHeart />
						</div>

						<div className="item__downloadButton">
							Buy on Etsy <FiArrowRight className="item__icon" />
						</div>

						<div className="item__dislikeButton">
							<FiThumbsDown />
						</div>
					</>
				) : (
					<div className="item__downloadButton">
						Download <FiDownload className="item__icon" />
					</div>
				)}
			</div>
		</div>
	);
};
