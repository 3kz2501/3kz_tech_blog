// scripts/build.js - ESモジュール形式の修正版ビルドスクリプト
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";
import matter from "gray-matter";
import { marked } from "marked";

// ESモジュールで__dirnameを取得する
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 出力ディレクトリの作成
const DIST_DIR = path.join(__dirname, "../dist");
if (!fs.existsSync(DIST_DIR)) {
	fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Markdownファイルを検索
const CONTENT_DIR = path.join(__dirname, "../content/posts");
const mdFiles = await glob(`${CONTENT_DIR}/**/*.md`);

// 記事データとタグマップの初期化
const postsData = [];
const tagMap = {};

// 各Markdownファイルを処理
for (const filePath of mdFiles) {
	// ファイル読み込み
	const fileContent = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(fileContent);

	// slugの生成（ファイル名またはfrontmatterから）
	const fileName = path.basename(filePath, ".md");
	const slug = data.slug || fileName;

	// HTMLへの変換
	const htmlContent = marked(content);

	// 記事データの作成
	const postData = {
		slug,
		title: data.title || "Untitled",
		date: data.date
			? new Date(data.date).toISOString()
			: new Date().toISOString(),
		updated: data.updated ? new Date(data.updated).toISOString() : null,
		tags: Array.isArray(data.tags) ? data.tags : [],
		excerpt:
			data.excerpt ||
			content.slice(0, 150).replace(/[#*`]/g, "").trim() + "...",
		content: htmlContent,
	};

	// タグマップの更新
	postData.tags.forEach((tag) => {
		if (!tagMap[tag]) {
			tagMap[tag] = [];
		}
		tagMap[tag].push(postData.slug);
	});

	postsData.push(postData);
}

// 公開日付でソート（新しい順）
postsData.sort((a, b) => new Date(b.date) - new Date(a.date));

// JSONファイルの作成
const outputData = {
	posts: postsData,
	tags: tagMap,
	generatedAt: new Date().toISOString(),
};

fs.writeFileSync(
	path.join(DIST_DIR, "blog-data.json"),
	JSON.stringify(outputData, null, 2),
);

console.log(`✅ Generated blog data with ${postsData.length} posts`);
