import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { User } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class UserRepo extends Repo<User> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(User, dataSource);
  }
}
