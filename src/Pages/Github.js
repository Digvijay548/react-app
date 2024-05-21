
import { useLoaderData } from 'react-router-dom'


export default function Github() {
    const data = useLoaderData()


    return (
        <>{data.login ? (
            <div className="flex flex-col items-center  w-full h-screen bg-black" style={{ backgroundImage: "url('/HomeBg.jpg')", backgroundSize: "cover" }}>


                <div className='flex flex-col w-1/2 mt-20 h-28 mb-5 rounded-2xl bg-white bg-opacity-5'>
                    <h4 className='text-white flex justify-center items-center text-center text-xl mt-5 font-light'>Github UserName:</h4>
                    <h3 className='text-white flex justify-center items-center text-center text-2xl h-1/2 font-semibold'>{data.login}</h3>
                </div>
                <div className="flex flex-row items-center bg-white bg-opacity-5 w-1/2 h-1/2 rounded-2xl">
                    <div className='ml-5 '>
                        <img src={data.avatar_url} alt="Git" width={300} />
                    </div>
                    <div className='flex flex-col m-5 h-80 w-full text-balance'>
                        <h4 className='text-center text-white text-xl'>My Info</h4>
                        <p className='text-center text-xs m-5 mt-10 text-white font-thin'>My GitHub profile showcases a diverse range of projects reflecting my passion for innovation and technology. With a focus on leveraging cutting-edge technologies, I've delved into various domains, from Python scripting to full-stack development using the MERN stack. My repository features projects demonstrating proficiency in SQL database management, C# programming for desktop applications, and integration with various devices. One notable area of exploration is object detection, where I've developed solutions using advanced algorithms to recognize and track objects in images and videos. With a keen interest in problem-solving and a knack for exploring new technologies, my GitHub serves as a testament to my dedication to continuous learning and experimentation in the ever-evolving landscape of software development.

                        </p>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex flex-col items-center  w-full h-screen bg-black" style={{ backgroundImage: "url('/HomeBg.jpg')", backgroundSize: "cover" }}>


                <div className='flex flex-col w-1/2 mt-20 h-28 mb-5 rounded-2xl bg-white bg-opacity-5'>
                    <h4 className='text-white flex justify-center items-center text-center text-xl mt-5 font-light'>Github UserName:</h4>
                    <h3 className='text-white flex justify-center items-center text-center text-2xl h-1/2 font-semibold'>error</h3>
                </div>
                <div className="flex flex-row items-center bg-white bg-opacity-5 w-1/2 h-1/2 rounded-2xl">
                    <div className='ml-5 '>
                        <img src={data.avatar_url} alt="error" width={300} />
                    </div>
                    <div className='flex flex-col m-5 h-80 w-full text-balance'>
                        <h4 className='text-center text-white text-xl'>My Info</h4>
                        <p className='text-center text-xs m-5 mt-10 text-white font-thin'>
                            error
                        </p>
                    </div>
                </div>
            </div>

        )};

        </>
    )

}



export const githubInfoLoader = async () => {
    try {
    const response = await fetch('https://api.github.com/users/Digvijay548')
    if (response) {
        return response.json()
    }
    else{
        const responseerror="Error"
        return responseerror
    }

}
catch (err) {
    const responseerror="Error"
        return responseerror
}
}