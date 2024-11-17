import { NextResponse } from 'next/server';
const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, 
});

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body)
  if (!body.messages || !Array.isArray(body.messages)) {
    return NextResponse.json(
      { error: 'Invalid request. Please provide an array of messages.' },
      { status: 400 }
    );
  }
  
  try {
    console.log("Original messages: ", body.messages);
    const instructions = `Please answer to the query given. Some useful information for you can be that I am writing you from ${body.messages[0].city} where the Air Quality Index is ${body.messages[0].aqi} and temperature is ${body.messages[0].temperature}.`
    const modifiedMessages = body.messages.map((msg: any) => {
        if (msg.role === 'user') {
          return {
            role: msg.role, 
            content: `${instructions}: ${msg.content}`, 
          };
        }
        return {
          role: msg.role,  
          content: msg.content,
        };
      });

    console.log("Modified messages: ", modifiedMessages);

    const chatCompletion = await groq.chat.completions.create({
      messages: modifiedMessages,
      model: 'llama3-8b-8192',
      temperature: body.temperature || 1,
      max_tokens: body.max_tokens || 1024,
      top_p: body.top_p || 1,
      stream: false, 
      stop: body.stop || null,
    });

    return NextResponse.json(chatCompletion);
  } catch (error) {
    console.error('Error interacting with GROQ API:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
