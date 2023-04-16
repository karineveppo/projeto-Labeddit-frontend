/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../../components/Header/Header"
import axios from "axios"
import { useContext } from "react"
import {GlobalContext} from "../../context/GlobalContext"
import { ContainerModalStyled , SectionStyled } from "./ModalPostStyled"
import like from "../../assets/like.svg"
import dislike from "../../assets/dislike.svg"
import coments from "../../assets/coments.svg"
import { useState } from "react"
import { BASE_URL } from "../../constants/BASE_URL"

function ModalPost(props){
    const context = useContext(GlobalContext)
    const [post, setPost] = useState({}) //variável para controlar informações da publicação individual
    const [content, setContent] = useState('') //variável para armazenar comentário que será adicionado a publicação

    // useEffect(()=>{
    //     browserPost()
    // },[])

    //renderizar publicação individual
    const browserPost = async()=>{
        try {
            let auxPost = '' //variável auxiliar para armazenar requisição axios
            const response = await axios.get(`${BASE_URL}/posts/${context.urlPost}`,{
                headers:{
                    Authorization:window.localStorage.getItem("TokenApi-Labeddit")
                }})
            auxPost = response.data[0]
            console.log("Post", response.data[0])  
            setPost(auxPost)
        } catch (error) {
            console.log(error)
        }
    }

    //callback para enviar requisição de 'like'
    const likePost = async (postId)=>{
        try {
            let body = {
                like: 1,
            }
            await axios.put(`${BASE_URL}/posts/${postId}/like`,body,{
                headers:{
                    Authorization:window.localStorage.getItem("TokenApi-Labeddit")
                }})
                browserPost()
                props.browserPosts()
        } catch (error) {
            console.log(error)
        }
    }

    //callback para enviar requisição de 'dislike'
    const dislikePost = async (postId)=>{
        try {
            let body = {
                like: 0,
            }
            await axios.put(`${BASE_URL}/posts/${postId}/like`,body,{
                headers:{
                    Authorization:window.localStorage.getItem("TokenApi-Labeddit")
                }})
                browserPost()
                props.browserPosts()
        } catch (error) {
            console.log(error)
        }
    }

    //callback para enviar novo comentário a publicação
    const insertNewComment = async () =>{
        try {          
            let body = {
                content,
            }
            await axios.post(`${BASE_URL}/posts/${context.urlPost}`,body,{
                headers:{
                    Authorization:window.localStorage.getItem("TokenApi-Labeddit")
                }})         
            setContent('')
            browserPost()
            props.browserPosts()
            } catch (error) {
            console.log(error)
        }
    }

    return(
        <>         
            <ContainerModalStyled >
            <Header/>
                <SectionStyled>
                    {/*div relacionada a publicação selecionada */}
                    <div>
                        <article>
                            <p className="subText">Enviado por: {post && post?.creator?.username}</p>
                            <p>{post.content}</p>
                            <p className="menuPost">
                                <span className="subTextBold">
                                    <img src={like} onClick={()=>likePost(post.id)} alt="botão-like"/>
                                    { post.likes}
                                    <img src={dislike} onClick={()=>dislikePost(post.id)} alt="botão-dislike"/> 
                                </span> 
                                <span className="subText">
                                    <img src={coments} alt="botão-comentários" />
                                    {post.comments}
                                </span>
                            </p>
                        </article>
                        <input value={content} onChange={(event)=>setContent(event.target.value)} className="InputPost" placeholder="Escreva seu post..."/>
                        <button onClick={()=>{insertNewComment()}}>Responder</button>
                    </div>

                    {/*div relacionada aos comentários da publicação */}
                    <div>
                        {post && post?.comments_post?.map((comment)=>{return(
                        <article key={comment.id}>
                            {/* Corrigir linha abaixo, para puxar o nome do criador do comentário */}
                            <p className="subText">Enviado por: {comment.username}</p>
                            {console.log("creator",comment )}
                            <p>{comment.content}</p>
                            <p className="menuPost">
                                <span className="subTextBold">
                                    <img src={like} onClick={()=>likePost(comment.id)} alt="botão-like"/>
                                    {comment.likes}
                                    <img src={dislike} onClick={()=>dislikePost(comment.id)} alt="botão-dislike"/> 
                                </span> 
                            </p>
                        </article>
                        )})}
                    </div>
                </SectionStyled>
            </ContainerModalStyled >
        </>
    )
}

export default ModalPost