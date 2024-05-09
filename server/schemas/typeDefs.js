//since authors is in [], is my format for it correct?
const typeDefs = `
    type Book{
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    type User{
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
        bookCount: Int
    }
    type Auth{
        token: ID!
        user: User
    }
    type Query{
        getUserById(userId: ID!): User
    }
    type Mutation{
        saveBookForUser(bookId: ID!, userId: ID!): User
        addUser(username: String!, email: String!, password: String!): Auth
        loginUser(email: String!, password: String!): Auth
        saveBook(input: BookInput!): User
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

module.exports = typeDefs;