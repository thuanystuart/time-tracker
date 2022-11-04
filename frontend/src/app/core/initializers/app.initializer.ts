import { AuthService } from "@services/auth.service";
import { Observable } from "rxjs";

export function initializeAppFactory(authService: AuthService): () => Observable<void> {
  return () => authService.checkLogin()
 }
