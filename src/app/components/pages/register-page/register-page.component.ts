import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserAuthenticationStore } from '../../../+state/auth/user-auth.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
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
}
