import { useEffect } from "react"

const Modal =({selectedGame, gameInfo, setGameInfo})=>{

    useEffect(()=>{
        fetchGames()
    },[selectedGame])
    useEffect(()=>{
        document.getElementById("game-description").innerHTML = gameInfo.description
    },[gameInfo])
    
    const fetchGames = async ()=>{
        const data = await fetch(`https://api.rawg.io/api/games/${selectedGame.id}?key=4eea4fb32c3040f0b8f1c37422f78f4f`)
        const items = await data.json()
        setGameInfo(items)
      }
    
    return (


        
        <div id="modal-inner">
            <p onClick={()=>document.getElementById("modal-container").style.display="none"} id="close-modal">close</p>
            <img src={gameInfo.background_image} alt={selectedGame.name} />
            <h2 className="game-title">{selectedGame.name}</h2>
            <p id="publisher-title">Publisher:</p>
            <ul className="publisher">
                {gameInfo.publishers.map(publisher=>(
                            <li>{publisher.name}</li>
                        ))}
            </ul>
            <p id="modal-rating">{gameInfo.rating?"Rating: " + gameInfo.rating:""}</p>
            {gameInfo.background_image_additional?<img src={gameInfo.background_image_additional} alt={selectedGame.name} />:""
            }

            <div id="game-description"></div>
            <a href={gameInfo.website} target="_blank">{gameInfo.website?"Official website":""}</a>
            <a href={gameInfo.metacritic_url} target="_blank">{gameInfo.metacritic_url?"Review":""}</a>
        </div>
    )
}

export default Modal