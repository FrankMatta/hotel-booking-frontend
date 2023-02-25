import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BookingDetails } from "../models/booking.model";
import { environment } from "src/environments/environment.development";
@Injectable({providedIn: 'root'})
export class BookingHttpHelper {
    apiUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient){}

    createBooking(bookingDetails: BookingDetails) {
        bookingDetails.guest_id = '15';
        const endpoint = this.apiUrl + 'booking'
        return this.httpClient.post(endpoint, bookingDetails)
    }
}