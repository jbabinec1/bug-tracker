import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from "rxjs";
import {Router} from "@angular/router";
import { empty, of } from "rxjs";
import { catchError } from 'rxjs/operators';


@Injectable()
export class LoginInterceptor implements HttpInterceptor {
    [x: string]: any;
    

constructor (private router: Router) {}

intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    return next.handle(req)

    .pipe(
    catchError(error => {
        if (error instanceof HttpErrorResponse && error.status == 401  ) {
           this.router.navigateByUrl('/login', {replaceUrl: true})
           localStorage.setItem('status', 'incorrect');
            return of(error as any) //empty(); 
            
        }
        else
            return throwError(error);
    }));



}


}