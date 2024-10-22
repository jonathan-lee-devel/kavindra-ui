import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserAuthenticationStore } from '../../../+state/auth/user-auth.store';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ButtonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);

  doGoogleLogin() {
    this.userAuthenticationStore.attemptSupabaseLoginWithGoogle();
  }

  doGithubLogin() {
    this.userAuthenticationStore.attemptSupabaseLoginWithGitHub();
  }
}
