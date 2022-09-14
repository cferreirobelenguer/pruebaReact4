import React,{useRef,useEffect,useState} from "react"



const MostrarTodos=()=>{
    const [datos,setDatos]=useState([])
    const [resultado,setResultado]=useState([])
    const Datousuario = useRef(null);
    const [infoUsu,setInfoUsu]=useState("")
    const [valorFinal, setValorFinal]=useState([])
    const mostrarDatos=()=>{
        fetch("https://swapi.dev/api/people/?page=1")
        .then(res=>res.json())
        .then(data=>{
            setDatos(data)
            setResultado(data.results)
        })

        
    }
    
    useEffect(()=>{
        mostrarDatos()
    }
    ,[]);
    console.log(resultado)
    //Método que llama a la siguiente página de la API
    const buscarNext=()=>{
        const urlNext=datos && datos.next
        console.log("next", urlNext);
        fetch(urlNext)
        .then(res=>res.json())
        .then(data=>{
            setDatos(data)
            setResultado(data.results)
            
        })
    }
    //Método que llama a la anterior página de la API
    const buscarPrevious=()=>{
        const urlPrevious=datos && datos.previous
        console.log("previous", urlPrevious);
        fetch(urlPrevious)
        .then(res=>res.json())
        .then(data=>{
            setDatos(data)
            setResultado(data.results)
        })
    }
    //Método que busca los datos del input en función a los datos de la llamada de la API
    const enviandoDatos=()=>{
        //Se leen los datos a medida que se actualizan en el input
        let info=Datousuario.current.value
        let valores=[]
        setInfoUsu(info)
        for( let i of resultado){
            
            if(i.name.includes(info)){
                valores.push(i.name)
                valores.push(i.gender)
                valores.push(i.birth_year)
            }
        }
        setValorFinal(valores)
        //console.log("El resultado es: "+valorFinal)
    }
    return(
        <section>
            
            {//Se leen los resultados con un map
            resultado.map((i)=>{
                return(
                    <div key={i.name}>
                        <p>{i.name}</p>
                        
                    </div>
                )
            })

            }
            <button className="botonPrev" onClick={buscarPrevious} disabled={!datos.previous}>Anterior</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="botonNext" onClick={buscarNext} disabled={!datos.next}>Siguiente</button>
            <section>
            <br>
            </br>
                <p>
                    <label>Introduce un personaje</label>
                </p>
                <input type="text" ref={Datousuario} onChange={enviandoDatos}></input>
            <br>
            </br>
            <div>{
                infoUsu.length>0?valorFinal.map((j)=>{
                    return(
                        <div key={j.name}>
                            <p>{j}</p>
                        </div>
                    )
                }):"" }
        </div>
        </section>
        </section>
    )
}
export default MostrarTodos