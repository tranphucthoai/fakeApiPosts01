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
};

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
};

const randomPosts = (categories, authors, n) => {
  if (n <= 0) return [];
  const posts = [];
  const thumbList = [
    'https://f.hubspotusercontent40.net/hubfs/20002096/21-Jul-05-2021-03-03-31-83-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/45.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/12-Jul-05-2021-03-06-05-81-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/18-Jul-05-2021-03-06-50-12-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/16-Jul-05-2021-03-08-31-68-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/23-Jul-05-2021-03-09-29-74-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/41-1.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/51.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/10-Jul-05-2021-03-12-21-03-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/35-1.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/9-Jul-05-2021-03-14-55-24-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/42-1.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/19-Jul-05-2021-03-22-08-59-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/1-Jul-05-2021-03-27-11-61-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/40.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/48.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/3-Jul-05-2021-03-24-28-25-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/30-3.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/28-3.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/11-Jul-05-2021-03-29-29-69-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/2.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/33-2.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/21-Jul-05-2021-03-03-31-83-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/45.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/12-Jul-05-2021-03-06-05-81-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/18-Jul-05-2021-03-06-50-12-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/16-Jul-05-2021-03-08-31-68-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/23-Jul-05-2021-03-09-29-74-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/41-1.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/51.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/10-Jul-05-2021-03-12-21-03-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/35-1.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/9-Jul-05-2021-03-14-55-24-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/42-1.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/19-Jul-05-2021-03-22-08-59-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/1-Jul-05-2021-03-27-11-61-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/40.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/48.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/3-Jul-05-2021-03-24-28-25-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/30-3.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/28-3.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/11-Jul-05-2021-03-29-29-69-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/2.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/33-2.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/21-Jul-05-2021-03-03-31-83-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/45.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/12-Jul-05-2021-03-06-05-81-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/18-Jul-05-2021-03-06-50-12-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/16-Jul-05-2021-03-08-31-68-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/23-Jul-05-2021-03-09-29-74-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/41-1.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/51.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/10-Jul-05-2021-03-12-21-03-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/35-1.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/9-Jul-05-2021-03-14-55-24-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/42-1.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/19-Jul-05-2021-03-22-08-59-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/1-Jul-05-2021-03-27-11-61-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/40.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/48.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/3-Jul-05-2021-03-24-28-25-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/30-3.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/28-3.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/11-Jul-05-2021-03-29-29-69-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/2.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/33-2.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/21-Jul-05-2021-03-03-31-83-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/45.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/12-Jul-05-2021-03-06-05-81-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/18-Jul-05-2021-03-06-50-12-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/16-Jul-05-2021-03-08-31-68-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/23-Jul-05-2021-03-09-29-74-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/41-1.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/51.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/10-Jul-05-2021-03-12-21-03-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/35-1.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/9-Jul-05-2021-03-14-55-24-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/42-1.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/19-Jul-05-2021-03-22-08-59-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/1-Jul-05-2021-03-27-11-61-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/40.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/48.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/3-Jul-05-2021-03-24-28-25-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/30-3.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/28-3.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/11-Jul-05-2021-03-29-29-69-AM.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/2.jpg',
    'https://f.hubspotusercontent40.net/hubfs/20002096/33-2.jpg',
  ];

  for (const category of categories) {
    for (const author of authors) {
      Array.from(new Array(n)).forEach(() => {
        const post = {
          authorId: author.id,
          categoryId: category.id,
          id: faker.datatype.uuid(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          createAt: faker.date.past(),
          updateAt: faker.date.past(),
          thumb: '',
          content: '',
        };
        posts.push(post);
      });
    }
  }

  for (let i = 0; i < posts.length; i++) {
    posts[i].thumb = thumbList[i];
  }

  return posts;
};

const mergeData = (posts, categories, authors) => {
  const dataList = [];

  function getAuthor(id) {
    for (const author of authors) {
      if (author.id == id) {
        return author;
      }
    }
  }

  function getCategory(id) {
    for (const category of categories) {
      if (category.id == id) {
        return category;
      }
    }
  }

  for (const post of posts) {
    // console.log('getAuthor', post);
    Array.from(new Array(1)).forEach(() => {
      const dataItem = {
        authorName: getAuthor(post.authorId).name,
        authorThumb: getAuthor(post.authorId).thumb,
        dataId: post.id,
        categoryName: getCategory(post.categoryId).name,
        categoryColor: getCategory(post.categoryId).backgroundColor,
        title: post.title,
        description: post.description,
        createAt: post.createAt,
        updateAt: post.updateAt,
        thumb: post.thumb,
        content: post.content,
      };
      dataList.push(dataItem);
    });
  }
  return dataList;
};

(() => {
  const authors = randomAuthors(3);
  const categories = randomCategories(3);
  const posts = randomPosts(categories, authors, 9);
  const data = mergeData(posts, categories, authors);

  const db = {
    categories: categories,
    posts: posts,
    authors: authors,
    data: data,
  };

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('generate successfully');
  });
})();
