import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country.jsx'
import Search from './components/Search.jsx'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([...countries])
  const [searchString, setSearchString] = useState('')

  const countriesURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect(() => {
    axios.get(countriesURL)
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Search searchString={searchString} setSearchString={setSearchString} />
    </div>
  )

}
export default App
