"use client";

import { BreadcrumbLink as B, BreadcrumbLinkProps, ComponentWithAs } from "@chakra-ui/react";

export const BreadcrumbLink: ComponentWithAs<"a", BreadcrumbLinkProps> = (props) => <B {...props} />;
