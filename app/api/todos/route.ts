import mongoose from 'mongoose';
import Todo from '../../models/Todo'; 

const connectDb = async () => {
  console.log("connecting to MongoDB");
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect("mongodb+srv://mhadicentrox:thisismongopass@cluster0.osoxb.mongodb.net/");
      console.log("MongoDB connected");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to MongoDB");
  }
};

export async function GET() {
  try {
    await connectDb();
    const todos = await Todo.find(); 
    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return new Response('Failed to fetch todos', { status: 500 });
  }
}

export async function POST(req: Request) {
  const { title } = await req.json();

  if (!title) {
    return new Response('Title is required', { status: 400 });
  }

  try {
    await connectDb();
    const newTodo = new Todo({ title });
    const savedTodo = await newTodo.save(); // Save the new todo
    return new Response(JSON.stringify(savedTodo), { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return new Response('Failed to add todo', { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { id, completed, title } = await req.json();
  
  if (!id) {
    return new Response('Missing required fields', { status: 400 });
  }

  try {
    await connectDb();
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed, title },
      { new: true } // Return the updated document
    );
    console.log("updatedTodo", updatedTodo);
    if (!updatedTodo) {
      return new Response('Todo not found', { status: 404 });
    }
    return new Response(JSON.stringify(updatedTodo), { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return new Response('Failed to update todo', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  
  if (!id) {
    return new Response('Id is required', { status: 400 });
  }

  try {
    await connectDb();
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return new Response('Todo not found', { status: 404 });
    }
    return new Response('Todo deleted', { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response('Failed to delete todo', { status: 500 });
  }
}
