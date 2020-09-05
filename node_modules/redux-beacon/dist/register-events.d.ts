import { Extensions, Target } from './types';
declare function registerEvents(events: any[], target: Target, extensions?: Extensions, prevState?: {}, action?: {}, nextState?: {}): Promise<void>;
export default registerEvents;
