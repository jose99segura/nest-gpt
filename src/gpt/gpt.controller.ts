import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDiscusserDto, TesxtToAudioDto, TranslateDto } from './dtos';
import { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  ortographyCheck( 
    @Body() orthographyDto: OrthographyDto
  ) {
    return this.gptService.orthographyCheck(orthographyDto);
  }

  @Post('pros-cons-discusser')
  prosConsDiscusser(
    @Body() prosConsDicusserDto: ProsConsDiscusserDto
  ) {
    return this.gptService.prosConsDicusser(prosConsDicusserDto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDiscusserStream(
    @Body() prosConsDicusserDto: ProsConsDiscusserDto,
    @Res() res: Response
  ) {

    const stream = await this.gptService.prosConsDicusserStream(prosConsDicusserDto);

    // Se envia la respuesta en formato stream, se envia el objeto completo
    res.setHeader('Content-Type', 'application/json');
    res.status( HttpStatus.OK );

    // Se recorre el stream y se envia la respuesta al cliente en formato stream
    for await( const chunk of stream ) {
      const piece = chunk.choices[0].delta.content || '';
      res.write(piece);
    }

    // Se cierra la respuesta
    res.end();

  }

  @Post('translate')
  translate(
    @Body() translateDto: TranslateDto
  ) {
    return this.gptService.translate(translateDto);
  }

  @Post('text-to-audio')
  textToAudio(
    @Body() textToAudioDto: TesxtToAudioDto
  ) {
    return this.gptService.textToAudio(textToAudioDto);
  }

}
