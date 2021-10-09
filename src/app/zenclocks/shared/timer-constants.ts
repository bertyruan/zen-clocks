export enum TimerEvent {
    PAUSE,
    START,
    RESTART,
    NEWTIME
}

export enum TimerEditState {
    MAINTAIN,
    _MAINTAIN,
    EXIT,
    NULL
}

interface _TimeValue {
    minutes: number, 
    seconds: number
    toSeconds : () => number
    toString : () => string
    clone : () => _TimeValue
}

export interface Timer {
    id: number,
    value: TimeValue,
    isLast: boolean
}

export interface TimerSet {
    name: string,
    timers: TimeValue[];
}

export class TimeValue implements _TimeValue  {
    minutes: number;
    seconds: number;
    isValid = false;

    constructor(minutes = 0, seconds = 2) {
        this.minutes = +minutes;
        this.seconds = +seconds;
        this.isValid = true;
    }
    
    toSeconds() : number {
        return this.minutes *60 + this.seconds;
    }

    toString() : string {
        return TimeValue.toString(this.minutes, this.seconds);
    }

    static toString(minutes: number, seconds: number) : string {
        let m = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
        let s = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
        return `${m}:${s}`;
    }

    clone() : TimeValue {
        return new TimeValue(this.minutes, this.seconds);
    }

    subtract(value: number) {
        let minutes = this.minutes;
        let seconds = this.seconds;
        if(value > this.seconds && this.minutes > 0){
            minutes = this.minutes - 1;
            seconds = 60 + this.seconds - value;
        }
        else {
            seconds = this.seconds - value;
        }
        return new TimeValue(minutes, seconds);
    } 
}