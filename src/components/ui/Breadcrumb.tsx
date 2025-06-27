"use client";

import Link from "next/link";
import React from "react";

// usage example , middleLinks are optional
{
  /* <Breadcrumb
  currentPage="settings"
  middleLinks={[
    { name: "Users", href: "/admin/users" },
    { name: "John Doe", href: "/admin/users/123" },
  ]}
/>; */
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  currentPage: string;
  middleLinks?: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  currentPage,
  middleLinks = [],
}) => {
  const breadcrumbs = [
    { name: "Admin", href: "/admin" },
    ...middleLinks,
    { name: formatName(currentPage), href: "" }, // current page has no link
  ];

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-700">
      <ol className="flex space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index > 0 && <span className="mx-2">/</span>}
            {crumb.href && index !== breadcrumbs.length - 1 ? (
              <Link href={crumb.href} className="text-blue-600 hover:underline">
                {crumb.name}
              </Link>
            ) : (
              <span>{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

function formatName(name: string) {
  return decodeURIComponent(name)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export default Breadcrumb;
