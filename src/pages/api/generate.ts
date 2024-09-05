// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GenerateContentCandidate, GoogleGenerativeAI } from "@google/generative-ai";

type IBody = {
    prompt: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method === 'POST') {
        const { prompt } = req.body as IBody;
        if (!prompt) {
            return res.status(400).json({ ok: false, message: 'Missing body' });
        }

        try {
            if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
                const genAi = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
                const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });
                const result = await model.generateContent(prompt);
                const output = (
                    result.response.candidates as GenerateContentCandidate[]
                )[0].content.parts[0].text;

                if (output) {
                    return res.status(200).json({ ok: true, message: output });
                } else {
                    return res.status(400).json({ ok: false, message: 'No output generated' });
                }
            } else {
                return res.status(500).json({ ok: false, message: "Something went wrong contact the manufacturer!" });
            }
        } catch (e) {
            console.error(e);
            return res.status(400).json({ ok: false, message: "Error during generation" });
        }
    } else {
        return res.status(405).json({ ok: false, message: "Method not allowed" });
    }
}
