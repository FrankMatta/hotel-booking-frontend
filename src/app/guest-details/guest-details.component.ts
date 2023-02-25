import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { GuestDetails } from '../models/guest.model';
import { GuestsHttpHelper } from '../services/guestsHttpHelper.service';
import { UIService } from '../services/UI.service';
interface Country {
  name: string;
  code: string;
}

@Component({
  selector: 'app-guest-details',
  templateUrl: './guest-details.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./guest-details.component.scss'],
})
export class GuestDetailsComponent {
  loading = false;
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
    dateOfBirth: [null, [Validators.required]],
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

  constructor(
    private formBuilder: FormBuilder,
    private guestsHttpHelper: GuestsHttpHelper,
    private ui: UIService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);
  }

  onSubmit() {
    this.loading = true;

    const guestDetails: GuestDetails = {
      firstName: this.firstName!.value ?? '',
      lastName: this.lastName!.value ?? '',
      email: this.email!.value ?? '',
      country: this.country!.value ?? '',
      city: this.city!.value ?? '',
      dateOfBirth: this.dateOfBirth!.value ?? new Date(),
      passportDetails: {
        foreName: this.foreName!.value ?? '',
        surName: this.surName!.value ?? '',
        passportNumber: this.passportNumber!.value ?? '',
        dateOfIssue: this.dateOfIssue!.value ?? new Date(),
        dateOfExpiry: this.dateOfExpiry!.value ?? new Date(),
      }
    };
    setTimeout(() => {
      this.loading = false;
    }, 3000)
    // this.guestsHttpHelper
    //   .saveGuestDetails(guestDetails)
    //   .subscribe({
    //     next: (v) => this.ui.openSnackbar('Guest added successully! Redirecting...'),
    //     error: (e) => this.ui.openSnackbar("Something went wrong, try again later"),
    //     complete: () => console.info('complete') 
    // })
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
