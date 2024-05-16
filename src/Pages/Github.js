
import { useLoaderData } from 'react-router-dom'
import './style/Github.css'; // Import CSS file


export default function Github() {
    const data = useLoaderData()


    return (
        <>
        <div className='Body-Div'>
        <div className='folowersdiv'><h4 className='Usernametxt'>Github UserName:</h4> <h3 className='Username'>{data.login}</h3>
            
        </div>
        <div className='ImgDiv'>
            <img src={data.avatar_url} alt="Git" width={300} />
        </div>
        </div>
        </>
    )

}



export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/Digvijay548')
    return response.json()
}