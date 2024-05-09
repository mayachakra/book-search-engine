const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require ('apollo-server-express');

const resolvers = {
    Query: {
        getUserById: async (_, {userId}) => {
            const user = await User.findOne({userId});
            if(!user){
                throw new Error('User not found');
            }
            return user;
        },
        
    },
    Mutation: {

        deleteBook: async (_, {bookId, userId}) => {
            const book = await Book.findById(bookId);
            if(!book){
                throw new Error('book not found');
            }
            const user = await User.findByIdAndUpdate(
                userId,
                { $addToSet: {savedBooks: book}},
                { new: true}
            );
            if(!user){
                throw new Error('user not found');
            }
            return user;
        },
        addUser: async (_, { username, email, password }) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);
            return { token, user};
        },
        loginUser: async (_, { email, password }) => {
            const user = await User.create({ email, password});
            if(!user){
                throw new AuthenticationError('No user found');
            }
            const correctPass = await user.isCorrectPassword(password);
            if(!correctPass){
                throw new AuthenticationError('Password Incorrect');
            }
            const token = signToken(user);
            return { token, user};
        },
        saveBook: async (_, {input}, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedBooks: input}},
                    {new: true, runValidators: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in to save books.');
        },
    },
};

module.exports = resolvers;
