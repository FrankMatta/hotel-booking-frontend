import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingDetails, BookingPer } from '../models/booking.model';
import { BookingHttpHelper } from '../services/bookingHttpHelper.service';
import { GlobalVariablesService } from '../services/globalVariables.service';
import { UIService } from '../services/UI.service';

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
  showForm: boolean = false;
  extrasClicked: boolean = false;
  bookedGuests: GuestSelection = { adultsCount: 1, childrenCount: 0 };
  date = new Date();
  minDate = new Date().toISOString().slice(0, 10);
  maxDate = new Date(this.date.getFullYear(), 12, 31);

  bookingDetails = this.formBuilder.group({
    guest: ['adult'],
    count: ['1'],
    description: [null, Validators.required],
    price: [
      null,
      [Validators.required, Validators.min(0), Validators.max(999999)],
    ],
    bookStartDate: [null, Validators.required],
    bookEndDate: [null, Validators.required],
    bookingPer: ['booking', Validators.required],
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

  get bookStartDate() {
    return this.bookingDetails.get('bookStartDate');
  }

  get bookEndDate() {
    return this.bookingDetails.get('bookEndDate');
  }

  constructor(
    private formBuilder: FormBuilder,
    private bookingHttpHelper: BookingHttpHelper,
    private ui: UIService,
    private globals: GlobalVariablesService,
    private router: Router
  ) {}

  enableExtras() {
    this.extrasClicked = true;
  }

  addGuest() {
    if (this.guest!.value === 'adult') {
      this.bookedGuests.adultsCount += +this.count!;
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

  onSubmit() {
    const bookingPer =
      this.bookingPer!.value === 'person'
        ? BookingPer.PERSON
        : BookingPer.BOOKING;

    const bookingDetails: BookingDetails = {
      guestId: this.globals.guestId,
      description: this.description!.value ?? '',
      price: this.price!.value ?? 0,
      bookStartDate: this.bookStartDate!.value ?? new Date(),
      bookEndDate: this.bookEndDate!.value ?? new Date(),
      bookingPer,
      adultsCount: this.bookedGuests.adultsCount,
      childrenCount: this.bookedGuests.childrenCount,
    };

    this.bookingHttpHelper.createBooking(bookingDetails).subscribe({
      next: (v) => {
        this.bookingDetails.disable();
        this.globals.bookingId = v.bookingId;
        this.ui.openSnackbar('Booking created successully! Redirecting...','Close', 2);
        this.router.navigate(['/invoice'])
      },
      error: (e) =>
        this.ui.openSnackbar('Something went wrong, try again later'),
      complete: () => console.info('complete'),
    });
  }
}
