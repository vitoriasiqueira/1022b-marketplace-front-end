import { FormEvent, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroProduto(){
    const navigate = useNavigate();
    const [id,setId] = useState("")
    const [descricao,setDescricao] = useState("")
    const [nome,setNome] = useState("")
    const [preco,setPreco] = useState("")
    const [imagem,setImagem] = useState("")

    function handleForm(event:FormEvent){
        event.preventDefault();
        console.log("Tentei cadastrar produtos");
        const produto = {
            id: id,
            nome: nome,
            descricao: descricao,
            preco: preco,
            imagem: imagem
        }
        fetch("http://localhost:8000/produtos",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        }).then(response => {
            if(response.status === 200){
                alert("Produto cadastrado com sucesso")
                navigate("/")
            }
            else{
                alert("Erro ao cadastrar produto")
            }
        })
    }
    function handleId(event:ChangeEvent<HTMLInputElement>){
        setId(event.target.value)
    }
    function handleDescricao(event:ChangeEvent<HTMLInputElement>){
        setDescricao(event.target.value)
    }
    function handlePreco(event:ChangeEvent<HTMLInputElement>){
        setPreco(event.target.value)
    }
    function handleNome(event:ChangeEvent<HTMLInputElement>){
        setNome(event.target.value)
    }
    function handleImagem(event:ChangeEvent<HTMLInputElement>){
        setImagem(event.target.value)
    }

    return(
        <>
        <main>
            <h1>Tela Cadastro Produtos</h1>
            <form onSubmit={handleForm}>
                <div>
                    <label htmlFor="id">id</label>
                    <input type="text" name="id" onChange={handleId} />
                </div>
                <div>
                    <label htmlFor="nome">nome</label>
                    <input type="text" name="nome" onChange={handleNome} />
                </div>
                <div>
                    <label htmlFor="descricao">descricao</label>
                    <input type="text" name="descricao" onChange={handleDescricao} />
                </div>
                <div>
                    <label htmlFor="preco">preço</label>
                    <input type="text" name="preco" onChange={handlePreco} />
                </div>
                <div>
                    <label htmlFor="imagem">imagem</label>
                    <input type="text" name="imagem" onChange={handleImagem}/>
                </div>
                <div>
                    <input type="submit" value="Cadastrar"/>
                </div>
            </form>
            </main>
        </>
    )
}