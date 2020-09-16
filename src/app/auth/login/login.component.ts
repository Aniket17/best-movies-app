import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/_services/auth.service';
import { environment } from 'src/environments/environment';
const DEMO_PARAMS = {
  USERNAME: 'admin@lms.com',
  PASSWORD: 'Admin@123',
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    public auth: AuthService,
    private fb: FormBuilder
  ) {}
  loginForm: FormGroup;
  loading = false;
  isLoggedIn$: Observable<boolean>;
  errors: any = [];

  private unsubscribe: Subject<any> = new Subject();
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control('admin', [Validators.required]),
      password: this.fb.control('Admin@123', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }
  login() {
    const authData = { ...this.loginForm.value };
    this.loading = true;
    this.auth
      .login(authData)
      .pipe(
        tap((resp) => {
          if (resp && resp.token) {
            localStorage.setItem(environment.authTokenKey, resp.token);
            this.router.navigateByUrl('/movies');
          } else {
            //some error
          }
        }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }
}
