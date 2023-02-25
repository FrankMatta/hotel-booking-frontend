export enum BookingPer {
    PERSON="person",
    BOOKING="booking"
  }
  export interface BookingDetails {
    guest_id?: string;
    description: string;
    price: number;
    bookStartDate: Date;
    bookEndDate: Date;
    bookingPer: BookingPer;
    adultsCount: number;
    childrenCount: number;
  }
  
  