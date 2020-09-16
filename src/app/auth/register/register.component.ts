import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/_services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    public auth: AuthService,
    private fb: FormBuilder
  ) {}
  registerForm: FormGroup;
  loading = false;
  isLoggedIn$: Observable<boolean>;
  errors: any = [];

  private unsubscribe: Subject<any> = new Subject();

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }
  register() {
    const authData = { ...this.registerForm.value };
    this.loading = true;
    this.auth
      .login(authData)
      .pipe(
        tap((resp) => {
          if (resp) {
            this.router.navigateByUrl('/auth/login');
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
