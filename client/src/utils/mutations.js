import { gql } from '@apollo/client';

export const DELETE_BOOK = gql`
mutation DeleteBook($bookId: ID!, $userId: ID!){
    deleteBook(bookId: $bookId, userId: $userId){
        _id
        savedBooks {
            _id
            authors
            description
            bookId
            image
            link
            title
        }
    }
} 
`;

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password){
        token
        user{
            _id
            username
            email
        }
    }
}
`;

export const LOGIN_USER = gql`
mutation LoginUser($email: String!, $password: String!){
    loginUser(email: $email, password: $password){
        token
        user{
            _id
            username
            email
        }
    }
}
`;

export const SAVE_BOOKS = gql`
mutation SaveBook($input: BookInput!){
    saveBook(input: $input){
        _id
        username
        email
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
    }
}

input BookInput {
    bookId: String!
    authors: [String]!
    description: String!
    image: String
    link: String
    title: String!
}

`;