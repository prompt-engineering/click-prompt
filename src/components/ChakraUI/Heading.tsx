"use client";

import { ComponentWithAs, Heading as H, HeadingProps } from "@chakra-ui/react";

export const Heading: ComponentWithAs<"h2", HeadingProps> = (props) => <H {...props} />;
