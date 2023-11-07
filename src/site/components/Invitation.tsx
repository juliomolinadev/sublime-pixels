import { useTypedDispatch } from "../../hooks";
import { switchRegisterModal } from "../../store/ui";

export const Invitation = () => {
	const dispatch = useTypedDispatch();

	const onClickInvitation = (): void => {
		dispatch(switchRegisterModal());
	};

	return (
		<div className="invitation" onClick={onClickInvitation}>
			<span>Sign up to get free images.</span>
			<span>No credit card needed!</span>
		</div>
	);
};
