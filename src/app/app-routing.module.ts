import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookRoomComponent } from './book-room/book-room.component';
import { GuestDetailsComponent } from './guest-details/guest-details.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { HasBookingId } from './services/guards/hasBookingId.guard';
import { HasGuestIdGuard } from './services/guards/hasGuestId.guard';

const routes: Routes = [
  { path: '', redirectTo: 'guest', pathMatch: 'full' },
  { path: 'guest', component: GuestDetailsComponent },
  { path: 'room', component: BookRoomComponent, canActivate: [HasGuestIdGuard] },
  { path: 'invoice', component: InvoiceComponent, canActivate:[HasBookingId] },
  { path: '**', component: GuestDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
