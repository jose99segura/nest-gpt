import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';

@Injectable()
export class GptService {


    // Solo va a llamar casos de uso

    async ortographyCheck(orthographyDto: OrthographyDto) {
        return await orthographyCheckUseCase({
            prompt: orthographyDto.prompt
        });
    }


}
