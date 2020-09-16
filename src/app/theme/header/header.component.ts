import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  expandMobileMenu: boolean;

  onMobileMenuChange(val) {
    this.expandMobileMenu = val;
  }
  logout() {
    localStorage.removeItem(environment.authTokenKey);
    this.router.navigateByUrl('/auth/login');
  }
}
