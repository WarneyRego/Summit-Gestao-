import { useLocation } from "react-router-dom"
import Loading from "../layouts/Loading"
import Container from "./Container"
import LinkButton from "../layouts/LinkButton"
import styles from './Project.module.css'
import ProjectCard from "./ProjectCard"
import { useState, useEffect } from "react"
import Messages from "../layouts/Messages"


function Projects() {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
     const [projectMessage, setProjectMessage]= useState('')
    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }
    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:3543/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch(err => console.log(err))
        }, 1000);


    }, [])

function removeProject(id){
fetch(`http://localhost:3543/projects/${id}`,{
 method: 'DELETE',
 headers:{
    'Content-Type': 'application/json',
 },


}).then(resp=> resp.json())
.then(data=>{
setProjects(projects.filter((project)=> project.id !== id))
  setProjectMessage('Projeto removido com sucesso')
})
.catch(err=>console.log(err))

}

    return (

        <div>
            <div>
                <h1>Meus projetos</h1>
                <br />
                <LinkButton to='../NewProject' text='Criar projeto' />
            </div>

            {message && <Messages type='sucess' msg={message} />}
            {projectMessage && <Messages type='sucess' msg={projectMessage} />}
            <Container customClass='reserva_start'>
                {projects.length > 0 &&
                    projects.map((project) =>
                        <ProjectCard

                            name={project.name}
                            id={project.id}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removeProject}

                        />
                    )}
                    {!removeLoading && <Loading/>}
                    {removeLoading&& projects.length===0&&(
                        <p>Não há projetos cadastrados!</p>
                    )
                    }
            </Container>
        </div>)
} export default Projects