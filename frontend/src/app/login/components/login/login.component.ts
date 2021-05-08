import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "@core/services/auth.service";
import { Router } from "@angular/router";
import { AppState } from "app/reducers";
import { Store } from "@ngrx/store";
import { loginFailed, loginSuccessful } from "app/login/login.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = fb.group({
      email: ["admin@example.com", [Validators.required]],
      password: ["admin", [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login() {
    const val = this.form.value;

    this.auth.login(val.email, val.password).subscribe(
      (reply: any) => {
        if (reply.authJwtToken && reply.user) {
          this.store.dispatch(loginSuccessful(reply));
          localStorage.setItem("authJwtToken", reply.authJwtToken);
          localStorage.setItem("user", JSON.stringify(reply.user));
          // this.auth.setIsAuthenticated(true);
          // this.auth.setUser(reply.user);
          this.router.navigateByUrl("/exams");
        } else {
          this.store.dispatch(loginFailed());
          alert("Login failed.");
        }
      },
      (err) => {
        console.log("Login failed:", err);
        this.store.dispatch(loginFailed());
        alert("Login failed.");
      }
    );
  }
}
