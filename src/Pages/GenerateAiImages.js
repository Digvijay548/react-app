import React, { useState } from 'react';
import './style/GenerateAiImages.css'; // Import CSS file


const GenerateAiImages = () => {
    const [prompts, setPrompts] = useState("");
    const [imageUrl, setImageUrl] = useState("https://www.w3schools.com/html/img_girl.jpg");

    const generateImg = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "https://api.openai.com/v1/images/generations",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:
                        "Bearer Api_Key_Require_Here",
                        "User-Agent":"Chrome",
                    },
                    body:JSON.stringify({
                        prompt:prompts,
                        n:1,
                        size:"512x512",
                    }),
                }
            );
            let data=await response.json();
            console.log(data)
        } catch (error) {
            console.error("Error generating image:", error);
        }
    };

    return (
        <div className="new-user-container centered">
            <div className='Hedertext'>Generate Ai Images Using Text</div>
            <div className='Imagediv'>
                <img src={imageUrl} alt="" className='GeneratedImg'></img>
            </div>
            <div className='InputfieldsDiv'>
                <input type='text'
                    placeholder='Enter Prompt' className='InputField'
                    value={prompts}
                    onChange={(e) => setPrompts(e.target.value)} ></input>

                <button onClick={generateImg}>Generate Image</button>
            </div>

        </div>
    );
};

export default GenerateAiImages;
