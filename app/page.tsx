import Image from "next/image";
import GetLocation from "./components/GetLocation";
import OpenCamera from "./components/OpenCamera";
import TodoList from "./components/TodoList";

export default function Home() {
  return (
   <section className="bg-gray-900 text-white min-h-screen flex flex-col justify-between">
    <nav className="h-24 bg-gray-800 flex justify-between items-center px-8 text-white">
      <span className="font-bold uppercase text-2xl">Demo PWA</span>
      <div className="flex gap-x-3">
      <button className="border-2 border-gray-600 px-3 py-2 rounded-lg" >Login</button>
      <button className="border-2 border-gray-600 px-3 py-2 rounded-lg" >Signup</button>
      </div>
     
    </nav>
    <main className="flex flex-col gap-10 my-8">
     
         <GetLocation/>
    <OpenCamera/>
     
   
    <TodoList/>
    </main>
    
    <footer className="h-48 bg-gray-800 flex justify-between items-center lg:flex-row flex-col px-10">
    <span className="font-bold uppercase text-2xl">Demo PWA</span>
    <div className="flex lg:flex-row flex-col gap-10 text-xl">
        <ul>
      <li>Item 1 </li>
      <li>Item text 2</li>
      <li>Item 3</li>
      <li>Item new 4</li>
    </ul>
    <ul>
      <li>Item text 5 </li>
      <li>Item new 6</li>
      <li>Item 7</li>
      <li>Item 8</li>
    </ul> 
    </div>
 
    </footer>

   </section>
  );
}
