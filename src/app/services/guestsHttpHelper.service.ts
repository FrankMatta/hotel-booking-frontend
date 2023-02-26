import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GuestDetails } from "../models/guest.model";
import { environment } from "src/environments/environment.development";
@Injectable({providedIn: 'root'})
export class GuestsHttpHelper {
    apiUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient){}

    saveGuestDetails(guestDetails: GuestDetails) {
        const endpoint = this.apiUrl + 'guest'
        return this.httpClient.post<{ message: string, guestId: number}>(endpoint, guestDetails)
    }
}