import { Component, EventEmitter, OnInit } from "@angular/core";

@Component({
    selector: 'app-zenclock',
    templateUrl: './zenclocks.component.html',
    styleUrls: ['./zenclocks.component.scss']
})
export class ZenclocksComponent implements OnInit {
    isPopupOpened = true;
    greyScreen = "grey-screen";

    constructor() {}
    
    ngOnInit() : void {}

    onPopupOpen() : void {
        this.isPopupOpened = !this.isPopupOpened;
    }

    onClose(event: EventEmitter<null>) : void {
        this.isPopupOpened = false;
    }
}