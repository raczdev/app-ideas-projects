import { Link } from "react-router-dom"
import { ShowProject } from "../show-project"
import { Container } from "./style"
import notesImg from "../../assets/notesWebsite.png"

export function MainPage () {
    return (
        <Container>
            <header>
                <div className="header-content">
                    <h1>App Ideas Collection </h1>
                    <h2>Projects</h2>
                </div>
            </header>
            <main>
                <div className="main-content">
                    <Link to="/notes-app">
                        <ShowProject image={notesImg} title="Notes app" />
                    </Link>
                </div>
            </main>
        </Container>
    )
}