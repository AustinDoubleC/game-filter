function Search({setEndDate, setStartDate}) {

const searchDates=()=>{
    const start = document.getElementById("start")
    const end = document.getElementById("end")
    if(end.value>=start.value){
    setStartDate(start.value)
    setEndDate(end.value)
    document.getElementById("message").innerText=""
    }else{
        document.getElementById("message").innerText="end date cannot be earlier than start date"
    }
}

  return (
    <div id="search-outer">
    <div id="search-container">
            <div class="search-date-container">
              <p class="search-label">From: </p>
              <input type="date" id="start"/>
            </div>
            <div class="search-date-container">
              <p class="search-label">To: </p>
              <input type="date" id="end"/>
            </div>
            <button onClick={()=>searchDates()}>search</button>
    </div>
    <p id="message"></p>
    </div>
  )
}

export default Search