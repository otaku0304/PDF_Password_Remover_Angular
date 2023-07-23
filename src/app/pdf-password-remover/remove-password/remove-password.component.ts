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
    // Here, you need to add the logic to unlock the PDF using the entered password.
    // You can use external libraries or tools to achieve this.
    // For simplicity, we will assume that the password is correct and unlock the PDF.
    // Replace the condition below with your actual password unlocking logic.

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
