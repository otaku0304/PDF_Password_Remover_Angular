import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-remove-password',
  templateUrl: './remove-password.component.html',
  styleUrls: ['./remove-password.component.scss'],
})
export class RemovePasswordComponent {
  @Output() unlockSuccess = new EventEmitter<string>();
  password: string = '';
  error: string = '';
  isHidePassword = true;

  unlockPDF() {
    if (this.password === 'your_actual_password') {
      this.unlockSuccess.emit(this.password);
    } else {
      this.error = 'Invalid password. Please try again.';
    }
  }

  toggleShowPassword() {
    this.isHidePassword = !this.isHidePassword;
  }
}
