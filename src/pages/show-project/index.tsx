import { Container } from "./style";

interface ProjectsProps {
    image: string,
    title: string,
}

export function ShowProject (props: ProjectsProps) {
    return (
        <Container>
            <div>
                <img src={props.image} alt={props.title} />
                <h3>{props.title}</h3>
            </div>
        </Container>
    )
}