import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({providedIn: 'root'})
export class UIService {
    constructor(private _snackBar: MatSnackBar) {}

    openSnackbar(message = 'Success!', action = 'Close', dismissAfter = 0) {
        this._snackBar.open(message, action);
        
        if (dismissAfter > 0) {
            dismissAfter *= 1000;
            setTimeout(() => {
                this._snackBar.dismiss()
            }, dismissAfter)            
        }
    }
}