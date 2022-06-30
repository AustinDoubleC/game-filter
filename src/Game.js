import {motion} from "framer-motion"
function Game({game}){
    return(
        <motion.div 
        layout
        className="movie">
            <h2>{game.name}</h2>
            <img src={game.background_image} alt=""/>
            <p id="rating">Rating: {game.rating}</p>
        </motion.div>
    )
}

export default Game