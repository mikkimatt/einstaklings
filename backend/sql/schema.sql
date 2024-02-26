CREATE TABLE if not exists public.categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255)
);

CREATE TABLE if not exists public.quizzes (
    quiz_id INT PRIMARY KEY,
    category_id INT,
    quiz_name VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE if not exists public.questions (
    question_id INT PRIMARY KEY,
    quiz_id INT,
    question_text VARCHAR(255),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id)
);

CREATE TABLE if not exists public.answers (
    answer_id INT PRIMARY KEY,
    question_id INT,
    answer_text VARCHAR(255),
    is_correct BOOLEAN,
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

CREATE TABLE if not exists public.users (
  ID SERIAL PRIMARY KEY,
  name text not null unique,
  password text not null,
  email VARCHAR(30)
);
