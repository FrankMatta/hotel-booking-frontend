export enum BookingPer {
    PERSON="person",
    BOOKING="booking"
  }
  export interface BookingDetails {
    guestId: number;
    description: string;
    price: number;
    bookStartDate: Date;
    bookEndDate: Date;
    bookingPer: BookingPer;
    adultsCount: number;
    childrenCount: number;
  }
  
  export interface InvoiceDetails {
    adultsCount: number;
    appliedDiscount: number;
    bookEndDate: Date;
    bookStartDate: Date;
    bookingId: number;
    bookingPer: BookingPer,
    childrenCount: number;
    createdAt: Date;
    description: string;
    email: string;
    firstName: string;
    lastName: string;
    price: number;
  }