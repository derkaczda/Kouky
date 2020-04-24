namespace Kouky {
    type EventCallback = (sender: any, n: EventArguments) => boolean;

    class EventHandler {
        public eventType: string;
        public callback: EventCallback;
        public constructor(eventType: string, callback: EventCallback) {
            this.eventType = eventType;
            this.callback = callback;
        }
    }

    export class EventSystem {
        private static _handlerId: number = -1;
        private static _handlers: EventHandler[] = [];
        private static _events: Event[] = []

        private constructor() {}

        public static addListener(type: string, callback: EventCallback): number {
            EventSystem._handlerId++;
            EventSystem._handlers.push(new EventHandler(type, callback));
            return EventSystem._handlerId;
        }

        public static removeListener(id: number): void {
            EventSystem._handlers.splice(id, 1);
        }

        public static dispatch(event: Event, immediate: boolean = false) {
            if(immediate) {
                EventSystem.fire(event);
            } else {
                EventSystem._events.push(event)
            }
        }

        private static fire(event: Event): void {
            for(let handler of EventSystem._handlers) {
                if(handler.eventType === event.type) {
                    let handled = handler.callback(event.sender, event.arguments);
                    if(handled) {
                        return;
                    }
                }
            }
        }

        public static update(time: Timestamp): void {
            if(EventSystem._events.length === 0)
                return;

            for(let event of EventSystem._events) {
                EventSystem.fire(event);
            }

            EventSystem._events.length = 0;
        }
    }
}