const faker = require('faker');
const fs = require('fs');

const randomAuthors = (n) => {
    if (n <= 0) return [];
    const authors = [];

    Array.from(new Array(n)).forEach(() => {
        const author = {
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
            thumb: faker.image.avatar(),
        };
        authors.push(author);
    });
    return authors;
}

const randomCategories = (n) => {
    if (n <= 0) return [];
    const categories = [];

    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            backgroundColor: faker.vehicle.color(),
        };
        categories.push(category);
    });
    return categories;
}

const randomPosts = (categories, authors, n) => {
    if (n <= 0) return [];
    const posts = [];

    for (const category of categories) {
        for (const author of authors) {
            Array.from(new Array(n)).forEach(() => {
                const post = {
                    authorId: author.id,
                    categoryId: category.id,
                    id: faker.datatype.uuid(),
                    title: faker.lorem.sentence(),
                    description: faker.lorem.paragraph(),
                    createAt: Date.now(),
                    updateAt: Date.now(),
                    thumb: faker.image.imageUrl(1920, 1080),
                    content: "",
                };
                posts.push(post);
            });
        }
    }
    return posts;
}

(() => {

    const authors = randomAuthors(3);
    const categories = randomCategories(3);
    const posts = randomPosts(categories, authors, 20);

    const db = {
        categories: categories,
        posts: posts,
        authors: authors
    };

    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log("generate successfully");
    });
})()