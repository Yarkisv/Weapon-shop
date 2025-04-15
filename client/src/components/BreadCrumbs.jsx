import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { HiChevronRight } from "react-icons/hi";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathname = decodeURIComponent(location.pathname);

  const pathParts = pathname
    .split("/")
    .filter(Boolean)
    .filter((part) => part !== "catalog");

  const crumbs = pathParts.map((part, index) => {
    const path = "/" + ["catalog", ...pathParts.slice(0, index + 1)].join("/");
    return { label: part, path };
  });

  return (
    <div className="mt-[5px] mb-[5px]">
      <nav
        style={{ fontSize: "16px" }}
        className="flex items-center text-gray-600 space-x-2"
      >
        <Link to="/" className="hover:text-blue-600 flex items-center">
          <GrHomeRounded className="mr-1" />
          Головна
        </Link>
        {crumbs.map((crumb, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <HiChevronRight className="text-gray-400" />
            {idx === crumbs.length - 1 ? (
              <span className="font-semibold text-gray-800">
                {formatLabel(crumb.label)}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="hover:text-blue-600 transition-colors"
              >
                {formatLabel(crumb.label)}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

const formatLabel = (label) =>
  label.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

export default Breadcrumbs;
