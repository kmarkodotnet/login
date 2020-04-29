import { LoginFramework } from './login-framework';

export class SessionInfo{
    constructor(user_id:string,
        id_token:string,
        access_token:string,
        email:string,
        name:string,
        expire:number,
        framework:LoginFramework) {
        this.user_id = user_id;
        this.id_token = id_token;
        this.access_token = access_token;
        this.email = email;
        this.name = name;
        this.expire = expire;
        this.framework = framework;
    }
    user_id:string;
    id_token:string;
    access_token:string;
    email:string;
    name:string;
    expire:number;
    framework:LoginFramework;
}
