


// import { useContext, useEffect, useState } from "react";
// import "./Chat.css";
// import { MyContext } from "./MyContext";
// import ReactMarkdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";

// function Chat() {
//     const { newChat, prevChats, reply } = useContext(MyContext);
//     const [latestReply, setLatestReply] = useState(null);

//     useEffect(() => {
//         if (!prevChats?.length) return;
//         const content = reply.split(" ");
//         let idx = 0;
//         const interval = setInterval(() => {
//             setLatestReply(content.slice(0, idx + 1).join(" "));
//             idx++;
//             if (idx >= content.lenght) clearInterval(interval);

//         }, 40);
//         return () => clearInterval(interval)

//     }, [prevChats, reply]);




//     return (
//         <>
//             {newChat && <h1>Start a New Chat</h1>}

//             <div className="chats">
//                 {prevChats?.slice(0, -1).map((chat, idx) => (
//                     <div className={chat.role === "user"
//                         ? "userdiv"
//                         : "gptdiv"
//                     } key={idx} >
//                         {chat.role === "user" ? (
//                             <p className="usermsg">{chat.content}  </p>) : (
//                             <div className="gptmsg">
//                                 <ReactMarkdown rehypePlugins={[rehypeHighlight]} > {chat.content} </ReactMarkdown>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//                 {
//                     prevChats.lenght > 0 && latestReply !== null &&
//                     <div className="gptdiv" key={"typing"}>
//                         <ReactMarkdown rehypePlugins={[rehypeHighlight]} > {latestReply} </ReactMarkdown>
//                     </div>
//                 }
//             </div>
//         </>
//     );
// }

// export default Chat;



import { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
    const { newChat, prevChats, reply } = useContext(MyContext);

    const [latestReply, setLatestReply] = useState(null);

    useEffect(() => {
        if (reply === null) {
            setLatestReply(null);
            return;
        }
        if (!prevChats?.length || !reply) {
            setLatestReply(null); return;
        }
        const replyText = String(reply);
        const content = replyText.split(" ");
        let idx = 0;

        const interval = setInterval(() => {
            setLatestReply(
                content.slice(0, idx + 1).join(" ")
            );

            idx++;
            if (idx >= content.length) {
                clearInterval(interval);
            }
        }, 40);

        return () => clearInterval(interval);

    }, [prevChats, reply]);


    return (
        <>
            {newChat && <h1>Start a New Chat</h1>}
            <div className="chats">
                {prevChats?.slice(0, -1).map((chat, idx) => (
                    <div className={
                        chat.role === "user"
                            ? "userdiv"
                            : "gptdiv"
                    }
                        key={idx}
                    >
                        {chat.role === "user" ? (

                            <p className="usermsg">
                                {String(chat.content || "")}
                            </p>

                        ) : (

                            <div className="gptmsg">
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                    {String(chat.content || "")}
                                </ReactMarkdown>

                            </div>

                        )}

                    </div>

                ))}


                {/* {
                    prevChats.length > 0 && (
                        <>
                            {
                                latestReply === null ? (
                                    <div className="gptdiv" key=" non-typing">
                                        <div className="gptmsg">
                                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}> {String(
                                                prevChats[prevChats.length - 1]?.content || "")}</ReactMarkdown>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="gptdiv" key="typing">
                                        <div className="gptmsg">
                                            <ReactMarkdown rehypePlugins={[rehypeHighlight]} >  {String(latestReply || "")}
                                            </ReactMarkdown>
                                        </div>
                                    </div>

                                )

                            }


                        </>

                    )
                } */}
                {prevChats?.length > 0 && latestReply === null &&
                    prevChats[prevChats.length - 1]?.role === "assistant" && (
                        <div className="gptdiv" key="non-typing">
                            <div className="gptmsg">
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                    {String(
                                        prevChats[prevChats.length - 1].content ?? ""
                                    )}
                                </ReactMarkdown>
                            </div>
                        </div>
                    )}

                {latestReply !== null && (
                    <div className="gptdiv" key="typing">
                        <div className="gptmsg">
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                {String(latestReply)}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}

export default Chat;