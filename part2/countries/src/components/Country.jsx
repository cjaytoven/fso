const Country = (countries) => {
  if (countries.length == 1){
    console.log('one country')
  }

  else if (countries.length < 10){
      return (
          <li>
          </li>
        )
  }
}

export default Country