import { usePagination } from "../../hooks/usePagination";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { setActiveBatch } from "../../store/batches";

export const PaginationControls = () => {
	const { activeBatch, batchesArray } = useTypedSelector((state) => state.batches);
	const dispatch = useTypedDispatch();

	const onSelectBatch = (batch: string) => {
		dispatch(setActiveBatch(batch));
	};

	const { onMoveEnd, onMoveOne, onMoveStart, visibleBatches } = usePagination(batchesArray);

	return (
		<div className="pagination">
			{batchesArray.length > 5 && (
				<>
					<div className="pagination__button" onClick={onMoveStart}>
						<FiChevronsLeft />
					</div>

					<div className="pagination__button" onClick={() => onMoveOne(-1)}>
						<FiChevronLeft />
					</div>
				</>
			)}

			{visibleBatches.map((batch) => (
				<button
					key={batch}
					onClick={() => onSelectBatch(batch)}
					className={batch === activeBatch ? "pagination__activeBatch" : "pagination__batch"}
				>
					{batch}
				</button>
			))}

			{batchesArray.length > 5 && (
				<>
					<div className="pagination__button" onClick={() => onMoveOne(1)}>
						<FiChevronRight />
					</div>

					<div className="pagination__button" onClick={onMoveEnd}>
						<FiChevronsRight />
					</div>
				</>
			)}
		</div>
	);
};
