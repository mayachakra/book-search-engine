import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
    query getUserById($userId: ID!){
        getUserById(userId: $userId){
            _id
            username
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
