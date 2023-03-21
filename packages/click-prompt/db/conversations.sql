create table conversations
(
    id         bigint unsigned auto_increment comment 'Conversation ID'
        primary key,
    user_id    bigint unsigned                                     not null comment 'User ID that the conversation belongs to',
    name       varchar(255) charset utf8 default 'Default name'    not null invisible comment 'conversation name CAN DULICATED',
    deleted    tinyint(1)                default 0                 not null comment 'is conversation has been deleted or not',
    created_at datetime                  default CURRENT_TIMESTAMP not null
);

