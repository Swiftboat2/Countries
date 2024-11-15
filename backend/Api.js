const getAllCountries = async () => {
    try {
        const response = await fetch('https://date.nager.at/api/v3/AvailableCountries')
        return response.json();
    }catch (error) {
        console.log('Fail to fetch the Api data:', error)
    }
}


const getCountryInfo = async (countryCode) => {
    try { const response = await fetch(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`)
    return response.json();
    } catch (error) {
        console.log("Failed to fetch the API data:", error);
        return null; 
    }
};
const getCountryFlag = async () => {
    try { const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images')
    return response.json();
    } catch (error) {
        console.log("Failed to fetch the API data:", error);
        return null; 
    }
};
const getCountryPopulation = async () => {
    try { const response = await fetch('https://countriesnow.space/api/v0.1/countries/population')
    return response.json();
    } catch (error) {
        console.log("Failed to fetch the API data:", error);
        return null; 
    }
};
export default {
    getAllCountries,
    getCountryInfo,
    getCountryFlag,
    getCountryPopulation
}