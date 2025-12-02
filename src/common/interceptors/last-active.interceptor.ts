import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '@/services/user/users.service'; // Import service của bạn

@Injectable()
export class LastActiveInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user) {
      const currentTime = new Date().getTime();
      const lastActiveTime = user.lastActiveAt ? new Date(user.lastActiveAt).getTime() : 0;
      
      // 5 phút = 300,000 ms
      const TIME_THRESHOLD = 5 * 60 * 1000;

      // Logic: Nếu chưa có lastActive hoặc đã qua 5 phút thì mới update
      if (currentTime - lastActiveTime > TIME_THRESHOLD) {
        
        // Kỹ thuật Fire-and-Forget: 
        // Gọi update nhưng KHÔNG await để không làm user phải chờ
        this.userService.updateLastActiveAt(user.id).catch(err => {
            console.error('Update last active failed', err);
        });

        user.lastActiveAt = new Date();
      }
    }

    return next.handle();
  }
}