import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Task from "../../../../models/task";

// Geting the list of all Todos
export async function GET(request) {
  await connectMongoDB();

  const tasks = await Task.find();
  return NextResponse.json({ tasks }, { status: 200 });
}

export async function POST(request) {
  await connectMongoDB();
  let newTask = await request.json();
  newTask = {
    ...newTask,
    completed: false,
    completedDate: null,
  };
  console.log(newTask);

  const createdTask = await Task.create(newTask);
  return NextResponse.json({ createdTask }, { status: 200 });
}

//emergency delete
export async function DELETE(request) {
  const theMagicWord = request.nextUrl.searchParams.get("theMagicWord");
  console.log(theMagicWord);
  await connectMongoDB();

  if (theMagicWord === "ERASE") {
    const response = await Task.deleteMany();
    return NextResponse.json({ response }, { status: 200 });
  }

  return NextResponse.json(
    { message: "Nope, wrong magic word :)" },
    { status: 401 }
  );
}
