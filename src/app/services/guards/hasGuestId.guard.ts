import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { GlobalVariablesService } from "../globalVariables.service";

@Injectable({
    providedIn: 'root'
  })
export class HasGuestIdGuard implements CanActivate {
    constructor(private globals: GlobalVariablesService, private router: Router){};
    canActivate(
      next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (this.globals.guestId) {
            return true;
        } else {
            this.router.navigate(['/guest'])
            return false;
        }
    }
  }