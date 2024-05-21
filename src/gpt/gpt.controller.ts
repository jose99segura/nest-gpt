import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDicusserDto } from './dtos';
import { log } from 'console';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  ortographyCheck( 
    @Body() orthographyDto: OrthographyDto
  ) {
    return this.gptService.ortographyCheck(orthographyDto);
  }

  @Post('pros-cons-discusser')
  ProsConsDiscusser(
    @Body() prosConsDicusserDto: ProsConsDicusserDto
  ) {
    return this.gptService.prosConsDicusser(prosConsDicusserDto);
  }

  @Post('pros-cons-discusser-stream')
  async ProsConsDiscusserStream(
    @Body() prosConsDicusserDto: ProsConsDicusserDto,
    @Res() res: Response
  ) {
    const stream = await this.gptService.prosConsDicusserStream(prosConsDicusserDto);

    // Se envia la respuesta en formato stream, se envia el objeto completo
    res.setHeader('Content-Type', 'application/json');
    res.sendStatus( HttpStatus.OK );

    // Se recorre el stream y se envia la respuesta al cliente en formato stream
    for await( const chunk of stream ) {
      const piece = chunk.choices[0].delta.content || '';
      res.write(piece);
    }

    // Se cierra la respuesta
    res.end();

  }

}
