import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";

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
    <div className="ml-63">
      <nav>
        <Link to="/">
          <GrHomeRounded />
        </Link>
        {crumbs.map((crumb, idx) => (
          <span key={idx} className="">
            <span className="">/</span>
            {idx === crumbs.length - 1 ? (
              <span className="text-gray-800">{formatLabel(crumb.label)}</span>
            ) : (
              <Link to={crumb.path} className="text-black hover:text-red-500">
                {formatLabel(crumb.label)}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
};

const formatLabel = (label) =>
  label.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

export default Breadcrumbs;
