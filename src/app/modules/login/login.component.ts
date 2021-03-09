import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    'username': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(120)])
  })
  msg: string = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    //redireciona pra home se já tiver logado
    if (this.authService.getUserAuth()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.form.invalid) {
      this.form.get('username')?.markAsTouched()
      return;
    }
    this.authService.login(this.form.value.username).subscribe((user: User) => {
      if (user.id) {
        this.router.navigate(['/']);
      }
      this.msg = 'Usuário não encontrado ou inativo'
      console.log('login', user);

    })
  }
}
