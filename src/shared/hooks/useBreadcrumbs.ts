import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { appRoutes } from "@/shared/config/routes";

export interface BreadcrumbItem {
  title: string;
  href?: string;
  onClick?: () => void;
}

const getGroupRootPath = (menuGroup: string, currentPath: string) => {
  const groupRoutes = appRoutes.filter((route) => route.menuGroup === menuGroup && route.layout === "app");

  // Prefer a route that represents the group itself, otherwise fall back to the first sibling
  const labeledAsGroup = groupRoutes.find((route) => route.label === menuGroup);
  if (labeledAsGroup) {
    return labeledAsGroup.path;
  }

  const siblingPath = groupRoutes.find((route) => route.path !== currentPath);
  return siblingPath?.path ?? groupRoutes[0]?.path;
};

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();

  return useMemo(() => {
    const route = appRoutes.find((item) => item.path === location.pathname);

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
