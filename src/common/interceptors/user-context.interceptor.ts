import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { UserContext } from "../utils/user-context";

@Injectable()
export class UserContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    // Passport thường gán user vào request.user sau khi AuthGuard chạy xong
    // Chúng ta lấy ID từ object user này.
    const user = request.user;
    const userId = user?.id || user?.sub;

    if (userId) {
      UserContext.setUser(userId);
    }

    return next.handle();
  }
}
