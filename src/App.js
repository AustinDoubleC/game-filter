import './App.css';
import {useEffect, useState} from "react"
import Game from "./Game"
import Filter from './Filter';
import Select from './Select';
import Search from './Search';
import { motion } from "framer-motion"
import Modal from './Modal';

function App() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
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
    if (items.prev){
      setPrev(true)
    }else{
      setPrev(false)
    }
    setGames(items.results)
    setFiltered(items.results)
  }
  return (
    <div className="App">
      <h1>Game searcher</h1>
      <div id="header">
        <Search setStartDate={setStartDate} setEndDate={setEndDate}/>
        <div id="control-container">
          <Select setPlatform={setPlatform}/>
          <Filter games={games} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre}/>
        </div>
      </div>
      <h3 onClick={()=>page>1?setPage(page-1):setPage(1)}>{prev?"Previous":""}</h3>
      <h3 onClick={()=>setPage(page+1)}>{next?"Next":""}</h3>
      <h2>{games.length!==0?"":"No Results"}</h2>
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
