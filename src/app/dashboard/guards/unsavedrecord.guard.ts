import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentLeave {
  canLeave: () => boolean | Promise<boolean>
}

@Injectable({
  providedIn: 'root'
})
export class UnsavedrecordGuard implements CanDeactivate<CanComponentLeave> {
  canDeactivate(component: CanComponentLeave) {
    if (component.canLeave()) {
      return component.canLeave()
    }
    return false;
  }
  
}
