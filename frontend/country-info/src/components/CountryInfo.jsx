import { useState, useEffect } from "react"
import '../index.css'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


function CountryInfo(){

const [countryInfo, setCountryInfo] = useState(null)
const [countryFlag, setCountryFlag] = useState([]);
const [countryPopulation, setCountryPopulation] = useState(null)

    const { countryCode } = useParams()

    //console.log("Fetching data for country:", countryCode);
    
useEffect(() => {
    const fetchCountryInfo = async () =>{
    try {
        const res = await fetch(`http://localhost:3000/getCountryInfo/${countryCode}`)
        const data = await res.json()
        //console.log(data)
       
        setCountryInfo(data)
        }catch (error) {
            console.error('Failed To fetch Data from the Api:', error)
            setCountryFlag([]);
        }
    }
    const fetchCountryFlag = async () => {
        try {
            const res = await fetch('http://localhost:3000/getCountryFlag');
            const data = await res.json();
            //console.log(data);
    
            if (Array.isArray(data.data)) {
                setCountryFlag(data.data);
            } else {
                console.error('The answer dont have the requested data:', data);
                setCountryFlag([]);
            }
        } catch (error) {
            console.error('Failed to fetch data from the API:', error);
            setCountryFlag([]);
        }
    };
    const  fetchCountryPopulation= async () =>{
        try {
            const res = await fetch(`http://localhost:3000/getCountryPopulation`)
            const data = await res.json()
            // console.log(data)
            setCountryPopulation(data)
        }catch (error) {
            console.error('Failed To fetch Data from the Api:', error)
        }
    }
    
    fetchCountryPopulation()
    fetchCountryFlag()
    fetchCountryInfo()
},[countryCode])


return (
    <>
      <div className="mt-10 grid items-center text-center justify-center">
        {Array.isArray(countryFlag) &&
          countryFlag
            .filter(item => item.iso2 === countryCode)
            .map(filteredFlag => (
              <div key={filteredFlag.iso2}>
                <h1>{filteredFlag.iso2}</h1>
                <img className="w-[300px]" src={filteredFlag.flag} alt={`Flag of ${filteredFlag.iso2}`} />
              </div>
            ))}
        
        {countryInfo ? (
          <div>
            <h1>{countryInfo.commonName}</h1>
            <ul>
              <li><strong>Official Name:</strong> {countryInfo.officialName}</li>
              <li><strong>Region:</strong> {countryInfo.region}</li>
              <li><strong>Country Code:</strong> {countryInfo.countryCode}</li>
              <li><strong>Borders:</strong>
                <ul>
                  {countryInfo.borders && countryInfo.borders.map((border, index) => (
                    <li key={index}>
                      <Link to={`/countries/${border.countryCode}`}>{border.officialName}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <div>
              {Array.isArray(countryPopulation) && countryPopulation.length > 0 ? (
                countryPopulation
                  .filter(item => {
                    console.log(item.country);
                    return item.country === countryInfo.commonName;
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
                <p>No countries found.</p>
              )}
            </div>
          </div>
        ) : (
          <p>Loading country information...</p>
        )}
      </div>
    </>
  );
  
}
export default CountryInfo