"use client";

import { Breadcrumb as B, BreadcrumbProps, ComponentWithAs } from "@chakra-ui/react";

export const Breadcrumb: ComponentWithAs<"nav", BreadcrumbProps> = (props) => <B {...props} />;
