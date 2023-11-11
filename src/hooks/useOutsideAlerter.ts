import { RefObject, useEffect } from "react";

interface Params {
	ref: RefObject<HTMLElement>;
	action: () => void;
}

export const useOutsideAlerter = ({ ref, action }: Params) => {
	useEffect(() => {
		const handleClickOutside = ({ target }: MouseEvent) => {
			if (ref.current && !ref.current.contains(target as Node | null)) {
				action();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, action]);
};
