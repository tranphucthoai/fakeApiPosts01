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
    'https://luv.vn/wp-content/uploads/2021/02/Hinh-anh-dep-nhat-qua-dat-dep-nhat-the-gioi-3-1024x576.jpg',
    'https://noitoiseden.com/wp-content/uploads/2018/09/anh-thien-nhien-full-hd-2k-4k.jpg',
    'https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg',
    'https://images.tuyensinh247.com/picture/2021/0801/tu-vi-12-cung-hoang-dao-2-8-2021.jpg',
    'https://1.bp.blogspot.com/-1zOmpk9pJOM/XpKk8Ke3MPI/AAAAAAAAAHc/KtCuKZm0TqgrKgCzs61lIyCBasQP0sjEgCLcBGAsYHQ/s1600/tai-anh-binh-minh-dep-nhat-hinh-nen-canh-binh-minh%2B%25286%2529.jpg',
    'https://1.bp.blogspot.com/-fgEttlSY10A/XpRnJP3YHWI/AAAAAAAAALE/2uhoknTLagw0j0JNjXHp0uFWyo4UKxdqwCLcBGAsYHQ/s1600/hinh-nen-may-tinh-phong-canh-thien%2B%25281%2529.jpg',
    'https://hinhanhdep.vn/wp-content/uploads/2019/05/hinh-anh-dep-lam-hinh-nen-dep-37-min.jpg',
    'https://files.vfo.vn/2015/T10/img/vforum.vn-233771-autumn-1.jpg',
    'https://i.pinimg.com/736x/32/6b/ba/326bba218031866dd5f4caa7aae4bfda.jpg',
    'https://tophinhanhdep.com/wp-content/uploads/2021/10/2560X1440-Wallpapers-1024x576.jpg',
    'https://img.hedieuhanh.com/wp-content/uploads/2019/10/bo-anh-dep-thien-nhien-voi-phong-canh-dep-25.jpg',
    'https://i.pinimg.com/originals/76/99/64/769964bff922a4e384c1b4d003702f11.png',
    'https://thuthuatnhanh.com/wp-content/uploads/2020/09/tai-anh-game-4k-ban-sung-doi-khang.jpg',
    'https://asean2010.vn/wp-content/uploads/2020/04/hinh-nen-may-tinh-chat-6.jpg',
    'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-4k-chien-dau-trong-game.jpg',
    'https://msmobile.com.vn/upload_images/images/hinh-nen-game-dep-cho-may-tinh-1.png',
    'https://luv.vn/wp-content/uploads/2021/02/Hinh-anh-nen-may-tinh-dep-ve-thien-nhien-phong-canh-12-1024x576.jpg',
    'https://cuocsongaz.com/wp-content/uploads/2020/03/15-hinh-nen-dep-y-nghia-ve-cuoc-song-hinh-nen-cuoc-song-1.jpg',
    'https://lava.com.vn/wp-content/uploads/2021/09/hinh-nen-galaxy-may-tinh-20.jpg',
    'https://gvn360.com/wp-content/uploads/2020/07/Gearvn_v%C5%A9-tr%E1%BB%A5-m%E1%BB%9Bi_-3.jpg',
    'https://gvn360.com/wp-content/uploads/2020/07/Gearvn_v%C5%A9-tr%E1%BB%A5-m%E1%BB%9Bi_-4-2048x1152.jpg',
    'https://gvn360.com/wp-content/uploads/2020/07/Gearvn_v%C5%A9-tr%E1%BB%A5-m%E1%BB%9Bi_-5-2048x1152.jpg',
    'https://gvn360.com/wp-content/uploads/2020/07/Gearvn_v%C5%A9-tr%E1%BB%A5-m%E1%BB%9Bi_-6-2048x1136.jpg',
    'https://gvn360.com/wp-content/uploads/2020/07/Gearvn_v%C5%A9-tr%E1%BB%A5-m%E1%BB%9Bi_-7-2048x1152.jpg',
    'https://gvn360.com/wp-content/uploads/2020/07/Gearvn_v%C5%A9-tr%E1%BB%A5-m%E1%BB%9Bi_-9-2048x1152.jpg',
    'https://gvn360.com/wp-content/uploads/2020/07/Gearvn_v%C5%A9-tr%E1%BB%A5-m%E1%BB%9Bi_-8-2048x1365.jpg',
    'https://gvn360.com/wp-content/uploads/2020/07/Gearvn_v%C5%A9-tr%E1%BB%A5-m%E1%BB%9Bi_-12-2048x1280.jpg',
    'https://gvn360.com/wp-content/uploads/2020/07/Gearvn_v%C5%A9-tr%E1%BB%A5-m%E1%BB%9Bi_-13-1-2048x1280.jpg',
    'https://gvn360.com/wp-content/uploads/2020/07/Gearvn_v%C5%A9-tr%E1%BB%A5-m%E1%BB%9Bi_-14.jpg',
    'https://gvn360.com/wp-content/uploads/2020/07/Gearvn_v%C5%A9-tr%E1%BB%A5-m%E1%BB%9Bi_-16-2048x1152.jpg',
    'https://gvn360.com/wp-content/uploads/2020/07/Gearvn_v%C5%A9-tr%E1%BB%A5-m%E1%BB%9Bi_-17-2048x1280.jpg',
    'https://gvn360.com/wp-content/uploads/2020/07/Gearvn_v%C5%A9-tr%E1%BB%A5-m%E1%BB%9Bi_-19-2048x1152.jpg',
    'https://gvn360.com/wp-content/uploads/2020/07/Gearvn_v%C5%A9-tr%E1%BB%A5-m%E1%BB%9Bi_-20-2048x1152.jpg',
    'https://gvn360.com/wp-content/uploads/2020/07/Gearvn_v%C5%A9-tr%E1%BB%A5-m%E1%BB%9Bi_-21-2048x1152.jpg',
    'https://maytinhvui.com/wp-content/uploads/2021/02/Hinh-nen-mac-book-21-min.jpg',
    'https://maytinhvui.com/wp-content/uploads/2021/02/Hinh-nen-mac-book-15-min.jpg',
    'https://hanoispiritofplace.com/wp-content/uploads/2018/07/hinh-nen-macbook-4k-dep-lung-linh-42-1.jpg',
    'https://2.bp.blogspot.com/-yNFb_4CDX2I/UZCLpmW0_QI/AAAAAAAAIjU/fLDk70peB0c/s1600/hinh-anh-song-bien-1.jpg',
    'https://dienthoaivui.com.vn/wp-content/uploads/2021/02/hinh-nen-macbook-26-min.jpg',
    'https://scr.vn/wp-content/uploads/2020/07/H%C3%ACnh-n%E1%BB%81n-%C4%91%E1%BA%B9p-ch%E1%BA%A5t-l%C6%B0%E1%BB%A3ng-cao-cho-PC-scaled.jpg',
    'https://i.pinimg.com/736x/33/05/62/3305621b498a01f67087f67822f65fc5.jpg',
    'https://i.pinimg.com/originals/5f/cc/80/5fcc80e2a77a4ce69467ea7f08e49fea.png',
    'https://i.pinimg.com/originals/6f/ab/09/6fab09b5bd91ad8a94dde87cdb90b760.jpg',
    'https://thuthuatnhanh.com/wp-content/uploads/2021/02/hinh-nen-may-tinh-full-HD-cuc-an-tuong.jpg',
    'https://st.quantrimang.com/photos/image/2021/07/14/Hinh-nen-vu-tru-pc-1.jpg',
    'https://hanoispiritofplace.com/wp-content/uploads/2018/01/hinh-nen-vu-tru-2.jpg',
    'https://toigingiuvedep.vn/wp-content/uploads/2021/05/hinh-nen-vu-tru-1.jpg',
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
