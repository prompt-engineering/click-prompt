"use client";

import { BreadcrumbItem as B, BreadcrumbItemProps, ComponentWithAs } from "@chakra-ui/react";

export const BreadcrumbItem: ComponentWithAs<"li", BreadcrumbItemProps> = (props) => <B {...props} />;
