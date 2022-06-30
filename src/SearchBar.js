function SearchBar({setPlatform}){
    const handleSubmit=()=>{
        setPlatform(document.getElementById("selectBox").value)
    }
    
    return(
        <div id="searchContainer">
                <p>Game Platform</p>
                <select onChange={()=>handleSubmit()} id="selectBox">
                    <option value="0">All</option>
                    <option value="4">PC</option>
                    <option value="187">PS5</option>
                    <option value="187">PS4</option>
                    <option value="1">XBOX One</option>
                </select>
        </div>
    )
}

export default SearchBar