import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {
  staticDir = "portfolio"

  works = [
    {
      title: "Zen Clocks",
      description: `
        The user can create multiple timers. 
        When one ends, the other starts. Sessions can be saved and restored. 
        Built on HTML, CSS, Angular and RxJS.
        `,
      route: "./zen-clocks"
    },
    {
      title: "Meet App | Landing Page",
      description: `
        A landing page for the Meet App - design provided by Frontend Metor. 
        Built mobile first and incorporates accessibility best practices. 
        Screen elements adjust for desktop, tablet and mobile phone screen sizes.
        The languages used are HTML5 and CSS3.  
      `,
      route: `./${this.staticDir}/fem-meetup/index.html`
    }
  ]
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { isVisible: true, work: this.works[0], cols: 3, rows: 1 },
          { isVisible: true, work: this.works[1], cols: 3, rows: 1 }
        ];
      }
      return [
        { isVisible: true, work: this.works[0], cols: 1, rows: 1 },
        { isVisible: true, work: this.works[1], cols: 1, rows: 1 }
  
      ];
    })
  );

 

  constructor(private breakpointObserver: BreakpointObserver, private route: Router) {}

  navigateTo(route: string) : void {
    this.route.navigate([]).then(result => { window.open(route, '_blank')})
  }
}
