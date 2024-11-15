import { useState, useEffect } from "react"
import '../index.css'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


function CountryInfo(){

const [countryInfo, setCountryInfo] = useState(null)
const [countryFlag, setCountryFlag] = useState([]);
const [countryPopulation, setCountryPopulation] = useState([])
const [filterCountryPopulation, setFilterCountryPopulation] = useState([])
const [name, setName] = useState('')
    
const { countryCode } = useParams()

    //console.log("Fetching data for country:", countryCode);
    
useEffect(() => {
    const fetchCountryInfo = async () =>{
    try {
        const res = await fetch(`http://localhost:3000/getCountryInfo/${countryCode}`)
        const data = await res.json()
        console.log(data)
        setCountryInfo(data)
        setName(data.commonName)
      }catch (error) {
        console.error('Failed To fetch Data from the Api:', error)
        setCountryFlag([]);
      }
    }
    const fetchCountryFlag = async () => {
      try {
        const res = await fetch('http://localhost:3000/getCountryFlag');
        const data = await res.json();
        console.log(data);
        
        if (Array.isArray(data.data)) {
          setCountryFlag(data.data);
        } else {
          console.error('The answer dont have the requested data:', data);
          setCountryFlag([]);
        }
      } catch (error){
        console.error('Failed to fetch data from the API:', error);
            setCountryFlag([]);
          }
        };
        const  fetchCountryPopulation= async () =>{
          try {
            const res = await fetch(`http://localhost:3000/getCountryPopulation`)
            const data = await res.json()
            console.log(data)
            setCountryPopulation(data)
            setFilterCountryPopulation(data)
          }catch (error) {
            console.error('Failed To fetch Data from the Api:', error)
          }
        }
        
        fetchCountryPopulation()
        fetchCountryFlag()
        fetchCountryInfo()
      },[countryCode])


const Filter = () => {
  if (name) {
    const filteredData = countryPopulation.filter(f => f.country === name);
    setFilterCountryPopulation(filteredData);
    console.log(filteredData); 
  }
};

useEffect(() => {
  console.log(filterCountryPopulation);
}, [filterCountryPopulation]);


return (
    <>
    <div className="text-start ml-10 mt-5 font-bold hover:text-blue-500 underline">
      <Link to="/">Back to all countries</Link>
    </div>
      <div className="mt-10 grid mx-auto items-center text-center justify-center rounded-3xl shadow-xl w-[400px]  bg-slate-100">
        {Array.isArray(countryFlag) &&
          countryFlag
            .filter(item => item.iso2 === countryCode)
            .map(filteredFlag => (
              <div key={filteredFlag.iso2}>
              <h1 className="mb-4 font-bold text-2xl">{filteredFlag.name}</h1>
                <img className="w-[300px] object-cover" src={filteredFlag.flag} alt={`Flag of ${filteredFlag.iso2}`} />
              </div>
            ))}
        {countryInfo ? (
          <div className="mt-4 mb-4">
            <ul>
              <li className="font-bold mb-2">Official Name: {countryInfo.officialName}</li>
              <li className="font-bold mb-2">Region: {countryInfo.region}</li>
              <li className="font-bold mb-2">Country Code: {countryInfo.countryCode}</li>
              <li className="font-bold mb-2">Borders:
                <ul>
                  {countryInfo.borders && countryInfo.borders.map((border, index) => (
                    <li key={index}>
                      <Link to={`/countries/${border.countryCode}`} className="hover:text-blue-500 underline mb-4">{border.officialName}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        ) : (
          <p>Loading country information...</p>
        )}
      </div>
      <div>
        {Array.isArray(countryPopulation) && countryPopulation.length >= 0 ? (
         countryPopulation
          .filter(item => {
          return item.country === name;
                  })
                  .map(filteredPopulation => (
                    <div key={filteredPopulation.iso3}>
                      <ul>
                        <li>Population counts:</li>
                        {Array.isArray(filteredPopulation.populationCounts) && filteredPopulation.populationCounts.length > 0 ? (
                          filteredPopulation.populationCounts.map((populationData, index) => (
                            <li key={index}>
                              {populationData.year}: {populationData.value}
                            </li>
                          ))
                        ) : (
                          <li>No population data available</li>
                        )}
                      </ul>
                    </div>
                  ))
              ) : (
                <p></p>
              )}
            </div>
    </>
  );
}

export default CountryInfo