import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators, NgForm, FormControl, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import countriesList from '../../assets/countries.json'

interface Country {
  name: string,
  code: string
}

@Component({
  selector: 'app-guest-details',
  templateUrl: './guest-details.component.html',
  styleUrls: ['./guest-details.component.scss']
})
export class GuestDetailsComponent {
  countries: Country[] = countriesList;
  matcher = new MyErrorStateMatcher();
  minDate: Date = new Date();
  maxDate: Date = new Date();
  @ViewChild('guestDetailsFormDirective') guestDetailsFormDirective! : NgForm

  guestDetails = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    country: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    dateOfBirth: ['', [Validators.required]],
    passportDetails: this.formBuilder.group({
      passportNumber: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      foreName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      surName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      dateOfIssue: ['', Validators.required],
      dateOfExpiry: ['', Validators.required]
    })
  })

  get firstName() {
    return this.guestDetails.get('firstName');
  }

  get lastName() {
    return this.guestDetails.get('lastName');
  }

  get city() {
    return this.guestDetails.get('city');
  }

  get country() {
    return this.guestDetails.get('country');
  }

  get email() {
    return this.guestDetails.get('email');
  }

  get dateOfBirth() {
    return this.guestDetails.get('dateOfBirth');
  }

  constructor(private formBuilder: FormBuilder) {}
  
  onSubmit() {
    console.log(this.guestDetails.value);
  }
}


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}