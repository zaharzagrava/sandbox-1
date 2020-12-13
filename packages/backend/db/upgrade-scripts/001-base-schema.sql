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

create hashtag (
  id uuid primary key,
  text varchar(255) not null
);

create client_comment (
  id uuid primary key,
  client_id uuid not null references client(id) ON DELETE CASCADE,
  comment_id uuid not null references task(id) ON DELETE CASCADE,
  is_liked boolean null,
  is_author boolean null
);

create client_post (
  id uuid primary key,
  client_id uuid not null references client(id) ON DELETE CASCADE,
  post_id uuid not null references task(id) ON DELETE CASCADE,
  is_liked boolean null,
  is_author boolean null,
  created_at timestamptz not null
);

create post_comment (
  id uuid primary key,
  client_id uuid not null references client(id) ON DELETE CASCADE,
  post_id uuid not null references post(id) ON DELETE CASCADE
);

create hashtag_client (
  id uuid primary key,
  client_id uuid not null references client(id) ON DELETE CASCADE,
  tag_id uuid not null references hashtag(id) ON DELETE CASCADE,
  is_following boolean null
);

create hashtag_comment (
  id uuid primary key,
  post_id uuid not null references post(id) ON DELETE CASCADE,
  hashtag_id uuid not null references hashtag(id) ON DELETE CASCADE
);

create hashtag_post (
  id uuid primary key,
  post_id uuid not null references post(id) ON DELETE CASCADE,
  tag_id uuid not null references hashtag(id) ON DELETE CASCADE
);
