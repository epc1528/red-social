import { INestApplication } from '@nestjs/common';
import { bodyParser, bodyUrlEncoded, corss, swagger} from '../middleware';
import { SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { swaggerCredential } from './enviroment';

export default (app:INestApplication): void => {
  app.use(corss);
  app.use(bodyParser);
  app.use(bodyUrlEncoded);
  app.use('/api', basicAuth({
    challenge: true,
    users: {[swaggerCredential.user]:swaggerCredential.secret}
  }))
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api', app, document);
};