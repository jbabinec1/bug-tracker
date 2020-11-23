import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from "rxjs";
import {Router} from "@angular/router";
import { empty, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './../authentication.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    [x: string]: any;
    

constructor (private router: Router, private authService: AuthenticationService) {}

intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {



    const accessToken = this.authService.getAccessToken();
        req = req.clone({
            setHeaders: {
                Authorization: `JWT ${accessToken}` 
            }
        });
        return next.handle(req);

  


}


}