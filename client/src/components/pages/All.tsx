import { useEffect, useState } from "react";
import { CountriesTable } from "../country/CountriesTable";
import { UsersTable } from "../user/UsersTable";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

enum Mode {
  USERS = "Users",
  COUNTRIES = "Countries",
  COUNTRY_USERS = "Country Users"
}

const modes = [Mode.USERS, Mode.COUNTRIES]

export const All = () => {
  const [mode, setMode] = useState<Mode>(Mode.USERS);
  const [country, setCountry] = useState("")
  const [params] = useSearchParams()

  useEffect(() => {
    const name = params.get("country")
    if (name) {
      setMode(Mode.COUNTRY_USERS);
      setCountry(name);
    } else {
      setMode(Mode.USERS);
    }
  }, [params])

  return (
    <div className="main-container p-4">
      <Helmet>
        <meta property="og:title" content="All Tracked Users/Countries" />
        <meta
          property="og:description"
          content="See a list of all tracked users/countries and sort them by performance, rank, accuracy and more."
        />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/627267590862929961/901425993485545514/unknown.png"
        />
        <meta
          name="twitter:image"
          content="https://cdn.discordapp.com/attachments/627267590862929961/901425993485545514/unknown.png"
        />
        <meta name="twitter:title" content="All Tracked Users/Countries" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="See a list of all tracked users/countries and sort them by performance, rank, accuracy and more."
        />
      </Helmet>
      <div className="border border-gray-300 shadow-sm rounded-md dark:border-black w-full h-full flex flex-col">
        {mode === Mode.COUNTRY_USERS ? (
          <UsersTable country={country} />
        ) : (
          <div className="w-full h-full flex-col">
            <div className="flex w-full border-b border-gray-300 dark:border-black text-lg font-medium">
              {modes.map((m, index) => (
                <button 
                  key={m}
                  onClick={() => setMode(m)}
                  className={`
                    ${m === mode && 'bg-blue-400 dark:text-blue-500 dark:bg-transparent text-white'} 
                    ${index === 0 ? 'border-r rounded-tl-md' : 'rounded-tr-md'} 
                    py-2 w-full text-center border-gray-300 dark:border-black hover:bg-blue-400 dark:hover:bg-transparent dark:hover:text-blue-500 transition duration-100 ease-in 
                  `}
                >{m}</button>
              ))}
            </div>
            {mode === Mode.USERS && (
              <UsersTable />
            )}
            {mode === Mode.COUNTRIES && (
              <CountriesTable />
            )}
          </div>
        )}
      </div>
    </div>
  )
}