import request from "./request";

export async function getBlog(page = 1, limit = 10, categoryid = -1) {
  return await request.get("/api/blog", {
    params: {
      page,
      limit,
      categoryid,
    },
  });
}

export async function getBlogType() {
  return await request.get("/api/blogtype");
}

export async function getSingleBlog(id) {
  return await request.get(`/api/blog/${id}`);
}

export async function subComment(commentInfo) {
  return await request.post("/api/comment", commentInfo);
}

export async function getComments(blogid, page = 1, limit = 10) {
  return await request.get("/api/comment", {
    params: {
      page,
      limit,
      blogid,
    },
  });
}
