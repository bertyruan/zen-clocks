import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: "portfolio-contact",
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.scss"]
})
export class ContactComponent {
    addressForm = this.fb.group({
        company: null,
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        address: [null, Validators.required],
        address2: null,
        city: [null, Validators.required],
        state: [null, Validators.required],
        postalCode: [null, Validators.compose([
          Validators.required, Validators.minLength(5), Validators.maxLength(5)])
        ],
        shipping: ['free', Validators.required]
      });

      
    constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    alert('Thanks!');
  }

  hasUnitNumber = true;
}