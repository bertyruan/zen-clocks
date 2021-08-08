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
    clone : () => _TimeValue
}

export interface Timer {
    id: number,
    value: TimeValue,
    order: number
}

export interface Routine {
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
        let m = this.minutes < 10 ? "0" + this.minutes.toString() : this.minutes.toString();
        let s = this.seconds < 10 ? "0" + this.seconds.toString() : this.seconds.toString();
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