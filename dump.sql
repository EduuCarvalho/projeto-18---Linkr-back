--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: public.comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."public.comments" (
    id integer NOT NULL,
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    comment text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: public.comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.comments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.comments_id_seq" OWNED BY public."public.comments".id;


--
-- Name: public.following; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."public.following" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    follower_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: public.following_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.following_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.following_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.following_id_seq" OWNED BY public."public.following".id;


--
-- Name: public.hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."public.hashtags" (
    id integer NOT NULL,
    name integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: public.hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.hashtags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.hashtags_id_seq" OWNED BY public."public.hashtags".id;


--
-- Name: public.hashtags_name_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.hashtags_name_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.hashtags_name_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.hashtags_name_seq" OWNED BY public."public.hashtags".name;


--
-- Name: public.likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."public.likes" (
    id integer NOT NULL,
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: public.likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.likes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.likes_id_seq" OWNED BY public."public.likes".id;


--
-- Name: public.post_hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."public.post_hashtags" (
    id integer NOT NULL,
    hashtag_id integer NOT NULL,
    post_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: public.post_hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.post_hashtags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.post_hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.post_hashtags_id_seq" OWNED BY public."public.post_hashtags".id;


--
-- Name: public.posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."public.posts" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    link_id integer NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: public.posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.posts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.posts_id_seq" OWNED BY public."public.posts".id;


--
-- Name: public.public.links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."public.public.links" (
    id integer NOT NULL,
    url text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: public.public.links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.public.links_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.public.links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.public.links_id_seq" OWNED BY public."public.public.links".id;


--
-- Name: public.sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."public.sessions" (
    id integer NOT NULL,
    token text NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: public.sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.sessions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.sessions_id_seq" OWNED BY public."public.sessions".id;


--
-- Name: public.shares; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."public.shares" (
    id integer NOT NULL,
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: public.shares_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.shares_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.shares_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.shares_id_seq" OWNED BY public."public.shares".id;


--
-- Name: public.users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."public.users" (
    id integer NOT NULL,
    name text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    picture_url text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: public.users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.users_id_seq" OWNED BY public."public.users".id;


--
-- Name: public.comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.comments" ALTER COLUMN id SET DEFAULT nextval('public."public.comments_id_seq"'::regclass);


--
-- Name: public.following id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.following" ALTER COLUMN id SET DEFAULT nextval('public."public.following_id_seq"'::regclass);


--
-- Name: public.hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.hashtags" ALTER COLUMN id SET DEFAULT nextval('public."public.hashtags_id_seq"'::regclass);


--
-- Name: public.hashtags name; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.hashtags" ALTER COLUMN name SET DEFAULT nextval('public."public.hashtags_name_seq"'::regclass);


--
-- Name: public.likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.likes" ALTER COLUMN id SET DEFAULT nextval('public."public.likes_id_seq"'::regclass);


--
-- Name: public.post_hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.post_hashtags" ALTER COLUMN id SET DEFAULT nextval('public."public.post_hashtags_id_seq"'::regclass);


--
-- Name: public.posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.posts" ALTER COLUMN id SET DEFAULT nextval('public."public.posts_id_seq"'::regclass);


--
-- Name: public.public.links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.public.links" ALTER COLUMN id SET DEFAULT nextval('public."public.public.links_id_seq"'::regclass);


--
-- Name: public.sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.sessions" ALTER COLUMN id SET DEFAULT nextval('public."public.sessions_id_seq"'::regclass);


--
-- Name: public.shares id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.shares" ALTER COLUMN id SET DEFAULT nextval('public."public.shares_id_seq"'::regclass);


--
-- Name: public.users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.users" ALTER COLUMN id SET DEFAULT nextval('public."public.users_id_seq"'::regclass);


--
-- Data for Name: public.comments; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: public.following; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: public.hashtags; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: public.likes; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: public.post_hashtags; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: public.posts; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: public.public.links; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: public.sessions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: public.shares; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: public.users; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: public.comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.comments_id_seq"', 1, false);


--
-- Name: public.following_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.following_id_seq"', 1, false);


--
-- Name: public.hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.hashtags_id_seq"', 1, false);


--
-- Name: public.hashtags_name_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.hashtags_name_seq"', 1, false);


--
-- Name: public.likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.likes_id_seq"', 1, false);


--
-- Name: public.post_hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.post_hashtags_id_seq"', 1, false);


--
-- Name: public.posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.posts_id_seq"', 1, false);


--
-- Name: public.public.links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.public.links_id_seq"', 1, false);


--
-- Name: public.sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.sessions_id_seq"', 1, false);


--
-- Name: public.shares_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.shares_id_seq"', 1, false);


--
-- Name: public.users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.users_id_seq"', 1, false);


--
-- Name: public.comments comments_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.comments"
    ADD CONSTRAINT comments_pk PRIMARY KEY (id);


--
-- Name: public.following following_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.following"
    ADD CONSTRAINT following_pk PRIMARY KEY (id);


--
-- Name: public.hashtags hashtags_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.hashtags"
    ADD CONSTRAINT hashtags_pk PRIMARY KEY (id);


--
-- Name: public.likes likes_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.likes"
    ADD CONSTRAINT likes_pk PRIMARY KEY (id);


--
-- Name: public.public.links links_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.public.links"
    ADD CONSTRAINT links_pk PRIMARY KEY (id);


--
-- Name: public.post_hashtags post_hashtags_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.post_hashtags"
    ADD CONSTRAINT post_hashtags_pk PRIMARY KEY (id);


--
-- Name: public.posts posts_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.posts"
    ADD CONSTRAINT posts_pk PRIMARY KEY (id);


--
-- Name: public.sessions public.sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.sessions"
    ADD CONSTRAINT "public.sessions_token_key" UNIQUE (token);


--
-- Name: public.users public.users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.users"
    ADD CONSTRAINT "public.users_email_key" UNIQUE (email);


--
-- Name: public.users public.users_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.users"
    ADD CONSTRAINT "public.users_name_key" UNIQUE (name);


--
-- Name: public.users public.users_picture_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.users"
    ADD CONSTRAINT "public.users_picture_url_key" UNIQUE (picture_url);


--
-- Name: public.sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.sessions"
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- Name: public.shares shares_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.shares"
    ADD CONSTRAINT shares_pk PRIMARY KEY (id);


--
-- Name: public.users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.users"
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: public.comments comments_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.comments"
    ADD CONSTRAINT comments_fk0 FOREIGN KEY (post_id) REFERENCES public."public.posts"(id);


--
-- Name: public.comments comments_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.comments"
    ADD CONSTRAINT comments_fk1 FOREIGN KEY (user_id) REFERENCES public."public.users"(id);


--
-- Name: public.following following_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.following"
    ADD CONSTRAINT following_fk0 FOREIGN KEY (user_id) REFERENCES public."public.users"(id);


--
-- Name: public.following following_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.following"
    ADD CONSTRAINT following_fk1 FOREIGN KEY (follower_id) REFERENCES public."public.users"(id);


--
-- Name: public.likes likes_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.likes"
    ADD CONSTRAINT likes_fk0 FOREIGN KEY (post_id) REFERENCES public."public.posts"(id);


--
-- Name: public.likes likes_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.likes"
    ADD CONSTRAINT likes_fk1 FOREIGN KEY (user_id) REFERENCES public."public.users"(id);


--
-- Name: public.post_hashtags post_hashtags_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.post_hashtags"
    ADD CONSTRAINT post_hashtags_fk0 FOREIGN KEY (hashtag_id) REFERENCES public."public.hashtags"(id);


--
-- Name: public.post_hashtags post_hashtags_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.post_hashtags"
    ADD CONSTRAINT post_hashtags_fk1 FOREIGN KEY (post_id) REFERENCES public."public.posts"(id);


--
-- Name: public.posts posts_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.posts"
    ADD CONSTRAINT posts_fk0 FOREIGN KEY (user_id) REFERENCES public."public.users"(id);


--
-- Name: public.sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.sessions"
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY (user_id) REFERENCES public."public.users"(id);


--
-- Name: public.shares shares_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.shares"
    ADD CONSTRAINT shares_fk0 FOREIGN KEY (post_id) REFERENCES public."public.posts"(id);


--
-- Name: public.shares shares_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.shares"
    ADD CONSTRAINT shares_fk1 FOREIGN KEY (user_id) REFERENCES public."public.users"(id);


--
-- PostgreSQL database dump complete
--

