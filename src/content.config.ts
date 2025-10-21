// 1. 从 `astro:content` 导入工具函数
import { defineCollection, z } from 'astro:content';

// 2. 导入加载器
import { glob, file } from 'astro/loaders';
const postSchema = z.object({
  title: z.string(),
  location: z.string().optional(),
  date: z.string(),
  cover: z.string().optional(),
  lang: z.string().optional(),
});
// 3. 定义你的集合
const post = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/post/en" }),
  schema: postSchema,
});
const postCN = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/post/zh-CN" }),
  schema: postSchema,
});

// 4. 导出一个 `collections` 对象来注册你的集合
export const collections = { post, postCN };
