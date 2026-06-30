import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  DataSource,
} from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserContext } from "../utils/user-context";

@Injectable()
@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface {
  constructor(private readonly dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  /**
   * Chạy trước khi insert một record mới
   */
  beforeInsert(event: InsertEvent<any>) {
    const userId = UserContext.getUserId();
    if (!userId) return;

    // Tự động gán createdBy nếu entity có field này
    if (event.entity && "createdBy" in event.entity && !event.entity.createdBy) {
      event.entity.createdBy = userId;
    }

    // Tự động gán updatedBy nếu entity có field này
    if (event.entity && "updatedBy" in event.entity && !event.entity.updatedBy) {
      event.entity.updatedBy = userId;
    }
  }

  /**
   * Chạy trước khi update một record
   */
  beforeUpdate(event: UpdateEvent<any>) {
    const userId = UserContext.getUserId();
    if (!userId) return;

    // Tự động gán updatedBy nếu entity có field này
    if (event.entity && "updatedBy" in event.entity) {
      event.entity.updatedBy = userId;
    }
  }
}
