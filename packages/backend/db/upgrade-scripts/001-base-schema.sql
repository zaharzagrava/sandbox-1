create table _meta ()

create table client (
  id uuid primary key,
  full_name varchar(255) null,
  username varchar(30) unique not null,
  website varchar(255) null,
  bio varchar(150) null,
  avatar varchar(255) null,
  email varchar(255) unique not null,
  phone_number varchar(255) unique null,
  gender varchar(255) null,
  is_disabled boolean null,
  password varchar(255) not null,
  confirmed_at timestamptz not null,
  created_at timestamptz not null,
);

create table comment (
  id uuid primary key,
  text varchar(300) not null,
  created_at timestamptz not null
);

create table post (
  id uuid primary key,
  text varchar(2200) not null,
  multimedia varchar[](255) not null,
  created_at timestamptz not null
);

create client_comment (
  id uuid primary key,
  client_id bigint not null references client(id) ON DELETE CASCADE,
  comment_id bigint not null references task(id) ON DELETE CASCADE,
  is_liked boolean null,
  is_author boolean null
);

create client_post (
  id uuid primary key,
  client_id bigint not null references client(id) ON DELETE CASCADE,
  post_id bigint not null references task(id) ON DELETE CASCADE,
  is_liked boolean null,
  is_author boolean null,
  created_at timestamptz not null
);

create post_comment (
  id uuid primary key,
  client_id bigint not null references client(id) ON DELETE CASCADE,
  post_id bigint not null references task(id) ON DELETE CASCADE,
);
