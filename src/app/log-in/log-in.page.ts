import {Component} from '@angular/core';
import {SignUpPage} from '../sign-up/sign-up.page';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.page.html',
    styleUrls: ['./log-in.page.scss'],
})
export class LogInPage {

    username: string;
    password: string;
    private SignUp: SignUpPage;

    constructor() {
    }

    login() {
        console.log('username' + this.username);
        console.log('password' + this.password);

    }
}



