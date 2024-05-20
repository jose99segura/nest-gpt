import OpenAI from "openai";


interface Options {
    prompt: string;
}


export const orthographyCheckUseCase = async( openai: OpenAI, options: Options ) => {

    const { prompt } = options;

    // Codigo de OpenAI
    const completion = await openai.chat.completions.create({
        messages: [
            { 
                role: "system", 
                content: `
                    Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
                    debes responder en formato JSON,
                    tu tarea es corregirlos y retornar información soluciones,
                    también debes de dar un porcentaje de acierto por el usuario,

                    Si no hay errores, debes de retornar un mensaje de felicitaciones.

                    Ejemplo de salida:
                    {
                        userScore: number,
                        errors: string[], // ['error -> solución']
                        message: string // Usa emojis y texto para dar feedback
                    }
                ` 
            },
            { 
                role: "user", 
                content: prompt 
            }
        ],
        model: "gpt-4o",
        max_tokens: 150,
        temperature: 0.3,
        response_format: { type: "json_object" }
    });
    
    const jsonResp = JSON.parse(completion.choices[0].message.content);

    return jsonResp;

}