import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserAuthenticationStore } from '../../../+state/auth/user-auth.store';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, FormsModule, ButtonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  email: string = '';
  password: string = '';

  doRegisterWithEmail() {
    this.userAuthenticationStore.attemptSupabaseSignUpWithEmail(
      this.email,
      this.password,
    );
  }

  doRegisterWithGoogle() {
    this.userAuthenticationStore.attemptSupabaseLoginWithGoogle();
  }

  doRegisterWithGithub() {
    this.userAuthenticationStore.attemptSupabaseLoginWithGitHub();
  }
}
