import { useTypedDispatch } from "../../hooks";
import { switchRegisterModal } from "../../store/ui";

export const Invitation = () => {
	const dispatch = useTypedDispatch();

	const onClickInvitation = (): void => {
		dispatch(switchRegisterModal());
	};

	return (
		<div className="invitation" onClick={onClickInvitation}>
			<button className="invitation__button">Sign up</button>
			<span> to get free images.</span>
			<span>No credit card needed!</span>
		</div>
	);
};
