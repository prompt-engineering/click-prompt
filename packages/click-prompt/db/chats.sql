create table chats
(
    id              int auto_increment comment 'Chat ID'
        primary key,
    conversation_id bigint unsigned                    not null comment 'Conversation ID that the chat belongs to',
    role            varchar(10)                        not null comment 'The role of the author of this message. ChatCompletionRequestMessageRoleEnum',
    content         varchar(4096) charset utf8         not null comment 'The contents of the message',
    name            varchar(512) charset utf8          null comment 'The name of the user in a multi-user chat',
    created_at      datetime default CURRENT_TIMESTAMP not null,
    constraint id
        unique (id)
);

