CREATE TABLE translations (
    id int PRIMARY KEY,
    language varchar(255),
    content JSON
);
INSERT INTO
    translations (id, language, content)
VALUES
    (
        1,
        'en',
        '{
  "HELLO": "hello {{value}}",
  "Welcome to": "Welcome to",
  "Here are some links to help you start": "Here are some links to help you start"
}
'
    ),
    (
        2,
        'nl',
        '{
  "HELLO": "Hallo {{value}}",
  "Welcome to": "Welkom bij",
  "Here are some links to help you start": "Hier zijn wat links om je op weg te helpen."
}
'
    );