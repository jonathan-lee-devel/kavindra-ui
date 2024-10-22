import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthenticationStore } from '../../../+state/auth/user-auth.store';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { rebaseRoutePath, RoutePath } from '../../../app.routes';
import { RouterUtils } from '../../../util/router/Router.utils';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ButtonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);

  private readonly router = inject(Router);

  doGoogleLogin() {
    this.userAuthenticationStore.attemptSupabaseLoginWithGoogle();
  }

  doGithubLogin() {
    this.userAuthenticationStore.attemptSupabaseLoginWithGitHub();
  }

  async doEmailLogin() {
    await this.userAuthenticationStore.attemptSupabaseLoginWithEmail(
      this.email,
      this.password,
    );
    this.router
      .navigate([rebaseRoutePath(RoutePath.LOGIN_SUCCESS)])
      .catch(RouterUtils.navigateCatchErrorCallback);
  }
}
