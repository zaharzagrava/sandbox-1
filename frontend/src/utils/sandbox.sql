


SELECT
"comments"."id",
"comments"."full_text",
"comments"."createdAt",
"comments"."updatedAt",

"posts"."id" AS "posts.id",
"posts"."full_text" AS "posts.full_text",
"posts"."multimedia" AS "posts.multimedia",
"posts"."createdAt" AS "posts.createdAt",
"posts"."updatedAt" AS "posts.updatedAt",

"posts->posts_comments"."id" AS "posts.posts_comments.id",
"posts->posts_comments"."post_id" AS "posts.posts_comments.post_id",
"posts->posts_comments"."comment_id" AS "posts.posts_comments.comment_id",
"posts->posts_comments"."createdAt" AS "posts.posts_comments.createdAt",
"posts->posts_comments"."updatedAt" AS "posts.posts_comments.updatedAt"

FROM "comments" AS "comments"
INNER JOIN ( "posts_comments" AS "posts->posts_comments" INNER JOIN "posts" AS "posts" ON "posts"."id" = "posts->posts_comments"."post_id") ON "comments"."id" = "posts->posts_comments"."comment_id" AND "posts"."id" = '6';