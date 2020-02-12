import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../common/forms.css']
})
export class SignupComponent implements OnInit {

    form:FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

        this.form = this.fb.group({
            email: ['',Validators.required],
            password: ['',Validators.required],
            confirm: ['',Validators.required]
        });


    }

    ngOnInit() {

    }


    signUp() {
        const val = this.form.value;

        if(val.email && val.password && val.password === val.confirm){
            this.authService.signup(val.email, val.password)
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
