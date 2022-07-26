import './App.css';
import {useEffect, useState} from "react"
import Game from "./Game"
import Filter from './Filter';
import Select from './Select';
import Search from './Search';
import { motion } from "framer-motion"
import Modal from './Modal';

function App() {
  const now = new Date()
  const nowDayNum = now.getDate()
  const nowMonthNum = now.getMonth()+1
  const nowYear = now.getFullYear()
  const nowDay = nowDayNum<10?`0${nowDayNum.toString()}`:nowDayNum.toString()
  const nowMonth = nowMonthNum<10?`0${nowMonthNum.toString()}`:nowMonthNum.toString()
  const today = `${nowYear}-${nowMonth}-${nowDay}`

  let pass = new Date();
  pass.setDate(pass.getDate() - 6);
  const passDayNum = pass.getDate()
  const passMonthNum = pass.getMonth()+1
  const passYear = pass.getFullYear()
  const passDay = passDayNum<10?`0${passDayNum.toString()}`:passDayNum.toString()
  const passMonth = passMonthNum<10?`0${passMonthNum.toString()}`:passMonthNum.toString()
  const sevenDay = `${passYear}-${passMonth}-${passDay}`
  

  const [startDate, setStartDate] = useState(sevenDay)
  const [endDate, setEndDate] = useState(today)
  const [page, setPage] =useState(1)
  const [prev, setPrev] = useState(false)
  const [next, setNext] = useState(false)
  const [games,setGames] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeGenre, setActiveGenre] = useState(0)
  const [platform, setPlatform] = useState("0")
  const [selectedGame, setSelectedGame] = useState({
    slug:""
  })
  const [gameInfo, setGameInfo] = useState({
    publishers:[],
    platforms:{
      platform:{
        name:""
      }
    }
  })

  useEffect(()=>{
    fetchGames();
    setActiveGenre(0)
  }, [platform, startDate, endDate,page])

  const fetchGames = async ()=>{
    const data = await fetch(`https://api.rawg.io/api/games?key=4eea4fb32c3040f0b8f1c37422f78f4f${platform==="0"?"":`&platforms=${platform}`}&dates=${startDate},${endDate}&page=${page}`)
    const items = await data.json()
    if (items.next){
      setNext(true)
    }else{
      setNext(false)
    }
    if (items.previous){
      setPrev(true)
    }else{
      setPrev(false)
    }
    setGames(items.results)
    setFiltered(items.results)
  }
  return (
    <div className="App">
      <div id="header">
        <Search setStartDate={setStartDate} setEndDate={setEndDate}/>
        <div id="control-container">
          <Select setPlatform={setPlatform}/>
          <Filter games={games} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre}/>
        </div>
      </div>
      <div id="page-control">
        <h3 onClick={()=>page>1?setPage(page-1):setPage(1)}>{prev?"Previous":""}</h3>
        <h3 onClick={()=>setPage(page+1)}>{next?"Next":""}</h3>
      </div>
      <h2>{games.length!==0?`Showing games from ${startDate} to ${endDate}`:"No Results"}</h2>
      <motion.div layout className="popular-games">
        {filtered.map(game=>{
          return <Game key={game.id} game={game} setSelectedGame={setSelectedGame} />
        })}
      </motion.div>
      <div id="modal-container">
        <Modal selectedGame={selectedGame} gameInfo={gameInfo} setGameInfo={setGameInfo} />
      </div>
    </div>
  );
}

export default App;
