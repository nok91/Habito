import { EventsMap, EventsMapper, Extensions, Target } from './types';
/**
 * Create Redux middleware that synchronizes actions to analytics events.
 */
declare function createMiddleware(eventsMap: EventsMap | EventsMapper, target: Target, extensions?: Extensions): (store: any) => (next: any) => (action: any) => any;
export default createMiddleware;
