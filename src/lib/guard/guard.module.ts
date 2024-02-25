import { Global, Module } from '@nestjs/common';
import { ExceptionsModule } from 'src/config/exception/exception.module';
// import { AxiosModule } from '../axios/axios.module';
import { GuardsService } from './guard.service';

@Global()
@Module({
//   imports: [ExceptionsModule, AxiosModule],
  providers: [GuardsService],
  exports: [GuardsService],
})
export class GuardsModule {};