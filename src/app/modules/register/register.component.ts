import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guest } from 'src/app/core/models/guest.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    'username': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
  })
  msg: string = ''

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router
  ) {

    if (this.authService.getUserAuth()) { 
     this.router.navigate(['/']);
    }

  }

  ngOnInit(): void {
  }

  register(): void {

    if (this.form.invalid) {
      this.form.get('username')?.markAsTouched()
      return;
    }
    let username: string = this.form.value.username

    const user: User = new User(username)

    this.getUsername(user.username).then(response => {
      if (response.length) {
        this.msg = 'Este usuario já existe.'
        return
      }

      this.authService.guestSession().subscribe((guest: Guest) => {
        user.guest = guest
        this.authService.register(user).subscribe((response: any) => {
          console.log('res', response);

          this.router.navigate(['/']);
        })
      })

    })

  }

  getUsername(username: string) {
    return this.userService.getUsername(username)
  }
}
