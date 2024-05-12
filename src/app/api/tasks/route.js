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

  const newTask = {
    name: "New uaaaaaaaaaaaaaaaaaaaaaaaahhhhhhhhhh",
    completed: false,
    completedDate: new Date(),
    dueDate: new Date(2024, 3, 18),
    isPrioritized: false,
    labels: ["Chores", "Morning"],
  };

  const response = await Task.create(newTask);
  return NextResponse.json({ response }, { status: 200 });
}

//emergency delete
export async function DELETE() {
  await connectMongoDB();

  const response = await Task.deleteMany();
  return NextResponse.json({ response }, { status: 200 });
}
