/** 
 * @link https://gist.github.com/rgrove/b619077c7a67016f89bb
 */
export class EventEmitter {
    private readonly _eventEmitter = { targets: [], events: {} };
    public _guidCount: number;

    constructor() {};

    /**
     * Adds the given EventEmitter instance as a bubble target of this EventEmitter.
     * When an event is emitted by this EventEmitter, it will first execute its own
     * listeners (if any), and will then re-emit the event on the bubble target.
     */
    public addTarget = (target: unknown) => {
        if (this !== target) {
            this._initEventEmitter();
    
            this._eventEmitter.targets.push(target);
        };
    
        return this;
    };

    public emit = function(type) {
        let emitterData = this._eventEmitter;

        if (!emitterData) return this;

        let handles     = [],
            targets     = [this],
            targetsSeen = {},
    
            currentTarget,
            targetEmitterData,
            targetHandles;
    
        for (let i = 0; i < targets.length; ++i) {
            currentTarget     = targets[i];
            targetEmitterData = currentTarget._eventEmitter;
    
            if (targetEmitterData && !targetsSeen[targetEmitterData.id]) {
                targetHandles = targetEmitterData.events[type];
    
                if (targetHandles) {
                    handles.push.apply(handles, targetHandles);
                }
    
                if (targetEmitterData.targets.length) {
                    targets.push.apply(targets, targetEmitterData.targets);
                }
    
                targetsSeen[targetEmitterData.id] = true;
            }
        }

        if (!handles.length) return this;
        
        let argCount = arguments.length;
        let args = new Array(argCount);
    
        for (let i = 1; i < argCount; ++i) {
            args[i - 1] = arguments[i];
        }
    
        let handleCount = handles.length;
        let handle;
    
        for (let i = 0; i < handleCount; ++i) {
            handle = handles[i];
    
            args[argCount - 1] = {
                currentTarget: handle.currentTarget,
                handle       : handle,
                target       : this,
                type         : handle.type
            };
    
            handle.listener.apply(handle.thisObj, args);
        }
    
        return this;
    };

    public on = (type, listener, thisObj) => {
        this._initEventEmitter();

        var events = this._eventEmitter.events,
            handle;
    
        handle = {
            currentTarget: this,
            listener     : listener,
            thisObj      : thisObj || this,
            type         : type
        };
    
        events[type] || (events[type] = []);
        events[type].push(handle);
    
        return handle;
    };

    protected _initEventEmitter = () => {
        if (this._eventEmitter) return;
        
        // @ts-ignore
        EventEmitter._guidCount || (EventEmitter._guidCount = 0);
    
        Object.defineProperty(this, '_eventEmitter', {
            value: {
                events : {},
                // @ts-ignore
                id     : '' + (EventEmitter._guidCount += 1) + Math.random(),
                targets: []
            }
        });
    }
};
