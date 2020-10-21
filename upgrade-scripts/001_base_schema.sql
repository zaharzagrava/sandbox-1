create table client (
 id bigserial primary key,
 full_name varchar(255) not null,
 username VARCHAR(30) unique not null,
 website VARCHAR(255) not null,
 bio VARCHAR(150) not null,
 email varchar(255) unique not null,
 phone_number VARCHAR(255) not null,
 gender VARCHAR(255) not null,
 password varchar(255) not null,
 "createdAt" date,
 "updatedAt" date
);
 
create table comment (
 id bigserial primary key,
 full_text varchar(300),
 "createdAt" date,
 "updatedAt" date
);
 
create table post (
 id bigserial primary key,
 full_text varchar(2200) not null,
 "createdAt" date,
 "updatedAt" date
);
 
create table tag (
 id: bigserial primary key,
 full_name VARCHAR(30) not null unique,
 "createdAt" date,
 "updatedAt" date
);
 
create table hashtag (
 id: bigserial primary key,
 full_name VARCHAR(255) not null unique,
 "createdAt" date,
 "updatedAt" date
);
 
create table hashtag_textsources (
 id bigserial primary key,
 hashtag_id bigint not null references client(id) ON DELETE CASCADE,
 client_id bigint not null references client(id) ON DELETE CASCADE,
 client_field VARCHAR(255) not null,
 post_id bigint not null references post(id) ON DELETE CASCADE,
 post_field VARCHAR(255) not null,
 commend_id bigint not null references comment(id) ON DELETE CASCADE,
 commend_field VARCHAR(255) not null,
 "createdAt" date,
 "updatedAt" date
);
 
create table tag_textsources (
 id bigserial primary key,
 tag_id bigint not null references tag(id) ON DELETE CASCADE,
 client_id bigint not null references client(id) ON DELETE CASCADE,
 client_field VARCHAR(255) not null,
 post_id bigint not null references post(id) ON DELETE CASCADE,
 post_field VARCHAR(255) not null,
 commend_id bigint not null references comment(id) ON DELETE CASCADE,
 commend_field VARCHAR(255) not null,
 "createdAt" date,
 "updatedAt" date
);
 
create TABLE client_post (
 id bigserial primary key,
 client_id bigint not null references client(id) ON DELETE CASCADE,
 post_id bigint not null references post(id) ON DELETE CASCADE,
 is_liked boolean not null,
 is_author boolean not null,
 "createdAt" date,
 "updatedAt" date
);
 
create TABLE client_comment (
 id bigserial primary key,
 client_id bigint not null references client(id) ON DELETE CASCADE,
 comment_id bigint not null references comment(id) ON DELETE CASCADE,
 is_liked boolean not null,
 is_author boolean not null,
 "createdAt" date,
 "updatedAt" date
);
