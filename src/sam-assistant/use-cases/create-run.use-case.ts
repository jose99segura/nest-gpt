import OpenAI from "openai";



interface Options {
    threadId: string;
    assistantId?: string;
}


export const createRunUseCase = async (openai: OpenAI, options: Options ) => {

    const { threadId, assistantId = 'asst_V71JNN0Am4qRRKqSAl2EkSUe' } = options;

    const run = await openai.beta.threads.runs.create( threadId, {
        assistant_id: assistantId,
        // instructions: 'Run the assistant' // OJO! Sobreescribe el asistente
    });

    console.log(run);
    return run; 

}