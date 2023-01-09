import { taskstutus } from "../task-status-enum";
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetTaskFilterDTo {
    @IsOptional()
      @IsIn([taskstutus.DONE,taskstutus.IN_PROGRES,taskstutus.OPEN])
  status: taskstutus;
    @IsOptional()
      @IsNotEmpty()
  search: string;
}