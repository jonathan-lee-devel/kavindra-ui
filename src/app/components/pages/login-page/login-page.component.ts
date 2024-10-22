import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthenticationStore } from '../../../+state/auth/user-auth.store';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { rebaseRoutePath, RoutePath } from '../../../app.routes';
import { RouterUtils } from '../../../util/router/Router.utils';
import { MessageService } from 'primeng/api';

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
  private readonly messageService = inject(MessageService);

  doGoogleLogin() {
    this.userAuthenticationStore.attemptSupabaseLoginWithGoogle();
  }

  doGithubLogin() {
    this.userAuthenticationStore.attemptSupabaseLoginWithGitHub();
  }

  async doEmailLogin() {
    const error =
      await this.userAuthenticationStore.attemptSupabaseLoginWithEmail(
        this.email,
        this.password,
      );
    if (!error) {
      this.router
        .navigate([rebaseRoutePath(RoutePath.LOGIN_SUCCESS)])
        .catch(RouterUtils.navigateCatchErrorCallback);
      return;
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Login Error',
      detail: 'Error during login',
      life: 3_000,
    });
  }
}
