function Pokemon({name , image}){
    return(
        <div>
            <div>name : {name}</div>
            <div><img src={image} alt="" /></div>
        </div>
    )
}

export default Pokemon