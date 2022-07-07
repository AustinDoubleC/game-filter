import {motion} from "framer-motion"
function Game({game,setSelectedGame}){

    return(
        <motion.div 
        layout
        className="game">
            <h2>{game.name}</h2>
            <img src={game.background_image} alt="" onClick={()=>{
                setSelectedGame(game)
                document.getElementById("modal-container").style.display="block"
                }} className="game-image"/>
            <p id="rating">Rating: {game.rating?game.rating:"N/A"}</p>
        </motion.div>
    )
}

export default Game