import { updateDocInFirestore } from "../../../firebase/firestoreCRUD";
import { AppDispatch } from "../../store";
import { incrementBuyLinkCounter } from "../../items";
import { logAnalyticsEvent } from "../../../firebase/analytics/logAnalyticsEvent";

export const startIncreaseBuyLinkCounter = (itemId: string) => {
	return async (dispatch: AppDispatch) => {
		// log analytics event
		const event = {
			eventName: "select_content",
			eventParams: {
				content_type: "buy_button",
				item_id: itemId,
			},
		};

		logAnalyticsEvent(event);

		// increment buy link counter in item
		const incrementQuery = {
			collectionPath: "items",
			docId: itemId,
			updates: {},
			incrementUpdate: { fieldName: "buyLinkCounter", amount: 1 },
		};

		const wasIncremented = await updateDocInFirestore(incrementQuery);

		if (wasIncremented) {
			dispatch(incrementBuyLinkCounter(itemId));
		}

		return wasIncremented;
	};
};
