// import "dotenv/config";

// const getOpenAIAPIResponse = async (message) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "x-goog-api-key": process.env.GEMINI_API_KEY
//         },

//         body: JSON.stringify({
//             model: "gemini-3.6-flash",
//             messages: [{
//                 role: "user",
//                 content: req.body.message
//             }]
//         })

//     };

//     try {

//         const response = await fetch(
//             "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
//             options
//         );

//         const data = await response.json();

//         console.log(data);

//         if (!response.ok) {
//             return res.status(response.status).json(data);
//         }

//         return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

//     } catch (err) {

//         console.log(err);
//         res.status(500).send("Something went wrong");

//     }

// }

// export default getOpenAIAPIResponse;

import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {

    const options = {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.GEMINI_API_KEY
        },

        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: message
                        }
                    ]
                }
            ]
        })
    };

    // 3 attempts
    for (let attempt = 1; attempt <= 3; attempt++) {

        try {

            const response = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
                options
            );

            const data = await response.json();

            console.log("Gemini Status:", response.status);

            // ✅ SUCCESS
            if (response.ok) {

                return (
                    data.candidates?.[0]?.content?.parts?.[0]?.text ||
                    "No response from Gemini"
                );
            }

            // 🔄 503 - Gemini temporarily busy
            if (response.status === 503) {

                console.log(
                    `Gemini is busy. Attempt ${attempt} failed.`
                );

                if (attempt < 3) {

                    const delay = attempt * 3000;

                    console.log(
                        `Retrying after ${delay / 1000} seconds...`
                    );

                    await new Promise(resolve =>
                        setTimeout(resolve, delay)
                    );

                    continue;
                }

                return "Gemini is currently busy. Please try again after a few seconds.";
            }

            // 🚫 429 - quota exceeded
            if (response.status === 429) {

                console.log("Gemini quota exceeded:", data);

                return "Gemini API quota exceeded. Please try again later.";
            }

            // ❌ Other errors
            console.log("Gemini API Error:", data);

            return (
                data?.error?.message ||
                "Gemini API request failed"
            );

        } catch (err) {

            console.log("Gemini Error:", err);

            if (attempt < 3) {

                const delay = attempt * 3000;

                console.log(
                    `Connection error. Retrying after ${delay / 1000} seconds...`
                );

                await new Promise(resolve =>
                    setTimeout(resolve, delay)
                );

                continue;
            }

            return "Something went wrong while connecting to Gemini.";
        }
    }

    return "Gemini is temporarily unavailable.";
};

export default getOpenAIAPIResponse;