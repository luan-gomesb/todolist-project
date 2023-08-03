
type CallbackFn =    (item:any)=>void};

type ObserverCallback =  {
    event:string;
    callback:CallbackFn;
}

export default function addCallback(fn: any) {
    const observers: ObserverCallback[] = [];

    const register = (event:string,callback:CallbackFn) => {
        observers.push({event,callback});
    }

    const triggerEvent = (tEvent:string, item:any) => {
        observers.filter(({event}) => tEvent == event)
                .forEach(({callback}) => callback(item));
    }

    return function (...args: any[]) {
        let response = fn(...args);
    }

}
