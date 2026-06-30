import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity, User } from "@/entities";

@Entity("student_groups")
export class StudentGroup extends BaseEntity {
  @Column("uuid")
  studentId: string;

  @ManyToOne(() => User, (u) => u.studentGroupsAsStudent, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "studentId" })
  student: User;

  @Column("uuid")
  teacherId: string;

  @ManyToOne(() => User, (u) => u.studentGroupsAsTeacher, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "teacherId" })
  teacher: User;

  @Column({ type: "varchar", length: 255 })
  name: string;
}
