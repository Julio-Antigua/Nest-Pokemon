import { join } from 'path'; // en Node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { envConfiguration } from './config/env.config';
import { JoinValidationSchema } from './config/joi.validation';

@Module({
  imports: [

    ConfigModule.forRoot({
      load: [ envConfiguration ], //aqui cargamso nuestra constante envConfiguration para que pueda ser referencias a nuestras varibales de entorno
      validationSchema: JoinValidationSchema //aqui definimos nuestra constante de validacion para que pueda validar nuestras varibales de entorno
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public')
    }),

    MongooseModule.forRoot(process.env.MONGODB),

    PokemonModule,

    CommonModule,

    SeedModule
  ],
})
export class AppModule {}
