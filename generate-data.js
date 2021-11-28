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
    'https://webcongnghe247.com/wp-content/uploads/2021/08/hinh-nen-may-tinh-dep-chu-de-thien-nhien-22-1400x788.jpg',
    'https://hanoispiritofplace.com/wp-content/uploads/2017/12/thien-nhien-dep-15.jpg',
    'https://hanoispiritofplace.com/wp-content/uploads/2017/12/hinh-nen-thien-nhien-4k-19.jpg',
    'https://hanoispiritofplace.com/wp-content/uploads/2017/12/hinh-nen-thien-nhien-4k-62.jpg',
    'https://upanh123.com/wp-content/uploads/2020/10/hinh-nen-thien-nhien-4k1-1.jpg',
    'https://hanoispiritofplace.com/wp-content/uploads/2017/12/thien-nhien-dep-39.jpg',
    'https://supperclean.vn/wp-content/uploads/2021/01/386f47c88a7aaa497ec6edc1c02cc9b6-scaled.jpg',
    'https://i.pinimg.com/originals/25/95/e1/2595e124451e10fda4a61fa300af6b61.jpg',
    'https://i.pinimg.com/originals/3d/c4/49/3dc449b04d9ace524a0ecd247e1fdc83.png',
    'https://img5.thuthuatphanmem.vn/uploads/2021/08/25/hinh-nen-may-tinh-4k-anime_084703472.jpg',
    'https://wallpaperaccess.com/full/2159510.jpg',
    'https://wallpaperaccess.com/full/158939.jpg',
    'https://i.pinimg.com/originals/32/fa/eb/32faeb43d120d7397e0e5bd79da69212.jpg',
    'https://i.pinimg.com/originals/15/71/05/15710504898649f93190a5626de1a74c.jpg',
  ];

  for (const category of categories) {
    for (const author of authors) {
      for (const thumbTempalte of thumbList) {
        Array.from(new Array(n)).forEach(() => {
          const post = {
            authorId: author.id,
            categoryId: category.id,
            id: faker.datatype.uuid(),
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            createAt: faker.date.past(),
            updateAt: faker.date.past(),
            thumb: thumbTempalte,
            content: '',
          };
          posts.push(post);
        });
      }
    }
  }

  return posts;
};

(() => {
  const authors = randomAuthors(3);
  const categories = randomCategories(3);
  const posts = randomPosts(categories, authors, 1);

  const db = {
    categories: categories,
    posts: posts,
    authors: authors,
  };

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('generate successfully');
  });
})();
