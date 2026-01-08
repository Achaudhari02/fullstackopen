


const Countries = ({display}) => {
    const length = display.length
    if (length == 0){
        return null
    }

    if (1 < length && length <= 10){
        
       return  display.map((c) => {
          return <h3>{c.name.common}</h3>;
        });
    }

    if (length > 10){
        return <h3>Too many to Display</h3>
    }

    if (length == 1) {
        const country = display[0]
        const langs = country.languages
        console.log("here",country)
        console.log("lang", Object.entries(langs))

        
        return (
          <div>
            <h1 key={country.cca3}>{country.name.common}</h1>
            <h4>{country.population}</h4>
            <h4>{country.capital}</h4>
            {country.independent ? (
              <h4>The country is Independent </h4>
            ) : (
              <h4>The Country is not Independent</h4>
            )}

            <img src={country.flags.png} />
            <h2>Languages:</h2>
            <ul>
              {Object.entries(langs)
                .map(([code, language], i) => (
                <li key={i}>{language}</li>
              ))}
            </ul>
          </div>
        );
    }
}


export default Countries