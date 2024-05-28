import * as path from "path";
import * as fs from "fs";
import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAI from 'openai';
import { AudioToTextDto, ImageGenerationDto, ImageVariationDto, OrthographyDto, ProsConsDiscusserDto, TesxtToAudioDto, TranslateDto } from './dtos';
import { orthographyCheckUseCase, prosConsDiscusserUseCase, prosConsDiscusserStreamUseCase, translateUseCase, textToAudioUseCase, audioToTextUseCase, imageGenerationUseCase, imageVariationUseCase, imageToTextUseCase } from './use-cases';



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

    async textToAudioGetter( fileId: string ) {
        const filePath = path.resolve(__dirname, '../../generated/audios/', `${fileId}.mp3`);
        const wasFound = fs.existsSync(filePath);
        if( !wasFound ) new NotFoundException('Audio not found');

        return filePath;
    }

    async audioToText( audioFile: Express.Multer.File, audioToTextDto: AudioToTextDto ) {
        const { prompt } = audioToTextDto;
        return await audioToTextUseCase( this.openai, { prompt, audioFile });
    }

    async imageGeneration( imageGenerationDto: ImageGenerationDto ) {
        return await imageGenerationUseCase( this.openai, { ...imageGenerationDto });
    }

    getGeneratedImage( fileName: string ) {
        const filePath = path.resolve('./','./generated/images/', fileName);
        const exists = fs.existsSync( filePath );
        if( !exists ) new NotFoundException('Image not found');

        return filePath;
    }

    async geneateImageVariation( { baseImage }: ImageVariationDto ) {
        return imageVariationUseCase( this.openai, { baseImage } );
    }

    async imageToText(imageFile: Express.Multer.File, prompt: string) {
        return await imageToTextUseCase(this.openai, { imageFile, prompt });
    }


}

