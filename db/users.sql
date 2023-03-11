create table users
(
    id            bigint unsigned auto_increment comment 'User ID',
    key_hashed    varchar(64)                        not null comment 'hash of openai key',
    iv            varchar(32)                        not null comment 'iv of openai key',
    key_encrypted varchar(255)                       not null comment 'openai key, but it''s encrypted',
    deleted       tinyint  default 0                 not null comment 'is user has been deleted or not',
    created_at    datetime default CURRENT_TIMESTAMP not null,
    primary key (id, key_hashed),
    constraint id
        unique (id)
);

