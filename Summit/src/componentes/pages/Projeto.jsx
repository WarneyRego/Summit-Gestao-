import styles from './Projeto.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layouts/Loading';
import Container from './Container';
import Projectform from '../projects/Projectform';
import Messages from '../layouts/Messages';
import ServiceForm from '../Services/ServiceForm';
import { parse, v4 as uuidv4 } from 'uuid';
import ServiceCard from '../Services/ServiceCard';
function Projeto() {
    const { id } = useParams();
    const [btnText] = useState(["Editar projeto"]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [project, setProject] = useState([]);
    const [services, setService] = useState([]);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    const [showServiceForm, setShowServiceForm] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:3543/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data);
                    setService(data.services);
                })
                .catch(err => {
                    setMessage('Erro ao carregar os dados do projeto');
                    setType('error');
                });
        }, 1000);
    }, [id]);

    function editPost(project) {
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!');
            setType('error');
            return false;
        }

        fetch(`http://localhost:3543/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then((data) => {
                setMessage('')
                setProject(data);
                setShowProjectForm(false);
                setMessage('Projeto atualizado com sucesso!');
                setType('success');
            })
            .catch(err => {
                setMessage('Erro ao atualizar o projeto');
                setType('error');
            });
    }
    function removeService(id, cost) {
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        );
    
        const projectUpdated = { ...project };
        projectUpdated.services = servicesUpdated;
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);
    
        fetch(`http://localhost:3543/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(projectUpdated);
                setService(servicesUpdated);
                setMessage('Serviço removido com sucesso');
                setType('success');
            })
            .catch((err) => console.log(err));
    }
    

    function createService(project) {
        const lastService = project.services[project.services.length - 1];
        lastService.id = uuidv4();
        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);
        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado');
            setType('error');
            project.services.pop();
            return false;
        }

        project.cost = newCost;

        fetch(`http://localhost:3543/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setShowServiceForm(false)
            })
            .catch(err => console.log(err));
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column_reserva">
                        {message && <Messages type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>{project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p><span>Categoria:</span> {project.category.name}</p>
                                    <p><span>Total de Orçamento:</span> R${project.budget}</p>
                                    <p><span>Total utilizado:</span> R${project.cost}</p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <Projectform
                                        handleSubmit={editPost}
                                        projectData={project}
                                        btnText="Concluir alterações"
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText='Adicionar serviço'
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <div>
                            <Container customClass="reserva_start">
                                {services.length > 0 &&
                                    services.map((service) => (
                                        <ServiceCard

                                            id={service.id}
                                            name={service.name}
                                            cost={service.cost}
                                            description={service.description}
                                            key={service.id}
                                            handleRemove={removeService} />
                                    ))
                                }
                                {services.length === 0 && <p>
                                    Não há serviços cadastrados!</p>}
                            </Container>
                        </div>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Projeto;
