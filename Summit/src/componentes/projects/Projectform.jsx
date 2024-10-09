import styles from './Projectform.module.css'
import Input from '../form/input'
import Select from '../form/Select'
import Submit from '../form/Submit'
import { useState, useEffect } from 'react'

function Projectform({ handleSubmit, projectData,btnText }) {  
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});
    
    useEffect(() => {
        fetch("http://localhost:3543/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    };

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value });
    }

    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,  
            },
        });
    }

    return (
        <div>
            <form onSubmit={submit} className={styles.form}>
                <Input
                    type="text"
                    text="Nome do projeto"
                    name="name"
                    placeholder="Insira o nome do projeto"
                    handleOnChange={handleChange}
                    value={project.name ? project.name : ''}
                />

                <Input
                    type="number"
                    text="Orçamento do projeto"
                    name="budget"
                    placeholder="Insira o orçamento total"
                    handleOnChange={handleChange}
                    value={project.budget || ''}
                />

                <Select
                    name="category_id"
                    text="Selecione uma categoria"
                    options={categories}
                    handleOnChange={handleCategory}
                    value={project.category ? project.category.id : ''}
                />
                      
                <Submit type="submit"  text={btnText}  />
            </form>
        </div>
    );
}

export default Projectform;