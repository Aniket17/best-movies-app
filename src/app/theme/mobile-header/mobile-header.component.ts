import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
})
export class MobileHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Output() mobileMenuChange = new EventEmitter();
  menuToggler: boolean;
  toggleMobileMenu() {
    this.menuToggler = !this.menuToggler;
    this.mobileMenuChange.emit(this.menuToggler);
  }
}
