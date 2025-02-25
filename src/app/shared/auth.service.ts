import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  showMessage(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  loginUser(email: string, password: string): Observable<any> {
    const loginUserUrl = `${this.apiUrl}/auth/login`;
    const body = { email, password };

    return this.http
      .post<any>(loginUserUrl, body, { withCredentials: true })
      .pipe(
        tap((response) => {
          this.showMessage(response.message);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage =
      'Ocorreu um erro desconhecido. Por favor tente mais tarde';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else if (error.status === 400 && error.error.message) {
      if (Array.isArray(error.error.message)) {
        errorMessage = error.error.message.join(', ');
      } else {
        errorMessage = error.error.message;
      }
    } else {
      errorMessage = errorMessage = `Erro ${error.status}: ${
        error.error.message || 'Erro desconhecido'
      }`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
