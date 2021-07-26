import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginInvalid: boolean = false;
  returnUrl: string;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.auth
      .login(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      )
      .then(() => {
        this.router.navigateByUrl(this.returnUrl);
      })
      .catch((err) => {
        this.errorMessage = err.message == 'not_admin' ? 'This user is not admin' : 'Bad username/password';
        this.errorMessage = this.errorMessage.trim();
        this.loginInvalid = true;
        this.loginForm.reset();
      });
  }
}
