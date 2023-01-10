import { BadRequestException } from '@nestjs/common';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces';
import { Pipe } from 'stream';
import { taskstutus } from '../task-status-enum';

export class TaskStatusValidation implements PipeTransform {
  readonly allowStatus = [
    taskstutus.DONE,
    taskstutus.IN_PROGRES,
    taskstutus.OPEN,
  ];
  transform(value: any) {
    // console.log(value, metadata);
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(
        ` this "${value}" not type of status, the status must be one of those DONE or In_PROGRES or open`,
      );
    }
    return value;
  }
  private isStatusValid(status: any) {
    const indS = this.allowStatus.indexOf(status);

    return indS !== -1;
  }
}
