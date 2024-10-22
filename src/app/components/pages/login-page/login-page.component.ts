import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserAuthenticationStore } from '../../../+state/auth/user-auth.store';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly userAuthenticationStore = inject(UserAuthenticationStore);

  doGoogleLogin() {
    this.userAuthenticationStore.attemptSupabaseLoginWithGoogle();
  }
}
