import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Task from "../../../../../models/task";

// Updating a Task
export async function PUT(request, { params }) {
  const { id } = params;

  const { content, completed, resolved } = await request.json();
  const newTask = { content, completed, resolved };
  await connectMongoDB();

  // In the options setting new to true so that the updated items is retrieved. It is required for properly setting the state
  const response = await Task.findByIdAndUpdate(id, newTask, { new: true });

  return NextResponse.json(response, { status: 200 });
}

// Getting a Task
export async function GET(request, { params }) {
  const { id } = params;

  await connectMongoDB();

  const task = await Task.findById(id);

  return NextResponse.json({ task }, { status: 200 });
}

// Deleting a Task
export async function DELETE(request, { params }) {
  const { id } = params;
  console.log(id);
  await connectMongoDB();

  const deletedTask = await Task.findByIdAndDelete(id);
  return NextResponse.json({ deletedTask }, { status: 200 });
}
