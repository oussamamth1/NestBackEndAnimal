import { IsNotEmpty } from "class-validator";
import { Task } from "../task-entity";
export class createTaskDto extends Task {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
