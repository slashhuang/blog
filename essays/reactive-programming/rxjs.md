Observable.create(subscriber)
=> new Observable(subscriber)
=> return {
    _subscribe,
    lift = function (operator)
    subscribe
    _trySubscribe
    forEach
    _subscribe
}


Obs.prototype.subscribe(subscriber) ==> subscriber



subscriber  = {
    syncErrorValue: any;
    syncErrorThrown: boolean;
    syncErrorThrowable: boolean;
    protected isStopped: boolean;
    protected destination: PartialObserver<any>;
}

subscriber extends subscription



someOperator ==> {
    source = this,
    operator,
}