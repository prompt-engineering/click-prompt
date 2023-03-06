"use client";

import { ComponentWithAs, Tooltip as T, TooltipProps } from "@chakra-ui/react";

export const Tooltip: ComponentWithAs<"div", TooltipProps> = (props) => <T {...props} />;
