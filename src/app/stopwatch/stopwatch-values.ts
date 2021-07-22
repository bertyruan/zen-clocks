export enum TimerEvent {
    PAUSE,
    START,
    RESTART,
    NEWTIME
}
interface _TimeValues {
    minutes: number, 
    seconds: number
    toSeconds : () => number
}

export class TimeValues implements _TimeValues {
    minutes: number;
    seconds: number;
    isValid = false;

    constructor(minutes: number, seconds: number) {
        this.minutes = +minutes;
        this.seconds = +seconds;
        this.isValid = true;
    }
    
    toSeconds() : number {
        return this.minutes *60 + this.seconds;
    }
}