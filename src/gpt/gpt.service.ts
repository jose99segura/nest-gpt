import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OrthographyDto, ProsConsDiscusserDto, TesxtToAudioDto, TranslateDto } from './dtos';
import { orthographyCheckUseCase, prosConsDiscusserUseCase, prosConsDiscusserStreamUseCase, translateUseCase, textToAudioUseCase } from './use-cases';


@Injectable()
export class GptService {

    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });


    // Solo va a llamar casos de uso

    // Caso de uso para verificar ortografía
    async orthographyCheck(orthographyDto: OrthographyDto) {
        return await orthographyCheckUseCase( this.openai, {
            prompt: orthographyDto.prompt
        });
    }

    // Caso de uso para discutir pros y contras
    async prosConsDicusser( { prompt }: ProsConsDiscusserDto ) {
        return await prosConsDiscusserUseCase( this.openai, { prompt });
    }

    // Caso de uso para discutir pros y contras Stream
    async prosConsDicusserStream( { prompt }: ProsConsDiscusserDto ) {
        return await prosConsDiscusserStreamUseCase( this.openai, { prompt });
    }

    async translate( { prompt, lang }: TranslateDto ) {
        return await translateUseCase( this.openai, { prompt, lang });
    }

    async textToAudio( { prompt, voice }: TesxtToAudioDto ) {
        return await textToAudioUseCase( this.openai, { prompt, voice });
    }


}

