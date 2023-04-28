<template>
  <div>
    <h2 class="heading mt-3">Tất cả bài viết</h2>
    <div class="table-wrapper">
      <table class="table px-4">
        <thead class="table__title">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên</th>
            <th scope="col" colspan="1">Xóa</th>
          </tr>
        </thead>
        <tbody class="table__body" v-for="(item, index) in news" :key="index">
          <tr>
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.name }}</td>
            <td colspan="1">
              <a
                href=""
                class="delete__news"
                @click.prevent.stop="deleteNews(item._id)"
              >
                <i class="fa-solid fa-trash"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <form class="post_news" @submit.prevent.stop="postNews">
      <h2 class="heading">Đăng bài viết</h2>
      <h3 class="text-success text-center">{{ message }}</h3>
      <div class="form_news">
        <div class="mb-3 w-100">
          <label class="form-label">Tên bài viết</label>
          <input
            type="text"
            class="form-control"
            placeholder="Nhập tên bài viết"
            name="name"
            v-model="newsLocal.name"
          />

          <label class="form-label mt-2">Hình ảnh</label>
          <input
            type="text"
            class="form-control"
            placeholder="Hình ảnh"
            name="imgUrl"
            v-model="newsLocal.imgUrl"
          />
        </div>
        <div class="mb-3 w-100">
          <label for="exampleFormControlTextarea1" class="form-label"
            >Nội dung bài viết</label
          >
          <textarea
            placeholder="Nội dung"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="description"
            v-model="newsLocal.description"
          ></textarea>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button class="btn btn-outline-info btn-lg mb-4">Đăng bài</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import newsService from "../../services/news.service";
export default {
  data() {
    return {
      news: {},
      newsLocal: {},
      message: "",
    };
  },
  methods: {
    async getNews() {
      this.news = await newsService.fetchNews();
    },
    async postNews() {
      try {
        const result = await newsService.postNews(this.newsLocal);
        if (result.status == 200) {
          this.message = "Đăng bài viết thành công";
          this.newsLocal = {};
          this.getNews();
        }
      } catch (error) {
        print(error);
      }
    },
    async deleteNews(id) {
      if (confirm("Hành động này sẽ xóa vĩnh viễn bài viết")) {
         await newsService.deleteNews(id);
        this.getNews()
      }
    },
  },
  created() {
    this.getNews();
  },
};
</script>

<style lang="css" scoped>
.table-wrapper {
  max-height: 220px;
  width: 100%;
  overflow: auto;
  display: inline-block;
}
.news_title {
  color: #fff;
  text-align: center;
  font-size: 28px;
  margin-bottom: 10px;
}
.form_news {
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
}
label {
  color: #fff;
}
.delete__news {
  color: red;
}
</style>
