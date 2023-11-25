import { FiHeart, FiThumbsDown, FiArrowRight, FiChevronDown } from "react-icons/fi";

import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { ItemProps } from "../../store";
import { startSwitchDislike, startSwitchLike } from "../../store/user/thunks";
import { switchDownloadMenu } from "../../store/items";
import { DownloaderMenu } from "./DownloaderMenu";
import { startIncreaseBuyLinkCounter } from "../../store/user/thunks/startIncreaseBuyLinkCounter";
import { useRef } from "react";
import gsap from "gsap";

// interface Props extends ItemProps {
// 	hasDownloadables: boolean;
// }

export const Item = ({
	id,
	img,
	title,
	batch,
	buyLink,
	// hasDownloadables,
	isOpenDownloadMenu,
	isDownloadingStraight,
	isDownloadingTapered,
	fileNames,
}: ItemProps) => {
	const { likes, dislikes, downloads, userRole, freeDownloads } = useTypedSelector(
		(state) => state.user,
	);
	const dispatch = useTypedDispatch();

	const likeButtonRef = useRef<HTMLButtonElement>(null);
	const dislikeButtonRef = useRef<HTMLButtonElement>(null);

	const hasDownloadables = freeDownloads > 0;
	const isDownloaded = downloads.includes(id);
	const isLoved = likes.includes(id);
	const isDisliked = dislikes.includes(id);

	const onSwitchLike = (): void => {
		const tl = gsap.timeline();
		tl.to(likeButtonRef.current, { y: -100, duration: 0.2, ease: "ease.out" });
		tl.to(likeButtonRef.current, { y: 0, duration: 0.2, ease: "elastic" });

		dispatch(startSwitchLike(id));
	};

	const onSwitchDislike = (): void => {
		const tl = gsap.timeline();
		tl.to(dislikeButtonRef.current, { y: -100, duration: 0.2, ease: "ease.out" });
		tl.to(dislikeButtonRef.current, { y: 0, duration: 0.2, ease: "elastic" });

		dispatch(startSwitchDislike(id));
	};

	const handleOpenDownloadMenu = (): void => {
		dispatch(switchDownloadMenu(id));
	};

	const onClickBuyButton = (): void => {
		dispatch(startIncreaseBuyLinkCounter(id));
	};

	return (
		<div className={`item ${isDownloaded && "item__downloaded"}`}>
			<img className="item__img" src={img} alt={title} />

			<div className="item__controls">
				<p className="item__title">{title}</p>

				<div className="item__footer">
					<div className="item__iconButtons">
						<button
							ref={likeButtonRef}
							aria-label="likeButton"
							className={isLoved ? "item__likeButton--active" : "item__likeButton"}
							onClick={onSwitchLike}
						>
							<FiHeart />
						</button>

						<button
							ref={dislikeButtonRef}
							aria-label="dislikeButton"
							className={isDisliked ? "item__dislikeButton--active" : "item__dislikeButton"}
							onClick={onSwitchDislike}
						>
							<FiThumbsDown />
						</button>
					</div>

					{hasDownloadables || isDownloaded || userRole === "admin" ? (
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
						<a
							className="item__buyButton"
							href={buyLink}
							target="_blank"
							onClick={onClickBuyButton}
						>
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
