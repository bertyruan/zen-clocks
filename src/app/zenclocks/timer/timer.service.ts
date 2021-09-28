import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, interval, NEVER, Observable } from "rxjs";
import { map, tap, switchMap, mapTo, scan, startWith, takeWhile, filter } from "rxjs/internal/operators";
import { TimerEvent, TimeValue } from "../timer-constants";

@Injectable({providedIn: "root"})
export class TimerService {
    private audioFile = "assets/audio/mbs.mp3";
    private clock!: Observable<number>;
    public timeEvents$ = new BehaviorSubject<TimerEvent>(TimerEvent.PAUSE);
    //public timeEvents$ = this.timeEvents.asObservable();
    
    public timeValues$ = new BehaviorSubject<TimeValue>({} as TimeValue);
    //public timeValues$ = this.timeValues.asObservable();

    public onNextAudio = (() => {
        const audio = new Audio(this.audioFile);
        function play(a : HTMLAudioElement) {
            a.currentTime = audio.currentTime = 0;
            a.play();
        }
        return (isEnd = false) => {
            if(isEnd) {
                const audio2 = new Audio(this.audioFile);
                play(audio);
                interval(1000).pipe(scan((itr: number)=> {return itr+1},-1)).subscribe(itr => {
                    switch (itr) {
                        case 3:
                            audio.pause();
                                break;
                        case 2:
                            play(audio2);
                            break;
                        case 6:
                            audio2.pause();
                            break;
                        case 5:
                            play(audio);
                            break;    
                        default:
                            break;
                    }
                });
            } else {
                play(audio);
            }
        }
    })();

    public getClock(minutes: number, seconds: number) : Observable<number> {
        if(!this.clock) {
            this.clock = this.initClock(minutes, seconds);
            this.timeEvents$.next(TimerEvent.PAUSE);
            this.timeValues$.next(new TimeValue(minutes, seconds));
        }
        return this.clock;
    }

    private initClock(minutes: number, seconds: number) : Observable<number> {
        return combineLatest([this.timeEvents$, this.timeValues$]).pipe(
            filter(arr => arr[1].isValid),
            map(arr => {
                return [arr[0], arr[1].toSeconds()] 
            }),
            switchMap(arr => {
                let t = arr[0];
                if(t === TimerEvent.PAUSE) return NEVER;
                return interval(1000).pipe(mapTo([TimerEvent.START, arr[1]]), startWith(arr));
            }),
            scan((timeLeft : number, arr)=> {
                if(arr[0] === TimerEvent.NEWTIME) return arr[1] + 1;
                if(arr[0] === TimerEvent.RESTART) return arr[1] + 1;
                return timeLeft - 1;
            }, +minutes * 60 + +seconds + 1),
            takeWhile((timeLeft) => timeLeft >= 0)
        )
    }
}