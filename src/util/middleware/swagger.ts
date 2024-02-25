import { DocumentBuilder } from "@nestjs/swagger";

export const swagger = new DocumentBuilder()
    .setTitle('Api')
    .addSecurity('bearer',{
        type: 'http',
        scheme:'bearer'
    })
    .setDescription('description')
    .setVersion('1.0')
    .addTag('Red')
    .build();