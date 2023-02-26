import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookRoomComponent } from './book-room/book-room.component';
import { GuestDetailsComponent } from './guest-details/guest-details.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  { path: '', redirectTo: 'guest', pathMatch: 'full' },
  { path: 'guest', component: GuestDetailsComponent },
  { path: 'room', component: BookRoomComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: '**', component: GuestDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
