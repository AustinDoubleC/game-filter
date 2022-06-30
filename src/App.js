import './App.css';
import {useEffect, useState} from "react"
import Game from "./Game"
import Filter from './Filter';
import SearchBar from './SearchBar';
import { motion } from "framer-motion"

function App() {
  const [games,setGames] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeGenre, setActiveGenre] = useState(0)
  const [platform, setPlatform] = useState("0")
  const date = new Date()
  const backdate = new Date(date.setDate(date.getDate() - 30));
  const now = new Date()
  const backDay = backdate.getDate()
  const backMonth = (backdate.getMonth()+1)<10?"0"+(backdate.getMonth()+1).toString():backdate.getMonth()+1
  const backYear = backdate.getFullYear()
  const nowDay  = now.getDate()
  const nowMonth = (now.getMonth()+1)<10?"0"+(now.getMonth()+1).toString():now.getMonth()+1
  const nowYear = now.getFullYear()
  const last = `${backYear}-${backMonth}-${backDay}`
  const today =`${nowYear}-${nowMonth}-${nowDay}`

  useEffect(()=>{
    fetchGames();
    setActiveGenre(0)
  }, [platform])

  const fetchGames = async ()=>{
    const data = await fetch(`https://api.rawg.io/api/games?key=4eea4fb32c3040f0b8f1c37422f78f4f${platform==="0"?"":`&platforms=${platform}`}&dates=${last},${today}`)
    const items = await data.json()
    setGames(items.results)
    setFiltered(items.results)
  }
  return (
    <div className="App">
      <h1>Game list of last 30 days</h1>
      <div id="header">
        <SearchBar setPlatform={setPlatform}/>
        <Filter games={games} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre}/>
      </div>
      <motion.div layout className="popular-movies">
        {filtered.map(game=>{
          return <Game key={game.id} game={game}/>
        })}
      </motion.div>
    </div>
  );
}

export default App;
