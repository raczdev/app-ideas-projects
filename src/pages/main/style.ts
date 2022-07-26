import styled from "styled-components";

export const Container = styled.div`

    .icon {
        font-size: 1.5rem;
    }

    .check-img {
        max-width: 1.5rem;
    }    

    .new-text {
        color: #6933ff;
    }

    .header-content--title {
        max-width: 75rem;
        padding: 2rem 1rem 2rem;
        margin: 0 auto;

        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;

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

    .title-img {
        display: flex;
        gap: 2rem;
    }

    .header-content--explain {
        max-width: 75rem;
        padding: 2rem 1rem 2rem;
        margin: 0 auto;
    }

    .header-content--action {
        max-width: 75rem;
        padding: 2rem 1rem 2rem;
        margin: 0 auto;

        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
    }

    .my-notes {
        display: flex;
        align-items: center;
        gap: 1rem;

        button {
            height: 2rem;
            padding: 0 1rem;
            border-radius: 0.25rem;
            border: 1px solid #d7d7d7;
            background-color: #6933ff;
            color: #fff;
        }
    }

    .search-notes {
        display: flex;
        align-items: center;
        gap: 1rem;


        input {
            width: 100%;
            height: 2rem;
            padding: 0 1rem;
            border-radius: 0.25rem;
            border: 1px solid #d7d7d7;

        }

        input::placeholder {
            color: #969cb3;
        }
    }

    main {
        max-width: 75rem;
        padding: 2rem 1rem 2rem;
        margin: 0 auto;

        table {
            border-top: .15rem solid #ffffff;
            width: 100%;
            border-spacing: 0 0.5rem;
        }

        th {
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;

            color: #363f5f;
        }

        td {
            padding: 1rem 2rem;
            border: 0;
            border-radius: 0.25rem;

            background-color: #ffffff;
            color: #969cb3;
        }
    }
`;

export const ModalContainer = styled.form`

    display: flex;
    flex-direction: column;

    h2 {
        margin-bottom: 1rem;
    }

    input {
        width: 100%;

        border: 1px solid #d7d7d7;
        padding: .3rem .5rem;
        border-radius: 0.25rem;
        margin-bottom: 1rem;

        font-size: 1rem;

        ::placeholder {
            font-size: 1rem;
        }
    }

    button {

        width: fit-content;
        align-self: flex-end;
        
        background-color: #6933ff;
        color: #fff;
        border-radius: 0.25rem;
        border: 0;
        font-size: 1rem;
        font-weight: 600;
        margin-top: 1.5rem;
        padding: 0.3rem 1.5rem;
    }
`;