import { EventDefinition } from './types';
declare const createEvents: (eventDefs: EventDefinition<any, {
    [key: string]: any;
}, any>[], prevState: any, action: any, nextState: any) => any[];
export default createEvents;
