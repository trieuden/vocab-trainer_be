import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { StudentGroup } from "@/entities";
import { Repo } from "./base.repo";

@Injectable()
export class StudentGroupRepo extends Repo<StudentGroup> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(StudentGroup, dataSource);
  }
}
