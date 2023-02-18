import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  guestDetails = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    country: ['', [Validators.required]],
    passportDetails: this.formBuilder.group({
      passportNumber: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      foreName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      surName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      dateOfIssue: ['', Validators.required],
      dateOfExpiry: ['', Validators.required]
    })
  })

  constructor(private formBuilder: FormBuilder) {
    console.log(countriesList);
    // console.log(this.countries);
    
   }
  
  onSubmit() {
    console.log(this.guestDetails.value);
  }
}
