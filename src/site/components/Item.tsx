import { FiHeart, FiThumbsDown, FiArrowRight, FiChevronDown } from "react-icons/fi";

import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { ItemProps } from "../../store";
import { startSwitchDislike, startSwitchLike } from "../../store/user/thunks";
import { switchDownloadMenu } from "../../store/items";
import { DownloaderMenu } from "./DownloaderMenu";

interface Props extends ItemProps {
	hasDownloadables: boolean;
}

export const Item = ({
	id,
	img,
	title,
	batch,
	buyLink,
	hasDownloadables,
	isOpenDownloadMenu,
	isDownloadingStraight,
	isDownloadingTapered,
	fileNames,
}: Props) => {
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

	const handleOpenDownloadMenu = (): void => {
		dispatch(switchDownloadMenu(id));
	};

	return (
		<div className={`item ${isDownloaded && "item__downloaded"}`}>
			<img className="item__img" src={img} alt={title} />

			<div className="item__controls">
				<p className="item__title">{title}</p>

				<div className="item__footer">
					<div className="item__iconButtons">
						<button
							aria-label="likeButton"
							className={isLoved ? "item__likeButton--active" : "item__likeButton"}
							onClick={onSwitchLike}
						>
							<FiHeart />
						</button>

						<button
							aria-label="dislikeButton"
							className={isDisliked ? "item__dislikeButton--active" : "item__dislikeButton"}
							onClick={onSwitchDislike}
						>
							<FiThumbsDown />
						</button>
					</div>

					{hasDownloadables || isDownloaded ? (
						<div className="item__downloader">
							<span className="item__downloaderLabel">Download</span>

							<button
								className="item__downloaderButton"
								aria-label="downloader"
								onClick={handleOpenDownloadMenu}
							>
								<FiChevronDown className="item__icon" />
							</button>
						</div>
					) : (
						<a className="item__buyButton" href={buyLink} target="_blank">
							Buy on Etsy <FiArrowRight className="item__icon" />
						</a>
					)}
				</div>
			</div>

			{isOpenDownloadMenu && (
				<DownloaderMenu
					id={id}
					batch={batch}
					isDownloadingStraight={isDownloadingStraight}
					isDownloadingTapered={isDownloadingTapered}
					fileNames={fileNames}
					buyLink={buyLink}
				/>
			)}
		</div>
	);
};
