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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-5  ml-10 mt-5 justify-center text-center items-center ">
        {countries.map((country) => (
            <div key={country.countryCode} className="rounded-3xl shadow-xl h-[200px] w-[300px] mt-5 mb-5 bg-slate-100 ">
            <ul className="text-2xl">
                <li className="font-bold mb-6">{country.countryCode}</li>
                <li className=" font-bold mb-6">{country.name}</li>
                <Link to={`/countries/${country.countryCode}`} className="hover:text-blue-500 underline font-bold mb-5">
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