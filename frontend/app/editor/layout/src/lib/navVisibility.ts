type NavLinkLike = {
  href?: string;
  label?: string;
  kind?: string;
  hidden?: boolean;
  children?: NavLinkLike[];
};

const normalizeHref = (href?: string) => (href || "").trim().toLowerCase();

const flattenLinks = (links: NavLinkLike[]): NavLinkLike[] =>
  links.flatMap((link) => [link, ...flattenLinks(link.children || [])]);

const hrefSlug = (href?: string) => {
  const value = normalizeHref(href);
  if (!value || value === "/" || value === "#") return "";
  if (value.startsWith("#page-")) return value.slice("#page-".length);
  if (value.startsWith("#")) return value.slice(1);
  const path = value.replace(/^https?:\/\/[^/]+/i, "");
  return path.replace(/^\/+/, "").split(/[/?#]/)[0] || "";
};

const SERVICE_PAGE_SLUGS = new Set([
  "services",
  "service",
  "our-services",
  "service-detail",
  "service-details",
]);

const SERVICE_SECTION_TYPES = new Set([
  "Service",
  "ServicePage",
  "ServiceDetailPage",
]);

/** Sections that belong to the Services page, including the home listing. */
export function isServiceOwnedSection(section: {
  type?: string;
  page?: string;
  variant?: string;
}): boolean {
  const type = section.type || "";
  if (type === "Topbar" || type === "Header" || type === "Footer") return false;
  const page = sectionPageSlug(section.page);
  if (SERVICE_PAGE_SLUGS.has(page)) return true;
  if (SERVICE_SECTION_TYPES.has(type)) return true;
  const variant = section.variant || "";
  return (
    variant === "HairAtelierServices1" ||
    variant === "HairAtelierServicePage1" ||
    variant === "HairAtelierServiceDetailPage1"
  );
}

const BLOG_PAGE_SLUGS = new Set([
  "blogs",
  "blog",
  "blog-detail",
  "blog-details",
]);

const BLOG_SECTION_TYPES = new Set([
  "Blog",
  "BlogPage",
  "BlogDetailPage",
  "BlogIndex",
  "BlogCategories",
  "BlogSidebar",
]);

const TEAM_PAGE_SLUGS = new Set(["teams", "team", "our-team"]);

const TEAM_SECTION_TYPES = new Set(["Team", "TeamPage", "TeamDetailPage"]);

/** Home team listing and the Our Team page. */
export function isTeamOwnedSection(section: {
  type?: string;
  page?: string;
  variant?: string;
}): boolean {
  const type = section.type || "";
  if (type === "Topbar" || type === "Header" || type === "Footer") return false;
  if (TEAM_PAGE_SLUGS.has(sectionPageSlug(section.page))) return true;
  if (TEAM_SECTION_TYPES.has(type)) return true;
  const variant = section.variant || "";
  return variant === "MediCareTeam1" || variant === "HairAtelierTeam1";
}

export function isHiddenTeamsPage(pageLinks: NavLinkLike[] | undefined | null) {
  const flat = flattenLinks(Array.isArray(pageLinks) ? pageLinks : []);
  return flat.some((link) => {
    if (!link.hidden) return false;
    const href = normalizeHref(link.href);
    const label = (link.label || "").trim().toLowerCase();
    const slug = hrefSlug(link.href) || label.replace(/\s+/g, "-");
    return (
      TEAM_PAGE_SLUGS.has(slug) ||
      href === "#page-team" ||
      href === "#page-teams" ||
      href === "#page-our-team" ||
      label === "team" ||
      label === "teams" ||
      label === "our team"
    );
  });
}

const PORTFOLIO_PAGE_SLUGS = new Set([
  "portfolio",
  "portfolios",
  "projects",
  "project",
]);

const PORTFOLIO_SECTION_TYPES = new Set([
  "Portfolio",
  "PortfolioPage",
  "LatestProject",
]);

/** Home portfolio listing and the Portfolio page, including Rydora's fleet. */
export function isPortfolioOwnedSection(section: {
  type?: string;
  page?: string;
  variant?: string;
}): boolean {
  const type = section.type || "";
  if (type === "Topbar" || type === "Header" || type === "Footer") return false;
  if (PORTFOLIO_PAGE_SLUGS.has(sectionPageSlug(section.page))) return true;
  if (PORTFOLIO_SECTION_TYPES.has(type)) return true;
  return section.variant === "RydoraFleet1";
}

const GALLERY_PAGE_SLUGS = new Set(["gallery"]);

const GALLERY_SECTION_TYPES = new Set(["Gallery", "GalleryPage"]);

const sectionPageSlug = (page?: string) =>
  (page || "").trim().toLowerCase().replace(/[\s_]+/g, "-");

const linkSlug = (link: NavLinkLike) => {
  const label = (link.label || "").trim().toLowerCase();
  return hrefSlug(link.href) || label.replace(/\s+/g, "-");
};

export function isBlogOwnedSection(section: {
  type?: string;
  page?: string;
  variant?: string;
}): boolean {
  const type = section.type || "";
  if (type === "Topbar" || type === "Header" || type === "Footer") return false;
  if (BLOG_PAGE_SLUGS.has(sectionPageSlug(section.page))) return true;
  if (BLOG_SECTION_TYPES.has(type)) return true;
  const variant = section.variant || "";
  return (
    variant === "HairAtelierBlogNews1" ||
    variant === "HairAtelierBlogPage1" ||
    variant === "HairAtelierBlogDetailPage1"
  );
}

export function isGalleryOwnedSection(section: {
  type?: string;
  page?: string;
  variant?: string;
}): boolean {
  const type = section.type || "";
  if (type === "Topbar" || type === "Header" || type === "Footer") return false;
  if (GALLERY_PAGE_SLUGS.has(sectionPageSlug(section.page))) return true;
  if (GALLERY_SECTION_TYPES.has(type)) return true;
  const variant = section.variant || "";
  return (
    variant === "HairAtelierGallery1" || variant === "HairAtelierGalleryPage1"
  );
}

const isBlogIndexLink = (link: NavLinkLike) => {
  if (link.kind === "blog") return false;
  const href = normalizeHref(link.href);
  const label = (link.label || "").trim().toLowerCase();
  return (
    link.kind === "blogIndex" ||
    href === "#page-blogs" ||
    href === "#page-blog" ||
    href === "#blogs" ||
    href === "#blog" ||
    label === "blogs" ||
    label === "blog"
  );
};

const isGalleryLink = (link: NavLinkLike) => {
  if (link.kind === "blog") return false;
  const href = normalizeHref(link.href);
  const label = (link.label || "").trim().toLowerCase();
  const slug = linkSlug(link);
  return (
    slug === "gallery" ||
    href === "#page-gallery" ||
    href === "#gallery" ||
    label === "gallery"
  );
};

export function isHiddenBlogsPage(pageLinks: NavLinkLike[] | undefined | null) {
  const flat = flattenLinks(Array.isArray(pageLinks) ? pageLinks : []);
  return flat.some((link) => link.hidden === true && isBlogIndexLink(link));
}

export function isHiddenGalleryPage(pageLinks: NavLinkLike[] | undefined | null) {
  const flat = flattenLinks(Array.isArray(pageLinks) ? pageLinks : []);
  return flat.some((link) => link.hidden === true && isGalleryLink(link));
}

const isPortfolioLink = (link: NavLinkLike) => {
  const href = normalizeHref(link.href);
  const label = (link.label || "").trim().toLowerCase();
  const slug = linkSlug(link);
  return (
    PORTFOLIO_PAGE_SLUGS.has(slug) ||
    href === "#page-portfolio" ||
    href === "#page-portfolios" ||
    href === "#page-projects" ||
    href === "#page-project" ||
    href === "#portfolio" ||
    href === "#projects" ||
    label === "portfolio" ||
    label === "portfolios" ||
    label === "projects" ||
    label === "project"
  );
};

export function isHiddenPortfolioPage(pageLinks: NavLinkLike[] | undefined | null) {
  const flat = flattenLinks(Array.isArray(pageLinks) ? pageLinks : []);
  return flat.some((link) => link.hidden === true && isPortfolioLink(link));
}

export function isHiddenServicesPage(pageLinks: NavLinkLike[] | undefined | null) {
  const flat = flattenLinks(Array.isArray(pageLinks) ? pageLinks : []);
  return flat.some((link) => {
    if (!link.hidden) return false;
    const href = normalizeHref(link.href);
    const label = (link.label || "").trim().toLowerCase();
    const slug = hrefSlug(link.href) || label.replace(/\s+/g, "-");
    return (
      SERVICE_PAGE_SLUGS.has(slug) ||
      href === "#page-service" ||
      href === "#page-services" ||
      label === "service" ||
      label === "services" ||
      label === "our services"
    );
  });
}

/** Hide nav entries whose matching pageLink is marked hidden (Show on website off). */
export function filterMenuByHiddenPageLinks<T extends NavLinkLike>(
  menu: T[] | undefined | null,
  pageLinks: NavLinkLike[] | undefined | null,
): T[] {
  if (!Array.isArray(menu) || !menu.length) return [];
  const flat = flattenLinks(Array.isArray(pageLinks) ? pageLinks : []);
  if (!flat.some((link) => link.hidden)) {
    return menu;
  }

  const isHiddenItem = (item: NavLinkLike) => {
    const itemHref = normalizeHref(item.href);
    const itemSlug = hrefSlug(item.href);
    const itemLabel = (item.label || "").trim().toLowerCase();
    return flat.some((link) => {
      if (!link.hidden) return false;
      const linkHref = normalizeHref(link.href);
      const linkSlug = hrefSlug(link.href);
      const linkLabel = (link.label || "").trim().toLowerCase();
      if (itemHref && linkHref && itemHref === linkHref) return true;
      const canonical = (value: string) => {
        if (
          value === "service" ||
          value === "services" ||
          value === "our-services" ||
          value === "our services"
        ) {
          return "service";
        }
        if (
          value === "team" ||
          value === "teams" ||
          value === "our-team" ||
          value === "our team"
        ) {
          return "team";
        }
        if (value === "blog" || value === "blogs") return "blog";
        if (value === "event" || value === "events") return "event";
        if (value === "gallery" || value === "galleries") return "gallery";
        return value;
      };
      if (itemSlug && linkSlug && canonical(itemSlug) === canonical(linkSlug)) {
        return true;
      }
      if (
        itemLabel &&
        linkLabel &&
        canonical(itemLabel) === canonical(linkLabel)
      ) {
        return true;
      }
      return false;
    });
  };

  return menu.flatMap((item) => {
    if (isHiddenItem(item)) return [];
    const children = Array.isArray(item.children)
      ? filterMenuByHiddenPageLinks(item.children as T[], pageLinks)
      : item.children;
    return [{ ...item, children } as T];
  });
}
