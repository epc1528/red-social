import { ForbiddenException, Injectable } from '@nestjs/common';
import { ExceptionsService } from 'src/config/exception/exception.service';

@Injectable()
export class GuardsService {
  constructor(
      private readonly exceptions: ExceptionsService,
  ) {};
};