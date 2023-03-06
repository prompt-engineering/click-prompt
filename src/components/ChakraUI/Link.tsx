"use client";

import { ComponentWithAs, Link as L, LinkProps } from "@chakra-ui/react";

export const Link: ComponentWithAs<"a", LinkProps> = (props) => <L {...props} />;
