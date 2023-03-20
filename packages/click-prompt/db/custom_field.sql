-- for example, a user can save a custom field with the name "story:123" and the value "blablablabla"
-- story:123 is the type_name:id => type_value
create table custom_field
(
--     type id is a unique id for each custom field
    id         bigint unsigned auto_increment comment 'Custom Field ID'
        primary key,
    user_id    bigint unsigned not null comment 'User ID that the custom field belongs to',
    type_id    bigint unsigned not null comment 'custom type id',
    type_name  varchar(255) charset utf8 default 'Default name' not null invisible comment 'custom field name',
    type_value varchar(32768) charset utf8 default 'Default value' not null invisible comment 'custom field value',
    created_at datetime default CURRENT_TIMESTAMP not null
);
