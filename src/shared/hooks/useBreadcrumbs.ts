import { useMemo } from "react";
import { matchRoutes, type RouteObject, useLocation } from "react-router-dom";
import { appRoutes } from "@/shared/config/routes";

export interface BreadcrumbItem {
  title: string;
  href?: string;
  onClick?: () => void;
}

const getGroupRootPath = (menuGroup: string, currentPath: string) => {
  const groupRoutes = appRoutes.filter((route) => route.menuGroup === menuGroup && route.layout === "app");

  const explicitRoot = groupRoutes.find((route) => route.groupRoot);
  if (explicitRoot) {
    return explicitRoot.path;
  }

  // Prefer a route that represents the group itself, otherwise fall back to the first sibling
  const siblingPath = groupRoutes.find((route) => route.path !== currentPath);
  return siblingPath?.path ?? groupRoutes[0]?.path;
};

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();

  return useMemo(() => {
    const routesForMatch: RouteObject[] = appRoutes
      .filter((route) => route.layout === "app")
      .map((route) => ({ path: route.path }));

    const matches = matchRoutes(routesForMatch, location.pathname);
    const matchedPath = matches?.[matches.length - 1]?.route?.path;
    const route = appRoutes.find((item) => item.path === matchedPath);

    if (!route) {
      return [];
    }

    const crumbs: BreadcrumbItem[] = [];

    if (route.menuGroup) {
      const groupRootPath = getGroupRootPath(route.menuGroup, route.path);
      const hasDistinctGroup = route.label !== route.menuGroup || groupRootPath !== route.path;

      if (hasDistinctGroup && groupRootPath) {
        crumbs.push({
          title: route.menuGroup,
          href: groupRootPath,
        });
      }
    }

    crumbs.push({
      title: route.label ?? route.path,
    });

    return crumbs;
  }, [location.pathname]);
};
