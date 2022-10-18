const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const gql = require("graphql-tag");
const { buildASTSchema } = require("graphql");

const schema = buildASTSchema(gql`
    input ProductInput {
        name: String!
    }

    type Product {
        id: Float!,
        name: String!
    }

    type CartItem {
        id: Float!,
        quantity: Float!
    }

    type Mutation {
        createProduct(input: ProductInput!): Product
        deleteProduct(id: Float!): Boolean
        addToCart(id: Float!, quantity: Float!): [CartItem]
        removeFromCart(id: Float!): [CartItem]
    }

    type Query {
        getProduct(id: Float!): Product
        getCart: [CartItem]
    }
`);

class Product {
    constructor(id, input) {
        Object.assign(this, input)
        this.id = id;
    }
}

class CartItem {
    constructor(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }
}

let products = [
    new Product(1, { name: "TEST" })
];

let cart = [
    new CartItem(1, 20)
];

const genUniqId = (source) => {
    let id;
    do {
        id = Math.round(Math.random() * 100000);
    } while (id in source);
    return id;
}

const root = {
    createProduct: (input) => {
        const id = genUniqId(products);
        const product = new Product(id, input);
        products.push(product);
        return product;
    },
    deleteProduct: ({ id }) => {
        const origLength = products.length;
        products = products.filter(p => p.id !== id);
        return origLength > products.length;
    },
    getProduct: ({ id }) => {
        return products.find(p => p.id === id) ?? null;
    },
    addToCart: ({ id, quantity }) => {
        let itemExists = false;
        cart.map(i => {
            if (i.id === id) {
                i.quantity += quantity;
                itemExists = true;
            }
        });
        if (!itemExists) {
            cart.push( new CartItem(id, quantity) );
        }
        return cart;
    },
    removeFromCart: ({ id }) => {
        cart = cart.filter(i => i.id === id);
        return cart;
    },
    getCart: () => {
        console.log(cart)
        return cart;
    }
};


const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(3010);
