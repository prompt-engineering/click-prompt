create table users
(
    id         bigint unsigned auto_increment comment 'User ID'
        primary key,
    iv         varchar(32)                        not null comment 'iv of openai key',
    openai_key varchar(255)                       not null comment 'openai key, but it''s encrypted',
    deleted    tinyint  default 0                 not null comment 'is user has been deleted or not',
    created_at datetime default CURRENT_TIMESTAMP not null,
    constraint id
        unique (id)
);

