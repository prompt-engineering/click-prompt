"use client";

import { Avatar as A, AvatarProps, ComponentWithAs } from "@chakra-ui/react";

export const Avatar: ComponentWithAs<"span", AvatarProps> = (props) => <A {...props} />;
