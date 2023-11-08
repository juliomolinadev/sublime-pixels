import { FiHeart, FiThumbsDown, FiDownload, FiArrowRight } from "react-icons/fi";
import { ItemProps } from "../../store";
import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { startSwitchDislike, startSwitchLike } from "../../store/user/thunks";
import { downloadImage } from "../helpers";
import { switchDownloadingItem } from "../../store/items";
import { startAddDownload } from "../../store/user/thunks/startAddDownload";
import { switchRegisterModal } from "../../store/ui";
import { messageAlert } from "../../helpers";
import { SweetAlertOptions } from "sweetalert2";

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
	isDownloading,
	fileNames,
}: Props) => {
	const { likes, dislikes, downloads } = useTypedSelector((state) => state.user);
	const { uid, emailVerified } = useTypedSelector((state) => state.auth);
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

	const onDownloadImage = async (file: string) => {
		if (!uid) {
			dispatch(switchRegisterModal());
			return;
		}

		if (!emailVerified) {
			const alert: SweetAlertOptions = {
				title: "Please verify your email first",
				text: "We'll use your email to notify you when we publish new free images.",
				icon: "warning",
			};
			messageAlert(alert);
			return;
		}

		dispatch(switchDownloadingItem(id));

		const isDownloaded = await downloadImage({ batch: `B${batch}`, file });
		if (isDownloaded) dispatch(startAddDownload(id));

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

				<button
					aria-label="dislikeButton"
					className={isDisliked ? "item__dislikeButton--active" : "item__dislikeButton"}
					onClick={onSwitchDislike}
				>
					<FiThumbsDown />
				</button>

				{hasDownloadables || isDownloaded ? (
					<div className="item__downloadSection">
						<div className="item__downloadButtons">
							<button
								className="item__downloadButton"
								onClick={() => onDownloadImage(fileNames[0])}
							>
								<FiDownload className="item__icon" /> Download straight
							</button>

							<button
								className="item__downloadButton"
								onClick={() => onDownloadImage(fileNames[1])}
							>
								<FiDownload className="item__icon" /> Download tapered
							</button>
						</div>

						<div className="item__downloadSpinner">
							{isDownloading && <div className="item__spinner"></div>}
						</div>
					</div>
				) : (
					<a className="item__buyButton" href={buyLink} target="_blank">
						Buy on Etsy <FiArrowRight className="item__icon" />
					</a>
				)}
			</div>
		</div>
	);
};
