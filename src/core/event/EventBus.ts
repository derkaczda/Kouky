namespace Kouky {
    export class EventBus {

        private static _handlers: {[eventCode: string]: EventHandler[]} = {}
        private static _eventList: Event[] = []

        private constructor() { }

        public static addHandler(eventType: Event, handler: EventHandler): void {
            if(EventBus._handlers[eventType.name] === undefined) {
                EventBus._handlers[eventType.name] = [];
            }
            if(EventBus._handlers[eventType.name].indexOf(handler) !== -1) {
                Logger.warning(`EventBus: Attempting to add duplicate event handler for event ${eventType.name}`);
            }
            else {
                EventBus._handlers[eventType.name].push(handler);
            }
        }

        public static update(time: Timestamp): void {
            if(EventBus._eventList.length === 0)
                return;

            for(let e of EventBus._eventList) {
                if(EventBus._handlers[e.name] === undefined) {
                    continue;
                }
                for(let handler of EventBus._handlers[e.name]) {
                    let handled = handler.onEvent(e);
                    if(handled) {
                        break;
                    }
                }
            }

            EventBus._eventList.length = 0;
        }

        public static addEvent(event: Event) {
            EventBus._eventList.push(event);
        }
    }
}