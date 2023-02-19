import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  NgForm,
  FormControl,
  FormGroupDirective,
  FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import countriesList from '../../assets/countries.json';
interface Country {
  name: string;
  code: string;
}

@Component({
  selector: 'app-guest-details',
  templateUrl: './guest-details.component.html',
  styleUrls: ['./guest-details.component.scss'],
})
export class GuestDetailsComponent {
  countries: Country[] = countriesList;
  matcher = new MyErrorStateMatcher();
  minDate: Date;
  maxDate: Date;
  @ViewChild('guestDetailsFormDirective') guestDetailsFormDirective!: NgForm;

  guestDetails = this.formBuilder.group({
    firstName: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    city: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    country: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    dateOfBirth: ['', [Validators.required]],
    passportDetails: this.formBuilder.group({
      passportNumber: [
        null,
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
      foreName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      surName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      dateOfIssue: ['', Validators.required],
      dateOfExpiry: ['', Validators.required],
    }),
  });

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

  get passportDetails() {
    return this.guestDetails.get('passportDetails') as FormGroup;
  }

  get passportNumber() {
    return this.passportDetails.get('passportNumber');
  }

  get foreName() {
    return this.passportDetails.get('foreName');
  }

  get surName() {
    return this.passportDetails.get('surName');
  }

  get dateOfIssue() {
    return this.passportDetails.get('dateOfIssue');
  }

  get dateOfExpiry() {
    return this.passportDetails.get('dateOfExpiry');
  }

  constructor(private formBuilder: FormBuilder) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);
  }

  onSubmit() {
    console.log(this.guestDetails.value);
    console.log(
      this.guestDetails.get('passportDetails')?.get('passportNumber')?.errors
    );
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
