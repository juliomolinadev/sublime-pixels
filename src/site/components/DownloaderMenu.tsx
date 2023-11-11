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

interface Props {
	id: string;
	batch: string;
	isDownloadingStraight: boolean;
	isDownloadingTapered: boolean;
	fileNames: string[];
}

export const DownloaderMenu = ({
	id,
	batch,
	isDownloadingStraight,
	isDownloadingTapered,
	fileNames,
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
				<span>Straight image</span>

				<div className="downloaderMenu__spinnerSection">
					{isDownloadingStraight && <div className="downloaderMenu__spinner"></div>}
				</div>
			</div>

			<div
				className="downloaderMenu__item"
				onClick={() => onDownloadImage(fileNames[1], "tapered")}
			>
				<span>Tapered image</span>

				<div className="downloaderMenu__spinnerSection">
					{isDownloadingTapered && <div className="downloaderMenu__spinner"></div>}
				</div>
			</div>
		</div>
	);
};
