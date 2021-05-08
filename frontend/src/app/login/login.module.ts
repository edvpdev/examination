import { SharedModule } from "@shared/shared.module";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login-routing.module";
import * as fromComponents from "./components";
import { AuthService } from "@core/services/auth.service";
import { StoreModule } from "@ngrx/store";
import * as fromLogin from "./reducers";

@NgModule({
  declarations: [fromComponents.components],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    StoreModule.forFeature(
      fromLogin.loginFeatureKey,
      fromLogin.loginSuccessfullReducer
    ),
  ],
})
export class LoginModule {
  static forRoot(): ModuleWithProviders<LoginModule> {
    return {
      ngModule: LoginModule,
      providers: [AuthService],
    };
  }
}
