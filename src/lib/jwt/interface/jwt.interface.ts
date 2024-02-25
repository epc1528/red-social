export interface IJwtAccess {
    email:string;
    password:string;
}

export interface IJwtValidator {
    access:string;
    refresh:string;
    email?:string;
    password?:string;
}