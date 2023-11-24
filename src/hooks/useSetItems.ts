import { useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "./storeHooks";
import { startSetBatchesArray } from "../store/batches/thunks/starSetBatchesArray";
import { startAddBatch } from "../store/batches/thunks/startAddBatch";
import { startSetItems } from "../store/items";

export const useSetItems = () => {
	const dispatch = useTypedDispatch();
	const { status } = useTypedSelector((state) => state.auth);
	const { userRole } = useTypedSelector((state) => state.user);
	const { activeBatch, batches } = useTypedSelector((state) => state.batches);

	useEffect(() => {
		status !== "checking" && dispatch(startSetBatchesArray());
	}, [dispatch, status, userRole]);

	useEffect(() => {
		activeBatch !== undefined &&
			!batches[activeBatch] &&
			activeBatch !== "" &&
			dispatch(startAddBatch(activeBatch));
	}, [dispatch, activeBatch, batches]);

	useEffect(() => {
		activeBatch !== undefined && activeBatch !== "" && dispatch(startSetItems(activeBatch));
	}, [dispatch, activeBatch]);
};
