"use client";

import { ComponentWithAs, Flex as F, FlexProps } from "@chakra-ui/react";

export const Flex: ComponentWithAs<"div", FlexProps> = (props) => <F {...props} />;
