import styles from './NewProject.module.css'
import Projectform from '../projects/Projectform';
import { useNavigate } from "react-router-dom";
function NewProject(){

    const navigate = useNavigate()
    function createPost(project) {
        project.services = [];
        project.cost = 0;
    
        fetch("http://localhost:3543/projects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => {
            if (!resp.ok) {
               
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            return resp.json(); 
        })
        .then((data) => {
            
            const state = { message: "Projeto criado com sucesso!" };
            navigate("/projects", {state});
           

           
        })
        .catch((err) => {
            console.error("Erro:", err.message);  
        });
    }
    return (
        <div className={styles.newproject_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            
            <Projectform btnText="Criar projeto" handleSubmit={createPost}/>
        </div>
    )
}export default NewProject;