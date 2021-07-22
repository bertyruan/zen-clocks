export enum TimerEvent {
    PAUSE,
    START,
    RESTART,
    NEWTIME
}
interface _TimeValue {
    minutes: number, 
    seconds: number
    toSeconds : () => number
    toString : () => string
}

export interface Timer {
    id: number,
    value: TimeValue
    state: TimerEvent
}

export class TimeValue implements _TimeValue {
    minutes: number;
    seconds: number;
    isValid = false;

    constructor(minutes = 1, seconds = 0) {
        this.minutes = +minutes;
        this.seconds = +seconds;
        this.isValid = true;
    }
    
    toSeconds() : number {
        return this.minutes *60 + this.seconds;
    }

    toString() : string {
        let m = this.minutes < 10 ? "0" + this.minutes.toString() : this.minutes.toString();
        let s = this.seconds < 10 ? "0" + this.seconds.toString() : this.seconds.toString();
        return `${m}:${s}`;
    }
}