import { useEffect, useState } from "react";
import { messages } from "../data/messages";

export default function Messages() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        let last = localStorage.getItem("lastMessage");

        let available = messages.filter(m => m !== last);

        const random =
            available[Math.floor(Math.random() * available.length)];

        localStorage.setItem("lastMessage", random);
        setMessage(random);
    }, []);


    return (
        <p className="max-w-xl mx-auto text-white/90 text-lg md:text-xl animate-fadeIn">
            {message}
        </p>
    );
}
