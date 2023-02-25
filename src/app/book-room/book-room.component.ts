import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface GuestSelection {
  adultsCount: number;
  childrenCount: number;
}

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.scss'],
})
export class BookRoomComponent {
  buttonClicked: boolean = false;
  extrasClicked: boolean = false;
  bookedGuests: GuestSelection = { adultsCount: 1, childrenCount: 0 };

  bookingDetails = this.formBuilder.group({
    guest: ['adult'],
    count: ['1'],
    description: [null, Validators.required],
    price: [null, Validators.required],
    duration: [''],
    bookingPer: ['booking']
  });

  get guest() {
    return this.bookingDetails.get('guest');
  }

  get count() {
    return this.bookingDetails.get('count')!.value;
  }

  get description() {
    return this.bookingDetails.get('description');
  }

  get price() {
    return this.bookingDetails.get('price');
  }

  get bookingPer() {
    return this.bookingDetails.get('bookingPer');
  }
  constructor(private formBuilder: FormBuilder) { }
  
  toggleDropdowns() {
    this.buttonClicked = true;
  }

  enableExtras() {
    this.extrasClicked = true;
  }

  addGuest() {
    if (this.guest!.value === 'adult') {
      this.bookedGuests.adultsCount +=  +this.count!;
    } else {
      this.bookedGuests.childrenCount += +this.count!;
    }
  }

  removeAdult() {
    this.bookedGuests.adultsCount--;
  }
  removeChild() {
    this.bookedGuests.childrenCount--;
  }
}
