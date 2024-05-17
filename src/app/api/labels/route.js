import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Label from "../../../../models/label";

//A small DB for the labels. In the future it can potentially be used to generate custom labels
export async function GET(request) {
  await connectMongoDB();

  const labels = await Label.find();
  return NextResponse.json({ labels }, { status: 200 });
}

export async function POST(request) {
  await connectMongoDB();
  let newLabel = await request.json();

  console.log(newLabel);

  const createdLabel = await Label.create(newLabel);
  return NextResponse.json({ createdLabel }, { status: 200 });
}
