import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BookingDetails, InvoiceDetails } from "../models/booking.model";
import { environment } from "src/environments/environment.development";
import { Observable } from "rxjs";
@Injectable({providedIn: 'root'})
export class BookingHttpHelper {
    apiUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient){}

    createBooking(bookingDetails: BookingDetails) {
        bookingDetails.guest_id = '15';
        const endpoint = this.apiUrl + 'booking'
        return this.httpClient.post(endpoint, bookingDetails)
    }

    getBookingById(){
        const bookingId = '4';
        const endpoint = this.apiUrl + 'booking'
        let params = new HttpParams();
        params = params.append('bookingId', bookingId);
        
        return this.httpClient.get<InvoiceDetails>(endpoint, {params})
    }
}