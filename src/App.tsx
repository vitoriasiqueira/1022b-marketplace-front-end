import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './App.css'

type ProdutoType = {
  id:number,
  nome:string,
  descricao:string,
  preco:string,
  imagem:string
}
function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  //useEffect(O QUe fazer, Quando Fazer)
  useEffect(()=>{
    fetch("http://localhost:8000/produtos")
    .then(resposta=>resposta.json())
    .then(dados=>setProdutos(dados))
  },[])
  function handleExcluir(id:number){
    fetch(`http://localhost:8000/produtos/${id}`,{
      method:"DELETE"
    })
    .then(resposta=>{
      if(resposta.status==200){
        alert("Excluído com sucesso")
        window.location.reload()
      }
      else{
        alert("Erro ao excluir")
      }
    })
  }

  return (
    <>  
      <main className="container-produtos">
        {produtos.map(prod=>{
          return(
            <div key={prod.id} className="produto-item">
              <h1>{prod.nome}</h1>
              <img src={prod.imagem} alt="Imagem de celular" />
              <p>{prod.preco}</p>
              <p>{prod.descricao}</p>
              <button onClick={()=>{handleExcluir(prod.id)}}>Excluir</button>
              <Link to={`/alterar-produto/${prod.id}`}>Alterar</Link>
            </div>
          )
        })}
      </main>
      
    </>
  )
}

export default App