import { EventsMap, EventsMapper, Extensions, Target } from './types';
/**
 * Create a meta reducer that synchronizes actions to analytics events.
 */
declare function createMetaReducer(eventsMap: EventsMap | EventsMapper, target: Target, extensions?: Extensions): (reducer: any) => (prevState: any, action: any) => any;
export default createMetaReducer;
