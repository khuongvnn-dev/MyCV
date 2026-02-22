import { chatWGemini } from "@/services/Gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message, instruction } = await req.json();
        const reply = await chatWGemini(message, instruction);
        return NextResponse.json({ reply });
    } catch (error) {
        return NextResponse.json({ error: "Lỗi kết nối AI" }, { status: 500 });
    }
}