"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const comment = async () => {
    const {data} = await axios.post("/api/comment", {
        text: 'hello',
        tags: ['Typescript']
    })
     console.log(data)
  }
  return (
      <div className="flex items-center flex-col gap-8 mt-32">
         <Link href="/comments" prefetch={false}>
            See comments
         </Link>
         <Button onClick={comment}>make comment</Button>
      </div>

  );
}
