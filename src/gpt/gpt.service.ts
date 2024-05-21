import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDiscusserStreamUseCase } from './use-cases';
import { OrthographyDto, ProsConsDicusserDto } from './dtos';
import OpenAI from 'openai';
import { prosConsDiscusserUseCase } from './use-cases/pros-cons-discusser.use-case';

@Injectable()
export class GptService {

    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });


    // Solo va a llamar casos de uso

    // Caso de uso para verificar ortografía
    async ortographyCheck(orthographyDto: OrthographyDto) {
        return await orthographyCheckUseCase( this.openai, {
            prompt: orthographyDto.prompt
        });
    }

    // Caso de uso para discutir pros y contras
    async prosConsDicusser( { prompt }: ProsConsDicusserDto ) {
        return await prosConsDiscusserUseCase( this.openai, { prompt });
    }

    // Caso de uso para discutir pros y contras Stream
    async prosConsDicusserStream( { prompt }: ProsConsDicusserDto ) {
        return await prosConsDiscusserStreamUseCase( this.openai, { prompt });
    }


}

