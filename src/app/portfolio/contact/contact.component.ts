import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: "portfolio-contact",
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.scss"]
})
export class ContactComponent {
    contactForm = this.fb.group({
        firstName: [null, Validators.required],
        email: [null, Validators.email],
        subject: [null, Validators.required],
        messageBody: [null, Validators.required]
      });
      
    constructor(private fb: FormBuilder) {}

    onSubmit(): void {
      alert('Thanks!');
    }
}