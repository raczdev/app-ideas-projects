import styled from "styled-components";

export const Container = styled.div`

    header {
        
    }

    .header-content {
        max-width: 75rem;
        padding: 2rem 1rem 2rem;
        margin: 0 auto;

        display: flex;
        flex-direction: column;
        gap: 2rem;


        h1 {
            text-align: center;
        }
    
        h2 {
            width: fit-content;
            position: relative;
            text-align: start;
        }

        h2::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 0.2rem;
            left: 0;
            bottom: 0;
            background-color: black;

            transform: scale(0.1, 1);
            transform-origin: 0% 100%;
            transition: transform 0.5s ease;
        }

        h2:hover::after {
            transform: scale(1, 1);
        }
    }


    main {
        max-width: 75rem;
        padding: 2rem 1rem 2rem;
        margin: 0 auto;
    }

    .main-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
        gap: 3rem;        
    }


`;