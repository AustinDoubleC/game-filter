function Search({setEndDate, setStartDate}) {

const searchDates=()=>{
    const start = document.getElementById("start")
    const end = document.getElementById("end")
    setStartDate(start.value)
    setEndDate(end.value)
}

  return (
    <div id="search-container">
        <p>From: </p>
        <input type="date" id="start"/>
        <p>To: </p>
        <input type="date" id="end"/>
        <button onClick={()=>searchDates()}>search</button>
    </div>
  )
}

export default Search