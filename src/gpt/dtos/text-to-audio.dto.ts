

import { IsOptional, IsString } from "class-validator";



export class TesxtToAudioDto {

    @IsString()
    readonly prompt: string;

    @IsString()
    @IsOptional()
    readonly voice?: string;

}