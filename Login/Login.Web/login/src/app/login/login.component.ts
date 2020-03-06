import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../common/forms.css']
})
export class LoginComponent implements OnInit {

    form:FormGroup;

    constructor(private fb:FormBuilder, private authService: AuthService, private router: Router) {

        this.form = this.fb.group({
            email: ['',Validators.required],
            password: ['',Validators.required]
        });

    }

    ngOnInit() {

    }


    login() {

        const val = this.form.value;

        if(val.email && val.password){
            this.authService.login(val.email, val.password)
                .subscribe(
                    u => 
                    {
                        console.log("User created successfully " + (u as User).email);
                        this.authService.isLoggedIn$.subscribe(c => console.log(c))
                        this.authService.isLoggedOut$.subscribe(c => console.log(c))
                        this.authService.user$.subscribe(c => console.log(c))

                        this.router.navigateByUrl("/");
                    },
                    console.error
                )
        }


    }

}
