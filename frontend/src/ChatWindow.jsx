
import { useContext, useState, useEffect } from "react";
import "./ChatWindow.css";
import { MyContext } from "./MyContext.jsx";
import { BeatLoader } from "react-spinners";
import Chat from "./Chat.jsx"

const ChatWindow = () => {
    const { prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const getReply = async () => {
        setLoading(true);
        setNewChat(false)
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };
        try {
            const response = await fetch("http://localhost:8080/api/chat", options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply)

        } catch (err) {
            console.log(err);

        }
        setLoading(false)
    }

    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prevChats => [
                ...prevChats,
                {
                    role: "user",
                    content: prompt
                },
                {
                    role: "assistant",
                    content: reply
                }
            ]);

            setPrompt("");
        }
    }, [reply]);
    const handlemore = () => {
        setIsOpen(!isOpen);
    }


    return (
        <div className="chat-area">

            <header className="top-bar">


                <div className="mode-switch">
                    <button className="mode active">
                        Chat
                    </button>

                    <button className="mode">
                        Work
                    </button>
                </div>


                <div className="top-actions">

                    <button className="upgrade">
                        ✨Upgrade
                    </button>

                    <button className="share">
                        <i className="fa-solid fa-share-nodes"></i>
                        <span>Share</span>
                    </button>


                    <button className="more" onClick={handlemore}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </button>
                    {
                        isOpen &&
                        < div className="dropdown">
                            <div className="item"><i class="fa-solid fa-pencil"></i>Rename</div>
                            <div className="item"><i class="fa-solid fa-thumbtack"></i>Pin</div>
                            <div className="item"><i class="fa-solid fa-thumbtack"></i>Plugins</div>



                            <div className="item"><i class="fa-solid fa-box-archive"></i>Archive</div>
                            <div className="item"><i class="fa-solid fa-trash"></i>Delete</div>
                            <div className="item"><i class="fa-solid fa-film"></i>Move to project</div>
                        </div>
                    }

                </div>

            </header >


            <section className="messages">
                <Chat />
            </section>




            <div className="input-container">

                <div className="loader-container">
                    <BeatLoader color="#fff" loading={loading} />
                </div>

                <div className="chat-input">



                    <div className="input-left">

                        <button className="plus"> +
                            <span className="tooltip">Add file and more @</span>
                        </button>
                        <input className="ask-anything" placeholder="Ask Anything" value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''} />

                    </div>



                    <div className="input-right">


                        <button id="submit" onClick={getReply} className="think">
                            <i className="fa-solid fa-paper-plane"></i> Think
                            <span className="tooltip">Get a smarter answer</span>
                        </button>

                        <button className="mic">
                            <i className="fa-solid fa-microphone"></i>
                            <span className="tooltip">Dictate Ctl+Shift+D</span>

                        </button>

                        <button className="voice">
                            <i className="fa-brands fa-soundcloud"></i>
                            <span className="tooltip">Start Voice</span>
                        </button>

                    </div>

                </div>

            </div>

        </div >
    );
};

export default ChatWindow;

