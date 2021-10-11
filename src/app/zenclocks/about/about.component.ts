import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
    selector: "app-zc-about",
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
    slideBarState : "none" | "collapse" | "expand" = "expand";

    @ViewChild("slideBar") slideBar! : ElementRef;
    
    ngOnInit() : void {
        // this.slideBar?.nativeElement?.addEventListener("animationstart", this.onAnimationStart, false);
        // this.slideBar?.nativeElement?.addEventListener("animationend", this.onAnimationEnd, false);
    }

    hideToggleButton() : string {
        if(this.slideBarState === "collapse") {
            return "hide-toggle-button";
        }
        return "none";
    }

    toggleSlideBar() : void {
        if(this.slideBarState === "collapse") {
            this.slideBarState = "expand";
        } else {
            this.slideBarState = "collapse";
        }
    }
}