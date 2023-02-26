import { Component, OnInit } from '@angular/core';
import { InvoiceDetails } from '../models/booking.model';
import { BookingHttpHelper } from '../services/bookingHttpHelper.service';
import { GlobalVariablesService } from '../services/globalVariables.service';
import { UIService } from '../services/UI.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  invoiceDetails!: InvoiceDetails;
  loading = true;
  failed = false;
  invoiceTotal!: number;
  constructor(private httpHelper: BookingHttpHelper, private ui: UIService, private globals: GlobalVariablesService) {}

  ngOnInit(): void {
    const bookingId = this.globals.bookingId || 8;
    this.httpHelper.getBookingById(bookingId).subscribe({
      next: (v) => {
        this.invoiceDetails = v;
        this.loading = false;
        this.invoiceTotal = this.invoiceDetails.price;

        if (this.invoiceDetails.bookingPer === 'person') {
          this.invoiceTotal = this.invoiceDetails.adultsCount * this.invoiceDetails.price;
          this.invoiceTotal += this.invoiceDetails.childrenCount > 0 ? this.invoiceDetails.childrenCount * this.invoiceDetails.price : 0; 
        }
        const discount = this.invoiceDetails.appliedDiscount;

        if (discount > 0) {
          this.invoiceTotal = Math.round(this.invoiceTotal  / (discount/100 + 1))
        }
        window.print();
      },
      error: (e) => {
        this.ui.openSnackbar('Something went wrong, try again later');
        this.failed = true;
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
