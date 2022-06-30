import {useEffect} from "react"

function Filter({setActiveGenre, activeGenre, setFiltered, games}){

    useEffect(()=>{
        if (activeGenre ===0){
            setFiltered(games)
            return
        }else {
        let filteredGame = []
        //convert genre into single array
        games.forEach(game=>{
            let tempGenre = []
            for (let i=0; i<game.genres.length;i++){
                tempGenre.push(game.genres[i].id)
        }
            if (tempGenre.includes(activeGenre)){
                filteredGame.push(game)
            }
            setFiltered(filteredGame)
        }
        )}
    }, [activeGenre])
    
    return (
        <div className="filter-container">
            <button className={activeGenre ===0?"active":""} onClick={()=>setActiveGenre(0)}>All</button>
            <button className={activeGenre ===4?"active":""} onClick={()=>setActiveGenre(4)}>Action</button>
            <button className={activeGenre ===5?"active":""} onClick={()=>setActiveGenre(5)}>RPG</button>
        </div>
    )
}

export default Filter