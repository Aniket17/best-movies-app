// Angular
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { BehaviorSubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface BreadcrumbTitle {
  title: string;
  parent?: string;
}

@Injectable({ providedIn: 'root' })
export class SubheaderService {
  title$: BehaviorSubject<BreadcrumbTitle> = new BehaviorSubject<
    BreadcrumbTitle
  >({ title: '', parent: '' });

  constructor() {}

  setTitle(title: string, parent: string) {
    this.title$.next({ title, parent });
  }
}
