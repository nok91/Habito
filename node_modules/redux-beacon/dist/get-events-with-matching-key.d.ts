import { EventDefinition, EventsMap } from './types';
declare function getEventsWithMatchingKey(eventsMap: EventsMap, actionType: string): EventDefinition[];
export default getEventsWithMatchingKey;
