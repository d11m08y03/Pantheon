import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import ThemeSwitcher from "./theme-switcher";

interface LayoutProps {
  children: React.ReactNode;
}

const Header: React.FC = () => {
  const url = window.location.href;
  const regex = /\/([^/]+)\/([^/]+)$/;
  const match = url.match(regex);

  let section = "";
  let subsection = "";

  if (match) {
    section = match[1];
    subsection = match[2];

    const capitaliseFirstLetter = (str: string): string => {
      if (!str) return str;
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    section = capitaliseFirstLetter(section);
    subsection = capitaliseFirstLetter(subsection);
  }

  return (
    <header className="flex h-10 shrink-0 items-center gap-2 border-b px-4 w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">
              {section === "" ? "Home" : section}
            </BreadcrumbLink>
          </BreadcrumbItem>

          {subsection !== "" && (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{subsection}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto -mr-2">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
