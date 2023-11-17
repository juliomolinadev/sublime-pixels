import { logEvent, EventParams } from "firebase/analytics";
import { FirebaseAnalyttcs } from "../firebaseConfig";

interface Params {
	eventName: string;
	eventParams?: EventParams;
}

export const logAnalyticsEvent = ({ eventName, eventParams }: Params): void => {
	if (!FirebaseAnalyttcs) return;

	logEvent(FirebaseAnalyttcs, eventName, eventParams);
};
