

// import "./Sidevar.css";
// import { useContext, useEffect, useState } from "react";
// import { MyContext } from "./MyContext.jsx";
// import { v1 as uuidv1 } from "uuid"


// function Sidevar() {
//     const { allThreads, setAllThreads, currThreadId, setReply, setNewChat, setPrompt, setCurrThreadId, setPrevChats, } = useContext(MyContext);
//     const [isOpen, setIsOpen] = useState(false);


//     const getAllthreads = async () => {
//         try {
//             const response = await fetch("http://localhost:8080/api/thread");
//             const res = await response.json();
//             const filterdData = res.map(thread => ({ threadId: thread.threadId, title: thread.title }))
//             // console.log(filterdData);
//             setAllThreads(filterdData);
//         }
//         catch (err) {
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         getAllthreads();

//     }, [currThreadId]);
//     const createNewChat = () => {
//         setNewChat(true);
//         setPrompt("");
//         setReply(null);
//         setCurrThreadId(uuidv1());
//         setPrevChats([]);
//     }
//     const changeThread = async (newThreadId) => {
//         setCurrThreadId(newThreadId);
//         try {
//             const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
//             const res = await response.json();
//             console.log(res);
//             setPrevChats(res);
//             setNewChat(false);
//             setReply(null)
//         }
//         catch (err) {
//             console.log(err)
//         }

//     }

//     const deleteThread = async (threadId) => {
//         try {
//             const response = await fetch(
//                 `http://localhost:8080/api/thread/${threadId}`,
//                 {
//                     method: "DELETE",
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error("Thread delete nahi hua");
//             }

//             setAllThreads((prev) =>
//                 prev.filter((thread) => thread.threadId !== threadId)
//             );

//             if (currThreadId === threadId) {
//                 createNewChat();
//             }

//         } catch (err) {
//             console.error("Delete error:", err);
//             alert("Chat delete nahi hui!");
//         }
//     };



//     return (
//         <section className="sidebar">
//             <div className="sidebar-top">
//                 <button ><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcA9oSnfKJzrfDE0m00omyN5aztxLh7uVz5U7z27DNPBrPc6g8QfIwbGfj&s=10" className="logo" alt="chatgpt-logo" />
//                     <div className="top-icons">

//                         <span className="icon-box search-icon">
//                             <i className="fa-solid fa-magnifying-glass"></i>
//                             <span className="tooltip">Search</span>
//                         </span>

//                         <span className="icon-box folder-icon">
//                             <i className="fa-regular fa-folder-closed"></i>
//                             <span className="tooltip">Close sidebar</span>
//                         </span>

//                     </div>

//                 </button>

//             </div>





//             <div className="menu">

//                 <div className="menu-item">
//                     <i className="fa-regular fa-pen-to-square"></i>
//                     <span onClick={createNewChat}>New chat</span>
//                 </div>

//                 <div className="menu-item">
//                     <i className="fa-regular fa-image"></i>
//                     <span>Images</span>
//                 </div>


//                 <div className="menu-item">
//                     <i className="fa-regular fa-folder"></i>
//                     <span>Library</span>
//                 </div>

//                 <div className="menu-item">
//                     <i className="fa-regular fa-clock"></i>
//                     <span>Scheduled</span>
//                 </div>

//                 <div className="menu-item">
//                     <i className="fa-solid fa-plug"></i>
//                     <span>Plugins</span>
//                 </div>

//                 <div className="menu-item">
//                     <i className="fa-solid fa-code"></i>
//                     <span>Project / Codex</span>
//                 </div>

//                 <div className="menu-item">
//                     <i className="fa-solid fa-ellipsis"></i>
//                     <span>More</span>
//                 </div>

//             </div>




//             <div className="profile">
//                 <span>Recent</span>

//                 <i onClick={createNewChat} className="fa-regular fa-pen-to-square newchat-icon"></i>

//                 <i className="fa-solid fa-ellipsis"></i>
//             </div>
//             <div className="history-section">





//                 <ul className="history">
//                     {allThreads?.map((thread) => (
//                         <li
//                             key={thread.threadId}
//                             onClick={() => changeThread(thread.threadId)}
//                         >
//                             <span className="thread-title">
//                                 {thread.title}
//                             </span>

//                             <i
//                                 className="fa-solid fa-trash delete-icon"
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     deleteThread(thread.threadId);
//                                 }}
//                             ></i>
//                         </li>
//                     ))}
//                 </ul>


//             </div>




//             <div className="sidebar-bottom">



//                 <div className="profile profile-dropdown-container">
//                     {isOpen && (
//                         <div className="dropdown">
//                             <div className="dropdown-user">
//                                 <div className="profile-circle">R</div>
//                                 <div className="user-details">
//                                     <span>Roshani Patel</span>
//                                     <small>Free</small>
//                                 </div>
//                             </div>

//                             <div className="item">
//                                 <i className="fa-solid fa-arrow-up-right-from-square"></i>
//                                 Upgrade plan
//                             </div>

//                             <div className="item">
//                                 <i className="fa-solid fa-sliders"></i>
//                                 Personalization
//                             </div>

//                             <div className="item">
//                                 <i className="fa-solid fa-user"></i>
//                                 Profile
//                             </div>

//                             <div className="item">
//                                 <i className="fa-solid fa-gear"></i>
//                                 Settings
//                             </div>

//                             <div className="dropdown-divider"></div>

//                             <div className="item">
//                                 <i className="fa-solid fa-circle-question"></i>
//                                 Help
//                             </div>

//                             <div className="item">
//                                 <i className="fa-solid fa-right-from-bracket"></i>
//                                 Log out
//                             </div>
//                         </div>
//                     )}

//                     <div
//                         className="profile-info"
//                         onClick={() => setIsOpen(!isOpen)}
//                     >
//                         <div className="profile-circle">R</div>
//                         <div className="user-details">
//                             <span>Roshani Patel</span>
//                             <small>Free</small>
//                         </div>
//                     </div>
//                 </div>



//             </div>


//         </section >
//     );
// }

// export default Sidevar;





import "./Sidevar.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidevar() {
    const {
        allThreads,
        setAllThreads,
        currThreadId,
        setReply,
        setNewChat,
        setPrompt,
        setCurrThreadId,
        setPrevChats,
    } = useContext(MyContext);

    const [isOpen, setIsOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);


    const [pinnedThreads, setPinnedThreads] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("pinnedThreads")) || [];
        } catch {
            return [];
        }
    });


    useEffect(() => {
        localStorage.setItem(
            "pinnedThreads",
            JSON.stringify(pinnedThreads)
        );
    }, [pinnedThreads]);


    const getAllthreads = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/thread");

            if (!response.ok) {
                throw new Error("Threads fetch nahi hue");
            }

            const res = await response.json();

            const filteredData = res.map((thread) => ({
                threadId: thread.threadId,
                title: thread.title,
            }));

            setAllThreads(filteredData);
        } catch (err) {
            console.log("Fetch error:", err);
        }
    };

    useEffect(() => {
        getAllthreads();
    }, [currThreadId]);


    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
        setActiveMenu(null);
    };


    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const response = await fetch(
                `http://localhost:8080/api/thread/${newThreadId}`
            );

            if (!response.ok) {
                throw new Error("Chat load nahi hui");
            }

            const res = await response.json();

            setPrevChats(res);
            setNewChat(false);
            setReply(null);
            setActiveMenu(null);
        } catch (err) {
            console.log("Chat loading error:", err);
        }
    };

    // Pin / Unpin chat
    const togglePin = (threadId) => {
        setPinnedThreads((prev) =>
            prev.includes(threadId)
                ? prev.filter((id) => id !== threadId)
                : [...prev, threadId]
        );

        setActiveMenu(null);
    };

    // Delete chat
    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/thread/${threadId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Thread delete nahi hua");
            }

            setAllThreads((prev) =>
                prev.filter((thread) => thread.threadId !== threadId)
            );

            setPinnedThreads((prev) =>
                prev.filter((id) => id !== threadId)
            );

            if (currThreadId === threadId) {
                createNewChat();
            }

            setActiveMenu(null);
        } catch (err) {
            console.error("Delete error:", err);
            alert("Chat delete nahi hui!");
        }
    };

    return (
        <section className="sidebar">


            <div className="sidebar-top">
                <button>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcA9oSnfKJzrfDE0m00omyN5aztxLh7uVz5U7z27DNPBrPc6g8QfIwbGfj&s=10"
                        className="logo"
                        alt="chatgpt-logo"
                    />

                    <div className="top-icons">
                        <span className="icon-box search-icon">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <span className="tooltip">Search</span>
                        </span>

                        <span className="icon-box folder-icon">
                            <i className="fa-regular fa-folder-closed"></i>
                            <span className="tooltip">Close sidebar</span>
                        </span>
                    </div>
                </button>
            </div>

            <div className="menu">

                <div className="menu-item" onClick={createNewChat}>
                    <i className="fa-regular fa-pen-to-square"></i>
                    <span>New chat</span>
                </div>

                <div className="menu-item">
                    <i className="fa-regular fa-image"></i>
                    <span>Images</span>
                </div>

                <div className="menu-item">
                    <i className="fa-regular fa-folder"></i>
                    <span>Library</span>
                </div>

                <div className="menu-item">
                    <i className="fa-regular fa-clock"></i>
                    <span>Scheduled</span>
                </div>

                <div className="menu-item">
                    <i className="fa-solid fa-plug"></i>
                    <span>Plugins</span>
                </div>

                <div className="menu-item">
                    <i className="fa-solid fa-code"></i>
                    <span>Project / Codex</span>
                </div>

                <div className="menu-item">
                    <i className="fa-solid fa-ellipsis"></i>
                    <span>More</span>
                </div>
            </div>


            <div className="profile">
                <span>Recent</span>

                <i
                    onClick={createNewChat}
                    className="fa-regular fa-pen-to-square newchat-icon"
                ></i>

                <i className="fa-solid fa-ellipsis"></i>
            </div>


            <div className="history-section">
                <ul className="history">

                    {allThreads
                        ?.slice()
                        .sort(
                            (a, b) =>
                                Number(pinnedThreads.includes(b.threadId)) -
                                Number(pinnedThreads.includes(a.threadId))
                        )
                        .map((thread) => (
                            <li
                                key={thread.threadId}
                                className={`history-item ${currThreadId === thread.threadId
                                    ? "active-thread"
                                    : ""
                                    }`}
                                onClick={() =>
                                    changeThread(thread.threadId)
                                }
                            >
                                <span className="thread-title">
                                    {thread.title}
                                </span>

                                <div className="thread-actions">

                                    <button
                                        type="button"
                                        className={`action-btn pin-btn ${pinnedThreads.includes(thread.threadId)
                                            ? "pinned"
                                            : ""
                                            }`}
                                        title={
                                            pinnedThreads.includes(thread.threadId)
                                                ? "Unpin chat"
                                                : "Pin chat"
                                        }
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            togglePin(thread.threadId);
                                        }}
                                    >
                                        <i className="fa-solid fa-thumbtack"></i>
                                    </button>

                                    <button
                                        type="button"
                                        className="action-btn"
                                        title="More options"
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            setActiveMenu(
                                                activeMenu === thread.threadId
                                                    ? null
                                                    : thread.threadId
                                            );
                                        }}
                                    >
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </button>


                                    {activeMenu === thread.threadId && (
                                        <div
                                            className="thread-dropdown"
                                            onClick={(e) =>
                                                e.stopPropagation()
                                            }
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteThread(thread.threadId)
                                                }
                                            >
                                                <i className="fa-regular fa-trash-can"></i>
                                                Delete chat
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </li>
                        ))}

                </ul>
            </div>

            {/* Sidebar Bottom */}
            <div className="sidebar-bottom">

                <div className="profile profile-dropdown-container">

                    {isOpen && (
                        <div className="dropdown">

                            <div className="dropdown-user">
                                <div className="profile-circle">R</div>

                                <div className="user-details">
                                    <span>Roshani Patel</span>
                                    <small>Free</small>
                                </div>
                            </div>

                            <div className="item">
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                Upgrade plan
                            </div>

                            <div className="item">
                                <i className="fa-solid fa-sliders"></i>
                                Personalization
                            </div>

                            <div className="item">
                                <i className="fa-solid fa-user"></i>
                                Profile
                            </div>

                            <div className="item">
                                <i className="fa-solid fa-gear"></i>
                                Settings
                            </div>

                            <div className="dropdown-divider"></div>

                            <div className="item">
                                <i className="fa-solid fa-circle-question"></i>
                                Help
                            </div>

                            <div className="item">
                                <i className="fa-solid fa-right-from-bracket"></i>
                                Log out
                            </div>

                        </div>
                    )}

                    <div
                        className="profile-info"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="profile-circle">R</div>

                        <div className="user-details">
                            <span>Roshani Patel</span>
                            <small>Free</small>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}

export default Sidevar;


