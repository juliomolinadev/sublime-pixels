import { useRef } from "react";
import { useOutsideAlerter, useTypedDispatch, useTypedSelector } from "../../hooks";
import { switchRegisterModal } from "../../store/ui";
import { SweetAlertOptions } from "sweetalert2";
import { messageAlert } from "../../helpers";
import {
	switchDownloadMenu,
	switchDownloadingStraight,
	switchDownloadingTapered,
} from "../../store/items";
import { downloadImage } from "../helpers";
import { startAddDownload } from "../../store/user/thunks/startAddDownload";
import { FiArrowRight, FiDownload } from "react-icons/fi";

interface Props {
	id: string;
	batch: string;
	isDownloadingStraight: boolean;
	isDownloadingTapered: boolean;
	fileNames: string[];
	buyLink: string;
}

export const DownloaderMenu = ({
	id,
	batch,
	isDownloadingStraight,
	isDownloadingTapered,
	fileNames,
	buyLink,
}: Props) => {
	const handleOpenDownloadMenu = (): void => {
		dispatch(switchDownloadMenu(id));
	};

	const { uid, emailVerified } = useTypedSelector((state) => state.auth);
	const dispatch = useTypedDispatch();

	const onDownloadImage = async (file: string, imageType: string) => {
		if (!uid) {
			dispatch(switchDownloadMenu(id));
			dispatch(switchRegisterModal());

			return;
		}

		if (!emailVerified) {
			const alert: SweetAlertOptions = {
				title: "Please verify your email first",
				text: "We'll use your email to notify you when we publish new free images.",
				icon: "warning",
			};

			dispatch(switchDownloadMenu(id));
			messageAlert(alert);

			return;
		}

		if (imageType === "straight") dispatch(switchDownloadingStraight(id));
		if (imageType === "tapered") dispatch(switchDownloadingTapered(id));

		const isDownloaded = await downloadImage({ batch: `B${batch}`, file });
		if (isDownloaded) dispatch(startAddDownload(id));

		if (imageType === "straight") dispatch(switchDownloadingStraight(id));
		if (imageType === "tapered") dispatch(switchDownloadingTapered(id));

		dispatch(switchDownloadMenu(id));
	};

	const downloaderMenuRef = useRef<HTMLDivElement>(null);
	useOutsideAlerter({ ref: downloaderMenuRef, action: handleOpenDownloadMenu });

	return (
		<div ref={downloaderMenuRef} className="downloaderMenu animate__animated animate__fadeInDown">
			<div
				className="downloaderMenu__item"
				onClick={() => onDownloadImage(fileNames[0], "straight")}
			>
				<span>Download straight image</span>

				<div className="downloaderMenu__iconSection">
					{isDownloadingStraight ? <div className="downloaderMenu__spinner"></div> : <FiDownload />}
				</div>
			</div>

			<div
				className="downloaderMenu__item"
				onClick={() => onDownloadImage(fileNames[1], "tapered")}
			>
				<span>Download tapered image</span>

				<div className="downloaderMenu__iconSection">
					{isDownloadingTapered ? <div className="downloaderMenu__spinner"></div> : <FiDownload />}
				</div>
			</div>

			<a
				className="downloaderMenu__item"
				href={buyLink}
				target="_blank"
				onClick={handleOpenDownloadMenu}
			>
				<span>Buy on Etsy</span>

				<div className="downloaderMenu__iconSection">
					<FiArrowRight />
				</div>
			</a>
		</div>
	);
};
