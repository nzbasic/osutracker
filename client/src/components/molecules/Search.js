import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import TrackedContainer from '../molecules/TrackedContainer.js'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Search({items, isLoading}) {

    const [searchTerm, setSearchTerm] = useState("")

    const editSearchTerm = (e) => {
        setSearchTerm(e.target.value)
    }

    const dynamicSearch = () => {
        let filter = items.filter((name) =>
          name.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        return filter
    }

    return isLoading ? 
    (
        <div className="flex justify-center">
            <CircularProgress /> 
        </div>
    )
    :
    (
        <div>
            <TextField 
                variant="outlined" 
                label="Player or Country" 
                fullWidth={true} 
                value={searchTerm} 
                onChange={editSearchTerm} />
            <TrackedContainer items={dynamicSearch()} />
        </div>
    )
}

