import { Component, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faHeart = faHeart
  user: any
  constructor(
    private authService: AuthService
  ) {
    this.authService.user.subscribe(user => this.user = user)
  }

  ngOnInit(): void {
  }

}
