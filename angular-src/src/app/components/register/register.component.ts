import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { validateConfig, Route } from '@angular/router/src/config';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validatservice: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Required fields
    if (!this.validatservice.validateRegister(user)) {
      this.flashMessagesService.show('Please fill in all fields!', { cssClass: 'alert-danger text-center', timeout: 3000 });
      return false;
    }

    // Validate email
    if (!this.validatservice.validateEmail(user.email)) {
      this.flashMessagesService.show('Please use valid email!', { cssClass: 'alert-danger text-center', timeout: 3000 });
      return false;
    }

    // Reginster user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessagesService.show('User registered, please log in.', { cssClass: 'alert-success text-center', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Something went wrong. :(', { cssClass: 'alert-danger text-center', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });
  }
}
