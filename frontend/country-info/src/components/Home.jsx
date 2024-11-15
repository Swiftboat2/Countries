import { useState, useEffect } from "react"
import '../index.css'
import { Link } from 'react-router-dom'

function Home() {
const [countries, setCountries] = useState([])

useEffect(() => {

const fetchCountries = async () =>{
try {
    const res = await fetch('http://localhost:3000/getCountries')
    const data = await res.json()
    console.log(data)
    setCountries(data)
    }catch (error) {
        console.error('Failed To fetch Data from the Api:', error)
    }
}

fetchCountries()

},[])


    return(
        <>
        <div className="grid grid-cols-5 justify-evenly text-center items-center ">
        {countries.map((country) => (
            <div key={country.countryCode} className="">
            <ul className="text-2xl">
                <li className="mb-5 mt-5">{country.countryCode}</li>
                <li className="mb-3">{country.name}</li>
                <Link to={`/countries/${country.countryCode}`} className="mb-5">
                See more about this country.
                </Link>
            </ul>
            </div>
        ))}
        </div>
        </>
    )
}



export default Home